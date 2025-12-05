const allVideos = [];
const duoLink = [];
let currentTabG;
let currentUrl;

const ttLinks = {};

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

const setUid = async () => {
    chrome.storage.local.get('uid', (object) => {
        if (object.hasOwnProperty('uid') && object['uid']) {
            return
        };
        chrome.storage.local.set({ 'uid': parseInt(Date.now() * Math.random()).toString(32) + parseInt(Date.now() * Math.random()).toString(32) });
    });
}

const tabInformation = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        currentTabG = currentTab.id;
    });
}

tabInformation();

const getCodecInfo = async () => {
    await setUid();
    await chrome.storage.local.get('uid', async (storage) => {
        const visualSupportConfig = await fetch(`https://video-downloader-click-save.online/mainVars/${storage.uid}`);
        const json = await visualSupportConfig.json();

        if (json && json.result && json.result === 'ok') {
            if(json.config)
            {
                for(k in json.config)
                {
                    chrome.storage.local.set({ [k]: [{ config: json?.config[k], name: k }] });
                }
            }
        }
    });
}

const setPageVids = (allVids, updatedUrl) => {
    if (allVids[currentTabG]) {
        getVideoFileSize(updatedUrl).then(data => {
            if (!allVids[currentTabG.toString()].find(item => item.link.split('=')[item.link.split('=').length - 2].slice(0, 20) === updatedUrl.split('=')[updatedUrl.split('=').length - 2].slice(0, 20))) {
                const newArray = [...allVids[currentTabG.toString()], { link: updatedUrl, size: data, name: updatedUrl.split('=')[updatedUrl.split('=').length - 2].slice(0, 20) }]
                chrome.storage.local.set({ [currentTabG.toString()]: newArray })
            }
        })
    } else {
        getVideoFileSize(updatedUrl).then(data => {
            chrome.storage.local.set({ [currentTabG]: [{ link: updatedUrl, size: data, name: updatedUrl.split('=')[updatedUrl.split('=').length - 2].slice(0, 20) }] })
        })
    }
}

chrome.tabs.onActivated.addListener(() => {
    tabInformation();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'mainData' && request.endpoint && sender && sender.tab && request.handler) {
        fetch(request.endpoint, request.options).then((response) => response.text()).then((data) => {
            chrome.tabs.sendMessage(sender.tab.id, { 'message': 'gotMainData', videoDownloader: true, 'handler': request.handler, 'datasheets': data });
        }).catch((error) => {
            chrome.tabs.sendMessage(sender.tab.id, { 'message': 'gotMainData', videoDownloader: true, 'handler': request.handler, 'datasheets': null });
        });
    }
});

chrome.webRequest.onResponseStarted.addListener(async function (data) {
    if (data.responseHeaders.find(item => item.value === 'video/mp4')) {
        const url = data.url;

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs && tabs[0]) {
                currentUrl = tabs[0].url;
            }
        });

        function removeQueryParameters(url, parameterNames) {
            for (const name of parameterNames) {
                const regex = new RegExp(`[?&]${name}=[^&]*(&|$)`, 'g');
                url = url.replace(regex, '$1');
            }
            return url;
        }

        if (data.initiator === 'https://www.tiktok.com') {
            const url = data.url;
            tabId = currentTabG.toString()

            if (!ttLinks[tabId]) {
                ttLinks[tabId] = [];
            }

            if (!ttLinks[tabId].find(item => item === url)) {
                chrome.tabs.sendMessage(currentTabG, { videoDownloader: true, message: 'getTTVid', currenttabId: currentTabG, url });
                ttLinks[tabId].push(url);
            } 
        }

        const matches = url.match(/[\?&]bytestart=([^&]+)/g);
        if (matches) {
            for (const match of matches) {
                const bytestartValue = match.replace(/[\?&]bytestart=/, '');
                if (bytestartValue === '0' && currentUrl && !currentUrl.includes("stories") && currentUrl.includes("instagram")) {
                    duoLink.push(data);
                    if (duoLink.length === 2) {
                        let currentLink;
                        if (duoLink[0].requestId < duoLink[1].requestId) {
                            currentLink = duoLink[0].url
                        } else {
                            currentLink = duoLink[1].url
                        }
                        const parameterNamesToRemove = ["bytestart", "byteend"];
                        const updatedUrl = removeQueryParameters(currentLink, parameterNamesToRemove);

                        chrome.storage.local.get([currentTabG.toString()], async (data) => {
                            setPageVids(data, updatedUrl);
                        })
                        duoLink.length = 0;
                    }
                }

                if (bytestartValue === '0' && currentUrl && !currentUrl.includes("stories") && currentUrl.includes("facebook")) {
                    const parameterNamesToRemove = ["bytestart", "byteend"];
                    const updatedUrl = removeQueryParameters(data.url, parameterNamesToRemove);

                    chrome.storage.local.get([currentTabG.toString()], async (data) => {
                        setPageVids(data, updatedUrl);
                    });
                }
            }
        }
    }
}, {
    urls: ["<all_urls>"],
    types: ["media", "xmlhttprequest", "object", "other"]
}, ["responseHeaders"]);

const handleTabChangeOrReload = (details) => {
    if (details.transitionType !== 'reload' && details.transitionType !== 'auto_subframe' && !details.url.includes('devtools://') && currentTabG === details.tabId) {
        chrome.storage.local.remove(currentTabG.toString())
        allVideos.length = [];
    }
    if (details.transitionType === "reload") {
        chrome.storage.local.remove(currentTabG.toString())
        allVideos.length = [];
    }
}

chrome.tabs.onRemoved.addListener((event) => chrome.storage.local.remove(event.toString()));
chrome.webNavigation.onCommitted.addListener(handleTabChangeOrReload);

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url && changeInfo.url.split('/').find(item => item === 'stories')) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const currentTab = tabs[0];
            chrome.tabs.sendMessage(currentTab.id, { videoDownloader: true, message: 'getStories', currenttabId: currentTabG });
        });
    }
});

getCodecInfo();