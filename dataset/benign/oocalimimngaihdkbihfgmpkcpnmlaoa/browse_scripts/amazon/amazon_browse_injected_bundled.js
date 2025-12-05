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

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/Amazon/amazon_browse_injected.js

function addNativePartyButton() {
    if (document.getElementById("native-party-button") != null) {
        return undefined;
    }
    const results = [];
    // Play buttons in show page
    const parentDiv = document.querySelector('div[class*="dv-dp-node-playback"]');
    if (parentDiv != null) {
        const playButton = parentDiv.querySelector('a[class*="fbl-play-btn"]');
        if (playButton != null) {
            const nativePartyButton = document.createElement("button");
            nativePartyButton.setAttribute("style", "background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); color: #fff; border-radius: 0.375rem; padding: 1.25rem; margin-top: 8px; display: flex; align-items: center; justify-content: center; text-align: center; cursor: pointer;");
            nativePartyButton.setAttribute("id", "native-party-button");
            nativePartyButton.innerHTML = "<span>Start a Teleparty</span>";
            playButton.parentElement.parentElement.parentElement.insertBefore(nativePartyButton, playButton.parentElement.parentElement.nextSibling);
            results.push({ button: nativePartyButton, play: () => playButton.click() });
        }
    }
    // Home page buttons
    const playTestIdButtons = document.querySelectorAll('[data-testid="play"]');
    playTestIdButtons.forEach((btn, idx) => {
        if (btn.parentElement && btn.parentElement.parentElement) {
            const wrapperDiv = document.createElement("div");
            if (btn.parentElement.className) {
                wrapperDiv.className = btn.parentElement.className;
            }
            const nativePartyButton = document.createElement("button");
            if (btn.className) {
                nativePartyButton.className = btn.className;
            }
            nativePartyButton.setAttribute("style", "background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); color: #fff;");
            nativePartyButton.setAttribute("id", "native-party-button");
            nativePartyButton.innerHTML = "<span>Start a Teleparty</span>";
            wrapperDiv.appendChild(nativePartyButton);
            btn.parentElement.parentElement.insertBefore(wrapperDiv, btn.parentElement.nextSibling);
            results.push({ button: nativePartyButton, play: () => btn.click() });
        }
    });
    // the homepage content width was too less to accomodate the start button
    const titleMetadataMain = document.querySelectorAll('[data-testid="title-metadata-main"]');
    titleMetadataMain.forEach((titleMetadataMain) => {
        titleMetadataMain.style.maxWidth = "50vw";
    });
    return results.length > 0 ? results : undefined;
}
addNativePartyHandler(addNativePartyButton);

/******/ })()
;