/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/NativePartyHandler.ts
function getTelepartyConfig() {
    try {
        const stored = sessionStorage.getItem("telepartyPremiumConfig");
        if (stored) {
            const config = JSON.parse(stored);
            return config;
        }
    }
    catch (e) {
        // console.error("Error parsing sessionStorage config:", e)
    }
    return null;
}
const addNativePartyHandler = (tryAddButton) => {
    setInterval(() => {
        try {
            const buttons = tryAddButton();
            if (buttons) {
                for (const button of buttons) {
                    const existingHandler = button.button._telepartyHandler;
                    if (existingHandler) {
                        button.button.removeEventListener("click", existingHandler);
                    }
                    const clickHandler = () => {
                        console.log("Native party button clicked");
                        const config = getTelepartyConfig();
                        if ((config === null || config === void 0 ? void 0 : config.serviceIsPremium) && !(config === null || config === void 0 ? void 0 : config.userHasPremium)) {
                            console.log("Redirecting non-premium user on premium service to premium page");
                            window.open("https://teleparty.com/premium?ref=start-" + config.serviceName, "_blank");
                            return;
                        }
                        localStorage.setItem("nativeParty", JSON.stringify({
                            shouldStart: true,
                            expiry: Date.now() + 1000 * 60 * 2,
                            randomId: Math.random().toString(),
                        }));
                        button.play();
                    };
                    button.button._telepartyHandler = clickHandler;
                    button.button.addEventListener("click", clickHandler);
                }
            }
        }
        catch (error) {
            // console.error("Error in addNativePartyHandler:", error)
        }
    }, 500);
};

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/Vidio/vidio_browse_injected.js

function addNativePartyButton() {
    if (document.querySelector('[id^="native-party-button"]')) {
        return undefined;
    }
    const containers = [
        'div.mt-8.mb-2.flex.items-start.gap-7.px-4.xl\\:px-0',
        'div.flex.justify-center.items-center.gap-2.md\\:justify-start.my-3.md\\:my-4'
    ];
    const targetTexts = ['Play', 'Watch Now', 'Putar', "Lanjut Nonton"];
    const createdButtons = [];
    containers.forEach((containerSelector, containerIndex) => {
        const mainContainers = document.querySelectorAll(containerSelector);
        mainContainers.forEach((targetContainer, index) => {
            var _a;
            const elementsInContainer = targetContainer.querySelectorAll('a, button');
            let hasTargetText = false;
            let playButton = null;
            for (const element of elementsInContainer) {
                const text = (_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim();
                if (text && targetTexts.some(targetText => text.includes(targetText))) {
                    hasTargetText = true;
                    playButton = element;
                    break;
                }
            }
            if (!hasTargetText || !playButton) {
                return;
            }
            const existingContent = Array.from(targetContainer.children);
            const firstLine = document.createElement('div');
            firstLine.style.cssText = 'display: flex; align-items: center; gap: 7px; margin-bottom: 8px;';
            existingContent.forEach(child => {
                firstLine.appendChild(child);
            });
            const secondLine = document.createElement('div');
            secondLine.style.cssText = 'display: flex; align-items: center; gap: 7px;';
            const uniqueId = `native-party-button-${containerIndex}-${index}`;
            const nativePartyButton = document.createElement('button');
            nativePartyButton.setAttribute('id', uniqueId);
            nativePartyButton.setAttribute('type', 'button');
            nativePartyButton.setAttribute('aria-label', 'Start a Teleparty');
            const playButtonStyles = window.getComputedStyle(playButton);
            const fontSize = playButtonStyles.fontSize;
            const fontFamily = playButtonStyles.fontFamily;
            const lineHeight = playButtonStyles.lineHeight;
            nativePartyButton.style.cssText = `
                background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%) !important;
                color: white !important;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                min-width: 0;
                flex-grow: 1;
                border-radius: 8px;
                font-size: ${fontSize};
                font-family: ${fontFamily};
                font-weight: bold;
                line-height: ${lineHeight};
            `;
            nativePartyButton.innerHTML = `
                <p style="margin: 0; font-size: inherit; font-family: inherit; font-weight: bold; line-height: inherit;">Start a Teleparty</p>
            `;
            secondLine.appendChild(nativePartyButton);
            targetContainer.style.cssText = 'display: flex; flex-direction: column; align-items: flex-start;';
            targetContainer.appendChild(firstLine);
            targetContainer.appendChild(secondLine);
            let retries = 0;
            const maxRetries = 20;
            const checkInterval = setInterval(function () {
                const firstLineRect = firstLine.getBoundingClientRect();
                if (firstLineRect.width > 0 && firstLineRect.height > 0) {
                    nativePartyButton.style.width = `${firstLineRect.width}px`;
                    nativePartyButton.style.height = `${firstLineRect.height}px`;
                    nativePartyButton.style.flexGrow = 'unset';
                    clearInterval(checkInterval);
                }
                else if (++retries >= maxRetries) {
                    clearInterval(checkInterval);
                }
            }, 500);
            createdButtons.push({ button: nativePartyButton, play: () => playButton.click() });
        });
    });
    return createdButtons.length > 0 ? createdButtons : undefined;
}
addNativePartyHandler(addNativePartyButton);

/******/ })()
;