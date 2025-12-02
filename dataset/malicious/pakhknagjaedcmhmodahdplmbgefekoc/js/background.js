var Count = 0;
var ERRORCOUNTs = 0;
var IMG_PENDING_REQUESTS_COUT = 0;
if(fengGetOnclick("mornUpdate") == null) {
	fengSetOnclick("mornUpdate", "1");
	fengSetOnclick("mornDay", new Date().getDate());
} else {
	var preTime = fengGetOnclick("mornDay");
	var curTime = new Date().getDate();
	if(preTime < curTime) {
		fengSetOnclick("mornUpdate", "1");
	}
}
//Base64图片转换函数
function convertImgToBase64URL(url, callback, outputFormat) {
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function() {
		var canvas = document.createElement('CANVAS'),
			ctx = canvas.getContext('2d'),
			dataURL;
		canvas.height = img.height;
		canvas.width = img.width;
		ctx.drawImage(img, 0, 0);
		dataURL = canvas.toDataURL(outputFormat);
		callback(dataURL);
		canvas = null;
		ERRORCOUNTs = 0;
		if(IMG_PENDING_REQUESTS_COUT > 0) {
		  IMG_PENDING_REQUESTS_COUT --;
		}
	};
	img.onerror = function() {
		if(ERRORCOUNTs < 3) {
			chrome.runtime.sendMessage({
				what: "next"
			}, function() {});
		}
		ERRORCOUNTs++;
		if(IMG_PENDING_REQUESTS_COUT > 0) {
          IMG_PENDING_REQUESTS_COUT --;
        }
	};
	if (/googleapis\.com|500px\.com|500px\.org|staticflickr\.com|ggpht\.com|yahoo\.com|bing\.com|ytimg\.com|wallpapercave\.com|alphacoders\.com|wallpaperaccess\.com|fanpop\.com|wp\.com|newevolutiondesigns\.com|wikia\.nocookie\.net|imgur\.com|files\.wordpress\.com|bp\.blogspot\.com|wpblink\.com|pinimg\.com|redd\.it|52dazhew\.com|wallpapersafari\.com|wallhere\.com|stmed\.net|getwallpapers\.com|hdqwalls\.com|pixelstalk\.net|akamaihd\.net|ubackground\.com|hdwallsource\.com|alkemadephotography\.com|k-pics\.com/i.test(url)) {
	   img.src = url;
	} else {
	   img.src = 'http://image.coolban.com/newtab.php?url='+url;    
	}
	IMG_PENDING_REQUESTS_COUT ++;
	
	
	setTimeout(
        function() {
            if ( !img.complete || !img.naturalWidth )
            {
                img.src = "";
                img.onerror = function() {};
                img.onload = function() {};
                if(IMG_PENDING_REQUESTS_COUT > 0) {
                  IMG_PENDING_REQUESTS_COUT --;
                }
            }
        },  15000);
}

var saveUpdateImage = function(path) {
	try {
		convertImgToBase64URL(path, function(base64Img) {
			try {
				UpdateImage.push({
					url: path,
					img: base64Img
				});
			} catch(e) {
				console.log(e);
				console.log('base64 data, length=' + base64Img.length);
			}
		}, 'image/jpeg');
	} catch(e) {
		if(e.message.indexOf('404') > -1) {
			chrome.runtime.sendMessage({
				what: "next"
			}, function() {});
		}
	}
};

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(request.what == "updateimg") {
			var path = request.imageurl;
			//saveUpdateImage(path);
			checkUpdateImage();
		}else if(request.what == "checkUpdateImage") {
			checkUpdateImage();
		} else if(request.what == "_trackEvent") {
			trackEvent(request.category, request.action, request.label);
		} else if(request.what == "account") {//收藏图片时，登录后的操作
			var account = request.value;
			if (!fengGetOnclick("account")) {
			    alert("Login in successfully");
				fengSetOnclick("account",request.value);
				   
			}
			if (!fengGetOnclick("account_type")) {
				fengSetOnclick("account_type",request.key);
			}
		    
			 sendResponse({
                value: "close"
            });
            
		}else if(request.what == "self_clear") {//选择展示收藏的图片
			if(fengGetStorage('updateimg_keys')) {
				var lenImg = fengGetStorage('updateimg_keys');
			} else {
				var lenImg = [0];
			}
			for(var j = 0; j < lenImg.length; j++) {
				fengClearStorage(lenImg[j]);
			}
			fengClearStorage("updateimg_keys");
			if (fengSetOnclick("current_img", fengGetStorage("like_library"))) {
    			fengSetOnclick("current_img", fengGetStorage("like_library")["like"][0]);
    			fengSetOnclick("current_url", fengGetStorage("like_library")["like"][0]);
    			chrome.runtime.sendMessage({what:"change_like"});
			}
			UpdateImage.push();
		} else if(request.what == "storeUrl") {
			chrome.runtime.sendMessage({
				what: "check_clear"
			});
			fengSetOnclick('current_url', request.value[8] || '');
			fengSetOnclick('current_img', request.value[8] || '');
			var local = {};
			local["pic"] = [];
			local["res"] = "library";
			fengSetStorage("local", local);
			if(!fengGetOnclick("thesisCount")) {
				var count = 1;
			} else {
				var count = parseInt(fengGetOnclick("thesisCount")) + 1;
			}
			var url = {};
			url["theis"] = request.value["thesis"];
			url["url"] = request.value["url"];

			var num = [];
			chrome.runtime.sendMessage({
				what: "newThesis_select"
			});
			num[0] = count;

			fengSetStorage("urlnum", num);
			fengSetOnclick("thesisCount", count);
			fengSetOnclick("expand", "expand");
			fengSetStorage("thesis" + count, url);
			fengSetStorage("thesis" + count + "base", request.key);
			fengSetOnclick("thesis" + count + "_url", "http://newtabwp.ppvpn.net");
			if(fengGetStorage('updateimg_keys')) {
				var lenImg = fengGetStorage('updateimg_keys');
			} else {
				var lenImg = [0];
			}
			for(var j = 0; j < lenImg.length; j++) {
				fengClearStorage(lenImg[j]);
			}
			fengClearStorage("updateimg_keys")
			fengSetOnclick("current_img", request.value["url"][5]);
			fengSetOnclick("current_url", request.value["url"][5]);

			chrome.tabs.create({
				url: chrome.extension.getURL("index.html")
			});
			chrome.tabs.remove(sender.tab.id);
			chrome.runtime.sendMessage({
				what: "closes"
			});
			sendResponse({
				value: "success"
			});
			UpdateImage.push();
			setTimeout("create()", 300);

		} else if(request.what == "storeUrlWordPress") {//下载wordpress的主题壁纸
			var len = fengGetOnclick('thesisCount');
			for(var i = 1; i <= len; i++) {
				if(fengGetStorage("thesis" + i)) {
					if(fengGetStorage("thesis" + i)["theis"].toLowerCase() == request.value['thesis'].toLowerCase()) {
						alert(chrome.i18n.getMessage("self_add"));
						return;
					}
				}
			}
			chrome.runtime.sendMessage({
				what: "check_clear"
			});
			fengSetOnclick('current_url', request.value[8] || '');
			fengSetOnclick('current_img', request.value[8] || '');
			var local = {};
			local["pic"] = [];
			local["res"] = "library";
			fengSetStorage("local", local);
			if(!fengGetOnclick("thesisCount")) {
				var count = 1;
			} else {
				var count = parseInt(fengGetOnclick("thesisCount")) + 1;
			}
			var url = {};
			url["theis"] = request.value["thesis"];
			url["url"] = request.value["url"];

			var num = [];
			chrome.runtime.sendMessage({
				what: "newThesis_select"
			});
			num[0] = count;

			fengSetStorage("urlnum", num);
			fengSetOnclick("thesisCount", count);
			fengSetOnclick("thesis" + count + "_url", request.key);
			fengSetOnclick("expand", "expand");
			fengSetStorage("thesis" + count, url);
			if(fengGetStorage('updateimg_keys')) {
				var lenImg = fengGetStorage('updateimg_keys');
			} else {
				var lenImg = [0];
			}
			for(var j = 0; j < lenImg.length; j++) {
				fengClearStorage(lenImg[j]);
			}
			fengClearStorage("updateimg_keys");
			fengSetOnclick("current_img", request.value["url"][5]);
			fengSetOnclick("current_url", request.value["url"][5]);
			chrome.tabs.create({
				url: chrome.extension.getURL("index.html")
			});
			chrome.tabs.remove(sender.tab.id);
			chrome.runtime.sendMessage({
				what: "closes"
			});
			sendResponse({
				value: "success"
			});
			UpdateImage.push();
		}
	});

var tabToUrl = {};
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    
});	
	
chrome.runtime.onInstalled.addListener(function(details) {
	if(details.reason == 'install') {
		var current_time = new Date().getTime();
		var current_update_time = current_time;
		fengSetOnclick("current_update_time", current_update_time);
		fengSetOnclick("fivestar_time", current_update_time);
		fengSetOnclick("mornUpdate", "1");
		fengSetOnclick("current_url", 'https://drscdn.500px.org/photo/68560859/m%3D2048/3d001577c638df1ba06c30f45eb60465');
		fengSetOnclick("current_img", "backgrounds/1.jpg");
		fengSetOnclick("frequent", 3);
		fengSetOnclick("weather_show", 0);
		fengSetOnclick("history_show", "1");
		
		var local = {
            "pic": [1], //set selected wallpaper libs
            "res": "library"
        };
		if(!fengGetStorage("local")) {
			fengSetStorage("local", local);
		}
		fengSetStorage("libraryhistory", local["pic"]);
		if(navigator.language.indexOf("zh") > -1) {
			fengSetStorage("search", 'baidu');
		} else {
			fengSetStorage("search", 'google');
		}

		//      fengSetOnclick("fivestar", false);
		fengSetOnclick("pin", true);
		//      var downloadImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACAAAAAVTCAYAAABZasipAAAgAElEQVR4Xuy9jXIkOXIkTBbZo9e4W92jfJJeWdI92ambxc8CCUd6enogkFXkzOzu0KytycwEEIgfjwAQAF7/9u//+fnSf15fX/Fr+z/+/vj4GL8fXvY/7qP0/vbz8/PltT9/f39/ib/jn7aDZ+3719eX2+3WPsH3So9rH99wXdxe1Bn/8N39fm/1x9/t2etGG9MX7cR38fP29ta+Y5r49/vHVhf4BfrxP5eNZ+gj+vJ5ZPmhnigLOrhe/v3Hj/f2zcfHRi/3Nf7+9evX3tfO261t8GDjefytbRz4/brVf/r5RPlNbqNf/Xfur/I4vg39UvmAl/Gc+++aj29cvaiD9Zd1JSujbTi99YzoXCQezL678g40sC7FM5W18h7fzPgDXVZbBP/QZqYbB1s66NdGjcpHdeTzthnATB5su9xHtG3VsssBuIJ+hD4N25+0C3r4+3gG/AhciH9hX8p3xi3+vdHbAbPZdrf9j8+NpoY1n5tNxHdN//s395cNo24vG06+xXcdo/AN8/FGuBz1fnbce3/dbOrz4/7y9uP95fX18+Uj6iYcinZ+9e9bWYOPg4ebe9h/Ok4EnZsCbNgJfQIPA02ijveOO6hgR5NjtUMeC4bDugT9c7qyPXsra8wwYBVDtIFjuQRXJ1SpTjn7YZtx32fPgNehI8Be9cMZVjiSYT9M4wGHxf8hbhh1dXx46XbzBl/7uWEG9DD0l+kNrs7kE3qGb6wP7vbD9t9slGIB6HDYpv5A/+F/Bt0SYymeOV1hnIct4tn/+/lz2JbiGvNHMRTfgmeKy6AD9u/kx75B9YltHmVVHhpXqX/m+kGP6uL989fwgw5nZvHH5h+P/gd8wf+M794kzwGcw8uMfheTODly24pv2TulVzGhYeOvjxF7H2j52OJkxU/oHfrY/Fj41I/Nh730WPvX/aM9R/";
		UpdateImage.push({
			img: "backgrounds/2.jpg",
			url: 'http://www.intothevineyard.com/wp-content/uploads/2014/09/Beautiful-Tuscany.jpg'
		});
		UpdateImage.push({
			img: "backgrounds/3.jpg",
			url: 'https://drscdn.500px.org/photo/81429105/m%3D2048/1134eea0c66d4aa2951b3cdbf085a589'
		});
		UpdateImage.push({
			img: "backgrounds/4.jpg",
			url: 'https://drscdn.500px.org/photo/91507503/m%3D2048/62efaece8eb563b5ef21dc81579c8ace'
		});
		UpdateImage.push({
			img: "backgrounds/5.jpg",
			url: 'https://drscdn.500px.org/photo/53632766/m%3D2048/18cd34c6eafb554569a0f0a3e74b9ca1'
		});
		//      UpdateImage.push({img: "backgrounds/6.jpg", url: 'https://drscdn.500px.org/photo/79961183/m%3D2048/018f114cf2df1c20e06f566e801e14e6'});
		//var guideUrl = 'http://www.ppvpn.net/public/stall/QLife_New_Tab_User_Guide.htm';
		chrome.tabs.create({
            //url: guideUrl
        }, function(tab) {
            setTimeout(function() {
                chrome.tabs.create({url: "http://www.ppvpn.net/public/stall/QLife_New_Tab_User_Guide.htm"});
            },3000);    
        });
        
	}
});

function checkUpdateImage() {
	var addCount = 3 - UpdateImage.size();
	if (addCount==0 || IMG_PENDING_REQUESTS_COUT >= 8) {
		return;
	}
	for(var i = 0; i < addCount; i++) {
		setTimeout(function() {
			var imgs = ResourceSetting.getImgsArrayFromResource();
			if(imgs.length == 0) {
				return;
			}
			var index = Math.floor(Math.random() * imgs.length);
			var imageurl = imgs[index];

			saveUpdateImage(imageurl);
		}, i * 10 * 1000);
	}
	
};
setInterval("checkUpdateImage()",30000);// check for every 30 seconds
checkUpdateImage();

var _gaq = _gaq || [];
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
})();

function trackEvent(category, action, label) {
	_gaq.push(['_trackEvent', category, action, label]);
	//  alert('_trackEvent, target='+target+", event="+event);
}
chrome.runtime.setUninstallURL("http://www.ppvpn.net/public/stall/uninstallQLifeNewTab.html", function() {});

var Base64 = {
	_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode: function(e) {
		var t = "";
		var n, r, i, s, o, u, a;
		var f = 0;
		e = Base64._utf8_encode(e);
		while(f < e.length) {
			n = e.charCodeAt(f++);
			r = e.charCodeAt(f++);
			i = e.charCodeAt(f++);
			s = n >> 2;
			o = (n & 3) << 4 | r >> 4;
			u = (r & 15) << 2 | i >> 6;
			a = i & 63;
			if(isNaN(r)) {
				u = a = 64
			} else if(isNaN(i)) {
				a = 64
			}
			t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
		}
		return t
	},
	decode: function(e) {
		var t = "";
		var n, r, i;
		var s, o, u, a;
		var f = 0;
		e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while(f < e.length) {
			s = this._keyStr.indexOf(e.charAt(f++));
			o = this._keyStr.indexOf(e.charAt(f++));
			u = this._keyStr.indexOf(e.charAt(f++));
			a = this._keyStr.indexOf(e.charAt(f++));
			n = s << 2 | o >> 4;
			r = (o & 15) << 4 | u >> 2;
			i = (u & 3) << 6 | a;
			t = t + String.fromCharCode(n);
			if(u != 64) {
				t = t + String.fromCharCode(r)
			}
			if(a != 64) {
				t = t + String.fromCharCode(i)
			}
		}
		t = Base64._utf8_decode(t);
		return t
	},
	_utf8_encode: function(e) {
		e = e.replace(/\r\n/g, "\n");
		var t = "";
		for(var n = 0; n < e.length; n++) {
			var r = e.charCodeAt(n);
			if(r < 128) {
				t += String.fromCharCode(r)
			} else if(r > 127 && r < 2048) {
				t += String.fromCharCode(r >> 6 | 192);
				t += String.fromCharCode(r & 63 | 128)
			} else {
				t += String.fromCharCode(r >> 12 | 224);
				t += String.fromCharCode(r >> 6 & 63 | 128);
				t += String.fromCharCode(r & 63 | 128)
			}
		}
		return t
	},
	_utf8_decode: function(e) {
		var t = "";
		var n = 0;
		var r = c1 = c2 = 0;
		while(n < e.length) {
			r = e.charCodeAt(n);
			if(r < 128) {
				t += String.fromCharCode(r);
				n++
			} else if(r > 191 && r < 224) {
				c2 = e.charCodeAt(n + 1);
				t += String.fromCharCode((r & 31) << 6 | c2 & 63);
				n += 2
			} else {
				c2 = e.charCodeAt(n + 1);
				c3 = e.charCodeAt(n + 2);
				t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
				n += 3
			}
		}
		return t
	}
};
//创建wordpress的图片文章
function create() {
	
}

         
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({url: "http://www.ppvpn.net/public/stall/QLife_New_Tab_User_Guide.htm"});
});