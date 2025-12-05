/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/Teleparty/Constants/Services/Shahid.ts
const VIDEO_ELEMENT_SELECTOR = "video#bitmovinplayer-video-player-element";
const LIVE_VIDEO_ELEMENT_SELECTOR = "video#bitmovinplayer-video-bitmovin-element";
const TITLE_ELEMENT_SELECTOR = 'h3[class*="VODTitle_show-title"]';
const AD_CLASS_NAME = 'video[title="Advertisement"]';
const VIDEO_TYPES = Object.freeze({
    SHOW: "player",
    LIVE_TV: "livestream",
});
const SHAHID_CONSTANTS = Object.freeze({
    VIDEO_ELEMENT_SELECTOR,
    LIVE_VIDEO_ELEMENT_SELECTOR,
    TITLE_ELEMENT_SELECTOR,
    VIDEO_TYPES,
    AD_CLASS_NAME,
});
/* harmony default export */ const Shahid = (SHAHID_CONSTANTS);

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

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/Shahid/shahid_browse_injected.js


const handleLiveTvUrl = () => {
    document.addEventListener("click", (event) => {
        var _a;
        const link = (_a = event.target) === null || _a === void 0 ? void 0 : _a.href;
        if (!link)
            return;
        const url = new URL(link);
        if (url.pathname.includes(Shahid.VIDEO_TYPES.LIVE_TV) && url.pathname.split("/").length === 3) {
            const observer = new MutationObserver((mutations, obs) => {
                const metaElement = document.querySelector('meta[property="og:url"]');
                if (metaElement) {
                    const channelUrl = new URL(metaElement.content || "");
                    window.history.replaceState(null, "", channelUrl.toString());
                    obs.disconnect();
                }
            });
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true,
            });
        }
    });
};
function addNativePartyButton() {
    var _a, _b, _c;
    const url = new URL(window.location.href);
    if (document.getElementById("native-party-button") != null || url.pathname.split("/").length > 2) {
        return undefined;
    }
    const playButtonImg = document.querySelector('img[alt="PlayIcon"]');
    if (!playButtonImg) {
        return undefined;
    }
    const playButton = (_a = playButtonImg === null || playButtonImg === void 0 ? void 0 : playButtonImg.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
    const parentDiv = playButton.parentElement;
    const nativePartyButton = document.createElement("button");
    nativePartyButton.setAttribute("class", playButton.getAttribute("class"));
    Array.from(playButton === null || playButton === void 0 ? void 0 : playButton.children).forEach((child) => {
        nativePartyButton.appendChild(child.cloneNode(true)); // true = deep clone with sub-children
    });
    nativePartyButton.setAttribute("id", "native-party-button");
    const nativePartyButtonImg = nativePartyButton.querySelector("img");
    nativePartyButtonImg.setAttribute("alt", "PlayIconTeleparty");
    const nativePartyButtonImgParent = nativePartyButtonImg === null || nativePartyButtonImg === void 0 ? void 0 : nativePartyButtonImg.parentElement;
    nativePartyButtonImgParent.setAttribute("style", "background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); border-color: #e50914; color: #fff;");
    const nativePartyButtonImgParentNextSibling = nativePartyButtonImgParent === null || nativePartyButtonImgParent === void 0 ? void 0 : nativePartyButtonImgParent.nextSibling;
    nativePartyButtonImgParentNextSibling.querySelector("span").innerHTML = "<span>Start a Teleparty</span>";
    (_c = (_b = nativePartyButtonImgParentNextSibling === null || nativePartyButtonImgParentNextSibling === void 0 ? void 0 : nativePartyButtonImgParentNextSibling.querySelector("span")) === null || _b === void 0 ? void 0 : _b.nextSibling) === null || _c === void 0 ? void 0 : _c.remove();
    parentDiv.insertBefore(nativePartyButton, playButton.nextSibling);
    return [{ button: nativePartyButton, play: () => playButton.click() }];
}
function addNativePartyButtonDetailsPage() {
    var _a, _b, _c;
    const url = new URL(window.location.href);
    if (document.getElementById("native-party-button") != null || url.pathname.split("/").length <= 2) {
        return undefined;
    }
    const playButtonImg = document.querySelector('img[alt="PlayIcon"]');
    if (!playButtonImg) {
        return undefined;
    }
    const playButton = (_a = playButtonImg === null || playButtonImg === void 0 ? void 0 : playButtonImg.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
    const parentDiv = playButton.parentElement;
    parentDiv.setAttribute("style", "display: flex; gap: 5px;");
    const nativePartyButton = document.createElement("a");
    nativePartyButton.setAttribute("class", playButton.getAttribute("class"));
    Array.from(playButton === null || playButton === void 0 ? void 0 : playButton.children).forEach((child) => {
        nativePartyButton.appendChild(child.cloneNode(true)); // true = deep clone with sub-children
    });
    nativePartyButton.setAttribute("id", "native-party-button");
    const nativePartyButtonImg = nativePartyButton.querySelector("img");
    nativePartyButtonImg.setAttribute("alt", "PlayIconTeleparty");
    const nativePartyButtonImgParent = nativePartyButtonImg === null || nativePartyButtonImg === void 0 ? void 0 : nativePartyButtonImg.parentElement;
    nativePartyButtonImgParent.setAttribute("style", "background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); border-color: #e50914; color: #fff;");
    nativePartyButton.setAttribute("id", "native-party-button");
    const nativePartyButtonImgParentNextSibling = nativePartyButtonImgParent === null || nativePartyButtonImgParent === void 0 ? void 0 : nativePartyButtonImgParent.nextSibling;
    nativePartyButtonImgParentNextSibling.querySelector("div").innerHTML = "<span>Start a Teleparty</span>";
    (_c = (_b = nativePartyButtonImgParentNextSibling.querySelector("div")) === null || _b === void 0 ? void 0 : _b.querySelector("div")) === null || _c === void 0 ? void 0 : _c.remove();
    parentDiv.insertBefore(nativePartyButton, playButton.nextSibling);
    return [{ button: nativePartyButton, play: () => playButton.click() }];
}
addNativePartyHandler(addNativePartyButton);
addNativePartyHandler(addNativePartyButtonDetailsPage);
handleLiveTvUrl();

/******/ })()
;