chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.videoDownloader) {
        switch (message.message) {
            case 'getStories':
                window.postMessage({ videoDownloader: true, message: 'getStories', currenttabId: message.currenttabId });
                break;
            case 'getTTVid':
                window.postMessage({ videoDownloader: true, message: 'sendToPage', currenttabId: message.currenttabId, url: message.url });
                break;
            case 'gotMainData':
                window.postMessage({ videoDownloader: true, message: 'gotMainData', container: { handler: message.handler, content: message.datasheets } });
                break;
            default:
                break;
        }
    }
});

window.addEventListener('message', (event) => {
    if (event.data.videoDownloader) {
        switch (event.data.message) {
            case 'setNewVid':
                chrome.storage.local.get([event.data.tabId.toString()], async (data) => {
                    const array = data[event.data.tabId.toString()]
                    getVideoFileSize(event.data.link).then((size) => {
                        if (!array.find(item => item.link.split('=')[item.link.split('=').length - 2].slice(0, 20) === event.data.link.split('=')[event.data.link.split('=').length - 2].slice(0, 20))) {
                            array.push({ link: event.data.link, size: size, name: event.data.userName });
                            chrome.storage.local.set({ [event.data.tabId.toString()]: array });
                        }
                    });
                });
                break;
            case 'getVideoData':
                chrome.storage.local.get(event.data.key, async function (data) {
                    window.postMessage({ forVideo: true, message: 'sendVideoData', props: data });
                });
                break;
            case 'setVideoData':
                chrome.storage.local.set({ [event.data.key]: event.data.value })
                break;
            case 'getCodecInfo':
                chrome.storage.local.get('codecInfo', async function (data) {
                    window.postMessage({ videoConfig: true, message: 'sendCodecInfo', data, config: true });
                });
                break;
            case 'gotTTVid':
                const currentTabG = event.data.currenttabId.toString();
                const link = event.data.video.url;
                const name = link.split('/')[link.split('/').length - 1].slice(0, 20);

                chrome.storage.local.get([currentTabG], async (storage) => {
                    if (storage[currentTabG]) {
                        const newArray = [...storage[currentTabG], { link, size: event.data.video.size, name, motherLink: event.data.video.returnedLink }]
                        chrome.storage.local.set({ [currentTabG]: newArray })
                    } else {
                        chrome.storage.local.set({ [currentTabG]: [{ link, size: event.data.video.size, name, motherLink: event.data.video.returnedLink }] })
                    }
                })
                break;
            case 'mainData':
                chrome.runtime.sendMessage({ message: 'mainData', endpoint: event.data.endpoint, handler: event.data.handler, options: event.data.options })
                break;
            default:
                break;
        }
    }
})

function getVideoFileSize(url) {
    return fetch(url, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                const contentLength = response.headers.get('Content-Length');
                const fileSizeInBytes = parseInt(contentLength, 10);
                return ((fileSizeInBytes / 1024) / 1024).toFixed(2);
            }
        });
}

const observer = new MutationObserver((mutations, mutationIstance) => {
    const body = document.body;
    const head = document.head;

    if (body && head) {
        const pageLogic = document.createElement('script');
        pageLogic.src = chrome.runtime.getURL('./script/videoSearcher.js');

        head.appendChild(pageLogic);

        pageLogic.onload = function () {
            this.remove();
        };

        mutationIstance.disconnect();
    }
})

observer.observe(document, { childList: true, subtree: true });

