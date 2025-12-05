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

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/SonyLiv/sonyliv_browse_injected.js

function addNativePartyButton() {
    if (document.getElementById("native-party-button") != null) {
        return undefined;
    }
    const button = document.querySelector(".revamp-watchFree");
    if (button == null) {
        return undefined;
    }
    const nativePartyButton = document.createElement("a");
    nativePartyButton.setAttribute("style", "background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); color: #fff !important; cursor: pointer; margin-right: 10px; font-family: 'SFProText-Regular'; font-style: normal; font-weight: 700; font-size: 18px; line-height: 24px; align-items: center; justify-content: center;");
    nativePartyButton.setAttribute("id", "native-party-button");
    nativePartyButton.setAttribute("class", button.getAttribute("class"));
    nativePartyButton.innerHTML = "<span>Start a Teleparty</span>";
    nativePartyButton.setAttribute("data-button-style", "PRIMARY");
    button.parentElement.insertBefore(nativePartyButton, button);
    return [{ button: nativePartyButton, play: () => button.click() }];
}
addNativePartyHandler(addNativePartyButton);

/******/ })()
;