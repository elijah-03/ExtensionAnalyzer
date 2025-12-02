var isGetMessageStart, frigateS2Start, mainWinIsShow, tabHost, tabId, tabUrl, runtimeOrExtensionFrigate = chrome.runtime && chrome.runtime.sendMessage ? "runtime" : "extension", empty = function() {
};
function generatePW(d) {
  var c, b = "";
  d || (d = 16);
  for (c = 0; c < d; c++) {
    b += "abcdefghijklmnopqrstuvwxyz".charAt(26 * Math.random());
  }
  return b;
}
var divid = generatePW(10), frigateRecStart = !1, frigateRecWinIsShow = !1;
if ("function" !== typeof frigate_rec) {
  var frigate_rec = function() {
    frigateRecStart = !0;
    chrome[runtimeOrExtensionFrigate].onMessage.addListener(function(d) {
      if (!frigateRecWinIsShow && d.hasOwnProperty("m1")) {
        frigateRecWinIsShow = !0;
        var c = localStorage.getItem("fr_no_show");
        if (!(0 > c || c > Date.now())) {
          c = document.createElement("div");
          c.setAttribute("id", divid);
          var b = '<div class="fr_div_1" style="position: fixed; top: 0px; left: 0px; display: table; width: 100%; height: 55px; line-height: normal; opacity: 1; z-index: 2147483647;"><div class="fr_div_2"><a class="fr_a_1" href="#" title="\u0417\u0430\u043a\u0440\u044b\u0442\u044c"><svg width="24" height="24" viewBox="0 0 80 80" class="fr_svg_1"><path fill="#000" d="M56.971 52.729L44.243 40l12.728-12.728-4.242-4.243L40 35.757 27.272 23.029l-4.243 4.243L35.757 40 23.029 52.729l4.243 4.242L40 44.243l12.729 12.728z"></path></svg></a></div><div class="fr_div_3"><div class="fr_div_4"><div class="fr_div_5"><div class="fr_div_6">{m1}</div><div class="fr_div_7"> {m2} </div><div class="fr_div_8"><span class="fr_span_8">{m3}</span> &nbsp;{m4}&nbsp; </div><a class="fr_a_2" href="{url}" target="_blank">{m5}</a></div></div></div><div class="fr_div_9"></div></div><style> .fr_span_8 { text-decoration: line-through; color: #F44336; } .fr_div_1 { animation: none 0s ease 0s 1 normal none running; backface-visibility: visible; background: transparent none repeat 0 0 / auto auto padding-box border-box scroll; border: medium none currentColor; border-collapse: separate; border-image: none; border-radius: 0; border-spacing: 0; bottom: auto; box-shadow: none; box-sizing: content-box; caption-side: top; clear: none; clip: auto; columns: auto; column-count: auto; column-fill: balance; column-gap: normal; column-rule: medium none currentColor; column-span: 1; column-width: auto; content: normal; counter-increment: none; counter-reset: none; direction: ltr; empty-cells: show; float: none; hyphens: none; letter-spacing: normal; list-style: disc outside none; margin: 0; max-height: none; max-width: none; min-height: 0; min-width: 0; orphans: 0; outline: medium none invert; overflow: visible; overflow-x: visible; overflow-y: visible; padding: 0; page-break-after: auto; page-break-before: auto; page-break-inside: auto; perspective: none; perspective-origin: 50% 50%; right: auto; tab-size: 8; table-layout: auto; text-align: inherit; text-align-last: auto; text-decoration: none solid currentColor; text-indent: 0; text-shadow: none; text-transform: none; transform: none; transform-origin: 50% 50% 0; transform-style: flat; transition: none 0s ease 0s; unicode-bidi: normal; vertical-align: baseline; visibility: visible; white-space: normal; widows: 0; word-spacing: normal; all: initial; background-color: #fcefb4; color: #000; cursor: pointer; margin-top: 0px; display: table !important; opacity: 1 !important; position: fixed; top: 0px; left: 0px; font-weight: normal; font: normal normal 14px Arial, sans-serif; width: 100%; height: 55px; line-height: normal; z-index: 2147483647; } .fr_div_1:hover { background-color: #ffeb91; } .fr_div_2 { display: table-cell; vertical-align: middle; } .fr_svg_1 { margin-left: 4px; margin-top: 10px; } .fr_div_3 { display: table-cell; vertical-align: middle; text-align: center; } .fr_div_4 { max-width: 1100px; display: inline-block; width: 100%; text-align: left; position: relative; } .fr_div_5 { display: block; -webkit-align-items: center; -webkit-flex-direction: row; display: -webkit-flex; display: flex; align-items: center; flex-direction: row; white-space: pre; } .fr_a_1 { width: 45px; opacity: 0.3; display: block; height: 45px; text-align: center; cursor: pointer; } .fr_a_1:hover { opacity: 0.7; } .fr_div_9 { width: 45px; display: table-cell; vertical-align: middle; } @media only screen and (max-width: 1150px) { .fr_div_4 { max-width: 960px; } } @media only screen and (max-width: 1050px) { .fr_div_4 { max-width: 810px; } .fr_a_1 { width: 24px; } .fr_div_9 { width: 24px; } } @media only screen and (max-width: 850px) { .fr_div_4 { max-width: 700px; } } .fr_div_6 { display: inline-block; font-size: 20px; font-weight: bold; margin: auto 10px; line-height: 23px; vertical-align: middle; } @media only screen and (max-width: 1150px) { .fr_div_6 { font-size: 18px; } } @media only screen and (max-width: 1050px) { .fr_div_6 { font-size: 14px; margin-left: 5px; margin-right: 5px; } } .fr_div_7 { display: inline-block; display: -webkit-flex; -webkit-flex-grow: 2; display: flex; flex-grow: 2; vertical-align: middle; overflow: hidden; } .fr_div_8 { vertical-align: middle; font-size: 20px; font-weight: bold; margin: auto 10px; line-height: 23px; color: #4b9f00; } .fr_div_8 * { font-weight: inherit; font-size: inherit; line-height: inherit; } @media only screen and (max-width: 1050px) { .fr_div_8 { font-size: 16px; margin-left: 5px; margin-right: 5px; } } .fr_a_2 { display: inline-block; vertical-align: middle; font-size: 16px; font-weight: bold; color: #FFF !important; margin: auto 10px; padding: 10px 25px; background-color: #4b9f00 !important; border-radius: 7px; text-decoration: none !important; } .fr_a_2:hover { background-color: #66ad26 !important; color: #FFF !important; } @media only screen and (max-width: 1050px) { .fr_a_2 { font-size: 14px; margin-left: 5px; margin-right: 5px; padding-left: 10px; padding-right: 10px; } }</style>'.replace(/fr_div/ig, 
          generatePW(10));
          var f = generatePW(10);
          b = b.replace(/fr_a/ig, f);
          b = b.replace(/fr_svg/ig, generatePW(10));
          b = b.replace(/fr_span/ig, generatePW(10));
          b = b.replace("{m1}", d.m1);
          b = b.replace("{m2}", d.m2);
          b = b.replace("{m3}", d.m3);
          b = b.replace("{m4}", d.m4);
          b = b.replace("{m5}", d.m5);
          b = b.replace("{url}", d.url);
          c.innerHTML = b;
          document.html.appendChild(c);
          document.getElementsByClassName(f + "_1")[0].onclick = function(b) {
            b = b || window.event;
            b.preventDefault();
            document.getElementById(divid).destroy();
            localStorage.setItem("fr_no_show", Date.now() + 1296E6);
          };
          document.getElementsByClassName(f + "_2")[0].onclick = function(b) {
            document.getElementById(divid).destroy();
            localStorage.setItem("fr_no_show", -1);
          };
          localStorage.setItem("fr_no_show", Date.now() + 72E6);
        }
      }
    });
  };
}
if ("function" !== typeof frigate_s2) {
  var frigate_s2 = function() {
    frigateS2Start = !0;
    var d = function(a) {
      a && a.stop();
      a = $("frigate_wr");
      a.setStyle("visibility", "hidden");
      a.removeClass("frigate_vi");
      $("frigate_wr2") || (a = (new Element("div", {id:"frigate_wr2"})).grab((new Element("div", {"class":"frigate_h", text:""})).grab(new Element("a", {"class":"frigate_link2", html:"&nbsp;", "data-tooltip":"open", events:{click:c}}))), document.html.grab(a), a.setStyle("visibility", "visible"));
      chrome[runtimeOrExtensionFrigate].sendMessage({type:"from_s2", tabHost:tabHost, value:!0});
    }, c = function(a) {
      a && a.stop();
      $("frigate_wr2").destroy();
      a = $("frigate_wr");
      a.setStyle("visibility", "visible");
      a.addClass("frigate_vi");
      chrome[runtimeOrExtensionFrigate].sendMessage({type:"from_s2", tabHost:tabHost, value:!1});
    }, b = function() {
      chrome[runtimeOrExtensionFrigate].sendMessage({type:"frigatetabon", tabHost:tabHost, url:tabUrl, tabId:tabId});
    }, f = function() {
      chrome[runtimeOrExtensionFrigate].sendMessage({type:"frigatetaboff", tabHost:tabHost, url:tabUrl, tabId:tabId});
    }, m = function() {
      chrome[runtimeOrExtensionFrigate].sendMessage({type:"chproxy", tabHost:tabHost, url:tabUrl, tabId:tabId});
    }, h = function() {
      mainWinIsShow || (mainWinIsShow = !0, document.html.grab((new Element("div", {id:"frigate_wr", styles:{display:"none"}, "class":"frigate_vi"})).grab((new Element("div", {id:"frigate_topbl"})).grab(new Element("div", {"class":"frigate_h", html:"friGate &nbsp;&nbsp;"})).grab((new Element("div", {id:"frigate_body"})).grab(new Element("div", {id:"frigate_list", "class":"frigate_highlight"})).grab(new Element("a", {id:"frigate_on", "class":"frigate_links frigate_off", html:"&nbsp;"})).grab(new Element("div", 
      {id:"frigate_dop", "class":"frigate_small"}))).grab((new Element("div", {id:"frigate_f"})).grab(new Element("a", {"class":"frigate_link", html:"&nbsp;", "data-tooltip":"close", events:{click:d}}))))));
    }, k = !1;
    chrome[runtimeOrExtensionFrigate].onMessage.addListener(function(a, c) {
      if ("showwait" == a.type) {
        h();
      } else {
        if ("s2" == a.type && a.value) {
          h();
          isGetMessageStart || (c = $("frigate_body"), window.addEvent("domready", function() {
            var a = new Class({Implements:[Options, Events], options:{min:0, mode:"vertical", max:0, container:window, onEnter:"", onLeave:empty, onTick:empty}, initialize:function(a) {
              this.setOptions(a);
              this.container = document.id(this.options.container);
              this.enters = this.leaves = 0;
              this.max = this.options.max;
              0 == this.max && (a = this.container.getScrollSize(), this.max = "vertical" == this.options.mode ? a.y : a.x);
              this.addListener();
            }, addListener:function() {
              this.inside = !1;
              this.container.addEvent("scroll", function() {
                var a = this.container.getScroll(), b = "vertical" == this.options.mode ? a.y : a.x;
                b >= this.options.min && b <= this.max ? (this.inside || (this.inside = !0, this.enters++, this.fireEvent("enter", [a, this.enters])), this.fireEvent("tick", [a, this.inside, this.enters, this.leaves])) : this.inside && (this.inside = !1, this.leaves++, this.fireEvent("leave", [a, this.leaves]));
              }.bind(this));
            }}), b = $("frigate_wr").set("tween", {duration:200}), c = function() {
              b.tween("opacity", 1);
            }, d = function() {
              b.tween("opacity", 0.5);
            }, e = {mouseenter:c, mouseleave:d};
            new a({min:30, max:window.getScrollSize().y + 1000, onLeave:function() {
              c();
              b.removeEvents(e);
            }, onEnter:function() {
              d();
              b.addEvents(e);
            }});
          }), a.u && c.grab(new Element("div", {html:a.u})), a.n && c.grab(new Element("div", {html:a.n})));
          c = $("frigate_list");
          var g = $("frigate_dop");
          var e = $("frigate_on");
          tabId = a.tabId;
          tabHost = a.tabHost;
          tabUrl = a.tabUrl;
          $("frigate_wr").setStyle("background", "none");
          c.setStyle("visibility", "visible");
          c.set("html", a.value.dop[2]);
          g.setStyle("visibility", "visible");
          g.set("html", a.value.dop[0]);
          e.setStyle("visibility", "visible");
          a.value.dop[1] && e.set("data-tooltip", a.value.dop[1]);
          3 == a.value.isonepage || 4 == a.value.isonepage ? (e.removeClass("frigate_off"), e.addClass("frigate_on")) : 1 == a.value.isonepage ? (e.removeClass("frigate_off"), e.addClass("frigate_on"), e.removeEvent("click", b), e.removeEvent("click", f), e.addEvent("click", f)) : (e.removeClass("frigate_on"), e.addClass("frigate_off"), e.removeEvent("click", b), e.removeEvent("click", f), e.addEvent("click", b));
          (3 == a.value.isonepage || 4 == a.value.isonepage || 1 == a.value.isonepage) && a.pr[1] && g.grab(new Element("a", {"class":"frigatel_" + a.pr[1] + " frigate_links", html:"&nbsp;", "data-tooltip":a.pr[0], events:{click:m}}));
          a.hide ? d() : $("frigate_wr").setStyle("visibility", "visible");
          isGetMessageStart = !0;
        } else {
          if ("s2r" == a.type && 0 < a.rep.length && !k) {
            k = !0;
            console.log(JSON.stringify(a.rep));
            var l = [];
            for (c = a.rep.length; c--;) {
              "undefined" != typeof a.rep[c] && (l[c] = RegExp(a.rep[c].f, "i"));
            }
            window.addEvent("domready", function() {
              for (var b = document.body, c = a.rep.length; c--;) {
                "undefined" != typeof a.rep[c] && (b.innerHTML = b.innerHTML.replace(l[c], a.rep[c].t));
              }
            });
          }
        }
      }
    });
  };
  mainWinIsShow = frigateS2Start = isGetMessageStart = !1;
}
frigateS2Start || frigate_s2();
frigateRecStart || frigate_rec();

