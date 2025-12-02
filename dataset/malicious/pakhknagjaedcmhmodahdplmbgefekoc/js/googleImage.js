function geturl(){
var rgs = document.getElementsByClassName('rg_l'); 
var count = 0;

var res = '';
var def = '';
var url = [];
var j = 0;
for (var i = 0; i < rgs.length && count < 50; i++) {
    var href = rgs[i].href;
    if (!href.match(/imgurl=.+&imgrefurl/))
        continue;
    var width = parseInt(rgs[i].getElementsByClassName('rg_an')[0].innerText.match(/\d+/g)[0]);
    var height = parseInt(rgs[i].getElementsByClassName('rg_an')[0].innerText.match(/\d+/g)[1]);
    if (width < 1280 || width > 3000 || width/height<1.4)
        continue;
    href = decodeURIComponent(href.match(/imgurl=.+&imgrefurl/)[0].replace(/imgurl=|&imgrefurl/g, ''));
    if (count ==0) {
        res = '"'+href;
    } else {
        res = res + '","' + href;
    }
    url[j++] = href;
    if (count < 6) {
        if (count ==0) {
            def = '"'+href;
        } else {
            def = def + '","' + href;
        }
    }
    count++;
}

res = res+'"';
def = def+'"';
console.log('{"source_url":['+res+'],"default_url":['+def+']}');
chrome.runtime.sendMessage({what:"storeUrl",value:url});
//fengSetOnclick("1",'{"source_url":['+res+'],"default_url":['+def+']}')
}


$('#choose').click(function(){
	setTimeout(geturl,5000);
	
});