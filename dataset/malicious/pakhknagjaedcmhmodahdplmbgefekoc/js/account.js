//用来确定facebook是否登录
if ($('[class = "linkWrap noCount"]').text()) {
	var account = $('[id="userNav"] [class = "linkWrap noCount"]').text();
   chrome.runtime.sendMessage({what:"account",value:account,key:"facebookAccount"},function(response) {
   	//window.close();
   });
}
//用来确定google是否登录
if ($('[class="gb_xb"]').text()) {
	var account = $('[class="gb_xb"]').text();
   chrome.runtime.sendMessage({what:"account",value:account,key:"googleAccount"},function(response) {
   	//window.close();
   });
}
 

