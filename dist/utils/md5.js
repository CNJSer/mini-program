"use strict";

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s) {
  return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}
function b64_md5(s) {
  return binl2b64(core_md5(str2binl(s), s.length * chrsz));
}
function str_md5(s) {
  return binl2str(core_md5(str2binl(s), s.length * chrsz));
}
function hex_hmac_md5(key, data) {
  return binl2hex(core_hmac_md5(key, data));
}
function b64_hmac_md5(key, data) {
  return binl2b64(core_hmac_md5(key, data));
}
function str_hmac_md5(key, data) {
  return binl2str(core_hmac_md5(key, data));
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test() {
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;

  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data) {
  var bkey = str2binl(key);
  if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16),
      opad = Array(16);
  for (var i = 0; i < 16; i++) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xFFFF;
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str) {
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for (var i = 0; i < str.length * chrsz; i += chrsz) {
    bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
  }return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin) {
  var str = "";
  var mask = (1 << chrsz) - 1;
  for (var i = 0; i < bin.length * 32; i += chrsz) {
    str += String.fromCharCode(bin[i >> 5] >>> i % 32 & mask);
  }return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray) {
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray) {
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i += 3) {
    var triplet = (binarray[i >> 2] >> 8 * (i % 4) & 0xFF) << 16 | (binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 0xFF) << 8 | binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4) & 0xFF;
    for (var j = 0; j < 4; j++) {
      if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;else str += tab.charAt(triplet >> 6 * (3 - j) & 0x3F);
    }
  }
  return str;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1kNS5qcyJdLCJuYW1lcyI6WyJoZXhjYXNlIiwiYjY0cGFkIiwiY2hyc3oiLCJoZXhfbWQ1IiwicyIsImJpbmwyaGV4IiwiY29yZV9tZDUiLCJzdHIyYmlubCIsImxlbmd0aCIsImI2NF9tZDUiLCJiaW5sMmI2NCIsInN0cl9tZDUiLCJiaW5sMnN0ciIsImhleF9obWFjX21kNSIsImtleSIsImRhdGEiLCJjb3JlX2htYWNfbWQ1IiwiYjY0X2htYWNfbWQ1Iiwic3RyX2htYWNfbWQ1IiwibWQ1X3ZtX3Rlc3QiLCJ4IiwibGVuIiwiYSIsImIiLCJjIiwiZCIsImkiLCJvbGRhIiwib2xkYiIsIm9sZGMiLCJvbGRkIiwibWQ1X2ZmIiwibWQ1X2dnIiwibWQ1X2hoIiwibWQ1X2lpIiwic2FmZV9hZGQiLCJBcnJheSIsIm1kNV9jbW4iLCJxIiwidCIsImJpdF9yb2wiLCJia2V5IiwiaXBhZCIsIm9wYWQiLCJoYXNoIiwiY29uY2F0IiwieSIsImxzdyIsIm1zdyIsIm51bSIsImNudCIsInN0ciIsImJpbiIsIm1hc2siLCJjaGFyQ29kZUF0IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiYmluYXJyYXkiLCJoZXhfdGFiIiwiY2hhckF0IiwidGFiIiwidHJpcGxldCIsImoiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7OztBQVNBOzs7O0FBSUEsSUFBSUEsVUFBVSxDQUFkLEMsQ0FBa0I7QUFDbEIsSUFBSUMsU0FBVSxFQUFkLEMsQ0FBa0I7QUFDbEIsSUFBSUMsUUFBVSxDQUFkLEMsQ0FBa0I7O0FBRWxCOzs7O0FBSUEsU0FBU0MsT0FBVCxDQUFpQkMsQ0FBakIsRUFBbUI7QUFBRSxTQUFPQyxTQUFTQyxTQUFTQyxTQUFTSCxDQUFULENBQVQsRUFBc0JBLEVBQUVJLE1BQUYsR0FBV04sS0FBakMsQ0FBVCxDQUFQO0FBQTBEO0FBQy9FLFNBQVNPLE9BQVQsQ0FBaUJMLENBQWpCLEVBQW1CO0FBQUUsU0FBT00sU0FBU0osU0FBU0MsU0FBU0gsQ0FBVCxDQUFULEVBQXNCQSxFQUFFSSxNQUFGLEdBQVdOLEtBQWpDLENBQVQsQ0FBUDtBQUEwRDtBQUMvRSxTQUFTUyxPQUFULENBQWlCUCxDQUFqQixFQUFtQjtBQUFFLFNBQU9RLFNBQVNOLFNBQVNDLFNBQVNILENBQVQsQ0FBVCxFQUFzQkEsRUFBRUksTUFBRixHQUFXTixLQUFqQyxDQUFULENBQVA7QUFBMEQ7QUFDL0UsU0FBU1csWUFBVCxDQUFzQkMsR0FBdEIsRUFBMkJDLElBQTNCLEVBQWlDO0FBQUUsU0FBT1YsU0FBU1csY0FBY0YsR0FBZCxFQUFtQkMsSUFBbkIsQ0FBVCxDQUFQO0FBQTRDO0FBQy9FLFNBQVNFLFlBQVQsQ0FBc0JILEdBQXRCLEVBQTJCQyxJQUEzQixFQUFpQztBQUFFLFNBQU9MLFNBQVNNLGNBQWNGLEdBQWQsRUFBbUJDLElBQW5CLENBQVQsQ0FBUDtBQUE0QztBQUMvRSxTQUFTRyxZQUFULENBQXNCSixHQUF0QixFQUEyQkMsSUFBM0IsRUFBaUM7QUFBRSxTQUFPSCxTQUFTSSxjQUFjRixHQUFkLEVBQW1CQyxJQUFuQixDQUFULENBQVA7QUFBNEM7O0FBRS9FOzs7QUFHQSxTQUFTSSxXQUFULEdBQ0E7QUFDRSxTQUFPaEIsUUFBUSxLQUFSLEtBQWtCLGtDQUF6QjtBQUNEOztBQUVEOzs7QUFHQSxTQUFTRyxRQUFULENBQWtCYyxDQUFsQixFQUFxQkMsR0FBckIsRUFDQTtBQUNFO0FBQ0FELElBQUVDLE9BQU8sQ0FBVCxLQUFlLFFBQVVBLEdBQUQsR0FBUSxFQUFoQztBQUNBRCxJQUFFLENBQUdDLE1BQU0sRUFBUCxLQUFlLENBQWhCLElBQXNCLENBQXZCLElBQTRCLEVBQTlCLElBQW9DQSxHQUFwQzs7QUFFQSxNQUFJQyxJQUFLLFVBQVQ7QUFDQSxNQUFJQyxJQUFJLENBQUMsU0FBVDtBQUNBLE1BQUlDLElBQUksQ0FBQyxVQUFUO0FBQ0EsTUFBSUMsSUFBSyxTQUFUOztBQUVBLE9BQUksSUFBSUMsSUFBSSxDQUFaLEVBQWVBLElBQUlOLEVBQUVaLE1BQXJCLEVBQTZCa0IsS0FBSyxFQUFsQyxFQUNBO0FBQ0UsUUFBSUMsT0FBT0wsQ0FBWDtBQUNBLFFBQUlNLE9BQU9MLENBQVg7QUFDQSxRQUFJTSxPQUFPTCxDQUFYO0FBQ0EsUUFBSU0sT0FBT0wsQ0FBWDs7QUFFQUgsUUFBSVMsT0FBT1QsQ0FBUCxFQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CTCxFQUFFTSxJQUFHLENBQUwsQ0FBbkIsRUFBNEIsQ0FBNUIsRUFBZ0MsQ0FBQyxTQUFqQyxDQUFKO0FBQ0FELFFBQUlNLE9BQU9OLENBQVAsRUFBVUgsQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkosRUFBRU0sSUFBRyxDQUFMLENBQW5CLEVBQTRCLEVBQTVCLEVBQWdDLENBQUMsU0FBakMsQ0FBSjtBQUNBRixRQUFJTyxPQUFPUCxDQUFQLEVBQVVDLENBQVYsRUFBYUgsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJILEVBQUVNLElBQUcsQ0FBTCxDQUFuQixFQUE0QixFQUE1QixFQUFpQyxTQUFqQyxDQUFKO0FBQ0FILFFBQUlRLE9BQU9SLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCSCxDQUFoQixFQUFtQkYsRUFBRU0sSUFBRyxDQUFMLENBQW5CLEVBQTRCLEVBQTVCLEVBQWdDLENBQUMsVUFBakMsQ0FBSjtBQUNBSixRQUFJUyxPQUFPVCxDQUFQLEVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJMLEVBQUVNLElBQUcsQ0FBTCxDQUFuQixFQUE0QixDQUE1QixFQUFnQyxDQUFDLFNBQWpDLENBQUo7QUFDQUQsUUFBSU0sT0FBT04sQ0FBUCxFQUFVSCxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CSixFQUFFTSxJQUFHLENBQUwsQ0FBbkIsRUFBNEIsRUFBNUIsRUFBaUMsVUFBakMsQ0FBSjtBQUNBRixRQUFJTyxPQUFPUCxDQUFQLEVBQVVDLENBQVYsRUFBYUgsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJILEVBQUVNLElBQUcsQ0FBTCxDQUFuQixFQUE0QixFQUE1QixFQUFnQyxDQUFDLFVBQWpDLENBQUo7QUFDQUgsUUFBSVEsT0FBT1IsQ0FBUCxFQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JILENBQWhCLEVBQW1CRixFQUFFTSxJQUFHLENBQUwsQ0FBbkIsRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxRQUFqQyxDQUFKO0FBQ0FKLFFBQUlTLE9BQU9ULENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkwsRUFBRU0sSUFBRyxDQUFMLENBQW5CLEVBQTRCLENBQTVCLEVBQWlDLFVBQWpDLENBQUo7QUFDQUQsUUFBSU0sT0FBT04sQ0FBUCxFQUFVSCxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CSixFQUFFTSxJQUFHLENBQUwsQ0FBbkIsRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxVQUFqQyxDQUFKO0FBQ0FGLFFBQUlPLE9BQU9QLENBQVAsRUFBVUMsQ0FBVixFQUFhSCxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkgsRUFBRU0sSUFBRSxFQUFKLENBQW5CLEVBQTRCLEVBQTVCLEVBQWdDLENBQUMsS0FBakMsQ0FBSjtBQUNBSCxRQUFJUSxPQUFPUixDQUFQLEVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQkgsQ0FBaEIsRUFBbUJGLEVBQUVNLElBQUUsRUFBSixDQUFuQixFQUE0QixFQUE1QixFQUFnQyxDQUFDLFVBQWpDLENBQUo7QUFDQUosUUFBSVMsT0FBT1QsQ0FBUCxFQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CTCxFQUFFTSxJQUFFLEVBQUosQ0FBbkIsRUFBNEIsQ0FBNUIsRUFBaUMsVUFBakMsQ0FBSjtBQUNBRCxRQUFJTSxPQUFPTixDQUFQLEVBQVVILENBQVYsRUFBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJKLEVBQUVNLElBQUUsRUFBSixDQUFuQixFQUE0QixFQUE1QixFQUFnQyxDQUFDLFFBQWpDLENBQUo7QUFDQUYsUUFBSU8sT0FBT1AsQ0FBUCxFQUFVQyxDQUFWLEVBQWFILENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CSCxFQUFFTSxJQUFFLEVBQUosQ0FBbkIsRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxVQUFqQyxDQUFKO0FBQ0FILFFBQUlRLE9BQU9SLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCSCxDQUFoQixFQUFtQkYsRUFBRU0sSUFBRSxFQUFKLENBQW5CLEVBQTRCLEVBQTVCLEVBQWlDLFVBQWpDLENBQUo7O0FBRUFKLFFBQUlVLE9BQU9WLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkwsRUFBRU0sSUFBRyxDQUFMLENBQW5CLEVBQTRCLENBQTVCLEVBQWdDLENBQUMsU0FBakMsQ0FBSjtBQUNBRCxRQUFJTyxPQUFPUCxDQUFQLEVBQVVILENBQVYsRUFBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJKLEVBQUVNLElBQUcsQ0FBTCxDQUFuQixFQUE0QixDQUE1QixFQUFnQyxDQUFDLFVBQWpDLENBQUo7QUFDQUYsUUFBSVEsT0FBT1IsQ0FBUCxFQUFVQyxDQUFWLEVBQWFILENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CSCxFQUFFTSxJQUFFLEVBQUosQ0FBbkIsRUFBNEIsRUFBNUIsRUFBaUMsU0FBakMsQ0FBSjtBQUNBSCxRQUFJUyxPQUFPVCxDQUFQLEVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQkgsQ0FBaEIsRUFBbUJGLEVBQUVNLElBQUcsQ0FBTCxDQUFuQixFQUE0QixFQUE1QixFQUFnQyxDQUFDLFNBQWpDLENBQUo7QUFDQUosUUFBSVUsT0FBT1YsQ0FBUCxFQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CTCxFQUFFTSxJQUFHLENBQUwsQ0FBbkIsRUFBNEIsQ0FBNUIsRUFBZ0MsQ0FBQyxTQUFqQyxDQUFKO0FBQ0FELFFBQUlPLE9BQU9QLENBQVAsRUFBVUgsQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkosRUFBRU0sSUFBRSxFQUFKLENBQW5CLEVBQTRCLENBQTVCLEVBQWlDLFFBQWpDLENBQUo7QUFDQUYsUUFBSVEsT0FBT1IsQ0FBUCxFQUFVQyxDQUFWLEVBQWFILENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CSCxFQUFFTSxJQUFFLEVBQUosQ0FBbkIsRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxTQUFqQyxDQUFKO0FBQ0FILFFBQUlTLE9BQU9ULENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCSCxDQUFoQixFQUFtQkYsRUFBRU0sSUFBRyxDQUFMLENBQW5CLEVBQTRCLEVBQTVCLEVBQWdDLENBQUMsU0FBakMsQ0FBSjtBQUNBSixRQUFJVSxPQUFPVixDQUFQLEVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJMLEVBQUVNLElBQUcsQ0FBTCxDQUFuQixFQUE0QixDQUE1QixFQUFpQyxTQUFqQyxDQUFKO0FBQ0FELFFBQUlPLE9BQU9QLENBQVAsRUFBVUgsQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkosRUFBRU0sSUFBRSxFQUFKLENBQW5CLEVBQTRCLENBQTVCLEVBQWdDLENBQUMsVUFBakMsQ0FBSjtBQUNBRixRQUFJUSxPQUFPUixDQUFQLEVBQVVDLENBQVYsRUFBYUgsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJILEVBQUVNLElBQUcsQ0FBTCxDQUFuQixFQUE0QixFQUE1QixFQUFnQyxDQUFDLFNBQWpDLENBQUo7QUFDQUgsUUFBSVMsT0FBT1QsQ0FBUCxFQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JILENBQWhCLEVBQW1CRixFQUFFTSxJQUFHLENBQUwsQ0FBbkIsRUFBNEIsRUFBNUIsRUFBaUMsVUFBakMsQ0FBSjtBQUNBSixRQUFJVSxPQUFPVixDQUFQLEVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJMLEVBQUVNLElBQUUsRUFBSixDQUFuQixFQUE0QixDQUE1QixFQUFnQyxDQUFDLFVBQWpDLENBQUo7QUFDQUQsUUFBSU8sT0FBT1AsQ0FBUCxFQUFVSCxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CSixFQUFFTSxJQUFHLENBQUwsQ0FBbkIsRUFBNEIsQ0FBNUIsRUFBZ0MsQ0FBQyxRQUFqQyxDQUFKO0FBQ0FGLFFBQUlRLE9BQU9SLENBQVAsRUFBVUMsQ0FBVixFQUFhSCxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkgsRUFBRU0sSUFBRyxDQUFMLENBQW5CLEVBQTRCLEVBQTVCLEVBQWlDLFVBQWpDLENBQUo7QUFDQUgsUUFBSVMsT0FBT1QsQ0FBUCxFQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JILENBQWhCLEVBQW1CRixFQUFFTSxJQUFFLEVBQUosQ0FBbkIsRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxVQUFqQyxDQUFKOztBQUVBSixRQUFJVyxPQUFPWCxDQUFQLEVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJMLEVBQUVNLElBQUcsQ0FBTCxDQUFuQixFQUE0QixDQUE1QixFQUFnQyxDQUFDLE1BQWpDLENBQUo7QUFDQUQsUUFBSVEsT0FBT1IsQ0FBUCxFQUFVSCxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CSixFQUFFTSxJQUFHLENBQUwsQ0FBbkIsRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxVQUFqQyxDQUFKO0FBQ0FGLFFBQUlTLE9BQU9ULENBQVAsRUFBVUMsQ0FBVixFQUFhSCxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkgsRUFBRU0sSUFBRSxFQUFKLENBQW5CLEVBQTRCLEVBQTVCLEVBQWlDLFVBQWpDLENBQUo7QUFDQUgsUUFBSVUsT0FBT1YsQ0FBUCxFQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JILENBQWhCLEVBQW1CRixFQUFFTSxJQUFFLEVBQUosQ0FBbkIsRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxRQUFqQyxDQUFKO0FBQ0FKLFFBQUlXLE9BQU9YLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkwsRUFBRU0sSUFBRyxDQUFMLENBQW5CLEVBQTRCLENBQTVCLEVBQWdDLENBQUMsVUFBakMsQ0FBSjtBQUNBRCxRQUFJUSxPQUFPUixDQUFQLEVBQVVILENBQVYsRUFBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJKLEVBQUVNLElBQUcsQ0FBTCxDQUFuQixFQUE0QixFQUE1QixFQUFpQyxVQUFqQyxDQUFKO0FBQ0FGLFFBQUlTLE9BQU9ULENBQVAsRUFBVUMsQ0FBVixFQUFhSCxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkgsRUFBRU0sSUFBRyxDQUFMLENBQW5CLEVBQTRCLEVBQTVCLEVBQWdDLENBQUMsU0FBakMsQ0FBSjtBQUNBSCxRQUFJVSxPQUFPVixDQUFQLEVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQkgsQ0FBaEIsRUFBbUJGLEVBQUVNLElBQUUsRUFBSixDQUFuQixFQUE0QixFQUE1QixFQUFnQyxDQUFDLFVBQWpDLENBQUo7QUFDQUosUUFBSVcsT0FBT1gsQ0FBUCxFQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CTCxFQUFFTSxJQUFFLEVBQUosQ0FBbkIsRUFBNEIsQ0FBNUIsRUFBaUMsU0FBakMsQ0FBSjtBQUNBRCxRQUFJUSxPQUFPUixDQUFQLEVBQVVILENBQVYsRUFBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJKLEVBQUVNLElBQUcsQ0FBTCxDQUFuQixFQUE0QixFQUE1QixFQUFnQyxDQUFDLFNBQWpDLENBQUo7QUFDQUYsUUFBSVMsT0FBT1QsQ0FBUCxFQUFVQyxDQUFWLEVBQWFILENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CSCxFQUFFTSxJQUFHLENBQUwsQ0FBbkIsRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxTQUFqQyxDQUFKO0FBQ0FILFFBQUlVLE9BQU9WLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCSCxDQUFoQixFQUFtQkYsRUFBRU0sSUFBRyxDQUFMLENBQW5CLEVBQTRCLEVBQTVCLEVBQWlDLFFBQWpDLENBQUo7QUFDQUosUUFBSVcsT0FBT1gsQ0FBUCxFQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CTCxFQUFFTSxJQUFHLENBQUwsQ0FBbkIsRUFBNEIsQ0FBNUIsRUFBZ0MsQ0FBQyxTQUFqQyxDQUFKO0FBQ0FELFFBQUlRLE9BQU9SLENBQVAsRUFBVUgsQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkosRUFBRU0sSUFBRSxFQUFKLENBQW5CLEVBQTRCLEVBQTVCLEVBQWdDLENBQUMsU0FBakMsQ0FBSjtBQUNBRixRQUFJUyxPQUFPVCxDQUFQLEVBQVVDLENBQVYsRUFBYUgsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJILEVBQUVNLElBQUUsRUFBSixDQUFuQixFQUE0QixFQUE1QixFQUFpQyxTQUFqQyxDQUFKO0FBQ0FILFFBQUlVLE9BQU9WLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCSCxDQUFoQixFQUFtQkYsRUFBRU0sSUFBRyxDQUFMLENBQW5CLEVBQTRCLEVBQTVCLEVBQWdDLENBQUMsU0FBakMsQ0FBSjs7QUFFQUosUUFBSVksT0FBT1osQ0FBUCxFQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CTCxFQUFFTSxJQUFHLENBQUwsQ0FBbkIsRUFBNEIsQ0FBNUIsRUFBZ0MsQ0FBQyxTQUFqQyxDQUFKO0FBQ0FELFFBQUlTLE9BQU9ULENBQVAsRUFBVUgsQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkosRUFBRU0sSUFBRyxDQUFMLENBQW5CLEVBQTRCLEVBQTVCLEVBQWlDLFVBQWpDLENBQUo7QUFDQUYsUUFBSVUsT0FBT1YsQ0FBUCxFQUFVQyxDQUFWLEVBQWFILENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CSCxFQUFFTSxJQUFFLEVBQUosQ0FBbkIsRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxVQUFqQyxDQUFKO0FBQ0FILFFBQUlXLE9BQU9YLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCSCxDQUFoQixFQUFtQkYsRUFBRU0sSUFBRyxDQUFMLENBQW5CLEVBQTRCLEVBQTVCLEVBQWdDLENBQUMsUUFBakMsQ0FBSjtBQUNBSixRQUFJWSxPQUFPWixDQUFQLEVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJMLEVBQUVNLElBQUUsRUFBSixDQUFuQixFQUE0QixDQUE1QixFQUFpQyxVQUFqQyxDQUFKO0FBQ0FELFFBQUlTLE9BQU9ULENBQVAsRUFBVUgsQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkosRUFBRU0sSUFBRyxDQUFMLENBQW5CLEVBQTRCLEVBQTVCLEVBQWdDLENBQUMsVUFBakMsQ0FBSjtBQUNBRixRQUFJVSxPQUFPVixDQUFQLEVBQVVDLENBQVYsRUFBYUgsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJILEVBQUVNLElBQUUsRUFBSixDQUFuQixFQUE0QixFQUE1QixFQUFnQyxDQUFDLE9BQWpDLENBQUo7QUFDQUgsUUFBSVcsT0FBT1gsQ0FBUCxFQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JILENBQWhCLEVBQW1CRixFQUFFTSxJQUFHLENBQUwsQ0FBbkIsRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxVQUFqQyxDQUFKO0FBQ0FKLFFBQUlZLE9BQU9aLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkwsRUFBRU0sSUFBRyxDQUFMLENBQW5CLEVBQTRCLENBQTVCLEVBQWlDLFVBQWpDLENBQUo7QUFDQUQsUUFBSVMsT0FBT1QsQ0FBUCxFQUFVSCxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CSixFQUFFTSxJQUFFLEVBQUosQ0FBbkIsRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxRQUFqQyxDQUFKO0FBQ0FGLFFBQUlVLE9BQU9WLENBQVAsRUFBVUMsQ0FBVixFQUFhSCxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkgsRUFBRU0sSUFBRyxDQUFMLENBQW5CLEVBQTRCLEVBQTVCLEVBQWdDLENBQUMsVUFBakMsQ0FBSjtBQUNBSCxRQUFJVyxPQUFPWCxDQUFQLEVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQkgsQ0FBaEIsRUFBbUJGLEVBQUVNLElBQUUsRUFBSixDQUFuQixFQUE0QixFQUE1QixFQUFpQyxVQUFqQyxDQUFKO0FBQ0FKLFFBQUlZLE9BQU9aLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkwsRUFBRU0sSUFBRyxDQUFMLENBQW5CLEVBQTRCLENBQTVCLEVBQWdDLENBQUMsU0FBakMsQ0FBSjtBQUNBRCxRQUFJUyxPQUFPVCxDQUFQLEVBQVVILENBQVYsRUFBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJKLEVBQUVNLElBQUUsRUFBSixDQUFuQixFQUE0QixFQUE1QixFQUFnQyxDQUFDLFVBQWpDLENBQUo7QUFDQUYsUUFBSVUsT0FBT1YsQ0FBUCxFQUFVQyxDQUFWLEVBQWFILENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CSCxFQUFFTSxJQUFHLENBQUwsQ0FBbkIsRUFBNEIsRUFBNUIsRUFBaUMsU0FBakMsQ0FBSjtBQUNBSCxRQUFJVyxPQUFPWCxDQUFQLEVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQkgsQ0FBaEIsRUFBbUJGLEVBQUVNLElBQUcsQ0FBTCxDQUFuQixFQUE0QixFQUE1QixFQUFnQyxDQUFDLFNBQWpDLENBQUo7O0FBRUFKLFFBQUlhLFNBQVNiLENBQVQsRUFBWUssSUFBWixDQUFKO0FBQ0FKLFFBQUlZLFNBQVNaLENBQVQsRUFBWUssSUFBWixDQUFKO0FBQ0FKLFFBQUlXLFNBQVNYLENBQVQsRUFBWUssSUFBWixDQUFKO0FBQ0FKLFFBQUlVLFNBQVNWLENBQVQsRUFBWUssSUFBWixDQUFKO0FBQ0Q7QUFDRCxTQUFPTSxNQUFNZCxDQUFOLEVBQVNDLENBQVQsRUFBWUMsQ0FBWixFQUFlQyxDQUFmLENBQVA7QUFFRDs7QUFFRDs7O0FBR0EsU0FBU1ksT0FBVCxDQUFpQkMsQ0FBakIsRUFBb0JoQixDQUFwQixFQUF1QkMsQ0FBdkIsRUFBMEJILENBQTFCLEVBQTZCaEIsQ0FBN0IsRUFBZ0NtQyxDQUFoQyxFQUNBO0FBQ0UsU0FBT0osU0FBU0ssUUFBUUwsU0FBU0EsU0FBU2IsQ0FBVCxFQUFZZ0IsQ0FBWixDQUFULEVBQXlCSCxTQUFTZixDQUFULEVBQVltQixDQUFaLENBQXpCLENBQVIsRUFBa0RuQyxDQUFsRCxDQUFULEVBQThEbUIsQ0FBOUQsQ0FBUDtBQUNEO0FBQ0QsU0FBU1EsTUFBVCxDQUFnQlQsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCQyxDQUF0QixFQUF5QkMsQ0FBekIsRUFBNEJMLENBQTVCLEVBQStCaEIsQ0FBL0IsRUFBa0NtQyxDQUFsQyxFQUNBO0FBQ0UsU0FBT0YsUUFBU2QsSUFBSUMsQ0FBTCxHQUFZLENBQUNELENBQUYsR0FBT0UsQ0FBMUIsRUFBOEJILENBQTlCLEVBQWlDQyxDQUFqQyxFQUFvQ0gsQ0FBcEMsRUFBdUNoQixDQUF2QyxFQUEwQ21DLENBQTFDLENBQVA7QUFDRDtBQUNELFNBQVNQLE1BQVQsQ0FBZ0JWLENBQWhCLEVBQW1CQyxDQUFuQixFQUFzQkMsQ0FBdEIsRUFBeUJDLENBQXpCLEVBQTRCTCxDQUE1QixFQUErQmhCLENBQS9CLEVBQWtDbUMsQ0FBbEMsRUFDQTtBQUNFLFNBQU9GLFFBQVNkLElBQUlFLENBQUwsR0FBV0QsSUFBSyxDQUFDQyxDQUF6QixFQUE4QkgsQ0FBOUIsRUFBaUNDLENBQWpDLEVBQW9DSCxDQUFwQyxFQUF1Q2hCLENBQXZDLEVBQTBDbUMsQ0FBMUMsQ0FBUDtBQUNEO0FBQ0QsU0FBU04sTUFBVCxDQUFnQlgsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCQyxDQUF0QixFQUF5QkMsQ0FBekIsRUFBNEJMLENBQTVCLEVBQStCaEIsQ0FBL0IsRUFBa0NtQyxDQUFsQyxFQUNBO0FBQ0UsU0FBT0YsUUFBUWQsSUFBSUMsQ0FBSixHQUFRQyxDQUFoQixFQUFtQkgsQ0FBbkIsRUFBc0JDLENBQXRCLEVBQXlCSCxDQUF6QixFQUE0QmhCLENBQTVCLEVBQStCbUMsQ0FBL0IsQ0FBUDtBQUNEO0FBQ0QsU0FBU0wsTUFBVCxDQUFnQlosQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCQyxDQUF0QixFQUF5QkMsQ0FBekIsRUFBNEJMLENBQTVCLEVBQStCaEIsQ0FBL0IsRUFBa0NtQyxDQUFsQyxFQUNBO0FBQ0UsU0FBT0YsUUFBUWIsS0FBS0QsSUFBSyxDQUFDRSxDQUFYLENBQVIsRUFBd0JILENBQXhCLEVBQTJCQyxDQUEzQixFQUE4QkgsQ0FBOUIsRUFBaUNoQixDQUFqQyxFQUFvQ21DLENBQXBDLENBQVA7QUFDRDs7QUFFRDs7O0FBR0EsU0FBU3ZCLGFBQVQsQ0FBdUJGLEdBQXZCLEVBQTRCQyxJQUE1QixFQUNBO0FBQ0UsTUFBSTBCLE9BQU9sQyxTQUFTTyxHQUFULENBQVg7QUFDQSxNQUFHMkIsS0FBS2pDLE1BQUwsR0FBYyxFQUFqQixFQUFxQmlDLE9BQU9uQyxTQUFTbUMsSUFBVCxFQUFlM0IsSUFBSU4sTUFBSixHQUFhTixLQUE1QixDQUFQOztBQUVyQixNQUFJd0MsT0FBT04sTUFBTSxFQUFOLENBQVg7QUFBQSxNQUFzQk8sT0FBT1AsTUFBTSxFQUFOLENBQTdCO0FBQ0EsT0FBSSxJQUFJVixJQUFJLENBQVosRUFBZUEsSUFBSSxFQUFuQixFQUF1QkEsR0FBdkIsRUFDQTtBQUNFZ0IsU0FBS2hCLENBQUwsSUFBVWUsS0FBS2YsQ0FBTCxJQUFVLFVBQXBCO0FBQ0FpQixTQUFLakIsQ0FBTCxJQUFVZSxLQUFLZixDQUFMLElBQVUsVUFBcEI7QUFDRDs7QUFFRCxNQUFJa0IsT0FBT3RDLFNBQVNvQyxLQUFLRyxNQUFMLENBQVl0QyxTQUFTUSxJQUFULENBQVosQ0FBVCxFQUFzQyxNQUFNQSxLQUFLUCxNQUFMLEdBQWNOLEtBQTFELENBQVg7QUFDQSxTQUFPSSxTQUFTcUMsS0FBS0UsTUFBTCxDQUFZRCxJQUFaLENBQVQsRUFBNEIsTUFBTSxHQUFsQyxDQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxTQUFTVCxRQUFULENBQWtCZixDQUFsQixFQUFxQjBCLENBQXJCLEVBQ0E7QUFDRSxNQUFJQyxNQUFNLENBQUMzQixJQUFJLE1BQUwsS0FBZ0IwQixJQUFJLE1BQXBCLENBQVY7QUFDQSxNQUFJRSxNQUFNLENBQUM1QixLQUFLLEVBQU4sS0FBYTBCLEtBQUssRUFBbEIsS0FBeUJDLE9BQU8sRUFBaEMsQ0FBVjtBQUNBLFNBQVFDLE9BQU8sRUFBUixHQUFlRCxNQUFNLE1BQTVCO0FBQ0Q7O0FBRUQ7OztBQUdBLFNBQVNQLE9BQVQsQ0FBaUJTLEdBQWpCLEVBQXNCQyxHQUF0QixFQUNBO0FBQ0UsU0FBUUQsT0FBT0MsR0FBUixHQUFnQkQsUUFBUyxLQUFLQyxHQUFyQztBQUNEOztBQUVEOzs7O0FBSUEsU0FBUzNDLFFBQVQsQ0FBa0I0QyxHQUFsQixFQUNBO0FBQ0UsTUFBSUMsTUFBTWhCLE9BQVY7QUFDQSxNQUFJaUIsT0FBTyxDQUFDLEtBQUtuRCxLQUFOLElBQWUsQ0FBMUI7QUFDQSxPQUFJLElBQUl3QixJQUFJLENBQVosRUFBZUEsSUFBSXlCLElBQUkzQyxNQUFKLEdBQWFOLEtBQWhDLEVBQXVDd0IsS0FBS3hCLEtBQTVDO0FBQ0VrRCxRQUFJMUIsS0FBRyxDQUFQLEtBQWEsQ0FBQ3lCLElBQUlHLFVBQUosQ0FBZTVCLElBQUl4QixLQUFuQixJQUE0Qm1ELElBQTdCLEtBQXVDM0IsSUFBRSxFQUF0RDtBQURGLEdBRUEsT0FBTzBCLEdBQVA7QUFDRDs7QUFFRDs7O0FBR0EsU0FBU3hDLFFBQVQsQ0FBa0J3QyxHQUFsQixFQUNBO0FBQ0UsTUFBSUQsTUFBTSxFQUFWO0FBQ0EsTUFBSUUsT0FBTyxDQUFDLEtBQUtuRCxLQUFOLElBQWUsQ0FBMUI7QUFDQSxPQUFJLElBQUl3QixJQUFJLENBQVosRUFBZUEsSUFBSTBCLElBQUk1QyxNQUFKLEdBQWEsRUFBaEMsRUFBb0NrQixLQUFLeEIsS0FBekM7QUFDRWlELFdBQU9JLE9BQU9DLFlBQVAsQ0FBcUJKLElBQUkxQixLQUFHLENBQVAsTUFBZUEsSUFBSSxFQUFwQixHQUEyQjJCLElBQS9DLENBQVA7QUFERixHQUVBLE9BQU9GLEdBQVA7QUFDRDs7QUFFRDs7O0FBR0EsU0FBUzlDLFFBQVQsQ0FBa0JvRCxRQUFsQixFQUNBO0FBQ0UsTUFBSUMsVUFBVTFELFVBQVUsa0JBQVYsR0FBK0Isa0JBQTdDO0FBQ0EsTUFBSW1ELE1BQU0sRUFBVjtBQUNBLE9BQUksSUFBSXpCLElBQUksQ0FBWixFQUFlQSxJQUFJK0IsU0FBU2pELE1BQVQsR0FBa0IsQ0FBckMsRUFBd0NrQixHQUF4QyxFQUNBO0FBQ0V5QixXQUFPTyxRQUFRQyxNQUFSLENBQWdCRixTQUFTL0IsS0FBRyxDQUFaLEtBQW9CQSxJQUFFLENBQUgsR0FBTSxDQUFOLEdBQVEsQ0FBNUIsR0FBa0MsR0FBakQsSUFDQWdDLFFBQVFDLE1BQVIsQ0FBZ0JGLFNBQVMvQixLQUFHLENBQVosS0FBb0JBLElBQUUsQ0FBSCxHQUFNLENBQTFCLEdBQWtDLEdBQWpELENBRFA7QUFFRDtBQUNELFNBQU95QixHQUFQO0FBQ0Q7O0FBRUQ7OztBQUdBLFNBQVN6QyxRQUFULENBQWtCK0MsUUFBbEIsRUFDQTtBQUNFLE1BQUlHLE1BQU0sa0VBQVY7QUFDQSxNQUFJVCxNQUFNLEVBQVY7QUFDQSxPQUFJLElBQUl6QixJQUFJLENBQVosRUFBZUEsSUFBSStCLFNBQVNqRCxNQUFULEdBQWtCLENBQXJDLEVBQXdDa0IsS0FBSyxDQUE3QyxFQUNBO0FBQ0UsUUFBSW1DLFVBQVcsQ0FBRUosU0FBUy9CLEtBQU8sQ0FBaEIsS0FBc0IsS0FBTUEsSUFBSyxDQUFYLENBQXZCLEdBQXdDLElBQXpDLEtBQWtELEVBQW5ELEdBQ0MsQ0FBRStCLFNBQVMvQixJQUFFLENBQUYsSUFBTyxDQUFoQixLQUFzQixLQUFLLENBQUNBLElBQUUsQ0FBSCxJQUFNLENBQVgsQ0FBdkIsR0FBd0MsSUFBekMsS0FBa0QsQ0FEbkQsR0FFRytCLFNBQVMvQixJQUFFLENBQUYsSUFBTyxDQUFoQixLQUFzQixLQUFLLENBQUNBLElBQUUsQ0FBSCxJQUFNLENBQVgsQ0FBdkIsR0FBd0MsSUFGeEQ7QUFHQSxTQUFJLElBQUlvQyxJQUFJLENBQVosRUFBZUEsSUFBSSxDQUFuQixFQUFzQkEsR0FBdEIsRUFDQTtBQUNFLFVBQUdwQyxJQUFJLENBQUosR0FBUW9DLElBQUksQ0FBWixHQUFnQkwsU0FBU2pELE1BQVQsR0FBa0IsRUFBckMsRUFBeUMyQyxPQUFPbEQsTUFBUCxDQUF6QyxLQUNLa0QsT0FBT1MsSUFBSUQsTUFBSixDQUFZRSxXQUFXLEtBQUcsSUFBRUMsQ0FBTCxDQUFaLEdBQXVCLElBQWxDLENBQVA7QUFDTjtBQUNGO0FBQ0QsU0FBT1gsR0FBUDtBQUNEIiwiZmlsZSI6Im1kNS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcclxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cclxuICogVmVyc2lvbiAyLjEgQ29weXJpZ2h0IChDKSBQYXVsIEpvaG5zdG9uIDE5OTkgLSAyMDAyLlxyXG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XHJcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxyXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxyXG4gKi9cclxuXHJcbi8qXHJcbiAqIENvbmZpZ3VyYWJsZSB2YXJpYWJsZXMuIFlvdSBtYXkgbmVlZCB0byB0d2VhayB0aGVzZSB0byBiZSBjb21wYXRpYmxlIHdpdGhcclxuICogdGhlIHNlcnZlci1zaWRlLCBidXQgdGhlIGRlZmF1bHRzIHdvcmsgaW4gbW9zdCBjYXNlcy5cclxuICovXHJcbnZhciBoZXhjYXNlID0gMDsgIC8qIGhleCBvdXRwdXQgZm9ybWF0LiAwIC0gbG93ZXJjYXNlOyAxIC0gdXBwZXJjYXNlICAgICAgICAqL1xyXG52YXIgYjY0cGFkICA9IFwiXCI7IC8qIGJhc2UtNjQgcGFkIGNoYXJhY3Rlci4gXCI9XCIgZm9yIHN0cmljdCBSRkMgY29tcGxpYW5jZSAgICovXHJcbnZhciBjaHJzeiAgID0gODsgIC8qIGJpdHMgcGVyIGlucHV0IGNoYXJhY3Rlci4gOCAtIEFTQ0lJOyAxNiAtIFVuaWNvZGUgICAgICAqL1xyXG5cclxuLypcclxuICogVGhlc2UgYXJlIHRoZSBmdW5jdGlvbnMgeW91J2xsIHVzdWFsbHkgd2FudCB0byBjYWxsXHJcbiAqIFRoZXkgdGFrZSBzdHJpbmcgYXJndW1lbnRzIGFuZCByZXR1cm4gZWl0aGVyIGhleCBvciBiYXNlLTY0IGVuY29kZWQgc3RyaW5nc1xyXG4gKi9cclxuZnVuY3Rpb24gaGV4X21kNShzKXsgcmV0dXJuIGJpbmwyaGV4KGNvcmVfbWQ1KHN0cjJiaW5sKHMpLCBzLmxlbmd0aCAqIGNocnN6KSk7fVxyXG5mdW5jdGlvbiBiNjRfbWQ1KHMpeyByZXR1cm4gYmlubDJiNjQoY29yZV9tZDUoc3RyMmJpbmwocyksIHMubGVuZ3RoICogY2hyc3opKTt9XHJcbmZ1bmN0aW9uIHN0cl9tZDUocyl7IHJldHVybiBiaW5sMnN0cihjb3JlX21kNShzdHIyYmlubChzKSwgcy5sZW5ndGggKiBjaHJzeikpO31cclxuZnVuY3Rpb24gaGV4X2htYWNfbWQ1KGtleSwgZGF0YSkgeyByZXR1cm4gYmlubDJoZXgoY29yZV9obWFjX21kNShrZXksIGRhdGEpKTsgfVxyXG5mdW5jdGlvbiBiNjRfaG1hY19tZDUoa2V5LCBkYXRhKSB7IHJldHVybiBiaW5sMmI2NChjb3JlX2htYWNfbWQ1KGtleSwgZGF0YSkpOyB9XHJcbmZ1bmN0aW9uIHN0cl9obWFjX21kNShrZXksIGRhdGEpIHsgcmV0dXJuIGJpbmwyc3RyKGNvcmVfaG1hY19tZDUoa2V5LCBkYXRhKSk7IH1cclxuXHJcbi8qXHJcbiAqIFBlcmZvcm0gYSBzaW1wbGUgc2VsZi10ZXN0IHRvIHNlZSBpZiB0aGUgVk0gaXMgd29ya2luZ1xyXG4gKi9cclxuZnVuY3Rpb24gbWQ1X3ZtX3Rlc3QoKVxyXG57XHJcbiAgcmV0dXJuIGhleF9tZDUoXCJhYmNcIikgPT0gXCI5MDAxNTA5ODNjZDI0ZmIwZDY5NjNmN2QyOGUxN2Y3MlwiO1xyXG59XHJcblxyXG4vKlxyXG4gKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoXHJcbiAqL1xyXG5mdW5jdGlvbiBjb3JlX21kNSh4LCBsZW4pXHJcbntcclxuICAvKiBhcHBlbmQgcGFkZGluZyAqL1xyXG4gIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgKChsZW4pICUgMzIpO1xyXG4gIHhbKCgobGVuICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IGxlbjtcclxuXHJcbiAgdmFyIGEgPSAgMTczMjU4NDE5MztcclxuICB2YXIgYiA9IC0yNzE3MzM4Nzk7XHJcbiAgdmFyIGMgPSAtMTczMjU4NDE5NDtcclxuICB2YXIgZCA9ICAyNzE3MzM4Nzg7XHJcblxyXG4gIGZvcih2YXIgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNilcclxuICB7XHJcbiAgICB2YXIgb2xkYSA9IGE7XHJcbiAgICB2YXIgb2xkYiA9IGI7XHJcbiAgICB2YXIgb2xkYyA9IGM7XHJcbiAgICB2YXIgb2xkZCA9IGQ7XHJcblxyXG4gICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2krIDBdLCA3ICwgLTY4MDg3NjkzNik7XHJcbiAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSsgMV0sIDEyLCAtMzg5NTY0NTg2KTtcclxuICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpKyAyXSwgMTcsICA2MDYxMDU4MTkpO1xyXG4gICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2krIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xyXG4gICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2krIDRdLCA3ICwgLTE3NjQxODg5Nyk7XHJcbiAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSsgNV0sIDEyLCAgMTIwMDA4MDQyNik7XHJcbiAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XHJcbiAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSsgN10sIDIyLCAtNDU3MDU5ODMpO1xyXG4gICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2krIDhdLCA3ICwgIDE3NzAwMzU0MTYpO1xyXG4gICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2krIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xyXG4gICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2krMTBdLCAxNywgLTQyMDYzKTtcclxuICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpKzExXSwgMjIsIC0xOTkwNDA0MTYyKTtcclxuICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpKzEyXSwgNyAsICAxODA0NjAzNjgyKTtcclxuICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpKzEzXSwgMTIsIC00MDM0MTEwMSk7XHJcbiAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSsxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XHJcbiAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSsxNV0sIDIyLCAgMTIzNjUzNTMyOSk7XHJcblxyXG4gICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2krIDFdLCA1ICwgLTE2NTc5NjUxMCk7XHJcbiAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSsgNl0sIDkgLCAtMTA2OTUwMTYzMik7XHJcbiAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSsxMV0sIDE0LCAgNjQzNzE3NzEzKTtcclxuICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpKyAwXSwgMjAsIC0zNzM4OTczMDIpO1xyXG4gICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2krIDVdLCA1ICwgLTcwMTU1ODY5MSk7XHJcbiAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSsxMF0sIDkgLCAgMzgwMTYwODMpO1xyXG4gICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2krMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XHJcbiAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcclxuICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpKyA5XSwgNSAsICA1Njg0NDY0MzgpO1xyXG4gICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2krMTRdLCA5ICwgLTEwMTk4MDM2OTApO1xyXG4gICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2krIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XHJcbiAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSsgOF0sIDIwLCAgMTE2MzUzMTUwMSk7XHJcbiAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSsxM10sIDUgLCAtMTQ0NDY4MTQ2Nyk7XHJcbiAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSsgMl0sIDkgLCAtNTE0MDM3ODQpO1xyXG4gICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2krIDddLCAxNCwgIDE3MzUzMjg0NzMpO1xyXG4gICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2krMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xyXG5cclxuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKyA1XSwgNCAsIC0zNzg1NTgpO1xyXG4gICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2krIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xyXG4gICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2krMTFdLCAxNiwgIDE4MzkwMzA1NjIpO1xyXG4gICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2krMTRdLCAyMywgLTM1MzA5NTU2KTtcclxuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKyAxXSwgNCAsIC0xNTMwOTkyMDYwKTtcclxuICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpKyA0XSwgMTEsICAxMjcyODkzMzUzKTtcclxuICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpKyA3XSwgMTYsIC0xNTU0OTc2MzIpO1xyXG4gICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2krMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xyXG4gICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2krMTNdLCA0ICwgIDY4MTI3OTE3NCk7XHJcbiAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSsgMF0sIDExLCAtMzU4NTM3MjIyKTtcclxuICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xyXG4gICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2krIDZdLCAyMywgIDc2MDI5MTg5KTtcclxuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKyA5XSwgNCAsIC02NDAzNjQ0ODcpO1xyXG4gICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2krMTJdLCAxMSwgLTQyMTgxNTgzNSk7XHJcbiAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSsxNV0sIDE2LCAgNTMwNzQyNTIwKTtcclxuICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xyXG5cclxuICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpKyAwXSwgNiAsIC0xOTg2MzA4NDQpO1xyXG4gICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2krIDddLCAxMCwgIDExMjY4OTE0MTUpO1xyXG4gICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2krMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xyXG4gICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2krIDVdLCAyMSwgLTU3NDM0MDU1KTtcclxuICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpKzEyXSwgNiAsICAxNzAwNDg1NTcxKTtcclxuICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcclxuICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpKzEwXSwgMTUsIC0xMDUxNTIzKTtcclxuICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpKyAxXSwgMjEsIC0yMDU0OTIyNzk5KTtcclxuICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpKyA4XSwgNiAsICAxODczMzEzMzU5KTtcclxuICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpKzE1XSwgMTAsIC0zMDYxMTc0NCk7XHJcbiAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSsgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XHJcbiAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSsxM10sIDIxLCAgMTMwOTE1MTY0OSk7XHJcbiAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSsgNF0sIDYgLCAtMTQ1NTIzMDcwKTtcclxuICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpKzExXSwgMTAsIC0xMTIwMjEwMzc5KTtcclxuICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpKyAyXSwgMTUsICA3MTg3ODcyNTkpO1xyXG4gICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2krIDldLCAyMSwgLTM0MzQ4NTU1MSk7XHJcblxyXG4gICAgYSA9IHNhZmVfYWRkKGEsIG9sZGEpO1xyXG4gICAgYiA9IHNhZmVfYWRkKGIsIG9sZGIpO1xyXG4gICAgYyA9IHNhZmVfYWRkKGMsIG9sZGMpO1xyXG4gICAgZCA9IHNhZmVfYWRkKGQsIG9sZGQpO1xyXG4gIH1cclxuICByZXR1cm4gQXJyYXkoYSwgYiwgYywgZCk7XHJcblxyXG59XHJcblxyXG4vKlxyXG4gKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxyXG4gKi9cclxuZnVuY3Rpb24gbWQ1X2NtbihxLCBhLCBiLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIHNhZmVfYWRkKGJpdF9yb2woc2FmZV9hZGQoc2FmZV9hZGQoYSwgcSksIHNhZmVfYWRkKHgsIHQpKSwgcyksYik7XHJcbn1cclxuZnVuY3Rpb24gbWQ1X2ZmKGEsIGIsIGMsIGQsIHgsIHMsIHQpXHJcbntcclxuICByZXR1cm4gbWQ1X2NtbigoYiAmIGMpIHwgKCh+YikgJiBkKSwgYSwgYiwgeCwgcywgdCk7XHJcbn1cclxuZnVuY3Rpb24gbWQ1X2dnKGEsIGIsIGMsIGQsIHgsIHMsIHQpXHJcbntcclxuICByZXR1cm4gbWQ1X2NtbigoYiAmIGQpIHwgKGMgJiAofmQpKSwgYSwgYiwgeCwgcywgdCk7XHJcbn1cclxuZnVuY3Rpb24gbWQ1X2hoKGEsIGIsIGMsIGQsIHgsIHMsIHQpXHJcbntcclxuICByZXR1cm4gbWQ1X2NtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpO1xyXG59XHJcbmZ1bmN0aW9uIG1kNV9paShhLCBiLCBjLCBkLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIG1kNV9jbW4oYyBeIChiIHwgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xyXG59XHJcblxyXG4vKlxyXG4gKiBDYWxjdWxhdGUgdGhlIEhNQUMtTUQ1LCBvZiBhIGtleSBhbmQgc29tZSBkYXRhXHJcbiAqL1xyXG5mdW5jdGlvbiBjb3JlX2htYWNfbWQ1KGtleSwgZGF0YSlcclxue1xyXG4gIHZhciBia2V5ID0gc3RyMmJpbmwoa2V5KTtcclxuICBpZihia2V5Lmxlbmd0aCA+IDE2KSBia2V5ID0gY29yZV9tZDUoYmtleSwga2V5Lmxlbmd0aCAqIGNocnN6KTtcclxuXHJcbiAgdmFyIGlwYWQgPSBBcnJheSgxNiksIG9wYWQgPSBBcnJheSgxNik7XHJcbiAgZm9yKHZhciBpID0gMDsgaSA8IDE2OyBpKyspXHJcbiAge1xyXG4gICAgaXBhZFtpXSA9IGJrZXlbaV0gXiAweDM2MzYzNjM2O1xyXG4gICAgb3BhZFtpXSA9IGJrZXlbaV0gXiAweDVDNUM1QzVDO1xyXG4gIH1cclxuXHJcbiAgdmFyIGhhc2ggPSBjb3JlX21kNShpcGFkLmNvbmNhdChzdHIyYmlubChkYXRhKSksIDUxMiArIGRhdGEubGVuZ3RoICogY2hyc3opO1xyXG4gIHJldHVybiBjb3JlX21kNShvcGFkLmNvbmNhdChoYXNoKSwgNTEyICsgMTI4KTtcclxufVxyXG5cclxuLypcclxuICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxyXG4gKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxyXG4gKi9cclxuZnVuY3Rpb24gc2FmZV9hZGQoeCwgeSlcclxue1xyXG4gIHZhciBsc3cgPSAoeCAmIDB4RkZGRikgKyAoeSAmIDB4RkZGRik7XHJcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xyXG4gIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xyXG59XHJcblxyXG4vKlxyXG4gKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXHJcbiAqL1xyXG5mdW5jdGlvbiBiaXRfcm9sKG51bSwgY250KVxyXG57XHJcbiAgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpO1xyXG59XHJcblxyXG4vKlxyXG4gKiBDb252ZXJ0IGEgc3RyaW5nIHRvIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHNcclxuICogSWYgY2hyc3ogaXMgQVNDSUksIGNoYXJhY3RlcnMgPjI1NSBoYXZlIHRoZWlyIGhpLWJ5dGUgc2lsZW50bHkgaWdub3JlZC5cclxuICovXHJcbmZ1bmN0aW9uIHN0cjJiaW5sKHN0cilcclxue1xyXG4gIHZhciBiaW4gPSBBcnJheSgpO1xyXG4gIHZhciBtYXNrID0gKDEgPDwgY2hyc3opIC0gMTtcclxuICBmb3IodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aCAqIGNocnN6OyBpICs9IGNocnN6KVxyXG4gICAgYmluW2k+PjVdIHw9IChzdHIuY2hhckNvZGVBdChpIC8gY2hyc3opICYgbWFzaykgPDwgKGklMzIpO1xyXG4gIHJldHVybiBiaW47XHJcbn1cclxuXHJcbi8qXHJcbiAqIENvbnZlcnQgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcyB0byBhIHN0cmluZ1xyXG4gKi9cclxuZnVuY3Rpb24gYmlubDJzdHIoYmluKVxyXG57XHJcbiAgdmFyIHN0ciA9IFwiXCI7XHJcbiAgdmFyIG1hc2sgPSAoMSA8PCBjaHJzeikgLSAxO1xyXG4gIGZvcih2YXIgaSA9IDA7IGkgPCBiaW4ubGVuZ3RoICogMzI7IGkgKz0gY2hyc3opXHJcbiAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYmluW2k+PjVdID4+PiAoaSAlIDMyKSkgJiBtYXNrKTtcclxuICByZXR1cm4gc3RyO1xyXG59XHJcblxyXG4vKlxyXG4gKiBDb252ZXJ0IGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMgdG8gYSBoZXggc3RyaW5nLlxyXG4gKi9cclxuZnVuY3Rpb24gYmlubDJoZXgoYmluYXJyYXkpXHJcbntcclxuICB2YXIgaGV4X3RhYiA9IGhleGNhc2UgPyBcIjAxMjM0NTY3ODlBQkNERUZcIiA6IFwiMDEyMzQ1Njc4OWFiY2RlZlwiO1xyXG4gIHZhciBzdHIgPSBcIlwiO1xyXG4gIGZvcih2YXIgaSA9IDA7IGkgPCBiaW5hcnJheS5sZW5ndGggKiA0OyBpKyspXHJcbiAge1xyXG4gICAgc3RyICs9IGhleF90YWIuY2hhckF0KChiaW5hcnJheVtpPj4yXSA+PiAoKGklNCkqOCs0KSkgJiAweEYpICtcclxuICAgICAgICAgICBoZXhfdGFiLmNoYXJBdCgoYmluYXJyYXlbaT4+Ml0gPj4gKChpJTQpKjggICkpICYgMHhGKTtcclxuICB9XHJcbiAgcmV0dXJuIHN0cjtcclxufVxyXG5cclxuLypcclxuICogQ29udmVydCBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzIHRvIGEgYmFzZS02NCBzdHJpbmdcclxuICovXHJcbmZ1bmN0aW9uIGJpbmwyYjY0KGJpbmFycmF5KVxyXG57XHJcbiAgdmFyIHRhYiA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiO1xyXG4gIHZhciBzdHIgPSBcIlwiO1xyXG4gIGZvcih2YXIgaSA9IDA7IGkgPCBiaW5hcnJheS5sZW5ndGggKiA0OyBpICs9IDMpXHJcbiAge1xyXG4gICAgdmFyIHRyaXBsZXQgPSAoKChiaW5hcnJheVtpICAgPj4gMl0gPj4gOCAqICggaSAgICU0KSkgJiAweEZGKSA8PCAxNilcclxuICAgICAgICAgICAgICAgIHwgKCgoYmluYXJyYXlbaSsxID4+IDJdID4+IDggKiAoKGkrMSklNCkpICYgMHhGRikgPDwgOCApXHJcbiAgICAgICAgICAgICAgICB8ICAoKGJpbmFycmF5W2krMiA+PiAyXSA+PiA4ICogKChpKzIpJTQpKSAmIDB4RkYpO1xyXG4gICAgZm9yKHZhciBqID0gMDsgaiA8IDQ7IGorKylcclxuICAgIHtcclxuICAgICAgaWYoaSAqIDggKyBqICogNiA+IGJpbmFycmF5Lmxlbmd0aCAqIDMyKSBzdHIgKz0gYjY0cGFkO1xyXG4gICAgICBlbHNlIHN0ciArPSB0YWIuY2hhckF0KCh0cmlwbGV0ID4+IDYqKDMtaikpICYgMHgzRik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBzdHI7XHJcbn1cclxuIl19