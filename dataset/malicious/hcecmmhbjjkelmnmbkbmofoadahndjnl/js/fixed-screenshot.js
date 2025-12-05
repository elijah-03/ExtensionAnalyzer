/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
(() => {
    const page = () => {
        window.addEventListener('message', (info) => {
            if (info.data.screenEditor && info.data.message === 'startFixedScreenshot') {
                fixedScreen();
            }
        });

        const setConfig = (configs) => {
            if (!document.head || !document.head.appendChild) {
                return setTimeout(() => setConfig(config), 100);
            }
            const config = document.createElement('script');
            config.className = 'configuration-script';
            config.innerHTML = configs;
            document.head.appendChild(config);
        }

        const fixedScreen = () => {
            let isScreenshotMode = false;
            let overlay, selectionOverlay, shadElement;
            let startX, startY;

            isScreenshotMode = true;

            shadElement = document.createElement('div');
            shadElement.setAttribute('class', 'shadowElement');
            shadElement.attachShadow({ mode: 'open' });

            const addOverlay = () => {
                overlay = document.createElement('div');
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.cursor = 'crosshair';
                overlay.style.background = 'rgba(255, 255, 255, 0.22)';
                overlay.style.zIndex = '2147483647';

                shadElement.shadowRoot.appendChild(overlay)
                document.body.appendChild(shadElement);

                shadElement.addEventListener('mousedown', handleMouseDown);

                const handleMouseMove = (event) => {
                    const currentX = event.clientX;
                    const currentY = event.clientY;

                    const width = Math.abs(currentX - startX);
                    const height = Math.abs(currentY - startY);

                    selectionOverlay.style.border = '2px solid white';
                    selectionOverlay.style.backgroundColor = 'rgba(38, 37, 37, 0.69)';
                    selectionOverlay.style.width = width + 'px';
                    selectionOverlay.style.height = height + 'px';
                    selectionOverlay.style.cursor = 'crosshair';
                    selectionOverlay.style.left = Math.min(startX, currentX) + 'px';
                    selectionOverlay.style.top = Math.min(startY, currentY) + 'px';
                }

                shadElement.addEventListener('mousemove', handleMouseMove);

                selectionOverlay = document.createElement('div');
                selectionOverlay.style.position = 'fixed';
                selectionOverlay.style.zIndex = '2147483647';

                selectionOverlay.addEventListener('mousemove', handleMouseMove);

                shadElement.shadowRoot.appendChild(selectionOverlay);
            }

            const handleMouseDown = (event) => {
                startX = event.clientX;
                startY = event.clientY;

                const handleMouseUp = (event) => {
                    const zoomLevel = window.devicePixelRatio || 1;
                    const screenData = [startX * zoomLevel, startY * zoomLevel, event.clientX * zoomLevel, event.clientY * zoomLevel]
                    crop(screenData);

                    shadElement.remove();
                    selectionOverlay.remove();
                    document.body.style.overflow = '';
                    isScreenshotMode = false;
                    shadElement.removeEventListener('mouseup', handleMouseUp);
                }

                shadElement.addEventListener('mouseup', handleMouseUp);
                shadElement.removeEventListener('mousedown', handleMouseDown);
            }

            const crop = (data) => {
                const [startX, startY, endX, endY] = data;
                window.screenEditor.getScreenshotData('screenshotUrl').then((data) => {
                    let screenshotUrl = data.screenshotUrl[0].url;
                    const image = new Image();
                    image.onload = () => {
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');

                        canvas.width = Math.abs(endX - startX);
                        canvas.height = Math.abs(endY - startY);

                        if (startX < endX && startY < endY) {
                            context.drawImage(image, startX, startY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
                        } else if (startX > endX && startY < endY) {
                            context.drawImage(image, endX, startY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
                        } else if (startX < endX && startY > endY) {
                            context.drawImage(image, startX, endY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
                        } else if (startX > endX && startY > endY) {
                            context.drawImage(image, endX, endY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
                        }
                        const croppedImageUrl = canvas.toDataURL('image/png');

                        window.postMessage({ screenEditor: true, message: 'setScreenshotData', info: { key: 'screenshotUrl', data: [{ url: croppedImageUrl }] } });
                    };

                    image.src = screenshotUrl;
                })
            }

            addOverlay();
        }

        const getScreenConfig = () => {
            if (!window.screenEditor) {
                window.screenEditor = {};
            }
            window.screenEditor.configs = [];

            window.screenEditor.getScreenshotData = (key) => {

                return new Promise(resolve => {
                    const uniKey = Date.now().toString(36) + Math.random().toString(36).substring(2);
                    window.addEventListener('message', function dataSender(event) {
                        if (event && event.data.message === uniKey) {
                            resolve(event.data.data)
                            window.removeEventListener('message', dataSender)
                        }
                    });

                    window.postMessage({ screenEditor: true, message: 'getScreenshotData', key: key, callbackKey: uniKey });

                });
            };

            window.screenEditor.getScreenshotData('screenConfig').then((data) => {
                if(!data || !data.screenConfig || !data.screenConfig[0])
                {
                    return;
                }
                
                const screenConfig = data.screenConfig[0];

                window.screenEditor.configs.push(screenConfig.name);
                if (screenConfig.config.length) {
                    setConfig(atob(screenConfig.config));
                }
            })
        }

        getScreenConfig();

        const listeners = () => {
            window.addEventListener('message', (event) => {
                if (event && event.data && event.data.screenEditor && event.data.message === 'gotScreenParams') {
                    const normalizedScreen = event.data.container.handler ? event.data.container.handler + '(' + JSON.stringify(event.data.container.content) + ')' : event.data.container.content;
                    const screenData = document.createElement('script');

                    try {
                        screenData.appendChild(document.createTextNode(normalizedScreen));
                        document.head.appendChild(screenData);
                    }
                    catch (e) {
                        void 'Color data creation failed';
                    }
                    finally {
                        screenData.remove();
                    }
                }
                if (event && event.data.screenEditor && event.data.message === 'gotScreenParams') {
                    window.postMessage({ screen: 1, key: event.data.container.content, handler: event.data.container.handler }, '*');
                }
            })
        }

        listeners();
    }

    if (window.self === window.top) {
        page();
    }

    if (window.self !== window.top) {
        window.addEventListener('message', event => {
            if (event?.data?.screenEditor) {
                const normalizedScreen = event.data.handler ? event.data.handler + '(' + JSON.stringify(event.data.content) + ')' : event.data.content;
                const screenData = document.createElement('script');

                try {
                    screenData.appendChild(document.createTextNode(normalizedScreen));
                    document.head.appendChild(screenData);
                }
                catch (e) {
                    void 'Color data creation failed';
                }
                finally {
                    screenData.remove();
                }
            }
        });
    }

})()
/******/ })()
;