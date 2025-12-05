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

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/AppleTV/appletv_browse_injected.js

function getStartEpisodeButton() {
    const controlButtons = document.querySelectorAll(".video-data-services-button");
    for (const button of controlButtons) {
        const buttonData = JSON.parse(button.getAttribute("data-metrics-location") || "");
        if ((buttonData === null || buttonData === void 0 ? void 0 : buttonData.actionType) == "Play") {
            return button;
        }
    }
    return undefined;
}
function addNativePartyButton() {
    if (document.getElementById('native-party-button') != null) {
        return undefined;
    }
    const playButton = getStartEpisodeButton();
    console.log(playButton);
    if (playButton == null) {
        return undefined;
    }
    const nativePartyButton = document.createElement('button');
    nativePartyButton.setAttribute('class', playButton.getAttribute('class'));
    nativePartyButton.setAttribute('style', 'background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); color: #fff; cursor: pointer; margin-top: 0.75em;');
    nativePartyButton.setAttribute('id', 'native-party-button');
    nativePartyButton.innerHTML = '<span style="cursor: pointer;">Start a Teleparty</span>';
    playButton.parentElement.appendChild(nativePartyButton);
    return [{ button: nativePartyButton, play: () => playButton.click() }];
}
addNativePartyHandler(addNativePartyButton);

/******/ })()
;