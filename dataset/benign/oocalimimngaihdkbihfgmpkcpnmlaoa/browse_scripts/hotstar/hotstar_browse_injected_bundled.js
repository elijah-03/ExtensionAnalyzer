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

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/Hotstar/hotstar_browse_injected.js

function addNativePartyButton() {
    if (document.getElementById("native-party-button") != null) {
        return undefined;
    }
    const parentDiv = document.querySelector("#shimmerContainer");
    if (parentDiv == null) {
        return undefined;
    }
    const playButton = parentDiv.querySelector("div.w-full > a > button");
    if (playButton == null) {
        return undefined;
    }
    const nativePartyButton = document.createElement("button");
    nativePartyButton.setAttribute("style", "font-family: var(--FONT-FAMILY); font-weight: var(--BUTTON2-SEMIBOLD-WEIGHT); background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); color: #fff; display: flex; align-items: center; justify-content: center; text-align: center; cursor: pointer; width: 100%; margin-top: 0.5rem; border-radius: 8px; min-height: 48px");
    nativePartyButton.style.height = playButton.offsetHeight + "px";
    nativePartyButton.setAttribute("id", "native-party-button");
    nativePartyButton.innerHTML = "<span>Start a Teleparty</span>";
    parentDiv.insertBefore(nativePartyButton, playButton.nextSibling);
    return [
        {
            button: nativePartyButton,
            play: () => {
                var _a;
                const parentDiv = document.querySelector("#shimmerContainer");
                if (parentDiv == null) {
                    return undefined;
                }
                const playButton = parentDiv.querySelector("div.w-full > a > button");
                if (playButton == null) {
                    return undefined;
                }
                if (!playButton.parentElement || !((_a = playButton.parentElement) === null || _a === void 0 ? void 0 : _a.href)) {
                    return undefined;
                }
                window.location.href = playButton.parentElement.href;
            },
        },
    ];
}
addNativePartyHandler(addNativePartyButton);

/******/ })()
;