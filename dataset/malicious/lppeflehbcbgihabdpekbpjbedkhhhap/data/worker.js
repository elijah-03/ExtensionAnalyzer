let screen;
function getPopupId(e) {
    return new Promise((o) => {
        const t = `popup_${e}`;
        chrome.storage.local.get([t], (e) => {
            o(e[t]);
        });
    });
}
function savePopupId(e, o) {
    return new Promise((t) => {
        const n = `popup_${e}`;
        chrome.storage.local.set({ [n]: o }, t);
    });
}
function getWindow(e) {
    return new Promise((o) => {
        chrome.windows.get(e, o);
    });
}
function createPopup(e) {
    return new Promise((o) => {
        let t;
        (t = navigator.platform.includes("Win") ? 434 : 420),
            chrome.windows.create(
                {
                    type: "popup",
                    url: "/popup.html?tabId=" + e,
                    focused: !0,
                    height: 310,
                    width: t,
                    left: screen.width - t,
                },
                (e) => o(e.id)
            );
    });
}
chrome.system.display.getInfo(null, (e) => {
    screen = e[0].bounds;
}),
    chrome.action.onClicked.addListener(async (e) => {
        if (!e.id) return;
        const o = await getPopupId(e.id);
        if (o) {
            if (await getWindow(o))
                return chrome.windows.update(o, { focused: !0 });
        }
        const t = await createPopup(e.id);
        await savePopupId(e.id, t);
    });
