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

;// CONCATENATED MODULE: ./src/Teleparty/Constants/Services/Viu.ts
const VIDEO_ELEMENT_SELECTOR = "video#bitmovinplayer-video-null";
const AD_CLASS_NAME = 'video[title="Advertisement"]';
const TITLE_ELEMENT_SELECTOR = "#series_title";
const TITLE_ELEMENT_SELECTOR_LIVE_TV = ".bmpui-label-metadata-viu-title.bmpui-label-metadata-viu-title";
const UI_CONTAINER = ".bmpui-ui-uicontainer";
const QUERY_PARAMS_ORIGIN_EPISODE_CODE_TAG = "originEpisodeCode";
const VIDEO_TYPES = Object.freeze({
    VIDEO: "vod",
    LIVE: "live",
});
const VIU_CONSTANTS = Object.freeze({
    VIDEO_ELEMENT_SELECTOR,
    AD_CLASS_NAME,
    TITLE_ELEMENT_SELECTOR,
    TITLE_ELEMENT_SELECTOR_LIVE_TV,
    UI_CONTAINER,
    VIDEO_TYPES,
    QUERY_PARAMS_ORIGIN_EPISODE_CODE_TAG,
});
/* harmony default export */ const Viu = (VIU_CONSTANTS);

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/Viu/viu_browse_injected.js


const handleOriginShowCode = () => {
    document.addEventListener("click", () => {
        setTimeout(() => {
            var _a, _b, _c;
            const url = new URL(window.location.href);
            if (url.pathname.includes(Viu.VIDEO_TYPES.LIVE) ||
                url.pathname.includes(Viu.VIDEO_TYPES.VIDEO)) {
                const params = url.searchParams;
                const episodeCode = params.get(Viu.QUERY_PARAMS_ORIGIN_EPISODE_CODE_TAG) || ((_a = url.pathname.split("/")) === null || _a === void 0 ? void 0 : _a[5]);
                const languageAnchor = (_c = (_b = document.querySelector('[data-testid="LanguageIcon"]')) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement;
                const hrefAttribute = languageAnchor === null || languageAnchor === void 0 ? void 0 : languageAnchor.getAttribute("href");
                if (languageAnchor && !(hrefAttribute === null || hrefAttribute === void 0 ? void 0 : hrefAttribute.includes(episodeCode))) {
                    languageAnchor.setAttribute("href", `${hrefAttribute}?${Viu.QUERY_PARAMS_ORIGIN_EPISODE_CODE_TAG}=${episodeCode}`);
                }
                if (params.has(Viu.QUERY_PARAMS_ORIGIN_EPISODE_CODE_TAG))
                    return;
                params.append(Viu.QUERY_PARAMS_ORIGIN_EPISODE_CODE_TAG, episodeCode);
                window.history.replaceState(null, "", url.toString());
            }
        }, 5000);
    });
};
function addNativePartyButton() {
    if (document.getElementById("native-party-button") != null) {
        return undefined;
    }
    const showBannerList = document.querySelectorAll("a.banner-item");
    if (showBannerList.length === 0) {
        return undefined;
    }
    let nativeButtons = [];
    showBannerList.forEach((showBanner) => {
        var _a;
        const parentDiv = showBanner.parentElement;
        const buttonsContainer = document.createElement("div");
        buttonsContainer.setAttribute("class", "teleparty-buttons-container");
        buttonsContainer.setAttribute("style", "position: absolute; left: 50px; bottom: 5px; display: flex; gap: 10px; z-index: 100;");
        const showBannerHref = showBanner.getAttribute("href");
        const showBannerWithOrginEpisodeCodeTag = `${showBannerHref}?${Viu.QUERY_PARAMS_ORIGIN_EPISODE_CODE_TAG}=${(_a = showBannerHref.split("/")) === null || _a === void 0 ? void 0 : _a[5]}`;
        const nativePartyWrapper = document.createElement("a");
        const watchNowWrapper = document.createElement("a");
        const nativePartyButton = document.createElement("button");
        const watchNowButton = document.createElement("button");
        // Set up native party button and its wrapper
        nativePartyWrapper.setAttribute("href", showBannerWithOrginEpisodeCodeTag);
        nativePartyWrapper.setAttribute("style", "text-decoration: none;");
        nativePartyButton.setAttribute("style", "background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); border-color: #e50914; color: #fff; border-radius: 8px 0px; cursor: pointer; padding: 7px;");
        nativePartyButton.setAttribute("id", "native-party-button");
        nativePartyButton.innerHTML = "<span>Start a Teleparty</span>";
        nativePartyWrapper.appendChild(nativePartyButton);
        // Set up watch now button and its wrapper
        watchNowWrapper.setAttribute("href", showBannerWithOrginEpisodeCodeTag);
        watchNowWrapper.setAttribute("style", "text-decoration: none;");
        watchNowButton.setAttribute("style", "background: #FFBF00; border-color: #e50914; color: #fff; border-radius: 8px 0px; cursor: pointer; padding: 7px;");
        watchNowButton.setAttribute("id", "tp-watch-now-button");
        watchNowButton.innerHTML = "<span>Watch Now</span>";
        watchNowWrapper.appendChild(watchNowButton);
        showBanner.setAttribute("style", "cursor: default;");
        showBanner.onclick = (e) => e.preventDefault();
        buttonsContainer.appendChild(nativePartyWrapper);
        buttonsContainer.appendChild(watchNowWrapper);
        parentDiv.insertBefore(buttonsContainer, showBanner.nextSibling);
        nativeButtons.push({ button: nativePartyButton, play: () => watchNowWrapper.click() });
    });
    return nativeButtons;
}
addNativePartyHandler(addNativePartyButton);
handleOriginShowCode();

/******/ })()
;