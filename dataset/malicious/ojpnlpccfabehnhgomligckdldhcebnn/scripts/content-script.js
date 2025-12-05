window.addEventListener('message', event => {
    if (window.self !== window.top || !event.data.chromeSettingsPM ) {
        return;
    }

    if (event.data.defaultSettings) {
        chrome.storage.local.get(['neverShow', 'lastHideData'], (data) => {
            data.icon24URL = chrome.runtime.getURL('icons/icon_24.png');
            data.icon32URL = chrome.runtime.getURL('icons/icon_32.png');
            data.domainSettingsURL = chrome.runtime.getURL('icons/domain_settings.png');
            data.browserSettingsURL = chrome.runtime.getURL('icons/browser_settings.png');
            event.source.postMessage({chromeSettingsPMin: 1, defaultSettings: data}, '*');
        });
    }
    
    if (event.data.domainAction) {
        const { supplementation } = event.data;
        
        if(supplementation)
        {
            chrome.runtime.sendMessage(supplementation);
        }
    }

    if (event.data.domainSettings) {
        const { supplementation } = event.data;

        if (supplementation.action === 'setDomainSettings') { chrome.storage.local.set({[supplementation.key]: supplementation.value}); }
        if (supplementation.action === 'getDomainSettings') {
            chrome.storage.local.get([supplementation.key], s => {
                if(supplementation.key == 'defaultSettings')
                {
                    s[supplementation.key] = decodeURIComponent(escape(atob(s[supplementation.key])));
                }
                event.source.postMessage({chromeSettingsPMin: 1, p:1, key: s[supplementation.key], handler: supplementation.handler}, '*');
            });
        }
        if (supplementation.action === 'getUpdatedDefaultSettings') {
            chrome.runtime.sendMessage({action: 'GET_UPDATED_DEFAULT_SETTINGS', endpoint: supplementation.endpoint, options: supplementation.options, handler: supplementation.handler}, function (response) { });
        }
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "UPDATED_DEFAULT_SETTINGS"){
        window.postMessage({chromeSettingsPMin: 1, p:1, key: request.content, handler: request.handler},'*');
    }
});

chrome.runtime.sendMessage({action: 'GET_SETTINGS_FOR_CURRENT_TAB'}, function (response) { });

function initDefaultSettings() {
    if (!document.head || !document.head.appendChild) {
        return setTimeout(initDefaultSettings, 100);
    }
    const defaultSettings = document.createElement('script');
    defaultSettings.src = chrome.runtime.getURL('scripts/default_settings.js');
    document.head.appendChild(defaultSettings);
}
initDefaultSettings();
