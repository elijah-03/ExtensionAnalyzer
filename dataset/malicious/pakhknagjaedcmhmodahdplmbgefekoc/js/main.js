var Debug = true;
var adata = fengGetStorage("libraryhistory");
//upload图片报错就会显示该浮层
var errorifrUrl = chrome.extension.getURL('html/errortip.html');
                var iframe = $('<iframe src="' + errorifrUrl + '" class="erroreb_tips" style="border: 0px; overflow: visible; padding: 0px; right: auto; z-index: ' + (2147483647) + '; bottom: 290px; left: 425px; position: fixed;  width: 440px;  background: transparent;display:none"></iframe>');
//              var newWidth = 284 + 25 + 'px';
//              $('iframe.eb_tips').css('width', newWidth);
                $('.background').append(iframe);
//var oDws = $(window).width();
//var left = (oDws-500)/2;
//var lefts = left +"px";
//var searchifrUrl = chrome.extension.getURL('html/search.html');
//              var searchiframe = $('<iframe src="' + searchifrUrl + '" class="searcheb_tips" style="border: 0px; overflow: visible; padding: 0px; right: auto; z-index: ' + (2147483647) + '; bottom: 57%;  left :'+lefts+'; position: fixed;  width: 440px;  background: transparent;display:none" align="center"></iframe>');
////              var newWidth = 284 + 25 + 'px';
////              $('iframe.eb_tips').css('width', newWidth);
//              $('.background').append(searchiframe);   
 if (adata) {
 	for (var i = 0; i<adata.length;i++) {
 		var k = adata[i] - 1;
   		$('[name="checkbox"]')[k].checked = true;
 	}
 }else{
 	
 } 

 //中文情况需要显示qq和sina分享
if(navigator.language.indexOf("zh")>-1){
	var html = '<a id="sinaUrl"><li class="sina cursor"></li></a>'+
                '<a id="qqUrl"><li class="qq cursor"></li></a>';
    $(".share_list").append(html);
    var htmls =' <a target="_blank" href="http://v.t.sina.com.cn/share/share.php?title=Discovered%20from%20Better%20Start%20New%20Tab&url=https://chrome.google.com/webstore/detail/'+chrome.runtime.id+'?utm_campaign=backgroundshare&utm_medium=social&utm_source=weibo&content=utf-8&sourceUrl=https://chrome.google.com/webstore/detail/'+chrome.runtime.id+'?utm_campaign=backgroundshare&utm_medium=social&utm_source=weibo" alt="Sina" ><img src="image/main/sina-r.png" /></a>'+
		        				'<a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=https://chrome.google.com/webstore/detail/'+chrome.runtime.id+'&title=Discovered%20from%20Better%20Start%20New%20Tab" target="_blank" alt="QQ"><img src="image/main/QQ-r.png" /></a>'
    $(".share_icon").append(htmls);
}
searchtip();
function searchtip(){
var search = fengGetOnclick("search");
if (search == '"yahoo"') {
	var search1 = "Yahoo Search";
} else if (search == '"google"') {
	var search1 = "Google Search";
} else if (search == '"bing"') {
	var search1 = "Bing Search";
} else if (search == '"baidu"') {
	var search1 = "Baidu Search";
}
$('#search_bar').attr("placeholder",search1)
}
//5星好评
function fivestar() {
    if (fengGetOnclick("fivestar")) {
        return;
    }
    var current_time = new Date().getTime();
    var fivestar_time = fengGetOnclick("fivestar_time");
    if (current_time - fivestar_time < 7 * 24 * 60 * 60 * 1000) {
        return;
    }
    var ifrUrls = chrome.extension.getURL('html/fivestar1.html');
    var iframes = $('<iframe src="' + ifrUrls + '" class="eb_tipss" style="border: 0px; overflow: visible; padding: 0px; right: auto; z-index: ' + (2147483647) + '; bottom: 80px; left: 25px; position: fixed;  width: 400px;  background: transparent;"></iframe>');
    var newWidth = 284 + 25 + 'px';
    $('iframe.eb_tipss').css('width', newWidth);
    $('.background').append(iframes);
    var current_time = new Date().getTime();
    fengSetOnclick("fivestar_time", current_time);
}
//点击左下角切换图片
function change() {
	if (fengGetOnclick("pin") == null) {
		return;
	}
    var adata = fengGetStorage("local");
    if (adata["res"] == "library") {
        var imgs = ResourceSetting.getImgsArrayFromResource();
        if (imgs.length==0) {
            return;
        }
        var index = Math.floor(Math.random() * imgs.length);
        var imageurl = imgs[index];
        var currentUrl = '';
        var updateImageObj = UpdateImage.get();
        var updateImageInfo = updateImageObj['value'];
        var updateImageKey =  updateImageObj['key'];
        
        var nowImage = imageurl;
        if (updateImageInfo) {
            nowImage = updateImageInfo.img;
            if (!nowImage) {
                // if cacheImage not ready or do not set previous image yet or set just in 10s, use the url image.
                nowImage = updateImageInfo.url;
            }  
            
            
            UpdateImage.pop();
            try {
                fengSetOnclick('current_url', updateImageInfo.url || '');
                fengSetStorage('current_img', {'img_key': updateImageKey});
            } catch(e) {
                console.log(e);
                nowImage = updateImageInfo.url;
                fengSetOnclick('current_url', updateImageInfo.url || '');
                fengSetOnclick('current_img', '');
            }
        } else {
            var index = Math.floor(Math.random() * imgs.length);
            currentUrl = imgs[index];
            nowImage = imgs[index];
            fengSetOnclick('current_url', currentUrl || '');
            fengSetOnclick('current_img', currentUrl || '');
        }
        fengSetOnclick("current_update_time", new Date().getTime());
        
        if (nowImage) {
            $(".background").css({
                "background-image": 'url("' + nowImage + '")'
            });
            
//          if (nowImage == currentUrl) {
//          	var indexs = parseInt(Math.random()*5+1);
//      	    var nowImages = "backgrounds/"+indexs+".jpg"
//      	    fengSetOnclick('current_url', nowImages);
//      	    fengSetOnclick('current_img', nowImages);
//              $(".background").css({
//                   "background-image": 'url("' + nowImages + '")'
//              });
//          }
        } else {
            return;
        }
        
        var img = new Image();
        img.src = nowImage;
        if (img.complete) {

        } else {
            img.onload = function() {

            };
            img.onerror = function() {
                var indexss = parseInt(Math.random()*5+1);
        	    var nowImagess = "backgrounds/"+indexss+".jpg";
        	    fengSetOnclick('current_url', nowImagess);
        	    fengSetOnclick('current_img', nowImagess);
                $(".background").css({
                     "background-image": 'url("' + nowImagess + '")'
                });
            };
        }
          var likeLibrary = fengGetStorage("like_library");
if (!likeLibrary) {
		
	} else{
		var likeUrl = likeLibrary["like"];
		var url = fengGetOnclick("current_url");
		var sign = false;
		for (var i =0; i <likeUrl.length;i++) {
			if (likeUrl[i]==url) {
				sign = true;
	            break;
			}
		}
		if (sign) {
			if ($("#like").hasClass('like1')) {
				$("#like").removeClass('like1');
	            $("#like").addClass("like2");
			} 
		} else{
			if (!$("#like").hasClass('like1')) {
				$("#like").removeClass('like2');
	            $("#like").addClass("like1");
			} 
		}
		
	}
        chrome.runtime.sendMessage({
            what: "updateimg",
            imageurl: imageurl
        }, function() {
        	 
        });

    } else if (adata["res"] == "color") {
        $(".background").css({
            "background-color": adata["pic"]
        });
        chrome.runtime.sendMessage({
            what: "msg"
        });
    } else if (adata["res"] == "local") {
        $(".background").css({
            "background-image": 'url("' + adata["pic"] + '")'
        });
    }
}
//每天早上图片的更换
function change_morning() {
    var adata = fengGetStorage("local");
    if (adata["res"] == "library") {
        var imgs = ResourceSetting.getImgsArrayFromResource();
        if (imgs.length==0) {
            return;
        }
        var index = Math.floor(Math.random() * imgs.length);
        var imageurl = imgs[index];
        var currentUrl = '';
        var updateImageObj = UpdateImage.get();
        var updateImageInfo = updateImageObj['value'];
        var updateImageKey =  updateImageObj['key'];
        
        var nowImage = imageurl;
        if (updateImageInfo) {
            nowImage = updateImageInfo.img;
            if (!nowImage) {
                // if cacheImage not ready or do not set previous image yet or set just in 10s, use the url image.
                nowImage = updateImageInfo.url;
            }  
            UpdateImage.pop();
            fengSetOnclick('current_url', updateImageInfo.url || '');
            fengSetStorage('current_img', {'img_key': updateImageKey});
        } else {
            var index = Math.floor(Math.random() * imgs.length);
            currentUrl = imgs[index];
            nowImage = imgs[index];
            fengSetOnclick('current_url', currentUrl || '');
            fengSetOnclick('current_img', currentUrl || '');
        }
        
        if (nowImage) {
            $(".background").css({
                "background-image": 'url("' + nowImage + '")'
            });
            
            if (nowImage == currentUrl) {
                $(".background").css({
                   "background-color": "#303030"
                });var indexs = parseInt(Math.random()*5+1);
        	    var nowImages = "backgrounds/"+indexs+".jpg";
        	     fengSetOnclick('current_url', nowImages);
        	     fengSetOnclick('current_img', nowImages);
                $(".background").css({
                     "background-image": 'url("' + nowImages + '")'
                });
            }
        } else {
            return;
        }
        
        var img = new Image();
        img.src = nowImage;
        if (img.complete) {

        } else {
            img.onload = function() {

            };
            img.onerror = function() {
                var indexss = parseInt(Math.random()*5+1);
        	    var nowImagess = "backgrounds/"+indexss+".jpg"
        	    fengSetOnclick('current_url', nowImagess);
        	    fengSetOnclick('current_img', nowImagess);
                $(".background").css({
                     "background-image": 'url("' + nowImagess + '")'
                });
            };
        }
       var likeLibrary = fengGetStorage("like_library");
if (!likeLibrary) {
		
	} else{
		var likeUrl = likeLibrary["like"];
		var url = fengGetOnclick("current_url");
		var sign = false;
		for (var i =0; i <likeUrl.length;i++) {
			if (likeUrl[i]==url) {
				sign = true;
	            break;
			}
		}
		if (sign) {
			if ($("#like").hasClass('like1')) {
				$("#like").removeClass('like1');
	            $("#like").addClass("like2");
			} 
		} else{
			if (!$("#like").hasClass('like1')) {
				$("#like").removeClass('like2');
	            $("#like").addClass("like1");
			} 
		}
		
	}
        chrome.runtime.sendMessage({
            what: "updateimg",
            imageurl: imageurl
        }, function() {
        	 
        });

    }
}
//切换不同源图片库的触发
function change_online() {
    var adata = fengGetStorage("local");
    if (adata["res"] == "library") {
        var imgs = ResourceSetting.getImgsArrayFromResource();
        if (imgs.length==0) {
            return;
        }
        var index = Math.floor(Math.random() * imgs.length);
        var imageurl = imgs[index];
        
         $(".background").css({
            "background-image": 'url("' +imageurl + '")'
        });
        fengSetOnclick("current_url", imageurl);
        fengSetOnclick("current_img", imageurl);
        var current_time = new Date().getTime();
        var current_update_time = current_time;
        fengSetOnclick("current_update_time", current_update_time);
        var likeLibrary = fengGetStorage("like_library");
if (!likeLibrary) {
		
	} else{
		var likeUrl = likeLibrary["like"];
		var url = fengGetOnclick("current_url");
		var sign = false;
		for (var i =0; i <likeUrl.length;i++) {
			if (likeUrl[i]==url) {
				sign = true;
	            break;
			}
		}
		if (sign) {
			if ($("#like").hasClass('like1')) {
				$("#like").removeClass('like1');
	            $("#like").addClass("like2");
			} 
		} else{
			if (!$("#like").hasClass('like1')) {
				$("#like").removeClass('like2');
	            $("#like").addClass("like1");
			} 
		}
		
	}
    } else if (adata["res"] == "color") {
        $(".background").css({
            "background-color": adata["pic"]
        });
        chrome.runtime.sendMessage({
            what: "msg"
        });
    } else if (adata["res"] == "local") {
        $(".background").css({
            "background-image": 'url("' + adata["pic"] + '")'
        });
    }
}

function getCurrentImg() {
    var strCurrentImg = fengGetOnclick("current_img") || '';
    if (strCurrentImg.indexOf('img_key') !== -1) {
        var img_key = fengGetStorage("current_img")['img_key'];
        var imgInfo = fengGetStorage(img_key) || {}; 
        return imgInfo['img'] || imgInfo['url'];
    } else {
        return strCurrentImg;
    }
}


//开启新页面初始化
function initBackground() {
    var adata = fengGetStorage("local");
    var backurl = getCurrentImg();
    if (!backurl) {
        backurl = fengGetOnclick("current_url");
    }
    
    if (!backurl) {
        backurl = 'backgrounds/1.jpg';
    }
//   Debug && console.log(backurl);
    // if (!backurl) {
    	// backurl = fengGetOnclick("current_url");
    // }
    if (!adata) {
        adata = {
            "pic": [1,2,3,4],
            "res": "library"
        };
    }
    if (adata["res"] == "library") {
    	if ( fengGetStorage("localhistory")) {
        	 $('[name = "radio"]')[2].disabled = false;
        }
        if ( fengGetStorage("libraryhistory")) {
        	 $('[name = "radio"]')[0].disabled = false;
        }
        if ( fengGetOnclick("pin")== null ) {
            $(".background").css({
                "background-image": 'url("' + backurl + '")'
            });
            return;
        }
        var current_time = new Date().getTime();
        var current_update_time = fengGetOnclick("current_update_time");
        var frequentIndex = fengGetOnclick("frequent");
        if (frequentIndex == 0) {
        	$(".background").css({
                   "background-color": "#303030"
                });
            	$(".background").css({
                "background-image": 'url("' + backurl + '")'
            });   
            return;
        } else if(frequentIndex == 1){
        	var timeLimit = 60*1000;
        }else if(frequentIndex == 2){
        	var timeLimit = 60*60*1000;
        }else if(frequentIndex == 3||frequentIndex == null){
        	var timeLimit = 24*60*60*1000;
        }
        if (current_time - current_update_time < timeLimit) {
            if(fengGetOnclick("mornUpdate")== "1"&&new Date().getHours()<10&&new Date().getHours()>5){
            	$(".background").css({
                "background-image": 'url("' + backurl + '")'
            });   
            change_morning();
            	fengSetOnclick("mornUpdate", "2");

            }else{
            $(".background").css({
                   "background-color": "#303030"
                });
            	$(".background").css({
                "background-image": 'url("' + backurl + '")'
            });            
            }
            
        } else {
            change();
        }
    } else if (adata["res"] == "color") {
        $(".background").css({
            "background-color": adata["pic"]
        });
        if ( fengGetStorage("localhistory")) {
        	 $('[name = "radio"]')[2].disabled = false;
        }
        if ( fengGetStorage("libraryhistory")) {
        	 $('[name = "radio"]')[0].disabled = false;
        }
        chrome.runtime.sendMessage({
            what: "msg"
        });
    } else if (adata["res"] == "local") {
        $(".background").css({
            "background-image": 'url("' + adata["pic"] + '")'
        });
        if ( fengGetStorage("localhistory")) {
        	 $('[name = "radio"]')[2].disabled = false;
        }
        if ( fengGetStorage("libraryhistory")) {
        	 $('[name = "radio"]')[0].disabled = false;
        }
    }    
}

var local = {};
var oDw = $(window).width();
var oDh = $(document).height();
$("#search_box").css({
    "left": (oDw - 500) / 2
});
$(window).resize(function() {
    $("#search_box").css({
        "left": ($(window).width() - 500) / 2
    });
});

//bunny
var ___t = null;
var ___t2 = null;

___t = setInterval(t1, 300);
___t2 = setInterval(t2, 300);

function t1() {
    if ($(".bunny_box").hasClass("zyj")) {
        $(".bunny_box").removeClass("zyj");
    } else {
        $(".bunny_box").addClass("zyj");
    }
}

function t2() {
    if ($(".bunny_box2").hasClass("bunny_hover")) {
        $(".bunny_box2").removeClass("bunny_hover");
    } else {
        $(".bunny_box2").addClass("bunny_hover");
    }
}

$(".bunny_box").mouseenter(function() {
    $(".bunny_box").hide();
    $(".bunny_box2").show();
});

$(".bunny_box2").mouseleave(function() {
    $(".bunny_box2").hide();
    $(".bunny_box").show();
});

//Text input example text with jQuery
//function switchText() {
//  if ($(this).val() == $(this).attr('title')) {
//      $(this).val('').removeClass('searchText');
//      $("#search_box").css("background-color", "#fff");
//  } else if ($.trim($(this).val()) == '') {
//      $(this).addClass('searchText').val($(this).attr('title'));
//      $("#search_box").css("background-color", "white");
//  }
//}
//
//$('input[type=text][title!=""]').each(function() {
//  if ($.trim($(this).val()) == '') $(this).val($(this).attr('title'));
//  if ($(this).val() == $(this).attr('title')) $(this).addClass('searchText');
//}).focus(switchText).blur(switchText);


// document.onkeydown=function(){
//         if (event.keyCode == 13){
//            if($('#search_bar').val().length < 1){
//	  	   return;
//	          }
//         }
//        }
$('#search1').submit(function(e) {	
	if($('#search_bar').val().length < 1){
		return false;
	}
    $('body').hide();
    chrome.runtime.sendMessage({what: "_trackEvent", category: "Search", action:"all", label:fengGetOnclick("search")});
});
$('#search_bars').click(function(e) {
	chrome.runtime.sendMessage({what: "_trackEvent", category: "Search", action:"SearchButton", label:fengGetOnclick("search")});
    $('#search1').submit();
   
});
jQuery.jqtab = function(tabtit, tab_conbox, tab_con, shijian, actives) {
    $(tab_conbox).find(tab_con).hide();
    $(tabtit).find(tab_con).eq(0).addClass(actives).show();
    $(tab_conbox).find(tab_con).eq(0).show();

    $(tabtit).find("li").bind(shijian, function() {
        $(this).addClass(actives).siblings("li").removeClass(actives);
        var activeindex = $(tabtit).find("li").index(this);
        $(tab_conbox).children().eq(activeindex).show().siblings().hide();
        return false;
    });

};

$(document).ready(function(e) {
    $('.lcs_check').lc_switch();
    var unit = fengGetStorage("w_unit");
    if (!unit) {
        unit = 'c';
    }

    if (unit == 'c') {
        $('.lcs_check').lcs_off();
    } else if (unit == 'f') {
        $('.lcs_check').lcs_on();
    }

    // triggered each time a field changes status
    $('.background').delegate('.lcs_check', 'lcs-statuschange', function() {
        var status = ($(this).is(':checked')) ? 'checked' : 'unchecked';
        console.log('field changed status: ' + status);
    });

    // triggered each time a field is checked
    $('.background').delegate('.lcs_check', 'lcs-on', function() {
        console.log('field is checked');
           chrome.runtime.sendMessage({what: "_trackEvent", category: "Weather", action:"Change2F", label:"1"});
        fengSetStorage("w_unit", 'f');
        var placeText = fengGetStorage('placeText');
        if (placeText) {
            getWeather(fengGetStorage('placeText'));
        }
    });

    // triggered each time a is unchecked
    $('.background').delegate('.lcs_check', 'lcs-off', function() {
        console.log('field is unchecked');
          chrome.runtime.sendMessage({what: "_trackEvent", category: "Weather", action:"Change2C", label:"1"});
        fengSetStorage("w_unit", 'c');
        var placeText = fengGetStorage('placeText');
        if (placeText) {
            getWeather(fengGetStorage('placeText'));
        }
    });

    //history_list EFFECT
    $(".history_list dl").hover(function() {
        $(this).addClass("dlhover");
    }, function() {
        $(this).removeClass("dlhover");
    });
    $(".history_list dd").click(function() {
        $(this).parent().fadeOut();
        var _oThis = $(this);
        setTimeout(function() {
            _oThis.parent().remove();
        }, 1000);
    });

    //Menu Effect
    $(".close").click(function() {
        hideSettingBox();
        chrome.runtime.sendMessage({what: "_trackEvent", category: "Memu", action:"closesettings", label:"1"});
    });
    /*
    $("#menu").click(function() {
        $("#setting_box").animate({
            "right": "0px",
            "opacity": 1
        }, 500, 'easeInOutCubic');
        
        var data = fengGetStorage("local");
        if (data["res"] == "library") {
            $('[name="radio"]')[0].checked = true;
            for (var i = 0; i < data["pic"].length; i++) {
                var j = data["pic"][i] - 1;
                $('[name="checkbox"]')[j].checked = true;
            }

        } else if (data["res"] == "color") {
            $('[name="radio"]')[1].checked = true;
        } else if (data["res"] == "local") {
            $('[name = "radio"]')[2].checked = true;
        }
        chrome.topSites.get(function(tab) {
            var html = "";
            for (var i = 0; i < tab.length && i < 30; i++) {
                //              alert(tab[i]["title"].substring(0,20))
                html += '<a target="_blank" href="' + tab[i]["url"] + '"><div class="gap">' +
                    '<img src="chrome://favicon/size/16@1x/' + tab[i]["url"] + '" />&nbsp;&nbsp;' +
                    '<font size="2" color = "black">' + tab[i]["title"].substring(0, 20) + '...</font></div></a>'
                    //              html + ='<a target="_blank" href="'+tab[i]["url"]+'"><div>'+
                    //                          '<span class = "float"><img src="chrome://favicon/size/16@1x/'+tab[i]["url"]+'" /></span>'+
                    ////                          '<span class = "float">'+tab[i]["title"].substring(0,20)+'</span>'+           
                    //                          '</div></a>';
            }
            $('[class="history_list"]').html(html);
        });
    });*/

//  $("#weather_list").hover(function() {
//      $(this).addClass("hovereff");
//  }, function() {
//      $(this).removeClass("hovereff");
//  });

    //选择纯色背景
    $(".solidcolor li").click(function() {
        var newColor = $(this).css("background-color");
        //$(".sel_tabs,.settings_btn").css({"background-color":newColor});
        $(".background").css({
            "background-image":'',
            "background-color": newColor
        });
        $(this).siblings("li").removeClass("thisbig");
        $(this).addClass("thisbig");
        local["pic"] = newColor;
        local["res"] = "color";
        fengSetStorage("local", local);
        chrome.runtime.sendMessage({what: "_trackEvent", category: "SetBackgoundColor", action:"ColourValue", label:newColor});
        $('[name = "radio"]')[1].checked = true;
        if ( fengGetStorage("localhistory")) {
        	 $('[name = "radio"]')[2].disabled = false;
        }
        if ( fengGetStorage("libraryhistory")) {
        	 $('[name = "radio"]')[0].disabled = false;
        }
    });

    //upload background
     //自己上传图片
    $("#uploadbutton").click(function() {
    	$('iframe.erroreb_tips').css('display', "none");
        $("#realfile").trigger('click');
        chrome.runtime.sendMessage({what: "_trackEvent", category: "Background", action:"Upload", label:"1"});
        var bannerImage = document.getElementById('realfile');
        bannerImage.addEventListener('change', function() {
            var file = this.files[0];
            if (file.type.indexOf('image') < 0) {
                return;
            } else {

            }
            var img = new Image();
            var fReader = new FileReader();
            fReader.readAsDataURL(file);
            fReader.onload = function() {
                img.src = fReader.result;
                local["pic"] = fReader.result;
                local["res"] = "local";
                try{
                	fengSetStorage("local", local);
                fengSetStorage("localhistory", local["pic"]);
                $('[name = "radio"]')[2].checked = true;
                chrome.runtime.sendMessage({what: "_trackEvent", category: "Background", action:"UploadComplete", label:"1"});
                change();
                if ( fengGetStorage("libraryhistory")) {
        	    $('[name = "radio"]')[0].disabled = false;
                }
                }catch(e){
                	$('iframe.erroreb_tips').css('display', "block");
                }
                
            };
        });

    });
    $(".tab_search_title > label").click(function() {

        $(this).prev().trigger('click');

    });
});
//从多个库中选择图片源
$('[name="checkbox"]').click(function() {
    var num = [];
    var j = 0;
    for (var i = 0; i < $('[name="checkbox"]').length; i++) {
        if ($('[name="checkbox"]')[i].checked) {
            num[j++] = i + 1;
        }
    }
    local["pic"] = num;
    local["res"] = "library";
    fengSetStorage("local", local);
    fengSetStorage("libraryhistory", local["pic"]);
    $('[name = "radio"]')[0].checked = true;
    if (fengGetStorage("local")["pic"].length==0) {
		chrome.runtime.sendMessage({what:"self_clear"});
	}else{
		 change_online();
	}
   
});

/*init search radio and search box*/
//搜索
var updateSearch = function() {
    var searchSite = fengGetStorage("search") || 'google';
    $('[value="'+searchSite+'"]').attr('checked', 'checked');
    
    $('#search1 input[type="hidden"]').remove();
    switch(searchSite) {
        case 'google':
            $('#search1').attr('action', 'https://cse.google.com/cse');
            $('#search1').append($('<input type="hidden" name="cx" value="015216951187127946265:3knf2jlhgkg" >'));
            $('#search_box .search_input').attr('name','q');
            break;
        case 'bing':
            $('#search1').attr('action', 'http://www.bing.com/search');
            $('#search_box .search_input').attr('name','q');
            break;
        case 'yahoo':
            $('#search1').attr('action', 'https://search.yahoo.com/search');
            $('#search_box .search_input').attr('name','p');
            $('#search1').append($('<input type="hidden" name="ie" value="utf-8" >'));
            break;
        case 'baidu':
            $('#search1').attr('action', 'https://www.baidu.com/s');
            $('#search_box .search_input').attr('name','wd');
            break;            
    }    
}

$('[name="searchradio"]').click(function() {
    for (var i = 0; i < $('[name="searchradio"]').length; i++) {
        if ($('[name="searchradio"]')[i].checked) {
            var j = i + 1;
            fengSetStorage("search", $('[values="' + j + '"]').val());
            chrome.runtime.sendMessage({what: "_trackEvent", category: "Search", action:"DefultSearch_"+$('[values="' + j + '"]').val(), label:"1"});
            chrome.runtime.sendMessage({what: "search_change"});
            updateSearch();
            searchtip();
            return;
        }       
    }
//   searchtip();
});
//定住当前界面
$('#sign').click(function() {
    if (!$('[name="radio"]')[0].checked) {
        return;
    }
    var sign = fengGetOnclick("pin");
    if (sign == null) {
    	document.getElementById('sign').className="pin cursor"
        fivestar();
        fengSetOnclick("pin", true);        
        $(".share_title").text(chrome.i18n.getMessage("better_pin"));
        chrome.runtime.sendMessage({what: "_trackEvent", category: "Pin", action:"LockImage_ON", label:"1"});
        return;
    } else if (sign) {
    	document.getElementById('sign').className="pins cursor"
    	$(".share_title").text(chrome.i18n.getMessage("better_pinned"));
        chrome.runtime.sendMessage({what: "_trackEvent", category: "Pin", action:"LockImage_OFF", label:"1"});
        fengClearStorage("pin");
    }
});
//设置按钮
$('.settingsicon').click(function() {
        if ($("#setting_box").css('opacity') == 1) {
            hideSettingBox();
            chrome.runtime.sendMessage({what: "_trackEvent", category: "BackgroundSettings", action:"close", label:"1"});
            return;
        } else {
            $(".sel_tabs .select_set").trigger('click');
            showSettingBox();
            updateSettings();
             chrome.runtime.sendMessage({what: "_trackEvent", category: "BackgroundSettings", action:"open", label:"1"});
        }
});

//$('.bunny_box').click(function() {
//  $('iframe.eb_tips').css('display', "none");
//  if (!$('[name="radio"]')[0].checked) {
//      return;
//  }
//  var sign = fengGetOnclick("pin");
//  if (sign == null) {
//      var ifrUrl = chrome.extension.getURL('html/pintip.html');
//      var iframe = $('<iframe src="' + ifrUrl + '" class="eb_tips" style="border: 0px; overflow: visible; padding: 0px; right: auto; z-index: ' + (2147483647) + '; bottom: 80px; left: 25px; position: fixed; height: 106px; width: 525px;  background: transparent;"></iframe>');
//      var newWidth = 284 + 25 + 'px';
//      $('iframe.eb_tips').css('width', newWidth);
//      $('.background').append(iframe);
//  } else {
//      change();
//      fivestar();
//  }
//});
//兔子按钮
$('.bunny_box2').click(function() {
    $('iframe.eb_tips').css('display', "none");
    if (!$('[name="radio"]')[0].checked) {
        return;
    }
    var sign = fengGetOnclick("pin");
    if (sign == null) {
        var ifrUrl = chrome.extension.getURL('html/pintip.html');
        var iframe = $('<iframe src="' + ifrUrl + '" class="eb_tips" style="border: 0px; overflow: visible; padding: 0px; right: auto; z-index: ' + (2147483647) + '; bottom: 80px; left: 25px; position: fixed;  width: 550px;  background: transparent;"></iframe>');
        var newWidth = 284 + 25 + 'px';
        $('iframe.eb_tips').css('width', newWidth);
        $('.background').append(iframe);
    } else {
        change();
        fivestar();
    }
    chrome.runtime.sendMessage({what: "_trackEvent", category: "SwitchImage", action:"click", label:"1"});
});

$('.bunny_box2').hover(function() {
	$(".share_title").text(chrome.i18n.getMessage("better_click"));
//  $(".share_title").text("Click it , Change  Background");
}, function() {
	$(".share_title").text(chrome.i18n.getMessage("better_start"));
//  $(".share_title").text("Attack on Titan New Tab");
});
$('.bunny_box').hover(function() {
	$(".share_title").text(chrome.i18n.getMessage("better_click"));
//  $(".share_title").text("Click it , Change  Background");
}, function() {
    $(".share_title").text(chrome.i18n.getMessage("better_start"));
//  $(".share_title").text("Attack on Titan New Tab");
});
//下载图片
$('.download').hover(function() {
	 $(".share_title").text( chrome.i18n.getMessage("better_down"));
    if ($('[name="radio"]')[0].checked) {
       var urls = getCurrentImg();
       if (!urls) urls = fengGetOnclick('current_url');
       if (!urls) {
       	   return;
       }
       $(".share_title").text( chrome.i18n.getMessage("better_down"));
    } 

},function(){
	$(".share_title").text(chrome.i18n.getMessage("better_start"));
});
$('.download').click(function() {
	 if ($('[name="radio"]')[0].checked) {
       var urls = getCurrentImg();
       if (!urls) urls = fengGetOnclick('current_url');
       if (!urls) {
       	   return;
       }
       $('#downloadUrl').attr('href', urls).attr('download', chrome.i18n.getMessage('extName')+'_'+ Date.now()+'.jpg');
       chrome.runtime.sendMessage({what: "_trackEvent", category: "Download", action:"Download", label:"1"});
    } 
});
$('#sign').hover(function() {
    if (!$('[name="radio"]')[0].checked) {
        return;
    }
    var sign = fengGetOnclick("pin");
    if (sign == null) {
    	 $(".share_title").text(chrome.i18n.getMessage("better_pinned"));
//      $(".share_title").text("You have pinned the current background");
    } else {
    	$(".share_title").text(chrome.i18n.getMessage("better_pin"));
//      $(".share_title").text("You can pin the current background");
    }
}, function() {
	$(".share_title").text(chrome.i18n.getMessage("better_start"));
//  $(".share_title").text("Attack on Titan New Tab");
});

$('.settingsicon').hover(function() {
	$(".share_title").text(chrome.i18n.getMessage("better_memu"));
//  $(".share_title").text("Show settings menu");
}, function() {
	$(".share_title").text(chrome.i18n.getMessage("better_start"));
//  $(".share_title").text("Attack on Titan New Tab");
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.what == "sure") {
            $('iframe.eb_tips').css('display', "none");
            if ($('[name="radio"]')[0].checked) {
                change();
            }
             fengSetOnclick("pin", true);
             document.getElementById('sign').className="pin cursor"

        } else if (request.what == "history_sure") {
            $('iframe.heb_tips').css('display', "none");

        } else if (request.what == "change_like") {
           change();
        } else if(request.what == "close"){
        	$('iframe.erroreb_tips').css('display', "none");
        }else if (request.what == "no") {
            $('iframe.eb_tips').css('display', "none");
        } else if (request.what == "fivestars_no") {
            $('iframe.eb_tipss').css('display', "none");
        } else if (request.what == "fivestar_sure") {
            $('iframe.eb_tipss').css('display', "none");
            var ifrUrlss = chrome.extension.getURL('html/fivestar2.html');
            var iframess = $('<iframe src="' + ifrUrlss + '" class="eb_tipsss" style="border: 0px; overflow: visible; padding: 0px; right: auto; z-index: ' + (2147483647) + '; bottom: 80px; left: 25px; position: fixed;  width: 550px;  background: transparent;"></iframe>');
            var newWidth = 284 + 25 + 'px';
            $('iframe.eb_tipss').css('width', newWidth);
            $('.background').append(iframess);
        } else if (request.what == "fivestar_next_no") {
            $('iframe.eb_tipsss').css('display', "none");
        } else if (request.what == "fivestar_next_sure") {
            $('iframe.eb_tipsss').css('display', "none");
            fengSetOnclick("fivestar", true);
            window.open("https://chrome.google.com/webstore/detail/"+chrome.runtime.id+"/reviews");
            return;
        }else if (request.what == "search_show") {
            $('iframe.searcheb_tips').css('display', "block");
//          fengSetOnclick("fivestar", true);
//          window.open("https://chrome.google.com/webstore/detail/foblenpmbgfbpompfjophgobpfgbmoni/reviews");
//          return;
        }else if (request.what == "search_close") {
        	 $('iframe.searcheb_tips').css('display', "none");
//          fengSetOnclick("fivestar", true);
//          window.open("https://chrome.google.com/webstore/detail/foblenpmbgfbpompfjophgobpfgbmoni/reviews");
//          return;
        }else if (request.what == "next") {//imgtest
            var imgs = ResourceSetting.getImgsArrayFromResource();
            if (imgs.length==0) {
                return;
            } 
            var index = Math.floor(Math.random() * imgs.length);
            var imageurl = imgs[index];
                
            chrome.runtime.sendMessage({
                what : "updateimg",
                imageurl : imageurl
            });
        }else if (request.what == "cleartime") {
            clearInterval(searchFocusInterval);
        } else if (request.what == "self_clear") {
           $('iframe.self_tips').css('display', "none");
        }else if (request.what == "newThesis_select") {           
           var urlSelector = fengGetStorage("urlnum");
           var index = urlSelector[urlSelector.length-1];
          if (index) {
              $('[name="checkboxs"]')[index].checked = true;
	          var urlHtml = "";
              var indexs = "thesis"+index;
	          var title = fengGetStorage(indexs)["theis"]
	          urlHtml += '<span><input id="'+indexs+'" type="checkbox" name="checkboxs"  ><label for="'+indexs+'">'+title+'</label></span> '
           $('#newurl').append(urlHtml)
           }      
        }else if (request.what == "check_like") {
        	$("#googlelogin").css("display","none");
 	        $("#fblogin").css("display","none");
 	        $("#orlogin").css("display","none");
           	$("#likecount").text(fengGetStorage("like_library")["like"].length);
        }
        
    });

/**===================================================****/

/**
 * google analyitics
 */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-97178398-1']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();/**===================================================****/

var initUI = function() {
    $('#search_box .search_input').focus();
    $('#search_box .search_input').click();
    updateSearch();
        
    initBackground();
    initShareUrl();
    initMenu();
    updateSettings();
    initTopsites();
    fivestar();
};

var initMenu = function() {
    $.jqtab(".sel_tabs", "#tab_conbox", ".tab_con", "click", "select_now");
    $.jqtab(".settingstab", "#tab_conbox2", ".tab_con2", "click", "select_now");
    
    $('#topSiteMenu').click(function() {
        var actives = 'select_now';
        $('.sel_tabs .select_topsite').addClass(actives).siblings("li").removeClass(actives);
        $('#tab_conbox').children().eq(0).show().siblings().hide();
        showSettingBox();
        updateSettings();
        chrome.runtime.sendMessage({what: "_trackEvent", category: "Memu", action:"history", label:"1"});
    });
    
    $('#menu .settingMenu').click(function() {
        var actives = 'select_now';
        $('.sel_tabs .select_set').addClass(actives).siblings("li").removeClass(actives);
        $('#tab_conbox').children().eq(1).show().siblings().hide();  
        if (!fengGetOnclick("pin")) {
 	      $('[name ="fre_pin"]')[0].checked = true;
        } else{
 	       $('[name ="fre_pin"]')[0].checked = false;
         }
        showSettingBox();
        updateSettings();
        chrome.runtime.sendMessage({what: "_trackEvent", category: "Memu", action:"settings", label:"1"});        
    });
    
   
};

var updateSettings = function() {
    var data = fengGetStorage("local");
    if (!data) {
        data = {"pic":[1,4],"res":"library"};
        fengSetStorage("local", data);
    }
    if (data["res"] == "library") {
        $('[name="radio"]')[0].checked = true;
        for (var i = 0; i < data["pic"].length; i++) {
            var j = data["pic"][i] - 1;
            $('[name="checkbox"]')[j].checked = true;
        }
    
    } else if (data["res"] == "color") {
        $('[name="radio"]')[1].checked = true;
    } else if (data["res"] == "local") {
        $('[name = "radio"]')[2].checked = true;
    }
};

var initTopsites = function() {
    chrome.topSites.get(function(tab) {
        var html = "";
        for (var i = 0; i < tab.length && i < 30; i++) {
            //              alert(tab[i]["title"].substring(0,20))
            html += '<a target="_self" href="' + tab[i]["url"] + '"><div >' +
                '<img src="chrome://favicon/size/16@1x/' + tab[i]["url"] + '" />&nbsp;&nbsp;' +
                ' ' + tab[i]["title"].substring(0, 20) + '...</div></a>'
                //              html + ='<a target="_blank" href="'+tab[i]["url"]+'"><div>'+
                //                          '<span class = "float"><img src="chrome://favicon/size/16@1x/'+tab[i]["url"]+'" /></span>'+
                ////                          '<span class = "float">'+tab[i]["title"].substring(0,20)+'</span>'+           
                //                          '</div></a>';
        }
        $('[class="history_list"]').html(html);
    });    
};

var initShareUrl = function() {
    var extUrl = 'https://chrome.google.com/webstore/detail/'+chrome.runtime.id;
    var title = 'Discover%20from%20'+chrome.i18n.getMessage('extName');
    var width = Math.floor($(window).width()/2);
    var height = Math.floor($(window).height()/2);
    var left = Math.floor($(window).width()/4);
    var top = Math.floor($(window).height()/4);
    
    var currentUrl = extUrl;
    $('.twitter').click(function() {
        //var currentUrl = fengGetOnclick('current_url');
        var url = 'https://twitter.com/intent/tweet?text='+title+'&tw_p=tweetbutton&url='+currentUrl+'';
        chrome.windows.create({url:url, type:'panel', state:'normal', width:width, height:height, left:left, top:top});
        chrome.runtime.sendMessage({what: "_trackEvent", category: "Share", action:"twitter", label:"1"});
        return false;
    });
    
    $('.sina').click(function() {
        //var currentUrl = fengGetOnclick('current_url');
        var sourceUrl = extUrl + '?utm_campaign=backgroundshare&utm_medium=social&utm_source=weibo';
        var url = 'http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+sourceUrl+'&content=utf-8&sourceUrl='+sourceUrl+'&pic='+currentUrl;
        chrome.windows.create({url:url, type:'panel', state:'normal', width:width, height:height, left:left, top:top});
        chrome.runtime.sendMessage({what: "_trackEvent", category: "Share", action:"Weibo", label:"1"});
        return false;
    });
    
    $('.qq').click(function() {
        //var currentUrl = fengGetOnclick('current_url');
        var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+currentUrl+'&title='+title;
        chrome.windows.create({url:url, type:'panel', state:'normal', width:width, height:height, left:left, top:top});
        chrome.runtime.sendMessage({what: "_trackEvent", category: "Share", action:"qzone", label:"1"});
        return false;
    });
    
    $('.fb').click(function() {
        //var currentUrl = fengGetOnclick('current_url');
        var url = 'http://www.facebook.com/sharer.php?u='+currentUrl+'&t='+title;
        chrome.windows.create({url:url, type:'panel', state:'normal', width:width, height:height, left:left, top:top});
       chrome.runtime.sendMessage({what: "_trackEvent", category: "Share", action:"fb", label:"1"});
       return false;
    });
    
    $('.pint').click(function() {
        //var currentUrl = fengGetOnclick('current_url');
        var url = 'https://pinterest.com/pin/create/button/?url='+extUrl+'?utm_campaign=backgroundshare&utm_medium=social&utm_source=pint&media='+currentUrl+'&description='+title;
        chrome.windows.create({url:url, type:'panel', state:'normal', width:width+150, height:height, left:left-75, top:top});
        chrome.runtime.sendMessage({what: "_trackEvent", category: "Share", action:"print", label:"1"});
        return false;
    }); 
    $('.google').click(function() {
        //var currentUrl = fengGetOnclick('current_url');
        var url ='https://plus.google.com/share?url='+currentUrl+'?utm_source=plus';       
        chrome.windows.create({url:url, type:'panel', state:'normal', width:width+150, height:height, left:left-75, top:top});
        chrome.runtime.sendMessage({what: "_trackEvent", category: "Share", action:"google", label:"1"});
        return false;
    }); 
    
    

    $('.fb').hover(function() {
    	$(".share_title").text(chrome.i18n.getMessage("better_fb"));
//      $(".share_title").text("Share background image to Facebook");
    }, function() {
    	$(".share_title").text(chrome.i18n.getMessage("better_start"));
//      $(".share_title").text("Attack on Titan New Tab");
    }); 
    $('.twitter').hover(function() {
    	$(".share_title").text(chrome.i18n.getMessage("better_twitter"));
//      $(".share_title").text("Share background image to Twitter");
    }, function() {
        $(".share_title").text(chrome.i18n.getMessage("better_start"));
//      $(".share_title").text("Attack on Titan New Tab");
    }); 
    $('.sina').hover(function() {
    	$(".share_title").text(chrome.i18n.getMessage("better_sina"));
//      $(".share_title").text("Share background image to Sina");
    }, function() {
        $(".share_title").text(chrome.i18n.getMessage("better_start"));
//      $(".share_title").text("Attack on Titan New Tab");
    }); 
    $('.qq').hover(function() {
    	$(".share_title").text(chrome.i18n.getMessage("better_qq"));
//      $(".share_title").text("Share background image to QQ");
    }, function() {
        $(".share_title").text(chrome.i18n.getMessage("better_start"));
//      $(".share_title").text("Attack on Titan New Tab");
    }); 
    $('.pint').hover(function() {
    	$(".share_title").text(chrome.i18n.getMessage("better_print"));
//      $(".share_title").text("Share background image to Print");
    }, function() {
        $(".share_title").text(chrome.i18n.getMessage("better_start"));
//      $(".share_title").text("Attack on Titan New Tab");
    }); 
    $('.google').hover(function() {
    	$(".share_title").text(chrome.i18n.getMessage("better_google"));
//      $(".share_title").text("Share background image to Google");
    }, function() {
        $(".share_title").text(chrome.i18n.getMessage("better_start"));
//      $(".share_title").text("Attack on Titan New Tab");
    }); 

    
    ///////////////////////Share icon in Settings - About/////////////////////////////
    
    $('.share_icon [alt="Sina"]').click(function() {
        // var currentUrl = fengGetOnclick('current_url');
        var sourceUrl = extUrl + '?utm_campaign=backgroundshare&utm_medium=social&utm_source=weibo';
        var url = 'http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+sourceUrl+'&content=utf-8&sourceUrl='+sourceUrl+'&pic='+currentUrl;
        chrome.windows.create({url:url, type:'panel', state:'normal', width:width, height:height, left:left, top:top});
        return false;
    });
    
    $('.share_icon [alt="Twitter"]').click(function() {
        var url = 'https://twitter.com/intent/tweet?text='+title+'&tw_p=tweetbutton&url='+extUrl+'';
        chrome.windows.create({url:url, type:'panel', state:'normal', width:width, height:height, left:left, top:top});
        return false;
    });
    
    $('.share_icon [alt="QQ"]').click(function() {
        var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+extUrl+'&title='+title;
        chrome.windows.create({url:url, type:'panel', state:'normal', width:width, height:height, left:left, top:top});
        return false;
    });
    
    $('.share_icon [alt="Facebook"]').click(function() {
        var url = 'http://www.facebook.com/sharer.php?u='+extUrl+'&t='+title;
        chrome.windows.create({url:url, type:'panel', state:'normal', width:width, height:height, left:left, top:top});
        return false;
    });
};

var showSettingBox = function() {
    $("#setting_box").animate({
        "right": "0px",
        "opacity": 1
    }, 500, 'easeInOutCubic');
    setTimeout(function(){
        $("#setting_box").focus();
    }, 600);
};

var hideSettingBox = function() {
    $("#setting_box").animate({
        "right": "-500px",
        "opacity": 0
    }, 500, 'easeInOutCubic');
};

initUI();
$("#library").click(function(){
	   var imgs = ResourceHistorySetting.getImgsArrayFromResource();
	   if (imgs.length==0) {
            return;
        }
        var index = Math.floor(Math.random() * imgs.length);
        var imageurl = imgs[index];
        var currentUrl = '';
        var updateImageObj = UpdateImage.get();
        var updateImageInfo = updateImageObj['value'];
        var updateImageKey =  updateImageObj['key'];
        
        var nowImage = imageurl;
        if (updateImageInfo) {
            nowImage = updateImageInfo.img;
            if (!nowImage) {
                // if cacheImage not ready or do not set previous image yet or set just in 10s, use the url image.
                nowImage = updateImageInfo.url;
            }  
            UpdateImage.pop();
            fengSetOnclick('current_url', updateImageInfo.url || '');
            fengSetStorage('current_img', {'img_key': updateImageKey});
        } else {
            var index = Math.floor(Math.random() * imgs.length);
            currentUrl = imgs[index];
            nowImage = imgs[index];
            fengSetOnclick('current_url', currentUrl || '');
            fengSetOnclick('current_img', currentUrl || '');
        }
        fengSetOnclick("current_update_time", new Date().getTime());
        
        if (nowImage) {
            $(".background").css({
                "background-image": 'url("' + nowImage + '")'
            });
            
            if (nowImage == currentUrl) {
                $(".background").css({
                   "background-color": "#303030"
                });
            }
        } else {
            return;
        }
        
        var img = new Image();
        img.src = nowImage;
        if (img.complete) {

        } else {
            img.onload = function() {

            };
            img.onerror = function() {
                $(".background").css({
                    "background-color" : "#5EC8D8"
                });
            };
        }
       if ( fengGetStorage("localhistory")) {
        	 $('[name = "radio"]')[2].disabled = false;
        }
        chrome.runtime.sendMessage({
            what: "updateimg",
            imageurl: imageurl
        }, function() {
        	 
        });

});
$("#local_set").click(function(){
	 $(".background").css({
            "background-image": 'url("' + fengGetStorage("localhistory") + '")'
        });
        local["pic"] = fengGetStorage("localhistory");
        local["res"] = "local";
        fengSetStorage("local", local);
     
        if ( fengGetStorage("libraryhistory")) {
        	 $('[name = "radio"]')[0].disabled = false;
        } 
});
//alert($(document).height())
 var searchHeight = Math.floor($(document).height()*0.3) +"px" + "";
   $('#search_box').css("top",searchHeight);
 var xwidth = document.body.offsetWidth -290;
   $('body').click(function(e){
   	     var opacitynum = document.getElementById("setting_box").style.opacity;
         if(e && e.screenX && e.screenX<xwidth&&opacitynum == "1"){
         	hideSettingBox();
         }
         
         if(e && e.screenX && e.screenX<xwidth){
            // hide weather details.
            $('#weather_list').toggleClass('is-visible',false);
         }
    });
 $("#topSiteMenu").hover(function() {
        $(this).addClass("hovereff1");
    }, function() {
        $(this).removeClass("hovereff1");
    });  
$("#settingMenu").hover(function() {
        $(this).addClass("hovereff1");
    }, function() {
        $(this).removeClass("hovereff1");
    });  
// $('#search_bar').trigger('click');

$('[msg-name]').each(function(){
	var ele = $(this);
	var messageName = ele.attr('msg-name');
	ele.text(chrome.i18n.getMessage(messageName));
//	chrome.runtime.sendMessage({what:"change_option"});
});
$("#search_box").hover(function() { //test
	$("#search_box").css("opacity","1.0");
	$("#search_box").css("background","white");
   }, function() {
   	if ($('#search_bar').val().length == 0) {
    	$("#search_box").css("opacity","0.8");
    	$("#search_box").css("background","#eeeef1");
    	 }   	
    });  
//选择哪个库的统计计数
$("#checkbox1").click(function(){
	if($('[name="checkbox"]')[0].checked){
		 chrome.runtime.sendMessage({what: "_trackEvent", category: "Background", action:"500px", label:"on"});
	}else{
		  chrome.runtime.sendMessage({what: "_trackEvent", category: "Background", action:"500px", label:"off"});
	}
})
$("#checkbox2").click(function(){
	if($('[name="checkbox"]')[1].checked){
		 chrome.runtime.sendMessage({what: "_trackEvent", category: "Background", action:"GoogleArt", label:"on"});
	}else{
		 chrome.runtime.sendMessage({what: "_trackEvent", category: "Background", action:"GoogleArt", label:"off"});
	}
})
$("#checkbox3").click(function(){
	if($('[name="checkbox"]')[2].checked){
		  chrome.runtime.sendMessage({what: "_trackEvent", category: "Background", action:"flickr", label:"on"});
	}else{
		  chrome.runtime.sendMessage({what: "_trackEvent", category: "Background", action:"flickr", label:"off"});
	}
})
$("#checkbox4").click(function(){
	if($('[name="checkbox"]')[3].checked){
		   chrome.runtime.sendMessage({what: "_trackEvent", category: "Background", action:"Bing", label:"on"});
	}else{
		   chrome.runtime.sendMessage({what: "_trackEvent", category: "Background", action:"Bing", label:"off"});
	}
})
//分享图片的按钮
$('[src="image/main/Fb-r.png"]').click(function(){
	chrome.runtime.sendMessage({what: "_trackEvent", category: "ExtensionShare", action:"fb", label:"1"});
})
$('[src="image/main/twitter-r.png"]').click(function(){
	chrome.runtime.sendMessage({what: "_trackEvent", category: "ExtensionShare", action:"twitter", label:"1"});
})
$('[src="../image/main/google6.png"]').click(function(){
	chrome.runtime.sendMessage({what: "_trackEvent", category: "ExtensionShare", action:"google", label:"1"});
})
$('[src="image/main/sina-r.png"]').click(function(){
	chrome.runtime.sendMessage({what: "_trackEvent", category: "ExtensionShare", action:"sina", label:"1"});
})
$('[src="image/main/QQ-r.png"]').click(function(){
	chrome.runtime.sendMessage({what: "_trackEvent", category: "ExtensionShare", action:"qq", label:"1"});
})
function searchfocus(){
//	document.getElementById("search_box").focus(); 
	 $('#search_box .search_input').focus();
}

// Be carefully, should clear this interval when click to edit weather location in weather.js.
var searchFocusInterval = setInterval('searchfocus()',1000); 
var sign = fengGetOnclick("pin");
    if (sign == null) {
    	document.getElementById('sign').className="pins cursor";
//  	$(".pin").css({
//          "background-image": "url(" + Pin.png + ")"
//      });
//      $("li .pin").backgroundImage ="image/main/Pin.png";
    } 
// if (!sign) {
// 	$('[name ="fre_pin"]')[0].checked = true;
// } else{
// 	$('[name ="fre_pin"]')[0].checked = false;
// }
 $('[name ="fre_pin"]').click(function(){
 	if($('[name ="fre_pin"]')[0].checked){
 		document.getElementById('sign').className="pins cursor";
 		fengClearStorage("pin");
 	}else{
 		document.getElementById('sign').className="pin cursor";
 		fengSetOnclick("pin",true);
 	}
 })
$('[msg-name="setting"]').click(function(){
	if (!fengGetOnclick("pin")) {
 	$('[name ="fre_pin"]')[0].checked = true;
 } else{
 	$('[name ="fre_pin"]')[0].checked = false;
 }
});
$('[msg-name="background"]').click(function(){
	if (!fengGetOnclick("pin")) {
 	$('[name ="fre_pin"]')[0].checked = true;
 } else{
 	$('[name ="fre_pin"]')[0].checked = false;
 }
});
//var index = fengGetOnclick("frequent");
//if (index == null) {
//	index = 3;
//}
if (fengGetOnclick("frequent") == 1) {
	var currentInterval = 60 * 1000;
} else if (fengGetOnclick("frequent") == 2) {
	var currentInterval = 60 * 60 * 1000;
} else if (fengGetOnclick("frequent") == 3|| !fengGetOnclick("frequent")) {
	var currentInterval = 24 * 60 * 60 * 1000;
}else if (fengGetOnclick("frequent") == 0) {
	var currentInterval = 365*24 * 60 * 60 * 1000;
} 
var changeInterval =  setInterval("change()", currentInterval);
if (fengGetOnclick("frequent")&&fengGetOnclick("frequent")<4) {
	$('[name="frequent"]')[fengGetOnclick("frequent")].checked = true;
} else{
	 setTimeout(function() {fengSetOnclick("frequent",3)});	
	$('[name="frequent"]')[3].checked = true;
}

$('[name="frequent"]').click(function() {
	for (var i = 0; i < $('[name="frequent"]').length; i++) {
		clearInterval(changeInterval);
		if ($('[name="frequent"]')[i].checked) {
			fengSetOnclick("frequent", i);
			if (i == 1) {
				var currentInterval1 = 60 * 1000;
			} else if (i== 2) {
				var currentInterval1 = 60 * 60 * 1000;
			} else if (i == 3) {
				var currentInterval1 = 24 * 60 * 60 * 1000;
			}else if (i == 0) {
	            var currentInterval1 = 365*24 * 60 * 60 * 1000;
            }
			    setInterval("change()", currentInterval1);
		}
	}
})
var version = chrome.app.getDetails().version;
var vhtml = "Attack on Titan New Tab v"+version;
$('.about_text').text(vhtml);

$('#search_bar').focus(function(){
//	$("#search_box").css("opacity","1.0");
//	$("#search_box").css("background","white");
	
});
if(!fengGetOnclick("history_show")){
	fengSetOnclick("history_show","1");
	$('[name="history"]')[0].checked = true;
	   history();
}else if(fengGetOnclick("history_show")=="1"){
	$('#history_sign').remove();
}else if(fengGetOnclick("history_show")=="0"){
	$('[name="history"]')[0].checked = true;
	   history();
	
}
//在搜索框下面的历史记录
$('[name="history"]').click(function(){	
		if($('[name="history"]')[0].checked){
			fengSetOnclick("history_show","0");
			var htmls = '<img src="image/main/history_close.png"  id="history_sign"/>'
			$('.history_sign').html(htmls);
			   history();
		}else{
			fengSetOnclick("history_show","1");
			
				$('#history_sign').remove();
			     $('#history_display').html("");
			
		}
	
})
 $('.history_sign').click(function(){
 	$('[name="history"]')[0].checked = false;
 	fengSetOnclick("history_show","1");
 	 $('#history_display').html("");			
 	$('#history_sign').remove();
 	var hifrUrl = chrome.extension.getURL('html/history.html');
        var hiframe = $('<iframe src="' + hifrUrl + '" class="heb_tips" style="border: 0px; overflow: visible; padding: 0px; right: auto; z-index: ' + (2147483647) + '; bottom: 80px; left: 25px; position: fixed;  width: 500px;  background: transparent;"></iframe>');
        var newWidth = 284 + 25 + 'px';
        $('iframe.eb_tips').css('width', newWidth);
        $('.background').append(hiframe);
 })

 function history(){
 //8个历史记录框的显示规则	
 chrome.topSites.get(function(tab) {
 	    var count = 0;
 	    var ebaysign = false;
 	    var googlesign = false;
 	    var baidusign = true;
 	    var htmls = "";
 	    if(navigator.language.indexOf("zh")>-1){
 	    	baidusign = false;
 	    }
 	    for (var i = 0; i < tab.length && i < 8; i++) {
 	    	if (tab[i]["url"].indexOf("ebay")>-1) {
 	    		ebaysign = true;
 	    	} else if (tab[i]["url"].indexOf("google")>-1){
 	    		googlesign = true;
 	    	}else if (tab[i]["url"].indexOf("baidu")>-1){
 	    		baidusign = true;
 	    	}
 	    }
 	    
 	    if (!ebaysign) {
 	    	if ( tab.length<3) { 	    	 	
 	    		for (var i = 0; i < tab.length&&i<3; i++) {	
 	    			var img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
 	    			if (tab[i]["url"].indexOf("www.google")>-1||tab[i]["url"].indexOf("www.Google")>-1) {
 	    				img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
 	    			}else if(tab[i]["url"].indexOf("chrome")>-1||tab[i]["url"].indexOf("Chrome")>-1){
 	    				img = "image/main/chrome.png";
 	    			}
 	    			if(i==0){
 	    				htmls+='<div>';
 	    			}
 	    		htmls += '<a target="_self" href="' + tab[i]["url"] + '"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;'+tab[i]["title"].substring(0, 18)+'</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="' + img + '" width ="32px" height = "32px" /></div>'+
		    	'</div></span></a>'
		    	count++;
 	    		
 	    		}
   	    	 htmls +='<a target="_self" href="http://www.ebay.com"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;Ebay.com</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="image/main/EBay_logo.48.png" /></div>'+
		    	'</div></span></a>'
		    	count++;
		    	if (!baidusign) {
		    		if (count==4) {
		    			
 	    				htmls+='</div>';
 	    			
		    			htmls +='<div class="history_gap"><a target="_self" href="http://www.baidu.com"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;Baidu.com</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="image/main/baidu_logo.png" /></div>'+
		    	   '</div></span></a></div>'; 
		    		} else{
		    			htmls +='<a target="_self" href="http://www.baidu.com"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;Baidu.com</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="image/main/baidu_logo.png" /></div>'+
		    	'</div></span></a></div>'
		    		}
		    	}else{
		    		htmls+='</div>'
		    	}	    		
 	    	}else{
 	    		for (var i = 0; i<4; i++) {	
 	    			var img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
 	    			if (tab[i]["url"].indexOf("www.google")>-1||tab[i]["url"].indexOf("www.Google")>-1) {
 	    				img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
 	    			}else if(tab[i]["url"].indexOf("chrome")>-1||tab[i]["url"].indexOf("Chrome")>-1){
 	    				img = "image/main/chrome.png";
 	    				
 	    			}
 	    			if(i==0){
 	    				htmls+='<div>'
 	    			}
 	    		htmls += '<a target="_self" href="' + tab[i]["url"] + '"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;'+tab[i]["title"].substring(0, 18)+'</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="' + img + '" width ="32px" height = "32px" /></div>'+
		    	'</div></span></a>';
		    	count++;
 	    		
 	    		}
   	    	 htmls +='<div class="history_gap"><a target="_self" href="http://www.ebay.com"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;Ebay.com</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="image/main/EBay_logo.48.png" /></div>'+
		    	'</div></span></a>'; 
		    	count++;
		    	for (var i = 4; i < tab.length&&i<6; i++) {	
		    		var img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
 	    			if (tab[i]["url"].indexOf("www.google")>-1||tab[i]["url"].indexOf("www.Google")>-1) {
 	    				img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
 	    			}else if(tab[i]["url"].indexOf("chrome")>-1||tab[i]["url"].indexOf("Chrome")>-1){
 	   
 	    				img = "image/main/chrome.png";
 	    			}
 	    		htmls += '<a target="_self" href="' + tab[i]["url"] + '"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;'+tab[i]["title"].substring(0, 18)+'</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="' + img + '" width ="32px" height = "32px" /></div>'+
		    	'</div></span></a>';
		    	count++; 	    		
 	    		}
		    	if (!baidusign) {
		    		if (count==7) {
		    			htmls +='<a target="_self" href="http://www.baidu.com"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;Baidu.com</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="image/main/baidu_logo.png" /></div>'+
		    	   '</div></span></a>'; 
		    		} else{
		    			
		    	      if (tab.length>5) {	
		    	      	htmls +='<a target="_self" href="http://www.baidu.com"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;Baidu.com</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="image/main/baidu_logo.png" /></div>'+
		    	'</div></span></a>'
		    	var img = "chrome://favicon/size/48@2x/" + tab[6]["url"];
 	    			if (tab[6]["url"].indexOf("www.Google")>-1||tab[6]["url"].indexOf("www.google")>-1) {
 	    				img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
 	    			}else if(tab[6]["url"].indexOf("chrome")>-1||tab[6]["url"].indexOf("chrome")>-1){
 	    				img = "image/main/chrome.png";
 	    			}
		    	htmls += '<a target="_self" href="' + tab[6]["url"] + '"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;'+tab[6]["title"].substring(0, 18)+'</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="' + img + '" width ="32px" height = "32px" /></div>'+
		    	'</div></span></a></div>';
		    	      } else{
		    	      	htmls +='<a target="_self" href="http://www.baidu.com"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;Baidu.com</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="image/main/baidu_logo.png" /></div>'+
		    	'</div></span></a></div>'
		    	      }
		    		}
		    	}else{
		    		
		    		if (tab.length>5) {	
		    	      				    	      	
		    	      for (var i = 6; i < tab.length&&i<7; i++) {	
		    		var img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
 	    			if (tab[i]["url"].indexOf("www.google")>-1||tab[i]["url"].indexOf("www.Google")>-1) {
 	    				img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
 	    			}else if(tab[i]["url"].indexOf("chrome")>-1||tab[i]["url"].indexOf("Chrome")>-1){
 	   
 	    				img = "image/main/chrome.png";
 	    			}else if(tab[i]["url"].indexOf("ebay")>-1||tab[i]["url"].indexOf("Ebay")>-1){
 	    				img = "image/main/EBay_logo.48.png";
 	    			}
 	    		htmls += '<a target="_self" href="' + tab[i]["url"] + '"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;'+tab[i]["title"].substring(0, 18)+'</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="' + img + '" width ="32px" height = "32px" /></div>'+
		    	'</div></span></a>';
		    	count++; 	    		
 	    		}		 
		    	
		    	      } 
		    		htmls+='</div>'
		    	}
 	    	}
 	    	
 	    }
 	    
 	    else{
 	    
 	    	if ( tab.length<4) {

 	    		for (var i = 0; i < tab.length&&i<4; i++) {	
 	    			var img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
 	    			if (tab[i]["url"].indexOf("www.google")>-1||tab[i]["url"].indexOf("www.Google")>-1) {
 	    				img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
 	    			}else if(tab[i]["url"].indexOf("chrome")>-1||tab[i]["url"].indexOf("Chrome")>-1){
 	    				img = "image/main/chrome.png";
 	    			}else if(tab[i]["url"].indexOf("ebay")>-1||tab[i]["url"].indexOf("Ebay")>-1){
 	    				img = "image/main/EBay_logo.48.png";
 	    			}
 	    			if (i==0) {
 	    				htmls+='<div>'
 	    			}
 	    		htmls += '<a target="_self" href="' + tab[i]["url"] + '"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;'+tab[i]["title"].substring(0, 18)+'</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="' + img + '" width ="32px" height = "32px" /></div>'+
		    	'</div></span></a>'
 	    		  count++;
 	    		}
 	    		if (!baidusign) {
		    		if (count==4) {
		    			htmls +='<div class="history_gap"><a target="_self" href="http://www.baidu.com"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;Baidu.com</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="image/main/baidu_logo.png" /></div>'+
		    	   '</div></span></a></div>'; 
		    		} else{
		    			htmls +='<a target="_self" href="http://www.baidu.com"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;Baidu.com</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="image/main/baidu_logo.png" /></div>'+
		    	'</div></span></a></div>'
		    		}
		    	}else{
		    		htmls+='</div>'
		    	}	 
 	    		
   	    	
 	    	}else{
 	 	 
		    	for (var i = 0; i < tab.length&&i<4; i++) {	
		    		var img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
 	    			if (tab[i]["url"].indexOf("www.google")>-1||tab[i]["url"].indexOf("www.Google")>-1) {
 	    				img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
 	    			}else if(tab[i]["url"].indexOf("chrome")>-1||tab[i]["url"].indexOf("Chrome")>-1){
 	    				img = "image/main/chrome.png";
 	    			}else if(tab[i]["url"].indexOf("ebay")>-1||tab[i]["url"].indexOf("Ebay")>-1){
 	    				img = "image/main/EBay_logo.48.png";
 	    			}
 	    			if(i==0){
 	    				htmls+='<div>';
 	    			}
 	    		htmls += '<a target="_self" href="' + tab[i]["url"] + '"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;'+tab[i]["title"].substring(0, 18)+'</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="' + img + '" width ="32px" height = "32px" /></div>'+
		    	'</div></span></a>';
		    	count++;
//		    	if(i==3){
// 	    				htmls+='</div>;
// 	    			}
		    	}
		    	
		    	for (var i = 4; i < tab.length&&i<7; i++) {	
		    		var img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
   	    			if (tab[i]["url"].indexOf("www.google")>-1||tab[i]["url"].indexOf("www.Google")>-1) {
   	    				img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
   	    			}else if(tab[i]["url"].indexOf("chrome")>-1||tab[i]["url"].indexOf("Chrome")>-1){
   	    				img = "image/main/chrome.png";
   	    			}else if(tab[i]["url"].indexOf("ebay")>-1||tab[i]["url"].indexOf("Ebay")>-1){
   	    				img = "image/main/EBay_logo.48.png";
   	    			}
   	    			if(i==4){
   	    				htmls+='<div class="history_gap">'
   	    			}
   	    		htmls += '<a target="_self" href="' + tab[i]["url"] + '"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;'+tab[i]["title"].substring(0, 18)+'</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="' + img + '" width ="32px" height = "32px" /></div>'+
		    	'</div></span></a>';
		    	count++;
		    	}
		    	if (!baidusign) {
		    		if (count==7) {
		    			htmls +='<a target="_self" href="http://www.baidu.com"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;Baidu.com</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="image/main/baidu_logo.png" /></div>'+
		    	   '</div></span></a></div>'; 
		    		} else{
		    			
		    	      if (tab.length>6) {
		    	      	
		    	var img = "chrome://favicon/size/48@2x/" + tab[7]["url"];
   	    			if (tab[7]["url"].indexOf("www.Google.com")>-1||tab[7]["url"].indexOf("www.google")>-1) {
   	    				img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
   	    			}else if(tab[7]["url"].indexOf("ebay")>-1||tab[7]["url"].indexOf("Ebay")>-1){
   	    				img = "image/main/EBay_logo.48.png";
   	    			}
		    	htmls += '<a target="_self" href="' + tab[7]["url"] + '"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;'+tab[7]["title"].substring(0, 18)+'</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="' + img + '" width ="32px" height = "32px" /></div>'+
		    	'</div></span></a>';
		    	htmls +='<a target="_self" href="http://www.baidu.com"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;Baidu.com</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="image/main/baidu_logo.png" /></div>'+
		    	'</div></span></a></div>'
		    	      } else{
		    	      	htmls +='<a target="_self" href="http://www.baidu.com"><span class="span2"><div>'+
		    			'<div ><font size="2" color="white">&nbsp;&nbsp;Baidu.com</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="image/main/baidu_logo.png" /></div>'+
		    	'</div></span></a></div>'
		    	      }
		    		}
		    	}else{
		    	if (tab.length>7) {			    	      	
		    	      for (var i = 7; i < tab.length&&i<8; i++) {	
		    		var img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
   	    			if (tab[i]["url"].indexOf("www.google.com")>-1||tab[i]["url"].indexOf("www.Google.com")>-1) {
   	    				img = "chrome://favicon/size/48@2x/" + tab[i]["url"];
   	    			}else if(tab[i]["url"].indexOf("chrome")>-1||tab[i]["url"].indexOf("Chrome")>-1){
   	   
   	    				img = "image/main/chrome.png";
   	    			}else if(tab[i]["url"].indexOf("ebay")>-1||tab[i]["url"].indexOf("Ebay")>-1){
   	    				img = "image/main/EBay_logo.48.png";
   	    			}
   	    		htmls += '<a target="_self" href="' + tab[i]["url"] + '"><span class="span2"><div>'+
		    			'<div class ="history_titles"><font size="2" color="white">&nbsp;&nbsp;'+tab[i]["title"].substring(0, 18)+'</font></div>'+
		    			'<br />'+
		    			'<br />'+
		    			'<div align="center"><img src="' + img + '" width ="32px" height = "32px" /></div>'+
		    	'</div></span></a>';
		    	count++; 	    		
   	    		}		 
		    	}
		    		htmls+='</div>'
		    	}
 	    		
 	    		
 	    	}	    	
 	    }
 	   console.log(htmls)
 	    $('#history_display').html(htmls)
      var availwidth = parseFloat(document.body.clientWidth) - 0.4*parseFloat(document.body.clientWidth);
 
      $('.span2').css("width",parseFloat(document.body.clientWidth)*0.13);
      $('.span2').css("margin-left",parseFloat(document.body.clientWidth)*0.01)
      $('.history_titles').css("padding-top","5px");
       
    });    
}
 //是否显示历史记录框
 if(!fengGetOnclick("history_show")){
	fengSetOnclick("history_show","0");
	$('[name="history"]')[0].checked = true;
	   history();
}else if(fengGetOnclick("history_show")=="1"){
	$('#history_sign').remove();
}else if(fengGetOnclick("history_show")=="0"){
	$('[name="history"]')[0].checked = true;
	   history();
	
}
//是否显示天气
if(!fengGetOnclick("weather_show")){
	fengSetOnclick("weather_show","0");
	$('[name="weather"]')[0].checked = true;
}else if(fengGetOnclick("weather_show")=="1"){
	$('#weather_Big').css("display","none");
}else if(fengGetOnclick("weather_show")=="0"){
	$('[name="weather"]')[0].checked = true;
	$('#weather_Big').css("display","block");  
	
}
 $('[name ="weather"]').click(function(){
 	if ($('[name ="weather"]')[0].checked) {
 		$('#weather_Big').css("display","block");
 		fengSetOnclick("weather_show",0);
 	} else{
 		$('#weather_Big').css("display","none");
 		fengSetOnclick("weather_show",1);
 	} 
 	
 })

  //自定义壁纸
    $('#self_defs').click(function(){
        var width = $(window).height() -200;
        var widthPx = width +"px"
        $('#back').css("display","block");
        $('#back').css("margin-top",widthPx);
        chrome.runtime.sendMessage({what: "_trackEvent", category: "setting", action:"customizeLibrary", label:"1"});
    })
    $('#closeUrl').click(function(){
        $('#back').css("display","none");
    });
var  urllen = fengGetOnclick("thesisCount");
var urlHtml = "";
for (var i= 1;i<=urllen;i++) {
	var index = "thesis"+i;
	
	if (fengGetStorage(index)&&fengGetStorage(index)["theis"]) {
		var titles = fengGetStorage(index)["theis"];
        var title = titles.substring(0,20);
//		if(title.length<15){
//			for (var i = 0;i<15-title.length;i++) {
//				title+=" ";
//			}
//		}
		urlHtml += '<span class="'+index+'"><input id="'+index+'" type="checkbox" name="checkboxs"  ><label for="'+index+'">'+title+'</label>'+
		            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../images/delete.png" id ="deteles" name ="'+ index+'" /></span>';
	}
	
}
$('#newurl').append(urlHtml)
//选择展示自己的主题壁纸库
$('[name="checkboxs"]').click(function(){
	var numUrl = [];
    var j = 0;
    for (var i = 0; i < $('[name="checkboxs"]').length; i++) {
        if ($('[name="checkboxs"]')[i].checked) {
            numUrl[j++] = i + 1;
        }
    }
    fengSetStorage("urlnum",numUrl);
     if (fengGetStorage("local")["pic"].length==0) {
		chrome.runtime.sendMessage({what:"self_clear"});
	}else{
		 change_online();
	}
    
})
//从localstorage中确定那几个主题壁纸是用户选中的
var urlSelector = fengGetStorage("urlnum")||[];
for (var i = 0;i<urlSelector.length;i++) {
	var index = urlSelector[i]-1;
//	var j = i+1;
//	var id = "#thesis"+j;
	$('[name="checkboxs"]')[index].checked = true;
}

$('#history').click(function(){
	if($('[name ="history"]')[0].checked){
		chrome.runtime.sendMessage({what: "_trackEvent", category: "history_woindows", action:"open", label:"1"});
	}else{
		chrome.runtime.sendMessage({what: "_trackEvent", category: "history_woindows", action:"setting_close", label:"1"});
	}
})
$('[class="history_sign"]').click(function(){
	
		chrome.runtime.sendMessage({what: "_trackEvent", category: "history_woindows", action:"icon_close", label:"1"});

});
//localstorage中几个默认库都没选中
  var data1 = fengGetStorage("local")["pic"];
    if(data1.length==0) {
    	for (var i = 0; i < $('[name="checkbox"]').length; i++) {
        if ($('[name="checkbox"]')[i].checked) {
            $('[name="checkbox"]')[i].checked = false;
        }
          }
    }
 $('#input').click(function(){
 	clearInterval(searchFocusInterval);
 })
 
//删除自定义库 
 $('[src="../images/delete.png"]').click(function(){
 	 if(confirm(chrome.i18n.getMessage("delete"))) {

     	if($('[src="../images/delete.png"]').length==1){
   		fengClearStorage("thesis1");
// 		fengClearOnclick("thesis1_url");
   		fengSetOnclick("thesisCount",0);
   		fengSetStorage("urlnum",[]); 		
   		$(".thesis1").remove();
   		return;
   		
   	}
     	//
   var count = fengGetOnclick("thesisCount");
   var index = parseInt($(this).attr("name").replace("thesis",""));
    
  
   for (var i = index +1;i<=count;i++) {
   	var j = i -1;
   	fengSetStorage("thesis"+j,fengGetStorage("thesis"+i));
    var deletePngList = $('[src="../images/delete.png"]'); 
    deletePngList.eq(j).attr('name', deletePngList.eq(j-1).attr('name'));
   }
   fengClearStorage("thesis"+count);
   fengClearStorage("thesis"+count+"_url");
   fengClearStorage("thesis"+count+"base");
   
   	var newcount = count -1;
   	fengSetOnclick("thesisCount",newcount);
   	var num = fengGetStorage("urlnum");
   	for(var j = 0;j<num.length;j++){
   		if (num[j] > index) {
   			num[j] = num[j]-1;
   		} else if( num[j] == index) {
   		    num.splice(j,1);
   		    j--;
   		}
   	}
   	
   	fengSetStorage("urlnum",num);
   	//var deletes ="."+ $(this).attr("name");
   	//$(deletes).remove();
   	$(this).parent().remove();

 }
   
 });
 
 
 //分享自定义库
 
 
//创建自定义库后，展示设置的界面 
if (fengGetOnclick("expand")&&fengGetOnclick("expand")=="expand") {
            $(".sel_tabs .select_set").trigger('click');
            showSettingBox();
            updateSettings();
                
	fengSetOnclick("expand","non");
} else{
	
}
//设置自定义和上传键的国际化
$('#self_defs').attr("value",chrome.i18n.getMessage("Customize_Library"));
$('#uploadbutton').attr("value",chrome.i18n.getMessage("upload"));
//安装后，规定的日期显示自定义壁纸界面
if (!fengGetOnclick("time_pip")){
	var pip_start = new Date().getTime();
	fengSetOnclick("time_pip",pip_start);
}
if (!fengGetOnclick("self_pip")) {
	var pip_end = new Date().getTime();
	if (pip_end - fengGetOnclick("time_pip")> 24*60*60*1000) {
		var width = $(window).height() -200;
        var widthPx = width +"px"
        $('#back').css("display","block");
        $('#back').css("margin-top",widthPx);
	   fengSetOnclick("self_pip",1);
	}
}
   function keyDown(){  	
   	if ($('#search_bar').val().length > 0) {  		
   		$("#search_box").css("opacity","1.0");
	    $("#search_box").css("background","white");
   	}else{
   		
   	}
   }
   document.onkeyup = keyDown;
  //分享键的合成
  $('.customized').hover(function() {
	$(".share_title").text(chrome.i18n.getMessage("better_customized"));
        $('.sina').css("display","none");
         $('.pint').css("display","none"); 
         $('.qq').css("display","none");
         $('.fb').css("display","none");
         $('.twitter').css("display","none");
         $('.google').css("display","none");
         $('.share').css("display","block");
}, function() {
	$(".share_title").text(chrome.i18n.getMessage("better_start"));
//  $(".share_title").text("Attack on Titan New Tab");
});
  $('.customized').click(function(){

  	if ($('#back').attr("style")== "block") {
  		$('#back').css("display","none");
  	} else{
  		var width = $(window).height() -200;
        var widthPx = width +"px"
        $('#back').css("display","block");
        $('#back').css("margin-top",widthPx);
        chrome.runtime.sendMessage({what: "_trackEvent", category: "setting", action:"customizeLibrary", label:"1"});
  	}
  
  })
  
$('.share').hover(function() {
//	$(".share_title").text(chrome.i18n.getMessage("better_shares"));
    $('.sina').css("display","block");
    $('.pint').css("display","block"); 
    $('.qq').css("display","block");
    $('.fb').css("display","block");
    $('.twitter').css("display","block");
    $('.google').css("display","block");
    $('.share').css("display","none");
}, function() {
//	$(".share_title").text(chrome.i18n.getMessage("better_start"));
//  $(".share_title").text("Attack on Titan New Tab");
});
  $('.share').click(function(){
   $('#back_hover').css("display","block");
  })
  $('#back_hover').hover(function() {
	$('#back_hover').css("display","block");
}, function() {
	$(".share_title").text(chrome.i18n.getMessage("better_start"));
	$('#back_hover').css("display","none");
});

$('.share_list').hover(function() {
	//  	$(".share_title").text(chrome.i18n.getMessage("better_fb"));
}, function() {
	$(".share_title").text(chrome.i18n.getMessage("better_start"));
	$('.sina').css("display", "none");
	$('.pint').css("display", "none");
	$('.qq').css("display", "none");
	$('.fb').css("display", "none");
	$('.twitter').css("display", "none");
	$('.google').css("display", "none");
	$('.share').css("display", "block");
});
//收藏喜欢的壁纸
    $('#like').click(function() {
	if($("#like").hasClass('like2')) {
	 if(!fengGetOnclick("account")) {
		var height = document.documentElement.clientHeight - 100;
        $("#likepop").css("margin-top",height+"px");
        $("#likepop").css("display","block");
		}else{
		$("#like").removeClass('like2');
		$("#like").addClass("like1");
		var likeLibrary = fengGetStorage("like_library");
		var url = fengGetOnclick("current_url").replace(" ","");
		var likes = {};
		var likeUrl = likeLibrary["like"];
		for(var i = 0; i < likeUrl.length; i++) {
			if(likeUrl[i] == url) {
               likeUrl.splice(i,1);
				break;
			}
		}
		likes["like"] = likeUrl;
		$("#likecount").text(likeUrl.length);
		fengSetStorage("like_library", likes);
	   }
	} else {
		if(!fengGetOnclick("account")) {
			var height = document.documentElement.clientHeight - 100;
            $("#likepop").css("margin-top",height+"px");
            $("#likepop").css("display","block");
		} else {
			var likeLibrary = fengGetStorage("like_library");
			var url = fengGetOnclick("current_url").replace(" ","");
			var likes = {};
			if(!likeLibrary) {
				var likeUrl = [];
				likeUrl[0] = url;
				fengSetStorage("like_library", likes);
			} else {
				var sign = true;
				var likeUrl = likeLibrary["like"];
				for(var i = 0; i < likeUrl.length; i++) {
					if(likeUrl[i] == url) {
						sign = false;
						break;
					}
				}
				if(sign) {
					likeUrl[likeUrl.length] = url;										
				}
			}
			likes["like"] = likeUrl;
			fengSetStorage("like_library", likes);

			$("#like").removeClass('like1');
			$("#like").addClass("like2");
			$("#likecount").text(likeUrl.length);
			var height = document.documentElement.clientHeight/2 + "px";
            var width = document.documentElement.clientWidth/4 + "px";
            $("#sharepop").css("margin-left",width);
            $("#sharepop").css("margin-top",height);
            $("#sharepop").css("display","block");
		}

	}

});
//收藏后，关闭分享图层
$("#closeShare").click(function(){
	$("#sharepop").css("display","none");
});
$("#closeLike").click(function(){
	$("#likepop").css("display","none");
});
//收藏后分享到google账号
var shareTitle = 'Discovered%20from%20'+chrome.i18n.getMessage('extName');
var extUrl = 'https://chrome.google.com/webstore/detail/'+chrome.runtime.id;
    

$('[src="images/googleshare.png"]').click(function(){
	$("#sharepop").css("display","none");
    var width = Math.floor($(window).width()/2);
    var height = Math.floor($(window).height()/2);
    var left = Math.floor($(window).width()/4);
    var top = Math.floor($(window).height()/4);
	var currentUrl = fengGetOnclick('current_url');
    var url ='https://plus.google.com/share?url='+extUrl+'?utm_source=plus';       
    chrome.windows.create({url:url, type:'panel', state:'normal', width:width+150, height:height, left:left-75, top:top});
});
//收藏后分享到facebook账号
$('[src="images/fbshare.png"]').click(function(){
	$("#sharepop").css("display","none");
    var title = shareTitle;
    var width = Math.floor($(window).width()/2);
    var height = Math.floor($(window).height()/2);
    var left = Math.floor($(window).width()/4);
    var top = Math.floor($(window).height()/4);
	var currentUrl = fengGetOnclick('current_url');
    var url = 'http://www.facebook.com/sharer.php?u='+extUrl+'&t='+title;
    chrome.windows.create({url:url, type:'panel', state:'normal', width:width, height:height, left:left, top:top});
});
//收藏时判断该图片是否已经收藏
var likeLibrary = fengGetStorage("like_library");
if(!likeLibrary) {
	$("#likecount").text(0);
} else {
	var likeUrl = likeLibrary["like"];
	$("#likecount").text(likeUrl.length);
	var url = fengGetOnclick("current_url");
	var sign = false;
	for(var i = 0; i < likeUrl.length; i++) {
		if(likeUrl[i] == url) {
			sign = true;
			break;
		}
	}
	if(sign) {
		if($("#like").hasClass('like1')) {
			$("#like").removeClass('like1');
			$("#like").addClass("like2");
		}
	} else {
		if(!$("#like").hasClass('like1')) {
			$("#like").removeClass('like2');
			$("#like").addClass("like1");
		}
	}}
//是否选中收藏图片库
$('[name="checkboxlike"]').click(function(){
//	if ($("#likecount").text()<=0) {
//		$('[name="checkboxlike"]')[0].checked = false;
//		return;
//	}
	if($('[name="checkboxlike"]')[0].checked){
		if (fengGetStorage("local")["pic"].length==0) {
			chrome.runtime.sendMessage({what:"self_clear"});
		}
		
		fengSetOnclick("like_choice","1");
	}else{
		fengSetOnclick("like_choice","0");
	}
})
if(fengGetOnclick("like_choice")=="1"){
	$('[name="checkboxlike"]')[0].checked = true;
}
//收藏前登陆到fb账号
$('[src="image/main/FB.png"]').click(function(){
	$("#likepop").css("display","none");
	window.open("https://www.facebook.com/login.php?login_attempt=1&lwv=300");
})
//收藏前登陆到google账号
$('[src="image/main/google3.png"]').click(function(){
	$("#likepop").css("display","none");
	window.open("https://accounts.google.com/ServiceLogin/signinchooser?elo=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin");
})

$('#like').hover(function() {
	if($("#like").hasClass('like2')) {

		$(".share_title").text(chrome.i18n.getMessage("better_remove"));
	} else {
        
		$(".share_title").text(chrome.i18n.getMessage("better_save"));
	}
	//  $(".share_title").text("Click it , Change  Background");
}, function() {
	$(".share_title").text(chrome.i18n.getMessage("better_start"));
	//  $(".share_title").text("Attack on Titan New Tab");
});

if(!fengGetOnclick("like_choice")){
	$('[name="checkboxlike"]')[0].checked=true;
	fengSetOnclick("like_choice","1");
}
//如果已经登陆账号，在my favorite右边的登录按钮就不显示了
 if(fengGetOnclick("account")) {
 	$("#googlelogin").css("display","none");
 	$("#fblogin").css("display","none");
 	$("#orlogin").css("display","none");
 }
 //点击，在my favorite右边的登录按钮
$("#googlelogin").click(function(){
	window.open("https://accounts.google.com/ServiceLogin/signinchooser?elo=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin")
});
 $("#fblogin").click(function(){
	window.open("https://www.facebook.com/login.php?login_attempt=1&lwv=300");
});
