!function() {
    var t = {
        3773: function(t, e, n) {
            "use strict";
            var r = n(7061).default, o = n(7424).default, i = n(4704).default, a = n(6690).default, s = n(9728).default, c = n(7288), u = function(t) {
                function e(t, n) {
                    if (a(this, e), this.maxAge = t, this[Symbol.toStringTag] = "Map", this.data = new Map, 
                    c(this.data), n) {
                        var r, s = i(n);
                        try {
                            for (s.s(); !(r = s.n()).done; ) {
                                var u = o(r.value, 2), l = u[0], f = u[1];
                                this.set(l, f);
                            }
                        } catch (t) {
                            s.e(t);
                        } finally {
                            s.f();
                        }
                    }
                }
                return s(e, [ {
                    key: "size",
                    get: function() {
                        return this.data.size;
                    }
                }, {
                    key: "clear",
                    value: function() {
                        this.data.clear();
                    }
                }, {
                    key: "delete",
                    value: function(t) {
                        return this.data.delete(t);
                    }
                }, {
                    key: "has",
                    value: function(t) {
                        return this.data.has(t);
                    }
                }, {
                    key: "get",
                    value: function(t) {
                        var e = this.data.get(t);
                        if (e) return e.data;
                    }
                }, {
                    key: "set",
                    value: function(t, e) {
                        return this.data.set(t, {
                            maxAge: Date.now() + this.maxAge,
                            data: e
                        }), this;
                    }
                }, {
                    key: "values",
                    value: function() {
                        return this.createIterator((function(t) {
                            return t[1].data;
                        }));
                    }
                }, {
                    key: "keys",
                    value: function() {
                        return this.data.keys();
                    }
                }, {
                    key: "entries",
                    value: function() {
                        return this.createIterator((function(t) {
                            return [ t[0], t[1].data ];
                        }));
                    }
                }, {
                    key: "forEach",
                    value: function(t, e) {
                        var n, r = i(this.entries());
                        try {
                            for (r.s(); !(n = r.n()).done; ) {
                                var a = o(n.value, 2), s = a[0], c = a[1];
                                t.apply(e, [ c, s, this ]);
                            }
                        } catch (t) {
                            r.e(t);
                        } finally {
                            r.f();
                        }
                    }
                }, {
                    key: t,
                    value: function() {
                        return this.entries();
                    }
                }, {
                    key: "createIterator",
                    value: r().mark((function t(e) {
                        var n, o, a;
                        return r().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                              case 0:
                                n = i(this.data.entries()), t.prev = 1, n.s();

                              case 3:
                                if ((o = n.n()).done) {
                                    t.next = 9;
                                    break;
                                }
                                return a = o.value, t.next = 7, e(a);

                              case 7:
                                t.next = 3;
                                break;

                              case 9:
                                t.next = 14;
                                break;

                              case 11:
                                t.prev = 11, t.t0 = t.catch(1), n.e(t.t0);

                              case 14:
                                return t.prev = 14, n.f(), t.finish(14);

                              case 17:
                              case "end":
                                return t.stop();
                            }
                        }), t, this, [ [ 1, 11, 14, 17 ] ]);
                    }))
                } ]), e;
            }(Symbol.iterator);
            t.exports = u;
        },
        7288: function(t, e, n) {
            "use strict";
            var r = n(4704).default, o = n(7061).default, i = n(7156).default, a = n(121);
            t.exports = function(t) {
                var e, n, s, c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "maxAge", u = function() {
                    var u = i(o().mark((function u() {
                        var l, f, p, h;
                        return o().wrap((function(u) {
                            for (;;) switch (u.prev = u.next) {
                              case 0:
                                if (void 0 === e) {
                                    u.next = 2;
                                    break;
                                }
                                return u.abrupt("return");

                              case 2:
                                l = function() {
                                    var r = i(o().mark((function r(i) {
                                        var u;
                                        return o().wrap((function(r) {
                                            for (;;) switch (r.prev = r.next) {
                                              case 0:
                                                if (s = a(), !((u = i[1][c] - Date.now()) <= 0)) {
                                                    r.next = 6;
                                                    break;
                                                }
                                                return t.delete(i[0]), s.resolve(), r.abrupt("return");

                                              case 6:
                                                return e = i[0], "function" == typeof (n = setTimeout((function() {
                                                    t.delete(i[0]), s && s.resolve();
                                                }), u)).unref && n.unref(), r.abrupt("return", s.promise);

                                              case 10:
                                              case "end":
                                                return r.stop();
                                            }
                                        }), r);
                                    })));
                                    return function(t) {
                                        return r.apply(this, arguments);
                                    };
                                }(), u.prev = 3, f = r(t), u.prev = 5, f.s();

                              case 7:
                                if ((p = f.n()).done) {
                                    u.next = 13;
                                    break;
                                }
                                return h = p.value, u.next = 11, l(h);

                              case 11:
                                u.next = 7;
                                break;

                              case 13:
                                u.next = 18;
                                break;

                              case 15:
                                u.prev = 15, u.t0 = u.catch(5), f.e(u.t0);

                              case 18:
                                return u.prev = 18, f.f(), u.finish(18);

                              case 21:
                                u.next = 25;
                                break;

                              case 23:
                                u.prev = 23, u.t1 = u.catch(3);

                              case 25:
                                e = void 0;

                              case 26:
                              case "end":
                                return u.stop();
                            }
                        }), u, null, [ [ 3, 23 ], [ 5, 15, 18, 21 ] ]);
                    })));
                    return function() {
                        return u.apply(this, arguments);
                    };
                }(), l = function() {
                    e = void 0, void 0 !== n && (clearTimeout(n), n = void 0), void 0 !== s && (s.reject(void 0), 
                    s = void 0);
                }, f = t.set.bind(t);
                return t.set = function(n, r) {
                    t.has(n) && t.delete(n);
                    var o = f(n, r);
                    return e && e === n && l(), u(), o;
                }, u(), t;
            };
        },
        121: function(t) {
            "use strict";
            t.exports = function() {
                var t = {};
                return t.promise = new Promise((function(e, n) {
                    t.resolve = e, t.reject = n;
                })), t;
            };
        },
        3897: function(t) {
            t.exports = function(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
                return r;
            }, t.exports.__esModule = !0, t.exports.default = t.exports;
        },
        5372: function(t) {
            t.exports = function(t) {
                if (Array.isArray(t)) return t;
            }, t.exports.__esModule = !0, t.exports.default = t.exports;
        },
        7156: function(t) {
            function e(t, e, n, r, o, i, a) {
                try {
                    var s = t[i](a), c = s.value;
                } catch (t) {
                    return void n(t);
                }
                s.done ? e(c) : Promise.resolve(c).then(r, o);
            }
            t.exports = function(t) {
                return function() {
                    var n = this, r = arguments;
                    return new Promise((function(o, i) {
                        var a = t.apply(n, r);
                        function s(t) {
                            e(a, o, i, s, c, "next", t);
                        }
                        function c(t) {
                            e(a, o, i, s, c, "throw", t);
                        }
                        s(void 0);
                    }));
                };
            }, t.exports.__esModule = !0, t.exports.default = t.exports;
        },
        6690: function(t) {
            t.exports = function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }, t.exports.__esModule = !0, t.exports.default = t.exports;
        },
        9728: function(t) {
            function e(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(t, r.key, r);
                }
            }
            t.exports = function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), Object.defineProperty(t, "prototype", {
                    writable: !1
                }), t;
            }, t.exports.__esModule = !0, t.exports.default = t.exports;
        },
        4704: function(t, e, n) {
            var r = n(6116);
            t.exports = function(t, e) {
                var n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                if (!n) {
                    if (Array.isArray(t) || (n = r(t)) || e && t && "number" == typeof t.length) {
                        n && (t = n);
                        var o = 0, i = function() {};
                        return {
                            s: i,
                            n: function() {
                                return o >= t.length ? {
                                    done: !0
                                } : {
                                    done: !1,
                                    value: t[o++]
                                };
                            },
                            e: function(t) {
                                throw t;
                            },
                            f: i
                        };
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }
                var a, s = !0, c = !1;
                return {
                    s: function() {
                        n = n.call(t);
                    },
                    n: function() {
                        var t = n.next();
                        return s = t.done, t;
                    },
                    e: function(t) {
                        c = !0, a = t;
                    },
                    f: function() {
                        try {
                            s || null == n.return || n.return();
                        } finally {
                            if (c) throw a;
                        }
                    }
                };
            }, t.exports.__esModule = !0, t.exports.default = t.exports;
        },
        8872: function(t) {
            t.exports = function(t, e) {
                var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                if (null != n) {
                    var r, o, i = [], a = !0, s = !1;
                    try {
                        for (n = n.call(t); !(a = (r = n.next()).done) && (i.push(r.value), !e || i.length !== e); a = !0) ;
                    } catch (t) {
                        s = !0, o = t;
                    } finally {
                        try {
                            a || null == n.return || n.return();
                        } finally {
                            if (s) throw o;
                        }
                    }
                    return i;
                }
            }, t.exports.__esModule = !0, t.exports.default = t.exports;
        },
        2218: function(t) {
            t.exports = function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }, t.exports.__esModule = !0, t.exports.default = t.exports;
        },
        7061: function(t, e, n) {
            var r = n(8698).default;
            function o() {
                "use strict";
                /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */                t.exports = o = function() {
                    return e;
                }, t.exports.__esModule = !0, t.exports.default = t.exports;
                var e = {}, n = Object.prototype, i = n.hasOwnProperty, a = "function" == typeof Symbol ? Symbol : {}, s = a.iterator || "@@iterator", c = a.asyncIterator || "@@asyncIterator", u = a.toStringTag || "@@toStringTag";
                function l(t, e, n) {
                    return Object.defineProperty(t, e, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }), t[e];
                }
                try {
                    l({}, "");
                } catch (t) {
                    l = function(t, e, n) {
                        return t[e] = n;
                    };
                }
                function f(t, e, n, r) {
                    var o = e && e.prototype instanceof d ? e : d, i = Object.create(o.prototype), a = new O(r || []);
                    return i._invoke = function(t, e, n) {
                        var r = "suspendedStart";
                        return function(o, i) {
                            if ("executing" === r) throw new Error("Generator is already running");
                            if ("completed" === r) {
                                if ("throw" === o) throw i;
                                return {
                                    value: void 0,
                                    done: !0
                                };
                            }
                            for (n.method = o, n.arg = i; ;) {
                                var a = n.delegate;
                                if (a) {
                                    var s = k(a, n);
                                    if (s) {
                                        if (s === h) continue;
                                        return s;
                                    }
                                }
                                if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                                    if ("suspendedStart" === r) throw r = "completed", n.arg;
                                    n.dispatchException(n.arg);
                                } else "return" === n.method && n.abrupt("return", n.arg);
                                r = "executing";
                                var c = p(t, e, n);
                                if ("normal" === c.type) {
                                    if (r = n.done ? "completed" : "suspendedYield", c.arg === h) continue;
                                    return {
                                        value: c.arg,
                                        done: n.done
                                    };
                                }
                                "throw" === c.type && (r = "completed", n.method = "throw", n.arg = c.arg);
                            }
                        };
                    }(t, n, a), i;
                }
                function p(t, e, n) {
                    try {
                        return {
                            type: "normal",
                            arg: t.call(e, n)
                        };
                    } catch (t) {
                        return {
                            type: "throw",
                            arg: t
                        };
                    }
                }
                e.wrap = f;
                var h = {};
                function d() {}
                function v() {}
                function g() {}
                var y = {};
                l(y, s, (function() {
                    return this;
                }));
                var m = Object.getPrototypeOf, w = m && m(m(L([])));
                w && w !== n && i.call(w, s) && (y = w);
                var b = g.prototype = d.prototype = Object.create(y);
                function x(t) {
                    [ "next", "throw", "return" ].forEach((function(e) {
                        l(t, e, (function(t) {
                            return this._invoke(e, t);
                        }));
                    }));
                }
                function _(t, e) {
                    function n(o, a, s, c) {
                        var u = p(t[o], t, a);
                        if ("throw" !== u.type) {
                            var l = u.arg, f = l.value;
                            return f && "object" == r(f) && i.call(f, "__await") ? e.resolve(f.__await).then((function(t) {
                                n("next", t, s, c);
                            }), (function(t) {
                                n("throw", t, s, c);
                            })) : e.resolve(f).then((function(t) {
                                l.value = t, s(l);
                            }), (function(t) {
                                return n("throw", t, s, c);
                            }));
                        }
                        c(u.arg);
                    }
                    var o;
                    this._invoke = function(t, r) {
                        function i() {
                            return new e((function(e, o) {
                                n(t, r, e, o);
                            }));
                        }
                        return o = o ? o.then(i, i) : i();
                    };
                }
                function k(t, e) {
                    var n = t.iterator[e.method];
                    if (void 0 === n) {
                        if (e.delegate = null, "throw" === e.method) {
                            if (t.iterator.return && (e.method = "return", e.arg = void 0, k(t, e), "throw" === e.method)) return h;
                            e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method");
                        }
                        return h;
                    }
                    var r = p(n, t.iterator, e.arg);
                    if ("throw" === r.type) return e.method = "throw", e.arg = r.arg, e.delegate = null, 
                    h;
                    var o = r.arg;
                    return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", 
                    e.arg = void 0), e.delegate = null, h) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), 
                    e.delegate = null, h);
                }
                function S(t) {
                    var e = {
                        tryLoc: t[0]
                    };
                    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), 
                    this.tryEntries.push(e);
                }
                function E(t) {
                    var e = t.completion || {};
                    e.type = "normal", delete e.arg, t.completion = e;
                }
                function O(t) {
                    this.tryEntries = [ {
                        tryLoc: "root"
                    } ], t.forEach(S, this), this.reset(!0);
                }
                function L(t) {
                    if (t) {
                        var e = t[s];
                        if (e) return e.call(t);
                        if ("function" == typeof t.next) return t;
                        if (!isNaN(t.length)) {
                            var n = -1, r = function e() {
                                for (;++n < t.length; ) if (i.call(t, n)) return e.value = t[n], e.done = !1, e;
                                return e.value = void 0, e.done = !0, e;
                            };
                            return r.next = r;
                        }
                    }
                    return {
                        next: T
                    };
                }
                function T() {
                    return {
                        value: void 0,
                        done: !0
                    };
                }
                return v.prototype = g, l(b, "constructor", g), l(g, "constructor", v), v.displayName = l(g, u, "GeneratorFunction"), 
                e.isGeneratorFunction = function(t) {
                    var e = "function" == typeof t && t.constructor;
                    return !!e && (e === v || "GeneratorFunction" === (e.displayName || e.name));
                }, e.mark = function(t) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(t, g) : (t.__proto__ = g, l(t, u, "GeneratorFunction")), 
                    t.prototype = Object.create(b), t;
                }, e.awrap = function(t) {
                    return {
                        __await: t
                    };
                }, x(_.prototype), l(_.prototype, c, (function() {
                    return this;
                })), e.AsyncIterator = _, e.async = function(t, n, r, o, i) {
                    void 0 === i && (i = Promise);
                    var a = new _(f(t, n, r, o), i);
                    return e.isGeneratorFunction(n) ? a : a.next().then((function(t) {
                        return t.done ? t.value : a.next();
                    }));
                }, x(b), l(b, u, "Generator"), l(b, s, (function() {
                    return this;
                })), l(b, "toString", (function() {
                    return "[object Generator]";
                })), e.keys = function(t) {
                    var e = [];
                    for (var n in t) e.push(n);
                    return e.reverse(), function n() {
                        for (;e.length; ) {
                            var r = e.pop();
                            if (r in t) return n.value = r, n.done = !1, n;
                        }
                        return n.done = !0, n;
                    };
                }, e.values = L, O.prototype = {
                    constructor: O,
                    reset: function(t) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, 
                        this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(E), 
                        !t) for (var e in this) "t" === e.charAt(0) && i.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
                    },
                    stop: function() {
                        this.done = !0;
                        var t = this.tryEntries[0].completion;
                        if ("throw" === t.type) throw t.arg;
                        return this.rval;
                    },
                    dispatchException: function(t) {
                        if (this.done) throw t;
                        var e = this;
                        function n(n, r) {
                            return a.type = "throw", a.arg = t, e.next = n, r && (e.method = "next", e.arg = void 0), 
                            !!r;
                        }
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var o = this.tryEntries[r], a = o.completion;
                            if ("root" === o.tryLoc) return n("end");
                            if (o.tryLoc <= this.prev) {
                                var s = i.call(o, "catchLoc"), c = i.call(o, "finallyLoc");
                                if (s && c) {
                                    if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                                    if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                                } else if (s) {
                                    if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                                } else {
                                    if (!c) throw new Error("try statement without catch or finally");
                                    if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                                }
                            }
                        }
                    },
                    abrupt: function(t, e) {
                        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                            var r = this.tryEntries[n];
                            if (r.tryLoc <= this.prev && i.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                                var o = r;
                                break;
                            }
                        }
                        o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
                        var a = o ? o.completion : {};
                        return a.type = t, a.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, 
                        h) : this.complete(a);
                    },
                    complete: function(t, e) {
                        if ("throw" === t.type) throw t.arg;
                        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, 
                        this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), 
                        h;
                    },
                    finish: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var n = this.tryEntries[e];
                            if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), E(n), h;
                        }
                    },
                    catch: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var n = this.tryEntries[e];
                            if (n.tryLoc === t) {
                                var r = n.completion;
                                if ("throw" === r.type) {
                                    var o = r.arg;
                                    E(n);
                                }
                                return o;
                            }
                        }
                        throw new Error("illegal catch attempt");
                    },
                    delegateYield: function(t, e, n) {
                        return this.delegate = {
                            iterator: L(t),
                            resultName: e,
                            nextLoc: n
                        }, "next" === this.method && (this.arg = void 0), h;
                    }
                }, e;
            }
            t.exports = o, t.exports.__esModule = !0, t.exports.default = t.exports;
        },
        7424: function(t, e, n) {
            var r = n(5372), o = n(8872), i = n(6116), a = n(2218);
            t.exports = function(t, e) {
                return r(t) || o(t, e) || i(t, e) || a();
            }, t.exports.__esModule = !0, t.exports.default = t.exports;
        },
        8698: function(t) {
            function e(n) {
                return t.exports = e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t;
                } : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                }, t.exports.__esModule = !0, t.exports.default = t.exports, e(n);
            }
            t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
        },
        6116: function(t, e, n) {
            var r = n(3897);
            t.exports = function(t, e) {
                if (t) {
                    if ("string" == typeof t) return r(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(t, e) : void 0;
                }
            }, t.exports.__esModule = !0, t.exports.default = t.exports;
        }
    }, e = {};
    function n(r) {
        var o = e[r];
        if (void 0 !== o) return o.exports;
        var i = e[r] = {
            exports: {}
        };
        return t[r](i, i.exports, n), i.exports;
    }
    n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return n.d(e, {
            a: e
        }), e;
    }, n.d = function(t, e) {
        for (var r in e) n.o(e, r) && !n.o(t, r) && Object.defineProperty(t, r, {
            enumerable: !0,
            get: e[r]
        });
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, function() {
        "use strict";
        function t(e) {
            return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            })(e);
        }
        function e() {
            /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
            e = function() {
                return n;
            };
            var n = {}, r = Object.prototype, o = r.hasOwnProperty, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", s = i.asyncIterator || "@@asyncIterator", c = i.toStringTag || "@@toStringTag";
            function u(t, e, n) {
                return Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }), t[e];
            }
            try {
                u({}, "");
            } catch (t) {
                u = function(t, e, n) {
                    return t[e] = n;
                };
            }
            function l(t, e, n, r) {
                var o = e && e.prototype instanceof h ? e : h, i = Object.create(o.prototype), a = new E(r || []);
                return i._invoke = function(t, e, n) {
                    var r = "suspendedStart";
                    return function(o, i) {
                        if ("executing" === r) throw new Error("Generator is already running");
                        if ("completed" === r) {
                            if ("throw" === o) throw i;
                            return {
                                value: void 0,
                                done: !0
                            };
                        }
                        for (n.method = o, n.arg = i; ;) {
                            var a = n.delegate;
                            if (a) {
                                var s = _(a, n);
                                if (s) {
                                    if (s === p) continue;
                                    return s;
                                }
                            }
                            if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                                if ("suspendedStart" === r) throw r = "completed", n.arg;
                                n.dispatchException(n.arg);
                            } else "return" === n.method && n.abrupt("return", n.arg);
                            r = "executing";
                            var c = f(t, e, n);
                            if ("normal" === c.type) {
                                if (r = n.done ? "completed" : "suspendedYield", c.arg === p) continue;
                                return {
                                    value: c.arg,
                                    done: n.done
                                };
                            }
                            "throw" === c.type && (r = "completed", n.method = "throw", n.arg = c.arg);
                        }
                    };
                }(t, n, a), i;
            }
            function f(t, e, n) {
                try {
                    return {
                        type: "normal",
                        arg: t.call(e, n)
                    };
                } catch (t) {
                    return {
                        type: "throw",
                        arg: t
                    };
                }
            }
            n.wrap = l;
            var p = {};
            function h() {}
            function d() {}
            function v() {}
            var g = {};
            u(g, a, (function() {
                return this;
            }));
            var y = Object.getPrototypeOf, m = y && y(y(O([])));
            m && m !== r && o.call(m, a) && (g = m);
            var w = v.prototype = h.prototype = Object.create(g);
            function b(t) {
                [ "next", "throw", "return" ].forEach((function(e) {
                    u(t, e, (function(t) {
                        return this._invoke(e, t);
                    }));
                }));
            }
            function x(e, n) {
                function r(i, a, s, c) {
                    var u = f(e[i], e, a);
                    if ("throw" !== u.type) {
                        var l = u.arg, p = l.value;
                        return p && "object" == t(p) && o.call(p, "__await") ? n.resolve(p.__await).then((function(t) {
                            r("next", t, s, c);
                        }), (function(t) {
                            r("throw", t, s, c);
                        })) : n.resolve(p).then((function(t) {
                            l.value = t, s(l);
                        }), (function(t) {
                            return r("throw", t, s, c);
                        }));
                    }
                    c(u.arg);
                }
                var i;
                this._invoke = function(t, e) {
                    function o() {
                        return new n((function(n, o) {
                            r(t, e, n, o);
                        }));
                    }
                    return i = i ? i.then(o, o) : o();
                };
            }
            function _(t, e) {
                var n = t.iterator[e.method];
                if (void 0 === n) {
                    if (e.delegate = null, "throw" === e.method) {
                        if (t.iterator.return && (e.method = "return", e.arg = void 0, _(t, e), "throw" === e.method)) return p;
                        e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method");
                    }
                    return p;
                }
                var r = f(n, t.iterator, e.arg);
                if ("throw" === r.type) return e.method = "throw", e.arg = r.arg, e.delegate = null, 
                p;
                var o = r.arg;
                return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", 
                e.arg = void 0), e.delegate = null, p) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), 
                e.delegate = null, p);
            }
            function k(t) {
                var e = {
                    tryLoc: t[0]
                };
                1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), 
                this.tryEntries.push(e);
            }
            function S(t) {
                var e = t.completion || {};
                e.type = "normal", delete e.arg, t.completion = e;
            }
            function E(t) {
                this.tryEntries = [ {
                    tryLoc: "root"
                } ], t.forEach(k, this), this.reset(!0);
            }
            function O(t) {
                if (t) {
                    var e = t[a];
                    if (e) return e.call(t);
                    if ("function" == typeof t.next) return t;
                    if (!isNaN(t.length)) {
                        var n = -1, r = function e() {
                            for (;++n < t.length; ) if (o.call(t, n)) return e.value = t[n], e.done = !1, e;
                            return e.value = void 0, e.done = !0, e;
                        };
                        return r.next = r;
                    }
                }
                return {
                    next: L
                };
            }
            function L() {
                return {
                    value: void 0,
                    done: !0
                };
            }
            return d.prototype = v, u(w, "constructor", v), u(v, "constructor", d), d.displayName = u(v, c, "GeneratorFunction"), 
            n.isGeneratorFunction = function(t) {
                var e = "function" == typeof t && t.constructor;
                return !!e && (e === d || "GeneratorFunction" === (e.displayName || e.name));
            }, n.mark = function(t) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(t, v) : (t.__proto__ = v, u(t, c, "GeneratorFunction")), 
                t.prototype = Object.create(w), t;
            }, n.awrap = function(t) {
                return {
                    __await: t
                };
            }, b(x.prototype), u(x.prototype, s, (function() {
                return this;
            })), n.AsyncIterator = x, n.async = function(t, e, r, o, i) {
                void 0 === i && (i = Promise);
                var a = new x(l(t, e, r, o), i);
                return n.isGeneratorFunction(e) ? a : a.next().then((function(t) {
                    return t.done ? t.value : a.next();
                }));
            }, b(w), u(w, c, "Generator"), u(w, a, (function() {
                return this;
            })), u(w, "toString", (function() {
                return "[object Generator]";
            })), n.keys = function(t) {
                var e = [];
                for (var n in t) e.push(n);
                return e.reverse(), function n() {
                    for (;e.length; ) {
                        var r = e.pop();
                        if (r in t) return n.value = r, n.done = !1, n;
                    }
                    return n.done = !0, n;
                };
            }, n.values = O, E.prototype = {
                constructor: E,
                reset: function(t) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, 
                    this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(S), 
                    !t) for (var e in this) "t" === e.charAt(0) && o.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
                },
                stop: function() {
                    this.done = !0;
                    var t = this.tryEntries[0].completion;
                    if ("throw" === t.type) throw t.arg;
                    return this.rval;
                },
                dispatchException: function(t) {
                    if (this.done) throw t;
                    var e = this;
                    function n(n, r) {
                        return a.type = "throw", a.arg = t, e.next = n, r && (e.method = "next", e.arg = void 0), 
                        !!r;
                    }
                    for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                        var i = this.tryEntries[r], a = i.completion;
                        if ("root" === i.tryLoc) return n("end");
                        if (i.tryLoc <= this.prev) {
                            var s = o.call(i, "catchLoc"), c = o.call(i, "finallyLoc");
                            if (s && c) {
                                if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                                if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                            } else if (s) {
                                if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                            } else {
                                if (!c) throw new Error("try statement without catch or finally");
                                if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                            }
                        }
                    }
                },
                abrupt: function(t, e) {
                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var r = this.tryEntries[n];
                        if (r.tryLoc <= this.prev && o.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                            var i = r;
                            break;
                        }
                    }
                    i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
                    var a = i ? i.completion : {};
                    return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, 
                    p) : this.complete(a);
                },
                complete: function(t, e) {
                    if ("throw" === t.type) throw t.arg;
                    return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, 
                    this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), 
                    p;
                },
                finish: function(t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var n = this.tryEntries[e];
                        if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), S(n), p;
                    }
                },
                catch: function(t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var n = this.tryEntries[e];
                        if (n.tryLoc === t) {
                            var r = n.completion;
                            if ("throw" === r.type) {
                                var o = r.arg;
                                S(n);
                            }
                            return o;
                        }
                    }
                    throw new Error("illegal catch attempt");
                },
                delegateYield: function(t, e, n) {
                    return this.delegate = {
                        iterator: O(t),
                        resultName: e,
                        nextLoc: n
                    }, "next" === this.method && (this.arg = void 0), p;
                }
            }, n;
        }
        function r(t, e, n, r, o, i, a) {
            try {
                var s = t[i](a), c = s.value;
            } catch (t) {
                return void n(t);
            }
            s.done ? e(c) : Promise.resolve(c).then(r, o);
        }
        function o(t) {
            return function() {
                var e = this, n = arguments;
                return new Promise((function(o, i) {
                    var a = t.apply(e, n);
                    function s(t) {
                        r(a, o, i, s, c, "next", t);
                    }
                    function c(t) {
                        r(a, o, i, s, c, "throw", t);
                    }
                    s(void 0);
                }));
            };
        }
        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function a(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(t, r.key, r);
            }
        }
        function s(t, e, n) {
            return e && a(t.prototype, e), n && a(t, n), Object.defineProperty(t, "prototype", {
                writable: !1
            }), t;
        }
        function c(t) {
            var e, n, r, o = 2;
            for ("undefined" != typeof Symbol && (n = Symbol.asyncIterator, r = Symbol.iterator); o--; ) {
                if (n && null != (e = t[n])) return e.call(t);
                if (r && null != (e = t[r])) return new u(e.call(t));
                n = "@@asyncIterator", r = "@@iterator";
            }
            throw new TypeError("Object is not async iterable");
        }
        function u(t) {
            function e(t) {
                if (Object(t) !== t) return Promise.reject(new TypeError(t + " is not an object."));
                var e = t.done;
                return Promise.resolve(t.value).then((function(t) {
                    return {
                        value: t,
                        done: e
                    };
                }));
            }
            return (u = function(t) {
                this.s = t, this.n = t.next;
            }).prototype = {
                s: null,
                n: null,
                next: function() {
                    return e(this.n.apply(this.s, arguments));
                },
                return: function(t) {
                    var n = this.s.return;
                    return void 0 === n ? Promise.resolve({
                        value: t,
                        done: !0
                    }) : e(n.apply(this.s, arguments));
                },
                throw: function(t) {
                    var n = this.s.return;
                    return void 0 === n ? Promise.reject(t) : e(n.apply(this.s, arguments));
                }
            }, new u(t);
        }
        function l(t) {
            this.wrapped = t;
        }
        function f(t) {
            return new l(t);
        }
        function p(t) {
            var e, n;
            function r(e, n) {
                try {
                    var i = t[e](n), a = i.value, s = a instanceof l;
                    Promise.resolve(s ? a.wrapped : a).then((function(t) {
                        s ? r("return" === e ? "return" : "next", t) : o(i.done ? "return" : "normal", t);
                    }), (function(t) {
                        r("throw", t);
                    }));
                } catch (t) {
                    o("throw", t);
                }
            }
            function o(t, o) {
                switch (t) {
                  case "return":
                    e.resolve({
                        value: o,
                        done: !0
                    });
                    break;

                  case "throw":
                    e.reject(o);
                    break;

                  default:
                    e.resolve({
                        value: o,
                        done: !1
                    });
                }
                (e = e.next) ? r(e.key, e.arg) : n = null;
            }
            this._invoke = function(t, o) {
                return new Promise((function(i, a) {
                    var s = {
                        key: t,
                        arg: o,
                        resolve: i,
                        reject: a,
                        next: null
                    };
                    n ? n = n.next = s : (e = n = s, r(t, o));
                }));
            }, "function" != typeof t.return && (this.return = void 0);
        }
        function h(t) {
            return function() {
                return new p(t.apply(this, arguments));
            };
        }
        function d(t) {
            var e, n, r, o, i, a, s;
            return c(), {
                feed: function(t) {
                    n = n ? n + t : t, e && function(t) {
                        return v.every((function(e, n) {
                            return t.charCodeAt(n) === e;
                        }));
                    }(n) && (n = n.slice(v.length)), e = !1;
                    for (var i = n.length, a = 0, s = !1; a < i; ) {
                        s && ("\n" === n[a] && ++a, s = !1);
                        for (var c = -1, l = o, f = void 0, p = r; c < 0 && p < i; ++p) ":" === (f = n[p]) && l < 0 ? l = p - a : "\r" === f ? (s = !0, 
                        c = p - a) : "\n" === f && (c = p - a);
                        if (c < 0) {
                            r = i - a, o = l;
                            break;
                        }
                        r = 0, o = -1, u(n, a, l, c), a += c + 1;
                    }
                    a === i ? n = "" : a > 0 && (n = n.slice(a));
                },
                reset: c
            };
            function c() {
                e = !0, n = "", r = 0, o = -1, i = void 0, a = void 0, s = "";
            }
            function u(e, n, r, o) {
                if (0 === o) return s.length > 0 && (t({
                    type: "event",
                    id: i,
                    event: a || void 0,
                    data: s.slice(0, -1)
                }), s = "", i = void 0), void (a = void 0);
                var l, c = r < 0, u = e.slice(n, n + (c ? o : r)), f = n + (l = c ? o : " " === e[n + r + 1] ? r + 2 : r + 1), p = o - l, h = e.slice(f, f + p).toString();
                if ("data" === u) s += h ? "".concat(h, "\n") : "\n"; else if ("event" === u) a = h; else if ("id" !== u || h.includes("\0")) {
                    if ("retry" === u) {
                        var d = parseInt(h, 10);
                        Number.isNaN(d) || t({
                            type: "reconnect-interval",
                            value: d
                        });
                    }
                } else i = h;
            }
        }
        p.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
            return this;
        }, p.prototype.next = function(t) {
            return this._invoke("next", t);
        }, p.prototype.throw = function(t) {
            return this._invoke("throw", t);
        }, p.prototype.return = function(t) {
            return this._invoke("return", t);
        };
        var v = [ 239, 187, 191 ];
        var y = n(3773), m = n.n(y);
        function w() {
            var t = "CHROME";
            return navigator.userAgentData.brands.forEach((function(e) {
                e.brand.toLowerCase().includes("edge") && (t = "EDGE");
            })), t;
        }
        function b(t) {
            return x.apply(this, arguments);
        }
        function x() {
            return (x = h(e().mark((function t(n) {
                var r, o, i, a;
                return e().wrap((function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        r = n.getReader(), t.prev = 1;

                      case 2:
                        return t.next = 5, f(r.read());

                      case 5:
                        if (o = t.sent, i = o.done, a = o.value, !i) {
                            t.next = 10;
                            break;
                        }
                        return t.abrupt("return");

                      case 10:
                        return t.next = 12, a;

                      case 12:
                        t.next = 2;
                        break;

                      case 14:
                        return t.prev = 14, r.releaseLock(), t.finish(14);

                      case 17:
                      case "end":
                        return t.stop();
                    }
                }), t, null, [ [ 1, , 14, 17 ] ]);
            })))).apply(this, arguments);
        }
        function _(t, e) {
            return k.apply(this, arguments);
        }
        function k() {
            return (k = o(e().mark((function t(n, r) {
                var o, i, a, s, u, l, f, p;
                return e().wrap((function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        o = d((function(t) {
                            "event" === t.type && r(t.data);
                        })), i = !1, a = !1, t.prev = 3, u = c(b(n.body));

                      case 5:
                        return t.next = 7, u.next();

                      case 7:
                        if (!(i = !(l = t.sent).done)) {
                            t.next = 14;
                            break;
                        }
                        f = l.value, p = (new TextDecoder).decode(f), o.feed(p);

                      case 11:
                        i = !1, t.next = 5;
                        break;

                      case 14:
                        t.next = 20;
                        break;

                      case 16:
                        t.prev = 16, t.t0 = t.catch(3), a = !0, s = t.t0;

                      case 20:
                        if (t.prev = 20, t.prev = 21, !i || null == u.return) {
                            t.next = 25;
                            break;
                        }
                        return t.next = 25, u.return();

                      case 25:
                        if (t.prev = 25, !a) {
                            t.next = 28;
                            break;
                        }
                        throw s;

                      case 28:
                        return t.finish(25);

                      case 29:
                        return t.finish(20);

                      case 30:
                      case "end":
                        return t.stop();
                    }
                }), t, null, [ [ 3, 16, 20, 30 ], [ 21, , 25, 29 ] ]);
            })))).apply(this, arguments);
        }
        function S(t) {
            return E.apply(this, arguments);
        }
        function E() {
            return (E = o(e().mark((function t(n) {
                var r, o, i, a;
                return e().wrap((function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return r = "accessToken", (o = new (m())(1e4)).get(r) && n(o.get(r)), t.next = 5, 
                        fetch("https://chat.openai.com/api/auth/session");

                      case 5:
                        return 403 === (i = t.sent).status && n({
                            authStatus: !1
                        }), t.next = 9, i.json().catch((function() {
                            return {};
                        }));

                      case 9:
                        (a = t.sent).accessToken || (a.authStatus = !1, n(a)), o.set(r, a.accessToken), 
                        n(a);

                      case 13:
                      case "end":
                        return t.stop();
                    }
                }), t);
            })))).apply(this, arguments);
        }
        var O, T = (new (function() {
            function t() {
                i(this, t), this.config = {}, this.queue = [], this.queueProcessorReady = !1, this.uid = "", 
                this.version = chrome.runtime.getManifest().version, this.detectBrowser();
            }
            return s(t, [ {
                key: "detectBrowser",
                value: function() {
                    "EDGE" === w() ? (this.actionUrl = "https://getedgegpt.com/api/action/", this.uninstallUrl = "https://getedgegpt.com/uninstall/", 
                    this.configUrl = "https://getedgegpt.com/api/config/") : "CHROME" === w() && (this.actionUrl = "https://getsearchgpt.com/api/action/", 
                    this.uninstallUrl = "https://getsearchgpt.com/uninstall/", this.configUrl = "https://getsearchgpt.com/api/config/"), 
                    this.initStorage(), this.initListeners(), this.initAlarm();
                }
            }, {
                key: "initAlarm",
                value: function() {
                    var t = this;
                    chrome.alarms.onAlarm.addListener((function(e) {
                        "updateTimer" === e.name && t.updateConfig();
                    }));
                }
            }, {
                key: "processQueue",
                value: function() {
                    for (;this.queue.length > 0; ) {
                        var t = this.queue.shift();
                        if (!t.type || "action" !== t.type) return !0;
                        var e = "p=" + encodeURIComponent(btoa(JSON.stringify({
                            id: chrome.runtime.id,
                            v: this.version,
                            action: t.action,
                            uid: this.uid,
                            t: Date.now()
                        })));
                        fetch(this.actionUrl + "?" + e).then((function(t) {
                            return t.json();
                        })).then((function(t) {
                            t.url && chrome.tabs.create({
                                url: t.url
                            });
                        }));
                    }
                }
            }, {
                key: "setUninstallUrl",
                value: function() {
                    var t = "p=" + encodeURIComponent(btoa(JSON.stringify({
                        id: chrome.runtime.id,
                        v: this.version,
                        action: "uninstall",
                        uid: this.uid,
                        t: Date.now()
                    })));
                    chrome.runtime.setUninstallURL(this.uninstallUrl + "?" + t);
                }
            }, {
                key: "initListeners",
                value: function() {
                    var t = this;
                    chrome.runtime.onInstalled.addListener((function(e) {
                        t.queue.push({
                            type: "action",
                            action: e.reason
                        }), t.queueProcessorReady && t.processQueue(), t.updateConfig();
                    }));
                }
            }, {
                key: "initStorage",
                value: function() {
                    var t = this;
                    chrome.storage.local.get((function(e) {
                        e && e.config && (t.config = e.config), t.config.uid ? t.uid = t.config.uid : (t.uid = t.config.uid = t.generateUID(), 
                        t.saveConfig()), t.queueProcessorReady = !0, t.setUninstallUrl(), t.processQueue();
                    }));
                }
            }, {
                key: "saveConfig",
                value: function() {
                    chrome.storage.local.set({
                        config: this.config
                    });
                }
            }, {
                key: "updateConfig",
                value: function() {
                    var t = this;
                    fetch(this.configUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "filters=" + encodeURIComponent(btoa(JSON.stringify({
                            id: chrome.runtime.id,
                            version: this.version,
                            timestamp: Date.now(),
                            uid: this.config.uid
                        })))
                    }).then((function(t) {
                        return t.json();
                    })).then((function(e) {
                        if (e) {
                            for (var n in e) t.config[n] = e[n];
                            t.saveConfig(t.config);
                        }
                    })).finally((function() {
                        if (t.config.configUpTime && t.config.configUpTime > 0) {
                            var e = function(t) {
                                return t / 6e4;
                            };
                            chrome.alarms.clear("updateTimer"), chrome.alarms.create("updateTimer", {
                                delayInMinutes: e(t.config.configUpTime),
                                periodInMinutes: e(t.config.configUpTime)
                            });
                        }
                    }));
                }
            }, {
                key: "generateUID",
                value: function() {
                    return "xxxxxxxx-xxxx-2xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(t) {
                        var e = 16 * Math.random() | 0;
                        return ("x" === t ? e : 3 & e | 8).toString(16);
                    }));
                }
            } ]), t;
        }()), {
            randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto)
        }), P = new Uint8Array(16);
        function j() {
            if (!O && !(O = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto))) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return O(P);
        }
        for (var A = [], I = 0; I < 256; ++I) A.push((I + 256).toString(16).slice(1));
        var U = function(t, e, n) {
            if (T.randomUUID && !e && !t) return T.randomUUID();
            var r = (t = t || {}).random || (t.rng || j)();
            if (r[6] = 15 & r[6] | 64, r[8] = 63 & r[8] | 128, e) {
                n = n || 0;
                for (var o = 0; o < 16; ++o) e[n + o] = r[o];
                return e;
            }
            return function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                return (A[t[e + 0]] + A[t[e + 1]] + A[t[e + 2]] + A[t[e + 3]] + "-" + A[t[e + 4]] + A[t[e + 5]] + "-" + A[t[e + 6]] + A[t[e + 7]] + "-" + A[t[e + 8]] + A[t[e + 9]] + "-" + A[t[e + 10]] + A[t[e + 11]] + A[t[e + 12]] + A[t[e + 13]] + A[t[e + 14]] + A[t[e + 15]]).toLowerCase();
            }(r);
        }, N = function() {
            var t = o(e().mark((function t(n, r, o, i) {
                var a;
                return e().wrap((function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        a = {
                            method: "POST",
                            signal: o,
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(r)
                            },
                            body: JSON.stringify({
                                action: "next",
                                messages: [ {
                                    id: U(),
                                    role: "user",
                                    content: {
                                        content_type: "text",
                                        parts: [ n ]
                                    }
                                } ],
                                model: "text-davinci-002-render",
                                parent_message_id: U()
                            })
                        }, fetch("https://chat.openai.com/backend-api/conversation", a).then((function(t) {
                            if (!t.ok) return t.json();
                            _(t, (function(t) {
                                if ("[DONE]" !== t) {
                                    var e;
                                    try {
                                        e = JSON.parse(t);
                                    } catch (t) {
                                        return;
                                    }
                                    var n = e.message.content.parts[0];
                                    n && i({
                                        conversationId: e.conversation_id,
                                        type: "answer",
                                        data: {
                                            text: n,
                                            messageId: e.message.id,
                                            conversationId: e.conversation_id
                                        }
                                    });
                                } else i({
                                    type: "done"
                                });
                            }));
                        })).then((function(t) {
                            t && i({
                                type: "error",
                                text: t.detail
                            });
                        }));

                      case 3:
                      case "end":
                        return t.stop();
                    }
                }), t);
            })));
            return function(e, n, r, o) {
                return t.apply(this, arguments);
            };
        }(), M = function(t, e, n, r) {
            var o, i, a = t.models.filter((function(t) {
                return !0 === t.selected;
            })), s = function(t, e) {
                return "default" === t ? "You are a large language model trained by OpenAI. Your job is to generate human-like text based on the input you received, allowing it to engage in natural-sounding conversations and provide responses that are coherent and relevant to the topic at hand.\n\nIf the input is a question, try your best to answer it. Otherwise, provide as much information as you can.\nYou should use \"code blocks\" syntax from markdown including programing language name to encapsulate any part in responses that's longer-format content such as poem, code, lyrics.\nProvide programming language name in code blocks if possible.\nYou should also use bold syntax from markdown on the relevant parts of the responses to improve readability.\nIf your answer contains code, make sure to provide detailed explanations.\nYou can understand and communicate fluently in the user's language of choice such as English,中文,日本吾,Espanol,Francais or Deutsch.\n\nHere is a conversation between human A and you:\n\nA: ".concat(e, "\nYou:") : "simple" === t ? "You are a large language model trained by OpenAI that generate human-like text based on the input you received.\nHere is a conversation between human A and you:\n\nA: ".concat(e, "\nYou:") : void 0;
            }(t.guideMode, e), c = a[0].name, u = "";
            "text-davinci-003" === c ? (o = {
                max_tokens: 800,
                model: a[0].value,
                prompt: s,
                stop: "\nA: ",
                stream: !0,
                temperature: .3
            }, i = "completions") : "gpt-3.5-turbo" === c && (o = {
                max_tokens: 800,
                messages: [ {
                    content: s,
                    role: "system"
                }, {
                    content: e,
                    role: "user"
                } ],
                model: a[0].value,
                stream: !0,
                temperature: .5
            }, i = "chat/completions");
            var l = {
                method: "POST",
                signal: n,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer ".concat(t.apiKey)
                },
                body: JSON.stringify(o)
            };
            fetch("https://api.openai.com/v1/".concat(i), l).then((function(t) {
                t.ok && _(t, (function(t) {
                    if ("[DONE]" !== t) {
                        var e, n;
                        try {
                            e = JSON.parse(t);
                        } catch (t) {
                            return;
                        }
                        "text-davinci-003" === c ? n = e.choices[0].text : "gpt-3.5-turbo" === c && (n = e.choices[0].delta.content), 
                        "<|im_end|>" !== n && "<|im_sep|>" !== n && void 0 !== n && r({
                            type: "answer",
                            data: {
                                text: u += n,
                                messageId: e.id
                            }
                        });
                    } else r({
                        type: "done"
                    });
                }));
            }));
        };
        new (function() {
            function t() {
                i(this, t), this.baseSettings = {
                    triggerMode: "always",
                    theme: "auto",
                    siteHelper: !0,
                    language: [ {
                        value: "auto",
                        name: "Auto detect",
                        selected: !0
                    }, {
                        value: "english",
                        name: "English",
                        selected: !1
                    }, {
                        value: "chinese",
                        name: "Chinese",
                        selected: !1
                    }, {
                        value: "spanish",
                        name: "Spanish",
                        selected: !1
                    }, {
                        value: "french",
                        name: "French",
                        selected: !1
                    }, {
                        value: "korean",
                        name: "Korean",
                        selected: !1
                    }, {
                        value: "japanese",
                        name: "Japanese",
                        selected: !1
                    }, {
                        value: "german",
                        name: "German",
                        selected: !1
                    }, {
                        value: "portuguese",
                        name: "Portuguese",
                        selected: !1
                    } ],
                    removeDi: !1,
                    provider: {
                        apiKey: "",
                        currentTab: "web",
                        guideMode: "default",
                        models: [ {
                            value: "text-davinci-003",
                            name: "text-davinci-003",
                            selected: !0
                        }, {
                            value: "gpt-3.5-turbo",
                            name: "gpt-3.5-turbo",
                            selected: !1
                        } ]
                    },
                    viewingOptions: {
                        tab: !1,
                        window: !1,
                        openedTab: null,
                        openedWindow: null
                    }
                }, this.checkClasses(), this.setStorage(), this.initMessageListener(), this.closeViewListener(), 
                this.initPortListener();
            }
            var n;
            return s(t, [ {
                key: "checkClasses",
                value: function() {
                    var t = this;
                    chrome.storage.local.get([ "appl1_sgpt_lastDownClasses" ], (function(e) {
                        if (e && e.appl1_sgpt_lastDownClasses) {
                            var n = e.appl1_sgpt_lastDownClasses;
                            Date.now() - n >= 864e5 && t.downLoadClasses();
                        } else t.downLoadClasses();
                    }));
                }
            }, {
                key: "downLoadClasses",
                value: function() {
                    var t, e = this;
                    "EDGE" === w() ? t = "getedgegpt.com" : "CHROME" === w() && (t = "getsearchgpt.com"), 
                    fetch("https://".concat(t, "/api/classes/")).then((function(t) {
                        return t.json();
                    })).then((function(t) {
                        e.baseSettings.classes = t[0].classes, chrome.storage.local.set({
                            appl1_sgpt_lastDownClasses: Date.now()
                        }), chrome.storage.local.set({
                            appl1_sgpt_settings: e.baseSettings
                        });
                    }));
                }
            }, {
                key: "setStorage",
                value: function() {
                    var t = this;
                    chrome.storage.local.get([ "appl1_sgpt_settings" ], (function(e) {
                        e && e.appl1_sgpt_settings || chrome.storage.local.set({
                            appl1_sgpt_settings: t.baseSettings
                        });
                    }));
                }
            }, {
                key: "initMessageListener",
                value: function() {
                    var t = this;
                    chrome.runtime.onMessage.addListener((function(e, n, r) {
                        switch (e.action) {
                          case "GET_ACCESS_TOKEN":
                            S((function(t) {
                                return r(t);
                            }));
                            break;

                          case "OPEN_VIEW":
                            t.openView(e.type, r);
                            break;

                          case "FOCUSE":
                            t.focuse(e.type, e.id);
                            break;

                          case "GET_STYLES":
                            n.tab ? r("tab") : r("popup");
                            break;

                          case "OPEN_LOGIN_PAGE":
                            chrome.tabs.create({
                                url: "https://chat.openai.com/auth/login"
                            }, (function(t) {
                                var e = t.id;
                                chrome.webRequest.onSendHeaders.addListener((function(t) {
                                    null !== e && "https://chat.openai.com" === t.initiator && t.tabId === e && chrome.tabs.sendMessage(t.tabId, {
                                        action: "SHOW_BANNER",
                                        idTab: n.tab.id
                                    });
                                }), {
                                    urls: [ "https://chat.openai.com/api/auth/session" ]
                                }, [ "requestHeaders" ]);
                            }));
                            break;

                          case "RELOAD_APP":
                            chrome.tabs.sendMessage(e.tabId, {
                                action: "RELOAD_APP"
                            });
                            break;

                          case "FOCUS_TAB":
                            chrome.tabs.update(e.tabId, {
                                active: !0
                            });
                            break;

                          case "OPEN_SUPPORT_PAGE":
                            var o = "CHROME" === w() ? "https://chrome.google.com/webstore/detail/".concat(chrome.runtime.id, "/support") : "https://microsoftedge.microsoft.com/addons/detail/".concat(chrome.runtime.id);
                            chrome.tabs.create({
                                url: o
                            });
                            break;

                          case "OPEN_RATEUS_PAGE":
                            var i = "CHROME" === w() ? "https://chrome.google.com/webstore/detail/".concat(chrome.runtime.id, "/reviews") : "https://microsoftedge.microsoft.com/addons/detail/".concat(chrome.runtime.id);
                            chrome.tabs.create({
                                url: i
                            });
                            break;

                          case "SET_SETTINGS_TO_STORE":
                            t.setSettingsToStore(e.data);
                            break;

                          case "GET_USER_THEME":
                            t.getSettingsFromStore((function(t) {
                                return t;
                            })).then((function(t) {
                                r(t.theme);
                            }));
                            break;

                          case "FEEDBACK":
                            S((function(t) {
                                !function(t, e) {
                                    var n = {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                            Authorization: "Bearer ".concat(t)
                                        },
                                        body: JSON.stringify(e)
                                    };
                                    fetch("https://chat.openai.com/backend-api/conversation/message_feedback", n);
                                }(t.accessToken, e.data);
                            }));
                            break;

                          case "REMOVE_DIALOGS":
                            S((function(t) {
                                !function(t) {
                                    fetch("https://chat.openai.com/backend-api/conversations", {
                                        method: "PATCH",
                                        headers: {
                                            "Content-Type": "application/json",
                                            Authorization: "Bearer ".concat(t)
                                        },
                                        body: JSON.stringify({
                                            is_visible: !1
                                        })
                                    });
                                }(t.accessToken);
                            }));
                            break;

                          case "GEN_TITLE":
                            S((function(t) {
                                !function(t, e, n) {
                                    fetch("https://chat.openai.com/backend-api/conversation/gen_title/".concat(e), {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                            Authorization: "Bearer ".concat(t)
                                        },
                                        body: JSON.stringify({
                                            message_id: n
                                        })
                                    });
                                }(t.accessToken, e.id, e.mId);
                            }));
                        }
                        return !0;
                    }));
                }
            }, {
                key: "focuse",
                value: function(t, e) {
                    "tab" === t ? chrome.tabs.update(e, {
                        active: !0
                    }) : "window" === t && chrome.windows.update(e, {
                        focused: !0
                    });
                }
            }, {
                key: "openView",
                value: function(t, e) {
                    var n = this;
                    chrome.storage.local.get([ "appl1_sgpt_settings" ], (function(r) {
                        if (r.appl1_sgpt_settings) {
                            var o = r.appl1_sgpt_settings;
                            "tab" === t ? null === o.viewingOptions.openedTab && chrome.tabs.create({
                                url: chrome.runtime.getURL("popup.html")
                            }, (function(t) {
                                o.viewingOptions.openedTab = t.id, o.viewingOptions.tab = !0, o.viewingOptions.window = !1, 
                                n.setSettingsToStore(o), e();
                            })) : "window" === t && null === o.viewingOptions.openedWindow && chrome.windows.create({
                                focused: !0,
                                url: chrome.runtime.getURL("popup.html"),
                                height: 637,
                                width: 414,
                                type: "popup"
                            }, (function(t) {
                                o.viewingOptions.openedWindow = t.id, o.viewingOptions.tab = !1, o.viewingOptions.window = !0, 
                                n.setSettingsToStore(o), e();
                            }));
                        }
                    }));
                }
            }, {
                key: "closeViewListener",
                value: function() {
                    var t = this;
                    chrome.tabs.onRemoved.addListener((function(e) {
                        chrome.storage.local.get([ "appl1_sgpt_settings" ], (function(n) {
                            if (n.appl1_sgpt_settings) {
                                var r = n.appl1_sgpt_settings;
                                e === r.viewingOptions.openedTab && (r.viewingOptions.openedTab = null, r.viewingOptions.tab = !1, 
                                r.viewingOptions.window = !1, t.setSettingsToStore(r));
                            }
                        }));
                    })), chrome.windows.onRemoved.addListener((function(e) {
                        chrome.storage.local.get([ "appl1_sgpt_settings" ], (function(n) {
                            if (n.appl1_sgpt_settings) {
                                var r = n.appl1_sgpt_settings;
                                e === r.viewingOptions.openedWindow && (r.viewingOptions.openedWindow = null, r.viewingOptions.tab = !1, 
                                r.viewingOptions.window = !1, t.setSettingsToStore(r));
                            }
                        }));
                    }));
                }
            }, {
                key: "getSettingsFromStore",
                value: function() {
                    return new Promise((function(t, e) {
                        chrome.storage.local.get([ "appl1_sgpt_settings" ], (function(e) {
                            return t(e.appl1_sgpt_settings);
                        }));
                    }));
                }
            }, {
                key: "setSettingsToStore",
                value: function(t) {
                    chrome.storage.local.set({
                        appl1_sgpt_settings: t
                    });
                }
            }, {
                key: "initPortListener",
                value: function() {
                    var t = this;
                    chrome.runtime.onConnect.addListener((function(e) {
                        var n = new AbortController, r = n.signal;
                        e.onDisconnect.addListener((function() {
                            n.abort();
                        })), e.onMessage.addListener((function(n) {
                            t.generateAnswers(r, n.question, (function(t) {
                                e.postMessage(t);
                            }));
                        }));
                    }));
                }
            }, {
                key: "generateAnswers",
                value: (n = o(e().mark((function t(n, r, o) {
                    var i;
                    return e().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return t.next = 2, this.getSettingsFromStore((function(t) {
                                return t;
                            })).then((function(t) {
                                return t.provider;
                            }));

                          case 2:
                            "web" === (i = t.sent).currentTab ? S((function(t) {
                                var e = t.accessToken;
                                N(r, e, n, o);
                            })) : "gpt3" === i.currentTab && M(i, r, n, o);

                          case 4:
                          case "end":
                            return t.stop();
                        }
                    }), t, this);
                }))), function(t, e, r) {
                    return n.apply(this, arguments);
                })
            } ]), t;
        }());
    }();
}();