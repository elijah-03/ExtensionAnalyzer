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
import{useState,useEffect,useCallback,useRef}from"react";import{sendAnalyticsEvent}from"../utils/fabUtils";export const useFABDrag=({containerRef:e,iframeRef:a,fabManager:t,isDraggedRef:r,onDragStart:n})=>{const[o,s]=useState(t.fabDraggedTop||null),[g,i]=useState(!1),u=useRef(0);useEffect(()=>{t.enableFabDrag&&t.fabDraggedTop&&s(t.fabDraggedTop)},[t.enableFabDrag,t.fabDraggedTop]);const c=useCallback(a=>{if(!t.enableFabDrag)return;if(0!==a.button||a.ctrlKey)return;a.stopPropagation(),a.preventDefault(),i(!0),t.isFABActiveForDrag=!0,r.current=!1,n?.();const o=e.current;if(o){const e=o.getBoundingClientRect();u.current=a.clientY-e.top}},[t,r,n,e]),l=useCallback(a=>{if(!g&&!t.isFABActiveForDrag)return;const n=e.current;if(!n)return;r.current=!0;let o=a.clientY-u.current;const i=n.offsetHeight,c=window.innerHeight-i-20;o=Math.max(20,Math.min(c,o)),t.fabDraggedTop=o,s(o)},[g,t,r,e]),b=useCallback(()=>{(g||t.isFABActiveForDrag)&&(i(!1),t.isFABActiveForDrag=!1,r.current&&(window.dcLocalStorage.setItem("genAIFabTopPosition",t.fabDraggedTop),sendAnalyticsEvent([["DCBrowserExt:SidePanel:FabIcon:Dragged"]]),chrome.runtime.sendMessage({main_op:"log-info",log:{message:"FAB dragged",fabTop:`${t.fabDraggedTop}px`}})))},[g,t,r]);useEffect(()=>{if(t.enableFabDrag)return document.addEventListener("mousemove",l),document.addEventListener("mouseup",b),()=>{document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",b)}},[t.enableFabDrag,l,b]);return{fabTop:o,handleDragHandleMouseDown:useCallback(e=>{t.enableFabDrag&&c(e)},[t.enableFabDrag,c]),handleIconMouseDown:useCallback(e=>{t.enableFabDrag&&c(e)},[t.enableFabDrag,c]),isFABActiveForDrag:g}};