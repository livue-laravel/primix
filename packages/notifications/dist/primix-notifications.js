import LiVue from "livue";
import { ref, readonly, getCurrentInstance, onMounted, nextTick, watch, reactive } from "vue";
var ie$1 = Object.defineProperty;
var K = Object.getOwnPropertySymbols;
var se = Object.prototype.hasOwnProperty, ae$1 = Object.prototype.propertyIsEnumerable;
var N$1 = (e2, t2, n2) => t2 in e2 ? ie$1(e2, t2, { enumerable: true, configurable: true, writable: true, value: n2 }) : e2[t2] = n2, d$x = (e2, t2) => {
  for (var n2 in t2 || (t2 = {})) se.call(t2, n2) && N$1(e2, n2, t2[n2]);
  if (K) for (var n2 of K(t2)) ae$1.call(t2, n2) && N$1(e2, n2, t2[n2]);
  return e2;
};
function l$h(e2) {
  return e2 == null || e2 === "" || Array.isArray(e2) && e2.length === 0 || !(e2 instanceof Date) && typeof e2 == "object" && Object.keys(e2).length === 0;
}
function c$r(e2) {
  return typeof e2 == "function" && "call" in e2 && "apply" in e2;
}
function s$b(e2) {
  return !l$h(e2);
}
function i$s(e2, t2 = true) {
  return e2 instanceof Object && e2.constructor === Object && (t2 || Object.keys(e2).length !== 0);
}
function $$1(e2 = {}, t2 = {}) {
  let n2 = d$x({}, e2);
  return Object.keys(t2).forEach((o2) => {
    let r2 = o2;
    i$s(t2[r2]) && r2 in e2 && i$s(e2[r2]) ? n2[r2] = $$1(e2[r2], t2[r2]) : n2[r2] = t2[r2];
  }), n2;
}
function w(...e2) {
  return e2.reduce((t2, n2, o2) => o2 === 0 ? n2 : $$1(t2, n2), {});
}
function m$4(e2, ...t2) {
  return c$r(e2) ? e2(...t2) : e2;
}
function a$G(e2, t2 = true) {
  return typeof e2 == "string" && (t2 || e2 !== "");
}
function z(e2) {
  return s$b(e2) && !isNaN(e2);
}
function G(e2, t2) {
  if (t2) {
    let n2 = t2.test(e2);
    return t2.lastIndex = 0, n2;
  }
  return false;
}
function H(...e2) {
  return w(...e2);
}
function Y$1(e2) {
  return e2 && e2.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":").trim();
}
function re(e2) {
  return a$G(e2) ? e2.replace(/(_)/g, "-").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() : e2;
}
function s$a() {
  let r2 = /* @__PURE__ */ new Map();
  return { on(e2, t2) {
    let n2 = r2.get(e2);
    return n2 ? n2.push(t2) : n2 = [t2], r2.set(e2, n2), this;
  }, off(e2, t2) {
    let n2 = r2.get(e2);
    return n2 && n2.splice(n2.indexOf(t2) >>> 0, 1), this;
  }, emit(e2, t2) {
    let n2 = r2.get(e2);
    n2 && n2.forEach((i2) => {
      i2(t2);
    });
  }, clear() {
    r2.clear();
  } };
}
function y(t2) {
  if (t2) {
    let e2 = t2.parentNode;
    return e2 && e2 instanceof ShadowRoot && e2.host && (e2 = e2.host), e2;
  }
  return null;
}
function T(t2) {
  return !!(t2 !== null && typeof t2 != "undefined" && t2.nodeName && y(t2));
}
function c$q(t2) {
  return typeof Element != "undefined" ? t2 instanceof Element : t2 !== null && typeof t2 == "object" && t2.nodeType === 1 && typeof t2.nodeName == "string";
}
function A(t2, e2 = {}) {
  if (c$q(t2)) {
    let o2 = (n2, r2) => {
      var l2, d2;
      let i2 = (l2 = t2 == null ? void 0 : t2.$attrs) != null && l2[n2] ? [(d2 = t2 == null ? void 0 : t2.$attrs) == null ? void 0 : d2[n2]] : [];
      return [r2].flat().reduce((s2, a2) => {
        if (a2 != null) {
          let u2 = typeof a2;
          if (u2 === "string" || u2 === "number") s2.push(a2);
          else if (u2 === "object") {
            let p2 = Array.isArray(a2) ? o2(n2, a2) : Object.entries(a2).map(([f2, g2]) => n2 === "style" && (g2 || g2 === 0) ? `${f2.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${g2}` : g2 ? f2 : void 0);
            s2 = p2.length ? s2.concat(p2.filter((f2) => !!f2)) : s2;
          }
        }
        return s2;
      }, i2);
    };
    Object.entries(e2).forEach(([n2, r2]) => {
      if (r2 != null) {
        let i2 = n2.match(/^on(.+)/);
        i2 ? t2.addEventListener(i2[1].toLowerCase(), r2) : n2 === "p-bind" || n2 === "pBind" ? A(t2, r2) : (r2 = n2 === "class" ? [...new Set(o2("class", r2))].join(" ").trim() : n2 === "style" ? o2("style", r2).join(";").trim() : r2, (t2.$attrs = t2.$attrs || {}) && (t2.$attrs[n2] = r2), t2.setAttribute(n2, r2));
      }
    });
  }
}
function tt() {
  return !!(typeof window != "undefined" && window.document && window.document.createElement);
}
function _t(t2, e2 = "", o2) {
  c$q(t2) && o2 !== null && o2 !== void 0 && t2.setAttribute(e2, o2);
}
var rt = Object.defineProperty, st = Object.defineProperties;
var nt = Object.getOwnPropertyDescriptors;
var F = Object.getOwnPropertySymbols;
var xe = Object.prototype.hasOwnProperty, be = Object.prototype.propertyIsEnumerable;
var _e = (e2, t2, r2) => t2 in e2 ? rt(e2, t2, { enumerable: true, configurable: true, writable: true, value: r2 }) : e2[t2] = r2, h$4 = (e2, t2) => {
  for (var r2 in t2 || (t2 = {})) xe.call(t2, r2) && _e(e2, r2, t2[r2]);
  if (F) for (var r2 of F(t2)) be.call(t2, r2) && _e(e2, r2, t2[r2]);
  return e2;
}, $ = (e2, t2) => st(e2, nt(t2));
var v$2 = (e2, t2) => {
  var r2 = {};
  for (var s2 in e2) xe.call(e2, s2) && t2.indexOf(s2) < 0 && (r2[s2] = e2[s2]);
  if (e2 != null && F) for (var s2 of F(e2)) t2.indexOf(s2) < 0 && be.call(e2, s2) && (r2[s2] = e2[s2]);
  return r2;
};
function ke(...e2) {
  return w(...e2);
}
var at = s$a(), N = at;
var k$3 = /{([^}]*)}/g, ne = /(\d+\s+[\+\-\*\/]\s+\d+)/g, ie = /var\([^)]+\)/g;
function oe(e2) {
  return a$G(e2) ? e2.replace(/[A-Z]/g, (t2, r2) => r2 === 0 ? t2 : "." + t2.toLowerCase()).toLowerCase() : e2;
}
function ve(e2) {
  return i$s(e2) && e2.hasOwnProperty("$value") && e2.hasOwnProperty("$type") ? e2.$value : e2;
}
function dt(e2) {
  return e2.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
}
function Q(e2 = "", t2 = "") {
  return dt(`${a$G(e2, false) && a$G(t2, false) ? `${e2}-` : e2}${t2}`);
}
function ae(e2 = "", t2 = "") {
  return `--${Q(e2, t2)}`;
}
function ht(e2 = "") {
  let t2 = (e2.match(/{/g) || []).length, r2 = (e2.match(/}/g) || []).length;
  return (t2 + r2) % 2 !== 0;
}
function Y(e2, t2 = "", r2 = "", s2 = [], i2) {
  if (a$G(e2)) {
    let a2 = e2.trim();
    if (ht(a2)) return;
    if (G(a2, k$3)) {
      let n2 = a2.replaceAll(k$3, (l2) => {
        let c2 = l2.replace(/{|}/g, "").split(".").filter((m2) => !s2.some((d2) => G(m2, d2)));
        return `var(${ae(r2, re(c2.join("-")))}${s$b(i2) ? `, ${i2}` : ""})`;
      });
      return G(n2.replace(ie, "0"), ne) ? `calc(${n2})` : n2;
    }
    return a2;
  } else if (z(e2)) return e2;
}
function Re(e2, t2, r2) {
  a$G(t2, false) && e2.push(`${t2}:${r2};`);
}
function C(e2, t2) {
  return e2 ? `${e2}{${t2}}` : "";
}
function le(e2, t2) {
  if (e2.indexOf("dt(") === -1) return e2;
  function r2(n2, l2) {
    let o2 = [], c2 = 0, m2 = "", d2 = null, u2 = 0;
    for (; c2 <= n2.length; ) {
      let g2 = n2[c2];
      if ((g2 === '"' || g2 === "'" || g2 === "`") && n2[c2 - 1] !== "\\" && (d2 = d2 === g2 ? null : g2), !d2 && (g2 === "(" && u2++, g2 === ")" && u2--, (g2 === "," || c2 === n2.length) && u2 === 0)) {
        let f2 = m2.trim();
        f2.startsWith("dt(") ? o2.push(le(f2, l2)) : o2.push(s2(f2)), m2 = "", c2++;
        continue;
      }
      g2 !== void 0 && (m2 += g2), c2++;
    }
    return o2;
  }
  function s2(n2) {
    let l2 = n2[0];
    if ((l2 === '"' || l2 === "'" || l2 === "`") && n2[n2.length - 1] === l2) return n2.slice(1, -1);
    let o2 = Number(n2);
    return isNaN(o2) ? n2 : o2;
  }
  let i2 = [], a2 = [];
  for (let n2 = 0; n2 < e2.length; n2++) if (e2[n2] === "d" && e2.slice(n2, n2 + 3) === "dt(") a2.push(n2), n2 += 2;
  else if (e2[n2] === ")" && a2.length > 0) {
    let l2 = a2.pop();
    a2.length === 0 && i2.push([l2, n2]);
  }
  if (!i2.length) return e2;
  for (let n2 = i2.length - 1; n2 >= 0; n2--) {
    let [l2, o2] = i2[n2], c2 = e2.slice(l2 + 3, o2), m2 = r2(c2, t2), d2 = t2(...m2);
    e2 = e2.slice(0, l2) + d2 + e2.slice(o2 + 1);
  }
  return e2;
}
var E = (...e2) => ue(S.getTheme(), ...e2), ue = (e2 = {}, t2, r2, s2) => {
  if (t2) {
    let { variable: i2, options: a2 } = S.defaults || {}, { prefix: n2, transform: l2 } = (e2 == null ? void 0 : e2.options) || a2 || {}, o2 = G(t2, k$3) ? t2 : `{${t2}}`;
    return s2 === "value" || l$h(s2) && l2 === "strict" ? S.getTokenValue(t2) : Y(o2, void 0, n2, [i2.excludedKeyRegex], r2);
  }
  return "";
};
function ar(e2, ...t2) {
  if (e2 instanceof Array) {
    let r2 = e2.reduce((s2, i2, a2) => {
      var n2;
      return s2 + i2 + ((n2 = m$4(t2[a2], { dt: E })) != null ? n2 : "");
    }, "");
    return le(r2, E);
  }
  return m$4(e2, { dt: E });
}
function de(e2, t2 = {}) {
  let r2 = S.defaults.variable, { prefix: s2 = r2.prefix, selector: i2 = r2.selector, excludedKeyRegex: a2 = r2.excludedKeyRegex } = t2, n2 = [], l2 = [], o2 = [{ node: e2, path: s2 }];
  for (; o2.length; ) {
    let { node: m2, path: d2 } = o2.pop();
    for (let u2 in m2) {
      let g2 = m2[u2], f2 = ve(g2), p2 = G(u2, a2) ? Q(d2) : Q(d2, re(u2));
      if (i$s(f2)) o2.push({ node: f2, path: p2 });
      else {
        let y2 = ae(p2), R = Y(f2, p2, s2, [a2]);
        Re(l2, y2, R);
        let T2 = p2;
        s2 && T2.startsWith(s2 + "-") && (T2 = T2.slice(s2.length + 1)), n2.push(T2.replace(/-/g, "."));
      }
    }
  }
  let c2 = l2.join("");
  return { value: l2, tokens: n2, declarations: c2, css: C(i2, c2) };
}
var b$4 = { regex: { rules: { class: { pattern: /^\.([a-zA-Z][\w-]*)$/, resolve(e2) {
  return { type: "class", selector: e2, matched: this.pattern.test(e2.trim()) };
} }, attr: { pattern: /^\[(.*)\]$/, resolve(e2) {
  return { type: "attr", selector: `:root${e2},:host${e2}`, matched: this.pattern.test(e2.trim()) };
} }, media: { pattern: /^@media (.*)$/, resolve(e2) {
  return { type: "media", selector: e2, matched: this.pattern.test(e2.trim()) };
} }, system: { pattern: /^system$/, resolve(e2) {
  return { type: "system", selector: "@media (prefers-color-scheme: dark)", matched: this.pattern.test(e2.trim()) };
} }, custom: { resolve(e2) {
  return { type: "custom", selector: e2, matched: true };
} } }, resolve(e2) {
  let t2 = Object.keys(this.rules).filter((r2) => r2 !== "custom").map((r2) => this.rules[r2]);
  return [e2].flat().map((r2) => {
    var s2;
    return (s2 = t2.map((i2) => i2.resolve(r2)).find((i2) => i2.matched)) != null ? s2 : this.rules.custom.resolve(r2);
  });
} }, _toVariables(e2, t2) {
  return de(e2, { prefix: t2 == null ? void 0 : t2.prefix });
}, getCommon({ name: e2 = "", theme: t2 = {}, params: r2, set: s2, defaults: i2 }) {
  var R, T2, j, O, M, z2, V;
  let { preset: a2, options: n2 } = t2, l2, o2, c2, m2, d2, u2, g2;
  if (s$b(a2) && n2.transform !== "strict") {
    let { primitive: L, semantic: te, extend: re2 } = a2, f2 = te || {}, { colorScheme: K2 } = f2, A2 = v$2(f2, ["colorScheme"]), x = re2 || {}, { colorScheme: X } = x, G2 = v$2(x, ["colorScheme"]), p2 = K2 || {}, { dark: U } = p2, B = v$2(p2, ["dark"]), y2 = X || {}, { dark: I } = y2, H2 = v$2(y2, ["dark"]), W = s$b(L) ? this._toVariables({ primitive: L }, n2) : {}, q = s$b(A2) ? this._toVariables({ semantic: A2 }, n2) : {}, Z = s$b(B) ? this._toVariables({ light: B }, n2) : {}, pe = s$b(U) ? this._toVariables({ dark: U }, n2) : {}, fe = s$b(G2) ? this._toVariables({ semantic: G2 }, n2) : {}, ye = s$b(H2) ? this._toVariables({ light: H2 }, n2) : {}, Se = s$b(I) ? this._toVariables({ dark: I }, n2) : {}, [Me, ze] = [(R = W.declarations) != null ? R : "", W.tokens], [Ke, Xe] = [(T2 = q.declarations) != null ? T2 : "", q.tokens || []], [Ge, Ue] = [(j = Z.declarations) != null ? j : "", Z.tokens || []], [Be, Ie] = [(O = pe.declarations) != null ? O : "", pe.tokens || []], [He, We] = [(M = fe.declarations) != null ? M : "", fe.tokens || []], [qe, Ze] = [(z2 = ye.declarations) != null ? z2 : "", ye.tokens || []], [Fe, Je] = [(V = Se.declarations) != null ? V : "", Se.tokens || []];
    l2 = this.transformCSS(e2, Me, "light", "variable", n2, s2, i2), o2 = ze;
    let Qe = this.transformCSS(e2, `${Ke}${Ge}`, "light", "variable", n2, s2, i2), Ye = this.transformCSS(e2, `${Be}`, "dark", "variable", n2, s2, i2);
    c2 = `${Qe}${Ye}`, m2 = [.../* @__PURE__ */ new Set([...Xe, ...Ue, ...Ie])];
    let et = this.transformCSS(e2, `${He}${qe}color-scheme:light`, "light", "variable", n2, s2, i2), tt2 = this.transformCSS(e2, `${Fe}color-scheme:dark`, "dark", "variable", n2, s2, i2);
    d2 = `${et}${tt2}`, u2 = [.../* @__PURE__ */ new Set([...We, ...Ze, ...Je])], g2 = m$4(a2.css, { dt: E });
  }
  return { primitive: { css: l2, tokens: o2 }, semantic: { css: c2, tokens: m2 }, global: { css: d2, tokens: u2 }, style: g2 };
}, getPreset({ name: e2 = "", preset: t2 = {}, options: r2, params: s2, set: i2, defaults: a2, selector: n2 }) {
  var f2, x, p2;
  let l2, o2, c2;
  if (s$b(t2) && r2.transform !== "strict") {
    let y2 = e2.replace("-directive", ""), m2 = t2, { colorScheme: R, extend: T2, css: j } = m2, O = v$2(m2, ["colorScheme", "extend", "css"]), d2 = T2 || {}, { colorScheme: M } = d2, z2 = v$2(d2, ["colorScheme"]), u2 = R || {}, { dark: V } = u2, L = v$2(u2, ["dark"]), g2 = M || {}, { dark: te } = g2, re2 = v$2(g2, ["dark"]), K2 = s$b(O) ? this._toVariables({ [y2]: h$4(h$4({}, O), z2) }, r2) : {}, A2 = s$b(L) ? this._toVariables({ [y2]: h$4(h$4({}, L), re2) }, r2) : {}, X = s$b(V) ? this._toVariables({ [y2]: h$4(h$4({}, V), te) }, r2) : {}, [G2, U] = [(f2 = K2.declarations) != null ? f2 : "", K2.tokens || []], [B, I] = [(x = A2.declarations) != null ? x : "", A2.tokens || []], [H2, W] = [(p2 = X.declarations) != null ? p2 : "", X.tokens || []], q = this.transformCSS(y2, `${G2}${B}`, "light", "variable", r2, i2, a2, n2), Z = this.transformCSS(y2, H2, "dark", "variable", r2, i2, a2, n2);
    l2 = `${q}${Z}`, o2 = [.../* @__PURE__ */ new Set([...U, ...I, ...W])], c2 = m$4(j, { dt: E });
  }
  return { css: l2, tokens: o2, style: c2 };
}, getPresetC({ name: e2 = "", theme: t2 = {}, params: r2, set: s2, defaults: i2 }) {
  var o2;
  let { preset: a2, options: n2 } = t2, l2 = (o2 = a2 == null ? void 0 : a2.components) == null ? void 0 : o2[e2];
  return this.getPreset({ name: e2, preset: l2, options: n2, params: r2, set: s2, defaults: i2 });
}, getPresetD({ name: e2 = "", theme: t2 = {}, params: r2, set: s2, defaults: i2 }) {
  var c2, m2;
  let a2 = e2.replace("-directive", ""), { preset: n2, options: l2 } = t2, o2 = ((c2 = n2 == null ? void 0 : n2.components) == null ? void 0 : c2[a2]) || ((m2 = n2 == null ? void 0 : n2.directives) == null ? void 0 : m2[a2]);
  return this.getPreset({ name: a2, preset: o2, options: l2, params: r2, set: s2, defaults: i2 });
}, applyDarkColorScheme(e2) {
  return !(e2.darkModeSelector === "none" || e2.darkModeSelector === false);
}, getColorSchemeOption(e2, t2) {
  var r2;
  return this.applyDarkColorScheme(e2) ? this.regex.resolve(e2.darkModeSelector === true ? t2.options.darkModeSelector : (r2 = e2.darkModeSelector) != null ? r2 : t2.options.darkModeSelector) : [];
}, getLayerOrder(e2, t2 = {}, r2, s2) {
  let { cssLayer: i2 } = t2;
  return i2 ? `@layer ${m$4(i2.order || i2.name || "primeui", r2)}` : "";
}, getCommonStyleSheet({ name: e2 = "", theme: t2 = {}, params: r2, props: s2 = {}, set: i2, defaults: a2 }) {
  let n2 = this.getCommon({ name: e2, theme: t2, params: r2, set: i2, defaults: a2 }), l2 = Object.entries(s2).reduce((o2, [c2, m2]) => o2.push(`${c2}="${m2}"`) && o2, []).join(" ");
  return Object.entries(n2 || {}).reduce((o2, [c2, m2]) => {
    if (i$s(m2) && Object.hasOwn(m2, "css")) {
      let d2 = Y$1(m2.css), u2 = `${c2}-variables`;
      o2.push(`<style type="text/css" data-primevue-style-id="${u2}" ${l2}>${d2}</style>`);
    }
    return o2;
  }, []).join("");
}, getStyleSheet({ name: e2 = "", theme: t2 = {}, params: r2, props: s2 = {}, set: i2, defaults: a2 }) {
  var c2;
  let n2 = { name: e2, theme: t2, params: r2, set: i2, defaults: a2 }, l2 = (c2 = e2.includes("-directive") ? this.getPresetD(n2) : this.getPresetC(n2)) == null ? void 0 : c2.css, o2 = Object.entries(s2).reduce((m2, [d2, u2]) => m2.push(`${d2}="${u2}"`) && m2, []).join(" ");
  return l2 ? `<style type="text/css" data-primevue-style-id="${e2}-variables" ${o2}>${Y$1(l2)}</style>` : "";
}, createTokens(e2 = {}, t2, r2 = "", s2 = "", i2 = {}) {
  let a2 = function(l2, o2 = {}, c2 = []) {
    if (c2.includes(this.path)) return console.warn(`Circular reference detected at ${this.path}`), { colorScheme: l2, path: this.path, paths: o2, value: void 0 };
    c2.push(this.path), o2.name = this.path, o2.binding || (o2.binding = {});
    let m2 = this.value;
    if (typeof this.value == "string" && k$3.test(this.value)) {
      let u2 = this.value.trim().replace(k$3, (g2) => {
        var y2;
        let f2 = g2.slice(1, -1), x = this.tokens[f2];
        if (!x) return console.warn(`Token not found for path: ${f2}`), "__UNRESOLVED__";
        let p2 = x.computed(l2, o2, c2);
        return Array.isArray(p2) && p2.length === 2 ? `light-dark(${p2[0].value},${p2[1].value})` : (y2 = p2 == null ? void 0 : p2.value) != null ? y2 : "__UNRESOLVED__";
      });
      m2 = ne.test(u2.replace(ie, "0")) ? `calc(${u2})` : u2;
    }
    return l$h(o2.binding) && delete o2.binding, c2.pop(), { colorScheme: l2, path: this.path, paths: o2, value: m2.includes("__UNRESOLVED__") ? void 0 : m2 };
  }, n2 = (l2, o2, c2) => {
    Object.entries(l2).forEach(([m2, d2]) => {
      let u2 = G(m2, t2.variable.excludedKeyRegex) ? o2 : o2 ? `${o2}.${oe(m2)}` : oe(m2), g2 = c2 ? `${c2}.${m2}` : m2;
      i$s(d2) ? n2(d2, u2, g2) : (i2[u2] || (i2[u2] = { paths: [], computed: (f2, x = {}, p2 = []) => {
        if (i2[u2].paths.length === 1) return i2[u2].paths[0].computed(i2[u2].paths[0].scheme, x.binding, p2);
        if (f2 && f2 !== "none") for (let y2 = 0; y2 < i2[u2].paths.length; y2++) {
          let R = i2[u2].paths[y2];
          if (R.scheme === f2) return R.computed(f2, x.binding, p2);
        }
        return i2[u2].paths.map((y2) => y2.computed(y2.scheme, x[y2.scheme], p2));
      } }), i2[u2].paths.push({ path: g2, value: d2, scheme: g2.includes("colorScheme.light") ? "light" : g2.includes("colorScheme.dark") ? "dark" : "none", computed: a2, tokens: i2 }));
    });
  };
  return n2(e2, r2, s2), i2;
}, getTokenValue(e2, t2, r2) {
  var l2;
  let i2 = ((o2) => o2.split(".").filter((m2) => !G(m2.toLowerCase(), r2.variable.excludedKeyRegex)).join("."))(t2), a2 = t2.includes("colorScheme.light") ? "light" : t2.includes("colorScheme.dark") ? "dark" : void 0, n2 = [(l2 = e2[i2]) == null ? void 0 : l2.computed(a2)].flat().filter((o2) => o2);
  return n2.length === 1 ? n2[0].value : n2.reduce((o2 = {}, c2) => {
    let u2 = c2, { colorScheme: m2 } = u2, d2 = v$2(u2, ["colorScheme"]);
    return o2[m2] = d2, o2;
  }, void 0);
}, getSelectorRule(e2, t2, r2, s2) {
  return r2 === "class" || r2 === "attr" ? C(s$b(t2) ? `${e2}${t2},${e2} ${t2}` : e2, s2) : C(e2, C(t2 != null ? t2 : ":root,:host", s2));
}, transformCSS(e2, t2, r2, s2, i2 = {}, a2, n2, l2) {
  if (s$b(t2)) {
    let { cssLayer: o2 } = i2;
    if (s2 !== "style") {
      let c2 = this.getColorSchemeOption(i2, n2);
      t2 = r2 === "dark" ? c2.reduce((m2, { type: d2, selector: u2 }) => (s$b(u2) && (m2 += u2.includes("[CSS]") ? u2.replace("[CSS]", t2) : this.getSelectorRule(u2, l2, d2, t2)), m2), "") : C(l2 != null ? l2 : ":root,:host", t2);
    }
    if (o2) {
      let c2 = { name: "primeui" };
      i$s(o2) && (c2.name = m$4(o2.name, { name: e2, type: s2 })), s$b(c2.name) && (t2 = C(`@layer ${c2.name}`, t2), a2 == null || a2.layerNames(c2.name));
    }
    return t2;
  }
  return "";
} };
var S = { defaults: { variable: { prefix: "p", selector: ":root,:host", excludedKeyRegex: /^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi }, options: { prefix: "p", darkModeSelector: "system", cssLayer: false } }, _theme: void 0, _layerNames: /* @__PURE__ */ new Set(), _loadedStyleNames: /* @__PURE__ */ new Set(), _loadingStyles: /* @__PURE__ */ new Set(), _tokens: {}, update(e2 = {}) {
  let { theme: t2 } = e2;
  t2 && (this._theme = $(h$4({}, t2), { options: h$4(h$4({}, this.defaults.options), t2.options) }), this._tokens = b$4.createTokens(this.preset, this.defaults), this.clearLoadedStyleNames());
}, get theme() {
  return this._theme;
}, get preset() {
  var e2;
  return ((e2 = this.theme) == null ? void 0 : e2.preset) || {};
}, get options() {
  var e2;
  return ((e2 = this.theme) == null ? void 0 : e2.options) || {};
}, get tokens() {
  return this._tokens;
}, getTheme() {
  return this.theme;
}, setTheme(e2) {
  this.update({ theme: e2 }), N.emit("theme:change", e2);
}, getPreset() {
  return this.preset;
}, setPreset(e2) {
  this._theme = $(h$4({}, this.theme), { preset: e2 }), this._tokens = b$4.createTokens(e2, this.defaults), this.clearLoadedStyleNames(), N.emit("preset:change", e2), N.emit("theme:change", this.theme);
}, getOptions() {
  return this.options;
}, setOptions(e2) {
  this._theme = $(h$4({}, this.theme), { options: e2 }), this.clearLoadedStyleNames(), N.emit("options:change", e2), N.emit("theme:change", this.theme);
}, getLayerNames() {
  return [...this._layerNames];
}, setLayerNames(e2) {
  this._layerNames.add(e2);
}, getLoadedStyleNames() {
  return this._loadedStyleNames;
}, isStyleNameLoaded(e2) {
  return this._loadedStyleNames.has(e2);
}, setLoadedStyleName(e2) {
  this._loadedStyleNames.add(e2);
}, deleteLoadedStyleName(e2) {
  this._loadedStyleNames.delete(e2);
}, clearLoadedStyleNames() {
  this._loadedStyleNames.clear();
}, getTokenValue(e2) {
  return b$4.getTokenValue(this.tokens, e2, this.defaults);
}, getCommon(e2 = "", t2) {
  return b$4.getCommon({ name: e2, theme: this.theme, params: t2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getComponent(e2 = "", t2) {
  let r2 = { name: e2, theme: this.theme, params: t2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return b$4.getPresetC(r2);
}, getDirective(e2 = "", t2) {
  let r2 = { name: e2, theme: this.theme, params: t2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return b$4.getPresetD(r2);
}, getCustomPreset(e2 = "", t2, r2, s2) {
  let i2 = { name: e2, preset: t2, options: this.options, selector: r2, params: s2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return b$4.getPreset(i2);
}, getLayerOrderCSS(e2 = "") {
  return b$4.getLayerOrder(e2, this.options, { names: this.getLayerNames() }, this.defaults);
}, transformCSS(e2 = "", t2, r2 = "style", s2) {
  return b$4.transformCSS(e2, t2, s2, r2, this.options, { layerNames: this.setLayerNames.bind(this) }, this.defaults);
}, getCommonStyleSheet(e2 = "", t2, r2 = {}) {
  return b$4.getCommonStyleSheet({ name: e2, theme: this.theme, params: t2, props: r2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getStyleSheet(e2, t2, r2 = {}) {
  return b$4.getStyleSheet({ name: e2, theme: this.theme, params: t2, props: r2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, onStyleMounted(e2) {
  this._loadingStyles.add(e2);
}, onStyleUpdated(e2) {
  this._loadingStyles.add(e2);
}, onStyleLoaded(e2, { name: t2 }) {
  this._loadingStyles.size && (this._loadingStyles.delete(t2), N.emit(`theme:${t2}:load`, e2), !this._loadingStyles.size && N.emit("theme:load"));
} };
var FilterMatchMode = {
  STARTS_WITH: "startsWith",
  CONTAINS: "contains",
  NOT_CONTAINS: "notContains",
  ENDS_WITH: "endsWith",
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  LESS_THAN: "lt",
  LESS_THAN_OR_EQUAL_TO: "lte",
  GREATER_THAN: "gt",
  GREATER_THAN_OR_EQUAL_TO: "gte",
  DATE_IS: "dateIs",
  DATE_IS_NOT: "dateIsNot",
  DATE_BEFORE: "dateBefore",
  DATE_AFTER: "dateAfter"
};
var style = "\n    *,\n    ::before,\n    ::after {\n        box-sizing: border-box;\n    }\n\n    .p-collapsible-enter-active {\n        animation: p-animate-collapsible-expand 0.2s ease-out;\n        overflow: hidden;\n    }\n\n    .p-collapsible-leave-active {\n        animation: p-animate-collapsible-collapse 0.2s ease-out;\n        overflow: hidden;\n    }\n\n    @keyframes p-animate-collapsible-expand {\n        from {\n            grid-template-rows: 0fr;\n        }\n        to {\n            grid-template-rows: 1fr;\n        }\n    }\n\n    @keyframes p-animate-collapsible-collapse {\n        from {\n            grid-template-rows: 1fr;\n        }\n        to {\n            grid-template-rows: 0fr;\n        }\n    }\n\n    .p-disabled,\n    .p-disabled * {\n        cursor: default;\n        pointer-events: none;\n        user-select: none;\n    }\n\n    .p-disabled,\n    .p-component:disabled {\n        opacity: dt('disabled.opacity');\n    }\n\n    .pi {\n        font-size: dt('icon.size');\n    }\n\n    .p-icon {\n        width: dt('icon.size');\n        height: dt('icon.size');\n    }\n\n    .p-overlay-mask {\n        background: var(--px-mask-background, dt('mask.background'));\n        color: dt('mask.color');\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n    }\n\n    .p-overlay-mask-enter-active {\n        animation: p-animate-overlay-mask-enter dt('mask.transition.duration') forwards;\n    }\n\n    .p-overlay-mask-leave-active {\n        animation: p-animate-overlay-mask-leave dt('mask.transition.duration') forwards;\n    }\n\n    @keyframes p-animate-overlay-mask-enter {\n        from {\n            background: transparent;\n        }\n        to {\n            background: var(--px-mask-background, dt('mask.background'));\n        }\n    }\n    @keyframes p-animate-overlay-mask-leave {\n        from {\n            background: var(--px-mask-background, dt('mask.background'));\n        }\n        to {\n            background: transparent;\n        }\n    }\n\n    .p-anchored-overlay-enter-active {\n        animation: p-animate-anchored-overlay-enter 300ms cubic-bezier(.19,1,.22,1);\n    }\n\n    .p-anchored-overlay-leave-active {\n        animation: p-animate-anchored-overlay-leave 300ms cubic-bezier(.19,1,.22,1);\n    }\n\n    @keyframes p-animate-anchored-overlay-enter {\n        from {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n\n    @keyframes p-animate-anchored-overlay-leave {\n        to {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n";
function _typeof$2(o2) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof$2(o2);
}
function ownKeys$2(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$2(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$2(Object(t2), true).forEach(function(r3) {
      _defineProperty$2(e2, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$2(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e2;
}
function _defineProperty$2(e2, r2, t2) {
  return (r2 = _toPropertyKey$2(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
}
function _toPropertyKey$2(t2) {
  var i2 = _toPrimitive$2(t2, "string");
  return "symbol" == _typeof$2(i2) ? i2 : i2 + "";
}
function _toPrimitive$2(t2, r2) {
  if ("object" != _typeof$2(t2) || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t2, r2);
    if ("object" != _typeof$2(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
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
  var _options$document = options.document, document = _options$document === void 0 ? defaultDocument : _options$document, _options$immediate = options.immediate, immediate = _options$immediate === void 0 ? true : _options$immediate, _options$manual = options.manual, manual = _options$manual === void 0 ? false : _options$manual, _options$name = options.name, name = _options$name === void 0 ? "style_".concat(++_id) : _options$name, _options$id = options.id, id = _options$id === void 0 ? void 0 : _options$id, _options$media = options.media, media = _options$media === void 0 ? void 0 : _options$media, _options$nonce = options.nonce, nonce = _options$nonce === void 0 ? void 0 : _options$nonce, _options$first = options.first, first = _options$first === void 0 ? false : _options$first, _options$onMounted = options.onMounted, onStyleMounted = _options$onMounted === void 0 ? void 0 : _options$onMounted, _options$onUpdated = options.onUpdated, onStyleUpdated = _options$onUpdated === void 0 ? void 0 : _options$onUpdated, _options$onLoad = options.onLoad, onStyleLoaded = _options$onLoad === void 0 ? void 0 : _options$onLoad, _options$props = options.props, props = _options$props === void 0 ? {} : _options$props;
  var stop = function stop2() {
  };
  var load2 = function load3(_css) {
    var _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!document) return;
    var _styleProps = _objectSpread$2(_objectSpread$2({}, props), _props);
    var _name = _styleProps.name || name, _id2 = _styleProps.id || id, _nonce = _styleProps.nonce || nonce;
    styleRef.value = document.querySelector('style[data-primevue-style-id="'.concat(_name, '"]')) || document.getElementById(_id2) || document.createElement("style");
    if (!styleRef.value.isConnected) {
      cssRef.value = _css || css3;
      A(styleRef.value, {
        type: "text/css",
        id: _id2,
        media,
        nonce: _nonce
      });
      first ? document.head.prepend(styleRef.value) : document.head.appendChild(styleRef.value);
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
    if (!document || !isLoaded.value) return;
    stop();
    T(styleRef.value) && document.head.removeChild(styleRef.value);
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
function _typeof$1(o2) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof$1(o2);
}
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _slicedToArray(r2, e2) {
  return _arrayWithHoles(r2) || _iterableToArrayLimit(r2, e2) || _unsupportedIterableToArray(r2, e2) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r2, a2) {
  if (r2) {
    if ("string" == typeof r2) return _arrayLikeToArray(r2, a2);
    var t2 = {}.toString.call(r2).slice(8, -1);
    return "Object" === t2 && r2.constructor && (t2 = r2.constructor.name), "Map" === t2 || "Set" === t2 ? Array.from(r2) : "Arguments" === t2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t2) ? _arrayLikeToArray(r2, a2) : void 0;
  }
}
function _arrayLikeToArray(r2, a2) {
  (null == a2 || a2 > r2.length) && (a2 = r2.length);
  for (var e2 = 0, n2 = Array(a2); e2 < a2; e2++) n2[e2] = r2[e2];
  return n2;
}
function _iterableToArrayLimit(r2, l2) {
  var t2 = null == r2 ? null : "undefined" != typeof Symbol && r2[Symbol.iterator] || r2["@@iterator"];
  if (null != t2) {
    var e2, n2, i2, u2, a2 = [], f2 = true, o2 = false;
    try {
      if (i2 = (t2 = t2.call(r2)).next, 0 === l2) ;
      else for (; !(f2 = (e2 = i2.call(t2)).done) && (a2.push(e2.value), a2.length !== l2); f2 = true) ;
    } catch (r3) {
      o2 = true, n2 = r3;
    } finally {
      try {
        if (!f2 && null != t2["return"] && (u2 = t2["return"](), Object(u2) !== u2)) return;
      } finally {
        if (o2) throw n2;
      }
    }
    return a2;
  }
}
function _arrayWithHoles(r2) {
  if (Array.isArray(r2)) return r2;
}
function ownKeys$1(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread$1(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$1(Object(t2), true).forEach(function(r3) {
      _defineProperty$1(e2, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$1(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e2;
}
function _defineProperty$1(e2, r2, t2) {
  return (r2 = _toPropertyKey$1(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
}
function _toPropertyKey$1(t2) {
  var i2 = _toPrimitive$1(t2, "string");
  return "symbol" == _typeof$1(i2) ? i2 : i2 + "";
}
function _toPrimitive$1(t2, r2) {
  if ("object" != _typeof$1(t2) || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t2, r2);
    if ("object" != _typeof$1(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _taggedTemplateLiteral(e2, t2) {
  return t2 || (t2 = e2.slice(0)), Object.freeze(Object.defineProperties(e2, { raw: { value: Object.freeze(t2) } }));
}
var css$3 = function css(_ref) {
  var dt2 = _ref.dt;
  return "\n.p-hidden-accessible {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    opacity: 0;\n    overflow: hidden;\n    padding: 0;\n    pointer-events: none;\n    position: absolute;\n    white-space: nowrap;\n    width: 1px;\n}\n\n.p-overflow-hidden {\n    overflow: hidden;\n    padding-right: ".concat(dt2("scrollbar.width"), ";\n}\n");
};
var classes = {};
var inlineStyles = {};
var BaseStyle = {
  name: "base",
  css: css$3,
  style,
  classes,
  inlineStyles,
  load: function load(style2) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var transform = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(cs) {
      return cs;
    };
    var computedStyle = transform(ar(_templateObject || (_templateObject = _taggedTemplateLiteral(["", ""])), style2));
    return s$b(computedStyle) ? useStyle(Y$1(computedStyle), _objectSpread$1({
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
      var _css = m$4(this.css, {
        dt: E
      }) || "";
      var _style = Y$1(ar(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["", "", ""])), _css, extendedCSS));
      var _props = Object.entries(props).reduce(function(acc, _ref2) {
        var _ref3 = _slicedToArray(_ref2, 2), k2 = _ref3[0], v2 = _ref3[1];
        return acc.push("".concat(k2, '="').concat(v2, '"')) && acc;
      }, []).join(" ");
      return s$b(_style) ? '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(_props, ">").concat(_style, "</style>") : "";
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
      var _css = ar(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["", ""])), m$4(this.style, {
        dt: E
      }));
      var _style = Y$1(S.transformCSS(name, _css));
      var _props = Object.entries(props).reduce(function(acc, _ref4) {
        var _ref5 = _slicedToArray(_ref4, 2), k2 = _ref5[0], v2 = _ref5[1];
        return acc.push("".concat(k2, '="').concat(v2, '"')) && acc;
      }, []).join(" ");
      s$b(_style) && css3.push('<style type="text/css" data-primevue-style-id="'.concat(name, '" ').concat(_props, ">").concat(_style, "</style>"));
    }
    return css3.join("");
  },
  extend: function extend(inStyle) {
    return _objectSpread$1(_objectSpread$1({}, this), {}, {
      css: void 0,
      style: void 0
    }, inStyle);
  }
};
var PrimeVueService = s$a();
function _typeof(o2) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof(o2);
}
function ownKeys(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys(Object(t2), true).forEach(function(r3) {
      _defineProperty(e2, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e2;
}
function _defineProperty(e2, r2, t2) {
  return (r2 = _toPropertyKey(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
}
function _toPropertyKey(t2) {
  var i2 = _toPrimitive(t2, "string");
  return "symbol" == _typeof(i2) ? i2 : i2 + "";
}
function _toPrimitive(t2, r2) {
  if ("object" != _typeof(t2) || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t2, r2);
    if ("object" != _typeof(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
var defaultOptions = {
  ripple: false,
  inputStyle: null,
  inputVariant: null,
  locale: {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    upload: "Upload",
    cancel: "Cancel",
    completed: "Completed",
    pending: "Pending",
    fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    today: "Today",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    showMonthAfterYear: false,
    dateFormat: "mm/dd/yy",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found",
    searchMessage: "{0} results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    fileChosenMessage: "{0} files",
    noFileChosenMessage: "No file chosen",
    emptyMessage: "No available options",
    aria: {
      trueLabel: "True",
      falseLabel: "False",
      nullLabel: "Not Selected",
      star: "1 star",
      stars: "{star} stars",
      selectAll: "All items selected",
      unselectAll: "All items unselected",
      close: "Close",
      previous: "Previous",
      next: "Next",
      navigation: "Navigation",
      scrollTop: "Scroll Top",
      moveTop: "Move Top",
      moveUp: "Move Up",
      moveDown: "Move Down",
      moveBottom: "Move Bottom",
      moveToTarget: "Move to Target",
      moveToSource: "Move to Source",
      moveAllToTarget: "Move All to Target",
      moveAllToSource: "Move All to Source",
      pageLabel: "Page {page}",
      firstPageLabel: "First Page",
      lastPageLabel: "Last Page",
      nextPageLabel: "Next Page",
      prevPageLabel: "Previous Page",
      rowsPerPageLabel: "Rows per page",
      jumpToPageDropdownLabel: "Jump to Page Dropdown",
      jumpToPageInputLabel: "Jump to Page Input",
      selectRow: "Row Selected",
      unselectRow: "Row Unselected",
      expandRow: "Row Expanded",
      collapseRow: "Row Collapsed",
      showFilterMenu: "Show Filter Menu",
      hideFilterMenu: "Hide Filter Menu",
      filterOperator: "Filter Operator",
      filterConstraint: "Filter Constraint",
      editRow: "Row Edit",
      saveEdit: "Save Edit",
      cancelEdit: "Cancel Edit",
      listView: "List View",
      gridView: "Grid View",
      slide: "Slide",
      slideNumber: "{slideNumber}",
      zoomImage: "Zoom Image",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateRight: "Rotate Right",
      rotateLeft: "Rotate Left",
      listLabel: "Option List"
    }
  },
  filterMatchModeOptions: {
    text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
  },
  zIndex: {
    modal: 1100,
    overlay: 1e3,
    menu: 1e3,
    tooltip: 1100
  },
  theme: void 0,
  unstyled: false,
  pt: void 0,
  ptOptions: {
    mergeSections: true,
    mergeProps: false
  },
  csp: {
    nonce: void 0
  }
};
var PrimeVueSymbol = /* @__PURE__ */ Symbol();
function setup(app, options) {
  var PrimeVue2 = {
    config: reactive(options)
  };
  app.config.globalProperties.$primevue = PrimeVue2;
  app.provide(PrimeVueSymbol, PrimeVue2);
  clearConfig();
  setupConfig(app, PrimeVue2);
  return PrimeVue2;
}
var stopWatchers = [];
function clearConfig() {
  N.clear();
  stopWatchers.forEach(function(fn) {
    return fn === null || fn === void 0 ? void 0 : fn();
  });
  stopWatchers = [];
}
function setupConfig(app, PrimeVue2) {
  var isThemeChanged = ref(false);
  var loadCommonTheme = function loadCommonTheme2() {
    var _PrimeVue$config;
    if (((_PrimeVue$config = PrimeVue2.config) === null || _PrimeVue$config === void 0 ? void 0 : _PrimeVue$config.theme) === "none") return;
    if (!S.isStyleNameLoaded("common")) {
      var _BaseStyle$getCommonT, _PrimeVue$config2;
      var _ref = ((_BaseStyle$getCommonT = BaseStyle.getCommonTheme) === null || _BaseStyle$getCommonT === void 0 ? void 0 : _BaseStyle$getCommonT.call(BaseStyle)) || {}, primitive = _ref.primitive, semantic = _ref.semantic, global = _ref.global, style2 = _ref.style;
      var styleOptions = {
        nonce: (_PrimeVue$config2 = PrimeVue2.config) === null || _PrimeVue$config2 === void 0 || (_PrimeVue$config2 = _PrimeVue$config2.csp) === null || _PrimeVue$config2 === void 0 ? void 0 : _PrimeVue$config2.nonce
      };
      BaseStyle.load(primitive === null || primitive === void 0 ? void 0 : primitive.css, _objectSpread({
        name: "primitive-variables"
      }, styleOptions));
      BaseStyle.load(semantic === null || semantic === void 0 ? void 0 : semantic.css, _objectSpread({
        name: "semantic-variables"
      }, styleOptions));
      BaseStyle.load(global === null || global === void 0 ? void 0 : global.css, _objectSpread({
        name: "global-variables"
      }, styleOptions));
      BaseStyle.loadStyle(_objectSpread({
        name: "global-style"
      }, styleOptions), style2);
      S.setLoadedStyleName("common");
    }
  };
  N.on("theme:change", function(newTheme) {
    if (!isThemeChanged.value) {
      app.config.globalProperties.$primevue.config.theme = newTheme;
      isThemeChanged.value = true;
    }
  });
  var stopConfigWatcher = watch(PrimeVue2.config, function(newValue, oldValue) {
    PrimeVueService.emit("config:change", {
      newValue,
      oldValue
    });
  }, {
    immediate: true,
    deep: true
  });
  var stopRippleWatcher = watch(function() {
    return PrimeVue2.config.ripple;
  }, function(newValue, oldValue) {
    PrimeVueService.emit("config:ripple:change", {
      newValue,
      oldValue
    });
  }, {
    immediate: true,
    deep: true
  });
  var stopThemeWatcher = watch(function() {
    return PrimeVue2.config.theme;
  }, function(newValue, oldValue) {
    if (!isThemeChanged.value) {
      S.setTheme(newValue);
    }
    if (!PrimeVue2.config.unstyled) {
      loadCommonTheme();
    }
    isThemeChanged.value = false;
    PrimeVueService.emit("config:theme:change", {
      newValue,
      oldValue
    });
  }, {
    immediate: true,
    deep: false
  });
  var stopUnstyledWatcher = watch(function() {
    return PrimeVue2.config.unstyled;
  }, function(newValue, oldValue) {
    if (!newValue && PrimeVue2.config.theme) {
      loadCommonTheme();
    }
    PrimeVueService.emit("config:unstyled:change", {
      newValue,
      oldValue
    });
  }, {
    immediate: true,
    deep: true
  });
  stopWatchers.push(stopConfigWatcher);
  stopWatchers.push(stopRippleWatcher);
  stopWatchers.push(stopThemeWatcher);
  stopWatchers.push(stopUnstyledWatcher);
}
var PrimeVue = {
  install: function install(app, options) {
    var configOptions = H(defaultOptions, options);
    setup(app, configOptions);
  }
};
var t$G = (...t2) => ke(...t2);
var o$1m = { transitionDuration: "{transition.duration}" }, r$1j = { borderWidth: "0 0 1px 0", borderColor: "{content.border.color}" }, t$F = { color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{text.color}", activeHoverColor: "{text.color}", padding: "1.125rem", fontWeight: "600", borderRadius: "0", borderWidth: "0", borderColor: "{content.border.color}", background: "{content.background}", hoverBackground: "{content.background}", activeBackground: "{content.background}", activeHoverBackground: "{content.background}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" }, toggleIcon: { color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{text.color}", activeHoverColor: "{text.color}" }, first: { topBorderRadius: "{content.border.radius}", borderWidth: "0" }, last: { bottomBorderRadius: "{content.border.radius}", activeBottomBorderRadius: "0" } }, e$V = { borderWidth: "0", borderColor: "{content.border.color}", background: "{content.background}", color: "{text.color}", padding: "0 1.125rem 1.125rem 1.125rem" }, c$p = { root: o$1m, panel: r$1j, header: t$F, content: e$V };
var o$1l = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}" }, r$1i = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" }, d$w = { padding: "{list.padding}", gap: "{list.gap}" }, e$U = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" }, l$g = { background: "{list.option.group.background}", color: "{list.option.group.color}", fontWeight: "{list.option.group.font.weight}", padding: "{list.option.group.padding}" }, i$r = { width: "2.5rem", sm: { width: "2rem" }, lg: { width: "3rem" }, borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", activeBorderColor: "{form.field.border.color}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, c$o = { borderRadius: "{border.radius.sm}" }, f$9 = { padding: "{list.option.padding}" }, s$9 = { light: { chip: { focusBackground: "{surface.200}", focusColor: "{surface.800}" }, dropdown: { background: "{surface.100}", hoverBackground: "{surface.200}", activeBackground: "{surface.300}", color: "{surface.600}", hoverColor: "{surface.700}", activeColor: "{surface.800}" } }, dark: { chip: { focusBackground: "{surface.700}", focusColor: "{surface.0}" }, dropdown: { background: "{surface.800}", hoverBackground: "{surface.700}", activeBackground: "{surface.600}", color: "{surface.300}", hoverColor: "{surface.200}", activeColor: "{surface.100}" } } }, a$F = { root: o$1l, overlay: r$1i, list: d$w, option: e$U, optionGroup: l$g, dropdown: i$r, chip: c$o, emptyMessage: f$9, colorScheme: s$9 };
var e$T = { width: "2rem", height: "2rem", fontSize: "1rem", background: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}" }, r$1h = { size: "1rem" }, o$1k = { borderColor: "{content.background}", offset: "-0.75rem" }, t$E = { width: "3rem", height: "3rem", fontSize: "1.5rem", icon: { size: "1.5rem" }, group: { offset: "-1rem" } }, i$q = { width: "4rem", height: "4rem", fontSize: "2rem", icon: { size: "2rem" }, group: { offset: "-1.5rem" } }, n$B = { root: e$T, icon: r$1h, group: o$1k, lg: t$E, xl: i$q };
var r$1g = { borderRadius: "{border.radius.md}", padding: "0 0.5rem", fontSize: "0.75rem", fontWeight: "700", minWidth: "1.5rem", height: "1.5rem" }, o$1j = { size: "0.5rem" }, e$S = { fontSize: "0.625rem", minWidth: "1.25rem", height: "1.25rem" }, c$n = { fontSize: "0.875rem", minWidth: "1.75rem", height: "1.75rem" }, a$E = { fontSize: "1rem", minWidth: "2rem", height: "2rem" }, n$A = { light: { primary: { background: "{primary.color}", color: "{primary.contrast.color}" }, secondary: { background: "{surface.100}", color: "{surface.600}" }, success: { background: "{green.500}", color: "{surface.0}" }, info: { background: "{sky.500}", color: "{surface.0}" }, warn: { background: "{orange.500}", color: "{surface.0}" }, danger: { background: "{red.500}", color: "{surface.0}" }, contrast: { background: "{surface.950}", color: "{surface.0}" } }, dark: { primary: { background: "{primary.color}", color: "{primary.contrast.color}" }, secondary: { background: "{surface.800}", color: "{surface.300}" }, success: { background: "{green.400}", color: "{green.950}" }, info: { background: "{sky.400}", color: "{sky.950}" }, warn: { background: "{orange.400}", color: "{orange.950}" }, danger: { background: "{red.400}", color: "{red.950}" }, contrast: { background: "{surface.0}", color: "{surface.950}" } } }, d$v = { root: r$1g, dot: o$1j, sm: e$S, lg: c$n, xl: a$E, colorScheme: n$A };
var r$1f = { borderRadius: { none: "0", xs: "2px", sm: "4px", md: "6px", lg: "8px", xl: "12px" }, emerald: { 50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7", 400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857", 800: "#065f46", 900: "#064e3b", 950: "#022c22" }, green: { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16" }, lime: { 50: "#f7fee7", 100: "#ecfccb", 200: "#d9f99d", 300: "#bef264", 400: "#a3e635", 500: "#84cc16", 600: "#65a30d", 700: "#4d7c0f", 800: "#3f6212", 900: "#365314", 950: "#1a2e05" }, red: { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a" }, orange: { 50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74", 400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c", 800: "#9a3412", 900: "#7c2d12", 950: "#431407" }, amber: { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f", 950: "#451a03" }, yellow: { 50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047", 400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207", 800: "#854d0e", 900: "#713f12", 950: "#422006" }, teal: { 50: "#f0fdfa", 100: "#ccfbf1", 200: "#99f6e4", 300: "#5eead4", 400: "#2dd4bf", 500: "#14b8a6", 600: "#0d9488", 700: "#0f766e", 800: "#115e59", 900: "#134e4a", 950: "#042f2e" }, cyan: { 50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63", 950: "#083344" }, sky: { 50: "#f0f9ff", 100: "#e0f2fe", 200: "#bae6fd", 300: "#7dd3fc", 400: "#38bdf8", 500: "#0ea5e9", 600: "#0284c7", 700: "#0369a1", 800: "#075985", 900: "#0c4a6e", 950: "#082f49" }, blue: { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554" }, indigo: { 50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc", 400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca", 800: "#3730a3", 900: "#312e81", 950: "#1e1b4b" }, violet: { 50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd", 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9", 800: "#5b21b6", 900: "#4c1d95", 950: "#2e1065" }, purple: { 50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe", 400: "#c084fc", 500: "#a855f7", 600: "#9333ea", 700: "#7e22ce", 800: "#6b21a8", 900: "#581c87", 950: "#3b0764" }, fuchsia: { 50: "#fdf4ff", 100: "#fae8ff", 200: "#f5d0fe", 300: "#f0abfc", 400: "#e879f9", 500: "#d946ef", 600: "#c026d3", 700: "#a21caf", 800: "#86198f", 900: "#701a75", 950: "#4a044e" }, pink: { 50: "#fdf2f8", 100: "#fce7f3", 200: "#fbcfe8", 300: "#f9a8d4", 400: "#f472b6", 500: "#ec4899", 600: "#db2777", 700: "#be185d", 800: "#9d174d", 900: "#831843", 950: "#500724" }, rose: { 50: "#fff1f2", 100: "#ffe4e6", 200: "#fecdd3", 300: "#fda4af", 400: "#fb7185", 500: "#f43f5e", 600: "#e11d48", 700: "#be123c", 800: "#9f1239", 900: "#881337", 950: "#4c0519" }, slate: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a", 950: "#020617" }, gray: { 50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af", 500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937", 900: "#111827", 950: "#030712" }, zinc: { 50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 300: "#d4d4d8", 400: "#a1a1aa", 500: "#71717a", 600: "#52525b", 700: "#3f3f46", 800: "#27272a", 900: "#18181b", 950: "#09090b" }, neutral: { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4", 400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717", 950: "#0a0a0a" }, stone: { 50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4", 300: "#d6d3d1", 400: "#a8a29e", 500: "#78716c", 600: "#57534e", 700: "#44403c", 800: "#292524", 900: "#1c1917", 950: "#0c0a09" } }, o$1i = { transitionDuration: "0.2s", focusRing: { width: "1px", style: "solid", color: "{primary.color}", offset: "2px", shadow: "none" }, disabledOpacity: "0.6", iconSize: "1rem", anchorGutter: "2px", primary: { 50: "{emerald.50}", 100: "{emerald.100}", 200: "{emerald.200}", 300: "{emerald.300}", 400: "{emerald.400}", 500: "{emerald.500}", 600: "{emerald.600}", 700: "{emerald.700}", 800: "{emerald.800}", 900: "{emerald.900}", 950: "{emerald.950}" }, formField: { paddingX: "0.75rem", paddingY: "0.5rem", sm: { fontSize: "0.875rem", paddingX: "0.625rem", paddingY: "0.375rem" }, lg: { fontSize: "1.125rem", paddingX: "0.875rem", paddingY: "0.625rem" }, borderRadius: "{border.radius.md}", focusRing: { width: "0", style: "none", color: "transparent", offset: "0", shadow: "none" }, transitionDuration: "{transition.duration}" }, list: { padding: "0.25rem 0.25rem", gap: "2px", header: { padding: "0.5rem 1rem 0.25rem 1rem" }, option: { padding: "0.5rem 0.75rem", borderRadius: "{border.radius.sm}" }, optionGroup: { padding: "0.5rem 0.75rem", fontWeight: "600" } }, content: { borderRadius: "{border.radius.md}" }, mask: { transitionDuration: "0.3s" }, navigation: { list: { padding: "0.25rem 0.25rem", gap: "2px" }, item: { padding: "0.5rem 0.75rem", borderRadius: "{border.radius.sm}", gap: "0.5rem" }, submenuLabel: { padding: "0.5rem 0.75rem", fontWeight: "600" }, submenuIcon: { size: "0.875rem" } }, overlay: { select: { borderRadius: "{border.radius.md}", shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)" }, popover: { borderRadius: "{border.radius.md}", padding: "0.75rem", shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)" }, modal: { borderRadius: "{border.radius.xl}", padding: "1.25rem", shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }, navigation: { shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)" } }, colorScheme: { light: { surface: { 0: "#ffffff", 50: "{slate.50}", 100: "{slate.100}", 200: "{slate.200}", 300: "{slate.300}", 400: "{slate.400}", 500: "{slate.500}", 600: "{slate.600}", 700: "{slate.700}", 800: "{slate.800}", 900: "{slate.900}", 950: "{slate.950}" }, primary: { color: "{primary.500}", contrastColor: "#ffffff", hoverColor: "{primary.600}", activeColor: "{primary.700}" }, highlight: { background: "{primary.50}", focusBackground: "{primary.100}", color: "{primary.700}", focusColor: "{primary.800}" }, mask: { background: "rgba(0,0,0,0.4)", color: "{surface.200}" }, formField: { background: "{surface.0}", disabledBackground: "{surface.200}", filledBackground: "{surface.50}", filledHoverBackground: "{surface.50}", filledFocusBackground: "{surface.50}", borderColor: "{surface.300}", hoverBorderColor: "{surface.400}", focusBorderColor: "{primary.color}", invalidBorderColor: "{red.400}", color: "{surface.700}", disabledColor: "{surface.500}", placeholderColor: "{surface.500}", invalidPlaceholderColor: "{red.600}", floatLabelColor: "{surface.500}", floatLabelFocusColor: "{primary.600}", floatLabelActiveColor: "{surface.500}", floatLabelInvalidColor: "{form.field.invalid.placeholder.color}", iconColor: "{surface.400}", shadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)" }, text: { color: "{surface.700}", hoverColor: "{surface.800}", mutedColor: "{surface.500}", hoverMutedColor: "{surface.600}" }, content: { background: "{surface.0}", hoverBackground: "{surface.100}", borderColor: "{surface.200}", color: "{text.color}", hoverColor: "{text.hover.color}" }, overlay: { select: { background: "{surface.0}", borderColor: "{surface.200}", color: "{text.color}" }, popover: { background: "{surface.0}", borderColor: "{surface.200}", color: "{text.color}" }, modal: { background: "{surface.0}", borderColor: "{surface.200}", color: "{text.color}" } }, list: { option: { focusBackground: "{surface.100}", selectedBackground: "{highlight.background}", selectedFocusBackground: "{highlight.focus.background}", color: "{text.color}", focusColor: "{text.hover.color}", selectedColor: "{highlight.color}", selectedFocusColor: "{highlight.focus.color}", icon: { color: "{surface.400}", focusColor: "{surface.500}" } }, optionGroup: { background: "transparent", color: "{text.muted.color}" } }, navigation: { item: { focusBackground: "{surface.100}", activeBackground: "{surface.100}", color: "{text.color}", focusColor: "{text.hover.color}", activeColor: "{text.hover.color}", icon: { color: "{surface.400}", focusColor: "{surface.500}", activeColor: "{surface.500}" } }, submenuLabel: { background: "transparent", color: "{text.muted.color}" }, submenuIcon: { color: "{surface.400}", focusColor: "{surface.500}", activeColor: "{surface.500}" } } }, dark: { surface: { 0: "#ffffff", 50: "{zinc.50}", 100: "{zinc.100}", 200: "{zinc.200}", 300: "{zinc.300}", 400: "{zinc.400}", 500: "{zinc.500}", 600: "{zinc.600}", 700: "{zinc.700}", 800: "{zinc.800}", 900: "{zinc.900}", 950: "{zinc.950}" }, primary: { color: "{primary.400}", contrastColor: "{surface.900}", hoverColor: "{primary.300}", activeColor: "{primary.200}" }, highlight: { background: "color-mix(in srgb, {primary.400}, transparent 84%)", focusBackground: "color-mix(in srgb, {primary.400}, transparent 76%)", color: "rgba(255,255,255,.87)", focusColor: "rgba(255,255,255,.87)" }, mask: { background: "rgba(0,0,0,0.6)", color: "{surface.200}" }, formField: { background: "{surface.950}", disabledBackground: "{surface.700}", filledBackground: "{surface.800}", filledHoverBackground: "{surface.800}", filledFocusBackground: "{surface.800}", borderColor: "{surface.600}", hoverBorderColor: "{surface.500}", focusBorderColor: "{primary.color}", invalidBorderColor: "{red.300}", color: "{surface.0}", disabledColor: "{surface.400}", placeholderColor: "{surface.400}", invalidPlaceholderColor: "{red.400}", floatLabelColor: "{surface.400}", floatLabelFocusColor: "{primary.color}", floatLabelActiveColor: "{surface.400}", floatLabelInvalidColor: "{form.field.invalid.placeholder.color}", iconColor: "{surface.400}", shadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)" }, text: { color: "{surface.0}", hoverColor: "{surface.0}", mutedColor: "{surface.400}", hoverMutedColor: "{surface.300}" }, content: { background: "{surface.900}", hoverBackground: "{surface.800}", borderColor: "{surface.700}", color: "{text.color}", hoverColor: "{text.hover.color}" }, overlay: { select: { background: "{surface.900}", borderColor: "{surface.700}", color: "{text.color}" }, popover: { background: "{surface.900}", borderColor: "{surface.700}", color: "{text.color}" }, modal: { background: "{surface.900}", borderColor: "{surface.700}", color: "{text.color}" } }, list: { option: { focusBackground: "{surface.800}", selectedBackground: "{highlight.background}", selectedFocusBackground: "{highlight.focus.background}", color: "{text.color}", focusColor: "{text.hover.color}", selectedColor: "{highlight.color}", selectedFocusColor: "{highlight.focus.color}", icon: { color: "{surface.500}", focusColor: "{surface.400}" } }, optionGroup: { background: "transparent", color: "{text.muted.color}" } }, navigation: { item: { focusBackground: "{surface.800}", activeBackground: "{surface.800}", color: "{text.color}", focusColor: "{text.hover.color}", activeColor: "{text.hover.color}", icon: { color: "{surface.500}", focusColor: "{surface.400}", activeColor: "{surface.400}" } }, submenuLabel: { background: "transparent", color: "{text.muted.color}" }, submenuIcon: { color: "{surface.500}", focusColor: "{surface.400}", activeColor: "{surface.400}" } } } } }, e$R = { primitive: r$1f, semantic: o$1i };
var r$1e = { borderRadius: "{content.border.radius}" }, o$1h = { root: r$1e };
var o$1g = { padding: "1rem", background: "{content.background}", gap: "0.5rem", transitionDuration: "{transition.duration}" }, r$1d = { color: "{text.muted.color}", hoverColor: "{text.color}", borderRadius: "{content.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", hoverColor: "{navigation.item.icon.focus.color}" }, focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, i$p = { color: "{navigation.item.icon.color}" }, t$D = { root: o$1g, item: r$1d, separator: i$p };
var r$1c = { borderRadius: "{form.field.border.radius}", roundedBorderRadius: "2rem", gap: "0.5rem", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", iconOnlyWidth: "2.5rem", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}", iconOnlyWidth: "2rem" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}", iconOnlyWidth: "3rem" }, label: { fontWeight: "500" }, raisedShadow: "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", offset: "{focus.ring.offset}" }, badgeSize: "1rem", transitionDuration: "{form.field.transition.duration}" }, o$1f = { light: { root: { primary: { background: "{primary.color}", hoverBackground: "{primary.hover.color}", activeBackground: "{primary.active.color}", borderColor: "{primary.color}", hoverBorderColor: "{primary.hover.color}", activeBorderColor: "{primary.active.color}", color: "{primary.contrast.color}", hoverColor: "{primary.contrast.color}", activeColor: "{primary.contrast.color}", focusRing: { color: "{primary.color}", shadow: "none" } }, secondary: { background: "{surface.100}", hoverBackground: "{surface.200}", activeBackground: "{surface.300}", borderColor: "{surface.100}", hoverBorderColor: "{surface.200}", activeBorderColor: "{surface.300}", color: "{surface.600}", hoverColor: "{surface.700}", activeColor: "{surface.800}", focusRing: { color: "{surface.600}", shadow: "none" } }, info: { background: "{sky.500}", hoverBackground: "{sky.600}", activeBackground: "{sky.700}", borderColor: "{sky.500}", hoverBorderColor: "{sky.600}", activeBorderColor: "{sky.700}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "{sky.500}", shadow: "none" } }, success: { background: "{green.500}", hoverBackground: "{green.600}", activeBackground: "{green.700}", borderColor: "{green.500}", hoverBorderColor: "{green.600}", activeBorderColor: "{green.700}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "{green.500}", shadow: "none" } }, warn: { background: "{orange.500}", hoverBackground: "{orange.600}", activeBackground: "{orange.700}", borderColor: "{orange.500}", hoverBorderColor: "{orange.600}", activeBorderColor: "{orange.700}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "{orange.500}", shadow: "none" } }, help: { background: "{purple.500}", hoverBackground: "{purple.600}", activeBackground: "{purple.700}", borderColor: "{purple.500}", hoverBorderColor: "{purple.600}", activeBorderColor: "{purple.700}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "{purple.500}", shadow: "none" } }, danger: { background: "{red.500}", hoverBackground: "{red.600}", activeBackground: "{red.700}", borderColor: "{red.500}", hoverBorderColor: "{red.600}", activeBorderColor: "{red.700}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "{red.500}", shadow: "none" } }, contrast: { background: "{surface.950}", hoverBackground: "{surface.900}", activeBackground: "{surface.800}", borderColor: "{surface.950}", hoverBorderColor: "{surface.900}", activeBorderColor: "{surface.800}", color: "{surface.0}", hoverColor: "{surface.0}", activeColor: "{surface.0}", focusRing: { color: "{surface.950}", shadow: "none" } } }, outlined: { primary: { hoverBackground: "{primary.50}", activeBackground: "{primary.100}", borderColor: "{primary.200}", color: "{primary.color}" }, secondary: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", borderColor: "{surface.200}", color: "{surface.500}" }, success: { hoverBackground: "{green.50}", activeBackground: "{green.100}", borderColor: "{green.200}", color: "{green.500}" }, info: { hoverBackground: "{sky.50}", activeBackground: "{sky.100}", borderColor: "{sky.200}", color: "{sky.500}" }, warn: { hoverBackground: "{orange.50}", activeBackground: "{orange.100}", borderColor: "{orange.200}", color: "{orange.500}" }, help: { hoverBackground: "{purple.50}", activeBackground: "{purple.100}", borderColor: "{purple.200}", color: "{purple.500}" }, danger: { hoverBackground: "{red.50}", activeBackground: "{red.100}", borderColor: "{red.200}", color: "{red.500}" }, contrast: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", borderColor: "{surface.700}", color: "{surface.950}" }, plain: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", borderColor: "{surface.200}", color: "{surface.700}" } }, text: { primary: { hoverBackground: "{primary.50}", activeBackground: "{primary.100}", color: "{primary.color}" }, secondary: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", color: "{surface.500}" }, success: { hoverBackground: "{green.50}", activeBackground: "{green.100}", color: "{green.500}" }, info: { hoverBackground: "{sky.50}", activeBackground: "{sky.100}", color: "{sky.500}" }, warn: { hoverBackground: "{orange.50}", activeBackground: "{orange.100}", color: "{orange.500}" }, help: { hoverBackground: "{purple.50}", activeBackground: "{purple.100}", color: "{purple.500}" }, danger: { hoverBackground: "{red.50}", activeBackground: "{red.100}", color: "{red.500}" }, contrast: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", color: "{surface.950}" }, plain: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", color: "{surface.700}" } }, link: { color: "{primary.color}", hoverColor: "{primary.color}", activeColor: "{primary.color}" } }, dark: { root: { primary: { background: "{primary.color}", hoverBackground: "{primary.hover.color}", activeBackground: "{primary.active.color}", borderColor: "{primary.color}", hoverBorderColor: "{primary.hover.color}", activeBorderColor: "{primary.active.color}", color: "{primary.contrast.color}", hoverColor: "{primary.contrast.color}", activeColor: "{primary.contrast.color}", focusRing: { color: "{primary.color}", shadow: "none" } }, secondary: { background: "{surface.800}", hoverBackground: "{surface.700}", activeBackground: "{surface.600}", borderColor: "{surface.800}", hoverBorderColor: "{surface.700}", activeBorderColor: "{surface.600}", color: "{surface.300}", hoverColor: "{surface.200}", activeColor: "{surface.100}", focusRing: { color: "{surface.300}", shadow: "none" } }, info: { background: "{sky.400}", hoverBackground: "{sky.300}", activeBackground: "{sky.200}", borderColor: "{sky.400}", hoverBorderColor: "{sky.300}", activeBorderColor: "{sky.200}", color: "{sky.950}", hoverColor: "{sky.950}", activeColor: "{sky.950}", focusRing: { color: "{sky.400}", shadow: "none" } }, success: { background: "{green.400}", hoverBackground: "{green.300}", activeBackground: "{green.200}", borderColor: "{green.400}", hoverBorderColor: "{green.300}", activeBorderColor: "{green.200}", color: "{green.950}", hoverColor: "{green.950}", activeColor: "{green.950}", focusRing: { color: "{green.400}", shadow: "none" } }, warn: { background: "{orange.400}", hoverBackground: "{orange.300}", activeBackground: "{orange.200}", borderColor: "{orange.400}", hoverBorderColor: "{orange.300}", activeBorderColor: "{orange.200}", color: "{orange.950}", hoverColor: "{orange.950}", activeColor: "{orange.950}", focusRing: { color: "{orange.400}", shadow: "none" } }, help: { background: "{purple.400}", hoverBackground: "{purple.300}", activeBackground: "{purple.200}", borderColor: "{purple.400}", hoverBorderColor: "{purple.300}", activeBorderColor: "{purple.200}", color: "{purple.950}", hoverColor: "{purple.950}", activeColor: "{purple.950}", focusRing: { color: "{purple.400}", shadow: "none" } }, danger: { background: "{red.400}", hoverBackground: "{red.300}", activeBackground: "{red.200}", borderColor: "{red.400}", hoverBorderColor: "{red.300}", activeBorderColor: "{red.200}", color: "{red.950}", hoverColor: "{red.950}", activeColor: "{red.950}", focusRing: { color: "{red.400}", shadow: "none" } }, contrast: { background: "{surface.0}", hoverBackground: "{surface.100}", activeBackground: "{surface.200}", borderColor: "{surface.0}", hoverBorderColor: "{surface.100}", activeBorderColor: "{surface.200}", color: "{surface.950}", hoverColor: "{surface.950}", activeColor: "{surface.950}", focusRing: { color: "{surface.0}", shadow: "none" } } }, outlined: { primary: { hoverBackground: "color-mix(in srgb, {primary.color}, transparent 96%)", activeBackground: "color-mix(in srgb, {primary.color}, transparent 84%)", borderColor: "{primary.700}", color: "{primary.color}" }, secondary: { hoverBackground: "rgba(255,255,255,0.04)", activeBackground: "rgba(255,255,255,0.16)", borderColor: "{surface.700}", color: "{surface.400}" }, success: { hoverBackground: "color-mix(in srgb, {green.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {green.400}, transparent 84%)", borderColor: "{green.700}", color: "{green.400}" }, info: { hoverBackground: "color-mix(in srgb, {sky.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {sky.400}, transparent 84%)", borderColor: "{sky.700}", color: "{sky.400}" }, warn: { hoverBackground: "color-mix(in srgb, {orange.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {orange.400}, transparent 84%)", borderColor: "{orange.700}", color: "{orange.400}" }, help: { hoverBackground: "color-mix(in srgb, {purple.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {purple.400}, transparent 84%)", borderColor: "{purple.700}", color: "{purple.400}" }, danger: { hoverBackground: "color-mix(in srgb, {red.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {red.400}, transparent 84%)", borderColor: "{red.700}", color: "{red.400}" }, contrast: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", borderColor: "{surface.500}", color: "{surface.0}" }, plain: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", borderColor: "{surface.600}", color: "{surface.0}" } }, text: { primary: { hoverBackground: "color-mix(in srgb, {primary.color}, transparent 96%)", activeBackground: "color-mix(in srgb, {primary.color}, transparent 84%)", color: "{primary.color}" }, secondary: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", color: "{surface.400}" }, success: { hoverBackground: "color-mix(in srgb, {green.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {green.400}, transparent 84%)", color: "{green.400}" }, info: { hoverBackground: "color-mix(in srgb, {sky.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {sky.400}, transparent 84%)", color: "{sky.400}" }, warn: { hoverBackground: "color-mix(in srgb, {orange.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {orange.400}, transparent 84%)", color: "{orange.400}" }, help: { hoverBackground: "color-mix(in srgb, {purple.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {purple.400}, transparent 84%)", color: "{purple.400}" }, danger: { hoverBackground: "color-mix(in srgb, {red.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {red.400}, transparent 84%)", color: "{red.400}" }, contrast: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", color: "{surface.0}" }, plain: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", color: "{surface.0}" } }, link: { color: "{primary.color}", hoverColor: "{primary.color}", activeColor: "{primary.color}" } } }, e$Q = { root: r$1c, colorScheme: o$1f };
var o$1e = { background: "{content.background}", borderRadius: "{border.radius.xl}", color: "{content.color}", shadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)" }, r$1b = { padding: "1.25rem", gap: "0.5rem" }, t$C = { gap: "0.5rem" }, e$P = { fontSize: "1.25rem", fontWeight: "500" }, a$D = { color: "{text.muted.color}" }, d$u = { root: o$1e, body: r$1b, caption: t$C, title: e$P, subtitle: a$D };
var r$1a = { transitionDuration: "{transition.duration}" }, o$1d = { gap: "0.25rem" }, a$C = { padding: "1rem", gap: "0.5rem" }, i$o = { width: "2rem", height: "0.5rem", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, c$m = { light: { indicator: { background: "{surface.200}", hoverBackground: "{surface.300}", activeBackground: "{primary.color}" } }, dark: { indicator: { background: "{surface.700}", hoverBackground: "{surface.600}", activeBackground: "{primary.color}" } } }, t$B = { root: r$1a, content: o$1d, indicatorList: a$C, indicator: i$o, colorScheme: c$m };
var o$1c = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } }, r$19 = { width: "2.5rem", color: "{form.field.icon.color}" }, d$t = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" }, l$f = { padding: "{list.padding}", gap: "{list.gap}", mobileIndent: "1rem" }, e$O = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}", icon: { color: "{list.option.icon.color}", focusColor: "{list.option.icon.focus.color}", size: "0.875rem" } }, i$n = { color: "{form.field.icon.color}" }, f$8 = { root: o$1c, dropdown: r$19, overlay: d$t, list: l$f, option: e$O, clearIcon: i$n };
var r$18 = { borderRadius: "{border.radius.sm}", width: "1.25rem", height: "1.25rem", background: "{form.field.background}", checkedBackground: "{primary.color}", checkedHoverBackground: "{primary.hover.color}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.border.color}", checkedBorderColor: "{primary.color}", checkedHoverBorderColor: "{primary.hover.color}", checkedFocusBorderColor: "{primary.color}", checkedDisabledBorderColor: "{form.field.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", shadow: "{form.field.shadow}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { width: "1rem", height: "1rem" }, lg: { width: "1.5rem", height: "1.5rem" } }, o$1b = { size: "0.875rem", color: "{form.field.color}", checkedColor: "{primary.contrast.color}", checkedHoverColor: "{primary.contrast.color}", disabledColor: "{form.field.disabled.color}", sm: { size: "0.75rem" }, lg: { size: "1rem" } }, e$N = { root: r$18, icon: o$1b };
var o$1a = { borderRadius: "16px", paddingX: "0.75rem", paddingY: "0.5rem", gap: "0.5rem", transitionDuration: "{transition.duration}" }, r$17 = { width: "2rem", height: "2rem" }, e$M = { size: "1rem" }, c$l = { size: "1rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" } }, i$m = { light: { root: { background: "{surface.100}", color: "{surface.800}" }, icon: { color: "{surface.800}" }, removeIcon: { color: "{surface.800}" } }, dark: { root: { background: "{surface.800}", color: "{surface.0}" }, icon: { color: "{surface.0}" }, removeIcon: { color: "{surface.0}" } } }, s$8 = { root: o$1a, image: r$17, icon: e$M, removeIcon: c$l, colorScheme: i$m };
var r$16 = { transitionDuration: "{transition.duration}" }, o$19 = { width: "1.5rem", height: "1.5rem", borderRadius: "{form.field.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, e$L = { shadow: "{overlay.popover.shadow}", borderRadius: "{overlay.popover.borderRadius}" }, a$B = { light: { panel: { background: "{surface.800}", borderColor: "{surface.900}" }, handle: { color: "{surface.0}" } }, dark: { panel: { background: "{surface.900}", borderColor: "{surface.700}" }, handle: { color: "{surface.0}" } } }, s$7 = { root: r$16, preview: o$19, panel: e$L, colorScheme: a$B };
var o$18 = { size: "2rem", color: "{overlay.modal.color}" }, e$K = { gap: "1rem" }, r$15 = { icon: o$18, content: e$K };
var o$17 = { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", color: "{overlay.popover.color}", borderRadius: "{overlay.popover.border.radius}", shadow: "{overlay.popover.shadow}", gutter: "10px", arrowOffset: "1.25rem" }, r$14 = { padding: "{overlay.popover.padding}", gap: "1rem" }, e$J = { size: "1.5rem", color: "{overlay.popover.color}" }, p$2 = { gap: "0.5rem", padding: "0 {overlay.popover.padding} {overlay.popover.padding} {overlay.popover.padding}" }, a$A = { root: o$17, content: r$14, icon: e$J, footer: p$2 };
var o$16 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", transitionDuration: "{transition.duration}" }, i$l = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" }, n$z = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } }, a$z = { mobileIndent: "1rem" }, t$A = { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" }, r$13 = { borderColor: "{content.border.color}" }, c$k = { root: o$16, list: i$l, item: n$z, submenu: a$z, submenuIcon: t$A, separator: r$13 };
var t$z = "\n    li.p-autocomplete-option,\n    div.p-cascadeselect-option-content,\n    li.p-listbox-option,\n    li.p-multiselect-option,\n    li.p-select-option,\n    li.p-listbox-option,\n    div.p-tree-node-content,\n    li.p-datatable-filter-constraint,\n    .p-datatable .p-datatable-tbody > tr,\n    .p-treetable .p-treetable-tbody > tr,\n    div.p-menu-item-content,\n    div.p-tieredmenu-item-content,\n    div.p-contextmenu-item-content,\n    div.p-menubar-item-content,\n    div.p-megamenu-item-content,\n    div.p-panelmenu-header-content,\n    div.p-panelmenu-item-content,\n    th.p-datatable-header-cell,\n    th.p-treetable-header-cell,\n    thead.p-datatable-thead > tr > th,\n    .p-treetable thead.p-treetable-thead>tr>th {\n        transition: none;\n    }\n";
var o$15 = { transitionDuration: "{transition.duration}" }, r$12 = { background: "{content.background}", borderColor: "{datatable.border.color}", color: "{content.color}", borderWidth: "0 0 1px 0", padding: "0.75rem 1rem", sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } }, e$I = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", borderColor: "{datatable.border.color}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{highlight.color}", gap: "0.5rem", padding: "0.75rem 1rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" }, sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } }, d$s = { fontWeight: "600" }, t$y = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{highlight.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" } }, l$e = { borderColor: "{datatable.border.color}", padding: "0.75rem 1rem", sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } }, c$j = { background: "{content.background}", borderColor: "{datatable.border.color}", color: "{content.color}", padding: "0.75rem 1rem", sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } }, a$y = { fontWeight: "600" }, n$y = { background: "{content.background}", borderColor: "{datatable.border.color}", color: "{content.color}", borderWidth: "0 0 1px 0", padding: "0.75rem 1rem", sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } }, i$k = { color: "{primary.color}" }, s$6 = { width: "0.5rem" }, g$4 = { width: "1px", color: "{primary.color}" }, u$5 = { color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", size: "0.875rem" }, b$3 = { size: "2rem" }, p$1 = { hoverBackground: "{content.hover.background}", selectedHoverBackground: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.color}", selectedHoverColor: "{primary.color}", size: "1.75rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, m$3 = { inlineGap: "0.5rem", overlaySelect: { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" }, overlayPopover: { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", borderRadius: "{overlay.popover.border.radius}", color: "{overlay.popover.color}", shadow: "{overlay.popover.shadow}", padding: "{overlay.popover.padding}", gap: "0.5rem" }, rule: { borderColor: "{content.border.color}" }, constraintList: { padding: "{list.padding}", gap: "{list.gap}" }, constraint: { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", separator: { borderColor: "{content.border.color}" }, padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" } }, h$3 = { borderColor: "{datatable.border.color}", borderWidth: "0 0 1px 0" }, k$2 = { borderColor: "{datatable.border.color}", borderWidth: "0 0 1px 0" }, f$7 = { light: { root: { borderColor: "{content.border.color}" }, row: { stripedBackground: "{surface.50}" }, bodyCell: { selectedBorderColor: "{primary.100}" } }, dark: { root: { borderColor: "{surface.800}" }, row: { stripedBackground: "{surface.950}" }, bodyCell: { selectedBorderColor: "{primary.900}" } } }, css$2 = "\n    .p-datatable-mask.p-overlay-mask {\n        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));\n    }\n", v$1 = { root: o$15, header: r$12, headerCell: e$I, columnTitle: d$s, row: t$y, bodyCell: l$e, footerCell: c$j, columnFooter: a$y, footer: n$y, dropPoint: i$k, columnResizer: s$6, resizeIndicator: g$4, sortIcon: u$5, loadingIcon: b$3, rowToggleButton: p$1, filter: m$3, paginatorTop: h$3, paginatorBottom: k$2, colorScheme: f$7, css: css$2 };
var o$14 = { borderColor: "transparent", borderWidth: "0", borderRadius: "0", padding: "0" }, r$11 = { background: "{content.background}", color: "{content.color}", borderColor: "{content.border.color}", borderWidth: "0 0 1px 0", padding: "0.75rem 1rem", borderRadius: "0" }, d$r = { background: "{content.background}", color: "{content.color}", borderColor: "transparent", borderWidth: "0", padding: "0", borderRadius: "0" }, e$H = { background: "{content.background}", color: "{content.color}", borderColor: "{content.border.color}", borderWidth: "1px 0 0 0", padding: "0.75rem 1rem", borderRadius: "0" }, t$x = { borderColor: "{content.border.color}", borderWidth: "0 0 1px 0" }, n$x = { borderColor: "{content.border.color}", borderWidth: "1px 0 0 0" }, c$i = { root: o$14, header: r$11, content: d$r, footer: e$H, paginatorTop: t$x, paginatorBottom: n$x };
var o$13 = { transitionDuration: "{transition.duration}" }, r$10 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.popover.shadow}", padding: "{overlay.popover.padding}" }, e$G = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", padding: "0 0 0.5rem 0" }, c$h = { gap: "0.5rem", fontWeight: "500" }, d$q = { width: "2.5rem", sm: { width: "2rem" }, lg: { width: "3rem" }, borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", activeBorderColor: "{form.field.border.color}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, n$w = { color: "{form.field.icon.color}" }, t$w = { hoverBackground: "{content.hover.background}", color: "{content.color}", hoverColor: "{content.hover.color}", padding: "0.25rem 0.5rem", borderRadius: "{content.border.radius}" }, a$x = { hoverBackground: "{content.hover.background}", color: "{content.color}", hoverColor: "{content.hover.color}", padding: "0.25rem 0.5rem", borderRadius: "{content.border.radius}" }, i$j = { borderColor: "{content.border.color}", gap: "{overlay.popover.padding}" }, l$d = { margin: "0.5rem 0 0 0" }, u$4 = { padding: "0.25rem", fontWeight: "500", color: "{content.color}" }, s$5 = { hoverBackground: "{content.hover.background}", selectedBackground: "{primary.color}", rangeSelectedBackground: "{highlight.background}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{primary.contrast.color}", rangeSelectedColor: "{highlight.color}", width: "2rem", height: "2rem", borderRadius: "50%", padding: "0.25rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, g$3 = { margin: "0.5rem 0 0 0" }, f$6 = { padding: "0.375rem", borderRadius: "{content.border.radius}" }, h$2 = { margin: "0.5rem 0 0 0" }, b$2 = { padding: "0.375rem", borderRadius: "{content.border.radius}" }, m$2 = { padding: "0.5rem 0 0 0", borderColor: "{content.border.color}" }, p = { padding: "0.5rem 0 0 0", borderColor: "{content.border.color}", gap: "0.5rem", buttonGap: "0.25rem" }, v = { light: { dropdown: { background: "{surface.100}", hoverBackground: "{surface.200}", activeBackground: "{surface.300}", color: "{surface.600}", hoverColor: "{surface.700}", activeColor: "{surface.800}" }, today: { background: "{surface.200}", color: "{surface.900}" } }, dark: { dropdown: { background: "{surface.800}", hoverBackground: "{surface.700}", activeBackground: "{surface.600}", color: "{surface.300}", hoverColor: "{surface.200}", activeColor: "{surface.100}" }, today: { background: "{surface.700}", color: "{surface.0}" } } }, k$1 = { root: o$13, panel: r$10, header: e$G, title: c$h, dropdown: d$q, inputIcon: n$w, selectMonth: t$w, selectYear: a$x, group: i$j, dayView: l$d, weekDay: u$4, date: s$5, monthView: g$3, month: f$6, yearView: h$2, year: b$2, buttonbar: m$2, timePicker: p, colorScheme: v };
var o$12 = { background: "{overlay.modal.background}", borderColor: "{overlay.modal.border.color}", color: "{overlay.modal.color}", borderRadius: "{overlay.modal.border.radius}", shadow: "{overlay.modal.shadow}" }, a$w = { padding: "{overlay.modal.padding}", gap: "0.5rem" }, d$p = { fontSize: "1.25rem", fontWeight: "600" }, r$$ = { padding: "0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}" }, l$c = { padding: "0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}", gap: "0.5rem" }, e$F = { root: o$12, header: a$w, title: d$p, content: r$$, footer: l$c };
var r$_ = { borderColor: "{content.border.color}" }, o$11 = { background: "{content.background}", color: "{text.color}" }, n$v = { margin: "1rem 0", padding: "0 1rem", content: { padding: "0 0.5rem" } }, e$E = { margin: "0 1rem", padding: "0.5rem 0", content: { padding: "0.5rem 0" } }, t$v = { root: r$_, content: o$11, horizontal: n$v, vertical: e$E };
var r$Z = { background: "rgba(255, 255, 255, 0.1)", borderColor: "rgba(255, 255, 255, 0.2)", padding: "0.5rem", borderRadius: "{border.radius.xl}" }, o$10 = { borderRadius: "{content.border.radius}", padding: "0.5rem", size: "3rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, d$o = { root: r$Z, item: o$10 };
var o$$ = { background: "{overlay.modal.background}", borderColor: "{overlay.modal.border.color}", color: "{overlay.modal.color}", shadow: "{overlay.modal.shadow}" }, a$v = { padding: "{overlay.modal.padding}" }, d$n = { fontSize: "1.5rem", fontWeight: "600" }, r$Y = { padding: "0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}" }, l$b = { padding: "{overlay.modal.padding}" }, e$D = { root: o$$, header: a$v, title: d$n, content: r$Y, footer: l$b };
var o$_ = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}" }, r$X = { color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}" }, e$C = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}", padding: "{list.padding}" }, t$u = { focusBackground: "{list.option.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" }, d$m = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}" }, l$a = { toolbar: o$_, toolbarItem: r$X, overlay: e$C, overlayOption: t$u, content: d$m };
var o$Z = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", padding: "0 1.125rem 1.125rem 1.125rem", transitionDuration: "{transition.duration}" }, r$W = { background: "{content.background}", hoverBackground: "{content.hover.background}", color: "{content.color}", hoverColor: "{content.hover.color}", borderRadius: "{content.border.radius}", borderWidth: "1px", borderColor: "transparent", padding: "0.5rem 0.75rem", gap: "0.5rem", fontWeight: "600", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, t$t = { color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}" }, n$u = { padding: "0" }, e$B = { root: o$Z, legend: r$W, toggleIcon: t$t, content: n$u };
var r$V = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", transitionDuration: "{transition.duration}" }, o$Y = { background: "transparent", color: "{text.color}", padding: "1.125rem", borderColor: "unset", borderWidth: "0", borderRadius: "0", gap: "0.5rem" }, e$A = { highlightBorderColor: "{primary.color}", padding: "0 1.125rem 1.125rem 1.125rem", gap: "1rem" }, t$s = { padding: "1rem", gap: "1rem", borderColor: "{content.border.color}", info: { gap: "0.5rem" } }, a$u = { gap: "0.5rem" }, n$t = { height: "0.25rem" }, d$l = { gap: "0.5rem" }, i$i = { root: r$V, header: o$Y, content: e$A, file: t$s, fileList: a$u, progressbar: n$t, basic: d$l };
var o$X = { color: "{form.field.float.label.color}", focusColor: "{form.field.float.label.focus.color}", activeColor: "{form.field.float.label.active.color}", invalidColor: "{form.field.float.label.invalid.color}", transitionDuration: "0.2s", positionX: "{form.field.padding.x}", positionY: "{form.field.padding.y}", fontWeight: "500", active: { fontSize: "0.75rem", fontWeight: "400" } }, i$h = { active: { top: "-1.25rem" } }, r$U = { input: { paddingTop: "1.5rem", paddingBottom: "{form.field.padding.y}" }, active: { top: "{form.field.padding.y}" } }, a$t = { borderRadius: "{border.radius.xs}", active: { background: "{form.field.background}", padding: "0 0.125rem" } }, d$k = { root: o$X, over: i$h, in: r$U, on: a$t };
var o$W = { borderWidth: "1px", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", transitionDuration: "{transition.duration}" }, r$T = { background: "rgba(255, 255, 255, 0.1)", hoverBackground: "rgba(255, 255, 255, 0.2)", color: "{surface.100}", hoverColor: "{surface.0}", size: "3rem", gutter: "0.5rem", prev: { borderRadius: "50%" }, next: { borderRadius: "50%" }, focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, e$z = { size: "1.5rem" }, t$r = { background: "{content.background}", padding: "1rem 0.25rem" }, c$g = { size: "2rem", borderRadius: "{content.border.radius}", gutter: "0.5rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, n$s = { size: "1rem" }, a$s = { background: "rgba(0, 0, 0, 0.5)", color: "{surface.100}", padding: "1rem" }, s$4 = { gap: "0.5rem", padding: "1rem" }, u$3 = { width: "1rem", height: "1rem", activeBackground: "{primary.color}", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, i$g = { background: "rgba(0, 0, 0, 0.5)" }, d$j = { background: "rgba(255, 255, 255, 0.4)", hoverBackground: "rgba(255, 255, 255, 0.6)", activeBackground: "rgba(255, 255, 255, 0.9)" }, g$2 = { size: "3rem", gutter: "0.5rem", background: "rgba(255, 255, 255, 0.1)", hoverBackground: "rgba(255, 255, 255, 0.2)", color: "{surface.50}", hoverColor: "{surface.0}", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, f$5 = { size: "1.5rem" }, h$1 = { light: { thumbnailNavButton: { hoverBackground: "{surface.100}", color: "{surface.600}", hoverColor: "{surface.700}" }, indicatorButton: { background: "{surface.200}", hoverBackground: "{surface.300}" } }, dark: { thumbnailNavButton: { hoverBackground: "{surface.700}", color: "{surface.400}", hoverColor: "{surface.0}" }, indicatorButton: { background: "{surface.700}", hoverBackground: "{surface.600}" } } }, l$9 = { root: o$W, navButton: r$T, navIcon: e$z, thumbnailsContent: t$r, thumbnailNavButton: c$g, thumbnailNavButtonIcon: n$s, caption: a$s, indicatorList: s$4, indicatorButton: u$3, insetIndicatorList: i$g, insetIndicatorButton: d$j, closeButton: g$2, closeButtonIcon: f$5, colorScheme: h$1 };
var o$V = { color: "{form.field.icon.color}" }, r$S = { icon: o$V };
var o$U = { color: "{form.field.float.label.color}", focusColor: "{form.field.float.label.focus.color}", invalidColor: "{form.field.float.label.invalid.color}", transitionDuration: "0.2s", positionX: "{form.field.padding.x}", top: "{form.field.padding.y}", fontSize: "0.75rem", fontWeight: "400" }, l$8 = { paddingTop: "1.5rem", paddingBottom: "{form.field.padding.y}" }, i$f = { root: o$U, input: l$8 };
var o$T = { transitionDuration: "{transition.duration}" }, r$R = { icon: { size: "1.5rem" }, mask: { background: "{mask.background}", color: "{mask.color}" } }, a$r = { position: { left: "auto", right: "1rem", top: "1rem", bottom: "auto" }, blur: "8px", background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", borderWidth: "1px", borderRadius: "30px", padding: ".5rem", gap: "0.5rem" }, i$e = { hoverBackground: "rgba(255,255,255,0.1)", color: "{surface.50}", hoverColor: "{surface.0}", size: "3rem", iconSize: "1.5rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, e$y = { root: o$T, preview: r$R, toolbar: a$r, action: i$e };
var o$S = { size: "15px", hoverSize: "30px", background: "rgba(255,255,255,0.3)", hoverBackground: "rgba(255,255,255,0.3)", borderColor: "unset", hoverBorderColor: "unset", borderWidth: "0", borderRadius: "50%", transitionDuration: "{transition.duration}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "rgba(255,255,255,0.3)", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, r$Q = { handle: o$S };
var r$P = { padding: "{form.field.padding.y} {form.field.padding.x}", borderRadius: "{content.border.radius}", gap: "0.5rem" }, o$R = { fontWeight: "500" }, e$x = { size: "1rem" }, n$r = { light: { info: { background: "color-mix(in srgb, {blue.50}, transparent 5%)", borderColor: "{blue.200}", color: "{blue.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)" }, success: { background: "color-mix(in srgb, {green.50}, transparent 5%)", borderColor: "{green.200}", color: "{green.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)" }, warn: { background: "color-mix(in srgb,{yellow.50}, transparent 5%)", borderColor: "{yellow.200}", color: "{yellow.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)" }, error: { background: "color-mix(in srgb, {red.50}, transparent 5%)", borderColor: "{red.200}", color: "{red.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)" }, secondary: { background: "{surface.100}", borderColor: "{surface.200}", color: "{surface.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)" }, contrast: { background: "{surface.900}", borderColor: "{surface.950}", color: "{surface.50}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)" } }, dark: { info: { background: "color-mix(in srgb, {blue.500}, transparent 84%)", borderColor: "color-mix(in srgb, {blue.700}, transparent 64%)", color: "{blue.500}", shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)" }, success: { background: "color-mix(in srgb, {green.500}, transparent 84%)", borderColor: "color-mix(in srgb, {green.700}, transparent 64%)", color: "{green.500}", shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)" }, warn: { background: "color-mix(in srgb, {yellow.500}, transparent 84%)", borderColor: "color-mix(in srgb, {yellow.700}, transparent 64%)", color: "{yellow.500}", shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)" }, error: { background: "color-mix(in srgb, {red.500}, transparent 84%)", borderColor: "color-mix(in srgb, {red.700}, transparent 64%)", color: "{red.500}", shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)" }, secondary: { background: "{surface.800}", borderColor: "{surface.700}", color: "{surface.300}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)" }, contrast: { background: "{surface.0}", borderColor: "{surface.100}", color: "{surface.950}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)" } } }, a$q = { root: r$P, text: o$R, icon: e$x, colorScheme: n$r };
var o$Q = { padding: "{form.field.padding.y} {form.field.padding.x}", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, transitionDuration: "{transition.duration}" }, r$O = { hoverBackground: "{content.hover.background}", hoverColor: "{content.hover.color}" }, n$q = { root: o$Q, display: r$O };
var o$P = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}" }, r$N = { borderRadius: "{border.radius.sm}" }, d$i = { light: { chip: { focusBackground: "{surface.200}", color: "{surface.800}" } }, dark: { chip: { focusBackground: "{surface.700}", color: "{surface.0}" } } }, f$4 = { root: o$P, chip: r$N, colorScheme: d$i };
var r$M = { background: "{form.field.background}", borderColor: "{form.field.border.color}", color: "{form.field.icon.color}", borderRadius: "{form.field.border.radius}", padding: "0.5rem", minWidth: "2.5rem" }, o$O = { addon: r$M };
var r$L = { transitionDuration: "{transition.duration}" }, o$N = { width: "2.5rem", borderRadius: "{form.field.border.radius}", verticalPadding: "{form.field.padding.y}" }, e$w = { light: { button: { background: "transparent", hoverBackground: "{surface.100}", activeBackground: "{surface.200}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", activeBorderColor: "{form.field.border.color}", color: "{surface.400}", hoverColor: "{surface.500}", activeColor: "{surface.600}" } }, dark: { button: { background: "transparent", hoverBackground: "{surface.800}", activeBackground: "{surface.700}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", activeBorderColor: "{form.field.border.color}", color: "{surface.400}", hoverColor: "{surface.300}", activeColor: "{surface.200}" } } }, a$p = { root: r$L, button: o$N, colorScheme: e$w };
var r$K = { gap: "0.5rem" }, t$q = { width: "2.5rem", sm: { width: "2rem" }, lg: { width: "3rem" } }, e$v = { root: r$K, input: t$q };
var o$M = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } }, d$h = { root: o$M };
var o$L = { transitionDuration: "{transition.duration}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, r$J = { background: "{primary.color}" }, t$p = { background: "{content.border.color}" }, n$p = { color: "{text.muted.color}" }, c$f = { root: o$L, value: r$J, range: t$p, text: n$p };
var o$K = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", borderColor: "{form.field.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", shadow: "{form.field.shadow}", borderRadius: "{form.field.border.radius}", transitionDuration: "{form.field.transition.duration}" }, r$I = { padding: "{list.padding}", gap: "{list.gap}", header: { padding: "{list.header.padding}" } }, d$g = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" }, i$d = { background: "{list.option.group.background}", color: "{list.option.group.color}", fontWeight: "{list.option.group.font.weight}", padding: "{list.option.group.padding}" }, t$o = { color: "{list.option.color}", gutterStart: "-0.375rem", gutterEnd: "0.375rem" }, e$u = { padding: "{list.option.padding}" }, l$7 = { light: { option: { stripedBackground: "{surface.50}" } }, dark: { option: { stripedBackground: "{surface.900}" } } }, n$o = { root: o$K, list: r$I, option: d$g, optionGroup: i$d, checkmark: t$o, emptyMessage: e$u, colorScheme: l$7 };
var o$J = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", gap: "0.5rem", verticalOrientation: { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" }, horizontalOrientation: { padding: "0.5rem 0.75rem", gap: "0.5rem" }, transitionDuration: "{transition.duration}" }, n$n = { borderRadius: "{content.border.radius}", padding: "{navigation.item.padding}" }, i$c = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } }, a$o = { padding: "0", background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", shadow: "{overlay.navigation.shadow}", gap: "0.5rem" }, r$H = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" }, t$n = { padding: "{navigation.submenu.label.padding}", fontWeight: "{navigation.submenu.label.font.weight}", background: "{navigation.submenu.label.background}", color: "{navigation.submenu.label.color}" }, e$t = { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" }, c$e = { borderColor: "{content.border.color}" }, d$f = { borderRadius: "50%", size: "1.75rem", color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", hoverBackground: "{content.hover.background}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, g$1 = { root: o$J, baseItem: n$n, item: i$c, overlay: a$o, submenu: r$H, submenuLabel: t$n, submenuIcon: e$t, separator: c$e, mobileButton: d$f };
var o$I = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", transitionDuration: "{transition.duration}" }, n$m = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" }, a$n = { focusBackground: "{navigation.item.focus.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}" } }, i$b = { padding: "{navigation.submenu.label.padding}", fontWeight: "{navigation.submenu.label.font.weight}", background: "{navigation.submenu.label.background}", color: "{navigation.submenu.label.color}" }, t$m = { borderColor: "{content.border.color}" }, r$G = { root: o$I, list: n$m, item: a$n, submenuLabel: i$b, separator: t$m };
var o$H = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", gap: "0.5rem", padding: "0.5rem 0.75rem", transitionDuration: "{transition.duration}" }, i$a = { borderRadius: "{content.border.radius}", padding: "{navigation.item.padding}" }, n$l = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } }, r$F = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}", background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", mobileIndent: "1rem", icon: { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" } }, a$m = { borderColor: "{content.border.color}" }, t$l = { borderRadius: "50%", size: "1.75rem", color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", hoverBackground: "{content.hover.background}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, e$s = { root: o$H, baseItem: i$a, item: n$l, submenu: r$F, separator: a$m, mobileButton: t$l };
var o$G = { borderRadius: "{content.border.radius}", borderWidth: "1px", transitionDuration: "{transition.duration}" }, r$E = { padding: "0.5rem 0.75rem", gap: "0.5rem", sm: { padding: "0.375rem 0.625rem" }, lg: { padding: "0.625rem 0.875rem" } }, e$r = { fontSize: "1rem", fontWeight: "500", sm: { fontSize: "0.875rem" }, lg: { fontSize: "1.125rem" } }, n$k = { size: "1.125rem", sm: { size: "1rem" }, lg: { size: "1.25rem" } }, l$6 = { width: "1.75rem", height: "1.75rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", offset: "{focus.ring.offset}" } }, s$3 = { size: "1rem", sm: { size: "0.875rem" }, lg: { size: "1.125rem" } }, c$d = { root: { borderWidth: "1px" } }, a$l = { content: { padding: "0" } }, d$e = { light: { info: { background: "color-mix(in srgb, {blue.50}, transparent 5%)", borderColor: "{blue.200}", color: "{blue.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)", closeButton: { hoverBackground: "{blue.100}", focusRing: { color: "{blue.600}", shadow: "none" } }, outlined: { color: "{blue.600}", borderColor: "{blue.600}" }, simple: { color: "{blue.600}" } }, success: { background: "color-mix(in srgb, {green.50}, transparent 5%)", borderColor: "{green.200}", color: "{green.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)", closeButton: { hoverBackground: "{green.100}", focusRing: { color: "{green.600}", shadow: "none" } }, outlined: { color: "{green.600}", borderColor: "{green.600}" }, simple: { color: "{green.600}" } }, warn: { background: "color-mix(in srgb,{yellow.50}, transparent 5%)", borderColor: "{yellow.200}", color: "{yellow.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)", closeButton: { hoverBackground: "{yellow.100}", focusRing: { color: "{yellow.600}", shadow: "none" } }, outlined: { color: "{yellow.600}", borderColor: "{yellow.600}" }, simple: { color: "{yellow.600}" } }, error: { background: "color-mix(in srgb, {red.50}, transparent 5%)", borderColor: "{red.200}", color: "{red.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)", closeButton: { hoverBackground: "{red.100}", focusRing: { color: "{red.600}", shadow: "none" } }, outlined: { color: "{red.600}", borderColor: "{red.600}" }, simple: { color: "{red.600}" } }, secondary: { background: "{surface.100}", borderColor: "{surface.200}", color: "{surface.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)", closeButton: { hoverBackground: "{surface.200}", focusRing: { color: "{surface.600}", shadow: "none" } }, outlined: { color: "{surface.500}", borderColor: "{surface.500}" }, simple: { color: "{surface.500}" } }, contrast: { background: "{surface.900}", borderColor: "{surface.950}", color: "{surface.50}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)", closeButton: { hoverBackground: "{surface.800}", focusRing: { color: "{surface.50}", shadow: "none" } }, outlined: { color: "{surface.950}", borderColor: "{surface.950}" }, simple: { color: "{surface.950}" } } }, dark: { info: { background: "color-mix(in srgb, {blue.500}, transparent 84%)", borderColor: "color-mix(in srgb, {blue.700}, transparent 64%)", color: "{blue.500}", shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{blue.500}", shadow: "none" } }, outlined: { color: "{blue.500}", borderColor: "{blue.500}" }, simple: { color: "{blue.500}" } }, success: { background: "color-mix(in srgb, {green.500}, transparent 84%)", borderColor: "color-mix(in srgb, {green.700}, transparent 64%)", color: "{green.500}", shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{green.500}", shadow: "none" } }, outlined: { color: "{green.500}", borderColor: "{green.500}" }, simple: { color: "{green.500}" } }, warn: { background: "color-mix(in srgb, {yellow.500}, transparent 84%)", borderColor: "color-mix(in srgb, {yellow.700}, transparent 64%)", color: "{yellow.500}", shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{yellow.500}", shadow: "none" } }, outlined: { color: "{yellow.500}", borderColor: "{yellow.500}" }, simple: { color: "{yellow.500}" } }, error: { background: "color-mix(in srgb, {red.500}, transparent 84%)", borderColor: "color-mix(in srgb, {red.700}, transparent 64%)", color: "{red.500}", shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{red.500}", shadow: "none" } }, outlined: { color: "{red.500}", borderColor: "{red.500}" }, simple: { color: "{red.500}" } }, secondary: { background: "{surface.800}", borderColor: "{surface.700}", color: "{surface.300}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)", closeButton: { hoverBackground: "{surface.700}", focusRing: { color: "{surface.300}", shadow: "none" } }, outlined: { color: "{surface.400}", borderColor: "{surface.400}" }, simple: { color: "{surface.400}" } }, contrast: { background: "{surface.0}", borderColor: "{surface.100}", color: "{surface.950}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)", closeButton: { hoverBackground: "{surface.100}", focusRing: { color: "{surface.950}", shadow: "none" } }, outlined: { color: "{surface.0}", borderColor: "{surface.0}" }, simple: { color: "{surface.0}" } } } }, u$2 = { root: o$G, content: r$E, text: e$r, icon: n$k, closeButton: l$6, closeIcon: s$3, outlined: c$d, simple: a$l, colorScheme: d$e };
var e$q = { borderRadius: "{content.border.radius}", gap: "1rem" }, r$D = { background: "{content.border.color}", size: "0.5rem" }, a$k = { gap: "0.5rem" }, o$F = { size: "0.5rem" }, l$5 = { size: "1rem" }, t$k = { verticalGap: "0.5rem", horizontalGap: "1rem" }, b$1 = { root: e$q, meters: r$D, label: a$k, labelMarker: o$F, labelIcon: l$5, labelList: t$k };
var o$E = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } }, d$d = { width: "2.5rem", color: "{form.field.icon.color}" }, r$C = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" }, l$4 = { padding: "{list.padding}", gap: "{list.gap}", header: { padding: "{list.header.padding}" } }, i$9 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}", gap: "0.5rem" }, e$p = { background: "{list.option.group.background}", color: "{list.option.group.color}", fontWeight: "{list.option.group.font.weight}", padding: "{list.option.group.padding}" }, f$3 = { color: "{form.field.icon.color}" }, a$j = { borderRadius: "{border.radius.sm}" }, c$c = { padding: "{list.option.padding}" }, n$j = { root: o$E, dropdown: d$d, overlay: r$C, list: l$4, option: i$9, optionGroup: e$p, chip: a$j, clearIcon: f$3, emptyMessage: c$c };
var r$B = { gap: "1.125rem" }, a$i = { gap: "0.5rem" }, o$D = { root: r$B, controls: a$i };
var o$C = { gutter: "0.75rem", transitionDuration: "{transition.duration}" }, r$A = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", borderColor: "{content.border.color}", color: "{content.color}", selectedColor: "{highlight.color}", hoverColor: "{content.hover.color}", padding: "0.75rem 1rem", toggleablePadding: "0.75rem 1rem 1.25rem 1rem", borderRadius: "{content.border.radius}" }, e$o = { background: "{content.background}", hoverBackground: "{content.hover.background}", borderColor: "{content.border.color}", color: "{text.muted.color}", hoverColor: "{text.color}", size: "1.5rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, t$j = { color: "{content.border.color}", borderRadius: "{content.border.radius}", height: "24px" }, n$i = { root: o$C, node: r$A, nodeToggleButton: e$o, connector: t$j };
var o$B = { outline: { width: "2px", color: "{content.background}" } }, t$i = { root: o$B };
var o$A = { padding: "0.5rem 1rem", gap: "0.25rem", borderRadius: "{content.border.radius}", background: "{content.background}", color: "{content.color}", transitionDuration: "{transition.duration}" }, r$z = { background: "transparent", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", selectedColor: "{highlight.color}", width: "2.5rem", height: "2.5rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, t$h = { color: "{text.muted.color}" }, e$n = { maxWidth: "2.5rem" }, n$h = { root: o$A, navButton: r$z, currentPageReport: t$h, jumpToPageInput: e$n };
var r$y = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}" }, o$z = { background: "transparent", color: "{text.color}", padding: "1.125rem", borderColor: "{content.border.color}", borderWidth: "0", borderRadius: "0" }, e$m = { padding: "0.375rem 1.125rem" }, d$c = { fontWeight: "600" }, t$g = { padding: "0 1.125rem 1.125rem 1.125rem" }, n$g = { padding: "0 1.125rem 1.125rem 1.125rem" }, a$h = { root: r$y, header: o$z, toggleableHeader: e$m, title: d$c, content: t$g, footer: n$g };
var o$y = { gap: "0.5rem", transitionDuration: "{transition.duration}" }, r$x = { background: "{content.background}", borderColor: "{content.border.color}", borderWidth: "1px", color: "{content.color}", padding: "0.25rem 0.25rem", borderRadius: "{content.border.radius}", first: { borderWidth: "1px", topBorderRadius: "{content.border.radius}" }, last: { borderWidth: "1px", bottomBorderRadius: "{content.border.radius}" } }, n$f = { focusBackground: "{navigation.item.focus.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", gap: "0.5rem", padding: "{navigation.item.padding}", borderRadius: "{content.border.radius}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}" } }, i$8 = { indent: "1rem" }, t$f = { color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}" }, a$g = { root: o$y, panel: r$x, item: n$f, submenu: i$8, submenuIcon: t$f };
var r$w = { background: "{content.border.color}", borderRadius: "{content.border.radius}", height: ".75rem" }, o$x = { color: "{form.field.icon.color}" }, e$l = { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", borderRadius: "{overlay.popover.border.radius}", color: "{overlay.popover.color}", padding: "{overlay.popover.padding}", shadow: "{overlay.popover.shadow}" }, a$f = { gap: "0.5rem" }, d$b = { light: { strength: { weakBackground: "{red.500}", mediumBackground: "{amber.500}", strongBackground: "{green.500}" } }, dark: { strength: { weakBackground: "{red.400}", mediumBackground: "{amber.400}", strongBackground: "{green.400}" } } }, n$e = { meter: r$w, icon: o$x, overlay: e$l, content: a$f, colorScheme: d$b };
var r$v = { gap: "1.125rem" }, a$e = { gap: "0.5rem" }, o$w = { root: r$v, controls: a$e };
var o$v = { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", color: "{overlay.popover.color}", borderRadius: "{overlay.popover.border.radius}", shadow: "{overlay.popover.shadow}", gutter: "10px", arrowOffset: "1.25rem" }, r$u = { padding: "{overlay.popover.padding}" }, e$k = { root: o$v, content: r$u };
var r$t = { background: "{content.border.color}", borderRadius: "{content.border.radius}", height: "1.25rem" }, o$u = { background: "{primary.color}" }, e$j = { color: "{primary.contrast.color}", fontSize: "0.75rem", fontWeight: "600" }, t$e = { root: r$t, value: o$u, label: e$j };
var o$t = { light: { root: { colorOne: "{red.500}", colorTwo: "{blue.500}", colorThree: "{green.500}", colorFour: "{yellow.500}" } }, dark: { root: { colorOne: "{red.400}", colorTwo: "{blue.400}", colorThree: "{green.400}", colorFour: "{yellow.400}" } } }, r$s = { colorScheme: o$t };
var o$s = { width: "1.25rem", height: "1.25rem", background: "{form.field.background}", checkedBackground: "{primary.color}", checkedHoverBackground: "{primary.hover.color}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.border.color}", checkedBorderColor: "{primary.color}", checkedHoverBorderColor: "{primary.hover.color}", checkedFocusBorderColor: "{primary.color}", checkedDisabledBorderColor: "{form.field.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", shadow: "{form.field.shadow}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { width: "1rem", height: "1rem" }, lg: { width: "1.5rem", height: "1.5rem" } }, r$r = { size: "0.75rem", checkedColor: "{primary.contrast.color}", checkedHoverColor: "{primary.contrast.color}", disabledColor: "{form.field.disabled.color}", sm: { size: "0.5rem" }, lg: { size: "1rem" } }, e$i = { root: o$s, icon: r$r };
var o$r = { gap: "0.25rem", transitionDuration: "{transition.duration}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, r$q = { size: "1rem", color: "{text.muted.color}", hoverColor: "{primary.color}", activeColor: "{primary.color}" }, i$7 = { root: o$r, icon: r$q };
var r$p = { light: { root: { background: "rgba(0,0,0,0.1)" } }, dark: { root: { background: "rgba(255,255,255,0.3)" } } }, o$q = { colorScheme: r$p };
var r$o = { transitionDuration: "{transition.duration}" }, o$p = { size: "9px", borderRadius: "{border.radius.sm}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, s$2 = { light: { bar: { background: "{surface.100}" } }, dark: { bar: { background: "{surface.800}" } } }, a$d = { root: r$o, bar: o$p, colorScheme: s$2 };
var o$o = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } }, r$n = { width: "2.5rem", color: "{form.field.icon.color}" }, d$a = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" }, l$3 = { padding: "{list.padding}", gap: "{list.gap}", header: { padding: "{list.header.padding}" } }, i$6 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" }, e$h = { background: "{list.option.group.background}", color: "{list.option.group.color}", fontWeight: "{list.option.group.font.weight}", padding: "{list.option.group.padding}" }, f$2 = { color: "{form.field.icon.color}" }, c$b = { color: "{list.option.color}", gutterStart: "-0.375rem", gutterEnd: "0.375rem" }, a$c = { padding: "{list.option.padding}" }, n$d = { root: o$o, dropdown: r$n, overlay: d$a, list: l$3, option: i$6, optionGroup: e$h, clearIcon: f$2, checkmark: c$b, emptyMessage: a$c };
var r$m = { borderRadius: "{form.field.border.radius}" }, o$n = { light: { root: { invalidBorderColor: "{form.field.invalid.border.color}" } }, dark: { root: { invalidBorderColor: "{form.field.invalid.border.color}" } } }, d$9 = { root: r$m, colorScheme: o$n };
var r$l = { borderRadius: "{content.border.radius}" }, a$b = { light: { root: { background: "{surface.200}", animationBackground: "rgba(255,255,255,0.4)" } }, dark: { root: { background: "rgba(255, 255, 255, 0.06)", animationBackground: "rgba(255, 255, 255, 0.04)" } } }, o$m = { root: r$l, colorScheme: a$b };
var o$l = { transitionDuration: "{transition.duration}" }, r$k = { background: "{content.border.color}", borderRadius: "{content.border.radius}", size: "3px" }, n$c = { background: "{primary.color}" }, t$d = { width: "20px", height: "20px", borderRadius: "50%", background: "{content.border.color}", hoverBackground: "{content.border.color}", content: { borderRadius: "50%", hoverBackground: "{content.background}", width: "16px", height: "16px", shadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px 0px rgba(0, 0, 0, 0.14)" }, focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, e$g = { light: { handle: { content: { background: "{surface.0}" } } }, dark: { handle: { content: { background: "{surface.950}" } } } }, a$a = { root: o$l, track: r$k, range: n$c, handle: t$d, colorScheme: e$g };
var t$c = { gap: "0.5rem", transitionDuration: "{transition.duration}" }, a$9 = { root: t$c };
var r$j = { borderRadius: "{form.field.border.radius}", roundedBorderRadius: "2rem", raisedShadow: "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)" }, d$8 = { root: r$j };
var o$k = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", transitionDuration: "{transition.duration}" }, r$i = { background: "{content.border.color}" }, n$b = { size: "24px", background: "transparent", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, t$b = { root: o$k, gutter: r$i, handle: n$b };
var o$j = { transitionDuration: "{transition.duration}" }, r$h = { background: "{content.border.color}", activeBackground: "{primary.color}", margin: "0 0 0 1.625rem", size: "2px" }, e$f = { padding: "0.5rem", gap: "1rem" }, t$a = { padding: "0", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, gap: "0.5rem" }, n$a = { color: "{text.muted.color}", activeColor: "{primary.color}", fontWeight: "500" }, a$8 = { background: "{content.background}", activeBackground: "{content.background}", borderColor: "{content.border.color}", activeBorderColor: "{content.border.color}", color: "{text.muted.color}", activeColor: "{primary.color}", size: "2rem", fontSize: "1.143rem", fontWeight: "500", borderRadius: "50%", shadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)" }, c$a = { padding: "0.875rem 0.5rem 1.125rem 0.5rem" }, d$7 = { background: "{content.background}", color: "{content.color}", padding: "0", indent: "1rem" }, i$5 = { root: o$j, separator: r$h, step: e$f, stepHeader: t$a, stepTitle: n$a, stepNumber: a$8, steppanels: c$a, steppanel: d$7 };
var o$i = { transitionDuration: "{transition.duration}" }, r$g = { background: "{content.border.color}" }, t$9 = { borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, gap: "0.5rem" }, e$e = { color: "{text.muted.color}", activeColor: "{primary.color}", fontWeight: "500" }, n$9 = { background: "{content.background}", activeBackground: "{content.background}", borderColor: "{content.border.color}", activeBorderColor: "{content.border.color}", color: "{text.muted.color}", activeColor: "{primary.color}", size: "2rem", fontSize: "1.143rem", fontWeight: "500", borderRadius: "50%", shadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)" }, c$9 = { root: o$i, separator: r$g, itemLink: t$9, itemLabel: e$e, itemNumber: n$9 };
var o$h = { transitionDuration: "{transition.duration}" }, r$f = { borderWidth: "0 0 1px 0", background: "{content.background}", borderColor: "{content.border.color}" }, t$8 = { background: "transparent", hoverBackground: "transparent", activeBackground: "transparent", borderWidth: "0 0 1px 0", borderColor: "{content.border.color}", hoverBorderColor: "{content.border.color}", activeBorderColor: "{primary.color}", color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}", padding: "1rem 1.125rem", fontWeight: "600", margin: "0 0 -1px 0", gap: "0.5rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, e$d = { color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}" }, c$8 = { height: "1px", bottom: "-1px", background: "{primary.color}" }, n$8 = { root: o$h, tablist: r$f, item: t$8, itemIcon: e$d, activeBar: c$8 };
var o$g = { transitionDuration: "{transition.duration}" }, r$e = { borderWidth: "0 0 1px 0", background: "{content.background}", borderColor: "{content.border.color}" }, t$7 = { background: "transparent", hoverBackground: "transparent", activeBackground: "transparent", borderWidth: "0 0 1px 0", borderColor: "{content.border.color}", hoverBorderColor: "{content.border.color}", activeBorderColor: "{primary.color}", color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}", padding: "1rem 1.125rem", fontWeight: "600", margin: "0 0 -1px 0", gap: "0.5rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" } }, n$7 = { background: "{content.background}", color: "{content.color}", padding: "0.875rem 1.125rem 1.125rem 1.125rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "inset {focus.ring.shadow}" } }, c$7 = { background: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.color}", width: "2.5rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" } }, e$c = { height: "1px", bottom: "-1px", background: "{primary.color}" }, a$7 = { light: { navButton: { shadow: "0px 0px 10px 50px rgba(255, 255, 255, 0.6)" } }, dark: { navButton: { shadow: "0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)" } } }, i$4 = { root: o$g, tablist: r$e, tab: t$7, tabpanel: n$7, navButton: c$7, activeBar: e$c, colorScheme: a$7 };
var o$f = { transitionDuration: "{transition.duration}" }, r$d = { background: "{content.background}", borderColor: "{content.border.color}" }, t$6 = { borderColor: "{content.border.color}", activeBorderColor: "{primary.color}", color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}" }, n$6 = { background: "{content.background}", color: "{content.color}" }, a$6 = { background: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.color}" }, c$6 = { light: { navButton: { shadow: "0px 0px 10px 50px rgba(255, 255, 255, 0.6)" } }, dark: { navButton: { shadow: "0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)" } } }, e$b = { root: o$f, tabList: r$d, tab: t$6, tabPanel: n$6, navButton: a$6, colorScheme: c$6 };
var r$c = { fontSize: "0.875rem", fontWeight: "700", padding: "0.25rem 0.5rem", gap: "0.25rem", borderRadius: "{content.border.radius}", roundedBorderRadius: "{border.radius.xl}" }, o$e = { size: "0.75rem" }, a$5 = { light: { primary: { background: "{primary.100}", color: "{primary.700}" }, secondary: { background: "{surface.100}", color: "{surface.600}" }, success: { background: "{green.100}", color: "{green.700}" }, info: { background: "{sky.100}", color: "{sky.700}" }, warn: { background: "{orange.100}", color: "{orange.700}" }, danger: { background: "{red.100}", color: "{red.700}" }, contrast: { background: "{surface.950}", color: "{surface.0}" } }, dark: { primary: { background: "color-mix(in srgb, {primary.500}, transparent 84%)", color: "{primary.300}" }, secondary: { background: "{surface.800}", color: "{surface.300}" }, success: { background: "color-mix(in srgb, {green.500}, transparent 84%)", color: "{green.300}" }, info: { background: "color-mix(in srgb, {sky.500}, transparent 84%)", color: "{sky.300}" }, warn: { background: "color-mix(in srgb, {orange.500}, transparent 84%)", color: "{orange.300}" }, danger: { background: "color-mix(in srgb, {red.500}, transparent 84%)", color: "{red.300}" }, contrast: { background: "{surface.0}", color: "{surface.950}" } } }, n$5 = { root: r$c, icon: o$e, colorScheme: a$5 };
var r$b = { background: "{form.field.background}", borderColor: "{form.field.border.color}", color: "{form.field.color}", height: "18rem", padding: "{form.field.padding.y} {form.field.padding.x}", borderRadius: "{form.field.border.radius}" }, o$d = { gap: "0.25rem" }, d$6 = { margin: "2px 0" }, e$a = { root: r$b, prompt: o$d, commandResponse: d$6 };
var o$c = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } }, d$5 = { root: o$c };
var o$b = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", transitionDuration: "{transition.duration}" }, i$3 = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" }, n$4 = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } }, a$4 = { mobileIndent: "1rem" }, t$5 = { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" }, r$a = { borderColor: "{content.border.color}" }, c$5 = { root: o$b, list: i$3, item: n$4, submenu: a$4, submenuIcon: t$5, separator: r$a };
var e$9 = { minHeight: "5rem" }, r$9 = { eventContent: { padding: "1rem 0" } }, o$a = { eventContent: { padding: "0 1rem" } }, n$3 = { size: "1.125rem", borderRadius: "50%", borderWidth: "2px", background: "{content.background}", borderColor: "{content.border.color}", content: { borderRadius: "50%", size: "0.375rem", background: "{primary.color}", insetShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)" } }, t$4 = { color: "{content.border.color}", size: "2px" }, d$4 = { event: e$9, horizontal: r$9, vertical: o$a, eventMarker: n$3, eventConnector: t$4 };
var o$9 = { width: "25rem", borderRadius: "{content.border.radius}", borderWidth: "1px", transitionDuration: "{transition.duration}" }, r$8 = { size: "1.125rem" }, e$8 = { padding: "{overlay.popover.padding}", gap: "0.5rem" }, n$2 = { gap: "0.5rem" }, a$3 = { fontWeight: "500", fontSize: "1rem" }, s$1 = { fontWeight: "500", fontSize: "0.875rem" }, c$4 = { width: "1.75rem", height: "1.75rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", offset: "{focus.ring.offset}" } }, l$2 = { size: "1rem" }, t$3 = { light: { root: { blur: "1.5px" }, info: { background: "color-mix(in srgb, {blue.50}, transparent 5%)", borderColor: "{blue.200}", color: "{blue.600}", detailColor: "{surface.700}", shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)", closeButton: { hoverBackground: "{blue.100}", focusRing: { color: "{blue.600}", shadow: "none" } } }, success: { background: "color-mix(in srgb, {green.50}, transparent 5%)", borderColor: "{green.200}", color: "{green.600}", detailColor: "{surface.700}", shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)", closeButton: { hoverBackground: "{green.100}", focusRing: { color: "{green.600}", shadow: "none" } } }, warn: { background: "color-mix(in srgb,{yellow.50}, transparent 5%)", borderColor: "{yellow.200}", color: "{yellow.600}", detailColor: "{surface.700}", shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)", closeButton: { hoverBackground: "{yellow.100}", focusRing: { color: "{yellow.600}", shadow: "none" } } }, error: { background: "color-mix(in srgb, {red.50}, transparent 5%)", borderColor: "{red.200}", color: "{red.600}", detailColor: "{surface.700}", shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)", closeButton: { hoverBackground: "{red.100}", focusRing: { color: "{red.600}", shadow: "none" } } }, secondary: { background: "{surface.100}", borderColor: "{surface.200}", color: "{surface.600}", detailColor: "{surface.700}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)", closeButton: { hoverBackground: "{surface.200}", focusRing: { color: "{surface.600}", shadow: "none" } } }, contrast: { background: "{surface.900}", borderColor: "{surface.950}", color: "{surface.50}", detailColor: "{surface.0}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)", closeButton: { hoverBackground: "{surface.800}", focusRing: { color: "{surface.50}", shadow: "none" } } } }, dark: { root: { blur: "10px" }, info: { background: "color-mix(in srgb, {blue.500}, transparent 84%)", borderColor: "color-mix(in srgb, {blue.700}, transparent 64%)", color: "{blue.500}", detailColor: "{surface.0}", shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{blue.500}", shadow: "none" } } }, success: { background: "color-mix(in srgb, {green.500}, transparent 84%)", borderColor: "color-mix(in srgb, {green.700}, transparent 64%)", color: "{green.500}", detailColor: "{surface.0}", shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{green.500}", shadow: "none" } } }, warn: { background: "color-mix(in srgb, {yellow.500}, transparent 84%)", borderColor: "color-mix(in srgb, {yellow.700}, transparent 64%)", color: "{yellow.500}", detailColor: "{surface.0}", shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{yellow.500}", shadow: "none" } } }, error: { background: "color-mix(in srgb, {red.500}, transparent 84%)", borderColor: "color-mix(in srgb, {red.700}, transparent 64%)", color: "{red.500}", detailColor: "{surface.0}", shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{red.500}", shadow: "none" } } }, secondary: { background: "{surface.800}", borderColor: "{surface.700}", color: "{surface.300}", detailColor: "{surface.0}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)", closeButton: { hoverBackground: "{surface.700}", focusRing: { color: "{surface.300}", shadow: "none" } } }, contrast: { background: "{surface.0}", borderColor: "{surface.100}", color: "{surface.950}", detailColor: "{surface.950}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)", closeButton: { hoverBackground: "{surface.100}", focusRing: { color: "{surface.950}", shadow: "none" } } } } }, u$1 = { root: o$9, icon: r$8, content: e$8, text: n$2, summary: a$3, detail: s$1, closeButton: c$4, closeIcon: l$2, colorScheme: t$3 };
var r$7 = { padding: "0.25rem", borderRadius: "{content.border.radius}", gap: "0.5rem", fontWeight: "500", disabledBackground: "{form.field.disabled.background}", disabledBorderColor: "{form.field.disabled.background}", disabledColor: "{form.field.disabled.color}", invalidBorderColor: "{form.field.invalid.border.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", padding: "0.25rem" }, lg: { fontSize: "{form.field.lg.font.size}", padding: "0.25rem" } }, o$8 = { disabledColor: "{form.field.disabled.color}" }, e$7 = { padding: "0.25rem 0.75rem", borderRadius: "{content.border.radius}", checkedShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.04)", sm: { padding: "0.25rem 0.75rem" }, lg: { padding: "0.25rem 0.75rem" } }, d$3 = { light: { root: { background: "{surface.100}", checkedBackground: "{surface.100}", hoverBackground: "{surface.100}", borderColor: "{surface.100}", color: "{surface.500}", hoverColor: "{surface.700}", checkedColor: "{surface.900}", checkedBorderColor: "{surface.100}" }, content: { checkedBackground: "{surface.0}" }, icon: { color: "{surface.500}", hoverColor: "{surface.700}", checkedColor: "{surface.900}" } }, dark: { root: { background: "{surface.950}", checkedBackground: "{surface.950}", hoverBackground: "{surface.950}", borderColor: "{surface.950}", color: "{surface.400}", hoverColor: "{surface.300}", checkedColor: "{surface.0}", checkedBorderColor: "{surface.950}" }, content: { checkedBackground: "{surface.800}" }, icon: { color: "{surface.400}", hoverColor: "{surface.300}", checkedColor: "{surface.0}" } } }, c$3 = { root: r$7, icon: o$8, content: e$7, colorScheme: d$3 };
var r$6 = { width: "2.5rem", height: "1.5rem", borderRadius: "30px", gap: "0.25rem", shadow: "{form.field.shadow}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, borderWidth: "1px", borderColor: "transparent", hoverBorderColor: "transparent", checkedBorderColor: "transparent", checkedHoverBorderColor: "transparent", invalidBorderColor: "{form.field.invalid.border.color}", transitionDuration: "{form.field.transition.duration}", slideDuration: "0.2s" }, o$7 = { borderRadius: "50%", size: "1rem" }, e$6 = { light: { root: { background: "{surface.300}", disabledBackground: "{form.field.disabled.background}", hoverBackground: "{surface.400}", checkedBackground: "{primary.color}", checkedHoverBackground: "{primary.hover.color}" }, handle: { background: "{surface.0}", disabledBackground: "{form.field.disabled.color}", hoverBackground: "{surface.0}", checkedBackground: "{surface.0}", checkedHoverBackground: "{surface.0}", color: "{text.muted.color}", hoverColor: "{text.color}", checkedColor: "{primary.color}", checkedHoverColor: "{primary.hover.color}" } }, dark: { root: { background: "{surface.700}", disabledBackground: "{surface.600}", hoverBackground: "{surface.600}", checkedBackground: "{primary.color}", checkedHoverBackground: "{primary.hover.color}" }, handle: { background: "{surface.400}", disabledBackground: "{surface.900}", hoverBackground: "{surface.300}", checkedBackground: "{surface.900}", checkedHoverBackground: "{surface.900}", color: "{surface.900}", hoverColor: "{surface.800}", checkedColor: "{primary.color}", checkedHoverColor: "{primary.hover.color}" } } }, c$2 = { root: r$6, handle: o$7, colorScheme: e$6 };
var o$6 = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", gap: "0.5rem", padding: "0.75rem" }, r$5 = { root: o$6 };
var r$4 = { maxWidth: "12.5rem", gutter: "0.25rem", shadow: "{overlay.popover.shadow}", padding: "0.5rem 0.75rem", borderRadius: "{overlay.popover.border.radius}" }, o$5 = { light: { root: { background: "{surface.700}", color: "{surface.0}" } }, dark: { root: { background: "{surface.700}", color: "{surface.0}" } } }, e$5 = { root: r$4, colorScheme: o$5 };
var o$4 = { background: "{content.background}", color: "{content.color}", padding: "1rem", gap: "2px", indent: "1rem", transitionDuration: "{transition.duration}" }, r$3 = { padding: "0.25rem 0.5rem", borderRadius: "{content.border.radius}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", color: "{text.color}", hoverColor: "{text.hover.color}", selectedColor: "{highlight.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" }, gap: "0.25rem" }, e$4 = { color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", selectedColor: "{highlight.color}" }, t$2 = { borderRadius: "50%", size: "1.75rem", hoverBackground: "{content.hover.background}", selectedHoverBackground: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", selectedHoverColor: "{primary.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, n$1 = { size: "2rem" }, c$1 = { margin: "0 0 0.5rem 0" }, css$1 = "\n    .p-tree-mask.p-overlay-mask {\n        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));\n    }\n", d$2 = { root: o$4, node: r$3, nodeIcon: e$4, nodeToggleButton: t$2, loadingIcon: n$1, filter: c$1, css: css$1 };
var o$3 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } }, r$2 = { width: "2.5rem", color: "{form.field.icon.color}" }, d$1 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" }, l$1 = { padding: "{list.padding}" }, e$3 = { padding: "{list.option.padding}" }, i$2 = { borderRadius: "{border.radius.sm}" }, f$1 = { color: "{form.field.icon.color}" }, a$2 = { root: o$3, dropdown: r$2, overlay: d$1, tree: l$1, emptyMessage: e$3, chip: i$2, clearIcon: f$1 };
var o$2 = { transitionDuration: "{transition.duration}" }, r$1 = { background: "{content.background}", borderColor: "{treetable.border.color}", color: "{content.color}", borderWidth: "0 0 1px 0", padding: "0.75rem 1rem" }, e$2 = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", borderColor: "{treetable.border.color}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{highlight.color}", gap: "0.5rem", padding: "0.75rem 1rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" } }, t$1 = { fontWeight: "600" }, c = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{highlight.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" } }, n = { borderColor: "{treetable.border.color}", padding: "0.75rem 1rem", gap: "0.5rem" }, l = { background: "{content.background}", borderColor: "{treetable.border.color}", color: "{content.color}", padding: "0.75rem 1rem" }, d = { fontWeight: "600" }, a$1 = { background: "{content.background}", borderColor: "{treetable.border.color}", color: "{content.color}", borderWidth: "0 0 1px 0", padding: "0.75rem 1rem" }, i$1 = { width: "0.5rem" }, g = { width: "1px", color: "{primary.color}" }, s = { color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", size: "0.875rem" }, u = { size: "2rem" }, b = { hoverBackground: "{content.hover.background}", selectedHoverBackground: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.color}", selectedHoverColor: "{primary.color}", size: "1.75rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, h = { borderColor: "{content.border.color}", borderWidth: "0 0 1px 0" }, m$1 = { borderColor: "{content.border.color}", borderWidth: "0 0 1px 0" }, f = { light: { root: { borderColor: "{content.border.color}" }, bodyCell: { selectedBorderColor: "{primary.100}" } }, dark: { root: { borderColor: "{surface.800}" }, bodyCell: { selectedBorderColor: "{primary.900}" } } }, css2 = "\n    .p-treetable-mask.p-overlay-mask {\n        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));\n    }\n", k = { root: o$2, header: r$1, headerCell: e$2, columnTitle: t$1, row: c, bodyCell: n, footerCell: l, columnFooter: d, footer: a$1, columnResizer: i$1, resizeIndicator: g, sortIcon: s, loadingIcon: u, nodeToggleButton: b, paginatorTop: h, paginatorBottom: m$1, colorScheme: f, css: css2 };
var o$1 = { mask: { background: "{content.background}", color: "{text.muted.color}" }, icon: { size: "2rem" } }, e$1 = { loader: o$1 };
var r = Object.defineProperty, e = Object.defineProperties, m = Object.getOwnPropertyDescriptors, i = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, a = Object.prototype.propertyIsEnumerable, o = (e2, m2, i2) => m2 in e2 ? r(e2, m2, { enumerable: true, configurable: true, writable: true, value: i2 }) : e2[m2] = i2;
var Nr, Qr = (Nr = ((r2, e2) => {
  for (var m2 in e2 || (e2 = {})) t.call(e2, m2) && o(r2, m2, e2[m2]);
  if (i) for (var m2 of i(e2)) a.call(e2, m2) && o(r2, m2, e2[m2]);
  return r2;
})({}, e$R), e(Nr, m({ components: { accordion: c$p, autocomplete: a$F, avatar: n$B, badge: d$v, blockui: o$1h, breadcrumb: t$D, button: e$Q, card: d$u, carousel: t$B, cascadeselect: f$8, checkbox: e$N, chip: s$8, colorpicker: s$7, confirmdialog: r$15, confirmpopup: a$A, contextmenu: c$k, datatable: v$1, dataview: c$i, datepicker: k$1, dialog: e$F, divider: t$v, dock: d$o, drawer: e$D, editor: l$a, fieldset: e$B, fileupload: i$i, floatlabel: d$k, galleria: l$9, iconfield: r$S, iftalabel: i$f, image: e$y, imagecompare: r$Q, inlinemessage: a$q, inplace: n$q, inputchips: f$4, inputgroup: o$O, inputnumber: a$p, inputotp: e$v, inputtext: d$h, knob: c$f, listbox: n$o, megamenu: g$1, menu: r$G, menubar: e$s, message: u$2, metergroup: b$1, multiselect: n$j, orderlist: o$D, organizationchart: n$i, overlaybadge: t$i, paginator: n$h, panel: a$h, panelmenu: a$g, password: n$e, picklist: o$w, popover: e$k, progressbar: t$e, progressspinner: r$s, radiobutton: e$i, rating: i$7, ripple: o$q, scrollpanel: a$d, select: n$d, selectbutton: d$9, skeleton: o$m, slider: a$a, speeddial: a$9, splitbutton: d$8, splitter: t$b, stepper: i$5, steps: c$9, tabmenu: n$8, tabs: i$4, tabview: e$b, tag: n$5, terminal: e$a, textarea: d$5, tieredmenu: c$5, timeline: d$4, toast: u$1, togglebutton: c$3, toggleswitch: c$2, toolbar: r$5, tooltip: e$5, tree: d$2, treeselect: a$2, treetable: k, virtualscroller: e$1 }, css: t$z })));
const palettes = {
  slate: {
    50: "248 250 252",
    100: "241 245 249",
    200: "226 232 240",
    300: "203 213 225",
    400: "148 163 184",
    500: "100 116 139",
    600: "71 85 105",
    700: "51 65 85",
    800: "30 41 59",
    900: "15 23 42",
    950: "2 6 23"
  },
  gray: {
    50: "249 250 251",
    100: "243 244 246",
    200: "229 231 235",
    300: "209 213 219",
    400: "156 163 175",
    500: "107 114 128",
    600: "75 85 99",
    700: "55 65 81",
    800: "31 41 55",
    900: "17 24 39",
    950: "3 7 18"
  },
  zinc: {
    50: "250 250 250",
    100: "244 244 245",
    200: "228 228 231",
    300: "212 212 216",
    400: "161 161 170",
    500: "113 113 122",
    600: "82 82 91",
    700: "63 63 70",
    800: "39 39 42",
    900: "24 24 27",
    950: "9 9 11"
  },
  neutral: {
    50: "250 250 250",
    100: "245 245 245",
    200: "229 229 229",
    300: "212 212 212",
    400: "163 163 163",
    500: "115 115 115",
    600: "82 82 82",
    700: "64 64 64",
    800: "38 38 38",
    900: "23 23 23",
    950: "10 10 10"
  },
  stone: {
    50: "250 250 249",
    100: "245 245 244",
    200: "231 229 228",
    300: "214 211 209",
    400: "168 162 158",
    500: "120 113 108",
    600: "87 83 78",
    700: "68 64 60",
    800: "41 37 36",
    900: "28 25 23",
    950: "12 10 9"
  },
  red: {
    50: "254 242 242",
    100: "254 226 226",
    200: "254 202 202",
    300: "252 165 165",
    400: "248 113 113",
    500: "239 68 68",
    600: "220 38 38",
    700: "185 28 28",
    800: "153 27 27",
    900: "127 29 29",
    950: "69 10 10"
  },
  orange: {
    50: "255 247 237",
    100: "255 237 213",
    200: "254 215 170",
    300: "253 186 116",
    400: "251 146 60",
    500: "249 115 22",
    600: "234 88 12",
    700: "194 65 12",
    800: "154 52 18",
    900: "124 45 18",
    950: "67 20 7"
  },
  amber: {
    50: "255 251 235",
    100: "254 243 199",
    200: "253 230 138",
    300: "252 211 77",
    400: "251 191 36",
    500: "245 158 11",
    600: "217 119 6",
    700: "180 83 9",
    800: "146 64 14",
    900: "120 53 15",
    950: "69 26 3"
  },
  yellow: {
    50: "254 252 232",
    100: "254 249 195",
    200: "254 240 138",
    300: "253 224 71",
    400: "250 204 21",
    500: "234 179 8",
    600: "202 138 4",
    700: "161 98 7",
    800: "133 77 14",
    900: "113 63 18",
    950: "66 32 6"
  },
  lime: {
    50: "247 254 231",
    100: "236 252 203",
    200: "217 249 157",
    300: "190 242 100",
    400: "163 230 53",
    500: "132 204 22",
    600: "101 163 13",
    700: "77 124 15",
    800: "63 98 18",
    900: "54 83 20",
    950: "26 46 5"
  },
  green: {
    50: "240 253 244",
    100: "220 252 231",
    200: "187 247 208",
    300: "134 239 172",
    400: "74 222 128",
    500: "34 197 94",
    600: "22 163 74",
    700: "21 128 61",
    800: "22 101 52",
    900: "20 83 45",
    950: "5 46 22"
  },
  emerald: {
    50: "236 253 245",
    100: "209 250 229",
    200: "167 243 208",
    300: "110 231 183",
    400: "52 211 153",
    500: "16 185 129",
    600: "5 150 105",
    700: "4 120 87",
    800: "6 95 70",
    900: "6 78 59",
    950: "2 44 34"
  },
  teal: {
    50: "240 253 250",
    100: "204 251 241",
    200: "153 246 228",
    300: "94 234 212",
    400: "45 212 191",
    500: "20 184 166",
    600: "13 148 136",
    700: "15 118 110",
    800: "17 94 89",
    900: "19 78 74",
    950: "4 47 46"
  },
  cyan: {
    50: "236 254 255",
    100: "207 250 254",
    200: "165 243 252",
    300: "103 232 249",
    400: "34 211 238",
    500: "6 182 212",
    600: "8 145 178",
    700: "14 116 144",
    800: "21 94 117",
    900: "22 78 99",
    950: "8 51 68"
  },
  sky: {
    50: "240 249 255",
    100: "224 242 254",
    200: "186 230 253",
    300: "125 211 252",
    400: "56 189 248",
    500: "14 165 233",
    600: "2 132 199",
    700: "3 105 161",
    800: "7 89 133",
    900: "12 74 110",
    950: "8 47 73"
  },
  blue: {
    50: "239 246 255",
    100: "219 234 254",
    200: "191 219 254",
    300: "147 197 253",
    400: "96 165 250",
    500: "59 130 246",
    600: "37 99 235",
    700: "29 78 216",
    800: "30 64 175",
    900: "30 58 138",
    950: "23 37 84"
  },
  indigo: {
    50: "238 242 255",
    100: "224 231 255",
    200: "199 210 254",
    300: "165 180 252",
    400: "129 140 248",
    500: "99 102 241",
    600: "79 70 229",
    700: "67 56 202",
    800: "55 48 163",
    900: "49 46 129",
    950: "30 27 75"
  },
  violet: {
    50: "245 243 255",
    100: "237 233 254",
    200: "221 214 254",
    300: "196 181 253",
    400: "167 139 250",
    500: "139 92 246",
    600: "124 58 237",
    700: "109 40 217",
    800: "91 33 182",
    900: "76 29 149",
    950: "46 16 101"
  },
  purple: {
    50: "250 245 255",
    100: "243 232 255",
    200: "233 213 255",
    300: "216 180 254",
    400: "192 132 252",
    500: "168 85 247",
    600: "147 51 234",
    700: "126 34 206",
    800: "107 33 168",
    900: "88 28 135",
    950: "59 7 100"
  },
  fuchsia: {
    50: "253 244 255",
    100: "250 232 255",
    200: "245 208 254",
    300: "240 171 252",
    400: "232 121 249",
    500: "217 70 239",
    600: "192 38 211",
    700: "162 28 175",
    800: "134 25 143",
    900: "112 26 117",
    950: "74 4 78"
  },
  pink: {
    50: "253 242 248",
    100: "252 231 243",
    200: "251 207 232",
    300: "249 168 212",
    400: "244 114 182",
    500: "236 72 153",
    600: "219 39 119",
    700: "190 24 93",
    800: "157 23 77",
    900: "131 24 67",
    950: "80 7 36"
  },
  rose: {
    50: "255 241 242",
    100: "255 228 230",
    200: "254 205 211",
    300: "253 164 175",
    400: "251 113 133",
    500: "244 63 94",
    600: "225 29 72",
    700: "190 18 60",
    800: "159 18 57",
    900: "136 19 55",
    950: "76 5 25"
  }
};
function buildPrimaryTokens(paletteName) {
  if (!palettes[paletteName]) return {};
  const tokens = {};
  for (const shade of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]) {
    tokens[shade] = `{${paletteName}.${shade}}`;
  }
  return tokens;
}
function buildSurfaceTokens(paletteName) {
  if (!palettes[paletteName]) return {};
  const tokens = {};
  for (const shade of [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]) {
    if (shade === 0) {
      tokens[shade] = "#ffffff";
    } else {
      tokens[shade] = `{${paletteName}.${shade}}`;
    }
  }
  return tokens;
}
function buildBorderRadiusTokens(size) {
  const radiusMap = {
    none: { xs: "0", sm: "0", md: "0", lg: "0", xl: "0" },
    sm: { xs: "2px", sm: "4px", md: "6px", lg: "8px", xl: "10px" },
    md: { xs: "2px", sm: "4px", md: "8px", lg: "12px", xl: "16px" },
    lg: { xs: "4px", sm: "6px", md: "10px", lg: "16px", xl: "20px" },
    xl: { xs: "4px", sm: "8px", md: "12px", lg: "20px", xl: "28px" },
    "2xl": { xs: "6px", sm: "10px", md: "16px", lg: "24px", xl: "32px" }
  };
  return radiusMap[size] || radiusMap.md;
}
function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key]) && target[key] && typeof target[key] === "object" && !Array.isArray(target[key])) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}
function buildPreset(config = {}) {
  const overrides = {};
  if (config.primaryColor && palettes[config.primaryColor]) {
    if (!overrides.semantic) overrides.semantic = {};
    overrides.semantic.primary = buildPrimaryTokens(config.primaryColor);
  }
  if (config.surfaceColor && palettes[config.surfaceColor]) {
    const surfaceTokens = buildSurfaceTokens(config.surfaceColor);
    if (!overrides.semantic) overrides.semantic = {};
    if (!overrides.semantic.colorScheme) overrides.semantic.colorScheme = {};
    overrides.semantic.colorScheme.light = deepMerge(
      overrides.semantic.colorScheme.light || {},
      { surface: surfaceTokens }
    );
    overrides.semantic.colorScheme.dark = deepMerge(
      overrides.semantic.colorScheme.dark || {},
      { surface: surfaceTokens }
    );
  }
  if (config.borderRadius) {
    if (!overrides.primitive) overrides.primitive = {};
    overrides.primitive.borderRadius = buildBorderRadiusTokens(config.borderRadius);
  }
  if (config.tokens && Object.keys(config.tokens).length > 0) {
    if (!overrides.semantic) overrides.semantic = {};
    overrides.semantic = deepMerge(overrides.semantic, config.tokens);
  }
  if (config.darkTokens && Object.keys(config.darkTokens).length > 0) {
    if (!overrides.semantic) overrides.semantic = {};
    if (!overrides.semantic.colorScheme) overrides.semantic.colorScheme = {};
    if (!overrides.semantic.colorScheme.dark) overrides.semantic.colorScheme.dark = {};
    overrides.semantic.colorScheme.dark = deepMerge(
      overrides.semantic.colorScheme.dark,
      config.darkTokens
    );
  }
  if (Object.keys(overrides).length === 0) {
    return t$G(Qr, {
      semantic: {
        primary: buildPrimaryTokens("emerald")
      }
    });
  }
  return t$G(Qr, overrides);
}
const PrimixPreset = t$G(Qr, {
  semantic: {
    primary: buildPrimaryTokens("emerald")
  }
});
function mergePT(basePT, overridePT) {
  if (!overridePT) return basePT;
  if (!basePT) return overridePT;
  const result = { ...basePT };
  for (const component of Object.keys(overridePT)) {
    if (!result[component]) {
      result[component] = overridePT[component];
      continue;
    }
    result[component] = { ...result[component] };
    for (const section of Object.keys(overridePT[component])) {
      const baseSection = result[component][section];
      const overrideSection = overridePT[component][section];
      if (!baseSection) {
        result[component][section] = overrideSection;
        continue;
      }
      if (typeof baseSection === "object" && typeof overrideSection === "object") {
        result[component][section] = { ...baseSection };
        for (const attr of Object.keys(overrideSection)) {
          if (attr === "class" && baseSection.class) {
            result[component][section].class = baseSection.class + " " + overrideSection.class;
          } else {
            result[component][section][attr] = overrideSection[attr];
          }
        }
      } else {
        result[component][section] = overrideSection;
      }
    }
  }
  return result;
}
const primixDefaultPT = {};
function setupTheme(app) {
  const primixData = window.LiVueData?.primix;
  const themeConfig = primixData?.theme;
  const ptConfig = primixData?.pt;
  const preset = themeConfig ? buildPreset(themeConfig) : PrimixPreset;
  const pt = mergePT(primixDefaultPT, ptConfig || null);
  const options = {
    theme: {
      preset,
      options: {
        darkModeSelector: ".dark",
        cssLayer: {
          name: "primevue",
          order: "theme, base, primevue"
        }
      }
    },
    ripple: true
  };
  if (pt && Object.keys(pt).length > 0) {
    options.pt = pt;
  }
  app.use(PrimeVue, options);
}
function ensurePrimeVueTheme(app) {
  if (app.config?.globalProperties?.$primevue) return;
  setupTheme(app);
}
const registerPrimeVueTheme = (app) => {
  ensurePrimeVueTheme(app);
};
LiVue.setup(registerPrimeVueTheme);
var ToastEventBus = s$a();
var PrimeVueToastSymbol = /* @__PURE__ */ Symbol();
var ToastService = {
  install: function install2(app) {
    var ToastService2 = {
      add: function add(message) {
        ToastEventBus.emit("add", message);
      },
      remove: function remove(message) {
        ToastEventBus.emit("remove", message);
      },
      removeGroup: function removeGroup(group) {
        ToastEventBus.emit("remove-group", group);
      },
      removeAllGroups: function removeAllGroups() {
        ToastEventBus.emit("remove-all-groups");
      }
    };
    app.config.globalProperties.$toast = ToastService2;
    app.provide(PrimeVueToastSymbol, ToastService2);
  }
};
const registerNotificationsComponents = (app) => {
  if (app?.config?.globalProperties?.__primixNotificationsReady) {
    return;
  }
  app.config.globalProperties.__primixNotificationsReady = true;
  ensurePrimeVueTheme(app);
  app.use(ToastService);
};
LiVue.setup(registerNotificationsComponents);
//# sourceMappingURL=primix-notifications.js.map
