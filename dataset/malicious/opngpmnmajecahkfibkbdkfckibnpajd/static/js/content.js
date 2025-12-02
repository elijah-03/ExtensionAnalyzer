!function() {
    var e = {
        1132: function(e) {
            "use strict";
            var t = Object.prototype.hasOwnProperty, n = Object.prototype.toString, r = Object.defineProperty, u = Object.getOwnPropertyDescriptor, a = function(e) {
                return "function" == typeof Array.isArray ? Array.isArray(e) : "[object Array]" === n.call(e);
            }, i = function(e) {
                if (!e || "[object Object]" !== n.call(e)) return !1;
                var r, u = t.call(e, "constructor"), a = e.constructor && e.constructor.prototype && t.call(e.constructor.prototype, "isPrototypeOf");
                if (e.constructor && !u && !a) return !1;
                for (r in e) ;
                return void 0 === r || t.call(e, r);
            }, o = function(e, t) {
                r && "__proto__" === t.name ? r(e, t.name, {
                    enumerable: !0,
                    configurable: !0,
                    value: t.newValue,
                    writable: !0
                }) : e[t.name] = t.newValue;
            }, l = function(e, n) {
                if ("__proto__" === n) {
                    if (!t.call(e, n)) return;
                    if (u) return u(e, n).value;
                }
                return e[n];
            };
            e.exports = function e() {
                var t, n, r, u, s, c, d = arguments[0], p = 1, f = arguments.length, D = !1;
                for ("boolean" == typeof d && (D = d, d = arguments[1] || {}, p = 2), (null == d || "object" != typeof d && "function" != typeof d) && (d = {}); p < f; ++p) if (null != (t = arguments[p])) for (n in t) r = l(d, n), 
                d !== (u = l(t, n)) && (D && u && (i(u) || (s = a(u))) ? (s ? (s = !1, c = r && a(r) ? r : []) : c = r && i(r) ? r : {}, 
                o(d, {
                    name: n,
                    newValue: e(D, c, u)
                })) : void 0 !== u && o(d, {
                    name: n,
                    newValue: u
                }));
                return d;
            };
        },
        4707: function(e) {
            !function() {
                var t;
                function n(e) {
                    for (var t, n, r, u, a = 1, i = [].slice.call(arguments), o = 0, l = e.length, s = "", c = !1, d = !1, p = function() {
                        return i[a++];
                    }, f = function() {
                        for (var n = ""; /\d/.test(e[o]); ) n += e[o++], t = e[o];
                        return n.length > 0 ? parseInt(n) : null;
                    }; o < l; ++o) if (t = e[o], c) switch (c = !1, "." == t ? (d = !1, t = e[++o]) : "0" == t && "." == e[o + 1] ? (d = !0, 
                    t = e[o += 2]) : d = !0, u = f(), t) {
                      case "b":
                        s += parseInt(p(), 10).toString(2);
                        break;

                      case "c":
                        s += "string" == typeof (n = p()) || n instanceof String ? n : String.fromCharCode(parseInt(n, 10));
                        break;

                      case "d":
                        s += parseInt(p(), 10);
                        break;

                      case "f":
                        r = String(parseFloat(p()).toFixed(u || 6)), s += d ? r : r.replace(/^0/, "");
                        break;

                      case "j":
                        s += JSON.stringify(p());
                        break;

                      case "o":
                        s += "0" + parseInt(p(), 10).toString(8);
                        break;

                      case "s":
                        s += p();
                        break;

                      case "x":
                        s += "0x" + parseInt(p(), 10).toString(16);
                        break;

                      case "X":
                        s += "0x" + parseInt(p(), 10).toString(16).toUpperCase();
                        break;

                      default:
                        s += t;
                    } else "%" === t ? c = !0 : s += t;
                    return s;
                }
                (t = e.exports = n).format = n, t.vsprintf = function(e, t) {
                    return n.apply(null, [ e ].concat(t));
                }, "undefined" != typeof console && "function" == typeof console.log && (t.printf = function() {});
            }();
        },
        1065: function(e) {
            var t = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, n = /\n/g, r = /^\s*/, u = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, a = /^:\s*/, i = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, o = /^[;\s]*/, l = /^\s+|\s+$/g, s = "";
            function c(e) {
                return e ? e.replace(l, s) : s;
            }
            e.exports = function(e, l) {
                if ("string" != typeof e) throw new TypeError("First argument must be a string");
                if (!e) return [];
                l = l || {};
                var d = 1, p = 1;
                function f(e) {
                    var t = e.match(n);
                    t && (d += t.length);
                    var r = e.lastIndexOf("\n");
                    p = ~r ? e.length - r : p + e.length;
                }
                function D() {
                    var e = {
                        line: d,
                        column: p
                    };
                    return function(t) {
                        return t.position = new g(e), v(), t;
                    };
                }
                function g(e) {
                    this.start = e, this.end = {
                        line: d,
                        column: p
                    }, this.source = l.source;
                }
                g.prototype.content = e;
                var h = [];
                function m(t) {
                    var n = new Error(l.source + ":" + d + ":" + p + ": " + t);
                    if (n.reason = t, n.filename = l.source, n.line = d, n.column = p, n.source = e, 
                    !l.silent) throw n;
                    h.push(n);
                }
                function b(t) {
                    var n = t.exec(e);
                    if (n) {
                        var r = n[0];
                        return f(r), e = e.slice(r.length), n;
                    }
                }
                function v() {
                    b(r);
                }
                function E(e) {
                    var t;
                    for (e = e || []; t = y(); ) !1 !== t && e.push(t);
                    return e;
                }
                function y() {
                    var t = D();
                    if ("/" == e.charAt(0) && "*" == e.charAt(1)) {
                        for (var n = 2; s != e.charAt(n) && ("*" != e.charAt(n) || "/" != e.charAt(n + 1)); ) ++n;
                        if (n += 2, s === e.charAt(n - 1)) return m("End of comment missing");
                        var r = e.slice(2, n - 2);
                        return p += 2, f(r), e = e.slice(n), p += 2, t({
                            type: "comment",
                            comment: r
                        });
                    }
                }
                function _() {
                    var e = D(), n = b(u);
                    if (n) {
                        if (y(), !b(a)) return m("property missing ':'");
                        var r = b(i), l = e({
                            type: "declaration",
                            property: c(n[0].replace(t, s)),
                            value: r ? c(r[0].replace(t, s)) : s
                        });
                        return b(o), l;
                    }
                }
                return v(), function() {
                    var e, t = [];
                    for (E(t); e = _(); ) !1 !== e && (t.push(e), E(t));
                    return t;
                }();
            };
        },
        5586: function(e) {
            /*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
            e.exports = function(e) {
                return null != e && null != e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
            };
        },
        1725: function(e) {
            "use strict";
            /*
object-assign
(c) Sindre Sorhus
@license MIT
*/            var t = Object.getOwnPropertySymbols, n = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
            function u(e) {
                if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(e);
            }
            e.exports = function() {
                try {
                    if (!Object.assign) return !1;
                    var e = new String("abc");
                    if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
                    for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
                    if ("0123456789" !== Object.getOwnPropertyNames(t).map((function(e) {
                        return t[e];
                    })).join("")) return !1;
                    var r = {};
                    return "abcdefghijklmnopqrst".split("").forEach((function(e) {
                        r[e] = e;
                    })), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("");
                } catch (e) {
                    return !1;
                }
            }() ? Object.assign : function(e, a) {
                for (var i, o, l = u(e), s = 1; s < arguments.length; s++) {
                    for (var c in i = Object(arguments[s])) n.call(i, c) && (l[c] = i[c]);
                    if (t) {
                        o = t(i);
                        for (var d = 0; d < o.length; d++) r.call(i, o[d]) && (l[o[d]] = i[o[d]]);
                    }
                }
                return l;
            };
        },
        888: function(e, t, n) {
            "use strict";
            var r = n(9047);
            function u() {}
            function a() {}
            a.resetWarningCache = u, e.exports = function() {
                function e(e, t, n, u, a, i) {
                    if (i !== r) {
                        var o = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                        throw o.name = "Invariant Violation", o;
                    }
                }
                function t() {
                    return e;
                }
                e.isRequired = e;
                var n = {
                    array: e,
                    bigint: e,
                    bool: e,
                    func: e,
                    number: e,
                    object: e,
                    string: e,
                    symbol: e,
                    any: e,
                    arrayOf: t,
                    element: e,
                    elementType: e,
                    instanceOf: t,
                    node: e,
                    objectOf: t,
                    oneOf: t,
                    oneOfType: t,
                    shape: t,
                    exact: t,
                    checkPropTypes: a,
                    resetWarningCache: u
                };
                return n.PropTypes = n, n;
            };
        },
        2007: function(e, t, n) {
            e.exports = n(888)();
        },
        9047: function(e) {
            "use strict";
            e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
        },
        4463: function(e, t, n) {
            "use strict";
            /** @license React v17.0.2
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */            var r = n(2791), u = n(1725), a = n(5296);
            function i(e) {
                for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
                return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
            }
            if (!r) throw Error(i(227));
            var o = new Set, l = {};
            function s(e, t) {
                c(e, t), c(e + "Capture", t);
            }
            function c(e, t) {
                for (l[e] = t, e = 0; e < t.length; e++) o.add(t[e]);
            }
            var d = !("undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement), p = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, f = Object.prototype.hasOwnProperty, D = {}, g = {};
            function h(e, t, n, r, u, a, i) {
                this.acceptsBooleans = 2 === t || 3 === t || 4 === t, this.attributeName = r, this.attributeNamespace = u, 
                this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = a, 
                this.removeEmptyString = i;
            }
            var m = {};
            "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e) {
                m[e] = new h(e, 0, !1, e, null, !1, !1);
            })), [ [ "acceptCharset", "accept-charset" ], [ "className", "class" ], [ "htmlFor", "for" ], [ "httpEquiv", "http-equiv" ] ].forEach((function(e) {
                var t = e[0];
                m[t] = new h(t, 1, !1, e[1], null, !1, !1);
            })), [ "contentEditable", "draggable", "spellCheck", "value" ].forEach((function(e) {
                m[e] = new h(e, 2, !1, e.toLowerCase(), null, !1, !1);
            })), [ "autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha" ].forEach((function(e) {
                m[e] = new h(e, 2, !1, e, null, !1, !1);
            })), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e) {
                m[e] = new h(e, 3, !1, e.toLowerCase(), null, !1, !1);
            })), [ "checked", "multiple", "muted", "selected" ].forEach((function(e) {
                m[e] = new h(e, 3, !0, e, null, !1, !1);
            })), [ "capture", "download" ].forEach((function(e) {
                m[e] = new h(e, 4, !1, e, null, !1, !1);
            })), [ "cols", "rows", "size", "span" ].forEach((function(e) {
                m[e] = new h(e, 6, !1, e, null, !1, !1);
            })), [ "rowSpan", "start" ].forEach((function(e) {
                m[e] = new h(e, 5, !1, e.toLowerCase(), null, !1, !1);
            }));
            var b = /[\-:]([a-z])/g;
            function v(e) {
                return e[1].toUpperCase();
            }
            function E(e, t, n, r) {
                var u = m.hasOwnProperty(t) ? m[t] : null;
                (null !== u ? 0 === u.type : !r && 2 < t.length && ("o" === t[0] || "O" === t[0]) && ("n" === t[1] || "N" === t[1])) || (function(e, t, n, r) {
                    if (null == t || function(e, t, n, r) {
                        if (null !== n && 0 === n.type) return !1;
                        switch (typeof t) {
                          case "function":
                          case "symbol":
                            return !0;

                          case "boolean":
                            return !r && (null !== n ? !n.acceptsBooleans : "data-" !== (e = e.toLowerCase().slice(0, 5)) && "aria-" !== e);

                          default:
                            return !1;
                        }
                    }(e, t, n, r)) return !0;
                    if (r) return !1;
                    if (null !== n) switch (n.type) {
                      case 3:
                        return !t;

                      case 4:
                        return !1 === t;

                      case 5:
                        return isNaN(t);

                      case 6:
                        return isNaN(t) || 1 > t;
                    }
                    return !1;
                }(t, n, u, r) && (n = null), r || null === u ? function(e) {
                    return !!f.call(g, e) || !f.call(D, e) && (p.test(e) ? g[e] = !0 : (D[e] = !0, !1));
                }(t) && (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : u.mustUseProperty ? e[u.propertyName] = null === n ? 3 !== u.type && "" : n : (t = u.attributeName, 
                r = u.attributeNamespace, null === n ? e.removeAttribute(t) : (n = 3 === (u = u.type) || 4 === u && !0 === n ? "" : "" + n, 
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
            }
            "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e) {
                var t = e.replace(b, v);
                m[t] = new h(t, 1, !1, e, null, !1, !1);
            })), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e) {
                var t = e.replace(b, v);
                m[t] = new h(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
            })), [ "xml:base", "xml:lang", "xml:space" ].forEach((function(e) {
                var t = e.replace(b, v);
                m[t] = new h(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
            })), [ "tabIndex", "crossOrigin" ].forEach((function(e) {
                m[e] = new h(e, 1, !1, e.toLowerCase(), null, !1, !1);
            })), m.xlinkHref = new h("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), 
            [ "src", "href", "action", "formAction" ].forEach((function(e) {
                m[e] = new h(e, 1, !1, e.toLowerCase(), null, !0, !0);
            }));
            var y = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, _ = 60103, C = 60106, F = 60107, A = 60108, x = 60114, w = 60109, k = 60110, B = 60112, S = 60113, N = 60120, O = 60115, T = 60116, M = 60121, L = 60128, I = 60129, R = 60130, P = 60131;
            if ("function" == typeof Symbol && Symbol.for) {
                var j = Symbol.for;
                _ = j("react.element"), C = j("react.portal"), F = j("react.fragment"), A = j("react.strict_mode"), 
                x = j("react.profiler"), w = j("react.provider"), k = j("react.context"), B = j("react.forward_ref"), 
                S = j("react.suspense"), N = j("react.suspense_list"), O = j("react.memo"), T = j("react.lazy"), 
                M = j("react.block"), j("react.scope"), L = j("react.opaque.id"), I = j("react.debug_trace_mode"), 
                R = j("react.offscreen"), P = j("react.legacy_hidden");
            }
            var z, U = "function" == typeof Symbol && Symbol.iterator;
            function q(e) {
                return null === e || "object" != typeof e ? null : "function" == typeof (e = U && e[U] || e["@@iterator"]) ? e : null;
            }
            function H(e) {
                if (void 0 === z) try {
                    throw Error();
                } catch (e) {
                    var t = e.stack.trim().match(/\n( *(at )?)/);
                    z = t && t[1] || "";
                }
                return "\n" + z + e;
            }
            var $ = !1;
            function K(e, t) {
                if (!e || $) return "";
                $ = !0;
                var n = Error.prepareStackTrace;
                Error.prepareStackTrace = void 0;
                try {
                    if (t) if (t = function() {
                        throw Error();
                    }, Object.defineProperty(t.prototype, "props", {
                        set: function() {
                            throw Error();
                        }
                    }), "object" == typeof Reflect && Reflect.construct) {
                        try {
                            Reflect.construct(t, []);
                        } catch (e) {
                            var r = e;
                        }
                        Reflect.construct(e, [], t);
                    } else {
                        try {
                            t.call();
                        } catch (e) {
                            r = e;
                        }
                        e.call(t.prototype);
                    } else {
                        try {
                            throw Error();
                        } catch (e) {
                            r = e;
                        }
                        e();
                    }
                } catch (e) {
                    if (e && r && "string" == typeof e.stack) {
                        for (var u = e.stack.split("\n"), a = r.stack.split("\n"), i = u.length - 1, o = a.length - 1; 1 <= i && 0 <= o && u[i] !== a[o]; ) o--;
                        for (;1 <= i && 0 <= o; i--, o--) if (u[i] !== a[o]) {
                            if (1 !== i || 1 !== o) do {
                                if (i--, 0 > --o || u[i] !== a[o]) return "\n" + u[i].replace(" at new ", " at ");
                            } while (1 <= i && 0 <= o);
                            break;
                        }
                    }
                } finally {
                    $ = !1, Error.prepareStackTrace = n;
                }
                return (e = e ? e.displayName || e.name : "") ? H(e) : "";
            }
            function V(e) {
                switch (e.tag) {
                  case 5:
                    return H(e.type);

                  case 16:
                    return H("Lazy");

                  case 13:
                    return H("Suspense");

                  case 19:
                    return H("SuspenseList");

                  case 0:
                  case 2:
                  case 15:
                    return K(e.type, !1);

                  case 11:
                    return K(e.type.render, !1);

                  case 22:
                    return K(e.type._render, !1);

                  case 1:
                    return K(e.type, !0);

                  default:
                    return "";
                }
            }
            function G(e) {
                if (null == e) return null;
                if ("function" == typeof e) return e.displayName || e.name || null;
                if ("string" == typeof e) return e;
                switch (e) {
                  case F:
                    return "Fragment";

                  case C:
                    return "Portal";

                  case x:
                    return "Profiler";

                  case A:
                    return "StrictMode";

                  case S:
                    return "Suspense";

                  case N:
                    return "SuspenseList";
                }
                if ("object" == typeof e) switch (e.$$typeof) {
                  case k:
                    return (e.displayName || "Context") + ".Consumer";

                  case w:
                    return (e._context.displayName || "Context") + ".Provider";

                  case B:
                    var t = e.render;
                    return t = t.displayName || t.name || "", e.displayName || ("" !== t ? "ForwardRef(" + t + ")" : "ForwardRef");

                  case O:
                    return G(e.type);

                  case M:
                    return G(e._render);

                  case T:
                    t = e._payload, e = e._init;
                    try {
                        return G(e(t));
                    } catch (e) {}
                }
                return null;
            }
            function W(e) {
                switch (typeof e) {
                  case "boolean":
                  case "number":
                  case "object":
                  case "string":
                  case "undefined":
                    return e;

                  default:
                    return "";
                }
            }
            function Q(e) {
                var t = e.type;
                return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t);
            }
            function Z(e) {
                e._valueTracker || (e._valueTracker = function(e) {
                    var t = Q(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
                    if (!e.hasOwnProperty(t) && void 0 !== n && "function" == typeof n.get && "function" == typeof n.set) {
                        var u = n.get, a = n.set;
                        return Object.defineProperty(e, t, {
                            configurable: !0,
                            get: function() {
                                return u.call(this);
                            },
                            set: function(e) {
                                r = "" + e, a.call(this, e);
                            }
                        }), Object.defineProperty(e, t, {
                            enumerable: n.enumerable
                        }), {
                            getValue: function() {
                                return r;
                            },
                            setValue: function(e) {
                                r = "" + e;
                            },
                            stopTracking: function() {
                                e._valueTracker = null, delete e[t];
                            }
                        };
                    }
                }(e));
            }
            function X(e) {
                if (!e) return !1;
                var t = e._valueTracker;
                if (!t) return !0;
                var n = t.getValue(), r = "";
                return e && (r = Q(e) ? e.checked ? "true" : "false" : e.value), (e = r) !== n && (t.setValue(e), 
                !0);
            }
            function Y(e) {
                if (void 0 === (e = e || ("undefined" != typeof document ? document : void 0))) return null;
                try {
                    return e.activeElement || e.body;
                } catch (t) {
                    return e.body;
                }
            }
            function J(e, t) {
                var n = t.checked;
                return u({}, t, {
                    defaultChecked: void 0,
                    defaultValue: void 0,
                    value: void 0,
                    checked: null != n ? n : e._wrapperState.initialChecked
                });
            }
            function ee(e, t) {
                var n = null == t.defaultValue ? "" : t.defaultValue, r = null != t.checked ? t.checked : t.defaultChecked;
                n = W(null != t.value ? t.value : n), e._wrapperState = {
                    initialChecked: r,
                    initialValue: n,
                    controlled: "checkbox" === t.type || "radio" === t.type ? null != t.checked : null != t.value
                };
            }
            function te(e, t) {
                null != (t = t.checked) && E(e, "checked", t, !1);
            }
            function ne(e, t) {
                te(e, t);
                var n = W(t.value), r = t.type;
                if (null != n) "number" === r ? (0 === n && "" === e.value || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n); else if ("submit" === r || "reset" === r) return void e.removeAttribute("value");
                t.hasOwnProperty("value") ? ue(e, t.type, n) : t.hasOwnProperty("defaultValue") && ue(e, t.type, W(t.defaultValue)), 
                null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked);
            }
            function re(e, t, n) {
                if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
                    var r = t.type;
                    if (!("submit" !== r && "reset" !== r || void 0 !== t.value && null !== t.value)) return;
                    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
                }
                "" !== (n = e.name) && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, 
                "" !== n && (e.name = n);
            }
            function ue(e, t, n) {
                "number" === t && Y(e.ownerDocument) === e || (null == n ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
            }
            function ae(e, t) {
                return e = u({
                    children: void 0
                }, t), (t = function(e) {
                    var t = "";
                    return r.Children.forEach(e, (function(e) {
                        null != e && (t += e);
                    })), t;
                }(t.children)) && (e.children = t), e;
            }
            function ie(e, t, n, r) {
                if (e = e.options, t) {
                    t = {};
                    for (var u = 0; u < n.length; u++) t["$" + n[u]] = !0;
                    for (n = 0; n < e.length; n++) u = t.hasOwnProperty("$" + e[n].value), e[n].selected !== u && (e[n].selected = u), 
                    u && r && (e[n].defaultSelected = !0);
                } else {
                    for (n = "" + W(n), t = null, u = 0; u < e.length; u++) {
                        if (e[u].value === n) return e[u].selected = !0, void (r && (e[u].defaultSelected = !0));
                        null !== t || e[u].disabled || (t = e[u]);
                    }
                    null !== t && (t.selected = !0);
                }
            }
            function oe(e, t) {
                if (null != t.dangerouslySetInnerHTML) throw Error(i(91));
                return u({}, t, {
                    value: void 0,
                    defaultValue: void 0,
                    children: "" + e._wrapperState.initialValue
                });
            }
            function le(e, t) {
                var n = t.value;
                if (null == n) {
                    if (n = t.children, t = t.defaultValue, null != n) {
                        if (null != t) throw Error(i(92));
                        if (Array.isArray(n)) {
                            if (!(1 >= n.length)) throw Error(i(93));
                            n = n[0];
                        }
                        t = n;
                    }
                    null == t && (t = ""), n = t;
                }
                e._wrapperState = {
                    initialValue: W(n)
                };
            }
            function se(e, t) {
                var n = W(t.value), r = W(t.defaultValue);
                null != n && ((n = "" + n) !== e.value && (e.value = n), null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)), 
                null != r && (e.defaultValue = "" + r);
            }
            function ce(e) {
                var t = e.textContent;
                t === e._wrapperState.initialValue && "" !== t && null !== t && (e.value = t);
            }
            var de = "http://www.w3.org/1999/xhtml";
            function fe(e) {
                switch (e) {
                  case "svg":
                    return "http://www.w3.org/2000/svg";

                  case "math":
                    return "http://www.w3.org/1998/Math/MathML";

                  default:
                    return "http://www.w3.org/1999/xhtml";
                }
            }
            function De(e, t) {
                return null == e || "http://www.w3.org/1999/xhtml" === e ? fe(t) : "http://www.w3.org/2000/svg" === e && "foreignObject" === t ? "http://www.w3.org/1999/xhtml" : e;
            }
            var ge, he, me = (he = function(e, t) {
                if ("http://www.w3.org/2000/svg" !== e.namespaceURI || "innerHTML" in e) e.innerHTML = t; else {
                    for ((ge = ge || document.createElement("div")).innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", 
                    t = ge.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
                    for (;t.firstChild; ) e.appendChild(t.firstChild);
                }
            }, "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function(e, t, n, r) {
                MSApp.execUnsafeLocalFunction((function() {
                    return he(e, t);
                }));
            } : he);
            function be(e, t) {
                if (t) {
                    var n = e.firstChild;
                    if (n && n === e.lastChild && 3 === n.nodeType) return void (n.nodeValue = t);
                }
                e.textContent = t;
            }
            var ve = {
                animationIterationCount: !0,
                borderImageOutset: !0,
                borderImageSlice: !0,
                borderImageWidth: !0,
                boxFlex: !0,
                boxFlexGroup: !0,
                boxOrdinalGroup: !0,
                columnCount: !0,
                columns: !0,
                flex: !0,
                flexGrow: !0,
                flexPositive: !0,
                flexShrink: !0,
                flexNegative: !0,
                flexOrder: !0,
                gridArea: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowSpan: !0,
                gridRowStart: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnSpan: !0,
                gridColumnStart: !0,
                fontWeight: !0,
                lineClamp: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                tabSize: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0,
                fillOpacity: !0,
                floodOpacity: !0,
                stopOpacity: !0,
                strokeDasharray: !0,
                strokeDashoffset: !0,
                strokeMiterlimit: !0,
                strokeOpacity: !0,
                strokeWidth: !0
            }, Ee = [ "Webkit", "ms", "Moz", "O" ];
            function ye(e, t, n) {
                return null == t || "boolean" == typeof t || "" === t ? "" : n || "number" != typeof t || 0 === t || ve.hasOwnProperty(e) && ve[e] ? ("" + t).trim() : t + "px";
            }
            function _e(e, t) {
                for (var n in e = e.style, t) if (t.hasOwnProperty(n)) {
                    var r = 0 === n.indexOf("--"), u = ye(n, t[n], r);
                    "float" === n && (n = "cssFloat"), r ? e.setProperty(n, u) : e[n] = u;
                }
            }
            Object.keys(ve).forEach((function(e) {
                Ee.forEach((function(t) {
                    t = t + e.charAt(0).toUpperCase() + e.substring(1), ve[t] = ve[e];
                }));
            }));
            var Ce = u({
                menuitem: !0
            }, {
                area: !0,
                base: !0,
                br: !0,
                col: !0,
                embed: !0,
                hr: !0,
                img: !0,
                input: !0,
                keygen: !0,
                link: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0
            });
            function Fe(e, t) {
                if (t) {
                    if (Ce[e] && (null != t.children || null != t.dangerouslySetInnerHTML)) throw Error(i(137, e));
                    if (null != t.dangerouslySetInnerHTML) {
                        if (null != t.children) throw Error(i(60));
                        if ("object" != typeof t.dangerouslySetInnerHTML || !("__html" in t.dangerouslySetInnerHTML)) throw Error(i(61));
                    }
                    if (null != t.style && "object" != typeof t.style) throw Error(i(62));
                }
            }
            function Ae(e, t) {
                if (-1 === e.indexOf("-")) return "string" == typeof t.is;
                switch (e) {
                  case "annotation-xml":
                  case "color-profile":
                  case "font-face":
                  case "font-face-src":
                  case "font-face-uri":
                  case "font-face-format":
                  case "font-face-name":
                  case "missing-glyph":
                    return !1;

                  default:
                    return !0;
                }
            }
            function xe(e) {
                return (e = e.target || e.srcElement || window).correspondingUseElement && (e = e.correspondingUseElement), 
                3 === e.nodeType ? e.parentNode : e;
            }
            var we = null, ke = null, Be = null;
            function Se(e) {
                if (e = ru(e)) {
                    if ("function" != typeof we) throw Error(i(280));
                    var t = e.stateNode;
                    t && (t = au(t), we(e.stateNode, e.type, t));
                }
            }
            function Ne(e) {
                ke ? Be ? Be.push(e) : Be = [ e ] : ke = e;
            }
            function Oe() {
                if (ke) {
                    var e = ke, t = Be;
                    if (Be = ke = null, Se(e), t) for (e = 0; e < t.length; e++) Se(t[e]);
                }
            }
            function Te(e, t) {
                return e(t);
            }
            function Me(e, t, n, r, u) {
                return e(t, n, r, u);
            }
            function Le() {}
            var Ie = Te, Re = !1, Pe = !1;
            function je() {
                null === ke && null === Be || (Le(), Oe());
            }
            function ze(e, t) {
                var n = e.stateNode;
                if (null === n) return null;
                var r = au(n);
                if (null === r) return null;
                n = r[t];
                e: switch (t) {
                  case "onClick":
                  case "onClickCapture":
                  case "onDoubleClick":
                  case "onDoubleClickCapture":
                  case "onMouseDown":
                  case "onMouseDownCapture":
                  case "onMouseMove":
                  case "onMouseMoveCapture":
                  case "onMouseUp":
                  case "onMouseUpCapture":
                  case "onMouseEnter":
                    (r = !r.disabled) || (r = !("button" === (e = e.type) || "input" === e || "select" === e || "textarea" === e)), 
                    e = !r;
                    break e;

                  default:
                    e = !1;
                }
                if (e) return null;
                if (n && "function" != typeof n) throw Error(i(231, t, typeof n));
                return n;
            }
            var Ue = !1;
            if (d) try {
                var qe = {};
                Object.defineProperty(qe, "passive", {
                    get: function() {
                        Ue = !0;
                    }
                }), window.addEventListener("test", qe, qe), window.removeEventListener("test", qe, qe);
            } catch (he) {
                Ue = !1;
            }
            function He(e, t, n, r, u, a, i, o, l) {
                var s = Array.prototype.slice.call(arguments, 3);
                try {
                    t.apply(n, s);
                } catch (e) {
                    this.onError(e);
                }
            }
            var $e = !1, Ke = null, Ve = !1, Ge = null, We = {
                onError: function(e) {
                    $e = !0, Ke = e;
                }
            };
            function Qe(e, t, n, r, u, a, i, o, l) {
                $e = !1, Ke = null, He.apply(We, arguments);
            }
            function Ze(e) {
                var t = e, n = e;
                if (e.alternate) for (;t.return; ) t = t.return; else {
                    e = t;
                    do {
                        0 != (1026 & (t = e).flags) && (n = t.return), e = t.return;
                    } while (e);
                }
                return 3 === t.tag ? n : null;
            }
            function Xe(e) {
                if (13 === e.tag) {
                    var t = e.memoizedState;
                    if (null === t && null !== (e = e.alternate) && (t = e.memoizedState), null !== t) return t.dehydrated;
                }
                return null;
            }
            function Ye(e) {
                if (Ze(e) !== e) throw Error(i(188));
            }
            function Je(e) {
                if (!(e = function(e) {
                    var t = e.alternate;
                    if (!t) {
                        if (null === (t = Ze(e))) throw Error(i(188));
                        return t !== e ? null : e;
                    }
                    for (var n = e, r = t; ;) {
                        var u = n.return;
                        if (null === u) break;
                        var a = u.alternate;
                        if (null === a) {
                            if (null !== (r = u.return)) {
                                n = r;
                                continue;
                            }
                            break;
                        }
                        if (u.child === a.child) {
                            for (a = u.child; a; ) {
                                if (a === n) return Ye(u), e;
                                if (a === r) return Ye(u), t;
                                a = a.sibling;
                            }
                            throw Error(i(188));
                        }
                        if (n.return !== r.return) n = u, r = a; else {
                            for (var o = !1, l = u.child; l; ) {
                                if (l === n) {
                                    o = !0, n = u, r = a;
                                    break;
                                }
                                if (l === r) {
                                    o = !0, r = u, n = a;
                                    break;
                                }
                                l = l.sibling;
                            }
                            if (!o) {
                                for (l = a.child; l; ) {
                                    if (l === n) {
                                        o = !0, n = a, r = u;
                                        break;
                                    }
                                    if (l === r) {
                                        o = !0, r = a, n = u;
                                        break;
                                    }
                                    l = l.sibling;
                                }
                                if (!o) throw Error(i(189));
                            }
                        }
                        if (n.alternate !== r) throw Error(i(190));
                    }
                    if (3 !== n.tag) throw Error(i(188));
                    return n.stateNode.current === n ? e : t;
                }(e))) return null;
                for (var t = e; ;) {
                    if (5 === t.tag || 6 === t.tag) return t;
                    if (t.child) t.child.return = t, t = t.child; else {
                        if (t === e) break;
                        for (;!t.sibling; ) {
                            if (!t.return || t.return === e) return null;
                            t = t.return;
                        }
                        t.sibling.return = t.return, t = t.sibling;
                    }
                }
                return null;
            }
            function et(e, t) {
                for (var n = e.alternate; null !== t; ) {
                    if (t === e || t === n) return !0;
                    t = t.return;
                }
                return !1;
            }
            var tt, nt, rt, ut, at = !1, it = [], ot = null, lt = null, st = null, ct = new Map, dt = new Map, pt = [], ft = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
            function Dt(e, t, n, r, u) {
                return {
                    blockedOn: e,
                    domEventName: t,
                    eventSystemFlags: 16 | n,
                    nativeEvent: u,
                    targetContainers: [ r ]
                };
            }
            function gt(e, t) {
                switch (e) {
                  case "focusin":
                  case "focusout":
                    ot = null;
                    break;

                  case "dragenter":
                  case "dragleave":
                    lt = null;
                    break;

                  case "mouseover":
                  case "mouseout":
                    st = null;
                    break;

                  case "pointerover":
                  case "pointerout":
                    ct.delete(t.pointerId);
                    break;

                  case "gotpointercapture":
                  case "lostpointercapture":
                    dt.delete(t.pointerId);
                }
            }
            function ht(e, t, n, r, u, a) {
                return null === e || e.nativeEvent !== a ? (e = Dt(t, n, r, u, a), null !== t && null !== (t = ru(t)) && nt(t), 
                e) : (e.eventSystemFlags |= r, t = e.targetContainers, null !== u && -1 === t.indexOf(u) && t.push(u), 
                e);
            }
            function mt(e) {
                var t = nu(e.target);
                if (null !== t) {
                    var n = Ze(t);
                    if (null !== n) if (13 === (t = n.tag)) {
                        if (null !== (t = Xe(n))) return e.blockedOn = t, void ut(e.lanePriority, (function() {
                            a.unstable_runWithPriority(e.priority, (function() {
                                rt(n);
                            }));
                        }));
                    } else if (3 === t && n.stateNode.hydrate) return void (e.blockedOn = 3 === n.tag ? n.stateNode.containerInfo : null);
                }
                e.blockedOn = null;
            }
            function bt(e) {
                if (null !== e.blockedOn) return !1;
                for (var t = e.targetContainers; 0 < t.length; ) {
                    var n = Jt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
                    if (null !== n) return null !== (t = ru(n)) && nt(t), e.blockedOn = n, !1;
                    t.shift();
                }
                return !0;
            }
            function vt(e, t, n) {
                bt(e) && n.delete(t);
            }
            function Et() {
                for (at = !1; 0 < it.length; ) {
                    var e = it[0];
                    if (null !== e.blockedOn) {
                        null !== (e = ru(e.blockedOn)) && tt(e);
                        break;
                    }
                    for (var t = e.targetContainers; 0 < t.length; ) {
                        var n = Jt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
                        if (null !== n) {
                            e.blockedOn = n;
                            break;
                        }
                        t.shift();
                    }
                    null === e.blockedOn && it.shift();
                }
                null !== ot && bt(ot) && (ot = null), null !== lt && bt(lt) && (lt = null), null !== st && bt(st) && (st = null), 
                ct.forEach(vt), dt.forEach(vt);
            }
            function yt(e, t) {
                e.blockedOn === t && (e.blockedOn = null, at || (at = !0, a.unstable_scheduleCallback(a.unstable_NormalPriority, Et)));
            }
            function _t(e) {
                function t(t) {
                    return yt(t, e);
                }
                if (0 < it.length) {
                    yt(it[0], e);
                    for (var n = 1; n < it.length; n++) {
                        var r = it[n];
                        r.blockedOn === e && (r.blockedOn = null);
                    }
                }
                for (null !== ot && yt(ot, e), null !== lt && yt(lt, e), null !== st && yt(st, e), 
                ct.forEach(t), dt.forEach(t), n = 0; n < pt.length; n++) (r = pt[n]).blockedOn === e && (r.blockedOn = null);
                for (;0 < pt.length && null === (n = pt[0]).blockedOn; ) mt(n), null === n.blockedOn && pt.shift();
            }
            function Ct(e, t) {
                var n = {};
                return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, 
                n;
            }
            var Ft = {
                animationend: Ct("Animation", "AnimationEnd"),
                animationiteration: Ct("Animation", "AnimationIteration"),
                animationstart: Ct("Animation", "AnimationStart"),
                transitionend: Ct("Transition", "TransitionEnd")
            }, At = {}, xt = {};
            function wt(e) {
                if (At[e]) return At[e];
                if (!Ft[e]) return e;
                var t, n = Ft[e];
                for (t in n) if (n.hasOwnProperty(t) && t in xt) return At[e] = n[t];
                return e;
            }
            d && (xt = document.createElement("div").style, "AnimationEvent" in window || (delete Ft.animationend.animation, 
            delete Ft.animationiteration.animation, delete Ft.animationstart.animation), "TransitionEvent" in window || delete Ft.transitionend.transition);
            var kt = wt("animationend"), Bt = wt("animationiteration"), St = wt("animationstart"), Nt = wt("transitionend"), Ot = new Map, Tt = new Map, Mt = [ "abort", "abort", kt, "animationEnd", Bt, "animationIteration", St, "animationStart", "canplay", "canPlay", "canplaythrough", "canPlayThrough", "durationchange", "durationChange", "emptied", "emptied", "encrypted", "encrypted", "ended", "ended", "error", "error", "gotpointercapture", "gotPointerCapture", "load", "load", "loadeddata", "loadedData", "loadedmetadata", "loadedMetadata", "loadstart", "loadStart", "lostpointercapture", "lostPointerCapture", "playing", "playing", "progress", "progress", "seeking", "seeking", "stalled", "stalled", "suspend", "suspend", "timeupdate", "timeUpdate", Nt, "transitionEnd", "waiting", "waiting" ];
            function Lt(e, t) {
                for (var n = 0; n < e.length; n += 2) {
                    var r = e[n], u = e[n + 1];
                    u = "on" + (u[0].toUpperCase() + u.slice(1)), Tt.set(r, t), Ot.set(r, u), s(u, [ r ]);
                }
            }
            (0, a.unstable_now)();
            var It = 8;
            function Rt(e) {
                if (0 != (1 & e)) return It = 15, 1;
                if (0 != (2 & e)) return It = 14, 2;
                if (0 != (4 & e)) return It = 13, 4;
                var t = 24 & e;
                return 0 !== t ? (It = 12, t) : 0 != (32 & e) ? (It = 11, 32) : 0 != (t = 192 & e) ? (It = 10, 
                t) : 0 != (256 & e) ? (It = 9, 256) : 0 != (t = 3584 & e) ? (It = 8, t) : 0 != (4096 & e) ? (It = 7, 
                4096) : 0 != (t = 4186112 & e) ? (It = 6, t) : 0 != (t = 62914560 & e) ? (It = 5, 
                t) : 67108864 & e ? (It = 4, 67108864) : 0 != (134217728 & e) ? (It = 3, 134217728) : 0 != (t = 805306368 & e) ? (It = 2, 
                t) : 0 != (1073741824 & e) ? (It = 1, 1073741824) : (It = 8, e);
            }
            function Pt(e, t) {
                var n = e.pendingLanes;
                if (0 === n) return It = 0;
                var r = 0, u = 0, a = e.expiredLanes, i = e.suspendedLanes, o = e.pingedLanes;
                if (0 !== a) r = a, u = It = 15; else if (0 != (a = 134217727 & n)) {
                    var l = a & ~i;
                    0 !== l ? (r = Rt(l), u = It) : 0 != (o &= a) && (r = Rt(o), u = It);
                } else 0 != (a = n & ~i) ? (r = Rt(a), u = It) : 0 !== o && (r = Rt(o), u = It);
                if (0 === r) return 0;
                if (r = n & ((0 > (r = 31 - $t(r)) ? 0 : 1 << r) << 1) - 1, 0 !== t && t !== r && 0 == (t & i)) {
                    if (Rt(t), u <= It) return t;
                    It = u;
                }
                if (0 !== (t = e.entangledLanes)) for (e = e.entanglements, t &= r; 0 < t; ) u = 1 << (n = 31 - $t(t)), 
                r |= e[n], t &= ~u;
                return r;
            }
            function jt(e) {
                return 0 != (e = -1073741825 & e.pendingLanes) ? e : 1073741824 & e ? 1073741824 : 0;
            }
            function zt(e, t) {
                switch (e) {
                  case 15:
                    return 1;

                  case 14:
                    return 2;

                  case 12:
                    return 0 === (e = Ut(24 & ~t)) ? zt(10, t) : e;

                  case 10:
                    return 0 === (e = Ut(192 & ~t)) ? zt(8, t) : e;

                  case 8:
                    return 0 === (e = Ut(3584 & ~t)) && 0 === (e = Ut(4186112 & ~t)) && (e = 512), e;

                  case 2:
                    return 0 === (t = Ut(805306368 & ~t)) && (t = 268435456), t;
                }
                throw Error(i(358, e));
            }
            function Ut(e) {
                return e & -e;
            }
            function qt(e) {
                for (var t = [], n = 0; 31 > n; n++) t.push(e);
                return t;
            }
            function Ht(e, t, n) {
                e.pendingLanes |= t;
                var r = t - 1;
                e.suspendedLanes &= r, e.pingedLanes &= r, (e = e.eventTimes)[t = 31 - $t(t)] = n;
            }
            var $t = Math.clz32 ? Math.clz32 : function(e) {
                return 0 === e ? 32 : 31 - (Kt(e) / Vt | 0) | 0;
            }, Kt = Math.log, Vt = Math.LN2, Gt = a.unstable_UserBlockingPriority, Wt = a.unstable_runWithPriority, Qt = !0;
            function Zt(e, t, n, r) {
                Re || Le();
                var u = Yt, a = Re;
                Re = !0;
                try {
                    Me(u, e, t, n, r);
                } finally {
                    (Re = a) || je();
                }
            }
            function Xt(e, t, n, r) {
                Wt(Gt, Yt.bind(null, e, t, n, r));
            }
            function Yt(e, t, n, r) {
                var u;
                if (Qt) if ((u = 0 == (4 & t)) && 0 < it.length && -1 < ft.indexOf(e)) e = Dt(null, e, t, n, r), 
                it.push(e); else {
                    var a = Jt(e, t, n, r);
                    if (null === a) u && gt(e, r); else {
                        if (u) {
                            if (-1 < ft.indexOf(e)) return e = Dt(a, e, t, n, r), void it.push(e);
                            if (function(e, t, n, r, u) {
                                switch (t) {
                                  case "focusin":
                                    return ot = ht(ot, e, t, n, r, u), !0;

                                  case "dragenter":
                                    return lt = ht(lt, e, t, n, r, u), !0;

                                  case "mouseover":
                                    return st = ht(st, e, t, n, r, u), !0;

                                  case "pointerover":
                                    var a = u.pointerId;
                                    return ct.set(a, ht(ct.get(a) || null, e, t, n, r, u)), !0;

                                  case "gotpointercapture":
                                    return a = u.pointerId, dt.set(a, ht(dt.get(a) || null, e, t, n, r, u)), !0;
                                }
                                return !1;
                            }(a, e, t, n, r)) return;
                            gt(e, r);
                        }
                        Lr(e, t, r, null, n);
                    }
                }
            }
            function Jt(e, t, n, r) {
                var u = xe(r);
                if (null !== (u = nu(u))) {
                    var a = Ze(u);
                    if (null === a) u = null; else {
                        var i = a.tag;
                        if (13 === i) {
                            if (null !== (u = Xe(a))) return u;
                            u = null;
                        } else if (3 === i) {
                            if (a.stateNode.hydrate) return 3 === a.tag ? a.stateNode.containerInfo : null;
                            u = null;
                        } else a !== u && (u = null);
                    }
                }
                return Lr(e, t, r, u, n), null;
            }
            var en = null, tn = null, nn = null;
            function rn() {
                if (nn) return nn;
                var e, t, n = tn, r = n.length, u = "value" in en ? en.value : en.textContent, a = u.length;
                for (e = 0; e < r && n[e] === u[e]; e++) ;
                var i = r - e;
                for (t = 1; t <= i && n[r - t] === u[a - t]; t++) ;
                return nn = u.slice(e, 1 < t ? 1 - t : void 0);
            }
            function un(e) {
                var t = e.keyCode;
                return "charCode" in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : e = t, 
                10 === e && (e = 13), 32 <= e || 13 === e ? e : 0;
            }
            function an() {
                return !0;
            }
            function on() {
                return !1;
            }
            function ln(e) {
                function t(t, n, r, u, a) {
                    for (var i in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = u, 
                    this.target = a, this.currentTarget = null, e) e.hasOwnProperty(i) && (t = e[i], 
                    this[i] = t ? t(u) : u[i]);
                    return this.isDefaultPrevented = (null != u.defaultPrevented ? u.defaultPrevented : !1 === u.returnValue) ? an : on, 
                    this.isPropagationStopped = on, this;
                }
                return u(t.prototype, {
                    preventDefault: function() {
                        this.defaultPrevented = !0;
                        var e = this.nativeEvent;
                        e && (e.preventDefault ? e.preventDefault() : "unknown" != typeof e.returnValue && (e.returnValue = !1), 
                        this.isDefaultPrevented = an);
                    },
                    stopPropagation: function() {
                        var e = this.nativeEvent;
                        e && (e.stopPropagation ? e.stopPropagation() : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0), 
                        this.isPropagationStopped = an);
                    },
                    persist: function() {},
                    isPersistent: an
                }), t;
            }
            var sn, cn, dn, pn = {
                eventPhase: 0,
                bubbles: 0,
                cancelable: 0,
                timeStamp: function(e) {
                    return e.timeStamp || Date.now();
                },
                defaultPrevented: 0,
                isTrusted: 0
            }, fn = ln(pn), Dn = u({}, pn, {
                view: 0,
                detail: 0
            }), gn = ln(Dn), hn = u({}, Dn, {
                screenX: 0,
                screenY: 0,
                clientX: 0,
                clientY: 0,
                pageX: 0,
                pageY: 0,
                ctrlKey: 0,
                shiftKey: 0,
                altKey: 0,
                metaKey: 0,
                getModifierState: kn,
                button: 0,
                buttons: 0,
                relatedTarget: function(e) {
                    return void 0 === e.relatedTarget ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
                },
                movementX: function(e) {
                    return "movementX" in e ? e.movementX : (e !== dn && (dn && "mousemove" === e.type ? (sn = e.screenX - dn.screenX, 
                    cn = e.screenY - dn.screenY) : cn = sn = 0, dn = e), sn);
                },
                movementY: function(e) {
                    return "movementY" in e ? e.movementY : cn;
                }
            }), mn = ln(hn), bn = ln(u({}, hn, {
                dataTransfer: 0
            })), vn = ln(u({}, Dn, {
                relatedTarget: 0
            })), En = ln(u({}, pn, {
                animationName: 0,
                elapsedTime: 0,
                pseudoElement: 0
            })), _n = ln(u({}, pn, {
                clipboardData: function(e) {
                    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
                }
            })), Cn = ln(u({}, pn, {
                data: 0
            })), Fn = {
                Esc: "Escape",
                Spacebar: " ",
                Left: "ArrowLeft",
                Up: "ArrowUp",
                Right: "ArrowRight",
                Down: "ArrowDown",
                Del: "Delete",
                Win: "OS",
                Menu: "ContextMenu",
                Apps: "ContextMenu",
                Scroll: "ScrollLock",
                MozPrintableKey: "Unidentified"
            }, An = {
                8: "Backspace",
                9: "Tab",
                12: "Clear",
                13: "Enter",
                16: "Shift",
                17: "Control",
                18: "Alt",
                19: "Pause",
                20: "CapsLock",
                27: "Escape",
                32: " ",
                33: "PageUp",
                34: "PageDown",
                35: "End",
                36: "Home",
                37: "ArrowLeft",
                38: "ArrowUp",
                39: "ArrowRight",
                40: "ArrowDown",
                45: "Insert",
                46: "Delete",
                112: "F1",
                113: "F2",
                114: "F3",
                115: "F4",
                116: "F5",
                117: "F6",
                118: "F7",
                119: "F8",
                120: "F9",
                121: "F10",
                122: "F11",
                123: "F12",
                144: "NumLock",
                145: "ScrollLock",
                224: "Meta"
            }, xn = {
                Alt: "altKey",
                Control: "ctrlKey",
                Meta: "metaKey",
                Shift: "shiftKey"
            };
            function wn(e) {
                var t = this.nativeEvent;
                return t.getModifierState ? t.getModifierState(e) : !!(e = xn[e]) && !!t[e];
            }
            function kn() {
                return wn;
            }
            var Sn = ln(u({}, Dn, {
                key: function(e) {
                    if (e.key) {
                        var t = Fn[e.key] || e.key;
                        if ("Unidentified" !== t) return t;
                    }
                    return "keypress" === e.type ? 13 === (e = un(e)) ? "Enter" : String.fromCharCode(e) : "keydown" === e.type || "keyup" === e.type ? An[e.keyCode] || "Unidentified" : "";
                },
                code: 0,
                location: 0,
                ctrlKey: 0,
                shiftKey: 0,
                altKey: 0,
                metaKey: 0,
                repeat: 0,
                locale: 0,
                getModifierState: kn,
                charCode: function(e) {
                    return "keypress" === e.type ? un(e) : 0;
                },
                keyCode: function(e) {
                    return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
                },
                which: function(e) {
                    return "keypress" === e.type ? un(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
                }
            })), Nn = ln(u({}, hn, {
                pointerId: 0,
                width: 0,
                height: 0,
                pressure: 0,
                tangentialPressure: 0,
                tiltX: 0,
                tiltY: 0,
                twist: 0,
                pointerType: 0,
                isPrimary: 0
            })), On = ln(u({}, Dn, {
                touches: 0,
                targetTouches: 0,
                changedTouches: 0,
                altKey: 0,
                metaKey: 0,
                ctrlKey: 0,
                shiftKey: 0,
                getModifierState: kn
            })), Tn = ln(u({}, pn, {
                propertyName: 0,
                elapsedTime: 0,
                pseudoElement: 0
            })), Ln = ln(u({}, hn, {
                deltaX: function(e) {
                    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
                },
                deltaY: function(e) {
                    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
                },
                deltaZ: 0,
                deltaMode: 0
            })), In = [ 9, 13, 27, 32 ], Rn = d && "CompositionEvent" in window, Pn = null;
            d && "documentMode" in document && (Pn = document.documentMode);
            var jn = d && "TextEvent" in window && !Pn, zn = d && (!Rn || Pn && 8 < Pn && 11 >= Pn), Un = String.fromCharCode(32), qn = !1;
            function Hn(e, t) {
                switch (e) {
                  case "keyup":
                    return -1 !== In.indexOf(t.keyCode);

                  case "keydown":
                    return 229 !== t.keyCode;

                  case "keypress":
                  case "mousedown":
                  case "focusout":
                    return !0;

                  default:
                    return !1;
                }
            }
            function $n(e) {
                return "object" == typeof (e = e.detail) && "data" in e ? e.data : null;
            }
            var Kn = !1, Vn = {
                color: !0,
                date: !0,
                datetime: !0,
                "datetime-local": !0,
                email: !0,
                month: !0,
                number: !0,
                password: !0,
                range: !0,
                search: !0,
                tel: !0,
                text: !0,
                time: !0,
                url: !0,
                week: !0
            };
            function Gn(e) {
                var t = e && e.nodeName && e.nodeName.toLowerCase();
                return "input" === t ? !!Vn[e.type] : "textarea" === t;
            }
            function Wn(e, t, n, r) {
                Ne(r), 0 < (t = Rr(t, "onChange")).length && (n = new fn("onChange", "change", null, n, r), 
                e.push({
                    event: n,
                    listeners: t
                }));
            }
            var Qn = null, Zn = null;
            function Xn(e) {
                Br(e, 0);
            }
            function Yn(e) {
                if (X(uu(e))) return e;
            }
            function Jn(e, t) {
                if ("change" === e) return t;
            }
            var er = !1;
            if (d) {
                var tr;
                if (d) {
                    var nr = "oninput" in document;
                    if (!nr) {
                        var rr = document.createElement("div");
                        rr.setAttribute("oninput", "return;"), nr = "function" == typeof rr.oninput;
                    }
                    tr = nr;
                } else tr = !1;
                er = tr && (!document.documentMode || 9 < document.documentMode);
            }
            function ur() {
                Qn && (Qn.detachEvent("onpropertychange", ar), Zn = Qn = null);
            }
            function ar(e) {
                if ("value" === e.propertyName && Yn(Zn)) {
                    var t = [];
                    if (Wn(t, Zn, e, xe(e)), e = Xn, Re) e(t); else {
                        Re = !0;
                        try {
                            Te(e, t);
                        } finally {
                            Re = !1, je();
                        }
                    }
                }
            }
            function ir(e, t, n) {
                "focusin" === e ? (ur(), Zn = n, (Qn = t).attachEvent("onpropertychange", ar)) : "focusout" === e && ur();
            }
            function or(e) {
                if ("selectionchange" === e || "keyup" === e || "keydown" === e) return Yn(Zn);
            }
            function lr(e, t) {
                if ("click" === e) return Yn(t);
            }
            function sr(e, t) {
                if ("input" === e || "change" === e) return Yn(t);
            }
            var cr = "function" == typeof Object.is ? Object.is : function(e, t) {
                return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t;
            }, dr = Object.prototype.hasOwnProperty;
            function pr(e, t) {
                if (cr(e, t)) return !0;
                if ("object" != typeof e || null === e || "object" != typeof t || null === t) return !1;
                var n = Object.keys(e), r = Object.keys(t);
                if (n.length !== r.length) return !1;
                for (r = 0; r < n.length; r++) if (!dr.call(t, n[r]) || !cr(e[n[r]], t[n[r]])) return !1;
                return !0;
            }
            function fr(e) {
                for (;e && e.firstChild; ) e = e.firstChild;
                return e;
            }
            function Dr(e, t) {
                var n, r = fr(e);
                for (e = 0; r; ) {
                    if (3 === r.nodeType) {
                        if (n = e + r.textContent.length, e <= t && n >= t) return {
                            node: r,
                            offset: t - e
                        };
                        e = n;
                    }
                    e: {
                        for (;r; ) {
                            if (r.nextSibling) {
                                r = r.nextSibling;
                                break e;
                            }
                            r = r.parentNode;
                        }
                        r = void 0;
                    }
                    r = fr(r);
                }
            }
            function gr(e, t) {
                return !(!e || !t) && (e === t || (!e || 3 !== e.nodeType) && (t && 3 === t.nodeType ? gr(e, t.parentNode) : "contains" in e ? e.contains(t) : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(t))));
            }
            function hr() {
                for (var e = window, t = Y(); t instanceof e.HTMLIFrameElement; ) {
                    try {
                        var n = "string" == typeof t.contentWindow.location.href;
                    } catch (e) {
                        n = !1;
                    }
                    if (!n) break;
                    t = Y((e = t.contentWindow).document);
                }
                return t;
            }
            function mr(e) {
                var t = e && e.nodeName && e.nodeName.toLowerCase();
                return t && ("input" === t && ("text" === e.type || "search" === e.type || "tel" === e.type || "url" === e.type || "password" === e.type) || "textarea" === t || "true" === e.contentEditable);
            }
            var br = d && "documentMode" in document && 11 >= document.documentMode, vr = null, Er = null, yr = null, _r = !1;
            function Cr(e, t, n) {
                var r = n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
                _r || null == vr || vr !== Y(r) || (r = "selectionStart" in (r = vr) && mr(r) ? {
                    start: r.selectionStart,
                    end: r.selectionEnd
                } : {
                    anchorNode: (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection()).anchorNode,
                    anchorOffset: r.anchorOffset,
                    focusNode: r.focusNode,
                    focusOffset: r.focusOffset
                }, yr && pr(yr, r) || (yr = r, 0 < (r = Rr(Er, "onSelect")).length && (t = new fn("onSelect", "select", null, t, n), 
                e.push({
                    event: t,
                    listeners: r
                }), t.target = vr)));
            }
            Lt("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0), 
            Lt("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1), 
            Lt(Mt, 2);
            for (var Fr = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), Ar = 0; Ar < Fr.length; Ar++) Tt.set(Fr[Ar], 0);
            c("onMouseEnter", [ "mouseout", "mouseover" ]), c("onMouseLeave", [ "mouseout", "mouseover" ]), 
            c("onPointerEnter", [ "pointerout", "pointerover" ]), c("onPointerLeave", [ "pointerout", "pointerover" ]), 
            s("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), 
            s("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), 
            s("onBeforeInput", [ "compositionend", "keypress", "textInput", "paste" ]), s("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), 
            s("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), 
            s("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
            var xr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), wr = new Set("cancel close invalid load scroll toggle".split(" ").concat(xr));
            function kr(e, t, n) {
                var r = e.type || "unknown-event";
                e.currentTarget = n, function(e, t, n, r, u, a, o, l, s) {
                    if (Qe.apply(this, arguments), $e) {
                        if (!$e) throw Error(i(198));
                        var c = Ke;
                        $e = !1, Ke = null, Ve || (Ve = !0, Ge = c);
                    }
                }(r, t, void 0, e), e.currentTarget = null;
            }
            function Br(e, t) {
                t = 0 != (4 & t);
                for (var n = 0; n < e.length; n++) {
                    var r = e[n], u = r.event;
                    r = r.listeners;
                    e: {
                        var a = void 0;
                        if (t) for (var i = r.length - 1; 0 <= i; i--) {
                            var o = r[i], l = o.instance, s = o.currentTarget;
                            if (o = o.listener, l !== a && u.isPropagationStopped()) break e;
                            kr(u, o, s), a = l;
                        } else for (i = 0; i < r.length; i++) {
                            if (l = (o = r[i]).instance, s = o.currentTarget, o = o.listener, l !== a && u.isPropagationStopped()) break e;
                            kr(u, o, s), a = l;
                        }
                    }
                }
                if (Ve) throw e = Ge, Ve = !1, Ge = null, e;
            }
            function Sr(e, t) {
                var n = iu(t), r = e + "__bubble";
                n.has(r) || (Mr(t, e, 2, !1), n.add(r));
            }
            var Nr = "_reactListening" + Math.random().toString(36).slice(2);
            function Or(e) {
                e[Nr] || (e[Nr] = !0, o.forEach((function(t) {
                    wr.has(t) || Tr(t, !1, e, null), Tr(t, !0, e, null);
                })));
            }
            function Tr(e, t, n, r) {
                var u = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 0, a = n;
                if ("selectionchange" === e && 9 !== n.nodeType && (a = n.ownerDocument), null !== r && !t && wr.has(e)) {
                    if ("scroll" !== e) return;
                    u |= 2, a = r;
                }
                var i = iu(a), o = e + "__" + (t ? "capture" : "bubble");
                i.has(o) || (t && (u |= 4), Mr(a, e, u, t), i.add(o));
            }
            function Mr(e, t, n, r) {
                var u = Tt.get(t);
                switch (void 0 === u ? 2 : u) {
                  case 0:
                    u = Zt;
                    break;

                  case 1:
                    u = Xt;
                    break;

                  default:
                    u = Yt;
                }
                n = u.bind(null, t, n, e), u = void 0, !Ue || "touchstart" !== t && "touchmove" !== t && "wheel" !== t || (u = !0), 
                r ? void 0 !== u ? e.addEventListener(t, n, {
                    capture: !0,
                    passive: u
                }) : e.addEventListener(t, n, !0) : void 0 !== u ? e.addEventListener(t, n, {
                    passive: u
                }) : e.addEventListener(t, n, !1);
            }
            function Lr(e, t, n, r, u) {
                var a = r;
                if (0 == (1 & t) && 0 == (2 & t) && null !== r) e: for (;;) {
                    if (null === r) return;
                    var i = r.tag;
                    if (3 === i || 4 === i) {
                        var o = r.stateNode.containerInfo;
                        if (o === u || 8 === o.nodeType && o.parentNode === u) break;
                        if (4 === i) for (i = r.return; null !== i; ) {
                            var l = i.tag;
                            if ((3 === l || 4 === l) && ((l = i.stateNode.containerInfo) === u || 8 === l.nodeType && l.parentNode === u)) return;
                            i = i.return;
                        }
                        for (;null !== o; ) {
                            if (null === (i = nu(o))) return;
                            if (5 === (l = i.tag) || 6 === l) {
                                r = a = i;
                                continue e;
                            }
                            o = o.parentNode;
                        }
                    }
                    r = r.return;
                }
                !function(e, t, n) {
                    if (Pe) return e();
                    Pe = !0;
                    try {
                        Ie(e, t, n);
                    } finally {
                        Pe = !1, je();
                    }
                }((function() {
                    var r = a, u = xe(n), i = [];
                    e: {
                        var o = Ot.get(e);
                        if (void 0 !== o) {
                            var l = fn, s = e;
                            switch (e) {
                              case "keypress":
                                if (0 === un(n)) break e;

                              case "keydown":
                              case "keyup":
                                l = Sn;
                                break;

                              case "focusin":
                                s = "focus", l = vn;
                                break;

                              case "focusout":
                                s = "blur", l = vn;
                                break;

                              case "beforeblur":
                              case "afterblur":
                                l = vn;
                                break;

                              case "click":
                                if (2 === n.button) break e;

                              case "auxclick":
                              case "dblclick":
                              case "mousedown":
                              case "mousemove":
                              case "mouseup":
                              case "mouseout":
                              case "mouseover":
                              case "contextmenu":
                                l = mn;
                                break;

                              case "drag":
                              case "dragend":
                              case "dragenter":
                              case "dragexit":
                              case "dragleave":
                              case "dragover":
                              case "dragstart":
                              case "drop":
                                l = bn;
                                break;

                              case "touchcancel":
                              case "touchend":
                              case "touchmove":
                              case "touchstart":
                                l = On;
                                break;

                              case kt:
                              case Bt:
                              case St:
                                l = En;
                                break;

                              case Nt:
                                l = Tn;
                                break;

                              case "scroll":
                                l = gn;
                                break;

                              case "wheel":
                                l = Ln;
                                break;

                              case "copy":
                              case "cut":
                              case "paste":
                                l = _n;
                                break;

                              case "gotpointercapture":
                              case "lostpointercapture":
                              case "pointercancel":
                              case "pointerdown":
                              case "pointermove":
                              case "pointerout":
                              case "pointerover":
                              case "pointerup":
                                l = Nn;
                            }
                            var c = 0 != (4 & t), d = !c && "scroll" === e, p = c ? null !== o ? o + "Capture" : null : o;
                            c = [];
                            for (var f, D = r; null !== D; ) {
                                var g = (f = D).stateNode;
                                if (5 === f.tag && null !== g && (f = g, null !== p && null != (g = ze(D, p)) && c.push(Ir(D, g, f))), 
                                d) break;
                                D = D.return;
                            }
                            0 < c.length && (o = new l(o, s, null, n, u), i.push({
                                event: o,
                                listeners: c
                            }));
                        }
                    }
                    if (0 == (7 & t)) {
                        if (l = "mouseout" === e || "pointerout" === e, (!(o = "mouseover" === e || "pointerover" === e) || 0 != (16 & t) || !(s = n.relatedTarget || n.fromElement) || !nu(s) && !s[eu]) && (l || o) && (o = u.window === u ? u : (o = u.ownerDocument) ? o.defaultView || o.parentWindow : window, 
                        l ? (l = r, null !== (s = (s = n.relatedTarget || n.toElement) ? nu(s) : null) && (s !== (d = Ze(s)) || 5 !== s.tag && 6 !== s.tag) && (s = null)) : (l = null, 
                        s = r), l !== s)) {
                            if (c = mn, g = "onMouseLeave", p = "onMouseEnter", D = "mouse", "pointerout" !== e && "pointerover" !== e || (c = Nn, 
                            g = "onPointerLeave", p = "onPointerEnter", D = "pointer"), d = null == l ? o : uu(l), 
                            f = null == s ? o : uu(s), (o = new c(g, D + "leave", l, n, u)).target = d, o.relatedTarget = f, 
                            g = null, nu(u) === r && ((c = new c(p, D + "enter", s, n, u)).target = f, c.relatedTarget = d, 
                            g = c), d = g, l && s) e: {
                                for (p = s, D = 0, f = c = l; f; f = Pr(f)) D++;
                                for (f = 0, g = p; g; g = Pr(g)) f++;
                                for (;0 < D - f; ) c = Pr(c), D--;
                                for (;0 < f - D; ) p = Pr(p), f--;
                                for (;D--; ) {
                                    if (c === p || null !== p && c === p.alternate) break e;
                                    c = Pr(c), p = Pr(p);
                                }
                                c = null;
                            } else c = null;
                            null !== l && jr(i, o, l, c, !1), null !== s && null !== d && jr(i, d, s, c, !0);
                        }
                        if ("select" === (l = (o = r ? uu(r) : window).nodeName && o.nodeName.toLowerCase()) || "input" === l && "file" === o.type) var h = Jn; else if (Gn(o)) if (er) h = sr; else {
                            h = or;
                            var m = ir;
                        } else (l = o.nodeName) && "input" === l.toLowerCase() && ("checkbox" === o.type || "radio" === o.type) && (h = lr);
                        switch (h && (h = h(e, r)) ? Wn(i, h, n, u) : (m && m(e, o, r), "focusout" === e && (m = o._wrapperState) && m.controlled && "number" === o.type && ue(o, "number", o.value)), 
                        m = r ? uu(r) : window, e) {
                          case "focusin":
                            (Gn(m) || "true" === m.contentEditable) && (vr = m, Er = r, yr = null);
                            break;

                          case "focusout":
                            yr = Er = vr = null;
                            break;

                          case "mousedown":
                            _r = !0;
                            break;

                          case "contextmenu":
                          case "mouseup":
                          case "dragend":
                            _r = !1, Cr(i, n, u);
                            break;

                          case "selectionchange":
                            if (br) break;

                          case "keydown":
                          case "keyup":
                            Cr(i, n, u);
                        }
                        var b;
                        if (Rn) e: {
                            switch (e) {
                              case "compositionstart":
                                var v = "onCompositionStart";
                                break e;

                              case "compositionend":
                                v = "onCompositionEnd";
                                break e;

                              case "compositionupdate":
                                v = "onCompositionUpdate";
                                break e;
                            }
                            v = void 0;
                        } else Kn ? Hn(e, n) && (v = "onCompositionEnd") : "keydown" === e && 229 === n.keyCode && (v = "onCompositionStart");
                        v && (zn && "ko" !== n.locale && (Kn || "onCompositionStart" !== v ? "onCompositionEnd" === v && Kn && (b = rn()) : (tn = "value" in (en = u) ? en.value : en.textContent, 
                        Kn = !0)), 0 < (m = Rr(r, v)).length && (v = new Cn(v, e, null, n, u), i.push({
                            event: v,
                            listeners: m
                        }), (b || null !== (b = $n(n))) && (v.data = b))), (b = jn ? function(e, t) {
                            switch (e) {
                              case "compositionend":
                                return $n(t);

                              case "keypress":
                                return 32 !== t.which ? null : (qn = !0, Un);

                              case "textInput":
                                return (e = t.data) === Un && qn ? null : e;

                              default:
                                return null;
                            }
                        }(e, n) : function(e, t) {
                            if (Kn) return "compositionend" === e || !Rn && Hn(e, t) ? (e = rn(), nn = tn = en = null, 
                            Kn = !1, e) : null;
                            switch (e) {
                              case "paste":
                              default:
                                return null;

                              case "keypress":
                                if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                                    if (t.char && 1 < t.char.length) return t.char;
                                    if (t.which) return String.fromCharCode(t.which);
                                }
                                return null;

                              case "compositionend":
                                return zn && "ko" !== t.locale ? null : t.data;
                            }
                        }(e, n)) && 0 < (r = Rr(r, "onBeforeInput")).length && (u = new Cn("onBeforeInput", "beforeinput", null, n, u), 
                        i.push({
                            event: u,
                            listeners: r
                        }), u.data = b);
                    }
                    Br(i, t);
                }));
            }
            function Ir(e, t, n) {
                return {
                    instance: e,
                    listener: t,
                    currentTarget: n
                };
            }
            function Rr(e, t) {
                for (var n = t + "Capture", r = []; null !== e; ) {
                    var u = e, a = u.stateNode;
                    5 === u.tag && null !== a && (u = a, null != (a = ze(e, n)) && r.unshift(Ir(e, a, u)), 
                    null != (a = ze(e, t)) && r.push(Ir(e, a, u))), e = e.return;
                }
                return r;
            }
            function Pr(e) {
                if (null === e) return null;
                do {
                    e = e.return;
                } while (e && 5 !== e.tag);
                return e || null;
            }
            function jr(e, t, n, r, u) {
                for (var a = t._reactName, i = []; null !== n && n !== r; ) {
                    var o = n, l = o.alternate, s = o.stateNode;
                    if (null !== l && l === r) break;
                    5 === o.tag && null !== s && (o = s, u ? null != (l = ze(n, a)) && i.unshift(Ir(n, l, o)) : u || null != (l = ze(n, a)) && i.push(Ir(n, l, o))), 
                    n = n.return;
                }
                0 !== i.length && e.push({
                    event: t,
                    listeners: i
                });
            }
            function zr() {}
            var Ur = null, qr = null;
            function Hr(e, t) {
                switch (e) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    return !!t.autoFocus;
                }
                return !1;
            }
            function $r(e, t) {
                return "textarea" === e || "option" === e || "noscript" === e || "string" == typeof t.children || "number" == typeof t.children || "object" == typeof t.dangerouslySetInnerHTML && null !== t.dangerouslySetInnerHTML && null != t.dangerouslySetInnerHTML.__html;
            }
            var Kr = "function" == typeof setTimeout ? setTimeout : void 0, Vr = "function" == typeof clearTimeout ? clearTimeout : void 0;
            function Gr(e) {
                (1 === e.nodeType || 9 === e.nodeType && null != (e = e.body)) && (e.textContent = "");
            }
            function Wr(e) {
                for (;null != e; e = e.nextSibling) {
                    var t = e.nodeType;
                    if (1 === t || 3 === t) break;
                }
                return e;
            }
            function Qr(e) {
                e = e.previousSibling;
                for (var t = 0; e; ) {
                    if (8 === e.nodeType) {
                        var n = e.data;
                        if ("$" === n || "$!" === n || "$?" === n) {
                            if (0 === t) return e;
                            t--;
                        } else "/$" === n && t++;
                    }
                    e = e.previousSibling;
                }
                return null;
            }
            var Zr = 0, Xr = Math.random().toString(36).slice(2), Yr = "__reactFiber$" + Xr, Jr = "__reactProps$" + Xr, eu = "__reactContainer$" + Xr, tu = "__reactEvents$" + Xr;
            function nu(e) {
                var t = e[Yr];
                if (t) return t;
                for (var n = e.parentNode; n; ) {
                    if (t = n[eu] || n[Yr]) {
                        if (n = t.alternate, null !== t.child || null !== n && null !== n.child) for (e = Qr(e); null !== e; ) {
                            if (n = e[Yr]) return n;
                            e = Qr(e);
                        }
                        return t;
                    }
                    n = (e = n).parentNode;
                }
                return null;
            }
            function ru(e) {
                return !(e = e[Yr] || e[eu]) || 5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag ? null : e;
            }
            function uu(e) {
                if (5 === e.tag || 6 === e.tag) return e.stateNode;
                throw Error(i(33));
            }
            function au(e) {
                return e[Jr] || null;
            }
            function iu(e) {
                var t = e[tu];
                return void 0 === t && (t = e[tu] = new Set), t;
            }
            var ou = [], lu = -1;
            function su(e) {
                return {
                    current: e
                };
            }
            function cu(e) {
                0 > lu || (e.current = ou[lu], ou[lu] = null, lu--);
            }
            function du(e, t) {
                lu++, ou[lu] = e.current, e.current = t;
            }
            var pu = {}, fu = su(pu), Du = su(!1), gu = pu;
            function hu(e, t) {
                var n = e.type.contextTypes;
                if (!n) return pu;
                var r = e.stateNode;
                if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
                var u, a = {};
                for (u in n) a[u] = t[u];
                return r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t, 
                e.__reactInternalMemoizedMaskedChildContext = a), a;
            }
            function mu(e) {
                return null != e.childContextTypes;
            }
            function bu() {
                cu(Du), cu(fu);
            }
            function vu(e, t, n) {
                if (fu.current !== pu) throw Error(i(168));
                du(fu, t), du(Du, n);
            }
            function Eu(e, t, n) {
                var r = e.stateNode;
                if (e = t.childContextTypes, "function" != typeof r.getChildContext) return n;
                for (var a in r = r.getChildContext()) if (!(a in e)) throw Error(i(108, G(t) || "Unknown", a));
                return u({}, n, r);
            }
            function yu(e) {
                return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || pu, 
                gu = fu.current, du(fu, e), du(Du, Du.current), !0;
            }
            function _u(e, t, n) {
                var r = e.stateNode;
                if (!r) throw Error(i(169));
                n ? (e = Eu(e, t, gu), r.__reactInternalMemoizedMergedChildContext = e, cu(Du), 
                cu(fu), du(fu, e)) : cu(Du), du(Du, n);
            }
            var Cu = null, Fu = null, Au = a.unstable_runWithPriority, xu = a.unstable_scheduleCallback, wu = a.unstable_cancelCallback, ku = a.unstable_shouldYield, Bu = a.unstable_requestPaint, Su = a.unstable_now, Nu = a.unstable_getCurrentPriorityLevel, Ou = a.unstable_ImmediatePriority, Tu = a.unstable_UserBlockingPriority, Mu = a.unstable_NormalPriority, Lu = a.unstable_LowPriority, Iu = a.unstable_IdlePriority, Ru = {}, Pu = void 0 !== Bu ? Bu : function() {}, ju = null, zu = null, Uu = !1, qu = Su(), Hu = 1e4 > qu ? Su : function() {
                return Su() - qu;
            };
            function $u() {
                switch (Nu()) {
                  case Ou:
                    return 99;

                  case Tu:
                    return 98;

                  case Mu:
                    return 97;

                  case Lu:
                    return 96;

                  case Iu:
                    return 95;

                  default:
                    throw Error(i(332));
                }
            }
            function Ku(e) {
                switch (e) {
                  case 99:
                    return Ou;

                  case 98:
                    return Tu;

                  case 97:
                    return Mu;

                  case 96:
                    return Lu;

                  case 95:
                    return Iu;

                  default:
                    throw Error(i(332));
                }
            }
            function Vu(e, t) {
                return e = Ku(e), Au(e, t);
            }
            function Gu(e, t, n) {
                return e = Ku(e), xu(e, t, n);
            }
            function Wu() {
                if (null !== zu) {
                    var e = zu;
                    zu = null, wu(e);
                }
                Qu();
            }
            function Qu() {
                if (!Uu && null !== ju) {
                    Uu = !0;
                    var e = 0;
                    try {
                        var t = ju;
                        Vu(99, (function() {
                            for (;e < t.length; e++) {
                                var n = t[e];
                                do {
                                    n = n(!0);
                                } while (null !== n);
                            }
                        })), ju = null;
                    } catch (t) {
                        throw null !== ju && (ju = ju.slice(e + 1)), xu(Ou, Wu), t;
                    } finally {
                        Uu = !1;
                    }
                }
            }
            var Zu = y.ReactCurrentBatchConfig;
            function Xu(e, t) {
                if (e && e.defaultProps) {
                    for (var n in t = u({}, t), e = e.defaultProps) void 0 === t[n] && (t[n] = e[n]);
                    return t;
                }
                return t;
            }
            var Yu = su(null), Ju = null, ea = null, ta = null;
            function na() {
                ta = ea = Ju = null;
            }
            function ra(e) {
                var t = Yu.current;
                cu(Yu), e.type._context._currentValue = t;
            }
            function ua(e, t) {
                for (;null !== e; ) {
                    var n = e.alternate;
                    if ((e.childLanes & t) === t) {
                        if (null === n || (n.childLanes & t) === t) break;
                        n.childLanes |= t;
                    } else e.childLanes |= t, null !== n && (n.childLanes |= t);
                    e = e.return;
                }
            }
            function aa(e, t) {
                Ju = e, ta = ea = null, null !== (e = e.dependencies) && null !== e.firstContext && (0 != (e.lanes & t) && (Ii = !0), 
                e.firstContext = null);
            }
            function ia(e, t) {
                if (ta !== e && !1 !== t && 0 !== t) if ("number" == typeof t && 1073741823 !== t || (ta = e, 
                t = 1073741823), t = {
                    context: e,
                    observedBits: t,
                    next: null
                }, null === ea) {
                    if (null === Ju) throw Error(i(308));
                    ea = t, Ju.dependencies = {
                        lanes: 0,
                        firstContext: t,
                        responders: null
                    };
                } else ea = ea.next = t;
                return e._currentValue;
            }
            var oa = !1;
            function la(e) {
                e.updateQueue = {
                    baseState: e.memoizedState,
                    firstBaseUpdate: null,
                    lastBaseUpdate: null,
                    shared: {
                        pending: null
                    },
                    effects: null
                };
            }
            function sa(e, t) {
                e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
                    baseState: e.baseState,
                    firstBaseUpdate: e.firstBaseUpdate,
                    lastBaseUpdate: e.lastBaseUpdate,
                    shared: e.shared,
                    effects: e.effects
                });
            }
            function ca(e, t) {
                return {
                    eventTime: e,
                    lane: t,
                    tag: 0,
                    payload: null,
                    callback: null,
                    next: null
                };
            }
            function da(e, t) {
                if (null !== (e = e.updateQueue)) {
                    var n = (e = e.shared).pending;
                    null === n ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
                }
            }
            function pa(e, t) {
                var n = e.updateQueue, r = e.alternate;
                if (null !== r && n === (r = r.updateQueue)) {
                    var u = null, a = null;
                    if (null !== (n = n.firstBaseUpdate)) {
                        do {
                            var i = {
                                eventTime: n.eventTime,
                                lane: n.lane,
                                tag: n.tag,
                                payload: n.payload,
                                callback: n.callback,
                                next: null
                            };
                            null === a ? u = a = i : a = a.next = i, n = n.next;
                        } while (null !== n);
                        null === a ? u = a = t : a = a.next = t;
                    } else u = a = t;
                    return n = {
                        baseState: r.baseState,
                        firstBaseUpdate: u,
                        lastBaseUpdate: a,
                        shared: r.shared,
                        effects: r.effects
                    }, void (e.updateQueue = n);
                }
                null === (e = n.lastBaseUpdate) ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
            }
            function fa(e, t, n, r) {
                var a = e.updateQueue;
                oa = !1;
                var i = a.firstBaseUpdate, o = a.lastBaseUpdate, l = a.shared.pending;
                if (null !== l) {
                    a.shared.pending = null;
                    var s = l, c = s.next;
                    s.next = null, null === o ? i = c : o.next = c, o = s;
                    var d = e.alternate;
                    if (null !== d) {
                        var p = (d = d.updateQueue).lastBaseUpdate;
                        p !== o && (null === p ? d.firstBaseUpdate = c : p.next = c, d.lastBaseUpdate = s);
                    }
                }
                if (null !== i) {
                    for (p = a.baseState, o = 0, d = c = s = null; ;) {
                        l = i.lane;
                        var f = i.eventTime;
                        if ((r & l) === l) {
                            null !== d && (d = d.next = {
                                eventTime: f,
                                lane: 0,
                                tag: i.tag,
                                payload: i.payload,
                                callback: i.callback,
                                next: null
                            });
                            e: {
                                var D = e, g = i;
                                switch (l = t, f = n, g.tag) {
                                  case 1:
                                    if ("function" == typeof (D = g.payload)) {
                                        p = D.call(f, p, l);
                                        break e;
                                    }
                                    p = D;
                                    break e;

                                  case 3:
                                    D.flags = -4097 & D.flags | 64;

                                  case 0:
                                    if (null == (l = "function" == typeof (D = g.payload) ? D.call(f, p, l) : D)) break e;
                                    p = u({}, p, l);
                                    break e;

                                  case 2:
                                    oa = !0;
                                }
                            }
                            null !== i.callback && (e.flags |= 32, null === (l = a.effects) ? a.effects = [ i ] : l.push(i));
                        } else f = {
                            eventTime: f,
                            lane: l,
                            tag: i.tag,
                            payload: i.payload,
                            callback: i.callback,
                            next: null
                        }, null === d ? (c = d = f, s = p) : d = d.next = f, o |= l;
                        if (null === (i = i.next)) {
                            if (null === (l = a.shared.pending)) break;
                            i = l.next, l.next = null, a.lastBaseUpdate = l, a.shared.pending = null;
                        }
                    }
                    null === d && (s = p), a.baseState = s, a.firstBaseUpdate = c, a.lastBaseUpdate = d, 
                    zo |= o, e.lanes = o, e.memoizedState = p;
                }
            }
            function Da(e, t, n) {
                if (e = t.effects, t.effects = null, null !== e) for (t = 0; t < e.length; t++) {
                    var r = e[t], u = r.callback;
                    if (null !== u) {
                        if (r.callback = null, r = n, "function" != typeof u) throw Error(i(191, u));
                        u.call(r);
                    }
                }
            }
            var ga = (new r.Component).refs;
            function ha(e, t, n, r) {
                n = null == (n = n(r, t = e.memoizedState)) ? t : u({}, t, n), e.memoizedState = n, 
                0 === e.lanes && (e.updateQueue.baseState = n);
            }
            var ma = {
                isMounted: function(e) {
                    return !!(e = e._reactInternals) && Ze(e) === e;
                },
                enqueueSetState: function(e, t, n) {
                    e = e._reactInternals;
                    var r = dl(), u = pl(e), a = ca(r, u);
                    a.payload = t, null != n && (a.callback = n), da(e, a), fl(e, u, r);
                },
                enqueueReplaceState: function(e, t, n) {
                    e = e._reactInternals;
                    var r = dl(), u = pl(e), a = ca(r, u);
                    a.tag = 1, a.payload = t, null != n && (a.callback = n), da(e, a), fl(e, u, r);
                },
                enqueueForceUpdate: function(e, t) {
                    e = e._reactInternals;
                    var n = dl(), r = pl(e), u = ca(n, r);
                    u.tag = 2, null != t && (u.callback = t), da(e, u), fl(e, r, n);
                }
            };
            function ba(e, t, n, r, u, a, i) {
                return "function" == typeof (e = e.stateNode).shouldComponentUpdate ? e.shouldComponentUpdate(r, a, i) : !(t.prototype && t.prototype.isPureReactComponent && pr(n, r) && pr(u, a));
            }
            function va(e, t, n) {
                var r = !1, u = pu, a = t.contextType;
                return "object" == typeof a && null !== a ? a = ia(a) : (u = mu(t) ? gu : fu.current, 
                a = (r = null != (r = t.contextTypes)) ? hu(e, u) : pu), t = new t(n, a), e.memoizedState = null !== t.state && void 0 !== t.state ? t.state : null, 
                t.updater = ma, e.stateNode = t, t._reactInternals = e, r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = u, 
                e.__reactInternalMemoizedMaskedChildContext = a), t;
            }
            function Ea(e, t, n, r) {
                e = t.state, "function" == typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r), 
                "function" == typeof t.UNSAFE_componentWillReceiveProps && t.UNSAFE_componentWillReceiveProps(n, r), 
                t.state !== e && ma.enqueueReplaceState(t, t.state, null);
            }
            function ya(e, t, n, r) {
                var u = e.stateNode;
                u.props = n, u.state = e.memoizedState, u.refs = ga, la(e);
                var a = t.contextType;
                "object" == typeof a && null !== a ? u.context = ia(a) : (a = mu(t) ? gu : fu.current, 
                u.context = hu(e, a)), fa(e, n, u, r), u.state = e.memoizedState, "function" == typeof (a = t.getDerivedStateFromProps) && (ha(e, t, a, n), 
                u.state = e.memoizedState), "function" == typeof t.getDerivedStateFromProps || "function" == typeof u.getSnapshotBeforeUpdate || "function" != typeof u.UNSAFE_componentWillMount && "function" != typeof u.componentWillMount || (t = u.state, 
                "function" == typeof u.componentWillMount && u.componentWillMount(), "function" == typeof u.UNSAFE_componentWillMount && u.UNSAFE_componentWillMount(), 
                t !== u.state && ma.enqueueReplaceState(u, u.state, null), fa(e, n, u, r), u.state = e.memoizedState), 
                "function" == typeof u.componentDidMount && (e.flags |= 4);
            }
            var _a = Array.isArray;
            function Ca(e, t, n) {
                if (null !== (e = n.ref) && "function" != typeof e && "object" != typeof e) {
                    if (n._owner) {
                        if (n = n._owner) {
                            if (1 !== n.tag) throw Error(i(309));
                            var r = n.stateNode;
                        }
                        if (!r) throw Error(i(147, e));
                        var u = "" + e;
                        return null !== t && null !== t.ref && "function" == typeof t.ref && t.ref._stringRef === u ? t.ref : ((t = function(e) {
                            var t = r.refs;
                            t === ga && (t = r.refs = {}), null === e ? delete t[u] : t[u] = e;
                        })._stringRef = u, t);
                    }
                    if ("string" != typeof e) throw Error(i(284));
                    if (!n._owner) throw Error(i(290, e));
                }
                return e;
            }
            function Fa(e, t) {
                if ("textarea" !== e.type) throw Error(i(31, "[object Object]" === Object.prototype.toString.call(t) ? "object with keys {" + Object.keys(t).join(", ") + "}" : t));
            }
            function Aa(e) {
                function t(t, n) {
                    if (e) {
                        var r = t.lastEffect;
                        null !== r ? (r.nextEffect = n, t.lastEffect = n) : t.firstEffect = t.lastEffect = n, 
                        n.nextEffect = null, n.flags = 8;
                    }
                }
                function n(n, r) {
                    if (!e) return null;
                    for (;null !== r; ) t(n, r), r = r.sibling;
                    return null;
                }
                function r(e, t) {
                    for (e = new Map; null !== t; ) null !== t.key ? e.set(t.key, t) : e.set(t.index, t), 
                    t = t.sibling;
                    return e;
                }
                function u(e, t) {
                    return (e = Kl(e, t)).index = 0, e.sibling = null, e;
                }
                function a(t, n, r) {
                    return t.index = r, e ? null !== (r = t.alternate) ? (r = r.index) < n ? (t.flags = 2, 
                    n) : r : (t.flags = 2, n) : n;
                }
                function o(t) {
                    return e && null === t.alternate && (t.flags = 2), t;
                }
                function l(e, t, n, r) {
                    return null === t || 6 !== t.tag ? ((t = Ql(n, e.mode, r)).return = e, t) : ((t = u(t, n)).return = e, 
                    t);
                }
                function s(e, t, n, r) {
                    return null !== t && t.elementType === n.type ? ((r = u(t, n.props)).ref = Ca(e, t, n), 
                    r.return = e, r) : ((r = Vl(n.type, n.key, n.props, null, e.mode, r)).ref = Ca(e, t, n), 
                    r.return = e, r);
                }
                function c(e, t, n, r) {
                    return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? ((t = Zl(n, e.mode, r)).return = e, 
                    t) : ((t = u(t, n.children || [])).return = e, t);
                }
                function d(e, t, n, r, a) {
                    return null === t || 7 !== t.tag ? ((t = Gl(n, e.mode, r, a)).return = e, t) : ((t = u(t, n)).return = e, 
                    t);
                }
                function p(e, t, n) {
                    if ("string" == typeof t || "number" == typeof t) return (t = Ql("" + t, e.mode, n)).return = e, 
                    t;
                    if ("object" == typeof t && null !== t) {
                        switch (t.$$typeof) {
                          case _:
                            return (n = Vl(t.type, t.key, t.props, null, e.mode, n)).ref = Ca(e, null, t), n.return = e, 
                            n;

                          case C:
                            return (t = Zl(t, e.mode, n)).return = e, t;
                        }
                        if (_a(t) || q(t)) return (t = Gl(t, e.mode, n, null)).return = e, t;
                        Fa(e, t);
                    }
                    return null;
                }
                function f(e, t, n, r) {
                    var u = null !== t ? t.key : null;
                    if ("string" == typeof n || "number" == typeof n) return null !== u ? null : l(e, t, "" + n, r);
                    if ("object" == typeof n && null !== n) {
                        switch (n.$$typeof) {
                          case _:
                            return n.key === u ? n.type === F ? d(e, t, n.props.children, r, u) : s(e, t, n, r) : null;

                          case C:
                            return n.key === u ? c(e, t, n, r) : null;
                        }
                        if (_a(n) || q(n)) return null !== u ? null : d(e, t, n, r, null);
                        Fa(e, n);
                    }
                    return null;
                }
                function D(e, t, n, r, u) {
                    if ("string" == typeof r || "number" == typeof r) return l(t, e = e.get(n) || null, "" + r, u);
                    if ("object" == typeof r && null !== r) {
                        switch (r.$$typeof) {
                          case _:
                            return e = e.get(null === r.key ? n : r.key) || null, r.type === F ? d(t, e, r.props.children, u, r.key) : s(t, e, r, u);

                          case C:
                            return c(t, e = e.get(null === r.key ? n : r.key) || null, r, u);
                        }
                        if (_a(r) || q(r)) return d(t, e = e.get(n) || null, r, u, null);
                        Fa(t, r);
                    }
                    return null;
                }
                function g(u, i, o, l) {
                    for (var s = null, c = null, d = i, g = i = 0, h = null; null !== d && g < o.length; g++) {
                        d.index > g ? (h = d, d = null) : h = d.sibling;
                        var m = f(u, d, o[g], l);
                        if (null === m) {
                            null === d && (d = h);
                            break;
                        }
                        e && d && null === m.alternate && t(u, d), i = a(m, i, g), null === c ? s = m : c.sibling = m, 
                        c = m, d = h;
                    }
                    if (g === o.length) return n(u, d), s;
                    if (null === d) {
                        for (;g < o.length; g++) null !== (d = p(u, o[g], l)) && (i = a(d, i, g), null === c ? s = d : c.sibling = d, 
                        c = d);
                        return s;
                    }
                    for (d = r(u, d); g < o.length; g++) null !== (h = D(d, u, g, o[g], l)) && (e && null !== h.alternate && d.delete(null === h.key ? g : h.key), 
                    i = a(h, i, g), null === c ? s = h : c.sibling = h, c = h);
                    return e && d.forEach((function(e) {
                        return t(u, e);
                    })), s;
                }
                function h(u, o, l, s) {
                    var c = q(l);
                    if ("function" != typeof c) throw Error(i(150));
                    if (null == (l = c.call(l))) throw Error(i(151));
                    for (var d = c = null, g = o, h = o = 0, m = null, b = l.next(); null !== g && !b.done; h++, 
                    b = l.next()) {
                        g.index > h ? (m = g, g = null) : m = g.sibling;
                        var v = f(u, g, b.value, s);
                        if (null === v) {
                            null === g && (g = m);
                            break;
                        }
                        e && g && null === v.alternate && t(u, g), o = a(v, o, h), null === d ? c = v : d.sibling = v, 
                        d = v, g = m;
                    }
                    if (b.done) return n(u, g), c;
                    if (null === g) {
                        for (;!b.done; h++, b = l.next()) null !== (b = p(u, b.value, s)) && (o = a(b, o, h), 
                        null === d ? c = b : d.sibling = b, d = b);
                        return c;
                    }
                    for (g = r(u, g); !b.done; h++, b = l.next()) null !== (b = D(g, u, h, b.value, s)) && (e && null !== b.alternate && g.delete(null === b.key ? h : b.key), 
                    o = a(b, o, h), null === d ? c = b : d.sibling = b, d = b);
                    return e && g.forEach((function(e) {
                        return t(u, e);
                    })), c;
                }
                return function(e, r, a, l) {
                    var s = "object" == typeof a && null !== a && a.type === F && null === a.key;
                    s && (a = a.props.children);
                    var c = "object" == typeof a && null !== a;
                    if (c) switch (a.$$typeof) {
                      case _:
                        e: {
                            for (c = a.key, s = r; null !== s; ) {
                                if (s.key === c) {
                                    if (7 === s.tag) {
                                        if (a.type === F) {
                                            n(e, s.sibling), (r = u(s, a.props.children)).return = e, e = r;
                                            break e;
                                        }
                                    } else if (s.elementType === a.type) {
                                        n(e, s.sibling), (r = u(s, a.props)).ref = Ca(e, s, a), r.return = e, e = r;
                                        break e;
                                    }
                                    n(e, s);
                                    break;
                                }
                                t(e, s), s = s.sibling;
                            }
                            a.type === F ? ((r = Gl(a.props.children, e.mode, l, a.key)).return = e, e = r) : ((l = Vl(a.type, a.key, a.props, null, e.mode, l)).ref = Ca(e, r, a), 
                            l.return = e, e = l);
                        }
                        return o(e);

                      case C:
                        e: {
                            for (s = a.key; null !== r; ) {
                                if (r.key === s) {
                                    if (4 === r.tag && r.stateNode.containerInfo === a.containerInfo && r.stateNode.implementation === a.implementation) {
                                        n(e, r.sibling), (r = u(r, a.children || [])).return = e, e = r;
                                        break e;
                                    }
                                    n(e, r);
                                    break;
                                }
                                t(e, r), r = r.sibling;
                            }
                            (r = Zl(a, e.mode, l)).return = e, e = r;
                        }
                        return o(e);
                    }
                    if ("string" == typeof a || "number" == typeof a) return a = "" + a, null !== r && 6 === r.tag ? (n(e, r.sibling), 
                    (r = u(r, a)).return = e, e = r) : (n(e, r), (r = Ql(a, e.mode, l)).return = e, 
                    e = r), o(e);
                    if (_a(a)) return g(e, r, a, l);
                    if (q(a)) return h(e, r, a, l);
                    if (c && Fa(e, a), void 0 === a && !s) switch (e.tag) {
                      case 1:
                      case 22:
                      case 0:
                      case 11:
                      case 15:
                        throw Error(i(152, G(e.type) || "Component"));
                    }
                    return n(e, r);
                };
            }
            var xa = Aa(!0), wa = Aa(!1), ka = {}, Ba = su(ka), Sa = su(ka), Na = su(ka);
            function Oa(e) {
                if (e === ka) throw Error(i(174));
                return e;
            }
            function Ta(e, t) {
                switch (du(Na, t), du(Sa, e), du(Ba, ka), e = t.nodeType) {
                  case 9:
                  case 11:
                    t = (t = t.documentElement) ? t.namespaceURI : De(null, "");
                    break;

                  default:
                    t = De(t = (e = 8 === e ? t.parentNode : t).namespaceURI || null, e = e.tagName);
                }
                cu(Ba), du(Ba, t);
            }
            function Ma() {
                cu(Ba), cu(Sa), cu(Na);
            }
            function La(e) {
                Oa(Na.current);
                var t = Oa(Ba.current), n = De(t, e.type);
                t !== n && (du(Sa, e), du(Ba, n));
            }
            function Ia(e) {
                Sa.current === e && (cu(Ba), cu(Sa));
            }
            var Ra = su(0);
            function Pa(e) {
                for (var t = e; null !== t; ) {
                    if (13 === t.tag) {
                        var n = t.memoizedState;
                        if (null !== n && (null === (n = n.dehydrated) || "$?" === n.data || "$!" === n.data)) return t;
                    } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
                        if (0 != (64 & t.flags)) return t;
                    } else if (null !== t.child) {
                        t.child.return = t, t = t.child;
                        continue;
                    }
                    if (t === e) break;
                    for (;null === t.sibling; ) {
                        if (null === t.return || t.return === e) return null;
                        t = t.return;
                    }
                    t.sibling.return = t.return, t = t.sibling;
                }
                return null;
            }
            var ja = null, za = null, Ua = !1;
            function qa(e, t) {
                var n = Hl(5, null, null, 0);
                n.elementType = "DELETED", n.type = "DELETED", n.stateNode = t, n.return = e, n.flags = 8, 
                null !== e.lastEffect ? (e.lastEffect.nextEffect = n, e.lastEffect = n) : e.firstEffect = e.lastEffect = n;
            }
            function Ha(e, t) {
                switch (e.tag) {
                  case 5:
                    var n = e.type;
                    return null !== (t = 1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t) && (e.stateNode = t, 
                    !0);

                  case 6:
                    return null !== (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) && (e.stateNode = t, 
                    !0);

                  default:
                    return !1;
                }
            }
            function $a(e) {
                if (Ua) {
                    var t = za;
                    if (t) {
                        var n = t;
                        if (!Ha(e, t)) {
                            if (!(t = Wr(n.nextSibling)) || !Ha(e, t)) return e.flags = -1025 & e.flags | 2, 
                            Ua = !1, void (ja = e);
                            qa(ja, n);
                        }
                        ja = e, za = Wr(t.firstChild);
                    } else e.flags = -1025 & e.flags | 2, Ua = !1, ja = e;
                }
            }
            function Ka(e) {
                for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag; ) e = e.return;
                ja = e;
            }
            function Va(e) {
                if (e !== ja) return !1;
                if (!Ua) return Ka(e), Ua = !0, !1;
                var t = e.type;
                if (5 !== e.tag || "head" !== t && "body" !== t && !$r(t, e.memoizedProps)) for (t = za; t; ) qa(e, t), 
                t = Wr(t.nextSibling);
                if (Ka(e), 13 === e.tag) {
                    if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null)) throw Error(i(317));
                    e: {
                        for (e = e.nextSibling, t = 0; e; ) {
                            if (8 === e.nodeType) {
                                var n = e.data;
                                if ("/$" === n) {
                                    if (0 === t) {
                                        za = Wr(e.nextSibling);
                                        break e;
                                    }
                                    t--;
                                } else "$" !== n && "$!" !== n && "$?" !== n || t++;
                            }
                            e = e.nextSibling;
                        }
                        za = null;
                    }
                } else za = ja ? Wr(e.stateNode.nextSibling) : null;
                return !0;
            }
            function Ga() {
                za = ja = null, Ua = !1;
            }
            var Wa = [];
            function Qa() {
                for (var e = 0; e < Wa.length; e++) Wa[e]._workInProgressVersionPrimary = null;
                Wa.length = 0;
            }
            var Za = y.ReactCurrentDispatcher, Xa = y.ReactCurrentBatchConfig, Ya = 0, Ja = null, ei = null, ti = null, ni = !1, ri = !1;
            function ui() {
                throw Error(i(321));
            }
            function ai(e, t) {
                if (null === t) return !1;
                for (var n = 0; n < t.length && n < e.length; n++) if (!cr(e[n], t[n])) return !1;
                return !0;
            }
            function ii(e, t, n, r, u, a) {
                if (Ya = a, Ja = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Za.current = null === e || null === e.memoizedState ? Oi : Ti, 
                e = n(r, u), ri) {
                    a = 0;
                    do {
                        if (ri = !1, !(25 > a)) throw Error(i(301));
                        a += 1, ti = ei = null, t.updateQueue = null, Za.current = Mi, e = n(r, u);
                    } while (ri);
                }
                if (Za.current = Ni, t = null !== ei && null !== ei.next, Ya = 0, ti = ei = Ja = null, 
                ni = !1, t) throw Error(i(300));
                return e;
            }
            function oi() {
                var e = {
                    memoizedState: null,
                    baseState: null,
                    baseQueue: null,
                    queue: null,
                    next: null
                };
                return null === ti ? Ja.memoizedState = ti = e : ti = ti.next = e, ti;
            }
            function li() {
                if (null === ei) {
                    var e = Ja.alternate;
                    e = null !== e ? e.memoizedState : null;
                } else e = ei.next;
                var t = null === ti ? Ja.memoizedState : ti.next;
                if (null !== t) ti = t, ei = e; else {
                    if (null === e) throw Error(i(310));
                    e = {
                        memoizedState: (ei = e).memoizedState,
                        baseState: ei.baseState,
                        baseQueue: ei.baseQueue,
                        queue: ei.queue,
                        next: null
                    }, null === ti ? Ja.memoizedState = ti = e : ti = ti.next = e;
                }
                return ti;
            }
            function si(e, t) {
                return "function" == typeof t ? t(e) : t;
            }
            function ci(e) {
                var t = li(), n = t.queue;
                if (null === n) throw Error(i(311));
                n.lastRenderedReducer = e;
                var r = ei, u = r.baseQueue, a = n.pending;
                if (null !== a) {
                    if (null !== u) {
                        var o = u.next;
                        u.next = a.next, a.next = o;
                    }
                    r.baseQueue = u = a, n.pending = null;
                }
                if (null !== u) {
                    u = u.next, r = r.baseState;
                    var l = o = a = null, s = u;
                    do {
                        var c = s.lane;
                        if ((Ya & c) === c) null !== l && (l = l.next = {
                            lane: 0,
                            action: s.action,
                            eagerReducer: s.eagerReducer,
                            eagerState: s.eagerState,
                            next: null
                        }), r = s.eagerReducer === e ? s.eagerState : e(r, s.action); else {
                            var d = {
                                lane: c,
                                action: s.action,
                                eagerReducer: s.eagerReducer,
                                eagerState: s.eagerState,
                                next: null
                            };
                            null === l ? (o = l = d, a = r) : l = l.next = d, Ja.lanes |= c, zo |= c;
                        }
                        s = s.next;
                    } while (null !== s && s !== u);
                    null === l ? a = r : l.next = o, cr(r, t.memoizedState) || (Ii = !0), t.memoizedState = r, 
                    t.baseState = a, t.baseQueue = l, n.lastRenderedState = r;
                }
                return [ t.memoizedState, n.dispatch ];
            }
            function di(e) {
                var t = li(), n = t.queue;
                if (null === n) throw Error(i(311));
                n.lastRenderedReducer = e;
                var r = n.dispatch, u = n.pending, a = t.memoizedState;
                if (null !== u) {
                    n.pending = null;
                    var o = u = u.next;
                    do {
                        a = e(a, o.action), o = o.next;
                    } while (o !== u);
                    cr(a, t.memoizedState) || (Ii = !0), t.memoizedState = a, null === t.baseQueue && (t.baseState = a), 
                    n.lastRenderedState = a;
                }
                return [ a, r ];
            }
            function pi(e, t, n) {
                var r = t._getVersion;
                r = r(t._source);
                var u = t._workInProgressVersionPrimary;
                if (null !== u ? e = u === r : (e = e.mutableReadLanes, (e = (Ya & e) === e) && (t._workInProgressVersionPrimary = r, 
                Wa.push(t))), e) return n(t._source);
                throw Wa.push(t), Error(i(350));
            }
            function fi(e, t, n, r) {
                var u = Oo;
                if (null === u) throw Error(i(349));
                var a = t._getVersion, o = a(t._source), l = Za.current, s = l.useState((function() {
                    return pi(u, t, n);
                })), c = s[1], d = s[0];
                s = ti;
                var p = e.memoizedState, f = p.refs, D = f.getSnapshot, g = p.source;
                p = p.subscribe;
                var h = Ja;
                return e.memoizedState = {
                    refs: f,
                    source: t,
                    subscribe: r
                }, l.useEffect((function() {
                    f.getSnapshot = n, f.setSnapshot = c;
                    var e = a(t._source);
                    if (!cr(o, e)) {
                        e = n(t._source), cr(d, e) || (c(e), e = pl(h), u.mutableReadLanes |= e & u.pendingLanes), 
                        e = u.mutableReadLanes, u.entangledLanes |= e;
                        for (var r = u.entanglements, i = e; 0 < i; ) {
                            var l = 31 - $t(i), s = 1 << l;
                            r[l] |= e, i &= ~s;
                        }
                    }
                }), [ n, t, r ]), l.useEffect((function() {
                    return r(t._source, (function() {
                        var e = f.getSnapshot, n = f.setSnapshot;
                        try {
                            n(e(t._source));
                            var r = pl(h);
                            u.mutableReadLanes |= r & u.pendingLanes;
                        } catch (e) {
                            n((function() {
                                throw e;
                            }));
                        }
                    }));
                }), [ t, r ]), cr(D, n) && cr(g, t) && cr(p, r) || ((e = {
                    pending: null,
                    dispatch: null,
                    lastRenderedReducer: si,
                    lastRenderedState: d
                }).dispatch = c = Si.bind(null, Ja, e), s.queue = e, s.baseQueue = null, d = pi(u, t, n), 
                s.memoizedState = s.baseState = d), d;
            }
            function Di(e, t, n) {
                return fi(li(), e, t, n);
            }
            function gi(e) {
                var t = oi();
                return "function" == typeof e && (e = e()), t.memoizedState = t.baseState = e, e = (e = t.queue = {
                    pending: null,
                    dispatch: null,
                    lastRenderedReducer: si,
                    lastRenderedState: e
                }).dispatch = Si.bind(null, Ja, e), [ t.memoizedState, e ];
            }
            function hi(e, t, n, r) {
                return e = {
                    tag: e,
                    create: t,
                    destroy: n,
                    deps: r,
                    next: null
                }, null === (t = Ja.updateQueue) ? (t = {
                    lastEffect: null
                }, Ja.updateQueue = t, t.lastEffect = e.next = e) : null === (n = t.lastEffect) ? t.lastEffect = e.next = e : (r = n.next, 
                n.next = e, e.next = r, t.lastEffect = e), e;
            }
            function mi(e) {
                return e = {
                    current: e
                }, oi().memoizedState = e;
            }
            function bi() {
                return li().memoizedState;
            }
            function vi(e, t, n, r) {
                var u = oi();
                Ja.flags |= e, u.memoizedState = hi(1 | t, n, void 0, void 0 === r ? null : r);
            }
            function Ei(e, t, n, r) {
                var u = li();
                r = void 0 === r ? null : r;
                var a = void 0;
                if (null !== ei) {
                    var i = ei.memoizedState;
                    if (a = i.destroy, null !== r && ai(r, i.deps)) return void hi(t, n, a, r);
                }
                Ja.flags |= e, u.memoizedState = hi(1 | t, n, a, r);
            }
            function yi(e, t) {
                return vi(516, 4, e, t);
            }
            function _i(e, t) {
                return Ei(516, 4, e, t);
            }
            function Ci(e, t) {
                return Ei(4, 2, e, t);
            }
            function Fi(e, t) {
                return "function" == typeof t ? (e = e(), t(e), function() {
                    t(null);
                }) : null != t ? (e = e(), t.current = e, function() {
                    t.current = null;
                }) : void 0;
            }
            function Ai(e, t, n) {
                return n = null != n ? n.concat([ e ]) : null, Ei(4, 2, Fi.bind(null, t, e), n);
            }
            function xi() {}
            function wi(e, t) {
                var n = li();
                t = void 0 === t ? null : t;
                var r = n.memoizedState;
                return null !== r && null !== t && ai(t, r[1]) ? r[0] : (n.memoizedState = [ e, t ], 
                e);
            }
            function ki(e, t) {
                var n = li();
                t = void 0 === t ? null : t;
                var r = n.memoizedState;
                return null !== r && null !== t && ai(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [ e, t ], 
                e);
            }
            function Bi(e, t) {
                var n = $u();
                Vu(98 > n ? 98 : n, (function() {
                    e(!0);
                })), Vu(97 < n ? 97 : n, (function() {
                    var n = Xa.transition;
                    Xa.transition = 1;
                    try {
                        e(!1), t();
                    } finally {
                        Xa.transition = n;
                    }
                }));
            }
            function Si(e, t, n) {
                var r = dl(), u = pl(e), a = {
                    lane: u,
                    action: n,
                    eagerReducer: null,
                    eagerState: null,
                    next: null
                }, i = t.pending;
                if (null === i ? a.next = a : (a.next = i.next, i.next = a), t.pending = a, i = e.alternate, 
                e === Ja || null !== i && i === Ja) ri = ni = !0; else {
                    if (0 === e.lanes && (null === i || 0 === i.lanes) && null !== (i = t.lastRenderedReducer)) try {
                        var o = t.lastRenderedState, l = i(o, n);
                        if (a.eagerReducer = i, a.eagerState = l, cr(l, o)) return;
                    } catch (e) {}
                    fl(e, u, r);
                }
            }
            var Ni = {
                readContext: ia,
                useCallback: ui,
                useContext: ui,
                useEffect: ui,
                useImperativeHandle: ui,
                useLayoutEffect: ui,
                useMemo: ui,
                useReducer: ui,
                useRef: ui,
                useState: ui,
                useDebugValue: ui,
                useDeferredValue: ui,
                useTransition: ui,
                useMutableSource: ui,
                useOpaqueIdentifier: ui,
                unstable_isNewReconciler: !1
            }, Oi = {
                readContext: ia,
                useCallback: function(e, t) {
                    return oi().memoizedState = [ e, void 0 === t ? null : t ], e;
                },
                useContext: ia,
                useEffect: yi,
                useImperativeHandle: function(e, t, n) {
                    return n = null != n ? n.concat([ e ]) : null, vi(4, 2, Fi.bind(null, t, e), n);
                },
                useLayoutEffect: function(e, t) {
                    return vi(4, 2, e, t);
                },
                useMemo: function(e, t) {
                    var n = oi();
                    return t = void 0 === t ? null : t, e = e(), n.memoizedState = [ e, t ], e;
                },
                useReducer: function(e, t, n) {
                    var r = oi();
                    return t = void 0 !== n ? n(t) : t, r.memoizedState = r.baseState = t, e = (e = r.queue = {
                        pending: null,
                        dispatch: null,
                        lastRenderedReducer: e,
                        lastRenderedState: t
                    }).dispatch = Si.bind(null, Ja, e), [ r.memoizedState, e ];
                },
                useRef: mi,
                useState: gi,
                useDebugValue: xi,
                useDeferredValue: function(e) {
                    var t = gi(e), n = t[0], r = t[1];
                    return yi((function() {
                        var t = Xa.transition;
                        Xa.transition = 1;
                        try {
                            r(e);
                        } finally {
                            Xa.transition = t;
                        }
                    }), [ e ]), n;
                },
                useTransition: function() {
                    var e = gi(!1), t = e[0];
                    return mi(e = Bi.bind(null, e[1])), [ e, t ];
                },
                useMutableSource: function(e, t, n) {
                    var r = oi();
                    return r.memoizedState = {
                        refs: {
                            getSnapshot: t,
                            setSnapshot: null
                        },
                        source: e,
                        subscribe: n
                    }, fi(r, e, t, n);
                },
                useOpaqueIdentifier: function() {
                    if (Ua) {
                        var e = !1, t = function(e) {
                            return {
                                $$typeof: L,
                                toString: e,
                                valueOf: e
                            };
                        }((function() {
                            throw e || (e = !0, n("r:" + (Zr++).toString(36))), Error(i(355));
                        })), n = gi(t)[1];
                        return 0 == (2 & Ja.mode) && (Ja.flags |= 516, hi(5, (function() {
                            n("r:" + (Zr++).toString(36));
                        }), void 0, null)), t;
                    }
                    return gi(t = "r:" + (Zr++).toString(36)), t;
                },
                unstable_isNewReconciler: !1
            }, Ti = {
                readContext: ia,
                useCallback: wi,
                useContext: ia,
                useEffect: _i,
                useImperativeHandle: Ai,
                useLayoutEffect: Ci,
                useMemo: ki,
                useReducer: ci,
                useRef: bi,
                useState: function() {
                    return ci(si);
                },
                useDebugValue: xi,
                useDeferredValue: function(e) {
                    var t = ci(si), n = t[0], r = t[1];
                    return _i((function() {
                        var t = Xa.transition;
                        Xa.transition = 1;
                        try {
                            r(e);
                        } finally {
                            Xa.transition = t;
                        }
                    }), [ e ]), n;
                },
                useTransition: function() {
                    var e = ci(si)[0];
                    return [ bi().current, e ];
                },
                useMutableSource: Di,
                useOpaqueIdentifier: function() {
                    return ci(si)[0];
                },
                unstable_isNewReconciler: !1
            }, Mi = {
                readContext: ia,
                useCallback: wi,
                useContext: ia,
                useEffect: _i,
                useImperativeHandle: Ai,
                useLayoutEffect: Ci,
                useMemo: ki,
                useReducer: di,
                useRef: bi,
                useState: function() {
                    return di(si);
                },
                useDebugValue: xi,
                useDeferredValue: function(e) {
                    var t = di(si), n = t[0], r = t[1];
                    return _i((function() {
                        var t = Xa.transition;
                        Xa.transition = 1;
                        try {
                            r(e);
                        } finally {
                            Xa.transition = t;
                        }
                    }), [ e ]), n;
                },
                useTransition: function() {
                    var e = di(si)[0];
                    return [ bi().current, e ];
                },
                useMutableSource: Di,
                useOpaqueIdentifier: function() {
                    return di(si)[0];
                },
                unstable_isNewReconciler: !1
            }, Li = y.ReactCurrentOwner, Ii = !1;
            function Ri(e, t, n, r) {
                t.child = null === e ? wa(t, null, n, r) : xa(t, e.child, n, r);
            }
            function Pi(e, t, n, r, u) {
                n = n.render;
                var a = t.ref;
                return aa(t, u), r = ii(e, t, n, r, a, u), null === e || Ii ? (t.flags |= 1, Ri(e, t, r, u), 
                t.child) : (t.updateQueue = e.updateQueue, t.flags &= -517, e.lanes &= ~u, uo(e, t, u));
            }
            function ji(e, t, n, r, u, a) {
                if (null === e) {
                    var i = n.type;
                    return "function" != typeof i || $l(i) || void 0 !== i.defaultProps || null !== n.compare || void 0 !== n.defaultProps ? ((e = Vl(n.type, null, r, t, t.mode, a)).ref = t.ref, 
                    e.return = t, t.child = e) : (t.tag = 15, t.type = i, zi(e, t, i, r, u, a));
                }
                return i = e.child, 0 == (u & a) && (u = i.memoizedProps, (n = null !== (n = n.compare) ? n : pr)(u, r) && e.ref === t.ref) ? uo(e, t, a) : (t.flags |= 1, 
                (e = Kl(i, r)).ref = t.ref, e.return = t, t.child = e);
            }
            function zi(e, t, n, r, u, a) {
                if (null !== e && pr(e.memoizedProps, r) && e.ref === t.ref) {
                    if (Ii = !1, 0 == (a & u)) return t.lanes = e.lanes, uo(e, t, a);
                    0 != (16384 & e.flags) && (Ii = !0);
                }
                return Hi(e, t, n, r, a);
            }
            function Ui(e, t, n) {
                var r = t.pendingProps, u = r.children, a = null !== e ? e.memoizedState : null;
                if ("hidden" === r.mode || "unstable-defer-without-hiding" === r.mode) if (0 == (4 & t.mode)) t.memoizedState = {
                    baseLanes: 0
                }, yl(t, n); else {
                    if (0 == (1073741824 & n)) return e = null !== a ? a.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, 
                    t.memoizedState = {
                        baseLanes: e
                    }, yl(t, e), null;
                    t.memoizedState = {
                        baseLanes: 0
                    }, yl(t, null !== a ? a.baseLanes : n);
                } else null !== a ? (r = a.baseLanes | n, t.memoizedState = null) : r = n, yl(t, r);
                return Ri(e, t, u, n), t.child;
            }
            function qi(e, t) {
                var n = t.ref;
                (null === e && null !== n || null !== e && e.ref !== n) && (t.flags |= 128);
            }
            function Hi(e, t, n, r, u) {
                var a = mu(n) ? gu : fu.current;
                return a = hu(t, a), aa(t, u), n = ii(e, t, n, r, a, u), null === e || Ii ? (t.flags |= 1, 
                Ri(e, t, n, u), t.child) : (t.updateQueue = e.updateQueue, t.flags &= -517, e.lanes &= ~u, 
                uo(e, t, u));
            }
            function $i(e, t, n, r, u) {
                if (mu(n)) {
                    var a = !0;
                    yu(t);
                } else a = !1;
                if (aa(t, u), null === t.stateNode) null !== e && (e.alternate = null, t.alternate = null, 
                t.flags |= 2), va(t, n, r), ya(t, n, r, u), r = !0; else if (null === e) {
                    var i = t.stateNode, o = t.memoizedProps;
                    i.props = o;
                    var l = i.context, s = n.contextType;
                    s = "object" == typeof s && null !== s ? ia(s) : hu(t, s = mu(n) ? gu : fu.current);
                    var c = n.getDerivedStateFromProps, d = "function" == typeof c || "function" == typeof i.getSnapshotBeforeUpdate;
                    d || "function" != typeof i.UNSAFE_componentWillReceiveProps && "function" != typeof i.componentWillReceiveProps || (o !== r || l !== s) && Ea(t, i, r, s), 
                    oa = !1;
                    var p = t.memoizedState;
                    i.state = p, fa(t, r, i, u), l = t.memoizedState, o !== r || p !== l || Du.current || oa ? ("function" == typeof c && (ha(t, n, c, r), 
                    l = t.memoizedState), (o = oa || ba(t, n, o, r, p, l, s)) ? (d || "function" != typeof i.UNSAFE_componentWillMount && "function" != typeof i.componentWillMount || ("function" == typeof i.componentWillMount && i.componentWillMount(), 
                    "function" == typeof i.UNSAFE_componentWillMount && i.UNSAFE_componentWillMount()), 
                    "function" == typeof i.componentDidMount && (t.flags |= 4)) : ("function" == typeof i.componentDidMount && (t.flags |= 4), 
                    t.memoizedProps = r, t.memoizedState = l), i.props = r, i.state = l, i.context = s, 
                    r = o) : ("function" == typeof i.componentDidMount && (t.flags |= 4), r = !1);
                } else {
                    i = t.stateNode, sa(e, t), o = t.memoizedProps, s = t.type === t.elementType ? o : Xu(t.type, o), 
                    i.props = s, d = t.pendingProps, p = i.context, l = "object" == typeof (l = n.contextType) && null !== l ? ia(l) : hu(t, l = mu(n) ? gu : fu.current);
                    var f = n.getDerivedStateFromProps;
                    (c = "function" == typeof f || "function" == typeof i.getSnapshotBeforeUpdate) || "function" != typeof i.UNSAFE_componentWillReceiveProps && "function" != typeof i.componentWillReceiveProps || (o !== d || p !== l) && Ea(t, i, r, l), 
                    oa = !1, p = t.memoizedState, i.state = p, fa(t, r, i, u);
                    var D = t.memoizedState;
                    o !== d || p !== D || Du.current || oa ? ("function" == typeof f && (ha(t, n, f, r), 
                    D = t.memoizedState), (s = oa || ba(t, n, s, r, p, D, l)) ? (c || "function" != typeof i.UNSAFE_componentWillUpdate && "function" != typeof i.componentWillUpdate || ("function" == typeof i.componentWillUpdate && i.componentWillUpdate(r, D, l), 
                    "function" == typeof i.UNSAFE_componentWillUpdate && i.UNSAFE_componentWillUpdate(r, D, l)), 
                    "function" == typeof i.componentDidUpdate && (t.flags |= 4), "function" == typeof i.getSnapshotBeforeUpdate && (t.flags |= 256)) : ("function" != typeof i.componentDidUpdate || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), 
                    "function" != typeof i.getSnapshotBeforeUpdate || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 256), 
                    t.memoizedProps = r, t.memoizedState = D), i.props = r, i.state = D, i.context = l, 
                    r = s) : ("function" != typeof i.componentDidUpdate || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), 
                    "function" != typeof i.getSnapshotBeforeUpdate || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 256), 
                    r = !1);
                }
                return Ki(e, t, n, r, a, u);
            }
            function Ki(e, t, n, r, u, a) {
                qi(e, t);
                var i = 0 != (64 & t.flags);
                if (!r && !i) return u && _u(t, n, !1), uo(e, t, a);
                r = t.stateNode, Li.current = t;
                var o = i && "function" != typeof n.getDerivedStateFromError ? null : r.render();
                return t.flags |= 1, null !== e && i ? (t.child = xa(t, e.child, null, a), t.child = xa(t, null, o, a)) : Ri(e, t, o, a), 
                t.memoizedState = r.state, u && _u(t, n, !0), t.child;
            }
            function Vi(e) {
                var t = e.stateNode;
                t.pendingContext ? vu(0, t.pendingContext, t.pendingContext !== t.context) : t.context && vu(0, t.context, !1), 
                Ta(e, t.containerInfo);
            }
            var Gi, Wi, Qi, Zi = {
                dehydrated: null,
                retryLane: 0
            };
            function Xi(e, t, n) {
                var r, u = t.pendingProps, a = Ra.current, i = !1;
                return (r = 0 != (64 & t.flags)) || (r = (null === e || null !== e.memoizedState) && 0 != (2 & a)), 
                r ? (i = !0, t.flags &= -65) : null !== e && null === e.memoizedState || void 0 === u.fallback || !0 === u.unstable_avoidThisFallback || (a |= 1), 
                du(Ra, 1 & a), null === e ? (void 0 !== u.fallback && $a(t), e = u.children, a = u.fallback, 
                i ? (e = Yi(t, e, a, n), t.child.memoizedState = {
                    baseLanes: n
                }, t.memoizedState = Zi, e) : "number" == typeof u.unstable_expectedLoadTime ? (e = Yi(t, e, a, n), 
                t.child.memoizedState = {
                    baseLanes: n
                }, t.memoizedState = Zi, t.lanes = 33554432, e) : ((n = Wl({
                    mode: "visible",
                    children: e
                }, t.mode, n, null)).return = t, t.child = n)) : (e.memoizedState, i ? (u = function(e, t, n, r, u) {
                    var a = t.mode, i = e.child;
                    e = i.sibling;
                    var o = {
                        mode: "hidden",
                        children: n
                    };
                    return 0 == (2 & a) && t.child !== i ? ((n = t.child).childLanes = 0, n.pendingProps = o, 
                    null !== (i = n.lastEffect) ? (t.firstEffect = n.firstEffect, t.lastEffect = i, 
                    i.nextEffect = null) : t.firstEffect = t.lastEffect = null) : n = Kl(i, o), null !== e ? r = Kl(e, r) : (r = Gl(r, a, u, null)).flags |= 2, 
                    r.return = t, n.return = t, n.sibling = r, t.child = n, r;
                }(e, t, u.children, u.fallback, n), i = t.child, a = e.child.memoizedState, i.memoizedState = null === a ? {
                    baseLanes: n
                } : {
                    baseLanes: a.baseLanes | n
                }, i.childLanes = e.childLanes & ~n, t.memoizedState = Zi, u) : (n = function(e, t, n, r) {
                    var u = e.child;
                    return e = u.sibling, n = Kl(u, {
                        mode: "visible",
                        children: n
                    }), 0 == (2 & t.mode) && (n.lanes = r), n.return = t, n.sibling = null, null !== e && (e.nextEffect = null, 
                    e.flags = 8, t.firstEffect = t.lastEffect = e), t.child = n;
                }(e, t, u.children, n), t.memoizedState = null, n));
            }
            function Yi(e, t, n, r) {
                var u = e.mode, a = e.child;
                return t = {
                    mode: "hidden",
                    children: t
                }, 0 == (2 & u) && null !== a ? (a.childLanes = 0, a.pendingProps = t) : a = Wl(t, u, 0, null), 
                n = Gl(n, u, r, null), a.return = e, n.return = e, a.sibling = n, e.child = a, n;
            }
            function to(e, t) {
                e.lanes |= t;
                var n = e.alternate;
                null !== n && (n.lanes |= t), ua(e.return, t);
            }
            function no(e, t, n, r, u, a) {
                var i = e.memoizedState;
                null === i ? e.memoizedState = {
                    isBackwards: t,
                    rendering: null,
                    renderingStartTime: 0,
                    last: r,
                    tail: n,
                    tailMode: u,
                    lastEffect: a
                } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, 
                i.tail = n, i.tailMode = u, i.lastEffect = a);
            }
            function ro(e, t, n) {
                var r = t.pendingProps, u = r.revealOrder, a = r.tail;
                if (Ri(e, t, r.children, n), 0 != (2 & (r = Ra.current))) r = 1 & r | 2, t.flags |= 64; else {
                    if (null !== e && 0 != (64 & e.flags)) e: for (e = t.child; null !== e; ) {
                        if (13 === e.tag) null !== e.memoizedState && to(e, n); else if (19 === e.tag) to(e, n); else if (null !== e.child) {
                            e.child.return = e, e = e.child;
                            continue;
                        }
                        if (e === t) break e;
                        for (;null === e.sibling; ) {
                            if (null === e.return || e.return === t) break e;
                            e = e.return;
                        }
                        e.sibling.return = e.return, e = e.sibling;
                    }
                    r &= 1;
                }
                if (du(Ra, r), 0 == (2 & t.mode)) t.memoizedState = null; else switch (u) {
                  case "forwards":
                    for (n = t.child, u = null; null !== n; ) null !== (e = n.alternate) && null === Pa(e) && (u = n), 
                    n = n.sibling;
                    null === (n = u) ? (u = t.child, t.child = null) : (u = n.sibling, n.sibling = null), 
                    no(t, !1, u, n, a, t.lastEffect);
                    break;

                  case "backwards":
                    for (n = null, u = t.child, t.child = null; null !== u; ) {
                        if (null !== (e = u.alternate) && null === Pa(e)) {
                            t.child = u;
                            break;
                        }
                        e = u.sibling, u.sibling = n, n = u, u = e;
                    }
                    no(t, !0, n, null, a, t.lastEffect);
                    break;

                  case "together":
                    no(t, !1, null, null, void 0, t.lastEffect);
                    break;

                  default:
                    t.memoizedState = null;
                }
                return t.child;
            }
            function uo(e, t, n) {
                if (null !== e && (t.dependencies = e.dependencies), zo |= t.lanes, 0 != (n & t.childLanes)) {
                    if (null !== e && t.child !== e.child) throw Error(i(153));
                    if (null !== t.child) {
                        for (n = Kl(e = t.child, e.pendingProps), t.child = n, n.return = t; null !== e.sibling; ) e = e.sibling, 
                        (n = n.sibling = Kl(e, e.pendingProps)).return = t;
                        n.sibling = null;
                    }
                    return t.child;
                }
                return null;
            }
            function ao(e, t) {
                if (!Ua) switch (e.tailMode) {
                  case "hidden":
                    t = e.tail;
                    for (var n = null; null !== t; ) null !== t.alternate && (n = t), t = t.sibling;
                    null === n ? e.tail = null : n.sibling = null;
                    break;

                  case "collapsed":
                    n = e.tail;
                    for (var r = null; null !== n; ) null !== n.alternate && (r = n), n = n.sibling;
                    null === r ? t || null === e.tail ? e.tail = null : e.tail.sibling = null : r.sibling = null;
                }
            }
            function io(e, t, n) {
                var r = t.pendingProps;
                switch (t.tag) {
                  case 2:
                  case 16:
                  case 15:
                  case 0:
                  case 11:
                  case 7:
                  case 8:
                  case 12:
                  case 9:
                  case 14:
                    return null;

                  case 1:
                  case 17:
                    return mu(t.type) && bu(), null;

                  case 3:
                    return Ma(), cu(Du), cu(fu), Qa(), (r = t.stateNode).pendingContext && (r.context = r.pendingContext, 
                    r.pendingContext = null), null !== e && null !== e.child || (Va(t) ? t.flags |= 4 : r.hydrate || (t.flags |= 256)), 
                    null;

                  case 5:
                    Ia(t);
                    var a = Oa(Na.current);
                    if (n = t.type, null !== e && null != t.stateNode) Wi(e, t, n, r), e.ref !== t.ref && (t.flags |= 128); else {
                        if (!r) {
                            if (null === t.stateNode) throw Error(i(166));
                            return null;
                        }
                        if (e = Oa(Ba.current), Va(t)) {
                            r = t.stateNode, n = t.type;
                            var o = t.memoizedProps;
                            switch (r[Yr] = t, r[Jr] = o, n) {
                              case "dialog":
                                Sr("cancel", r), Sr("close", r);
                                break;

                              case "iframe":
                              case "object":
                              case "embed":
                                Sr("load", r);
                                break;

                              case "video":
                              case "audio":
                                for (e = 0; e < xr.length; e++) Sr(xr[e], r);
                                break;

                              case "source":
                                Sr("error", r);
                                break;

                              case "img":
                              case "image":
                              case "link":
                                Sr("error", r), Sr("load", r);
                                break;

                              case "details":
                                Sr("toggle", r);
                                break;

                              case "input":
                                ee(r, o), Sr("invalid", r);
                                break;

                              case "select":
                                r._wrapperState = {
                                    wasMultiple: !!o.multiple
                                }, Sr("invalid", r);
                                break;

                              case "textarea":
                                le(r, o), Sr("invalid", r);
                            }
                            for (var s in Fe(n, o), e = null, o) o.hasOwnProperty(s) && (a = o[s], "children" === s ? "string" == typeof a ? r.textContent !== a && (e = [ "children", a ]) : "number" == typeof a && r.textContent !== "" + a && (e = [ "children", "" + a ]) : l.hasOwnProperty(s) && null != a && "onScroll" === s && Sr("scroll", r));
                            switch (n) {
                              case "input":
                                Z(r), re(r, o, !0);
                                break;

                              case "textarea":
                                Z(r), ce(r);
                                break;

                              case "select":
                              case "option":
                                break;

                              default:
                                "function" == typeof o.onClick && (r.onclick = zr);
                            }
                            r = e, t.updateQueue = r, null !== r && (t.flags |= 4);
                        } else {
                            switch (s = 9 === a.nodeType ? a : a.ownerDocument, e === de && (e = fe(n)), e === de ? "script" === n ? ((e = s.createElement("div")).innerHTML = "<script><\/script>", 
                            e = e.removeChild(e.firstChild)) : "string" == typeof r.is ? e = s.createElement(n, {
                                is: r.is
                            }) : (e = s.createElement(n), "select" === n && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), 
                            e[Yr] = t, e[Jr] = r, Gi(e, t), t.stateNode = e, s = Ae(n, r), n) {
                              case "dialog":
                                Sr("cancel", e), Sr("close", e), a = r;
                                break;

                              case "iframe":
                              case "object":
                              case "embed":
                                Sr("load", e), a = r;
                                break;

                              case "video":
                              case "audio":
                                for (a = 0; a < xr.length; a++) Sr(xr[a], e);
                                a = r;
                                break;

                              case "source":
                                Sr("error", e), a = r;
                                break;

                              case "img":
                              case "image":
                              case "link":
                                Sr("error", e), Sr("load", e), a = r;
                                break;

                              case "details":
                                Sr("toggle", e), a = r;
                                break;

                              case "input":
                                ee(e, r), a = J(e, r), Sr("invalid", e);
                                break;

                              case "option":
                                a = ae(e, r);
                                break;

                              case "select":
                                e._wrapperState = {
                                    wasMultiple: !!r.multiple
                                }, a = u({}, r, {
                                    value: void 0
                                }), Sr("invalid", e);
                                break;

                              case "textarea":
                                le(e, r), a = oe(e, r), Sr("invalid", e);
                                break;

                              default:
                                a = r;
                            }
                            Fe(n, a);
                            var c = a;
                            for (o in c) if (c.hasOwnProperty(o)) {
                                var d = c[o];
                                "style" === o ? _e(e, d) : "dangerouslySetInnerHTML" === o ? null != (d = d ? d.__html : void 0) && me(e, d) : "children" === o ? "string" == typeof d ? ("textarea" !== n || "" !== d) && be(e, d) : "number" == typeof d && be(e, "" + d) : "suppressContentEditableWarning" !== o && "suppressHydrationWarning" !== o && "autoFocus" !== o && (l.hasOwnProperty(o) ? null != d && "onScroll" === o && Sr("scroll", e) : null != d && E(e, o, d, s));
                            }
                            switch (n) {
                              case "input":
                                Z(e), re(e, r, !1);
                                break;

                              case "textarea":
                                Z(e), ce(e);
                                break;

                              case "option":
                                null != r.value && e.setAttribute("value", "" + W(r.value));
                                break;

                              case "select":
                                e.multiple = !!r.multiple, null != (o = r.value) ? ie(e, !!r.multiple, o, !1) : null != r.defaultValue && ie(e, !!r.multiple, r.defaultValue, !0);
                                break;

                              default:
                                "function" == typeof a.onClick && (e.onclick = zr);
                            }
                            Hr(n, r) && (t.flags |= 4);
                        }
                        null !== t.ref && (t.flags |= 128);
                    }
                    return null;

                  case 6:
                    if (e && null != t.stateNode) Qi(0, t, e.memoizedProps, r); else {
                        if ("string" != typeof r && null === t.stateNode) throw Error(i(166));
                        n = Oa(Na.current), Oa(Ba.current), Va(t) ? (r = t.stateNode, n = t.memoizedProps, 
                        r[Yr] = t, r.nodeValue !== n && (t.flags |= 4)) : ((r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(r))[Yr] = t, 
                        t.stateNode = r);
                    }
                    return null;

                  case 13:
                    return cu(Ra), r = t.memoizedState, 0 != (64 & t.flags) ? (t.lanes = n, t) : (r = null !== r, 
                    n = !1, null === e ? void 0 !== t.memoizedProps.fallback && Va(t) : n = null !== e.memoizedState, 
                    r && !n && 0 != (2 & t.mode) && (null === e && !0 !== t.memoizedProps.unstable_avoidThisFallback || 0 != (1 & Ra.current) ? 0 === Ro && (Ro = 3) : (0 !== Ro && 3 !== Ro || (Ro = 4), 
                    null === Oo || 0 == (134217727 & zo) && 0 == (134217727 & Uo) || ml(Oo, Mo))), (r || n) && (t.flags |= 4), 
                    null);

                  case 4:
                    return Ma(), null === e && Or(t.stateNode.containerInfo), null;

                  case 10:
                    return ra(t), null;

                  case 19:
                    if (cu(Ra), null === (r = t.memoizedState)) return null;
                    if (o = 0 != (64 & t.flags), null === (s = r.rendering)) if (o) ao(r, !1); else {
                        if (0 !== Ro || null !== e && 0 != (64 & e.flags)) for (e = t.child; null !== e; ) {
                            if (null !== (s = Pa(e))) {
                                for (t.flags |= 64, ao(r, !1), null !== (o = s.updateQueue) && (t.updateQueue = o, 
                                t.flags |= 4), null === r.lastEffect && (t.firstEffect = null), t.lastEffect = r.lastEffect, 
                                r = n, n = t.child; null !== n; ) e = r, (o = n).flags &= 2, o.nextEffect = null, 
                                o.firstEffect = null, o.lastEffect = null, null === (s = o.alternate) ? (o.childLanes = 0, 
                                o.lanes = e, o.child = null, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, 
                                o.dependencies = null, o.stateNode = null) : (o.childLanes = s.childLanes, o.lanes = s.lanes, 
                                o.child = s.child, o.memoizedProps = s.memoizedProps, o.memoizedState = s.memoizedState, 
                                o.updateQueue = s.updateQueue, o.type = s.type, e = s.dependencies, o.dependencies = null === e ? null : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext
                                }), n = n.sibling;
                                return du(Ra, 1 & Ra.current | 2), t.child;
                            }
                            e = e.sibling;
                        }
                        null !== r.tail && Hu() > Ko && (t.flags |= 64, o = !0, ao(r, !1), t.lanes = 33554432);
                    } else {
                        if (!o) if (null !== (e = Pa(s))) {
                            if (t.flags |= 64, o = !0, null !== (n = e.updateQueue) && (t.updateQueue = n, t.flags |= 4), 
                            ao(r, !0), null === r.tail && "hidden" === r.tailMode && !s.alternate && !Ua) return null !== (t = t.lastEffect = r.lastEffect) && (t.nextEffect = null), 
                            null;
                        } else 2 * Hu() - r.renderingStartTime > Ko && 1073741824 !== n && (t.flags |= 64, 
                        o = !0, ao(r, !1), t.lanes = 33554432);
                        r.isBackwards ? (s.sibling = t.child, t.child = s) : (null !== (n = r.last) ? n.sibling = s : t.child = s, 
                        r.last = s);
                    }
                    return null !== r.tail ? (n = r.tail, r.rendering = n, r.tail = n.sibling, r.lastEffect = t.lastEffect, 
                    r.renderingStartTime = Hu(), n.sibling = null, t = Ra.current, du(Ra, o ? 1 & t | 2 : 1 & t), 
                    n) : null;

                  case 23:
                  case 24:
                    return _l(), null !== e && null !== e.memoizedState != (null !== t.memoizedState) && "unstable-defer-without-hiding" !== r.mode && (t.flags |= 4), 
                    null;
                }
                throw Error(i(156, t.tag));
            }
            function oo(e) {
                switch (e.tag) {
                  case 1:
                    mu(e.type) && bu();
                    var t = e.flags;
                    return 4096 & t ? (e.flags = -4097 & t | 64, e) : null;

                  case 3:
                    if (Ma(), cu(Du), cu(fu), Qa(), 0 != (64 & (t = e.flags))) throw Error(i(285));
                    return e.flags = -4097 & t | 64, e;

                  case 5:
                    return Ia(e), null;

                  case 13:
                    return cu(Ra), 4096 & (t = e.flags) ? (e.flags = -4097 & t | 64, e) : null;

                  case 19:
                    return cu(Ra), null;

                  case 4:
                    return Ma(), null;

                  case 10:
                    return ra(e), null;

                  case 23:
                  case 24:
                    return _l(), null;

                  default:
                    return null;
                }
            }
            function lo(e, t) {
                try {
                    var n = "", r = t;
                    do {
                        n += V(r), r = r.return;
                    } while (r);
                    var u = n;
                } catch (e) {
                    u = "\nError generating stack: " + e.message + "\n" + e.stack;
                }
                return {
                    value: e,
                    source: t,
                    stack: u
                };
            }
            Gi = function(e, t) {
                for (var n = t.child; null !== n; ) {
                    if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode); else if (4 !== n.tag && null !== n.child) {
                        n.child.return = n, n = n.child;
                        continue;
                    }
                    if (n === t) break;
                    for (;null === n.sibling; ) {
                        if (null === n.return || n.return === t) return;
                        n = n.return;
                    }
                    n.sibling.return = n.return, n = n.sibling;
                }
            }, Wi = function(e, t, n, r) {
                var a = e.memoizedProps;
                if (a !== r) {
                    e = t.stateNode, Oa(Ba.current);
                    var i, o = null;
                    switch (n) {
                      case "input":
                        a = J(e, a), r = J(e, r), o = [];
                        break;

                      case "option":
                        a = ae(e, a), r = ae(e, r), o = [];
                        break;

                      case "select":
                        a = u({}, a, {
                            value: void 0
                        }), r = u({}, r, {
                            value: void 0
                        }), o = [];
                        break;

                      case "textarea":
                        a = oe(e, a), r = oe(e, r), o = [];
                        break;

                      default:
                        "function" != typeof a.onClick && "function" == typeof r.onClick && (e.onclick = zr);
                    }
                    for (d in Fe(n, r), n = null, a) if (!r.hasOwnProperty(d) && a.hasOwnProperty(d) && null != a[d]) if ("style" === d) {
                        var s = a[d];
                        for (i in s) s.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
                    } else "dangerouslySetInnerHTML" !== d && "children" !== d && "suppressContentEditableWarning" !== d && "suppressHydrationWarning" !== d && "autoFocus" !== d && (l.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
                    for (d in r) {
                        var c = r[d];
                        if (s = null != a ? a[d] : void 0, r.hasOwnProperty(d) && c !== s && (null != c || null != s)) if ("style" === d) if (s) {
                            for (i in s) !s.hasOwnProperty(i) || c && c.hasOwnProperty(i) || (n || (n = {}), 
                            n[i] = "");
                            for (i in c) c.hasOwnProperty(i) && s[i] !== c[i] && (n || (n = {}), n[i] = c[i]);
                        } else n || (o || (o = []), o.push(d, n)), n = c; else "dangerouslySetInnerHTML" === d ? (c = c ? c.__html : void 0, 
                        s = s ? s.__html : void 0, null != c && s !== c && (o = o || []).push(d, c)) : "children" === d ? "string" != typeof c && "number" != typeof c || (o = o || []).push(d, "" + c) : "suppressContentEditableWarning" !== d && "suppressHydrationWarning" !== d && (l.hasOwnProperty(d) ? (null != c && "onScroll" === d && Sr("scroll", e), 
                        o || s === c || (o = [])) : "object" == typeof c && null !== c && c.$$typeof === L ? c.toString() : (o = o || []).push(d, c));
                    }
                    n && (o = o || []).push("style", n);
                    var d = o;
                    (t.updateQueue = d) && (t.flags |= 4);
                }
            }, Qi = function(e, t, n, r) {
                n !== r && (t.flags |= 4);
            };
            var so = "function" == typeof WeakMap ? WeakMap : Map;
            function co(e, t, n) {
                (n = ca(-1, n)).tag = 3, n.payload = {
                    element: null
                };
                var r = t.value;
                return n.callback = function() {
                    Qo || (Qo = !0, Zo = r);
                }, n;
            }
            function po(e, t, n) {
                (n = ca(-1, n)).tag = 3;
                var r = e.type.getDerivedStateFromError;
                if ("function" == typeof r) {
                    var u = t.value;
                    n.payload = function() {
                        return r(u);
                    };
                }
                var a = e.stateNode;
                return null !== a && "function" == typeof a.componentDidCatch && (n.callback = function() {
                    "function" != typeof r && (null === Xo ? Xo = new Set([ this ]) : Xo.add(this));
                    var e = t.stack;
                    this.componentDidCatch(t.value, {
                        componentStack: null !== e ? e : ""
                    });
                }), n;
            }
            var fo = "function" == typeof WeakSet ? WeakSet : Set;
            function Do(e) {
                var t = e.ref;
                if (null !== t) if ("function" == typeof t) try {
                    t(null);
                } catch (t) {
                    jl(e, t);
                } else t.current = null;
            }
            function go(e, t) {
                switch (t.tag) {
                  case 0:
                  case 11:
                  case 15:
                  case 22:
                  case 5:
                  case 6:
                  case 4:
                  case 17:
                    return;

                  case 1:
                    if (256 & t.flags && null !== e) {
                        var n = e.memoizedProps, r = e.memoizedState;
                        t = (e = t.stateNode).getSnapshotBeforeUpdate(t.elementType === t.type ? n : Xu(t.type, n), r), 
                        e.__reactInternalSnapshotBeforeUpdate = t;
                    }
                    return;

                  case 3:
                    return void (256 & t.flags && Gr(t.stateNode.containerInfo));
                }
                throw Error(i(163));
            }
            function ho(e, t, n) {
                switch (n.tag) {
                  case 0:
                  case 11:
                  case 15:
                  case 22:
                    if (null !== (t = null !== (t = n.updateQueue) ? t.lastEffect : null)) {
                        e = t = t.next;
                        do {
                            if (3 == (3 & e.tag)) {
                                var r = e.create;
                                e.destroy = r();
                            }
                            e = e.next;
                        } while (e !== t);
                    }
                    if (null !== (t = null !== (t = n.updateQueue) ? t.lastEffect : null)) {
                        e = t = t.next;
                        do {
                            var u = e;
                            r = u.next, 0 != (4 & (u = u.tag)) && 0 != (1 & u) && (Il(n, e), Ll(n, e)), e = r;
                        } while (e !== t);
                    }
                    return;

                  case 1:
                    return e = n.stateNode, 4 & n.flags && (null === t ? e.componentDidMount() : (r = n.elementType === n.type ? t.memoizedProps : Xu(n.type, t.memoizedProps), 
                    e.componentDidUpdate(r, t.memoizedState, e.__reactInternalSnapshotBeforeUpdate))), 
                    void (null !== (t = n.updateQueue) && Da(n, t, e));

                  case 3:
                    if (null !== (t = n.updateQueue)) {
                        if (e = null, null !== n.child) switch (n.child.tag) {
                          case 5:
                          case 1:
                            e = n.child.stateNode;
                        }
                        Da(n, t, e);
                    }
                    return;

                  case 5:
                    return e = n.stateNode, void (null === t && 4 & n.flags && Hr(n.type, n.memoizedProps) && e.focus());

                  case 6:
                  case 4:
                  case 12:
                  case 19:
                  case 17:
                  case 20:
                  case 21:
                  case 23:
                  case 24:
                    return;

                  case 13:
                    return void (null === n.memoizedState && (n = n.alternate, null !== n && (n = n.memoizedState, 
                    null !== n && (n = n.dehydrated, null !== n && _t(n)))));
                }
                throw Error(i(163));
            }
            function mo(e, t) {
                for (var n = e; ;) {
                    if (5 === n.tag) {
                        var r = n.stateNode;
                        if (t) "function" == typeof (r = r.style).setProperty ? r.setProperty("display", "none", "important") : r.display = "none"; else {
                            r = n.stateNode;
                            var u = n.memoizedProps.style;
                            u = null != u && u.hasOwnProperty("display") ? u.display : null, r.style.display = ye("display", u);
                        }
                    } else if (6 === n.tag) n.stateNode.nodeValue = t ? "" : n.memoizedProps; else if ((23 !== n.tag && 24 !== n.tag || null === n.memoizedState || n === e) && null !== n.child) {
                        n.child.return = n, n = n.child;
                        continue;
                    }
                    if (n === e) break;
                    for (;null === n.sibling; ) {
                        if (null === n.return || n.return === e) return;
                        n = n.return;
                    }
                    n.sibling.return = n.return, n = n.sibling;
                }
            }
            function bo(e, t) {
                if (Fu && "function" == typeof Fu.onCommitFiberUnmount) try {
                    Fu.onCommitFiberUnmount(Cu, t);
                } catch (e) {}
                switch (t.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                  case 22:
                    if (null !== (e = t.updateQueue) && null !== (e = e.lastEffect)) {
                        var n = e = e.next;
                        do {
                            var r = n, u = r.destroy;
                            if (r = r.tag, void 0 !== u) if (0 != (4 & r)) Il(t, n); else {
                                r = t;
                                try {
                                    u();
                                } catch (e) {
                                    jl(r, e);
                                }
                            }
                            n = n.next;
                        } while (n !== e);
                    }
                    break;

                  case 1:
                    if (Do(t), "function" == typeof (e = t.stateNode).componentWillUnmount) try {
                        e.props = t.memoizedProps, e.state = t.memoizedState, e.componentWillUnmount();
                    } catch (e) {
                        jl(t, e);
                    }
                    break;

                  case 5:
                    Do(t);
                    break;

                  case 4:
                    Fo(e, t);
                }
            }
            function vo(e) {
                e.alternate = null, e.child = null, e.dependencies = null, e.firstEffect = null, 
                e.lastEffect = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, 
                e.return = null, e.updateQueue = null;
            }
            function Eo(e) {
                return 5 === e.tag || 3 === e.tag || 4 === e.tag;
            }
            function yo(e) {
                e: {
                    for (var t = e.return; null !== t; ) {
                        if (Eo(t)) break e;
                        t = t.return;
                    }
                    throw Error(i(160));
                }
                var n = t;
                switch (t = n.stateNode, n.tag) {
                  case 5:
                    var r = !1;
                    break;

                  case 3:
                  case 4:
                    t = t.containerInfo, r = !0;
                    break;

                  default:
                    throw Error(i(161));
                }
                16 & n.flags && (be(t, ""), n.flags &= -17);
                e: t: for (n = e; ;) {
                    for (;null === n.sibling; ) {
                        if (null === n.return || Eo(n.return)) {
                            n = null;
                            break e;
                        }
                        n = n.return;
                    }
                    for (n.sibling.return = n.return, n = n.sibling; 5 !== n.tag && 6 !== n.tag && 18 !== n.tag; ) {
                        if (2 & n.flags) continue t;
                        if (null === n.child || 4 === n.tag) continue t;
                        n.child.return = n, n = n.child;
                    }
                    if (!(2 & n.flags)) {
                        n = n.stateNode;
                        break e;
                    }
                }
                r ? _o(e, n, t) : Co(e, n, t);
            }
            function _o(e, t, n) {
                var r = e.tag, u = 5 === r || 6 === r;
                if (u) e = u ? e.stateNode : e.stateNode.instance, t ? 8 === n.nodeType ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (8 === n.nodeType ? (t = n.parentNode).insertBefore(e, n) : (t = n).appendChild(e), 
                null != (n = n._reactRootContainer) || null !== t.onclick || (t.onclick = zr)); else if (4 !== r && null !== (e = e.child)) for (_o(e, t, n), 
                e = e.sibling; null !== e; ) _o(e, t, n), e = e.sibling;
            }
            function Co(e, t, n) {
                var r = e.tag, u = 5 === r || 6 === r;
                if (u) e = u ? e.stateNode : e.stateNode.instance, t ? n.insertBefore(e, t) : n.appendChild(e); else if (4 !== r && null !== (e = e.child)) for (Co(e, t, n), 
                e = e.sibling; null !== e; ) Co(e, t, n), e = e.sibling;
            }
            function Fo(e, t) {
                for (var n, r, u = t, a = !1; ;) {
                    if (!a) {
                        a = u.return;
                        e: for (;;) {
                            if (null === a) throw Error(i(160));
                            switch (n = a.stateNode, a.tag) {
                              case 5:
                                r = !1;
                                break e;

                              case 3:
                              case 4:
                                n = n.containerInfo, r = !0;
                                break e;
                            }
                            a = a.return;
                        }
                        a = !0;
                    }
                    if (5 === u.tag || 6 === u.tag) {
                        e: for (var o = e, l = u, s = l; ;) if (bo(o, s), null !== s.child && 4 !== s.tag) s.child.return = s, 
                        s = s.child; else {
                            if (s === l) break e;
                            for (;null === s.sibling; ) {
                                if (null === s.return || s.return === l) break e;
                                s = s.return;
                            }
                            s.sibling.return = s.return, s = s.sibling;
                        }
                        r ? (o = n, l = u.stateNode, 8 === o.nodeType ? o.parentNode.removeChild(l) : o.removeChild(l)) : n.removeChild(u.stateNode);
                    } else if (4 === u.tag) {
                        if (null !== u.child) {
                            n = u.stateNode.containerInfo, r = !0, u.child.return = u, u = u.child;
                            continue;
                        }
                    } else if (bo(e, u), null !== u.child) {
                        u.child.return = u, u = u.child;
                        continue;
                    }
                    if (u === t) break;
                    for (;null === u.sibling; ) {
                        if (null === u.return || u.return === t) return;
                        4 === (u = u.return).tag && (a = !1);
                    }
                    u.sibling.return = u.return, u = u.sibling;
                }
            }
            function Ao(e, t) {
                switch (t.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                  case 22:
                    var n = t.updateQueue;
                    if (null !== (n = null !== n ? n.lastEffect : null)) {
                        var r = n = n.next;
                        do {
                            3 == (3 & r.tag) && (e = r.destroy, r.destroy = void 0, void 0 !== e && e()), r = r.next;
                        } while (r !== n);
                    }
                    return;

                  case 1:
                  case 12:
                  case 17:
                    return;

                  case 5:
                    if (null != (n = t.stateNode)) {
                        r = t.memoizedProps;
                        var u = null !== e ? e.memoizedProps : r;
                        e = t.type;
                        var a = t.updateQueue;
                        if (t.updateQueue = null, null !== a) {
                            for (n[Jr] = r, "input" === e && "radio" === r.type && null != r.name && te(n, r), 
                            Ae(e, u), t = Ae(e, r), u = 0; u < a.length; u += 2) {
                                var o = a[u], l = a[u + 1];
                                "style" === o ? _e(n, l) : "dangerouslySetInnerHTML" === o ? me(n, l) : "children" === o ? be(n, l) : E(n, o, l, t);
                            }
                            switch (e) {
                              case "input":
                                ne(n, r);
                                break;

                              case "textarea":
                                se(n, r);
                                break;

                              case "select":
                                e = n._wrapperState.wasMultiple, n._wrapperState.wasMultiple = !!r.multiple, null != (a = r.value) ? ie(n, !!r.multiple, a, !1) : e !== !!r.multiple && (null != r.defaultValue ? ie(n, !!r.multiple, r.defaultValue, !0) : ie(n, !!r.multiple, r.multiple ? [] : "", !1));
                            }
                        }
                    }
                    return;

                  case 6:
                    if (null === t.stateNode) throw Error(i(162));
                    return void (t.stateNode.nodeValue = t.memoizedProps);

                  case 3:
                    return void ((n = t.stateNode).hydrate && (n.hydrate = !1, _t(n.containerInfo)));

                  case 13:
                    return null !== t.memoizedState && ($o = Hu(), mo(t.child, !0)), void xo(t);

                  case 19:
                    return void xo(t);

                  case 23:
                  case 24:
                    return void mo(t, null !== t.memoizedState);
                }
                throw Error(i(163));
            }
            function xo(e) {
                var t = e.updateQueue;
                if (null !== t) {
                    e.updateQueue = null;
                    var n = e.stateNode;
                    null === n && (n = e.stateNode = new fo), t.forEach((function(t) {
                        var r = Ul.bind(null, e, t);
                        n.has(t) || (n.add(t), t.then(r, r));
                    }));
                }
            }
            function wo(e, t) {
                return null !== e && (null === (e = e.memoizedState) || null !== e.dehydrated) && null !== (t = t.memoizedState) && null === t.dehydrated;
            }
            var ko = Math.ceil, Bo = y.ReactCurrentDispatcher, So = y.ReactCurrentOwner, No = 0, Oo = null, To = null, Mo = 0, Lo = 0, Io = su(0), Ro = 0, Po = null, jo = 0, zo = 0, Uo = 0, qo = 0, Ho = null, $o = 0, Ko = 1 / 0;
            function Vo() {
                Ko = Hu() + 500;
            }
            var Go, Wo = null, Qo = !1, Zo = null, Xo = null, Yo = !1, Jo = null, el = 90, tl = [], nl = [], rl = null, ul = 0, al = null, il = -1, ol = 0, ll = 0, sl = null, cl = !1;
            function dl() {
                return 0 != (48 & No) ? Hu() : -1 !== il ? il : il = Hu();
            }
            function pl(e) {
                if (0 == (2 & (e = e.mode))) return 1;
                if (0 == (4 & e)) return 99 === $u() ? 1 : 2;
                if (0 === ol && (ol = jo), 0 !== Zu.transition) {
                    0 !== ll && (ll = null !== Ho ? Ho.pendingLanes : 0), e = ol;
                    var t = 4186112 & ~ll;
                    return 0 == (t &= -t) && 0 == (t = (e = 4186112 & ~e) & -e) && (t = 8192), t;
                }
                return e = $u(), e = zt(0 != (4 & No) && 98 === e ? 12 : e = function(e) {
                    switch (e) {
                      case 99:
                        return 15;

                      case 98:
                        return 10;

                      case 97:
                      case 96:
                        return 8;

                      case 95:
                        return 2;

                      default:
                        return 0;
                    }
                }(e), ol);
            }
            function fl(e, t, n) {
                if (50 < ul) throw ul = 0, al = null, Error(i(185));
                if (null === (e = Dl(e, t))) return null;
                Ht(e, t, n), e === Oo && (Uo |= t, 4 === Ro && ml(e, Mo));
                var r = $u();
                1 === t ? 0 != (8 & No) && 0 == (48 & No) ? bl(e) : (gl(e, n), 0 === No && (Vo(), 
                Wu())) : (0 == (4 & No) || 98 !== r && 99 !== r || (null === rl ? rl = new Set([ e ]) : rl.add(e)), 
                gl(e, n)), Ho = e;
            }
            function Dl(e, t) {
                e.lanes |= t;
                var n = e.alternate;
                for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e; ) e.childLanes |= t, 
                null !== (n = e.alternate) && (n.childLanes |= t), n = e, e = e.return;
                return 3 === n.tag ? n.stateNode : null;
            }
            function gl(e, t) {
                for (var n = e.callbackNode, r = e.suspendedLanes, u = e.pingedLanes, a = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
                    var l = 31 - $t(o), s = 1 << l, c = a[l];
                    if (-1 === c) {
                        if (0 == (s & r) || 0 != (s & u)) {
                            c = t, Rt(s);
                            var d = It;
                            a[l] = 10 <= d ? c + 250 : 6 <= d ? c + 5e3 : -1;
                        }
                    } else c <= t && (e.expiredLanes |= s);
                    o &= ~s;
                }
                if (r = Pt(e, e === Oo ? Mo : 0), t = It, 0 === r) null !== n && (n !== Ru && wu(n), 
                e.callbackNode = null, e.callbackPriority = 0); else {
                    if (null !== n) {
                        if (e.callbackPriority === t) return;
                        n !== Ru && wu(n);
                    }
                    15 === t ? (n = bl.bind(null, e), null === ju ? (ju = [ n ], zu = xu(Ou, Qu)) : ju.push(n), 
                    n = Ru) : 14 === t ? n = Gu(99, bl.bind(null, e)) : n = Gu(n = function(e) {
                        switch (e) {
                          case 15:
                          case 14:
                            return 99;

                          case 13:
                          case 12:
                          case 11:
                          case 10:
                            return 98;

                          case 9:
                          case 8:
                          case 7:
                          case 6:
                          case 4:
                          case 5:
                            return 97;

                          case 3:
                          case 2:
                          case 1:
                            return 95;

                          case 0:
                            return 90;

                          default:
                            throw Error(i(358, e));
                        }
                    }(t), hl.bind(null, e)), e.callbackPriority = t, e.callbackNode = n;
                }
            }
            function hl(e) {
                if (il = -1, ll = ol = 0, 0 != (48 & No)) throw Error(i(327));
                var t = e.callbackNode;
                if (Ml() && e.callbackNode !== t) return null;
                var n = Pt(e, e === Oo ? Mo : 0);
                if (0 === n) return null;
                var r = n, u = No;
                No |= 16;
                var a = Al();
                for (Oo === e && Mo === r || (Vo(), Cl(e, r)); ;) try {
                    kl();
                    break;
                } catch (t) {
                    Fl(e, t);
                }
                if (na(), Bo.current = a, No = u, null !== To ? r = 0 : (Oo = null, Mo = 0, r = Ro), 
                0 != (jo & Uo)) Cl(e, 0); else if (0 !== r) {
                    if (2 === r && (No |= 64, e.hydrate && (e.hydrate = !1, Gr(e.containerInfo)), 0 !== (n = jt(e)) && (r = xl(e, n))), 
                    1 === r) throw t = Po, Cl(e, 0), ml(e, n), gl(e, Hu()), t;
                    switch (e.finishedWork = e.current.alternate, e.finishedLanes = n, r) {
                      case 0:
                      case 1:
                        throw Error(i(345));

                      case 2:
                      case 5:
                        Nl(e);
                        break;

                      case 3:
                        if (ml(e, n), (62914560 & n) === n && 10 < (r = $o + 500 - Hu())) {
                            if (0 !== Pt(e, 0)) break;
                            if (((u = e.suspendedLanes) & n) !== n) {
                                dl(), e.pingedLanes |= e.suspendedLanes & u;
                                break;
                            }
                            e.timeoutHandle = Kr(Nl.bind(null, e), r);
                            break;
                        }
                        Nl(e);
                        break;

                      case 4:
                        if (ml(e, n), (4186112 & n) === n) break;
                        for (r = e.eventTimes, u = -1; 0 < n; ) {
                            var o = 31 - $t(n);
                            a = 1 << o, (o = r[o]) > u && (u = o), n &= ~a;
                        }
                        if (n = u, 10 < (n = (120 > (n = Hu() - n) ? 120 : 480 > n ? 480 : 1080 > n ? 1080 : 1920 > n ? 1920 : 3e3 > n ? 3e3 : 4320 > n ? 4320 : 1960 * ko(n / 1960)) - n)) {
                            e.timeoutHandle = Kr(Nl.bind(null, e), n);
                            break;
                        }
                        Nl(e);
                        break;

                      default:
                        throw Error(i(329));
                    }
                }
                return gl(e, Hu()), e.callbackNode === t ? hl.bind(null, e) : null;
            }
            function ml(e, t) {
                for (t &= ~qo, t &= ~Uo, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
                    var n = 31 - $t(t), r = 1 << n;
                    e[n] = -1, t &= ~r;
                }
            }
            function bl(e) {
                if (0 != (48 & No)) throw Error(i(327));
                if (Ml(), e === Oo && 0 != (e.expiredLanes & Mo)) {
                    var t = Mo, n = xl(e, t);
                    0 != (jo & Uo) && (n = xl(e, t = Pt(e, t)));
                } else n = xl(e, t = Pt(e, 0));
                if (0 !== e.tag && 2 === n && (No |= 64, e.hydrate && (e.hydrate = !1, Gr(e.containerInfo)), 
                0 !== (t = jt(e)) && (n = xl(e, t))), 1 === n) throw n = Po, Cl(e, 0), ml(e, t), 
                gl(e, Hu()), n;
                return e.finishedWork = e.current.alternate, e.finishedLanes = t, Nl(e), gl(e, Hu()), 
                null;
            }
            function vl(e, t) {
                var n = No;
                No |= 1;
                try {
                    return e(t);
                } finally {
                    0 === (No = n) && (Vo(), Wu());
                }
            }
            function El(e, t) {
                var n = No;
                No &= -2, No |= 8;
                try {
                    return e(t);
                } finally {
                    0 === (No = n) && (Vo(), Wu());
                }
            }
            function yl(e, t) {
                du(Io, Lo), Lo |= t, jo |= t;
            }
            function _l() {
                Lo = Io.current, cu(Io);
            }
            function Cl(e, t) {
                e.finishedWork = null, e.finishedLanes = 0;
                var n = e.timeoutHandle;
                if (-1 !== n && (e.timeoutHandle = -1, Vr(n)), null !== To) for (n = To.return; null !== n; ) {
                    var r = n;
                    switch (r.tag) {
                      case 1:
                        null != (r = r.type.childContextTypes) && bu();
                        break;

                      case 3:
                        Ma(), cu(Du), cu(fu), Qa();
                        break;

                      case 5:
                        Ia(r);
                        break;

                      case 4:
                        Ma();
                        break;

                      case 13:
                      case 19:
                        cu(Ra);
                        break;

                      case 10:
                        ra(r);
                        break;

                      case 23:
                      case 24:
                        _l();
                    }
                    n = n.return;
                }
                Oo = e, To = Kl(e.current, null), Mo = Lo = jo = t, Ro = 0, Po = null, qo = Uo = zo = 0;
            }
            function Fl(e, t) {
                for (;;) {
                    var n = To;
                    try {
                        if (na(), Za.current = Ni, ni) {
                            for (var r = Ja.memoizedState; null !== r; ) {
                                var u = r.queue;
                                null !== u && (u.pending = null), r = r.next;
                            }
                            ni = !1;
                        }
                        if (Ya = 0, ti = ei = Ja = null, ri = !1, So.current = null, null === n || null === n.return) {
                            Ro = 1, Po = t, To = null;
                            break;
                        }
                        e: {
                            var a = e, i = n.return, o = n, l = t;
                            if (t = Mo, o.flags |= 2048, o.firstEffect = o.lastEffect = null, null !== l && "object" == typeof l && "function" == typeof l.then) {
                                var s = l;
                                if (0 == (2 & o.mode)) {
                                    var c = o.alternate;
                                    c ? (o.updateQueue = c.updateQueue, o.memoizedState = c.memoizedState, o.lanes = c.lanes) : (o.updateQueue = null, 
                                    o.memoizedState = null);
                                }
                                var d = 0 != (1 & Ra.current), p = i;
                                do {
                                    var f;
                                    if (f = 13 === p.tag) {
                                        var D = p.memoizedState;
                                        if (null !== D) f = null !== D.dehydrated; else {
                                            var g = p.memoizedProps;
                                            f = void 0 !== g.fallback && (!0 !== g.unstable_avoidThisFallback || !d);
                                        }
                                    }
                                    if (f) {
                                        var h = p.updateQueue;
                                        if (null === h) {
                                            var m = new Set;
                                            m.add(s), p.updateQueue = m;
                                        } else h.add(s);
                                        if (0 == (2 & p.mode)) {
                                            if (p.flags |= 64, o.flags |= 16384, o.flags &= -2981, 1 === o.tag) if (null === o.alternate) o.tag = 17; else {
                                                var b = ca(-1, 1);
                                                b.tag = 2, da(o, b);
                                            }
                                            o.lanes |= 1;
                                            break e;
                                        }
                                        l = void 0, o = t;
                                        var v = a.pingCache;
                                        if (null === v ? (v = a.pingCache = new so, l = new Set, v.set(s, l)) : void 0 === (l = v.get(s)) && (l = new Set, 
                                        v.set(s, l)), !l.has(o)) {
                                            l.add(o);
                                            var E = zl.bind(null, a, s, o);
                                            s.then(E, E);
                                        }
                                        p.flags |= 4096, p.lanes = t;
                                        break e;
                                    }
                                    p = p.return;
                                } while (null !== p);
                                l = Error((G(o.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
                            }
                            5 !== Ro && (Ro = 2), l = lo(l, o), p = i;
                            do {
                                switch (p.tag) {
                                  case 3:
                                    a = l, p.flags |= 4096, t &= -t, p.lanes |= t, pa(p, co(0, a, t));
                                    break e;

                                  case 1:
                                    a = l;
                                    var y = p.type, _ = p.stateNode;
                                    if (0 == (64 & p.flags) && ("function" == typeof y.getDerivedStateFromError || null !== _ && "function" == typeof _.componentDidCatch && (null === Xo || !Xo.has(_)))) {
                                        p.flags |= 4096, t &= -t, p.lanes |= t, pa(p, po(p, a, t));
                                        break e;
                                    }
                                }
                                p = p.return;
                            } while (null !== p);
                        }
                        Sl(n);
                    } catch (e) {
                        t = e, To === n && null !== n && (To = n = n.return);
                        continue;
                    }
                    break;
                }
            }
            function Al() {
                var e = Bo.current;
                return Bo.current = Ni, null === e ? Ni : e;
            }
            function xl(e, t) {
                var n = No;
                No |= 16;
                var r = Al();
                for (Oo === e && Mo === t || Cl(e, t); ;) try {
                    wl();
                    break;
                } catch (t) {
                    Fl(e, t);
                }
                if (na(), No = n, Bo.current = r, null !== To) throw Error(i(261));
                return Oo = null, Mo = 0, Ro;
            }
            function wl() {
                for (;null !== To; ) Bl(To);
            }
            function kl() {
                for (;null !== To && !ku(); ) Bl(To);
            }
            function Bl(e) {
                var t = Go(e.alternate, e, Lo);
                e.memoizedProps = e.pendingProps, null === t ? Sl(e) : To = t, So.current = null;
            }
            function Sl(e) {
                var t = e;
                do {
                    var n = t.alternate;
                    if (e = t.return, 0 == (2048 & t.flags)) {
                        if (null !== (n = io(n, t, Lo))) return void (To = n);
                        if (24 !== (n = t).tag && 23 !== n.tag || null === n.memoizedState || 0 != (1073741824 & Lo) || 0 == (4 & n.mode)) {
                            for (var r = 0, u = n.child; null !== u; ) r |= u.lanes | u.childLanes, u = u.sibling;
                            n.childLanes = r;
                        }
                        null !== e && 0 == (2048 & e.flags) && (null === e.firstEffect && (e.firstEffect = t.firstEffect), 
                        null !== t.lastEffect && (null !== e.lastEffect && (e.lastEffect.nextEffect = t.firstEffect), 
                        e.lastEffect = t.lastEffect), 1 < t.flags && (null !== e.lastEffect ? e.lastEffect.nextEffect = t : e.firstEffect = t, 
                        e.lastEffect = t));
                    } else {
                        if (null !== (n = oo(t))) return n.flags &= 2047, void (To = n);
                        null !== e && (e.firstEffect = e.lastEffect = null, e.flags |= 2048);
                    }
                    if (null !== (t = t.sibling)) return void (To = t);
                    To = t = e;
                } while (null !== t);
                0 === Ro && (Ro = 5);
            }
            function Nl(e) {
                var t = $u();
                return Vu(99, Ol.bind(null, e, t)), null;
            }
            function Ol(e, t) {
                do {
                    Ml();
                } while (null !== Jo);
                if (0 != (48 & No)) throw Error(i(327));
                var n = e.finishedWork;
                if (null === n) return null;
                if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(i(177));
                e.callbackNode = null;
                var r = n.lanes | n.childLanes, u = r, a = e.pendingLanes & ~u;
                e.pendingLanes = u, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= u, 
                e.mutableReadLanes &= u, e.entangledLanes &= u, u = e.entanglements;
                for (var o = e.eventTimes, l = e.expirationTimes; 0 < a; ) {
                    var s = 31 - $t(a), c = 1 << s;
                    u[s] = 0, o[s] = -1, l[s] = -1, a &= ~c;
                }
                if (null !== rl && 0 == (24 & r) && rl.has(e) && rl.delete(e), e === Oo && (To = Oo = null, 
                Mo = 0), 1 < n.flags ? null !== n.lastEffect ? (n.lastEffect.nextEffect = n, r = n.firstEffect) : r = n : r = n.firstEffect, 
                null !== r) {
                    if (u = No, No |= 32, So.current = null, Ur = Qt, mr(o = hr())) {
                        if ("selectionStart" in o) l = {
                            start: o.selectionStart,
                            end: o.selectionEnd
                        }; else e: if (l = (l = o.ownerDocument) && l.defaultView || window, (c = l.getSelection && l.getSelection()) && 0 !== c.rangeCount) {
                            l = c.anchorNode, a = c.anchorOffset, s = c.focusNode, c = c.focusOffset;
                            try {
                                l.nodeType, s.nodeType;
                            } catch (e) {
                                l = null;
                                break e;
                            }
                            var d = 0, p = -1, f = -1, D = 0, g = 0, h = o, m = null;
                            t: for (;;) {
                                for (var b; h !== l || 0 !== a && 3 !== h.nodeType || (p = d + a), h !== s || 0 !== c && 3 !== h.nodeType || (f = d + c), 
                                3 === h.nodeType && (d += h.nodeValue.length), null !== (b = h.firstChild); ) m = h, 
                                h = b;
                                for (;;) {
                                    if (h === o) break t;
                                    if (m === l && ++D === a && (p = d), m === s && ++g === c && (f = d), null !== (b = h.nextSibling)) break;
                                    m = (h = m).parentNode;
                                }
                                h = b;
                            }
                            l = -1 === p || -1 === f ? null : {
                                start: p,
                                end: f
                            };
                        } else l = null;
                        l = l || {
                            start: 0,
                            end: 0
                        };
                    } else l = null;
                    qr = {
                        focusedElem: o,
                        selectionRange: l
                    }, Qt = !1, sl = null, cl = !1, Wo = r;
                    do {
                        try {
                            Tl();
                        } catch (e) {
                            if (null === Wo) throw Error(i(330));
                            jl(Wo, e), Wo = Wo.nextEffect;
                        }
                    } while (null !== Wo);
                    sl = null, Wo = r;
                    do {
                        try {
                            for (o = e; null !== Wo; ) {
                                var v = Wo.flags;
                                if (16 & v && be(Wo.stateNode, ""), 128 & v) {
                                    var E = Wo.alternate;
                                    if (null !== E) {
                                        var y = E.ref;
                                        null !== y && ("function" == typeof y ? y(null) : y.current = null);
                                    }
                                }
                                switch (1038 & v) {
                                  case 2:
                                    yo(Wo), Wo.flags &= -3;
                                    break;

                                  case 6:
                                    yo(Wo), Wo.flags &= -3, Ao(Wo.alternate, Wo);
                                    break;

                                  case 1024:
                                    Wo.flags &= -1025;
                                    break;

                                  case 1028:
                                    Wo.flags &= -1025, Ao(Wo.alternate, Wo);
                                    break;

                                  case 4:
                                    Ao(Wo.alternate, Wo);
                                    break;

                                  case 8:
                                    Fo(o, l = Wo);
                                    var _ = l.alternate;
                                    vo(l), null !== _ && vo(_);
                                }
                                Wo = Wo.nextEffect;
                            }
                        } catch (e) {
                            if (null === Wo) throw Error(i(330));
                            jl(Wo, e), Wo = Wo.nextEffect;
                        }
                    } while (null !== Wo);
                    if (y = qr, E = hr(), v = y.focusedElem, o = y.selectionRange, E !== v && v && v.ownerDocument && gr(v.ownerDocument.documentElement, v)) {
                        null !== o && mr(v) && (E = o.start, void 0 === (y = o.end) && (y = E), "selectionStart" in v ? (v.selectionStart = E, 
                        v.selectionEnd = Math.min(y, v.value.length)) : (y = (E = v.ownerDocument || document) && E.defaultView || window).getSelection && (y = y.getSelection(), 
                        l = v.textContent.length, _ = Math.min(o.start, l), o = void 0 === o.end ? _ : Math.min(o.end, l), 
                        !y.extend && _ > o && (l = o, o = _, _ = l), l = Dr(v, _), a = Dr(v, o), l && a && (1 !== y.rangeCount || y.anchorNode !== l.node || y.anchorOffset !== l.offset || y.focusNode !== a.node || y.focusOffset !== a.offset) && ((E = E.createRange()).setStart(l.node, l.offset), 
                        y.removeAllRanges(), _ > o ? (y.addRange(E), y.extend(a.node, a.offset)) : (E.setEnd(a.node, a.offset), 
                        y.addRange(E))))), E = [];
                        for (y = v; y = y.parentNode; ) 1 === y.nodeType && E.push({
                            element: y,
                            left: y.scrollLeft,
                            top: y.scrollTop
                        });
                        for ("function" == typeof v.focus && v.focus(), v = 0; v < E.length; v++) (y = E[v]).element.scrollLeft = y.left, 
                        y.element.scrollTop = y.top;
                    }
                    Qt = !!Ur, qr = Ur = null, e.current = n, Wo = r;
                    do {
                        try {
                            for (v = e; null !== Wo; ) {
                                var C = Wo.flags;
                                if (36 & C && ho(v, Wo.alternate, Wo), 128 & C) {
                                    E = void 0;
                                    var F = Wo.ref;
                                    if (null !== F) {
                                        var A = Wo.stateNode;
                                        Wo.tag, E = A, "function" == typeof F ? F(E) : F.current = E;
                                    }
                                }
                                Wo = Wo.nextEffect;
                            }
                        } catch (e) {
                            if (null === Wo) throw Error(i(330));
                            jl(Wo, e), Wo = Wo.nextEffect;
                        }
                    } while (null !== Wo);
                    Wo = null, Pu(), No = u;
                } else e.current = n;
                if (Yo) Yo = !1, Jo = e, el = t; else for (Wo = r; null !== Wo; ) t = Wo.nextEffect, 
                Wo.nextEffect = null, 8 & Wo.flags && ((C = Wo).sibling = null, C.stateNode = null), 
                Wo = t;
                if (0 === (r = e.pendingLanes) && (Xo = null), 1 === r ? e === al ? ul++ : (ul = 0, 
                al = e) : ul = 0, n = n.stateNode, Fu && "function" == typeof Fu.onCommitFiberRoot) try {
                    Fu.onCommitFiberRoot(Cu, n, void 0, 64 == (64 & n.current.flags));
                } catch (e) {}
                if (gl(e, Hu()), Qo) throw Qo = !1, e = Zo, Zo = null, e;
                return 0 != (8 & No) || Wu(), null;
            }
            function Tl() {
                for (;null !== Wo; ) {
                    var e = Wo.alternate;
                    cl || null === sl || (0 != (8 & Wo.flags) ? et(Wo, sl) && (cl = !0) : 13 === Wo.tag && wo(e, Wo) && et(Wo, sl) && (cl = !0));
                    var t = Wo.flags;
                    0 != (256 & t) && go(e, Wo), 0 == (512 & t) || Yo || (Yo = !0, Gu(97, (function() {
                        return Ml(), null;
                    }))), Wo = Wo.nextEffect;
                }
            }
            function Ml() {
                if (90 !== el) {
                    var e = 97 < el ? 97 : el;
                    return el = 90, Vu(e, Rl);
                }
                return !1;
            }
            function Ll(e, t) {
                tl.push(t, e), Yo || (Yo = !0, Gu(97, (function() {
                    return Ml(), null;
                })));
            }
            function Il(e, t) {
                nl.push(t, e), Yo || (Yo = !0, Gu(97, (function() {
                    return Ml(), null;
                })));
            }
            function Rl() {
                if (null === Jo) return !1;
                var e = Jo;
                if (Jo = null, 0 != (48 & No)) throw Error(i(331));
                var t = No;
                No |= 32;
                var n = nl;
                nl = [];
                for (var r = 0; r < n.length; r += 2) {
                    var u = n[r], a = n[r + 1], o = u.destroy;
                    if (u.destroy = void 0, "function" == typeof o) try {
                        o();
                    } catch (e) {
                        if (null === a) throw Error(i(330));
                        jl(a, e);
                    }
                }
                for (n = tl, tl = [], r = 0; r < n.length; r += 2) {
                    u = n[r], a = n[r + 1];
                    try {
                        var l = u.create;
                        u.destroy = l();
                    } catch (e) {
                        if (null === a) throw Error(i(330));
                        jl(a, e);
                    }
                }
                for (l = e.current.firstEffect; null !== l; ) e = l.nextEffect, l.nextEffect = null, 
                8 & l.flags && (l.sibling = null, l.stateNode = null), l = e;
                return No = t, Wu(), !0;
            }
            function Pl(e, t, n) {
                da(e, t = co(0, t = lo(n, t), 1)), t = dl(), null !== (e = Dl(e, 1)) && (Ht(e, 1, t), 
                gl(e, t));
            }
            function jl(e, t) {
                if (3 === e.tag) Pl(e, e, t); else for (var n = e.return; null !== n; ) {
                    if (3 === n.tag) {
                        Pl(n, e, t);
                        break;
                    }
                    if (1 === n.tag) {
                        var r = n.stateNode;
                        if ("function" == typeof n.type.getDerivedStateFromError || "function" == typeof r.componentDidCatch && (null === Xo || !Xo.has(r))) {
                            var u = po(n, e = lo(t, e), 1);
                            if (da(n, u), u = dl(), null !== (n = Dl(n, 1))) Ht(n, 1, u), gl(n, u); else if ("function" == typeof r.componentDidCatch && (null === Xo || !Xo.has(r))) try {
                                r.componentDidCatch(t, e);
                            } catch (e) {}
                            break;
                        }
                    }
                    n = n.return;
                }
            }
            function zl(e, t, n) {
                var r = e.pingCache;
                null !== r && r.delete(t), t = dl(), e.pingedLanes |= e.suspendedLanes & n, Oo === e && (Mo & n) === n && (4 === Ro || 3 === Ro && (62914560 & Mo) === Mo && 500 > Hu() - $o ? Cl(e, 0) : qo |= n), 
                gl(e, t);
            }
            function Ul(e, t) {
                var n = e.stateNode;
                null !== n && n.delete(t), 0 == (t = 0) && (0 == (2 & (t = e.mode)) ? t = 1 : 0 == (4 & t) ? t = 99 === $u() ? 1 : 2 : (0 === ol && (ol = jo), 
                0 === (t = Ut(62914560 & ~ol)) && (t = 4194304))), n = dl(), null !== (e = Dl(e, t)) && (Ht(e, t, n), 
                gl(e, n));
            }
            function ql(e, t, n, r) {
                this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, 
                this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, 
                this.mode = r, this.flags = 0, this.lastEffect = this.firstEffect = this.nextEffect = null, 
                this.childLanes = this.lanes = 0, this.alternate = null;
            }
            function Hl(e, t, n, r) {
                return new ql(e, t, n, r);
            }
            function $l(e) {
                return !(!(e = e.prototype) || !e.isReactComponent);
            }
            function Kl(e, t) {
                var n = e.alternate;
                return null === n ? ((n = Hl(e.tag, t, e.key, e.mode)).elementType = e.elementType, 
                n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, 
                n.type = e.type, n.flags = 0, n.nextEffect = null, n.firstEffect = null, n.lastEffect = null), 
                n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, 
                n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, 
                n.dependencies = null === t ? null : {
                    lanes: t.lanes,
                    firstContext: t.firstContext
                }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
            }
            function Vl(e, t, n, r, u, a) {
                var o = 2;
                if (r = e, "function" == typeof e) $l(e) && (o = 1); else if ("string" == typeof e) o = 5; else e: switch (e) {
                  case F:
                    return Gl(n.children, u, a, t);

                  case I:
                    o = 8, u |= 16;
                    break;

                  case A:
                    o = 8, u |= 1;
                    break;

                  case x:
                    return (e = Hl(12, n, t, 8 | u)).elementType = x, e.type = x, e.lanes = a, e;

                  case S:
                    return (e = Hl(13, n, t, u)).type = S, e.elementType = S, e.lanes = a, e;

                  case N:
                    return (e = Hl(19, n, t, u)).elementType = N, e.lanes = a, e;

                  case R:
                    return Wl(n, u, a, t);

                  case P:
                    return (e = Hl(24, n, t, u)).elementType = P, e.lanes = a, e;

                  default:
                    if ("object" == typeof e && null !== e) switch (e.$$typeof) {
                      case w:
                        o = 10;
                        break e;

                      case k:
                        o = 9;
                        break e;

                      case B:
                        o = 11;
                        break e;

                      case O:
                        o = 14;
                        break e;

                      case T:
                        o = 16, r = null;
                        break e;

                      case M:
                        o = 22;
                        break e;
                    }
                    throw Error(i(130, null == e ? e : typeof e, ""));
                }
                return (t = Hl(o, n, t, u)).elementType = e, t.type = r, t.lanes = a, t;
            }
            function Gl(e, t, n, r) {
                return (e = Hl(7, e, r, t)).lanes = n, e;
            }
            function Wl(e, t, n, r) {
                return (e = Hl(23, e, r, t)).elementType = R, e.lanes = n, e;
            }
            function Ql(e, t, n) {
                return (e = Hl(6, e, null, t)).lanes = n, e;
            }
            function Zl(e, t, n) {
                return (t = Hl(4, null !== e.children ? e.children : [], e.key, t)).lanes = n, t.stateNode = {
                    containerInfo: e.containerInfo,
                    pendingChildren: null,
                    implementation: e.implementation
                }, t;
            }
            function Xl(e, t, n) {
                this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, 
                this.timeoutHandle = -1, this.pendingContext = this.context = null, this.hydrate = n, 
                this.callbackNode = null, this.callbackPriority = 0, this.eventTimes = qt(0), this.expirationTimes = qt(-1), 
                this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, 
                this.entanglements = qt(0), this.mutableSourceEagerHydrationData = null;
            }
            function Yl(e, t, n) {
                var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
                return {
                    $$typeof: C,
                    key: null == r ? null : "" + r,
                    children: e,
                    containerInfo: t,
                    implementation: n
                };
            }
            function Jl(e, t, n, r) {
                var u = t.current, a = dl(), o = pl(u);
                e: if (n) {
                    t: {
                        if (Ze(n = n._reactInternals) !== n || 1 !== n.tag) throw Error(i(170));
                        var l = n;
                        do {
                            switch (l.tag) {
                              case 3:
                                l = l.stateNode.context;
                                break t;

                              case 1:
                                if (mu(l.type)) {
                                    l = l.stateNode.__reactInternalMemoizedMergedChildContext;
                                    break t;
                                }
                            }
                            l = l.return;
                        } while (null !== l);
                        throw Error(i(171));
                    }
                    if (1 === n.tag) {
                        var s = n.type;
                        if (mu(s)) {
                            n = Eu(n, s, l);
                            break e;
                        }
                    }
                    n = l;
                } else n = pu;
                return null === t.context ? t.context = n : t.pendingContext = n, (t = ca(a, o)).payload = {
                    element: e
                }, null !== (r = void 0 === r ? null : r) && (t.callback = r), da(u, t), fl(u, o, a), 
                o;
            }
            function es(e) {
                return (e = e.current).child ? (e.child.tag, e.child.stateNode) : null;
            }
            function ts(e, t) {
                if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
                    var n = e.retryLane;
                    e.retryLane = 0 !== n && n < t ? n : t;
                }
            }
            function ns(e, t) {
                ts(e, t), (e = e.alternate) && ts(e, t);
            }
            function rs(e, t, n) {
                var r = null != n && null != n.hydrationOptions && n.hydrationOptions.mutableSources || null;
                if (n = new Xl(e, t, null != n && !0 === n.hydrate), t = Hl(3, null, null, 2 === t ? 7 : 1 === t ? 3 : 0), 
                n.current = t, t.stateNode = n, la(t), e[eu] = n.current, Or(8 === e.nodeType ? e.parentNode : e), 
                r) for (e = 0; e < r.length; e++) {
                    var u = (t = r[e])._getVersion;
                    u = u(t._source), null == n.mutableSourceEagerHydrationData ? n.mutableSourceEagerHydrationData = [ t, u ] : n.mutableSourceEagerHydrationData.push(t, u);
                }
                this._internalRoot = n;
            }
            function us(e) {
                return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue));
            }
            function as(e, t, n, r, u) {
                var a = n._reactRootContainer;
                if (a) {
                    var i = a._internalRoot;
                    if ("function" == typeof u) {
                        var o = u;
                        u = function() {
                            var e = es(i);
                            o.call(e);
                        };
                    }
                    Jl(t, i, e, u);
                } else {
                    if (a = n._reactRootContainer = function(e, t) {
                        if (t || (t = !(!(t = e ? 9 === e.nodeType ? e.documentElement : e.firstChild : null) || 1 !== t.nodeType || !t.hasAttribute("data-reactroot"))), 
                        !t) for (var n; n = e.lastChild; ) e.removeChild(n);
                        return new rs(e, 0, t ? {
                            hydrate: !0
                        } : void 0);
                    }(n, r), i = a._internalRoot, "function" == typeof u) {
                        var l = u;
                        u = function() {
                            var e = es(i);
                            l.call(e);
                        };
                    }
                    El((function() {
                        Jl(t, i, e, u);
                    }));
                }
                return es(i);
            }
            function is(e, t) {
                var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
                if (!us(t)) throw Error(i(200));
                return Yl(e, t, null, n);
            }
            Go = function(e, t, n) {
                var r = t.lanes;
                if (null !== e) if (e.memoizedProps !== t.pendingProps || Du.current) Ii = !0; else {
                    if (0 == (n & r)) {
                        switch (Ii = !1, t.tag) {
                          case 3:
                            Vi(t), Ga();
                            break;

                          case 5:
                            La(t);
                            break;

                          case 1:
                            mu(t.type) && yu(t);
                            break;

                          case 4:
                            Ta(t, t.stateNode.containerInfo);
                            break;

                          case 10:
                            r = t.memoizedProps.value;
                            var u = t.type._context;
                            du(Yu, u._currentValue), u._currentValue = r;
                            break;

                          case 13:
                            if (null !== t.memoizedState) return 0 != (n & t.child.childLanes) ? Xi(e, t, n) : (du(Ra, 1 & Ra.current), 
                            null !== (t = uo(e, t, n)) ? t.sibling : null);
                            du(Ra, 1 & Ra.current);
                            break;

                          case 19:
                            if (r = 0 != (n & t.childLanes), 0 != (64 & e.flags)) {
                                if (r) return ro(e, t, n);
                                t.flags |= 64;
                            }
                            if (null !== (u = t.memoizedState) && (u.rendering = null, u.tail = null, u.lastEffect = null), 
                            du(Ra, Ra.current), r) break;
                            return null;

                          case 23:
                          case 24:
                            return t.lanes = 0, Ui(e, t, n);
                        }
                        return uo(e, t, n);
                    }
                    Ii = 0 != (16384 & e.flags);
                } else Ii = !1;
                switch (t.lanes = 0, t.tag) {
                  case 2:
                    if (r = t.type, null !== e && (e.alternate = null, t.alternate = null, t.flags |= 2), 
                    e = t.pendingProps, u = hu(t, fu.current), aa(t, n), u = ii(null, t, r, e, u, n), 
                    t.flags |= 1, "object" == typeof u && null !== u && "function" == typeof u.render && void 0 === u.$$typeof) {
                        if (t.tag = 1, t.memoizedState = null, t.updateQueue = null, mu(r)) {
                            var a = !0;
                            yu(t);
                        } else a = !1;
                        t.memoizedState = null !== u.state && void 0 !== u.state ? u.state : null, la(t);
                        var o = r.getDerivedStateFromProps;
                        "function" == typeof o && ha(t, r, o, e), u.updater = ma, t.stateNode = u, u._reactInternals = t, 
                        ya(t, r, e, n), t = Ki(null, t, r, !0, a, n);
                    } else t.tag = 0, Ri(null, t, u, n), t = t.child;
                    return t;

                  case 16:
                    u = t.elementType;
                    e: {
                        switch (null !== e && (e.alternate = null, t.alternate = null, t.flags |= 2), e = t.pendingProps, 
                        u = (a = u._init)(u._payload), t.type = u, a = t.tag = function(e) {
                            if ("function" == typeof e) return $l(e) ? 1 : 0;
                            if (null != e) {
                                if ((e = e.$$typeof) === B) return 11;
                                if (e === O) return 14;
                            }
                            return 2;
                        }(u), e = Xu(u, e), a) {
                          case 0:
                            t = Hi(null, t, u, e, n);
                            break e;

                          case 1:
                            t = $i(null, t, u, e, n);
                            break e;

                          case 11:
                            t = Pi(null, t, u, e, n);
                            break e;

                          case 14:
                            t = ji(null, t, u, Xu(u.type, e), r, n);
                            break e;
                        }
                        throw Error(i(306, u, ""));
                    }
                    return t;

                  case 0:
                    return r = t.type, u = t.pendingProps, Hi(e, t, r, u = t.elementType === r ? u : Xu(r, u), n);

                  case 1:
                    return r = t.type, u = t.pendingProps, $i(e, t, r, u = t.elementType === r ? u : Xu(r, u), n);

                  case 3:
                    if (Vi(t), r = t.updateQueue, null === e || null === r) throw Error(i(282));
                    if (r = t.pendingProps, u = null !== (u = t.memoizedState) ? u.element : null, sa(e, t), 
                    fa(t, r, null, n), (r = t.memoizedState.element) === u) Ga(), t = uo(e, t, n); else {
                        if ((a = (u = t.stateNode).hydrate) && (za = Wr(t.stateNode.containerInfo.firstChild), 
                        ja = t, a = Ua = !0), a) {
                            if (null != (e = u.mutableSourceEagerHydrationData)) for (u = 0; u < e.length; u += 2) (a = e[u])._workInProgressVersionPrimary = e[u + 1], 
                            Wa.push(a);
                            for (n = wa(t, null, r, n), t.child = n; n; ) n.flags = -3 & n.flags | 1024, n = n.sibling;
                        } else Ri(e, t, r, n), Ga();
                        t = t.child;
                    }
                    return t;

                  case 5:
                    return La(t), null === e && $a(t), r = t.type, u = t.pendingProps, a = null !== e ? e.memoizedProps : null, 
                    o = u.children, $r(r, u) ? o = null : null !== a && $r(r, a) && (t.flags |= 16), 
                    qi(e, t), Ri(e, t, o, n), t.child;

                  case 6:
                    return null === e && $a(t), null;

                  case 13:
                    return Xi(e, t, n);

                  case 4:
                    return Ta(t, t.stateNode.containerInfo), r = t.pendingProps, null === e ? t.child = xa(t, null, r, n) : Ri(e, t, r, n), 
                    t.child;

                  case 11:
                    return r = t.type, u = t.pendingProps, Pi(e, t, r, u = t.elementType === r ? u : Xu(r, u), n);

                  case 7:
                    return Ri(e, t, t.pendingProps, n), t.child;

                  case 8:
                  case 12:
                    return Ri(e, t, t.pendingProps.children, n), t.child;

                  case 10:
                    e: {
                        r = t.type._context, u = t.pendingProps, o = t.memoizedProps, a = u.value;
                        var l = t.type._context;
                        if (du(Yu, l._currentValue), l._currentValue = a, null !== o) if (l = o.value, 0 == (a = cr(l, a) ? 0 : 0 | ("function" == typeof r._calculateChangedBits ? r._calculateChangedBits(l, a) : 1073741823))) {
                            if (o.children === u.children && !Du.current) {
                                t = uo(e, t, n);
                                break e;
                            }
                        } else for (null !== (l = t.child) && (l.return = t); null !== l; ) {
                            var s = l.dependencies;
                            if (null !== s) {
                                o = l.child;
                                for (var c = s.firstContext; null !== c; ) {
                                    if (c.context === r && 0 != (c.observedBits & a)) {
                                        1 === l.tag && ((c = ca(-1, n & -n)).tag = 2, da(l, c)), l.lanes |= n, null !== (c = l.alternate) && (c.lanes |= n), 
                                        ua(l.return, n), s.lanes |= n;
                                        break;
                                    }
                                    c = c.next;
                                }
                            } else o = 10 === l.tag && l.type === t.type ? null : l.child;
                            if (null !== o) o.return = l; else for (o = l; null !== o; ) {
                                if (o === t) {
                                    o = null;
                                    break;
                                }
                                if (null !== (l = o.sibling)) {
                                    l.return = o.return, o = l;
                                    break;
                                }
                                o = o.return;
                            }
                            l = o;
                        }
                        Ri(e, t, u.children, n), t = t.child;
                    }
                    return t;

                  case 9:
                    return u = t.type, r = (a = t.pendingProps).children, aa(t, n), r = r(u = ia(u, a.unstable_observedBits)), 
                    t.flags |= 1, Ri(e, t, r, n), t.child;

                  case 14:
                    return a = Xu(u = t.type, t.pendingProps), ji(e, t, u, a = Xu(u.type, a), r, n);

                  case 15:
                    return zi(e, t, t.type, t.pendingProps, r, n);

                  case 17:
                    return r = t.type, u = t.pendingProps, u = t.elementType === r ? u : Xu(r, u), null !== e && (e.alternate = null, 
                    t.alternate = null, t.flags |= 2), t.tag = 1, mu(r) ? (e = !0, yu(t)) : e = !1, 
                    aa(t, n), va(t, r, u), ya(t, r, u, n), Ki(null, t, r, !0, e, n);

                  case 19:
                    return ro(e, t, n);

                  case 23:
                  case 24:
                    return Ui(e, t, n);
                }
                throw Error(i(156, t.tag));
            }, rs.prototype.render = function(e) {
                Jl(e, this._internalRoot, null, null);
            }, rs.prototype.unmount = function() {
                var e = this._internalRoot, t = e.containerInfo;
                Jl(null, e, null, (function() {
                    t[eu] = null;
                }));
            }, tt = function(e) {
                13 === e.tag && (fl(e, 4, dl()), ns(e, 4));
            }, nt = function(e) {
                13 === e.tag && (fl(e, 67108864, dl()), ns(e, 67108864));
            }, rt = function(e) {
                if (13 === e.tag) {
                    var t = dl(), n = pl(e);
                    fl(e, n, t), ns(e, n);
                }
            }, ut = function(e, t) {
                return t();
            }, we = function(e, t, n) {
                switch (t) {
                  case "input":
                    if (ne(e, n), t = n.name, "radio" === n.type && null != t) {
                        for (n = e; n.parentNode; ) n = n.parentNode;
                        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), 
                        t = 0; t < n.length; t++) {
                            var r = n[t];
                            if (r !== e && r.form === e.form) {
                                var u = au(r);
                                if (!u) throw Error(i(90));
                                X(r), ne(r, u);
                            }
                        }
                    }
                    break;

                  case "textarea":
                    se(e, n);
                    break;

                  case "select":
                    null != (t = n.value) && ie(e, !!n.multiple, t, !1);
                }
            }, Te = vl, Me = function(e, t, n, r, u) {
                var a = No;
                No |= 4;
                try {
                    return Vu(98, e.bind(null, t, n, r, u));
                } finally {
                    0 === (No = a) && (Vo(), Wu());
                }
            }, Le = function() {
                0 == (49 & No) && (function() {
                    if (null !== rl) {
                        var e = rl;
                        rl = null, e.forEach((function(e) {
                            e.expiredLanes |= 24 & e.pendingLanes, gl(e, Hu());
                        }));
                    }
                    Wu();
                }(), Ml());
            }, Ie = function(e, t) {
                var n = No;
                No |= 2;
                try {
                    return e(t);
                } finally {
                    0 === (No = n) && (Vo(), Wu());
                }
            };
            var os = {
                Events: [ ru, uu, au, Ne, Oe, Ml, {
                    current: !1
                } ]
            }, ls = {
                findFiberByHostInstance: nu,
                bundleType: 0,
                version: "17.0.2",
                rendererPackageName: "react-dom"
            }, ss = {
                bundleType: ls.bundleType,
                version: ls.version,
                rendererPackageName: ls.rendererPackageName,
                rendererConfig: ls.rendererConfig,
                overrideHookState: null,
                overrideHookStateDeletePath: null,
                overrideHookStateRenamePath: null,
                overrideProps: null,
                overridePropsDeletePath: null,
                overridePropsRenamePath: null,
                setSuspenseHandler: null,
                scheduleUpdate: null,
                currentDispatcherRef: y.ReactCurrentDispatcher,
                findHostInstanceByFiber: function(e) {
                    return null === (e = Je(e)) ? null : e.stateNode;
                },
                findFiberByHostInstance: ls.findFiberByHostInstance || function() {
                    return null;
                },
                findHostInstancesForRefresh: null,
                scheduleRefresh: null,
                scheduleRoot: null,
                setRefreshHandler: null,
                getCurrentFiber: null
            };
            if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
                var cs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
                if (!cs.isDisabled && cs.supportsFiber) try {
                    Cu = cs.inject(ss), Fu = cs;
                } catch (he) {}
            }
            t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = os, t.createPortal = is, 
            t.findDOMNode = function(e) {
                if (null == e) return null;
                if (1 === e.nodeType) return e;
                var t = e._reactInternals;
                if (void 0 === t) {
                    if ("function" == typeof e.render) throw Error(i(188));
                    throw Error(i(268, Object.keys(e)));
                }
                return null === (e = Je(t)) ? null : e.stateNode;
            }, t.flushSync = function(e, t) {
                var n = No;
                if (0 != (48 & n)) return e(t);
                No |= 1;
                try {
                    if (e) return Vu(99, e.bind(null, t));
                } finally {
                    No = n, Wu();
                }
            }, t.hydrate = function(e, t, n) {
                if (!us(t)) throw Error(i(200));
                return as(null, e, t, !0, n);
            }, t.render = function(e, t, n) {
                if (!us(t)) throw Error(i(200));
                return as(null, e, t, !1, n);
            }, t.unmountComponentAtNode = function(e) {
                if (!us(e)) throw Error(i(40));
                return !!e._reactRootContainer && (El((function() {
                    as(null, null, e, !1, (function() {
                        e._reactRootContainer = null, e[eu] = null;
                    }));
                })), !0);
            }, t.unstable_batchedUpdates = vl, t.unstable_createPortal = function(e, t) {
                return is(e, t, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null);
            }, t.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
                if (!us(n)) throw Error(i(200));
                if (null == e || void 0 === e._reactInternals) throw Error(i(38));
                return as(e, t, n, !1, r);
            }, t.version = "17.0.2";
        },
        4164: function(e, t, n) {
            "use strict";
            !function e() {
                if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
                    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
                } catch (e) {}
            }(), e.exports = n(4463);
        },
        7574: function(e, t) {
            "use strict";
            /**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */            var n, r = Symbol.for("react.element"), u = Symbol.for("react.portal"), a = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), s = Symbol.for("react.context"), c = Symbol.for("react.server_context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), h = Symbol.for("react.offscreen");
            function m(e) {
                if ("object" == typeof e && null !== e) {
                    var t = e.$$typeof;
                    switch (t) {
                      case r:
                        switch (e = e.type) {
                          case a:
                          case o:
                          case i:
                          case p:
                          case f:
                            return e;

                          default:
                            switch (e = e && e.$$typeof) {
                              case c:
                              case s:
                              case d:
                              case g:
                              case D:
                              case l:
                                return e;

                              default:
                                return t;
                            }
                        }

                      case u:
                        return t;
                    }
                }
            }
            n = Symbol.for("react.module.reference"), t.ContextConsumer = s, t.ContextProvider = l, 
            t.Element = r, t.ForwardRef = d, t.Fragment = a, t.Lazy = g, t.Memo = D, t.Portal = u, 
            t.Profiler = o, t.StrictMode = i, t.Suspense = p, t.SuspenseList = f, t.isAsyncMode = function() {
                return !1;
            }, t.isConcurrentMode = function() {
                return !1;
            }, t.isContextConsumer = function(e) {
                return m(e) === s;
            }, t.isContextProvider = function(e) {
                return m(e) === l;
            }, t.isElement = function(e) {
                return "object" == typeof e && null !== e && e.$$typeof === r;
            }, t.isForwardRef = function(e) {
                return m(e) === d;
            }, t.isFragment = function(e) {
                return m(e) === a;
            }, t.isLazy = function(e) {
                return m(e) === g;
            }, t.isMemo = function(e) {
                return m(e) === D;
            }, t.isPortal = function(e) {
                return m(e) === u;
            }, t.isProfiler = function(e) {
                return m(e) === o;
            }, t.isStrictMode = function(e) {
                return m(e) === i;
            }, t.isSuspense = function(e) {
                return m(e) === p;
            }, t.isSuspenseList = function(e) {
                return m(e) === f;
            }, t.isValidElementType = function(e) {
                return "string" == typeof e || "function" == typeof e || e === a || e === o || e === i || e === p || e === f || e === h || "object" == typeof e && null !== e && (e.$$typeof === g || e.$$typeof === D || e.$$typeof === l || e.$$typeof === s || e.$$typeof === d || e.$$typeof === n || void 0 !== e.getModuleId);
            }, t.typeOf = m;
        },
        8599: function(e, t, n) {
            "use strict";
            e.exports = n(7574);
        },
        6374: function(e, t, n) {
            "use strict";
            /** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */            n(1725);
            var r = n(2791), u = 60103;
            if (t.Fragment = 60107, "function" == typeof Symbol && Symbol.for) {
                var a = Symbol.for;
                u = a("react.element"), t.Fragment = a("react.fragment");
            }
            var i = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = Object.prototype.hasOwnProperty, l = {
                key: !0,
                ref: !0,
                __self: !0,
                __source: !0
            };
            function s(e, t, n) {
                var r, a = {}, s = null, c = null;
                for (r in void 0 !== n && (s = "" + n), void 0 !== t.key && (s = "" + t.key), void 0 !== t.ref && (c = t.ref), 
                t) o.call(t, r) && !l.hasOwnProperty(r) && (a[r] = t[r]);
                if (e && e.defaultProps) for (r in t = e.defaultProps) void 0 === a[r] && (a[r] = t[r]);
                return {
                    $$typeof: u,
                    type: e,
                    key: s,
                    ref: c,
                    props: a,
                    _owner: i.current
                };
            }
            t.jsx = s, t.jsxs = s;
        },
        9117: function(e, t, n) {
            "use strict";
            /** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */            var r = n(1725), u = 60103, a = 60106;
            t.Fragment = 60107, t.StrictMode = 60108, t.Profiler = 60114;
            var i = 60109, o = 60110, l = 60112;
            t.Suspense = 60113;
            var s = 60115, c = 60116;
            if ("function" == typeof Symbol && Symbol.for) {
                var d = Symbol.for;
                u = d("react.element"), a = d("react.portal"), t.Fragment = d("react.fragment"), 
                t.StrictMode = d("react.strict_mode"), t.Profiler = d("react.profiler"), i = d("react.provider"), 
                o = d("react.context"), l = d("react.forward_ref"), t.Suspense = d("react.suspense"), 
                s = d("react.memo"), c = d("react.lazy");
            }
            var p = "function" == typeof Symbol && Symbol.iterator;
            function f(e) {
                for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
                return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
            }
            var D = {
                isMounted: function() {
                    return !1;
                },
                enqueueForceUpdate: function() {},
                enqueueReplaceState: function() {},
                enqueueSetState: function() {}
            }, g = {};
            function h(e, t, n) {
                this.props = e, this.context = t, this.refs = g, this.updater = n || D;
            }
            function m() {}
            function b(e, t, n) {
                this.props = e, this.context = t, this.refs = g, this.updater = n || D;
            }
            h.prototype.isReactComponent = {}, h.prototype.setState = function(e, t) {
                if ("object" != typeof e && "function" != typeof e && null != e) throw Error(f(85));
                this.updater.enqueueSetState(this, e, t, "setState");
            }, h.prototype.forceUpdate = function(e) {
                this.updater.enqueueForceUpdate(this, e, "forceUpdate");
            }, m.prototype = h.prototype;
            var v = b.prototype = new m;
            v.constructor = b, r(v, h.prototype), v.isPureReactComponent = !0;
            var E = {
                current: null
            }, y = Object.prototype.hasOwnProperty, _ = {
                key: !0,
                ref: !0,
                __self: !0,
                __source: !0
            };
            function C(e, t, n) {
                var r, a = {}, i = null, o = null;
                if (null != t) for (r in void 0 !== t.ref && (o = t.ref), void 0 !== t.key && (i = "" + t.key), 
                t) y.call(t, r) && !_.hasOwnProperty(r) && (a[r] = t[r]);
                var l = arguments.length - 2;
                if (1 === l) a.children = n; else if (1 < l) {
                    for (var s = Array(l), c = 0; c < l; c++) s[c] = arguments[c + 2];
                    a.children = s;
                }
                if (e && e.defaultProps) for (r in l = e.defaultProps) void 0 === a[r] && (a[r] = l[r]);
                return {
                    $$typeof: u,
                    type: e,
                    key: i,
                    ref: o,
                    props: a,
                    _owner: E.current
                };
            }
            function F(e) {
                return "object" == typeof e && null !== e && e.$$typeof === u;
            }
            var A = /\/+/g;
            function x(e, t) {
                return "object" == typeof e && null !== e && null != e.key ? function(e) {
                    var t = {
                        "=": "=0",
                        ":": "=2"
                    };
                    return "$" + e.replace(/[=:]/g, (function(e) {
                        return t[e];
                    }));
                }("" + e.key) : t.toString(36);
            }
            function w(e, t, n, r, i) {
                var o = typeof e;
                "undefined" !== o && "boolean" !== o || (e = null);
                var l = !1;
                if (null === e) l = !0; else switch (o) {
                  case "string":
                  case "number":
                    l = !0;
                    break;

                  case "object":
                    switch (e.$$typeof) {
                      case u:
                      case a:
                        l = !0;
                    }
                }
                if (l) return i = i(l = e), e = "" === r ? "." + x(l, 0) : r, Array.isArray(i) ? (n = "", 
                null != e && (n = e.replace(A, "$&/") + "/"), w(i, t, n, "", (function(e) {
                    return e;
                }))) : null != i && (F(i) && (i = function(e, t) {
                    return {
                        $$typeof: u,
                        type: e.type,
                        key: t,
                        ref: e.ref,
                        props: e.props,
                        _owner: e._owner
                    };
                }(i, n + (!i.key || l && l.key === i.key ? "" : ("" + i.key).replace(A, "$&/") + "/") + e)), 
                t.push(i)), 1;
                if (l = 0, r = "" === r ? "." : r + ":", Array.isArray(e)) for (var s = 0; s < e.length; s++) {
                    var c = r + x(o = e[s], s);
                    l += w(o, t, n, c, i);
                } else if ("function" == typeof (c = function(e) {
                    return null === e || "object" != typeof e ? null : "function" == typeof (e = p && e[p] || e["@@iterator"]) ? e : null;
                }(e))) for (e = c.call(e), s = 0; !(o = e.next()).done; ) l += w(o = o.value, t, n, c = r + x(o, s++), i); else if ("object" === o) throw t = "" + e, 
                Error(f(31, "[object Object]" === t ? "object with keys {" + Object.keys(e).join(", ") + "}" : t));
                return l;
            }
            function k(e, t, n) {
                if (null == e) return e;
                var r = [], u = 0;
                return w(e, r, "", "", (function(e) {
                    return t.call(n, e, u++);
                })), r;
            }
            function B(e) {
                if (-1 === e._status) {
                    var t = e._result;
                    t = t(), e._status = 0, e._result = t, t.then((function(t) {
                        0 === e._status && (t = t.default, e._status = 1, e._result = t);
                    }), (function(t) {
                        0 === e._status && (e._status = 2, e._result = t);
                    }));
                }
                if (1 === e._status) return e._result;
                throw e._result;
            }
            var S = {
                current: null
            };
            function N() {
                var e = S.current;
                if (null === e) throw Error(f(321));
                return e;
            }
            var O = {
                ReactCurrentDispatcher: S,
                ReactCurrentBatchConfig: {
                    transition: 0
                },
                ReactCurrentOwner: E,
                IsSomeRendererActing: {
                    current: !1
                },
                assign: r
            };
            t.Children = {
                map: k,
                forEach: function(e, t, n) {
                    k(e, (function() {
                        t.apply(this, arguments);
                    }), n);
                },
                count: function(e) {
                    var t = 0;
                    return k(e, (function() {
                        t++;
                    })), t;
                },
                toArray: function(e) {
                    return k(e, (function(e) {
                        return e;
                    })) || [];
                },
                only: function(e) {
                    if (!F(e)) throw Error(f(143));
                    return e;
                }
            }, t.Component = h, t.PureComponent = b, t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = O, 
            t.cloneElement = function(e, t, n) {
                if (null == e) throw Error(f(267, e));
                var a = r({}, e.props), i = e.key, o = e.ref, l = e._owner;
                if (null != t) {
                    if (void 0 !== t.ref && (o = t.ref, l = E.current), void 0 !== t.key && (i = "" + t.key), 
                    e.type && e.type.defaultProps) var s = e.type.defaultProps;
                    for (c in t) y.call(t, c) && !_.hasOwnProperty(c) && (a[c] = void 0 === t[c] && void 0 !== s ? s[c] : t[c]);
                }
                var c = arguments.length - 2;
                if (1 === c) a.children = n; else if (1 < c) {
                    s = Array(c);
                    for (var d = 0; d < c; d++) s[d] = arguments[d + 2];
                    a.children = s;
                }
                return {
                    $$typeof: u,
                    type: e.type,
                    key: i,
                    ref: o,
                    props: a,
                    _owner: l
                };
            }, t.createContext = function(e, t) {
                return void 0 === t && (t = null), (e = {
                    $$typeof: o,
                    _calculateChangedBits: t,
                    _currentValue: e,
                    _currentValue2: e,
                    _threadCount: 0,
                    Provider: null,
                    Consumer: null
                }).Provider = {
                    $$typeof: i,
                    _context: e
                }, e.Consumer = e;
            }, t.createElement = C, t.createFactory = function(e) {
                var t = C.bind(null, e);
                return t.type = e, t;
            }, t.createRef = function() {
                return {
                    current: null
                };
            }, t.forwardRef = function(e) {
                return {
                    $$typeof: l,
                    render: e
                };
            }, t.isValidElement = F, t.lazy = function(e) {
                return {
                    $$typeof: c,
                    _payload: {
                        _status: -1,
                        _result: e
                    },
                    _init: B
                };
            }, t.memo = function(e, t) {
                return {
                    $$typeof: s,
                    type: e,
                    compare: void 0 === t ? null : t
                };
            }, t.useCallback = function(e, t) {
                return N().useCallback(e, t);
            }, t.useContext = function(e, t) {
                return N().useContext(e, t);
            }, t.useDebugValue = function() {}, t.useEffect = function(e, t) {
                return N().useEffect(e, t);
            }, t.useImperativeHandle = function(e, t, n) {
                return N().useImperativeHandle(e, t, n);
            }, t.useLayoutEffect = function(e, t) {
                return N().useLayoutEffect(e, t);
            }, t.useMemo = function(e, t) {
                return N().useMemo(e, t);
            }, t.useReducer = function(e, t, n) {
                return N().useReducer(e, t, n);
            }, t.useRef = function(e) {
                return N().useRef(e);
            }, t.useState = function(e) {
                return N().useState(e);
            }, t.version = "17.0.2";
        },
        2791: function(e, t, n) {
            "use strict";
            e.exports = n(9117);
        },
        184: function(e, t, n) {
            "use strict";
            e.exports = n(6374);
        },
        6813: function(e, t) {
            "use strict";
            /** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */            var n, r, u, a;
            if ("object" == typeof performance && "function" == typeof performance.now) {
                var i = performance;
                t.unstable_now = function() {
                    return i.now();
                };
            } else {
                var o = Date, l = o.now();
                t.unstable_now = function() {
                    return o.now() - l;
                };
            }
            if ("undefined" == typeof window || "function" != typeof MessageChannel) {
                var s = null, c = null, d = function e() {
                    if (null !== s) try {
                        var n = t.unstable_now();
                        s(!0, n), s = null;
                    } catch (t) {
                        throw setTimeout(e, 0), t;
                    }
                };
                n = function(e) {
                    null !== s ? setTimeout(n, 0, e) : (s = e, setTimeout(d, 0));
                }, r = function(e, t) {
                    c = setTimeout(e, t);
                }, u = function() {
                    clearTimeout(c);
                }, t.unstable_shouldYield = function() {
                    return !1;
                }, a = t.unstable_forceFrameRate = function() {};
            } else {
                var p = window.setTimeout, f = window.clearTimeout;
                "undefined" != typeof console && (window.cancelAnimationFrame, window.requestAnimationFrame);
                var D = !1, g = null, h = -1, m = 5, b = 0;
                t.unstable_shouldYield = function() {
                    return t.unstable_now() >= b;
                }, a = function() {}, t.unstable_forceFrameRate = function(e) {
                    0 > e || 125 < e || (m = 0 < e ? Math.floor(1e3 / e) : 5);
                };
                var v = new MessageChannel, E = v.port2;
                v.port1.onmessage = function() {
                    if (null !== g) {
                        var e = t.unstable_now();
                        b = e + m;
                        try {
                            g(!0, e) ? E.postMessage(null) : (D = !1, g = null);
                        } catch (e) {
                            throw E.postMessage(null), e;
                        }
                    } else D = !1;
                }, n = function(e) {
                    g = e, D || (D = !0, E.postMessage(null));
                }, r = function(e, n) {
                    h = p((function() {
                        e(t.unstable_now());
                    }), n);
                }, u = function() {
                    f(h), h = -1;
                };
            }
            function y(e, t) {
                var n = e.length;
                e.push(t);
                e: for (;;) {
                    var r = n - 1 >>> 1, u = e[r];
                    if (!(void 0 !== u && 0 < F(u, t))) break e;
                    e[r] = t, e[n] = u, n = r;
                }
            }
            function _(e) {
                return void 0 === (e = e[0]) ? null : e;
            }
            function C(e) {
                var t = e[0];
                if (void 0 !== t) {
                    var n = e.pop();
                    if (n !== t) {
                        e[0] = n;
                        e: for (var r = 0, u = e.length; r < u; ) {
                            var a = 2 * (r + 1) - 1, i = e[a], o = a + 1, l = e[o];
                            if (void 0 !== i && 0 > F(i, n)) void 0 !== l && 0 > F(l, i) ? (e[r] = l, e[o] = n, 
                            r = o) : (e[r] = i, e[a] = n, r = a); else {
                                if (!(void 0 !== l && 0 > F(l, n))) break e;
                                e[r] = l, e[o] = n, r = o;
                            }
                        }
                    }
                    return t;
                }
                return null;
            }
            function F(e, t) {
                var n = e.sortIndex - t.sortIndex;
                return 0 !== n ? n : e.id - t.id;
            }
            var A = [], x = [], w = 1, k = null, B = 3, S = !1, N = !1, O = !1;
            function T(e) {
                for (var t = _(x); null !== t; ) {
                    if (null === t.callback) C(x); else {
                        if (!(t.startTime <= e)) break;
                        C(x), t.sortIndex = t.expirationTime, y(A, t);
                    }
                    t = _(x);
                }
            }
            function M(e) {
                if (O = !1, T(e), !N) if (null !== _(A)) N = !0, n(L); else {
                    var t = _(x);
                    null !== t && r(M, t.startTime - e);
                }
            }
            function L(e, n) {
                N = !1, O && (O = !1, u()), S = !0;
                var a = B;
                try {
                    for (T(n), k = _(A); null !== k && (!(k.expirationTime > n) || e && !t.unstable_shouldYield()); ) {
                        var i = k.callback;
                        if ("function" == typeof i) {
                            k.callback = null, B = k.priorityLevel;
                            var o = i(k.expirationTime <= n);
                            n = t.unstable_now(), "function" == typeof o ? k.callback = o : k === _(A) && C(A), 
                            T(n);
                        } else C(A);
                        k = _(A);
                    }
                    if (null !== k) var l = !0; else {
                        var s = _(x);
                        null !== s && r(M, s.startTime - n), l = !1;
                    }
                    return l;
                } finally {
                    k = null, B = a, S = !1;
                }
            }
            var I = a;
            t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, 
            t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, 
            t.unstable_cancelCallback = function(e) {
                e.callback = null;
            }, t.unstable_continueExecution = function() {
                N || S || (N = !0, n(L));
            }, t.unstable_getCurrentPriorityLevel = function() {
                return B;
            }, t.unstable_getFirstCallbackNode = function() {
                return _(A);
            }, t.unstable_next = function(e) {
                switch (B) {
                  case 1:
                  case 2:
                  case 3:
                    var t = 3;
                    break;

                  default:
                    t = B;
                }
                var n = B;
                B = t;
                try {
                    return e();
                } finally {
                    B = n;
                }
            }, t.unstable_pauseExecution = function() {}, t.unstable_requestPaint = I, t.unstable_runWithPriority = function(e, t) {
                switch (e) {
                  case 1:
                  case 2:
                  case 3:
                  case 4:
                  case 5:
                    break;

                  default:
                    e = 3;
                }
                var n = B;
                B = e;
                try {
                    return t();
                } finally {
                    B = n;
                }
            }, t.unstable_scheduleCallback = function(e, a, i) {
                var o = t.unstable_now();
                switch (i = "object" == typeof i && null !== i && "number" == typeof (i = i.delay) && 0 < i ? o + i : o, 
                e) {
                  case 1:
                    var l = -1;
                    break;

                  case 2:
                    l = 250;
                    break;

                  case 5:
                    l = 1073741823;
                    break;

                  case 4:
                    l = 1e4;
                    break;

                  default:
                    l = 5e3;
                }
                return e = {
                    id: w++,
                    callback: a,
                    priorityLevel: e,
                    startTime: i,
                    expirationTime: l = i + l,
                    sortIndex: -1
                }, i > o ? (e.sortIndex = i, y(x, e), null === _(A) && e === _(x) && (O ? u() : O = !0, 
                r(M, i - o))) : (e.sortIndex = l, y(A, e), N || S || (N = !0, n(L))), e;
            }, t.unstable_wrapCallback = function(e) {
                var t = B;
                return function() {
                    var n = B;
                    B = t;
                    try {
                        return e.apply(this, arguments);
                    } finally {
                        B = n;
                    }
                };
            };
        },
        5296: function(e, t, n) {
            "use strict";
            e.exports = n(6813);
        },
        6426: function(e, t, n) {
            var r = n(1065);
            function u(e, t) {
                var n, u = null;
                if (!e || "string" != typeof e) return u;
                for (var a, i, o = r(e), l = "function" == typeof t, s = 0, c = o.length; s < c; s++) a = (n = o[s]).property, 
                i = n.value, l ? t(a, i, n) : i && (u || (u = {}), u[a] = i);
                return u;
            }
            e.exports = u, e.exports.default = u;
        },
        3897: function(e) {
            e.exports = function(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
                return r;
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        5372: function(e) {
            e.exports = function(e) {
                if (Array.isArray(e)) return e;
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        3405: function(e, t, n) {
            var r = n(3897);
            e.exports = function(e) {
                if (Array.isArray(e)) return r(e);
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        6115: function(e) {
            e.exports = function(e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e;
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        6690: function(e) {
            e.exports = function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        3515: function(e, t, n) {
            var r = n(6015), u = n(9617);
            function a(t, n, i) {
                return u() ? (e.exports = a = Reflect.construct.bind(), e.exports.__esModule = !0, 
                e.exports.default = e.exports) : (e.exports = a = function(e, t, n) {
                    var u = [ null ];
                    u.push.apply(u, t);
                    var a = new (Function.bind.apply(e, u));
                    return n && r(a, n.prototype), a;
                }, e.exports.__esModule = !0, e.exports.default = e.exports), a.apply(null, arguments);
            }
            e.exports = a, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        9728: function(e) {
            function t(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            e.exports = function(e, n, r) {
                return n && t(e.prototype, n), r && t(e, r), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), e;
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        6389: function(e, t, n) {
            var r = n(3808), u = n(9617), a = n(4993);
            e.exports = function(e) {
                var t = u();
                return function() {
                    var n, u = r(e);
                    if (t) {
                        var i = r(this).constructor;
                        n = Reflect.construct(u, arguments, i);
                    } else n = u.apply(this, arguments);
                    return a(this, n);
                };
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        3808: function(e) {
            function t(n) {
                return e.exports = t = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                    return e.__proto__ || Object.getPrototypeOf(e);
                }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n);
            }
            e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        1655: function(e, t, n) {
            var r = n(6015);
            e.exports = function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && r(e, t);
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        6035: function(e) {
            e.exports = function(e) {
                return -1 !== Function.toString.call(e).indexOf("[native code]");
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        9617: function(e) {
            e.exports = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), 
                    !0;
                } catch (e) {
                    return !1;
                }
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        9498: function(e) {
            e.exports = function(e) {
                if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        8872: function(e) {
            e.exports = function(e, t) {
                var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (null != n) {
                    var r, u, a = [], i = !0, o = !1;
                    try {
                        for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0) ;
                    } catch (e) {
                        o = !0, u = e;
                    } finally {
                        try {
                            i || null == n.return || n.return();
                        } finally {
                            if (o) throw u;
                        }
                    }
                    return a;
                }
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        2218: function(e) {
            e.exports = function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        2281: function(e) {
            e.exports = function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        4993: function(e, t, n) {
            var r = n(8698).default, u = n(6115);
            e.exports = function(e, t) {
                if (t && ("object" === r(t) || "function" == typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                return u(e);
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        6015: function(e) {
            function t(n, r) {
                return e.exports = t = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                    return e.__proto__ = t, e;
                }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n, r);
            }
            e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        7424: function(e, t, n) {
            var r = n(5372), u = n(8872), a = n(6116), i = n(2218);
            e.exports = function(e, t) {
                return r(e) || u(e, t) || a(e, t) || i();
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        861: function(e, t, n) {
            var r = n(3405), u = n(9498), a = n(6116), i = n(2281);
            e.exports = function(e) {
                return r(e) || u(e) || a(e) || i();
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        8698: function(e) {
            function t(n) {
                return e.exports = t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e;
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n);
            }
            e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        6116: function(e, t, n) {
            var r = n(3897);
            e.exports = function(e, t) {
                if (e) {
                    if ("string" == typeof e) return r(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(e, t) : void 0;
                }
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        3496: function(e, t, n) {
            var r = n(3808), u = n(6015), a = n(6035), i = n(3515);
            function o(t) {
                var n = "function" == typeof Map ? new Map : void 0;
                return e.exports = o = function(e) {
                    if (null === e || !a(e)) return e;
                    if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
                    if (void 0 !== n) {
                        if (n.has(e)) return n.get(e);
                        n.set(e, t);
                    }
                    function t() {
                        return i(e, arguments, r(this).constructor);
                    }
                    return t.prototype = Object.create(e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), u(t, e);
                }, e.exports.__esModule = !0, e.exports.default = e.exports, o(t);
            }
            e.exports = o, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        566: function(e, t, n) {
            var r = n(3496).default, u = n(7424).default, a = n(1655).default, i = n(6389).default, o = n(861).default, l = n(6690).default, s = n(9728).default, c = {
                exports: {}
            };
            function d(e) {
                return e instanceof Map ? e.clear = e.delete = e.set = function() {
                    throw new Error("map is read-only");
                } : e instanceof Set && (e.add = e.clear = e.delete = function() {
                    throw new Error("set is read-only");
                }), Object.freeze(e), Object.getOwnPropertyNames(e).forEach((function(t) {
                    var n = e[t];
                    "object" != typeof n || Object.isFrozen(n) || d(n);
                })), e;
            }
            c.exports = d, c.exports.default = d;
            var p = function() {
                "use strict";
                function e(t) {
                    l(this, e), void 0 === t.data && (t.data = {}), this.data = t.data, this.isMatchIgnored = !1;
                }
                return s(e, [ {
                    key: "ignoreMatch",
                    value: function() {
                        this.isMatchIgnored = !0;
                    }
                } ]), e;
            }();
            function f(e) {
                return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
            }
            function D(e) {
                var t = Object.create(null);
                for (var n in e) t[n] = e[n];
                for (var r = arguments.length, u = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) u[a - 1] = arguments[a];
                return u.forEach((function(e) {
                    for (var n in e) t[n] = e[n];
                })), t;
            }
            var g = function(e) {
                return !!e.scope || e.sublanguage && e.language;
            }, h = function() {
                "use strict";
                function e(t, n) {
                    l(this, e), this.buffer = "", this.classPrefix = n.classPrefix, t.walk(this);
                }
                return s(e, [ {
                    key: "addText",
                    value: function(e) {
                        this.buffer += f(e);
                    }
                }, {
                    key: "openNode",
                    value: function(e) {
                        if (g(e)) {
                            var t;
                            t = e.sublanguage ? "language-".concat(e.language) : function(e, t) {
                                var n = t.prefix;
                                if (e.includes(".")) {
                                    var r = e.split(".");
                                    return [ "".concat(n).concat(r.shift()) ].concat(o(r.map((function(e, t) {
                                        return "".concat(e).concat("_".repeat(t + 1));
                                    })))).join(" ");
                                }
                                return "".concat(n).concat(e);
                            }(e.scope, {
                                prefix: this.classPrefix
                            }), this.span(t);
                        }
                    }
                }, {
                    key: "closeNode",
                    value: function(e) {
                        g(e) && (this.buffer += "</span>");
                    }
                }, {
                    key: "value",
                    value: function() {
                        return this.buffer;
                    }
                }, {
                    key: "span",
                    value: function(e) {
                        this.buffer += '<span class="'.concat(e, '">');
                    }
                } ]), e;
            }(), m = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = {
                    children: []
                };
                return Object.assign(t, e), t;
            }, b = function(e) {
                "use strict";
                a(n, e);
                var t = i(n);
                function n(e) {
                    var r;
                    return l(this, n), (r = t.call(this)).options = e, r;
                }
                return s(n, [ {
                    key: "addKeyword",
                    value: function(e, t) {
                        "" !== e && (this.openNode(t), this.addText(e), this.closeNode());
                    }
                }, {
                    key: "addText",
                    value: function(e) {
                        "" !== e && this.add(e);
                    }
                }, {
                    key: "addSublanguage",
                    value: function(e, t) {
                        var n = e.root;
                        n.sublanguage = !0, n.language = t, this.add(n);
                    }
                }, {
                    key: "toHTML",
                    value: function() {
                        return new h(this, this.options).value();
                    }
                }, {
                    key: "finalize",
                    value: function() {
                        return !0;
                    }
                } ]), n;
            }(function() {
                "use strict";
                function e() {
                    l(this, e), this.rootNode = m(), this.stack = [ this.rootNode ];
                }
                return s(e, [ {
                    key: "top",
                    get: function() {
                        return this.stack[this.stack.length - 1];
                    }
                }, {
                    key: "root",
                    get: function() {
                        return this.rootNode;
                    }
                }, {
                    key: "add",
                    value: function(e) {
                        this.top.children.push(e);
                    }
                }, {
                    key: "openNode",
                    value: function(e) {
                        var t = m({
                            scope: e
                        });
                        this.add(t), this.stack.push(t);
                    }
                }, {
                    key: "closeNode",
                    value: function() {
                        if (this.stack.length > 1) return this.stack.pop();
                    }
                }, {
                    key: "closeAllNodes",
                    value: function() {
                        for (;this.closeNode(); ) ;
                    }
                }, {
                    key: "toJSON",
                    value: function() {
                        return JSON.stringify(this.rootNode, null, 4);
                    }
                }, {
                    key: "walk",
                    value: function(e) {
                        return this.constructor._walk(e, this.rootNode);
                    }
                } ], [ {
                    key: "_walk",
                    value: function(e, t) {
                        var n = this;
                        return "string" == typeof t ? e.addText(t) : t.children && (e.openNode(t), t.children.forEach((function(t) {
                            return n._walk(e, t);
                        })), e.closeNode(t)), e;
                    }
                }, {
                    key: "_collapse",
                    value: function(t) {
                        "string" != typeof t && t.children && (t.children.every((function(e) {
                            return "string" == typeof e;
                        })) ? t.children = [ t.children.join("") ] : t.children.forEach((function(t) {
                            e._collapse(t);
                        })));
                    }
                } ]), e;
            }());
            function v(e) {
                return e ? "string" == typeof e ? e : e.source : null;
            }
            function E(e) {
                return C("(?=", e, ")");
            }
            function y(e) {
                return C("(?:", e, ")*");
            }
            function _(e) {
                return C("(?:", e, ")?");
            }
            function C() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                var r = t.map((function(e) {
                    return v(e);
                })).join("");
                return r;
            }
            function F(e) {
                var t = e[e.length - 1];
                return "object" == typeof t && t.constructor === Object ? (e.splice(e.length - 1, 1), 
                t) : {};
            }
            function A() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                var r = F(t), u = "(" + (r.capture ? "" : "?:") + t.map((function(e) {
                    return v(e);
                })).join("|") + ")";
                return u;
            }
            function x(e) {
                return new RegExp(e.toString() + "|").exec("").length - 1;
            }
            var w = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
            function k(e, t) {
                var n = t.joinWith, r = 0;
                return e.map((function(e) {
                    for (var t = r += 1, n = v(e), u = ""; n.length > 0; ) {
                        var a = w.exec(n);
                        if (!a) {
                            u += n;
                            break;
                        }
                        u += n.substring(0, a.index), n = n.substring(a.index + a[0].length), "\\" === a[0][0] && a[1] ? u += "\\" + String(Number(a[1]) + t) : (u += a[0], 
                        "(" === a[0] && r++);
                    }
                    return u;
                })).map((function(e) {
                    return "(".concat(e, ")");
                })).join(n);
            }
            var B = "[a-zA-Z]\\w*", S = "[a-zA-Z_]\\w*", N = "\\b\\d+(\\.\\d+)?", O = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", T = "\\b(0b[01]+)", M = {
                begin: "\\\\[\\s\\S]",
                relevance: 0
            }, L = {
                scope: "string",
                begin: "'",
                end: "'",
                illegal: "\\n",
                contains: [ M ]
            }, I = {
                scope: "string",
                begin: '"',
                end: '"',
                illegal: "\\n",
                contains: [ M ]
            }, R = function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = D({
                    scope: "comment",
                    begin: e,
                    end: t,
                    contains: []
                }, n);
                r.contains.push({
                    scope: "doctag",
                    begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
                    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
                    excludeBegin: !0,
                    relevance: 0
                });
                var u = A("I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, /[A-Za-z]+[-][a-z]+/, /[A-Za-z][a-z]{2,}/);
                return r.contains.push({
                    begin: C(/[ ]+/, "(", u, /[.]?[:]?([.][ ]|[ ])/, "){3}")
                }), r;
            }, P = R("//", "$"), j = R("/\\*", "\\*/"), z = R("#", "$"), U = {
                scope: "number",
                begin: N,
                relevance: 0
            }, q = {
                scope: "number",
                begin: O,
                relevance: 0
            }, H = {
                scope: "number",
                begin: T,
                relevance: 0
            }, $ = {
                begin: /(?=\/[^/\n]*\/)/,
                contains: [ {
                    scope: "regexp",
                    begin: /\//,
                    end: /\/[gimuy]*/,
                    illegal: /\n/,
                    contains: [ M, {
                        begin: /\[/,
                        end: /\]/,
                        relevance: 0,
                        contains: [ M ]
                    } ]
                } ]
            }, K = {
                scope: "title",
                begin: B,
                relevance: 0
            }, V = {
                scope: "title",
                begin: S,
                relevance: 0
            }, W = Object.freeze({
                __proto__: null,
                MATCH_NOTHING_RE: /\b\B/,
                IDENT_RE: B,
                UNDERSCORE_IDENT_RE: S,
                NUMBER_RE: N,
                C_NUMBER_RE: O,
                BINARY_NUMBER_RE: T,
                RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
                SHEBANG: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = /^#![ ]*\//;
                    return e.binary && (e.begin = C(t, /.*\b/, e.binary, /\b.*/)), D({
                        scope: "meta",
                        begin: t,
                        end: /$/,
                        relevance: 0,
                        "on:begin": function(e, t) {
                            0 !== e.index && t.ignoreMatch();
                        }
                    }, e);
                },
                BACKSLASH_ESCAPE: M,
                APOS_STRING_MODE: L,
                QUOTE_STRING_MODE: I,
                PHRASAL_WORDS_MODE: {
                    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
                },
                COMMENT: R,
                C_LINE_COMMENT_MODE: P,
                C_BLOCK_COMMENT_MODE: j,
                HASH_COMMENT_MODE: z,
                NUMBER_MODE: U,
                C_NUMBER_MODE: q,
                BINARY_NUMBER_MODE: H,
                REGEXP_MODE: $,
                TITLE_MODE: K,
                UNDERSCORE_TITLE_MODE: V,
                METHOD_GUARD: {
                    begin: "\\.\\s*[a-zA-Z_]\\w*",
                    relevance: 0
                },
                END_SAME_AS_BEGIN: function(e) {
                    return Object.assign(e, {
                        "on:begin": function(e, t) {
                            t.data._beginMatch = e[1];
                        },
                        "on:end": function(e, t) {
                            t.data._beginMatch !== e[1] && t.ignoreMatch();
                        }
                    });
                }
            });
            function Q(e, t) {
                "." === e.input[e.index - 1] && t.ignoreMatch();
            }
            function Z(e, t) {
                void 0 !== e.className && (e.scope = e.className, delete e.className);
            }
            function X(e, t) {
                t && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", 
                e.__beforeBegin = Q, e.keywords = e.keywords || e.beginKeywords, delete e.beginKeywords, 
                void 0 === e.relevance && (e.relevance = 0));
            }
            function Y(e, t) {
                Array.isArray(e.illegal) && (e.illegal = A.apply(void 0, o(e.illegal)));
            }
            function J(e, t) {
                if (e.match) {
                    if (e.begin || e.end) throw new Error("begin & end are not supported with match");
                    e.begin = e.match, delete e.match;
                }
            }
            function ee(e, t) {
                void 0 === e.relevance && (e.relevance = 1);
            }
            var te = function(e, t) {
                if (e.beforeMatch) {
                    if (e.starts) throw new Error("beforeMatch cannot be used with starts");
                    var n = Object.assign({}, e);
                    Object.keys(e).forEach((function(t) {
                        delete e[t];
                    })), e.keywords = n.keywords, e.begin = C(n.beforeMatch, E(n.begin)), e.starts = {
                        relevance: 0,
                        contains: [ Object.assign(n, {
                            endsParent: !0
                        }) ]
                    }, e.relevance = 0, delete n.beforeMatch;
                }
            }, ne = [ "of", "and", "for", "in", "not", "or", "if", "then", "parent", "list", "value" ], re = "keyword";
            function ue(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : re, r = Object.create(null);
                return "string" == typeof e ? u(n, e.split(" ")) : Array.isArray(e) ? u(n, e) : Object.keys(e).forEach((function(n) {
                    Object.assign(r, ue(e[n], t, n));
                })), r;
                function u(e, n) {
                    t && (n = n.map((function(e) {
                        return e.toLowerCase();
                    }))), n.forEach((function(t) {
                        var n = t.split("|");
                        r[n[0]] = [ e, ae(n[0], n[1]) ];
                    }));
                }
            }
            function ae(e, t) {
                return t ? Number(t) : function(e) {
                    return ne.includes(e.toLowerCase());
                }(e) ? 0 : 1;
            }
            var ie = {}, oe = function(e) {
                for (var t, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), u = 1; u < n; u++) r[u - 1] = arguments[u];
                (t = console).log.apply(t, [ "WARN: ".concat(e) ].concat(r));
            }, le = function(e, t) {
                ie["".concat(e, "/").concat(t)] || (ie["".concat(e, "/").concat(t)] = !0);
            }, se = new Error;
            function ce(e, t, n) {
                for (var r = n.key, u = 0, a = e[r], i = {}, o = {}, l = 1; l <= t.length; l++) o[l + u] = a[l], 
                i[l + u] = !0, u += x(t[l - 1]);
                e[r] = o, e[r]._emit = i, e[r]._multi = !0;
            }
            function de(e) {
                !function(e) {
                    e.scope && "object" == typeof e.scope && null !== e.scope && (e.beginScope = e.scope, 
                    delete e.scope);
                }(e), "string" == typeof e.beginScope && (e.beginScope = {
                    _wrap: e.beginScope
                }), "string" == typeof e.endScope && (e.endScope = {
                    _wrap: e.endScope
                }), function(e) {
                    if (Array.isArray(e.begin)) {
                        if (e.skip || e.excludeBegin || e.returnBegin) throw se;
                        if ("object" != typeof e.beginScope || null === e.beginScope) throw se;
                        ce(e, e.begin, {
                            key: "beginScope"
                        }), e.begin = k(e.begin, {
                            joinWith: ""
                        });
                    }
                }(e), function(e) {
                    if (Array.isArray(e.end)) {
                        if (e.skip || e.excludeEnd || e.returnEnd) throw se;
                        if ("object" != typeof e.endScope || null === e.endScope) throw se;
                        ce(e, e.end, {
                            key: "endScope"
                        }), e.end = k(e.end, {
                            joinWith: ""
                        });
                    }
                }(e);
            }
            function pe(e) {
                function t(t, n) {
                    return new RegExp(v(t), "m" + (e.case_insensitive ? "i" : "") + (e.unicodeRegex ? "u" : "") + (n ? "g" : ""));
                }
                var n = function() {
                    "use strict";
                    function e() {
                        l(this, e), this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
                    }
                    return s(e, [ {
                        key: "addRule",
                        value: function(e, t) {
                            t.position = this.position++, this.matchIndexes[this.matchAt] = t, this.regexes.push([ t, e ]), 
                            this.matchAt += x(e) + 1;
                        }
                    }, {
                        key: "compile",
                        value: function() {
                            0 === this.regexes.length && (this.exec = function() {
                                return null;
                            });
                            var e = this.regexes.map((function(e) {
                                return e[1];
                            }));
                            this.matcherRe = t(k(e, {
                                joinWith: "|"
                            }), !0), this.lastIndex = 0;
                        }
                    }, {
                        key: "exec",
                        value: function(e) {
                            this.matcherRe.lastIndex = this.lastIndex;
                            var t = this.matcherRe.exec(e);
                            if (!t) return null;
                            var n = t.findIndex((function(e, t) {
                                return t > 0 && void 0 !== e;
                            })), r = this.matchIndexes[n];
                            return t.splice(0, n), Object.assign(t, r);
                        }
                    } ]), e;
                }(), r = function() {
                    "use strict";
                    function e() {
                        l(this, e), this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, 
                        this.regexIndex = 0;
                    }
                    return s(e, [ {
                        key: "getMatcher",
                        value: function(e) {
                            if (this.multiRegexes[e]) return this.multiRegexes[e];
                            var t = new n;
                            return this.rules.slice(e).forEach((function(e) {
                                var n = u(e, 2), r = n[0], a = n[1];
                                return t.addRule(r, a);
                            })), t.compile(), this.multiRegexes[e] = t, t;
                        }
                    }, {
                        key: "resumingScanAtSamePosition",
                        value: function() {
                            return 0 !== this.regexIndex;
                        }
                    }, {
                        key: "considerAll",
                        value: function() {
                            this.regexIndex = 0;
                        }
                    }, {
                        key: "addRule",
                        value: function(e, t) {
                            this.rules.push([ e, t ]), "begin" === t.type && this.count++;
                        }
                    }, {
                        key: "exec",
                        value: function(e) {
                            var t = this.getMatcher(this.regexIndex);
                            t.lastIndex = this.lastIndex;
                            var n = t.exec(e);
                            if (this.resumingScanAtSamePosition()) if (n && n.index === this.lastIndex) ; else {
                                var r = this.getMatcher(0);
                                r.lastIndex = this.lastIndex + 1, n = r.exec(e);
                            }
                            return n && (this.regexIndex += n.position + 1, this.regexIndex === this.count && this.considerAll()), 
                            n;
                        }
                    } ]), e;
                }();
                if (e.compilerExtensions || (e.compilerExtensions = []), e.contains && e.contains.includes("self")) throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
                return e.classNameAliases = D(e.classNameAliases || {}), function n(u, a) {
                    var i, l = u;
                    if (u.isCompiled) return l;
                    [ Z, J, de, te ].forEach((function(e) {
                        return e(u, a);
                    })), e.compilerExtensions.forEach((function(e) {
                        return e(u, a);
                    })), u.__beforeBegin = null, [ X, Y, ee ].forEach((function(e) {
                        return e(u, a);
                    })), u.isCompiled = !0;
                    var s = null;
                    return "object" == typeof u.keywords && u.keywords.$pattern && (u.keywords = Object.assign({}, u.keywords), 
                    s = u.keywords.$pattern, delete u.keywords.$pattern), s = s || /\w+/, u.keywords && (u.keywords = ue(u.keywords, e.case_insensitive)), 
                    l.keywordPatternRe = t(s, !0), a && (u.begin || (u.begin = /\B|\b/), l.beginRe = t(l.begin), 
                    u.end || u.endsWithParent || (u.end = /\B|\b/), u.end && (l.endRe = t(l.end)), l.terminatorEnd = v(l.end) || "", 
                    u.endsWithParent && a.terminatorEnd && (l.terminatorEnd += (u.end ? "|" : "") + a.terminatorEnd)), 
                    u.illegal && (l.illegalRe = t(u.illegal)), u.contains || (u.contains = []), u.contains = (i = []).concat.apply(i, o(u.contains.map((function(e) {
                        return function(e) {
                            return e.variants && !e.cachedVariants && (e.cachedVariants = e.variants.map((function(t) {
                                return D(e, {
                                    variants: null
                                }, t);
                            }))), e.cachedVariants ? e.cachedVariants : fe(e) ? D(e, {
                                starts: e.starts ? D(e.starts) : null
                            }) : Object.isFrozen(e) ? D(e) : e;
                        }("self" === e ? u : e);
                    })))), u.contains.forEach((function(e) {
                        n(e, l);
                    })), u.starts && n(u.starts, a), l.matcher = function(e) {
                        var t = new r;
                        return e.contains.forEach((function(e) {
                            return t.addRule(e.begin, {
                                rule: e,
                                type: "begin"
                            });
                        })), e.terminatorEnd && t.addRule(e.terminatorEnd, {
                            type: "end"
                        }), e.illegal && t.addRule(e.illegal, {
                            type: "illegal"
                        }), t;
                    }(l), l;
                }(e);
            }
            function fe(e) {
                return !!e && (e.endsWithParent || fe(e.starts));
            }
            var De = function(e) {
                "use strict";
                a(n, e);
                var t = i(n);
                function n(e, r) {
                    var u;
                    return l(this, n), (u = t.call(this, e)).name = "HTMLInjectionError", u.html = r, 
                    u;
                }
                return s(n);
            }(r(Error)), ge = f, he = D, me = Symbol("nomatch"), be = function(e) {
                var t = Object.create(null), n = Object.create(null), r = [], a = !0, i = "Could not find the language '{}', did you forget to load/include a language module?", o = {
                    disableAutodetect: !0,
                    name: "Plain text",
                    contains: []
                }, l = {
                    ignoreUnescapedHTML: !1,
                    throwUnescapedHTML: !1,
                    noHighlightRe: /^(no-?highlight)$/i,
                    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
                    classPrefix: "hljs-",
                    cssSelector: "pre code",
                    languages: null,
                    __emitter: b
                };
                function s(e) {
                    return l.noHighlightRe.test(e);
                }
                function d(e, t, n) {
                    var r = "", u = "";
                    "object" == typeof t ? (r = e, n = t.ignoreIllegals, u = t.language) : (le("10.7.0", "highlight(lang, code, ...args) has been deprecated."), 
                    le("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"), 
                    u = e, r = t), void 0 === n && (n = !0);
                    var a = {
                        code: r,
                        language: u
                    };
                    w("before:highlight", a);
                    var i = a.result ? a.result : f(a.language, a.code, n);
                    return i.code = a.code, w("after:highlight", i), i;
                }
                function f(e, n, r, o) {
                    var s = Object.create(null);
                    function c() {
                        if (x.keywords) {
                            var e = 0;
                            x.keywordPatternRe.lastIndex = 0;
                            for (var t, n = x.keywordPatternRe.exec(B), r = ""; n; ) {
                                r += B.substring(e, n.index);
                                var a = C.case_insensitive ? n[0].toLowerCase() : n[0], i = (t = a, x.keywords[t]);
                                if (i) {
                                    var o = u(i, 2), l = o[0], c = o[1];
                                    if (k.addText(r), r = "", s[a] = (s[a] || 0) + 1, s[a] <= 7 && (S += c), l.startsWith("_")) r += n[0]; else {
                                        var d = C.classNameAliases[l] || l;
                                        k.addKeyword(n[0], d);
                                    }
                                } else r += n[0];
                                e = x.keywordPatternRe.lastIndex, n = x.keywordPatternRe.exec(B);
                            }
                            r += B.substring(e), k.addText(r);
                        } else k.addText(B);
                    }
                    function d() {
                        null != x.subLanguage ? function() {
                            if ("" !== B) {
                                var e = null;
                                if ("string" == typeof x.subLanguage) {
                                    if (!t[x.subLanguage]) return void k.addText(B);
                                    e = f(x.subLanguage, B, !0, w[x.subLanguage]), w[x.subLanguage] = e._top;
                                } else e = D(B, x.subLanguage.length ? x.subLanguage : null);
                                x.relevance > 0 && (S += e.relevance), k.addSublanguage(e._emitter, e.language);
                            }
                        }() : c(), B = "";
                    }
                    function g(e, t) {
                        for (var n = 1, r = t.length - 1; n <= r; ) if (e._emit[n]) {
                            var u = C.classNameAliases[e[n]] || e[n], a = t[n];
                            u ? k.addKeyword(a, u) : (B = a, c(), B = ""), n++;
                        } else n++;
                    }
                    function h(e, t) {
                        return e.scope && "string" == typeof e.scope && k.openNode(C.classNameAliases[e.scope] || e.scope), 
                        e.beginScope && (e.beginScope._wrap ? (k.addKeyword(B, C.classNameAliases[e.beginScope._wrap] || e.beginScope._wrap), 
                        B = "") : e.beginScope._multi && (g(e.beginScope, t), B = "")), x = Object.create(e, {
                            parent: {
                                value: x
                            }
                        });
                    }
                    function m(e, t, n) {
                        var r = function(e, t) {
                            var n = e && e.exec(t);
                            return n && 0 === n.index;
                        }(e.endRe, n);
                        if (r) {
                            if (e["on:end"]) {
                                var u = new p(e);
                                e["on:end"](t, u), u.isMatchIgnored && (r = !1);
                            }
                            if (r) {
                                for (;e.endsParent && e.parent; ) e = e.parent;
                                return e;
                            }
                        }
                        if (e.endsWithParent) return m(e.parent, t, n);
                    }
                    function b(e) {
                        return 0 === x.matcher.regexIndex ? (B += e[0], 1) : (T = !0, 0);
                    }
                    function E(e) {
                        var t = e[0], r = n.substring(e.index), u = m(x, e, r);
                        if (!u) return me;
                        var a = x;
                        x.endScope && x.endScope._wrap ? (d(), k.addKeyword(t, x.endScope._wrap)) : x.endScope && x.endScope._multi ? (d(), 
                        g(x.endScope, e)) : a.skip ? B += t : (a.returnEnd || a.excludeEnd || (B += t), 
                        d(), a.excludeEnd && (B = t));
                        do {
                            x.scope && k.closeNode(), x.skip || x.subLanguage || (S += x.relevance), x = x.parent;
                        } while (x !== u.parent);
                        return u.starts && h(u.starts, e), a.returnEnd ? 0 : t.length;
                    }
                    var y = {};
                    function _(t, u) {
                        var i = u && u[0];
                        if (B += t, null == i) return d(), 0;
                        if ("begin" === y.type && "end" === u.type && y.index === u.index && "" === i) {
                            if (B += n.slice(u.index, u.index + 1), !a) {
                                var o = new Error("0 width match regex (".concat(e, ")"));
                                throw o.languageName = e, o.badRule = y.rule, o;
                            }
                            return 1;
                        }
                        if (y = u, "begin" === u.type) return function(e) {
                            for (var t = e[0], n = e.rule, r = new p(n), u = 0, a = [ n.__beforeBegin, n["on:begin"] ]; u < a.length; u++) {
                                var i = a[u];
                                if (i && (i(e, r), r.isMatchIgnored)) return b(t);
                            }
                            return n.skip ? B += t : (n.excludeBegin && (B += t), d(), n.returnBegin || n.excludeBegin || (B = t)), 
                            h(n, e), n.returnBegin ? 0 : t.length;
                        }(u);
                        if ("illegal" === u.type && !r) {
                            var l = new Error('Illegal lexeme "' + i + '" for mode "' + (x.scope || "<unnamed>") + '"');
                            throw l.mode = x, l;
                        }
                        if ("end" === u.type) {
                            var s = E(u);
                            if (s !== me) return s;
                        }
                        if ("illegal" === u.type && "" === i) return 1;
                        if (O > 1e5 && O > 3 * u.index) throw new Error("potential infinite loop, way more iterations than matches");
                        return B += i, i.length;
                    }
                    var C = v(e);
                    if (!C) throw i.replace("{}", e), new Error('Unknown language: "' + e + '"');
                    var F = pe(C), A = "", x = o || F, w = {}, k = new l.__emitter(l);
                    !function() {
                        for (var e = [], t = x; t !== C; t = t.parent) t.scope && e.unshift(t.scope);
                        e.forEach((function(e) {
                            return k.openNode(e);
                        }));
                    }();
                    var B = "", S = 0, N = 0, O = 0, T = !1;
                    try {
                        for (x.matcher.considerAll(); ;) {
                            O++, T ? T = !1 : x.matcher.considerAll(), x.matcher.lastIndex = N;
                            var M = x.matcher.exec(n);
                            if (!M) break;
                            var L = _(n.substring(N, M.index), M);
                            N = M.index + L;
                        }
                        return _(n.substring(N)), k.closeAllNodes(), k.finalize(), A = k.toHTML(), {
                            language: e,
                            value: A,
                            relevance: S,
                            illegal: !1,
                            _emitter: k,
                            _top: x
                        };
                    } catch (t) {
                        if (t.message && t.message.includes("Illegal")) return {
                            language: e,
                            value: ge(n),
                            illegal: !0,
                            relevance: 0,
                            _illegalBy: {
                                message: t.message,
                                index: N,
                                context: n.slice(N - 100, N + 100),
                                mode: t.mode,
                                resultSoFar: A
                            },
                            _emitter: k
                        };
                        if (a) return {
                            language: e,
                            value: ge(n),
                            illegal: !1,
                            relevance: 0,
                            errorRaised: t,
                            _emitter: k,
                            _top: x
                        };
                        throw t;
                    }
                }
                function D(e, n) {
                    n = n || l.languages || Object.keys(t);
                    var r = function(e) {
                        var t = {
                            value: ge(e),
                            illegal: !1,
                            relevance: 0,
                            _top: o,
                            _emitter: new l.__emitter(l)
                        };
                        return t._emitter.addText(e), t;
                    }(e), a = n.filter(v).filter(x).map((function(t) {
                        return f(t, e, !1);
                    }));
                    a.unshift(r);
                    var i = a.sort((function(e, t) {
                        if (e.relevance !== t.relevance) return t.relevance - e.relevance;
                        if (e.language && t.language) {
                            if (v(e.language).supersetOf === t.language) return 1;
                            if (v(t.language).supersetOf === e.language) return -1;
                        }
                        return 0;
                    })), s = u(i, 2), c = s[0], d = s[1], p = c;
                    return p.secondBest = d, p;
                }
                function g(e) {
                    var t = function(e) {
                        var t = e.className + " ";
                        t += e.parentNode ? e.parentNode.className : "";
                        var n = l.languageDetectRe.exec(t);
                        if (n) {
                            var r = v(n[1]);
                            return r || (oe(i.replace("{}", n[1])), oe("Falling back to no-highlight mode for this block.", e)), 
                            r ? n[1] : "no-highlight";
                        }
                        return t.split(/\s+/).find((function(e) {
                            return s(e) || v(e);
                        }));
                    }(e);
                    if (!s(t)) {
                        if (w("before:highlightElement", {
                            el: e,
                            language: t
                        }), e.children.length > 0 && (l.ignoreUnescapedHTML, l.throwUnescapedHTML)) throw new De("One of your code blocks includes unescaped HTML.", e.innerHTML);
                        var r = e.textContent, u = t ? d(r, {
                            language: t,
                            ignoreIllegals: !0
                        }) : D(r);
                        e.innerHTML = u.value, function(e, t, r) {
                            var u = t && n[t] || r;
                            e.classList.add("hljs"), e.classList.add("language-".concat(u));
                        }(e, t, u.language), e.result = {
                            language: u.language,
                            re: u.relevance,
                            relevance: u.relevance
                        }, u.secondBest && (e.secondBest = {
                            language: u.secondBest.language,
                            relevance: u.secondBest.relevance
                        }), w("after:highlightElement", {
                            el: e,
                            result: u,
                            text: r
                        });
                    }
                }
                var h = !1;
                function m() {
                    "loading" !== document.readyState ? document.querySelectorAll(l.cssSelector).forEach(g) : h = !0;
                }
                function v(e) {
                    return e = (e || "").toLowerCase(), t[e] || t[n[e]];
                }
                function F(e, t) {
                    var r = t.languageName;
                    "string" == typeof e && (e = [ e ]), e.forEach((function(e) {
                        n[e.toLowerCase()] = r;
                    }));
                }
                function x(e) {
                    var t = v(e);
                    return t && !t.disableAutodetect;
                }
                function w(e, t) {
                    var n = e;
                    r.forEach((function(e) {
                        e[n] && e[n](t);
                    }));
                }
                for (var k in "undefined" != typeof window && window.addEventListener && window.addEventListener("DOMContentLoaded", (function() {
                    h && m();
                }), !1), Object.assign(e, {
                    highlight: d,
                    highlightAuto: D,
                    highlightAll: m,
                    highlightElement: g,
                    highlightBlock: function(e) {
                        return le("10.7.0", "highlightBlock will be removed entirely in v12.0"), le("10.7.0", "Please use highlightElement now."), 
                        g(e);
                    },
                    configure: function(e) {
                        l = he(l, e);
                    },
                    initHighlighting: function() {
                        m(), le("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
                    },
                    initHighlightingOnLoad: function() {
                        m(), le("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
                    },
                    registerLanguage: function(n, r) {
                        var u = null;
                        try {
                            u = r(e);
                        } catch (e) {
                            if ("Language definition for '{}' could not be registered.".replace("{}", n), !a) throw e;
                            u = o;
                        }
                        u.name || (u.name = n), t[n] = u, u.rawDefinition = r.bind(null, e), u.aliases && F(u.aliases, {
                            languageName: n
                        });
                    },
                    unregisterLanguage: function(e) {
                        delete t[e];
                        for (var r = 0, u = Object.keys(n); r < u.length; r++) {
                            var a = u[r];
                            n[a] === e && delete n[a];
                        }
                    },
                    listLanguages: function() {
                        return Object.keys(t);
                    },
                    getLanguage: v,
                    registerAliases: F,
                    autoDetection: x,
                    inherit: he,
                    addPlugin: function(e) {
                        !function(e) {
                            e["before:highlightBlock"] && !e["before:highlightElement"] && (e["before:highlightElement"] = function(t) {
                                e["before:highlightBlock"](Object.assign({
                                    block: t.el
                                }, t));
                            }), e["after:highlightBlock"] && !e["after:highlightElement"] && (e["after:highlightElement"] = function(t) {
                                e["after:highlightBlock"](Object.assign({
                                    block: t.el
                                }, t));
                            });
                        }(e), r.push(e);
                    }
                }), e.debugMode = function() {
                    a = !1;
                }, e.safeMode = function() {
                    a = !0;
                }, e.versionString = "11.7.0", e.regex = {
                    concat: C,
                    lookahead: E,
                    either: A,
                    optional: _,
                    anyNumberOfTimes: y
                }, W) "object" == typeof W[k] && c.exports(W[k]);
                return Object.assign(e, W), e;
            }({});
            e.exports = be, be.HighlightJS = be, be.default = be;
        }
    }, t = {};
    function n(r) {
        var u = t[r];
        if (void 0 !== u) return u.exports;
        var a = t[r] = {
            exports: {}
        };
        return e[r](a, a.exports, n), a.exports;
    }
    n.d = function(e, t) {
        for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
            enumerable: !0,
            get: t[r]
        });
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, function() {
        "use strict";
        var e = {};
        n.r(e), n.d(e, {
            attentionMarkers: function() {
                return Xt;
            },
            contentInitial: function() {
                return Kt;
            },
            disable: function() {
                return Yt;
            },
            document: function() {
                return $t;
            },
            flow: function() {
                return Gt;
            },
            flowInitial: function() {
                return Vt;
            },
            insideSpan: function() {
                return Zt;
            },
            string: function() {
                return Wt;
            },
            text: function() {
                return Qt;
            }
        });
        var t = {};
        function r(e) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            })(e);
        }
        function u() {
            /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
            u = function() {
                return e;
            };
            var e = {}, t = Object.prototype, n = t.hasOwnProperty, a = "function" == typeof Symbol ? Symbol : {}, i = a.iterator || "@@iterator", o = a.asyncIterator || "@@asyncIterator", l = a.toStringTag || "@@toStringTag";
            function s(e, t, n) {
                return Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }), e[t];
            }
            try {
                s({}, "");
            } catch (e) {
                s = function(e, t, n) {
                    return e[t] = n;
                };
            }
            function c(e, t, n, r) {
                var u = t && t.prototype instanceof f ? t : f, a = Object.create(u.prototype), i = new A(r || []);
                return a._invoke = function(e, t, n) {
                    var r = "suspendedStart";
                    return function(u, a) {
                        if ("executing" === r) throw new Error("Generator is already running");
                        if ("completed" === r) {
                            if ("throw" === u) throw a;
                            return {
                                value: void 0,
                                done: !0
                            };
                        }
                        for (n.method = u, n.arg = a; ;) {
                            var i = n.delegate;
                            if (i) {
                                var o = _(i, n);
                                if (o) {
                                    if (o === p) continue;
                                    return o;
                                }
                            }
                            if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                                if ("suspendedStart" === r) throw r = "completed", n.arg;
                                n.dispatchException(n.arg);
                            } else "return" === n.method && n.abrupt("return", n.arg);
                            r = "executing";
                            var l = d(e, t, n);
                            if ("normal" === l.type) {
                                if (r = n.done ? "completed" : "suspendedYield", l.arg === p) continue;
                                return {
                                    value: l.arg,
                                    done: n.done
                                };
                            }
                            "throw" === l.type && (r = "completed", n.method = "throw", n.arg = l.arg);
                        }
                    };
                }(e, n, i), a;
            }
            function d(e, t, n) {
                try {
                    return {
                        type: "normal",
                        arg: e.call(t, n)
                    };
                } catch (e) {
                    return {
                        type: "throw",
                        arg: e
                    };
                }
            }
            e.wrap = c;
            var p = {};
            function f() {}
            function D() {}
            function g() {}
            var h = {};
            s(h, i, (function() {
                return this;
            }));
            var m = Object.getPrototypeOf, b = m && m(m(x([])));
            b && b !== t && n.call(b, i) && (h = b);
            var v = g.prototype = f.prototype = Object.create(h);
            function E(e) {
                [ "next", "throw", "return" ].forEach((function(t) {
                    s(e, t, (function(e) {
                        return this._invoke(t, e);
                    }));
                }));
            }
            function y(e, t) {
                function u(a, i, o, l) {
                    var s = d(e[a], e, i);
                    if ("throw" !== s.type) {
                        var c = s.arg, p = c.value;
                        return p && "object" == r(p) && n.call(p, "__await") ? t.resolve(p.__await).then((function(e) {
                            u("next", e, o, l);
                        }), (function(e) {
                            u("throw", e, o, l);
                        })) : t.resolve(p).then((function(e) {
                            c.value = e, o(c);
                        }), (function(e) {
                            return u("throw", e, o, l);
                        }));
                    }
                    l(s.arg);
                }
                var a;
                this._invoke = function(e, n) {
                    function r() {
                        return new t((function(t, r) {
                            u(e, n, t, r);
                        }));
                    }
                    return a = a ? a.then(r, r) : r();
                };
            }
            function _(e, t) {
                var n = e.iterator[t.method];
                if (void 0 === n) {
                    if (t.delegate = null, "throw" === t.method) {
                        if (e.iterator.return && (t.method = "return", t.arg = void 0, _(e, t), "throw" === t.method)) return p;
                        t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method");
                    }
                    return p;
                }
                var r = d(n, e.iterator, t.arg);
                if ("throw" === r.type) return t.method = "throw", t.arg = r.arg, t.delegate = null, 
                p;
                var u = r.arg;
                return u ? u.done ? (t[e.resultName] = u.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", 
                t.arg = void 0), t.delegate = null, p) : u : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), 
                t.delegate = null, p);
            }
            function C(e) {
                var t = {
                    tryLoc: e[0]
                };
                1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), 
                this.tryEntries.push(t);
            }
            function F(e) {
                var t = e.completion || {};
                t.type = "normal", delete t.arg, e.completion = t;
            }
            function A(e) {
                this.tryEntries = [ {
                    tryLoc: "root"
                } ], e.forEach(C, this), this.reset(!0);
            }
            function x(e) {
                if (e) {
                    var t = e[i];
                    if (t) return t.call(e);
                    if ("function" == typeof e.next) return e;
                    if (!isNaN(e.length)) {
                        var r = -1, u = function t() {
                            for (;++r < e.length; ) if (n.call(e, r)) return t.value = e[r], t.done = !1, t;
                            return t.value = void 0, t.done = !0, t;
                        };
                        return u.next = u;
                    }
                }
                return {
                    next: w
                };
            }
            function w() {
                return {
                    value: void 0,
                    done: !0
                };
            }
            return D.prototype = g, s(v, "constructor", g), s(g, "constructor", D), D.displayName = s(g, l, "GeneratorFunction"), 
            e.isGeneratorFunction = function(e) {
                var t = "function" == typeof e && e.constructor;
                return !!t && (t === D || "GeneratorFunction" === (t.displayName || t.name));
            }, e.mark = function(e) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(e, g) : (e.__proto__ = g, s(e, l, "GeneratorFunction")), 
                e.prototype = Object.create(v), e;
            }, e.awrap = function(e) {
                return {
                    __await: e
                };
            }, E(y.prototype), s(y.prototype, o, (function() {
                return this;
            })), e.AsyncIterator = y, e.async = function(t, n, r, u, a) {
                void 0 === a && (a = Promise);
                var i = new y(c(t, n, r, u), a);
                return e.isGeneratorFunction(n) ? i : i.next().then((function(e) {
                    return e.done ? e.value : i.next();
                }));
            }, E(v), s(v, l, "Generator"), s(v, i, (function() {
                return this;
            })), s(v, "toString", (function() {
                return "[object Generator]";
            })), e.keys = function(e) {
                var t = [];
                for (var n in e) t.push(n);
                return t.reverse(), function n() {
                    for (;t.length; ) {
                        var r = t.pop();
                        if (r in e) return n.value = r, n.done = !1, n;
                    }
                    return n.done = !0, n;
                };
            }, e.values = x, A.prototype = {
                constructor: A,
                reset: function(e) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, 
                    this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(F), 
                    !e) for (var t in this) "t" === t.charAt(0) && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0);
                },
                stop: function() {
                    this.done = !0;
                    var e = this.tryEntries[0].completion;
                    if ("throw" === e.type) throw e.arg;
                    return this.rval;
                },
                dispatchException: function(e) {
                    if (this.done) throw e;
                    var t = this;
                    function r(n, r) {
                        return i.type = "throw", i.arg = e, t.next = n, r && (t.method = "next", t.arg = void 0), 
                        !!r;
                    }
                    for (var u = this.tryEntries.length - 1; u >= 0; --u) {
                        var a = this.tryEntries[u], i = a.completion;
                        if ("root" === a.tryLoc) return r("end");
                        if (a.tryLoc <= this.prev) {
                            var o = n.call(a, "catchLoc"), l = n.call(a, "finallyLoc");
                            if (o && l) {
                                if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                                if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                            } else if (o) {
                                if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                            } else {
                                if (!l) throw new Error("try statement without catch or finally");
                                if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                            }
                        }
                    }
                },
                abrupt: function(e, t) {
                    for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                        var u = this.tryEntries[r];
                        if (u.tryLoc <= this.prev && n.call(u, "finallyLoc") && this.prev < u.finallyLoc) {
                            var a = u;
                            break;
                        }
                    }
                    a && ("break" === e || "continue" === e) && a.tryLoc <= t && t <= a.finallyLoc && (a = null);
                    var i = a ? a.completion : {};
                    return i.type = e, i.arg = t, a ? (this.method = "next", this.next = a.finallyLoc, 
                    p) : this.complete(i);
                },
                complete: function(e, t) {
                    if ("throw" === e.type) throw e.arg;
                    return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, 
                    this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), 
                    p;
                },
                finish: function(e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var n = this.tryEntries[t];
                        if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), F(n), p;
                    }
                },
                catch: function(e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var n = this.tryEntries[t];
                        if (n.tryLoc === e) {
                            var r = n.completion;
                            if ("throw" === r.type) {
                                var u = r.arg;
                                F(n);
                            }
                            return u;
                        }
                    }
                    throw new Error("illegal catch attempt");
                },
                delegateYield: function(e, t, n) {
                    return this.delegate = {
                        iterator: x(e),
                        resultName: t,
                        nextLoc: n
                    }, "next" === this.method && (this.arg = void 0), p;
                }
            }, e;
        }
        function a(e, t, n, r, u, a, i) {
            try {
                var o = e[a](i), l = o.value;
            } catch (e) {
                return void n(e);
            }
            o.done ? t(l) : Promise.resolve(l).then(r, u);
        }
        function i(e) {
            return function() {
                var t = this, n = arguments;
                return new Promise((function(r, u) {
                    var i = e.apply(t, n);
                    function o(e) {
                        a(i, r, u, o, l, "next", e);
                    }
                    function l(e) {
                        a(i, r, u, o, l, "throw", e);
                    }
                    o(void 0);
                }));
            };
        }
        n.r(t), n.d(t, {
            boolean: function() {
                return Kn;
            },
            booleanish: function() {
                return Vn;
            },
            commaOrSpaceSeparated: function() {
                return Xn;
            },
            commaSeparated: function() {
                return Zn;
            },
            number: function() {
                return Wn;
            },
            overloadedBoolean: function() {
                return Gn;
            },
            spaceSeparated: function() {
                return Qn;
            }
        });
        var o = n(2791), l = n(4164);
        function s(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
            return r;
        }
        function c(e, t) {
            if (e) {
                if ("string" == typeof e) return s(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s(e, t) : void 0;
            }
        }
        function d(e, t) {
            var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (!n) {
                if (Array.isArray(e) || (n = c(e)) || t && e && "number" == typeof e.length) {
                    n && (e = n);
                    var r = 0, u = function() {};
                    return {
                        s: u,
                        n: function() {
                            return r >= e.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: e[r++]
                            };
                        },
                        e: function(e) {
                            throw e;
                        },
                        f: u
                    };
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            var a, i = !0, o = !1;
            return {
                s: function() {
                    n = n.call(e);
                },
                n: function() {
                    var e = n.next();
                    return i = e.done, e;
                },
                e: function(e) {
                    o = !0, a = e;
                },
                f: function() {
                    try {
                        i || null == n.return || n.return();
                    } finally {
                        if (o) throw a;
                    }
                }
            };
        }
        function p(e) {
            this.wrapped = e;
        }
        function f(e) {
            var t, n;
            function r(t, n) {
                try {
                    var a = e[t](n), i = a.value, o = i instanceof p;
                    Promise.resolve(o ? i.wrapped : i).then((function(e) {
                        o ? r("return" === t ? "return" : "next", e) : u(a.done ? "return" : "normal", e);
                    }), (function(e) {
                        r("throw", e);
                    }));
                } catch (e) {
                    u("throw", e);
                }
            }
            function u(e, u) {
                switch (e) {
                  case "return":
                    t.resolve({
                        value: u,
                        done: !0
                    });
                    break;

                  case "throw":
                    t.reject(u);
                    break;

                  default:
                    t.resolve({
                        value: u,
                        done: !1
                    });
                }
                (t = t.next) ? r(t.key, t.arg) : n = null;
            }
            this._invoke = function(e, u) {
                return new Promise((function(a, i) {
                    var o = {
                        key: e,
                        arg: u,
                        resolve: a,
                        reject: i,
                        next: null
                    };
                    n ? n = n.next = o : (t = n = o, r(e, u));
                }));
            }, "function" != typeof e.return && (this.return = void 0);
        }
        function D() {
            var e = "CHROME";
            return navigator.userAgentData.brands.forEach((function(t) {
                t.brand.toLowerCase().includes("edge") && (e = "EDGE");
            })), e;
        }
        function g(e) {
            var t, n = d(e);
            try {
                for (n.s(); !(t = n.n()).done; ) {
                    var r = t.value, u = document.querySelector(r);
                    if (u) return u;
                }
            } catch (e) {
                n.e(e);
            } finally {
                n.f();
            }
        }
        function h() {
            return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        f.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
            return this;
        }, f.prototype.next = function(e) {
            return this._invoke("next", e);
        }, f.prototype.throw = function(e) {
            return this._invoke("throw", e);
        }, f.prototype.return = function(e) {
            return this._invoke("return", e);
        };
        var m = {
            google: {
                inputQuery: [ "input[name='q']" ],
                sidebarContainerQuery: [ "#rhs" ],
                appendContainerQuery: [ "#rcnt" ]
            },
            bing: {
                inputQuery: [ "[name='q']" ],
                sidebarContainerQuery: [ "#b_context" ],
                appendContainerQuery: [],
                sidebarStyle: {
                    width: 472,
                    marginLeft: -20
                }
            },
            yahoo: {
                inputQuery: [ "input[name='p']" ],
                sidebarContainerQuery: [ "#right", ".Contents__inner.Contents__inner--sub" ],
                appendContainerQuery: [ "#cols", "#contents__wrap" ],
                sidebarStyle: {
                    width: 442
                }
            },
            duckduckgo: {
                inputQuery: [ "input[name='q']" ],
                sidebarContainerQuery: [ ".results--sidebar.js-results-sidebar" ],
                appendContainerQuery: [ "#links_wrapper" ],
                sidebarStyle: {
                    width: 448
                }
            },
            baidu: {
                inputQuery: [ "input[name='wd']" ],
                sidebarContainerQuery: [ "#content_right" ],
                appendContainerQuery: [ "#container" ],
                watchRouteChange: function(e) {
                    var t = document.getElementById("wrapper_wrapper");
                    new MutationObserver((function(t) {
                        var n, r = d(t);
                        try {
                            for (r.s(); !(n = r.n()).done; ) {
                                var u = n.value;
                                if ("childList" === u.type) {
                                    var a, i = d(u.addedNodes);
                                    try {
                                        for (i.s(); !(a = i.n()).done; ) {
                                            var o = a.value;
                                            if ("id" in o && "container" === o.id) return void e();
                                        }
                                    } catch (e) {
                                        i.e(e);
                                    } finally {
                                        i.f();
                                    }
                                }
                            }
                        } catch (e) {
                            r.e(e);
                        } finally {
                            r.f();
                        }
                    })).observe(t, {
                        childList: !0
                    });
                }
            },
            kagi: {
                inputQuery: [ "input[name='q']" ],
                sidebarContainerQuery: [ ".right-content-box ._0_right_sidebar" ],
                appendContainerQuery: [ "#_0_app_content" ]
            },
            yandex: {
                inputQuery: [ "input[name='text']" ],
                sidebarContainerQuery: [ "#search-result-aside" ],
                appendContainerQuery: []
            },
            naver: {
                inputQuery: [ "input[name='query']" ],
                sidebarContainerQuery: [ "#sub_pack" ],
                appendContainerQuery: [ "#content" ],
                sidebarStyle: {
                    width: 400,
                    marginLeft: 16
                }
            },
            brave: {
                inputQuery: [ "input[name='q']" ],
                sidebarContainerQuery: [ "#side-right" ],
                appendContainerQuery: []
            },
            searx: {
                inputQuery: [ "input[name='q']" ],
                sidebarContainerQuery: [ "#sidebar_results" ],
                appendContainerQuery: []
            }
        };
        function b(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        function v(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(e, r.key, r);
            }
        }
        function E(e, t, n) {
            return t && v(e.prototype, t), n && v(e, n), Object.defineProperty(e, "prototype", {
                writable: !1
            }), e;
        }
        function y(e, t) {
            return (y = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function _(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && y(e, t);
        }
        function C(e) {
            return (C = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        function F() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), 
                !0;
            } catch (e) {
                return !1;
            }
        }
        function A(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
        }
        function x(e, t) {
            if (t && ("object" === r(t) || "function" == typeof t)) return t;
            if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
            return A(e);
        }
        function w(e) {
            var t = F();
            return function() {
                var n, r = C(e);
                if (t) {
                    var u = C(this).constructor;
                    n = Reflect.construct(r, arguments, u);
                } else n = r.apply(this, arguments);
                return x(this, n);
            };
        }
        function B(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e;
        }
        function S(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), n.push.apply(n, r);
            }
            return n;
        }
        function N(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? S(Object(n), !0).forEach((function(t) {
                    B(e, t, n[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : S(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                }));
            }
            return e;
        }
        function O(e) {
            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
        }
        function T(e) {
            return function(e) {
                if (Array.isArray(e)) return s(e);
            }(e) || O(e) || c(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }();
        }
        var M = n(5586);
        function L(e, t, n) {
            return (L = F() ? Reflect.construct.bind() : function(e, t, n) {
                var r = [ null ];
                r.push.apply(r, t);
                var u = new (Function.bind.apply(e, r));
                return n && y(u, n.prototype), u;
            }).apply(null, arguments);
        }
        function I(e) {
            var t = "function" == typeof Map ? new Map : void 0;
            return (I = function(e) {
                if (null === e || (n = e, -1 === Function.toString.call(n).indexOf("[native code]"))) return e;
                var n;
                if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
                if (void 0 !== t) {
                    if (t.has(e)) return t.get(e);
                    t.set(e, r);
                }
                function r() {
                    return L(e, arguments, C(this).constructor);
                }
                return r.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: r,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), y(r, e);
            })(e);
        }
        function R(e) {
            return e && "object" == typeof e ? "position" in e || "type" in e ? j(e.position) : "start" in e || "end" in e ? j(e) : "line" in e || "column" in e ? P(e) : "" : "";
        }
        function P(e) {
            return z(e && e.line) + ":" + z(e && e.column);
        }
        function j(e) {
            return P(e && e.start) + "-" + P(e && e.end);
        }
        function z(e) {
            return e && "number" == typeof e ? e : 1;
        }
        var U = function(e) {
            _(n, e);
            var t = w(n);
            function n(e, r, u) {
                var a;
                b(this, n);
                var i = [ null, null ], o = {
                    start: {
                        line: null,
                        column: null
                    },
                    end: {
                        line: null,
                        column: null
                    }
                };
                if (a = t.call(this), "string" == typeof r && (u = r, r = void 0), "string" == typeof u) {
                    var l = u.indexOf(":");
                    -1 === l ? i[1] = u : (i[0] = u.slice(0, l), i[1] = u.slice(l + 1));
                }
                return r && ("type" in r || "position" in r ? r.position && (o = r.position) : "start" in r || "end" in r ? o = r : ("line" in r || "column" in r) && (o.start = r)), 
                a.name = R(r) || "1:1", a.message = "object" == typeof e ? e.message : e, a.stack = "", 
                "object" == typeof e && e.stack && (a.stack = e.stack), a.reason = a.message, a.fatal, 
                a.line = o.start.line, a.column = o.start.column, a.position = o, a.source = i[0], 
                a.ruleId = i[1], a.file, a.actual, a.expected, a.url, a.note, a;
            }
            return E(n);
        }(I(Error));
        U.prototype.file = "", U.prototype.name = "", U.prototype.reason = "", U.prototype.message = "", 
        U.prototype.stack = "", U.prototype.fatal = null, U.prototype.column = null, U.prototype.line = null, 
        U.prototype.source = null, U.prototype.ruleId = null, U.prototype.position = null;
        var q_basename = function(e, t) {
            if (void 0 !== t && "string" != typeof t) throw new TypeError('"ext" argument must be a string');
            $(e);
            var n, r = 0, u = -1, a = e.length;
            if (void 0 === t || 0 === t.length || t.length > e.length) {
                for (;a--; ) if (47 === e.charCodeAt(a)) {
                    if (n) {
                        r = a + 1;
                        break;
                    }
                } else u < 0 && (n = !0, u = a + 1);
                return u < 0 ? "" : e.slice(r, u);
            }
            if (t === e) return "";
            for (var i = -1, o = t.length - 1; a--; ) if (47 === e.charCodeAt(a)) {
                if (n) {
                    r = a + 1;
                    break;
                }
            } else i < 0 && (n = !0, i = a + 1), o > -1 && (e.charCodeAt(a) === t.charCodeAt(o--) ? o < 0 && (u = a) : (o = -1, 
            u = i));
            return r === u ? u = i : u < 0 && (u = e.length), e.slice(r, u);
        }, q_dirname = function(e) {
            if ($(e), 0 === e.length) return ".";
            for (var t, n = -1, r = e.length; --r; ) if (47 === e.charCodeAt(r)) {
                if (t) {
                    n = r;
                    break;
                }
            } else t || (t = !0);
            return n < 0 ? 47 === e.charCodeAt(0) ? "/" : "." : 1 === n && 47 === e.charCodeAt(0) ? "//" : e.slice(0, n);
        }, q_extname = function(e) {
            $(e);
            for (var t, n = e.length, r = -1, u = 0, a = -1, i = 0; n--; ) {
                var o = e.charCodeAt(n);
                if (47 !== o) r < 0 && (t = !0, r = n + 1), 46 === o ? a < 0 ? a = n : 1 !== i && (i = 1) : a > -1 && (i = -1); else if (t) {
                    u = n + 1;
                    break;
                }
            }
            return a < 0 || r < 0 || 0 === i || 1 === i && a === r - 1 && a === u + 1 ? "" : e.slice(a, r);
        }, q_join = function() {
            for (var e, t = -1, n = arguments.length, r = new Array(n), u = 0; u < n; u++) r[u] = arguments[u];
            for (;++t < r.length; ) $(r[t]), r[t] && (e = void 0 === e ? r[t] : e + "/" + r[t]);
            return void 0 === e ? "." : H(e);
        }, q_sep = "/";
        function H(e) {
            $(e);
            var t = 47 === e.charCodeAt(0), n = function(e, t) {
                for (var n, r, u = "", a = 0, i = -1, o = 0, l = -1; ++l <= e.length; ) {
                    if (l < e.length) n = e.charCodeAt(l); else {
                        if (47 === n) break;
                        n = 47;
                    }
                    if (47 === n) {
                        if (i === l - 1 || 1 === o) ; else if (i !== l - 1 && 2 === o) {
                            if (u.length < 2 || 2 !== a || 46 !== u.charCodeAt(u.length - 1) || 46 !== u.charCodeAt(u.length - 2)) if (u.length > 2) {
                                if ((r = u.lastIndexOf("/")) !== u.length - 1) {
                                    r < 0 ? (u = "", a = 0) : a = (u = u.slice(0, r)).length - 1 - u.lastIndexOf("/"), 
                                    i = l, o = 0;
                                    continue;
                                }
                            } else if (u.length > 0) {
                                u = "", a = 0, i = l, o = 0;
                                continue;
                            }
                            t && (u = u.length > 0 ? u + "/.." : "..", a = 2);
                        } else u.length > 0 ? u += "/" + e.slice(i + 1, l) : u = e.slice(i + 1, l), a = l - i - 1;
                        i = l, o = 0;
                    } else 46 === n && o > -1 ? o++ : o = -1;
                }
                return u;
            }(e, !t);
            return 0 !== n.length || t || (n = "."), n.length > 0 && 47 === e.charCodeAt(e.length - 1) && (n += "/"), 
            t ? "/" + n : n;
        }
        function $(e) {
            if ("string" != typeof e) throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
        }
        var K_cwd = function() {
            return "/";
        };
        function V(e) {
            return null !== e && "object" == typeof e && e.href && e.origin;
        }
        var W = [ "history", "path", "basename", "stem", "extname", "dirname" ], Q = function() {
            function e(t) {
                var n;
                b(this, e), n = t ? "string" == typeof t || function(e) {
                    return M(e);
                }(t) ? {
                    value: t
                } : V(t) ? {
                    path: t
                } : t : {}, this.data = {}, this.messages = [], this.history = [], this.cwd = K_cwd(), 
                this.value, this.stored, this.result, this.map;
                for (var r, u = -1; ++u < W.length; ) {
                    var a = W[u];
                    a in n && void 0 !== n[a] && null !== n[a] && (this[a] = "history" === a ? T(n[a]) : n[a]);
                }
                for (r in n) W.includes(r) || (this[r] = n[r]);
            }
            return E(e, [ {
                key: "path",
                get: function() {
                    return this.history[this.history.length - 1];
                },
                set: function(e) {
                    V(e) && (e = function(e) {
                        if ("string" == typeof e) e = new URL(e); else if (!V(e)) {
                            var t = new TypeError('The "path" argument must be of type string or an instance of URL. Received `' + e + "`");
                            throw t.code = "ERR_INVALID_ARG_TYPE", t;
                        }
                        if ("file:" !== e.protocol) {
                            var n = new TypeError("The URL must be of scheme file");
                            throw n.code = "ERR_INVALID_URL_SCHEME", n;
                        }
                        return function(e) {
                            if ("" !== e.hostname) {
                                var t = new TypeError('File URL host must be "localhost" or empty on darwin');
                                throw t.code = "ERR_INVALID_FILE_URL_HOST", t;
                            }
                            for (var n = e.pathname, r = -1; ++r < n.length; ) if (37 === n.charCodeAt(r) && 50 === n.charCodeAt(r + 1)) {
                                var u = n.charCodeAt(r + 2);
                                if (70 === u || 102 === u) {
                                    var a = new TypeError("File URL path must not include encoded / characters");
                                    throw a.code = "ERR_INVALID_FILE_URL_PATH", a;
                                }
                            }
                            return decodeURIComponent(n);
                        }(e);
                    }(e)), X(e, "path"), this.path !== e && this.history.push(e);
                }
            }, {
                key: "dirname",
                get: function() {
                    return "string" == typeof this.path ? q_dirname(this.path) : void 0;
                },
                set: function(e) {
                    Y(this.basename, "dirname"), this.path = q_join(e || "", this.basename);
                }
            }, {
                key: "basename",
                get: function() {
                    return "string" == typeof this.path ? q_basename(this.path) : void 0;
                },
                set: function(e) {
                    X(e, "basename"), Z(e, "basename"), this.path = q_join(this.dirname || "", e);
                }
            }, {
                key: "extname",
                get: function() {
                    return "string" == typeof this.path ? q_extname(this.path) : void 0;
                },
                set: function(e) {
                    if (Z(e, "extname"), Y(this.dirname, "extname"), e) {
                        if (46 !== e.charCodeAt(0)) throw new Error("`extname` must start with `.`");
                        if (e.includes(".", 1)) throw new Error("`extname` cannot contain multiple dots");
                    }
                    this.path = q_join(this.dirname, this.stem + (e || ""));
                }
            }, {
                key: "stem",
                get: function() {
                    return "string" == typeof this.path ? q_basename(this.path, this.extname) : void 0;
                },
                set: function(e) {
                    X(e, "stem"), Z(e, "stem"), this.path = q_join(this.dirname || "", e + (this.extname || ""));
                }
            }, {
                key: "toString",
                value: function(e) {
                    return (this.value || "").toString(e || void 0);
                }
            }, {
                key: "message",
                value: function(e, t, n) {
                    var r = new U(e, t, n);
                    return this.path && (r.name = this.path + ":" + r.name, r.file = this.path), r.fatal = !1, 
                    this.messages.push(r), r;
                }
            }, {
                key: "info",
                value: function(e, t, n) {
                    var r = this.message(e, t, n);
                    return r.fatal = null, r;
                }
            }, {
                key: "fail",
                value: function(e, t, n) {
                    var r = this.message(e, t, n);
                    throw r.fatal = !0, r;
                }
            } ]), e;
        }();
        function Z(e, t) {
            if (e && e.includes(q_sep)) throw new Error("`" + t + "` cannot be a path: did not expect `" + q_sep + "`");
        }
        function X(e, t) {
            if (!e) throw new Error("`" + t + "` cannot be empty");
        }
        function Y(e, t) {
            if (!e) throw new Error("Setting `" + t + "` requires `path` to be set too");
        }
        function J(e) {
            if (Array.isArray(e)) return e;
        }
        function ee() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function te(e) {
            return J(e) || O(e) || c(e) || ee();
        }
        function ne(e) {
            if (e) throw e;
        }
        var re = n(1132);
        function ue(e) {
            if ("object" != typeof e || null === e) return !1;
            var t = Object.getPrototypeOf(e);
            return !(null !== t && t !== Object.prototype && null !== Object.getPrototypeOf(t) || Symbol.toStringTag in e || Symbol.iterator in e);
        }
        function ae(e, t) {
            var n;
            return function() {
                for (var t = arguments.length, a = new Array(t), i = 0; i < t; i++) a[i] = arguments[i];
                var o, l = e.length > a.length;
                l && a.push(r);
                try {
                    o = e.apply(this, a);
                } catch (e) {
                    var s = e;
                    if (l && n) throw s;
                    return r(s);
                }
                l || (o instanceof Promise ? o.then(u, r) : o instanceof Error ? r(o) : u(o));
            };
            function r(e) {
                if (!n) {
                    n = !0;
                    for (var r = arguments.length, u = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) u[a - 1] = arguments[a];
                    t.apply(void 0, [ e ].concat(u));
                }
            }
            function u(e) {
                r(null, e);
            }
        }
        var ie = function e() {
            var t, i, o, n = (i = [], o = {
                run: function() {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    var r = -1, u = t.pop();
                    if ("function" != typeof u) throw new TypeError("Expected function as last argument, not " + u);
                    function a(e) {
                        var n = i[++r], o = -1;
                        if (e) u(e); else {
                            for (var l = arguments.length, s = new Array(l > 1 ? l - 1 : 0), c = 1; c < l; c++) s[c - 1] = arguments[c];
                            for (;++o < t.length; ) null !== s[o] && void 0 !== s[o] || (s[o] = t[o]);
                            t = s, n ? ae(n, a).apply(void 0, s) : u.apply(void 0, [ null ].concat(s));
                        }
                    }
                    a.apply(void 0, [ null ].concat(T(t)));
                },
                use: function(e) {
                    if ("function" != typeof e) throw new TypeError("Expected `middelware` to be a function, not " + e);
                    return i.push(e), o;
                }
            }), r = [], u = {}, a = -1;
            return l.data = function(e, n) {
                return "string" == typeof e ? 2 === arguments.length ? (de("data", t), u[e] = n, 
                l) : oe.call(u, e) && u[e] || null : e ? (de("data", t), u = e, l) : u;
            }, l.Parser = void 0, l.Compiler = void 0, l.freeze = function() {
                if (t) return l;
                for (;++a < r.length; ) {
                    var e = te(r[a]), u = e[0], i = e.slice(1);
                    if (!1 !== i[0]) {
                        !0 === i[0] && (i[0] = void 0);
                        var o = u.call.apply(u, [ l ].concat(T(i)));
                        "function" == typeof o && n.use(o);
                    }
                }
                return t = !0, a = Number.POSITIVE_INFINITY, l;
            }, l.attachers = r, l.use = function(e) {
                for (var n = arguments.length, a = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) a[i - 1] = arguments[i];
                var o;
                if (de("use", t), null == e) ; else if ("function" == typeof e) p.apply(void 0, [ e ].concat(a)); else {
                    if ("object" != typeof e) throw new TypeError("Expected usable value, not `" + e + "`");
                    Array.isArray(e) ? d(e) : c(e);
                }
                return o && (u.settings = Object.assign(u.settings || {}, o)), l;
                function s(e) {
                    if ("function" == typeof e) p(e); else {
                        if ("object" != typeof e) throw new TypeError("Expected usable value, not `" + e + "`");
                        if (Array.isArray(e)) {
                            var t = te(e), n = t[0], r = t.slice(1);
                            p.apply(void 0, [ n ].concat(T(r)));
                        } else c(e);
                    }
                }
                function c(e) {
                    d(e.plugins), e.settings && (o = Object.assign(o || {}, e.settings));
                }
                function d(e) {
                    var t = -1;
                    if (null == e) ; else {
                        if (!Array.isArray(e)) throw new TypeError("Expected a list of plugins, not `" + e + "`");
                        for (;++t < e.length; ) s(e[t]);
                    }
                }
                function p(e, t) {
                    for (var n, u = -1; ++u < r.length; ) if (r[u][0] === e) {
                        n = r[u];
                        break;
                    }
                    n ? (ue(n[1]) && ue(t) && (t = re(!0, n[1], t)), n[1] = t) : r.push(Array.prototype.slice.call(arguments));
                }
            }, l.parse = function(e) {
                l.freeze();
                var t = De(e), n = l.Parser;
                return se("parse", n), le(n, "parse") ? new n(String(t), t).parse() : n(String(t), t);
            }, l.stringify = function(e, t) {
                l.freeze();
                var n = De(t), r = l.Compiler;
                return ce("stringify", r), pe(e), le(r, "compile") ? new r(e, n).compile() : r(e, n);
            }, l.run = function(e, t, r) {
                if (pe(e), l.freeze(), r || "function" != typeof t || (r = t, t = void 0), !r) return new Promise(u);
                function u(u, a) {
                    n.run(e, De(t), (function(t, n, i) {
                        n = n || e, t ? a(t) : u ? u(n) : r(null, n, i);
                    }));
                }
                u(null, r);
            }, l.runSync = function(e, t) {
                var n, r;
                return l.run(e, t, (function(e, t) {
                    ne(e), n = t, r = !0;
                })), fe("runSync", "run", r), n;
            }, l.process = function(e, t) {
                if (l.freeze(), se("process", l.Parser), ce("process", l.Compiler), !t) return new Promise(n);
                function n(n, r) {
                    var u = De(e);
                    function a(e, u) {
                        e || !u ? r(e) : n ? n(u) : t(null, u);
                    }
                    l.run(l.parse(u), u, (function(e, t, n) {
                        if (!e && t && n) {
                            var r = l.stringify(t, n);
                            null == r || ("string" == typeof (u = r) || M(u) ? n.value = r : n.result = r), 
                            a(e, n);
                        } else a(e);
                        var u;
                    }));
                }
                n(null, t);
            }, l.processSync = function(e) {
                var t;
                l.freeze(), se("processSync", l.Parser), ce("processSync", l.Compiler);
                var n = De(e);
                return l.process(n, (function(e) {
                    t = !0, ne(e);
                })), fe("processSync", "process", t), n;
            }, l;
            function l() {
                for (var t = e(), n = -1; ++n < r.length; ) t.use.apply(t, T(r[n]));
                return t.data(re(!0, {}, u)), t;
            }
        }().freeze(), oe = {}.hasOwnProperty;
        function le(e, t) {
            return "function" == typeof e && e.prototype && (function(e) {
                var t;
                for (t in e) if (oe.call(e, t)) return !0;
                return !1;
            }(e.prototype) || t in e.prototype);
        }
        function se(e, t) {
            if ("function" != typeof t) throw new TypeError("Cannot `" + e + "` without `Parser`");
        }
        function ce(e, t) {
            if ("function" != typeof t) throw new TypeError("Cannot `" + e + "` without `Compiler`");
        }
        function de(e, t) {
            if (t) throw new Error("Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
        }
        function pe(e) {
            if (!ue(e) || "string" != typeof e.type) throw new TypeError("Expected node, got `" + e + "`");
        }
        function fe(e, t, n) {
            if (!n) throw new Error("`" + e + "` finished async. Use `" + t + "` instead");
        }
        function De(e) {
            return function(e) {
                return Boolean(e && "object" == typeof e && "message" in e && "messages" in e);
            }(e) ? e : new Q(e);
        }
        function ge(e, t) {
            return function(e) {
                return Boolean(e && "object" == typeof e);
            }(e) && ("value" in e && e.value || t && "alt" in e && e.alt || "children" in e && he(e.children, t)) || Array.isArray(e) && he(e, t) || "";
        }
        function he(e, t) {
            for (var n = [], r = -1; ++r < e.length; ) n[r] = ge(e[r], t);
            return n.join("");
        }
        function me(e, t, n, r) {
            var u, a = e.length, i = 0;
            if (t = t < 0 ? -t > a ? 0 : a + t : t > a ? a : t, n = n > 0 ? n : 0, r.length < 1e4) (u = Array.from(r)).unshift(t, n), 
            [].splice.apply(e, u); else for (n && [].splice.apply(e, [ t, n ]); i < r.length; ) (u = r.slice(i, i + 1e4)).unshift(t, 0), 
            [].splice.apply(e, u), i += 1e4, t += 1e4;
        }
        function be(e, t) {
            return e.length > 0 ? (me(e, e.length, 0, t), e) : t;
        }
        var ve = {}.hasOwnProperty;
        function Ee(e) {
            for (var t = {}, n = -1; ++n < e.length; ) ye(t, e[n]);
            return t;
        }
        function ye(e, t) {
            var n;
            for (n in t) {
                var r = (ve.call(e, n) ? e[n] : void 0) || (e[n] = {}), u = t[n], a = void 0;
                for (a in u) {
                    ve.call(r, a) || (r[a] = []);
                    var i = u[a];
                    _e(r[a], Array.isArray(i) ? i : i ? [ i ] : []);
                }
            }
        }
        function _e(e, t) {
            for (var n = -1, r = []; ++n < t.length; ) ("after" === t[n].add ? e : r).push(t[n]);
            me(e, 0, 0, r);
        }
        var Ce = Le(/[A-Za-z]/), Fe = Le(/\d/), Ae = Le(/[\dA-Fa-f]/), xe = Le(/[\dA-Za-z]/), we = Le(/[!-/:-@[-`{-~]/), ke = Le(/[#-'*+\--9=?A-Z^-~]/);
        function Be(e) {
            return null !== e && (e < 32 || 127 === e);
        }
        function Se(e) {
            return null !== e && (e < 0 || 32 === e);
        }
        function Ne(e) {
            return null !== e && e < -2;
        }
        function Oe(e) {
            return -2 === e || -1 === e || 32 === e;
        }
        var Te = Le(/\s/), Me = Le(/[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/);
        function Le(e) {
            return function(t) {
                return null !== t && e.test(String.fromCharCode(t));
            };
        }
        function Ie(e, t, n, r) {
            var u = r ? r - 1 : Number.POSITIVE_INFINITY, a = 0;
            return function(r) {
                return Oe(r) ? (e.enter(n), i(r)) : t(r);
            };
            function i(r) {
                return Oe(r) && a++ < u ? (e.consume(r), i) : (e.exit(n), t(r));
            }
        }
        var Re = {
            tokenize: function(e) {
                var t, n = e.attempt(this.parser.constructs.contentInitial, (function(t) {
                    if (null !== t) return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), 
                    Ie(e, n, "linePrefix");
                    e.consume(t);
                }), (function(t) {
                    return e.enter("paragraph"), r(t);
                }));
                return n;
                function r(n) {
                    var r = e.enter("chunkText", {
                        contentType: "text",
                        previous: t
                    });
                    return t && (t.next = r), t = r, u(n);
                }
                function u(t) {
                    return null === t ? (e.exit("chunkText"), e.exit("paragraph"), void e.consume(t)) : Ne(t) ? (e.consume(t), 
                    e.exit("chunkText"), r) : (e.consume(t), u);
                }
            }
        }, Pe = {
            tokenize: function(e) {
                var t, n, r, u = this, a = [], i = 0;
                return o;
                function o(t) {
                    if (i < a.length) {
                        var n = a[i];
                        return u.containerState = n[1], e.attempt(n[0].continuation, l, s)(t);
                    }
                    return s(t);
                }
                function l(e) {
                    if (i++, u.containerState._closeFlow) {
                        u.containerState._closeFlow = void 0, t && b();
                        for (var n, r = u.events.length, a = r; a--; ) if ("exit" === u.events[a][0] && "chunkFlow" === u.events[a][1].type) {
                            n = u.events[a][1].end;
                            break;
                        }
                        m(i);
                        for (var l = r; l < u.events.length; ) u.events[l][1].end = Object.assign({}, n), 
                        l++;
                        return me(u.events, a + 1, 0, u.events.slice(r)), u.events.length = l, s(e);
                    }
                    return o(e);
                }
                function s(n) {
                    if (i === a.length) {
                        if (!t) return p(n);
                        if (t.currentConstruct && t.currentConstruct.concrete) return D(n);
                        u.interrupt = Boolean(t.currentConstruct && !t._gfmTableDynamicInterruptHack);
                    }
                    return u.containerState = {}, e.check(je, c, d)(n);
                }
                function c(e) {
                    return t && b(), m(i), p(e);
                }
                function d(e) {
                    return u.parser.lazy[u.now().line] = i !== a.length, r = u.now().offset, D(e);
                }
                function p(t) {
                    return u.containerState = {}, e.attempt(je, f, D)(t);
                }
                function f(e) {
                    return i++, a.push([ u.currentConstruct, u.containerState ]), p(e);
                }
                function D(r) {
                    return null === r ? (t && b(), m(0), void e.consume(r)) : (t = t || u.parser.flow(u.now()), 
                    e.enter("chunkFlow", {
                        contentType: "flow",
                        previous: n,
                        _tokenizer: t
                    }), g(r));
                }
                function g(t) {
                    return null === t ? (h(e.exit("chunkFlow"), !0), m(0), void e.consume(t)) : Ne(t) ? (e.consume(t), 
                    h(e.exit("chunkFlow")), i = 0, u.interrupt = void 0, o) : (e.consume(t), g);
                }
                function h(e, a) {
                    var o = u.sliceStream(e);
                    if (a && o.push(null), e.previous = n, n && (n.next = e), n = e, t.defineSkip(e.start), 
                    t.write(o), u.parser.lazy[e.start.line]) {
                        for (var l = t.events.length; l--; ) if (t.events[l][1].start.offset < r && (!t.events[l][1].end || t.events[l][1].end.offset > r)) return;
                        for (var s, c, d = u.events.length, p = d; p--; ) if ("exit" === u.events[p][0] && "chunkFlow" === u.events[p][1].type) {
                            if (s) {
                                c = u.events[p][1].end;
                                break;
                            }
                            s = !0;
                        }
                        for (m(i), l = d; l < u.events.length; ) u.events[l][1].end = Object.assign({}, c), 
                        l++;
                        me(u.events, p + 1, 0, u.events.slice(d)), u.events.length = l;
                    }
                }
                function m(t) {
                    for (var n = a.length; n-- > t; ) {
                        var r = a[n];
                        u.containerState = r[1], r[0].exit.call(u, e);
                    }
                    a.length = t;
                }
                function b() {
                    t.write([ null ]), n = void 0, t = void 0, u.containerState._closeFlow = void 0;
                }
            }
        }, je = {
            tokenize: function(e, t, n) {
                return Ie(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
            }
        }, ze = {
            tokenize: function(e, t, n) {
                return Ie(e, (function(e) {
                    return null === e || Ne(e) ? t(e) : n(e);
                }), "linePrefix");
            },
            partial: !0
        };
        function Ue(e) {
            for (var t, n, r, u, a, i, o, l = {}, s = -1; ++s < e.length; ) {
                for (;s in l; ) s = l[s];
                if (t = e[s], s && "chunkFlow" === t[1].type && "listItemPrefix" === e[s - 1][1].type && ((r = 0) < (i = t[1]._tokenizer.events).length && "lineEndingBlank" === i[r][1].type && (r += 2), 
                r < i.length && "content" === i[r][1].type)) for (;++r < i.length && "content" !== i[r][1].type; ) "chunkText" === i[r][1].type && (i[r][1]._isInFirstContentOfListItem = !0, 
                r++);
                if ("enter" === t[0]) t[1].contentType && (Object.assign(l, qe(e, s)), s = l[s], 
                o = !0); else if (t[1]._container) {
                    for (r = s, n = void 0; r-- && ("lineEnding" === (u = e[r])[1].type || "lineEndingBlank" === u[1].type); ) "enter" === u[0] && (n && (e[n][1].type = "lineEndingBlank"), 
                    u[1].type = "lineEnding", n = r);
                    n && (t[1].end = Object.assign({}, e[n][1].start), (a = e.slice(n, s)).unshift(t), 
                    me(e, n, s - n + 1, a));
                }
            }
            return !o;
        }
        function qe(e, t) {
            for (var n, r, u = e[t][1], a = e[t][2], i = t - 1, o = [], l = u._tokenizer || a.parser[u.contentType](u.start), s = l.events, c = [], d = {}, p = -1, f = u, D = 0, g = 0, h = [ g ]; f; ) {
                for (;e[++i][1] !== f; ) ;
                o.push(i), f._tokenizer || (n = a.sliceStream(f), f.next || n.push(null), r && l.defineSkip(f.start), 
                f._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(n), 
                f._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), 
                r = f, f = f.next;
            }
            for (f = u; ++p < s.length; ) "exit" === s[p][0] && "enter" === s[p - 1][0] && s[p][1].type === s[p - 1][1].type && s[p][1].start.line !== s[p][1].end.line && (g = p + 1, 
            h.push(g), f._tokenizer = void 0, f.previous = void 0, f = f.next);
            for (l.events = [], f ? (f._tokenizer = void 0, f.previous = void 0) : h.pop(), 
            p = h.length; p--; ) {
                var m = s.slice(h[p], h[p + 1]), b = o.pop();
                c.unshift([ b, b + m.length - 1 ]), me(e, b, 2, m);
            }
            for (p = -1; ++p < c.length; ) d[D + c[p][0]] = D + c[p][1], D += c[p][1] - c[p][0] - 1;
            return d;
        }
        var He = {
            tokenize: function(e, t) {
                var n;
                return function(t) {
                    return e.enter("content"), n = e.enter("chunkContent", {
                        contentType: "content"
                    }), r(t);
                };
                function r(t) {
                    return null === t ? u(t) : Ne(t) ? e.check($e, a, u)(t) : (e.consume(t), r);
                }
                function u(n) {
                    return e.exit("chunkContent"), e.exit("content"), t(n);
                }
                function a(t) {
                    return e.consume(t), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
                        contentType: "content",
                        previous: n
                    }), n = n.next, r;
                }
            },
            resolve: function(e) {
                return Ue(e), e;
            }
        }, $e = {
            tokenize: function(e, t, n) {
                var r = this;
                return function(t) {
                    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), 
                    Ie(e, u, "linePrefix");
                };
                function u(u) {
                    if (null === u || Ne(u)) return n(u);
                    var a = r.events[r.events.length - 1];
                    return !r.parser.constructs.disable.null.includes("codeIndented") && a && "linePrefix" === a[1].type && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(u) : e.interrupt(r.parser.constructs.flow, n, t)(u);
                }
            },
            partial: !0
        }, Ke = {
            tokenize: function(e) {
                var t = this, n = e.attempt(ze, (function(r) {
                    if (null !== r) return e.enter("lineEndingBlank"), e.consume(r), e.exit("lineEndingBlank"), 
                    t.currentConstruct = void 0, n;
                    e.consume(r);
                }), e.attempt(this.parser.constructs.flowInitial, r, Ie(e, e.attempt(this.parser.constructs.flow, r, e.attempt(He, r)), "linePrefix")));
                return n;
                function r(r) {
                    if (null !== r) return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), 
                    t.currentConstruct = void 0, n;
                    e.consume(r);
                }
            }
        }, Ve = {
            resolveAll: Ze()
        }, Ge = Qe("string"), We = Qe("text");
        function Qe(e) {
            return {
                tokenize: function(t) {
                    var n = this, r = this.parser.constructs[e], u = t.attempt(r, a, i);
                    return a;
                    function a(e) {
                        return l(e) ? u(e) : i(e);
                    }
                    function i(e) {
                        if (null !== e) return t.enter("data"), t.consume(e), o;
                        t.consume(e);
                    }
                    function o(e) {
                        return l(e) ? (t.exit("data"), u(e)) : (t.consume(e), o);
                    }
                    function l(e) {
                        if (null === e) return !0;
                        var t = r[e], u = -1;
                        if (t) for (;++u < t.length; ) {
                            var a = t[u];
                            if (!a.previous || a.previous.call(n, n.previous)) return !0;
                        }
                        return !1;
                    }
                },
                resolveAll: Ze("text" === e ? Xe : void 0)
            };
        }
        function Ze(e) {
            return function(t, n) {
                for (var r, u = -1; ++u <= t.length; ) void 0 === r ? t[u] && "data" === t[u][1].type && (r = u, 
                u++) : t[u] && "data" === t[u][1].type || (u !== r + 2 && (t[r][1].end = t[u - 1][1].end, 
                t.splice(r + 2, u - r - 2), u = r + 2), r = void 0);
                return e ? e(t, n) : t;
            };
        }
        function Xe(e, t) {
            for (var n = 0; ++n <= e.length; ) if ((n === e.length || "lineEnding" === e[n][1].type) && "data" === e[n - 1][1].type) {
                for (var r = e[n - 1][1], u = t.sliceStream(r), a = u.length, i = -1, o = 0, l = void 0; a--; ) {
                    var s = u[a];
                    if ("string" == typeof s) {
                        for (i = s.length; 32 === s.charCodeAt(i - 1); ) o++, i--;
                        if (i) break;
                        i = -1;
                    } else if (-2 === s) l = !0, o++; else if (-1 !== s) {
                        a++;
                        break;
                    }
                }
                if (o) {
                    var c = {
                        type: n === e.length || l || o < 2 ? "lineSuffix" : "hardBreakTrailing",
                        start: {
                            line: r.end.line,
                            column: r.end.column - o,
                            offset: r.end.offset - o,
                            _index: r.start._index + a,
                            _bufferIndex: a ? i : r.start._bufferIndex + i
                        },
                        end: Object.assign({}, r.end)
                    };
                    r.end = Object.assign({}, c.start), r.start.offset === r.end.offset ? Object.assign(r, c) : (e.splice(n, 0, [ "enter", c, t ], [ "exit", c, t ]), 
                    n += 2);
                }
                n++;
            }
            return e;
        }
        function Ye(e, t, n) {
            for (var r = [], u = -1; ++u < e.length; ) {
                var a = e[u].resolveAll;
                a && !r.includes(a) && (t = a(t, n), r.push(a));
            }
            return t;
        }
        function Je(e, t, n) {
            var r = Object.assign(n ? Object.assign({}, n) : {
                line: 1,
                column: 1,
                offset: 0
            }, {
                _index: 0,
                _bufferIndex: -1
            }), u = {}, a = [], i = [], o = [], l = {
                consume: function(e) {
                    Ne(e) ? (r.line++, r.column = 1, r.offset += -3 === e ? 2 : 1, b()) : -1 !== e && (r.column++, 
                    r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === i[r._index].length && (r._bufferIndex = -1, 
                    r._index++)), s.previous = e;
                },
                enter: function(e, t) {
                    var n = t || {};
                    return n.type = e, n.start = p(), s.events.push([ "enter", n, s ]), o.push(n), n;
                },
                exit: function(e) {
                    var t = o.pop();
                    return t.end = p(), s.events.push([ "exit", t, s ]), t;
                },
                attempt: h((function(e, t) {
                    m(e, t.from);
                })),
                check: h(g),
                interrupt: h(g, {
                    interrupt: !0
                })
            }, s = {
                previous: null,
                code: null,
                containerState: {},
                events: [],
                parser: e,
                sliceStream: d,
                sliceSerialize: function(e, t) {
                    return function(e, t) {
                        for (var n, r = -1, u = []; ++r < e.length; ) {
                            var a = e[r], i = void 0;
                            if ("string" == typeof a) i = a; else switch (a) {
                              case -5:
                                i = "\r";
                                break;

                              case -4:
                                i = "\n";
                                break;

                              case -3:
                                i = "\r\n";
                                break;

                              case -2:
                                i = t ? " " : "\t";
                                break;

                              case -1:
                                if (!t && n) continue;
                                i = " ";
                                break;

                              default:
                                i = String.fromCharCode(a);
                            }
                            n = -2 === a, u.push(i);
                        }
                        return u.join("");
                    }(d(e), t);
                },
                now: p,
                defineSkip: function(e) {
                    u[e.line] = e.column, b();
                },
                write: function(e) {
                    return i = be(i, e), function() {
                        for (var e; r._index < i.length; ) {
                            var t = i[r._index];
                            if ("string" == typeof t) for (e = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === e && r._bufferIndex < t.length; ) D(t.charCodeAt(r._bufferIndex)); else D(t);
                        }
                    }(), null !== i[i.length - 1] ? [] : (m(t, 0), s.events = Ye(a, s.events, s), s.events);
                }
            }, c = t.tokenize.call(s, l);
            return t.resolveAll && a.push(t), s;
            function d(e) {
                return function(e, t) {
                    var n, r = t.start._index, u = t.start._bufferIndex, a = t.end._index, i = t.end._bufferIndex;
                    return r === a ? n = [ e[r].slice(u, i) ] : (n = e.slice(r, a), u > -1 && (n[0] = n[0].slice(u)), 
                    i > 0 && n.push(e[a].slice(0, i))), n;
                }(i, e);
            }
            function p() {
                return Object.assign({}, r);
            }
            function D(e) {
                c = c(e);
            }
            function g(e, t) {
                t.restore();
            }
            function h(e, t) {
                return function(n, u, a) {
                    var i, c, d, f;
                    return Array.isArray(n) ? D(n) : "tokenize" in n ? D([ n ]) : function(e) {
                        return function(t) {
                            var n = null !== t && e[t], r = null !== t && e.null;
                            return D([].concat(T(Array.isArray(n) ? n : n ? [ n ] : []), T(Array.isArray(r) ? r : r ? [ r ] : [])))(t);
                        };
                    }(n);
                    function D(e) {
                        return i = e, c = 0, 0 === e.length ? a : g(e[c]);
                    }
                    function g(e) {
                        return function(n) {
                            return f = function() {
                                var e = p(), t = s.previous, n = s.currentConstruct, u = s.events.length, a = Array.from(o);
                                return {
                                    restore: function() {
                                        r = e, s.previous = t, s.currentConstruct = n, s.events.length = u, o = a, b();
                                    },
                                    from: u
                                };
                            }(), d = e, e.partial || (s.currentConstruct = e), e.name && s.parser.constructs.disable.null.includes(e.name) ? m(n) : e.tokenize.call(t ? Object.assign(Object.create(s), t) : s, l, h, m)(n);
                        };
                    }
                    function h(t) {
                        return e(d, f), u;
                    }
                    function m(e) {
                        return f.restore(), ++c < i.length ? g(i[c]) : a;
                    }
                };
            }
            function m(e, t) {
                e.resolveAll && !a.includes(e) && a.push(e), e.resolve && me(s.events, t, s.events.length - t, e.resolve(s.events.slice(t), s)), 
                e.resolveTo && (s.events = e.resolveTo(s.events, s));
            }
            function b() {
                r.line in u && r.column < 2 && (r.column = u[r.line], r.offset += u[r.line] - 1);
            }
        }
        var et = {
            name: "thematicBreak",
            tokenize: function(e, t, n) {
                var r, u = 0;
                return function(t) {
                    return e.enter("thematicBreak"), r = t, a(t);
                };
                function a(o) {
                    return o === r ? (e.enter("thematicBreakSequence"), i(o)) : Oe(o) ? Ie(e, a, "whitespace")(o) : u < 3 || null !== o && !Ne(o) ? n(o) : (e.exit("thematicBreak"), 
                    t(o));
                }
                function i(t) {
                    return t === r ? (e.consume(t), u++, i) : (e.exit("thematicBreakSequence"), a(t));
                }
            }
        }, tt = {
            name: "list",
            tokenize: function(e, t, n) {
                var r = this, u = r.events[r.events.length - 1], a = u && "linePrefix" === u[1].type ? u[2].sliceSerialize(u[1], !0).length : 0, i = 0;
                return function(t) {
                    var u = r.containerState.type || (42 === t || 43 === t || 45 === t ? "listUnordered" : "listOrdered");
                    if ("listUnordered" === u ? !r.containerState.marker || t === r.containerState.marker : Fe(t)) {
                        if (r.containerState.type || (r.containerState.type = u, e.enter(u, {
                            _container: !0
                        })), "listUnordered" === u) return e.enter("listItemPrefix"), 42 === t || 45 === t ? e.check(et, n, l)(t) : l(t);
                        if (!r.interrupt || 49 === t) return e.enter("listItemPrefix"), e.enter("listItemValue"), 
                        o(t);
                    }
                    return n(t);
                };
                function o(t) {
                    return Fe(t) && ++i < 10 ? (e.consume(t), o) : (!r.interrupt || i < 2) && (r.containerState.marker ? t === r.containerState.marker : 41 === t || 46 === t) ? (e.exit("listItemValue"), 
                    l(t)) : n(t);
                }
                function l(t) {
                    return e.enter("listItemMarker"), e.consume(t), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || t, 
                    e.check(ze, r.interrupt ? n : s, e.attempt(nt, d, c));
                }
                function s(e) {
                    return r.containerState.initialBlankLine = !0, a++, d(e);
                }
                function c(t) {
                    return Oe(t) ? (e.enter("listItemPrefixWhitespace"), e.consume(t), e.exit("listItemPrefixWhitespace"), 
                    d) : n(t);
                }
                function d(n) {
                    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, 
                    t(n);
                }
            },
            continuation: {
                tokenize: function(e, t, n) {
                    var r = this;
                    return r.containerState._closeFlow = void 0, e.check(ze, (function(n) {
                        return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, 
                        Ie(e, t, "listItemIndent", r.containerState.size + 1)(n);
                    }), (function(n) {
                        return r.containerState.furtherBlankLines || !Oe(n) ? (r.containerState.furtherBlankLines = void 0, 
                        r.containerState.initialBlankLine = void 0, i(n)) : (r.containerState.furtherBlankLines = void 0, 
                        r.containerState.initialBlankLine = void 0, e.attempt(rt, t, i)(n));
                    }));
                    function i(u) {
                        return r.containerState._closeFlow = !0, r.interrupt = void 0, Ie(e, e.attempt(tt, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(u);
                    }
                }
            },
            exit: function(e) {
                e.exit(this.containerState.type);
            }
        }, nt = {
            tokenize: function(e, t, n) {
                var r = this;
                return Ie(e, (function(e) {
                    var u = r.events[r.events.length - 1];
                    return !Oe(e) && u && "listItemPrefixWhitespace" === u[1].type ? t(e) : n(e);
                }), "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
            },
            partial: !0
        }, rt = {
            tokenize: function(e, t, n) {
                var r = this;
                return Ie(e, (function(e) {
                    var u = r.events[r.events.length - 1];
                    return u && "listItemIndent" === u[1].type && u[2].sliceSerialize(u[1], !0).length === r.containerState.size ? t(e) : n(e);
                }), "listItemIndent", r.containerState.size + 1);
            },
            partial: !0
        }, ut = {
            name: "blockQuote",
            tokenize: function(e, t, n) {
                var r = this;
                return function(t) {
                    if (62 === t) {
                        var a = r.containerState;
                        return a.open || (e.enter("blockQuote", {
                            _container: !0
                        }), a.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(t), 
                        e.exit("blockQuoteMarker"), u;
                    }
                    return n(t);
                };
                function u(n) {
                    return Oe(n) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(n), e.exit("blockQuotePrefixWhitespace"), 
                    e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(n));
                }
            },
            continuation: {
                tokenize: function(e, t, n) {
                    return Ie(e, e.attempt(ut, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
                }
            },
            exit: function(e) {
                e.exit("blockQuote");
            }
        };
        function at(e, t, n, r, u, a, i, o, l) {
            var s = l || Number.POSITIVE_INFINITY, c = 0;
            return function(t) {
                return 60 === t ? (e.enter(r), e.enter(u), e.enter(a), e.consume(t), e.exit(a), 
                d) : null === t || 41 === t || Be(t) ? n(t) : (e.enter(r), e.enter(i), e.enter(o), 
                e.enter("chunkString", {
                    contentType: "string"
                }), D(t));
            };
            function d(n) {
                return 62 === n ? (e.enter(a), e.consume(n), e.exit(a), e.exit(u), e.exit(r), t) : (e.enter(o), 
                e.enter("chunkString", {
                    contentType: "string"
                }), p(n));
            }
            function p(t) {
                return 62 === t ? (e.exit("chunkString"), e.exit(o), d(t)) : null === t || 60 === t || Ne(t) ? n(t) : (e.consume(t), 
                92 === t ? f : p);
            }
            function f(t) {
                return 60 === t || 62 === t || 92 === t ? (e.consume(t), p) : p(t);
            }
            function D(u) {
                return 40 === u ? ++c > s ? n(u) : (e.consume(u), D) : 41 === u ? c-- ? (e.consume(u), 
                D) : (e.exit("chunkString"), e.exit(o), e.exit(i), e.exit(r), t(u)) : null === u || Se(u) ? c ? n(u) : (e.exit("chunkString"), 
                e.exit(o), e.exit(i), e.exit(r), t(u)) : Be(u) ? n(u) : (e.consume(u), 92 === u ? g : D);
            }
            function g(t) {
                return 40 === t || 41 === t || 92 === t ? (e.consume(t), D) : D(t);
            }
        }
        function it(e, t, n, r, u, a) {
            var i, o = this, l = 0;
            return function(t) {
                return e.enter(r), e.enter(u), e.consume(t), e.exit(u), e.enter(a), s;
            };
            function s(d) {
                return null === d || 91 === d || 93 === d && !i || 94 === d && !l && "_hiddenFootnoteSupport" in o.parser.constructs || l > 999 ? n(d) : 93 === d ? (e.exit(a), 
                e.enter(u), e.consume(d), e.exit(u), e.exit(r), t) : Ne(d) ? (e.enter("lineEnding"), 
                e.consume(d), e.exit("lineEnding"), s) : (e.enter("chunkString", {
                    contentType: "string"
                }), c(d));
            }
            function c(t) {
                return null === t || 91 === t || 93 === t || Ne(t) || l++ > 999 ? (e.exit("chunkString"), 
                s(t)) : (e.consume(t), i = i || !Oe(t), 92 === t ? d : c);
            }
            function d(t) {
                return 91 === t || 92 === t || 93 === t ? (e.consume(t), l++, c) : c(t);
            }
        }
        function ot(e, t, n, r, u, a) {
            var i;
            return function(t) {
                return e.enter(r), e.enter(u), e.consume(t), e.exit(u), i = 40 === t ? 41 : t, o;
            };
            function o(n) {
                return n === i ? (e.enter(u), e.consume(n), e.exit(u), e.exit(r), t) : (e.enter(a), 
                l(n));
            }
            function l(t) {
                return t === i ? (e.exit(a), o(i)) : null === t ? n(t) : Ne(t) ? (e.enter("lineEnding"), 
                e.consume(t), e.exit("lineEnding"), Ie(e, l, "linePrefix")) : (e.enter("chunkString", {
                    contentType: "string"
                }), s(t));
            }
            function s(t) {
                return t === i || null === t || Ne(t) ? (e.exit("chunkString"), l(t)) : (e.consume(t), 
                92 === t ? c : s);
            }
            function c(t) {
                return t === i || 92 === t ? (e.consume(t), s) : s(t);
            }
        }
        function lt(e, t) {
            var n;
            return function r(u) {
                return Ne(u) ? (e.enter("lineEnding"), e.consume(u), e.exit("lineEnding"), n = !0, 
                r) : Oe(u) ? Ie(e, r, n ? "linePrefix" : "lineSuffix")(u) : t(u);
            };
        }
        function st(e) {
            return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
        }
        var ct = {
            name: "definition",
            tokenize: function(e, t, n) {
                var r, u = this;
                return function(t) {
                    return e.enter("definition"), it.call(u, e, a, n, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(t);
                };
                function a(t) {
                    return r = st(u.sliceSerialize(u.events[u.events.length - 1][1]).slice(1, -1)), 
                    58 === t ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), 
                    lt(e, at(e, e.attempt(dt, Ie(e, i, "whitespace"), Ie(e, i, "whitespace")), n, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString"))) : n(t);
                }
                function i(a) {
                    return null === a || Ne(a) ? (e.exit("definition"), u.parser.defined.includes(r) || u.parser.defined.push(r), 
                    t(a)) : n(a);
                }
            }
        }, dt = {
            tokenize: function(e, t, n) {
                return function(t) {
                    return Se(t) ? lt(e, r)(t) : n(t);
                };
                function r(t) {
                    return 34 === t || 39 === t || 40 === t ? ot(e, Ie(e, u, "whitespace"), n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(t) : n(t);
                }
                function u(e) {
                    return null === e || Ne(e) ? t(e) : n(e);
                }
            },
            partial: !0
        }, pt = {
            name: "codeIndented",
            tokenize: function(e, t, n) {
                var r = this;
                return function(t) {
                    return e.enter("codeIndented"), Ie(e, u, "linePrefix", 5)(t);
                };
                function u(e) {
                    var t = r.events[r.events.length - 1];
                    return t && "linePrefix" === t[1].type && t[2].sliceSerialize(t[1], !0).length >= 4 ? a(e) : n(e);
                }
                function a(t) {
                    return null === t ? o(t) : Ne(t) ? e.attempt(ft, a, o)(t) : (e.enter("codeFlowValue"), 
                    i(t));
                }
                function i(t) {
                    return null === t || Ne(t) ? (e.exit("codeFlowValue"), a(t)) : (e.consume(t), i);
                }
                function o(n) {
                    return e.exit("codeIndented"), t(n);
                }
            }
        }, ft = {
            tokenize: function(e, t, n) {
                var r = this;
                return u;
                function u(t) {
                    return r.parser.lazy[r.now().line] ? n(t) : Ne(t) ? (e.enter("lineEnding"), e.consume(t), 
                    e.exit("lineEnding"), u) : Ie(e, a, "linePrefix", 5)(t);
                }
                function a(e) {
                    var a = r.events[r.events.length - 1];
                    return a && "linePrefix" === a[1].type && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(e) : Ne(e) ? u(e) : n(e);
                }
            },
            partial: !0
        }, Dt = {
            name: "headingAtx",
            tokenize: function(e, t, n) {
                var r = this, u = 0;
                return function(t) {
                    return e.enter("atxHeading"), e.enter("atxHeadingSequence"), a(t);
                };
                function a(o) {
                    return 35 === o && u++ < 6 ? (e.consume(o), a) : null === o || Se(o) ? (e.exit("atxHeadingSequence"), 
                    r.interrupt ? t(o) : i(o)) : n(o);
                }
                function i(n) {
                    return 35 === n ? (e.enter("atxHeadingSequence"), o(n)) : null === n || Ne(n) ? (e.exit("atxHeading"), 
                    t(n)) : Oe(n) ? Ie(e, i, "whitespace")(n) : (e.enter("atxHeadingText"), l(n));
                }
                function o(t) {
                    return 35 === t ? (e.consume(t), o) : (e.exit("atxHeadingSequence"), i(t));
                }
                function l(t) {
                    return null === t || 35 === t || Se(t) ? (e.exit("atxHeadingText"), i(t)) : (e.consume(t), 
                    l);
                }
            },
            resolve: function(e, t) {
                var n, r, u = e.length - 2, a = 3;
                return "whitespace" === e[a][1].type && (a += 2), u - 2 > a && "whitespace" === e[u][1].type && (u -= 2), 
                "atxHeadingSequence" === e[u][1].type && (a === u - 1 || u - 4 > a && "whitespace" === e[u - 2][1].type) && (u -= a + 1 === u ? 2 : 4), 
                u > a && me(e, a, u - a + 1, [ [ "enter", n = {
                    type: "atxHeadingText",
                    start: e[a][1].start,
                    end: e[u][1].end
                }, t ], [ "enter", r = {
                    type: "chunkText",
                    start: e[a][1].start,
                    end: e[u][1].end,
                    contentType: "text"
                }, t ], [ "exit", r, t ], [ "exit", n, t ] ]), e;
            }
        }, gt = {
            name: "setextUnderline",
            tokenize: function(e, t, n) {
                for (var r, u, a = this, i = a.events.length; i--; ) if ("lineEnding" !== a.events[i][1].type && "linePrefix" !== a.events[i][1].type && "content" !== a.events[i][1].type) {
                    u = "paragraph" === a.events[i][1].type;
                    break;
                }
                return function(t) {
                    return a.parser.lazy[a.now().line] || !a.interrupt && !u ? n(t) : (e.enter("setextHeadingLine"), 
                    e.enter("setextHeadingLineSequence"), r = t, o(t));
                };
                function o(t) {
                    return t === r ? (e.consume(t), o) : (e.exit("setextHeadingLineSequence"), Ie(e, l, "lineSuffix")(t));
                }
                function l(r) {
                    return null === r || Ne(r) ? (e.exit("setextHeadingLine"), t(r)) : n(r);
                }
            },
            resolveTo: function(e, t) {
                for (var n, r, u, a = e.length; a--; ) if ("enter" === e[a][0]) {
                    if ("content" === e[a][1].type) {
                        n = a;
                        break;
                    }
                    "paragraph" === e[a][1].type && (r = a);
                } else "content" === e[a][1].type && e.splice(a, 1), u || "definition" !== e[a][1].type || (u = a);
                var i = {
                    type: "setextHeading",
                    start: Object.assign({}, e[r][1].start),
                    end: Object.assign({}, e[e.length - 1][1].end)
                };
                return e[r][1].type = "setextHeadingText", u ? (e.splice(r, 0, [ "enter", i, t ]), 
                e.splice(u + 1, 0, [ "exit", e[n][1], t ]), e[n][1].end = Object.assign({}, e[u][1].end)) : e[n][1] = i, 
                e.push([ "exit", i, t ]), e;
            }
        }, ht = [ "address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "section", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul" ], mt = [ "pre", "script", "style", "textarea" ], bt = {
            name: "htmlFlow",
            tokenize: function(e, t, n) {
                var r, u, a, i, o, l = this;
                return function(t) {
                    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(t), s;
                };
                function s(i) {
                    return 33 === i ? (e.consume(i), c) : 47 === i ? (e.consume(i), f) : 63 === i ? (e.consume(i), 
                    r = 3, l.interrupt ? t : M) : Ce(i) ? (e.consume(i), a = String.fromCharCode(i), 
                    u = !0, D) : n(i);
                }
                function c(u) {
                    return 45 === u ? (e.consume(u), r = 2, d) : 91 === u ? (e.consume(u), r = 5, a = "CDATA[", 
                    i = 0, p) : Ce(u) ? (e.consume(u), r = 4, l.interrupt ? t : M) : n(u);
                }
                function d(r) {
                    return 45 === r ? (e.consume(r), l.interrupt ? t : M) : n(r);
                }
                function p(r) {
                    return r === a.charCodeAt(i++) ? (e.consume(r), i === a.length ? l.interrupt ? t : x : p) : n(r);
                }
                function f(t) {
                    return Ce(t) ? (e.consume(t), a = String.fromCharCode(t), D) : n(t);
                }
                function D(i) {
                    return null === i || 47 === i || 62 === i || Se(i) ? 47 !== i && u && mt.includes(a.toLowerCase()) ? (r = 1, 
                    l.interrupt ? t(i) : x(i)) : ht.includes(a.toLowerCase()) ? (r = 6, 47 === i ? (e.consume(i), 
                    g) : l.interrupt ? t(i) : x(i)) : (r = 7, l.interrupt && !l.parser.lazy[l.now().line] ? n(i) : u ? m(i) : h(i)) : 45 === i || xe(i) ? (e.consume(i), 
                    a += String.fromCharCode(i), D) : n(i);
                }
                function g(r) {
                    return 62 === r ? (e.consume(r), l.interrupt ? t : x) : n(r);
                }
                function h(t) {
                    return Oe(t) ? (e.consume(t), h) : F(t);
                }
                function m(t) {
                    return 47 === t ? (e.consume(t), F) : 58 === t || 95 === t || Ce(t) ? (e.consume(t), 
                    b) : Oe(t) ? (e.consume(t), m) : F(t);
                }
                function b(t) {
                    return 45 === t || 46 === t || 58 === t || 95 === t || xe(t) ? (e.consume(t), b) : v(t);
                }
                function v(t) {
                    return 61 === t ? (e.consume(t), E) : Oe(t) ? (e.consume(t), v) : m(t);
                }
                function E(t) {
                    return null === t || 60 === t || 61 === t || 62 === t || 96 === t ? n(t) : 34 === t || 39 === t ? (e.consume(t), 
                    o = t, y) : Oe(t) ? (e.consume(t), E) : (o = null, _(t));
                }
                function y(t) {
                    return null === t || Ne(t) ? n(t) : t === o ? (e.consume(t), C) : (e.consume(t), 
                    y);
                }
                function _(t) {
                    return null === t || 34 === t || 39 === t || 60 === t || 61 === t || 62 === t || 96 === t || Se(t) ? v(t) : (e.consume(t), 
                    _);
                }
                function C(e) {
                    return 47 === e || 62 === e || Oe(e) ? m(e) : n(e);
                }
                function F(t) {
                    return 62 === t ? (e.consume(t), A) : n(t);
                }
                function A(t) {
                    return Oe(t) ? (e.consume(t), A) : null === t || Ne(t) ? x(t) : n(t);
                }
                function x(t) {
                    return 45 === t && 2 === r ? (e.consume(t), S) : 60 === t && 1 === r ? (e.consume(t), 
                    N) : 62 === t && 4 === r ? (e.consume(t), L) : 63 === t && 3 === r ? (e.consume(t), 
                    M) : 93 === t && 5 === r ? (e.consume(t), T) : !Ne(t) || 6 !== r && 7 !== r ? null === t || Ne(t) ? w(t) : (e.consume(t), 
                    x) : e.check(vt, L, w)(t);
                }
                function w(t) {
                    return e.exit("htmlFlowData"), k(t);
                }
                function k(t) {
                    return null === t ? I(t) : Ne(t) ? e.attempt({
                        tokenize: B,
                        partial: !0
                    }, k, I)(t) : (e.enter("htmlFlowData"), x(t));
                }
                function B(e, t, n) {
                    return function(t) {
                        return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), r;
                    };
                    function r(e) {
                        return l.parser.lazy[l.now().line] ? n(e) : t(e);
                    }
                }
                function S(t) {
                    return 45 === t ? (e.consume(t), M) : x(t);
                }
                function N(t) {
                    return 47 === t ? (e.consume(t), a = "", O) : x(t);
                }
                function O(t) {
                    return 62 === t && mt.includes(a.toLowerCase()) ? (e.consume(t), L) : Ce(t) && a.length < 8 ? (e.consume(t), 
                    a += String.fromCharCode(t), O) : x(t);
                }
                function T(t) {
                    return 93 === t ? (e.consume(t), M) : x(t);
                }
                function M(t) {
                    return 62 === t ? (e.consume(t), L) : 45 === t && 2 === r ? (e.consume(t), M) : x(t);
                }
                function L(t) {
                    return null === t || Ne(t) ? (e.exit("htmlFlowData"), I(t)) : (e.consume(t), L);
                }
                function I(n) {
                    return e.exit("htmlFlow"), t(n);
                }
            },
            resolveTo: function(e) {
                for (var t = e.length; t-- && ("enter" !== e[t][0] || "htmlFlow" !== e[t][1].type); ) ;
                return t > 1 && "linePrefix" === e[t - 2][1].type && (e[t][1].start = e[t - 2][1].start, 
                e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
            },
            concrete: !0
        }, vt = {
            tokenize: function(e, t, n) {
                return function(r) {
                    return e.exit("htmlFlowData"), e.enter("lineEndingBlank"), e.consume(r), e.exit("lineEndingBlank"), 
                    e.attempt(ze, t, n);
                };
            },
            partial: !0
        }, Et = {
            name: "codeFenced",
            tokenize: function(e, t, n) {
                var r, u = this, a = {
                    tokenize: function(e, t, n) {
                        var u = 0;
                        return Ie(e, (function(t) {
                            return e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), i(t);
                        }), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
                        function i(t) {
                            return t === r ? (e.consume(t), u++, i) : u < s ? n(t) : (e.exit("codeFencedFenceSequence"), 
                            Ie(e, o, "whitespace")(t));
                        }
                        function o(r) {
                            return null === r || Ne(r) ? (e.exit("codeFencedFence"), t(r)) : n(r);
                        }
                    },
                    partial: !0
                }, i = {
                    tokenize: function(e, t, n) {
                        var r = this;
                        return function(t) {
                            return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), a;
                        };
                        function a(e) {
                            return r.parser.lazy[r.now().line] ? n(e) : t(e);
                        }
                    },
                    partial: !0
                }, o = this.events[this.events.length - 1], l = o && "linePrefix" === o[1].type ? o[2].sliceSerialize(o[1], !0).length : 0, s = 0;
                return function(t) {
                    return e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), 
                    r = t, c(t);
                };
                function c(t) {
                    return t === r ? (e.consume(t), s++, c) : (e.exit("codeFencedFenceSequence"), s < 3 ? n(t) : Ie(e, d, "whitespace")(t));
                }
                function d(t) {
                    return null === t || Ne(t) ? g(t) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
                        contentType: "string"
                    }), p(t));
                }
                function p(t) {
                    return null === t || Se(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), 
                    Ie(e, f, "whitespace")(t)) : 96 === t && t === r ? n(t) : (e.consume(t), p);
                }
                function f(t) {
                    return null === t || Ne(t) ? g(t) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
                        contentType: "string"
                    }), D(t));
                }
                function D(t) {
                    return null === t || Ne(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), 
                    g(t)) : 96 === t && t === r ? n(t) : (e.consume(t), D);
                }
                function g(n) {
                    return e.exit("codeFencedFence"), u.interrupt ? t(n) : h(n);
                }
                function h(t) {
                    return null === t ? b(t) : Ne(t) ? e.attempt(i, e.attempt(a, b, l ? Ie(e, h, "linePrefix", l + 1) : h), b)(t) : (e.enter("codeFlowValue"), 
                    m(t));
                }
                function m(t) {
                    return null === t || Ne(t) ? (e.exit("codeFlowValue"), h(t)) : (e.consume(t), m);
                }
                function b(n) {
                    return e.exit("codeFenced"), t(n);
                }
            },
            concrete: !0
        }, yt = document.createElement("i");
        function _t(e) {
            var t = "&" + e + ";";
            yt.innerHTML = t;
            var n = yt.textContent;
            return (59 !== n.charCodeAt(n.length - 1) || "semi" === e) && n !== t && n;
        }
        var Ct = {
            name: "characterReference",
            tokenize: function(e, t, n) {
                var r, u, a = this, i = 0;
                return function(t) {
                    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(t), 
                    e.exit("characterReferenceMarker"), o;
                };
                function o(t) {
                    return 35 === t ? (e.enter("characterReferenceMarkerNumeric"), e.consume(t), e.exit("characterReferenceMarkerNumeric"), 
                    l) : (e.enter("characterReferenceValue"), r = 31, u = xe, s(t));
                }
                function l(t) {
                    return 88 === t || 120 === t ? (e.enter("characterReferenceMarkerHexadecimal"), 
                    e.consume(t), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), 
                    r = 6, u = Ae, s) : (e.enter("characterReferenceValue"), r = 7, u = Fe, s(t));
                }
                function s(o) {
                    var l;
                    return 59 === o && i ? (l = e.exit("characterReferenceValue"), u !== xe || _t(a.sliceSerialize(l)) ? (e.enter("characterReferenceMarker"), 
                    e.consume(o), e.exit("characterReferenceMarker"), e.exit("characterReference"), 
                    t) : n(o)) : u(o) && i++ < r ? (e.consume(o), s) : n(o);
                }
            }
        }, Ft = {
            name: "characterEscape",
            tokenize: function(e, t, n) {
                return function(t) {
                    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(t), e.exit("escapeMarker"), 
                    r;
                };
                function r(r) {
                    return we(r) ? (e.enter("characterEscapeValue"), e.consume(r), e.exit("characterEscapeValue"), 
                    e.exit("characterEscape"), t) : n(r);
                }
            }
        }, At = {
            name: "lineEnding",
            tokenize: function(e, t) {
                return function(n) {
                    return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), Ie(e, t, "linePrefix");
                };
            }
        }, xt = {
            name: "labelEnd",
            tokenize: function(e, t, n) {
                for (var r, u, a = this, i = a.events.length; i--; ) if (("labelImage" === a.events[i][1].type || "labelLink" === a.events[i][1].type) && !a.events[i][1]._balanced) {
                    r = a.events[i][1];
                    break;
                }
                return function(t) {
                    return r ? r._inactive ? l(t) : (u = a.parser.defined.includes(st(a.sliceSerialize({
                        start: r.end,
                        end: a.now()
                    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), 
                    e.exit("labelEnd"), o) : n(t);
                };
                function o(n) {
                    return 40 === n ? e.attempt(wt, t, u ? t : l)(n) : 91 === n ? e.attempt(kt, t, u ? e.attempt(Bt, t, l) : l)(n) : u ? t(n) : l(n);
                }
                function l(e) {
                    return r._balanced = !0, n(e);
                }
            },
            resolveTo: function(e, t) {
                for (var n, r, u, a, i = e.length, o = 0; i--; ) if (n = e[i][1], r) {
                    if ("link" === n.type || "labelLink" === n.type && n._inactive) break;
                    "enter" === e[i][0] && "labelLink" === n.type && (n._inactive = !0);
                } else if (u) {
                    if ("enter" === e[i][0] && ("labelImage" === n.type || "labelLink" === n.type) && !n._balanced && (r = i, 
                    "labelLink" !== n.type)) {
                        o = 2;
                        break;
                    }
                } else "labelEnd" === n.type && (u = i);
                var l = {
                    type: "labelLink" === e[r][1].type ? "link" : "image",
                    start: Object.assign({}, e[r][1].start),
                    end: Object.assign({}, e[e.length - 1][1].end)
                }, s = {
                    type: "label",
                    start: Object.assign({}, e[r][1].start),
                    end: Object.assign({}, e[u][1].end)
                }, c = {
                    type: "labelText",
                    start: Object.assign({}, e[r + o + 2][1].end),
                    end: Object.assign({}, e[u - 2][1].start)
                };
                return a = be(a = [ [ "enter", l, t ], [ "enter", s, t ] ], e.slice(r + 1, r + o + 3)), 
                a = be(a, [ [ "enter", c, t ] ]), a = be(a, Ye(t.parser.constructs.insideSpan.null, e.slice(r + o + 4, u - 3), t)), 
                a = be(a, [ [ "exit", c, t ], e[u - 2], e[u - 1], [ "exit", s, t ] ]), a = be(a, e.slice(u + 1)), 
                a = be(a, [ [ "exit", l, t ] ]), me(e, r, e.length, a), e;
            },
            resolveAll: function(e) {
                for (var t, n = -1; ++n < e.length; ) "labelImage" !== (t = e[n][1]).type && "labelLink" !== t.type && "labelEnd" !== t.type || (e.splice(n + 1, "labelImage" === t.type ? 4 : 2), 
                t.type = "data", n++);
                return e;
            }
        }, wt = {
            tokenize: function(e, t, n) {
                return function(t) {
                    return e.enter("resource"), e.enter("resourceMarker"), e.consume(t), e.exit("resourceMarker"), 
                    lt(e, r);
                };
                function r(t) {
                    return 41 === t ? i(t) : at(e, u, n, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(t);
                }
                function u(t) {
                    return Se(t) ? lt(e, a)(t) : i(t);
                }
                function a(t) {
                    return 34 === t || 39 === t || 40 === t ? ot(e, lt(e, i), n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(t) : i(t);
                }
                function i(r) {
                    return 41 === r ? (e.enter("resourceMarker"), e.consume(r), e.exit("resourceMarker"), 
                    e.exit("resource"), t) : n(r);
                }
            }
        }, kt = {
            tokenize: function(e, t, n) {
                var r = this;
                return function(t) {
                    return it.call(r, e, u, n, "reference", "referenceMarker", "referenceString")(t);
                };
                function u(e) {
                    return r.parser.defined.includes(st(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(e) : n(e);
                }
            }
        }, Bt = {
            tokenize: function(e, t, n) {
                return function(t) {
                    return e.enter("reference"), e.enter("referenceMarker"), e.consume(t), e.exit("referenceMarker"), 
                    r;
                };
                function r(r) {
                    return 93 === r ? (e.enter("referenceMarker"), e.consume(r), e.exit("referenceMarker"), 
                    e.exit("reference"), t) : n(r);
                }
            }
        }, St = {
            name: "labelStartImage",
            tokenize: function(e, t, n) {
                var r = this;
                return function(t) {
                    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(t), e.exit("labelImageMarker"), 
                    u;
                };
                function u(t) {
                    return 91 === t ? (e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), 
                    e.exit("labelImage"), a) : n(t);
                }
                function a(e) {
                    return 94 === e && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : t(e);
                }
            },
            resolveAll: xt.resolveAll
        };
        function Nt(e) {
            return null === e || Se(e) || Te(e) ? 1 : Me(e) ? 2 : void 0;
        }
        var Ot = {
            name: "attention",
            tokenize: function(e, t) {
                var n, r = this.parser.constructs.attentionMarkers.null, u = this.previous, a = Nt(u);
                return function(t) {
                    return e.enter("attentionSequence"), n = t, i(t);
                };
                function i(o) {
                    if (o === n) return e.consume(o), i;
                    var l = e.exit("attentionSequence"), s = Nt(o), c = !s || 2 === s && a || r.includes(o), d = !a || 2 === a && s || r.includes(u);
                    return l._open = Boolean(42 === n ? c : c && (a || !d)), l._close = Boolean(42 === n ? d : d && (s || !c)), 
                    t(o);
                }
            },
            resolveAll: function(e, t) {
                for (var n, r, u, a, i, o, l, s, c = -1; ++c < e.length; ) if ("enter" === e[c][0] && "attentionSequence" === e[c][1].type && e[c][1]._close) for (n = c; n--; ) if ("exit" === e[n][0] && "attentionSequence" === e[n][1].type && e[n][1]._open && t.sliceSerialize(e[n][1]).charCodeAt(0) === t.sliceSerialize(e[c][1]).charCodeAt(0)) {
                    if ((e[n][1]._close || e[c][1]._open) && (e[c][1].end.offset - e[c][1].start.offset) % 3 && !((e[n][1].end.offset - e[n][1].start.offset + e[c][1].end.offset - e[c][1].start.offset) % 3)) continue;
                    o = e[n][1].end.offset - e[n][1].start.offset > 1 && e[c][1].end.offset - e[c][1].start.offset > 1 ? 2 : 1;
                    var d = Object.assign({}, e[n][1].end), p = Object.assign({}, e[c][1].start);
                    Tt(d, -o), Tt(p, o), a = {
                        type: o > 1 ? "strongSequence" : "emphasisSequence",
                        start: d,
                        end: Object.assign({}, e[n][1].end)
                    }, i = {
                        type: o > 1 ? "strongSequence" : "emphasisSequence",
                        start: Object.assign({}, e[c][1].start),
                        end: p
                    }, u = {
                        type: o > 1 ? "strongText" : "emphasisText",
                        start: Object.assign({}, e[n][1].end),
                        end: Object.assign({}, e[c][1].start)
                    }, r = {
                        type: o > 1 ? "strong" : "emphasis",
                        start: Object.assign({}, a.start),
                        end: Object.assign({}, i.end)
                    }, e[n][1].end = Object.assign({}, a.start), e[c][1].start = Object.assign({}, i.end), 
                    l = [], e[n][1].end.offset - e[n][1].start.offset && (l = be(l, [ [ "enter", e[n][1], t ], [ "exit", e[n][1], t ] ])), 
                    l = be(l, [ [ "enter", r, t ], [ "enter", a, t ], [ "exit", a, t ], [ "enter", u, t ] ]), 
                    l = be(l, Ye(t.parser.constructs.insideSpan.null, e.slice(n + 1, c), t)), l = be(l, [ [ "exit", u, t ], [ "enter", i, t ], [ "exit", i, t ], [ "exit", r, t ] ]), 
                    e[c][1].end.offset - e[c][1].start.offset ? (s = 2, l = be(l, [ [ "enter", e[c][1], t ], [ "exit", e[c][1], t ] ])) : s = 0, 
                    me(e, n - 1, c - n + 3, l), c = n + l.length - s - 2;
                    break;
                }
                for (c = -1; ++c < e.length; ) "attentionSequence" === e[c][1].type && (e[c][1].type = "data");
                return e;
            }
        };
        function Tt(e, t) {
            e.column += t, e.offset += t, e._bufferIndex += t;
        }
        var Pt, jt, zt, Ut, qt, Mt = {
            name: "autolink",
            tokenize: function(e, t, n) {
                var r = 1;
                return function(t) {
                    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(t), e.exit("autolinkMarker"), 
                    e.enter("autolinkProtocol"), u;
                };
                function u(t) {
                    return Ce(t) ? (e.consume(t), a) : ke(t) ? l(t) : n(t);
                }
                function a(e) {
                    return 43 === e || 45 === e || 46 === e || xe(e) ? i(e) : l(e);
                }
                function i(t) {
                    return 58 === t ? (e.consume(t), o) : (43 === t || 45 === t || 46 === t || xe(t)) && r++ < 32 ? (e.consume(t), 
                    i) : l(t);
                }
                function o(t) {
                    return 62 === t ? (e.exit("autolinkProtocol"), p(t)) : null === t || 32 === t || 60 === t || Be(t) ? n(t) : (e.consume(t), 
                    o);
                }
                function l(t) {
                    return 64 === t ? (e.consume(t), r = 0, s) : ke(t) ? (e.consume(t), l) : n(t);
                }
                function s(e) {
                    return xe(e) ? c(e) : n(e);
                }
                function c(t) {
                    return 46 === t ? (e.consume(t), r = 0, s) : 62 === t ? (e.exit("autolinkProtocol").type = "autolinkEmail", 
                    p(t)) : d(t);
                }
                function d(t) {
                    return (45 === t || xe(t)) && r++ < 63 ? (e.consume(t), 45 === t ? d : c) : n(t);
                }
                function p(n) {
                    return e.enter("autolinkMarker"), e.consume(n), e.exit("autolinkMarker"), e.exit("autolink"), 
                    t;
                }
            }
        }, Lt = {
            name: "htmlText",
            tokenize: function(e, t, n) {
                var r, u, a, i, o = this;
                return function(t) {
                    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(t), l;
                };
                function l(t) {
                    return 33 === t ? (e.consume(t), s) : 47 === t ? (e.consume(t), _) : 63 === t ? (e.consume(t), 
                    E) : Ce(t) ? (e.consume(t), A) : n(t);
                }
                function s(t) {
                    return 45 === t ? (e.consume(t), c) : 91 === t ? (e.consume(t), u = "CDATA[", a = 0, 
                    g) : Ce(t) ? (e.consume(t), v) : n(t);
                }
                function c(t) {
                    return 45 === t ? (e.consume(t), d) : n(t);
                }
                function d(t) {
                    return null === t || 62 === t ? n(t) : 45 === t ? (e.consume(t), p) : f(t);
                }
                function p(e) {
                    return null === e || 62 === e ? n(e) : f(e);
                }
                function f(t) {
                    return null === t ? n(t) : 45 === t ? (e.consume(t), D) : Ne(t) ? (i = f, T(t)) : (e.consume(t), 
                    f);
                }
                function D(t) {
                    return 45 === t ? (e.consume(t), L) : f(t);
                }
                function g(t) {
                    return t === u.charCodeAt(a++) ? (e.consume(t), a === u.length ? h : g) : n(t);
                }
                function h(t) {
                    return null === t ? n(t) : 93 === t ? (e.consume(t), m) : Ne(t) ? (i = h, T(t)) : (e.consume(t), 
                    h);
                }
                function m(t) {
                    return 93 === t ? (e.consume(t), b) : h(t);
                }
                function b(t) {
                    return 62 === t ? L(t) : 93 === t ? (e.consume(t), b) : h(t);
                }
                function v(t) {
                    return null === t || 62 === t ? L(t) : Ne(t) ? (i = v, T(t)) : (e.consume(t), v);
                }
                function E(t) {
                    return null === t ? n(t) : 63 === t ? (e.consume(t), y) : Ne(t) ? (i = E, T(t)) : (e.consume(t), 
                    E);
                }
                function y(e) {
                    return 62 === e ? L(e) : E(e);
                }
                function _(t) {
                    return Ce(t) ? (e.consume(t), C) : n(t);
                }
                function C(t) {
                    return 45 === t || xe(t) ? (e.consume(t), C) : F(t);
                }
                function F(t) {
                    return Ne(t) ? (i = F, T(t)) : Oe(t) ? (e.consume(t), F) : L(t);
                }
                function A(t) {
                    return 45 === t || xe(t) ? (e.consume(t), A) : 47 === t || 62 === t || Se(t) ? x(t) : n(t);
                }
                function x(t) {
                    return 47 === t ? (e.consume(t), L) : 58 === t || 95 === t || Ce(t) ? (e.consume(t), 
                    w) : Ne(t) ? (i = x, T(t)) : Oe(t) ? (e.consume(t), x) : L(t);
                }
                function w(t) {
                    return 45 === t || 46 === t || 58 === t || 95 === t || xe(t) ? (e.consume(t), w) : k(t);
                }
                function k(t) {
                    return 61 === t ? (e.consume(t), B) : Ne(t) ? (i = k, T(t)) : Oe(t) ? (e.consume(t), 
                    k) : x(t);
                }
                function B(t) {
                    return null === t || 60 === t || 61 === t || 62 === t || 96 === t ? n(t) : 34 === t || 39 === t ? (e.consume(t), 
                    r = t, S) : Ne(t) ? (i = B, T(t)) : Oe(t) ? (e.consume(t), B) : (e.consume(t), r = void 0, 
                    O);
                }
                function S(t) {
                    return t === r ? (e.consume(t), N) : null === t ? n(t) : Ne(t) ? (i = S, T(t)) : (e.consume(t), 
                    S);
                }
                function N(e) {
                    return 62 === e || 47 === e || Se(e) ? x(e) : n(e);
                }
                function O(t) {
                    return null === t || 34 === t || 39 === t || 60 === t || 61 === t || 96 === t ? n(t) : 62 === t || Se(t) ? x(t) : (e.consume(t), 
                    O);
                }
                function T(t) {
                    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), 
                    Ie(e, M, "linePrefix", o.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
                }
                function M(t) {
                    return e.enter("htmlTextData"), i(t);
                }
                function L(r) {
                    return 62 === r ? (e.consume(r), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(r);
                }
            }
        }, It = {
            name: "labelStartLink",
            tokenize: function(e, t, n) {
                var r = this;
                return function(t) {
                    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), 
                    e.exit("labelLink"), u;
                };
                function u(e) {
                    return 94 === e && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : t(e);
                }
            },
            resolveAll: xt.resolveAll
        }, Rt = {
            name: "hardBreakEscape",
            tokenize: function(e, t, n) {
                return function(t) {
                    return e.enter("hardBreakEscape"), e.enter("escapeMarker"), e.consume(t), r;
                };
                function r(r) {
                    return Ne(r) ? (e.exit("escapeMarker"), e.exit("hardBreakEscape"), t(r)) : n(r);
                }
            }
        }, Ht = {
            name: "codeText",
            tokenize: function(e, t, n) {
                var r, u, a = 0;
                return function(t) {
                    return e.enter("codeText"), e.enter("codeTextSequence"), i(t);
                };
                function i(t) {
                    return 96 === t ? (e.consume(t), a++, i) : (e.exit("codeTextSequence"), o(t));
                }
                function o(t) {
                    return null === t ? n(t) : 96 === t ? (u = e.enter("codeTextSequence"), r = 0, s(t)) : 32 === t ? (e.enter("space"), 
                    e.consume(t), e.exit("space"), o) : Ne(t) ? (e.enter("lineEnding"), e.consume(t), 
                    e.exit("lineEnding"), o) : (e.enter("codeTextData"), l(t));
                }
                function l(t) {
                    return null === t || 32 === t || 96 === t || Ne(t) ? (e.exit("codeTextData"), o(t)) : (e.consume(t), 
                    l);
                }
                function s(n) {
                    return 96 === n ? (e.consume(n), r++, s) : r === a ? (e.exit("codeTextSequence"), 
                    e.exit("codeText"), t(n)) : (u.type = "codeTextData", l(n));
                }
            },
            resolve: function(e) {
                var t, n, r = e.length - 4, u = 3;
                if (!("lineEnding" !== e[u][1].type && "space" !== e[u][1].type || "lineEnding" !== e[r][1].type && "space" !== e[r][1].type)) for (t = u; ++t < r; ) if ("codeTextData" === e[t][1].type) {
                    e[u][1].type = "codeTextPadding", e[r][1].type = "codeTextPadding", u += 2, r -= 2;
                    break;
                }
                for (t = u - 1, r++; ++t <= r; ) void 0 === n ? t !== r && "lineEnding" !== e[t][1].type && (n = t) : t !== r && "lineEnding" !== e[t][1].type || (e[n][1].type = "codeTextData", 
                t !== n + 2 && (e[n][1].end = e[t - 1][1].end, e.splice(n + 2, t - n - 2), r -= t - n - 2, 
                t = n + 2), n = void 0);
                return e;
            },
            previous: function(e) {
                return 96 !== e || "characterEscape" === this.events[this.events.length - 1][1].type;
            }
        }, $t = (B(Pt = {}, 42, tt), B(Pt, 43, tt), B(Pt, 45, tt), B(Pt, 48, tt), B(Pt, 49, tt), 
        B(Pt, 50, tt), B(Pt, 51, tt), B(Pt, 52, tt), B(Pt, 53, tt), B(Pt, 54, tt), B(Pt, 55, tt), 
        B(Pt, 56, tt), B(Pt, 57, tt), B(Pt, 62, ut), Pt), Kt = B({}, 91, ct), Vt = (B(jt = {}, -2, pt), 
        B(jt, -1, pt), B(jt, 32, pt), jt), Gt = (B(zt = {}, 35, Dt), B(zt, 42, et), B(zt, 45, [ gt, et ]), 
        B(zt, 60, bt), B(zt, 61, gt), B(zt, 95, et), B(zt, 96, Et), B(zt, 126, Et), zt), Wt = (B(Ut = {}, 38, Ct), 
        B(Ut, 92, Ft), Ut), Qt = (B(qt = {}, -5, At), B(qt, -4, At), B(qt, -3, At), B(qt, 33, St), 
        B(qt, 38, Ct), B(qt, 42, Ot), B(qt, 60, [ Mt, Lt ]), B(qt, 91, It), B(qt, 92, [ Rt, Ft ]), 
        B(qt, 93, xt), B(qt, 95, Ot), B(qt, 96, Ht), qt), Zt = {
            null: [ Ot, Ve ]
        }, Xt = {
            null: [ 42, 95 ]
        }, Yt = {
            null: []
        }, Jt = /[\0\t\n\r]/g;
        function en(e, t) {
            var n = Number.parseInt(e, t);
            return n < 9 || 11 === n || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || 65535 == (65535 & n) || 65534 == (65535 & n) || n > 1114111 ? "�" : String.fromCharCode(n);
        }
        var tn = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
        function nn(e, t, n) {
            if (t) return t;
            if (35 === n.charCodeAt(0)) {
                var r = n.charCodeAt(1), u = 120 === r || 88 === r;
                return en(n.slice(u ? 2 : 1), u ? 16 : 10);
            }
            return _t(n) || e;
        }
        var rn = {}.hasOwnProperty, un = function(t, n, r) {
            return "string" != typeof n && (r = n, n = void 0), function(e) {
                var t = {
                    transforms: [],
                    canContainEols: [ "emphasis", "fragment", "heading", "paragraph", "strong" ],
                    enter: {
                        autolink: o(re),
                        autolinkProtocol: w,
                        autolinkEmail: w,
                        atxHeading: o(J),
                        blockQuote: o((function() {
                            return {
                                type: "blockquote",
                                children: []
                            };
                        })),
                        characterEscape: w,
                        characterReference: w,
                        codeFenced: o(Q),
                        codeFencedFenceInfo: l,
                        codeFencedFenceMeta: l,
                        codeIndented: o(Q, l),
                        codeText: o((function() {
                            return {
                                type: "inlineCode",
                                value: ""
                            };
                        }), l),
                        codeTextData: w,
                        data: w,
                        codeFlowValue: w,
                        definition: o((function() {
                            return {
                                type: "definition",
                                identifier: "",
                                label: null,
                                title: null,
                                url: ""
                            };
                        })),
                        definitionDestinationString: l,
                        definitionLabelString: l,
                        definitionTitleString: l,
                        emphasis: o((function() {
                            return {
                                type: "emphasis",
                                children: []
                            };
                        })),
                        hardBreakEscape: o(ee),
                        hardBreakTrailing: o(ee),
                        htmlFlow: o(te, l),
                        htmlFlowData: w,
                        htmlText: o(te, l),
                        htmlTextData: w,
                        image: o((function() {
                            return {
                                type: "image",
                                title: null,
                                url: "",
                                alt: null
                            };
                        })),
                        label: l,
                        link: o(re),
                        listItem: o((function(e) {
                            return {
                                type: "listItem",
                                spread: e._spread,
                                checked: null,
                                children: []
                            };
                        })),
                        listItemValue: function(e) {
                            i("expectingFirstListItemValue") && (this.stack[this.stack.length - 2].start = Number.parseInt(this.sliceSerialize(e), 10), 
                            a("expectingFirstListItemValue"));
                        },
                        listOrdered: o(ue, (function() {
                            a("expectingFirstListItemValue", !0);
                        })),
                        listUnordered: o(ue),
                        paragraph: o((function() {
                            return {
                                type: "paragraph",
                                children: []
                            };
                        })),
                        reference: function() {
                            a("referenceType", "collapsed");
                        },
                        referenceString: l,
                        resourceDestinationString: l,
                        resourceTitleString: l,
                        setextHeading: o(J),
                        strong: o((function() {
                            return {
                                type: "strong",
                                children: []
                            };
                        })),
                        thematicBreak: o((function() {
                            return {
                                type: "thematicBreak"
                            };
                        }))
                    },
                    exit: {
                        atxHeading: c(),
                        atxHeadingSequence: function(e) {
                            var t = this.stack[this.stack.length - 1];
                            if (!t.depth) {
                                var n = this.sliceSerialize(e).length;
                                t.depth = n;
                            }
                        },
                        autolink: c(),
                        autolinkEmail: function(e) {
                            k.call(this, e), this.stack[this.stack.length - 1].url = "mailto:" + this.sliceSerialize(e);
                        },
                        autolinkProtocol: function(e) {
                            k.call(this, e), this.stack[this.stack.length - 1].url = this.sliceSerialize(e);
                        },
                        blockQuote: c(),
                        characterEscapeValue: k,
                        characterReferenceMarkerHexadecimal: $,
                        characterReferenceMarkerNumeric: $,
                        characterReferenceValue: function(e) {
                            var t, n = this.sliceSerialize(e), r = i("characterReferenceType");
                            r ? (t = en(n, "characterReferenceMarkerNumeric" === r ? 10 : 16), a("characterReferenceType")) : t = _t(n);
                            var u = this.stack.pop();
                            u.value += t, u.position.end = an(e.end);
                        },
                        codeFenced: c((function() {
                            var e = this.resume();
                            this.stack[this.stack.length - 1].value = e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), 
                            a("flowCodeInside");
                        })),
                        codeFencedFence: function() {
                            i("flowCodeInside") || (this.buffer(), a("flowCodeInside", !0));
                        },
                        codeFencedFenceInfo: function() {
                            var e = this.resume();
                            this.stack[this.stack.length - 1].lang = e;
                        },
                        codeFencedFenceMeta: function() {
                            var e = this.resume();
                            this.stack[this.stack.length - 1].meta = e;
                        },
                        codeFlowValue: k,
                        codeIndented: c((function() {
                            var e = this.resume();
                            this.stack[this.stack.length - 1].value = e.replace(/(\r?\n|\r)$/g, "");
                        })),
                        codeText: c((function() {
                            var e = this.resume();
                            this.stack[this.stack.length - 1].value = e;
                        })),
                        codeTextData: k,
                        data: k,
                        definition: c(),
                        definitionDestinationString: function() {
                            var e = this.resume();
                            this.stack[this.stack.length - 1].url = e;
                        },
                        definitionLabelString: function(e) {
                            var t = this.resume(), n = this.stack[this.stack.length - 1];
                            n.label = t, n.identifier = st(this.sliceSerialize(e)).toLowerCase();
                        },
                        definitionTitleString: function() {
                            var e = this.resume();
                            this.stack[this.stack.length - 1].title = e;
                        },
                        emphasis: c(),
                        hardBreakEscape: c(S),
                        hardBreakTrailing: c(S),
                        htmlFlow: c((function() {
                            var e = this.resume();
                            this.stack[this.stack.length - 1].value = e;
                        })),
                        htmlFlowData: k,
                        htmlText: c((function() {
                            var e = this.resume();
                            this.stack[this.stack.length - 1].value = e;
                        })),
                        htmlTextData: k,
                        image: c((function() {
                            var e = this.stack[this.stack.length - 1];
                            if (i("inReference")) {
                                var t = i("referenceType") || "shortcut";
                                e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
                            } else delete e.identifier, delete e.label;
                            a("referenceType");
                        })),
                        label: function() {
                            var e = this.stack[this.stack.length - 1], t = this.resume(), n = this.stack[this.stack.length - 1];
                            if (a("inReference", !0), "link" === n.type) {
                                var r = e.children;
                                n.children = r;
                            } else n.alt = t;
                        },
                        labelText: function(e) {
                            var t = this.sliceSerialize(e), n = this.stack[this.stack.length - 2];
                            n.label = function(e) {
                                return e.replace(tn, nn);
                            }(t), n.identifier = st(t).toLowerCase();
                        },
                        lineEnding: function(e) {
                            var n = this.stack[this.stack.length - 1];
                            if (i("atHardBreak")) return n.children[n.children.length - 1].position.end = an(e.end), 
                            void a("atHardBreak");
                            !i("setextHeadingSlurpLineEnding") && t.canContainEols.includes(n.type) && (w.call(this, e), 
                            k.call(this, e));
                        },
                        link: c((function() {
                            var e = this.stack[this.stack.length - 1];
                            if (i("inReference")) {
                                var t = i("referenceType") || "shortcut";
                                e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
                            } else delete e.identifier, delete e.label;
                            a("referenceType");
                        })),
                        listItem: c(),
                        listOrdered: c(),
                        listUnordered: c(),
                        paragraph: c(),
                        referenceString: function(e) {
                            var t = this.resume(), n = this.stack[this.stack.length - 1];
                            n.label = t, n.identifier = st(this.sliceSerialize(e)).toLowerCase(), a("referenceType", "full");
                        },
                        resourceDestinationString: function() {
                            var e = this.resume();
                            this.stack[this.stack.length - 1].url = e;
                        },
                        resourceTitleString: function() {
                            var e = this.resume();
                            this.stack[this.stack.length - 1].title = e;
                        },
                        resource: function() {
                            a("inReference");
                        },
                        setextHeading: c((function() {
                            a("setextHeadingSlurpLineEnding");
                        })),
                        setextHeadingLineSequence: function(e) {
                            this.stack[this.stack.length - 1].depth = 61 === this.sliceSerialize(e).charCodeAt(0) ? 1 : 2;
                        },
                        setextHeadingText: function() {
                            a("setextHeadingSlurpLineEnding", !0);
                        },
                        strong: c(),
                        thematicBreak: c()
                    }
                };
                on(t, (e || {}).mdastExtensions || []);
                var n = {};
                return function(e) {
                    for (var n = {
                        type: "root",
                        children: []
                    }, r = {
                        stack: [ n ],
                        tokenStack: [],
                        config: t,
                        enter: s,
                        exit: d,
                        buffer: l,
                        resume: p,
                        setData: a,
                        getData: i
                    }, o = [], c = -1; ++c < e.length; ) "listOrdered" !== e[c][1].type && "listUnordered" !== e[c][1].type || ("enter" === e[c][0] ? o.push(c) : c = u(e, o.pop(), c));
                    for (c = -1; ++c < e.length; ) {
                        var f = t[e[c][0]];
                        rn.call(f, e[c][1].type) && f[e[c][1].type].call(Object.assign({
                            sliceSerialize: e[c][2].sliceSerialize
                        }, r), e[c][1]);
                    }
                    if (r.tokenStack.length > 0) {
                        var D = r.tokenStack[r.tokenStack.length - 1];
                        (D[1] || sn).call(r, void 0, D[0]);
                    }
                    for (n.position = {
                        start: an(e.length > 0 ? e[0][1].start : {
                            line: 1,
                            column: 1,
                            offset: 0
                        }),
                        end: an(e.length > 0 ? e[e.length - 2][1].end : {
                            line: 1,
                            column: 1,
                            offset: 0
                        })
                    }, c = -1; ++c < t.transforms.length; ) n = t.transforms[c](n) || n;
                    return n;
                };
                function u(e, t, n) {
                    for (var r, u, a, i, o = t - 1, l = -1, s = !1; ++o <= n; ) {
                        var c = e[o];
                        if ("listUnordered" === c[1].type || "listOrdered" === c[1].type || "blockQuote" === c[1].type ? ("enter" === c[0] ? l++ : l--, 
                        i = void 0) : "lineEndingBlank" === c[1].type ? "enter" === c[0] && (!r || i || l || a || (a = o), 
                        i = void 0) : "linePrefix" === c[1].type || "listItemValue" === c[1].type || "listItemMarker" === c[1].type || "listItemPrefix" === c[1].type || "listItemPrefixWhitespace" === c[1].type || (i = void 0), 
                        !l && "enter" === c[0] && "listItemPrefix" === c[1].type || -1 === l && "exit" === c[0] && ("listUnordered" === c[1].type || "listOrdered" === c[1].type)) {
                            if (r) {
                                var d = o;
                                for (u = void 0; d--; ) {
                                    var p = e[d];
                                    if ("lineEnding" === p[1].type || "lineEndingBlank" === p[1].type) {
                                        if ("exit" === p[0]) continue;
                                        u && (e[u][1].type = "lineEndingBlank", s = !0), p[1].type = "lineEnding", u = d;
                                    } else if ("linePrefix" !== p[1].type && "blockQuotePrefix" !== p[1].type && "blockQuotePrefixWhitespace" !== p[1].type && "blockQuoteMarker" !== p[1].type && "listItemIndent" !== p[1].type) break;
                                }
                                a && (!u || a < u) && (r._spread = !0), r.end = Object.assign({}, u ? e[u][1].start : c[1].end), 
                                e.splice(u || o, 0, [ "exit", r, c[2] ]), o++, n++;
                            }
                            "listItemPrefix" === c[1].type && (r = {
                                type: "listItem",
                                _spread: !1,
                                start: Object.assign({}, c[1].start)
                            }, e.splice(o, 0, [ "enter", r, c[2] ]), o++, n++, a = void 0, i = !0);
                        }
                    }
                    return e[t][1]._spread = s, n;
                }
                function a(e, t) {
                    n[e] = t;
                }
                function i(e) {
                    return n[e];
                }
                function o(e, t) {
                    return function(n) {
                        s.call(this, e(n), n), t && t.call(this, n);
                    };
                }
                function l() {
                    this.stack.push({
                        type: "fragment",
                        children: []
                    });
                }
                function s(e, t, n) {
                    return this.stack[this.stack.length - 1].children.push(e), this.stack.push(e), this.tokenStack.push([ t, n ]), 
                    e.position = {
                        start: an(t.start)
                    }, e;
                }
                function c(e) {
                    return function(t) {
                        e && e.call(this, t), d.call(this, t);
                    };
                }
                function d(e, t) {
                    var n = this.stack.pop(), r = this.tokenStack.pop();
                    if (!r) throw new Error("Cannot close `" + e.type + "` (" + R({
                        start: e.start,
                        end: e.end
                    }) + "): it’s not open");
                    return r[0].type !== e.type && (t ? t.call(this, e, r[0]) : (r[1] || sn).call(this, e, r[0])), 
                    n.position.end = an(e.end), n;
                }
                function p() {
                    return function(e, t) {
                        var n = {}.includeImageAlt;
                        return ge(e, "boolean" != typeof n || n);
                    }(this.stack.pop());
                }
                function w(e) {
                    var t = this.stack[this.stack.length - 1], n = t.children[t.children.length - 1];
                    n && "text" === n.type || ((n = {
                        type: "text",
                        value: ""
                    }).position = {
                        start: an(e.start)
                    }, t.children.push(n)), this.stack.push(n);
                }
                function k(e) {
                    var t = this.stack.pop();
                    t.value += this.sliceSerialize(e), t.position.end = an(e.end);
                }
                function S() {
                    a("atHardBreak", !0);
                }
                function $(e) {
                    a("characterReferenceType", e.type);
                }
                function Q() {
                    return {
                        type: "code",
                        lang: null,
                        meta: null,
                        value: ""
                    };
                }
                function J() {
                    return {
                        type: "heading",
                        depth: void 0,
                        children: []
                    };
                }
                function ee() {
                    return {
                        type: "break"
                    };
                }
                function te() {
                    return {
                        type: "html",
                        value: ""
                    };
                }
                function re() {
                    return {
                        type: "link",
                        title: null,
                        url: "",
                        children: []
                    };
                }
                function ue(e) {
                    return {
                        type: "list",
                        ordered: "listOrdered" === e.type,
                        start: null,
                        spread: e._spread,
                        children: []
                    };
                }
            }(r)(function(e) {
                for (;!Ue(e); ) ;
                return e;
            }(function() {
                var t = {
                    defined: [],
                    lazy: {},
                    constructs: Ee([ e ].concat((arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).extensions || [])),
                    content: n(Re),
                    document: n(Pe),
                    flow: n(Ke),
                    string: n(Ge),
                    text: n(We)
                };
                return t;
                function n(e) {
                    return function(n) {
                        return Je(t, e, n);
                    };
                }
            }(r).document().write(function() {
                var e, t = 1, n = "", r = !0;
                return function(u, a, i) {
                    var o, l, s, c, d, p = [];
                    for (u = n + u.toString(a), s = 0, n = "", r && (65279 === u.charCodeAt(0) && s++, 
                    r = void 0); s < u.length; ) {
                        if (Jt.lastIndex = s, c = (o = Jt.exec(u)) && void 0 !== o.index ? o.index : u.length, 
                        d = u.charCodeAt(c), !o) {
                            n = u.slice(s);
                            break;
                        }
                        if (10 === d && s === c && e) p.push(-3), e = void 0; else switch (e && (p.push(-5), 
                        e = void 0), s < c && (p.push(u.slice(s, c)), t += c - s), d) {
                          case 0:
                            p.push(65533), t++;
                            break;

                          case 9:
                            for (l = 4 * Math.ceil(t / 4), p.push(-2); t++ < l; ) p.push(-1);
                            break;

                          case 10:
                            p.push(-4), t = 1;
                            break;

                          default:
                            e = !0, t = 1;
                        }
                        s = c + 1;
                    }
                    return i && (e && p.push(-5), n && p.push(n), p.push(null)), p;
                };
            }()(t, n, !0))));
        };
        function an(e) {
            return {
                line: e.line,
                column: e.column,
                offset: e.offset
            };
        }
        function on(e, t) {
            for (var n = -1; ++n < t.length; ) {
                var r = t[n];
                Array.isArray(r) ? on(e, r) : ln(e, r);
            }
        }
        function ln(e, t) {
            var n;
            for (n in t) if (rn.call(t, n)) if ("canContainEols" === n) {
                var r, u = t[n];
                u && (r = e[n]).push.apply(r, T(u));
            } else if ("transforms" === n) {
                var a, i = t[n];
                i && (a = e[n]).push.apply(a, T(i));
            } else if ("enter" === n || "exit" === n) {
                var o = t[n];
                o && Object.assign(e[n], o);
            }
        }
        function sn(e, t) {
            throw e ? new Error("Cannot close `" + e.type + "` (" + R({
                start: e.start,
                end: e.end
            }) + "): a different token (`" + t.type + "`, " + R({
                start: t.start,
                end: t.end
            }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + R({
                start: t.start,
                end: t.end
            }) + ") is still open");
        }
        var cn = function(e) {
            var t = this;
            Object.assign(this, {
                Parser: function(n) {
                    var r = t.data("settings");
                    return un(n, Object.assign({}, r, e, {
                        extensions: t.data("micromarkExtensions") || [],
                        mdastExtensions: t.data("fromMarkdownExtensions") || []
                    }));
                }
            });
        };
        function dn(e) {
            for (var t = [], n = -1, r = 0, u = 0; ++n < e.length; ) {
                var a = e.charCodeAt(n), i = "";
                if (37 === a && xe(e.charCodeAt(n + 1)) && xe(e.charCodeAt(n + 2))) u = 2; else if (a < 128) /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (i = String.fromCharCode(a)); else if (a > 55295 && a < 57344) {
                    var o = e.charCodeAt(n + 1);
                    a < 56320 && o > 56319 && o < 57344 ? (i = String.fromCharCode(a, o), u = 1) : i = "�";
                } else i = String.fromCharCode(a);
                i && (t.push(e.slice(r, n), encodeURIComponent(i)), r = n + u + 1, i = ""), u && (n += u, 
                u = 0);
            }
            return t.join("") + e.slice(r);
        }
        var pn = function(e) {
            if (null == e) return gn;
            if ("string" == typeof e) return function(e) {
                return Dn((function(t) {
                    return t && t.type === e;
                }));
            }(e);
            if ("object" == typeof e) return Array.isArray(e) ? function(e) {
                for (var t = [], n = -1; ++n < e.length; ) t[n] = pn(e[n]);
                return Dn((function() {
                    for (var e = -1, n = arguments.length, r = new Array(n), u = 0; u < n; u++) r[u] = arguments[u];
                    for (;++e < t.length; ) {
                        var a;
                        if ((a = t[e]).call.apply(a, [ this ].concat(r))) return !0;
                    }
                    return !1;
                }));
            }(e) : function(e) {
                return Dn((function(t) {
                    var n;
                    for (n in e) if (t[n] !== e[n]) return !1;
                    return !0;
                }));
            }(e);
            if ("function" == typeof e) return Dn(e);
            throw new Error("Expected function, string, or object as test");
        };
        function Dn(e) {
            return function(t) {
                for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), u = 1; u < n; u++) r[u - 1] = arguments[u];
                return Boolean(t && "object" == typeof t && "type" in t && Boolean(e.call.apply(e, [ this, t ].concat(r))));
            };
        }
        function gn() {
            return !0;
        }
        var mn = function(e, t, n, r) {
            "function" == typeof t && "function" != typeof n && (r = n, n = t, t = null), function(e, t, n, r) {
                "function" == typeof t && "function" != typeof n && (r = n, n = t, t = null);
                var u = pn(t), a = r ? -1 : 1;
                !function e(i, o, l) {
                    var s = i && "object" == typeof i ? i : {};
                    if ("string" == typeof s.type) {
                        var c = "string" == typeof s.tagName ? s.tagName : "string" == typeof s.name ? s.name : void 0;
                        Object.defineProperty(d, "name", {
                            value: "node (" + i.type + (c ? "<" + c + ">" : "") + ")"
                        });
                    }
                    return d;
                    function d() {
                        var s, c, d, p = [];
                        if ((!t || u(i, o, l[l.length - 1] || null)) && !1 === (p = function(e) {
                            return Array.isArray(e) ? e : "number" == typeof e ? [ !0, e ] : [ e ];
                        }(n(i, l)))[0]) return p;
                        if (i.children && "skip" !== p[0]) for (c = (r ? i.children.length : -1) + a, d = l.concat(i); c > -1 && c < i.children.length; ) {
                            if (!1 === (s = e(i.children[c], c, d)())[0]) return s;
                            c = "number" == typeof s[1] ? s[1] : c + a;
                        }
                        return p;
                    }
                }(e, void 0, [])();
            }(e, t, (function(e, t) {
                var r = t[t.length - 1];
                return n(e, r ? r.children.indexOf(e) : null, r);
            }), r);
        }, bn = En("start"), vn = En("end");
        function En(e) {
            return function(t) {
                var n = t && t.position && t.position[e] || {};
                return {
                    line: n.line || null,
                    column: n.column || null,
                    offset: n.offset > -1 ? n.offset : null
                };
            };
        }
        var yn = {}.hasOwnProperty;
        function _n(e) {
            return String(e || "").toUpperCase();
        }
        function Cn(e, t) {
            var n, r = String(t.identifier).toUpperCase(), u = dn(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
            -1 === a ? (e.footnoteOrder.push(r), e.footnoteCounts[r] = 1, n = e.footnoteOrder.length) : (e.footnoteCounts[r]++, 
            n = a + 1);
            var i = e.footnoteCounts[r], o = {
                type: "element",
                tagName: "a",
                properties: {
                    href: "#" + e.clobberPrefix + "fn-" + u,
                    id: e.clobberPrefix + "fnref-" + u + (i > 1 ? "-" + i : ""),
                    dataFootnoteRef: !0,
                    ariaDescribedBy: [ "footnote-label" ]
                },
                children: [ {
                    type: "text",
                    value: String(n)
                } ]
            };
            e.patch(t, o);
            var l = {
                type: "element",
                tagName: "sup",
                properties: {},
                children: [ o ]
            };
            return e.patch(t, l), e.applyData(t, l);
        }
        function Fn(e, t) {
            var n = t.referenceType, r = "]";
            if ("collapsed" === n ? r += "[]" : "full" === n && (r += "[" + (t.label || t.identifier) + "]"), 
            "imageReference" === t.type) return {
                type: "text",
                value: "![" + t.alt + r
            };
            var u = e.all(t), a = u[0];
            a && "text" === a.type ? a.value = "[" + a.value : u.unshift({
                type: "text",
                value: "["
            });
            var i = u[u.length - 1];
            return i && "text" === i.type ? i.value += r : u.push({
                type: "text",
                value: r
            }), u;
        }
        function An(e) {
            var t = e.spread;
            return null == t ? e.children.length > 1 : t;
        }
        function xn(e) {
            for (var t = String(e), n = /\r?\n|\r/g, r = n.exec(t), u = 0, a = []; r; ) a.push(wn(t.slice(u, r.index), u > 0, !0), r[0]), 
            u = r.index + r[0].length, r = n.exec(t);
            return a.push(wn(t.slice(u), u > 0, !1)), a.join("");
        }
        function wn(e, t, n) {
            var r = 0, u = e.length;
            if (t) for (var a = e.codePointAt(r); 9 === a || 32 === a; ) r++, a = e.codePointAt(r);
            if (n) for (var i = e.codePointAt(u - 1); 9 === i || 32 === i; ) u--, i = e.codePointAt(u - 1);
            return u > r ? e.slice(r, u) : "";
        }
        var kn = {
            blockquote: function(e, t) {
                var n = {
                    type: "element",
                    tagName: "blockquote",
                    properties: {},
                    children: e.wrap(e.all(t), !0)
                };
                return e.patch(t, n), e.applyData(t, n);
            },
            break: function(e, t) {
                var n = {
                    type: "element",
                    tagName: "br",
                    properties: {},
                    children: []
                };
                return e.patch(t, n), [ e.applyData(t, n), {
                    type: "text",
                    value: "\n"
                } ];
            },
            code: function(e, t) {
                var n = t.value ? t.value + "\n" : "", r = t.lang ? t.lang.match(/^[^ \t]+(?=[ \t]|$)/) : null, u = {};
                r && (u.className = [ "language-" + r ]);
                var a = {
                    type: "element",
                    tagName: "code",
                    properties: u,
                    children: [ {
                        type: "text",
                        value: n
                    } ]
                };
                return t.meta && (a.data = {
                    meta: t.meta
                }), e.patch(t, a), a = {
                    type: "element",
                    tagName: "pre",
                    properties: {},
                    children: [ a = e.applyData(t, a) ]
                }, e.patch(t, a), a;
            },
            delete: function(e, t) {
                var n = {
                    type: "element",
                    tagName: "del",
                    properties: {},
                    children: e.all(t)
                };
                return e.patch(t, n), e.applyData(t, n);
            },
            emphasis: function(e, t) {
                var n = {
                    type: "element",
                    tagName: "em",
                    properties: {},
                    children: e.all(t)
                };
                return e.patch(t, n), e.applyData(t, n);
            },
            footnoteReference: Cn,
            footnote: function(e, t) {
                for (var n = e.footnoteById, r = 1; r in n; ) r++;
                var u = String(r);
                return n[u] = {
                    type: "footnoteDefinition",
                    identifier: u,
                    children: [ {
                        type: "paragraph",
                        children: t.children
                    } ],
                    position: t.position
                }, Cn(e, {
                    type: "footnoteReference",
                    identifier: u,
                    position: t.position
                });
            },
            heading: function(e, t) {
                var n = {
                    type: "element",
                    tagName: "h" + t.depth,
                    properties: {},
                    children: e.all(t)
                };
                return e.patch(t, n), e.applyData(t, n);
            },
            html: function(e, t) {
                if (e.dangerous) {
                    var n = {
                        type: "raw",
                        value: t.value
                    };
                    return e.patch(t, n), e.applyData(t, n);
                }
                return null;
            },
            imageReference: function(e, t) {
                var n = e.definition(t.identifier);
                if (!n) return Fn(e, t);
                var r = {
                    src: dn(n.url || ""),
                    alt: t.alt
                };
                null !== n.title && void 0 !== n.title && (r.title = n.title);
                var u = {
                    type: "element",
                    tagName: "img",
                    properties: r,
                    children: []
                };
                return e.patch(t, u), e.applyData(t, u);
            },
            image: function(e, t) {
                var n = {
                    src: dn(t.url)
                };
                null !== t.alt && void 0 !== t.alt && (n.alt = t.alt), null !== t.title && void 0 !== t.title && (n.title = t.title);
                var r = {
                    type: "element",
                    tagName: "img",
                    properties: n,
                    children: []
                };
                return e.patch(t, r), e.applyData(t, r);
            },
            inlineCode: function(e, t) {
                var n = {
                    type: "text",
                    value: t.value.replace(/\r?\n|\r/g, " ")
                };
                e.patch(t, n);
                var r = {
                    type: "element",
                    tagName: "code",
                    properties: {},
                    children: [ n ]
                };
                return e.patch(t, r), e.applyData(t, r);
            },
            linkReference: function(e, t) {
                var n = e.definition(t.identifier);
                if (!n) return Fn(e, t);
                var r = {
                    href: dn(n.url || "")
                };
                null !== n.title && void 0 !== n.title && (r.title = n.title);
                var u = {
                    type: "element",
                    tagName: "a",
                    properties: r,
                    children: e.all(t)
                };
                return e.patch(t, u), e.applyData(t, u);
            },
            link: function(e, t) {
                var n = {
                    href: dn(t.url)
                };
                null !== t.title && void 0 !== t.title && (n.title = t.title);
                var r = {
                    type: "element",
                    tagName: "a",
                    properties: n,
                    children: e.all(t)
                };
                return e.patch(t, r), e.applyData(t, r);
            },
            listItem: function(e, t, n) {
                var r = e.all(t), u = n ? function(e) {
                    var t = !1;
                    if ("list" === e.type) {
                        t = e.spread || !1;
                        for (var n = e.children, r = -1; !t && ++r < n.length; ) t = An(n[r]);
                    }
                    return t;
                }(n) : An(t), a = {}, i = [];
                if ("boolean" == typeof t.checked) {
                    var o, l = r[0];
                    l && "element" === l.type && "p" === l.tagName ? o = l : (o = {
                        type: "element",
                        tagName: "p",
                        properties: {},
                        children: []
                    }, r.unshift(o)), o.children.length > 0 && o.children.unshift({
                        type: "text",
                        value: " "
                    }), o.children.unshift({
                        type: "element",
                        tagName: "input",
                        properties: {
                            type: "checkbox",
                            checked: t.checked,
                            disabled: !0
                        },
                        children: []
                    }), a.className = [ "task-list-item" ];
                }
                for (var s = -1; ++s < r.length; ) {
                    var c = r[s];
                    (u || 0 !== s || "element" !== c.type || "p" !== c.tagName) && i.push({
                        type: "text",
                        value: "\n"
                    }), "element" !== c.type || "p" !== c.tagName || u ? i.push(c) : i.push.apply(i, T(c.children));
                }
                var d = r[r.length - 1];
                d && (u || "element" !== d.type || "p" !== d.tagName) && i.push({
                    type: "text",
                    value: "\n"
                });
                var p = {
                    type: "element",
                    tagName: "li",
                    properties: a,
                    children: i
                };
                return e.patch(t, p), e.applyData(t, p);
            },
            list: function(e, t) {
                var n = {}, r = e.all(t), u = -1;
                for ("number" == typeof t.start && 1 !== t.start && (n.start = t.start); ++u < r.length; ) {
                    var a = r[u];
                    if ("element" === a.type && "li" === a.tagName && a.properties && Array.isArray(a.properties.className) && a.properties.className.includes("task-list-item")) {
                        n.className = [ "contains-task-list" ];
                        break;
                    }
                }
                var i = {
                    type: "element",
                    tagName: t.ordered ? "ol" : "ul",
                    properties: n,
                    children: e.wrap(r, !0)
                };
                return e.patch(t, i), e.applyData(t, i);
            },
            paragraph: function(e, t) {
                var n = {
                    type: "element",
                    tagName: "p",
                    properties: {},
                    children: e.all(t)
                };
                return e.patch(t, n), e.applyData(t, n);
            },
            root: function(e, t) {
                var n = {
                    type: "root",
                    children: e.wrap(e.all(t))
                };
                return e.patch(t, n), e.applyData(t, n);
            },
            strong: function(e, t) {
                var n = {
                    type: "element",
                    tagName: "strong",
                    properties: {},
                    children: e.all(t)
                };
                return e.patch(t, n), e.applyData(t, n);
            },
            table: function(e, t) {
                var n = e.all(t), r = n.shift(), u = [];
                if (r) {
                    var a = {
                        type: "element",
                        tagName: "thead",
                        properties: {},
                        children: e.wrap([ r ], !0)
                    };
                    e.patch(t.children[0], a), u.push(a);
                }
                if (n.length > 0) {
                    var i = {
                        type: "element",
                        tagName: "tbody",
                        properties: {},
                        children: e.wrap(n, !0)
                    }, o = bn(t.children[1]), l = vn(t.children[t.children.length - 1]);
                    o.line && l.line && (i.position = {
                        start: o,
                        end: l
                    }), u.push(i);
                }
                var s = {
                    type: "element",
                    tagName: "table",
                    properties: {},
                    children: e.wrap(u, !0)
                };
                return e.patch(t, s), e.applyData(t, s);
            },
            tableCell: function(e, t) {
                var n = {
                    type: "element",
                    tagName: "td",
                    properties: {},
                    children: e.all(t)
                };
                return e.patch(t, n), e.applyData(t, n);
            },
            tableRow: function(e, t, n) {
                for (var r = n ? n.children : void 0, u = 0 === (r ? r.indexOf(t) : 1) ? "th" : "td", a = n && "table" === n.type ? n.align : void 0, i = a ? a.length : t.children.length, o = -1, l = []; ++o < i; ) {
                    var s = t.children[o], c = {}, d = a ? a[o] : void 0;
                    d && (c.align = d);
                    var p = {
                        type: "element",
                        tagName: u,
                        properties: c,
                        children: []
                    };
                    s && (p.children = e.all(s), e.patch(s, p), p = e.applyData(t, p)), l.push(p);
                }
                var f = {
                    type: "element",
                    tagName: "tr",
                    properties: {},
                    children: e.wrap(l, !0)
                };
                return e.patch(t, f), e.applyData(t, f);
            },
            text: function(e, t) {
                var n = {
                    type: "text",
                    value: xn(String(t.value))
                };
                return e.patch(t, n), e.applyData(t, n);
            },
            thematicBreak: function(e, t) {
                var n = {
                    type: "element",
                    tagName: "hr",
                    properties: {},
                    children: []
                };
                return e.patch(t, n), e.applyData(t, n);
            },
            toml: Bn,
            yaml: Bn,
            definition: Bn,
            footnoteDefinition: Bn
        };
        function Bn() {
            return null;
        }
        var Sn = {}.hasOwnProperty;
        function On(e, t) {
            e.position && (t.position = function(e) {
                return {
                    start: bn(e),
                    end: vn(e)
                };
            }(e));
        }
        function Tn(e, t) {
            var n = t;
            if (e && e.data) {
                var r = e.data.hName, u = e.data.hChildren, a = e.data.hProperties;
                "string" == typeof r && ("element" === n.type ? n.tagName = r : n = {
                    type: "element",
                    tagName: r,
                    properties: {},
                    children: []
                }), "element" === n.type && a && (n.properties = N(N({}, n.properties), a)), "children" in n && n.children && null != u && (n.children = u);
            }
            return n;
        }
        function Mn(e, t, n) {
            var r = t && t.type;
            if (!r) throw new Error("Expected node, got `" + t + "`");
            return Sn.call(e.handlers, r) ? e.handlers[r](e, t, n) : e.passThrough && e.passThrough.includes(r) ? "children" in t ? N(N({}, t), {}, {
                children: Ln(e, t)
            }) : t : e.unknownHandler ? e.unknownHandler(e, t, n) : function(e, t) {
                var n = t.data || {}, r = !("value" in t) || Sn.call(n, "hProperties") || Sn.call(n, "hChildren") ? {
                    type: "element",
                    tagName: "div",
                    properties: {},
                    children: Ln(e, t)
                } : {
                    type: "text",
                    value: t.value
                };
                return e.patch(t, r), e.applyData(t, r);
            }(e, t);
        }
        function Ln(e, t) {
            var n = [];
            if ("children" in t) for (var r = t.children, u = -1; ++u < r.length; ) {
                var a = Mn(e, r[u], t);
                if (a) {
                    if (u && "break" === r[u - 1].type && (Array.isArray(a) || "text" !== a.type || (a.value = a.value.replace(/^\s+/, "")), 
                    !Array.isArray(a) && "element" === a.type)) {
                        var i = a.children[0];
                        i && "text" === i.type && (i.value = i.value.replace(/^\s+/, ""));
                    }
                    Array.isArray(a) ? n.push.apply(n, T(a)) : n.push(a);
                }
            }
            return n;
        }
        function In(e, t) {
            var n = [], r = -1;
            for (t && n.push({
                type: "text",
                value: "\n"
            }); ++r < e.length; ) r && n.push({
                type: "text",
                value: "\n"
            }), n.push(e[r]);
            return t && e.length > 0 && n.push({
                type: "text",
                value: "\n"
            }), n;
        }
        function Rn(e, t) {
            var n = function(e, t) {
                var n = t || {}, r = n.allowDangerousHtml || !1, u = {};
                return i.dangerous = r, i.clobberPrefix = void 0 === n.clobberPrefix || null === n.clobberPrefix ? "user-content-" : n.clobberPrefix, 
                i.footnoteLabel = n.footnoteLabel || "Footnotes", i.footnoteLabelTagName = n.footnoteLabelTagName || "h2", 
                i.footnoteLabelProperties = n.footnoteLabelProperties || {
                    className: [ "sr-only" ]
                }, i.footnoteBackLabel = n.footnoteBackLabel || "Back to content", i.unknownHandler = n.unknownHandler, 
                i.passThrough = n.passThrough, i.handlers = N(N({}, kn), n.handlers), i.definition = function(e) {
                    var t = Object.create(null);
                    if (!e || !e.type) throw new Error("mdast-util-definitions expected node");
                    return mn(e, "definition", (function(e) {
                        var n = _n(e.identifier);
                        n && !yn.call(t, n) && (t[n] = e);
                    })), function(e) {
                        var n = _n(e);
                        return n && yn.call(t, n) ? t[n] : null;
                    };
                }(e), i.footnoteById = u, i.footnoteOrder = [], i.footnoteCounts = {}, i.patch = On, 
                i.applyData = Tn, i.one = function(e, t) {
                    return Mn(i, e, t);
                }, i.all = function(e) {
                    return Ln(i, e);
                }, i.wrap = In, i.augment = a, mn(e, "footnoteDefinition", (function(e) {
                    var t = String(e.identifier).toUpperCase();
                    Sn.call(u, t) || (u[t] = e);
                })), i;
                function a(e, t) {
                    if (e && "data" in e && e.data) {
                        var n = e.data;
                        n.hName && ("element" !== t.type && (t = {
                            type: "element",
                            tagName: "",
                            properties: {},
                            children: []
                        }), t.tagName = n.hName), "element" === t.type && n.hProperties && (t.properties = N(N({}, t.properties), n.hProperties)), 
                        "children" in t && t.children && n.hChildren && (t.children = n.hChildren);
                    }
                    if (e) {
                        var r = "type" in e ? e : {
                            position: e
                        };
                        (function(e) {
                            return !(e && e.position && e.position.start && e.position.start.line && e.position.start.column && e.position.end && e.position.end.line && e.position.end.column);
                        })(r) || (t.position = {
                            start: bn(r),
                            end: vn(r)
                        });
                    }
                    return t;
                }
                function i(e, t, n, r) {
                    return Array.isArray(n) && (r = n, n = {}), a(e, {
                        type: "element",
                        tagName: t,
                        properties: n || {},
                        children: r || []
                    });
                }
            }(e, t), r = n.one(e, null), u = function(e) {
                for (var t = [], n = -1; ++n < e.footnoteOrder.length; ) {
                    var r = e.footnoteById[e.footnoteOrder[n]];
                    if (r) {
                        for (var u = e.all(r), a = String(r.identifier).toUpperCase(), i = dn(a.toLowerCase()), o = 0, l = []; ++o <= e.footnoteCounts[a]; ) {
                            var s = {
                                type: "element",
                                tagName: "a",
                                properties: {
                                    href: "#" + e.clobberPrefix + "fnref-" + i + (o > 1 ? "-" + o : ""),
                                    dataFootnoteBackref: !0,
                                    className: [ "data-footnote-backref" ],
                                    ariaLabel: e.footnoteBackLabel
                                },
                                children: [ {
                                    type: "text",
                                    value: "↩"
                                } ]
                            };
                            o > 1 && s.children.push({
                                type: "element",
                                tagName: "sup",
                                children: [ {
                                    type: "text",
                                    value: String(o)
                                } ]
                            }), l.length > 0 && l.push({
                                type: "text",
                                value: " "
                            }), l.push(s);
                        }
                        var c = u[u.length - 1];
                        if (c && "element" === c.type && "p" === c.tagName) {
                            var d, p = c.children[c.children.length - 1];
                            p && "text" === p.type ? p.value += " " : c.children.push({
                                type: "text",
                                value: " "
                            }), (d = c.children).push.apply(d, l);
                        } else u.push.apply(u, l);
                        var f = {
                            type: "element",
                            tagName: "li",
                            properties: {
                                id: e.clobberPrefix + "fn-" + i
                            },
                            children: e.wrap(u, !0)
                        };
                        e.patch(r, f), t.push(f);
                    }
                }
                if (0 !== t.length) return {
                    type: "element",
                    tagName: "section",
                    properties: {
                        dataFootnotes: !0,
                        className: [ "footnotes" ]
                    },
                    children: [ {
                        type: "element",
                        tagName: e.footnoteLabelTagName,
                        properties: N(N({}, JSON.parse(JSON.stringify(e.footnoteLabelProperties))), {}, {
                            id: "footnote-label"
                        }),
                        children: [ {
                            type: "text",
                            value: e.footnoteLabel
                        } ]
                    }, {
                        type: "text",
                        value: "\n"
                    }, {
                        type: "element",
                        tagName: "ol",
                        properties: {},
                        children: e.wrap(t, !0)
                    }, {
                        type: "text",
                        value: "\n"
                    } ]
                };
            }(n);
            return u && r.children.push({
                type: "text",
                value: "\n"
            }, u), Array.isArray(r) ? {
                type: "root",
                children: r
            } : r;
        }
        var Pn = function(e, t) {
            return e && "run" in e ? function(e, t) {
                return function(n, r, u) {
                    e.run(Rn(n, t), r, (function(e) {
                        u(e);
                    }));
                };
            }(e, t) : function(e) {
                return function(t) {
                    return Rn(t, e);
                };
            }(e || t);
        }, jn = n(2007), zn = E((function e(t, n, r) {
            b(this, e), this.property = t, this.normal = n, r && (this.space = r);
        }));
        function Un(e, t) {
            for (var n = {}, r = {}, u = -1; ++u < e.length; ) Object.assign(n, e[u].property), 
            Object.assign(r, e[u].normal);
            return new zn(n, r, t);
        }
        function qn(e) {
            return e.toLowerCase();
        }
        zn.prototype.property = {}, zn.prototype.normal = {}, zn.prototype.space = null;
        var Hn = E((function e(t, n) {
            b(this, e), this.property = t, this.attribute = n;
        }));
        Hn.prototype.space = null, Hn.prototype.boolean = !1, Hn.prototype.booleanish = !1, 
        Hn.prototype.overloadedBoolean = !1, Hn.prototype.number = !1, Hn.prototype.commaSeparated = !1, 
        Hn.prototype.spaceSeparated = !1, Hn.prototype.commaOrSpaceSeparated = !1, Hn.prototype.mustUseProperty = !1, 
        Hn.prototype.defined = !1;
        var $n = 0, Kn = Yn(), Vn = Yn(), Gn = Yn(), Wn = Yn(), Qn = Yn(), Zn = Yn(), Xn = Yn();
        function Yn() {
            return Math.pow(2, ++$n);
        }
        var Jn = Object.keys(t), er = function(e) {
            _(r, e);
            var n = w(r);
            function r(e, u, a, i) {
                var o;
                b(this, r);
                var l = -1;
                if (tr(A(o = n.call(this, e, u)), "space", i), "number" == typeof a) for (;++l < Jn.length; ) {
                    var s = Jn[l];
                    tr(A(o), Jn[l], (a & t[s]) === t[s]);
                }
                return o;
            }
            return E(r);
        }(Hn);
        function tr(e, t, n) {
            n && (e[t] = n);
        }
        er.prototype.defined = !0;
        var nr = {}.hasOwnProperty;
        function rr(e) {
            var t, n = {}, r = {};
            for (t in e.properties) if (nr.call(e.properties, t)) {
                var u = e.properties[t], a = new er(t, e.transform(e.attributes || {}, t), u, e.space);
                e.mustUseProperty && e.mustUseProperty.includes(t) && (a.mustUseProperty = !0), 
                n[t] = a, r[qn(t)] = t, r[qn(a.attribute)] = t;
            }
            return new zn(n, r, e.space);
        }
        var ur = rr({
            space: "xlink",
            transform: function(e, t) {
                return "xlink:" + t.slice(5).toLowerCase();
            },
            properties: {
                xLinkActuate: null,
                xLinkArcRole: null,
                xLinkHref: null,
                xLinkRole: null,
                xLinkShow: null,
                xLinkTitle: null,
                xLinkType: null
            }
        }), ar = rr({
            space: "xml",
            transform: function(e, t) {
                return "xml:" + t.slice(3).toLowerCase();
            },
            properties: {
                xmlLang: null,
                xmlBase: null,
                xmlSpace: null
            }
        });
        function ir(e, t) {
            return t in e ? e[t] : t;
        }
        function or(e, t) {
            return ir(e, t.toLowerCase());
        }
        var lr = rr({
            space: "xmlns",
            attributes: {
                xmlnsxlink: "xmlns:xlink"
            },
            transform: or,
            properties: {
                xmlns: null,
                xmlnsXLink: null
            }
        }), sr = rr({
            transform: function(e, t) {
                return "role" === t ? t : "aria-" + t.slice(4).toLowerCase();
            },
            properties: {
                ariaActiveDescendant: null,
                ariaAtomic: Vn,
                ariaAutoComplete: null,
                ariaBusy: Vn,
                ariaChecked: Vn,
                ariaColCount: Wn,
                ariaColIndex: Wn,
                ariaColSpan: Wn,
                ariaControls: Qn,
                ariaCurrent: null,
                ariaDescribedBy: Qn,
                ariaDetails: null,
                ariaDisabled: Vn,
                ariaDropEffect: Qn,
                ariaErrorMessage: null,
                ariaExpanded: Vn,
                ariaFlowTo: Qn,
                ariaGrabbed: Vn,
                ariaHasPopup: null,
                ariaHidden: Vn,
                ariaInvalid: null,
                ariaKeyShortcuts: null,
                ariaLabel: null,
                ariaLabelledBy: Qn,
                ariaLevel: Wn,
                ariaLive: null,
                ariaModal: Vn,
                ariaMultiLine: Vn,
                ariaMultiSelectable: Vn,
                ariaOrientation: null,
                ariaOwns: Qn,
                ariaPlaceholder: null,
                ariaPosInSet: Wn,
                ariaPressed: Vn,
                ariaReadOnly: Vn,
                ariaRelevant: null,
                ariaRequired: Vn,
                ariaRoleDescription: Qn,
                ariaRowCount: Wn,
                ariaRowIndex: Wn,
                ariaRowSpan: Wn,
                ariaSelected: Vn,
                ariaSetSize: Wn,
                ariaSort: null,
                ariaValueMax: Wn,
                ariaValueMin: Wn,
                ariaValueNow: Wn,
                ariaValueText: null,
                role: null
            }
        }), cr = rr({
            space: "html",
            attributes: {
                acceptcharset: "accept-charset",
                classname: "class",
                htmlfor: "for",
                httpequiv: "http-equiv"
            },
            transform: or,
            mustUseProperty: [ "checked", "multiple", "muted", "selected" ],
            properties: {
                abbr: null,
                accept: Zn,
                acceptCharset: Qn,
                accessKey: Qn,
                action: null,
                allow: null,
                allowFullScreen: Kn,
                allowPaymentRequest: Kn,
                allowUserMedia: Kn,
                alt: null,
                as: null,
                async: Kn,
                autoCapitalize: null,
                autoComplete: Qn,
                autoFocus: Kn,
                autoPlay: Kn,
                capture: Kn,
                charSet: null,
                checked: Kn,
                cite: null,
                className: Qn,
                cols: Wn,
                colSpan: null,
                content: null,
                contentEditable: Vn,
                controls: Kn,
                controlsList: Qn,
                coords: Wn | Zn,
                crossOrigin: null,
                data: null,
                dateTime: null,
                decoding: null,
                default: Kn,
                defer: Kn,
                dir: null,
                dirName: null,
                disabled: Kn,
                download: Gn,
                draggable: Vn,
                encType: null,
                enterKeyHint: null,
                form: null,
                formAction: null,
                formEncType: null,
                formMethod: null,
                formNoValidate: Kn,
                formTarget: null,
                headers: Qn,
                height: Wn,
                hidden: Kn,
                high: Wn,
                href: null,
                hrefLang: null,
                htmlFor: Qn,
                httpEquiv: Qn,
                id: null,
                imageSizes: null,
                imageSrcSet: null,
                inputMode: null,
                integrity: null,
                is: null,
                isMap: Kn,
                itemId: null,
                itemProp: Qn,
                itemRef: Qn,
                itemScope: Kn,
                itemType: Qn,
                kind: null,
                label: null,
                lang: null,
                language: null,
                list: null,
                loading: null,
                loop: Kn,
                low: Wn,
                manifest: null,
                max: null,
                maxLength: Wn,
                media: null,
                method: null,
                min: null,
                minLength: Wn,
                multiple: Kn,
                muted: Kn,
                name: null,
                nonce: null,
                noModule: Kn,
                noValidate: Kn,
                onAbort: null,
                onAfterPrint: null,
                onAuxClick: null,
                onBeforeMatch: null,
                onBeforePrint: null,
                onBeforeUnload: null,
                onBlur: null,
                onCancel: null,
                onCanPlay: null,
                onCanPlayThrough: null,
                onChange: null,
                onClick: null,
                onClose: null,
                onContextLost: null,
                onContextMenu: null,
                onContextRestored: null,
                onCopy: null,
                onCueChange: null,
                onCut: null,
                onDblClick: null,
                onDrag: null,
                onDragEnd: null,
                onDragEnter: null,
                onDragExit: null,
                onDragLeave: null,
                onDragOver: null,
                onDragStart: null,
                onDrop: null,
                onDurationChange: null,
                onEmptied: null,
                onEnded: null,
                onError: null,
                onFocus: null,
                onFormData: null,
                onHashChange: null,
                onInput: null,
                onInvalid: null,
                onKeyDown: null,
                onKeyPress: null,
                onKeyUp: null,
                onLanguageChange: null,
                onLoad: null,
                onLoadedData: null,
                onLoadedMetadata: null,
                onLoadEnd: null,
                onLoadStart: null,
                onMessage: null,
                onMessageError: null,
                onMouseDown: null,
                onMouseEnter: null,
                onMouseLeave: null,
                onMouseMove: null,
                onMouseOut: null,
                onMouseOver: null,
                onMouseUp: null,
                onOffline: null,
                onOnline: null,
                onPageHide: null,
                onPageShow: null,
                onPaste: null,
                onPause: null,
                onPlay: null,
                onPlaying: null,
                onPopState: null,
                onProgress: null,
                onRateChange: null,
                onRejectionHandled: null,
                onReset: null,
                onResize: null,
                onScroll: null,
                onScrollEnd: null,
                onSecurityPolicyViolation: null,
                onSeeked: null,
                onSeeking: null,
                onSelect: null,
                onSlotChange: null,
                onStalled: null,
                onStorage: null,
                onSubmit: null,
                onSuspend: null,
                onTimeUpdate: null,
                onToggle: null,
                onUnhandledRejection: null,
                onUnload: null,
                onVolumeChange: null,
                onWaiting: null,
                onWheel: null,
                open: Kn,
                optimum: Wn,
                pattern: null,
                ping: Qn,
                placeholder: null,
                playsInline: Kn,
                poster: null,
                preload: null,
                readOnly: Kn,
                referrerPolicy: null,
                rel: Qn,
                required: Kn,
                reversed: Kn,
                rows: Wn,
                rowSpan: Wn,
                sandbox: Qn,
                scope: null,
                scoped: Kn,
                seamless: Kn,
                selected: Kn,
                shape: null,
                size: Wn,
                sizes: null,
                slot: null,
                span: Wn,
                spellCheck: Vn,
                src: null,
                srcDoc: null,
                srcLang: null,
                srcSet: null,
                start: Wn,
                step: null,
                style: null,
                tabIndex: Wn,
                target: null,
                title: null,
                translate: null,
                type: null,
                typeMustMatch: Kn,
                useMap: null,
                value: Vn,
                width: Wn,
                wrap: null,
                align: null,
                aLink: null,
                archive: Qn,
                axis: null,
                background: null,
                bgColor: null,
                border: Wn,
                borderColor: null,
                bottomMargin: Wn,
                cellPadding: null,
                cellSpacing: null,
                char: null,
                charOff: null,
                classId: null,
                clear: null,
                code: null,
                codeBase: null,
                codeType: null,
                color: null,
                compact: Kn,
                declare: Kn,
                event: null,
                face: null,
                frame: null,
                frameBorder: null,
                hSpace: Wn,
                leftMargin: Wn,
                link: null,
                longDesc: null,
                lowSrc: null,
                marginHeight: Wn,
                marginWidth: Wn,
                noResize: Kn,
                noHref: Kn,
                noShade: Kn,
                noWrap: Kn,
                object: null,
                profile: null,
                prompt: null,
                rev: null,
                rightMargin: Wn,
                rules: null,
                scheme: null,
                scrolling: Vn,
                standby: null,
                summary: null,
                text: null,
                topMargin: Wn,
                valueType: null,
                version: null,
                vAlign: null,
                vLink: null,
                vSpace: Wn,
                allowTransparency: null,
                autoCorrect: null,
                autoSave: null,
                disablePictureInPicture: Kn,
                disableRemotePlayback: Kn,
                prefix: null,
                property: null,
                results: Wn,
                security: null,
                unselectable: null
            }
        }), dr = rr({
            space: "svg",
            attributes: {
                accentHeight: "accent-height",
                alignmentBaseline: "alignment-baseline",
                arabicForm: "arabic-form",
                baselineShift: "baseline-shift",
                capHeight: "cap-height",
                className: "class",
                clipPath: "clip-path",
                clipRule: "clip-rule",
                colorInterpolation: "color-interpolation",
                colorInterpolationFilters: "color-interpolation-filters",
                colorProfile: "color-profile",
                colorRendering: "color-rendering",
                crossOrigin: "crossorigin",
                dataType: "datatype",
                dominantBaseline: "dominant-baseline",
                enableBackground: "enable-background",
                fillOpacity: "fill-opacity",
                fillRule: "fill-rule",
                floodColor: "flood-color",
                floodOpacity: "flood-opacity",
                fontFamily: "font-family",
                fontSize: "font-size",
                fontSizeAdjust: "font-size-adjust",
                fontStretch: "font-stretch",
                fontStyle: "font-style",
                fontVariant: "font-variant",
                fontWeight: "font-weight",
                glyphName: "glyph-name",
                glyphOrientationHorizontal: "glyph-orientation-horizontal",
                glyphOrientationVertical: "glyph-orientation-vertical",
                hrefLang: "hreflang",
                horizAdvX: "horiz-adv-x",
                horizOriginX: "horiz-origin-x",
                horizOriginY: "horiz-origin-y",
                imageRendering: "image-rendering",
                letterSpacing: "letter-spacing",
                lightingColor: "lighting-color",
                markerEnd: "marker-end",
                markerMid: "marker-mid",
                markerStart: "marker-start",
                navDown: "nav-down",
                navDownLeft: "nav-down-left",
                navDownRight: "nav-down-right",
                navLeft: "nav-left",
                navNext: "nav-next",
                navPrev: "nav-prev",
                navRight: "nav-right",
                navUp: "nav-up",
                navUpLeft: "nav-up-left",
                navUpRight: "nav-up-right",
                onAbort: "onabort",
                onActivate: "onactivate",
                onAfterPrint: "onafterprint",
                onBeforePrint: "onbeforeprint",
                onBegin: "onbegin",
                onCancel: "oncancel",
                onCanPlay: "oncanplay",
                onCanPlayThrough: "oncanplaythrough",
                onChange: "onchange",
                onClick: "onclick",
                onClose: "onclose",
                onCopy: "oncopy",
                onCueChange: "oncuechange",
                onCut: "oncut",
                onDblClick: "ondblclick",
                onDrag: "ondrag",
                onDragEnd: "ondragend",
                onDragEnter: "ondragenter",
                onDragExit: "ondragexit",
                onDragLeave: "ondragleave",
                onDragOver: "ondragover",
                onDragStart: "ondragstart",
                onDrop: "ondrop",
                onDurationChange: "ondurationchange",
                onEmptied: "onemptied",
                onEnd: "onend",
                onEnded: "onended",
                onError: "onerror",
                onFocus: "onfocus",
                onFocusIn: "onfocusin",
                onFocusOut: "onfocusout",
                onHashChange: "onhashchange",
                onInput: "oninput",
                onInvalid: "oninvalid",
                onKeyDown: "onkeydown",
                onKeyPress: "onkeypress",
                onKeyUp: "onkeyup",
                onLoad: "onload",
                onLoadedData: "onloadeddata",
                onLoadedMetadata: "onloadedmetadata",
                onLoadStart: "onloadstart",
                onMessage: "onmessage",
                onMouseDown: "onmousedown",
                onMouseEnter: "onmouseenter",
                onMouseLeave: "onmouseleave",
                onMouseMove: "onmousemove",
                onMouseOut: "onmouseout",
                onMouseOver: "onmouseover",
                onMouseUp: "onmouseup",
                onMouseWheel: "onmousewheel",
                onOffline: "onoffline",
                onOnline: "ononline",
                onPageHide: "onpagehide",
                onPageShow: "onpageshow",
                onPaste: "onpaste",
                onPause: "onpause",
                onPlay: "onplay",
                onPlaying: "onplaying",
                onPopState: "onpopstate",
                onProgress: "onprogress",
                onRateChange: "onratechange",
                onRepeat: "onrepeat",
                onReset: "onreset",
                onResize: "onresize",
                onScroll: "onscroll",
                onSeeked: "onseeked",
                onSeeking: "onseeking",
                onSelect: "onselect",
                onShow: "onshow",
                onStalled: "onstalled",
                onStorage: "onstorage",
                onSubmit: "onsubmit",
                onSuspend: "onsuspend",
                onTimeUpdate: "ontimeupdate",
                onToggle: "ontoggle",
                onUnload: "onunload",
                onVolumeChange: "onvolumechange",
                onWaiting: "onwaiting",
                onZoom: "onzoom",
                overlinePosition: "overline-position",
                overlineThickness: "overline-thickness",
                paintOrder: "paint-order",
                panose1: "panose-1",
                pointerEvents: "pointer-events",
                referrerPolicy: "referrerpolicy",
                renderingIntent: "rendering-intent",
                shapeRendering: "shape-rendering",
                stopColor: "stop-color",
                stopOpacity: "stop-opacity",
                strikethroughPosition: "strikethrough-position",
                strikethroughThickness: "strikethrough-thickness",
                strokeDashArray: "stroke-dasharray",
                strokeDashOffset: "stroke-dashoffset",
                strokeLineCap: "stroke-linecap",
                strokeLineJoin: "stroke-linejoin",
                strokeMiterLimit: "stroke-miterlimit",
                strokeOpacity: "stroke-opacity",
                strokeWidth: "stroke-width",
                tabIndex: "tabindex",
                textAnchor: "text-anchor",
                textDecoration: "text-decoration",
                textRendering: "text-rendering",
                typeOf: "typeof",
                underlinePosition: "underline-position",
                underlineThickness: "underline-thickness",
                unicodeBidi: "unicode-bidi",
                unicodeRange: "unicode-range",
                unitsPerEm: "units-per-em",
                vAlphabetic: "v-alphabetic",
                vHanging: "v-hanging",
                vIdeographic: "v-ideographic",
                vMathematical: "v-mathematical",
                vectorEffect: "vector-effect",
                vertAdvY: "vert-adv-y",
                vertOriginX: "vert-origin-x",
                vertOriginY: "vert-origin-y",
                wordSpacing: "word-spacing",
                writingMode: "writing-mode",
                xHeight: "x-height",
                playbackOrder: "playbackorder",
                timelineBegin: "timelinebegin"
            },
            transform: ir,
            properties: {
                about: Xn,
                accentHeight: Wn,
                accumulate: null,
                additive: null,
                alignmentBaseline: null,
                alphabetic: Wn,
                amplitude: Wn,
                arabicForm: null,
                ascent: Wn,
                attributeName: null,
                attributeType: null,
                azimuth: Wn,
                bandwidth: null,
                baselineShift: null,
                baseFrequency: null,
                baseProfile: null,
                bbox: null,
                begin: null,
                bias: Wn,
                by: null,
                calcMode: null,
                capHeight: Wn,
                className: Qn,
                clip: null,
                clipPath: null,
                clipPathUnits: null,
                clipRule: null,
                color: null,
                colorInterpolation: null,
                colorInterpolationFilters: null,
                colorProfile: null,
                colorRendering: null,
                content: null,
                contentScriptType: null,
                contentStyleType: null,
                crossOrigin: null,
                cursor: null,
                cx: null,
                cy: null,
                d: null,
                dataType: null,
                defaultAction: null,
                descent: Wn,
                diffuseConstant: Wn,
                direction: null,
                display: null,
                dur: null,
                divisor: Wn,
                dominantBaseline: null,
                download: Kn,
                dx: null,
                dy: null,
                edgeMode: null,
                editable: null,
                elevation: Wn,
                enableBackground: null,
                end: null,
                event: null,
                exponent: Wn,
                externalResourcesRequired: null,
                fill: null,
                fillOpacity: Wn,
                fillRule: null,
                filter: null,
                filterRes: null,
                filterUnits: null,
                floodColor: null,
                floodOpacity: null,
                focusable: null,
                focusHighlight: null,
                fontFamily: null,
                fontSize: null,
                fontSizeAdjust: null,
                fontStretch: null,
                fontStyle: null,
                fontVariant: null,
                fontWeight: null,
                format: null,
                fr: null,
                from: null,
                fx: null,
                fy: null,
                g1: Zn,
                g2: Zn,
                glyphName: Zn,
                glyphOrientationHorizontal: null,
                glyphOrientationVertical: null,
                glyphRef: null,
                gradientTransform: null,
                gradientUnits: null,
                handler: null,
                hanging: Wn,
                hatchContentUnits: null,
                hatchUnits: null,
                height: null,
                href: null,
                hrefLang: null,
                horizAdvX: Wn,
                horizOriginX: Wn,
                horizOriginY: Wn,
                id: null,
                ideographic: Wn,
                imageRendering: null,
                initialVisibility: null,
                in: null,
                in2: null,
                intercept: Wn,
                k: Wn,
                k1: Wn,
                k2: Wn,
                k3: Wn,
                k4: Wn,
                kernelMatrix: Xn,
                kernelUnitLength: null,
                keyPoints: null,
                keySplines: null,
                keyTimes: null,
                kerning: null,
                lang: null,
                lengthAdjust: null,
                letterSpacing: null,
                lightingColor: null,
                limitingConeAngle: Wn,
                local: null,
                markerEnd: null,
                markerMid: null,
                markerStart: null,
                markerHeight: null,
                markerUnits: null,
                markerWidth: null,
                mask: null,
                maskContentUnits: null,
                maskUnits: null,
                mathematical: null,
                max: null,
                media: null,
                mediaCharacterEncoding: null,
                mediaContentEncodings: null,
                mediaSize: Wn,
                mediaTime: null,
                method: null,
                min: null,
                mode: null,
                name: null,
                navDown: null,
                navDownLeft: null,
                navDownRight: null,
                navLeft: null,
                navNext: null,
                navPrev: null,
                navRight: null,
                navUp: null,
                navUpLeft: null,
                navUpRight: null,
                numOctaves: null,
                observer: null,
                offset: null,
                onAbort: null,
                onActivate: null,
                onAfterPrint: null,
                onBeforePrint: null,
                onBegin: null,
                onCancel: null,
                onCanPlay: null,
                onCanPlayThrough: null,
                onChange: null,
                onClick: null,
                onClose: null,
                onCopy: null,
                onCueChange: null,
                onCut: null,
                onDblClick: null,
                onDrag: null,
                onDragEnd: null,
                onDragEnter: null,
                onDragExit: null,
                onDragLeave: null,
                onDragOver: null,
                onDragStart: null,
                onDrop: null,
                onDurationChange: null,
                onEmptied: null,
                onEnd: null,
                onEnded: null,
                onError: null,
                onFocus: null,
                onFocusIn: null,
                onFocusOut: null,
                onHashChange: null,
                onInput: null,
                onInvalid: null,
                onKeyDown: null,
                onKeyPress: null,
                onKeyUp: null,
                onLoad: null,
                onLoadedData: null,
                onLoadedMetadata: null,
                onLoadStart: null,
                onMessage: null,
                onMouseDown: null,
                onMouseEnter: null,
                onMouseLeave: null,
                onMouseMove: null,
                onMouseOut: null,
                onMouseOver: null,
                onMouseUp: null,
                onMouseWheel: null,
                onOffline: null,
                onOnline: null,
                onPageHide: null,
                onPageShow: null,
                onPaste: null,
                onPause: null,
                onPlay: null,
                onPlaying: null,
                onPopState: null,
                onProgress: null,
                onRateChange: null,
                onRepeat: null,
                onReset: null,
                onResize: null,
                onScroll: null,
                onSeeked: null,
                onSeeking: null,
                onSelect: null,
                onShow: null,
                onStalled: null,
                onStorage: null,
                onSubmit: null,
                onSuspend: null,
                onTimeUpdate: null,
                onToggle: null,
                onUnload: null,
                onVolumeChange: null,
                onWaiting: null,
                onZoom: null,
                opacity: null,
                operator: null,
                order: null,
                orient: null,
                orientation: null,
                origin: null,
                overflow: null,
                overlay: null,
                overlinePosition: Wn,
                overlineThickness: Wn,
                paintOrder: null,
                panose1: null,
                path: null,
                pathLength: Wn,
                patternContentUnits: null,
                patternTransform: null,
                patternUnits: null,
                phase: null,
                ping: Qn,
                pitch: null,
                playbackOrder: null,
                pointerEvents: null,
                points: null,
                pointsAtX: Wn,
                pointsAtY: Wn,
                pointsAtZ: Wn,
                preserveAlpha: null,
                preserveAspectRatio: null,
                primitiveUnits: null,
                propagate: null,
                property: Xn,
                r: null,
                radius: null,
                referrerPolicy: null,
                refX: null,
                refY: null,
                rel: Xn,
                rev: Xn,
                renderingIntent: null,
                repeatCount: null,
                repeatDur: null,
                requiredExtensions: Xn,
                requiredFeatures: Xn,
                requiredFonts: Xn,
                requiredFormats: Xn,
                resource: null,
                restart: null,
                result: null,
                rotate: null,
                rx: null,
                ry: null,
                scale: null,
                seed: null,
                shapeRendering: null,
                side: null,
                slope: null,
                snapshotTime: null,
                specularConstant: Wn,
                specularExponent: Wn,
                spreadMethod: null,
                spacing: null,
                startOffset: null,
                stdDeviation: null,
                stemh: null,
                stemv: null,
                stitchTiles: null,
                stopColor: null,
                stopOpacity: null,
                strikethroughPosition: Wn,
                strikethroughThickness: Wn,
                string: null,
                stroke: null,
                strokeDashArray: Xn,
                strokeDashOffset: null,
                strokeLineCap: null,
                strokeLineJoin: null,
                strokeMiterLimit: Wn,
                strokeOpacity: Wn,
                strokeWidth: null,
                style: null,
                surfaceScale: Wn,
                syncBehavior: null,
                syncBehaviorDefault: null,
                syncMaster: null,
                syncTolerance: null,
                syncToleranceDefault: null,
                systemLanguage: Xn,
                tabIndex: Wn,
                tableValues: null,
                target: null,
                targetX: Wn,
                targetY: Wn,
                textAnchor: null,
                textDecoration: null,
                textRendering: null,
                textLength: null,
                timelineBegin: null,
                title: null,
                transformBehavior: null,
                type: null,
                typeOf: Xn,
                to: null,
                transform: null,
                u1: null,
                u2: null,
                underlinePosition: Wn,
                underlineThickness: Wn,
                unicode: null,
                unicodeBidi: null,
                unicodeRange: null,
                unitsPerEm: Wn,
                values: null,
                vAlphabetic: Wn,
                vMathematical: Wn,
                vectorEffect: null,
                vHanging: Wn,
                vIdeographic: Wn,
                version: null,
                vertAdvY: Wn,
                vertOriginX: Wn,
                vertOriginY: Wn,
                viewBox: null,
                viewTarget: null,
                visibility: null,
                width: null,
                widths: null,
                wordSpacing: null,
                writingMode: null,
                x: null,
                x1: null,
                x2: null,
                xChannelSelector: null,
                xHeight: Wn,
                y: null,
                y1: null,
                y2: null,
                yChannelSelector: null,
                z: null,
                zoomAndPan: null
            }
        }), pr = Un([ ar, ur, lr, sr, cr ], "html"), fr = Un([ ar, ur, lr, sr, dr ], "svg");
        function Dr(e) {
            if (e.allowedElements && e.disallowedElements) throw new TypeError("Only one of `allowedElements` and `disallowedElements` should be defined");
            if (e.allowedElements || e.disallowedElements || e.allowElement) return function(t) {
                mn(t, "element", (function(t, n, r) {
                    var u, i, a = r;
                    if (e.allowedElements ? u = !e.allowedElements.includes(t.tagName) : e.disallowedElements && (u = e.disallowedElements.includes(t.tagName)), 
                    !u && e.allowElement && "number" == typeof n && (u = !e.allowElement(t, n, a)), 
                    u && "number" == typeof n) return e.unwrapDisallowed && t.children ? (i = a.children).splice.apply(i, [ n, 1 ].concat(T(t.children))) : a.children.splice(n, 1), 
                    n;
                }));
            };
        }
        var gr = n(8599), hr = /^data[-\w.:]+$/i, mr = /-[a-z]/g, br = /[A-Z]/g;
        function vr(e) {
            return "-" + e.toLowerCase();
        }
        function Er(e) {
            return e.charAt(1).toUpperCase();
        }
        var yr = {
            classId: "classID",
            dataType: "datatype",
            itemId: "itemID",
            strokeDashArray: "strokeDasharray",
            strokeDashOffset: "strokeDashoffset",
            strokeLineCap: "strokeLinecap",
            strokeLineJoin: "strokeLinejoin",
            strokeMiterLimit: "strokeMiterlimit",
            typeOf: "typeof",
            xLinkActuate: "xlinkActuate",
            xLinkArcRole: "xlinkArcrole",
            xLinkHref: "xlinkHref",
            xLinkRole: "xlinkRole",
            xLinkShow: "xlinkShow",
            xLinkTitle: "xlinkTitle",
            xLinkType: "xlinkType",
            xmlnsXLink: "xmlnsXlink"
        }, _r = n(6426), Cr = [ "http", "https", "mailto", "tel" ];
        function Fr(e) {
            var t = (e || "").trim(), n = t.charAt(0);
            if ("#" === n || "/" === n) return t;
            var r = t.indexOf(":");
            if (-1 === r) return t;
            for (var u = -1; ++u < Cr.length; ) {
                var a = Cr[u];
                if (r === a.length && t.slice(0, a.length).toLowerCase() === a) return t;
            }
            return -1 !== (u = t.indexOf("?")) && r > u || -1 !== (u = t.indexOf("#")) && r > u ? t : "javascript:void(0)";
        }
        var Ar = {}.hasOwnProperty, xr = new Set([ "table", "thead", "tbody", "tfoot", "tr" ]);
        function wr(e, t) {
            for (var n, r, u, a = [], i = -1; ++i < t.children.length; ) "element" === (n = t.children[i]).type ? a.push(kr(e, n, i, t)) : "text" === n.type ? "element" === t.type && xr.has(t.tagName) && (u = void 0, 
            "string" == typeof (u = (r = n) && "object" == typeof r && "text" === r.type ? r.value || "" : r) && "" === u.replace(/[ \t\n\f\r]/g, "")) || a.push(n.value) : "raw" !== n.type || e.options.skipHtml || a.push(n.value);
            return a;
        }
        function kr(e, t, n, r) {
            var u, a = e.options, i = void 0 === a.transformLinkUri ? Fr : a.transformLinkUri, l = e.schema, s = t.tagName, c = {}, d = l;
            if ("html" === l.space && "svg" === s && (d = fr, e.schema = d), t.properties) for (u in t.properties) Ar.call(t.properties, u) && Sr(c, u, t.properties[u], e);
            "ol" !== s && "ul" !== s || e.listDepth++;
            var p = wr(e, t);
            "ol" !== s && "ul" !== s || e.listDepth--, e.schema = l;
            var f, D = t.position || {
                start: {
                    line: null,
                    column: null,
                    offset: null
                },
                end: {
                    line: null,
                    column: null,
                    offset: null
                }
            }, g = a.components && Ar.call(a.components, s) ? a.components[s] : s, h = "string" == typeof g || g === o.Fragment;
            if (!gr.isValidElementType(g)) throw new TypeError("Component for name `".concat(s, "` not defined or is not renderable"));
            if (c.key = [ s, D.start.line, D.start.column, n ].join("-"), "a" === s && a.linkTarget && (c.target = "function" == typeof a.linkTarget ? a.linkTarget(String(c.href || ""), t.children, "string" == typeof c.title ? c.title : null) : a.linkTarget), 
            "a" === s && i && (c.href = i(String(c.href || ""), t.children, "string" == typeof c.title ? c.title : null)), 
            h || "code" !== s || "element" !== r.type || "pre" === r.tagName || (c.inline = !0), 
            h || "h1" !== s && "h2" !== s && "h3" !== s && "h4" !== s && "h5" !== s && "h6" !== s || (c.level = Number.parseInt(s.charAt(1), 10)), 
            "img" === s && a.transformImageUri && (c.src = a.transformImageUri(String(c.src || ""), String(c.alt || ""), "string" == typeof c.title ? c.title : null)), 
            !h && "li" === s && "element" === r.type) {
                var m = function(e) {
                    for (var t = -1; ++t < e.children.length; ) {
                        var n = e.children[t];
                        if ("element" === n.type && "input" === n.tagName) return n;
                    }
                    return null;
                }(t);
                c.checked = m && m.properties ? Boolean(m.properties.checked) : null, c.index = Br(r, t), 
                c.ordered = "ol" === r.tagName;
            }
            return h || "ol" !== s && "ul" !== s || (c.ordered = "ol" === s, c.depth = e.listDepth), 
            "td" !== s && "th" !== s || (c.align && (c.style || (c.style = {}), c.style.textAlign = c.align, 
            delete c.align), h || (c.isHeader = "th" === s)), h || "tr" !== s || "element" !== r.type || (c.isHeader = Boolean("thead" === r.tagName)), 
            a.sourcePos && (c["data-sourcepos"] = [ (f = D).start.line, ":", f.start.column, "-", f.end.line, ":", f.end.column ].map(String).join("")), 
            !h && a.rawSourcePos && (c.sourcePosition = t.position), !h && a.includeElementIndex && (c.index = Br(r, t), 
            c.siblingCount = Br(r)), h || (c.node = t), p.length > 0 ? o.createElement(g, c, p) : o.createElement(g, c);
        }
        function Br(e, t) {
            for (var n = -1, r = 0; ++n < e.children.length && e.children[n] !== t; ) "element" === e.children[n].type && r++;
            return r;
        }
        function Sr(e, t, n, r) {
            var u, i, o = function(e, t) {
                var n = qn(t), r = t, u = Hn;
                if (n in e.normal) return e.property[e.normal[n]];
                if (n.length > 4 && "data" === n.slice(0, 4) && hr.test(t)) {
                    if ("-" === t.charAt(4)) {
                        var a = t.slice(5).replace(mr, Er);
                        r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
                    } else {
                        var i = t.slice(4);
                        if (!mr.test(i)) {
                            var o = i.replace(br, vr);
                            "-" !== o.charAt(0) && (o = "-" + o), t = "data" + o;
                        }
                    }
                    u = er;
                }
                return new u(r, t);
            }(r.schema, t), l = n;
            null != l && l == l && (Array.isArray(l) && (l = o.commaSeparated ? (i = {}, ("" === (u = l)[u.length - 1] ? [].concat(T(u), [ "" ]) : u).join((i.padRight ? " " : "") + "," + (!1 === i.padLeft ? "" : " ")).trim()) : function(e) {
                return e.join(" ").trim();
            }(l)), "style" === o.property && "string" == typeof l && (l = function(e) {
                var t = {};
                try {
                    _r(e, (function(e, n) {
                        var r = "-ms-" === e.slice(0, 4) ? "ms-".concat(e.slice(4)) : e;
                        t[r.replace(/-([a-z])/g, Nr)] = n;
                    }));
                } catch (e) {}
                return t;
            }(l)), o.space && o.property ? e[Ar.call(yr, o.property) ? yr[o.property] : o.property] = l : o.attribute && (e[o.attribute] = l));
        }
        function Nr(e, t) {
            return t.toUpperCase();
        }
        var Or = {}.hasOwnProperty, Tr = {
            plugins: {
                to: "remarkPlugins",
                id: "change-plugins-to-remarkplugins"
            },
            renderers: {
                to: "components",
                id: "change-renderers-to-components"
            },
            astPlugins: {
                id: "remove-buggy-html-in-markdown-parser"
            },
            allowDangerousHtml: {
                id: "remove-buggy-html-in-markdown-parser"
            },
            escapeHtml: {
                id: "remove-buggy-html-in-markdown-parser"
            },
            source: {
                to: "children",
                id: "change-source-to-children"
            },
            allowNode: {
                to: "allowElement",
                id: "replace-allownode-allowedtypes-and-disallowedtypes"
            },
            allowedTypes: {
                to: "allowedElements",
                id: "replace-allownode-allowedtypes-and-disallowedtypes"
            },
            disallowedTypes: {
                to: "disallowedElements",
                id: "replace-allownode-allowedtypes-and-disallowedtypes"
            },
            includeNodeIndex: {
                to: "includeElementIndex",
                id: "change-includenodeindex-to-includeelementindex"
            }
        };
        function Mr(e) {
            for (var t in Tr) Or.call(Tr, t) && Or.call(e, t) && (Tr[t], delete Tr[t]);
            var n = ie().use(cn).use(e.remarkPlugins || []).use(Pn, N(N({}, e.remarkRehypeOptions), {}, {
                allowDangerousHtml: !0
            })).use(e.rehypePlugins || []).use(Dr, e), r = new Q;
            "string" == typeof e.children ? r.value = e.children : void 0 !== e.children && e.children;
            var u = n.runSync(n.parse(r), r);
            if ("root" !== u.type) throw new TypeError("Expected a `root` node");
            var a = o.createElement(o.Fragment, {}, wr({
                options: e,
                schema: pr,
                listDepth: 0
            }, u));
            return e.className && (a = o.createElement("div", {
                className: e.className
            }, a)), a;
        }
        Mr.propTypes = {
            children: jn.string,
            className: jn.string,
            allowElement: jn.func,
            allowedElements: jn.arrayOf(jn.string),
            disallowedElements: jn.arrayOf(jn.string),
            unwrapDisallowed: jn.bool,
            remarkPlugins: jn.arrayOf(jn.oneOfType([ jn.object, jn.func, jn.arrayOf(jn.oneOfType([ jn.bool, jn.string, jn.object, jn.func, jn.arrayOf(jn.any) ])) ])),
            rehypePlugins: jn.arrayOf(jn.oneOfType([ jn.object, jn.func, jn.arrayOf(jn.oneOfType([ jn.bool, jn.string, jn.object, jn.func, jn.arrayOf(jn.any) ])) ])),
            sourcePos: jn.bool,
            rawSourcePos: jn.bool,
            skipHtml: jn.bool,
            includeElementIndex: jn.bool,
            transformLinkUri: jn.oneOfType([ jn.func, jn.bool ]),
            linkTarget: jn.oneOfType([ jn.func, jn.string ]),
            transformImageUri: jn.func,
            components: jn.object
        };
        var Lr = [ "a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video" ], Ir = [ "any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height" ], Rr = [ "active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where" ], Pr = [ "after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error" ], jr = [ "align-content", "align-items", "align-self", "all", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "block-size", "border", "border-block", "border-block-color", "border-block-end", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-style", "border-block-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline", "border-inline-color", "border-inline-end", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-style", "border-inline-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "clip-rule", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "content", "content-visibility", "counter-increment", "counter-reset", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "flow", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-smoothing", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "gap", "glyph-orientation-vertical", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "inline-size", "isolation", "justify-content", "left", "letter-spacing", "line-break", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-block", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "marks", "mask", "mask-border", "mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "max-block-size", "max-height", "max-inline-size", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "mix-blend-mode", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-block", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "rest", "rest-after", "rest-before", "right", "row-gap", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-stop", "scroll-snap-type", "scrollbar-color", "scrollbar-gutter", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "speak", "speak-as", "src", "tab-size", "table-layout", "text-align", "text-align-all", "text-align-last", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-box", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index" ].reverse(), zr = "[0-9](_*[0-9])*", Ur = "\\.(".concat(zr, ")"), qr = "[0-9a-fA-F](_*[0-9a-fA-F])*", Hr = {
            className: "number",
            variants: [ {
                begin: "(\\b(".concat(zr, ")((").concat(Ur, ")|\\.)?|(").concat(Ur, "))") + "[eE][+-]?(".concat(zr, ")[fFdD]?\\b")
            }, {
                begin: "\\b(".concat(zr, ")((").concat(Ur, ")[fFdD]?\\b|\\.([fFdD]\\b)?)")
            }, {
                begin: "(".concat(Ur, ")[fFdD]?\\b")
            }, {
                begin: "\\b(".concat(zr, ")[fFdD]\\b")
            }, {
                begin: "\\b0[xX]((".concat(qr, ")\\.?|(").concat(qr, ")?\\.(").concat(qr, "))") + "[pP][+-]?(".concat(zr, ")[fFdD]?\\b")
            }, {
                begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b"
            }, {
                begin: "\\b0[xX](".concat(qr, ")[lL]?\\b")
            }, {
                begin: "\\b0(_*[0-7])*[lL]?\\b"
            }, {
                begin: "\\b0[bB][01](_*[01])*[lL]?\\b"
            } ],
            relevance: 0
        };
        function $r(e, t, n) {
            return -1 === n ? "" : e.replace(t, (function(r) {
                return $r(e, t, n - 1);
            }));
        }
        var Kr = "[A-Za-z$_][0-9A-Za-z$_]*", Vr = [ "as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends" ], Gr = [ "true", "false", "null", "undefined", "NaN", "Infinity" ], Wr = [ "Object", "Function", "Boolean", "Symbol", "Math", "Date", "Number", "BigInt", "String", "RegExp", "Array", "Float32Array", "Float64Array", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Int32Array", "Uint16Array", "Uint32Array", "BigInt64Array", "BigUint64Array", "Set", "Map", "WeakSet", "WeakMap", "ArrayBuffer", "SharedArrayBuffer", "Atomics", "DataView", "JSON", "Promise", "Generator", "GeneratorFunction", "AsyncFunction", "Reflect", "Proxy", "Intl", "WebAssembly" ], Qr = [ "Error", "EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError" ], Zr = [ "setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape" ], Xr = [ "arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global" ], Yr = [].concat(Zr, Wr, Qr), Jr = "[0-9](_*[0-9])*", eu = "\\.(".concat(Jr, ")"), tu = "[0-9a-fA-F](_*[0-9a-fA-F])*", nu = {
            className: "number",
            variants: [ {
                begin: "(\\b(".concat(Jr, ")((").concat(eu, ")|\\.)?|(").concat(eu, "))") + "[eE][+-]?(".concat(Jr, ")[fFdD]?\\b")
            }, {
                begin: "\\b(".concat(Jr, ")((").concat(eu, ")[fFdD]?\\b|\\.([fFdD]\\b)?)")
            }, {
                begin: "(".concat(eu, ")[fFdD]?\\b")
            }, {
                begin: "\\b(".concat(Jr, ")[fFdD]\\b")
            }, {
                begin: "\\b0[xX]((".concat(tu, ")\\.?|(").concat(tu, ")?\\.(").concat(tu, "))") + "[pP][+-]?(".concat(Jr, ")[fFdD]?\\b")
            }, {
                begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b"
            }, {
                begin: "\\b0[xX](".concat(tu, ")[lL]?\\b")
            }, {
                begin: "\\b0(_*[0-7])*[lL]?\\b"
            }, {
                begin: "\\b0[bB][01](_*[01])*[lL]?\\b"
            } ],
            relevance: 0
        }, ru = [ "a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video" ], uu = [ "any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height" ], au = [ "active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where" ], iu = [ "after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error" ], ou = [ "align-content", "align-items", "align-self", "all", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "block-size", "border", "border-block", "border-block-color", "border-block-end", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-style", "border-block-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline", "border-inline-color", "border-inline-end", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-style", "border-inline-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "clip-rule", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "content", "content-visibility", "counter-increment", "counter-reset", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "flow", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-smoothing", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "gap", "glyph-orientation-vertical", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "inline-size", "isolation", "justify-content", "left", "letter-spacing", "line-break", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-block", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "marks", "mask", "mask-border", "mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "max-block-size", "max-height", "max-inline-size", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "mix-blend-mode", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-block", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "rest", "rest-after", "rest-before", "right", "row-gap", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-stop", "scroll-snap-type", "scrollbar-color", "scrollbar-gutter", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "speak", "speak-as", "src", "tab-size", "table-layout", "text-align", "text-align-all", "text-align-last", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-box", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index" ].reverse(), lu = au.concat(iu), su = [ "a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video" ], cu = [ "any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height" ], du = [ "active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where" ], pu = [ "after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error" ], fu = [ "align-content", "align-items", "align-self", "all", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "block-size", "border", "border-block", "border-block-color", "border-block-end", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-style", "border-block-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline", "border-inline-color", "border-inline-end", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-style", "border-inline-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "clip-rule", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "content", "content-visibility", "counter-increment", "counter-reset", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "flow", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-smoothing", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "gap", "glyph-orientation-vertical", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "inline-size", "isolation", "justify-content", "left", "letter-spacing", "line-break", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-block", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "marks", "mask", "mask-border", "mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "max-block-size", "max-height", "max-inline-size", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "mix-blend-mode", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-block", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "rest", "rest-after", "rest-before", "right", "row-gap", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-stop", "scroll-snap-type", "scrollbar-color", "scrollbar-gutter", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "speak", "speak-as", "src", "tab-size", "table-layout", "text-align", "text-align-all", "text-align-last", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-box", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index" ].reverse();
        function Du(e) {
            return e ? "string" == typeof e ? e : e.source : null;
        }
        function gu(e) {
            return hu("(?=", e, ")");
        }
        function hu() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            var r = t.map((function(e) {
                return Du(e);
            })).join("");
            return r;
        }
        function mu(e) {
            var t = e[e.length - 1];
            return "object" == typeof t && t.constructor === Object ? (e.splice(e.length - 1, 1), 
            t) : {};
        }
        function bu() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            var r = mu(t), u = "(" + (r.capture ? "" : "?:") + t.map((function(e) {
                return Du(e);
            })).join("|") + ")";
            return u;
        }
        var vu = function(e) {
            return hu(/\b/, e, /\w$/.test(e) ? /\b/ : /\B/);
        }, Eu = [ "Protocol", "Type" ].map(vu), yu = [ "init", "self" ].map(vu), _u = [ "Any", "Self" ], Cu = [ "actor", "any", "associatedtype", "async", "await", /as\?/, /as!/, "as", "break", "case", "catch", "class", "continue", "convenience", "default", "defer", "deinit", "didSet", "distributed", "do", "dynamic", "else", "enum", "extension", "fallthrough", /fileprivate\(set\)/, "fileprivate", "final", "for", "func", "get", "guard", "if", "import", "indirect", "infix", /init\?/, /init!/, "inout", /internal\(set\)/, "internal", "in", "is", "isolated", "nonisolated", "lazy", "let", "mutating", "nonmutating", /open\(set\)/, "open", "operator", "optional", "override", "postfix", "precedencegroup", "prefix", /private\(set\)/, "private", "protocol", /public\(set\)/, "public", "repeat", "required", "rethrows", "return", "set", "some", "static", "struct", "subscript", "super", "switch", "throws", "throw", /try\?/, /try!/, "try", "typealias", /unowned\(safe\)/, /unowned\(unsafe\)/, "unowned", "var", "weak", "where", "while", "willSet" ], Fu = [ "false", "nil", "true" ], Au = [ "assignment", "associativity", "higherThan", "left", "lowerThan", "none", "right" ], xu = [ "#colorLiteral", "#column", "#dsohandle", "#else", "#elseif", "#endif", "#error", "#file", "#fileID", "#fileLiteral", "#filePath", "#function", "#if", "#imageLiteral", "#keyPath", "#line", "#selector", "#sourceLocation", "#warn_unqualified_access", "#warning" ], wu = [ "abs", "all", "any", "assert", "assertionFailure", "debugPrint", "dump", "fatalError", "getVaList", "isKnownUniquelyReferenced", "max", "min", "numericCast", "pointwiseMax", "pointwiseMin", "precondition", "preconditionFailure", "print", "readLine", "repeatElement", "sequence", "stride", "swap", "swift_unboxFromSwiftValueWithType", "transcode", "type", "unsafeBitCast", "unsafeDowncast", "withExtendedLifetime", "withUnsafeMutablePointer", "withUnsafePointer", "withVaList", "withoutActuallyEscaping", "zip" ], ku = bu(/[/=\-+!*%<>&|^~?]/, /[\u00A1-\u00A7]/, /[\u00A9\u00AB]/, /[\u00AC\u00AE]/, /[\u00B0\u00B1]/, /[\u00B6\u00BB\u00BF\u00D7\u00F7]/, /[\u2016-\u2017]/, /[\u2020-\u2027]/, /[\u2030-\u203E]/, /[\u2041-\u2053]/, /[\u2055-\u205E]/, /[\u2190-\u23FF]/, /[\u2500-\u2775]/, /[\u2794-\u2BFF]/, /[\u2E00-\u2E7F]/, /[\u3001-\u3003]/, /[\u3008-\u3020]/, /[\u3030]/), Bu = bu(ku, /[\u0300-\u036F]/, /[\u1DC0-\u1DFF]/, /[\u20D0-\u20FF]/, /[\uFE00-\uFE0F]/, /[\uFE20-\uFE2F]/), Su = hu(ku, Bu, "*"), Nu = bu(/[a-zA-Z_]/, /[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/, /[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/, /[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/, /[\u1E00-\u1FFF]/, /[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/, /[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/, /[\u2C00-\u2DFF\u2E80-\u2FFF]/, /[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/, /[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/, /[\uFE47-\uFEFE\uFF00-\uFFFD]/), Ou = bu(Nu, /\d/, /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/), Tu = hu(Nu, Ou, "*"), Mu = hu(/[A-Z]/, Ou, "*"), Lu = [ "autoclosure", hu(/convention\(/, bu("swift", "block", "c"), /\)/), "discardableResult", "dynamicCallable", "dynamicMemberLookup", "escaping", "frozen", "GKInspectable", "IBAction", "IBDesignable", "IBInspectable", "IBOutlet", "IBSegueAction", "inlinable", "main", "nonobjc", "NSApplicationMain", "NSCopying", "NSManaged", hu(/objc\(/, Tu, /\)/), "objc", "objcMembers", "propertyWrapper", "requires_stored_property_inits", "resultBuilder", "testable", "UIApplicationMain", "unknown", "usableFromInline" ], Iu = [ "iOS", "iOSApplicationExtension", "macOS", "macOSApplicationExtension", "macCatalyst", "macCatalystApplicationExtension", "watchOS", "watchOSApplicationExtension", "tvOS", "tvOSApplicationExtension", "swift" ], Ru = "[A-Za-z$_][0-9A-Za-z$_]*", Pu = [ "as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends" ], ju = [ "true", "false", "null", "undefined", "NaN", "Infinity" ], zu = [ "Object", "Function", "Boolean", "Symbol", "Math", "Date", "Number", "BigInt", "String", "RegExp", "Array", "Float32Array", "Float64Array", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Int32Array", "Uint16Array", "Uint32Array", "BigInt64Array", "BigUint64Array", "Set", "Map", "WeakSet", "WeakMap", "ArrayBuffer", "SharedArrayBuffer", "Atomics", "DataView", "JSON", "Promise", "Generator", "GeneratorFunction", "AsyncFunction", "Reflect", "Proxy", "Intl", "WebAssembly" ], Uu = [ "Error", "EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError" ], qu = [ "setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape" ], Hu = [ "arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global" ], $u = [].concat(qu, zu, Uu), Ku = n(566), Vu = n(4707), Gu = Object.assign(Wu(Error), {
            eval: Wu(EvalError),
            range: Wu(RangeError),
            reference: Wu(ReferenceError),
            syntax: Wu(SyntaxError),
            type: Wu(TypeError),
            uri: Wu(URIError)
        });
        function Wu(e) {
            return t.displayName = e.displayName || e.name, t;
            function t(t) {
                for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), u = 1; u < n; u++) r[u - 1] = arguments[u];
                var a = t ? Vu.apply(void 0, [ t ].concat(r)) : t;
                return new e(a);
            }
        }
        var Qu = {}.hasOwnProperty, Zu = "hljs-";
        function Xu(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = n.prefix;
            if ("string" != typeof e) throw Gu("Expected `string` for name, got `%s`", e);
            if (!Ku.getLanguage(e)) throw Gu("Unknown language: `%s` is not registered", e);
            if ("string" != typeof t) throw Gu("Expected `string` for value, got `%s`", t);
            null == r && (r = Zu), Ku.configure({
                __emitter: Yu,
                classPrefix: r
            });
            var u = Ku.highlight(t, {
                language: e,
                ignoreIllegals: !0
            });
            if (Ku.configure({}), u.errorRaised) throw u.errorRaised;
            return u._emitter.root.data.language = u.language, u._emitter.root.data.relevance = u.relevance, 
            u._emitter.root;
        }
        var Yu = function() {
            function e(t) {
                b(this, e), this.options = t, this.root = {
                    type: "root",
                    data: {
                        language: null,
                        relevance: 0
                    },
                    children: []
                }, this.stack = [ this.root ];
            }
            return E(e, [ {
                key: "addText",
                value: function(e) {
                    if ("" !== e) {
                        var t = this.stack[this.stack.length - 1], n = t.children[t.children.length - 1];
                        n && "text" === n.type ? n.value += e : t.children.push({
                            type: "text",
                            value: e
                        });
                    }
                }
            }, {
                key: "addKeyword",
                value: function(e, t) {
                    this.openNode(t), this.addText(e), this.closeNode();
                }
            }, {
                key: "addSublanguage",
                value: function(e, t) {
                    var n, r = this.stack[this.stack.length - 1], u = e.root.children;
                    t ? r.children.push({
                        type: "element",
                        tagName: "span",
                        properties: {
                            className: [ t ]
                        },
                        children: u
                    }) : (n = r.children).push.apply(n, T(u));
                }
            }, {
                key: "openNode",
                value: function(e) {
                    var t = this, n = {
                        type: "element",
                        tagName: "span",
                        properties: {
                            className: e.split(".").map((function(e, n) {
                                return n ? e + "_".repeat(n) : t.options.classPrefix + e;
                            }))
                        },
                        children: []
                    };
                    this.stack[this.stack.length - 1].children.push(n), this.stack.push(n);
                }
            }, {
                key: "closeNode",
                value: function() {
                    this.stack.pop();
                }
            }, {
                key: "closeAllNodes",
                value: function() {}
            }, {
                key: "finalize",
                value: function() {}
            }, {
                key: "toHTML",
                value: function() {
                    return "";
                }
            } ]), e;
        }(), Ju = {
            highlight: Xu,
            highlightAuto: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = t.subset || Ku.listLanguages(), r = t.prefix, u = -1, a = {
                    type: "root",
                    data: {
                        language: null,
                        relevance: 0
                    },
                    children: []
                };
                if (null == r && (r = Zu), "string" != typeof e) throw Gu("Expected `string` for value, got `%s`", e);
                for (;++u < n.length; ) {
                    var i = n[u];
                    if (Ku.getLanguage(i)) {
                        var o = Xu(i, e, t);
                        o.data.relevance > a.data.relevance && (a = o);
                    }
                }
                return a;
            },
            registerLanguage: function(e, t) {
                Ku.registerLanguage(e, t);
            },
            registered: function(e) {
                return Boolean(Ku.getLanguage(e));
            },
            listLanguages: function() {
                return Ku.listLanguages();
            },
            registerAlias: function(e, t) {
                var n;
                if ("string" == typeof e) Ku.registerAliases(t, {
                    languageName: e
                }); else for (n in e) Qu.call(e, n) && Ku.registerAliases(e[n], {
                    languageName: n
                });
            }
        };
        Ju.registerLanguage("arduino", (function(e) {
            var a = function(e) {
                var t = e.regex, n = e.COMMENT("//", "$", {
                    contains: [ {
                        begin: /\\\n/
                    } ]
                }), u = "[a-zA-Z_]\\w*::", a = "(?!struct)(decltype\\(auto\\)|" + t.optional(u) + "[a-zA-Z_]\\w*" + t.optional("<[^<>]+>") + ")", i = {
                    className: "type",
                    begin: "\\b[a-z\\d_]*_t\\b"
                }, o = {
                    className: "string",
                    variants: [ {
                        begin: '(u8?|U|L)?"',
                        end: '"',
                        illegal: "\\n",
                        contains: [ e.BACKSLASH_ESCAPE ]
                    }, {
                        begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
                        end: "'",
                        illegal: "."
                    }, e.END_SAME_AS_BEGIN({
                        begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
                        end: /\)([^()\\ ]{0,16})"/
                    }) ]
                }, l = {
                    className: "number",
                    variants: [ {
                        begin: "\\b(0b[01']+)"
                    }, {
                        begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
                    }, {
                        begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
                    } ],
                    relevance: 0
                }, s = {
                    className: "meta",
                    begin: /#\s*[a-z]+\b/,
                    end: /$/,
                    keywords: {
                        keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
                    },
                    contains: [ {
                        begin: /\\\n/,
                        relevance: 0
                    }, e.inherit(o, {
                        className: "string"
                    }), {
                        className: "string",
                        begin: /<.*?>/
                    }, n, e.C_BLOCK_COMMENT_MODE ]
                }, c = {
                    className: "title",
                    begin: t.optional(u) + e.IDENT_RE,
                    relevance: 0
                }, d = t.optional(u) + e.IDENT_RE + "\\s*\\(", p = {
                    type: [ "bool", "char", "char16_t", "char32_t", "char8_t", "double", "float", "int", "long", "short", "void", "wchar_t", "unsigned", "signed", "const", "static" ],
                    keyword: [ "alignas", "alignof", "and", "and_eq", "asm", "atomic_cancel", "atomic_commit", "atomic_noexcept", "auto", "bitand", "bitor", "break", "case", "catch", "class", "co_await", "co_return", "co_yield", "compl", "concept", "const_cast|10", "consteval", "constexpr", "constinit", "continue", "decltype", "default", "delete", "do", "dynamic_cast|10", "else", "enum", "explicit", "export", "extern", "false", "final", "for", "friend", "goto", "if", "import", "inline", "module", "mutable", "namespace", "new", "noexcept", "not", "not_eq", "nullptr", "operator", "or", "or_eq", "override", "private", "protected", "public", "reflexpr", "register", "reinterpret_cast|10", "requires", "return", "sizeof", "static_assert", "static_cast|10", "struct", "switch", "synchronized", "template", "this", "thread_local", "throw", "transaction_safe", "transaction_safe_dynamic", "true", "try", "typedef", "typeid", "typename", "union", "using", "virtual", "volatile", "while", "xor", "xor_eq" ],
                    literal: [ "NULL", "false", "nullopt", "nullptr", "true" ],
                    built_in: [ "_Pragma" ],
                    _type_hints: [ "any", "auto_ptr", "barrier", "binary_semaphore", "bitset", "complex", "condition_variable", "condition_variable_any", "counting_semaphore", "deque", "false_type", "future", "imaginary", "initializer_list", "istringstream", "jthread", "latch", "lock_guard", "multimap", "multiset", "mutex", "optional", "ostringstream", "packaged_task", "pair", "promise", "priority_queue", "queue", "recursive_mutex", "recursive_timed_mutex", "scoped_lock", "set", "shared_future", "shared_lock", "shared_mutex", "shared_timed_mutex", "shared_ptr", "stack", "string_view", "stringstream", "timed_mutex", "thread", "true_type", "tuple", "unique_lock", "unique_ptr", "unordered_map", "unordered_multimap", "unordered_multiset", "unordered_set", "variant", "vector", "weak_ptr", "wstring", "wstring_view" ]
                }, f = {
                    className: "function.dispatch",
                    relevance: 0,
                    keywords: {
                        _hint: [ "abort", "abs", "acos", "apply", "as_const", "asin", "atan", "atan2", "calloc", "ceil", "cerr", "cin", "clog", "cos", "cosh", "cout", "declval", "endl", "exchange", "exit", "exp", "fabs", "floor", "fmod", "forward", "fprintf", "fputs", "free", "frexp", "fscanf", "future", "invoke", "isalnum", "isalpha", "iscntrl", "isdigit", "isgraph", "islower", "isprint", "ispunct", "isspace", "isupper", "isxdigit", "labs", "launder", "ldexp", "log", "log10", "make_pair", "make_shared", "make_shared_for_overwrite", "make_tuple", "make_unique", "malloc", "memchr", "memcmp", "memcpy", "memset", "modf", "move", "pow", "printf", "putchar", "puts", "realloc", "scanf", "sin", "sinh", "snprintf", "sprintf", "sqrt", "sscanf", "std", "stderr", "stdin", "stdout", "strcat", "strchr", "strcmp", "strcpy", "strcspn", "strlen", "strncat", "strncmp", "strncpy", "strpbrk", "strrchr", "strspn", "strstr", "swap", "tan", "tanh", "terminate", "to_underlying", "tolower", "toupper", "vfprintf", "visit", "vprintf", "vsprintf" ]
                    },
                    begin: t.concat(/\b/, /(?!decltype)/, /(?!if)/, /(?!for)/, /(?!switch)/, /(?!while)/, e.IDENT_RE, t.lookahead(/(<[^<>]+>|)\s*\(/))
                }, D = [ f, s, i, n, e.C_BLOCK_COMMENT_MODE, l, o ], g = {
                    variants: [ {
                        begin: /=/,
                        end: /;/
                    }, {
                        begin: /\(/,
                        end: /\)/
                    }, {
                        beginKeywords: "new throw return else",
                        end: /;/
                    } ],
                    keywords: p,
                    contains: D.concat([ {
                        begin: /\(/,
                        end: /\)/,
                        keywords: p,
                        contains: D.concat([ "self" ]),
                        relevance: 0
                    } ]),
                    relevance: 0
                }, h = {
                    className: "function",
                    begin: "(" + a + "[\\*&\\s]+)+" + d,
                    returnBegin: !0,
                    end: /[{;=]/,
                    excludeEnd: !0,
                    keywords: p,
                    illegal: /[^\w\s\*&:<>.]/,
                    contains: [ {
                        begin: "decltype\\(auto\\)",
                        keywords: p,
                        relevance: 0
                    }, {
                        begin: d,
                        returnBegin: !0,
                        contains: [ c ],
                        relevance: 0
                    }, {
                        begin: /::/,
                        relevance: 0
                    }, {
                        begin: /:/,
                        endsWithParent: !0,
                        contains: [ o, l ]
                    }, {
                        relevance: 0,
                        match: /,/
                    }, {
                        className: "params",
                        begin: /\(/,
                        end: /\)/,
                        keywords: p,
                        relevance: 0,
                        contains: [ n, e.C_BLOCK_COMMENT_MODE, o, l, i, {
                            begin: /\(/,
                            end: /\)/,
                            keywords: p,
                            relevance: 0,
                            contains: [ "self", n, e.C_BLOCK_COMMENT_MODE, o, l, i ]
                        } ]
                    }, i, n, e.C_BLOCK_COMMENT_MODE, s ]
                };
                return {
                    name: "C++",
                    aliases: [ "cc", "c++", "h++", "hpp", "hh", "hxx", "cxx" ],
                    keywords: p,
                    illegal: "</",
                    classNameAliases: {
                        "function.dispatch": "built_in"
                    },
                    contains: [].concat(g, h, f, D, [ s, {
                        begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function)\\s*<(?!<)",
                        end: ">",
                        keywords: p,
                        contains: [ "self", i ]
                    }, {
                        begin: e.IDENT_RE + "::",
                        keywords: p
                    }, {
                        match: [ /\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/, /\s+/, /\w+/ ],
                        className: {
                            1: "keyword",
                            3: "title.class"
                        }
                    } ])
                };
            }(e), i = a.keywords;
            return i.type = [].concat(T(i.type), T([ "boolean", "byte", "word", "String" ])), 
            i.literal = [].concat(T(i.literal), T([ "DIGITAL_MESSAGE", "FIRMATA_STRING", "ANALOG_MESSAGE", "REPORT_DIGITAL", "REPORT_ANALOG", "INPUT_PULLUP", "SET_PIN_MODE", "INTERNAL2V56", "SYSTEM_RESET", "LED_BUILTIN", "INTERNAL1V1", "SYSEX_START", "INTERNAL", "EXTERNAL", "DEFAULT", "OUTPUT", "INPUT", "HIGH", "LOW" ])), 
            i.built_in = [].concat(T(i.built_in), T([ "KeyboardController", "MouseController", "SoftwareSerial", "EthernetServer", "EthernetClient", "LiquidCrystal", "RobotControl", "GSMVoiceCall", "EthernetUDP", "EsploraTFT", "HttpClient", "RobotMotor", "WiFiClient", "GSMScanner", "FileSystem", "Scheduler", "GSMServer", "YunClient", "YunServer", "IPAddress", "GSMClient", "GSMModem", "Keyboard", "Ethernet", "Console", "GSMBand", "Esplora", "Stepper", "Process", "WiFiUDP", "GSM_SMS", "Mailbox", "USBHost", "Firmata", "PImage", "Client", "Server", "GSMPIN", "FileIO", "Bridge", "Serial", "EEPROM", "Stream", "Mouse", "Audio", "Servo", "File", "Task", "GPRS", "WiFi", "Wire", "TFT", "GSM", "SPI", "SD" ])), 
            i._hints = [ "setup", "loop", "runShellCommandAsynchronously", "analogWriteResolution", "retrieveCallingNumber", "printFirmwareVersion", "analogReadResolution", "sendDigitalPortPair", "noListenOnLocalhost", "readJoystickButton", "setFirmwareVersion", "readJoystickSwitch", "scrollDisplayRight", "getVoiceCallStatus", "scrollDisplayLeft", "writeMicroseconds", "delayMicroseconds", "beginTransmission", "getSignalStrength", "runAsynchronously", "getAsynchronously", "listenOnLocalhost", "getCurrentCarrier", "readAccelerometer", "messageAvailable", "sendDigitalPorts", "lineFollowConfig", "countryNameWrite", "runShellCommand", "readStringUntil", "rewindDirectory", "readTemperature", "setClockDivider", "readLightSensor", "endTransmission", "analogReference", "detachInterrupt", "countryNameRead", "attachInterrupt", "encryptionType", "readBytesUntil", "robotNameWrite", "readMicrophone", "robotNameRead", "cityNameWrite", "userNameWrite", "readJoystickY", "readJoystickX", "mouseReleased", "openNextFile", "scanNetworks", "noInterrupts", "digitalWrite", "beginSpeaker", "mousePressed", "isActionDone", "mouseDragged", "displayLogos", "noAutoscroll", "addParameter", "remoteNumber", "getModifiers", "keyboardRead", "userNameRead", "waitContinue", "processInput", "parseCommand", "printVersion", "readNetworks", "writeMessage", "blinkVersion", "cityNameRead", "readMessage", "setDataMode", "parsePacket", "isListening", "setBitOrder", "beginPacket", "isDirectory", "motorsWrite", "drawCompass", "digitalRead", "clearScreen", "serialEvent", "rightToLeft", "setTextSize", "leftToRight", "requestFrom", "keyReleased", "compassRead", "analogWrite", "interrupts", "WiFiServer", "disconnect", "playMelody", "parseFloat", "autoscroll", "getPINUsed", "setPINUsed", "setTimeout", "sendAnalog", "readSlider", "analogRead", "beginWrite", "createChar", "motorsStop", "keyPressed", "tempoWrite", "readButton", "subnetMask", "debugPrint", "macAddress", "writeGreen", "randomSeed", "attachGPRS", "readString", "sendString", "remotePort", "releaseAll", "mouseMoved", "background", "getXChange", "getYChange", "answerCall", "getResult", "voiceCall", "endPacket", "constrain", "getSocket", "writeJSON", "getButton", "available", "connected", "findUntil", "readBytes", "exitValue", "readGreen", "writeBlue", "startLoop", "IPAddress", "isPressed", "sendSysex", "pauseMode", "gatewayIP", "setCursor", "getOemKey", "tuneWrite", "noDisplay", "loadImage", "switchPIN", "onRequest", "onReceive", "changePIN", "playFile", "noBuffer", "parseInt", "overflow", "checkPIN", "knobRead", "beginTFT", "bitClear", "updateIR", "bitWrite", "position", "writeRGB", "highByte", "writeRed", "setSpeed", "readBlue", "noStroke", "remoteIP", "transfer", "shutdown", "hangCall", "beginSMS", "endWrite", "attached", "maintain", "noCursor", "checkReg", "checkPUK", "shiftOut", "isValid", "shiftIn", "pulseIn", "connect", "println", "localIP", "pinMode", "getIMEI", "display", "noBlink", "process", "getBand", "running", "beginSD", "drawBMP", "lowByte", "setBand", "release", "bitRead", "prepare", "pointTo", "readRed", "setMode", "noFill", "remove", "listen", "stroke", "detach", "attach", "noTone", "exists", "buffer", "height", "bitSet", "circle", "config", "cursor", "random", "IRread", "setDNS", "endSMS", "getKey", "micros", "millis", "begin", "print", "write", "ready", "flush", "width", "isPIN", "blink", "clear", "press", "mkdir", "rmdir", "close", "point", "yield", "image", "BSSID", "click", "delay", "read", "text", "move", "peek", "beep", "rect", "line", "open", "seek", "fill", "size", "turn", "stop", "home", "find", "step", "tone", "sqrt", "RSSI", "SSID", "end", "bit", "tan", "cos", "sin", "pow", "map", "abs", "max", "min", "get", "run", "put" ], 
            a.name = "Arduino", a.aliases = [ "ino" ], a.supersetOf = "cpp", a;
        })), Ju.registerLanguage("bash", (function(e) {
            var t = e.regex, n = {}, r = {
                begin: /\$\{/,
                end: /\}/,
                contains: [ "self", {
                    begin: /:-/,
                    contains: [ n ]
                } ]
            };
            Object.assign(n, {
                className: "variable",
                variants: [ {
                    begin: t.concat(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])")
                }, r ]
            });
            var u = {
                className: "subst",
                begin: /\$\(/,
                end: /\)/,
                contains: [ e.BACKSLASH_ESCAPE ]
            }, a = {
                begin: /<<-?\s*(?=\w+)/,
                starts: {
                    contains: [ e.END_SAME_AS_BEGIN({
                        begin: /(\w+)/,
                        end: /(\w+)/,
                        className: "string"
                    }) ]
                }
            }, i = {
                className: "string",
                begin: /"/,
                end: /"/,
                contains: [ e.BACKSLASH_ESCAPE, n, u ]
            };
            u.contains.push(i);
            var o = {
                begin: /\$?\(\(/,
                end: /\)\)/,
                contains: [ {
                    begin: /\d+#[0-9a-f]+/,
                    className: "number"
                }, e.NUMBER_MODE, n ]
            }, l = e.SHEBANG({
                binary: "(".concat([ "fish", "bash", "zsh", "sh", "csh", "ksh", "tcsh", "dash", "scsh" ].join("|"), ")"),
                relevance: 10
            }), s = {
                className: "function",
                begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
                returnBegin: !0,
                contains: [ e.inherit(e.TITLE_MODE, {
                    begin: /\w[\w\d_]*/
                }) ],
                relevance: 0
            };
            return {
                name: "Bash",
                aliases: [ "sh" ],
                keywords: {
                    $pattern: /\b[a-z][a-z0-9._-]+\b/,
                    keyword: [ "if", "then", "else", "elif", "fi", "for", "while", "in", "do", "done", "case", "esac", "function" ],
                    literal: [ "true", "false" ],
                    built_in: [].concat([ "break", "cd", "continue", "eval", "exec", "exit", "export", "getopts", "hash", "pwd", "readonly", "return", "shift", "test", "times", "trap", "umask", "unset" ], [ "alias", "bind", "builtin", "caller", "command", "declare", "echo", "enable", "help", "let", "local", "logout", "mapfile", "printf", "read", "readarray", "source", "type", "typeset", "ulimit", "unalias" ], [ "set", "shopt" ], [ "autoload", "bg", "bindkey", "bye", "cap", "chdir", "clone", "comparguments", "compcall", "compctl", "compdescribe", "compfiles", "compgroups", "compquote", "comptags", "comptry", "compvalues", "dirs", "disable", "disown", "echotc", "echoti", "emulate", "fc", "fg", "float", "functions", "getcap", "getln", "history", "integer", "jobs", "kill", "limit", "log", "noglob", "popd", "print", "pushd", "pushln", "rehash", "sched", "setcap", "setopt", "stat", "suspend", "ttyctl", "unfunction", "unhash", "unlimit", "unsetopt", "vared", "wait", "whence", "where", "which", "zcompile", "zformat", "zftp", "zle", "zmodload", "zparseopts", "zprof", "zpty", "zregexparse", "zsocket", "zstyle", "ztcp" ], [ "chcon", "chgrp", "chown", "chmod", "cp", "dd", "df", "dir", "dircolors", "ln", "ls", "mkdir", "mkfifo", "mknod", "mktemp", "mv", "realpath", "rm", "rmdir", "shred", "sync", "touch", "truncate", "vdir", "b2sum", "base32", "base64", "cat", "cksum", "comm", "csplit", "cut", "expand", "fmt", "fold", "head", "join", "md5sum", "nl", "numfmt", "od", "paste", "ptx", "pr", "sha1sum", "sha224sum", "sha256sum", "sha384sum", "sha512sum", "shuf", "sort", "split", "sum", "tac", "tail", "tr", "tsort", "unexpand", "uniq", "wc", "arch", "basename", "chroot", "date", "dirname", "du", "echo", "env", "expr", "factor", "groups", "hostid", "id", "link", "logname", "nice", "nohup", "nproc", "pathchk", "pinky", "printenv", "printf", "pwd", "readlink", "runcon", "seq", "sleep", "stat", "stdbuf", "stty", "tee", "test", "timeout", "tty", "uname", "unlink", "uptime", "users", "who", "whoami", "yes" ])
                },
                contains: [ l, e.SHEBANG(), s, o, e.HASH_COMMENT_MODE, a, {
                    match: /(\/[a-z._-]+)+/
                }, i, {
                    className: "",
                    begin: /\\"/
                }, {
                    className: "string",
                    begin: /'/,
                    end: /'/
                }, n ]
            };
        })), Ju.registerLanguage("c", (function(e) {
            var t = e.regex, n = e.COMMENT("//", "$", {
                contains: [ {
                    begin: /\\\n/
                } ]
            }), u = "[a-zA-Z_]\\w*::", a = "(decltype\\(auto\\)|" + t.optional(u) + "[a-zA-Z_]\\w*" + t.optional("<[^<>]+>") + ")", i = {
                className: "type",
                variants: [ {
                    begin: "\\b[a-z\\d_]*_t\\b"
                }, {
                    match: /\batomic_[a-z]{3,6}\b/
                } ]
            }, o = {
                className: "string",
                variants: [ {
                    begin: '(u8?|U|L)?"',
                    end: '"',
                    illegal: "\\n",
                    contains: [ e.BACKSLASH_ESCAPE ]
                }, {
                    begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
                    end: "'",
                    illegal: "."
                }, e.END_SAME_AS_BEGIN({
                    begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
                    end: /\)([^()\\ ]{0,16})"/
                }) ]
            }, l = {
                className: "number",
                variants: [ {
                    begin: "\\b(0b[01']+)"
                }, {
                    begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
                }, {
                    begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
                } ],
                relevance: 0
            }, s = {
                className: "meta",
                begin: /#\s*[a-z]+\b/,
                end: /$/,
                keywords: {
                    keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
                },
                contains: [ {
                    begin: /\\\n/,
                    relevance: 0
                }, e.inherit(o, {
                    className: "string"
                }), {
                    className: "string",
                    begin: /<.*?>/
                }, n, e.C_BLOCK_COMMENT_MODE ]
            }, c = {
                className: "title",
                begin: t.optional(u) + e.IDENT_RE,
                relevance: 0
            }, d = t.optional(u) + e.IDENT_RE + "\\s*\\(", p = {
                keyword: [ "asm", "auto", "break", "case", "continue", "default", "do", "else", "enum", "extern", "for", "fortran", "goto", "if", "inline", "register", "restrict", "return", "sizeof", "struct", "switch", "typedef", "union", "volatile", "while", "_Alignas", "_Alignof", "_Atomic", "_Generic", "_Noreturn", "_Static_assert", "_Thread_local", "alignas", "alignof", "noreturn", "static_assert", "thread_local", "_Pragma" ],
                type: [ "float", "double", "signed", "unsigned", "int", "short", "long", "char", "void", "_Bool", "_Complex", "_Imaginary", "_Decimal32", "_Decimal64", "_Decimal128", "const", "static", "complex", "bool", "imaginary" ],
                literal: "true false NULL",
                built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr"
            }, f = [ s, i, n, e.C_BLOCK_COMMENT_MODE, l, o ], D = {
                variants: [ {
                    begin: /=/,
                    end: /;/
                }, {
                    begin: /\(/,
                    end: /\)/
                }, {
                    beginKeywords: "new throw return else",
                    end: /;/
                } ],
                keywords: p,
                contains: f.concat([ {
                    begin: /\(/,
                    end: /\)/,
                    keywords: p,
                    contains: f.concat([ "self" ]),
                    relevance: 0
                } ]),
                relevance: 0
            }, g = {
                begin: "(" + a + "[\\*&\\s]+)+" + d,
                returnBegin: !0,
                end: /[{;=]/,
                excludeEnd: !0,
                keywords: p,
                illegal: /[^\w\s\*&:<>.]/,
                contains: [ {
                    begin: "decltype\\(auto\\)",
                    keywords: p,
                    relevance: 0
                }, {
                    begin: d,
                    returnBegin: !0,
                    contains: [ e.inherit(c, {
                        className: "title.function"
                    }) ],
                    relevance: 0
                }, {
                    relevance: 0,
                    match: /,/
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    keywords: p,
                    relevance: 0,
                    contains: [ n, e.C_BLOCK_COMMENT_MODE, o, l, i, {
                        begin: /\(/,
                        end: /\)/,
                        keywords: p,
                        relevance: 0,
                        contains: [ "self", n, e.C_BLOCK_COMMENT_MODE, o, l, i ]
                    } ]
                }, i, n, e.C_BLOCK_COMMENT_MODE, s ]
            };
            return {
                name: "C",
                aliases: [ "h" ],
                keywords: p,
                disableAutodetect: !0,
                illegal: "</",
                contains: [].concat(D, g, f, [ s, {
                    begin: e.IDENT_RE + "::",
                    keywords: p
                }, {
                    className: "class",
                    beginKeywords: "enum class struct union",
                    end: /[{;:<>=]/,
                    contains: [ {
                        beginKeywords: "final class struct"
                    }, e.TITLE_MODE ]
                } ]),
                exports: {
                    preprocessor: s,
                    strings: o,
                    keywords: p
                }
            };
        })), Ju.registerLanguage("cpp", (function(e) {
            var t = e.regex, n = e.COMMENT("//", "$", {
                contains: [ {
                    begin: /\\\n/
                } ]
            }), u = "[a-zA-Z_]\\w*::", a = "(?!struct)(decltype\\(auto\\)|" + t.optional(u) + "[a-zA-Z_]\\w*" + t.optional("<[^<>]+>") + ")", i = {
                className: "type",
                begin: "\\b[a-z\\d_]*_t\\b"
            }, o = {
                className: "string",
                variants: [ {
                    begin: '(u8?|U|L)?"',
                    end: '"',
                    illegal: "\\n",
                    contains: [ e.BACKSLASH_ESCAPE ]
                }, {
                    begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
                    end: "'",
                    illegal: "."
                }, e.END_SAME_AS_BEGIN({
                    begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
                    end: /\)([^()\\ ]{0,16})"/
                }) ]
            }, l = {
                className: "number",
                variants: [ {
                    begin: "\\b(0b[01']+)"
                }, {
                    begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
                }, {
                    begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
                } ],
                relevance: 0
            }, s = {
                className: "meta",
                begin: /#\s*[a-z]+\b/,
                end: /$/,
                keywords: {
                    keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
                },
                contains: [ {
                    begin: /\\\n/,
                    relevance: 0
                }, e.inherit(o, {
                    className: "string"
                }), {
                    className: "string",
                    begin: /<.*?>/
                }, n, e.C_BLOCK_COMMENT_MODE ]
            }, c = {
                className: "title",
                begin: t.optional(u) + e.IDENT_RE,
                relevance: 0
            }, d = t.optional(u) + e.IDENT_RE + "\\s*\\(", p = {
                type: [ "bool", "char", "char16_t", "char32_t", "char8_t", "double", "float", "int", "long", "short", "void", "wchar_t", "unsigned", "signed", "const", "static" ],
                keyword: [ "alignas", "alignof", "and", "and_eq", "asm", "atomic_cancel", "atomic_commit", "atomic_noexcept", "auto", "bitand", "bitor", "break", "case", "catch", "class", "co_await", "co_return", "co_yield", "compl", "concept", "const_cast|10", "consteval", "constexpr", "constinit", "continue", "decltype", "default", "delete", "do", "dynamic_cast|10", "else", "enum", "explicit", "export", "extern", "false", "final", "for", "friend", "goto", "if", "import", "inline", "module", "mutable", "namespace", "new", "noexcept", "not", "not_eq", "nullptr", "operator", "or", "or_eq", "override", "private", "protected", "public", "reflexpr", "register", "reinterpret_cast|10", "requires", "return", "sizeof", "static_assert", "static_cast|10", "struct", "switch", "synchronized", "template", "this", "thread_local", "throw", "transaction_safe", "transaction_safe_dynamic", "true", "try", "typedef", "typeid", "typename", "union", "using", "virtual", "volatile", "while", "xor", "xor_eq" ],
                literal: [ "NULL", "false", "nullopt", "nullptr", "true" ],
                built_in: [ "_Pragma" ],
                _type_hints: [ "any", "auto_ptr", "barrier", "binary_semaphore", "bitset", "complex", "condition_variable", "condition_variable_any", "counting_semaphore", "deque", "false_type", "future", "imaginary", "initializer_list", "istringstream", "jthread", "latch", "lock_guard", "multimap", "multiset", "mutex", "optional", "ostringstream", "packaged_task", "pair", "promise", "priority_queue", "queue", "recursive_mutex", "recursive_timed_mutex", "scoped_lock", "set", "shared_future", "shared_lock", "shared_mutex", "shared_timed_mutex", "shared_ptr", "stack", "string_view", "stringstream", "timed_mutex", "thread", "true_type", "tuple", "unique_lock", "unique_ptr", "unordered_map", "unordered_multimap", "unordered_multiset", "unordered_set", "variant", "vector", "weak_ptr", "wstring", "wstring_view" ]
            }, f = {
                className: "function.dispatch",
                relevance: 0,
                keywords: {
                    _hint: [ "abort", "abs", "acos", "apply", "as_const", "asin", "atan", "atan2", "calloc", "ceil", "cerr", "cin", "clog", "cos", "cosh", "cout", "declval", "endl", "exchange", "exit", "exp", "fabs", "floor", "fmod", "forward", "fprintf", "fputs", "free", "frexp", "fscanf", "future", "invoke", "isalnum", "isalpha", "iscntrl", "isdigit", "isgraph", "islower", "isprint", "ispunct", "isspace", "isupper", "isxdigit", "labs", "launder", "ldexp", "log", "log10", "make_pair", "make_shared", "make_shared_for_overwrite", "make_tuple", "make_unique", "malloc", "memchr", "memcmp", "memcpy", "memset", "modf", "move", "pow", "printf", "putchar", "puts", "realloc", "scanf", "sin", "sinh", "snprintf", "sprintf", "sqrt", "sscanf", "std", "stderr", "stdin", "stdout", "strcat", "strchr", "strcmp", "strcpy", "strcspn", "strlen", "strncat", "strncmp", "strncpy", "strpbrk", "strrchr", "strspn", "strstr", "swap", "tan", "tanh", "terminate", "to_underlying", "tolower", "toupper", "vfprintf", "visit", "vprintf", "vsprintf" ]
                },
                begin: t.concat(/\b/, /(?!decltype)/, /(?!if)/, /(?!for)/, /(?!switch)/, /(?!while)/, e.IDENT_RE, t.lookahead(/(<[^<>]+>|)\s*\(/))
            }, D = [ f, s, i, n, e.C_BLOCK_COMMENT_MODE, l, o ], g = {
                variants: [ {
                    begin: /=/,
                    end: /;/
                }, {
                    begin: /\(/,
                    end: /\)/
                }, {
                    beginKeywords: "new throw return else",
                    end: /;/
                } ],
                keywords: p,
                contains: D.concat([ {
                    begin: /\(/,
                    end: /\)/,
                    keywords: p,
                    contains: D.concat([ "self" ]),
                    relevance: 0
                } ]),
                relevance: 0
            }, h = {
                className: "function",
                begin: "(" + a + "[\\*&\\s]+)+" + d,
                returnBegin: !0,
                end: /[{;=]/,
                excludeEnd: !0,
                keywords: p,
                illegal: /[^\w\s\*&:<>.]/,
                contains: [ {
                    begin: "decltype\\(auto\\)",
                    keywords: p,
                    relevance: 0
                }, {
                    begin: d,
                    returnBegin: !0,
                    contains: [ c ],
                    relevance: 0
                }, {
                    begin: /::/,
                    relevance: 0
                }, {
                    begin: /:/,
                    endsWithParent: !0,
                    contains: [ o, l ]
                }, {
                    relevance: 0,
                    match: /,/
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    keywords: p,
                    relevance: 0,
                    contains: [ n, e.C_BLOCK_COMMENT_MODE, o, l, i, {
                        begin: /\(/,
                        end: /\)/,
                        keywords: p,
                        relevance: 0,
                        contains: [ "self", n, e.C_BLOCK_COMMENT_MODE, o, l, i ]
                    } ]
                }, i, n, e.C_BLOCK_COMMENT_MODE, s ]
            };
            return {
                name: "C++",
                aliases: [ "cc", "c++", "h++", "hpp", "hh", "hxx", "cxx" ],
                keywords: p,
                illegal: "</",
                classNameAliases: {
                    "function.dispatch": "built_in"
                },
                contains: [].concat(g, h, f, D, [ s, {
                    begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function)\\s*<(?!<)",
                    end: ">",
                    keywords: p,
                    contains: [ "self", i ]
                }, {
                    begin: e.IDENT_RE + "::",
                    keywords: p
                }, {
                    match: [ /\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/, /\s+/, /\w+/ ],
                    className: {
                        1: "keyword",
                        3: "title.class"
                    }
                } ])
            };
        })), Ju.registerLanguage("csharp", (function(e) {
            var t = {
                keyword: [ "abstract", "as", "base", "break", "case", "catch", "class", "const", "continue", "do", "else", "event", "explicit", "extern", "finally", "fixed", "for", "foreach", "goto", "if", "implicit", "in", "interface", "internal", "is", "lock", "namespace", "new", "operator", "out", "override", "params", "private", "protected", "public", "readonly", "record", "ref", "return", "scoped", "sealed", "sizeof", "stackalloc", "static", "struct", "switch", "this", "throw", "try", "typeof", "unchecked", "unsafe", "using", "virtual", "void", "volatile", "while" ].concat([ "add", "alias", "and", "ascending", "async", "await", "by", "descending", "equals", "from", "get", "global", "group", "init", "into", "join", "let", "nameof", "not", "notnull", "on", "or", "orderby", "partial", "remove", "select", "set", "unmanaged", "value|0", "var", "when", "where", "with", "yield" ]),
                built_in: [ "bool", "byte", "char", "decimal", "delegate", "double", "dynamic", "enum", "float", "int", "long", "nint", "nuint", "object", "sbyte", "short", "string", "ulong", "uint", "ushort" ],
                literal: [ "default", "false", "null", "true" ]
            }, n = e.inherit(e.TITLE_MODE, {
                begin: "[a-zA-Z](\\.?\\w)*"
            }), r = {
                className: "number",
                variants: [ {
                    begin: "\\b(0b[01']+)"
                }, {
                    begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
                }, {
                    begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
                } ],
                relevance: 0
            }, u = {
                className: "string",
                begin: '@"',
                end: '"',
                contains: [ {
                    begin: '""'
                } ]
            }, a = e.inherit(u, {
                illegal: /\n/
            }), i = {
                className: "subst",
                begin: /\{/,
                end: /\}/,
                keywords: t
            }, o = e.inherit(i, {
                illegal: /\n/
            }), l = {
                className: "string",
                begin: /\$"/,
                end: '"',
                illegal: /\n/,
                contains: [ {
                    begin: /\{\{/
                }, {
                    begin: /\}\}/
                }, e.BACKSLASH_ESCAPE, o ]
            }, s = {
                className: "string",
                begin: /\$@"/,
                end: '"',
                contains: [ {
                    begin: /\{\{/
                }, {
                    begin: /\}\}/
                }, {
                    begin: '""'
                }, i ]
            }, c = e.inherit(s, {
                illegal: /\n/,
                contains: [ {
                    begin: /\{\{/
                }, {
                    begin: /\}\}/
                }, {
                    begin: '""'
                }, o ]
            });
            i.contains = [ s, l, u, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, r, e.C_BLOCK_COMMENT_MODE ], 
            o.contains = [ c, l, a, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, r, e.inherit(e.C_BLOCK_COMMENT_MODE, {
                illegal: /\n/
            }) ];
            var d = {
                variants: [ s, l, u, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE ]
            }, p = {
                begin: "<",
                end: ">",
                contains: [ {
                    beginKeywords: "in out"
                }, n ]
            }, f = e.IDENT_RE + "(<" + e.IDENT_RE + "(\\s*,\\s*" + e.IDENT_RE + ")*>)?(\\[\\])?", D = {
                begin: "@" + e.IDENT_RE,
                relevance: 0
            };
            return {
                name: "C#",
                aliases: [ "cs", "c#" ],
                keywords: t,
                illegal: /::/,
                contains: [ e.COMMENT("///", "$", {
                    returnBegin: !0,
                    contains: [ {
                        className: "doctag",
                        variants: [ {
                            begin: "///",
                            relevance: 0
                        }, {
                            begin: "\x3c!--|--\x3e"
                        }, {
                            begin: "</?",
                            end: ">"
                        } ]
                    } ]
                }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                    className: "meta",
                    begin: "#",
                    end: "$",
                    keywords: {
                        keyword: "if else elif endif define undef warning error line region endregion pragma checksum"
                    }
                }, d, r, {
                    beginKeywords: "class interface",
                    relevance: 0,
                    end: /[{;=]/,
                    illegal: /[^\s:,]/,
                    contains: [ {
                        beginKeywords: "where class"
                    }, n, p, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE ]
                }, {
                    beginKeywords: "namespace",
                    relevance: 0,
                    end: /[{;=]/,
                    illegal: /[^\s:]/,
                    contains: [ n, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE ]
                }, {
                    beginKeywords: "record",
                    relevance: 0,
                    end: /[{;=]/,
                    illegal: /[^\s:]/,
                    contains: [ n, p, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE ]
                }, {
                    className: "meta",
                    begin: "^\\s*\\[(?=[\\w])",
                    excludeBegin: !0,
                    end: "\\]",
                    excludeEnd: !0,
                    contains: [ {
                        className: "string",
                        begin: /"/,
                        end: /"/
                    } ]
                }, {
                    beginKeywords: "new return throw await else",
                    relevance: 0
                }, {
                    className: "function",
                    begin: "(" + f + "\\s+)+" + e.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
                    returnBegin: !0,
                    end: /\s*[{;=]/,
                    excludeEnd: !0,
                    keywords: t,
                    contains: [ {
                        beginKeywords: [ "public", "private", "protected", "static", "internal", "protected", "abstract", "async", "extern", "override", "unsafe", "virtual", "new", "sealed", "partial" ].join(" "),
                        relevance: 0
                    }, {
                        begin: e.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
                        returnBegin: !0,
                        contains: [ e.TITLE_MODE, p ],
                        relevance: 0
                    }, {
                        match: /\(\)/
                    }, {
                        className: "params",
                        begin: /\(/,
                        end: /\)/,
                        excludeBegin: !0,
                        excludeEnd: !0,
                        keywords: t,
                        relevance: 0,
                        contains: [ d, r, e.C_BLOCK_COMMENT_MODE ]
                    }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE ]
                }, D ]
            };
        })), Ju.registerLanguage("css", (function(e) {
            var t = e.regex, n = function(e) {
                return {
                    IMPORTANT: {
                        scope: "meta",
                        begin: "!important"
                    },
                    BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE,
                    HEXCOLOR: {
                        scope: "number",
                        begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
                    },
                    FUNCTION_DISPATCH: {
                        className: "built_in",
                        begin: /[\w-]+(?=\()/
                    },
                    ATTRIBUTE_SELECTOR_MODE: {
                        scope: "selector-attr",
                        begin: /\[/,
                        end: /\]/,
                        illegal: "$",
                        contains: [ e.APOS_STRING_MODE, e.QUOTE_STRING_MODE ]
                    },
                    CSS_NUMBER_MODE: {
                        scope: "number",
                        begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
                        relevance: 0
                    },
                    CSS_VARIABLE: {
                        className: "attr",
                        begin: /--[A-Za-z][A-Za-z0-9_-]*/
                    }
                };
            }(e), r = [ e.APOS_STRING_MODE, e.QUOTE_STRING_MODE ];
            return {
                name: "CSS",
                case_insensitive: !0,
                illegal: /[=|'\$]/,
                keywords: {
                    keyframePosition: "from to"
                },
                classNameAliases: {
                    keyframePosition: "selector-tag"
                },
                contains: [ n.BLOCK_COMMENT, {
                    begin: /-(webkit|moz|ms|o)-(?=[a-z])/
                }, n.CSS_NUMBER_MODE, {
                    className: "selector-id",
                    begin: /#[A-Za-z0-9_-]+/,
                    relevance: 0
                }, {
                    className: "selector-class",
                    begin: "\\.[a-zA-Z-][a-zA-Z0-9_-]*",
                    relevance: 0
                }, n.ATTRIBUTE_SELECTOR_MODE, {
                    className: "selector-pseudo",
                    variants: [ {
                        begin: ":(" + Rr.join("|") + ")"
                    }, {
                        begin: ":(:)?(" + Pr.join("|") + ")"
                    } ]
                }, n.CSS_VARIABLE, {
                    className: "attribute",
                    begin: "\\b(" + jr.join("|") + ")\\b"
                }, {
                    begin: /:/,
                    end: /[;}{]/,
                    contains: [ n.BLOCK_COMMENT, n.HEXCOLOR, n.IMPORTANT, n.CSS_NUMBER_MODE ].concat(r, [ {
                        begin: /(url|data-uri)\(/,
                        end: /\)/,
                        relevance: 0,
                        keywords: {
                            built_in: "url data-uri"
                        },
                        contains: [].concat(r, [ {
                            className: "string",
                            begin: /[^)]/,
                            endsWithParent: !0,
                            excludeEnd: !0
                        } ])
                    }, n.FUNCTION_DISPATCH ])
                }, {
                    begin: t.lookahead(/@/),
                    end: "[{;]",
                    relevance: 0,
                    illegal: /:/,
                    contains: [ {
                        className: "keyword",
                        begin: /@-?\w[\w]*(-\w+)*/
                    }, {
                        begin: /\s/,
                        endsWithParent: !0,
                        excludeEnd: !0,
                        relevance: 0,
                        keywords: {
                            $pattern: /[a-z-]+/,
                            keyword: "and or not only",
                            attribute: Ir.join(" ")
                        },
                        contains: [ {
                            begin: /[a-z-]+(?=:)/,
                            className: "attribute"
                        } ].concat(r, [ n.CSS_NUMBER_MODE ])
                    } ]
                }, {
                    className: "selector-tag",
                    begin: "\\b(" + Lr.join("|") + ")\\b"
                } ]
            };
        })), Ju.registerLanguage("diff", (function(e) {
            var t = e.regex;
            return {
                name: "Diff",
                aliases: [ "patch" ],
                contains: [ {
                    className: "meta",
                    relevance: 10,
                    match: t.either(/^@@ +-\d+,\d+ +\+\d+,\d+ +@@/, /^\*\*\* +\d+,\d+ +\*\*\*\*$/, /^--- +\d+,\d+ +----$/)
                }, {
                    className: "comment",
                    variants: [ {
                        begin: t.either(/Index: /, /^index/, /={3,}/, /^-{3}/, /^\*{3} /, /^\+{3}/, /^diff --git/),
                        end: /$/
                    }, {
                        match: /^\*{15}$/
                    } ]
                }, {
                    className: "addition",
                    begin: /^\+/,
                    end: /$/
                }, {
                    className: "deletion",
                    begin: /^-/,
                    end: /$/
                }, {
                    className: "addition",
                    begin: /^!/,
                    end: /$/
                } ]
            };
        })), Ju.registerLanguage("go", (function(e) {
            var t = {
                keyword: [ "break", "case", "chan", "const", "continue", "default", "defer", "else", "fallthrough", "for", "func", "go", "goto", "if", "import", "interface", "map", "package", "range", "return", "select", "struct", "switch", "type", "var" ],
                type: [ "bool", "byte", "complex64", "complex128", "error", "float32", "float64", "int8", "int16", "int32", "int64", "string", "uint8", "uint16", "uint32", "uint64", "int", "uint", "uintptr", "rune" ],
                literal: [ "true", "false", "iota", "nil" ],
                built_in: [ "append", "cap", "close", "complex", "copy", "imag", "len", "make", "new", "panic", "print", "println", "real", "recover", "delete" ]
            };
            return {
                name: "Go",
                aliases: [ "golang" ],
                keywords: t,
                illegal: "</",
                contains: [ e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                    className: "string",
                    variants: [ e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, {
                        begin: "`",
                        end: "`"
                    } ]
                }, {
                    className: "number",
                    variants: [ {
                        begin: e.C_NUMBER_RE + "[i]",
                        relevance: 1
                    }, e.C_NUMBER_MODE ]
                }, {
                    begin: /:=/
                }, {
                    className: "function",
                    beginKeywords: "func",
                    end: "\\s*(\\{|$)",
                    excludeEnd: !0,
                    contains: [ e.TITLE_MODE, {
                        className: "params",
                        begin: /\(/,
                        end: /\)/,
                        endsParent: !0,
                        keywords: t,
                        illegal: /["']/
                    } ]
                } ]
            };
        })), Ju.registerLanguage("graphql", (function(e) {
            var t = e.regex;
            return {
                name: "GraphQL",
                aliases: [ "gql" ],
                case_insensitive: !0,
                disableAutodetect: !1,
                keywords: {
                    keyword: [ "query", "mutation", "subscription", "type", "input", "schema", "directive", "interface", "union", "scalar", "fragment", "enum", "on" ],
                    literal: [ "true", "false", "null" ]
                },
                contains: [ e.HASH_COMMENT_MODE, e.QUOTE_STRING_MODE, e.NUMBER_MODE, {
                    scope: "punctuation",
                    match: /[.]{3}/,
                    relevance: 0
                }, {
                    scope: "punctuation",
                    begin: /[\!\(\)\:\=\[\]\{\|\}]{1}/,
                    relevance: 0
                }, {
                    scope: "variable",
                    begin: /\$/,
                    end: /\W/,
                    excludeEnd: !0,
                    relevance: 0
                }, {
                    scope: "meta",
                    match: /@\w+/,
                    excludeEnd: !0
                }, {
                    scope: "symbol",
                    begin: t.concat(/[_A-Za-z][_0-9A-Za-z]*/, t.lookahead(/\s*:/)),
                    relevance: 0
                } ],
                illegal: [ /[;<']/, /BEGIN/ ]
            };
        })), Ju.registerLanguage("ini", (function(e) {
            var t = e.regex, n = {
                className: "number",
                relevance: 0,
                variants: [ {
                    begin: /([+-]+)?[\d]+_[\d_]+/
                }, {
                    begin: e.NUMBER_RE
                } ]
            }, r = e.COMMENT();
            r.variants = [ {
                begin: /;/,
                end: /$/
            }, {
                begin: /#/,
                end: /$/
            } ];
            var u = {
                className: "variable",
                variants: [ {
                    begin: /\$[\w\d"][\w\d_]*/
                }, {
                    begin: /\$\{(.*?)\}/
                } ]
            }, a = {
                className: "literal",
                begin: /\bon|off|true|false|yes|no\b/
            }, i = {
                className: "string",
                contains: [ e.BACKSLASH_ESCAPE ],
                variants: [ {
                    begin: "'''",
                    end: "'''",
                    relevance: 10
                }, {
                    begin: '"""',
                    end: '"""',
                    relevance: 10
                }, {
                    begin: '"',
                    end: '"'
                }, {
                    begin: "'",
                    end: "'"
                } ]
            }, o = {
                begin: /\[/,
                end: /\]/,
                contains: [ r, a, u, i, n, "self" ],
                relevance: 0
            }, l = t.either(/[A-Za-z0-9_-]+/, /"(\\"|[^"])*"/, /'[^']*'/);
            return {
                name: "TOML, also INI",
                aliases: [ "toml" ],
                case_insensitive: !0,
                illegal: /\S/,
                contains: [ r, {
                    className: "section",
                    begin: /\[+/,
                    end: /\]+/
                }, {
                    begin: t.concat(l, "(\\s*\\.\\s*", l, ")*", t.lookahead(/\s*=\s*[^#\s]/)),
                    className: "attr",
                    starts: {
                        end: /$/,
                        contains: [ r, o, a, u, i, n ]
                    }
                } ]
            };
        })), Ju.registerLanguage("java", (function(e) {
            var t = e.regex, n = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*", r = n + $r("(?:<" + n + "~~~(?:\\s*,\\s*" + n + "~~~)*>)?", /~~~/g, 2), u = {
                keyword: [ "synchronized", "abstract", "private", "var", "static", "if", "const ", "for", "while", "strictfp", "finally", "protected", "import", "native", "final", "void", "enum", "else", "break", "transient", "catch", "instanceof", "volatile", "case", "assert", "package", "default", "public", "try", "switch", "continue", "throws", "protected", "public", "private", "module", "requires", "exports", "do", "sealed", "yield", "permits" ],
                literal: [ "false", "true", "null" ],
                type: [ "char", "boolean", "long", "float", "int", "byte", "short", "double" ],
                built_in: [ "super", "this" ]
            }, a = {
                className: "meta",
                begin: "@" + n,
                contains: [ {
                    begin: /\(/,
                    end: /\)/,
                    contains: [ "self" ]
                } ]
            }, i = {
                className: "params",
                begin: /\(/,
                end: /\)/,
                keywords: u,
                relevance: 0,
                contains: [ e.C_BLOCK_COMMENT_MODE ],
                endsParent: !0
            };
            return {
                name: "Java",
                aliases: [ "jsp" ],
                keywords: u,
                illegal: /<\/|#/,
                contains: [ e.COMMENT("/\\*\\*", "\\*/", {
                    relevance: 0,
                    contains: [ {
                        begin: /\w+@/,
                        relevance: 0
                    }, {
                        className: "doctag",
                        begin: "@[A-Za-z]+"
                    } ]
                }), {
                    begin: /import java\.[a-z]+\./,
                    keywords: "import",
                    relevance: 2
                }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                    begin: /"""/,
                    end: /"""/,
                    className: "string",
                    contains: [ e.BACKSLASH_ESCAPE ]
                }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
                    match: [ /\b(?:class|interface|enum|extends|implements|new)/, /\s+/, n ],
                    className: {
                        1: "keyword",
                        3: "title.class"
                    }
                }, {
                    match: /non-sealed/,
                    scope: "keyword"
                }, {
                    begin: [ t.concat(/(?!else)/, n), /\s+/, n, /\s+/, /=(?!=)/ ],
                    className: {
                        1: "type",
                        3: "variable",
                        5: "operator"
                    }
                }, {
                    begin: [ /record/, /\s+/, n ],
                    className: {
                        1: "keyword",
                        3: "title.class"
                    },
                    contains: [ i, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE ]
                }, {
                    beginKeywords: "new throw return else",
                    relevance: 0
                }, {
                    begin: [ "(?:" + r + "\\s+)", e.UNDERSCORE_IDENT_RE, /\s*(?=\()/ ],
                    className: {
                        2: "title.function"
                    },
                    keywords: u,
                    contains: [ {
                        className: "params",
                        begin: /\(/,
                        end: /\)/,
                        keywords: u,
                        relevance: 0,
                        contains: [ a, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, Hr, e.C_BLOCK_COMMENT_MODE ]
                    }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE ]
                }, Hr, a ]
            };
        })), Ju.registerLanguage("javascript", (function(e) {
            var t = e.regex, n = Kr, a = {
                begin: /<[A-Za-z0-9\\._:-]+/,
                end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
                isTrulyOpeningTag: function(e, t) {
                    var n = e[0].length + e.index, r = e.input[n];
                    if ("<" !== r && "," !== r) {
                        var u;
                        ">" === r && (function(e, t) {
                            var n = t.after, r = "</" + e[0].slice(1);
                            return -1 !== e.input.indexOf(r, n);
                        }(e, {
                            after: n
                        }) || t.ignoreMatch());
                        var a = e.input.substring(n);
                        (a.match(/^\s*=/) || (u = a.match(/^\s+extends\s+/)) && 0 === u.index) && t.ignoreMatch();
                    } else t.ignoreMatch();
                }
            }, i = {
                $pattern: Kr,
                keyword: Vr,
                literal: Gr,
                built_in: Yr,
                "variable.language": Xr
            }, o = "[0-9](_?[0-9])*", l = "\\.(".concat(o, ")"), s = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", c = {
                className: "number",
                variants: [ {
                    begin: "(\\b(".concat(s, ")((").concat(l, ")|\\.)?|(").concat(l, "))") + "[eE][+-]?(".concat(o, ")\\b")
                }, {
                    begin: "\\b(".concat(s, ")\\b((").concat(l, ")\\b|\\.)?|(").concat(l, ")\\b")
                }, {
                    begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
                }, {
                    begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
                }, {
                    begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
                }, {
                    begin: "\\b0[oO][0-7](_?[0-7])*n?\\b"
                }, {
                    begin: "\\b0[0-7]+n?\\b"
                } ],
                relevance: 0
            }, d = {
                className: "subst",
                begin: "\\$\\{",
                end: "\\}",
                keywords: i,
                contains: []
            }, p = {
                begin: "html`",
                end: "",
                starts: {
                    end: "`",
                    returnEnd: !1,
                    contains: [ e.BACKSLASH_ESCAPE, d ],
                    subLanguage: "xml"
                }
            }, f = {
                begin: "css`",
                end: "",
                starts: {
                    end: "`",
                    returnEnd: !1,
                    contains: [ e.BACKSLASH_ESCAPE, d ],
                    subLanguage: "css"
                }
            }, D = {
                className: "string",
                begin: "`",
                end: "`",
                contains: [ e.BACKSLASH_ESCAPE, d ]
            }, g = {
                className: "comment",
                variants: [ e.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
                    relevance: 0,
                    contains: [ {
                        begin: "(?=@[A-Za-z]+)",
                        relevance: 0,
                        contains: [ {
                            className: "doctag",
                            begin: "@[A-Za-z]+"
                        }, {
                            className: "type",
                            begin: "\\{",
                            end: "\\}",
                            excludeEnd: !0,
                            excludeBegin: !0,
                            relevance: 0
                        }, {
                            className: "variable",
                            begin: n + "(?=\\s*(-)|$)",
                            endsParent: !0,
                            relevance: 0
                        }, {
                            begin: /(?=[^\n])\s/,
                            relevance: 0
                        } ]
                    } ]
                }), e.C_BLOCK_COMMENT_MODE, e.C_LINE_COMMENT_MODE ]
            }, h = [ e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, p, f, D, {
                match: /\$\d+/
            }, c ];
            d.contains = h.concat({
                begin: /\{/,
                end: /\}/,
                keywords: i,
                contains: [ "self" ].concat(h)
            });
            var m = [].concat(g, d.contains), b = m.concat([ {
                begin: /\(/,
                end: /\)/,
                keywords: i,
                contains: [ "self" ].concat(m)
            } ]), v = {
                className: "params",
                begin: /\(/,
                end: /\)/,
                excludeBegin: !0,
                excludeEnd: !0,
                keywords: i,
                contains: b
            }, E = {
                variants: [ {
                    match: [ /class/, /\s+/, n, /\s+/, /extends/, /\s+/, t.concat(n, "(", t.concat(/\./, n), ")*") ],
                    scope: {
                        1: "keyword",
                        3: "title.class",
                        5: "keyword",
                        7: "title.class.inherited"
                    }
                }, {
                    match: [ /class/, /\s+/, n ],
                    scope: {
                        1: "keyword",
                        3: "title.class"
                    }
                } ]
            }, y = {
                relevance: 0,
                match: t.either(/\bJSON/, /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/, /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/, /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
                className: "title.class",
                keywords: {
                    _: [].concat(Wr, Qr)
                }
            }, _ = {
                variants: [ {
                    match: [ /function/, /\s+/, n, /(?=\s*\()/ ]
                }, {
                    match: [ /function/, /\s*(?=\()/ ]
                } ],
                className: {
                    1: "keyword",
                    3: "title.function"
                },
                label: "func.def",
                contains: [ v ],
                illegal: /%/
            }, C = {
                match: t.concat(/\b/, function(e) {
                    return t.concat("(?!", e.join("|"), ")");
                }([].concat(Zr, [ "super", "import" ])), n, t.lookahead(/\(/)),
                className: "title.function",
                relevance: 0
            }, F = {
                begin: t.concat(/\./, t.lookahead(t.concat(n, /(?![0-9A-Za-z$_(])/))),
                end: n,
                excludeBegin: !0,
                keywords: "prototype",
                className: "property",
                relevance: 0
            }, A = {
                match: [ /get|set/, /\s+/, n, /(?=\()/ ],
                className: {
                    1: "keyword",
                    3: "title.function"
                },
                contains: [ {
                    begin: /\(\)/
                }, v ]
            }, x = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", w = {
                match: [ /const|var|let/, /\s+/, n, /\s*/, /=\s*/, /(async\s*)?/, t.lookahead(x) ],
                keywords: "async",
                className: {
                    1: "keyword",
                    3: "title.function"
                },
                contains: [ v ]
            };
            return {
                name: "Javascript",
                aliases: [ "js", "jsx", "mjs", "cjs" ],
                keywords: i,
                exports: {
                    PARAMS_CONTAINS: b,
                    CLASS_REFERENCE: y
                },
                illegal: /#(?![$_A-z])/,
                contains: [ e.SHEBANG({
                    label: "shebang",
                    binary: "node",
                    relevance: 5
                }), {
                    label: "use_strict",
                    className: "meta",
                    relevance: 10,
                    begin: /^\s*['"]use (strict|asm)['"]/
                }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, p, f, D, g, {
                    match: /\$\d+/
                }, c, y, {
                    className: "attr",
                    begin: n + t.lookahead(":"),
                    relevance: 0
                }, w, {
                    begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
                    keywords: "return throw case",
                    relevance: 0,
                    contains: [ g, e.REGEXP_MODE, {
                        className: "function",
                        begin: x,
                        returnBegin: !0,
                        end: "\\s*=>",
                        contains: [ {
                            className: "params",
                            variants: [ {
                                begin: e.UNDERSCORE_IDENT_RE,
                                relevance: 0
                            }, {
                                className: null,
                                begin: /\(\s*\)/,
                                skip: !0
                            }, {
                                begin: /\(/,
                                end: /\)/,
                                excludeBegin: !0,
                                excludeEnd: !0,
                                keywords: i,
                                contains: b
                            } ]
                        } ]
                    }, {
                        begin: /,/,
                        relevance: 0
                    }, {
                        match: /\s+/,
                        relevance: 0
                    }, {
                        variants: [ {
                            begin: "<>",
                            end: "</>"
                        }, {
                            match: /<[A-Za-z0-9\\._:-]+\s*\/>/
                        }, {
                            begin: a.begin,
                            "on:begin": a.isTrulyOpeningTag,
                            end: a.end
                        } ],
                        subLanguage: "xml",
                        contains: [ {
                            begin: a.begin,
                            end: a.end,
                            skip: !0,
                            contains: [ "self" ]
                        } ]
                    } ]
                }, _, {
                    beginKeywords: "while if switch catch for"
                }, {
                    begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
                    returnBegin: !0,
                    label: "func.def",
                    contains: [ v, e.inherit(e.TITLE_MODE, {
                        begin: n,
                        className: "title.function"
                    }) ]
                }, {
                    match: /\.\.\./,
                    relevance: 0
                }, F, {
                    match: "\\$" + n,
                    relevance: 0
                }, {
                    match: [ /\bconstructor(?=\s*\()/ ],
                    className: {
                        1: "title.function"
                    },
                    contains: [ v ]
                }, C, {
                    relevance: 0,
                    match: /\b[A-Z][A-Z_0-9]+\b/,
                    className: "variable.constant"
                }, E, A, {
                    match: /\$[(.]/
                } ]
            };
        })), Ju.registerLanguage("json", (function(e) {
            var t = [ "true", "false", "null" ], n = {
                scope: "literal",
                beginKeywords: t.join(" ")
            };
            return {
                name: "JSON",
                keywords: {
                    literal: t
                },
                contains: [ {
                    className: "attr",
                    begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
                    relevance: 1.01
                }, {
                    match: /[{}[\],:]/,
                    className: "punctuation",
                    relevance: 0
                }, e.QUOTE_STRING_MODE, n, e.C_NUMBER_MODE, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE ],
                illegal: "\\S"
            };
        })), Ju.registerLanguage("kotlin", (function(e) {
            var t = {
                keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",
                built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
                literal: "true false null"
            }, n = {
                className: "symbol",
                begin: e.UNDERSCORE_IDENT_RE + "@"
            }, r = {
                className: "subst",
                begin: /\$\{/,
                end: /\}/,
                contains: [ e.C_NUMBER_MODE ]
            }, u = {
                className: "variable",
                begin: "\\$" + e.UNDERSCORE_IDENT_RE
            }, a = {
                className: "string",
                variants: [ {
                    begin: '"""',
                    end: '"""(?=[^"])',
                    contains: [ u, r ]
                }, {
                    begin: "'",
                    end: "'",
                    illegal: /\n/,
                    contains: [ e.BACKSLASH_ESCAPE ]
                }, {
                    begin: '"',
                    end: '"',
                    illegal: /\n/,
                    contains: [ e.BACKSLASH_ESCAPE, u, r ]
                } ]
            };
            r.contains.push(a);
            var i = {
                className: "meta",
                begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + e.UNDERSCORE_IDENT_RE + ")?"
            }, o = {
                className: "meta",
                begin: "@" + e.UNDERSCORE_IDENT_RE,
                contains: [ {
                    begin: /\(/,
                    end: /\)/,
                    contains: [ e.inherit(a, {
                        className: "string"
                    }), "self" ]
                } ]
            }, l = nu, s = e.COMMENT("/\\*", "\\*/", {
                contains: [ e.C_BLOCK_COMMENT_MODE ]
            }), c = {
                variants: [ {
                    className: "type",
                    begin: e.UNDERSCORE_IDENT_RE
                }, {
                    begin: /\(/,
                    end: /\)/,
                    contains: []
                } ]
            }, d = c;
            return d.variants[1].contains = [ c ], c.variants[1].contains = [ d ], {
                name: "Kotlin",
                aliases: [ "kt", "kts" ],
                keywords: t,
                contains: [ e.COMMENT("/\\*\\*", "\\*/", {
                    relevance: 0,
                    contains: [ {
                        className: "doctag",
                        begin: "@[A-Za-z]+"
                    } ]
                }), e.C_LINE_COMMENT_MODE, s, {
                    className: "keyword",
                    begin: /\b(break|continue|return|this)\b/,
                    starts: {
                        contains: [ {
                            className: "symbol",
                            begin: /@\w+/
                        } ]
                    }
                }, n, i, o, {
                    className: "function",
                    beginKeywords: "fun",
                    end: "[(]|$",
                    returnBegin: !0,
                    excludeEnd: !0,
                    keywords: t,
                    relevance: 5,
                    contains: [ {
                        begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                        returnBegin: !0,
                        relevance: 0,
                        contains: [ e.UNDERSCORE_TITLE_MODE ]
                    }, {
                        className: "type",
                        begin: /</,
                        end: />/,
                        keywords: "reified",
                        relevance: 0
                    }, {
                        className: "params",
                        begin: /\(/,
                        end: /\)/,
                        endsParent: !0,
                        keywords: t,
                        relevance: 0,
                        contains: [ {
                            begin: /:/,
                            end: /[=,\/]/,
                            endsWithParent: !0,
                            contains: [ c, e.C_LINE_COMMENT_MODE, s ],
                            relevance: 0
                        }, e.C_LINE_COMMENT_MODE, s, i, o, a, e.C_NUMBER_MODE ]
                    }, s ]
                }, {
                    begin: [ /class|interface|trait/, /\s+/, e.UNDERSCORE_IDENT_RE ],
                    beginScope: {
                        3: "title.class"
                    },
                    keywords: "class interface trait",
                    end: /[:\{(]|$/,
                    excludeEnd: !0,
                    illegal: "extends implements",
                    contains: [ {
                        beginKeywords: "public protected internal private constructor"
                    }, e.UNDERSCORE_TITLE_MODE, {
                        className: "type",
                        begin: /</,
                        end: />/,
                        excludeBegin: !0,
                        excludeEnd: !0,
                        relevance: 0
                    }, {
                        className: "type",
                        begin: /[,:]\s*/,
                        end: /[<\(,){\s]|$/,
                        excludeBegin: !0,
                        returnEnd: !0
                    }, i, o ]
                }, a, {
                    className: "meta",
                    begin: "^#!/usr/bin/env",
                    end: "$",
                    illegal: "\n"
                }, l ]
            };
        })), Ju.registerLanguage("less", (function(e) {
            var t = function(e) {
                return {
                    IMPORTANT: {
                        scope: "meta",
                        begin: "!important"
                    },
                    BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE,
                    HEXCOLOR: {
                        scope: "number",
                        begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
                    },
                    FUNCTION_DISPATCH: {
                        className: "built_in",
                        begin: /[\w-]+(?=\()/
                    },
                    ATTRIBUTE_SELECTOR_MODE: {
                        scope: "selector-attr",
                        begin: /\[/,
                        end: /\]/,
                        illegal: "$",
                        contains: [ e.APOS_STRING_MODE, e.QUOTE_STRING_MODE ]
                    },
                    CSS_NUMBER_MODE: {
                        scope: "number",
                        begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
                        relevance: 0
                    },
                    CSS_VARIABLE: {
                        className: "attr",
                        begin: /--[A-Za-z][A-Za-z0-9_-]*/
                    }
                };
            }(e), n = lu, r = "([\\w-]+|@\\{[\\w-]+\\})", u = [], a = [], i = function(e) {
                return {
                    className: "string",
                    begin: "~?" + e + ".*?" + e
                };
            }, o = function(e, t, n) {
                return {
                    className: e,
                    begin: t,
                    relevance: n
                };
            }, l = {
                $pattern: /[a-z-]+/,
                keyword: "and or not only",
                attribute: uu.join(" ")
            }, s = {
                begin: "\\(",
                end: "\\)",
                contains: a,
                keywords: l,
                relevance: 0
            };
            a.push(e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, i("'"), i('"'), t.CSS_NUMBER_MODE, {
                begin: "(url|data-uri)\\(",
                starts: {
                    className: "string",
                    end: "[\\)\\n]",
                    excludeEnd: !0
                }
            }, t.HEXCOLOR, s, o("variable", "@@?[\\w-]+", 10), o("variable", "@\\{[\\w-]+\\}"), o("built_in", "~?`[^`]*?`"), {
                className: "attribute",
                begin: "[\\w-]+\\s*:",
                end: ":",
                returnBegin: !0,
                excludeEnd: !0
            }, t.IMPORTANT, {
                beginKeywords: "and not"
            }, t.FUNCTION_DISPATCH);
            var c = a.concat({
                begin: /\{/,
                end: /\}/,
                contains: u
            }), d = {
                beginKeywords: "when",
                endsWithParent: !0,
                contains: [ {
                    beginKeywords: "and not"
                } ].concat(a)
            }, p = {
                begin: r + "\\s*:",
                returnBegin: !0,
                end: /[;}]/,
                relevance: 0,
                contains: [ {
                    begin: /-(webkit|moz|ms|o)-/
                }, t.CSS_VARIABLE, {
                    className: "attribute",
                    begin: "\\b(" + ou.join("|") + ")\\b",
                    end: /(?=:)/,
                    starts: {
                        endsWithParent: !0,
                        illegal: "[<=$]",
                        relevance: 0,
                        contains: a
                    }
                } ]
            }, f = {
                className: "keyword",
                begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
                starts: {
                    end: "[;{}]",
                    keywords: l,
                    returnEnd: !0,
                    contains: a,
                    relevance: 0
                }
            }, D = {
                className: "variable",
                variants: [ {
                    begin: "@[\\w-]+\\s*:",
                    relevance: 15
                }, {
                    begin: "@[\\w-]+"
                } ],
                starts: {
                    end: "[;}]",
                    returnEnd: !0,
                    contains: c
                }
            }, g = {
                variants: [ {
                    begin: "[\\.#:&\\[>]",
                    end: "[;{}]"
                }, {
                    begin: r,
                    end: /\{/
                } ],
                returnBegin: !0,
                returnEnd: !0,
                illegal: "[<='$\"]",
                relevance: 0,
                contains: [ e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, d, o("keyword", "all\\b"), o("variable", "@\\{[\\w-]+\\}"), {
                    begin: "\\b(" + ru.join("|") + ")\\b",
                    className: "selector-tag"
                }, t.CSS_NUMBER_MODE, o("selector-tag", r, 0), o("selector-id", "#" + r), o("selector-class", "\\." + r, 0), o("selector-tag", "&", 0), t.ATTRIBUTE_SELECTOR_MODE, {
                    className: "selector-pseudo",
                    begin: ":(" + au.join("|") + ")"
                }, {
                    className: "selector-pseudo",
                    begin: ":(:)?(" + iu.join("|") + ")"
                }, {
                    begin: /\(/,
                    end: /\)/,
                    relevance: 0,
                    contains: c
                }, {
                    begin: "!important"
                }, t.FUNCTION_DISPATCH ]
            }, h = {
                begin: "[\\w-]+:(:)?" + "(".concat(n.join("|"), ")"),
                returnBegin: !0,
                contains: [ g ]
            };
            return u.push(e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, f, D, h, p, g, d, t.FUNCTION_DISPATCH), 
            {
                name: "Less",
                case_insensitive: !0,
                illegal: "[=>'/<($\"]",
                contains: u
            };
        })), Ju.registerLanguage("lua", (function(e) {
            var t = "\\[=*\\[", n = "\\]=*\\]", r = {
                begin: t,
                end: n,
                contains: [ "self" ]
            }, u = [ e.COMMENT("--(?!\\[=*\\[)", "$"), e.COMMENT("--\\[=*\\[", n, {
                contains: [ r ],
                relevance: 10
            }) ];
            return {
                name: "Lua",
                keywords: {
                    $pattern: e.UNDERSCORE_IDENT_RE,
                    literal: "true false nil",
                    keyword: "and break do else elseif end for goto if in local not or repeat return then until while",
                    built_in: "_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
                },
                contains: u.concat([ {
                    className: "function",
                    beginKeywords: "function",
                    end: "\\)",
                    contains: [ e.inherit(e.TITLE_MODE, {
                        begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
                    }), {
                        className: "params",
                        begin: "\\(",
                        endsWithParent: !0,
                        contains: u
                    } ].concat(u)
                }, e.C_NUMBER_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
                    className: "string",
                    begin: t,
                    end: n,
                    contains: [ r ],
                    relevance: 5
                } ])
            };
        })), Ju.registerLanguage("makefile", (function(e) {
            var t = {
                className: "variable",
                variants: [ {
                    begin: "\\$\\(" + e.UNDERSCORE_IDENT_RE + "\\)",
                    contains: [ e.BACKSLASH_ESCAPE ]
                }, {
                    begin: /\$[@%<?\^\+\*]/
                } ]
            }, n = {
                className: "string",
                begin: /"/,
                end: /"/,
                contains: [ e.BACKSLASH_ESCAPE, t ]
            }, r = {
                className: "variable",
                begin: /\$\([\w-]+\s/,
                end: /\)/,
                keywords: {
                    built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
                },
                contains: [ t ]
            }, u = {
                begin: "^" + e.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)"
            }, a = {
                className: "section",
                begin: /^[^\s]+:/,
                end: /$/,
                contains: [ t ]
            };
            return {
                name: "Makefile",
                aliases: [ "mk", "mak", "make" ],
                keywords: {
                    $pattern: /[\w-]+/,
                    keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"
                },
                contains: [ e.HASH_COMMENT_MODE, t, n, r, u, {
                    className: "meta",
                    begin: /^\.PHONY:/,
                    end: /$/,
                    keywords: {
                        $pattern: /[\.\w]+/,
                        keyword: ".PHONY"
                    }
                }, a ]
            };
        })), Ju.registerLanguage("markdown", (function(e) {
            var t = {
                begin: /<\/?[A-Za-z_]/,
                end: ">",
                subLanguage: "xml",
                relevance: 0
            }, n = {
                variants: [ {
                    begin: /\[.+?\]\[.*?\]/,
                    relevance: 0
                }, {
                    begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
                    relevance: 2
                }, {
                    begin: e.regex.concat(/\[.+?\]\(/, /[A-Za-z][A-Za-z0-9+.-]*/, /:\/\/.*?\)/),
                    relevance: 2
                }, {
                    begin: /\[.+?\]\([./?&#].*?\)/,
                    relevance: 1
                }, {
                    begin: /\[.*?\]\(.*?\)/,
                    relevance: 0
                } ],
                returnBegin: !0,
                contains: [ {
                    match: /\[(?=\])/
                }, {
                    className: "string",
                    relevance: 0,
                    begin: "\\[",
                    end: "\\]",
                    excludeBegin: !0,
                    returnEnd: !0
                }, {
                    className: "link",
                    relevance: 0,
                    begin: "\\]\\(",
                    end: "\\)",
                    excludeBegin: !0,
                    excludeEnd: !0
                }, {
                    className: "symbol",
                    relevance: 0,
                    begin: "\\]\\[",
                    end: "\\]",
                    excludeBegin: !0,
                    excludeEnd: !0
                } ]
            }, r = {
                className: "strong",
                contains: [],
                variants: [ {
                    begin: /_{2}(?!\s)/,
                    end: /_{2}/
                }, {
                    begin: /\*{2}(?!\s)/,
                    end: /\*{2}/
                } ]
            }, u = {
                className: "emphasis",
                contains: [],
                variants: [ {
                    begin: /\*(?![*\s])/,
                    end: /\*/
                }, {
                    begin: /_(?![_\s])/,
                    end: /_/,
                    relevance: 0
                } ]
            }, a = e.inherit(r, {
                contains: []
            }), i = e.inherit(u, {
                contains: []
            });
            r.contains.push(i), u.contains.push(a);
            var o = [ t, n ];
            return [ r, u, a, i ].forEach((function(e) {
                e.contains = e.contains.concat(o);
            })), {
                name: "Markdown",
                aliases: [ "md", "mkdown", "mkd" ],
                contains: [ {
                    className: "section",
                    variants: [ {
                        begin: "^#{1,6}",
                        end: "$",
                        contains: o = o.concat(r, u)
                    }, {
                        begin: "(?=^.+?\\n[=-]{2,}$)",
                        contains: [ {
                            begin: "^[=-]*$"
                        }, {
                            begin: "^",
                            end: "\\n",
                            contains: o
                        } ]
                    } ]
                }, t, {
                    className: "bullet",
                    begin: "^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)",
                    end: "\\s+",
                    excludeEnd: !0
                }, r, u, {
                    className: "quote",
                    begin: "^>\\s+",
                    contains: o,
                    end: "$"
                }, {
                    className: "code",
                    variants: [ {
                        begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*"
                    }, {
                        begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*"
                    }, {
                        begin: "```",
                        end: "```+[ ]*$"
                    }, {
                        begin: "~~~",
                        end: "~~~+[ ]*$"
                    }, {
                        begin: "`.+?`"
                    }, {
                        begin: "(?=^( {4}|\\t))",
                        contains: [ {
                            begin: "^( {4}|\\t)",
                            end: "(\\n)$"
                        } ],
                        relevance: 0
                    } ]
                }, {
                    begin: "^[-\\*]{3,}",
                    end: "$"
                }, n, {
                    begin: /^\[[^\n]+\]:/,
                    returnBegin: !0,
                    contains: [ {
                        className: "symbol",
                        begin: /\[/,
                        end: /\]/,
                        excludeBegin: !0,
                        excludeEnd: !0
                    }, {
                        className: "link",
                        begin: /:\s*/,
                        end: /$/,
                        excludeBegin: !0
                    } ]
                } ]
            };
        })), Ju.registerLanguage("objectivec", (function(e) {
            var t = /[a-zA-Z@][a-zA-Z0-9_]*/, n = {
                $pattern: t,
                keyword: [ "@interface", "@class", "@protocol", "@implementation" ]
            };
            return {
                name: "Objective-C",
                aliases: [ "mm", "objc", "obj-c", "obj-c++", "objective-c++" ],
                keywords: {
                    "variable.language": [ "this", "super" ],
                    $pattern: t,
                    keyword: [ "while", "export", "sizeof", "typedef", "const", "struct", "for", "union", "volatile", "static", "mutable", "if", "do", "return", "goto", "enum", "else", "break", "extern", "asm", "case", "default", "register", "explicit", "typename", "switch", "continue", "inline", "readonly", "assign", "readwrite", "self", "@synchronized", "id", "typeof", "nonatomic", "IBOutlet", "IBAction", "strong", "weak", "copy", "in", "out", "inout", "bycopy", "byref", "oneway", "__strong", "__weak", "__block", "__autoreleasing", "@private", "@protected", "@public", "@try", "@property", "@end", "@throw", "@catch", "@finally", "@autoreleasepool", "@synthesize", "@dynamic", "@selector", "@optional", "@required", "@encode", "@package", "@import", "@defs", "@compatibility_alias", "__bridge", "__bridge_transfer", "__bridge_retained", "__bridge_retain", "__covariant", "__contravariant", "__kindof", "_Nonnull", "_Nullable", "_Null_unspecified", "__FUNCTION__", "__PRETTY_FUNCTION__", "__attribute__", "getter", "setter", "retain", "unsafe_unretained", "nonnull", "nullable", "null_unspecified", "null_resettable", "class", "instancetype", "NS_DESIGNATED_INITIALIZER", "NS_UNAVAILABLE", "NS_REQUIRES_SUPER", "NS_RETURNS_INNER_POINTER", "NS_INLINE", "NS_AVAILABLE", "NS_DEPRECATED", "NS_ENUM", "NS_OPTIONS", "NS_SWIFT_UNAVAILABLE", "NS_ASSUME_NONNULL_BEGIN", "NS_ASSUME_NONNULL_END", "NS_REFINED_FOR_SWIFT", "NS_SWIFT_NAME", "NS_SWIFT_NOTHROW", "NS_DURING", "NS_HANDLER", "NS_ENDHANDLER", "NS_VALUERETURN", "NS_VOIDRETURN" ],
                    literal: [ "false", "true", "FALSE", "TRUE", "nil", "YES", "NO", "NULL" ],
                    built_in: [ "dispatch_once_t", "dispatch_queue_t", "dispatch_sync", "dispatch_async", "dispatch_once" ],
                    type: [ "int", "float", "char", "unsigned", "signed", "short", "long", "double", "wchar_t", "unichar", "void", "bool", "BOOL", "id|0", "_Bool" ]
                },
                illegal: "</",
                contains: [ {
                    className: "built_in",
                    begin: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
                }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.C_NUMBER_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, {
                    className: "string",
                    variants: [ {
                        begin: '@"',
                        end: '"',
                        illegal: "\\n",
                        contains: [ e.BACKSLASH_ESCAPE ]
                    } ]
                }, {
                    className: "meta",
                    begin: /#\s*[a-z]+\b/,
                    end: /$/,
                    keywords: {
                        keyword: "if else elif endif define undef warning error line pragma ifdef ifndef include"
                    },
                    contains: [ {
                        begin: /\\\n/,
                        relevance: 0
                    }, e.inherit(e.QUOTE_STRING_MODE, {
                        className: "string"
                    }), {
                        className: "string",
                        begin: /<.*?>/,
                        end: /$/,
                        illegal: "\\n"
                    }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE ]
                }, {
                    className: "class",
                    begin: "(" + n.keyword.join("|") + ")\\b",
                    end: /(\{|$)/,
                    excludeEnd: !0,
                    keywords: n,
                    contains: [ e.UNDERSCORE_TITLE_MODE ]
                }, {
                    begin: "\\." + e.UNDERSCORE_IDENT_RE,
                    relevance: 0
                } ]
            };
        })), Ju.registerLanguage("perl", (function(e) {
            var t = e.regex, n = /[dualxmsipngr]{0,12}/, r = {
                $pattern: /[\w.]+/,
                keyword: [ "abs", "accept", "alarm", "and", "atan2", "bind", "binmode", "bless", "break", "caller", "chdir", "chmod", "chomp", "chop", "chown", "chr", "chroot", "close", "closedir", "connect", "continue", "cos", "crypt", "dbmclose", "dbmopen", "defined", "delete", "die", "do", "dump", "each", "else", "elsif", "endgrent", "endhostent", "endnetent", "endprotoent", "endpwent", "endservent", "eof", "eval", "exec", "exists", "exit", "exp", "fcntl", "fileno", "flock", "for", "foreach", "fork", "format", "formline", "getc", "getgrent", "getgrgid", "getgrnam", "gethostbyaddr", "gethostbyname", "gethostent", "getlogin", "getnetbyaddr", "getnetbyname", "getnetent", "getpeername", "getpgrp", "getpriority", "getprotobyname", "getprotobynumber", "getprotoent", "getpwent", "getpwnam", "getpwuid", "getservbyname", "getservbyport", "getservent", "getsockname", "getsockopt", "given", "glob", "gmtime", "goto", "grep", "gt", "hex", "if", "index", "int", "ioctl", "join", "keys", "kill", "last", "lc", "lcfirst", "length", "link", "listen", "local", "localtime", "log", "lstat", "lt", "ma", "map", "mkdir", "msgctl", "msgget", "msgrcv", "msgsnd", "my", "ne", "next", "no", "not", "oct", "open", "opendir", "or", "ord", "our", "pack", "package", "pipe", "pop", "pos", "print", "printf", "prototype", "push", "q|0", "qq", "quotemeta", "qw", "qx", "rand", "read", "readdir", "readline", "readlink", "readpipe", "recv", "redo", "ref", "rename", "require", "reset", "return", "reverse", "rewinddir", "rindex", "rmdir", "say", "scalar", "seek", "seekdir", "select", "semctl", "semget", "semop", "send", "setgrent", "sethostent", "setnetent", "setpgrp", "setpriority", "setprotoent", "setpwent", "setservent", "setsockopt", "shift", "shmctl", "shmget", "shmread", "shmwrite", "shutdown", "sin", "sleep", "socket", "socketpair", "sort", "splice", "split", "sprintf", "sqrt", "srand", "stat", "state", "study", "sub", "substr", "symlink", "syscall", "sysopen", "sysread", "sysseek", "system", "syswrite", "tell", "telldir", "tie", "tied", "time", "times", "tr", "truncate", "uc", "ucfirst", "umask", "undef", "unless", "unlink", "unpack", "unshift", "untie", "until", "use", "utime", "values", "vec", "wait", "waitpid", "wantarray", "warn", "when", "while", "write", "x|0", "xor", "y|0" ].join(" ")
            }, u = {
                className: "subst",
                begin: "[$@]\\{",
                end: "\\}",
                keywords: r
            }, a = {
                begin: /->\{/,
                end: /\}/
            }, i = {
                variants: [ {
                    begin: /\$\d/
                }, {
                    begin: t.concat(/[$%@](\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/, "(?![A-Za-z])(?![@$%])")
                }, {
                    begin: /[$%@][^\s\w{]/,
                    relevance: 0
                } ]
            }, o = [ e.BACKSLASH_ESCAPE, u, i ], l = [ /!/, /\//, /\|/, /\?/, /'/, /"/, /#/ ], s = function(e, r) {
                var u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "\\1", a = "\\1" === u ? u : t.concat(u, r);
                return t.concat(t.concat("(?:", e, ")"), r, /(?:\\.|[^\\\/])*?/, a, /(?:\\.|[^\\\/])*?/, u, n);
            }, c = function(e, r, u) {
                return t.concat(t.concat("(?:", e, ")"), r, /(?:\\.|[^\\\/])*?/, u, n);
            }, d = [ i, e.HASH_COMMENT_MODE, e.COMMENT(/^=\w/, /=cut/, {
                endsWithParent: !0
            }), a, {
                className: "string",
                contains: o,
                variants: [ {
                    begin: "q[qwxr]?\\s*\\(",
                    end: "\\)",
                    relevance: 5
                }, {
                    begin: "q[qwxr]?\\s*\\[",
                    end: "\\]",
                    relevance: 5
                }, {
                    begin: "q[qwxr]?\\s*\\{",
                    end: "\\}",
                    relevance: 5
                }, {
                    begin: "q[qwxr]?\\s*\\|",
                    end: "\\|",
                    relevance: 5
                }, {
                    begin: "q[qwxr]?\\s*<",
                    end: ">",
                    relevance: 5
                }, {
                    begin: "qw\\s+q",
                    end: "q",
                    relevance: 5
                }, {
                    begin: "'",
                    end: "'",
                    contains: [ e.BACKSLASH_ESCAPE ]
                }, {
                    begin: '"',
                    end: '"'
                }, {
                    begin: "`",
                    end: "`",
                    contains: [ e.BACKSLASH_ESCAPE ]
                }, {
                    begin: /\{\w+\}/,
                    relevance: 0
                }, {
                    begin: "-?\\w+\\s*=>",
                    relevance: 0
                } ]
            }, {
                className: "number",
                begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                relevance: 0
            }, {
                begin: "(\\/\\/|" + e.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
                keywords: "split return print reverse grep",
                relevance: 0,
                contains: [ e.HASH_COMMENT_MODE, {
                    className: "regexp",
                    variants: [ {
                        begin: s("s|tr|y", t.either.apply(t, l.concat([ {
                            capture: !0
                        } ])))
                    }, {
                        begin: s("s|tr|y", "\\(", "\\)")
                    }, {
                        begin: s("s|tr|y", "\\[", "\\]")
                    }, {
                        begin: s("s|tr|y", "\\{", "\\}")
                    } ],
                    relevance: 2
                }, {
                    className: "regexp",
                    variants: [ {
                        begin: /(m|qr)\/\//,
                        relevance: 0
                    }, {
                        begin: c("(?:m|qr)?", /\//, /\//)
                    }, {
                        begin: c("m|qr", t.either.apply(t, l.concat([ {
                            capture: !0
                        } ])), /\1/)
                    }, {
                        begin: c("m|qr", /\(/, /\)/)
                    }, {
                        begin: c("m|qr", /\[/, /\]/)
                    }, {
                        begin: c("m|qr", /\{/, /\}/)
                    } ]
                } ]
            }, {
                className: "function",
                beginKeywords: "sub",
                end: "(\\s*\\(.*?\\))?[;{]",
                excludeEnd: !0,
                relevance: 5,
                contains: [ e.TITLE_MODE ]
            }, {
                begin: "-\\w\\b",
                relevance: 0
            }, {
                begin: "^__DATA__$",
                end: "^__END__$",
                subLanguage: "mojolicious",
                contains: [ {
                    begin: "^@@.*",
                    end: "$",
                    className: "comment"
                } ]
            } ];
            return u.contains = d, a.contains = d, {
                name: "Perl",
                aliases: [ "pl", "pm" ],
                keywords: r,
                contains: d
            };
        })), Ju.registerLanguage("php", (function(e) {
            var t, n, r = e.regex, u = /(?![A-Za-z0-9])(?![$])/, a = r.concat(/[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/, u), i = r.concat(/(\\?[A-Z][a-z0-9_\x7f-\xff]+|\\?[A-Z]+(?=[A-Z][a-z0-9_\x7f-\xff])){1,}/, u), o = {
                scope: "variable",
                match: "\\$+" + a
            }, l = {
                scope: "subst",
                variants: [ {
                    begin: /\$\w+/
                }, {
                    begin: /\{\$/,
                    end: /\}/
                } ]
            }, s = e.inherit(e.APOS_STRING_MODE, {
                illegal: null
            }), c = "[ \t\n]", d = {
                scope: "string",
                variants: [ e.inherit(e.QUOTE_STRING_MODE, {
                    illegal: null,
                    contains: e.QUOTE_STRING_MODE.contains.concat(l)
                }), s, e.END_SAME_AS_BEGIN({
                    begin: /<<<[ \t]*(\w+)\n/,
                    end: /[ \t]*(\w+)\b/,
                    contains: e.QUOTE_STRING_MODE.contains.concat(l)
                }) ]
            }, p = {
                scope: "number",
                variants: [ {
                    begin: "\\b0[bB][01]+(?:_[01]+)*\\b"
                }, {
                    begin: "\\b0[oO][0-7]+(?:_[0-7]+)*\\b"
                }, {
                    begin: "\\b0[xX][\\da-fA-F]+(?:_[\\da-fA-F]+)*\\b"
                }, {
                    begin: "(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:[eE][+-]?\\d+)?"
                } ],
                relevance: 0
            }, f = [ "false", "null", "true" ], D = [ "__CLASS__", "__DIR__", "__FILE__", "__FUNCTION__", "__COMPILER_HALT_OFFSET__", "__LINE__", "__METHOD__", "__NAMESPACE__", "__TRAIT__", "die", "echo", "exit", "include", "include_once", "print", "require", "require_once", "array", "abstract", "and", "as", "binary", "bool", "boolean", "break", "callable", "case", "catch", "class", "clone", "const", "continue", "declare", "default", "do", "double", "else", "elseif", "empty", "enddeclare", "endfor", "endforeach", "endif", "endswitch", "endwhile", "enum", "eval", "extends", "final", "finally", "float", "for", "foreach", "from", "global", "goto", "if", "implements", "instanceof", "insteadof", "int", "integer", "interface", "isset", "iterable", "list", "match|0", "mixed", "new", "never", "object", "or", "private", "protected", "public", "readonly", "real", "return", "string", "switch", "throw", "trait", "try", "unset", "use", "var", "void", "while", "xor", "yield" ], g = [ "Error|0", "AppendIterator", "ArgumentCountError", "ArithmeticError", "ArrayIterator", "ArrayObject", "AssertionError", "BadFunctionCallException", "BadMethodCallException", "CachingIterator", "CallbackFilterIterator", "CompileError", "Countable", "DirectoryIterator", "DivisionByZeroError", "DomainException", "EmptyIterator", "ErrorException", "Exception", "FilesystemIterator", "FilterIterator", "GlobIterator", "InfiniteIterator", "InvalidArgumentException", "IteratorIterator", "LengthException", "LimitIterator", "LogicException", "MultipleIterator", "NoRewindIterator", "OutOfBoundsException", "OutOfRangeException", "OuterIterator", "OverflowException", "ParentIterator", "ParseError", "RangeException", "RecursiveArrayIterator", "RecursiveCachingIterator", "RecursiveCallbackFilterIterator", "RecursiveDirectoryIterator", "RecursiveFilterIterator", "RecursiveIterator", "RecursiveIteratorIterator", "RecursiveRegexIterator", "RecursiveTreeIterator", "RegexIterator", "RuntimeException", "SeekableIterator", "SplDoublyLinkedList", "SplFileInfo", "SplFileObject", "SplFixedArray", "SplHeap", "SplMaxHeap", "SplMinHeap", "SplObjectStorage", "SplObserver", "SplPriorityQueue", "SplQueue", "SplStack", "SplSubject", "SplTempFileObject", "TypeError", "UnderflowException", "UnexpectedValueException", "UnhandledMatchError", "ArrayAccess", "BackedEnum", "Closure", "Fiber", "Generator", "Iterator", "IteratorAggregate", "Serializable", "Stringable", "Throwable", "Traversable", "UnitEnum", "WeakReference", "WeakMap", "Directory", "__PHP_Incomplete_Class", "parent", "php_user_filter", "self", "static", "stdClass" ], h = {
                keyword: D,
                literal: (t = f, n = [], t.forEach((function(e) {
                    n.push(e), e.toLowerCase() === e ? n.push(e.toUpperCase()) : n.push(e.toLowerCase());
                })), n),
                built_in: g
            }, m = function(e) {
                return e.map((function(e) {
                    return e.replace(/\|\d+$/, "");
                }));
            }, b = {
                variants: [ {
                    match: [ /new/, r.concat(c, "+"), r.concat("(?!", m(g).join("\\b|"), "\\b)"), i ],
                    scope: {
                        1: "keyword",
                        4: "title.class"
                    }
                } ]
            }, v = r.concat(a, "\\b(?!\\()"), E = {
                variants: [ {
                    match: [ r.concat(/::/, r.lookahead(/(?!class\b)/)), v ],
                    scope: {
                        2: "variable.constant"
                    }
                }, {
                    match: [ /::/, /class/ ],
                    scope: {
                        2: "variable.language"
                    }
                }, {
                    match: [ i, r.concat(/::/, r.lookahead(/(?!class\b)/)), v ],
                    scope: {
                        1: "title.class",
                        3: "variable.constant"
                    }
                }, {
                    match: [ i, r.concat("::", r.lookahead(/(?!class\b)/)) ],
                    scope: {
                        1: "title.class"
                    }
                }, {
                    match: [ i, /::/, /class/ ],
                    scope: {
                        1: "title.class",
                        3: "variable.language"
                    }
                } ]
            }, y = {
                scope: "attr",
                match: r.concat(a, r.lookahead(":"), r.lookahead(/(?!::)/))
            }, _ = {
                relevance: 0,
                begin: /\(/,
                end: /\)/,
                keywords: h,
                contains: [ y, o, E, e.C_BLOCK_COMMENT_MODE, d, p, b ]
            }, C = {
                relevance: 0,
                match: [ /\b/, r.concat("(?!fn\\b|function\\b|", m(D).join("\\b|"), "|", m(g).join("\\b|"), "\\b)"), a, r.concat(c, "*"), r.lookahead(/(?=\()/) ],
                scope: {
                    3: "title.function.invoke"
                },
                contains: [ _ ]
            };
            _.contains.push(C);
            var F = [ y, E, e.C_BLOCK_COMMENT_MODE, d, p, b ];
            return {
                case_insensitive: !1,
                keywords: h,
                contains: [ {
                    begin: r.concat(/#\[\s*/, i),
                    beginScope: "meta",
                    end: /]/,
                    endScope: "meta",
                    keywords: {
                        literal: f,
                        keyword: [ "new", "array" ]
                    },
                    contains: [ {
                        begin: /\[/,
                        end: /]/,
                        keywords: {
                            literal: f,
                            keyword: [ "new", "array" ]
                        },
                        contains: [ "self" ].concat(F)
                    } ].concat(F, [ {
                        scope: "meta",
                        match: i
                    } ])
                }, e.HASH_COMMENT_MODE, e.COMMENT("//", "$"), e.COMMENT("/\\*", "\\*/", {
                    contains: [ {
                        scope: "doctag",
                        match: "@[A-Za-z]+"
                    } ]
                }), {
                    match: /__halt_compiler\(\);/,
                    keywords: "__halt_compiler",
                    starts: {
                        scope: "comment",
                        end: e.MATCH_NOTHING_RE,
                        contains: [ {
                            match: /\?>/,
                            scope: "meta",
                            endsParent: !0
                        } ]
                    }
                }, {
                    scope: "meta",
                    variants: [ {
                        begin: /<\?php/,
                        relevance: 10
                    }, {
                        begin: /<\?=/
                    }, {
                        begin: /<\?/,
                        relevance: .1
                    }, {
                        begin: /\?>/
                    } ]
                }, {
                    scope: "variable.language",
                    match: /\$this\b/
                }, o, C, E, {
                    match: [ /const/, /\s/, a ],
                    scope: {
                        1: "keyword",
                        3: "variable.constant"
                    }
                }, b, {
                    scope: "function",
                    relevance: 0,
                    beginKeywords: "fn function",
                    end: /[;{]/,
                    excludeEnd: !0,
                    illegal: "[$%\\[]",
                    contains: [ {
                        beginKeywords: "use"
                    }, e.UNDERSCORE_TITLE_MODE, {
                        begin: "=>",
                        endsParent: !0
                    }, {
                        scope: "params",
                        begin: "\\(",
                        end: "\\)",
                        excludeBegin: !0,
                        excludeEnd: !0,
                        keywords: h,
                        contains: [ "self", o, E, e.C_BLOCK_COMMENT_MODE, d, p ]
                    } ]
                }, {
                    scope: "class",
                    variants: [ {
                        beginKeywords: "enum",
                        illegal: /[($"]/
                    }, {
                        beginKeywords: "class interface trait",
                        illegal: /[:($"]/
                    } ],
                    relevance: 0,
                    end: /\{/,
                    excludeEnd: !0,
                    contains: [ {
                        beginKeywords: "extends implements"
                    }, e.UNDERSCORE_TITLE_MODE ]
                }, {
                    beginKeywords: "namespace",
                    relevance: 0,
                    end: ";",
                    illegal: /[.']/,
                    contains: [ e.inherit(e.UNDERSCORE_TITLE_MODE, {
                        scope: "title.class"
                    }) ]
                }, {
                    beginKeywords: "use",
                    relevance: 0,
                    end: ";",
                    contains: [ {
                        match: /\b(as|const|function)\b/,
                        scope: "keyword"
                    }, e.UNDERSCORE_TITLE_MODE ]
                }, d, p ]
            };
        })), Ju.registerLanguage("php-template", (function(e) {
            return {
                name: "PHP template",
                subLanguage: "xml",
                contains: [ {
                    begin: /<\?(php|=)?/,
                    end: /\?>/,
                    subLanguage: "php",
                    contains: [ {
                        begin: "/\\*",
                        end: "\\*/",
                        skip: !0
                    }, {
                        begin: 'b"',
                        end: '"',
                        skip: !0
                    }, {
                        begin: "b'",
                        end: "'",
                        skip: !0
                    }, e.inherit(e.APOS_STRING_MODE, {
                        illegal: null,
                        className: null,
                        contains: null,
                        skip: !0
                    }), e.inherit(e.QUOTE_STRING_MODE, {
                        illegal: null,
                        className: null,
                        contains: null,
                        skip: !0
                    }) ]
                } ]
            };
        })), Ju.registerLanguage("plaintext", (function(e) {
            return {
                name: "Plain text",
                aliases: [ "text", "txt" ],
                disableAutodetect: !0
            };
        })), Ju.registerLanguage("python", (function(e) {
            var t = e.regex, n = /(?:[A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037B-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFC5D\uFC64-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDF9\uFE71\uFE73\uFE77\uFE79\uFE7B\uFE7D\uFE7F-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])(?:[0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037B-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05EF-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u07FD\u0800-\u082D\u0840-\u085B\u0860-\u086A\u0870-\u0887\u0889-\u088E\u0898-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u09FE\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3C-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C5D\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDD\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D81-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1715\u171F-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B4C\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CD0-\u1CD2\u1CD4-\u1CFA\u1D00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA827\uA82C\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFC5D\uFC64-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDF9\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE71\uFE73\uFE77\uFE79\uFE7B\uFE7D\uFE7F-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD27\uDD30-\uDD39\uDE80-\uDEA9\uDEAB\uDEAC\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF50\uDF70-\uDF85\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC00-\uDC46\uDC66-\uDC75\uDC7F-\uDCBA\uDCC2\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD44-\uDD47\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDC9-\uDDCC\uDDCE-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3B-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC5E-\uDC61\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF1D-\uDF2B\uDF30-\uDF39\uDF40-\uDF46]|\uD806[\uDC00-\uDC3A\uDCA0-\uDCE9\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD35\uDD37\uDD38\uDD3B-\uDD43\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD7\uDDDA-\uDDE1\uDDE3\uDDE4\uDE00-\uDE3E\uDE47\uDE50-\uDE99\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD8E\uDD90\uDD91\uDD93-\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF6\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF4F-\uDF87\uDF8F-\uDF9F\uDFE0\uDFE1\uDFE3\uDFE4\uDFF0\uDFF1]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD833[\uDF00-\uDF2D\uDF30-\uDF46]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD837[\uDF00-\uDF1E]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD00-\uDD2C\uDD30-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAE\uDEC0-\uDEF9]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4B\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]|\uDB40[\uDD00-\uDDEF])*/, r = [ "and", "as", "assert", "async", "await", "break", "case", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "match", "nonlocal|10", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield" ], u = {
                $pattern: /[A-Za-z]\w+|__\w+__/,
                keyword: r,
                built_in: [ "__import__", "abs", "all", "any", "ascii", "bin", "bool", "breakpoint", "bytearray", "bytes", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "exec", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "print", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip" ],
                literal: [ "__debug__", "Ellipsis", "False", "None", "NotImplemented", "True" ],
                type: [ "Any", "Callable", "Coroutine", "Dict", "List", "Literal", "Generic", "Optional", "Sequence", "Set", "Tuple", "Type", "Union" ]
            }, a = {
                className: "meta",
                begin: /^(>>>|\.\.\.) /
            }, i = {
                className: "subst",
                begin: /\{/,
                end: /\}/,
                keywords: u,
                illegal: /#/
            }, o = {
                begin: /\{\{/,
                relevance: 0
            }, l = {
                className: "string",
                contains: [ e.BACKSLASH_ESCAPE ],
                variants: [ {
                    begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
                    end: /'''/,
                    contains: [ e.BACKSLASH_ESCAPE, a ],
                    relevance: 10
                }, {
                    begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
                    end: /"""/,
                    contains: [ e.BACKSLASH_ESCAPE, a ],
                    relevance: 10
                }, {
                    begin: /([fF][rR]|[rR][fF]|[fF])'''/,
                    end: /'''/,
                    contains: [ e.BACKSLASH_ESCAPE, a, o, i ]
                }, {
                    begin: /([fF][rR]|[rR][fF]|[fF])"""/,
                    end: /"""/,
                    contains: [ e.BACKSLASH_ESCAPE, a, o, i ]
                }, {
                    begin: /([uU]|[rR])'/,
                    end: /'/,
                    relevance: 10
                }, {
                    begin: /([uU]|[rR])"/,
                    end: /"/,
                    relevance: 10
                }, {
                    begin: /([bB]|[bB][rR]|[rR][bB])'/,
                    end: /'/
                }, {
                    begin: /([bB]|[bB][rR]|[rR][bB])"/,
                    end: /"/
                }, {
                    begin: /([fF][rR]|[rR][fF]|[fF])'/,
                    end: /'/,
                    contains: [ e.BACKSLASH_ESCAPE, o, i ]
                }, {
                    begin: /([fF][rR]|[rR][fF]|[fF])"/,
                    end: /"/,
                    contains: [ e.BACKSLASH_ESCAPE, o, i ]
                }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE ]
            }, s = "[0-9](_?[0-9])*", c = "(\\b(".concat(s, "))?\\.(").concat(s, ")|\\b(").concat(s, ")\\."), d = "\\b|".concat(r.join("|")), p = {
                className: "number",
                relevance: 0,
                variants: [ {
                    begin: "(\\b(".concat(s, ")|(").concat(c, "))[eE][+-]?(").concat(s, ")[jJ]?(?=").concat(d, ")")
                }, {
                    begin: "(".concat(c, ")[jJ]?")
                }, {
                    begin: "\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=".concat(d, ")")
                }, {
                    begin: "\\b0[bB](_?[01])+[lL]?(?=".concat(d, ")")
                }, {
                    begin: "\\b0[oO](_?[0-7])+[lL]?(?=".concat(d, ")")
                }, {
                    begin: "\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=".concat(d, ")")
                }, {
                    begin: "\\b(".concat(s, ")[jJ](?=").concat(d, ")")
                } ]
            }, f = {
                className: "comment",
                begin: t.lookahead(/# type:/),
                end: /$/,
                keywords: u,
                contains: [ {
                    begin: /# type:/
                }, {
                    begin: /#/,
                    end: /\b\B/,
                    endsWithParent: !0
                } ]
            }, D = {
                className: "params",
                variants: [ {
                    className: "",
                    begin: /\(\s*\)/,
                    skip: !0
                }, {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: u,
                    contains: [ "self", a, p, l, e.HASH_COMMENT_MODE ]
                } ]
            };
            return i.contains = [ l, p, a ], {
                name: "Python",
                aliases: [ "py", "gyp", "ipython" ],
                unicodeRegex: !0,
                keywords: u,
                illegal: /(<\/|->|\?)|=>/,
                contains: [ a, p, {
                    begin: /\bself\b/
                }, {
                    beginKeywords: "if",
                    relevance: 0
                }, l, f, e.HASH_COMMENT_MODE, {
                    match: [ /\bdef/, /\s+/, n ],
                    scope: {
                        1: "keyword",
                        3: "title.function"
                    },
                    contains: [ D ]
                }, {
                    variants: [ {
                        match: [ /\bclass/, /\s+/, n, /\s*/, /\(\s*/, n, /\s*\)/ ]
                    }, {
                        match: [ /\bclass/, /\s+/, n ]
                    } ],
                    scope: {
                        1: "keyword",
                        3: "title.class",
                        6: "title.class.inherited"
                    }
                }, {
                    className: "meta",
                    begin: /^[\t ]*@/,
                    end: /(?=#)|$/,
                    contains: [ p, D, l ]
                } ]
            };
        })), Ju.registerLanguage("python-repl", (function(e) {
            return {
                aliases: [ "pycon" ],
                contains: [ {
                    className: "meta.prompt",
                    starts: {
                        end: / |$/,
                        starts: {
                            end: "$",
                            subLanguage: "python"
                        }
                    },
                    variants: [ {
                        begin: /^>>>(?=[ ]|$)/
                    }, {
                        begin: /^\.\.\.(?=[ ]|$)/
                    } ]
                } ]
            };
        })), Ju.registerLanguage("r", (function(e) {
            var t = e.regex, n = /(?:(?:[a-zA-Z]|\.[._a-zA-Z])[._a-zA-Z0-9]*)|\.(?!\d)/, r = t.either(/0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/, /0[xX][0-9a-fA-F]+(?:[pP][+-]?\d+)?[Li]?/, /(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?[Li]?/), u = /[=!<>:]=|\|\||&&|:::?|<-|<<-|->>|->|\|>|[-+*\/?!$&|:<=>@^~]|\*\*/, a = t.either(/[()]/, /[{}]/, /\[\[/, /[[\]]/, /\\/, /,/);
            return {
                name: "R",
                keywords: {
                    $pattern: n,
                    keyword: "function if in break next repeat else for while",
                    literal: "NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10",
                    built_in: "LETTERS letters month.abb month.name pi T F abs acos acosh all any anyNA Arg as.call as.character as.complex as.double as.environment as.integer as.logical as.null.default as.numeric as.raw asin asinh atan atanh attr attributes baseenv browser c call ceiling class Conj cos cosh cospi cummax cummin cumprod cumsum digamma dim dimnames emptyenv exp expression floor forceAndCall gamma gc.time globalenv Im interactive invisible is.array is.atomic is.call is.character is.complex is.double is.environment is.expression is.finite is.function is.infinite is.integer is.language is.list is.logical is.matrix is.na is.name is.nan is.null is.numeric is.object is.pairlist is.raw is.recursive is.single is.symbol lazyLoadDBfetch length lgamma list log max min missing Mod names nargs nzchar oldClass on.exit pos.to.env proc.time prod quote range Re rep retracemem return round seq_along seq_len seq.int sign signif sin sinh sinpi sqrt standardGeneric substitute sum switch tan tanh tanpi tracemem trigamma trunc unclass untracemem UseMethod xtfrm"
                },
                contains: [ e.COMMENT(/#'/, /$/, {
                    contains: [ {
                        scope: "doctag",
                        match: /@examples/,
                        starts: {
                            end: t.lookahead(t.either(/\n^#'\s*(?=@[a-zA-Z]+)/, /\n^(?!#')/)),
                            endsParent: !0
                        }
                    }, {
                        scope: "doctag",
                        begin: "@param",
                        end: /$/,
                        contains: [ {
                            scope: "variable",
                            variants: [ {
                                match: n
                            }, {
                                match: /`(?:\\.|[^`\\])+`/
                            } ],
                            endsParent: !0
                        } ]
                    }, {
                        scope: "doctag",
                        match: /@[a-zA-Z]+/
                    }, {
                        scope: "keyword",
                        match: /\\[a-zA-Z]+/
                    } ]
                }), e.HASH_COMMENT_MODE, {
                    scope: "string",
                    contains: [ e.BACKSLASH_ESCAPE ],
                    variants: [ e.END_SAME_AS_BEGIN({
                        begin: /[rR]"(-*)\(/,
                        end: /\)(-*)"/
                    }), e.END_SAME_AS_BEGIN({
                        begin: /[rR]"(-*)\{/,
                        end: /\}(-*)"/
                    }), e.END_SAME_AS_BEGIN({
                        begin: /[rR]"(-*)\[/,
                        end: /\](-*)"/
                    }), e.END_SAME_AS_BEGIN({
                        begin: /[rR]'(-*)\(/,
                        end: /\)(-*)'/
                    }), e.END_SAME_AS_BEGIN({
                        begin: /[rR]'(-*)\{/,
                        end: /\}(-*)'/
                    }), e.END_SAME_AS_BEGIN({
                        begin: /[rR]'(-*)\[/,
                        end: /\](-*)'/
                    }), {
                        begin: '"',
                        end: '"',
                        relevance: 0
                    }, {
                        begin: "'",
                        end: "'",
                        relevance: 0
                    } ]
                }, {
                    relevance: 0,
                    variants: [ {
                        scope: {
                            1: "operator",
                            2: "number"
                        },
                        match: [ u, r ]
                    }, {
                        scope: {
                            1: "operator",
                            2: "number"
                        },
                        match: [ /%[^%]*%/, r ]
                    }, {
                        scope: {
                            1: "punctuation",
                            2: "number"
                        },
                        match: [ a, r ]
                    }, {
                        scope: {
                            2: "number"
                        },
                        match: [ /[^a-zA-Z0-9._]|^/, r ]
                    } ]
                }, {
                    scope: {
                        3: "operator"
                    },
                    match: [ n, /\s+/, /<-/, /\s+/ ]
                }, {
                    scope: "operator",
                    relevance: 0,
                    variants: [ {
                        match: u
                    }, {
                        match: /%[^%]*%/
                    } ]
                }, {
                    scope: "punctuation",
                    relevance: 0,
                    match: a
                }, {
                    begin: "`",
                    end: "`",
                    contains: [ {
                        begin: /\\./
                    } ]
                } ]
            };
        })), Ju.registerLanguage("ruby", (function(e) {
            var t = e.regex, n = "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)", r = t.either(/\b([A-Z]+[a-z0-9]+)+/, /\b([A-Z]+[a-z0-9]+)+[A-Z]+/), u = t.concat(r, /(::\w+)*/), a = {
                "variable.constant": [ "__FILE__", "__LINE__", "__ENCODING__" ],
                "variable.language": [ "self", "super" ],
                keyword: [ "alias", "and", "begin", "BEGIN", "break", "case", "class", "defined", "do", "else", "elsif", "end", "END", "ensure", "for", "if", "in", "module", "next", "not", "or", "redo", "require", "rescue", "retry", "return", "then", "undef", "unless", "until", "when", "while", "yield" ].concat([ "include", "extend", "prepend", "public", "private", "protected", "raise", "throw" ]),
                built_in: [ "proc", "lambda", "attr_accessor", "attr_reader", "attr_writer", "define_method", "private_constant", "module_function" ],
                literal: [ "true", "false", "nil" ]
            }, i = {
                className: "doctag",
                begin: "@[A-Za-z]+"
            }, o = {
                begin: "#<",
                end: ">"
            }, l = [ e.COMMENT("#", "$", {
                contains: [ i ]
            }), e.COMMENT("^=begin", "^=end", {
                contains: [ i ],
                relevance: 10
            }), e.COMMENT("^__END__", e.MATCH_NOTHING_RE) ], s = {
                className: "subst",
                begin: /#\{/,
                end: /\}/,
                keywords: a
            }, c = {
                className: "string",
                contains: [ e.BACKSLASH_ESCAPE, s ],
                variants: [ {
                    begin: /'/,
                    end: /'/
                }, {
                    begin: /"/,
                    end: /"/
                }, {
                    begin: /`/,
                    end: /`/
                }, {
                    begin: /%[qQwWx]?\(/,
                    end: /\)/
                }, {
                    begin: /%[qQwWx]?\[/,
                    end: /\]/
                }, {
                    begin: /%[qQwWx]?\{/,
                    end: /\}/
                }, {
                    begin: /%[qQwWx]?</,
                    end: />/
                }, {
                    begin: /%[qQwWx]?\//,
                    end: /\//
                }, {
                    begin: /%[qQwWx]?%/,
                    end: /%/
                }, {
                    begin: /%[qQwWx]?-/,
                    end: /-/
                }, {
                    begin: /%[qQwWx]?\|/,
                    end: /\|/
                }, {
                    begin: /\B\?(\\\d{1,3})/
                }, {
                    begin: /\B\?(\\x[A-Fa-f0-9]{1,2})/
                }, {
                    begin: /\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/
                }, {
                    begin: /\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/
                }, {
                    begin: /\B\?\\(c|C-)[\x20-\x7e]/
                }, {
                    begin: /\B\?\\?\S/
                }, {
                    begin: t.concat(/<<[-~]?'?/, t.lookahead(/(\w+)(?=\W)[^\n]*\n(?:[^\n]*\n)*?\s*\1\b/)),
                    contains: [ e.END_SAME_AS_BEGIN({
                        begin: /(\w+)/,
                        end: /(\w+)/,
                        contains: [ e.BACKSLASH_ESCAPE, s ]
                    }) ]
                } ]
            }, d = "[0-9](_?[0-9])*", p = {
                className: "number",
                relevance: 0,
                variants: [ {
                    begin: "\\b(".concat("[1-9](_?[0-9])*|0", ")(\\.(").concat(d, "))?([eE][+-]?(").concat(d, ")|r)?i?\\b")
                }, {
                    begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b"
                }, {
                    begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b"
                }, {
                    begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b"
                }, {
                    begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"
                }, {
                    begin: "\\b0(_?[0-7])+r?i?\\b"
                } ]
            }, f = {
                variants: [ {
                    match: /\(\)/
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /(?=\))/,
                    excludeBegin: !0,
                    endsParent: !0,
                    keywords: a
                } ]
            }, D = [ c, {
                variants: [ {
                    match: [ /class\s+/, u, /\s+<\s+/, u ]
                }, {
                    match: [ /\b(class|module)\s+/, u ]
                } ],
                scope: {
                    2: "title.class",
                    4: "title.class.inherited"
                },
                keywords: a
            }, {
                match: [ /(include|extend)\s+/, u ],
                scope: {
                    2: "title.class"
                },
                keywords: a
            }, {
                relevance: 0,
                match: [ u, /\.new[. (]/ ],
                scope: {
                    1: "title.class"
                }
            }, {
                relevance: 0,
                match: /\b[A-Z][A-Z_0-9]+\b/,
                className: "variable.constant"
            }, {
                relevance: 0,
                match: r,
                scope: "title.class"
            }, {
                match: [ /def/, /\s+/, n ],
                scope: {
                    1: "keyword",
                    3: "title.function"
                },
                contains: [ f ]
            }, {
                begin: e.IDENT_RE + "::"
            }, {
                className: "symbol",
                begin: e.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
                relevance: 0
            }, {
                className: "symbol",
                begin: ":(?!\\s)",
                contains: [ c, {
                    begin: n
                } ],
                relevance: 0
            }, p, {
                className: "variable",
                begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"
            }, {
                className: "params",
                begin: /\|/,
                end: /\|/,
                excludeBegin: !0,
                excludeEnd: !0,
                relevance: 0,
                keywords: a
            }, {
                begin: "(" + e.RE_STARTERS_RE + "|unless)\\s*",
                keywords: "unless",
                contains: [ {
                    className: "regexp",
                    contains: [ e.BACKSLASH_ESCAPE, s ],
                    illegal: /\n/,
                    variants: [ {
                        begin: "/",
                        end: "/[a-z]*"
                    }, {
                        begin: /%r\{/,
                        end: /\}[a-z]*/
                    }, {
                        begin: "%r\\(",
                        end: "\\)[a-z]*"
                    }, {
                        begin: "%r!",
                        end: "![a-z]*"
                    }, {
                        begin: "%r\\[",
                        end: "\\][a-z]*"
                    } ]
                } ].concat(o, l),
                relevance: 0
            } ].concat(o, l);
            s.contains = D, f.contains = D;
            var g = [ {
                begin: /^\s*=>/,
                starts: {
                    end: "$",
                    contains: D
                }
            }, {
                className: "meta.prompt",
                begin: "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+[>*]|(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>)(?=[ ])",
                starts: {
                    end: "$",
                    keywords: a,
                    contains: D
                }
            } ];
            return l.unshift(o), {
                name: "Ruby",
                aliases: [ "rb", "gemspec", "podspec", "thor", "irb" ],
                keywords: a,
                illegal: /\/\*/,
                contains: [ e.SHEBANG({
                    binary: "ruby"
                }) ].concat(g).concat(l).concat(D)
            };
        })), Ju.registerLanguage("rust", (function(e) {
            var t = e.regex, n = {
                className: "title.function.invoke",
                relevance: 0,
                begin: t.concat(/\b/, /(?!let\b)/, e.IDENT_RE, t.lookahead(/\s*\(/))
            }, r = "([ui](8|16|32|64|128|size)|f(32|64))?", u = [ "drop ", "Copy", "Send", "Sized", "Sync", "Drop", "Fn", "FnMut", "FnOnce", "ToOwned", "Clone", "Debug", "PartialEq", "PartialOrd", "Eq", "Ord", "AsRef", "AsMut", "Into", "From", "Default", "Iterator", "Extend", "IntoIterator", "DoubleEndedIterator", "ExactSizeIterator", "SliceConcatExt", "ToString", "assert!", "assert_eq!", "bitflags!", "bytes!", "cfg!", "col!", "concat!", "concat_idents!", "debug_assert!", "debug_assert_eq!", "env!", "panic!", "file!", "format!", "format_args!", "include_bytes!", "include_str!", "line!", "local_data_key!", "module_path!", "option_env!", "print!", "println!", "select!", "stringify!", "try!", "unimplemented!", "unreachable!", "vec!", "write!", "writeln!", "macro_rules!", "assert_ne!", "debug_assert_ne!" ], a = [ "i8", "i16", "i32", "i64", "i128", "isize", "u8", "u16", "u32", "u64", "u128", "usize", "f32", "f64", "str", "char", "bool", "Box", "Option", "Result", "String", "Vec" ];
            return {
                name: "Rust",
                aliases: [ "rs" ],
                keywords: {
                    $pattern: e.IDENT_RE + "!?",
                    type: a,
                    keyword: [ "abstract", "as", "async", "await", "become", "box", "break", "const", "continue", "crate", "do", "dyn", "else", "enum", "extern", "false", "final", "fn", "for", "if", "impl", "in", "let", "loop", "macro", "match", "mod", "move", "mut", "override", "priv", "pub", "ref", "return", "self", "Self", "static", "struct", "super", "trait", "true", "try", "type", "typeof", "unsafe", "unsized", "use", "virtual", "where", "while", "yield" ],
                    literal: [ "true", "false", "Some", "None", "Ok", "Err" ],
                    built_in: u
                },
                illegal: "</",
                contains: [ e.C_LINE_COMMENT_MODE, e.COMMENT("/\\*", "\\*/", {
                    contains: [ "self" ]
                }), e.inherit(e.QUOTE_STRING_MODE, {
                    begin: /b?"/,
                    illegal: null
                }), {
                    className: "string",
                    variants: [ {
                        begin: /b?r(#*)"(.|\n)*?"\1(?!#)/
                    }, {
                        begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
                    } ]
                }, {
                    className: "symbol",
                    begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
                }, {
                    className: "number",
                    variants: [ {
                        begin: "\\b0b([01_]+)" + r
                    }, {
                        begin: "\\b0o([0-7_]+)" + r
                    }, {
                        begin: "\\b0x([A-Fa-f0-9_]+)" + r
                    }, {
                        begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + r
                    } ],
                    relevance: 0
                }, {
                    begin: [ /fn/, /\s+/, e.UNDERSCORE_IDENT_RE ],
                    className: {
                        1: "keyword",
                        3: "title.function"
                    }
                }, {
                    className: "meta",
                    begin: "#!?\\[",
                    end: "\\]",
                    contains: [ {
                        className: "string",
                        begin: /"/,
                        end: /"/
                    } ]
                }, {
                    begin: [ /let/, /\s+/, /(?:mut\s+)?/, e.UNDERSCORE_IDENT_RE ],
                    className: {
                        1: "keyword",
                        3: "keyword",
                        4: "variable"
                    }
                }, {
                    begin: [ /for/, /\s+/, e.UNDERSCORE_IDENT_RE, /\s+/, /in/ ],
                    className: {
                        1: "keyword",
                        3: "variable",
                        5: "keyword"
                    }
                }, {
                    begin: [ /type/, /\s+/, e.UNDERSCORE_IDENT_RE ],
                    className: {
                        1: "keyword",
                        3: "title.class"
                    }
                }, {
                    begin: [ /(?:trait|enum|struct|union|impl|for)/, /\s+/, e.UNDERSCORE_IDENT_RE ],
                    className: {
                        1: "keyword",
                        3: "title.class"
                    }
                }, {
                    begin: e.IDENT_RE + "::",
                    keywords: {
                        keyword: "Self",
                        built_in: u,
                        type: a
                    }
                }, {
                    className: "punctuation",
                    begin: "->"
                }, n ]
            };
        })), Ju.registerLanguage("scss", (function(e) {
            var t = function(e) {
                return {
                    IMPORTANT: {
                        scope: "meta",
                        begin: "!important"
                    },
                    BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE,
                    HEXCOLOR: {
                        scope: "number",
                        begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
                    },
                    FUNCTION_DISPATCH: {
                        className: "built_in",
                        begin: /[\w-]+(?=\()/
                    },
                    ATTRIBUTE_SELECTOR_MODE: {
                        scope: "selector-attr",
                        begin: /\[/,
                        end: /\]/,
                        illegal: "$",
                        contains: [ e.APOS_STRING_MODE, e.QUOTE_STRING_MODE ]
                    },
                    CSS_NUMBER_MODE: {
                        scope: "number",
                        begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
                        relevance: 0
                    },
                    CSS_VARIABLE: {
                        className: "attr",
                        begin: /--[A-Za-z][A-Za-z0-9_-]*/
                    }
                };
            }(e), n = pu, r = du, u = "@[a-z-]+", a = {
                className: "variable",
                begin: "(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b",
                relevance: 0
            };
            return {
                name: "SCSS",
                case_insensitive: !0,
                illegal: "[=/|']",
                contains: [ e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, t.CSS_NUMBER_MODE, {
                    className: "selector-id",
                    begin: "#[A-Za-z0-9_-]+",
                    relevance: 0
                }, {
                    className: "selector-class",
                    begin: "\\.[A-Za-z0-9_-]+",
                    relevance: 0
                }, t.ATTRIBUTE_SELECTOR_MODE, {
                    className: "selector-tag",
                    begin: "\\b(" + su.join("|") + ")\\b",
                    relevance: 0
                }, {
                    className: "selector-pseudo",
                    begin: ":(" + r.join("|") + ")"
                }, {
                    className: "selector-pseudo",
                    begin: ":(:)?(" + n.join("|") + ")"
                }, a, {
                    begin: /\(/,
                    end: /\)/,
                    contains: [ t.CSS_NUMBER_MODE ]
                }, t.CSS_VARIABLE, {
                    className: "attribute",
                    begin: "\\b(" + fu.join("|") + ")\\b"
                }, {
                    begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
                }, {
                    begin: /:/,
                    end: /[;}{]/,
                    relevance: 0,
                    contains: [ t.BLOCK_COMMENT, a, t.HEXCOLOR, t.CSS_NUMBER_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, t.IMPORTANT, t.FUNCTION_DISPATCH ]
                }, {
                    begin: "@(page|font-face)",
                    keywords: {
                        $pattern: u,
                        keyword: "@page @font-face"
                    }
                }, {
                    begin: "@",
                    end: "[{;]",
                    returnBegin: !0,
                    keywords: {
                        $pattern: /[a-z-]+/,
                        keyword: "and or not only",
                        attribute: cu.join(" ")
                    },
                    contains: [ {
                        begin: u,
                        className: "keyword"
                    }, {
                        begin: /[a-z-]+(?=:)/,
                        className: "attribute"
                    }, a, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, t.HEXCOLOR, t.CSS_NUMBER_MODE ]
                }, t.FUNCTION_DISPATCH ]
            };
        })), Ju.registerLanguage("shell", (function(e) {
            return {
                name: "Shell Session",
                aliases: [ "console", "shellsession" ],
                contains: [ {
                    className: "meta.prompt",
                    begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,
                    starts: {
                        end: /[^\\](?=\s*$)/,
                        subLanguage: "bash"
                    }
                } ]
            };
        })), Ju.registerLanguage("sql", (function(e) {
            var t = e.regex, n = e.COMMENT("--", "$"), r = [ "true", "false", "unknown" ], u = [ "bigint", "binary", "blob", "boolean", "char", "character", "clob", "date", "dec", "decfloat", "decimal", "float", "int", "integer", "interval", "nchar", "nclob", "national", "numeric", "real", "row", "smallint", "time", "timestamp", "varchar", "varying", "varbinary" ], a = [ "abs", "acos", "array_agg", "asin", "atan", "avg", "cast", "ceil", "ceiling", "coalesce", "corr", "cos", "cosh", "count", "covar_pop", "covar_samp", "cume_dist", "dense_rank", "deref", "element", "exp", "extract", "first_value", "floor", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "last_value", "lead", "listagg", "ln", "log", "log10", "lower", "max", "min", "mod", "nth_value", "ntile", "nullif", "percent_rank", "percentile_cont", "percentile_disc", "position", "position_regex", "power", "rank", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "row_number", "sin", "sinh", "sqrt", "stddev_pop", "stddev_samp", "substring", "substring_regex", "sum", "tan", "tanh", "translate", "translate_regex", "treat", "trim", "trim_array", "unnest", "upper", "value_of", "var_pop", "var_samp", "width_bucket" ], i = [ "create table", "insert into", "primary key", "foreign key", "not null", "alter table", "add constraint", "grouping sets", "on overflow", "character set", "respect nulls", "ignore nulls", "nulls first", "nulls last", "depth first", "breadth first" ], o = a, l = [].concat([ "abs", "acos", "all", "allocate", "alter", "and", "any", "are", "array", "array_agg", "array_max_cardinality", "as", "asensitive", "asin", "asymmetric", "at", "atan", "atomic", "authorization", "avg", "begin", "begin_frame", "begin_partition", "between", "bigint", "binary", "blob", "boolean", "both", "by", "call", "called", "cardinality", "cascaded", "case", "cast", "ceil", "ceiling", "char", "char_length", "character", "character_length", "check", "classifier", "clob", "close", "coalesce", "collate", "collect", "column", "commit", "condition", "connect", "constraint", "contains", "convert", "copy", "corr", "corresponding", "cos", "cosh", "count", "covar_pop", "covar_samp", "create", "cross", "cube", "cume_dist", "current", "current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_row", "current_schema", "current_time", "current_timestamp", "current_path", "current_role", "current_transform_group_for_type", "current_user", "cursor", "cycle", "date", "day", "deallocate", "dec", "decimal", "decfloat", "declare", "default", "define", "delete", "dense_rank", "deref", "describe", "deterministic", "disconnect", "distinct", "double", "drop", "dynamic", "each", "element", "else", "empty", "end", "end_frame", "end_partition", "end-exec", "equals", "escape", "every", "except", "exec", "execute", "exists", "exp", "external", "extract", "false", "fetch", "filter", "first_value", "float", "floor", "for", "foreign", "frame_row", "free", "from", "full", "function", "fusion", "get", "global", "grant", "group", "grouping", "groups", "having", "hold", "hour", "identity", "in", "indicator", "initial", "inner", "inout", "insensitive", "insert", "int", "integer", "intersect", "intersection", "interval", "into", "is", "join", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "language", "large", "last_value", "lateral", "lead", "leading", "left", "like", "like_regex", "listagg", "ln", "local", "localtime", "localtimestamp", "log", "log10", "lower", "match", "match_number", "match_recognize", "matches", "max", "member", "merge", "method", "min", "minute", "mod", "modifies", "module", "month", "multiset", "national", "natural", "nchar", "nclob", "new", "no", "none", "normalize", "not", "nth_value", "ntile", "null", "nullif", "numeric", "octet_length", "occurrences_regex", "of", "offset", "old", "omit", "on", "one", "only", "open", "or", "order", "out", "outer", "over", "overlaps", "overlay", "parameter", "partition", "pattern", "per", "percent", "percent_rank", "percentile_cont", "percentile_disc", "period", "portion", "position", "position_regex", "power", "precedes", "precision", "prepare", "primary", "procedure", "ptf", "range", "rank", "reads", "real", "recursive", "ref", "references", "referencing", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "release", "result", "return", "returns", "revoke", "right", "rollback", "rollup", "row", "row_number", "rows", "running", "savepoint", "scope", "scroll", "search", "second", "seek", "select", "sensitive", "session_user", "set", "show", "similar", "sin", "sinh", "skip", "smallint", "some", "specific", "specifictype", "sql", "sqlexception", "sqlstate", "sqlwarning", "sqrt", "start", "static", "stddev_pop", "stddev_samp", "submultiset", "subset", "substring", "substring_regex", "succeeds", "sum", "symmetric", "system", "system_time", "system_user", "table", "tablesample", "tan", "tanh", "then", "time", "timestamp", "timezone_hour", "timezone_minute", "to", "trailing", "translate", "translate_regex", "translation", "treat", "trigger", "trim", "trim_array", "true", "truncate", "uescape", "union", "unique", "unknown", "unnest", "update", "upper", "user", "using", "value", "values", "value_of", "var_pop", "var_samp", "varbinary", "varchar", "varying", "versioning", "when", "whenever", "where", "width_bucket", "window", "with", "within", "without", "year" ], [ "add", "asc", "collation", "desc", "final", "first", "last", "view" ]).filter((function(e) {
                return !a.includes(e);
            })), s = {
                begin: t.concat(/\b/, t.either.apply(t, o), /\s*\(/),
                relevance: 0,
                keywords: {
                    built_in: o
                }
            };
            return {
                name: "SQL",
                case_insensitive: !0,
                illegal: /[{}]|<\//,
                keywords: {
                    $pattern: /\b[\w\.]+/,
                    keyword: function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = t.exceptions, r = t.when, u = r;
                        return n = n || [], e.map((function(e) {
                            return e.match(/\|\d+$/) || n.includes(e) ? e : u(e) ? "".concat(e, "|0") : e;
                        }));
                    }(l, {
                        when: function(e) {
                            return e.length < 3;
                        }
                    }),
                    literal: r,
                    type: u,
                    built_in: [ "current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_schema", "current_transform_group_for_type", "current_user", "session_user", "system_time", "system_user", "current_time", "localtime", "current_timestamp", "localtimestamp" ]
                },
                contains: [ {
                    begin: t.either.apply(t, i),
                    relevance: 0,
                    keywords: {
                        $pattern: /[\w\.]+/,
                        keyword: l.concat(i),
                        literal: r,
                        type: u
                    }
                }, {
                    className: "type",
                    begin: t.either.apply(t, [ "double precision", "large object", "with timezone", "without timezone" ])
                }, s, {
                    className: "variable",
                    begin: /@[a-z0-9]+/
                }, {
                    className: "string",
                    variants: [ {
                        begin: /'/,
                        end: /'/,
                        contains: [ {
                            begin: /''/
                        } ]
                    } ]
                }, {
                    begin: /"/,
                    end: /"/,
                    contains: [ {
                        begin: /""/
                    } ]
                }, e.C_NUMBER_MODE, e.C_BLOCK_COMMENT_MODE, n, {
                    className: "operator",
                    begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
                    relevance: 0
                } ]
            };
        })), Ju.registerLanguage("swift", (function(e) {
            var t = {
                match: /\s+/,
                relevance: 0
            }, n = e.COMMENT("/\\*", "\\*/", {
                contains: [ "self" ]
            }), r = [ e.C_LINE_COMMENT_MODE, n ], u = {
                match: [ /\./, bu.apply(void 0, T(Eu).concat(T(yu))) ],
                className: {
                    2: "keyword"
                }
            }, a = {
                match: hu(/\./, bu.apply(void 0, Cu)),
                relevance: 0
            }, i = Cu.filter((function(e) {
                return "string" == typeof e;
            })).concat([ "_|0" ]), o = Cu.filter((function(e) {
                return "string" != typeof e;
            })).concat(_u).map(vu), l = {
                variants: [ {
                    className: "keyword",
                    match: bu.apply(void 0, T(o).concat(T(yu)))
                } ]
            }, s = {
                $pattern: bu(/\b\w+/, /#\w+/),
                keyword: i.concat(xu),
                literal: Fu
            }, c = [ u, a, l ], p = [ {
                match: hu(/\./, bu.apply(void 0, wu)),
                relevance: 0
            }, {
                className: "built_in",
                match: hu(/\b/, bu.apply(void 0, wu), /(?=\()/)
            } ], f = {
                match: /->/,
                relevance: 0
            }, D = [ f, {
                className: "operator",
                relevance: 0,
                variants: [ {
                    match: Su
                }, {
                    match: "\\.(\\.|".concat(Bu, ")+")
                } ]
            } ], g = "([0-9]_*)+", h = "([0-9a-fA-F]_*)+", m = {
                className: "number",
                relevance: 0,
                variants: [ {
                    match: "\\b(".concat(g, ")(\\.(").concat(g, "))?") + "([eE][+-]?(".concat(g, "))?\\b")
                }, {
                    match: "\\b0x(".concat(h, ")(\\.(").concat(h, "))?") + "([pP][+-]?(".concat(g, "))?\\b")
                }, {
                    match: /\b0o([0-7]_*)+\b/
                }, {
                    match: /\b0b([01]_*)+\b/
                } ]
            }, b = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                return {
                    className: "subst",
                    variants: [ {
                        match: hu(/\\/, e, /[0\\tnr"']/)
                    }, {
                        match: hu(/\\/, e, /u\{[0-9a-fA-F]{1,8}\}/)
                    } ]
                };
            }, v = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                return {
                    className: "subst",
                    match: hu(/\\/, e, /[\t ]*(?:[\r\n]|\r\n)/)
                };
            }, E = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                return {
                    className: "subst",
                    label: "interpol",
                    begin: hu(/\\/, e, /\(/),
                    end: /\)/
                };
            }, y = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                return {
                    begin: hu(e, /"""/),
                    end: hu(/"""/, e),
                    contains: [ b(e), v(e), E(e) ]
                };
            }, _ = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                return {
                    begin: hu(e, /"/),
                    end: hu(/"/, e),
                    contains: [ b(e), E(e) ]
                };
            }, C = {
                className: "string",
                variants: [ y(), y("#"), y("##"), y("###"), _(), _("#"), _("##"), _("###") ]
            }, F = {
                match: hu(/`/, Tu, /`/)
            }, A = [ F, {
                className: "variable",
                match: /\$\d+/
            }, {
                className: "variable",
                match: "\\$".concat(Ou, "+")
            } ], x = [ {
                match: /(@|#(un)?)available/,
                className: "keyword",
                starts: {
                    contains: [ {
                        begin: /\(/,
                        end: /\)/,
                        keywords: Iu,
                        contains: [].concat(D, [ m, C ])
                    } ]
                }
            }, {
                className: "keyword",
                match: hu(/@/, bu.apply(void 0, Lu))
            }, {
                className: "meta",
                match: hu(/@/, Tu)
            } ], w = {
                match: gu(/\b[A-Z]/),
                relevance: 0,
                contains: [ {
                    className: "type",
                    match: hu(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/, Ou, "+")
                }, {
                    className: "type",
                    match: Mu,
                    relevance: 0
                }, {
                    match: /[?!]+/,
                    relevance: 0
                }, {
                    match: /\.\.\./,
                    relevance: 0
                }, {
                    match: hu(/\s+&\s+/, gu(Mu)),
                    relevance: 0
                } ]
            }, k = {
                begin: /</,
                end: />/,
                keywords: s,
                contains: [].concat(r, c, x, [ f, w ])
            };
            w.contains.push(k);
            var B, S = {
                begin: /\(/,
                end: /\)/,
                relevance: 0,
                keywords: s,
                contains: [ "self", {
                    match: hu(Tu, /\s*:/),
                    keywords: "_|0",
                    relevance: 0
                } ].concat(r, c, p, D, [ m, C ], A, x, [ w ])
            }, N = {
                begin: /</,
                end: />/,
                contains: [].concat(r, [ w ])
            }, O = {
                begin: /\(/,
                end: /\)/,
                keywords: s,
                contains: [ {
                    begin: bu(gu(hu(Tu, /\s*:/)), gu(hu(Tu, /\s+/, Tu, /\s*:/))),
                    end: /:/,
                    relevance: 0,
                    contains: [ {
                        className: "keyword",
                        match: /\b_\b/
                    }, {
                        className: "params",
                        match: Tu
                    } ]
                } ].concat(r, c, D, [ m, C ], x, [ w, S ]),
                endsParent: !0,
                illegal: /["']/
            }, M = {
                match: [ /func/, /\s+/, bu(F.match, Tu, Su) ],
                className: {
                    1: "keyword",
                    3: "title.function"
                },
                contains: [ N, O, t ],
                illegal: [ /\[/, /%/ ]
            }, L = {
                match: [ /\b(?:subscript|init[?!]?)/, /\s*(?=[<(])/ ],
                className: {
                    1: "keyword"
                },
                contains: [ N, O, t ],
                illegal: /\[|%/
            }, I = {
                match: [ /operator/, /\s+/, Su ],
                className: {
                    1: "keyword",
                    3: "title"
                }
            }, R = {
                begin: [ /precedencegroup/, /\s+/, Mu ],
                className: {
                    1: "keyword",
                    3: "title"
                },
                contains: [ w ],
                keywords: [].concat(Au, Fu),
                end: /}/
            }, P = d(C.variants);
            try {
                for (P.s(); !(B = P.n()).done; ) {
                    var j = B.value.contains.find((function(e) {
                        return "interpol" === e.label;
                    }));
                    j.keywords = s;
                    var z = [].concat(c, p, D, [ m, C ], A);
                    j.contains = [].concat(T(z), [ {
                        begin: /\(/,
                        end: /\)/,
                        contains: [ "self" ].concat(T(z))
                    } ]);
                }
            } catch (e) {
                P.e(e);
            } finally {
                P.f();
            }
            return {
                name: "Swift",
                keywords: s,
                contains: [].concat(r, [ M, L, {
                    beginKeywords: "struct protocol class extension enum actor",
                    end: "\\{",
                    excludeEnd: !0,
                    keywords: s,
                    contains: [ e.inherit(e.TITLE_MODE, {
                        className: "title.class",
                        begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
                    }) ].concat(c)
                }, I, R, {
                    beginKeywords: "import",
                    end: /$/,
                    contains: [].concat(r),
                    relevance: 0
                } ], c, p, D, [ m, C ], A, x, [ w, S ])
            };
        })), Ju.registerLanguage("typescript", (function(e) {
            var t = function(e) {
                var t = e.regex, n = Ru, a = {
                    begin: /<[A-Za-z0-9\\._:-]+/,
                    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
                    isTrulyOpeningTag: function(e, t) {
                        var n = e[0].length + e.index, r = e.input[n];
                        if ("<" !== r && "," !== r) {
                            var u;
                            ">" === r && (function(e, t) {
                                var n = t.after, r = "</" + e[0].slice(1);
                                return -1 !== e.input.indexOf(r, n);
                            }(e, {
                                after: n
                            }) || t.ignoreMatch());
                            var a = e.input.substring(n);
                            (a.match(/^\s*=/) || (u = a.match(/^\s+extends\s+/)) && 0 === u.index) && t.ignoreMatch();
                        } else t.ignoreMatch();
                    }
                }, i = {
                    $pattern: Ru,
                    keyword: Pu,
                    literal: ju,
                    built_in: $u,
                    "variable.language": Hu
                }, o = "[0-9](_?[0-9])*", l = "\\.(".concat(o, ")"), s = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", c = {
                    className: "number",
                    variants: [ {
                        begin: "(\\b(".concat(s, ")((").concat(l, ")|\\.)?|(").concat(l, "))") + "[eE][+-]?(".concat(o, ")\\b")
                    }, {
                        begin: "\\b(".concat(s, ")\\b((").concat(l, ")\\b|\\.)?|(").concat(l, ")\\b")
                    }, {
                        begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
                    }, {
                        begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
                    }, {
                        begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
                    }, {
                        begin: "\\b0[oO][0-7](_?[0-7])*n?\\b"
                    }, {
                        begin: "\\b0[0-7]+n?\\b"
                    } ],
                    relevance: 0
                }, d = {
                    className: "subst",
                    begin: "\\$\\{",
                    end: "\\}",
                    keywords: i,
                    contains: []
                }, p = {
                    begin: "html`",
                    end: "",
                    starts: {
                        end: "`",
                        returnEnd: !1,
                        contains: [ e.BACKSLASH_ESCAPE, d ],
                        subLanguage: "xml"
                    }
                }, f = {
                    begin: "css`",
                    end: "",
                    starts: {
                        end: "`",
                        returnEnd: !1,
                        contains: [ e.BACKSLASH_ESCAPE, d ],
                        subLanguage: "css"
                    }
                }, D = {
                    className: "string",
                    begin: "`",
                    end: "`",
                    contains: [ e.BACKSLASH_ESCAPE, d ]
                }, g = {
                    className: "comment",
                    variants: [ e.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
                        relevance: 0,
                        contains: [ {
                            begin: "(?=@[A-Za-z]+)",
                            relevance: 0,
                            contains: [ {
                                className: "doctag",
                                begin: "@[A-Za-z]+"
                            }, {
                                className: "type",
                                begin: "\\{",
                                end: "\\}",
                                excludeEnd: !0,
                                excludeBegin: !0,
                                relevance: 0
                            }, {
                                className: "variable",
                                begin: n + "(?=\\s*(-)|$)",
                                endsParent: !0,
                                relevance: 0
                            }, {
                                begin: /(?=[^\n])\s/,
                                relevance: 0
                            } ]
                        } ]
                    }), e.C_BLOCK_COMMENT_MODE, e.C_LINE_COMMENT_MODE ]
                }, h = [ e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, p, f, D, {
                    match: /\$\d+/
                }, c ];
                d.contains = h.concat({
                    begin: /\{/,
                    end: /\}/,
                    keywords: i,
                    contains: [ "self" ].concat(h)
                });
                var m = [].concat(g, d.contains), b = m.concat([ {
                    begin: /\(/,
                    end: /\)/,
                    keywords: i,
                    contains: [ "self" ].concat(m)
                } ]), v = {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: i,
                    contains: b
                }, E = {
                    variants: [ {
                        match: [ /class/, /\s+/, n, /\s+/, /extends/, /\s+/, t.concat(n, "(", t.concat(/\./, n), ")*") ],
                        scope: {
                            1: "keyword",
                            3: "title.class",
                            5: "keyword",
                            7: "title.class.inherited"
                        }
                    }, {
                        match: [ /class/, /\s+/, n ],
                        scope: {
                            1: "keyword",
                            3: "title.class"
                        }
                    } ]
                }, y = {
                    relevance: 0,
                    match: t.either(/\bJSON/, /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/, /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/, /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
                    className: "title.class",
                    keywords: {
                        _: [].concat(zu, Uu)
                    }
                }, _ = {
                    variants: [ {
                        match: [ /function/, /\s+/, n, /(?=\s*\()/ ]
                    }, {
                        match: [ /function/, /\s*(?=\()/ ]
                    } ],
                    className: {
                        1: "keyword",
                        3: "title.function"
                    },
                    label: "func.def",
                    contains: [ v ],
                    illegal: /%/
                }, C = {
                    match: t.concat(/\b/, function(e) {
                        return t.concat("(?!", e.join("|"), ")");
                    }([].concat(qu, [ "super", "import" ])), n, t.lookahead(/\(/)),
                    className: "title.function",
                    relevance: 0
                }, F = {
                    begin: t.concat(/\./, t.lookahead(t.concat(n, /(?![0-9A-Za-z$_(])/))),
                    end: n,
                    excludeBegin: !0,
                    keywords: "prototype",
                    className: "property",
                    relevance: 0
                }, A = {
                    match: [ /get|set/, /\s+/, n, /(?=\()/ ],
                    className: {
                        1: "keyword",
                        3: "title.function"
                    },
                    contains: [ {
                        begin: /\(\)/
                    }, v ]
                }, x = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", w = {
                    match: [ /const|var|let/, /\s+/, n, /\s*/, /=\s*/, /(async\s*)?/, t.lookahead(x) ],
                    keywords: "async",
                    className: {
                        1: "keyword",
                        3: "title.function"
                    },
                    contains: [ v ]
                };
                return {
                    name: "Javascript",
                    aliases: [ "js", "jsx", "mjs", "cjs" ],
                    keywords: i,
                    exports: {
                        PARAMS_CONTAINS: b,
                        CLASS_REFERENCE: y
                    },
                    illegal: /#(?![$_A-z])/,
                    contains: [ e.SHEBANG({
                        label: "shebang",
                        binary: "node",
                        relevance: 5
                    }), {
                        label: "use_strict",
                        className: "meta",
                        relevance: 10,
                        begin: /^\s*['"]use (strict|asm)['"]/
                    }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, p, f, D, g, {
                        match: /\$\d+/
                    }, c, y, {
                        className: "attr",
                        begin: n + t.lookahead(":"),
                        relevance: 0
                    }, w, {
                        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
                        keywords: "return throw case",
                        relevance: 0,
                        contains: [ g, e.REGEXP_MODE, {
                            className: "function",
                            begin: x,
                            returnBegin: !0,
                            end: "\\s*=>",
                            contains: [ {
                                className: "params",
                                variants: [ {
                                    begin: e.UNDERSCORE_IDENT_RE,
                                    relevance: 0
                                }, {
                                    className: null,
                                    begin: /\(\s*\)/,
                                    skip: !0
                                }, {
                                    begin: /\(/,
                                    end: /\)/,
                                    excludeBegin: !0,
                                    excludeEnd: !0,
                                    keywords: i,
                                    contains: b
                                } ]
                            } ]
                        }, {
                            begin: /,/,
                            relevance: 0
                        }, {
                            match: /\s+/,
                            relevance: 0
                        }, {
                            variants: [ {
                                begin: "<>",
                                end: "</>"
                            }, {
                                match: /<[A-Za-z0-9\\._:-]+\s*\/>/
                            }, {
                                begin: a.begin,
                                "on:begin": a.isTrulyOpeningTag,
                                end: a.end
                            } ],
                            subLanguage: "xml",
                            contains: [ {
                                begin: a.begin,
                                end: a.end,
                                skip: !0,
                                contains: [ "self" ]
                            } ]
                        } ]
                    }, _, {
                        beginKeywords: "while if switch catch for"
                    }, {
                        begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
                        returnBegin: !0,
                        label: "func.def",
                        contains: [ v, e.inherit(e.TITLE_MODE, {
                            begin: n,
                            className: "title.function"
                        }) ]
                    }, {
                        match: /\.\.\./,
                        relevance: 0
                    }, F, {
                        match: "\\$" + n,
                        relevance: 0
                    }, {
                        match: [ /\bconstructor(?=\s*\()/ ],
                        className: {
                            1: "title.function"
                        },
                        contains: [ v ]
                    }, C, {
                        relevance: 0,
                        match: /\b[A-Z][A-Z_0-9]+\b/,
                        className: "variable.constant"
                    }, E, A, {
                        match: /\$[(.]/
                    } ]
                };
            }(e), n = [ "any", "void", "number", "boolean", "string", "object", "never", "symbol", "bigint", "unknown" ], r = {
                beginKeywords: "namespace",
                end: /\{/,
                excludeEnd: !0,
                contains: [ t.exports.CLASS_REFERENCE ]
            }, u = {
                beginKeywords: "interface",
                end: /\{/,
                excludeEnd: !0,
                keywords: {
                    keyword: "interface extends",
                    built_in: n
                },
                contains: [ t.exports.CLASS_REFERENCE ]
            }, a = {
                $pattern: Ru,
                keyword: Pu.concat([ "type", "namespace", "interface", "public", "private", "protected", "implements", "declare", "abstract", "readonly", "enum", "override" ]),
                literal: ju,
                built_in: $u.concat(n),
                "variable.language": Hu
            }, i = {
                className: "meta",
                begin: "@[A-Za-z$_][0-9A-Za-z$_]*"
            }, o = function(e, t, n) {
                var r = e.contains.findIndex((function(e) {
                    return e.label === t;
                }));
                if (-1 === r) throw new Error("can not find mode to replace");
                e.contains.splice(r, 1, n);
            };
            return Object.assign(t.keywords, a), t.exports.PARAMS_CONTAINS.push(i), t.contains = t.contains.concat([ i, r, u ]), 
            o(t, "shebang", e.SHEBANG()), o(t, "use_strict", {
                className: "meta",
                relevance: 10,
                begin: /^\s*['"]use strict['"]/
            }), t.contains.find((function(e) {
                return "func.def" === e.label;
            })).relevance = 0, Object.assign(t, {
                name: "TypeScript",
                aliases: [ "ts", "tsx" ]
            }), t;
        })), Ju.registerLanguage("vbnet", (function(e) {
            var t = e.regex, n = /\d{1,2}\/\d{1,2}\/\d{4}/, r = /\d{4}-\d{1,2}-\d{1,2}/, u = /(\d|1[012])(:\d+){0,2} *(AM|PM)/, a = /\d{1,2}(:\d{1,2}){1,2}/, i = {
                className: "literal",
                variants: [ {
                    begin: t.concat(/# */, t.either(r, n), / *#/)
                }, {
                    begin: t.concat(/# */, a, / *#/)
                }, {
                    begin: t.concat(/# */, u, / *#/)
                }, {
                    begin: t.concat(/# */, t.either(r, n), / +/, t.either(u, a), / *#/)
                } ]
            }, o = e.COMMENT(/'''/, /$/, {
                contains: [ {
                    className: "doctag",
                    begin: /<\/?/,
                    end: />/
                } ]
            }), l = e.COMMENT(null, /$/, {
                variants: [ {
                    begin: /'/
                }, {
                    begin: /([\t ]|^)REM(?=\s)/
                } ]
            });
            return {
                name: "Visual Basic .NET",
                aliases: [ "vb" ],
                case_insensitive: !0,
                classNameAliases: {
                    label: "symbol"
                },
                keywords: {
                    keyword: "addhandler alias aggregate ansi as async assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into iterator join key let lib loop me mid module mustinherit mustoverride mybase myclass namespace narrowing new next notinheritable notoverridable of off on operator option optional order overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly yield",
                    built_in: "addressof and andalso await directcast gettype getxmlnamespace is isfalse isnot istrue like mod nameof new not or orelse trycast typeof xor cbool cbyte cchar cdate cdbl cdec cint clng cobj csbyte cshort csng cstr cuint culng cushort",
                    type: "boolean byte char date decimal double integer long object sbyte short single string uinteger ulong ushort",
                    literal: "true false nothing"
                },
                illegal: "//|\\{|\\}|endif|gosub|variant|wend|^\\$ ",
                contains: [ {
                    className: "string",
                    begin: /"(""|[^/n])"C\b/
                }, {
                    className: "string",
                    begin: /"/,
                    end: /"/,
                    illegal: /\n/,
                    contains: [ {
                        begin: /""/
                    } ]
                }, i, {
                    className: "number",
                    relevance: 0,
                    variants: [ {
                        begin: /\b\d[\d_]*((\.[\d_]+(E[+-]?[\d_]+)?)|(E[+-]?[\d_]+))[RFD@!#]?/
                    }, {
                        begin: /\b\d[\d_]*((U?[SIL])|[%&])?/
                    }, {
                        begin: /&H[\dA-F_]+((U?[SIL])|[%&])?/
                    }, {
                        begin: /&O[0-7_]+((U?[SIL])|[%&])?/
                    }, {
                        begin: /&B[01_]+((U?[SIL])|[%&])?/
                    } ]
                }, {
                    className: "label",
                    begin: /^\w+:/
                }, o, l, {
                    className: "meta",
                    begin: /[\t ]*#(const|disable|else|elseif|enable|end|externalsource|if|region)\b/,
                    end: /$/,
                    keywords: {
                        keyword: "const disable else elseif enable end externalsource if region then"
                    },
                    contains: [ l ]
                } ]
            };
        })), Ju.registerLanguage("wasm", (function(e) {
            e.regex;
            var t = e.COMMENT(/\(;/, /;\)/);
            return t.contains.push("self"), {
                name: "WebAssembly",
                keywords: {
                    $pattern: /[\w.]+/,
                    keyword: [ "anyfunc", "block", "br", "br_if", "br_table", "call", "call_indirect", "data", "drop", "elem", "else", "end", "export", "func", "global.get", "global.set", "local.get", "local.set", "local.tee", "get_global", "get_local", "global", "if", "import", "local", "loop", "memory", "memory.grow", "memory.size", "module", "mut", "nop", "offset", "param", "result", "return", "select", "set_global", "set_local", "start", "table", "tee_local", "then", "type", "unreachable" ]
                },
                contains: [ e.COMMENT(/;;/, /$/), t, {
                    match: [ /(?:offset|align)/, /\s*/, /=/ ],
                    className: {
                        1: "keyword",
                        3: "operator"
                    }
                }, {
                    className: "variable",
                    begin: /\$[\w_]+/
                }, {
                    match: /(\((?!;)|\))+/,
                    className: "punctuation",
                    relevance: 0
                }, {
                    begin: [ /(?:func|call|call_indirect)/, /\s+/, /\$[^\s)]+/ ],
                    className: {
                        1: "keyword",
                        3: "title.function"
                    }
                }, e.QUOTE_STRING_MODE, {
                    match: /(i32|i64|f32|f64)(?!\.)/,
                    className: "type"
                }, {
                    className: "keyword",
                    match: /\b(f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))\b/
                }, {
                    className: "number",
                    relevance: 0,
                    match: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/
                } ]
            };
        })), Ju.registerLanguage("xml", (function(e) {
            var t = e.regex, n = t.concat(/(?:[A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/, t.optional(/(?:[\x2D\.0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])*:/), /(?:[\x2D\.0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])*/), r = {
                className: "symbol",
                begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
            }, u = {
                begin: /\s/,
                contains: [ {
                    className: "keyword",
                    begin: /#?[a-z_][a-z1-9_-]+/,
                    illegal: /\n/
                } ]
            }, a = e.inherit(u, {
                begin: /\(/,
                end: /\)/
            }), i = e.inherit(e.APOS_STRING_MODE, {
                className: "string"
            }), o = e.inherit(e.QUOTE_STRING_MODE, {
                className: "string"
            }), l = {
                endsWithParent: !0,
                illegal: /</,
                relevance: 0,
                contains: [ {
                    className: "attr",
                    begin: /(?:[\x2D\.0-:A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])+/,
                    relevance: 0
                }, {
                    begin: /=\s*/,
                    relevance: 0,
                    contains: [ {
                        className: "string",
                        endsParent: !0,
                        variants: [ {
                            begin: /"/,
                            end: /"/,
                            contains: [ r ]
                        }, {
                            begin: /'/,
                            end: /'/,
                            contains: [ r ]
                        }, {
                            begin: /[^\s"'=<>`]+/
                        } ]
                    } ]
                } ]
            };
            return {
                name: "HTML, XML",
                aliases: [ "html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist", "wsf", "svg" ],
                case_insensitive: !0,
                unicodeRegex: !0,
                contains: [ {
                    className: "meta",
                    begin: /<![a-z]/,
                    end: />/,
                    relevance: 10,
                    contains: [ u, o, i, a, {
                        begin: /\[/,
                        end: /\]/,
                        contains: [ {
                            className: "meta",
                            begin: /<![a-z]/,
                            end: />/,
                            contains: [ u, a, o, i ]
                        } ]
                    } ]
                }, e.COMMENT(/<!--/, /-->/, {
                    relevance: 10
                }), {
                    begin: /<!\[CDATA\[/,
                    end: /\]\]>/,
                    relevance: 10
                }, r, {
                    className: "meta",
                    end: /\?>/,
                    variants: [ {
                        begin: /<\?xml/,
                        relevance: 10,
                        contains: [ o ]
                    }, {
                        begin: /<\?[a-z][a-z0-9]+/
                    } ]
                }, {
                    className: "tag",
                    begin: /<style(?=\s|>)/,
                    end: />/,
                    keywords: {
                        name: "style"
                    },
                    contains: [ l ],
                    starts: {
                        end: /<\/style>/,
                        returnEnd: !0,
                        subLanguage: [ "css", "xml" ]
                    }
                }, {
                    className: "tag",
                    begin: /<script(?=\s|>)/,
                    end: />/,
                    keywords: {
                        name: "script"
                    },
                    contains: [ l ],
                    starts: {
                        end: /<\/script>/,
                        returnEnd: !0,
                        subLanguage: [ "javascript", "handlebars", "xml" ]
                    }
                }, {
                    className: "tag",
                    begin: /<>|<\/>/
                }, {
                    className: "tag",
                    begin: t.concat(/</, t.lookahead(t.concat(n, t.either(/\/>/, />/, /\s/)))),
                    end: /\/?>/,
                    contains: [ {
                        className: "name",
                        begin: n,
                        relevance: 0,
                        starts: l
                    } ]
                }, {
                    className: "tag",
                    begin: t.concat(/<\//, t.lookahead(t.concat(n, />/))),
                    contains: [ {
                        className: "name",
                        begin: n,
                        relevance: 0
                    }, {
                        begin: />/,
                        relevance: 0,
                        endsParent: !0
                    } ]
                } ]
            };
        })), Ju.registerLanguage("yaml", (function(e) {
            var t = "true false yes no null", n = "[\\w#;/?:@&=+$,.~*'()[\\]]+", r = {
                className: "string",
                relevance: 0,
                variants: [ {
                    begin: /'/,
                    end: /'/
                }, {
                    begin: /"/,
                    end: /"/
                }, {
                    begin: /\S+/
                } ],
                contains: [ e.BACKSLASH_ESCAPE, {
                    className: "template-variable",
                    variants: [ {
                        begin: /\{\{/,
                        end: /\}\}/
                    }, {
                        begin: /%\{/,
                        end: /\}/
                    } ]
                } ]
            }, u = e.inherit(r, {
                variants: [ {
                    begin: /'/,
                    end: /'/
                }, {
                    begin: /"/,
                    end: /"/
                }, {
                    begin: /[^\s,{}[\]]+/
                } ]
            }), i = {
                end: ",",
                endsWithParent: !0,
                excludeEnd: !0,
                keywords: t,
                relevance: 0
            }, o = {
                begin: /\{/,
                end: /\}/,
                contains: [ i ],
                illegal: "\\n",
                relevance: 0
            }, l = {
                begin: "\\[",
                end: "\\]",
                contains: [ i ],
                illegal: "\\n",
                relevance: 0
            }, s = [ {
                className: "attr",
                variants: [ {
                    begin: "\\w[\\w :\\/.-]*:(?=[ \t]|$)"
                }, {
                    begin: '"\\w[\\w :\\/.-]*":(?=[ \t]|$)'
                }, {
                    begin: "'\\w[\\w :\\/.-]*':(?=[ \t]|$)"
                } ]
            }, {
                className: "meta",
                begin: "^---\\s*$",
                relevance: 10
            }, {
                className: "string",
                begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
            }, {
                begin: "<%[%=-]?",
                end: "[%-]?%>",
                subLanguage: "ruby",
                excludeBegin: !0,
                excludeEnd: !0,
                relevance: 0
            }, {
                className: "type",
                begin: "!\\w+!" + n
            }, {
                className: "type",
                begin: "!<" + n + ">"
            }, {
                className: "type",
                begin: "!" + n
            }, {
                className: "type",
                begin: "!!" + n
            }, {
                className: "meta",
                begin: "&" + e.UNDERSCORE_IDENT_RE + "$"
            }, {
                className: "meta",
                begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$"
            }, {
                className: "bullet",
                begin: "-(?=[ ]|$)",
                relevance: 0
            }, e.HASH_COMMENT_MODE, {
                beginKeywords: t,
                keywords: {
                    literal: t
                }
            }, {
                className: "number",
                begin: "\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b"
            }, {
                className: "number",
                begin: e.C_NUMBER_RE + "\\b",
                relevance: 0
            }, o, l, r ], c = [].concat(s);
            return c.pop(), c.push(u), i.contains = c, {
                name: "YAML",
                case_insensitive: !0,
                aliases: [ "yml" ],
                contains: s
            };
        }));
        var ea = function(e) {
            if (null == e) return ra;
            if ("string" == typeof e) return function(e) {
                return function(t) {
                    return ra(t) && t.tagName === e;
                };
            }(e);
            if ("object" == typeof e) return function(e) {
                for (var t = [], n = -1; ++n < e.length; ) t[n] = ea(e[n]);
                return na((function() {
                    for (var e = -1, n = arguments.length, r = new Array(n), u = 0; u < n; u++) r[u] = arguments[u];
                    for (;++e < t.length; ) {
                        var a;
                        if ((a = t[e]).call.apply(a, [ this ].concat(r))) return !0;
                    }
                    return !1;
                }));
            }(e);
            if ("function" == typeof e) return na(e);
            throw new Error("Expected function, string, or array as test");
        };
        function na(e) {
            return function(t) {
                for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), u = 1; u < n; u++) r[u - 1] = arguments[u];
                return ra(t) && Boolean(e.call.apply(e, [ this, t ].concat(r)));
            };
        }
        function ra(e) {
            return Boolean(e && "object" == typeof e && "element" === e.type && "string" == typeof e.tagName);
        }
        var ua = function(e, t, n) {
            var r = pn(n);
            if (!e || !e.type || !e.children) throw new Error("Expected parent node");
            if ("number" == typeof t) {
                if (t < 0 || t === Number.POSITIVE_INFINITY) throw new Error("Expected positive finite number as index");
            } else if ((t = e.children.indexOf(t)) < 0) throw new Error("Expected child node or index");
            for (;++t < e.children.length; ) if (r(e.children[t], t, e)) return e.children[t];
            return null;
        }, aa = /\n/g, ia = /[\t ]+/g, oa = ea("br"), la = ea("p"), sa = ea([ "th", "td" ]), ca = ea("tr"), da = ea([ "datalist", "head", "noembed", "noframes", "noscript", "rp", "script", "style", "template", "title", function(e) {
            return Boolean((e.properties || {}).hidden);
        }, function(e) {
            return "dialog" === e.tagName && !(e.properties || {}).open;
        } ]), pa = ea([ "address", "article", "aside", "blockquote", "body", "caption", "center", "dd", "dialog", "dir", "dl", "dt", "div", "figure", "figcaption", "footer", "form,", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "legend", "listing", "main", "menu", "nav", "ol", "p", "plaintext", "pre", "section", "ul", "xmp" ]);
        function fa(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = "children" in e ? e.children : [], r = pa(e), u = ma(e, {
                whitespace: t.whitespace || "normal",
                breakBefore: !1,
                breakAfter: !1
            }), a = [];
            "text" !== e.type && "comment" !== e.type || a.push.apply(a, T(ga(e, {
                whitespace: u,
                breakBefore: !0,
                breakAfter: !0
            })));
            for (var i = -1; ++i < n.length; ) a.push.apply(a, T(Da(n[i], e, {
                whitespace: u,
                breakBefore: i ? void 0 : r,
                breakAfter: i < n.length - 1 ? oa(n[i + 1]) : r
            })));
            var o, l = [];
            for (i = -1; ++i < a.length; ) {
                var s = a[i];
                "number" == typeof s ? void 0 !== o && s > o && (o = s) : s && (void 0 !== o && o > -1 && l.push("\n".repeat(o) || " "), 
                o = -1, l.push(s));
            }
            return l.join("");
        }
        function Da(e, t, n) {
            return "element" === e.type ? function(e, t, n) {
                var r, u, a = ma(e, n), i = e.children || [], o = -1, l = [];
                if (da(e)) return l;
                for (oa(e) || ca(e) && ua(t, e, ca) ? u = "\n" : la(e) ? (r = 2, u = 2) : pa(e) && (r = 1, 
                u = 1); ++o < i.length; ) l = l.concat(Da(i[o], e, {
                    whitespace: a,
                    breakBefore: o ? void 0 : r,
                    breakAfter: o < i.length - 1 ? oa(i[o + 1]) : u
                }));
                return sa(e) && ua(t, e, sa) && l.push("\t"), r && l.unshift(r), u && l.push(u), 
                l;
            }(e, t, n) : "text" === e.type ? "normal" === n.whitespace ? ga(e, n) : function(e) {
                return [ String(e.value) ];
            }(e) : [];
        }
        function ga(e, t) {
            for (var n = String(e.value), r = [], u = [], a = 0; a <= n.length; ) {
                aa.lastIndex = a;
                var i = aa.exec(n), o = i && "index" in i ? i.index : n.length;
                r.push(ha(n.slice(a, o).replace(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, ""), 0 !== a || t.breakBefore, o !== n.length || t.breakAfter)), 
                a = o + 1;
            }
            for (var l, s = -1; ++s < r.length; ) 8203 === r[s].charCodeAt(r[s].length - 1) || s < r.length - 1 && 8203 === r[s + 1].charCodeAt(0) ? (u.push(r[s]), 
            l = void 0) : r[s] ? ("number" == typeof l && u.push(l), u.push(r[s]), l = 0) : 0 !== s && s !== r.length - 1 || u.push(0);
            return u;
        }
        function ha(e, t, n) {
            for (var r, u = [], a = 0; a < e.length; ) {
                ia.lastIndex = a;
                var i = ia.exec(e);
                r = i ? i.index : e.length, a || r || !i || t || u.push(""), a !== r && u.push(e.slice(a, r)), 
                a = i ? r + i[0].length : r;
            }
            return a === r || n || u.push(""), u.join(" ");
        }
        function ma(e, t) {
            if ("element" === e.type) {
                var n = e.properties || {};
                switch (e.tagName) {
                  case "listing":
                  case "plaintext":
                  case "xmp":
                    return "pre";

                  case "nobr":
                    return "nowrap";

                  case "pre":
                    return n.wrap ? "pre-wrap" : "pre";

                  case "td":
                  case "th":
                    return n.noWrap ? "nowrap" : t.whitespace;

                  case "textarea":
                    return "pre-wrap";
                }
            }
            return t.whitespace;
        }
        var ba = {}.hasOwnProperty;
        function va() {
            var e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = t.aliases, r = t.languages, u = t.prefix, a = t.plainText, i = t.ignoreMissing, o = t.subset, l = t.detect, s = "hljs";
            if (n && Ju.registerAlias(n), r) for (e in r) ba.call(r, e) && Ju.registerLanguage(e, r[e]);
            if (u) {
                var c = u.indexOf("-");
                s = c > -1 ? u.slice(0, c) : u;
            }
            return function(e, t) {
                mn(e, "element", (function(e, n, r) {
                    var c = r;
                    if (c && "tagName" in c && "pre" === c.tagName && "code" === e.tagName && e.properties) {
                        var d = Ea(e);
                        if (!(!1 === d || !d && !l || d && a && a.includes(d))) {
                            var p;
                            Array.isArray(e.properties.className) || (e.properties.className = []), e.properties.className.includes(s) || e.properties.className.unshift(s);
                            try {
                                p = d ? Ju.highlight(d, fa(c), {
                                    prefix: u
                                }) : Ju.highlightAuto(fa(c), {
                                    prefix: u,
                                    subset: o
                                });
                            } catch (n) {
                                var f = n;
                                return void (i && /Unknown language/.test(f.message) || t.fail(f, e, "rehype-highlight:missing-language"));
                            }
                            !d && p.data.language && e.properties.className.push("language-" + p.data.language), 
                            Array.isArray(p.children) && p.children.length > 0 && (e.children = p.children);
                        }
                    }
                }));
            };
        }
        function Ea(e) {
            var t = e.properties && e.properties.className, n = -1;
            if (Array.isArray(t)) for (;++n < t.length; ) {
                var r = String(t[n]);
                if ("no-highlight" === r || "nohighlight" === r) return !1;
                if ("lang-" === r.slice(0, 5)) return r.slice(5);
                if ("language-" === r.slice(0, 9)) return r.slice(9);
            }
        }
        var ya, _a = n(184), Ca = [ "node", "inline", "className", "children" ], Fa = function(e) {
            _(n, e);
            var t = w(n);
            function n() {
                var e;
                b(this, n);
                for (var r = arguments.length, u = new Array(r), a = 0; a < r; a++) u[a] = arguments[a];
                return (e = t.call.apply(t, [ this ].concat(u))).state = {
                    copied: !1
                }, e.copyCode = function(t) {
                    if (t.currentTarget) {
                        var n = t.currentTarget.parentElement.nextSibling.innerText;
                        e.setState({
                            copied: !0
                        }, (function() {
                            navigator.clipboard.writeText(n), setTimeout((function() {
                                e.setState({
                                    copied: !1
                                });
                            }), 3e3);
                        }));
                    }
                }, e;
            }
            return E(n, [ {
                key: "render",
                value: function() {
                    var e = this.props, t = e.lang, n = e.clasName, r = e.children, u = e.props, a = this.state.copied;
                    return (0, _a.jsxs)("div", {
                        children: [ (0, _a.jsxs)("div", {
                            className: "appl1_sgpt_cnt_markdown_code_header",
                            children: [ t, (0, _a.jsxs)("div", {
                                className: "appl1_sgpt_cnt_markdown_code_header_copy",
                                onClick: this.copyCode,
                                children: [ (0, _a.jsx)("p", {
                                    className: "appl1_sgpt_cnt_markdown_code_header_copy_completed",
                                    style: {
                                        opacity: !1 === a ? "0" : "1"
                                    },
                                    children: "Copied!"
                                }), !1 === a ? (0, _a.jsxs)(_a.Fragment, {
                                    children: [ (0, _a.jsx)("div", {
                                        className: "appl1_sgpt_cnt_markdown_code_header_copy_icon"
                                    }), (0, _a.jsx)("div", {
                                        className: "appl1_sgpt_cnt_markdown_code_header_copy_p",
                                        children: "Copy"
                                    }) ]
                                }) : null ]
                            }) ]
                        }), (0, _a.jsx)("code", N(N({
                            className: n
                        }, u), {}, {
                            children: r
                        })) ]
                    });
                }
            } ]), n;
        }(o.Component);
        function Aa(e) {
            var t = e.answer;
            return (0, _a.jsx)(Mr, {
                rehypePlugins: [ [ va, {
                    detect: !0
                } ] ],
                className: "appl1_sgpt_cnt_markdown",
                children: t,
                components: {
                    code: function(e) {
                        e.node;
                        var t, n = e.inline, r = e.className, u = e.children, a = function(e, t) {
                            if (null == e) return {};
                            var n, r, u = function(e, t) {
                                if (null == e) return {};
                                var n, r, u = {}, a = Object.keys(e);
                                for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (u[n] = e[n]);
                                return u;
                            }(e, t);
                            if (Object.getOwnPropertySymbols) {
                                var a = Object.getOwnPropertySymbols(e);
                                for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (u[n] = e[n]);
                            }
                            return u;
                        }(e, Ca), i = /language-(\w+)/.exec(r || "");
                        return r && (t = r.split("-")[1]), !n && i ? (0, _a.jsx)(Fa, {
                            lang: t,
                            clasName: r,
                            children: u,
                            props: a
                        }) : (0, _a.jsx)("code", N(N({
                            className: r
                        }, a), {}, {
                            children: u
                        }));
                    }
                }
            });
        }
        function xa(e, t) {
            return J(e) || function(e, t) {
                var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (null != n) {
                    var r, u, a = [], i = !0, o = !1;
                    try {
                        for (n = n.call(e); !(i = (r = n.next()).done) && (a.push(r.value), !t || a.length !== t); i = !0) ;
                    } catch (e) {
                        o = !0, u = e;
                    } finally {
                        try {
                            i || null == n.return || n.return();
                        } finally {
                            if (o) throw u;
                        }
                    }
                    return a;
                }
            }(e, t) || c(e, t) || ee();
        }
        function wa(e) {
            var t = e.item, n = e.index, r = xa((0, o.useState)(!1), 2), u = r[0], a = r[1];
            return (0, _a.jsxs)("div", {
                className: "appl1_sgpt_cnt_dialog_answer_header",
                children: [ (0, _a.jsxs)("div", {
                    className: "appl1_sgpt_cnt_dialog_answer_header_icon_box",
                    children: [ (0, _a.jsx)("div", {
                        className: "appl1_sgpt_cnt_dialog_answer_header_icon"
                    }), (0, _a.jsx)("div", {
                        children: "ChatGPT responded:"
                    }) ]
                }), (0, _a.jsxs)("div", {
                    className: "appl1_sgpt_cnt_dialog_answer_header_box",
                    onClick: function() {
                        a(!0), navigator.clipboard.writeText(t.a), setTimeout((function() {
                            a(!1);
                        }), 2500);
                    },
                    children: [ (0, _a.jsx)("div", {
                        className: "appl1_sgpt_cnt_dialog_answer_header_box_copy",
                        style: {
                            display: !1 === u ? "block" : "none"
                        }
                    }), (0, _a.jsx)("div", {
                        className: "appl1_sgpt_cnt_dialog_answer_header_box_check",
                        style: {
                            display: !0 === u ? "block" : "none"
                        }
                    }) ]
                }) ]
            }, n);
        }
        function ka(e) {
            var t = e.answerStack, n = e.stopRespBtnStatus, r = e.stopResponse;
            return null !== document.querySelector(".appl1_sgpt_cnt_dialog") && (document.querySelector(".appl1_sgpt_cnt_dialog").scrollTop = document.querySelector(".appl1_sgpt_cnt_dialog").scrollHeight), 
            (0, _a.jsxs)("div", {
                className: "appl1_sgpt_cnt_dialog",
                children: [ t.map((function(e, t) {
                    return (0, _a.jsxs)("div", {
                        children: [ (0, _a.jsx)("p", {
                            className: "appl1_sgpt_cnt_dialog_question",
                            children: e.q
                        }), (0, _a.jsxs)("div", {
                            className: "appl1_sgpt_cnt_dialog_answer",
                            children: [ (0, _a.jsx)(wa, {
                                item: e,
                                index: t
                            }), (0, _a.jsx)(Aa, {
                                answer: e.a
                            }) ]
                        }) ]
                    }, t);
                })), (0, _a.jsxs)("div", {
                    style: {
                        display: !1 === n ? "none" : "flex"
                    },
                    className: "appl1_sgpt_cnt_dialog_stop_resp",
                    onClick: r,
                    children: [ (0, _a.jsx)("span", {
                        className: "appl1_sgpt_cnt_dialog_stop_resp_icon"
                    }), (0, _a.jsx)("p", {
                        className: "appl1_sgpt_cnt_dialog_stop_resp_text",
                        children: "Stop response"
                    }) ]
                }) ]
            });
        }
        function Ba(e) {
            var t = e.getExtVersion, n = e.sendMessage, r = e.browser;
            return (0, _a.jsxs)("div", {
                className: "appl1_sgpt_cnt_main_footer_text_box",
                children: [ (0, _a.jsx)("p", {
                    className: "appl1_sgpt_cnt_main_footer_text",
                    children: "ChatGPT for ".concat("CHROME" === r ? "Chrome" : "Edge", " v ").concat(t())
                }), (0, _a.jsx)("p", {
                    className: "appl1_sgpt_cnt_main_footer_text_rateus",
                    onClick: function() {
                        n("OPEN_RATEUS_PAGE");
                    },
                    children: "Rate us"
                }), (0, _a.jsx)("p", {
                    className: "appl1_sgpt_cnt_main_footer_text_support",
                    onClick: function() {
                        n("OPEN_SUPPORT_PAGE");
                    },
                    children: "Get support"
                }) ]
            });
        }
        function Sa(e) {
            var t = e.dialog, n = e.openDialog, r = e.textareaText, u = e.textareaChange, a = e.ckickOnPostBtn, i = e.showFeedbackBtn, o = e.showSettings, l = e.ckickOnFeedback, s = e.feedbackTextColor, c = e.showFeedbackText;
            return (0, _a.jsx)("div", {
                className: "appl1_sgpt_cnt_main_footer",
                children: !1 === t ? (0, _a.jsxs)(_a.Fragment, {
                    children: [ (0, _a.jsxs)("div", {
                        className: "appl1_sgpt_cnt_main_footer_btn",
                        onClick: n,
                        children: [ (0, _a.jsx)("div", {
                            className: "appl1_sgpt_cnt_main_footer_btn_icon"
                        }), (0, _a.jsx)("div", {
                            className: "appl1_sgpt_cnt_main_footer_btn_text",
                            children: "Continue dialog"
                        }) ]
                    }), (0, _a.jsxs)("div", {
                        className: "appl1_sgpt_cnt_head_feedback",
                        style: {
                            display: !1 === i || !0 === o ? "none" : "flex"
                        },
                        children: [ (0, _a.jsx)("div", {
                            className: "appl1_sgpt_cnt_head_feedback_up",
                            "data-action": "thumbsUp",
                            onClick: l
                        }), (0, _a.jsx)("div", {
                            className: "appl1_sgpt_cnt_head_feedback_down",
                            "data-action": "thumbsDown",
                            onClick: l
                        }) ]
                    }), (0, _a.jsxs)("div", {
                        className: "appl1_sgpt_cnt_head_feedback_text",
                        style: {
                            display: !1 === c ? "none" : "block",
                            color: s
                        },
                        children: [ "Feedback", (0, _a.jsx)("br", {}), "sended" ]
                    }) ]
                }) : (0, _a.jsxs)("div", {
                    className: "appl1_sgpt_cnt_main_footer_inputbox",
                    children: [ (0, _a.jsx)("textarea", {
                        placeholder: "Ask me anything...",
                        maxLength: 1e3,
                        className: "appl1_sgpt_cnt_main_footer_inputbox_textarea",
                        value: r,
                        onChange: u,
                        onKeyDown: function(e) {
                            "enter" === e.code.toLocaleLowerCase() && a();
                        }
                    }), (0, _a.jsxs)("div", {
                        className: "appl1_sgpt_cnt_main_footer_inputbox_counter",
                        children: [ (0, _a.jsx)("p", {
                            className: "appl1_sgpt_cnt_main_footer_inputbox_counter_first",
                            children: r.length
                        }), "/", (0, _a.jsx)("p", {
                            className: "appl1_sgpt_cnt_main_footer_inputbox_counter_second",
                            children: "1000"
                        }) ]
                    }), (0, _a.jsx)("div", {
                        className: "appl1_sgpt_cnt_main_footer_inputbox_post",
                        onClick: a
                    }) ]
                })
            });
        }
        var Na = function() {
            return (0, _a.jsx)("div", {
                className: "appl1_sgpt_cnt_dialog_loader",
                children: (0, _a.jsxs)("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "70px",
                    height: "70px",
                    viewBox: "0 0 100 100",
                    preserveAspectRatio: "xMidYMid",
                    children: [ (0, _a.jsx)("g", {
                        transform: "rotate(0 50 50)",
                        children: (0, _a.jsx)("rect", {
                            x: "47",
                            y: "24",
                            rx: "3",
                            ry: "6",
                            width: "6",
                            height: "12",
                            fill: "#592cff",
                            children: (0, _a.jsx)("animate", {
                                attributeName: "opacity",
                                values: "1;0",
                                keyTimes: "0;1",
                                dur: "1s",
                                begin: "-0.9166666666666666s",
                                repeatCount: "indefinite"
                            })
                        })
                    }), (0, _a.jsx)("g", {
                        transform: "rotate(30 50 50)",
                        children: (0, _a.jsx)("rect", {
                            x: "47",
                            y: "24",
                            rx: "3",
                            ry: "6",
                            width: "6",
                            height: "12",
                            fill: "#592cff",
                            children: (0, _a.jsx)("animate", {
                                attributeName: "opacity",
                                values: "1;0",
                                keyTimes: "0;1",
                                dur: "1s",
                                begin: "-0.8333333333333334s",
                                repeatCount: "indefinite"
                            })
                        })
                    }), (0, _a.jsx)("g", {
                        transform: "rotate(60 50 50)",
                        children: (0, _a.jsx)("rect", {
                            x: "47",
                            y: "24",
                            rx: "3",
                            ry: "6",
                            width: "6",
                            height: "12",
                            fill: "#592cff",
                            children: (0, _a.jsx)("animate", {
                                attributeName: "opacity",
                                values: "1;0",
                                keyTimes: "0;1",
                                dur: "1s",
                                begin: "-0.75s",
                                repeatCount: "indefinite"
                            })
                        })
                    }), (0, _a.jsx)("g", {
                        transform: "rotate(90 50 50)",
                        children: (0, _a.jsx)("rect", {
                            x: "47",
                            y: "24",
                            rx: "3",
                            ry: "6",
                            width: "6",
                            height: "12",
                            fill: "#592cff",
                            children: (0, _a.jsx)("animate", {
                                attributeName: "opacity",
                                values: "1;0",
                                keyTimes: "0;1",
                                dur: "1s",
                                begin: "-0.6666666666666666s",
                                repeatCount: "indefinite"
                            })
                        })
                    }), (0, _a.jsx)("g", {
                        transform: "rotate(120 50 50)",
                        children: (0, _a.jsx)("rect", {
                            x: "47",
                            y: "24",
                            rx: "3",
                            ry: "6",
                            width: "6",
                            height: "12",
                            fill: "#592cff",
                            children: (0, _a.jsx)("animate", {
                                attributeName: "opacity",
                                values: "1;0",
                                keyTimes: "0;1",
                                dur: "1s",
                                begin: "-0.5833333333333334s",
                                repeatCount: "indefinite"
                            })
                        })
                    }), (0, _a.jsx)("g", {
                        transform: "rotate(150 50 50)",
                        children: (0, _a.jsx)("rect", {
                            x: "47",
                            y: "24",
                            rx: "3",
                            ry: "6",
                            width: "6",
                            height: "12",
                            fill: "#592cff",
                            children: (0, _a.jsx)("animate", {
                                attributeName: "opacity",
                                values: "1;0",
                                keyTimes: "0;1",
                                dur: "1s",
                                begin: "-0.5s",
                                repeatCount: "indefinite"
                            })
                        })
                    }), (0, _a.jsx)("g", {
                        transform: "rotate(180 50 50)",
                        children: (0, _a.jsx)("rect", {
                            x: "47",
                            y: "24",
                            rx: "3",
                            ry: "6",
                            width: "6",
                            height: "12",
                            fill: "#592cff",
                            children: (0, _a.jsx)("animate", {
                                attributeName: "opacity",
                                values: "1;0",
                                keyTimes: "0;1",
                                dur: "1s",
                                begin: "-0.4166666666666667s",
                                repeatCount: "indefinite"
                            })
                        })
                    }), (0, _a.jsx)("g", {
                        transform: "rotate(210 50 50)",
                        children: (0, _a.jsx)("rect", {
                            x: "47",
                            y: "24",
                            rx: "3",
                            ry: "6",
                            width: "6",
                            height: "12",
                            fill: "#592cff",
                            children: (0, _a.jsx)("animate", {
                                attributeName: "opacity",
                                values: "1;0",
                                keyTimes: "0;1",
                                dur: "1s",
                                begin: "-0.3333333333333333s",
                                repeatCount: "indefinite"
                            })
                        })
                    }), (0, _a.jsx)("g", {
                        transform: "rotate(240 50 50)",
                        children: (0, _a.jsx)("rect", {
                            x: "47",
                            y: "24",
                            rx: "3",
                            ry: "6",
                            width: "6",
                            height: "12",
                            fill: "#592cff",
                            children: (0, _a.jsx)("animate", {
                                attributeName: "opacity",
                                values: "1;0",
                                keyTimes: "0;1",
                                dur: "1s",
                                begin: "-0.25s",
                                repeatCount: "indefinite"
                            })
                        })
                    }), (0, _a.jsx)("g", {
                        transform: "rotate(270 50 50)",
                        children: (0, _a.jsx)("rect", {
                            x: "47",
                            y: "24",
                            rx: "3",
                            ry: "6",
                            width: "6",
                            height: "12",
                            fill: "#592cff",
                            children: (0, _a.jsx)("animate", {
                                attributeName: "opacity",
                                values: "1;0",
                                keyTimes: "0;1",
                                dur: "1s",
                                begin: "-0.16666666666666666s",
                                repeatCount: "indefinite"
                            })
                        })
                    }), (0, _a.jsx)("g", {
                        transform: "rotate(300 50 50)",
                        children: (0, _a.jsx)("rect", {
                            x: "47",
                            y: "24",
                            rx: "3",
                            ry: "6",
                            width: "6",
                            height: "12",
                            fill: "#592cff",
                            children: (0, _a.jsx)("animate", {
                                attributeName: "opacity",
                                values: "1;0",
                                keyTimes: "0;1",
                                dur: "1s",
                                begin: "-0.08333333333333333s",
                                repeatCount: "indefinite"
                            })
                        })
                    }), (0, _a.jsx)("g", {
                        transform: "rotate(330 50 50)",
                        children: (0, _a.jsx)("rect", {
                            x: "47",
                            y: "24",
                            rx: "3",
                            ry: "6",
                            width: "6",
                            height: "12",
                            fill: "#592cff",
                            children: (0, _a.jsx)("animate", {
                                attributeName: "opacity",
                                values: "1;0",
                                keyTimes: "0;1",
                                dur: "1s",
                                begin: "0s",
                                repeatCount: "indefinite"
                            })
                        })
                    }) ]
                })
            });
        }, Oa = function(e) {
            _(n, e);
            var t = w(n);
            function n() {
                var e;
                b(this, n);
                for (var r = arguments.length, u = new Array(r), a = 0; a < r; a++) u[a] = arguments[a];
                return (e = t.call.apply(t, [ this ].concat(u))).state = {
                    answer: null,
                    answerStack: [ {
                        q: e.props.question,
                        a: ""
                    } ],
                    nextQuestion: !1,
                    dialogLoader: !1,
                    dialog: !1,
                    showFooter: !1,
                    loader: !0,
                    textareaText: "",
                    stopRespBtnStatus: !1,
                    showFeedbackText: !1,
                    feedbackTextColor: "",
                    showFeedbackBtn: !1,
                    errorText: null,
                    showCopyBox: !1,
                    copyStatus: !1
                }, e.postQuestion = function(e, t) {
                    ya = chrome.runtime.connect(), "" !== e && ya.postMessage({
                        question: e
                    }), ya.onMessage.addListener((function(e) {
                        t(e);
                    }));
                }, e.createAnswer = function(t) {
                    if ("error" !== t.type) {
                        var n = t.type, r = e.state.answerStack;
                        !0 === e.state.nextQuestion && (r.push({
                            q: e.state.textareaText,
                            a: ""
                        }), e.setState({
                            nextQuestion: !1
                        })), "answer" === n ? (r[r.length - 1].a = t.data.text, e.setState({
                            answer: t,
                            answerStack: r,
                            loader: !1,
                            dialogLoader: !1,
                            textareaText: "",
                            stopRespBtnStatus: !0
                        })) : "done" === n && (e.setState({
                            showFooter: !0,
                            showFeedbackBtn: !0,
                            showCopyBox: !0,
                            stopRespBtnStatus: !1
                        }), e.stopResponse());
                    } else {
                        if (t.text.code) return;
                        e.setState({
                            errorText: t.text,
                            loader: !1,
                            dialogLoader: !1
                        });
                    }
                }, e.openDialog = function() {
                    e.setState({
                        dialog: !0
                    });
                }, e.textareaChange = function(t) {
                    e.setState({
                        textareaText: t.target.value
                    });
                }, e.ckickOnPostBtn = function() {
                    var t = e.state.textareaText, n = e.props.settings.language.filter((function(e) {
                        return !0 === e.selected;
                    })), r = "auto" === n[0].value ? t : "".concat(t, "(in ").concat(n[0].value, ")");
                    e.setState({
                        nextQuestion: !0,
                        dialogLoader: !0
                    }, (function() {
                        e.postQuestion(r, (function(t) {
                            e.createAnswer(t);
                        }));
                    }));
                }, e.stopResponse = function(t) {
                    ya.disconnect(), e.setState({
                        stopRespBtnStatus: !1,
                        showFooter: !0,
                        showCopyBox: !0,
                        showFeedbackBtn: !0
                    }), !0 === e.props.settings.removeDi && chrome.runtime.sendMessage({
                        action: "REMOVE_DIALOGS"
                    }), chrome.runtime.sendMessage({
                        action: "GEN_TITLE",
                        id: e.state.answer.conversationId,
                        mId: e.state.answer.data.messageId
                    }, (function() {
                        t && t();
                    }));
                }, e.ckickOnFeedback = function(t) {
                    var n, r, u = e.state.answer, a = t.target.attributes["data-action"].value;
                    "thumbsUp" === a ? (r = "#00c600", n = {
                        conversation_id: u.conversationId,
                        message_id: u.data.messageId,
                        rating: "thumbsUp"
                    }) : "thumbsDown" === a && (r = "#d73a49", n = {
                        conversation_id: u.conversationId,
                        message_id: u.data.messageId,
                        rating: "thumbsDown"
                    }), chrome.runtime.sendMessage({
                        action: "FEEDBACK",
                        data: n
                    }), e.setState({
                        feedbackTextColor: r,
                        showFeedbackText: !0,
                        showFeedbackBtn: !1
                    }, (function() {
                        setTimeout((function() {
                            e.setState({
                                feedbackTextColor: "",
                                showFeedbackText: !1
                            });
                        }), 2500);
                    }));
                }, e.copyAnswer = function() {
                    e.setState({
                        copyStatus: !0
                    }, (function() {
                        navigator.clipboard.writeText(e.state.answer.data.text), setTimeout((function() {
                            e.setState({
                                copyStatus: !1
                            });
                        }), 2500);
                    }));
                }, e;
            }
            return E(n, [ {
                key: "componentDidMount",
                value: function() {
                    var e = this;
                    this.postQuestion(this.props.question, (function(t) {
                        e.createAnswer(t);
                    }));
                }
            }, {
                key: "componentDidUpdate",
                value: function(e) {
                    var t = this;
                    this.props.question !== e.question && (ya.disconnect(), this.setState({
                        showFooter: !1,
                        showFeedbackBtn: !1,
                        showCopyBox: !1,
                        answer: null,
                        loader: !0,
                        answerStack: [ {
                            q: this.props.question,
                            a: ""
                        } ],
                        dialog: !1
                    }), this.postQuestion(this.props.question, (function(e) {
                        t.createAnswer(e);
                    })));
                }
            }, {
                key: "sendMessage",
                value: function(e) {
                    chrome.runtime.sendMessage({
                        action: e
                    });
                }
            }, {
                key: "render",
                value: function() {
                    var e = this, t = this.state, n = t.dialog, r = t.showFooter, u = t.loader, a = t.textareaText, i = t.answerStack, o = t.dialogLoader, l = t.stopRespBtnStatus, s = t.showFeedbackBtn, c = t.feedbackTextColor, d = t.showFeedbackText, p = t.showCopyBox, f = t.copyStatus, D = t.errorText, g = this.props, h = g.showSettings, m = g.showLoginForm, b = g.headerText, v = g.openSettings, E = g.browser;
                    return (0, _a.jsx)(_a.Fragment, {
                        children: null !== D ? (0, _a.jsxs)("div", {
                            className: "appl1_sgpt_cnt_errortext",
                            children: [ D, " ", (0, _a.jsx)("br", {}), (0, _a.jsx)("p", {
                                className: "appl1_sgpt_cnt_errortext_p",
                                children: "Please disable other applications that work with GPT"
                            }) ]
                        }) : (0, _a.jsxs)(_a.Fragment, {
                            children: [ (0, _a.jsxs)("div", {
                                className: "appl1_sgpt_cnt_head",
                                children: [ (0, _a.jsxs)("div", {
                                    className: "appl1_sgpt_cnt_head_titlebox",
                                    children: [ (0, _a.jsx)("div", {
                                        className: !0 === m ? "appl1_sgpt_cnt_head_icon appl1_sgpt_cnt_head_icon_notlogin" : "appl1_sgpt_cnt_head_icon"
                                    }), (0, _a.jsx)("div", {
                                        className: "appl1_sgpt_cnt_head_title",
                                        children: b
                                    }), !0 === m ? null : (0, _a.jsx)("div", {
                                        className: !1 === h ? "appl1_sgpt_cnt_head_setbtn" : "appl1_sgpt_cnt_head_setbtn appl1_sgpt_cnt_head_setbtn_open",
                                        onClick: v
                                    }), !0 === m ? null : !1 === n ? (0, _a.jsxs)("div", {
                                        className: "appl1_sgpt_cnt_head_stop_feed_box",
                                        children: [ (0, _a.jsxs)("div", {
                                            style: {
                                                display: !1 === l || !0 === h ? "none" : "flex"
                                            },
                                            className: "appl1_sgpt_cnt_head_stop_resp",
                                            onClick: this.stopResponse,
                                            children: [ (0, _a.jsx)("span", {
                                                className: "appl1_sgpt_cnt_head_stop_resp_icon"
                                            }), (0, _a.jsx)("p", {
                                                className: "appl1_sgpt_cnt_head_stop_resp_text",
                                                children: "Stop"
                                            }) ]
                                        }), (0, _a.jsxs)("div", {
                                            className: "appl1_sgpt_cnt_head_copy_box",
                                            style: {
                                                display: !1 === p || !0 === h ? "none" : "flex"
                                            },
                                            onClick: this.copyAnswer,
                                            children: [ (0, _a.jsx)("div", {
                                                className: "appl1_sgpt_cnt_head_stop_feed_box_copy",
                                                style: {
                                                    display: !1 === f ? "block" : "none"
                                                }
                                            }), (0, _a.jsx)("div", {
                                                className: "appl1_sgpt_cnt_head_stop_feed_box_check",
                                                style: {
                                                    display: !0 === f ? "block" : "none"
                                                }
                                            }) ]
                                        }) ]
                                    }) : null ]
                                }), !0 === m ? (0, _a.jsx)("p", {
                                    className: "appl1_sgpt_cnt_head_subtitle",
                                    children: "Please login on OpenAI and reload this tab."
                                }) : null ]
                            }), (0, _a.jsx)("div", {
                                className: "appl1_sgpt_cnt_main",
                                style: {
                                    display: !1 === h ? "block" : "none"
                                },
                                children: !0 === this.props.showLoginForm ? (0, _a.jsxs)(_a.Fragment, {
                                    children: [ (0, _a.jsxs)("div", {
                                        className: "appl1_sgpt_cnt_loginbtn",
                                        onClick: function() {
                                            e.sendMessage("OPEN_LOGIN_PAGE");
                                        },
                                        children: [ (0, _a.jsx)("div", {
                                            className: "appl1_sgpt_cnt_loginbtn_icon"
                                        }), (0, _a.jsx)("p", {
                                            className: "appl1_sgpt_cnt_loginbtn_text",
                                            children: "Login on OpenAI"
                                        }) ]
                                    }), (0, _a.jsxs)("p", {
                                        className: "appl1_sgpt_cnt_logintext",
                                        children: [ "OpenAI requires passing a security check every once in a while.", (0, 
                                        _a.jsx)("br", {}), "If this keeps happening, chnge AI provider to OpenAI API in the", " ", (0, 
                                        _a.jsx)("span", {
                                            className: "appl1_sgpt_cnt_logintext_span",
                                            children: "extension options"
                                        }) ]
                                    }) ]
                                }) : (0, _a.jsx)(_a.Fragment, {
                                    children: !0 === u ? (0, _a.jsx)("p", {
                                        className: "appl1_sgpt_cnt_main_moment",
                                        children: "One moment..."
                                    }) : (0, _a.jsxs)(_a.Fragment, {
                                        children: [ !1 === n ? (0, _a.jsx)("div", {
                                            className: "appl1_sgpt_cnt_answer",
                                            children: (0, _a.jsx)(Aa, {
                                                answer: i[0].a
                                            })
                                        }) : (0, _a.jsxs)(_a.Fragment, {
                                            children: [ (0, _a.jsx)(ka, {
                                                answerStack: i,
                                                stopRespBtnStatus: l,
                                                stopResponse: this.stopResponse
                                            }), !1 === o ? null : (0, _a.jsx)(Na, {}) ]
                                        }), !0 === r ? (0, _a.jsxs)(_a.Fragment, {
                                            children: [ (0, _a.jsx)(Sa, {
                                                dialog: n,
                                                openDialog: this.openDialog,
                                                textareaText: a,
                                                textareaChange: this.textareaChange,
                                                ckickOnPostBtn: this.ckickOnPostBtn,
                                                showFeedbackText: d,
                                                feedbackTextColor: c,
                                                showFeedbackBtn: s,
                                                showSettings: h,
                                                ckickOnFeedback: this.ckickOnFeedback
                                            }), (0, _a.jsx)(Ba, {
                                                getExtVersion: this.props.getExtVersion,
                                                sendMessage: this.sendMessage,
                                                browser: E
                                            }) ]
                                        }) : null ]
                                    })
                                })
                            }) ]
                        })
                    });
                }
            } ]), n;
        }(o.Component), Ta = function(e) {
            var t = e.setToSettings, n = e.triggerMode;
            return (0, _a.jsxs)("div", {
                className: "appl1_sgpt_app_settings_trigger_section",
                children: [ (0, _a.jsx)("div", {
                    className: "appl1_sgpt_section_header",
                    style: {
                        marginBottom: "24px"
                    },
                    children: "Chatgpt Trigger mode"
                }), (0, _a.jsxs)("div", {
                    className: "appl1_sgpt_settings_trigger_container",
                    onChange: function(e) {
                        t("triggerMode", e.target.value);
                    },
                    children: [ (0, _a.jsxs)("label", {
                        className: "appl1_sgpt_trigger_container_item",
                        children: [ (0, _a.jsx)("input", {
                            type: "radio",
                            value: "always",
                            name: "trigger",
                            className: "appl1_sgpt_trigger_container_item_input"
                        }), (0, _a.jsxs)("div", {
                            className: "appl1_sgpt_trigger_container_item_checkbox",
                            children: [ (0, _a.jsx)("div", {
                                className: "always" === n ? "appl1_sgpt_trigger_container_item_circle active" : "appl1_sgpt_trigger_container_item_circle",
                                children: (0, _a.jsx)("div", {
                                    className: "always" === n ? "appl1_sgpt_trigger_container_item_circle_inner active" : "appl1_sgpt_trigger_container_item_circle_inner"
                                })
                            }), (0, _a.jsx)("div", {
                                className: "appl1_sgpt_trigger_container_item_checkbox_p",
                                children: "Always"
                            }) ]
                        }) ]
                    }), (0, _a.jsxs)("label", {
                        className: "appl1_sgpt_trigger_container_item",
                        children: [ (0, _a.jsx)("input", {
                            type: "radio",
                            value: "question",
                            name: "trigger",
                            className: "appl1_sgpt_trigger_container_item_input"
                        }), (0, _a.jsxs)("div", {
                            className: "appl1_sgpt_trigger_container_item_checkbox",
                            children: [ (0, _a.jsx)("div", {
                                className: "question" === n ? "appl1_sgpt_trigger_container_item_circle active" : "appl1_sgpt_trigger_container_item_circle",
                                children: (0, _a.jsx)("div", {
                                    className: "question" === n ? "appl1_sgpt_trigger_container_item_circle_inner active" : "appl1_sgpt_trigger_container_item_circle_inner"
                                })
                            }), (0, _a.jsx)("div", {
                                className: "appl1_sgpt_trigger_container_item_checkbox_p",
                                children: "Question Mark"
                            }) ]
                        }) ]
                    }), (0, _a.jsxs)("label", {
                        className: "appl1_sgpt_trigger_container_item",
                        children: [ (0, _a.jsx)("input", {
                            type: "radio",
                            value: "manually",
                            name: "trigger",
                            className: "appl1_sgpt_trigger_container_item_input"
                        }), (0, _a.jsxs)("div", {
                            className: "appl1_sgpt_trigger_container_item_checkbox",
                            children: [ (0, _a.jsx)("div", {
                                className: "manually" === n ? "appl1_sgpt_trigger_container_item_circle active" : "appl1_sgpt_trigger_container_item_circle",
                                children: (0, _a.jsx)("div", {
                                    className: "manually" === n ? "appl1_sgpt_trigger_container_item_circle_inner active" : "appl1_sgpt_trigger_container_item_circle_inner"
                                })
                            }), (0, _a.jsx)("div", {
                                className: "appl1_sgpt_trigger_container_item_checkbox_p",
                                children: "Manually"
                            }) ]
                        }) ]
                    }) ]
                }) ]
            });
        }, Ma = function(e) {
            var t = e.setToSettings, n = e.theme;
            return (0, _a.jsxs)("div", {
                className: "appl1_sgpt_app_settings_theme_section",
                children: [ (0, _a.jsx)("div", {
                    className: "appl1_sgpt_section_header",
                    style: {
                        marginBottom: "20px"
                    },
                    children: "Theme"
                }), (0, _a.jsxs)("div", {
                    className: "appl1_sgpt_app_settings_theme_section_container",
                    onChange: function(e) {
                        t("theme", e.target.value);
                    },
                    children: [ (0, _a.jsxs)("label", {
                        className: "auto" === n ? "appl1_sgpt_app_settings_theme_section_item active" : "appl1_sgpt_app_settings_theme_section_item",
                        children: [ (0, _a.jsx)("input", {
                            type: "radio",
                            value: "auto",
                            name: "theme",
                            className: "appl1_sgpt_app_settings_theme_section_item_input"
                        }), (0, _a.jsx)("div", {
                            className: "auto" === n ? "appl1_sgpt_app_settings_theme_section_item_icon circle active" : "appl1_sgpt_app_settings_theme_section_item_icon circle"
                        }), (0, _a.jsx)("p", {
                            className: "auto" === n ? "appl1_sgpt_app_settings_theme_section_item_text active" : "appl1_sgpt_app_settings_theme_section_item_text",
                            children: "Auto"
                        }) ]
                    }), (0, _a.jsxs)("label", {
                        className: "light" === n ? "appl1_sgpt_app_settings_theme_section_item active" : "appl1_sgpt_app_settings_theme_section_item",
                        children: [ (0, _a.jsx)("input", {
                            type: "radio",
                            value: "light",
                            name: "theme",
                            className: "appl1_sgpt_app_settings_theme_section_item_input"
                        }), (0, _a.jsx)("div", {
                            className: "light" === n ? "appl1_sgpt_app_settings_theme_section_item_icon sun active" : "appl1_sgpt_app_settings_theme_section_item_icon sun"
                        }), (0, _a.jsx)("p", {
                            className: "light" === n ? "appl1_sgpt_app_settings_theme_section_item_text active" : "appl1_sgpt_app_settings_theme_section_item_text",
                            children: "Light"
                        }) ]
                    }), (0, _a.jsxs)("label", {
                        className: "dark" === n ? "appl1_sgpt_app_settings_theme_section_item active" : "appl1_sgpt_app_settings_theme_section_item",
                        children: [ (0, _a.jsx)("input", {
                            type: "radio",
                            value: "dark",
                            name: "theme",
                            className: "appl1_sgpt_app_settings_theme_section_item_input"
                        }), (0, _a.jsx)("div", {
                            className: "dark" === n ? "appl1_sgpt_app_settings_theme_section_item_icon moon active" : "appl1_sgpt_app_settings_theme_section_item_icon moon"
                        }), (0, _a.jsx)("p", {
                            className: "dark" === n ? "appl1_sgpt_app_settings_theme_section_item_text active" : "appl1_sgpt_app_settings_theme_section_item_text",
                            children: "Dark"
                        }) ]
                    }) ]
                }) ]
            });
        }, La = function(e) {
            var t = e.setToSettings, n = e.language, r = n.filter((function(e) {
                return !0 === e.selected;
            }));
            return (0, _a.jsxs)("div", {
                className: "appl1_sgpt_app_settings_language_section",
                children: [ (0, _a.jsx)("div", {
                    className: "appl1_sgpt_section_header",
                    style: {
                        marginBottom: "18px"
                    },
                    children: "Language"
                }), (0, _a.jsx)("div", {
                    className: "appl1_sgpt_app_settings_language_section_container",
                    children: (0, _a.jsx)("select", {
                        className: "appl1_sgpt_app_settings_language_section_container_select",
                        name: "language",
                        id: "language",
                        onChange: function(e) {
                            var r = n.map((function(t) {
                                return t.value === e.target.value ? t.selected = !0 : t.selected = !1, t;
                            }));
                            t("language", r);
                        },
                        defaultValue: r[0].value,
                        children: n.map((function(e, t) {
                            return (0, _a.jsx)("option", {
                                className: "appl1_sgpt_app_settings_language_section_container_select_option",
                                value: e.value,
                                children: e.name
                            }, t);
                        }))
                    })
                }) ]
            });
        };
        function Ia(e) {
            var t = e.setToSettings, n = e.status;
            return (0, _a.jsxs)("div", {
                className: "appl1_sgpt_app_settings_helper_section",
                children: [ (0, _a.jsxs)("label", {
                    className: "appl1_sgpt_app_settings_helper_section_switch",
                    children: [ (0, _a.jsx)("input", {
                        type: "checkbox",
                        checked: n,
                        onChange: function(e) {
                            t("siteHelper", e.target.checked);
                        },
                        className: "appl1_sgpt_app_settings_helper_section_switch_input"
                    }), (0, _a.jsx)("span", {
                        className: "appl1_sgpt_app_settings_helper_section_slider_round"
                    }) ]
                }), (0, _a.jsx)("p", {
                    className: "appl1_sgpt_app_settings_helper_section_text",
                    children: "Add chatGPT helper to all sites"
                }) ]
            });
        }
        function Ra(e) {
            var t = e.setToSettings, n = e.status;
            return (0, _a.jsxs)("div", {
                className: "appl1_sgpt_app_settings_remove_section",
                children: [ (0, _a.jsxs)("label", {
                    className: "appl1_sgpt_app_settings_remove_section_switch",
                    children: [ (0, _a.jsx)("input", {
                        type: "checkbox",
                        checked: n,
                        onChange: function(e) {
                            t("removeDi", e.target.checked);
                        },
                        className: "appl1_sgpt_app_settings_remove_section_switch_input"
                    }), (0, _a.jsx)("span", {
                        className: "appl1_sgpt_app_settings_remove_section_slider_round"
                    }) ]
                }), (0, _a.jsx)("p", {
                    className: "appl1_sgpt_app_settings_remove_section_text",
                    children: "Remove dialogs generated by search"
                }) ]
            });
        }
        var Pa = function(e) {
            _(n, e);
            var t = w(n);
            function n() {
                var e;
                b(this, n);
                for (var r = arguments.length, u = new Array(r), a = 0; a < r; a++) u[a] = arguments[a];
                return (e = t.call.apply(t, [ this ].concat(u))).state = {
                    keyValue: "",
                    provider: null,
                    btnActive: !1,
                    showWarning: !1,
                    flag: !1
                }, e.clickOnTab = function(t) {
                    var n = e.state.provider, r = t.target.attributes["data-tab"].value;
                    n.currentTab !== r && (n.currentTab = r, e.setState({
                        provider: n
                    }));
                }, e.selectedModels = function(t) {
                    var n = e.state.provider, r = n.models.map((function(e) {
                        return e.value === t.target.value ? e.selected = !0 : e.selected = !1, e;
                    }));
                    n.models = r, e.setState({
                        provider: n
                    });
                }, e.changeInput = function(t) {
                    e.setState({
                        keyValue: t.target.value
                    });
                }, e.guideTrigger = function(t) {
                    var n = e.state.provider;
                    n.guideMode = t.target.value, e.setState({
                        provider: n
                    });
                }, e.onClickSave = function() {
                    var t = e.state, n = t.keyValue, r = t.provider;
                    "" === n && "gpt3" === r.currentTab ? e.showWarning() : (r.apiKey = n, e.setState({
                        provider: r
                    }, (function() {
                        e.props.setToSettings("provider", e.state.provider);
                    })));
                }, e.showWarning = function() {
                    e.setState({
                        showWarning: !0
                    }, (function() {
                        setTimeout((function() {
                            e.setState({
                                showWarning: !1
                            });
                        }), 3e3);
                    }));
                }, e;
            }
            return E(n, [ {
                key: "componentDidMount",
                value: function() {
                    this.setState({
                        provider: this.props.provider,
                        keyValue: this.props.provider.apiKey
                    });
                }
            }, {
                key: "render",
                value: function() {
                    var e, t = this.state, n = t.provider, r = t.keyValue, u = t.showWarning, a = t.flag;
                    return n && ("gpt3" === n.currentTab && !1 === a && (setTimeout((function() {
                        document.querySelector(".appl1_sgpt_app_settings_wrapper").scrollTop = document.querySelector(".appl1_sgpt_app_settings_wrapper").scrollHeight;
                    }), 200), this.setState({
                        flag: !0
                    })), e = n.models.filter((function(e) {
                        return !0 === e.selected;
                    }))), (0, _a.jsxs)("div", {
                        className: "appl1_sgpt_app_settings_provider_section",
                        children: [ (0, _a.jsx)("div", {
                            className: "appl1_sgpt_section_header",
                            style: {
                                marginBottom: "16px"
                            },
                            children: "AI Provider"
                        }), null !== n ? (0, _a.jsxs)("div", {
                            className: "appl1_sgpt_app_settings_provider_section_container",
                            children: [ (0, _a.jsxs)("div", {
                                className: "appl1_sgpt_app_settings_provider_section_container_head",
                                children: [ (0, _a.jsx)("p", {
                                    style: {
                                        marginRight: "21px"
                                    },
                                    "data-tab": "web",
                                    onClick: this.clickOnTab,
                                    className: "web" === n.currentTab ? "appl1_sgpt_app_settings_provider_section_container_head_text active" : "appl1_sgpt_app_settings_provider_section_container_head_text",
                                    children: "ChatGPT Webapp"
                                }), (0, _a.jsx)("p", {
                                    "data-tab": "gpt3",
                                    onClick: this.clickOnTab,
                                    className: "gpt3" === n.currentTab ? "appl1_sgpt_app_settings_provider_section_container_head_text active" : "appl1_sgpt_app_settings_provider_section_container_head_text",
                                    children: "OpenAI API"
                                }) ]
                            }), (0, _a.jsx)("div", {
                                className: "appl1_sgpt_app_settings_provider_section_container_content",
                                children: "web" === n.currentTab ? (0, _a.jsxs)("p", {
                                    className: "appl1_sgpt_app_settings_provider_section_container_content_p",
                                    style: {
                                        marginBottom: "18px"
                                    },
                                    children: [ "Use the same API as the ChatGPT webapp.", (0, _a.jsx)("br", {}), "Require login to ChatGPT webapp.", (0, 
                                    _a.jsx)("br", {}), "GPT-4 model will be used for ChatGPT Plus users.", (0, _a.jsx)("br", {}), "GPT-3.5 model will be used for free users." ]
                                }) : (0, _a.jsxs)("div", {
                                    className: "appl1_sgpt_app_settings_provider_container",
                                    children: [ (0, _a.jsxs)("p", {
                                        className: "appl1_sgpt_app_settings_provider_section_container_content_p",
                                        style: {
                                            marginBottom: "18px"
                                        },
                                        children: [ "OpenAI official API (GPT-3), more stable,", (0, _a.jsx)("br", {}), (0, 
                                        _a.jsx)("span", {
                                            style: {
                                                fontWeight: "600"
                                            },
                                            children: "charge by usage"
                                        }) ]
                                    }), (0, _a.jsx)("select", {
                                        className: "appl1_sgpt_app_settings_provider_container_select",
                                        name: "models",
                                        id: "models",
                                        onChange: this.selectedModels,
                                        defaultValue: e[0].value,
                                        children: n.models.map((function(e, t) {
                                            return (0, _a.jsx)("option", {
                                                className: "appl1_sgpt_app_settings_provider_container_select_options",
                                                value: e.value,
                                                children: e.name
                                            }, t);
                                        }))
                                    }), (0, _a.jsxs)("label", {
                                        className: "appl1_sgpt_app_settings_provider_container_label",
                                        children: [ (0, _a.jsx)("div", {
                                            className: "appl1_sgpt_app_settings_provider_container_div",
                                            children: "API key"
                                        }), (0, _a.jsx)("input", {
                                            className: "appl1_sgpt_app_settings_provider_container_input",
                                            onChange: this.changeInput,
                                            value: r,
                                            type: "password"
                                        }) ]
                                    }), (0, _a.jsxs)("p", {
                                        style: {
                                            marginBottom: "19px",
                                            fontSize: "13px"
                                        },
                                        children: [ "You can find or create your API key", " ", (0, _a.jsx)("a", {
                                            href: "https://platform.openai.com/account/api-keys",
                                            target: "_blank",
                                            rel: "noreferrer",
                                            style: {
                                                color: "#592cff"
                                            },
                                            children: "here"
                                        }) ]
                                    }), (0, _a.jsx)("p", {
                                        style: {
                                            fontSize: "13px",
                                            fontWeight: "600",
                                            marginBottom: "7px"
                                        },
                                        children: "GPT-3 Prompt Guide"
                                    }), (0, _a.jsx)("p", {
                                        style: {
                                            lineHeight: "1.5",
                                            marginBottom: "13px",
                                            fontSize: "12px"
                                        },
                                        children: '"Prompt guide" is a piece of text that is automatically added before the user\'s message to teach GPT-3 to act as a QA chatbot like ChatGPT.'
                                    }), (0, _a.jsxs)("div", {
                                        className: "appl1_sgpt_app_settings_provider_guidemode",
                                        onChange: this.guideTrigger,
                                        children: [ (0, _a.jsxs)("label", {
                                            className: "appl1_sgpt_app_settings_provider_guidemode_label",
                                            children: [ (0, _a.jsx)("input", {
                                                type: "radio",
                                                value: "default",
                                                name: "guide",
                                                className: "appl1_sgpt_app_settings_provider_guidemode_label_input"
                                            }), (0, _a.jsxs)("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    marginBottom: "12px"
                                                },
                                                children: [ (0, _a.jsx)("div", {
                                                    className: "default" === n.guideMode ? "appl1_sgpt_trigger_container_item_circle active" : "appl1_sgpt_trigger_container_item_circle",
                                                    style: {
                                                        marginRight: "15px"
                                                    },
                                                    children: (0, _a.jsx)("div", {
                                                        className: "default" === n.guideMode ? "appl1_sgpt_trigger_container_item_circle_inner active" : "appl1_sgpt_trigger_container_item_circle_inner"
                                                    })
                                                }), (0, _a.jsxs)("div", {
                                                    className: "appl1_sgpt_app_settings_provider_guidemode_text",
                                                    style: {
                                                        marginBottom: "10px"
                                                    },
                                                    children: [ (0, _a.jsx)("p", {
                                                        className: "appl1_sgpt_app_settings_provider_guidemode_text_p",
                                                        style: {
                                                            fontWeight: "700",
                                                            fontSize: "15px",
                                                            marginBottom: "5px"
                                                        },
                                                        children: "Default prompt guide"
                                                    }), (0, _a.jsx)("p", {
                                                        className: "appl1_sgpt_app_settings_provider_guidemode_text_p2",
                                                        style: {
                                                            lineHeight: "1.2"
                                                        },
                                                        children: "Generates better response, costs more tokens (220 tokens for guide)"
                                                    }) ]
                                                }) ]
                                            }) ]
                                        }), (0, _a.jsxs)("label", {
                                            className: "appl1_sgpt_app_settings_provider_guidemode_label",
                                            children: [ (0, _a.jsx)("input", {
                                                type: "radio",
                                                value: "simple",
                                                name: "guide",
                                                className: "appl1_sgpt_app_settings_provider_guidemode_label_input"
                                            }), (0, _a.jsxs)("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "flex-start"
                                                },
                                                children: [ (0, _a.jsx)("div", {
                                                    className: "simple" === n.guideMode ? "appl1_sgpt_trigger_container_item_circle active" : "appl1_sgpt_trigger_container_item_circle",
                                                    style: {
                                                        marginRight: "15px"
                                                    },
                                                    children: (0, _a.jsx)("div", {
                                                        className: "simple" === n.guideMode ? "appl1_sgpt_trigger_container_item_circle_inner active" : "appl1_sgpt_trigger_container_item_circle_inner"
                                                    })
                                                }), (0, _a.jsxs)("div", {
                                                    className: "appl1_sgpt_app_settings_provider_guidemode_text",
                                                    children: [ (0, _a.jsx)("p", {
                                                        style: {
                                                            fontWeight: "600",
                                                            fontSize: "16px",
                                                            marginBottom: "10px",
                                                            fontStyle: "normal"
                                                        },
                                                        className: "appl1_sgpt_app_settings_provider_guidemode_text_p",
                                                        children: "Simple prompt guide"
                                                    }), (0, _a.jsx)("p", {
                                                        className: "appl1_sgpt_app_settings_provider_guidemode_text_p2",
                                                        style: {
                                                            lineHeight: "1.2"
                                                        },
                                                        children: "Generates better response, costs more tokens (35 tokens for guide)"
                                                    }) ]
                                                }) ]
                                            }) ]
                                        }) ]
                                    }) ]
                                })
                            }), (0, _a.jsx)("div", {
                                className: "appl1_sgpt_app_settings_provider_section_container_btn",
                                onClick: this.onClickSave,
                                children: "Save"
                            }), (0, _a.jsx)("p", {
                                className: "appl1_sgpt_app_settings_provider_section_container_warningtext",
                                style: {
                                    display: !1 === u ? "none" : "block"
                                },
                                children: "Please, enter API key"
                            }) ]
                        }) : null ]
                    });
                }
            } ]), n;
        }(o.Component);
        function ja(e) {
            var t = e.settings, n = e.setToSettings, r = e.extVersion, u = e.browser;
            return (0, _a.jsx)("div", {
                className: "appl1_sgpt_app_settings_wrapper",
                children: (0, _a.jsxs)("div", {
                    className: "appl1_sgpt_app_settings_container",
                    children: [ (0, _a.jsx)(Ta, {
                        setToSettings: n,
                        triggerMode: t.triggerMode
                    }), (0, _a.jsx)(Ma, {
                        setToSettings: n,
                        theme: t.theme
                    }), (0, _a.jsx)(La, {
                        setToSettings: n,
                        language: t.language
                    }), (0, _a.jsx)("div", {
                        className: "appl1_sgpt_section_header",
                        style: {
                            marginBottom: "20px"
                        },
                        children: "Additional settings"
                    }), (0, _a.jsx)(Ia, {
                        setToSettings: n,
                        status: t.siteHelper
                    }), (0, _a.jsx)(Ra, {
                        setToSettings: n,
                        status: t.removeDi
                    }), (0, _a.jsx)(Pa, {
                        setToSettings: n,
                        provider: t.provider
                    }), (0, _a.jsxs)("div", {
                        className: "appl1_sgpt_app_settings_footer",
                        children: [ (0, _a.jsxs)("p", {
                            className: "appl1_sgpt_app_settings_footer_text",
                            children: [ "ChatGPT for ", "CHROME" === u ? "Chrome" : "Edge", " v", " ", r() ]
                        }), (0, _a.jsx)("p", {
                            className: "appl1_sgpt_app_settings_rateus",
                            onClick: function() {
                                chrome.runtime.sendMessage({
                                    action: "OPEN_RATEUS_PAGE"
                                });
                            },
                            children: "Rate us"
                        }), (0, _a.jsx)("p", {
                            className: "appl1_sgpt_app_settings_support",
                            onClick: function(e) {
                                chrome.runtime.sendMessage({
                                    action: "OPEN_SUPPORT_PAGE"
                                });
                            },
                            children: "Get support"
                        }) ]
                    }) ]
                })
            });
        }
        var za, Ua, qa = function(e) {
            _(n, e);
            var t = w(n);
            function n() {
                var e;
                b(this, n);
                for (var r = arguments.length, u = new Array(r), a = 0; a < r; a++) u[a] = arguments[a];
                return (e = t.call.apply(t, [ this ].concat(u))).state = {
                    showLoginForm: !1,
                    headerText: "",
                    loader: !0,
                    settings: null,
                    showSettings: !1,
                    showContent: !1,
                    browser: null
                }, e.getColorTheme = function() {
                    if (null !== e.state.settings) {
                        var t = e.state.settings.theme;
                        return "auto" === t ? h() : t;
                    }
                }, e.openSettings = function() {
                    e.setState({
                        showSettings: !e.state.showSettings
                    });
                }, e.changesInSettings = function(t, n) {
                    var r = e.state.settings;
                    r[t] = n, e.setState({
                        settings: r
                    }, (function() {
                        return e.satSettingsToStore();
                    }));
                }, e.satSettingsToStore = function() {
                    chrome.runtime.sendMessage({
                        action: "SET_SETTINGS_TO_STORE",
                        data: e.state.settings
                    });
                }, e.getExtVersion = function() {
                    return chrome.runtime.getManifest().version;
                }, e.clickOnShowContent = function() {
                    e.setState({
                        showContent: !0
                    });
                }, e;
            }
            return E(n, [ {
                key: "componentDidMount",
                value: function() {
                    var e = this, t = this;
                    chrome.storage.local.get([ "appl1_sgpt_settings" ], (function(n) {
                        e.setState({
                            settings: n.appl1_sgpt_settings,
                            browser: D()
                        }), chrome.runtime.sendMessage({
                            action: "GET_ACCESS_TOKEN"
                        }, (function(e) {
                            !1 === e.authStatus ? t.setState({
                                showLoginForm: !0,
                                headerText: "Action required",
                                loader: !1
                            }) : t.setState({
                                showLoginForm: !1,
                                headerText: "ChatGPT for ".concat("CHROME" === D() ? "Chrome" : "Edge"),
                                loader: !1
                            });
                        }));
                    }));
                }
            }, {
                key: "render",
                value: function() {
                    var e, t, n = this.state, r = n.showLoginForm, u = n.headerText, a = n.loader, i = n.showSettings, o = n.settings, l = n.showContent, s = n.browser;
                    if (null !== o) {
                        var c = (0, _a.jsxs)(_a.Fragment, {
                            children: [ "" !== this.props.question ? (0, _a.jsx)(Oa, {
                                headerText: u,
                                showLoginForm: r,
                                showSettings: i,
                                openSettings: this.openSettings,
                                question: this.props.question,
                                getExtVersion: this.getExtVersion,
                                clickOnShowContent: this.clickOnShowContent,
                                settings: o,
                                imHelper: this.props.imHelper,
                                browser: s
                            }) : (0, _a.jsx)("div", {
                                className: "appl1_sgpt_cnt_box_text",
                                style: {
                                    animation: "none",
                                    color: "#592cff"
                                },
                                children: "Please enter a request"
                            }), !1 === i ? null : (0, _a.jsx)(ja, {
                                settings: o,
                                setToSettings: this.changesInSettings,
                                extVersion: this.getExtVersion,
                                browser: s
                            }) ]
                        }), d = o.triggerMode;
                        !1 === i ? ("question" === d && (e = !0 === ((t = this.props.question).endsWith("?") || t.endsWith("？") || t.endsWith("؟") || t.endsWith("⸮")) ? c : (0, 
                        _a.jsx)("div", {
                            className: "appl1_sgpt_cnt_main_triggetText_question",
                            children: "Trigger ChatGPT by appending a question mark after your query"
                        })), "manually" === d && (e = !0 === l ? c : (0, _a.jsx)("div", {
                            onClick: this.clickOnShowContent,
                            className: "appl1_sgpt_cnt_main_triggetText_manually",
                            children: "Ask ChatGPT for this query"
                        })), "always" === d && (e = c)) : e = c;
                    }
                    return (0, _a.jsx)(_a.Fragment, {
                        children: null !== o ? (0, _a.jsx)("div", {
                            className: "dark" === this.getColorTheme(o.theme) ? "appl1_sgpt_cnt appl1_sgpt_cnt_dark" : "appl1_sgpt_cnt",
                            style: {
                                display: "aForm" === this.props.boxMode ? "block" : "none"
                            },
                            children: (0, _a.jsx)("div", {
                                className: "appl1_sgpt_cnt_box",
                                children: !1 === a ? e : (0, _a.jsx)("p", {
                                    className: "appl1_sgpt_cnt_box_text",
                                    children: "Please waite..."
                                })
                            })
                        }) : null
                    });
                }
            } ]), n;
        }(o.Component), Ha = function(e) {
            var t = e.clickOnPostBtn, n = e.boxMode, r = xa((0, o.useState)(""), 2), u = r[0], a = r[1];
            return (0, _a.jsx)("div", {
                className: "appl1_sgpt_wrapper_questionbox_input",
                style: {
                    display: "qForm" === n ? "block" : "none"
                },
                children: (0, _a.jsxs)("div", {
                    className: "appl1_sgpt_wrapper_questionbox_input_cont",
                    children: [ (0, _a.jsx)("textarea", {
                        placeholder: "Ask me anything...",
                        maxLength: 1e3,
                        className: "appl1_sgpt_wrapper_questionbox_input_textarea",
                        value: u,
                        onChange: function(e) {
                            return a(e.target.value);
                        },
                        onKeyDown: function(e) {
                            "enter" === e.code.toLocaleLowerCase() && t(u);
                        }
                    }), (0, _a.jsxs)("div", {
                        className: "appl1_sgpt_wrapper_questionbox_input_counter",
                        children: [ (0, _a.jsx)("p", {
                            className: "appl1_sgpt_wrapper_questionbox_input_counter_first",
                            children: u.length
                        }), "/", (0, _a.jsx)("p", {
                            className: "appl1_sgpt_wrapper_questionbox_input_counter_second",
                            children: "1000"
                        }) ]
                    }), (0, _a.jsx)("div", {
                        className: "appl1_sgpt_wrapper_questionbox_input_post",
                        onClick: function() {
                            t(u);
                        }
                    }) ]
                })
            });
        }, $a = function(e) {
            _(n, e);
            var t = w(n);
            function n() {
                var e;
                b(this, n);
                for (var r = arguments.length, u = new Array(r), a = 0; a < r; a++) u[a] = arguments[a];
                return (e = t.call.apply(t, [ this ].concat(u))).state = {
                    question: ""
                }, e.clickOnPostBtn = function(t) {
                    var n = e.props.lang, r = "auto" === n[0].value ? t : "".concat(t, "(in ").concat(n[0].value, ")");
                    e.setState({
                        question: r
                    }, (function() {
                        return e.props.switchBoxMode("aForm");
                    }));
                }, e;
            }
            return E(n, [ {
                key: "sendMessage",
                value: function(e) {
                    chrome.runtime.sendMessage({
                        action: e
                    });
                }
            }, {
                key: "render",
                value: function() {
                    var e = this, t = this.state.question, n = this.props, r = n.boxMode, u = n.config, a = n.authStatus;
                    return (0, _a.jsx)(_a.Fragment, {
                        children: null !== a ? !1 === a ? (0, _a.jsxs)("div", {
                            className: "appl1_sgpt_wrapper_questionbox_login",
                            children: [ (0, _a.jsx)("p", {
                                className: "appl1_sgpt_wrapper_questionbox_login_text",
                                children: "Please login on OpenAI."
                            }), (0, _a.jsxs)("div", {
                                className: "appl1_sgpt_wrapper_questionbox_login_btn",
                                onClick: function() {
                                    e.sendMessage("OPEN_LOGIN_PAGE");
                                },
                                children: [ (0, _a.jsx)("div", {
                                    className: "appl1_sgpt_wrapper_questionbox_btn_icon"
                                }), (0, _a.jsx)("p", {
                                    className: "appl1_sgpt_wrapper_questionbox_btn_text",
                                    children: "Login on OpenAI"
                                }) ]
                            }) ]
                        }) : (0, _a.jsxs)(_a.Fragment, {
                            children: [ (0, _a.jsx)(Ha, {
                                boxMode: r,
                                clickOnPostBtn: this.clickOnPostBtn
                            }), (0, _a.jsx)(qa, {
                                boxMode: r,
                                question: t,
                                config: u
                            }) ]
                        }) : null
                    });
                }
            } ]), n;
        }(o.Component), Ka = function(e) {
            _(n, e);
            var t = w(n);
            function n() {
                var e;
                b(this, n);
                for (var r = arguments.length, u = new Array(r), a = 0; a < r; a++) u[a] = arguments[a];
                return (e = t.call.apply(t, [ this ].concat(u))).state = {
                    authStatus: !1,
                    showBox: !1,
                    boxMode: "qForm",
                    errorText: null
                }, e.getToken = function() {
                    var t = A(e);
                    chrome.runtime.sendMessage({
                        action: "GET_ACCESS_TOKEN"
                    }, (function(e) {
                        !1 === e.authStatus ? t.setState({
                            authStatus: !1,
                            boxMode: "qForm"
                        }) : t.setState({
                            authStatus: !0
                        }), "Rate limit exceeded" === e.details && t.setState({
                            errorText: e.details
                        });
                    }));
                }, e.clickOpenBox = function() {
                    var t = e.state.showBox;
                    !1 === t ? e.setState({
                        showBox: !0
                    }, (function() {
                        return e.getToken();
                    })) : !0 === t && e.setState({
                        showBox: !1,
                        boxMode: "qForm"
                    });
                }, e.clickOnBack = function() {
                    e.setState({
                        boxMode: "qForm"
                    });
                }, e.getColorTheme = function() {
                    if (null !== e.props.config) {
                        var t = e.props.config.theme;
                        return "auto" === t ? h() : t;
                    }
                }, e.switchBoxMode = function(t) {
                    e.setState({
                        boxMode: t
                    });
                }, e.clickOnHideHelper = function() {
                    document.querySelector(".appl1_sgpt_float_box").remove();
                }, e;
            }
            return E(n, [ {
                key: "componentDidMount",
                value: function() {
                    this.getToken();
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.state, t = e.showBox, n = e.boxMode, r = e.authStatus, u = e.errorText;
                    return (0, _a.jsx)(_a.Fragment, {
                        children: (0, _a.jsxs)("div", {
                            className: "dark" === this.getColorTheme() ? "appl1_sgpt_wrapper_questionbox appl1_sgpt_wrapper_questionbox_dark" : "appl1_sgpt_wrapper_questionbox",
                            children: [ (0, _a.jsxs)("div", {
                                style: {
                                    display: !1 === t ? "none" : "block"
                                },
                                children: [ null !== u ? (0, _a.jsxs)("p", {
                                    className: "appl1_sgpt_wrapper_questionbox_error",
                                    children: [ "Error: ", u ]
                                }) : null, null === u ? (0, _a.jsx)($a, {
                                    config: this.props.config,
                                    lang: this.props.lang,
                                    boxMode: n,
                                    authStatus: r,
                                    switchBoxMode: this.switchBoxMode
                                }) : null ]
                            }), (0, _a.jsxs)("div", {
                                className: "appl1_sgpt_float_box_buttons",
                                children: [ (0, _a.jsx)("div", {
                                    className: !1 === t ? "appl1_sgpt_float_box_btn" : "appl1_sgpt_float_box_btn appl1_sgpt_float_box_btn_opened",
                                    onClick: this.clickOpenBox
                                }), (0, _a.jsx)("div", {
                                    className: "appl1_sgpt_float_box_btn_back",
                                    onClick: this.clickOnBack,
                                    style: {
                                        display: "aForm" === n ? "flex" : "none"
                                    }
                                }) ]
                            }), (0, _a.jsx)("div", {
                                style: {
                                    display: !0 === t ? "none" : "block"
                                },
                                className: "appl1_sgpt_float_btn_hide_box",
                                onClick: this.clickOnHideHelper
                            }) ]
                        })
                    });
                }
            } ]), n;
        }(o.Component), Va = !0;
        function Ga(e) {
            var t = e.classes;
            setInterval((function() {
                t.forEach((function(e) {
                    if ("className" === e[0]) {
                        var t = document.querySelector("." + e[1]);
                        t && t.setAttribute("style", "display:none !important");
                    } else if ("id" === e[0]) {
                        var n = document.getElementById(e[1]);
                        n && n.setAttribute("style", "display:none !important");
                    }
                }));
            }), 1e3);
        }
        function Wa(e, t, n, r) {
            return Qa.apply(this, arguments);
        }
        function Qa() {
            return (Qa = i(u().mark((function e(t, n, r, a) {
                var i, o, s, c;
                return u().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        n && r && ((i = document.createElement("div")).className = "appl1_sgpt_wrapper", 
                        "google" === a ? o = setInterval((function() {
                            if (!0 === Va) {
                                var e = document.getElementById("rcnt");
                                if (e) {
                                    var t = e.querySelector("#rhs");
                                    t ? null === t.querySelector(".appl1_sgpt_wrapper") && (t.prepend(i), Va = !1) : null === e.querySelector(".appl1_sgpt_wrapper") && (i.classList.add("appl1_sgpt_cnt_sidebar_single"), 
                                    e.appendChild(i), Va = !1);
                                }
                            } else clearInterval(o);
                        }), 100) : (s = g(r.sidebarContainerQuery)) ? s.prepend(i) : (i.classList.add("appl1_sgpt_cnt_sidebar_single"), 
                        (c = g(r.appendContainerQuery)) && c.appendChild(i)), l.render((0, _a.jsx)(qa, {
                            question: n,
                            config: t,
                            boxMode: "aForm",
                            imHelper: !1
                        }), i));

                      case 1:
                      case "end":
                        return e.stop();
                    }
                }), e);
            })))).apply(this, arguments);
        }
        function Za(e) {
            return Xa.apply(this, arguments);
        }
        function Xa() {
            return (Xa = i(u().mark((function e(t) {
                var n, r, a, i, o, l;
                return u().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        n = new RegExp(Object.keys(m).join("|")), (r = window.location.hostname.match(n)) && (a = m[r[0]], 
                        (i = g(a.inputQuery)) && i.value && (o = t.language.filter((function(e) {
                            return !0 === e.selected;
                        })), l = "auto" === o[0].value ? i.value : "".concat(i.value, "(in ").concat(o[0].value, ")"), 
                        Wa(t, l, a, r[0])));

                      case 3:
                      case "end":
                        return e.stop();
                    }
                }), e);
            })))).apply(this, arguments);
        }
        function Ya(e, t) {
            var n = document.createElement("div");
            n.className = "appl1_sgpt_float_box", document.body.appendChild(n), l.render((0, 
            _a.jsx)(Ka, {
                lang: e,
                config: t,
                imHelper: !0
            }), n);
        }
        chrome.storage.local.get([ "appl1_sgpt_settings" ], (function(e) {
            za = e.appl1_sgpt_settings, Ua = za.language.filter((function(e) {
                return !0 === e.selected;
            })), !0 === za.siteHelper && Ya(Ua, za), Ga(za), Za(za);
        })), chrome.runtime.onMessage.addListener((function(e, t, n) {
            if ("RELOAD_APP" === e.action) {
                var r = document.querySelector(".appl1_sgpt_wrapper");
                r && r.remove();
                var u = document.querySelector(".appl1_sgpt_float_box");
                u && u.remove(), Va = !0, Ga(za), Za(za), Ya(Ua, za);
            }
        }));
    }();
}();