ls = {isset:function(a) {
  return "undefined" != typeof localStorage[a] ? !0 : !1;
}, get:function(a, b) {
  return null !== localStorage.getItem(a) ? b ? (a = XXTEA.decrypt(localStorage.getItem(a), b)) ? JSON.parse(Utf8.decode(a)) : "" : JSON.parse(localStorage.getItem(a)) : null;
}, set:function(a, b, c) {
  b = JSON.stringify(b);
  c && (b = XXTEA.encrypt(Utf8.encode(b), c));
  localStorage.setItem(a, b);
}, del:function(a) {
  localStorage.removeItem(a);
}, getAll:function() {
  ret = {};
  Object.each(localStorage, function(a, b) {
    try {
      ret[b] = JSON.parse(a);
    } catch (c) {
    }
  });
  return ret;
}};

