$('.close').click(function(){
	chrome.runtime.sendMessage({what:"close"});
	chrome.runtime.sendMessage({what: "_trackEvent", category: "upload", action:"error", label:"1"});
})
$('[msg-name]').each(function(){
	var ele = $(this);
	var messageName = ele.attr('msg-name');
	ele.text(chrome.i18n.getMessage(messageName));
//	chrome.runtime.sendMessage({what:"change_option"});
});