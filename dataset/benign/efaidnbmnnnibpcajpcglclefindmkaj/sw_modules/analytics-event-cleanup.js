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
import{dcLocalStorage as e}from"../common/local-storage.js";import{removeExperimentCodeForAnalytics as o}from"../common/experimentUtils.js";const r=["DCBrowserExt:OneNote:Visited","DCBrowserExt:DocsGoogle:Visited:Document","DCBrowserExt:DocsGoogle:Visited:Spreadsheet","DCBrowserExt:DocsGoogle:Visited:Presentation"],t=["GDTT","GDTF","GDCF"],s=()=>{((o=[])=>{Array.isArray(o)&&0!==o.length&&o.forEach(o=>{e.getItem(o)&&e.removeItem(o)})})(r),((e=[])=>{Array.isArray(e)&&0!==e.length&&e.forEach(e=>{o(e)})})(t)};export{s as clearEventsFromLocalStorage};