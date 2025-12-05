class Visualize {
    constructor() {
        (this.maxVolume = 600),
            (this.vizualizeContent = null),
            this.run(),
            (this.updateVolume = this.updateVolume.bind(this)),
            (this.gainNode = null);
    }
    run() {
        this.initListeners(), this.createHtml();
    }
    initListeners() {
        setTimeout(this.initMessageListeners(), 1e3);
    }
    initMessageListeners() {
        chrome.runtime.onMessage.addListener((e, s, t) => {
            if ("showGain" === e.action) this.updateVolume(e.volume);
            else console.log(`There is no handlers for ${e.action} event!`);
        });
    }
    createHtml() {
        let e = document.createElement("audio");
        if (
            (e.classList.add("audio-output"),
            (e.style.display = "none"),
            document.body.appendChild(e),
            !this.vizualizeContent)
        ) {
            const e =
                '\n                <div id="volume-booster-visusalizer">\n                    <div class="sound">\n                        <div class="sound-icon"></div>\n                        <div class="sound-wave sound-wave_one"></div>\n                        <div class="sound-wave sound-wave_two"></div>\n                        <div class="sound-wave sound-wave_three"></div>\n                    </div>\n                    <div class="segments-box">\n                        <div data-range="1-20" class="segment"><span></span></div>\n                        <div data-range="21-40" class="segment"><span></span></div>\n                        <div data-range="41-60" class="segment"><span></span></div>\n                        <div data-range="61-80" class="segment"><span></span></div>\n                        <div data-range="81-100" class="segment"><span></span></div>\n                    </div>\n                </div>\n            ';
            (this.vizualizeContent = $(e)),
                this.vizualizeContent.appendTo("body");
        }
    }
    updateVolume(e) {
        const s = +e;
        if (Number.isInteger(s)) {
            const e = parseInt((100 * s) / this.maxVolume);
            this.vizualizeContent.css({ display: "flex", opacity: 1 }),
                clearInterval(this._fadeInterval),
                clearTimeout(this._fadeTimeout),
                this.updateSegments(e),
                this.vizualizeContent
                    .find(".sound")
                    .toggleClass("sound-mute", 1 > e),
                this.hideVisualizer();
        }
    }
    updateSegments(e) {
        this.vizualizeContent.find(".segment").each(function () {
            const s = $(this),
                t = $(this).find("span"),
                i = +s.data("range").split("-")[0],
                n = +s.data("range").split("-")[1];
            e > n
                ? t.css("height", "100%")
                : e >= i && e <= n
                ? t.css("height", 100 - (100 * (n - e)) / 20 + "%")
                : t.css("height", "0");
        });
    }
    hideVisualizer() {
        this._fadeTimeout = setTimeout(() => {
            this._fadeInterval = setInterval(() => {
                this.vizualizeContent[0].style.opacity ||
                    (fadeTarget.style.opacity = 1),
                    0 < this.vizualizeContent[0].style.opacity
                        ? (this.vizualizeContent[0].style.opacity -= 0.01)
                        : (this.vizualizeContent.css("display", "none"),
                          clearInterval(this._fadeInterval));
            }, 10);
        }, 800);
    }
}
const content = new Visualize();
