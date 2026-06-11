import { s as A, x as b, c as h, B as C } from "./index-BjgkEHwo.js";
import { openBlock as S, createElementBlock as L, mergeProps as O, createElementVNode as H } from "vue";
import { B as x, i as B, z as $, v as d, C as f, f as m, P as M, W as k, j as D, n as I, U as y, o as R, u as W, Y as P, Q as v, l as E } from "./index-uMyjrk0Z.js";
import { C as j } from "./index-Cb10foaC.js";
var z = {
  name: "PlusIcon",
  extends: A
};
function V(i) {
  return N(i) || K(i) || U(i) || F();
}
function F() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function U(i, t) {
  if (i) {
    if (typeof i == "string") return _(i, t);
    var e = {}.toString.call(i).slice(8, -1);
    return e === "Object" && i.constructor && (e = i.constructor.name), e === "Map" || e === "Set" ? Array.from(i) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? _(i, t) : void 0;
  }
}
function K(i) {
  if (typeof Symbol < "u" && i[Symbol.iterator] != null || i["@@iterator"] != null) return Array.from(i);
}
function N(i) {
  if (Array.isArray(i)) return _(i);
}
function _(i, t) {
  (t == null || t > i.length) && (t = i.length);
  for (var e = 0, o = Array(t); e < t; e++) o[e] = i[e];
  return o;
}
function Z(i, t, e, o, n, r) {
  return S(), L("svg", O({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, i.pti()), V(t[0] || (t[0] = [H("path", {
    d: "M7.67742 6.32258V0.677419C7.67742 0.497757 7.60605 0.325452 7.47901 0.198411C7.35197 0.0713707 7.17966 0 7 0C6.82034 0 6.64803 0.0713707 6.52099 0.198411C6.39395 0.325452 6.32258 0.497757 6.32258 0.677419V6.32258H0.677419C0.497757 6.32258 0.325452 6.39395 0.198411 6.52099C0.0713707 6.64803 0 6.82034 0 7C0 7.17966 0.0713707 7.35197 0.198411 7.47901C0.325452 7.60605 0.497757 7.67742 0.677419 7.67742H6.32258V13.3226C6.32492 13.5015 6.39704 13.6725 6.52358 13.799C6.65012 13.9255 6.82106 13.9977 7 14C7.17966 14 7.35197 13.9286 7.47901 13.8016C7.60605 13.6745 7.67742 13.5022 7.67742 13.3226V7.67742H13.3226C13.5022 7.67742 13.6745 7.60605 13.8016 7.47901C13.9286 7.35197 14 7.17966 14 7C13.9977 6.82106 13.9255 6.65012 13.799 6.52358C13.6725 6.39704 13.5015 6.32492 13.3226 6.32258H7.67742Z",
    fill: "currentColor"
  }, null, -1)])), 16);
}
z.render = Z;
var Y = `
    .p-tooltip {
        position: absolute;
        display: none;
        max-width: dt('tooltip.max.width');
    }

    .p-tooltip-right,
    .p-tooltip-left {
        padding: 0 dt('tooltip.gutter');
    }

    .p-tooltip-top,
    .p-tooltip-bottom {
        padding: dt('tooltip.gutter') 0;
    }

    .p-tooltip-text {
        white-space: pre-line;
        word-break: break-word;
        background: dt('tooltip.background');
        color: dt('tooltip.color');
        padding: dt('tooltip.padding');
        box-shadow: dt('tooltip.shadow');
        border-radius: dt('tooltip.border.radius');
    }

    .p-tooltip-arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }

    .p-tooltip-right .p-tooltip-arrow {
        margin-top: calc(-1 * dt('tooltip.gutter'));
        border-width: dt('tooltip.gutter') dt('tooltip.gutter') dt('tooltip.gutter') 0;
        border-right-color: dt('tooltip.background');
    }

    .p-tooltip-left .p-tooltip-arrow {
        margin-top: calc(-1 * dt('tooltip.gutter'));
        border-width: dt('tooltip.gutter') 0 dt('tooltip.gutter') dt('tooltip.gutter');
        border-left-color: dt('tooltip.background');
    }

    .p-tooltip-top .p-tooltip-arrow {
        margin-left: calc(-1 * dt('tooltip.gutter'));
        border-width: dt('tooltip.gutter') dt('tooltip.gutter') 0 dt('tooltip.gutter');
        border-top-color: dt('tooltip.background');
        border-bottom-color: dt('tooltip.background');
    }

    .p-tooltip-bottom .p-tooltip-arrow {
        margin-left: calc(-1 * dt('tooltip.gutter'));
        border-width: 0 dt('tooltip.gutter') dt('tooltip.gutter') dt('tooltip.gutter');
        border-top-color: dt('tooltip.background');
        border-bottom-color: dt('tooltip.background');
    }
`, Q = {
  root: "p-tooltip p-component",
  arrow: "p-tooltip-arrow",
  text: "p-tooltip-text"
}, q = x.extend({
  name: "tooltip-directive",
  style: Y,
  classes: Q
}), G = C.extend({
  style: q
});
function J(i, t) {
  return ot(i) || et(i, t) || tt(i, t) || X();
}
function X() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function tt(i, t) {
  if (i) {
    if (typeof i == "string") return w(i, t);
    var e = {}.toString.call(i).slice(8, -1);
    return e === "Object" && i.constructor && (e = i.constructor.name), e === "Map" || e === "Set" ? Array.from(i) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? w(i, t) : void 0;
  }
}
function w(i, t) {
  (t == null || t > i.length) && (t = i.length);
  for (var e = 0, o = Array(t); e < t; e++) o[e] = i[e];
  return o;
}
function et(i, t) {
  var e = i == null ? null : typeof Symbol < "u" && i[Symbol.iterator] || i["@@iterator"];
  if (e != null) {
    var o, n, r, a, p = [], l = !0, s = !1;
    try {
      if (r = (e = e.call(i)).next, t !== 0) for (; !(l = (o = r.call(e)).done) && (p.push(o.value), p.length !== t); l = !0) ;
    } catch (c) {
      s = !0, n = c;
    } finally {
      try {
        if (!l && e.return != null && (a = e.return(), Object(a) !== a)) return;
      } finally {
        if (s) throw n;
      }
    }
    return p;
  }
}
function ot(i) {
  if (Array.isArray(i)) return i;
}
function T(i, t, e) {
  return (t = it(t)) in i ? Object.defineProperty(i, t, { value: e, enumerable: !0, configurable: !0, writable: !0 }) : i[t] = e, i;
}
function it(i) {
  var t = nt(i, "string");
  return u(t) == "symbol" ? t : t + "";
}
function nt(i, t) {
  if (u(i) != "object" || !i) return i;
  var e = i[Symbol.toPrimitive];
  if (e !== void 0) {
    var o = e.call(i, t);
    if (u(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(i);
}
function u(i) {
  "@babel/helpers - typeof";
  return u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, u(i);
}
var pt = G.extend("tooltip", {
  beforeMount: function(t, e) {
    var o, n = this.getTarget(t);
    if (n.$_ptooltipModifiers = this.getModifiers(e), e.value) {
      if (typeof e.value == "string")
        n.$_ptooltipValue = e.value, n.$_ptooltipDisabled = !1, n.$_ptooltipEscape = !0, n.$_ptooltipClass = null, n.$_ptooltipFitContent = !0, n.$_ptooltipIdAttr = h("pv_id") + "_tooltip", n.$_ptooltipShowDelay = 0, n.$_ptooltipHideDelay = 0, n.$_ptooltipAutoHide = !0;
      else if (u(e.value) === "object" && e.value) {
        if (E(e.value.value) || e.value.value.trim() === "") return;
        n.$_ptooltipValue = e.value.value, n.$_ptooltipDisabled = !!e.value.disabled === e.value.disabled ? e.value.disabled : !1, n.$_ptooltipEscape = !!e.value.escape === e.value.escape ? e.value.escape : !0, n.$_ptooltipClass = e.value.class || "", n.$_ptooltipFitContent = !!e.value.fitContent === e.value.fitContent ? e.value.fitContent : !0, n.$_ptooltipIdAttr = e.value.id || h("pv_id") + "_tooltip", n.$_ptooltipShowDelay = e.value.showDelay || 0, n.$_ptooltipHideDelay = e.value.hideDelay || 0, n.$_ptooltipAutoHide = !!e.value.autoHide === e.value.autoHide ? e.value.autoHide : !0;
      }
    } else return;
    n.$_ptooltipZIndex = (o = e.instance.$primevue) === null || o === void 0 || (o = o.config) === null || o === void 0 || (o = o.zIndex) === null || o === void 0 ? void 0 : o.tooltip, this.bindEvents(n, e), t.setAttribute("data-pd-tooltip", !0);
  },
  updated: function(t, e) {
    var o = this.getTarget(t);
    if (o.$_ptooltipModifiers = this.getModifiers(e), this.unbindEvents(o), !!e.value) {
      if (typeof e.value == "string")
        o.$_ptooltipValue = e.value, o.$_ptooltipDisabled = !1, o.$_ptooltipEscape = !0, o.$_ptooltipClass = null, o.$_ptooltipIdAttr = o.$_ptooltipIdAttr || h("pv_id") + "_tooltip", o.$_ptooltipShowDelay = 0, o.$_ptooltipHideDelay = 0, o.$_ptooltipAutoHide = !0, this.bindEvents(o, e);
      else if (u(e.value) === "object" && e.value)
        if (E(e.value.value) || e.value.value.trim() === "") {
          this.unbindEvents(o, e);
          return;
        } else
          o.$_ptooltipValue = e.value.value, o.$_ptooltipDisabled = !!e.value.disabled === e.value.disabled ? e.value.disabled : !1, o.$_ptooltipEscape = !!e.value.escape === e.value.escape ? e.value.escape : !0, o.$_ptooltipClass = e.value.class || "", o.$_ptooltipFitContent = !!e.value.fitContent === e.value.fitContent ? e.value.fitContent : !0, o.$_ptooltipIdAttr = e.value.id || o.$_ptooltipIdAttr || h("pv_id") + "_tooltip", o.$_ptooltipShowDelay = e.value.showDelay || 0, o.$_ptooltipHideDelay = e.value.hideDelay || 0, o.$_ptooltipAutoHide = !!e.value.autoHide === e.value.autoHide ? e.value.autoHide : !0, this.bindEvents(o, e);
    }
  },
  unmounted: function(t, e) {
    var o = this.getTarget(t);
    this.hide(t, 0), this.remove(o), this.unbindEvents(o, e), o.$_ptooltipScrollHandler && (o.$_ptooltipScrollHandler.destroy(), o.$_ptooltipScrollHandler = null);
  },
  timer: void 0,
  methods: {
    bindEvents: function(t, e) {
      var o = this, n = t.$_ptooltipModifiers;
      n.focus ? (t.$_ptooltipFocusEvent = function(r) {
        return o.onFocus(r, e);
      }, t.$_ptooltipBlurEvent = this.onBlur.bind(this), t.addEventListener("focus", t.$_ptooltipFocusEvent), t.addEventListener("blur", t.$_ptooltipBlurEvent)) : (t.$_ptooltipMouseEnterEvent = function(r) {
        return o.onMouseEnter(r, e);
      }, t.$_ptooltipMouseLeaveEvent = this.onMouseLeave.bind(this), t.$_ptooltipClickEvent = this.onClick.bind(this), t.addEventListener("mouseenter", t.$_ptooltipMouseEnterEvent), t.addEventListener("mouseleave", t.$_ptooltipMouseLeaveEvent), t.addEventListener("click", t.$_ptooltipClickEvent)), t.$_ptooltipKeydownEvent = this.onKeydown.bind(this), t.addEventListener("keydown", t.$_ptooltipKeydownEvent), t.$_pWindowResizeEvent = this.onWindowResize.bind(this, t);
    },
    unbindEvents: function(t) {
      var e = t.$_ptooltipModifiers;
      e.focus ? (t.removeEventListener("focus", t.$_ptooltipFocusEvent), t.$_ptooltipFocusEvent = null, t.removeEventListener("blur", t.$_ptooltipBlurEvent), t.$_ptooltipBlurEvent = null) : (t.removeEventListener("mouseenter", t.$_ptooltipMouseEnterEvent), t.$_ptooltipMouseEnterEvent = null, t.removeEventListener("mouseleave", t.$_ptooltipMouseLeaveEvent), t.$_ptooltipMouseLeaveEvent = null, t.removeEventListener("click", t.$_ptooltipClickEvent), t.$_ptooltipClickEvent = null), t.removeEventListener("keydown", t.$_ptooltipKeydownEvent), window.removeEventListener("resize", t.$_pWindowResizeEvent), t.$_ptooltipId && this.remove(t);
    },
    bindScrollListener: function(t) {
      var e = this;
      t.$_ptooltipScrollHandler || (t.$_ptooltipScrollHandler = new j(t, function() {
        e.hide(t);
      })), t.$_ptooltipScrollHandler.bindScrollListener();
    },
    unbindScrollListener: function(t) {
      t.$_ptooltipScrollHandler && t.$_ptooltipScrollHandler.unbindScrollListener();
    },
    onMouseEnter: function(t, e) {
      var o = t.currentTarget, n = o.$_ptooltipShowDelay;
      this.show(o, e, n);
    },
    onMouseLeave: function(t) {
      var e = t.currentTarget, o = e.$_ptooltipHideDelay, n = e.$_ptooltipAutoHide;
      if (n)
        this.hide(e, o);
      else {
        var r = v(t.target, "data-pc-name") === "tooltip" || v(t.target, "data-pc-section") === "arrow" || v(t.target, "data-pc-section") === "text" || v(t.relatedTarget, "data-pc-name") === "tooltip" || v(t.relatedTarget, "data-pc-section") === "arrow" || v(t.relatedTarget, "data-pc-section") === "text";
        !r && this.hide(e, o);
      }
    },
    onFocus: function(t, e) {
      var o = t.currentTarget, n = o.$_ptooltipShowDelay;
      this.show(o, e, n);
    },
    onBlur: function(t) {
      var e = t.currentTarget, o = e.$_ptooltipHideDelay;
      this.hide(e, o);
    },
    onClick: function(t) {
      var e = t.currentTarget, o = e.$_ptooltipHideDelay;
      this.hide(e, o);
    },
    onKeydown: function(t) {
      var e = t.currentTarget, o = e.$_ptooltipHideDelay;
      t.code === "Escape" && this.hide(t.currentTarget, o);
    },
    onWindowResize: function(t) {
      P() || this.hide(t), window.removeEventListener("resize", t.$_pWindowResizeEvent);
    },
    tooltipActions: function(t, e) {
      if (!(t.$_ptooltipDisabled || !R(t) || !t.$_ptooltipPendingShow)) {
        t.$_ptooltipPendingShow = !1;
        var o = this.create(t, e);
        this.align(t), !this.isUnstyled() && W(o, 250);
        var n = this;
        window.addEventListener("resize", t.$_pWindowResizeEvent), o.addEventListener("mouseleave", function r() {
          n.hide(t), o.removeEventListener("mouseleave", r), t.removeEventListener("mouseenter", t.$_ptooltipMouseEnterEvent), setTimeout(function() {
            return t.addEventListener("mouseenter", t.$_ptooltipMouseEnterEvent);
          }, 50);
        }), this.bindScrollListener(t), b.set("tooltip", o, t.$_ptooltipZIndex);
      }
    },
    show: function(t, e, o) {
      var n = this;
      o !== void 0 ? (this.timer = setTimeout(function() {
        return n.tooltipActions(t, e);
      }, o), t.$_ptooltipPendingShow = !0) : (this.tooltipActions(t, e), t.$_ptooltipPendingShow = !1);
    },
    tooltipRemoval: function(t) {
      this.remove(t), this.unbindScrollListener(t), window.removeEventListener("resize", t.$_pWindowResizeEvent);
    },
    hide: function(t, e) {
      var o = this;
      clearTimeout(this.timer), t.$_ptooltipPendingShow = !1, e !== void 0 ? setTimeout(function() {
        return o.tooltipRemoval(t);
      }, e) : this.tooltipRemoval(t);
    },
    getTooltipElement: function(t) {
      return document.getElementById(t.$_ptooltipId);
    },
    getArrowElement: function(t) {
      var e = this.getTooltipElement(t);
      return $(e, '[data-pc-section="arrow"]');
    },
    create: function(t) {
      var e = t.$_ptooltipModifiers, o = y("div", {
        class: !this.isUnstyled() && this.cx("arrow"),
        "p-bind": this.ptm("arrow", {
          context: e
        })
      }), n = y("div", {
        class: !this.isUnstyled() && this.cx("text"),
        "p-bind": this.ptm("text", {
          context: e
        })
      });
      t.$_ptooltipEscape ? (n.innerHTML = "", n.appendChild(document.createTextNode(t.$_ptooltipValue))) : n.innerHTML = t.$_ptooltipValue;
      var r = y("div", T(T({
        id: t.$_ptooltipIdAttr,
        role: "tooltip",
        style: {
          display: "inline-block",
          width: t.$_ptooltipFitContent ? "fit-content" : void 0,
          pointerEvents: !this.isUnstyled() && t.$_ptooltipAutoHide && "none"
        },
        class: [!this.isUnstyled() && this.cx("root"), t.$_ptooltipClass]
      }, this.$attrSelector, ""), "p-bind", this.ptm("root", {
        context: e
      })), o, n);
      return document.body.appendChild(r), t.$_ptooltipId = r.id, this.$el = r, r;
    },
    remove: function(t) {
      if (t) {
        var e = this.getTooltipElement(t);
        e && e.parentElement && (b.clear(e), document.body.removeChild(e)), t.$_ptooltipId = null;
      }
    },
    align: function(t) {
      var e = t.$_ptooltipModifiers;
      e.top ? (this.alignTop(t), this.isOutOfBounds(t) && (this.alignBottom(t), this.isOutOfBounds(t) && this.alignTop(t))) : e.left ? (this.alignLeft(t), this.isOutOfBounds(t) && (this.alignRight(t), this.isOutOfBounds(t) && (this.alignTop(t), this.isOutOfBounds(t) && (this.alignBottom(t), this.isOutOfBounds(t) && this.alignLeft(t))))) : e.bottom ? (this.alignBottom(t), this.isOutOfBounds(t) && (this.alignTop(t), this.isOutOfBounds(t) && this.alignBottom(t))) : (this.alignRight(t), this.isOutOfBounds(t) && (this.alignLeft(t), this.isOutOfBounds(t) && (this.alignTop(t), this.isOutOfBounds(t) && (this.alignBottom(t), this.isOutOfBounds(t) && this.alignRight(t)))));
    },
    getHostOffset: function(t) {
      var e = t.getBoundingClientRect(), o = e.left + D(), n = e.top + I();
      return {
        left: o,
        top: n
      };
    },
    alignRight: function(t) {
      this.preAlign(t, "right");
      var e = this.getTooltipElement(t), o = this.getArrowElement(t), n = this.getHostOffset(t), r = n.left + d(t), a = n.top + (f(t) - f(e)) / 2;
      e.style.left = r + "px", e.style.top = a + "px", o.style.top = "50%", o.style.right = null, o.style.bottom = null, o.style.left = "0";
    },
    alignLeft: function(t) {
      this.preAlign(t, "left");
      var e = this.getTooltipElement(t), o = this.getArrowElement(t), n = this.getHostOffset(t), r = n.left - d(e), a = n.top + (f(t) - f(e)) / 2;
      e.style.left = r + "px", e.style.top = a + "px", o.style.top = "50%", o.style.right = "0", o.style.bottom = null, o.style.left = null;
    },
    alignTop: function(t) {
      this.preAlign(t, "top");
      var e = this.getTooltipElement(t), o = this.getArrowElement(t), n = d(e), r = d(t), a = m(), p = a.width, l = this.getHostOffset(t), s = l.left + (r - n) / 2, c = l.top - f(e);
      s < 0 ? s = 0 : s + n > p && (s = Math.floor(l.left + r - n)), e.style.left = s + "px", e.style.top = c + "px";
      var g = l.left - this.getHostOffset(e).left + r / 2;
      o.style.top = null, o.style.right = null, o.style.bottom = "0", o.style.left = g + "px";
    },
    alignBottom: function(t) {
      this.preAlign(t, "bottom");
      var e = this.getTooltipElement(t), o = this.getArrowElement(t), n = d(e), r = d(t), a = m(), p = a.width, l = this.getHostOffset(t), s = l.left + (r - n) / 2, c = l.top + f(t);
      s < 0 ? s = 0 : s + n > p && (s = Math.floor(l.left + r - n)), e.style.left = s + "px", e.style.top = c + "px";
      var g = l.left - this.getHostOffset(e).left + r / 2;
      o.style.top = "0", o.style.right = null, o.style.bottom = null, o.style.left = g + "px";
    },
    preAlign: function(t, e) {
      var o = this.getTooltipElement(t);
      o.style.left = "-999px", o.style.top = "-999px", M(o, "p-tooltip-".concat(o.$_ptooltipPosition)), !this.isUnstyled() && k(o, "p-tooltip-".concat(e)), o.$_ptooltipPosition = e, o.setAttribute("data-p-position", e);
    },
    isOutOfBounds: function(t) {
      var e = this.getTooltipElement(t), o = e.getBoundingClientRect(), n = o.top, r = o.left, a = d(e), p = f(e), l = m();
      return r + a > l.width || r < 0 || n < 0 || n + p > l.height;
    },
    getTarget: function(t) {
      var e;
      return B(t, "p-inputwrapper") && (e = $(t, "input")) !== null && e !== void 0 ? e : t;
    },
    getModifiers: function(t) {
      return t.modifiers && Object.keys(t.modifiers).length ? t.modifiers : t.arg && u(t.arg) === "object" ? Object.entries(t.arg).reduce(function(e, o) {
        var n = J(o, 2), r = n[0], a = n[1];
        return (r === "event" || r === "position") && (e[a] = !0), e;
      }, {}) : {};
    }
  }
});
export {
  pt as T,
  z as s
};
//# sourceMappingURL=index-CGQIuEMq.js.map
