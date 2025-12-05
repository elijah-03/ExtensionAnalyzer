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

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/Hulu/hulu_browse_injected.js

function addNativePartyButton() {
    var _a;
    const results = [];
    if (document.getElementById("native-party-button") == null) {
        // handle play button in show page
        const playButton = document.querySelector('a[data-testid="watchaction-btn"]');
        if (playButton != null) {
            const parentDiv = document.querySelector('div[data-testid="watch-action"]').parentElement;
            const nativePartyButton = document.createElement("button");
            nativePartyButton.setAttribute("style", "background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); color: #fff; border-style: none; border-radius: 0.375rem; padding: 1.25rem; margin-right: 2rem");
            nativePartyButton.setAttribute("id", "native-party-button");
            const watchMovieText = document.querySelector('div[data-testid="watch-action-text"]');
            const nativePartyButtonText = document.createElement("span");
            nativePartyButtonText.innerText = "Start a Teleparty";
            nativePartyButtonText.setAttribute("style", ((_a = watchMovieText === null || watchMovieText === void 0 ? void 0 : watchMovieText.getAttribute("style")) !== null && _a !== void 0 ? _a : "") +
                "text-align: center; margin-left: 0px; cursor: pointer; white-space: nowrap;");
            if (watchMovieText === null || watchMovieText === void 0 ? void 0 : watchMovieText.getAttribute("class")) {
                nativePartyButtonText.setAttribute("class", watchMovieText.getAttribute("class"));
            }
            parentDiv.insertBefore(nativePartyButton, document.querySelector('div[data-testid="watch-action"]').nextSibling);
            nativePartyButton.appendChild(nativePartyButtonText);
            results.push({ button: nativePartyButton, play: () => playButton.click() });
        }
    }
    if (document.getElementById("native-party-button-homepage") == null) {
        // handle homepage buttons
        const highEmphasisTileContents = document.querySelectorAll('[data-testid="high-emphasis-tile-content"]');
        highEmphasisTileContents.forEach((content) => {
            const btn = content.querySelector('[data-testid="playback-action"]');
            if (btn.parentElement && !btn.parentElement.querySelector("#native-party-button")) {
                const nativePartyButton = document.createElement("button");
                if (btn.className) {
                    nativePartyButton.className = btn.className;
                }
                nativePartyButton.setAttribute("style", "background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); color: #fff; border: none;");
                nativePartyButton.setAttribute("id", "native-party-button-homepage");
                const nativePartyButtonText = document.createElement("span");
                nativePartyButtonText.innerText = "Start a Teleparty";
                nativePartyButtonText.setAttribute("style", "text-align: center; margin-left: 0px; cursor: pointer; white-space: nowrap;");
                nativePartyButton.appendChild(nativePartyButtonText);
                btn.parentElement.insertBefore(nativePartyButton, btn.nextSibling);
                results.push({ button: nativePartyButton, play: () => btn.click() });
            }
        });
    }
    return results.length > 0 ? results : undefined;
}
addNativePartyHandler(addNativePartyButton);

/******/ })()
;