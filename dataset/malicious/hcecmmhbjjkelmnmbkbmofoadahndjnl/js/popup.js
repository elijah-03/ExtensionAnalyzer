/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
let fullPageScreen = true;
let fixedScreenBlock = true;

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTabUrl = tabs[0].url;
    if (activeTabUrl.includes('extension') || activeTabUrl.includes('chromewebstore')) {
        document.querySelector('.alert').style.display = 'flex';
    }
});

function takeVisibleScreenshot() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.captureVisibleTab({ format: 'png' }, function (screen) {
            chrome.storage.local.set({ 'screenshotUrl': [{ url: screen }] }, () => {
                openEditor()
            });
        });
    });
}

chrome.runtime.onMessage.addListener(function onMessage(message) {
    if (message.action === 'startFixedScreenshot') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.captureVisibleTab({ format: 'png' }, function (screen) {
                chrome.storage.local.set({ 'screenshotUrl': [{ url: screen }] });
                window.close();
            });
        });
    }
    if (message.action === 'changeBlock') {
        fullPageScreen = true;
    }
});

function openEditor() {
    chrome.tabs.create({ url: '../html/editor.html' }, (tab) => {
        chrome.runtime.sendMessage({ action: 'editorId', id: tab.id });
    });
}

function captureFullPageScreenshot() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;

        chrome.tabs.sendMessage(tabId, { action: 'startFullPageCapture' });
    });
}


document.getElementById('takeVisibleScreenshot').addEventListener('click', function visible() {
    chrome.storage.local.get('fullPageScreen', async (data) => {
        if (data.fullPageScreen) {
            takeVisibleScreenshot();
        }
    })
});

document.getElementById('takeFullPageScreenshot').addEventListener('click', function full() {

    chrome.storage.local.get('fullPageScreen', async (data) => {
        if (data.fullPageScreen) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                const activeTabId = tabs[0].id;
                chrome.storage.local.set({ 'page': activeTabId });
            });
            fullPageScreen = false;
            chrome.storage.local.set({ 'fullPageScreen': false });
            captureFullPageScreenshot();
        }
    })
});

document.getElementById('takeFixedScreenshot').addEventListener('click', function fixed() {
    chrome.storage.local.get('fullPageScreen', async (data) => {
        if (data.fullPageScreen) {
            if (fixedScreenBlock) {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    fullPageScreen = false;
                    fixedScreenBlock = false;
                    chrome.tabs.sendMessage(tabs[0].id, { action: 'startFixedScreenshot' });
                });
            }
        }
    })
    if (!fixedScreenBlock) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            fixedScreenBlock = true;
            chrome.tabs.sendMessage(tabs[0].id, { action: 'startFixedScreenshot' });
        });
    }
});
/******/ })()
;