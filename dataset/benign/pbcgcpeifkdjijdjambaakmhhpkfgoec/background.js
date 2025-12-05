/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 842:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Copyright (c) 2023 Andrea Cardaci <cyrus.and@gmail.com>
 * https://github.com/cyrus-and/chrome-har-capturer/
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HARBuilder = void 0;
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
class HARBuilder {
    create(pages, domain) {
        // HAR template
        const har = {
            log: {
                version: '1.2',
                creator: {
                    name: 'HAR Recorder',
                    version: '1.5',
                    comment: 'Records network request and generates HAR file.'
                },
                pages: [],
                entries: []
            }
        };
        // fill the HAR template each page info
        for (const [pageIndex, stats] of pages.entries()) {
            const pageId = `page_${pageIndex + 1}_${String(Math.random()).slice(2)}`;
            const log = this.parsePage(String(pageId), stats, domain);
            har.log.pages.push(log.page);
            har.log.entries.push(...log.entries);
        }
        return har;
    }
    parsePage(pageId, stats, domain) {
        var _a, _b;
        // page load started at
        //const firstRequest = stats.entries.get(stats.firstRequestId).requestParams;
        //const wallTimeMs = firstRequest.wallTime * 1000;
        //const startedDateTime = new Date(wallTimeMs).toISOString();
        // page timings
        //const onContentLoad = stats.domContentEventFiredMs - stats.firstRequestMs;
        //const onLoad = stats.loadEventFiredMs - stats.firstRequestMs;
        let startedDateTime = new Date().toISOString();
        const onContentLoad = 0;
        const onLoad = 0;
        // process this page load entries
        const entries = [...Object.values(stats.entries)]
            .map((entry) => this.parseEntry(pageId, entry))
            .filter((entry) => entry);
        if ((_a = entries === null || entries === void 0 ? void 0 : entries[0]) === null || _a === void 0 ? void 0 : _a.startedDateTime) {
            startedDateTime = (_b = entries === null || entries === void 0 ? void 0 : entries[0]) === null || _b === void 0 ? void 0 : _b.startedDateTime;
        }
        // outcome
        return {
            page: {
                id: pageId,
                title: domain,
                startedDateTime,
                pageTimings: {
                    onContentLoad,
                    onLoad
                },
                _user: stats.user
            },
            entries
        };
    }
    parseEntry(pageref, entry) {
        // skip requests without response (requestParams is always present; except
        // for WebSockets see Stats._Network_webSocketClosed)
        if (!entry.responseParams || (!entry.isWebSocket && !entry.responseFinishedS && !entry.responseFailedS)) {
            return null;
        }
        // skip entries without timing information (doc says optional)
        if (!entry.isWebSocket && !entry.responseParams.response.timing) {
            return null;
        }
        // extract common fields
        const { request } = entry.requestParams;
        const { response } = entry.responseParams;
        // fix WebSocket values since the protocol provides incomplete information
        if (entry.isWebSocket) {
            const requestStatus = entry.responseParams.response.requestHeadersText.split(' ');
            request.method = requestStatus[0];
            request.url = requestStatus[1];
            response.protocol = entry.responseParams.response.headersText.split(' ')[0];
        }
        // entry started
        const wallTimeMs = entry.requestParams.wallTime * 1000;
        const startedDateTime = new Date(wallTimeMs).toISOString();
        // HTTP version or protocol name (e.g., quic)
        const httpVersion = response.protocol || 'unknown';
        // request/response status
        const { method, url } = request;
        const { status, statusText } = response;
        // parse and measure headers
        const headers = this.parseHeaders(httpVersion, request, response);
        // check for redirections
        const redirectURL = this.getHeaderValue(response.headers, 'location', '');
        // parse query string
        const queryString = this.parseQueryString(request.url);
        // parse post data
        const postData = this.parsePostData(request, headers);
        // compute entry timings
        const { time, timings } = this.computeTimings(entry);
        // fetch connection information (strip IPv6 [...])
        let serverIPAddress = response.remoteIPAddress;
        if (serverIPAddress) {
            serverIPAddress = serverIPAddress.replace(/^\[(.*)\]$/, '$1');
        }
        const connection = String(response.connectionId);
        // fetch entry initiator
        const _initiator = entry.requestParams.initiator;
        // fetch resource priority
        const { changedPriority } = entry;
        const newPriority = changedPriority && changedPriority.newPriority;
        const _priority = newPriority || request.initialPriority;
        let _resourceType = entry.requestParams.type ? entry.requestParams.type.toLowerCase() : undefined;
        // parse and measure payloads
        const payload = this.computePayload(entry, headers);
        const { mimeType } = response;
        const encoding = entry.responseBodyIsBase64 ? 'base64' : undefined;
        // add WebSocket frames
        let _webSocketMessages;
        if (entry.isWebSocket) {
            _webSocketMessages = entry.frames;
            _resourceType = 'websocket';
        }
        // fill entry
        return {
            pageref,
            startedDateTime,
            time,
            request: {
                method,
                url,
                httpVersion,
                cookies: [],
                headers: headers.request.pairs,
                queryString,
                headersSize: headers.request.size,
                bodySize: payload.request.bodySize,
                postData
            },
            response: {
                status,
                statusText,
                httpVersion,
                cookies: [],
                headers: headers.response.pairs,
                redirectURL,
                headersSize: headers.response.size,
                bodySize: payload.response.bodySize,
                _transferSize: payload.response.transferSize,
                content: {
                    size: entry.responseLength,
                    mimeType: entry.isWebSocket ? 'x-unknown' : mimeType,
                    compression: payload.response.compression,
                    text: entry.responseBody,
                    encoding
                }
            },
            cache: {},
            _fromDiskCache: response.fromDiskCache,
            timings,
            serverIPAddress,
            connection,
            _initiator,
            _priority,
            _webSocketMessages,
            _resourceType
        };
    }
    parseHeaders(httpVersion, request, response) {
        // convert headers from map to pairs
        const requestHeaders = response.requestHeaders || request.headers;
        const responseHeaders = response.headers;
        const headers = {
            request: {
                map: requestHeaders,
                pairs: this.zipNameValue(requestHeaders),
                size: -1
            },
            response: {
                map: responseHeaders,
                pairs: this.zipNameValue(responseHeaders),
                size: -1
            }
        };
        // estimate the header size (including HTTP status line) according to the
        // protocol (this information not available due to possible compression in
        // newer versions of HTTP)
        if (httpVersion.match(/^http\/[01].[01]$/)) {
            const requestText = this.getRawRequest(request, headers.request.pairs);
            const responseText = this.getRawResponse(response, headers.response.pairs);
            headers.request.size = requestText.length;
            headers.response.size = responseText.length;
        }
        return headers;
    }
    computeTimings(entry) {
        // handle the websocket case specially
        if (entry.isWebSocket) {
            // from initial request to the last frame, this is obviously an
            // approximation, but HAR does not directly support WebSockets
            const sessionTime = entry.frames.length === 0
                ? -1
                : this.toMilliseconds(entry.frames[entry.frames.length - 1].time - entry.requestParams.timestamp);
            return {
                time: sessionTime,
                timings: {
                    blocked: -1,
                    dns: -1,
                    connect: -1,
                    send: 0,
                    wait: sessionTime,
                    receive: -1,
                    ssl: -1
                }
            };
        }
        // see https://github.com/ChromeDevTools/devtools-frontend/blob/29fab47578afb1ead4eb63414ec30cada4814b62/front_end/sdk/HARLog.js#L255-L329
        const timing = entry.responseParams.response.timing;
        // compute the total duration (including blocking time)
        const finishedTimestamp = entry.responseFinishedS || entry.responseFailedS;
        const time = this.toMilliseconds(finishedTimestamp - entry.requestParams.timestamp);
        // compute individual components
        const blockedBase = this.toMilliseconds(timing.requestTime - entry.requestParams.timestamp);
        const blockedStart = this.firstNonNegative([timing.dnsStart, timing.connectStart, timing.sendStart]);
        const blocked = blockedBase + (blockedStart === -1 ? 0 : blockedStart);
        let dns = -1;
        if (timing.dnsStart >= 0) {
            const start = this.firstNonNegative([timing.connectStart, timing.sendStart]);
            dns = start - timing.dnsStart;
        }
        let connect = -1;
        if (timing.connectStart >= 0) {
            connect = timing.sendStart - timing.connectStart;
        }
        const send = timing.sendEnd - timing.sendStart;
        const wait = timing.receiveHeadersEnd - timing.sendEnd;
        const receive = this.toMilliseconds(finishedTimestamp - (timing.requestTime + timing.receiveHeadersEnd / 1000));
        let ssl = -1;
        if (timing.sslStart >= 0 && timing.sslEnd >= 0) {
            ssl = timing.sslEnd - timing.sslStart;
        }
        return {
            time,
            timings: { blocked, dns, connect, send, wait, receive, ssl }
        };
    }
    computePayload(entry, headers) {
        // From Chrome:
        //  - responseHeaders.size: size of the headers if available (otherwise
        //    -1, e.g., HTTP/2)
        //  - entry.responseLength: actual *decoded* body size
        //  - entry.encodedResponseLength: total on-the-wire data
        //
        // To HAR:
        //  - headersSize: size of the headers if available (otherwise -1, e.g.,
        //    HTTP/2)
        //  - bodySize: *encoded* body size
        //  - _transferSize: total on-the-wire data
        //  - content.size: *decoded* body size
        //  - content.compression: *decoded* body size - *encoded* body size
        let bodySize;
        let compression;
        let transferSize = entry.encodedResponseLength;
        if (headers.response.size === -1) {
            // if the headers size is not available (e.g., newer versions of
            // HTTP) then there is no way (?) to figure out the encoded body
            // size (see #27)
            bodySize = -1;
            compression = undefined;
        }
        else if (entry.responseFailedS) {
            // for failed requests (`Network.loadingFailed`) the transferSize is
            // just the header size, since that evend does not hold the
            // `encodedDataLength` field, this is performed manually (however this
            // cannot be done for HTTP/2 which is handled by the above if)
            bodySize = 0;
            compression = 0;
            transferSize = headers.response.size;
        }
        else {
            // otherwise the encoded body size can be obtained as follows
            bodySize = entry.encodedResponseLength - headers.response.size;
            compression = entry.responseLength - bodySize;
        }
        return {
            request: {
                // trivial case for request
                bodySize: parseInt(this.getHeaderValue(headers.request.map, 'content-length', -1), 10)
            },
            response: {
                bodySize,
                transferSize,
                compression
            }
        };
    }
    zipNameValue(map) {
        const pairs = [];
        for (const [name, value] of Object.entries(map)) {
            // insert multiple pairs if the key is repeated
            const values = Array.isArray(value) ? value : [value];
            for (const value of values) {
                pairs.push({ name, value });
            }
        }
        return pairs;
    }
    parseQuery(query) {
        var _a;
        let mapQueryString = (_a = query.split('&')) === null || _a === void 0 ? void 0 : _a.map(function (nameValue) {
            let nameValuePair = nameValue.split('=').map(decodeURIComponent);
            return { [nameValuePair[0]]: nameValuePair[1] };
        });
        return mapQueryString;
    }
    getRawRequest(request, headerPairs) {
        const { method, url, protocol } = request;
        const lines = [`${method} ${url} ${protocol}`];
        for (const { name, value } of headerPairs) {
            lines.push(`${name}: ${value}`);
        }
        lines.push('', '');
        return lines.join('\r\n');
    }
    getRawResponse(response, headerPairs) {
        const { status, statusText, protocol } = response;
        const lines = [`${protocol} ${status} ${statusText}`];
        for (const { name, value } of headerPairs) {
            lines.push(`${name}: ${value}`);
        }
        lines.push('', '');
        return lines.join('\r\n');
    }
    getHeaderValue(headers, name, fallback) {
        const pattern = new RegExp(`^${name}$`, 'i');
        const key = Object.keys(headers).find((name) => {
            return name.match(pattern);
        });
        return key === undefined ? fallback : headers[key];
    }
    parseQueryString(requestUrl) {
        const url = new URL(requestUrl);
        let map = {};
        for (const pair of url.searchParams.entries()) {
            map = Object.assign(Object.assign({}, map), { [pair[0]]: pair[1] });
        }
        return this.zipNameValue(map);
    }
    parsePostData(request, headers) {
        const { postData } = request;
        if (!postData) {
            return undefined;
        }
        const mimeType = this.getHeaderValue(headers.request.map, 'content-type');
        const params = mimeType === 'application/x-www-form-urlencoded' ? this.zipNameValue(this.parseQuery(postData)) : [];
        return {
            mimeType,
            params,
            text: postData
        };
    }
    firstNonNegative(values) {
        const value = values.find((value) => value >= 0);
        return value === undefined ? -1 : value;
    }
    toMilliseconds(time) {
        return time < 0 ? -1 : time * 1000;
    }
}
exports.HARBuilder = HARBuilder;


/***/ }),

/***/ 914:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Copyright (c) 2023 Andrea Cardaci <cyrus.and@gmail.com>
 * https://github.com/cyrus-and/chrome-har-capturer/
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatsBuilder = exports.Stats = void 0;
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
class Stats {
    constructor(url, options) {
        this._options = options;
        this._responseBodyCounter = 0;
        this.url = url;
        this.firstRequestId = undefined;
        this.firstRequestMs = undefined;
        this.domContentEventFiredMs = undefined;
        this.loadEventFiredMs = undefined;
        this.entries = new Map();
        this.user = undefined; // filled from outside
    }
}
exports.Stats = Stats;
class StatsBuilder {
    static processEvent(stats, { method, params }) {
        const methodName = `_${method.replace('.', '_')}`;
        const handler = StatsBuilder[methodName];
        if (handler) {
            handler(stats, params);
        }
    }
    static _Page_domContentEventFired(stats, params) {
        const { timestamp } = params;
        stats.domContentEventFiredMs = timestamp * 1000;
    }
    static _Page_loadEventFired(stats, params) {
        const { timestamp } = params;
        stats.loadEventFiredMs = timestamp * 1000;
    }
    static _Network_requestWillBeSent(stats, params) {
        const { requestId, initiator, timestamp, redirectResponse } = params;
        // skip data URI
        if (params.request.url.match('^data:')) {
            return;
        }
        // the first is the first request
        if (!stats.firstRequestId && initiator.type === 'other') {
            stats.firstRequestMs = timestamp * 1000;
            stats.firstRequestId = requestId;
        }
        // redirect responses are delivered along the next request
        if (redirectResponse) {
            const redirectEntry = stats.entries[requestId];
            // craft a synthetic response params
            redirectEntry.responseParams = {
                response: redirectResponse
            };
            // set the redirect response finished when the redirect
            // request *will be sent* (this may be an approximation)
            redirectEntry.responseFinishedS = timestamp;
            redirectEntry.encodedResponseLength = redirectResponse.encodedDataLength;
            // since Chrome uses the same request id for all the
            // redirect requests, it is necessary to disambiguate
            const newId = requestId + '_redirect_' + timestamp;
            // rename the previous metadata entry
            stats.entries[newId] = redirectEntry;
            delete stats.entries[requestId];
        }
        // initialize this entry
        stats.entries[requestId] = {
            requestParams: params,
            responseParams: undefined,
            responseLength: 0,
            encodedResponseLength: undefined,
            responseFinishedS: undefined,
            responseBody: undefined,
            responseBodyIsBase64: undefined,
            newPriority: undefined
        };
    }
    static _Network_dataReceived(stats, params) {
        const { requestId, dataLength } = params;
        const entry = stats.entries[requestId];
        if (!entry) {
            return;
        }
        entry.responseLength += dataLength;
    }
    static _Network_responseReceived(stats, params) {
        const entry = stats.entries[params.requestId];
        if (!entry) {
            return;
        }
        entry.responseParams = params;
    }
    static _Network_resourceChangedPriority(stats, params) {
        const { requestId, newPriority } = params;
        const entry = stats.entries[requestId];
        if (!entry) {
            return;
        }
        entry.newPriority = newPriority;
    }
    static _Network_loadingFinished(stats, params) {
        const { requestId, timestamp, encodedDataLength } = params;
        const entry = stats.entries[requestId];
        if (!entry) {
            return;
        }
        entry.encodedResponseLength = encodedDataLength;
        entry.responseFinishedS = timestamp;
        // check termination condition
        stats._responseBodyCounter++;
    }
    static _Network_loadingFailed(stats, params) {
        const { requestId, errorText, canceled, timestamp } = params;
        const entry = stats.entries[requestId];
        if (!entry) {
            return;
        }
        entry.responseFailedS = timestamp;
    }
    static _Network_getResponseBody(stats, params) {
        const { requestId, body, base64Encoded } = params;
        const entry = stats.entries[requestId];
        if (!entry) {
            return;
        }
        entry.responseBody = body;
        entry.responseBodyIsBase64 = base64Encoded;
        // check termination condition
        stats._responseBodyCounter--;
    }
    static _Network_webSocketWillSendHandshakeRequest(stats, params) {
        // initialize this entry (copied from requestWillbesent)
        stats.entries[params.requestId] = {
            isWebSocket: true,
            frames: [],
            requestParams: params,
            responseParams: undefined,
            responseLength: 0,
            encodedResponseLength: undefined,
            responseFinishedS: undefined,
            responseBody: undefined,
            responseBodyIsBase64: undefined,
            newPriority: undefined
        };
    }
    static _Network_webSocketHandshakeResponseReceived(stats, params) {
        // reuse the general handler
        StatsBuilder._Network_responseReceived(stats, params);
    }
    static _Network_webSocketClosed(stats, params) {
        const { requestId, timestamp } = params;
        const entry = stats.entries[requestId];
        if (!entry) {
            return;
        }
        // XXX keep track of the whole WebSocket session duration, failure to
        // receive this message though must not discard the entry since the page
        // loading event may happen well before the actual WebSocket termination
        entry.responseFinishedS = timestamp;
    }
    static _Network_webSocketFrameSent(stats, params) {
        const { requestId, timestamp, response } = params;
        const entry = stats.entries[requestId];
        if (!entry) {
            return;
        }
        entry.frames.push({
            type: 'send',
            time: timestamp,
            opcode: response.opcode,
            data: response.payloadData
        });
    }
    static _Network_webSocketFrameReceived(stats, params) {
        const { requestId, timestamp, response } = params;
        const entry = stats.entries[requestId];
        if (!entry) {
            return;
        }
        entry.frames.push({
            type: 'receive',
            time: timestamp,
            opcode: response.opcode,
            data: response.payloadData
        });
    }
}
exports.StatsBuilder = StatsBuilder;


/***/ }),

/***/ 753:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// tslint:disable:no-console
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const stats_1 = __webpack_require__(914);
const har_1 = __webpack_require__(842);
const version = '1.0';
const TABS = {};
const handlers = {};
const HARS = {};
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { action, tab } = request;
    if (action === 'TOGGLE_RECORD') {
        toggleRecord(tab, sendResponse);
        return true;
    }
    if (action === 'GET_HAR') {
        const tabId = tab.id;
        sendResponse({ action: 'HAR_RECEIVED', data: HARS[tabId] });
        return true;
    }
});
chrome.runtime.onMessageExternal.addListener((request) => {
    const { action, tab } = request;
    if (action === 'SET_UPLOAD_PROGRESS') {
        const { progress, uploadNumber } = request.payload;
        setUploadProgress(tab.id, progress, uploadNumber);
    }
});
function toggleRecord(tab, sendResponse) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield chrome.storage.local.get(['tabs']);
        let newTabs = result.tabs;
        const tabId = tab.id;
        if (newTabs === null || newTabs === void 0 ? void 0 : newTabs[tabId]) {
            // @ts-ignore
            chrome.debugger.onEvent.removeListener(handlers[tabId]);
            chrome.debugger.detach({ tabId });
            try {
                const host = new URL(tab.url).host;
                const fileName = `${host}_${getTimeStamp()}.har`;
                HARS[tabId] = {
                    fileName,
                    fileContent: JSON.stringify(new har_1.HARBuilder().create([TABS[tabId]], host)),
                    uploadProgress: 0
                };
                sendResponse({ action: 'RECORD_FINISHED', data: { fileName } });
            }
            catch (error) {
                console.log(error);
            }
            delete newTabs[tabId];
            delete TABS[tabId];
            yield chrome.storage.local.set({ tabs: newTabs });
            console.log(`Remote debugging: Tab ${tabId} now unregistered.`);
        }
        else {
            //initialize the prop
            if (!newTabs) {
                newTabs = {};
            }
            const stats = new stats_1.Stats();
            TABS[tabId] = stats;
            newTabs[tabId] = true;
            delete HARS[tabId];
            chrome.storage.local.set({ tabs: newTabs });
            chrome.debugger.attach({ tabId }, version, onAttach.bind(null, tabId));
            chrome.debugger.sendCommand({ tabId }, 'Network.enable');
            handlers[tabId] = (debuggeeId, method, params) => __awaiter(this, void 0, void 0, function* () {
                stats_1.StatsBuilder.processEvent(stats, { method, params });
                TABS[tabId] = stats;
                if (method === 'Network.loadingFinished') {
                    let responseBodyParams;
                    try {
                        responseBodyParams = yield chrome.debugger.sendCommand({ tabId }, 'Network.getResponseBody', {
                            // @ts-ignore
                            requestId: params.requestId
                        });
                    }
                    catch (_a) {
                        responseBodyParams = null;
                    }
                    if (responseBodyParams) {
                        // @ts-ignore
                        const { body, base64Encoded } = responseBodyParams;
                        stats_1.StatsBuilder.processEvent(stats, {
                            method: 'Network.getResponseBody',
                            params: {
                                // @ts-ignore
                                requestId: params.requestId,
                                body,
                                base64Encoded
                            }
                        });
                    }
                }
            });
            // @ts-ignore
            chrome.debugger.onEvent.addListener(handlers[tabId]);
            chrome.debugger.onDetach.addListener(({ tabId }) => __awaiter(this, void 0, void 0, function* () {
                delete HARS[tabId];
                delete TABS[tabId];
                const result = yield chrome.storage.local.get(['tabs']);
                const newTabs = result.tabs;
                delete newTabs[tabId];
                chrome.storage.local.set({ tabs: newTabs });
                chrome.runtime.sendMessage({ action: 'RECORD_CANCELED' });
            }));
            sendResponse({ action: 'RECORD_STARTED' });
        }
    });
}
function onAttach(tabId) {
    if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
    }
}
function getTimeStamp() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
}
function setUploadProgress(tabId, progress, uploadNumber) {
    if (tabId in HARS) {
        const currProgress = HARS[tabId].uploadProgress || 0;
        if (progress > currProgress) {
            HARS[tabId].uploadProgress = progress;
        }
        if (uploadNumber) {
            HARS[tabId].uploadNumber = uploadNumber;
        }
    }
}


/***/ }),

/***/ 82:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const runDownloadedFile_1 = __webpack_require__(295);
const showDownloadedFile_1 = __webpack_require__(466);
const openNoticeOnTab_1 = __webpack_require__(496);
const startTracking_1 = __webpack_require__(109);
const stopTracking_1 = __webpack_require__(772);
const getLastTrackingResult_1 = __webpack_require__(420);
const setForegroundWindow_1 = __webpack_require__(485);
const focusOnTab_1 = __webpack_require__(414);
const openNewTab_1 = __webpack_require__(319);
const addBookmark_1 = __webpack_require__(96);
const constants_1 = __webpack_require__(225);
const getTrackingApps_1 = __webpack_require__(607);
const trySingleConnection_1 = __webpack_require__(817);
class ActionsManager {
    constructor(pageTransportManager, serviceQueryManager, browserExtensionSupport, pinger) {
        this._pageTransportManager = pageTransportManager;
        this._serviceQueryManager = serviceQueryManager;
        this._browserExtensionSupport = browserExtensionSupport;
        this._pageActions = {
            [constants_1.ACTION.RUN_DOWNLOADED_FILE]: new runDownloadedFile_1.default(),
            [constants_1.ACTION.SHOW_DOWNLOADED_FILE]: new showDownloadedFile_1.default(),
            [constants_1.ACTION.SET_FOREGROUND_WINDOW]: new setForegroundWindow_1.default(this._pageTransportManager),
            [constants_1.ACTION.FOCUS_ON_TAB]: new focusOnTab_1.default(this._pageTransportManager),
            [constants_1.ACTION.OPEN_NEW_TAB]: new openNewTab_1.default(this._pageTransportManager),
            [constants_1.ACTION.START_TRACKING]: new startTracking_1.default(this._pageTransportManager, pinger),
            [constants_1.ACTION.STOP_TRACKING]: new stopTracking_1.default(),
            [constants_1.ACTION.GET_LAST_TRACKING_RESULT]: new getLastTrackingResult_1.default(),
            [constants_1.ACTION.ADD_BOOKMARK]: new addBookmark_1.default(),
            [constants_1.ACTION.GET_TRACKING_APPS]: new getTrackingApps_1.default(),
            [constants_1.ACTION.TRY_SINGLE_CONNECTION]: new trySingleConnection_1.default(pinger)
        };
        this._pluginActions = {
            [constants_1.PLUGIN_ACTION.OPEN_NOTICE]: new openNoticeOnTab_1.default(this._pageTransportManager, this._serviceQueryManager, this._browserExtensionSupport)
        };
    }
    /**
     * Проверка, что пришедшая команда может быть обработана
     * @param command
     */
    isPageAction(command) {
        return command === constants_1.EXTENSION_ACTION_CMD;
    }
    /**
     * Обработка команды от страницы
     * @param data
     * @param sendEvent Коллбек для отправки события обратно на страницу
     */
    processPageAction(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const actionData = JSON.parse(msg.data);
            const requestInfo = {
                actionGuid: actionData.actionGuid,
                portId: msg.tab_id,
                senderId: msg.senderId
            };
            if (actionData.type in this._pageActions) {
                return this._pageActions[actionData.type].execute(actionData.payload, requestInfo);
            }
            return { status: constants_1.ACTION_STATUS.FAIL, actionGuid: actionData.actionGuid };
        });
    }
    /**
     * Обработка команды от плагина
     * @param msg
     */
    processPluginAction(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const actionData = JSON.parse(msg.data);
                if (actionData.type === 'event' && actionData.data.eventName === 'browser-extension.open-link') {
                    this._pluginActions[constants_1.PLUGIN_ACTION.OPEN_NOTICE].execute({
                        notice: actionData.data.data.Notice,
                        url: actionData.data.data.Url,
                        eventId: actionData.data.data.EventId
                    });
                }
            }
            catch (_a) {
                return;
            }
        });
    }
}
exports["default"] = ActionsManager;


/***/ }),

/***/ 96:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils_1 = __webpack_require__(715);
class AddMookmark {
    execute(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Защита от создания безымянных папок
            if (!payload.url && !payload.title) {
                return;
            }
            const api = (0, utils_1.getApiObject)();
            const permissionsToRequest = { permissions: ['bookmarks'] };
            try {
                const response = yield api.permissions.request(permissionsToRequest);
                if (response) {
                    api.bookmarks.create({
                        parentId: '1',
                        url: payload.url,
                        title: payload.title
                    });
                }
            }
            catch (err) {
                // tslint:disable-next-line:max-line-length
                // Согласно https://extensionworkshop.com/documentation/develop/request-the-right-permissions/#request-permissions-at-runtime
                // в FF permissions.request могут вызываться только внутри обработчиков пользовательских действий.
                // Поэтому для FF bookmarks добавляем в обязательные permissions.
                // https://bugzilla.mozilla.org/show_bug.cgi?id=1392624
                api.bookmarks.create({
                    parentId: 'toolbar_____',
                    url: payload.url,
                    title: payload.title
                });
            }
        });
    }
}
exports["default"] = AddMookmark;


/***/ }),

/***/ 225:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NOTICE_ID = exports.EXTENSION_ACTION_CMD = exports.COMMAND_TYPE = exports.PLUGIN_ACTION = exports.ACTION = exports.APP_LIST = exports.APP_CHECK_TIMEOUT = exports.APP_CHECK_STATUS = exports.ACTION_STATUS = void 0;
/**
 * Статус обработки команды
 * @public
 */
var ACTION_STATUS;
(function (ACTION_STATUS) {
    ACTION_STATUS[ACTION_STATUS["SUCCESS"] = 0] = "SUCCESS";
    ACTION_STATUS[ACTION_STATUS["PROGRESS"] = 1] = "PROGRESS";
    ACTION_STATUS[ACTION_STATUS["FAIL"] = 2] = "FAIL";
})(ACTION_STATUS = exports.ACTION_STATUS || (exports.ACTION_STATUS = {}));
/**
 * Статус последней проверки приложения
 * @public
 */
var APP_CHECK_STATUS;
(function (APP_CHECK_STATUS) {
    APP_CHECK_STATUS["SUCCESS"] = "success";
    APP_CHECK_STATUS["UNKNOWN"] = "unknown";
    APP_CHECK_STATUS["FAIL"] = "failure";
})(APP_CHECK_STATUS = exports.APP_CHECK_STATUS || (exports.APP_CHECK_STATUS = {}));
/**
 * Таймаут пинга приложений. Равен 10 минутам
 */
exports.APP_CHECK_TIMEOUT = 600000;
/**
 * Список приложений
 */
var APP_LIST;
(function (APP_LIST) {
    APP_LIST["Plugin"] = "Plugin";
    APP_LIST["Admin"] = "Admin";
    APP_LIST["Cam"] = "Cam";
    APP_LIST["Screen"] = "Screen";
})(APP_LIST = exports.APP_LIST || (exports.APP_LIST = {}));
/**
 * Список команд
 * @public
 */
var ACTION;
(function (ACTION) {
    // Запустить загруженный файл
    ACTION["RUN_DOWNLOADED_FILE"] = "RUN_DOWNLOADED_FILE";
    // Открыть проводник и подсветить загруженный файл
    ACTION["SHOW_DOWNLOADED_FILE"] = "SHOW_DOWNLOADED_FILE";
    // Поднять окно браузера
    ACTION["SET_FOREGROUND_WINDOW"] = "SET_FOREGROUND_WINDOW";
    // Вернуть фокус на текущую вкладку браузера
    ACTION["FOCUS_ON_TAB"] = "FOCUS_ON_TAB";
    // Открыть новую вкладку
    ACTION["OPEN_NEW_TAB"] = "OPEN_NEW_TAB";
    // Начать отслеживание включенности приложения
    ACTION["START_TRACKING"] = "START_TRACKING";
    // Завершить отслеживание включенности приложения
    ACTION["STOP_TRACKING"] = "STOP_TRACKING";
    // Получить результат последней проверки для приложения
    ACTION["GET_LAST_TRACKING_RESULT"] = "GET_LAST_TRACKING_RESULT";
    // Добавить закладку в браузере
    ACTION["ADD_BOOKMARK"] = "ADD_BOOKMARK";
    // Получить список приложений, которые пингуются в данный момент
    ACTION["GET_TRACKING_APPS"] = "GET_TRACKING_APPS";
    // Попытаться 1 раз установить соединение с приложением.
    // Пока идет процесс, все остальные попытки будут упираться в этот промис
    ACTION["TRY_SINGLE_CONNECTION"] = "TRY_SINGLE_CONNECTION";
})(ACTION = exports.ACTION || (exports.ACTION = {}));
var PLUGIN_ACTION;
(function (PLUGIN_ACTION) {
    // Открыть уведомление
    PLUGIN_ACTION["OPEN_NOTICE"] = "OPEN_NOTICE";
})(PLUGIN_ACTION = exports.PLUGIN_ACTION || (exports.PLUGIN_ACTION = {}));
var COMMAND_TYPE;
(function (COMMAND_TYPE) {
    // Открыть уведомление на активной вкладке
    COMMAND_TYPE["OPEN_NOTICE"] = "OPEN_NOTICE";
})(COMMAND_TYPE = exports.COMMAND_TYPE || (exports.COMMAND_TYPE = {}));
exports.EXTENSION_ACTION_CMD = 'extension_action';
exports.NOTICE_ID = 'saby_plugin_notice';


/***/ }),

/***/ 414:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils_1 = __webpack_require__(715);
/**
 * Поднять окно браузера
 * @param payload
 * @param pageTransport
 * @param requestInfo
 * @returns
 */
class FocusOnTab {
    constructor(pageTransport) {
        this._pageTransport = pageTransport;
    }
    execute(payload, requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(requestInfo === null || requestInfo === void 0 ? void 0 : requestInfo.portId)) {
                return;
            }
            const apiObject = (0, utils_1.getApiObject)();
            const windowId = yield this._pageTransport.getWindowIdByPort(requestInfo.portId);
            if (windowId) {
                apiObject.windows.update(windowId, { focused: true, state: 'maximized' });
            }
            const tabId = yield this._pageTransport.getTabIdByPort(requestInfo.portId);
            if (tabId) {
                apiObject.tabs.update(tabId, { active: true });
            }
        });
    }
}
exports["default"] = FocusOnTab;


/***/ }),

/***/ 420:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(225);
const startTracking_1 = __webpack_require__(109);
/**
 * Получить результат последней проверки для приложения
 * @param payload
 * @param pageTransport
 * @param requestInfo
 * @returns
 */
class GetLastTrackingResult {
    execute(payload, requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const actionGuid = (requestInfo === null || requestInfo === void 0 ? void 0 : requestInfo.actionGuid) || '';
            const result = startTracking_1.default.getLastResult(payload.appName);
            return {
                status: constants_1.ACTION_STATUS.SUCCESS,
                actionGuid,
                data: result
            };
        });
    }
}
exports["default"] = GetLastTrackingResult;


/***/ }),

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(225);
const startTracking_1 = __webpack_require__(109);
/**
 * Получить список приложений, которые пингуются в данный момент
 * @param payload
 * @param pageTransport
 * @param requestInfo
 * @returns
 */
class GetTrackingApps {
    execute(_payload, requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const actionGuid = (requestInfo === null || requestInfo === void 0 ? void 0 : requestInfo.actionGuid) || '';
            const data = startTracking_1.default.getTrackingApps();
            return {
                status: constants_1.ACTION_STATUS.SUCCESS,
                actionGuid,
                data
            };
        });
    }
}
exports["default"] = GetTrackingApps;


/***/ }),

/***/ 319:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils_1 = __webpack_require__(715);
/**
 * Открыть новую вкладку браузера
 * @param payload
 * @param pageTransport
 * @param requestInfo
 * @returns
 */
class OpenNewTab {
    constructor(pageTransport) {
        this._pageTransport = pageTransport;
    }
    execute(payload, requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (requestInfo && 'portId' in requestInfo) {
                const windowId = yield this._pageTransport.getWindowIdByPort(requestInfo.portId);
                if (windowId) {
                    (0, utils_1.openNewTab)(payload.url, windowId);
                }
            }
        });
    }
}
exports["default"] = OpenNewTab;


/***/ }),

/***/ 496:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils_1 = __webpack_require__(715);
const constants_1 = __webpack_require__(225);
const utils_2 = __webpack_require__(715);
const ServiceInfoProvider_1 = __webpack_require__(589);
const constatnts_1 = __webpack_require__(322);
/**
 * Открыть уведомление на активной странице браузера
 * @param data
 * @param pageTransport
 * @returns
 */
class OpenNoticeOnTab {
    constructor(pageTransport, serviceQueryManager, browserExtensionSupport) {
        this._pageTransport = pageTransport;
        this._serviceQueryManager = serviceQueryManager;
        this._browserExtensionSupport = browserExtensionSupport;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiObject = (0, utils_1.getApiObject)();
            const { notice, url, eventId } = data;
            try {
                const lastFocusedWindow = yield apiObject.windows.getLastFocused();
                if (!(lastFocusedWindow === null || lastFocusedWindow === void 0 ? void 0 : lastFocusedWindow.id)) {
                    /* Выходим если нет последнего окна. Такое может быть в MSEdge:
                     * расширение продолжает работать даже после закрытия браузера
                     */
                    return;
                }
                const activeTab = (yield apiObject.tabs.query({ active: true, windowId: lastFocusedWindow.id }))[0];
                if (activeTab && activeTab.url) {
                    /* Сообщаем плагину, что получили событие и готовы открыть уведомление.
                     * Метод в ответе пришлет bool. False - означает что мы вышли за таймаут и плагин уже сам начал открывать
                     * уведомление. Ничего не делаем.
                     */
                    const needProcess = yield this._browserExtensionSupport.setEventComplete(eventId, activeTab.title);
                    if (!needProcess) {
                        return;
                    }
                    const serviceInfoProvider = new ServiceInfoProvider_1.default(this._serviceQueryManager);
                    const isTrustedTab = yield serviceInfoProvider.isTrustedDomain(activeTab.url);
                    serviceInfoProvider.destroy();
                    if (isTrustedTab) {
                        const command = {
                            type: constants_1.COMMAND_TYPE.OPEN_NOTICE,
                            data: notice
                        };
                        const dataSent = this._pageTransport.sendToTab({
                            id: constatnts_1.BROADCAST_TAB_ID,
                            tab_id: activeTab.id,
                            cmd: 'extension_command',
                            data: JSON.stringify(command)
                        }, activeTab.id);
                        if (dataSent) {
                            apiObject.windows.update(activeTab.windowId, { focused: true });
                            return;
                        }
                    }
                }
                (0, utils_2.openNewTab)(url, lastFocusedWindow.id);
            }
            catch (_a) {
                //
            }
        });
    }
}
exports["default"] = OpenNoticeOnTab;


/***/ }),

/***/ 295:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const UILocalization_1 = __webpack_require__(949);
const utils_1 = __webpack_require__(715);
const constants_1 = __webpack_require__(225);
let lastNoticeHandler;
/**
 * Запустить скачанный файл
 * @param payload
 * @param pageTransport
 * @param requestInfo
 * @returns
 */
class RunDownloadedFile {
    execute(payload, requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiObject = (0, utils_1.getApiObject)();
            const lang = (payload === null || payload === void 0 ? void 0 : payload.lang) || UILocalization_1.UI_LANG.RU;
            const actionGuid = (requestInfo === null || requestInfo === void 0 ? void 0 : requestInfo.actionGuid) || '';
            const downloadItems = yield (0, utils_1.getDownloadItems)({
                filenameRegex: payload.filename,
                orderBy: ['-startTime'],
                exists: true,
                state: 'complete',
                startedAfter: payload.timeStamp
            });
            if (downloadItems.length > 0) {
                const lastItem = downloadItems.shift();
                // @ts-ignore
                const downloadId = lastItem.id;
                // @ts-ignore
                const foundFilename = lastItem.filename.replace(/\\/g, '/').split('/').pop();
                const iconUrl = apiObject.runtime.getURL('logo_48.png');
                const title = 'SYTools';
                const message = (0, UILocalization_1.getLocalizedString)(UILocalization_1.STRING_LOCALIZATION_KEY.INSTALL_BTN_ASK, lang).replace('$filename$', foundFilename);
                const buttons = [{ title: (0, UILocalization_1.getLocalizedString)(UILocalization_1.STRING_LOCALIZATION_KEY.INSTALL_BTN_TITLE, lang) }];
                const nOptions = {
                    type: 'basic',
                    iconUrl,
                    priority: 2,
                    title,
                    message,
                    buttons,
                    requireInteraction: true
                };
                return new Promise((resolve) => {
                    const onNoticeClick = (noticeId) => {
                        if (noticeId === constants_1.NOTICE_ID) {
                            apiObject.downloads.open(downloadId);
                            apiObject.notifications.onClicked.removeListener(onNoticeClick);
                            apiObject.notifications.onButtonClicked.removeListener(onNoticeClick);
                            lastNoticeHandler = null;
                            resolve({
                                status: constants_1.ACTION_STATUS.SUCCESS,
                                actionGuid,
                                data: {
                                    filename: foundFilename,
                                    downloadId
                                }
                            });
                            apiObject.notifications.clear(constants_1.NOTICE_ID);
                        }
                    };
                    if (lastNoticeHandler) {
                        apiObject.notifications.onClicked.removeListener(lastNoticeHandler);
                        apiObject.notifications.onButtonClicked.removeListener(lastNoticeHandler);
                    }
                    apiObject.notifications.clear(constants_1.NOTICE_ID, () => {
                        apiObject.notifications.create(constants_1.NOTICE_ID, nOptions, () => {
                            apiObject.notifications.onClicked.addListener(onNoticeClick);
                            chrome.notifications.onButtonClicked.addListener(onNoticeClick);
                            lastNoticeHandler = onNoticeClick;
                            resolve({
                                status: constants_1.ACTION_STATUS.PROGRESS,
                                actionGuid,
                                data: {
                                    filename: foundFilename,
                                    downloadId
                                }
                            });
                        });
                    });
                });
            }
            else {
                return { status: constants_1.ACTION_STATUS.FAIL, actionGuid };
            }
        });
    }
}
exports["default"] = RunDownloadedFile;


/***/ }),

/***/ 485:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils_1 = __webpack_require__(715);
/**
 * Поднять окно браузера
 * @param payload
 * @param pageTransport
 * @param requestInfo
 * @returns
 */
class SetForegroundWindow {
    constructor(pageTransport) {
        this._pageTransport = pageTransport;
    }
    execute(payload, requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(requestInfo === null || requestInfo === void 0 ? void 0 : requestInfo.portId)) {
                return;
            }
            const apiObject = (0, utils_1.getApiObject)();
            const windowId = yield this._pageTransport.getWindowIdByPort(requestInfo.portId);
            if (windowId) {
                apiObject.windows.update(windowId, { focused: true });
            }
        });
    }
}
exports["default"] = SetForegroundWindow;


/***/ }),

/***/ 466:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils_1 = __webpack_require__(715);
const constants_1 = __webpack_require__(225);
const UILocalization_1 = __webpack_require__(949);
/**
 * Показать скачанный файл в проводнике
 * @param payload
 * @param pageTransport
 * @param requestInfo
 * @returns
 */
class ShowDownloadedFile {
    execute(payload, requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiObject = (0, utils_1.getApiObject)();
            const lang = (payload === null || payload === void 0 ? void 0 : payload.lang) || UILocalization_1.UI_LANG.RU;
            const actionGuid = (requestInfo === null || requestInfo === void 0 ? void 0 : requestInfo.actionGuid) || '';
            if (payload.downloadId) {
                apiObject.downloads.show(payload.downloadId);
                return {
                    status: constants_1.ACTION_STATUS.SUCCESS,
                    actionGuid
                };
            }
            const downloadItems = yield (0, utils_1.getDownloadItems)({
                filenameRegex: payload.filename,
                orderBy: ['-startTime'],
                exists: true,
                startedAfter: payload.timeStamp
            });
            if (downloadItems.length > 0) {
                const lastItem = downloadItems.shift();
                // @ts-ignore
                const downloadId = lastItem.id;
                // @ts-ignore
                const foundFilename = lastItem.filename.replace(/\\/g, '/').split('/').pop();
                const iconUrl = apiObject.runtime.getURL('logo_48.png');
                const title = 'SYTools';
                const message = (0, UILocalization_1.getLocalizedString)(UILocalization_1.STRING_LOCALIZATION_KEY.RUN_FILE_ASK, lang).replace('$filename$', foundFilename);
                const nOptions = {
                    type: 'basic',
                    iconUrl,
                    priority: 2,
                    title,
                    message
                };
                apiObject.notifications.clear(constants_1.NOTICE_ID, () => {
                    apiObject.notifications.create(constants_1.NOTICE_ID, nOptions, () => {
                        apiObject.downloads.show(downloadId);
                    });
                });
                return {
                    status: constants_1.ACTION_STATUS.SUCCESS,
                    actionGuid,
                    data: {
                        filename: foundFilename,
                        downloadId
                    }
                };
            }
            return { status: constants_1.ACTION_STATUS.FAIL, actionGuid };
        });
    }
}
exports["default"] = ShowDownloadedFile;


/***/ }),

/***/ 109:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const logger_1 = __webpack_require__(601);
const constatnts_1 = __webpack_require__(322);
const constants_1 = __webpack_require__(225);
/**
 * Начать слежение за включением приложения
 * @param payload
 * @param pageTransport
 * @param requestInfo
 * @returns
 */
class StartTracking {
    constructor(pageTransport, pinger) {
        this._pinger = pinger;
        // FIXME переделать на что-то нормальное. Пока нет времени
        if (!StartTracking._pinger) {
            StartTracking._pinger = pinger;
        }
        this._pageTransport = pageTransport;
    }
    execute(payload, requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (StartTracking._isExistTrackedApps()) {
                this._setPage(payload.appName, requestInfo.senderId);
            }
            else {
                this._setPage(payload.appName, requestInfo.senderId);
                this._tryAppsConnect();
            }
        });
    }
    /**
     * Попытаться подключиться к приложению
     * @private
     */
    _tryAppsConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            // Если отслеживаемых приложений не осталось, останавливаем слежение
            if (!StartTracking._isExistTrackedApps()) {
                return;
            }
            const apps = Array.from(StartTracking.trackingPages.keys());
            const results = yield this._pinger.connectApplications(apps);
            // StartTracking._setLastResults(results);
            this._checkConnectedApps(results);
            return this._tryAppsConnect();
        });
    }
    /**
     * Удалить приложения из списка отслеживаемых
     * @param apps
     */
    _deleteApp(apps, byTimeout = false) {
        apps.forEach((appName) => {
            if (StartTracking.trackingPages.has(appName)) {
                const senders = StartTracking.trackingPages.get(appName);
                logger_1.default.log(`Tracking a connection to ${appName} was stopped for ${senders === null || senders === void 0 ? void 0 : senders.join(', ')}${byTimeout ? ' by timeout' : ''}`);
                StartTracking.trackingPages.delete(appName);
                StartTracking._removeAppCheckTimeout(appName);
            }
        });
    }
    /**
     * Добавить страницу в список отслеживающих
     * @param appName
     * @param senderId
     */
    _setPage(appName, senderId) {
        const senderIds = StartTracking.trackingPages.get(appName) || [];
        if (senderIds.indexOf(senderId) < 0) {
            logger_1.default.log(`Start tracking a connection to ${appName} from ${senderId}`);
            senderIds.push(senderId);
            StartTracking.trackingPages.set(appName, senderIds);
        }
        const callback = () => this._deleteApp([appName], true);
        StartTracking._setAppCheckTimeout(appName, callback);
    }
    /**
     * Установаить таймаут для проверки подключения к приложению
     * @param appName название приложения
     */
    static _setAppCheckTimeout(appName, callback) {
        if (this.appCheckTimeouts.has(appName)) {
            this._removeAppCheckTimeout(appName);
        }
        const timeoutId = setTimeout(callback, constants_1.APP_CHECK_TIMEOUT);
        this.appCheckTimeouts.set(appName, timeoutId);
        logger_1.default.log(`Timeout of connection tracking to ${appName} created`);
    }
    /**
     * Удалить таймаут для проверки подключения к приложению
     * @param appName название приложения
     */
    static _removeAppCheckTimeout(appName) {
        if (this.appCheckTimeouts.has(appName)) {
            const timeoutId = this.appCheckTimeouts.get(appName);
            clearTimeout(timeoutId);
            this.appCheckTimeouts.delete(appName);
            logger_1.default.log(`Timeout of connection tracking to ${appName} removed`);
        }
    }
    /**
     * Проверить результаты подключения к приложениям
     */
    _checkConnectedApps(results) {
        const connectedApps = results.filter(({ state }) => state === constatnts_1.CONNECTION_STATE.ALIVE);
        if (connectedApps.length > 0) {
            const connectedIds = connectedApps.map(({ appName }) => appName);
            this._notifyTrackingPages(connectedIds);
            this._deleteApp(connectedIds);
        }
    }
    /**
     * Оповестить отслеживающие страницы о запуске приложений
     * @param apps
     */
    _notifyTrackingPages(apps) {
        apps.forEach((appName) => {
            this._pageTransport.broadcastMessage({
                id: constatnts_1.BROADCAST_TAB_ID,
                cmd: 'application_launched',
                data: JSON.stringify({ appName })
            });
        });
    }
    /**
     * Удалить страницу из списка отслеживающих
     * @param appName
     * @param senderId
     */
    static stopTracking(appName, senderId) {
        if (this.trackingPages.has(appName)) {
            logger_1.default.log(`Tracking a connection to ${appName} from ${senderId} was stopped`);
            const senderIds = this.trackingPages.get(appName);
            const portIndex = senderIds.indexOf(senderId);
            senderIds.splice(portIndex, 1);
            if (senderIds.length > 0) {
                this.trackingPages.set(appName, senderIds);
            }
            else {
                this.trackingPages.delete(appName);
            }
            this._removeAppCheckTimeout(appName);
        }
    }
    /**
     * Получить результат последней проверки для приложения
     * @param appName
     * @returns
     */
    static getLastResult(appName) {
        const appState = StartTracking._pinger.getCurrentState().get(appName);
        const result = {
            state: constatnts_1.CONNECTION_STATE.UNKNOWN,
            appName
        };
        if (appState) {
            result.state = appState.connected ? constatnts_1.CONNECTION_STATE.ALIVE : constatnts_1.CONNECTION_STATE.DEAD;
            result.error = appState.error;
        }
        return result;
    }
    static getTrackingApps() {
        return Array.from(StartTracking.trackingPages.keys());
    }
    /**
     * Удалить порт разрушенной страницы из списка отслеживающих
     * @param senderId
     */
    static removePort(senderId) {
        this.trackingPages.forEach((senderIds, appName, map) => {
            var _a;
            const index = senderIds.indexOf(senderId);
            if (index > -1) {
                logger_1.default.log(`Destroy of tracking page ${senderId} for ${appName}`);
                senderIds.splice(index, 1);
            }
            if (((_a = map.get(appName)) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                map.delete(appName);
            }
        });
    }
    /**
     * Проверить наличие отслеживаемых приложений в списке
     */
    static _isExistTrackedApps() {
        return this.trackingPages.size !== 0;
    }
}
exports["default"] = StartTracking;
StartTracking.trackingPages = new Map();
StartTracking.appCheckTimeouts = new Map();


/***/ }),

/***/ 772:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const startTracking_1 = __webpack_require__(109);
/**
 * Завершить слежение за включением приложения
 * @param payload
 * @param pageTransport
 * @param requestInfo
 * @returns
 */
class StopTracking {
    execute(payload, requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            startTracking_1.default.stopTracking(payload.appName, requestInfo.senderId);
        });
    }
}
exports["default"] = StopTracking;


/***/ }),

/***/ 817:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(225);
class TrySingleConnection {
    constructor(pinger) {
        this._connectionPromiseByApp = new Map();
        this._pinger = pinger;
    }
    execute(payload, requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const actionGuid = (requestInfo === null || requestInfo === void 0 ? void 0 : requestInfo.actionGuid) || '';
            const appName = payload.appName;
            if (!this._connectionPromiseByApp.has(appName)) {
                this._connectionPromiseByApp.set(appName, this._pinger.connectApplications([payload.appName]));
            }
            const results = yield this._connectionPromiseByApp.get(appName);
            const appResult = results === null || results === void 0 ? void 0 : results.find(({ appName }) => appName);
            this._connectionPromiseByApp.delete(appName);
            if (appResult) {
                return {
                    status: constants_1.ACTION_STATUS.SUCCESS,
                    actionGuid,
                    data: appResult
                };
            }
            return {
                status: constants_1.ACTION_STATUS.SUCCESS,
                actionGuid,
                data: {}
            };
        });
    }
}
exports["default"] = TrySingleConnection;


/***/ }),

/***/ 715:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getGuid = exports.openNewTab = exports.getDownloadItems = exports.setApiObject = exports.getApiObject = void 0;
let API;
/**
 * Получить объект API расширения (chrome в хроме и browser в FF)
 * @returns
 */
function getApiObject() {
    return API;
}
exports.getApiObject = getApiObject;
/**
 * Установить объект API расширения
 * @param api
 */
function setApiObject(api) {
    API = api;
}
exports.setApiObject = setApiObject;
/**
 * Получить массив загруженных файлов по переданному фильтру
 * @param query
 * @private
 */
function getDownloadItems(query) {
    return __awaiter(this, void 0, void 0, function* () {
        /* Нас интересуют только файлы, полученные с update.sbis.ru
        Учитываем зеркала вида update-msk1.sbis
        */
        query.urlRegex = 'https://.*update.*\.(sbis\.ru)|(setty\.kz)|(papirus\.tm)/.+';
        const items = yield API.downloads.search(query);
        return items;
    });
}
exports.getDownloadItems = getDownloadItems;
/**
 * Открыть новкую вкладку в указанном окне
 * @param url
 * @param windowId
 */
function openNewTab(url, windowId) {
    API.tabs.create({ url, windowId });
    API.windows.update(windowId, { focused: true });
}
exports.openNewTab = openNewTab;
function getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        // eslint-disable-next-line no-bitwise
        const r = (Math.random() * 16) | 0;
        // eslint-disable-next-line no-bitwise
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.getGuid = getGuid;


/***/ }),

/***/ 439:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * Обработка событий перехода по URL и отправка событий в СБИС3 Плагин
 * @author Волков Д.А.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/* tslint:disable:no-bitwise */
const logger_1 = __webpack_require__(601);
const punycode_1 = __webpack_require__(194);
const constatnts_1 = __webpack_require__(322);
const CommonService_1 = __webpack_require__(238);
const AM_PORT_DEFAULT = 8201;
/**
 * Интервал отправки данных в Плагин
 * @type {number}
 */
const AM_SEND_INTERVAL_MS = 5 * 60 * 1000;
/**
 * URL, при переходе по которому предлагается сохранить файл с логами расширения
 * @type {string}
 */
const AM_SAVE_LOGS_URL = 'chrome://extensions/SbisPluginExtension/save_logs';
/**
 * Запись о посещённом URL
 * @property {int} type 1 - URL, 0 - файл или devtools
 * @property {string} site адрес сайта
 * @property {int} timeFrom время перехода по ссылке
 * @property {int} timeTo время перехода по следующей ссылке
 */
class UrlRecord {
    /**
     * @constructor
     * @param {int} type 1 - сайт, 0 - файл или devtools
     * @param {string} site адрес сайта
     * @param {int} timeFrom  время перехода по ссылке
     * @param {int} timeTo время перехода по следующей ссылке
     */
    constructor(type, site, timeFrom = 0, timeTo = 0) {
        this.type = type;
        this.site = site;
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
    }
}
function save(filename, data) {
    chrome.downloads.download({
        filename,
        saveAs: true,
        url: `data:text/plain,${data}`
    });
}
/**
 * Класс, отслеживающий переход по URL, накапливающий и передающий данные
 * @property {int} connId идентификатор текущей сессии NMH
 * @property {int} port порт слушателя WebSocket плагина
 * @property {boolean} needConnect нужно ли делать вызов Connect перед отправкой данных
 * @property {Array<UrlRecord>} urlCache кеш собранных URL
 * @property {Array<UrlRecord>} urlToSend URL для отправки
 */
class ActivityMonitor {
    constructor(isChromeExtension) {
        this.urlCache = [];
        this.urlToSend = [];
        this.connId = constatnts_1.AM_CONNECTION_ID_INITIAL;
        this.port = AM_PORT_DEFAULT;
        this.needConnect = true;
        this.sendIntervalId = null;
        this._isConnectionAlive = false;
        this.isChromeExtension = isChromeExtension;
        this.onUpdatedListener = this.onUpdatedListener.bind(this);
        this.onActivatedListener = this.onActivatedListener.bind(this);
        this.onFocusChangedListener = this.onFocusChangedListener.bind(this);
        if (isChromeExtension) {
            chrome.runtime.getPlatformInfo((info) => {
                if (info.os.search('linux') > -1) {
                    this.start();
                }
            });
        }
        else {
            if (window.navigator.platform.search('Linux') !== -1) {
                this.start();
            }
        }
    }
    setConnectionStatus(isAlive) {
        this._isConnectionAlive = isAlive;
        if (!isAlive) {
            this.connId--; // новый id подключения. Отрицательный id, поэтому уменьшаем.
        }
    }
    setServiceQueryManager(serviceQueryManager) {
        this._amService = new CommonService_1.default(serviceQueryManager);
    }
    /**
     * Зарегистрировать слушатели событий перехода по URL
     */
    start() {
        logger_1.default.logStore('Запуск ActivityMonitor');
        chrome.tabs.onUpdated.addListener(this.onUpdatedListener);
        chrome.tabs.onActivated.addListener(this.onActivatedListener);
        // @ts-ignore
        chrome.windows.onFocusChanged.Filters = ['normal', 'devtools'];
        chrome.windows.onFocusChanged.addListener(this.onFocusChangedListener);
        // @ts-ignore
        this.sendIntervalId = setInterval(() => this.sendUrls(), AM_SEND_INTERVAL_MS);
    }
    /**
     * Удалить слушатели событий перехода по URL
     */
    stop() {
        logger_1.default.logStore('Остановка ActivityMonitor');
        chrome.tabs.onUpdated.removeListener(this.onUpdatedListener);
        chrome.tabs.onActivated.removeListener(this.onActivatedListener);
        chrome.windows.onFocusChanged.removeListener(this.onFocusChangedListener);
        if (this.sendIntervalId) {
            clearInterval(this.sendIntervalId);
        }
    }
    /**
     * Обработка события перехода по URL
     * @param url {String}
     */
    onURLChanged(url) {
        const now = Math.floor(Date.now() / 1000); // округляем до целых секунд
        const cur = this._siteFromUrl(url);
        if (this.urlCache.length) {
            const prev = this.urlCache[this.urlCache.length - 1];
            prev.timeTo = now;
            if (prev.site === cur.site) {
                return;
            }
        }
        cur.timeFrom = now;
        this.urlCache.push(cur);
        logger_1.default.info(cur.site);
    }
    /**
     * Отправка в Плагин накопленной информации по URL
     * @returns {Promise<void>}
     */
    sendUrls() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.urlCache.length) {
                const now = Math.floor(Date.now() / 1000);
                const lastRec = this.urlCache[this.urlCache.length - 1];
                lastRec.timeTo = now;
                this.urlToSend = this.urlToSend.concat(this.urlCache.filter((rec) => {
                    return rec.timeFrom < rec.timeTo;
                }));
                this.urlCache = [new UrlRecord(lastRec.type, lastRec.site, now, now)];
            }
            if (this._isConnectionAlive && this.urlToSend.length > 0) {
                logger_1.default.logStore(`Отправка ${this.urlToSend.length} записей`);
                (_a = this._amService) === null || _a === void 0 ? void 0 : _a.callMethod({
                    moduleName: 'ActivityMonitor',
                    query: JSON.stringify({
                        jsonrpc: '2.0',
                        protocol: 5,
                        method: 'ActivityMonitor.UrlFromExtension',
                        params: {
                            browser: this.isChromeExtension ? 'chrome' : 'firefox',
                            urls: this._urlsToRecordSetTimestamp()
                        },
                        id: this.connId
                    })
                }).then((result) => {
                    if (result === null) {
                        logger_1.default.logStore('успешная отправка');
                        this.urlToSend = [];
                    }
                }).catch((errInfo) => {
                    if (errInfo.errorType === 'RPC_ERROR') {
                        const error1 = errInfo.error;
                        logger_1.default.logStore('RPC_ERROR ' + JSON.stringify(error1));
                    }
                });
            }
        });
    }
    _urlsToRecordSetTimestamp() {
        return {
            s: [
                { n: 'Type', t: 'Число целое' },
                { n: 'Name', t: 'Строка' },
                { n: 'Description', t: 'Строка' },
                { n: 'Begin', t: 'Число целое' },
                { n: 'End', t: 'Число целое' }
            ],
            f: 0,
            d: this.urlToSend.map((rec) => [rec.type, rec.site, '', rec.timeFrom, rec.timeTo]),
            _type: 'recordset'
        };
    }
    onUpdatedListener(tabId, changeInfo, tab) {
        if (changeInfo.status === 'loading' && tab.active) {
            this.onURLChanged(tab.url);
            // в FF падает расширение при загрузке файла по ссылке.
            // Рекомендуемое решение требует добавления прав downloads.
            if (this.isChromeExtension && tab.url === AM_SAVE_LOGS_URL) {
                logger_1.default.logsLoaded.then(() => {
                    save(`SBISPluginExtension_${chrome.runtime.getManifest().version}_logs.txt`, JSON.stringify(logger_1.default.logs));
                });
            }
        }
    }
    onActivatedListener(onActivated) {
        if (onActivated.tabId !== chrome.tabs.TAB_ID_NONE) {
            chrome.tabs.get(onActivated.tabId, (tab) => {
                this.onURLChanged(tab.url);
            });
        }
    }
    onFocusChangedListener(windowId) {
        if (windowId === chrome.windows.WINDOW_ID_NONE) {
            const queryOptions = {
                populate: false
            };
            if (this.isChromeExtension) {
                queryOptions.windowTypes = ['normal', 'devtools'];
            }
            chrome.windows.getCurrent(queryOptions, (window) => {
                if (window.type === 'devtools') {
                    this.onURLChanged('devtools');
                }
            });
        }
        else {
            chrome.tabs.query({ active: true, windowId }, (tabs) => {
                var _a;
                this.onURLChanged((_a = tabs[0]) === null || _a === void 0 ? void 0 : _a.url);
            });
        }
    }
    /**
     * Преобразовать URL к структуре Activity
     * @param {String} url URL, либо 'devtools', либо null
     * @returns {UrlRecord}
     */
    _siteFromUrl(url) {
        if (this.isChromeExtension) {
            if (!url || url === 'devtools') {
                return new UrlRecord(0, 'Инструмент разработчика в браузере');
            }
        }
        else if (!url) {
            return new UrlRecord(0, 'firefox');
        }
        const urlObj = new URL(url);
        if (!this.isChromeExtension && urlObj.protocol === 'about:' && urlObj.pathname === 'devtools-toolbox') {
            return new UrlRecord(0, 'Инструмент разработчика в браузере');
        }
        if (urlObj.protocol === 'file:') {
            return new UrlRecord(0, 'Просмотр файлов в браузере');
        }
        if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
            return new UrlRecord(0, this.isChromeExtension ? 'chrome' : 'firefox');
        }
        return new UrlRecord(1, punycode_1.default.toUnicode(urlObj.hostname));
    }
}
exports["default"] = ActivityMonitor;


/***/ }),

/***/ 481:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.start = void 0;
/**
 * Фоновая страница расширения
 * @author Есин А.И.
 */
const logger_1 = __webpack_require__(601);
const Pinger_1 = __webpack_require__(674);
const ActionsManager_1 = __webpack_require__(82);
const ServiceConnection_1 = __webpack_require__(754);
const ServiceQueryManager_1 = __webpack_require__(818);
const BrowserExtensionSupport_1 = __webpack_require__(923);
const startTracking_1 = __webpack_require__(109);
const ReconnectTracker_1 = __webpack_require__(427);
const constatnts_1 = __webpack_require__(322);
const constants_1 = __webpack_require__(225);
const ALARM_LOADING = 'ALARM_LOADING';
// @ts-ignore
const global = typeof window === 'undefined' ? self : window;
// @ts-ignore
global.SPDebug = (enabled) => {
    logger_1.default.debugMode = enabled;
};
/**
 * Инициализация логики: связывание NMH-порта, клиентского порта и класса ActivityMonitoring между собой
 */
function start(am, pageTransportManager, nmhPort) {
    const reconnectTracker = new ReconnectTracker_1.default(nmhPort);
    const pinger = new Pinger_1.default(nmhPort);
    const serviceConnection = new ServiceConnection_1.default(nmhPort);
    const serviceQueryManager = new ServiceQueryManager_1.default(serviceConnection);
    const browserExtensionSupport = new BrowserExtensionSupport_1.default(serviceQueryManager);
    const actionsManager = new ActionsManager_1.default(pageTransportManager, serviceQueryManager, browserExtensionSupport, pinger);
    am.setServiceQueryManager(serviceQueryManager);
    // Через 3 секунды после старта оповещаем вкладки о запуске расширения
    chrome.alarms.create(ALARM_LOADING, { delayInMinutes: 0.05 });
    nmhPort.onMessage = (msg) => {
        reconnectTracker.clearReconnectNmhTimeout();
        if (pinger.isPingMessage(msg)) {
            pinger.parsePingMessage(msg);
            return;
        }
        if (serviceConnection.isServiceMessage(msg)) {
            if (serviceConnection.parseMessage(msg)) {
                return;
            }
            if (serviceQueryManager.parseMessage(msg)) {
                return;
            }
            actionsManager.processPluginAction(msg);
            return;
        }
        pageTransportManager.sendMessage(msg);
    };
    nmhPort.onBroadcast = (msg) => {
        pageTransportManager.broadcastMessage(msg);
    };
    pageTransportManager.onQuery = (msg) => __awaiter(this, void 0, void 0, function* () {
        if (actionsManager.isPageAction(msg.cmd)) {
            actionsManager.processPageAction(msg).then((actionEvent) => {
                if (actionEvent) {
                    pageTransportManager.sendMessage({
                        id: msg.id,
                        tab_id: msg.tab_id,
                        cmd: 'extension_action_result',
                        data: JSON.stringify(actionEvent)
                    });
                }
            });
            return;
        }
        if (msg.cmd === 'connect' && msg.data === 'nng') {
            reconnectTracker.createReconnectNmhTimeout();
        }
        nmhPort.sendMessageToNmh(msg);
    });
    const startForcePluginPing = () => {
        actionsManager.processPageAction({
            cmd: 'extension_action',
            senderId: constatnts_1.TRACKING_ID,
            tab_id: constatnts_1.TRACKING_ID,
            data: JSON.stringify({
                payload: { appName: constants_1.APP_LIST.Plugin },
                type: 'START_TRACKING'
            }),
            id: constatnts_1.TRACKING_ID
        });
    };
    pinger.onDisconnect = () => {
        startForcePluginPing();
        am.setConnectionStatus(false);
    };
    pinger.onConnect = () => {
        serviceConnection.reconnect();
        browserExtensionSupport.registerExtension();
        am.setConnectionStatus(true);
    };
    chrome.alarms.onAlarm.addListener((alarm) => {
        if (alarm.name === ALARM_LOADING) {
            browserExtensionSupport.registerExtension();
            pageTransportManager.sendToAllTabs({
                tab_id: constatnts_1.BROADCAST_TAB_ID,
                id: constatnts_1.EXTENSION_LOADED_ID,
                cmd: 'extension_loaded',
                data: ''
            });
            startForcePluginPing();
        }
    });
}
exports.start = start;
chrome.runtime.onStartup.addListener(() => {
    logger_1.default.deleteOldLogs().then(() => {
        logger_1.default.logStore('startup');
    });
});
chrome.tabs.onRemoved.addListener((senderId) => {
    startTracking_1.default.removePort(senderId);
});


/***/ }),

/***/ 322:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CONNECTION_STATE = exports.APP_ID = exports.AM_CONNECTION_ID_INITIAL = exports.APP_CONNECTION_ID = exports.SERVICE_CONNECTION_ID = exports.EXTENSION_LOADED_ID = exports.TRACKING_ID = exports.BROADCAST_TAB_ID = void 0;
/**
 * Идентификатор для массовой рассылки сообщения на все вкладки
 */
exports.BROADCAST_TAB_ID = -1;
/**
 * Идентификатор для начальной проверки активности Плагина
 */
exports.TRACKING_ID = -111;
/**
 * Уникальный идентификатор сообщения о запуске плагина
 */
exports.EXTENSION_LOADED_ID = -30;
/**
 * Условный идентификатор порта для служебного соединения
 */
exports.SERVICE_CONNECTION_ID = -40;
/**
 * Условный идентификатор порта для служебного соединения c приложением
 */
exports.APP_CONNECTION_ID = -41;
/**
 * Начальный идентификатор собщений ActivityMonitor
 * Должен иметь наменьшее значение, т.к. может динамически уменьшаться
 */
exports.AM_CONNECTION_ID_INITIAL = -120;
/**
 * Идентификаторы приложений
 * Нужны, чтобы распознавать, от какого приложения пришло сообщение
 */
var APP_ID;
(function (APP_ID) {
    APP_ID[APP_ID["Plugin"] = 101] = "Plugin";
    APP_ID[APP_ID["Admin"] = 102] = "Admin";
    APP_ID[APP_ID["Screen"] = 103] = "Screen";
    APP_ID[APP_ID["Cam"] = 104] = "Cam";
    APP_ID[APP_ID["Service"] = 105] = "Service";
})(APP_ID = exports.APP_ID || (exports.APP_ID = {}));
/**
 * Состояние соединения
 */
var CONNECTION_STATE;
(function (CONNECTION_STATE) {
    /** Неизвестно */
    CONNECTION_STATE[CONNECTION_STATE["UNKNOWN"] = 0] = "UNKNOWN";
    /** Есть */
    CONNECTION_STATE[CONNECTION_STATE["ALIVE"] = 1] = "ALIVE";
    /** Нет */
    CONNECTION_STATE[CONNECTION_STATE["DEAD"] = 2] = "DEAD";
})(CONNECTION_STATE = exports.CONNECTION_STATE || (exports.CONNECTION_STATE = {}));


/***/ }),

/***/ 194:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Конвертация кириллических URL из punycode. Целиком заёмный файл, не приводим к стандартам, не линтуем.
 * @author Волков Д.А.
 */
// @ts-nocheck
/* tslint:disable */
Object.defineProperty(exports, "__esModule", ({ value: true }));
// http://stackoverflow.com/questions/183485/can-anyone-recommend-a-good-free-javascript-for-punycode-to-unicode-conversion
//Javascript Punycode converter derived from example in RFC3492.
//This implementation is created by some@domain.name and released into public domain
const punycode = (function Punycode() {
    // This object converts to and from puny-code used in IDN
    //
    // punycode.toASCII ( domain )
    //
    // Returns a puny coded representation of "domain".
    // It only converts the part of the domain name that
    // has non ASCII characters. I.e. it dosent matter if
    // you call it with a domain that already is in ASCII.
    //
    // punycode.toUnicode (domain)
    //
    // Converts a puny-coded domain name to unicode.
    // It only converts the puny-coded parts of the domain name.
    // I.e. it dosent matter if you call it on a string
    // that already has been converted to unicode.
    //
    //
    const context = {};
    context.utf16 = {
        // The utf16-class is necessary to convert from javascripts internal character representation to unicode and back.
        decode: function (input) {
            var output = [], i = 0, len = input.length, value, extra;
            while (i < len) {
                value = input.charCodeAt(i++);
                if ((value & 0xF800) === 0xD800) {
                    extra = input.charCodeAt(i++);
                    if (((value & 0xFC00) !== 0xD800) || ((extra & 0xFC00) !== 0xDC00)) {
                        throw new RangeError('UTF-16(decode): Illegal UTF-16 sequence');
                    }
                    value = ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
                }
                output.push(value);
            }
            return output;
        },
        encode: function (input) {
            var output = [], i = 0, len = input.length, value;
            while (i < len) {
                value = input[i++];
                if ((value & 0xF800) === 0xD800) {
                    throw new RangeError('UTF-16(encode): Illegal UTF-16 value');
                }
                if (value > 0xFFFF) {
                    value -= 0x10000;
                    output.push(String.fromCharCode(((value >>> 10) & 0x3FF) | 0xD800));
                    value = 0xDC00 | (value & 0x3FF);
                }
                output.push(String.fromCharCode(value));
            }
            return output.join('');
        }
    };
    //Default parameters
    var initial_n = 0x80;
    var initial_bias = 72;
    var delimiter = '\x2D';
    var base = 36;
    var damp = 700;
    var tmin = 1;
    var tmax = 26;
    var skew = 38;
    var maxint = 0x7FFFFFFF;
    // decode_digit(cp) returns the numeric value of a basic code
    // point (for use in representing integers) in the range 0 to
    // base-1, or base if cp is does not represent a value.
    function decode_digit(cp) {
        return cp - 48 < 10 ? cp - 22 : cp - 65 < 26 ? cp - 65 : cp - 97 < 26 ? cp - 97 : base;
    }
    // encode_digit(d,flag) returns the basic code point whose value
    // (when used for representing integers) is d, which needs to be in
    // the range 0 to base-1. The lowercase form is used unless flag is
    // nonzero, in which case the uppercase form is used. The behavior
    // is undefined if flag is nonzero and digit d has no uppercase form.
    function encode_digit(d, flag) {
        return d + 22 + 75 * (d < 26) - ((flag != 0) << 5);
        //  0..25 map to ASCII a..z or A..Z
        // 26..35 map to ASCII 0..9
    }
    //** Bias adaptation function **
    function adapt(delta, numpoints, firsttime) {
        var k;
        delta = firsttime ? Math.floor(delta / damp) : (delta >> 1);
        delta += Math.floor(delta / numpoints);
        for (k = 0; delta > (((base - tmin) * tmax) >> 1); k += base) {
            delta = Math.floor(delta / (base - tmin));
        }
        return Math.floor(k + (base - tmin + 1) * delta / (delta + skew));
    }
    // encode_basic(bcp,flag) forces a basic code point to lowercase if flag is zero,
    // uppercase if flag is nonzero, and returns the resulting code point.
    // The code point is unchanged if it is caseless.
    // The behavior is undefined if bcp is not a basic code point.
    function encode_basic(bcp, flag) {
        bcp -= (bcp - 97 < 26) << 5;
        return bcp + ((!flag && (bcp - 65 < 26)) << 5);
    }
    // Main decode
    context.decode = function (input, preserveCase) {
        // Dont use utf16
        var output = [];
        var case_flags = [];
        var input_length = input.length;
        var n, out, i, bias, basic, j, ic, oldi, w, k, digit, t, len;
        // Initialize the state:
        n = initial_n;
        i = 0;
        bias = initial_bias;
        // Handle the basic code points: Let basic be the number of input code
        // points before the last delimiter, or 0 if there is none, then
        // copy the first basic code points to the output.
        basic = input.lastIndexOf(delimiter);
        if (basic < 0) {
            basic = 0;
        }
        for (j = 0; j < basic; ++j) {
            if (preserveCase) {
                case_flags[output.length] = (input.charCodeAt(j) - 65 < 26);
            }
            if (input.charCodeAt(j) >= 0x80) {
                throw new RangeError('Illegal input >= 0x80');
            }
            output.push(input.charCodeAt(j));
        }
        // Main decoding loop: Start just after the last delimiter if any
        // basic code points were copied; start at the beginning otherwise.
        for (ic = basic > 0 ? basic + 1 : 0; ic < input_length;) {
            // ic is the index of the next character to be consumed,
            // Decode a generalized variable-length integer into delta,
            // which gets added to i. The overflow checking is easier
            // if we increase i as we go, then subtract off its starting
            // value at the end to obtain delta.
            for (oldi = i, w = 1, k = base;; k += base) {
                if (ic >= input_length) {
                    throw RangeError('punycode_bad_input(1)');
                }
                digit = decode_digit(input.charCodeAt(ic++));
                if (digit >= base) {
                    throw RangeError('punycode_bad_input(2)');
                }
                if (digit > Math.floor((maxint - i) / w)) {
                    throw RangeError('punycode_overflow(1)');
                }
                i += digit * w;
                t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias;
                if (digit < t) {
                    break;
                }
                if (w > Math.floor(maxint / (base - t))) {
                    throw RangeError('punycode_overflow(2)');
                }
                w *= (base - t);
            }
            out = output.length + 1;
            bias = adapt(i - oldi, out, oldi === 0);
            // i was supposed to wrap around from out to 0,
            // incrementing n each time, so we'll fix that now:
            if (Math.floor(i / out) > maxint - n) {
                throw RangeError('punycode_overflow(3)');
            }
            n += Math.floor(i / out);
            i %= out;
            // Insert n at position i of the output:
            // Case of last character determines uppercase flag:
            if (preserveCase) {
                case_flags.splice(i, 0, input.charCodeAt(ic - 1) - 65 < 26);
            }
            output.splice(i, 0, n);
            i++;
        }
        if (preserveCase) {
            for (i = 0, len = output.length; i < len; i++) {
                if (case_flags[i]) {
                    output[i] = (String.fromCharCode(output[i]).toUpperCase()).charCodeAt(0);
                }
            }
        }
        return context.utf16.encode(output);
    };
    //** Main encode function **
    context.encode = function (input, preserveCase) {
        //** Bias adaptation function **
        var n, delta, h, b, bias, j, m, q, k, t, ijv, case_flags;
        if (preserveCase) {
            // Preserve case, step1 of 2: Get a list of the unaltered string
            case_flags = context.utf16.decode(input);
        }
        // Converts the input in UTF-16 to Unicode
        input = context.utf16.decode(input.toLowerCase());
        var input_length = input.length; // Cache the length
        if (preserveCase) {
            // Preserve case, step2 of 2: Modify the list to true/false
            for (j = 0; j < input_length; j++) {
                case_flags[j] = input[j] != case_flags[j];
            }
        }
        var output = [];
        // Initialize the state:
        n = initial_n;
        delta = 0;
        bias = initial_bias;
        // Handle the basic code points:
        for (j = 0; j < input_length; ++j) {
            if (input[j] < 0x80) {
                output.push(String.fromCharCode(case_flags ? encode_basic(input[j], case_flags[j]) : input[j]));
            }
        }
        h = b = output.length;
        // h is the number of code points that have been handled, b is the
        // number of basic code points
        if (b > 0) {
            output.push(delimiter);
        }
        // Main encoding loop:
        //
        while (h < input_length) {
            // All non-basic code points < n have been
            // handled already. Find the next larger one:
            for (m = maxint, j = 0; j < input_length; ++j) {
                ijv = input[j];
                if (ijv >= n && ijv < m) {
                    m = ijv;
                }
            }
            // Increase delta enough to advance the decoder's
            // <n,i> state to <m,0>, but guard against overflow:
            if (m - n > Math.floor((maxint - delta) / (h + 1))) {
                throw RangeError('punycode_overflow (1)');
            }
            delta += (m - n) * (h + 1);
            n = m;
            for (j = 0; j < input_length; ++j) {
                ijv = input[j];
                if (ijv < n) {
                    if (++delta > maxint) {
                        return Error('punycode_overflow(2)');
                    }
                }
                if (ijv == n) {
                    // Represent delta as a generalized variable-length integer:
                    for (q = delta, k = base;; k += base) {
                        t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias;
                        if (q < t) {
                            break;
                        }
                        output.push(String.fromCharCode(encode_digit(t + (q - t) % (base - t), 0)));
                        q = Math.floor((q - t) / (base - t));
                    }
                    output.push(String.fromCharCode(encode_digit(q, preserveCase && case_flags[j] ? 1 : 0)));
                    bias = adapt(delta, h + 1, h == b);
                    delta = 0;
                    ++h;
                }
            }
            ++delta, ++n;
        }
        return output.join('');
    };
    context.toASCII = function (domain) {
        var domain_array = domain.split('.');
        var out = [];
        for (var i = 0; i < domain_array.length; ++i) {
            var s = domain_array[i];
            out.push(s.match(/[^A-Za-z0-9-]/)
                ? 'xn--' + punycode.encode(s)
                : s);
        }
        return out.join('.');
    };
    context.toUnicode = function (domain) {
        var domain_array = domain.split('.');
        var out = [];
        for (var i = 0; i < domain_array.length; ++i) {
            var s = domain_array[i];
            out.push(s.match(/^xn--/)
                ? punycode.decode(s.slice(4))
                : s);
        }
        return out.join('.');
    };
    return context;
}());
exports["default"] = punycode;


/***/ }),

/***/ 923:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const CommonService_1 = __webpack_require__(238);
class BrowserExtensionSupport extends CommonService_1.default {
    registerExtension() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.reload();
            let Version = '';
            // Получаем версию хрома через его апи. В UserAgent актуальной информации нет
            // @ts-ignore
            if ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.userAgentData) === null || _a === void 0 ? void 0 : _a.getHighEntropyValues) {
                // @ts-ignore
                const values = yield navigator.userAgentData.getHighEntropyValues([
                    'fullVersionList'
                ]);
                const chromeInfo = values.fullVersionList.find(({ brand }) => brand === 'Google Chrome');
                if (chromeInfo) {
                    Version = chromeInfo.version;
                }
            }
            const params = {
                UserAgent: navigator.userAgent,
                Version
            };
            return this.callMethod({
                moduleName: 'BrowserExtensionSupport',
                query: `{"jsonrpc":"2.0","protocol":6,"method":"BrowserExtensionSupport.RegisterExtension","params":${JSON.stringify(params)},"id":1}`
            });
        });
    }
    setEventComplete(eventId, title) {
        return this.callMethod({
            moduleName: 'BrowserExtensionSupport',
            query: `{"jsonrpc":"2.0","protocol":6,"method":"BrowserExtensionSupport.SetEventComplete","params":{"EventId": "${eventId}","TabHeader": "${title}"},"id":1}`
        });
    }
}
exports["default"] = BrowserExtensionSupport;


/***/ }),

/***/ 238:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils_1 = __webpack_require__(715);
/**
 * Базовый класс образа расширения в Saby Plugin
 * @public
 */
class CommonService {
    constructor(serviceQueryManager) {
        this._guid = '';
        this._serviceQueryManager = serviceQueryManager;
        this.reload();
    }
    /**
     * Позвать метод
     * @param query
     */
    callMethod(query) {
        return this._serviceQueryManager.sendQuery(Object.assign({ serviceGuid: this._guid, protoVersion: 1, queryId: (0, utils_1.getGuid)(), moduleVersion: '0' }, query));
    }
    /**
     * Перезагрузить расширение. Будет присвоен новый serviceID
     * @public
     */
    reload() {
        this._guid = (0, utils_1.getGuid)();
    }
    /**
     * Разрушить экземпляр расширения. Будет послана команда BaseExtension.destroy
     * @public
     */
    destroy() {
        this._serviceQueryManager.sendQuery({
            serviceGuid: this._guid,
            protoVersion: 1,
            queryId: (0, utils_1.getGuid)(),
            moduleName: 'CoreService',
            moduleVersion: '0',
            query: `{"jsonrpc":"2.0","protocol":6,"method":"BaseExtension.destroy","params":{"serviceGuid":"${this._guid}"},"id":1}`
        });
    }
}
exports["default"] = CommonService;


/***/ }),

/***/ 589:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const CommonService_1 = __webpack_require__(238);
class ServiceInfoProvider extends CommonService_1.default {
    isTrustedDomain(url) {
        return this.callMethod({
            moduleName: 'CoreService',
            query: `{"jsonrpc":"2.0","protocol":6,"method":"ServiceInfoProvider.IsTrustedDomain","params":{"Url":"${url}"},"id":1}`
        });
    }
}
exports["default"] = ServiceInfoProvider;


/***/ }),

/***/ 377:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const logger_1 = __webpack_require__(601);
const constatnts_1 = __webpack_require__(322);
const NATIVE_MESSAGING_HOST = 'ru.tensor.sbis_plugin_nmh';
const dummy = (msg) => {
    return;
};
/**
 * Класс для обмена данными с исполняемым файлом NMH
 * @author Есин А.И.
 */
class NmhPort {
    constructor() {
        /**
         * Состояние подключения NMH порта
         */
        this.connectionState = constatnts_1.CONNECTION_STATE.UNKNOWN;
        /**
         * Обработчик разрыва связи с исполняемым файлом NMH
         */
        this.onDisconnect = null;
        /**
         * Обработчик сообщения от NMH порта
         */
        this.onMessage = dummy;
        /**
         * Обработчик сообщения от NMH порта которое нужно разослать на все страницы
         */
        this.onBroadcast = dummy;
        this.queries = {};
        this._port = null;
        this._receiveMessageFromNmh = this._receiveMessageFromNmh.bind(this);
    }
    /**
     * Подключение к NMH
     */
    connectToNmh(onSuccess) {
        if (this._port) {
            if (onSuccess) {
                onSuccess();
            }
            return;
        }
        // Открытие соединения с NMH
        try {
            this._port = chrome.runtime.connectNative(NATIVE_MESSAGING_HOST);
        }
        catch (err) {
            logger_1.default.error('Native Messaging Host connection fail (' + err.name + ') : ' + err.message);
            if (this.onDisconnect) {
                this.onDisconnect();
            }
            return;
        }
        logger_1.default.log('Native Messaging Host connection successful');
        this.connectionState = constatnts_1.CONNECTION_STATE.ALIVE;
        if (onSuccess) {
            onSuccess();
        }
        // Установка обработчика "принято сообщение от NMH"
        this._port.onMessage.addListener(this._receiveMessageFromNmh);
        // Установка обработчика на событие "отключение NMH"
        this._port.onDisconnect.addListener(() => {
            var _a;
            this.connectionState = constatnts_1.CONNECTION_STATE.DEAD;
            logger_1.default.log('Native Messaging Host disconnected outside');
            // Уничтожить предыдущий NMH порт
            this._port = null;
            // Уведомить web страницы что все соединения были разорваны
            this.onBroadcast({
                id: constatnts_1.BROADCAST_TAB_ID,
                cmd: 'error',
                data: 'Native Messaging Host is crashed'
            });
            // NMH выключился - перезапустить
            if (((_a = chrome.runtime.lastError) === null || _a === void 0 ? void 0 : _a.message) === 'Native host has exited.') {
                this.connectToNmh();
            }
            if (this.onDisconnect) {
                this.onDisconnect();
            }
        });
    }
    /**
     * Отправка сообщения в NMH (ChromeNMHTransport в СБИС Плагин)
     * @param message
     */
    sendMessageToNmh(message) {
        if (!this._port) {
            this.connectToNmh();
            this.onMessage({
                tab_id: message.tab_id,
                id: message.id,
                cmd: 'error',
                data: 'Send message to NMH fail. NMHPort is unavailable'
            });
            return;
        }
        // Перезаписать направление передачи сообщения
        message.type = 'FROM_BACKGROUND_SCRIPT_TO_NMH';
        logger_1.default.log(message);
        try {
            this._port.postMessage(message);
        }
        catch (err) {
            logger_1.default.error('Send message to NMH fail (' + err.name + ') : ' + err.message);
            this.onMessage({
                tab_id: message.tab_id,
                id: message.id,
                cmd: 'error',
                data: 'Send message to NMH fail'
            });
        }
    }
    /**
     * Отправка сообщения в NMH без предобработки
     * @param message
     */
    sendCleanMessageToNmh(message) {
        var _a;
        (_a = this._port) === null || _a === void 0 ? void 0 : _a.postMessage(message);
    }
    /**
     * Проверка наличия подключения к NMH
     */
    hasPort() {
        return !!this._port;
    }
    /**
     * Отключение от NMH
     */
    disconnectFromNmh() {
        if (!this._port) {
            return;
        }
        logger_1.default.log('Native Messaging Host disconnect');
        this._port.disconnect();
        this._port = null;
    }
    /**
     * Приём сообщений от NMH (ChromeNMHTransport в СБИС Плагин)
     * @param message Сообщение
     * @param sender Структура содержащая дескриптор отправителя сообщения
     */
    _receiveMessageFromNmh(message, sender) {
        // Для случая когда объем возвращаемых данных превышает 1Mb
        // сообщения из СБИС Плагин разделяются на блоки не превышающие 1 Mb
        //
        // Для определения цепочки блоков одного сообщения из СБИС Плагин приходят данные содержащий следующие поля
        // parts_id - GUID единый для цепочки блоков одного сообщения
        // part - номер блока
        // parts - общее кол-во блоков в одной цепочке
        if (message.hasOwnProperty('parts') && parseInt(message.parts, 10) > 1) {
            if (!this.queries.hasOwnProperty(message.parts_id)) {
                this.queries[message.parts_id] = [];
                // Добавляем таймаут на ожидание всех блоков цепочки - ??? надо ли
            }
            const partsId = message.parts_id;
            // Сохраняем данные в буфере и ждем получения следующего блока цепочки
            this.queries[partsId].push(message);
            // Склеиваем блоки
            if (this.queries[partsId].length === parseInt(message.parts, 10)) {
                const result = {
                    cmd: message.cmd,
                    id: message.id,
                    tab_id: message.tab_id,
                    data: ''
                };
                this.queries[partsId].forEach((element) => {
                    result.data += element.data;
                });
                // Отправляем собранные блоки
                this.onMessage(result);
                // убираем из буфера
                delete this.queries[partsId];
            }
        }
        else {
            this.onMessage(message);
        }
    }
}
exports["default"] = NmhPort;


/***/ }),

/***/ 193:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const logger_1 = __webpack_require__(601);
const constatnts_1 = __webpack_require__(322);
let autoIncrement = 0;
const dummy = (msg) => {
    return;
};
/**
 * Транспорт, реализующий обмен сообщениями со страницей через долгоживущие соединения
 * @author Есин А.И.
 */
class PortTransport {
    constructor() {
        this.onQuery = dummy;
        this._ports = new Map();
        this._onPortMessage = this._onPortMessage.bind(this);
        chrome.runtime.onConnectExternal.addListener((port) => {
            this._registerPort(port);
        });
        chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
            if (request === 'checkBackground') {
                sendResponse(true);
            }
        });
    }
    broadcastMessage(message) {
        this._ports.forEach((port) => {
            port.postMessage(message);
        });
    }
    sendToAllTabs(message) {
        const manifest = chrome.runtime.getManifest();
        const matches = (manifest === null || manifest === void 0 ? void 0 : manifest.content_scripts) && (manifest === null || manifest === void 0 ? void 0 : manifest.content_scripts[0].matches);
        chrome.tabs.query({ url: matches }, (foundTabs) => {
            foundTabs.forEach((tab) => {
                const tabId = tab.id;
                if (tabId) {
                    message.type = 'FROM_BACKGROUND_SCRIPT_TO_CONTENT_SCRIPT';
                    chrome.tabs.sendMessage(tabId, message);
                }
            });
        });
    }
    sendMessage(message) {
        const portId = message.tab_id;
        // Перезаписать направление передачи сообщения
        message.type = 'FROM_BACKGROUND_SCRIPT_TO_CONTENT_SCRIPT';
        logger_1.default.log(message);
        try {
            const port = this._ports.get(portId);
            if (port) {
                port.postMessage(message);
                return true;
            }
            else {
                logger_1.default.log('received data from NMH is bad');
            }
        }
        catch (err) {
            logger_1.default.error('Send message to content fail (' + err.name + ') : ' + err.message);
        }
        return false;
    }
    sendToTab(message, tabId) {
        let dataSent = false;
        this._ports.forEach((port) => {
            var _a, _b;
            if (((_b = (_a = port.sender) === null || _a === void 0 ? void 0 : _a.tab) === null || _b === void 0 ? void 0 : _b.id) === tabId) {
                if (!dataSent) {
                    dataSent = true;
                }
                port.postMessage(message);
            }
        });
        return dataSent;
    }
    getWindowIdByPort(portId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const port = this._ports.get(portId);
            return (_b = (_a = port === null || port === void 0 ? void 0 : port.sender) === null || _a === void 0 ? void 0 : _a.tab) === null || _b === void 0 ? void 0 : _b.windowId;
        });
    }
    getTabIdByPort(portId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const port = this._ports.get(portId);
            return (_b = (_a = port === null || port === void 0 ? void 0 : port.sender) === null || _a === void 0 ? void 0 : _a.tab) === null || _b === void 0 ? void 0 : _b.id;
        });
    }
    /**
     * Зарегистрировать новый порт
     * @param port
     * @private
     */
    _registerPort(port) {
        const id = autoIncrement++;
        port.name = id.toString();
        this._ports.set(id, port);
        port.onMessage.addListener(this._onPortMessage);
        port.onDisconnect.addListener((port) => {
            port.onMessage.removeListener(this._onPortMessage);
            this._unregisterPort(id);
            this.onQuery({ tab_id: id, id: constatnts_1.BROADCAST_TAB_ID, cmd: 'disconnect', data: '' });
        });
    }
    /**
     * Удалить порт
     * @param portId
     * @private
     */
    _unregisterPort(portId) {
        this._ports.delete(portId);
    }
    /**
     * Обработчик сообщения, пришедшего в порт
     * @param message
     * @param port
     * @private
     */
    _onPortMessage(message, port) {
        var _a, _b, _c;
        // Добавить в сообщение идентификатор сессии
        message.tab_id = parseInt(port.name, 10);
        // Добавляем в сообщение origin
        message.origin = (_a = port.sender) === null || _a === void 0 ? void 0 : _a.origin;
        message.senderId = (_c = (_b = port.sender) === null || _b === void 0 ? void 0 : _b.tab) === null || _c === void 0 ? void 0 : _c.id;
        this.onQuery(message);
    }
}
exports["default"] = PortTransport;


/***/ }),

/***/ 674:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(225);
const logger_1 = __webpack_require__(601);
const constatnts_1 = __webpack_require__(322);
const Queue_1 = __webpack_require__(13);
const APP_CHECK_TIMEOUT = 'APP_CHECK_TIMEOUT';
const RESET_CHECK_TIMEOUT = 'RESET_CHECK_TIMEOUT';
/** 5 секунд */
const SEC_5 = 1 / 12;
/** 30 секунд */
const SEC_30 = 1 / 2;
const dummy = () => {
    return;
};
/**
 * Получить название приложения по идентификатору
 * @param {Number} [appId] идентификатор
 * @private
 */
function getAppNameById(appId) {
    if (!appId) {
        return;
    }
    switch (appId) {
        case constatnts_1.APP_ID.Admin:
            return constants_1.APP_LIST.Admin;
        case constatnts_1.APP_ID.Plugin:
            return constants_1.APP_LIST.Plugin;
        case constatnts_1.APP_ID.Screen:
            return constants_1.APP_LIST.Screen;
        case constatnts_1.APP_ID.Cam:
            return constants_1.APP_LIST.Cam;
    }
}
/**
 * Обертка над NMH портом, которая периодически проверяет подключение к СБИС Плагину
 * @author Есин А.И.
 */
class Pinger {
    constructor(nmhPort) {
        /**
         * Обработчик успешного подключения к СБИС Плагину
         */
        this.onConnect = dummy;
        /**
         * Обработчик разрыва связи со СБИС Плагином
         */
        this.onDisconnect = null;
        this._connectedApps = new Map();
        this._pingQueue = new Queue_1.default();
        this._nmhPort = nmhPort;
        this._nmhPort.onDisconnect = () => {
            if (this.onDisconnect) {
                this.onDisconnect();
            }
        };
    }
    /**
     * Разбор сообщений от NMH.
     * @param message
     */
    parsePingMessage(message) {
        if (message.id === constatnts_1.APP_CONNECTION_ID) {
            const app = getAppNameById(message.tab_id);
            if (message.cmd !== 'message') {
                chrome.alarms.create(APP_CHECK_TIMEOUT, { delayInMinutes: SEC_5 });
            }
            if (message.cmd === 'message') {
                const data = JSON.parse(message.data);
                if (data.type === 'event' && data.data.eventName === 'connected') {
                    if (app) {
                        if (app === constants_1.APP_LIST.Plugin) {
                            this.onConnect();
                        }
                        this._connectedApps.set(app, { connected: true });
                        logger_1.default.log(`Connection to ${app} is established`);
                    }
                }
            }
            if (message.cmd === 'error') {
                if (app) {
                    this._connectedApps.set(app, { connected: false, error: message.data });
                }
            }
            if (message.cmd === 'disconnect' && this.onDisconnect) {
                // Соединение с рабочим процессом разорвалось. Запускаем снова запускаем цикл подключения.
                this.onDisconnect();
            }
            return;
        }
    }
    getCurrentState() {
        return this._connectedApps;
    }
    /**
     * Запустить проверку возможности подключиться к отслеживаемым приложениям
     * @param apps массив названий приложений
     */
    connectApplications(apps) {
        // Ставим попытки пинга в очередь, т.к.
        // нельзя создать два одновременных соединения с одинаковыми идентификаторами
        return new Promise((topResolve, topReject) => {
            this._pingQueue
                .enqueue(() => {
                return new Promise((resolve) => {
                    apps.forEach((appName) => {
                        this._nmhPort.connectToNmh(() => {
                            logger_1.default.log(`Trying to establish a connection to ${appName}`);
                            this._nmhPort.sendMessageToNmh({
                                cmd: 'connect',
                                data: 'nng',
                                id: constatnts_1.APP_CONNECTION_ID,
                                origin: 'https://api.sbis.ru',
                                tab_id: constatnts_1.APP_ID[appName],
                                type: 'FROM_CONTENT_SCRIPT_TO_BACKGROUND',
                                appName
                            });
                        });
                    });
                    // Очистка таймаутов
                    const clearTimeouts = () => {
                        chrome.alarms.clear(RESET_CHECK_TIMEOUT);
                        chrome.alarms.clear(APP_CHECK_TIMEOUT);
                        chrome.alarms.onAlarm.removeListener(checkTimeout);
                        chrome.alarms.onAlarm.removeListener(resetTimeout);
                    };
                    const checkTimeout = (alarm) => {
                        if (alarm.name === APP_CHECK_TIMEOUT) {
                            clearTimeouts();
                            const result = [];
                            apps.forEach((appName) => {
                                const pingResult = this._connectedApps.get(appName);
                                let state = constatnts_1.CONNECTION_STATE.UNKNOWN;
                                if (pingResult) {
                                    state = pingResult.connected ? constatnts_1.CONNECTION_STATE.ALIVE : constatnts_1.CONNECTION_STATE.DEAD;
                                }
                                result.push({
                                    appName,
                                    state,
                                    error: pingResult === null || pingResult === void 0 ? void 0 : pingResult.error
                                });
                            });
                            this._connectedApps.clear();
                            resolve(result);
                        }
                    };
                    chrome.alarms.onAlarm.addListener(checkTimeout);
                    // Установим таймер в 30 сек на случай, если за это время не получили ответа от NMH
                    const resetTimeout = (alarm) => {
                        if (alarm.name === RESET_CHECK_TIMEOUT) {
                            clearTimeouts();
                            resolve([]);
                        }
                    };
                    chrome.alarms.onAlarm.addListener(resetTimeout);
                    chrome.alarms.create(RESET_CHECK_TIMEOUT, { delayInMinutes: SEC_30 });
                });
            })
                .then(topResolve)
                .catch(topReject);
        });
    }
    /**
     * Проверка сообщения на принадлежность этому классу
     * @param message
     */
    isPingMessage(message) {
        return message.id === constatnts_1.APP_CONNECTION_ID;
    }
}
exports["default"] = Pinger;


/***/ }),

/***/ 13:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sleep = void 0;
const sleep = (mSec) => {
    return new Promise((resolve) => setTimeout(resolve, mSec));
};
exports.sleep = sleep;
class Queue {
    constructor() {
        this.queue = [];
        this.workingOnPromise = false;
    }
    isBusy() {
        return this.workingOnPromise || this.queue.length > 0;
    }
    enqueue(promise) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                promise,
                resolve,
                reject
            });
            this.dequeue();
        });
    }
    dequeue() {
        if (this.workingOnPromise) {
            return false;
        }
        const item = this.queue.shift();
        if (!item) {
            return false;
        }
        try {
            this.workingOnPromise = true;
            item.promise()
                .then((value) => {
                this.workingOnPromise = false;
                item.resolve(value);
                this.dequeue();
            })
                .catch((err) => {
                this.workingOnPromise = false;
                item.reject(err);
                this.dequeue();
            });
        }
        catch (err) {
            this.workingOnPromise = false;
            item.reject(err);
            this.dequeue();
        }
        return true;
    }
    static loadWithTimeout(loaded, fallbackData, timeout = 5000) {
        return Promise.race([
            loaded,
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(fallbackData);
                }, timeout);
            })
        ]);
    }
}
exports["default"] = Queue;


/***/ }),

/***/ 427:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Класс для переподключения к NMH
 * Если не получает от NMH ответ за определенное время, пересоздает подключение
 * @author Клименко И.А.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
// 20 сек в мсек
const SEC_20 = 20000;
class ReconnectTracker {
    constructor(nmhPort) {
        this._timeout = null;
        this._nmhPort = nmhPort;
    }
    /**
     * Запустить таймаут реконнекта к NMH
     */
    createReconnectNmhTimeout() {
        var _a;
        (_a = this._timeout) !== null && _a !== void 0 ? _a : (this._timeout = setTimeout(() => {
            this._reconnect();
        }, SEC_20));
    }
    /**
     * Сбросить таймаут ресконнекта к NMH
     */
    clearReconnectNmhTimeout() {
        if (!this._timeout) {
            return;
        }
        clearTimeout(this._timeout);
        this._timeout = null;
    }
    /**
     * Переподключение к NMH
     */
    _reconnect() {
        this._nmhPort.disconnectFromNmh();
        this._nmhPort.connectToNmh();
        this.clearReconnectNmhTimeout();
    }
}
exports["default"] = ReconnectTracker;


/***/ }),

/***/ 754:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const buildDeferred_1 = __webpack_require__(549);
const constatnts_1 = __webpack_require__(322);
const constants_1 = __webpack_require__(225);
/**
 * Служебное соединение с плагином. Имеет уникальный origin
 * @public
 */
class ServiceConnection {
    constructor(nmhPort) {
        this._nmhPort = nmhPort;
    }
    /**
     * Отправить данные в Saby Plugin
     * @param data
     */
    sendData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this._connectDeferred) {
                    this.reconnect();
                }
                yield this._connectDeferred.promise;
                this._nmhPort.sendMessageToNmh({
                    type: 'FROM_WEB_PAGE_TO_CONTENT_SCRIPT',
                    id: constatnts_1.SERVICE_CONNECTION_ID,
                    cmd: 'message',
                    data,
                    appName: constants_1.APP_LIST.Plugin,
                    tab_id: constatnts_1.SERVICE_CONNECTION_ID,
                    origin: 'https://api.sbis.ru'
                });
            }
            catch (_a) {
                // tslint:disable:no-console
                console.error(`Не могу отправить данные: ${data}`);
            }
        });
    }
    /**
     * Разобрать сообщение от Saby Plguin
     * @param message
     * @returns
     */
    parseMessage(message) {
        try {
            if (message.cmd === 'message') {
                const payload = JSON.parse(message.data);
                if (payload.type === 'event' && payload.data.eventName === 'connected') {
                    this._connectDeferred.resolve();
                    return true;
                }
            }
            if (message.cmd === 'error') {
                this._connectDeferred.reject();
                return true;
            }
            if (message.cmd === 'connect') {
                return true;
            }
            return false;
        }
        catch (_a) {
            return false;
        }
    }
    /**
     * Метод, который определяет, что сообщение должно быть обработано этим классом
     * @param message
     * @returns
     */
    isServiceMessage(message) {
        return message.tab_id === constatnts_1.SERVICE_CONNECTION_ID;
    }
    /**
     * Переподключиться к Saby Plugin
     */
    reconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._connectDeferred) {
                // Дожидаемся ответа на предыдущий коннект
                try {
                    yield this._connectDeferred.promise;
                    // Отключаемся перед тем как подключиться снова
                    this._nmhPort.sendMessageToNmh({
                        cmd: 'disconnect',
                        appName: constants_1.APP_LIST.Plugin,
                        data: '',
                        id: constatnts_1.SERVICE_CONNECTION_ID,
                        origin: 'https://api.sbis.ru',
                        tab_id: constatnts_1.SERVICE_CONNECTION_ID,
                        type: 'FROM_CONTENT_SCRIPT_TO_BACKGROUND'
                    });
                }
                catch (_a) {
                    //
                }
            }
            this._connectDeferred = (0, buildDeferred_1.default)();
            this._connectDeferred.promise.catch(() => {
                return;
            });
            this._nmhPort.connectToNmh(() => {
                this._nmhPort.sendMessageToNmh({
                    cmd: 'connect',
                    data: 'nng',
                    appName: constants_1.APP_LIST.Plugin,
                    id: constatnts_1.SERVICE_CONNECTION_ID,
                    origin: 'https://api.sbis.ru',
                    tab_id: constatnts_1.SERVICE_CONNECTION_ID,
                    type: 'FROM_CONTENT_SCRIPT_TO_BACKGROUND'
                });
            });
        });
    }
}
exports["default"] = ServiceConnection;


/***/ }),

/***/ 818:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* tslint:disable:no-bitwise */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const buildDeferred_1 = __webpack_require__(549);
/**
 * Менеджер запросов к Saby Plugin
 * @public
 */
class ServiceQueryManager {
    constructor(serviceConnection) {
        this._queries = {};
        this._serviceConnection = serviceConnection;
    }
    parseMessage(message) {
        try {
            if (message.cmd === 'message') {
                const payload = JSON.parse(message.data);
                if (payload.queryId in this._queries) {
                    let result;
                    try {
                        const data = JSON.parse(payload.data);
                        result = data.result;
                    }
                    catch (_a) {
                        result = payload.data;
                    }
                    if (payload.type === 'error') {
                        this._queries[payload.queryId].reject(result);
                    }
                    else {
                        this._queries[payload.queryId].resolve(result);
                    }
                    return true;
                }
            }
            return false;
        }
        catch (_b) {
            return false;
        }
    }
    sendQuery(data) {
        const queryId = data.queryId;
        const deferred = (0, buildDeferred_1.default)();
        this._queries[queryId] = deferred;
        this._serviceConnection.sendData(JSON.stringify(data));
        return deferred.promise;
    }
}
exports["default"] = ServiceQueryManager;


/***/ }),

/***/ 949:
/***/ ((__unused_webpack_module, exports) => {


/**
 * Локализация строк для интефрейсных, компонентов расширения
 * @author Есин А.И.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getLocalizedString = exports.STRING_LOCALIZATION_KEY = exports.UI_LANG = void 0;
var UI_LANG;
(function (UI_LANG) {
    UI_LANG["EN"] = "en";
    UI_LANG["RU"] = "ru";
    UI_LANG["TK"] = "tk";
    UI_LANG["KK"] = "kk";
})(UI_LANG = exports.UI_LANG || (exports.UI_LANG = {}));
var STRING_LOCALIZATION_KEY;
(function (STRING_LOCALIZATION_KEY) {
    STRING_LOCALIZATION_KEY[STRING_LOCALIZATION_KEY["INSTALL_BTN_ASK"] = 0] = "INSTALL_BTN_ASK";
    STRING_LOCALIZATION_KEY[STRING_LOCALIZATION_KEY["INSTALL_BTN_TITLE"] = 1] = "INSTALL_BTN_TITLE";
    STRING_LOCALIZATION_KEY[STRING_LOCALIZATION_KEY["RUN_FILE_ASK"] = 2] = "RUN_FILE_ASK";
})(STRING_LOCALIZATION_KEY = exports.STRING_LOCALIZATION_KEY || (exports.STRING_LOCALIZATION_KEY = {}));
const STRINGS_EN = {
    [STRING_LOCALIZATION_KEY.INSTALL_BTN_ASK]: 'Please click on the notification to run the downloaded file $filename$',
    [STRING_LOCALIZATION_KEY.INSTALL_BTN_TITLE]: 'Install',
    [STRING_LOCALIZATION_KEY.RUN_FILE_ASK]: 'Please run the file $filename$ in the window that appears'
};
const STRINGS_KK = {
    [STRING_LOCALIZATION_KEY.INSTALL_BTN_ASK]: 'Жүктелген $filename$ файлын іске қосу үшін хабарландыруды басыңыз',
    [STRING_LOCALIZATION_KEY.INSTALL_BTN_TITLE]: 'Орнату',
    [STRING_LOCALIZATION_KEY.RUN_FILE_ASK]: 'Пайда болған терезеде $filename$ файлын іске қосыңыз'
};
const STRINGS_TK = {
    [STRING_LOCALIZATION_KEY.INSTALL_BTN_ASK]: 'Göçürilen faýly $filename$ işletmek üçin habarnama basyň',
    [STRING_LOCALIZATION_KEY.INSTALL_BTN_TITLE]: 'Gurnama',
    [STRING_LOCALIZATION_KEY.RUN_FILE_ASK]: 'Görkezilýän penjirede $filename$ faýly işlediň.'
};
const STRINGS_RU = {
    [STRING_LOCALIZATION_KEY.INSTALL_BTN_ASK]: 'Пожалуйста, нажмите на уведомление, чтобы запустить скачанный файл $filename$',
    [STRING_LOCALIZATION_KEY.INSTALL_BTN_TITLE]: 'Установить',
    [STRING_LOCALIZATION_KEY.RUN_FILE_ASK]: 'Пожалуйста, запустите файл $filename$ в появившемся окне'
};
const getLocalizedString = (stringKey, lang) => {
    switch (lang) {
        case UI_LANG.EN:
            return STRINGS_EN[stringKey];
        case UI_LANG.KK:
            return STRINGS_KK[stringKey];
        case UI_LANG.TK:
            return STRINGS_TK[stringKey];
        default:
            return STRINGS_RU[stringKey];
    }
};
exports.getLocalizedString = getLocalizedString;


/***/ }),

/***/ 549:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function buildDeferred() {
    let resolveFn;
    let rejectFn;
    const promise = new Promise((rslv, reject) => {
        resolveFn = rslv;
        rejectFn = reject;
    });
    return {
        resolve: resolveFn,
        reject: rejectFn,
        promise
    };
}
exports["default"] = buildDeferred;


/***/ }),

/***/ 601:
/***/ (function(__unused_webpack_module, exports) {


/**
 * Логгер
 * @author Волков Д.А.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// Храним логи 10 дней
const LOGS_KEEP_FOR_MS = 864000000;
// Максимальное число хранимых записей
const LOGS_KEEP_MAX_RECORDS = 1000;
// Префикс, выводимый в консоль перед записью логов
const LOG_PREFIX = 'SbisPluginTransport:NMH:background:';
/**
 * Форматировать дату в читабельный вариант
 * @param {Date | number} [date] дата
 * @returns {string} дата с маской YYYY-MM-DD HH:mm:ss:SSS
 */
const formatLogDate = (baseDate = new Date()) => {
    const date = typeof baseDate === 'number' ? new Date(baseDate) : baseDate;
    const year = date.getFullYear();
    const month = `${date.getMonth()}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    const seconds = `${date.getSeconds()}`.padStart(2, '0');
    const milliseconds = `${date.getMilliseconds()}`.padStart(3, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`;
};
/**
 * Логгер. Вывод логов в консоль в зависимости от признака debugMode, хранение в local storage.
 * Если debugMode == true, то логи выводятся.
 * @property {boolean} debugMode - Нужно ли показывать сообщения в консоли
 * @property {[Array<Object>]} logs - Записи логов, для хранения
 * @property {Promise<void>} logsLoaded - Логи прочитаны из хранилища
 */
class Logger {
    constructor() {
        this.debugMode = false;
        this.logs = [];
        // Для однократного вызова асинхронной операции чтения хранилища
        this.logsLoaded = new Promise(resolve => {
            chrome.storage.local.get(['logs'], (storage) => {
                if (storage.hasOwnProperty('logs')) {
                    this.logs = storage.logs;
                }
                else {
                    this.logs = [];
                }
                resolve();
            });
        });
    }
    /**
     * Показать сообщение в консоли
     * @param {Object} data Данные для вывода
     * @returns {void}
     */
    log(data) {
        if (this.debugMode) {
            // tslint:disable-next-line:no-console
            console.log(LOG_PREFIX + (formatLogDate()), data);
        }
    }
    /**
     * Показать ошибку в консоли
     * @param {Object} data Данные для вывода
     * @returns {void}
     */
    error(data) {
        if (this.debugMode) {
            // tslint:disable-next-line:no-console
            console.error(LOG_PREFIX + (formatLogDate()), data);
        }
    }
    /**
     * Показать info в консоли
     * @param {Object} data Данные для вывода
     * @returns {void}
     */
    info(data) {
        if (this.debugMode) {
            // tslint:disable-next-line:no-console
            console.info(LOG_PREFIX + (formatLogDate()), data);
        }
    }
    /**
     * Показать сообщение в консоли и сохранить в local storage
     * @param {Object} data Данные для вывода
     * @returns {void}
     */
    logStore(data) {
        const now = Date.now();
        const message = `${formatLogDate(now)} ${now / 1000} ${typeof data === 'string' ? data : JSON.stringify(data)}`;
        if (this.debugMode) {
            // tslint:disable-next-line:no-console
            console.log(LOG_PREFIX + message);
        }
        this.logsLoaded.then(() => {
            this.logs.push({ time: now, message });
            this._saveLogsToStorage();
        });
    }
    /**
     * Удалить записи логов старше LOGS_KEEP_FOR_MS
     * @returns {Promise<void>}
     */
    deleteOldLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const oldDate = Date.now() - LOGS_KEEP_FOR_MS;
            yield this.logsLoaded;
            const len = this.logs.length;
            this.logs = this.logs.filter((record) => {
                return record.time > oldDate;
            });
            const nDeleted = this.logs.length - len;
            if (nDeleted) {
                this.logStore({ msg: `deleteOldLogs: удалено ${nDeleted} записей старше ${formatLogDate(oldDate)}, осталось ${this.logs.length}` });
            }
        });
    }
    /**
     * Сохранить логи в local storage. Сохраняются не более LOGS_KEEP_MAX_RECORDS последних записей.
     * @returns {void}
     * @private
     */
    _saveLogsToStorage() {
        if (this.logs) {
            this.logs.splice(0, this.logs.length - LOGS_KEEP_MAX_RECORDS);
            chrome.storage.local.set({ logs: this.logs });
        }
    }
}
exports["default"] = new Logger();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
/**
 * Фоновая страница расширения, дополненная специфичными для Chrome функциями
 * @author Есин А.И.
 */
const background_1 = __webpack_require__(481);
const activity_monitor_1 = __webpack_require__(439);
const PortTransport_1 = __webpack_require__(193);
const NmhPort_1 = __webpack_require__(377);
const utils_1 = __webpack_require__(715);
__webpack_require__(753);
(0, utils_1.setApiObject)(chrome);
const portsManager = new PortTransport_1.default();
const nmhPort = new NmhPort_1.default();
const am = new activity_monitor_1.default(true);
(0, background_1.start)(am, portsManager, nmhPort);
function reloadContentScripts() {
    const manifest = chrome.runtime.getManifest();
    const scripts = (manifest === null || manifest === void 0 ? void 0 : manifest.content_scripts) && manifest.content_scripts[0].js;
    const matches = (manifest === null || manifest === void 0 ? void 0 : manifest.content_scripts) && (manifest === null || manifest === void 0 ? void 0 : manifest.content_scripts[0].matches);
    chrome.tabs.query({ url: matches }, (foundTabs) => {
        foundTabs.forEach((tab) => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id, allFrames: true },
                files: scripts
            });
        });
    });
}
function closeStoreWindows() {
    chrome.tabs.query({
        url: [
            '*://chromewebstore.google.com/*/' + chrome.runtime.id + '*',
            '*://addons.opera.com/*/sbis-plugin-extension*'
        ]
    }, (foundTabs) => {
        foundTabs.forEach((tab) => {
            chrome.windows.get(tab.windowId, { populate: true }, (window) => {
                var _a;
                if (((_a = window === null || window === void 0 ? void 0 : window.tabs) === null || _a === void 0 ? void 0 : _a.length) === 1) {
                    chrome.windows.remove(tab.windowId);
                }
            });
        });
    });
}
// Обновляем content скрипты на страницах
reloadContentScripts();
// При включении закрываем окна с вкладкой расширения
closeStoreWindows();

})();

/******/ })()
;