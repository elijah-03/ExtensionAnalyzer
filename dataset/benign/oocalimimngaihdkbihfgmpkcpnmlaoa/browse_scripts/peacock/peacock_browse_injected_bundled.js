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

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/Peacock/peacock_browse_injected.js

function addNativePartyButton() {
    if (document.getElementById("native-party-button") != null) {
        return undefined;
    }
    const playButtonList = document.querySelectorAll('[data-testid="cta-primary"], [data-testid="smart-cta-button"]');
    if (playButtonList.length === 0) {
        return undefined;
    }
    let nativeButtons = [];
    playButtonList.forEach((playButton) => {
        if ((playButton === null || playButton === void 0 ? void 0 : playButton.textContent) === "My Stuff")
            return;
        const parentDiv = playButton.parentElement;
        const nativePartyButton = document.createElement("button");
        nativePartyButton.setAttribute("class", playButton.getAttribute("class"));
        nativePartyButton.setAttribute("style", "background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); border-color: #e50914; color: #fff;");
        nativePartyButton.setAttribute("id", "native-party-button");
        nativePartyButton.innerHTML = "<span>Start a Teleparty</span>";
        parentDiv.insertBefore(nativePartyButton, playButton.nextSibling);
        nativeButtons.push({ button: nativePartyButton, play: () => playButton.click() });
    });
    return nativeButtons;
}
addNativePartyHandler(addNativePartyButton);

/******/ })()
;