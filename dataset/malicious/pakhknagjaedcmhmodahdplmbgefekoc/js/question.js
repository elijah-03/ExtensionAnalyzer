$(".question_text").click(function(){
	var length = $('[name="checkbox"]').length;
	if($('.width').val().length == 0&&(!$('[name="checkbox"]')[0].checked)&&(!$('[name="checkbox"]')[1].checked)&&(!$('[name="checkbox"]')[2].checked)&&(!$('[name="checkbox"]')[3].checked))
     {
     	return;
     }
	for (var i = 0;i<length;i++) {
		if($('[name="checkbox"]')[i].checked){
			 chrome.runtime.sendMessage({what: "_trackEvent", category: "removeQuestion", action:"singlechoice", label:i});
		}
	}
	if ($('.width').val().length > 0) {
		  chrome.runtime.sendMessage({what: "_trackEvent", category: "removeQuestion", action:"textchoice", label:$('.width').val()});
	}
	var htmls = '<div class="feedback">'+
			'<font size="5">Submited</font><br />'+
			'</div>'+
			'<br />'+
			'<div>'+
			'<font size="5">Thank you for your feedback.We will make it Better!</font>'+
			'</div>'
    $("#question").html(htmls);
     $("#question").css("margin-left","420px")
     $("#title").remove();
});
//var rehtml = '<a href="#">'+
//			<div class="re_app">'+
//				<div class="re_left">
//					<img src="../Logo-48.png" "/>
//				</div>
//				<div class="re_lefts">
//					<div class="title"><font class="title_text">QQLife New Tab</font></div>
//					<div class="fivestar">3333</div>
//					<div class="desc"><font class="desc_text">QQLife New TabQQLife New TabQQLife New TabQQLife New TabBetter </font></div>
//					<div class="confirm" class="detail"><label class="detail">detail</label></div>
//				</div>
//			</div>
//			</a>'
