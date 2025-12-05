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
import{analytics as e}from"../../../common/analytics.js";import{loggingApi as r}from"../../../common/loggingApi.js";import{dcTabStorage as o}from"../tab-storage.js";const t=["createpdf","compresspdf"];export function sendFileBufferToViewerForDirectFlow(r,o,t,n){t.then(e=>{const t=e.downLoadEndTime,i=e.buffer,c=e.buffer.byteLength,a=e.mimeType,s=e.pdffilename||"document.doc";r.executeDirectVerb("executeDirectVerb",i,c,s,n,t,a,o.origin)}).catch(r=>{e.event("DCBrowserExt:Viewer:Error:DirectFlow:FileDownload:Failed")})}export async function handlePostPDFConversionInDirectFlow(e,r,t){o.setItem("acrobatPromotionWorkflow","preview"),r+=`?pdfurl=${encodeURIComponent(t)}&pdffilename=${encodeURIComponent(e.data.fileName)}`;const n=(await chrome.tabs.getCurrent())?.id;chrome.tabs.update(n,{url:r})}const n=()=>{chrome.runtime.sendMessage({main_op:"get-welcome-pdf-url"}).then(e=>{chrome.tabs.update({url:e})})};export async function previewOriginalPDF(){try{const e=o.getItem("search");if(e){o.setItem("acrobatPromotionWorkflow","preview");const r=new URLSearchParams(e);r.set("acrobatPromotionWorkflow","preview");const t=`${chrome.runtime.getURL("viewer.html")}?${r.toString()}`;chrome.tabs.update({url:t})}else n(),r.error({message:"[Compress PDF Direct Flow] Error in previewOriginalPDF. Missing 'search' parameter in tab storage",error:"originalSearch is null or undefined"})}catch(e){n(),r.error({message:"[Compress PDF Direct Flow] Error in previewOriginalPDF. Unexpected error while opening Acrobat preview viewer.",error:e})}}export const isDirectFlowWithoutPreview=()=>{const e=o.getItem("acrobatPromotionWorkflow");return t.includes(e)};export async function handleUpsellCloseInDirectFlow(e){t.includes(e?.data?.workflow)&&(o.removeItem("acrobatPromotionWorkflow"),"compresspdf"===e?.data?.workflow?previewOriginalPDF():n())}export function isPreviewPostDirectFlow(){return"preview"===o.getItem("acrobatPromotionWorkflow")}export function executeDirectVerb(e){try{let r=e.srcUrl;r=`${r}&acrobatPromotionSource=${e.promotionSource}`;const o=e.name,t=e.verb,n=`${e.viewerURL}?pdfurl=${encodeURIComponent(r)}&acrobatPromotionWorkflow=${t}&pdffilename=${encodeURIComponent(o)}`;chrome.tabs.create({url:n,active:!0})}catch(e){r.error({message:"Error executing direct verb"})}}