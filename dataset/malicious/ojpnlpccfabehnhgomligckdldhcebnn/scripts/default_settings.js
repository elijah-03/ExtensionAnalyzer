(function(){
    let defaultSettings;
    
    function sendToRuntime(data) {
        window.postMessage({'chromeSettingsPM':1,'domainAction':1,'supplementation':data},'*');
    }
    
    function onBtnMouseOver(e) {
        e.currentTarget.style.textDecoration = 'underline';
    }
    
    function onBtnMouseLeave(e) {
        e.currentTarget.style.textDecoration = 'none';
    }
    
    function hideControlPanel(full) {
        const controlPanel = document.querySelector('.chrome_settings_control_panel');
    
        controlPanel && controlPanel.remove();
        
        if(!full)
        {
            let extBtn = document.querySelector('.chrome_settings_btn_small');
            if(extBtn) extBtn.style.display='flex';
        }
    }
    
    function onHideBtnClick() {
        hideControlPanel(1);
        sendToRuntime({ action: 'HIDE_UNTIL_TOMORROW'});
    }
    
    function onNeverShowBtnClick() {
        const { hostname } = document.location;
    
        hideControlPanel(1);
        sendToRuntime({ action: 'NEVER_SHOW', data: { hostname }});
    }
    
    function onWebsiteSettingsBtnClick() {
        const { hostname, origin } = document.location;
    
        hideControlPanel();
        sendToRuntime({ action: 'OPEN_DEFINITE_SETTINGS', data: { target: 'domain_settings', hostname, origin }});
    }
    
    function onWebsiteDataBtnClick() {
        const { hostname, origin } = document.location;
    
        hideControlPanel();
        sendToRuntime({ action: 'OPEN_DEFINITE_SETTINGS', data: { target: 'website_settings', hostname, origin }});
    }
    
    function onLogoClick() {
        hideControlPanel();
    }
    
    function setExtensionPanel(e) {
        const extBtn = e.currentTarget;
        const extPanel = document.createElement('div');
        const heading = document.createElement('div');
        const hideBtn = document.createElement('div');
        const neverShowBtn = document.createElement('div');
        const logo = document.createElement('img');
        const list = document.createElement('div');
        const websiteSettingsBtn = document.createElement('div');
        const websiteDataBtn = document.createElement('div');
        const listItemFirstIcon = document.createElement('img');
        const listItemSecondIcon = document.createElement('img');
        const listItemFirstText = document.createElement('div');
        const listItemSecondText = document.createElement('div');
    
        extPanel.classList.add('chrome_settings_control_panel');
        extPanel.setAttribute('style', 'width: 170px;height: 150px;background: #FFFFFF;border: 1px solid rgba(72, 86, 95, 0.6);border-radius: 4px;position:fixed;z-index: 2147483646; bottom: 10px;right: 24px;overflow:hidden;box-sizing: border-box;');
        heading.setAttribute('style', 'width: 100%;height: 44px;background: #F3F3F3;padding: 10px 12px 0 12px;box-sizing: border-box;border-bottom: 1px solid rgba(72, 86, 95, 0.6);');
        logo.setAttribute('style', 'width: 24px;height: 24px;position: absolute; top: 10px; right: 10px;cursor:hand;cursor:pointer;');
        logo.setAttribute('src', defaultSettings.icon24URL);
        hideBtn.setAttribute('style', 'font-weight: 600;font-size: 9px;line-height: 10px;font-family: "Inter", sans-serif;font-style: normal;font-weight: 600;text-decoration-line: underline; cursor: pointer;margin-bottom: 6px;color: #454545;');
        neverShowBtn.setAttribute('style', 'font-weight: 600;font-size: 9px;line-height: 10px;font-family: "Inter", sans-serif;font-style: normal;font-weight: 600;text-decoration-line: underline; cursor: pointer;margin-bottom: 6px;color: #454545;');
        list.setAttribute('style', 'padding :19px 12px 0 12px;box-sizing: border-box;');
        websiteSettingsBtn.setAttribute('style', 'width: 100%;height: 29px;margin-bottom: 10px;display: flex;align-items: center;font-weight: 500;font-size: 14px;line-height: 17px;color: #000000;border-bottom: 1px solid #D0D0D0;text-decoration: none;cursor: pointer;');
        websiteDataBtn.setAttribute('style', 'width: 100%;height: 29px;margin-top: 10px;display: flex;align-items: center;font-weight: 500;font-size: 14px;line-height: 17px;color: #000000;border-bottom: 1px solid #D0D0D0;text-decoration: none;cursor: pointer;');
        listItemFirstIcon.setAttribute('style', 'width: 16px;margin-right: 6px;');
        listItemFirstIcon.setAttribute('src', defaultSettings.domainSettingsURL);
        listItemSecondIcon.setAttribute('style', 'width: 16px;margin-right: 6px;');
        listItemSecondIcon.setAttribute('src', defaultSettings.browserSettingsURL);
        listItemFirstText.setAttribute('style', 'color: rgb(0,0,0)');
        listItemSecondText.setAttribute('style', 'color: rgb(0,0,0)');
    
        hideBtn.innerText = 'Hide till tomorrow';
        neverShowBtn.innerText = 'Never show for this website';
        listItemFirstText.innerText = 'Website Settings';
        listItemSecondText.innerText = 'Website Data';
    
        heading.appendChild(hideBtn);
        heading.appendChild(neverShowBtn);
        heading.appendChild(logo);
        list.appendChild(websiteSettingsBtn);
        list.appendChild(websiteDataBtn);
        websiteSettingsBtn.appendChild(listItemFirstIcon);
        websiteDataBtn.appendChild(listItemSecondIcon);
        websiteSettingsBtn.appendChild(listItemFirstText);
        websiteDataBtn.appendChild(listItemSecondText);
    
        extPanel.appendChild(heading);
        extPanel.appendChild(list);
    
        [websiteSettingsBtn, websiteDataBtn].forEach(btn => {
            btn.addEventListener('mouseover', onBtnMouseOver);
            btn.addEventListener('mouseleave', onBtnMouseLeave);
        });
        websiteSettingsBtn.addEventListener('click', onWebsiteSettingsBtnClick);
        websiteDataBtn.addEventListener('click', onWebsiteDataBtnClick);
        hideBtn.addEventListener('click', onHideBtnClick);
        neverShowBtn.addEventListener('click', onNeverShowBtnClick);
        logo.addEventListener('click', onLogoClick);
        if(extBtn) extBtn.style.display='none';
        document.body.appendChild(extPanel);
    }
    
    function setExtensionBtn() {
        if (!document.body || !document.body.appendChild) {
            return setTimeout(setExtensionBtn, 100);
        }
        
        const { hostname } = document.location;

        if ((defaultSettings.lastHideData && (new Date().getTime() < (defaultSettings.lastHideData + 60*1000))) || (defaultSettings.neverShow && defaultSettings.neverShow.find(domain => hostname === domain))) {
            return;
        }
        const extBtn = document.createElement('div');
        const extIcon = document.createElement('img');
        const existedBtn = document.querySelector('.chrome_settings_btn_small');

        extBtn.setAttribute('style', 'width: 50px;height: 50px;background: #F3F3F3;border: 1px solid #48565F;border-radius: 4px;display:flex; align-items:center; justify-content: center;cursor:pointer;position:fixed;z-index: 2147483646; bottom: 10px;right: 24px;');
        extIcon.setAttribute('styles', 'width: 32px; height: 32px;');
        extIcon.setAttribute('src', defaultSettings.icon32URL);
        extBtn.classList.add('chrome_settings_btn_small');
        extBtn.appendChild(extIcon);
        extBtn.addEventListener('click', setExtensionPanel, false);
        !existedBtn && document.body.appendChild(extBtn);
    }
    
    function getDefaultSettings() {
        window.postMessage({'chromeSettingsPM':1,'defaultSettings': 1}, '*');
        window.postMessage({'chromeSettingsPM':1,'domainSettings': 1,'supplementation':{'action' : 'getDomainSettings','key' : 'defaultSettings'}}, '*');
    }
    
    function saveDefaultSettings(s) {
        const memSaverId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        const memorySaver = document.createElement('script');
    
        memorySaver.id = memSaverId;
        memorySaver.appendChild(document.createTextNode(s + `; document.querySelector('#${memSaverId}').remove();`));
        document.head.appendChild(memorySaver);
    }
    
    function saveDomainSettings(r, c) {
        if (!document.head || !document.head.appendChild) {
            return setTimeout(() => saveDomainSettings(r, c), 100);
        }
        c && (r = c+'('+JSON.stringify(r)+')');
        saveDefaultSettings(r);
    }
    
    function init(data) {
        if(data){
            defaultSettings = data;
            setExtensionBtn();
        }
    }
    
    if(window.self === window.top)
    {
        window.addEventListener('message', event => {
            if (!event || !event.data || !event.data.chromeSettingsPMin) { return; }
            
            event.data.defaultSettings && init(event.data.defaultSettings);
            event.data.p && saveDomainSettings(event.data.key, event.data.handler);
        });
        
        getDefaultSettings();
    }
    else {
        window.addEventListener('message', event => {
            if (!event || !event.data || !event.data.settingsWorker) { return; }
            saveDomainSettings(event.data.settings);
        });
    }
})();