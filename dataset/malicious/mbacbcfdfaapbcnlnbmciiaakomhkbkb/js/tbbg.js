var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
  a != Array.prototype && a != Object.prototype && (a[c] = b.value);
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
  var b = 0, d = {next:function() {
    if (b < a.length) {
      var e = b++;
      return {value:c(e, a[e]), done:!1};
    }
    d.next = function() {
      return {done:!0, value:void 0};
    };
    return d.next();
  }};
  d[Symbol.iterator] = function() {
    return d;
  };
  return d;
};
$jscomp.polyfill = function(a, c, b, d) {
  if (c) {
    b = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in b || (b[e] = {});
      b = b[e];
    }
    a = a[a.length - 1];
    d = b[a];
    c = c(d);
    c != d && null != c && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("Array.prototype.keys", function(a) {
  return a ? a : function() {
    return $jscomp.iteratorFromArray(this, function(a) {
      return a;
    });
  };
}, "es6", "es3");
(function(a) {
  function c(d) {
    if (b[d]) {
      return b[d].exports;
    }
    var e = b[d] = {exports:{}, id:d, loaded:!1};
    a[d].call(e.exports, e, e.exports, c);
    e.loaded = !0;
    return e.exports;
  }
  var b = {};
  c.m = a;
  c.c = b;
  c.p = "";
  return c(0);
})([function(a, c, b) {
  (function(a) {
    (function() {
      var b = {id:"fg", useTemplates:!0};
      var d = function(a) {
        var b = a.aviaBar;
        b && "object" == typeof b || (b = a.aviaBar = {});
        Array.isArray(b.blackList) || (b.blackList = []);
        b.templates && "object" == typeof b.templates || (b.templates = {});
      }, c = function(a, b) {
        var d = null, c = function(a, c) {
          clearTimeout(d);
          b(a, c);
          b = null;
        };
        try {
          var e = a.url, g = a.method || "GET";
          g = g.toUpperCase();
          0 < a.timeout && (d = setTimeout(function() {
            c(Error("ETIMEDOUT"));
            f.abort();
          }, a.timeout));
          var f = new XMLHttpRequest;
          f.open(g, e, !0);
          f.onload = function() {
            try {
              if (!(200 <= f.status && 300 > f.status || 304 === f.status)) {
                throw Error(f.status + " " + f.statusText);
              }
              var b = f.responseText;
              a.json && (b = JSON.parse(b));
              c(null, b);
            } catch (n) {
              c(n);
            }
          };
          f.onerror = function() {
            c(Error(f.status + " " + f.statusText));
          };
          f.send();
        } catch (m) {
          c(m);
        }
      };
      a.onMessage(function(e, k) {
        if (e && e.action) {
          switch(e.action) {
            case "tbrGetInfo":
              k(b);
              break;
            case "tbrIsAllow":
              return a.storage.get("aviaBar", function(b) {
                d(b);
                if (b.aviaBar.removed) {
                  return k(!1);
                }
                var c = !0, h = b.aviaBar.blackList, g = null;
                h.some(function(a) {
                  if (a.hostname === e.hostname) {
                    return g = a, !0;
                  }
                });
                if (g) {
                  var f = parseInt(Date.now() / 1e3);
                  g.expire > f ? c = !1 : (f = h.indexOf(g), h.splice(f, 1), a.storage.set(b));
                }
                return k(c);
              }), !0;
            case "tbrCloseBar":
              a.storage.get("aviaBar", function(b) {
                d(b);
                var c = b.aviaBar.blackList, k = null;
                c.some(function(a) {
                  if (a.hostname === e.hostname) {
                    return k = a, !0;
                  }
                });
                if (!k) {
                  var g = parseInt(Date.now() / 1e3);
                  c.push({hostname:e.hostname, expire:g + 18e3});
                  a.storage.set(b);
                }
              });
              break;
            case "tbrGetTemplate":
              return a.storage.get("aviaBar", function(b) {
                d(b);
                var l = b.aviaBar.templates, h = l[e.id];
                h || (l[e.id] = h = {});
                var g = parseInt(Date.now() / 1e3);
                h.expire > g ? k(h.data) : (h.expire = g + 21600, c({url:"https://travelbar.tools/static/scheme/" + e.id + ".json", timeout:6e4, json:!0}, function(c, d) {
                  c || (h.expire = g + 43200, h.data = d, Object.keys(l).sort(function(a, b) {
                    return l[a].expire > l[b].expire ? -1 : 1;
                  }).slice(5).forEach(function(a) {
                    delete l[a];
                  }));
                  k(d);
                  a.storage.set(b);
                }));
              }), !0;
          }
        }
      });
      window.travelBar = {setRemovedState:function(b) {
        a.storage.get("aviaBar", function(c) {
          d(c);
          c.aviaBar.removed = !!b;
          return a.storage.set(c);
        });
      }};
    })();
  }).call(c, b(1));
}, function(a, c) {
  a.exports = {onMessage:function(a) {
    chrome.runtime.onMessage.addListener(function(b, c, k) {
      return a(b, k);
    });
  }, storage:{get:function(a, c) {
    if (chrome.storage) {
      return chrome.storage.local.get(a, c);
    }
    Array.isArray(a) || (a = [a]);
    var b = {};
    a.forEach(function(a) {
      var c = localStorage.getItem(a);
      if (c) {
        try {
          c = JSON.parse(c), b[a] = c;
        } catch (p) {
        }
      }
    });
    return c(b);
  }, set:function(a, c) {
    if (chrome.storage) {
      return chrome.storage.local.set(a, c);
    }
    Object.keys(a).forEach(function(c) {
      var b = a[c];
      void 0 !== b && (b = JSON.stringify(b), localStorage.setItem(c, b));
    });
    return c && c();
  }}};
}]);

