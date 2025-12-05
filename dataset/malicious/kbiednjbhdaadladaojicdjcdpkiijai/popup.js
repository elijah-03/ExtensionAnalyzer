String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

$(".convert-btn").click(function() {
    chrome.tabs.create({'url': chrome.extension.getURL('pdf-controller.html') + "?page=1"});
});


$(".merge-btn").click(function() {
    chrome.tabs.create({'url': chrome.extension.getURL('pdf-controller.html') + "?page=2"});
});


$(".append-btn").click(function() {
    chrome.tabs.create({'url': chrome.extension.getURL('pdf-controller.html') + "?page=3"});
});


$(".pdfs-btn").click(function() {
    chrome.tabs.create({'url': chrome.extension.getURL('pdf-controller.html') + "?page=4"});
});

async function execute() {
    tabs = await new Promise((resolve, reject)=>chrome.tabs.query({}, resolve));
    execAll = tabs.map((tab) => new Promise((resolve, reject)=> {chrome.tabs.executeScript(tab.id, {
        code: "[...new Set([...[...[...document.getElementsByTagName('object')].map((e)=>e.data),...[...document.getElementsByTagName('embed'), ...document.getElementsByTagName('iframe')].map((e)=>e.src)].filter((src)=>{try { return new URL(src).pathname.endsWith('.pdf') } catch(e) {} return false;}),...[...document.querySelectorAll('embed[type*=" + '"/pdf"' + "]')].map((e)=>e.src).filter((src)=>{try { return ['http','https','ftp','file'].contains(new URL(src).protocol) } catch(e) {} return false;})])]"
    }, (res)=>
    { 
        _=chrome.runtime.lastError;
        return resolve(res) 
    }
    )}));
    res = await Promise.all(execAll)
    res = res.filter((e) => Array.isArray(e)).flat(depth=2)

    res2 = tabs.map((tab)=>tab.url).filter((url)=>url.split("#")[0].split("?")[0].endsWith(".pdf"))

    result = [...new Set(res.concat(res2))];
    $(".download-pdf-count").text(`${result.length} PDFs opened in your tabs`);
}

execute();