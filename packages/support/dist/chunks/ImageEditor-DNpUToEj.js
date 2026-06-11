import { reactive as es, computed as B, ref as N, resolveComponent as st, resolveDirective as Qt, openBlock as E, createElementBlock as _, createCommentVNode as k, createElementVNode as b, withDirectives as tt, createVNode as H, toDisplayString as I, Fragment as ot, renderList as Tt, normalizeClass as q, onBeforeUnmount as ss, watch as Zt, normalizeStyle as Rt, nextTick as Kt, unref as z, createBlock as it, createTextVNode as te, withCtx as fe } from "vue";
const jt = {
  brightness: 0,
  // -100 to +100
  contrast: 0,
  // -100 to +100
  saturation: 0,
  // -100 to +100
  hue: 0,
  // 0 to 360
  blur: 0,
  // 0 to 20 (px)
  sharpen: 0
  // 0 to 100 (applied on export only)
}, Xe = {
  brightness: { min: -100, max: 100, step: 1, label: "Luminosità", icon: "pi-sun" },
  contrast: { min: -100, max: 100, step: 1, label: "Contrasto", icon: "pi-circle-fill" },
  saturation: { min: -100, max: 100, step: 1, label: "Saturazione", icon: "pi-palette" },
  hue: { min: 0, max: 360, step: 1, label: "Tonalità", icon: "pi-rainbow" },
  blur: { min: 0, max: 20, step: 0.5, label: "Sfocatura", icon: "pi-eye" },
  sharpen: { min: 0, max: 100, step: 1, label: "Nitidezza", icon: "pi-bolt" }
};
function Ye(i, t = null) {
  const e = [];
  return i.brightness !== 0 && e.push(`brightness(${(100 + i.brightness) / 100})`), i.contrast !== 0 && e.push(`contrast(${(100 + i.contrast) / 100})`), i.saturation !== 0 && e.push(`saturate(${(100 + i.saturation) / 100})`), i.hue !== 0 && e.push(`hue-rotate(${i.hue}deg)`), i.blur > 0 && e.push(`blur(${i.blur}px)`), t && e.push(t), e.length > 0 ? e.join(" ") : "none";
}
function ns() {
  const i = es({ ...jt });
  function t() {
    Object.assign(i, jt);
  }
  function e(a, r) {
    a in i && (i[a] = r);
  }
  function s() {
    return { ...i };
  }
  function n(a) {
    Object.assign(i, a);
  }
  const o = B(() => Object.keys(jt).some(
    (a) => i[a] !== jt[a]
  ));
  return {
    adjustments: i,
    resetAdjustments: t,
    setAdjustment: e,
    getSnapshot: s,
    restoreSnapshot: n,
    hasChanges: o,
    ADJUSTMENT_RANGES: Xe
  };
}
const Vt = [
  {
    id: "original",
    label: "Originale",
    css: null
  },
  {
    id: "bw",
    label: "B/N",
    css: "grayscale(100%)"
  },
  {
    id: "sepia",
    label: "Seppia",
    css: "sepia(80%)"
  },
  {
    id: "vivid",
    label: "Vivido",
    css: "saturate(160%) contrast(110%)"
  },
  {
    id: "cool",
    label: "Freddo",
    css: "saturate(80%) hue-rotate(15deg) brightness(105%)"
  },
  {
    id: "warm",
    label: "Caldo",
    css: "saturate(120%) hue-rotate(-10deg) brightness(105%)"
  },
  {
    id: "vintage",
    label: "Vintage",
    css: "sepia(30%) contrast(90%) brightness(105%) saturate(80%)"
  },
  {
    id: "dramatic",
    label: "Drammatico",
    css: "contrast(140%) brightness(90%) saturate(120%)"
  },
  {
    id: "fade",
    label: "Sbiadito",
    css: "contrast(80%) brightness(115%) saturate(70%)"
  },
  {
    id: "highcontrast",
    label: "Alto Contrasto",
    css: "contrast(160%) brightness(95%)"
  }
];
function is() {
  const i = N(null);
  function t(a) {
    if (a === "original" || a === null) {
      i.value = null;
      return;
    }
    i.value = a;
  }
  function e() {
    return i.value ? Vt.find((r) => r.id === i.value)?.css ?? null : null;
  }
  function s() {
    i.value = null;
  }
  function n() {
    return i.value;
  }
  function o(a) {
    i.value = a;
  }
  return {
    activeFilter: i,
    setFilter: t,
    getActiveFilterCss: e,
    resetFilter: s,
    getSnapshot: n,
    restoreSnapshot: o,
    FILTER_PRESETS: Vt
  };
}
const pe = 30;
function os(i = {}) {
  const t = N("move"), e = N(!1), s = N(null), {
    adjustments: n,
    resetAdjustments: o,
    setAdjustment: a,
    getSnapshot: r,
    restoreSnapshot: h,
    hasChanges: c,
    ADJUSTMENT_RANGES: l
  } = ns(), {
    activeFilter: u,
    setFilter: p,
    getActiveFilterCss: m,
    resetFilter: f,
    getSnapshot: A,
    restoreSnapshot: x,
    FILTER_PRESETS: y
  } = is(), $ = N(i.crop?.defaultAspectRatio ?? null), C = N(100), d = N([]), g = N(-1);
  function T() {
    return {
      adjustments: r(),
      filter: A(),
      cropAspectRatio: $.value
    };
  }
  function O(j) {
    h(j.adjustments), x(j.filter), $.value = j.cropAspectRatio;
  }
  function v() {
    const j = T();
    g.value < d.value.length - 1 && (d.value = d.value.slice(0, g.value + 1)), d.value.push(j), d.value.length > pe && (d.value = d.value.slice(d.value.length - pe)), g.value = d.value.length - 1;
  }
  function w() {
    g.value > 0 && (g.value--, O(d.value[g.value]));
  }
  function M() {
    g.value < d.value.length - 1 && (g.value++, O(d.value[g.value]));
  }
  const P = B(() => g.value > 0), D = B(() => g.value < d.value.length - 1);
  function W() {
    d.value = [T()], g.value = 0;
  }
  function U(j) {
    t.value = j;
  }
  function ct(j) {
    $.value = j, v();
  }
  function xt(j) {
    C.value = Math.round(j);
  }
  const lt = B(() => Ye(n, m()));
  function ht() {
    t.value = "move", o(), f(), $.value = i.crop?.defaultAspectRatio ?? null, C.value = 100, v();
  }
  return {
    // Tool state
    activeTool: t,
    setActiveTool: U,
    // Adjustments
    adjustments: n,
    setAdjustment: (j, G) => {
      a(j, G);
    },
    resetAdjustments: () => {
      o(), v();
    },
    hasAdjustmentChanges: c,
    ADJUSTMENT_RANGES: l,
    // Filters
    activeFilter: u,
    setFilter: (j) => {
      p(j), v();
    },
    getActiveFilterCss: m,
    FILTER_PRESETS: y,
    // Crop
    cropAspectRatio: $,
    setCropAspectRatio: ct,
    // Zoom
    zoomLevel: C,
    setZoomLevel: xt,
    // History
    pushHistory: v,
    undo: w,
    redo: M,
    canUndo: P,
    canRedo: D,
    resetHistory: W,
    // Live preview
    liveFilterCss: lt,
    // Processing
    processing: e,
    aiProcessing: s,
    // Reset
    resetAll: ht
  };
}
function as() {
  const i = N(null), t = N(0);
  async function e(o) {
    const { removeBackground: a } = await import("@imgly/background-removal"), r = await cs(o);
    try {
      const h = await a(r, {
        publicPath: "https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/",
        progress: (c, l, u) => {
          u > 0 && (t.value = Math.round(l / u * 100));
        }
      });
      return URL.createObjectURL(h);
    } finally {
      URL.revokeObjectURL(r);
    }
  }
  async function s(o) {
    const a = await rs(o), r = document.createElement("canvas");
    r.width = a.naturalWidth, r.height = a.naturalHeight;
    const h = r.getContext("2d");
    h.drawImage(a, 0, 0);
    const c = h.getImageData(0, 0, r.width, r.height), l = c.data, u = new Uint32Array(256);
    for (let v = 0; v < l.length; v += 4) {
      const w = Math.round(0.299 * l[v] + 0.587 * l[v + 1] + 0.114 * l[v + 2]);
      u[w]++;
    }
    const p = r.width * r.height, m = p * 0.01, f = p * 0.99;
    let A = 0, x = 255, y = 0;
    for (let v = 0; v < 256; v++)
      if (y += u[v], y >= m) {
        A = v;
        break;
      }
    y = 0;
    for (let v = 255; v >= 0; v--)
      if (y += u[v], y >= p - f) {
        x = v;
        break;
      }
    if (x > A) {
      const v = 255 / (x - A);
      for (let w = 0; w < l.length; w += 4)
        l[w] = Math.min(255, Math.max(0, Math.round((l[w] - A) * v))), l[w + 1] = Math.min(255, Math.max(0, Math.round((l[w + 1] - A) * v))), l[w + 2] = Math.min(255, Math.max(0, Math.round((l[w + 2] - A) * v)));
    }
    h.putImageData(c, 0, 0);
    const $ = h.getImageData(0, 0, r.width, r.height), C = new Uint8ClampedArray($.data), d = r.width, g = 0.3, T = 1 + 4 * g, O = -g;
    for (let v = 1; v < r.height - 1; v++)
      for (let w = 1; w < d - 1; w++) {
        const M = (v * d + w) * 4;
        for (let P = 0; P < 3; P++) {
          const D = C[M + P] * T + C[((v - 1) * d + w) * 4 + P] * O + C[((v + 1) * d + w) * 4 + P] * O + C[(v * d + w - 1) * 4 + P] * O + C[(v * d + w + 1) * 4 + P] * O;
          $.data[M + P] = Math.min(255, Math.max(0, Math.round(D)));
        }
      }
    return h.putImageData($, 0, 0), new Promise((v) => {
      r.toBlob((w) => {
        v(URL.createObjectURL(w));
      }, "image/png");
    });
  }
  async function n(o, a) {
    i.value = o, t.value = 0;
    try {
      switch (o) {
        case "background-removal":
          return await e(a);
        case "auto-enhance":
          return await s(a);
        default:
          throw new Error(`Unknown feature: ${o}`);
      }
    } finally {
      i.value = null, t.value = 0;
    }
  }
  return {
    processing: i,
    progress: t,
    processFeature: n
  };
}
function rs(i) {
  return new Promise((t, e) => {
    const s = new Image();
    s.crossOrigin = "anonymous", s.onload = () => t(s), s.onerror = e, s.src = i;
  });
}
async function cs(i) {
  if (i.startsWith("blob:")) return i;
  const e = await (await fetch(i)).blob();
  return URL.createObjectURL(e);
}
function ls(i, t, e, s) {
  if (s <= 0) return;
  const n = s / 100, a = i.getImageData(0, 0, t, e).data, r = i.createImageData(t, e), h = r.data, c = 1 + 4 * n, l = -n;
  for (let u = 1; u < e - 1; u++)
    for (let p = 1; p < t - 1; p++) {
      const m = (u * t + p) * 4, f = ((u - 1) * t + p) * 4, A = ((u + 1) * t + p) * 4, x = (u * t + (p - 1)) * 4, y = (u * t + (p + 1)) * 4;
      for (let $ = 0; $ < 3; $++) {
        const C = a[m + $] * c + a[f + $] * l + a[A + $] * l + a[x + $] * l + a[y + $] * l;
        h[m + $] = Math.min(255, Math.max(0, Math.round(C)));
      }
      h[m + 3] = a[m + 3];
    }
  for (let u = 0; u < t; u++) {
    const p = u * 4, m = ((e - 1) * t + u) * 4;
    for (let f = 0; f < 4; f++)
      h[p + f] = a[p + f], h[m + f] = a[m + f];
  }
  for (let u = 0; u < e; u++) {
    const p = u * t * 4, m = (u * t + (t - 1)) * 4;
    for (let f = 0; f < 4; f++)
      h[p + f] = a[p + f], h[m + f] = a[m + f];
  }
  i.putImageData(r, 0, 0);
}
function hs(i, t) {
  const e = {
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    webp: "image/webp"
  };
  if (i && i !== "original")
    return e[i] || "image/png";
  if (t) {
    const s = t.split(".").pop()?.toLowerCase();
    return e[s] || "image/png";
  }
  return "image/png";
}
function us(i) {
  return {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp"
  }[i] || "png";
}
async function ds(i, t = {}) {
  const {
    adjustments: e = {},
    filterCss: s = null,
    outputFormat: n = "original",
    outputQuality: o = 0.92,
    maxWidth: a = null,
    maxHeight: r = null,
    originalName: h = "edited-image.png"
  } = t;
  let { width: c, height: l } = i;
  if (a || r) {
    const x = a || 1 / 0, y = r || 1 / 0;
    if (c > x || l > y) {
      const $ = Math.min(x / c, y / l);
      c = Math.round(c * $), l = Math.round(l * $);
    }
  }
  const u = document.createElement("canvas");
  u.width = c, u.height = l;
  const p = u.getContext("2d"), m = Ye(e, s);
  m !== "none" && typeof p.filter < "u" && (p.filter = m), p.drawImage(i, 0, 0, c, l), p.filter = "none", e.sharpen > 0 && ls(p, c, l, e.sharpen);
  const f = hs(n, h), A = f === "image/png" ? void 0 : o;
  return new Promise((x, y) => {
    u.toBlob(
      ($) => {
        if ($) {
          const C = h.replace(/\.[^.]+$/, ""), d = us(f), g = `${C}.${d}`, T = new File([$], g, { type: f });
          x(T);
        } else
          y(new Error("Failed to export image"));
      },
      f,
      A
    );
  });
}
const fs = { class: "flex items-center justify-between px-4 py-2 border-b border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800" }, ps = { class: "flex items-center gap-1" }, ms = { class: "flex items-center gap-1" }, gs = { class: "text-xs text-surface-500 dark:text-surface-400 w-12 text-center tabular-nums" }, bs = {
  __name: "EditorToolbar",
  props: {
    canUndo: Boolean,
    canRedo: Boolean,
    zoomLevel: { type: Number, default: 100 },
    processing: Boolean
  },
  emits: ["undo", "redo", "reset", "zoom-in", "zoom-out"],
  setup(i) {
    return (t, e) => {
      const s = st("p-button"), n = Qt("tooltip");
      return E(), _("div", fs, [
        k(" Left: Undo/Redo "),
        b("div", ps, [
          tt(H(s, {
            icon: "pi pi-undo",
            severity: "secondary",
            text: "",
            rounded: "",
            size: "small",
            disabled: !i.canUndo || i.processing,
            onClick: e[0] || (e[0] = (o) => t.$emit("undo"))
          }, null, 8, ["disabled"]), [
            [
              n,
              "Annulla",
              void 0,
              { bottom: !0 }
            ]
          ]),
          tt(H(s, {
            icon: "pi pi-redo",
            severity: "secondary",
            text: "",
            rounded: "",
            size: "small",
            disabled: !i.canRedo || i.processing,
            onClick: e[1] || (e[1] = (o) => t.$emit("redo"))
          }, null, 8, ["disabled"]), [
            [
              n,
              "Ripristina",
              void 0,
              { bottom: !0 }
            ]
          ]),
          e[5] || (e[5] = b(
            "span",
            { class: "mx-2 w-px h-5 bg-surface-300 dark:bg-surface-600" },
            null,
            -1
            /* CACHED */
          )),
          tt(H(s, {
            icon: "pi pi-refresh",
            severity: "secondary",
            text: "",
            rounded: "",
            size: "small",
            disabled: i.processing,
            onClick: e[2] || (e[2] = (o) => t.$emit("reset"))
          }, null, 8, ["disabled"]), [
            [
              n,
              "Ripristina originale",
              void 0,
              { bottom: !0 }
            ]
          ])
        ]),
        k(" Center: Zoom controls "),
        b("div", ms, [
          H(s, {
            icon: "pi pi-search-minus",
            severity: "secondary",
            text: "",
            rounded: "",
            size: "small",
            disabled: i.processing,
            onClick: e[3] || (e[3] = (o) => t.$emit("zoom-out"))
          }, null, 8, ["disabled"]),
          b(
            "span",
            gs,
            I(i.zoomLevel) + "% ",
            1
            /* TEXT */
          ),
          H(s, {
            icon: "pi pi-search-plus",
            severity: "secondary",
            text: "",
            rounded: "",
            size: "small",
            disabled: i.processing,
            onClick: e[4] || (e[4] = (o) => t.$emit("zoom-in"))
          }, null, 8, ["disabled"])
        ]),
        k(" Right: spacer for balance "),
        e[6] || (e[6] = b(
          "div",
          { class: "w-24" },
          null,
          -1
          /* CACHED */
        ))
      ]);
    };
  }
}, vs = { class: "primix-editor-toolpanel flex flex-col items-center w-12 flex-shrink-0 border-r border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 py-2 gap-0.5" }, $s = {
  key: 0,
  class: "my-1.5 w-6 h-px bg-surface-300 dark:bg-surface-600"
}, ys = ["onClick"], Cs = {
  __name: "EditorToolPanel",
  props: {
    activeTool: { type: String, required: !0 },
    config: { type: Object, default: () => ({}) },
    translations: { type: Object, default: () => ({}) }
  },
  emits: ["tool-change"],
  setup(i) {
    const t = i, e = B(() => [
      // Canvas interaction tools
      { id: "move", label: t.translations.tool_move || "Move", icon: "pi-arrows-alt" },
      { id: "crop", label: t.translations.tool_crop || "Crop", icon: "pi-objects-column", configKey: "crop" },
      { id: "zoom", label: t.translations.tool_zoom || "Zoom", icon: "pi-search-plus" },
      // Separator
      { type: "separator" },
      // Panel tools
      { id: "transform", label: t.translations.tool_transform || "Transform", icon: "pi-sync" },
      { id: "adjustments", label: t.translations.tool_adjustments || "Adjustments", icon: "pi-sliders-h", configKey: "adjustments" },
      { id: "filters", label: t.translations.tool_filters || "Filters", icon: "pi-palette", configKey: "filters" },
      { id: "ai", label: t.translations.tool_ai || "AI", icon: "pi-sparkles", configKey: "ai" }
    ]), s = B(() => e.value.filter((n) => n.type === "separator" ? !0 : n.id === "transform" ? t.config.rotate?.enabled !== !1 || t.config.flip?.enabled !== !1 : n.id === "ai" ? t.config.ai?.features?.length > 0 : !(n.configKey && t.config[n.configKey]?.enabled === !1)));
    return (n, o) => {
      const a = Qt("tooltip");
      return E(), _("div", vs, [
        (E(!0), _(
          ot,
          null,
          Tt(s.value, (r) => (E(), _(
            ot,
            {
              key: r.id || r.type
            },
            [
              k(" Separator "),
              r.type === "separator" ? (E(), _("div", $s)) : (E(), _(
                ot,
                { key: 1 },
                [
                  k(" Tool button "),
                  tt((E(), _("button", {
                    type: "button",
                    class: q(["w-9 h-9 flex items-center justify-center rounded-lg transition-colors", i.activeTool === r.id ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400" : "text-surface-500 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700 hover:text-surface-700 dark:hover:text-surface-300"]),
                    onClick: (h) => n.$emit("tool-change", r.id)
                  }, [
                    b(
                      "i",
                      {
                        class: q(["pi " + r.icon, "text-sm"])
                      },
                      null,
                      2
                      /* CLASS */
                    )
                  ], 10, ys)), [
                    [
                      a,
                      r.label,
                      void 0,
                      { right: !0 }
                    ]
                  ])
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              ))
            ],
            64
            /* STABLE_FRAGMENT */
          ))),
          128
          /* KEYED_FRAGMENT */
        ))
      ]);
    };
  }
}, Yt = typeof window < "u" && typeof window.document < "u", Z = Yt ? window : {}, ee = Yt ? "ontouchstart" in Z.document.documentElement : !1, se = Yt ? "PointerEvent" in Z : !1, nt = "cropper", Ct = `${nt}-canvas`, xs = `${nt}-crosshair`, ws = `${nt}-grid`, ks = `${nt}-handle`, vt = `${nt}-image`, K = `${nt}-selection`, Es = `${nt}-shade`, As = `${nt}-viewer`, Ht = "select", Be = "move", $t = "scale", Gt = "rotate", Wt = "transform", Q = "none", me = "n-resize", ge = "e-resize", be = "s-resize", ve = "w-resize", kt = "ne-resize", Et = "nw-resize", At = "se-resize", St = "sw-resize", Ss = "action", Ts = ee ? "touchend touchcancel" : "mouseup", Rs = ee ? "touchmove" : "mousemove", _s = ee ? "touchstart" : "mousedown", $e = se ? "pointerdown" : _s, ye = se ? "pointermove" : Rs, Ce = se ? "pointerup pointercancel" : Ts, xe = "error", we = "keydown", gt = "load", ke = "wheel", yt = "action", at = "actionend", Os = "actionmove", rt = "actionstart", et = "change", Jt = "transform";
function Lt(i) {
  return typeof i == "string";
}
const Ze = Number.isNaN || Z.isNaN;
function S(i) {
  return typeof i == "number" && !Ze(i);
}
function Y(i) {
  return S(i) && i > 0 && i < 1 / 0;
}
function Is(i) {
  return typeof i > "u";
}
function qe(i) {
  return typeof i == "object" && i !== null;
}
const { hasOwnProperty: Ms } = Object.prototype;
function Xt(i) {
  if (!qe(i))
    return !1;
  try {
    const { constructor: t } = i, { prototype: e } = t;
    return t && e && Ms.call(e, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function ne(i) {
  return typeof i == "function";
}
function bt(i) {
  return typeof i == "object" && i !== null && i.nodeType === 1;
}
const zs = /([a-z\d])([A-Z])/g;
function Ee(i) {
  return String(i).replace(zs, "$1-$2").toLowerCase();
}
const Ns = /-[A-z\d]/g;
function Ae(i) {
  return i.replace(Ns, (t) => t.slice(1).toUpperCase());
}
const Ke = /\s\s*/;
function F(i, t, e, s) {
  t.trim().split(Ke).forEach((n) => {
    i.removeEventListener(n, e, s);
  });
}
function L(i, t, e, s) {
  t.trim().split(Ke).forEach((n) => {
    i.addEventListener(n, e, s);
  });
}
function Se(i, t, e, s) {
  L(i, t, e, Object.assign(Object.assign({}, s), { once: !0 }));
}
const Ps = {
  bubbles: !0,
  cancelable: !0,
  composed: !0
};
function js(i, t, e, s) {
  return i.dispatchEvent(new CustomEvent(t, Object.assign(Object.assign(Object.assign({}, Ps), { detail: e }), s)));
}
function Ds(i) {
  return typeof i.composedPath == "function" && i.composedPath().find(bt) || i.target;
}
const Te = Promise.resolve();
function Fs(i, t) {
  return t ? Te.then(i ? t.bind(i) : t) : Te;
}
function Ve(i) {
  const t = i.getRootNode();
  switch (t.nodeType) {
    case 1:
      return t.ownerDocument;
    case 9:
      return t;
    case 11:
      return t;
  }
  return null;
}
function Re(i) {
  const { documentElement: t } = i.ownerDocument, e = i.getBoundingClientRect();
  return {
    left: e.left + (Z.pageXOffset - t.clientLeft),
    top: e.top + (Z.pageYOffset - t.clientTop)
  };
}
const Ls = /deg|g?rad|turn$/i;
function qt(i) {
  const t = parseFloat(i) || 0;
  if (t !== 0) {
    const [e = "rad"] = String(i).match(Ls) || [];
    switch (e.toLowerCase()) {
      case "deg":
        return t / 360 * (Math.PI * 2);
      case "grad":
        return t / 400 * (Math.PI * 2);
      case "turn":
        return t * (Math.PI * 2);
    }
  }
  return t;
}
const _e = "contain", Us = "cover";
function Ut(i, t = _e) {
  const { aspectRatio: e } = i;
  let { width: s, height: n } = i;
  const o = Y(s), a = Y(n);
  if (o && a) {
    const r = n * e;
    t === _e && r > s || t === Us && r < s ? n = s / e : s = n * e;
  } else o ? n = s / e : a && (s = n * e);
  return {
    width: s,
    height: n
  };
}
function Ge(i, ...t) {
  if (t.length === 0)
    return i;
  const [e, s, n, o, a, r] = i, [h, c, l, u, p, m] = t[0];
  return i = [
    e * h + n * c,
    s * h + o * c,
    e * l + n * u,
    s * l + o * u,
    e * p + n * m + a,
    s * p + o * m + r
  ], Ge(i, ...t.slice(1));
}
var Hs = ":host([hidden]){display:none!important}";
const Ws = /left|top|width|height/i, Oe = "open", Dt = /* @__PURE__ */ new WeakMap(), Ft = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new Map(), Me = Z.document && Array.isArray(Z.document.adoptedStyleSheets) && "replaceSync" in Z.CSSStyleSheet.prototype;
class V extends HTMLElement {
  get $sharedStyle() {
    return `${this.themeColor ? `:host{--theme-color: ${this.themeColor};}` : ""}${Hs}`;
  }
  constructor() {
    var t, e;
    super(), this.shadowRootMode = Oe, this.slottable = !0;
    const s = (e = (t = Object.getPrototypeOf(this)) === null || t === void 0 ? void 0 : t.constructor) === null || e === void 0 ? void 0 : e.$name;
    s && Ie.set(s, this.tagName.toLowerCase());
  }
  static get observedAttributes() {
    return [
      "shadow-root-mode",
      "slottable",
      "theme-color"
    ];
  }
  // Convert attribute to property
  attributeChangedCallback(t, e, s) {
    if (Object.is(s, e))
      return;
    const n = Ae(t), o = this[n];
    let a = s;
    switch (typeof o) {
      case "boolean":
        a = s !== null && s !== "false";
        break;
      case "number":
        a = Number(s);
        break;
    }
    if (this[n] = a, t === "theme-color") {
      const r = Ft.get(this), h = this.$sharedStyle;
      r && h && (Me ? r.replaceSync(h) : r.textContent = h);
    }
  }
  // Convert property to attribute
  $propertyChangedCallback(t, e, s) {
    if (!Object.is(s, e))
      switch (t = Ee(t), typeof s) {
        case "boolean":
          s === !0 ? this.hasAttribute(t) || this.setAttribute(t, "") : this.removeAttribute(t);
          break;
        case "number":
          Ze(s) ? s = "" : s = String(s);
        // Fall through
        // case 'string':
        // eslint-disable-next-line no-fallthrough
        default:
          s ? this.getAttribute(t) !== s && this.setAttribute(t, s) : this.removeAttribute(t);
      }
  }
  connectedCallback() {
    Object.getPrototypeOf(this).constructor.observedAttributes.forEach((e) => {
      const s = Ae(e);
      let n = this[s];
      Is(n) || this.$propertyChangedCallback(s, void 0, n), Object.defineProperty(this, s, {
        enumerable: !0,
        configurable: !0,
        get() {
          return n;
        },
        set(o) {
          const a = n;
          n = o, this.$propertyChangedCallback(s, a, o);
        }
      });
    });
    const t = this.shadowRoot || this.attachShadow({
      mode: this.shadowRootMode || Oe
    });
    if (Dt.set(this, t), Ft.set(this, this.$addStyles(this.$sharedStyle)), this.$style && this.$addStyles(this.$style), this.$template) {
      const e = document.createElement("template");
      e.innerHTML = this.$template, t.appendChild(e.content);
    }
    if (this.slottable) {
      const e = document.createElement("slot");
      t.appendChild(e);
    }
  }
  disconnectedCallback() {
    Ft.has(this) && Ft.delete(this), Dt.has(this) && Dt.delete(this);
  }
  // eslint-disable-next-line class-methods-use-this
  $getTagNameOf(t) {
    var e;
    return (e = Ie.get(t)) !== null && e !== void 0 ? e : t;
  }
  $setStyles(t) {
    return Object.keys(t).forEach((e) => {
      let s = t[e];
      S(s) && (s !== 0 && Ws.test(e) ? s = `${s}px` : s = String(s)), this.style[e] = s;
    }), this;
  }
  /**
   * Outputs the shadow root of the element.
   * @returns {ShadowRoot} Returns the shadow root.
   */
  $getShadowRoot() {
    return this.shadowRoot || Dt.get(this);
  }
  /**
   * Adds styles to the shadow root.
   * @param {string} styles The styles to add.
   * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
   */
  $addStyles(t) {
    let e;
    const s = this.$getShadowRoot();
    return Me ? (e = new CSSStyleSheet(), e.replaceSync(t), s.adoptedStyleSheets = s.adoptedStyleSheets.concat(e)) : (e = document.createElement("style"), e.textContent = t, s.appendChild(e)), e;
  }
  /**
   * Dispatches an event at the element.
   * @param {string} type The name of the event.
   * @param {*} [detail] The data passed when initializing the event.
   * @param {CustomEventInit} [options] The other event options.
   * @returns {boolean} Returns the result value.
   */
  $emit(t, e, s) {
    return js(this, t, e, s);
  }
  /**
   * Defers the callback to be executed after the next DOM update cycle.
   * @param {Function} [callback] The callback to execute after the next DOM update cycle.
   * @returns {Promise} A promise that resolves to nothing.
   */
  $nextTick(t) {
    return Fs(this, t);
  }
  /**
   * Defines the constructor as a new custom element.
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
   * @param {string|object} [name] The element name.
   * @param {object} [options] The element definition options.
   */
  static $define(t, e) {
    qe(t) && (e = t, t = ""), t || (t = this.$name || this.name), t = Ee(t), Yt && Z.customElements && !Z.customElements.get(t) && customElements.define(t, this, e);
  }
}
V.$version = "2.1.0";
var Xs = ':host{display:block;min-height:100px;min-width:200px;overflow:hidden;position:relative;touch-action:none;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host([background]){background-color:#fff;background-image:repeating-linear-gradient(45deg,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc),repeating-linear-gradient(45deg,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc);background-image:repeating-conic-gradient(#ccc 0 25%,#fff 0 50%);background-position:0 0,.5rem .5rem;background-size:1rem 1rem}:host([disabled]){pointer-events:none}:host([disabled]):after{bottom:0;content:"";cursor:not-allowed;display:block;left:0;pointer-events:none;position:absolute;right:0;top:0}';
class ie extends V {
  constructor() {
    super(...arguments), this.$onPointerDown = null, this.$onPointerMove = null, this.$onPointerUp = null, this.$onWheel = null, this.$wheeling = !1, this.$pointers = /* @__PURE__ */ new Map(), this.$style = Xs, this.$action = Q, this.background = !1, this.disabled = !1, this.scaleStep = 0.1, this.themeColor = "#39f";
  }
  static get observedAttributes() {
    return super.observedAttributes.concat([
      "background",
      "disabled",
      "scale-step"
    ]);
  }
  connectedCallback() {
    super.connectedCallback(), this.disabled || this.$bind();
  }
  disconnectedCallback() {
    this.disabled || this.$unbind(), super.disconnectedCallback();
  }
  $propertyChangedCallback(t, e, s) {
    Object.is(s, e) || (super.$propertyChangedCallback(t, e, s), t === "disabled" && (s ? this.$unbind() : this.$bind()));
  }
  $bind() {
    this.$onPointerDown || (this.$onPointerDown = this.$handlePointerDown.bind(this), L(this, $e, this.$onPointerDown)), this.$onPointerMove || (this.$onPointerMove = this.$handlePointerMove.bind(this), L(this.ownerDocument, ye, this.$onPointerMove)), this.$onPointerUp || (this.$onPointerUp = this.$handlePointerUp.bind(this), L(this.ownerDocument, Ce, this.$onPointerUp)), this.$onWheel || (this.$onWheel = this.$handleWheel.bind(this), L(this, ke, this.$onWheel, {
      passive: !1,
      capture: !0
    }));
  }
  $unbind() {
    this.$onPointerDown && (F(this, $e, this.$onPointerDown), this.$onPointerDown = null), this.$onPointerMove && (F(this.ownerDocument, ye, this.$onPointerMove), this.$onPointerMove = null), this.$onPointerUp && (F(this.ownerDocument, Ce, this.$onPointerUp), this.$onPointerUp = null), this.$onWheel && (F(this, ke, this.$onWheel, {
      capture: !0
    }), this.$onWheel = null);
  }
  $handlePointerDown(t) {
    const { buttons: e, button: s, type: n } = t;
    if (this.disabled || // Handle pointer or mouse event, and ignore touch event
    (n === "pointerdown" && t.pointerType === "mouse" || n === "mousedown") && // No primary button (Usually the left button)
    (S(e) && e !== 1 || S(s) && s !== 0 || t.ctrlKey))
      return;
    const { $pointers: o } = this;
    let a = "";
    if (t.changedTouches)
      Array.from(t.changedTouches).forEach(({ identifier: r, pageX: h, pageY: c }) => {
        o.set(r, {
          startX: h,
          startY: c,
          endX: h,
          endY: c
        });
      });
    else {
      const { pointerId: r = 0, pageX: h, pageY: c } = t;
      o.set(r, {
        startX: h,
        startY: c,
        endX: h,
        endY: c
      });
    }
    o.size > 1 ? a = Wt : bt(t.target) && (a = t.target.action || t.target.getAttribute(Ss) || ""), this.$emit(rt, {
      action: a,
      relatedEvent: t
    }) !== !1 && (t.preventDefault(), this.$action = a, this.style.willChange = "transform");
  }
  $handlePointerMove(t) {
    const { $action: e, $pointers: s } = this;
    if (this.disabled || e === Q || s.size === 0 || this.$emit(Os, {
      action: e,
      relatedEvent: t
    }) === !1)
      return;
    if (t.preventDefault(), t.changedTouches)
      Array.from(t.changedTouches).forEach(({ identifier: o, pageX: a, pageY: r }) => {
        const h = s.get(o);
        h && Object.assign(h, {
          endX: a,
          endY: r
        });
      });
    else {
      const { pointerId: o = 0, pageX: a, pageY: r } = t, h = s.get(o);
      h && Object.assign(h, {
        endX: a,
        endY: r
      });
    }
    const n = {
      action: e,
      relatedEvent: t
    };
    if (e === Wt) {
      const o = new Map(s);
      let a = 0, r = 0, h = 0, c = 0, l = t.pageX, u = t.pageY;
      s.forEach((f, A) => {
        o.delete(A), o.forEach((x) => {
          let y = x.startX - f.startX, $ = x.startY - f.startY, C = x.endX - f.endX, d = x.endY - f.endY, g = 0, T = 0, O = 0, v = 0;
          if (y === 0 ? $ < 0 ? O = Math.PI * 2 : $ > 0 && (O = Math.PI) : y > 0 ? O = Math.PI / 2 + Math.atan($ / y) : y < 0 && (O = Math.PI * 1.5 + Math.atan($ / y)), C === 0 ? d < 0 ? v = Math.PI * 2 : d > 0 && (v = Math.PI) : C > 0 ? v = Math.PI / 2 + Math.atan(d / C) : C < 0 && (v = Math.PI * 1.5 + Math.atan(d / C)), v > 0 || O > 0) {
            const w = v - O, M = Math.abs(w);
            M > a && (a = M, h = w, l = (f.startX + x.startX) / 2, u = (f.startY + x.startY) / 2);
          }
          if (y = Math.abs(y), $ = Math.abs($), C = Math.abs(C), d = Math.abs(d), y > 0 && $ > 0 ? g = Math.sqrt(y * y + $ * $) : y > 0 ? g = y : $ > 0 && (g = $), C > 0 && d > 0 ? T = Math.sqrt(C * C + d * d) : C > 0 ? T = C : d > 0 && (T = d), g > 0 && T > 0) {
            const w = (T - g) / g, M = Math.abs(w);
            M > r && (r = M, c = w, l = (f.startX + x.startX) / 2, u = (f.startY + x.startY) / 2);
          }
        });
      });
      const p = a > 0, m = r > 0;
      p && m ? (n.rotate = h, n.scale = c, n.centerX = l, n.centerY = u) : p ? (n.action = Gt, n.rotate = h, n.centerX = l, n.centerY = u) : m ? (n.action = $t, n.scale = c, n.centerX = l, n.centerY = u) : n.action = Q;
    } else {
      const [o] = Array.from(s.values());
      Object.assign(n, o);
    }
    s.forEach((o) => {
      o.startX = o.endX, o.startY = o.endY;
    }), n.action !== Q && this.$emit(yt, n, {
      cancelable: !1
    });
  }
  $handlePointerUp(t) {
    const { $action: e, $pointers: s } = this;
    if (!(this.disabled || e === Q) && this.$emit(at, {
      action: e,
      relatedEvent: t
    }) !== !1) {
      if (t.preventDefault(), t.changedTouches)
        Array.from(t.changedTouches).forEach(({ identifier: n }) => {
          s.delete(n);
        });
      else {
        const { pointerId: n = 0 } = t;
        s.delete(n);
      }
      s.size === 0 && (this.style.willChange = "", this.$action = Q);
    }
  }
  $handleWheel(t) {
    if (this.disabled || (t.preventDefault(), this.$wheeling))
      return;
    this.$wheeling = !0, setTimeout(() => {
      this.$wheeling = !1;
    }, 50);
    const s = (t.deltaY > 0 ? -1 : 1) * this.scaleStep;
    this.$emit(yt, {
      action: $t,
      scale: s,
      relatedEvent: t
    }, {
      cancelable: !1
    });
  }
  /**
   * Changes the current action to a new one.
   * @param {string} action The new action.
   * @returns {CropperCanvas} Returns `this` for chaining.
   */
  $setAction(t) {
    return Lt(t) && (this.$action = t), this;
  }
  /**
   * Generates a real canvas element, with the image draw into if there is one.
   * @param {object} [options] The available options.
   * @param {number} [options.width] The width of the canvas.
   * @param {number} [options.height] The height of the canvas.
   * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
   * @returns {Promise} Returns a promise that resolves to the generated canvas element.
   */
  $toCanvas(t) {
    return new Promise((e, s) => {
      if (!this.isConnected) {
        s(new Error("The current element is not connected to the DOM."));
        return;
      }
      const n = document.createElement("canvas");
      let o = this.offsetWidth, a = this.offsetHeight, r = 1;
      Xt(t) && (Y(t.width) || Y(t.height)) && ({ width: o, height: a } = Ut({
        aspectRatio: o / a,
        width: t.width,
        height: t.height
      }), r = o / this.offsetWidth), n.width = o, n.height = a;
      const h = this.querySelector(this.$getTagNameOf(vt));
      if (!h) {
        e(n);
        return;
      }
      h.$ready().then((c) => {
        const l = n.getContext("2d");
        if (l) {
          const [u, p, m, f, A, x] = h.$getTransform();
          let y = A, $ = x, C = c.naturalWidth, d = c.naturalHeight;
          r !== 1 && (y *= r, $ *= r, C *= r, d *= r);
          const g = C / 2, T = d / 2;
          l.fillStyle = "transparent", l.fillRect(0, 0, o, a), Xt(t) && ne(t.beforeDraw) && t.beforeDraw.call(this, l, n), l.save(), l.translate(g, T), l.transform(u, p, m, f, y, $), l.translate(-g, -T), l.drawImage(c, 0, 0, C, d), l.restore();
        }
        e(n);
      }).catch(s);
    });
  }
}
ie.$name = Ct;
ie.$version = "2.1.0";
var Ys = ":host{display:inline-block}img{display:block;height:100%;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}";
const ze = /* @__PURE__ */ new WeakMap(), Ne = [
  "alt",
  "crossorigin",
  "decoding",
  "elementtiming",
  "fetchpriority",
  "loading",
  "referrerpolicy",
  "sizes",
  "src",
  "srcset"
];
class oe extends V {
  constructor() {
    super(...arguments), this.$matrix = [1, 0, 0, 1, 0, 0], this.$onLoad = null, this.$onCanvasAction = null, this.$onCanvasActionEnd = null, this.$onCanvasActionStart = null, this.$actionStartTarget = null, this.$style = Ys, this.$image = new Image(), this.initialCenterSize = "contain", this.rotatable = !1, this.scalable = !1, this.skewable = !1, this.slottable = !1, this.translatable = !1, this.alt = "", this.crossorigin = "", this.decoding = "", this.elementtiming = "", this.fetchpriority = "", this.loading = "", this.referrerpolicy = "", this.sizes = "", this.src = "", this.srcset = "";
  }
  set $canvas(t) {
    ze.set(this, t);
  }
  get $canvas() {
    return ze.get(this);
  }
  static get observedAttributes() {
    return super.observedAttributes.concat(Ne, [
      "initial-center-size",
      "rotatable",
      "scalable",
      "skewable",
      "translatable"
    ]);
  }
  attributeChangedCallback(t, e, s) {
    Object.is(s, e) || (super.attributeChangedCallback(t, e, s), Ne.includes(t) && this.$image.setAttribute(t, s));
  }
  $propertyChangedCallback(t, e, s) {
    Object.is(s, e) || (super.$propertyChangedCallback(t, e, s), t === "initialCenterSize" && this.$nextTick(() => {
      this.$center(s);
    }));
  }
  connectedCallback() {
    super.connectedCallback();
    const { $image: t } = this, e = this.closest(this.$getTagNameOf(Ct));
    e && (this.$canvas = e, this.$setStyles({
      // Make it a block element to avoid side effects (#1074).
      display: "block",
      position: "absolute"
    }), this.$onCanvasActionStart = (s) => {
      var n, o;
      this.$actionStartTarget = (o = (n = s.detail) === null || n === void 0 ? void 0 : n.relatedEvent) === null || o === void 0 ? void 0 : o.target;
    }, this.$onCanvasActionEnd = () => {
      this.$actionStartTarget = null;
    }, this.$onCanvasAction = this.$handleAction.bind(this), L(e, rt, this.$onCanvasActionStart), L(e, at, this.$onCanvasActionEnd), L(e, yt, this.$onCanvasAction)), this.$onLoad = this.$handleLoad.bind(this), L(t, gt, this.$onLoad), this.$getShadowRoot().appendChild(t);
  }
  disconnectedCallback() {
    const { $image: t, $canvas: e } = this;
    e && (this.$onCanvasActionStart && (F(e, rt, this.$onCanvasActionStart), this.$onCanvasActionStart = null), this.$onCanvasActionEnd && (F(e, at, this.$onCanvasActionEnd), this.$onCanvasActionEnd = null), this.$onCanvasAction && (F(e, yt, this.$onCanvasAction), this.$onCanvasAction = null)), t && this.$onLoad && (F(t, gt, this.$onLoad), this.$onLoad = null), this.$getShadowRoot().removeChild(t), super.disconnectedCallback();
  }
  $handleLoad() {
    const { $image: t } = this;
    this.$setStyles({
      width: t.naturalWidth,
      height: t.naturalHeight
    }), this.$canvas && this.$center(this.initialCenterSize);
  }
  $handleAction(t) {
    if (this.hidden || !(this.rotatable || this.scalable || this.translatable))
      return;
    const { $canvas: e } = this, { detail: s } = t;
    if (s) {
      const { relatedEvent: n } = s;
      let { action: o } = s;
      switch (o === Wt && (!this.rotatable || !this.scalable) && (this.rotatable ? o = Gt : this.scalable ? o = $t : o = Q), o) {
        case Be:
          if (this.translatable) {
            let a = null;
            n && (a = n.target.closest(this.$getTagNameOf(K))), a || (a = e.querySelector(this.$getTagNameOf(K))), a && a.multiple && !a.active && (a = e.querySelector(`${this.$getTagNameOf(K)}[active]`)), (!a || a.hidden || !a.movable || a.dynamic || !(this.$actionStartTarget && a.contains(this.$actionStartTarget))) && this.$move(s.endX - s.startX, s.endY - s.startY);
          }
          break;
        case Gt:
          if (this.rotatable)
            if (n) {
              const { x: a, y: r } = this.getBoundingClientRect();
              this.$rotate(s.rotate, n.clientX - a, n.clientY - r);
            } else
              this.$rotate(s.rotate);
          break;
        case $t:
          if (this.scalable)
            if (n) {
              const a = n.target.closest(this.$getTagNameOf(K));
              if (!a || !a.zoomable || a.zoomable && a.dynamic) {
                const { x: r, y: h } = this.getBoundingClientRect();
                this.$zoom(s.scale, n.clientX - r, n.clientY - h);
              }
            } else
              this.$zoom(s.scale);
          break;
        case Wt:
          if (this.rotatable && this.scalable) {
            const { rotate: a } = s;
            let { scale: r } = s;
            r < 0 ? r = 1 / (1 - r) : r += 1;
            const h = Math.cos(a), c = Math.sin(a), [l, u, p, m] = [
              h * r,
              c * r,
              -c * r,
              h * r
            ];
            if (n) {
              const f = this.getBoundingClientRect(), A = n.clientX - f.x, x = n.clientY - f.y, [y, $, C, d] = this.$matrix, g = f.width / 2, T = f.height / 2, O = A - g, v = x - T, w = (O * d - C * v) / (y * d - C * $), M = (v * y - $ * O) / (y * d - C * $);
              this.$transform(l, u, p, m, w * (1 - l) + M * p, M * (1 - m) + w * u);
            } else
              this.$transform(l, u, p, m, 0, 0);
          }
          break;
      }
    }
  }
  /**
   * Defers the callback to execute after successfully loading the image.
   * @param {Function} [callback] The callback to execute after successfully loading the image.
   * @returns {Promise} Returns a promise that resolves to the image element.
   */
  $ready(t) {
    const { $image: e } = this, s = new Promise((n, o) => {
      const a = new Error("Failed to load the image source");
      if (e.complete)
        e.naturalWidth > 0 && e.naturalHeight > 0 ? n(e) : o(a);
      else {
        const r = () => {
          F(e, xe, h), setTimeout(() => {
            n(e);
          });
        }, h = () => {
          F(e, gt, r), o(a);
        };
        Se(e, gt, r), Se(e, xe, h);
      }
    });
    return ne(t) && s.then((n) => (t(n), n)), s;
  }
  /**
   * Aligns the image to the center of its parent element.
   * @param {string} [size] The size of the image.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $center(t) {
    const { parentElement: e } = this;
    if (!e)
      return this;
    const s = e.getBoundingClientRect(), n = s.width, o = s.height, { x: a, y: r, width: h, height: c } = this.getBoundingClientRect(), l = a + h / 2, u = r + c / 2, p = s.x + n / 2, m = s.y + o / 2;
    if (this.$move(p - l, m - u), t && (h !== n || c !== o)) {
      const f = n / h, A = o / c;
      switch (t) {
        case "cover":
          this.$scale(Math.max(f, A));
          break;
        case "contain":
          this.$scale(Math.min(f, A));
          break;
      }
    }
    return this;
  }
  /**
   * Moves the image.
   * @param {number} x The moving distance in the horizontal direction.
   * @param {number} [y] The moving distance in the vertical direction.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $move(t, e = t) {
    if (this.translatable && S(t) && S(e)) {
      const [s, n, o, a] = this.$matrix, r = (t * a - o * e) / (s * a - o * n), h = (e * s - n * t) / (s * a - o * n);
      this.$translate(r, h);
    }
    return this;
  }
  /**
   * Moves the image to a specific position.
   * @param {number} x The new position in the horizontal direction.
   * @param {number} [y] The new position in the vertical direction.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $moveTo(t, e = t) {
    if (this.translatable && S(t) && S(e)) {
      const [s, n, o, a] = this.$matrix, r = (t * a - o * e) / (s * a - o * n), h = (e * s - n * t) / (s * a - o * n);
      this.$setTransform(s, n, o, a, r, h);
    }
    return this;
  }
  /**
   * Rotates the image.
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate}
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate}
   * @param {number|string} angle The rotation angle (in radians).
   * @param {number} [x] The rotation origin in the horizontal, defaults to the center of the image.
   * @param {number} [y] The rotation origin in the vertical, defaults to the center of the image.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $rotate(t, e, s) {
    if (this.rotatable) {
      const n = qt(t), o = Math.cos(n), a = Math.sin(n), [r, h, c, l] = [o, a, -a, o];
      if (S(e) && S(s)) {
        const [u, p, m, f] = this.$matrix, { width: A, height: x } = this.getBoundingClientRect(), y = A / 2, $ = x / 2, C = e - y, d = s - $, g = (C * f - m * d) / (u * f - m * p), T = (d * u - p * C) / (u * f - m * p);
        this.$transform(r, h, c, l, g * (1 - r) - T * c, T * (1 - l) - g * h);
      } else
        this.$transform(r, h, c, l, 0, 0);
    }
    return this;
  }
  /**
   * Zooms the image.
   * @param {number} scale The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
   * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the image.
   * @param {number} [y] The zoom origin in the vertical, defaults to the center of the image.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $zoom(t, e, s) {
    if (!this.scalable || t === 0)
      return this;
    if (t < 0 ? t = 1 / (1 - t) : t += 1, S(e) && S(s)) {
      const [n, o, a, r] = this.$matrix, { width: h, height: c } = this.getBoundingClientRect(), l = h / 2, u = c / 2, p = e - l, m = s - u, f = (p * r - a * m) / (n * r - a * o), A = (m * n - o * p) / (n * r - a * o);
      this.$transform(t, 0, 0, t, f * (1 - t), A * (1 - t));
    } else
      this.$scale(t);
    return this;
  }
  /**
   * Scales the image.
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale}
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale}
   * @param {number} x The scaling factor in the horizontal direction.
   * @param {number} [y] The scaling factor in the vertical direction.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $scale(t, e = t) {
    return this.scalable && this.$transform(t, 0, 0, e, 0, 0), this;
  }
  /**
   * Skews the image.
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew}
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform}
   * @param {number|string} x The skewing angle in the horizontal direction.
   * @param {number|string} [y] The skewing angle in the vertical direction.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $skew(t, e = 0) {
    if (this.skewable) {
      const s = qt(t), n = qt(e);
      this.$transform(1, Math.tan(n), Math.tan(s), 1, 0, 0);
    }
    return this;
  }
  /**
   * Translates the image.
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate}
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate}
   * @param {number} x The translating distance in the horizontal direction.
   * @param {number} [y] The translating distance in the vertical direction.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $translate(t, e = t) {
    return this.translatable && S(t) && S(e) && this.$transform(1, 0, 0, 1, t, e), this;
  }
  /**
   * Transforms the image.
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix}
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform}
   * @param {number} a The scaling factor in the horizontal direction.
   * @param {number} b The skewing angle in the vertical direction.
   * @param {number} c The skewing angle in the horizontal direction.
   * @param {number} d The scaling factor in the vertical direction.
   * @param {number} e The translating distance in the horizontal direction.
   * @param {number} f The translating distance in the vertical direction.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $transform(t, e, s, n, o, a) {
    return S(t) && S(e) && S(s) && S(n) && S(o) && S(a) ? this.$setTransform(Ge(this.$matrix, [t, e, s, n, o, a])) : this;
  }
  /**
   * Resets (overrides) the current transform to the specific identity matrix.
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform}
   * @param {number|Array} a The scaling factor in the horizontal direction.
   * @param {number} b The skewing angle in the vertical direction.
   * @param {number} c The skewing angle in the horizontal direction.
   * @param {number} d The scaling factor in the vertical direction.
   * @param {number} e The translating distance in the horizontal direction.
   * @param {number} f The translating distance in the vertical direction.
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $setTransform(t, e, s, n, o, a) {
    if ((this.rotatable || this.scalable || this.skewable || this.translatable) && (Array.isArray(t) && ([t, e, s, n, o, a] = t), S(t) && S(e) && S(s) && S(n) && S(o) && S(a))) {
      const r = [...this.$matrix], h = [t, e, s, n, o, a];
      if (this.$emit(Jt, {
        matrix: h,
        oldMatrix: r
      }) === !1)
        return this;
      this.$matrix = h, this.style.transform = `matrix(${h.join(", ")})`;
    }
    return this;
  }
  /**
   * Retrieves the current transformation matrix being applied to the element.
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getTransform}
   * @returns {Array} Returns the readonly transformation matrix.
   */
  $getTransform() {
    return this.$matrix.slice();
  }
  /**
   * Resets the current transform to the initial identity matrix.
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/resetTransform}
   * @returns {CropperImage} Returns `this` for chaining.
   */
  $resetTransform() {
    return this.$setTransform([1, 0, 0, 1, 0, 0]);
  }
}
oe.$name = vt;
oe.$version = "2.1.0";
var Bs = ":host{display:block;height:0;left:0;outline:var(--theme-color) solid 1px;position:relative;top:0;width:0}:host([transparent]){outline-color:transparent}";
const Pe = /* @__PURE__ */ new WeakMap();
class ae extends V {
  constructor() {
    super(...arguments), this.$onCanvasActionEnd = null, this.$onCanvasActionStart = null, this.$onSelectionChange = null, this.$style = Bs, this.x = 0, this.y = 0, this.width = 0, this.height = 0, this.slottable = !1, this.themeColor = "rgba(0, 0, 0, 0.65)";
  }
  set $canvas(t) {
    Pe.set(this, t);
  }
  get $canvas() {
    return Pe.get(this);
  }
  static get observedAttributes() {
    return super.observedAttributes.concat([
      "height",
      "width",
      "x",
      "y"
    ]);
  }
  connectedCallback() {
    super.connectedCallback();
    const t = this.closest(this.$getTagNameOf(Ct));
    if (t) {
      this.$canvas = t, this.style.position = "absolute";
      const e = t.querySelector(this.$getTagNameOf(K));
      e && (this.$onCanvasActionStart = (s) => {
        e.hidden && s.detail.action === Ht && (this.hidden = !1);
      }, this.$onCanvasActionEnd = (s) => {
        e.hidden && s.detail.action === Ht && (this.hidden = !0);
      }, this.$onSelectionChange = (s) => {
        const { x: n, y: o, width: a, height: r } = s.defaultPrevented ? e : s.detail;
        this.$change(n, o, a, r), (e.hidden || n === 0 && o === 0 && a === 0 && r === 0) && (this.hidden = !0);
      }, L(t, rt, this.$onCanvasActionStart), L(t, at, this.$onCanvasActionEnd), L(t, et, this.$onSelectionChange));
    }
    this.$render();
  }
  disconnectedCallback() {
    const { $canvas: t } = this;
    t && (this.$onCanvasActionStart && (F(t, rt, this.$onCanvasActionStart), this.$onCanvasActionStart = null), this.$onCanvasActionEnd && (F(t, at, this.$onCanvasActionEnd), this.$onCanvasActionEnd = null), this.$onSelectionChange && (F(t, et, this.$onSelectionChange), this.$onSelectionChange = null)), super.disconnectedCallback();
  }
  /**
   * Changes the position and/or size of the shade.
   * @param {number} x The new position in the horizontal direction.
   * @param {number} y The new position in the vertical direction.
   * @param {number} [width] The new width.
   * @param {number} [height] The new height.
   * @returns {CropperShade} Returns `this` for chaining.
   */
  $change(t, e, s = this.width, n = this.height) {
    return !S(t) || !S(e) || !S(s) || !S(n) || t === this.x && e === this.y && s === this.width && n === this.height ? this : (this.hidden && (this.hidden = !1), this.x = t, this.y = e, this.width = s, this.height = n, this.$render());
  }
  /**
   * Resets the shade to its initial position and size.
   * @returns {CropperShade} Returns `this` for chaining.
   */
  $reset() {
    return this.$change(0, 0, 0, 0);
  }
  /**
   * Refreshes the position or size of the shade.
   * @returns {CropperShade} Returns `this` for chaining.
   */
  $render() {
    return this.$setStyles({
      transform: `translate(${this.x}px, ${this.y}px)`,
      width: this.width,
      height: this.height,
      outlineWidth: Z.innerWidth
    });
  }
}
ae.$name = Es;
ae.$version = "2.1.0";
var Zs = ':host{background-color:var(--theme-color);display:block}:host([action=move]),:host([action=select]){height:100%;left:0;position:absolute;top:0;width:100%}:host([action=move]){cursor:move}:host([action=select]){cursor:crosshair}:host([action$=-resize]){background-color:transparent;height:15px;position:absolute;width:15px}:host([action$=-resize]):after{background-color:var(--theme-color);content:"";display:block;height:5px;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:5px}:host([action=n-resize]),:host([action=s-resize]){cursor:ns-resize;left:50%;transform:translateX(-50%);width:100%}:host([action=n-resize]){top:-8px}:host([action=s-resize]){bottom:-8px}:host([action=e-resize]),:host([action=w-resize]){cursor:ew-resize;height:100%;top:50%;transform:translateY(-50%)}:host([action=e-resize]){right:-8px}:host([action=w-resize]){left:-8px}:host([action=ne-resize]){cursor:nesw-resize;right:-8px;top:-8px}:host([action=nw-resize]){cursor:nwse-resize;left:-8px;top:-8px}:host([action=se-resize]){bottom:-8px;cursor:nwse-resize;right:-8px}:host([action=se-resize]):after{height:15px;width:15px}@media (pointer:coarse){:host([action=se-resize]):after{height:10px;width:10px}}@media (pointer:fine){:host([action=se-resize]):after{height:5px;width:5px}}:host([action=sw-resize]){bottom:-8px;cursor:nesw-resize;left:-8px}:host([plain]){background-color:transparent}';
class re extends V {
  constructor() {
    super(...arguments), this.$onCanvasCropEnd = null, this.$onCanvasCropStart = null, this.$style = Zs, this.action = Q, this.plain = !1, this.slottable = !1, this.themeColor = "rgba(51, 153, 255, 0.5)";
  }
  static get observedAttributes() {
    return super.observedAttributes.concat([
      "action",
      "plain"
    ]);
  }
}
re.$name = ks;
re.$version = "2.1.0";
var qs = ':host{display:block;left:0;position:relative;right:0}:host([outlined]){outline:1px solid var(--theme-color)}:host([multiple]){outline:1px dashed hsla(0,0%,100%,.5)}:host([multiple]):after{bottom:0;content:"";cursor:pointer;display:block;left:0;position:absolute;right:0;top:0}:host([multiple][active]){outline-color:var(--theme-color);z-index:1}:host([multiple])>*{visibility:hidden}:host([multiple][active])>*{visibility:visible}:host([multiple][active]):after{display:none}';
const je = /* @__PURE__ */ new WeakMap();
class ce extends V {
  constructor() {
    super(...arguments), this.$onCanvasAction = null, this.$onCanvasActionStart = null, this.$onCanvasActionEnd = null, this.$onDocumentKeyDown = null, this.$action = "", this.$actionStartTarget = null, this.$changing = !1, this.$style = qs, this.$initialSelection = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }, this.x = 0, this.y = 0, this.width = 0, this.height = 0, this.aspectRatio = NaN, this.initialAspectRatio = NaN, this.initialCoverage = NaN, this.active = !1, this.linked = !1, this.dynamic = !1, this.movable = !1, this.resizable = !1, this.zoomable = !1, this.multiple = !1, this.keyboard = !1, this.outlined = !1, this.precise = !1;
  }
  set $canvas(t) {
    je.set(this, t);
  }
  get $canvas() {
    return je.get(this);
  }
  static get observedAttributes() {
    return super.observedAttributes.concat([
      "active",
      "aspect-ratio",
      "dynamic",
      "height",
      "initial-aspect-ratio",
      "initial-coverage",
      "keyboard",
      "linked",
      "movable",
      "multiple",
      "outlined",
      "precise",
      "resizable",
      "width",
      "x",
      "y",
      "zoomable"
    ]);
  }
  $propertyChangedCallback(t, e, s) {
    if (!Object.is(s, e))
      switch (super.$propertyChangedCallback(t, e, s), t) {
        case "x":
        case "y":
        case "width":
        case "height":
          this.$changing || this.$nextTick(() => {
            this.$change(this.x, this.y, this.width, this.height, this.aspectRatio, !0);
          });
          break;
        case "aspectRatio":
        case "initialAspectRatio":
          this.$nextTick(() => {
            this.$initSelection();
          });
          break;
        case "initialCoverage":
          this.$nextTick(() => {
            Y(s) && s <= 1 && this.$initSelection(!0, !0);
          });
          break;
        case "keyboard":
          this.$nextTick(() => {
            this.$canvas && (s ? this.$onDocumentKeyDown || (this.$onDocumentKeyDown = this.$handleKeyDown.bind(this), L(this.ownerDocument, we, this.$onDocumentKeyDown)) : this.$onDocumentKeyDown && (F(this.ownerDocument, we, this.$onDocumentKeyDown), this.$onDocumentKeyDown = null));
          });
          break;
        case "multiple":
          this.$nextTick(() => {
            if (this.$canvas) {
              const n = this.$getSelections();
              s ? (n.forEach((o) => {
                o.active = !1;
              }), this.active = !0, this.$emit(et, {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
              })) : (this.active = !1, n.slice(1).forEach((o) => {
                this.$removeSelection(o);
              }));
            }
          });
          break;
        case "precise":
          this.$nextTick(() => {
            this.$change(this.x, this.y);
          });
          break;
        // Backwards compatible with 2.0.0-rc
        case "linked":
          s && (this.dynamic = !0);
          break;
      }
  }
  connectedCallback() {
    super.connectedCallback();
    const t = this.closest(this.$getTagNameOf(Ct));
    t ? (this.$canvas = t, this.$setStyles({
      position: "absolute",
      transform: `translate(${this.x}px, ${this.y}px)`
    }), this.hidden || this.$render(), this.$initSelection(!0), this.$onCanvasActionStart = this.$handleActionStart.bind(this), this.$onCanvasActionEnd = this.$handleActionEnd.bind(this), this.$onCanvasAction = this.$handleAction.bind(this), L(t, rt, this.$onCanvasActionStart), L(t, at, this.$onCanvasActionEnd), L(t, yt, this.$onCanvasAction)) : this.$render();
  }
  disconnectedCallback() {
    const { $canvas: t } = this;
    t && (this.$onCanvasActionStart && (F(t, rt, this.$onCanvasActionStart), this.$onCanvasActionStart = null), this.$onCanvasActionEnd && (F(t, at, this.$onCanvasActionEnd), this.$onCanvasActionEnd = null), this.$onCanvasAction && (F(t, yt, this.$onCanvasAction), this.$onCanvasAction = null)), super.disconnectedCallback();
  }
  $getSelections() {
    let t = [];
    return this.parentElement && (t = Array.from(this.parentElement.querySelectorAll(this.$getTagNameOf(K)))), t;
  }
  $initSelection(t = !1, e = !1) {
    const { initialCoverage: s, parentElement: n } = this;
    if (Y(s) && n) {
      const o = this.aspectRatio || this.initialAspectRatio;
      let a = (e ? 0 : this.width) || n.offsetWidth * s, r = (e ? 0 : this.height) || n.offsetHeight * s;
      Y(o) && ({ width: a, height: r } = Ut({ aspectRatio: o, width: a, height: r })), this.$change(this.x, this.y, a, r), t && this.$center(), this.$initialSelection = {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      };
    }
  }
  $createSelection() {
    const t = this.cloneNode(!0);
    return this.hasAttribute("id") && t.removeAttribute("id"), t.initialCoverage = NaN, this.active = !1, this.parentElement && this.parentElement.insertBefore(t, this.nextSibling), t;
  }
  $removeSelection(t = this) {
    if (this.parentElement) {
      const e = this.$getSelections();
      if (e.length > 1) {
        const s = e.indexOf(t), n = e[s + 1] || e[s - 1];
        n && (t.active = !1, this.parentElement.removeChild(t), n.active = !0, n.$emit(et, {
          x: n.x,
          y: n.y,
          width: n.width,
          height: n.height
        }));
      } else
        this.$clear();
    }
  }
  $handleActionStart(t) {
    var e, s;
    const n = (s = (e = t.detail) === null || e === void 0 ? void 0 : e.relatedEvent) === null || s === void 0 ? void 0 : s.target;
    this.$action = "", this.$actionStartTarget = n, !this.hidden && this.multiple && !this.active && n === this && this.parentElement && (this.$getSelections().forEach((o) => {
      o.active = !1;
    }), this.active = !0, this.$emit(et, {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    }));
  }
  $handleAction(t) {
    const { currentTarget: e, detail: s } = t;
    if (!e || !s)
      return;
    const { relatedEvent: n } = s;
    let { action: o } = s;
    const a = n ? Ds(n) : null;
    if (!o && this.multiple && (o = this.$action || a?.action, this.$action = o), !o || this.hidden && o !== Ht || this.multiple && !this.active && o !== $t)
      return;
    const { width: r, height: h } = this;
    let c = s.endX - s.startX, l = s.endY - s.startY, { aspectRatio: u } = this;
    switch (!Y(u) && n.shiftKey && (u = Y(r) && Y(h) ? r / h : 1), o) {
      case Ht:
        if (c !== 0 || l !== 0) {
          c === 0 ? c = l : l === 0 && (l = c);
          const { $canvas: p } = this, m = Re(e);
          (this.multiple && !this.hidden ? this.$createSelection() : this).$change(s.startX - m.left, s.startY - m.top, Math.abs(c), Math.abs(l), u), c < 0 ? l < 0 ? o = Et : l > 0 && (o = St) : c > 0 && (l < 0 ? o = kt : l > 0 && (o = At)), p && (p.$action = o);
        }
        break;
      case Be:
        this.movable && (this.dynamic || this.$actionStartTarget && this.contains(this.$actionStartTarget)) && this.$move(c, l);
        break;
      case $t:
        if (n && this.zoomable && (this.dynamic || this.contains(n.target))) {
          const p = Re(e);
          this.$zoom(s.scale, n.pageX - p.left, n.pageY - p.top);
        }
        break;
      default:
        this.$resize(o, c, l, u);
    }
  }
  $handleActionEnd() {
    this.$action = "", this.$actionStartTarget = null;
  }
  $handleKeyDown(t) {
    if (this.hidden || !this.keyboard || this.multiple && !this.active || t.defaultPrevented)
      return;
    const { activeElement: e } = document;
    if (!(e && (["INPUT", "TEXTAREA"].includes(e.tagName) || ["true", "plaintext-only"].includes(e.contentEditable))))
      switch (t.key) {
        case "Backspace":
          t.metaKey && (t.preventDefault(), this.$removeSelection());
          break;
        case "Delete":
          t.preventDefault(), this.$removeSelection();
          break;
        // Move to the left
        case "ArrowLeft":
          t.preventDefault(), this.$move(-1, 0);
          break;
        // Move to the right
        case "ArrowRight":
          t.preventDefault(), this.$move(1, 0);
          break;
        // Move to the top
        case "ArrowUp":
          t.preventDefault(), this.$move(0, -1);
          break;
        // Move to the bottom
        case "ArrowDown":
          t.preventDefault(), this.$move(0, 1);
          break;
        case "+":
          t.preventDefault(), this.$zoom(0.1);
          break;
        case "-":
          t.preventDefault(), this.$zoom(-0.1);
          break;
      }
  }
  /**
   * Aligns the selection to the center of its parent element.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $center() {
    const { parentElement: t } = this;
    if (!t)
      return this;
    const e = (t.offsetWidth - this.width) / 2, s = (t.offsetHeight - this.height) / 2;
    return this.$change(e, s);
  }
  /**
   * Moves the selection.
   * @param {number} x The moving distance in the horizontal direction.
   * @param {number} [y] The moving distance in the vertical direction.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $move(t, e = t) {
    return this.$moveTo(this.x + t, this.y + e);
  }
  /**
   * Moves the selection to a specific position.
   * @param {number} x The new position in the horizontal direction.
   * @param {number} [y] The new position in the vertical direction.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $moveTo(t, e = t) {
    return this.movable ? this.$change(t, e) : this;
  }
  /**
   * Adjusts the size the selection on a specific side or corner.
   * @param {string} action Indicates the side or corner to resize.
   * @param {number} [offsetX] The horizontal offset of the specific side or corner.
   * @param {number} [offsetY] The vertical offset of the specific side or corner.
   * @param {number} [aspectRatio] The aspect ratio for computing the new size if it is necessary.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $resize(t, e = 0, s = 0, n = this.aspectRatio) {
    if (!this.resizable)
      return this;
    const o = Y(n), { $canvas: a } = this;
    let { x: r, y: h, width: c, height: l } = this;
    switch (t) {
      case me:
        h += s, l -= s, l < 0 && (t = be, l = -l, h -= l), o && (e = s * n, r += e / 2, c -= e, c < 0 && (c = -c, r -= c));
        break;
      case ge:
        c += e, c < 0 && (t = ve, c = -c, r -= c), o && (s = e / n, h -= s / 2, l += s, l < 0 && (l = -l, h -= l));
        break;
      case be:
        l += s, l < 0 && (t = me, l = -l, h -= l), o && (e = s * n, r -= e / 2, c += e, c < 0 && (c = -c, r -= c));
        break;
      case ve:
        r += e, c -= e, c < 0 && (t = ge, c = -c, r -= c), o && (s = e / n, h += s / 2, l -= s, l < 0 && (l = -l, h -= l));
        break;
      case kt:
        o && (s = -e / n), h += s, l -= s, c += e, c < 0 && l < 0 ? (t = St, c = -c, l = -l, r -= c, h -= l) : c < 0 ? (t = Et, c = -c, r -= c) : l < 0 && (t = At, l = -l, h -= l);
        break;
      case Et:
        o && (s = e / n), r += e, h += s, c -= e, l -= s, c < 0 && l < 0 ? (t = At, c = -c, l = -l, r -= c, h -= l) : c < 0 ? (t = kt, c = -c, r -= c) : l < 0 && (t = St, l = -l, h -= l);
        break;
      case At:
        o && (s = e / n), c += e, l += s, c < 0 && l < 0 ? (t = Et, c = -c, l = -l, r -= c, h -= l) : c < 0 ? (t = St, c = -c, r -= c) : l < 0 && (t = kt, l = -l, h -= l);
        break;
      case St:
        o && (s = -e / n), r += e, c -= e, l += s, c < 0 && l < 0 ? (t = kt, c = -c, l = -l, r -= c, h -= l) : c < 0 ? (t = At, c = -c, r -= c) : l < 0 && (t = Et, l = -l, h -= l);
        break;
    }
    return a && a.$setAction(t), this.$change(r, h, c, l);
  }
  /**
   * Zooms the selection.
   * @param {number} scale The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
   * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the selection.
   * @param {number} [y] The zoom origin in the vertical, defaults to the center of the selection.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $zoom(t, e, s) {
    if (!this.zoomable || t === 0)
      return this;
    t < 0 ? t = 1 / (1 - t) : t += 1;
    const { width: n, height: o } = this, a = n * t, r = o * t;
    let h = this.x, c = this.y;
    return S(e) && S(s) ? (h -= (a - n) * ((e - this.x) / n), c -= (r - o) * ((s - this.y) / o)) : (h -= (a - n) / 2, c -= (r - o) / 2), this.$change(h, c, a, r);
  }
  /**
   * Changes the position and/or size of the selection.
   * @param {number} x The new position in the horizontal direction.
   * @param {number} y The new position in the vertical direction.
   * @param {number} [width] The new width.
   * @param {number} [height] The new height.
   * @param {number} [aspectRatio] The new aspect ratio for this change only.
   * @param {number} [_force] Force change.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $change(t, e, s = this.width, n = this.height, o = this.aspectRatio, a = !1) {
    return this.$changing || !S(t) || !S(e) || !S(s) || !S(n) || s < 0 || n < 0 ? this : (Y(o) && ({ width: s, height: n } = Ut({ aspectRatio: o, width: s, height: n }, "cover")), this.precise || (t = Math.round(t), e = Math.round(e), s = Math.round(s), n = Math.round(n)), t === this.x && e === this.y && s === this.width && n === this.height && Object.is(o, this.aspectRatio) && !a ? this : (this.hidden && (this.hidden = !1), this.$emit(et, {
      x: t,
      y: e,
      width: s,
      height: n
    }) === !1 ? this : (this.$changing = !0, this.x = t, this.y = e, this.width = s, this.height = n, this.$changing = !1, this.$render())));
  }
  /**
   * Resets the selection to its initial position and size.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $reset() {
    const { x: t, y: e, width: s, height: n } = this.$initialSelection;
    return this.$change(t, e, s, n);
  }
  /**
   * Clears the selection.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $clear() {
    return this.$change(0, 0, 0, 0, NaN, !0), this.hidden = !0, this;
  }
  /**
   * Refreshes the position or size of the selection.
   * @returns {CropperSelection} Returns `this` for chaining.
   */
  $render() {
    return this.$setStyles({
      transform: `translate(${this.x}px, ${this.y}px)`,
      width: this.width,
      height: this.height
    });
  }
  /**
   * Generates a real canvas element, with the image (selected area only) draw into if there is one.
   * @param {object} [options] The available options.
   * @param {number} [options.width] The width of the canvas.
   * @param {number} [options.height] The height of the canvas.
   * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
   * @returns {Promise} Returns a promise that resolves to the generated canvas element.
   */
  $toCanvas(t) {
    return new Promise((e, s) => {
      if (!this.isConnected) {
        s(new Error("The current element is not connected to the DOM."));
        return;
      }
      const n = document.createElement("canvas");
      let { width: o, height: a } = this, r = 1;
      if (Xt(t) && (Y(t.width) || Y(t.height)) && ({ width: o, height: a } = Ut({
        aspectRatio: o / a,
        width: t.width,
        height: t.height
      }), r = o / this.width), n.width = o, n.height = a, !this.$canvas) {
        e(n);
        return;
      }
      const h = this.$canvas.querySelector(this.$getTagNameOf(vt));
      if (!h) {
        e(n);
        return;
      }
      h.$ready().then((c) => {
        const l = n.getContext("2d");
        if (l) {
          const [u, p, m, f, A, x] = h.$getTransform(), y = -this.x, $ = -this.y, C = (y * f - m * $) / (u * f - m * p), d = ($ * u - p * y) / (u * f - m * p);
          let g = u * C + m * d + A, T = p * C + f * d + x, O = c.naturalWidth, v = c.naturalHeight;
          r !== 1 && (g *= r, T *= r, O *= r, v *= r);
          const w = O / 2, M = v / 2;
          l.fillStyle = "transparent", l.fillRect(0, 0, o, a), Xt(t) && ne(t.beforeDraw) && t.beforeDraw.call(this, l, n), l.save(), l.translate(w, M), l.transform(u, p, m, f, g, T), l.translate(-w, -M), l.drawImage(c, 0, 0, O, v), l.restore();
        }
        e(n);
      }).catch(s);
    });
  }
}
ce.$name = K;
ce.$version = "2.1.0";
var Ks = ":host{display:flex;flex-direction:column;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host([bordered]){border:1px dashed var(--theme-color)}:host([covered]){bottom:0;left:0;position:absolute;right:0;top:0}:host>span{display:flex;flex:1}:host>span+span{border-top:1px dashed var(--theme-color)}:host>span>span{flex:1}:host>span>span+span{border-left:1px dashed var(--theme-color)}";
class le extends V {
  constructor() {
    super(...arguments), this.$style = Ks, this.bordered = !1, this.columns = 3, this.covered = !1, this.rows = 3, this.slottable = !1, this.themeColor = "rgba(238, 238, 238, 0.5)";
  }
  static get observedAttributes() {
    return super.observedAttributes.concat([
      "bordered",
      "columns",
      "covered",
      "rows"
    ]);
  }
  $propertyChangedCallback(t, e, s) {
    Object.is(s, e) || (super.$propertyChangedCallback(t, e, s), (t === "rows" || t === "columns") && this.$nextTick(() => {
      this.$render();
    }));
  }
  connectedCallback() {
    super.connectedCallback(), this.$render();
  }
  $render() {
    const t = this.$getShadowRoot(), e = document.createDocumentFragment();
    for (let s = 0; s < this.rows; s += 1) {
      const n = document.createElement("span");
      n.setAttribute("role", "row");
      for (let o = 0; o < this.columns; o += 1) {
        const a = document.createElement("span");
        a.setAttribute("role", "gridcell"), n.appendChild(a);
      }
      e.appendChild(n);
    }
    t && (t.innerHTML = "", t.appendChild(e));
  }
}
le.$name = ws;
le.$version = "2.1.0";
var Vs = ':host{display:inline-block;height:1em;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle;width:1em}:host:after,:host:before{background-color:var(--theme-color);content:"";display:block;position:absolute}:host:before{height:1px;left:0;top:50%;transform:translateY(-50%);width:100%}:host:after{height:100%;left:50%;top:0;transform:translateX(-50%);width:1px}:host([centered]){left:50%;position:absolute;top:50%;transform:translate(-50%,-50%)}';
class he extends V {
  constructor() {
    super(...arguments), this.$style = Vs, this.centered = !1, this.slottable = !1, this.themeColor = "rgba(238, 238, 238, 0.5)";
  }
  static get observedAttributes() {
    return super.observedAttributes.concat([
      "centered"
    ]);
  }
}
he.$name = xs;
he.$version = "2.1.0";
var Gs = ":host{display:block;height:100%;overflow:hidden;position:relative;width:100%}";
const De = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakMap(), Js = "both", Qs = "horizontal", He = "vertical", tn = "none";
class ue extends V {
  constructor() {
    super(...arguments), this.$onSelectionChange = null, this.$onSourceImageLoad = null, this.$onSourceImageTransform = null, this.$scale = 1, this.$style = Gs, this.resize = He, this.selection = "", this.slottable = !1;
  }
  set $image(t) {
    Fe.set(this, t);
  }
  get $image() {
    return Fe.get(this);
  }
  set $sourceImage(t) {
    Ue.set(this, t);
  }
  get $sourceImage() {
    return Ue.get(this);
  }
  set $canvas(t) {
    De.set(this, t);
  }
  get $canvas() {
    return De.get(this);
  }
  set $selection(t) {
    Le.set(this, t);
  }
  get $selection() {
    return Le.get(this);
  }
  static get observedAttributes() {
    return super.observedAttributes.concat([
      "resize",
      "selection"
    ]);
  }
  connectedCallback() {
    var t, e;
    super.connectedCallback();
    let s = null;
    if (this.selection ? s = (e = (t = Ve(this)) === null || t === void 0 ? void 0 : t.querySelector(this.selection)) !== null && e !== void 0 ? e : null : s = this.closest(this.$getTagNameOf(K)), bt(s)) {
      this.$selection = s, this.$onSelectionChange = this.$handleSelectionChange.bind(this), L(s, et, this.$onSelectionChange);
      const n = s.closest(this.$getTagNameOf(Ct));
      if (n) {
        this.$canvas = n;
        const o = n.querySelector(this.$getTagNameOf(vt));
        o && (this.$sourceImage = o, this.$image = o.cloneNode(!0), this.$getShadowRoot().appendChild(this.$image), this.$onSourceImageLoad = this.$handleSourceImageLoad.bind(this), this.$onSourceImageTransform = this.$handleSourceImageTransform.bind(this), L(o.$image, gt, this.$onSourceImageLoad), L(o, Jt, this.$onSourceImageTransform));
      }
      this.$render();
    }
  }
  disconnectedCallback() {
    const { $selection: t, $sourceImage: e } = this;
    t && this.$onSelectionChange && (F(t, et, this.$onSelectionChange), this.$onSelectionChange = null), e && this.$onSourceImageLoad && (F(e.$image, gt, this.$onSourceImageLoad), this.$onSourceImageLoad = null), e && this.$onSourceImageTransform && (F(e, Jt, this.$onSourceImageTransform), this.$onSourceImageTransform = null), super.disconnectedCallback();
  }
  $handleSelectionChange(t) {
    this.$render(t.defaultPrevented ? this.$selection : t.detail);
  }
  $handleSourceImageLoad() {
    const { $image: t, $sourceImage: e } = this, s = t.getAttribute("src"), n = e.getAttribute("src");
    n && n !== s && (t.setAttribute("src", n), t.$ready(() => {
      this.$render();
    }));
  }
  $handleSourceImageTransform(t) {
    this.$render(void 0, t.detail.matrix);
  }
  $render(t, e) {
    const { $canvas: s, $selection: n } = this;
    !t && !n.hidden && (t = n), (!t || t.x === 0 && t.y === 0 && t.width === 0 && t.height === 0) && (t = {
      x: 0,
      y: 0,
      width: s.offsetWidth,
      height: s.offsetHeight
    });
    const { x: o, y: a, width: r, height: h } = t, c = {}, { clientWidth: l, clientHeight: u } = this;
    let p = l, m = u, f = NaN;
    switch (this.resize) {
      case Js:
        f = 1, p = r, m = h, c.width = r, c.height = h;
        break;
      case Qs:
        f = h > 0 ? u / h : 0, p = r * f, c.width = p;
        break;
      case He:
        f = r > 0 ? l / r : 0, m = h * f, c.height = m;
        break;
      case tn:
      default:
        l > 0 ? f = r > 0 ? l / r : 0 : u > 0 && (f = h > 0 ? u / h : 0);
    }
    this.$scale = f, this.$setStyles(c), this.$sourceImage && setTimeout(() => {
      this.$transformImageByOffset(e ?? this.$sourceImage.$getTransform(), -o, -a);
    });
  }
  $transformImageByOffset(t, e, s) {
    const { $image: n, $scale: o, $sourceImage: a } = this;
    if (a && n && o >= 0) {
      const [r, h, c, l, u, p] = t, m = (e * l - c * s) / (r * l - c * h), f = (s * r - h * e) / (r * l - c * h), A = r * m + c * f + u, x = h * m + l * f + p;
      n.$ready((y) => {
        this.$setStyles.call(n, {
          width: y.naturalWidth * o,
          height: y.naturalHeight * o
        });
      }), n.$setTransform(r, h, c, l, A * o, x * o);
    }
  }
}
ue.$name = As;
ue.$version = "2.1.0";
var en = '<cropper-canvas background><cropper-image rotatable scalable skewable translatable></cropper-image><cropper-shade hidden></cropper-shade><cropper-handle action="select" plain></cropper-handle><cropper-selection initial-coverage="0.5" movable resizable><cropper-grid role="grid" bordered covered></cropper-grid><cropper-crosshair centered></cropper-crosshair><cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle><cropper-handle action="n-resize"></cropper-handle><cropper-handle action="e-resize"></cropper-handle><cropper-handle action="s-resize"></cropper-handle><cropper-handle action="w-resize"></cropper-handle><cropper-handle action="ne-resize"></cropper-handle><cropper-handle action="nw-resize"></cropper-handle><cropper-handle action="se-resize"></cropper-handle><cropper-handle action="sw-resize"></cropper-handle></cropper-selection></cropper-canvas>';
const sn = /^img|canvas$/, nn = /<(\/?(?:script|style)[^>]*)>/gi, We = {
  template: en
};
ie.$define();
he.$define();
le.$define();
re.$define();
oe.$define();
ce.$define();
ae.$define();
ue.$define();
class Je {
  constructor(t, e) {
    var s;
    if (this.options = We, Lt(t) && (t = document.querySelector(t)), !bt(t) || !sn.test(t.localName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = t, e = Object.assign(Object.assign({}, We), e), this.options = e;
    let { container: n } = e;
    if (n && (Lt(n) && (n = (s = Ve(t)) === null || s === void 0 ? void 0 : s.querySelector(n)), !bt(n)))
      throw new Error("The `container` option must be an element or a valid selector.");
    bt(n) || (t.parentElement ? n = t.parentElement : n = t.ownerDocument.body), this.container = n;
    const o = t.localName;
    let a = "";
    o === "img" ? { src: a } = t : o === "canvas" && window.HTMLCanvasElement && (a = t.toDataURL());
    const { template: r } = e;
    if (r && Lt(r)) {
      const h = document.createElement("template"), c = document.createDocumentFragment();
      h.innerHTML = r.replace(nn, "&lt;$1&gt;"), c.appendChild(h.content), Array.from(c.querySelectorAll(vt)).forEach((l) => {
        l.setAttribute("src", a), l.setAttribute("alt", t.alt || "The image to crop"), o === "img" && [
          "crossorigin",
          "decoding",
          "elementtiming",
          "fetchpriority",
          "loading",
          "referrerpolicy",
          "sizes",
          "srcset"
        ].forEach((u) => {
          t.hasAttribute(u) && l.setAttribute(u, t.getAttribute(u) || "");
        });
      }), t.parentElement ? (t.style.display = "none", n.insertBefore(c, t.nextSibling)) : n.appendChild(c);
    }
  }
  getCropperCanvas() {
    return this.container.querySelector(Ct);
  }
  getCropperImage() {
    return this.container.querySelector(vt);
  }
  getCropperSelection() {
    return this.container.querySelector(K);
  }
  getCropperSelections() {
    return this.container.querySelectorAll(K);
  }
  destroy() {
    var t;
    const e = this.getCropperCanvas();
    e && ((t = e.parentElement) === null || t === void 0 || t.removeChild(e)), this.element && (this.element.style.display = "");
  }
}
Je.version = "2.1.0";
function on() {
  const i = N(null), t = N(!1);
  let e = 1, s = 1;
  function n(d, g = {}) {
    C(), e = 1, s = 1, i.value = new Je(d, {
      ...g
    }), t.value = !0;
  }
  function o() {
    return i.value?.getCropperSelection?.();
  }
  function a() {
    return i.value?.getCropperImage?.();
  }
  function r() {
    return i.value?.getCropperCanvas?.();
  }
  async function h(d = {}) {
    const g = o();
    return g ? await g.$toCanvas(d) : null;
  }
  async function c() {
    const d = o(), g = a();
    if (!d || !g) return null;
    const T = d.width, O = d.height;
    if (T <= 0 || O <= 0) return null;
    const v = await g.$ready(), w = v.naturalWidth, M = v.naturalHeight;
    if (w <= 0 || M <= 0) return null;
    const [P, D, W, U, ct, xt] = g.$getTransform(), lt = w / 2, ht = M / 2, j = ct + lt * (1 - P) - ht * W, G = xt + ht * (1 - U) - lt * D, J = P * U - D * W;
    if (Math.abs(J) < 1e-6) return null;
    const ut = d.x, dt = d.y, wt = (U * (ut - j) - W * (dt - G)) / J, _t = (-D * (ut - j) + P * (dt - G)) / J, Ot = (U * (ut + T - j) - W * (dt + O - G)) / J, It = (-D * (ut + T - j) + P * (dt + O - G)) / J, Mt = Math.max(0, Math.round(Math.min(wt, Ot))), zt = Math.max(0, Math.round(Math.min(_t, It))), ft = Math.min(w - Mt, Math.round(Math.abs(Ot - wt))), pt = Math.min(M - zt, Math.round(Math.abs(It - _t)));
    if (ft <= 0 || pt <= 0) return null;
    const mt = document.createElement("canvas");
    return mt.width = ft, mt.height = pt, mt.getContext("2d").drawImage(v, Mt, zt, ft, pt, 0, 0, ft, pt), new Promise((Bt) => {
      mt.toBlob((Nt) => {
        Bt(Nt ? URL.createObjectURL(Nt) : null);
      }, "image/png");
    });
  }
  async function l() {
    const d = r();
    return d ? await d.$toCanvas() : null;
  }
  function u(d) {
    const g = o();
    g && (g.aspectRatio = d ?? NaN);
  }
  function p(d) {
    const g = a();
    g && g.$rotate(`${d}deg`);
  }
  function m() {
    const d = a();
    d && (e = e * -1, d.$scale(e, s));
  }
  function f() {
    const d = a();
    d && (s = s * -1, d.$scale(e, s));
  }
  function A(d) {
    const g = a();
    g && g.$zoom(d);
  }
  function x(d) {
    if (!i.value) return;
    const g = r();
    g && (d ? g.classList.remove("crop-hidden") : g.classList.add("crop-hidden"));
  }
  function y() {
    const d = a(), g = o();
    d && (e = 1, s = 1, d.$resetTransform(), d.$center("contain")), g && g.$reset();
  }
  function $(d) {
    if (!i.value) return;
    const g = a();
    g && (e = 1, s = 1, g.src = d, g.$resetTransform(), g.$center("contain"));
  }
  function C() {
    i.value && (i.value.destroy?.(), i.value = null, t.value = !1);
  }
  return ss(() => {
    C();
  }), {
    cropperInstance: i,
    isReady: t,
    initCropper: n,
    getCroppedCanvas: h,
    applyCrop: c,
    getFullCanvas: l,
    getCropperSelection: o,
    getCropperImage: a,
    getCropperCanvas: r,
    setAspectRatio: u,
    setCropVisible: x,
    rotate: p,
    flipHorizontal: m,
    flipVertical: f,
    zoom: A,
    resetTransform: y,
    replaceImage: $,
    destroy: C
  };
}
const an = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center z-10"
}, rn = ["src"], cn = {
  __name: "EditorCanvas",
  props: {
    imageUrl: String,
    filterCss: { type: String, default: "none" },
    cropAspectRatio: { type: Number, default: null },
    canvasMode: { type: String, default: "move" },
    config: { type: Object, default: () => ({}) }
  },
  emits: ["ready"],
  setup(i, { expose: t, emit: e }) {
    const s = i, n = e, o = N(null), a = N(null), r = N(!1), {
      initCropper: h,
      getCroppedCanvas: c,
      applyCrop: l,
      getFullCanvas: u,
      getCropperSelection: p,
      getCropperImage: m,
      getCropperCanvas: f,
      setAspectRatio: A,
      setCropVisible: x,
      rotate: y,
      flipHorizontal: $,
      flipVertical: C,
      zoom: d,
      resetTransform: g,
      replaceImage: T,
      destroy: O
    } = on(), v = B(() => {
      switch (s.canvasMode) {
        case "crop":
          return "cursor-crosshair";
        case "zoom":
          return "cursor-zoom-in";
        default:
          return "cursor-grab";
      }
    });
    function w(D) {
      if (s.canvasMode !== "zoom") return;
      const W = m();
      if (!W) return;
      const U = D.altKey ? -0.2 : 0.2;
      W.$zoom(U);
    }
    function M() {
      r.value = !0, Kt(() => {
        P();
      });
    }
    function P() {
      o.value && (h(o.value, {}), Kt(() => {
        x(s.canvasMode === "crop"), s.cropAspectRatio !== null && s.cropAspectRatio !== void 0 && A(s.cropAspectRatio);
      }), n("ready"));
    }
    return Zt(() => s.canvasMode, (D) => {
      x(D === "crop");
    }), Zt(() => s.cropAspectRatio, (D) => {
      A(D);
    }), Zt(() => s.imageUrl, (D) => {
      D && (r.value = !1, T(D), r.value = !0);
    }), t({
      getCroppedCanvas: c,
      applyCrop: l,
      getFullCanvas: u,
      getCropperSelection: p,
      getCropperImage: m,
      getCropperCanvas: f,
      rotate: y,
      flipHorizontal: $,
      flipVertical: C,
      zoom: d,
      resetTransform: g,
      replaceImage: T,
      setCropVisible: x,
      destroy: O
    }), (D, W) => (E(), _(
      "div",
      {
        class: q(["primix-editor-canvas flex-1 relative overflow-hidden bg-surface-900 min-h-[400px]", v.value]),
        onClick: w
      },
      [
        k(" Loading state "),
        r.value ? k("v-if", !0) : (E(), _("div", an, [...W[0] || (W[0] = [
          b(
            "i",
            { class: "pi pi-spin pi-spinner text-3xl text-surface-400" },
            null,
            -1
            /* CACHED */
          )
        ])])),
        k(` Cropper container — no sizing constraints so Cropper.js v2
             can manage the image element at natural dimensions and apply
             its own CSS transform via $center('contain'). `),
        b(
          "div",
          {
            ref_key: "cropperContainerRef",
            ref: a,
            class: "absolute inset-0",
            style: Rt({ filter: i.filterCss })
          },
          [
            b("img", {
              ref_key: "imageRef",
              ref: o,
              src: i.imageUrl,
              crossorigin: "anonymous",
              onLoad: M,
              style: { display: "none" }
            }, null, 40, rn)
          ],
          4
          /* STYLE */
        )
      ],
      2
      /* CLASS */
    ));
  }
}, ln = { class: "space-y-4" }, hn = { class: "text-sm font-medium text-surface-700 dark:text-surface-300" }, un = { class: "grid grid-cols-2 gap-2" }, dn = ["onClick"], fn = { class: "w-4 h-4 flex items-center justify-center" }, pn = { class: "pt-2 border-t border-surface-200 dark:border-surface-700" }, mn = {
  __name: "CropControls",
  props: {
    currentRatio: { type: Number, default: null },
    config: { type: Object, default: () => ({}) },
    translations: { type: Object, default: () => ({}) }
  },
  emits: ["crop-ratio-change", "apply-crop"],
  setup(i) {
    const t = i, e = {
      "1:1": 1,
      "4:3": 4 / 3,
      "3:4": 3 / 4,
      "16:9": 16 / 9,
      "9:16": 9 / 16
    }, s = t.config.crop?.aspectRatios || e;
    function n(a) {
      return a === null && t.currentRatio === null ? !0 : Math.abs((t.currentRatio || 0) - (a || 0)) < 1e-3;
    }
    function o(a) {
      return !a || a === 1 ? { width: "12px", height: "12px" } : a > 1 ? { width: "14px", height: Math.round(14 / a) + "px" } : { width: Math.round(14 * a) + "px", height: "14px" };
    }
    return (a, r) => {
      const h = st("p-button");
      return E(), _("div", ln, [
        b(
          "h4",
          hn,
          I(i.translations.crop_aspect_ratio || "Aspect ratio"),
          1
          /* TEXT */
        ),
        b("div", un, [
          k(" Free crop (always available) "),
          b(
            "button",
            {
              type: "button",
              class: q(["flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors", i.currentRatio === null ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 ring-1 ring-primary-300 dark:ring-primary-700" : "bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600"]),
              onClick: r[0] || (r[0] = (c) => a.$emit("crop-ratio-change", null))
            },
            [
              r[2] || (r[2] = b(
                "i",
                { class: "pi pi-arrows-alt text-xs" },
                null,
                -1
                /* CACHED */
              )),
              b(
                "span",
                null,
                I(i.translations.crop_free || "Free"),
                1
                /* TEXT */
              )
            ],
            2
            /* CLASS */
          ),
          k(" Configured aspect ratios "),
          (E(!0), _(
            ot,
            null,
            Tt(z(s), (c, l) => (E(), _("button", {
              key: l,
              type: "button",
              class: q(["flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors", n(c) ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 ring-1 ring-primary-300 dark:ring-primary-700" : "bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600"]),
              onClick: (u) => a.$emit("crop-ratio-change", c)
            }, [
              b("span", fn, [
                b(
                  "span",
                  {
                    class: "border border-current rounded-sm",
                    style: Rt(o(c))
                  },
                  null,
                  4
                  /* STYLE */
                )
              ]),
              b(
                "span",
                null,
                I(l),
                1
                /* TEXT */
              )
            ], 10, dn))),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        k(" Apply crop button "),
        b("div", pn, [
          H(h, {
            label: i.translations.apply_crop || "Apply crop",
            icon: "pi pi-check",
            class: "w-full",
            size: "small",
            onClick: r[1] || (r[1] = (c) => a.$emit("apply-crop"))
          }, null, 8, ["label"])
        ])
      ]);
    };
  }
}, gn = { class: "space-y-5" }, bn = { class: "space-y-3" }, vn = { class: "text-sm font-medium text-surface-700 dark:text-surface-300" }, $n = { class: "flex items-center gap-2" }, yn = { class: "space-y-1" }, Cn = { class: "flex items-center justify-between" }, xn = { class: "text-xs text-surface-500 dark:text-surface-400" }, wn = { class: "text-xs text-surface-500 dark:text-surface-400 tabular-nums" }, kn = { class: "space-y-3" }, En = { class: "text-sm font-medium text-surface-700 dark:text-surface-300" }, An = { class: "flex items-center gap-2" }, Sn = {
  __name: "TransformControls",
  props: {
    config: { type: Object, default: () => ({}) },
    translations: { type: Object, default: () => ({}) }
  },
  emits: ["rotate", "flip"],
  setup(i, { emit: t }) {
    const e = t, s = N(0), n = N(!1), o = N(!1);
    let a = 0;
    function r() {
      document.activeElement && document.activeElement !== document.body && document.activeElement.blur();
    }
    function h(p) {
      e("rotate", p), r();
    }
    function c(p) {
      const m = p - a;
      a = p, e("rotate", m);
    }
    function l() {
      n.value = !n.value, e("flip", "horizontal"), r();
    }
    function u() {
      o.value = !o.value, e("flip", "vertical"), r();
    }
    return (p, m) => {
      const f = st("p-button"), A = st("p-slider"), x = Qt("tooltip");
      return E(), _("div", gn, [
        k(" Rotation "),
        b("div", bn, [
          b(
            "h4",
            vn,
            I(i.translations.rotation_title || "Rotation"),
            1
            /* TEXT */
          ),
          b("div", $n, [
            tt(H(
              f,
              {
                icon: "pi pi-undo",
                severity: "secondary",
                outlined: "",
                size: "small",
                onClick: m[0] || (m[0] = (y) => h(-90))
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [
                x,
                i.translations.rotate_ccw || "Rotate -90°",
                void 0,
                { bottom: !0 }
              ]
            ]),
            tt(H(
              f,
              {
                icon: "pi pi-replay",
                severity: "secondary",
                outlined: "",
                size: "small",
                onClick: m[1] || (m[1] = (y) => h(90))
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [
                x,
                i.translations.rotate_cw || "Rotate +90°",
                void 0,
                { bottom: !0 }
              ]
            ])
          ]),
          k(" Free rotation slider "),
          b("div", yn, [
            b("div", Cn, [
              b(
                "span",
                xn,
                I(i.translations.free_rotation || "Free rotation"),
                1
                /* TEXT */
              ),
              b(
                "span",
                wn,
                I(s.value) + "°",
                1
                /* TEXT */
              )
            ]),
            H(A, {
              modelValue: s.value,
              "onUpdate:modelValue": [
                m[2] || (m[2] = (y) => s.value = y),
                c
              ],
              min: -45,
              max: 45,
              step: 1,
              class: "w-full"
            }, null, 8, ["modelValue"])
          ])
        ]),
        k(" Flip "),
        b("div", kn, [
          b(
            "h4",
            En,
            I(i.translations.flip_title || "Flip"),
            1
            /* TEXT */
          ),
          b("div", An, [
            tt(H(f, {
              icon: "pi pi-arrows-h",
              severity: "secondary",
              outlined: "",
              size: "small",
              onClick: l,
              class: q({ "ring-2 ring-primary-400": n.value })
            }, null, 8, ["class"]), [
              [
                x,
                i.translations.flip_horizontal || "Flip horizontal",
                void 0,
                { bottom: !0 }
              ]
            ]),
            tt(H(f, {
              icon: "pi pi-arrows-v",
              severity: "secondary",
              outlined: "",
              size: "small",
              onClick: u,
              class: q({ "ring-2 ring-primary-400": o.value })
            }, null, 8, ["class"]), [
              [
                x,
                i.translations.flip_vertical || "Flip vertical",
                void 0,
                { bottom: !0 }
              ]
            ])
          ])
        ])
      ]);
    };
  }
}, Tn = { class: "space-y-4" }, Rn = { class: "flex items-center justify-between" }, _n = { class: "text-sm font-medium text-surface-700 dark:text-surface-300" }, On = { class: "space-y-4" }, In = { class: "flex items-center justify-between" }, Mn = { class: "text-xs text-surface-600 dark:text-surface-400 flex items-center gap-1.5" }, zn = { class: "text-xs text-surface-500 dark:text-surface-400 tabular-nums w-10 text-right" }, Nn = {
  __name: "AdjustmentControls",
  props: {
    adjustments: { type: Object, required: !0 },
    hasChanges: Boolean,
    translations: { type: Object, default: () => ({}) }
  },
  emits: ["adjustment-change", "reset"],
  setup(i, { emit: t }) {
    const e = t;
    function s(o, a) {
      e("adjustment-change", { key: o, value: a });
    }
    function n(o, a) {
      return o === "hue" ? `${a}°` : o === "blur" ? `${a}px` : o === "sharpen" ? `${a}%` : a > 0 ? `+${a}` : `${a}`;
    }
    return (o, a) => {
      const r = st("p-button"), h = st("p-slider");
      return E(), _("div", Tn, [
        b("div", Rn, [
          b(
            "h4",
            _n,
            I(i.translations.tool_adjustments || "Adjustments"),
            1
            /* TEXT */
          ),
          i.hasChanges ? (E(), it(r, {
            key: 0,
            label: "Reset",
            severity: "secondary",
            text: "",
            size: "small",
            onClick: a[0] || (a[0] = (c) => o.$emit("reset"))
          })) : k("v-if", !0)
        ]),
        b("div", On, [
          (E(!0), _(
            ot,
            null,
            Tt(z(Xe), (c, l) => (E(), _("div", {
              key: l,
              class: "space-y-1"
            }, [
              b("div", In, [
                b("label", Mn, [
                  b(
                    "i",
                    {
                      class: q(["pi " + c.icon, "text-[10px]"])
                    },
                    null,
                    2
                    /* CLASS */
                  ),
                  te(
                    " " + I(c.label),
                    1
                    /* TEXT */
                  )
                ]),
                b(
                  "span",
                  zn,
                  I(n(l, i.adjustments[l])),
                  1
                  /* TEXT */
                )
              ]),
              H(h, {
                modelValue: i.adjustments[l],
                "onUpdate:modelValue": (u) => s(l, u),
                min: c.min,
                max: c.max,
                step: c.step,
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max", "step"])
            ]))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]);
    };
  }
}, Pn = { class: "space-y-4" }, jn = { class: "grid grid-cols-3 gap-2" }, Dn = ["onClick"], Fn = { class: "w-14 h-14 rounded-md overflow-hidden bg-surface-200 dark:bg-surface-600" }, Ln = ["src"], Un = {
  key: 1,
  class: "w-full h-full flex items-center justify-center"
}, Hn = {
  __name: "FilterControls",
  props: {
    activeFilter: { type: String, default: null },
    thumbnailUrl: { type: String, default: null }
  },
  emits: ["filter-change"],
  setup(i) {
    const t = i;
    function e(s) {
      return s === "original" && !t.activeFilter ? !0 : t.activeFilter === s;
    }
    return (s, n) => (E(), _("div", Pn, [
      n[1] || (n[1] = b(
        "h4",
        { class: "text-sm font-medium text-surface-700 dark:text-surface-300" },
        "Filtri",
        -1
        /* CACHED */
      )),
      b("div", jn, [
        (E(!0), _(
          ot,
          null,
          Tt(z(Vt), (o) => (E(), _("button", {
            key: o.id,
            type: "button",
            class: q(["group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors", e(o.id) ? "bg-primary-100 dark:bg-primary-900/30 ring-1 ring-primary-300 dark:ring-primary-700" : "hover:bg-surface-100 dark:hover:bg-surface-700"]),
            onClick: (a) => s.$emit("filter-change", o.id)
          }, [
            k(" Filter thumbnail preview "),
            b("div", Fn, [
              i.thumbnailUrl ? (E(), _("img", {
                key: 0,
                src: i.thumbnailUrl,
                class: "w-full h-full object-cover",
                style: Rt({ filter: o.css || "none" })
              }, null, 12, Ln)) : (E(), _("div", Un, [...n[0] || (n[0] = [
                b(
                  "i",
                  { class: "pi pi-image text-surface-400 text-xs" },
                  null,
                  -1
                  /* CACHED */
                )
              ])]))
            ]),
            k(" Filter label "),
            b(
              "span",
              {
                class: q(["text-[10px] leading-tight text-center truncate w-full", e(o.id) ? "text-primary-700 dark:text-primary-300 font-medium" : "text-surface-500 dark:text-surface-400"])
              },
              I(o.label),
              3
              /* TEXT, CLASS */
            )
          ], 10, Dn))),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]));
  }
}, Wn = { class: "space-y-4" }, Xn = { class: "text-sm font-medium text-surface-700 dark:text-surface-300" }, Yn = { class: "space-y-2" }, Bn = ["disabled", "onClick"], Zn = {
  key: 0,
  class: "pi pi-spin pi-spinner text-primary-500"
}, qn = { class: "flex-1 text-left" }, Kn = { class: "font-medium" }, Vn = { class: "text-xs text-surface-500 dark:text-surface-400" }, Gn = {
  key: 0,
  class: "space-y-1"
}, Jn = { class: "w-full bg-surface-200 dark:bg-surface-700 rounded-full h-1.5" }, Qn = { class: "text-xs text-surface-500 dark:text-surface-400 text-center" }, ti = {
  key: 1,
  class: "text-xs text-surface-500 dark:text-surface-400 text-center py-2"
}, ei = {
  key: 2,
  class: "text-sm text-surface-400 dark:text-surface-500 text-center py-4"
}, si = {
  __name: "AiControls",
  props: {
    features: { type: Array, default: () => [] },
    processing: { type: String, default: null },
    progress: { type: Number, default: 0 },
    translations: { type: Object, default: () => ({}) }
  },
  emits: ["ai-action"],
  setup(i) {
    const t = i, e = B(() => {
      const s = {
        "background-removal": {
          id: "background-removal",
          label: t.translations.bg_removal_label || "Remove background",
          description: t.translations.bg_removal_desc || "Removes the background directly in the browser",
          icon: "pi-eraser"
        },
        "auto-enhance": {
          id: "auto-enhance",
          label: t.translations.auto_enhance_label || "Auto enhance",
          description: t.translations.auto_enhance_desc || "Optimizes brightness, contrast and sharpness",
          icon: "pi-sparkles"
        }
      };
      return t.features.map((n) => s[n]).filter(Boolean);
    });
    return (s, n) => (E(), _("div", Wn, [
      b(
        "h4",
        Xn,
        I(i.translations.ai_tools_title || "AI Tools"),
        1
        /* TEXT */
      ),
      b("div", Yn, [
        (E(!0), _(
          ot,
          null,
          Tt(e.value, (o) => (E(), _("button", {
            key: o.id,
            type: "button",
            class: "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300 disabled:opacity-50 disabled:cursor-not-allowed",
            disabled: i.processing !== null,
            onClick: (a) => s.$emit("ai-action", o.id)
          }, [
            k(" Loading indicator when processing this feature "),
            i.processing === o.id ? (E(), _("i", Zn)) : (E(), _(
              "i",
              {
                key: 1,
                class: q(["pi " + o.icon, "text-primary-500"])
              },
              null,
              2
              /* CLASS */
            )),
            b("div", qn, [
              b(
                "div",
                Kn,
                I(o.label),
                1
                /* TEXT */
              ),
              b(
                "div",
                Vn,
                I(o.description),
                1
                /* TEXT */
              )
            ])
          ], 8, Bn))),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      k(" Progress bar during processing "),
      i.processing !== null && i.progress > 0 ? (E(), _("div", Gn, [
        b("div", Jn, [
          b(
            "div",
            {
              class: "bg-primary-500 h-1.5 rounded-full transition-all duration-300",
              style: Rt({ width: i.progress + "%" })
            },
            null,
            4
            /* STYLE */
          )
        ]),
        b(
          "p",
          Qn,
          I(i.translations.processing || "Processing...") + " " + I(i.progress) + "% ",
          1
          /* TEXT */
        )
      ])) : k("v-if", !0),
      i.processing !== null && i.progress === 0 ? (E(), _("div", ti, [
        n[0] || (n[0] = b(
          "i",
          { class: "pi pi-spin pi-spinner mr-1" },
          null,
          -1
          /* CACHED */
        )),
        te(
          " " + I(i.translations.loading_model || "Loading model..."),
          1
          /* TEXT */
        )
      ])) : k("v-if", !0),
      e.value.length === 0 ? (E(), _(
        "div",
        ei,
        I(i.translations.no_ai_configured || "No AI features configured"),
        1
        /* TEXT */
      )) : k("v-if", !0)
    ]));
  }
}, ni = { class: "primix-editor-sidebar w-72 flex-shrink-0 border-l border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 flex flex-col" }, ii = { class: "flex-1 overflow-y-auto p-4" }, oi = {
  key: 0,
  class: "space-y-3"
}, ai = { class: "text-sm font-medium text-surface-700 dark:text-surface-300" }, ri = { class: "text-xs text-surface-500 dark:text-surface-400 leading-relaxed" }, ci = { class: "text-xs text-surface-500 dark:text-surface-400 leading-relaxed" }, li = {
  key: 2,
  class: "space-y-3"
}, hi = { class: "text-sm font-medium text-surface-700 dark:text-surface-300" }, ui = { class: "text-xs text-surface-500 dark:text-surface-400 leading-relaxed" }, di = { class: "text-xs text-surface-500 dark:text-surface-400 leading-relaxed" }, fi = { class: "text-xs text-surface-500 dark:text-surface-400 leading-relaxed" }, pi = {
  __name: "EditorSidebar",
  props: {
    activeTool: { type: String, required: !0 },
    config: { type: Object, default: () => ({}) },
    adjustments: { type: Object, required: !0 },
    activeFilter: { type: String, default: null },
    hasAdjustmentChanges: Boolean,
    aiProcessing: { type: String, default: null },
    aiProgress: { type: Number, default: 0 },
    thumbnailUrl: { type: String, default: null },
    cropAspectRatio: { type: Number, default: null },
    translations: { type: Object, default: () => ({}) }
  },
  emits: [
    "crop-ratio-change",
    "apply-crop",
    "rotate",
    "flip",
    "adjustment-change",
    "reset-adjustments",
    "filter-change",
    "ai-action"
  ],
  setup(i) {
    return (t, e) => (E(), _("div", ni, [
      k(" Tool-specific controls "),
      b("div", ii, [
        k(" Move mode info "),
        i.activeTool === "move" ? (E(), _("div", oi, [
          b(
            "h4",
            ai,
            I(i.translations.move_title || "Move"),
            1
            /* TEXT */
          ),
          b(
            "p",
            ri,
            I(i.translations.drag_to_move || "Drag to move the image."),
            1
            /* TEXT */
          ),
          b(
            "p",
            ci,
            I(i.translations.mouse_wheel_zoom || "Use the mouse wheel to zoom."),
            1
            /* TEXT */
          )
        ])) : k("v-if", !0),
        k(" Crop controls "),
        i.activeTool === "crop" ? (E(), it(mn, {
          key: 1,
          "current-ratio": i.cropAspectRatio,
          config: i.config,
          translations: i.translations,
          onCropRatioChange: e[0] || (e[0] = (s) => t.$emit("crop-ratio-change", s)),
          onApplyCrop: e[1] || (e[1] = (s) => t.$emit("apply-crop"))
        }, null, 8, ["current-ratio", "config", "translations"])) : k("v-if", !0),
        k(" Zoom mode info "),
        i.activeTool === "zoom" ? (E(), _("div", li, [
          b(
            "h4",
            hi,
            I(i.translations.zoom_title || "Zoom"),
            1
            /* TEXT */
          ),
          b(
            "p",
            ui,
            I(i.translations.click_to_zoom_in || "Click on the image to zoom in."),
            1
            /* TEXT */
          ),
          b("p", di, [
            e[8] || (e[8] = b(
              "kbd",
              { class: "px-1 py-0.5 bg-surface-100 dark:bg-surface-700 rounded text-[10px]" },
              "Alt",
              -1
              /* CACHED */
            )),
            te(
              " + " + I(i.translations.alt_click_zoom_out || "Click to zoom out."),
              1
              /* TEXT */
            )
          ]),
          b(
            "p",
            fi,
            I(i.translations.mouse_wheel_continuous || "Mouse wheel for continuous zoom."),
            1
            /* TEXT */
          )
        ])) : k("v-if", !0),
        k(" Transform controls "),
        i.activeTool === "transform" ? (E(), it(Sn, {
          key: 3,
          config: i.config,
          translations: i.translations,
          onRotate: e[2] || (e[2] = (s) => t.$emit("rotate", s)),
          onFlip: e[3] || (e[3] = (s) => t.$emit("flip", s))
        }, null, 8, ["config", "translations"])) : k("v-if", !0),
        k(" Adjustment controls "),
        i.activeTool === "adjustments" ? (E(), it(Nn, {
          key: 4,
          adjustments: i.adjustments,
          "has-changes": i.hasAdjustmentChanges,
          translations: i.translations,
          onAdjustmentChange: e[4] || (e[4] = (s) => t.$emit("adjustment-change", s)),
          onReset: e[5] || (e[5] = (s) => t.$emit("reset-adjustments"))
        }, null, 8, ["adjustments", "has-changes", "translations"])) : k("v-if", !0),
        k(" Filter controls "),
        i.activeTool === "filters" ? (E(), it(Hn, {
          key: 5,
          "active-filter": i.activeFilter,
          "thumbnail-url": i.thumbnailUrl,
          onFilterChange: e[6] || (e[6] = (s) => t.$emit("filter-change", s))
        }, null, 8, ["active-filter", "thumbnail-url"])) : k("v-if", !0),
        k(" AI controls "),
        i.activeTool === "ai" ? (E(), it(si, {
          key: 6,
          features: i.config.ai?.features || [],
          processing: i.aiProcessing,
          progress: i.aiProgress,
          translations: i.translations,
          onAiAction: e[7] || (e[7] = (s) => t.$emit("ai-action", s))
        }, null, 8, ["features", "processing", "progress", "translations"])) : k("v-if", !0)
      ])
    ]));
  }
}, mi = {
  class: "primix-image-editor flex flex-col",
  style: { height: "70vh" }
}, gi = { class: "flex flex-1 overflow-hidden" }, bi = { class: "flex items-center justify-end gap-2" }, $i = {
  __name: "ImageEditor",
  props: {
    config: { type: Object, default: () => ({}) },
    statePath: { type: String, required: !0 },
    translations: { type: Object, default: () => ({}) }
  },
  emits: ["save", "close"],
  setup(i, { expose: t, emit: e }) {
    const s = i, n = e, o = N(!1), a = N(null), r = N(null), h = N("edited-image.png"), c = N(null), {
      activeTool: l,
      setActiveTool: u,
      adjustments: p,
      setAdjustment: m,
      resetAdjustments: f,
      hasAdjustmentChanges: A,
      activeFilter: x,
      setFilter: y,
      getActiveFilterCss: $,
      cropAspectRatio: C,
      setCropAspectRatio: d,
      zoomLevel: g,
      setZoomLevel: T,
      canUndo: O,
      canRedo: v,
      undo: w,
      redo: M,
      pushHistory: P,
      resetHistory: D,
      liveFilterCss: W,
      processing: U,
      resetAll: ct
    } = os(s.config), {
      processing: xt,
      progress: lt,
      processFeature: ht
    } = as(), j = B(() => ["move", "crop", "zoom"].includes(l.value) ? l.value : "move"), G = B(() => ({
      sm: "400px",
      md: "500px",
      lg: "700px",
      xl: "900px",
      "2xl": "1100px",
      "3xl": "1300px",
      "4xl": "1500px",
      "5xl": "90vw"
    })[s.config.modal?.width] || "90vw"), J = B(() => {
      const R = C.value;
      return R == null ? null : typeof R == "number" ? R : null;
    });
    function ut(R, X = null, Pt = null) {
      a.value = R, r.value = X, h.value = Pt || "edited-image.png", o.value = !0, Kt(() => {
        ct();
      });
    }
    function dt() {
      D();
    }
    function wt() {
      o.value = !1, n("close");
    }
    function _t() {
      ct(), c.value && c.value.resetTransform();
    }
    function Ot(R) {
      d(R);
    }
    async function It() {
      if (c.value) {
        U.value = !0;
        try {
          const R = await c.value.applyCrop();
          R && (a.value = R, c.value.replaceImage(R), P(), u("move"));
        } catch (R) {
          console.error("Apply crop failed:", R);
        } finally {
          U.value = !1;
        }
      }
    }
    function Mt(R) {
      c.value && (c.value.rotate(R), P());
    }
    function zt(R) {
      c.value && (R === "horizontal" ? c.value.flipHorizontal() : c.value.flipVertical(), P());
    }
    function ft() {
      c.value && (c.value.zoom(0.1), T(g.value + 10));
    }
    function pt() {
      c.value && (c.value.zoom(-0.1), T(Math.max(10, g.value - 10)));
    }
    function mt({ key: R, value: X }) {
      m(R, X);
    }
    function de(R) {
      y(R);
    }
    async function Bt(R) {
      try {
        const X = await ht(R, a.value);
        X && (a.value = X, c.value && c.value.replaceImage(X), P());
      } catch (X) {
        console.error("AI processing failed:", X);
      }
    }
    async function Nt() {
      if (c.value) {
        U.value = !0;
        try {
          const R = await c.value.getFullCanvas();
          if (!R) {
            console.error("Failed to get canvas");
            return;
          }
          const X = await ds(R, {
            adjustments: { ...p },
            filterCss: $(),
            outputFormat: s.config.output?.format || "original",
            outputQuality: s.config.output?.quality || 0.92,
            maxWidth: s.config.output?.maxWidth,
            maxHeight: s.config.output?.maxHeight,
            originalName: h.value
          });
          n("save", { file: X, fileIndex: r.value }), o.value = !1;
        } catch (R) {
          console.error("Image export failed:", R);
        } finally {
          U.value = !1;
        }
      }
    }
    return t({ open: ut }), (R, X) => {
      const Pt = st("p-button"), Qe = st("p-dialog");
      return E(), it(Qe, {
        visible: o.value,
        "onUpdate:visible": X[0] || (X[0] = (ts) => o.value = ts),
        modal: "",
        header: i.config.modal?.heading || i.translations.edit_image || "Edit image",
        style: Rt({ width: G.value }),
        closable: !z(U),
        closeOnEscape: !z(U),
        draggable: !1,
        pt: {
          content: { class: "p-0" },
          header: { class: "border-b border-surface-200 dark:border-surface-700" },
          footer: { class: "border-t border-surface-200 dark:border-surface-700" }
        },
        onHide: wt
      }, {
        footer: fe(() => [
          b("div", bi, [
            H(Pt, {
              label: i.translations.cancel || "Cancel",
              severity: "secondary",
              onClick: wt,
              disabled: z(U)
            }, null, 8, ["label", "disabled"]),
            H(Pt, {
              label: i.translations.apply || "Apply",
              icon: "pi pi-check",
              onClick: Nt,
              loading: z(U)
            }, null, 8, ["label", "loading"])
          ])
        ]),
        default: fe(() => [
          b("div", mi, [
            k(" Top toolbar (undo/redo/reset/zoom) "),
            H(bs, {
              "can-undo": z(O),
              "can-redo": z(v),
              "zoom-level": z(g),
              processing: z(U),
              onUndo: z(w),
              onRedo: z(M),
              onReset: _t,
              onZoomIn: ft,
              onZoomOut: pt
            }, null, 8, ["can-undo", "can-redo", "zoom-level", "processing", "onUndo", "onRedo"]),
            k(" Body: Tool Panel + Canvas + Sidebar "),
            b("div", gi, [
              k(" Left tool panel (Photoshop-style) "),
              H(Cs, {
                "active-tool": z(l),
                config: i.config,
                translations: i.translations,
                onToolChange: z(u)
              }, null, 8, ["active-tool", "config", "translations", "onToolChange"]),
              k(" Canvas area "),
              H(cn, {
                ref_key: "canvasRef",
                ref: c,
                "image-url": a.value,
                "filter-css": z(W),
                "crop-aspect-ratio": J.value,
                "canvas-mode": j.value,
                config: i.config,
                onReady: dt
              }, null, 8, ["image-url", "filter-css", "crop-aspect-ratio", "canvas-mode", "config"]),
              k(" Right sidebar (context-sensitive controls) "),
              H(pi, {
                "active-tool": z(l),
                config: i.config,
                adjustments: z(p),
                "active-filter": z(x),
                "has-adjustment-changes": z(A),
                "ai-processing": z(xt),
                "ai-progress": z(lt),
                "thumbnail-url": a.value,
                "crop-aspect-ratio": J.value,
                translations: i.translations,
                onCropRatioChange: Ot,
                onApplyCrop: It,
                onRotate: Mt,
                onFlip: zt,
                onAdjustmentChange: mt,
                onResetAdjustments: z(f),
                onFilterChange: de,
                onAiAction: Bt
              }, null, 8, ["active-tool", "config", "adjustments", "active-filter", "has-adjustment-changes", "ai-processing", "ai-progress", "thumbnail-url", "crop-aspect-ratio", "translations", "onResetAdjustments"])
            ])
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["visible", "header", "style", "closable", "closeOnEscape"]);
    };
  }
};
export {
  $i as default
};
//# sourceMappingURL=ImageEditor-DNpUToEj.js.map
