import { ref as se, readonly as vt, getCurrentInstance as Se, onMounted as bt, nextTick as St, watch as $t } from "vue";
var wt = Object.defineProperty, $e = Object.getOwnPropertySymbols, xt = Object.prototype.hasOwnProperty, kt = Object.prototype.propertyIsEnumerable, we = (e, t, n) => t in e ? wt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Ot = (e, t) => {
  for (var n in t || (t = {})) xt.call(t, n) && we(e, n, t[n]);
  if ($e) for (var n of $e(t)) kt.call(t, n) && we(e, n, t[n]);
  return e;
};
function ge(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && typeof e == "object" && Object.keys(e).length === 0;
}
function ce(e, t, n = /* @__PURE__ */ new WeakSet()) {
  if (e === t) return !0;
  if (!e || !t || typeof e != "object" || typeof t != "object" || n.has(e) || n.has(t)) return !1;
  n.add(e).add(t);
  let r = Array.isArray(e), o = Array.isArray(t), i, a, s;
  if (r && o) {
    if (a = e.length, a != t.length) return !1;
    for (i = a; i-- !== 0; ) if (!ce(e[i], t[i], n)) return !1;
    return !0;
  }
  if (r != o) return !1;
  let l = e instanceof Date, u = t instanceof Date;
  if (l != u) return !1;
  if (l && u) return e.getTime() == t.getTime();
  let d = e instanceof RegExp, m = t instanceof RegExp;
  if (d != m) return !1;
  if (d && m) return e.toString() == t.toString();
  let c = Object.keys(e);
  if (a = c.length, a !== Object.keys(t).length) return !1;
  for (i = a; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(t, c[i])) return !1;
  for (i = a; i-- !== 0; ) if (s = c[i], !ce(e[s], t[s], n)) return !1;
  return !0;
}
function Ct(e, t) {
  return ce(e, t);
}
function Ie(e) {
  return typeof e == "function" && "call" in e && "apply" in e;
}
function g(e) {
  return !ge(e);
}
function xe(e, t) {
  if (!e || !t) return null;
  try {
    let n = e[t];
    if (g(n)) return n;
  } catch {
  }
  if (Object.keys(e).length) {
    if (Ie(t)) return t(e);
    if (t.indexOf(".") === -1) return e[t];
    {
      let n = t.split("."), r = e;
      for (let o = 0, i = n.length; o < i; ++o) {
        if (r == null) return null;
        r = r[n[o]];
      }
      return r;
    }
  }
  return null;
}
function jt(e, t, n) {
  return n ? xe(e, n) === xe(t, n) : Ct(e, t);
}
function hn(e, t) {
  if (e != null && t && t.length) {
    for (let n of t) if (jt(e, n)) return !0;
  }
  return !1;
}
function N(e, t = !0) {
  return e instanceof Object && e.constructor === Object && (t || Object.keys(e).length !== 0);
}
function Be(e = {}, t = {}) {
  let n = Ot({}, e);
  return Object.keys(t).forEach((r) => {
    let o = r;
    N(t[o]) && o in e && N(e[o]) ? n[o] = Be(e[o], t[o]) : n[o] = t[o];
  }), n;
}
function Ve(...e) {
  return e.reduce((t, n, r) => r === 0 ? n : Be(t, n), {});
}
function gn(e, t) {
  let n = -1;
  if (t) {
    for (let r = 0; r < t.length; r++) if (t[r] === e) {
      n = r;
      break;
    }
  }
  return n;
}
function yn(e, t) {
  let n = -1;
  if (g(e)) try {
    n = e.findLastIndex(t);
  } catch {
    n = e.lastIndexOf([...e].reverse().find(t));
  }
  return n;
}
function k(e, ...t) {
  return Ie(e) ? e(...t) : e;
}
function L(e, t = !0) {
  return typeof e == "string" && (t || e !== "");
}
function ke(e) {
  return L(e) ? e.replace(/(-|_)/g, "").toLowerCase() : e;
}
function _t(e, t = "", n = {}) {
  let r = ke(t).split("."), o = r.shift();
  if (o) {
    if (N(e)) {
      let i = Object.keys(e).find((a) => ke(a) === o) || "";
      return _t(k(e[i], n), r.join("."), n);
    }
    return;
  }
  return k(e, n);
}
function vn(e, t = !0) {
  return Array.isArray(e) && (t || e.length !== 0);
}
function bn(e) {
  return e instanceof Date;
}
function Pt(e) {
  return g(e) && !isNaN(e);
}
function Sn(e = "") {
  return g(e) && e.length === 1 && !!e.match(/\S| /);
}
function $n() {
  return new Intl.Collator(void 0, { numeric: !0 }).compare;
}
function H(e, t) {
  if (t) {
    let n = t.test(e);
    return t.lastIndex = 0, n;
  }
  return !1;
}
function wn(...e) {
  return Ve(...e);
}
function Q(e) {
  return e && e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":").trim();
}
function xn(e) {
  if (e && /[\xC0-\xFF\u0100-\u017E]/.test(e)) {
    let t = { A: /[\xC0-\xC5\u0100\u0102\u0104]/g, AE: /[\xC6]/g, C: /[\xC7\u0106\u0108\u010A\u010C]/g, D: /[\xD0\u010E\u0110]/g, E: /[\xC8-\xCB\u0112\u0114\u0116\u0118\u011A]/g, G: /[\u011C\u011E\u0120\u0122]/g, H: /[\u0124\u0126]/g, I: /[\xCC-\xCF\u0128\u012A\u012C\u012E\u0130]/g, IJ: /[\u0132]/g, J: /[\u0134]/g, K: /[\u0136]/g, L: /[\u0139\u013B\u013D\u013F\u0141]/g, N: /[\xD1\u0143\u0145\u0147\u014A]/g, O: /[\xD2-\xD6\xD8\u014C\u014E\u0150]/g, OE: /[\u0152]/g, R: /[\u0154\u0156\u0158]/g, S: /[\u015A\u015C\u015E\u0160]/g, T: /[\u0162\u0164\u0166]/g, U: /[\xD9-\xDC\u0168\u016A\u016C\u016E\u0170\u0172]/g, W: /[\u0174]/g, Y: /[\xDD\u0176\u0178]/g, Z: /[\u0179\u017B\u017D]/g, a: /[\xE0-\xE5\u0101\u0103\u0105]/g, ae: /[\xE6]/g, c: /[\xE7\u0107\u0109\u010B\u010D]/g, d: /[\u010F\u0111]/g, e: /[\xE8-\xEB\u0113\u0115\u0117\u0119\u011B]/g, g: /[\u011D\u011F\u0121\u0123]/g, i: /[\xEC-\xEF\u0129\u012B\u012D\u012F\u0131]/g, ij: /[\u0133]/g, j: /[\u0135]/g, k: /[\u0137,\u0138]/g, l: /[\u013A\u013C\u013E\u0140\u0142]/g, n: /[\xF1\u0144\u0146\u0148\u014B]/g, p: /[\xFE]/g, o: /[\xF2-\xF6\xF8\u014D\u014F\u0151]/g, oe: /[\u0153]/g, r: /[\u0155\u0157\u0159]/g, s: /[\u015B\u015D\u015F\u0161]/g, t: /[\u0163\u0165\u0167]/g, u: /[\xF9-\xFC\u0169\u016B\u016D\u016F\u0171\u0173]/g, w: /[\u0175]/g, y: /[\xFD\xFF\u0177]/g, z: /[\u017A\u017C\u017E]/g };
    for (let n in t) e = e.replace(t[n], n);
  }
  return e;
}
function kn(e) {
  return L(e, !1) ? e[0].toUpperCase() + e.slice(1) : e;
}
function We(e) {
  return L(e) ? e.replace(/(_)/g, "-").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() : e;
}
function Me() {
  let e = /* @__PURE__ */ new Map();
  return { on(t, n) {
    let r = e.get(t);
    return r ? r.push(n) : r = [n], e.set(t, r), this;
  }, off(t, n) {
    let r = e.get(t);
    return r && r.splice(r.indexOf(n) >>> 0, 1), this;
  }, emit(t, n) {
    let r = e.get(t);
    r && r.forEach((o) => {
      o(n);
    });
  }, clear() {
    e.clear();
  } };
}
function Tt(e, t) {
  return e ? e.classList ? e.classList.contains(t) : new RegExp("(^| )" + t + "( |$)", "gi").test(e.className) : !1;
}
function Oe(e, t) {
  if (e && t) {
    let n = (r) => {
      Tt(e, r) || (e.classList ? e.classList.add(r) : e.className += " " + r);
    };
    [t].flat().filter(Boolean).forEach((r) => r.split(" ").forEach(n));
  }
}
function Et() {
  return window.innerWidth - document.documentElement.offsetWidth;
}
function On(e) {
  typeof e == "string" ? Oe(document.body, e || "p-overflow-hidden") : (e != null && e.variableName && document.body.style.setProperty(e.variableName, Et() + "px"), Oe(document.body, e?.className || "p-overflow-hidden"));
}
function Ce(e, t) {
  if (e && t) {
    let n = (r) => {
      e.classList ? e.classList.remove(r) : e.className = e.className.replace(new RegExp("(^|\\b)" + r.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };
    [t].flat().filter(Boolean).forEach((r) => r.split(" ").forEach(n));
  }
}
function Cn(e) {
  typeof e == "string" ? Ce(document.body, e || "p-overflow-hidden") : (e != null && e.variableName && document.body.style.removeProperty(e.variableName), Ce(document.body, e?.className || "p-overflow-hidden"));
}
function fe(e) {
  for (let t of document?.styleSheets) try {
    for (let n of t?.cssRules) for (let r of n?.style) if (e.test(r)) return { name: r, value: n.style.getPropertyValue(r).trim() };
  } catch {
  }
  return null;
}
function ze(e) {
  let t = { width: 0, height: 0 };
  if (e) {
    let [n, r] = [e.style.visibility, e.style.display], o = e.getBoundingClientRect();
    e.style.visibility = "hidden", e.style.display = "block", t.width = o.width || e.offsetWidth, t.height = o.height || e.offsetHeight, e.style.display = r, e.style.visibility = n;
  }
  return t;
}
function He() {
  let e = window, t = document, n = t.documentElement, r = t.getElementsByTagName("body")[0], o = e.innerWidth || n.clientWidth || r.clientWidth, i = e.innerHeight || n.clientHeight || r.clientHeight;
  return { width: o, height: i };
}
function me(e) {
  return e ? Math.abs(e.scrollLeft) : 0;
}
function Nt() {
  let e = document.documentElement;
  return (window.pageXOffset || me(e)) - (e.clientLeft || 0);
}
function Lt() {
  let e = document.documentElement;
  return (window.pageYOffset || e.scrollTop) - (e.clientTop || 0);
}
function At(e) {
  return e ? getComputedStyle(e).direction === "rtl" : !1;
}
function jn(e, t, n = !0) {
  var r, o, i, a;
  if (e) {
    let s = e.offsetParent ? { width: e.offsetWidth, height: e.offsetHeight } : ze(e), l = s.height, u = s.width, d = t.offsetHeight, m = t.offsetWidth, c = t.getBoundingClientRect(), f = Lt(), p = Nt(), y = He(), h, v, b = "top";
    c.top + d + l > y.height ? (h = c.top + f - l, b = "bottom", h < 0 && (h = f)) : h = d + c.top + f, c.left + u > y.width ? v = Math.max(0, c.left + p + m - u) : v = c.left + p, At(e) ? e.style.insetInlineEnd = v + "px" : e.style.insetInlineStart = v + "px", e.style.top = h + "px", e.style.transformOrigin = b, n && (e.style.marginTop = b === "bottom" ? `calc(${(o = (r = fe(/-anchor-gutter$/)) == null ? void 0 : r.value) != null ? o : "2px"} * -1)` : (a = (i = fe(/-anchor-gutter$/)) == null ? void 0 : i.value) != null ? a : "");
  }
}
function _n(e, t) {
  e && (typeof t == "string" ? e.style.cssText = t : Object.entries(t || {}).forEach(([n, r]) => e.style[n] = r));
}
function Pn(e, t) {
  return e instanceof HTMLElement ? e.offsetWidth : 0;
}
function Tn(e, t, n = !0, r = void 0) {
  var o;
  if (e) {
    let i = e.offsetParent ? { width: e.offsetWidth, height: e.offsetHeight } : ze(e), a = t.offsetHeight, s = t.getBoundingClientRect(), l = He(), u, d, m = r ?? "top";
    if (!r && s.top + a + i.height > l.height ? (u = -1 * i.height, m = "bottom", s.top + u < 0 && (u = -1 * s.top)) : u = a, i.width > l.width ? d = s.left * -1 : s.left + i.width > l.width ? d = (s.left + i.width - l.width) * -1 : d = 0, e.style.top = u + "px", e.style.insetInlineStart = d + "px", e.style.transformOrigin = m, n) {
      let c = (o = fe(/-anchor-gutter$/)) == null ? void 0 : o.value;
      e.style.marginTop = m === "bottom" ? `calc(${c ?? "2px"} * -1)` : c ?? "";
    }
  }
}
function ye(e) {
  if (e) {
    let t = e.parentNode;
    return t && t instanceof ShadowRoot && t.host && (t = t.host), t;
  }
  return null;
}
function Dt(e) {
  return !!(e !== null && typeof e < "u" && e.nodeName && ye(e));
}
function J(e) {
  return typeof Element < "u" ? e instanceof Element : e !== null && typeof e == "object" && e.nodeType === 1 && typeof e.nodeName == "string";
}
function En() {
  if (window.getSelection) {
    let e = window.getSelection() || {};
    e.empty ? e.empty() : e.removeAllRanges && e.rangeCount > 0 && e.getRangeAt(0).getClientRects().length > 0 && e.removeAllRanges();
  }
}
function ie(e, t = {}) {
  if (J(e)) {
    let n = (r, o) => {
      var i, a;
      let s = (i = e?.$attrs) != null && i[r] ? [(a = e?.$attrs) == null ? void 0 : a[r]] : [];
      return [o].flat().reduce((l, u) => {
        if (u != null) {
          let d = typeof u;
          if (d === "string" || d === "number") l.push(u);
          else if (d === "object") {
            let m = Array.isArray(u) ? n(r, u) : Object.entries(u).map(([c, f]) => r === "style" && (f || f === 0) ? `${c.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${f}` : f ? c : void 0);
            l = m.length ? l.concat(m.filter((c) => !!c)) : l;
          }
        }
        return l;
      }, s);
    };
    Object.entries(t).forEach(([r, o]) => {
      if (o != null) {
        let i = r.match(/^on(.+)/);
        i ? e.addEventListener(i[1].toLowerCase(), o) : r === "p-bind" || r === "pBind" ? ie(e, o) : (o = r === "class" ? [...new Set(n("class", o))].join(" ").trim() : r === "style" ? n("style", o).join(";").trim() : o, (e.$attrs = e.$attrs || {}) && (e.$attrs[r] = o), e.setAttribute(r, o));
      }
    });
  }
}
function Nn(e, t = {}, ...n) {
  if (e) {
    let r = document.createElement(e);
    return ie(r, t), r.append(...n), r;
  }
}
function Ln(e, t) {
  if (e) {
    e.style.opacity = "0";
    let n = +/* @__PURE__ */ new Date(), r = "0", o = function() {
      r = `${+e.style.opacity + ((/* @__PURE__ */ new Date()).getTime() - n) / t}`, e.style.opacity = r, n = +/* @__PURE__ */ new Date(), +r < 1 && ("requestAnimationFrame" in window ? requestAnimationFrame(o) : setTimeout(o, 16));
    };
    o();
  }
}
function Rt(e, t) {
  return J(e) ? Array.from(e.querySelectorAll(t)) : [];
}
function Ft(e, t) {
  return J(e) ? e.matches(t) ? e : e.querySelector(t) : null;
}
function An(e, t) {
  e && document.activeElement !== e && e.focus(t);
}
function Dn(e, t) {
  if (J(e)) {
    let n = e.getAttribute(t);
    return isNaN(n) ? n === "true" || n === "false" ? n === "true" : n : +n;
  }
}
function Ke(e, t = "") {
  let n = Rt(e, `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            [href]:not([tabindex = "-1"]):not([style*="display:none"]):not([hidden])${t},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t}`), r = [];
  for (let o of n) getComputedStyle(o).display != "none" && getComputedStyle(o).visibility != "hidden" && r.push(o);
  return r;
}
function Rn(e, t) {
  let n = Ke(e, t);
  return n.length > 0 ? n[0] : null;
}
function Fn(e) {
  if (e) {
    let t = e.offsetHeight, n = getComputedStyle(e);
    return t -= parseFloat(n.paddingTop) + parseFloat(n.paddingBottom) + parseFloat(n.borderTopWidth) + parseFloat(n.borderBottomWidth), t;
  }
  return 0;
}
function In(e) {
  var t;
  if (e) {
    let n = (t = ye(e)) == null ? void 0 : t.childNodes, r = 0;
    if (n) for (let o = 0; o < n.length; o++) {
      if (n[o] === e) return r;
      n[o].nodeType === 1 && r++;
    }
  }
  return -1;
}
function Bn(e, t) {
  let n = Ke(e, t);
  return n.length > 0 ? n[n.length - 1] : null;
}
function Vn(e) {
  if (e) {
    let t = e.getBoundingClientRect();
    return { top: t.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0), left: t.left + (window.pageXOffset || me(document.documentElement) || me(document.body) || 0) };
  }
  return { top: "auto", left: "auto" };
}
function It(e, t) {
  return e ? e.offsetHeight : 0;
}
function Ue(e, t = []) {
  let n = ye(e);
  return n === null ? t : Ue(n, t.concat([n]));
}
function Wn(e) {
  let t = [];
  if (e) {
    let n = Ue(e), r = /(auto|scroll)/, o = (i) => {
      try {
        let a = window.getComputedStyle(i, null);
        return r.test(a.getPropertyValue("overflow")) || r.test(a.getPropertyValue("overflowX")) || r.test(a.getPropertyValue("overflowY"));
      } catch {
        return !1;
      }
    };
    for (let i of n) {
      let a = i.nodeType === 1 && i.dataset.scrollselectors;
      if (a) {
        let s = a.split(",");
        for (let l of s) {
          let u = Ft(i, l);
          u && o(u) && t.push(u);
        }
      }
      i.nodeType !== 9 && o(i) && t.push(i);
    }
  }
  return t;
}
function Mn() {
  if (window.getSelection) return window.getSelection().toString();
  if (document.getSelection) return document.getSelection().toString();
}
function zn() {
  return navigator.userAgent;
}
function Hn(e) {
  if (e) {
    let t = e.offsetWidth, n = getComputedStyle(e);
    return t -= parseFloat(n.paddingLeft) + parseFloat(n.paddingRight) + parseFloat(n.borderLeftWidth) + parseFloat(n.borderRightWidth), t;
  }
  return 0;
}
function Kn() {
  return /(android)/i.test(navigator.userAgent);
}
function Bt() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function Un(e, t = "") {
  return J(e) ? e.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t}`) : !1;
}
function Yn(e) {
  return !!(e && e.offsetParent != null);
}
function qn() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}
function Zn(e, t) {
  let n = getComputedStyle(e).getPropertyValue("borderTopWidth"), r = n ? parseFloat(n) : 0, o = getComputedStyle(e).getPropertyValue("paddingTop"), i = o ? parseFloat(o) : 0, a = e.getBoundingClientRect(), s = t.getBoundingClientRect().top + document.body.scrollTop - (a.top + document.body.scrollTop) - r - i, l = e.scrollTop, u = e.clientHeight, d = It(t);
  s < 0 ? e.scrollTop = l + s : s + d > u && (e.scrollTop = l + s - u + d);
}
function Vt(e, t = "", n) {
  J(e) && n !== null && n !== void 0 && e.setAttribute(t, n);
}
var Wt = Object.defineProperty, Mt = Object.defineProperties, zt = Object.getOwnPropertyDescriptors, le = Object.getOwnPropertySymbols, Ye = Object.prototype.hasOwnProperty, qe = Object.prototype.propertyIsEnumerable, je = (e, t, n) => t in e ? Wt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, w = (e, t) => {
  for (var n in t || (t = {})) Ye.call(t, n) && je(e, n, t[n]);
  if (le) for (var n of le(t)) qe.call(t, n) && je(e, n, t[n]);
  return e;
}, ue = (e, t) => Mt(e, zt(t)), C = (e, t) => {
  var n = {};
  for (var r in e) Ye.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && le) for (var r of le(e)) t.indexOf(r) < 0 && qe.call(e, r) && (n[r] = e[r]);
  return n;
};
function Xn(...e) {
  return Ve(...e);
}
var Ht = Me(), z = Ht, ee = /{([^}]*)}/g, Ze = /(\d+\s+[\+\-\*\/]\s+\d+)/g, Xe = /var\([^)]+\)/g;
function _e(e) {
  return L(e) ? e.replace(/[A-Z]/g, (t, n) => n === 0 ? t : "." + t.toLowerCase()).toLowerCase() : e;
}
function Kt(e) {
  return N(e) && e.hasOwnProperty("$value") && e.hasOwnProperty("$type") ? e.$value : e;
}
function Ut(e) {
  return e.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
}
function pe(e = "", t = "") {
  return Ut(`${L(e, !1) && L(t, !1) ? `${e}-` : e}${t}`);
}
function Ge(e = "", t = "") {
  return `--${pe(e, t)}`;
}
function Yt(e = "") {
  let t = (e.match(/{/g) || []).length, n = (e.match(/}/g) || []).length;
  return (t + n) % 2 !== 0;
}
function Je(e, t = "", n = "", r = [], o) {
  if (L(e)) {
    let i = e.trim();
    if (Yt(i)) return;
    if (H(i, ee)) {
      let a = i.replaceAll(ee, (s) => {
        let l = s.replace(/{|}/g, "").split(".").filter((u) => !r.some((d) => H(u, d)));
        return `var(${Ge(n, We(l.join("-")))}${g(o) ? `, ${o}` : ""})`;
      });
      return H(a.replace(Xe, "0"), Ze) ? `calc(${a})` : a;
    }
    return i;
  } else if (Pt(e)) return e;
}
function qt(e, t, n) {
  L(t, !1) && e.push(`${t}:${n};`);
}
function G(e, t) {
  return e ? `${e}{${t}}` : "";
}
function Qe(e, t) {
  if (e.indexOf("dt(") === -1) return e;
  function n(a, s) {
    let l = [], u = 0, d = "", m = null, c = 0;
    for (; u <= a.length; ) {
      let f = a[u];
      if ((f === '"' || f === "'" || f === "`") && a[u - 1] !== "\\" && (m = m === f ? null : f), !m && (f === "(" && c++, f === ")" && c--, (f === "," || u === a.length) && c === 0)) {
        let p = d.trim();
        p.startsWith("dt(") ? l.push(Qe(p, s)) : l.push(r(p)), d = "", u++;
        continue;
      }
      f !== void 0 && (d += f), u++;
    }
    return l;
  }
  function r(a) {
    let s = a[0];
    if ((s === '"' || s === "'" || s === "`") && a[a.length - 1] === s) return a.slice(1, -1);
    let l = Number(a);
    return isNaN(l) ? a : l;
  }
  let o = [], i = [];
  for (let a = 0; a < e.length; a++) if (e[a] === "d" && e.slice(a, a + 3) === "dt(") i.push(a), a += 2;
  else if (e[a] === ")" && i.length > 0) {
    let s = i.pop();
    i.length === 0 && o.push([s, a]);
  }
  if (!o.length) return e;
  for (let a = o.length - 1; a >= 0; a--) {
    let [s, l] = o[a], u = e.slice(s + 3, l), d = n(u, t), m = t(...d);
    e = e.slice(0, s) + m + e.slice(l + 1);
  }
  return e;
}
var Gn = (e) => {
  var t;
  let n = S.getTheme(), r = he(n, e, void 0, "variable"), o = (t = r?.match(/--[\w-]+/g)) == null ? void 0 : t[0], i = he(n, e, void 0, "value");
  return { name: o, variable: r, value: i };
}, K = (...e) => he(S.getTheme(), ...e), he = (e = {}, t, n, r) => {
  if (t) {
    let { variable: o, options: i } = S.defaults || {}, { prefix: a, transform: s } = e?.options || i || {}, l = H(t, ee) ? t : `{${t}}`;
    return r === "value" || ge(r) && s === "strict" ? S.getTokenValue(t) : Je(l, void 0, a, [o.excludedKeyRegex], n);
  }
  return "";
};
function oe(e, ...t) {
  if (e instanceof Array) {
    let n = e.reduce((r, o, i) => {
      var a;
      return r + o + ((a = k(t[i], { dt: K })) != null ? a : "");
    }, "");
    return Qe(n, K);
  }
  return k(e, { dt: K });
}
function Zt(e, t = {}) {
  let n = S.defaults.variable, { prefix: r = n.prefix, selector: o = n.selector, excludedKeyRegex: i = n.excludedKeyRegex } = t, a = [], s = [], l = [{ node: e, path: r }];
  for (; l.length; ) {
    let { node: d, path: m } = l.pop();
    for (let c in d) {
      let f = d[c], p = Kt(f), y = H(c, i) ? pe(m) : pe(m, We(c));
      if (N(p)) l.push({ node: p, path: y });
      else {
        let h = Ge(y), v = Je(p, y, r, [i]);
        qt(s, h, v);
        let b = y;
        r && b.startsWith(r + "-") && (b = b.slice(r.length + 1)), a.push(b.replace(/-/g, "."));
      }
    }
  }
  let u = s.join("");
  return { value: s, tokens: a, declarations: u, css: G(o, u) };
}
var $ = { regex: { rules: { class: { pattern: /^\.([a-zA-Z][\w-]*)$/, resolve(e) {
  return { type: "class", selector: e, matched: this.pattern.test(e.trim()) };
} }, attr: { pattern: /^\[(.*)\]$/, resolve(e) {
  return { type: "attr", selector: `:root${e},:host${e}`, matched: this.pattern.test(e.trim()) };
} }, media: { pattern: /^@media (.*)$/, resolve(e) {
  return { type: "media", selector: e, matched: this.pattern.test(e.trim()) };
} }, system: { pattern: /^system$/, resolve(e) {
  return { type: "system", selector: "@media (prefers-color-scheme: dark)", matched: this.pattern.test(e.trim()) };
} }, custom: { resolve(e) {
  return { type: "custom", selector: e, matched: !0 };
} } }, resolve(e) {
  let t = Object.keys(this.rules).filter((n) => n !== "custom").map((n) => this.rules[n]);
  return [e].flat().map((n) => {
    var r;
    return (r = t.map((o) => o.resolve(n)).find((o) => o.matched)) != null ? r : this.rules.custom.resolve(n);
  });
} }, _toVariables(e, t) {
  return Zt(e, { prefix: t?.prefix });
}, getCommon({ name: e = "", theme: t = {}, params: n, set: r, defaults: o }) {
  var i, a, s, l, u, d, m;
  let { preset: c, options: f } = t, p, y, h, v, b, A, D;
  if (g(c) && f.transform !== "strict") {
    let { primitive: U, semantic: R, extend: j } = c, _ = R || {}, { colorScheme: P } = _, F = C(_, ["colorScheme"]), T = j || {}, { colorScheme: I } = T, B = C(T, ["colorScheme"]), E = P || {}, { dark: V } = E, Y = C(E, ["dark"]), W = I || {}, { dark: q } = W, Z = C(W, ["dark"]), O = g(U) ? this._toVariables({ primitive: U }, f) : {}, x = g(F) ? this._toVariables({ semantic: F }, f) : {}, M = g(Y) ? this._toVariables({ light: Y }, f) : {}, re = g(V) ? this._toVariables({ dark: V }, f) : {}, X = g(B) ? this._toVariables({ semantic: B }, f) : {}, ve = g(Z) ? this._toVariables({ light: Z }, f) : {}, be = g(q) ? this._toVariables({ dark: q }, f) : {}, [et, tt] = [(i = O.declarations) != null ? i : "", O.tokens], [nt, rt] = [(a = x.declarations) != null ? a : "", x.tokens || []], [ot, at] = [(s = M.declarations) != null ? s : "", M.tokens || []], [it, lt] = [(l = re.declarations) != null ? l : "", re.tokens || []], [st, ut] = [(u = X.declarations) != null ? u : "", X.tokens || []], [dt, ct] = [(d = ve.declarations) != null ? d : "", ve.tokens || []], [ft, mt] = [(m = be.declarations) != null ? m : "", be.tokens || []];
    p = this.transformCSS(e, et, "light", "variable", f, r, o), y = tt;
    let pt = this.transformCSS(e, `${nt}${ot}`, "light", "variable", f, r, o), ht = this.transformCSS(e, `${it}`, "dark", "variable", f, r, o);
    h = `${pt}${ht}`, v = [.../* @__PURE__ */ new Set([...rt, ...at, ...lt])];
    let gt = this.transformCSS(e, `${st}${dt}color-scheme:light`, "light", "variable", f, r, o), yt = this.transformCSS(e, `${ft}color-scheme:dark`, "dark", "variable", f, r, o);
    b = `${gt}${yt}`, A = [.../* @__PURE__ */ new Set([...ut, ...ct, ...mt])], D = k(c.css, { dt: K });
  }
  return { primitive: { css: p, tokens: y }, semantic: { css: h, tokens: v }, global: { css: b, tokens: A }, style: D };
}, getPreset({ name: e = "", preset: t = {}, options: n, params: r, set: o, defaults: i, selector: a }) {
  var s, l, u;
  let d, m, c;
  if (g(t) && n.transform !== "strict") {
    let f = e.replace("-directive", ""), p = t, { colorScheme: y, extend: h, css: v } = p, b = C(p, ["colorScheme", "extend", "css"]), A = h || {}, { colorScheme: D } = A, U = C(A, ["colorScheme"]), R = y || {}, { dark: j } = R, _ = C(R, ["dark"]), P = D || {}, { dark: F } = P, T = C(P, ["dark"]), I = g(b) ? this._toVariables({ [f]: w(w({}, b), U) }, n) : {}, B = g(_) ? this._toVariables({ [f]: w(w({}, _), T) }, n) : {}, E = g(j) ? this._toVariables({ [f]: w(w({}, j), F) }, n) : {}, [V, Y] = [(s = I.declarations) != null ? s : "", I.tokens || []], [W, q] = [(l = B.declarations) != null ? l : "", B.tokens || []], [Z, O] = [(u = E.declarations) != null ? u : "", E.tokens || []], x = this.transformCSS(f, `${V}${W}`, "light", "variable", n, o, i, a), M = this.transformCSS(f, Z, "dark", "variable", n, o, i, a);
    d = `${x}${M}`, m = [.../* @__PURE__ */ new Set([...Y, ...q, ...O])], c = k(v, { dt: K });
  }
  return { css: d, tokens: m, style: c };
}, getPresetC({ name: e = "", theme: t = {}, params: n, set: r, defaults: o }) {
  var i;
  let { preset: a, options: s } = t, l = (i = a?.components) == null ? void 0 : i[e];
  return this.getPreset({ name: e, preset: l, options: s, params: n, set: r, defaults: o });
}, getPresetD({ name: e = "", theme: t = {}, params: n, set: r, defaults: o }) {
  var i, a;
  let s = e.replace("-directive", ""), { preset: l, options: u } = t, d = ((i = l?.components) == null ? void 0 : i[s]) || ((a = l?.directives) == null ? void 0 : a[s]);
  return this.getPreset({ name: s, preset: d, options: u, params: n, set: r, defaults: o });
}, applyDarkColorScheme(e) {
  return !(e.darkModeSelector === "none" || e.darkModeSelector === !1);
}, getColorSchemeOption(e, t) {
  var n;
  return this.applyDarkColorScheme(e) ? this.regex.resolve(e.darkModeSelector === !0 ? t.options.darkModeSelector : (n = e.darkModeSelector) != null ? n : t.options.darkModeSelector) : [];
}, getLayerOrder(e, t = {}, n, r) {
  let { cssLayer: o } = t;
  return o ? `@layer ${k(o.order || o.name || "primeui", n)}` : "";
}, getCommonStyleSheet({ name: e = "", theme: t = {}, params: n, props: r = {}, set: o, defaults: i }) {
  let a = this.getCommon({ name: e, theme: t, params: n, set: o, defaults: i }), s = Object.entries(r).reduce((l, [u, d]) => l.push(`${u}="${d}"`) && l, []).join(" ");
  return Object.entries(a || {}).reduce((l, [u, d]) => {
    if (N(d) && Object.hasOwn(d, "css")) {
      let m = Q(d.css), c = `${u}-variables`;
      l.push(`<style type="text/css" data-primevue-style-id="${c}" ${s}>${m}</style>`);
    }
    return l;
  }, []).join("");
}, getStyleSheet({ name: e = "", theme: t = {}, params: n, props: r = {}, set: o, defaults: i }) {
  var a;
  let s = { name: e, theme: t, params: n, set: o, defaults: i }, l = (a = e.includes("-directive") ? this.getPresetD(s) : this.getPresetC(s)) == null ? void 0 : a.css, u = Object.entries(r).reduce((d, [m, c]) => d.push(`${m}="${c}"`) && d, []).join(" ");
  return l ? `<style type="text/css" data-primevue-style-id="${e}-variables" ${u}>${Q(l)}</style>` : "";
}, createTokens(e = {}, t, n = "", r = "", o = {}) {
  let i = function(s, l = {}, u = []) {
    if (u.includes(this.path)) return console.warn(`Circular reference detected at ${this.path}`), { colorScheme: s, path: this.path, paths: l, value: void 0 };
    u.push(this.path), l.name = this.path, l.binding || (l.binding = {});
    let d = this.value;
    if (typeof this.value == "string" && ee.test(this.value)) {
      let m = this.value.trim().replace(ee, (c) => {
        var f;
        let p = c.slice(1, -1), y = this.tokens[p];
        if (!y) return console.warn(`Token not found for path: ${p}`), "__UNRESOLVED__";
        let h = y.computed(s, l, u);
        return Array.isArray(h) && h.length === 2 ? `light-dark(${h[0].value},${h[1].value})` : (f = h?.value) != null ? f : "__UNRESOLVED__";
      });
      d = Ze.test(m.replace(Xe, "0")) ? `calc(${m})` : m;
    }
    return ge(l.binding) && delete l.binding, u.pop(), { colorScheme: s, path: this.path, paths: l, value: d.includes("__UNRESOLVED__") ? void 0 : d };
  }, a = (s, l, u) => {
    Object.entries(s).forEach(([d, m]) => {
      let c = H(d, t.variable.excludedKeyRegex) ? l : l ? `${l}.${_e(d)}` : _e(d), f = u ? `${u}.${d}` : d;
      N(m) ? a(m, c, f) : (o[c] || (o[c] = { paths: [], computed: (p, y = {}, h = []) => {
        if (o[c].paths.length === 1) return o[c].paths[0].computed(o[c].paths[0].scheme, y.binding, h);
        if (p && p !== "none") for (let v = 0; v < o[c].paths.length; v++) {
          let b = o[c].paths[v];
          if (b.scheme === p) return b.computed(p, y.binding, h);
        }
        return o[c].paths.map((v) => v.computed(v.scheme, y[v.scheme], h));
      } }), o[c].paths.push({ path: f, value: m, scheme: f.includes("colorScheme.light") ? "light" : f.includes("colorScheme.dark") ? "dark" : "none", computed: i, tokens: o }));
    });
  };
  return a(e, n, r), o;
}, getTokenValue(e, t, n) {
  var r;
  let o = ((s) => s.split(".").filter((l) => !H(l.toLowerCase(), n.variable.excludedKeyRegex)).join("."))(t), i = t.includes("colorScheme.light") ? "light" : t.includes("colorScheme.dark") ? "dark" : void 0, a = [(r = e[o]) == null ? void 0 : r.computed(i)].flat().filter((s) => s);
  return a.length === 1 ? a[0].value : a.reduce((s = {}, l) => {
    let u = l, { colorScheme: d } = u, m = C(u, ["colorScheme"]);
    return s[d] = m, s;
  }, void 0);
}, getSelectorRule(e, t, n, r) {
  return n === "class" || n === "attr" ? G(g(t) ? `${e}${t},${e} ${t}` : e, r) : G(e, G(t ?? ":root,:host", r));
}, transformCSS(e, t, n, r, o = {}, i, a, s) {
  if (g(t)) {
    let { cssLayer: l } = o;
    if (r !== "style") {
      let u = this.getColorSchemeOption(o, a);
      t = n === "dark" ? u.reduce((d, { type: m, selector: c }) => (g(c) && (d += c.includes("[CSS]") ? c.replace("[CSS]", t) : this.getSelectorRule(c, s, m, t)), d), "") : G(s ?? ":root,:host", t);
    }
    if (l) {
      let u = { name: "primeui" };
      N(l) && (u.name = k(l.name, { name: e, type: r })), g(u.name) && (t = G(`@layer ${u.name}`, t), i?.layerNames(u.name));
    }
    return t;
  }
  return "";
} }, S = { defaults: { variable: { prefix: "p", selector: ":root,:host", excludedKeyRegex: /^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi }, options: { prefix: "p", darkModeSelector: "system", cssLayer: !1 } }, _theme: void 0, _layerNames: /* @__PURE__ */ new Set(), _loadedStyleNames: /* @__PURE__ */ new Set(), _loadingStyles: /* @__PURE__ */ new Set(), _tokens: {}, update(e = {}) {
  let { theme: t } = e;
  t && (this._theme = ue(w({}, t), { options: w(w({}, this.defaults.options), t.options) }), this._tokens = $.createTokens(this.preset, this.defaults), this.clearLoadedStyleNames());
}, get theme() {
  return this._theme;
}, get preset() {
  var e;
  return ((e = this.theme) == null ? void 0 : e.preset) || {};
}, get options() {
  var e;
  return ((e = this.theme) == null ? void 0 : e.options) || {};
}, get tokens() {
  return this._tokens;
}, getTheme() {
  return this.theme;
}, setTheme(e) {
  this.update({ theme: e }), z.emit("theme:change", e);
}, getPreset() {
  return this.preset;
}, setPreset(e) {
  this._theme = ue(w({}, this.theme), { preset: e }), this._tokens = $.createTokens(e, this.defaults), this.clearLoadedStyleNames(), z.emit("preset:change", e), z.emit("theme:change", this.theme);
}, getOptions() {
  return this.options;
}, setOptions(e) {
  this._theme = ue(w({}, this.theme), { options: e }), this.clearLoadedStyleNames(), z.emit("options:change", e), z.emit("theme:change", this.theme);
}, getLayerNames() {
  return [...this._layerNames];
}, setLayerNames(e) {
  this._layerNames.add(e);
}, getLoadedStyleNames() {
  return this._loadedStyleNames;
}, isStyleNameLoaded(e) {
  return this._loadedStyleNames.has(e);
}, setLoadedStyleName(e) {
  this._loadedStyleNames.add(e);
}, deleteLoadedStyleName(e) {
  this._loadedStyleNames.delete(e);
}, clearLoadedStyleNames() {
  this._loadedStyleNames.clear();
}, getTokenValue(e) {
  return $.getTokenValue(this.tokens, e, this.defaults);
}, getCommon(e = "", t) {
  return $.getCommon({ name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getComponent(e = "", t) {
  let n = { name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return $.getPresetC(n);
}, getDirective(e = "", t) {
  let n = { name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return $.getPresetD(n);
}, getCustomPreset(e = "", t, n, r) {
  let o = { name: e, preset: t, options: this.options, selector: n, params: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return $.getPreset(o);
}, getLayerOrderCSS(e = "") {
  return $.getLayerOrder(e, this.options, { names: this.getLayerNames() }, this.defaults);
}, transformCSS(e = "", t, n = "style", r) {
  return $.transformCSS(e, t, r, n, this.options, { layerNames: this.setLayerNames.bind(this) }, this.defaults);
}, getCommonStyleSheet(e = "", t, n = {}) {
  return $.getCommonStyleSheet({ name: e, theme: this.theme, params: t, props: n, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getStyleSheet(e, t, n = {}) {
  return $.getStyleSheet({ name: e, theme: this.theme, params: t, props: n, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, onStyleMounted(e) {
  this._loadingStyles.add(e);
}, onStyleUpdated(e) {
  this._loadingStyles.add(e);
}, onStyleLoaded(e, { name: t }) {
  this._loadingStyles.size && (this._loadingStyles.delete(t), z.emit(`theme:${t}:load`, e), !this._loadingStyles.size && z.emit("theme:load"));
} }, Xt = `
    *,
    ::before,
    ::after {
        box-sizing: border-box;
    }

    .p-collapsible-enter-active {
        animation: p-animate-collapsible-expand 0.2s ease-out;
        overflow: hidden;
    }

    .p-collapsible-leave-active {
        animation: p-animate-collapsible-collapse 0.2s ease-out;
        overflow: hidden;
    }

    @keyframes p-animate-collapsible-expand {
        from {
            grid-template-rows: 0fr;
        }
        to {
            grid-template-rows: 1fr;
        }
    }

    @keyframes p-animate-collapsible-collapse {
        from {
            grid-template-rows: 1fr;
        }
        to {
            grid-template-rows: 0fr;
        }
    }

    .p-disabled,
    .p-disabled * {
        cursor: default;
        pointer-events: none;
        user-select: none;
    }

    .p-disabled,
    .p-component:disabled {
        opacity: dt('disabled.opacity');
    }

    .pi {
        font-size: dt('icon.size');
    }

    .p-icon {
        width: dt('icon.size');
        height: dt('icon.size');
    }

    .p-overlay-mask {
        background: var(--px-mask-background, dt('mask.background'));
        color: dt('mask.color');
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .p-overlay-mask-enter-active {
        animation: p-animate-overlay-mask-enter dt('mask.transition.duration') forwards;
    }

    .p-overlay-mask-leave-active {
        animation: p-animate-overlay-mask-leave dt('mask.transition.duration') forwards;
    }

    @keyframes p-animate-overlay-mask-enter {
        from {
            background: transparent;
        }
        to {
            background: var(--px-mask-background, dt('mask.background'));
        }
    }
    @keyframes p-animate-overlay-mask-leave {
        from {
            background: var(--px-mask-background, dt('mask.background'));
        }
        to {
            background: transparent;
        }
    }

    .p-anchored-overlay-enter-active {
        animation: p-animate-anchored-overlay-enter 300ms cubic-bezier(.19,1,.22,1);
    }

    .p-anchored-overlay-leave-active {
        animation: p-animate-anchored-overlay-leave 300ms cubic-bezier(.19,1,.22,1);
    }

    @keyframes p-animate-anchored-overlay-enter {
        from {
            opacity: 0;
            transform: scale(0.93);
        }
    }

    @keyframes p-animate-anchored-overlay-leave {
        to {
            opacity: 0;
            transform: scale(0.93);
        }
    }
`;
function te(e) {
  "@babel/helpers - typeof";
  return te = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, te(e);
}
function Pe(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Te(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Pe(Object(n), !0).forEach(function(r) {
      Gt(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Pe(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Gt(e, t, n) {
  return (t = Jt(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function Jt(e) {
  var t = Qt(e, "string");
  return te(t) == "symbol" ? t : t + "";
}
function Qt(e, t) {
  if (te(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (te(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function en(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  Se() && Se().components ? bt(e) : t ? e() : St(e);
}
var tn = 0;
function nn(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = se(!1), r = se(e), o = se(null), i = Bt() ? window.document : void 0, a = t.document, s = a === void 0 ? i : a, l = t.immediate, u = l === void 0 ? !0 : l, d = t.manual, m = d === void 0 ? !1 : d, c = t.name, f = c === void 0 ? "style_".concat(++tn) : c, p = t.id, y = p === void 0 ? void 0 : p, h = t.media, v = h === void 0 ? void 0 : h, b = t.nonce, A = b === void 0 ? void 0 : b, D = t.first, U = D === void 0 ? !1 : D, R = t.onMounted, j = R === void 0 ? void 0 : R, _ = t.onUpdated, P = _ === void 0 ? void 0 : _, F = t.onLoad, T = F === void 0 ? void 0 : F, I = t.props, B = I === void 0 ? {} : I, E = function() {
  }, V = function(q) {
    var Z = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (s) {
      var O = Te(Te({}, B), Z), x = O.name || f, M = O.id || y, re = O.nonce || A;
      o.value = s.querySelector('style[data-primevue-style-id="'.concat(x, '"]')) || s.getElementById(M) || s.createElement("style"), o.value.isConnected || (r.value = q || e, ie(o.value, {
        type: "text/css",
        id: M,
        media: v,
        nonce: re
      }), U ? s.head.prepend(o.value) : s.head.appendChild(o.value), Vt(o.value, "data-primevue-style-id", x), ie(o.value, O), o.value.onload = function(X) {
        return T?.(X, {
          name: x
        });
      }, j?.(x)), !n.value && (E = $t(r, function(X) {
        o.value.textContent = X, P?.(x);
      }, {
        immediate: !0
      }), n.value = !0);
    }
  }, Y = function() {
    !s || !n.value || (E(), Dt(o.value) && s.head.removeChild(o.value), n.value = !1, o.value = null);
  };
  return u && !m && en(V), {
    id: y,
    name: f,
    el: o,
    css: r,
    unload: Y,
    load: V,
    isLoaded: vt(n)
  };
}
function ne(e) {
  "@babel/helpers - typeof";
  return ne = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ne(e);
}
var Ee, Ne, Le, Ae;
function De(e, t) {
  return ln(e) || an(e, t) || on(e, t) || rn();
}
function rn() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function on(e, t) {
  if (e) {
    if (typeof e == "string") return Re(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Re(e, t) : void 0;
  }
}
function Re(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function an(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, o, i, a, s = [], l = !0, u = !1;
    try {
      if (i = (n = n.call(e)).next, t !== 0) for (; !(l = (r = i.call(n)).done) && (s.push(r.value), s.length !== t); l = !0) ;
    } catch (d) {
      u = !0, o = d;
    } finally {
      try {
        if (!l && n.return != null && (a = n.return(), Object(a) !== a)) return;
      } finally {
        if (u) throw o;
      }
    }
    return s;
  }
}
function ln(e) {
  if (Array.isArray(e)) return e;
}
function Fe(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function de(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fe(Object(n), !0).forEach(function(r) {
      sn(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Fe(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function sn(e, t, n) {
  return (t = un(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function un(e) {
  var t = dn(e, "string");
  return ne(t) == "symbol" ? t : t + "";
}
function dn(e, t) {
  if (ne(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (ne(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ae(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var cn = function(t) {
  var n = t.dt;
  return `
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    opacity: 0;
    overflow: hidden;
    padding: 0;
    pointer-events: none;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: `.concat(n("scrollbar.width"), `;
}
`);
}, fn = {}, mn = {}, Jn = {
  name: "base",
  css: cn,
  style: Xt,
  classes: fn,
  inlineStyles: mn,
  load: function(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(i) {
      return i;
    }, o = r(oe(Ee || (Ee = ae(["", ""])), t));
    return g(o) ? nn(Q(o), de({
      name: this.name
    }, n)) : {};
  },
  loadCSS: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return this.load(this.css, t);
  },
  loadStyle: function() {
    var t = this, n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return this.load(this.style, n, function() {
      var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      return S.transformCSS(n.name || t.name, "".concat(o).concat(oe(Ne || (Ne = ae(["", ""])), r)));
    });
  },
  getCommonTheme: function(t) {
    return S.getCommon(this.name, t);
  },
  getComponentTheme: function(t) {
    return S.getComponent(this.name, t);
  },
  getDirectiveTheme: function(t) {
    return S.getDirective(this.name, t);
  },
  getPresetTheme: function(t, n, r) {
    return S.getCustomPreset(this.name, t, n, r);
  },
  getLayerOrderThemeCSS: function() {
    return S.getLayerOrderCSS(this.name);
  },
  getStyleSheet: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.css) {
      var r = k(this.css, {
        dt: K
      }) || "", o = Q(oe(Le || (Le = ae(["", "", ""])), r, t)), i = Object.entries(n).reduce(function(a, s) {
        var l = De(s, 2), u = l[0], d = l[1];
        return a.push("".concat(u, '="').concat(d, '"')) && a;
      }, []).join(" ");
      return g(o) ? '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(i, ">").concat(o, "</style>") : "";
    }
    return "";
  },
  getCommonThemeStyleSheet: function(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return S.getCommonStyleSheet(this.name, t, n);
  },
  getThemeStyleSheet: function(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = [S.getStyleSheet(this.name, t, n)];
    if (this.style) {
      var o = this.name === "base" ? "global-style" : "".concat(this.name, "-style"), i = oe(Ae || (Ae = ae(["", ""])), k(this.style, {
        dt: K
      })), a = Q(S.transformCSS(o, i)), s = Object.entries(n).reduce(function(l, u) {
        var d = De(u, 2), m = d[0], c = d[1];
        return l.push("".concat(m, '="').concat(c, '"')) && l;
      }, []).join(" ");
      g(a) && r.push('<style type="text/css" data-primevue-style-id="'.concat(o, '" ').concat(s, ">").concat(a, "</style>"));
    }
    return r.join("");
  },
  extend: function(t) {
    return de(de({}, this), {}, {
      css: void 0,
      style: void 0
    }, t);
  }
}, Qn = Me();
export {
  Kn as $,
  Wn as A,
  Jn as B,
  It as C,
  jn as D,
  Cn as E,
  On as F,
  Un as G,
  wn as H,
  Tn as I,
  Sn as J,
  Vn as K,
  Bn as L,
  yn as M,
  z as N,
  _t as O,
  Ce as P,
  Dn as Q,
  Hn as R,
  _n as S,
  Fn as T,
  Nn as U,
  At as V,
  Oe as W,
  xn as X,
  qn as Y,
  Ie as Z,
  Vt as _,
  Rn as a,
  kn as a0,
  L as a1,
  ke as a2,
  N as a3,
  vn as a4,
  J as a5,
  $n as a6,
  In as a7,
  bn as a8,
  En as a9,
  Mn as aa,
  zn as ab,
  Zn as ac,
  An as b,
  Rt as c,
  Ke as d,
  Yn as e,
  He as f,
  Me as g,
  gn as h,
  Tt as i,
  Nt as j,
  jt as k,
  ge as l,
  k as m,
  Lt as n,
  Dt as o,
  xe as p,
  hn as q,
  Gn as r,
  g as s,
  Bt as t,
  Ln as u,
  Pn as v,
  Qn as w,
  S as x,
  Xn as y,
  Ft as z
};
//# sourceMappingURL=index-uMyjrk0Z.js.map
