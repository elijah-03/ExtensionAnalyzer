var AB_DEBUG = true;

// https://go.developer.ebay.com/api-call-limits
var ebay_appname = 'Leadhabe-amabay-PRD-78dfd86bc-ea1a7402';
var ebay_affiliate_networkId = 9; // 9 = EPN
var ebay_affiliate_trackingId = 5338167948;
var ebay_affiliate_customId = 'amabay2';

var AB_I18N = {
  'default': {
    on_ebay_from: 'On eBay from',
    amazon_domain: 'www.amazon.com',
    ebay_domain: 'www.ebay.com'
  },
  'us': {
    on_ebay_from: 'Buy this product on eBay from',
    amazon_domain: 'www.amazon.com',
    ebay_domain: 'www.ebay.com'
  },
  'gb': {
    on_ebay_from: 'Buy this product on eBay from',
    amazon_domain: 'www.amazon.co.uk',
    ebay_domain: 'www.ebay.co.uk'
  },
  'de': {
    on_ebay_from: 'Dieses Produkt gibt es auf eBay ab',
    amazon_domain: 'www.amazon.de',
    ebay_domain: 'www.ebay.de'
  },
  'fr': {
    on_ebay_from: 'Sur eBay à partir de',
    amazon_domain: 'www.amazon.fr',
    ebay_domain: 'www.ebay.fr'
  },
  'es': {
    on_ebay_from: 'En eBay desde',
    amazon_domain: 'www.amazon.es',
    ebay_domain: 'www.ebay.es'
  },
  'br': {
    on_ebay_from: 'On eBay from',
    amazon_domain: 'www.amazon.com.br',
    ebay_domain: 'www.ebay.com'
  },
  'mx': {
    on_ebay_from: 'On eBay from',
    amazon_domain: 'www.amazon.com.mx',
    ebay_domain: 'www.ebay.com'
  },
  'au': {
    on_ebay_from: 'On eBay from',
    amazon_domain: 'www.amazon.com.au',
    ebay_domain: 'www.ebay.com.au'
  },
  'cn': {
    on_ebay_from: '在eBay从',
    amazon_domain: 'www.amazon.cn',
    ebay_domain: 'www.ebay.cn'
  },
  'in': {
    on_ebay_from: 'ईबे पर से',
    amazon_domain: 'www.amazon.in',
    ebay_domain: 'www.ebay.in'
  },
  'it': {
    on_ebay_from: 'Su eBay da',
    amazon_domain: 'www.amazon.it',
    ebay_domain: 'www.ebay.it'
  },
  'jp': {
    on_ebay_from: 'eBayでから',
    amazon_domain: 'www.amazon.co.jp',
    ebay_domain: 'www.ebay.co.jp'
  },
  'ca': {
    on_ebay_from: 'On eBay from',
    amazon_domain: 'www.amazon.ca',
    ebay_domain: 'www.ebay.ca'
  },
  'nl': {
    on_ebay_from: 'Op eBay uit',
    amazon_domain: 'www.amazon.nl',
    ebay_domain: 'www.ebay.nl'
  },
};

// https://developer.ebay.com/devzone/merchandising/docs/callref/Enums/GlobalIdList.html
var AB_API_CONFIG = {
  'www.amazon.com': {
    ebay_id: 'EBAY-US',
    lang: 'us',
    price_conversion: 1.0
  },
  'www.amazon.co.uk': {
    ebay_id: 'EBAY-GB',
    lang: 'gb',
    price_conversion: 1.0
  },
  'www.amazon.de': {
    ebay_id: 'EBAY-DE',
    lang: 'de',
    price_conversion: 1.0
  },
  'www.amazon.fr': {
    ebay_id: 'EBAY-FR',
    lang: 'fr',
    price_conversion: 1.0
  },
  'www.amazon.es': {
    ebay_id: 'EBAY-ES',
    lang: 'es',
    price_conversion: 1.0
  },
  'www.amazon.com.br': {
    ebay_id: 'EBAY-US',
    lang: 'br',
    price_conversion: 1.0
  },
  'www.amazon.com.mx': {
    ebay_id: 'EBAY-US',
    lang: 'mx',
    price_conversion: 20.0
  },
  'www.amazon.com.au': {
    ebay_id: 'EBAY-AU',
    lang: 'au',
    price_conversion: 1.0
  },
  'www.amazon.cn': {
    ebay_id: 'EBAY-HK',
    lang: 'cn',
    price_conversion: 1.0
  },
  'www.amazon.in': {
    ebay_id: 'EBAY-IN',
    lang: 'in',
    price_conversion: 1.0
  },
  'www.amazon.it': {
    ebay_id: 'EBAY-IT',
    lang: 'it',
    price_conversion: 1.0
  },
  'www.amazon.co.jp': {
    ebay_id: 'EBAY-US',
    lang: 'jp',
    price_conversion: 1.0
  },
  'www.amazon.ca': {
    ebay_id: 'EBAY-ENCA',
    lang: 'ca',
    price_conversion: 1.0
  },
  'www.amazon.nl': {
    ebay_id: 'EBAY-NL',
    lang: 'nl',
    price_conversion: 1.0
  },
};
