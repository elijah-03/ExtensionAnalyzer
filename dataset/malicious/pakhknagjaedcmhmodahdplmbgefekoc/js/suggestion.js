// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var $$ = jQuery;
var searchIcon = chrome.extension.getURL('images/search_icon.png');
var predictionIcon = chrome.extension.getURL('images/prediction_icon.png');

(function ($$) {
$$.fn.googleSuggest = function(opts){
    opts = $$.extend({
        service : 'web',
        secure : false,
        wse : 'g'
    }, opts);
    var services = {
        web : {
            client : 'firefox',
            ds : ''
        },
        recipes : {
            client : 'hp',
            ds : 'r'
        }
    }, service = services[opts.service], li = $$('<li>');

    var wses = {
        b : {
            sugUrl : 'http' + (opts.secure ? 's' : '') + '://suggestion.baidu.com/su',
            url : 'http://www.baidu.com/s?&wd=%s&ie=utf-8&tn=94749616_hao_pg'
        },
        g : {
            sugUrl : 'http' + (opts.secure ? 's' : '') + '://clients1.google.com/complete/search',
            url : 'http://www.google.com/search?q=%s'
        }
    }, wse = wses[opts.wse];

  
    opts.source = function(request, response) {
    
        if (opts.wse == 'b') {
            $$.ajax({
                url : wse.sugUrl,
                contentType : "text/html",
                dataType : "text",
                data : {
                    wd : request.term,
                    cb : ''
                },
                success : function(data) {
                    //console.log('baidu success ' + data);
                    var s = data.match(/s:\[.+\]/);
                    if (!s || s.length == 0)
                        return;
                    data = JSON.parse(s[0].substring(2));
                    var items = [];
                    for (var i = 0; data && i < 8 && i < data.length; i++) {
                        items.push({
                            q : request.term,
                            value : data[i],
                            type : 'display'
                        });
                    }
    
                    response($$.map(items, function(item) {
                        return item;
                    }));
                }
            });
    
        } else if (opts.wse == 'g') {
            $$.ajax({
                url : wse.sugUrl,
                contentType : "application/json",
                dataType : "json",
                data : {
                    q : request.term,
                    nolabels : 't',
                    client : service.client,
                    ds : service.ds,
                    output : 'json'
                },
                success : function(data) {
                    //console.log('success '+data[1]);
                    var items = [];
                    for (var i = 0; data[1] && i < 8 && i < data[1].length; i++) {
                        items.push({
                            q : request.term,
                            value : data[1][i],
                            type : 'display'
                        });
                    }
    
                    response($$.map(items, function(item) {
                        return item;
                    }));
                }
            });
        }
    
    };

  
  opts.select = function(e,ui){
      //console.log(ui.item+' '+ui.item.value+' '+ui.item.type);
      var item = ui.item;
      $('form .search_input').val(item.value);
      $('form').submit();
      //chrome.runtime.sendMessage({what: "_trackEvent", category: chrome.runtime.id, action:"select_search", label:location.host});
  };
  
  return this.each(function(){
    $$(this).autocomplete(opts).data("ui-autocomplete")._renderItem = function(ul, item ) {
        //console.log(ul.css('left'));
        if (item.type == 'display')
          return $$( "<li>" )
            .append('<a>'+item.value.replace(item.q, item.q+"<b>")  + "</b></a>" )
            .appendTo( ul );
        else if (item.type == 'search') 
          return $$( '<li>' )
            .append('<a>'+ item.value.replace(item.q, item.q+"<b>")  + "</b></a>" )
            .appendTo( ul );
    };
  });
};
}(jQuery));

function addSuggestion() {
    var added = false;
    var opts = { service: 'web', wse:'g', secure : false};
    if (navigator.language.indexOf('zh') !== -1) opts.wse = 'b';
    if (location.protocol == 'https:') { opts.secure = true; }
    //console.log('secure='+opts.secure);
    
    $$('input[type=text]').each(function(i) {
        var input = $$(this);
        //console.log(this+' html:'+this.innerHTML+' '+input+' autocomplete:'+input.attr('autocomplete') +' '+' autocomplete:'+this.autocomplete);
        if (input.attr('autocomplete') !== 'off') {
            input.googleSuggest(opts);
            added = true;
        }
    });
    
    if (added) {
        chrome.runtime.sendMessage({what: "_trackEvent", category: chrome.runtime.id, action:"addSuggestion", label:location.host});
    } 
}

setTimeout(addSuggestion,2000);
