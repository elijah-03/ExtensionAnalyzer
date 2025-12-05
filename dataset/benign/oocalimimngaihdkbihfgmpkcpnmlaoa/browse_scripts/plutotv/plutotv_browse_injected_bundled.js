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

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/PlutoTV/plutotv_browse_injected.js

function hasExtraAfterLang(url) {
    const parsedUrl = new URL(url);
    // Case 1: if lang param exists
    const lang = parsedUrl.searchParams.get("lang");
    if (lang) {
        const afterLangIndex = url.indexOf(`lang=${lang}`) + `lang=${lang}`.length;
        const afterLang = url.slice(afterLangIndex);
        return afterLang.trim().length > 0;
    }
    // Case 2: no lang param → check after "/home"
    const homeIndex = url.indexOf("/home");
    if (homeIndex !== -1) {
        const afterHome = url.slice(homeIndex + "/home".length);
        return afterHome.trim().length > 0; // query, hash, etc.
    }
    return false;
}
function addNativePartyButton() {
    var _a, _b, _c, _d, _e;
    const nativePartyButtonList = document.querySelectorAll("#native-party-button");
    const isMoreDetailsPanelOpen = hasExtraAfterLang(window.location.href);
    if (
    // these checks are for 'more info' panel. when it's open there are 2 play buttons that can exist
    (isMoreDetailsPanelOpen && nativePartyButtonList.length >= 2) ||
        (!isMoreDetailsPanelOpen && nativePartyButtonList.length === 1)) {
        return undefined;
    }
    const playButton = ((_d = (_c = (_b = (_a = document.querySelector('[class*="actions"]')) === null || _a === void 0 ? void 0 : _a.firstChild) === null || _b === void 0 ? void 0 : _b.firstChild) === null || _c === void 0 ? void 0 : _c.firstChild) === null || _d === void 0 ? void 0 : _d.firstChild) || ((_e = document.querySelector('[class*="actionButtonsContainer"]')) === null || _e === void 0 ? void 0 : _e.firstChild);
    if (playButton == null) {
        return undefined;
    }
    const parentDiv = playButton.parentElement;
    if (parentDiv.querySelector("#native-party-button") !== null)
        return;
    const nativePartyButton = document.createElement("button");
    nativePartyButton.setAttribute("class", playButton.getAttribute("class"));
    nativePartyButton.setAttribute("style", "background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); border-color: #e50914; color: #fff; width: 200px; margin-left: 3px; display: flex; justify-content: center;");
    playButton.setAttribute("style", "width: 200px;");
    nativePartyButton.setAttribute("id", "native-party-button");
    nativePartyButton.innerHTML = "<span style='padding: 0 0 4px 0'>Start a Teleparty</span>";
    parentDiv.insertBefore(nativePartyButton, playButton.nextSibling);
    return [{ button: nativePartyButton, play: () => playButton.click() }];
}
addNativePartyHandler(addNativePartyButton);

/******/ })()
;