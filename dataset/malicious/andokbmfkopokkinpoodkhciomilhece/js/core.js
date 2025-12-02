function getASIN() {
  var container;
  var asin = null;
  var match;

  // get asin from page url
  if (document.location.pathname) {
    // if (AB_DEBUG) console.log("[AmazonBay] Get ASIN from URL");
    match = document.location.pathname.match(/[d|g]p\/(product\/|video\/detail\/)?([^\/|\?]*)[\/\?]?/i);
    if (match) {
      asin = match[2];
    }
  }

  if (asin == 'search') asin = null;

  // asin could not be found in page url
  if (! asin) {
    // look for different containers on page
    if (container = document.getElementById('prodDetails')) {
      // if (AB_DEBUG) console.log("[AmazonBay] Get ASIN from container #1");
      asin = container.innerHTML.match(/<td class=.label.>ASIN<\/td>.?<td class=.value.>(.*)<\/td>/i)[1];
    } else if (container = document.getElementById('detail_bullets_id')) {
      // if (AB_DEBUG) console.log("[AmazonBay] Get ASIN from container #2");
      asin = container.innerHTML.match(/<li><b>ASIN:?.?<\/b>(.*)<\/li>/i)[1];
    }
  }

  if (asin && AB_DEBUG) console.log("[AmazonBay] ASIN found: " + asin);

  return asin;
}

// function getModelNumber() {
//   var modelnumber = null;
//   var container;
//   var match;
//   var modelnumber_trans_regexp = '(Modellnummer|Item model number|N.mero de modelo del producto|Mod.le|Manufacturer reference|Modelo|Numero modello articolo)';

//   // https://www.amazon.de/gp/product/B00L4BLL3Y
//   if (container = document.getElementById('detail_bullets_id')) {
//     // if (AB_DEBUG) console.log("[AmazonBay] Get model number from container #1");
//     match = container.innerHTML.match(new RegExp(modelnumber_trans_regexp + '.*</b>\\s(.*)</li>', 'i'));
//     if (match) modelnumber = match[2];
//   }

//   // https://www.amazon.com/dp/B01I19M3KG
//   else if (container = document.getElementById('productDetails_techSpec_section_2')) {
//     // if (AB_DEBUG) console.log("[AmazonBay] Get model number from container #2");
//     match = container.innerHTML.match(new RegExp(modelnumber_trans_regexp + '[^<]+</th>[^<]+<td class="a-size-base">([^<]+)</td>', 'i'));
//     if (match) modelnumber = match[2];
//   }

//   // https://www.amazon.fr/dp/B01ECFADSC
//   else if (container = document.getElementById('productDetails_detailBullets_sections1')) {
//     // if (AB_DEBUG) console.log("[AmazonBay] Get model number from container #2");
//     match = container.innerHTML.match(new RegExp(modelnumber_trans_regexp + '[^<]+</th>[^<]+<td class="a-size-base">([^<]+)</td>', 'i'));
//     if (match) modelnumber = match[2];
//   }

//   // https://www.amazon.com/dp/B01DOKHS8E
//   else if (container = document.getElementById('prodDetails')) {
//     // if (AB_DEBUG) console.log("[AmazonBay] Get model number from container #3");
//     match = container.innerHTML.match(/<td[^<]+>(Modellnummer|Item model number|N.mero de modelo del producto|Mod.le)<\/td><td[^<]+>(.*)<\/td>/i);

//     match = container.innerHTML.match(new RegExp('<td[^<]+>' + modelnumber_trans_regexp + '</td><td[^<]+>(.*)</td>', 'i'));
//     if (match) modelnumber = match[2];
//   }

//   if (modelnumber) {
//     modelnumber = modelnumber.trim();

//     if (AB_DEBUG) console.log("[AmazonBay] Model number found: " + modelnumber);
//   }

//   return modelnumber;
// }

function getAmazonPrice() {
  var container;
  var price;

  if (container = document.getElementById('new-button-price')) {
    price = container.innerText.replace(/[^0-9\,\.\s]/g, '');
    price = price.trim();
    price = price.replace(/\s/, '.');

  } else if (container = document.getElementById('priceblock_ourprice')) {
    price = container.innerText.replace(/[^0-9\,\.]/g, '');

  } else if (container = document.getElementById('priceblock_dealprice')) {
    price = container.innerText.replace(/[^0-9\,\.]/g, '');

  } else if (container = document.getElementById('buyNewSection')) {
    price = container.innerText.replace(/[^0-9\,\.]/g, '');

  }

  if (price) {
    if (price.indexOf(',') > -1 && price.indexOf(',') > price.indexOf('.')) price = price.replace(/\./, '').replace(/,/, '.');
    else if (price.indexOf(',') > -1) price = price.replace(/,/, '');
    price = parseFloat(price);
  }

  if (AB_DEBUG) console.log("[AmazonBay] Get Amazon price", price);

  return price;
}

// function getKeywordsFromHTML() {
//   var title = document.getElementById('productTitle');
//   if (! title) title = document.getElementById('btAsinTitle');

//   if (title) title = title.innerText.toLowerCase().replace(/\n/, "").trim();
//   else title = undefined;

//   var brand = document.getElementById('brand');
//   if (brand) brand = brand.innerText.toLowerCase().replace(/\n/, "").trim();
//   else brand = undefined;

//   if (title && brand) title = title.replace(brand, '').trim();

//   // if (AB_DEBUG) console.log("[AmazonBay] Extracted keywords from HTML: " + title + " (" + brand + ")");
//   return generateKeywords(title, brand);
// }

function removeToolbar() {
  var toolbar;
  if (toolbar = document.getElementById('amazonBayToolbar')) {
    toolbar.remove();
  }
}

function injectButton(keywords, items, amazon, ebay, response) {
  if (AB_DEBUG) console.log("[AmazonBay] Inject button", keywords, items, amazon, ebay, response);

  if (items[0].listingInfo[0].buyItNowAvailable[0] != 'false') {
    var ebay_price = parseFloat(items[0].listingInfo[0].buyItNowPrice[0].__value__);
    if (items[0].listingInfo[0].convertedBuyItNowPrice[0]) ebay_price = parseFloat(items[0].listingInfo[0].convertedBuyItNowPrice[0].__value__);

  } else {
    var ebay_price = parseFloat(items[0].sellingStatus[0].currentPrice[0].__value__);
    if (items[0].sellingStatus[0].convertedCurrentPrice[0]) ebay_price = parseFloat(items[0].sellingStatus[0].convertedCurrentPrice[0].__value__);

  }

  var currency = items[0].sellingStatus[0].currentPrice[0]['@currencyId'];
  if (items[0].sellingStatus[0].convertedCurrentPrice[0]) currency = items[0].sellingStatus[0].convertedCurrentPrice[0]['@currencyId'];

  var amazon_price = amazon.price;
  var ebay_minprice = ebay.minprice;
  var buttonPrice = number_format(ebay_price);
  var buttonLink = response.findItemsByKeywordsResponse[0].itemSearchURL[0];
  // var buttonLink = 'http://' + getEbayDomain() + '/sch/i.html?_nkw=' + keywords + '&_udlo=' + ebay_minprice + '&_sop=15&LH_BIN=1&campid=' + ebay_affiliate_trackingId + '&customid=' + ebay_affiliate_customId;
  var lang = getLanguage();

  removeToolbar();

  var toolbar = document.createElement("div");
  toolbar.id = 'amazonBayToolbar';
  toolbar.style = "background: #222E3D; width: 100%; color: #fff; text-align: center; border-bottom: 1px solid #fff";
  toolbar.innerHTML = "<img src='" + chrome.extension.getURL('img/amasavings-logo.png') + "' height='25' style='float: left; margin-left:27px; margin-top: 8px; margin-right: 10px'>";
  toolbar.innerHTML += "<a href='" + buttonLink + "' target='_blank' style='display: block; padding: 10px; color: inherit'>" + AB_I18N[lang].on_ebay_from + " " + buttonPrice + " " + currency;

  if (AB_DEBUG) console.log("[AmazonBay] Price at Amazon", amazon_price);
  if (AB_DEBUG) console.log("[AmazonBay] Price at eBay", ebay_price);

  // compare without cents
  amazon_price = parseInt(amazon_price);
  ebay_price = parseInt(ebay_price);

  if (! amazon_price || (ebay_price <= amazon_price && ebay_price >= ebay_minprice)) {
    document.body.insertBefore(toolbar, document.body.firstChild);
  }

}

function loadAmazonBay(asin) {
  if (! asin) return;
  if (AB_DEBUG) console.log("[AmazonBay] Initialize...", asin);

  removeToolbar();

  var price = getAmazonPrice();
  currentAsin = asin;

  // send message to background.js to fetch data from APIs
  // background.js then sends message back to this script (see below)
  chrome.runtime.sendMessage({
    action: 'getEbayItems',
    asin: asin,
    price: price,
    minprice: parseInt((price / AB_API_CONFIG[getAmazonDomain()].price_conversion) / 4.0),
    // modelnumber: getModelNumber(), // unused
    // keywords: getKeywordsFromHTML(), // unused
    lang: getLanguage()
  });
}

// listen for message from background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (AB_DEBUG) console.log("[AmazonBay] core.js got message", request);

  if (request.action == "injectButton") {
    injectButton(request.keywords, request.items, request.amazon, request.ebay, request.response);
  } else if (request.action == "gotEAN") {
    if (AB_DEBUG) console.log("[AmazonBay] Found EAN: " + request.ean);
  }
});

var lastLocation = window.location.href;
var currentAsin;

// load extension on page load
window.addEventListener('load', function() {
  loadAmazonBay(getASIN());
});

// check for URL change every second
window.setInterval(function() {
  if (window.location.href != lastLocation) {
    lastLocation = window.location.href;

    var asin = getASIN();
    // asin has changed
    if (asin != currentAsin) {
      loadAmazonBay(asin);
    }
  }
}, 1000);
