//对谷歌custom搜素的页面进行的界面排版

//var html ='<div id="search_box">'+
//  			'<input style="border:0px;" type="text" value="" tabindex="0" title="Search" class="search_inputs" id = "search_bar"/>'+
//  		    '<button class="sbico-c .search_btn" value="Search" aria-label="Google Search" id="search_submit" name="btnG" type="button"><span class="sbico _wtf _Qtf"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></span></button>'+
//		'</div>';
 

var unbind_event_listeners = function(node) {
    var parent = node.parentNode;
    if (parent) {
        parent.replaceChild(node.cloneNode(true), node);
    } else {
        var ex = new Error("Cannot remove event listeners from detached or document nodes");
        ex.code = DOMException[ex.name = "HIERARCHY_REQUEST_ERR"];
        throw ex;
    }
};


var headerChange = function(){
    $("#cse-body").addClass('div');
    $("#cse-body").addClass('a');
     var form = $('#cse-search-form form'); 
          $('a, .gs-result, .gs-title').css("text-decoration","none");
          $('#cse-header').css('padding-top', '12px');
          $('#cse-header').css('width', '850px');
          $('td.gsib_b').hide();
          $('td.gsc-clear-button').hide();
          $('#gsc-iw-id1').addClass('b_search_box');
          
          $('#gsc-iw-id1').css({ "height": "44px", "border":"none", "-moz-box-shadow": "0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)",
  "-webkit-box-shadow": "0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)", "box-shadow": "0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)"});
          $('td.gsib_a').css('padding-top', '0');

          $('input[name="search"]').addClass('search_inputs');
          $('input[name="search"]').css({'height':'34px', "margin": "5px 0 0 0"});
          $('button svg').css({'width':'20px', 'height':'20px'});
          $('button.gsc-search-button.gsc-search-button-v2').css({"padding":"12px 27px"});
//          $('input[type="image"]').attr('src', 'data:image/svg+xml;base64,PHN2ZyBmb2N1c2FibGU9ImZhbHNlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0MxNS40MSAxMi41OSAxNiAxMS4xMSAxNiA5LjUgMTYgNS45MSAxMy4wOSAzIDkuNSAzUzMgNS45MSAzIDkuNSA1LjkxIDE2IDkuNSAxNmMxLjYxIDAgMy4wOS0uNTkgNC4yMy0xLjU3bC4yNy4yOHYuNzlsNSA0Ljk5TDIwLjQ5IDE5bC00Ljk5LTV6bS02IDBDNy4wMSAxNCA1IDExLjk5IDUgOS41UzcuMDEgNSA5LjUgNSAxNCA3LjAxIDE0IDkuNSAxMS45OSAxNCA5LjUgMTR6IiBmaWxsPSIjNDI4NWY0IiAvPjwvc3ZnPg==');
          $('.gsc-cursor-box').css({'font-size':'20px', 'width': '624px'});
          $('.gsc-cursor-current-page').css({'font-size':'24px'});
 };
   
var starttime = new Date().getTime();
//var styleChange = setInterval("change()",300);
//setTimeout("change()",1000);
function change(){ 
    headerChange();
    
	$('.gsc-adBlock').css("padding-left","4px");
//  $('.gcsc-branding').remove();
 	$('.gs-title').css("font-size","18px");

 	$('.gs-title').css("font-family","'Roboto',arial,sans-serif");
// 	$('.gs-title').css("text-decoration","none");
// 	$('.gs-title b').css("text-decoration","none");
 	$('.gs-title b').css("font-family","'Roboto',arial,sans-serif"); 	
 	$('b').css("font-weight","500");
 	$('.gs-title b').css("font-size","18px");	
// 	$('.gsc-wrapper').css("padding-top","20px");
// 	$('.gsc-result .gs-title').css("text-decoration","none");
 	$('.gsc-url-top').css("font-size","14px");
// 	$('.gsc-url-top').css("color","#006621");
 	$('.gsc-result .gs-title').css("height","1.5em");
// 	$('.gs-snippet').css("color","#676767");
 	$('.gs-snippet b').css("font-weight","700");
   	$('.gs-webResult').css("width","48em");
   	$('.gs-title b').css("text-decoration","none");
// 	gcsc-branding-img-noclear
//  $('.gsc-control-cse').css("font-size","18px");
    //$('.gsc-cursor').css("font-size","18px");
    //$('gsc-cursor-page gsc-cursor-current-page').css("text-decoration","none");
    //$('.gsc-results .gsc-cursor-box .gsc-cursor-page').css("text-decoration","underline");
// 

}
    
    var count = 0;
    
    var intervalId  = setInterval(function(){
        if (count < 100 && $('#cse-header')[0] && $('input[name="search"]')[0]
            && $('.gsc-cursor-box')[0] && $('.gs-webResult')[0]) {
            change();
            count ++;
        }
        
    },50);
    
   setTimeout(function(intervalId){ clearInterval(intervalId); },10000, intervalId);
   
    setInterval(function() {
        $('.gsc-cursor-box').css({'font-size':'20px', 'width': '624px'});
        $('.gsc-cursor-current-page').css({'font-size':'24px'});
        $('.gs-title b').css("text-decoration","none");
        $('.gs-title').hover(function() {
              $(this).css("text-decoration","underline");
        }, function() {
              $(this).css("text-decoration","none");
        });        
    },1200);       
    
    
//$('.gsc-thumbnail-inside').click(function(){

//})
