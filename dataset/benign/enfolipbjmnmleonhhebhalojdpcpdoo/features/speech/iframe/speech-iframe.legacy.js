define([], function () {
  "use strict";

  var _excluded = ["body"],
    _excluded2 = ["body", "useETag", "storage"];
  function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
  function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
  function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
  function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
  function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
  function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
  function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
  function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
  function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
  function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
  function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
  function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
  function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
  function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
  function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
  function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
  function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
  function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
  function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  var IFrameCommandHandler = /*#__PURE__*/function () {
    function IFrameCommandHandler() {
      _classCallCheck(this, IFrameCommandHandler);
      _defineProperty(this, "iframeSrc", void 0);
      _defineProperty(this, "messageData", void 0);
      _defineProperty(this, "isInitialized", false);
      this.iframeSrc = window.location.href;
      this.messageData = {};
    }
    return _createClass(IFrameCommandHandler, [{
      key: "init",
      value: function init() {
        var _this = this;
        if (this.isInitialized) {
          return;
        }
        window.addEventListener("message", function (event) {
          if (!_this.isMessageForIframe(event.data, _this.iframeSrc)) return;
          if (event.data.continuousCommunication) {
            _this.messageData = event.data;
          }
          _this.handleCommand(event.data);
        });
        this.isInitialized = true;
        var data = {
          iframeSrc: this.iframeSrc
        };
        this.onInitialized(data);
      }
    }, {
      key: "handleCommand",
      value: function handleCommand(messageData) {
        var data = messageData.data;
        this.onCommand(messageData, this.sendResponse.bind(this));
      }
    }, {
      key: "onCommand",
      value: function onCommand(data, sendResponse) {
        throw new Error("Method not implemented.");
      }
    }, {
      key: "sendResponse",
      value: function sendResponse(responseData) {
        var continuousMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var originalMessage = arguments.length > 2 ? arguments[2] : undefined;
        var messageData = this.messageData;
        if (originalMessage) {
          messageData = originalMessage;
        }
        var response = this.createIframeResponse(messageData, responseData, continuousMessage);
        window.parent.postMessage(response, this.iframeSrc);
      }
    }, {
      key: "isMessageForIframe",
      value: function isMessageForIframe(eventData, iframeSrc) {
        return eventData.iframeSrc === iframeSrc;
      }
    }, {
      key: "createIframeResponse",
      value: function createIframeResponse(messageData, responseData) {
        var continuousMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        return _objectSpread(_objectSpread({}, messageData), {}, {
          command: messageData.command,
          direction: "FEATURE_TO_CONTENTSCRIPT",
          data: responseData || null,
          continuousMessage: continuousMessage ? true : false
        });
      }
    }, {
      key: "onInitialized",
      value: function onInitialized(data) {
        var msg = _objectSpread(_objectSpread({
          command: "initialized",
          direction: "FEATURE_TO_OFFSCREENDOCUMENT"
        }, data), {}, {
          continuousMessage: false
        });
        window.parent.postMessage(msg, this.iframeSrc);
      }
    }]);
  }();
  /**
   * @interface Required interface for a SpeechEngine
   */
  var ISpeechEngine = /*#__PURE__*/function (_EventTarget) {
    function ISpeechEngine() {
      _classCallCheck(this, ISpeechEngine);
      return _callSuper(this, ISpeechEngine, arguments);
    }
    _inherits(ISpeechEngine, _EventTarget);
    return _createClass(ISpeechEngine, [{
      key: "initialise",
      value:
      /**
       * @function initialise
       * @description Initialises the SpeechEngine
       * @param {object} settings for the SpeechEngine
       */
      function initialise(settings) {
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
    }, {
      key: "play",
      value: function play(_ref) {
        var _ref$words = _ref.words,
          words = _ref$words === void 0 ? [] : _ref$words,
          _ref$useEvents = _ref.useEvents,
          useEvents = _ref$useEvents === void 0 ? true : _ref$useEvents,
          _ref$voice = _ref.voice,
          voice = _ref$voice === void 0 ? "" : _ref$voice,
          _ref$speed = _ref.speed,
          speed = _ref$speed === void 0 ? -1 : _ref$speed,
          _ref$setSpeaking = _ref.setSpeaking,
          setSpeaking = _ref$setSpeaking === void 0 ? true : _ref$setSpeaking,
          _ref$continousAllowed = _ref.continousAllowed,
          continousAllowed = _ref$continousAllowed === void 0 ? true : _ref$continousAllowed;
        throw "The play function must be implemented to support the ISpeechEngine interface.";
      }

      /**
       * @function stop
       * @description Implements the SpeechEngines stop function
       */
    }, {
      key: "stop",
      value: function stop() {
        throw "The stop function must be implemented to support the ISpeechEngine interface.";
      }

      /**
       * @function pause
       * @description Implements the SpeechEngines pause function
       */
    }, {
      key: "pause",
      value: function pause() {
        throw "The pause function must be implemented to support the ISpeechEngine interface.";
      }

      /**
       * @function pause
       * @description Implements the SpeechEngines pause function
       * @returns {Array.<string>} returns a string array of voices.
       */
    }, {
      key: "getVoices",
      value: function getVoices() {
        throw "The getVoices function must be implemented to support the ISpeechEngine interface.";
      }

      /**
       * Gets the voice property
       * @type {string}
       */
    }, {
      key: "voice",
      get: function get() {
        throw "The voice getter must be implemented to support the ISpeechEngine interface.";
      }

      /**
       * Sets the voice property
       * @type {string}
       */,
      set: function set(voice) {
        throw "The voice setter must be implemented to support the ISpeechEngine interface.";
      }

      /**
       * Gets the speed property
       * @type {number}
       */
    }, {
      key: "speed",
      get: function get() {
        throw "The speed getter must be implemented to support the ISpeechEngine interface.";
      }

      /**
       * Sets the speed property
       * @type {number}
       */,
      set: function set(speed) {
        throw "The speed setter must be implemented to support the ISpeechEngine interface.";
      }
    }]);
  }(/*#__PURE__*/_wrapNativeSuper(EventTarget));
  var EVENT = {
    START: 'start',
    STOP: 'stop',
    WORD: 'word',
    ANALYTICS: 'analytics'
  };
  var Events = {
    // fires as soon as play or speech start request is made.  Maybe delay before teh actual audio plays. 
    start: function start(setSpeaking) {
      return new CustomEvent(EVENT.START, {
        detail: {
          setSpeaking: setSpeaking
        }
      });
    },
    stop: function stop(setSpeaking, continousAllowed) {
      return new CustomEvent(EVENT.STOP, {
        detail: {
          setSpeaking: setSpeaking,
          continousAllowed: continousAllowed
        }
      });
    },
    word: function word(detail) {
      return new CustomEvent(EVENT.WORD, {
        detail: detail
      });
    },
    // fires after amy required web requests and actual audio plays.
    analytics: function analytics(detail) {
      return new CustomEvent(EVENT.ANALYTICS, {
        detail: detail
      });
    }
  };

  /**
   * @class SpeechManager
   * @classdesc Manages the speech using multiple speech engines. 
   * @implements ISpeechEngine
   */
  var SpeechManager = /*#__PURE__*/function (_ISpeechEngine) {
    function SpeechManager() {
      _classCallCheck(this, SpeechManager);
      return _callSuper(this, SpeechManager, arguments);
    }
    _inherits(SpeechManager, _ISpeechEngine);
    return _createClass(SpeechManager, [{
      key: "initialise",
      value: (
      /**
       * @function initialise
       * @description Initialises the SpeechEngine
       * @param {object} settings for the SpeechManager
       */
      function () {
        var _initialise = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref2) {
          var _ref2$speechEngines, speechEngines, i;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _ref2$speechEngines = _ref2.speechEngines, speechEngines = _ref2$speechEngines === void 0 ? [] : _ref2$speechEngines;
                this._speechEngines = {};
                this._currentEngine = null;

                //build the speech engine map eg {"engine1": {}}
                for (i = 0; i < speechEngines.length; i++) {
                  this._speechEngines["engine" + i] = speechEngines[i];
                }
                this._setSpeechEngine({
                  "speechEngine": this._speechEngines["engine0"]
                });
                this._currentVoice = "";
              case 1:
                return _context.a(2);
            }
          }, _callee, this);
        }));
        function initialise(_x) {
          return _initialise.apply(this, arguments);
        }
        return initialise;
      }()
      /**
       * @function play
       * @description Implements the SpeechEngines play or speak function
       * @param {object} speechsettings object containing settings for speech.
       * @param {Array.<string>} speechsettings.words Array of strings to speak
       * @param {boolean} [speechsettings.useEvents] set to true if you want speech event details 
       */
      )
    }, {
      key: "play",
      value: function play(_ref3) {
        var _ref3$words = _ref3.words,
          words = _ref3$words === void 0 ? [] : _ref3$words,
          _ref3$useEvents = _ref3.useEvents,
          useEvents = _ref3$useEvents === void 0 ? true : _ref3$useEvents,
          _ref3$voice = _ref3.voice,
          voice = _ref3$voice === void 0 ? "" : _ref3$voice,
          _ref3$speed = _ref3.speed,
          speed = _ref3$speed === void 0 ? -1 : _ref3$speed,
          _ref3$setSpeaking = _ref3.setSpeaking,
          setSpeaking = _ref3$setSpeaking === void 0 ? true : _ref3$setSpeaking,
          _ref3$continousAllowe = _ref3.continousAllowed,
          continousAllowed = _ref3$continousAllowe === void 0 ? true : _ref3$continousAllowe;
        if (voice.length > 0) {
          var _voiceExists = this.voiceExists(voice);
          if (!_voiceExists) {
            voice = "Ava";
          }
          this.voice = voice;
        }
        if (speed > -1) {
          this.speed = speed;
        }
        this._currentEngine.play({
          words: words,
          useEvents: useEvents,
          voice: voice,
          setSpeaking: setSpeaking,
          continousAllowed: continousAllowed
        });
      }

      /**
       * @function stop
       * @description Implements the SpeechEngines stop function
       */
    }, {
      key: "stop",
      value: function stop() {
        this._currentEngine.stop();
      }

      /**
       * @function pause
       * @description Implements the SpeechEngines pause function
       */
    }, {
      key: "pause",
      value: function pause() {
        this._currentEngine.pause();
      }

      /**
       * @function pause
       * @description Implements the SpeechEngines pause function
       * @returns {Array.<string>} returns a string array of voices.
       */
    }, {
      key: "getVoices",
      value: function getVoices() {
        this._voices = new Array();
        this._voiceToEngineMap = new Array();
        for (var engine in this._speechEngines) {
          if (this._speechEngines.hasOwnProperty(engine)) {
            var currentEngineVoices = this._speechEngines[engine].getVoices();
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
        this._voices = this._voices.sort(function (a, b) {
          return a.language.localeCompare(b.language);
        });
        return this._voices;
      }

      /**
       * Gets the voice property
       * @type {string}
       */
    }, {
      key: "voice",
      get: function get() {
        return this._currentEngine.voice;
      }

      /**
       * Sets the voice property
       * @type {string}
       */,
      set: function set(voice) {
        if (voice === this._currentVoice) {
          return;
        }
        if (!this._voiceToEngineMap) {
          // will set up the map if it is not set up yet
          this.getVoices();
        }
        // get the current speech engine and set it. The set its voice. 
        // it may be a voice that no longer exists. 
        var engine = this._voiceToEngineMap[voice];
        if (!engine) {
          // if the voice does not exist, set the voice to Ava
          engine = this._voiceToEngineMap["Ava"];
          // throw `Could not find the voice ${voice}`;
        }

        // set the speech engine
        this._setSpeechEngine({
          "speechEngine": engine
        });

        // set the engines voice.
        engine.voice = voice;
        this._currentVoice = voice;
      }

      /**
       * Gets the speed property
       * @type {number}
       */
    }, {
      key: "speed",
      get: function get() {
        return this._currentEngine.speed;
      }

      /**
       * Sets the speed property
       * @type {number}
       */,
      set: function set(speed) {
        this._currentEngine.speed = speed;
      }
    }, {
      key: "voiceExists",
      value: function voiceExists(voice) {
        if (!voice || voice.trim() === '') {
          return false;
        }
        if (!this._voiceToEngineMap) {
          // will set up the map if it is not set up yet
          this.getVoices();
        }
        var engine = this._voiceToEngineMap[voice];
        if (engine) {
          return true;
        }
        return false;
      }
    }, {
      key: "_setSpeechEngine",
      value: function _setSpeechEngine(_ref4) {
        var _ref4$speechEngine = _ref4.speechEngine,
          speechEngine = _ref4$speechEngine === void 0 ? null : _ref4$speechEngine;
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
    }]);
  }(ISpeechEngine);
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
  var _ref5 = '',
    replace = _ref5.replace;
  var ca = /[&<>'"]/g;
  var esca = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  };
  var pe = function pe(m) {
    return esca[m];
  };

  /**
   * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
   * @param {string} es the input to safely escape
   * @returns {string} the escaped input, and it **throws** an error if
   *  the input type is unexpected, except for boolean and numbers,
   *  converted as string.
   */
  var escape = function escape(es) {
    return replace.call(es, ca, pe);
  };

  /*
   * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
   * Digest Algorithm, as defined in RFC 1321.
   * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
   * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
   * Distributed under the BSD License
   * See http://pajhome.org.uk/crypt/md5 for more info.
   */

  //*+ The following code is derived from MD5 hash functions (c) Paul Johnston, http://pajhome.org.uk/crypt/md5/. //+*
  var md5 = /*#__PURE__*/function () {
    function md5() {
      _classCallCheck(this, md5);
      /*
      * Configurable variables. You may need to tweak these to be compatible with
      * the server-side, but the defaults work in most cases.
      */
      this.hexcase = 0; // hex output format. 0 - lowercase; 1 - uppercase
      this.b64pad = ""; // base-64 pad character. "=" for strict RFC compliance   
      this.chrsz = 8; // bits per input character. 8 - ASCII; 16 - Unicode
    }

    /*
     * These are the functions you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    return _createClass(md5, [{
      key: "hex_md5",
      value: function hex_md5(s) {
        return this.binl2hex(this.core_md5(this.str2binl(s), s.length * this.chrsz));
      }
      /*
       * Calculate the MD5 of an array of little-endian words, and a bit length
       */
    }, {
      key: "core_md5",
      value: function core_md5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << len % 32;
        x[(len + 64 >>> 9 << 4) + 14] = len;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
          var olda = a;
          var oldb = b;
          var oldc = c;
          var oldd = d;
          a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
          d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
          c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
          b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
          a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
          d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
          c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
          b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
          a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
          d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
          c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
          b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
          a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
          d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
          c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
          b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
          a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
          d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
          c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
          b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
          a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
          d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
          c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
          b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
          a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
          d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
          c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
          b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
          a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
          d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
          c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
          b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
          a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
          d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
          c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
          b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
          a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
          d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
          c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
          b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
          a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
          d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
          c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
          b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
          a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
          d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
          c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
          b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
          a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
          d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
          c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
          b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
          a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
          d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
          c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
          b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
          a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
          d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
          c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
          b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
          a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
          d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
          c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
          b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
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
    }, {
      key: "md5_cmn",
      value: function md5_cmn(q, a, b, x, s, t) {
        return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
      }
    }, {
      key: "md5_ff",
      value: function md5_ff(a, b, c, d, x, s, t) {
        return this.md5_cmn(b & c | ~b & d, a, b, x, s, t);
      }
    }, {
      key: "md5_gg",
      value: function md5_gg(a, b, c, d, x, s, t) {
        return this.md5_cmn(b & d | c & ~d, a, b, x, s, t);
      }
    }, {
      key: "md5_hh",
      value: function md5_hh(a, b, c, d, x, s, t) {
        return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
      }
    }, {
      key: "md5_ii",
      value: function md5_ii(a, b, c, d, x, s, t) {
        return this.md5_cmn(c ^ (b | ~d), a, b, x, s, t);
      }

      /*
       * Add integers, wrapping at 2^32. This uses 16-bit operations internally
       * to work around bugs in some JS interpreters.
       */
    }, {
      key: "safe_add",
      value: function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return msw << 16 | lsw & 0xFFFF;
      }

      /*
       * Bitwise rotate a 32-bit number to the left.
       */
    }, {
      key: "bit_rol",
      value: function bit_rol(num, cnt) {
        return num << cnt | num >>> 32 - cnt;
      }

      /*
       * Convert a string to an array of little-endian words
       * If this.chrsz is ASCII, characters >255 have their hi-byte silently ignored.
       */
    }, {
      key: "str2binl",
      value: function str2binl(str) {
        var bin = Array();
        var mask = (1 << this.chrsz) - 1;
        for (var i = 0; i < str.length * this.chrsz; i += this.chrsz) {
          bin[i >> 5] |= (str.charCodeAt(i / this.chrsz) & mask) << i % 32;
        }
        return bin;
      }

      /*
       * Convert an array of little-endian words to a hex string.
       */
    }, {
      key: "binl2hex",
      value: function binl2hex(binarray) {
        var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
          str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
        }
        return str;
      }

      // todo to make the method visible externally after obfuscation
    }, {
      key: "$rw_hash",
      value: function $rw_hash(p_str) {
        return this.hex_md5(p_str);
      }
    }]);
  }();
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
  var safeRequestAnimationFrame = function safeRequestAnimationFrame(callback) {
    var useTimer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    // Create a unique object to hold the ID and identify the type of the ID
    var id = {
      type: '',
      value: null
    };

    // Function to request animation frame or set a timer based on visibility or force flag
    var step = function step() {
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
  var safeCancelAnimationFrame = function safeCancelAnimationFrame(id) {
    if (!id) {
      return;
    }
    if (id.type === 'raf' && typeof window.cancelAnimationFrame === 'function') {
      window.cancelAnimationFrame(id.value);
    } else if (id.type === 'timeout') {
      clearTimeout(id.value);
    }
  };
  var arrayBuffer2String = function arrayBuffer2String(arrayBufferIn) {
    var binary = '';
    var bytes = new Uint8Array(arrayBufferIn);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  var string2ArrayBuffer = function string2ArrayBuffer(stringIn) {
    var binary_string = atob(stringIn);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  };

  /** Class representing the content/browser functionality of fetch. */
  var Requests = /*#__PURE__*/function () {
    /**
     * The constructor sets the default fetch headers
     */
    function Requests() {
      _classCallCheck(this, Requests);
    } //    this.headers = { "content-type": "application/json" };

    /**
     * Calls fetch
     * @param  {string} endpoint - The endpoint to fetch data from
     * @param  {string} {body - The body type if available
     * @param  {JSON} ...customConfig}={} - Fetch options
     */
    return _createClass(Requests, null, [{
      key: "doFetch",
      value: (function () {
        var _doFetch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(endpoint) {
          var _this2 = this;
          var _ref6,
            body,
            customConfig,
            _args2 = arguments;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _ref6 = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {}, body = _ref6.body, customConfig = _objectWithoutProperties(_ref6, _excluded);
                return _context3.a(2, new Promise(/*#__PURE__*/function () {
                  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(resolve, reject) {
                    var dataURL, byteString, ab, ia, mimeString, i, config, response, controller, id, result, arrayBuffer, _t, _t2;
                    return _regenerator().w(function (_context2) {
                      while (1) switch (_context2.n) {
                        case 0:
                          _this2.method = "GET"; // default
                          _this2.timeout = 0; // default (no timeout)
                          // Check if a method has been passed
                          if (customConfig.method === undefined) {
                            _this2.method = body ? "POST" : "GET";
                          } else {
                            _this2.method = customConfig.method;
                          }
                          if (customConfig.blob) {
                            dataURL = body;
                            byteString = atob(dataURL.split(',')[1]);
                            ab = new ArrayBuffer(byteString.length);
                            ia = new Uint8Array(ab); // hard code for now
                            mimeString = customConfig.headers["content-type"];
                            for (i = 0; i < byteString.length; i++) {
                              ia[i] = byteString.charCodeAt(i);
                            }
                            body = new Blob([ia], {
                              type: mimeString
                            });
                          }

                          // Check if we have a timeout
                          if (customConfig.timeout) {
                            _this2.timeout = customConfig.timeout;
                          }
                          config = _objectSpread(_objectSpread({
                            method: _this2.method
                          }, customConfig), {}, {
                            headers: _objectSpread({}, customConfig.headers)
                          });
                          if (body) {
                            config.body = body; // JSON.stringify(body);
                          }
                          response = null;
                          if (!(_this2.timeout > 0)) {
                            _context2.n = 5;
                            break;
                          }
                          _context2.p = 1;
                          controller = new AbortController();
                          id = setTimeout(function () {
                            return controller.abort();
                          }, _this2.timeout);
                          _context2.n = 2;
                          return fetch(endpoint, _objectSpread(_objectSpread({}, config), {}, {
                            signal: controller.signal
                          }));
                        case 2:
                          response = _context2.v;
                          clearTimeout(id);
                          _context2.n = 4;
                          break;
                        case 3:
                          _context2.p = 3;
                          _t = _context2.v;
                          return _context2.a(2, Promise.reject(_t));
                        case 4:
                          _context2.n = 8;
                          break;
                        case 5:
                          _context2.p = 5;
                          _context2.n = 6;
                          return fetch(endpoint, config);
                        case 6:
                          response = _context2.v;
                          _context2.n = 8;
                          break;
                        case 7:
                          _context2.p = 7;
                          _t2 = _context2.v;
                          resolve({
                            error: _t2.toString()
                          });
                          return _context2.a(2);
                        case 8:
                          if (response.ok) {
                            _context2.n = 9;
                            break;
                          }
                          reject(result);
                          return _context2.a(2);
                        case 9:
                          result = {};
                          result.contentType = response.headers.get("content-type");
                          result.headers = Object.fromEntries(response.headers.entries());
                          if (result.contentType) {
                            _context2.n = 10;
                            break;
                          }
                          reject(result);
                          return _context2.a(2);
                        case 10:
                          if (!(result.contentType.indexOf("application/json") !== -1)) {
                            _context2.n = 12;
                            break;
                          }
                          _context2.n = 11;
                          return response.json();
                        case 11:
                          result.json = _context2.v;
                          _context2.n = 18;
                          break;
                        case 12:
                          if (!result.contentType.startsWith("text")) {
                            _context2.n = 14;
                            break;
                          }
                          _context2.n = 13;
                          return response.text();
                        case 13:
                          result.text = _context2.v;
                          _context2.n = 18;
                          break;
                        case 14:
                          if (!(result.contentType.indexOf("audio/mpeg") !== -1)) {
                            _context2.n = 16;
                            break;
                          }
                          _context2.n = 15;
                          return response.arrayBuffer();
                        case 15:
                          arrayBuffer = _context2.v;
                          result.arrayBuffer = arrayBuffer2String(arrayBuffer);
                          _context2.n = 18;
                          break;
                        case 16:
                          _context2.n = 17;
                          return response.blob();
                        case 17:
                          result.blob = _context2.v;
                        case 18:
                          resolve({
                            data: result
                          });
                        case 19:
                          return _context2.a(2);
                      }
                    }, _callee2, null, [[5, 7], [1, 3]]);
                  }));
                  return function (_x3, _x4) {
                    return _ref7.apply(this, arguments);
                  };
                }()));
            }
          }, _callee3);
        }));
        function doFetch(_x2) {
          return _doFetch.apply(this, arguments);
        }
        return doFetch;
      }()
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
      )
    }, {
      key: "doFetch2",
      value: (function () {
        var _doFetch2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(endpoint) {
          var _ref8,
            body,
            _ref8$useETag,
            useETag,
            _ref8$storage,
            storage,
            customConfig,
            _args4 = arguments;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                _ref8 = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {}, body = _ref8.body, _ref8$useETag = _ref8.useETag, useETag = _ref8$useETag === void 0 ? false : _ref8$useETag, _ref8$storage = _ref8.storage, storage = _ref8$storage === void 0 ? null : _ref8$storage, customConfig = _objectWithoutProperties(_ref8, _excluded2);
                return _context5.a(2, new Promise(/*#__PURE__*/function () {
                  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(resolve, reject) {
                    var method, dataURL, byteString, ab, ia, mimeString, i, config, etagKey, cacheKey, storageAvailable, etag, cachedData, timeout, response, controller, id, _result, errorResult, result, arrayBuffer, newEtag, _t3, _t4;
                    return _regenerator().w(function (_context4) {
                      while (1) switch (_context4.n) {
                        case 0:
                          _context4.p = 0;
                          // Determine the method
                          method = customConfig.method || (body ? "POST" : "GET"); // Handle blob data
                          if (customConfig.blob) {
                            dataURL = body;
                            byteString = atob(dataURL.split(',')[1]);
                            ab = new ArrayBuffer(byteString.length);
                            ia = new Uint8Array(ab); // Assume content-type is provided in headers
                            mimeString = customConfig.headers["content-type"];
                            for (i = 0; i < byteString.length; i++) {
                              ia[i] = byteString.charCodeAt(i);
                            }
                            body = new Blob([ia], {
                              type: mimeString
                            });
                          }

                          // Set up the fetch configuration
                          config = _objectSpread(_objectSpread({
                            method: method
                          }, customConfig), {}, {
                            headers: _objectSpread({}, customConfig.headers)
                          }); // Include body if present
                          if (body) {
                            config.body = body;
                          }

                          // ETag handling
                          etagKey = "etag_".concat(endpoint);
                          cacheKey = "cache_".concat(endpoint);
                          storageAvailable = false;
                          etag = null;
                          cachedData = null;
                          if (!(useETag && storage)) {
                            _context4.n = 3;
                            break;
                          }
                          storageAvailable = true;

                          // Retrieve stored ETag and cached data
                          _context4.n = 1;
                          return storage.getItem(etagKey);
                        case 1:
                          etag = _context4.v;
                          _context4.n = 2;
                          return storage.getItem(cacheKey);
                        case 2:
                          cachedData = _context4.v;
                          // Include ETag in request headers if available
                          if (etag) {
                            config.headers['If-None-Match'] = etag;
                          }
                        case 3:
                          // Set default cache option to 'no-cache' to ensure ETag validation
                          if (!config.cache) {
                            config.cache = 'no-cache';
                          }

                          // Handle timeout
                          timeout = customConfig.timeout || 0;
                          response = null;
                          _context4.p = 4;
                          if (!(timeout > 0)) {
                            _context4.n = 6;
                            break;
                          }
                          controller = new AbortController();
                          id = setTimeout(function () {
                            return controller.abort();
                          }, timeout);
                          config.signal = controller.signal;
                          _context4.n = 5;
                          return fetch(endpoint, config);
                        case 5:
                          response = _context4.v;
                          clearTimeout(id);
                          _context4.n = 8;
                          break;
                        case 6:
                          _context4.n = 7;
                          return fetch(endpoint, config);
                        case 7:
                          response = _context4.v;
                        case 8:
                          _context4.n = 10;
                          break;
                        case 9:
                          _context4.p = 9;
                          _t3 = _context4.v;
                          reject({
                            error: _t3.toString()
                          });
                          return _context4.a(2);
                        case 10:
                          if (!(response.status === 304 && useETag && storageAvailable && cachedData)) {
                            _context4.n = 11;
                            break;
                          }
                          _result = {
                            status: 304,
                            data: cachedData,
                            headers: Object.fromEntries(response.headers.entries())
                          };
                          resolve(_result);
                          return _context4.a(2);
                        case 11:
                          if (response.ok) {
                            _context4.n = 12;
                            break;
                          }
                          errorResult = {
                            status: response.status,
                            statusText: response.statusText,
                            headers: Object.fromEntries(response.headers.entries())
                          };
                          reject(errorResult);
                          return _context4.a(2);
                        case 12:
                          // Process the response data
                          result = {
                            status: response.status,
                            headers: Object.fromEntries(response.headers.entries())
                          };
                          result.contentType = response.headers.get("content-type");
                          if (!(result.contentType && result.contentType.includes("application/json"))) {
                            _context4.n = 14;
                            break;
                          }
                          _context4.n = 13;
                          return response.json();
                        case 13:
                          result.data = _context4.v;
                          _context4.n = 20;
                          break;
                        case 14:
                          if (!(result.contentType && result.contentType.startsWith("text"))) {
                            _context4.n = 16;
                            break;
                          }
                          _context4.n = 15;
                          return response.text();
                        case 15:
                          result.data = _context4.v;
                          _context4.n = 20;
                          break;
                        case 16:
                          if (!(result.contentType && result.contentType.includes("audio/mpeg"))) {
                            _context4.n = 18;
                            break;
                          }
                          _context4.n = 17;
                          return response.arrayBuffer();
                        case 17:
                          arrayBuffer = _context4.v;
                          result.data = arrayBuffer2String(arrayBuffer);
                          _context4.n = 20;
                          break;
                        case 18:
                          _context4.n = 19;
                          return response.blob();
                        case 19:
                          result.data = _context4.v;
                        case 20:
                          if (!(useETag && storageAvailable)) {
                            _context4.n = 22;
                            break;
                          }
                          newEtag = response.headers.get('ETag');
                          if (!newEtag) {
                            _context4.n = 22;
                            break;
                          }
                          _context4.n = 21;
                          return storage.setItem(etagKey, newEtag);
                        case 21:
                          _context4.n = 22;
                          return storage.setItem(cacheKey, result.data);
                        case 22:
                          resolve(result);
                          _context4.n = 24;
                          break;
                        case 23:
                          _context4.p = 23;
                          _t4 = _context4.v;
                          reject(_t4);
                        case 24:
                          return _context4.a(2);
                      }
                    }, _callee4, null, [[4, 9], [0, 23]]);
                  }));
                  return function (_x6, _x7) {
                    return _ref9.apply(this, arguments);
                  };
                }()));
            }
          }, _callee5);
        }));
        function doFetch2(_x5) {
          return _doFetch2.apply(this, arguments);
        }
        return doFetch2;
      }())
    }]);
  }();
  /* eslint-disable no-undef */
  /** Class representing the content/browser functionality of fetch. */
  var ISOFetch = /*#__PURE__*/function () {
    function ISOFetch() {
      _classCallCheck(this, ISOFetch);
    }
    return _createClass(ISOFetch, null, [{
      key: "fetch",
      value: (
      /**
       * A static function to call the background fetch
       * @param  {string} url - The endpoint to fetch data from
       * @param  {JSON} options -  The fetch options
       * @return {Promise} A promise containing the parsed response.
       * The returned object type depends on the content type of the response.
       * It can be text, json or a blob.
       */
      function () {
        var _fetch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(url, options) {
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.n) {
              case 0:
                return _context7.a(2, new Promise(/*#__PURE__*/function () {
                  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(resolve, reject) {
                    var handleResponse, params;
                    return _regenerator().w(function (_context6) {
                      while (1) switch (_context6.n) {
                        case 0:
                          handleResponse = function handleResponse(response) {
                            if (!response.data) {
                              reject(response);
                              return;
                            }
                            if (response.data.arrayBuffer) {
                              response.data.arrayBuffer = string2ArrayBuffer(response.data.arrayBuffer);
                            }
                            resolve(response);
                          }; // Test for now
                          params = {
                            command: "swfetch8598",
                            url: url,
                            options: options
                          };
                          if (!chrome.runtime) {
                            _context6.n = 1;
                            break;
                          }
                          chrome.runtime.sendMessage(params, handleResponse);
                          return _context6.a(2);
                        case 1:
                          Requests.doFetch(params.url, params.options).then(handleResponse);
                        case 2:
                          return _context6.a(2);
                      }
                    }, _callee6);
                  }));
                  return function (_x0, _x1) {
                    return _ref0.apply(this, arguments);
                  };
                }()));
            }
          }, _callee7);
        }));
        function fetch(_x8, _x9) {
          return _fetch.apply(this, arguments);
        }
        return fetch;
      }()
      /**
       * A static function to call the background fetch
       * @param  {string} url - The endpoint to fetch data from
       * @param  {JSON} options -  The fetch options
       * @return {Promise} A promise containing the parsed response.
       * The returned object type depends on the content type of the response.
       * It can be text, json or a blob.
       */
      )
    }, {
      key: "fetch2",
      value: (function () {
        var _fetch2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(url) {
          var useETag,
            options,
            _args0 = arguments;
          return _regenerator().w(function (_context1) {
            while (1) switch (_context1.n) {
              case 0:
                useETag = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : false;
                options = _args0.length > 2 ? _args0[2] : undefined;
                return _context1.a(2, new Promise(/*#__PURE__*/function () {
                  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(resolve, reject) {
                    var handleResponse, params, localStorageWrapper;
                    return _regenerator().w(function (_context0) {
                      while (1) switch (_context0.n) {
                        case 0:
                          handleResponse = function handleResponse(response) {
                            if (!response.data) {
                              reject(response);
                              return;
                            }
                            if (response.data.arrayBuffer) {
                              response.data.arrayBuffer = string2ArrayBuffer(response.data.arrayBuffer);
                            }
                            resolve(response);
                          }; // Test for now
                          params = {
                            command: "swfetch8599",
                            url: url,
                            useETag: useETag,
                            options: options
                          };
                          if (!chrome.runtime) {
                            _context0.n = 1;
                            break;
                          }
                          chrome.runtime.sendMessage(params, handleResponse);
                          return _context0.a(2);
                        case 1:
                          // Storage wrapper for localStorage
                          localStorageWrapper = {
                            getItem: function () {
                              var _getItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(key) {
                                return _regenerator().w(function (_context8) {
                                  while (1) switch (_context8.n) {
                                    case 0:
                                      return _context8.a(2, Promise.resolve(localStorage.getItem(key)));
                                  }
                                }, _callee8);
                              }));
                              function getItem(_x13) {
                                return _getItem.apply(this, arguments);
                              }
                              return getItem;
                            }(),
                            setItem: function () {
                              var _setItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(key, value) {
                                return _regenerator().w(function (_context9) {
                                  while (1) switch (_context9.n) {
                                    case 0:
                                      localStorage.setItem(key, value);
                                      return _context9.a(2, Promise.resolve());
                                  }
                                }, _callee9);
                              }));
                              function setItem(_x14, _x15) {
                                return _setItem.apply(this, arguments);
                              }
                              return setItem;
                            }()
                          };
                          Requests.doFetch2(params.url, {
                            useETag: useETag,
                            storage: localStorageWrapper,
                            options: params.options
                          }).then(handleResponse);
                        case 2:
                          return _context0.a(2);
                      }
                    }, _callee0);
                  }));
                  return function (_x11, _x12) {
                    return _ref1.apply(this, arguments);
                  };
                }()));
            }
          }, _callee1);
        }));
        function fetch2(_x10) {
          return _fetch2.apply(this, arguments);
        }
        return fetch2;
      }())
    }, {
      key: "blobToDataURL",
      value: function blobToDataURL(blob) {
        return new Promise(function (resolve, reject) {
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
    }]);
  }();
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
  var Pronunciations = /*#__PURE__*/function () {
    function Pronunciations() {
      _classCallCheck(this, Pronunciations);
      this.prons = {
        "voices": {},
        "lang": {}
      };
      if (typeof Prons != "undefined" && Prons != null) {
        this.prons = Prons;
      }
    }
    return _createClass(Pronunciations, [{
      key: "loadPronFile",
      value: function loadPronFile(dns) {
        //todo load file this.prons = Prons
      }
    }, {
      key: "setPronunciationsForVoice",
      value: function setPronunciationsForVoice(voice, words) {
        var voicePronObject = this.prons.voices[voice];
        this.setPronunciationsForLang(voicePronObject, words);
      }
    }, {
      key: "setPronunciationsForLang",
      value: function setPronunciationsForLang(lang, words) {
        var langProns = this.prons.lang[lang];
        var allProns = this.prons.lang["all"];
        var merged = Object.assign({}, allProns, langProns);
        if (merged != null && typeof merged != "undefined") {
          for (var pron in merged) {
            for (var i = 0; i < words.length; i++) {
              words[i] = words[i].replace(pron, merged[pron]);
            }
          }
        }
      }
    }]);
  }();
  /**
   * @class SpeechServerEngine
   * @classdesc Manages the speech using the SpeechServer. 
   * @implements ISpeechEngine
   */
  var SpeechServerEngine = /*#__PURE__*/function (_ISpeechEngine2) {
    function SpeechServerEngine() {
      _classCallCheck(this, SpeechServerEngine);
      return _callSuper(this, SpeechServerEngine, arguments);
    }
    _inherits(SpeechServerEngine, _ISpeechEngine2);
    return _createClass(SpeechServerEngine, [{
      key: "initialise",
      value:
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
      function initialise(_ref10) {
        var _ref10$speechServer = _ref10.speechServer,
          speechServer = _ref10$speechServer === void 0 ? "speech.speechstream.net" : _ref10$speechServer,
          _ref10$cacheServer = _ref10.cacheServer,
          cacheServer = _ref10$cacheServer === void 0 ? "cache.speechstream.net" : _ref10$cacheServer,
          _ref10$useCaching = _ref10.useCaching,
          useCaching = _ref10$useCaching === void 0 ? false : _ref10$useCaching,
          _ref10$userName = _ref10.userName,
          userName = _ref10$userName === void 0 ? "" : _ref10$userName,
          _ref10$voice = _ref10.voice,
          voice = _ref10$voice === void 0 ? "Ava" : _ref10$voice,
          _ref10$cache = _ref10.cache1,
          cache1 = _ref10$cache === void 0 ? 0 : _ref10$cache,
          _ref10$cache2 = _ref10.cache2,
          cache2 = _ref10$cache2 === void 0 ? 0 : _ref10$cache2,
          _ref10$cache3 = _ref10.cache3,
          cache3 = _ref10$cache3 === void 0 ? 0 : _ref10$cache3,
          _ref10$speed = _ref10.speed,
          speed = _ref10$speed === void 0 ? 50 : _ref10$speed,
          _ref10$eventContext = _ref10.eventContext,
          eventContext = _ref10$eventContext === void 0 ? this : _ref10$eventContext,
          _ref10$charMap = _ref10.charMap,
          charMap = _ref10$charMap === void 0 ? {
            '’': "'",
            //8217
            '`': "'",
            //96
            '™': ' ',
            //8482
            '—': ' ' //8212
          } : _ref10$charMap,
          _ref10$forceTimer = _ref10.forceTimer,
          forceTimer = _ref10$forceTimer === void 0 ? false : _ref10$forceTimer;
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
    }, {
      key: "play",
      value: (function () {
        var _play = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(_ref11) {
          var _ref11$words, words, _ref11$voice, voice, _ref11$useEvents, useEvents, _ref11$setSpeaking, setSpeaking, _ref11$continousAllow, continousAllowed, textDetails, response, detail;
          return _regenerator().w(function (_context10) {
            while (1) switch (_context10.n) {
              case 0:
                _ref11$words = _ref11.words, words = _ref11$words === void 0 ? [] : _ref11$words, _ref11$voice = _ref11.voice, voice = _ref11$voice === void 0 ? "" : _ref11$voice, _ref11$useEvents = _ref11.useEvents, useEvents = _ref11$useEvents === void 0 ? true : _ref11$useEvents, _ref11$setSpeaking = _ref11.setSpeaking, setSpeaking = _ref11$setSpeaking === void 0 ? true : _ref11$setSpeaking, _ref11$continousAllow = _ref11.continousAllowed, continousAllowed = _ref11$continousAllow === void 0 ? true : _ref11$continousAllow;
                if (!(words.length < 1)) {
                  _context10.n = 1;
                  break;
                }
                return _context10.a(2);
              case 1:
                this._continousAllowed = continousAllowed;
                this._setSpeaking = setSpeaking;
                this._speechStop = false;
                this._eventContext.dispatchEvent(Events.start(setSpeaking));
                this._paused = false;
                this._playbackTimeArray.length = 0;
                words = this._replaceInvalidCharactersInArray(words);
                this._pronunciations.setPronunciationsForVoice(this._speechConfig.voice, words);
                textDetails = this._buildSSMLText(words.slice(0, 200), useEvents); // try retrieve from the cache first, it ma be turned off in which case it will return null.
                _context10.n = 2;
                return this._getCachedSpeech({
                  "fileName": textDetails.hash
                });
              case 2:
                response = _context10.v;
                if (!(response === null)) {
                  _context10.n = 4;
                  break;
                }
                _context10.n = 3;
                return this._makeSpeechRequest({
                  "processedText": textDetails.processedText,
                  "hash": textDetails.hash
                });
              case 3:
                response = _context10.v;
              case 4:
                this._startAudio(response);
                detail = {
                  voice: voice,
                  speed: this._speechConfig.speed,
                  numWords: words.length,
                  textLength: words.join(' ').length,
                  responseTime: response.responseTime,
                  onLine: true
                }; //Dispatch on speech Analytics Event
                this._eventContext.dispatchEvent(Events.analytics({
                  eventCategory: 'on speech',
                  eventName: 'TextToSpeechEngaged',
                  category: 'Feature',
                  feature: 'Speech',
                  detail: detail
                }));
              case 5:
                return _context10.a(2);
            }
          }, _callee10, this);
        }));
        function play(_x16) {
          return _play.apply(this, arguments);
        }
        return play;
      }()
      /**
       * @function stop
       * @description Implements the SpeechEngines stop function
       */
      )
    }, {
      key: "stop",
      value: (function () {
        var _stop = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
          return _regenerator().w(function (_context11) {
            while (1) switch (_context11.n) {
              case 0:
                this._speechStop = true;
                safeCancelAnimationFrame(this._animationFrameId);
                this._paused = false;
                this._playbackTimeArray.length = 0;

                // fire the speech stopped event
                this._eventContext.dispatchEvent(Events.stop());
                if (!(this._speechConfig.audioCtx === null || this._playbackTimeArray === null)) {
                  _context11.n = 1;
                  break;
                }
                return _context11.a(2);
              case 1:
                // stop the html5 playback.
                if (this._speechConfig.audioSource) {
                  this._speechConfig.audioSource.stop(0);
                }
              case 2:
                return _context11.a(2);
            }
          }, _callee11, this);
        }));
        function stop() {
          return _stop.apply(this, arguments);
        }
        return stop;
      }()
      /**
       * @function pause
       * @description Implements the SpeechEngines pause/resume function
       */
      )
    }, {
      key: "pause",
      value: function pause() {
        try {
          if (!this._speechConfig.audioCtx) {
            return;
          }
          if (this._speechConfig.audioCtx.state === 'running') {
            this._speechConfig.audioCtx.suspend();
            this._paused = true;
          } else if (this._speechConfig.audioCtx.state === 'suspended') {
            this._speechConfig.audioCtx.resume();
            this._paused = false;
          }
        } catch (err) {
          console.log('Request failed: SpeechServer - pause: ', err);
        }
      }

      /**
       * Gets the voice property
       * @type {string}
       */
    }, {
      key: "voice",
      get: function get() {
        return this._speechConfig.voice;
      }

      /**
       * Sets the voice property
       * @type {string}
       */,
      set: function set(voice) {
        this._speechConfig.voice = voice;
      }

      /**
       * Gets the speed property
       * @type {number}
       */
    }, {
      key: "speed",
      get: function get() {
        return this._speechConfig.speed;
      }

      /**
       * Sets the speed property
       * @type {number}
       */,
      set: function set(speed) {
        this._speechConfig.speed = speed;
      }

      /**
       * Sets the cache1 property
       * @type {number}
       */
    }, {
      key: "cache1",
      set: function set(cache1) {
        this._speechConfig.cache1 = cache1;
      }

      /**
       * Sets the cache2 property
       * @type {number}
       */
    }, {
      key: "cache2",
      set: function set(cache2) {
        this._speechConfig.cache2 = cache2;
      }

      /**
       * Sets the cache3 property
       * @type {number}
       */
    }, {
      key: "cache3",
      set: function set(cache3) {
        this._speechConfig.cache3 = cache3;
      }

      /**
       * @function setSpeechServerVoices
       * @description to save requests the consumer application must tell us what speech server voices
       *   are available.
       * @param {Array.<object>} voices the server provides
       */
    }, {
      key: "setSpeechServerVoices",
      value: function setSpeechServerVoices(voices) {
        this._voices = this._convertVoicesToTexthelpFormat(voices);
      }

      /**
       * Searches the vocie list for the details of a voice, language etc. 
       * @param {string} voiceName to search for
       * @returns the details of the voice
       */
    }, {
      key: "findVoiceDetialsByName",
      value: function findVoiceDetialsByName(voiceName) {
        return this._voices.find(function (voiceDetails) {
          return voiceDetails.name === voiceName;
        });
      }

      /**
       * @function _convertVoicesToTexthelpFormat
       * @description takes the engines voice list format and converts it to a common Texthelp format
       * @param {Array.<object>} voices from the SpeechServerEngine
       * @returns {Array.<object>} voices in the Texthelp format.
       * @private
       */
    }, {
      key: "_convertVoicesToTexthelpFormat",
      value: function _convertVoicesToTexthelpFormat(speechServerVoices) {
        var texthelpVoices = speechServerVoices.map(function (SpeechServerVoice) {
          return {
            name: SpeechServerVoice.name,
            gender: SpeechServerVoice.Gender,
            language: SpeechServerVoice.language,
            description: SpeechServerVoice.description,
            vendor: SpeechServerVoice.vendor,
            offline: false,
            market: SpeechServerVoice.market ? SpeechServerVoice.market : ""
          };
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
    }, {
      key: "_replaceInvalidCharactersInWord",
      value: function _replaceInvalidCharactersInWord(word) {
        var result = word.replace(/(\u00a9|\u00ae|[\u2000-\u20AB]|[\u20AD-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g, function (match) {
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
    }, {
      key: "_replaceInvalidCharactersInArray",
      value: function _replaceInvalidCharactersInArray(array) {
        var _this3 = this;
        array.forEach(function (word, i) {
          array[i] = _this3._replaceInvalidCharactersInWord(word);
        });
        return array;
      }

      /**
       * @function getVoices
       * @description Gets a list of the engines available voices.
       * @returns {Array.<object>} the voice array.
       */
    }, {
      key: "getVoices",
      value: function getVoices() {
        return this._voices;
      }
    }, {
      key: "string2ArrayBuffer",
      value: function string2ArrayBuffer(stringIn) {
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
    }, {
      key: "_makeSpeechRequest",
      value: (function () {
        var _makeSpeechRequest2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(_ref12) {
          var _this4 = this;
          var _ref12$processedText, processedText, _ref12$hash, hash;
          return _regenerator().w(function (_context13) {
            while (1) switch (_context13.n) {
              case 0:
                _ref12$processedText = _ref12.processedText, processedText = _ref12$processedText === void 0 ? "" : _ref12$processedText, _ref12$hash = _ref12.hash, hash = _ref12$hash === void 0 ? "" : _ref12$hash;
                return _context13.a(2, new Promise(/*#__PURE__*/function () {
                  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(resolve, reject) {
                    var language, ssmlHeader, fetchData, requestStartTime, response, responseTime, arraybuffer, length, buf, timingResponseJSON;
                    return _regenerator().w(function (_context12) {
                      while (1) switch (_context12.n) {
                        case 0:
                          // let ssmlHeader = `<?xml version="1.0"?>
                          //     <speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis"
                          //     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                          //     xsi:schemaLocation="http://www.w3.org/2001/10/synthesis
                          //     http://www.w3.org/TR/speech-synthesis11/synthesis.xsd"
                          //     xml:lang="${this._speechConfig.language}"> `; 
                          language = _this4.findVoiceDetialsByName(_this4._speechConfig.voice).language;
                          ssmlHeader = "<?xml version=\"1.0\"?>\n<speak version=\"1.1\" xmlns=\"http://www.w3.org/2001/10/synthesis\"\nxmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\nxsi:schemaLocation=\"http://www.w3.org/2001/10/synthesis\nhttp://www.w3.org/TR/speech-synthesis11/synthesis.xsd\"\nxml:lang=\"".concat(language, "\">");
                          fetchData = "text=".concat(ssmlHeader).concat(encodeURIComponent(processedText), "&username=").concat(_this4._speechConfig.userName, "&speed=").concat(_this4._speechConfig.speed, "&requestType=ssml");
                          if (_this4._speechConfig.useCaching) {
                            fetchData += "&destFilename=".concat(hash, "&destFolder=").concat(_this4._getCacheLocation());
                          }
                          requestStartTime = new Date().getTime();
                          _context12.n = 1;
                          return ISOFetch.fetch("".concat(_this4._speechConfig.speechServer, "Generator/voice/").concat(_this4._speechConfig.voice, "?"), {
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
                        case 1:
                          response = _context12.v;
                          responseTime = new Date() - requestStartTime;
                          arraybuffer = response.data.arrayBuffer;
                          length = parseInt(response.data.headers["th-time"]);
                          buf = arraybuffer.slice(0, length);
                          timingResponseJSON = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(buf)));
                          resolve({
                            "timings": timingResponseJSON,
                            "audioBuffer": arraybuffer.slice(length),
                            "responseTime": responseTime
                          });
                        case 2:
                          return _context12.a(2);
                      }
                    }, _callee12);
                  }));
                  return function (_x18, _x19) {
                    return _ref13.apply(this, arguments);
                  };
                }()));
            }
          }, _callee13);
        }));
        function _makeSpeechRequest(_x17) {
          return _makeSpeechRequest2.apply(this, arguments);
        }
        return _makeSpeechRequest;
      }()
      /**
      * @function _getCachedSpeech
      * @description Retrieves cached audio from the server. Internally checks the useCaching flag so externally functions 
      * can just call.
      * @private
      * @param {object} params 
      * @param {string} params.fileName is the name of the file to retrieve from the cache. 
      * @returns {Promise} Promise object represents cached speech response {"timings", "audioBlob"}
      */
      )
    }, {
      key: "_getCachedSpeech",
      value: (function () {
        var _getCachedSpeech2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(_ref14) {
          var _this5 = this;
          var _ref14$fileName, fileName;
          return _regenerator().w(function (_context15) {
            while (1) switch (_context15.n) {
              case 0:
                _ref14$fileName = _ref14.fileName, fileName = _ref14$fileName === void 0 ? "" : _ref14$fileName;
                return _context15.a(2, new Promise(/*#__PURE__*/function () {
                  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(resolve, reject) {
                    var cachedLocation, url, response, arraybuffer, length, buf, json, blob, _t5;
                    return _regenerator().w(function (_context14) {
                      while (1) switch (_context14.n) {
                        case 0:
                          if (!(fileName.length < 1)) {
                            _context14.n = 1;
                            break;
                          }
                          throw "No cached filename was set in _getCachedSpeech";
                        case 1:
                          _context14.p = 1;
                          if (_this5._speechConfig.useCaching) {
                            _context14.n = 2;
                            break;
                          }
                          resolve(null);
                          return _context14.a(2);
                        case 2:
                          cachedLocation = _this5._getCacheLocation(); // else get the cached response.
                          url = "https://".concat(_this5._speechConfig.cacheServer, "/SpeechCache/").concat(cachedLocation, "/").concat(fileName, ".mp3");
                          _context14.n = 3;
                          return fetch(url);
                        case 3:
                          response = _context14.v;
                          _context14.n = 4;
                          return response.arrayBuffer();
                        case 4:
                          arraybuffer = _context14.v;
                          length = response.headers.get("TH-TIME");
                          buf = arraybuffer.slice(0, length);
                          json = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(buf)));
                          blob = new Blob([new Uint8Array(arraybuffer.slice(length))]);
                          resolve({
                            "timings": json,
                            "audioBlob": blob
                          });
                          _context14.n = 6;
                          break;
                        case 5:
                          _context14.p = 5;
                          _t5 = _context14.v;
                          resolve(null);
                        case 6:
                          return _context14.a(2);
                      }
                    }, _callee14, null, [[1, 5]]);
                  }));
                  return function (_x21, _x22) {
                    return _ref15.apply(this, arguments);
                  };
                }()));
            }
          }, _callee15);
        }));
        function _getCachedSpeech(_x20) {
          return _getCachedSpeech2.apply(this, arguments);
        }
        return _getCachedSpeech;
      }()
      /**
       * @function _startAudio
       * @description Start playing the audio from a seech server or cached response.
       * @private
       * @param {object} params 
       * @param {arrayBuffer} params.arrayBuffer the actual audio as a blob.
       * @param {object} params.timings timing details.  
       */
      )
    }, {
      key: "_startAudio",
      value: (function () {
        var _startAudio2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(_ref16) {
          var _this6 = this;
          var _ref16$timings, timings, _ref16$audioBuffer, audioBuffer, nCounter, i;
          return _regenerator().w(function (_context16) {
            while (1) switch (_context16.n) {
              case 0:
                _ref16$timings = _ref16.timings, timings = _ref16$timings === void 0 ? [] : _ref16$timings, _ref16$audioBuffer = _ref16.audioBuffer, audioBuffer = _ref16$audioBuffer === void 0 ? null : _ref16$audioBuffer;
                // get the response xml object.
                this._playbackTimeArray = [];
                nCounter = 0;
                this._currentHighlightWord = 0;
                for (i = 0; i < timings.bookmarks.length; i++) {
                  this._playbackTimeArray[nCounter] = timings.bookmarks[i].time / 1000;

                  // ensure that two subsequent items are not the
                  // same or later time before earlier time.
                  if (nCounter > 0 && this._playbackTimeArray[nCounter] <= this._playbackTimeArray[nCounter - 1]) {
                    this._playbackTimeArray[nCounter] = this._playbackTimeArray[nCounter - 1] + 0.010;
                  }
                  nCounter = nCounter + 1;
                }

                // ios cannot play empty files. So another ios hack fix
                if (this._playbackTimeArray[this._playbackTimeArray.length - 1] < 0.1) {
                  this._playbackTimeArray.length = 0;
                }
                if (!this._speechStop) {
                  _context16.n = 1;
                  break;
                }
                return _context16.a(2);
              case 1:
                // we have the mp3 and now timing file so start the playback
                // timer which controls highlighting and start speaking.
                this._animationFrameId = safeRequestAnimationFrame(function () {
                  _this6._audioPlaybackTimer();
                }, this._forceTimer);
                if (!this._speechConfig.audioCtx) {
                  _context16.n = 2;
                  break;
                }
                _context16.n = 2;
                return this._speechConfig.audioCtx.close();
              case 2:
                this._speechConfig.audioCtx = new AudioContext();
                this._speechConfig.audioSource = this._speechConfig.audioCtx.createBufferSource();
                this._speechConfig.audioCtx.decodeAudioData(audioBuffer, function (buffer) {
                  _this6._speechConfig.audioSource.buffer = buffer;
                  _this6._speechConfig.audioSource.connect(_this6._speechConfig.audioCtx.destination);
                  _this6._speechConfig.audioSource.loop = false;
                  _this6._speechConfig.audioSource.start(_this6._speechConfig.audioCtx.currentTime, 0);
                  _this6._speechConfig.audioSource.addEventListener('ended', function () {
                    safeCancelAnimationFrame(_this6._animationFrameId);
                    _this6._eventContext.dispatchEvent(Events.stop(_this6._setSpeaking, _this6._continousAllowed));
                    _this6._paused = false;
                  });
                });
              case 3:
                return _context16.a(2);
            }
          }, _callee16, this);
        }));
        function _startAudio(_x23) {
          return _startAudio2.apply(this, arguments);
        }
        return _startAudio;
      }()
      /**
       * @function _audioPlaybackTimer
       * @description uses safeRequestAnimationFrame not a timer to update the current word/time if document is visible
       */
      )
    }, {
      key: "_audioPlaybackTimer",
      value: function _audioPlaybackTimer() {
        var _this7 = this;
        if (this._playbackTimeArray.length > 0) {
          // if the time is after the current word then fire
          // the word callback for the word.
          if (this._playbackTimeArray[this._currentHighlightWord] < this._speechConfig.audioCtx.currentTime) {
            this._eventContext.dispatchEvent(Events.word({
              wordNo: this._currentHighlightWord
            }));
            this._currentHighlightWord++;
          }
          if (this._playbackTimeArray.length > 0) {
            // if the time is after the current word then fire
            // the word callback for the word.
            if (this._playbackTimeArray[this._currentHighlightWord] < this._speechConfig.audioCtx.currentTime) {
              this._eventContext.dispatchEvent(Events.word({
                wordNo: this._currentHighlightWord
              }));
              this.currentHighlightWord++;
            }
          }
        }

        // do it all again in a short bit.
        this._animationFrameId = safeRequestAnimationFrame(function () {
          _this7._audioPlaybackTimer();
        }, this._forceTimer);
      }

      /**
       * @function _buildSSMLText
       * @description creates a string suitable to sent to the speech server froman array of words.
       * @private
       * @param {Array.<string>} words to convert to a speech string.
       * @param {boolean} [useEvents] if true turns on caching.
       * @returns {object}  hash an string to be used for the server and its hash.  {processedText, hash}
       */
    }, {
      key: "_buildSSMLText",
      value: function _buildSSMLText(words, useEvents) {
        var processedText = "";

        // Check if Polly voice and add prosody wrapper
        var voiceDetails = this.findVoiceDetialsByName(this._speechConfig.voice);
        var isPollyVoice = voiceDetails && voiceDetails.vendor === "Polly";
        if (isPollyVoice) {
          // Convert UI speed (0-100) to Polly rate (20%-200%)
          var prosodyRate = Math.max(20, Math.min(200, this._speechConfig.speed * 1.8 + 20));
          processedText += "<prosody rate=\"".concat(prosodyRate, "%\">");
        }

        // build a bookmark string
        for (var i = 0; i < words.length; i++) {
          words[i];
          if (words[i].search(/[£$]/) != -1 && !isNaN(parseInt(words[i].replace(/[£$,]/g, "")))) {
            words[i] = "<say-as interpret-as=\"currency\">".concat(words[i].trim(), "</say-as>");
          }
          if (useEvents) {
            if (this._speechConfig.voice == "Serena") {
              if (words[i].indexOf("phone") != -1) {
                words[i] = words[i].replace(/[()]/g, "");
              }
              words[i] = words[i].replace("<say-as interpret-as=\"phone\" >", "<say-as interpret-as=\"vxml:phone\" >");
            }
            processedText += "<mark name=\"".concat(i, "\"/> ").concat(this.encodeChars(words[i].trim()), " ");
          } else {
            processedText += this.encodeChars(words[i]);
          }
        }
        if (this._speechConfig.language == "ja-jp") {
          processedText += "。";
        }
        if (isPollyVoice) {
          processedText += "</prosody>";
        }
        processedText += "<mark name=\"".concat(i, "\"/> </speak>");
        processedText = processedText.replace(/(\x3cbookmark\x20mark\x3d\x22(\d)+\x22\x2f\x3e)/g, "");
        processedText = processedText.replace(/[\s\xA0]+/g, " ");
        var md5_hash = new md5();
        var hash = md5_hash.hex_md5(processedText);
        return {
          processedText: processedText,
          hash: hash
        };
      }

      /**
       * Encodes a word before sending to the speech server.
       * @param {string} word that is encoded.
       * @return {string} The encoded result.
       */
    }, {
      key: "encodeChars",
      value: function encodeChars(word) {
        try {
          //check if SSML element and do not encode if so.
          if (word.search('<phoneme') > -1 || word.search('<sub') > -1 || word.search('<say-as') > -1 || word.search('<emphasis') > -1 || word.search('<break') > -1 || word.search('<prosody') > -1) {
            return word;
          }
          return escape(word);
          //return escape(this._speechServerEncode(word, this._charMap));
        } catch (err) {
          // console.log('Request failed: SpeechServer - encodeChars: ', err);
        }
      }
    }, {
      key: "_speechServerEncode",
      value:
      /**
       * @function _speechServerEncode
       * @description Replaces characters in a string from a map
       * @param {string} stringToEncode the string with characters to be replaced 
       * @param {object} charMap is a key/value pair map of the character to replace with the replacement character. eg{".":"!"}
       * @returns 
       */
      function _speechServerEncode(stringToEncode, charMap) {
        var matchStr = Object.keys(charMap).join('|');
        if (!matchStr) return str;
        var regexp = new RegExp(matchStr, 'g');
        return stringToEncode.replace(regexp, function (match) {
          return map[match];
        });
      }

      /**
       * @function _getCacheLocation
       * @description Gets the speechserver cache location
       * @returns {string} the cache location
       */
    }, {
      key: "_getCacheLocation",
      value: function _getCacheLocation() {
        var location = "".concat(this._speechConfig.userName, "/").concat(this._speechConfig.cache1, "/").concat(this._speechConfig.cache2, "/").concat(this._speechConfig.cache3, "/").concat(this._speechConfig.voice).concat(this._speechConfig.speed);
        return location;
      }
    }]);
  }(ISpeechEngine);
  /**
   * @class SpeechServerEngine
   * @classdesc Manages the speech using the SpeechServer. 
   * @implements ISpeechEngine
   */
  var HTML5Engine = /*#__PURE__*/function (_ISpeechEngine3) {
    function HTML5Engine() {
      _classCallCheck(this, HTML5Engine);
      return _callSuper(this, HTML5Engine, arguments);
    }
    _inherits(HTML5Engine, _ISpeechEngine3);
    return _createClass(HTML5Engine, [{
      key: "initialise",
      value: (
      /**
       * @function initialise
       * @description Initialises the SpeechEngine
       * @param {object} [speechServerSettings]
       * @param {string} [speechServerSettings.voice] the starting voice, defaults to Ava.
       * @param {number} [speechServerSettings.speed] defaults to 50%.
       * @param {number} [speechServerSettings.eventContext] defaults to 50%.
       */
      function () {
        var _initialise2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(_ref17) {
          var _ref17$voice, voice, _ref17$speed, speed, _ref17$eventContext, eventContext;
          return _regenerator().w(function (_context17) {
            while (1) switch (_context17.n) {
              case 0:
                _ref17$voice = _ref17.voice, voice = _ref17$voice === void 0 ? "Ava" : _ref17$voice, _ref17$speed = _ref17.speed, speed = _ref17$speed === void 0 ? 50 : _ref17$speed, _ref17$eventContext = _ref17.eventContext, eventContext = _ref17$eventContext === void 0 ? this : _ref17$eventContext;
                this._speechSynthesisVoices = [];
                _context17.n = 1;
                return this._speechSynthesisAsyncVoices();
              case 1:
                this._voiceList = _context17.v;
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
              case 2:
                return _context17.a(2);
            }
          }, _callee17, this);
        }));
        function initialise(_x24) {
          return _initialise2.apply(this, arguments);
        }
        return initialise;
      }()
      /**
       * @function _speechSynthesisAsyncVoices
       * @description Some HTML5 voices are server based making the get voices call async.
       *  It means calling speechSynthesis.getVoices can result in an empty array. This 
       *  is resoved using promises and waiting until the voices are ready if need be.
       * @private
       * @returns {Promise} that resolves to an array of voices. 
       */
      )
    }, {
      key: "_speechSynthesisAsyncVoices",
      value: (function () {
        var _speechSynthesisAsyncVoices2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19() {
          var _this8 = this;
          return _regenerator().w(function (_context19) {
            while (1) switch (_context19.n) {
              case 0:
                return _context19.a(2, new Promise(/*#__PURE__*/function () {
                  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(resolve, reject) {
                    return _regenerator().w(function (_context18) {
                      while (1) switch (_context18.n) {
                        case 0:
                          _this8._speechSynthesisVoices = window.speechSynthesis.getVoices();
                          if (_this8._speechSynthesisVoices.length > 0) {
                            resolve(_this8._convertVoicesToTexthelpFormat(_this8._speechSynthesisVoices));
                          }
                          window.speechSynthesis.onvoiceschanged = function (e) {
                            _this8._speechSynthesisVoices = window.speechSynthesis.getVoices();
                            resolve(_this8._convertVoicesToTexthelpFormat(_this8._speechSynthesisVoices));
                          };
                          setTimeout(function () {
                            resolve([]);
                          }, 2000);
                        case 1:
                          return _context18.a(2);
                      }
                    }, _callee18);
                  }));
                  return function (_x25, _x26) {
                    return _ref18.apply(this, arguments);
                  };
                }()));
            }
          }, _callee19);
        }));
        function _speechSynthesisAsyncVoices() {
          return _speechSynthesisAsyncVoices2.apply(this, arguments);
        }
        return _speechSynthesisAsyncVoices;
      }()
      /**
       * @function _convertVoicesToTexthelpFormat
       * @description takes the engines voice list format and converts it to a common Texthelp format
       * @param {Array.<object>} voices from the HTML5 Speech synthesis Engine
       * @returns {Array.<object>} voices in the Texthelp format.
       * @private
       */
      )
    }, {
      key: "_convertVoicesToTexthelpFormat",
      value: function _convertVoicesToTexthelpFormat(voices) {
        var texthelpVoices = voices.map(function (HTML5Voice) {
          var additionToName = "";
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
            market: HTML5Voice.market ? HTML5Voice.market : ""
          };
        });
        return texthelpVoices;
      }

      /**
       * @function getVoices
       * @description Gets a list of the engines available voices.
       * @returns {Array.<object>} the voice array.
       */
    }, {
      key: "getVoices",
      value: function getVoices() {
        return this._voiceList;
      }

      /**
       * Gets the voice property
       * @type {string}
       */
    }, {
      key: "voice",
      get: function get() {
        return this._selectedVoice.name;
      }

      /**
       * Sets the voice property
       * @type {string}
       */,
      set: function set(voiceIn) {
        var voice = voiceIn.slice("html5-".length);
        var selectedVoice = this._speechSynthesisVoices.find(function (voiceItem) {
          return voiceItem.name === voice;
        });
        if (selectedVoice !== undefined && this._selectedVoice.name !== selectedVoice.name) {
          this._selectedVoice = selectedVoice;
        }
      }

      /**
       * Gets the speed property
       * @type {number}
       */
    }, {
      key: "speed",
      get: function get() {
        return this._selectedSpeed;
      }

      /**
       * Sets the speed property
       * @type {number}
       */,
      set: function set(speed) {
        this._selectedSpeed = speed;
      }

      /**
       * @function play
       * @description Implements the SpeechEngines play or speak function
       * @param {Array.<string>} words Array of strings to speak
       */
    }, {
      key: "play",
      value: function play(_ref19) {
        var _this9 = this;
        var _ref19$words = _ref19.words,
          words = _ref19$words === void 0 ? [] : _ref19$words,
          _ref19$voice = _ref19.voice,
          voice = _ref19$voice === void 0 ? "" : _ref19$voice,
          _ref19$useEvents = _ref19.useEvents,
          useEvents = _ref19$useEvents === void 0 ? true : _ref19$useEvents,
          _ref19$setSpeaking = _ref19.setSpeaking,
          setSpeaking = _ref19$setSpeaking === void 0 ? true : _ref19$setSpeaking,
          _ref19$continousAllow = _ref19.continousAllowed,
          continousAllowed = _ref19$continousAllow === void 0 ? true : _ref19$continousAllow;
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
        var isMac = false;
        try {
          isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        } catch (error) {
          isMac = false;
        }

        // now speak the text.
        if (this._selectedVoice.localService && !isMac && !(this._selectedVoice.voiceURI.search("Chrome OS") > -1)) {
          this._speechUtterance = new SpeechSynthesisUtterance(this._buildSSMLText(words));
        } else {
          this._speechUtterance = new SpeechSynthesisUtterance(words.join(" "));
        }
        this._speechUtterance.voice = this._selectedVoice;
        this._speechUtterance.speed = this._selectedSpeed;
        this._speechUtterance.addEventListener('start', function (event) {
          var detail = {
            voice: voice,
            speed: _this9._selectedSpeed,
            numWords: words.length,
            textLength: words.join(' ').length,
            responseTime: 0,
            onLine: false
          };

          //Dispatch on speech Analytics Event
          _this9._eventContext.dispatchEvent(Events.analytics({
            eventCategory: 'on speech',
            eventName: 'TextToSpeechEngaged',
            category: 'Feature',
            feature: 'Speech',
            detail: detail
          }));
          _this9._forcedEnd = false;
          _this9._speechUtterance.addEventListener('end', function (event) {
            if (!_this9._forcedEnd) {
              //   this._eventContext.dispatchEvent(Events.stop(setSpeaking));  
              _this9._eventContext.dispatchEvent(Events.stop(_this9._setSpeaking, _this9._continousAllowed));
              _this9._paused = false;
            }
          });
          _this9._speechUtterance.addEventListener('mark', function (event) {
            // if (this._useBoundary){
            //     this._useBoundary = false;
            // }
            _this9._eventContext.dispatchEvent(Events.word());
          });
          _this9._speechUtterance.addEventListener('boundary', function (event) {
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
    }, {
      key: "stop",
      value: function stop() {
        this._paused = false;
        // fire the speech stopped event
        this._eventContext.dispatchEvent(Events.stop());
        window.speechSynthesis.cancel();
      }

      /**
       * @function pause
       * @description Implements the SpeechEngines pause function
       */
    }, {
      key: "pause",
      value: function pause() {
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
    }, {
      key: "_buildSSMLText",
      value: function _buildSSMLText(words) {
        var processedText = "<?xml version=\"1.0\"?>\n<speak version=\"1.1\" xmlns=\"http://www.w3.org/2001/10/synthesis\"\nxmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\nxsi:schemaLocation=\"http://www.w3.org/2001/10/synthesis\nhttp://www.w3.org/TR/speech-synthesis11/synthesis.xsd\"\nxml:lang=\"en-gb\">"; //todo change lang with voice

        var bookmarkedWords = [];
        for (var i = 0; i < words.length; i++) {
          if (words[i] === ' ' || words[i] === '' || words[i].length < 1) {
            bookmarkedWords.push(' ');
          } else {
            bookmarkedWords.push("<mark name=\"".concat(i, "\"/> ").concat(words[i].trim()));
          }
        }
        processedText += bookmarkedWords.join("");
        processedText += "<mark name=\"".concat(i, "\"/>") + '</speak>';
        return processedText;
      }
    }]);
  }(ISpeechEngine); //do not edit this if as it is generated by code
  var Tagalog = {
    name: "Tagalog",
    Gender: "Female",
    language: "ms",
    description: "Tagalog Female Amelia",
    glang: "ms",
    vendor: "Google",
    SupportedEngines: ["standard"]
  };
  var Afrikaans = {
    name: "Afrikaans",
    Gender: "Female",
    language: "af-za",
    description: "Afrikaans Female",
    glang: "af",
    vendor: "Google",
    SupportedEngines: ["standard"]
  };
  var Tarik = {
    name: "Tarik",
    Gender: "Male",
    language: "ar",
    description: "Arabic Male Tarik",
    glang: "ar",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Miren = {
    name: "Miren",
    Gender: "Female",
    language: "eu-es",
    description: "Basque Female Miren",
    glang: "eu",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Montserrat = {
    name: "Montserrat",
    Gender: "Female",
    language: "ca-es",
    description: "Catalan Female Montserrat",
    glang: "ca",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Tian_Tian = {
    name: "Tian-Tian",
    Gender: "Female",
    language: "zh-cn",
    description: "Chinese (Mandarin - Simplified) Female Tian-Tian",
    glang: "zh_cn",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Mei_Jia = {
    name: "Mei-Jia",
    Gender: "Female",
    language: "zh-tw",
    description: "Chinese (Mandarin - Traditional - Taiwanese) Female Mei-Jia",
    glang: "zh_tw",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Zuzana = {
    name: "Zuzana",
    Gender: "Female",
    language: "cs-cz",
    description: "Czech Female Zuzana",
    glang: "cs",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Sara = {
    name: "Sara",
    Gender: "Female",
    language: "da-dk",
    description: "Danish Female Sara",
    glang: "da-dk",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Magnus = {
    name: "Magnus",
    Gender: "Male",
    language: "da-dk",
    description: "Danish Male Magnus",
    glang: "da-dk",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Ellen = {
    name: "Ellen",
    Gender: "Female",
    language: "nl-be",
    description: "Dutch (Belgium and Flemish) Female Ellen",
    glang: "nl",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Claire = {
    name: "Claire",
    Gender: "Female",
    language: "nl-nl",
    description: "Dutch (Netherlands) Female Claire",
    glang: "nl",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Xander = {
    name: "Xander",
    Gender: "Male",
    language: "nl-nl",
    description: "Dutch (Netherlands) Male Xander",
    glang: "nl",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Karen = {
    name: "Karen",
    Gender: "Female",
    language: "en-au",
    description: "English (Australian) Female Karen",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Lee = {
    name: "Lee",
    Gender: "Male",
    language: "en-au",
    description: "English (Australian) Male Lee",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Veena = {
    name: "Veena",
    Gender: "Female",
    language: "en-in",
    description: "English (India) Female Veena",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Moira = {
    name: "Moira",
    Gender: "Female",
    language: "en-ie",
    description: "English (Irish) Female Moira",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Fiona = {
    name: "Fiona",
    Gender: "Female",
    language: "en-sc",
    description: "English (Scottish) Female Fiona",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Heather = {
    name: "Heather",
    Gender: "Female",
    language: "en-sc",
    description: "English (Scottish) Female Heather",
    glang: "en",
    vendor: "Cereproc",
    SupportedEngines: ["standard"]
  };
  var Stuart = {
    name: "Stuart",
    Gender: "Male",
    language: "en-sc",
    description: "English (Scottish) Male Stuart",
    glang: "en",
    vendor: "Cereproc",
    SupportedEngines: ["standard"]
  };
  var Andrew = {
    name: "Andrew",
    Gender: "Male",
    language: "en-sc",
    description: "English (Scottish) Male Andrew",
    glang: "en",
    vendor: "Cereproc",
    SupportedEngines: ["standard"]
  };
  var Tessa = {
    name: "Tessa",
    Gender: "Female",
    language: "en-za",
    description: "English (South African) Female Tessa",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Daniel = {
    name: "Daniel",
    Gender: "Male",
    language: "en-gb",
    description: "English (UK) Male Daniel",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Serena = {
    name: "Serena",
    Gender: "Female",
    language: "en-gb",
    description: "English (UK) Female Serena",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Allison = {
    name: "Allison",
    Gender: "Female",
    language: "en-us",
    description: "English (US) Female Allison",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Ava = {
    name: "Ava",
    Gender: "Female",
    language: "en-us",
    description: "English (US) Female Ava",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Tom = {
    name: "Tom",
    Gender: "Male",
    language: "en-us",
    description: "English (US) Male Tom",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Samantha = {
    name: "Samantha",
    Gender: "Female",
    language: "en-us",
    description: "English (US) Female Samantha",
    glang: "en",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Satu = {
    name: "Satu",
    Gender: "Female",
    language: "fi-fi",
    description: "Finnish Female Satu",
    glang: "fi",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Amelie = {
    name: "Amelie",
    Gender: "Female",
    language: "fr-ca",
    description: "French (Canadian) Female Amelie",
    glang: "fr",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Audrey = {
    name: "Audrey",
    Gender: "Female",
    language: "fr",
    description: "French Female Audrey",
    glang: "fr",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Thomas = {
    name: "Thomas",
    Gender: "Male",
    language: "fr",
    description: "French Male Thomas",
    glang: "fr",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Carmela = {
    name: "Carmela",
    Gender: "Female",
    language: "gl-es",
    description: "Galician (Spain) Female Carmela",
    glang: "gl",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Anna = {
    name: "Anna",
    Gender: "Female",
    language: "de-de",
    description: "German Female Anna",
    glang: "de",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Yannick = {
    name: "Yannick",
    Gender: "Male",
    language: "de-de",
    description: "German Male Yannick",
    glang: "de",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Petra = {
    name: "Petra",
    Gender: "Female",
    language: "de-de",
    description: "German Female Petra",
    glang: "de",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Melina = {
    name: "Melina",
    Gender: "Female",
    language: "el-gr",
    description: "Greek Female Melina",
    glang: "el",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Nikos = {
    name: "Nikos",
    Gender: "Male",
    language: "el-gr",
    description: "Greek Male Nikos",
    glang: "el",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Lekha = {
    name: "Lekha",
    Gender: "Female",
    language: "hi-in",
    description: "Hindi Female Lekha",
    glang: "hi",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Mariska = {
    name: "Mariska",
    Gender: "Female",
    language: "hu-hu",
    description: "Hungarian Female Mariska",
    glang: "hu",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Damayanti = {
    name: "Damayanti",
    Gender: "Female",
    language: "id-id",
    description: "Indonesian (Bahasa) Female Damayanti",
    glang: "id",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Alice = {
    name: "Alice",
    Gender: "Female",
    language: "it-it",
    description: "Italian Female Alice",
    glang: "it",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Federica = {
    name: "Federica",
    Gender: "Female",
    language: "it-it",
    description: "Italian Female Federica",
    glang: "it",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Luca = {
    name: "Luca",
    Gender: "Male",
    language: "it-it",
    description: "Italian Male Luca",
    glang: "it",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Paola = {
    name: "Paola",
    Gender: "Female",
    language: "it-it",
    description: "Italian Female Paola",
    glang: "it",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Ichiro = {
    name: "Ichiro",
    Gender: "Male",
    language: "ja-jp",
    description: "Japanese Male Ichiro",
    glang: "ja",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Sakura = {
    name: "Sakura",
    Gender: "Female",
    language: "ja-jp",
    description: "Japanese Female Sakura",
    glang: "ja",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Sora = {
    name: "Sora",
    Gender: "Female",
    language: "ko-kr",
    description: "Korean Female Sora",
    glang: "ko",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Nora = {
    name: "Nora",
    Gender: "Female",
    language: "no-no",
    description: "Norwegian Female Nora",
    glang: "no",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Henrik = {
    name: "Henrik",
    Gender: "Male",
    language: "no-no",
    description: "Norwegian Male Henrik",
    glang: "no",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Ewa = {
    name: "Ewa",
    Gender: "Female",
    language: "pl-pl",
    description: "Polish Female Ewa",
    glang: "pl",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Zosia = {
    name: "Zosia",
    Gender: "Female",
    language: "pl-pl",
    description: "Polish Female Zosia",
    glang: "pl",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Luciana = {
    name: "Luciana",
    Gender: "Female",
    language: "pt-br",
    description: "Portuguese (Brazilian) Female Luciana",
    glang: "pt",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Felipe = {
    name: "Felipe",
    Gender: "Male",
    language: "pt-br",
    description: "Portuguese (Brazilian) Male Felipe",
    glang: "pt",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Joana = {
    name: "Joana",
    Gender: "Female",
    language: "pt-pt",
    description: "Portuguese Female Joana",
    glang: "pt",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Catarina = {
    name: "Catarina",
    Gender: "Female",
    language: "pt-pt",
    description: "Portuguese Female Catarina",
    glang: "pt",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Ioana = {
    name: "Ioana",
    Gender: "Female",
    language: "ro-ro",
    description: "Romanian Female Ioana",
    glang: "ro",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Milena = {
    name: "Milena",
    Gender: "Female",
    language: "ru-ru",
    description: "Russian Female Milena",
    glang: "ru",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Yuri = {
    name: "Yuri",
    Gender: "Male",
    language: "ru-ru",
    description: "Russian Male Yuri",
    glang: "ru",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Laura = {
    name: "Laura",
    Gender: "Female",
    language: "sk-sk",
    description: "Slovakian Female Laura",
    glang: "sk",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Carlos = {
    name: "Carlos",
    Gender: "Male",
    language: "es-co",
    description: "Spanish (Columbian) Male Carlos",
    glang: "es",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Soledad = {
    name: "Soledad",
    Gender: "Female",
    language: "es-co",
    description: "Spanish (Columbian) Female Soledad",
    glang: "es",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Paulina = {
    name: "Paulina",
    Gender: "Female",
    language: "es-mx",
    description: "Spanish (Mexican) Female Paulina",
    glang: "es",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Juan = {
    name: "Juan",
    Gender: "Male",
    language: "es-mx",
    description: "Spanish (Mexican) Male Juan",
    glang: "es",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Jorge = {
    name: "Jorge",
    Gender: "Male",
    language: "es-es",
    description: "Spanish (Castilian) Male Jorge",
    glang: "es",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Monica = {
    name: "Monica",
    Gender: "Female",
    language: "es-es",
    description: "Spanish (Castilian) Female Monica",
    glang: "es",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Alva = {
    name: "Alva",
    Gender: "Female",
    language: "sv-se",
    description: "Swedish Female Alva",
    glang: "sv",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Oskar = {
    name: "Oskar",
    Gender: "Male",
    language: "sv-se",
    description: "Swedish Male Oskar",
    glang: "sv",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Kanya = {
    name: "Kanya",
    Gender: "Female",
    language: "th-th",
    description: "Thai Female Kanya",
    glang: "th",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Cem = {
    name: "Cem",
    Gender: "Male",
    language: "tr-tr",
    description: "Turkish Male Cem",
    glang: "tr",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Yelda = {
    name: "Yelda",
    Gender: "Female",
    language: "tr-tr",
    description: "Turkish Female Yelda",
    glang: "tr",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Lotte = {
    name: "Lotte",
    Gender: "Female",
    language: "nl-nl",
    description: "Dutch Female Lotte",
    glang: "nl",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Geraint = {
    name: "Geraint",
    Gender: "Male",
    language: "en-gb",
    description: "Welsh English Male Geraint",
    glang: "en",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Marlene = {
    name: "Marlene",
    Gender: "Female",
    language: "de-de",
    description: "German Female Marlene",
    glang: "de",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Zeina = {
    name: "Zeina",
    Gender: "Female",
    language: "arb",
    description: "Arabic Female Zeina",
    glang: "arb",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Zhiyu = {
    name: "Zhiyu",
    Gender: "Female",
    language: "zh-cn",
    description: "Chinese (Mandarin) Female Zhiyu",
    glang: "zh",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Gwyneth = {
    name: "Gwyneth",
    Gender: "Female",
    language: "cy-gb",
    description: "Welsh Female Gwyneth",
    glang: "cy",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Karl = {
    name: "Karl",
    Gender: "Male",
    language: "is-is",
    description: "Icelandic Male Karl",
    glang: "is",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Lucia = {
    name: "Lucia",
    Gender: "Female",
    language: "es-es",
    description: "Spanish (Castilian) Female Lucia",
    glang: "es",
    vendor: "Polly",
    SupportedEngines: ["neural", "standard"]
  };
  var Vicki = {
    name: "Vicki",
    Gender: "Female",
    language: "de-de",
    description: "German Female Vicki",
    glang: "de",
    vendor: "Polly",
    SupportedEngines: ["neural", "standard"]
  };
  var Chantal = {
    name: "Chantal",
    Gender: "Female",
    language: "fr-ca",
    description: "French (Canada) Female Chantal",
    glang: "fr",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Dora = {
    name: "Dora",
    Gender: "Female",
    language: "is-is",
    description: "Icelandic Female Dóra",
    glang: "is",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Enrique = {
    name: "Enrique",
    Gender: "Female",
    language: "es-es",
    description: "Spanish (Castilian) Male Enrique",
    glang: "es",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Hans = {
    name: "Hans",
    Gender: "Female",
    language: "de-de",
    description: "German Male Hans",
    glang: "de",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Celine = {
    name: "Celine",
    Gender: "Female",
    language: "fr-fr",
    description: "French Female Céline",
    glang: "fr",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Mads = {
    name: "Mads",
    Gender: "Female",
    language: "da-dk",
    description: "Danish Male Mads",
    glang: "da",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Mathieu = {
    name: "Mathieu",
    Gender: "Female",
    language: "fr-fr",
    description: "French Male Mathieu",
    glang: "fr",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Lea = {
    name: "Lea",
    Gender: "Female",
    language: "fr-fr",
    description: "French Female Léa",
    glang: "fr",
    vendor: "Polly",
    SupportedEngines: ["neural", "standard"]
  };
  var Naja = {
    name: "Naja",
    Gender: "Female",
    language: "da-dk",
    description: "Danish Female Naja",
    glang: "da",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Ruben = {
    name: "Ruben",
    Gender: "Female",
    language: "nl-nl",
    description: "Dutch Male Ruben",
    glang: "nl",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Conchita = {
    name: "Conchita",
    Gender: "Female",
    language: "es-es",
    description: "Spanish (Castilian) Female Conchita",
    glang: "es",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Liv = {
    name: "Liv",
    Gender: "Female",
    language: "nb-no",
    description: "Norwegian Bokmål Female Liv",
    glang: "nb",
    vendor: "Polly",
    SupportedEngines: ["standard"]
  };
  var Ceitidh = {
    name: "Ceitidh",
    Gender: "Female",
    language: "gd",
    glang: "gd",
    description: "Gaelic (Scottish) Female Ceitidh",
    vendor: "Cereproc",
    SupportedEngines: ["standard"]
  };
  var Peig = {
    name: "Peig",
    Gender: "Female",
    language: "ga",
    glang: "ga",
    description: "Irish Female Peig",
    vendor: "Cereproc",
    SupportedEngines: ["standard"]
  };
  var Dariush = {
    name: "Dariush",
    Gender: "Male",
    language: "fa-ir",
    glang: "fa",
    description: "Farsi Male Dariush",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Carmit = {
    name: "Carmit",
    Gender: "Female",
    language: "he-il",
    glang: "he",
    description: "Hebrew Female Carmit",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Lesya = {
    name: "Lesya",
    Gender: "Female",
    language: "uk-ua",
    glang: "uk",
    description: "Ukrainian Female Lesya",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Jordi = {
    name: "Jordi",
    Gender: "Male",
    language: "ca-es",
    glang: "ca",
    description: "Catalan Male Jordi",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Lana = {
    name: "Lana",
    Gender: "Female",
    language: "hr-hr",
    description: "Croatian Female Lana",
    glang: "hr-hr",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Sinji_Ml = {
    name: "Sinji_Ml",
    Gender: "Female",
    language: "yue-hk",
    description: "Cantonese Female Sinji",
    glang: "yue-hk",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
  };
  var Daria = {
    name: "Daria",
    Gender: "Female",
    language: "bg-bg",
    description: "Bulgarian Female Daria",
    glang: "bg-bg",
    vendor: "Nuance",
    SupportedEngines: ["standard"]
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

  var Adam_11 = {
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
  var Alice_11 = {
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
  var Antoni_11 = {
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
  var Aria_11 = {
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
  var Arnold_11 = {
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
  var Bill_11 = {
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
  var Brian_11 = {
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
  var Callum_11 = {
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
  var Charlie_11 = {
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
  var Charlotte_11 = {
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
  var Chris_11 = {
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
  var Clyde_11 = {
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
  var Daniel_11 = {
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
  var Dave_11 = {
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
  var Domi_11 = {
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
  var Dorothy_11 = {
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
  var Drew_11 = {
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
  var Elli_11 = {
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
  var Emily_11 = {
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
  var Eric_11 = {
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
  var Fin_11 = {
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
  var Freya_11 = {
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
  var George_11 = {
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
  var Gigi_11 = {
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
  var Giovanni_11 = {
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
  var Glinda_11 = {
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
  var Grace_11 = {
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
  var Hannah_11 = {
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
  var Harry_11 = {
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
  var James_11 = {
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
  var Jeremy_11 = {
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
  var Jessica_11 = {
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
  var Jessie_11 = {
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
  var Joseph_11 = {
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
  var Kylee_11 = {
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
  var Kiwi_11 = {
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
  var Josh_11 = {
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
  var Laura_11 = {
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
  var Liam_11 = {
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
  var Lily_11 = {
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
  var Matilda_11 = {
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
  var Michael_11 = {
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
  var Mimi_11 = {
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
  var Patrick_11 = {
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
  var Paul_11 = {
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
  var Rachel_11 = {
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
  var River_11 = {
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
  var Roger_11 = {
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
  var Sam_11 = {
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
  var Sarah_11 = {
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
  var Serena_11 = {
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
  var Thomas_11 = {
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
  var Will_11 = {
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
  var Bente = {
    name: "Bente",
    Gender: "Female",
    language: "nb-NO",
    description: "Norwegian Bokmål Female Bente",
    glang: "nb",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Biera_ls = {
    name: "Biera_ls",
    Gender: "Female",
    language: "se-X1",
    description: "Lule Sami male Biera",
    glang: "se",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Biera_ns = {
    name: "Biera_ns",
    Gender: "Female",
    language: "se-X0",
    description: "Northern Sami male Biera",
    glang: "se",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Elin = {
    name: "Elin",
    Gender: "Female",
    language: "sv-SE",
    description: "Swedish Female Elin",
    glang: "sv",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Eliska = {
    name: "Eliska",
    Gender: "Female",
    language: "cs-CZ",
    description: "Czech Republic Female Eliska",
    glang: "cs",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Elle_ls = {
    name: "Elle_ls",
    Gender: "Female",
    language: "se-X1",
    description: "Lule Sami Female Elle",
    glang: "se",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Elle_ns = {
    name: "Elle_ns",
    Gender: "Female",
    language: "se-X0",
    description: "Northern Sami Female Elle",
    glang: "se",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Emil = {
    name: "Emil",
    Gender: "Male",
    language: "sv-SE",
    description: "Swedish (Sweden) Male Emil",
    glang: "sv",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Erik = {
    name: "Erik",
    Gender: "Male",
    language: "sv-SE",
    description: "Swedish Male Erik",
    glang: "sv",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Hanna = {
    name: "Hanna",
    Gender: "Female",
    language: "fo-FO",
    description: "Faroese Female Hanna",
    glang: "fo",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Hanus = {
    name: "Hanus",
    Gender: "Male",
    language: "fo-FO",
    description: "Faroese Male Hanus",
    glang: "fo",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Jeroen = {
    name: "Jeroen",
    Gender: "Male",
    language: "nl-BE",
    description: "Dutch (Belgium) Male Jeroen",
    glang: "nl",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Laia = {
    name: "Laia",
    Gender: "Female",
    language: "ca-ES",
    description: "Catalan (Spanish) Female Laia",
    glang: "ca",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Louise = {
    name: "Louise",
    Gender: "Female",
    language: "fr-CA",
    description: "French (Canada) Female Louise",
    glang: "fr",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Lulu = {
    name: "Lulu",
    Gender: "Female",
    language: "zh-cn",
    description: "Chinese (Mandarin) Female Lulu",
    glang: "zh",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Mehdi = {
    name: "Mehdi",
    Gender: "Male",
    language: "ar-EG",
    description: "Arabic (Egyptian) Male Mehdi",
    glang: "ar",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Mia_acapela = {
    name: "Mia",
    Gender: "Female",
    language: "sv-SE",
    description: "Swedish Female Mia",
    glang: "sv",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Olav = {
    name: "Olav",
    Gender: "Male",
    language: "nb-NO",
    description: "Norwegian Bokmål Male Olav",
    glang: "nb",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Samuel = {
    name: "Samuel",
    Gender: "Male",
    language: "fi-SE",
    description: "Sweden (Finnish) Male Samuel",
    glang: "fi",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Sanna = {
    name: "Sanna",
    Gender: "Female",
    language: "fi-FI",
    description: "Finnish Female Sanna",
    glang: "fi",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Sofie = {
    name: "Sofie",
    Gender: "Female",
    language: "nl-BE",
    description: "Dutch (Belgium) Female Sofie",
    glang: "nl",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Zoe = {
    name: "Zoe",
    Gender: "Female",
    language: "nl-BE",
    description: "Dutch (Belgium) Female Zoe",
    glang: "nl",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Clara = {
    name: "Clara",
    Gender: "Female",
    language: "no",
    description: "Norwegian Bokmål Female Clara",
    glang: "",
    vendor: "CereProc",
    SupportedEngines: ["standard"]
  };
  var Hulda = {
    name: "Hulda",
    Gender: "Female",
    language: "no",
    description: "Norwegian Nynorsk Female Hulda",
    glang: "",
    vendor: "CereProc",
    SupportedEngines: ["standard"]
  };
  var Bianca_a = {
    name: "Bianca",
    Gender: "Female",
    language: "it-it",
    description: "Italian Female Bianca",
    glang: "it",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Giorgio_a = {
    name: "Giorgio",
    Gender: "Female",
    language: "it-it",
    description: "Italian Male Giorgio",
    glang: "it",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  var Carla_a = {
    name: "Carla",
    Gender: "Female",
    language: "it-it",
    description: "Italian Female Carla",
    glang: "it",
    vendor: "Acapela",
    SupportedEngines: ["standard"]
  };
  //do not edit this if as it is generated by code
  var voices = [Tagalog, Afrikaans, Tarik, Miren, Montserrat, Tian_Tian, Mei_Jia, Zuzana, Sara, Magnus, Ellen, Claire, Xander, Karen, Lee, Veena, Moira, Fiona, Tessa, Daniel, Serena, Allison, Ava, Tom, Samantha, Satu, Amelie, Audrey, Thomas, Carmela, Anna, Yannick, Petra, Melina, Nikos, Lekha, Mariska, Damayanti, Alice, Federica, Luca, Paola, Ichiro, Sakura, Sora, Nora, Henrik, Ewa, Zosia, Luciana, Felipe, Joana, Catarina, Ioana, Milena, Yuri, Laura, Carlos, Soledad, Paulina, Juan, Jorge, Monica, Alva, Oskar, Kanya, Cem, Yelda, Dariush, Carmit, Lesya, Jordi, Lana, Sinji_Ml, Daria];
  var polly = [Geraint, Gwyneth, Karl, Dora, Zeina,
  //Ali, //currently not working
  Celine, Chantal, Conchita, Enrique, Hans, Lea, Liv, Lucia, Lotte, Mads, Marlene, Mathieu, Naja, Ruben, Vicki, Zhiyu];
  var cereproc = [Ceitidh, Peig, Heather, Stuart, Andrew, Clara, Hulda];
  var trinity = [];
  var acapela = [
  //a_Sakura,
  Bente, Bianca_a, Biera_ls, Biera_ns, Carla_a,
  //Celia,
  //Dimitris,
  Elin, Eliska, Elle_ls, Elle_ns, Emil, Erik,
  //Freja,
  Giorgio_a, Hanna, Hanus,
  //Ipek,
  Jeroen, Laia, Louise, Lulu,
  //Marcia,
  Mehdi, Mia_acapela,
  //Minji,
  Olav,
  //Rhona,
  Samuel, Sanna, Sofie, Zoe];

  // the 11_labs voice objects here have the _11 at the end rather than the ideal start
  // because we can't have a variable starting with a number.
  var elevenlabs = [Adam_11, Alice_11, Antoni_11, Aria_11, Arnold_11, Bill_11, Brian_11, Callum_11, Charlie_11, Charlotte_11, Chris_11, Clyde_11,
  // Dan_11,
  Daniel_11, Dave_11,
  // Deobra_11,
  Domi_11, Dorothy_11, Drew_11, Elli_11, Emily_11, Eric_11,
  // Ethan_11,
  Fin_11, Freya_11, George_11, Gigi_11, Giovanni_11, Glinda_11, Grace_11, Hannah_11, Harry_11, James_11, Jeremy_11, Jessica_11, Jessie_11, Joseph_11, Josh_11, Kylee_11, Kiwi_11, Laura_11, Liam_11, Lily_11, Matilda_11, Michael_11, Mimi_11,
  // Nicole_11,
  Patrick_11, Paul_11, Rachel_11, River_11, Roger_11, Sam_11, Sarah_11, Serena_11, Thomas_11, Will_11];
  //do not edit this if as it is generated by code
  var SpeechServerVoiceList = /*#__PURE__*/function () {
    function SpeechServerVoiceList(enablePolly, cerperocEnabled, trinityEnabled, elevenlabsEnabled, acapelaEnabled) {
      _classCallCheck(this, SpeechServerVoiceList);
      this.voiceByName = {};
      this.voicesByGenderLang = {
        Male: {},
        Female: {}
      };
      this.voicesByLang = {};
      this.createVoiceMap(enablePolly, cerperocEnabled, trinityEnabled, elevenlabsEnabled, acapelaEnabled);
    }
    return _createClass(SpeechServerVoiceList, [{
      key: "createVoiceMap",
      value: function createVoiceMap(pollyEnabled, cerperocEnabled, trinityEnabled, elevenlabsEnabled, acapelaEnabled, debug) {
        var voiceList = [].concat(voices);
        if (pollyEnabled) {
          voiceList.push.apply(voiceList, polly);
        }
        if (cerperocEnabled) {
          voiceList.push.apply(voiceList, cereproc);
        }
        if (trinityEnabled) {
          voiceList.push.apply(voiceList, trinity);
        }
        if (elevenlabsEnabled) {
          voiceList.push.apply(voiceList, elevenlabs);
        }
        if (acapelaEnabled) {
          voiceList.push.apply(voiceList, acapela);
        }
        for (var i = 0; i < voiceList.length; i++) {
          this.voiceByName[voiceList[i].name] = voiceList[i];
          if (this.voicesByGenderLang[voiceList[i].Gender] == null || typeof this.voicesByGenderLang[voiceList[i].Gender] == "undefined") {
            this.voicesByGenderLang[voiceList[i].Gender] = {};
          }
          if (this.voicesByGenderLang[voiceList[i].Gender][voiceList[i].language] == null || typeof this.voicesByGenderLang[voiceList[i].Gender][voiceList[i].language] == "undefined") {
            this.voicesByGenderLang[voiceList[i].Gender][voiceList[i].language] = [];
          }
          this.voicesByGenderLang[voiceList[i].Gender][voiceList[i].language].push(voiceList[i]);
          // if (this.voicesByLang[voiceList[i].language]== null ||
          //     typeof this.voicesByLang[voiceList[i].language] == "undefined"){
          //         this.voicesByLang[voiceList[i].language]
          // }
        }
      }
    }, {
      key: "getVoiceByGenderAndLang",
      value: function getVoiceByGenderAndLang(gender, lang) {
        var genderList = this.voicesByGenderLang[gender];
        // console.log(genderList)
        var langList = genderList[lang];
        return langList;
      }
    }, {
      key: "getVoiceByName",
      value: function getVoiceByName(name) {
        return this.voiceByName[name];
      }
    }, {
      key: "getVoices",
      value: function getVoices() {
        var pollyEnabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var cerperocEnabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var trinityEnabled = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var elevenlabsEnabled = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var acapelaEnabled = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var voiceList = [].concat(voices);
        if (pollyEnabled) {
          voiceList.push.apply(voiceList, polly);
        }
        if (cerperocEnabled) {
          voiceList.push.apply(voiceList, cereproc);
        }
        if (trinityEnabled) {
          voiceList.push.apply(voiceList, trinity);
        }
        if (elevenlabsEnabled) {
          voiceList.push.apply(voiceList, elevenlabs);
        }
        if (acapelaEnabled) {
          voiceList.push.apply(voiceList, acapela);
        }
        return voiceList;
      }
    }]);
  }(); // Utility functions
  var base64ToArrayBuffer = function base64ToArrayBuffer(base64) {
    return Uint8Array.from(atob(base64), function (c) {
      return c.charCodeAt(0);
    }).buffer;
  };
  var clamp = function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  };

  /**
   * ElevenLabsSpeechEngine class provides speech synthesis using ElevenLabs API.
   * It handles speech playback using WebSocket and MediaSource extensions.
   */
  var ElevenLabsSpeechEngine = /*#__PURE__*/function (_ISpeechEngine4) {
    function ElevenLabsSpeechEngine() {
      var _this0;
      _classCallCheck(this, ElevenLabsSpeechEngine);
      _this0 = _callSuper(this, ElevenLabsSpeechEngine);

      // Initialize properties
      _this0._voices = [];
      _this0._speed = 50;
      _this0._tempSpeed = -1;
      _this0._voice = "";
      _this0._tempVoice = "";
      _this0._eventContext = _this0;
      _this0._apiKey = "";
      _this0._forceTimer = false;
      _this0._server = "";
      _this0._useEvents = true;
      _this0._setSpeaking = true;
      _this0._continousAllowed = true;
      _this0._webSocket = null;
      _this0._mediaSource = null;
      _this0._mediaSourceBuffer = null;
      _this0._websocketBuffer = [];
      _this0._audio = null;
      _this0._isEnded = false;
      _this0._speechStop = false;
      _this0._animationFrameID = null;
      _this0._wordStartPositions = [];
      _this0._wordStartTimes = [];
      _this0._charIndex = 0;
      _this0._timeOffset = 0;
      _this0._currentHighlightWord = 0;
      _this0._streamingEnded = false;

      // Bind event handlers
      _this0._onSourceOpenBound = _this0._onSourceOpen.bind(_this0);
      _this0._onAudioLoadedBound = _this0._onAudioLoaded.bind(_this0);
      _this0._onAudioEndedBound = _this0._onAudioEnded.bind(_this0);
      _this0._handleUpdateEndBound = _this0._handleUpdateEnd.bind(_this0);
      _this0._onAnimationFrameBound = _this0._onAnimationFrame.bind(_this0);

      // Initialize the Audio element once
      _this0._initializeAudio();
      return _this0;
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
    _inherits(ElevenLabsSpeechEngine, _ISpeechEngine4);
    return _createClass(ElevenLabsSpeechEngine, [{
      key: "initialise",
      value: function initialise(_ref20) {
        var _ref20$voice = _ref20.voice,
          voice = _ref20$voice === void 0 ? "11_Adam" : _ref20$voice,
          _ref20$speed = _ref20.speed,
          speed = _ref20$speed === void 0 ? 50 : _ref20$speed,
          _ref20$eventContext = _ref20.eventContext,
          eventContext = _ref20$eventContext === void 0 ? this : _ref20$eventContext,
          _ref20$apiKey = _ref20.apiKey,
          apiKey = _ref20$apiKey === void 0 ? "" : _ref20$apiKey,
          _ref20$forceTimer = _ref20.forceTimer,
          forceTimer = _ref20$forceTimer === void 0 ? false : _ref20$forceTimer,
          _ref20$server = _ref20.server,
          server = _ref20$server === void 0 ? "" : _ref20$server;
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
    }, {
      key: "_initializeAudio",
      value: function _initializeAudio() {
        var _this1 = this;
        // Initialize the Audio element only once
        this._audio = new Audio();
        this._audio.addEventListener('waiting', function () {
          var wordStartTimesLength = _this1._wordStartTimes.length > 0 ? _this1._wordStartTimes.length : 0;
          var currentHighlightWord = isNaN(_this1._currentHighlightWord) ? 0 : _this1._currentHighlightWord;
          var isLastWord = currentHighlightWord === wordStartTimesLength;
          setTimeout(function () {
            if (isLastWord && _this1._isEnded && !_this1._streamingEnded && !_this1._audio.ended) {
              _this1._onAudioEnded();
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
    }, {
      key: "play",
      value: function play(_ref21) {
        var _this10 = this;
        var _ref21$words = _ref21.words,
          words = _ref21$words === void 0 ? [] : _ref21$words,
          _ref21$useEvents = _ref21.useEvents,
          useEvents = _ref21$useEvents === void 0 ? true : _ref21$useEvents,
          _ref21$voice = _ref21.voice,
          voice = _ref21$voice === void 0 ? "" : _ref21$voice,
          _ref21$speed = _ref21.speed,
          speed = _ref21$speed === void 0 ? -1 : _ref21$speed,
          _ref21$setSpeaking = _ref21.setSpeaking,
          setSpeaking = _ref21$setSpeaking === void 0 ? true : _ref21$setSpeaking,
          _ref21$continousAllow = _ref21.continousAllowed,
          continousAllowed = _ref21$continousAllow === void 0 ? true : _ref21$continousAllow;
        if (words.length === 0) return;
        this._speechStop = false;
        this._streamingEnded = false;
        this._tempVoice = elevenlabs.find(function (vc) {
          return vc.name === (voice || _this10._voice);
        });
        this._tempSpeed = speed > -1 ? speed : this._speed;
        this._useEvents = useEvents;
        this._setSpeaking = setSpeaking;
        this._continousAllowed = continousAllowed;
        this._words = words.map(function (word) {
          return word.trim();
        });

        // Dispatch start event
        this._eventContext.dispatchEvent(Events.start(setSpeaking));

        // Clean up any previous synthesis
        this._cleanUp();

        // Initialize a new MediaSource for this synthesis
        this._initializeMediaSource();

        // Begin synthesis
        this._synthesize(this._words, this._tempVoice, this._tempSpeed);

        //Send Analytic events
        var analyticsDetails = {
          voice: voice,
          speed: this._tempSpeed,
          words: this._words.length
        };
        this._eventContext.dispatchEvent(Events.analytics({
          eventCategory: 'on speech',
          eventName: 'TextToSpeechEngaged',
          category: 'Feature',
          feature: 'Speech',
          detail: analyticsDetails
        }));
      }

      /**
       * Pauses or resumes playback.
       */
    }, {
      key: "pause",
      value: function pause() {
        if (this._audio && !this._audio.paused) {
          this._audio.pause();
        } else if (this._audio && this._audio.currentTime !== 0) {
          //if currentTime is 0 then we know we're just stopped not paused.
          this._audio.play();
        }
      }

      /**
       * Stops playback and cleans up resources.
       * Dispatches a stop event.
       */
    }, {
      key: "stop",
      value: function stop() {
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
    }, {
      key: "getVoices",
      value: function getVoices() {
        if (this._voices.length > 0) return this._voices;

        // Mark all voices as AI-generated
        this._voices = elevenlabs.map(function (voice) {
          return _objectSpread(_objectSpread({}, voice), {}, {
            ai: true
          });
        });
        return this._voices;
      }

      /**
       * Gets the current voice identifier.
       * @returns {string} Current voice identifier.
       */
    }, {
      key: "voice",
      get: function get() {
        var _this$_voice;
        return (_this$_voice = this._voice) === null || _this$_voice === void 0 ? void 0 : _this$_voice.name;
      }

      /**
       * Sets the voice identifier after validation and processing.
       * validates the voice name.
       * @param {string} voice - New voice identifier to set.
       */,
      set: function set(voice) {
        var voiceListVoice = elevenlabs.find(function (v) {
          return v.name === voice;
        });
        if (voiceListVoice) {
          this._voice = voice;
        }
      }

      /**
       * Gets the current speed.
       * @returns {number} Current playback speed.
       */
    }, {
      key: "speed",
      get: function get() {
        return this._speed;
      }

      /**
       * Sets the playback speed.
       * @param {number} speed - New speed to set.
       */,
      set: function set(speed) {
        this._speed = speed;
      }

      /**
       * Checks if the audio is currently playing.
       * @returns {boolean} `true` if audio is playing, otherwise `false`.
       */
    }, {
      key: "isPlaying",
      value: function isPlaying() {
        return this._audio && !this._audio.paused && !this._audio.ended && this._audio.currentTime > 0;
      }
    }, {
      key: "_onAnimationFrame",
      value: function _onAnimationFrame() {
        // if (this._audio.ended) {
        //     safeCancelAnimationFrame(this._animationFrameID);
        //     return;
        // }

        if (this._wordStartTimes.length > 0) {
          var currentTimeMs = this._audio.currentTime * 1000; // Current playback time in milliseconds

          // if the time is after the current word then fire
          // the word callback for the word.
          if (this._wordStartTimes[this._currentHighlightWord] < currentTimeMs) {
            this._eventContext.dispatchEvent(Events.word({
              wordNo: this._currentHighlightWord
            }));
            this._currentHighlightWord++;
          }
          if (this._wordStartTimes.length > 0) {
            // if the time is after the current word then fire
            // the word callback for the word.
            if (this._wordStartTimes[this._currentHighlightWord] < currentTimeMs) {
              this._eventContext.dispatchEvent(Events.word({
                wordNo: this._currentHighlightWord
              }));
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
    }, {
      key: "onUpdateTimingPerTextElement",
      value: function onUpdateTimingPerTextElement(alignment) {
        var _this11 = this;
        if (!this._wordStartTimes || this._wordStartTimes.length === 0) {
          this._wordStartTimes = new Array(this._wordStartPositions.length).fill(null);
        }
        var charTimingChunk = alignment.charStartTimesMs; // Array of character timings
        var wordPositionsSet = new Set(this._wordStartPositions);
        var positionsDict = {};
        this._wordStartPositions.forEach(function (pos, idx) {
          positionsDict[pos] = idx;
        });

        // Adjust timings by adding the cumulative time offset
        var adjustedCharTimings = charTimingChunk.map(function (timing) {
          return timing + _this11._timeOffset;
        });

        // Process the character timings
        var _iterator = _createForOfIteratorHelper(adjustedCharTimings),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var timing = _step.value;
            if (wordPositionsSet.has(this._charIndex)) {
              var idx = positionsDict[this._charIndex];
              if (this._wordStartTimes[idx] === null) {
                this._wordStartTimes[idx] = timing;
              }
            }
            this._charIndex += 1;
          }

          // Update time offset by adding the last timing in the original chunk
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (charTimingChunk.length > 0) {
          var chunkDuration = charTimingChunk[charTimingChunk.length - 1];
          this._timeOffset += chunkDuration;
          //add final interval to the word start times array to denote the end of the words. (this done on the server side for other voices with markings. think "<mark>this<mark>is<mark>a<mark>test<mark>")
          this._wordStartTimes[this._wordStartTimes.length] = this._timeOffset - 1;
        }
      }

      /**
       * Handles the 'loadeddata' event for the audio element.
       * @private
       */
    }, {
      key: "_onAudioLoaded",
      value: function _onAudioLoaded() {
        this._audio.play()["catch"](function (e) {
          return console.error("Error attempting to play audio:", e);
        });
        this._animationFrameID = safeRequestAnimationFrame(this._onAnimationFrameBound, this._forceTimer);
      }

      /**
       * Computes the start character indices for each text element in the concatenated text.
       *
       * @param {string[]} textArray - The array of text elements.
       * @returns {Object} An object containing positions and the concatenated text.
       */
    }, {
      key: "_computeWordStartPositions",
      value: function _computeWordStartPositions(textArray) {
        var positions = [];
        var pos = 0;
        for (var i = 0; i < textArray.length; i++) {
          var element = textArray[i];
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
    }, {
      key: "_onAudioEnded",
      value: function _onAudioEnded() {
        this._streamingEnded = true;
        this._onStop();
        this._cleanUp();
      }

      /**
       * Initializes a new MediaSource and sets up event listeners.
       * @private
       */
    }, {
      key: "_initializeMediaSource",
      value: function _initializeMediaSource() {
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
    }, {
      key: "_onSourceOpen",
      value: function _onSourceOpen(event) {
        var mediaSource = event.target;
        if (!mediaSource.sourceBuffers.length) {
          try {
            this._mediaSourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
            this._mediaSourceBuffer.addEventListener("updateend", this._handleUpdateEndBound);
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
    }, {
      key: "_handleUpdateEnd",
      value: function _handleUpdateEnd() {
        try {
          if (this._mediaSource && this._mediaSource.readyState === 'open' && this._mediaSourceBuffer && !this._mediaSourceBuffer.updating && this._websocketBuffer.length > 0) {
            var nextChunk = this._websocketBuffer.shift();
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
    }, {
      key: "_shouldEndStream",
      value: function _shouldEndStream() {
        return !this._mediaSourceBuffer.updating && this._mediaSource.readyState === 'open' && this._isEnded && this._websocketBuffer.length === 0;
      }

      /**
       * Processes audio buffers received from the WebSocket.
       * @param {ArrayBuffer} buffer - Audio data buffer.
       * @private
       */
    }, {
      key: "_onAudioBuffersFromSocket",
      value: function _onAudioBuffersFromSocket(buffer) {
        if (this._mediaSourceBuffer && !this._mediaSourceBuffer.updating && this._websocketBuffer.length === 0) {
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
    }, {
      key: "_synthesize",
      value: function _synthesize(words, voice, speed) {
        var _this12 = this;
        // Determine word positions
        this._wordStartPositions = this._computeWordStartPositions(words);
        this._wordStartTimes = [];
        this._charIndex = 0;
        this._timeOffset = 0; // Reset time offset for new synthesis
        this._currentHighlightWord = 0;

        // Set playback rate
        this._audio.playbackRate = clamp(speed / 50.0, 0.0625, 16.0);
        var voiceId = (voice === null || voice === void 0 ? void 0 : voice.id) || "pNInz6obpgDQGcFmaJgB"; // Default voice ID

        // Open WebSocket connection
        this._webSocket = new WebSocket("wss://".concat(this._server, "/api/").concat(voiceId, "?api_key=").concat(this._apiKey));
        this._webSocket.binaryType = 'arraybuffer';

        // WebSocket event handlers
        this._webSocket.onmessage = function (e) {
          if (_this12._speechStop) {
            _this12._webSocket.close();
            return;
          }
          var json = JSON.parse(e.data);
          if (json.isFinal) {
            _this12._isEnded = true;
            _this12._webSocket.close();
            if (words.length === 1 && words[0] === "") {
              _this12._onAudioEnded();
            }
            return;
          }
          if (json.audio) {
            _this12._onAudioBuffersFromSocket(base64ToArrayBuffer(json.audio));
          }
          // Handle alignment data if needed
          if (json.alignment) {
            _this12.onUpdateTimingPerTextElement(json.alignment);
          }
        };
        this._webSocket.onerror = function (e) {
          console.error('WebSocket error:', e);
        };
        this._webSocket.onopen = function () {
          // Send synthesis request
          _this12._webSocket.send(JSON.stringify({
            text: words.join(" "),
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75
            }
          }));
          // Notify end of input
          _this12._webSocket.send(JSON.stringify({
            text: ""
          }));
        };
      }

      /**
       * Handles the stop event.
       * Dispatches a stop event with appropriate settings.
       * @private
       */
    }, {
      key: "_onStop",
      value: function _onStop() {
        safeCancelAnimationFrame(this._animationFrameID);
        this._eventContext.dispatchEvent(Events.stop(this._setSpeaking, this._continousAllowed));
      }

      /**
       * Cleans up resources but keeps the Audio element.
       * Closes WebSocket and cleans up MediaSource and buffers.
       * @private
       */
    }, {
      key: "_cleanUp",
      value: function _cleanUp() {
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
            this._mediaSourceBuffer.removeEventListener("updateend", this._handleUpdateEndBound);
            this._mediaSourceBuffer = null;
          } catch (e) {
            console.error('Error aborting source buffer:', e);
          }
        }

        // Remove media source listeners
        if (this._mediaSource) {
          this._mediaSource.removeEventListener('sourceopen', this._onSourceOpenBound);
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
    }]);
  }(ISpeechEngine);
  var initialiseSpeech = /*#__PURE__*/function () {
    var _ref22 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(speechIframeManager, speechManager, speechServerEngine, html5Engine, elevenLabsSpeechEngine, data) {
      var speechServerVoiceList;
      return _regenerator().w(function (_context20) {
        while (1) switch (_context20.n) {
          case 0:
            // initialise the speechserver engine
            speechServerEngine.initialise({
              userName: data.userName,
              speechServer: data.speechServer,
              voice: data.voice,
              speed: data.speed,
              useCaching: data.useCaching,
              eventContext: speechManager,
              forceTimer: true
            });
            speechManager.initialise({
              speechEngines: [elevenLabsSpeechEngine, speechServerEngine, html5Engine]
            });

            // Get the speechserver voice list and set in the in the speech engine.
            // For the speech server we build our own voice list and set it in the engine.
            // This is so we don't have to host it on a server.
            speechServerVoiceList = new SpeechServerVoiceList(true, true, true, false, true);
            speechServerEngine.setSpeechServerVoices(speechServerVoiceList.getVoices(true, true, true, false, true));

            // initialise the HTML5 engine
            _context20.n = 1;
            return html5Engine.initialise({
              eventContext: speechManager
            });
          case 1:
            elevenLabsSpeechEngine.initialise({
              eventContext: speechManager,
              apiKey: "D1dHmXy4WxpngFmg4vam",
              forceTimer: true,
              server: "tts-elevenlabs-streaming-1-us-east-1.texthelp.com"
            });
            speechManager.speed = data.speed;
            speechManager.voice = data.voice;
            return _context20.a(2, true);
        }
      }, _callee20);
    }));
    return function initialiseSpeech(_x27, _x28, _x29, _x30, _x31, _x32) {
      return _ref22.apply(this, arguments);
    };
  }();
  var _voiceExists2 = function voiceExists(speechManager, voice) {
    return speechManager.voiceExists(decodeURIComponent(voice));
  };
  var _setSpeed = function setSpeed(speechManager, speed) {
    speechManager.speed = speed;
  };
  var _setVoice = function setVoice(speechManager, voice) {
    speechManager.voice = voice;
  };
  var getVoiceList = function getVoiceList(speechServerEngine, speechManager) {
    // Get the speechserver voice list and set in the in the speech engine.
    // For the speech server we build our own voice list and set it in the engine.
    // This is so we don't have to host it on a server.
    var speechServerVoiceList = new SpeechServerVoiceList(true, true, true, false, true);
    speechServerEngine.setSpeechServerVoices(speechServerVoiceList.getVoices(true, true, true, false, true));
    var voiceList = speechManager.getVoices();
    return voiceList;
  };

  // Case of multiple response through sendMessage
  var play = function play(speechManager, message) {
    speechManager.play(message.data);
  };

  // Case of getting back a response
  var pause = function pause(speechManager) {
    speechManager.pause();
  };

  // Case of no expected Response
  var stop = function stop(speechManager) {
    speechManager.stop();
  };

  //@ts-nocheck
  var SpeechIframeManager = /*#__PURE__*/function (_IFrameCommandHandler) {
    function SpeechIframeManager() {
      var _this13;
      _classCallCheck(this, SpeechIframeManager);
      _this13 = _callSuper(this, SpeechIframeManager);
      // Declare class property
      _this13.speechManager = null;
      _this13.speechServerEngine = null;
      _this13.html5Engine = null;
      _this13.elevenLabsSpeechEngine = null;
      _this13.currentPlayMessage = null;
      _this13.isSpeechInitialised = false;
      return _this13;
    }
    _inherits(SpeechIframeManager, _IFrameCommandHandler);
    return _createClass(SpeechIframeManager, [{
      key: "init",
      value: function init(speechManager, elevenLabsSpeechEngine, speechServerEngine, html5Engine) {
        var _this14 = this;
        //initialising iframeCommandHandler
        _superPropGet(SpeechIframeManager, "init", this, 3)([]);
        //Setting up the manager and engines
        this.speechManager = speechManager;
        this.elevenLabsSpeechEngine = elevenLabsSpeechEngine;
        this.speechServerEngine = speechServerEngine;
        this.html5Engine = html5Engine;

        // add event handlers
        speechManager.addEventListener(EVENT.WORD, function (event) {
          _this14.handleSpeechEvent(EVENT.WORD, {
            detail: event.detail
          }, event.detail.wordNo < 0 ? false : true);
        });
        speechManager.addEventListener(EVENT.START, function (event) {
          _this14.handleSpeechEvent(EVENT.START, {
            detail: event.detail
          }, true);
        });
        speechManager.addEventListener(EVENT.STOP, function (event) {
          _this14.handleSpeechEvent(EVENT.STOP, {
            detail: event.detail
          }, false);
          _this14.currentPlayMessage = null;
        });
        speechManager.addEventListener(EVENT.ANALYTICS, function (event) {
          _this14.handleSpeechEvent(EVENT.ANALYTICS, {
            detail: event.detail
          }, true);
        });
      }

      // Override handleCommand to handle specific commands
    }, {
      key: "onCommand",
      value: function onCommand(message, sendResponse) {
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
    }, {
      key: "initialise",
      value: function () {
        var _initialise3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(message, sendResponse) {
          var response;
          return _regenerator().w(function (_context21) {
            while (1) switch (_context21.n) {
              case 0:
                if (this.isSpeechInitialised) {
                  _context21.n = 2;
                  break;
                }
                _context21.n = 1;
                return initialiseSpeech(this, this.speechManager, this.speechServerEngine, this.html5Engine, this.elevenLabsSpeechEngine, message.data);
              case 1:
                response = _context21.v;
                sendResponse(response, false, message);
                this.isSpeechInitialised = true;
                _context21.n = 3;
                break;
              case 2:
                sendResponse({
                  success: true,
                  message: "Speech already initialised"
                }, false, message);
              case 3:
                return _context21.a(2);
            }
          }, _callee21, this);
        }));
        function initialise(_x33, _x34) {
          return _initialise3.apply(this, arguments);
        }
        return initialise;
      }()
    }, {
      key: "voiceExists",
      value: function voiceExists(message, sendResponse) {
        sendResponse(_voiceExists2(this.speechManager, message.data), false, message);
      }
    }, {
      key: "setVoice",
      value: function setVoice(message) {
        _setVoice(this.speechManager, message.data);
      }
    }, {
      key: "setSpeed",
      value: function setSpeed(message) {
        _setSpeed(this.speechManager, message.data);
      }
    }, {
      key: "getVoices",
      value: function getVoices(message, sendResponse) {
        sendResponse(getVoiceList(this.speechServerEngine, this.speechManager), false, message);
      }
    }, {
      key: "pauseAudio",
      value: function pauseAudio(message) {
        this.currentPlayMessage = message;
        pause(this.speechManager);
      }
    }, {
      key: "playAudio",
      value: function playAudio(message) {
        // Check if there is an active play message; if so, stop it
        // if (this.currentPlayMessage) {
        //     this.stopAudio(); // Stop the current audio and reset `currentPlayMessage`
        // }
        // Set the new message as the current play message
        this.currentPlayMessage = message;

        // Start playing audio with the new message
        play(this.speechManager, message);
      }
    }, {
      key: "handleSpeechEvent",
      value: function handleSpeechEvent(command, data, continueSpeech) {
        // Ensure the command is updated in `currentPlayMessage`
        if (this.currentPlayMessage) {
          this.currentPlayMessage.command = command;
        }

        // Send response with the current play message context
        this.sendResponse(data, continueSpeech, this.currentPlayMessage);
      }
    }, {
      key: "stopAudio",
      value: function stopAudio() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        //if the stop is manually trigged from CS then use the latest id
        if (message) {
          this.currentPlayMessage = message;
        }

        //Stop the speech
        stop(this.speechManager);
        // Reset `currentPlayMessage` as there's no active playback
        this.currentPlayMessage = null;
      }
    }]);
  }(IFrameCommandHandler);
  console.log("This is speech iframe document");

  // Instantiate the command manager for the iframe
  var speechIframeManager = new SpeechIframeManager();
  var html5Engine = new HTML5Engine();
  var elevenLabsSpeechEngine = new ElevenLabsSpeechEngine();
  var speechServerEngine = new SpeechServerEngine();
  var speechManager = new SpeechManager();

  // Initialize the manager to set up listeners
  speechIframeManager.init(speechManager, elevenLabsSpeechEngine, speechServerEngine, html5Engine);
});
