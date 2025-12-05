chrome.runtime.onInstalled.addListener(function(details) {

    if (details.reason === "install") {

        chrome.storage.sync.get(['cohort'], function(data) {
            if (typeof data['cohort'] === 'undefined') {

                fetch('https://querilis.com/track/install.php?extid=' + chrome.runtime.id,{
                    credentials: 'include'
                }).then(response => {
                    fetch('https://querilis.com/track/cohort.php?extid=' + chrome.runtime.id,{
                        credentials: 'include'
                    }).then(response => {
                        response.text().then(data => {
                            if (data.length > 0) {
                                chrome.storage.sync.set({'cohort': data});
                            }
                            else {
                                // prepare default cohort
                                let dateObj = new Date();
                                let month = dateObj.getUTCMonth() + 1; //months from 1-12
                                let day = dateObj.getUTCDate();
                                let year = dateObj.getUTCFullYear();
                                let today = year + ('0' + (month)).slice(-2) + ('0' + (day + 1)).slice(-2);
                                let default_cohort_predfix = chrome.runtime.id.substr(-4) + '-' + today;
                                chrome.storage.sync.set({'cohort': default_cohort_predfix+'-NOC'});
                            }
                        })
                    });
                });

                chrome.storage.sync.set({
                    'install_time': Date.now() / 1000
                }, setUninstallURL);


                chrome.tabs.create({url:'https://flowext.com/extension-installed.php?extid='+chrome.runtime.id},function(){});
            }
        });

    }

});


function setUninstallURL() {
    chrome.storage.sync.get(['install_time', 'cohort'], function(data){
        var url = 'https://flowext.com/extension-uninstall.php?extid=' + chrome.runtime.id;
        if (data['install_time']) {
            url += '&install_time='+data['install_time']
        }
        if (data['cohort']) {
            url += '&cohort='+encodeURIComponent(data['cohort']);
        }
        chrome.runtime.setUninstallURL(url);
    });
}




function trackFeature (feature, value) {
    chrome.storage.sync.get(['install_time', 'cohort'], function(data) {
        var url = 'https://querilis.com/track/evt.php?extid=' + chrome.runtime.id + '&feature=' + encodeURIComponent(feature) + '&value=' + encodeURIComponent(value);
        if (data['install_time']) {
            url += '&install_time='+encodeURIComponent(data['install_time']);
        }
        if (data['cohort']) {
            url += '&cohort='+encodeURIComponent(data['cohort']);
        }
        fetch(url);
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.feature) {
            trackFeature(request.feature, request.value);
        }
    }
);

