var lsList = [], siteList, fixEV = "ie" != Browser.name ? "keydown" : "onkeydown", preedithost = "", preediturl = "", isD = !1, intertldreg = /xn--/i, unicode = /[\u00a1-\uffff]/i, urlvalid = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
function makeSchemes(a) {
  return "(?:" + a.join("|") + ")://";
}
function escapeRegExp(a) {
  return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function noact(a) {
  a && a.stop();
  return !1;
}
function checkUrl(a) {
  if (!urlvalid.test(a)) {
    return !1;
  }
  try {
    var b = new URL(a);
  } catch (c) {
    return !1;
  }
  return "http:" == b.protocol || "https:" == b.protocol ? !0 : !1;
}
frigateOverlay = {listKey:!1, keyPressThis:!1, keyPress:function(a) {
  "esc" == a.key ? (a && a.stop(), this.cancelEdit(a)) : "enter" == a.key && (a && a.stop(), frigateSaveIteamList(this.listKey));
}, cancelEdit:function(a) {
  a && a.stop();
  this.hide();
  frigateShowIteamList(this.listKey);
}, show:function(a) {
  a && (this.listKey = a);
  this.hide();
  (new Element("div", {id:"frigate-overlay", events:{click:this.cancelEdit.bind(this)}})).inject($$("body")[0], "top");
  keyPressThis = this.keyPress.bind(this);
  window.addEvent(fixEV, keyPressThis);
}, hide:function() {
  try {
    window.removeEvent(fixEV, keyPressThis), $("frigate-overlay").destroy();
  } catch (a) {
  }
}};
function okErr(a, b) {
  (new SimpleModal({btn_ok:l("messAlertClose"), onClose:b})).show({title:l("messAlertError"), contents:a});
}
function frigateSaveSiteStep2(a, b, c, d, e, f) {
  a.s ? -2 == c && -1 == a.s || -1 == c && -1 == a.s && -1 != a.h2.search(/(4|5)\d\d/g) || !(0 > c) && -1 == a.s ? !siteList.on || d && !siteList.d[d].on ? (d ? siteList.d[d].u = c : siteList.d.push({h:b, u:c, on:!0}), lsList[params.id] = siteList, ls.set("list", lsList), e.apply(), f.apply()) : (a = function(a) {
    chrome[runtimeOrExtension].sendMessage({type:"frigatelist", value:{act:"url", host:b, url:c, list:siteList.n, lid:params.id, "new":"" == preedithost}}, function(a) {
      d ? siteList.d[d].u = c : (siteList.d.push({h:b, u:c, on:!0}), d = siteList.d.length - 1);
      lsList[params.id] = siteList;
      ls.set("list", lsList);
      e.apply();
      f.apply();
    });
  }, preedithost ? chrome[runtimeOrExtension].sendMessage({type:"frigatelist", value:{act:"delurl", host:preedithost, url:preediturl, notApply:!0}}, a) : a.apply()) : -3 == a.s ? okErr(l("messListsFileNotFound"), f) : okErr(l("messListsNoAlg"), f) : okErr(l("messListsSomethingHappened"), f);
}
function intertld(a) {
  return intertldreg.test(a);
}
function frigateSaveSite(a, b, c, d, e, f) {
  !a && d && (a = siteList.d[d].h);
  a = a.toLowerCase();
  var m = "", h = "http://", n = h, p = "";
  0 == a.indexOf("http") && (0 == a.indexOf("https") && (h = "https://"), a = a.substring(h.length));
  0 == a.indexOf("*.") && (a = a.substring(2), m = "*.");
  a = a.split(/\/+/g)[0];
  intertld(a) && (a = punycode.ToUnicode(a));
  if (checkUrl(h + a + "/")) {
    var q = !1, k = siteList.d;
    unicode.test(a) && (a = punycode.ToASCII(a));
    var t = m + a;
    Object.each(k, function(a, b) {
      a.h == t && (d && d == b || (q = !0));
    });
    if (q) {
      okErr(l("messListsSiteUrlAlrIs"), f);
    } else {
      b = b.trim();
      k = !1;
      if (2 == c) {
        if (b && (0 == b.search(/http/i) && (0 == b.search(/https/i) && (n = "https://"), b = b.substring(n.length)), 0 != b.indexOf("/") && (h = new RegExp(escapeRegExp(a), "i"), b = 0 == b.search(h) ? b.substring(a.length) : "/" + b), checkUrl(n + a + b))) {
          var r = n + a + b;
          p = "comp404=1&";
          k = !0;
        }
      } else {
        3 == c ? b = -2 : (b = -1, r = genRandFile(h, a), p = "noh=1&"), k = !0;
      }
      !1 !== k ? chrome[runtimeOrExtension].sendMessage({type:"frigatelist", value:{act:"churl", host:a, "new":"" == preedithost}}, function(g) {
        if (g && "friGate" != g && g != params.id) {
          g == 1 * g && lsList && 0 < lsList.length && (siteList = lsList[g], g = siteList.n), okErr(l("messListsSiteUrlAlrIs2") + ' <b>"' + g + '"</b>. ' + l("messListsSiteUrlAlrIs3"), f);
        } else {
          if (3 == c) {
            frigateSaveSiteStep2({s:-1}, m + a, b, d, e, f);
          } else {
            g = function(c) {
              frigateSaveSiteStep2(c, m + a, b, d, e, f);
            };
            var h = Base64.encode(XXTEA.encrypt(r, "kq6V2PeWMBTpg9aR"));
            getUrl(urlForGetSize, "post", p + "u=" + encodeURIComponent(h), g, g, g);
          }
        }
      }) : okErr(l("messListsSiteUrlFormat"), f);
    }
  } else {
    okErr(l("messListsSiteHostFormat"), f);
  }
}
function frigateSaveIteamList(a) {
  var b = $("list" + a).getElements("td")[2].getElement("input").value.trim();
  b != preediturl ? frigateSaveSite(!1, b, $("typecheck" + a).getSelected().get("value"), a, $empty, function() {
    preedithost = preediturl = "";
    frigateOverlay.hide();
    frigateShowIteamList(a);
  }) : (frigateOverlay.hide(), frigateShowIteamList(a));
}
function frigateShowIteamList(a) {
  var b = $("list" + a).getElements("td");
  genHost(a, siteList.d[a]).replaces(b[1]);
  b[2].empty().grab(new Element("a", {text:cutUrl(siteList.d[a].u), "class":"nolink", rel:a, href:"", events:{click:noact, dblclick:frigateEditList}}));
  genAct(a).replaces(b[3]);
  -5 == siteList.d[a].u && b[4].empty();
}
function frigateDelList(a) {
  a && a.stop();
  (new SimpleModal({btn_ok:l("messListsConfirmOK"), btn_cancel:l("messListsConfirmCancel")})).show({model:"confirm", callback:function() {
    chrome[runtimeOrExtension].sendMessage({type:"frigatelist", value:{act:"delurl", host:siteList.d[this.rel].h, url:siteList.d[this.rel].u}}, function() {
    });
    delete siteList.d[this.rel];
    siteList.d = siteList.d.clean();
    lsList[params.id] = siteList;
    ls.set("list", lsList);
    showList();
  }.bind(this), title:l("messModalConfirmTitle"), contents:l("messListsConfirmDelSite") + "<strong>" + siteList.n + "</strong> " + l("messAreYouSure")});
}
function frigateOnOffList(a) {
  a && a.stop();
  a = function(a) {
    siteList.d[this.rel].on ? (this.set("class", "off"), siteList.d[this.rel].on = !1) : (this.set("class", "on"), siteList.d[this.rel].on = !0);
    lsList[params.id] = siteList;
    -5 != siteList.d[this.rel].u && ls.set("list", lsList);
  };
  siteList.on ? "undefined" != typeof siteList.d[this.rel].on && siteList.d[this.rel].on ? chrome[runtimeOrExtension].sendMessage({type:"frigatelist", value:{act:"delurl", host:siteList.d[this.rel].h, url:siteList.d[this.rel].u}}, a.bind(this)) : chrome[runtimeOrExtension].sendMessage({type:"frigatelist", value:{act:"url", host:siteList.d[this.rel].h, list:siteList.n, lid:params.id, url:siteList.d[this.rel].u}}, a.bind(this)) : a.apply(this);
}
function frigateEditList(a) {
  a && a.stop();
  if (-5 != siteList.d[this.rel].u) {
    a = function(a, b) {
      return -1 == a.u && 1 == b ? "selected" : -2 == a.u && 3 == b ? "selected" : 0 > a.u || 2 != b ? "" : "selected";
    };
    var b = $("list" + this.rel).getElements("td");
    frigateOverlay.show(this.rel);
    var c = new Element("select", {id:"typecheck" + this.rel, "class":"select3"});
    c.grab(new Element("option", {text:l("messTypeCh2"), value:2, selected:a(siteList.d[this.rel], 2)}));
    c.grab(new Element("option", {text:l("messTypeCh3"), value:3, selected:a(siteList.d[this.rel], 3)}));
    var d = new Element("input", {id:"sitehost" + this.rel, "class":"inpedit3" + function(a) {
      return -1 == a.u || -2 == a.u ? " hide" : "";
    }(siteList.d[this.rel]), value:function(a) {
      return -1 == a.u || -2 == a.u ? "" : a.u;
    }(siteList.d[this.rel])});
    c.addEvent("change", function() {
      2 == this.getSelected().get("value") ? d.removeClass("hide") : d.addClass("hide");
    });
    b[2].empty().grab(c);
    b[2].grab(d);
    b[3].empty().grab(new Element("a", {href:"", "class":"save2", rel:this.rel, events:{click:function(a) {
      a && a.stop();
      frigateSaveIteamList(this.rel);
      return !1;
    }}}));
    preedithost = siteList.d[this.rel].h;
    preediturl = siteList.d[this.rel].u;
  }
  return !1;
}
function cutUrl(a) {
  if (-1 == a) {
    return l("messTypeCh1");
  }
  if (-2 == a) {
    return l("messTypeCh3");
  }
  if (-5 == a) {
    return l("messFromList") + " friGate";
  }
  splitUrl = a.split(/\/+/g);
  delemiterUrl = 3 < splitUrl.length ? "/.../" : "/";
  return splitUrl[0] + delemiterUrl + splitUrl[splitUrl.length - 1];
}
function genAct(a) {
  var b = new Element("td", {"class":"text-right"});
  -5 != siteList.d[a].u && (b.grab(new Element("a", {href:"", "class":"edit", rel:a, events:{click:frigateEditList}})), b.grab(new Element("a", {href:"", "class":"trbut", rel:a, events:{click:frigateDelList}})));
  return b;
}
function genHost(a, b) {
  var c = getClHost(b.h), d = b.h;
  intertld(b.h) && (d = punycode.ToUnicode(b.h));
  return (new Element("td")).grab(new Element("img", {src:"http://" + c + "/favicon.ico", width:18, styles:{"vertical-align":"middle", "margin-right":"5px", display:"inline-block", "padding-bottom":"1px"}, events:{error:function() {
    this.set("src", "im/folder.png");
  }}})).grab(new Element("a", {text:d, "class":"nolink bold", rel:a, href:"http://" + c, target:"_blank", styles:{}, events:{}}));
}
function showList() {
  var a = siteList.d, b = $("list_list").empty();
  if (a && 0 < a.length) {
    a.sort(function(a, b) {
      ah = getClHost(a.h);
      bh = getClHost(b.h);
      intertld(ah) && (ah = punycode.ToUnicode(ah));
      intertld(bh) && (bh = punycode.ToUnicode(bh));
      return ah == bh ? 0 : ah < bh ? -1 : 1;
    });
    var c = 0, d = "", e;
    tableObj = new Element("table", {});
    Object.each(a, function(a, b) {
      c += 1;
      d = c % 2 ? "odd" : "even";
      tr = new Element("tr", {"class":d, id:"list" + b});
      tr.grab(new Element("td", {text:c}));
      tr.grab(genHost(b, a));
      -5 != a.u && (tr.grab((new Element("td")).grab(new Element("a", {text:cutUrl(a.u), "class":"nolink", rel:b, href:"", events:{click:noact, dblclick:frigateEditList}}))), tr.grab(genAct(b)));
      e = "undefined" != typeof a.on && a.on ? "on" : "off";
      tr.grab((new Element("td", {"class":"text-center"})).grab(new Element("a", {href:"", "class":e, rel:b, events:{click:frigateOnOffList}})));
      tableObj.grab(tr);
    });
    b.grab(tableObj);
  } else {
    b.grab((new Element("ul")).grab((new Element("li")).appendText(l("messListsEmpty"))));
  }
}
var params = {};
window.addEvent("domready", function() {
  for (var a = window.location.search.substr(1).split("&"), b = 0; b < a.length; b++) {
    var c = a[b].split("=");
    params[c[0]] = c[1];
  }
  document.title = "friGate - " + l("mess_option");
  $("header").appendText("friGate - " + l("messLists"));
  $("community").appendText(l("messCommunity"));
  $("back").appendText(l("messBack"));
  if (-1 == params.id) {
    $("stylized-form").addClass("hide");
  } else {
    $("algDesc").set("html", l("messListsAlgDesc"));
    $("addsite").appendText(l("messListsAddSite"));
    $("site").set("placeholder", l("messListsAddSiteDomain"));
    var d = $("url");
    d.set("placeholder", l("messListsAddSiteFile"));
    var e = $("typecheck").getChildren("option");
    e[0].set("text", l("messTypeCh3"));
    e[0].set("value", "3");
    e[1].set("text", l("messTypeCh2"));
    e[1].set("value", "2");
    $("typecheck").addEvent("change", function() {
      2 == this.value ? d.removeClass("hide") : d.addClass("hide");
    });
  }
  -1 == params.id ? chrome[runtimeOrExtension].sendMessage({type:"frigate", value:"getfrlist"}, function(a) {
    var b = [];
    Object.each(a, function(a, c) {
      a.hasOwnProperty("lid") && -1 < a.lid || (c = {h:c, u:-5, on:!0}, 0 > a.ons && (c.on = !1), b.push(c));
    });
    siteList = {n:"friGate list", on:!0, d:b};
    $("listname").set("text", "friGate");
    showList();
  }) : ((lsList = ls.get("list")) && 0 < lsList.length && (siteList = lsList[params.id], $("listname").set("text", siteList.n)), showList());
  $("addsite").addEvent("click", function(a) {
    a.stop();
    this.setStyle("visibility", "hidden");
    $("sendWite").setStyle("visibility", "visible");
    site = $("site").value.trim();
    url = $("url").value.trim();
    frigateSaveSite(site, url, $("typecheck").getSelected().get("value"), !1, function() {
      showList(siteList.d);
      $("site").value = "";
      d.value = "";
      d.addClass("hide");
      e[0].set("selected", "selected");
    }, function() {
      $("sendWite").setStyle("visibility", "hidden");
      this.setStyle("visibility", "visible");
    }.bind(this));
  });
});

