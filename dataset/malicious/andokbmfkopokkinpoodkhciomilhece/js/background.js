function getEAN(asin, lang, callback) {
  // if (AB_DEBUG) console.log("[AmazonBay] getEAN request", asin, lang);

  var xhr_proxy = new XMLHttpRequest();
  xhr_proxy.open('POST', 'https://api.amabay.net/get_ean.php', true);
  xhr_proxy.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr_proxy.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr_proxy.onreadystatechange = function() {
    if (xhr_proxy.readyState === 4) {
      if (AB_DEBUG) console.log("[AmazonBay] getEAN response:", xhr_proxy.responseText);

      callback(JSON.parse(xhr_proxy.responseText));
    }
  }
  xhr_proxy.send('lang=' + lang + '&asin=' + asin);
}

function getEbayItems(keywords, ebay_minprice, lang, callback, err_callback) {
  var xhr_ebay = new XMLHttpRequest();

  var ebay_lang = AB_API_CONFIG[AB_I18N[lang].amazon_domain].ebay_id;

  var url = 'https://svcs.ebay.com/services/search/FindingService/v1?RESPONSE-DATA-FORMAT=JSON&GLOBAL-ID=' + ebay_lang + '&OPERATION-NAME=findItemsByKeywords&itemFilter(0).name=ListingType&itemFilter(0).value(0)=AuctionWithBIN&itemFilter(0).value(1)=FixedPrice';
  if (ebay_minprice) url += '&itemFilter(1).name=MinPrice&itemFilter(1).value=' + parseFloat(ebay_minprice);
  url += '&sortOrder=PricePlusShippingLowest&paginationInput.entriesPerPage=1&keywords=' + encodeURI(keywords) + '&SECURITY-APPNAME=' + ebay_appname + '&affiliate.networkId=' + ebay_affiliate_networkId + '&affiliate.trackingId=' + ebay_affiliate_trackingId + '&affiliate.customId=' + ebay_affiliate_customId;

  xhr_ebay.open("GET", url, true); // &productId.@type=EAN&productId=' + keywords
  // if (AB_DEBUG) console.log("[AmazonBay] eBay API URL:", url);

  xhr_ebay.onreadystatechange = function() {
    if (xhr_ebay.readyState === 4) {
      var response = JSON.parse(xhr_ebay.responseText);

      // soft error
      if (response.findItemsByKeywordsResponse[0].ack[0] === 'Failure') {
        if (AB_DEBUG) console.log("[AmazonBay] eBay API response soft-error", xhr_ebay.responseText);
        err_callback(response);

      // no error
      } else {
        // auctions found
        if (response.findItemsByKeywordsResponse[0].searchResult[0]['@count'] > 0) {
          if (AB_DEBUG) console.log("[AmazonBay] Got " + ebay_lang + " item:", response.findItemsByKeywordsResponse[0].searchResult[0].item[0].title[0], response.findItemsByKeywordsResponse[0].searchResult[0].item[0], response);
          callback(response.findItemsByKeywordsResponse[0].searchResult[0].item, response);

        // no auctions found
        } else {
          if (AB_DEBUG) console.log("[AmazonBay] No items on " + ebay_lang + " found");
          callback([], response);

        }

      }
    }
  };
  xhr_ebay.send();
}

// chrome.runtime.onInstalled.addListener(function() {
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([
//       {
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { urlContains: 'amazon' },
//           })
//         ],
//         actions: [ new chrome.declarativeContent.ShowPageAction() ]
//       }
//     ]);
//   });
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (AB_DEBUG) console.log("[AmazonBay] background.js got message", request);

  if (request.action == "getEbayItems") {
    getEAN(request.asin, request.lang, function(ean_response) {
      if (ean_response.status == 'found') {
        // send message to core.js
        chrome.tabs.sendMessage(sender.tab.id, {
          action: "gotEAN",
          ean: ean_response.ean
        });

        getEbayItems(ean_response.ean, request.minprice, request.lang, function(ebay_items, ebay_response) {
          if (ebay_items.length > 0) {
            // send message to core.js which injects button into Amazon page
            chrome.tabs.sendMessage(sender.tab.id, {
              action: "injectButton",
              keywords: ean_response.ean,
              items: ebay_items,
              ebay: {
                minprice: request.minprice
              },
              amazon: {
                price: request.price
              },
              response: ebay_response
            });
          }
        }, function() {
        });
      }
      else if (ean_response.status == 'retry') {
        window.setTimeout(function() {
          chrome.tabs.sendMessage(sender.tab.id, {
            action: "initialize"
          });

            }, ean_response.delay);
        }
    });
  }
});

//GA implemented
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-104784813-1']);

    var details = chrome.app.getDetails();
    _gaq.push(['_trackPageview', '/ping?id='+details.id+'&v='+details.version]);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = 'https://ssl.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

//Install Pages

chrome.runtime.setUninstallURL('https://amasavings.com/index.php?page=uninstall');

chrome.runtime.onInstalled.addListener(function(details){

	if(details.reason === "install"){
		chrome.tabs.create({url:"https://amasavings.com/index.php?page=install"},function(o){});
	}
});
