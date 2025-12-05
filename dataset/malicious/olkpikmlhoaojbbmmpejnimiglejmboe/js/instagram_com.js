(function(){var globalUtils=window.globalUtils;var MobileApp=(function(){return{buttonTemplate:null,dlBtnClassName:'ext_mobile_dl_btn',dlProfileBtnClassName:'profile_mobile_dl_btn',dlStoryBtnClassName:'story_mobile_dl_btn',run:function(){var self=this;self.modeGlobalWindow();$(function(){function loop1000(){self.imageAcceptAll();self.removeAppPromote();self.observeDom();self.addScreeModeBtn();self.addBackButton2Direct();}
self.removeAppPromote();self.stylingScroll();self.createBtnTpl();globalUtils.fixForeach();self.userActionsListenerInit();self.messagesListenerInit();loop1000();setInterval(loop1000,1000);});window['ext_blob_story_data']={};},removeAppPromote:function(){var $xEl=$('a:contains("×")'),$itunesLink=$('a[href^="https://itunes.apple.com/app/instagram"]'),$googlePlayLink=$('a[href^="https://play.google.com/store/apps/details?id=com.instagram.android"]');if($xEl.length){$xEl.parent().remove();}
if($itunesLink.length){$itunesLink.remove();}
if($googlePlayLink.length){$googlePlayLink.remove();}
if($('a[href$="/download/"]').length){$('a[href$="/download/"]').parent().parent().remove();}
var moreFunctionsInAppBtn=$('.rBNOH.YBx95 .IwRSH.eGOV_ button.sqdOP.yWX7d.y3zKF');if(moreFunctionsInAppBtn.length){moreFunctionsInAppBtn.parent().parent().remove();}},addBackButton2Direct:function(){if(window.location.href.indexOf('/inbox/')===-1)return;var header=document.querySelector('#react-root > section > div > header:not([data-ext_direct_header])');if(!header)return;header.dataset['ext_direct_header']='1';if(!header.querySelector('a[href="/"]')){var backBtn=$('<a class=" Iazdo" href="/"><span style="display: inline-block; transform: rotate(270deg);"><svg aria-label="Назад" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path></svg></span></a>');$(header).find(' > div > div:first-child').append(backBtn);}},stylingScroll:function(){if($('body').length){$('body').append('<style media="screen">'+'::-webkit-scrollbar {'+'width: 8px;height: 6px;background-color: #e1e1e1;}'+'::-webkit-scrollbar-thumb {background-color: #000000;}'+'::-webkit-scrollbar-track {background: transparent;}'+'</style>');}},imageAcceptAll:function(){$('input[type="file"][accept="image/jpeg"]').attr('accept','image/*')},modeGlobalWindow:function(){var spoofNavigator={userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',vendor:'Apple, Inc.',platform:'iPhone'};window.addEventListener('beforeload',function(e){Object.keys(spoofNavigator).forEach(function(k){Object.defineProperty(window.navigator,k,{get:function(){return spoofNavigator[k]}})});Object.defineProperty(window.screen.orientation,'type',{value:'portrait-primary'});},true);const a=document.createElement('script');a.type='text/javascript';a.innerText=Object.keys(spoofNavigator).map(function(k){return'Object.defineProperty(window.navigator, "'+k+'", { get: function(){ return "'+spoofNavigator[k]+'"; } });';}).join('')+"Object.defineProperty(window.screen.orientation, 'type', {value: 'portrait-primary'});";document.documentElement.insertBefore(a,document.documentElement.firstChild);},addMobileDlBtn:function(container,pageType){if(!container){return;}
if(container.querySelector('.'+MobileApp.dlBtnClassName)){return;}
container.appendChild(MobileApp.getDlBtnEl(pageType));},addScreeModeBtn:function(){if(document.querySelector('.ext_width_screen_toggler'))return;var parent;var self=this;if(!document.querySelector('nav header h1')){return;}
var headerBtn=document.querySelector('nav header button');parent=headerBtn&&headerBtn.parentNode;if(!parent)return;var btn=document.createElement('div');btn.className='ext_width_screen_toggler';btn.innerHTML='<span class=""></span>';var additionalClass=this.isWideScreen(btn)?'ext_from_wide_screen':'ext_to_wide_screen';btn.classList.add(additionalClass);parent.appendChild(btn);btn.addEventListener('click',function(){var btn=this;if(self.isWideScreen(this)){globalUtils.sendMessage('mobileNormalMode',function(){btn.classList.remove('ext_from_wide_screen');btn.classList.add('ext_to_wide_screen');btn.dataset.is_full_screen='0';});}
else{globalUtils.sendMessage('mobileWideScreenMode',function(){btn.classList.remove('ext_to_wide_screen');btn.classList.add('ext_from_wide_screen');btn.dataset.is_full_screen='1';});}});},isWideScreen:function(el){return el.dataset.is_full_screen==='1';},observeDom:function(){var self=this;var mainPageFeeds=document.querySelectorAll('div > div > article > header + div > div > div');if(mainPageFeeds.length===0){mainPageFeeds=document.querySelectorAll('div > div > article header + div + div > div > div');}
mainPageFeeds.forEach(function(node){if(node.parentNode.dataset.extSkip>0){return;}
if(node.querySelector('ul > li > div > div > div')){return;}
var img=node.querySelector('img');var video=node.querySelector('video');if(video||(img&&(img.width>300||img.clientWidth>300))){node.parentNode.dataset.extSkip='1';self.addMobileDlBtn(node.parentNode,1);}});var multipleItems=document.querySelectorAll('div > div > article > header + div > div > div ul > li > div > div > div');if(multipleItems.length===0){multipleItems=document.querySelectorAll('div > div > article header + div + div > div > div ul > li > div > div > div');}
multipleItems.forEach(function(node){if(node.parentNode.dataset.extSkip>0){return;}
var img=node.querySelector('img');var video=node.querySelector('video');if(video||(img&&(img.width>300||img.clientWidth>300))){node.parentNode.dataset.extSkip='1';self.addMobileDlBtn(node.parentNode,4);}});document.querySelectorAll('section > main div > div > div a[href^="/p/"]').forEach(function(node){if(node.href.indexOf('liked_by')>-1){return;}
if(node.dataset.extSkip>0){return;}
var img=node.querySelector('img');if(img&&(img.width>50||img.clientWidth>50)){node.dataset.extSkip='1';self.addMobileDlBtn(node.parentNode,2);}});if(location.href.indexOf('instagram.com/stories/')>-1){var nativeStoriesWrap=document.querySelector('section.carul');if(nativeStoriesWrap){self.addMobileDlBtn(nativeStoriesWrap,3);}}},showDownloadError:function(){$('#react-root').append('<div class="error_dl_msg_mobile">'+UtilsModule.getLang("error_dl_msg")+'</div>');setTimeout(function(){$('.error_dl_msg_mobile').remove();},2000);},userActionsListenerInit:function(){var $body=$('body');var app=this;var lasClickTime=0;$body.on('click','.'+app.dlBtnClassName,function(e){var el=this;e.stopPropagation();e.preventDefault();var now=Date.now();if(lasClickTime+500>now){return;}
lasClickTime=now;app.loaderBtnState.on(el);if(el.dataset.page_type==1){var mediaContainer=$(el).closest('article').get(0);app.getMediaInfoOnInternalPage(mediaContainer,function(res){App.onGetMediaInfo.call(app,res,el);});}
else if(el.dataset.page_type==2){mediaContainer=el.parentNode;app.getMediaInfoOnInternalPage(mediaContainer,function(res){App.onGetMediaInfo.call(app,res,el);});}
else if(el.dataset.page_type==3){mediaContainer=el.parentNode;app.getMediaInfoOnStoriesPage(mediaContainer,function(res){App.onGetMediaInfo.call(app,res,el);});}
else if(el.dataset.page_type==4){mediaContainer=el.parentNode;app.getMediaInfoFromDocument(mediaContainer,function(res){App.onGetMediaInfo.call(app,res,el);});}});$body.on('click','.ckWGn',function(){var top=document.body.style.top;var a=document.querySelector('[role="dialog"] article header div + div a:first-child');var href=a&&a.getAttribute('href');if(href&&href.match(new RegExp('^\\/[^/]+\\/$'))){a&&a.click&&a.click();setTimeout(function(){document.body.style.top=top;},200);}});$body.on('click','.coreSpriteCloseLight',function(){setTimeout(function(){if(!document.querySelector('.coreSpriteFeedCreation')){window.location.reload();}},300);});var isNaturalClick=true;$body.on('click','.coreSpriteStoryCreation',function(e){if(!isNaturalClick){return;}
var self=this;globalUtils.sendMessage('tryUploadStory',function(res){if(res){var hideRotateMsgInterval=setInterval(function(){$('._162ov ._3bdnt').css({opacity:0});},20);setTimeout(function(){isNaturalClick=false;self.click();setTimeout(function(){clearInterval(hideRotateMsgInterval);isNaturalClick=true;},200);},300);}})});},messagesListenerInit:function(){chrome.runtime.onMessage.addListener(function(message,sender,cb){if(message=='storyPauseOffByDownloadId'){StoriesModule.storiesPause.off();}
else if(message.action=='storyPauseOffByBlobUrl'){if(window['ext_blob_story_data']['object_url']==message.url){StoriesModule.storiesPause.off();}}});},loaderBtnState:{on:function(el){$('.ext_icon',el).addClass('preloader2');},off:function(){$('.preloader2').removeClass('preloader2')}},createBtnTpl:function(){var a=document.createElement('a');a.innerHTML='<span class="ext_icon"></span>';this.buttonTemplate=a;},getDlBtnEl:function(pageType){var dlBtn=this.buttonTemplate.cloneNode(true);dlBtn.setAttribute('type','button');dlBtn.dataset.page_type=pageType;dlBtn.classList.add(this.dlBtnClassName);if(pageType==1||pageType==2||pageType==4){dlBtn.classList.add(this.dlProfileBtnClassName);}
else if(pageType==3){dlBtn.classList.add(this.dlStoryBtnClassName);}
return dlBtn;},getMediaInfoOnMainPage:function(articleContainer,callback){if(!(articleContainer instanceof HTMLElement)||typeof callback!='function'){return;}
var header=articleContainer.querySelector('header');if(!header){return callback({error:1});}
var mediaContainer=articleContainer.querySelector('header + div');var userName,url,filename;var userLinkEl=header.querySelector('div + div a:first-child');var userHref=userLinkEl.getAttribute('href');if(m=userHref.match(new RegExp('^\\/([^/]+)\\/$'))){userName=m[1];}
var video=mediaContainer.querySelector('video[src]');if(video){url=App.getLinkFromVideoElement(video);if(typeof url!='string'||url.indexOf('blob:')>-1){return this.getMediaInfoOnInternalPage(articleContainer,callback);}
filename=globalUtils.getFileNameFromVideoLink(url,userName);}
else{var image=App.findImageElement(mediaContainer);if(image){url=App.getLinkFromImgElement(image);filename=globalUtils.getFileNameFromImageLink(url,userName);}}
if(!url||!filename){return callback({error:1});}
return callback({url:url,filename:filename});},getMediaInfoOnInternalPage:function(mediaContainer,callback){if(!(mediaContainer instanceof HTMLElement)||typeof callback!='function'){return;}
var app=this;var shortCode=App.getShortCode(mediaContainer);if(!shortCode){return callback({error:1});}
var ourDlBtn=mediaContainer.querySelector('.'+app.dlBtnClassName);if(!ourDlBtn){return callback({error:1});}
globalUtils.getMediaItemFromJsonGraphql({shortCode:shortCode,posInMultiple:ourDlBtn.dataset.multiplePos},callback);},getMediaInfoOnStoriesPage:function(mediaContainer,callback){var userName,url,filename;userName=window.location.pathname.match(new RegExp('stories\\/([^/]+)'));userName=userName&&userName[1];var video=mediaContainer.querySelector('video');if(video){url=App.getLinkFromVideoElement(video);filename=globalUtils.getFileNameFromVideoLink(url,userName);}
else{var image=mediaContainer.querySelector('img');url=App.getLinkFromImgElement(image);filename=globalUtils.getFileNameFromImageLink(url,userName);}
if(!url||!filename){return callback({error:1});}
return callback({url:url,filename:filename,isStory:1});},getMediaInfoFromDocument:function(el,callback){var userName=App.getUserName(el,true);if(App.isVideoPost(el.parentNode)){var videoEl=App.findVideoElement(el.parentNode);if(videoEl){var url=App.getLinkFromVideoElement(videoEl);var filename=globalUtils.getFileNameFromVideoLink(url,userName);}}
else if(App.isImagePost(el.parentNode)){var imageEl=App.findImageElement(el.parentNode);if(imageEl){url=App.getLinkFromImgElement(imageEl);filename=globalUtils.getFileNameFromImageLink(url,userName);}}
if(url&&globalUtils.isValidUrl(url)&&filename){return callback({url:url,filename:filename,});}
callback();},}})();var StoriesModule=(function(){return{dlBtnClassName:'ext_stories_dl_btn',showingStoryItems:[],showingStoryType:null,allCurrentStories:[],gallery:null,lastTimeStoryUpdate:0,lastTimeLiveStoriesUpdate:0,lastTimeAllStoriesUpdate:0,storyUpdatePeriod:60*1000,liveStoriesUpdatePeriod:60*1000,allStoriesUpdatePeriod:600*1000,storyTrayElTpl:null,storyLiveElTpl:null,storyNativeLiveElTpl:null,storiesWrapperClass:'ext_stories_wrap',cachedStoriesMedia:{},livesDataCurrentUser:{},storiesInserted:false,injectedStoriesWrap:null,prtnrExists:false,visibleIsStories:true,hideIgStoriesBlock:function(btn){var $e=$('.ext_stories_wrap');$e.css({height:'0',opacity:0.2,});btn.dataset.state='switched_off';this.visibleIsStories=false;chrome.runtime.sendMessage('hideIgStoriesBlock');},showIgStoriesBlock:function(btn){var $e=$('.ext_stories_wrap');$e.css({height:'84px',});setTimeout(function(){$e.css({opacity:1,});},200);btn.dataset.state='switched_on';this.visibleIsStories=true;chrome.runtime.sendMessage('showIgStoriesBlock');},insertVisibilityIgStoriesToggler:function(storiesContainer,storiesWrap){if(StoriesModule.prtnrExists)return;var dataState=this.visibleIsStories?'switched_on':'switched_off';var wrap=document.createElement('div');wrap.className='ext_stories_toggler_wrap';wrap.innerHTML=`<a class="ext_stories_toggler" data-state="${dataState}">
         <span class="arrow"></span><span class="text">${UtilsModule.getLang('add_on_stories')}</span>
        </a>`;storiesContainer.insertBefore(wrap,storiesWrap);tippy('.ext_stories_toggler',{content:chrome.i18n.getMessage('privacy_watching_msg')});},insertStoriesBlock:function(storiesContainer){if(StoriesModule.prtnrExists)return;if(!UtilsModule.isMainPage()){return;}
if(!storiesContainer){return;}
var storiesWrap=document.querySelector('.'+StoriesModule.storiesWrapperClass);if(storiesWrap){return;}
storiesWrap=document.createElement('div');storiesWrap.className=StoriesModule.storiesWrapperClass;if(storiesContainer.firstElementChild){storiesContainer.insertBefore(storiesWrap,storiesContainer.firstElementChild);}
else{storiesContainer.appendChild(storiesWrap);}
if(this.visibleIsStories){storiesWrap.style.height='84px';storiesWrap.style.opacity=1;}
else{storiesWrap.style.height='0';storiesWrap.style.opacity='0.2';}
this.insertVisibilityIgStoriesToggler(storiesContainer,storiesWrap);this.insertStories(storiesWrap);if(!UtilsModule.isWindows()){Ps.initialize(storiesWrap,{minScrollbarLength:50,maxScrollbarLength:50});}},insertStories:function(storiesWrap){if(StoriesModule.prtnrExists)return;var self=this;self.lastTimeLiveStoriesUpdate=Date.now();globalUtils.sendMessage('getAllStories',function(stories){if(!stories){$('.ext_stories_toggler_wrap').hide();return;}
if(!stories.post_live.length&&!stories.broadcasts.length&&!stories.tray.length){$('.ext_stories_toggler_wrap').hide();return;}
$('.ext_stories_toggler_wrap').show();self.allCurrentStories=stories;[].concat(self.allCurrentStories.broadcasts,self.allCurrentStories.post_live).forEach(function(item){var isLive=!!item.broadcast_owner;self.insertStoryLiveItem(item,storiesWrap,isLive);});self.allCurrentStories.tray.forEach(function(item){self.insertStoryTrayItem(item,storiesWrap)});if(UtilsModule.isWindows()){$(storiesWrap).smoothDivScroll();}});},updateLiveStories:function(){if(StoriesModule.prtnrExists)return;var self=this;var storiesWrap=document.querySelector('.'+StoriesModule.storiesWrapperClass);if(!storiesWrap){return;}
if(Date.now()<(this.lastTimeLiveStoriesUpdate+this.liveStoriesUpdatePeriod)){return;}
self.lastTimeLiveStoriesUpdate=Date.now();globalUtils.sendMessage('getAllStories',function(stories){if(!stories){$('.ext_stories_toggler_wrap').hide();return;}
$('.ext_stories_toggler_wrap').show();self.allCurrentStories=stories;var $oldElements=$('.ext_our_story_item[data-story-type="live"], .ext_our_story_item[data-story-type="postlive"]')
$oldElements.attr('data-updated','0');var changesExists=false;[].concat(self.allCurrentStories.broadcasts,self.allCurrentStories.post_live).forEach(function(item){var itemId=item.id||item.pk;if($oldElements.filter('[data-story-id="'+itemId+'"]').attr('data-updated','1').length>0)return;var isLive=!!item.broadcast_owner;changesExists=true;self.insertStoryLiveItem(item,storiesWrap,isLive);});$oldElements.filter('[data-updated="0"]').remove();if(changesExists&&UtilsModule.isWindows()){try{$(storiesWrap).smoothDivScroll("recalculateScrollableArea");}catch(e){}}});},getStoryLiveElemItem:function(storyInfo){var user=storyInfo.broadcast_owner||storyInfo.user;var isLive=typeof storyInfo.broadcast_owner!='undefined';var storyAuthorText=user.username.length>11?user.username.substr(0,10)+'...':user.username;var storyTypeIconSrc=chrome.runtime.getURL(`/img/${isLive ? 'live.png' : 'post_live.png'}`);var storyEl=document.createElement('div');storyEl.className='ext_story_item_wrap ext_our_story_item';storyEl.dataset.storyId=storyInfo.id||storyInfo.pk;storyEl.dataset.storyType=isLive?'live':'postlive';storyEl.innerHTML=`<div class="ext_live_tray_item ext_unseen_story_item">
      <img class="user_icon_live center_div" src="${user.profile_pic_url}">
      <div class="user_icon_black_background center_div"></div>'+
      <img class="ext_live_icon center_div" src="${storyTypeIconSrc}">
     </div>
     <div class="ext_story_item_author">${storyAuthorText}</div>`;return storyEl;},insertStoryLiveItem:function(storyInfo,storiesWrap,isLive){if(StoriesModule.prtnrExists)return;var storyEl=this.getStoryLiveElemItem(storyInfo);if(UtilsModule.isWindows()){var containerForInsert=storiesWrap.querySelector('.scrollableArea');if(!containerForInsert){containerForInsert=storiesWrap;}}
else{containerForInsert=storiesWrap;}
if(isLive){var neighborOnTheRight=storiesWrap.querySelector('.ext_our_story_item');}
else{neighborOnTheRight=storiesWrap.querySelector('.ext_our_story_item[data-story-type="postlive"], .ext_our_story_item[data-story-type="tray"]');}
if(containerForInsert.querySelector('[data-story-id="'+storyInfo.id+'"]')){return;}
if(neighborOnTheRight){containerForInsert.insertBefore(storyEl,neighborOnTheRight);}
else{containerForInsert.appendChild(storyEl);}},insertStoryTrayItem:function(storyInfo,storiesWrap){if(StoriesModule.prtnrExists)return;if(!storyInfo.user)return;var user=storyInfo.user;var storyAuthorText=user.username.length>11?user.username.substr(0,10)+'...':user.username;var storyEl=document.createElement('div');storyEl.className='ext_story_item_wrap ext_our_story_item';storyEl.dataset.storyType='tray';storyEl.dataset.storyId=storyInfo.id||storyInfo.pk;storyEl.innerHTML=`<div class="ext_story_item_image">
      <img class="ext_item_image_orig" src="${user.profile_pic_url}">
     </div>
     <div class="ext_story_item_author">${storyAuthorText}</div>`;storiesWrap.appendChild(storyEl);},checkStoryOneUser:function(userName,callback){if(StoriesModule.prtnrExists)return;var self=this;globalUtils.requestJSONgraphqlUser(userName,function(res){if(!res||res.error||!res.graphql){return callback({error:1});}
var user=res.graphql.user;var userId=user&&user.id;if(!userId){return callback({error:1});}
self.requestOneUserTrayStories(userId,function(res){if(!res||!res.items||!res.items.length){return callback({error:1});}
var storyItems=self.prepareStoryItems(res.items);if(!storyItems.length){return callback({error:1});}
callback(storyItems);});});},requestOneUserTrayStories:function(userId,callback){globalUtils.sendMessage({action:'requestOneUserTrayStories',user_id:userId},function(res){callback(res);});},requestOneUserAllTypesStories:function(options,callback){globalUtils.sendMessage({action:'requestOneUserAllTypesStories',options:options},function(res){callback(res);});},checkPostLiveOneUser:function(callback){var self=this;var userName=globalUtils.getUserNameFromWindowLocation();if(!userName){var userTitleWrap=document.querySelector('main header section h2');userName=userTitleWrap&&userTitleWrap.innerText;}
if(!userName){return callback(false);}
globalUtils.requestJSONgraphqlUser(userName,function(res1){try{var userId=res1.graphql.user.id;}catch(e){console.error(e)}
if(!userId)return callback(false);globalUtils.sendMessage({action:'getCachedPostLives',author_user_id:userId},function(shortcodes){if(!shortcodes)return callback(false);self.requestOneUserAllTypesStories({user_id:userId,},function(res){if(!res)return callback(false);var storiesExists=res.reel&&typeof res.reel.items!=='undefined';callback({user_id:userId,stories_exists:storiesExists,shortcodes:shortcodes,});});});});},addPostLiveIcon2UserPage:function(parent,options){var dataOpts=JSON.stringify(options);$(`<div class="ext_post_live_icon_wrap">
     <img src="${chrome.runtime.getURL('/img/post_live.png')}">
     </div>
     <div class="ext_post_live_placeholder" data-opts="${dataOpts}"</div>`).appendTo(parent);},showPostLiveFromOneUserPage:function(el){var opts=JSON.parse(el.dataset.opts);var show=function(){StoriesModule.showWaitingLiveLoader();globalUtils.sendMessage({action:'getIGTVDetailedRecursively',shortcodes:opts.shortcodes,},function(res){StoriesModule.hideWaitingLiveLoader();if(!res||!res.broadcasts||!res.broadcasts.length){return;}
var storyItems=StoriesModule.prepareIgtv2SavedLive(res.broadcasts);StoriesModule.showInPswp(storyItems);});};if(!opts.stories_exists){return show();}
App.getModalBox().showStoryTypeUserChoice({showPostLiveCallback:show,showStoriesCallback:function(){el.parentElement.click();}});},prepareStoryItems:function(items,userData){var storyItems=[];items.forEach(function(item){try{var src=null;var maxWidth=0;var maxHeight=0;var minWidth=undefined,prev=undefined,ext;var isVideo=typeof item.video_versions!='undefined';if(isVideo){item.video_versions.forEach(function(item){if(item.width>maxWidth){maxWidth=item.width;maxHeight=item.height;src=item.url;}});item.image_versions2.candidates.forEach(function(item){if(!minWidth||item.width<minWidth){minWidth=item.width;prev=item.url;}});ext='mp4';if(src.indexOf('.flv')!==-1){ext='flv';}}else{item.image_versions2.candidates.forEach(function(item){if(item.width>maxWidth){maxWidth=item.width;maxHeight=item.height;src=item.url;}
if(typeof minWidth=='undefined'){minWidth=item.width;prev=item.url;}else if(!minWidth||item.width<minWidth){minWidth=item.width;prev=item.url;}});ext='jpg';if(src.indexOf('.png')!==-1){ext='png';}}
var filename=src.match(new RegExp('\\/([^/?]+)(?:$|\\?)'));filename=filename&&filename[1];if(!filename){filename='noname.'+ext;}
var userName=item.user.username||(userData&&userData.username)||'';if(userName.length){filename=`${userName}_${filename}`}
filename=globalUtils.filename.modify(filename);var itemMedia={w:maxWidth,h:maxHeight,isVideo:isVideo,type:isVideo?'video':'photo',url:src,prev:prev,filename:filename,story_type:'tray',username:userName,userPic:item.user.profile_pic_url||(userData&&userData.profile_pic_url)||'',locations:item.story_locations,hashtags:item.story_hashtags};isVideo?itemMedia.html='<video class="ext_video_story_player" controls><source src="'+src+'" type="video/mp4"></video>':itemMedia.src=src;storyItems.push(itemMedia);}catch(e){}});return storyItems;},prepareIgtv2SavedLive:function(broadcasts){var storyItems=[];broadcasts.forEach(function(broadcast){try{var itemMedia={filename:globalUtils.getIgtvFileName(broadcast),story_type:'post_live_igtv',html:'<video class="ext_video_story_player" controls><source src="'+broadcast.url+'" type="video/mp4"></video>',user_pk:broadcast.owner.pk,username:broadcast.owner.username,userPic:broadcast.owner.profile_pic_url,isVideo:true,url:broadcast.url,};storyItems.push(itemMedia);}catch(e){}});return storyItems;},createPswp:function(){var pswpElement=document.createElement('div');pswpElement.setAttribute('tabindex','-1');pswpElement.setAttribute('role','dialog');pswpElement.setAttribute('aria-hidden','true');pswpElement.className='pswp insta_down';var downloadText=UtilsModule.getLang("download");var downloadAllText=UtilsModule.getLang("download_all");pswpElement.innerHTML=`<div class="pswp__bg"></div>
     <div class="pswp__scroll-wrap">
      <div class="pswp__container">
       <div class="pswp__item"></div>
       <div class="pswp__item"></div>
       <div class="pswp__item"></div>
      </div>
      <div class="pswp__ui pswp__ui--hidden pswp__ctrls-wrap">
       <div class="pswp__top-bar">
        <div class="pswp__counter"></div>
        <div class="dl_btns_container">
         <a type="button" class="${StoriesModule.dlBtnClassName} ext_ds_dl_btn ext_story__download" title="${downloadText}">
          <span class="ext_icon"></span>
          <span class="ext_text">${downloadText}</span>
         </a>
         <a type="button" class="${StoriesModule.dlBtnClassName} ext_ds_dl_all_btn ext_story__download_all" title="${downloadAllText}">
          <span class="ext_icon"></span>
          <span class="ext_text">${downloadAllText}</span>
         </a>
        </div>
        <div class="pswp__preloader">
         <div class="pswp__preloader__icn">
          <div class="pswp__preloader__cut">
           <div class="pswp__preloader__donut"></div>
          </div>
         </div>
        </div>
       </div>
       <div class="story_author_wrap">
        <div class="story_author_wrap_2">
         <a target="_blank" class="author_link">
          <img src="" class="story_author_icon">
         </a>
         <div class="story_author_name"></div>
        </div>
       </div>
       <button class="pswp__button pswp__button--arrow--left"></button>
       <button class="pswp__button pswp__button--arrow--right"></button>
       <div class="pswp__caption">
        <div class="pswp__caption__center"></div>
       </div>
      </div>
     </div>`;document.querySelector('body').appendChild(pswpElement);return pswpElement;},getPswp:function(){var pswpElement=document.querySelector('.insta_down');if(pswpElement){return pswpElement;}
return this.createPswp();},stopAllVideos:function(){document.querySelectorAll('.ext_video_story_player').forEach(function(item){item.pause();});},showInPswp:function(items){try{var self=this;if(!items||!items.length){return;}
var pswpElement,gallery,htmlPlayerElement,downloadAllBtn;var setAuthorStory=function(story){var storyAuthorWrap=pswpElement.querySelector('.story_author_wrap');if(!story){return storyAuthorWrap.style.display='none';}
storyAuthorWrap.querySelector('.author_link').href='https://www.instagram.com/'+story.username;storyAuthorWrap.querySelector('.story_author_icon').src=story.userPic;storyAuthorWrap.querySelector('.story_author_name').innerText=story.username;storyAuthorWrap.style.display='block';};var setLocationAndTagsStory=function(story){var parent=pswpElement.querySelector('.story_location_hashtags_wrap');parent.innerHTML='';if(story.locations&&story.locations.length){story.locations.forEach(function(item){$('<div class="story_location_item" data-id="'+item.location.pk+'">'+'<div class="icon"></div>'+'<div class="name">'+item.location.name+'</div>'+'</div>').appendTo(parent);});}
if(story.hashtags&&story.hashtags.length){story.hashtags.forEach(function(item){$('<div class="story_hashtag_item" data-tag="'+item.hashtag.name+'">'+'<div class="icon"></div>'+'<div class="name">'+item.hashtag.name+'</div>'+'</div>').appendTo(parent);});}};self.showingStoryItems=items;pswpElement=self.getPswp();var options={index:0,closeOnScroll:false,history:false,focus:true,bgOpacity:0.96,escKey:true,};gallery=new PhotoSwipe(pswpElement,PhotoSwipeUI_Default,items,options);self.gallery=gallery;downloadAllBtn=pswpElement.querySelector('.ext_ds_dl_all_btn');if(items[0].story_type=='post_live_igtv'||self.showingStoryItems.length<2){downloadAllBtn.style.display='none';}
else{downloadAllBtn.style.display='block';}
gallery.listen('afterChange',function(){if(!this.currItem.container){return;}
setAuthorStory(this.currItem);if(this.currItem.isVideo){htmlPlayerElement=this.currItem.container.querySelector(".ext_video_story_player");htmlPlayerElement.currentTime=0;htmlPlayerElement.play();}});gallery.listen('beforeChange',function(){self.stopAllVideos();});gallery.listen('close',function(){self.stopAllVideos();self.showingStoryItems=[];});gallery.listen('destroy',function(){self.gallery=null;pswpElement.remove();});gallery.init();}catch(e){Math.random()<0.01&&globalUtils.trackCodeError(e,'showInPswp');}},toggleVisibleDlAllBtnInNativeStories:function(container){if(StoriesModule.prtnrExists)return;var dlAllBtn=document.querySelector('.ext_ns_dl_all_btn');if(!dlAllBtn){return;}
if(window.location.pathname.match(new RegExp('stories\\/locations\\/([^/]+)'))||window.location.pathname.match(new RegExp('stories\\/tags\\/([^/]+)'))){dlAllBtn.style.display='none';return;}
var countMedias=1;var _mviq1=container.querySelector('._mviq1');if(!_mviq1){_mviq1=container.querySelector('section > header + div');}
if(!_mviq1){_mviq1=container.querySelector('section header > div:first-child');}
if(_mviq1){countMedias=_mviq1.childElementCount;}
if(countMedias>1){dlAllBtn.querySelector('.stories_count').innerText='('+countMedias+')';dlAllBtn.style.display='flex';}
else{dlAllBtn.style.display='none';}},addDlBtn2NativeStories:function(container){if(StoriesModule.prtnrExists)return;var parent=container.parentNode;if(!parent.querySelector('.native_stories_dl_wrap')){this.appendDlBtn2NativeStories(parent);}
this.toggleVisibleDlAllBtnInNativeStories(parent);this.addVideoControlsListenerToVideoStory(parent);},addVideoControlsListenerToVideoStory:function(parent){var videoEl=parent.querySelector('video');if(!videoEl)return;if(!App.videoControlsEnabled)return;if(videoEl.dataset.played||videoEl.dataset.listener_added)return;if(isNaN(videoEl.duration)){videoEl.dataset.listener_added='1';videoEl.addEventListener('progress',App.videoPlayingListener)}
else{videoEl.dataset.played='1';App.addControlToVideoEl({video:videoEl,duration:videoEl.duration,});}},appendDlBtn2NativeStories:function(container){if(StoriesModule.prtnrExists)return;$(`<div class="native_stories_dl_wrap">
      <a class="${StoriesModule.dlBtnClassName} ext_ns_dl_btn ext_story__download">
       <span class="ext_icon"></span>
       <span class="ext_text">${UtilsModule.getLang('download')}</span>
      </a>
      <a class="${StoriesModule.dlBtnClassName} ext_ns_dl_all_btn ext_story__download_all">
       <span class="ext_icon"></span>
       <span class="ext_text">${UtilsModule.getLang('download_all')}</span>
       <span class="stories_count"></span>
      </a>
     </div>`).appendTo(container);this.toggleVisibleDlAllBtnInNativeStories(container);},onClickDlBtnNativeStoryOne:function(e){if(StoriesModule.prtnrExists)return;var el=this;var userName=window.location.pathname.match(new RegExp('stories\\/([^/]+)'));userName=userName&&userName[1];var url,filename;var container=el.parentNode.parentNode.querySelector('section');if(!container){return;}
var videoEl=App.findVideoElement(container);if(videoEl){url=App.getLinkFromVideoElement(videoEl);filename=globalUtils.getFileNameFromVideoLink(url,userName);}
else{var imageEl=App.findImageElement(container);url=App.getLinkFromImgElement(imageEl);filename=globalUtils.getFileNameFromImageLink(url,userName);}
if(!url||!filename){return;}
filename=globalUtils.filename.modify(filename);App.onGetMediaInfo.call(App,{url:url,filename:filename,isStory:true,},el);},onClickDlBtnNativeStoryAll:function(e){if(StoriesModule.prtnrExists)return;DownloadZipModule.zipCanceledByUser=false;App.loaderBtnState.on(this);StoriesModule.getAllLinksCurrentNativeStories(function(res){App.loaderBtnState.off();if(!res||res.error){return;}
var storyItems=res;if(storyItems&&storyItems.length){var userName=storyItems[0]&&storyItems[0].username;DownloadZipModule.downloadZIP({files:storyItems,filename_prefix:userName,is_story:true,},function(){});}});},onClickDlBtnOurStoryOne:function(e){if(StoriesModule.prtnrExists)return;var storyMediaItem=StoriesModule.gallery.currItem;var filename=storyMediaItem.filename;StoriesModule.storiesPause.on();filename=globalUtils.filename.modify(filename);globalUtils.downloadFile({url:storyMediaItem.url,filename:filename,isStory:true,},function(res){});},onClickDlBtnOurStoryAll:function(e){if(StoriesModule.prtnrExists)return;DownloadZipModule.zipCanceledByUser=false;StoriesModule.storiesPause.on();DownloadZipModule.downloadZIP({files:StoriesModule.showingStoryItems.slice(0),filename_prefix:StoriesModule.gallery.currItem.username,is_story:true,},function(){});},storiesPause:{isPausedByUs:false,isNativeStories:function(){return window.location.href.indexOf('/stories/')>-1},isOurStories:function(){return!!(StoriesModule.gallery&&StoriesModule.gallery.currItem)},pauseNativeStories:function(){return;var btnOptions=document.querySelector('.glyphsSpriteMore_horizontal__filled__24__grey_0');if(btnOptions){var styleEl=document.createElement('style');styleEl.id='ext_native_stories_pause_style';styleEl.innerText='[role="presentation"] > div:not(.imdr_modal){opacity: 0 !important;}';document.head.appendChild(styleEl);var self=this;setTimeout(function(){btnOptions.click();self.isPausedByUs=true;},100);}},playNativeStories:function(){$('[role="presentation"]').click();$('#ext_native_stories_pause_style').remove();this.isPausedByUs=false;},pauseOurStories:function(){if(!StoriesModule.gallery||!StoriesModule.gallery.currItem||!StoriesModule.gallery.currItem.container){return false;}
var htmlContainer=StoriesModule.gallery.currItem.container;var videoPlayer=htmlContainer.querySelector(".ext_video_story_player");if(!videoPlayer){return false;}
if(!videoPlayer.paused){videoPlayer.pause();this.isPausedByUs=true;}},playOurStories:function(){this.isPausedByUs=false;if(!StoriesModule.gallery||!StoriesModule.gallery.currItem||!StoriesModule.gallery.currItem.container){return;}
var htmlContainer=StoriesModule.gallery.currItem.container;var videoPlayer=htmlContainer.querySelector(".ext_video_story_player");if(!videoPlayer){return;}
if(videoPlayer.paused){videoPlayer.play();}},on:function(){if(this.isNativeStories()){this.pauseNativeStories();}
else if(this.isOurStories()){this.pauseOurStories();}},off:function(){if(!this.isPausedByUs){return;}
if(this.isNativeStories()){this.playNativeStories();}
else if(this.isOurStories()){this.playOurStories();}}},getAllLinksCurrentNativeStories:function(callback){if(StoriesModule.prtnrExists)return;if(window.location.pathname.match(new RegExp('stories\\/locations\\/([^/]+)'))||window.location.pathname.match(new RegExp('stories\\/tags\\/([^/]+)'))){return;}
if(window.location.pathname.match(new RegExp('stories\\/highlights\\/([^/]+)'))){var highlightsId=window.location.pathname.match(new RegExp('stories\\/highlights\\/([^/]+)'));highlightsId=highlightsId&&highlightsId[1];globalUtils.getPostsDataFromUserGraphqlOther({highlight_reel_id:highlightsId,},callback);}
else{var userName=window.location.pathname.match(new RegExp('stories\\/([^/]+)'));userName=userName&&userName[1];if(!userName){callback();return;}
this.checkStoryOneUser(userName,callback);}},showWaitingLiveLoader:function(){$('<div class="wait_live_placeholder"><span></span></div>').appendTo(document.body);},hideWaitingLiveLoader:function(){document.querySelector('.wait_live_placeholder').remove();},}})();var DownloadZipModule=(function(){return{zipCanceledByUser:false,zipCanceledByUser2:false,dlBtnClassName:'ext_btn_dl_all',PAGE_TYPE_DEFAULT:1,PAGE_TYPE_USERPAGE:2,PAGE_TYPE_ONE_POST:3,pageType:null,massDownloadProSettings:false,isAdvancedSettings:false,processIsActive:false,showPopupDlAll:function(){var allDlBtn=document.querySelector('.'+this.dlBtnClassName);var parent=allDlBtn.parentNode.parentNode;var allPopupWrap=document.createElement('div');allPopupWrap.className='ext_all_popup_wrap';allPopupWrap.innerHTML=`<div class="ext_dl_all_dialog" role="dialog"></div>
     <div class="ext_dl_all_popup_loader"><span class="ext_icon"></span></div>
     <div class="ext_dl_all_popup">
      <div class="ext_popup_header"></div>
      <div class="ext_popup_links_wrap"></div>
      <div class="ext_popup_footer">
     </div>`;parent.appendChild(allPopupWrap);var closePopup=function(e){e.stopPropagation();allPopupWrap.querySelector('.ext_dl_all_dialog').removeEventListener('click',closePopup);parent.removeChild(allPopupWrap);};allPopupWrap.querySelector('.ext_dl_all_dialog').addEventListener('click',closePopup);var fromIgtv=App.getUserPageSection()=='igtv';var fromTagged=App.getUserPageSection()=='tagged';var fromSaved=App.getUserPageSection()=='saved';if(fromIgtv){this.buildDownloadAllPopup({igtv_not_allowd:1});return;}
var self=this;globalUtils.sendMessage('isDownloadAllProcessNow',function(res){if(res){self.buildDownloadAllPopup({denied:1});}
else{if(document.querySelector('header a[href*="followers"]')){var options={fromSaved:fromSaved,fromTagged:fromTagged,};self.checkPossibilityVirtualScrollPage(options,function(res){if(!res||res.error||!res.success||!res.count){self.pageType=self.PAGE_TYPE_DEFAULT;self.buildDownloadAllPopup({count:App.cachedMediaShortCodes.length});}
else{options.count=res.count;options.user_page=true;self.pageType=self.PAGE_TYPE_USERPAGE;self.buildDownloadAllPopup(options);}});}
else{self.pageType=self.PAGE_TYPE_DEFAULT;self.buildDownloadAllPopup({count:App.cachedMediaShortCodes.length});}}});},rebuildPopup:function(){if(!document.querySelector('.ext_all_popup_wrap')){return;}
if(DownloadZipModule.pageType==DownloadZipModule.PAGE_TYPE_DEFAULT){var $endValEl=$('#ext_dl_all_end');var oldEndVal=$endValEl.val();var newEndVal=App.cachedMediaShortCodes.length;$('.files_found_count').text(newEndVal);if(oldEndVal==$endValEl.attr('max')){$endValEl.val(newEndVal);}
$endValEl.attr('max',newEndVal);}},isOnePostPage:function(){return!!(window.location.href.indexOf('/p/')>-1&&document.querySelector('article > header + div div[role="button"]'));},buildDownloadAllPopup:function(options){var self=DownloadZipModule;if(options.count===0){return self.buildDownloadAllPopupNoFiles();}
if(!options.fromTagged&&!options.fromSaved&&!options.fromIgtv&&self.massDownloadProSettings&&self.pageType==self.PAGE_TYPE_USERPAGE){return self.buildDownloadAllPopupAdvanced(options);}
self.isAdvancedSettings=false;var allPopupWrap=document.querySelector('.ext_all_popup_wrap');if(!allPopupWrap){return;}
var allPopup=allPopupWrap.querySelector('.ext_dl_all_popup'),headerPopup=allPopupWrap.querySelector('.ext_popup_header'),popupLoader=allPopupWrap.querySelector('.ext_dl_all_popup_loader'),linksWrapper=allPopupWrap.querySelector('.ext_popup_links_wrap'),footerPopup=allPopup.querySelector('.ext_popup_footer');linksWrapper.innerHTML='';if(options.denied){headerPopup.innerText=UtilsModule.getLang('parallel_all_download_denied');popupLoader.style.display='none';allPopup.style.display='block';return;}
if(options.igtv_not_allowd){headerPopup.innerText=UtilsModule.getLang('igtv_bulk_downloading_not_allowed');popupLoader.style.display='none';allPopup.style.display='block';return;}
var needFormRange=false;if(options.fromTagged){var pageName=$('a[href*="/tagged/"]').text();if(pageName.length){pageName=(' ('+pageName+')').toUpperCase();}
headerPopup.innerHTML=`<span> ${UtilsModule.getLang('download_all')}&nbsp;${pageName}</span>
      <span class="igtv_skip_sign">
       <img src="${chrome.runtime.getURL("/img/info.svg")}">
      </span>`;headerPopup.style.marginBottom='10px';tippy('.igtv_skip_sign',{content:chrome.i18n.getMessage('igtv_skip_bulk_downloading')});footerPopup.remove();}
else{var maxCount=options.count;headerPopup.innerHTML=`<span>${UtilsModule.getLang('files_found_on_page')}:&nbsp;</span> 
      <span class="files_found_count">${maxCount}</span>
      <span class="igtv_skip_sign">
       <img src="${chrome.runtime.getURL('/img/info.svg')}">
      </span>`;tippy('.igtv_skip_sign',{content:chrome.i18n.getMessage('igtv_skip_bulk_downloading')});var defaultEndCount=maxCount;if(self.pageType==self.PAGE_TYPE_DEFAULT){needFormRange=true;footerPopup.innerText=UtilsModule.getLang('scroll_page_for_download_more');}
else if(self.pageType==self.PAGE_TYPE_USERPAGE){needFormRange=true;footerPopup.innerHTML='<a href="#">'+UtilsModule.getLang('mass_download_pro')+'</a>';footerPopup.querySelector('a').addEventListener('click',function(e){e.stopPropagation();e.preventDefault();self.massDownloadProSettings=true;globalUtils.sendMessage('massDownloadProSettingOn');DownloadZipModule.buildDownloadAllPopupAdvanced(options);});}}
if(needFormRange){var form=document.createElement('div');var maxValForStart=(parseInt(maxCount)-1).toString();form.className='choose_count_dl_all_form';form.innerHTML=`<span>${UtilsModule.getLang('set_range')}</span><span style="margin-left: -3px">${UtilsModule.getLang('from')}</span> 
      <input id="ext_dl_all_start" type="number" min="1" max="${maxValForStart}" value="1">
      <span>${UtilsModule.getLang('to')}</span>
      <input id="ext_dl_all_end" type="number" min="2" value="${defaultEndCount}" max="${maxCount}">`;linksWrapper.appendChild(form);}
var btnWrap=document.createElement('div');btnWrap.className='ext_btn_wrap';btnWrap.innerHTML=`<div class="ext_popup_dl_btn">${UtilsModule.getLang('download')}</div>`;linksWrapper.appendChild(btnWrap);popupLoader.style.display='none';allPopup.style.display='block';if(options.fromTagged){btnWrap.querySelector('.ext_popup_dl_btn').dataset.from_tagged='1';}
else{var inputStart=document.querySelector('#ext_dl_all_start');var inputEnd=document.querySelector('#ext_dl_all_end');var $inputEnd=$(inputEnd);var $inputStart=$(inputStart);$inputEnd.on('keydown',function(){var el=this;var actualMaxCount=this.getAttribute('max');setTimeout(function(){var val=parseInt(el.value);if(isNaN(val)||val<inputStart.value){el.value=inputStart.value;}
else if(val>actualMaxCount){el.value=actualMaxCount;}},1000);});$inputStart.on('keydown',function(){var el=this;setTimeout(function(){var val=parseInt(el.value);if(isNaN(val)||val<1){el.value=1;}
else if(val>inputEnd.value){el.value=inputEnd.value;}},1000);});$inputEnd.on('focus',function(){this.select();});$inputStart.on('focus',function(){this.select();});}},buildDownloadAllPopupNoFiles:function(){var allPopupWrap=document.querySelector('.ext_all_popup_wrap');if(!allPopupWrap){return;}
var allPopup=allPopupWrap.querySelector('.ext_dl_all_popup'),headerPopup=allPopupWrap.querySelector('.ext_popup_header'),popupLoader=allPopupWrap.querySelector('.ext_dl_all_popup_loader');headerPopup.innerText=UtilsModule.getLang('noLinksFound');allPopup.style.display='flex';headerPopup.style.display='block';headerPopup.style.textAlign='center';popupLoader.style.display='none';},buildDownloadAllPopupAdvanced:function(options){var self=DownloadZipModule;self.isAdvancedSettings=true;var allPopupWrap=document.querySelector('.ext_all_popup_wrap'),maxCount=options.count;if(!allPopupWrap){return;}
var allPopup=allPopupWrap.querySelector('.ext_dl_all_popup'),headerPopup=allPopupWrap.querySelector('.ext_popup_header'),popupLoader=allPopupWrap.querySelector('.ext_dl_all_popup_loader'),linksWrapper=allPopupWrap.querySelector('.ext_popup_links_wrap'),footerPopup=allPopup.querySelector('.ext_popup_footer');linksWrapper.innerHTML='';headerPopup.innerHTML=`<span>${UtilsModule.getLang('files_found_on_page')}:&nbsp;</span> 
     <span class="files_found_count">${maxCount}</span>
     <span class="igtv_skip_sign">
      <img src="${chrome.runtime.getURL('/img/info.svg')}">
     </span>`;tippy('.igtv_skip_sign',{content:chrome.i18n.getMessage('igtv_skip_bulk_downloading')});var form=document.createElement('div');form.className='imdr_advanced_form';form.innerHTML=`<div class="ext_form_header">${UtilsModule.getLang('advanced_settings_mass_download')}</div>
     <div class="ext_form_al_all_block">
      <div class="ext_form_al_all_sub_block">
       <span class="ext_span_label" title="${UtilsModule.getLang('by_default_100')}">${UtilsModule.getLang('set_percent')}</span>
       <span class="input_field_wrap">
        <input name="percent_count" type="number" max="100" min="1" value="100" class="ext_disabled" disabled>
        <span>&nbsp;%</span>
       </span>
       <span class="imdr_switch_wrap">
        <label class="ext_switch" title="${UtilsModule.getLang('by_default_100')}">
         <input type="checkbox" name="percent_toggler">
         <span class="ext_slider"></span>
        </label>
       </span>
      </div>
      <div class="ext_form_al_all_sub_block">
       <span class="ext_span_label">${UtilsModule.getLang('most_liked')}</span>
       <span class="imdr_switch_wrap">
        <label class="ext_switch">
         <input type="checkbox" name="most_liked" disabled>
         <span class="ext_slider ext_disabled"></span>
        </label>
       </span>
      </div>
      <div class="ext_form_al_all_sub_block">
       <span class="ext_span_label" title="${UtilsModule.getLang('only_video')}">${UtilsModule.getLang('most_viewed')}</span>
       <span class="imdr_switch_wrap">
        <label class="ext_switch" title="${UtilsModule.getLang('only_video')}">
         <input type="checkbox" name="most_viewed" disabled>
         <span class="ext_slider ext_disabled"></span>
        </label>
       </span>
      </div>
     </div>
     <div class="ext_form_al_all_block">
      <div class="ext_form_al_all_sub_block">
       <span class="ext_span_label">${UtilsModule.getLang('only_photo')}</span>
       <span class="imdr_switch_wrap">
        <label class="ext_switch">
         <input type="checkbox" name="only_photo">
         <span class="ext_slider"></span>
        </label>
       </span>
      </div>
      <div class="ext_form_al_all_sub_block">
       <span class="ext_span_label">${UtilsModule.getLang('only_video')}</span>
       <span class="imdr_switch_wrap">
        <label class="ext_switch">
         <input type="checkbox" name="only_video">
         <span class="ext_slider"></span>
        </label>
       </span>
      </div>
     </div>
     <div class="ext_form_al_all_block">
      <div class="ext_form_al_all_sub_block">
       <span class="ext_span_label">${UtilsModule.getLang('for_previous_days')}</span>
       <span class="input_field_wrap">
        <input type="number" name="last_days_count" class="ext_disabled" max="365" min="1" value="365" disabled>
       </span>
       <span class="imdr_switch_wrap">
        <label class="ext_switch">
         <input type="checkbox" name="for_previous_days">
         <span class="ext_slider"></span>
        </label>
       </span>
      </div>
     </div>`;linksWrapper.appendChild(form);var btnWrap=document.createElement('div');btnWrap.className='ext_btn_wrap';btnWrap.innerHTML=`<div class="ext_popup_dl_btn">${UtilsModule.getLang('download')}</div>`;footerPopup.innerHTML='<a href="#">'+UtilsModule.getLang('mass_download_pro_back')+'</a>';footerPopup.querySelector('a').addEventListener('click',function(e){e.stopPropagation();e.preventDefault();self.massDownloadProSettings=false;globalUtils.sendMessage('massDownloadProSettingOff');DownloadZipModule.buildDownloadAllPopup(options);});var $form=$(form);var $percentToggle=$('[name="percent_toggler"]',$form),$percentCount=$('[name="percent_count"]',$form),$onlyPhotoToggle=$('[name="only_photo"]',$form),$onlyVideoToggle=$('[name="only_video"]',$form),$byLastDaysToggle=$('[name="for_previous_days"]',$form),$lastDaysCount=$('[name="last_days_count"]',$form),$mostLikedToggle=$('[name="most_liked"]',$form),$mostViewedToggle=$('[name="most_viewed"]',$form);if(!$.fn.enableInput){$.fn.enableInput=function(){var $el=this;if(!$el||!$el.length||$el.get(0).tagName.toLowerCase()!='input')return;$el.removeAttr('disabled');if($el.attr('type')=='checkbox'){$el.parent().find('.ext_slider').removeClass('ext_disabled');}
else if($el.attr('type')=='number'){$el.removeClass('ext_disabled');}}}
if(!$.fn.disableInput){$.fn.disableInput=function(){var $el=this;if(!$el||!$el.length||$el.get(0).tagName.toLowerCase()!='input')return;$el.attr('disabled',true);if($el.attr('type')=='checkbox'){$el.parent().find('.ext_slider').addClass('ext_disabled');}
else if($el.attr('type')=='number'){$el.addClass('ext_disabled');}}}
$percentToggle.on('change',function(){if(this.checked){$mostLikedToggle.enableInput();if($onlyVideoToggle.prop('checked')){$mostViewedToggle.enableInput();}
$percentCount.enableInput();$percentCount.focus();$percentCount.select();}
else{$mostLikedToggle.disableInput();$mostLikedToggle.prop('checked',false);$mostViewedToggle.disableInput();$mostViewedToggle.prop('checked',false);$percentCount.disableInput();}});$onlyPhotoToggle.on('change',function(){if(this.checked){$onlyVideoToggle.prop('checked',false);$mostViewedToggle.prop('checked',false);$mostViewedToggle.disableInput();}});$onlyVideoToggle.on('change',function(){if(this.checked){$onlyPhotoToggle.prop('checked',false);if($percentToggle.prop('checked')){$mostViewedToggle.enableInput();}}
else{$mostViewedToggle.prop('checked',false);$mostViewedToggle.disableInput();}});$byLastDaysToggle.on('change',function(){if(this.checked){$lastDaysCount.enableInput();$lastDaysCount.focus();$lastDaysCount.select();}
else{$lastDaysCount.disableInput()}});$mostViewedToggle.on('change',function(){if(this.checked){$mostLikedToggle.prop('checked',false);}});$mostLikedToggle.on('change',function(){if(this.checked){$mostViewedToggle.prop('checked',false);}});$(form.querySelector('[name="last_days_count"]')).on('keydown',function(){var el=this;setTimeout(function(){var val=parseInt(el.value);if(isNaN(val)||val<1){el.value=1;}
else if(val>999){el.value=999;}},200);});$(form.querySelector('[name="percent_count"]')).on('keydown',function(){var el=this;setTimeout(function(){var val=parseInt(el.value);if(isNaN(val)||val<1){el.value=1;}
else if(val>100){el.value=100;}
if(val<100){$mostLikedToggle.enableInput();}
else{$mostLikedToggle.disableInput();$mostLikedToggle.prop('checked',false);}},200);});(function setCachedValues(){var savedSetting=self.advancedDownloadAllSettings.get()||{};if(savedSetting.percent&&savedSetting.percent<100){$percentToggle.prop('checked',true);$percentCount.enableInput();$percentCount.val(savedSetting.percent);$mostLikedToggle.enableInput();if(savedSetting.most_liked){$mostLikedToggle.prop('checked',true);}
if(savedSetting.mediaType=='video'){$mostViewedToggle.enableInput();if(savedSetting.most_viewed){$mostViewedToggle.prop('checked',true);}}}
if(savedSetting.mediaType=='photo'){$onlyPhotoToggle.prop('checked',true);}
else if(savedSetting.mediaType=='video'){$onlyVideoToggle.prop('checked',true);}
if(savedSetting.previousDays){$byLastDaysToggle.prop('checked',true);$lastDaysCount.enableInput();$lastDaysCount.val(savedSetting.previousDays);}})();linksWrapper.appendChild(btnWrap);popupLoader.style.display='none';allPopup.style.display='block';},downloadAllByAdvanced:function(){var $form=$('.imdr_advanced_form');var advancedOptions={};var $percentToggle=$('[name="percent_toggler"]',$form),$onlyPhotoToggle=$('[name="only_photo"]',$form),$onlyVideoToggle=$('[name="only_video"]',$form),$byLastDaysToggle=$('[name="for_previous_days"]',$form);var previousDays,todayTimestamp;if($byLastDaysToggle.prop('checked')){previousDays=parseInt($('[name="last_days_count"]',$form).val());var now=new Date();todayTimestamp=new Date(now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()).getTime();advancedOptions.timeFrom=Math.floor((todayTimestamp-previousDays*86400000)/ 1000);advancedOptions.previousDays=previousDays;}
advancedOptions.mediaType=$onlyPhotoToggle.prop('checked')?'photo':$onlyVideoToggle.prop('checked')?'video':'all';if($percentToggle.prop('checked')){advancedOptions.percent=parseInt($('[name="percent_count"]',$form).val());advancedOptions.most_liked=$('[name="most_liked"]',$form).prop('checked');if($onlyVideoToggle.prop('checked')){advancedOptions.most_viewed=$('[name="most_viewed"]',$form).prop('checked');}}
DownloadZipModule.advancedDownloadAllSettings.set(advancedOptions);DownloadZipModule.processIsActive=true;DownloadZipModule.downloadFromUserPage({advanced:advancedOptions},function(shortCodes,progressBarStart,userName){if(!shortCodes.length){DownloadZipModule.processIsActive=false;App.getModalBox().showErrorBox(UtilsModule.getLang('advanced_download_all_not_match'));}
else{DownloadZipModule.downloadByShortCodes({short_codes:shortCodes,progress_bar_start:progressBarStart,filename_prefix:userName,advanced_opts:advancedOptions});}});$('.ext_dl_all_popup').parent().remove();},advancedDownloadAllSettings:{storageKey:'advanced_download_all_settings',set:function(data){localStorage[this.storageKey]=JSON.stringify({percent:data.percent||null,most_liked:data.most_liked||null,most_viewed:data.most_viewed||null,mediaType:data.mediaType||null,previousDays:data.previousDays||null,})},get:function(){return localStorage[this.storageKey]&&JSON.parse(localStorage[this.storageKey]);}},onClickDownloadAllBtn:function(){DownloadZipModule.zipCanceledByUser=false;if(DownloadZipModule.isAdvancedSettings){return DownloadZipModule.downloadAllByAdvanced();}
var count,userName,typeDownload;if(DownloadZipModule.pageType==DownloadZipModule.PAGE_TYPE_USERPAGE){var start=$('#ext_dl_all_start').val();var end=$('#ext_dl_all_end').val();count=end-start;typeDownload=2;}
else{start=$('#ext_dl_all_start').val();end=$('#ext_dl_all_end').val();count=end-start;typeDownload=1;}
if(isNaN(start)){start=1}
if(isNaN(end)){end=1}
var downloadProcessFunc=function(){if(typeDownload===1){var shortCodes=App.getFoundShortCodes(start,end);DownloadZipModule.downloadByShortCodes({short_codes:shortCodes,progress_bar_start:null,filename_prefix:userName});}
else if(typeDownload===2){var fromTagged=App.getUserPageSection()=='tagged';var fromSaved=App.getUserPageSection()=='saved';var opts={start:start,end:end,form_saved:fromSaved,form_tagged:fromTagged,};DownloadZipModule.downloadFromUserPage(opts,function(shortCodes,progressBarStart,userName){var filenamePrefix=userName+(fromSaved?'_saved':(fromTagged?'_tagged':''));DownloadZipModule.downloadByShortCodes({short_codes:shortCodes,progress_bar_start:progressBarStart,filename_prefix:filenamePrefix,form_saved:fromSaved,form_tagged:fromTagged,});});}
else{return;}
DownloadZipModule.processIsActive=true;};if(count>500){globalUtils.sendMessage('warningRequest',function(res){if(res){App.getModalBox().showDownloadAllWarning({continueCallback:function(){downloadProcessFunc();}});}else{downloadProcessFunc();}})}
else{downloadProcessFunc();}
$('.ext_dl_all_popup').parent().remove();},checkPossibilityVirtualScrollPage:function(opts,callback){var userName=globalUtils.getUserNameFromWindowLocation();if(!userName){var userTitleWrap=document.querySelector('main header section h2');userName=userTitleWrap&&userTitleWrap.innerText;}
if(!userName){return callback({error:1});}
opts.userName=userName;globalUtils.getPostsDataFromUserGraphql(opts,function(res){if(!res||res.error||typeof res.userId=='undefined'){return callback({error:1});}
if(!opts.fromTagged&&(typeof res.end_cursor=='undefined'||typeof res.has_next_page=='undefined'||typeof res.count=='undefined'||typeof res.shortcodes=='undefined')){return callback({error:1});}
var count=res.count;var endCursor=res.end_cursor;var userId=res.userId;DownloadZipModule.currentPageUserId=userId;if(res.has_next_page===false){return callback({success:1,count:count});}
globalUtils.getPostsDataFromUserGraphqlOther({end_cursor:endCursor,user_name:userName,user_id:userId,touch:true,from_saved:opts.fromSaved,from_tagged:opts.fromTagged,first:12,},function(res){if(!res||res.error||typeof res.end_cursor=='undefined'||typeof res.has_next_page=='undefined'||typeof!res.shortcodes=='undefined'){return callback({error:1});}
if(opts.fromTagged){count=res.has_next_page===false?res.count:'unknown';}
return callback({success:1,count:count});});});},downloadFromUserPage:function(options,callback){if(typeof callback!='function'){return;}
var shortCodes=[];var endCursor=null;var userId=null;var hasNextPage=true;var timeEnd=false;var self=this;var fromSaved=options.form_saved;var fromTagged=options.form_tagged;var start=options.start,end=options.end;var allCount=end;if(fromTagged){var progressBarInfo={from_tagged:true,counter_text:shortCodes.length,};}
else{if(!allCount&&options.advanced){if(options.advanced.previousDays){allCount=options.advanced.previousDays*2;}
allCount=500;}
var progressBarGravity=0.6;var oneValuePercent=(100 / allCount)*progressBarGravity;progressBarInfo={from_tagged:fromTagged,allCount:allCount,maxValue:progressBarGravity*100,oneValuePercent:oneValuePercent,};}
var modalBox=App.getModalBox();modalBox.showPrepareDownloadProcess({from_tagged:fromTagged,},{cancelCallback:function(){self.zipCanceledByUser=true;DownloadZipModule.processIsActive=false;}});var userName=globalUtils.getUserNameFromWindowLocation();if(!userName){var userTitleWrap=document.querySelector('main header section h2');userName=userTitleWrap&&userTitleWrap.innerText;}
if(!userName){DownloadZipModule.processIsActive=false;return modalBox.showErrorBox(UtilsModule.getLang('errorZip'));}
userId=DownloadZipModule.currentPageUserId;var scrolledPagesCount=0;globalUtils.firstParamRequestJSONgraphqlQuery=48;var firstRequestDone=false;function scrollPage(){if(self.zipCanceledByUser){return;}
if((!fromTagged&&end&&shortCodes.length>=end)||!hasNextPage||(timeEnd&&!fromTagged)){if(!fromTagged&&start&&end){shortCodes=shortCodes.slice(start-1,end);}
var progressBarStart=progressBarGravity*100;return callback(shortCodes,progressBarStart,userName);}
if((!fromTagged&&(firstRequestDone&&!endCursor))||!userId){DownloadZipModule.processIsActive=false;return modalBox.showErrorBox(UtilsModule.getLang('errorZip'));}
var needBackUsualModalBoxFooter=false;var waitTimeout=setTimeout(function(){progressBarInfo.no_progress=true;progressBarInfo.dont_panic=true;needBackUsualModalBoxFooter=true;modalBox.updatePrepareDownloadProcess(progressBarInfo);},20000);globalUtils.getPostsDataFromUserGraphqlOther({end_cursor:endCursor,user_name:userName,user_id:userId,from_saved:fromSaved,from_tagged:fromTagged,downloadZipObj:DownloadZipModule,advanced:options.advanced},function(res){firstRequestDone=true;if(DownloadZipModule.zipCanceledByUser){return;}
clearTimeout(waitTimeout);if(!res||res.error){DownloadZipModule.processIsActive=false;return modalBox.showErrorBox(UtilsModule.getLang('errorZip'));}
if(needBackUsualModalBoxFooter){progressBarInfo.no_progress=false;progressBarInfo.dont_panic=false;needBackUsualModalBoxFooter=false;}
endCursor=res.end_cursor;hasNextPage=res.has_next_page;timeEnd=res.time_end;shortCodes=shortCodes.concat(res.shortcodes);if(fromTagged){progressBarInfo={from_tagged:true,counter_text:shortCodes.length,};}
else{progressBarInfo.oneValuePercent=oneValuePercent*(res.shortcodes.length||1);}
modalBox.updatePrepareDownloadProcess(progressBarInfo);scrolledPagesCount++;if(scrolledPagesCount<50){var timeout=500+1000;}
else if(scrolledPagesCount<100){timeout=1000+1000;}
else if(scrolledPagesCount<200){timeout=2000+1000;}
else{timeout=3000+1000;}
setTimeout(function(){scrollPage();},timeout);});}
scrollPage();},downloadByShortCodes:function(opts){var shortCodes=opts.short_codes,progressBarStart=opts.progress_bar_start,advancedOptions=opts.advanced_opts;DownloadZipModule.prepareLinksByShortCodes(shortCodes,progressBarStart,advancedOptions,function(links){if(links&&links.length){DownloadZipModule.downloadZIP({files:links,filename_prefix:opts.filename_prefix,});}
else if(DownloadZipModule.zipCanceledByUser){}
else{DownloadZipModule.processIsActive=false;var modalBox=App.getModalBox();if(links&&links.error&&links.error=='not_match'){var errorText=UtilsModule.getLang('advanced_download_all_not_match')}
else{errorText=UtilsModule.getLang('errorZip')}
modalBox.showErrorBox(errorText);}})},prepareLinksByShortCodes:function(shortCodes,progressBarStart,advancedOptions,callback){if(typeof callback!='function'){return;}
if(!Array.isArray(shortCodes)||!shortCodes.length){return callback();}
progressBarStart=progressBarStart||0;var progressBarGravity=(100-progressBarStart)/ 100;var allCount=shortCodes.length;var self=this;var links=[];var modalBox=App.getModalBox();var _429=false;var _429TooLong=false;var progressBarInfo={allCount:allCount,oneValuePercent:(100 / allCount)*progressBarGravity,};modalBox.showPrepareDownloadProcess({bar_start:progressBarStart,},{cancelCallback:function(){self.zipCanceledByUser=true;DownloadZipModule.processIsActive=false;}});process(shortCodes);function requestMediaData(resolve,reject,rejectedShortCodes,shortCode,tryNoInternal){if(self.zipCanceledByUser){return reject();}
if(typeof shortCode=='object'){if(shortCode.url){links.push(shortCode);modalBox.updatePrepareDownloadProcess(progressBarInfo);resolve(shortCode);return;}
else{shortCode=shortCode.shortcode;}}
if(_429TooLong){return;}
if(_429&&!tryNoInternal){setTimeout(function(){requestMediaData(resolve,reject,rejectedShortCodes,shortCode);},20*1000);return;}
globalUtils.getAllMediaDataFromJsonGraphql({shortCode:shortCode},function(res){if(res&&res.error&&res.reason==429){if(!_429){_429=true;tryNoInternal=1;progressBarInfo.no_progress=true;progressBarInfo.dont_panic=true;modalBox.updatePrepareDownloadProcess(progressBarInfo);setTimeout(function(){requestMediaData(resolve,reject,rejectedShortCodes,shortCode,tryNoInternal);},20*1000);return;}
else{if(tryNoInternal){if(++tryNoInternal<2){setTimeout(function(){requestMediaData(resolve,reject,rejectedShortCodes,shortCode,tryNoInternal);},tryNoInternal*20*1000);return;}
else{_429TooLong=true;reject();process(rejectedShortCodes);return;}}
else{setTimeout(function(){requestMediaData(resolve,reject,rejectedShortCodes,shortCode);},10*1000);return;}}}
if(!res||res.error||!res.length){rejectedShortCodes.push(shortCode);resolve(shortCode);return;}
if(_429){_429=false;progressBarInfo.no_progress=false;progressBarInfo.dont_panic=false;}
res.forEach(function(item){if(item.product_type=="igtv"){return;}
links.push(item);});modalBox.updatePrepareDownloadProcess(progressBarInfo);resolve(shortCode);});}
function filterLinksByAdvancedOptions(links){if(!advancedOptions){return links;}
var filteredLinks=[];if(advancedOptions.mediaType!=='all'){links.forEach(function(link){if(advancedOptions.mediaType==link.type){filteredLinks.push(link);}});if(!filteredLinks||!filteredLinks.length){return({error:'not_match'})}}
else{filteredLinks=links;}
if(advancedOptions.percent&&advancedOptions.percent<100){if(advancedOptions.most_liked){UtilsModule.objectSortByProp(filteredLinks,'likes_count',true);}
else if(advancedOptions.mediaType=='video'&&advancedOptions.most_viewed){UtilsModule.objectSortByProp(filteredLinks,'video_view_count',true);}
else{filteredLinks=UtilsModule.shuffle(filteredLinks);}
var needLength=Math.ceil(filteredLinks.length*advancedOptions.percent / 100);filteredLinks=filteredLinks.splice(0,needLength);}
return filteredLinks;}
function process(localShortCodes,tryNo){tryNo=tryNo||0;tryNo++;var maxAttempts=3;if(tryNo>maxAttempts){var addedFromCacheCount=0;localShortCodes.forEach(function(shortCode){if(typeof shortCode=='object'){shortCode=shortCode.shortcode;}
var link=App.getCachedLinkByShortCode(shortCode);if(link){links.push(link);addedFromCacheCount++;}});if((localShortCodes.length-addedFromCacheCount)>5&&localShortCodes.length>((allCount / 10)+addedFromCacheCount)){return callback({error:1});}
else{callback(filterLinksByAdvancedOptions(links));}
return;}
else if(_429TooLong){if((allCount*0.9)>links.length){return callback({error:1});}
else{callback(filterLinksByAdvancedOptions(links));}
return;}
var rejectedShortCodes=[];UtilsModule.customPromiseAll({data:localShortCodes,asyncCount:12 / tryNo,},function(shortCode,resolve,reject){requestMediaData(resolve,reject,rejectedShortCodes,shortCode);}).thenOne(function success(result){if(self.zipCanceledByUser){return callback();}
if(rejectedShortCodes.length){setTimeout(function(){process(rejectedShortCodes,tryNo);},tryNo*3000);}
else{callback(filterLinksByAdvancedOptions(links));}},function reject(result){return callback();});}},downloadZIP:function(opts,callback){var files=opts.files,prefixName=opts.filename_prefix,isStory=opts.is_story;var self=this;var zip=new JSZip();prefixName=prefixName||'Instagram';var modalBox=App.getModalBox();var prepareFinished=false;var xhrsStatus={aborted:false,};var rejectedLinks=[null,[],[],[]];var allCount=files.length;var progressBarInfo={allCount:allCount,successCount:0,retrySuccessCount:0,oneValuePercent:100 / allCount,lastSuccess:false,};var timeoutDefault=60000;var timeoutRetry=300000;var modalBoxCallbacks={enoughCallback:enoughCallback,};if(!isStory){modalBoxCallbacks.cancelCallback=function(){self.zipCanceledByUser=true;xhrsStatus.aborted=true;DownloadZipModule.processIsActive=false;};}
else{modalBoxCallbacks.cancelCallback=function(){self.zipCanceledByUser=true;xhrsStatus.aborted=true;};}
modalBox.showDownloadProcess({files_count:allCount,},modalBoxCallbacks);function enoughCallback(){if(prepareFinished)return;self.zipCanceledByUser=true;xhrsStatus.aborted=true;zipFiles();}
function nextAttempt(attemptNo){if(self.zipCanceledByUser){xhrsStatus.aborted=true;return;}
if(typeof rejectedLinks[attemptNo]=='undefined'){zipFiles();}
else if(rejectedLinks[attemptNo].length==0&&rejectedLinks[attemptNo+1]&&rejectedLinks[attemptNo+1].length){setTimeout(function(){nextAttempt(attemptNo+1);},(attemptNo+1)*1000);}
else if(rejectedLinks[attemptNo].length==0&&(!rejectedLinks[attemptNo+1]||!rejectedLinks[attemptNo+1].length)){zipFiles();}
else if
(rejectedLinks[attemptNo].length){var file=rejectedLinks[attemptNo].shift();JSZipUtils.getBinaryContent(file.url,function(err,data){if(err){if(!(err.code===404||err.code===410)){if(rejectedLinks[attemptNo+1]){rejectedLinks[attemptNo+1].push(file);}}}else{progressBarInfo.successCount++;progressBarInfo.lastSuccess=true;modalBox.updateDownloadZipProgressBar(progressBarInfo);zip.file(file.filename,data,{binary:true});}
setTimeout(function(){nextAttempt(attemptNo);},(attemptNo)*1000);},xhrsStatus,timeoutRetry);}
else{zipFiles();}}
function zipFiles(){prepareFinished=true;DownloadZipModule.zipCanceledByUser2=false;if(!isStory){DownloadZipModule.processIsActive=false;}
if(progressBarInfo.successCount>100){modalBox.showZippingLoader({cancelCallback:function(){self.zipCanceledByUser2=true;DownloadZipModule.processIsActive=false;}});}
zip.generateAsync({type:"blob"},function(meta){if(meta.percent&&Math.random()>0.99&&progressBarInfo.successCount>100){modalBox.updateZippingLoader(parseInt(meta.percent));}}).then(function(content){if(self.zipCanceledByUser2)return;var date=new Date();var zipFileName=prefixName+'_'
+date.getFullYear()
+'_'+(date.getMonth()+1)
+'_'+date.getDate()
+'_'+date.getHours()
+'_'+date.getMinutes()
+'_'+date.getSeconds()
+'.zip';saveAs(content,zipFileName);modalBox.close();if(typeof callback=='function'){callback({success:1});}
globalUtils.sendMessage({action:'downloadZip',});},function(err){DownloadZipModule.processIsActive=false;return modalBox.showErrorBox(UtilsModule.getLang('errorZipMemoryLimit'));});}
UtilsModule.customPromiseAll({data:files,asyncCount:12,},function(file,resolve,reject){if(self.zipCanceledByUser){xhrsStatus.aborted=true;return reject();}
JSZipUtils.getBinaryContent(file.url,function(err,data){if(err){if(!(err.code===404||err.code===410)){rejectedLinks[1].push(file);}
resolve(file.filename);}else{progressBarInfo.successCount++;progressBarInfo.lastSuccess=true;modalBox.updateDownloadZipProgressBar(progressBarInfo);zip.file(file.filename,data,{binary:true});resolve(file.filename);}},xhrsStatus,timeoutDefault);}).thenOne(function(result){if(self.zipCanceledByUser){return;}
if(rejectedLinks[1].length){progressBarInfo.lastSuccess=false;modalBox.updateDownloadZipProgressBar(progressBarInfo);setTimeout(function(){nextAttempt(1);},1000);}else{zipFiles();}},function(result){if(!isStory){DownloadZipModule.processIsActive=false;}
if(!self.zipCanceledByUser){modalBox.showErrorBox(UtilsModule.getLang('errorZip'));if(typeof callback=='function'){callback({error:1});}}});},}})();var UtilsModule=(function(){return{objectSortByProp:function(ObjectsArray,prop,desc){function compare(a,b){var aProp=parseInt(a[prop]);var bProp=parseInt(b[prop]);if(desc){if(aProp<bProp)
return 1;if(aProp>bProp)
return-1;return 0;}
if(aProp>bProp)
return 1;if(aProp<bProp)
return-1;return 0;}
ObjectsArray.sort(compare);},shuffle:function(a){var j,x,i;for(i=a.length-1;i>0;i--){j=Math.floor(Math.random()*(i+1));x=a[i];a[i]=a[j];a[j]=x;}
return a;},customPromiseAll:function(options,func){var PROMISE_PENDING=0;var PROMISE_RESOLVED=1;var PROMISE_REJECTED=2;var args=options.data,timeout=options.timeout||600000,asyncTasksCount=options.asyncCount||48;var rejected=false;var self=this;var res=[];var argsCount,resultsCount,statusIntervalId,promiseState,nextTask;var resolveFunc=function(){if(typeof nextTask.resolve!=='function'){return;}
args=res;setTimeout(function(){try{nextTask.resolve(args);}catch(e){console.error(e)
res=e;rejectFunc();}},0);};var rejectFunc=function(){if(rejected){return;}
rejected=true;if(typeof nextTask.reject!=='function'){return;}
func=nextTask.reject;func(res);};var execAll=function(){resultsCount=0;argsCount=args.length;var asyncTasksInProcess=0;var resolveInnerCallback=function(index){return function(result){if(!Array.isArray(res)||promiseState==PROMISE_REJECTED){return;}
asyncTasksInProcess--;resultsCount++;res[index]=result;if(resultsCount===argsCount){promiseState=PROMISE_RESOLVED;}};};var rejectInnerCallback=function(result){promiseState=PROMISE_REJECTED;res=result;};promiseState=PROMISE_PENDING;checkerFunc();var foreachInterval=setInterval(function(){if(!args.length||promiseState!=PROMISE_PENDING){clearInterval(foreachInterval);return;}
var freeTasksSlots=asyncTasksCount-asyncTasksInProcess;if(freeTasksSlots<1){return;}
args.splice(0,freeTasksSlots).forEach(function(arg,index){setTimeout(function(){try{asyncTasksInProcess++;func(arg,resolveInnerCallback(index),rejectInnerCallback);}catch(e){console.error(e)
res=e;promiseState=PROMISE_REJECTED;}},0);});},500);};function checkerFunc(){if(statusIntervalId){return;}
statusIntervalId=setInterval(function(){if(promiseState===PROMISE_PENDING){return;}
clearInterval(statusIntervalId);statusIntervalId=undefined;if(promiseState===PROMISE_RESOLVED){resolveFunc();}else{rejectFunc();}},10);}
this.thenOne=function(resolve,reject){nextTask={resolve:resolve,reject:reject};checkerFunc();return self;};execAll();return this;},isMainPage:function(){return window.location.pathname=='/'&&window.location.host.replace(/^w{3}\./,'')=='instagram.com'&&document.querySelector('input[type="password"]')==null;},getHostName:function(){return window.location.host.toLowerCase().replace(/^www\./,"").replace(/:.*$/,"");},isNativeStories:function(){return new RegExp('instagram\\.com\\/stories\\/[^/]+').test(window.location.href);},isLoginPage:function(){return document.querySelector('input[type="password"]')!=null;},isAccountSettingPage:function(){return(window.location.pathname.indexOf('instagram.com/emails/')>-1||window.location.pathname.indexOf('instagram.com/accounts/')>-1);},isMultiplePost:function(container){return(container.querySelector('.coreSpriteRightChevron')!=null||container.querySelector('.coreSpriteLeftChevron')!=null||container.querySelector('.coreSpriteSidecarIconLarge')!=null||container.querySelector('a.MpBh3[role="button"]')!=null||container.querySelector('a.SWk3c[role="button"]')!=null||container.querySelector('span.Z4Ol1.Szr5J.o0qq2')!=null||container.querySelector('.mediatypesSpriteCarousel__filled__32')!=null);},isSavedMedia:function(){return window.location.pathname.indexOf('/saved/')!==-1;},isWindows:function(){return window.navigator.userAgent.toLowerCase().indexOf('windows')>-1;},isUsualDesktopInstagram:function(){if((document.querySelector('.coreSpriteMobileNavSearchInactive')||document.querySelector('.coreSpriteMobileNavSearchActive'))&&((document.querySelector('.coreSpriteFeedCreation')||document.querySelector('.coreSpriteMobileNavSearchActive')))){return false;}
return true;},isFrame:function(){return window.top!=window.self;},getLang:function(key){return chrome.i18n.getMessage(key)||'';},secondsToMinutes:function(sec){var minutes=Math.floor(parseInt(sec)/60).toString();var seconds=Math.floor(parseInt(sec)%60).toString();if(minutes.length===1)minutes='0'+minutes;if(seconds.length===1)seconds='0'+seconds;return minutes+':'+seconds;},getTopNavButtonsContainer:function(){var candidate=document.querySelector('section > main + nav > div > div > div > div:last-child div');if(candidate&&((candidate.querySelector('a[href*="/direct/inbox/"]')&&candidate.querySelector('a[href*="/explore/"]')&&candidate.querySelector('a[href*="/accounts/activity/"]'))||candidate.querySelector('a[href*="/accounts/login/"]'))){return candidate;}
var candidates=[];document.querySelectorAll('section > main + nav > div > div div').forEach(function(div){if(div.children.length>=5){candidates.push(div);}
if(candidates.length==1){return candidates[0];}});},}})();var UploadModule=(function(){function readURL(input,callback){if(input.files&&input.files[0]){var reader=new FileReader();reader.onload=callback;reader.readAsDataURL(input.files[0]);}}
function canInsert(containerBtn){if(!containerBtn){return false;}
if(containerBtn.querySelector('.ext_upload_icon')){return false;}
var containerPreview=document.querySelector('section main section');return!!(containerPreview&&containerPreview.querySelector('a[href="/accounts/edit/"]'));}
return{stepNow:null,delButtonTemplate:null,delBtnClassName:'ext_del_btn',uploadType:undefined,uploadId:undefined,size:null,confirmedUsertags:[],uploadStateInit:function(container){if(!canInsert(container)){return;}
this.uploadBtn.create(container);this.form.create();this.addModuleListeners();},stateReset:function(){this.uploadType=undefined;this.uploadId=undefined;this.stepNow=null;this.size=null;this.removeModuleListeners();this.form.reset();this.uploadPreviewBlock.destroySelf();this.uploadBtn.enable();this.uploadPreviewBlock.tagPeople.usertags=[];this.uploadPreviewBlock.tagPeople.listenersAdded=false;this.uploadPreviewBlock.tagPeople.usersList.suggestedUsers=null;this.confirmedUsertags=[];},addModuleListeners:function(){$('.next').on('click',this.uploadPreviewBlock.onNextClick);$('.cancel').on('click',this.uploadPreviewBlock.onCancelBtnClick);$('.expand_btn').on('click',this.uploadPreviewBlock.resizeImage);$('.rotate_btn').on('click',this.uploadPreviewBlock.rotateImage);$('.tag_people_btn').on('click',this.uploadPreviewBlock.tagPeople.init);},removeModuleListeners:function(){$('.next').off('click',this.uploadPreviewBlock.onNextClick);$('.cancel').off('click',this.uploadPreviewBlock.onCancelBtnClick);$('.expand_btn').off('click',this.uploadPreviewBlock.resizeImage);$('.rotate_btn').off('click',this.uploadPreviewBlock.rotateImage);$('.tag_people_btn').off('click',this.uploadPreviewBlock.tagPeople.init);},uploadBtn:{arrowEl:null,disabled:false,create:function(container){if(!container){return;}
var self=this;var el=document.createElement('div');el.className='upload_btn_wrap';el.innerHTML='<button class="ext_upload_icon"></button>';container.appendChild(el);tippy('.ext_upload_icon',{content:chrome.i18n.getMessage('upload_file')});self.enable();},uploadBtnOnClick:function(){var self=this;if(this.disabled){return;}
if(self.arrowEl){self.arrowEl.style.display='none';}
var modalBox=App.getModalBox();modalBox.showUploadChoice({toProfileCallback:function(){UploadModule.uploadType='profile';UploadModule.form.inputDispatchClick();},toStoriesCallback:function(){UploadModule.uploadType='story';UploadModule.form.inputDispatchClick();}});},enable:function(){$('.ext_upload_icon').removeClass('disabled');this.disabled=false;},disable:function(){$('.ext_upload_icon').addClass('disabled');this.disabled=true;},},form:{formEl:null,inputEl:null,create:function(){var form=document.createElement('form'),input=document.createElement('input');form.id='ext_upload_form';form.setAttribute('enctype','multipart/form-data');input.id='ext_upload_input';input.setAttribute('type','file');input.setAttribute('name','photo');input.setAttribute('accept','image/jpeg');form.appendChild(input);document.querySelector('body').appendChild(form);input.addEventListener('change',this.onInputChange);this.formEl=form;this.inputEl=input;},reset:function(){if(this.formEl){this.formEl.reset();}},inputDispatchClick:function(){if(this.inputEl){this.inputEl&&this.inputEl.click();}},onInputChange:function(){readURL(this,function(e){var src=e.target.result;UploadModule.uploadPreviewBlock.create(src);});}},uploadRequest:{factory:function(type,data,callback){var self=this;if(type=='photo'){self.sendPhoto(data,function(res){if(res.error){self.handleBadResponse(res);UploadModule.stateReset();}
else{UploadModule.uploadId=res.upload_id;if(UploadModule.uploadType=='profile'){if(typeof callback=='function'){callback();}}
else{self.configurePhoto({caption:'',uploadId:UploadModule.uploadId,uploadType:UploadModule.uploadType,},function(res){if(!res.error){var modalBox=App.getModalBox();modalBox.showUploadedStorySuccessText({successUploadedStoryCallback:function(){window.location=window.location.origin+window.location.pathname;}});UploadModule.stateReset();}
else{self.handleBadResponse(res);UploadModule.stateReset();}});}}});}
else if(type=='caption'){self.configurePhoto({caption:data,uploadId:UploadModule.uploadId,uploadType:UploadModule.uploadType,usertags:UploadModule.confirmedUsertags,},function(res){if(!res.error){window.location=window.location.origin+window.location.pathname;}
else{self.handleBadResponse(res);UploadModule.stateReset();}});}},sendPhoto:function(blob,callback){globalUtils.sendMessage('getCookies',function(instagramCookies){if(!instagramCookies){return;}
var width=(UploadModule.size&&UploadModule.size.width)||1080;var height=(UploadModule.size&&UploadModule.size.height)||1080;var now=new Date().getTime();var url='https://www.instagram.com/rupload_igphoto/fb_uploader_'+now;var xhr=new XMLHttpRequest();xhr.open('POST',url,true);xhr.setRequestHeader('x-csrftoken',instagramCookies.csrftoken);xhr.setRequestHeader('x-entity-length',blob.size);xhr.setRequestHeader('x-entity-name','fb_uploader_'+now);xhr.setRequestHeader('x-ig-app-id','1217981644879628');xhr.setRequestHeader('x-instagram-rupload-params',JSON.stringify({media_type:1,upload_id:now,upload_media_height:height,upload_media_width:width}));xhr.setRequestHeader('offset',0);xhr.onload=function(){try{var res=JSON.parse(this.responseText);}catch(e){console.error(e)
return callback({error:1,status:200});}
callback(res);};xhr.send(blob);});},configurePhoto:function(opts,callback){var caption=opts.caption;var uploadId=opts.uploadId;var uploadType=opts.uploadType;var userTags=opts.usertags;globalUtils.sendMessage('getCookies',function(cookies){if(!cookies||!cookies.sessionid){return callback({error:1});}
var data={upload_id:uploadId,caption:caption,};if(userTags){data.usertags=JSON.stringify({in:userTags});}
var url='https://www.instagram.com/create/'+(uploadType=='profile'?'configure/':'configure_to_story/');$.ajax({url:url,method:'POST',data:data,headers:{'x-csrftoken':cookies.csrftoken,'x-ig-app-id':'1217981644879628',},}).done(function(res){if(!res||typeof res!='object'||res.status!='ok'){callback({error:1,res:res,status:200});return;}
callback({success:1});}).fail(function(res){callback({error:1,res:res.responseJSON,status:res.status});});});},handleBadResponse:function(res){var errorUploadFileText=UtilsModule.getLang('upload_error');var possibleReasonsText=UtilsModule.getLang('error403_possible_reasons');var reason1Text=UtilsModule.getLang('error403_reason_1');var reason2Text=UtilsModule.getLang('error403_reason_2');var errorNetworkText=UtilsModule.getLang('error_network');var checkNetworkText=UtilsModule.getLang('check_network');var xzReasonText=UtilsModule.getLang('error_reason_xz');var errorText;if(res.status=='403'){errorText='<h3 style="margin-bottom:15px;font-weight:600;">'+errorUploadFileText+'</h3>'+'<p style="margin-bottom:10px;">'+possibleReasonsText+':</p>'+'<ol style="text-align: justify; list-style: decimal;padding: 10px;margin-left: 10px;font-size: 0.8em;">'+'<li style="margin-bottom:15px">'+reason1Text+'</li>'+'<li style="margin-bottom:15px">'+reason2Text+'</li>'+'</ol>';}
else if(res.status=='0'&&typeof res.res=='undefined'){errorText='<h3 style="margin-bottom: 15px;font-weight: 600;">'+errorNetworkText+'</h3>'+'<p>'+checkNetworkText+'</p>';}
else{errorText='<h3 style="margin-bottom: 15px;font-weight: 600;">'+errorUploadFileText+'</h3>'+'<p>'+xzReasonText+'</p>';}
var modalBox=App.getModalBox();modalBox.showErrorBox(errorText);}},uploadPreviewBlock:{btnNextLastClickTime:0,lockNextBtn:false,croppieObj:null,imgSrc:null,width:null,height:null,currentTransformation:null,currentSize:{},currentRotate:0,container:null,create:function(src){try{UploadModule.stepNow=1;var self=this;var container=document.querySelector('section > main > div');if(!container)return;var uploadType=UploadModule.uploadType;var el=document.createElement('div');el.className='upload_preview_wrap';self.container=el;var textAreaPlaceholder=UtilsModule.getLang('write_caption');var nextText=UtilsModule.getLang('next');var newPostText=UtilsModule.getLang('new_post');var newStoryText=UtilsModule.getLang('new_story');var cancelText=UtilsModule.getLang('btn_cancel');var htmlProfileTemplate=`<div class="upload_preview_header">
        <button class="cancel">
         <span class="cancel_icon"></span>
         <span class="cancel_text">${cancelText}</span>
        </button>
        <span class="text">${newPostText}</span>
        <button class="next">
         <span class="next_text">${nextText}</span>
         <span class="next_icon"></span>
        </button>
       </div>
       <div class="upload_content">
        <textarea id="ext_post_textarea" maxlength="2000" placeholder="${textAreaPlaceholder}"></textarea>
        <div class="tag_people_btn_wrap">
         <button class="tag_people_btn">
          <span class="tag_people_btn_text"></span>
          <span class="tag_people_btn_icon"></span>
         </button>
        </div>
        <div class="tag_people_header">
         <button class="ext_tag_people_close"><span class="coreSpriteClose"></span></button>
          <span class="tag_people_header_text"></span>
         <button class="tag_people_confirm_btn"></button>
        </div>
        <div class="tag_people_msg">
         <div></div>
        </div>
        <div class="upload_preview_img">
         <div class="rotate_btn"></div>
         <div class="expand_btn"></div>
        </div>
        <div class="uploaded_image_preview"></div>
        
        <img id="img_hidden">
       </div>`;var htmlStoryTemplate=`<div class="upload_preview_header">
        <button class="cancel">
         <span class="cancel_text">${cancelText}</span>
         <span class="cancel_icon"></span>
        </button>
        <span class="text">${newStoryText}</span>
        <button class="next imdr_upload_share">
         <span class="next_text">${UtilsModule.getLang('share_btn')}</span>
         <span class="next_icon"></span>
        </button>
       </div>
       <div class="upload_content">
        <div class="upload_preview_img">
         <div class="rotate_btn"></div>
        </div>
        <div class="uploaded_image_preview"></div>
        <img id="img_hidden">
       </div>`;el.innerHTML=uploadType=='profile'?htmlProfileTemplate:htmlStoryTemplate;var afterHeaderPageEl=container.querySelector('header + div');if(!afterHeaderPageEl){afterHeaderPageEl=container.querySelector('header + article');}
if(afterHeaderPageEl){container.insertBefore(el,afterHeaderPageEl);}else{var containerChildren=[];container.children.forEach(function(child){containerChildren.push(child.tagName+'_'+child.className);});container.appendChild(el);}
var imgDiv=el.querySelector('.upload_preview_img');var imgHidden=el.querySelector('#img_hidden');var btnExpand=document.querySelector('.expand_btn');self.imgDiv=imgDiv;this.imgSrc=src;imgHidden.onload=function(){imgDiv.style.display='block';self.width=imgHidden.naturalWidth;self.height=imgHidden.naturalHeight;if(uploadType=='profile'){if(self.width!=self.height){btnExpand.style.display='block';}
else{btnExpand.style.display='none';}
self.squareTransformation();}
else{self.rectangleStoryTransformation();}
el.style.display='flex';};imgHidden.src=src;UploadModule.addModuleListeners();}catch(e){console.error(e)
globalUtils.trackCodeError(e,'uploadPreviewBlock_create');}},onCancelBtnClick:function(){if(UploadModule.stepNow==1){UploadModule.stateReset();}
else if(UploadModule.stepNow==2){UploadModule.stepNow=1;this.classList.remove('imdr_upload_back');this.querySelector('.cancel_text').innerText=UtilsModule.getLang('btn_cancel');var uploadedImgDiv=document.querySelector('.uploaded_image_preview');var imgDiv=document.querySelector('.upload_preview_img');var btnNext=document.querySelector('button.next');$('#ext_post_textarea').hide();$('.tag_people_btn_wrap').hide();btnNext.classList.remove('imdr_upload_share');btnNext.querySelector('.next_text').innerText=UtilsModule.getLang('next');uploadedImgDiv.style.backgroundImage='';uploadedImgDiv.style.display='none';imgDiv.style.display='flex';}},destroySelf:function(){this.lockNextBtn=false;var el=document.querySelector('.upload_preview_wrap');if(el){el.remove();}},createCroppieObj:function(viewport,points,needInitRotate){var imgDiv=document.querySelector('.upload_preview_img');var self=this;self.croppieObj=new Croppie(imgDiv,{viewport:viewport,boundary:{width:400,height:400},enableZoom:true,enableOrientation:true,showZoomer:false,update:function(obj){self.currentSize.width=obj.points[2]-obj.points[0];self.currentSize.height=obj.points[3]-obj.points[1];},});var bindObj={url:self.imgSrc,points:points,};if(needInitRotate){bindObj.orientation=6;}
self.croppieObj.bind(bindObj);},destroyCroppieObj:function(){if(this.croppieObj){this.croppieObj.destroy();this.croppieObj=null;}},squareTransformation:function(){try{var self=this;this.destroyCroppieObj();var width=self.width,height=self.height;self.currentTransformation='square';var left,top,right,bottom;if(width==height){left=0;top=0;right=width;bottom=height;}else if(width>height){top=0;bottom=height;left=(width / 2)-(height / 2);right=left+height;}else{left=0;right=width;top=(height / 2)-(width / 2);bottom=top+width;}
var points=[left,top,right,bottom];self.createCroppieObj({width:350,height:350},points);}catch(e){console.error(e)
globalUtils.trackCodeError(e,'squareTransformation');}},rectangleTransformation:function(){var self=this;self.destroyCroppieObj();self.currentTransformation='rectangle';var width=self.width,height=self.height;var minRatioWH=0.8;var maxRatioWH=1.911;var ratioWH=width / height;var left,top,right,bottom;var middlePoint;var visibleWidth;var visibleHeight;var viewport={};if(width>height){if(maxRatioWH>=ratioWH){top=0;bottom=height;left=0;right=width;viewport.width=350;viewport.height=350 / ratioWH;}else{top=0;bottom=height;visibleWidth=height*maxRatioWH;middlePoint=width / 2;left=middlePoint-(visibleWidth / 2);right=left+visibleWidth;viewport.width=350;viewport.height=350 / maxRatioWH;}}else{if(minRatioWH<=ratioWH){top=0;bottom=height;left=0;right=width;viewport.height=350;viewport.width=350*ratioWH;}else{visibleHeight=width / minRatioWH;middlePoint=height / 2;top=middlePoint-(visibleHeight / 2);bottom=top+visibleHeight;left=0;right=width;viewport.width=350*minRatioWH;viewport.height=350;}}
var points=[left,top,right,bottom];self.createCroppieObj(viewport,points);},rectangleStoryTransformation:function(){var self=this;self.destroyCroppieObj();self.currentTransformation='rectangle_vertical';var width=self.width,height=self.height;var needInitRotate=false;if(width>height){needInitRotate=true;self.width=height;self.height=width;width=self.width;height=self.height;}
var ratioHW=height / width;var minRatioHW=1.77;var maxRatioHW=1.78;var left,top,right,bottom;var middlePoint;var visibleWidth;var visibleHeight;var viewport={height:350,width:350 / ratioHW};top=0;left=0;bottom=height;right=width;if(ratioHW>=maxRatioHW){visibleHeight=width*maxRatioHW;middlePoint=height / 2;top=middlePoint-(visibleHeight / 2);bottom=top+visibleHeight;viewport.width=350 / maxRatioHW;}
if(ratioHW<=minRatioHW){visibleWidth=height / minRatioHW;middlePoint=width / 2;left=middlePoint-(visibleWidth / 2);right=left+visibleWidth;viewport.width=350 / minRatioHW;}
var points=[left,top,right,bottom];self.createCroppieObj(viewport,points,needInitRotate);},resizeImage:function(){var self=UploadModule.uploadPreviewBlock;self.currentTransformation=='square'?self.rectangleTransformation():self.squareTransformation();},rotateImage:function(){var self=UploadModule.uploadPreviewBlock;if(self.croppieObj){self.croppieObj.rotate(90);}},getOptimalSize:function(){var currentSize=this.currentSize;if(!currentSize.width||!currentSize.height){return null;}
var koef;if(UploadModule.uploadType=='profile'){var maxHeight=1080;var maxWidth=1080;var isVerticalOrientation=+(currentSize.height>currentSize.width);if(isVerticalOrientation){koef=currentSize.height / maxHeight;return{height:maxHeight,width:Math.floor(currentSize.width / koef)};}else{koef=currentSize.width / maxWidth;return{width:maxWidth,height:Math.floor(currentSize.height / koef)};}}
else{var needWidth=1080;koef=currentSize.width / needWidth;return{width:needWidth,height:Math.floor(currentSize.height / koef)};}},getBlobPreview:function(callback){if(!this.croppieObj){callback()}
var size=this.getOptimalSize();var options={type:'blob',format:'jpeg',size:'original'};if(size){options.size=size;}
this.croppieObj.result(options).then(callback);},showLoader:function(btnNext){if(!btnNext){return;}
btnNext.classList.add('loader');},hideLoader:function(btnNext){if(!btnNext){return;}
btnNext.innerText=UtilsModule.getLang('next');btnNext.classList.remove('loader');},showUploadedImage:function(blob){var uploadedImgDiv=document.querySelector('.uploaded_image_preview');var imgDiv=document.querySelector('.upload_preview_img');if(!uploadedImgDiv||!imgDiv){return;}
imgDiv.style.display='none';var reader=new FileReader();reader.readAsDataURL(blob);reader.onload=function(){var base64data=reader.result;uploadedImgDiv.style.backgroundImage='url('+base64data+')';uploadedImgDiv.style.display='block';};},showTextarea:function(){var textArea=this.container&&this.container.querySelector('textarea');if(!textArea){return;}
textArea.removeAttribute('disabled');textArea.innerText='';textArea.style.display='block'},showTagPeopleBtn:function(){var btnWrap=document.querySelector('.tag_people_btn_wrap');var btn=btnWrap.querySelector('.tag_people_btn');btn.querySelector('.tag_people_btn_text').innerText=UtilsModule.getLang('tag_people');btnWrap.style.display='flex';},tagPeople:{usertags:[],listenersAdded:false,opened:false,init:function(){var self=UploadModule.uploadPreviewBlock.tagPeople;self.showTagPeoplePanel();if(!self.listenersAdded){self.addListeners();}
self.opened=true;},addListeners:function(){var self=this;var $imagePreview=$('.uploaded_image_preview');$imagePreview.on('click',function(e){self.previewImageClick(e,this)});$imagePreview.on('click','.ext_user_tag_wrap',this.tagLabelClick);$imagePreview.on('click','#ext_deleteButton',this.removeTagClick);document.querySelector('.ext_tag_people_close').addEventListener('click',function(){self.usertags.forEach(function(item){$('[data-user_pk="'+item.user_id+'"]').remove();});self.close();});document.querySelector('.tag_people_confirm_btn').addEventListener('click',this.tagPeopleConfirm.bind(this));this.listenersAdded=true;},previewImageClick:function(e,el){if(!this.opened)return;var position=[e.offsetX / el.offsetWidth,e.offsetY / el.offsetHeight];this.usersList.showBox(position);},tagLabelClick:function(e){var self=UploadModule.uploadPreviewBlock.tagPeople;if(!self.opened)return;e.stopPropagation();e.preventDefault();var delBtn=this.querySelector('#ext_deleteButton');if(delBtn){delBtn.remove()}
else{$(this.querySelector('button')).append(self.getDeleteBtn());}},removeTagClick:function(e){e.stopPropagation();e.preventDefault();var self=UploadModule.uploadPreviewBlock.tagPeople;var $userTagWrap=$(this).closest('.ext_user_tag_wrap');var userPk=$userTagWrap.data().user_pk;for(var i=0;i<self.usertags.length;i++){if(self.usertags[i].user_id==userPk){self.usertags.splice(i,1);break;}}
$userTagWrap.remove();},showTagPeoplePanel:function(){document.querySelector('.tag_people_btn_wrap').style.display='none';document.querySelector('.upload_preview_header').style.display='none';document.querySelector('.upload_content textarea').style.display='none';var tagPeopleHeader=document.querySelector('.tag_people_header');tagPeopleHeader.querySelector('.tag_people_header_text').innerText=UtilsModule.getLang('tag_people');tagPeopleHeader.style.display='flex';var tagPeopleConfirmBtn=tagPeopleHeader.querySelector('.tag_people_confirm_btn');tagPeopleConfirmBtn.innerText=UtilsModule.getLang('tag_people_confirm');var tagPeopleMsg=document.querySelector('.tag_people_msg');tagPeopleMsg.querySelector('div').innerText=UtilsModule.getLang('tag_people_msg');tagPeopleMsg.style.display='flex';},close:function(){$('.tag_people_header').hide();$('.tag_people_msg').hide();$('.upload_preview_header').show();$('.tag_people_btn_wrap').show();$('.upload_content textarea').show();this.usertags=[];this.opened=false;},tagPeopleConfirm:function(e){UploadModule.confirmedUsertags=UploadModule.confirmedUsertags.concat(this.usertags);this.close();},createUserTag:function(opts){return $('<div class="ext_user_tag_wrap" data-user_pk="'+opts.user_pk+'" style="left:'+opts.left+'%;top: '+opts.top+'%">'+'<button>'+'<div class="ext_tag_tip"></div>'+'<span class="ext_tag_name">'+opts.username+'</span>'+'</button>'+'</div>');},getDeleteBtn:function(){return $('<span id="ext_deleteButton" class="coreSpriteSearchClear"></span>');},usersList:{suggestedUsers:null,showBox:function(position){var self=this;var tagPeople=UploadModule.uploadPreviewBlock.tagPeople;var modalBox=App.getModalBox();modalBox.showUsersListSearch();var $parent=$('.ext_users_search_list');$parent.addClass('ext_loader');$parent.on('click','.ext_users_search_item',function(e){modalBox.close();for(var i=0;i<tagPeople.usertags.length;i++){if(tagPeople.usertags[i].user_id==this.dataset.user_pk){tagPeople.usertags.splice(i,1);$('[data-user_pk="'+this.dataset.user_pk+'"]').remove();break;}}
tagPeople.usertags.push({user_id:this.dataset.user_pk,position:position});$('.uploaded_image_preview').append(tagPeople.createUserTag({left:position[0]*100,top:position[1]*100,username:this.dataset.username,user_pk:this.dataset.user_pk}));});this.createSearchInputBlock();this.requestSuggested({},function(data){if(data.error||!data.edges){}
self.renderUsersList(data.edges,$parent);});},requestSuggested:function(opts,callback){var self=this;if(self.suggestedUsers){return callback({edges:self.suggestedUsers})}
var queryHash='7616ef507122e253e5c7806f7976f05c';var url='https://www.instagram.com/graphql/query/?query_hash='+queryHash+'&variables='+encodeURIComponent('{}');$.ajax({url:url,method:'GET'}).done(function(res){if(!res||!res.data){return callback({error:1});}
var edges=[];try{edges=res.data.user.null_state.edge_suggested.edges;self.suggestedUsers=edges;}catch(e){return callback({error:1});}
callback({edges:edges})}).fail(function(){callback({error:1});})},requestTopSearch:function(opts,callback){var query=encodeURIComponent(opts.query);var url='https://www.instagram.com/web/search/topsearch/?context=user&query='+query+'&rank_token='+Math.random()+'&include_reel=true';$.get(url).done(function(res){if(!res||!res.users||!res.users.length){return callback({error:1});}
callback({users:res.users});}).fail(function(){callback({error:1});});},renderUsersList:function(edges,$parent){$parent.removeClass('ext_loader');if(!edges||!edges.length)return;if(!$parent.length)return;try{for(var i=0;i<edges.length;i++){if(edges[i].node&&edges[i].node.user){var domItem=this.createSearchDOMitem(edges[i].node.user);}
else if(edges[i].user){domItem=this.createSearchDOMitem(edges[i].user);}
else{return;}
$parent.append(domItem);}}catch(e){}},createSearchInputBlock:function(){var self=this;var container=document.querySelector('.ext_users_search_wrap');var text=UtilsModule.getLang('enter_search_query');container.innerHTML=`<label class="ext_users_search_label">
         <input autocapitalize="none" autocomplete="off" class="ext_users_search_input" placeholder="" type="search" value="">
         <div class="ext_users_search_input_placeholder">
          <div class="ext_users_search_input_placeholder_icon_wrap">
           <span class="ext_users_search_input_placeholder_icon" aria-label="${text}"></span>
          </div>
          <span class="ext_users_search_input_placeholder_text">${text}</span>
         </div>
         <div class="ext_users_search_input_placeholder_lock"></div>
        </label>`;var timeout=null;var $parent=$('.ext_users_search_list');container.querySelector('.ext_users_search_input').addEventListener('input',function(e){var el=this;if(el.value.length>0){container.querySelector('.ext_users_search_input_placeholder').style.opacity='0';}
else{container.querySelector('.ext_users_search_input_placeholder').style.opacity='1';}
timeout&&clearTimeout(timeout);timeout=setTimeout(function(){timeout=null;$parent.html('').addClass('ext_loader');if(el.value.length>0){self.onSearchEnter(el.value,$parent);}
else{self.renderUsersList(self.suggestedUsers,$parent);}},300);});},createSearchDOMitem:function(data){var itemContainer=document.createElement('div');itemContainer.dataset.user_pk=data.pk;itemContainer.dataset.username=data.username;itemContainer.className='ext_users_search_item';itemContainer.innerHTML='<span class="ext_user_icon">'+'<img src="'+data.profile_pic_url+'">'+'</span>'+'<div class="ext_user_data">'+'<div class="ext_username"><span>'+data.username+'</span>'+(data.is_verified?'<div class="coreSpriteVerifiedBadgeSmall"></div>':'')+'</div>'+'<div class="ext_userfullname">'+data.full_name+'</div>'+'</div>';return itemContainer;},onSearchEnter:function(query,$parent){var self=this;self.requestTopSearch({query:query},function(res){if(res&&res.users){self.renderUsersList(res.users,$parent);}
else{}})},},},onNextClick:function(){var self=UploadModule.uploadPreviewBlock;if(self.lockNextBtn){return;}
self.lockNextBtn=true;var btnNext=this;self.showLoader(btnNext);if(UploadModule.stepNow===1){self.getBlobPreview(function(blob){UploadModule.uploadRequest.factory('photo',blob,function(res){self.showUploadedImage(blob);self.showTextarea();self.showTagPeopleBtn();var btnCancel=document.querySelector('.upload_preview_header button.cancel');btnCancel.classList.add('imdr_upload_back');btnCancel.querySelector('.cancel_text').innerText=UtilsModule.getLang('back_btn');btnNext.querySelector('.next_text').innerText=UtilsModule.getLang('share_btn');btnNext.classList.add('imdr_upload_share');self.lockNextBtn=false;UploadModule.stepNow=2;btnNext.classList.remove('loader');});});}
else if(UploadModule.stepNow===2){var textArea=document.querySelector('#ext_post_textarea');textArea.setAttribute('disabled','disabled');var caption=textArea.value;UploadModule.uploadRequest.factory('caption',caption);}},},addDeleteBtnToThumbnail:function(container){if(container.querySelector('.coreSpriteSidecarIconLarge')||container.querySelector('.coreSpriteVideoIconLarge')){return}
var shortcode=App.getShortCode(container);if(!shortcode){return;}
var delBtn=this.getDelBtnEl(shortcode);container.appendChild(delBtn);container.dataset.dlBtnSkip='1';},deleteMedia:function(shortcode){return function(modalBox){var buttonsWrap,loaderEl;var deleteErrorText=UtilsModule.getLang('delete_error');var possibleReasonsText=UtilsModule.getLang('error403_possible_reasons');var reason1Text=UtilsModule.getLang('error403_reason_1');var reason2Text=UtilsModule.getLang('error403_reason_2');var errorNetworkText=UtilsModule.getLang('error_network');var checkNetworkText=UtilsModule.getLang('check_network');var xzReasonText=UtilsModule.getLang('error_reason_xz');var defaultErrorText='<h3 style="margin-bottom: 15px;font-weight: 600;">'+deleteErrorText+'</h3>'+'<p>'+xzReasonText+'</p>';function showLoader(){if(!modalBox){modalBox=App.getModalBox();}
if(!buttonsWrap){buttonsWrap=modalBox.querySelector('.ext_modal_buttons_wrap');}
buttonsWrap.style.display='none';if(!loaderEl){loaderEl=document.createElement('span');loaderEl.className='ext_delete_loader';buttonsWrap.parentNode.appendChild(loaderEl);}
loaderEl.style.display='block';}
showLoader();globalUtils.requestJSONgraphqlByShortCode({shortCode:shortcode},function(json){if(!json||json.error){var errorText=defaultErrorText;errorText+='<div class="delete_by_mobile_mode"><a href="">'+UtilsModule.getLang('delete_by_mobile_mode')+'<span class="icon"></span></a></div>';modalBox.showErrorBox(errorText);return;}
try{var postId=json.graphql.shortcode_media.id;var deleteUrl='https://www.instagram.com/create/'+postId+'/delete/';}
catch(e){errorText=defaultErrorText;errorText+='<div class="delete_by_mobile_mode"><a href="">'+UtilsModule.getLang('delete_by_mobile_mode')+'<span class="icon"></span></a></div>';modalBox.showErrorBox(errorText);return;}
globalUtils.sendMessage('getCookies',function(cookies){if(!cookies||!cookies.csrftoken){modalBox.showErrorBox(defaultErrorText);return;}
$.ajax({url:deleteUrl,method:'POST',headers:{'x-csrftoken':cookies.csrftoken,'x-instagram-ajax':'1',}}).done(function(res){if(!res||typeof res!='object'||res.status!='ok'||typeof res.did_delete=='undefined'){modalBox.showErrorBox(defaultErrorText);return;}
if(res.did_delete==false){modalBox.showErrorBox(defaultErrorText);return;}
window.location.href='https://www.instagram.com/'+(App.authorizedUserName||'');}).fail(function(res){var errorText='';if(res.status==403){errorText='<h3 style="margin-bottom:15px;font-weight:600;">'+deleteErrorText+'</h3>'+'<p style="margin-bottom:10px;">'+possibleReasonsText+':</p>'+'<ol style="text-align: justify; list-style: decimal;padding: 10px;margin-left: 10px;font-size: 0.8em;">'+'<li style="margin-bottom:15px">'+reason1Text+'</li>'+'<li style="margin-bottom:15px">'+reason2Text+'</li>'+'</ol>';}else if(res.status==0){errorText='<h3 style="margin-bottom: 15px;font-weight: 600;">'+errorNetworkText+'</h3>'+'<p>'+checkNetworkText+'</p>';}else{errorText=defaultErrorText;}
errorText+='<div class="delete_by_mobile_mode"><a href="">'+UtilsModule.getLang('delete_by_mobile_mode')+'<span class="icon"></span></a></div>';modalBox.showErrorBox(errorText);});});});}},getDelBtnEl:function(shortcode){if(!this.delButtonTemplate){this.delButtonTemplate=this.createDelBtnTemplate();}
var delBtn=this.delButtonTemplate.cloneNode(true);delBtn.setAttribute('type','button');delBtn.dataset.shortcode=shortcode;delBtn.classList.add(this.delBtnClassName);return delBtn;},createDelBtnTemplate:function(){var a=document.createElement('a');a.innerHTML='<span class="delete_icon"></span>';return a;}}})();var App=(function(){return{dlBtnClassName:'ext_desktop_dl_btnn',dlBtnClassNameConflict:'exts_conflict',buttonTemplate:null,authorizedUserName:null,isFrame:false,updatesStoryInterval:0,observerDomInterval:0,disabledApp:false,cachedMedia:{main:[],tagged:[],saved:[],igtv:[],},cachedMediaShortCodes:[],lastUri:null,conflictStyles:false,videoControlsEnabled:false,userPageSection:null,run:function(){var self=this;if(typeof window.localStorage.ext_igtv_on=='undefined'){window.localStorage.ext_igtv_on='1';}
this.disconnectPortObserver.testConnect();globalUtils.fixForeach();this.createDownloadButtonTpl();this.observerDOMInit();this.messagesListenerInit();this.userActionsListenerInit();globalUtils.getWorkingQueryHashes();this.checkExternalUpload();if(StoriesModule.prtnrExists&&typeof window.localStorage['ext_cnfl_mesgd']=='undefined'){window.localStorage['ext_cnfl_mesgd']='1';App.disconnectPortObserver.showConflictExtsMessage();}
globalUtils.getAuthorizedUserName(function(res){if(!res){self.getUserSelfInfo();return;}
chrome.runtime.sendMessage({action:'lastAuthorizedUser',username:res});self.authorizedUserName=res;});globalUtils.sendMessage('askMassDownloadPro',function(res){if(res){DownloadZipModule.massDownloadProSettings=true;}});window['ext_blob_story_data']={};},observerDOMInit:function(){function reactRootObserver(){try{var reactRoot=document.querySelector('#react-root');if(!reactRoot){return;}
var config={attributes:false,childList:true,characterData:false,subtree:false};var storyOpen=UtilsModule.isNativeStories();var observer=new MutationObserver(function(mutations){mutations.forEach(function(mutationRecord){if(mutationRecord.addedNodes.length){for(var i=0;mutationRecord.addedNodes[i];i++){if(mutationRecord.addedNodes[i].tagName.toLowerCase()=='section'){if(window.location.href.indexOf('/stories/')>-1){storyOpen=true;findAndHandleNativeStories();}
else{if(storyOpen){storyOpen=false;}
else{App.updateUserPageSection();}
setTimeout(function(){App.handleMainPageForStories();},0);setTimeout(function(){observerProcess();},0);}
break;}}}});});observer.observe(reactRoot,config);}catch(e){globalUtils.trackCodeError(e,'reactRootObserver')}}
function checkStateDownloadButtonsNativeStories(){if(StoriesModule.prtnrExists)return false;if(!UtilsModule.isNativeStories()){return false;}
var nativeStoriesViewer=document.querySelector('._sq4bv ._psbeo ._ni05h section');if(!nativeStoriesViewer){nativeStoriesViewer=document.querySelector('section > div div section');}
if(nativeStoriesViewer){StoriesModule.toggleVisibleDlAllBtnInNativeStories(nativeStoriesViewer);}}
function findAndHandleNativeStories(needRepeat){if(StoriesModule.prtnrExists)return false;if(!UtilsModule.isNativeStories()){return false;}
var nativeStoriesViewer=document.querySelector('._sq4bv ._psbeo ._ni05h section');if(!nativeStoriesViewer){nativeStoriesViewer=document.querySelector('section > div div section');}
if(!nativeStoriesViewer){if(needRepeat){setTimeout(findAndHandleNativeStories,200);}}
else if(nativeStoriesViewer&&nativeStoriesViewer.dataset.extSkip!='1'){nativeStoriesViewer.dataset.extSkip=1;setTimeout(function(){StoriesModule.addDlBtn2NativeStories(nativeStoriesViewer);},0);}
return true;}
function insertTopNavButtons(){if(document.querySelector('.ext_mobile_mode_icon'))return;var container=UtilsModule.getTopNavButtonsContainer();if(!container)return;$(`<div class="imdr_top_nav_btn">
         <a class="ext_mobile_mode_icon" href=""></a>
     </div>
     <div class="imdr_top_nav_btn">
         <a class="ext_stories_page_icon" href=""></a>
     </div>
     <div class="imdr_top_nav_btn download_all_wrap_wrap">
      <div class="ext_btn_dl_all"></div>
     </div>`).appendTo(container);tippy('.ext_mobile_mode_icon',{content:chrome.i18n.getMessage('mobile_view')});tippy('.ext_stories_page_icon',{content:chrome.i18n.getMessage('stories_page_friends_stories_header')});tippy('.ext_btn_dl_all',{content:chrome.i18n.getMessage('download_all')});}
function fixInterfaceConflict(){if(App.conflictStyles){$('.'+App.dlBtnClassName+':not(.'+App.dlBtnClassNameConflict+')').addClass(App.dlBtnClassNameConflict);}}
function mediaFounder(){var needAddDeleteBtn=false;var userEditProfileWrap=document.querySelector('main header section a[href^="/accounts/edit"]');var userName=globalUtils.getUserNameFromWindowLocation();if(!(new RegExp('[/?]saved').test(window.location.href))&&userEditProfileWrap&&App.authorizedUserName){needAddDeleteBtn=App.authorizedUserName==userName;}
var newMediasCount=0;var mediaNodeListInternalPage=document.querySelectorAll('section > main article > div > div > div a[href^="/p/"]');if(mediaNodeListInternalPage.length==0&&document.querySelector('article > div > div > div a[href^="/p/"] img')){mediaNodeListInternalPage=document.querySelectorAll('article > div > div > div a[href^="/p/"]');}
if(mediaNodeListInternalPage.length==0&&document.querySelector('section div > div > div a[href^="/p/"] img')){mediaNodeListInternalPage=document.querySelectorAll('section div > div > div a[href^="/p/"]');}
if(mediaNodeListInternalPage&&mediaNodeListInternalPage.forEach){mediaNodeListInternalPage.forEach(function(node){if(!node.parentNode.dataset.extSkip&&node.querySelector('img')){newMediasCount++;App.addDlBtn(node.parentNode,2);}
if(needAddDeleteBtn&&!node.parentNode.dataset.dlBtnSkip){UploadModule.addDeleteBtnToThumbnail(node.parentNode);}});}
var igtvNodeListInternalPage=location.href.indexOf('/channel/')>-1&&document.querySelectorAll('section div > div > div a[href^="/tv/"]');if(igtvNodeListInternalPage&&igtvNodeListInternalPage.forEach){igtvNodeListInternalPage.forEach(function(node){if(!node.parentNode.dataset.extSkip){App.addDlBtn(node,5);}});}
var userAvatarImg=document.querySelector('header > div > div > canvas + span > img');if(userAvatarImg&&!StoriesModule.prtnrExists){if(!userAvatarImg.parentNode.parentNode.dataset.extSkip){userAvatarImg.parentNode.parentNode.dataset.extSkip='1';StoriesModule.checkPostLiveOneUser(function(data){if(!data)return;StoriesModule.addPostLiveIcon2UserPage(userAvatarImg.parentNode.parentNode,data)});}}
var mainPageFeeds=document.querySelectorAll('div > div > article > header + div > div > div');if(mainPageFeeds.length===0){mainPageFeeds=document.querySelectorAll('div > div > article header + div + div > div > div');}
mainPageFeeds.forEach(function(node){if(node.parentNode.dataset.extSkip>0){return;}
if(node.querySelector('ul > li > div > div > div')){return;}
if(!node.querySelector('img')&&!node.querySelector('video')){return;}
newMediasCount++;App.addDlBtn(node.parentNode,1);});var multipleItems=document.querySelectorAll('div > div > article > header + div > div > div ul > li > div > div > div');if(multipleItems.length===0){multipleItems=document.querySelectorAll('div > div > article header + div + div > div > div ul > li > div > div > div');}
multipleItems.forEach(function(node){if(node.parentNode.dataset.extSkip>0){return;}
if(!node.querySelector('img')&&!node.querySelector('video')){return;}
App.addDlBtn(node.parentNode,4);});if(newMediasCount>0){DownloadZipModule.rebuildPopup();}
StoriesModule.updateLiveStories();fixInterfaceConflict();checkStateDownloadButtonsNativeStories();findAndHandleNativeStories();}
function observerProcess(){try{insertTopNavButtons();}catch(e){}
try{findAndHandleNativeStories();}catch(e){}
try{var userEditProfileWrap=document.querySelector('main header section a[href^="/accounts/edit"]');userEditProfileWrap&&UploadModule.uploadStateInit(userEditProfileWrap.parentElement.parentElement);}catch(e){}}
function checkEmbedMedia(){document.querySelectorAll('.Embed > .Header + div').forEach(function(node){if(node.dataset.extSkip>0){return false;}
App.addDlBtn(node,3);})}
if(UtilsModule.isFrame()){App.isFrame=true;checkEmbedMedia();return;}
setTimeout(function(){App.handleMainPageForStories();},0);setTimeout(function(){observerProcess();},0);setTimeout(function(){mediaFounder();},0);reactRootObserver();App.observerDomInterval=setInterval(function(){mediaFounder();},2000);},handleMainPageForStories:function(repeat){if(StoriesModule.prtnrExists)return;if(!UtilsModule.isMainPage()){return;}
var wrapFeedMainPage=document.querySelector('section > main > section > div:first-child');if(!wrapFeedMainPage||!wrapFeedMainPage.querySelector('article')){wrapFeedMainPage=document.querySelector('section > main > section > div:first-child+div');}
if(!wrapFeedMainPage||!wrapFeedMainPage.querySelector('article')){if(!repeat){setTimeout(function(){App.handleMainPageForStories(true);},1500)}
return;}
StoriesModule.insertStoriesBlock(wrapFeedMainPage);},messagesListenerInit:function(){chrome.runtime.onMessage.addListener(App.chromeMessagesListener)},userActionsListenerInit:function(){var $body=$('body');var lastButtonClick=Date.now();var self=this;var isRepeatClick=function(e){e.preventDefault();e.stopPropagation();var now=Date.now();if(lastButtonClick+500>now){return true;}
lastButtonClick=now;return false;};$body.on('click','.'+App.dlBtnClassName,function(e){if(App.disabledApp){return;}
if(isRepeatClick(e)){return;}
App.onClickDownloadBtn.call(this,e);});if(App.isFrame){return;}
$body.on('click','.'+DownloadZipModule.dlBtnClassName,function(e){if(App.disabledApp){return;}
if(isRepeatClick(e)){return;}
DownloadZipModule.showPopupDlAll();});$body.on('click','.ext_popup_dl_btn',DownloadZipModule.onClickDownloadAllBtn);$body.on('click','.ext_del_btn',function(e){if(App.disabledApp){return;}
if(isRepeatClick(e)){return;}
var shortcode=this.dataset.shortcode;var modalBox=App.getModalBox();modalBox.showDeleteWarning({continueDelCallback:UploadModule.deleteMedia(shortcode)})});$body.on('click','.ext_our_story_item',function(e){if(StoriesModule.prtnrExists)return false;if(isRepeatClick(e)){return;}
var el=this;var storyId=el.dataset.storyId;var storyType=el.dataset.storyType;var currentStory=null;if(storyType=='tray'){var stories=StoriesModule.allCurrentStories['tray'];}
else if(storyType=='live'){stories=StoriesModule.allCurrentStories['broadcasts'];}
else{stories=StoriesModule.allCurrentStories['post_live'];}
for(var k in stories){var curStory=stories[k];if(!curStory)continue;if(curStory.id==storyId||curStory.pk==storyId){currentStory=curStory;break;}}
if(!currentStory)return;if(storyType=='tray'){var userId=currentStory.user&&currentStory.user.pk;if(!userId){return App.getModalBox().showErrorBox(UtilsModule.getLang('story_is_not_available'));}
var $imgParent=$('.ext_story_item_image',el);var $image=$imgParent.find('img');var $clonedImage=$image.clone();$clonedImage.removeClass('ext_item_image_orig').addClass('ext_item_image_clone').appendTo($imgParent);var loadingAnimateInterval,storiesReceived;setTimeout(function(){if(!storiesReceived){$imgParent.addClass('ext_story_loading');loadingAnimateInterval=setInterval(function(){$imgParent.toggleClass('ext_story_loading');},1000);}},300);StoriesModule.requestOneUserTrayStories(userId,function(res){storiesReceived=true;clearInterval(loadingAnimateInterval);$clonedImage.remove();$imgParent.removeClass('ext_story_loading');if(!res){return App.getModalBox().showErrorBox(UtilsModule.getLang('story_is_not_available'));}
var storyItems=StoriesModule.prepareStoryItems(res.items);if(!storyItems.length){return App.getModalBox().showErrorBox(UtilsModule.getLang('story_is_not_available'));}
StoriesModule.showInPswp(storyItems);});}
else if(storyType=='postlive'&&currentStory.broadcasts[0].story_type=='post_live_igtv'){var storyItems=StoriesModule.prepareIgtv2SavedLive(currentStory.broadcasts);StoriesModule.showInPswp(storyItems);}
else{var msg={action:'openStoriesSpaceTab',type:storyType,};if(storyType=='live'){msg.live_id=storyId;msg.user_id=currentStory.broadcast_owner.pk;}
else{msg.user_id=currentStory.user.pk;}
globalUtils.sendMessage(msg);}});$body.on('click','.ext_ds_dl_btn',function(e){if(StoriesModule.prtnrExists)return false;if(App.disabledApp){return;}
e.stopPropagation();e.preventDefault();if(isRepeatClick(e)){return;}
StoriesModule.onClickDlBtnOurStoryOne();});$body.on('click','.ext_ds_dl_all_btn',function(e){if(StoriesModule.prtnrExists)return false;if(App.disabledApp){return;}
e.stopPropagation();e.preventDefault();if(isRepeatClick(e)){return;}
StoriesModule.onClickDlBtnOurStoryAll();});$body.on('click','.ext_ns_dl_btn',function(e){if(StoriesModule.prtnrExists)return false;if(isRepeatClick(e)){return;}
StoriesModule.onClickDlBtnNativeStoryOne.call(this,e);});$body.on('click','.ext_ns_dl_all_btn',function(e){if(StoriesModule.prtnrExists)return false;if(isRepeatClick(e)){return;}
StoriesModule.onClickDlBtnNativeStoryAll.call(this,e);});$body.on('click','.upload_by_mobile_mode, .delete_by_mobile_mode, .ext_mobile_mode_icon',function(e){e.preventDefault();if(isRepeatClick(e)){return;}
App.getModalBox().close();globalUtils.sendMessage('openMobileMode');});$body.on('click','.ext_stories_page_icon',function(e){e.preventDefault();if(isRepeatClick(e)){return;}
globalUtils.sendMessage({action:'openStoriesSpaceTab'});});$body.on('click','.ext_post_live_placeholder',function(e){if(StoriesModule.prtnrExists)return false;if(isRepeatClick(e)){return;}
StoriesModule.showPostLiveFromOneUserPage(this);});$body.on('click','.ext_stories_toggler',function(e){if(StoriesModule.prtnrExists)return false;if(isRepeatClick(e)){return;}
if(this.dataset.state=='switched_on'){StoriesModule.hideIgStoriesBlock(this);}
else if(this.dataset.state=='switched_off'){StoriesModule.showIgStoriesBlock(this);}});$body.on('click','.ext_upload_icon',function(e){if(isRepeatClick(e)){return;}
UploadModule.uploadBtn.uploadBtnOnClick();});$body.on('change','.imdr_video_range',function(){var video=$(this.closest('[data-ext-skip="1"]')).find('video').get(0);video&&(video.currentTime=this.value/10);});$body.on('click','.imdr_video_play_pause',function(e){if(isRepeatClick(e)){return;}
var video=$(this.closest('[data-ext-skip="1"]')).find('video').get(0);if(!video)return;if(this.classList.contains('imdr_paused')){this.dataset.playing='1';video.play();}
else{this.dataset.playing='0';video.pause();}});$body.on('click','a',function(e){if(this.classList.contains('_9VEo1')){App.updateUserPageSection(this);}
else if(new RegExp('\\/(channel|saved|tagged)\\/').test(this.href)){App.updateUserPageSection(this);}
else{if(document.querySelector('a[href*="/channel/"]')&&document.querySelector('a[href*="/tagged/"]')){var pageOwner=document.querySelector('a[href*="/tagged/"]').href.match(new RegExp('([^/]+)\\/tagged\\/'));pageOwner=pageOwner&&pageOwner[1];if(this.href.indexOf(pageOwner)>-1&&!this.closest('header')){App.updateUserPageSection(this);}}}});},updateUserPageSection:function(clickBtn){if(!clickBtn){if(location.href.indexOf('/tagged/')>-1){App.userPageSection='tagged'}
else if(location.href.indexOf('/saved/')>-1){App.userPageSection='saved'}
else if(location.href.indexOf('/igtv/')>-1){App.userPageSection='igtv';}
else{App.userPageSection='main';}}
else{if(clickBtn.href.indexOf('channel')>-1){App.userPageSection='igtv';}
else if(clickBtn.href.indexOf('tagged')>-1){App.userPageSection='tagged';}
else if(clickBtn.href.indexOf('saved')>-1){App.userPageSection='saved';}
else{App.userPageSection='main'}}
App.resetFoundLinks();},getUserPageSection:function(){if(location.href.indexOf('/tagged/')>-1){return'tagged';}
else if(location.href.indexOf('/saved/')>-1){return'saved';}
else if(location.href.indexOf('/igtv/')>-1){return'igtv';}
return App.userPageSection||'main';},checkExternalUpload:function(){var self=this;var externalLinkParam=window.location.search.match(/insta_upload_ext_link=1/);if(!externalLinkParam)return;var userNameFromUrl=globalUtils.getUserNameFromWindowLocation();if(!userNameFromUrl)return;globalUtils.requestHTMLgraphqlMain(function(html){if(!html||!html.length){return;}
var sharedDataObj=globalUtils.get_sharedDataFromHTML(html,'https://www.instagram.com');var userNameFromSharedData=sharedDataObj&&sharedDataObj.config&&sharedDataObj.config.viewer&&sharedDataObj.config.viewer.username
if(!userNameFromSharedData)return;if(userNameFromSharedData!=userNameFromUrl)return;self.getExternalUploadLink(function(externalLink){if(!externalLink)return;if(!self.isValidLink(externalLink))return;self.requestExternalFile(externalLink,function(e){var src=e.target.result;var modalBox=App.getModalBox();modalBox.showUploadChoice({toProfileCallback:function(){UploadModule.uploadType='profile';UploadModule.uploadPreviewBlock.create(src);},toStoriesCallback:function(){UploadModule.uploadType='story';UploadModule.uploadPreviewBlock.create(src);}});});})});},requestExternalFile:function(url,callback){var xhr=new XMLHttpRequest();xhr.open('GET',url,true);xhr.responseType="arraybuffer";xhr.onreadystatechange=function(){if(this.readyState===4){if(this.status===200){try{var resText=this.response||this.responseText;var blob=new Blob([resText],{type:'application/octet-stream'});var reader=new FileReader();reader.onload=callback;reader.readAsDataURL(blob);}catch(e){}}
else{}}};xhr.send();},getExternalUploadLink:function(callback){chrome.runtime.sendMessage('getExternalUploadLink',callback);},isValidLink:function(link){return!!link.match(new RegExp('^https?:\\/\\/(www\\.)?[^.]+\\.[^.]+'));},onClickDownloadBtn:function(e){e.stopPropagation();e.preventDefault();var el=this;if(!(el instanceof HTMLElement)||!el.classList.contains(App.dlBtnClassName)){App.showDownloadError();return;}
App.loaderBtnState.on(el);if(el.dataset.msurl){var userName=App.getUserName(el,true);if(App.isVideoPost(el.parentNode)){var videoEl=App.findVideoElement(el.parentNode);if(videoEl){var url=App.getLinkFromVideoElement(videoEl);var filename=globalUtils.getFileNameFromVideoLink(url,userName);}}
else if(App.isImagePost(el.parentNode)){var imageEl=App.findImageElement(el.parentNode);if(imageEl){url=App.getLinkFromImgElement(imageEl);filename=globalUtils.getFileNameFromImageLink(url,userName);}}
if(url&&globalUtils.isValidUrl(url)&&filename){var mediaInfo={url:url,filename:filename,};return App.onGetMediaInfo.call(App,mediaInfo,el);}}
var shortCode=el.dataset.shortcode;var isIgtv=!!el.dataset.igtv;globalUtils.getMediaItemFromJsonGraphql({shortCode:shortCode,posInMultiple:el.dataset.multiplePos,isIgtv:isIgtv},function(mediaInfo){if(!mediaInfo||mediaInfo.error){try{var userName=App.getUserName(el);if(App.isVideoPost(el.parentNode)){var videoEl=App.findVideoElement(el.parentNode);if(videoEl){var url=App.getLinkFromVideoElement(videoEl);var filename=globalUtils.getFileNameFromVideoLink(url,userName);}}
else if(App.isImagePost(el.parentNode)){var imageEl=App.findImageElement(el.parentNode);if(imageEl){url=App.getLinkFromImgElement(imageEl);filename=globalUtils.getFileNameFromImageLink(url,userName);}}
if(url&&globalUtils.isValidUrl(url)&&filename){mediaInfo={url:url,filename:filename,};}}catch(e){}}
App.onGetMediaInfo.call(App,mediaInfo,el);});},onGetMediaInfo:function(info,el){var self=this;if(!info||info.error||!(info.url&&info.filename)){self.loaderBtnState.off();return self.showDownloadError(el);}
if(el){}
globalUtils.downloadFile(info,function(res){self.loaderBtnState.off();if(!res){self.showDownloadError(el);}});},resetFoundLinks:function(){this.cachedMedia={main:[],tagged:[],saved:[],igtv:[],};this.cachedMediaShortCodes=[];},loaderBtnState:{on:function(el){$('.ext_icon',el).addClass('preloader2');},off:function(){$('.'+App.dlBtnClassName+' .ext_icon.preloader2').removeClass('preloader2');$('.'+StoriesModule.dlBtnClassName+' .ext_icon.preloader2').removeClass('preloader2');}},showDownloadError:function(btnEl){if(!btnEl){return;}
var parentEl=btnEl.parentNode;$(parentEl).append('<div class="error_dl_msg_desktop">'+UtilsModule.getLang("error_dl_msg")+'</div>');setTimeout(function(){$('.error_dl_msg_desktop').remove();},2000);},chromeMessagesListener:function(message,sender,cb){if(!message){return false;}
if(message=='checkConnect'){cb(true);}
else if(message=='isDownloadAllProcessNowInTab'){cb(DownloadZipModule.processIsActive);}
else if(message=='getFoundLinks'){App.getFoundLinks(cb);return true;}
else if(message=='storyPauseOffByDownloadId'){StoriesModule.storiesPause.off();}
else if(message.action=='storyPauseOffByBlobUrl'){if(window['ext_blob_story_data']['object_url']==message.url){StoriesModule.storiesPause.off();}}
else if(message.action=='changeVideoControl'){App.videoControlsEnabled=message.add_video_control;}},disconnectPortObserver:{port:null,disconnected:false,testConnect:function(){this.port=chrome.runtime.connect();this.port.onDisconnect.addListener(this.disconnectListener);},disconnectListener:function(){this.disconnected=true;window.insta_dl_disabled=true;App.disconnectPortObserver.showDisconnectNotification();},showDisconnectNotification:function(){var container=document.createElement('div');container.className='disconnect_notification';container.innerHTML='<div class="notify_wrap">'+'<div class="ext_close_btn">&times;</div>'+'<div class="ext_text">'+UtilsModule.getLang('disconnect_notification')+'</div>'+'</div>';var closeBtn=container.querySelector('.ext_close_btn');closeBtn.addEventListener('click',function(){container.remove();});document.querySelector('body').appendChild(container);$(container).animate({opacity:1,right:'20px'},1000);},showConflictExtsMessage:function(){var container=document.createElement('div');container.className='cnflt_notification';container.innerHTML='<div class="notify_wrap">'+'<div class="ext_close_btn">&times;</div>'+'<div class="ext_text">'+UtilsModule.getLang('conflict_notification')+'</div>'+'</div>';var closeBtn=container.querySelector('.ext_close_btn');closeBtn.addEventListener('click',function(){container.remove();});document.querySelector('body').appendChild(container);$(container).animate({opacity:1,right:'20px'},1000);},},getFoundLinks:function(cb){var self=this;var foundLinks=[];if(!StoriesModule.prtnrExists&&StoriesModule.gallery!=null&&StoriesModule.showingStoryItems.length!=0&&StoriesModule.showingStoryType=='tray'){StoriesModule.showingStoryItems.forEach(function(item){foundLinks.push({isStory:true,type:item.type,prev:item.prev,url:item.url,filename:item.filename,});})}
else if(UtilsModule.isNativeStories()&&!StoriesModule.prtnrExists){StoriesModule.getAllLinksCurrentNativeStories(function(res){res.forEach(function(item){foundLinks.push({isStory:true,type:item.type,prev:item.prev,url:item.url,filename:item.filename,});});cb(foundLinks);});return;}
else{foundLinks=self.getCachedMedia();}
if(typeof cb=='function'){cb(foundLinks);}},getCachedLinkByShortCode:function(shortCode){if(App.cachedMediaShortCodes.indexOf(shortCode)==-1)return null;var cachedMedia=App.getCachedMedia();for(var i=0;cachedMedia[i];i++){if(cachedMedia[i].shortcode==shortCode){if(typeof cachedMedia[i].url=='string'&&cachedMedia[i].url.length){return{url:cachedMedia[i].url,filename:cachedMedia[i].filename}}
return null;}}
return null;},getCachedMedia:function(){return App.cachedMedia[App.userPageSection];},getFoundShortCodes:function(start,end){start=typeof start!='undefined'&&!isNaN(parseInt(start))?(parseInt(start)-1):0;end=!isNaN(parseInt(end))?parseInt(end):undefined;return this.cachedMediaShortCodes.slice(start,end);},findVideoElement:function(container){return container.querySelector('video');},findImageElement:function(container){var imgEl=null;var images=container.querySelectorAll('img[src], img[srcset]');if(images.length===1){imgEl=images[0];}
else if(images.length>1){for(var i=0;images[i];i++){var src=images[i].getAttribute('src');var srcSet=images[i].getAttribute('srcset');if(!src&&!srcSet){continue;}
if(typeof src=='string'&&src.indexOf('chrome-extension')>-1){continue;}
if(((typeof src=='string'&&src.indexOf('instagram')>-1)||(typeof srcSet=='string'&&srcSet.indexOf('instagram')>-1))&&images[i].width>100){imgEl=images[i];break;}}
if(!imgEl){imgEl=images[0];}}
if(!imgEl){return null;}
return imgEl;},getLinkFromImgElement:function(imageEl){if(!(imageEl instanceof HTMLElement)){return null;}
var srcset=imageEl.getAttribute('srcset');if(srcset){var srcsetsObj={};var srcsetArray=srcset.split(',');srcsetArray.forEach(function(item){var itemArr=item.split(' ');var key=itemArr[1].replace(/[^\d]/,'');if(srcsetsObj[key])return;srcsetsObj[key]=itemArr[0];});var maxSize=0;for(var key in srcsetsObj){if((+key)>(+maxSize)){maxSize=key;}}
var src=srcsetsObj[maxSize];}
if(typeof src!=='string'||!src.match(new RegExp('\\.(jpg|png)'))){src=imageEl.getAttribute('src');}
if(typeof src!=='string'){return null;}
return src;},getLinkFromVideoElement:function(videoEl){if(!(videoEl instanceof HTMLElement)){return false;}
var src=videoEl.getAttribute('src');if(typeof src=='string'){return src;}
var sources=videoEl.querySelectorAll('source');if(!sources.length){return false;}
var codecsPriority=['avc1.64001E','avc1.4D401E','avc1.58A01E','avc1.42E01E',];var priorityLinks=[];sources.forEach(function(source){var type=source.getAttribute('type');if(!type){return;}
var codec=type.match(new RegExp('codecs="([^,]+)'));codec=codec&&codec[1];if(!codec){return;}
var index=codecsPriority.indexOf(codec);if(index!=-1){priorityLinks[index]=source.src;}});for(var i in priorityLinks){if(typeof priorityLinks[i]=='string'&&priorityLinks[i].length){src=priorityLinks[i];break;}}
if(!src){src=sources[0].getAttribute('src');}
if(typeof src!=='string'){return false;}
return src;},isVideoPost:function(container){return!!(container.querySelector('video')||container.querySelector('.videoSpritePlayButton')||container.querySelector('.coreSpriteVideoIconLarge')||container.querySelector('.glyphsSpriteVideo_large'));},isImagePost:function(container){return!!(container.querySelector('img[src], img[srcset]'));},isIgtvPost:function(container){return!!((container.href&&container.href.match(new RegExp('\\/tv\\/([^/]+)'))));},getVideoPoster:function(container){var poster;var videoEl=container.querySelector('video');if(videoEl){poster=videoEl.getAttribute('poster');}
if(container.href&&container.href.match(new RegExp('\\/tv\\/([^/]+)'))){var posterBkgEl=container.querySelector('div > div[style*="background-image"]');if(!posterBkgEl){return null;}
poster=posterBkgEl.style.backgroundImage;poster=poster.match(new RegExp('url\\("([^"]+)'));poster=poster&&poster[1];}
if(poster&&poster.length&&poster.match(new RegExp('\\.(jpg|png)'))){return poster;}
var imgEl=container.querySelector('img');if(!imgEl){return null;}
return imgEl.getAttribute('src');},getPreviewFromImageElement:function(imageEl){if(!imageEl){return null;}
var src;var srcset=imageEl.getAttribute('srcset');if(srcset){var srcsetsObj={};var srcsetArray=srcset.split(',');srcsetArray.forEach(function(item){var itemArr=item.split(' ');srcsetsObj[itemArr[1].replace(/[^\d]/,'')]=itemArr[0]});var minSize=null;for(var key in srcsetsObj){if(minSize===null){minSize=key;continue;}
if((+key)<(+minSize)){minSize=key;}}
src=srcsetsObj[minSize];}
if(typeof src=='string'&&src.match(new RegExp('\\.(jpg|png)'))){return src;}
src=imageEl.getAttribute('src');if(typeof src=='string'&&src.match(new RegExp('\\.(jpg|png)'))){return src;}
return null;},addDlBtn:function(container,pageType){"use strict";try{var self=this;if(container.querySelector('.'+App.dlBtnClassName)){return;}
var shortCodeContainerEl,videoEl,imageEl,dlBtn;var filename,url,preview,shortCode,mediaType,multipleWithSlider;if(pageType==1){shortCodeContainerEl=$(container).closest('article').get(0);if(!shortCodeContainerEl){return;}}
else if(pageType==2){shortCodeContainerEl=container;}
else if(pageType==3){shortCodeContainerEl=container.querySelector('.EmbeddedMedia');}
else if(pageType==4){multipleWithSlider=true;shortCodeContainerEl=$(container).closest('article').get(0);if(!shortCodeContainerEl){return;}
var $container=$(container);var $currentLi=$container.closest('li').get(0);var currentPosition=0;var elOrderNumber;$container.closest('ul').find('li').each(function(index,item){if(item==$currentLi)elOrderNumber=currentPosition;if(item.querySelector('div img')){currentPosition++;}});}
else if(pageType==5){shortCodeContainerEl=container;}
else{return;}
shortCode=App.getShortCode(shortCodeContainerEl);if(!shortCode)return;if(self.isVideoPost(container)){mediaType='video';videoEl=self.findVideoElement(container);if(videoEl){url=self.getLinkFromVideoElement(videoEl);filename=globalUtils.getFileNameFromVideoLink(url);}
preview=self.getVideoPoster(container);}
else if(self.isImagePost(container)){mediaType='photo';imageEl=self.findImageElement(container);if(!imageEl)return;url=self.getLinkFromImgElement(imageEl);filename=globalUtils.getFileNameFromImageLink(url);preview=self.getPreviewFromImageElement(imageEl);if(!preview){preview=url;}}
else if(self.isIgtvPost(container)){mediaType='igtv';preview=self.getVideoPoster(container);}
else{return;}
if(!preview){return;}
var mediaInfo={shortcode:shortCode,type:mediaType,prev:preview,page_type:pageType,isStory:false,isMultiple:UtilsModule.isMultiplePost(container)||multipleWithSlider,isMultipleWithSlider:multipleWithSlider,multiplePos:multipleWithSlider?elOrderNumber:0,};if(typeof url=='string'&&url.indexOf('blob:')==-1&&url.match(new RegExp('\\.(png|jpg|mp4|flv)'))){mediaInfo.url=url;mediaInfo.filename=filename;}
self.addPost2Cache(mediaInfo);self.sendNewPostInfoToPopup(mediaInfo);dlBtn=this.getDlBtnEl(mediaInfo);container.appendChild(dlBtn);if(pageType==5){container.style.position='relative';}
container.dataset.extSkip='1';if(pageType!=5&&videoEl&&!videoEl.controls){if(isNaN(videoEl.duration)){videoEl.addEventListener('progress',App.videoPlayingListener)}
else{if(App.videoControlsEnabled){videoEl.dataset.played='1';App.addControlToVideoEl({video:videoEl,duration:videoEl.duration,});}}}}catch(e){if(Math.random()<0.01){globalUtils.trackCodeError(e,'addNewDlBtn');}}},addPost2Cache:function(mediaInfo){if(typeof mediaInfo!='object'||!mediaInfo.shortcode){return;}
if(App.cachedMediaShortCodes.indexOf(mediaInfo.shortcode)==-1){App.cachedMedia[App.getUserPageSection()].push(mediaInfo);App.cachedMediaShortCodes.push(mediaInfo.shortcode);}},sendNewPostInfoToPopup:function(mediaInfo){globalUtils.sendMessage({action:'linkFound',mediaInfo:mediaInfo});},getDlBtnEl:function(info){var dlBtn=this.buttonTemplate.cloneNode(true);this.conflictStyles&&dlBtn.classList.add(this.dlBtnClassNameConflict);dlBtn.dataset.shortcode=info.shortcode;if(info.isMultipleWithSlider){dlBtn.dataset.msurl='1';if(info.multiplePos){dlBtn.dataset.multiplePos=info.multiplePos;}}else if(info.isMultiple){dlBtn.dataset.multiplePos='0';}
if(info.type=='igtv'){dlBtn.dataset.igtv=1;}
return dlBtn;},createDownloadButtonTpl:function(){var dlBtn=document.createElement('a');dlBtn.className=this.dlBtnClassName;dlBtn.setAttribute('type','button');dlBtn.innerHTML='<span class="ext_icon"></span><span class="ext_text">'+UtilsModule.getLang('download').toUpperCase()+'</span>';if(UtilsModule.isWindows()){dlBtn.classList.add('ext_windows_font');}
this.buttonTemplate=dlBtn;},addControlToVideoEl:function(options){var roundDuration_x10=Math.round((options.duration)*10);var $parent=$(options.video).closest('[data-ext-skip="1"]');if($parent.length===0)return;var isStory=UtilsModule.isNativeStories();var $customControl=$(`<span class="imdr_custom_video_control ${isStory ? 'imdr_ctrl_stories' : ''}">
      <span class="imdr_video_play_pause" data-playing="1"></span>
      <input class="imdr_video_range ${isStory ? 'imdr_ctrl_input' : ''}" type="range" value="0" min="0" max="${roundDuration_x10}">
      <span class="imdr_video_time">
       <span class="imdr_t_current">${UtilsModule.secondsToMinutes(0)}</span>&nbsp;/&nbsp;<span class="imdr_t_end">${UtilsModule.secondsToMinutes(options.duration)}</span>
      </span>
     </span>`);if(isStory){$parent.find('textarea').parent().parent().parent().css({marginBottom:'20px'});}
else{}
$parent.append($customControl);var $rangeEl=$customControl.find('.imdr_video_range');var $timeEl=$customControl.find('.imdr_t_current');var playPauseEl=$customControl.find('.imdr_video_play_pause').get(0);options.video.addEventListener('timeupdate',function(e){$timeEl.text(UtilsModule.secondsToMinutes(this.currentTime));$rangeEl.val(Math.round((this.currentTime)*10));});options.video.addEventListener('play',function(e){if(!playPauseEl)return;playPauseEl.classList.remove('imdr_paused');if(isStory&&playPauseEl.dataset.playing=='0'){this.pause();}});options.video.addEventListener('pause',function(e){if(!playPauseEl)return;playPauseEl.classList.add('imdr_paused');playPauseEl.dataset.playing='0';});},videoPlayingListener:function(e){if(!App.videoControlsEnabled)return;if(isNaN(this.duration))return;if(this.dataset.played)return;this.dataset.played='1';this.removeEventListener('progress',App.videoPlayingListener);App.addControlToVideoEl({video:this,duration:this.duration});},getModalBox:function(){var modalBox=document.querySelector('.imdr_modal');if(!modalBox){modalBox=document.createElement('div');modalBox.className='imdr_modal';modalBox.innerHTML='<div class="ext_modal_content"></div>';document.querySelector('body').appendChild(modalBox);modalBox.opened=0;}
var btnContinue,btnCancel,btnEnough,btnDelete,checkBox,closeBtn,btnOk,progressBar,progressText,btnAddPhotoToProfile,btnAddPhotoToStories,btnShowPostLiveUser,btnShowStoriesUser;var allListeners=[];function modalClose(){checkBox=modalBox.querySelector('#ext_modal_checkbox');if(checkBox&&checkBox.checked){globalUtils.sendMessage('warningOff');}
removeListeners();modalBox.opened=0;modalBox.remove();document.body.classList.remove('imdr-scroll-hidden');}
function onContinueBtnClick(cb){return function(){modalClose();cb();}}
function onUploadToProfileClick(cb){return function(){modalClose();cb();}}
function onUploadToStoriesClick(cb){return function(){modalClose();cb();}}
function onShowPostLiveUserClick(cb){return function(){modalClose();cb();}}
function onShowStoriesUserClick(cb){return function(){modalClose();cb();}}
function onDeleteConfirmBtnClick(cb){return function(){cb(modalBox);}}
function onEnoughBtnClick(cb){return function(){modalClose();cb();}}
function onCancelBtnClick(cb){return function(){modalClose();StoriesModule.storiesPause.off();if(typeof cb=='function'){cb();}};}
function closeByClickOnWindow(event){if(event.target==modalBox){modalClose();}}
function addListener(el,event,listener){if(el&&event&&listener){el.addEventListener(event,listener);allListeners.push({el:el,event:event,listener:listener});}}
function removeListeners(){allListeners.forEach(function(item){if(item.el&&item.event&&item.listener){item.el.removeEventListener(item.event,item.listener);}});window.removeEventListener('click',closeByClickOnWindow);}
function addListeners(listeners){btnContinue=modalBox.querySelector('.ext_btn_continue');btnCancel=modalBox.querySelector('.ext_btn_cancel');closeBtn=modalBox.querySelector('.ext_modal_close');btnOk=modalBox.querySelector('.ext_btn_ok');btnEnough=modalBox.querySelector('.ext_btn_enough');btnAddPhotoToProfile=modalBox.querySelector('.upload_to_profile_btn');btnAddPhotoToStories=modalBox.querySelector('.upload_to_stories_btn');btnShowPostLiveUser=modalBox.querySelector('.show_post_live_user_btn');btnShowStoriesUser=modalBox.querySelector('.show_stories_user_btn');btnDelete=modalBox.querySelector('.imdr_delete_post_btn');if(listeners){if(typeof listeners.continueCallback=='function'&&btnContinue){addListener(btnContinue,'click',onContinueBtnClick(listeners.continueCallback));}
if(typeof listeners.continueDelCallback=='function'&&btnDelete){addListener(btnDelete,'click',onDeleteConfirmBtnClick(listeners.continueDelCallback));}
if(typeof listeners.enoughCallback=='function'&&btnEnough){addListener(btnEnough,'click',onEnoughBtnClick(listeners.enoughCallback));}
if(typeof listeners.toProfileCallback=='function'&&btnAddPhotoToProfile){addListener(btnAddPhotoToProfile,'click',onUploadToProfileClick(listeners.toProfileCallback));}
if(typeof listeners.toStoriesCallback=='function'&&btnAddPhotoToStories){addListener(btnAddPhotoToStories,'click',onUploadToStoriesClick(listeners.toStoriesCallback));}
if(typeof listeners.showPostLiveCallback=='function'&&btnShowPostLiveUser){addListener(btnShowPostLiveUser,'click',onShowPostLiveUserClick(listeners.showPostLiveCallback));}
if(typeof listeners.showStoriesCallback=='function'&&btnShowStoriesUser){addListener(btnShowStoriesUser,'click',onShowStoriesUserClick(listeners.showStoriesCallback));}
if(typeof listeners.successUploadedStoryCallback=='function'&&btnOk){addListener(btnOk,'click',onShowStoriesUserClick(listeners.successUploadedStoryCallback));}}
addListener(btnCancel,'click',onCancelBtnClick(listeners&&listeners.cancelCallback));addListener(closeBtn,'click',onCancelBtnClick(listeners&&listeners.cancelCallback));}
function alignButtonsWidth(){modalBox.style.display='block';document.body.classList.add('imdr-scroll-hidden');setTimeout(function(){var maxWidth=0;var $buttons=$('.ext_modal_buttons_wrap button');$buttons.each(function(i,item){if(item.offsetWidth>maxWidth){maxWidth=item.offsetWidth;}});if(maxWidth>0){$buttons.css({width:maxWidth+'px',})}
$('.ext_modal_content').css({opacity:1});modalBox.opened=1;},100);}
modalBox.close=function(){modalClose();};modalBox.showDownloadAllWarning=function(listeners){modalBox.innerHTML='<div class="ext_modal_content"></div>';var modalContent=modalBox.querySelector('.ext_modal_content');modalContent.innerHTML=`<div class="ext_modal_header">${UtilsModule.getLang('download_more_100_warning')}</div>
      <div class="ext_modal_buttons_wrap imdr_align_right">
       <button class="ext_btn_continue">${UtilsModule.getLang('btn_continue').toUpperCase()}</button>
       <button class="ext_btn_cancel">${UtilsModule.getLang('btn_cancel').toUpperCase()}</button>
      </div>
      <div class="imdr_modal_footer">
       <input type="checkbox" id="ext_modal_checkbox">
       <label for="ext_modal_checkbox">${UtilsModule.getLang('do_not_show_again')}</label>
      </div>`;modalContent.style.maxWidth='460px';addListeners(listeners);window.addEventListener('click',closeByClickOnWindow);alignButtonsWidth();};modalBox.showDeleteWarning=function(listeners){modalBox.innerHTML='<div class="ext_modal_content"></div>';var modalContent=modalBox.querySelector('.ext_modal_content');modalContent.innerHTML=`<div class="ext_modal_header">${UtilsModule.getLang('delete_post')}</div>
      <div class="ext_modal_header2">${UtilsModule.getLang('are_you_sure_delete')}</div>
      <div class="ext_modal_buttons_wrap imdr_align_right">
       <button class="imdr_delete_post_btn">${UtilsModule.getLang('delete').toUpperCase()}</button>
       <button class="ext_btn_cancel">${UtilsModule.getLang('btn_cancel').toUpperCase()}</button>
      </div>`;modalContent.style.maxWidth='460px';addListeners(listeners);window.addEventListener('click',closeByClickOnWindow);alignButtonsWidth();};modalBox.showUploadChoice=function(listeners){modalBox.innerHTML='<div class="ext_modal_content"></div>';var modalContent=modalBox.querySelector('.ext_modal_content');modalContent.innerHTML=`<div class="ext_modal_header">${UtilsModule.getLang('upload_photo_header')}</div>
      <div class="ext_modal_buttons_wrap">
       <button class="upload_to_profile_btn">${UtilsModule.getLang('upload_to_profile')}</button>
       <span class="element_or">${UtilsModule.getLang('or')}</span>
       <button class="upload_to_stories_btn">${UtilsModule.getLang('upload_to_stories')}</button>
      </div>
      <div class="upload_by_mobile_mode">
       <a href=""><span class="icon"></span><span class="text">${UtilsModule.getLang('upload_by_mobile_mode')}</span></a>
      </div>`;modalContent.style.maxWidth='460px';addListeners(listeners);window.addEventListener('click',closeByClickOnWindow);alignButtonsWidth();};modalBox.showStoryTypeUserChoice=function(listeners){modalBox.innerHTML='<div class="ext_modal_content"></div>';var modalContent=modalBox.querySelector('.ext_modal_content');modalContent.innerHTML=`<span class="ext_modal_close">&times;</span>
      <div class="ext_modal_buttons_wrap">
       <button class="show_post_live_user_btn">${UtilsModule.getLang('show_post_live')}</button>
       <button class="show_stories_user_btn">${UtilsModule.getLang('show_stories')}</button>
      </div>`;addListeners(listeners);window.addEventListener('click',closeByClickOnWindow);alignButtonsWidth();};modalBox.showPrepareDownloadProcess=function(options,cb){var progressBarStart=options.bar_start||0;window.removeEventListener('click',closeByClickOnWindow);var modalContent=modalBox.querySelector('.ext_modal_content');if(!modalContent){modalBox.innerHTML='<div class="ext_modal_content"></div>';}
modalContent=modalBox.querySelector('.ext_modal_content');modalContent.innerHTML=`<div class="ext_modal_header">
       <span>${UtilsModule.getLang('prepare_zip_links')}...</span>
       <div class="imdr_counter"></div>
      </div>
      <div id="ext_progress"${(options.from_tagged ? 'class="ext_circle_progress"' : '')}>
       <div id="ext_bar"></div>
      </div>
      <div class="ext_modal_buttons_wrap imdr_one_btn_inside">
       <button class="ext_btn_cancel">${UtilsModule.getLang('btn_cancel').toUpperCase()}</button>
      </div>
      <div class="imdr_modal_footer">
       <div class="ext_dont_panic" style="display: none">'
        <span>${UtilsModule.getLang('waiting_response_for_virtual_scroll')}</span>
        <span class="ext_loader"></span>
       </div>
      </div>`;addListeners(cb);progressText=modalContent.querySelector('.imdr_counter');progressBar=modalBox.querySelector('#ext_bar');progressBar.style.width=progressBarStart+'%';if(options.from_tagged){modalContent.style.maxWidth='300px';modalContent.querySelector('.ext_btn_cancel').style.width='100%';}
else{modalContent.style.width='520px';}
alignButtonsWidth();};modalBox.showDownloadProcess=function(opts,cb){var modalContent=modalBox.querySelector('.ext_modal_content');if(!modalContent){modalBox.innerHTML='<div class="ext_modal_content"></div>';}
modalContent=modalBox.querySelector('.ext_modal_content');window.removeEventListener('click',closeByClickOnWindow);modalContent.innerHTML='<div class="ext_modal_header">'+'<span>'+UtilsModule.getLang('download_zip')+'...</span>'+'<div class="imdr_counter"></div>'+'</div>'+'<div id="ext_progress">'+'<div id="ext_bar"></div>'+'</div>'+'<div class="ext_modal_buttons_wrap imdr_align_right">'+'<button class="ext_btn_enough">'+UtilsModule.getLang('btn_enough').toUpperCase()+'</button>'+'<button class="ext_btn_cancel cancel_download">'+UtilsModule.getLang('btn_cancel').toUpperCase()+'</button>'+'</div>';progressText=modalContent.querySelector('.imdr_counter');progressBar=modalBox.querySelector('#ext_bar');progressText.innerText='0/'+opts.files_count+' '+chrome.i18n.getMessage('files');modalContent.style.width='520px';addListeners(cb);alignButtonsWidth();};modalBox.showZippingLoader=function(cb){window.removeEventListener('click',closeByClickOnWindow);var modalContent=modalBox.querySelector('.ext_modal_content');if(!modalContent){modalBox.innerHTML='<div class="ext_modal_content"></div>';}
modalContent=modalBox.querySelector('.ext_modal_content');modalContent.innerHTML=`<div class="ext_modal_header">
       <span>${UtilsModule.getLang('zipping_files')}...</span>
       <div class="imdr_counter"></div>
      </div>
      <div id="ext_progress">
       <div id="ext_bar"></div>
      </div>
      <div class="ext_modal_buttons_wrap imdr_one_btn_inside">
       <button class="ext_btn_cancel cancel_download ">${UtilsModule.getLang('btn_cancel').toUpperCase()}</button>
      </div>`;progressText=modalContent.querySelector('.imdr_counter');progressText.innerText='0%';progressBar=modalBox.querySelector('#ext_bar');progressBar.style.width='0%';modalContent.style.width='520px';addListeners(cb);};modalBox.updatePrepareDownloadProcess=function(options){if(options.from_tagged){if(options.counter_text){$('.imdr_counter').text(options.counter_text);}
return;}
var $doNotPanic=$('.ext_dont_panic');if(options.dont_panic){$doNotPanic.show();}
else{$doNotPanic.hide();}
if(options.no_progress){return;}
var value=options.oneValuePercent;var maxVal=options.maxValue||100;if(!progressBar.style.width){progressBar.style.width='0%';}
var oldVal=parseFloat(progressBar.style.width);var newVal=oldVal+value;if(newVal>maxVal){newVal=maxVal;}
progressBar.style.width=newVal+'%';};modalBox.updateDownloadZipProgressBar=function(options){if(options.from_tagged)return;if(!options.lastSuccess)return;progressText.innerText=options.successCount.toString()+'/'+options.allCount.toString()+' '+chrome.i18n.getMessage('files');var value=options.oneValuePercent;if(!progressBar.style.width){progressBar.style.width='0%';}
var oldVal=parseFloat(progressBar.style.width);var newVal=oldVal+value;if(newVal==100||newVal>100){newVal=100;}
progressBar.style.width=newVal+'%';};modalBox.updateZippingLoader=function(newVal){progressText.innerText=newVal+'%';progressBar.style.width=newVal+'%';};modalBox.showUploadedStorySuccessText=function(listeners){modalBox.innerHTML='<div class="ext_modal_content"></div>';var modalContent=modalBox.querySelector('.ext_modal_content');modalContent.innerHTML=`<div class="ext_modal_just_text_wrap"><span>${UtilsModule.getLang('story_is_added')}</span></div>
      <div class="ext_modal_buttons_wrap imdr_one_btn_inside">
       <button class="ext_btn_ok">${UtilsModule.getLang('btn_ok').toUpperCase()}</button>
      </div>`;modalContent.style.maxWidth='400px';addListeners(listeners);alignButtonsWidth();};modalBox.showErrorBox=function(errorText){var modalContent=modalBox.querySelector('.ext_modal_content');if(!modalContent){modalBox.innerHTML='<div class="ext_modal_content"></div>';}
modalContent=modalBox.querySelector('.ext_modal_content');modalContent.innerHTML=`<span class="ext_modal_close">&times;</span>
      <div class="ext_error_modal_wrap">
      <div class="ext_error_modal_text">${errorText}</div>
      </div>`;addListeners();window.addEventListener('click',closeByClickOnWindow);alignButtonsWidth();};modalBox.showUsersListSearch=function(listeners){var modalContent=modalBox.querySelector('.ext_modal_content');if(!modalContent){modalBox.innerHTML='<div class="ext_modal_content"></div>';}
modalContent=modalBox.querySelector('.ext_modal_content');modalContent.innerHTML=`<div class="ext_modal_header">
       <span>${UtilsModule.getLang('tag_people')}</span>
      </div>
      <span class="ext_modal_close">&times;</span>
      <div class="ext_users_search_wrap"></div>
      <div class="ext_users_search_list"></div>`;modalContent.style.width='400px';modalContent.style.padding='10px';addListeners(listeners);window.addEventListener('click',closeByClickOnWindow);alignButtonsWidth();};return modalBox;},getShortCode:function(mediaContainer){if(!(mediaContainer instanceof HTMLElement)){return null;}
if(mediaContainer.tagName.toLowerCase()=='a'){var a=mediaContainer;}
else{a=mediaContainer.querySelector('a[href^="/p/"], a[href^="/tv/"]');}
if(!a){return null;}
var shortCode=a.href.match(new RegExp('\\/p\\/([^/]+)'));if(!shortCode){shortCode=a.href.match(new RegExp('\\/tv\\/([^/]+)'));}
if(!shortCode){return null;}
shortCode=shortCode&&shortCode[1];return shortCode;},getUserSelfInfo:function(){var self=this;globalUtils.sendMessage('getCookies',function(cookies){if(!cookies||!cookies.ds_user_id){return;}
StoriesModule.requestOneUserTrayStories(cookies.ds_user_id,function(res){if(typeof res=='object'&&res.user&&res.user.username){self.authorizedUserName=res.user.username;}})});},getUserName:function(el,isMainPage){var userName=null;if(isMainPage||UtilsModule.isMainPage()){var article=$(el).closest('article').get(0);if(article){var userLink=article.querySelector('header > div + div a');userName=userLink&&userLink.getAttribute('href');userName=userName&&userName.replace(/\//g,'');}}
else if(UtilsModule.isSavedMedia()&&el){var alt=el.getAttribute('alt');if(alt){alt=alt.substr(0,50);alt=globalUtils.filename.modify(alt);userName=alt;}}
else{var userTitleWrap=document.querySelector('._mesn5 ._mainc ._o6mpc ._rf3jb');userName=userTitleWrap&&userTitleWrap.innerText;}
return userName;},}})();globalUtils.sendMessage('loadConfig',function(cfg){if(cfg.is_mobile){MobileApp.run();}
else{StoriesModule.visibleIsStories=!!cfg.ig_stories_visible;StoriesModule.prtnrExists=!!cfg.exist_prtnr;App.conflictStyles=!!cfg.exist_conflict;App.videoControlsEnabled=!!cfg.add_video_control;$(document).ready(function(){if(location.href.indexOf('instagram.com')>-1){if(!document.body){return;}
globalUtils.bridge({func:function(cb){var isMobile=navigator.userAgent.toLowerCase().indexOf('mobile')>-1;cb({is_mobile:isMobile});},cb:function(data){if(data&&data.is_mobile){return;}
App.run();}});}});}});})();