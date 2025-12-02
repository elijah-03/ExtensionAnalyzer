var DEBUG = false;
var global_retry_geo_count = 0;
var Viewtime = 0;
var getConditionFromCode = function(a) {
    var b = {};
    return b[0] = "F", b[1] = "F", b[2] = "F", b[3] = "O", b[4] = "P", b[5] = "X", b[6] = "X", b[7] = "X", b[8] = "X", b[9] = "Q", b[10] = "X", b[11] = "R", b[12] = "R", b[13] = "U", b[14] = "U", b[15] = "U", b[16] = "W", b[17] = "X", b[18] = "X", b[19] = "J", b[20] = "M", b[21] = "J", b[22] = "M", b[23] = "F", b[24] = "F", b[25] = "G", b[26] = "Y", b[27] = "I", b[28] = "H", b[29] = "E", b[30] = "H", b[31] = "C", b[32] = "B", b[33] = "C", b[34] = "B", b[35] = "X", b[36] = "B", b[37] = "O", b[38] = "O", b[39] = "O", b[40] = "R", b[41] = "W", b[42] = "U", b[43] = "W", b[44] = "H", b[45] = "O", b[46] = "W", b[47] = "O", b[3200] = ")", b[a];
}; 
var initWeatherUI = function() {
    /*********initial weather list********/
    var source = $.trim($("#weather_template").html());
    var weatherTemplate = Handlebars.compile(source);
    var renderedHtml = weatherTemplate({
        forecast : fengGetStorage('w_forecast')
    });
    $('.weather_dl').html(renderedHtml); 
   $('#weather_today_candition').click(function(){
        if($('#weather_list').hasClass('is-visible')){
        	var alltime = new Date().getTime() - Viewtime;
             chrome.runtime.sendMessage({what: "_trackEvent", category: "Weather", action:"leave", label:alltime});
            $('#weather_list').toggleClass('is-visible', false); 
        }else{
            if ($('.weather_dl').children().length == 0) {
                return;
            }
            Viewtime = new Date().getTime();
             chrome.runtime.sendMessage({what: "_trackEvent", category: "Weather", action:"hover", label:"1"});
       	    $('#weather_list').toggleClass('is-visible',true);
        }
   });
   
   $('.weather_dl').click(function(e){
   	var alltime = new Date().getTime() - Viewtime;
    chrome.runtime.sendMessage({what: "_trackEvent", category: "Weather", action:"leave", label:alltime});
       $('#weather_list').toggleClass('is-visible',false);    
   });
   $('#weather_today_candition').hover(function(e){
      if ($('.weather_dl').children().length == 0) {
          return;
      } 
      Viewtime = new Date().getTime();
       chrome.runtime.sendMessage({what: "_trackEvent", category: "Weather", action:"hover", label:"1"});
      $('#weather_list').toggleClass('is-visible',true);
   }, function(e) {
       if (e.offsetY < 26) {
           return;
       }
       DEBUG && console.log('wb '+e.offsetX+','+e.offsetY);
       //$('#weather_list').css('display','none');
       $('#weather_list').toggleClass('is-visible',false);
   });
   
   $('#weather_list').hover(function(e){
      $('#weather_list').toggleClass('is-visible',true);
   }, function(e) {
       if (e.offsetX > 450 && e.offsetY > 120) {
           return;
       }
       DEBUG && console.log('wl '+e.offsetX+','+e.offsetY);
       //$('#weather_list').css('display','none');
       $('#weather_list').toggleClass('is-visible',false);
       var alltime = new Date().getTime() - Viewtime;
             chrome.runtime.sendMessage({what: "_trackEvent", category: "Weather", action:"leave", label:alltime});
   });
   
    /*********initial location********/
    $('#location').attr('title', 'Click to edit your location.');
    $('#location').click(function(e) {
        window.clearInterval(searchFocusInterval);
        $('#location').addClass('editing').focus();
        $('#location').attr('contenteditable', 'true');
        if (e.originalEvent) {
            $('#location').text('');
        }
        $('.editPng').show();
    });

    var submit = function() {
        $('#location').removeClass('editing');
        $('#location').attr('contenteditable', 'false');
        $('.editPng').hide();
        var locationText = $('#location').text().trim();
        if (locationText && fengGetStorage('placeText') !== locationText) {
            fengSetStorage('placeText', locationText);
            fengClearStorage('lat_lng');
            getWeather(locationText);
        }
        if (!locationText) {
            var placeText = fengGetStorage('placeText');
            if (!placeText) {
                var unkownLocation = chrome.i18n.getMessage('unkownLocation') || 'Unkown Location';
                placeText = unkownLocation;
                $('.editPng').show();
                $('#location').addClass('editing');
            } else {
                $('.editPng').hide();
                $('#location').removeClass('editing');
            }
            $('#location').text(placeText);
        }
    };
    
    $('#location').on('blur', submit);
    $('#location').keydown(function(e) {
        if(e.which == 13) {  
            submit();
        }
    }); 
    
    var placeText = fengGetStorage('placeText');
    if (!placeText) {
        $('#location').addClass('editing');
        $('.editPng').show();
    } else {
        $('.editPng').hide();
        $('#location').removeClass('editing');
    }
    var unkownLocation = chrome.i18n.getMessage('unkownLocation') || 'Unkown Location';
    $('#location').text(placeText || unkownLocation);
    
    var today = {};
    today.temperature = fengGetStorage('w_temperature');
    today.code = fengGetStorage('w_code');
    today.condition = fengGetStorage('w_condition');
    today.title = fengGetStorage("w_today_title");
    
    $('#weather_Big dt').attr('title', today.condition || '');
    $('#weather_Big dd').attr('title', today.title || '');
    $('#weather_Big dt').attr('data-icon', today.code || '1');
    $('#weather_Big dd').text((today.temperature || '24')+'°');    
    
    weekInternation(); 
};


var updateGEO = function(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    if (!latitude || !longitude) {
        return;
    }
    
    if (fengGetStorage('lat_lng') == (latitude+'_'+longitude)) {
        return;
    } 
    getLocation(latitude, longitude);
    
};

function renderWeatherUI() {
    
    var today = {};
    today.temperature = fengGetStorage("w_temperature");
    today.code = fengGetStorage("w_code");
    today.condition = fengGetStorage("w_condition");
    today.title = fengGetStorage("w_today_title");
    
    var forecast = fengGetStorage("w_forecast");
    
    if (!today && !forecast) {
        return;
    }
    
    $('#weather_Big dt').attr('title', today.condition || '');
    $('#weather_Big dd').attr('title', today.title || '');
    $('#weather_Big dt').attr('data-icon', today.code || '1');
    $('#weather_Big dd').text((today.temperature || '24')+'°');
    
    var source = $.trim($("#weather_template").html());
    var weatherTemplate = Handlebars.compile(source);
    var renderedHtml = weatherTemplate({forecast:forecast});
    $('.weather_dl').html(renderedHtml);
    weekInternation();
}

function getLocation(lat, lng) {
    var b="http://maps.googleapis.com/maps/api/geocode/json?latlng="+encodeURIComponent(lat+','+lng)+"&sensor=true";
    $.getJSON(b,function(a){
        if (a&&a.results&&a.results[0]) {
            $.each(a.results[0].address_components,function(a,b){
                    if ($.inArray("locality", b.types) > -1) {
                        if (b.long_name && b.long_name !== fengGetStorage('placeText')) {
                            $('#location').text(b.long_name);
                            $('.editPng').hide();
                            $('#location').removeClass('editing');
                            getWeather(b.long_name);
                            fengSetStorage('lat_lng',(lat+'_'+lng));
                            fengSetStorage('placeText', b.long_name);
                        }
                        return;
                    }
            }) ;
        } else {
             _gaq.push(["_trackEvent","AppError","getApiLocation:"+a]);
        }
    }).error(function(a){
        _gaq.push(["_trackEvent","AppError","getApiLocation:"+a]);
    });
}

function F2C(F) {
    return Math.round(5*(F-32)/9);
}

function C2F(C) {
    return Math.round(1.8 * C + 32);
}

function changeTemptureUnit(unit) {
    
    var todayTemperature = fengGetStorage('w_temperature');
    if (unit=='c' && todayTemperature) {
        todayTemperature = F2C(parseInt(todayTemperature));
        fengSetStorage("w_temperature", todayTemperature);
    } else if (unit=='f' && todayTemperature) {
        todayTemperature = C2F(parseInt(todayTemperature));
        fengSetStorage("w_temperature", todayTemperature);
    }  
    
    var d = fengGetStorage("w_forecast");
    if (d) {
        $.each(d,function(a,b){
            if (unit=='c' && d[a]) {
                d[a]['high'] = F2C(parseInt(d[a]['high']));
                d[a]['low'] = F2C(parseInt(d[a]['low']));
            } else if (unit=='f' && d[a]) {
                d[a]['high'] = C2F(parseInt(d[a]['high']));
                d[a]['low'] = C2F(parseInt(d[a]['low']));
            }
        });
        fengSetStorage("w_forecast",d);
    }
                                        
    renderWeatherUI();                
}

function getWeather(placeText){
    //var b="https://query.yahooapis.com/v1/public/yql?q="+encodeURIComponent("select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+placeText+')& and u="'+h.model.get("unit")+'"')+"&format=json&callback=?";
    var unit = fengGetStorage("w_unit");
    if (!unit) {
        unit = 'c';
    }
    //var b= 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + placeText+ '") and u="' + unit + '"') + '&format=json&callback=?';
    /*
    $.getJSON(b,function(a){
        if(1==a.query.count){
            var b=a.query.results.channel,c=b.item.condition;
            fengSetStorage("w_temperature",c.temp),
            fengSetStorage("w_code", getConditionFromCode(c.code)),
            fengSetStorage("w_condition",c.text);
            fengSetStorage("w_today_title",b.item.title);
            var d=a.query.results.channel.item.forecast;
            if (d.length > 0) {
                d[0].day = 'today';
            }
            d.splice(7, d.length-7);
            $.each(d,function(a,b){
                b.code = getConditionFromCode(b.code), d[a]=b;
            });
            
            
            fengSetStorage("w_forecast",d),
            fengSetStorage("w_updated", Date.now());
            
            renderWeatherUI();
        }
    }).error(function(a){});
    */
   var woeUrl = "https://www.yahoo.com/news/_td/api/resource/WeatherSearch;text="+placeText+"?bkt=news-d-147&device=desktop&feature=cacheContentCanvas%2Ccanvass%2Cfeaturebar%2CdeferModalCluster%2CspecRetry&intl=en-US&lang=en-US&partner=none&region=US&site=fp&tz=America%2FLos_Angeles&ver=2.0.2213002&returnMeta=true&t="+(new Date().valueOf());
   var woeid = '';
   $.getJSON(woeUrl,function(a){
        if(a.data){
            woeid = a.data[0]['woeid'];
        }
        
        if (woeid) {
            var b= "https://www.yahoo.com/news/_tdnews/api/resource/WeatherService;woeids=%5B"+woeid+"%5D?t="+(new Date().valueOf());
            $.getJSON(b,function(a){
                if(a['weathers']){
                    //var b=a.query.results.channel,c=b.item.condition;
                    var today = a['weathers'][0]['observation'];
                    var todayTemp = today['temperature']['now'];
                    if (unit =='c' ) {
                        todayTemp = F2C(todayTemp);
                    }
                    fengSetStorage("w_temperature", todayTemp);
                    fengSetStorage("w_code", getConditionFromCode(today['conditionCode']));
                    fengSetStorage("w_condition",today['conditionDescription']);
                    fengSetStorage("w_today_title",today['dayPartTexts'][0]['text']);
                    var d=[{},{},{},{},{},{},{},];
                    
                    var forecasts = a['weathers'][0]['forecasts']['daily'];
                    var weekdays = {'1': 'Mon', '2': 'Tue', '3': 'Wed', '4':'Thu', '5':'Fri', '6':'Sat', '0':'Sun'};
                    $.each(d,function(a,b){
                        // b.code = getConditionFromCode(b.code), d[a]=b;
                        b.code = getConditionFromCode(forecasts[a].conditionCode), d[a]=b;
                        d[a]['day'] = weekdays[forecasts[a]['observationTime']['weekday']];
                        d[a]['text'] = forecasts[a]['conditionDescription'];
                        var high = forecasts[a]['temperature']['high'];
                        var low = forecasts[a]['temperature']['low'];
                        if (unit =='c' ) {
                            high = F2C(high);
                            low = F2C(low);
                        }
                        d[a]['high'] = high;
                        d[a]['low'] = low;
                    });
                    
                    if (d.length > 0) {
                        d[0].day = 'Today';
                    }
                    d.splice(7, d.length-7);
                                        
                    fengSetStorage("w_forecast",d),
                    fengSetStorage("w_updated", Date.now());
                    
                    renderWeatherUI();
                }
            }).error(function(a){});                     
        }
    }).error(function(a){});
}

function initGEO() {
	if (fengGetStorage('placeText')) {
		return;
	}
    navigator.geolocation.getCurrentPosition(updateGEO, function(positionError) {
        console.error(positionError);
        if (!fengGetStorage('placeText')) {
            var unkownLocation = chrome.i18n.getMessage('unkownLocation') || 'Unkown Location'; 
            $('#location').text(unkownLocation);
            $('.editPng').show();
            $('#location').addClass('editing');
        } else {
            $('.editPng').hide();
            $('#location').removeClass('editing');
        }
        
        if (global_retry_geo_count <= 0) {
            global_retry_geo_count ++;
            initGEO();
        }
    }, {
        timeout : 12000
    });    
}

initWeatherUI();
var weatherUpdatedTime = fengGetStorage('w_updated');

if (!weatherUpdatedTime || Date.now() - parseFloat(weatherUpdatedTime) > 120 * 60 * 1000) {
    var placeText = fengGetStorage('placeText');
    if (placeText) {
        getWeather(placeText);
    }
    initGEO();
}
$(document).ready(function () { 
	$('.weather_dl dl dt').each(function(){
	if($(this).text()=="Mon"){
		$(this).text(chrome.i18n.getMessage("mon"));
	}else if($(this).text()=="Tue"){
		$(this).text(chrome.i18n.getMessage("tue"));		
	}else if($(this).text()=="Wed"){
		$(this).text(chrome.i18n.getMessage("wed"));
	}else if($(this).text()=="Thu"){
		$(this).text(chrome.i18n.getMessage("thu"));
	}else if($(this).text()=="Fri"){
		$(this).text(chrome.i18n.getMessage("fri"));
	}else if($(this).text()=="Sat"){
		$(this).text(chrome.i18n.getMessage("sat"));
	}else if($(this).text()=="Sun"){
		$(this).text(chrome.i18n.getMessage("sun"));
	}else if($(this).text()=="today"){
		$(this).text(chrome.i18n.getMessage("today"));
	}
		

});
});
function weekInternation(){
	$('.weather_dl dl dt').each(function(){
	if($(this).text()=="Mon"){
		$(this).text(chrome.i18n.getMessage("mon"));
	}else if($(this).text()=="Tue"){
		$(this).text(chrome.i18n.getMessage("tue"));		
	}else if($(this).text()=="Wed"){
		$(this).text(chrome.i18n.getMessage("wed"));
	}else if($(this).text()=="Thu"){
		$(this).text(chrome.i18n.getMessage("thu"));
	}else if($(this).text()=="Fri"){
		$(this).text(chrome.i18n.getMessage("fri"));
	}else if($(this).text()=="Sat"){
		$(this).text(chrome.i18n.getMessage("sat"));
	}else if($(this).text()=="Sun"){
		$(this).text(chrome.i18n.getMessage("sun"));
	}else if($(this).text()=="Today"){
		$(this).text(chrome.i18n.getMessage("today"));
	}
		

});
}
// test
//DEBUG && updateGEO({coords : {latitude:'39.6', longitude:'116.5'}}); 
