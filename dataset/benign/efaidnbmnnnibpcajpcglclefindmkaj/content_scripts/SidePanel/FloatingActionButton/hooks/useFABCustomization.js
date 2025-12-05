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
import{useEffect}from"react";export const useFABCustomization=(e,i,t)=>{useEffect(()=>{const o=setTimeout(async()=>{await initDcLocalStorage();const o=await chrome.runtime.sendMessage({main_op:"getFloodgateFlag",flag:"dc-sp-fab-behaviour-exp-opacity"}),n=o?"Opacity":"Visibility";window.dcLocalStorage.setItem("fabVariant",n);const s=i?t:250;o?customizeFABOpacity(e,s):customizeFABVisibility(e,s)},i?t:250);return()=>clearTimeout(o)},[e,i,t])};const customizeFABOpacity=e=>{let i,t;document.addEventListener("scroll",()=>{e.makeFABTransparent(),t&&clearTimeout(t),t=setTimeout(()=>{e.cursorXPosition>.8*window.innerWidth&&e.makeFABOpaque(),t=void 0},50)}),document.addEventListener("mousemove",async t=>{if(e.cursorXPosition=t.clientX,e.cursorXPosition>.8*window.innerWidth){if(i)return;i=setTimeout(async()=>{if("undefined"!=typeof GenAIWebpageEligibilityService){await GenAIWebpageEligibilityService.shouldShowTouchpoints()&&e.makeFABOpaque()}i=void 0},200)}else i&&(clearTimeout(i),i=void 0)})},customizeFABVisibility=e=>{let i;const t=()=>{if(e.enableFabDrag&&""!==e.fabDraggedTop)return document.removeEventListener("mousemove",o),void document.removeEventListener("scroll",t);e.isFABRendered()&&e.cursorYPosition<=.6*window.innerHeight&&e.removeFAB()},o=async t=>{if(e.cursorYPosition=t.clientY,!e.isFABRendered()&&e.cursorYPosition>.6*window.innerHeight){if(i)return;i=setTimeout(async()=>{if("undefined"!=typeof GenAIWebpageEligibilityService){await GenAIWebpageEligibilityService.shouldShowTouchpoints()&&e.renderFAB({fadeIn:!0})}i=void 0},200)}else i&&(clearTimeout(i),i=void 0)};document.addEventListener("scroll",t),document.addEventListener("mousemove",o)};