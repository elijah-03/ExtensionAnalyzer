var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, l) {
  a != Array.prototype && a != Object.prototype && (a[c] = l.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var a = 0;
  return function(c) {
    return $jscomp.SYMBOL_PREFIX + (c || "") + a++;
  };
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(a) {
  var c = 0;
  return $jscomp.iteratorPrototype(function() {
    return c < a.length ? {done:!1, value:a[c++]} : {done:!0};
  });
};
$jscomp.iteratorPrototype = function(a) {
  $jscomp.initSymbolIterator();
  a = {next:a};
  a[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.iteratorFromArray = function(a, c) {
  $jscomp.initSymbolIterator();
  a instanceof String && (a += "");
  var l = 0, g = {next:function() {
    if (l < a.length) {
      var e = l++;
      return {value:c(e, a[e]), done:!1};
    }
    g.next = function() {
      return {done:!0, value:void 0};
    };
    return g.next();
  }};
  g[Symbol.iterator] = function() {
    return g;
  };
  return g;
};
$jscomp.polyfill = function(a, c, l, g) {
  if (c) {
    l = $jscomp.global;
    a = a.split(".");
    for (g = 0; g < a.length - 1; g++) {
      var e = a[g];
      e in l || (l[e] = {});
      l = l[e];
    }
    a = a[a.length - 1];
    g = l[a];
    c = c(g);
    c != g && null != c && $jscomp.defineProperty(l, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("Array.prototype.keys", function(a) {
  return a ? a : function() {
    return $jscomp.iteratorFromArray(this, function(a) {
      return a;
    });
  };
}, "es6", "es3");
$jscomp.makeIterator = function(a) {
  $jscomp.initSymbolIterator();
  var c = a[Symbol.iterator];
  return c ? c.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
  function c() {
    this.batch_ = null;
  }
  function l(a) {
    return a instanceof e ? a : new e(function(v, c) {
      v(a);
    });
  }
  if (a && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return a;
  }
  c.prototype.asyncExecute = function(a) {
    null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_());
    this.batch_.push(a);
    return this;
  };
  c.prototype.asyncExecuteBatch_ = function() {
    var a = this;
    this.asyncExecuteFunction(function() {
      a.executeBatch_();
    });
  };
  var g = $jscomp.global.setTimeout;
  c.prototype.asyncExecuteFunction = function(a) {
    g(a, 0);
  };
  c.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var a = this.batch_;
      this.batch_ = [];
      for (var c = 0; c < a.length; ++c) {
        var e = a[c];
        delete a[c];
        try {
          e();
        } catch (C) {
          this.asyncThrow_(C);
        }
      }
    }
    this.batch_ = null;
  };
  c.prototype.asyncThrow_ = function(a) {
    this.asyncExecuteFunction(function() {
      throw a;
    });
  };
  var e = function(a) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var c = this.createResolveAndReject_();
    try {
      a(c.resolve, c.reject);
    } catch (x) {
      c.reject(x);
    }
  };
  e.prototype.createResolveAndReject_ = function() {
    function a(a) {
      return function(v) {
        e || (e = !0, a.call(c, v));
      };
    }
    var c = this, e = !1;
    return {resolve:a(this.resolveTo_), reject:a(this.reject_)};
  };
  e.prototype.resolveTo_ = function(a) {
    if (a === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof e) {
        this.settleSameAsPromise_(a);
      } else {
        a: {
          switch(typeof a) {
            case "object":
              var c = null != a;
              break a;
            case "function":
              c = !0;
              break a;
            default:
              c = !1;
          }
        }
        c ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a);
      }
    }
  };
  e.prototype.resolveToNonPromiseObj_ = function(a) {
    var c = void 0;
    try {
      c = a.then;
    } catch (x) {
      this.reject_(x);
      return;
    }
    "function" == typeof c ? this.settleSameAsThenable_(c, a) : this.fulfill_(a);
  };
  e.prototype.reject_ = function(a) {
    this.settle_(2, a);
  };
  e.prototype.fulfill_ = function(a) {
    this.settle_(1, a);
  };
  e.prototype.settle_ = function(a, c) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + a + ", " + c | "): Promise already settled in state" + this.state_);
    }
    this.state_ = a;
    this.result_ = c;
    this.executeOnSettledCallbacks_();
  };
  e.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var a = this.onSettledCallbacks_, c = 0; c < a.length; ++c) {
        a[c].call(), a[c] = null;
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var A = new c;
  e.prototype.settleSameAsPromise_ = function(a) {
    var c = this.createResolveAndReject_();
    a.callWhenSettled_(c.resolve, c.reject);
  };
  e.prototype.settleSameAsThenable_ = function(a, c) {
    var e = this.createResolveAndReject_();
    try {
      a.call(c, e.resolve, e.reject);
    } catch (C) {
      e.reject(C);
    }
  };
  e.prototype.then = function(a, c) {
    function g(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          l(a(b));
        } catch (d) {
          v(d);
        }
      } : b;
    }
    var l, v, A = new e(function(a, b) {
      l = a;
      v = b;
    });
    this.callWhenSettled_(g(a, l), g(c, v));
    return A;
  };
  e.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  e.prototype.callWhenSettled_ = function(a, c) {
    function e() {
      switch(g.state_) {
        case 1:
          a(g.result_);
          break;
        case 2:
          c(g.result_);
          break;
        default:
          throw Error("Unexpected state: " + g.state_);
      }
    }
    var g = this;
    null == this.onSettledCallbacks_ ? A.asyncExecute(e) : this.onSettledCallbacks_.push(function() {
      A.asyncExecute(e);
    });
  };
  e.resolve = l;
  e.reject = function(a) {
    return new e(function(c, e) {
      e(a);
    });
  };
  e.race = function(a) {
    return new e(function(c, e) {
      for (var g = $jscomp.makeIterator(a), v = g.next(); !v.done; v = g.next()) {
        l(v.value).callWhenSettled_(c, e);
      }
    });
  };
  e.all = function(a) {
    var c = $jscomp.makeIterator(a), g = c.next();
    return g.done ? l([]) : new e(function(a, e) {
      function v(k) {
        return function(d) {
          h[k] = d;
          b--;
          0 == b && a(h);
        };
      }
      var h = [], b = 0;
      do {
        h.push(void 0), b++, l(g.value).callWhenSettled_(v(h.length - 1), e), g = c.next();
      } while (!g.done);
    });
  };
  return e;
}, "es6", "es3");
$jscomp.owns = function(a, c) {
  return Object.prototype.hasOwnProperty.call(a, c);
};
$jscomp.polyfill("Object.assign", function(a) {
  return a ? a : function(a, l) {
    for (var c = 1; c < arguments.length; c++) {
      var e = arguments[c];
      if (e) {
        for (var A in e) {
          $jscomp.owns(e, A) && (a[A] = e[A]);
        }
      }
    }
    return a;
  };
}, "es6", "es3");
var stringify = function(a) {
  return Object.keys(a).map(function(c) {
    return encodeURIComponent(c) + "=" + encodeURIComponent(a[c]);
  }).join("&");
}, uuid = function() {
  var a = "", c;
  for (c = 0; 32 > c; c++) {
    var l = 16 * Math.random() | 0;
    if (8 == c || 12 == c || 16 == c || 20 == c) {
      a += "-";
    }
    a += (12 == c ? 4 : 16 == c ? l & 3 | 8 : l).toString(16);
  }
  return a;
};
function getManifest() {
  return chrome.runtime.getManifest ? chrome.runtime.getManifest() : chrome.app && chrome.app.getDetails ? chrome.app.getDetails() : !1;
}
var storageGet = function(a, c) {
  c = void 0 === c ? "local" : c;
  return new Promise(function(l) {
    return chrome.storage[c].get(a, l);
  });
}, storageSet = function(a, c) {
  c = void 0 === c ? "local" : c;
  return new Promise(function(l) {
    return chrome.storage[c].set(a, l);
  });
}, getNow = function() {
  return parseInt(Date.now() / 1000);
}, getUuid = function() {
  return storageGet("uuid").then(function(a) {
    if (a.uuid) {
      return a.uuid;
    }
    a.uuid = uuid();
    return storageSet(a).then(function() {
      return a.uuid;
    });
  });
}, track = function(a) {
  return getUuid().then(function(c) {
    var l = getManifest();
    l && (l = l.version);
    c = {v:1, ul:navigator.language, tid:"UA-127320526-1", cid:c, an:"frigate ext", aid:"frigate CDN", av:l, cd1:1 * ls.get("on")};
    return Object.assign({}, c, a);
  }).then(function(a) {
    return fetch("https://www.google-analytics.com/collect", {method:"POST", headers:{"Content-Type":" application/x-www-form-urlencoded"}, body:stringify(a)}).then(function(a) {
      if (!a.ok) {
        throw Error("Track error: " + a.status + ": " + a.statusText);
      }
    });
  });
}, Tracker = function() {
};
Tracker.prototype.init = function() {
  storageGet("initTimeout").then(function(a) {
    if (!(a.initTimeout > getNow())) {
      return storageSet({initTimeout:getNow() + 300}).then(function() {
        return track({t:"screenview", cd:"init"}).then(function() {
          return storageSet({initTimeout:getNow() + 86400});
        }, function(a) {
          console.error("init error", a);
        });
      });
    }
  });
};
Tracker.prototype.track = function(a) {
  track(a).catch(function(a) {
    console.error("track error", a);
  });
};
var tracker = new Tracker;
tracker.init();
setInterval(function() {
  tracker.init();
  return !0;
}, 3600000);
SIM_NS = function() {
  var a = function() {
    var a = function(a) {
      if (!window.localStorage.wtr || a) {
        window.localStorage.wtr = JSON.stringify({});
      }
    }, c = function() {
      return JSON.parse(window.localStorage.wtr);
    };
    a();
    return {setItem:function(a, e) {
      var g = c();
      g[a] = e;
      window.localStorage.wtr = JSON.stringify(g);
    }, getItem:function(a) {
      return void 0 === c()[a] ? null : c()[a];
    }, removeItem:function(a) {
      var e = c();
      delete e[a];
      window.localStorage.wtr = JSON.stringify(e);
    }, clear:function() {
      a(!0);
    }, remove:function() {
      window.localStorage.removeItem("wtr");
    }, get Storage() {
      return c();
    }};
  }();
  (function() {
    var c = ["src", "src_adv", "install_time", "userid"], e = function() {
      if (!0 !== a.getItem("cleaned_up")) {
        if (window.localStorage.hasOwnProperty("userid") && 15 === window.localStorage.userid.length && window.localStorage.hasOwnProperty("install_time")) {
          var e = !1;
          for (var g in window.localStorage) {
            if (g.match(/^[234][0-9]{3}\.server$/)) {
              e = !0;
              break;
            }
          }
        } else {
          e = !1;
        }
        if (e) {
          a: {
            for (l in c) {
              if (g = c[l], e = window.localStorage[g]) {
                if (g = a.getItem(g), e && !g) {
                  var l = !1;
                  break a;
                }
              }
            }
            l = !0;
          }
          if (l) {
            for (var x in c) {
              var C = c[x];
              window.localStorage[C] && window.localStorage.removeItem(C);
            }
            for (var D in window.localStorage) {
              D.match(/^[34][0-9]{3}\.server$/) && window.localStorage.removeItem(D);
            }
            a.setItem("cleaned_up", !0);
          } else {
            for (C in c) {
              x = c[C], (D = window.localStorage[x]) && a.setItem(x, D);
            }
          }
        }
      }
    };
    e();
    return {clean:e};
  })();
  var c = function() {
    var c = {_source:null, _default_source:"814", _url_lb:"https://frigateblocklist.com/settings", _DEBUG_MODE:!1, getSourceId:function() {
      try {
        if (null == this._source) {
          var b = a.getItem("src");
          this._source = b ? b : this._default_source;
        }
        return this._source;
      } catch (d) {
        return v.SEVERE("8877", d), this._default_source;
      }
    }}, e = {setImpl:function(b, d) {
      a.setItem(b, d);
    }, getImpl:function(b) {
      return a.getItem(b);
    }, removeImpl:function(b) {
      a.removeItem(b);
    }, clearImpl:function() {
      a.clear();
    }}, l = {postImpl:function(b, d, a, c, m) {
      var f = new XMLHttpRequest;
      f.open("POST", b, !0);
      f.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      f.onreadystatechange = function() {
        4 == f.readyState && (200 == f.status ? c(JSON.parse(f.responseText)) : m(f));
      };
      f.send(a);
    }, getImpl:function(b, d, a, c) {
      var f = new XMLHttpRequest;
      f.open("GET", b, !0);
      f.onreadystatechange = function() {
        4 == f.readyState && (200 == f.status ? a(JSON.parse(f.responseText)) : c(f));
      };
      f.send(null);
    }}, v = {_counter:0, logImpl:function(a, d) {
      if (c._DEBUG_MODE) {
        try {
          var f = ++this._counter + "> " + this.getNow() + ", " + a + ", " + d;
          "chrome" != b.browser.getName() || "ERROR" != a && "SEVERE" != a ? "chrome" == b.browser.getName() && "HIGHLIGHT" == a ? console.log("%c" + f, "color: blue;a:link{color: blue;};a:active{color: blue;}") : console.log(f) : console.error(f);
        } catch (p) {
        }
      }
    }, HT:function(a) {
      this.logImpl("HIGHLIGHT", a);
    }, INFO:function(a) {
      this.logImpl("INFO", a);
    }, ERROR:function(a) {
      this.logImpl("ERROR", a);
    }, SEVERE:function(a, d) {
      this.logImpl("SEVERE", a + " Exception: " + d.message);
    }, SEVERE2:function(a) {
      this.logImpl("SEVERE", a);
    }, pad:function(a, d) {
      for (a += ""; a.length < d;) {
        a = "0" + a;
      }
      return a;
    }, getNow:function() {
      try {
        var a = new Date, d = a.getDate() + "/" + (a.getMonth() + 1) + "/" + a.getFullYear(), b = this.pad(a.getHours(), 2) + ":" + this.pad(a.getMinutes(), 2) + ":" + this.pad(a.getSeconds(), 2) + "." + this.pad(a.getMilliseconds(), 3);
        return d + " " + b;
      } catch (p) {
        return "";
      }
    }, addConsoleHelper:function() {
      c._DEBUG_MODE && chrome.runtime.onMessage.addListener(function(a, d, b) {
        void 0 != a.console_log_message && h.INFO("FROM_CONTENT_PAGE : message = [" + a.console_log_message + "]" + (d.tab ? ", from a content script of url : = [" + d.tab.url + "]" : ", from the extension."));
      });
    }, testLogFromContentPage:function(a) {
      var d = function() {
        try {
          chrome.runtime.sendMessage({console_log_message:"message from content page"}, function(a) {
          });
        } catch (f) {
          alert(f);
        }
      }.toString();
      d = d.slice(d.indexOf("{") + 1, d.lastIndexOf("}"));
      chrome.runtime.lastError || chrome.tabs.executeScript(a, {code:d}, function(a) {
        chrome.runtime.lastError || h.INFO("executeScript, result = " + a);
      });
    }}, I = {_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode:function(a) {
      var d = "", b = 0;
      for (a = this._utf8_encode(a); b < a.length;) {
        var c = a.charCodeAt(b++);
        var m = a.charCodeAt(b++);
        var k = a.charCodeAt(b++);
        var e = c >> 2;
        c = (c & 3) << 4 | m >> 4;
        var g = (m & 15) << 2 | k >> 6;
        var h = k & 63;
        isNaN(m) ? g = h = 64 : isNaN(k) && (h = 64);
        d = d + this._keyStr.charAt(e) + this._keyStr.charAt(c) + this._keyStr.charAt(g) + this._keyStr.charAt(h);
      }
      return d;
    }, decode:function(a) {
      var b = "", f = 0;
      for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); f < a.length;) {
        var c = this._keyStr.indexOf(a.charAt(f++));
        var m = this._keyStr.indexOf(a.charAt(f++));
        var k = this._keyStr.indexOf(a.charAt(f++));
        var e = this._keyStr.indexOf(a.charAt(f++));
        c = c << 2 | m >> 4;
        m = (m & 15) << 4 | k >> 2;
        var g = (k & 3) << 6 | e;
        b += String.fromCharCode(c);
        64 != k && (b += String.fromCharCode(m));
        64 != e && (b += String.fromCharCode(g));
      }
      return b = this._utf8_decode(b);
    }, _utf8_encode:function(a) {
      a = a.replace(/\r\n/g, "\n");
      for (var b = "", f = 0; f < a.length; f++) {
        var c = a.charCodeAt(f);
        128 > c ? b += String.fromCharCode(c) : (127 < c && 2048 > c ? b += String.fromCharCode(c >> 6 | 192) : (b += String.fromCharCode(c >> 12 | 224), b += String.fromCharCode(c >> 6 & 63 | 128)), b += String.fromCharCode(c & 63 | 128));
      }
      return b;
    }, _utf8_decode:function(a) {
      for (var b = "", f = 0, c, m, e; f < a.length;) {
        c = a.charCodeAt(f), 128 > c ? (b += String.fromCharCode(c), f++) : 191 < c && 224 > c ? (m = a.charCodeAt(f + 1), b += String.fromCharCode((c & 31) << 6 | m & 63), f += 2) : (m = a.charCodeAt(f + 1), e = a.charCodeAt(f + 2), b += String.fromCharCode((c & 15) << 12 | (m & 63) << 6 | e & 63), f += 3);
      }
      return b;
    }};
    "object" !== typeof JSON && (JSON = {});
    (function() {
      function a(a) {
        return 10 > a ? "0" + a : a;
      }
      function b(a) {
        m.lastIndex = 0;
        return m.test(a) ? '"' + a.replace(m, function(a) {
          var b = g[a];
          return "string" === typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + a + '"';
      }
      function c(a, d) {
        var f = e, n = d[a];
        n && "object" === typeof n && "function" === typeof n.toJSON && (n = n.toJSON(a));
        "function" === typeof h && (n = h.call(d, a, n));
        switch(typeof n) {
          case "string":
            return b(n);
          case "number":
            return isFinite(n) ? String(n) : "null";
          case "boolean":
          case "null":
            return String(n);
          case "object":
            if (!n) {
              return "null";
            }
            e += y;
            var p = [];
            if ("[object Array]" === Object.prototype.toString.apply(n)) {
              var m = n.length;
              for (a = 0; a < m; a += 1) {
                p[a] = c(a, n) || "null";
              }
              d = 0 === p.length ? "[]" : e ? "[\n" + e + p.join(",\n" + e) + "\n" + f + "]" : "[" + p.join(",") + "]";
              e = f;
              return d;
            }
            if (h && "object" === typeof h) {
              for (m = h.length, a = 0; a < m; a += 1) {
                if ("string" === typeof h[a]) {
                  var k = h[a];
                  (d = c(k, n)) && p.push(b(k) + (e ? ": " : ":") + d);
                }
              }
            } else {
              for (k in n) {
                Object.prototype.hasOwnProperty.call(n, k) && (d = c(k, n)) && p.push(b(k) + (e ? ": " : ":") + d);
              }
            }
            d = 0 === p.length ? "{}" : e ? "{\n" + e + p.join(",\n" + e) + "\n" + f + "}" : "{" + p.join(",") + "}";
            e = f;
            return d;
        }
      }
      "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null;
      }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf();
      });
      var p = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, m = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e, y, g = {"\b":"\\b", "\t":"\\t", "\n":"\\n", "\f":"\\f", "\r":"\\r", '"':'\\"', "\\":"\\\\"}, h;
      "function" !== typeof JSON.stringify && (JSON.stringify = function(a, b, d) {
        var f;
        y = e = "";
        if ("number" === typeof d) {
          for (f = 0; f < d; f += 1) {
            y += " ";
          }
        } else {
          "string" === typeof d && (y = d);
        }
        if ((h = b) && "function" !== typeof b && ("object" !== typeof b || "number" !== typeof b.length)) {
          throw Error("JSON.stringify");
        }
        return c("", {"":a});
      });
      "function" !== typeof JSON.parse && (JSON.parse = function(a, b) {
        function d(a, c) {
          var f, p = a[c];
          if (p && "object" === typeof p) {
            for (f in p) {
              if (Object.prototype.hasOwnProperty.call(p, f)) {
                var n = d(p, f);
                void 0 !== n ? p[f] = n : delete p[f];
              }
            }
          }
          return b.call(a, c, p);
        }
        a = String(a);
        p.lastIndex = 0;
        p.test(a) && (a = a.replace(p, function(a) {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }));
        if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
          return a = eval("(" + a + ")"), "function" === typeof b ? d({"":a}, "") : a;
        }
        throw new SyntaxError("JSON.parse");
      });
    })();
    var x = {_sessionid:void 0, getSessionId:function() {
      "undefined" == typeof this._sessionid && (this._sessionid = b.createRandomNumber());
      return this._sessionid;
    }}, C = function() {
      function a(a, b, c) {
        h.HT("tabs_onUpdated, tabId = " + a + ", changeInfo.status = " + b.status + ", tab = " + c.url);
        b && b.status && "complete" == b.status && d(c, b.status);
      }
      function d(a, d) {
        try {
          if (0 != b.isWebUrl(a.url)) {
            var c = function() {
              try {
                var a = "";
                try {
                  a = document.doctype.name;
                } catch (K) {
                }
                chrome.extension.sendRequest({docType:a, tab_id:__TABID__PLACEHOLDER__, tab_url_:__TABURL__PLACEHOLDER__, change_status_:__CHANGE_STATUS__PLACEHOLDER__, fromTMV_:__TMV__PLACEHOLDER__, ref:document.referrer, messageId_:55557777}, function(a) {
                });
              } catch (K) {
              }
            }.toString();
            c = c.replace("__TABID__PLACEHOLDER__", a.id);
            var f = I.encode(a.url);
            c = c.replace("__TABURL__PLACEHOLDER__", "'" + f + "'");
            c = c.replace("__CHANGE_STATUS__PLACEHOLDER__", "'" + d + "'");
            c = c.replace("__TMV__PLACEHOLDER__", "'3015'");
            var p = c.slice(c.indexOf("{") + 1, c.lastIndexOf("}"));
            chrome.runtime.lastError || chrome.tabs.executeScript(a.id, {code:p}, function(a) {
            });
          }
        } catch (H) {
          console.error("ERR 8000: " + H);
        }
      }
      function f(a) {
        try {
          var b = void 0, d = void 0;
          (b = y[a]) && "" != b ? d = a : F && a != F ? (d = F, h.INFO("prevTabId flow A")) : u && a != u ? (d = u, h.INFO("prevTabId flow B")) : d = a;
          a = "";
          d && y[d] && (a = y[d]);
          return a;
        } catch (Z) {
          return console.error("ERROR 8001: " + Z), "";
        }
      }
      function p(a, d, p) {
        try {
          var e = b.getExtensionId();
          if (d && d.id == e) {
            var m = a.fromTMV_;
            if (m && "3015" == m) {
              if (a.messageId_ && 55557777 == a.messageId_) {
                var k = a.tab_id, n = f(k);
                if ("" != b.db_type.get("server") && "undefined" != b.db_type.get("server")) {
                  var w = a.ref, g = a.docType, t = I.decode(a.tab_url_), q = a.change_status_;
                  h.HT("extension_onRequest, url = [" + t + "] ,ref = [" + w + "],  computePrev2 = [" + n + "]");
                  a = !1;
                  var r = y[k];
                  r && "" != r || (a = !0);
                  if (a) {
                    var B = RegExp("(http|https)://(.*.|)google..*/url?.*", void 0), S = B.test(t);
                    B = null;
                    if (S) {
                      h.HT("extension_onRequest: Skipped redirect = " + t);
                      return;
                    }
                  }
                  B = RegExp("(http|https)://(.*.|)google..*/aclk?.*", void 0);
                  S = B.test(t);
                  B = null;
                  if (S) {
                    h.HT("extension_onRequest: Skipped ppc redirect = " + t);
                  } else {
                    if ("html" != g && "" != g) {
                      y[k] = "", h.ERROR("ERROR 8000 ??");
                    } else {
                      if (y[k] = t, g = -1, M[k] && (g = Date.now() - M[k]), M[k] = Date.now(), 0 <= g && 100 > g && y[k] == t) {
                        h.ERROR("ERROR 8001 ?? Skipped, update_diff < 10, tab_url = " + t);
                      } else {
                        var J = z[k];
                        z[k] = q;
                        if (n == t && J != q) {
                          h.ERROR("ERROR 8002 ??");
                        } else {
                          if (null == n || 0 == n.length) {
                            n = l;
                          }
                          l = t;
                          var u = "s=" + c.getSourceId() + "&md=21&pid=" + b.db.get("userid") + "&sess=" + x.getSessionId() + "&q=" + encodeURIComponent(t) + "&prev=" + encodeURIComponent(n) + "&link=" + (w ? "1" : "0") + "&sub=chrome&hreferer=" + encodeURIComponent(w);
                          u += "&tmv=3015";
                          u = I.encode(I.encode(u));
                          u = "e=" + u;
                          var F = b.db_type.get("server") + "/related";
                          b.net.post(F, "json", u, function(a) {
                            h.INFO("Succeeded in posting data");
                            y[k] = t;
                          }, function(a) {
                            h.INFO("Failed to retrieve content. (HTTP Code:" + a.status + ")");
                            h.ERROR("ERROR 8004 ??");
                            y[k] = t;
                          });
                        }
                      }
                    }
                  }
                }
              } else {
                h.ERROR("messaged unknown, or undefined : request = " + a);
              }
            } else {
              m ? h.INFO("Message of other tmv = " + m) : h.ERROR("Message without fromTMV");
            }
          } else {
            h.ERROR("unknown sender = " + d.id);
          }
        } catch (P) {
          console.error("ERR 8002: " + P);
        }
      }
      function e(a) {
        try {
          h.INFO("tabs.onActivated  windowId = " + a.windowId + ", tabId = " + a.tabId), 0 <= a.tabId ? (u = F, F = a.tabId) : h.ERROR("tabs_onActivated, how to handle activeInfo.tabId <0  ?");
        } catch (w) {
          h.SEVERE("8834", w);
        }
      }
      function g(a, b) {
        chrome.tabs.get(a, function(a) {
          d(a);
        });
      }
      var y = [], l = "", M = [], z = [], u = !1, F = !1;
      this.start = function() {
        try {
          chrome.extension.onRequest.addListener(p), chrome.tabs.onUpdated.addListener(a), chrome.tabs.onActivated.addListener(e), chrome.tabs.onReplaced.addListener(g);
        } catch (n) {
          h.SEVERE("8835", n);
        }
      };
      this.dis = function() {
        try {
          chrome.extension.onRequest.removeListener(p), chrome.tabs.onUpdated.removeListener(a), chrome.tabs.onActivated.removeListener(e), chrome.tabs.onReplaced.removeListener(g);
        } catch (n) {
          h.SEVERE("8835", n);
        }
      };
    }, D = new function() {
      function a() {
        if (chrome.runtime.getManifest) {
          return chrome.runtime.getManifest();
        }
        if (chrome.app && chrome.app.getDetails) {
          return chrome.app.getDetails();
        }
        try {
          var a = new XMLHttpRequest;
          a.open("GET", chrome.extension.getURL("manifest.json"), !1);
          a.send(null);
          var b = JSON.parse(a.responseText).version;
        } catch (p) {
          b = void 0;
        }
        return b;
      }
      this.initOnceAfterInstall = function() {
        if (!b.db.get("userid")) {
          var a = b.createUserID();
          b.db.set("userid", a);
        }
        b.db.get("install_time") || (a = (new Date).getTime() / 1E3, b.db.set("install_time", a));
        b.db_type.get("tmv") || ((new Date).getTime(), b.db_type.set("tmv", "3015"));
      };
      this.start_lb = function() {
        try {
          h.HT("start_lb enter");
          this.initOnceAfterInstall();
          var d = c._url_lb, f = "s=" + c.getSourceId();
          f += "&ins=" + encodeURIComponent(b.db.get("install_time")) + "&ver=" + encodeURIComponent(a().version);
          d = d + "?" + f;
          b.net.get(d, "json", function(a) {
            h.INFO("Success to get lb");
            "undefined" != typeof a.Status ? "1" == a.Status ? "undefined" != typeof a.Endpoint ? b.db_type.set("server", a.Endpoint) : h.ERROR("Invalid lb response, no Endpoint or Midpoint") : (h.INFO("WARN: result.Status is not 1"), b.db_type.set("server", "")) : h.ERROR("Invalid lb response, no Status = " + a.Status);
          }, function(a) {
            h.ERROR("Failed to get lb, ,url = " + d + ", httpCode = " + a.status);
          });
          h.HT("start_lb leave");
          try {
            h.addConsoleHelper();
          } catch (p) {
            h.SEVERE("9071", p);
          }
          this.dt = new C;
          this.dt.start();
        } catch (p) {
          h.SEVERE("9001", p);
        }
      };
      this.dis_lb = function() {
        this.dt.dis();
      };
    }, G = !1, h = v;
    h.INFO("Hello");
    var b = {db:{_db:void 0, init:function() {
      void 0 == this._db && (this._db = e);
    }, set:function(a, b) {
      if ("string" != typeof a || "" == a) {
        throw Error("4002, Invalid param: key");
      }
      void 0 == this._db && this.init();
      this._db.setImpl(a, b);
    }, get:function(a) {
      if ("string" != typeof a || "" == a) {
        throw Error("4003, Invalid param: key");
      }
      void 0 == this._db && this.init();
      return this._db.getImpl(a);
    }, remove:function(a) {
      if ("string" != typeof a || "" == a) {
        throw Error("4004, Invalid param: key");
      }
      void 0 == this._db && this.init();
      this._db.removeImpl(a);
    }, clear:function() {
      void 0 == this._db && this.init();
      this._db.clearImpl();
    }}, browser:{getName:function() {
      return "undefined" !== typeof appAPI ? appAPI.browser.name : "chrome";
    }}, net:{_impl:void 0, init:function() {
      void 0 == this._impl && (this._impl = l);
    }, post:function(a, b, c, p, e) {
      if ("string" != typeof a || "" == a) {
        throw Error("4007, Invalid param: url_");
      }
      if ("string" != typeof b || "text" != b && "json" != b) {
        throw Error("4008, Invalid param: expectedResult_");
      }
      if ("string" != typeof c) {
        throw Error("4009, Invalid param: data_");
      }
      if ("function" != typeof p) {
        throw Error("4010, Invalid param: onSuccess_");
      }
      if ("function" != typeof e) {
        throw Error("4011, Invalid param: onError_");
      }
      void 0 == this._impl && this.init();
      this._impl.postImpl(a, b, c, p, e);
    }, get:function(a, b, c, p) {
      if ("string" != typeof a || "" == a) {
        throw Error("4012, Invalid param: url_");
      }
      if ("string" != typeof b || "text" != b && "json" != b) {
        throw Error("4013, Invalid param: expectedResult_");
      }
      if ("function" != typeof c) {
        throw Error("4014, Invalid param: onSuccess_");
      }
      if ("function" != typeof p) {
        throw Error("4015, Invalid param: onError_");
      }
      void 0 == this._impl && this.init();
      this._impl.getImpl(a, b, c, p);
    }}, db_type:{set:function(a, d) {
      b.db.set("sim_" + a, d);
    }, get:function(a) {
      return b.db.get("sim_" + a);
    }}, createRandomNumber:function() {
      return Math.floor(1E18 * Math.random());
    }, createRandomString:function(a) {
      for (var b = "", c = 0; c < a; c++) {
        b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 * Math.random()));
      }
      return b;
    }, createUserID:function() {
      return this.createRandomString(15);
    }, getSub:function() {
      return "undefined" !== typeof appAPI ? appAPI.appID || "" : "chrome";
    }, getExtensionId:function() {
      if ("undefined" !== typeof appAPI) {
        return appAPI.appID;
      }
      if ("chrome" == this.browser.getName()) {
        return "undefined" !== typeof chrome.runtime ? chrome.runtime.id : chrome.i18n.getMessage("@@extension_id");
      }
      throw Error("4016, not implemented");
    }, isWebUrl:function(a) {
      return a && 0 == a.indexOf("http") ? !0 : !1;
    }};
    return {start:function() {
      G || (D.start_lb(), G = !0);
    }, dis:function() {
      G && (D.dis_lb(), G = !1);
    }};
  }(), l = function() {
    var c = {_source:null, _default_source:"1814", _url_lb:"https://frigateblocklist.com/settings", _DEBUG_MODE:!1, getSourceId:function() {
      try {
        if (null == this._source) {
          var b = a.getItem("src");
          b ? a.getItem("src_adv") ? this._source = a.getItem("src_adv") : (b = "1" + b, a.setItem("src_adv", b), this._source = b) : this._source = this._default_source;
        }
        return this._source;
      } catch (f) {
        return v.SEVERE("8877", f), this._default_source;
      }
    }}, e = {setImpl:function(b, c) {
      a.setItem(b, c);
    }, getImpl:function(b) {
      return a.getItem(b);
    }, removeImpl:function(b) {
      a.removeItem(b);
    }, clearImpl:function() {
      a.clear();
    }}, l = {postImpl:function(a, b, c, e, t) {
      var d = new XMLHttpRequest;
      d.open("POST", a, !0);
      d.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      d.onreadystatechange = function() {
        4 == d.readyState && (200 == d.status ? e(JSON.parse(d.responseText)) : t(d));
      };
      d.send(c);
    }, getImpl:function(a, b, c, e) {
      var d = new XMLHttpRequest;
      d.open("GET", a, !0);
      d.onreadystatechange = function() {
        4 == d.readyState && (200 == d.status ? c(JSON.parse(d.responseText)) : e(d));
      };
      d.send(null);
    }}, v = {_counter:0, logImpl:function(a, b) {
      if (c._DEBUG_MODE) {
        try {
          var d = ++this._counter + "> " + this.getNow() + ", " + a + ", " + b;
          "chrome" != k.browser.getName() || "ERROR" != a && "SEVERE" != a ? "chrome" == k.browser.getName() && "HIGHLIGHT" == a ? console.log("%c" + d, "color: blue;a:link{color: blue;};a:active{color: blue;}") : console.log(d) : console.error(d);
        } catch (m) {
        }
      }
    }, HT:function(a) {
      this.logImpl("HIGHLIGHT", a);
    }, INFO:function(a) {
      this.logImpl("INFO", a);
    }, ERROR:function(a) {
      this.logImpl("ERROR", a);
    }, SEVERE:function(a, b) {
      this.logImpl("SEVERE", a + " Exception: " + b.message);
    }, SEVERE2:function(a) {
      this.logImpl("SEVERE", a);
    }, pad:function(a, b) {
      for (a += ""; a.length < b;) {
        a = "0" + a;
      }
      return a;
    }, getNow:function() {
      try {
        var a = new Date, b = a.getDate() + "/" + (a.getMonth() + 1) + "/" + a.getFullYear(), c = this.pad(a.getHours(), 2) + ":" + this.pad(a.getMinutes(), 2) + ":" + this.pad(a.getSeconds(), 2) + "." + this.pad(a.getMilliseconds(), 3);
        return b + " " + c;
      } catch (m) {
        return "";
      }
    }, addConsoleHelper:function() {
      c._DEBUG_MODE && chrome.runtime.onMessage.addListener(function(a, c, e) {
        void 0 != a.console_log_message && b.INFO("FROM_CONTENT_PAGE : message = [" + a.console_log_message + "]" + (c.tab ? ", from a content script of url : = [" + c.tab.url + "]" : ", from the extension."));
      });
    }, testLogFromContentPage:function(a) {
      var c = function() {
        try {
          chrome.runtime.sendMessage({console_log_message:"message from content page"}, function(a) {
          });
        } catch (p) {
          alert(p);
        }
      }.toString();
      c = c.slice(c.indexOf("{") + 1, c.lastIndexOf("}"));
      chrome.runtime.lastError || chrome.tabs.executeScript(a, {code:c}, function(a) {
        chrome.runtime.lastError || b.INFO("executeScript, result = " + a);
      });
    }}, I = {_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode:function(a) {
      var b = "", c = 0;
      for (a = this._utf8_encode(a); c < a.length;) {
        var d = a.charCodeAt(c++);
        var e = a.charCodeAt(c++);
        var g = a.charCodeAt(c++);
        var h = d >> 2;
        d = (d & 3) << 4 | e >> 4;
        var k = (e & 15) << 2 | g >> 6;
        var l = g & 63;
        isNaN(e) ? k = l = 64 : isNaN(g) && (l = 64);
        b = b + this._keyStr.charAt(h) + this._keyStr.charAt(d) + this._keyStr.charAt(k) + this._keyStr.charAt(l);
      }
      return b;
    }, decode:function(a) {
      var b = "", c = 0;
      for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < a.length;) {
        var d = this._keyStr.indexOf(a.charAt(c++));
        var e = this._keyStr.indexOf(a.charAt(c++));
        var g = this._keyStr.indexOf(a.charAt(c++));
        var h = this._keyStr.indexOf(a.charAt(c++));
        d = d << 2 | e >> 4;
        e = (e & 15) << 4 | g >> 2;
        var k = (g & 3) << 6 | h;
        b += String.fromCharCode(d);
        64 != g && (b += String.fromCharCode(e));
        64 != h && (b += String.fromCharCode(k));
      }
      return b = this._utf8_decode(b);
    }, _utf8_encode:function(a) {
      a = a.replace(/\r\n/g, "\n");
      for (var b = "", c = 0; c < a.length; c++) {
        var d = a.charCodeAt(c);
        128 > d ? b += String.fromCharCode(d) : (127 < d && 2048 > d ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128)), b += String.fromCharCode(d & 63 | 128));
      }
      return b;
    }, _utf8_decode:function(a) {
      for (var b = "", c = 0, d, e, g; c < a.length;) {
        d = a.charCodeAt(c), 128 > d ? (b += String.fromCharCode(d), c++) : 191 < d && 224 > d ? (e = a.charCodeAt(c + 1), b += String.fromCharCode((d & 31) << 6 | e & 63), c += 2) : (e = a.charCodeAt(c + 1), g = a.charCodeAt(c + 2), b += String.fromCharCode((d & 15) << 12 | (e & 63) << 6 | g & 63), c += 3);
      }
      return b;
    }};
    "object" !== typeof JSON && (JSON = {});
    (function() {
      function a(a) {
        return 10 > a ? "0" + a : a;
      }
      function b(a) {
        g.lastIndex = 0;
        return g.test(a) ? '"' + a.replace(g, function(a) {
          var b = l[a];
          return "string" === typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + a + '"';
      }
      function c(a, d) {
        var e = h, f = d[a];
        f && "object" === typeof f && "function" === typeof f.toJSON && (f = f.toJSON(a));
        "function" === typeof z && (f = z.call(d, a, f));
        switch(typeof f) {
          case "string":
            return b(f);
          case "number":
            return isFinite(f) ? String(f) : "null";
          case "boolean":
          case "null":
            return String(f);
          case "object":
            if (!f) {
              return "null";
            }
            h += k;
            var g = [];
            if ("[object Array]" === Object.prototype.toString.apply(f)) {
              var p = f.length;
              for (a = 0; a < p; a += 1) {
                g[a] = c(a, f) || "null";
              }
              d = 0 === g.length ? "[]" : h ? "[\n" + h + g.join(",\n" + h) + "\n" + e + "]" : "[" + g.join(",") + "]";
              h = e;
              return d;
            }
            if (z && "object" === typeof z) {
              for (p = z.length, a = 0; a < p; a += 1) {
                if ("string" === typeof z[a]) {
                  var m = z[a];
                  (d = c(m, f)) && g.push(b(m) + (h ? ": " : ":") + d);
                }
              }
            } else {
              for (m in f) {
                Object.prototype.hasOwnProperty.call(f, m) && (d = c(m, f)) && g.push(b(m) + (h ? ": " : ":") + d);
              }
            }
            d = 0 === g.length ? "{}" : h ? "{\n" + h + g.join(",\n" + h) + "\n" + e + "}" : "{" + g.join(",") + "}";
            h = e;
            return d;
        }
      }
      "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null;
      }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf();
      });
      var e = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, g = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, h, k, l = {"\b":"\\b", "\t":"\\t", "\n":"\\n", "\f":"\\f", "\r":"\\r", '"':'\\"', "\\":"\\\\"}, z;
      "function" !== typeof JSON.stringify && (JSON.stringify = function(a, b, d) {
        var e;
        k = h = "";
        if ("number" === typeof d) {
          for (e = 0; e < d; e += 1) {
            k += " ";
          }
        } else {
          "string" === typeof d && (k = d);
        }
        if ((z = b) && "function" !== typeof b && ("object" !== typeof b || "number" !== typeof b.length)) {
          throw Error("JSON.stringify");
        }
        return c("", {"":a});
      });
      "function" !== typeof JSON.parse && (JSON.parse = function(a, b) {
        function c(a, d) {
          var e, f = a[d];
          if (f && "object" === typeof f) {
            for (e in f) {
              if (Object.prototype.hasOwnProperty.call(f, e)) {
                var g = c(f, e);
                void 0 !== g ? f[e] = g : delete f[e];
              }
            }
          }
          return b.call(a, d, f);
        }
        a = String(a);
        e.lastIndex = 0;
        e.test(a) && (a = a.replace(e, function(a) {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }));
        if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
          return a = eval("(" + a + ")"), "function" === typeof b ? c({"":a}, "") : a;
        }
        throw new SyntaxError("JSON.parse");
      });
    })();
    var x = {_sessionid:void 0, getSessionId:function() {
      "undefined" == typeof this._sessionid && (this._sessionid = k.createRandomNumber());
      return this._sessionid;
    }}, C = function() {
      function a(a) {
        var b = "", c;
        for (c in a) {
          a.hasOwnProperty(c) && "" !== a[c] && (b += c + "=" + a[c] + "&");
        }
        return b.substring(0, b.length - 1);
      }
      function e(d, e, f, g, h, p, m, l) {
        "undefined" == typeof f && (f = "");
        try {
          var n = {q:escape(d) || "", hreferer:escape(e) || "", prev:escape(f) || "", tmv:m || "", tmf:l || "", cr:escape(h) || "", crd:escape(p) || ""};
          d = "";
          for (e = 0; e < g.length; e++) {
            d += "&sr=" + escape(g[e]);
          }
          var t = x.getSessionId(), z = {s:c.getSourceId() || "", md:"21", pid:k.db.get("userid") || "", sess:t || "", sub:k.getSub()};
          var y = a(z);
          var u = a(n);
          return y + "&" + u + d;
        } catch (K) {
          return b.SEVERE("9004", K), "";
        }
      }
      function g(a) {
        try {
          return I.encode(a);
        } catch (y) {
          return b.SEVERE("7772 " + y), "";
        }
      }
      try {
        if (!h) {
          if ("undefined" == typeof k.db_type.get("server")) {
            throw Error("invalid server value");
          }
          var h = k.db_type.get("server");
          if (null == h) {
            throw Error("_endpoint is null");
          }
        }
      } catch (t) {
        throw b.SEVERE("8686", t), t;
      }
      this.get_endpoint = function() {
        return h;
      };
      this.send_data = function(a, c, d, f, p, m, l, n) {
        try {
          b.INFO("got here: send_data");
          var w = "" != h ? h + "/service2" : "";
          if ("" == w) {
            b.ERROR("request_url is empty");
          } else {
            var t = e(a, c, d, f, p, m, l, n), z = g(g(t));
            if ("" != z) {
              var y = "e=" + encodeURIComponent(z);
              k.net.post(w, "json", y, function(a) {
                b.INFO("Succeeded in posting data");
              }, function(a) {
                b.INFO("Failed to retrieve content. (HTTP Code:" + a + ")");
              });
            } else {
              b.ERROR("Error 7773");
            }
          }
        } catch (H) {
          b.SEVERE("7778", H);
        }
      };
    }, D = function() {
      function a(a, c, d, e, f, g, h) {
        try {
          b.HT("last bfr fiddler, going to submit: url = " + a + ", serverRedirects = " + e + ", clientRedirect = " + f), null == H && (H = new C), b.HT("_submitter._endpoint = " + H.get_endpoint()), "" == H.get_endpoint() ? b.INFO("_endpoint is empty => no submit") : (H.send_data(a, c, d, e, f, g, "4015", h), N = a);
        } catch (P) {
          b.SEVERE("5454", P);
        }
      }
      function c(a) {
        if (void 0 != a && 0 <= a) {
          return w[a]._arrCommittedNavigations.length;
        }
        throw Error("inavlid tabId");
      }
      function e(a, c, d, e, f, g) {
        try {
          if (0 != u(c)) {
            var q = JSON.stringify({_url:c, _prev:d, _arrServerRedirectUrls:e, _clientRedirectUrl:f, _tmf:g}), r = function() {
              try {
                chrome.extension.sendRequest({params_:__JSON__PLACEHOLDER__, tabId_:__TABID__PLACEHOLDER__, fromTMV_:__TMV__PLACEHOLDER__, messageId_:55558888, referrer_:document.referrer, location_:document.location}, function(a) {
                });
              } catch (W) {
              }
            }.toString();
            r = r.replace("__JSON__PLACEHOLDER__", q);
            r = r.replace("__TABID__PLACEHOLDER__", a);
            r = r.replace("__TMV__PLACEHOLDER__", "'4015'");
            var h = r.slice(r.indexOf("{") + 1, r.lastIndexOf("}"));
            chrome.runtime.lastError || chrome.tabs.executeScript(a, {code:h}, function(a) {
              chrome.runtime.lastError || b.INFO("executeScript, result = " + a);
            });
          }
        } catch (W) {
          b.SEVERE("2007", W);
        }
      }
      function g(c, d, f) {
        try {
          var q = "", r = "", g = "", h = "", p = "";
          try {
            if (d && 0 <= d) {
              var B = w[d];
              B || b.ERROR("invalid oTabInfo");
            } else {
              b.ERROR("invalid tabId");
            }
          } catch (E) {
            b.SEVERE("5459", E);
          }
          try {
            B = w[d];
            a: {
              try {
                if (0 <= d) {
                  var k = w[d], l = k._arrRequestsIds.length, m = void 0;
                  if (0 == l) {
                    var t = n[d];
                    t && 0 <= t ? b.ERROR("TODOZ - need to compute data from sourceTabId. tabId = " + d + ", sourceTabId = " + t) : b.ERROR("_arrRequestsIds.length == 0 => how to handle it ?, tabId = " + d);
                  } else {
                    if (1 == l) {
                      m = 0;
                    } else {
                      for (var v = t = 0; v < l; v++) {
                        var y = k._arrRequestsIds[v], u = z(y);
                        null != u ? u._completedUrl == c && (m = v, t++) : b.ERROR("(is this error ?) getRequestInfo returned null for tempRequestId = " + y);
                      }
                      0 == t ? (b.ERROR("getRequestIdOfTabUrl: url not found"), m = void 0) : 1 != t && (b.ERROR("getRequestIdOfTabUrl: found > 1"), m = void 0);
                    }
                  }
                  if (void 0 != m) {
                    var x = k._arrRequestsIds[m];
                    break a;
                  }
                } else {
                  b.ERROR("invalid tabId");
                }
              } catch (E) {
                b.SEVERE("2001", E);
                x = null;
                break a;
              }
              x = void 0;
            }
            if (void 0 != x) {
              var A = z(x);
              if (A._completedUrl == c) {
                q = A.getRedirectUrls();
                r = A.getReferer();
                try {
                  var D = w[d];
                  y = u = m = l = k = void 0;
                  b: {
                    try {
                      if (void 0 != d && 0 <= d) {
                        var C = w[d], F = C._arrCommittedNavigations.length;
                        A = void 0;
                        for (v = t = 0; v < F; v++) {
                          C._arrCommittedNavigations[v]._url == c && (t++, A = v);
                        }
                        if (1 == t) {
                          u = A;
                          break b;
                        }
                        0 == t ? b.INFO("Not always error, for ajax its ok. error should be determined by caller. getIndexOfCommittedNavigation : found == 0") : 1 < t && b.ERROR("getIndexOfCommittedNavigation : found > 1");
                      } else {
                        b.ERROR("getIndexOfCommittedNavigation : Inavlid tabId");
                      }
                    } catch (E) {
                      b.SEVERE("2003", E);
                    }
                    u = void 0;
                  }
                  if (void 0 == u) {
                    b.ERROR("getIndexOfCommittedNavigation failed #1");
                  } else {
                    if (-1 < D._arrCommittedNavigations[u]._transitionQualifiers.indexOf("client_redirect")) {
                      if (0 < u) {
                        y = u - 1;
                        var H = D._arrCommittedNavigations[y];
                        l = H._url;
                        try {
                          F = C = 0;
                          try {
                            var M = D._arrRequestsIds.length;
                            for (u = 0; u < M; u++) {
                              var X = D._arrRequestsIds[u], T = z(X);
                              if (null != T) {
                                if (T._urlBeforeRequest == c) {
                                  F = T._timestampBeforeRequest;
                                  break;
                                }
                              } else {
                                b.ERROR("getRequestInfo return null for tempRequestId = " + X);
                              }
                            }
                          } catch (E) {
                            b.SEVERE("9023", E);
                          }
                          0 != F && (C = F - H._timeStamp, b.HT("durationOnCRSiteBeforeTheClientRedirect (crd) = " + C), m = C);
                        } catch (E) {
                          b.SEVERE("9024", E);
                        }
                      } else {
                        b.ERROR("client_redirect but no previous nav");
                      }
                    }
                  }
                  y && D._arrCommittedNavigations.splice(y, 1);
                  "undefined" != typeof l && (k = {}, k.url = l, k.duration = m);
                  var L = k;
                } catch (E) {
                  b.SEVERE("2005", E), L = void 0;
                }
                "undefind" != typeof L && null != L && ("undefined" != typeof L.url && (h = L.url), "undefined" != typeof L.duration && 0 != L.duration && (p = Math.round(L.duration)));
                B._arrRequestsIds.splice(0, 1);
                delete G[x];
              } else {
                b.ERROR("oRequestInfo._completedUrl == url, tabId = " + d + ", _completedUrl = " + A._completedUrl + ", url = " + c);
              }
            } else {
              b.ERROR("submit2, requestId is undefined, for url = " + c + ", tabId = " + d);
            }
          } catch (E) {
            b.SEVERE("5453", E);
          }
          try {
            B = "";
            x = void 0;
            var U = n[d];
            if (U && 0 <= U) {
              x = U;
            } else {
              var V = w[d];
              "undefined" == typeof V ? x = K : V._lastReportedUrl && "" != V._lastReportedUrl ? x = d : d != I ? (x = I, b.INFO("prevTabId flow A")) : d != K ? (x = K, b.INFO("prevTabId flow B")) : b.ERROR("Failed to find prevTabId");
            }
            var Y = w[x];
            Y ? B = Y._lastReportedUrl : null != O && 0 < O.length ? (b.INFO("****** ast_focused_url is " + O), B = O) : null != N && 0 < N.length ? (b.INFO("****** last_prev is " + N), B = N) : b.ERROR("failed to compute prev");
            g = B;
          } catch (E) {
            b.SEVERE("2008", E), g = "";
          }
          try {
            n[d] && delete n[d];
          } catch (E) {
            b.SEVERE("5457", E);
          }
          void 0 == r || "" == r ? e(d, c, g, q, h, f) : a(c, r, g, q, h, p, f);
        } catch (E) {
          b.SEVERE("5454", E);
        }
      }
      function h(a, b) {
        this._tab = a;
        this._fromOnCreateEvent = b;
        this._tabsOnUpdatedUrl = this._lastReportedUrl = "";
        this._marked = !1;
        this._oldTabId = void 0;
        this._arrRequestsIds = [];
        this._arrCommittedNavigations = [];
      }
      function l(a) {
        this._tabId = a;
        this._arrServerRedirectUrls = [];
        this._completedUrl = this._transitionQualifiers = this._referer = "";
        this._urlBeforeRequest = void 0;
        this._timestampBeforeRequest = 0;
        this.appendRedirectUrl = function(a) {
          this._arrServerRedirectUrls.push(a);
        };
        this.getRedirectUrls = function() {
          return this._arrServerRedirectUrls;
        };
        this.setReferer = function(a) {
          0 == this._referer.length ? this._referer = a : b.INFO("setReferer already have a value. old = " + this._referer + ", new = " + a);
        };
        this.getReferer = function() {
          return this._referer;
        };
        this.setUrlBeforeRequest = function(a, b) {
          this._urlBeforeRequest = a;
          this._timestampBeforeRequest = b;
        };
      }
      function v(a) {
        this._frameId = a.frameId;
        this._processId = a.processId;
        this._tabId = a.tabId;
        this._timeStamp = a.timeStamp;
        this._transitionQualifiers = a.transitionQualifiers;
        this._transitionType = a.transitionType;
        this._url = a.url;
        this._prevWhenCommited = void 0;
      }
      function x(a, c) {
        if (void 0 == a) {
          throw Error("addRequestInfo, requestId == undefined");
        }
        if (0 == G.hasOwnProperty(a)) {
          return G[a] = new l(c), b.INFO("_hashRequests.length = " + Object.keys(G).length), G[a];
        }
        throw Error("addRequestInfo, already exists, requestId = " + a);
      }
      function z(a) {
        if (void 0 == a) {
          throw Error("getRequestInfo, requestId == undefined");
        }
        return 0 == G.hasOwnProperty(a) ? null : G[a];
      }
      function u(a) {
        return a && 0 == a.indexOf("http") ? !0 : !1;
      }
      function F(a, c) {
        b.INFO("updateActiveUrl : got here");
        chrome.windows.getAll({populate:!0}, function(d) {
          var q = 0;
          a: for (; q < d.length; q++) {
            var e = d[q].id;
            if (e == a._focusedWindowId) {
              for (var f = D[e], r = 0; r < d[q].tabs.length; r++) {
                var g = d[q].tabs[r], h = g.id;
                g = g.url;
                if (h == f) {
                  u(g) ? (a._urlOfActiveTabInFocusedWindow = g, A[h] = g, b.INFO("updateActiveUrl : winId = " + e + ", tabId = " + h + ", url = " + g)) : b.INFO("updateActiveUrl : SKIPPED : winId = " + e + ", tabId = " + h + ", url = " + g);
                  break a;
                }
              }
            }
          }
          c && c();
        });
      }
      var n = {}, w = {}, D = {}, A = {}, G = {}, H = null, K = "", I = "", N = "", O = "";
      this.webRequest_onBeforeRequest = function(a) {
        try {
          var c = a.url, d = a.tabId, q = a.requestId, e = a.timeStamp;
          b.HT("webRequest.onBeforeRequest tabId = " + d + ",requestId = " + q + ", url = " + c);
          if (0 <= d) {
            a = null;
            a = z(q);
            null == a && (a = x(q, d));
            a.setUrlBeforeRequest(c, e);
            e = c = null;
            e = w[d];
            void 0 == e && (e = null);
            c = e;
            null == c && (b.HT("oTabInfo is null, added myself, tabId = " + d), c = new h(null, !1), w[d] = c);
            var f = c._arrRequestsIds.indexOf(q);
            -1 == f ? c._arrRequestsIds.push(q) : b.ERROR("requestId already exists in array: tabId = " + d + ", requestId = " + q + ", index = " + f + ", TODOZ maybe bcz of server redirect ?");
          } else {
            b.ERROR("TODOZ how to handle tabId of -1, which is for new tab ?");
          }
        } catch (R) {
          b.SEVERE("8836", R);
        }
      };
      this.webRequest_onSendHeaders = function(a) {
        try {
          var c = a.url, d = a.tabId, e = a.requestId;
          a: {
            try {
              for (var q = 0; q < a.requestHeaders.length; ++q) {
                if ("Referer" == a.requestHeaders[q].name) {
                  var f = a.requestHeaders[q].value;
                  break a;
                }
              }
            } catch (R) {
            }
            f = null;
          }
          null != f && void 0 != f ? 0 <= d ? (a = null, a = z(e), null == a && (a = x(e, d)), a.setReferer(f)) : b.ERROR("9002, tabId < 0 = " + d) : b.HT("webRequest.onSendHeaders, refererFromHeaders undfined or null : tabId = " + d + ",requestId = " + e + ", url= " + c);
        } catch (R) {
          b.SEVERE("8800", R);
        }
      };
      this.webRequest_onHeadersReceived = function(a) {
        try {
          b.INFO("webRequest.onHeadersReceived tabId = " + a.tabId + ",requestId = " + a.requestId + ", url = " + a.url + ", statusLine = " + a.statusLine);
        } catch (r) {
          b.SEVERE("8839", r);
        }
      };
      this.webRequest_onBeforeRedirect = function(a) {
        try {
          var c = a.url, d = a.tabId, e = a.requestId;
          a = null;
          a = z(e);
          null == a && (a = x(e, d));
          a.appendRedirectUrl(c);
          b.INFO("webRequest.onBeforeRedirect tabId = " + d + ",requestId = " + e + ", url = " + c);
        } catch (J) {
          b.SEVERE("8835", J);
        }
      };
      this.webRequest_onResponseStarted = function(a) {
        try {
          b.INFO("webRequest.onResponseStarted tabId = " + a.tabId + ",requestId = " + a.requestId + ", url = " + a.url);
        } catch (r) {
          b.SEVERE("8839", r);
        }
      };
      this.webRequest_onCompleted = function(a) {
        try {
          var c = a.url, d = a.tabId, e = a.requestId;
          b.INFO("webRequest.onCompleted tabId = " + d + ",requestId = " + e + ", url = " + c);
          var f = z(e);
          null == f && (f = x(e, d));
          f._completedUrl = c;
        } catch (Q) {
          b.SEVERE("8837", Q);
        }
      };
      this.webRequest_onErrorOccurred = function(a) {
        try {
          b.INFO("webRequest.onErrorOccurred tabId = " + a.tabId + ",requestId = " + a.requestId + ", url = " + a.url);
        } catch (r) {
          b.SEVERE("8896", r);
        }
      };
      this.webNavigation_onCreatedNavigationTarget = function(a) {
        try {
          if (void 0 != a) {
            var c = a.tabId;
            0 <= c && (void 0 == n[c] ? (n[c] = a.sourceTabId, b.HT("Added nav target: tabId = " + c + ", sourceTabId = " + a.sourceTabId)) : b.ERROR("_hashNavTargets[tabId] == undefined"));
          }
        } catch (B) {
          b.SEVERE("8997", B);
        }
      };
      this.webNavigation_onBeforeNavigate = function(a) {
        try {
          void 0 != a && 0 == a.frameId && (0 <= a.tabId ? F(this, null) : b.ERROR("webNavigation_onBeforeNavigate : how to handle tabId < 0 ? "));
        } catch (r) {
          b.SEVERE("8897", r);
        }
      };
      this.webNavigation_onCommitted = function(a) {
        try {
          if (void 0 != a && 0 == a.frameId) {
            var c = a.tabId;
            if (0 <= c) {
              var d = w[c];
              if (d) {
                var e = new v(a);
                e._prevWhenCommited = "";
                d._arrCommittedNavigations.push(e);
              } else {
                b.ERROR("webNavigation_onCommitted, oTabInfo is null, for tabId = " + c + ", url = " + a.url);
              }
            } else {
              b.ERROR("TODOZ - webNavigation_onCommitted, how to handle tabId < 0 (newtab) ? -> attach to processId ??");
            }
          }
        } catch (J) {
          b.SEVERE("8898", J);
        }
      };
      this.webNavigation_onDOMContentLoaded = function(a) {
      };
      this.webNavigation_onCompleted = function(a) {
        try {
          if (void 0 != a && 0 == a.frameId) {
            var c = a.tabId;
            if (0 <= c) {
              var d = w[c];
              if (d) {
                var e = d._lastReportedUrl;
                1 == d._marked ? a.url != e ? b.HT("CCCC 3, sumbit = " + a.url + " , (lastReportedUrl = " + e + ")") : b.HT("CCCC 4, already sumbitted = " + a.url + " , (lastReportedUrl = " + e + ")") : (window.setTimeout(function(a) {
                  try {
                    b.HT("TIMER, tabId_ =  " + a);
                  } catch (Q) {
                  }
                }, 5E3, c), b.HT("XZXZXZ  IMHERE : pre-loaded ford.com arrives here... TOODZ ? webNavigation_onCompleted : add to popups/boxes = " + a.url + " , (_tabsOnUpdatedUrl = " + d._tabsOnUpdatedUrl + ")"));
              } else {
                b.ERROR("webNavigation_onCompleted, oTabInfo null/undefined for tabId = " + c + ", url = " + a.url);
              }
            } else {
              -1 == c ? b.HT("webNavigation_onCompleted, TODOZ - how to handle it ? tabId == -1 =>  new tab/ else ? = " + a.url) : b.ERROR("webNavigation_onCompleted, Invalid tabId = " + c);
            }
          }
        } catch (J) {
          b.SEVERE("8891", J);
        }
      };
      this.webNavigation_onErrorOccurred = function(a) {
        try {
          if (void 0 != a && 0 == a.frameId) {
            var c = a.tabId, d = a.url;
            if (u(d)) {
              if (0 <= c) {
                var e = w[c];
                d != e._lastReportedUrl ? (g(d, c, 3), e._lastReportedUrl = d) : b.HT("webNavigation_onErrorOccurred, already reported = " + d + ", tabId = " + c);
              } else {
                b.ERROR("webNavigation_onErrorOccurred, invalid tabId = " + c);
              }
            } else {
              b.HT("webNavigation_onErrorOccurred, skipped no-web url = " + d + ", tabId = " + c);
            }
          }
        } catch (J) {
          b.SEVERE("8893", J);
        }
      };
      this.webNavigation_onTabRep = function(a) {
      };
      this.webNavigation_onHistoryStateUpdated = function(a) {
      };
      this.windows_onFocusChanged = function(a) {
      };
      this.extension_onRequest = function(c, d, e) {
        try {
          var f = k.getExtensionId();
          if (d && d.id == f) {
            var g = c.fromTMV_;
            if (g && "4015" == g) {
              var h = c.messageId_;
              if (h && 55558888 == h) {
                b.INFO("extension_onRequest: received message");
                var q = c.params_._url, m = c.params_._prev, p = c.params_._arrServerRedirectUrls, l = c.params_._clientRedirectUrl, r = c.params_._tmf;
                if (q == c.location_.href) {
                  var n = c.referrer_;
                  n == q && (b.ERROR("train missed # 1?"), n = "");
                  n && "" != n && (r += ".1");
                } else {
                  b.ERROR("train missed # 2?"), n = "";
                }
                a(q, n, m, p, l, "", r);
              } else {
                b.ERROR("messaged unknown, or undefined : request = " + c);
              }
            } else {
              g ? b.INFO("Message of other tmv = " + g) : b.ERROR("Message without fromTMV");
            }
          } else {
            b.ERROR("unknown sender = " + d.id);
          }
        } catch (aa) {
          b.SEVERE("2020", aa);
        }
      };
      this.tabs_onCreated = function(a) {
        try {
          b.INFO("tabs.onCreated, tab.id = " + a.id);
          var c = new h(a, !0);
          w[a.id] = c;
          b.INFO("Count of tabs after onCreated = " + Object.keys(w).length);
        } catch (B) {
          b.SEVERE("8831", B);
        }
      };
      this.tabs_onActivated = function(a) {
        try {
          b.INFO("tabs.onActivated  windowId = " + a.windowId + ", tabId = " + a.tabId), D[a.windowId] = a.tabId, 0 <= a.tabId ? (K = I, I = a.tabId, chrome.tabs.get(a.tabId, function(a) {
            b.INFO("***** tabs.onActivated got tab");
            void 0 != a && u(a.url) && (b.INFO("***** tabs.onActivated got tab Inside..."), O = a.url);
          })) : b.ERROR("tabs_onActivated, how to handle activeInfo.tabId <0  ?"), b.INFO("tabs_onActivated, total count of active tabs (0 or 1, for each window) = " + Object.keys(D).length);
        } catch (r) {
          b.SEVERE("8834", r);
        }
      };
      this.tabs_onRemoved = function(a, c) {
        try {
          b.INFO("tabs.onRemoved, tabId = " + a), delete w[a], n[a] && delete n[a], b.INFO("Count of tabs after onRemoved = " + Object.keys(w).length);
        } catch (B) {
          b.SEVERE("8832", B);
        }
      };
      this.tabs_onReplaced = function(a, d) {
        try {
          if (0 <= a && 0 <= d) {
            var e = w[a], f = w[d];
            if (e && f) {
              var h = f._lastReportedUrl, m = void 0;
              if (0 < c(a)) {
                if (void 0 != a && 0 <= a) {
                  var k = w[a];
                  m = 0 < c(a) ? k._arrCommittedNavigations[0]._url : void 0;
                } else {
                  throw Error("inavlid tabId");
                }
              }
              b.HT("tabs.onReplaced, addedTabId = " + a + ", removedTabId = " + d + ", removedUrl = " + h + ", addedUrl = " + m);
              m != e._lastReportedUrl && (u(m) ? (A[d] && (A[a] = A[d], delete A[d]), e._lastReportedUrl = f._lastReportedUrl, g(m, a, 2), e._lastReportedUrl = m) : b.HT("skipped non web url = " + m + "tabId = " + a));
              delete w[d];
              e._oldTabId = d;
              n[d] && (n[a] = n[d], delete n[d]);
            } else {
              e || b.ERROR("tabs_onReplaced, oAddTabInfo udefined for addedTabId = " + a), f || b.ERROR("tabs_onReplaced, oRemoveTabInfo udefined for removedTabId = " + d);
            }
          } else {
            b.ERROR("webNavigation_onTabRep : addedTabId >= 0 && removedTabId >=0");
          }
        } catch (P) {
          b.SEVERE("8847", P);
        }
      };
      this.tabs_onUpdated = function(a, c, d) {
        try {
          if ("complete" == c.status) {
            var e = d.url;
            b.HT("tabs.onUpdated, status = " + c.status + ", tabId = " + a + ", url = " + e);
            var f = w[a];
            f || b.ERROR("oTabInfo null/undefined for tabId = " + a);
            u(e) ? (b.HT("tabs.onUpdated going to submit, tabId = " + a + ", url = " + e), g(e, a, 1), f && (f._lastReportedUrl = e), F(this, null)) : b.HT("skipped non-web url = " + e + ", tabId = " + a);
          }
        } catch (Q) {
          b.SEVERE("8833", Q);
        }
      };
      this.setListeners_webRequest = function(a) {
        try {
          if ("undefined" == typeof chrome.webRequest) {
            b.ERROR("permission missing: webRequest");
          } else {
            var c = {types:["main_frame"], urls:["<all_urls>"]};
            chrome.webRequest.onBeforeRequest[a](this.webRequest_onBeforeRequest, c);
            chrome.webRequest.onSendHeaders[a](this.webRequest_onSendHeaders, c, ["requestHeaders"]);
            chrome.webRequest.onHeadersReceived[a](this.webRequest_onHeadersReceived, c);
            chrome.webRequest.onBeforeRedirect[a](this.webRequest_onBeforeRedirect, c);
            chrome.webRequest.onResponseStarted[a](this.webRequest_onResponseStarted, c);
            chrome.webRequest.onCompleted[a](this.webRequest_onCompleted, c);
            chrome.webRequest.onErrorOccurred[a](this.webRequest_onErrorOccurred, c);
          }
        } catch (B) {
          b.SEVERE("8888", B);
        }
      };
      this.setListeners_webNavigation = function(a) {
        try {
          if ("undefined" == typeof chrome.webNavigation) {
            b.ERROR("permission missing: webNavigation");
          } else {
            if (chrome.webNavigation.onCreatedNavigationTarget) {
              chrome.webNavigation.onCreatedNavigationTarget[a](this.webNavigation_onCreatedNavigationTarget);
            } else {
              b.ERROR("chrome.webNavigation.onCreatedNavigationTarget undefined");
            }
            if (chrome.webNavigation.onBeforeNavigate) {
              chrome.webNavigation.onBeforeNavigate[a](this.webNavigation_onBeforeNavigate);
            } else {
              b.ERROR("chrome.webNavigation.onBeforeNavigate undefined");
            }
            if (chrome.webNavigation.onCommitted) {
              chrome.webNavigation.onCommitted[a](this.webNavigation_onCommitted);
            } else {
              b.ERROR("chrome.webNavigation.onCommitted undefined");
            }
            if (chrome.webNavigation.onDOMContentLoaded) {
              chrome.webNavigation.onDOMContentLoaded[a](this.webNavigation_onDOMContentLoaded);
            } else {
              b.ERROR("chrome.webNavigation.onDOMContentLoaded undefined");
            }
            if (chrome.webNavigation.onCompleted) {
              chrome.webNavigation.onCompleted[a](this.webNavigation_onCompleted);
            } else {
              b.ERROR("chrome.webNavigation.onCompleted undefined");
            }
            if (chrome.webNavigation.onErrorOccurred) {
              chrome.webNavigation.onErrorOccurred[a](this.webNavigation_onErrorOccurred);
            } else {
              b.ERROR("chrome.webNavigation.onErrorOccurred undefined");
            }
            if (chrome.webNavigation.onTabReplaced) {
              chrome.webNavigation.onTabReplaced[a](this.webNavigation_onTabRep);
            } else {
              b.ERROR("chrome.webNavigation.onTabReplaced undefined");
            }
            if (chrome.webNavigation.onHistoryStateUpdated) {
              chrome.webNavigation.onHistoryStateUpdated[a](this.webNavigation_onHistoryStateUpdated);
            } else {
              b.ERROR("chrome.webNavigation.onHistoryStateUpdated undefined");
            }
          }
        } catch (r) {
          b.SEVERE("8887", r);
        }
      };
      this.setListeners_tabs = function(a) {
        try {
          chrome.tabs.onCreated[a](this.tabs_onCreated), chrome.tabs.onRemoved[a](this.tabs_onRemoved), chrome.tabs.onUpdated[a](this.tabs_onUpdated), chrome.tabs.onActivated[a](this.tabs_onActivated), chrome.tabs.onReplaced[a](this.tabs_onReplaced);
        } catch (r) {
          b.SEVERE("8889", r);
        }
      };
      this.addListeners = function() {
        try {
          this.setListeners_webRequest("addListener"), this.setListeners_tabs("addListener"), this.setListeners_webNavigation("addListener"), chrome.windows.onFocusChanged.addListener(this.windows_onFocusChanged), chrome.extension.onRequest.addListener(this.extension_onRequest);
        } catch (q) {
          b.SEVERE("8844", q);
        }
      };
      this.removeListeners = function() {
        try {
          this.setListeners_webRequest("removeListener"), this.setListeners_tabs("removeListener"), this.setListeners_webNavigation("removeListener"), chrome.windows.onFocusChanged.removeListener(this.windows_onFocusChanged), chrome.extension.onRequest.removeListener(this.extension_onRequest);
        } catch (q) {
          b.SEVERE("8844", q);
        }
      };
      this.start = function() {
        try {
          b.INFO("bg start: got here"), this.addListeners();
        } catch (q) {
          b.SEVERE("8801", q);
        }
      };
      this.dis = function() {
        try {
          b.INFO("bg dis: got here"), this.removeListeners();
        } catch (q) {
          b.SEVERE("8801", q);
        }
      };
    }, G = new function() {
      function a() {
        if (chrome.runtime.getManifest) {
          return chrome.runtime.getManifest();
        }
        if (chrome.app && chrome.app.getDetails) {
          return chrome.app.getDetails();
        }
        try {
          var a = new XMLHttpRequest;
          a.open("GET", chrome.extension.getURL("manifest.json"), !1);
          a.send(null);
          var b = JSON.parse(a.responseText).version;
        } catch (m) {
          b = void 0;
        }
        return b;
      }
      this.initOnceAfterInstall = function() {
        if (!k.db.get("userid")) {
          var a = k.createUserID();
          k.db.set("userid", a);
        }
        k.db.get("install_time") || (a = (new Date).getTime() / 1E3, k.db.set("install_time", a));
        k.db_type.get("tmv") || ((new Date).getTime(), k.db_type.set("tmv", "4015"));
      };
      this.start_lb = function() {
        try {
          b.HT("start_lb enter");
          this.initOnceAfterInstall();
          var d = c._url_lb, e = "s=" + c.getSourceId();
          e += "&ins=" + encodeURIComponent(k.db.get("install_time")) + "&ver=" + encodeURIComponent(a().version);
          d = d + "?" + e;
          k.net.get(d, "json", function(a) {
            b.INFO("Success to get lb");
            "undefined" != typeof a.Status ? "1" == a.Status ? "undefined" != typeof a.Endpoint ? k.db_type.set("server", a.Endpoint) : b.ERROR("Invalid lb response, no Endpoint or Midpoint") : (b.INFO("WARN: result.Status is not 1"), k.db_type.set("server", "")) : b.ERROR("Invalid lb response, no Status = " + a.Status);
          }, function(a) {
            b.ERROR("Failed to get lb, ,url = " + d + ", httpCode = " + a.status);
          });
          b.HT("start_lb leave");
          try {
            b.addConsoleHelper();
          } catch (m) {
            b.SEVERE("9071", m);
          }
          this.dt = new D;
          this.dt.start();
        } catch (m) {
          b.SEVERE("9001", m);
        }
      };
      this.dis_lb = function() {
        this.dt.dis();
      };
    }, h = !1, b = v, k = {db:{_db:void 0, init:function() {
      void 0 == this._db && (this._db = e);
    }, set:function(a, b) {
      if ("string" != typeof a || "" == a) {
        throw Error("4002, Invalid param: key");
      }
      void 0 == this._db && this.init();
      this._db.setImpl(a, b);
    }, get:function(a) {
      if ("string" != typeof a || "" == a) {
        throw Error("4003, Invalid param: key");
      }
      void 0 == this._db && this.init();
      return this._db.getImpl(a);
    }, remove:function(a) {
      if ("string" != typeof a || "" == a) {
        throw Error("4004, Invalid param: key");
      }
      void 0 == this._db && this.init();
      this._db.removeImpl(a);
    }, clear:function() {
      void 0 == this._db && this.init();
      this._db.clearImpl();
    }}, browser:{getName:function() {
      return "undefined" !== typeof appAPI ? appAPI.browser.name : "chrome";
    }}, net:{_impl:void 0, init:function() {
      void 0 == this._impl && (this._impl = l);
    }, post:function(a, b, c, e, g) {
      if ("string" != typeof a || "" == a) {
        throw Error("4007, Invalid param: url_");
      }
      if ("string" != typeof b || "text" != b && "json" != b) {
        throw Error("4008, Invalid param: expectedResult_");
      }
      if ("string" != typeof c) {
        throw Error("4009, Invalid param: data_");
      }
      if ("function" != typeof e) {
        throw Error("4010, Invalid param: onSuccess_");
      }
      if ("function" != typeof g) {
        throw Error("4011, Invalid param: onError_");
      }
      void 0 == this._impl && this.init();
      this._impl.postImpl(a, b, c, e, g);
    }, get:function(a, b, c, e) {
      if ("string" != typeof a || "" == a) {
        throw Error("4012, Invalid param: url_");
      }
      if ("string" != typeof b || "text" != b && "json" != b) {
        throw Error("4013, Invalid param: expectedResult_");
      }
      if ("function" != typeof c) {
        throw Error("4014, Invalid param: onSuccess_");
      }
      if ("function" != typeof e) {
        throw Error("4015, Invalid param: onError_");
      }
      void 0 == this._impl && this.init();
      this._impl.getImpl(a, b, c, e);
    }}, db_type:{set:function(a, b) {
      k.db.set("adv_" + a, b);
    }, get:function(a) {
      return k.db.get("adv_" + a);
    }}, createRandomNumber:function() {
      return Math.floor(1E18 * Math.random());
    }, createRandomString:function(a) {
      for (var b = "", c = 0; c < a; c++) {
        b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 * Math.random()));
      }
      return b;
    }, createUserID:function() {
      if ("undefined" !== typeof appAPI) {
        return this.createRandomString(15);
      }
    }, getInstallerSourceId:function(a) {
      if ("undefined" !== typeof appAPI) {
        var b = appAPI.installer.getParams().source_id;
        return 0 != b ? b : a;
      }
      return a;
    }, getSub:function() {
      return "undefined" !== typeof appAPI ? appAPI.appID || "" : "chrome";
    }, getExtensionId:function() {
      if ("undefined" !== typeof appAPI) {
        return appAPI.appID;
      }
      if ("chrome" == this.browser.getName()) {
        return "undefined" !== typeof chrome.runtime ? chrome.runtime.id : chrome.i18n.getMessage("@@extension_id");
      }
      throw Error("4016, not implemented");
    }};
    return {start:function() {
      h || (G.start_lb(), h = !0);
    }, dis:function() {
      h && (G.dis_lb(), h = !1);
    }};
  }();
  return {get Storage() {
    return a.Storage;
  }, remove:a.remove, start:function() {
    c.start();
    l.start();
  }};
}();
SIM_NS.start();

