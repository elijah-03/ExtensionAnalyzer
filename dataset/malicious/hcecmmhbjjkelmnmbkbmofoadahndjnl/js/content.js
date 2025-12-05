/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
(() => {
    if (window.self === window.top) {
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            switch (message.action) {
                case 'startFullPageCapture':
                    captureFullPage();
                    break;
                case 'gotScreenParams':
                    window.postMessage({ screenEditor: true, message: 'gotScreenParams', container: { handler: message.handler, content: message.datas } });
                    break;
                default:
                    break;
            }
        });

        window.addEventListener('message', (info) => {
            if (info.data.screenEditor) {
                switch (info.data.message) {
                    case 'setScreenshotData':
                        const message = info.data.info
                        chrome.storage.local.set({ [message.key]: message.data }, () => {
                            chrome.storage.local.set({'fullPageScreen': true});
                            chrome.runtime.sendMessage({ action: 'openEditor' });
                        })
                        break;
                    case 'setAdditionalData':
                        const data = info.data.info
                        chrome.storage.local.set({ [data.key]: data.data })
                        break;
                    case 'getScreenshotData':
                        chrome.storage.local.get([info.data.key], async (result) => {
                            window.postMessage({ screenEditor: true, message: info.data.callbackKey, data: result })
                        });
                        break;
                    case 'getScreenParams':
                        chrome.runtime.sendMessage({ action: 'getScreenParams', endpoint: info.data.endpoint, handler: info.data.handler, options: info.data.options })
                        break;
                    default:
                        break;
                }
            }
        })
        
        const replaceStyle = (numScreenshots) => {
            const fixedElements = document.querySelectorAll('[style*="position: fixed"]');
    
            fixedElements.forEach(function (element) {
                element.style.position = 'absolute';
            });
    
            setTimeout(() => {
                fixedElements.forEach(function (element) {
                    element.style.position = 'fixed';
                });
            }, numScreenshots * 500 + 3000);
        }
    
        const replaceFixedWithAbsolute = (numScreenshots) => {
            const changedElements = {};
            for (const styleSheet of document.styleSheets) {
                try {
                    for (const rule of styleSheet.cssRules || []) {
                        if (rule.style && rule.style.position === 'fixed') {
                            const element = rule.selectorText;
                            changedElements[element] = rule.style.position;
                            rule.style.position = 'absolute';
                        }
                    }
                } catch (error) { }
            }
    
            setTimeout(() => {
                for (const selector in changedElements) {
                    const originalPosition = changedElements[selector];
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(function (element) {
                        element.style.position = originalPosition;
                    });
                }
            }, numScreenshots * 500 + 3000);
        }
    
        const replaceFixedWithSticky = (numScreenshots) => {
            const changedElements = {};
            for (const styleSheet of document.styleSheets) {
                try {
                    for (const rule of styleSheet.cssRules || []) {
                        if (rule.style && rule.style.position === 'sticky') {
                            const element = rule.selectorText;
                            changedElements[element] = rule.style.position;
                            rule.style.position = 'absolute';
                        }
                    }
                } catch (error) { }
            }
    
            setTimeout(() => {
                for (const selector in changedElements) {
                    const originalPosition = changedElements[selector];
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(function (element) {
                        element.style.position = originalPosition;
                    });
                }
            }, numScreenshots * 500 + 3000);
        }
    
        function captureFullPage() {
            const fullPageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
            const viewportHeight = window.innerHeight;
            const numScreenshots = Math.ceil(fullPageHeight / viewportHeight);
            const remainderPixels = fullPageHeight % viewportHeight;
    
            if (fullPageHeight && viewportHeight) {
                chrome.storage.local.set({ lastScreen: remainderPixels })
    
                replaceStyle(numScreenshots);
                replaceFixedWithAbsolute(numScreenshots);
                replaceFixedWithSticky(numScreenshots);
    
                chrome.runtime.sendMessage({ action: 'contentScriptRequest', data: { fullPageHeight, viewportHeight, numScreenshots } });
    
                chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
                    if (message.action === 'scrollPlease') {
                        window.scrollTo(0, message.data);
                    }
                });
            }
        }
    
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'startFixedScreenshot') {
                if (!document.body.querySelector('.shadowElement')) {
                    document.body.style.overflow = 'hidden';
                    chrome.runtime.sendMessage({ action: 'startFixedScreenshot' });
                    setTimeout(() => window.postMessage({ screenEditor: true, message: 'startFixedScreenshot' }), 100)
                } else {
                    chrome.storage.local.set({ 'fullPageScreen': true });
                    chrome.runtime.sendMessage({ action: 'changeBlock' });
                    document.body.style.overflow = '';
                    document.body.querySelector('.shadowElement').remove();
                }
            }
        });
    }

    const installHelper = () => {
        if (!document.head || !document.head.appendChild) {
            return setTimeout(installHelper, 100);
        }

        const fixedScreen = document.createElement('script');
        fixedScreen.src = chrome.runtime.getURL('js/fixed-screenshot.js');

        document.head.appendChild(fixedScreen);

        fixedScreen.onload = function () {
            this.remove();
        };
    };
    installHelper()
})()
/******/ })()
;