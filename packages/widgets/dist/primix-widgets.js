import gs from "livue";
import { e as ms } from "../support/chunks/primix-D3w9RuwV.js";
import { s as xe, f as Ge } from "../support/chunks/index-CoIgDweF.js";
import { B as Ke } from "../support/chunks/index-uMyjrk0Z.js";
import { openBlock as B, createElementBlock as V, mergeProps as j, createElementVNode as Xe, Fragment as Pi, renderList as Oi, renderSlot as ft, normalizeClass as Di, toDisplayString as Ne, resolveComponent as bs, createVNode as un, createCommentVNode as At, createTextVNode as _s, ref as ys, onMounted as xs, watch as vs, onBeforeUnmount as ks, normalizeStyle as ws } from "vue";
var Ms = {
  root: {
    position: "relative"
  }
}, Ss = {
  root: "p-chart"
}, Ps = Ke.extend({
  name: "chart",
  classes: Ss,
  inlineStyles: Ms
}), Os = {
  name: "BaseChart",
  extends: xe,
  props: {
    type: String,
    data: null,
    options: null,
    plugins: null,
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 150
    },
    canvasProps: {
      type: null,
      default: null
    }
  },
  style: Ps,
  provide: function() {
    return {
      $pcChart: this,
      $parentInstance: this
    };
  }
}, Ci = {
  name: "Chart",
  extends: Os,
  inheritAttrs: !1,
  emits: ["select", "loaded"],
  chart: null,
  watch: {
    /*
     * Use deep watch to enable triggering watch for changes within structure
     * otherwise the entire data object needs to be replaced to trigger watch
     */
    data: {
      handler: function() {
        this.reinit();
      },
      deep: !0
    },
    type: function() {
      this.reinit();
    },
    options: function() {
      this.reinit();
    }
  },
  mounted: function() {
    this.initChart();
  },
  beforeUnmount: function() {
    this.chart && (this.chart.destroy(), this.chart = null);
  },
  methods: {
    initChart: function() {
      var t = this;
      import("../support/chunks/auto-CrB1VfOs.js").then(function(n) {
        t.chart && (t.chart.destroy(), t.chart = null), n && n.default && (t.chart = new n.default(t.$refs.canvas, {
          type: t.type,
          data: t.data,
          options: t.options,
          plugins: t.plugins
        })), t.$emit("loaded", t.chart);
      });
    },
    getCanvas: function() {
      return this.$canvas;
    },
    getChart: function() {
      return this.chart;
    },
    getBase64Image: function() {
      return this.chart.toBase64Image();
    },
    refresh: function() {
      this.chart && this.chart.update();
    },
    reinit: function() {
      this.initChart();
    },
    onCanvasClick: function(t) {
      if (this.chart) {
        var n = this.chart.getElementsAtEventForMode(t, "nearest", {
          intersect: !0
        }, !1), i = this.chart.getElementsAtEventForMode(t, "dataset", {
          intersect: !0
        }, !1);
        n && n[0] && i && this.$emit("select", {
          originalEvent: t,
          element: n[0],
          dataset: i
        });
      }
    },
    generateLegend: function() {
      if (this.chart)
        return this.chart.generateLegend();
    }
  }
};
function Vt(e) {
  "@babel/helpers - typeof";
  return Vt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Vt(e);
}
function dn(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    t && (i = i.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function fn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dn(Object(n), !0).forEach(function(i) {
      Ds(e, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : dn(Object(n)).forEach(function(i) {
      Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return e;
}
function Ds(e, t, n) {
  return (t = Cs(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function Cs(e) {
  var t = Ts(e, "string");
  return Vt(t) == "symbol" ? t : t + "";
}
function Ts(e, t) {
  if (Vt(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(e, t);
    if (Vt(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Is = ["width", "height"];
function Ls(e, t, n, i, s, o) {
  return B(), V("div", j({
    class: e.cx("root"),
    style: e.sx("root")
  }, e.ptmi("root")), [Xe("canvas", j({
    ref: "canvas",
    width: e.width,
    height: e.height,
    onClick: t[0] || (t[0] = function(r) {
      return o.onCanvasClick(r);
    })
  }, fn(fn({}, e.canvasProps), e.ptm("canvas"))), null, 16, Is)], 16);
}
Ci.render = Ls;
var Es = `
    .p-metergroup {
        display: flex;
        gap: dt('metergroup.gap');
    }

    .p-metergroup-meters {
        display: flex;
        background: dt('metergroup.meters.background');
        border-radius: dt('metergroup.border.radius');
    }

    .p-metergroup-label-list {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    .p-metergroup-label {
        display: inline-flex;
        align-items: center;
        gap: dt('metergroup.label.gap');
    }

    .p-metergroup-label-marker {
        display: inline-flex;
        width: dt('metergroup.label.marker.size');
        height: dt('metergroup.label.marker.size');
        border-radius: 100%;
    }

    .p-metergroup-label-icon {
        font-size: dt('metergroup.label.icon.size');
        width: dt('metergroup.label.icon.size');
        height: dt('metergroup.label.icon.size');
    }

    .p-metergroup-horizontal {
        flex-direction: column;
    }

    .p-metergroup-label-list-horizontal {
        gap: dt('metergroup.label.list.horizontal.gap');
    }

    .p-metergroup-horizontal .p-metergroup-meters {
        height: dt('metergroup.meters.size');
    }

    .p-metergroup-horizontal .p-metergroup-meter:first-of-type {
        border-start-start-radius: dt('metergroup.border.radius');
        border-end-start-radius: dt('metergroup.border.radius');
    }

    .p-metergroup-horizontal .p-metergroup-meter:last-of-type {
        border-start-end-radius: dt('metergroup.border.radius');
        border-end-end-radius: dt('metergroup.border.radius');
    }

    .p-metergroup-vertical {
        flex-direction: row;
    }

    .p-metergroup-label-list-vertical {
        flex-direction: column;
        gap: dt('metergroup.label.list.vertical.gap');
    }

    .p-metergroup-vertical .p-metergroup-meters {
        flex-direction: column;
        width: dt('metergroup.meters.size');
        height: 100%;
    }

    .p-metergroup-vertical .p-metergroup-label-list {
        align-items: flex-start;
    }

    .p-metergroup-vertical .p-metergroup-meter:first-of-type {
        border-start-start-radius: dt('metergroup.border.radius');
        border-start-end-radius: dt('metergroup.border.radius');
    }

    .p-metergroup-vertical .p-metergroup-meter:last-of-type {
        border-end-start-radius: dt('metergroup.border.radius');
        border-end-end-radius: dt('metergroup.border.radius');
    }
`, zs = {
  root: function(t) {
    var n = t.props;
    return ["p-metergroup p-component", {
      "p-metergroup-horizontal": n.orientation === "horizontal",
      "p-metergroup-vertical": n.orientation === "vertical"
    }];
  },
  meters: "p-metergroup-meters",
  meter: "p-metergroup-meter",
  labelList: function(t) {
    var n = t.props;
    return ["p-metergroup-label-list", {
      "p-metergroup-label-list-vertical": n.labelOrientation === "vertical",
      "p-metergroup-label-list-horizontal": n.labelOrientation === "horizontal"
    }];
  },
  label: "p-metergroup-label",
  labelIcon: "p-metergroup-label-icon",
  labelMarker: "p-metergroup-label-marker",
  labelText: "p-metergroup-label-text"
}, As = Ke.extend({
  name: "metergroup",
  style: Es,
  classes: zs
}), Fs = {
  name: "MeterGroup",
  extends: xe,
  props: {
    value: {
      type: Array,
      default: null
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    orientation: {
      type: String,
      default: "horizontal"
    },
    labelPosition: {
      type: String,
      default: "end"
    },
    labelOrientation: {
      type: String,
      default: "horizontal"
    }
  },
  style: As,
  provide: function() {
    return {
      $pcMeterGroup: this,
      $parentInstance: this
    };
  }
};
function jt(e) {
  "@babel/helpers - typeof";
  return jt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, jt(e);
}
function Rs(e, t, n) {
  return (t = Ns(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function Ns(e) {
  var t = Bs(e, "string");
  return jt(t) == "symbol" ? t : t + "";
}
function Bs(e, t) {
  if (jt(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(e, t);
    if (jt(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ti = {
  name: "MeterGroupLabel",
  hostName: "MeterGroup",
  extends: xe,
  inheritAttrs: !1,
  inject: ["$pcMeterGroup"],
  props: {
    value: {
      type: Array,
      default: null
    },
    labelPosition: {
      type: String,
      default: "end"
    },
    labelOrientation: {
      type: String,
      default: "horizontal"
    }
  },
  computed: {
    dataP: function() {
      return Ge(Rs({}, this.$pcMeterGroup.labelOrientation, this.$pcMeterGroup.labelOrientation));
    }
  }
}, Vs = ["data-p"];
function js(e, t, n, i, s, o) {
  return B(), V("ol", j({
    class: e.cx("labelList"),
    "data-p": o.dataP
  }, e.ptm("labelList")), [(B(!0), V(Pi, null, Oi(n.value, function(r, a) {
    return B(), V("li", j({
      key: a + "_label",
      class: e.cx("label")
    }, {
      ref_for: !0
    }, e.ptm("label")), [ft(e.$slots, "icon", {
      value: r,
      class: Di(e.cx("labelIcon"))
    }, function() {
      return [r.icon ? (B(), V("i", j({
        key: 0,
        class: [r.icon, e.cx("labelIcon")],
        style: {
          color: r.color
        }
      }, {
        ref_for: !0
      }, e.ptm("labelIcon")), null, 16)) : (B(), V("span", j({
        key: 1,
        class: e.cx("labelMarker"),
        style: {
          backgroundColor: r.color
        }
      }, {
        ref_for: !0
      }, e.ptm("labelMarker")), null, 16))];
    }), Xe("span", j({
      class: e.cx("labelText")
    }, {
      ref_for: !0
    }, e.ptm("labelText")), Ne(r.label) + " (" + Ne(e.$parentInstance.percentValue(r.value)) + ")", 17)], 16);
  }), 128))], 16, Vs);
}
Ti.render = js;
function $t(e) {
  "@babel/helpers - typeof";
  return $t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, $t(e);
}
function $s(e, t, n) {
  return (t = Hs(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function Hs(e) {
  var t = Ws(e, "string");
  return $t(t) == "symbol" ? t : t + "";
}
function Ws(e, t) {
  if ($t(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(e, t);
    if ($t(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ii = {
  name: "MeterGroup",
  extends: Fs,
  inheritAttrs: !1,
  methods: {
    getPTOptions: function(t, n, i) {
      return this.ptm(t, {
        context: {
          value: n,
          index: i
        }
      });
    },
    percent: function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, n = (t - this.min) / (this.max - this.min) * 100;
      return Math.max(0, Math.min(100, n));
    },
    roundedPercent: function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      return Math.round(this.percent(t));
    },
    percentValue: function(t) {
      return this.roundedPercent(t) + "%";
    },
    meterCalculatedStyles: function(t) {
      return {
        backgroundColor: t.color,
        width: this.orientation === "horizontal" && this.percent(t.value) + "%",
        height: this.orientation === "vertical" && this.percent(t.value) + "%"
      };
    }
  },
  computed: {
    totalPercent: function() {
      return this.roundedPercent(this.value.reduce(function(t, n) {
        return t + n.value;
      }, 0));
    },
    percentages: function() {
      var t = 0, n = [];
      return this.value.forEach(function(i) {
        t += i.value, n.push(t);
      }), n;
    },
    dataP: function() {
      return Ge($s({}, this.orientation, this.orientation));
    }
  },
  components: {
    MeterGroupLabel: Ti
  }
}, Us = ["aria-valuemin", "aria-valuemax", "aria-valuenow", "data-p"], Ys = ["data-p"], Gs = ["data-p"];
function Ks(e, t, n, i, s, o) {
  var r = bs("MeterGroupLabel");
  return B(), V("div", j({
    class: e.cx("root"),
    role: "meter",
    "aria-valuemin": e.min,
    "aria-valuemax": e.max,
    "aria-valuenow": o.totalPercent,
    "data-p": o.dataP
  }, e.ptmi("root")), [e.labelPosition === "start" ? ft(e.$slots, "label", {
    key: 0,
    value: e.value,
    totalPercent: o.totalPercent,
    percentages: o.percentages
  }, function() {
    return [un(r, {
      value: e.value,
      labelPosition: e.labelPosition,
      labelOrientation: e.labelOrientation,
      unstyled: e.unstyled,
      pt: e.pt
    }, null, 8, ["value", "labelPosition", "labelOrientation", "unstyled", "pt"])];
  }) : At("", !0), ft(e.$slots, "start", {
    value: e.value,
    totalPercent: o.totalPercent,
    percentages: o.percentages
  }), Xe("div", j({
    class: e.cx("meters"),
    "data-p": o.dataP
  }, e.ptm("meters")), [(B(!0), V(Pi, null, Oi(e.value, function(a, l) {
    return ft(e.$slots, "meter", {
      key: l,
      value: a,
      index: l,
      class: Di(e.cx("meter")),
      orientation: e.orientation,
      size: o.percentValue(a.value),
      totalPercent: o.totalPercent
    }, function() {
      return [o.roundedPercent(a.value) ? (B(), V("span", j({
        key: 0,
        class: e.cx("meter"),
        style: o.meterCalculatedStyles(a),
        "data-p": o.dataP
      }, {
        ref_for: !0
      }, o.getPTOptions("meter", a, l)), null, 16, Gs)) : At("", !0)];
    });
  }), 128))], 16, Ys), ft(e.$slots, "end", {
    value: e.value,
    totalPercent: o.totalPercent,
    percentages: o.percentages
  }), e.labelPosition === "end" ? ft(e.$slots, "label", {
    key: 1,
    value: e.value,
    totalPercent: o.totalPercent,
    percentages: o.percentages
  }, function() {
    return [un(r, {
      value: e.value,
      labelPosition: e.labelPosition,
      labelOrientation: e.labelOrientation,
      unstyled: e.unstyled,
      pt: e.pt
    }, null, 8, ["value", "labelPosition", "labelOrientation", "unstyled", "pt"])];
  }) : At("", !0)], 16, Us);
}
Ii.render = Ks;
var Xs = `
    .p-progressbar {
        display: block;
        position: relative;
        overflow: hidden;
        height: dt('progressbar.height');
        background: dt('progressbar.background');
        border-radius: dt('progressbar.border.radius');
    }

    .p-progressbar-value {
        margin: 0;
        background: dt('progressbar.value.background');
    }

    .p-progressbar-label {
        color: dt('progressbar.label.color');
        font-size: dt('progressbar.label.font.size');
        font-weight: dt('progressbar.label.font.weight');
    }

    .p-progressbar-determinate .p-progressbar-value {
        height: 100%;
        width: 0%;
        position: absolute;
        display: none;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: width 1s ease-in-out;
    }

    .p-progressbar-determinate .p-progressbar-label {
        display: inline-flex;
    }

    .p-progressbar-indeterminate .p-progressbar-value::before {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .p-progressbar-indeterminate .p-progressbar-value::after {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        animation-delay: 1.15s;
    }

    @keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }

    @keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
`, qs = {
  root: function(t) {
    var n = t.instance;
    return ["p-progressbar p-component", {
      "p-progressbar-determinate": n.determinate,
      "p-progressbar-indeterminate": n.indeterminate
    }];
  },
  value: "p-progressbar-value",
  label: "p-progressbar-label"
}, Zs = Ke.extend({
  name: "progressbar",
  style: Xs,
  classes: qs
}), Qs = {
  name: "BaseProgressBar",
  extends: xe,
  props: {
    value: {
      type: Number,
      default: null
    },
    mode: {
      type: String,
      default: "determinate"
    },
    showValue: {
      type: Boolean,
      default: !0
    }
  },
  style: Zs,
  provide: function() {
    return {
      $pcProgressBar: this,
      $parentInstance: this
    };
  }
}, Li = {
  name: "ProgressBar",
  extends: Qs,
  inheritAttrs: !1,
  computed: {
    progressStyle: function() {
      return {
        width: this.value + "%",
        display: "flex"
      };
    },
    indeterminate: function() {
      return this.mode === "indeterminate";
    },
    determinate: function() {
      return this.mode === "determinate";
    },
    dataP: function() {
      return Ge({
        determinate: this.determinate,
        indeterminate: this.indeterminate
      });
    }
  }
}, Js = ["aria-valuenow", "data-p"], to = ["data-p"], eo = ["data-p"], no = ["data-p"];
function io(e, t, n, i, s, o) {
  return B(), V("div", j({
    role: "progressbar",
    class: e.cx("root"),
    "aria-valuemin": "0",
    "aria-valuenow": e.value,
    "aria-valuemax": "100",
    "data-p": o.dataP
  }, e.ptmi("root")), [o.determinate ? (B(), V("div", j({
    key: 0,
    class: e.cx("value"),
    style: o.progressStyle,
    "data-p": o.dataP
  }, e.ptm("value")), [e.value != null && e.value !== 0 && e.showValue ? (B(), V("div", j({
    key: 0,
    class: e.cx("label"),
    "data-p": o.dataP
  }, e.ptm("label")), [ft(e.$slots, "default", {}, function() {
    return [_s(Ne(e.value + "%"), 1)];
  })], 16, eo)) : At("", !0)], 16, to)) : o.indeterminate ? (B(), V("div", j({
    key: 1,
    class: e.cx("value"),
    "data-p": o.dataP
  }, e.ptm("value")), null, 16, no)) : At("", !0)], 16, Js);
}
Li.render = io;
function Xt(e) {
  return e + 0.5 | 0;
}
const et = (e, t, n) => Math.max(Math.min(e, n), t);
function Et(e) {
  return et(Xt(e * 2.55), 0, 255);
}
function st(e) {
  return et(Xt(e * 255), 0, 255);
}
function J(e) {
  return et(Xt(e / 2.55) / 100, 0, 1);
}
function pn(e) {
  return et(Xt(e * 100), 0, 100);
}
const U = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Be = [..."0123456789ABCDEF"], so = (e) => Be[e & 15], oo = (e) => Be[(e & 240) >> 4] + Be[e & 15], Jt = (e) => (e & 240) >> 4 === (e & 15), ro = (e) => Jt(e.r) && Jt(e.g) && Jt(e.b) && Jt(e.a);
function ao(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & U[e[1]] * 17,
    g: 255 & U[e[2]] * 17,
    b: 255 & U[e[3]] * 17,
    a: t === 5 ? U[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: U[e[1]] << 4 | U[e[2]],
    g: U[e[3]] << 4 | U[e[4]],
    b: U[e[5]] << 4 | U[e[6]],
    a: t === 9 ? U[e[7]] << 4 | U[e[8]] : 255
  })), n;
}
const lo = (e, t) => e < 255 ? t(e) : "";
function co(e) {
  var t = ro(e) ? so : oo;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + lo(e.a, t) : void 0;
}
const ho = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Ei(e, t, n) {
  const i = t * Math.min(n, 1 - n), s = (o, r = (o + e / 30) % 12) => n - i * Math.max(Math.min(r - 3, 9 - r, 1), -1);
  return [s(0), s(8), s(4)];
}
function uo(e, t, n) {
  const i = (s, o = (s + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [i(5), i(3), i(1)];
}
function fo(e, t, n) {
  const i = Ei(e, 1, 0.5);
  let s;
  for (t + n > 1 && (s = 1 / (t + n), t *= s, n *= s), s = 0; s < 3; s++)
    i[s] *= 1 - t - n, i[s] += t;
  return i;
}
function po(e, t, n, i, s) {
  return e === s ? (t - n) / i + (t < n ? 6 : 0) : t === s ? (n - e) / i + 2 : (e - t) / i + 4;
}
function qe(e) {
  const n = e.r / 255, i = e.g / 255, s = e.b / 255, o = Math.max(n, i, s), r = Math.min(n, i, s), a = (o + r) / 2;
  let l, c, h;
  return o !== r && (h = o - r, c = a > 0.5 ? h / (2 - o - r) : h / (o + r), l = po(n, i, s, h, o), l = l * 60 + 0.5), [l | 0, c || 0, a];
}
function Ze(e, t, n, i) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, i)).map(st);
}
function Qe(e, t, n) {
  return Ze(Ei, e, t, n);
}
function go(e, t, n) {
  return Ze(fo, e, t, n);
}
function mo(e, t, n) {
  return Ze(uo, e, t, n);
}
function zi(e) {
  return (e % 360 + 360) % 360;
}
function bo(e) {
  const t = ho.exec(e);
  let n = 255, i;
  if (!t)
    return;
  t[5] !== i && (n = t[6] ? Et(+t[5]) : st(+t[5]));
  const s = zi(+t[2]), o = +t[3] / 100, r = +t[4] / 100;
  return t[1] === "hwb" ? i = go(s, o, r) : t[1] === "hsv" ? i = mo(s, o, r) : i = Qe(s, o, r), {
    r: i[0],
    g: i[1],
    b: i[2],
    a: n
  };
}
function _o(e, t) {
  var n = qe(e);
  n[0] = zi(n[0] + t), n = Qe(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function yo(e) {
  if (!e)
    return;
  const t = qe(e), n = t[0], i = pn(t[1]), s = pn(t[2]);
  return e.a < 255 ? `hsla(${n}, ${i}%, ${s}%, ${J(e.a)})` : `hsl(${n}, ${i}%, ${s}%)`;
}
const gn = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, mn = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function xo() {
  const e = {}, t = Object.keys(mn), n = Object.keys(gn);
  let i, s, o, r, a;
  for (i = 0; i < t.length; i++) {
    for (r = a = t[i], s = 0; s < n.length; s++)
      o = n[s], a = a.replace(o, gn[o]);
    o = parseInt(mn[r], 16), e[a] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let te;
function vo(e) {
  te || (te = xo(), te.transparent = [0, 0, 0, 0]);
  const t = te[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const ko = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function wo(e) {
  const t = ko.exec(e);
  let n = 255, i, s, o;
  if (t) {
    if (t[7] !== i) {
      const r = +t[7];
      n = t[8] ? Et(r) : et(r * 255, 0, 255);
    }
    return i = +t[1], s = +t[3], o = +t[5], i = 255 & (t[2] ? Et(i) : et(i, 0, 255)), s = 255 & (t[4] ? Et(s) : et(s, 0, 255)), o = 255 & (t[6] ? Et(o) : et(o, 0, 255)), {
      r: i,
      g: s,
      b: o,
      a: n
    };
  }
}
function Mo(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${J(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Oe = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, xt = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function So(e, t, n) {
  const i = xt(J(e.r)), s = xt(J(e.g)), o = xt(J(e.b));
  return {
    r: st(Oe(i + n * (xt(J(t.r)) - i))),
    g: st(Oe(s + n * (xt(J(t.g)) - s))),
    b: st(Oe(o + n * (xt(J(t.b)) - o))),
    a: e.a + n * (t.a - e.a)
  };
}
function ee(e, t, n) {
  if (e) {
    let i = qe(e);
    i[t] = Math.max(0, Math.min(i[t] + i[t] * n, t === 0 ? 360 : 1)), i = Qe(i), e.r = i[0], e.g = i[1], e.b = i[2];
  }
}
function Ai(e, t) {
  return e && Object.assign(t || {}, e);
}
function bn(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = st(e[3]))) : (t = Ai(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = st(t.a)), t;
}
function Po(e) {
  return e.charAt(0) === "r" ? wo(e) : bo(e);
}
class Ht {
  constructor(t) {
    if (t instanceof Ht)
      return t;
    const n = typeof t;
    let i;
    n === "object" ? i = bn(t) : n === "string" && (i = ao(t) || vo(t) || Po(t)), this._rgb = i, this._valid = !!i;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Ai(this._rgb);
    return t && (t.a = J(t.a)), t;
  }
  set rgb(t) {
    this._rgb = bn(t);
  }
  rgbString() {
    return this._valid ? Mo(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? co(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? yo(this._rgb) : void 0;
  }
  mix(t, n) {
    if (t) {
      const i = this.rgb, s = t.rgb;
      let o;
      const r = n === o ? 0.5 : n, a = 2 * r - 1, l = i.a - s.a, c = ((a * l === -1 ? a : (a + l) / (1 + a * l)) + 1) / 2;
      o = 1 - c, i.r = 255 & c * i.r + o * s.r + 0.5, i.g = 255 & c * i.g + o * s.g + 0.5, i.b = 255 & c * i.b + o * s.b + 0.5, i.a = r * i.a + (1 - r) * s.a, this.rgb = i;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = So(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new Ht(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = st(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = Xt(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = n, this;
  }
  opaquer(t) {
    const n = this._rgb;
    return n.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return ee(this._rgb, 2, t), this;
  }
  darken(t) {
    return ee(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return ee(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return ee(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return _o(this._rgb, t), this;
  }
}
const Oo = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function D(e) {
  return e == null;
}
function F(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function M(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function N(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function G(e, t) {
  return N(e) ? e : t;
}
function O(e, t) {
  return typeof e > "u" ? t : e;
}
const Do = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function L(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function R(e, t, n, i) {
  let s, o, r;
  if (F(e))
    for (o = e.length, s = 0; s < o; s++)
      t.call(n, e[s], s);
  else if (M(e))
    for (r = Object.keys(e), o = r.length, s = 0; s < o; s++)
      t.call(n, e[r[s]], r[s]);
}
function _n(e, t) {
  let n, i, s, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, i = e.length; n < i; ++n)
    if (s = e[n], o = t[n], s.datasetIndex !== o.datasetIndex || s.index !== o.index)
      return !1;
  return !0;
}
function pe(e) {
  if (F(e))
    return e.map(pe);
  if (M(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), i = n.length;
    let s = 0;
    for (; s < i; ++s)
      t[n[s]] = pe(e[n[s]]);
    return t;
  }
  return e;
}
function Fi(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Co(e, t, n, i) {
  if (!Fi(e))
    return;
  const s = t[e], o = n[e];
  M(s) && M(o) ? Wt(s, o, i) : t[e] = pe(o);
}
function Wt(e, t, n) {
  const i = F(t) ? t : [
    t
  ], s = i.length;
  if (!M(e))
    return e;
  n = n || {};
  const o = n.merger || Co;
  let r;
  for (let a = 0; a < s; ++a) {
    if (r = i[a], !M(r))
      continue;
    const l = Object.keys(r);
    for (let c = 0, h = l.length; c < h; ++c)
      o(l[c], e, r, n);
  }
  return e;
}
function Ft(e, t) {
  return Wt(e, t, {
    merger: To
  });
}
function To(e, t, n) {
  if (!Fi(e))
    return;
  const i = t[e], s = n[e];
  M(i) && M(s) ? Ft(i, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = pe(s));
}
const yn = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Io(e) {
  const t = e.split("."), n = [];
  let i = "";
  for (const s of t)
    i += s, i.endsWith("\\") ? i = i.slice(0, -1) + "." : (n.push(i), i = "");
  return n;
}
function Lo(e) {
  const t = Io(e);
  return (n) => {
    for (const i of t) {
      if (i === "")
        break;
      n = n && n[i];
    }
    return n;
  };
}
function ge(e, t) {
  return (yn[t] || (yn[t] = Lo(t)))(e);
}
function Je(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const me = (e) => typeof e < "u", ot = (e) => typeof e == "function", xn = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function Eo(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const H = Math.PI, Z = 2 * H, zo = Z + H, be = Number.POSITIVE_INFINITY, Ao = H / 180, nt = H / 2, lt = H / 4, vn = H * 2 / 3, Ri = Math.log10, vt = Math.sign;
function Rt(e, t, n) {
  return Math.abs(e - t) < n;
}
function kn(e) {
  const t = Math.round(e);
  e = Rt(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(Ri(e))), i = e / n;
  return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * n;
}
function Fo(e) {
  const t = [], n = Math.sqrt(e);
  let i;
  for (i = 1; i < n; i++)
    e % i === 0 && (t.push(i), t.push(e / i));
  return n === (n | 0) && t.push(n), t.sort((s, o) => s - o).pop(), t;
}
function Ro(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Ut(e) {
  return !Ro(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function No(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function Bo(e, t, n) {
  let i, s, o;
  for (i = 0, s = e.length; i < s; i++)
    o = e[i][n], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function pt(e) {
  return e * (H / 180);
}
function Vo(e) {
  return e * (180 / H);
}
function wn(e) {
  if (!N(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function jo(e, t) {
  const n = t.x - e.x, i = t.y - e.y, s = Math.sqrt(n * n + i * i);
  let o = Math.atan2(i, n);
  return o < -0.5 * H && (o += Z), {
    angle: o,
    distance: s
  };
}
function Mn(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function $o(e, t) {
  return (e - t + zo) % Z - H;
}
function X(e) {
  return (e % Z + Z) % Z;
}
function Ni(e, t, n, i) {
  const s = X(e), o = X(t), r = X(n), a = X(o - s), l = X(r - s), c = X(s - o), h = X(s - r);
  return s === o || s === r || i && o === r || a > l && c < h;
}
function q(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Ho(e) {
  return q(e, -32768, 32767);
}
function Bi(e, t, n, i = 1e-6) {
  return e >= Math.min(t, n) - i && e <= Math.max(t, n) + i;
}
function tn(e, t, n) {
  n = n || ((r) => e[r] < t);
  let i = e.length - 1, s = 0, o;
  for (; i - s > 1; )
    o = s + i >> 1, n(o) ? s = o : i = o;
  return {
    lo: s,
    hi: i
  };
}
const gt = (e, t, n, i) => tn(e, n, i ? (s) => {
  const o = e[s][t];
  return o < n || o === n && e[s + 1][t] === n;
} : (s) => e[s][t] < n), Wo = (e, t, n) => tn(e, n, (i) => e[i][t] >= n);
function Uo(e, t, n) {
  let i = 0, s = e.length;
  for (; i < s && e[i] < t; )
    i++;
  for (; s > i && e[s - 1] > n; )
    s--;
  return i > 0 || s < e.length ? e.slice(i, s) : e;
}
const Vi = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Yo(e, t) {
  if (e._chartjs) {
    e._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(e, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        t
      ]
    }
  }), Vi.forEach((n) => {
    const i = "_onData" + Je(n), s = e[n];
    Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const r = s.apply(this, o);
        return e._chartjs.listeners.forEach((a) => {
          typeof a[i] == "function" && a[i](...o);
        }), r;
      }
    });
  });
}
function Sn(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const i = n.listeners, s = i.indexOf(t);
  s !== -1 && i.splice(s, 1), !(i.length > 0) && (Vi.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function Go(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const ji = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function $i(e, t) {
  let n = [], i = !1;
  return function(...s) {
    n = s, i || (i = !0, ji.call(window, () => {
      i = !1, e.apply(t, n);
    }));
  };
}
function Ko(e, t) {
  let n;
  return function(...i) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, i)) : e.apply(this, i), t;
  };
}
const Xo = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Pn = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2;
function qo(e, t, n) {
  const i = t.length;
  let s = 0, o = i;
  if (e._sorted) {
    const { iScale: r, vScale: a, _parsed: l } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, h = r.axis, { min: u, max: d, minDefined: f, maxDefined: m } = r.getUserBounds();
    if (f) {
      if (s = Math.min(
        // @ts-expect-error Need to type _parsed
        gt(l, h, u).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? i : gt(t, h, r.getPixelForValue(u)).lo
      ), c) {
        const p = l.slice(0, s + 1).reverse().findIndex((g) => !D(g[a.axis]));
        s -= Math.max(0, p);
      }
      s = q(s, 0, i - 1);
    }
    if (m) {
      let p = Math.max(
        // @ts-expect-error Need to type _parsed
        gt(l, r.axis, d, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : gt(t, h, r.getPixelForValue(d), !0).hi + 1
      );
      if (c) {
        const g = l.slice(p - 1).findIndex((b) => !D(b[a.axis]));
        p += Math.max(0, g);
      }
      o = q(p, s, i) - s;
    } else
      o = i - s;
  }
  return {
    start: s,
    count: o
  };
}
function Zo(e) {
  const { xScale: t, yScale: n, _scaleRanges: i } = e, s = {
    xmin: t.min,
    xmax: t.max,
    ymin: n.min,
    ymax: n.max
  };
  if (!i)
    return e._scaleRanges = s, !0;
  const o = i.xmin !== t.min || i.xmax !== t.max || i.ymin !== n.min || i.ymax !== n.max;
  return Object.assign(i, s), o;
}
const ne = (e) => e === 0 || e === 1, On = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Z / n)), Dn = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Z / n) + 1, Nt = {
  linear: (e) => e,
  easeInQuad: (e) => e * e,
  easeOutQuad: (e) => -e * (e - 2),
  easeInOutQuad: (e) => (e /= 0.5) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1),
  easeInCubic: (e) => e * e * e,
  easeOutCubic: (e) => (e -= 1) * e * e + 1,
  easeInOutCubic: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2),
  easeInQuart: (e) => e * e * e * e,
  easeOutQuart: (e) => -((e -= 1) * e * e * e - 1),
  easeInOutQuart: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2),
  easeInQuint: (e) => e * e * e * e * e,
  easeOutQuint: (e) => (e -= 1) * e * e * e * e + 1,
  easeInOutQuint: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e * e * e : 0.5 * ((e -= 2) * e * e * e * e + 2),
  easeInSine: (e) => -Math.cos(e * nt) + 1,
  easeOutSine: (e) => Math.sin(e * nt),
  easeInOutSine: (e) => -0.5 * (Math.cos(H * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => ne(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => ne(e) ? e : On(e, 0.075, 0.3),
  easeOutElastic: (e) => ne(e) ? e : Dn(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return ne(e) ? e : e < 0.5 ? 0.5 * On(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Dn(e * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(e) {
    return e * e * ((1.70158 + 1) * e - 1.70158);
  },
  easeOutBack(e) {
    return (e -= 1) * e * ((1.70158 + 1) * e + 1.70158) + 1;
  },
  easeInOutBack(e) {
    let t = 1.70158;
    return (e /= 0.5) < 1 ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t)) : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  },
  easeInBounce: (e) => 1 - Nt.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Nt.easeInBounce(e * 2) * 0.5 : Nt.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function en(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Cn(e) {
  return en(e) ? e : new Ht(e);
}
function De(e) {
  return en(e) ? e : new Ht(e).saturate(0.5).darken(0.1).hexString();
}
const Qo = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Jo = [
  "color",
  "borderColor",
  "backgroundColor"
];
function tr(e) {
  e.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), e.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (t) => t !== "onProgress" && t !== "onComplete" && t !== "fn"
  }), e.set("animations", {
    colors: {
      type: "color",
      properties: Jo
    },
    numbers: {
      type: "number",
      properties: Qo
    }
  }), e.describe("animations", {
    _fallback: "animation"
  }), e.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (t) => t | 0
        }
      }
    }
  });
}
function er(e) {
  e.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const Tn = /* @__PURE__ */ new Map();
function nr(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let i = Tn.get(n);
  return i || (i = new Intl.NumberFormat(e, t), Tn.set(n, i)), i;
}
function Hi(e, t, n) {
  return nr(t, n).format(e);
}
const ir = {
  values(e) {
    return F(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const i = this.chart.options.locale;
    let s, o = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (s = "scientific"), o = sr(e, n);
    }
    const r = Ri(Math.abs(o)), a = isNaN(r) ? 1 : Math.max(Math.min(-1 * Math.floor(r), 20), 0), l = {
      notation: s,
      minimumFractionDigits: a,
      maximumFractionDigits: a
    };
    return Object.assign(l, this.options.ticks.format), Hi(e, i, l);
  }
};
function sr(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var Wi = {
  formatters: ir
};
function or(e) {
  e.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (t, n) => n.lineWidth,
      tickColor: (t, n) => n.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Wi.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), e.route("scale.ticks", "color", "", "color"), e.route("scale.grid", "color", "", "borderColor"), e.route("scale.border", "color", "", "borderColor"), e.route("scale.title", "color", "", "color"), e.describe("scale", {
    _fallback: !1,
    _scriptable: (t) => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
    _indexable: (t) => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
  }), e.describe("scales", {
    _fallback: "scale"
  }), e.describe("scale.ticks", {
    _scriptable: (t) => t !== "backdropPadding" && t !== "callback",
    _indexable: (t) => t !== "backdropPadding"
  });
}
const bt = /* @__PURE__ */ Object.create(null), Ve = /* @__PURE__ */ Object.create(null);
function Bt(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let i = 0, s = n.length; i < s; ++i) {
    const o = n[i];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Ce(e, t, n) {
  return typeof t == "string" ? Wt(Bt(e, t), n) : Wt(Bt(e, ""), t);
}
class rr {
  constructor(t, n) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (i) => i.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (i, s) => De(s.backgroundColor), this.hoverBorderColor = (i, s) => De(s.borderColor), this.hoverColor = (i, s) => De(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return Ce(this, t, n);
  }
  get(t) {
    return Bt(this, t);
  }
  describe(t, n) {
    return Ce(Ve, t, n);
  }
  override(t, n) {
    return Ce(bt, t, n);
  }
  route(t, n, i, s) {
    const o = Bt(this, t), r = Bt(this, i), a = "_" + n;
    Object.defineProperties(o, {
      [a]: {
        value: o[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const l = this[a], c = r[s];
          return M(l) ? Object.assign({}, c, l) : O(l, c);
        },
        set(l) {
          this[a] = l;
        }
      }
    });
  }
  apply(t) {
    t.forEach((n) => n(this));
  }
}
var E = /* @__PURE__ */ new rr({
  _scriptable: (e) => !e.startsWith("on"),
  _indexable: (e) => e !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  tr,
  er,
  or
]);
function ar(e) {
  return !e || D(e.size) || D(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function In(e, t, n, i, s) {
  let o = t[s];
  return o || (o = t[s] = e.measureText(s).width, n.push(s)), o > i && (i = o), i;
}
function ct(e, t, n) {
  const i = e.currentDevicePixelRatio, s = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - s) * i) / i + s;
}
function Ln(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function lr(e, t, n, i) {
  cr(e, t, n, i);
}
function cr(e, t, n, i, s) {
  let o, r, a, l, c, h, u, d;
  const f = t.pointStyle, m = t.rotation, p = t.radius;
  let g = (m || 0) * Ao;
  if (f && typeof f == "object" && (o = f.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, i), e.rotate(g), e.drawImage(f, -f.width / 2, -f.height / 2, f.width, f.height), e.restore();
    return;
  }
  if (!(isNaN(p) || p <= 0)) {
    switch (e.beginPath(), f) {
      // Default includes circle
      default:
        e.arc(n, i, p, 0, Z), e.closePath();
        break;
      case "triangle":
        h = p, e.moveTo(n + Math.sin(g) * h, i - Math.cos(g) * p), g += vn, e.lineTo(n + Math.sin(g) * h, i - Math.cos(g) * p), g += vn, e.lineTo(n + Math.sin(g) * h, i - Math.cos(g) * p), e.closePath();
        break;
      case "rectRounded":
        c = p * 0.516, l = p - c, r = Math.cos(g + lt) * l, u = Math.cos(g + lt) * l, a = Math.sin(g + lt) * l, d = Math.sin(g + lt) * l, e.arc(n - u, i - a, c, g - H, g - nt), e.arc(n + d, i - r, c, g - nt, g), e.arc(n + u, i + a, c, g, g + nt), e.arc(n - d, i + r, c, g + nt, g + H), e.closePath();
        break;
      case "rect":
        if (!m) {
          l = Math.SQRT1_2 * p, h = l, e.rect(n - h, i - l, 2 * h, 2 * l);
          break;
        }
        g += lt;
      /* falls through */
      case "rectRot":
        u = Math.cos(g) * p, r = Math.cos(g) * p, a = Math.sin(g) * p, d = Math.sin(g) * p, e.moveTo(n - u, i - a), e.lineTo(n + d, i - r), e.lineTo(n + u, i + a), e.lineTo(n - d, i + r), e.closePath();
        break;
      case "crossRot":
        g += lt;
      /* falls through */
      case "cross":
        u = Math.cos(g) * p, r = Math.cos(g) * p, a = Math.sin(g) * p, d = Math.sin(g) * p, e.moveTo(n - u, i - a), e.lineTo(n + u, i + a), e.moveTo(n + d, i - r), e.lineTo(n - d, i + r);
        break;
      case "star":
        u = Math.cos(g) * p, r = Math.cos(g) * p, a = Math.sin(g) * p, d = Math.sin(g) * p, e.moveTo(n - u, i - a), e.lineTo(n + u, i + a), e.moveTo(n + d, i - r), e.lineTo(n - d, i + r), g += lt, u = Math.cos(g) * p, r = Math.cos(g) * p, a = Math.sin(g) * p, d = Math.sin(g) * p, e.moveTo(n - u, i - a), e.lineTo(n + u, i + a), e.moveTo(n + d, i - r), e.lineTo(n - d, i + r);
        break;
      case "line":
        r = Math.cos(g) * p, a = Math.sin(g) * p, e.moveTo(n - r, i - a), e.lineTo(n + r, i + a);
        break;
      case "dash":
        e.moveTo(n, i), e.lineTo(n + Math.cos(g) * p, i + Math.sin(g) * p);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Yt(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function nn(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function sn(e) {
  e.restore();
}
function hr(e, t, n, i, s) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (s === "middle") {
    const o = (t.x + n.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, n.y);
  } else s === "after" != !!i ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function ur(e, t, n, i) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(i ? t.cp1x : t.cp2x, i ? t.cp1y : t.cp2y, i ? n.cp2x : n.cp1x, i ? n.cp2y : n.cp1y, n.x, n.y);
}
function dr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), D(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function fr(e, t, n, i, s) {
  if (s.strikethrough || s.underline) {
    const o = e.measureText(i), r = t - o.actualBoundingBoxLeft, a = t + o.actualBoundingBoxRight, l = n - o.actualBoundingBoxAscent, c = n + o.actualBoundingBoxDescent, h = s.strikethrough ? (l + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(r, h), e.lineTo(a, h), e.stroke();
  }
}
function pr(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function En(e, t, n, i, s, o = {}) {
  const r = F(t) ? t : [
    t
  ], a = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, c;
  for (e.save(), e.font = s.string, dr(e, o), l = 0; l < r.length; ++l)
    c = r[l], o.backdrop && pr(e, o.backdrop), a && (o.strokeColor && (e.strokeStyle = o.strokeColor), D(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(c, n, i, o.maxWidth)), e.fillText(c, n, i, o.maxWidth), fr(e, n, i, c, o), i += Number(s.lineHeight);
  e.restore();
}
const gr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, mr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function br(e, t) {
  const n = ("" + e).match(gr);
  if (!n || n[1] === "normal")
    return t * 1.2;
  switch (e = +n[2], n[3]) {
    case "px":
      return e;
    case "%":
      e /= 100;
      break;
  }
  return t * e;
}
const _r = (e) => +e || 0;
function yr(e, t) {
  const n = {}, i = M(t), s = i ? Object.keys(t) : t, o = M(e) ? i ? (r) => O(e[r], e[t[r]]) : (r) => e[r] : () => e;
  for (const r of s)
    n[r] = _r(o(r));
  return n;
}
function xr(e) {
  return yr(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Gt(e) {
  const t = xr(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function je(e, t) {
  e = e || {}, t = t || E.font;
  let n = O(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let i = O(e.style, t.style);
  i && !("" + i).match(mr) && (console.warn('Invalid font style specified: "' + i + '"'), i = void 0);
  const s = {
    family: O(e.family, t.family),
    lineHeight: br(O(e.lineHeight, t.lineHeight), n),
    size: n,
    style: i,
    weight: O(e.weight, t.weight),
    string: ""
  };
  return s.string = ar(s), s;
}
function ie(e, t, n, i) {
  let s, o, r;
  for (s = 0, o = e.length; s < o; ++s)
    if (r = e[s], r !== void 0 && r !== void 0)
      return r;
}
function vr(e, t, n) {
  const { min: i, max: s } = e, o = Do(t, (s - i) / 2), r = (a, l) => n && a === 0 ? 0 : a + l;
  return {
    min: r(i, -Math.abs(o)),
    max: r(s, o)
  };
}
function Mt(e, t) {
  return Object.assign(Object.create(e), t);
}
function on(e, t = [
  ""
], n, i, s = () => e[0]) {
  const o = n || e;
  typeof i > "u" && (i = Ki("_fallback", e));
  const r = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: i,
    _getTarget: s,
    override: (a) => on([
      a,
      ...e
    ], t, o, i)
  };
  return new Proxy(r, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(a, l) {
      return delete a[l], delete a._keys, delete e[0][l], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(a, l) {
      return Yi(a, l, () => Cr(l, t, e, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(a, l) {
      return Reflect.getOwnPropertyDescriptor(a._scopes[0], l);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(a, l) {
      return An(a).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(a) {
      return An(a);
    },
    /**
    * A trap for setting property values.
    */
    set(a, l, c) {
      const h = a._storage || (a._storage = s());
      return a[l] = h[l] = c, delete a._keys, !0;
    }
  });
}
function kt(e, t, n, i) {
  const s = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Ui(e, i),
    setContext: (o) => kt(e, o, n, i),
    override: (o) => kt(e.override(o), t, n, i)
  };
  return new Proxy(s, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, r) {
      return delete o[r], delete e[r], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, r, a) {
      return Yi(o, r, () => wr(o, r, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, r) {
      return o._descriptors.allKeys ? Reflect.has(e, r) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(e, r);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e);
    },
    /**
    * A trap for the in operator.
    */
    has(o, r) {
      return Reflect.has(e, r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(e);
    },
    /**
    * A trap for setting property values.
    */
    set(o, r, a) {
      return e[r] = a, delete o[r], !0;
    }
  });
}
function Ui(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: i = t.indexable, _allKeys: s = t.allKeys } = e;
  return {
    allKeys: s,
    scriptable: n,
    indexable: i,
    isScriptable: ot(n) ? n : () => n,
    isIndexable: ot(i) ? i : () => i
  };
}
const kr = (e, t) => e ? e + Je(t) : t, rn = (e, t) => M(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Yi(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const i = n();
  return e[t] = i, i;
}
function wr(e, t, n) {
  const { _proxy: i, _context: s, _subProxy: o, _descriptors: r } = e;
  let a = i[t];
  return ot(a) && r.isScriptable(t) && (a = Mr(t, a, e, n)), F(a) && a.length && (a = Sr(t, a, e, r.isIndexable)), rn(t, a) && (a = kt(a, s, o && o[t], r)), a;
}
function Mr(e, t, n, i) {
  const { _proxy: s, _context: o, _subProxy: r, _stack: a } = n;
  if (a.has(e))
    throw new Error("Recursion detected: " + Array.from(a).join("->") + "->" + e);
  a.add(e);
  let l = t(o, r || i);
  return a.delete(e), rn(e, l) && (l = an(s._scopes, s, e, l)), l;
}
function Sr(e, t, n, i) {
  const { _proxy: s, _context: o, _subProxy: r, _descriptors: a } = n;
  if (typeof o.index < "u" && i(e))
    return t[o.index % t.length];
  if (M(t[0])) {
    const l = t, c = s._scopes.filter((h) => h !== l);
    t = [];
    for (const h of l) {
      const u = an(c, s, e, h);
      t.push(kt(u, o, r && r[e], a));
    }
  }
  return t;
}
function Gi(e, t, n) {
  return ot(e) ? e(t, n) : e;
}
const Pr = (e, t) => e === !0 ? t : typeof e == "string" ? ge(t, e) : void 0;
function Or(e, t, n, i, s) {
  for (const o of t) {
    const r = Pr(n, o);
    if (r) {
      e.add(r);
      const a = Gi(r._fallback, n, s);
      if (typeof a < "u" && a !== n && a !== i)
        return a;
    } else if (r === !1 && typeof i < "u" && n !== i)
      return null;
  }
  return !1;
}
function an(e, t, n, i) {
  const s = t._rootScopes, o = Gi(t._fallback, n, i), r = [
    ...e,
    ...s
  ], a = /* @__PURE__ */ new Set();
  a.add(i);
  let l = zn(a, r, n, o || n, i);
  return l === null || typeof o < "u" && o !== n && (l = zn(a, r, o, l, i), l === null) ? !1 : on(Array.from(a), [
    ""
  ], s, o, () => Dr(t, n, i));
}
function zn(e, t, n, i, s) {
  for (; n; )
    n = Or(e, t, n, i, s);
  return n;
}
function Dr(e, t, n) {
  const i = e._getTarget();
  t in i || (i[t] = {});
  const s = i[t];
  return F(s) && M(n) ? n : s || {};
}
function Cr(e, t, n, i) {
  let s;
  for (const o of t)
    if (s = Ki(kr(o, e), n), typeof s < "u")
      return rn(e, s) ? an(n, i, e, s) : s;
}
function Ki(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const i = n[e];
    if (typeof i < "u")
      return i;
  }
}
function An(e) {
  let t = e._keys;
  return t || (t = e._keys = Tr(e._scopes)), t;
}
function Tr(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const i of Object.keys(n).filter((s) => !s.startsWith("_")))
      t.add(i);
  return Array.from(t);
}
const Ir = Number.EPSILON || 1e-14, wt = (e, t) => t < e.length && !e[t].skip && e[t], Xi = (e) => e === "x" ? "y" : "x";
function Lr(e, t, n, i) {
  const s = e.skip ? t : e, o = t, r = n.skip ? t : n, a = Mn(o, s), l = Mn(r, o);
  let c = a / (a + l), h = l / (a + l);
  c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
  const u = i * c, d = i * h;
  return {
    previous: {
      x: o.x - u * (r.x - s.x),
      y: o.y - u * (r.y - s.y)
    },
    next: {
      x: o.x + d * (r.x - s.x),
      y: o.y + d * (r.y - s.y)
    }
  };
}
function Er(e, t, n) {
  const i = e.length;
  let s, o, r, a, l, c = wt(e, 0);
  for (let h = 0; h < i - 1; ++h)
    if (l = c, c = wt(e, h + 1), !(!l || !c)) {
      if (Rt(t[h], 0, Ir)) {
        n[h] = n[h + 1] = 0;
        continue;
      }
      s = n[h] / t[h], o = n[h + 1] / t[h], a = Math.pow(s, 2) + Math.pow(o, 2), !(a <= 9) && (r = 3 / Math.sqrt(a), n[h] = s * r * t[h], n[h + 1] = o * r * t[h]);
    }
}
function zr(e, t, n = "x") {
  const i = Xi(n), s = e.length;
  let o, r, a, l = wt(e, 0);
  for (let c = 0; c < s; ++c) {
    if (r = a, a = l, l = wt(e, c + 1), !a)
      continue;
    const h = a[n], u = a[i];
    r && (o = (h - r[n]) / 3, a[`cp1${n}`] = h - o, a[`cp1${i}`] = u - o * t[c]), l && (o = (l[n] - h) / 3, a[`cp2${n}`] = h + o, a[`cp2${i}`] = u + o * t[c]);
  }
}
function Ar(e, t = "x") {
  const n = Xi(t), i = e.length, s = Array(i).fill(0), o = Array(i);
  let r, a, l, c = wt(e, 0);
  for (r = 0; r < i; ++r)
    if (a = l, l = c, c = wt(e, r + 1), !!l) {
      if (c) {
        const h = c[t] - l[t];
        s[r] = h !== 0 ? (c[n] - l[n]) / h : 0;
      }
      o[r] = a ? c ? vt(s[r - 1]) !== vt(s[r]) ? 0 : (s[r - 1] + s[r]) / 2 : s[r - 1] : s[r];
    }
  Er(e, s, o), zr(e, o, t);
}
function se(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function Fr(e, t) {
  let n, i, s, o, r, a = Yt(e[0], t);
  for (n = 0, i = e.length; n < i; ++n)
    r = o, o = a, a = n < i - 1 && Yt(e[n + 1], t), o && (s = e[n], r && (s.cp1x = se(s.cp1x, t.left, t.right), s.cp1y = se(s.cp1y, t.top, t.bottom)), a && (s.cp2x = se(s.cp2x, t.left, t.right), s.cp2y = se(s.cp2y, t.top, t.bottom)));
}
function Rr(e, t, n, i, s) {
  let o, r, a, l;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    Ar(e, s);
  else {
    let c = i ? e[e.length - 1] : e[0];
    for (o = 0, r = e.length; o < r; ++o)
      a = e[o], l = Lr(c, a, e[Math.min(o + 1, r - (i ? 0 : 1)) % r], t.tension), a.cp1x = l.previous.x, a.cp1y = l.previous.y, a.cp2x = l.next.x, a.cp2y = l.next.y, c = a;
  }
  t.capBezierPoints && Fr(e, n);
}
function ln() {
  return typeof window < "u" && typeof document < "u";
}
function cn(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function _e(e, t, n) {
  let i;
  return typeof e == "string" ? (i = parseInt(e, 10), e.indexOf("%") !== -1 && (i = i / 100 * t.parentNode[n])) : i = e, i;
}
const ve = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Nr(e, t) {
  return ve(e).getPropertyValue(t);
}
const Br = [
  "top",
  "right",
  "bottom",
  "left"
];
function mt(e, t, n) {
  const i = {};
  n = n ? "-" + n : "";
  for (let s = 0; s < 4; s++) {
    const o = Br[s];
    i[o] = parseFloat(e[t + "-" + o + n]) || 0;
  }
  return i.width = i.left + i.right, i.height = i.top + i.bottom, i;
}
const Vr = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function jr(e, t) {
  const n = e.touches, i = n && n.length ? n[0] : e, { offsetX: s, offsetY: o } = i;
  let r = !1, a, l;
  if (Vr(s, o, e.target))
    a = s, l = o;
  else {
    const c = t.getBoundingClientRect();
    a = i.clientX - c.left, l = i.clientY - c.top, r = !0;
  }
  return {
    x: a,
    y: l,
    box: r
  };
}
function ut(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: i } = t, s = ve(n), o = s.boxSizing === "border-box", r = mt(s, "padding"), a = mt(s, "border", "width"), { x: l, y: c, box: h } = jr(e, n), u = r.left + (h && a.left), d = r.top + (h && a.top);
  let { width: f, height: m } = t;
  return o && (f -= r.width + a.width, m -= r.height + a.height), {
    x: Math.round((l - u) / f * n.width / i),
    y: Math.round((c - d) / m * n.height / i)
  };
}
function $r(e, t, n) {
  let i, s;
  if (t === void 0 || n === void 0) {
    const o = e && cn(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const r = o.getBoundingClientRect(), a = ve(o), l = mt(a, "border", "width"), c = mt(a, "padding");
      t = r.width - c.width - l.width, n = r.height - c.height - l.height, i = _e(a.maxWidth, o, "clientWidth"), s = _e(a.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: i || be,
    maxHeight: s || be
  };
}
const it = (e) => Math.round(e * 10) / 10;
function Hr(e, t, n, i) {
  const s = ve(e), o = mt(s, "margin"), r = _e(s.maxWidth, e, "clientWidth") || be, a = _e(s.maxHeight, e, "clientHeight") || be, l = $r(e, t, n);
  let { width: c, height: h } = l;
  if (s.boxSizing === "content-box") {
    const d = mt(s, "border", "width"), f = mt(s, "padding");
    c -= f.width + d.width, h -= f.height + d.height;
  }
  return c = Math.max(0, c - o.width), h = Math.max(0, i ? c / i : h - o.height), c = it(Math.min(c, r, l.maxWidth)), h = it(Math.min(h, a, l.maxHeight)), c && !h && (h = it(c / 2)), (t !== void 0 || n !== void 0) && i && l.height && h > l.height && (h = l.height, c = it(Math.floor(h * i))), {
    width: c,
    height: h
  };
}
function Fn(e, t, n) {
  const i = t || 1, s = it(e.height * i), o = it(e.width * i);
  e.height = it(e.height), e.width = it(e.width);
  const r = e.canvas;
  return r.style && (n || !r.style.height && !r.style.width) && (r.style.height = `${e.height}px`, r.style.width = `${e.width}px`), e.currentDevicePixelRatio !== i || r.height !== s || r.width !== o ? (e.currentDevicePixelRatio = i, r.height = s, r.width = o, e.ctx.setTransform(i, 0, 0, i, 0, 0), !0) : !1;
}
const Wr = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    ln() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Rn(e, t) {
  const n = Nr(e, t), i = n && n.match(/^(\d+)(\.\d+)?px$/);
  return i ? +i[1] : void 0;
}
function dt(e, t, n, i) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function Ur(e, t, n, i) {
  return {
    x: e.x + n * (t.x - e.x),
    y: i === "middle" ? n < 0.5 ? e.y : t.y : i === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function Yr(e, t, n, i) {
  const s = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, r = dt(e, s, n), a = dt(s, o, n), l = dt(o, t, n), c = dt(r, a, n), h = dt(a, l, n);
  return dt(c, h, n);
}
function qi(e) {
  return e === "angle" ? {
    between: Ni,
    compare: $o,
    normalize: X
  } : {
    between: Bi,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Nn({ start: e, end: t, count: n, loop: i, style: s }) {
  return {
    start: e % n,
    end: t % n,
    loop: i && (t - e + 1) % n === 0,
    style: s
  };
}
function Gr(e, t, n) {
  const { property: i, start: s, end: o } = n, { between: r, normalize: a } = qi(i), l = t.length;
  let { start: c, end: h, loop: u } = e, d, f;
  if (u) {
    for (c += l, h += l, d = 0, f = l; d < f && r(a(t[c % l][i]), s, o); ++d)
      c--, h--;
    c %= l, h %= l;
  }
  return h < c && (h += l), {
    start: c,
    end: h,
    loop: u,
    style: e.style
  };
}
function Zi(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: i, start: s, end: o } = n, r = t.length, { compare: a, between: l, normalize: c } = qi(i), { start: h, end: u, loop: d, style: f } = Gr(e, t, n), m = [];
  let p = !1, g = null, b, y, S;
  const P = () => l(s, S, b) && a(s, S) !== 0, _ = () => a(o, b) === 0 || l(o, S, b), k = () => p || P(), x = () => !p || _();
  for (let v = h, w = h; v <= u; ++v)
    y = t[v % r], !y.skip && (b = c(y[i]), b !== S && (p = l(b, s, o), g === null && k() && (g = a(b, s) === 0 ? v : w), g !== null && x() && (m.push(Nn({
      start: g,
      end: v,
      loop: d,
      count: r,
      style: f
    })), g = null), w = v, S = b));
  return g !== null && m.push(Nn({
    start: g,
    end: u,
    loop: d,
    count: r,
    style: f
  })), m;
}
function Qi(e, t) {
  const n = [], i = e.segments;
  for (let s = 0; s < i.length; s++) {
    const o = Zi(i[s], e.points, t);
    o.length && n.push(...o);
  }
  return n;
}
function Kr(e, t, n, i) {
  let s = 0, o = t - 1;
  if (n && !i)
    for (; s < t && !e[s].skip; )
      s++;
  for (; s < t && e[s].skip; )
    s++;
  for (s %= t, n && (o += s); o > s && e[o % t].skip; )
    o--;
  return o %= t, {
    start: s,
    end: o
  };
}
function Xr(e, t, n, i) {
  const s = e.length, o = [];
  let r = t, a = e[t], l;
  for (l = t + 1; l <= n; ++l) {
    const c = e[l % s];
    c.skip || c.stop ? a.skip || (i = !1, o.push({
      start: t % s,
      end: (l - 1) % s,
      loop: i
    }), t = r = c.stop ? l : null) : (r = l, a.skip && (t = l)), a = c;
  }
  return r !== null && o.push({
    start: t % s,
    end: r % s,
    loop: i
  }), o;
}
function qr(e, t) {
  const n = e.points, i = e.options.spanGaps, s = n.length;
  if (!s)
    return [];
  const o = !!e._loop, { start: r, end: a } = Kr(n, s, o, i);
  if (i === !0)
    return Bn(e, [
      {
        start: r,
        end: a,
        loop: o
      }
    ], n, t);
  const l = a < r ? a + s : a, c = !!e._fullLoop && r === 0 && a === s - 1;
  return Bn(e, Xr(n, r, l, c), n, t);
}
function Bn(e, t, n, i) {
  return !i || !i.setContext || !n ? t : Zr(e, t, n, i);
}
function Zr(e, t, n, i) {
  const s = e._chart.getContext(), o = Vn(e.options), { _datasetIndex: r, options: { spanGaps: a } } = e, l = n.length, c = [];
  let h = o, u = t[0].start, d = u;
  function f(m, p, g, b) {
    const y = a ? -1 : 1;
    if (m !== p) {
      for (m += l; n[m % l].skip; )
        m -= y;
      for (; n[p % l].skip; )
        p += y;
      m % l !== p % l && (c.push({
        start: m % l,
        end: p % l,
        loop: g,
        style: b
      }), h = b, u = p % l);
    }
  }
  for (const m of t) {
    u = a ? u : m.start;
    let p = n[u % l], g;
    for (d = u + 1; d <= m.end; d++) {
      const b = n[d % l];
      g = Vn(i.setContext(Mt(s, {
        type: "segment",
        p0: p,
        p1: b,
        p0DataIndex: (d - 1) % l,
        p1DataIndex: d % l,
        datasetIndex: r
      }))), Qr(g, h) && f(u, d - 1, m.loop, h), p = b, h = g;
    }
    u < d - 1 && f(u, d - 1, m.loop, h);
  }
  return c;
}
function Vn(e) {
  return {
    backgroundColor: e.backgroundColor,
    borderCapStyle: e.borderCapStyle,
    borderDash: e.borderDash,
    borderDashOffset: e.borderDashOffset,
    borderJoinStyle: e.borderJoinStyle,
    borderWidth: e.borderWidth,
    borderColor: e.borderColor
  };
}
function Qr(e, t) {
  if (!t)
    return !1;
  const n = [], i = function(s, o) {
    return en(o) ? (n.includes(o) || n.push(o), n.indexOf(o)) : o;
  };
  return JSON.stringify(e, i) !== JSON.stringify(t, i);
}
function oe(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function Jr(e, t) {
  const { xScale: n, yScale: i } = e;
  return n && i ? {
    left: oe(n, t, "left"),
    right: oe(n, t, "right"),
    top: oe(i, t, "top"),
    bottom: oe(i, t, "bottom")
  } : t;
}
function Ji(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const i = Jr(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : i.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : i.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : i.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : i.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class ta {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, n, i, s) {
    const o = n.listeners[s], r = n.duration;
    o.forEach((a) => a({
      chart: t,
      initial: n.initial,
      numSteps: r,
      currentStep: Math.min(i - n.start, r)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = ji.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((i, s) => {
      if (!i.running || !i.items.length)
        return;
      const o = i.items;
      let r = o.length - 1, a = !1, l;
      for (; r >= 0; --r)
        l = o[r], l._active ? (l._total > i.duration && (i.duration = l._total), l.tick(t), a = !0) : (o[r] = o[o.length - 1], o.pop());
      a && (s.draw(), this._notify(s, i, t, "progress")), o.length || (i.running = !1, this._notify(s, i, t, "complete"), i.initial = !1), n += o.length;
    }), this._lastDate = t, n === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const n = this._charts;
    let i = n.get(t);
    return i || (i = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, n.set(t, i)), i;
  }
  listen(t, n, i) {
    this._getAnims(t).listeners[n].push(i);
  }
  add(t, n) {
    !n || !n.length || this._getAnims(t).items.push(...n);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const n = this._charts.get(t);
    n && (n.running = !0, n.start = Date.now(), n.duration = n.items.reduce((i, s) => Math.max(i, s._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const n = this._charts.get(t);
    return !(!n || !n.running || !n.items.length);
  }
  stop(t) {
    const n = this._charts.get(t);
    if (!n || !n.items.length)
      return;
    const i = n.items;
    let s = i.length - 1;
    for (; s >= 0; --s)
      i[s].cancel();
    n.items = [], this._notify(t, n, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var Q = /* @__PURE__ */ new ta();
const jn = "transparent", ea = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const i = Cn(e || jn), s = i.valid && Cn(t || jn);
    return s && s.valid ? s.mix(i, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class na {
  constructor(t, n, i, s) {
    const o = n[i];
    s = ie([
      t.to,
      s,
      o,
      t.from
    ]);
    const r = ie([
      t.from,
      o,
      s
    ]);
    this._active = !0, this._fn = t.fn || ea[t.type || typeof r], this._easing = Nt[t.easing] || Nt.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = i, this._from = r, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, i) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], o = i - this._start, r = this._duration - o;
      this._start = i, this._duration = Math.floor(Math.max(r, t.duration)), this._total += o, this._loop = !!t.loop, this._to = ie([
        t.to,
        n,
        s,
        t.from
      ]), this._from = ie([
        t.from,
        s,
        n
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const n = t - this._start, i = this._duration, s = this._prop, o = this._from, r = this._loop, a = this._to;
    let l;
    if (this._active = o !== a && (r || n < i), !this._active) {
      this._target[s] = a, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[s] = o;
      return;
    }
    l = n / i % 2, l = r && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[s] = this._fn(o, a, l);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((n, i) => {
      t.push({
        res: n,
        rej: i
      });
    });
  }
  _notify(t) {
    const n = t ? "res" : "rej", i = this._promises || [];
    for (let s = 0; s < i.length; s++)
      i[s][n]();
  }
}
class ia {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!M(t))
      return;
    const n = Object.keys(E.animation), i = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const o = t[s];
      if (!M(o))
        return;
      const r = {};
      for (const a of n)
        r[a] = o[a];
      (F(o.properties) && o.properties || [
        s
      ]).forEach((a) => {
        (a === s || !i.has(a)) && i.set(a, r);
      });
    });
  }
  _animateOptions(t, n) {
    const i = n.options, s = oa(t, i);
    if (!s)
      return [];
    const o = this._createAnimations(s, i);
    return i.$shared && sa(t.options.$animations, i).then(() => {
      t.options = i;
    }, () => {
    }), o;
  }
  _createAnimations(t, n) {
    const i = this._properties, s = [], o = t.$animations || (t.$animations = {}), r = Object.keys(n), a = Date.now();
    let l;
    for (l = r.length - 1; l >= 0; --l) {
      const c = r[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        s.push(...this._animateOptions(t, n));
        continue;
      }
      const h = n[c];
      let u = o[c];
      const d = i.get(c);
      if (u)
        if (d && u.active()) {
          u.update(d, h, a);
          continue;
        } else
          u.cancel();
      if (!d || !d.duration) {
        t[c] = h;
        continue;
      }
      o[c] = u = new na(d, t, c, h), s.push(u);
    }
    return s;
  }
  update(t, n) {
    if (this._properties.size === 0) {
      Object.assign(t, n);
      return;
    }
    const i = this._createAnimations(t, n);
    if (i.length)
      return Q.add(this._chart, i), !0;
  }
}
function sa(e, t) {
  const n = [], i = Object.keys(t);
  for (let s = 0; s < i.length; s++) {
    const o = e[i[s]];
    o && o.active() && n.push(o.wait());
  }
  return Promise.all(n);
}
function oa(e, t) {
  if (!t)
    return;
  let n = e.options;
  if (!n) {
    e.options = t;
    return;
  }
  return n.$shared && (e.options = n = Object.assign({}, n, {
    $shared: !1,
    $animations: {}
  })), n;
}
function $n(e, t) {
  const n = e && e.options || {}, i = n.reverse, s = n.min === void 0 ? t : 0, o = n.max === void 0 ? t : 0;
  return {
    start: i ? o : s,
    end: i ? s : o
  };
}
function ra(e, t, n) {
  if (n === !1)
    return !1;
  const i = $n(e, n), s = $n(t, n);
  return {
    top: s.end,
    right: i.end,
    bottom: s.start,
    left: i.start
  };
}
function aa(e) {
  let t, n, i, s;
  return M(e) ? (t = e.top, n = e.right, i = e.bottom, s = e.left) : t = n = i = s = e, {
    top: t,
    right: n,
    bottom: i,
    left: s,
    disabled: e === !1
  };
}
function ts(e, t) {
  const n = [], i = e._getSortedDatasetMetas(t);
  let s, o;
  for (s = 0, o = i.length; s < o; ++s)
    n.push(i[s].index);
  return n;
}
function Hn(e, t, n, i = {}) {
  const s = e.keys, o = i.mode === "single";
  let r, a, l, c;
  if (t === null)
    return;
  let h = !1;
  for (r = 0, a = s.length; r < a; ++r) {
    if (l = +s[r], l === n) {
      if (h = !0, i.all)
        continue;
      break;
    }
    c = e.values[l], N(c) && (o || t === 0 || vt(t) === vt(c)) && (t += c);
  }
  return !h && !i.all ? 0 : t;
}
function la(e, t) {
  const { iScale: n, vScale: i } = t, s = n.axis === "x" ? "x" : "y", o = i.axis === "x" ? "x" : "y", r = Object.keys(e), a = new Array(r.length);
  let l, c, h;
  for (l = 0, c = r.length; l < c; ++l)
    h = r[l], a[l] = {
      [s]: h,
      [o]: e[h]
    };
  return a;
}
function Te(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function ca(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function ha(e) {
  const { min: t, max: n, minDefined: i, maxDefined: s } = e.getUserBounds();
  return {
    min: i ? t : Number.NEGATIVE_INFINITY,
    max: s ? n : Number.POSITIVE_INFINITY
  };
}
function ua(e, t, n) {
  const i = e[t] || (e[t] = {});
  return i[n] || (i[n] = {});
}
function Wn(e, t, n, i) {
  for (const s of t.getMatchingVisibleMetas(i).reverse()) {
    const o = e[s.index];
    if (n && o > 0 || !n && o < 0)
      return s.index;
  }
  return null;
}
function Un(e, t) {
  const { chart: n, _cachedMeta: i } = e, s = n._stacks || (n._stacks = {}), { iScale: o, vScale: r, index: a } = i, l = o.axis, c = r.axis, h = ca(o, r, i), u = t.length;
  let d;
  for (let f = 0; f < u; ++f) {
    const m = t[f], { [l]: p, [c]: g } = m, b = m._stacks || (m._stacks = {});
    d = b[c] = ua(s, h, p), d[a] = g, d._top = Wn(d, r, !0, i.type), d._bottom = Wn(d, r, !1, i.type);
    const y = d._visualValues || (d._visualValues = {});
    y[a] = g;
  }
}
function Ie(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((i) => n[i].axis === t).shift();
}
function da(e, t) {
  return Mt(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function fa(e, t, n) {
  return Mt(e, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: n,
    index: t,
    mode: "default",
    type: "data"
  });
}
function Dt(e, t) {
  const n = e.controller.index, i = e.vScale && e.vScale.axis;
  if (i) {
    t = t || e._parsed;
    for (const s of t) {
      const o = s._stacks;
      if (!o || o[i] === void 0 || o[i][n] === void 0)
        return;
      delete o[i][n], o[i]._visualValues !== void 0 && o[i]._visualValues[n] !== void 0 && delete o[i]._visualValues[n];
    }
  }
}
const Le = (e) => e === "reset" || e === "none", Yn = (e, t) => t ? e : Object.assign({}, e), pa = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: ts(n, !0),
  values: null
};
class es {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Te(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Dt(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, i = this.getDataset(), s = (u, d, f, m) => u === "x" ? d : u === "r" ? m : f, o = n.xAxisID = O(i.xAxisID, Ie(t, "x")), r = n.yAxisID = O(i.yAxisID, Ie(t, "y")), a = n.rAxisID = O(i.rAxisID, Ie(t, "r")), l = n.indexAxis, c = n.iAxisID = s(l, o, r, a), h = n.vAxisID = s(l, r, o, a);
    n.xScale = this.getScaleForId(o), n.yScale = this.getScaleForId(r), n.rScale = this.getScaleForId(a), n.iScale = this.getScaleForId(c), n.vScale = this.getScaleForId(h);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const n = this._cachedMeta;
    return t === n.iScale ? n.vScale : n.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && Sn(this._data, this), t._stacked && Dt(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), i = this._data;
    if (M(n)) {
      const s = this._cachedMeta;
      this._data = la(n, s);
    } else if (i !== n) {
      if (i) {
        Sn(i, this);
        const s = this._cachedMeta;
        Dt(s), s._parsed = [];
      }
      n && Object.isExtensible(n) && Yo(n, this), this._syncList = [], this._data = n;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const n = this._cachedMeta, i = this.getDataset();
    let s = !1;
    this._dataCheck();
    const o = n._stacked;
    n._stacked = Te(n.vScale, n), n.stack !== i.stack && (s = !0, Dt(n), n.stack = i.stack), this._resyncElements(t), (s || o !== n._stacked) && (Un(this, n._parsed), n._stacked = Te(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), i = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(i, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: i, _data: s } = this, { iScale: o, _stacked: r } = i, a = o.axis;
    let l = t === 0 && n === s.length ? !0 : i._sorted, c = t > 0 && i._parsed[t - 1], h, u, d;
    if (this._parsing === !1)
      i._parsed = s, i._sorted = !0, d = s;
    else {
      F(s[t]) ? d = this.parseArrayData(i, s, t, n) : M(s[t]) ? d = this.parseObjectData(i, s, t, n) : d = this.parsePrimitiveData(i, s, t, n);
      const f = () => u[a] === null || c && u[a] < c[a];
      for (h = 0; h < n; ++h)
        i._parsed[h + t] = u = d[h], l && (f() && (l = !1), c = u);
      i._sorted = l;
    }
    r && Un(this, d);
  }
  parsePrimitiveData(t, n, i, s) {
    const { iScale: o, vScale: r } = t, a = o.axis, l = r.axis, c = o.getLabels(), h = o === r, u = new Array(s);
    let d, f, m;
    for (d = 0, f = s; d < f; ++d)
      m = d + i, u[d] = {
        [a]: h || o.parse(c[m], m),
        [l]: r.parse(n[m], m)
      };
    return u;
  }
  parseArrayData(t, n, i, s) {
    const { xScale: o, yScale: r } = t, a = new Array(s);
    let l, c, h, u;
    for (l = 0, c = s; l < c; ++l)
      h = l + i, u = n[h], a[l] = {
        x: o.parse(u[0], h),
        y: r.parse(u[1], h)
      };
    return a;
  }
  parseObjectData(t, n, i, s) {
    const { xScale: o, yScale: r } = t, { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(s);
    let h, u, d, f;
    for (h = 0, u = s; h < u; ++h)
      d = h + i, f = n[d], c[h] = {
        x: o.parse(ge(f, a), d),
        y: r.parse(ge(f, l), d)
      };
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, n, i) {
    const s = this.chart, o = this._cachedMeta, r = n[t.axis], a = {
      keys: ts(s, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return Hn(a, r, o.index, {
      mode: i
    });
  }
  updateRangeFromParsed(t, n, i, s) {
    const o = i[n.axis];
    let r = o === null ? NaN : o;
    const a = s && i._stacks[n.axis];
    s && a && (s.values = a, r = Hn(s, o, this._cachedMeta.index)), t.min = Math.min(t.min, r), t.max = Math.max(t.max, r);
  }
  getMinMax(t, n) {
    const i = this._cachedMeta, s = i._parsed, o = i._sorted && t === i.iScale, r = s.length, a = this._getOtherScale(t), l = pa(n, i, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: h, max: u } = ha(a);
    let d, f;
    function m() {
      f = s[d];
      const p = f[a.axis];
      return !N(f[t.axis]) || h > p || u < p;
    }
    for (d = 0; d < r && !(!m() && (this.updateRangeFromParsed(c, t, f, l), o)); ++d)
      ;
    if (o) {
      for (d = r - 1; d >= 0; --d)
        if (!m()) {
          this.updateRangeFromParsed(c, t, f, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, i = [];
    let s, o, r;
    for (s = 0, o = n.length; s < o; ++s)
      r = n[s][t.axis], N(r) && i.push(r);
    return i;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, i = n.iScale, s = n.vScale, o = this.getParsed(t);
    return {
      label: i ? "" + i.getLabelForValue(o[i.axis]) : "",
      value: s ? "" + s.getLabelForValue(o[s.axis]) : ""
    };
  }
  _update(t) {
    const n = this._cachedMeta;
    this.update(t || "default"), n._clip = aa(O(this.options.clip, ra(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, i = this._cachedMeta, s = i.data || [], o = n.chartArea, r = [], a = this._drawStart || 0, l = this._drawCount || s.length - a, c = this.options.drawActiveElementsOnTop;
    let h;
    for (i.dataset && i.dataset.draw(t, o, a, l), h = a; h < a + l; ++h) {
      const u = s[h];
      u.hidden || (u.active && c ? r.push(u) : u.draw(t, o));
    }
    for (h = 0; h < r.length; ++h)
      r[h].draw(t, o);
  }
  getStyle(t, n) {
    const i = n ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(i) : this.resolveDataElementOptions(t || 0, i);
  }
  getContext(t, n, i) {
    const s = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const r = this._cachedMeta.data[t];
      o = r.$context || (r.$context = fa(this.getContext(), t, r)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = da(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
    return o.active = !!n, o.mode = i, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", i) {
    const s = n === "active", o = this._cachedDataOpts, r = t + "-" + n, a = o[r], l = this.enableOptionSharing && me(i);
    if (a)
      return Yn(a, l);
    const c = this.chart.config, h = c.datasetElementScopeKeys(this._type, t), u = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], d = c.getOptionScopes(this.getDataset(), h), f = Object.keys(E.elements[t]), m = () => this.getContext(i, s, n), p = c.resolveNamedOptions(d, f, m, u);
    return p.$shared && (p.$shared = l, o[r] = Object.freeze(Yn(p, l))), p;
  }
  _resolveAnimations(t, n, i) {
    const s = this.chart, o = this._cachedDataOpts, r = `animation-${n}`, a = o[r];
    if (a)
      return a;
    let l;
    if (s.options.animation !== !1) {
      const h = this.chart.config, u = h.datasetAnimationScopeKeys(this._type, n), d = h.getOptionScopes(this.getDataset(), u);
      l = h.createResolver(d, this.getContext(t, i, n));
    }
    const c = new ia(s, l && l.animations);
    return l && l._cacheable && (o[r] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || Le(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const i = this.resolveDataElementOptions(t, n), s = this._sharedOptions, o = this.getSharedOptions(i), r = this.includeOptions(n, o) || o !== s;
    return this.updateSharedOptions(o, n, i), {
      sharedOptions: o,
      includeOptions: r
    };
  }
  updateElement(t, n, i, s) {
    Le(s) ? Object.assign(t, i) : this._resolveAnimations(n, s).update(t, i);
  }
  updateSharedOptions(t, n, i) {
    t && !Le(n) && this._resolveAnimations(void 0, n).update(t, i);
  }
  _setStyle(t, n, i, s) {
    t.active = s;
    const o = this.getStyle(n, s);
    this._resolveAnimations(n, i, s).update(t, {
      options: !s && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, n, i) {
    this._setStyle(t, i, "active", !1);
  }
  setHoverStyle(t, n, i) {
    this._setStyle(t, i, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const n = this._data, i = this._cachedMeta.data;
    for (const [a, l, c] of this._syncList)
      this[a](l, c);
    this._syncList = [];
    const s = i.length, o = n.length, r = Math.min(o, s);
    r && this.parse(0, r), o > s ? this._insertElements(s, o - s, t) : o < s && this._removeElements(o, s - o);
  }
  _insertElements(t, n, i = !0) {
    const s = this._cachedMeta, o = s.data, r = t + n;
    let a;
    const l = (c) => {
      for (c.length += n, a = c.length - 1; a >= r; a--)
        c[a] = c[a - n];
    };
    for (l(o), a = t; a < r; ++a)
      o[a] = new this.dataElementType();
    this._parsing && l(s._parsed), this.parse(t, n), i && this.updateElements(o, t, n, "reset");
  }
  updateElements(t, n, i, s) {
  }
  _removeElements(t, n) {
    const i = this._cachedMeta;
    if (this._parsing) {
      const s = i._parsed.splice(t, n);
      i._stacked && Dt(i, s);
    }
    i.data.splice(t, n);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [n, i, s] = t;
      this[n](i, s);
    }
    this.chart._dataChanges.push([
      this.index,
      ...t
    ]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - t,
      t
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(t, n) {
    n && this._sync([
      "_removeElements",
      t,
      n
    ]);
    const i = arguments.length - 2;
    i && this._sync([
      "_insertElements",
      t,
      i
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
class ga extends es {
  static id = "line";
  static defaults = {
    datasetElementType: "line",
    dataElementType: "point",
    showLine: !0,
    spanGaps: !1
  };
  static overrides = {
    scales: {
      _index_: {
        type: "category"
      },
      _value_: {
        type: "linear"
      }
    }
  };
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const n = this._cachedMeta, { dataset: i, data: s = [], _dataset: o } = n, r = this.chart._animationsDisabled;
    let { start: a, count: l } = qo(n, s, r);
    this._drawStart = a, this._drawCount = l, Zo(n) && (a = 0, l = s.length), i._chart = this.chart, i._datasetIndex = this.index, i._decimated = !!o._decimated, i.points = s;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(i, void 0, {
      animated: !r,
      options: c
    }, t), this.updateElements(s, a, l, t);
  }
  updateElements(t, n, i, s) {
    const o = s === "reset", { iScale: r, vScale: a, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: h, includeOptions: u } = this._getSharedOptions(n, s), d = r.axis, f = a.axis, { spanGaps: m, segment: p } = this.options, g = Ut(m) ? m : Number.POSITIVE_INFINITY, b = this.chart._animationsDisabled || o || s === "none", y = n + i, S = t.length;
    let P = n > 0 && this.getParsed(n - 1);
    for (let _ = 0; _ < S; ++_) {
      const k = t[_], x = b ? k : {};
      if (_ < n || _ >= y) {
        x.skip = !0;
        continue;
      }
      const v = this.getParsed(_), w = D(v[f]), C = x[d] = r.getPixelForValue(v[d], _), T = x[f] = o || w ? a.getBasePixel() : a.getPixelForValue(l ? this.applyStack(a, v, l) : v[f], _);
      x.skip = isNaN(C) || isNaN(T) || w, x.stop = _ > 0 && Math.abs(v[d] - P[d]) > g, p && (x.parsed = v, x.raw = c.data[_]), u && (x.options = h || this.resolveDataElementOptions(_, k.active ? "active" : s)), b || this.updateElement(k, _, x, s), P = v;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, n = t.dataset, i = n.options && n.options.borderWidth || 0, s = t.data || [];
    if (!s.length)
      return i;
    const o = s[0].size(this.resolveDataElementOptions(0)), r = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
    return Math.max(i, o, r) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
function ht() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class hn {
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(t) {
    Object.assign(hn.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return ht();
  }
  parse() {
    return ht();
  }
  format() {
    return ht();
  }
  add() {
    return ht();
  }
  diff() {
    return ht();
  }
  startOf() {
    return ht();
  }
  endOf() {
    return ht();
  }
}
var ma = {
  _date: hn
};
function ba(e, t, n, i) {
  const { controller: s, data: o, _sorted: r } = e, a = s._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (a && t === a.axis && t !== "r" && r && o.length) {
    const c = a._reversePixels ? Wo : gt;
    if (i) {
      if (s._sharedOptions) {
        const h = o[0], u = typeof h.getRange == "function" && h.getRange(t);
        if (u) {
          const d = c(o, t, n - u), f = c(o, t, n + u);
          return {
            lo: d.lo,
            hi: f.hi
          };
        }
      }
    } else {
      const h = c(o, t, n);
      if (l) {
        const { vScale: u } = s._cachedMeta, { _parsed: d } = e, f = d.slice(0, h.lo + 1).reverse().findIndex((p) => !D(p[u.axis]));
        h.lo -= Math.max(0, f);
        const m = d.slice(h.hi).findIndex((p) => !D(p[u.axis]));
        h.hi += Math.max(0, m);
      }
      return h;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function ke(e, t, n, i, s) {
  const o = e.getSortedVisibleDatasetMetas(), r = n[t];
  for (let a = 0, l = o.length; a < l; ++a) {
    const { index: c, data: h } = o[a], { lo: u, hi: d } = ba(o[a], t, r, s);
    for (let f = u; f <= d; ++f) {
      const m = h[f];
      m.skip || i(m, c, f);
    }
  }
}
function _a(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(i, s) {
    const o = t ? Math.abs(i.x - s.x) : 0, r = n ? Math.abs(i.y - s.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(r, 2));
  };
}
function Ee(e, t, n, i, s) {
  const o = [];
  return !s && !e.isPointInArea(t) || ke(e, n, t, function(a, l, c) {
    !s && !Yt(a, e.chartArea, 0) || a.inRange(t.x, t.y, i) && o.push({
      element: a,
      datasetIndex: l,
      index: c
    });
  }, !0), o;
}
function ya(e, t, n, i) {
  let s = [];
  function o(r, a, l) {
    const { startAngle: c, endAngle: h } = r.getProps([
      "startAngle",
      "endAngle"
    ], i), { angle: u } = jo(r, {
      x: t.x,
      y: t.y
    });
    Ni(u, c, h) && s.push({
      element: r,
      datasetIndex: a,
      index: l
    });
  }
  return ke(e, n, t, o), s;
}
function xa(e, t, n, i, s, o) {
  let r = [];
  const a = _a(n);
  let l = Number.POSITIVE_INFINITY;
  function c(h, u, d) {
    const f = h.inRange(t.x, t.y, s);
    if (i && !f)
      return;
    const m = h.getCenterPoint(s);
    if (!(!!o || e.isPointInArea(m)) && !f)
      return;
    const g = a(t, m);
    g < l ? (r = [
      {
        element: h,
        datasetIndex: u,
        index: d
      }
    ], l = g) : g === l && r.push({
      element: h,
      datasetIndex: u,
      index: d
    });
  }
  return ke(e, n, t, c), r;
}
function ze(e, t, n, i, s, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !i ? ya(e, t, n, s) : xa(e, t, n, i, s, o);
}
function Gn(e, t, n, i, s) {
  const o = [], r = n === "x" ? "inXRange" : "inYRange";
  let a = !1;
  return ke(e, n, t, (l, c, h) => {
    l[r] && l[r](t[n], s) && (o.push({
      element: l,
      datasetIndex: c,
      index: h
    }), a = a || l.inRange(t.x, t.y, s));
  }), i && !a ? [] : o;
}
var va = {
  modes: {
    index(e, t, n, i) {
      const s = ut(t, e), o = n.axis || "x", r = n.includeInvisible || !1, a = n.intersect ? Ee(e, s, o, i, r) : ze(e, s, o, !1, i, r), l = [];
      return a.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const h = a[0].index, u = c.data[h];
        u && !u.skip && l.push({
          element: u,
          datasetIndex: c.index,
          index: h
        });
      }), l) : [];
    },
    dataset(e, t, n, i) {
      const s = ut(t, e), o = n.axis || "xy", r = n.includeInvisible || !1;
      let a = n.intersect ? Ee(e, s, o, i, r) : ze(e, s, o, !1, i, r);
      if (a.length > 0) {
        const l = a[0].datasetIndex, c = e.getDatasetMeta(l).data;
        a = [];
        for (let h = 0; h < c.length; ++h)
          a.push({
            element: c[h],
            datasetIndex: l,
            index: h
          });
      }
      return a;
    },
    point(e, t, n, i) {
      const s = ut(t, e), o = n.axis || "xy", r = n.includeInvisible || !1;
      return Ee(e, s, o, i, r);
    },
    nearest(e, t, n, i) {
      const s = ut(t, e), o = n.axis || "xy", r = n.includeInvisible || !1;
      return ze(e, s, o, n.intersect, i, r);
    },
    x(e, t, n, i) {
      const s = ut(t, e);
      return Gn(e, s, "x", n.intersect, i);
    },
    y(e, t, n, i) {
      const s = ut(t, e);
      return Gn(e, s, "y", n.intersect, i);
    }
  }
};
const ns = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ct(e, t) {
  return e.filter((n) => n.pos === t);
}
function Kn(e, t) {
  return e.filter((n) => ns.indexOf(n.pos) === -1 && n.box.axis === t);
}
function Tt(e, t) {
  return e.sort((n, i) => {
    const s = t ? i : n, o = t ? n : i;
    return s.weight === o.weight ? s.index - o.index : s.weight - o.weight;
  });
}
function ka(e) {
  const t = [];
  let n, i, s, o, r, a;
  for (n = 0, i = (e || []).length; n < i; ++n)
    s = e[n], { position: o, options: { stack: r, stackWeight: a = 1 } } = s, t.push({
      index: n,
      box: s,
      pos: o,
      horizontal: s.isHorizontal(),
      weight: s.weight,
      stack: r && o + r,
      stackWeight: a
    });
  return t;
}
function wa(e) {
  const t = {};
  for (const n of e) {
    const { stack: i, pos: s, stackWeight: o } = n;
    if (!i || !ns.includes(s))
      continue;
    const r = t[i] || (t[i] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    r.count++, r.weight += o;
  }
  return t;
}
function Ma(e, t) {
  const n = wa(e), { vBoxMaxWidth: i, hBoxMaxHeight: s } = t;
  let o, r, a;
  for (o = 0, r = e.length; o < r; ++o) {
    a = e[o];
    const { fullSize: l } = a.box, c = n[a.stack], h = c && a.stackWeight / c.weight;
    a.horizontal ? (a.width = h ? h * i : l && t.availableWidth, a.height = s) : (a.width = i, a.height = h ? h * s : l && t.availableHeight);
  }
  return n;
}
function Sa(e) {
  const t = ka(e), n = Tt(t.filter((c) => c.box.fullSize), !0), i = Tt(Ct(t, "left"), !0), s = Tt(Ct(t, "right")), o = Tt(Ct(t, "top"), !0), r = Tt(Ct(t, "bottom")), a = Kn(t, "x"), l = Kn(t, "y");
  return {
    fullSize: n,
    leftAndTop: i.concat(o),
    rightAndBottom: s.concat(l).concat(r).concat(a),
    chartArea: Ct(t, "chartArea"),
    vertical: i.concat(s).concat(l),
    horizontal: o.concat(r).concat(a)
  };
}
function Xn(e, t, n, i) {
  return Math.max(e[n], t[n]) + Math.max(e[i], t[i]);
}
function is(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Pa(e, t, n, i) {
  const { pos: s, box: o } = n, r = e.maxPadding;
  if (!M(s)) {
    n.size && (e[s] -= n.size);
    const u = i[n.stack] || {
      size: 0,
      count: 1
    };
    u.size = Math.max(u.size, n.horizontal ? o.height : o.width), n.size = u.size / u.count, e[s] += n.size;
  }
  o.getPadding && is(r, o.getPadding());
  const a = Math.max(0, t.outerWidth - Xn(r, e, "left", "right")), l = Math.max(0, t.outerHeight - Xn(r, e, "top", "bottom")), c = a !== e.w, h = l !== e.h;
  return e.w = a, e.h = l, n.horizontal ? {
    same: c,
    other: h
  } : {
    same: h,
    other: c
  };
}
function Oa(e) {
  const t = e.maxPadding;
  function n(i) {
    const s = Math.max(t[i] - e[i], 0);
    return e[i] += s, s;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function Da(e, t) {
  const n = t.maxPadding;
  function i(s) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return s.forEach((r) => {
      o[r] = Math.max(t[r], n[r]);
    }), o;
  }
  return i(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function zt(e, t, n, i) {
  const s = [];
  let o, r, a, l, c, h;
  for (o = 0, r = e.length, c = 0; o < r; ++o) {
    a = e[o], l = a.box, l.update(a.width || t.w, a.height || t.h, Da(a.horizontal, t));
    const { same: u, other: d } = Pa(t, n, a, i);
    c |= u && s.length, h = h || d, l.fullSize || s.push(a);
  }
  return c && zt(s, t, n, i) || h;
}
function re(e, t, n, i, s) {
  e.top = n, e.left = t, e.right = t + i, e.bottom = n + s, e.width = i, e.height = s;
}
function qn(e, t, n, i) {
  const s = n.padding;
  let { x: o, y: r } = t;
  for (const a of e) {
    const l = a.box, c = i[a.stack] || {
      placed: 0,
      weight: 1
    }, h = a.stackWeight / c.weight || 1;
    if (a.horizontal) {
      const u = t.w * h, d = c.size || l.height;
      me(c.start) && (r = c.start), l.fullSize ? re(l, s.left, r, n.outerWidth - s.right - s.left, d) : re(l, t.left + c.placed, r, u, d), c.start = r, c.placed += u, r = l.bottom;
    } else {
      const u = t.h * h, d = c.size || l.width;
      me(c.start) && (o = c.start), l.fullSize ? re(l, o, s.top, d, n.outerHeight - s.bottom - s.top) : re(l, o, t.top + c.placed, d, u), c.start = o, c.placed += u, o = l.right;
    }
  }
  t.x = o, t.y = r;
}
var ae = {
  addBox(e, t) {
    e.boxes || (e.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(n) {
            t.draw(n);
          }
        }
      ];
    }, e.boxes.push(t);
  },
  removeBox(e, t) {
    const n = e.boxes ? e.boxes.indexOf(t) : -1;
    n !== -1 && e.boxes.splice(n, 1);
  },
  configure(e, t, n) {
    t.fullSize = n.fullSize, t.position = n.position, t.weight = n.weight;
  },
  update(e, t, n, i) {
    if (!e)
      return;
    const s = Gt(e.options.layout.padding), o = Math.max(t - s.width, 0), r = Math.max(n - s.height, 0), a = Sa(e.boxes), l = a.vertical, c = a.horizontal;
    R(e.boxes, (p) => {
      typeof p.beforeLayout == "function" && p.beforeLayout();
    });
    const h = l.reduce((p, g) => g.box.options && g.box.options.display === !1 ? p : p + 1, 0) || 1, u = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: s,
      availableWidth: o,
      availableHeight: r,
      vBoxMaxWidth: o / 2 / h,
      hBoxMaxHeight: r / 2
    }), d = Object.assign({}, s);
    is(d, Gt(i));
    const f = Object.assign({
      maxPadding: d,
      w: o,
      h: r,
      x: s.left,
      y: s.top
    }, s), m = Ma(l.concat(c), u);
    zt(a.fullSize, f, u, m), zt(l, f, u, m), zt(c, f, u, m) && zt(l, f, u, m), Oa(f), qn(a.leftAndTop, f, u, m), f.x += f.w, f.y += f.h, qn(a.rightAndBottom, f, u, m), e.chartArea = {
      left: f.left,
      top: f.top,
      right: f.left + f.w,
      bottom: f.top + f.h,
      height: f.h,
      width: f.w
    }, R(a.chartArea, (p) => {
      const g = p.box;
      Object.assign(g, e.chartArea), g.update(f.w, f.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class ss {
  acquireContext(t, n) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, n, i) {
  }
  removeEventListener(t, n, i) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, n, i, s) {
    return n = Math.max(0, n || t.width), i = i || t.height, {
      width: n,
      height: Math.max(0, s ? Math.floor(n / s) : i)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class Ca extends ss {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const de = "$chartjs", Ta = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Zn = (e) => e === null || e === "";
function Ia(e, t) {
  const n = e.style, i = e.getAttribute("height"), s = e.getAttribute("width");
  if (e[de] = {
    initial: {
      height: i,
      width: s,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", Zn(s)) {
    const o = Rn(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (Zn(i))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = Rn(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const os = Wr ? {
  passive: !0
} : !1;
function La(e, t, n) {
  e && e.addEventListener(t, n, os);
}
function Ea(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, os);
}
function za(e, t) {
  const n = Ta[e.type] || e.type, { x: i, y: s } = ut(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: i !== void 0 ? i : null,
    y: s !== void 0 ? s : null
  };
}
function ye(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function Aa(e, t, n) {
  const i = e.canvas, s = new MutationObserver((o) => {
    let r = !1;
    for (const a of o)
      r = r || ye(a.addedNodes, i), r = r && !ye(a.removedNodes, i);
    r && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function Fa(e, t, n) {
  const i = e.canvas, s = new MutationObserver((o) => {
    let r = !1;
    for (const a of o)
      r = r || ye(a.removedNodes, i), r = r && !ye(a.addedNodes, i);
    r && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const Kt = /* @__PURE__ */ new Map();
let Qn = 0;
function rs() {
  const e = window.devicePixelRatio;
  e !== Qn && (Qn = e, Kt.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function Ra(e, t) {
  Kt.size || window.addEventListener("resize", rs), Kt.set(e, t);
}
function Na(e) {
  Kt.delete(e), Kt.size || window.removeEventListener("resize", rs);
}
function Ba(e, t, n) {
  const i = e.canvas, s = i && cn(i);
  if (!s)
    return;
  const o = $i((a, l) => {
    const c = s.clientWidth;
    n(a, l), c < s.clientWidth && n();
  }, window), r = new ResizeObserver((a) => {
    const l = a[0], c = l.contentRect.width, h = l.contentRect.height;
    c === 0 && h === 0 || o(c, h);
  });
  return r.observe(s), Ra(e, o), r;
}
function Ae(e, t, n) {
  n && n.disconnect(), t === "resize" && Na(e);
}
function Va(e, t, n) {
  const i = e.canvas, s = $i((o) => {
    e.ctx !== null && n(za(o, e));
  }, e);
  return La(i, t, s), s;
}
class ja extends ss {
  acquireContext(t, n) {
    const i = t && t.getContext && t.getContext("2d");
    return i && i.canvas === t ? (Ia(t, n), i) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[de])
      return !1;
    const i = n[de].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const r = i[o];
      D(r) ? n.removeAttribute(o) : n.setAttribute(o, r);
    });
    const s = i.style || {};
    return Object.keys(s).forEach((o) => {
      n.style[o] = s[o];
    }), n.width = n.width, delete n[de], !0;
  }
  addEventListener(t, n, i) {
    this.removeEventListener(t, n);
    const s = t.$proxies || (t.$proxies = {}), r = {
      attach: Aa,
      detach: Fa,
      resize: Ba
    }[n] || Va;
    s[n] = r(t, n, i);
  }
  removeEventListener(t, n) {
    const i = t.$proxies || (t.$proxies = {}), s = i[n];
    if (!s)
      return;
    ({
      attach: Ae,
      detach: Ae,
      resize: Ae
    }[n] || Ea)(t, n, s), i[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, i, s) {
    return Hr(t, n, i, s);
  }
  isAttached(t) {
    const n = t && cn(t);
    return !!(n && n.isConnected);
  }
}
function $a(e) {
  return !ln() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Ca : ja;
}
class we {
  static defaults = {};
  static defaultRoutes = void 0;
  x;
  y;
  active = !1;
  options;
  $animations;
  tooltipPosition(t) {
    const { x: n, y: i } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: n,
      y: i
    };
  }
  hasValue() {
    return Ut(this.x) && Ut(this.y);
  }
  getProps(t, n) {
    const i = this.$animations;
    if (!n || !i)
      return this;
    const s = {};
    return t.forEach((o) => {
      s[o] = i[o] && i[o].active() ? i[o]._to : this[o];
    }), s;
  }
}
function Ha(e, t) {
  const n = e.options.ticks, i = Wa(e), s = Math.min(n.maxTicksLimit || i, i), o = n.major.enabled ? Ya(t) : [], r = o.length, a = o[0], l = o[r - 1], c = [];
  if (r > s)
    return Ga(t, c, o, r / s), c;
  const h = Ua(o, t, s);
  if (r > 0) {
    let u, d;
    const f = r > 1 ? Math.round((l - a) / (r - 1)) : null;
    for (le(t, c, h, D(f) ? 0 : a - f, a), u = 0, d = r - 1; u < d; u++)
      le(t, c, h, o[u], o[u + 1]);
    return le(t, c, h, l, D(f) ? t.length : l + f), c;
  }
  return le(t, c, h), c;
}
function Wa(e) {
  const t = e.options.offset, n = e._tickSize(), i = e._length / n + (t ? 0 : 1), s = e._maxLength / n;
  return Math.floor(Math.min(i, s));
}
function Ua(e, t, n) {
  const i = Ka(e), s = t.length / n;
  if (!i)
    return Math.max(s, 1);
  const o = Fo(i);
  for (let r = 0, a = o.length - 1; r < a; r++) {
    const l = o[r];
    if (l > s)
      return l;
  }
  return Math.max(s, 1);
}
function Ya(e) {
  const t = [];
  let n, i;
  for (n = 0, i = e.length; n < i; n++)
    e[n].major && t.push(n);
  return t;
}
function Ga(e, t, n, i) {
  let s = 0, o = n[0], r;
  for (i = Math.ceil(i), r = 0; r < e.length; r++)
    r === o && (t.push(e[r]), s++, o = n[s * i]);
}
function le(e, t, n, i, s) {
  const o = O(i, 0), r = Math.min(O(s, e.length), e.length);
  let a = 0, l, c, h;
  for (n = Math.ceil(n), s && (l = s - i, n = l / Math.floor(l / n)), h = o; h < 0; )
    a++, h = Math.round(o + a * n);
  for (c = Math.max(o, 0); c < r; c++)
    c === h && (t.push(e[c]), a++, h = Math.round(o + a * n));
}
function Ka(e) {
  const t = e.length;
  let n, i;
  if (t < 2)
    return !1;
  for (i = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== i)
      return !1;
  return i;
}
const Xa = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Jn = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, ti = (e, t) => Math.min(t || e, e);
function ei(e, t) {
  const n = [], i = e.length / t, s = e.length;
  let o = 0;
  for (; o < s; o += i)
    n.push(e[Math.floor(o)]);
  return n;
}
function qa(e, t, n) {
  const i = e.ticks.length, s = Math.min(t, i - 1), o = e._startPixel, r = e._endPixel, a = 1e-6;
  let l = e.getPixelForTick(s), c;
  if (!(n && (i === 1 ? c = Math.max(l - o, r - l) : t === 0 ? c = (e.getPixelForTick(1) - l) / 2 : c = (l - e.getPixelForTick(s - 1)) / 2, l += s < t ? c : -c, l < o - a || l > r + a)))
    return l;
}
function Za(e, t) {
  R(e, (n) => {
    const i = n.gc, s = i.length / 2;
    let o;
    if (s > t) {
      for (o = 0; o < s; ++o)
        delete n.data[i[o]];
      i.splice(0, s);
    }
  });
}
function It(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function ni(e, t) {
  if (!e.display)
    return 0;
  const n = je(e.font, t), i = Gt(e.padding);
  return (F(e.text) ? e.text.length : 1) * n.lineHeight + i.height;
}
function Qa(e, t) {
  return Mt(e, {
    scale: t,
    type: "scale"
  });
}
function Ja(e, t, n) {
  return Mt(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function tl(e, t, n) {
  let i = Xo(e);
  return (n && t !== "right" || !n && t === "right") && (i = Xa(i)), i;
}
function el(e, t, n, i) {
  const { top: s, left: o, bottom: r, right: a, chart: l } = e, { chartArea: c, scales: h } = l;
  let u = 0, d, f, m;
  const p = r - s, g = a - o;
  if (e.isHorizontal()) {
    if (f = Pn(i, o, a), M(n)) {
      const b = Object.keys(n)[0], y = n[b];
      m = h[b].getPixelForValue(y) + p - t;
    } else n === "center" ? m = (c.bottom + c.top) / 2 + p - t : m = Jn(e, n, t);
    d = a - o;
  } else {
    if (M(n)) {
      const b = Object.keys(n)[0], y = n[b];
      f = h[b].getPixelForValue(y) - g + t;
    } else n === "center" ? f = (c.left + c.right) / 2 - g + t : f = Jn(e, n, t);
    m = Pn(i, r, s), u = n === "left" ? -nt : nt;
  }
  return {
    titleX: f,
    titleY: m,
    maxWidth: d,
    rotation: u
  };
}
class St extends we {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, n) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: n, _suggestedMin: i, _suggestedMax: s } = this;
    return t = G(t, Number.POSITIVE_INFINITY), n = G(n, Number.NEGATIVE_INFINITY), i = G(i, Number.POSITIVE_INFINITY), s = G(s, Number.NEGATIVE_INFINITY), {
      min: G(t, i),
      max: G(n, s),
      minDefined: N(t),
      maxDefined: N(n)
    };
  }
  getMinMax(t) {
    let { min: n, max: i, minDefined: s, maxDefined: o } = this.getUserBounds(), r;
    if (s && o)
      return {
        min: n,
        max: i
      };
    const a = this.getMatchingVisibleMetas();
    for (let l = 0, c = a.length; l < c; ++l)
      r = a[l].controller.getMinMax(this, t), s || (n = Math.min(n, r.min)), o || (i = Math.max(i, r.max));
    return n = o && n > i ? i : n, i = s && n > i ? n : i, {
      min: G(n, G(i, n)),
      max: G(i, G(n, i))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    L(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, n, i) {
    const { beginAtZero: s, grace: o, ticks: r } = this.options, a = r.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = n, this._margins = i = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, i), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + i.left + i.right : this.height + i.top + i.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = vr(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = a < this.ticks.length;
    this._convertTicksToLabels(l ? ei(this.ticks, a) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), r.display && (r.autoSkip || r.source === "auto") && (this.ticks = Ha(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, i;
    this.isHorizontal() ? (n = this.left, i = this.right) : (n = this.top, i = this.bottom, t = !t), this._startPixel = n, this._endPixel = i, this._reversePixels = t, this._length = i - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    L(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    L(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    L(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), L(this.options[t], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    L(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let i, s, o;
    for (i = 0, s = t.length; i < s; i++)
      o = t[i], o.label = L(n.callback, [
        o.value,
        i,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    L(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    L(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, n = t.ticks, i = ti(this.ticks.length, t.ticks.maxTicksLimit), s = n.minRotation || 0, o = n.maxRotation;
    let r = s, a, l, c;
    if (!this._isVisible() || !n.display || s >= o || i <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const h = this._getLabelSizes(), u = h.widest.width, d = h.highest.height, f = q(this.chart.width - u, 0, this.maxWidth);
    a = t.offset ? this.maxWidth / i : f / (i - 1), u + 6 > a && (a = f / (i - (t.offset ? 0.5 : 1)), l = this.maxHeight - It(t.grid) - n.padding - ni(t.title, this.chart.options.font), c = Math.sqrt(u * u + d * d), r = Vo(Math.min(Math.asin(q((h.highest.height + 6) / a, -1, 1)), Math.asin(q(l / c, -1, 1)) - Math.asin(q(d / c, -1, 1)))), r = Math.max(s, Math.min(o, r))), this.labelRotation = r;
  }
  afterCalculateLabelRotation() {
    L(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    L(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: i, title: s, grid: o } } = this, r = this._isVisible(), a = this.isHorizontal();
    if (r) {
      const l = ni(s, n.options.font);
      if (a ? (t.width = this.maxWidth, t.height = It(o) + l) : (t.height = this.maxHeight, t.width = It(o) + l), i.display && this.ticks.length) {
        const { first: c, last: h, widest: u, highest: d } = this._getLabelSizes(), f = i.padding * 2, m = pt(this.labelRotation), p = Math.cos(m), g = Math.sin(m);
        if (a) {
          const b = i.mirror ? 0 : g * u.width + p * d.height;
          t.height = Math.min(this.maxHeight, t.height + b + f);
        } else {
          const b = i.mirror ? 0 : p * u.width + g * d.height;
          t.width = Math.min(this.maxWidth, t.width + b + f);
        }
        this._calculatePadding(c, h, g, p);
      }
    }
    this._handleMargins(), a ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, i, s) {
    const { ticks: { align: o, padding: r }, position: a } = this.options, l = this.labelRotation !== 0, c = a !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left, u = this.right - this.getPixelForTick(this.ticks.length - 1);
      let d = 0, f = 0;
      l ? c ? (d = s * t.width, f = i * n.height) : (d = i * t.height, f = s * n.width) : o === "start" ? f = n.width : o === "end" ? d = t.width : o !== "inner" && (d = t.width / 2, f = n.width / 2), this.paddingLeft = Math.max((d - h + r) * this.width / (this.width - h), 0), this.paddingRight = Math.max((f - u + r) * this.width / (this.width - u), 0);
    } else {
      let h = n.height / 2, u = t.height / 2;
      o === "start" ? (h = 0, u = t.height) : o === "end" && (h = n.height, u = 0), this.paddingTop = h + r, this.paddingBottom = u + r;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    L(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: n } = this.options;
    return n === "top" || n === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let n, i;
    for (n = 0, i = t.length; n < i; n++)
      D(t[n].label) && (t.splice(n, 1), i--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let i = this.ticks;
      n < i.length && (i = ei(i, n)), this._labelSizes = t = this._computeLabelSizes(i, i.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, i) {
    const { ctx: s, _longestTextCache: o } = this, r = [], a = [], l = Math.floor(n / ti(n, i));
    let c = 0, h = 0, u, d, f, m, p, g, b, y, S, P, _;
    for (u = 0; u < n; u += l) {
      if (m = t[u].label, p = this._resolveTickFontOptions(u), s.font = g = p.string, b = o[g] = o[g] || {
        data: {},
        gc: []
      }, y = p.lineHeight, S = P = 0, !D(m) && !F(m))
        S = In(s, b.data, b.gc, S, m), P = y;
      else if (F(m))
        for (d = 0, f = m.length; d < f; ++d)
          _ = m[d], !D(_) && !F(_) && (S = In(s, b.data, b.gc, S, _), P += y);
      r.push(S), a.push(P), c = Math.max(S, c), h = Math.max(P, h);
    }
    Za(o, n);
    const k = r.indexOf(c), x = a.indexOf(h), v = (w) => ({
      width: r[w] || 0,
      height: a[w] || 0
    });
    return {
      first: v(0),
      last: v(n - 1),
      widest: v(k),
      highest: v(x),
      widths: r,
      heights: a
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, n) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const n = this.ticks;
    return t < 0 || t > n.length - 1 ? null : this.getPixelForValue(n[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const n = this._startPixel + t * this._length;
    return Ho(this._alignToPixels ? ct(this.chart, n, 0) : n);
  }
  getDecimalForPixel(t) {
    const n = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - n : n;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: n } = this;
    return t < 0 && n < 0 ? n : t > 0 && n > 0 ? t : 0;
  }
  getContext(t) {
    const n = this.ticks || [];
    if (t >= 0 && t < n.length) {
      const i = n[t];
      return i.$context || (i.$context = Ja(this.getContext(), t, i));
    }
    return this.$context || (this.$context = Qa(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = pt(this.labelRotation), i = Math.abs(Math.cos(n)), s = Math.abs(Math.sin(n)), o = this._getLabelSizes(), r = t.autoSkipPadding || 0, a = o ? o.widest.width + r : 0, l = o ? o.highest.height + r : 0;
    return this.isHorizontal() ? l * i > a * s ? a / i : l / s : l * s < a * i ? l / i : a / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, i = this.chart, s = this.options, { grid: o, position: r, border: a } = s, l = o.offset, c = this.isHorizontal(), u = this.ticks.length + (l ? 1 : 0), d = It(o), f = [], m = a.setContext(this.getContext()), p = m.display ? m.width : 0, g = p / 2, b = function(A) {
      return ct(i, A, p);
    };
    let y, S, P, _, k, x, v, w, C, T, z, Y;
    if (r === "top")
      y = b(this.bottom), x = this.bottom - d, w = y - g, T = b(t.top) + g, Y = t.bottom;
    else if (r === "bottom")
      y = b(this.top), T = t.top, Y = b(t.bottom) - g, x = y + g, w = this.top + d;
    else if (r === "left")
      y = b(this.right), k = this.right - d, v = y - g, C = b(t.left) + g, z = t.right;
    else if (r === "right")
      y = b(this.left), C = t.left, z = b(t.right) - g, k = y + g, v = this.left + d;
    else if (n === "x") {
      if (r === "center")
        y = b((t.top + t.bottom) / 2 + 0.5);
      else if (M(r)) {
        const A = Object.keys(r)[0], W = r[A];
        y = b(this.chart.scales[A].getPixelForValue(W));
      }
      T = t.top, Y = t.bottom, x = y + g, w = x + d;
    } else if (n === "y") {
      if (r === "center")
        y = b((t.left + t.right) / 2);
      else if (M(r)) {
        const A = Object.keys(r)[0], W = r[A];
        y = b(this.chart.scales[A].getPixelForValue(W));
      }
      k = y - g, v = k - d, C = t.left, z = t.right;
    }
    const tt = O(s.ticks.maxTicksLimit, u), I = Math.max(1, Math.ceil(u / tt));
    for (S = 0; S < u; S += I) {
      const A = this.getContext(S), W = o.setContext(A), qt = a.setContext(A), Zt = W.lineWidth, _t = W.color, Qt = qt.dash || [], yt = qt.dashOffset, Pt = W.tickWidth, rt = W.tickColor, Ot = W.tickBorderDash || [], at = W.tickBorderDashOffset;
      P = qa(this, S, l), P !== void 0 && (_ = ct(i, P, Zt), c ? k = v = C = z = _ : x = w = T = Y = _, f.push({
        tx1: k,
        ty1: x,
        tx2: v,
        ty2: w,
        x1: C,
        y1: T,
        x2: z,
        y2: Y,
        width: Zt,
        color: _t,
        borderDash: Qt,
        borderDashOffset: yt,
        tickWidth: Pt,
        tickColor: rt,
        tickBorderDash: Ot,
        tickBorderDashOffset: at
      }));
    }
    return this._ticksLength = u, this._borderValue = y, f;
  }
  _computeLabelItems(t) {
    const n = this.axis, i = this.options, { position: s, ticks: o } = i, r = this.isHorizontal(), a = this.ticks, { align: l, crossAlign: c, padding: h, mirror: u } = o, d = It(i.grid), f = d + h, m = u ? -h : f, p = -pt(this.labelRotation), g = [];
    let b, y, S, P, _, k, x, v, w, C, T, z, Y = "middle";
    if (s === "top")
      k = this.bottom - m, x = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      k = this.top + m, x = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const I = this._getYAxisLabelAlignment(d);
      x = I.textAlign, _ = I.x;
    } else if (s === "right") {
      const I = this._getYAxisLabelAlignment(d);
      x = I.textAlign, _ = I.x;
    } else if (n === "x") {
      if (s === "center")
        k = (t.top + t.bottom) / 2 + f;
      else if (M(s)) {
        const I = Object.keys(s)[0], A = s[I];
        k = this.chart.scales[I].getPixelForValue(A) + f;
      }
      x = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (s === "center")
        _ = (t.left + t.right) / 2 - f;
      else if (M(s)) {
        const I = Object.keys(s)[0], A = s[I];
        _ = this.chart.scales[I].getPixelForValue(A);
      }
      x = this._getYAxisLabelAlignment(d).textAlign;
    }
    n === "y" && (l === "start" ? Y = "top" : l === "end" && (Y = "bottom"));
    const tt = this._getLabelSizes();
    for (b = 0, y = a.length; b < y; ++b) {
      S = a[b], P = S.label;
      const I = o.setContext(this.getContext(b));
      v = this.getPixelForTick(b) + o.labelOffset, w = this._resolveTickFontOptions(b), C = w.lineHeight, T = F(P) ? P.length : 1;
      const A = T / 2, W = I.color, qt = I.textStrokeColor, Zt = I.textStrokeWidth;
      let _t = x;
      r ? (_ = v, x === "inner" && (b === y - 1 ? _t = this.options.reverse ? "left" : "right" : b === 0 ? _t = this.options.reverse ? "right" : "left" : _t = "center"), s === "top" ? c === "near" || p !== 0 ? z = -T * C + C / 2 : c === "center" ? z = -tt.highest.height / 2 - A * C + C : z = -tt.highest.height + C / 2 : c === "near" || p !== 0 ? z = C / 2 : c === "center" ? z = tt.highest.height / 2 - A * C : z = tt.highest.height - T * C, u && (z *= -1), p !== 0 && !I.showLabelBackdrop && (_ += C / 2 * Math.sin(p))) : (k = v, z = (1 - T) * C / 2);
      let Qt;
      if (I.showLabelBackdrop) {
        const yt = Gt(I.backdropPadding), Pt = tt.heights[b], rt = tt.widths[b];
        let Ot = z - yt.top, at = 0 - yt.left;
        switch (Y) {
          case "middle":
            Ot -= Pt / 2;
            break;
          case "bottom":
            Ot -= Pt;
            break;
        }
        switch (x) {
          case "center":
            at -= rt / 2;
            break;
          case "right":
            at -= rt;
            break;
          case "inner":
            b === y - 1 ? at -= rt : b > 0 && (at -= rt / 2);
            break;
        }
        Qt = {
          left: at,
          top: Ot,
          width: rt + yt.width,
          height: Pt + yt.height,
          color: I.backdropColor
        };
      }
      g.push({
        label: P,
        font: w,
        textOffset: z,
        options: {
          rotation: p,
          color: W,
          strokeColor: qt,
          strokeWidth: Zt,
          textAlign: _t,
          textBaseline: Y,
          translation: [
            _,
            k
          ],
          backdrop: Qt
        }
      });
    }
    return g;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-pt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let s = "center";
    return n.align === "start" ? s = "left" : n.align === "end" ? s = "right" : n.align === "inner" && (s = "inner"), s;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: i, mirror: s, padding: o } } = this.options, r = this._getLabelSizes(), a = t + o, l = r.widest.width;
    let c, h;
    return n === "left" ? s ? (h = this.right + o, i === "near" ? c = "left" : i === "center" ? (c = "center", h += l / 2) : (c = "right", h += l)) : (h = this.right - a, i === "near" ? c = "right" : i === "center" ? (c = "center", h -= l / 2) : (c = "left", h = this.left)) : n === "right" ? s ? (h = this.left + o, i === "near" ? c = "right" : i === "center" ? (c = "center", h -= l / 2) : (c = "left", h -= l)) : (h = this.left + a, i === "near" ? c = "left" : i === "center" ? (c = "center", h += l / 2) : (c = "right", h = this.right)) : c = "right", {
      textAlign: c,
      x: h
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, n = this.options.position;
    if (n === "left" || n === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (n === "top" || n === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: n }, left: i, top: s, width: o, height: r } = this;
    n && (t.save(), t.fillStyle = n, t.fillRect(i, s, o, r), t.restore());
  }
  getLineWidthForValue(t) {
    const n = this.options.grid;
    if (!this._isVisible() || !n.display)
      return 0;
    const s = this.ticks.findIndex((o) => o.value === t);
    return s >= 0 ? n.setContext(this.getContext(s)).lineWidth : 0;
  }
  drawGrid(t) {
    const n = this.options.grid, i = this.ctx, s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, r;
    const a = (l, c, h) => {
      !h.width || !h.color || (i.save(), i.lineWidth = h.width, i.strokeStyle = h.color, i.setLineDash(h.borderDash || []), i.lineDashOffset = h.borderDashOffset, i.beginPath(), i.moveTo(l.x, l.y), i.lineTo(c.x, c.y), i.stroke(), i.restore());
    };
    if (n.display)
      for (o = 0, r = s.length; o < r; ++o) {
        const l = s[o];
        n.drawOnChartArea && a({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), n.drawTicks && a({
          x: l.tx1,
          y: l.ty1
        }, {
          x: l.tx2,
          y: l.ty2
        }, {
          color: l.tickColor,
          width: l.tickWidth,
          borderDash: l.tickBorderDash,
          borderDashOffset: l.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: n, options: { border: i, grid: s } } = this, o = i.setContext(this.getContext()), r = i.display ? o.width : 0;
    if (!r)
      return;
    const a = s.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let c, h, u, d;
    this.isHorizontal() ? (c = ct(t, this.left, r) - r / 2, h = ct(t, this.right, a) + a / 2, u = d = l) : (u = ct(t, this.top, r) - r / 2, d = ct(t, this.bottom, a) + a / 2, c = h = l), n.save(), n.lineWidth = o.width, n.strokeStyle = o.color, n.beginPath(), n.moveTo(c, u), n.lineTo(h, d), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const i = this.ctx, s = this._computeLabelArea();
    s && nn(i, s);
    const o = this.getLabelItems(t);
    for (const r of o) {
      const a = r.options, l = r.font, c = r.label, h = r.textOffset;
      En(i, c, 0, h, l, a);
    }
    s && sn(i);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: i, reverse: s } } = this;
    if (!i.display)
      return;
    const o = je(i.font), r = Gt(i.padding), a = i.align;
    let l = o.lineHeight / 2;
    n === "bottom" || n === "center" || M(n) ? (l += r.bottom, F(i.text) && (l += o.lineHeight * (i.text.length - 1))) : l += r.top;
    const { titleX: c, titleY: h, maxWidth: u, rotation: d } = el(this, l, n, a);
    En(t, i.text, 0, 0, o, {
      color: i.color,
      maxWidth: u,
      rotation: d,
      textAlign: tl(a, n, s),
      textBaseline: "middle",
      translation: [
        c,
        h
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, n = t.ticks && t.ticks.z || 0, i = O(t.grid && t.grid.z, -1), s = O(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== St.prototype.draw ? [
      {
        z: n,
        draw: (o) => {
          this.draw(o);
        }
      }
    ] : [
      {
        z: i,
        draw: (o) => {
          this.drawBackground(), this.drawGrid(o), this.drawTitle();
        }
      },
      {
        z: s,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: n,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const n = this.chart.getSortedVisibleDatasetMetas(), i = this.axis + "AxisID", s = [];
    let o, r;
    for (o = 0, r = n.length; o < r; ++o) {
      const a = n[o];
      a[i] === this.id && (!t || a.type === t) && s.push(a);
    }
    return s;
  }
  _resolveTickFontOptions(t) {
    const n = this.options.ticks.setContext(this.getContext(t));
    return je(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class ce {
  constructor(t, n, i) {
    this.type = t, this.scope = n, this.override = i, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let i;
    sl(n) && (i = this.register(n));
    const s = this.items, o = t.id, r = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in s || (s[o] = t, nl(t, r, i), this.override && E.override(t.id, t.overrides)), r;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, i = t.id, s = this.scope;
    i in n && delete n[i], s && i in E[s] && (delete E[s][i], this.override && delete bt[i]);
  }
}
function nl(e, t, n) {
  const i = Wt(/* @__PURE__ */ Object.create(null), [
    n ? E.get(n) : {},
    E.get(t),
    e.defaults
  ]);
  E.set(t, i), e.defaultRoutes && il(t, e.defaultRoutes), e.descriptors && E.describe(t, e.descriptors);
}
function il(e, t) {
  Object.keys(t).forEach((n) => {
    const i = n.split("."), s = i.pop(), o = [
      e
    ].concat(i).join("."), r = t[n].split("."), a = r.pop(), l = r.join(".");
    E.route(o, s, l, a);
  });
}
function sl(e) {
  return "id" in e && "defaults" in e;
}
class ol {
  constructor() {
    this.controllers = new ce(es, "datasets", !0), this.elements = new ce(we, "elements"), this.plugins = new ce(Object, "plugins"), this.scales = new ce(St, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, n, i) {
    [
      ...n
    ].forEach((s) => {
      const o = i || this._getRegistryForType(s);
      i || o.isForType(s) || o === this.plugins && s.id ? this._exec(t, o, s) : R(s, (r) => {
        const a = i || this._getRegistryForType(r);
        this._exec(t, a, r);
      });
    });
  }
  _exec(t, n, i) {
    const s = Je(t);
    L(i["before" + s], [], i), n[t](i), L(i["after" + s], [], i);
  }
  _getRegistryForType(t) {
    for (let n = 0; n < this._typedRegistries.length; n++) {
      const i = this._typedRegistries[n];
      if (i.isForType(t))
        return i;
    }
    return this.plugins;
  }
  _get(t, n, i) {
    const s = n.get(t);
    if (s === void 0)
      throw new Error('"' + t + '" is not a registered ' + i + ".");
    return s;
  }
}
var K = /* @__PURE__ */ new ol();
class rl {
  constructor() {
    this._init = void 0;
  }
  notify(t, n, i, s) {
    if (n === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const o = s ? this._descriptors(t).filter(s) : this._descriptors(t), r = this._notify(o, t, n, i);
    return n === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), r;
  }
  _notify(t, n, i, s) {
    s = s || {};
    for (const o of t) {
      const r = o.plugin, a = r[i], l = [
        n,
        s,
        o.options
      ];
      if (L(a, l, r) === !1 && s.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    D(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const i = t && t.config, s = O(i.options && i.options.plugins, {}), o = al(i);
    return s === !1 && !n ? [] : cl(t, o, s, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], i = this._cache, s = (o, r) => o.filter((a) => !r.some((l) => a.plugin.id === l.plugin.id));
    this._notify(s(n, i), t, "stop"), this._notify(s(i, n), t, "start");
  }
}
function al(e) {
  const t = {}, n = [], i = Object.keys(K.plugins.items);
  for (let o = 0; o < i.length; o++)
    n.push(K.getPlugin(i[o]));
  const s = e.plugins || [];
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    n.indexOf(r) === -1 && (n.push(r), t[r.id] = !0);
  }
  return {
    plugins: n,
    localIds: t
  };
}
function ll(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function cl(e, { plugins: t, localIds: n }, i, s) {
  const o = [], r = e.getContext();
  for (const a of t) {
    const l = a.id, c = ll(i[l], s);
    c !== null && o.push({
      plugin: a,
      options: hl(e.config, {
        plugin: a,
        local: n[l]
      }, c, r)
    });
  }
  return o;
}
function hl(e, { plugin: t, local: n }, i, s) {
  const o = e.pluginScopeKeys(t), r = e.getOptionScopes(i, o);
  return n && t.defaults && r.push(t.defaults), e.createResolver(r, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function $e(e, t) {
  const n = E.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function ul(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function dl(e, t) {
  return e === t ? "_index_" : "_value_";
}
function ii(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function fl(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function He(e, ...t) {
  if (ii(e))
    return e;
  for (const n of t) {
    const i = n.axis || fl(n.position) || e.length > 1 && ii(e[0].toLowerCase());
    if (i)
      return i;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function si(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function pl(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((i) => i.xAxisID === e || i.yAxisID === e);
    if (n.length)
      return si(e, "x", n[0]) || si(e, "y", n[0]);
  }
  return {};
}
function gl(e, t) {
  const n = bt[e.type] || {
    scales: {}
  }, i = t.scales || {}, s = $e(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(i).forEach((r) => {
    const a = i[r];
    if (!M(a))
      return console.error(`Invalid scale configuration for scale: ${r}`);
    if (a._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${r}`);
    const l = He(r, a, pl(r, e), E.scales[a.type]), c = dl(l, s), h = n.scales || {};
    o[r] = Ft(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      a,
      h[l],
      h[c]
    ]);
  }), e.data.datasets.forEach((r) => {
    const a = r.type || e.type, l = r.indexAxis || $e(a, t), h = (bt[a] || {}).scales || {};
    Object.keys(h).forEach((u) => {
      const d = ul(u, l), f = r[d + "AxisID"] || d;
      o[f] = o[f] || /* @__PURE__ */ Object.create(null), Ft(o[f], [
        {
          axis: d
        },
        i[f],
        h[u]
      ]);
    });
  }), Object.keys(o).forEach((r) => {
    const a = o[r];
    Ft(a, [
      E.scales[a.type],
      E.scale
    ]);
  }), o;
}
function as(e) {
  const t = e.options || (e.options = {});
  t.plugins = O(t.plugins, {}), t.scales = gl(e, t);
}
function ls(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function ml(e) {
  return e = e || {}, e.data = ls(e.data), as(e), e;
}
const oi = /* @__PURE__ */ new Map(), cs = /* @__PURE__ */ new Set();
function he(e, t) {
  let n = oi.get(e);
  return n || (n = t(), oi.set(e, n), cs.add(n)), n;
}
const Lt = (e, t, n) => {
  const i = ge(t, n);
  i !== void 0 && e.add(i);
};
class bl {
  constructor(t) {
    this._config = ml(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = ls(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), as(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return he(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return he(`${t}.transition.${n}`, () => [
      [
        `datasets.${t}.transitions.${n}`,
        `transitions.${n}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, n) {
    return he(`${t}-${n}`, () => [
      [
        `datasets.${t}.elements.${n}`,
        `datasets.${t}`,
        `elements.${n}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const n = t.id, i = this.type;
    return he(`${i}-plugin-${n}`, () => [
      [
        `plugins.${n}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, n) {
    const i = this._scopeCache;
    let s = i.get(t);
    return (!s || n) && (s = /* @__PURE__ */ new Map(), i.set(t, s)), s;
  }
  getOptionScopes(t, n, i) {
    const { options: s, type: o } = this, r = this._cachedScopes(t, i), a = r.get(n);
    if (a)
      return a;
    const l = /* @__PURE__ */ new Set();
    n.forEach((h) => {
      t && (l.add(t), h.forEach((u) => Lt(l, t, u))), h.forEach((u) => Lt(l, s, u)), h.forEach((u) => Lt(l, bt[o] || {}, u)), h.forEach((u) => Lt(l, E, u)), h.forEach((u) => Lt(l, Ve, u));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), cs.has(n) && r.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      bt[n] || {},
      E.datasets[n] || {},
      {
        type: n
      },
      E,
      Ve
    ];
  }
  resolveNamedOptions(t, n, i, s = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: r, subPrefixes: a } = ri(this._resolverCache, t, s);
    let l = r;
    if (yl(r, n)) {
      o.$shared = !1, i = ot(i) ? i() : i;
      const c = this.createResolver(t, i, a);
      l = kt(r, i, c);
    }
    for (const c of n)
      o[c] = l[c];
    return o;
  }
  createResolver(t, n, i = [
    ""
  ], s) {
    const { resolver: o } = ri(this._resolverCache, t, i);
    return M(n) ? kt(o, n, void 0, s) : o;
  }
}
function ri(e, t, n) {
  let i = e.get(t);
  i || (i = /* @__PURE__ */ new Map(), e.set(t, i));
  const s = n.join();
  let o = i.get(s);
  return o || (o = {
    resolver: on(t, n),
    subPrefixes: n.filter((a) => !a.toLowerCase().includes("hover"))
  }, i.set(s, o)), o;
}
const _l = (e) => M(e) && Object.getOwnPropertyNames(e).some((t) => ot(e[t]));
function yl(e, t) {
  const { isScriptable: n, isIndexable: i } = Ui(e);
  for (const s of t) {
    const o = n(s), r = i(s), a = (r || o) && e[s];
    if (o && (ot(a) || _l(a)) || r && F(a))
      return !0;
  }
  return !1;
}
var xl = "4.5.1";
const vl = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function ai(e, t) {
  return e === "top" || e === "bottom" || vl.indexOf(e) === -1 && t === "x";
}
function li(e, t) {
  return function(n, i) {
    return n[e] === i[e] ? n[t] - i[t] : n[e] - i[e];
  };
}
function ci(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), L(n && n.onComplete, [
    e
  ], t);
}
function kl(e) {
  const t = e.chart, n = t.options.animation;
  L(n && n.onProgress, [
    e
  ], t);
}
function hs(e) {
  return ln() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const fe = {}, hi = (e) => {
  const t = hs(e);
  return Object.values(fe).filter((n) => n.canvas === t).pop();
};
function wl(e, t, n) {
  const i = Object.keys(e);
  for (const s of i) {
    const o = +s;
    if (o >= t) {
      const r = e[s];
      delete e[s], (n > 0 || o > t) && (e[o + n] = r);
    }
  }
}
function Ml(e, t, n, i) {
  return !n || e.type === "mouseout" ? null : i ? t : e;
}
class We {
  static defaults = E;
  static instances = fe;
  static overrides = bt;
  static registry = K;
  static version = xl;
  static getChart = hi;
  static register(...t) {
    K.add(...t), ui();
  }
  static unregister(...t) {
    K.remove(...t), ui();
  }
  constructor(t, n) {
    const i = this.config = new bl(n), s = hs(t), o = hi(s);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const r = i.createResolver(i.chartOptionScopes(), this.getContext());
    this.platform = new (i.platform || $a(s))(), this.platform.updateConfig(i);
    const a = this.platform.acquireContext(s, r.aspectRatio), l = a && a.canvas, c = l && l.height, h = l && l.width;
    if (this.id = Oo(), this.ctx = a, this.canvas = l, this.width = h, this.height = c, this._options = r, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new rl(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Ko((u) => this.update(u), r.resizeDelay || 0), this._dataChanges = [], fe[this.id] = this, !a || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Q.listen(this, "complete", ci), Q.listen(this, "progress", kl), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: i, height: s, _aspectRatio: o } = this;
    return D(t) ? n && o ? o : s ? i / s : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  get registry() {
    return K;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Fn(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Ln(this.canvas, this.ctx), this;
  }
  stop() {
    return Q.stop(this), this;
  }
  resize(t, n) {
    Q.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const i = this.options, s = this.canvas, o = i.maintainAspectRatio && this.aspectRatio, r = this.platform.getMaximumSize(s, t, n, o), a = i.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = r.width, this.height = r.height, this._aspectRatio = this.aspectRatio, Fn(this, a, !0) && (this.notifyPlugins("resize", {
      size: r
    }), L(i.onResize, [
      this,
      r
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    R(n, (i, s) => {
      i.id = s;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, i = this.scales, s = Object.keys(i).reduce((r, a) => (r[a] = !1, r), {});
    let o = [];
    n && (o = o.concat(Object.keys(n).map((r) => {
      const a = n[r], l = He(r, a), c = l === "r", h = l === "x";
      return {
        options: a,
        dposition: c ? "chartArea" : h ? "bottom" : "left",
        dtype: c ? "radialLinear" : h ? "category" : "linear"
      };
    }))), R(o, (r) => {
      const a = r.options, l = a.id, c = He(l, a), h = O(a.type, r.dtype);
      (a.position === void 0 || ai(a.position, c) !== ai(r.dposition)) && (a.position = r.dposition), s[l] = !0;
      let u = null;
      if (l in i && i[l].type === h)
        u = i[l];
      else {
        const d = K.getScale(h);
        u = new d({
          id: l,
          type: h,
          ctx: this.ctx,
          chart: this
        }), i[u.id] = u;
      }
      u.init(a, t);
    }), R(s, (r, a) => {
      r || delete i[a];
    }), R(i, (r) => {
      ae.configure(this, r, r.options), ae.addBox(this, r);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, i = t.length;
    if (t.sort((s, o) => s.index - o.index), i > n) {
      for (let s = n; s < i; ++s)
        this._destroyDatasetMeta(s);
      t.splice(n, i - n);
    }
    this._sortedMetasets = t.slice(0).sort(li("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: n } } = this;
    t.length > n.length && delete this._stacks, t.forEach((i, s) => {
      n.filter((o) => o === i._dataset).length === 0 && this._destroyDatasetMeta(s);
    });
  }
  buildOrUpdateControllers() {
    const t = [], n = this.data.datasets;
    let i, s;
    for (this._removeUnreferencedMetasets(), i = 0, s = n.length; i < s; i++) {
      const o = n[i];
      let r = this.getDatasetMeta(i);
      const a = o.type || this.config.type;
      if (r.type && r.type !== a && (this._destroyDatasetMeta(i), r = this.getDatasetMeta(i)), r.type = a, r.indexAxis = o.indexAxis || $e(a, this.options), r.order = o.order || 0, r.index = i, r.label = "" + o.label, r.visible = this.isDatasetVisible(i), r.controller)
        r.controller.updateIndex(i), r.controller.linkScales();
      else {
        const l = K.getController(a), { datasetElementType: c, dataElementType: h } = E.datasets[a];
        Object.assign(l, {
          dataElementType: K.getElement(h),
          datasetElementType: c && K.getElement(c)
        }), r.controller = new l(this, i), t.push(r.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    R(this.data.datasets, (t, n) => {
      this.getDatasetMeta(n).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const n = this.config;
    n.update();
    const i = this._options = n.createResolver(n.chartOptionScopes(), this.getContext()), s = this._animationsDisabled = !i.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let r = 0;
    for (let c = 0, h = this.data.datasets.length; c < h; c++) {
      const { controller: u } = this.getDatasetMeta(c), d = !s && o.indexOf(u) === -1;
      u.buildOrUpdateElements(d), r = Math.max(+u.getMaxOverflow(), r);
    }
    r = this._minPadding = i.layout.autoPadding ? r : 0, this._updateLayout(r), s || R(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(li("z", "_idx"));
    const { _active: a, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : a.length && this._updateHoverStyles(a, a, !0), this.render();
  }
  _updateScales() {
    R(this.scales, (t) => {
      ae.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), i = new Set(t.events);
    (!xn(n, i) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: i, start: s, count: o } of n) {
      const r = i === "_removeElements" ? -o : o;
      wl(t, s, r);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, i = (o) => new Set(t.filter((r) => r[0] === o).map((r, a) => a + "," + r.splice(1).join(","))), s = i(0);
    for (let o = 1; o < n; o++)
      if (!xn(s, i(o)))
        return;
    return Array.from(s).map((o) => o.split(",")).map((o) => ({
      method: o[1],
      start: +o[2],
      count: +o[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    ae.update(this, this.width, this.height, t);
    const n = this.chartArea, i = n.width <= 0 || n.height <= 0;
    this._layers = [], R(this.boxes, (s) => {
      i && s.position === "chartArea" || (s.configure && s.configure(), this._layers.push(...s._layers()));
    }, this), this._layers.forEach((s, o) => {
      s._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let n = 0, i = this.data.datasets.length; n < i; ++n)
        this.getDatasetMeta(n).controller.configure();
      for (let n = 0, i = this.data.datasets.length; n < i; ++n)
        this._updateDataset(n, ot(t) ? t({
          datasetIndex: n
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, n) {
    const i = this.getDatasetMeta(t), s = {
      meta: i,
      index: t,
      mode: n,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", s) !== !1 && (i.controller._update(n), s.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", s));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (Q.has(this) ? this.attached && !Q.running(this) && Q.start(this) : (this.draw(), ci({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: i, height: s } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(i, s);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const n = this._layers;
    for (t = 0; t < n.length && n[t].z <= 0; ++t)
      n[t].draw(this.chartArea);
    for (this._drawDatasets(); t < n.length; ++t)
      n[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const n = this._sortedMetasets, i = [];
    let s, o;
    for (s = 0, o = n.length; s < o; ++s) {
      const r = n[s];
      (!t || r.visible) && i.push(r);
    }
    return i;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let n = t.length - 1; n >= 0; --n)
      this._drawDataset(t[n]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const n = this.ctx, i = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, s = Ji(this, t);
    this.notifyPlugins("beforeDatasetDraw", i) !== !1 && (s && nn(n, s), t.controller.draw(), s && sn(n), i.cancelable = !1, this.notifyPlugins("afterDatasetDraw", i));
  }
  isPointInArea(t) {
    return Yt(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, i, s) {
    const o = va.modes[n];
    return typeof o == "function" ? o(this, t, i, s) : [];
  }
  getDatasetMeta(t) {
    const n = this.data.datasets[t], i = this._metasets;
    let s = i.filter((o) => o && o._dataset === n).pop();
    return s || (s = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: n && n.order || 0,
      index: t,
      _dataset: n,
      _parsed: [],
      _sorted: !1
    }, i.push(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = Mt(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const n = this.data.datasets[t];
    if (!n)
      return !1;
    const i = this.getDatasetMeta(t);
    return typeof i.hidden == "boolean" ? !i.hidden : !n.hidden;
  }
  setDatasetVisibility(t, n) {
    const i = this.getDatasetMeta(t);
    i.hidden = !n;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, n, i) {
    const s = i ? "show" : "hide", o = this.getDatasetMeta(t), r = o.controller._resolveAnimations(void 0, s);
    me(n) ? (o.data[n].hidden = !i, this.update()) : (this.setDatasetVisibility(t, i), r.update(o, {
      visible: i
    }), this.update((a) => a.datasetIndex === t ? s : void 0));
  }
  hide(t, n) {
    this._updateVisibility(t, n, !1);
  }
  show(t, n) {
    this._updateVisibility(t, n, !0);
  }
  _destroyDatasetMeta(t) {
    const n = this._metasets[t];
    n && n.controller && n.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, n;
    for (this.stop(), Q.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Ln(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete fe[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, n = this.platform, i = (o, r) => {
      n.addEventListener(this, o, r), t[o] = r;
    }, s = (o, r, a) => {
      o.offsetX = r, o.offsetY = a, this._eventHandler(o);
    };
    R(this.options.events, (o) => i(o, s));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, i = (l, c) => {
      n.addEventListener(this, l, c), t[l] = c;
    }, s = (l, c) => {
      t[l] && (n.removeEventListener(this, l, c), delete t[l]);
    }, o = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let r;
    const a = () => {
      s("attach", a), this.attached = !0, this.resize(), i("resize", o), i("detach", r);
    };
    r = () => {
      this.attached = !1, s("resize", o), this._stop(), this._resize(0, 0), i("attach", a);
    }, n.isAttached(this.canvas) ? a() : r();
  }
  unbindEvents() {
    R(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, R(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, i) {
    const s = i ? "set" : "remove";
    let o, r, a, l;
    for (n === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + s + "DatasetHoverStyle"]()), a = 0, l = t.length; a < l; ++a) {
      r = t[a];
      const c = r && this.getDatasetMeta(r.datasetIndex).controller;
      c && c[s + "HoverStyle"](r.element, r.datasetIndex, r.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const n = this._active || [], i = t.map(({ datasetIndex: o, index: r }) => {
      const a = this.getDatasetMeta(o);
      if (!a)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: a.data[r],
        index: r
      };
    });
    !_n(i, n) && (this._active = i, this._lastEvent = null, this._updateHoverStyles(i, n));
  }
  notifyPlugins(t, n, i) {
    return this._plugins.notify(this, t, n, i);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((n) => n.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, n, i) {
    const s = this.options.hover, o = (l, c) => l.filter((h) => !c.some((u) => h.datasetIndex === u.datasetIndex && h.index === u.index)), r = o(n, t), a = i ? t : o(t, n);
    r.length && this.updateHoverStyle(r, s.mode, !1), a.length && s.mode && this.updateHoverStyle(a, s.mode, !0);
  }
  _eventHandler(t, n) {
    const i = {
      event: t,
      replay: n,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, s = (r) => (r.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", i, s) === !1)
      return;
    const o = this._handleEvent(t, n, i.inChartArea);
    return i.cancelable = !1, this.notifyPlugins("afterEvent", i, s), (o || i.changed) && this.render(), this;
  }
  _handleEvent(t, n, i) {
    const { _active: s = [], options: o } = this, r = n, a = this._getActiveElements(t, s, i, r), l = Eo(t), c = Ml(t, this._lastEvent, i, l);
    i && (this._lastEvent = null, L(o.onHover, [
      t,
      a,
      this
    ], this), l && L(o.onClick, [
      t,
      a,
      this
    ], this));
    const h = !_n(a, s);
    return (h || n) && (this._active = a, this._updateHoverStyles(a, s, n)), this._lastEvent = c, h;
  }
  _getActiveElements(t, n, i, s) {
    if (t.type === "mouseout")
      return [];
    if (!i)
      return n;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, s);
  }
}
function ui() {
  return R(We.instances, (e) => e._plugins.invalidate());
}
function us(e, t, n = t) {
  e.lineCap = O(n.borderCapStyle, t.borderCapStyle), e.setLineDash(O(n.borderDash, t.borderDash)), e.lineDashOffset = O(n.borderDashOffset, t.borderDashOffset), e.lineJoin = O(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = O(n.borderWidth, t.borderWidth), e.strokeStyle = O(n.borderColor, t.borderColor);
}
function Sl(e, t, n) {
  e.lineTo(n.x, n.y);
}
function Pl(e) {
  return e.stepped ? hr : e.tension || e.cubicInterpolationMode === "monotone" ? ur : Sl;
}
function ds(e, t, n = {}) {
  const i = e.length, { start: s = 0, end: o = i - 1 } = n, { start: r, end: a } = t, l = Math.max(s, r), c = Math.min(o, a), h = s < r && o < r || s > a && o > a;
  return {
    count: i,
    start: l,
    loop: t.loop,
    ilen: c < l && !h ? i + c - l : c - l
  };
}
function Ol(e, t, n, i) {
  const { points: s, options: o } = t, { count: r, start: a, loop: l, ilen: c } = ds(s, n, i), h = Pl(o);
  let { move: u = !0, reverse: d } = i || {}, f, m, p;
  for (f = 0; f <= c; ++f)
    m = s[(a + (d ? c - f : f)) % r], !m.skip && (u ? (e.moveTo(m.x, m.y), u = !1) : h(e, p, m, d, o.stepped), p = m);
  return l && (m = s[(a + (d ? c : 0)) % r], h(e, p, m, d, o.stepped)), !!l;
}
function Dl(e, t, n, i) {
  const s = t.points, { count: o, start: r, ilen: a } = ds(s, n, i), { move: l = !0, reverse: c } = i || {};
  let h = 0, u = 0, d, f, m, p, g, b;
  const y = (P) => (r + (c ? a - P : P)) % o, S = () => {
    p !== g && (e.lineTo(h, g), e.lineTo(h, p), e.lineTo(h, b));
  };
  for (l && (f = s[y(0)], e.moveTo(f.x, f.y)), d = 0; d <= a; ++d) {
    if (f = s[y(d)], f.skip)
      continue;
    const P = f.x, _ = f.y, k = P | 0;
    k === m ? (_ < p ? p = _ : _ > g && (g = _), h = (u * h + P) / ++u) : (S(), e.lineTo(P, _), m = k, u = 0, p = g = _), b = _;
  }
  S();
}
function Ue(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? Dl : Ol;
}
function Cl(e) {
  return e.stepped ? Ur : e.tension || e.cubicInterpolationMode === "monotone" ? Yr : dt;
}
function Tl(e, t, n, i) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, n, i) && s.closePath()), us(e, t.options), e.stroke(s);
}
function Il(e, t, n, i) {
  const { segments: s, options: o } = t, r = Ue(t);
  for (const a of s)
    us(e, o, a.style), e.beginPath(), r(e, t, a, {
      start: n,
      end: n + i - 1
    }) && e.closePath(), e.stroke();
}
const Ll = typeof Path2D == "function";
function El(e, t, n, i) {
  Ll && !t.options.segment ? Tl(e, t, n, i) : Il(e, t, n, i);
}
class Me extends we {
  static id = "line";
  static defaults = {
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: "miter",
    borderWidth: 3,
    capBezierPoints: !0,
    cubicInterpolationMode: "default",
    fill: !1,
    spanGaps: !1,
    stepped: !1,
    tension: 0
  };
  static defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  };
  static descriptors = {
    _scriptable: !0,
    _indexable: (t) => t !== "borderDash" && t !== "fill"
  };
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, n) {
    const i = this.options;
    if ((i.tension || i.cubicInterpolationMode === "monotone") && !i.stepped && !this._pointsUpdated) {
      const s = i.spanGaps ? this._loop : this._fullLoop;
      Rr(this._points, i, t, s, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = qr(this, this.options.segment));
  }
  first() {
    const t = this.segments, n = this.points;
    return t.length && n[t[0].start];
  }
  last() {
    const t = this.segments, n = this.points, i = t.length;
    return i && n[t[i - 1].end];
  }
  interpolate(t, n) {
    const i = this.options, s = t[n], o = this.points, r = Qi(this, {
      property: n,
      start: s,
      end: s
    });
    if (!r.length)
      return;
    const a = [], l = Cl(i);
    let c, h;
    for (c = 0, h = r.length; c < h; ++c) {
      const { start: u, end: d } = r[c], f = o[u], m = o[d];
      if (f === m) {
        a.push(f);
        continue;
      }
      const p = Math.abs((s - f[n]) / (m[n] - f[n])), g = l(f, m, p, i.stepped);
      g[n] = t[n], a.push(g);
    }
    return a.length === 1 ? a[0] : a;
  }
  pathSegment(t, n, i) {
    return Ue(this)(t, this, n, i);
  }
  path(t, n, i) {
    const s = this.segments, o = Ue(this);
    let r = this._loop;
    n = n || 0, i = i || this.points.length - n;
    for (const a of s)
      r &= o(t, this, a, {
        start: n,
        end: n + i - 1
      });
    return !!r;
  }
  draw(t, n, i, s) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), El(t, this, i, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function di(e, t, n, i) {
  const s = e.options, { [n]: o } = e.getProps([
    n
  ], i);
  return Math.abs(t - o) < s.radius + s.hitRadius;
}
class zl extends we {
  static id = "point";
  parsed;
  skip;
  stop;
  /**
  * @type {any}
  */
  static defaults = {
    borderWidth: 1,
    hitRadius: 1,
    hoverBorderWidth: 1,
    hoverRadius: 4,
    pointStyle: "circle",
    radius: 3,
    rotation: 0
  };
  /**
  * @type {any}
  */
  static defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  };
  constructor(t) {
    super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, t && Object.assign(this, t);
  }
  inRange(t, n, i) {
    const s = this.options, { x: o, y: r } = this.getProps([
      "x",
      "y"
    ], i);
    return Math.pow(t - o, 2) + Math.pow(n - r, 2) < Math.pow(s.hitRadius + s.radius, 2);
  }
  inXRange(t, n) {
    return di(this, t, "x", n);
  }
  inYRange(t, n) {
    return di(this, t, "y", n);
  }
  getCenterPoint(t) {
    const { x: n, y: i } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: n,
      y: i
    };
  }
  size(t) {
    t = t || this.options || {};
    let n = t.radius || 0;
    n = Math.max(n, n && t.hoverRadius || 0);
    const i = n && t.borderWidth || 0;
    return (n + i) * 2;
  }
  draw(t, n) {
    const i = this.options;
    this.skip || i.radius < 0.1 || !Yt(this, n, this.size(i) / 2) || (t.strokeStyle = i.borderColor, t.lineWidth = i.borderWidth, t.fillStyle = i.backgroundColor, lr(t, i, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Al(e, t, n) {
  const i = e.segments, s = e.points, o = t.points, r = [];
  for (const a of i) {
    let { start: l, end: c } = a;
    c = Se(l, c, s);
    const h = Ye(n, s[l], s[c], a.loop);
    if (!t.segments) {
      r.push({
        source: a,
        target: h,
        start: s[l],
        end: s[c]
      });
      continue;
    }
    const u = Qi(t, h);
    for (const d of u) {
      const f = Ye(n, o[d.start], o[d.end], d.loop), m = Zi(a, s, f);
      for (const p of m)
        r.push({
          source: p,
          target: d,
          start: {
            [n]: fi(h, f, "start", Math.max)
          },
          end: {
            [n]: fi(h, f, "end", Math.min)
          }
        });
    }
  }
  return r;
}
function Ye(e, t, n, i) {
  if (i)
    return;
  let s = t[e], o = n[e];
  return e === "angle" && (s = X(s), o = X(o)), {
    property: e,
    start: s,
    end: o
  };
}
function Fl(e, t) {
  const { x: n = null, y: i = null } = e || {}, s = t.points, o = [];
  return t.segments.forEach(({ start: r, end: a }) => {
    a = Se(r, a, s);
    const l = s[r], c = s[a];
    i !== null ? (o.push({
      x: l.x,
      y: i
    }), o.push({
      x: c.x,
      y: i
    })) : n !== null && (o.push({
      x: n,
      y: l.y
    }), o.push({
      x: n,
      y: c.y
    }));
  }), o;
}
function Se(e, t, n) {
  for (; t > e; t--) {
    const i = n[t];
    if (!isNaN(i.x) && !isNaN(i.y))
      break;
  }
  return t;
}
function fi(e, t, n, i) {
  return e && t ? i(e[n], t[n]) : e ? e[n] : t ? t[n] : 0;
}
function fs(e, t) {
  let n = [], i = !1;
  return F(e) ? (i = !0, n = e) : n = Fl(e, t), n.length ? new Me({
    points: n,
    options: {
      tension: 0
    },
    _loop: i,
    _fullLoop: i
  }) : null;
}
function pi(e) {
  return e && e.fill !== !1;
}
function Rl(e, t, n) {
  let s = e[t].fill;
  const o = [
    t
  ];
  let r;
  if (!n)
    return s;
  for (; s !== !1 && o.indexOf(s) === -1; ) {
    if (!N(s))
      return s;
    if (r = e[s], !r)
      return !1;
    if (r.visible)
      return s;
    o.push(s), s = r.fill;
  }
  return !1;
}
function Nl(e, t, n) {
  const i = $l(e);
  if (M(i))
    return isNaN(i.value) ? !1 : i;
  let s = parseFloat(i);
  return N(s) && Math.floor(s) === s ? Bl(i[0], t, s, n) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(i) >= 0 && i;
}
function Bl(e, t, n, i) {
  return (e === "-" || e === "+") && (n = t + n), n === t || n < 0 || n >= i ? !1 : n;
}
function Vl(e, t) {
  let n = null;
  return e === "start" ? n = t.bottom : e === "end" ? n = t.top : M(e) ? n = t.getPixelForValue(e.value) : t.getBasePixel && (n = t.getBasePixel()), n;
}
function jl(e, t, n) {
  let i;
  return e === "start" ? i = n : e === "end" ? i = t.options.reverse ? t.min : t.max : M(e) ? i = e.value : i = t.getBaseValue(), i;
}
function $l(e) {
  const t = e.options, n = t.fill;
  let i = O(n && n.target, n);
  return i === void 0 && (i = !!t.backgroundColor), i === !1 || i === null ? !1 : i === !0 ? "origin" : i;
}
function Hl(e) {
  const { scale: t, index: n, line: i } = e, s = [], o = i.segments, r = i.points, a = Wl(t, n);
  a.push(fs({
    x: null,
    y: t.bottom
  }, i));
  for (let l = 0; l < o.length; l++) {
    const c = o[l];
    for (let h = c.start; h <= c.end; h++)
      Ul(s, r[h], a);
  }
  return new Me({
    points: s,
    options: {}
  });
}
function Wl(e, t) {
  const n = [], i = e.getMatchingVisibleMetas("line");
  for (let s = 0; s < i.length; s++) {
    const o = i[s];
    if (o.index === t)
      break;
    o.hidden || n.unshift(o.dataset);
  }
  return n;
}
function Ul(e, t, n) {
  const i = [];
  for (let s = 0; s < n.length; s++) {
    const o = n[s], { first: r, last: a, point: l } = Yl(o, t, "x");
    if (!(!l || r && a)) {
      if (r)
        i.unshift(l);
      else if (e.push(l), !a)
        break;
    }
  }
  e.push(...i);
}
function Yl(e, t, n) {
  const i = e.interpolate(t, n);
  if (!i)
    return {};
  const s = i[n], o = e.segments, r = e.points;
  let a = !1, l = !1;
  for (let c = 0; c < o.length; c++) {
    const h = o[c], u = r[h.start][n], d = r[h.end][n];
    if (Bi(s, u, d)) {
      a = s === u, l = s === d;
      break;
    }
  }
  return {
    first: a,
    last: l,
    point: i
  };
}
class ps {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, n, i) {
    const { x: s, y: o, radius: r } = this;
    return n = n || {
      start: 0,
      end: Z
    }, t.arc(s, o, r, n.end, n.start, !0), !i.bounds;
  }
  interpolate(t) {
    const { x: n, y: i, radius: s } = this, o = t.angle;
    return {
      x: n + Math.cos(o) * s,
      y: i + Math.sin(o) * s,
      angle: o
    };
  }
}
function Gl(e) {
  const { chart: t, fill: n, line: i } = e;
  if (N(n))
    return Kl(t, n);
  if (n === "stack")
    return Hl(e);
  if (n === "shape")
    return !0;
  const s = Xl(e);
  return s instanceof ps ? s : fs(s, i);
}
function Kl(e, t) {
  const n = e.getDatasetMeta(t);
  return n && e.isDatasetVisible(t) ? n.dataset : null;
}
function Xl(e) {
  return (e.scale || {}).getPointPositionForValue ? Zl(e) : ql(e);
}
function ql(e) {
  const { scale: t = {}, fill: n } = e, i = Vl(n, t);
  if (N(i)) {
    const s = t.isHorizontal();
    return {
      x: s ? i : null,
      y: s ? null : i
    };
  }
  return null;
}
function Zl(e) {
  const { scale: t, fill: n } = e, i = t.options, s = t.getLabels().length, o = i.reverse ? t.max : t.min, r = jl(n, t, o), a = [];
  if (i.grid.circular) {
    const l = t.getPointPositionForValue(0, o);
    return new ps({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(r)
    });
  }
  for (let l = 0; l < s; ++l)
    a.push(t.getPointPositionForValue(l, r));
  return a;
}
function Fe(e, t, n) {
  const i = Gl(t), { chart: s, index: o, line: r, scale: a, axis: l } = t, c = r.options, h = c.fill, u = c.backgroundColor, { above: d = u, below: f = u } = h || {}, m = s.getDatasetMeta(o), p = Ji(s, m);
  i && r.points.length && (nn(e, n), Ql(e, {
    line: r,
    target: i,
    above: d,
    below: f,
    area: n,
    scale: a,
    axis: l,
    clip: p
  }), sn(e));
}
function Ql(e, t) {
  const { line: n, target: i, above: s, below: o, area: r, scale: a, clip: l } = t, c = n._loop ? "angle" : t.axis;
  e.save();
  let h = o;
  o !== s && (c === "x" ? (gi(e, i, r.top), Re(e, {
    line: n,
    target: i,
    color: s,
    scale: a,
    property: c,
    clip: l
  }), e.restore(), e.save(), gi(e, i, r.bottom)) : c === "y" && (mi(e, i, r.left), Re(e, {
    line: n,
    target: i,
    color: o,
    scale: a,
    property: c,
    clip: l
  }), e.restore(), e.save(), mi(e, i, r.right), h = s)), Re(e, {
    line: n,
    target: i,
    color: h,
    scale: a,
    property: c,
    clip: l
  }), e.restore();
}
function gi(e, t, n) {
  const { segments: i, points: s } = t;
  let o = !0, r = !1;
  e.beginPath();
  for (const a of i) {
    const { start: l, end: c } = a, h = s[l], u = s[Se(l, c, s)];
    o ? (e.moveTo(h.x, h.y), o = !1) : (e.lineTo(h.x, n), e.lineTo(h.x, h.y)), r = !!t.pathSegment(e, a, {
      move: r
    }), r ? e.closePath() : e.lineTo(u.x, n);
  }
  e.lineTo(t.first().x, n), e.closePath(), e.clip();
}
function mi(e, t, n) {
  const { segments: i, points: s } = t;
  let o = !0, r = !1;
  e.beginPath();
  for (const a of i) {
    const { start: l, end: c } = a, h = s[l], u = s[Se(l, c, s)];
    o ? (e.moveTo(h.x, h.y), o = !1) : (e.lineTo(n, h.y), e.lineTo(h.x, h.y)), r = !!t.pathSegment(e, a, {
      move: r
    }), r ? e.closePath() : e.lineTo(n, u.y);
  }
  e.lineTo(n, t.first().y), e.closePath(), e.clip();
}
function Re(e, t) {
  const { line: n, target: i, property: s, color: o, scale: r, clip: a } = t, l = Al(n, i, s);
  for (const { source: c, target: h, start: u, end: d } of l) {
    const { style: { backgroundColor: f = o } = {} } = c, m = i !== !0;
    e.save(), e.fillStyle = f, Jl(e, r, a, m && Ye(s, u, d)), e.beginPath();
    const p = !!n.pathSegment(e, c);
    let g;
    if (m) {
      p ? e.closePath() : bi(e, i, d, s);
      const b = !!i.pathSegment(e, h, {
        move: p,
        reverse: !0
      });
      g = p && b, g || bi(e, i, u, s);
    }
    e.closePath(), e.fill(g ? "evenodd" : "nonzero"), e.restore();
  }
}
function Jl(e, t, n, i) {
  const s = t.chart.chartArea, { property: o, start: r, end: a } = i || {};
  if (o === "x" || o === "y") {
    let l, c, h, u;
    o === "x" ? (l = r, c = s.top, h = a, u = s.bottom) : (l = s.left, c = r, h = s.right, u = a), e.beginPath(), n && (l = Math.max(l, n.left), h = Math.min(h, n.right), c = Math.max(c, n.top), u = Math.min(u, n.bottom)), e.rect(l, c, h - l, u - c), e.clip();
  }
}
function bi(e, t, n, i) {
  const s = t.interpolate(n, i);
  s && e.lineTo(s.x, s.y);
}
var tc = {
  id: "filler",
  afterDatasetsUpdate(e, t, n) {
    const i = (e.data.datasets || []).length, s = [];
    let o, r, a, l;
    for (r = 0; r < i; ++r)
      o = e.getDatasetMeta(r), a = o.dataset, l = null, a && a.options && a instanceof Me && (l = {
        visible: e.isDatasetVisible(r),
        index: r,
        fill: Nl(a, r, i),
        chart: e,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: a
      }), o.$filler = l, s.push(l);
    for (r = 0; r < i; ++r)
      l = s[r], !(!l || l.fill === !1) && (l.fill = Rl(s, r, n.propagate));
  },
  beforeDraw(e, t, n) {
    const i = n.drawTime === "beforeDraw", s = e.getSortedVisibleDatasetMetas(), o = e.chartArea;
    for (let r = s.length - 1; r >= 0; --r) {
      const a = s[r].$filler;
      a && (a.line.updateControlPoints(o, a.axis), i && a.fill && Fe(e.ctx, a, o));
    }
  },
  beforeDatasetsDraw(e, t, n) {
    if (n.drawTime !== "beforeDatasetsDraw")
      return;
    const i = e.getSortedVisibleDatasetMetas();
    for (let s = i.length - 1; s >= 0; --s) {
      const o = i[s].$filler;
      pi(o) && Fe(e.ctx, o, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, n) {
    const i = t.meta.$filler;
    !pi(i) || n.drawTime !== "beforeDatasetDraw" || Fe(e.ctx, i, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const ec = (e, t, n, i) => (typeof t == "string" ? (n = e.push(t) - 1, i.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function nc(e, t, n, i) {
  const s = e.indexOf(t);
  if (s === -1)
    return ec(e, t, n, i);
  const o = e.lastIndexOf(t);
  return s !== o ? n : s;
}
const ic = (e, t) => e === null ? null : q(Math.round(e), 0, t);
function _i(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class sc extends St {
  static id = "category";
  static defaults = {
    ticks: {
      callback: _i
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const n = this._addedLabels;
    if (n.length) {
      const i = this.getLabels();
      for (const { index: s, label: o } of n)
        i[s] === o && i.splice(s, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, n) {
    if (D(t))
      return null;
    const i = this.getLabels();
    return n = isFinite(n) && i[n] === t ? n : nc(i, t, O(n, t), this._addedLabels), ic(n, i.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: n } = this.getUserBounds();
    let { min: i, max: s } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (i = 0), n || (s = this.getLabels().length - 1)), this.min = i, this.max = s;
  }
  buildTicks() {
    const t = this.min, n = this.max, i = this.options.offset, s = [];
    let o = this.getLabels();
    o = t === 0 && n === o.length - 1 ? o : o.slice(t, n + 1), this._valueRange = Math.max(o.length - (i ? 0 : 1), 1), this._startValue = this.min - (i ? 0.5 : 0);
    for (let r = t; r <= n; r++)
      s.push({
        value: r
      });
    return s;
  }
  getLabelForValue(t) {
    return _i.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const n = this.ticks;
    return t < 0 || t > n.length - 1 ? null : this.getPixelForValue(n[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
function oc(e, t) {
  const n = [], { bounds: s, step: o, min: r, max: a, precision: l, count: c, maxTicks: h, maxDigits: u, includeBounds: d } = e, f = o || 1, m = h - 1, { min: p, max: g } = t, b = !D(r), y = !D(a), S = !D(c), P = (g - p) / (u + 1);
  let _ = kn((g - p) / m / f) * f, k, x, v, w;
  if (_ < 1e-14 && !b && !y)
    return [
      {
        value: p
      },
      {
        value: g
      }
    ];
  w = Math.ceil(g / _) - Math.floor(p / _), w > m && (_ = kn(w * _ / m / f) * f), D(l) || (k = Math.pow(10, l), _ = Math.ceil(_ * k) / k), s === "ticks" ? (x = Math.floor(p / _) * _, v = Math.ceil(g / _) * _) : (x = p, v = g), b && y && o && No((a - r) / o, _ / 1e3) ? (w = Math.round(Math.min((a - r) / _, h)), _ = (a - r) / w, x = r, v = a) : S ? (x = b ? r : x, v = y ? a : v, w = c - 1, _ = (v - x) / w) : (w = (v - x) / _, Rt(w, Math.round(w), _ / 1e3) ? w = Math.round(w) : w = Math.ceil(w));
  const C = Math.max(wn(_), wn(x));
  k = Math.pow(10, D(l) ? C : l), x = Math.round(x * k) / k, v = Math.round(v * k) / k;
  let T = 0;
  for (b && (d && x !== r ? (n.push({
    value: r
  }), x < r && T++, Rt(Math.round((x + T * _) * k) / k, r, yi(r, P, e)) && T++) : x < r && T++); T < w; ++T) {
    const z = Math.round((x + T * _) * k) / k;
    if (y && z > a)
      break;
    n.push({
      value: z
    });
  }
  return y && d && v !== a ? n.length && Rt(n[n.length - 1].value, a, yi(a, P, e)) ? n[n.length - 1].value = a : n.push({
    value: a
  }) : (!y || v === a) && n.push({
    value: v
  }), n;
}
function yi(e, t, { horizontal: n, minRotation: i }) {
  const s = pt(i), o = (n ? Math.sin(s) : Math.cos(s)) || 1e-3, r = 0.75 * t * ("" + e).length;
  return Math.min(t / o, r);
}
class rc extends St {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return D(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: i } = this.getUserBounds();
    let { min: s, max: o } = this;
    const r = (l) => s = n ? s : l, a = (l) => o = i ? o : l;
    if (t) {
      const l = vt(s), c = vt(o);
      l < 0 && c < 0 ? a(0) : l > 0 && c > 0 && r(0);
    }
    if (s === o) {
      let l = o === 0 ? 1 : Math.abs(o * 0.05);
      a(o + l), t || r(s - l);
    }
    this.min = s, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: n, stepSize: i } = t, s;
    return i ? (s = Math.ceil(this.max / i) - Math.floor(this.min / i) + 1, s > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`), s = 1e3)) : (s = this.computeTickLimit(), n = n || 11), n && (s = Math.min(n, s)), s;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, n = t.ticks;
    let i = this.getTickLimit();
    i = Math.max(2, i);
    const s = {
      maxTicks: i,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: n.precision,
      step: n.stepSize,
      count: n.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: n.minRotation || 0,
      includeBounds: n.includeBounds !== !1
    }, o = this._range || this, r = oc(s, o);
    return t.bounds === "ticks" && Bo(r, this, "value"), t.reverse ? (r.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), r;
  }
  configure() {
    const t = this.ticks;
    let n = this.min, i = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const s = (i - n) / Math.max(t.length - 1, 1) / 2;
      n -= s, i += s;
    }
    this._startValue = n, this._endValue = i, this._valueRange = i - n;
  }
  getLabelForValue(t) {
    return Hi(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class ac extends rc {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: Wi.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = N(t) ? t : 0, this.max = N(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, i = pt(this.options.ticks.minRotation), s = (t ? Math.sin(i) : Math.cos(i)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, o.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Pe = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, $ = /* @__PURE__ */ Object.keys(Pe);
function xi(e, t) {
  return e - t;
}
function vi(e, t) {
  if (D(t))
    return null;
  const n = e._adapter, { parser: i, round: s, isoWeekday: o } = e._parseOpts;
  let r = t;
  return typeof i == "function" && (r = i(r)), N(r) || (r = typeof i == "string" ? n.parse(r, i) : n.parse(r)), r === null ? null : (s && (r = s === "week" && (Ut(o) || o === !0) ? n.startOf(r, "isoWeek", o) : n.startOf(r, s)), +r);
}
function ki(e, t, n, i) {
  const s = $.length;
  for (let o = $.indexOf(e); o < s - 1; ++o) {
    const r = Pe[$[o]], a = r.steps ? r.steps : Number.MAX_SAFE_INTEGER;
    if (r.common && Math.ceil((n - t) / (a * r.size)) <= i)
      return $[o];
  }
  return $[s - 1];
}
function lc(e, t, n, i, s) {
  for (let o = $.length - 1; o >= $.indexOf(n); o--) {
    const r = $[o];
    if (Pe[r].common && e._adapter.diff(s, i, r) >= t - 1)
      return r;
  }
  return $[n ? $.indexOf(n) : 0];
}
function cc(e) {
  for (let t = $.indexOf(e) + 1, n = $.length; t < n; ++t)
    if (Pe[$[t]].common)
      return $[t];
}
function wi(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: i, hi: s } = tn(n, t), o = n[i] >= t ? n[i] : n[s];
    e[o] = !0;
  }
}
function hc(e, t, n, i) {
  const s = e._adapter, o = +s.startOf(t[0].value, i), r = t[t.length - 1].value;
  let a, l;
  for (a = o; a <= r; a = +s.add(a, 1, i))
    l = n[a], l >= 0 && (t[l].major = !0);
  return t;
}
function Mi(e, t, n) {
  const i = [], s = {}, o = t.length;
  let r, a;
  for (r = 0; r < o; ++r)
    a = t[r], s[a] = r, i.push({
      value: a,
      major: !1
    });
  return o === 0 || !n ? i : hc(e, i, s, n);
}
class Si extends St {
  static id = "time";
  static defaults = {
    bounds: "data",
    adapters: {},
    time: {
      parser: !1,
      unit: !1,
      round: !1,
      isoWeekday: !1,
      minUnit: "millisecond",
      displayFormats: {}
    },
    ticks: {
      source: "auto",
      callback: !1,
      major: {
        enabled: !1
      }
    }
  };
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, n = {}) {
    const i = t.time || (t.time = {}), s = this._adapter = new ma._date(t.adapters.date);
    s.init(n), Ft(i.displayFormats, s.formats()), this._parseOpts = {
      parser: i.parser,
      round: i.round,
      isoWeekday: i.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : vi(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, n = this._adapter, i = t.time.unit || "day";
    let { min: s, max: o, minDefined: r, maxDefined: a } = this.getUserBounds();
    function l(c) {
      !r && !isNaN(c.min) && (s = Math.min(s, c.min)), !a && !isNaN(c.max) && (o = Math.max(o, c.max));
    }
    (!r || !a) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), s = N(s) && !isNaN(s) ? s : +n.startOf(Date.now(), i), o = N(o) && !isNaN(o) ? o : +n.endOf(Date.now(), i) + 1, this.min = Math.min(s, o - 1), this.max = Math.max(s + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let n = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
    return t.length && (n = t[0], i = t[t.length - 1]), {
      min: n,
      max: i
    };
  }
  buildTicks() {
    const t = this.options, n = t.time, i = t.ticks, s = i.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && s.length && (this.min = this._userMin || s[0], this.max = this._userMax || s[s.length - 1]);
    const o = this.min, r = this.max, a = Uo(s, o, r);
    return this._unit = n.unit || (i.autoSkip ? ki(n.minUnit, this.min, this.max, this._getLabelCapacity(o)) : lc(this, a.length, n.minUnit, this.min, this.max)), this._majorUnit = !i.major.enabled || this._unit === "year" ? void 0 : cc(this._unit), this.initOffsets(s), t.reverse && a.reverse(), Mi(this, a, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, i = 0, s, o;
    this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - s : n = (this.getDecimalForValue(t[1]) - s) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? i = o : i = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const r = t.length < 3 ? 0.5 : 0.25;
    n = q(n, 0, r), i = q(i, 0, r), this._offsets = {
      start: n,
      end: i,
      factor: 1 / (n + 1 + i)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, i = this.max, s = this.options, o = s.time, r = o.unit || ki(o.minUnit, n, i, this._getLabelCapacity(n)), a = O(s.ticks.stepSize, 1), l = r === "week" ? o.isoWeekday : !1, c = Ut(l) || l === !0, h = {};
    let u = n, d, f;
    if (c && (u = +t.startOf(u, "isoWeek", l)), u = +t.startOf(u, c ? "day" : r), t.diff(i, n, r) > 1e5 * a)
      throw new Error(n + " and " + i + " are too far apart with stepSize of " + a + " " + r);
    const m = s.ticks.source === "data" && this.getDataTimestamps();
    for (d = u, f = 0; d < i; d = +t.add(d, a, r), f++)
      wi(h, d, m);
    return (d === i || s.bounds === "ticks" || f === 1) && wi(h, d, m), Object.keys(h).sort(xi).map((p) => +p);
  }
  getLabelForValue(t) {
    const n = this._adapter, i = this.options.time;
    return i.tooltipFormat ? n.format(t, i.tooltipFormat) : n.format(t, i.displayFormats.datetime);
  }
  format(t, n) {
    const s = this.options.time.displayFormats, o = this._unit, r = n || s[o];
    return this._adapter.format(t, r);
  }
  _tickFormatFunction(t, n, i, s) {
    const o = this.options, r = o.ticks.callback;
    if (r)
      return L(r, [
        t,
        n,
        i
      ], this);
    const a = o.time.displayFormats, l = this._unit, c = this._majorUnit, h = l && a[l], u = c && a[c], d = i[n], f = c && u && d && d.major;
    return this._adapter.format(t, s || (f ? u : h));
  }
  generateTickLabels(t) {
    let n, i, s;
    for (n = 0, i = t.length; n < i; ++n)
      s = t[n], s.label = this._tickFormatFunction(s.value, n, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const n = this._offsets, i = this.getDecimalForValue(t);
    return this.getPixelForDecimal((n.start + i) * n.factor);
  }
  getValueForPixel(t) {
    const n = this._offsets, i = this.getDecimalForPixel(t) / n.factor - n.end;
    return this.min + i * (this.max - this.min);
  }
  _getLabelSize(t) {
    const n = this.options.ticks, i = this.ctx.measureText(t).width, s = pt(this.isHorizontal() ? n.maxRotation : n.minRotation), o = Math.cos(s), r = Math.sin(s), a = this._resolveTickFontOptions(0).size;
    return {
      w: i * o + a * r,
      h: i * r + a * o
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, i = n.displayFormats, s = i[n.unit] || i.millisecond, o = this._tickFormatFunction(t, 0, Mi(this, [
      t
    ], this._majorUnit), s), r = this._getLabelSize(o), a = Math.floor(this.isHorizontal() ? this.width / r.w : this.height / r.h) - 1;
    return a > 0 ? a : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], n, i;
    if (t.length)
      return t;
    const s = this.getMatchingVisibleMetas();
    if (this._normalized && s.length)
      return this._cache.data = s[0].controller.getAllParsedValues(this);
    for (n = 0, i = s.length; n < i; ++n)
      t = t.concat(s[n].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let n, i;
    if (t.length)
      return t;
    const s = this.getLabels();
    for (n = 0, i = s.length; n < i; ++n)
      t.push(vi(this, s[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Go(t.sort(xi));
  }
}
function ue(e, t, n) {
  let i = 0, s = e.length - 1, o, r, a, l;
  n ? (t >= e[i].pos && t <= e[s].pos && ({ lo: i, hi: s } = gt(e, "pos", t)), { pos: o, time: a } = e[i], { pos: r, time: l } = e[s]) : (t >= e[i].time && t <= e[s].time && ({ lo: i, hi: s } = gt(e, "time", t)), { time: o, pos: a } = e[i], { time: r, pos: l } = e[s]);
  const c = r - o;
  return c ? a + (l - a) * (t - o) / c : a;
}
class _c extends Si {
  static id = "timeseries";
  static defaults = Si.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = ue(n, this.min), this._tableRange = ue(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: i } = this, s = [], o = [];
    let r, a, l, c, h;
    for (r = 0, a = t.length; r < a; ++r)
      c = t[r], c >= n && c <= i && s.push(c);
    if (s.length < 2)
      return [
        {
          time: n,
          pos: 0
        },
        {
          time: i,
          pos: 1
        }
      ];
    for (r = 0, a = s.length; r < a; ++r)
      h = s[r + 1], l = s[r - 1], c = s[r], Math.round((h + l) / 2) !== c && o.push({
        time: c,
        pos: r / (a - 1)
      });
    return o;
  }
  _generate() {
    const t = this.min, n = this.max;
    let i = super.getDataTimestamps();
    return (!i.includes(t) || !i.length) && i.splice(0, 0, t), (!i.includes(n) || i.length === 1) && i.push(n), i.sort((s, o) => s - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const n = this.getDataTimestamps(), i = this.getLabelTimestamps();
    return n.length && i.length ? t = this.normalize(n.concat(i)) : t = n.length ? n : i, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (ue(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, i = this.getDecimalForPixel(t) / n.factor - n.end;
    return ue(this._table, i * this._tableRange + this._minPos, !0);
  }
}
const uc = {
  __name: "Sparkline",
  props: {
    data: {
      type: Array,
      required: !0
    },
    color: {
      type: String,
      default: "#6366f1"
    },
    height: {
      type: Number,
      default: 40
    }
  },
  setup(e) {
    We.register(ga, Me, zl, ac, sc, tc);
    const t = e, n = ys(null);
    let i = null;
    function s(c) {
      if (!Array.isArray(c) || c.length === 0)
        return { min: -1, max: 1 };
      const h = c.map((p) => Number(p) || 0), u = Math.min(...h), d = Math.max(...h);
      if (u === d) {
        const p = Math.max(Math.abs(d) * 0.35, 1);
        return {
          min: u - p,
          max: d + p
        };
      }
      const f = d - u, m = Math.max(f * 0.18, 0.5);
      return {
        min: u - m,
        max: d + m
      };
    }
    function o(c) {
      if (typeof c != "string") return "#6366f1";
      const h = c.trim(), u = h.match(/^var\((--[^,)\s]+)(?:\s*,\s*([^)]+))?\)$/);
      if (!u) return h;
      const [, d, f] = u, m = getComputedStyle(document.documentElement).getPropertyValue(d).trim();
      return m ? o(m) : f ? o(f.trim()) : "#6366f1";
    }
    function r(c, h) {
      const u = document.createElement("canvas").getContext("2d");
      u.fillStyle = "#000", u.fillStyle = c;
      const d = u.fillStyle;
      if (d.startsWith("#")) {
        const m = d.length === 4 ? d.replace(/^#(.)(.)(.)$/, "#$1$1$2$2$3$3") : d, p = parseInt(m.slice(1, 3), 16), g = parseInt(m.slice(3, 5), 16), b = parseInt(m.slice(5, 7), 16);
        return `rgba(${p},${g},${b},${h})`;
      }
      const f = d.match(/^rgba?\(([^)]+)\)$/);
      if (f) {
        const [m, p, g] = f[1].split(",").map((b) => b.trim());
        return `rgba(${m},${p},${g},${h})`;
      }
      return d;
    }
    function a(c, h) {
      const u = o(h), d = c.createLinearGradient(0, 0, 0, t.height);
      return d.addColorStop(0, r(u, 0.25)), d.addColorStop(1, r(u, 0.02)), d;
    }
    function l() {
      if (!n.value) return;
      i && i.destroy();
      const c = n.value.getContext("2d"), h = o(t.color), u = s(t.data);
      i = new We(c, {
        type: "line",
        data: {
          labels: t.data.map((d, f) => f),
          datasets: [{
            data: t.data,
            borderColor: h,
            backgroundColor: a(c, h),
            borderWidth: 2,
            fill: !0,
            tension: 0.4,
            pointRadius: 0,
            pointHitRadius: 0
          }]
        },
        options: {
          responsive: !0,
          maintainAspectRatio: !1,
          plugins: {
            legend: { display: !1 },
            tooltip: { enabled: !1 }
          },
          scales: {
            x: { display: !1 },
            y: {
              display: !1,
              min: u.min,
              max: u.max
            }
          },
          animation: {
            duration: 500
          }
        }
      });
    }
    return xs(() => {
      l();
    }), vs(() => [t.data, t.color], () => {
      l();
    }, { deep: !0 }), ks(() => {
      i && (i.destroy(), i = null);
    }), (c, h) => (B(), V(
      "canvas",
      {
        ref_key: "canvas",
        ref: n,
        style: ws({ height: e.height + "px", width: "100%" })
      },
      null,
      4
      /* STYLE */
    ));
  }
}, dc = (e) => {
  e?.config?.globalProperties?.__primixWidgetsReady || (e.config.globalProperties.__primixWidgetsReady = !0, ms(e), e.component("PChart", Ci), e.component("PMeterGroup", Ii), e.component("PProgressBar", Li), e.component("PrimixSparkline", uc));
};
gs.setup(dc);
//# sourceMappingURL=primix-widgets.js.map
