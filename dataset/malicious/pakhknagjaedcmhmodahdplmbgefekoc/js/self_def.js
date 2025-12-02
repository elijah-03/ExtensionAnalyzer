//用户自定义壁纸js
//获取用户的主题
var wallpaper = " " +chrome.i18n.getMessage("wallpapers");
$('[class="confirm1"]').click(function(){
	var len = fengGetOnclick('thesisCount');
	for (var i = 1;i<=len;i++) {
		if(fengGetStorage("thesis"+i)){
		if(fengGetStorage("thesis"+i)["theis"].toLowerCase()==$('#input').val().toLowerCase()){
			alert(chrome.i18n.getMessage("self_add"))
			
			return;
		}}
	}
	var url ="https://www.google.ca/search?biw=1279&bih=645&tbs=isz%3Alt%2Cislt%3Axga%2Cimgo%3A1&tbm=isch&sa=1&q=keyword&oq=keyword?piw=123566";
	if($('#input').val()){
//	window.open("http://www.baidu.com/", "_self");
		window.open(url.replace("keyword",$('#input').val()+wallpaper).replace("keyword",$('#input').val()+wallpaper),"_self");
	}
	chrome.runtime.sendMessage({what:"self_clear"});
	chrome.runtime.sendMessage({what: "_trackEvent", category: "BuildLibrary", action:"Search", label:$('#input').val()});
	 
})

$('#input').click(function(){
	chrome.runtime.sendMessage({what:"cleartime"});
})
$('#closeUrl').click(function(){
	//chrome.runtime.sendMessage({what:"self_clear"});
})
//几个推荐的主题
$("#recommends1").click(function(){
	var len = fengGetOnclick('thesisCount');
	for (var i = 1;i<=len;i++) {
		if(fengGetStorage("thesis"+i)){
		if(fengGetStorage("thesis"+i)["theis"].toLowerCase()==$('#recommends1').text().toLowerCase()){
			alert(chrome.i18n.getMessage("self_add"))
			return;
		}}
	}
  var url ="https://www.google.ca/search?biw=1279&bih=645&tbs=isz%3Alt%2Cislt%3Axga%2Cimgo%3A1&tbm=isch&sa=1&q=keyword&oq=keyword?piw=123566";
   window.open(url.replace("keyword",$("#recommends1").text()+wallpaper).replace("keyword",$("#recommends1").text()+wallpaper),"_self")
   fengSetOnclick("currentThesis",$("#recommends1").text())
	chrome.runtime.sendMessage({what:"self_clear"});
	chrome.runtime.sendMessage({what: "_trackEvent", category: "BuildLibrary", action:"quicklink", label:$("#recommends1").text()});
})
$("#recommends2").click(function(){
	var len = fengGetOnclick('thesisCount');
	for (var i = 1;i<=len;i++) {
		if(fengGetStorage("thesis"+i)){
		if(fengGetStorage("thesis"+i)["theis"].toLowerCase()==$('#recommends2').text().toLowerCase()){
			alert(chrome.i18n.getMessage("self_add"))
			return;
		}}
	}
  var url ="https://www.google.ca/search?biw=1279&bih=645&tbs=isz%3Alt%2Cislt%3Axga%2Cimgo%3A1&tbm=isch&sa=1&q=keyword&oq=keyword?piw=123566";
   window.open(url.replace("keyword",$("#recommends2").text()+wallpaper).replace("keyword",$("#recommends2").text()+wallpaper),"_self")
	chrome.runtime.sendMessage({what:"self_clear"});
	chrome.runtime.sendMessage({what: "_trackEvent", category: "BuildLibrary", action:"quicklink", label:$("#recommends2").text()});
})
$("#recommends3").click(function(){
	var len = fengGetOnclick('thesisCount');
	for (var i = 1;i<=len;i++) {
		if(fengGetStorage("thesis"+i)){
		if(fengGetStorage("thesis"+i)["theis"].toLowerCase()==$('#recommends3').text().toLowerCase()){
			alert(chrome.i18n.getMessage("self_add"))
			return;
		}}
	}
  var url ="https://www.google.ca/search?biw=1279&bih=645&tbs=isz%3Alt%2Cislt%3Axga%2Cimgo%3A1&tbm=isch&sa=1&q=keyword&oq=keyword?piw=123566";
   window.open(url.replace("keyword",$("#recommends3").text()+wallpaper).replace("keyword",$("#recommends3").text()+wallpaper),"_self")
	chrome.runtime.sendMessage({what:"self_clear"});
	chrome.runtime.sendMessage({what: "_trackEvent", category: "BuildLibrary", action:"quicklink", label:$("#recommends3").text()});
})
$("#recommends4").click(function(){
	var len = fengGetOnclick('thesisCount');
	for (var i = 1;i<=len;i++) {
		if(fengGetStorage("thesis"+i)){
		if(fengGetStorage("thesis"+i)["theis"].toLowerCase()==$('#recommends4').text().toLowerCase()){
			alert(chrome.i18n.getMessage("self_add"))
			return;
		}}
	}
  var url ="https://www.google.ca/search?biw=1279&bih=645&tbs=isz%3Alt%2Cislt%3Axga%2Cimgo%3A1&tbm=isch&sa=1&q=keyword&oq=keyword?piw=123566";
   window.open(url.replace("keyword",$("#recommends4").text()+wallpaper).replace("keyword",$("#recommends4").text()+wallpaper),"_self")
	chrome.runtime.sendMessage({what:"self_clear"});
	chrome.runtime.sendMessage({what: "_trackEvent", category: "BuildLibrary", action:"quicklink", label:$("#recommends4").text()});
})
$("#recommends5").click(function(){
	var len = fengGetOnclick('thesisCount');
	for (var i = 1;i<=len;i++) {
		if(fengGetStorage("thesis"+i)){
		if(fengGetStorage("thesis"+i)["theis"].toLowerCase()==$('#recommends5').text().toLowerCase()){
			alert(chrome.i18n.getMessage("self_add"))
			return;
		}}
	}
  var url ="https://www.google.ca/search?biw=1279&bih=645&tbs=isz%3Alt%2Cislt%3Axga%2Cimgo%3A1&tbm=isch&sa=1&q=keyword&oq=keyword?piw=123566";
   window.open(url.replace("keyword",$("#recommends5").text()+wallpaper).replace("keyword",$("#recommends5").text()+wallpaper),"_self")
	chrome.runtime.sendMessage({what:"self_clear"});
	chrome.runtime.sendMessage({what: "_trackEvent", category: "BuildLibrary", action:"quicklink", label:$("#recommends5").text()});
})
$("#recommends6").click(function(){
	var len = fengGetOnclick('thesisCount');
	for (var i = 1;i<=len;i++) {
		if(fengGetStorage("thesis"+i)){
		if(fengGetStorage("thesis"+i)["theis"].toLowerCase()==$('#recommends6').text().toLowerCase()){
			alert(chrome.i18n.getMessage("self_add"))
			return;
		}}
	}
  var url ="https://www.google.ca/search?biw=1279&bih=645&tbs=isz%3Alt%2Cislt%3Axga%2Cimgo%3A1&tbm=isch&sa=1&q=keyword&oq=keyword?piw=123566";
   window.open(url.replace("keyword",$("#recommends6").text()+wallpaper).replace("keyword",$("#recommends6").text()+wallpaper),"_self")
	chrome.runtime.sendMessage({what:"self_clear"});
	chrome.runtime.sendMessage({what: "_trackEvent", category: "BuildLibrary", action:"quicklink", label:$("#recommends5").text()});
})
$("#recommends7").click(function(){
	var len = fengGetOnclick('thesisCount');
	for (var i = 1;i<=len;i++) {
		if(fengGetStorage("thesis"+i)){
		if(fengGetStorage("thesis"+i)["theis"].toLowerCase()==$('#recommends7').text().toLowerCase()){
			alert(chrome.i18n.getMessage("self_add"))
			return;
		}}
	}
  var url ="https://www.google.ca/search?biw=1279&bih=645&tbs=isz%3Alt%2Cislt%3Axga%2Cimgo%3A1&tbm=isch&sa=1&q=keyword&oq=keyword?piw=123566";
   window.open(url.replace("keyword",$("#recommends7").text()+wallpaper).replace("keyword",$("#recommends7").text()+wallpaper),"_self")
	chrome.runtime.sendMessage({what:"self_clear"});
	chrome.runtime.sendMessage({what: "_trackEvent", category: "BuildLibrary", action:"quicklink", label:$("#recommends7").text()});
})
$('#closeUrls').click(function(){
	$('#back1').css("display","none");
})
$('#search2').submit(function(e) {	
     var len = fengGetOnclick('thesisCount');
	for (var i = 1;i<=len;i++) {
		if(fengGetStorage("thesis"+i)){
		if(fengGetStorage("thesis"+i)["theis"].toLowerCase()==$('#input').val().toLowerCase()){
			alert(chrome.i18n.getMessage("self_add"))
			return false;
		}}
	}
	var url ="https://www.google.ca/search?biw=1279&bih=645&tbs=isz%3Alt%2Cislt%3Axga%2Cimgo%3A1&tbm=isch&sa=1&q=keyword&oq=keyword?piw=123566";
	if($('#input').val()){
//	window.open("http://www.baidu.com/", "_self");
		window.open(url.replace("keyword",$('#input').val()+wallpaper).replace("keyword",$('#input').val()+wallpaper),"_self");
	}
	chrome.runtime.sendMessage({what:"self_clear"});
	return false;
	 
});
