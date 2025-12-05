var uploadBtn = document.getElementById('uploadBtn');
var downloadBtn = document.getElementById('downloadBtn');
var sabyContainer = document.getElementById('sabyContainer');
var foreignContainer = document.getElementById('foreignContainer');
var errorContainer = document.getElementById('errorContainer');
var startRecordBtn = document.getElementById('startRecordBtn');
var stopRecordBtn = document.getElementById('stopRecordBtn');
var fileContainer = document.getElementById('fileContainer');
var incidentContainer = document.getElementById('incidentContainer');
var filenameCaption = document.getElementById('filenameCaption');
var incidentNumber = document.getElementById('incidentNumber');
var progressContainer = document.getElementById('progressContainer');
var progressCaption = document.getElementById('progressCaption');

var state = {
   fileName: '',
   uploadProgress: null,
   uploadNumber: null,
   isRecordActive: false
};

async function init() {
   var [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
   var tabId = tab.id;
   var { tabs, domainsByHost } = await chrome.storage.local.get(['tabs', 'domainsByHost']);
   var host = new URL(tab.url).host;
   var hostApproved = false;

   // Даем возможность пользоваться только на наших доменах
   if (domainsByHost) {
      for ([hostValue, domains] of Object.entries(domainsByHost)) {
         if (hostValue === host) {
            hostApproved = true;
            break;
         }

         hostApproved = domains.indexOf(host) > -1;
         if (hostApproved) {
            break;
         }
      }
   } else {
      domainsByHost = {};
   }

   if (!hostApproved) {
      var allowedDomains = await getAllowedDomains(tabId);
      if (!allowedDomains) {
         return;
      }

      hostApproved = true;
      domainsByHost[host] = allowedDomains;
      // Сохраняем список доменом, чтобы каждый раз его не запрашивать
      await chrome.storage.local.set({
         domainsByHost
      });
   }

   if (hostApproved) {
      // Это наш домен
      setVisible(sabyContainer);
      // В расширении сохранена эта вкладка. Значит идет запись
      var isRecordActive = !!(tabs && tabs[tabId]);
      var harInfo = await getHARForTab(tab);

      // В расширении уже есть сохраненный HAR для этой вкладки
      if (harInfo) {
         state.fileName = harInfo.fileName;
         state.uploadProgress = harInfo.uploadProgress;
         state.uploadNumber = harInfo.uploadNumber;
      }

      state.isRecordActive = isRecordActive;
      updateView();
      startRecordBtn.addEventListener('click', toggleRecord);
      stopRecordBtn.addEventListener('click', toggleRecord);

      chrome.runtime.onMessage.addListener((request) => {
         // Сбрасываем стейт, если юзер отменил отладку
         if (request.action == 'RECORD_CANCELED') {
            state = {};
            updateView();
         }
      });

      downloadBtn.addEventListener('click', async function () {
         var harInfo = await getHARForTab(tab);
         var { fileName, fileContent } = harInfo;

         /* Разбиваем текст на чанки весом ~3МБ и для каждый чанк передаем в скрипт.
         Хром давится когда во встраеваемый скрипт передается большой объем данных
         */
         var chunks = getContentByChunks(encodeURIComponent(fileContent));
         chunks.forEach((chunkStr, index) => {
            chrome.scripting.executeScript({
               target: { tabId },
               args: [chunkStr, index, chunks.length, fileName],
               function: downloadHARFileByChunks,
               world: 'MAIN'
            });
         });
      });

      uploadBtn.addEventListener('click', async function () {
         var harInfo = await getHARForTab(tab);
         var { fileContent, fileName } = harInfo;

         // Опрашиваем расширение на предмет прогресса загрузки каждую секунду
         var progressInterval = setInterval(async () => {
            var harInfo = await getHARForTab(tab);
            if (harInfo) {
               state.uploadProgress = harInfo.uploadProgress || 0;
               updateView();
            }
         }, 1000);
         state.uploadProgress = 1;
         updateView();

         var uploadNumber;
         try {
            uploadNumber = await uploadHARFile(tab, fileContent, fileName);
         } catch (err) {
            uploadNumber = null;
         }

         clearInterval(progressInterval);
         state.uploadNumber = uploadNumber;
         updateView(uploadNumber ? null : 'Не удалось загрузить файл');
      });
   } else {
      setVisible(foreignContainer);
   }
}

/**
 * Перерисовать окошко в соответствии со стейтом
 * @param {String} [errorText] - текст ошибки
 */
function updateView(errorText) {
   var { uploadNumber, fileName, isRecordActive, uploadProgress } = state;
   if (isRecordActive) {
      setHidden(startRecordBtn);
      setVisible(stopRecordBtn);

      uploadBtn.classList.replace('SabyExt-Button_shadow', 'SabyExt-Button__readOnly');
      downloadBtn.classList.replace('SabyExt-Button_shadow', 'SabyExt-Button__readOnly');
   } else {
      setHidden(stopRecordBtn);
      setVisible(startRecordBtn);

      uploadBtn.classList.replace('SabyExt-Button__readOnly', 'SabyExt-Button_shadow');
      downloadBtn.classList.replace('SabyExt-Button__readOnly', 'SabyExt-Button_shadow');
   }

   if (errorText) {
      setHidden([fileContainer, incidentContainer, progressContainer]);
      setVisible(errorContainer);
      errorContainer.innerText = errorText;
      return;
   } else {
      setHidden(errorContainer);
   }

   if (isRecordActive) {
      filenameCaption.innerText = '';
      filenameCaption.title = '';
      setHidden([fileContainer, incidentContainer, progressContainer]);
   } else if (uploadNumber) {
      setHidden([fileContainer, progressContainer]);
      setVisible(incidentContainer);
      incidentNumber.innerText = uploadNumber;
      incidentNumber.title = uploadNumber;
      uploadBtn.classList.replace('SabyExt-Button_shadow', 'SabyExt-Button__readOnly');
   } else if (uploadProgress) {
      setHidden([fileContainer, incidentContainer]);
      setVisible(progressContainer);
      progressCaption.innerText = uploadProgress;
   } else if (fileName) {
      setVisible(fileContainer);
      setHidden([incidentContainer, progressContainer]);
      filenameCaption.innerText = fileName;
      filenameCaption.title = fileName;
   }
}

/**
 * Включить-выключить запись лога для текущей вкладки
 */
async function toggleRecord() {
   var [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
   var answer = await chrome.runtime.sendMessage({ action: 'TOGGLE_RECORD', tab });
   if (answer.action === 'RECORD_STARTED') {
      state = {};
      state.isRecordActive = true;
      updateView();
   } else if (answer.action === 'RECORD_FINISHED') {
      state.fileName = answer.data && answer.data.fileName;
      state.isRecordActive = false;
      updateView();
   }
}

/**
 * Скачать лог на компьютер
 * Функция вызывается в цикле для кусков одного лога, каждый весом ~3МБ
 * Скрипт заводит буфер на странице и собирает в нем чанки до тех пор, пока не восстановит изначальный лог.
 * Когда все собрано, лог качается, буфер стирается.
 * @param {string} chunkStr контент чанка
 * @param {number} chunkIndex номер чанка
 * @param {number} numChunks всего чанков
 * @param {string} fileName название лога
 */
async function downloadHARFileByChunks(chunkStr, chunkIndex, numChunks, fileName) {
   function processChunksByBuffer(bufferName, chunkStr, chunkIndex, numChunks) {
      if (!window[bufferName]) {
         window[bufferName] = {
            count: 0,
            arr: []
         };
      }

      ++window[bufferName].count;
      window[bufferName].arr[chunkIndex] = chunkStr;
      if (window[bufferName].count === numChunks) {
         var contentStr = window[bufferName].arr.join('');
         delete window[bufferName];
         return contentStr;
      }

      return null;
   }

   var bufferName = 'SabyPlguinExtension_buffer_download_' + fileName;
   var contentStr = processChunksByBuffer(bufferName, chunkStr, chunkIndex, numChunks);
   if (contentStr) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:application/json,' + contentStr);
      element.setAttribute('download', fileName);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
   }
}

/**
 * Загрузить лог в облако
 * @param {Tab} tab объект вкладки
 * @param {number} fileContent текст лога
 * @param {string} fileName название лога
 */
function uploadHARFile(tab, fileContent, fileName) {
   return new Promise((resolve) => {
      /* Разбиваем текст на чанки весом ~3МБ и для каждый чанк передаем в скрипт.
         Хром давится когда во встраеваемый скрипт передается большой объем данных
         */
      var chunks = getContentByChunks(fileContent);
      chunks.forEach((chunkStr, index) => {
         chrome.scripting.executeScript(
            {
               target: { tabId: tab.id },
               args: [chunkStr, index, chunks.length, fileName, tab, chrome.runtime.id],
               world: 'MAIN',
               /**
                * Функция вызывается в цикле для кусков одного лога, каждый весом ~3МБ
                * Скрипт заводит буфер на странице и собирает в нем чанки до тех пор, пока не восстановит изначальный лог.
                * Когда все собрано, лог отправляется в облако, буфер стирается.
                * @param {string} chunkStr контент чанка
                * @param {number} chunkIndex номер чанка
                * @param {number} numChunks всего чанков
                * @param {string} fileName название лога
                * @param {Tab} tab объект вкладки
                * @param {string} extId идентификатор расширения
                */
               function: function (chunkStr, chunkIndex, numChunks, fileName, tab, extId) {
                  function processChunksByBuffer(bufferName, chunkStr, chunkIndex, numChunks) {
                     if (!window[bufferName]) {
                        window[bufferName] = {
                           count: 0,
                           arr: []
                        };
                     }

                     ++window[bufferName].count;
                     window[bufferName].arr[chunkIndex] = chunkStr;
                     if (window[bufferName].count === numChunks) {
                        var contentStr = window[bufferName].arr.join('');
                        delete window[bufferName];
                        return contentStr;
                     }

                     return null;
                  }

                  return new Promise((resolveUpload) => {
                     var bufferName = 'SabyPlguinExtension_buffer_upload_' + fileName;
                     var contentStr = processChunksByBuffer(bufferName, chunkStr, chunkIndex, numChunks);

                     if (contentStr) {
                        // Лог восстановлен, можно начинать загрузку
                        var xmlhttp = new XMLHttpRequest();
                        xmlhttp.upload.onprogress = function (event) {
                           // Отправляем прогресс загрузки в расширение
                           var progress = parseInt((event.loaded / event.total) * 100);
                           if (progress > 99) {
                              progress = 99;
                           }
                           chrome.runtime.sendMessage(extId, {
                              action: 'SET_UPLOAD_PROGRESS',
                              tab,
                              payload: { progress }
                           });
                        };

                        xmlhttp.upload.onerror = function () {
                           resolveUpload(null);
                        };
                        xmlhttp.onload = function () {
                           var uploadNumber = parseInt(xmlhttp.response, 10);
                           // Отправляем номер инцидента в расширение
                           chrome.runtime.sendMessage(extId, {
                              action: 'SET_UPLOAD_PROGRESS',
                              tab,
                              payload: { progress: 100, uploadNumber }
                           });
                           resolveUpload(uploadNumber);
                        };
                        xmlhttp.open('POST', '/logreceiver/service/upload_har/');
                        xmlhttp.setRequestHeader('Content-Type', 'application/json');
                        xmlhttp.send(contentStr);
                     } else {
                        // Лог еще не восстановлен, ничего не делаем
                        resolveUpload('SKIP_TOKEN');
                     }
                  });
               }
            },
            function (answer) {
               var result = answer && answer[0] && answer[0].result;
               if (result === 'SKIP_TOKEN') {
                  return;
               }

               if (!result) {
                  return resolve(null);
               }

               if (typeof result === 'number') {
                  return resolve(result);
               }

               if ('error' in result) {
                  return resolve(null);
               }
            }
         );
      });
   });
}

/**
 * Получить список доступных доменов
 * Скрипт исполняется на текущей странице. Вызов идет в соответствующее облако.
 * @param {number} tabId идентификатор вкладки
 * @returns
 */
function getAllowedDomains(tabId) {
   return new Promise((resolve) => {
      chrome.scripting.executeScript(
         {
            target: { tabId },
            function: async function () {
               var answer = await fetch('/auth/service/', {
                  body: '{"jsonrpc":"2.0","protocol":6,"method":"ExternalClouds.GetInfo","params":{},"id":1}',
                  method: 'POST'
               });
               return answer.json();
            }
         },
         function (answer) {
            if (answer && answer[0].result && answer[0].result.result) {
               var allowedDomains = answer[0].result.result.allowedDomains;
               resolve(allowedDomains);
               return;
            }

            resolve(void 0);
         }
      );
   });
}

/**
 * Получить сохраненный для этой вкладки лог
 * @param {Tab} tab
 * @returns
 */
async function getHARForTab(tab) {
   var answer = await chrome.runtime.sendMessage({ action: 'GET_HAR', tab });
   return answer.data;
}

/**
 * Сделать элемент видимым
 * @param container
 */
function setVisible(container) {
   container.classList.remove('isHidden');
}

/**
 * Сделать элемент/элеметы видимыми
 * @param container
 */
function setHidden(container) {
   if (container instanceof Array) {
      container.forEach((cnt) => {
         cnt.classList.add('isHidden');
      });
   } else {
      container.classList.add('isHidden');
   }
}

/**
 * Разбить строку на чанки весом 3МБ
 * @param {string} strContent
 * @returns
 */
function getContentByChunks(strContent) {
   var MB3 = 3145728;
   var blob = new Blob([strContent]);
   var numChunks = Math.ceil(blob.size / MB3);
   var chunkLength = Math.ceil(strContent.length / numChunks);
   var chunks = new Array(numChunks);
   var pos = 0;

   for (let i = 0; i < numChunks; ++i) {
      chunks[i] = strContent.substr(pos, chunkLength);
      pos += chunkLength;
   }

   return chunks;
}

init();
