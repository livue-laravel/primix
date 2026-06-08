import LiVue from "livue";
import { ref, readonly, getCurrentInstance, onMounted, nextTick, watch, useId, mergeProps, openBlock, createElementBlock, createElementVNode, renderSlot, createTextVNode, toDisplayString, resolveComponent, resolveDirective, withDirectives, createBlock, resolveDynamicComponent, withCtx, createCommentVNode, normalizeClass, Teleport, createVNode, Transition, Fragment, onBeforeUnmount, vShow, onUnmounted, TransitionGroup, renderList, computed, h as h$1, defineComponent, withKeys, withModifiers, vModelText, inject } from "vue";
function f(...e) {
  if (e) {
    let t2 = [];
    for (let i2 = 0; i2 < e.length; i2++) {
      let n = e[i2];
      if (!n) continue;
      let s2 = typeof n;
      if (s2 === "string" || s2 === "number") t2.push(n);
      else if (s2 === "object") {
        let c2 = Array.isArray(n) ? [f(...n)] : Object.entries(n).map(([r, o]) => o ? r : void 0);
        t2 = c2.length ? t2.concat(c2.filter((r) => !!r)) : t2;
      }
    }
    return t2.join(" ").trim();
  }
}
function R(t2, e) {
  return t2 ? t2.classList ? t2.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t2.className) : false;
}
function W(t2, e) {
  if (t2 && e) {
    let o = (n) => {
      R(t2, n) || (t2.classList ? t2.classList.add(n) : t2.className += " " + n);
    };
    [e].flat().filter(Boolean).forEach((n) => n.split(" ").forEach(o));
  }
}
function F$2() {
  return window.innerWidth - document.documentElement.offsetWidth;
}
function st$1(t2) {
  typeof t2 == "string" ? W(document.body, t2 || "p-overflow-hidden") : (t2 != null && t2.variableName && document.body.style.setProperty(t2.variableName, F$2() + "px"), W(document.body, (t2 == null ? void 0 : t2.className) || "p-overflow-hidden"));
}
function P(t2, e) {
  if (t2 && e) {
    let o = (n) => {
      t2.classList ? t2.classList.remove(n) : t2.className = t2.className.replace(new RegExp("(^|\\b)" + n.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };
    [e].flat().filter(Boolean).forEach((n) => n.split(" ").forEach(o));
  }
}
function dt$1(t2) {
  typeof t2 == "string" ? P(document.body, t2 || "p-overflow-hidden") : (t2 != null && t2.variableName && document.body.style.removeProperty(t2.variableName), P(document.body, (t2 == null ? void 0 : t2.className) || "p-overflow-hidden"));
}
function E$1(t2) {
  return t2 ? Math.abs(t2.scrollLeft) : 0;
}
function v$1(t2, e) {
  if (t2 instanceof HTMLElement) {
    let o = t2.offsetWidth;
    return o;
  }
  return 0;
}
function y(t2) {
  if (t2) {
    let e = t2.parentNode;
    return e && e instanceof ShadowRoot && e.host && (e = e.host), e;
  }
  return null;
}
function T(t2) {
  return !!(t2 !== null && typeof t2 != "undefined" && t2.nodeName && y(t2));
}
function c$1(t2) {
  return typeof Element != "undefined" ? t2 instanceof Element : t2 !== null && typeof t2 == "object" && t2.nodeType === 1 && typeof t2.nodeName == "string";
}
function A(t2, e = {}) {
  if (c$1(t2)) {
    let o = (n, r) => {
      var l2, d;
      let i2 = (l2 = t2 == null ? void 0 : t2.$attrs) != null && l2[n] ? [(d = t2 == null ? void 0 : t2.$attrs) == null ? void 0 : d[n]] : [];
      return [r].flat().reduce((s2, a2) => {
        if (a2 != null) {
          let u = typeof a2;
          if (u === "string" || u === "number") s2.push(a2);
          else if (u === "object") {
            let p = Array.isArray(a2) ? o(n, a2) : Object.entries(a2).map(([f2, g2]) => n === "style" && (g2 || g2 === 0) ? `${f2.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${g2}` : g2 ? f2 : void 0);
            s2 = p.length ? s2.concat(p.filter((f2) => !!f2)) : s2;
          }
        }
        return s2;
      }, i2);
    };
    Object.entries(e).forEach(([n, r]) => {
      if (r != null) {
        let i2 = n.match(/^on(.+)/);
        i2 ? t2.addEventListener(i2[1].toLowerCase(), r) : n === "p-bind" || n === "pBind" ? A(t2, r) : (r = n === "class" ? [...new Set(o("class", r))].join(" ").trim() : n === "style" ? o("style", r).join(";").trim() : r, (t2.$attrs = t2.$attrs || {}) && (t2.$attrs[n] = r), t2.setAttribute(n, r));
      }
    });
  }
}
function U(t2, e = {}, ...o) {
  {
    let n = document.createElement(t2);
    return A(n, e), n.append(...o), n;
  }
}
function Y$2(t2, e) {
  return c$1(t2) ? Array.from(t2.querySelectorAll(e)) : [];
}
function z$1(t2, e) {
  return c$1(t2) ? t2.matches(e) ? t2 : t2.querySelector(e) : null;
}
function bt(t2, e) {
  t2 && document.activeElement !== t2 && t2.focus(e);
}
function Q$1(t2, e) {
  if (c$1(t2)) {
    let o = t2.getAttribute(e);
    return isNaN(o) ? o === "true" || o === "false" ? o === "true" : o : +o;
  }
}
function b$1(t2, e = "") {
  let o = Y$2(t2, `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [href]:not([tabindex = "-1"]):not([style*="display:none"]):not([hidden])${e},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`), n = [];
  for (let r of o) getComputedStyle(r).display != "none" && getComputedStyle(r).visibility != "hidden" && n.push(r);
  return n;
}
function vt(t2, e) {
  let o = b$1(t2, e);
  return o.length > 0 ? o[0] : null;
}
function Tt(t2) {
  if (t2) {
    let e = t2.offsetHeight, o = getComputedStyle(t2);
    return e -= parseFloat(o.paddingTop) + parseFloat(o.paddingBottom) + parseFloat(o.borderTopWidth) + parseFloat(o.borderBottomWidth), e;
  }
  return 0;
}
function Lt(t2, e) {
  let o = b$1(t2, e);
  return o.length > 0 ? o[o.length - 1] : null;
}
function K(t2) {
  if (t2) {
    let e = t2.getBoundingClientRect();
    return { top: e.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0), left: e.left + (window.pageXOffset || E$1(document.documentElement) || E$1(document.body) || 0) };
  }
  return { top: "auto", left: "auto" };
}
function C$2(t2, e) {
  if (t2) {
    let o = t2.offsetHeight;
    return o;
  }
  return 0;
}
function Rt(t2) {
  if (t2) {
    let e = t2.offsetWidth, o = getComputedStyle(t2);
    return e -= parseFloat(o.paddingLeft) + parseFloat(o.paddingRight) + parseFloat(o.borderLeftWidth) + parseFloat(o.borderRightWidth), e;
  }
  return 0;
}
function tt() {
  return !!(typeof window != "undefined" && window.document && window.document.createElement);
}
function It(t2, e = "") {
  return c$1(t2) ? t2.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`) : false;
}
function _t(t2, e = "", o) {
  c$1(t2) && o !== null && o !== void 0 && t2.setAttribute(e, o);
}
function s$2() {
  let r = /* @__PURE__ */ new Map();
  return { on(e, t2) {
    let n = r.get(e);
    return n ? n.push(t2) : n = [t2], r.set(e, n), this;
  }, off(e, t2) {
    let n = r.get(e);
    return n && n.splice(n.indexOf(t2) >>> 0, 1), this;
  }, emit(e, t2) {
    let n = r.get(e);
    n && n.forEach((i2) => {
      i2(t2);
    });
  }, clear() {
    r.clear();
  } };
}
function l(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && typeof e == "object" && Object.keys(e).length === 0;
}
function c(e) {
  return typeof e == "function" && "call" in e && "apply" in e;
}
function s$1(e) {
  return !l(e);
}
function i(e, t2 = true) {
  return e instanceof Object && e.constructor === Object && (t2 || Object.keys(e).length !== 0);
}
function m(e, ...t2) {
  return c(e) ? e(...t2) : e;
}
function a(e, t2 = true) {
  return typeof e == "string" && (t2 || e !== "");
}
function g$1(e) {
  return a(e) ? e.replace(/(-|_)/g, "").toLowerCase() : e;
}
function F$1(e, t2 = "", n = {}) {
  let o = g$1(t2).split("."), r = o.shift();
  if (r) {
    if (i(e)) {
      let u = Object.keys(e).find((f2) => g$1(f2) === r) || "";
      return F$1(m(e[u], n), o.join("."), n);
    }
    return;
  }
  return m(e, n);
}
function C$1(e, t2 = true) {
  return Array.isArray(e) && (t2 || e.length !== 0);
}
function z(e) {
  return s$1(e) && !isNaN(e);
}
function G(e, t2) {
  if (t2) {
    let n = t2.test(e);
    return t2.lastIndex = 0, n;
  }
  return false;
}
function Y$1(e) {
  return e && e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":").trim();
}
function ne$1(e) {
  return a(e, false) ? e[0].toUpperCase() + e.slice(1) : e;
}
function re(e) {
  return a(e) ? e.replace(/(_)/g, "-").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() : e;
}
var t = {};
function s(n = "pui_id_") {
  return Object.hasOwn(t, n) || (t[n] = 0), t[n]++, `${n}${t[n]}`;
}
function g() {
  let r = [], i2 = (e, n, t2 = 999) => {
    let s2 = u(e, n, t2), o = s2.value + (s2.key === e ? 0 : t2) + 1;
    return r.push({ key: e, value: o }), o;
  }, d = (e) => {
    r = r.filter((n) => n.value !== e);
  }, a2 = (e, n) => u(e).value, u = (e, n, t2 = 0) => [...r].reverse().find((s2) => true) || { key: e, value: t2 }, l2 = (e) => e && parseInt(e.style.zIndex, 10) || 0;
  return { get: l2, set: (e, n, t2) => {
    n && (n.style.zIndex = String(i2(e, true, t2)));
  }, clear: (e) => {
    e && (d(l2(e)), e.style.zIndex = "");
  }, getCurrent: (e) => a2(e) };
}
var x = g();
var rt = Object.defineProperty, st = Object.defineProperties;
var nt = Object.getOwnPropertyDescriptors;
var F = Object.getOwnPropertySymbols;
var xe = Object.prototype.hasOwnProperty, be = Object.prototype.propertyIsEnumerable;
var _e = (e, t2, r) => t2 in e ? rt(e, t2, { enumerable: true, configurable: true, writable: true, value: r }) : e[t2] = r, h = (e, t2) => {
  for (var r in t2 || (t2 = {})) xe.call(t2, r) && _e(e, r, t2[r]);
  if (F) for (var r of F(t2)) be.call(t2, r) && _e(e, r, t2[r]);
  return e;
}, $ = (e, t2) => st(e, nt(t2));
var v = (e, t2) => {
  var r = {};
  for (var s2 in e) xe.call(e, s2) && t2.indexOf(s2) < 0 && (r[s2] = e[s2]);
  if (e != null && F) for (var s2 of F(e)) t2.indexOf(s2) < 0 && be.call(e, s2) && (r[s2] = e[s2]);
  return r;
};
var at = s$2(), N = at;
var k = /{([^}]*)}/g, ne = /(\d+\s+[\+\-\*\/]\s+\d+)/g, ie = /var\([^)]+\)/g;
function oe(e) {
  return a(e) ? e.replace(/[A-Z]/g, (t2, r) => r === 0 ? t2 : "." + t2.toLowerCase()).toLowerCase() : e;
}
function ve(e) {
  return i(e) && e.hasOwnProperty("$value") && e.hasOwnProperty("$type") ? e.$value : e;
}
function dt(e) {
  return e.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
}
function Q(e = "", t2 = "") {
  return dt(`${a(e, false) && a(t2, false) ? `${e}-` : e}${t2}`);
}
function ae(e = "", t2 = "") {
  return `--${Q(e, t2)}`;
}
function ht(e = "") {
  let t2 = (e.match(/{/g) || []).length, r = (e.match(/}/g) || []).length;
  return (t2 + r) % 2 !== 0;
}
function Y(e, t2 = "", r = "", s2 = [], i2) {
  if (a(e)) {
    let a2 = e.trim();
    if (ht(a2)) return;
    if (G(a2, k)) {
      let n = a2.replaceAll(k, (l2) => {
        let c2 = l2.replace(/{|}/g, "").split(".").filter((m2) => !s2.some((d) => G(m2, d)));
        return `var(${ae(r, re(c2.join("-")))}${s$1(i2) ? `, ${i2}` : ""})`;
      });
      return G(n.replace(ie, "0"), ne) ? `calc(${n})` : n;
    }
    return a2;
  } else if (z(e)) return e;
}
function Re(e, t2, r) {
  a(t2, false) && e.push(`${t2}:${r};`);
}
function C(e, t2) {
  return e ? `${e}{${t2}}` : "";
}
function le(e, t2) {
  if (e.indexOf("dt(") === -1) return e;
  function r(n, l2) {
    let o = [], c2 = 0, m2 = "", d = null, u = 0;
    for (; c2 <= n.length; ) {
      let g2 = n[c2];
      if ((g2 === '"' || g2 === "'" || g2 === "`") && n[c2 - 1] !== "\\" && (d = d === g2 ? null : g2), !d && (g2 === "(" && u++, g2 === ")" && u--, (g2 === "," || c2 === n.length) && u === 0)) {
        let f2 = m2.trim();
        f2.startsWith("dt(") ? o.push(le(f2, l2)) : o.push(s2(f2)), m2 = "", c2++;
        continue;
      }
      g2 !== void 0 && (m2 += g2), c2++;
    }
    return o;
  }
  function s2(n) {
    let l2 = n[0];
    if ((l2 === '"' || l2 === "'" || l2 === "`") && n[n.length - 1] === l2) return n.slice(1, -1);
    let o = Number(n);
    return isNaN(o) ? n : o;
  }
  let i2 = [], a2 = [];
  for (let n = 0; n < e.length; n++) if (e[n] === "d" && e.slice(n, n + 3) === "dt(") a2.push(n), n += 2;
  else if (e[n] === ")" && a2.length > 0) {
    let l2 = a2.pop();
    a2.length === 0 && i2.push([l2, n]);
  }
  if (!i2.length) return e;
  for (let n = i2.length - 1; n >= 0; n--) {
    let [l2, o] = i2[n], c2 = e.slice(l2 + 3, o), m2 = r(c2, t2), d = t2(...m2);
    e = e.slice(0, l2) + d + e.slice(o + 1);
  }
  return e;
}
var rr = (e) => {
  var a2;
  let t2 = S.getTheme(), r = ue(t2, e, void 0, "variable"), s2 = (a2 = r == null ? void 0 : r.match(/--[\w-]+/g)) == null ? void 0 : a2[0], i2 = ue(t2, e, void 0, "value");
  return { name: s2, variable: r, value: i2 };
}, E = (...e) => ue(S.getTheme(), ...e), ue = (e = {}, t2, r, s2) => {
  if (t2) {
    let { variable: i2, options: a2 } = S.defaults || {}, { prefix: n, transform: l$1 } = (e == null ? void 0 : e.options) || a2 || {}, o = G(t2, k) ? t2 : `{${t2}}`;
    return s2 === "value" || l(s2) && l$1 === "strict" ? S.getTokenValue(t2) : Y(o, void 0, n, [i2.excludedKeyRegex], r);
  }
  return "";
};
function ar(e, ...t2) {
  if (e instanceof Array) {
    let r = e.reduce((s2, i2, a2) => {
      var n;
      return s2 + i2 + ((n = m(t2[a2], { dt: E })) != null ? n : "");
    }, "");
    return le(r, E);
  }
  return m(e, { dt: E });
}
function de(e, t2 = {}) {
  let r = S.defaults.variable, { prefix: s2 = r.prefix, selector: i$1 = r.selector, excludedKeyRegex: a2 = r.excludedKeyRegex } = t2, n = [], l2 = [], o = [{ node: e, path: s2 }];
  for (; o.length; ) {
    let { node: m2, path: d } = o.pop();
    for (let u in m2) {
      let g2 = m2[u], f2 = ve(g2), p = G(u, a2) ? Q(d) : Q(d, re(u));
      if (i(f2)) o.push({ node: f2, path: p });
      else {
        let y2 = ae(p), R2 = Y(f2, p, s2, [a2]);
        Re(l2, y2, R2);
        let T2 = p;
        s2 && T2.startsWith(s2 + "-") && (T2 = T2.slice(s2.length + 1)), n.push(T2.replace(/-/g, "."));
      }
    }
  }
  let c2 = l2.join("");
  return { value: l2, tokens: n, declarations: c2, css: C(i$1, c2) };
}
var b = { regex: { rules: { class: { pattern: /^\.([a-zA-Z][\w-]*)$/, resolve(e) {
  return { type: "class", selector: e, matched: this.pattern.test(e.trim()) };
} }, attr: { pattern: /^\[(.*)\]$/, resolve(e) {
  return { type: "attr", selector: `:root${e},:host${e}`, matched: this.pattern.test(e.trim()) };
} }, media: { pattern: /^@media (.*)$/, resolve(e) {
  return { type: "media", selector: e, matched: this.pattern.test(e.trim()) };
} }, system: { pattern: /^system$/, resolve(e) {
  return { type: "system", selector: "@media (prefers-color-scheme: dark)", matched: this.pattern.test(e.trim()) };
} }, custom: { resolve(e) {
  return { type: "custom", selector: e, matched: true };
} } }, resolve(e) {
  let t2 = Object.keys(this.rules).filter((r) => r !== "custom").map((r) => this.rules[r]);
  return [e].flat().map((r) => {
    var s2;
    return (s2 = t2.map((i2) => i2.resolve(r)).find((i2) => i2.matched)) != null ? s2 : this.rules.custom.resolve(r);
  });
} }, _toVariables(e, t2) {
  return de(e, { prefix: t2 == null ? void 0 : t2.prefix });
}, getCommon({ name: e = "", theme: t2 = {}, params: r, set: s2, defaults: i2 }) {
  var R2, T2, j, O, M, z2, V;
  let { preset: a2, options: n } = t2, l2, o, c2, m$1, d, u, g2;
  if (s$1(a2) && n.transform !== "strict") {
    let { primitive: L, semantic: te, extend: re2 } = a2, f2 = te || {}, { colorScheme: K2 } = f2, A2 = v(f2, ["colorScheme"]), x2 = re2 || {}, { colorScheme: X } = x2, G2 = v(x2, ["colorScheme"]), p = K2 || {}, { dark: U2 } = p, B = v(p, ["dark"]), y2 = X || {}, { dark: I } = y2, H = v(y2, ["dark"]), W2 = s$1(L) ? this._toVariables({ primitive: L }, n) : {}, q = s$1(A2) ? this._toVariables({ semantic: A2 }, n) : {}, Z = s$1(B) ? this._toVariables({ light: B }, n) : {}, pe = s$1(U2) ? this._toVariables({ dark: U2 }, n) : {}, fe = s$1(G2) ? this._toVariables({ semantic: G2 }, n) : {}, ye = s$1(H) ? this._toVariables({ light: H }, n) : {}, Se = s$1(I) ? this._toVariables({ dark: I }, n) : {}, [Me, ze] = [(R2 = W2.declarations) != null ? R2 : "", W2.tokens], [Ke, Xe] = [(T2 = q.declarations) != null ? T2 : "", q.tokens || []], [Ge, Ue] = [(j = Z.declarations) != null ? j : "", Z.tokens || []], [Be, Ie] = [(O = pe.declarations) != null ? O : "", pe.tokens || []], [He, We] = [(M = fe.declarations) != null ? M : "", fe.tokens || []], [qe, Ze] = [(z2 = ye.declarations) != null ? z2 : "", ye.tokens || []], [Fe, Je] = [(V = Se.declarations) != null ? V : "", Se.tokens || []];
    l2 = this.transformCSS(e, Me, "light", "variable", n, s2, i2), o = ze;
    let Qe = this.transformCSS(e, `${Ke}${Ge}`, "light", "variable", n, s2, i2), Ye = this.transformCSS(e, `${Be}`, "dark", "variable", n, s2, i2);
    c2 = `${Qe}${Ye}`, m$1 = [.../* @__PURE__ */ new Set([...Xe, ...Ue, ...Ie])];
    let et = this.transformCSS(e, `${He}${qe}color-scheme:light`, "light", "variable", n, s2, i2), tt2 = this.transformCSS(e, `${Fe}color-scheme:dark`, "dark", "variable", n, s2, i2);
    d = `${et}${tt2}`, u = [.../* @__PURE__ */ new Set([...We, ...Ze, ...Je])], g2 = m(a2.css, { dt: E });
  }
  return { primitive: { css: l2, tokens: o }, semantic: { css: c2, tokens: m$1 }, global: { css: d, tokens: u }, style: g2 };
}, getPreset({ name: e = "", preset: t2 = {}, options: r, params: s2, set: i2, defaults: a2, selector: n }) {
  var f2, x2, p;
  let l2, o, c2;
  if (s$1(t2) && r.transform !== "strict") {
    let y2 = e.replace("-directive", ""), m$1 = t2, { colorScheme: R2, extend: T2, css: j } = m$1, O = v(m$1, ["colorScheme", "extend", "css"]), d = T2 || {}, { colorScheme: M } = d, z2 = v(d, ["colorScheme"]), u = R2 || {}, { dark: V } = u, L = v(u, ["dark"]), g2 = M || {}, { dark: te } = g2, re2 = v(g2, ["dark"]), K2 = s$1(O) ? this._toVariables({ [y2]: h(h({}, O), z2) }, r) : {}, A2 = s$1(L) ? this._toVariables({ [y2]: h(h({}, L), re2) }, r) : {}, X = s$1(V) ? this._toVariables({ [y2]: h(h({}, V), te) }, r) : {}, [G2, U2] = [(f2 = K2.declarations) != null ? f2 : "", K2.tokens || []], [B, I] = [(x2 = A2.declarations) != null ? x2 : "", A2.tokens || []], [H, W2] = [(p = X.declarations) != null ? p : "", X.tokens || []], q = this.transformCSS(y2, `${G2}${B}`, "light", "variable", r, i2, a2, n), Z = this.transformCSS(y2, H, "dark", "variable", r, i2, a2, n);
    l2 = `${q}${Z}`, o = [.../* @__PURE__ */ new Set([...U2, ...I, ...W2])], c2 = m(j, { dt: E });
  }
  return { css: l2, tokens: o, style: c2 };
}, getPresetC({ name: e = "", theme: t2 = {}, params: r, set: s2, defaults: i2 }) {
  var o;
  let { preset: a2, options: n } = t2, l2 = (o = a2 == null ? void 0 : a2.components) == null ? void 0 : o[e];
  return this.getPreset({ name: e, preset: l2, options: n, params: r, set: s2, defaults: i2 });
}, getPresetD({ name: e = "", theme: t2 = {}, params: r, set: s2, defaults: i2 }) {
  var c2, m2;
  let a2 = e.replace("-directive", ""), { preset: n, options: l2 } = t2, o = ((c2 = n == null ? void 0 : n.components) == null ? void 0 : c2[a2]) || ((m2 = n == null ? void 0 : n.directives) == null ? void 0 : m2[a2]);
  return this.getPreset({ name: a2, preset: o, options: l2, params: r, set: s2, defaults: i2 });
}, applyDarkColorScheme(e) {
  return !(e.darkModeSelector === "none" || e.darkModeSelector === false);
}, getColorSchemeOption(e, t2) {
  var r;
  return this.applyDarkColorScheme(e) ? this.regex.resolve(e.darkModeSelector === true ? t2.options.darkModeSelector : (r = e.darkModeSelector) != null ? r : t2.options.darkModeSelector) : [];
}, getLayerOrder(e, t2 = {}, r, s2) {
  let { cssLayer: i2 } = t2;
  return i2 ? `@layer ${m(i2.order || i2.name || "primeui", r)}` : "";
}, getCommonStyleSheet({ name: e = "", theme: t2 = {}, params: r, props: s2 = {}, set: i$1, defaults: a2 }) {
  let n = this.getCommon({ name: e, theme: t2, params: r, set: i$1, defaults: a2 }), l2 = Object.entries(s2).reduce((o, [c2, m2]) => o.push(`${c2}="${m2}"`) && o, []).join(" ");
  return Object.entries(n || {}).reduce((o, [c2, m2]) => {
    if (i(m2) && Object.hasOwn(m2, "css")) {
      let d = Y$1(m2.css), u = `${c2}-variables`;
      o.push(`<style type="text/css" data-primevue-style-id="${u}" ${l2}>${d}</style>`);
    }
    return o;
  }, []).join("");
}, getStyleSheet({ name: e = "", theme: t2 = {}, params: r, props: s2 = {}, set: i2, defaults: a2 }) {
  var c2;
  let n = { name: e, theme: t2, params: r, set: i2, defaults: a2 }, l2 = (c2 = e.includes("-directive") ? this.getPresetD(n) : this.getPresetC(n)) == null ? void 0 : c2.css, o = Object.entries(s2).reduce((m2, [d, u]) => m2.push(`${d}="${u}"`) && m2, []).join(" ");
  return l2 ? `<style type="text/css" data-primevue-style-id="${e}-variables" ${o}>${Y$1(l2)}</style>` : "";
}, createTokens(e = {}, t2, r = "", s2 = "", i$1 = {}) {
  let a2 = function(l$1, o = {}, c2 = []) {
    if (c2.includes(this.path)) return console.warn(`Circular reference detected at ${this.path}`), { colorScheme: l$1, path: this.path, paths: o, value: void 0 };
    c2.push(this.path), o.name = this.path, o.binding || (o.binding = {});
    let m2 = this.value;
    if (typeof this.value == "string" && k.test(this.value)) {
      let u = this.value.trim().replace(k, (g2) => {
        var y2;
        let f2 = g2.slice(1, -1), x2 = this.tokens[f2];
        if (!x2) return console.warn(`Token not found for path: ${f2}`), "__UNRESOLVED__";
        let p = x2.computed(l$1, o, c2);
        return Array.isArray(p) && p.length === 2 ? `light-dark(${p[0].value},${p[1].value})` : (y2 = p == null ? void 0 : p.value) != null ? y2 : "__UNRESOLVED__";
      });
      m2 = ne.test(u.replace(ie, "0")) ? `calc(${u})` : u;
    }
    return l(o.binding) && delete o.binding, c2.pop(), { colorScheme: l$1, path: this.path, paths: o, value: m2.includes("__UNRESOLVED__") ? void 0 : m2 };
  }, n = (l2, o, c2) => {
    Object.entries(l2).forEach(([m2, d]) => {
      let u = G(m2, t2.variable.excludedKeyRegex) ? o : o ? `${o}.${oe(m2)}` : oe(m2), g2 = c2 ? `${c2}.${m2}` : m2;
      i(d) ? n(d, u, g2) : (i$1[u] || (i$1[u] = { paths: [], computed: (f2, x2 = {}, p = []) => {
        if (i$1[u].paths.length === 1) return i$1[u].paths[0].computed(i$1[u].paths[0].scheme, x2.binding, p);
        if (f2 && f2 !== "none") for (let y2 = 0; y2 < i$1[u].paths.length; y2++) {
          let R2 = i$1[u].paths[y2];
          if (R2.scheme === f2) return R2.computed(f2, x2.binding, p);
        }
        return i$1[u].paths.map((y2) => y2.computed(y2.scheme, x2[y2.scheme], p));
      } }), i$1[u].paths.push({ path: g2, value: d, scheme: g2.includes("colorScheme.light") ? "light" : g2.includes("colorScheme.dark") ? "dark" : "none", computed: a2, tokens: i$1 }));
    });
  };
  return n(e, r, s2), i$1;
}, getTokenValue(e, t2, r) {
  var l2;
  let i2 = ((o) => o.split(".").filter((m2) => !G(m2.toLowerCase(), r.variable.excludedKeyRegex)).join("."))(t2), a2 = t2.includes("colorScheme.light") ? "light" : t2.includes("colorScheme.dark") ? "dark" : void 0, n = [(l2 = e[i2]) == null ? void 0 : l2.computed(a2)].flat().filter((o) => o);
  return n.length === 1 ? n[0].value : n.reduce((o = {}, c2) => {
    let u = c2, { colorScheme: m2 } = u, d = v(u, ["colorScheme"]);
    return o[m2] = d, o;
  }, void 0);
}, getSelectorRule(e, t2, r, s2) {
  return r === "class" || r === "attr" ? C(s$1(t2) ? `${e}${t2},${e} ${t2}` : e, s2) : C(e, C(t2 != null ? t2 : ":root,:host", s2));
}, transformCSS(e, t2, r, s2, i$1 = {}, a2, n, l2) {
  if (s$1(t2)) {
    let { cssLayer: o } = i$1;
    if (s2 !== "style") {
      let c2 = this.getColorSchemeOption(i$1, n);
      t2 = r === "dark" ? c2.reduce((m2, { type: d, selector: u }) => (s$1(u) && (m2 += u.includes("[CSS]") ? u.replace("[CSS]", t2) : this.getSelectorRule(u, l2, d, t2)), m2), "") : C(l2 != null ? l2 : ":root,:host", t2);
    }
    if (o) {
      let c2 = { name: "primeui" };
      i(o) && (c2.name = m(o.name, { name: e, type: s2 })), s$1(c2.name) && (t2 = C(`@layer ${c2.name}`, t2), a2 == null || a2.layerNames(c2.name));
    }
    return t2;
  }
  return "";
} };
var S = { defaults: { variable: { prefix: "p", selector: ":root,:host", excludedKeyRegex: /^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi }, options: { prefix: "p", darkModeSelector: "system", cssLayer: false } }, _theme: void 0, _layerNames: /* @__PURE__ */ new Set(), _loadedStyleNames: /* @__PURE__ */ new Set(), _loadingStyles: /* @__PURE__ */ new Set(), _tokens: {}, update(e = {}) {
  let { theme: t2 } = e;
  t2 && (this._theme = $(h({}, t2), { options: h(h({}, this.defaults.options), t2.options) }), this._tokens = b.createTokens(this.preset, this.defaults), this.clearLoadedStyleNames());
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
  this.update({ theme: e }), N.emit("theme:change", e);
}, getPreset() {
  return this.preset;
}, setPreset(e) {
  this._theme = $(h({}, this.theme), { preset: e }), this._tokens = b.createTokens(e, this.defaults), this.clearLoadedStyleNames(), N.emit("preset:change", e), N.emit("theme:change", this.theme);
}, getOptions() {
  return this.options;
}, setOptions(e) {
  this._theme = $(h({}, this.theme), { options: e }), this.clearLoadedStyleNames(), N.emit("options:change", e), N.emit("theme:change", this.theme);
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
  return b.getTokenValue(this.tokens, e, this.defaults);
}, getCommon(e = "", t2) {
  return b.getCommon({ name: e, theme: this.theme, params: t2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getComponent(e = "", t2) {
  let r = { name: e, theme: this.theme, params: t2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return b.getPresetC(r);
}, getDirective(e = "", t2) {
  let r = { name: e, theme: this.theme, params: t2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return b.getPresetD(r);
}, getCustomPreset(e = "", t2, r, s2) {
  let i2 = { name: e, preset: t2, options: this.options, selector: r, params: s2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return b.getPreset(i2);
}, getLayerOrderCSS(e = "") {
  return b.getLayerOrder(e, this.options, { names: this.getLayerNames() }, this.defaults);
}, transformCSS(e = "", t2, r = "style", s2) {
  return b.transformCSS(e, t2, s2, r, this.options, { layerNames: this.setLayerNames.bind(this) }, this.defaults);
}, getCommonStyleSheet(e = "", t2, r = {}) {
  return b.getCommonStyleSheet({ name: e, theme: this.theme, params: t2, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getStyleSheet(e, t2, r = {}) {
  return b.getStyleSheet({ name: e, theme: this.theme, params: t2, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, onStyleMounted(e) {
  this._loadingStyles.add(e);
}, onStyleUpdated(e) {
  this._loadingStyles.add(e);
}, onStyleLoaded(e, { name: t2 }) {
  this._loadingStyles.size && (this._loadingStyles.delete(t2), N.emit(`theme:${t2}:load`, e), !this._loadingStyles.size && N.emit("theme:load"));
} };
var Base = {
  _loadedStyleNames: /* @__PURE__ */ new Set(),
  getLoadedStyleNames: function getLoadedStyleNames() {
    return this._loadedStyleNames;
  },
  isStyleNameLoaded: function isStyleNameLoaded(name) {
    return this._loadedStyleNames.has(name);
  },
  setLoadedStyleName: function setLoadedStyleName(name) {
    this._loadedStyleNames.add(name);
  },
  deleteLoadedStyleName: function deleteLoadedStyleName(name) {
    this._loadedStyleNames["delete"](name);
  },
  clearLoadedStyleNames: function clearLoadedStyleNames() {
    this._loadedStyleNames.clear();
  }
};
var style$4 = "\n    *,\n    ::before,\n    ::after {\n        box-sizing: border-box;\n    }\n\n    .p-collapsible-enter-active {\n        animation: p-animate-collapsible-expand 0.2s ease-out;\n        overflow: hidden;\n    }\n\n    .p-collapsible-leave-active {\n        animation: p-animate-collapsible-collapse 0.2s ease-out;\n        overflow: hidden;\n    }\n\n    @keyframes p-animate-collapsible-expand {\n        from {\n            grid-template-rows: 0fr;\n        }\n        to {\n            grid-template-rows: 1fr;\n        }\n    }\n\n    @keyframes p-animate-collapsible-collapse {\n        from {\n            grid-template-rows: 1fr;\n        }\n        to {\n            grid-template-rows: 0fr;\n        }\n    }\n\n    .p-disabled,\n    .p-disabled * {\n        cursor: default;\n        pointer-events: none;\n        user-select: none;\n    }\n\n    .p-disabled,\n    .p-component:disabled {\n        opacity: dt('disabled.opacity');\n    }\n\n    .pi {\n        font-size: dt('icon.size');\n    }\n\n    .p-icon {\n        width: dt('icon.size');\n        height: dt('icon.size');\n    }\n\n    .p-overlay-mask {\n        background: var(--px-mask-background, dt('mask.background'));\n        color: dt('mask.color');\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n    }\n\n    .p-overlay-mask-enter-active {\n        animation: p-animate-overlay-mask-enter dt('mask.transition.duration') forwards;\n    }\n\n    .p-overlay-mask-leave-active {\n        animation: p-animate-overlay-mask-leave dt('mask.transition.duration') forwards;\n    }\n\n    @keyframes p-animate-overlay-mask-enter {\n        from {\n            background: transparent;\n        }\n        to {\n            background: var(--px-mask-background, dt('mask.background'));\n        }\n    }\n    @keyframes p-animate-overlay-mask-leave {\n        from {\n            background: var(--px-mask-background, dt('mask.background'));\n        }\n        to {\n            background: transparent;\n        }\n    }\n\n    .p-anchored-overlay-enter-active {\n        animation: p-animate-anchored-overlay-enter 300ms cubic-bezier(.19,1,.22,1);\n    }\n\n    .p-anchored-overlay-leave-active {\n        animation: p-animate-anchored-overlay-leave 300ms cubic-bezier(.19,1,.22,1);\n    }\n\n    @keyframes p-animate-anchored-overlay-enter {\n        from {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n\n    @keyframes p-animate-anchored-overlay-leave {\n        to {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n";
function _typeof$a(o) {
  "@babel/helpers - typeof";
  return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$a(o);
}
function ownKeys$5(e, r) {
  var t2 = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$5(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t2 = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$5(Object(t2), true).forEach(function(r2) {
      _defineProperty$a(e, r2, t2[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t2)) : ownKeys$5(Object(t2)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t2, r2));
    });
  }
  return e;
}
function _defineProperty$a(e, r, t2) {
  return (r = _toPropertyKey$a(r)) in e ? Object.defineProperty(e, r, { value: t2, enumerable: true, configurable: true, writable: true }) : e[r] = t2, e;
}
function _toPropertyKey$a(t2) {
  var i2 = _toPrimitive$a(t2, "string");
  return "symbol" == _typeof$a(i2) ? i2 : i2 + "";
}
function _toPrimitive$a(t2, r) {
  if ("object" != _typeof$a(t2) || !t2) return t2;
  var e = t2[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i2 = e.call(t2, r);
    if ("object" != _typeof$a(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t2);
}
function tryOnMounted(fn) {
  var sync = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (getCurrentInstance() && getCurrentInstance().components) onMounted(fn);
  else if (sync) fn();
  else nextTick(fn);
}
var _id = 0;
function useStyle(css3) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var isLoaded = ref(false);
  var cssRef = ref(css3);
  var styleRef = ref(null);
  var defaultDocument = tt() ? window.document : void 0;
  var _options$document = options.document, document2 = _options$document === void 0 ? defaultDocument : _options$document, _options$immediate = options.immediate, immediate = _options$immediate === void 0 ? true : _options$immediate, _options$manual = options.manual, manual = _options$manual === void 0 ? false : _options$manual, _options$name = options.name, name = _options$name === void 0 ? "style_".concat(++_id) : _options$name, _options$id = options.id, id = _options$id === void 0 ? void 0 : _options$id, _options$media = options.media, media = _options$media === void 0 ? void 0 : _options$media, _options$nonce = options.nonce, nonce = _options$nonce === void 0 ? void 0 : _options$nonce, _options$first = options.first, first = _options$first === void 0 ? false : _options$first, _options$onMounted = options.onMounted, onStyleMounted = _options$onMounted === void 0 ? void 0 : _options$onMounted, _options$onUpdated = options.onUpdated, onStyleUpdated = _options$onUpdated === void 0 ? void 0 : _options$onUpdated, _options$onLoad = options.onLoad, onStyleLoaded = _options$onLoad === void 0 ? void 0 : _options$onLoad, _options$props = options.props, props = _options$props === void 0 ? {} : _options$props;
  var stop = function stop2() {
  };
  var load2 = function load3(_css) {
    var _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!document2) return;
    var _styleProps = _objectSpread$5(_objectSpread$5({}, props), _props);
    var _name = _styleProps.name || name, _id2 = _styleProps.id || id, _nonce = _styleProps.nonce || nonce;
    styleRef.value = document2.querySelector('style[data-primevue-style-id="'.concat(_name, '"]')) || document2.getElementById(_id2) || document2.createElement("style");
    if (!styleRef.value.isConnected) {
      cssRef.value = _css || css3;
      A(styleRef.value, {
        type: "text/css",
        id: _id2,
        media,
        nonce: _nonce
      });
      first ? document2.head.prepend(styleRef.value) : document2.head.appendChild(styleRef.value);
      _t(styleRef.value, "data-primevue-style-id", _name);
      A(styleRef.value, _styleProps);
      styleRef.value.onload = function(event) {
        return onStyleLoaded === null || onStyleLoaded === void 0 ? void 0 : onStyleLoaded(event, {
          name: _name
        });
      };
      onStyleMounted === null || onStyleMounted === void 0 || onStyleMounted(_name);
    }
    if (isLoaded.value) return;
    stop = watch(cssRef, function(value) {
      styleRef.value.textContent = value;
      onStyleUpdated === null || onStyleUpdated === void 0 || onStyleUpdated(_name);
    }, {
      immediate: true
    });
    isLoaded.value = true;
  };
  var unload = function unload2() {
    if (!document2 || !isLoaded.value) return;
    stop();
    T(styleRef.value) && document2.head.removeChild(styleRef.value);
    isLoaded.value = false;
    styleRef.value = null;
  };
  if (immediate && !manual) tryOnMounted(load2);
  return {
    id,
    name,
    el: styleRef,
    css: cssRef,
    unload,
    load: load2,
    isLoaded: readonly(isLoaded)
  };
}
function _typeof$9(o) {
  "@babel/helpers - typeof";
  return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$9(o);
}
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _slicedToArray$2(r, e) {
  return _arrayWithHoles$2(r) || _iterableToArrayLimit$2(r, e) || _unsupportedIterableToArray$5(r, e) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$5(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$5(r, a2);
    var t2 = {}.toString.call(r).slice(8, -1);
    return "Object" === t2 && r.constructor && (t2 = r.constructor.name), "Map" === t2 || "Set" === t2 ? Array.from(r) : "Arguments" === t2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t2) ? _arrayLikeToArray$5(r, a2) : void 0;
  }
}
function _arrayLikeToArray$5(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$2(r, l2) {
  var t2 = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t2) {
    var e, n, i2, u, a2 = [], f2 = true, o = false;
    try {
      if (i2 = (t2 = t2.call(r)).next, 0 === l2) ;
      else for (; !(f2 = (e = i2.call(t2)).done) && (a2.push(e.value), a2.length !== l2); f2 = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f2 && null != t2["return"] && (u = t2["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$2(r) {
  if (Array.isArray(r)) return r;
}
function ownKeys$4(e, r) {
  var t2 = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$4(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t2 = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$4(Object(t2), true).forEach(function(r2) {
      _defineProperty$9(e, r2, t2[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t2)) : ownKeys$4(Object(t2)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t2, r2));
    });
  }
  return e;
}
function _defineProperty$9(e, r, t2) {
  return (r = _toPropertyKey$9(r)) in e ? Object.defineProperty(e, r, { value: t2, enumerable: true, configurable: true, writable: true }) : e[r] = t2, e;
}
function _toPropertyKey$9(t2) {
  var i2 = _toPrimitive$9(t2, "string");
  return "symbol" == _typeof$9(i2) ? i2 : i2 + "";
}
function _toPrimitive$9(t2, r) {
  if ("object" != _typeof$9(t2) || !t2) return t2;
  var e = t2[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i2 = e.call(t2, r);
    if ("object" != _typeof$9(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t2);
}
function _taggedTemplateLiteral(e, t2) {
  return t2 || (t2 = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t2) } }));
}
var css$1 = function css(_ref) {
  var dt2 = _ref.dt;
  return "\n.p-hidden-accessible {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    opacity: 0;\n    overflow: hidden;\n    padding: 0;\n    pointer-events: none;\n    position: absolute;\n    white-space: nowrap;\n    width: 1px;\n}\n\n.p-overflow-hidden {\n    overflow: hidden;\n    padding-right: ".concat(dt2("scrollbar.width"), ";\n}\n");
};
var classes$4 = {};
var inlineStyles$1 = {};
var BaseStyle = {
  name: "base",
  css: css$1,
  style: style$4,
  classes: classes$4,
  inlineStyles: inlineStyles$1,
  load: function load(style2) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var transform = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(cs) {
      return cs;
    };
    var computedStyle = transform(ar(_templateObject || (_templateObject = _taggedTemplateLiteral(["", ""])), style2));
    return s$1(computedStyle) ? useStyle(Y$1(computedStyle), _objectSpread$4({
      name: this.name
    }, options)) : {};
  },
  loadCSS: function loadCSS() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return this.load(this.css, options);
  },
  loadStyle: function loadStyle() {
    var _this = this;
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var style2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return this.load(this.style, options, function() {
      var computedStyle = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      return S.transformCSS(options.name || _this.name, "".concat(computedStyle).concat(ar(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["", ""])), style2)));
    });
  },
  getCommonTheme: function getCommonTheme(params) {
    return S.getCommon(this.name, params);
  },
  getComponentTheme: function getComponentTheme(params) {
    return S.getComponent(this.name, params);
  },
  getDirectiveTheme: function getDirectiveTheme(params) {
    return S.getDirective(this.name, params);
  },
  getPresetTheme: function getPresetTheme(preset, selector, params) {
    return S.getCustomPreset(this.name, preset, selector, params);
  },
  getLayerOrderThemeCSS: function getLayerOrderThemeCSS() {
    return S.getLayerOrderCSS(this.name);
  },
  getStyleSheet: function getStyleSheet() {
    var extendedCSS = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.css) {
      var _css = m(this.css, {
        dt: E
      }) || "";
      var _style = Y$1(ar(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["", "", ""])), _css, extendedCSS));
      var _props = Object.entries(props).reduce(function(acc, _ref2) {
        var _ref3 = _slicedToArray$2(_ref2, 2), k2 = _ref3[0], v2 = _ref3[1];
        return acc.push("".concat(k2, '="').concat(v2, '"')) && acc;
      }, []).join(" ");
      return s$1(_style) ? '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(_props, ">").concat(_style, "</style>") : "";
    }
    return "";
  },
  getCommonThemeStyleSheet: function getCommonThemeStyleSheet(params) {
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return S.getCommonStyleSheet(this.name, params, props);
  },
  getThemeStyleSheet: function getThemeStyleSheet(params) {
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var css3 = [S.getStyleSheet(this.name, params, props)];
    if (this.style) {
      var name = this.name === "base" ? "global-style" : "".concat(this.name, "-style");
      var _css = ar(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["", ""])), m(this.style, {
        dt: E
      }));
      var _style = Y$1(S.transformCSS(name, _css));
      var _props = Object.entries(props).reduce(function(acc, _ref4) {
        var _ref5 = _slicedToArray$2(_ref4, 2), k2 = _ref5[0], v2 = _ref5[1];
        return acc.push("".concat(k2, '="').concat(v2, '"')) && acc;
      }, []).join(" ");
      s$1(_style) && css3.push('<style type="text/css" data-primevue-style-id="'.concat(name, '" ').concat(_props, ">").concat(_style, "</style>"));
    }
    return css3.join("");
  },
  extend: function extend(inStyle) {
    return _objectSpread$4(_objectSpread$4({}, this), {}, {
      css: void 0,
      style: void 0
    }, inStyle);
  }
};
function useAttrSelector() {
  var prefix = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "pc";
  var idx = useId();
  return "".concat(prefix).concat(idx.replace("v-", "").replaceAll("-", "_"));
}
var BaseComponentStyle = BaseStyle.extend({
  name: "common"
});
function _typeof$8(o) {
  "@babel/helpers - typeof";
  return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$8(o);
}
function _toArray(r) {
  return _arrayWithHoles$1(r) || _iterableToArray$3(r) || _unsupportedIterableToArray$4(r) || _nonIterableRest$1();
}
function _iterableToArray$3(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _slicedToArray$1(r, e) {
  return _arrayWithHoles$1(r) || _iterableToArrayLimit$1(r, e) || _unsupportedIterableToArray$4(r, e) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$4(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$4(r, a2);
    var t2 = {}.toString.call(r).slice(8, -1);
    return "Object" === t2 && r.constructor && (t2 = r.constructor.name), "Map" === t2 || "Set" === t2 ? Array.from(r) : "Arguments" === t2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t2) ? _arrayLikeToArray$4(r, a2) : void 0;
  }
}
function _arrayLikeToArray$4(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$1(r, l2) {
  var t2 = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t2) {
    var e, n, i2, u, a2 = [], f2 = true, o = false;
    try {
      if (i2 = (t2 = t2.call(r)).next, 0 === l2) {
        if (Object(t2) !== t2) return;
        f2 = false;
      } else for (; !(f2 = (e = i2.call(t2)).done) && (a2.push(e.value), a2.length !== l2); f2 = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f2 && null != t2["return"] && (u = t2["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$1(r) {
  if (Array.isArray(r)) return r;
}
function ownKeys$3(e, r) {
  var t2 = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t2 = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$3(Object(t2), true).forEach(function(r2) {
      _defineProperty$8(e, r2, t2[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t2)) : ownKeys$3(Object(t2)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t2, r2));
    });
  }
  return e;
}
function _defineProperty$8(e, r, t2) {
  return (r = _toPropertyKey$8(r)) in e ? Object.defineProperty(e, r, { value: t2, enumerable: true, configurable: true, writable: true }) : e[r] = t2, e;
}
function _toPropertyKey$8(t2) {
  var i2 = _toPrimitive$8(t2, "string");
  return "symbol" == _typeof$8(i2) ? i2 : i2 + "";
}
function _toPrimitive$8(t2, r) {
  if ("object" != _typeof$8(t2) || !t2) return t2;
  var e = t2[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i2 = e.call(t2, r);
    if ("object" != _typeof$8(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t2);
}
var script$8 = {
  name: "BaseComponent",
  props: {
    pt: {
      type: Object,
      "default": void 0
    },
    ptOptions: {
      type: Object,
      "default": void 0
    },
    unstyled: {
      type: Boolean,
      "default": void 0
    },
    dt: {
      type: Object,
      "default": void 0
    }
  },
  inject: {
    $parentInstance: {
      "default": void 0
    }
  },
  watch: {
    isUnstyled: {
      immediate: true,
      handler: function handler(newValue) {
        N.off("theme:change", this._loadCoreStyles);
        if (!newValue) {
          this._loadCoreStyles();
          this._themeChangeListener(this._loadCoreStyles);
        }
      }
    },
    dt: {
      immediate: true,
      handler: function handler2(newValue, oldValue) {
        var _this = this;
        N.off("theme:change", this._themeScopedListener);
        if (newValue) {
          this._loadScopedThemeStyles(newValue);
          this._themeScopedListener = function() {
            return _this._loadScopedThemeStyles(newValue);
          };
          this._themeChangeListener(this._themeScopedListener);
        } else {
          this._unloadScopedThemeStyles();
        }
      }
    }
  },
  scopedStyleEl: void 0,
  rootEl: void 0,
  uid: void 0,
  $attrSelector: void 0,
  beforeCreate: function beforeCreate() {
    var _this$pt, _this$pt2, _this$pt3, _ref, _ref$onBeforeCreate, _this$$primevueConfig, _this$$primevue, _this$$primevue2, _this$$primevue3, _ref2, _ref2$onBeforeCreate;
    var _usept = (_this$pt = this.pt) === null || _this$pt === void 0 ? void 0 : _this$pt["_usept"];
    var originalValue = _usept ? (_this$pt2 = this.pt) === null || _this$pt2 === void 0 || (_this$pt2 = _this$pt2.originalValue) === null || _this$pt2 === void 0 ? void 0 : _this$pt2[this.$.type.name] : void 0;
    var value = _usept ? (_this$pt3 = this.pt) === null || _this$pt3 === void 0 || (_this$pt3 = _this$pt3.value) === null || _this$pt3 === void 0 ? void 0 : _this$pt3[this.$.type.name] : this.pt;
    (_ref = value || originalValue) === null || _ref === void 0 || (_ref = _ref.hooks) === null || _ref === void 0 || (_ref$onBeforeCreate = _ref["onBeforeCreate"]) === null || _ref$onBeforeCreate === void 0 || _ref$onBeforeCreate.call(_ref);
    var _useptInConfig = (_this$$primevueConfig = this.$primevueConfig) === null || _this$$primevueConfig === void 0 || (_this$$primevueConfig = _this$$primevueConfig.pt) === null || _this$$primevueConfig === void 0 ? void 0 : _this$$primevueConfig["_usept"];
    var originalValueInConfig = _useptInConfig ? (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.config) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.pt) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.originalValue : void 0;
    var valueInConfig = _useptInConfig ? (_this$$primevue2 = this.$primevue) === null || _this$$primevue2 === void 0 || (_this$$primevue2 = _this$$primevue2.config) === null || _this$$primevue2 === void 0 || (_this$$primevue2 = _this$$primevue2.pt) === null || _this$$primevue2 === void 0 ? void 0 : _this$$primevue2.value : (_this$$primevue3 = this.$primevue) === null || _this$$primevue3 === void 0 || (_this$$primevue3 = _this$$primevue3.config) === null || _this$$primevue3 === void 0 ? void 0 : _this$$primevue3.pt;
    (_ref2 = valueInConfig || originalValueInConfig) === null || _ref2 === void 0 || (_ref2 = _ref2[this.$.type.name]) === null || _ref2 === void 0 || (_ref2 = _ref2.hooks) === null || _ref2 === void 0 || (_ref2$onBeforeCreate = _ref2["onBeforeCreate"]) === null || _ref2$onBeforeCreate === void 0 || _ref2$onBeforeCreate.call(_ref2);
    this.$attrSelector = useAttrSelector();
    this.uid = this.$attrs.id || this.$attrSelector.replace("pc", "pv_id_");
  },
  created: function created() {
    this._hook("onCreated");
  },
  beforeMount: function beforeMount() {
    var _this$$el;
    this.rootEl = z$1(c$1(this.$el) ? this.$el : (_this$$el = this.$el) === null || _this$$el === void 0 ? void 0 : _this$$el.parentElement, "[".concat(this.$attrSelector, "]"));
    if (this.rootEl) {
      this.rootEl.$pc = _objectSpread$3({
        name: this.$.type.name,
        attrSelector: this.$attrSelector
      }, this.$params);
    }
    this._loadStyles();
    this._hook("onBeforeMount");
  },
  mounted: function mounted() {
    this._hook("onMounted");
  },
  beforeUpdate: function beforeUpdate() {
    this._hook("onBeforeUpdate");
  },
  updated: function updated() {
    this._hook("onUpdated");
  },
  beforeUnmount: function beforeUnmount() {
    this._hook("onBeforeUnmount");
  },
  unmounted: function unmounted() {
    this._removeThemeListeners();
    this._unloadScopedThemeStyles();
    this._hook("onUnmounted");
  },
  methods: {
    _hook: function _hook(hookName) {
      if (!this.$options.hostName) {
        var selfHook = this._usePT(this._getPT(this.pt, this.$.type.name), this._getOptionValue, "hooks.".concat(hookName));
        var defaultHook = this._useDefaultPT(this._getOptionValue, "hooks.".concat(hookName));
        selfHook === null || selfHook === void 0 || selfHook();
        defaultHook === null || defaultHook === void 0 || defaultHook();
      }
    },
    _mergeProps: function _mergeProps(fn) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      return c(fn) ? fn.apply(void 0, args) : mergeProps.apply(void 0, args);
    },
    _load: function _load() {
      if (!Base.isStyleNameLoaded("base")) {
        BaseStyle.loadCSS(this.$styleOptions);
        this._loadGlobalStyles();
        Base.setLoadedStyleName("base");
      }
      this._loadThemeStyles();
    },
    _loadStyles: function _loadStyles() {
      this._load();
      this._themeChangeListener(this._load);
    },
    _loadCoreStyles: function _loadCoreStyles() {
      var _this$$style, _this$$style2;
      if (!Base.isStyleNameLoaded((_this$$style = this.$style) === null || _this$$style === void 0 ? void 0 : _this$$style.name) && (_this$$style2 = this.$style) !== null && _this$$style2 !== void 0 && _this$$style2.name) {
        BaseComponentStyle.loadCSS(this.$styleOptions);
        this.$options.style && this.$style.loadCSS(this.$styleOptions);
        Base.setLoadedStyleName(this.$style.name);
      }
    },
    _loadGlobalStyles: function _loadGlobalStyles() {
      var globalCSS = this._useGlobalPT(this._getOptionValue, "global.css", this.$params);
      s$1(globalCSS) && BaseStyle.load(globalCSS, _objectSpread$3({
        name: "global"
      }, this.$styleOptions));
    },
    _loadThemeStyles: function _loadThemeStyles() {
      var _this$$style4, _this$$style5;
      if (this.isUnstyled || this.$theme === "none") return;
      if (!S.isStyleNameLoaded("common")) {
        var _this$$style3, _this$$style3$getComm;
        var _ref3 = ((_this$$style3 = this.$style) === null || _this$$style3 === void 0 || (_this$$style3$getComm = _this$$style3.getCommonTheme) === null || _this$$style3$getComm === void 0 ? void 0 : _this$$style3$getComm.call(_this$$style3)) || {}, primitive = _ref3.primitive, semantic = _ref3.semantic, global = _ref3.global, style2 = _ref3.style;
        BaseStyle.load(primitive === null || primitive === void 0 ? void 0 : primitive.css, _objectSpread$3({
          name: "primitive-variables"
        }, this.$styleOptions));
        BaseStyle.load(semantic === null || semantic === void 0 ? void 0 : semantic.css, _objectSpread$3({
          name: "semantic-variables"
        }, this.$styleOptions));
        BaseStyle.load(global === null || global === void 0 ? void 0 : global.css, _objectSpread$3({
          name: "global-variables"
        }, this.$styleOptions));
        BaseStyle.loadStyle(_objectSpread$3({
          name: "global-style"
        }, this.$styleOptions), style2);
        S.setLoadedStyleName("common");
      }
      if (!S.isStyleNameLoaded((_this$$style4 = this.$style) === null || _this$$style4 === void 0 ? void 0 : _this$$style4.name) && (_this$$style5 = this.$style) !== null && _this$$style5 !== void 0 && _this$$style5.name) {
        var _this$$style6, _this$$style6$getComp, _this$$style7, _this$$style8;
        var _ref4 = ((_this$$style6 = this.$style) === null || _this$$style6 === void 0 || (_this$$style6$getComp = _this$$style6.getComponentTheme) === null || _this$$style6$getComp === void 0 ? void 0 : _this$$style6$getComp.call(_this$$style6)) || {}, css3 = _ref4.css, _style = _ref4.style;
        (_this$$style7 = this.$style) === null || _this$$style7 === void 0 || _this$$style7.load(css3, _objectSpread$3({
          name: "".concat(this.$style.name, "-variables")
        }, this.$styleOptions));
        (_this$$style8 = this.$style) === null || _this$$style8 === void 0 || _this$$style8.loadStyle(_objectSpread$3({
          name: "".concat(this.$style.name, "-style")
        }, this.$styleOptions), _style);
        S.setLoadedStyleName(this.$style.name);
      }
      if (!S.isStyleNameLoaded("layer-order")) {
        var _this$$style9, _this$$style9$getLaye;
        var layerOrder = (_this$$style9 = this.$style) === null || _this$$style9 === void 0 || (_this$$style9$getLaye = _this$$style9.getLayerOrderThemeCSS) === null || _this$$style9$getLaye === void 0 ? void 0 : _this$$style9$getLaye.call(_this$$style9);
        BaseStyle.load(layerOrder, _objectSpread$3({
          name: "layer-order",
          first: true
        }, this.$styleOptions));
        S.setLoadedStyleName("layer-order");
      }
    },
    _loadScopedThemeStyles: function _loadScopedThemeStyles(preset) {
      var _this$$style0, _this$$style0$getPres, _this$$style1;
      var _ref5 = ((_this$$style0 = this.$style) === null || _this$$style0 === void 0 || (_this$$style0$getPres = _this$$style0.getPresetTheme) === null || _this$$style0$getPres === void 0 ? void 0 : _this$$style0$getPres.call(_this$$style0, preset, "[".concat(this.$attrSelector, "]"))) || {}, css3 = _ref5.css;
      var scopedStyle = (_this$$style1 = this.$style) === null || _this$$style1 === void 0 ? void 0 : _this$$style1.load(css3, _objectSpread$3({
        name: "".concat(this.$attrSelector, "-").concat(this.$style.name)
      }, this.$styleOptions));
      this.scopedStyleEl = scopedStyle.el;
    },
    _unloadScopedThemeStyles: function _unloadScopedThemeStyles() {
      var _this$scopedStyleEl;
      (_this$scopedStyleEl = this.scopedStyleEl) === null || _this$scopedStyleEl === void 0 || (_this$scopedStyleEl = _this$scopedStyleEl.value) === null || _this$scopedStyleEl === void 0 || _this$scopedStyleEl.remove();
    },
    _themeChangeListener: function _themeChangeListener() {
      var callback = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function() {
      };
      Base.clearLoadedStyleNames();
      N.on("theme:change", callback);
    },
    _removeThemeListeners: function _removeThemeListeners() {
      N.off("theme:change", this._loadCoreStyles);
      N.off("theme:change", this._load);
      N.off("theme:change", this._themeScopedListener);
    },
    _getHostInstance: function _getHostInstance(instance) {
      return instance ? this.$options.hostName ? instance.$.type.name === this.$options.hostName ? instance : this._getHostInstance(instance.$parentInstance) : instance.$parentInstance : void 0;
    },
    _getPropValue: function _getPropValue(name) {
      var _this$_getHostInstanc;
      return this[name] || ((_this$_getHostInstanc = this._getHostInstance(this)) === null || _this$_getHostInstanc === void 0 ? void 0 : _this$_getHostInstanc[name]);
    },
    _getOptionValue: function _getOptionValue(options) {
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return F$1(options, key, params);
    },
    _getPTValue: function _getPTValue() {
      var _this$$primevueConfig2;
      var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var searchInDefaultPT = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
      var searchOut = /./g.test(key) && !!params[key.split(".")[0]];
      var _ref6 = this._getPropValue("ptOptions") || ((_this$$primevueConfig2 = this.$primevueConfig) === null || _this$$primevueConfig2 === void 0 ? void 0 : _this$$primevueConfig2.ptOptions) || {}, _ref6$mergeSections = _ref6.mergeSections, mergeSections = _ref6$mergeSections === void 0 ? true : _ref6$mergeSections, _ref6$mergeProps = _ref6.mergeProps, useMergeProps = _ref6$mergeProps === void 0 ? false : _ref6$mergeProps;
      var global = searchInDefaultPT ? searchOut ? this._useGlobalPT(this._getPTClassValue, key, params) : this._useDefaultPT(this._getPTClassValue, key, params) : void 0;
      var self = searchOut ? void 0 : this._getPTSelf(obj, this._getPTClassValue, key, _objectSpread$3(_objectSpread$3({}, params), {}, {
        global: global || {}
      }));
      var datasets = this._getPTDatasets(key);
      return mergeSections || !mergeSections && self ? useMergeProps ? this._mergeProps(useMergeProps, global, self, datasets) : _objectSpread$3(_objectSpread$3(_objectSpread$3({}, global), self), datasets) : _objectSpread$3(_objectSpread$3({}, self), datasets);
    },
    _getPTSelf: function _getPTSelf() {
      var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      return mergeProps(
        this._usePT.apply(this, [this._getPT(obj, this.$name)].concat(args)),
        // Exp; <component :pt="{}"
        this._usePT.apply(this, [this.$_attrsPT].concat(args))
        // Exp; <component :pt:[passthrough_key]:[attribute]="{value}" or <component :pt:[passthrough_key]="() =>{value}"
      );
    },
    _getPTDatasets: function _getPTDatasets() {
      var _this$pt4, _this$pt5;
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var datasetPrefix = "data-pc-";
      var isExtended = key === "root" && s$1((_this$pt4 = this.pt) === null || _this$pt4 === void 0 ? void 0 : _this$pt4["data-pc-section"]);
      return key !== "transition" && _objectSpread$3(_objectSpread$3({}, key === "root" && _objectSpread$3(_objectSpread$3(_defineProperty$8({}, "".concat(datasetPrefix, "name"), g$1(isExtended ? (_this$pt5 = this.pt) === null || _this$pt5 === void 0 ? void 0 : _this$pt5["data-pc-section"] : this.$.type.name)), isExtended && _defineProperty$8({}, "".concat(datasetPrefix, "extend"), g$1(this.$.type.name))), {}, _defineProperty$8({}, "".concat(this.$attrSelector), ""))), {}, _defineProperty$8({}, "".concat(datasetPrefix, "section"), g$1(key)));
    },
    _getPTClassValue: function _getPTClassValue() {
      var value = this._getOptionValue.apply(this, arguments);
      return a(value) || C$1(value) ? {
        "class": value
      } : value;
    },
    _getPT: function _getPT(pt) {
      var _this2 = this;
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var callback = arguments.length > 2 ? arguments[2] : void 0;
      var getValue = function getValue2(value) {
        var _ref8;
        var checkSameKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        var computedValue = callback ? callback(value) : value;
        var _key = g$1(key);
        var _cKey = g$1(_this2.$name);
        return (_ref8 = checkSameKey ? _key !== _cKey ? computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key] : void 0 : computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key]) !== null && _ref8 !== void 0 ? _ref8 : computedValue;
      };
      return pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept") ? {
        _usept: pt["_usept"],
        originalValue: getValue(pt.originalValue),
        value: getValue(pt.value)
      } : getValue(pt, true);
    },
    _usePT: function _usePT(pt, callback, key, params) {
      var fn = function fn2(value2) {
        return callback(value2, key, params);
      };
      if (pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept")) {
        var _this$$primevueConfig3;
        var _ref9 = pt["_usept"] || ((_this$$primevueConfig3 = this.$primevueConfig) === null || _this$$primevueConfig3 === void 0 ? void 0 : _this$$primevueConfig3.ptOptions) || {}, _ref9$mergeSections = _ref9.mergeSections, mergeSections = _ref9$mergeSections === void 0 ? true : _ref9$mergeSections, _ref9$mergeProps = _ref9.mergeProps, useMergeProps = _ref9$mergeProps === void 0 ? false : _ref9$mergeProps;
        var originalValue = fn(pt.originalValue);
        var value = fn(pt.value);
        if (originalValue === void 0 && value === void 0) return void 0;
        else if (a(value)) return value;
        else if (a(originalValue)) return originalValue;
        return mergeSections || !mergeSections && value ? useMergeProps ? this._mergeProps(useMergeProps, originalValue, value) : _objectSpread$3(_objectSpread$3({}, originalValue), value) : value;
      }
      return fn(pt);
    },
    _useGlobalPT: function _useGlobalPT(callback, key, params) {
      return this._usePT(this.globalPT, callback, key, params);
    },
    _useDefaultPT: function _useDefaultPT(callback, key, params) {
      return this._usePT(this.defaultPT, callback, key, params);
    },
    ptm: function ptm() {
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this._getPTValue(this.pt, key, _objectSpread$3(_objectSpread$3({}, this.$params), params));
    },
    ptmi: function ptmi() {
      var _attrs$id;
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var attrs2 = mergeProps(this.$_attrsWithoutPT, this.ptm(key, params));
      (attrs2 === null || attrs2 === void 0 ? void 0 : attrs2.hasOwnProperty("id")) && ((_attrs$id = attrs2.id) !== null && _attrs$id !== void 0 ? _attrs$id : attrs2.id = this.$id);
      return attrs2;
    },
    ptmo: function ptmo() {
      var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return this._getPTValue(obj, key, _objectSpread$3({
        instance: this
      }, params), false);
    },
    cx: function cx() {
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return !this.isUnstyled ? this._getOptionValue(this.$style.classes, key, _objectSpread$3(_objectSpread$3({}, this.$params), params)) : void 0;
    },
    sx: function sx() {
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var when = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      if (when) {
        var self = this._getOptionValue(this.$style.inlineStyles, key, _objectSpread$3(_objectSpread$3({}, this.$params), params));
        var base = this._getOptionValue(BaseComponentStyle.inlineStyles, key, _objectSpread$3(_objectSpread$3({}, this.$params), params));
        return [base, self];
      }
      return void 0;
    }
  },
  computed: {
    globalPT: function globalPT() {
      var _this$$primevueConfig4, _this3 = this;
      return this._getPT((_this$$primevueConfig4 = this.$primevueConfig) === null || _this$$primevueConfig4 === void 0 ? void 0 : _this$$primevueConfig4.pt, void 0, function(value) {
        return m(value, {
          instance: _this3
        });
      });
    },
    defaultPT: function defaultPT() {
      var _this$$primevueConfig5, _this4 = this;
      return this._getPT((_this$$primevueConfig5 = this.$primevueConfig) === null || _this$$primevueConfig5 === void 0 ? void 0 : _this$$primevueConfig5.pt, void 0, function(value) {
        return _this4._getOptionValue(value, _this4.$name, _objectSpread$3({}, _this4.$params)) || m(value, _objectSpread$3({}, _this4.$params));
      });
    },
    isUnstyled: function isUnstyled() {
      var _this$$primevueConfig6;
      return this.unstyled !== void 0 ? this.unstyled : (_this$$primevueConfig6 = this.$primevueConfig) === null || _this$$primevueConfig6 === void 0 ? void 0 : _this$$primevueConfig6.unstyled;
    },
    $id: function $id() {
      return this.$attrs.id || this.uid;
    },
    $inProps: function $inProps() {
      var _this$$$vnode;
      var nodePropKeys = Object.keys(((_this$$$vnode = this.$.vnode) === null || _this$$$vnode === void 0 ? void 0 : _this$$$vnode.props) || {});
      return Object.fromEntries(Object.entries(this.$props).filter(function(_ref0) {
        var _ref1 = _slicedToArray$1(_ref0, 1), k2 = _ref1[0];
        return nodePropKeys === null || nodePropKeys === void 0 ? void 0 : nodePropKeys.includes(k2);
      }));
    },
    $theme: function $theme() {
      var _this$$primevueConfig7;
      return (_this$$primevueConfig7 = this.$primevueConfig) === null || _this$$primevueConfig7 === void 0 ? void 0 : _this$$primevueConfig7.theme;
    },
    $style: function $style() {
      return _objectSpread$3(_objectSpread$3({
        classes: void 0,
        inlineStyles: void 0,
        load: function load2() {
        },
        loadCSS: function loadCSS2() {
        },
        loadStyle: function loadStyle2() {
        }
      }, (this._getHostInstance(this) || {}).$style), this.$options.style);
    },
    $styleOptions: function $styleOptions() {
      var _this$$primevueConfig8;
      return {
        nonce: (_this$$primevueConfig8 = this.$primevueConfig) === null || _this$$primevueConfig8 === void 0 || (_this$$primevueConfig8 = _this$$primevueConfig8.csp) === null || _this$$primevueConfig8 === void 0 ? void 0 : _this$$primevueConfig8.nonce
      };
    },
    $primevueConfig: function $primevueConfig() {
      var _this$$primevue4;
      return (_this$$primevue4 = this.$primevue) === null || _this$$primevue4 === void 0 ? void 0 : _this$$primevue4.config;
    },
    $name: function $name() {
      return this.$options.hostName || this.$.type.name;
    },
    $params: function $params() {
      var parentInstance = this._getHostInstance(this) || this.$parent;
      return {
        instance: this,
        props: this.$props,
        state: this.$data,
        attrs: this.$attrs,
        parent: {
          instance: parentInstance,
          props: parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$props,
          state: parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$data,
          attrs: parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$attrs
        }
      };
    },
    $_attrsPT: function $_attrsPT() {
      return Object.entries(this.$attrs || {}).filter(function(_ref10) {
        var _ref11 = _slicedToArray$1(_ref10, 1), key = _ref11[0];
        return key === null || key === void 0 ? void 0 : key.startsWith("pt:");
      }).reduce(function(result, _ref12) {
        var _ref13 = _slicedToArray$1(_ref12, 2), key = _ref13[0], value = _ref13[1];
        var _key$split = key.split(":"), _key$split2 = _toArray(_key$split), rest = _arrayLikeToArray$4(_key$split2).slice(1);
        rest === null || rest === void 0 || rest.reduce(function(currentObj, nestedKey, index, array) {
          !currentObj[nestedKey] && (currentObj[nestedKey] = index === array.length - 1 ? value : {});
          return currentObj[nestedKey];
        }, result);
        return result;
      }, {});
    },
    $_attrsWithoutPT: function $_attrsWithoutPT() {
      return Object.entries(this.$attrs || {}).filter(function(_ref14) {
        var _ref15 = _slicedToArray$1(_ref14, 1), key = _ref15[0];
        return !(key !== null && key !== void 0 && key.startsWith("pt:"));
      }).reduce(function(acc, _ref16) {
        var _ref17 = _slicedToArray$1(_ref16, 2), key = _ref17[0], value = _ref17[1];
        acc[key] = value;
        return acc;
      }, {});
    }
  }
};
var css2 = "\n.p-icon {\n    display: inline-block;\n    vertical-align: baseline;\n    flex-shrink: 0;\n}\n\n.p-icon-spin {\n    -webkit-animation: p-icon-spin 2s infinite linear;\n    animation: p-icon-spin 2s infinite linear;\n}\n\n@-webkit-keyframes p-icon-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n\n@keyframes p-icon-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n";
var BaseIconStyle = BaseStyle.extend({
  name: "baseicon",
  css: css2
});
function _typeof$7(o) {
  "@babel/helpers - typeof";
  return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$7(o);
}
function ownKeys$2(e, r) {
  var t2 = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t2 = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t2), true).forEach(function(r2) {
      _defineProperty$7(e, r2, t2[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t2)) : ownKeys$2(Object(t2)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t2, r2));
    });
  }
  return e;
}
function _defineProperty$7(e, r, t2) {
  return (r = _toPropertyKey$7(r)) in e ? Object.defineProperty(e, r, { value: t2, enumerable: true, configurable: true, writable: true }) : e[r] = t2, e;
}
function _toPropertyKey$7(t2) {
  var i2 = _toPrimitive$7(t2, "string");
  return "symbol" == _typeof$7(i2) ? i2 : i2 + "";
}
function _toPrimitive$7(t2, r) {
  if ("object" != _typeof$7(t2) || !t2) return t2;
  var e = t2[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i2 = e.call(t2, r);
    if ("object" != _typeof$7(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t2);
}
var script$7 = {
  name: "BaseIcon",
  "extends": script$8,
  props: {
    label: {
      type: String,
      "default": void 0
    },
    spin: {
      type: Boolean,
      "default": false
    }
  },
  style: BaseIconStyle,
  provide: function provide() {
    return {
      $pcIcon: this,
      $parentInstance: this
    };
  },
  methods: {
    pti: function pti() {
      var isLabelEmpty = l(this.label);
      return _objectSpread$2(_objectSpread$2({}, !this.isUnstyled && {
        "class": ["p-icon", {
          "p-icon-spin": this.spin
        }]
      }), {}, {
        role: !isLabelEmpty ? "img" : void 0,
        "aria-label": !isLabelEmpty ? this.label : void 0,
        "aria-hidden": isLabelEmpty
      });
    }
  }
};
var script$6 = {
  name: "TimesIcon",
  "extends": script$7
};
function _toConsumableArray$2(r) {
  return _arrayWithoutHoles$2(r) || _iterableToArray$2(r) || _unsupportedIterableToArray$3(r) || _nonIterableSpread$2();
}
function _nonIterableSpread$2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$3(r, a2);
    var t2 = {}.toString.call(r).slice(8, -1);
    return "Object" === t2 && r.constructor && (t2 = r.constructor.name), "Map" === t2 || "Set" === t2 ? Array.from(r) : "Arguments" === t2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t2) ? _arrayLikeToArray$3(r, a2) : void 0;
  }
}
function _iterableToArray$2(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles$2(r) {
  if (Array.isArray(r)) return _arrayLikeToArray$3(r);
}
function _arrayLikeToArray$3(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _toConsumableArray$2(_cache[0] || (_cache[0] = [createElementVNode("path", {
    d: "M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z",
    fill: "currentColor"
  }, null, -1)])), 16);
}
script$6.render = render$5;
var script$5 = {
  name: "SpinnerIcon",
  "extends": script$7
};
function _toConsumableArray$1(r) {
  return _arrayWithoutHoles$1(r) || _iterableToArray$1(r) || _unsupportedIterableToArray$2(r) || _nonIterableSpread$1();
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$2(r, a2);
    var t2 = {}.toString.call(r).slice(8, -1);
    return "Object" === t2 && r.constructor && (t2 = r.constructor.name), "Map" === t2 || "Set" === t2 ? Array.from(r) : "Arguments" === t2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t2) ? _arrayLikeToArray$2(r, a2) : void 0;
  }
}
function _iterableToArray$1(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles$1(r) {
  if (Array.isArray(r)) return _arrayLikeToArray$2(r);
}
function _arrayLikeToArray$2(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _toConsumableArray$1(_cache[0] || (_cache[0] = [createElementVNode("path", {
    d: "M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z",
    fill: "currentColor"
  }, null, -1)])), 16);
}
script$5.render = render$4;
var style$3 = "\n    .p-badge {\n        display: inline-flex;\n        border-radius: dt('badge.border.radius');\n        align-items: center;\n        justify-content: center;\n        padding: dt('badge.padding');\n        background: dt('badge.primary.background');\n        color: dt('badge.primary.color');\n        font-size: dt('badge.font.size');\n        font-weight: dt('badge.font.weight');\n        min-width: dt('badge.min.width');\n        height: dt('badge.height');\n    }\n\n    .p-badge-dot {\n        width: dt('badge.dot.size');\n        min-width: dt('badge.dot.size');\n        height: dt('badge.dot.size');\n        border-radius: 50%;\n        padding: 0;\n    }\n\n    .p-badge-circle {\n        padding: 0;\n        border-radius: 50%;\n    }\n\n    .p-badge-secondary {\n        background: dt('badge.secondary.background');\n        color: dt('badge.secondary.color');\n    }\n\n    .p-badge-success {\n        background: dt('badge.success.background');\n        color: dt('badge.success.color');\n    }\n\n    .p-badge-info {\n        background: dt('badge.info.background');\n        color: dt('badge.info.color');\n    }\n\n    .p-badge-warn {\n        background: dt('badge.warn.background');\n        color: dt('badge.warn.color');\n    }\n\n    .p-badge-danger {\n        background: dt('badge.danger.background');\n        color: dt('badge.danger.color');\n    }\n\n    .p-badge-contrast {\n        background: dt('badge.contrast.background');\n        color: dt('badge.contrast.color');\n    }\n\n    .p-badge-sm {\n        font-size: dt('badge.sm.font.size');\n        min-width: dt('badge.sm.min.width');\n        height: dt('badge.sm.height');\n    }\n\n    .p-badge-lg {\n        font-size: dt('badge.lg.font.size');\n        min-width: dt('badge.lg.min.width');\n        height: dt('badge.lg.height');\n    }\n\n    .p-badge-xl {\n        font-size: dt('badge.xl.font.size');\n        min-width: dt('badge.xl.min.width');\n        height: dt('badge.xl.height');\n    }\n";
var classes$3 = {
  root: function root(_ref) {
    var props = _ref.props, instance = _ref.instance;
    return ["p-badge p-component", {
      "p-badge-circle": s$1(props.value) && String(props.value).length === 1,
      "p-badge-dot": l(props.value) && !instance.$slots["default"],
      "p-badge-sm": props.size === "small",
      "p-badge-lg": props.size === "large",
      "p-badge-xl": props.size === "xlarge",
      "p-badge-info": props.severity === "info",
      "p-badge-success": props.severity === "success",
      "p-badge-warn": props.severity === "warn",
      "p-badge-danger": props.severity === "danger",
      "p-badge-secondary": props.severity === "secondary",
      "p-badge-contrast": props.severity === "contrast"
    }];
  }
};
var BadgeStyle = BaseStyle.extend({
  name: "badge",
  style: style$3,
  classes: classes$3
});
var script$1$2 = {
  name: "BaseBadge",
  "extends": script$8,
  props: {
    value: {
      type: [String, Number],
      "default": null
    },
    severity: {
      type: String,
      "default": null
    },
    size: {
      type: String,
      "default": null
    }
  },
  style: BadgeStyle,
  provide: function provide2() {
    return {
      $pcBadge: this,
      $parentInstance: this
    };
  }
};
function _typeof$6(o) {
  "@babel/helpers - typeof";
  return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$6(o);
}
function _defineProperty$6(e, r, t2) {
  return (r = _toPropertyKey$6(r)) in e ? Object.defineProperty(e, r, { value: t2, enumerable: true, configurable: true, writable: true }) : e[r] = t2, e;
}
function _toPropertyKey$6(t2) {
  var i2 = _toPrimitive$6(t2, "string");
  return "symbol" == _typeof$6(i2) ? i2 : i2 + "";
}
function _toPrimitive$6(t2, r) {
  if ("object" != _typeof$6(t2) || !t2) return t2;
  var e = t2[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i2 = e.call(t2, r);
    if ("object" != _typeof$6(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t2);
}
var script$4 = {
  name: "Badge",
  "extends": script$1$2,
  inheritAttrs: false,
  computed: {
    dataP: function dataP() {
      return f(_defineProperty$6(_defineProperty$6({
        circle: this.value != null && String(this.value).length === 1,
        empty: this.value == null && !this.$slots["default"]
      }, this.severity, this.severity), this.size, this.size));
    }
  }
};
var _hoisted_1$e = ["data-p"];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps({
    "class": _ctx.cx("root"),
    "data-p": $options.dataP
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default", {}, function() {
    return [createTextVNode(toDisplayString(_ctx.value), 1)];
  })], 16, _hoisted_1$e);
}
script$4.render = render$3;
var PrimeVueService = s$2();
function _typeof$5(o) {
  "@babel/helpers - typeof";
  return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$5(o);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$1(r, a2);
    var t2 = {}.toString.call(r).slice(8, -1);
    return "Object" === t2 && r.constructor && (t2 = r.constructor.name), "Map" === t2 || "Set" === t2 ? Array.from(r) : "Arguments" === t2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t2) ? _arrayLikeToArray$1(r, a2) : void 0;
  }
}
function _arrayLikeToArray$1(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l2) {
  var t2 = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t2) {
    var e, n, i2, u, a2 = [], f2 = true, o = false;
    try {
      if (i2 = (t2 = t2.call(r)).next, 0 === l2) ;
      else for (; !(f2 = (e = i2.call(t2)).done) && (a2.push(e.value), a2.length !== l2); f2 = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f2 && null != t2["return"] && (u = t2["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function ownKeys$1(e, r) {
  var t2 = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t2 = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t2), true).forEach(function(r2) {
      _defineProperty$5(e, r2, t2[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t2)) : ownKeys$1(Object(t2)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t2, r2));
    });
  }
  return e;
}
function _defineProperty$5(e, r, t2) {
  return (r = _toPropertyKey$5(r)) in e ? Object.defineProperty(e, r, { value: t2, enumerable: true, configurable: true, writable: true }) : e[r] = t2, e;
}
function _toPropertyKey$5(t2) {
  var i2 = _toPrimitive$5(t2, "string");
  return "symbol" == _typeof$5(i2) ? i2 : i2 + "";
}
function _toPrimitive$5(t2, r) {
  if ("object" != _typeof$5(t2) || !t2) return t2;
  var e = t2[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i2 = e.call(t2, r);
    if ("object" != _typeof$5(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t2);
}
var BaseDirective = {
  _getMeta: function _getMeta() {
    return [i(arguments.length <= 0 ? void 0 : arguments[0]) ? void 0 : arguments.length <= 0 ? void 0 : arguments[0], m(i(arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 0 ? void 0 : arguments[0] : arguments.length <= 1 ? void 0 : arguments[1])];
  },
  _getConfig: function _getConfig(binding, vnode) {
    var _ref, _binding$instance, _vnode$ctx;
    return (_ref = (binding === null || binding === void 0 || (_binding$instance = binding.instance) === null || _binding$instance === void 0 ? void 0 : _binding$instance.$primevue) || (vnode === null || vnode === void 0 || (_vnode$ctx = vnode.ctx) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.appContext) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.config) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.globalProperties) === null || _vnode$ctx === void 0 ? void 0 : _vnode$ctx.$primevue)) === null || _ref === void 0 ? void 0 : _ref.config;
  },
  _getOptionValue: F$1,
  _getPTValue: function _getPTValue2() {
    var _instance$binding, _instance$$primevueCo;
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var obj = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var key = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
    var params = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    var searchInDefaultPT = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true;
    var getValue = function getValue2() {
      var value = BaseDirective._getOptionValue.apply(BaseDirective, arguments);
      return a(value) || C$1(value) ? {
        "class": value
      } : value;
    };
    var _ref2 = ((_instance$binding = instance.binding) === null || _instance$binding === void 0 || (_instance$binding = _instance$binding.value) === null || _instance$binding === void 0 ? void 0 : _instance$binding.ptOptions) || ((_instance$$primevueCo = instance.$primevueConfig) === null || _instance$$primevueCo === void 0 ? void 0 : _instance$$primevueCo.ptOptions) || {}, _ref2$mergeSections = _ref2.mergeSections, mergeSections = _ref2$mergeSections === void 0 ? true : _ref2$mergeSections, _ref2$mergeProps = _ref2.mergeProps, useMergeProps = _ref2$mergeProps === void 0 ? false : _ref2$mergeProps;
    var global = searchInDefaultPT ? BaseDirective._useDefaultPT(instance, instance.defaultPT(), getValue, key, params) : void 0;
    var self = BaseDirective._usePT(instance, BaseDirective._getPT(obj, instance.$name), getValue, key, _objectSpread$1(_objectSpread$1({}, params), {}, {
      global: global || {}
    }));
    var datasets = BaseDirective._getPTDatasets(instance, key);
    return mergeSections || !mergeSections && self ? useMergeProps ? BaseDirective._mergeProps(instance, useMergeProps, global, self, datasets) : _objectSpread$1(_objectSpread$1(_objectSpread$1({}, global), self), datasets) : _objectSpread$1(_objectSpread$1({}, self), datasets);
  },
  _getPTDatasets: function _getPTDatasets2() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var datasetPrefix = "data-pc-";
    return _objectSpread$1(_objectSpread$1({}, key === "root" && _defineProperty$5({}, "".concat(datasetPrefix, "name"), g$1(instance.$name))), {}, _defineProperty$5({}, "".concat(datasetPrefix, "section"), g$1(key)));
  },
  _getPT: function _getPT2(pt) {
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var getValue = function getValue2(value) {
      var _computedValue$_key;
      var computedValue = callback ? callback(value) : value;
      var _key = g$1(key);
      return (_computedValue$_key = computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key]) !== null && _computedValue$_key !== void 0 ? _computedValue$_key : computedValue;
    };
    return pt && Object.hasOwn(pt, "_usept") ? {
      _usept: pt["_usept"],
      originalValue: getValue(pt.originalValue),
      value: getValue(pt.value)
    } : getValue(pt);
  },
  _usePT: function _usePT2() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var pt = arguments.length > 1 ? arguments[1] : void 0;
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var key = arguments.length > 3 ? arguments[3] : void 0;
    var params = arguments.length > 4 ? arguments[4] : void 0;
    var fn = function fn2(value2) {
      return callback(value2, key, params);
    };
    if (pt && Object.hasOwn(pt, "_usept")) {
      var _instance$$primevueCo2;
      var _ref4 = pt["_usept"] || ((_instance$$primevueCo2 = instance.$primevueConfig) === null || _instance$$primevueCo2 === void 0 ? void 0 : _instance$$primevueCo2.ptOptions) || {}, _ref4$mergeSections = _ref4.mergeSections, mergeSections = _ref4$mergeSections === void 0 ? true : _ref4$mergeSections, _ref4$mergeProps = _ref4.mergeProps, useMergeProps = _ref4$mergeProps === void 0 ? false : _ref4$mergeProps;
      var originalValue = fn(pt.originalValue);
      var value = fn(pt.value);
      if (originalValue === void 0 && value === void 0) return void 0;
      else if (a(value)) return value;
      else if (a(originalValue)) return originalValue;
      return mergeSections || !mergeSections && value ? useMergeProps ? BaseDirective._mergeProps(instance, useMergeProps, originalValue, value) : _objectSpread$1(_objectSpread$1({}, originalValue), value) : value;
    }
    return fn(pt);
  },
  _useDefaultPT: function _useDefaultPT2() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var defaultPT2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var key = arguments.length > 3 ? arguments[3] : void 0;
    var params = arguments.length > 4 ? arguments[4] : void 0;
    return BaseDirective._usePT(instance, defaultPT2, callback, key, params);
  },
  _loadStyles: function _loadStyles2() {
    var _config$csp;
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var binding = arguments.length > 1 ? arguments[1] : void 0;
    var vnode = arguments.length > 2 ? arguments[2] : void 0;
    var config = BaseDirective._getConfig(binding, vnode);
    var useStyleOptions = {
      nonce: config === null || config === void 0 || (_config$csp = config.csp) === null || _config$csp === void 0 ? void 0 : _config$csp.nonce
    };
    BaseDirective._loadCoreStyles(instance, useStyleOptions);
    BaseDirective._loadThemeStyles(instance, useStyleOptions);
    BaseDirective._loadScopedThemeStyles(instance, useStyleOptions);
    BaseDirective._removeThemeListeners(instance);
    instance.$loadStyles = function() {
      return BaseDirective._loadThemeStyles(instance, useStyleOptions);
    };
    BaseDirective._themeChangeListener(instance.$loadStyles);
  },
  _loadCoreStyles: function _loadCoreStyles2() {
    var _instance$$style, _instance$$style2;
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var useStyleOptions = arguments.length > 1 ? arguments[1] : void 0;
    if (!Base.isStyleNameLoaded((_instance$$style = instance.$style) === null || _instance$$style === void 0 ? void 0 : _instance$$style.name) && (_instance$$style2 = instance.$style) !== null && _instance$$style2 !== void 0 && _instance$$style2.name) {
      var _instance$$style3;
      BaseStyle.loadCSS(useStyleOptions);
      (_instance$$style3 = instance.$style) === null || _instance$$style3 === void 0 || _instance$$style3.loadCSS(useStyleOptions);
      Base.setLoadedStyleName(instance.$style.name);
    }
  },
  _loadThemeStyles: function _loadThemeStyles2() {
    var _instance$theme, _instance$$style5, _instance$$style6;
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var useStyleOptions = arguments.length > 1 ? arguments[1] : void 0;
    if (instance !== null && instance !== void 0 && instance.isUnstyled() || (instance === null || instance === void 0 || (_instance$theme = instance.theme) === null || _instance$theme === void 0 ? void 0 : _instance$theme.call(instance)) === "none") return;
    if (!S.isStyleNameLoaded("common")) {
      var _instance$$style4, _instance$$style4$get;
      var _ref5 = ((_instance$$style4 = instance.$style) === null || _instance$$style4 === void 0 || (_instance$$style4$get = _instance$$style4.getCommonTheme) === null || _instance$$style4$get === void 0 ? void 0 : _instance$$style4$get.call(_instance$$style4)) || {}, primitive = _ref5.primitive, semantic = _ref5.semantic, global = _ref5.global, style2 = _ref5.style;
      BaseStyle.load(primitive === null || primitive === void 0 ? void 0 : primitive.css, _objectSpread$1({
        name: "primitive-variables"
      }, useStyleOptions));
      BaseStyle.load(semantic === null || semantic === void 0 ? void 0 : semantic.css, _objectSpread$1({
        name: "semantic-variables"
      }, useStyleOptions));
      BaseStyle.load(global === null || global === void 0 ? void 0 : global.css, _objectSpread$1({
        name: "global-variables"
      }, useStyleOptions));
      BaseStyle.loadStyle(_objectSpread$1({
        name: "global-style"
      }, useStyleOptions), style2);
      S.setLoadedStyleName("common");
    }
    if (!S.isStyleNameLoaded((_instance$$style5 = instance.$style) === null || _instance$$style5 === void 0 ? void 0 : _instance$$style5.name) && (_instance$$style6 = instance.$style) !== null && _instance$$style6 !== void 0 && _instance$$style6.name) {
      var _instance$$style7, _instance$$style7$get, _instance$$style8, _instance$$style9;
      var _ref6 = ((_instance$$style7 = instance.$style) === null || _instance$$style7 === void 0 || (_instance$$style7$get = _instance$$style7.getDirectiveTheme) === null || _instance$$style7$get === void 0 ? void 0 : _instance$$style7$get.call(_instance$$style7)) || {}, css3 = _ref6.css, _style = _ref6.style;
      (_instance$$style8 = instance.$style) === null || _instance$$style8 === void 0 || _instance$$style8.load(css3, _objectSpread$1({
        name: "".concat(instance.$style.name, "-variables")
      }, useStyleOptions));
      (_instance$$style9 = instance.$style) === null || _instance$$style9 === void 0 || _instance$$style9.loadStyle(_objectSpread$1({
        name: "".concat(instance.$style.name, "-style")
      }, useStyleOptions), _style);
      S.setLoadedStyleName(instance.$style.name);
    }
    if (!S.isStyleNameLoaded("layer-order")) {
      var _instance$$style0, _instance$$style0$get;
      var layerOrder = (_instance$$style0 = instance.$style) === null || _instance$$style0 === void 0 || (_instance$$style0$get = _instance$$style0.getLayerOrderThemeCSS) === null || _instance$$style0$get === void 0 ? void 0 : _instance$$style0$get.call(_instance$$style0);
      BaseStyle.load(layerOrder, _objectSpread$1({
        name: "layer-order",
        first: true
      }, useStyleOptions));
      S.setLoadedStyleName("layer-order");
    }
  },
  _loadScopedThemeStyles: function _loadScopedThemeStyles2() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var useStyleOptions = arguments.length > 1 ? arguments[1] : void 0;
    var preset = instance.preset();
    if (preset && instance.$attrSelector) {
      var _instance$$style1, _instance$$style1$get, _instance$$style10;
      var _ref7 = ((_instance$$style1 = instance.$style) === null || _instance$$style1 === void 0 || (_instance$$style1$get = _instance$$style1.getPresetTheme) === null || _instance$$style1$get === void 0 ? void 0 : _instance$$style1$get.call(_instance$$style1, preset, "[".concat(instance.$attrSelector, "]"))) || {}, css3 = _ref7.css;
      var scopedStyle = (_instance$$style10 = instance.$style) === null || _instance$$style10 === void 0 ? void 0 : _instance$$style10.load(css3, _objectSpread$1({
        name: "".concat(instance.$attrSelector, "-").concat(instance.$style.name)
      }, useStyleOptions));
      instance.scopedStyleEl = scopedStyle.el;
    }
  },
  _themeChangeListener: function _themeChangeListener2() {
    var callback = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function() {
    };
    Base.clearLoadedStyleNames();
    N.on("theme:change", callback);
  },
  _removeThemeListeners: function _removeThemeListeners2() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    N.off("theme:change", instance.$loadStyles);
    instance.$loadStyles = void 0;
  },
  _hook: function _hook2(directiveName, hookName, el, binding, vnode, prevVnode) {
    var _binding$value, _config$pt;
    var name = "on".concat(ne$1(hookName));
    var config = BaseDirective._getConfig(binding, vnode);
    var instance = el === null || el === void 0 ? void 0 : el.$instance;
    var selfHook = BaseDirective._usePT(instance, BaseDirective._getPT(binding === null || binding === void 0 || (_binding$value = binding.value) === null || _binding$value === void 0 ? void 0 : _binding$value.pt, directiveName), BaseDirective._getOptionValue, "hooks.".concat(name));
    var defaultHook = BaseDirective._useDefaultPT(instance, config === null || config === void 0 || (_config$pt = config.pt) === null || _config$pt === void 0 || (_config$pt = _config$pt.directives) === null || _config$pt === void 0 ? void 0 : _config$pt[directiveName], BaseDirective._getOptionValue, "hooks.".concat(name));
    var options = {
      el,
      binding,
      vnode,
      prevVnode
    };
    selfHook === null || selfHook === void 0 || selfHook(instance, options);
    defaultHook === null || defaultHook === void 0 || defaultHook(instance, options);
  },
  /* eslint-disable-next-line no-unused-vars */
  _mergeProps: function _mergeProps2() {
    var fn = arguments.length > 1 ? arguments[1] : void 0;
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }
    return c(fn) ? fn.apply(void 0, args) : mergeProps.apply(void 0, args);
  },
  _extend: function _extend(name) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var handleHook = function handleHook2(hook, el, binding, vnode, prevVnode) {
      var _el$$pd, _el$$instance$hook, _el$$instance, _el$$pd2;
      el._$instances = el._$instances || {};
      var config = BaseDirective._getConfig(binding, vnode);
      var $prevInstance = el._$instances[name] || {};
      var $options = l($prevInstance) ? _objectSpread$1(_objectSpread$1({}, options), options === null || options === void 0 ? void 0 : options.methods) : {};
      el._$instances[name] = _objectSpread$1(_objectSpread$1({}, $prevInstance), {}, {
        /* new instance variables to pass in directive methods */
        $name: name,
        $host: el,
        $binding: binding,
        $modifiers: binding === null || binding === void 0 ? void 0 : binding.modifiers,
        $value: binding === null || binding === void 0 ? void 0 : binding.value,
        $el: $prevInstance["$el"] || el || void 0,
        $style: _objectSpread$1({
          classes: void 0,
          inlineStyles: void 0,
          load: function load2() {
          },
          loadCSS: function loadCSS2() {
          },
          loadStyle: function loadStyle2() {
          }
        }, options === null || options === void 0 ? void 0 : options.style),
        $primevueConfig: config,
        $attrSelector: (_el$$pd = el.$pd) === null || _el$$pd === void 0 || (_el$$pd = _el$$pd[name]) === null || _el$$pd === void 0 ? void 0 : _el$$pd.attrSelector,
        /* computed instance variables */
        defaultPT: function defaultPT2() {
          return BaseDirective._getPT(config === null || config === void 0 ? void 0 : config.pt, void 0, function(value) {
            var _value$directives;
            return value === null || value === void 0 || (_value$directives = value.directives) === null || _value$directives === void 0 ? void 0 : _value$directives[name];
          });
        },
        isUnstyled: function isUnstyled2() {
          var _el$_$instances$name, _el$_$instances$name2;
          return ((_el$_$instances$name = el._$instances[name]) === null || _el$_$instances$name === void 0 || (_el$_$instances$name = _el$_$instances$name.$binding) === null || _el$_$instances$name === void 0 || (_el$_$instances$name = _el$_$instances$name.value) === null || _el$_$instances$name === void 0 ? void 0 : _el$_$instances$name.unstyled) !== void 0 ? (_el$_$instances$name2 = el._$instances[name]) === null || _el$_$instances$name2 === void 0 || (_el$_$instances$name2 = _el$_$instances$name2.$binding) === null || _el$_$instances$name2 === void 0 || (_el$_$instances$name2 = _el$_$instances$name2.value) === null || _el$_$instances$name2 === void 0 ? void 0 : _el$_$instances$name2.unstyled : config === null || config === void 0 ? void 0 : config.unstyled;
        },
        theme: function theme() {
          var _el$_$instances$name3;
          return (_el$_$instances$name3 = el._$instances[name]) === null || _el$_$instances$name3 === void 0 || (_el$_$instances$name3 = _el$_$instances$name3.$primevueConfig) === null || _el$_$instances$name3 === void 0 ? void 0 : _el$_$instances$name3.theme;
        },
        preset: function preset() {
          var _el$_$instances$name4;
          return (_el$_$instances$name4 = el._$instances[name]) === null || _el$_$instances$name4 === void 0 || (_el$_$instances$name4 = _el$_$instances$name4.$binding) === null || _el$_$instances$name4 === void 0 || (_el$_$instances$name4 = _el$_$instances$name4.value) === null || _el$_$instances$name4 === void 0 ? void 0 : _el$_$instances$name4.dt;
        },
        /* instance's methods */
        ptm: function ptm2() {
          var _el$_$instances$name5;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return BaseDirective._getPTValue(el._$instances[name], (_el$_$instances$name5 = el._$instances[name]) === null || _el$_$instances$name5 === void 0 || (_el$_$instances$name5 = _el$_$instances$name5.$binding) === null || _el$_$instances$name5 === void 0 || (_el$_$instances$name5 = _el$_$instances$name5.value) === null || _el$_$instances$name5 === void 0 ? void 0 : _el$_$instances$name5.pt, key, _objectSpread$1({}, params));
        },
        ptmo: function ptmo2() {
          var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
          var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return BaseDirective._getPTValue(el._$instances[name], obj, key, params, false);
        },
        cx: function cx2() {
          var _el$_$instances$name6, _el$_$instances$name7;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return !((_el$_$instances$name6 = el._$instances[name]) !== null && _el$_$instances$name6 !== void 0 && _el$_$instances$name6.isUnstyled()) ? BaseDirective._getOptionValue((_el$_$instances$name7 = el._$instances[name]) === null || _el$_$instances$name7 === void 0 || (_el$_$instances$name7 = _el$_$instances$name7.$style) === null || _el$_$instances$name7 === void 0 ? void 0 : _el$_$instances$name7.classes, key, _objectSpread$1({}, params)) : void 0;
        },
        sx: function sx2() {
          var _el$_$instances$name8;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var when = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return when ? BaseDirective._getOptionValue((_el$_$instances$name8 = el._$instances[name]) === null || _el$_$instances$name8 === void 0 || (_el$_$instances$name8 = _el$_$instances$name8.$style) === null || _el$_$instances$name8 === void 0 ? void 0 : _el$_$instances$name8.inlineStyles, key, _objectSpread$1({}, params)) : void 0;
        }
      }, $options);
      el.$instance = el._$instances[name];
      (_el$$instance$hook = (_el$$instance = el.$instance)[hook]) === null || _el$$instance$hook === void 0 || _el$$instance$hook.call(_el$$instance, el, binding, vnode, prevVnode);
      el["$".concat(name)] = el.$instance;
      BaseDirective._hook(name, hook, el, binding, vnode, prevVnode);
      el.$pd || (el.$pd = {});
      el.$pd[name] = _objectSpread$1(_objectSpread$1({}, (_el$$pd2 = el.$pd) === null || _el$$pd2 === void 0 ? void 0 : _el$$pd2[name]), {}, {
        name,
        instance: el._$instances[name]
      });
    };
    var handleWatchers = function handleWatchers2(el) {
      var _watchers$config2, _watchers$configRipp2, _instance$$primevueCo3;
      var instance = el._$instances[name];
      var watchers = instance === null || instance === void 0 ? void 0 : instance.watch;
      var handleWatchConfig = function handleWatchConfig2(_ref8) {
        var _watchers$config;
        var newValue = _ref8.newValue, oldValue = _ref8.oldValue;
        return watchers === null || watchers === void 0 || (_watchers$config = watchers["config"]) === null || _watchers$config === void 0 ? void 0 : _watchers$config.call(instance, newValue, oldValue);
      };
      var handleWatchConfigRipple = function handleWatchConfigRipple2(_ref9) {
        var _watchers$configRipp;
        var newValue = _ref9.newValue, oldValue = _ref9.oldValue;
        return watchers === null || watchers === void 0 || (_watchers$configRipp = watchers["config.ripple"]) === null || _watchers$configRipp === void 0 ? void 0 : _watchers$configRipp.call(instance, newValue, oldValue);
      };
      instance.$watchersCallback = {
        config: handleWatchConfig,
        "config.ripple": handleWatchConfigRipple
      };
      watchers === null || watchers === void 0 || (_watchers$config2 = watchers["config"]) === null || _watchers$config2 === void 0 || _watchers$config2.call(instance, instance === null || instance === void 0 ? void 0 : instance.$primevueConfig);
      PrimeVueService.on("config:change", handleWatchConfig);
      watchers === null || watchers === void 0 || (_watchers$configRipp2 = watchers["config.ripple"]) === null || _watchers$configRipp2 === void 0 || _watchers$configRipp2.call(instance, instance === null || instance === void 0 || (_instance$$primevueCo3 = instance.$primevueConfig) === null || _instance$$primevueCo3 === void 0 ? void 0 : _instance$$primevueCo3.ripple);
      PrimeVueService.on("config:ripple:change", handleWatchConfigRipple);
    };
    var stopWatchers = function stopWatchers2(el) {
      var watchers = el._$instances[name].$watchersCallback;
      if (watchers) {
        PrimeVueService.off("config:change", watchers.config);
        PrimeVueService.off("config:ripple:change", watchers["config.ripple"]);
        el._$instances[name].$watchersCallback = void 0;
      }
    };
    return {
      created: function created2(el, binding, vnode, prevVnode) {
        el.$pd || (el.$pd = {});
        el.$pd[name] = {
          name,
          attrSelector: s("pd")
        };
        handleHook("created", el, binding, vnode, prevVnode);
      },
      beforeMount: function beforeMount2(el, binding, vnode, prevVnode) {
        var _el$$pd$name;
        BaseDirective._loadStyles((_el$$pd$name = el.$pd[name]) === null || _el$$pd$name === void 0 ? void 0 : _el$$pd$name.instance, binding, vnode);
        handleHook("beforeMount", el, binding, vnode, prevVnode);
        handleWatchers(el);
      },
      mounted: function mounted4(el, binding, vnode, prevVnode) {
        var _el$$pd$name2;
        BaseDirective._loadStyles((_el$$pd$name2 = el.$pd[name]) === null || _el$$pd$name2 === void 0 ? void 0 : _el$$pd$name2.instance, binding, vnode);
        handleHook("mounted", el, binding, vnode, prevVnode);
      },
      beforeUpdate: function beforeUpdate2(el, binding, vnode, prevVnode) {
        handleHook("beforeUpdate", el, binding, vnode, prevVnode);
      },
      updated: function updated4(el, binding, vnode, prevVnode) {
        var _el$$pd$name3;
        BaseDirective._loadStyles((_el$$pd$name3 = el.$pd[name]) === null || _el$$pd$name3 === void 0 ? void 0 : _el$$pd$name3.instance, binding, vnode);
        handleHook("updated", el, binding, vnode, prevVnode);
      },
      beforeUnmount: function beforeUnmount3(el, binding, vnode, prevVnode) {
        var _el$$pd$name4;
        stopWatchers(el);
        BaseDirective._removeThemeListeners((_el$$pd$name4 = el.$pd[name]) === null || _el$$pd$name4 === void 0 ? void 0 : _el$$pd$name4.instance);
        handleHook("beforeUnmount", el, binding, vnode, prevVnode);
      },
      unmounted: function unmounted4(el, binding, vnode, prevVnode) {
        var _el$$pd$name5;
        (_el$$pd$name5 = el.$pd[name]) === null || _el$$pd$name5 === void 0 || (_el$$pd$name5 = _el$$pd$name5.instance) === null || _el$$pd$name5 === void 0 || (_el$$pd$name5 = _el$$pd$name5.scopedStyleEl) === null || _el$$pd$name5 === void 0 || (_el$$pd$name5 = _el$$pd$name5.value) === null || _el$$pd$name5 === void 0 || _el$$pd$name5.remove();
        handleHook("unmounted", el, binding, vnode, prevVnode);
      }
    };
  },
  extend: function extend2() {
    var _BaseDirective$_getMe = BaseDirective._getMeta.apply(BaseDirective, arguments), _BaseDirective$_getMe2 = _slicedToArray(_BaseDirective$_getMe, 2), name = _BaseDirective$_getMe2[0], options = _BaseDirective$_getMe2[1];
    return _objectSpread$1({
      extend: function extend3() {
        var _BaseDirective$_getMe3 = BaseDirective._getMeta.apply(BaseDirective, arguments), _BaseDirective$_getMe4 = _slicedToArray(_BaseDirective$_getMe3, 2), _name = _BaseDirective$_getMe4[0], _options = _BaseDirective$_getMe4[1];
        return BaseDirective.extend(_name, _objectSpread$1(_objectSpread$1(_objectSpread$1({}, options), options === null || options === void 0 ? void 0 : options.methods), _options));
      }
    }, BaseDirective._extend(name, options));
  }
};
var style$2 = "\n    .p-ink {\n        display: block;\n        position: absolute;\n        background: dt('ripple.background');\n        border-radius: 100%;\n        transform: scale(0);\n        pointer-events: none;\n    }\n\n    .p-ink-active {\n        animation: ripple 0.4s linear;\n    }\n\n    @keyframes ripple {\n        100% {\n            opacity: 0;\n            transform: scale(2.5);\n        }\n    }\n";
var classes$2 = {
  root: "p-ink"
};
var RippleStyle = BaseStyle.extend({
  name: "ripple-directive",
  style: style$2,
  classes: classes$2
});
var BaseRipple = BaseDirective.extend({
  style: RippleStyle
});
function _typeof$4(o) {
  "@babel/helpers - typeof";
  return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$4(o);
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a2);
    var t2 = {}.toString.call(r).slice(8, -1);
    return "Object" === t2 && r.constructor && (t2 = r.constructor.name), "Map" === t2 || "Set" === t2 ? Array.from(r) : "Arguments" === t2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t2) ? _arrayLikeToArray(r, a2) : void 0;
  }
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _defineProperty$4(e, r, t2) {
  return (r = _toPropertyKey$4(r)) in e ? Object.defineProperty(e, r, { value: t2, enumerable: true, configurable: true, writable: true }) : e[r] = t2, e;
}
function _toPropertyKey$4(t2) {
  var i2 = _toPrimitive$4(t2, "string");
  return "symbol" == _typeof$4(i2) ? i2 : i2 + "";
}
function _toPrimitive$4(t2, r) {
  if ("object" != _typeof$4(t2) || !t2) return t2;
  var e = t2[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i2 = e.call(t2, r);
    if ("object" != _typeof$4(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t2);
}
var Ripple = BaseRipple.extend("ripple", {
  watch: {
    "config.ripple": function configRipple(newValue) {
      if (newValue) {
        this.createRipple(this.$host);
        this.bindEvents(this.$host);
        this.$host.setAttribute("data-pd-ripple", true);
        this.$host.style["overflow"] = "hidden";
        this.$host.style["position"] = "relative";
      } else {
        this.remove(this.$host);
        this.$host.removeAttribute("data-pd-ripple");
      }
    }
  },
  unmounted: function unmounted2(el) {
    this.remove(el);
  },
  timeout: void 0,
  methods: {
    bindEvents: function bindEvents(el) {
      el.addEventListener("mousedown", this.onMouseDown.bind(this));
    },
    unbindEvents: function unbindEvents(el) {
      el.removeEventListener("mousedown", this.onMouseDown.bind(this));
    },
    createRipple: function createRipple(el) {
      var ink = this.getInk(el);
      if (!ink) {
        ink = U("span", _defineProperty$4(_defineProperty$4({
          role: "presentation",
          "aria-hidden": true,
          "data-p-ink": true,
          "data-p-ink-active": false,
          "class": !this.isUnstyled() && this.cx("root"),
          onAnimationEnd: this.onAnimationEnd.bind(this)
        }, this.$attrSelector, ""), "p-bind", this.ptm("root")));
        el.appendChild(ink);
        this.$el = ink;
      }
    },
    remove: function remove(el) {
      var ink = this.getInk(el);
      if (ink) {
        this.$host.style["overflow"] = "";
        this.$host.style["position"] = "";
        this.unbindEvents(el);
        ink.removeEventListener("animationend", this.onAnimationEnd);
        ink.remove();
      }
    },
    onMouseDown: function onMouseDown(event) {
      var _this = this;
      var target = event.currentTarget;
      var ink = this.getInk(target);
      if (!ink || getComputedStyle(ink, null).display === "none") {
        return;
      }
      !this.isUnstyled() && P(ink, "p-ink-active");
      ink.setAttribute("data-p-ink-active", "false");
      if (!Tt(ink) && !Rt(ink)) {
        var d = Math.max(v$1(target), C$2(target));
        ink.style.height = d + "px";
        ink.style.width = d + "px";
      }
      var offset = K(target);
      var x2 = event.pageX - offset.left + document.body.scrollTop - Rt(ink) / 2;
      var y2 = event.pageY - offset.top + document.body.scrollLeft - Tt(ink) / 2;
      ink.style.top = y2 + "px";
      ink.style.left = x2 + "px";
      !this.isUnstyled() && W(ink, "p-ink-active");
      ink.setAttribute("data-p-ink-active", "true");
      this.timeout = setTimeout(function() {
        if (ink) {
          !_this.isUnstyled() && P(ink, "p-ink-active");
          ink.setAttribute("data-p-ink-active", "false");
        }
      }, 401);
    },
    onAnimationEnd: function onAnimationEnd(event) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      !this.isUnstyled() && P(event.currentTarget, "p-ink-active");
      event.currentTarget.setAttribute("data-p-ink-active", "false");
    },
    getInk: function getInk(el) {
      return el && el.children ? _toConsumableArray(el.children).find(function(child) {
        return Q$1(child, "data-pc-name") === "ripple";
      }) : void 0;
    }
  }
});
var style$1 = `
    .p-button {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        color: dt('button.primary.color');
        background: dt('button.primary.background');
        border: 1px solid dt('button.primary.border.color');
        padding: dt('button.padding.y') dt('button.padding.x');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('button.transition.duration'),
            color dt('button.transition.duration'),
            border-color dt('button.transition.duration'),
            outline-color dt('button.transition.duration'),
            box-shadow dt('button.transition.duration');
        border-radius: dt('button.border.radius');
        outline-color: transparent;
        gap: dt('button.gap');
    }

    .p-button:disabled {
        cursor: default;
    }

    .p-button-icon-right {
        order: 1;
    }

    .p-button-icon-right:dir(rtl) {
        order: -1;
    }

    .p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
        order: 1;
    }

    .p-button-icon-bottom {
        order: 2;
    }

    .p-button-icon-only {
        width: dt('button.icon.only.width');
        padding-inline-start: 0;
        padding-inline-end: 0;
        gap: 0;
    }

    .p-button-icon-only.p-button-rounded {
        border-radius: 50%;
        height: dt('button.icon.only.width');
    }

    .p-button-icon-only .p-button-label {
        visibility: hidden;
        width: 0;
    }

    .p-button-icon-only::after {
        content: " ";
        visibility: hidden;
        width: 0;
    }

    .p-button-sm {
        font-size: dt('button.sm.font.size');
        padding: dt('button.sm.padding.y') dt('button.sm.padding.x');
    }

    .p-button-sm .p-button-icon {
        font-size: dt('button.sm.font.size');
    }

    .p-button-sm.p-button-icon-only {
        width: dt('button.sm.icon.only.width');
    }

    .p-button-sm.p-button-icon-only.p-button-rounded {
        height: dt('button.sm.icon.only.width');
    }

    .p-button-lg {
        font-size: dt('button.lg.font.size');
        padding: dt('button.lg.padding.y') dt('button.lg.padding.x');
    }

    .p-button-lg .p-button-icon {
        font-size: dt('button.lg.font.size');
    }

    .p-button-lg.p-button-icon-only {
        width: dt('button.lg.icon.only.width');
    }

    .p-button-lg.p-button-icon-only.p-button-rounded {
        height: dt('button.lg.icon.only.width');
    }

    .p-button-vertical {
        flex-direction: column;
    }

    .p-button-label {
        font-weight: dt('button.label.font.weight');
    }

    .p-button-fluid {
        width: 100%;
    }

    .p-button-fluid.p-button-icon-only {
        width: dt('button.icon.only.width');
    }

    .p-button:not(:disabled):hover {
        background: dt('button.primary.hover.background');
        border: 1px solid dt('button.primary.hover.border.color');
        color: dt('button.primary.hover.color');
    }

    .p-button:not(:disabled):active {
        background: dt('button.primary.active.background');
        border: 1px solid dt('button.primary.active.border.color');
        color: dt('button.primary.active.color');
    }

    .p-button:focus-visible {
        box-shadow: dt('button.primary.focus.ring.shadow');
        outline: dt('button.focus.ring.width') dt('button.focus.ring.style') dt('button.primary.focus.ring.color');
        outline-offset: dt('button.focus.ring.offset');
    }

    .p-button .p-badge {
        min-width: dt('button.badge.size');
        height: dt('button.badge.size');
        line-height: dt('button.badge.size');
    }

    .p-button-raised {
        box-shadow: dt('button.raised.shadow');
    }

    .p-button-rounded {
        border-radius: dt('button.rounded.border.radius');
    }

    .p-button-secondary {
        background: dt('button.secondary.background');
        border: 1px solid dt('button.secondary.border.color');
        color: dt('button.secondary.color');
    }

    .p-button-secondary:not(:disabled):hover {
        background: dt('button.secondary.hover.background');
        border: 1px solid dt('button.secondary.hover.border.color');
        color: dt('button.secondary.hover.color');
    }

    .p-button-secondary:not(:disabled):active {
        background: dt('button.secondary.active.background');
        border: 1px solid dt('button.secondary.active.border.color');
        color: dt('button.secondary.active.color');
    }

    .p-button-secondary:focus-visible {
        outline-color: dt('button.secondary.focus.ring.color');
        box-shadow: dt('button.secondary.focus.ring.shadow');
    }

    .p-button-success {
        background: dt('button.success.background');
        border: 1px solid dt('button.success.border.color');
        color: dt('button.success.color');
    }

    .p-button-success:not(:disabled):hover {
        background: dt('button.success.hover.background');
        border: 1px solid dt('button.success.hover.border.color');
        color: dt('button.success.hover.color');
    }

    .p-button-success:not(:disabled):active {
        background: dt('button.success.active.background');
        border: 1px solid dt('button.success.active.border.color');
        color: dt('button.success.active.color');
    }

    .p-button-success:focus-visible {
        outline-color: dt('button.success.focus.ring.color');
        box-shadow: dt('button.success.focus.ring.shadow');
    }

    .p-button-info {
        background: dt('button.info.background');
        border: 1px solid dt('button.info.border.color');
        color: dt('button.info.color');
    }

    .p-button-info:not(:disabled):hover {
        background: dt('button.info.hover.background');
        border: 1px solid dt('button.info.hover.border.color');
        color: dt('button.info.hover.color');
    }

    .p-button-info:not(:disabled):active {
        background: dt('button.info.active.background');
        border: 1px solid dt('button.info.active.border.color');
        color: dt('button.info.active.color');
    }

    .p-button-info:focus-visible {
        outline-color: dt('button.info.focus.ring.color');
        box-shadow: dt('button.info.focus.ring.shadow');
    }

    .p-button-warn {
        background: dt('button.warn.background');
        border: 1px solid dt('button.warn.border.color');
        color: dt('button.warn.color');
    }

    .p-button-warn:not(:disabled):hover {
        background: dt('button.warn.hover.background');
        border: 1px solid dt('button.warn.hover.border.color');
        color: dt('button.warn.hover.color');
    }

    .p-button-warn:not(:disabled):active {
        background: dt('button.warn.active.background');
        border: 1px solid dt('button.warn.active.border.color');
        color: dt('button.warn.active.color');
    }

    .p-button-warn:focus-visible {
        outline-color: dt('button.warn.focus.ring.color');
        box-shadow: dt('button.warn.focus.ring.shadow');
    }

    .p-button-help {
        background: dt('button.help.background');
        border: 1px solid dt('button.help.border.color');
        color: dt('button.help.color');
    }

    .p-button-help:not(:disabled):hover {
        background: dt('button.help.hover.background');
        border: 1px solid dt('button.help.hover.border.color');
        color: dt('button.help.hover.color');
    }

    .p-button-help:not(:disabled):active {
        background: dt('button.help.active.background');
        border: 1px solid dt('button.help.active.border.color');
        color: dt('button.help.active.color');
    }

    .p-button-help:focus-visible {
        outline-color: dt('button.help.focus.ring.color');
        box-shadow: dt('button.help.focus.ring.shadow');
    }

    .p-button-danger {
        background: dt('button.danger.background');
        border: 1px solid dt('button.danger.border.color');
        color: dt('button.danger.color');
    }

    .p-button-danger:not(:disabled):hover {
        background: dt('button.danger.hover.background');
        border: 1px solid dt('button.danger.hover.border.color');
        color: dt('button.danger.hover.color');
    }

    .p-button-danger:not(:disabled):active {
        background: dt('button.danger.active.background');
        border: 1px solid dt('button.danger.active.border.color');
        color: dt('button.danger.active.color');
    }

    .p-button-danger:focus-visible {
        outline-color: dt('button.danger.focus.ring.color');
        box-shadow: dt('button.danger.focus.ring.shadow');
    }

    .p-button-contrast {
        background: dt('button.contrast.background');
        border: 1px solid dt('button.contrast.border.color');
        color: dt('button.contrast.color');
    }

    .p-button-contrast:not(:disabled):hover {
        background: dt('button.contrast.hover.background');
        border: 1px solid dt('button.contrast.hover.border.color');
        color: dt('button.contrast.hover.color');
    }

    .p-button-contrast:not(:disabled):active {
        background: dt('button.contrast.active.background');
        border: 1px solid dt('button.contrast.active.border.color');
        color: dt('button.contrast.active.color');
    }

    .p-button-contrast:focus-visible {
        outline-color: dt('button.contrast.focus.ring.color');
        box-shadow: dt('button.contrast.focus.ring.shadow');
    }

    .p-button-outlined {
        background: transparent;
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):hover {
        background: dt('button.outlined.primary.hover.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):active {
        background: dt('button.outlined.primary.active.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined.p-button-secondary {
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):hover {
        background: dt('button.outlined.secondary.hover.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):active {
        background: dt('button.outlined.secondary.active.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-success {
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):hover {
        background: dt('button.outlined.success.hover.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):active {
        background: dt('button.outlined.success.active.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-info {
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):hover {
        background: dt('button.outlined.info.hover.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):active {
        background: dt('button.outlined.info.active.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-warn {
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):hover {
        background: dt('button.outlined.warn.hover.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):active {
        background: dt('button.outlined.warn.active.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-help {
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):hover {
        background: dt('button.outlined.help.hover.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):active {
        background: dt('button.outlined.help.active.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-danger {
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):hover {
        background: dt('button.outlined.danger.hover.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):active {
        background: dt('button.outlined.danger.active.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-contrast {
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):hover {
        background: dt('button.outlined.contrast.hover.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):active {
        background: dt('button.outlined.contrast.active.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-plain {
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):hover {
        background: dt('button.outlined.plain.hover.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):active {
        background: dt('button.outlined.plain.active.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-text {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):hover {
        background: dt('button.text.primary.hover.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):active {
        background: dt('button.text.primary.active.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text.p-button-secondary {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):hover {
        background: dt('button.text.secondary.hover.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):active {
        background: dt('button.text.secondary.active.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-success {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):hover {
        background: dt('button.text.success.hover.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):active {
        background: dt('button.text.success.active.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-info {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):hover {
        background: dt('button.text.info.hover.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):active {
        background: dt('button.text.info.active.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-warn {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):hover {
        background: dt('button.text.warn.hover.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):active {
        background: dt('button.text.warn.active.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-help {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):hover {
        background: dt('button.text.help.hover.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):active {
        background: dt('button.text.help.active.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-danger {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):hover {
        background: dt('button.text.danger.hover.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):active {
        background: dt('button.text.danger.active.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-contrast {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):hover {
        background: dt('button.text.contrast.hover.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):active {
        background: dt('button.text.contrast.active.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-plain {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):hover {
        background: dt('button.text.plain.hover.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):active {
        background: dt('button.text.plain.active.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-link {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.color');
    }

    .p-button-link:not(:disabled):hover {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.hover.color');
    }

    .p-button-link:not(:disabled):hover .p-button-label {
        text-decoration: underline;
    }

    .p-button-link:not(:disabled):active {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.active.color');
    }
`;
function _typeof$3(o) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3(o);
}
function _defineProperty$3(e, r, t2) {
  return (r = _toPropertyKey$3(r)) in e ? Object.defineProperty(e, r, { value: t2, enumerable: true, configurable: true, writable: true }) : e[r] = t2, e;
}
function _toPropertyKey$3(t2) {
  var i2 = _toPrimitive$3(t2, "string");
  return "symbol" == _typeof$3(i2) ? i2 : i2 + "";
}
function _toPrimitive$3(t2, r) {
  if ("object" != _typeof$3(t2) || !t2) return t2;
  var e = t2[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i2 = e.call(t2, r);
    if ("object" != _typeof$3(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t2);
}
var classes$1 = {
  root: function root2(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-button p-component", _defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3(_defineProperty$3({
      "p-button-icon-only": instance.hasIcon && !props.label && !props.badge,
      "p-button-vertical": (props.iconPos === "top" || props.iconPos === "bottom") && props.label,
      "p-button-loading": props.loading,
      "p-button-link": props.link || props.variant === "link"
    }, "p-button-".concat(props.severity), props.severity), "p-button-raised", props.raised), "p-button-rounded", props.rounded), "p-button-text", props.text || props.variant === "text"), "p-button-outlined", props.outlined || props.variant === "outlined"), "p-button-sm", props.size === "small"), "p-button-lg", props.size === "large"), "p-button-plain", props.plain), "p-button-fluid", instance.hasFluid)];
  },
  loadingIcon: "p-button-loading-icon",
  icon: function icon(_ref3) {
    var props = _ref3.props;
    return ["p-button-icon", _defineProperty$3({}, "p-button-icon-".concat(props.iconPos), props.label)];
  },
  label: "p-button-label"
};
var ButtonStyle = BaseStyle.extend({
  name: "button",
  style: style$1,
  classes: classes$1
});
var script$1$1 = {
  name: "BaseButton",
  "extends": script$8,
  props: {
    label: {
      type: String,
      "default": null
    },
    icon: {
      type: String,
      "default": null
    },
    iconPos: {
      type: String,
      "default": "left"
    },
    iconClass: {
      type: [String, Object],
      "default": null
    },
    badge: {
      type: String,
      "default": null
    },
    badgeClass: {
      type: [String, Object],
      "default": null
    },
    badgeSeverity: {
      type: String,
      "default": "secondary"
    },
    loading: {
      type: Boolean,
      "default": false
    },
    loadingIcon: {
      type: String,
      "default": void 0
    },
    as: {
      type: [String, Object],
      "default": "BUTTON"
    },
    asChild: {
      type: Boolean,
      "default": false
    },
    link: {
      type: Boolean,
      "default": false
    },
    severity: {
      type: String,
      "default": null
    },
    raised: {
      type: Boolean,
      "default": false
    },
    rounded: {
      type: Boolean,
      "default": false
    },
    text: {
      type: Boolean,
      "default": false
    },
    outlined: {
      type: Boolean,
      "default": false
    },
    size: {
      type: String,
      "default": null
    },
    variant: {
      type: String,
      "default": null
    },
    plain: {
      type: Boolean,
      "default": false
    },
    fluid: {
      type: Boolean,
      "default": null
    }
  },
  style: ButtonStyle,
  provide: function provide3() {
    return {
      $pcButton: this,
      $parentInstance: this
    };
  }
};
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
}
function _defineProperty$2(e, r, t2) {
  return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, { value: t2, enumerable: true, configurable: true, writable: true }) : e[r] = t2, e;
}
function _toPropertyKey$2(t2) {
  var i2 = _toPrimitive$2(t2, "string");
  return "symbol" == _typeof$2(i2) ? i2 : i2 + "";
}
function _toPrimitive$2(t2, r) {
  if ("object" != _typeof$2(t2) || !t2) return t2;
  var e = t2[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i2 = e.call(t2, r);
    if ("object" != _typeof$2(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t2);
}
var script$3 = {
  name: "Button",
  "extends": script$1$1,
  inheritAttrs: false,
  inject: {
    $pcFluid: {
      "default": null
    }
  },
  methods: {
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === "root" ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          disabled: this.disabled
        }
      });
    }
  },
  computed: {
    disabled: function disabled() {
      return this.$attrs.disabled || this.$attrs.disabled === "" || this.loading;
    },
    defaultAriaLabel: function defaultAriaLabel() {
      return this.label ? this.label + (this.badge ? " " + this.badge : "") : this.$attrs.ariaLabel;
    },
    hasIcon: function hasIcon() {
      return this.icon || this.$slots.icon;
    },
    attrs: function attrs() {
      return mergeProps(this.asAttrs, this.a11yAttrs, this.getPTOptions("root"));
    },
    asAttrs: function asAttrs() {
      return this.as === "BUTTON" ? {
        type: "button",
        disabled: this.disabled
      } : void 0;
    },
    a11yAttrs: function a11yAttrs() {
      return {
        "aria-label": this.defaultAriaLabel,
        "data-pc-name": "button",
        "data-p-disabled": this.disabled,
        "data-p-severity": this.severity
      };
    },
    hasFluid: function hasFluid() {
      return l(this.fluid) ? !!this.$pcFluid : this.fluid;
    },
    dataP: function dataP2() {
      return f(_defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2(_defineProperty$2({}, this.size, this.size), "icon-only", this.hasIcon && !this.label && !this.badge), "loading", this.loading), "fluid", this.hasFluid), "rounded", this.rounded), "raised", this.raised), "outlined", this.outlined || this.variant === "outlined"), "text", this.text || this.variant === "text"), "link", this.link || this.variant === "link"), "vertical", (this.iconPos === "top" || this.iconPos === "bottom") && this.label));
    },
    dataIconP: function dataIconP() {
      return f(_defineProperty$2(_defineProperty$2({}, this.iconPos, this.iconPos), this.size, this.size));
    },
    dataLabelP: function dataLabelP() {
      return f(_defineProperty$2(_defineProperty$2({}, this.size, this.size), "icon-only", this.hasIcon && !this.label && !this.badge));
    }
  },
  components: {
    SpinnerIcon: script$5,
    Badge: script$4
  },
  directives: {
    ripple: Ripple
  }
};
var _hoisted_1$d = ["data-p"];
var _hoisted_2$a = ["data-p"];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_SpinnerIcon = resolveComponent("SpinnerIcon");
  var _component_Badge = resolveComponent("Badge");
  var _directive_ripple = resolveDirective("ripple");
  return !_ctx.asChild ? withDirectives((openBlock(), createBlock(resolveDynamicComponent(_ctx.as), mergeProps({
    key: 0,
    "class": _ctx.cx("root"),
    "data-p": $options.dataP
  }, $options.attrs), {
    "default": withCtx(function() {
      return [renderSlot(_ctx.$slots, "default", {}, function() {
        return [_ctx.loading ? renderSlot(_ctx.$slots, "loadingicon", mergeProps({
          key: 0,
          "class": [_ctx.cx("loadingIcon"), _ctx.cx("icon")]
        }, _ctx.ptm("loadingIcon")), function() {
          return [_ctx.loadingIcon ? (openBlock(), createElementBlock("span", mergeProps({
            key: 0,
            "class": [_ctx.cx("loadingIcon"), _ctx.cx("icon"), _ctx.loadingIcon]
          }, _ctx.ptm("loadingIcon")), null, 16)) : (openBlock(), createBlock(_component_SpinnerIcon, mergeProps({
            key: 1,
            "class": [_ctx.cx("loadingIcon"), _ctx.cx("icon")],
            spin: ""
          }, _ctx.ptm("loadingIcon")), null, 16, ["class"]))];
        }) : renderSlot(_ctx.$slots, "icon", mergeProps({
          key: 1,
          "class": [_ctx.cx("icon")]
        }, _ctx.ptm("icon")), function() {
          return [_ctx.icon ? (openBlock(), createElementBlock("span", mergeProps({
            key: 0,
            "class": [_ctx.cx("icon"), _ctx.icon, _ctx.iconClass],
            "data-p": $options.dataIconP
          }, _ctx.ptm("icon")), null, 16, _hoisted_1$d)) : createCommentVNode("", true)];
        }), _ctx.label ? (openBlock(), createElementBlock("span", mergeProps({
          key: 2,
          "class": _ctx.cx("label")
        }, _ctx.ptm("label"), {
          "data-p": $options.dataLabelP
        }), toDisplayString(_ctx.label), 17, _hoisted_2$a)) : createCommentVNode("", true), _ctx.badge ? (openBlock(), createBlock(_component_Badge, {
          key: 3,
          value: _ctx.badge,
          "class": normalizeClass(_ctx.badgeClass),
          severity: _ctx.badgeSeverity,
          unstyled: _ctx.unstyled,
          pt: _ctx.ptm("pcBadge")
        }, null, 8, ["value", "class", "severity", "unstyled", "pt"])) : createCommentVNode("", true)];
      })];
    }),
    _: 3
  }, 16, ["class", "data-p"])), [[_directive_ripple]]) : renderSlot(_ctx.$slots, "default", {
    key: 1,
    "class": normalizeClass(_ctx.cx("root")),
    a11yAttrs: $options.a11yAttrs
  });
}
script$3.render = render$2;
var FocusTrapStyle = BaseStyle.extend({
  name: "focustrap-directive"
});
var BaseFocusTrap = BaseDirective.extend({
  style: FocusTrapStyle
});
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function ownKeys(e, r) {
  var t2 = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t2 = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t2), true).forEach(function(r2) {
      _defineProperty$1(e, r2, t2[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t2)) : ownKeys(Object(t2)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t2, r2));
    });
  }
  return e;
}
function _defineProperty$1(e, r, t2) {
  return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, { value: t2, enumerable: true, configurable: true, writable: true }) : e[r] = t2, e;
}
function _toPropertyKey$1(t2) {
  var i2 = _toPrimitive$1(t2, "string");
  return "symbol" == _typeof$1(i2) ? i2 : i2 + "";
}
function _toPrimitive$1(t2, r) {
  if ("object" != _typeof$1(t2) || !t2) return t2;
  var e = t2[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i2 = e.call(t2, r);
    if ("object" != _typeof$1(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t2);
}
var FocusTrap = BaseFocusTrap.extend("focustrap", {
  mounted: function mounted2(el, binding) {
    var _ref = binding.value || {}, disabled2 = _ref.disabled;
    if (!disabled2) {
      this.createHiddenFocusableElements(el, binding);
      this.bind(el, binding);
      this.autoElementFocus(el, binding);
    }
    el.setAttribute("data-pd-focustrap", true);
    this.$el = el;
  },
  updated: function updated2(el, binding) {
    var _ref2 = binding.value || {}, disabled2 = _ref2.disabled;
    disabled2 && this.unbind(el);
  },
  unmounted: function unmounted3(el) {
    this.unbind(el);
  },
  methods: {
    getComputedSelector: function getComputedSelector(selector) {
      return ':not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])'.concat(selector !== null && selector !== void 0 ? selector : "");
    },
    bind: function bind(el, binding) {
      var _this = this;
      var _ref3 = binding.value || {}, onFocusIn = _ref3.onFocusIn, onFocusOut = _ref3.onFocusOut;
      el.$_pfocustrap_mutationobserver = new MutationObserver(function(mutationList) {
        mutationList.forEach(function(mutation) {
          if (mutation.type === "childList" && !el.contains(document.activeElement)) {
            var _findNextFocusableElement = function findNextFocusableElement(_el) {
              var focusableElement = It(_el) ? It(_el, _this.getComputedSelector(el.$_pfocustrap_focusableselector)) ? _el : vt(el, _this.getComputedSelector(el.$_pfocustrap_focusableselector)) : vt(_el);
              return s$1(focusableElement) ? focusableElement : _el.nextSibling && _findNextFocusableElement(_el.nextSibling);
            };
            bt(_findNextFocusableElement(mutation.nextSibling));
          }
        });
      });
      el.$_pfocustrap_mutationobserver.disconnect();
      el.$_pfocustrap_mutationobserver.observe(el, {
        childList: true
      });
      el.$_pfocustrap_focusinlistener = function(event) {
        return onFocusIn && onFocusIn(event);
      };
      el.$_pfocustrap_focusoutlistener = function(event) {
        return onFocusOut && onFocusOut(event);
      };
      el.addEventListener("focusin", el.$_pfocustrap_focusinlistener);
      el.addEventListener("focusout", el.$_pfocustrap_focusoutlistener);
    },
    unbind: function unbind(el) {
      el.$_pfocustrap_mutationobserver && el.$_pfocustrap_mutationobserver.disconnect();
      el.$_pfocustrap_focusinlistener && el.removeEventListener("focusin", el.$_pfocustrap_focusinlistener) && (el.$_pfocustrap_focusinlistener = null);
      el.$_pfocustrap_focusoutlistener && el.removeEventListener("focusout", el.$_pfocustrap_focusoutlistener) && (el.$_pfocustrap_focusoutlistener = null);
    },
    autoFocus: function autoFocus(options) {
      this.autoElementFocus(this.$el, {
        value: _objectSpread(_objectSpread({}, options), {}, {
          autoFocus: true
        })
      });
    },
    autoElementFocus: function autoElementFocus(el, binding) {
      var _ref4 = binding.value || {}, _ref4$autoFocusSelect = _ref4.autoFocusSelector, autoFocusSelector = _ref4$autoFocusSelect === void 0 ? "" : _ref4$autoFocusSelect, _ref4$firstFocusableS = _ref4.firstFocusableSelector, firstFocusableSelector = _ref4$firstFocusableS === void 0 ? "" : _ref4$firstFocusableS, _ref4$autoFocus = _ref4.autoFocus, autoFocus2 = _ref4$autoFocus === void 0 ? false : _ref4$autoFocus;
      var focusableElement = vt(el, "[autofocus]".concat(this.getComputedSelector(autoFocusSelector)));
      autoFocus2 && !focusableElement && (focusableElement = vt(el, this.getComputedSelector(firstFocusableSelector)));
      bt(focusableElement);
    },
    onFirstHiddenElementFocus: function onFirstHiddenElementFocus(event) {
      var _this$$el;
      var currentTarget = event.currentTarget, relatedTarget = event.relatedTarget;
      var focusableElement = relatedTarget === currentTarget.$_pfocustrap_lasthiddenfocusableelement || !((_this$$el = this.$el) !== null && _this$$el !== void 0 && _this$$el.contains(relatedTarget)) ? vt(currentTarget.parentElement, this.getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_lasthiddenfocusableelement;
      bt(focusableElement);
    },
    onLastHiddenElementFocus: function onLastHiddenElementFocus(event) {
      var _this$$el2;
      var currentTarget = event.currentTarget, relatedTarget = event.relatedTarget;
      var focusableElement = relatedTarget === currentTarget.$_pfocustrap_firsthiddenfocusableelement || !((_this$$el2 = this.$el) !== null && _this$$el2 !== void 0 && _this$$el2.contains(relatedTarget)) ? Lt(currentTarget.parentElement, this.getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_firsthiddenfocusableelement;
      bt(focusableElement);
    },
    createHiddenFocusableElements: function createHiddenFocusableElements(el, binding) {
      var _this2 = this;
      var _ref5 = binding.value || {}, _ref5$tabIndex = _ref5.tabIndex, tabIndex = _ref5$tabIndex === void 0 ? 0 : _ref5$tabIndex, _ref5$firstFocusableS = _ref5.firstFocusableSelector, firstFocusableSelector = _ref5$firstFocusableS === void 0 ? "" : _ref5$firstFocusableS, _ref5$lastFocusableSe = _ref5.lastFocusableSelector, lastFocusableSelector = _ref5$lastFocusableSe === void 0 ? "" : _ref5$lastFocusableSe;
      var createFocusableElement = function createFocusableElement2(onFocus) {
        return U("span", {
          "class": "p-hidden-accessible p-hidden-focusable",
          tabIndex,
          role: "presentation",
          "aria-hidden": true,
          "data-p-hidden-accessible": true,
          "data-p-hidden-focusable": true,
          onFocus: onFocus === null || onFocus === void 0 ? void 0 : onFocus.bind(_this2)
        });
      };
      var firstFocusableElement = createFocusableElement(this.onFirstHiddenElementFocus);
      var lastFocusableElement = createFocusableElement(this.onLastHiddenElementFocus);
      firstFocusableElement.$_pfocustrap_lasthiddenfocusableelement = lastFocusableElement;
      firstFocusableElement.$_pfocustrap_focusableselector = firstFocusableSelector;
      firstFocusableElement.setAttribute("data-pc-section", "firstfocusableelement");
      lastFocusableElement.$_pfocustrap_firsthiddenfocusableelement = firstFocusableElement;
      lastFocusableElement.$_pfocustrap_focusableselector = lastFocusableSelector;
      lastFocusableElement.setAttribute("data-pc-section", "lastfocusableelement");
      el.prepend(firstFocusableElement);
      el.append(lastFocusableElement);
    }
  }
});
var script$2 = {
  name: "Portal",
  props: {
    appendTo: {
      type: [String, Object],
      "default": "body"
    },
    disabled: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      mounted: false
    };
  },
  mounted: function mounted3() {
    this.mounted = tt();
  },
  computed: {
    inline: function inline() {
      return this.disabled || this.appendTo === "self";
    }
  }
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return $options.inline ? renderSlot(_ctx.$slots, "default", {
    key: 0
  }) : $data.mounted ? (openBlock(), createBlock(Teleport, {
    key: 1,
    to: $props.appendTo
  }, [renderSlot(_ctx.$slots, "default")], 8, ["to"])) : createCommentVNode("", true);
}
script$2.render = render$1;
function blockBodyScroll() {
  st$1({
    variableName: rr("scrollbar.width").name
  });
}
function unblockBodyScroll() {
  dt$1({
    variableName: rr("scrollbar.width").name
  });
}
var style = "\n    .p-drawer {\n        display: flex;\n        flex-direction: column;\n        transform: translate3d(0px, 0px, 0px);\n        position: relative;\n        transition: transform 0.3s;\n        background: dt('drawer.background');\n        color: dt('drawer.color');\n        border-style: solid;\n        border-color: dt('drawer.border.color');\n        box-shadow: dt('drawer.shadow');\n    }\n\n    .p-drawer-content {\n        overflow-y: auto;\n        flex-grow: 1;\n        padding: dt('drawer.content.padding');\n    }\n\n    .p-drawer-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        flex-shrink: 0;\n        padding: dt('drawer.header.padding');\n    }\n\n    .p-drawer-footer {\n        padding: dt('drawer.footer.padding');\n    }\n\n    .p-drawer-title {\n        font-weight: dt('drawer.title.font.weight');\n        font-size: dt('drawer.title.font.size');\n    }\n\n    .p-drawer-full .p-drawer {\n        transition: none;\n        transform: none;\n        width: 100vw !important;\n        height: 100vh !important;\n        max-height: 100%;\n        top: 0px !important;\n        left: 0px !important;\n        border-width: 1px;\n    }\n\n    .p-drawer-left .p-drawer-enter-active {\n        animation: p-animate-drawer-enter-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n    .p-drawer-left .p-drawer-leave-active {\n        animation: p-animate-drawer-leave-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n\n    .p-drawer-right .p-drawer-enter-active {\n        animation: p-animate-drawer-enter-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n    .p-drawer-right .p-drawer-leave-active {\n        animation: p-animate-drawer-leave-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n\n    .p-drawer-top .p-drawer-enter-active {\n        animation: p-animate-drawer-enter-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n    .p-drawer-top .p-drawer-leave-active {\n        animation: p-animate-drawer-leave-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n\n    .p-drawer-bottom .p-drawer-enter-active {\n        animation: p-animate-drawer-enter-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n    .p-drawer-bottom .p-drawer-leave-active {\n        animation: p-animate-drawer-leave-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n\n    .p-drawer-full .p-drawer-enter-active {\n        animation: p-animate-drawer-enter-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n    .p-drawer-full .p-drawer-leave-active {\n        animation: p-animate-drawer-leave-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n    \n    .p-drawer-left .p-drawer {\n        width: 20rem;\n        height: 100%;\n        border-inline-end-width: 1px;\n    }\n\n    .p-drawer-right .p-drawer {\n        width: 20rem;\n        height: 100%;\n        border-inline-start-width: 1px;\n    }\n\n    .p-drawer-top .p-drawer {\n        height: 10rem;\n        width: 100%;\n        border-block-end-width: 1px;\n    }\n\n    .p-drawer-bottom .p-drawer {\n        height: 10rem;\n        width: 100%;\n        border-block-start-width: 1px;\n    }\n\n    .p-drawer-left .p-drawer-content,\n    .p-drawer-right .p-drawer-content,\n    .p-drawer-top .p-drawer-content,\n    .p-drawer-bottom .p-drawer-content {\n        width: 100%;\n        height: 100%;\n    }\n\n    .p-drawer-open {\n        display: flex;\n    }\n\n    .p-drawer-mask:dir(rtl) {\n        flex-direction: row-reverse;\n    }\n\n    @keyframes p-animate-drawer-enter-left {\n        from {\n            transform: translate3d(-100%, 0px, 0px);\n        }\n    }\n\n    @keyframes p-animate-drawer-leave-left {\n        to {\n            transform: translate3d(-100%, 0px, 0px);\n        }\n    }\n\n    @keyframes p-animate-drawer-enter-right {\n        from {\n            transform: translate3d(100%, 0px, 0px);\n        }\n    }\n\n    @keyframes p-animate-drawer-leave-right {\n        to {\n            transform: translate3d(100%, 0px, 0px);\n        }\n    }\n\n    @keyframes p-animate-drawer-enter-top {\n        from {\n            transform: translate3d(0px, -100%, 0px);\n        }\n    }\n\n    @keyframes p-animate-drawer-leave-top {\n        to {\n            transform: translate3d(0px, -100%, 0px);\n        }\n    }\n\n    @keyframes p-animate-drawer-enter-bottom {\n        from {\n            transform: translate3d(0px, 100%, 0px);\n        }\n    }\n\n    @keyframes p-animate-drawer-leave-bottom {\n        to {\n            transform: translate3d(0px, 100%, 0px);\n        }\n    }\n\n    @keyframes p-animate-drawer-enter-full {\n        from {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n\n    @keyframes p-animate-drawer-leave-full {\n        to {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n";
var inlineStyles = {
  mask: function mask(_ref) {
    var position = _ref.position, modal = _ref.modal;
    return {
      position: "fixed",
      height: "100%",
      width: "100%",
      left: 0,
      top: 0,
      display: "flex",
      justifyContent: position === "left" ? "flex-start" : position === "right" ? "flex-end" : "center",
      alignItems: position === "top" ? "flex-start" : position === "bottom" ? "flex-end" : "center",
      pointerEvents: modal ? "auto" : "none"
    };
  },
  root: {
    pointerEvents: "auto"
  }
};
var classes = {
  mask: function mask2(_ref2) {
    var instance = _ref2.instance, props = _ref2.props;
    var positions = ["left", "right", "top", "bottom"];
    var pos = positions.find(function(item) {
      return item === props.position;
    });
    return ["p-drawer-mask", {
      "p-overlay-mask p-overlay-mask-enter-active": props.modal,
      "p-drawer-open": instance.containerVisible,
      "p-drawer-full": instance.fullScreen
    }, pos ? "p-drawer-".concat(pos) : ""];
  },
  root: function root3(_ref3) {
    var instance = _ref3.instance;
    return ["p-drawer p-component", {
      "p-drawer-full": instance.fullScreen
    }];
  },
  header: "p-drawer-header",
  title: "p-drawer-title",
  pcCloseButton: "p-drawer-close-button",
  content: "p-drawer-content",
  footer: "p-drawer-footer"
};
var DrawerStyle = BaseStyle.extend({
  name: "drawer",
  style,
  classes,
  inlineStyles
});
var script$1 = {
  name: "BaseDrawer",
  "extends": script$8,
  props: {
    visible: {
      type: Boolean,
      "default": false
    },
    position: {
      type: String,
      "default": "left"
    },
    header: {
      type: null,
      "default": null
    },
    baseZIndex: {
      type: Number,
      "default": 0
    },
    autoZIndex: {
      type: Boolean,
      "default": true
    },
    dismissable: {
      type: Boolean,
      "default": true
    },
    showCloseIcon: {
      type: Boolean,
      "default": true
    },
    closeButtonProps: {
      type: Object,
      "default": function _default() {
        return {
          severity: "secondary",
          text: true,
          rounded: true
        };
      }
    },
    closeIcon: {
      type: String,
      "default": void 0
    },
    modal: {
      type: Boolean,
      "default": true
    },
    blockScroll: {
      type: Boolean,
      "default": false
    },
    closeOnEscape: {
      type: Boolean,
      "default": true
    }
  },
  style: DrawerStyle,
  provide: function provide4() {
    return {
      $pcDrawer: this,
      $parentInstance: this
    };
  }
};
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _defineProperty(e, r, t2) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t2, enumerable: true, configurable: true, writable: true }) : e[r] = t2, e;
}
function _toPropertyKey(t2) {
  var i2 = _toPrimitive(t2, "string");
  return "symbol" == _typeof(i2) ? i2 : i2 + "";
}
function _toPrimitive(t2, r) {
  if ("object" != _typeof(t2) || !t2) return t2;
  var e = t2[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i2 = e.call(t2, r);
    if ("object" != _typeof(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t2);
}
var script = {
  name: "Drawer",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["update:visible", "show", "after-show", "hide", "after-hide", "before-hide"],
  data: function data2() {
    return {
      containerVisible: this.visible
    };
  },
  container: null,
  mask: null,
  content: null,
  headerContainer: null,
  footerContainer: null,
  closeButton: null,
  outsideClickListener: null,
  documentKeydownListener: null,
  watch: {
    dismissable: function dismissable(newValue) {
      if (newValue && !this.modal) {
        this.bindOutsideClickListener();
      } else {
        this.unbindOutsideClickListener();
      }
    }
  },
  updated: function updated3() {
    if (this.visible) {
      this.containerVisible = this.visible;
    }
  },
  beforeUnmount: function beforeUnmount2() {
    this.disableDocumentSettings();
    if (this.mask && this.autoZIndex) {
      x.clear(this.mask);
    }
    this.container = null;
    this.mask = null;
  },
  methods: {
    hide: function hide() {
      this.$emit("update:visible", false);
    },
    onEnter: function onEnter() {
      this.$emit("show");
      this.focus();
      this.bindDocumentKeyDownListener();
      if (this.autoZIndex) {
        x.set("modal", this.mask, this.baseZIndex || this.$primevue.config.zIndex.modal);
      }
    },
    onAfterEnter: function onAfterEnter() {
      this.enableDocumentSettings();
      this.$emit("after-show");
    },
    onBeforeLeave: function onBeforeLeave() {
      if (this.modal) {
        !this.isUnstyled && W(this.mask, "p-overlay-mask-leave-active");
      }
      this.$emit("before-hide");
    },
    onLeave: function onLeave() {
      this.$emit("hide");
    },
    onAfterLeave: function onAfterLeave() {
      if (this.autoZIndex) {
        x.clear(this.mask);
      }
      this.unbindDocumentKeyDownListener();
      this.containerVisible = false;
      this.disableDocumentSettings();
      this.$emit("after-hide");
    },
    onMaskClick: function onMaskClick(event) {
      if (this.dismissable && this.modal && this.mask === event.target) {
        this.hide();
      }
    },
    focus: function focus$1() {
      var findFocusableElement = function findFocusableElement2(container) {
        return container && container.querySelector("[autofocus]");
      };
      var focusTarget = this.$slots.header && findFocusableElement(this.headerContainer);
      if (!focusTarget) {
        focusTarget = this.$slots["default"] && findFocusableElement(this.container);
        if (!focusTarget) {
          focusTarget = this.$slots.footer && findFocusableElement(this.footerContainer);
          if (!focusTarget) {
            focusTarget = this.closeButton;
          }
        }
      }
      focusTarget && bt(focusTarget);
    },
    enableDocumentSettings: function enableDocumentSettings() {
      if (this.dismissable && !this.modal) {
        this.bindOutsideClickListener();
      }
      if (this.blockScroll) {
        blockBodyScroll();
      }
    },
    disableDocumentSettings: function disableDocumentSettings() {
      this.unbindOutsideClickListener();
      if (this.blockScroll) {
        unblockBodyScroll();
      }
    },
    onKeydown: function onKeydown(event) {
      if (event.code === "Escape" && this.closeOnEscape) {
        this.hide();
      }
    },
    containerRef: function containerRef(el) {
      this.container = el;
    },
    maskRef: function maskRef(el) {
      this.mask = el;
    },
    contentRef: function contentRef(el) {
      this.content = el;
    },
    headerContainerRef: function headerContainerRef(el) {
      this.headerContainer = el;
    },
    footerContainerRef: function footerContainerRef(el) {
      this.footerContainer = el;
    },
    closeButtonRef: function closeButtonRef(el) {
      this.closeButton = el ? el.$el : void 0;
    },
    bindDocumentKeyDownListener: function bindDocumentKeyDownListener() {
      if (!this.documentKeydownListener) {
        this.documentKeydownListener = this.onKeydown;
        document.addEventListener("keydown", this.documentKeydownListener);
      }
    },
    unbindDocumentKeyDownListener: function unbindDocumentKeyDownListener() {
      if (this.documentKeydownListener) {
        document.removeEventListener("keydown", this.documentKeydownListener);
        this.documentKeydownListener = null;
      }
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function(event) {
          if (_this.isOutsideClicked(event)) {
            _this.hide();
          }
        };
        document.addEventListener("click", this.outsideClickListener, true);
      }
    },
    unbindOutsideClickListener: function unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener("click", this.outsideClickListener, true);
        this.outsideClickListener = null;
      }
    },
    isOutsideClicked: function isOutsideClicked(event) {
      return this.container && !this.container.contains(event.target);
    }
  },
  computed: {
    fullScreen: function fullScreen() {
      return this.position === "full";
    },
    closeAriaLabel: function closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : void 0;
    },
    dataP: function dataP3() {
      return f(_defineProperty(_defineProperty(_defineProperty({
        "full-screen": this.position === "full"
      }, this.position, this.position), "open", this.containerVisible), "modal", this.modal));
    }
  },
  directives: {
    focustrap: FocusTrap
  },
  components: {
    Button: script$3,
    Portal: script$2,
    TimesIcon: script$6
  }
};
var _hoisted_1$c = ["data-p"];
var _hoisted_2$9 = ["role", "aria-modal", "data-p"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Button = resolveComponent("Button");
  var _component_Portal = resolveComponent("Portal");
  var _directive_focustrap = resolveDirective("focustrap");
  return openBlock(), createBlock(_component_Portal, null, {
    "default": withCtx(function() {
      return [$data.containerVisible ? (openBlock(), createElementBlock("div", mergeProps({
        key: 0,
        ref: $options.maskRef,
        onMousedown: _cache[0] || (_cache[0] = function() {
          return $options.onMaskClick && $options.onMaskClick.apply($options, arguments);
        }),
        "class": _ctx.cx("mask"),
        style: _ctx.sx("mask", true, {
          position: _ctx.position,
          modal: _ctx.modal
        }),
        "data-p": $options.dataP
      }, _ctx.ptm("mask")), [createVNode(Transition, mergeProps({
        name: "p-drawer",
        onEnter: $options.onEnter,
        onAfterEnter: $options.onAfterEnter,
        onBeforeLeave: $options.onBeforeLeave,
        onLeave: $options.onLeave,
        onAfterLeave: $options.onAfterLeave,
        appear: ""
      }, _ctx.ptm("transition")), {
        "default": withCtx(function() {
          return [_ctx.visible ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.containerRef,
            "class": _ctx.cx("root"),
            style: _ctx.sx("root"),
            role: _ctx.modal ? "dialog" : "complementary",
            "aria-modal": _ctx.modal ? true : void 0,
            "data-p": $options.dataP
          }, _ctx.ptmi("root")), [_ctx.$slots.container ? renderSlot(_ctx.$slots, "container", {
            key: 0,
            closeCallback: $options.hide
          }) : (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [createElementVNode("div", mergeProps({
            ref: $options.headerContainerRef,
            "class": _ctx.cx("header")
          }, _ctx.ptm("header")), [renderSlot(_ctx.$slots, "header", {
            "class": normalizeClass(_ctx.cx("title"))
          }, function() {
            return [_ctx.header ? (openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              "class": _ctx.cx("title")
            }, _ctx.ptm("title")), toDisplayString(_ctx.header), 17)) : createCommentVNode("", true)];
          }), _ctx.showCloseIcon ? renderSlot(_ctx.$slots, "closebutton", {
            key: 0,
            closeCallback: $options.hide
          }, function() {
            return [createVNode(_component_Button, mergeProps({
              ref: $options.closeButtonRef,
              type: "button",
              "class": _ctx.cx("pcCloseButton"),
              "aria-label": $options.closeAriaLabel,
              unstyled: _ctx.unstyled,
              onClick: $options.hide
            }, _ctx.closeButtonProps, {
              pt: _ctx.ptm("pcCloseButton"),
              "data-pc-group-section": "iconcontainer"
            }), {
              icon: withCtx(function(slotProps) {
                return [renderSlot(_ctx.$slots, "closeicon", {}, function() {
                  return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.closeIcon ? "span" : "TimesIcon"), mergeProps({
                    "class": [_ctx.closeIcon, slotProps["class"]]
                  }, _ctx.ptm("pcCloseButton")["icon"]), null, 16, ["class"]))];
                })];
              }),
              _: 3
            }, 16, ["class", "aria-label", "unstyled", "onClick", "pt"])];
          }) : createCommentVNode("", true)], 16), createElementVNode("div", mergeProps({
            ref: $options.contentRef,
            "class": _ctx.cx("content")
          }, _ctx.ptm("content")), [renderSlot(_ctx.$slots, "default")], 16), _ctx.$slots.footer ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.footerContainerRef,
            "class": _ctx.cx("footer")
          }, _ctx.ptm("footer")), [renderSlot(_ctx.$slots, "footer")], 16)) : createCommentVNode("", true)], 64))], 16, _hoisted_2$9)), [[_directive_focustrap]]) : createCommentVNode("", true)];
        }),
        _: 3
      }, 16, ["onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])], 16, _hoisted_1$c)) : createCommentVNode("", true)];
    }),
    _: 3
  });
}
script.render = render;
const _hoisted_1$b = { key: 0 };
const _sfc_main$c = {
  __name: "Dropdown",
  setup(__props) {
    const container = ref(null);
    const open = ref(false);
    function toggle() {
      open.value = !open.value;
    }
    function close() {
      open.value = false;
    }
    function onClickOutside(event) {
      if (open.value && container.value && !container.value.contains(event.target)) {
        close();
      }
    }
    onMounted(() => {
      document.addEventListener("click", onClickOutside);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("click", onClickOutside);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          ref_key: "container",
          ref: container,
          class: "relative"
        },
        [
          renderSlot(_ctx.$slots, "trigger", {
            open: open.value,
            toggle
          }),
          createVNode(Transition, {
            "enter-active-class": "transition ease-out duration-100",
            "enter-from-class": "transform opacity-0 scale-95",
            "enter-to-class": "transform opacity-100 scale-100",
            "leave-active-class": "transition ease-in duration-75",
            "leave-from-class": "transform opacity-100 scale-100",
            "leave-to-class": "transform opacity-0 scale-95"
          }, {
            default: withCtx(() => [
              open.value ? (openBlock(), createElementBlock("div", _hoisted_1$b, [
                renderSlot(_ctx.$slots, "default", { close })
              ])) : createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          })
        ],
        512
        /* NEED_PATCH */
      );
    };
  }
};
const _sfc_main$b = {
  __name: "Collapsible",
  props: {
    defaultOpen: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const open = ref(props.defaultOpen);
    function toggle() {
      open.value = !open.value;
    }
    function onBeforeEnter(el) {
      el.style.height = "0";
      el.style.overflow = "hidden";
    }
    function onEnter2(el) {
      el.style.height = el.scrollHeight + "px";
      el.style.transition = "height 0.2s ease";
    }
    function onAfterEnter2(el) {
      el.style.height = "";
      el.style.overflow = "";
      el.style.transition = "";
    }
    function onBeforeLeave2(el) {
      el.style.height = el.scrollHeight + "px";
      el.style.overflow = "hidden";
    }
    function onLeave2(el) {
      el.offsetHeight;
      el.style.height = "0";
      el.style.transition = "height 0.2s ease";
    }
    function onAfterLeave2(el) {
      el.style.height = "";
      el.style.overflow = "";
      el.style.transition = "";
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        renderSlot(_ctx.$slots, "trigger", {
          open: open.value,
          toggle
        }),
        createVNode(Transition, {
          onBeforeEnter,
          onEnter: onEnter2,
          onAfterEnter: onAfterEnter2,
          onBeforeLeave: onBeforeLeave2,
          onLeave: onLeave2,
          onAfterLeave: onAfterLeave2,
          persisted: ""
        }, {
          default: withCtx(() => [
            withDirectives(createElementVNode(
              "div",
              null,
              [
                renderSlot(_ctx.$slots, "default")
              ],
              512
              /* NEED_PATCH */
            ), [
              [vShow, open.value]
            ])
          ]),
          _: 3
          /* FORWARDED */
        })
      ]);
    };
  }
};
const _hoisted_1$a = { key: 0 };
const _sfc_main$a = {
  __name: "Toast",
  props: {
    duration: {
      type: Number,
      default: 5e3
    }
  },
  setup(__props) {
    const props = __props;
    const visible = ref(true);
    function close() {
      visible.value = false;
    }
    onMounted(() => {
      if (props.duration > 0) {
        setTimeout(close, props.duration);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        "enter-active-class": "transform ease-out duration-300 transition",
        "enter-from-class": "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",
        "enter-to-class": "translate-y-0 opacity-100 sm:translate-x-0",
        "leave-active-class": "transition ease-in duration-100",
        "leave-from-class": "opacity-100",
        "leave-to-class": "opacity-0"
      }, {
        default: withCtx(() => [
          visible.value ? (openBlock(), createElementBlock("div", _hoisted_1$a, [
            renderSlot(_ctx.$slots, "default", { close })
          ])) : createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      });
    };
  }
};
const _hoisted_1$9 = { class: "p-4" };
const _hoisted_2$8 = { class: "flex items-start" };
const _hoisted_3$8 = {
  key: 0,
  class: "flex-shrink-0"
};
const _hoisted_4$8 = { class: "ml-3 w-0 flex-1 pt-0.5" };
const _hoisted_5$8 = {
  key: 0,
  class: "text-sm font-medium text-gray-900 dark:text-white"
};
const _hoisted_6$6 = {
  key: 1,
  class: "mt-1 text-sm text-gray-500 dark:text-gray-400"
};
const _hoisted_7$6 = {
  key: 1,
  class: "ml-4 flex flex-shrink-0"
};
const _hoisted_8$6 = ["onClick"];
const _sfc_main$9 = {
  __name: "NotificationToasts",
  setup(__props) {
    const notifications = ref([]);
    let nextId = 0;
    const colorMap = {
      success: "text-green-400",
      danger: "text-red-400",
      warning: "text-yellow-400",
      info: "text-blue-400",
      primary: "text-blue-400",
      gray: "text-gray-400"
    };
    function colorClass(color) {
      return colorMap[color] || "text-gray-400";
    }
    function dismiss(id) {
      notifications.value = notifications.value.filter((n) => n.id !== id);
    }
    function handleNotification(event) {
      const data3 = event.detail;
      const id = ++nextId;
      const notification = { ...data3, id };
      notifications.value.push(notification);
      const duration = data3.duration ?? 5e3;
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
    }
    onMounted(() => {
      window.addEventListener("primix:notification", handleNotification);
    });
    onUnmounted(() => {
      window.removeEventListener("primix:notification", handleNotification);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(TransitionGroup, {
        "enter-active-class": "transform ease-out duration-300 transition",
        "enter-from-class": "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",
        "enter-to-class": "translate-y-0 opacity-100 sm:translate-x-0",
        "leave-active-class": "transition ease-in duration-100",
        "leave-from-class": "opacity-100",
        "leave-to-class": "opacity-0"
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(notifications.value, (notification) => {
              return openBlock(), createElementBlock("div", {
                key: notification.id,
                class: "pointer-events-auto mb-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
              }, [
                createElementVNode("div", _hoisted_1$9, [
                  createElementVNode("div", _hoisted_2$8, [
                    notification.icon ? (openBlock(), createElementBlock("div", _hoisted_3$8, [
                      notification.icon === "heroicon-o-check-circle" ? (openBlock(), createElementBlock(
                        "svg",
                        {
                          key: 0,
                          class: normalizeClass(["h-6 w-6", colorClass(notification.color)]),
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor"
                        },
                        [..._cache[0] || (_cache[0] = [
                          createElementVNode(
                            "path",
                            {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            },
                            null,
                            -1
                            /* CACHED */
                          )
                        ])],
                        2
                        /* CLASS */
                      )) : notification.icon === "heroicon-o-exclamation-triangle" ? (openBlock(), createElementBlock(
                        "svg",
                        {
                          key: 1,
                          class: normalizeClass(["h-6 w-6", colorClass(notification.color)]),
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor"
                        },
                        [..._cache[1] || (_cache[1] = [
                          createElementVNode(
                            "path",
                            {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                            },
                            null,
                            -1
                            /* CACHED */
                          )
                        ])],
                        2
                        /* CLASS */
                      )) : notification.icon === "heroicon-o-x-circle" ? (openBlock(), createElementBlock(
                        "svg",
                        {
                          key: 2,
                          class: normalizeClass(["h-6 w-6", colorClass(notification.color)]),
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor"
                        },
                        [..._cache[2] || (_cache[2] = [
                          createElementVNode(
                            "path",
                            {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            },
                            null,
                            -1
                            /* CACHED */
                          )
                        ])],
                        2
                        /* CLASS */
                      )) : notification.icon === "heroicon-o-information-circle" ? (openBlock(), createElementBlock(
                        "svg",
                        {
                          key: 3,
                          class: normalizeClass(["h-6 w-6", colorClass(notification.color)]),
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor"
                        },
                        [..._cache[3] || (_cache[3] = [
                          createElementVNode(
                            "path",
                            {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                            },
                            null,
                            -1
                            /* CACHED */
                          )
                        ])],
                        2
                        /* CLASS */
                      )) : createCommentVNode("v-if", true)
                    ])) : createCommentVNode("v-if", true),
                    createElementVNode("div", _hoisted_4$8, [
                      notification.title ? (openBlock(), createElementBlock(
                        "p",
                        _hoisted_5$8,
                        toDisplayString(notification.title),
                        1
                        /* TEXT */
                      )) : createCommentVNode("v-if", true),
                      notification.body ? (openBlock(), createElementBlock(
                        "p",
                        _hoisted_6$6,
                        toDisplayString(notification.body),
                        1
                        /* TEXT */
                      )) : createCommentVNode("v-if", true)
                    ]),
                    notification.closeable !== false ? (openBlock(), createElementBlock("div", _hoisted_7$6, [
                      createElementVNode("button", {
                        onClick: ($event) => dismiss(notification.id),
                        type: "button",
                        class: "inline-flex rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      }, [..._cache[4] || (_cache[4] = [
                        createElementVNode(
                          "span",
                          { class: "sr-only" },
                          "Close",
                          -1
                          /* CACHED */
                        ),
                        createElementVNode(
                          "svg",
                          {
                            class: "h-5 w-5",
                            viewBox: "0 0 20 20",
                            fill: "currentColor"
                          },
                          [
                            createElementVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                              "clip-rule": "evenodd"
                            })
                          ],
                          -1
                          /* CACHED */
                        )
                      ])], 8, _hoisted_8$6)
                    ])) : createCommentVNode("v-if", true)
                  ])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
};
const _hoisted_1$8 = ["onClick"];
const _hoisted_2$7 = {
  key: 0,
  class: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor"
};
const _hoisted_3$7 = { class: "absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none" };
const _hoisted_4$7 = { class: "py-1" };
const _hoisted_5$7 = ["onClick"];
const STORAGE_KEY$1 = "primix-color-mode";
const _sfc_main$8 = {
  __name: "ThemeToggle",
  setup(__props) {
    const SunIcon = {
      render() {
        return h$1("svg", { fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [
          h$1("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" })
        ]);
      }
    };
    const MoonIcon = {
      render() {
        return h$1("svg", { fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [
          h$1("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" })
        ]);
      }
    };
    const MonitorIcon = {
      render() {
        return h$1("svg", { fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [
          h$1("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" })
        ]);
      }
    };
    const options = [
      { value: "light", label: "Light", icon: SunIcon },
      { value: "dark", label: "Dark", icon: MoonIcon },
      { value: "system", label: "System", icon: MonitorIcon }
    ];
    const mode = ref("system");
    const systemPrefersDark = ref(false);
    const effectiveMode = computed(() => {
      if (mode.value === "system") {
        return systemPrefersDark.value ? "dark" : "light";
      }
      return mode.value;
    });
    let mediaQuery = null;
    function applyTheme() {
      if (effectiveMode.value === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    function setMode(newMode) {
      mode.value = newMode;
      localStorage.setItem(STORAGE_KEY$1, newMode);
      applyTheme();
    }
    function onSystemChange(e) {
      systemPrefersDark.value = e.matches;
      if (mode.value === "system") {
        applyTheme();
      }
    }
    onMounted(() => {
      const stored = localStorage.getItem(STORAGE_KEY$1);
      if (stored && ["light", "dark", "system"].includes(stored)) {
        mode.value = stored;
      }
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      systemPrefersDark.value = mediaQuery.matches;
      mediaQuery.addEventListener("change", onSystemChange);
      applyTheme();
    });
    onBeforeUnmount(() => {
      if (mediaQuery) {
        mediaQuery.removeEventListener("change", onSystemChange);
      }
    });
    return (_ctx, _cache) => {
      const _component_PrimixDropdown = resolveComponent("PrimixDropdown");
      return openBlock(), createBlock(_component_PrimixDropdown, null, {
        trigger: withCtx(({ toggle }) => [
          createElementVNode("button", {
            type: "button",
            class: "-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300",
            onClick: toggle
          }, [
            _cache[2] || (_cache[2] = createElementVNode(
              "span",
              { class: "sr-only" },
              "Toggle theme",
              -1
              /* CACHED */
            )),
            createCommentVNode(" Sun icon (light mode) "),
            effectiveMode.value === "light" ? (openBlock(), createElementBlock("svg", _hoisted_2$7, [..._cache[0] || (_cache[0] = [
              createElementVNode(
                "path",
                {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                },
                null,
                -1
                /* CACHED */
              )
            ])])) : (openBlock(), createElementBlock(
              Fragment,
              { key: 1 },
              [
                createCommentVNode(" Moon icon (dark mode) "),
                _cache[1] || (_cache[1] = createElementVNode(
                  "svg",
                  {
                    class: "h-6 w-6",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor"
                  },
                  [
                    createElementVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    })
                  ],
                  -1
                  /* CACHED */
                ))
              ],
              2112
              /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
            ))
          ], 8, _hoisted_1$8)
        ]),
        default: withCtx(({ close }) => [
          createElementVNode("div", _hoisted_3$7, [
            createElementVNode("div", _hoisted_4$7, [
              (openBlock(), createElementBlock(
                Fragment,
                null,
                renderList(options, (option) => {
                  return createElementVNode("button", {
                    key: option.value,
                    type: "button",
                    class: normalizeClass(["flex w-full items-center gap-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700", { "bg-gray-50 dark:bg-gray-700/50 font-medium": mode.value === option.value }]),
                    onClick: ($event) => {
                      setMode(option.value);
                      close();
                    }
                  }, [
                    (openBlock(), createBlock(resolveDynamicComponent(option.icon), { class: "h-4 w-4" })),
                    createTextVNode(
                      " " + toDisplayString(option.label),
                      1
                      /* TEXT */
                    )
                  ], 10, _hoisted_5$7);
                }),
                64
                /* STABLE_FRAGMENT */
              ))
            ])
          ])
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
};
const _hoisted_1$7 = ["onClick"];
const _hoisted_2$6 = ["src", "alt"];
const _hoisted_3$6 = {
  key: 1,
  class: "flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300"
};
const _hoisted_4$6 = { class: "hidden lg:flex lg:items-center" };
const _hoisted_5$6 = { class: "ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-white" };
const _hoisted_6$5 = { class: "absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none" };
const _hoisted_7$5 = { class: "px-4 py-3 border-b border-gray-100 dark:border-gray-700" };
const _hoisted_8$5 = { class: "text-sm font-medium text-gray-900 dark:text-white truncate" };
const _hoisted_9$5 = {
  key: 0,
  class: "text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5"
};
const _hoisted_10$4 = { class: "py-1" };
const _hoisted_11$3 = ["href", "onClick"];
const _hoisted_12 = { class: "py-1" };
const _hoisted_13 = ["onClick"];
const _sfc_main$7 = {
  __name: "UserMenu",
  props: {
    userMenu: {
      type: Object,
      default: () => ({})
    },
    spa: {
      type: Boolean,
      default: false
    },
    csrfToken: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const initials = computed(() => {
      const name = props.userMenu.userName ?? "";
      if (!name) return "?";
      return name.split(" ").map((part) => part.charAt(0)).slice(0, 2).join("").toUpperCase();
    });
    const regularItems = computed(() => {
      return (props.userMenu.items ?? []).filter((item) => !item.isPostAction);
    });
    const postItems = computed(() => {
      return (props.userMenu.items ?? []).filter((item) => item.isPostAction);
    });
    function colorClass(color) {
      if (color === "danger") {
        return "text-red-600 dark:text-red-400";
      }
      return "text-gray-700 dark:text-gray-300";
    }
    function submitPost(url) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = url;
      const csrfInput = document.createElement("input");
      csrfInput.type = "hidden";
      csrfInput.name = "_token";
      csrfInput.value = props.csrfToken;
      form.appendChild(csrfInput);
      document.body.appendChild(form);
      form.submit();
    }
    return (_ctx, _cache) => {
      const _component_PrimixDropdown = resolveComponent("PrimixDropdown");
      return openBlock(), createBlock(_component_PrimixDropdown, null, {
        trigger: withCtx(({ toggle }) => [
          createElementVNode("button", {
            type: "button",
            class: "-m-1.5 flex items-center p-1.5",
            onClick: toggle
          }, [
            _cache[1] || (_cache[1] = createElementVNode(
              "span",
              { class: "sr-only" },
              "Open user menu",
              -1
              /* CACHED */
            )),
            createCommentVNode(" Avatar "),
            __props.userMenu.avatarUrl ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: __props.userMenu.avatarUrl,
              alt: __props.userMenu.userName,
              class: "h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 object-cover"
            }, null, 8, _hoisted_2$6)) : (openBlock(), createElementBlock(
              "span",
              _hoisted_3$6,
              toDisplayString(initials.value),
              1
              /* TEXT */
            )),
            createElementVNode("span", _hoisted_4$6, [
              createElementVNode(
                "span",
                _hoisted_5$6,
                toDisplayString(__props.userMenu.userName ?? "User"),
                1
                /* TEXT */
              ),
              _cache[0] || (_cache[0] = createElementVNode(
                "svg",
                {
                  class: "ml-2 h-5 w-5 text-gray-400",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                },
                [
                  createElementVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
                    "clip-rule": "evenodd"
                  })
                ],
                -1
                /* CACHED */
              ))
            ])
          ], 8, _hoisted_1$7)
        ]),
        default: withCtx(({ close }) => [
          createElementVNode("div", _hoisted_6$5, [
            createCommentVNode(" User info header "),
            createElementVNode("div", _hoisted_7$5, [
              createElementVNode(
                "p",
                _hoisted_8$5,
                toDisplayString(__props.userMenu.userName),
                1
                /* TEXT */
              ),
              __props.userMenu.userEmail ? (openBlock(), createElementBlock(
                "p",
                _hoisted_9$5,
                toDisplayString(__props.userMenu.userEmail),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true)
            ]),
            createCommentVNode(" Menu items "),
            createElementVNode("div", _hoisted_10$4, [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(regularItems.value, (item, index) => {
                  return openBlock(), createElementBlock("a", mergeProps({
                    key: index,
                    href: item.url
                  }, { ref_for: true }, __props.spa ? { "data-livue-navigate": "true" } : {}, {
                    class: "flex w-full items-center gap-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                    onClick: close
                  }), toDisplayString(item.label), 17, _hoisted_11$3);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            createCommentVNode(" Logout (post actions) "),
            postItems.value.length > 0 ? (openBlock(), createElementBlock(
              Fragment,
              { key: 0 },
              [
                _cache[2] || (_cache[2] = createElementVNode(
                  "div",
                  { class: "border-t border-gray-100 dark:border-gray-700" },
                  null,
                  -1
                  /* CACHED */
                )),
                createElementVNode("div", _hoisted_12, [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(postItems.value, (item, index) => {
                      return openBlock(), createElementBlock("button", {
                        key: "post-" + index,
                        type: "button",
                        class: normalizeClass(["flex w-full items-center gap-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700", colorClass(item.color)]),
                        onClick: ($event) => {
                          submitPost(item.url);
                          close();
                        }
                      }, toDisplayString(item.label), 11, _hoisted_13);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            )) : createCommentVNode("v-if", true)
          ])
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
};
const _hoisted_1$6 = ["onClick"];
const _hoisted_2$5 = { class: "hidden lg:flex lg:items-center" };
const _hoisted_3$5 = { class: "ml-2 text-sm font-semibold leading-6 text-gray-900 dark:text-white" };
const _hoisted_4$5 = { class: "absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none" };
const _hoisted_5$5 = { class: "px-4 py-3 border-b border-gray-100 dark:border-gray-700" };
const _hoisted_6$4 = { class: "text-sm font-semibold text-gray-900 dark:text-white truncate mt-1" };
const _hoisted_7$4 = {
  key: 0,
  class: "py-1"
};
const _hoisted_8$4 = ["href", "onClick"];
const _hoisted_9$4 = { class: "truncate" };
const _hoisted_10$3 = { class: "py-1" };
const _hoisted_11$2 = ["href", "onClick"];
const _sfc_main$6 = {
  __name: "TenantMenu",
  props: {
    tenantMenu: {
      type: Object,
      default: () => ({})
    },
    spa: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const menuItems = computed(() => {
      return props.tenantMenu.items ?? [];
    });
    return (_ctx, _cache) => {
      const _component_PrimixDropdown = resolveComponent("PrimixDropdown");
      return openBlock(), createBlock(_component_PrimixDropdown, null, {
        trigger: withCtx(({ toggle }) => [
          createElementVNode("button", {
            type: "button",
            class: "-m-1.5 flex items-center p-1.5",
            onClick: toggle
          }, [
            _cache[1] || (_cache[1] = createElementVNode(
              "span",
              { class: "sr-only" },
              "Open tenant menu",
              -1
              /* CACHED */
            )),
            createCommentVNode(" Building icon "),
            _cache[2] || (_cache[2] = createElementVNode(
              "svg",
              {
                class: "h-5 w-5 text-gray-500 dark:text-gray-400",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              },
              [
                createElementVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                })
              ],
              -1
              /* CACHED */
            )),
            createElementVNode("span", _hoisted_2$5, [
              createElementVNode(
                "span",
                _hoisted_3$5,
                toDisplayString(__props.tenantMenu.currentTenantName ?? "Tenant"),
                1
                /* TEXT */
              ),
              _cache[0] || (_cache[0] = createElementVNode(
                "svg",
                {
                  class: "ml-2 h-5 w-5 text-gray-400",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                },
                [
                  createElementVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
                    "clip-rule": "evenodd"
                  })
                ],
                -1
                /* CACHED */
              ))
            ])
          ], 8, _hoisted_1$6)
        ]),
        default: withCtx(({ close }) => [
          createElementVNode("div", _hoisted_4$5, [
            createCommentVNode(" Current tenant header "),
            createElementVNode("div", _hoisted_5$5, [
              _cache[3] || (_cache[3] = createElementVNode(
                "p",
                { class: "text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" },
                " Current tenant ",
                -1
                /* CACHED */
              )),
              createElementVNode(
                "p",
                _hoisted_6$4,
                toDisplayString(__props.tenantMenu.currentTenantName),
                1
                /* TEXT */
              )
            ]),
            createCommentVNode(" Switch to other tenants "),
            __props.tenantMenu.tenants && __props.tenantMenu.tenants.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_7$4, [
              _cache[5] || (_cache[5] = createElementVNode(
                "p",
                { class: "px-4 py-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" },
                " Switch to ",
                -1
                /* CACHED */
              )),
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(__props.tenantMenu.tenants, (tenant) => {
                  return openBlock(), createElementBlock("a", {
                    key: tenant.id,
                    href: tenant.url,
                    class: "flex w-full items-center gap-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                    onClick: close
                  }, [
                    _cache[4] || (_cache[4] = createElementVNode(
                      "svg",
                      {
                        class: "h-4 w-4 text-gray-400 flex-shrink-0",
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor"
                      },
                      [
                        createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                        })
                      ],
                      -1
                      /* CACHED */
                    )),
                    createElementVNode(
                      "span",
                      _hoisted_9$4,
                      toDisplayString(tenant.name),
                      1
                      /* TEXT */
                    )
                  ], 8, _hoisted_8$4);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : createCommentVNode("v-if", true),
            createCommentVNode(" Custom menu items "),
            menuItems.value.length > 0 ? (openBlock(), createElementBlock(
              Fragment,
              { key: 1 },
              [
                _cache[6] || (_cache[6] = createElementVNode(
                  "div",
                  { class: "border-t border-gray-100 dark:border-gray-700" },
                  null,
                  -1
                  /* CACHED */
                )),
                createElementVNode("div", _hoisted_10$3, [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(menuItems.value, (item, index) => {
                      return openBlock(), createElementBlock("a", mergeProps({
                        key: "item-" + index,
                        href: item.url
                      }, { ref_for: true }, __props.spa ? { "data-livue-navigate": "true" } : {}, {
                        class: "flex w-full items-center gap-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                        onClick: close
                      }), toDisplayString(item.label), 17, _hoisted_11$2);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            )) : createCommentVNode("v-if", true)
          ])
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const SearchResults = defineComponent({
  name: "SearchResults",
  props: {
    groups: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    query: { type: String, default: "" },
    selectedIndex: { type: Number, default: -1 },
    spa: { type: Boolean, default: false }
  },
  emits: ["select"],
  setup(props, { emit }) {
    let flatIndex = -1;
    return () => {
      flatIndex = -1;
      if (!props.loading && props.query.length >= 2 && props.groups.length === 0) {
        return h$1("div", { class: "px-6 py-14 text-center text-sm text-gray-500 dark:text-gray-400" }, [
          h$1("svg", {
            class: "mx-auto h-6 w-6 text-gray-400 mb-2",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor"
          }, [
            h$1("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            })
          ]),
          h$1("p", "No results found.")
        ]);
      }
      if (props.query.length < 2 && props.groups.length === 0) {
        return null;
      }
      return h$1("div", { class: "py-2" }, props.groups.map((group) => {
        return h$1("div", { key: group.label }, [
          // Group header
          h$1("div", { class: "px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-x-2" }, [
            group.label,
            group.panelLabel ? h$1("span", {
              class: "inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300 normal-case tracking-normal"
            }, group.panelLabel) : null
          ]),
          // Results
          ...group.results.map((result) => {
            flatIndex++;
            const currentIndex = flatIndex;
            const isSelected = currentIndex === props.selectedIndex;
            return h$1("a", {
              key: result.url,
              href: result.url,
              class: [
                "flex items-center gap-x-3 px-4 py-2.5 cursor-pointer transition-colors",
                isSelected ? "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              ],
              ...props.spa ? { "data-livue-navigate": "true" } : {},
              onClick(e) {
                e.preventDefault();
                emit("select", result.url);
              }
            }, [
              h$1("div", { class: "flex-1 min-w-0" }, [
                h$1("div", { class: "text-sm font-medium truncate" }, result.title),
                Object.keys(result.details || {}).length > 0 ? h$1(
                  "div",
                  { class: "flex items-center gap-x-3 mt-0.5" },
                  Object.entries(result.details).map(
                    ([key, value]) => h$1("span", { key, class: "text-xs text-gray-500 dark:text-gray-400" }, [
                      h$1("span", { class: "font-medium" }, key + ": "),
                      String(value)
                    ])
                  )
                ) : null
              ]),
              isSelected ? h$1("svg", {
                class: "h-4 w-4 flex-shrink-0 text-gray-400",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "2",
                stroke: "currentColor"
              }, [
                h$1("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                })
              ]) : null
            ]);
          })
        ]);
      }));
    };
  }
});
const _sfc_main$5 = {
  name: "PrimixGlobalSearch",
  components: { SearchResults },
  props: {
    mode: {
      type: String,
      default: "spotlight",
      validator: (v2) => ["spotlight", "dropdown"].includes(v2)
    },
    spa: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const livue = inject("livue");
    const isOpen = ref(false);
    const query = ref("");
    const results = ref([]);
    const loading = ref(false);
    const selectedIndex = ref(-1);
    const spotlightInputRef = ref(null);
    const dropdownInputRef = ref(null);
    const spotlightRef = ref(null);
    const dropdownRef = ref(null);
    const isMac = computed(() => {
      return typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    });
    const totalResults = computed(() => {
      return results.value.reduce((sum, group) => sum + group.results.length, 0);
    });
    let debounceTimer = null;
    function open() {
      isOpen.value = true;
      query.value = "";
      results.value = [];
      selectedIndex.value = -1;
      nextTick(() => {
        if (props.mode === "spotlight" && spotlightInputRef.value) {
          spotlightInputRef.value.focus();
        } else if (props.mode === "dropdown" && dropdownInputRef.value) {
          dropdownInputRef.value.focus();
        }
      });
    }
    function close() {
      isOpen.value = false;
      query.value = "";
      results.value = [];
      selectedIndex.value = -1;
    }
    function moveSelection(delta) {
      const total = totalResults.value;
      if (total === 0) return;
      let next = selectedIndex.value + delta;
      if (next < 0) next = total - 1;
      if (next >= total) next = 0;
      selectedIndex.value = next;
    }
    function selectCurrent() {
      if (selectedIndex.value < 0 || totalResults.value === 0) return;
      let idx = 0;
      for (const group of results.value) {
        for (const result of group.results) {
          if (idx === selectedIndex.value) {
            navigateTo(result.url);
            return;
          }
          idx++;
        }
      }
    }
    function navigateTo(url) {
      close();
      if (props.spa) {
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("data-livue-navigate", "true");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.location.href = url;
      }
    }
    watch(query, (newQuery) => {
      clearTimeout(debounceTimer);
      selectedIndex.value = -1;
      if (newQuery.length < 2) {
        results.value = [];
        loading.value = false;
        return;
      }
      loading.value = true;
      debounceTimer = setTimeout(async () => {
        try {
          const response = await livue.search(newQuery);
          results.value = response || [];
        } catch {
          results.value = [];
        } finally {
          loading.value = false;
        }
      }, 300);
    });
    function handleKeydown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen.value) {
          close();
        } else {
          open();
        }
      }
    }
    function handleClickOutside(e) {
      if (props.mode !== "dropdown" || !isOpen.value) return;
      if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
        close();
      }
    }
    onMounted(() => {
      document.addEventListener("keydown", handleKeydown);
      document.addEventListener("mousedown", handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(debounceTimer);
    });
    return {
      isOpen,
      query,
      results,
      loading,
      selectedIndex,
      spotlightInputRef,
      dropdownInputRef,
      spotlightRef,
      dropdownRef,
      isMac,
      open,
      close,
      moveSelection,
      selectCurrent,
      navigateTo
    };
  }
};
const _hoisted_1$5 = { class: "relative flex flex-1 items-center" };
const _hoisted_2$4 = {
  key: 0,
  class: "hidden sm:inline-flex ml-auto items-center gap-x-0.5 rounded border border-gray-300 dark:border-gray-600 px-1.5 py-0.5 text-xs text-gray-400 font-sans"
};
const _hoisted_3$4 = {
  title: "Command",
  class: "no-underline"
};
const _hoisted_4$4 = {
  key: 0,
  ref: "dropdownRef",
  class: "absolute left-0 right-0 top-full mt-1 z-50 max-h-96 overflow-y-auto rounded-lg bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black/5 dark:ring-white/10"
};
const _hoisted_5$4 = { class: "p-3" };
const _hoisted_6$3 = { class: "relative" };
const _hoisted_7$3 = {
  ref: "spotlightRef",
  class: "relative w-full max-w-xl rounded-xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
};
const _hoisted_8$3 = { class: "flex items-center border-b border-gray-200 dark:border-gray-700 px-4" };
const _hoisted_9$3 = {
  key: 0,
  class: "flex-shrink-0"
};
const _hoisted_10$2 = { class: "max-h-80 overflow-y-auto" };
const _hoisted_11$1 = {
  key: 0,
  class: "flex items-center justify-end gap-x-4 border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-xs text-gray-400"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_search_results = resolveComponent("search-results");
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      createCommentVNode(" Trigger button (always visible in topbar) "),
      createElementVNode("div", _hoisted_1$5, [
        createElementVNode("button", {
          type: "button",
          class: "flex flex-1 items-center gap-x-2 rounded-md px-3 py-2 text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors",
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.open && $setup.open(...args))
        }, [
          _cache[14] || (_cache[14] = createElementVNode(
            "svg",
            {
              class: "h-5 w-5 flex-shrink-0",
              viewBox: "0 0 20 20",
              fill: "currentColor"
            },
            [
              createElementVNode("path", {
                "fill-rule": "evenodd",
                d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
                "clip-rule": "evenodd"
              })
            ],
            -1
            /* CACHED */
          )),
          _cache[15] || (_cache[15] = createElementVNode(
            "span",
            { class: "hidden sm:inline" },
            "Search...",
            -1
            /* CACHED */
          )),
          $props.mode === "spotlight" ? (openBlock(), createElementBlock("kbd", _hoisted_2$4, [
            createElementVNode(
              "abbr",
              _hoisted_3$4,
              toDisplayString($setup.isMac ? "⌘" : "Ctrl"),
              1
              /* TEXT */
            ),
            _cache[13] || (_cache[13] = createTextVNode(
              "K ",
              -1
              /* CACHED */
            ))
          ])) : createCommentVNode("v-if", true)
        ]),
        createCommentVNode(" Dropdown mode: results panel "),
        $props.mode === "dropdown" && $setup.isOpen ? (openBlock(), createElementBlock(
          "div",
          _hoisted_4$4,
          [
            createElementVNode("div", _hoisted_5$4, [
              createElementVNode("div", _hoisted_6$3, [
                _cache[16] || (_cache[16] = createElementVNode(
                  "svg",
                  {
                    class: "pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 ml-3",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  },
                  [
                    createElementVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
                      "clip-rule": "evenodd"
                    })
                  ],
                  -1
                  /* CACHED */
                )),
                withDirectives(createElementVNode(
                  "input",
                  {
                    ref: "dropdownInputRef",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.query = $event),
                    type: "search",
                    class: "block w-full border-0 bg-transparent py-2 pl-10 pr-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm",
                    placeholder: "Search...",
                    onKeydown: [
                      _cache[2] || (_cache[2] = withKeys((...args) => $setup.close && $setup.close(...args), ["escape"])),
                      _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => $setup.moveSelection(1), ["prevent"]), ["down"])),
                      _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => $setup.moveSelection(-1), ["prevent"]), ["up"])),
                      _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => $setup.selectCurrent && $setup.selectCurrent(...args), ["prevent"]), ["enter"]))
                    ]
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [vModelText, $setup.query]
                ])
              ])
            ]),
            createVNode(_component_search_results, {
              groups: $setup.results,
              loading: $setup.loading,
              query: $setup.query,
              "selected-index": $setup.selectedIndex,
              spa: $props.spa,
              onSelect: $setup.navigateTo
            }, null, 8, ["groups", "loading", "query", "selected-index", "spa", "onSelect"])
          ],
          512
          /* NEED_PATCH */
        )) : createCommentVNode("v-if", true)
      ]),
      createCommentVNode(" Spotlight mode: modal overlay "),
      (openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Transition, {
          "enter-active-class": "transition-opacity duration-200 ease-out",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition-opacity duration-150 ease-in",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            $props.mode === "spotlight" && $setup.isOpen ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4",
              onClick: _cache[12] || (_cache[12] = withModifiers((...args) => $setup.close && $setup.close(...args), ["self"]))
            }, [
              createCommentVNode(" Backdrop "),
              createElementVNode("div", {
                class: "fixed inset-0 bg-gray-900/50 dark:bg-gray-900/75",
                onClick: _cache[6] || (_cache[6] = (...args) => $setup.close && $setup.close(...args))
              }),
              createCommentVNode(" Modal "),
              createElementVNode(
                "div",
                _hoisted_7$3,
                [
                  createCommentVNode(" Search input "),
                  createElementVNode("div", _hoisted_8$3, [
                    _cache[18] || (_cache[18] = createElementVNode(
                      "svg",
                      {
                        class: "h-5 w-5 text-gray-400 flex-shrink-0",
                        viewBox: "0 0 20 20",
                        fill: "currentColor"
                      },
                      [
                        createElementVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
                          "clip-rule": "evenodd"
                        })
                      ],
                      -1
                      /* CACHED */
                    )),
                    withDirectives(createElementVNode(
                      "input",
                      {
                        ref: "spotlightInputRef",
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.query = $event),
                        type: "search",
                        class: "block w-full border-0 bg-transparent py-4 pl-3 pr-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm",
                        placeholder: "Search...",
                        onKeydown: [
                          _cache[8] || (_cache[8] = withKeys((...args) => $setup.close && $setup.close(...args), ["escape"])),
                          _cache[9] || (_cache[9] = withKeys(withModifiers(($event) => $setup.moveSelection(1), ["prevent"]), ["down"])),
                          _cache[10] || (_cache[10] = withKeys(withModifiers(($event) => $setup.moveSelection(-1), ["prevent"]), ["up"])),
                          _cache[11] || (_cache[11] = withKeys(withModifiers((...args) => $setup.selectCurrent && $setup.selectCurrent(...args), ["prevent"]), ["enter"]))
                        ]
                      },
                      null,
                      544
                      /* NEED_HYDRATION, NEED_PATCH */
                    ), [
                      [vModelText, $setup.query]
                    ]),
                    $setup.loading ? (openBlock(), createElementBlock("div", _hoisted_9$3, [..._cache[17] || (_cache[17] = [
                      createElementVNode(
                        "svg",
                        {
                          class: "h-5 w-5 animate-spin text-gray-400",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24"
                        },
                        [
                          createElementVNode("circle", {
                            class: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            "stroke-width": "4"
                          }),
                          createElementVNode("path", {
                            class: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          })
                        ],
                        -1
                        /* CACHED */
                      )
                    ])])) : createCommentVNode("v-if", true)
                  ]),
                  createCommentVNode(" Results "),
                  createElementVNode("div", _hoisted_10$2, [
                    createVNode(_component_search_results, {
                      groups: $setup.results,
                      loading: $setup.loading,
                      query: $setup.query,
                      "selected-index": $setup.selectedIndex,
                      spa: $props.spa,
                      onSelect: $setup.navigateTo
                    }, null, 8, ["groups", "loading", "query", "selected-index", "spa", "onSelect"])
                  ]),
                  createCommentVNode(" Footer "),
                  $setup.results.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_11$1, [..._cache[19] || (_cache[19] = [
                    createElementVNode(
                      "span",
                      { class: "flex items-center gap-x-1" },
                      [
                        createElementVNode("kbd", { class: "rounded border border-gray-300 dark:border-gray-600 px-1 py-0.5 font-sans" }, "↑↓"),
                        createTextVNode(" Navigate ")
                      ],
                      -1
                      /* CACHED */
                    ),
                    createElementVNode(
                      "span",
                      { class: "flex items-center gap-x-1" },
                      [
                        createElementVNode("kbd", { class: "rounded border border-gray-300 dark:border-gray-600 px-1 py-0.5 font-sans" }, "↵"),
                        createTextVNode(" Open ")
                      ],
                      -1
                      /* CACHED */
                    ),
                    createElementVNode(
                      "span",
                      { class: "flex items-center gap-x-1" },
                      [
                        createElementVNode("kbd", { class: "rounded border border-gray-300 dark:border-gray-600 px-1 py-0.5 font-sans" }, "Esc"),
                        createTextVNode(" Close ")
                      ],
                      -1
                      /* CACHED */
                    )
                  ])])) : createCommentVNode("v-if", true)
                ],
                512
                /* NEED_PATCH */
              )
            ])) : createCommentVNode("v-if", true)
          ]),
          _: 1
          /* STABLE */
        })
      ]))
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
const GlobalSearch = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render]]);
const _hoisted_1$4 = { class: "flex-shrink-0 mt-2 w-2" };
const _hoisted_2$3 = {
  key: 0,
  class: "w-2 h-2 rounded-full bg-blue-500"
};
const _hoisted_3$3 = {
  key: 0,
  class: "flex-shrink-0 mt-0.5"
};
const _hoisted_4$3 = { class: "flex-1 min-w-0" };
const _hoisted_5$3 = { class: "flex items-start justify-between gap-2" };
const _hoisted_6$2 = {
  key: 0,
  class: "text-sm font-medium text-gray-900 dark:text-white"
};
const _hoisted_7$2 = {
  key: 1,
  class: "text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap flex-shrink-0"
};
const _hoisted_8$2 = {
  key: 0,
  class: "text-sm text-gray-500 dark:text-gray-400 mt-0.5"
};
const _hoisted_9$2 = {
  key: 1,
  class: "mt-2 flex flex-wrap gap-3"
};
const _hoisted_10$1 = ["href"];
const _sfc_main$4 = {
  __name: "NotificationItem",
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  emits: ["mark-read", "navigate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const colorMap = {
      success: "text-green-500",
      danger: "text-red-500",
      warning: "text-yellow-500",
      info: "text-blue-500",
      primary: "text-blue-500",
      gray: "text-gray-400"
    };
    function colorClass(color) {
      return colorMap[color] || "text-gray-400";
    }
    const timeAgoString = computed(() => {
      if (!props.notification.created_at) return "";
      const date = new Date(props.notification.created_at);
      const now = /* @__PURE__ */ new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1e3);
      if (diffInSeconds < 60) return "adesso";
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) {
        return diffInMinutes === 1 ? "1 min fa" : `${diffInMinutes} min fa`;
      }
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return diffInHours === 1 ? "1 ora fa" : `${diffInHours} ore fa`;
      }
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) {
        return diffInDays === 1 ? "1 giorno fa" : `${diffInDays} giorni fa`;
      }
      const diffInWeeks = Math.floor(diffInDays / 7);
      return diffInWeeks === 1 ? "1 settimana fa" : `${diffInWeeks} settimane fa`;
    });
    function handleClick() {
      if (!props.notification.read_at) {
        emit("mark-read", props.notification.id);
      }
      if (props.notification.url) {
        emit("navigate", props.notification.url);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([
            "flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
            !__props.notification.read_at ? "bg-primary-50/50 dark:bg-primary-900/10" : ""
          ]),
          onClick: handleClick
        },
        [
          createCommentVNode(" Unread dot "),
          createElementVNode("div", _hoisted_1$4, [
            !__props.notification.read_at ? (openBlock(), createElementBlock("div", _hoisted_2$3)) : createCommentVNode("v-if", true)
          ]),
          createCommentVNode(" Icon "),
          __props.notification.icon ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
            __props.notification.icon === "heroicon-o-check-circle" ? (openBlock(), createElementBlock(
              "svg",
              {
                key: 0,
                class: normalizeClass(["h-5 w-5", colorClass(__props.notification.color)]),
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              },
              [..._cache[1] || (_cache[1] = [
                createElementVNode(
                  "path",
                  {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  },
                  null,
                  -1
                  /* CACHED */
                )
              ])],
              2
              /* CLASS */
            )) : __props.notification.icon === "heroicon-o-exclamation-triangle" ? (openBlock(), createElementBlock(
              "svg",
              {
                key: 1,
                class: normalizeClass(["h-5 w-5", colorClass(__props.notification.color)]),
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              },
              [..._cache[2] || (_cache[2] = [
                createElementVNode(
                  "path",
                  {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  },
                  null,
                  -1
                  /* CACHED */
                )
              ])],
              2
              /* CLASS */
            )) : __props.notification.icon === "heroicon-o-x-circle" ? (openBlock(), createElementBlock(
              "svg",
              {
                key: 2,
                class: normalizeClass(["h-5 w-5", colorClass(__props.notification.color)]),
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              },
              [..._cache[3] || (_cache[3] = [
                createElementVNode(
                  "path",
                  {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  },
                  null,
                  -1
                  /* CACHED */
                )
              ])],
              2
              /* CLASS */
            )) : __props.notification.icon === "heroicon-o-information-circle" ? (openBlock(), createElementBlock(
              "svg",
              {
                key: 3,
                class: normalizeClass(["h-5 w-5", colorClass(__props.notification.color)]),
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              },
              [..._cache[4] || (_cache[4] = [
                createElementVNode(
                  "path",
                  {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  },
                  null,
                  -1
                  /* CACHED */
                )
              ])],
              2
              /* CLASS */
            )) : createCommentVNode("v-if", true)
          ])) : createCommentVNode("v-if", true),
          createCommentVNode(" Content "),
          createElementVNode("div", _hoisted_4$3, [
            createElementVNode("div", _hoisted_5$3, [
              __props.notification.title ? (openBlock(), createElementBlock(
                "p",
                _hoisted_6$2,
                toDisplayString(__props.notification.title),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true),
              timeAgoString.value ? (openBlock(), createElementBlock(
                "span",
                _hoisted_7$2,
                toDisplayString(timeAgoString.value),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true)
            ]),
            __props.notification.body ? (openBlock(), createElementBlock(
              "p",
              _hoisted_8$2,
              toDisplayString(__props.notification.body),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            __props.notification.actions && __props.notification.actions.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_9$2, [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(__props.notification.actions, (action) => {
                  return openBlock(), createElementBlock("a", {
                    key: action.label,
                    href: action.url,
                    class: "text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400",
                    onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                    }, ["stop"]))
                  }, toDisplayString(action.label), 9, _hoisted_10$1);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : createCommentVNode("v-if", true)
          ])
        ],
        2
        /* CLASS */
      );
    };
  }
};
const _hoisted_1$3 = { class: "absolute right-0 z-50 mt-2 w-96 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10" };
const _hoisted_2$2 = { class: "flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700" };
const _hoisted_3$2 = { class: "text-sm font-semibold text-gray-900 dark:text-white" };
const _hoisted_4$2 = {
  key: 0,
  class: "ml-1 text-xs font-normal text-gray-500 dark:text-gray-400"
};
const _hoisted_5$2 = { class: "max-h-[32rem] overflow-y-auto" };
const _hoisted_6$1 = { class: "px-4 py-8 text-center" };
const _hoisted_7$1 = { class: "mt-2 text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_8$1 = {
  key: 0,
  class: "border-t border-gray-100 dark:border-gray-700"
};
const _hoisted_9$1 = ["disabled"];
const _sfc_main$3 = {
  __name: "NotificationPopup",
  props: {
    notifications: {
      type: Array,
      default: () => []
    },
    unreadCount: {
      type: Number,
      default: 0
    },
    hasMore: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    translations: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["load-more", "mark-read", "mark-all-read", "navigate"],
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createCommentVNode(" Header "),
        createElementVNode("div", _hoisted_2$2, [
          createElementVNode("h3", _hoisted_3$2, [
            createTextVNode(
              toDisplayString(__props.translations.title || "Notifications") + " ",
              1
              /* TEXT */
            ),
            __props.unreadCount > 0 ? (openBlock(), createElementBlock(
              "span",
              _hoisted_4$2,
              " (" + toDisplayString(__props.unreadCount) + ") ",
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true)
          ]),
          __props.unreadCount > 0 ? (openBlock(), createElementBlock(
            "button",
            {
              key: 0,
              type: "button",
              class: "text-xs text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("mark-all-read"))
            },
            toDisplayString(__props.translations.mark_all_read || "Mark all as read"),
            1
            /* TEXT */
          )) : createCommentVNode("v-if", true)
        ]),
        createCommentVNode(" Notification list "),
        createElementVNode("div", _hoisted_5$2, [
          __props.notifications.length > 0 ? (openBlock(true), createElementBlock(
            Fragment,
            { key: 0 },
            renderList(__props.notifications, (notification) => {
              return openBlock(), createBlock(_sfc_main$4, {
                key: notification.id,
                notification,
                onMarkRead: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("mark-read", $event)),
                onNavigate: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("navigate", $event))
              }, null, 8, ["notification"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )) : (openBlock(), createElementBlock(
            Fragment,
            { key: 1 },
            [
              createCommentVNode(" Empty state "),
              createElementVNode("div", _hoisted_6$1, [
                _cache[4] || (_cache[4] = createElementVNode(
                  "svg",
                  {
                    class: "mx-auto h-8 w-8 text-gray-300 dark:text-gray-600",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor"
                  },
                  [
                    createElementVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M9.143 17.082a24.248 24.248 0 0 0 5.714 0m-5.714 0a2.25 2.25 0 0 1-2.244-2.077L6.394 5.694a6.001 6.001 0 0 1 11.212 0l-.505 9.311a2.25 2.25 0 0 1-2.244 2.077m-5.714 0a3 3 0 0 0 5.714 0"
                    })
                  ],
                  -1
                  /* CACHED */
                )),
                createElementVNode(
                  "p",
                  _hoisted_7$1,
                  toDisplayString(__props.translations.no_notifications || "No notifications"),
                  1
                  /* TEXT */
                )
              ])
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          ))
        ]),
        createCommentVNode(" Load more "),
        __props.hasMore ? (openBlock(), createElementBlock("div", _hoisted_8$1, [
          createElementVNode("button", {
            type: "button",
            class: "w-full px-4 py-2 text-xs text-center text-primary-600 hover:bg-gray-50 dark:text-primary-400 dark:hover:bg-gray-700/50 font-medium",
            disabled: __props.loading,
            onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("load-more"))
          }, toDisplayString(__props.loading ? __props.translations.loading || "Loading..." : __props.translations.load_more || "Load more"), 9, _hoisted_9$1)
        ])) : createCommentVNode("v-if", true)
      ]);
    };
  }
};
const _hoisted_1$2 = {
  key: 0,
  class: "fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-gray-800 shadow-xl flex flex-col"
};
const _hoisted_2$1 = { class: "flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700" };
const _hoisted_3$1 = { class: "text-base font-semibold text-gray-900 dark:text-white" };
const _hoisted_4$1 = {
  key: 0,
  class: "ml-1 text-sm font-normal text-gray-500 dark:text-gray-400"
};
const _hoisted_5$1 = { class: "flex items-center gap-3" };
const _hoisted_6 = { class: "sr-only" };
const _hoisted_7 = { class: "flex-1 overflow-y-auto" };
const _hoisted_8 = { class: "px-4 py-12 text-center" };
const _hoisted_9 = { class: "mt-3 text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_10 = {
  key: 0,
  class: "border-t border-gray-200 dark:border-gray-700"
};
const _hoisted_11 = ["disabled"];
const _sfc_main$2 = {
  __name: "NotificationDrawer",
  props: {
    open: {
      type: Boolean,
      default: false
    },
    notifications: {
      type: Array,
      default: () => []
    },
    unreadCount: {
      type: Number,
      default: 0
    },
    hasMore: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    translations: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["close", "load-more", "mark-read", "mark-all-read", "navigate"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        emit("close");
      }
    }
    onMounted(() => {
      document.addEventListener("keydown", handleEscapeKey);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", handleEscapeKey);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createCommentVNode(" Backdrop "),
        createVNode(Transition, {
          "enter-active-class": "transition-opacity ease-linear duration-300",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition-opacity ease-linear duration-300",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            __props.open ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "fixed inset-0 z-50 bg-gray-900/50",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
            })) : createCommentVNode("v-if", true)
          ]),
          _: 1
          /* STABLE */
        }),
        createCommentVNode(" Panel "),
        createVNode(Transition, {
          "enter-active-class": "transform transition ease-in-out duration-300",
          "enter-from-class": "translate-x-full",
          "enter-to-class": "translate-x-0",
          "leave-active-class": "transform transition ease-in-out duration-300",
          "leave-from-class": "translate-x-0",
          "leave-to-class": "translate-x-full"
        }, {
          default: withCtx(() => [
            __props.open ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
              createCommentVNode(" Header "),
              createElementVNode("div", _hoisted_2$1, [
                createElementVNode("h2", _hoisted_3$1, [
                  createTextVNode(
                    toDisplayString(__props.translations.title || "Notifications") + " ",
                    1
                    /* TEXT */
                  ),
                  __props.unreadCount > 0 ? (openBlock(), createElementBlock(
                    "span",
                    _hoisted_4$1,
                    " (" + toDisplayString(__props.unreadCount) + ") ",
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true)
                ]),
                createElementVNode("div", _hoisted_5$1, [
                  __props.unreadCount > 0 ? (openBlock(), createElementBlock(
                    "button",
                    {
                      key: 0,
                      type: "button",
                      class: "text-xs text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium",
                      onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("mark-all-read"))
                    },
                    toDisplayString(__props.translations.mark_all_read || "Mark all as read"),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true),
                  createElementVNode("button", {
                    type: "button",
                    class: "rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300",
                    onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("close"))
                  }, [
                    createElementVNode(
                      "span",
                      _hoisted_6,
                      toDisplayString(__props.translations.close || "Close"),
                      1
                      /* TEXT */
                    ),
                    _cache[6] || (_cache[6] = createElementVNode(
                      "svg",
                      {
                        class: "h-5 w-5",
                        viewBox: "0 0 20 20",
                        fill: "currentColor"
                      },
                      [
                        createElementVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                          "clip-rule": "evenodd"
                        })
                      ],
                      -1
                      /* CACHED */
                    ))
                  ])
                ])
              ]),
              createCommentVNode(" Notification list "),
              createElementVNode("div", _hoisted_7, [
                __props.notifications.length > 0 ? (openBlock(true), createElementBlock(
                  Fragment,
                  { key: 0 },
                  renderList(__props.notifications, (notification) => {
                    return openBlock(), createBlock(_sfc_main$4, {
                      key: notification.id,
                      notification,
                      onMarkRead: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("mark-read", $event)),
                      onNavigate: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("navigate", $event))
                    }, null, 8, ["notification"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )) : (openBlock(), createElementBlock(
                  Fragment,
                  { key: 1 },
                  [
                    createCommentVNode(" Empty state "),
                    createElementVNode("div", _hoisted_8, [
                      _cache[7] || (_cache[7] = createElementVNode(
                        "svg",
                        {
                          class: "mx-auto h-10 w-10 text-gray-300 dark:text-gray-600",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor"
                        },
                        [
                          createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M9.143 17.082a24.248 24.248 0 0 0 5.714 0m-5.714 0a2.25 2.25 0 0 1-2.244-2.077L6.394 5.694a6.001 6.001 0 0 1 11.212 0l-.505 9.311a2.25 2.25 0 0 1-2.244 2.077m-5.714 0a3 3 0 0 0 5.714 0"
                          })
                        ],
                        -1
                        /* CACHED */
                      )),
                      createElementVNode(
                        "p",
                        _hoisted_9,
                        toDisplayString(__props.translations.no_notifications || "No notifications"),
                        1
                        /* TEXT */
                      )
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                ))
              ]),
              createCommentVNode(" Load more footer "),
              __props.hasMore ? (openBlock(), createElementBlock("div", _hoisted_10, [
                createElementVNode("button", {
                  type: "button",
                  class: "w-full px-4 py-3 text-sm text-center text-primary-600 hover:bg-gray-50 dark:text-primary-400 dark:hover:bg-gray-700/50 font-medium",
                  disabled: __props.loading,
                  onClick: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("load-more"))
                }, toDisplayString(__props.loading ? __props.translations.loading || "Loading..." : __props.translations.load_more || "Load more"), 9, _hoisted_11)
              ])) : createCommentVNode("v-if", true)
            ])) : createCommentVNode("v-if", true)
          ]),
          _: 1
          /* STABLE */
        })
      ]);
    };
  }
};
const _hoisted_1$1 = { class: "sr-only" };
const _sfc_main$1 = {
  __name: "NotificationBell",
  props: {
    mode: {
      type: String,
      default: "popup"
    },
    pollingInterval: {
      type: Number,
      default: 30
    },
    translations: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const livue = inject("livue");
    const containerRef2 = ref(null);
    const isOpen = ref(false);
    const notifications = ref([]);
    const unreadCount = ref(0);
    const hasMore = ref(false);
    const loading = ref(false);
    const currentPage = ref(1);
    const previousUnreadCount = ref(0);
    const hasPulse = ref(false);
    let pollingTimer = null;
    async function fetchUnreadCount() {
      try {
        const response = await livue.getUnreadNotificationsCount();
        const count = response.count ?? 0;
        if (count > previousUnreadCount.value) {
          hasPulse.value = true;
          setTimeout(() => {
            hasPulse.value = false;
          }, 2e3);
        }
        previousUnreadCount.value = count;
        unreadCount.value = count;
      } catch {
      }
    }
    async function fetchNotifications() {
      loading.value = true;
      currentPage.value = 1;
      try {
        const response = await livue.getNotifications({ page: 1, perPage: 15 });
        notifications.value = response.data ?? [];
        hasMore.value = response.hasMore ?? false;
        unreadCount.value = response.unreadCount ?? 0;
        previousUnreadCount.value = unreadCount.value;
      } catch {
      } finally {
        loading.value = false;
      }
    }
    async function loadMore() {
      if (loading.value) return;
      loading.value = true;
      currentPage.value += 1;
      try {
        const response = await livue.getNotifications({ page: currentPage.value, perPage: 15 });
        notifications.value = [...notifications.value, ...response.data ?? []];
        hasMore.value = response.hasMore ?? false;
      } catch {
      } finally {
        loading.value = false;
      }
    }
    async function markAsRead(id) {
      try {
        await livue.markNotificationAsRead({ id });
        const notification = notifications.value.find((n) => n.id === id);
        if (notification && !notification.read_at) {
          notification.read_at = (/* @__PURE__ */ new Date()).toISOString();
          unreadCount.value = Math.max(0, unreadCount.value - 1);
        }
      } catch {
      }
    }
    async function markAllAsRead() {
      try {
        await livue.markAllNotificationsAsRead();
        notifications.value.forEach((n) => {
          n.read_at = n.read_at || (/* @__PURE__ */ new Date()).toISOString();
        });
        unreadCount.value = 0;
      } catch {
      }
    }
    function handleNavigate(url) {
      closePanel();
      window.location.href = url;
    }
    function togglePanel() {
      if (!isOpen.value) {
        isOpen.value = true;
        fetchNotifications();
      } else {
        closePanel();
      }
    }
    function closePanel() {
      isOpen.value = false;
    }
    function handleClickOutside(event) {
      if (isOpen.value && props.mode === "popup" && containerRef2.value && !containerRef2.value.contains(event.target)) {
        closePanel();
      }
    }
    onMounted(() => {
      fetchUnreadCount();
      pollingTimer = setInterval(fetchUnreadCount, props.pollingInterval * 1e3);
      document.addEventListener("mousedown", handleClickOutside);
    });
    onUnmounted(() => {
      if (pollingTimer) clearInterval(pollingTimer);
      document.removeEventListener("mousedown", handleClickOutside);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          ref_key: "containerRef",
          ref: containerRef2,
          class: "relative"
        },
        [
          createCommentVNode(" Bell button "),
          createElementVNode("button", {
            type: "button",
            class: "relative rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none",
            onClick: togglePanel
          }, [
            createElementVNode(
              "span",
              _hoisted_1$1,
              toDisplayString(__props.translations.bell_label || "Notifications"),
              1
              /* TEXT */
            ),
            _cache[0] || (_cache[0] = createElementVNode(
              "svg",
              {
                class: "h-6 w-6",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              },
              [
                createElementVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                })
              ],
              -1
              /* CACHED */
            )),
            createCommentVNode(" Badge "),
            unreadCount.value > 0 ? (openBlock(), createElementBlock(
              "span",
              {
                key: 0,
                class: normalizeClass([
                  "absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold min-w-[1.25rem] h-5 px-1",
                  hasPulse.value ? "animate-pulse" : ""
                ])
              },
              toDisplayString(unreadCount.value > 99 ? "99+" : unreadCount.value),
              3
              /* TEXT, CLASS */
            )) : createCommentVNode("v-if", true)
          ]),
          createCommentVNode(" Popup mode "),
          createVNode(Transition, {
            "enter-active-class": "transition ease-out duration-100",
            "enter-from-class": "transform opacity-0 scale-95",
            "enter-to-class": "transform opacity-100 scale-100",
            "leave-active-class": "transition ease-in duration-75",
            "leave-from-class": "transform opacity-100 scale-100",
            "leave-to-class": "transform opacity-0 scale-95"
          }, {
            default: withCtx(() => [
              __props.mode === "popup" && isOpen.value ? (openBlock(), createBlock(_sfc_main$3, {
                key: 0,
                notifications: notifications.value,
                "unread-count": unreadCount.value,
                "has-more": hasMore.value,
                loading: loading.value,
                translations: __props.translations,
                onLoadMore: loadMore,
                onMarkRead: markAsRead,
                onMarkAllRead: markAllAsRead,
                onNavigate: handleNavigate
              }, null, 8, ["notifications", "unread-count", "has-more", "loading", "translations"])) : createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }),
          createCommentVNode(" Drawer mode "),
          __props.mode === "drawer" ? (openBlock(), createBlock(_sfc_main$2, {
            key: 0,
            open: isOpen.value,
            notifications: notifications.value,
            "unread-count": unreadCount.value,
            "has-more": hasMore.value,
            loading: loading.value,
            translations: __props.translations,
            onClose: closePanel,
            onLoadMore: loadMore,
            onMarkRead: markAsRead,
            onMarkAllRead: markAllAsRead,
            onNavigate: handleNavigate
          }, null, 8, ["open", "notifications", "unread-count", "has-more", "loading", "translations"])) : createCommentVNode("v-if", true)
        ],
        512
        /* NEED_PATCH */
      );
    };
  }
};
const STORAGE_KEY = "primix-resource-workspaces:v1";
function normalizeWorkspacePath(pathname) {
  if (typeof pathname !== "string" || pathname === "") {
    return "/";
  }
  const collapsed = pathname.replace(/\/{2,}/g, "/");
  if (collapsed.length > 1 && collapsed.endsWith("/")) {
    return collapsed.slice(0, -1);
  }
  return collapsed;
}
function normalizeWorkspaceSearch(search) {
  if (typeof search !== "string" || search === "") {
    return "";
  }
  const entries = Array.from(new URLSearchParams(search).entries()).sort(([aKey, aValue], [bKey, bValue]) => {
    if (aKey === bKey) {
      return aValue.localeCompare(bValue);
    }
    return aKey.localeCompare(bKey);
  });
  if (entries.length === 0) {
    return "";
  }
  return `?${new URLSearchParams(entries).toString()}`;
}
function normalizeWorkspaceTabId(id, normalizedUrl = null) {
  if (typeof id === "string") {
    const trimmedId = id.trim();
    if (trimmedId.startsWith("key:") && trimmedId.length > 4) {
      return trimmedId;
    }
    const normalizedIdUrl = normalizeWorkspaceUrl(trimmedId);
    if (normalizedIdUrl !== null) {
      return normalizedIdUrl;
    }
  }
  return normalizedUrl;
}
function resolveCurrentTabId(workspace, normalizedUrl) {
  if (typeof workspace?.currentKey === "string" && workspace.currentKey.trim() !== "") {
    return `key:${workspace.currentKey.trim()}`;
  }
  return normalizedUrl;
}
function dedupeWorkspaceTabs(tabs) {
  if (!Array.isArray(tabs) || tabs.length === 0) {
    return [];
  }
  const dedupedTabs = [];
  const dedupedTabsIndex = {};
  for (const tab of tabs) {
    if (!tab || typeof tab !== "object") {
      continue;
    }
    const normalizedUrl = normalizeWorkspaceUrl(tab.url);
    if (normalizedUrl === null) {
      continue;
    }
    const normalizedTab = {
      id: normalizeWorkspaceTabId(tab.id, normalizedUrl),
      url: normalizedUrl,
      title: typeof tab.title === "string" ? tab.title : "",
      updatedAt: typeof tab.updatedAt === "number" ? tab.updatedAt : Date.now()
    };
    const existingIndex = dedupedTabsIndex[normalizedTab.id];
    if (existingIndex === void 0) {
      dedupedTabsIndex[normalizedTab.id] = dedupedTabs.length;
      dedupedTabs.push(normalizedTab);
      continue;
    }
    const existingTab = dedupedTabs[existingIndex];
    const existingUpdatedAt = existingTab.updatedAt;
    if (existingTab.title.trim() === "" && normalizedTab.title.trim() !== "") {
      existingTab.title = normalizedTab.title;
    }
    existingTab.updatedAt = Math.max(existingUpdatedAt, normalizedTab.updatedAt);
    if (normalizedTab.updatedAt >= existingUpdatedAt) {
      existingTab.url = normalizedTab.url;
    }
  }
  return dedupedTabs;
}
function normalizeWorkspaceUrl(url) {
  if (typeof url !== "string" || url.trim() === "") {
    return null;
  }
  try {
    const parsed = new URL(url, window.location.origin);
    const pathname = normalizeWorkspacePath(parsed.pathname);
    const search = normalizeWorkspaceSearch(parsed.search);
    return `${pathname}${search}`;
  } catch {
    return null;
  }
}
function decodeWorkspaceState(raw) {
  if (!raw || typeof raw !== "object") {
    return {};
  }
  const workspaces = {};
  for (const [key, workspace] of Object.entries(raw)) {
    if (!workspace || typeof workspace !== "object") {
      continue;
    }
    const tabs = Array.isArray(workspace.tabs) ? workspace.tabs : [];
    const dedupedTabs = dedupeWorkspaceTabs(tabs);
    const activeTabId = normalizeWorkspaceTabId(workspace.activeTabId, null);
    workspaces[key] = {
      tabs: dedupedTabs,
      activeTabId: activeTabId && dedupedTabs.some((tab) => tab.id === activeTabId) ? activeTabId : null
    };
  }
  return workspaces;
}
const storeDefinition = {
  state: () => ({
    hydrated: false,
    workspaces: {}
  }),
  actions: {
    workspaceKey(workspace) {
      const panelId = workspace?.panelId || "default";
      const resourceSlug = workspace?.resourceSlug || "resource";
      return `${panelId}::${resourceSlug}`;
    },
    hydrate() {
      if (this.hydrated || typeof window === "undefined") {
        return;
      }
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        this.workspaces = decodeWorkspaceState(raw ? JSON.parse(raw) : {});
      } catch {
        this.workspaces = {};
      }
      this.hydrated = true;
      this.persist();
    },
    persist() {
      if (typeof window === "undefined") {
        return;
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.workspaces));
    },
    ensureWorkspace(key) {
      if (!this.workspaces[key]) {
        this.workspaces[key] = {
          tabs: [],
          activeTabId: null
        };
      }
      return this.workspaces[key];
    },
    registerCurrent(workspace) {
      this.hydrate();
      const key = this.workspaceKey(workspace);
      const url = normalizeWorkspaceUrl(workspace?.currentUrl);
      if (url === null) {
        return key;
      }
      const tabId = resolveCurrentTabId(workspace, url);
      const title = `${workspace?.currentTitle || workspace?.resourceLabel || "Untitled"}`.trim();
      const state = this.ensureWorkspace(key);
      state.tabs = dedupeWorkspaceTabs(state.tabs);
      if (!state.tabs.some((tab) => tab.id === state.activeTabId)) {
        state.activeTabId = null;
      }
      const existing = state.tabs.find((tab) => tab.id === tabId || tab.url === url);
      if (existing) {
        existing.id = tabId;
        existing.url = url;
        existing.title = title || existing.title;
        existing.updatedAt = Date.now();
        state.activeTabId = existing.id;
      } else {
        const tab = {
          id: tabId,
          url,
          title,
          updatedAt: Date.now()
        };
        state.tabs.push(tab);
        state.activeTabId = tab.id;
      }
      this.persist();
      return key;
    },
    setActiveTab(key, tabId) {
      this.hydrate();
      const state = this.ensureWorkspace(key);
      const tab = state.tabs.find((item) => item.id === tabId);
      if (!tab) {
        return;
      }
      state.activeTabId = tab.id;
      tab.updatedAt = Date.now();
      this.persist();
    },
    closeTab(key, tabId) {
      this.hydrate();
      const state = this.ensureWorkspace(key);
      const index = state.tabs.findIndex((tab) => tab.id === tabId);
      if (index === -1) {
        return {
          closedActive: false,
          nextUrl: null
        };
      }
      const wasActive = state.activeTabId === tabId;
      state.tabs.splice(index, 1);
      if (!wasActive) {
        this.persist();
        return {
          closedActive: false,
          nextUrl: null
        };
      }
      if (state.tabs.length === 0) {
        state.activeTabId = null;
        this.persist();
        return {
          closedActive: true,
          nextUrl: null
        };
      }
      const nextIndex = index < state.tabs.length ? index : state.tabs.length - 1;
      const nextTab = state.tabs[nextIndex];
      state.activeTabId = nextTab.id;
      nextTab.updatedAt = Date.now();
      this.persist();
      return {
        closedActive: true,
        nextUrl: nextTab.url
      };
    }
  }
};
function useResourceWorkspaceStore(livue) {
  if (!livue || typeof livue.store !== "function") {
    throw new Error("[Primix] Unable to resolve LiVue store helper for resource workspace tabs.");
  }
  return livue.store("primix-resource-workspace", storeDefinition, { scope: "global" });
}
const _hoisted_1 = {
  key: 0,
  class: "mt-4 mb-6"
};
const _hoisted_2 = { class: "overflow-x-auto pb-1" };
const _hoisted_3 = { class: "flex min-w-max items-center gap-2" };
const _hoisted_4 = ["href", "onClick"];
const _hoisted_5 = ["aria-label", "onClick"];
const _sfc_main = {
  __name: "ResourceWorkspaceTabs",
  props: {
    workspace: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const livue = inject("livue");
    const store = useResourceWorkspaceStore(livue);
    const workspaceKey = computed(() => store.workspaceKey(props.workspace));
    const tabs = computed(() => store.workspaces[workspaceKey.value]?.tabs ?? []);
    const activeTabId = computed(() => store.workspaces[workspaceKey.value]?.activeTabId ?? null);
    function navigate(url) {
      if (!url) {
        return;
      }
      if (props.workspace.spa) {
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("data-livue-navigate", "true");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }
      window.location.href = url;
    }
    function syncCurrentTab() {
      if (!props.workspace.enabled) {
        return;
      }
      store.registerCurrent({
        ...props.workspace,
        currentUrl: typeof window !== "undefined" ? window.location.href : props.workspace.currentUrl
      });
    }
    function activateTab(tab) {
      store.setActiveTab(workspaceKey.value, tab.id);
      const currentUrl = normalizeWorkspaceUrl(
        typeof window !== "undefined" ? window.location.href : props.workspace.currentUrl
      );
      if (currentUrl === tab.url) {
        return;
      }
      navigate(tab.url);
    }
    function closeTab(tab) {
      const currentUrl = normalizeWorkspaceUrl(
        typeof window !== "undefined" ? window.location.href : props.workspace.currentUrl
      );
      const { closedActive, nextUrl } = store.closeTab(workspaceKey.value, tab.id);
      if (!closedActive) {
        return;
      }
      if (nextUrl) {
        navigate(nextUrl);
        return;
      }
      const fallbackUrl = normalizeWorkspaceUrl(props.workspace.indexUrl);
      if (fallbackUrl && fallbackUrl !== currentUrl) {
        navigate(props.workspace.indexUrl);
      }
    }
    onMounted(syncCurrentTab);
    watch(
      () => [props.workspace.currentUrl, props.workspace.currentTitle, props.workspace.enabled],
      syncCurrentTab
    );
    return (_ctx, _cache) => {
      return tabs.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          createElementVNode("div", _hoisted_3, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(tabs.value, (tab) => {
                return openBlock(), createElementBlock(
                  "div",
                  {
                    key: tab.id,
                    class: normalizeClass(["group inline-flex max-w-[18rem] items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors", tab.id === activeTabId.value ? "border-primary-300 bg-primary-50 text-primary-700 dark:border-primary-600/60 dark:bg-primary-900/20 dark:text-primary-300" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600"])
                  },
                  [
                    createElementVNode("a", mergeProps({
                      href: tab.url,
                      class: "min-w-0 flex-1 truncate"
                    }, { ref_for: true }, __props.workspace.spa ? { "data-livue-navigate": "true" } : {}, {
                      onClick: withModifiers(($event) => activateTab(tab), ["prevent"])
                    }), toDisplayString(tab.title || __props.workspace.resourceLabel), 17, _hoisted_4),
                    createElementVNode("button", {
                      type: "button",
                      class: "inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded text-gray-400 transition-colors hover:bg-black/5 hover:text-gray-600 dark:hover:bg-white/10 dark:hover:text-gray-200",
                      "aria-label": __props.workspace.closeTabLabel,
                      onClick: withModifiers(($event) => closeTab(tab), ["stop", "prevent"])
                    }, [..._cache[0] || (_cache[0] = [
                      createElementVNode(
                        "svg",
                        {
                          class: "h-3 w-3",
                          viewBox: "0 0 20 20",
                          fill: "currentColor",
                          "aria-hidden": "true"
                        },
                        [
                          createElementVNode("path", {
                            "fill-rule": "evenodd",
                            d: "M4.22 4.22a.75.75 0 011.06 0L10 8.94l4.72-4.72a.75.75 0 111.06 1.06L11.06 10l4.72 4.72a.75.75 0 11-1.06 1.06L10 11.06l-4.72 4.72a.75.75 0 11-1.06-1.06L8.94 10 4.22 5.28a.75.75 0 010-1.06z",
                            "clip-rule": "evenodd"
                          })
                        ],
                        -1
                        /* CACHED */
                      )
                    ])], 8, _hoisted_5)
                  ],
                  2
                  /* CLASS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ])) : createCommentVNode("v-if", true);
    };
  }
};
const registerPanelComponents = (app) => {
  if (app?.config?.globalProperties?.__primixPanelsReady) {
    return;
  }
  app.config.globalProperties.__primixPanelsReady = true;
  app.component("PDrawer", script);
  app.component("PrimixDropdown", _sfc_main$c);
  app.component("PrimixCollapsible", _sfc_main$b);
  app.component("PrimixToast", _sfc_main$a);
  app.component("PrimixNotificationToasts", _sfc_main$9);
  app.component("PrimixThemeToggle", _sfc_main$8);
  app.component("PrimixUserMenu", _sfc_main$7);
  app.component("PrimixTenantMenu", _sfc_main$6);
  app.component("PrimixGlobalSearch", GlobalSearch);
  app.component("PrimixNotificationBell", _sfc_main$1);
  app.component("PrimixResourceWorkspaceTabs", _sfc_main);
};
LiVue.setup(registerPanelComponents);
//# sourceMappingURL=primix-panels.js.map
