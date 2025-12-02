isD = !1;
var lsList = [], frList = {}, fixEV = "ie" != Browser.name ? "keydown" : "onkeydown";
function l(a) {
  return chrome.i18n.getMessage(a);
}
function isipv4(a) {
  a = a.split(/\:/g);
  return "undefined" != typeof a[1] && 65535 > a[1] && 0 < a[1] && /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(a[0]) ? !0 : !1;
}
function isipv6(a) {
  a = a.split(/\]:/g);
  return "undefined" != typeof a[1] && 65535 > a[1] && 0 < a[1] && (a = a[0].split(/\[/g), "undefined" != typeof a[1]) ? /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i.test(a[1]) : !1;
}
function okErr(a, b) {
  (new SimpleModal({btn_ok:l("messAlertClose"), onClose:b})).show({title:l("messAlertError"), contents:a});
}
function frigateDelProxy(a) {
  a && a.stop();
  a = ls.get("pr2");
  a = a.erase(this.rel);
  ls.set("pr2", a);
  showProxy();
  chrome[runtimeOrExtension].sendMessage({type:"frigate", value:"proxy"});
}
function showProxy() {
  var a = ls.get("pr2"), b = $("proxy_list").empty();
  a && 0 < a.length ? Array.each(a, function(a, c) {
    newval = a.replace("PROXY", "PROXY<strong>");
    newval = a.replace("SOCKS", "SOCKS<strong>");
    b.grab((new Element("div", {html:newval + "</strong>"})).grab(new Element("a", {text:" ", "class":"trbut", rel:a, events:{click:frigateDelProxy}}), "top"));
  }) : b.grab((new Element("ul")).grab((new Element("li")).appendText(l("mess_fgproxy"))));
}
function frigateDelList(a) {
  a && a.stop();
  a = 0 < lsList[this.rel].d.length ? l("messListsConfirmDelNoEmptyList") : l("messListsConfirmDelList");
  (new SimpleModal({btn_ok:l("messListsConfirmOK"), btn_cancel:l("messListsConfirmCancel")})).show({model:"confirm", callback:function() {
    chrome[runtimeOrExtension].sendMessage({type:"frigatelist", value:{act:"offlist", id:this.rel}}, function(a) {
      delete lsList[this.rel];
      lsList = lsList.clean();
      ls.set("list", lsList);
      showList();
    }.bind(this));
  }.bind(this), title:l("messModalConfirmTitle"), contents:a});
}
function frigateOnOffList(a) {
  a && a.stop();
  "undefined" != typeof lsList[this.rel].on && lsList[this.rel].on ? chrome[runtimeOrExtension].sendMessage({type:"frigatelist", value:{act:"offlist", id:this.rel}}, function(a) {
    this.set("class", "off");
    lsList[this.rel].on = !1;
    ls.set("list", lsList);
  }.bind(this)) : chrome[runtimeOrExtension].sendMessage({type:"frigatelist", value:{act:"onlist", id:this.rel}}, function(a) {
    this.set("class", "on");
    lsList[this.rel].on = !0;
    ls.set("list", lsList);
  }.bind(this));
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
function frigateSaveIteamList(a) {
  var b = $("listname" + a).value.trim();
  if (!b || /[^\u0400-\u04FF_\-a-z0-9]/ig.test(b)) {
    okErr(l("messOptListFormat"), $empty);
  } else {
    var d = !1;
    lsListlength = lsList.length;
    for (var c = 0; c < lsListlength; c++) {
      if (lsList[c].n == b && (!a || a && a != c)) {
        d = !0;
        break;
      }
    }
    d ? okErr(l("messOptListAlrIs"), $empty) : (a ? lsList[a].n = b : (c = lsList.length, lsList[c] = {n:b, on:!0, d:[]}, $("listname").value = ""), ls.set("list", lsList), frigateOverlay.hide(), frigateShowIteamList(a));
  }
}
function frigateShowIteamList(a) {
  a && $("list" + a).empty().set("html", '<h4><span class="folder">&nbsp;</span><a href="' + chrome.extension.getURL("list.html") + "?id=" + a + '">' + lsList[a].n + "</a>");
}
function frigateEditList(a) {
  a && a.stop();
  a = $("list" + this.rel).empty();
  frigateOverlay.show(this.rel);
  var b = new Element("input", {id:"listname" + this.rel, "class":"inpedit", value:lsList[this.rel].n});
  a.grab(b).grab(new Element("a", {href:"#", "class":"save", rel:this.rel, events:{click:function(a) {
    a && a.stop();
    frigateSaveIteamList(this.rel);
    return !1;
  }}}));
}
function showList() {
  lsList = ls.get("list");
  lsListShow = {};
  lsListShow[0] = frList;
  null == lsList || "object" != typeof lsList || 0 == lsList.length ? lsList = [] : Array.each(lsList, function(a, c) {
    lsListShow[c + 1] = a;
  });
  var a = $("list_list").empty();
  if (lsListShow && !emptyObject(lsListShow)) {
    list_table = new Element("table", {});
    var b = 0, d = "", c, g, f, h;
    Object.each(lsListShow, function(a, e) {
      b += 1;
      d = b % 2 ? "even" : "odd";
      c = Element("td", {text:a.d.length});
      tr = new Element("tr", {"class":d});
      g = new Element("td", {id:"list" + (e - 1), html:'<h4><span class="folder">&nbsp;</span><a href="' + chrome.extension.getURL("list.html") + "?id=" + (e - 1) + '">' + a.n + "</a></h4>"});
      tr = tr.grab(g);
      tr = tr.grab(c);
      0 == e ? tr.grab(new Element("td")).grab(new Element("td")) : (h = "undefined" != typeof a.on && a.on ? "on" : "off", f = new Element("td", {"class":"text-center"}), f.grab(new Element("a", {href:"#", "class":"edit", rel:e - 1, events:{click:frigateEditList}})), f.grab(new Element("a", {href:"#", "class":"trbut", rel:e - 1, events:{click:frigateDelList}})), tr.grab(f), tr.grab((new Element("td", {"class":"text-center"})).grab(new Element("a", {href:"#", "class":h, rel:e - 1, events:{click:frigateOnOffList}}))));
      list_table.grab(tr);
    });
    a.grab(list_table);
  } else {
    lsList = [], a.grab((new Element("ul")).grab((new Element("li")).appendText(l("messListsEmpty"))));
  }
}
window.addEvent("domready", function() {
  document.title = l("chrome_extension_sname") + " - " + l("mess_option");
  $("header").appendText(l("chrome_extension_sname") + " - " + l("mess_option"));
  $("header_proxy").appendText(l("mess_header_proxy"));
  $("header_alert").appendText(l("mess_header_alert"));
  $("header_adv").appendText(l("mess_header_adv"));
  $("header_opt").appendText(l("mess_header_opt"));
  $("header_anon").appendText(l("mess_header_anon"));
  $("header_tld").appendText(l("mess_header_tld"));
  $("isanon").appendText(l("mess_isanon"));
  $("isalert").appendText(l("mess_isalert"));
  $("isadv").appendText(l("mess_isadv"));
  $("addproxy").appendText(l("mess_addproxy"));
  $("ownproxy").appendText(l("mess_ownproxy"));
  $("community").appendText(l("messCommunity"));
  $("ownlist").appendText(l("messListsOwn"));
  $("messLists").appendText(l("messLists"));
  $("addlist").appendText(l("messAddList"));
  $("listname").set("placeholder", l("messListsName"));
  $("noalert").set("checked", ls.get("noalert"));
  $("noalert").addEvent("change", function() {
    ls.set("noalert", $("noalert").get("checked"));
    chrome[runtimeOrExtension].sendMessage({type:"frigate", value:"noalert"});
  });
  $("noadv").set("checked", ls.get("noadv"));
  $("noadv").addEvent("change", function() {
    ls.set("noadv", $("noadv").get("checked"));
    chrome[runtimeOrExtension].sendMessage({type:"frigate", value:"noadv"});
  });
  $("anon").set("checked", ls.get("a"));
  $("anon").addEvent("change", function() {
    ls.set("a", this.get("checked") ? 1 : 0);
    chrome[runtimeOrExtension].sendMessage({type:"frigate", value:"anon", val2:this.get("checked")});
  });
  getTld();
  var a = $("tld_list").empty(), b;
  for (b in tld) {
    if (tld.hasOwnProperty(b)) {
      var d = new Element("input", {type:"checkbox", id:b, checked:tld[b] ? "checked" : "", events:{mouseup:function() {
        tld[this.id] = !this.checked;
        setTld(tld);
        chrome[runtimeOrExtension].sendMessage({type:"frigate", value:"gettld"});
      }}});
      a.grab(d).appendText("." + b + " ");
    }
  }
  $("autochproxy").appendText(l("mess_autochproxy"));
  $("noautochproxy").set("checked", !ls.get("noAutoChangeProxy"));
  $("noautochproxy").addEvent("change", function() {
    ls.set("noAutoChangeProxy", this.get("checked") ? 0 : 1);
    chrome[runtimeOrExtension].sendMessage({type:"frigate", value:"noautochproxy", val2:!this.get("checked")});
  });
  showProxy();
  $("addproxy").addEvent("click", function(a) {
    a.stop();
    ip = $("proxy").value;
    if (isipv4(ip) || isipv6(ip)) {
      a = ls.get("pr2");
      if (!a || 1 > a.length) {
        a = [];
      }
      ip = $("frigateproxytypep").get("checked") ? "PROXY " + ip : "SOCKS " + ip;
      a = a.include(ip);
      ls.set("pr2", a);
      showProxy();
      $("proxy").value = "";
      chrome[runtimeOrExtension].sendMessage({type:"frigate", value:"proxy"});
    } else {
      okErr(l("mess_proxyformat_err"), $empty);
    }
  });
  chrome[runtimeOrExtension].sendMessage({type:"frigate", value:"getfrlist"}, function(a) {
    var b = [];
    Object.each(a, function(a, c) {
      a.hasOwnProperty("lid") && -1 < a.lid || b.push(a.h);
    });
    frList = {n:"friGate", on:!0, d:b};
    showList();
  });
  $("addlist").addEvent("click", function(a) {
    a.stop();
    frigateSaveIteamList("");
    showList();
  });
});

