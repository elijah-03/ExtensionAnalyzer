function getLanguage() {
  var lang = AB_API_CONFIG[getAmazonDomain()].lang;
  if (! AB_I18N[lang]) lang = null;
  if (! lang) lang = 'default';
  return lang;
}

function getAmazonDomain() {
  return window.location.host;
}

// function getEbayDomain() {
//   return AB_I18N[getLanguage()].ebay_domain;
// }

function thousands_delimiter(number) {
  number = '' + number;
  if (number.length > 3) {
    var mod = number.length % 3;
    var output = (mod > 0 ? (number.substring(0,mod)) : '');

    for (i = 0; i < Math.floor(number.length / 3); i++) {
      if ((mod == 0) && (i == 0)) {
        output += number.substring(mod + 3 * i, mod + 3 * i + 3);
      } else {
        output += '.' + number.substring(mod + 3 * i, mod + 3 * i + 3);
      }
    }
    return (output);
  } else {
    return number;
  }
}

function number_format(number) {
  var number_array = number.toFixed(2, 10).toString().split(/\./);
  return (thousands_delimiter(number_array[0]) + "," + number_array[1]);
}

// function generateKeywords(str, prefix, suffix) {
//   if (typeof str === 'undefined' || str.length == 0) str = '';

//   if (typeof prefix === 'undefined' || prefix.length == 0) prefix = '';
//   else prefix += ' ';

//   if (typeof suffix === 'undefined' || suffix.length == 0) suffix = '';
//   else suffix = ' ' + suffix;

//   var number_of_keywords = 3;

//   var keywords = str.replace(/\n/, "").replace(/\s{2,}/, " ").replace(/[:\-_\*&]/g, ' ').replace(/^\s+|\s+$/g, '').toLowerCase();
//   // keywords = keywords.replace(/[^0-9a-zöäüß\s]/, "");
//   keywords = keywords.replace(/[\.,;:\-_\/&%$§"!\^°\(\)\[\]\{\}=\?`´\*\+#'<>]/, "");

//   // use first x words of title as keywords
//   keywords = keywords.split(" ", number_of_keywords).join(" ");

//   if (AB_DEBUG) console.log("[AmazonBay] Generated keywords: " + prefix + keywords + suffix);

//   return (prefix + keywords + suffix).trim();
// }
