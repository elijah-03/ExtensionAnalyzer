var punycode = new function() {
  function r(a, c) {
    return a + 22 + 75 * (26 > a) - ((0 != c) << 5);
  }
  function t(a, c, d) {
    a = d ? Math.floor(a / 700) : a >> 1;
    a += Math.floor(a / c);
    for (c = 0; 455 < a; c += 36) {
      a = Math.floor(a / 35);
    }
    return Math.floor(c + 36 * a / (a + 38));
  }
  function u(a, c) {
    a -= (26 > a - 97) << 5;
    return a + ((!c && 26 > a - 65) << 5);
  }
  this.utf16 = {decode:function(a) {
    for (var c = [], d = 0, b = a.length, e, k; d < b;) {
      e = a.charCodeAt(d++);
      if (55296 === (e & 63488)) {
        k = a.charCodeAt(d++);
        if (55296 !== (e & 64512) || 56320 !== (k & 64512)) {
          throw new RangeError("UTF-16(decode): Illegal UTF-16 sequence");
        }
        e = ((e & 1023) << 10) + (k & 1023) + 65536;
      }
      c.push(e);
    }
    return c;
  }, encode:function(a) {
    for (var c = [], d = 0, b = a.length, e; d < b;) {
      e = a[d++];
      if (55296 === (e & 63488)) {
        throw new RangeError("UTF-16(encode): Illegal UTF-16 value");
      }
      65535 < e && (e -= 65536, c.push(String.fromCharCode(e >>> 10 & 1023 | 55296)), e = 56320 | e & 1023);
      c.push(String.fromCharCode(e));
    }
    return c.join("");
  }};
  this.decode = function(a, c) {
    var d = [], b = [], e = a.length, k, m;
    var n = 128;
    var f = 0;
    var q = 72;
    var l = a.lastIndexOf("-");
    0 > l && (l = 0);
    for (k = 0; k < l; ++k) {
      c && (b[d.length] = 26 > a.charCodeAt(k) - 65);
      if (128 <= a.charCodeAt(k)) {
        throw new RangeError("Illegal input >= 0x80");
      }
      d.push(a.charCodeAt(k));
    }
    for (l = 0 < l ? l + 1 : 0; l < e;) {
      k = f;
      var h = 1;
      for (m = 36;; m += 36) {
        if (l >= e) {
          throw RangeError("punycode_bad_input(1)");
        }
        var g = a.charCodeAt(l++);
        g = 10 > g - 48 ? g - 22 : 26 > g - 65 ? g - 65 : 26 > g - 97 ? g - 97 : 36;
        if (36 <= g) {
          throw RangeError("punycode_bad_input(2)");
        }
        if (g > Math.floor((2147483647 - f) / h)) {
          throw RangeError("punycode_overflow(1)");
        }
        f += g * h;
        var p = m <= q ? 1 : m >= q + 26 ? 26 : m - q;
        if (g < p) {
          break;
        }
        if (h > Math.floor(2147483647 / (36 - p))) {
          throw RangeError("punycode_overflow(2)");
        }
        h *= 36 - p;
      }
      h = d.length + 1;
      q = t(f - k, h, 0 === k);
      if (Math.floor(f / h) > 2147483647 - n) {
        throw RangeError("punycode_overflow(3)");
      }
      n += Math.floor(f / h);
      f %= h;
      c && b.splice(f, 0, 26 > a.charCodeAt(l - 1) - 65);
      d.splice(f, 0, n);
      f++;
    }
    if (c) {
      for (f = 0, a = d.length; f < a; f++) {
        b[f] && (d[f] = String.fromCharCode(d[f]).toUpperCase().charCodeAt(0));
      }
    }
    return this.utf16.encode(d);
  };
  this.encode = function(a, c) {
    var d, b, e;
    c && (e = this.utf16.decode(a));
    a = this.utf16.decode(a.toLowerCase());
    var k = a.length;
    if (c) {
      for (b = 0; b < k; b++) {
        e[b] = a[b] != e[b];
      }
    }
    var m = [];
    var n = 128;
    var f = 0;
    var q = 72;
    for (b = 0; b < k; ++b) {
      128 > a[b] && m.push(String.fromCharCode(e ? u(a[b], e[b]) : a[b]));
    }
    var l = d = m.length;
    for (0 < d && m.push("-"); l < k;) {
      var h = 2147483647;
      for (b = 0; b < k; ++b) {
        var g = a[b];
        g >= n && g < h && (h = g);
      }
      if (h - n > Math.floor((2147483647 - f) / (l + 1))) {
        throw RangeError("punycode_overflow (1)");
      }
      f += (h - n) * (l + 1);
      n = h;
      for (b = 0; b < k; ++b) {
        g = a[b];
        if (g < n && 2147483647 < ++f) {
          return Error("punycode_overflow(2)");
        }
        if (g == n) {
          h = f;
          for (g = 36;; g += 36) {
            var p = g <= q ? 1 : g >= q + 26 ? 26 : g - q;
            if (h < p) {
              break;
            }
            m.push(String.fromCharCode(r(p + (h - p) % (36 - p), 0)));
            h = Math.floor((h - p) / (36 - p));
          }
          m.push(String.fromCharCode(r(h, c && e[b] ? 1 : 0)));
          q = t(f, l + 1, l == d);
          f = 0;
          ++l;
        }
      }
      ++f;
      ++n;
    }
    return m.join("");
  };
  this.ToASCII = function(a) {
    a = a.split(".");
    for (var c = [], d = 0; d < a.length; ++d) {
      var b = a[d];
      c.push(b.match(/[^A-Za-z0-9-]/) ? "xn--" + punycode.encode(b) : b);
    }
    return c.join(".");
  };
  this.ToUnicode = function(a) {
    a = a.split(".");
    for (var c = [], d = 0; d < a.length; ++d) {
      var b = a[d];
      c.push(b.match(/^xn--/) ? punycode.decode(b.slice(4)) : b);
    }
    return c.join(".");
  };
};

