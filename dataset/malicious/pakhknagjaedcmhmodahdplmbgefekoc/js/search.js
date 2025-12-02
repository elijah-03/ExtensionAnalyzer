//搜索引擎的js
var search = fengGetOnclick("search");
if (search == '"yahoo"') {
	var search1 = "Yahoo";
} else if (search == '"google"') {
	var search1 = "Google";
} else if (search == '"bing"') {
	var search1 = "Bing";
} else if (search == '"baidu"') {
	var search1 = "Baidu";
}
$('#tip2').text(search1);
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.what == "search_change") {
			var searchs = fengGetOnclick("search");
			if (searchs == '"yahoo"') {
				var searchs1 = "Yahoo";
			} else if (searchs == '"google"') {
				var searchs1 = "Google";
			} else if (searchs == '"bing"') {
				var searchs1 = "Bing";
			} else if (searchs == '"baidu"') {
				var searchs1 = "Baidu";
			}
			$('#tip2').text(searchs1);
		}
	});
$('[msg-name]').each(function(){
	var ele = $(this);
	var messageName = ele.attr('msg-name');
	ele.text(chrome.i18n.getMessage(messageName));
//	chrome.runtime.sendMessage({what:"change_option"});
});