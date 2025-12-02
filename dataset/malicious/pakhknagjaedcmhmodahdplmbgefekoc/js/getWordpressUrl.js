//从wordpress文章中获取主题图片的js，基本类似从google上获取的js
setTimeout("clickInsert()",100);
function geturls() {	
	var url = [];
	var j = 0;
	$('.selfImg').each(function() {
		url[j++] =$(this).find('img').attr("name");
	})
	var num = {};
	num['thesis'] = $('.entry-title').text().split('-')[0];
	num['url'] = url;
	var href = location.href;
	chrome.runtime.sendMessage({
		what: "storeUrlWordPress",
		value: num,
		key:href
	});	
}
function clickInsert(){
  var selfs  =  '<div id="back">'+
			    '<div class="height"></div><div class="padding_left">'+
				'<label class="confirm1" id="choose" ><font color="white" msg-name = "wordpress_get"></font></label>'+	
			    '</div>'+
		        '</div>'
    $('body').prepend(selfs);
    var height = document.documentElement.clientHeight - 100;
    var margin = height +"px";
    $('#back').css("margin-top",margin);
$("#choose").click(function(){
geturls();
     chrome.runtime.sendMessage({what: "_trackEvent", category: "GoogleImage", action:"Complete", label:"1"});
  })  
  $('[msg-name]').each(function(){
	var ele = $(this);
	var messageName = ele.attr('msg-name');
	ele.text(chrome.i18n.getMessage(messageName));
});
}

 
