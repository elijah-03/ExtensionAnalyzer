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

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/Paramount/paramount_browse_injected.js

function setNativePartyButtonStyle(nativePartyButton) {
    const leftMargin = window.innerWidth < 370 ? "0px" : "10px";
    const topMargin = window.innerWidth < 370 ? "10px" : "0px";
    nativePartyButton.setAttribute("style", `background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); border-color: #e50914; color: #fff; margin-left: ${leftMargin}; margin-top: ${topMargin};`);
}
function addNativePartyButton() {
    if (document.getElementById("native-party-button") != null) {
        return undefined;
    }
    const parentElements = document.querySelectorAll(".cta-box");
    const results = [];
    parentElements.forEach((parentElement, idx) => {
        const playButton = parentElement.querySelector("a");
        if (playButton == null || !playButton.getAttribute("aa-link")) {
            return;
        }
        const parentDiv = playButton.parentElement;
        if (parentDiv.querySelector("#native-party-button")) {
            return;
        }
        const nativePartyButton = document.createElement("button");
        nativePartyButton.setAttribute("class", playButton.getAttribute("class"));
        setNativePartyButtonStyle(nativePartyButton);
        nativePartyButton.setAttribute("id", "native-party-button");
        nativePartyButton.innerHTML = '<div class="button__text">Start a Teleparty</div>';
        parentDiv.insertBefore(nativePartyButton, playButton.nextSibling);
        window.addEventListener("resize", () => setNativePartyButtonStyle(nativePartyButton));
        results.push({ button: nativePartyButton, play: () => playButton.click() });
    });
    return results.length > 0 ? results : undefined;
}
addNativePartyHandler(addNativePartyButton);

/******/ })()
;