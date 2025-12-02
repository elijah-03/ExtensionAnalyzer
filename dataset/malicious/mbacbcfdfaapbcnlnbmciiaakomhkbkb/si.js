/*
 MIT-promiscuous-?Ruben Verborgh Mediator.js Library v0.9.7
 https://github.com/ajacksified/Mediator.js

 Copyright 2013, Jack Lawson
 MIT Licensed (http://www.opensource.org/licenses/mit-license.php)

 For more information: http://thejacklawson.com/2011/06/mediators-for-modularized-asynchronous-programming-in-javascript/index.html
 Project on GitHub: https://github.com/ajacksified/Mediator.js

 Last update: October 19 2013
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(g, k, e) {
  g != Array.prototype && g != Object.prototype && (g[k] = e.value);
};
$jscomp.getGlobal = function(g) {
  return "undefined" != typeof window && window === g ? g : "undefined" != typeof global && null != global ? global : g;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var g = 0;
  return function(k) {
    return $jscomp.SYMBOL_PREFIX + (k || "") + g++;
  };
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var g = $jscomp.global.Symbol.iterator;
  g || (g = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[g] && $jscomp.defineProperty(Array.prototype, g, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(g) {
  var k = 0;
  return $jscomp.iteratorPrototype(function() {
    return k < g.length ? {done:!1, value:g[k++]} : {done:!0};
  });
};
$jscomp.iteratorPrototype = function(g) {
  $jscomp.initSymbolIterator();
  g = {next:g};
  g[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return g;
};
$jscomp.iteratorFromArray = function(g, k) {
  $jscomp.initSymbolIterator();
  g instanceof String && (g += "");
  var e = 0, l = {next:function() {
    if (e < g.length) {
      var a = e++;
      return {value:k(a, g[a]), done:!1};
    }
    l.next = function() {
      return {done:!0, value:void 0};
    };
    return l.next();
  }};
  l[Symbol.iterator] = function() {
    return l;
  };
  return l;
};
$jscomp.polyfill = function(g, k, e, l) {
  if (k) {
    e = $jscomp.global;
    g = g.split(".");
    for (l = 0; l < g.length - 1; l++) {
      var a = g[l];
      a in e || (e[a] = {});
      e = e[a];
    }
    g = g[g.length - 1];
    l = e[g];
    k = k(l);
    k != l && null != k && $jscomp.defineProperty(e, g, {configurable:!0, writable:!0, value:k});
  }
};
$jscomp.polyfill("Array.prototype.keys", function(g) {
  return g ? g : function() {
    return $jscomp.iteratorFromArray(this, function(g) {
      return g;
    });
  };
}, "es6", "es3");
$jscomp.makeIterator = function(g) {
  $jscomp.initSymbolIterator();
  var k = g[Symbol.iterator];
  return k ? k.call(g) : $jscomp.arrayIterator(g);
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(g) {
  function k() {
    this.batch_ = null;
  }
  function e(b) {
    return b instanceof a ? b : new a(function(a, c) {
      a(b);
    });
  }
  if (g && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return g;
  }
  k.prototype.asyncExecute = function(a) {
    null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_());
    this.batch_.push(a);
    return this;
  };
  k.prototype.asyncExecuteBatch_ = function() {
    var a = this;
    this.asyncExecuteFunction(function() {
      a.executeBatch_();
    });
  };
  var l = $jscomp.global.setTimeout;
  k.prototype.asyncExecuteFunction = function(a) {
    l(a, 0);
  };
  k.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var a = this.batch_;
      this.batch_ = [];
      for (var d = 0; d < a.length; ++d) {
        var c = a[d];
        delete a[d];
        try {
          c();
        } catch (f) {
          this.asyncThrow_(f);
        }
      }
    }
    this.batch_ = null;
  };
  k.prototype.asyncThrow_ = function(a) {
    this.asyncExecuteFunction(function() {
      throw a;
    });
  };
  var a = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var b = this.createResolveAndReject_();
    try {
      a(b.resolve, b.reject);
    } catch (h) {
      b.reject(h);
    }
  };
  a.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(b) {
        c || (c = !0, a.call(d, b));
      };
    }
    var d = this, c = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  a.prototype.resolveTo_ = function(b) {
    if (b === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (b instanceof a) {
        this.settleSameAsPromise_(b);
      } else {
        a: {
          switch(typeof b) {
            case "object":
              var d = null != b;
              break a;
            case "function":
              d = !0;
              break a;
            default:
              d = !1;
          }
        }
        d ? this.resolveToNonPromiseObj_(b) : this.fulfill_(b);
      }
    }
  };
  a.prototype.resolveToNonPromiseObj_ = function(a) {
    var b = void 0;
    try {
      b = a.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof b ? this.settleSameAsThenable_(b, a) : this.fulfill_(a);
  };
  a.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  a.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  a.prototype.settle_ = function(a, d) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + d | "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = d;
    this.executeOnSettledCallbacks_();
  };
  a.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = this.onSettledCallbacks_, d = 0; d < a.length; ++d) {
        a[d].call(), a[d] = null;
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var c = new k;
  a.prototype.settleSameAsPromise_ = function(a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject);
  };
  a.prototype.settleSameAsThenable_ = function(a, d) {
    var b = this.createResolveAndReject_();
    try {
      a.call(d, b.resolve, b.reject);
    } catch (f) {
      b.reject(f);
    }
  };
  a.prototype.then = function(b, d) {
    function c(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          f(a(b));
        } catch (w) {
          r(w);
        }
      } : b;
    }
    var f, r, e = new a(function(a, b) {
      f = a;
      r = b;
    });
    this.callWhenSettled_(c(b, f), c(d, r));
    return e;
  };
  a.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  a.prototype.callWhenSettled_ = function(a, d) {
    function b() {
      switch(f.state_) {
        case 1:
          a(f.result_);
          break;
        case 2:
          d(f.result_);
          break;
        default:
          throw Error("Unexpected state: " + f.state_);
      }
    }
    var f = this;
    null == this.onSettledCallbacks_ ? c.asyncExecute(b) : this.onSettledCallbacks_.push(function() {
      c.asyncExecute(b);
    });
  };
  a.resolve = e;
  a.reject = function(b) {
    return new a(function(a, c) {
      c(b);
    });
  };
  a.race = function(b) {
    return new a(function(a, c) {
      for (var d = $jscomp.makeIterator(b), h = d.next(); !h.done; h = d.next()) {
        e(h.value).callWhenSettled_(a, c);
      }
    });
  };
  a.all = function(b) {
    var c = $jscomp.makeIterator(b), h = c.next();
    return h.done ? e([]) : new a(function(a, b) {
      function d(b) {
        return function(t) {
          f[b] = t;
          r--;
          0 == r && a(f);
        };
      }
      var f = [], r = 0;
      do {
        f.push(void 0), r++, e(h.value).callWhenSettled_(d(f.length - 1), b), h = c.next();
      } while (!h.done);
    });
  };
  return a;
}, "es6", "es3");
$jscomp.findInternal = function(g, k, e) {
  g instanceof String && (g = String(g));
  for (var l = g.length, a = 0; a < l; a++) {
    var c = g[a];
    if (k.call(e, c, a, g)) {
      return {i:a, v:c};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.prototype.find", function(g) {
  return g ? g : function(g, e) {
    return $jscomp.findInternal(this, g, e).v;
  };
}, "es6", "es3");
(function() {
  (function(g) {
    function k(l) {
      if (e[l]) {
        return e[l].exports;
      }
      var a = e[l] = {exports:{}, id:l, loaded:!1};
      g[l].call(a.exports, a, a.exports, k);
      a.loaded = !0;
      return a.exports;
    }
    var e = {};
    k.m = g;
    k.c = e;
    k.p = "";
    return k(0);
  })([function(g, k, e) {
    e(55);
  }, , , , , , , , function(g, k) {
    g.exports = function() {
      try {
        window.localStorage && window.localStorage["svt.debug"] && console.log.apply(console, arguments);
      } catch (e) {
      }
    };
  }, , , , , , function(g, k, e) {
    g.exports = "undefined" === typeof Promise ? e(15) : Promise;
  }, function(g, k, e) {
    (function(e) {
      (function(a, c) {
        function b(a, b) {
          return (typeof b)[0] == a;
        }
        function d(f, e) {
          e = function H(r, t, u, x, g, l) {
            x = H.q;
            if (r != b) {
              return d(function(a, b) {
                x.push({p:this, r:a, j:b, 1:r, 0:t});
              });
            }
            if (u && b(a, u) | b(c, u)) {
              try {
                g = u.then;
              } catch (G) {
                t = 0, u = G;
              }
            }
            if (b(a, g)) {
              l = function(a) {
                return function(t) {
                  g && (g = 0, H(b, a, t));
                };
              };
              try {
                g.call(u, l(1), t = l(0));
              } catch (G) {
                t(G);
              }
            } else {
              for (e = function(c, r) {
                return b(a, c = t ? c : r) ? d(function(a, b) {
                  h(this, a, b, u, c);
                }) : f;
              }, l = 0; l < x.length;) {
                g = x[l++], b(a, r = g[t]) ? h(g.p, g.r, g.j, u, r) : (t ? g.r : g.j)(u);
              }
            }
          };
          e.q = [];
          f.call(f = {then:function(a, b) {
            return e(a, b);
          }, catch:function(a) {
            return e(0, a);
          }}, function(a) {
            e(b, 1, a);
          }, function(a) {
            e(b, 0, a);
          });
          return f;
        }
        function h(d, f, h, g, t) {
          e(function() {
            try {
              t = (g = t(g)) && b(c, g) | b(a, g) && g.then, b(a, t) ? g == d ? h(TypeError()) : t.call(g, f, h) : f(g);
            } catch (w) {
              h(w);
            }
          });
        }
        function f(a) {
          return d(function(b) {
            b(a);
          });
        }
        g.exports = d;
        d.resolve = f;
        d.reject = function(a) {
          return d(function(b, c) {
            c(a);
          });
        };
        d.all = function(a) {
          return d(function(b, c, d, t) {
            t = [];
            d = a.length || b(t);
            a.map(function(a, h) {
              f(a).then(function(a) {
                t[h] = a;
                --d || b(t);
              }, c);
            });
          });
        };
      })("f", "o");
    }).call(k, e(16).setImmediate);
  }, function(g, k, e) {
    (function(g, a) {
      function c(a, b) {
        this._id = a;
        this._clearFn = b;
      }
      var b = e(17).nextTick, d = Function.prototype.apply, h = Array.prototype.slice, f = {}, r = 0;
      k.setTimeout = function() {
        return new c(d.call(setTimeout, window, arguments), clearTimeout);
      };
      k.setInterval = function() {
        return new c(d.call(setInterval, window, arguments), clearInterval);
      };
      k.clearTimeout = k.clearInterval = function(a) {
        a.close();
      };
      c.prototype.unref = c.prototype.ref = function() {
      };
      c.prototype.close = function() {
        this._clearFn.call(window, this._id);
      };
      k.enroll = function(a, b) {
        clearTimeout(a._idleTimeoutId);
        a._idleTimeout = b;
      };
      k.unenroll = function(a) {
        clearTimeout(a._idleTimeoutId);
        a._idleTimeout = -1;
      };
      k._unrefActive = k.active = function(a) {
        clearTimeout(a._idleTimeoutId);
        var b = a._idleTimeout;
        0 <= b && (a._idleTimeoutId = setTimeout(function() {
          a._onTimeout && a._onTimeout();
        }, b));
      };
      k.setImmediate = "function" === typeof g ? g : function(a) {
        var c = r++, d = 2 > arguments.length ? !1 : h.call(arguments, 1);
        f[c] = !0;
        b(function() {
          f[c] && (d ? a.apply(null, d) : a.call(null), k.clearImmediate(c));
        });
        return c;
      };
      k.clearImmediate = "function" === typeof a ? a : function(a) {
        delete f[a];
      };
    }).call(k, e(16).setImmediate, e(16).clearImmediate);
  }, function(g, k) {
    function e() {
      throw Error("setTimeout has not been defined");
    }
    function l() {
      throw Error("clearTimeout has not been defined");
    }
    function a(a) {
      if (r === setTimeout) {
        return setTimeout(a, 0);
      }
      if ((r === e || !r) && setTimeout) {
        return r = setTimeout, setTimeout(a, 0);
      }
      try {
        return r(a, 0);
      } catch (I) {
        try {
          return r.call(null, a, 0);
        } catch (J) {
          return r.call(this, a, 0);
        }
      }
    }
    function c(a) {
      if (u === clearTimeout) {
        return clearTimeout(a);
      }
      if ((u === l || !u) && clearTimeout) {
        return u = clearTimeout, clearTimeout(a);
      }
      try {
        return u(a);
      } catch (I) {
        try {
          return u.call(null, a);
        } catch (J) {
          return u.call(this, a);
        }
      }
    }
    function b() {
      v && t && (v = !1, t.length ? m = t.concat(m) : w = -1, m.length && d());
    }
    function d() {
      if (!v) {
        var d = a(b);
        v = !0;
        for (var f = m.length; f;) {
          t = m;
          for (m = []; ++w < f;) {
            t && t[w].run();
          }
          w = -1;
          f = m.length;
        }
        t = null;
        v = !1;
        c(d);
      }
    }
    function h(a, b) {
      this.fun = a;
      this.array = b;
    }
    function f() {
    }
    g = g.exports = {};
    try {
      var r = "function" === typeof setTimeout ? setTimeout : e;
    } catch (x) {
      r = e;
    }
    try {
      var u = "function" === typeof clearTimeout ? clearTimeout : l;
    } catch (x) {
      u = l;
    }
    var m = [], v = !1, t, w = -1;
    g.nextTick = function(b) {
      var c = Array(arguments.length - 1);
      if (1 < arguments.length) {
        for (var t = 1; t < arguments.length; t++) {
          c[t - 1] = arguments[t];
        }
      }
      m.push(new h(b, c));
      1 !== m.length || v || a(d);
    };
    h.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    g.title = "browser";
    g.browser = !0;
    g.env = {};
    g.argv = [];
    g.version = "";
    g.versions = {};
    g.on = f;
    g.addListener = f;
    g.once = f;
    g.off = f;
    g.removeListener = f;
    g.removeAllListeners = f;
    g.emit = f;
    g.prependListener = f;
    g.prependOnceListener = f;
    g.listeners = function(a) {
      return [];
    };
    g.binding = function(a) {
      throw Error("process.binding is not supported");
    };
    g.cwd = function() {
      return "/";
    };
    g.chdir = function(a) {
      throw Error("process.chdir is not supported");
    };
    g.umask = function() {
      return 0;
    };
  }, function(g, k) {
    g.exports = {_current:{apiHost:"%SOVETNIK_API_HOST%", storageHost:"%SOVETNIK_STORAGE_HOST%", settingsHost:"%SOVETNIK_SETTINGS_HOST%", staticHost:"%SOVETNIK_STORAGE_HOST%"}, _production:{apiHost:"https://sovetnik.market.yandex.ru", storageHost:"https://dl.metabar.ru", settingsHost:"https://sovetnik.market.yandex.ru", landingHost:"https://sovetnik.yandex.ru", staticHost:"https://yastatic.net"}, _isPatched:function(e) {
      return !/^%[^%]+%$/.test(e);
    }, _getHost:function(e) {
      return this._current[e] && this._isPatched(this._current[e]) ? this._current[e] : this._production[e];
    }, getApiHost:function() {
      return this._getHost("apiHost");
    }, getStorageHost:function() {
      return this._getHost("storageHost");
    }, getSettingsURL:function() {
      var e = this._getHost("settingsHost");
      return e === this._production.settingsHost ? e + "/app/settings" : e + "/sovetnik";
    }, getSettingsURLMobile:function() {
      var e = this._getHost("settingsHost");
      return e === this._production.settingsHost ? e + "/mobile/settings" : e + "/sovetnik-mobile";
    }, getSettingsHost:function() {
      return this._getHost("settingsHost");
    }, getClientEventUrl:function() {
      return this._getHost("apiHost") + "/client";
    }, getFeedbackEventUrl:function() {
      return this._getHost("apiHost") + "/feedback";
    }, getAviaFeedbackEventUrl:function() {
      return this._getHost("apiHost") + "/feedback-avia";
    }, getLandingHost:function() {
      return this._getHost("landingHost");
    }, getDomainsJSONUrl:function() {
      return this._getHost("staticHost") === this._production.staticHost || this._getHost("staticHost") === this._production.storageHost ? this._production.staticHost + "/sovetnik/_/script-data/domains.json" : this._getHost("staticHost") + "/static/script-data/domains.json";
    }, getUninstallUrl:function() {
      return this.getLandingHost() + "/goodbye";
    }, getCPAOnboardingTrackingUrl:function() {
      return this.getApiHost() + "/cpa-onboarding";
    }};
  }, , , , , , , , , function(g, k, e) {
    var l = e(14), a = e(28), c = e(29), b = e(8), d = e(30), h = e(33), f = e(37);
    e(38);
    var r = e(39), u = e(40), m = e(18), v = {_defaultSettings:e(41), _blacklist:{}, _defaultCampaignPrefix:"Price Suggest - ", isYandexWebPartner:function() {
      return !!this._defaultSettings.yandexWebPartner;
    }, needSendParserFailed:function() {
      return this._siteInfo && this._siteInfo.needSendParserFailed;
    }, getDomainDataSignature:function() {
      return this._siteInfo && this._siteInfo.domainDataSignature;
    }, _cacheFromYandexMarket:function() {
      if (-1 < document.URL.indexOf("mvideo")) {
        var b = document.URL;
        b = b.replace(/\?.+/, "");
        a.set("svt-url", b);
      }
    }, _isFromYandexMarketCached:function() {
      return -1 < document.URL.indexOf("mvideo") && document.URL === decodeURIComponent(a.get("svt-url"));
    }, _isYandexSite:function(a) {
      var b = /([^\.]+?)\.[^\.]+?$/.exec(a);
      if (b && 1 < b.length) {
        return ("yandex" === b[1] || "ya" === b[1]) && -1 === a.indexOf("sovetnik");
      }
    }, _fromYandexPartner:function(a) {
      if (a) {
        a = a.replace(/https?:\/\//, "");
        if (this._blacklist.yandexBlackList) {
          for (var b = 0; b < this._blacklist.yandexBlackList.length; b++) {
            if (0 === a.indexOf(this._blacklist.yandexBlackList[b])) {
              return !0;
            }
          }
        }
        return this._siteInfo && this._siteInfo.isBlacklistedByReferrer();
      }
      return !1;
    }, isSuggestScriptEnabled:function() {
      var a = c.getHostname(document);
      if (this.isSettingsPage()) {
        return !0;
      }
      if (this._settings && this._settings.sovetnikRemoved) {
        return b("sovetnik removed"), !1;
      }
      if (this._domainDisabled) {
        return d.trigger("script:domainDisabled", document.domain), d.trigger("script:disabled", "DisabledForDomain"), b("domain disabled"), !1;
      }
      if (this.isYandexWebPartner()) {
        return !0;
      }
      if (this._settings && this._settings.offerEnabled && "rejected" === this._settings.offer) {
        return d.trigger("script:disabled", "EulaNotAccepted"), b("offer rejected"), !1;
      }
      if (this._siteInfo && (this._siteInfo.isBlacklisted() || this._siteInfo.isYandexWebPartner())) {
        return b("full blacklist"), !1;
      }
      if (this._blacklist.fullBlackList) {
        for (var f = 0; f < this._blacklist.fullBlackList.length; f++) {
          if (a && c.isSubdomain(a, this._blacklist.fullBlackList[f])) {
            return d.trigger("page:fullBlackList", a), b("full blacklist"), !1;
          }
        }
      }
      if (this._blacklist.yandexWebPartners) {
        for (f = 0; f < this._blacklist.yandexWebPartners.length; f++) {
          if (a && c.isSubdomain(a, this._blacklist.yandexWebPartners[f])) {
            return d.trigger("page:yandexWebPartners", a), b("yandex web partners"), !1;
          }
        }
      }
      return this._isYandexSite(a) ? (b("yandex site"), !1) : this._fromYandexPartner(document.referrer) ? (b("from yandex partner"), !1) : !0;
    }, isProductSuggestEnabled:function() {
      var a = c.getHostname(document);
      if (this.isYandexWebPartner()) {
        return !0;
      }
      if (this._siteInfo && !this._siteInfo.canUsePriceContext()) {
        return !1;
      }
      if (this._blacklist.pcBlackList) {
        for (var d = 0; d < this._blacklist.pcBlackList.length; d++) {
          if (a && c.isSubdomain(a, this._blacklist.pcBlackList[d])) {
            return b("pc blacklist"), !1;
          }
        }
      }
      return this._siteInfo && !this._siteInfo.ajax && this._siteInfo.canBeMainPage() ? (b("main page"), !1) : !0;
    }, isSpecifiedValuesEnabled:function() {
      return !!this._siteInfo && !!this._siteInfo.specifiedValues;
    }, canBeProductPage:function() {
      return this._siteInfo ? this._siteInfo.canBeProductPage() : !0;
    }, isCategoryPage:function() {
      var a = this._siteInfo && this._siteInfo.canBeCategoryPage();
      if (a) {
        var b = this.getTransactionId();
        d.trigger("category-page:result-found", b, document.URL);
      }
      return a;
    }, isAjaxSite:function() {
      return this._siteInfo && this._siteInfo.ajax;
    }, isAviaSuggestEnabled:function() {
      return !0;
    }, canBeAviaPage:function() {
      return this._siteInfo && this._siteInfo.urlTemplates ? this._siteInfo.canBeAviaPage() : !0;
    }, isAutoSuggestEnabled:function() {
      return !0;
    }, hasAutoSelectors:function() {
      return !0;
    }, getAutoSelectors:function() {
      return this._siteInfo.getAutoSelectors();
    }, canExtractPrice:function() {
      return this._siteInfo ? this._siteInfo.canExtractPrice() : !0;
    }, canUseMicrodata:function() {
      var a = c.getHostname(document);
      if (this._siteInfo && !this._siteInfo.canUseMicrodata()) {
        return !1;
      }
      if (this._blacklist.microdataBlackList) {
        for (var b = 0; b < this._blacklist.microdataBlackList.length; b++) {
          if (a && c.isSubdomain(a, this._blacklist.microdataBlackList[b])) {
            return !1;
          }
        }
      }
      return !this.isForSelectors();
    }, canAddRelativePosition:function() {
      var a = c.getHostname(document);
      if (this._siteInfo && !this._siteInfo.canAddRelativePosition()) {
        return !1;
      }
      if (this._blacklist.relativePositionBlacklist) {
        for (var b = 0; b < this._blacklist.relativePositionBlacklist.length; b++) {
          if (a && c.isSubdomain(a, this._blacklist.relativePositionBlacklist[b])) {
            return !1;
          }
        }
      }
      return !0;
    }, canAddMarginTop:function() {
      return this._siteInfo && this._siteInfo.canAddMarginTop() && !this.isAnti();
    }, getFixedHeaderSelector:function() {
      return this._siteInfo && this._siteInfo.getFixedHeaderSelector();
    }, getPricebarTopPosition:function() {
      return this._siteInfo ? this._siteInfo.getPricebarTopPosition() : -1;
    }, needUseRussianEnglishLetters:function() {
      return this._siteInfo && this._siteInfo.needUseRussianEnglishLetters();
    }, canCheckDomain:function() {
      return !this.getSelector();
    }, canCheckCMS:function() {
      return !this.getSelector() && !this.isForSelectors();
    }, isOurSite:function(a) {
      return a && -1 < a.indexOf(".metabar.ru") || "localhost" === a || -1 < a.indexOf(".yandex.ru");
    }, isSettingsPage:function() {
      return document.URL && 0 === document.URL.indexOf(m.getSettingsHost());
    }, getViewModificators:function() {
      return this._settings && this._settings.view;
    }, getCustomLogo:function() {
      return this._settings && this._settings.customLogo;
    }, isUniversalScript:function() {
      return this._defaultSettings && this._defaultSettings.universalScript;
    }, getRandomNameLength:function() {
      return document.URL.match(/holodilnik\.ru/) ? 7 : 13;
    }, isStatsEnabled:function() {
      return !(this._settings && this._settings.statsDisabled);
    }, getContainerId:function(a, b) {
      return b ? (a = (parseInt(localStorage.containerId, 10) || 0) % a, localStorage.containerId = a + 1, a) : Math.round(Math.random() * a);
    }, _onSettingsLoaded:function(a) {
      b("settings, _onSettingsLoaded");
      var c = e(32);
      this._blacklist = a.blacklist || {};
      this._c2cSelector = a.selector;
      this._siteInfo = new h(a.domainData, a.referrerData);
      this._versionSent = a.versionSent;
      this._isMobile = c.isMobile();
      b(a);
    }, hasSelectors:function() {
      return this._siteInfo.hasSelectors;
    }, getSelector:function() {
      var a = f[c.getHostname()];
      if (this._settings && this._settings.selector) {
        return {name:this._settings.selector};
      }
      var b = this._c2cSelector || this._siteInfo && this._siteInfo.selector || null;
      if (a) {
        if (b) {
          for (var d in a) {
            a.hasOwnProperty(d) && (b[d] = a[d]);
          }
        } else {
          b = a;
        }
      }
      return b;
    }, getSpecifiedValues:function() {
      return this._siteInfo.specifiedValues;
    }, getUrlTemplates:function() {
      if (this._siteInfo && this._siteInfo.urlTemplates) {
        return this._siteInfo.urlTemplates;
      }
    }, getAviaDomainWait:function() {
      if (this._siteInfo && this._siteInfo.wait) {
        return this._siteInfo.wait;
      }
    }, getAviaDomainNotFoundSelector:function() {
      if (this._siteInfo && this._siteInfo.notFoundSelector) {
        return this._siteInfo.notFoundSelector;
      }
    }, getWhiteLabelName:function() {
      if (this._siteInfo && this._siteInfo.whiteLabelName) {
        return this._siteInfo.whiteLabelName;
      }
    }, getCartInfo:function() {
      if (this._siteInfo) {
        var a = this._siteInfo, b = a.checkout;
        a = a.cart;
        if (b && a) {
          return {checkout:b, cart:a};
        }
      }
    }, isReviewSite:function() {
      if (this._siteInfo && this._siteInfo.isReviewSite()) {
        return !0;
      }
      var a = this.getSelector();
      return a && "review" === a;
    }, getProductName:function() {
      return this._settings && this._settings.productName;
    }, getModelId:function() {
      return this._settings && this._settings.modelId;
    }, getAppVersion:function() {
      return "201807301243";
    }, getAffId:function() {
      return this._settings && this._settings.affId;
    }, getClid:function() {
      return this._settings && this._settings.clid;
    }, isDebugMode:function() {
      try {
        return window.localStorage && window.localStorage.getItem("svt.debug") && "false" !== window.localStorage.getItem("svt.debug");
      } catch (t) {
        return !1;
      }
    }, isAvitoSite:function() {
      return -1 < location.host.indexOf("avito.ru");
    }, isAliexpress:function() {
      return -1 < location.host.indexOf("aliexpress.com");
    }, isWildberries:function() {
      return -1 < location.host.indexOf("wildberries.ru");
    }, isLamoda:function() {
      return -1 < location.host.indexOf("lamoda.ru");
    }, isShop:function() {
      return this._siteInfo && this._siteInfo.isShop();
    }, isLogSite:function() {
      return this._siteInfo && this._siteInfo.isLogSite();
    }, isClassified:function() {
      return this._siteInfo && this._siteInfo.isClassified();
    }, isSilentEnabled:function() {
      return this.isYandexWebPartner() || 1200 == this.getAffId();
    }, isSilentMode:function() {
      return this.isSilentEnabled() && this._settings && this._settings.silent;
    }, needCleanDOM:function() {
      return !this._doNotClean && !this.isYandexWebPartner();
    }, synchronizeSettings:function() {
      var a = e(42);
      return window.mbr && window.mbr.settingsJSON ? this.applySettings(mbr.settingsJSON) : window.svt && "undefined" !== typeof settingsJSON ? this.applySettings(settingsJSON) : !this.isUniversalScript() && this.isYandexWebPartner() ? this.applySettingsFromUrl() || l.resolve() : this.applySettingsFromUrl() || a.loadSettings().then(this.applySettings.bind(this));
    }, getScrollPosition:function() {
      return +(this._settings && this._settings.startScroll || 0);
    }, getStartDelay:function() {
      return +(this._settings && this._settings.startDelay || 0);
    }, getAjaxSessionId:function() {
      if (this._siteInfo && this._siteInfo.isAjaxSite()) {
        return this._ajaxSessionId || (this._ajaxSessionId = u()), this._ajaxSessionId;
      }
    }, getTransactionId:function() {
      "undefined" !== typeof svt && svt.transactionId && (this._transactionId = svt.transactionId);
      this._transactionId || (this._transactionId = u());
      return this._transactionId;
    }, resetTransactionId:function() {
      this._transactionId = u();
      "undefined" !== typeof svt && (svt.transactionId = this._transactionId);
    }, getReferrer:function() {
      return document.referrer;
    }, canShowAdultOffer:function() {
      return "rejected" !== this._adultOffer;
    }, needShowAdultOptIn:function() {
      return "accepted" !== this._adultOffer;
    }, applySettingsFromUrl:function() {
      var a = c.getPriceContextElement(this.isYandexWebPartner()), b = "affId clid applicationName optInTitle offerEnabled affSub autoShowShopList selector productName modelId startScroll startDelay statsDisabled activeCity activeCountry otherRegions silent mobileEnabled optInImage".split(" ");
      if (a) {
        var d = void 0, f = c.getQueryParam(a.src, "settings");
        if (f) {
          d = JSON.parse(decodeURIComponent(f));
        } else {
          for (var h = 0; h < b.length; h++) {
            f = c.getQueryParam(a.src, b[h]), "undefined" !== typeof f && (f = "true" === f ? !0 : "false" === f ? !1 : f, d = d || {}, d[b[h]] = f);
          }
        }
        a.parentNode && a.parentNode.removeChild(a);
        if (d) {
          return this.applySettings(d);
        }
      }
    }, _formatSettings:function(a) {
      var b;
      a.hasOwnProperty("modelId") && ((b = Number(a.modelId)) && 0 < b || delete a.modelId);
      return a;
    }, applySettings:function(a) {
      b("apply settings");
      b(a);
      if (!this._settingsApplied) {
        for (; "string" === typeof a;) {
          a = JSON.parse(a);
        }
        this._settings = this._settings || {};
        var c = {};
        if (a) {
          if (a = this._formatSettings(a), this.isYandexWebPartner()) {
            delete this._settings.clid;
            delete this._settings.affId;
            for (var d in a) {
              a.hasOwnProperty(d) && (this._settings[d] = a[d]);
            }
          } else {
            for (d in a) {
              a.hasOwnProperty(d) && ("undefined" === typeof this._settings[d] && ("clid" === d ? this._settings.affId && this._settings.affId != a.affId || (this._settings[d] = a[d]) : this._settings[d] = a[d]), c[d] = a[d]);
            }
          }
        }
        if (this._defaultSettings) {
          for (d in this._defaultSettings) {
            this._defaultSettings.hasOwnProperty(d) && ("undefined" === typeof this._settings[d] && (this.isYandexWebPartner() ? this._settings[d] = this._defaultSettings[d] : "clid" === d ? this._settings.affId && this._settings.affId != this._defaultSettings.affId || (this._settings[d] = this._defaultSettings[d]) : this._settings[d] = this._defaultSettings[d]), "undefined" === typeof c[d] && (c[d] = this._defaultSettings[d]));
          }
        }
        this._resolvePostMessage && this._resolvePostMessage();
        this._settingsApplied = !0;
      }
      return l.resolve();
    }, saveStartTime:function(a) {
      this._startTime = a;
    }, getStartTime:function() {
      return this._startTime;
    }, getTimeAfterStart:function() {
      return window.performance ? (new Date).getTime() - window.performance.timing.domContentLoadedEventStart : (new Date).getTime() - this.getStartTime();
    }, delayAfterStart:function(a) {
      var b = this.getTimeAfterStart.bind(this);
      return new l(function(d) {
        var c = setInterval(function() {
          b() > 1000 * a && (clearInterval(c), d());
        }, 2000);
      });
    }, setSetting:function(a, d) {
      var c = r && r.isCORSSupported() ? r : void 0, f = {};
      f[a] = d;
      f.transactionId = this.getTransactionId();
      var h = {settings:JSON.stringify(f)};
      return new l(function(a, d) {
        c.post(m.getApiHost() + "/settings", h, function(c) {
          b(c);
          c ? a() : d();
        });
      });
    }, getSettings:function() {
      return this._settings;
    }, shouldUseIframeStorage:function() {
      return !this._settings || !this._settings.extensionStorage;
    }, isCustomSettingsPageExists:function() {
      return this._settings && this._settings.customSettingsPage;
    }, isOptOutEnabled:function() {
      return this._settings ? !this._settings.optIn : !0;
    }, getOptInImage:function() {
      return this._settings && this._settings.optInImage;
    }, init:function(a, b) {
      var d = this;
      if (b) {
        return this._onSettingsLoaded({domainData:b});
      }
      var c = e(42);
      return this._loadPromise ? this._loadPromise : this._loadPromise = c.canUseDomainData().then(function(b) {
        var f = {};
        if (b) {
          if (d.isForSelectors() && "function" === typeof getDomainData ? f.domainData = getDomainData(a) : f.domainData = c.getDomainData(a), !d._settings.extensionStorage && c.needSetYSCookie() ? f.versionSent = c.get("versionSent", !0) : f.versionSent = l.resolve(!0), document.referrer && (b = document.referrer.replace(/^https?\:\/\//, "").replace(/\/.*$/, ""))) {
            f.referrerData = c.getDomainData(b);
          }
        } else {
          f.selector = c.getSelector(a), f.blacklist = c.get("blacklist");
        }
        var h = [];
        b = [];
        for (var t in f) {
          f.hasOwnProperty(t) && (h.push(t), b.push(f[t]));
        }
        return l.all(b).then(function(a) {
          for (var b = {}, d = 0; d < a.length; d++) {
            b[h[d]] = a[d];
          }
          return b;
        });
      }).then(function(a) {
        return d._onSettingsLoaded(a);
      });
    }, waitToStartScript:function() {
      var a = this.getScrollPosition(), d = this.getStartDelay();
      return new l(function(f) {
        function h() {
          c.getOffsetTop() / c.getPageHeight() * 100 > a && (b("try run after scroll"), window.removeEventListener ? window.removeEventListener("scroll", h) : window.detachEvent && window.detachEvent("onscroll", h), f());
        }
        a && (b("wait when scroll is " + a + "%"), window.addEventListener ? window.addEventListener("scroll", h, !1) : window.attachEvent && window.attachEvent("onscroll", h));
        d && (b("wait " + d + " seconds"), v.delayAfterStart(d).then(function() {
          b("run after delay");
          f();
        }));
        a || d || (b("run script without delay"), f());
      });
    }, _getScriptHash:function() {
      return (this.getClid() || this.getAffId()) + this.getAppVersion();
    }, _getStartedScriptsHashes:function() {
      var a = [], b = document.documentElement.getAttribute("g_init");
      b && (a = b.split(","));
      return a;
    }, isScriptStarted:function() {
      var a = this._getScriptHash();
      return 1 === this._getStartedScriptsHashes().filter(function(b) {
        return b === a;
      }).length;
    }, removeScriptStartedInfo:function() {
      var a = this._getScriptHash(), b = this._getStartedScriptsHashes().filter(function(b) {
        return b !== a;
      });
      b.length ? document.documentElement.setAttribute("g_init", b.join(",")) : document.documentElement.removeAttribute("g_init");
    }, setScriptStarted:function() {
      var a = this._getScriptHash(), b = this._getStartedScriptsHashes();
      b.push(a);
      document.documentElement.setAttribute("g_init", b.join(","));
    }, needUseRandomContainer:function() {
      return this._siteInfo && this._siteInfo.needUseRandomContainer();
    }, isAnti:function() {
      return !!document.querySelector('[checkSovetnik="1"]');
    }, needSendVersion:function() {
      return !this._versionSent && this.isSuggestScriptEnabled();
    }, sendVersionToServer:function() {
      var a = e(42);
      this.needSendVersion() && r.isCORSSupported() ? (b("sending version"), r.post(m.getApiHost() + "/sovetnik", {version:this.getAppVersion(), url:document.URL}, function() {
        b("version has been sent");
        a.set("versionSent", !0, !0);
      })) : b("i dont need send version");
    }, isMobileVersionEnabled:function() {
      return this._defaultSettings.mobileEnabled;
    }, isMobile:function() {
      return this._isMobile;
    }, getNotificationStatus:function() {
      return c.isYandexNotificationsAvailable() ? "yandex" : this._settings && this._settings.notificationStatus;
    }, isButtonExtension:function() {
      return this._settings && this._settings.withButton;
    }, needRequestNotificationPermission:function() {
      return this._settings && this._settings.notificationStatus && !this._settings.notificationPermissionGranted;
    }, clearPriceContextNodes:function(a) {
      var f = this, h = e(42);
      this.needCleanDOM() && (d.on("pipe:reject", function() {
        b("clear iframe after pipe:reject");
        c._clearTemplates();
        f.removeScriptStartedInfo();
        h.clear();
      }), a && (c._clearTemplates(), this.removeScriptStartedInfo(), h.clear()));
    }, isNative:function() {
      return !1;
    }, getSiteInfo:function() {
      return this._siteInfo;
    }, isForSelectors:function() {
      return this._settings && 5 == this._settings.affId;
    }, isSiteInIframe:function() {
      var a = !1;
      try {
        a = window.top === window.self && null === window.top.document.body || window.top !== window.self && null !== window.top.document.body;
      } catch (w) {
        return b(w.message), !0;
      }
      return a;
    }};
    g.exports = v;
  }, function(g, k) {
    g.exports = {set:function(e, g, a, c, b) {
      e = e + "=" + window.escape(g) + ";";
      a && (a instanceof Date ? window.isNaN(a.getTime()) && (a = new Date) : a = new Date((new window.Date).getTime() + 864E5 * window.parseInt(a, 10)), e += "expires=" + a.toGMTString() + ";");
      c && (e += "path=" + c + ";");
      b && (e += "domain=" + b + ";");
      window.document.cookie = e;
    }, get:function(e) {
      e = (new RegExp("(?:^" + e + "|;\\s*" + e + ")=(.*?)(?:;|$)", "g")).exec(window.document.cookie);
      return null === e ? null : e[1];
    }, remove:function(e) {
      this.set(e, "", new Date(1970, 1, 1, 1, 1), "/");
    }};
  }, function(g, k, e) {
    var l = function() {
      return function(a, c) {
        if (Array.isArray(a)) {
          return a;
        }
        if (Symbol.iterator in Object(a)) {
          var b = [], d = !0, h = !1, f = void 0;
          try {
            for (var e = a[Symbol.iterator](), g; !(d = (g = e.next()).done) && (b.push(g.value), !c || b.length !== c); d = !0) {
            }
          } catch (m) {
            h = !0, f = m;
          } finally {
            try {
              if (!d && e["return"]) {
                e["return"]();
              }
            } finally {
              if (h) {
                throw f;
              }
            }
          }
          return b;
        }
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }();
    e(30);
    e(8);
    g.exports = {_months:"\u044f\u043d\u0432 \u0444\u0435\u0432 \u043c\u0430\u0440 \u0430\u043f\u0440 \u043c\u0430\u0439 \u0438\u044e\u043d \u0438\u044e\u043b \u0430\u0432\u0433 \u0441\u0435\u043d \u043e\u043a\u0442 \u043d\u043e\u044f \u0434\u0435\u043a".split(" "), throwCoin:function() {
      return (0 >= arguments.length || void 0 === arguments[0] ? 50 : arguments[0]) > 100 * Math.random();
    }, getHostname:function(a) {
      a = a || window.document;
      a = a.domain;
      /^www./.test(a) && (a = a.slice(4));
      return a;
    }, getDateText:function(a, c, b, d) {
      c = this._months[c - 1];
      return d ? b + " " + c : b + " " + c + " " + a;
    }, formatAviaDate:function(a) {
      if ((a = /(\d{4})-(\d{2})-(\d{2})/.exec(a)) && a.length) {
        return this.getDateText(Number(a[1]), Number(a[2]), Number(a[3]), !0);
      }
    }, isYandexNotificationsAvailable:function() {
      return e(32).isYaBrowser() && "undefined" !== typeof chrome && !!chrome.notifications;
    }, isDocumentHidden:function() {
      return window.document.hidden;
    }, removeNode:function(a) {
      a.parentNode && a.parentNode.removeChild(a);
    }, hasClass:function(a, c) {
      if (a) {
        return -1 < (" " + a.className + " ").indexOf(" " + c + " ");
      }
    }, getPosition:function(a) {
      var c = a.getBoundingClientRect();
      return {top:Math.round(c.top), bottom:Math.round(c.top + a.offsetHeight - window.innerHeight), left:Math.round(c.left), right:Math.round(c.left + a.offsetWidth - window.innerWidth)};
    }, removeClass:function(a, c) {
      if (a) {
        return a.className = a.className.replace(c, ""), a.className;
      }
    }, addClass:function(a, c) {
      if (a && !this.hasClass(a, c)) {
        return a.className = a.className ? a.className + (" " + c) : c, a.className;
      }
    }, isSubdomain:function(a, c) {
      c = a.indexOf(c);
      return -1 === c ? !1 : 0 === c ? !0 : "." === a[c - 1];
    }, priceAnalyze:function(a) {
      a = 1 < (a.match(/\d(,|\.)/g) || []).length ? a : a.replace(/\s*/g, "");
      a = (a = /\d+[\.,`]*[0-9]*[\.,`]*[0-9]*/g.exec(a)) && a.length && a[0] || "";
      a = a.replace(/[^0-9,\.]/g, "");
      a = a.replace(/(,|\.)$/g, "");
      a = a.replace(/(,|\.)\d\d?$/g, "");
      a = a.replace(/[.,]/g, "");
      return a = a.replace(/`*/g, "");
    }, getTextContents:function(a, c) {
      for (var b = "", d = 0; d < a.childNodes.length; d++) {
        a.childNodes[d].nodeType == document.TEXT_NODE ? b += " " + a.childNodes[d].textContent : c && a.childNodes[d].alt ? b += a.childNodes[d].alt : a.childNodes[d].nodeType == document.ELEMENT_NODE && (b += " " + this.getTextContents(a.childNodes[d], c));
      }
      b = b.replace(/\s+/g, " ").replace(/^[^\dA-Za-z\u0410-\u042f\u0430-\u044f\(\)\.\,\$\u20ac]+/, "").replace(/[^\dA-Za-z\u0410-\u042f\u0430-\u044f\(\)]\.\,\$\u20ac+$/, "");
      return this.trim(b);
    }, getQueryParam:function(a, c) {
      var b = 2 >= arguments.length || void 0 === arguments[2] ? !0 : arguments[2], d = [], h = void 0;
      h = [c, encodeURIComponent(c)];
      if (b) {
        for (; -1 !== a.lastIndexOf("#");) {
          d = d.concat(a.substr(a.lastIndexOf("#") + 1).split("&")), a = a.substr(0, a.lastIndexOf("#"));
        }
      } else {
        b = a.indexOf("#"), -1 !== b && (a = a.substring(0, b));
      }
      -1 !== a.indexOf("?") && (d = d.concat(a.substr(a.indexOf("?") + 1).split("&")));
      if (d = d.map(function(a) {
        return a.replace(/^[a-zA-Z\/\\]+\?/, "");
      })) {
        for (b = 0; b < h.length; b++) {
          for (var f = 0; f < d.length; f++) {
            if (0 === d[f].indexOf(h[b] + "=")) {
              return h = d[f].substr((h[b] + "=").length), decodeURIComponent(h.replace(/\+/g, " "));
            }
          }
        }
      }
    }, formatDate:function(a) {
      var c = /^\d{4}-(\d{2})-(\d{2})/;
      return a && c.test(a) ? "(" + RegExp.$2 + " " + this._months[parseInt(RegExp.$1, 10) - 1] + ")" : "";
    }, getMonthNum:function(a) {
      a = a.toLowerCase();
      return -1 !== a.indexOf("\u043c\u0430\u0440") ? "03" : -1 !== a.indexOf("\u043c\u0430") ? "05" : {"\u044f\u043d\u0432":"01", "\u0444\u0435\u0432":"02", "\u0430\u043f\u0440":"04", "\u0438\u044e\u043d":"06", "\u0438\u044e\u043b":"07", "\u0430\u0432\u0433":"08", "\u0441\u0435\u043d":"09", "\u043e\u043a\u0442":"10", "\u043d\u043e\u044f":"11", "\u0434\u0435\u043a":"12", jan:"01", feb:"02", mar:"03", apr:"04", may:"05", jun:"06", jul:"07", aug:"08", sep:"09", oct:"10", nov:"11", dec:"12"}[a.substring(0, 
      3)];
    }, getProfitText:function(a, c, b) {
      a -= c;
      c = "";
      100 < a && "\u0440\u0443\u0431." == b && (c += a + " " + b);
      return c;
    }, isMonthOfNextYear:function(a) {
      var c = (new Date).getMonth() + 1;
      return a < c;
    }, mixin:function(a) {
      for (var c = arguments.length, b = Array(1 < c ? c - 1 : 0), d = 1; d < c; d++) {
        b[d - 1] = arguments[d];
      }
      var h = {};
      a = a || {};
      b.forEach(function(d) {
        for (var c in d) {
          "undefined" != typeof h[c] && h[c] == d[c] || "undefined" !== typeof b[c] || (a[c] = d[c]);
        }
      });
      return a;
    }, getPriceContextElement:function(a) {
      if (document.currentScript && document.currentScript.src) {
        return document.currentScript;
      }
      var c = document.getElementsByTagName("script");
      if (a) {
        for (a = c.length - 1; 0 <= a; a--) {
          if (c[a].src && -1 < c[a].src.indexOf("sovetnik.webpartner.min.js")) {
            return c[a];
          }
        }
      }
      for (a = 0; a < c.length; a++) {
        if (c[a].src && (-1 < c[a].src.indexOf("static/js/ecomerce-context") || -1 < c[a].src.indexOf("sovetnik.min.js") || -1 < c[a].src.indexOf("mbr="))) {
          return c[a];
        }
      }
    }, _clearTemplates:function() {
      var a = document.getElementById("mbrstl"), c = document.getElementById("mbrtmplt");
      a && a.parentNode.removeChild(a);
      c && c.parentNode.removeChild(c);
    }, getCurrencyFromStr:function(a) {
      if (a) {
        a = a.toUpperCase();
        var c = [{pattern:/(?:EUR)|\u20ac/, currency:"EUR"}, {pattern:/(?:USD)|(?:\u0423\.\u0415\.)|\$/, currency:"USD"}, {pattern:/(?:UAH)|(?:\u0413\u0420\u041d)|(?:\u20b4)/, currency:"UAH"}, {pattern:/(?:RUR)|(?:RUB)|(?:\u0420\.)|(?:\u0420\u0423\u0411)|\u20bd/, currency:"RUB"}, {pattern:/(?:\u0422\u0413)|(?:KZT)|(?:\u20b8)|(?:\u0422\u04a2\u0413)|(?:TENGE)|(?:\u0422\u0415\u041d\u0413\u0415)/, currency:"KZT"}, {pattern:/(?:GBP)|(?:\u00a3)|(?:UKL)/, currency:"GBP"}].map(function(b) {
          return {currency:b.currency, index:a.search(b.pattern)};
        }).filter(function(a) {
          return -1 < a.index;
        }).sort(function(a, d) {
          return a.index - d.index;
        });
        if (c.length) {
          return c[0].currency;
        }
      }
    }, getDifferentElement:function(a, c) {
      var b = [].slice.call(document.querySelectorAll(a));
      for (c && (b = b.filter(c)); 1 < b.length;) {
        b = b.map(function(a) {
          return a.parentNode;
        }), b = b.filter(function(a) {
          return a && 1 === b.filter(function(b) {
            return b === a;
          }).length;
        });
      }
      if (b.length) {
        try {
          if (b[0].matches && b[0].matches(a) || b[0].matchesSelector && b[0].matchesSelector(a) || b[0].webkitMatchesSelector && b[0].webkitMatchesSelector(a)) {
            return b[0];
          }
        } catch (d) {
        }
        return b[0].querySelector && b[0].querySelector(a);
      }
    }, getUniqueElements:function(a) {
      var c = [].slice.call(document.querySelectorAll(a));
      c.length && function() {
        var a = [], d = [], h = [];
        c.forEach(function(b) {
          b.className ? a.push(b) : d.push(b);
        });
        a = a.filter(function(b) {
          var d = b.className;
          return 1 === a.filter(function(a) {
            return a.className === d;
          }).length;
        });
        h = c.filter(function(a) {
          return a.getAttribute("itemtype");
        });
        h = h.filter(function(a) {
          var b = a.getAttribute("itemtype");
          return 1 === h.filter(function(a) {
            return a.getAttribute("itemtype") === b;
          }).length;
        });
        if (d.length || a.length || h.length) {
          c = h;
          if (!d.length || d.length && d.length < c.length) {
            c = d;
          }
          if (!c.length || a.length && a.length < c.length) {
            c = a;
          }
        }
        5 < c.length && (c = []);
      }();
      return c;
    }, formatNumber:function(a) {
      "string" === typeof a && (a = a.replace(/\D/g, ""));
      var c = a.toString().split("");
      a = c.map(function(a, d) {
        d && 0 === (c.length - d) % 3 && (a = " " + a);
        return a;
      }).join("");
      return a = a.replace(" .", ".");
    }, formatPrice:function(a, c, b) {
      "USD" === c ? c = "$" : "EUR" === c && (c = "\u20ac");
      a = this.formatNumber(a);
      c && (a += " " + c);
      b && (a = b + " " + a);
      return a;
    }, getPageHeight:function() {
      return Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    }, getOffsetTop:function() {
      var a = window.pageYOffset;
      a || (a = (document.documentElement.clientHeight ? document.documentElement : document.body).scrollTop || 0);
      return a;
    }, getRandomHash:function(a) {
      var c = "", b = window.crypto || window.msCrypto;
      if (window.Uint32Array && b && b.getRandomValues) {
        try {
          var d = new window.Uint32Array(Math.round(a / 4 + 1)), h = 0, f = b.getRandomValues(d);
          for (f && f !== d && f.length === d.length && (d = f); c.length < a;) {
            c += d[h].toString(36).substr(1), h = (h + 1) % d.length;
          }
          return c = c.substr(0, a);
        } catch (r) {
        }
      }
      for (; c.length < a;) {
        c += Math.round(35 * Math.random()).toString(36);
      }
      return c;
    }, getGradeText:function(a) {
      if (0 === a) {
        return "\u041d\u0435\u0442 \u043e\u0442\u0437\u044b\u0432\u043e\u0432";
      }
      var c = this.pluralize(["\u043e\u0442\u0437\u044b\u0432", "\u043e\u0442\u0437\u044b\u0432\u0430", "\u043e\u0442\u0437\u044b\u0432\u043e\u0432"], a);
      return a + " " + c;
    }, getISBN:function() {
      return (0 >= arguments.length || void 0 === arguments[0] ? "" : arguments[0]).split(" ").filter(function(a) {
        return 10 <= a.length && a.replace("-", "").match(/\d.+/);
      }).map(function(a) {
        return a.replace(",", "");
      }).toString();
    }, pluralize:function(a, c) {
      return a[1 === c % 10 && 11 !== c % 100 ? 0 : 2 <= c % 10 && 4 >= c % 10 && (10 > c % 100 || 20 <= c % 100) ? 1 : 2];
    }, ratingText:function(a) {
      return 0 < a % 1 ? String(a) : a + ".0";
    }, getScreenSize:function() {
      return {width:Math.max(document.documentElement.clientWidth, window.innerWidth), height:Math.max(document.documentElement.clientHeight, window.innerHeight)};
    }, getScreenResolution:function() {
      return {ratio:window.devicePixelRatio || 1, width:window.screen.width, height:window.screen.height};
    }, getViewport:function() {
      return {width:document.body.clientWidth, height:document.body.clientHeight};
    }, isPlugHunterExist:function() {
      return [].slice.call(document.querySelectorAll("script")).some(function(a) {
        return a.src && -1 !== a.src.indexOf("plughunter.ru");
      });
    }, isStopSovetnikExists:function() {
      return [].slice.call(document.querySelectorAll("script")).some(function(a) {
        return a.src && -1 !== a.src.indexOf("stopsovetnik");
      });
    }, getLocationOrigin:function() {
      return window.location.origin || window.location.protocol + "//" + window.location.hostname;
    }, reduce:function(a, c, b) {
      if (null == a) {
        throw new TypeError("Reduce called on null or undefined");
      }
      if ("function" !== typeof c) {
        throw new TypeError(c + " is not a function");
      }
      var d = Object(a), h = d.length >>> 0, f = 0;
      if (3 == arguments.length) {
        var e = arguments[2];
      } else {
        for (; f < h && !f in d;) {
          f++;
        }
        if (f >= h) {
          throw new TypeError("Reduce of empty array with no initial value");
        }
        e = d[f++];
      }
      for (; f < h; f++) {
        f in d && (e = c(e, d[f], f, d));
      }
      return e;
    }, getTransitionEndEvent:function() {
      if (!this._transitionEvent) {
        var a = document.createElement("fakeelement"), c = {transition:"transitionend", OTransition:"oTransitionEnd", MozTransition:"transitionend", WebkitTransition:"webkitTransitionEnd"}, b;
        for (b in c) {
          if ("undefined" !== typeof a.style[b]) {
            this._transitionEvent = c[b];
            break;
          }
        }
      }
      return this._transitionEvent;
    }, canUseCalc:function() {
      if ("undefined" === typeof this._canUseCalc) {
        var a = document.createElement("a");
        a.style.cssText = "width: calc(10px); width: -moz-calc(10px); width: -webkit-calc(10px);";
        this._canUseCalc = !!a.style.length;
      }
      return this._canUseCalc;
    }, removeUndefined:function(a) {
      Object.keys(a).forEach(function(c) {
        "undefined" === typeof a[c] && delete a[c];
      });
      return a;
    }, throttle:function(a, c) {
      function b() {
        d ? (h = arguments, f = this) : (a.apply(this, arguments), d = !0, setTimeout(function() {
          d = !1;
          h && (b.apply(f, h), h = f = null);
        }, c));
      }
      var d = !1, h = void 0, f = void 0;
      return b;
    }, imageToBase64:function(a) {
      return new Promise(function(c) {
        var b = new Image;
        b.crossOrigin = "Anonymous";
        var d = void 0;
        d = /\.jpeg/i.test(a) ? "image/jpeg" : /\.jpg/i.test(a) ? "image/jpg" : "image/png";
        b.onload = function() {
          var a = document.createElement("CANVAS"), b = a.getContext("2d");
          a.height = this.height;
          a.width = this.width;
          b.drawImage(this, 0, 0);
          a = a.toDataURL(d);
          c(a);
        };
        b.src = a;
      });
    }, getRequestAnimationFrame:function() {
      var a = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      return a && a.bind(window);
    }, isInteger:function(a) {
      return !isNaN(parseInt(a, 10)) && isFinite(a);
    }, parseStyleAttribute:function(a) {
      var c = this;
      a = (a || "").split(";");
      return this.reduce(a, function(a, d) {
        d = d.split(":");
        var b = l(d, 2);
        d = b[0];
        b = b[1];
        d && (a[c.trim(d)] = c.trim(b));
        return a;
      }, {});
    }, trim:function(a) {
      return a.replace(/^\s+/, "").replace(/\s+$/, "");
    }, getStyleDifference:function(a, c) {
      var b = this.parseStyleAttribute(a), d = this.parseStyleAttribute(c), h = {};
      Object.keys(b).forEach(function(a) {
        d[a] !== b[a] && (h[a] = d[a]);
        delete d[a];
      });
      return this.mixin(h, d);
    }, isElementMatchesSelector:function(a, c) {
      var b = this, d = HTMLElement.prototype, h = d.matchesSelector, f = d.mozMatchesSelector, e = d.msMatchesSelector, g = d.oMatchesSelector, m = d.webkitMatchesSelector, l = function(a) {
        a = b.ownerDocument.querySelectorAll(a);
        return [].some.call(a, function(a) {
          return a === b;
        });
      };
      return (d.matches || h || f || e || g || m || l).call(a, c);
    }, isVisible:function(a) {
      return a.offsetWidth || a.offsetHeight || a.getClientRects().length ? "hidden" !== window.getComputedStyle(a).visibility : !1;
    }, getUILanguage:function() {
      return "undefined" !== typeof chrome && chrome.i18n && chrome.i18n.getUILanguage && chrome.i18n.getUILanguage() || window.navigator && window.navigator.language;
    }, updateData:function(a, c) {
      for (var b in a) {
        a.hasOwnProperty(b) && ("object" === typeof a[b] ? (c[b] = c[b] || (Array.isArray(a[b]) ? [] : {}), this.updateData(a[b], c[b])) : c[b] = a[b]);
      }
    }, base64EncodeUnicode:function(a) {
      return window.btoa(encodeURIComponent(a).replace(/%([0-9A-F]{2})/g, function(a, b) {
        return String.fromCharCode("0x" + b);
      }));
    }, getRandomInteger:function(a, c) {
      a += Math.random() * (c - a);
      return a = Math.round(a);
    }};
  }, function(g, k, e) {
    k = e(31).Mediator;
    g.exports = new k;
  }, function(g, k, e) {
    (function(e, a) {
      k.Mediator = a();
    })(this, function() {
      function e() {
        var a = function() {
          return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
        };
        return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a();
      }
      function a(b, c, f) {
        if (!(this instanceof a)) {
          return new a(b, c, f);
        }
        this.id = e();
        this.fn = b;
        this.options = c;
        this.context = f;
        this.channel = null;
      }
      function c(a, b) {
        if (!(this instanceof c)) {
          return new c(a);
        }
        this.namespace = a || "";
        this._subscribers = [];
        this._channels = [];
        this._parent = b;
        this.stopped = !1;
      }
      function b() {
        if (!(this instanceof b)) {
          return new b;
        }
        this._channels = new c("");
      }
      a.prototype = {update:function(a) {
        a && (this.fn = a.fn || this.fn, this.context = a.context || this.context, this.options = a.options || this.options, this.channel && this.options && void 0 !== this.options.priority && this.channel.setPriority(this.id, this.options.priority));
      }};
      c.prototype = {addSubscriber:function(b, c, f) {
        b = new a(b, c, f);
        c && void 0 !== c.priority ? (c.priority >>= 0, 0 > c.priority && (c.priority = 0), c.priority >= this._subscribers.length && (c.priority = this._subscribers.length - 1), this._subscribers.splice(c.priority, 0, b)) : this._subscribers.push(b);
        b.channel = this;
        return b;
      }, stopPropagation:function() {
        this.stopped = !0;
      }, getSubscriber:function(a) {
        var b = 0, c = this._subscribers.length;
        b;
        for (c; b < c; b++) {
          if (this._subscribers[b].id === a || this._subscribers[b].fn === a) {
            return this._subscribers[b];
          }
        }
      }, setPriority:function(a, b) {
        var c = 0, d;
        var e = 0;
        for (d = this._subscribers.length; e < d && this._subscribers[e].id !== a && this._subscribers[e].fn !== a; e++) {
          c++;
        }
        a = this._subscribers[c];
        e = this._subscribers.slice(0, c);
        c = this._subscribers.slice(c + 1);
        this._subscribers = e.concat(c);
        this._subscribers.splice(b, 0, a);
      }, addChannel:function(a) {
        this._channels[a] = new c((this.namespace ? this.namespace + ":" : "") + a, this);
      }, hasChannel:function(a) {
        return this._channels.hasOwnProperty(a);
      }, returnChannel:function(a) {
        return this._channels[a];
      }, removeSubscriber:function(a) {
        var b = this._subscribers.length - 1;
        if (a) {
          for (b; 0 <= b; b--) {
            if (this._subscribers[b].fn === a || this._subscribers[b].id === a) {
              this._subscribers[b].channel = null, this._subscribers.splice(b, 1);
            }
          }
        } else {
          this._subscribers = [];
        }
      }, publish:function(a) {
        var b = 0, c = this._subscribers.length, d;
        b;
        for (c; b < c; b++) {
          var e = !1;
          if (!this.stopped) {
            var g = this._subscribers[b];
            void 0 !== g.options && "function" === typeof g.options.predicate ? g.options.predicate.apply(g.context, a) && (g.fn.apply(g.context, a), e = !0) : (e = this._subscribers.length, g.fn.apply(g.context, a), c = d = this._subscribers.length, d === e - 1 && b--, e = !0);
          }
          e && g.options && void 0 !== g.options && (g.options.calls--, 1 > g.options.calls && (this.removeSubscriber(g.id), c--, b--));
        }
        this._parent && this._parent.publish(a);
        this.stopped = !1;
      }};
      b.prototype = {getChannel:function(a) {
        var b = this._channels, c = a.split(":"), d = 0, e = c.length;
        if ("" === a) {
          return b;
        }
        if (0 < c.length) {
          for (d, e; d < e; d++) {
            b.hasChannel(c[d]) || b.addChannel(c[d]), b = b.returnChannel(c[d]);
          }
        }
        return b;
      }, subscribe:function(a, b, c, e) {
        a = this.getChannel(a);
        c = c || {};
        e = e || {};
        return a.addSubscriber(b, c, e);
      }, once:function(a, b, c, e) {
        c = c || {};
        c.calls = 1;
        return this.subscribe(a, b, c, e);
      }, getSubscriber:function(a, b) {
        return this.getChannel(b || "").getSubscriber(a);
      }, remove:function(a, b) {
        this.getChannel(a).removeSubscriber(b);
      }, publish:function(a) {
        var b = Array.prototype.slice.call(arguments, 1), c = this.getChannel(a);
        b.push(c);
        this.getChannel(a).publish(b);
      }};
      b.prototype.on = b.prototype.subscribe;
      b.prototype.bind = b.prototype.subscribe;
      b.prototype.emit = b.prototype.publish;
      b.prototype.trigger = b.prototype.publish;
      b.prototype.off = b.prototype.remove;
      b.Channel = c;
      b.Subscriber = a;
      b.version = "0.9.7";
      return b;
    });
  }, function(g, k, e) {
    var l = e(29);
    e(8);
    var a = e(30);
    e(27);
    g.exports = {isMobile:function() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || navigator.vendor || window.opera) || this.isTabletBrowser() || this.isPhoneBrowser();
    }, isMobileView:function(a) {
      return a && (this.isPhoneBrowser() || this.isTabletBrowser());
    }, isTabletBrowser:function() {
      return this.isIOSTabletBrowser() || this.isTabletYandexBrowser() || this.isAndroidTabletBrowser();
    }, isPhoneBrowser:function() {
      return this.isIOSPhoneBrowser() || this.isPhoneYandexBrowser() || this.isAndroidPhoneBrowser();
    }, isSupportedBrowser:function(c) {
      return this.isMobile() && !l.canUseCalc() ? (a.trigger("sovetnik:stopped", !0, "calc"), !1) : this.isMobile() && this.isUCBrowser() ? (a.trigger("sovetnik:stopped", !0, "mobile-uc"), !1) : this.isMobile() && this.isFirefoxBrowser() ? (a.trigger("sovetnik:stopped", !0, "mobile-ff"), !1) : !this.isMobile() || this.isMobile && c;
    }, isMacBrowser:function() {
      return navigator && navigator.platform && -1 < navigator.platform.indexOf("Mac");
    }, isUCBrowser:function() {
      return navigator && navigator.userAgent && -1 < navigator.userAgent.indexOf("UCBrowser");
    }, isFirefoxBrowser:function() {
      return navigator && navigator.userAgent && -1 < navigator.userAgent.indexOf("firefox");
    }, isYaBrowser:function() {
      return navigator && navigator.userAgent && -1 < navigator.userAgent.indexOf("YaBrowser");
    }, isIOSTabletBrowser:function() {
      return navigator && navigator.userAgent && /iPad/.test(navigator.userAgent) && !window.MSStream;
    }, isIOSPhoneBrowser:function() {
      return navigator && navigator.userAgent && /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }, isAndroidTabletBrowser:function() {
      return navigator && navigator.userAgent && /Android/.test(navigator.userAgent) && !/Mobile/.test(navigator.userAgent) && !window.MSStream;
    }, isAndroidPhoneBrowser:function() {
      return navigator && navigator.userAgent && /Android/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent) && !window.MSStream;
    }, isPhoneYandexBrowser:function() {
      if (navigator.userAgent) {
        var a = function() {
          var a = /^YaBrowser.+\.00$/;
          return {v:navigator.userAgent.split(" ").some(function(b) {
            return a.test(b);
          })};
        }();
        if ("object" === typeof a) {
          return a.v;
        }
      }
    }, isTabletYandexBrowser:function() {
      if (navigator.userAgent) {
        var a = function() {
          var a = /^YaBrowser.+\.01$/;
          return {v:navigator.userAgent.split(" ").some(function(b) {
            return a.test(b);
          })};
        }();
        if ("object" === typeof a) {
          return a.v;
        }
      }
    }};
  }, function(g, k, e) {
    var l = function() {
      function a(a, b) {
        for (var c = 0; c < b.length; c++) {
          var d = b[c];
          d.enumerable = d.enumerable || !1;
          d.configurable = !0;
          "value" in d && (d.writable = !0);
          Object.defineProperty(a, d.key, d);
        }
      }
      return function(b, c, d) {
        c && a(b.prototype, c);
        d && a(b, d);
        return b;
      };
    }(), a = e(8), c = e(29), b = e(34);
    e(35);
    e(30);
    var d = !1, h = !1;
    k = function() {
      function f(a, d) {
        if (!(this instanceof f)) {
          throw new TypeError("Cannot call a class as a function");
        }
        this._currentDomainData = a;
        this._referrerData = d;
        try {
          this._svtDebug = window && window.localStorage && window.localStorage["svt.debug"] && JSON.parse(window.localStorage["svt.debug"]) || {};
        } catch (m) {
          this._svtDebug = {};
        }
        this._currentDomainData && this._currentDomainData.selector || (this._currentDomainData = c.mixin(this._currentDomainData, b.getParseData(window.location, document)));
      }
      l(f, [{key:"currentDomainDataExists", value:function() {
        return !!this._currentDomainData;
      }}, {key:"_checkRule", value:function(b, c, d) {
        return (d = d ? this._referrerData : this._currentDomainData) && d.rules && d.rules.length && -1 < d.rules.indexOf(b) ? (c && a(c), !0) : !1;
      }}, {key:"isAjaxSite", value:function() {
        return !!this.ajax;
      }}, {key:"canBeMainPage", value:function() {
        var a = document.URL;
        return this.mainPageTemplates && this.mainPageTemplates.length ? this.mainPageTemplates.some(function(b) {
          return (new RegExp(b)).test(a);
        }) : "/" === window.location.pathname;
      }}, {key:"canBeProductPage", value:function() {
        var b = void 0, c = document.URL;
        if (this.urlTemplates) {
          if (b = this.urlTemplates.some(function(a) {
            return (new RegExp(a)).test(c);
          })) {
            return !0;
          }
          d || (a("It's not a product page. Criterion: url doesn't match urlTemplate"), d = !0);
        } else {
          if (this.productPageSelector) {
            if (b = document.querySelector(this.productPageSelector)) {
              return !0;
            }
            h || (a("It's not a product page. Criterion: there is no element of productPageSelector"), h = !0);
          } else {
            return !0;
          }
        }
        return !1;
      }}, {key:"canBeCategoryPage", value:function() {
        var b = document.URL;
        if (this.categoryUrlTemplate) {
          if ((new RegExp(this.categoryUrlTemplate)).test(b)) {
            return a("category page - defined by url"), !0;
          }
        } else {
          if (this.categoryPageSelector && document.querySelector(this.categoryPageSelector)) {
            return a("category page - defined by page selector"), !0;
          }
        }
        return !1;
      }}, {key:"canBeAviaPage", value:function() {
        if (this.whiteLabelName) {
          return !0;
        }
        var a = void 0, b = document.URL;
        if ("avia" !== this.pageType) {
          return !1;
        }
        if (this.urlTemplates) {
          if (a = this.urlTemplates.some(function(a) {
            return (new RegExp(a)).test(b);
          })) {
            return !0;
          }
        } else {
          return !0;
        }
        return !1;
      }}, {key:"isBlacklisted", value:function() {
        return this._checkRule("blacklisted", "domain is blacklisted");
      }}, {key:"isYandexWebPartner", value:function() {
        return this._checkRule("yandex-web-partner", "this is webpartner");
      }}, {key:"isBlacklistedByReferrer", value:function() {
        return this._checkRule("blacklisted-by-referrer", "blacklisted by referrer", !0);
      }}, {key:"canUsePriceContext", value:function() {
        return !this._checkRule("no-price-context", "can not use price context");
      }}, {key:"canUseMicrodata", value:function() {
        return !this._checkRule("no-microdata", "can not use microdata");
      }}, {key:"canExtractPrice", value:function() {
        return !this._checkRule("no-price", "can not extract price");
      }}, {key:"canAddRelativePosition", value:function() {
        return !this._checkRule("no-relative-position", "can not add relative position");
      }}, {key:"canAddMarginTop", value:function() {
        return !this._checkRule("no-margin-top", "can not add margin-top");
      }}, {key:"isReviewSite", value:function() {
        return this._checkRule("review", "this is review site");
      }}, {key:"isShop", value:function() {
        return this._checkRule("shop", "this is shop") || this._checkRule("market-shop", "this is shop");
      }}, {key:"isLogSite", value:function() {
        return this._checkRule("lgs");
      }}, {key:"isClassified", value:function() {
        return this._checkRule("classified");
      }}, {key:"needUseRandomContainer", value:function() {
        return this._checkRule("random-container", "should use random container");
      }}, {key:"getFixedHeaderSelector", value:function() {
        return this._currentDomainData && this._currentDomainData.fixedHeaderSelector;
      }}, {key:"getPricebarTopPosition", value:function() {
        return this._checkRule("top-is-0") ? 0 : -1;
      }}, {key:"needUseRussianEnglishLetters", value:function() {
        return this._checkRule("russian-english-letters", "should use russian-english letters");
      }}, {key:"getAutoSelectors", value:function() {
        var a = window.location.href, b = this.auto;
        if (b) {
          var c = b.urlTemplates;
          if (!c || !c.length || c.some(function(b) {
            return (new RegExp(b)).test(a);
          })) {
            return b.attributes;
          }
        }
      }}, {key:"hasSelectors", get:function() {
        return this._currentDomainData && this._currentDomainData.selector;
      }}, {key:"domainDataSignature", get:function() {
        return this._currentDomainData && this._currentDomainData.signature;
      }}, {key:"selector", get:function() {
        var a = window.location.href;
        if (this.overrides) {
          var b = this.overrides.filter(function(b) {
            return b.urlTemplates.some(function(b) {
              return (new RegExp(b)).test(a);
            });
          })[0];
          if (b) {
            return b.selectors;
          }
        }
        return this._svtDebug && this._svtDebug.overrides && this._svtDebug.overrides.selector ? this._svtDebug.overrides.selector : this._currentDomainData && this._currentDomainData.selector;
      }}, {key:"specifiedValues", get:function() {
        return this._currentDomainData && this._currentDomainData.specifiedValues;
      }}, {key:"overrides", get:function() {
        return this._currentDomainData && this._currentDomainData.overrides;
      }}, {key:"ajax", get:function() {
        var a = this._currentDomainData && this._currentDomainData.ajax;
        a && a.forEach(function(a) {
          a.urlRegExps = a.urlTemplates.map(function(a) {
            return new RegExp(a);
          });
        });
        return a;
      }}, {key:"checkout", get:function() {
        return this._currentDomainData && this._currentDomainData.checkout;
      }}, {key:"cart", get:function() {
        return this._currentDomainData && this._currentDomainData.cart;
      }}, {key:"urlTemplates", get:function() {
        return this._currentDomainData && this._currentDomainData.urlTemplates;
      }}, {key:"mainPageTemplates", get:function() {
        return this._currentDomainData && this._currentDomainData.mainPageTemplates;
      }}, {key:"wait", get:function() {
        return this._currentDomainData && this._currentDomainData.wait;
      }}, {key:"notFoundSelector", get:function() {
        return this._currentDomainData && this._currentDomainData.notFoundSelector;
      }}, {key:"whiteLabelName", get:function() {
        return this._currentDomainData && this._currentDomainData.whiteLabelName;
      }}, {key:"pageType", get:function() {
        return this._currentDomainData && this._currentDomainData.type;
      }}, {key:"productPageSelector", get:function() {
        var a = window.location.href;
        if (this.overrides) {
          var b = this.overrides.filter(function(b) {
            return b.urlTemplates.some(function(b) {
              return (new RegExp(b)).test(a);
            });
          })[0];
          if (b) {
            return b.productPageSelector;
          }
        }
        return this._currentDomainData && this._currentDomainData.productPageSelector;
      }}, {key:"categoryPageSelector", get:function() {
        return this._currentDomainData && this._currentDomainData.categoryPageSelector;
      }}, {key:"categoryUrlTemplate", get:function() {
        return this._currentDomainData && this._currentDomainData.categoryUrlTemplate;
      }}, {key:"auto", get:function() {
        return this._currentDomainData && this._currentDomainData.auto;
      }}]);
      return f;
    }();
    g.exports = k;
  }, function(g, k, e) {
    var l = e(29);
    g.exports = {partners:[{name:"aviasales", wait:{until:"element", selector:".search_progressbar-container", container:".layout-manager", exist:!1}, notFoundSelector:".message--empty_tickets", detect:{urlTemplates:["/flights/(\\w{3})(\\d{4})(\\w{3})(\\d{4})?(\\d{1})?(\\d{1})?(\\d{1})?"]}, attributes:{depart:{source:"regex", type:"location", value:1}, arrive:{source:"regex", type:"location", value:3}, "depart-date":{source:"regex", type:"date", value:2, format:{re:"(\\d{2})(\\d{2})", year:null, 
    day:1, month:2}}, "return-date":{source:"regex", type:"date", value:4, format:{re:"(\\d{2})(\\d{2})", year:null, day:1, month:2}}, adult:{source:"regex", type:"int", value:5}, child:{source:"regex", type:"int", value:6}, infant:{source:"regex", type:"int", value:7}, price:{source:"selector", value:".ticket .currency_font", type:"price", wait:!0}}}, {name:"skyscanner", wait:{until:"element", selector:".progress-bar-with-title", container:".js-results-progress-panel", exist:!1}, ajax:[{urlTemplates:["flights"], 
    actions:[{name:"change", triggers:[{type:"hashchange"}], conditions:[{selector:"#search", shouldBe:"visible"}]}]}], notFoundSelector:".message--empty_tickets", detect:{urlTemplates:["#/result\\?originplace=(\\w{3})&destinationplace=(\\w{3})&outbounddate=(\\d{4}-\\d{2}-\\d{2})&inbounddate=(\\d{4}-\\d{2}-\\d{2})?[\\s\\S]*adults=(\\d{1})&children=(\\d{1})&infants=(\\d{1})"]}, attributes:{depart:{source:"regex", type:"location", value:1}, arrive:{source:"regex", type:"location", value:2}, "depart-date":{source:"regex", 
    type:"date", value:3, format:{re:"(\\d{4})-(\\d{2})-(\\d{2})", year:1, day:3, month:2}}, "return-date":{source:"regex", type:"date", value:4, format:{re:"(\\d{4})-(\\d{2})-(\\d{2})", year:1, day:3, month:2}}, adult:{source:"regex", type:"int", value:5}, child:{source:"regex", type:"int", value:6}, infant:{source:"regex", type:"int", value:7}, price:{source:"selector", value:".js-cheapest-price", type:"price", wait:!0}}}, {name:"kayak", notFoundSelector:"#content_div .noresults", wait:{until:"element", 
    selector:".Common-Results-ProgressBar.theme-phoenix", container:".keel-container", exist:!1}, detect:{urlTemplates:["/flights/(\\w{3})-(\\w{3})/(\\d{4}-\\d{2}-\\d{2})(?:/(\\d{4}-\\d{2}-\\d{2}))?"]}, attributes:{depart:{source:"regex", type:"location", value:1}, arrive:{source:"regex", type:"location", value:2}, "depart-date":{source:"regex", type:"date", value:3, format:{re:"(\\d{4})-(\\d{2})-(\\d{2})", year:1, day:3, month:2}}, "return-date":{source:"regex", type:"date", value:4, format:{re:"(\\d{4})-(\\d{2})-(\\d{2})", 
    year:1, day:3, month:2}}, adult:{source:"selector", type:"int", value:"input[id*=travelers-adults-input]"}, child:{source:"selector", type:"int", value:"input[id*=travelers-child-input]"}, infant:{source:"selector", type:"int", value:"input[id*=travelers-lapInfant-input]"}, price:{source:"selector", value:"div span.total-price, span.price.option-text", type:"price", wait:!0}}}], getParseData:function(a, c) {
      if (a = this.findPartner(a, c)) {
        return {wait:a.wait, notFoundSelector:a.notFoundSelector, selector:a.attributes, urlTemplates:a.detect.urlTemplates, ajax:a.ajax, whiteLabelName:a.name};
      }
    }, findPartner:function(a, c) {
      var b = void 0;
      (b = this.partners.find(function(b) {
        if (b.detect.urlTemplates[0]) {
          return (new RegExp(b.detect.urlTemplates[0])).test(a);
        }
      })) || (b = this.partners.find(function(a) {
        if (a.detect.selectors) {
          return a.detect.selectors.every(function(a) {
            return !!c.querySelector(a);
          });
        }
      }));
      b || (b = this.partners.find(function(b) {
        if (b.detect.queryParams) {
          return b.detect.queryParams.every(function(b) {
            return !!l.getQueryParam(a, b);
          });
        }
      }));
      return b;
    }};
  }, function(g, k, e) {
    (function(l, a) {
      g.exports = a(e(36));
    })(this, function(e) {
      (function(a) {
        function c(a, b, c, d, f, e, g) {
          a = a + (b & c | ~b & d) + f + g;
          return (a << e | a >>> 32 - e) + b;
        }
        function b(a, b, c, d, f, e, g) {
          a = a + (b & d | c & ~d) + f + g;
          return (a << e | a >>> 32 - e) + b;
        }
        function d(a, b, c, d, f, e, g) {
          a = a + (b ^ c ^ d) + f + g;
          return (a << e | a >>> 32 - e) + b;
        }
        function g(a, b, c, d, f, e, g) {
          a = a + (c ^ (b | ~d)) + f + g;
          return (a << e | a >>> 32 - e) + b;
        }
        var f = e.lib, r = f.WordArray, l = f.Hasher;
        f = e.algo;
        var m = [];
        (function() {
          for (var b = 0; 64 > b; b++) {
            m[b] = 4294967296 * a.abs(a.sin(b + 1)) | 0;
          }
        })();
        f = f.MD5 = l.extend({_doReset:function() {
          this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]);
        }, _doProcessBlock:function(a, f) {
          for (var e = 0; 16 > e; e++) {
            var h = f + e, r = a[h];
            a[h] = (r << 8 | r >>> 24) & 16711935 | (r << 24 | r >>> 8) & 4278255360;
          }
          e = this._hash.words;
          h = a[f + 0];
          r = a[f + 1];
          var l = a[f + 2], k = a[f + 3], u = a[f + 4], t = a[f + 5], v = a[f + 6], y = a[f + 7], z = a[f + 8], A = a[f + 9], B = a[f + 10], C = a[f + 11], D = a[f + 12], E = a[f + 13], F = a[f + 14];
          a = a[f + 15];
          f = e[0];
          var n = e[1], p = e[2], q = e[3];
          f = c(f, n, p, q, h, 7, m[0]);
          q = c(q, f, n, p, r, 12, m[1]);
          p = c(p, q, f, n, l, 17, m[2]);
          n = c(n, p, q, f, k, 22, m[3]);
          f = c(f, n, p, q, u, 7, m[4]);
          q = c(q, f, n, p, t, 12, m[5]);
          p = c(p, q, f, n, v, 17, m[6]);
          n = c(n, p, q, f, y, 22, m[7]);
          f = c(f, n, p, q, z, 7, m[8]);
          q = c(q, f, n, p, A, 12, m[9]);
          p = c(p, q, f, n, B, 17, m[10]);
          n = c(n, p, q, f, C, 22, m[11]);
          f = c(f, n, p, q, D, 7, m[12]);
          q = c(q, f, n, p, E, 12, m[13]);
          p = c(p, q, f, n, F, 17, m[14]);
          n = c(n, p, q, f, a, 22, m[15]);
          f = b(f, n, p, q, r, 5, m[16]);
          q = b(q, f, n, p, v, 9, m[17]);
          p = b(p, q, f, n, C, 14, m[18]);
          n = b(n, p, q, f, h, 20, m[19]);
          f = b(f, n, p, q, t, 5, m[20]);
          q = b(q, f, n, p, B, 9, m[21]);
          p = b(p, q, f, n, a, 14, m[22]);
          n = b(n, p, q, f, u, 20, m[23]);
          f = b(f, n, p, q, A, 5, m[24]);
          q = b(q, f, n, p, F, 9, m[25]);
          p = b(p, q, f, n, k, 14, m[26]);
          n = b(n, p, q, f, z, 20, m[27]);
          f = b(f, n, p, q, E, 5, m[28]);
          q = b(q, f, n, p, l, 9, m[29]);
          p = b(p, q, f, n, y, 14, m[30]);
          n = b(n, p, q, f, D, 20, m[31]);
          f = d(f, n, p, q, t, 4, m[32]);
          q = d(q, f, n, p, z, 11, m[33]);
          p = d(p, q, f, n, C, 16, m[34]);
          n = d(n, p, q, f, F, 23, m[35]);
          f = d(f, n, p, q, r, 4, m[36]);
          q = d(q, f, n, p, u, 11, m[37]);
          p = d(p, q, f, n, y, 16, m[38]);
          n = d(n, p, q, f, B, 23, m[39]);
          f = d(f, n, p, q, E, 4, m[40]);
          q = d(q, f, n, p, h, 11, m[41]);
          p = d(p, q, f, n, k, 16, m[42]);
          n = d(n, p, q, f, v, 23, m[43]);
          f = d(f, n, p, q, A, 4, m[44]);
          q = d(q, f, n, p, D, 11, m[45]);
          p = d(p, q, f, n, a, 16, m[46]);
          n = d(n, p, q, f, l, 23, m[47]);
          f = g(f, n, p, q, h, 6, m[48]);
          q = g(q, f, n, p, y, 10, m[49]);
          p = g(p, q, f, n, F, 15, m[50]);
          n = g(n, p, q, f, t, 21, m[51]);
          f = g(f, n, p, q, D, 6, m[52]);
          q = g(q, f, n, p, k, 10, m[53]);
          p = g(p, q, f, n, B, 15, m[54]);
          n = g(n, p, q, f, r, 21, m[55]);
          f = g(f, n, p, q, z, 6, m[56]);
          q = g(q, f, n, p, a, 10, m[57]);
          p = g(p, q, f, n, v, 15, m[58]);
          n = g(n, p, q, f, E, 21, m[59]);
          f = g(f, n, p, q, u, 6, m[60]);
          q = g(q, f, n, p, C, 10, m[61]);
          p = g(p, q, f, n, l, 15, m[62]);
          n = g(n, p, q, f, A, 21, m[63]);
          e[0] = e[0] + f | 0;
          e[1] = e[1] + n | 0;
          e[2] = e[2] + p | 0;
          e[3] = e[3] + q | 0;
        }, _doFinalize:function() {
          var b = this._data, c = b.words, f = 8 * this._nDataBytes, d = 8 * b.sigBytes;
          c[d >>> 5] |= 128 << 24 - d % 32;
          var e = a.floor(f / 4294967296);
          c[(d + 64 >>> 9 << 4) + 15] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360;
          c[(d + 64 >>> 9 << 4) + 14] = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360;
          b.sigBytes = 4 * (c.length + 1);
          this._process();
          b = this._hash;
          c = b.words;
          for (f = 0; 4 > f; f++) {
            d = c[f], c[f] = (d << 8 | d >>> 24) & 16711935 | (d << 24 | d >>> 8) & 4278255360;
          }
          return b;
        }, clone:function() {
          var a = l.clone.call(this);
          a._hash = this._hash.clone();
          return a;
        }});
        e.MD5 = l._createHelper(f);
        e.HmacMD5 = l._createHmacHelper(f);
      })(Math);
      return e.MD5;
    });
  }, function(g, k, e) {
    (function(e, a) {
      g.exports = a();
    })(this, function() {
      var e = e || function(a, c) {
        var b = {}, d = b.lib = {}, e = d.Base = function() {
          function a() {
          }
          return {extend:function(b) {
            a.prototype = this;
            var c = new a;
            b && c.mixIn(b);
            c.hasOwnProperty("init") || (c.init = function() {
              c.$super.init.apply(this, arguments);
            });
            c.init.prototype = c;
            c.$super = this;
            return c;
          }, create:function() {
            var a = this.extend();
            a.init.apply(a, arguments);
            return a;
          }, init:function() {
          }, mixIn:function(a) {
            for (var b in a) {
              a.hasOwnProperty(b) && (this[b] = a[b]);
            }
            a.hasOwnProperty("toString") && (this.toString = a.toString);
          }, clone:function() {
            return this.init.prototype.extend(this);
          }};
        }(), f = d.WordArray = e.extend({init:function(a, b) {
          a = this.words = a || [];
          this.sigBytes = b != c ? b : 4 * a.length;
        }, toString:function(a) {
          return (a || l).stringify(this);
        }, concat:function(a) {
          var b = this.words, c = a.words, f = this.sigBytes;
          a = a.sigBytes;
          this.clamp();
          if (f % 4) {
            for (var d = 0; d < a; d++) {
              b[f + d >>> 2] |= (c[d >>> 2] >>> 24 - d % 4 * 8 & 255) << 24 - (f + d) % 4 * 8;
            }
          } else {
            for (d = 0; d < a; d += 4) {
              b[f + d >>> 2] = c[d >>> 2];
            }
          }
          this.sigBytes += a;
          return this;
        }, clamp:function() {
          var b = this.words, c = this.sigBytes;
          b[c >>> 2] &= 4294967295 << 32 - c % 4 * 8;
          b.length = a.ceil(c / 4);
        }, clone:function() {
          var a = e.clone.call(this);
          a.words = this.words.slice(0);
          return a;
        }, random:function(b) {
          for (var c = [], d = function(b) {
            var c = 987654321;
            return function() {
              c = 36969 * (c & 65535) + (c >> 16) & 4294967295;
              b = 18E3 * (b & 65535) + (b >> 16) & 4294967295;
              return (((c << 16) + b & 4294967295) / 4294967296 + 0.5) * (.5 < a.random() ? 1 : -1);
            };
          }, e = 0, g; e < b; e += 4) {
            var h = d(4294967296 * (g || a.random()));
            g = 987654071 * h();
            c.push(4294967296 * h() | 0);
          }
          return new f.init(c, b);
        }}), g = b.enc = {}, l = g.Hex = {stringify:function(a) {
          var b = a.words;
          a = a.sigBytes;
          for (var c = [], f = 0; f < a; f++) {
            var d = b[f >>> 2] >>> 24 - f % 4 * 8 & 255;
            c.push((d >>> 4).toString(16));
            c.push((d & 15).toString(16));
          }
          return c.join("");
        }, parse:function(a) {
          for (var b = a.length, c = [], d = 0; d < b; d += 2) {
            c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - d % 8 * 4;
          }
          return new f.init(c, b / 2);
        }}, m = g.Latin1 = {stringify:function(a) {
          var b = a.words;
          a = a.sigBytes;
          for (var c = [], f = 0; f < a; f++) {
            c.push(String.fromCharCode(b[f >>> 2] >>> 24 - f % 4 * 8 & 255));
          }
          return c.join("");
        }, parse:function(a) {
          for (var b = a.length, c = [], d = 0; d < b; d++) {
            c[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - d % 4 * 8;
          }
          return new f.init(c, b);
        }}, k = g.Utf8 = {stringify:function(a) {
          try {
            return decodeURIComponent(escape(m.stringify(a)));
          } catch (I) {
            throw Error("Malformed UTF-8 data");
          }
        }, parse:function(a) {
          return m.parse(unescape(encodeURIComponent(a)));
        }}, t = d.BufferedBlockAlgorithm = e.extend({reset:function() {
          this._data = new f.init;
          this._nDataBytes = 0;
        }, _append:function(a) {
          "string" == typeof a && (a = k.parse(a));
          this._data.concat(a);
          this._nDataBytes += a.sigBytes;
        }, _process:function(b) {
          var c = this._data, d = c.words, e = c.sigBytes, g = this.blockSize, h = e / (4 * g);
          h = b ? a.ceil(h) : a.max((h | 0) - this._minBufferSize, 0);
          b = h * g;
          e = a.min(4 * b, e);
          if (b) {
            for (var r = 0; r < b; r += g) {
              this._doProcessBlock(d, r);
            }
            r = d.splice(0, b);
            c.sigBytes -= e;
          }
          return new f.init(r, e);
        }, clone:function() {
          var a = e.clone.call(this);
          a._data = this._data.clone();
          return a;
        }, _minBufferSize:0});
        d.Hasher = t.extend({cfg:e.extend(), init:function(a) {
          this.cfg = this.cfg.extend(a);
          this.reset();
        }, reset:function() {
          t.reset.call(this);
          this._doReset();
        }, update:function(a) {
          this._append(a);
          this._process();
          return this;
        }, finalize:function(a) {
          a && this._append(a);
          return this._doFinalize();
        }, blockSize:16, _createHelper:function(a) {
          return function(b, c) {
            return (new a.init(c)).finalize(b);
          };
        }, _createHmacHelper:function(a) {
          return function(b, c) {
            return (new w.HMAC.init(a, c)).finalize(b);
          };
        }});
        var w = b.algo = {};
        return b;
      }(Math);
      return e;
    });
  }, function(g, k, e) {
    var l = e(29);
    g.exports = {"aliexpress.com":{_tryGetEnglishName:function(a) {
      a = a || [];
      a = a.filter(function(a) {
        return "oem" !== a && "new" !== a && -1 === a.indexOf("\u0414\u0440\u0443\u0433\u043e\u0439");
      });
      if (!a.length) {
        return "";
      }
      var c = /[\u0430-\u044f\u0410-\u042f]/, b = a.filter(function(a) {
        return !c.test(a);
      });
      return b.length ? b[0] : -1 < a[0].indexOf("\u042f\u0431\u043b\u043e\u043a\u043e") || -1 < a[0].indexOf("\u044f\u0431\u043b\u043e\u043a\u043e") ? "Apple" : a[0];
    }, _getNameByCategoryRegex:function(a, c) {
      return this._tryGetEnglishName(a.filter(function(a) {
        return c.test(a.innerHTML);
      }).map(function(a) {
        return l.getTextContents(a.querySelector("dd")).toLowerCase();
      }));
    }, getName:function() {
      var a = "", c = /^(\u0424\u0438\u0440\u043c\u0435\u043d\u043d\u043e\u0435\s\u043d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435)|(\u041f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c)|(>Brand)/, b = /(Model)|(\u043c\u043e\u0434\u0435\u043b\u0438\u0440\u0443\u0435\u0442)|(\u041c\u043e\u0434\u0435\u043b)/, d = /(\u041f\u0417\u0423)|(ROM)/, e = [].slice.call(document.querySelectorAll("#product-desc .product-params .ui-box-body .ui-attr-list"));
      e && e.length && (c = this._getNameByCategoryRegex(e, c), b = this._getNameByCategoryRegex(e, b), d = this._getNameByCategoryRegex(e, d), c && b && !b.match(/\u0434\u0440\u0443\u0433\u043e\u0439/i) && (-1 === b.indexOf(c) && (a = c + " "), a += b, d && (/\dg$/.test(d) && (d += "b"), a += " " + d)));
      return a;
    }}, "videoigr.net":{getName:function() {
      var a = document.querySelector("tbody>tr>.pageHeading:nth-of-type(1) br");
      var c = document.querySelector("tbody>tr>.pageHeading:nth-of-type(1)");
      (a = a && a.previousSibling.textContent) || (a = c ? l.getTextContents(c) : "");
      return a;
    }}};
  }, function(g, k) {
    g.exports = void 0;
  }, function(g, k) {
    g.exports = {isCORSSupported:function() {
      return !!this._getXHR("https://yandex.ru", "GET", !0);
    }, _getXHR:function(e, g, a) {
      var c = void 0;
      "undefined" !== typeof XMLHttpRequest && (c = new XMLHttpRequest);
      if (a) {
        if ("withCredentials" in c) {
          try {
            c.open(g, e, !0), c.withCredentials = !0;
          } catch (b) {
            c = null;
          }
        } else {
          c = null;
        }
      } else {
        c.open(g, e, !0);
      }
      return c;
    }, get:function(e, g, a, c) {
      var b = void 0, d = g ? -1 === (e || "").indexOf("?") ? "?" : "&" : "";
      g = g || {};
      var h = [], f;
      for (f in g) {
        g.hasOwnProperty(f) && h.push(encodeURIComponent(f) + "=" + encodeURIComponent(g[f]));
      }
      d += h.join("&");
      var r = this._getXHR(e + d, "GET", !c);
      r || a && a({error:"CORS not supported"});
      r.onreadystatechange = function() {
        b && (new Date).getTime();
        if (4 === r.readyState) {
          if (200 === r.status) {
            a && a(JSON.parse(r.responseText));
          } else {
            if ("number" === typeof r.status || "string" === typeof r.status) {
              var c = r.status;
              "string" === typeof r.statusText && (c += " " + r.statusText);
            } else {
              c = "Unknown code";
            }
            if (r.responseText) {
              try {
                var f = JSON.parse(r.responseText);
                a && a(f);
                return;
              } catch (v) {
              }
            }
            a && a({error:"Error with XHR", errorMessage:c});
          }
        }
      };
      b = (new Date).getTime();
      r.send(null);
    }, post:function(e, g, a, c) {
      var b = this._getXHR(e, "POST", !0) || this._getXHR(e, "POST");
      b.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      Object.keys(c || {}).forEach(function(a) {
        b.setRequestHeader(a, c[a]);
      });
      b.onreadystatechange = function() {
        4 === b.readyState && 200 === b.status && a && a(JSON.parse(b.responseText));
      };
      b.send(JSON.stringify(g));
    }};
  }, function(g, k, e) {
    var l = e(29);
    g.exports = function() {
      var a = 0 >= arguments.length || void 0 === arguments[0] ? "" : arguments[0], c = (new Date).getTime();
      c = c.toString(36);
      return a + c + l.getRandomHash(24);
    };
  }, function(g, k) {
    g.exports = void 0;
  }, function(g, k, e) {
    var l = e(14), a = e(27), c = e(43), b = e(38), d = e(44);
    g.exports = {init:function(d) {
      return a.shouldUseIframeStorage() ? c.init(d) : b && b.init ? b.init() : l.resolve();
    }, get:function(d, f) {
      return b ? b.get(d) : a.shouldUseIframeStorage() ? c.get(d, f) : l.resolve();
    }, getSelector:function(d) {
      return b ? b.getSelector(d) : a.shouldUseIframeStorage() ? c.getSelector("key") : l.resolve();
    }, loadSettings:function() {
      return b ? b.loadSettings() : a.shouldUseIframeStorage() ? l.resolve({}) : d.getSovetnikInfo();
    }, canUseDomainData:function() {
      return b ? l.resolve(!!b.getDomainData) : l.resolve(!0);
    }, getDomainData:function(e) {
      return b && b.getDomainData ? b.getDomainData() : a.shouldUseIframeStorage() ? c.getDomainData(e) : d.getDomainInfo(e);
    }, set:function(a, f, d) {
      return (b || c).set(a, f, d);
    }, needSetYSCookie:function() {
      return b ? !!b.get : !0;
    }, clear:function() {
      c && c.clear();
    }};
  }, function(g, k, e) {
    var l = e(14), a = e(18), c = e(35), b = e(27), d = e(8), h = e(29);
    g.exports = {listeners:{}, messages:[], iframe:{}, ready:!1, iframepath:"/static/storage/index.html", version:1, generateCookie:function() {
      return Math.round(9000000 * Math.random());
    }, sendMessage:function(a) {
      this.iframe.postMessage(a, this.host);
      this.iframe.postMessage(JSON.stringify(a), this.host);
    }, processMessages:function() {
      for (; this.messages.length;) {
        var a = this.messages.pop();
        this.sendMessage(a);
      }
    }, prepareMessage:function(a, b) {
      var c = this.generateCookie();
      a.cookie = c;
      this.listeners[c] = b;
      return a;
    }, pullMessage:function(a) {
      var b = this, c = new l(function(c) {
        return b.prepareMessage(a, c);
      });
      this.messages.push(a);
      this.ready && this.processMessages();
      return c;
    }, getVersion:function() {
      var a = this, b = {type:"MBR_STORAGE", command:"get", key:"version"}, c = new l(function(c) {
        return a.prepareMessage(b, c);
      });
      this.sendMessage(b);
      return c;
    }, get:function(a, b) {
      return this.pullMessage({type:"MBR_STORAGE", command:"get", key:a, session:b});
    }, set:function(a, b, c) {
      return this.pullMessage({type:"MBR_STORAGE", command:"set", key:a, value:b, session:c});
    }, loadSettings:function() {
      var b = this;
      return this.init(a.getStorageHost()).then(function() {
        return 1 < b.version ? b._loadSettingsV2() : b._loadSettingsV1();
      });
    }, _loadSettingsV1:function() {
      return this.pullMessage({type:"MBR_STORAGE", command:"loadSettings"});
    }, _loadSettingsV2:function() {
      return l.all([this._loadPartnerSettings(), this._loadUserSettings()]).then(function(a) {
        var b = a[0];
        a = a[1];
        for (var c in b) {
          b.hasOwnProperty(c) && !a.hasOwnProperty(c) && (a[c] = b[c]);
        }
        return a;
      });
    }, _loadPartnerSettings:function() {
      return this.pullMessage({type:"MBR_STORAGE", command:"loadPartnerSettings"});
    }, _loadUserSettings:function() {
      return this.pullMessage({type:"MBR_STORAGE", command:"loadUserSettings"});
    }, saveSettings:function(a) {
      this.pullMessage({type:"MBR_STORAGE", command:"saveSettings", value:a});
    }, getSelector:function(a) {
      return this.pullMessage({type:"MBR_STORAGE", command:"getSelector", domain:a});
    }, getDomainData:function(a) {
      for (var b = []; -1 !== a.indexOf(".");) {
        b.push(c(a).toString()), a = a.replace(/^[^\.]+\./, "");
      }
      b.toJSON && (b.toJSON = function() {
        return this.map(function(a) {
          return a.toString();
        });
      });
      a = {type:"MBR_STORAGE", command:"getDomainInfo", domains:JSON.stringify(b)};
      return this.pullMessage(a);
    }, canUseDomainData:function() {
      var b = this;
      return this.init(a.getStorageHost()).then(function() {
        return 2 < b.version;
      });
    }, getCookies:function() {
      return this.pullMessage({type:"MBR_STORAGE", command:"getCookies"});
    }, getLocalStorage:function() {
      return this.pullMessage({type:"MBR_STORAGE", command:"getLocalStorage"});
    }, test:function() {
      return this.pullMessage({type:"MBR_STORAGE", command:"testStorage"});
    }, listener:function(a) {
      var c = void 0;
      if (a && a.data) {
        if ("string" === typeof a.data) {
          try {
            c = JSON.parse(a.data);
          } catch (u) {
            return;
          }
        } else {
          c = a.data;
        }
        if (c.cookie && "MBR_STORAGE" === c.type && (a = this.listeners[c.cookie])) {
          try {
            a(c.value);
          } catch (u) {
          }
          delete this.listeners[c.cookie];
        }
        c && "MBR_SETTINGS" === c.type && c.value && (d("save settings"), b.isUniversalScript() && b.applySettings(c.value));
      }
    }, clear:function() {
      b.isOurSite(h.getHostname(document)) || b.isYandexWebPartner() || b.needSendVersion() || (this._container && this._container.parentNode && this._container.parentNode.removeChild(this._container), this.readyPromise = !1);
    }, init:function(a) {
      var c = this;
      if (!this.readyPromise) {
        var d = this;
        this.readyPromise = new l(function(c) {
          d.host = a;
          var f = document.createElement("iframe");
          f.style.display = "none";
          f.onload = function() {
            d.iframe = f.contentWindow;
            d.getVersion().then(function(a) {
              a && (d.version = a);
              d.ready = !0;
              d.messages.length && d.processMessages();
              c();
            });
          };
          f.src = d.host + d.iframepath + "?version=" + b.getAppVersion();
          d._container = f;
          document.body.appendChild(f);
          window.addEventListener ? window.addEventListener("message", function(a) {
            d.listener.call(d, a);
          }, !0) : window.attachEvent("onmessage", function(a) {
            return d.listener.call(d, a);
          });
        });
      }
      this.test().then(function(a) {
        a || (c.clear(), b.clearPriceContextNodes());
      });
      return this.readyPromise;
    }};
  }, function(g, k, e) {
    var l = e(14), a = e(27), c = e(29), b = e(18), d = e(30), h = e(45);
    g.exports = {_listeners:{}, _generateCookie:function() {
      return Math.round(9000000 * Math.random());
    }, _sendMessageToExtension:function(b, d) {
      var f = this;
      return new l(function(e, g) {
        var m = f._generateCookie(), l = void 0;
        f._listeners[m] = function(a) {
          clearTimeout(l);
          e(a);
        };
        h.trigger(JSON.stringify({type:"MBR_ENVIRONMENT", command:b, clid:a.getClid(), affId:a.getAffId(), listenerId:m, data:d}), c.getLocationOrigin());
        "getDomainData" === b && (l = setTimeout(g, 3000));
      });
    }, _canHanldeEvent:function(b) {
      if (b) {
        var c = a.getClid(), d = a.getAffId();
        if ("undefined" === typeof b.response) {
          return !1;
        }
        if (c) {
          if (c != b.clid) {
            return !1;
          }
        } else {
          if (d && d != b.affId) {
            return !1;
          }
        }
        return !0;
      }
    }, _getDataFromEvent:function(a) {
      a = a.data;
      if ("string" === typeof a) {
        try {
          a = JSON.parse(a);
        } catch (r) {
          return null;
        }
      }
      return a;
    }, _listenPageMessage:function(a) {
      if (this.isSettingsPage && a && a.data) {
        var b = this._getDataFromEvent(a);
        this._canHanldeEvent(b) && (a = b.type, b = b.domain, a && b && ("removeDomain" === a ? this._onDomainEnabled(b) : "addDomain" === a && this._onDomainDisabled(b)));
      }
    }, _listenExtensionMessages:function(a) {
      if (a && a.data && (a = this._getDataFromEvent(a), this._canHanldeEvent(a) && a.listenerId && this._listeners[a.listenerId])) {
        this._listeners[a.listenerId](a.response);
      }
    }, _onSecondScript:function() {
      this._sendMessageToExtension("serverMessage", {type:"secondScript"});
    }, _onUserAgreementChanged:function() {
      this._sendMessageToExtension("serverMessage", {type:"userAgreementChanged"});
    }, _onDomainDisabled:function() {
      this._sendMessageToExtension("serverMessage", {type:"domainDisabled", domain:0 >= arguments.length || void 0 === arguments[0] ? document.domain : arguments[0]});
    }, _onDomainEnabled:function(a) {
      this._sendMessageToExtension("serverMessage", {type:"domainEnabled", domain:a});
    }, _showSettingsPage:function() {
      this._sendMessageToExtension("showSettingsPage");
    }, getDomainInfo:function(a) {
      return this._sendMessageToExtension("getDomainData", {domain:a})["catch"](function(a) {
        d.trigger("post-message-error", !1);
      });
    }, getSovetnikInfo:function() {
      return this._sendMessageToExtension("getSovetnikInfo");
    }, _showNotification:function(a) {
      this._sendMessageToExtension("showNotification", a);
    }, _clearNotification:function(a) {
      this._sendMessageToExtension("clearNotification", a.action);
    }, _onProductResponse:function(a) {
      return this._sendMessageToExtension("sovetnikProductResponse", a);
    }, init:function() {
      var a = this, e = c.getLocationOrigin();
      this.isSettingsPage = b.getSettingsHost() === e;
      d.on("script:secondScript", function(b) {
        return a._onSecondScript(b);
      });
      d.on("script:offer", function() {
        return a._onUserAgreementChanged();
      });
      d.on("script:domainDisabled", function(b) {
        return a._onDomainDisabled(b);
      });
      d.on("pricebar:settingsPage", function(b) {
        return a._showSettingsPage(b);
      });
      d.on("pricebar:notification", function(b) {
        return a._showNotification(b);
      });
      d.on("notification:clear", function(b) {
        return a._clearNotification(b);
      });
      d.on("suggest:productOfferFound", function(b) {
        return a._onProductResponse(b);
      });
      h.on(function(b) {
        return a._listenExtensionMessages(b);
      });
      h.on(function(b) {
        return a._listenPageMessage(b);
      }, !0);
      h.trigger(JSON.stringify({type:"MBR_ENVIRONMENT"}), e, !0);
    }};
  }, function(g, k, e) {
    function l(a) {
      a = a.data;
      if ("string" === typeof a) {
        try {
          a = JSON.parse(a);
        } catch (f) {
          a = null;
        }
      }
      return a;
    }
    function a() {
      clearTimeout(b);
      MessageEvent.prototype.stopImmediatePropagation = function() {
        var a = l(this);
        a && "MBR_ENVIRONMENT" === a.type ? (a = l(this)) && "getDomainData" === a.command && c.trigger("post-message-error", !0) : d.call(this);
      };
      b = setTimeout(function() {
        MessageEvent.prototype.stopImmediatePropagation = d;
      }, 1500);
    }
    var c = e(30), b = void 0, d = MessageEvent.prototype.stopImmediatePropagation;
    g.exports = {on:function(a) {
      var b = 1 >= arguments.length || void 0 === arguments[1] ? !1 : arguments[1];
      if (window.svtPostMessage && !b) {
        window.svtPostMessage.on(a);
      } else {
        window.addEventListener ? window.addEventListener("message", a) : window.attachEvent("onmessage", a);
      }
    }, trigger:function(b, c) {
      var d = 2 >= arguments.length || void 0 === arguments[2] ? !1 : arguments[2];
      window.svtPostMessage && !d ? window.svtPostMessage.trigger(b) : window.wrappedJSObject && window.wrappedJSObject.postMessage ? window.wrappedJSObject.postMessage(b, c) : (a(), window.postMessage(b, c));
    }};
  }, , , , , , , , , , function(g, k, e) {
    function l() {
      c.sendMessage({type:"getSovetnikInfo"}, function(a) {
        (r = a) && d(document.URL, document.referrer, function() {
          "undefined" !== typeof startSovetnik ? startSovetnik(r.settings) : b(document, r.url, r.settings);
        });
      });
      f.on(a);
    }
    function a(a) {
      var b = h.getMessageFromEvent(a);
      if (b && r && r.settings) {
        if (r.settings.clid) {
          if (r.settings.clid != b.clid) {
            return;
          }
        } else {
          if (r.settings.affId != b.affId) {
            return;
          }
        }
        if (b.command) {
          u[b.command](b, a.origin);
        }
      }
    }
    var c = e(56), b = e(58), d = e(60), h = e(61), f = e(45);
    g = e(27);
    k = /^https?:\/\/sovetnik/;
    var r = void 0, u = {getDomainData:function(a, b) {
      c.sendMessage({type:"getDomainData", domain:a.data.domain}, function(c) {
        a.response = c;
        f.trigger(JSON.stringify(a), b);
      });
    }, getSovetnikInfo:function(a, b) {
      a.response = r.settings;
      f.trigger(JSON.stringify(a), b);
    }, serverMessage:function(a) {
      c.sendMessage({type:a.data.type, domain:a.data.domain || window.location.host});
    }, showSettingsPage:function() {
      c.sendMessage({type:"showSettingsPage"});
    }, showNotification:function(a) {
      c.sendMessage({type:"showNotification", notification:a.data});
    }, clearNotification:function(a) {
      c.sendMessage({type:"clearNotification", action:a.data});
    }, sovetnikProductResponse:function(a) {
      c.sendMessage({type:"sovetnikProductResponse", response:a.data});
    }};
    window && window.document && (!g.isSiteInIframe() || k.test(window.location.href)) && (window.opera ? "complete" === window.document.readyState || "interactive" === window.document.readyState ? l() : window.document.addEventListener("DOMContentLoaded", l, !1) : l());
  }, function(g, k, e) {
    k = e(57);
    g.exports = k;
  }, function(g, k) {
    g.exports = {sendMessage:function(e, g) {
      g = g || function() {
      };
      chrome.runtime.sendMessage(e, function() {
        var a = arguments;
        setTimeout(function() {
          g.apply(this, a);
        }, 0);
      });
      return this;
    }, onMessage:function(e) {
      chrome.runtime.onMessage.addListener(function(g, a, c) {
        return e(g, c);
      });
    }};
  }, function(g, k, e) {
    k = e(59);
    g.exports = k;
  }, function(g, k) {
    g.exports = function(e, g, a) {
      var c = e.createElement("script"), b = [];
      b.push("mbr=true");
      b.push("settings=" + encodeURIComponent(JSON.stringify(a)));
      b = b.join("&");
      c.setAttribute("src", g + ("?" + b));
      c.setAttribute("type", "text/javascript");
      c.setAttribute("charset", "UTF-8");
      e.body.appendChild(c);
    };
  }, function(g, k, e) {
    var l = e(56);
    g.exports = function(a, c, b) {
      l.sendMessage({type:"canUseSovetnik", url:a, referrer:c}, function(a) {
        a && b();
      });
    };
  }, function(g, k) {
    g.exports = {getMessageFromEvent:function(e) {
      if (!e.data) {
        return null;
      }
      e = e.data;
      if ("string" === typeof e) {
        try {
          e = JSON.parse(e);
        } catch (l) {
          return null;
        }
      }
      return e && "MBR_ENVIRONMENT" === e.type && !e.hasOwnProperty("response") && (e.clid || e.affId) ? e : null;
    }};
  }]);
})();

