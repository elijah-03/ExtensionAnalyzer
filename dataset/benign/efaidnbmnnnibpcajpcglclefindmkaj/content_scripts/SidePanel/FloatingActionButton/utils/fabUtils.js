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
export const sendAnalyticsEvent=e=>{try{"function"==typeof sendDCAnalyticsEvent&&sendDCAnalyticsEvent(e)}catch(e){console.error("[FAB Utils] Analytics event error:",e)}};export const shouldDisableTouchpoints=async()=>"undefined"!=typeof GenAIWebpageEligibilityService&&await GenAIWebpageEligibilityService.shouldDisableTouchpoints();export const openSidePanel=e=>{sendAnalyticsEvent([[`DCBrowserExt:SidePanel:${e}:Clicked`]]),chrome.runtime.sendMessage({type:"open_side_panel",touchpoint:e})};export const openQnAPanel=()=>{window.initialQuestion=void 0,openSidePanel("FABPill:AskAI")};export const openSummarizeWebpage=()=>{window.initialQuestion="Give me a summary of this webpage",openSidePanel("FABPill:Summarize")};