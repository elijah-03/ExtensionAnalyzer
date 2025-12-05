class IFrameCommandHandler {
    iframeSrc;
    messageData;
    isInitialized = false;
    constructor() {
        this.iframeSrc = window.location.href;
        this.messageData = {};
    }
    init() {
        if (this.isInitialized) {
            return;
        }
        window.addEventListener("message", (event) => {
            if (!this.isMessageForIframe(event.data, this.iframeSrc))
                return;
            if (event.data.continuousCommunication) {
                this.messageData = event.data;
            }
            this.handleCommand(event.data);
        });
        this.isInitialized = true;
        const data = { iframeSrc: this.iframeSrc };
        this.onInitialized(data);
    }
    handleCommand(messageData) {
        const { data } = messageData;
        this.onCommand(messageData, this.sendResponse.bind(this));
    }
    onCommand(data, sendResponse) {
        throw new Error("Method not implemented.");
    }
    sendResponse(responseData, continuousMessage = false, originalMessage) {
        let messageData = this.messageData;
        if (originalMessage) {
            messageData = originalMessage;
        }
        const response = this.createIframeResponse(messageData, responseData, continuousMessage);
        window.parent.postMessage(response, this.iframeSrc);
    }
    isMessageForIframe(eventData, iframeSrc) {
        return eventData.iframeSrc === iframeSrc;
    }
    createIframeResponse(messageData, responseData, continuousMessage = false) {
        return {
            ...messageData,
            command: messageData.command,
            direction: "FEATURE_TO_CONTENTSCRIPT",
            data: responseData || null,
            continuousMessage: continuousMessage ? true : false,
        };
    }
    onInitialized(data) {
        const msg = {
            command: "initialized",
            direction: "FEATURE_TO_OFFSCREENDOCUMENT",
            ...data,
            continuousMessage: false,
        };
        window.parent.postMessage(msg, this.iframeSrc);
    }
}

/**
 * @interface Required interface for a SpeechEngine
 */
class ISpeechEngine extends EventTarget {

    /**
     * @function initialise
     * @description Initialises the SpeechEngine
     * @param {object} settings for the SpeechEngine
     */
    initialise(settings) {
        throw "The initialise function must be implemented to support the ISpeechEngine interface.";
    }

    /**
     * @function play
     * @description Implements the SpeechEngines play or speak function
     * @param {object} speechsettings object containing settings for speech.
     * @param {Array.<string>} speechsettings.words Array of strings to speak
     * @param {boolean} [speechsettings.useEvents] set to true if you want speech event details 
     * @param {string} [speechsettings.voice] voice used to speak, if not availble will fallback to first available voice 
     * @param {number} [speechsettings.speed] speed between 0 and 100 
     **/
    play({ words = [], useEvents = true, voice = "", speed = -1, setSpeaking = true,  continousAllowed = true  }) {
        throw "The play function must be implemented to support the ISpeechEngine interface.";
    }

    /**
     * @function stop
     * @description Implements the SpeechEngines stop function
     */
    stop() {
        throw "The stop function must be implemented to support the ISpeechEngine interface.";
    }

    /**
     * @function pause
     * @description Implements the SpeechEngines pause function
     */
    pause() {
        throw "The pause function must be implemented to support the ISpeechEngine interface.";
    }

    /**
     * @function pause
     * @description Implements the SpeechEngines pause function
     * @returns {Array.<string>} returns a string array of voices.
     */
    getVoices() {
        throw "The getVoices function must be implemented to support the ISpeechEngine interface.";
    }

    /**
     * Gets the voice property
     * @type {string}
     */
    get voice() {
        throw "The voice getter must be implemented to support the ISpeechEngine interface.";
    }

    /**
     * Sets the voice property
     * @type {string}
     */
    set voice(voice) {
        throw "The voice setter must be implemented to support the ISpeechEngine interface.";
    }

    /**
     * Gets the speed property
     * @type {number}
     */
    get speed() {
        throw "The speed getter must be implemented to support the ISpeechEngine interface.";
    }

    /**
     * Sets the speed property
     * @type {number}
     */
    set speed(speed) {
        throw "The speed setter must be implemented to support the ISpeechEngine interface.";
    }

}

const EVENT = {
    START: 'start',
    STOP: 'stop',
    WORD: 'word',
    ANALYTICS: 'analytics',
};

const Events = {
    // fires as soon as play or speech start request is made.  Maybe delay before teh actual audio plays. 
    start: (setSpeaking) => {
        return new CustomEvent(EVENT.START, { detail: { setSpeaking: setSpeaking } })
    },
    stop: (setSpeaking, continousAllowed) => {
        return new CustomEvent(EVENT.STOP, { detail: { setSpeaking: setSpeaking, continousAllowed } })
    },
    word: (detail) => {
        return new CustomEvent(EVENT.WORD, {
            detail: detail,
        })
    },
    // fires after amy required web requests and actual audio plays.
    analytics: (detail) => {
        return new CustomEvent(EVENT.ANALYTICS, {
            detail: detail,
        })
    }
};

/**
 * @class SpeechManager
 * @classdesc Manages the speech using multiple speech engines. 
 * @implements ISpeechEngine
 */
class SpeechManager extends ISpeechEngine {

    /**
     * @function initialise
     * @description Initialises the SpeechEngine
     * @param {object} settings for the SpeechManager
     */
    async initialise({ speechEngines = [] }) {

        this._speechEngines = {};
        this._currentEngine = null;

        //build the speech engine map eg {"engine1": {}}
        for (var i = 0; i < speechEngines.length; i++) {
            this._speechEngines["engine" + i] = speechEngines[i];
        }

        this._setSpeechEngine({ "speechEngine": this._speechEngines["engine0"] });

        this._currentVoice = "";
    }

    /**
     * @function play
     * @description Implements the SpeechEngines play or speak function
     * @param {object} speechsettings object containing settings for speech.
     * @param {Array.<string>} speechsettings.words Array of strings to speak
     * @param {boolean} [speechsettings.useEvents] set to true if you want speech event details 
     */
    play({ words = [], useEvents = true, voice = "", speed = -1, setSpeaking = true, continousAllowed = true }) {
        if (voice.length > 0) {
            const voiceExists = this.voiceExists(voice);
            if (!voiceExists) {
                voice = "Ava";
            }
            this.voice = voice;
        }

        if (speed > -1) {
            this.speed = speed;
        }
        this._currentEngine.play({ words, useEvents, voice, setSpeaking, continousAllowed });
    }

    /**
     * @function stop
     * @description Implements the SpeechEngines stop function
     */
    stop() {
        this._currentEngine.stop();
    }

    /**
     * @function pause
     * @description Implements the SpeechEngines pause function
     */
    pause() {
        this._currentEngine.pause();
    }

    /**
     * @function pause
     * @description Implements the SpeechEngines pause function
     * @returns {Array.<string>} returns a string array of voices.
     */
    getVoices() {
        this._voices = new Array();
        this._voiceToEngineMap = new Array();

        for (var engine in this._speechEngines) {
            if (this._speechEngines.hasOwnProperty(engine)) {
                let currentEngineVoices = this._speechEngines[engine].getVoices();
                for (var v in currentEngineVoices) {
                    if (currentEngineVoices.hasOwnProperty(v)) {


                        // id is voiceid for new elevenlabs voices
                        var voiceItem = {
                            "name": currentEngineVoices[v].name,
                            "id": currentEngineVoices[v].id,
                            "description": currentEngineVoices[v].description,
                            "language": currentEngineVoices[v].language,
                            "vendor": currentEngineVoices[v].vendor,
                            "ai": currentEngineVoices[v].ai ? true : false,
                            "offline": currentEngineVoices[v].offline ? true : false,
                            "premiumOnly": currentEngineVoices[v].premiumOnly ? true : false,
                            "market": currentEngineVoices[v].market ? currentEngineVoices[v].market : ""
                        };

                        //voiceItem[voice] = currentEngineVoices[voice];
                        this._voices.push(voiceItem);

                        this._voiceToEngineMap[currentEngineVoices[v].name] = this._speechEngines[engine];
                    }
                }

            }
        }

        this._voices = this._voices.sort((a, b) => a.language.localeCompare(b.language));

        return this._voices;
    }

    /**
     * Gets the voice property
     * @type {string}
     */
    get voice() {
        return this._currentEngine.voice;
    }

    /**
     * Sets the voice property
     * @type {string}
     */
    set voice(voice) {

        if (voice === this._currentVoice) {
            return;
        }

        if (!this._voiceToEngineMap) {
            // will set up the map if it is not set up yet
            this.getVoices();
        }
        // get the current speech engine and set it. The set its voice. 
        // it may be a voice that no longer exists. 
        let engine = this._voiceToEngineMap[voice];
        if (!engine) {
            // if the voice does not exist, set the voice to Ava
            engine = this._voiceToEngineMap["Ava"];
            // throw `Could not find the voice ${voice}`;
        }

        // set the speech engine
        this._setSpeechEngine({ "speechEngine": engine });

        // set the engines voice.
        engine.voice = voice;

        this._currentVoice = voice;

    }

    /**
     * Gets the speed property
     * @type {number}
     */
    get speed() {
        return this._currentEngine.speed;
    }

    /**
     * Sets the speed property
     * @type {number}
     */
    set speed(speed) {
        this._currentEngine.speed = speed;
    }

    voiceExists(voice) {
        if (!voice || voice.trim() === '') {
            return false;
        }

        if (!this._voiceToEngineMap) {
            // will set up the map if it is not set up yet
            this.getVoices();
        }
        let engine = this._voiceToEngineMap[voice];
        if (engine) {
            return true;
        }
        return false;

    }

    _setSpeechEngine({ speechEngine = null }) {

        // if the engine isn't set or hasn't changed do nothing.
        if (!speechEngine) {
            return;
        }

        if (speechEngine === this._currentEngine) {
            return;
        }

        if (this._currentEngine !== null) {
            this._currentEngine.removeEventListener(EVENT.START, this._onStart);
            this._currentEngine.removeEventListener(EVENT.STOP, this._onStop);
            this._currentEngine.removeEventListener(EVENT.WORD, this._onWord);
            this._currentEngine.removeEventListener(EVENT.ANALYTICS, this._onAnalytics);
        }

        this._currentEngine = speechEngine;

        this._currentEngine.addEventListener(EVENT.START, this._onStart, true);
        this._currentEngine.addEventListener(EVENT.STOP, this._onStop, true);
        this._currentEngine.addEventListener(EVENT.WORD, this._onWord, true);
        this._currentEngine.addEventListener(EVENT.ANALYTICS, this._onAnalytics, true);

    }

}

/**
 * Copyright (C) 2017-present by Andrea Giammarchi - @WebReflection
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const {replace} = '';
const ca = /[&<>'"]/g;

const esca = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
};
const pe = m => esca[m];

/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
 * @param {string} es the input to safely escape
 * @returns {string} the escaped input, and it **throws** an error if
 *  the input type is unexpected, except for boolean and numbers,
 *  converted as string.
 */
const escape = es => replace.call(es, ca, pe);

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

 //*+ The following code is derived from MD5 hash functions (c) Paul Johnston, http://pajhome.org.uk/crypt/md5/. //+*

class md5{
    constructor(){

        /*
        * Configurable variables. You may need to tweak these to be compatible with
        * the server-side, but the defaults work in most cases.
        */
        this.hexcase = 0;  // hex output format. 0 - lowercase; 1 - uppercase
        this.b64pad  = ""; // base-64 pad character. "=" for strict RFC compliance   
        this.chrsz   = 8;  // bits per input character. 8 - ASCII; 16 - Unicode
    }


/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
    hex_md5(s)
    { 
        return this.binl2hex(this.core_md5(this.str2binl(s), s.length * this.chrsz));
    }
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
    core_md5(x, len)
    {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var a =  1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d =  271733878;

        for(var i = 0; i < x.length; i += 16)
        {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;

            a = this.md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
            d = this.md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
            c = this.md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
            b = this.md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
            a = this.md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
            d = this.md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
            c = this.md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
            b = this.md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
            a = this.md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
            d = this.md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
            c = this.md5_ff(c, d, a, b, x[i+10], 17, -42063);
            b = this.md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
            a = this.md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
            d = this.md5_ff(d, a, b, c, x[i+13], 12, -40341101);
            c = this.md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
            b = this.md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

            a = this.md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
            d = this.md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
            c = this.md5_gg(c, d, a, b, x[i+11], 14,  643717713);
            b = this.md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
            a = this.md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
            d = this.md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
            c = this.md5_gg(c, d, a, b, x[i+15], 14, -660478335);
            b = this.md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
            a = this.md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
            d = this.md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
            c = this.md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
            b = this.md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
            a = this.md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
            d = this.md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
            c = this.md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
            b = this.md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

            a = this.md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
            d = this.md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
            c = this.md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
            b = this.md5_hh(b, c, d, a, x[i+14], 23, -35309556);
            a = this.md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
            d = this.md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
            c = this.md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
            b = this.md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
            a = this.md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
            d = this.md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
            c = this.md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
            b = this.md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
            a = this.md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
            d = this.md5_hh(d, a, b, c, x[i+12], 11, -421815835);
            c = this.md5_hh(c, d, a, b, x[i+15], 16,  530742520);
            b = this.md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

            a = this.md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
            d = this.md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
            c = this.md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
            b = this.md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
            a = this.md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
            d = this.md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
            c = this.md5_ii(c, d, a, b, x[i+10], 15, -1051523);
            b = this.md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
            a = this.md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
            d = this.md5_ii(d, a, b, c, x[i+15], 10, -30611744);
            c = this.md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
            b = this.md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
            a = this.md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
            d = this.md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
            c = this.md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
            b = this.md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

            a = this.safe_add(a, olda);
            b = this.safe_add(b, oldb);
            c = this.safe_add(c, oldc);
            d = this.safe_add(d, oldd);
        }
        return Array(a, b, c, d);

    }

/*
 * These functions implement the four basic operations the algorithm uses.
 */
    md5_cmn(q, a, b, x, s, t)
    {
        return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s),b);
    }

    md5_ff(a, b, c, d, x, s, t)
    {
        return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    
    md5_gg(a, b, c, d, x, s, t)
    {
        return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    md5_hh(a, b, c, d, x, s, t)
    {
        return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }

    md5_ii(a, b, c, d, x, s, t)
    {
        return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
    safe_add(x, y)
    {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

/*
 * Bitwise rotate a 32-bit number to the left.
 */
    bit_rol(num, cnt)
    {
        return (num << cnt) | (num >>> (32 - cnt));
    }

/*
 * Convert a string to an array of little-endian words
 * If this.chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
    str2binl(str)
    {
        var bin = Array();
        var mask = (1 << this.chrsz) - 1;
        for(var i = 0; i < str.length * this.chrsz; i += this.chrsz)
        {
            bin[i>>5] |= (str.charCodeAt(i / this.chrsz) & mask) << (i%32);
        }
        return bin;
    }

/*
 * Convert an array of little-endian words to a hex string.
 */
    binl2hex(binarray)
    {
        var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i++)
        {
            str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
                hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
        }
        return str;
    }

// todo to make the method visible externally after obfuscation
    $rw_hash(p_str)
    {
        return this.hex_md5(p_str);
    }
}

/**
 * Safely requests an animation frame or falls back to using `setTimeout` based on visibility state or a forced timer option.
 *
 * @function safeRequestAnimationFrame
 * @param {Function} callback - The callback function to be executed on the animation frame or timer.
 * @param {boolean} [useTimer=false] - Boolean flag to force the use of `setTimeout` even when `requestAnimationFrame` is available.
 * @returns {{type: string, value: number}} An object with the type of method used (`'raf'` or `'timeout'`) and the corresponding ID.
 * - `type` indicates whether the callback is registered using `requestAnimationFrame` or `setTimeout`.
 * - `value` is the ID returned by `requestAnimationFrame` or `setTimeout`, which can be used to cancel the execution later.
 *
 * @example
 * // Request an animation frame with fallback to setTimeout if needed
 * const id = safeRequestAnimationFrame(() => {
 *   console.log("Animation step executed.");
 * }, false);
 *
 * @example
 * // Force using setTimeout instead of requestAnimationFrame
 * const id = safeRequestAnimationFrame(() => {
 *   console.log("Animation step executed using timer.");
 * }, true);
 */
const safeRequestAnimationFrame = (callback, useTimer = false) => {
    // Create a unique object to hold the ID and identify the type of the ID
    let id = {
        type: '',
        value: null
    };

    // Function to request animation frame or set a timer based on visibility or force flag
    const step = () => {
        if (!useTimer && document.visibilityState === 'visible' && typeof window.requestAnimationFrame === 'function') {
            id.type = 'raf';
            id.value = window.requestAnimationFrame(callback);
        } else {
            // Fallback to setTimeout if requestAnimationFrame is not available or if useTimer is true
            id.type = 'timeout';
            id.value = setTimeout(callback, 16); // Approximately 60fps
        }
        return id;
    };

    return step();
};

/**
 * Safely cancels an animation frame or clears a timeout using the returned ID object from `safeRequestAnimationFrame`.
 *
 * @function safeCancelAnimationFrame
 * @param {{type: string, value: number}} id - The ID object returned from `safeRequestAnimationFrame` function.
 * - `type` should be either `'raf'` or `'timeout'` to indicate the type of method used.
 * - `value` is the ID returned by `requestAnimationFrame` or `setTimeout`.
 * @returns {void}
 *
 * @example
 * // Start an animation loop
 * const id = safeRequestAnimationFrame(() => {
 *   console.log("Animation step executed.");
 * });
 *
 * // Cancel the animation or timeout using the returned ID
 * safeCancelAnimationFrame(id);
 */
const safeCancelAnimationFrame = (id) => {
    if (!id) {
        return;
    }
    if (id.type === 'raf' && typeof window.cancelAnimationFrame === 'function') {
        window.cancelAnimationFrame(id.value);
    } else if (id.type === 'timeout') {
        clearTimeout(id.value);
    }
};

const arrayBuffer2String = arrayBufferIn => {
  var binary = '';
  var bytes = new Uint8Array(arrayBufferIn);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};
const string2ArrayBuffer = stringIn => {
  var binary_string = atob(stringIn);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
};

/** Class representing the content/browser functionality of fetch. */
class Requests {
  /**
   * The constructor sets the default fetch headers
   */
  constructor() {
    //    this.headers = { "content-type": "application/json" };
  }

  /**
   * Calls fetch
   * @param  {string} endpoint - The endpoint to fetch data from
   * @param  {string} {body - The body type if available
   * @param  {JSON} ...customConfig}={} - Fetch options
   */
  static async doFetch(endpoint, {
    body,
    ...customConfig
  } = {}) {
    return new Promise(async (resolve, reject) => {
      this.method = "GET"; // default
      this.timeout = 0; // default (no timeout)
      // Check if a method has been passed
      if (customConfig.method === undefined) {
        this.method = body ? "POST" : "GET";
      } else {
        this.method = customConfig.method;
      }
      if (customConfig.blob) {
        let dataURL = body;
        var byteString = atob(dataURL.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        // hard code for now
        const mimeString = customConfig.headers["content-type"];
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        body = new Blob([ia], {
          type: mimeString
        });
      }

      // Check if we have a timeout
      if (customConfig.timeout) {
        this.timeout = customConfig.timeout;
      }
      const config = {
        method: this.method,
        ...customConfig,
        headers: {
          ...customConfig.headers
        }
      };
      if (body) {
        config.body = body; // JSON.stringify(body);
      }
      let response = null;
      if (this.timeout > 0) {
        try {
          const controller = new AbortController();
          const id = setTimeout(() => controller.abort(), this.timeout);
          response = await fetch(endpoint, {
            ...config,
            signal: controller.signal
          });
          clearTimeout(id);
        } catch (ex) {
          return Promise.reject(ex);
        }
      } else {
        try {
          response = await fetch(endpoint, config);
        } catch (ex) {
          resolve({
            error: ex.toString()
          });
          return;
        }
      }
      if (!response.ok) {
        reject(result);
        return;
      }
      let result = {};
      result.contentType = response.headers.get("content-type");
      result.headers = Object.fromEntries(response.headers.entries());
      if (!result.contentType) {
        reject(result);
        return;
      }
      if (result.contentType.indexOf("application/json") !== -1) {
        result.json = await response.json();
      } else if (result.contentType.startsWith("text")) {
        result.text = await response.text();
      } else if (result.contentType.indexOf("audio/mpeg") !== -1) {
        let arrayBuffer = await response.arrayBuffer();
        result.arrayBuffer = arrayBuffer2String(arrayBuffer);
      } else {
        result.blob = await response.blob();
      }
      resolve({
        data: result
      });
    });
  }

  /**
   * Calls fetch with optional ETag support.
   * @param  {string} endpoint - The endpoint to fetch data from
   * @param  {Object} options - Fetch options
   * @param  {string} [options.body] - The body content if available
   * @param  {boolean} [options.useETag=false] - Whether to use ETag caching
   * @param  {Object} [options.storage] - Storage object for ETag and cached data (must implement getItem and setItem)
   * @param  {Object} [options.headers] - Additional headers
   * @param  {number} [options.timeout=0] - Timeout in milliseconds (0 for no timeout)
   */
  static async doFetch2(endpoint, {
    body,
    useETag = false,
    storage = null,
    ...customConfig
  } = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        // Determine the method
        let method = customConfig.method || (body ? "POST" : "GET");

        // Handle blob data
        if (customConfig.blob) {
          let dataURL = body;
          var byteString = atob(dataURL.split(',')[1]);
          var ab = new ArrayBuffer(byteString.length);
          var ia = new Uint8Array(ab);
          // Assume content-type is provided in headers
          const mimeString = customConfig.headers["content-type"];
          for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          body = new Blob([ia], {
            type: mimeString
          });
        }

        // Set up the fetch configuration
        const config = {
          method: method,
          ...customConfig,
          headers: {
            ...customConfig.headers
          }
        };

        // Include body if present
        if (body) {
          config.body = body;
        }

        // ETag handling
        let etagKey = `etag_${endpoint}`;
        let cacheKey = `cache_${endpoint}`;
        let storageAvailable = false;
        let etag = null;
        let cachedData = null;
        if (useETag && storage) {
          storageAvailable = true;

          // Retrieve stored ETag and cached data
          etag = await storage.getItem(etagKey);
          cachedData = await storage.getItem(cacheKey);

          // Include ETag in request headers if available
          if (etag) {
            config.headers['If-None-Match'] = etag;
          }
        }

        // Set default cache option to 'no-cache' to ensure ETag validation
        if (!config.cache) {
          config.cache = 'no-cache';
        }

        // Handle timeout
        let timeout = customConfig.timeout || 0;
        let response = null;
        try {
          if (timeout > 0) {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);
            config.signal = controller.signal;
            response = await fetch(endpoint, config);
            clearTimeout(id);
          } else {
            response = await fetch(endpoint, config);
          }
        } catch (ex) {
          reject({
            error: ex.toString()
          });
          return;
        }

        // Handle ETag 304 Not Modified response
        if (response.status === 304 && useETag && storageAvailable && cachedData) {
          let result = {
            status: 304,
            data: cachedData,
            headers: Object.fromEntries(response.headers.entries())
          };
          resolve(result);
          return;
        }

        // Handle other non-OK responses
        if (!response.ok) {
          let errorResult = {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
          };
          reject(errorResult);
          return;
        }

        // Process the response data
        let result = {
          status: response.status,
          headers: Object.fromEntries(response.headers.entries())
        };
        result.contentType = response.headers.get("content-type");
        if (result.contentType && result.contentType.includes("application/json")) {
          result.data = await response.json();
        } else if (result.contentType && result.contentType.startsWith("text")) {
          result.data = await response.text();
        } else if (result.contentType && result.contentType.includes("audio/mpeg")) {
          let arrayBuffer = await response.arrayBuffer();
          result.data = arrayBuffer2String(arrayBuffer);
        } else {
          result.data = await response.blob();
        }

        // Store ETag and cached data if applicable
        if (useETag && storageAvailable) {
          let newEtag = response.headers.get('ETag');
          if (newEtag) {
            await storage.setItem(etagKey, newEtag);
            await storage.setItem(cacheKey, result.data);
          }
        }
        resolve(result);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}

/* eslint-disable no-undef */
/** Class representing the content/browser functionality of fetch. */
class ISOFetch {
  /**
   * A static function to call the background fetch
   * @param  {string} url - The endpoint to fetch data from
   * @param  {JSON} options -  The fetch options
   * @return {Promise} A promise containing the parsed response.
   * The returned object type depends on the content type of the response.
   * It can be text, json or a blob.
   */
  static async fetch(url, options) {
    return new Promise(async (resolve, reject) => {
      const handleResponse = response => {
        if (!response.data) {
          reject(response);
          return;
        }
        if (response.data.arrayBuffer) {
          response.data.arrayBuffer = string2ArrayBuffer(response.data.arrayBuffer);
        }
        resolve(response);
      };

      // Test for now
      const params = {
        command: "swfetch8598",
        url,
        options
      };
      if (chrome.runtime) {
        chrome.runtime.sendMessage(params, handleResponse);
        return;
      }
      Requests.doFetch(params.url, params.options).then(handleResponse);
    });
  }

  /**
   * A static function to call the background fetch
   * @param  {string} url - The endpoint to fetch data from
   * @param  {JSON} options -  The fetch options
   * @return {Promise} A promise containing the parsed response.
   * The returned object type depends on the content type of the response.
   * It can be text, json or a blob.
   */
  static async fetch2(url, useETag = false, options) {
    return new Promise(async (resolve, reject) => {
      const handleResponse = response => {
        if (!response.data) {
          reject(response);
          return;
        }
        if (response.data.arrayBuffer) {
          response.data.arrayBuffer = string2ArrayBuffer(response.data.arrayBuffer);
        }
        resolve(response);
      };

      // Test for now
      const params = {
        command: "swfetch8599",
        url,
        useETag,
        options
      };
      if (chrome.runtime) {
        chrome.runtime.sendMessage(params, handleResponse);
        return;
      }

      // Storage wrapper for localStorage
      const localStorageWrapper = {
        getItem: async key => {
          return Promise.resolve(localStorage.getItem(key));
        },
        setItem: async (key, value) => {
          localStorage.setItem(key, value);
          return Promise.resolve();
        }
      };
      Requests.doFetch2(params.url, {
        useETag: useETag,
        storage: localStorageWrapper,
        options: params.options
      }).then(handleResponse);
    });
  }
  static blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = function () {
        var dataUrl = reader.result;
        // var base64 = dataUrl.split(',')[1];
        // resolve(base64);
        resolve(dataUrl);
      };
      reader.readAsDataURL(blob);
    });
  }
}

var Prons = {
    "voices": {
        "Ava": "en-US"
    },
    "lang": {
        "all": {
            "EquatIO": "e-qway-shi-o",
            "Equatio": "e-qway-shi-o",
            "equatio": "e-qway-shi-o",
            "WriQ": "Wry-Q",
            "wriq": "Wry-Q",
            "Wriq": "Wry-Q"
        },
        "en-US": {
            "EquatIO": "e-qway-shi-o",
            "Equatio": "e-qway-shi-o",
            "equatio": "e-qway-shi-o",
            "WriQ": "Wry-Q",
            "wriq": "Wry-Q",
            "Wriq": "Wry-Q"
        }
    }
};

//todo make singleton
//todo more than one word
//todo laod json
class Pronunciations{
    constructor(){
        this.prons = {
            "voices": {},

            "lang": {}
        };
        if (typeof Prons !="undefined" && Prons !=null ) {
            this.prons=Prons;
        }
    }

    loadPronFile(dns){
        //todo load file this.prons = Prons
    }


    setPronunciationsForVoice(voice,words){
        let voicePronObject = this.prons.voices[voice];
        this.setPronunciationsForLang(voicePronObject,words);
    }

    setPronunciationsForLang(lang,words){
        let langProns = this.prons.lang[lang];
        let allProns = this.prons.lang["all"];
        let merged = Object.assign({}, allProns,langProns);

        if (merged!=null && typeof  merged != "undefined"){
            for (let pron in merged){
                for (let i=0;i<words.length;i++){
                    words[i] =words[i].replace(pron,merged[pron]);
                }
            }
        }
    }
}

/**
 * @class SpeechServerEngine
 * @classdesc Manages the speech using the SpeechServer. 
 * @implements ISpeechEngine
 */
class SpeechServerEngine extends ISpeechEngine {

    /**
     * @function initialise
     * @description Initialises the SpeechEngine
     * @param {object} [speechServerSettings]
     * @param {string} [speechServerSettings.speechServer] dns of speech server to use.
     * @param {string} [speechServerSettings.cacheServer] dns of cached speech server to use.
     * @param {boolean} [speechServerSettings.useCaching] true turns on server caching.
     * @param {string} speechServerSettings.userName the account using the speechserver.
     * @param {string} [speechServerSettings.voice] the starting voice, defaults to Ava.
     * @param {number} [speechServerSettings.cache1] the first caching folder.
     * @param {number} [speechServerSettings.cache2] the second caching folder.
     * @param {number} [speechServerSettings.cache3] the third caching folder.
     * @param {number} [speechServerSettings.speed] defaults to 50%.
     * @param {EventTarget} [speechServerSettings.eventContext] defaults to this. This is the EventTarget object that willdispatch speech events. The speechManager or an engine.
     * @param {object} [speechServerSettings.charMap] is a map of characters that will be mapped or replaced by others
     * @param {boolean} [speechServerSettings.forceTimer] forces the word updater to be based on a timer rather than requestAnimationFrame
     */
    initialise({
        speechServer = "speech.speechstream.net",
        cacheServer = "cache.speechstream.net",
        useCaching = false,
        userName = "",
        voice = "Ava",
        cache1 = 0,
        cache2 = 0,
        cache3 = 0,
        speed = 50,
        eventContext = this,
        charMap = {
            '’': "'",   //8217
            '`': "'",   //96
            '™': ' ',   //8482
            '—': ' '    //8212
        },
        forceTimer = false

    }) {
        this._speechConfig = {};
        this._speechConfig.speechServer = speechServer;
        this._speechConfig.cacheServer = cacheServer;
        this._speechConfig.useCaching = useCaching;
        this._speechConfig.userName = userName;
        this._speechConfig.cache1 = cache1;
        this._speechConfig.cache2 = cache2;
        this._speechConfig.cache3 = cache3;
        this._speechConfig.speed = speed;
        this._speechConfig.voice = voice;
        this._forceTimer = forceTimer;
        this._animationFrameId = 0;
        this._playbackTimeArray = [];
        this._currentHighlightWord = 0;
        this._paused = false;
        this._eventContext = eventContext;
        this._charMap = charMap;
        this._speechStop = false;
        this._continousAllowed = true;
        this._setSpeaking = true;

        // create the audio element


        if (this._speechConfig.eventTarget === null) {
            this._speechConfig.audioCtx = null;
            this._speechConfig.audioSource = null;
        }

        new EventTarget();

        this._pronunciations = new Pronunciations();

        //  throw "The initialise function must be implemented to support the ISpeechEngine interface.";
    }

    /**
     * @function play
     * @description Implements the SpeechEngines play or speak function
     * @param {object} speechsettings object containing settings for speech.
     * @param {Array.<string>} speechsettings.words Array of strings to speak
     * @param {boolean} [speechsettings.useEvents] set to true if you want speech event details 
     */
    async play({ words = [], voice = "", useEvents = true, setSpeaking = true, continousAllowed = true }) {

        if (words.length < 1) {
            return;
        }

        this._continousAllowed = continousAllowed;
        this._setSpeaking = setSpeaking;

        this._speechStop = false;

        this._eventContext.dispatchEvent(Events.start(setSpeaking));

        this._paused = false;
        this._playbackTimeArray.length = 0;

        words = this._replaceInvalidCharactersInArray(words);

        this._pronunciations.setPronunciationsForVoice(this._speechConfig.voice, words);
        let textDetails = this._buildSSMLText(words.slice(0, 200), useEvents);

        // try retrieve from the cache first, it ma be turned off in which case it will return null.
        let response = await this._getCachedSpeech({ "fileName": textDetails.hash });
        if (response === null) {

            // if cache is off or nothing in, it make the speech request.
            response = await this._makeSpeechRequest({
                "processedText": textDetails.processedText,
                "hash": textDetails.hash
            });
        }

        this._startAudio(response);

        let detail = {
            voice: voice,
            speed: this._speechConfig.speed,
            numWords: words.length,
            textLength: words.join(' ').length,
            responseTime: response.responseTime,
            onLine: true,
        };

        //Dispatch on speech Analytics Event
        this._eventContext.dispatchEvent(Events.analytics({ eventCategory: 'on speech', eventName: 'TextToSpeechEngaged', category: 'Feature', feature: 'Speech', detail: detail }));
    }

    /**
     * @function stop
     * @description Implements the SpeechEngines stop function
     */
    async stop() {

        this._speechStop = true;

        safeCancelAnimationFrame(this._animationFrameId);
        this._paused = false;
        this._playbackTimeArray.length = 0;

        // fire the speech stopped event
        this._eventContext.dispatchEvent(Events.stop());

        if (this._speechConfig.audioCtx === null || this._playbackTimeArray === null) {
            return;
        }

        // stop the html5 playback.
        if (this._speechConfig.audioSource) {
            this._speechConfig.audioSource.stop(0);
        }
    }

    /**
     * @function pause
     * @description Implements the SpeechEngines pause/resume function
     */
    pause() {
        try {
            if (!this._speechConfig.audioCtx) {
                return;
            }
            if (this._speechConfig.audioCtx.state === 'running') {
                this._speechConfig.audioCtx.suspend();
                this._paused = true;
            }
            else if (this._speechConfig.audioCtx.state === 'suspended') {
                this._speechConfig.audioCtx.resume();
                this._paused = false;
            }

        }
        catch (err) {
            console.log('Request failed: SpeechServer - pause: ', err);

        }
    }

    /**
     * Gets the voice property
     * @type {string}
     */
    get voice() {
        return this._speechConfig.voice;
    }

    /**
     * Sets the voice property
     * @type {string}
     */
    set voice(voice) {
        this._speechConfig.voice = voice;
    }

    /**
     * Gets the speed property
     * @type {number}
     */
    get speed() {
        return this._speechConfig.speed;
    }

    /**
     * Sets the speed property
     * @type {number}
     */
    set speed(speed) {
        this._speechConfig.speed = speed;
    }

    /**
     * Sets the cache1 property
     * @type {number}
     */
    set cache1(cache1) {
        this._speechConfig.cache1 = cache1;
    }

    /**
     * Sets the cache2 property
     * @type {number}
     */
    set cache2(cache2) {
        this._speechConfig.cache2 = cache2;
    }

    /**
     * Sets the cache3 property
     * @type {number}
     */
    set cache3(cache3) {
        this._speechConfig.cache3 = cache3;
    }

    /**
     * @function setSpeechServerVoices
     * @description to save requests the consumer application must tell us what speech server voices
     *   are available.
     * @param {Array.<object>} voices the server provides
     */
    setSpeechServerVoices(voices) {
        this._voices = this._convertVoicesToTexthelpFormat(voices);
    }

    /**
     * Searches the vocie list for the details of a voice, language etc. 
     * @param {string} voiceName to search for
     * @returns the details of the voice
     */
    findVoiceDetialsByName(voiceName) {
        return this._voices.find(voiceDetails => voiceDetails.name === voiceName);
    }

    /**
     * @function _convertVoicesToTexthelpFormat
     * @description takes the engines voice list format and converts it to a common Texthelp format
     * @param {Array.<object>} voices from the SpeechServerEngine
     * @returns {Array.<object>} voices in the Texthelp format.
     * @private
     */
    _convertVoicesToTexthelpFormat(speechServerVoices) {
        let texthelpVoices = speechServerVoices.map(SpeechServerVoice => {
            return {
                name: SpeechServerVoice.name,
                gender: SpeechServerVoice.Gender,
                language: SpeechServerVoice.language,
                description: SpeechServerVoice.description,
                vendor: SpeechServerVoice.vendor,
                offline: false,
                market: SpeechServerVoice.market ? SpeechServerVoice.market : ""
            }
        });

        return texthelpVoices;
    }

    /**
     * @function _replaceInvalidCharactersInWord
     * @description takes word and removes emoji's & invalid words 
     * @param {string} word the word
     * @returns {string} valid word
     * @private
     */
    _replaceInvalidCharactersInWord(word) {
        let result = word.replace(/(\u00a9|\u00ae|[\u2000-\u20AB]|[\u20AD-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g, function (match) {
            // if the match is a double quote then return it. Special characters are not handled by voice servers well so have to change it.
            if (match === "\u201D" || match === "\u201C") {
                return '"';
            } else {
                return '';
            }
        });
        return result;
    }

    /**
     * @function _replaceInvalidCharactersInArray
     * @description takes the words array and removes any invalid words
     * @param {Array.<string>} array Array of word strings 
     * @returns {Array.<string>} valid array of word strings.
     * @private
     */
    _replaceInvalidCharactersInArray(array) {
        array.forEach((word, i) => {
            array[i] = this._replaceInvalidCharactersInWord(word);
        });
        return array;

    }

    /**
     * @function getVoices
     * @description Gets a list of the engines available voices.
     * @returns {Array.<object>} the voice array.
     */
    getVoices() {
        return this._voices;
    }

    string2ArrayBuffer(stringIn) {
        var binary_string = atob(stringIn);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }


    /**
     * @function _makeSpeechRequest
     * @description Makes a request tot he speech server to generate audio
     * @private
     * @param {object} params 
     * @param {string} params.processedText is the text in ssml xml format.
     * @param {string} params.hash is the text hashed.  
     * @returns {Promise} Promise object represents a speech response {"timings", "audioBuffer"}
     */
    async _makeSpeechRequest({ processedText = "", hash = "" }) {

        return new Promise(async (resolve, reject) => {

            // let ssmlHeader = `<?xml version="1.0"?>
            //     <speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis"
            //     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            //     xsi:schemaLocation="http://www.w3.org/2001/10/synthesis
            //     http://www.w3.org/TR/speech-synthesis11/synthesis.xsd"
            //     xml:lang="${this._speechConfig.language}"> `; 

            let language = this.findVoiceDetialsByName(this._speechConfig.voice).language;

            let ssmlHeader = `<?xml version=\"1.0\"?>\n<speak version=\"1.1\" xmlns=\"http://www.w3.org/2001/10/synthesis\"\nxmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\nxsi:schemaLocation=\"http://www.w3.org/2001/10/synthesis\nhttp://www.w3.org/TR/speech-synthesis11/synthesis.xsd\"\nxml:lang=\"${language}\">`;

            let fetchData = `text=${ssmlHeader}${encodeURIComponent(processedText)}&username=${this._speechConfig.userName}&speed=${this._speechConfig.speed}&requestType=ssml`;
            if (this._speechConfig.useCaching) {
                fetchData += `&destFilename=${hash}&destFolder=${this._getCacheLocation()}`;
            }

            let requestStartTime = new Date().getTime();

            let response = await ISOFetch.fetch(`${this._speechConfig.speechServer}Generator/voice/${this._speechConfig.voice}?`, {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-GB,en;q=0.9,ar;q=0.8,en-US;q=0.7,en-CA;q=0.6",
                    "cache-control": "no-cache",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": fetchData,
                "method": "POST",
                "mode": "cors"
            });
            let responseTime = (new Date()) - requestStartTime;

            let arraybuffer = response.data.arrayBuffer;

            let length = parseInt(response.data.headers["th-time"]);
            let buf = arraybuffer.slice(0, length);
            let timingResponseJSON = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(buf)));

            resolve({ "timings": timingResponseJSON, "audioBuffer": arraybuffer.slice(length), "responseTime": responseTime });
        });
    }

    /**
    * @function _getCachedSpeech
    * @description Retrieves cached audio from the server. Internally checks the useCaching flag so externally functions 
    * can just call.
    * @private
    * @param {object} params 
    * @param {string} params.fileName is the name of the file to retrieve from the cache. 
    * @returns {Promise} Promise object represents cached speech response {"timings", "audioBlob"}
    */
    async _getCachedSpeech({ fileName = "" }) {
        return new Promise(async (resolve, reject) => {

            if (fileName.length < 1) {
                throw "No cached filename was set in _getCachedSpeech";
            }

            try {
                // if caching is turned off return null
                if (!this._speechConfig.useCaching) {
                    resolve(null);
                    return;
                }

                let cachedLocation = this._getCacheLocation();

                // else get the cached response.
                let url = `https://${this._speechConfig.cacheServer}/SpeechCache/${cachedLocation}/${fileName}.mp3`;
                let response = await fetch(url);
                let arraybuffer = await response.arrayBuffer();
                let length = response.headers.get("TH-TIME");
                let buf = arraybuffer.slice(0, length);
                let json = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(buf)));
                var blob = new Blob([new Uint8Array(arraybuffer.slice(length))]);

                resolve({ "timings": json, "audioBlob": blob });
            }
            catch (ex) {
                resolve(null);
            }
        });
    }

    /**
     * @function _startAudio
     * @description Start playing the audio from a seech server or cached response.
     * @private
     * @param {object} params 
     * @param {arrayBuffer} params.arrayBuffer the actual audio as a blob.
     * @param {object} params.timings timing details.  
     */
    async _startAudio({ timings = [], audioBuffer = null }) {

        // get the response xml object.
        this._playbackTimeArray = [];
        var nCounter = 0;

        this._currentHighlightWord = 0;

        for (let i = 0; i < timings.bookmarks.length; i++) {

            this._playbackTimeArray[nCounter] = timings.bookmarks[i].time / 1000;

            // ensure that two subsequent items are not the
            // same or later time before earlier time.
            if (nCounter > 0 && this._playbackTimeArray[nCounter] <=
                this._playbackTimeArray[nCounter - 1]) {
                this._playbackTimeArray[nCounter] =
                    this._playbackTimeArray[nCounter - 1] + 0.010;
            }

            nCounter = nCounter + 1;

        }

        // ios cannot play empty files. So another ios hack fix
        if (this._playbackTimeArray[
            this._playbackTimeArray.length - 1] < 0.1) {
            this._playbackTimeArray.length = 0;
        }


        if (this._speechStop) {
            return;
        }

        // we have the mp3 and now timing file so start the playback
        // timer which controls highlighting and start speaking.
        this._animationFrameId = safeRequestAnimationFrame(() => { this._audioPlaybackTimer(); }, this._forceTimer);

        if (this._speechConfig.audioCtx) {
            await this._speechConfig.audioCtx.close();
        }

        this._speechConfig.audioCtx = new AudioContext();

        this._speechConfig.audioSource = this._speechConfig.audioCtx.createBufferSource();

        this._speechConfig.audioCtx.decodeAudioData(audioBuffer, (buffer) => {
            this._speechConfig.audioSource.buffer = buffer;

            this._speechConfig.audioSource.connect(this._speechConfig.audioCtx.destination);
            this._speechConfig.audioSource.loop = false;

            this._speechConfig.audioSource.start(this._speechConfig.audioCtx.currentTime, 0);

            this._speechConfig.audioSource.addEventListener('ended', () => {
                safeCancelAnimationFrame(this._animationFrameId);

                this._eventContext.dispatchEvent(Events.stop(this._setSpeaking, this._continousAllowed));
                this._paused = false;
            });
        });

    }

    /**
     * @function _audioPlaybackTimer
     * @description uses safeRequestAnimationFrame not a timer to update the current word/time if document is visible
     */
    _audioPlaybackTimer() {


        if (this._playbackTimeArray.length > 0) {

            // if the time is after the current word then fire
            // the word callback for the word.
            if (this._playbackTimeArray[this._currentHighlightWord] < this._speechConfig.audioCtx.currentTime) {
                this._eventContext.dispatchEvent(Events.word({ wordNo: this._currentHighlightWord }));
                this._currentHighlightWord++;
            }

            if (this._playbackTimeArray.length > 0) {
                // if the time is after the current word then fire
                // the word callback for the word.
                if (this._playbackTimeArray[this._currentHighlightWord] < this._speechConfig.audioCtx.currentTime) {
                    this._eventContext.dispatchEvent(Events.word({ wordNo: this._currentHighlightWord }));
                    this.currentHighlightWord++;
                }
            }

        }


        // do it all again in a short bit.
        this._animationFrameId = safeRequestAnimationFrame(() => { this._audioPlaybackTimer(); }, this._forceTimer);

    }

    /**
     * @function _buildSSMLText
     * @description creates a string suitable to sent to the speech server froman array of words.
     * @private
     * @param {Array.<string>} words to convert to a speech string.
     * @param {boolean} [useEvents] if true turns on caching.
     * @returns {object}  hash an string to be used for the server and its hash.  {processedText, hash}
     */
    _buildSSMLText(words, useEvents) {

        let processedText = "";

        // Check if Polly voice and add prosody wrapper
        const voiceDetails = this.findVoiceDetialsByName(this._speechConfig.voice);
        const isPollyVoice = voiceDetails && voiceDetails.vendor === "Polly";

        if (isPollyVoice) {
            // Convert UI speed (0-100) to Polly rate (20%-200%)
            const prosodyRate = Math.max(20, Math.min(200, (this._speechConfig.speed * 1.8) + 20));
            processedText += `<prosody rate="${prosodyRate}%">`;
        }

        // build a bookmark string
        for (var i = 0; i < words.length; i++) {
            words[i];
            if (words[i].search(/[£$]/) != -1 && !isNaN(parseInt(words[i].replace(/[£$,]/g, "")))) {
                words[i] = `<say-as interpret-as="currency">${words[i].trim()}</say-as>`;
            }
            if (useEvents) {

                if (this._speechConfig.voice == "Serena") {
                    if (words[i].indexOf("phone") != -1) {
                        words[i] = words[i].replace(/[()]/g, "");
                    }
                    words[i] = words[i].replace(`<say-as interpret-as="phone" >`, `<say-as interpret-as="vxml:phone" >`);
                }
                processedText +=
                    `<mark name="${i}"/> ${this.encodeChars(words[i].trim())} `;
            }
            else {
                processedText += this.encodeChars(words[i]);
            }
        }

        if (this._speechConfig.language == "ja-jp") {
            processedText += "。";
        }

        if (isPollyVoice) {
            processedText += "</prosody>";
        }

        processedText += `<mark name="${i}"/> </speak>`;

        processedText = processedText.replace(/(\x3cbookmark\x20mark\x3d\x22(\d)+\x22\x2f\x3e)/g, "");
        processedText = processedText.replace(/[\s\xA0]+/g, " ");

        let md5_hash = new md5();
        let hash = md5_hash.hex_md5(processedText);

        return { processedText, hash };

    }

    /**
     * Encodes a word before sending to the speech server.
     * @param {string} word that is encoded.
     * @return {string} The encoded result.
     */
    encodeChars(word) {
        try {
            //check if SSML element and do not encode if so.
            if (word.search('<phoneme') > -1 || word.search('<sub') > -1 || word.search('<say-as') > -1 || word.search('<emphasis') > -1 || word.search('<break') > -1 || word.search('<prosody') > -1) {
                return word;
            }

            return escape(word);
            //return escape(this._speechServerEncode(word, this._charMap));
        }
        catch (err) {
            // console.log('Request failed: SpeechServer - encodeChars: ', err);

        }
    };

    /**
     * @function _speechServerEncode
     * @description Replaces characters in a string from a map
     * @param {string} stringToEncode the string with characters to be replaced 
     * @param {object} charMap is a key/value pair map of the character to replace with the replacement character. eg{".":"!"}
     * @returns 
     */
    _speechServerEncode(stringToEncode, charMap) {
        const matchStr = Object.keys(charMap).join('|');
        if (!matchStr) return str;
        const regexp = new RegExp(matchStr, 'g');
        return stringToEncode.replace(regexp, match => map[match]);
    }

    /**
     * @function _getCacheLocation
     * @description Gets the speechserver cache location
     * @returns {string} the cache location
     */
    _getCacheLocation() {
        let location = `${this._speechConfig.userName}/${this._speechConfig.cache1}/${this._speechConfig.cache2}/${this._speechConfig.cache3}/${this._speechConfig.voice}${this._speechConfig.speed}`;
        return location;
    }
}

/**
 * @class SpeechServerEngine
 * @classdesc Manages the speech using the SpeechServer. 
 * @implements ISpeechEngine
 */
class HTML5Engine extends ISpeechEngine {

    /**
     * @function initialise
     * @description Initialises the SpeechEngine
     * @param {object} [speechServerSettings]
     * @param {string} [speechServerSettings.voice] the starting voice, defaults to Ava.
     * @param {number} [speechServerSettings.speed] defaults to 50%.
     * @param {number} [speechServerSettings.eventContext] defaults to 50%.
     */
    async initialise({
        voice = "Ava",
        speed = 50,
        eventContext = this
    }) {
        this._speechSynthesisVoices = [];
        this._voiceList = await this._speechSynthesisAsyncVoices();
        this._selectedVoice = this._speechSynthesisVoices[0];
        this._selectedSpeed = 50;
        //     this._speechUtterance = null;
        this._eventContext = eventContext;
        this._responseTime = null;

        this._forcedEnd = false;

        this._speechUtterance = null;
        this._useBoundary = true;
        this._continousAllowed = true;
        this._setSpeaking = true;
        this._paused = false;

    }

    /**
     * @function _speechSynthesisAsyncVoices
     * @description Some HTML5 voices are server based making the get voices call async.
     *  It means calling speechSynthesis.getVoices can result in an empty array. This 
     *  is resoved using promises and waiting until the voices are ready if need be.
     * @private
     * @returns {Promise} that resolves to an array of voices. 
     */
    async _speechSynthesisAsyncVoices() {
        return new Promise(async (resolve, reject) => {
            this._speechSynthesisVoices = window.speechSynthesis.getVoices();
            if (this._speechSynthesisVoices.length > 0) {
                resolve(this._convertVoicesToTexthelpFormat(this._speechSynthesisVoices));
            }

            window.speechSynthesis.onvoiceschanged = e => {
                this._speechSynthesisVoices = window.speechSynthesis.getVoices();
                resolve(this._convertVoicesToTexthelpFormat(this._speechSynthesisVoices));
            };

            setTimeout(() => {
                resolve([]);
            }, 2000);

        });
    }

    /**
     * @function _convertVoicesToTexthelpFormat
     * @description takes the engines voice list format and converts it to a common Texthelp format
     * @param {Array.<object>} voices from the HTML5 Speech synthesis Engine
     * @returns {Array.<object>} voices in the Texthelp format.
     * @private
     */
    _convertVoicesToTexthelpFormat(voices) {
        let texthelpVoices = voices.map(HTML5Voice => {

            let additionToName = "";
            if (HTML5Voice.localService) {
                additionToName = " (Offline)";
            }

            return {
                name: "html5-" + HTML5Voice.name,
                gender: "unknown",
                language: HTML5Voice.lang,
                description: HTML5Voice.voiceURI + additionToName,
                vendor: "local",
                offline: HTML5Voice.localService,
                market: HTML5Voice.market ? HTML5Voice.market : "",
            }
        });

        return texthelpVoices;
    }

    /**
     * @function getVoices
     * @description Gets a list of the engines available voices.
     * @returns {Array.<object>} the voice array.
     */
    getVoices() {
        return this._voiceList;
    }

    /**
     * Gets the voice property
     * @type {string}
     */
    get voice() {
        return this._selectedVoice.name;
    }

    /**
     * Sets the voice property
     * @type {string}
     */
    set voice(voiceIn) {
        const voice = voiceIn.slice("html5-".length);
        let selectedVoice = this._speechSynthesisVoices.find(voiceItem => voiceItem.name === voice);
        if (selectedVoice !== undefined && this._selectedVoice.name !== selectedVoice.name) {
            this._selectedVoice = selectedVoice;
        }
    }

    /**
     * Gets the speed property
     * @type {number}
     */
    get speed() {
        return this._selectedSpeed;
    }

    /**
     * Sets the speed property
     * @type {number}
     */
    set speed(speed) {
        this._selectedSpeed = speed;
    }

    /**
     * @function play
     * @description Implements the SpeechEngines play or speak function
     * @param {Array.<string>} words Array of strings to speak
     */
    play({ words = [], voice = "", useEvents = true, setSpeaking = true, continousAllowed = true }) {

        if (words.length < 1) {
            return;
        }

        this._paused = false;
        // const allWords = words.join("");
        // let wordsLeft = [...words];

        this._continousAllowed = continousAllowed;
        this._setSpeaking = setSpeaking;

        this._eventContext.dispatchEvent(Events.start(setSpeaking));

        this._forcedEnd = true;
        // stop any current speech
        window.speechSynthesis.cancel();

        //let starttime = new Date().getTime();
        // Macs don't like ssml so don't use it
        // detect if we are on a mac
        // Really not sure if this is the best way to do this in our extension
        let isMac = false;
        try {
            isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        } catch (error) {
            isMac = false;
        }

        // now speak the text.
        if ((this._selectedVoice.localService) && (!isMac) && !(this._selectedVoice.voiceURI.search("Chrome OS") > -1)) {
            this._speechUtterance = new SpeechSynthesisUtterance(this._buildSSMLText(words));
        }
        else {
            this._speechUtterance = new SpeechSynthesisUtterance(words.join(" "));
        }
        this._speechUtterance.voice = this._selectedVoice;
        this._speechUtterance.speed = this._selectedSpeed;

        this._speechUtterance.addEventListener('start', event => {

            let detail = {
                voice: voice,
                speed: this._selectedSpeed,
                numWords: words.length,
                textLength: words.join(' ').length,
                responseTime: 0,
                onLine: false,
            };

            //Dispatch on speech Analytics Event
            this._eventContext.dispatchEvent(Events.analytics({ eventCategory: 'on speech', eventName: 'TextToSpeechEngaged', category: 'Feature', feature: 'Speech', detail: detail }));

            this._forcedEnd = false;

            this._speechUtterance.addEventListener('end', event => {
                if (!this._forcedEnd) {
                    //   this._eventContext.dispatchEvent(Events.stop(setSpeaking));  
                    this._eventContext.dispatchEvent(Events.stop(this._setSpeaking, this._continousAllowed));
                    this._paused = false;
                }
            });

            this._speechUtterance.addEventListener('mark', event => {
                // if (this._useBoundary){
                //     this._useBoundary = false;
                // }
                this._eventContext.dispatchEvent(Events.word());
            });

            this._speechUtterance.addEventListener('boundary', event => {
                // try word highlighting
                // if (event.name === "word"){
                //     const currentWord = allWords.substr(event.charIndex-1, event.charLength);
                //     if (wordsLeft[0].includes(currentWord)){
                //         let index = words.length - wordsLeft.length;
                //         wordsLeft.shift();
                //         this._eventContext.dispatchEvent(Events.word({ wordNo: index }));
                //     }
                // }
            });


        });
        window.speechSynthesis.speak(this._speechUtterance);

    }

    /**
     * @function stop
     * @description Implements the SpeechEngines stop function
     */
    stop() {
        this._paused = false;
        // fire the speech stopped event
        this._eventContext.dispatchEvent(Events.stop());

        window.speechSynthesis.cancel();
    }

    /**
     * @function pause
     * @description Implements the SpeechEngines pause function
     */
    pause() {
        this._paused = !this._paused;
        if (!this._paused) {
            window.speechSynthesis.resume();
            return;
        }

        window.speechSynthesis.pause();
    }

    /**
    * @function _buildSSMLText
    * @description creates a string suitable to sent to the HTML5 speech engine from an array of words.
    * @private
    * @param {Array.<string>} words to convert to a speech string.
    * @returns {string} the words as an ssml string
    */
    _buildSSMLText(words) {
        let processedText = `<?xml version=\"1.0\"?>\n<speak version=\"1.1\" xmlns=\"http://www.w3.org/2001/10/synthesis\"\nxmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\nxsi:schemaLocation=\"http://www.w3.org/2001/10/synthesis\nhttp://www.w3.org/TR/speech-synthesis11/synthesis.xsd\"\nxml:lang=\"en-gb\">`; //todo change lang with voice

        let bookmarkedWords = [];
        for (var i = 0; i < words.length; i++) {
            if (words[i] === ' ' || words[i] === '' || words[i].length < 1) {
                bookmarkedWords.push(' ');
            }
            else {
                bookmarkedWords.push(`<mark name="${i}"/> ${words[i].trim()}`);
            }
        }

        processedText += bookmarkedWords.join("");
        processedText += `<mark name="${i}"/>` + '</speak>';

        return processedText;
    }
}

//do not edit this if as it is generated by code
let Tagalog = {
    name: "Tagalog",
    Gender: "Female",
    language: "ms",
    description: "Tagalog Female Amelia",
    glang: "ms",
    vendor: "Google",
    SupportedEngines: ["standard"],
};
let Afrikaans = {
    name: "Afrikaans",
    Gender: "Female",
    language: "af-za",
    description: "Afrikaans Female",
    glang: "af",
    vendor: "Google",
    SupportedEngines: ["standard"],
};
let Tarik = {
    name: "Tarik",
    Gender: "Male",
    language: "ar",
    description: "Arabic Male Tarik",
    glang: "ar",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Miren = {
    name: "Miren",
    Gender: "Female",
    language: "eu-es",
    description: "Basque Female Miren",
    glang: "eu",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Montserrat = {
    name: "Montserrat",
    Gender: "Female",
    language: "ca-es",
    description: "Catalan Female Montserrat",
    glang: "ca",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Tian_Tian = {
    name: "Tian-Tian",
    Gender: "Female",
    language: "zh-cn",
    description: "Chinese (Mandarin - Simplified) Female Tian-Tian",
    glang: "zh_cn",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Mei_Jia = {
    name: "Mei-Jia",
    Gender: "Female",
    language: "zh-tw",
    description: "Chinese (Mandarin - Traditional - Taiwanese) Female Mei-Jia",
    glang: "zh_tw",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Zuzana = {
    name: "Zuzana",
    Gender: "Female",
    language: "cs-cz",
    description: "Czech Female Zuzana",
    glang: "cs",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Sara = {
    name: "Sara",
    Gender: "Female",
    language: "da-dk",
    description: "Danish Female Sara",
    glang: "da-dk",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Magnus = {
    name: "Magnus",
    Gender: "Male",
    language: "da-dk",
    description: "Danish Male Magnus",
    glang: "da-dk",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Ellen = {
    name: "Ellen",
    Gender: "Female",
    language: "nl-be",
    description: "Dutch (Belgium and Flemish) Female Ellen",
    glang: "nl",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Claire = {
    name: "Claire",
    Gender: "Female",
    language: "nl-nl",
    description: "Dutch (Netherlands) Female Claire",
    glang: "nl",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Xander = {
    name: "Xander",
    Gender: "Male",
    language: "nl-nl",
    description: "Dutch (Netherlands) Male Xander",
    glang: "nl",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Karen = {
    name: "Karen",
    Gender: "Female",
    language: "en-au",
    description: "English (Australian) Female Karen",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Lee = {
    name: "Lee",
    Gender: "Male",
    language: "en-au",
    description: "English (Australian) Male Lee",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Veena = {
    name: "Veena",
    Gender: "Female",
    language: "en-in",
    description: "English (India) Female Veena",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Moira = {
    name: "Moira",
    Gender: "Female",
    language: "en-ie",
    description: "English (Irish) Female Moira",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Fiona = {
    name: "Fiona",
    Gender: "Female",
    language: "en-sc",
    description: "English (Scottish) Female Fiona",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Heather = {
    name: "Heather",
    Gender: "Female",
    language: "en-sc",
    description: "English (Scottish) Female Heather",
    glang: "en",
    vendor: "Cereproc",
    SupportedEngines: ["standard"],
};
let Stuart = {
    name: "Stuart",
    Gender: "Male",
    language: "en-sc",
    description: "English (Scottish) Male Stuart",
    glang: "en",
    vendor: "Cereproc",
    SupportedEngines: ["standard"],
};
let Andrew = {
    name: "Andrew",
    Gender: "Male",
    language: "en-sc",
    description: "English (Scottish) Male Andrew",
    glang: "en",
    vendor: "Cereproc",
    SupportedEngines: ["standard"],
};
let Tessa = {
    name: "Tessa",
    Gender: "Female",
    language: "en-za",
    description: "English (South African) Female Tessa",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Daniel = {
    name: "Daniel",
    Gender: "Male",
    language: "en-gb",
    description: "English (UK) Male Daniel",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Serena = {
    name: "Serena",
    Gender: "Female",
    language: "en-gb",
    description: "English (UK) Female Serena",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Allison = {
    name: "Allison",
    Gender: "Female",
    language: "en-us",
    description: "English (US) Female Allison",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Ava = {
    name: "Ava",
    Gender: "Female",
    language: "en-us",
    description: "English (US) Female Ava",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Tom = {
    name: "Tom",
    Gender: "Male",
    language: "en-us",
    description: "English (US) Male Tom",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Samantha = {
    name: "Samantha",
    Gender: "Female",
    language: "en-us",
    description: "English (US) Female Samantha",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Satu = {
    name: "Satu",
    Gender: "Female",
    language: "fi-fi",
    description: "Finnish Female Satu",
    glang: "fi",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Amelie = {
    name: "Amelie",
    Gender: "Female",
    language: "fr-ca",
    description: "French (Canadian) Female Amelie",
    glang: "fr",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Audrey = {
    name: "Audrey",
    Gender: "Female",
    language: "fr",
    description: "French Female Audrey",
    glang: "fr",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Thomas = {
    name: "Thomas",
    Gender: "Male",
    language: "fr",
    description: "French Male Thomas",
    glang: "fr",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Carmela = {
    name: "Carmela",
    Gender: "Female",
    language: "gl-es",
    description: "Galician (Spain) Female Carmela",
    glang: "gl",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Anna = {
    name: "Anna",
    Gender: "Female",
    language: "de-de",
    description: "German Female Anna",
    glang: "de",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Yannick = {
    name: "Yannick",
    Gender: "Male",
    language: "de-de",
    description: "German Male Yannick",
    glang: "de",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Petra = {
    name: "Petra",
    Gender: "Female",
    language: "de-de",
    description: "German Female Petra",
    glang: "de",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Melina = {
    name: "Melina",
    Gender: "Female",
    language: "el-gr",
    description: "Greek Female Melina",
    glang: "el",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Nikos = {
    name: "Nikos",
    Gender: "Male",
    language: "el-gr",
    description: "Greek Male Nikos",
    glang: "el",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Lekha = {
    name: "Lekha",
    Gender: "Female",
    language: "hi-in",
    description: "Hindi Female Lekha",
    glang: "hi",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Mariska = {
    name: "Mariska",
    Gender: "Female",
    language: "hu-hu",
    description: "Hungarian Female Mariska",
    glang: "hu",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Damayanti = {
    name: "Damayanti",
    Gender: "Female",
    language: "id-id",
    description: "Indonesian (Bahasa) Female Damayanti",
    glang: "id",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Alice = {
    name: "Alice",
    Gender: "Female",
    language: "it-it",
    description: "Italian Female Alice",
    glang: "it",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Federica = {
    name: "Federica",
    Gender: "Female",
    language: "it-it",
    description: "Italian Female Federica",
    glang: "it",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Luca = {
    name: "Luca",
    Gender: "Male",
    language: "it-it",
    description: "Italian Male Luca",
    glang: "it",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Paola = {
    name: "Paola",
    Gender: "Female",
    language: "it-it",
    description: "Italian Female Paola",
    glang: "it",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Ichiro = {
    name: "Ichiro",
    Gender: "Male",
    language: "ja-jp",
    description: "Japanese Male Ichiro",
    glang: "ja",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Sakura = {
    name: "Sakura",
    Gender: "Female",
    language: "ja-jp",
    description: "Japanese Female Sakura",
    glang: "ja",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Sora = {
    name: "Sora",
    Gender: "Female",
    language: "ko-kr",
    description: "Korean Female Sora",
    glang: "ko",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Nora = {
    name: "Nora",
    Gender: "Female",
    language: "no-no",
    description: "Norwegian Female Nora",
    glang: "no",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Henrik = {
    name: "Henrik",
    Gender: "Male",
    language: "no-no",
    description: "Norwegian Male Henrik",
    glang: "no",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Ewa = {
    name: "Ewa",
    Gender: "Female",
    language: "pl-pl",
    description: "Polish Female Ewa",
    glang: "pl",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Zosia = {
    name: "Zosia",
    Gender: "Female",
    language: "pl-pl",
    description: "Polish Female Zosia",
    glang: "pl",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Luciana = {
    name: "Luciana",
    Gender: "Female",
    language: "pt-br",
    description: "Portuguese (Brazilian) Female Luciana",
    glang: "pt",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Felipe = {
    name: "Felipe",
    Gender: "Male",
    language: "pt-br",
    description: "Portuguese (Brazilian) Male Felipe",
    glang: "pt",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Joana = {
    name: "Joana",
    Gender: "Female",
    language: "pt-pt",
    description: "Portuguese Female Joana",
    glang: "pt",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Catarina = {
    name: "Catarina",
    Gender: "Female",
    language: "pt-pt",
    description: "Portuguese Female Catarina",
    glang: "pt",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Ioana = {
    name: "Ioana",
    Gender: "Female",
    language: "ro-ro",
    description: "Romanian Female Ioana",
    glang: "ro",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Milena = {
    name: "Milena",
    Gender: "Female",
    language: "ru-ru",
    description: "Russian Female Milena",
    glang: "ru",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Yuri = {
    name: "Yuri",
    Gender: "Male",
    language: "ru-ru",
    description: "Russian Male Yuri",
    glang: "ru",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Laura = {
    name: "Laura",
    Gender: "Female",
    language: "sk-sk",
    description: "Slovakian Female Laura",
    glang: "sk",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Carlos = {
    name: "Carlos",
    Gender: "Male",
    language: "es-co",
    description: "Spanish (Columbian) Male Carlos",
    glang: "es",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Soledad = {
    name: "Soledad",
    Gender: "Female",
    language: "es-co",
    description: "Spanish (Columbian) Female Soledad",
    glang: "es",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Paulina = {
    name: "Paulina",
    Gender: "Female",
    language: "es-mx",
    description: "Spanish (Mexican) Female Paulina",
    glang: "es",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Juan = {
    name: "Juan",
    Gender: "Male",
    language: "es-mx",
    description: "Spanish (Mexican) Male Juan",
    glang: "es",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Jorge = {
    name: "Jorge",
    Gender: "Male",
    language: "es-es",
    description: "Spanish (Castilian) Male Jorge",
    glang: "es",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Monica = {
    name: "Monica",
    Gender: "Female",
    language: "es-es",
    description: "Spanish (Castilian) Female Monica",
    glang: "es",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Alva = {
    name: "Alva",
    Gender: "Female",
    language: "sv-se",
    description: "Swedish Female Alva",
    glang: "sv",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Oskar = {
    name: "Oskar",
    Gender: "Male",
    language: "sv-se",
    description: "Swedish Male Oskar",
    glang: "sv",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Kanya = {
    name: "Kanya",
    Gender: "Female",
    language: "th-th",
    description: "Thai Female Kanya",
    glang: "th",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Cem = {
    name: "Cem",
    Gender: "Male",
    language: "tr-tr",
    description: "Turkish Male Cem",
    glang: "tr",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Yelda = {
    name: "Yelda",
    Gender: "Female",
    language: "tr-tr",
    description: "Turkish Female Yelda",
    glang: "tr",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Lotte = {
    name: "Lotte",
    Gender: "Female",
    language: "nl-nl",
    description: "Dutch Female Lotte",
    glang: "nl",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Geraint = {
    name: "Geraint",
    Gender: "Male",
    language: "en-gb",
    description: "Welsh English Male Geraint",
    glang: "en",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Marlene = {
    name: "Marlene",
    Gender: "Female",
    language: "de-de",
    description: "German Female Marlene",
    glang: "de",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Zeina = {
    name: "Zeina",
    Gender: "Female",
    language: "arb",
    description: "Arabic Female Zeina",
    glang: "arb",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Zhiyu = {
    name: "Zhiyu",
    Gender: "Female",
    language: "zh-cn",
    description: "Chinese (Mandarin) Female Zhiyu",
    glang: "zh",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Gwyneth = {
    name: "Gwyneth",
    Gender: "Female",
    language: "cy-gb",
    description: "Welsh Female Gwyneth",
    glang: "cy",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Karl = {
    name: "Karl",
    Gender: "Male",
    language: "is-is",
    description: "Icelandic Male Karl",
    glang: "is",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Lucia = {
    name: "Lucia",
    Gender: "Female",
    language: "es-es",
    description: "Spanish (Castilian) Female Lucia",
    glang: "es",
    vendor: "Polly",
    SupportedEngines: ["neural", "standard"],
};
let Vicki = {
    name: "Vicki",
    Gender: "Female",
    language: "de-de",
    description: "German Female Vicki",
    glang: "de",
    vendor: "Polly",
    SupportedEngines: ["neural", "standard"],
};
let Chantal = {
    name: "Chantal",
    Gender: "Female",
    language: "fr-ca",
    description: "French (Canada) Female Chantal",
    glang: "fr",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Dora = {
    name: "Dora",
    Gender: "Female",
    language: "is-is",
    description: "Icelandic Female Dóra",
    glang: "is",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Enrique = {
    name: "Enrique",
    Gender: "Female",
    language: "es-es",
    description: "Spanish (Castilian) Male Enrique",
    glang: "es",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Hans = {
    name: "Hans",
    Gender: "Female",
    language: "de-de",
    description: "German Male Hans",
    glang: "de",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Celine = {
    name: "Celine",
    Gender: "Female",
    language: "fr-fr",
    description: "French Female Céline",
    glang: "fr",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Mads = {
    name: "Mads",
    Gender: "Female",
    language: "da-dk",
    description: "Danish Male Mads",
    glang: "da",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Mathieu = {
    name: "Mathieu",
    Gender: "Female",
    language: "fr-fr",
    description: "French Male Mathieu",
    glang: "fr",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Lea = {
    name: "Lea",
    Gender: "Female",
    language: "fr-fr",
    description: "French Female Léa",
    glang: "fr",
    vendor: "Polly",
    SupportedEngines: ["neural", "standard"],
};
let Naja = {
    name: "Naja",
    Gender: "Female",
    language: "da-dk",
    description: "Danish Female Naja",
    glang: "da",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Ruben = {
    name: "Ruben",
    Gender: "Female",
    language: "nl-nl",
    description: "Dutch Male Ruben",
    glang: "nl",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Conchita = {
    name: "Conchita",
    Gender: "Female",
    language: "es-es",
    description: "Spanish (Castilian) Female Conchita",
    glang: "es",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Liv = {
    name: "Liv",
    Gender: "Female",
    language: "nb-no",
    description: "Norwegian Bokmål Female Liv",
    glang: "nb",
    vendor: "Polly",
    SupportedEngines: ["standard"],
};
let Ceitidh = {
    name: "Ceitidh",
    Gender: "Female",
    language: "gd",
    glang: "gd",
    description: "Gaelic (Scottish) Female Ceitidh",
    vendor: "Cereproc",
    SupportedEngines: ["standard"],
};
let Peig = {
    name: "Peig",
    Gender: "Female",
    language: "ga",
    glang: "ga",
    description: "Irish Female Peig",
    vendor: "Cereproc",
    SupportedEngines: ["standard"],
};
let Dariush = {
    name: "Dariush",
    Gender: "Male",
    language: "fa-ir",
    glang: "fa",
    description: "Farsi Male Dariush",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};

let Carmit = {
    name: "Carmit",
    Gender: "Female",
    language: "he-il",
    glang: "he",
    description: "Hebrew Female Carmit",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};
let Lesya = {
    name: "Lesya",
    Gender: "Female",
    language: "uk-ua",
    glang: "uk",
    description: "Ukrainian Female Lesya",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};

let Jordi = {
    name: "Jordi",
    Gender: "Male",
    language: "ca-es",
    glang: "ca",
    description: "Catalan Male Jordi",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};

let Lana = {
    name: "Lana",
    Gender: "Female",
    language: "hr-hr",
    description: "Croatian Female Lana",
    glang: "hr-hr",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};

let Sinji_Ml = {
    name: "Sinji_Ml",
    Gender: "Female",
    language: "yue-hk",
    description: "Cantonese Female Sinji",
    glang: "yue-hk",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};

let Daria = {
    name: "Daria",
    Gender: "Female",
    language: "bg-bg",
    description: "Bulgarian Female Daria",
    glang: "bg-bg",
    vendor: "Nuance",
    SupportedEngines: ["standard"],
};

// let Aine = {
//     name: "Aine",
//     Gender: "Female",
//     language: "ga",
//     glang: "ga",
//     description: "Irish (Ulster) female Áine - beta",
//     vendor: "Trinity College Dublin",
//     SupportedEngines: ["standard"],
// };

// let t_Anna = {
//     name: "t_Anna",
//     Gender: "Female",
//     language: "ga",
//     glang: "ga",
//     description: "Irish (Connemara) female Anna - beta",
//     vendor: "Trinity College Dublin",
//     SupportedEngines: ["standard"],
// };

// let Caitlin = {
//     name: "Caitlin",
//     Gender: "Female",
//     language: "ga",
//     glang: "ga",
//     description: "Irish (Munster) female Caitlin - beta",
//     vendor: "Trinity College Dublin",
//     SupportedEngines: ["standard"],
// };

// let Macdara = {
//     name: "Macdara",
//     Gender: "Male",
//     language: "ga",
//     glang: "ga",
//     description: "Irish (Connemara) male Macdara - beta",
//     vendor: "Trinity College Dublin",
//     SupportedEngines: ["standard"],
// };

let Adam_11 = {
    name: "11_Adam",
    id: "pNInz6obpgDQGcFmaJgB",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Adam",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Alice_11 = {
    name: "11_Alice",
    id: "Xb7hH8MSUJpSbSDYk0k2",
    Gender: "Female",
    language: "en-gb",
    glang: "en",
    description: "English (UK) Female Alice",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Antoni_11 = {
    name: "11_Antoni",
    id: "ErXwobaYiN019PkySvjV",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Antoni ",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Aria_11 = {
    name: "11_Aria",
    id: "9BWtsMINqrJLrRacOk9x",
    Gender: "Female",
    language: "en-us",
    glang: "en",
    description: "English (US) Female Aria",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Arnold_11 = {
    name: "11_Arnold",
    id: "VR6AewLTigWG4xSOukaG",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Arnold",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Bill_11 = {
    name: "11_Bill",
    id: "pqHfZKP75CvOlQylNhV4",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Bill",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Brian_11 = {
    name: "11_Brian",
    id: "nPczCjzI2devNBz1zQrb",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Brian ",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Callum_11 = {
    name: "11_Callum",
    id: "N2lVS1w4EtoT3dr4eOWO",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Callum",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Charlie_11 = {
    name: "11_Charlie",
    id: "IKne3meq5aSn9XLyUdCD",
    Gender: "Male",
    language: "en-au",
    glang: "en",
    description: "English (Australian) Male Charlie",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Charlotte_11 = {
    name: "11_Charlotte",
    id: "XB0fDUnXU5powFXDhCwa",
    Gender: "Female",
    language: "en-sv",
    glang: "en",
    description: "English (Swedish) Female Charlotte",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Chris_11 = {
    name: "11_Chris",
    id: "iP95p4xoKVk53GoZ742B",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Chris",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Clyde_11 = {
    name: "11_Clyde",
    id: "2EiwWnXFnvU5JabPnv8n",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Clyde",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Daniel_11 = {
    name: "11_Daniel",
    id: "onwK4e9ZLuTAKqWW03F9",
    Gender: "Male",
    language: "en-gb",
    glang: "en",
    description: "English (UK) Male Daniel",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
// let Dan_11 = {
//     name: "11_Dan",
//     id: "HyzzQNvsSW4IUjks7NWX",
//     Gender: "Male",
//     language: "en-nz",
//     glang: "en",
//     description: "English (New Zealand) Male Dan",
//     vendor: "ElevenLabs",
//     SupportedEngines: ["standard"],
//     premiumOnly: true
// };
let Dave_11 = {
    name: "11_Dave",
    id: "CYw3kZ02Hs0563khs1Fj",
    Gender: "Male",
    language: "en-gb",
    glang: "en",
    description: "English (UK) Male Dave",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Domi_11 = {
    name: "11_Domi",
    id: "AZnzlk1XvdvUeBnXmlld",
    Gender: "Female",
    language: "en-us",
    glang: "en",
    description: "English (US) Female Domi",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
// let Deobra_11 = {
//     name: "11_Deobra",
//     id: "vnd0afTMgWq4fDRVyDo3",
//     Gender: "Female",
//     language: "en-nz",
//     glang: "en",
//     description: "English (New Zealand) Female Deobra",
//     vendor: "ElevenLabs",
//     SupportedEngines: ["standard"],
//     premiumOnly: true
// };
let Dorothy_11 = {
    name: "11_Dorothy",
    id: "ThT5KcBeYPX3keUQqHPh",
    Gender: "Female",
    language: "en-gb",
    glang: "en",
    description: "English (UK) Female Dorothy",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Drew_11 = {
    name: "11_Drew",
    id: "29vD33N1CtxCmqQRPOHJ",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Drew",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Elli_11 = {
    name: "11_Elli",
    id: "MF3mGyEYCl7XYWbV9V6O",
    Gender: "Female",
    language: "en-us",
    glang: "en",
    description: "English (US) Female Elli",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Emily_11 = {
    name: "11_Emily",
    id: "LcfcDJNUP1GQjkzn1xUU",
    Gender: "Female",
    language: "en-us",
    glang: "en",
    description: "English (US) Female Emily",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Eric_11 = {
    name: "11_Eric",
    id: "cjVigY5qzO86Huf0OWal",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Eric",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Fin_11 = {
    name: "11_Fin",
    id: "D38z5RcWu1voky8WS1ja",
    Gender: "Male",
    language: "en-ie",
    glang: "en",
    description: "English (Irish) Male Fin",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Freya_11 = {
    name: "11_Freya",
    id: "jsCqWAovK2LkecY7zXl4",
    Gender: "Female",
    language: "en-us",
    glang: "en",
    description: "English (US) Female Freya",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let George_11 = {
    name: "11_George",
    id: "JBFqnCBsd6RMkjVDRZzb",
    Gender: "Male",
    language: "en-gb",
    glang: "en",
    description: "English (UK) Male George",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Gigi_11 = {
    name: "11_Gigi",
    id: "jBpfuIE2acCO8z3wKNLl",
    Gender: "Female",
    language: "en-us",
    glang: "en",
    description: "English (US) Young Female Gigi",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Giovanni_11 = {
    name: "11_Giovanni",
    id: "zcAOhNBS3c14rBihAFp1",
    Gender: "Male",
    language: "en-it",
    glang: "en",
    description: "English (Italian) Male Giovanni",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Glinda_11 = {
    name: "11_Glinda",
    id: "z9fAnlkpzviPz146aGWa",
    Gender: "Female",
    language: "en-us",
    glang: "en",
    description: "English (US) Female Glinda",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Grace_11 = {
    name: "11_Grace",
    id: "oWAxZDx7w5VEj9dCyTzz",
    Gender: "Female",
    language: "en-us",
    glang: "en",
    description: "English (US) Southern Female Grace",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Hannah_11 = {
    name: "11_Hannah",
    id: "M7ya1YbaeFaPXljg9BpK",
    Gender: "Female",
    language: "en-au",
    glang: "en",
    description: "English (Australian) Female Hannah",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};

let Harry_11 = {
    name: "11_Harry",
    id: "SOYHLrjzK2X1ezoPC6cr",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Harry",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let James_11 = {
    name: "11_James",
    id: "ZQe5CZNOzWyzPSCn5a3c",
    Gender: "Male",
    language: "en-au",
    glang: "en",
    description: "English (Australian) Male James",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Jeremy_11 = {
    name: "11_Jeremy",
    id: "bVMeCyTHy58xNoL34h3p",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Jeremy",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Jessica_11 = {
    name: "11_Jessica",
    id: "cgSgspJ2msm6clMCkdW9",
    Gender: "Female",
    language: "en-us",
    glang: "en",
    description: "English (US) Female Jessica",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Jessie_11 = {
    name: "11_Jessie",
    id: "t0jbNlBVZ17f02VDIeMI",
    Gender: "Female",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Jessie",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Joseph_11 = {
    name: "11_Joseph",
    id: "Zlb1dXrM653N07WRdFW3",
    Gender: "Male",
    language: "en-gb",
    glang: "en",
    description: "English (UK) Male Joseph",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};

let Kylee_11 = {
    name: "11_Kylee",
    id: "pcKdPWtbF6bM9o7NHjCI",
    Gender: "Female",
    language: "en-nz",
    glang: "en",
    description: "English (New Zealand) Female Kylee",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};

let Kiwi_11 = {
    name: "11_Kiwi",
    id: "VEWZvLXUrFL3O7dUnBSW",
    Gender: "Female",
    language: "en-nz",
    glang: "en",
    description: "English (New Zealand) Male Kiwi",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};

let Josh_11 = {
    name: "11_Josh",
    id: "TxGEqnHWrfWFTfGW9XjX",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Josh",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Laura_11 = {
    name: "11_Laura",
    id: "FGY2WhTYpPnrIDTdsKH5",
    Gender: "Female",
    language: "en-us",
    glang: "en",
    description: "English (US) Female Laura",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Liam_11 = {
    name: "11_Liam",
    id: "TX3LPaxmHKxFdv7VOQHJ",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Liam",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Lily_11 = {
    name: "11_Lily",
    id: "pFZP5JQG7iQjIQuC4Bku",
    Gender: "Female",
    language: "en-gb",
    glang: "en",
    description: "English (UK) Female Lily",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Matilda_11 = {
    name: "11_Matilda",
    id: "XrExE9yKIg1WjnnlVkGX",
    Gender: "Female",
    language: "en-us",
    glang: "en",
    description: "English (US) Female Matilda",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Michael_11 = {
    name: "11_Michael",
    id: "flq6f7yk4E4fJM5XTYuZ",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Michael",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Mimi_11 = {
    name: "11_Mimi",
    id: "zrHiDhphv9ZnVXBqCLjz",
    Gender: "Female",
    language: "en-sv",
    glang: "en",
    description: "English (Swedish) Female Mimi",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Patrick_11 = {
    name: "11_Patrick",
    id: "ODq5zmih8GrVes37Dizd",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Patrick",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Paul_11 = {
    name: "11_Paul",
    id: "5Q0t7uMcjvnagumLfvZi",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Paul ",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Rachel_11 = {
    name: "11_Rachel",
    id: "21m00Tcm4TlvDq8ikWAM",
    Gender: "Female",
    language: "en-us",
    glang: "en",
    description: "English (US) Female Rachel",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let River_11 = {
    name: "11_River",
    id: "SAz9YHcvj6GT2YYXdXww",
    gender: "Non-binary",
    language: "en-us",
    glang: "en",
    description: "English (US) River",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Roger_11 = {
    name: "11_Roger",
    id: "CwhRBWXzGAHq8TQ4Fs17",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Roger",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Sam_11 = {
    name: "11_Sam",
    id: "yoZ06aMxZJJ28mfd3POQ",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Young Male Sam",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Sarah_11 = {
    name: "11_Sarah",
    id: "EXAVITQu4vr4xnSDxMaL",
    Gender: "Female",
    language: "en-us",
    glang: "en",
    description: "English (US) Female Sarah",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Serena_11 = {
    name: "11_Serena",
    id: "pMsXgVXv3BLzUgSXRplE",
    Gender: "Female",
    language: "en-us",
    glang: "en",
    description: "English (US) Female Serena",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Thomas_11 = {
    name: "11_Thomas",
    id: "GBv7mTt0atIp3Br8iCZE",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Thomas",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};
let Will_11 = {
    name: "11_Will",
    id: "bIHbv24MWmeRgasZH58o",
    Gender: "Male",
    language: "en-us",
    glang: "en",
    description: "English (US) Male Will",
    vendor: "ElevenLabs",
    SupportedEngines: ["standard"],
    premiumOnly: true
};

let Bente = {
    name: "Bente",
    Gender: "Female",
    language: "nb-NO",
    description: "Norwegian Bokmål Female Bente",
    glang: "nb",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Biera_ls = {
    name: "Biera_ls",
    Gender: "Female",
    language: "se-X1",
    description: "Lule Sami male Biera",
    glang: "se",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Biera_ns = {
    name: "Biera_ns",
    Gender: "Female",
    language: "se-X0",
    description: "Northern Sami male Biera",
    glang: "se",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Elin = {
    name: "Elin",
    Gender: "Female",
    language: "sv-SE",
    description: "Swedish Female Elin",
    glang: "sv",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Eliska = {
    name: "Eliska",
    Gender: "Female",
    language: "cs-CZ",
    description: "Czech Republic Female Eliska",
    glang: "cs",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Elle_ls = {
    name: "Elle_ls",
    Gender: "Female",
    language: "se-X1",
    description: "Lule Sami Female Elle",
    glang: "se",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Elle_ns = {
    name: "Elle_ns",
    Gender: "Female",
    language: "se-X0",
    description: "Northern Sami Female Elle",
    glang: "se",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Emil = {
    name: "Emil",
    Gender: "Male",
    language: "sv-SE",
    description: "Swedish (Sweden) Male Emil",
    glang: "sv",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Erik = {
    name: "Erik",
    Gender: "Male",
    language: "sv-SE",
    description: "Swedish Male Erik",
    glang: "sv",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Hanna = {
    name: "Hanna",
    Gender: "Female",
    language: "fo-FO",
    description: "Faroese Female Hanna",
    glang: "fo",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Hanus = {
    name: "Hanus",
    Gender: "Male",
    language: "fo-FO",
    description: "Faroese Male Hanus",
    glang: "fo",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Jeroen = {
    name: "Jeroen",
    Gender: "Male",
    language: "nl-BE",
    description: "Dutch (Belgium) Male Jeroen",
    glang: "nl",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Laia = {
    name: "Laia",
    Gender: "Female",
    language: "ca-ES",
    description: "Catalan (Spanish) Female Laia",
    glang: "ca",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Louise = {
    name: "Louise",
    Gender: "Female",
    language: "fr-CA",
    description: "French (Canada) Female Louise",
    glang: "fr",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Lulu = {
    name: "Lulu",
    Gender: "Female",
    language: "zh-cn",
    description: "Chinese (Mandarin) Female Lulu",
    glang: "zh",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Mehdi = {
    name: "Mehdi",
    Gender: "Male",
    language: "ar-EG",
    description: "Arabic (Egyptian) Male Mehdi",
    glang: "ar",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Mia_acapela = {
    name: "Mia",
    Gender: "Female",
    language: "sv-SE",
    description: "Swedish Female Mia",
    glang: "sv",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Olav = {
    name: "Olav",
    Gender: "Male",
    language: "nb-NO",
    description: "Norwegian Bokmål Male Olav",
    glang: "nb",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Samuel = {
    name: "Samuel",
    Gender: "Male",
    language: "fi-SE",
    description: "Sweden (Finnish) Male Samuel",
    glang: "fi",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Sanna = {
    name: "Sanna",
    Gender: "Female",
    language: "fi-FI",
    description: "Finnish Female Sanna",
    glang: "fi",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Sofie = {
    name: "Sofie",
    Gender: "Female",
    language: "nl-BE",
    description: "Dutch (Belgium) Female Sofie",
    glang: "nl",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Zoe = {
    name: "Zoe",
    Gender: "Female",
    language: "nl-BE",
    description: "Dutch (Belgium) Female Zoe",
    glang: "nl",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Clara = {
    name: "Clara",
    Gender: "Female",
    language: "no",
    description: "Norwegian Bokmål Female Clara",
    glang: "",
    vendor: "CereProc",
    SupportedEngines: ["standard"],
};

let Hulda = {
    name: "Hulda",
    Gender: "Female",
    language: "no",
    description: "Norwegian Nynorsk Female Hulda",
    glang: "",
    vendor: "CereProc",
    SupportedEngines: ["standard"],
};

let Bianca_a = {
    name: "Bianca",
    Gender: "Female",
    language: "it-it",
    description: "Italian Female Bianca",
    glang: "it",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};
let Giorgio_a = {
    name: "Giorgio",
    Gender: "Female",
    language: "it-it",
    description: "Italian Male Giorgio",
    glang: "it",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};

let Carla_a = {
    name: "Carla",
    Gender: "Female",
    language: "it-it",
    description: "Italian Female Carla",
    glang: "it",
    vendor: "Acapela",
    SupportedEngines: ["standard"],
};
//do not edit this if as it is generated by code
const voices = [
    Tagalog,
    Afrikaans,
    Tarik,
    Miren,
    Montserrat,
    Tian_Tian,
    Mei_Jia,
    Zuzana,
    Sara,
    Magnus,
    Ellen,
    Claire,
    Xander,
    Karen,
    Lee,
    Veena,
    Moira,
    Fiona,
    Tessa,
    Daniel,
    Serena,
    Allison,
    Ava,
    Tom,
    Samantha,
    Satu,
    Amelie,
    Audrey,
    Thomas,
    Carmela,
    Anna,
    Yannick,
    Petra,
    Melina,
    Nikos,
    Lekha,
    Mariska,
    Damayanti,
    Alice,
    Federica,
    Luca,
    Paola,
    Ichiro,
    Sakura,
    Sora,
    Nora,
    Henrik,
    Ewa,
    Zosia,
    Luciana,
    Felipe,
    Joana,
    Catarina,
    Ioana,
    Milena,
    Yuri,
    Laura,
    Carlos,
    Soledad,
    Paulina,
    Juan,
    Jorge,
    Monica,
    Alva,
    Oskar,
    Kanya,
    Cem,
    Yelda,
    Dariush,
    Carmit,
    Lesya,
    Jordi,
    Lana,
    Sinji_Ml,
    Daria,
];
const polly = [
    Geraint, Gwyneth, Karl, Dora, Zeina,
    //Ali, //currently not working
    Celine, Chantal, Conchita, Enrique, Hans, Lea, Liv, Lucia, Lotte,
    Mads, Marlene, Mathieu, Naja, Ruben, Vicki, Zhiyu
];

const cereproc = [Ceitidh, Peig, Heather, Stuart, Andrew, Clara, Hulda];
const trinity = [];
const acapela = [
    //a_Sakura,
    Bente,
    Bianca_a,
    Biera_ls,
    Biera_ns,
    Carla_a,
    //Celia,
    //Dimitris,
    Elin,
    Eliska,
    Elle_ls,
    Elle_ns,
    Emil,
    Erik,
    //Freja,
    Giorgio_a,
    Hanna,
    Hanus,
    //Ipek,
    Jeroen,
    Laia,
    Louise,
    Lulu,
    //Marcia,
    Mehdi,
    Mia_acapela,
    //Minji,
    Olav,
    //Rhona,
    Samuel,
    Sanna,
    Sofie,
    Zoe
];

// the 11_labs voice objects here have the _11 at the end rather than the ideal start
// because we can't have a variable starting with a number.
const elevenlabs = [
    Adam_11,
    Alice_11,
    Antoni_11,
    Aria_11,
    Arnold_11,
    Bill_11,
    Brian_11,
    Callum_11,
    Charlie_11,
    Charlotte_11,
    Chris_11,
    Clyde_11,
    // Dan_11,
    Daniel_11,
    Dave_11,
    // Deobra_11,
    Domi_11,
    Dorothy_11,
    Drew_11,
    Elli_11,
    Emily_11,
    Eric_11,
    // Ethan_11,
    Fin_11,
    Freya_11,
    George_11,
    Gigi_11,
    Giovanni_11,
    Glinda_11,
    Grace_11,
    Hannah_11,
    Harry_11,
    James_11,
    Jeremy_11,
    Jessica_11,
    Jessie_11,
    Joseph_11,
    Josh_11,
    Kylee_11,
    Kiwi_11,
    Laura_11,
    Liam_11,
    Lily_11,
    Matilda_11,
    Michael_11,
    Mimi_11,
    // Nicole_11,
    Patrick_11,
    Paul_11,
    Rachel_11,
    River_11,
    Roger_11,
    Sam_11,
    Sarah_11,
    Serena_11,
    Thomas_11,
    Will_11,
];
//do not edit this if as it is generated by code

class SpeechServerVoiceList {
  constructor(enablePolly, cerperocEnabled, trinityEnabled, elevenlabsEnabled, acapelaEnabled) {
    this.voiceByName = {};
    this.voicesByGenderLang = {
      Male: {},
      Female: {},
    };
    this.voicesByLang = {};
    this.createVoiceMap(
      enablePolly,
      cerperocEnabled,
      trinityEnabled,
      elevenlabsEnabled,
      acapelaEnabled,
    );
  }

  createVoiceMap(
    pollyEnabled,
    cerperocEnabled,
    trinityEnabled,
    elevenlabsEnabled,
    acapelaEnabled,
    debug,
  ) {
    let voiceList = [...voices];
    if (pollyEnabled) {
      voiceList.push(...polly);
    }

    if (cerperocEnabled) {
      voiceList.push(...cereproc);
    }

    if (trinityEnabled) {
      voiceList.push(...trinity);
    }

    if (elevenlabsEnabled) {
      voiceList.push(...elevenlabs);
    }

    if (acapelaEnabled) {
      voiceList.push(...acapela);
    }

    for (let i = 0; i < voiceList.length; i++) {
      this.voiceByName[voiceList[i].name] = voiceList[i];
      if (
        this.voicesByGenderLang[voiceList[i].Gender] == null ||
        typeof this.voicesByGenderLang[voiceList[i].Gender] == "undefined"
      ) {
        this.voicesByGenderLang[voiceList[i].Gender] = {};
      }

      if (
        this.voicesByGenderLang[voiceList[i].Gender][voiceList[i].language] ==
        null ||
        typeof this.voicesByGenderLang[voiceList[i].Gender][
        voiceList[i].language
        ] == "undefined"
      ) {
        this.voicesByGenderLang[voiceList[i].Gender][voiceList[i].language] =
          [];
      }

      this.voicesByGenderLang[voiceList[i].Gender][voiceList[i].language].push(
        voiceList[i],
      );
      // if (this.voicesByLang[voiceList[i].language]== null ||
      //     typeof this.voicesByLang[voiceList[i].language] == "undefined"){
      //         this.voicesByLang[voiceList[i].language]
      // }
    }
  }

  getVoiceByGenderAndLang(gender, lang) {
    let genderList = this.voicesByGenderLang[gender];
    // console.log(genderList)
    let langList = genderList[lang];
    return langList;
  }

  getVoiceByName(name) {
    return this.voiceByName[name];
  }

  getVoices(
    pollyEnabled = false,
    cerperocEnabled = false,
    trinityEnabled = false,
    elevenlabsEnabled = false,
    acapelaEnabled = false,
  ) {
    let voiceList = [...voices];
    if (pollyEnabled) {
      voiceList.push(...polly);
    }

    if (cerperocEnabled) {
      voiceList.push(...cereproc);
    }

    if (trinityEnabled) {
      voiceList.push(...trinity);
    }

    if (elevenlabsEnabled) {
      voiceList.push(...elevenlabs);
    }

    if (acapelaEnabled) {
      voiceList.push(...acapela);
    }

    return voiceList;
  }
}

// Utility functions
const base64ToArrayBuffer = base64 =>
    Uint8Array.from(atob(base64), c => c.charCodeAt(0)).buffer;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * ElevenLabsSpeechEngine class provides speech synthesis using ElevenLabs API.
 * It handles speech playback using WebSocket and MediaSource extensions.
 */
class ElevenLabsSpeechEngine extends ISpeechEngine {
    constructor() {
        super();

        // Initialize properties
        this._voices = [];
        this._speed = 50;
        this._tempSpeed = -1;
        this._voice = "";
        this._tempVoice = "";
        this._eventContext = this;
        this._apiKey = "";
        this._forceTimer = false;
        this._server = "";
        this._useEvents = true;
        this._setSpeaking = true;
        this._continousAllowed = true;
        this._webSocket = null;
        this._mediaSource = null;
        this._mediaSourceBuffer = null;
        this._websocketBuffer = [];
        this._audio = null;
        this._isEnded = false;
        this._speechStop = false;
        this._animationFrameID = null;
        this._wordStartPositions = [];
        this._wordStartTimes = [];
        this._charIndex = 0;
        this._timeOffset = 0;
        this._currentHighlightWord = 0;
        this._streamingEnded = false;

        // Bind event handlers
        this._onSourceOpenBound = this._onSourceOpen.bind(this);
        this._onAudioLoadedBound = this._onAudioLoaded.bind(this);
        this._onAudioEndedBound = this._onAudioEnded.bind(this);
        this._handleUpdateEndBound = this._handleUpdateEnd.bind(this);
        this._onAnimationFrameBound = this._onAnimationFrame.bind(this);

        // Initialize the Audio element once
        this._initializeAudio();
    }

    /**
     * Initializes the SpeechEngine with the provided settings.
     * @param {Object} options - Configuration options.
     * @param {string} [options.voice="11_Adam"] - Starting voice.
     * @param {number} [options.speed=50] - Playback speed (defaults to 50%).
     * @param {Object} [options.eventContext=this] - Context for event dispatching.
     * @param {string} [options.apiKey=""] - API key for ElevenLabs service (required).
     * @param {boolean} [options.forceTimer=false] - Force timer for events from a non-visible page.
     * @param {string} [options.server=""] - ElevenLabs server host (required).
     */
    initialise({
        voice = "11_Adam",
        speed = 50,
        eventContext = this,
        apiKey = "",
        forceTimer = false,
        server = ""
    }) {
        this._speed = speed;
        this._eventContext = eventContext;
        this._apiKey = apiKey;
        this._forceTimer = forceTimer;
        this._server = server;
        this.voice = voice;
        this._isEnded = false;
    }

    /**
     * Initializes the Audio element and sets up event listeners.
     * This is called once during construction.
     * @private
     */
    _initializeAudio() {
        // Initialize the Audio element only once
        this._audio = new Audio();

        this._audio.addEventListener('waiting', () => {
            const wordStartTimesLength = this._wordStartTimes.length > 0 ? this._wordStartTimes.length : 0;
            const currentHighlightWord = isNaN(this._currentHighlightWord) ? 0 : this._currentHighlightWord;
            const isLastWord = currentHighlightWord === wordStartTimesLength;
            setTimeout(() => {
                if (isLastWord &&
                    this._isEnded &&
                    !this._streamingEnded &&
                    !this._audio.ended) {
                    this._onAudioEnded();
                }
            }, 500);

        });

        this._audio.addEventListener('loadeddata', this._onAudioLoadedBound);
        this._audio.addEventListener('ended', this._onAudioEndedBound);
    }

    /**
    * Starts speech synthesis and playback.
    * @param {Object} options - Playback options.
    * @param {string[]} [options.words=[]] - Words to be spoken.
    * @param {boolean} [options.useEvents=true] - Whether to dispatch events.
    * @param {string} [options.voice=""] - Voice to use for synthesis.
    * @param {number} [options.speed=-1] - Playback speed.
    * @param {boolean} [options.setSpeaking=true] - Whether to set speaking flag.
    * @param {boolean} [options.continousAllowed=true] - Whether continuous playback is allowed.
    */
    play({
        words = [],
        useEvents = true,
        voice = "",
        speed = -1,
        setSpeaking = true,
        continousAllowed = true
    }) {
        if (words.length === 0) return;

        this._speechStop = false;
        this._streamingEnded = false;
        this._tempVoice = elevenlabs.find(vc => vc.name === (voice || this._voice));
        this._tempSpeed = speed > -1 ? speed : this._speed;
        this._useEvents = useEvents;
        this._setSpeaking = setSpeaking;
        this._continousAllowed = continousAllowed;
        this._words = words.map(word => word.trim());

        // Dispatch start event
        this._eventContext.dispatchEvent(Events.start(setSpeaking));

        // Clean up any previous synthesis
        this._cleanUp();

        // Initialize a new MediaSource for this synthesis
        this._initializeMediaSource();

        // Begin synthesis
        this._synthesize(this._words, this._tempVoice, this._tempSpeed);

        //Send Analytic events
        const analyticsDetails = {
            voice: voice,
            speed: this._tempSpeed,
            words: this._words.length
               };

        this._eventContext.dispatchEvent(Events.analytics({ eventCategory: 'on speech', eventName: 'TextToSpeechEngaged', category: 'Feature', feature: 'Speech', detail: analyticsDetails }));
    }


    /**
     * Pauses or resumes playback.
     */
    pause() {
        if (this._audio && !this._audio.paused) {
            this._audio.pause();
        } else if (this._audio  && this._audio.currentTime !== 0) { //if currentTime is 0 then we know we're just stopped not paused.
            this._audio.play();
        }
    }

    /**
     * Stops playback and cleans up resources.
     * Dispatches a stop event.
     */
    stop() {
        this._speechStop = true;

        if (this.isPlaying()) {
            this._audio.pause(); //no .stop() but causes an issue where pressing pause again will play audio so  (this._audio.currentTime !== 0) must be checked in Pause()
        }
        this._audio.currentTime = 0; 

        safeCancelAnimationFrame(this._animationFrameID);
        // Dispatch stop event
        this._eventContext.dispatchEvent(Events.stop());

        // Clean up resources
        this._cleanUp();
    }

    /**
     * Retrieves a list of voices, marking each as AI-generated.
     * @returns {Array<Object>} Array of voice objects with `ai` property set to `true`.
     */
    getVoices() {
        if (this._voices.length > 0) return this._voices;

        // Mark all voices as AI-generated
        this._voices = elevenlabs.map(voice => ({ ...voice, ai: true }));
        return this._voices;
    }

    /**
     * Gets the current voice identifier.
     * @returns {string} Current voice identifier.
     */
    get voice() {
        return this._voice?.name;
    }

    /**
     * Sets the voice identifier after validation and processing.
     * validates the voice name.
     * @param {string} voice - New voice identifier to set.
     */
    set voice(voice) {
        const voiceListVoice = elevenlabs.find(v => v.name === voice);
        if (voiceListVoice) {
            this._voice = voice;
        }
    }

    /**
     * Gets the current speed.
     * @returns {number} Current playback speed.
     */
    get speed() {
        return this._speed;
    }

    /**
     * Sets the playback speed.
     * @param {number} speed - New speed to set.
     */
    set speed(speed) {
        this._speed = speed;
    }

    /**
     * Checks if the audio is currently playing.
     * @returns {boolean} `true` if audio is playing, otherwise `false`.
     */
    isPlaying() {
        return (
            this._audio &&
            !this._audio.paused &&
            !this._audio.ended &&
            this._audio.currentTime > 0
        );
    }

    _onAnimationFrame(){

        // if (this._audio.ended) {
        //     safeCancelAnimationFrame(this._animationFrameID);
        //     return;
        // }

        if (this._wordStartTimes.length > 0){

            const currentTimeMs = this._audio.currentTime * 1000; // Current playback time in milliseconds

            // if the time is after the current word then fire
            // the word callback for the word.
            if (this._wordStartTimes[this._currentHighlightWord] < currentTimeMs) {
                this._eventContext.dispatchEvent(Events.word({ wordNo: this._currentHighlightWord }));
                this._currentHighlightWord++;
            }

            if (this._wordStartTimes.length > 0) {
                // if the time is after the current word then fire
                // the word callback for the word.
                if (this._wordStartTimes[this._currentHighlightWord] < currentTimeMs) {
                    this._eventContext.dispatchEvent(Events.word({ wordNo: this._currentHighlightWord }));
                    this.currentHighlightWord++;
                }
            }
        }


        this._animationFrameID = safeRequestAnimationFrame(this._onAnimationFrameBound, this._forceTimer);

    }

    /**
       * Updates the word start times based on the alignment data received.
       * Handles cumulative time offsets for multiple chunks.
       * @param {Object} alignment - Alignment data containing character start times.
       */
    onUpdateTimingPerTextElement(alignment) {

        if (!this._wordStartTimes || this._wordStartTimes.length === 0) {
            this._wordStartTimes = new Array(this._wordStartPositions.length).fill(null);
        }

        const charTimingChunk = alignment.charStartTimesMs; // Array of character timings
        const wordPositionsSet = new Set(this._wordStartPositions);
        const positionsDict = {};
        this._wordStartPositions.forEach((pos, idx) => {
            positionsDict[pos] = idx;
        });

        // Adjust timings by adding the cumulative time offset
        const adjustedCharTimings = charTimingChunk.map(timing => timing + this._timeOffset);

        // Process the character timings
        for (const timing of adjustedCharTimings) {
            if (wordPositionsSet.has(this._charIndex)) {
                const idx = positionsDict[this._charIndex];
                if (this._wordStartTimes[idx] === null) {
                    this._wordStartTimes[idx] = timing;
                }
            }
            this._charIndex += 1;
        }

        // Update time offset by adding the last timing in the original chunk
        if (charTimingChunk.length > 0) {
            const chunkDuration = charTimingChunk[charTimingChunk.length - 1];
            this._timeOffset += chunkDuration;
            //add final interval to the word start times array to denote the end of the words. (this done on the server side for other voices with markings. think "<mark>this<mark>is<mark>a<mark>test<mark>")
            this._wordStartTimes[this._wordStartTimes.length] =  this._timeOffset - 1;
        }

    }

    /**
     * Handles the 'loadeddata' event for the audio element.
     * @private
     */
    _onAudioLoaded() {
        this._audio.play().catch(e =>
            console.error("Error attempting to play audio:", e)
        );

        this._animationFrameID = safeRequestAnimationFrame(this._onAnimationFrameBound, this._forceTimer);
    }

    /**
     * Computes the start character indices for each text element in the concatenated text.
     *
     * @param {string[]} textArray - The array of text elements.
     * @returns {Object} An object containing positions and the concatenated text.
     */
    _computeWordStartPositions(textArray) {
        const positions = [];
        let pos = 0;

        for (let i = 0; i < textArray.length; i++) {
            const element = textArray[i];
            positions.push(pos);
            pos += element.length;
            if (i < textArray.length - 1) {
                pos += 1; // Account for space
            }
        }
        return positions;
    }

    /**
     * Handles the 'ended' event for the audio element.
     * @private
     */
    _onAudioEnded() {
        this._streamingEnded = true;
        this._onStop();
        this._cleanUp();
    }

    /**
     * Initializes a new MediaSource and sets up event listeners.
     * @private
     */
    _initializeMediaSource() {
        // Create a new MediaSource for this playback
        this._mediaSource = new MediaSource();
        this._websocketBuffer = [];
        this._isEnded = false;

        // Set up the source URL for the audio element
        this._audio.src = URL.createObjectURL(this._mediaSource);

        // Add event listener for 'sourceopen'
        this._mediaSource.addEventListener('sourceopen', this._onSourceOpenBound);
    }

    /**
     * Handles the 'sourceopen' event for the media source.
     * Initializes the SourceBuffer.
     * @private
     */
    _onSourceOpen(event) {
        const mediaSource = event.target;
        if (!mediaSource.sourceBuffers.length) {
            try {
                this._mediaSourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
                this._mediaSourceBuffer.addEventListener(
                    "updateend",
                    this._handleUpdateEndBound
                );
            } catch (error) {
                console.error("Error adding source buffer:", error);
            }
        }
    }

    /**
     * Handles the 'updateend' event of the SourceBuffer.
     * Appends next audio chunk from the buffer if available.
     * @private
     */
    _handleUpdateEnd() {
        try {
            if (
                this._mediaSource &&
                this._mediaSource.readyState === 'open' &&
                this._mediaSourceBuffer &&
                !this._mediaSourceBuffer.updating &&
                this._websocketBuffer.length > 0
            ) {
                const nextChunk = this._websocketBuffer.shift();
                this._mediaSourceBuffer.appendBuffer(nextChunk);
            }
            if (this._shouldEndStream()) {
                this._mediaSource.endOfStream();
            }
        } catch (error) {
            console.error("Error handling updateend event:", error);
        }
    }

    /**
     * Determines whether the media source should end the stream.
     * @returns {boolean} `true` if stream should end, otherwise `false`.
     * @private
     */
    _shouldEndStream() {
        return (
            !this._mediaSourceBuffer.updating &&
            this._mediaSource.readyState === 'open' &&
            this._isEnded &&
            this._websocketBuffer.length === 0
        );
    }

    /**
     * Processes audio buffers received from the WebSocket.
     * @param {ArrayBuffer} buffer - Audio data buffer.
     * @private
     */
    _onAudioBuffersFromSocket(buffer) {
        if (
            this._mediaSourceBuffer &&
            !this._mediaSourceBuffer.updating &&
            this._websocketBuffer.length === 0
        ) {
            this._mediaSourceBuffer.appendBuffer(buffer);
        } else {
            this._websocketBuffer.push(buffer);
        }
        // Check if the audio has ended and manually call _onAudioEnded if necessary
        if (this._isEnded && !this._audio.ended) {
            this._onAudioEnded();
        }
    }

    /**
      * Initiates speech synthesis via WebSocket.
      * @param {string[]} words - Words to be synthesized.
      * @param {string} voice - Voice to use for synthesis.
      * @param {number} speed - Playback speed.
      * @private
      */
    _synthesize(words, voice, speed) {

        // Determine word positions
        this._wordStartPositions = this._computeWordStartPositions(words);
        this._wordStartTimes = [];
        this._charIndex = 0;
        this._timeOffset = 0; // Reset time offset for new synthesis
        this._currentHighlightWord = 0;

        // Set playback rate
        this._audio.playbackRate = clamp(speed / 50.0, 0.0625, 16.0);

        const voiceId = voice?.id || "pNInz6obpgDQGcFmaJgB"; // Default voice ID

        // Open WebSocket connection
        this._webSocket = new WebSocket(
            `wss://${this._server}/api/${voiceId}?api_key=${this._apiKey}`
        );
        
        this._webSocket.binaryType = 'arraybuffer';

        // WebSocket event handlers
        this._webSocket.onmessage = e => {
            if (this._speechStop) {
                this._webSocket.close();
                return;
            }

            const json = JSON.parse(e.data);
            if (json.isFinal) {
                this._isEnded = true;
                this._webSocket.close();
                if (words.length === 1 && words[0] === "") {
                    this._onAudioEnded();
                }
                return;
            }
            if (json.audio) {
                this._onAudioBuffersFromSocket(base64ToArrayBuffer(json.audio));
            }
            // Handle alignment data if needed
            if (json.alignment) {
                this.onUpdateTimingPerTextElement(json.alignment);
            }
        };

        this._webSocket.onerror = e => {
            console.error('WebSocket error:', e);
        };

        this._webSocket.onopen = () => {
            // Send synthesis request
            this._webSocket.send(
                JSON.stringify({
                    text: words.join(" "),
                    voice_settings: { stability: 0.5, similarity_boost: 0.75 }
                })
            );
            // Notify end of input
            this._webSocket.send(JSON.stringify({ text: "" }));
        };
    }

    /**
     * Handles the stop event.
     * Dispatches a stop event with appropriate settings.
     * @private
     */
    _onStop() {
        safeCancelAnimationFrame(this._animationFrameID);
        this._eventContext.dispatchEvent(
            Events.stop(this._setSpeaking, this._continousAllowed)
        );
    }

    /**
     * Cleans up resources but keeps the Audio element.
     * Closes WebSocket and cleans up MediaSource and buffers.
     * @private
     */
    _cleanUp() {
        // Close WebSocket
        if (this._webSocket) {
            this._webSocket.close();
            this._webSocket = null;
        }

        // Clean up media source buffer
        if (this._mediaSourceBuffer) {
            try {
                if (this._mediaSource && this._mediaSource.readyState === 'open') {
                    this._mediaSourceBuffer.abort();
                }
                this._mediaSourceBuffer.removeEventListener(
                    "updateend",
                    this._handleUpdateEndBound
                );
                this._mediaSourceBuffer = null;
            } catch (e) {
                console.error('Error aborting source buffer:', e);
            }
        }

        // Remove media source listeners
        if (this._mediaSource) {
            this._mediaSource.removeEventListener(
                'sourceopen',
                this._onSourceOpenBound
            );
            if (this._mediaSource.readyState === 'open') {
                try {
                    this._mediaSource.endOfStream();
                } catch (e) {
                    console.error('Error ending media source:', e);
                }
            }
            this._mediaSource = null;
        }

        // Clear buffers
        this._websocketBuffer = [];

        //set the audio time to 0
        this._audio.currentTime = 0;
    }
}

const initialiseSpeech = async (
    speechIframeManager,
    speechManager,
    speechServerEngine,
    html5Engine,
    elevenLabsSpeechEngine,
    data
) => {
    // initialise the speechserver engine
    speechServerEngine.initialise({
        userName: data.userName,
        speechServer: data.speechServer,
        voice: data.voice,
        speed: data.speed,
        useCaching: data.useCaching,
        eventContext: speechManager,
        forceTimer: true,
    });

    speechManager.initialise({
        speechEngines: [elevenLabsSpeechEngine, speechServerEngine, html5Engine],
    });

    // Get the speechserver voice list and set in the in the speech engine.
    // For the speech server we build our own voice list and set it in the engine.
    // This is so we don't have to host it on a server.
    let speechServerVoiceList = new SpeechServerVoiceList(
        true,
        true,
        true,
        false,
        true,
    );
    speechServerEngine.setSpeechServerVoices(
        speechServerVoiceList.getVoices(true, true, true, false, true)
    );

    // initialise the HTML5 engine
    await html5Engine.initialise({ eventContext: speechManager });

    elevenLabsSpeechEngine.initialise({
        eventContext: speechManager,
        apiKey: "D1dHmXy4WxpngFmg4vam",
        forceTimer: true,
        server: "tts-elevenlabs-streaming-1-us-east-1.texthelp.com",
    });

    speechManager.speed = data.speed;
    speechManager.voice = data.voice;

    return true
};

const voiceExists = (speechManager, voice) => {
    return speechManager.voiceExists(decodeURIComponent(voice))
};

const setSpeed = (speechManager, speed) => {
    speechManager.speed = speed;
};

const setVoice = (speechManager, voice) => {
    speechManager.voice = voice;
};


const getVoiceList = (speechServerEngine, speechManager) => {
    // Get the speechserver voice list and set in the in the speech engine.
    // For the speech server we build our own voice list and set it in the engine.
    // This is so we don't have to host it on a server.
    let speechServerVoiceList = new SpeechServerVoiceList(
        true,
        true,
        true,
        false,
        true
    );
    speechServerEngine.setSpeechServerVoices(
        speechServerVoiceList.getVoices(true, true, true, false, true)
    );
    const voiceList = speechManager.getVoices();
    return voiceList;
};

// Case of multiple response through sendMessage
const play = (speechManager, message) => {
    speechManager.play(message.data);
};

// Case of getting back a response
const pause = (speechManager) => {
    speechManager.pause();
};

// Case of no expected Response
const stop = (speechManager) => {
    speechManager.stop();
};

//@ts-nocheck

class SpeechIframeManager extends IFrameCommandHandler {
    constructor() {
        super();
        // Declare class property
        this.speechManager = null;
        this.speechServerEngine = null;
        this.html5Engine = null;
        this.elevenLabsSpeechEngine = null;
        this.currentPlayMessage = null;

        this.isSpeechInitialised = false;

    }

    init(speechManager, elevenLabsSpeechEngine, speechServerEngine, html5Engine) {
        //initialising iframeCommandHandler
        super.init();
        //Setting up the manager and engines
        this.speechManager = speechManager;
        this.elevenLabsSpeechEngine = elevenLabsSpeechEngine;
        this.speechServerEngine = speechServerEngine;
        this.html5Engine = html5Engine;

        // add event handlers
        speechManager.addEventListener(EVENT.WORD, (event) => {
            this.handleSpeechEvent(
                EVENT.WORD,
                { detail: event.detail },
                event.detail.wordNo < 0 ? false : true
            );
        });

        speechManager.addEventListener(EVENT.START, (event) => {
            this.handleSpeechEvent(
                EVENT.START,
                { detail: event.detail },
                true
            );
        });

        speechManager.addEventListener(EVENT.STOP, (event) => {
            this.handleSpeechEvent(
                EVENT.STOP,
                { detail: event.detail },
                false
            );
            this.currentPlayMessage = null;
        });

        speechManager.addEventListener(EVENT.ANALYTICS, (event) => {
            this.handleSpeechEvent(
                EVENT.ANALYTICS,
                { detail: event.detail },
                true
            );
        });
    }

    // Override handleCommand to handle specific commands
    onCommand(message, sendResponse) {
        switch (message.command) {
            case "initialiseSpeech":
                this.initialise(message, sendResponse);
                break;
            case "getVoices":
                this.getVoices(message, sendResponse);
                break;
            case "setVoice":
                this.setVoice(message);
                break;
            case "setSpeed":
                this.setSpeed(message);
                break;
            case "voiceExists":
                this.voiceExists(message, sendResponse);
                break;
            case "play":
                this.playAudio(message);
                break;
            case "pause":
                this.pauseAudio(message);
                break;
            case "stop":
                this.stopAudio(message);
                break;
        }
    }

    async initialise(message, sendResponse) {
        if (!this.isSpeechInitialised) {
            const response = await initialiseSpeech(
                this,
                this.speechManager,
                this.speechServerEngine,
                this.html5Engine,
                this.elevenLabsSpeechEngine,
                message.data);
            sendResponse(
                response, false, message
            );
            this.isSpeechInitialised = true;
        }
        else {
            sendResponse(
                {
                    success: true,
                    message: "Speech already initialised"
                }, false, message
            );
        }
    }

    voiceExists(message, sendResponse) {
        sendResponse(voiceExists(this.speechManager, message.data), false, message);
    }

    setVoice(message) {
        setVoice(this.speechManager, message.data);
    }

    setSpeed(message) {
        setSpeed(this.speechManager, message.data);
    }

    getVoices(message, sendResponse) {
        sendResponse(getVoiceList(this.speechServerEngine, this.speechManager), false, message);
    }

    pauseAudio(message) {
        this.currentPlayMessage = message;
        pause(this.speechManager);
    }

    playAudio(message) {
        // Check if there is an active play message; if so, stop it
        // if (this.currentPlayMessage) {
        //     this.stopAudio(); // Stop the current audio and reset `currentPlayMessage`
        // }
        // Set the new message as the current play message
        this.currentPlayMessage = message;

        // Start playing audio with the new message
        play(this.speechManager, message);
    }

    handleSpeechEvent(command, data, continueSpeech) {
        // Ensure the command is updated in `currentPlayMessage`
        if (this.currentPlayMessage) {
            this.currentPlayMessage.command = command;
        }

        // Send response with the current play message context
        this.sendResponse(data, continueSpeech, this.currentPlayMessage);
    }

    stopAudio(message = null) {
        //if the stop is manually trigged from CS then use the latest id
        if (message) {
            this.currentPlayMessage = message;
        }

        //Stop the speech
        stop(this.speechManager);
        // Reset `currentPlayMessage` as there's no active playback
        this.currentPlayMessage = null;
    }
}

console.log("This is speech iframe document");

// Instantiate the command manager for the iframe
const speechIframeManager = new SpeechIframeManager();
const html5Engine = new HTML5Engine();
const elevenLabsSpeechEngine = new ElevenLabsSpeechEngine();
const speechServerEngine = new SpeechServerEngine();
const speechManager = new SpeechManager();

// Initialize the manager to set up listeners
speechIframeManager.init(
    speechManager,
    elevenLabsSpeechEngine,
    speechServerEngine,
    html5Engine,
);
