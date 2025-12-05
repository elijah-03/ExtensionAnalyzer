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
import{floodgate as o}from"./floodgate.js";import{dcLocalStorage as t}from"../common/local-storage.js";import{setExperimentCodeForAnalytics as e,removeExperimentCodeForAnalytics as s}from"../common/experimentUtils.js";import{checkUserLocaleEnabled as i,safeParseFeatureFlag as n}from"./gsuite/util.js";import{util as l}from"./util.js";async function r(r){const[a,m]=await Promise.all([o.hasFlag("dc-cv-gmail-compress-pdf-touch-point"),o.hasFlag("dc-cv-gmail-compress-pdf-touch-point-control")]);let c;a?c=n("dc-cv-gmail-compress-pdf-touch-point"):m&&(c=n("dc-cv-gmail-compress-pdf-touch-point-control"));const p=i(c?.enLocaleEnabled,c?.nonEnLocaleEnabled);a&&p?(s("GCOC"),e("GCO")):m&&p?(s("GCO"),e("GCOC")):(s("GCO"),s("GCOC"));const g=c?.selectors||{},C=c?.tooltip||{},T=c?.enableCompressPDFFteTooltip||!1,u="false"===t.getItem("acrobat-touch-points-in-other-surfaces");r({enableGmailCompressPDFTouchPoint:a&&!u&&p,selectors:g,compressPDFString:l.getTranslation("gmailCompressPDFTouchPoint"),fteToolTipStrings:{title:l.getTranslation("gmailCompressPDFTouchPointFTEHeader"),description:l.getTranslation("gmailCompressPDFTouchPointFTEDescription"),button:l.getTranslation("closeButton")},enableGmailCompressPDFFteTooltip:T,gmailCompressPDFFteConfig:C,gmailCompressPDFOnHoverTooltip:l.getTranslation("gmailCompressPDFTouchPointOnHoverTooltip")})}export{r as gmailCompressPDFInit};