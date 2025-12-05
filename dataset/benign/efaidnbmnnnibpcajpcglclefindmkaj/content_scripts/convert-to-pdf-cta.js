/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2015 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property laws,
* including trade secret and or copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
import expressUtils from"./express/express-utils.js";import state from"./gmail/state.js";class ConvertToPdfCTA{ENTRY_POINT_DIV_WRAPPER_CLASS="cc440d50ba-express-entrypoint-wrapper";constructor(){this.ready=this.init()}async init(){await fetch(chrome.runtime.getURL("resources/convertToPdfCTA.html")).then(t=>t.text()).then(t=>{this.htmlData=t}),await expressUtils.addFontToDocument()}async renderMenuButton(t,e,s={}){await this.ready,this.surface=e;const r="convertToPdf",o=document.createElement("div");o.innerHTML=this.htmlData,o.className=`${e} ${this.ENTRY_POINT_DIV_WRAPPER_CLASS}`,expressUtils.sendAnalyticsEvent([["DCBrowserExt:DirectVerb:CTA:Shown",{source:e,workflow:r,eventContext:state.expressState.mimeType}]]);const n=o.getElementsByClassName("acrobat-covert-to-pdf-native-viewer-touch-point")[0];n.onclick=s=>{s.stopPropagation(),expressUtils.sendAnalyticsEvent([["DCBrowserExt:DirectVerb:CTA:Clicked",{source:e,workflow:r,eventContext:state.expressState.mimeType}]]),t(r)};const a=s.iconUrl||chrome.runtime.getURL("browser/images/acrobat_prodc_appicon_24.svg"),i=n.getElementsByClassName("acrobat-icon")[0];return i&&(i.src=a),util.translateElements(".translate",o),this.button=n,o}}export default ConvertToPdfCTA;