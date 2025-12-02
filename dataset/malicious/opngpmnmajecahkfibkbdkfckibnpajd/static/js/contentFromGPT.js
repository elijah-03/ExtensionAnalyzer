chrome.runtime.sendMessage({
    action: "GET_USER_THEME"
}, (function(e) {
    var n;
    n = "auto" === e ? window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : e, 
    window.localStorage.setItem("theme", n);
})), chrome.runtime.onMessage.addListener((function(e, n, a) {
    return "SHOW_BANNER" === e.action && function(e) {
        if (!document.querySelector(".appl1_sgpt_banner")) {
            var n = document.createElement("div");
            n.className = "appl1_sgpt_banner";
            var a = document.createElement("p");
            a.className = "appl1_sgpt_banner_text", a.innerText = "You have successfully passed authorization. Now you can go back or click";
            var t = document.createElement("div");
            t.className = "appl1_sgpt_banner_btn", t.innerText = "Go back";
            var c = document.createElement("div");
            c.className = "appl1_sgpt_banner_cross", a.appendChild(t), a.appendChild(c), n.appendChild(a), 
            document.body.prepend(n), chrome.runtime.sendMessage({
                action: "RELOAD_APP",
                tabId: e
            }), t.addEventListener("click", (function() {
                chrome.runtime.sendMessage({
                    action: "FOCUS_TAB",
                    tabId: e
                }), r();
            })), c.addEventListener("click", (function() {
                r();
            }));
        }
        function r() {
            document.querySelector(".appl1_sgpt_banner").remove();
        }
    }(e.idTab), !0;
}));