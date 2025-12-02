$('#no').click(function(){
	chrome.runtime.sendMessage({what:"fivestar_next_no"});
})
$('#sure').click(function(){
	chrome.runtime.sendMessage({what:"fivestar_next_sure"});
})
$('[msg-name]').each(function(){
	var ele = $(this);
	var messageName = ele.attr('msg-name');
	ele.text(chrome.i18n.getMessage(messageName));
//	chrome.runtime.sendMessage({what:"change_option"});
});