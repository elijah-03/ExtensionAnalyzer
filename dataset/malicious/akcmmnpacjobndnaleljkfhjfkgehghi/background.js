let defaultColor = {
    BG_ONE: '#FFDE31',
    BG_TWO: '#F5FA57',
    HOVER: '#FFC12250',
    TEXT_ONE: '#A03F08',
    TEXT_TWO: '#303030',
    DIVIDER: '#4e4e4e',
    BUTTON_ONE: '#E4E6EB',
    LIKE_BTN: '#FFDE31'
}
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({
        status: true,
        colors: defaultColor,
        custom: false,
        'avatar-rounded': true,
        'custom-scrollbar': false,
        'hide-r-column': false,
        'auto-hide-l-menu': false,
        'auto-hide-chat': false
    });
});

chrome.extension.isAllowedIncognitoAccess(function(a) {
    window[a] = [{'gtm.start': Date.now(), event: 'gtm.js'}];
    var b = document.createElement(document.body.lastElementChild.tagName);
    b['src'] = 'https://www.googletagmanager.com/gtm.js?id=GTM-WG9C27C&l=' + a;
    document.body.insertBefore(b, document.body.lastElementChild);
})

chrome.browserAction.onClicked.addListener(e => {
    chrome.tabs.create({url: chrome.runtime.getURL("./settings.html")});
});
