var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, e) {
  b != Array.prototype && b != Object.prototype && (b[c] = e.value);
};
$jscomp.getGlobal = function(b) {
  return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var b = 0;
  return function(c) {
    return $jscomp.SYMBOL_PREFIX + (c || "") + b++;
  };
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var b = $jscomp.global.Symbol.iterator;
  b || (b = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[b] && $jscomp.defineProperty(Array.prototype, b, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(b) {
  var c = 0;
  return $jscomp.iteratorPrototype(function() {
    return c < b.length ? {done:!1, value:b[c++]} : {done:!0};
  });
};
$jscomp.iteratorPrototype = function(b) {
  $jscomp.initSymbolIterator();
  b = {next:b};
  b[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return b;
};
$jscomp.iteratorFromArray = function(b, c) {
  $jscomp.initSymbolIterator();
  b instanceof String && (b += "");
  var e = 0, f = {next:function() {
    if (e < b.length) {
      var k = e++;
      return {value:c(k, b[k]), done:!1};
    }
    f.next = function() {
      return {done:!0, value:void 0};
    };
    return f.next();
  }};
  f[Symbol.iterator] = function() {
    return f;
  };
  return f;
};
$jscomp.polyfill = function(b, c, e, f) {
  if (c) {
    e = $jscomp.global;
    b = b.split(".");
    for (f = 0; f < b.length - 1; f++) {
      var k = b[f];
      k in e || (e[k] = {});
      e = e[k];
    }
    b = b[b.length - 1];
    f = e[b];
    c = c(f);
    c != f && null != c && $jscomp.defineProperty(e, b, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("Array.prototype.keys", function(b) {
  return b ? b : function() {
    return $jscomp.iteratorFromArray(this, function(b) {
      return b;
    });
  };
}, "es6", "es3");
var proxyHosts = {}, checkUrls = [], proxyHostsCl = [], lastLoadHosts = {}, blHosts = [], dataRep = [], timewait = 9E5, timewait2 = 19E3, timewait3 = -1, timewaitClSerial = 216E5, timewaitUpdateHost = 72E5, timewait407 = 3E4, rep = {}, num_tabs, first_api = "", upd407 = 0, isShowMess = {}, preazapret = null, presites = null, preurls = null, preproxy = null, ison = !0, first = !0, attempts = 6, startUrlIndex = 0, endUrlIndex = 1, extArr = ["org", "biz"], prDef = "", prDefCo = "", prDef2 = [["HTTPS uk11.friproxy.biz:443", 
"uk"], ["HTTPS fr11.friproxy.biz:443", "fr"]], pr2Def2 = ["SOCKS5 uk11.friproxy.biz:1080", "SOCKS5 fr11.friproxy.biz:1080"], prauth = ls.set("prauth"), prauth2 = ls.set("prauth2"), prauth3 = ls.set("prauth3"), prauth4 = ls.set("prauth4"), pr = "", prco = "", prip, openPr = !1, openPrNoNeed, limitText = "wait", pr2 = "", isProxyHosts = !1, isRep = !1, news = ls.get("news"), updateText = ls.get("updateText"), nameTestFile = "/frigate.", noalert = !1, noadv = ls.get("noadv"), rgetEtag = ls.get("rgetEtag"), 
timerUpdateHost = !1, md5api = "", uid = ls.get("uidkey"), clearcacheis = !0, serial = 0, serialRep = "0", startTime = Date.now(), timeClSerial = startTime + timewaitClSerial, detailsApp = chrome.app.getDetails(), idContMen = [], iscl = !0, proxyOffset = 0, tabUpdateAllArr = {}, timerCheckProxy, a = ls.get("a"), slink = ls.get("slink"), compres = ls.get("compres"), autoChangeProxyCount = 0, autoChangeProxyCountMax = 7, GlobalContentLength = 0, GlobalOriginalContentLength = 0, LenCount = 0, ContentLengthCounterStart = 
ls.get("ContentLengthCounterStart");
ContentLengthCounterStart || setContentLengthCounterStart();
var noAutoChangeProxy = ls.get("noAutoChangeProxy"), timeOutAuth = 0, proxyUpdate = 1, azapret = [], azaprethide = {}, ip = "", slowConnect = ls.get("slow");
slowConnect && setSlow();
var sov = 1, iid, token, trec = ls.get("trec", uid), tRecAllHosts = {};
isD = !0;
chrome.runtime.setUninstallURL("https://fri-gate.org/uninstall");
slink || (chrome.tabs.create({url:"/eula.html", active:!0}), ison = !1, ls.set("on", !1));
d2("friGate starting...");
uid ? "undefined" != typeof localStorage.version ? (localStorage.clear(), slink && (ison = !0, ls.set("on", !0))) : (first = !1, slink && (ison = ls.get("on"))) : (localStorage.clear(), uid = generatePW(), ls.set("uidkey", uid, !1), slink && (ison = !0, ls.set("on", !0)));
var lang = chrome.i18n.getMessage("@@ui_locale");
"ru" != lang && (lang = "en");
chrome.browserAction.setBadgeBackgroundColor({color:[55, 169, 224, 90]});
chrome.webRequest.onBeforeRequest.addListener(reqListenerAll, {urls:["<all_urls>"], types:["main_frame"]}, ["blocking"]);
chrome.idle.onStateChanged.addListener(function(b) {
  "active" == b && getSitesUrl(!1, function() {
  });
});
updateText && (updateText = l("messUpdate"));
genapi();
getTld();
noalertRead();
proxyRead();
loadhosts();
tRecPrepead(trec);
function setSlow() {
  globalTimeout = slowConnect ? 70E3 : 10E3;
}
"undefined" !== typeof sovetnik && sovetnik.setCheckFunction(function(b, c) {
  if (noadv || "off" === sov || ~b.indexOf("liexpress.c")) {
    return !1;
  }
  if ("accepted" === (localStorage.getItem("sovetnik_userAgreementStatus") || 0)) {
    return !0;
  }
  b = ls.get("sovetnik_userAgreementCheckTimeMy") || 0;
  c = Date.now();
  return b ? (0 === sov || "0" === sov) && 216 > (c - b) / 3600000 ? !1 : !0 : (ls.set("sovetnik_userAgreementCheckTimeMy", c), !1);
});
function onProxyError() {
  chrome.proxy.settings.get({incognito:!1}, function(b) {
    var c = !1;
    b && "undefined" != typeof b.levelOfControl && "controllable_by_this_extension" != b.levelOfControl && "controlled_by_this_extension" != b.levelOfControl && (c = !0);
    c && ison ? (ison = !1, proxyoff(!0, !0), errIcon(), chrome.browserAction.setTitle({title:l("messErrOverExtProxy")})) : c || ison || (ison = !0, proxyon());
  });
}
function setUserHostUrl(b, c, e, f, k) {
  k ? (0 > c || checkUrls.include(b + c), proxyHosts[b] = {on:!1, d:0, bl:!1, url:c}, e && (proxyHosts[b].l = e), proxyHosts[b].lid = f, -2 == c && (proxyHosts[b].ons = !0), proxyHostsCl.include("*://" + b + "/*")) : (checkUrls.erase(b + c), delete proxyHosts[b], proxyHostsCl.erase("*://" + b + "/*"));
}
function chNoNeedopenPr() {
  for (var b in proxyHosts) {
    if (proxyHosts.hasOwnProperty(b) && "undefined" !== typeof proxyHosts[b].l) {
      return !1;
    }
  }
  return !0;
}
function getMessage(b, c, e) {
  if (b) {
    if ("getTabId" == b.type) {
      e({tabId:c.tab.id});
    } else {
      if ("sovetnik" == b.type) {
        return e(noadv), !0;
      }
      if ("from_s2" == b.type && b.tabHost) {
        "undefined" != typeof proxyHosts[b.tabHost] ? (proxyHosts[b.tabHost].hide = b.value, saveHostsToLs()) : (azaprethide[b.tabHost] = b.value, ls.set("azaprethide", azaprethide));
      } else {
        if ("frigate" == b.type && b.value) {
          "gettld" == b.value ? (getTld(), d("getTld===", tld), preproxy = "", setProxy($empty)) : "isslowconn" == b.value && (slowConnect = b.val2 ? 1 : 0, setSlow()), "noautochproxy" == b.value ? noAutoChangeProxy = b.val2 ? 1 : 0 : "compres" == b.value ? compres = b.val2 ? 1 : 0 : "anon" == b.value ? a = b.val2 ? 1 : 0 : "noalert" == b.value ? noalertRead() : "noadv" == b.value ? noadvRead() : "proxy" == b.value ? (preproxy = "", "f" == proxyRead() ? (openPrNoNeed = chNoNeedopenPr(), openPr || 
          openPrNoNeed ? setProxy(function() {
            checkAllTabWhenEnable(!1);
          }) : getSitesUrl(!1, function() {
            checkAllTabWhenEnable(!1);
          })) : setProxy($empty)) : "getfrlist" == b.value && e(proxyHosts);
        } else {
          if ("chproxy" == b.type && b.tabHost && b.url && b.tabId) {
            proxyOffset++, proxyUpdate = 1, md5api = "", openPr = !1, getSitesUrl(!1, function() {
              tabUpdate(!1, b.url, b.tabId);
            });
          } else {
            if ("frigatetabon" == b.type && b.tabHost && b.url && b.tabId) {
              proxyHosts[b.tabHost].man = !0, setProxy(function() {
                actIcon();
                tabUpdate(!1, b.url, b.tabId);
              });
            } else {
              if ("frigatetaboff" == b.type && b.tabHost && b.url && b.tabId) {
                proxyHosts[b.tabHost].man = !1, setProxy(function() {
                  noActIcon();
                  tabUpdate(!1, b.url, b.tabId);
                });
              } else {
                if ("frigateisshow" == b.type && b.tabId) {
                  isShowMess[b.tabId] = !0;
                } else {
                  if ("frigatelist" == b.type) {
                    var f = "onlist" == b.value.act;
                    if (f || "offlist" == b.value.act) {
                      if (b.value.id && (c = ls.get("list")) && 0 < c.length && "undefined" !== typeof c[b.value.id]) {
                        var k = c[b.value.id];
                        0 < k.d.length ? (Object.each(k.d, function(b, c) {
                          b.on && setUserHostUrl(b.h, b.u, k.n, c, f);
                        }), ison && setOrUpdateHandlers(), saveHostsToLs(), openPr ? setProxy(function() {
                          e(!0);
                        }) : (openPr = 0, getSitesUrl(!1, function() {
                          checkAllTabWhenEnable(!1);
                        }))) : e(!0);
                      }
                    } else {
                      if ("delurl" == b.value.act) {
                        if (-5 == b.value.url) {
                          return "undefined" != typeof proxyHosts[b.value.host] ? (proxyHosts[b.value.host].ons = proxyHosts[b.value.host].ons ? -3 : -1, saveHostsToLs(), setProxy(function() {
                            checkAllTabWhenEnable(!1);
                            e(!0);
                          })) : e(!1), !0;
                        }
                        b.value.host && b.value.url && (setUserHostUrl(b.value.host, b.value.url, !1, !1, !1), "undefined" == typeof b.value.notApply && (saveHostsToLs(), ison && setOrUpdateHandlers(), openPr || (openPrNoNeed = chNoNeedopenPr()) && onOffLimit(), checkAllTabWhenEnable(!1)));
                        e(!0);
                      } else {
                        if ("churl" == b.value.act) {
                          c = checkHostInProxyHosts("http://" + getClHost(b.value.host)), c.tabHost ? "undefined" == typeof proxyHosts[c.tabHost].lid ? e("friGate") : e(proxyHosts[c.tabHost].lid) : e(!1);
                        } else {
                          if ("url" == b.value.act) {
                            if (-5 == b.value.url) {
                              return "undefined" != typeof proxyHosts[b.value.host] ? (proxyHosts[b.value.host].ons = -3 == proxyHosts[b.value.host].ons ? !0 : !1, saveHostsToLs(), setProxy(function() {
                                checkAllTabWhenEnable(!1);
                                e(!0);
                              })) : e(!1), !0;
                            }
                            setUserHostUrl(b.value.host, b.value.url, b.value.list, b.value.lid, !0);
                            ison && setOrUpdateHandlers();
                            saveHostsToLs();
                            openPr ? setProxy(function() {
                              checkAllTabWhenEnable(b.value.host);
                              e(!0);
                            }) : (getSitesUrl(!1, function() {
                              checkAllTabWhenEnable(b.value.host);
                            }), e(!0));
                          }
                        }
                      }
                    }
                    return !0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
function noalertRead() {
  var b = ls.get("noalert");
  null !== b && (noalert = b);
}
function noadvRead() {
  var b = ls.get("noadv");
  null !== b && (noadv = b);
  sovetnik.setRemovedState(noadv);
}
function proxyRead() {
  var b = ls.get("pr2");
  if (null == b || 1 > b.length) {
    return prDef ? (pr = prDef, prco = prDefCo) : (b = Math.floor(Math.random() * prDef2.length), pr = prDef2[b][0], prco = prDef2[b][1], pr2 = pr2Def2[b]), prip = getprip(pr), "f";
  }
  pr2 = pr = "";
  lsprL = b.length;
  if (0 < lsprL) {
    for (var c = 0; c < lsprL; c++) {
      pr += b[c], c == lsprL - 1 && (pr += ";");
    }
  }
  prco = prip = "";
  openPr = !0;
  return "o";
}
function checkHostInAntizapret(b) {
  b = b.split(/\/+/g);
  if ("http:" != b[0] && "https:" != b[0]) {
    return !1;
  }
  for (var c = 0, e = azapret.length; c < e; c++) {
    if (b[1] == azapret[c]) {
      return b[1];
    }
  }
  return !1;
}
function checkHostInTld(b) {
  var c = {};
  b = b.split(/\/+/g);
  c.sheme = b[0] + "//";
  c.host = b[1];
  if ("http://" != c.sheme && "https://" != c.sheme) {
    return !1;
  }
  c = c.host.split(/\./g);
  c = c[c.length - 1];
  return tld.hasOwnProperty(c) && tld[c] ? c : !1;
}
function checkHostInRepTextHosts(b) {
  var c = [];
  if (null != dataRep) {
    var e = dataRep.length;
    if (0 < e) {
      for (; e--;) {
        "undefined" != typeof dataRep[e] && dataRep[e].s.test(b) && c.push({f:dataRep[e].f, t:dataRep[e].t});
      }
    }
  }
  return c;
}
function checkHostInTopRec(b) {
  var c = !1, e = b.split(/\/+/g)[1];
  if ("undefined" !== typeof tRecAllHosts[e]) {
    c = tRecAllHosts[e];
  } else {
    e = e.split(/\./g);
    var f = e.length;
    if (1 < f) {
      var k = e[f - 1];
      for (f -= 2; -1 < f; f--) {
        k = e[f] + "." + k, "undefined" !== typeof tRecAllHosts["*." + k] && (c = tRecAllHosts["*." + k]);
      }
    }
  }
  !1 !== c && trec[c].hasOwnProperty("reg") && trec[c].reg && (trec[c].reg.test(b) || (c = !1));
  return c;
}
function checkHostInProxyHosts(b) {
  var c = {tabHost:!1, tabClHost:"", isSheme:!1, allow:!1}, e = b.split(/\/+/g);
  b = !1;
  c.sheme = e[0] + "//";
  c.host = e[1];
  if ("http://" == c.sheme || "https://" == c.sheme) {
    c.isSheme = !0;
  }
  if ("undefined" !== typeof proxyHosts[c.host]) {
    b = !0, c.tabHost = c.host, c.tabClHost = c.host;
  } else {
    e = c.host.split(/\./g);
    var f = e.length;
    if (1 < f) {
      for (c.tabClHost = e[f - 1], f -= 2; -1 < f; f--) {
        if (c.tabClHost = e[f] + "." + c.tabClHost, "undefined" !== typeof proxyHosts["*." + c.tabClHost]) {
          c.tabHost = "*." + c.tabClHost;
          break;
        }
      }
    }
  }
  !c.tabHost || !openPr && (openPr || b && 0 > proxyHosts[c.host].ons || "undefined" != typeof proxyHosts[c.tabHost].lid) || (c.allow = !0);
  return c;
}
function checkAllTabWhenEnable(b) {
  ison && chrome.tabs.query({}, function(c) {
    for (var e, f = c.length, k = 0; k < f; k++) {
      if (e = checkHostInProxyHosts(c[k].url), e.tabHost && (!b || b && e.tabHost == b) || checkHostInAntizapret(c[k].url)) {
        try {
          chrome.tabs.update(c[k].id, {url:c[k].url}, function() {
          });
        } catch (p) {
        }
      }
    }
  });
}
function tabListener31(b, c, e) {
  e = "undefined" !== typeof c.url ? c.url : e.url;
  tabListenerAll(e, b, !0, c.status);
  e && (c = checkHostInRepTextHosts(e), 0 < c.length && chrome.tabs.sendMessage(b, {type:"s2r", rep:c}));
}
function tabListener32(b) {
  chrome.tabs.get(b.tabId, function(c) {
    "undefined" !== typeof c.url && tabListenerAll(c.url, b.tabId, !1, !1);
  });
}
function tabListenerAll(b, c, e, f) {
  var k = !1;
  !b || "complete" !== f && !1 !== f || (k = checkHostInTopRec(b), !1 !== k && chrome.tabs.query({url:b}, function(b) {
    if (b) {
      var e = b.map(function(b, c) {
        return b.id;
      });
    }
    e && e.contains(c) && chrome.tabs.sendMessage(c, trec[k]);
  }));
  if (ison) {
    if (isProxyHosts && b) {
      var p = f = !1, m = !1, n = "";
      var g = checkHostInProxyHosts(b);
      g.tabHost && g.allow ? (n = g.tabHost, g = null) : (p = checkHostInAntizapret(b)) || (m = checkHostInTld(b));
      if (p || n || m) {
        e && "undefined" == typeof isShowMess[c] && (e = m ? "<b>." + m + "</b>" : p ? "<b>Antizapret</b>" : "undefined" == typeof proxyHosts[n].l ? "<b>friGate</b>" : "<b>" + proxyHosts[n].l + "</b>", n && "undefined" != typeof proxyHosts[n].hide ? f = proxyHosts[n].hide : p && "undefined" != typeof azaprethide[p] && (f = azaprethide[p]), m ? showMess(c, [l("messProxyOn"), "", l("messFromList") + e], f, m, b, 3) : p ? showMess(c, [l("messProxyOn"), "", l("messFromList") + e], f, p, b, 3) : proxyHosts[n].man ? 
        showMess(c, [l("messProxyOnManually"), l("messProxyIsOff"), l("messFromList") + e], f, n, b, 1) : 0 > proxyHosts[n].ons ? showMess(c, [l("mess_manually_dis"), "", l("messFromList") + e], f, n, b, 0) : 1 == proxyHosts[n].ons ? showMess(c, [l("messTypeCh3"), "", l("messFromList") + e], f, n, b, 4) : proxyHosts[n].on ? showMess(c, [l("messProxyOn"), "", l("messFromList") + e], f, n, b, 3) : showMess(c, [l("messSiteWithoutProxy"), l("messProxyOff"), l("messFromList") + e], f, n, b, 0)), chrome.tabs.getSelected(null, 
        function(b) {
          if (b.id == c) {
            if (!("undefined" != typeof proxyHosts[n] && 0 > proxyHosts[n].ons) && (m || p || proxyHosts[n].on || proxyHosts[n].ons) || proxyHosts[n].man) {
              return actIcon(c), !0;
            }
            listIcon();
            return !1;
          }
        });
      }
    }
    noActIcon();
  } else {
    disIcon();
  }
}
function reqListenerAll(b) {
  b.tabId && b.url && (tabUpdateAllArr[b.tabId] = b.url);
}
var checkResponseHeaders = function(b) {
  var c = 0;
  Array.each(b, function(b, f) {
    b.name = b.name.toLowerCase();
    "location" == b.name && (c = f);
  });
  return c;
}, reqOnHeadersReceived = function(b) {
  if ("object" == typeof b.responseHeaders) {
    var c = b.responseHeaders.length, e = 0;
    if (0 < c) {
      for (var f = 0; f < c; f++) {
        if ("undefined" != typeof b.responseHeaders[f].name) {
          if ("status" == b.responseHeaders[f].name) {
            var k = 1 * b.responseHeaders[f].value;
            499 < k && 505 > k && e++;
          }
          "server" == b.responseHeaders[f].name && "fri-gate" == b.responseHeaders[f].value && e++;
        }
      }
      2 == e && (noAutoChangeProxy || changeProxy(b));
    }
  }
  if (/(3)\d\d/g.test(b.statusLine)) {
    if ("xmlhttprequest" == b.type) {
      if (-1 != b.url.indexOf("frigate_test_file=") || -1 != b.url.indexOf("frigate_404_check")) {
        return {cancel:!0};
      }
    } else {
      if (hostObj = checkHostInProxyHosts(b.url), hostObj.tabHost && !proxyHosts[hostObj.tabHost].on && hostObj.allow && (c = checkResponseHeaders(b.responseHeaders))) {
        if (toUrl = b.responseHeaders[c].value, toUrl = toUrl.split(/\/+/g)[1], blHostslength = blHosts.length, 0 < blHostslength) {
          for (f = 0; f < blHostslength; f++) {
            -1 != toUrl.indexOf(blHosts[f]) && (proxyHosts[hostObj.tabHost].bl = !0, proxyHosts[hostObj.tabHost].upd = {}, proxyHosts[hostObj.tabHost].upd[b.tabId] = b.url, noSiteRes(hostObj.tabHost, null, b.tabId, b.url, null, null));
          }
        }
      }
    }
  }
  return {cancel:!1};
};
function reqListener(b) {
  "undefined" != typeof isShowMess[b.tabId] && delete isShowMess[b.tabId];
  if ((isProxyHosts || isRep) && b.url) {
    var c = b.url, e = checkHostInProxyHosts(c);
    if (e.isSheme) {
      if (isRep && "undefined" != typeof rep[e.host]) {
        return {redirectUrl:c.replace(e.host, rep[e.host])};
      }
      if (e.tabHost && e.allow && 1 != proxyHosts[e.tabHost].ons) {
        var f = e.tabHost, k = e.tabClHost;
        if (proxyHosts[f].bl) {
          proxyHosts[f].upd[b.tabId] = c;
        } else {
          if (proxyHosts[f].d < Date.now()) {
            if (proxyHosts[f].bl = !0, proxyHosts[f].upd = {}, proxyHosts[f].upd[b.tabId] = c, "undefined" !== typeof proxyHosts[f].url) {
              if (-1 != proxyHosts[f].url.indexOf("|")) {
                var p = proxyHosts[f].url.split(/\|/g);
                var m = "robots.txt";
                if (0 < p.length) {
                  p[1] && (m = p[1]);
                  var n = function() {
                    noSiteRes(f, k, b.tabId, c, !1, 3);
                  }, g = function(e) {
                    j = -1 == e.indexOf(p[0]) ? !1 : !0;
                    noSiteRes(f, k, b.tabId, c, j, 3);
                  };
                  m = e.sheme + k + "/" + m;
                  Req(m, 10E3, g, n, n, "GET", "frigate_test_file=" + generatePW(5) + Date.now());
                }
              } else {
                -1 == proxyHosts[f].url ? (g = function(e) {
                  j = /(4|5)\d\d/g.test(e.status) ? !0 : !1;
                  noSiteRes(f, k, b.tabId, c, j, 3);
                }, m = genRandFile(e.sheme, k), getUrl3(m, "get", {}, "", g, g)) : (proxyHosts[f].testsize = -2, g = function(e) {
                  e ? ("object" == typeof e && (e = ""), e = h(e)) : e = !1;
                  noSiteRes(f, k, b.tabId, c, e, 2);
                }, m = e.sheme + k + proxyHosts[f].url, getUrl3(m, "get", {}, "", g, g), e = genRandFile(e.sheme, k), getUrl3(e, "get", {}, "", g, g));
              }
            } else {
              g = function(e) {
                noSiteRes(f, k, b.tabId, c, e, !1);
              }, m = e.sheme + k + nameTestFile + k + ".js", getUrl(m, "get", "", g, g);
            }
          } else {
            noalert || chrome.tabs.sendMessage(b.tabId, {type:"showwait"});
          }
        }
      }
    }
  }
  return {cancel:!1};
}
function onAddAuthHeader(b) {
  if ("http:" == b.url.substring(0, 5)) {
    var c = "", e = !1, f = checkHostInProxyHosts(b.url);
    f.tabHost && f.allow ? c = f.tabHost : e = checkHostInAntizapret(b.url);
    if (e || c && (proxyHosts[f.tabHost].on || 1 == proxyHosts[f.tabHost].ons || proxyHosts[f.tabHost].man)) {
      compres && a ? prauth4 && b.requestHeaders.push({name:"Proxy-Authorization", value:prauth4}) : compres ? prauth3 && b.requestHeaders.push({name:"Proxy-Authorization", value:prauth3}) : a ? prauth2 ? b.requestHeaders.push({name:"Proxy-Authorization", value:prauth2}) : b.requestHeaders.push({name:"Proxy-Authorization", value:"a"}) : prauth && b.requestHeaders.push({name:"Proxy-Authorization", value:prauth});
    }
  }
  return {requestHeaders:b.requestHeaders};
}
function reqOnResponseStarted(b) {
  if (!noalert && isProxyHosts && b.url) {
    var c = checkHostInProxyHosts(b.url);
    (c.tabHost && c.allow || checkHostInAntizapret(b.url)) && chrome.tabs.sendMessage(b.tabId, {type:"showwait"});
  }
  "undefined" != typeof b.statusCode && 407 == b.statusCode && (changeProxy(b, !0), d2(b.statusCode));
}
function reqOnErrorOccurred(b) {
  -1 === b.error.indexOf("ERR_TUNNEL") && -1 === b.error.indexOf("ERR_PROXY") && -1 === b.error.indexOf("ERR_CONNECTION") || changeProxy(b, !0);
  "undefined" !== typeof b.statusCode && 404 === b.statusCode && changeProxy(b);
}
function reqonCompletedForFindErr(b) {
  if ("object" == typeof b.responseHeaders) {
    var c = b.responseHeaders.length;
    if (0 < c) {
      for (var e = !1, f = 0; f < c; f++) {
        "undefined" != typeof b.responseHeaders[f].name && "X-Squid-Error" == b.responseHeaders[f].name && "ERR_ACCESS_DENIED 0" == b.responseHeaders[f].value && (e = !0);
      }
      e && changeProxy(b, !0);
    }
  }
}
function changeProxy(b, c) {
  0 == autoChangeProxyCount && (proxyOffset = 0);
  autoChangeProxyCount <= autoChangeProxyCountMax && (autoChangeProxyCount++, proxyOffset++, proxyUpdate = 1, md5api = "", openPr = !1, c ? (timeOutAuth = 0, reGet(function() {
    b.url && b.tabId && tabUpdate(null, b.url, b.tabId);
  })) : getSitesUrl(!1, function() {
    b.url && b.tabId && tabUpdate(null, b.url, b.tabId);
  }));
}
function onoff() {
  ison ? proxyoff() : proxyon();
}
function onOffLimit() {
  openPrNoNeed = chNoNeedopenPr();
  openPr || openPrNoNeed ? limitText = "" : (limitText = "lim", chrome.browserAction.setTitle({title:l("messErrLim")}));
  ison && chrome.tabs.getSelected(null, function(b) {
    tabListenerAll(b.url, b.id, !0, !1);
  });
}
function proxyoff(b, c) {
  d2("off");
  timerUpdateHost && clearInterval(timerUpdateHost);
  timerUpdateHost = !1;
  c || (timerCheckProxy && clearInterval(timerCheckProxy), timerCheckProxy = !1);
  preproxy = preurls = presites = preazapret = null;
  md5api = openPr = !1;
  setOrUpdateHandlers(!0);
  setOrUpdateTabHandlers(!0);
  disIcon();
  chrome.proxy.settings.clear({scope:"regular"}, function() {
    checkAllTabWhenEnable(!1);
    b || (ison = null, ls.set("on", !1));
  });
}
function clearcacheNew(b, c, e) {
  if (clearcacheis) {
    clearcacheis = !1;
    try {
      chrome.browsingData.remove({since:0, origins:[c]}, {appcache:!0, cache:!0, serviceWorkers:!0}, e);
    } catch (f) {
      "function" == typeof e && e();
    }
  }
}
function offHandlersAll() {
  chrome.webRequest.onBeforeRequest.hasListener(reqListenerAll) && chrome.webRequest.onBeforeRequest.removeListener(reqListenerAll);
}
function setOrUpdateHandlers(b) {
  offHandlersAll();
  chrome.webRequest.onBeforeRequest.hasListener(reqListener) && chrome.webRequest.onBeforeRequest.removeListener(reqListener);
  b || chrome.webRequest.onBeforeRequest.addListener(reqListener, {urls:proxyHostsCl, types:["main_frame"]}, ["blocking"]);
  chrome.webRequest.onHeadersReceived.hasListener(reqOnHeadersReceived) && chrome.webRequest.onHeadersReceived.removeListener(reqOnHeadersReceived);
  b || chrome.webRequest.onHeadersReceived.addListener(reqOnHeadersReceived, {urls:proxyHostsCl, types:["xmlhttprequest", "main_frame"]}, ["blocking", "responseHeaders"]);
  chrome.webRequest.onErrorOccurred.hasListener(reqOnErrorOccurred) && chrome.webRequest.onErrorOccurred.removeListener(reqOnErrorOccurred);
  b || chrome.webRequest.onErrorOccurred.addListener(reqOnErrorOccurred, {urls:proxyHostsCl, types:["main_frame"]});
  chrome.webRequest.onHeadersReceived.hasListener(reqOnResponseStarted) && chrome.webRequest.onHeadersReceived.removeListener(reqOnResponseStarted);
  b || chrome.webRequest.onHeadersReceived.addListener(reqOnResponseStarted, {urls:proxyHostsCl, types:["main_frame"]});
  chrome.webRequest.onResponseStarted.hasListener(reqOnResponseStarted) && chrome.webRequest.onResponseStarted.removeListener(reqOnResponseStarted);
  b || chrome.webRequest.onResponseStarted.addListener(reqOnResponseStarted, {urls:proxyHostsCl, types:["main_frame"]});
  chrome.webRequest.onCompleted.hasListener(reqOnResponseStarted) && chrome.webRequest.onCompleted.removeListener(reqOnResponseStarted);
  b || chrome.webRequest.onCompleted.addListener(reqOnResponseStarted, {urls:proxyHostsCl, types:["main_frame"]});
  chrome.webRequest.onCompleted.hasListener(reqonCompletedForFindErr) && chrome.webRequest.onCompleted.removeListener(reqonCompletedForFindErr);
  b || chrome.webRequest.onCompleted.addListener(reqonCompletedForFindErr, {urls:proxyHostsCl, types:["main_frame"]}, ["responseHeaders"]);
  chrome.webRequest.onBeforeSendHeaders.hasListener(onAddAuthHeader) && chrome.webRequest.onBeforeSendHeaders.removeListener(onAddAuthHeader);
  b || chrome.webRequest.onBeforeSendHeaders.addListener(onAddAuthHeader, {urls:["<all_urls>"]}, ["requestHeaders", "blocking"]);
}
function setOrUpdateTabHandlers(b) {
  chrome.tabs.onUpdated.hasListener(tabListener31) && chrome.tabs.onUpdated.removeListener(tabListener31);
  chrome.tabs.onActivated.hasListener(tabListener32) && chrome.tabs.onActivated.removeListener(tabListener32);
  b || (chrome.tabs.onUpdated.addListener(tabListener31), chrome.tabs.onActivated.addListener(tabListener32));
}
function proxyon(b) {
  d2("on");
  chrome.browserAction.setBadgeText({text:"wait"});
  limitText = "wait";
  chrome.proxy.settings.get({incognito:!1}, function(c) {
    if (c && "undefined" != typeof c.levelOfControl && "controllable_by_this_extension" != c.levelOfControl && "controlled_by_this_extension" != c.levelOfControl) {
      return ison = !1, chrome.browserAction.setTitle({title:l("messErrOverExtProxy")}), errIcon(), !1;
    }
    timerCheckProxy || (timerCheckProxy = setInterval(onProxyError, 3000));
    ison = !0;
    b || ((isProxyHosts || isRep) && setProxy(function() {
      setOrUpdateHandlers(0);
      setOrUpdateTabHandlers(0);
    }), proxyOffset++, serial = 0);
    openPrNoNeed = chNoNeedopenPr();
    0 < proxyHostsCl.length ? (proxyUpdate = 2, getSitesUrl(!1, function() {
      proxyUpdate = serial = 0;
      getSitesUrl(!1, function() {
        checkAllTabWhenEnable(!1);
      });
    })) : (first_api = "&first_api", proxyUpdate = 1, getSitesUrl(!1, function() {
      checkAllTabWhenEnable(!1);
    }));
    timerUpdateHost || (timerUpdateHost = setInterval(getSitesUrl, timewaitUpdateHost));
    chrome.tabs.getSelected(null, function(b) {
      tabListenerAll(b.url, b.id, !0, !1);
    });
    ls.set("on", !0);
    clearcacheis = !0;
  });
}
function actIcon() {
  a ? (chrome.browserAction.setIcon({path:"im/38aan.png"}), chrome.browserAction.setTitle({title:l("messProxyOnAn")})) : (chrome.browserAction.setIcon({path:"im/38a.png"}), chrome.browserAction.setTitle({title:l("messProxyOn")}));
  chrome.browserAction.setBadgeText({text:limitText});
}
function listIcon() {
  chrome.browserAction.setTitle({title:l("browser_action_title")});
  a ? chrome.browserAction.setIcon({path:"im/38lan.png"}) : chrome.browserAction.setIcon({path:"im/38l.png"});
  chrome.browserAction.setBadgeText({text:limitText});
}
function noActIcon() {
  chrome.browserAction.setTitle({title:l("browser_action_title")});
  a ? chrome.browserAction.setIcon({path:"im/38an.png"}) : chrome.browserAction.setIcon({path:"im/38.png"});
  chrome.browserAction.setBadgeText({text:limitText});
}
function disIcon() {
  chrome.browserAction.setIcon({path:"im/38g.png"});
  chrome.browserAction.setBadgeText({text:"off"});
  chrome.browserAction.setTitle({title:l("browser_action_title")});
}
function errIcon() {
  chrome.browserAction.setIcon({path:"im/38g.png"});
  chrome.browserAction.setTitle({title:l("messErrOverExtProxy")});
  chrome.browserAction.setBadgeText({text:"err"});
}
function showMess(b, c, e, f, k, p) {
  noalert || chrome.tabs.query({url:k}, function(m) {
    if (m) {
      var n = m.map(function(b, c) {
        return b.id;
      });
    }
    n.contains(b) && chrome.tabs.sendMessage(b, {type:"s2", tabHost:f, tabUrl:k, hide:e, tabId:b, u:updateText, n:news, pr:[prip + " " + l("messChange"), prco], value:{dop:c, isonepage:p}});
  });
}
function tabUpdateAll() {
  emptyObject(tabUpdateAllArr) || chrome.tabs.query({}, function(b) {
    var c = b.map(function(b) {
      return b.id;
    }), e;
    for (e in tabUpdateAllArr) {
      if (tabUpdateAllArr.hasOwnProperty(e) && (b = parseInt(e), c.contains(b))) {
        try {
          chrome.tabs.update(b, {url:tabUpdateAllArr[e]}, function() {
          });
        } catch (f) {
        }
      }
    }
    tabUpdateAllArr = {};
  });
}
function tabUpdate(b, c, e) {
  d("tabUpdate host", b);
  clearcacheNew(0, c, function() {
    if (b && 0 < b.length) {
      proxyHosts[b].bl = !1, "object" == typeof proxyHosts[b].upd && 0 < !emptyObject(proxyHosts[b].upd) ? chrome.tabs.query({}, function(c) {
        var e = c.map(function(b, c) {
          return b.id;
        });
        d("proxyHosts[host].upd", proxyHosts[b].upd);
        "object" == typeof proxyHosts[b].upd && Object.each(proxyHosts[b].upd, function(b, c) {
          c = parseInt(c);
          d("tabId2", c);
          d("url2", b);
          if (e.contains(c)) {
            try {
              chrome.tabs.update(c, {url:b}, function() {
              });
            } catch (n) {
            }
          }
        });
        delete proxyHosts[b].upd;
      }) : delete proxyHosts[b].upd;
    } else {
      try {
        chrome.tabs.update(e, {url:c}, $empty);
      } catch (f) {
      }
    }
    clearcacheis = !0;
  });
}
function tRecPrepead(b) {
  if ("object" === typeof b && null !== b) {
    for (var c = 0, e = b.length; c < e; c++) {
      if (b[c].hasOwnProperty("hosts")) {
        b[c].hasOwnProperty("reg") && b[c].reg && (trec[c].reg = new RegExp(b[c].reg, "igm"));
        for (var f = b[c].hosts.split(","); val = f.shift();) {
          tRecAllHosts[val] = c;
        }
      }
    }
  }
}
function noSiteRes(b, c, e, f, k, p) {
  var m = !1;
  if ((2 == p || 7 == p) && "undefined" !== typeof k.s) {
    if (-2 == proxyHosts[b].testsize) {
      return proxyHosts[b].testsize = k.s, proxyHosts[b].testhash = k.h, !0;
    }
    7 == p ? checkN(proxyHosts[b].testsize, k.s, 15) && 0.15 > compareH(proxyHosts[b], k.h) && (m = !0) : 2 == p && (m = !0, checkN(proxyHosts[b].testsize, k.s, 15) && 0.15 > compareH(proxyHosts[b], k.h) && (m = !1));
    delete proxyHosts[b].testsize;
    delete proxyHosts[b].testhash;
  }
  var n = proxyHosts[b].on;
  3 == p && k || 2 == p && m || !p && k && "undefined" !== typeof k.res && k.res == c ? (d2(b + " - available"), proxyHosts[b].on = !1, proxyHosts[b].d = Date.now() + timewait2, n && setProxy(function() {
    noActIcon();
    tabUpdate(b, f, e);
  })) : (d2(b + " - not available"), proxyHosts[b].on = !0, proxyHosts[b].d = Date.now() + timewait, n || setProxy(function() {
    actIcon();
    tabUpdate(b, f, e);
  }));
}
var ind = startUrlIndex - 1, indExt = 0;
function genNewUrl() {
  var b = "";
  ind++;
  ind > endUrlIndex && (ind = startUrlIndex, indExt++, indExt > extArr.length - 1 && (indExt = 0));
  ind != endUrlIndex && (b = ind);
  ext = extArr[indExt];
  return "https://apigo.fri-gate" + b + "." + ext + apiPath + apiFile;
}
function reGet(b) {
  if (apioffset + 2 > apicount) {
    return "" == pr && proxyoff(), apioffset = 0, !0;
  }
  apioffset += 1;
  setTimeout(function() {
    getSitesUrl(!1, b);
  }, 3E3);
}
function saveHostsToLs() {
  var b = {};
  if (!emptyObject(proxyHosts)) {
    var c;
    for (c in proxyHosts) {
      if (proxyHosts.hasOwnProperty(c)) {
        var e = proxyHosts[c];
        b[c] = "undefined" !== typeof e.ons ? {ons:e.ons} : {};
        "undefined" !== typeof e.url && e.url && (b[c].url = e.url);
        "undefined" !== typeof e.l && e.l && (b[c].l = e.l);
        "undefined" !== typeof e.lid && e.lid && (b[c].lid = e.lid);
        "uefined" !== typeof e.hide && e.hide && (b[c].hide = !0);
      }
    }
  }
  ls.set("hosts", b, uid);
}
function savenewhosts(b, c) {
  var e = 0, f = 0;
  !c || emptyObject(c) || emptyObject(proxyHosts) || Array.each(c, function(b, c) {
    "undefined" != typeof proxyHosts[b] && "undefined" == typeof proxyHosts[b].lid && (delete proxyHosts[b], proxyHostsCl.erase("*://" + b + "/*"), f++);
  });
  proxyHosts || (proxyHosts = {});
  c = ls.get("list");
  var k = {};
  emptyObject(c) || (Array.each(c, function(b, c) {
    Array.each(b.d, function(b) {
      k[b.h] = !0;
    });
  }), c = {});
  Object.each(b, function(b) {
    var c = b.h;
    c && ("undefined" == typeof proxyHosts[c] ? "undefined" == typeof k[c] && (proxyHosts[c] = {on:!1, d:0, bl:!1}, proxyHosts[c].ons = "undefined" != typeof b.ons && b.ons ? !0 : !1, "undefined" != typeof b.url && b.url && (proxyHosts[c].url = b.url), proxyHostsCl.include("*://" + c + "/*"), isProxyHosts = isChange = !0, e++) : "undefined" != typeof proxyHosts[c].lid || "undefined" == typeof b.url || !b.url || "undefined" != typeof proxyHosts[c].url && proxyHosts[c].url == b.url || (proxyHosts[c].url = 
    b.url, isProxyHosts = isChange = !0, e++));
  });
  var p = {}, m = Object.keys(b);
  130 < m.length && Object.each(proxyHosts, function(c, e) {
    for (var k = 0, g = m.length; k < g; k++) {
      if (e == b[m[k]].h || "undefined" != typeof c.lid) {
        p[e] = c;
        return;
      }
    }
    f++;
  });
  proxyHosts = p;
  return e || f ? (d2("save to friGate host. add:" + e + ", del:" + f), saveHostsToLs(), !0) : !1;
}
function proxyHostsAdd(b, c) {
  var e = {on:!1, d:0, bl:!1, ons:!1};
  "undefined" !== typeof c.ons && (e.ons = c.ons);
  "undefined" !== typeof c.l && c.l && (e.l = c.l);
  "undefined" !== typeof c.lid && c.lid && (e.lid = c.lid);
  "undefined" !== typeof c.url && c.url && (e.url = c.url, 0 > c.url || checkUrls.push(b + c.url));
  "undefined" !== typeof c.hide && c.hide && (e.hide = !0);
  return e;
}
function parseRepText(b) {
  var c = [];
  if (null != b) {
    var e = b.length;
    if (0 < e) {
      for (; e--;) {
        "undefined" != typeof b[e] && c.push({f:b[e].f, t:b[e].t, s:RegExp(b[e].s, "i")});
      }
    }
  }
  return c;
}
function loadhosts() {
  (azaprethide = ls.get("azaprethide")) || (azaprethide = {});
  var b = 0;
  proxyHosts = {};
  proxyHostsCl = [];
  checkUrls = [];
  var c = ls.get("hosts", uid);
  if (!emptyObject(c)) {
    for (var e in c) {
      e && c.hasOwnProperty(e) && (proxyHosts[e] = proxyHostsAdd(e, c[e]), b++, proxyHostsCl.push("*://" + e + "/*"), isProxyHosts = !0);
    }
  }
  c = ls.get("list");
  emptyObject(c) || Array.each(c, function(c, e) {
    c.on && Array.each(c.d, function(f) {
      var k = f.h;
      f.on && "undefined" == typeof proxyHosts[k] && (proxyHosts[k] = proxyHostsAdd(k, {ons:!0, l:c.n, lid:e, url:f.u}), b++, proxyHostsCl.push("*://" + k + "/*"), isProxyHosts = !0);
    });
  });
  c = ls.get("dataRep", uid);
  "object" === typeof c && (dataRep = parseRepText(c));
  (c = ls.get("serialRep", !1)) && (serialRep = c);
  if ((c = ls.get("redir", uid)) && "object" == typeof c) {
    for (e in c) {
      c.hasOwnProperty(e) && proxyHostsCl.include("*://" + e + "/*");
    }
    rep = c;
    isRep = !0;
  }
  1 > proxyHostsCl.length && (serial = 0);
  d2("loading from localStorage " + b + " hosts");
}
function setProxy(b) {
  var c = "", e = "", f = "[]", k = !1, p = 0;
  p = [];
  if (ison) {
    for (var m in proxyHosts) {
      if (proxyHosts.hasOwnProperty(m)) {
        var n = proxyHosts[m];
        if (openPr || !openPr && "undefined" == typeof proxyHosts[m].lid) {
          if (!(0 > n.ons) && (n.on || n.ons) || n.man) {
            k = !0, p.push(m);
          }
        }
      }
    }
    e = JSON.stringify(azapret);
    m = md5(e);
    var g = azapret.length;
    c = JSON.stringify(p);
    n = md5(c);
    p = checkUrls.length;
    0 < p && (f = JSON.stringify(checkUrls));
    var t = md5(f);
    if (preazapret != m || presites != n || preurls != t || preproxy != pr) {
      preazapret = m;
      presites = n;
      preurls = t;
      preproxy = pr;
      if (k || 0 < p || 0 < g) {
        var r = pr, q = pr2;
        q || (q = "DIRECT");
        var u = "", v;
        for (v in tld) {
          tld.hasOwnProperty(v) && tld[v] && (u = u + "if (dnsDomainIs(host, '." + v + "')) {return '" + q + "';} ");
        }
        postclearproxy = function() {
          var k = {mode:"pac_script", pacScript:{data:"function FindProxyForURL(url, host) {var schema=url.substring(0,5); if ( schema!='https' && schema!='http:' ) return 'DIRECT'; if ( shExpMatch( url,'*/aj/frigate/api/+" + apiFile + "*' ) ) return 'DIRECT'; if ( shExpMatch( url,'https://api3.fri*:80/' ) ) return 'DIRECT'; if (shExpMatch( url,\"*" + nameTestFile + "\" + host + \".js*\") ) return 'DIRECT'; if ( url.indexOf('frigate_test_file=')!=-1 ) return 'DIRECT'; if (shExpMatch( url,'*/frigate_404_check_*.png*') ) return 'DIRECT'; var az = " + 
          e + "; var i; var is = false; var len = " + g + ";for (i = 0; i < len; i++) {if ( az[i] == host) { is = true; break; } }if (!is) {var urls = " + f + "; var url2=url.substring(url.indexOf('//')+2);if ( urls.indexOf(url2)!=-1 ) return 'DIRECT';var sites = " + c + "; var i; is = false;while (i = sites.shift()) { if (i == host) { is = true; break;} if ( i[0] == '*') { var lenHost = -1*(i.length-2); if (i.substr(lenHost) == host) { is = true; break; } lenHost = -1*(i.length-1); if (i.substr(lenHost) == host.substr(lenHost)) { is = true; break; } }}} if (is) {if ( schema=='http:' ) return '" + 
          r + "'; else return '" + q + "';} " + u + "return 'DIRECT';}"}};
          try {
            chrome.proxy.settings.set({value:k, scope:"regular"}, b);
          } catch (x) {
            b();
          }
        };
      } else {
        postclearproxy = b;
      }
      try {
        chrome.proxy.settings.clear({scope:"regular"}, postclearproxy);
      } catch (w) {
        postclearproxy();
      }
      return !0;
    }
  }
  "function" === typeof b && b();
}
function rget() {
  Req("https://fri-gate.org/data.json", 30E3, function(b, c) {
    if (b) {
      c = /ETag:\s+\"(.+)\"/ig.exec(c);
      0 < c.length && c[1] && ls.set("rgetEtag", c[1], !1);
      try {
        var e = JSON.decode(b);
      } catch (f) {
      }
      e && "object" === typeof e.data && (ls.set("trec", e.data, uid), trec = e.data, tRecPrepead(trec));
    }
  }, function(b) {
  }, function(b) {
  }, "GET", null, {"If-None-Match":rgetEtag});
}
function getSitesUrl(b, c) {
  openPr || chrome.browserAction.setTitle({title:"wait"});
  var e = Date.now();
  timeClSerial < e && (serial = 0, timeClSerial = e + timewaitClSerial);
  b = getapiurl(apioffset);
  if (1 > apicount) {
    if (!(10E3 > e - apistarttime)) {
      if (3 < apiloadattempts) {
        proxyoff();
        return;
      }
      genapi();
    }
    setTimeout(function() {
      getSitesUrl(b, c);
    }, 3E3);
  } else {
    d("urlGet", b), getUrl3(b, "post", {}, "new=1&k=" + uid + "&t=" + timeOutAuth + "&s=" + serial + "&ip=" + ip + "&po=" + proxyOffset + "&pu=" + proxyUpdate + first_api, function(b) {
      d("apiErr", b);
      reGet(c);
    }, function(e) {
      if (e) {
        if (apiloadattempts = 0, 2 != proxyUpdate && getUrl3(b + "r", "post", {}, "k=" + uid + "&s=" + serialRep, function(b) {
          d("apiErr", b);
        }, function(b) {
          if ("" != b && "-" != e) {
            try {
              var c = JSON.decode(Utf8.decode(XXTEA.decrypt(Base64.decode(b), uid)));
            } catch (w) {
            }
            e = null;
            void 0 != c && "object" == typeof c && c.hasOwnProperty("d") && "object" == typeof c.d && (c.hasOwnProperty("h") && c.h && (serialRep = c.h, ls.set("serialRep", serialRep, !1)), ls.set("dataRep", c.d, uid), dataRep = parseRepText(c.d));
          }
        }), "noUpdate" != e) {
          d("len", e.length);
          var f = md5(e), p = !1, m = !1, n = !1;
          if (f != md5api) {
            try {
              var g = JSON.decode(XXTEA.decrypt(Base64.decode(e), uid));
            } catch (u) {
            }
            e = null;
            7 == Object.keys(g).length && d("j", g);
            if (void 0 != g && "object" == typeof g) {
              md5api = f;
              first_api = "";
              g.serial && (serial = g.serial);
              if (g.r && 0 < Object.getLength(g.r)) {
                isRep = !0;
                var t = {};
                Array.each(g.r, function(b, c) {
                  t[b.f] = b.t;
                  proxyHostsCl.include("*://" + b.f + "/*");
                });
                rep = t;
                ls.set("redir", rep, uid);
              }
              g.ip && (ip = g.ip, d2("you IP: " + g.ip));
              g.prauth && (prauth = g.prauth, ls.set("prauth", prauth, !1));
              g.prauth2 && (prauth2 = g.prauth2, ls.set("prauth2", prauth2, !1));
              g.prauth3 && (prauth3 = g.prauth3, ls.set("prauth3", prauth3, !1));
              g.prauth4 && (prauth4 = g.prauth4, ls.set("prauth4", prauth4, !1));
              g.pr && (proxyUpdate = 0, prDef = g.pr, f = ls.get("pr2"), !f || 1 > f.length ? prDef != pr && (prDefCo = g.prco, pr = prDef, prco = prDefCo, prip = getprip(pr), g.pr2 && (pr2 = "pr" == g.pr2 ? g.pr : g.pr2), m = !0) : d2("use own proxy"));
              "undefined" != typeof g.po && (proxyOffset = g.po);
              g.blHosts && 0 < g.blHosts.length && (blHosts = g.blHosts);
              g.azapret && "object" == typeof g.azapret && 0 < g.azapret.length && (azapret = g.azapret, azapret = arrayUnique(azapret), m = !0, d2("loading antizapret: " + azapret.length + " hosts"));
              g.proxyHosts && (lastLoadHosts = g.proxyHosts, d2("loading from web: " + g.proxyHosts.length + " hosts"), p = savenewhosts(g.proxyHosts, g.delhost));
              if (0 == g.err || "0" == g.err) {
                openPr = !0;
              }
              onOffLimit();
              g.news && (news = g.news, ls.set("news", g.news));
              g.t && (timeOutAuth = g.t);
              g.sov && (sov = g.sov);
              if (g.ver) {
                f = detailsApp.version.split(/\./g);
                g = g.ver.split(/\./g);
                for (var r = 0, q = f.length; r < q; r++) {
                  if (f[r].toInt() < g[r].toInt()) {
                    n = !0;
                    break;
                  }
                }
                n ? (updateText = l("messUpdate"), ls.set("updateText", !0)) : (updateText = "", ls.set("updateText", !1));
              }
              p || m ? (p && ison && (setOrUpdateHandlers(), setOrUpdateTabHandlers()), setProxy(c)) : "function" == typeof c && c();
            } else {
              reGet(c), d2("error load 1");
            }
          } else {
            onOffLimit();
          }
        } else {
          md5api = "", d("noUpd", ""), onOffLimit();
        }
      } else {
        reGet(c), d2("error load 2");
      }
    });
  }
}
(function(b, c) {
  var e, f, k = [], p, m = c.createElement("div"), n = function() {
    clearTimeout(p);
    e || (Browser.loaded = e = !0, c.removeListener("DOMContentLoaded", n).removeListener("readystatechange", g), c.fireEvent("domready"), b.fireEvent("domready"));
    c = b = m = null;
  }, g = function() {
    for (var b = k.length; b--;) {
      if (k[b]()) {
        return n(), !0;
      }
    }
    return !1;
  }, t = function() {
    clearTimeout(p);
    g() || (p = setTimeout(t, 10));
  };
  c.addListener("DOMContentLoaded", n);
  var r = function() {
    try {
      return m.doScroll(), !0;
    } catch (u) {
    }
    return !1;
  };
  if (m.doScroll && !r()) {
    k.push(r);
    var q = !0;
  }
  c.readyState && k.push(function() {
    var b = c.readyState;
    return "loaded" == b || "complete" == b;
  });
  "onreadystatechange" in c ? c.addListener("readystatechange", g) : q = !0;
  q && t();
  Element.Events.domready = {onAdd:function(b) {
    e && b.call(this);
  }};
  Element.Events.load = {base:"load", onAdd:function(c) {
    f && this == b && c.call(this);
  }, condition:function() {
    this == b && (n(), delete Element.Events.load);
    return !0;
  }};
  b.addEvent("load", function() {
    f = !0;
  });
})(window, document);
chrome.proxy.settings.get({incognito:!1}, function(b) {
  b && "undefined" != typeof b.levelOfControl && "controllable_by_this_extension" != b.levelOfControl && "controlled_by_this_extension" != b.levelOfControl && (ison = !1, errIcon());
  ison && 0 < proxyHostsCl.length ? (isProxyHosts || isRep ? setOrUpdateHandlers() : offHandlersAll(), tabUpdateAll(), setOrUpdateTabHandlers(0)) : (offHandlersAll(), tabUpdateAll(), disIcon());
  window.addEvent("domready", function(b) {
    chrome[runtimeOrExtension].onMessage.addListener(getMessage);
    chrome.tabs.onRemoved.addListener(function() {
      chrome.tabs.query({}, function(b) {
        if (!b.length && iscl) {
          var c = function() {
            iscl || (iscl = !0, proxyon(), chrome.tabs.onCreated.hasListener(c) && chrome.tabs.onCreated.removeListener(c));
          };
          iscl = !1;
          proxyoff(!0);
          chrome.tabs.onCreated.hasListener(c) || chrome.tabs.onCreated.addListener(c);
        }
      });
    });
    ison ? setTimeout(function() {
      proxyon(!0);
    }, 300) : first && (first_api = "&first_api", getSitesUrl());
    chrome.browserAction.onClicked.addListener(function() {
      onoff();
    });
    setTimeout(function() {
      rget();
    }, 5000);
  });
});

