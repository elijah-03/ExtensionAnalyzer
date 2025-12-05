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

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/TubiTV/tubitv_browse_injected.js

function addNativePartyButton() {
    var _a, _b;
    if (document.querySelector("video"))
        return undefined;
    const isSeriesMoreInfoPage = window.location.href.includes("/series/");
    const carouselShowDurationText = (_b = (_a = document
        .querySelector('div[data-test-id="web-featured-carousel-with-dots"]')) === null || _a === void 0 ? void 0 : _a.querySelector('span[class="web-attributes__year-duration"]')) === null || _b === void 0 ? void 0 : _b.textContent;
    const isCarouselOfSeries = carouselShowDurationText === null || carouselShowDurationText === void 0 ? void 0 : carouselShowDurationText.includes("Season");
    // since the play button is same for all carousel banners, need to remove the native button for series
    // since clicking 'watch now' for series takes to the series info page
    if (isCarouselOfSeries && document.getElementById("native-party-button")) {
        document.getElementById("native-party-button").remove();
        return undefined;
    }
    if (document.getElementById("native-party-button") != null || isCarouselOfSeries) {
        return undefined;
    }
    const playButton = document.querySelector('button[data-test-id="web-ui-web-button"]');
    const isButtonCorrect = playButton.querySelector('svg[data-test-id="icons-play"]');
    if (playButton == null || (isButtonCorrect == null && !isSeriesMoreInfoPage)) {
        return undefined;
    }
    const parentDiv = playButton.parentElement;
    const nativePartyButton = document.createElement("button");
    nativePartyButton.setAttribute("class", playButton.getAttribute("class"));
    nativePartyButton.setAttribute("style", `background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); border-color: #e50914; color: #fff; ${!isSeriesMoreInfoPage ? "width: 180px; margin-top: 5px;" : ""}`);
    if (!isSeriesMoreInfoPage)
        playButton.setAttribute("style", "width: 180px");
    nativePartyButton.setAttribute("id", "native-party-button");
    nativePartyButton.innerHTML = "<span>Start a Teleparty</span>";
    parentDiv.insertBefore(nativePartyButton, playButton.nextSibling);
    return [{ button: nativePartyButton, play: () => playButton.click() }];
}
addNativePartyHandler(addNativePartyButton);

/******/ })()
;