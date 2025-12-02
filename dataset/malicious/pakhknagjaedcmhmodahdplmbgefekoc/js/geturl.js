//插入到谷歌图片界面的js，主要是用来获取图片的路径
//geturlFunction();
//function geturlFunction(){
var indexNum = [];
var creatFlag = true;
if(location.href.indexOf("tbs=isz:lt,islt:xga,imgo:1") > -1 || location.href.indexOf("tbs=imgo%3A1%2Cisz%3Alt%2Cislt%3Axga") > -1 || location.href.indexOf("tbs=isz:lt,islt:xga&sa=X") > -1 || location.href.indexOf("tbs=isz%3Alt%2Cislt%3Axga%2Cimgo%3A1&tbm=isch") > -1 || location.href.indexOf("tbs=imgo:1,isz:lt,islt:xga") > -1) {
	setTimeout(clickInsert, 100);
}
//获取路径的函数
function geturls(a) {
	creatFlag = false;
	var url = [];
	var j = 0;
	$('[class="rg_bx rg_di rg_el ivg-i"]').each(function() {

		if($(this).find('.green').attr("src").toString().indexOf("green") > -1 && $(this).find('.rg_l')[0].href.match(/imgurl=.+&imgrefurl/)) {
			var href = $(this).find('.rg_l')[0].href;
			href = decodeURIComponent(href.match(/imgurl=.+&imgrefurl/)[0].replace(/imgurl=|&imgrefurl/g, ''));
			url[j++] = href;

		} else {

		}

	})
	for(var i = 0; i < url.length; i++) {
	checkurl(url[i],i);
	if (i == url.length-1 ) {
		var num = {};
	
	num['thesis'] = $('input[name="q"]').val().split("wallpapers")[0];
	num['url'] = url;
	  var countUrl =0;
	  var baseJson = {};
      var base = [];
      var tag = [];
      $('[class="rg_ic rg_i"]').each(function(){
	   var baseUrl= $(this).attr("src");
	   if(baseUrl&&countUrl<10){
		base[countUrl++]= baseUrl;
	   }
      })
      baseJson['base'] = base;
      var countUrl1=0
     $('._Hyg').each(function(){
	
	   var baseUrl= $(this).find(".sq");
	   if(baseUrl&&countUrl1<10){
	   tag[countUrl1++] = baseUrl.text();
	   }
      })
      baseJson['tag'] = tag;
      var desc = [];
      var countUrl2=0
     $('[jsname="ik8THc"]').each(function(){
	   if(countUrl2<10){
	  var a = $(this).text();
		desc[countUrl2++]= a.split('"s":"')[1].split('",')[0];
	   }
     })
    baseJson['desc'] = desc;
	chrome.runtime.sendMessage({
		what: "storeUrl",
		value: num,
		key:baseJson
	});
	}
    }
    function checkurl(url,i) {
	var img = new Image();
	img.src = url;	
		img.onload = function() {
			j++;
		};
		img.onerror = function() {
			var img = new Image();
			img.src = url;
				img.onload = function() {
				};
				img.onerror = function() {
					console.log(url);
					a.splice(i,1);
				};
			
		};
	
}
	
      
	//location.href=chrome.extension.getURL("index.html");
}
//插入的到图片上的格式
function clickInsert() {
	//var html = '<div class="hdtb-mn-hd"  id="hdtb-rstss" tabindex="0"><font size="4" color="red">Click it, you can have your thesis extension</font></div>'
	//$('[class="hdtb-mn-cont"]').append(html)
	var imgUrl = chrome.extension.getURL('/images/green-tick.png');
	//	$('[class="rg_bx rg_di rg_el ivg-i"]').append($('<div id="right"><span ><img src="' + imgUrl + '"  class ="green" /></span></div>'));
	$('[class="rg_bx rg_di rg_el ivg-i"]').each(function() {

		var width = parseInt($(this).find('.rg_an').text().match(/\d+/g)[0]);
		var height = parseInt($(this).find('.rg_an').text().match(/\d+/g)[1]);
		if(width / height>1.4 && width >= 1280 && width <= 3000) {

			$(this).append($('<div id="right"><span ><img src="' + imgUrl + '"  class ="green" /></span></div>'));
		}
	});
	var selfs = '<div id="back">' +
		'<div class="height"></div><div class="padding_left">' +
		'<font color="white" size="3" msg-name ="self_load"></font><font id = "all" color="white" size="3"></font>, <font color="white" size="3" msg-name ="self_scroll"> </font><font color="white" size="3" id="leftsign"></font><font id ="selected" color="white" size="3"></font> <font msg-name ="self_selected" color="white" size="3"> </font><font color="white" size="3" id="rightsign"></font>' +
		'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
		'<label class="confirm1" id="choose" msg-name ="self_finish"></label><br />' +
		'</div>' +
		'</div>';
	$('body').prepend(selfs);
	var height = document.documentElement.clientHeight - 100;
	var margin = height + "px";
	$('#back').css("margin-top", margin);

	function shows() {
		$('[msg-name ="self_load"]').text(chrome.i18n.getMessage("self_load"));
		$('[msg-name ="self_scroll"]').text(chrome.i18n.getMessage("self_scroll"));
		$('[msg-name ="self_selected"]').text(chrome.i18n.getMessage("self_selected"));
		$('[msg-name ="self_finish"]').text(chrome.i18n.getMessage("self_finish"));
		$('#leftsign').text("(");
		$('#rightsign').text(")");
		$('#all').text($('[src="' + imgUrl + '"]').length + ",");
		$('#selected').text($('[src="' + imgUrl + '"]').length);
	}
	shows();
	$('.green').click(function() {
		console.log($(this).parents('[jscontroller="Q7Rsec"]').attr('data-ri'))
		if($(this).attr('src').indexOf('green-tick') > -1) {
			chrome.runtime.sendMessage({
				what: "_trackEvent",
				category: "GoogleImage",
				action: "Unselect",
				label: "1"
			});
			var imgUrl = chrome.extension.getURL('/images/gray-tick.png');
			$(this).attr("src", imgUrl);
		} else {
			chrome.runtime.sendMessage({
				what: "_trackEvent",
				category: "GoogleImage",
				action: "Select",
				label: "1"
			});
			var imgUrl = chrome.extension.getURL('/images/green-tick.png');
			$(this).attr("src", imgUrl);
		}
		$('#selected').text($('[src="' + chrome.extension.getURL('/images/green-tick.png') + '"]').length)
		//  $('#all').text($('[src="chrome-extension://pcodnhcbjegphfpocbfhjhlmapinbchf/images/green-tick.png"]').length)   
		//  alert($('[src="chrome-extension://pcodnhcbjegphfpocbfhjhlmapinbchf/images/green-tick.png"]').length)
		var count = 0;
		indexNum = [];
		$('.green').each(function() {
			if($(this).attr('src').indexOf('gray-tick') > -1) {
				var index = $(this).parents('[jscontroller="Q7Rsec"]').attr('data-ri');
				indexNum[count++] = index;
			}
		})
		chrome.runtime.sendMessage({
			what: "removeImage",
			value: indexNum
		});
	});
	$("#choose").click(function() {
		$('[class="rg_bx rg_di rg_el ivg-i"]').each(function() {
			if(!$(this).find('.green').attr("src")) {
				$(this).remove()
			}
		});
		geturls(parseInt($("#all").text()));
		chrome.runtime.sendMessage({
			what: "storeUrls",
			value: location.href
		});
		chrome.runtime.sendMessage({
			what: "_trackEvent",
			category: "GoogleImage",
			action: "Complete",
			label: "1"
		});
	});

}

$('[msg-name]').each(function() {
	var ele = $(this);
	var messageName = ele.attr('msg-name');
	ele.text(chrome.i18n.getMessage(messageName));
	//	chrome.runtime.sendMessage({what:"change_option"});
});
var heigh1 = document.body.scrollHeight;
setInterval(lengthAddlistener, 500);
var countEqual = 0;

function lengthAddlistener() {
	heigh2 = document.body.scrollHeight;
	if(heigh2 != heigh1 && countEqual > 0) {
		scroll();
		for(var i = 0; i < indexNum.length - 1; i++) {

		}
	} else if(countEqual == 0 && heigh2 != heigh1) {
		countEqual++;
	}
	heigh1 = heigh2;
}
//图片下拉触发的函数
function scroll() {
	
	var imgUrl = chrome.extension.getURL('/images/green-tick.png');
	var imgUrls = chrome.extension.getURL('/images/gray-tick.png');
	//	$('[class="rg_bx rg_di rg_el ivg-i"]').append($('<div id="right"><span ><img src="' + imgUrl + '"  class ="green" /></span></div>'));
	$('[class="rg_bx rg_di rg_el ivg-i"]').each(function() {
       $(this).find("#right").remove();
		var width = parseInt($(this).find('.rg_an').text().match(/\d+/g)[0]);
		var height = parseInt($(this).find('.rg_an').text().match(/\d+/g)[1]);
		if(width / height>1.4 && width >= 1280 && width <= 3000) {	
			 $(this).append($('<div id="right"><span ><img src="' + imgUrl + '"  class ="green" /></span></div>'));			
		}
		var totalLen = $('[src="' + imgUrl + '"]').length;
	});
     for (var i =0;i<indexNum.length;i++) {
     	$('[data-ri='+'"'+indexNum[i]+'"]').find(".green").attr("src", imgUrls);
     }
	function shows() {
		
		$('#all').text($('[src="' + imgUrl + '"]').length + ",");
		$('#selected').text($('[src="' + imgUrl + '"]').length-$('[src="' + imgUrls + '"]').length);
	}
	shows();
	var totalLen = $('[src="' + imgUrl + '"]').length;
	$('.green').click(function() {
		
		console.log($(this).parents('[jscontroller="Q7Rsec"]').attr('data-ri'))
		if($(this).attr('src').indexOf('green-tick') > -1) {
			chrome.runtime.sendMessage({
				what: "_trackEvent",
				category: "GoogleImage",
				action: "Unselect",
				label: "1"
			});
			var imgUrl = chrome.extension.getURL('/images/gray-tick.png');
			$(this).attr("src", imgUrl);
		} else {
			chrome.runtime.sendMessage({
				what: "_trackEvent",
				category: "GoogleImage",
				action: "Select",
				label: "1"
			});
			var imgUrl = chrome.extension.getURL('/images/green-tick.png');
			$(this).attr("src", imgUrl);
		}
		var imgUrl = chrome.extension.getURL('/images/green-tick.png');
	    var imgUrls = chrome.extension.getURL('/images/gray-tick.png');
		$('#selected').text(totalLen-$('[src="' + imgUrls + '"]').length)
		if (indexNum.length>0) {
			var count = indexNum.length;
		}else{
			var count = 0;
		}
		$('.green').each(function() {
			if($(this).attr('src').indexOf('gray-tick') > -1) {
				var index = $(this).parents('[jscontroller="Q7Rsec"]').attr('data-ri');
				indexNum[count++] = index;
			}
		})
		chrome.runtime.sendMessage({
			what: "removeImage",
			value: indexNum
		});
	});
	$("#choose").click(function() {
		$('[class="rg_bx rg_di rg_el ivg-i"]').each(function() {
			if(!$(this).find('.green').attr("src")) {
				$(this).remove()
			}
		})
		if(creatFlag) {
			geturls(parseInt($("#all").text()));
			chrome.runtime.sendMessage({
				what: "storeUrls",
				value: location.href
			});
			chrome.runtime.sendMessage({
				what: "_trackEvent",
				category: "GoogleImage",
				action: "Complete",
				label: "1"
			});
		}

	});

}
var countUrl=0
//$('[jsname="ik8THc"]').each(function(){
//	var a = $(this).text();
//	console.log(a)
//		console.log(a.split('"s":"')[1].split('",')[0])
////	   var baseUrl= $(this).find(".irc_pt");
////	   if(baseUrl&&countUrl<10){
////	   	console.log($(this))
//////		base[countUrl++]= baseUrl;
////	   }
//    })
//
