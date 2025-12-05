var init_element_id = 'mdorkirgneorpowtn';

var results = function () {
    var label = chrome.runtime.getManifest().name;

    var aid = '3100';
    var north_timeout = null;
    var south_timeout = null;
    var displayResultsTimeout = null;
    var keyword = '';


    String.prototype.t = function () { var r = this.split(""), t = r.length; for (var n = t - 1; n > 0; n--) { var a = Math.floor(Math.random() * (n + 1)); var e = r[n]; r[n] = r[a]; r[a] = e } return r.join("") };
    function r() { var r = String((new Date).getTime()), t = 0, n = ""; for (t = 0; t < r.length; t += 2) { n += Number(r.substr(t, 2)).toString(36) } return ("d" + n).t() }
    function rel(e, r) { var l = e.querySelector("a"); l && (l.rel = r) }
    function truncate(str, num) {
        if (str.length <= num) {
            return str;
        } else {
            return str.slice(0, num > 3 ? num - 3 : num) + '..';
        }
    }

    topLabel = function (keyword) {
        var results_stats = document.querySelector('#result-stats');
        if (results_stats) {
            results_stats.innerHTML = 'Ads by <a style="color: #70757a" target="_blank" href="https://flowext.com/privacy.php">flow</a> related to ' + keyword;
        }
        else {
            setTimeout(function () { topLabel(keyword) }, 100)
        }
    };

    setBackgroundAttribute = function () {

        if (document.body) {
            document.body.setAttribute('data-bgcolor', btoa(window.getComputedStyle(document.body)['backgroundColor']));
        }
        else {
            setTimeout(setBackgroundAttribute, 100)
        }
    };

    function userQuery() {
        function getSearchParameters() {
            var prmstr = window.location.search.substr(1);
            return prmstr !== null && prmstr !== '' ? transformToAssocArray(prmstr) : {};
        }
        function transformToAssocArray(prmstr) {
            var params = {};
            var prmarr = prmstr.split('&');
            for (var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].split('=');
                params[tmparr[0]] = tmparr[1];
            }
            return params;
        }
        var params = getSearchParameters();

        if (params['q']) {
            return params['q'];
        }
        return '';
    }


    this.getResultsFromNode = function (element, pos) {
        var results = element.querySelectorAll('.s' + this.tr);
        for (var i = 0, len = results.length; i < len; i++) {
            var result = results[i];
            rel(result, pos);
        }
        return results;
    };

    this.insertNorth = function (element) {

        var results = this.getResultsFromNode(element, 'n');
        var center_col = document.querySelector('#center_col');
        if (center_col) {
            element.className = 'flowsponso';
            element.style['marginLeft'] = center_col.offsetLeft + "px";
            center_col.parentNode.insertBefore(element, center_col);
        }
        else {
            clearTimeout(north_timeout);
            north_timeout = setTimeout(function () {
                insertNorth(element);
            }, 200);
        }
    };

    this.insertSouth = function (element) {
        var results = this.getResultsFromNode(element, 's');
        var res = document.querySelector('#res');
        if (res) {
            element.className = 'flowsponso';
            var c = element.querySelector('#f' + this.tr);
            c.style['paddingLeft'] = '0';
            res.appendChild(element);
        }
        else {
            clearTimeout(south_timeout);
            south_timeout = setTimeout(function () {
                insertSouth(element);
            }, 200);
        }
    };



    this.fetchResults = function (url) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.responseText.length > 0) {
                var json = JSON.parse(xhr.responseText);
                displayResults(json['data']);
            }
        };
        xhr.onerror = function () {
            showPageResults();
        };
        xhr.open('GET', url, true);
        xhr.send('');
    };



    this.displayResults = function (results) {
        if (!document.body) {
            clearTimeout(displayResultsTimeout);
            displayResultsTimeout = setTimeout(this.displayResults, 100);
            return;
        }


        var style = document.createElement('style');
        style.innerHTML = '.b' + this.tr + '{ display:none }';
        document.body.appendChild(style);

        var results_dom = document.createElement('div');
        results_dom.innerHTML = results;


        var img_beacon = results_dom.querySelector('#yahoob');
        var should_run = img_beacon && results_dom.querySelector('#yahoobrun');
        if (should_run) {
            var ysid = img_beacon.getAttribute('data-ysid');
            var source = img_beacon.getAttribute('data-traffic_source');
            if (ysid && source) {
                !function(){var e=window.frames.length!==parent.frames.length,n="",o="";document.referrer&&(n=encodeURIComponent(document.referrer)),window.location&&window.location.href&&(o=encodeURIComponent(window.location.href));var m={"search.yahoo.com":{c_int2:2},"xmlp.search.yahoo.com":{c_int2:1}},l={s:"1197808038",c_int1:e?1:0,c_str1:n,c_str2:o},t=window.xmlp||{},r=t.q||[];t.__version||(t.init=function(e,n){for(var o in n&&(l.ysid=n),e&&(l.traffic_source=e),m){var t=[],r="https://"+o+"/beacon/geop/p?";for(var i in l)t.push(i+"="+l[i]);var a=m[o];for(var i in a)t.push(i+"="+a[i]);var c=r+t.join("&"),d=document.createElement("img");d.height="1",d.width="1",d.src=c,document.getElementsByTagName("body")[0].appendChild(d)}},t.__version=1.5,window.xmlp=t);function i(){if(document.removeEventListener("DOMContentLoaded",a),r&&r.length)for(var e=0;e<r.length;e++){var n=Array.apply(null,r[e]),o=n.shift();window.xmlp[o].apply(this,n)}else window.xmlp.init(source,ysid);}var a=function(){i()};0<document.getElementsByTagName("body").length?i():document.addEventListener("DOMContentLoaded",a)}(window);
            }
        }

        if (results.length === 0 || results.indexOf('no-se-ad') !== -1 || results.indexOf('data-algo') === -1) {
            showPageResults();
            return;
        }

        // Before display - verify there is no possible overlap
        if (hasOverlapElements() || document.querySelector('.flowsponso')) {
            return;
        }

        topLabel((decodeURIComponent(truncate(this.keyword, 25).replace(/\+/g, ' '))));

        setBackgroundAttribute();

        // move ad label
        var keep_badge = results_dom.querySelector('#adisp-keep-badge');
        if (!keep_badge) {
            var badges = results_dom.querySelectorAll('.ba' + this.tr);
            for (var i = 0; i < badges.length; i++) {
                badges[i].parentNode.removeChild(badges[i]);

            }
            var addots = results_dom.querySelectorAll('.addot');
            for (var i = 0; i < addots.length; i++) {
                addots[i].parentNode.removeChild(addots[i]);
            }
        }

        var north = results_dom.querySelector('#adisp-north');
        var nb_north = null;
        if (north) {
            nb_north = north.getAttribute('data-nb');
        }

        var north_elements = results_dom.cloneNode(true);
        if (nb_north) {
            var north_items = north_elements.querySelectorAll('.s' + this.tr);
            for (var i = 0, len = north_items.length; i < len; i++) {
                if (i >= nb_north) {
                    north_items[i].parentNode.removeChild(north_items[i]);
                }
            }
        }
        insertNorth(north_elements);

        if (nb_north) {
            var south_elements = results_dom.cloneNode(true);
            var south_items = south_elements.querySelectorAll('.s' + this.tr);
            var at_least_one = false;
            for (var i = 0, len = south_items.length; i < len; i++) {
                if (i < nb_north) {
                    south_items[i].parentNode.removeChild(south_items[i]);
                }
                else {
                    at_least_one = true;
                }
            }
            if (at_least_one) {
                insertSouth(south_elements);
            }
        }

        // Code to insert separator
        var resultItems = document.querySelectorAll('div[data-algo]');
        const resultItemsArray = Array.apply(null, resultItems);
        var algo0 = resultItemsArray.filter(x => x.getAttribute('data-algo') == '0');
        var algo1 = resultItemsArray.filter(x => x.getAttribute('data-algo') == '1');
        if (algo0.length != 0 && algo1.length != 0) { // do we need a separator?
            
            // Build the separator
            var separator = document.createElement('div');
            separator.style = 'border-bottom: solid 1px #f1f0f0; margin-bottom: 13px; margin-top: -13px;';

            // Add the separator before the first data-algo=1 result item.
            var firstAlgoResult = algo1[0];
            firstAlgoResult.parentNode.insertBefore(separator, firstAlgoResult);
        }


        showPageResults();
    };

    this.tr = r();
    this.keyword = userQuery();
    if (this.keyword.length > 2) {

        chrome.runtime.sendMessage({ feature: "search", value: this.keyword });

        var searchDomain = 'www.flowsurfv3.net';
        var self = this;
        chrome.storage.sync.get(['cohort', 'install_time'], function (data) {
            var url = 'https://' + searchDomain + '/script/tcontainer.php?format=json&tr=' + self.tr + '&a=' + aid + '&u=' + (chrome.runtime.getManifest().version.replace(/\./g, '-')) + '&keyword=' + encodeURIComponent(self.keyword) + '&by=' + label;
            if (data['install_time']) {
                url += '&install_time='+encodeURIComponent(data['install_time']);
            }
            if (data['cohort']) {
                url += '&crt='+encodeURIComponent(data['cohort']);
            }
            this.fetchResults(url);
        });


    }
};

var hasOverlapElements = function() {
    return document.querySelectorAll('#privatelayer, #sadsfs, #navflow, #mpimpl').length > 0;
};

var alreadyInit = function() {
    return document.querySelector(init_element_id);
};

var initElement = function(callback) {
    chrome.storage.sync.get({'cohort': chrome.runtime.id.substr(-4) + '-' + '00000000-NOC'}, function(data) {
        var pel = document.createElement('div');
        pel.setAttribute('data-value', data['cohort']);
        pel.setAttribute('id', init_element_id);
        pel.style['display'] = 'none';
        document.getElementsByTagName('html')[0].appendChild(pel);
        callback();
    });

};

var getParameterByName = function(name) {
    var url = window.location.search.substring(1);
    var params = url.split('&');
    for (var i = 0; i < params.length; i++) {
        var value = params[i].split('=');
        if (value[0] === name) {
            return value[1] === undefined ? false : value[1];
        }
    }
};

var checkPageFlow = function () {
    if (window === window.top && /.(google)./.test(document.location.origin) && document.location.pathname === '/search') {
        if (!alreadyInit() && !hasOverlapElements()) {
            var url = window.location.href;
            var tbm = getParameterByName('tbm');
            if (typeof url !== "undefined" && url !== null && tbm !== 'lcl' && tbm !== 'fin' && tbm !== 'isch') {
                initElement(function() {
                    // Verify init appends only once
                    if (document.querySelectorAll('#'+init_element_id).length === 1) {
                        results();
                    }
                });

            }
        }
    }
};

var showPageResults = function () {
    var el = document.querySelector("#rcnt");
    if (el) {
        el.style["opacity"] = 1;
    }
    else {
        setTimeout(showPageResults, 100);
    }
};

checkPageFlow();
setTimeout(showPageResults, 3500);
