(() => {
    chrome.runtime.onMessage.addListener((request) => {
        if (request?.action === 'gotRuleData') {
            window.postMessage({ adspeedup: true, message: 'gotRuleData', container: { handler: request.handler, content: request.datasheets } });
        }
    })

    window.addEventListener('message', (event) => {
        if (event && event.data.adspeedup) {
            const props = event.data;

            switch (props.message) {
                case 'getAdData':
                    chrome.storage.local.get(props.key, async function (data) {
                        window.postMessage({ forSpeedUp: true, message: props.callbackKey, info: data });
                    });
                    break;
                case 'setAdData':
                    chrome.storage.local.set({ [props.key]: props.value })
                    break;
                case 'removeData':
                    chrome.storage.local.remove(props.key);
                    break;
                case 'getRuleData':
                    chrome.runtime.sendMessage({ action: 'getRuleData', endpoint: props.endpoint, handler: props.handler, options: props.options })
                    break;
                default:
                    break;
            }
        }
    })

    const additionalInstall = () => {
        chrome.storage.local.get('extraAdFinder', async (result) => {
            if (result.extraAdFinder) {
                if (!document.head || !document.head.appendChild) {
                    return setTimeout(additionalInstall, 100);
                }
                const speedup = document.createElement('script');
                speedup.src = chrome.runtime.getURL('script/speedup.js');
    
                document.head.appendChild(speedup);
                speedup.onload = function () {
                    this.remove();
                };
            } else {
                setTimeout(additionalInstall, 100)
            }
        })
    };
    additionalInstall()
})()