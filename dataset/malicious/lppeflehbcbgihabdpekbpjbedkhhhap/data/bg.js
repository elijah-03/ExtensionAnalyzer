(() => {
    "use strict";
    var e = void 0;
    function n(e, n) {
        return new Promise(function (i) {
            var o = "popup_" + e;
            chrome.storage.local.set(
                (function (e, n, i) {
                    return (
                        n in e
                            ? Object.defineProperty(e, n, {
                                  value: i,
                                  enumerable: !0,
                                  configurable: !0,
                                  writable: !0,
                              })
                            : (e[n] = i),
                        e
                    );
                })({}, o, n),
                i
            );
        });
    }
    chrome.system.display.getInfo(null, function (n) {
        e = n[0].bounds;
    }),
        chrome.action.onClicked.addListener(async function (i) {
            if (i.id) {
                var o,
                    t,
                    r = await ((o = i.id),
                    new Promise(function (e) {
                        var n = "popup_" + o;
                        chrome.storage.local.get([n], function (i) {
                            e(i[n]);
                        });
                    }));
                if (r)
                    if (
                        await ((t = r),
                        new Promise(function (e) {
                            chrome.windows.get(t, e);
                        }))
                    )
                        return chrome.windows.update(r, { focused: !0 });
                var a = await (function (n) {
                    return new Promise(function (i) {
                        var o = void 0;
                        (o = navigator.platform.includes("Win") ? 434 : 420),
                            chrome.windows.create(
                                {
                                    type: "popup",
                                    url: "/popup.html?tabId=" + n,
                                    focused: !0,
                                    height: 310,
                                    width: o,
                                    left: e.width - o,
                                },
                                function (e) {
                                    return i(e.id);
                                }
                            );
                    });
                })(i.id);
                await n(i.id, a);
            }
        });
})();
