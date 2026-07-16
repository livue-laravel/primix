import ue from "livue";
import { B as fe, b as me, W as pe } from "../support/chunks/index-uMyjrk0Z.js";
import { a as ve, x as J } from "../support/chunks/index-BjgkEHwo.js";
import { s as ge } from "../support/chunks/index-D-cypkd-.js";
import { s as ye } from "../support/chunks/index-CaXeSIux.js";
import { F as he } from "../support/chunks/index-T4OHDugx.js";
import { u as ke, b as we } from "../support/chunks/index-D4gLhgZh.js";
import { s as xe, f as be } from "../support/chunks/index-CoIgDweF.js";
import { resolveComponent as H, resolveDirective as Ce, openBlock as d, createBlock as T, withCtx as L, createElementBlock as f, mergeProps as I, createVNode as R, Transition as N, withDirectives as F, renderSlot as A, Fragment as M, createElementVNode as a, normalizeClass as B, toDisplayString as h, createCommentVNode as u, resolveDynamicComponent as ne, ref as w, onMounted as O, onBeforeUnmount as re, vShow as Le, onUnmounted as G, TransitionGroup as Me, renderList as j, computed as E, createTextVNode as K, h as b, defineComponent as $e, withKeys as z, withModifiers as D, vModelText as X, Teleport as oe, inject as Q, watch as ae, nextTick as Se } from "vue";
var Be = `
    .p-drawer {
        display: flex;
        flex-direction: column;
        transform: translate3d(0px, 0px, 0px);
        position: relative;
        transition: transform 0.3s;
        background: dt('drawer.background');
        color: dt('drawer.color');
        border-style: solid;
        border-color: dt('drawer.border.color');
        box-shadow: dt('drawer.shadow');
    }

    .p-drawer-content {
        overflow-y: auto;
        flex-grow: 1;
        padding: dt('drawer.content.padding');
    }

    .p-drawer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        padding: dt('drawer.header.padding');
    }

    .p-drawer-footer {
        padding: dt('drawer.footer.padding');
    }

    .p-drawer-title {
        font-weight: dt('drawer.title.font.weight');
        font-size: dt('drawer.title.font.size');
    }

    .p-drawer-full .p-drawer {
        transition: none;
        transform: none;
        width: 100vw !important;
        height: 100vh !important;
        max-height: 100%;
        top: 0px !important;
        left: 0px !important;
        border-width: 1px;
    }

    .p-drawer-left .p-drawer-enter-active {
        animation: p-animate-drawer-enter-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-left .p-drawer-leave-active {
        animation: p-animate-drawer-leave-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-right .p-drawer-enter-active {
        animation: p-animate-drawer-enter-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-right .p-drawer-leave-active {
        animation: p-animate-drawer-leave-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-top .p-drawer-enter-active {
        animation: p-animate-drawer-enter-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-top .p-drawer-leave-active {
        animation: p-animate-drawer-leave-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-bottom .p-drawer-enter-active {
        animation: p-animate-drawer-enter-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-bottom .p-drawer-leave-active {
        animation: p-animate-drawer-leave-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-full .p-drawer-enter-active {
        animation: p-animate-drawer-enter-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-full .p-drawer-leave-active {
        animation: p-animate-drawer-leave-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    
    .p-drawer-left .p-drawer {
        width: 20rem;
        height: 100%;
        border-inline-end-width: 1px;
    }

    .p-drawer-right .p-drawer {
        width: 20rem;
        height: 100%;
        border-inline-start-width: 1px;
    }

    .p-drawer-top .p-drawer {
        height: 10rem;
        width: 100%;
        border-block-end-width: 1px;
    }

    .p-drawer-bottom .p-drawer {
        height: 10rem;
        width: 100%;
        border-block-start-width: 1px;
    }

    .p-drawer-left .p-drawer-content,
    .p-drawer-right .p-drawer-content,
    .p-drawer-top .p-drawer-content,
    .p-drawer-bottom .p-drawer-content {
        width: 100%;
        height: 100%;
    }

    .p-drawer-open {
        display: flex;
    }

    .p-drawer-mask:dir(rtl) {
        flex-direction: row-reverse;
    }

    @keyframes p-animate-drawer-enter-left {
        from {
            transform: translate3d(-100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-left {
        to {
            transform: translate3d(-100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-right {
        from {
            transform: translate3d(100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-right {
        to {
            transform: translate3d(100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-top {
        from {
            transform: translate3d(0px, -100%, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-top {
        to {
            transform: translate3d(0px, -100%, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-bottom {
        from {
            transform: translate3d(0px, 100%, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-bottom {
        to {
            transform: translate3d(0px, 100%, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-full {
        from {
            opacity: 0;
            transform: scale(0.93);
        }
    }

    @keyframes p-animate-drawer-leave-full {
        to {
            opacity: 0;
            transform: scale(0.93);
        }
    }
`, Te = {
  mask: function(t) {
    var r = t.position, n = t.modal;
    return {
      position: "fixed",
      height: "100%",
      width: "100%",
      left: 0,
      top: 0,
      display: "flex",
      justifyContent: r === "left" ? "flex-start" : r === "right" ? "flex-end" : "center",
      alignItems: r === "top" ? "flex-start" : r === "bottom" ? "flex-end" : "center",
      pointerEvents: n ? "auto" : "none"
    };
  },
  root: {
    pointerEvents: "auto"
  }
}, Ie = {
  mask: function(t) {
    var r = t.instance, n = t.props, l = ["left", "right", "top", "bottom"], i = l.find(function(s) {
      return s === n.position;
    });
    return ["p-drawer-mask", {
      "p-overlay-mask p-overlay-mask-enter-active": n.modal,
      "p-drawer-open": r.containerVisible,
      "p-drawer-full": r.fullScreen
    }, i ? "p-drawer-".concat(i) : ""];
  },
  root: function(t) {
    var r = t.instance;
    return ["p-drawer p-component", {
      "p-drawer-full": r.fullScreen
    }];
  },
  header: "p-drawer-header",
  title: "p-drawer-title",
  pcCloseButton: "p-drawer-close-button",
  content: "p-drawer-content",
  footer: "p-drawer-footer"
}, Ae = fe.extend({
  name: "drawer",
  style: Be,
  classes: Ie,
  inlineStyles: Te
}), Ee = {
  name: "BaseDrawer",
  extends: xe,
  props: {
    visible: {
      type: Boolean,
      default: !1
    },
    position: {
      type: String,
      default: "left"
    },
    header: {
      type: null,
      default: null
    },
    baseZIndex: {
      type: Number,
      default: 0
    },
    autoZIndex: {
      type: Boolean,
      default: !0
    },
    dismissable: {
      type: Boolean,
      default: !0
    },
    showCloseIcon: {
      type: Boolean,
      default: !0
    },
    closeButtonProps: {
      type: Object,
      default: function() {
        return {
          severity: "secondary",
          text: !0,
          rounded: !0
        };
      }
    },
    closeIcon: {
      type: String,
      default: void 0
    },
    modal: {
      type: Boolean,
      default: !0
    },
    blockScroll: {
      type: Boolean,
      default: !1
    },
    closeOnEscape: {
      type: Boolean,
      default: !0
    }
  },
  style: Ae,
  provide: function() {
    return {
      $pcDrawer: this,
      $parentInstance: this
    };
  }
};
function W(e) {
  "@babel/helpers - typeof";
  return W = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, W(e);
}
function Y(e, t, r) {
  return (t = Pe(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Pe(e) {
  var t = De(e, "string");
  return W(t) == "symbol" ? t : t + "";
}
function De(e, t) {
  if (W(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (W(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ie = {
  name: "Drawer",
  extends: Ee,
  inheritAttrs: !1,
  emits: ["update:visible", "show", "after-show", "hide", "after-hide", "before-hide"],
  data: function() {
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
    dismissable: function(t) {
      t && !this.modal ? this.bindOutsideClickListener() : this.unbindOutsideClickListener();
    }
  },
  updated: function() {
    this.visible && (this.containerVisible = this.visible);
  },
  beforeUnmount: function() {
    this.disableDocumentSettings(), this.mask && this.autoZIndex && J.clear(this.mask), this.container = null, this.mask = null;
  },
  methods: {
    hide: function() {
      this.$emit("update:visible", !1);
    },
    onEnter: function() {
      this.$emit("show"), this.focus(), this.bindDocumentKeyDownListener(), this.autoZIndex && J.set("modal", this.mask, this.baseZIndex || this.$primevue.config.zIndex.modal);
    },
    onAfterEnter: function() {
      this.enableDocumentSettings(), this.$emit("after-show");
    },
    onBeforeLeave: function() {
      this.modal && !this.isUnstyled && pe(this.mask, "p-overlay-mask-leave-active"), this.$emit("before-hide");
    },
    onLeave: function() {
      this.$emit("hide");
    },
    onAfterLeave: function() {
      this.autoZIndex && J.clear(this.mask), this.unbindDocumentKeyDownListener(), this.containerVisible = !1, this.disableDocumentSettings(), this.$emit("after-hide");
    },
    onMaskClick: function(t) {
      this.dismissable && this.modal && this.mask === t.target && this.hide();
    },
    focus: function() {
      var t = function(l) {
        return l && l.querySelector("[autofocus]");
      }, r = this.$slots.header && t(this.headerContainer);
      r || (r = this.$slots.default && t(this.container), r || (r = this.$slots.footer && t(this.footerContainer), r || (r = this.closeButton))), r && me(r);
    },
    enableDocumentSettings: function() {
      this.dismissable && !this.modal && this.bindOutsideClickListener(), this.blockScroll && we();
    },
    disableDocumentSettings: function() {
      this.unbindOutsideClickListener(), this.blockScroll && ke();
    },
    onKeydown: function(t) {
      t.code === "Escape" && this.closeOnEscape && this.hide();
    },
    containerRef: function(t) {
      this.container = t;
    },
    maskRef: function(t) {
      this.mask = t;
    },
    contentRef: function(t) {
      this.content = t;
    },
    headerContainerRef: function(t) {
      this.headerContainer = t;
    },
    footerContainerRef: function(t) {
      this.footerContainer = t;
    },
    closeButtonRef: function(t) {
      this.closeButton = t ? t.$el : void 0;
    },
    bindDocumentKeyDownListener: function() {
      this.documentKeydownListener || (this.documentKeydownListener = this.onKeydown, document.addEventListener("keydown", this.documentKeydownListener));
    },
    unbindDocumentKeyDownListener: function() {
      this.documentKeydownListener && (document.removeEventListener("keydown", this.documentKeydownListener), this.documentKeydownListener = null);
    },
    bindOutsideClickListener: function() {
      var t = this;
      this.outsideClickListener || (this.outsideClickListener = function(r) {
        t.isOutsideClicked(r) && t.hide();
      }, document.addEventListener("click", this.outsideClickListener, !0));
    },
    unbindOutsideClickListener: function() {
      this.outsideClickListener && (document.removeEventListener("click", this.outsideClickListener, !0), this.outsideClickListener = null);
    },
    isOutsideClicked: function(t) {
      return this.container && !this.container.contains(t.target);
    }
  },
  computed: {
    fullScreen: function() {
      return this.position === "full";
    },
    closeAriaLabel: function() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : void 0;
    },
    dataP: function() {
      return be(Y(Y(Y({
        "full-screen": this.position === "full"
      }, this.position, this.position), "open", this.containerVisible), "modal", this.modal));
    }
  },
  directives: {
    focustrap: he
  },
  components: {
    Button: ye,
    Portal: ve,
    TimesIcon: ge
  }
}, Re = ["data-p"], je = ["role", "aria-modal", "data-p"];
function ze(e, t, r, n, l, i) {
  var s = H("Button"), o = H("Portal"), c = Ce("focustrap");
  return d(), T(o, null, {
    default: L(function() {
      return [l.containerVisible ? (d(), f("div", I({
        key: 0,
        ref: i.maskRef,
        onMousedown: t[0] || (t[0] = function() {
          return i.onMaskClick && i.onMaskClick.apply(i, arguments);
        }),
        class: e.cx("mask"),
        style: e.sx("mask", !0, {
          position: e.position,
          modal: e.modal
        }),
        "data-p": i.dataP
      }, e.ptm("mask")), [R(N, I({
        name: "p-drawer",
        onEnter: i.onEnter,
        onAfterEnter: i.onAfterEnter,
        onBeforeLeave: i.onBeforeLeave,
        onLeave: i.onLeave,
        onAfterLeave: i.onAfterLeave,
        appear: ""
      }, e.ptm("transition")), {
        default: L(function() {
          return [e.visible ? F((d(), f("div", I({
            key: 0,
            ref: i.containerRef,
            class: e.cx("root"),
            style: e.sx("root"),
            role: e.modal ? "dialog" : "complementary",
            "aria-modal": e.modal ? !0 : void 0,
            "data-p": i.dataP
          }, e.ptmi("root")), [e.$slots.container ? A(e.$slots, "container", {
            key: 0,
            closeCallback: i.hide
          }) : (d(), f(M, {
            key: 1
          }, [a("div", I({
            ref: i.headerContainerRef,
            class: e.cx("header")
          }, e.ptm("header")), [A(e.$slots, "header", {
            class: B(e.cx("title"))
          }, function() {
            return [e.header ? (d(), f("div", I({
              key: 0,
              class: e.cx("title")
            }, e.ptm("title")), h(e.header), 17)) : u("", !0)];
          }), e.showCloseIcon ? A(e.$slots, "closebutton", {
            key: 0,
            closeCallback: i.hide
          }, function() {
            return [R(s, I({
              ref: i.closeButtonRef,
              type: "button",
              class: e.cx("pcCloseButton"),
              "aria-label": i.closeAriaLabel,
              unstyled: e.unstyled,
              onClick: i.hide
            }, e.closeButtonProps, {
              pt: e.ptm("pcCloseButton"),
              "data-pc-group-section": "iconcontainer"
            }), {
              icon: L(function(m) {
                return [A(e.$slots, "closeicon", {}, function() {
                  return [(d(), T(ne(e.closeIcon ? "span" : "TimesIcon"), I({
                    class: [e.closeIcon, m.class]
                  }, e.ptm("pcCloseButton").icon), null, 16, ["class"]))];
                })];
              }),
              _: 3
            }, 16, ["class", "aria-label", "unstyled", "onClick", "pt"])];
          }) : u("", !0)], 16), a("div", I({
            ref: i.contentRef,
            class: e.cx("content")
          }, e.ptm("content")), [A(e.$slots, "default")], 16), e.$slots.footer ? (d(), f("div", I({
            key: 0,
            ref: i.footerContainerRef,
            class: e.cx("footer")
          }, e.ptm("footer")), [A(e.$slots, "footer")], 16)) : u("", !0)], 64))], 16, je)), [[c]]) : u("", !0)];
        }),
        _: 3
      }, 16, ["onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])], 16, Re)) : u("", !0)];
    }),
    _: 3
  });
}
ie.render = ze;
const Ne = { key: 0 }, Oe = {
  __name: "Dropdown",
  setup(e) {
    const t = w(null), r = w(!1);
    function n() {
      r.value = !r.value;
    }
    function l() {
      r.value = !1;
    }
    function i(s) {
      r.value && t.value && !t.value.contains(s.target) && l();
    }
    return O(() => {
      document.addEventListener("click", i);
    }), re(() => {
      document.removeEventListener("click", i);
    }), (s, o) => (d(), f(
      "div",
      {
        ref_key: "container",
        ref: t,
        class: "relative"
      },
      [
        A(s.$slots, "trigger", {
          open: r.value,
          toggle: n
        }),
        R(N, {
          "enter-active-class": "transition ease-out duration-100",
          "enter-from-class": "transform opacity-0 scale-95",
          "enter-to-class": "transform opacity-100 scale-100",
          "leave-active-class": "transition ease-in duration-75",
          "leave-from-class": "transform opacity-100 scale-100",
          "leave-to-class": "transform opacity-0 scale-95"
        }, {
          default: L(() => [
            r.value ? (d(), f("div", Ne, [
              A(s.$slots, "default", { close: l })
            ])) : u("v-if", !0)
          ]),
          _: 3
          /* FORWARDED */
        })
      ],
      512
      /* NEED_PATCH */
    ));
  }
}, Ue = {
  __name: "Collapsible",
  props: {
    defaultOpen: {
      type: Boolean,
      default: !0
    }
  },
  setup(e) {
    const r = w(e.defaultOpen);
    function n() {
      r.value = !r.value;
    }
    function l(p) {
      p.style.height = "0", p.style.overflow = "hidden";
    }
    function i(p) {
      p.style.height = p.scrollHeight + "px", p.style.transition = "height 0.2s ease";
    }
    function s(p) {
      p.style.height = "", p.style.overflow = "", p.style.transition = "";
    }
    function o(p) {
      p.style.height = p.scrollHeight + "px", p.style.overflow = "hidden";
    }
    function c(p) {
      p.offsetHeight, p.style.height = "0", p.style.transition = "height 0.2s ease";
    }
    function m(p) {
      p.style.height = "", p.style.overflow = "", p.style.transition = "";
    }
    return (p, g) => (d(), f("div", null, [
      A(p.$slots, "trigger", {
        open: r.value,
        toggle: n
      }),
      R(N, {
        onBeforeEnter: l,
        onEnter: i,
        onAfterEnter: s,
        onBeforeLeave: o,
        onLeave: c,
        onAfterLeave: m,
        persisted: ""
      }, {
        default: L(() => [
          F(a(
            "div",
            null,
            [
              A(p.$slots, "default")
            ],
            512
            /* NEED_PATCH */
          ), [
            [Le, r.value]
          ])
        ]),
        _: 3
        /* FORWARDED */
      })
    ]));
  }
}, Ke = { key: 0 }, Ve = {
  __name: "Toast",
  props: {
    duration: {
      type: Number,
      default: 5e3
    }
  },
  setup(e) {
    const t = e, r = w(!0);
    function n() {
      r.value = !1;
    }
    return O(() => {
      t.duration > 0 && setTimeout(n, t.duration);
    }), (l, i) => (d(), T(N, {
      "enter-active-class": "transform ease-out duration-300 transition",
      "enter-from-class": "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",
      "enter-to-class": "translate-y-0 opacity-100 sm:translate-x-0",
      "leave-active-class": "transition ease-in duration-100",
      "leave-from-class": "opacity-100",
      "leave-to-class": "opacity-0"
    }, {
      default: L(() => [
        r.value ? (d(), f("div", Ke, [
          A(l.$slots, "default", { close: n })
        ])) : u("v-if", !0)
      ]),
      _: 3
      /* FORWARDED */
    }));
  }
}, He = { class: "p-4" }, Ze = { class: "flex items-start" }, qe = {
  key: 0,
  class: "flex-shrink-0"
}, We = { class: "ml-3 w-0 flex-1 pt-0.5" }, _e = {
  key: 0,
  class: "text-sm font-medium text-gray-900 dark:text-white"
}, Fe = {
  key: 1,
  class: "mt-1 text-sm text-gray-500 dark:text-gray-400"
}, Ge = {
  key: 1,
  class: "ml-4 flex flex-shrink-0"
}, Je = ["onClick"], Ye = {
  __name: "NotificationToasts",
  setup(e) {
    const t = w([]);
    let r = 0;
    const n = {
      success: "text-green-400",
      danger: "text-red-400",
      warning: "text-yellow-400",
      info: "text-blue-400",
      primary: "text-blue-400",
      gray: "text-gray-400"
    };
    function l(o) {
      return n[o] || "text-gray-400";
    }
    function i(o) {
      t.value = t.value.filter((c) => c.id !== o);
    }
    function s(o) {
      const c = o.detail, m = ++r, p = { ...c, id: m };
      t.value.push(p);
      const g = c.duration ?? 5e3;
      g > 0 && setTimeout(() => i(m), g);
    }
    return O(() => {
      window.addEventListener("primix:notification", s);
    }), G(() => {
      window.removeEventListener("primix:notification", s);
    }), (o, c) => (d(), T(Me, {
      "enter-active-class": "transform ease-out duration-300 transition",
      "enter-from-class": "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",
      "enter-to-class": "translate-y-0 opacity-100 sm:translate-x-0",
      "leave-active-class": "transition ease-in duration-100",
      "leave-from-class": "opacity-100",
      "leave-to-class": "opacity-0"
    }, {
      default: L(() => [
        (d(!0), f(
          M,
          null,
          j(t.value, (m) => (d(), f("div", {
            key: m.id,
            class: "pointer-events-auto mb-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
          }, [
            a("div", He, [
              a("div", Ze, [
                m.icon ? (d(), f("div", qe, [
                  m.icon === "heroicon-o-check-circle" ? (d(), f(
                    "svg",
                    {
                      key: 0,
                      class: B(["h-6 w-6", l(m.color)]),
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor"
                    },
                    [...c[0] || (c[0] = [
                      a(
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
                  )) : m.icon === "heroicon-o-exclamation-triangle" ? (d(), f(
                    "svg",
                    {
                      key: 1,
                      class: B(["h-6 w-6", l(m.color)]),
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor"
                    },
                    [...c[1] || (c[1] = [
                      a(
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
                  )) : m.icon === "heroicon-o-x-circle" ? (d(), f(
                    "svg",
                    {
                      key: 2,
                      class: B(["h-6 w-6", l(m.color)]),
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor"
                    },
                    [...c[2] || (c[2] = [
                      a(
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
                  )) : m.icon === "heroicon-o-information-circle" ? (d(), f(
                    "svg",
                    {
                      key: 3,
                      class: B(["h-6 w-6", l(m.color)]),
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor"
                    },
                    [...c[3] || (c[3] = [
                      a(
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
                  )) : u("v-if", !0)
                ])) : u("v-if", !0),
                a("div", We, [
                  m.title ? (d(), f(
                    "p",
                    _e,
                    h(m.title),
                    1
                    /* TEXT */
                  )) : u("v-if", !0),
                  m.body ? (d(), f(
                    "p",
                    Fe,
                    h(m.body),
                    1
                    /* TEXT */
                  )) : u("v-if", !0)
                ]),
                m.closeable !== !1 ? (d(), f("div", Ge, [
                  a("button", {
                    onClick: (p) => i(m.id),
                    type: "button",
                    class: "inline-flex rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  }, [...c[4] || (c[4] = [
                    a(
                      "span",
                      { class: "sr-only" },
                      "Close",
                      -1
                      /* CACHED */
                    ),
                    a(
                      "svg",
                      {
                        class: "h-5 w-5",
                        viewBox: "0 0 20 20",
                        fill: "currentColor"
                      },
                      [
                        a("path", {
                          "fill-rule": "evenodd",
                          d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                          "clip-rule": "evenodd"
                        })
                      ],
                      -1
                      /* CACHED */
                    )
                  ])], 8, Je)
                ])) : u("v-if", !0)
              ])
            ])
          ]))),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      _: 1
      /* STABLE */
    }));
  }
}, Qe = ["onClick"], Xe = {
  key: 0,
  class: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor"
}, et = { class: "absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none" }, tt = { class: "py-1" }, nt = ["onClick"], ee = "primix-color-mode", rt = {
  __name: "ThemeToggle",
  setup(e) {
    const l = [
      { value: "light", label: "Light", icon: {
        render() {
          return b("svg", { fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [
            b("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" })
          ]);
        }
      } },
      { value: "dark", label: "Dark", icon: {
        render() {
          return b("svg", { fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [
            b("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" })
          ]);
        }
      } },
      { value: "system", label: "System", icon: {
        render() {
          return b("svg", { fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [
            b("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" })
          ]);
        }
      } }
    ], i = w("system"), s = w(!1), o = E(() => i.value === "system" ? s.value ? "dark" : "light" : i.value);
    let c = null;
    function m() {
      o.value === "dark" ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
    }
    function p(v) {
      i.value = v, localStorage.setItem(ee, v), m();
    }
    function g(v) {
      s.value = v.matches, i.value === "system" && m();
    }
    return O(() => {
      const v = localStorage.getItem(ee);
      v && ["light", "dark", "system"].includes(v) && (i.value = v), c = window.matchMedia("(prefers-color-scheme: dark)"), s.value = c.matches, c.addEventListener("change", g), m();
    }), re(() => {
      c && c.removeEventListener("change", g);
    }), (v, k) => {
      const $ = H("PrimixDropdown");
      return d(), T($, null, {
        trigger: L(({ toggle: S }) => [
          a("button", {
            type: "button",
            class: "-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300",
            onClick: S
          }, [
            k[2] || (k[2] = a(
              "span",
              { class: "sr-only" },
              "Toggle theme",
              -1
              /* CACHED */
            )),
            u(" Sun icon (light mode) "),
            o.value === "light" ? (d(), f("svg", Xe, [...k[0] || (k[0] = [
              a(
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
            ])])) : (d(), f(
              M,
              { key: 1 },
              [
                u(" Moon icon (dark mode) "),
                k[1] || (k[1] = a(
                  "svg",
                  {
                    class: "h-6 w-6",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor"
                  },
                  [
                    a("path", {
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
          ], 8, Qe)
        ]),
        default: L(({ close: S }) => [
          a("div", et, [
            a("div", tt, [
              (d(), f(
                M,
                null,
                j(l, (P) => a("button", {
                  key: P.value,
                  type: "button",
                  class: B(["flex w-full items-center gap-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700", { "bg-gray-50 dark:bg-gray-700/50 font-medium": i.value === P.value }]),
                  onClick: (Z) => {
                    p(P.value), S();
                  }
                }, [
                  (d(), T(ne(P.icon), { class: "h-4 w-4" })),
                  K(
                    " " + h(P.label),
                    1
                    /* TEXT */
                  )
                ], 10, nt)),
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
}, ot = ["onClick"], at = ["src", "alt"], it = {
  key: 1,
  class: "flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300"
}, st = { class: "hidden lg:flex lg:items-center" }, lt = { class: "ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-white" }, dt = { class: "absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none" }, ct = { class: "px-4 py-3 border-b border-gray-100 dark:border-gray-700" }, ut = { class: "text-sm font-medium text-gray-900 dark:text-white truncate" }, ft = {
  key: 0,
  class: "text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5"
}, mt = { class: "py-1" }, pt = ["href", "onClick"], vt = { class: "py-1" }, gt = ["onClick"], yt = {
  __name: "UserMenu",
  props: {
    userMenu: {
      type: Object,
      default: () => ({})
    },
    spa: {
      type: Boolean,
      default: !1
    },
    csrfToken: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e, r = E(() => {
      const o = t.userMenu.userName ?? "";
      return o ? o.split(" ").map((c) => c.charAt(0)).slice(0, 2).join("").toUpperCase() : "?";
    }), n = E(() => (t.userMenu.items ?? []).filter((o) => !o.isPostAction)), l = E(() => (t.userMenu.items ?? []).filter((o) => o.isPostAction));
    function i(o) {
      return o === "danger" ? "text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-300";
    }
    function s(o) {
      const c = document.createElement("form");
      c.method = "POST", c.action = o;
      const m = document.createElement("input");
      m.type = "hidden", m.name = "_token", m.value = t.csrfToken, c.appendChild(m), document.body.appendChild(c), c.submit();
    }
    return (o, c) => {
      const m = H("PrimixDropdown");
      return d(), T(m, null, {
        trigger: L(({ toggle: p }) => [
          a("button", {
            type: "button",
            class: "-m-1.5 flex items-center p-1.5",
            onClick: p
          }, [
            c[1] || (c[1] = a(
              "span",
              { class: "sr-only" },
              "Open user menu",
              -1
              /* CACHED */
            )),
            u(" Avatar "),
            e.userMenu.avatarUrl ? (d(), f("img", {
              key: 0,
              src: e.userMenu.avatarUrl,
              alt: e.userMenu.userName,
              class: "h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 object-cover"
            }, null, 8, at)) : (d(), f(
              "span",
              it,
              h(r.value),
              1
              /* TEXT */
            )),
            a("span", st, [
              a(
                "span",
                lt,
                h(e.userMenu.userName ?? "User"),
                1
                /* TEXT */
              ),
              c[0] || (c[0] = a(
                "svg",
                {
                  class: "ml-2 h-5 w-5 text-gray-400",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                },
                [
                  a("path", {
                    "fill-rule": "evenodd",
                    d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
                    "clip-rule": "evenodd"
                  })
                ],
                -1
                /* CACHED */
              ))
            ])
          ], 8, ot)
        ]),
        default: L(({ close: p }) => [
          a("div", dt, [
            u(" User info header "),
            a("div", ct, [
              a(
                "p",
                ut,
                h(e.userMenu.userName),
                1
                /* TEXT */
              ),
              e.userMenu.userEmail ? (d(), f(
                "p",
                ft,
                h(e.userMenu.userEmail),
                1
                /* TEXT */
              )) : u("v-if", !0)
            ]),
            u(" Menu items "),
            a("div", mt, [
              (d(!0), f(
                M,
                null,
                j(n.value, (g, v) => (d(), f("a", I({
                  key: v,
                  href: g.url
                }, { ref_for: !0 }, e.spa ? { "data-livue-navigate": "true" } : {}, {
                  class: "flex w-full items-center gap-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                  onClick: p
                }), h(g.label), 17, pt))),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            u(" Logout (post actions) "),
            l.value.length > 0 ? (d(), f(
              M,
              { key: 0 },
              [
                c[2] || (c[2] = a(
                  "div",
                  { class: "border-t border-gray-100 dark:border-gray-700" },
                  null,
                  -1
                  /* CACHED */
                )),
                a("div", vt, [
                  (d(!0), f(
                    M,
                    null,
                    j(l.value, (g, v) => (d(), f("button", {
                      key: "post-" + v,
                      type: "button",
                      class: B(["flex w-full items-center gap-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700", i(g.color)]),
                      onClick: (k) => {
                        s(g.url), p();
                      }
                    }, h(g.label), 11, gt))),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            )) : u("v-if", !0)
          ])
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
}, ht = ["onClick"], kt = { class: "hidden lg:flex lg:items-center" }, wt = { class: "ml-2 text-sm font-semibold leading-6 text-gray-900 dark:text-white" }, xt = { class: "absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none" }, bt = { class: "px-4 py-3 border-b border-gray-100 dark:border-gray-700" }, Ct = { class: "text-sm font-semibold text-gray-900 dark:text-white truncate mt-1" }, Lt = {
  key: 0,
  class: "py-1"
}, Mt = ["href", "onClick"], $t = { class: "truncate" }, St = { class: "py-1" }, Bt = ["href", "onClick"], Tt = {
  __name: "TenantMenu",
  props: {
    tenantMenu: {
      type: Object,
      default: () => ({})
    },
    spa: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = e, r = E(() => t.tenantMenu.items ?? []);
    return (n, l) => {
      const i = H("PrimixDropdown");
      return d(), T(i, null, {
        trigger: L(({ toggle: s }) => [
          a("button", {
            type: "button",
            class: "-m-1.5 flex items-center p-1.5",
            onClick: s
          }, [
            l[1] || (l[1] = a(
              "span",
              { class: "sr-only" },
              "Open tenant menu",
              -1
              /* CACHED */
            )),
            u(" Building icon "),
            l[2] || (l[2] = a(
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
                a("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                })
              ],
              -1
              /* CACHED */
            )),
            a("span", kt, [
              a(
                "span",
                wt,
                h(e.tenantMenu.currentTenantName ?? "Tenant"),
                1
                /* TEXT */
              ),
              l[0] || (l[0] = a(
                "svg",
                {
                  class: "ml-2 h-5 w-5 text-gray-400",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                },
                [
                  a("path", {
                    "fill-rule": "evenodd",
                    d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
                    "clip-rule": "evenodd"
                  })
                ],
                -1
                /* CACHED */
              ))
            ])
          ], 8, ht)
        ]),
        default: L(({ close: s }) => [
          a("div", xt, [
            u(" Current tenant header "),
            a("div", bt, [
              l[3] || (l[3] = a(
                "p",
                { class: "text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" },
                " Current tenant ",
                -1
                /* CACHED */
              )),
              a(
                "p",
                Ct,
                h(e.tenantMenu.currentTenantName),
                1
                /* TEXT */
              )
            ]),
            u(" Switch to other tenants "),
            e.tenantMenu.tenants && e.tenantMenu.tenants.length > 0 ? (d(), f("div", Lt, [
              l[5] || (l[5] = a(
                "p",
                { class: "px-4 py-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" },
                " Switch to ",
                -1
                /* CACHED */
              )),
              (d(!0), f(
                M,
                null,
                j(e.tenantMenu.tenants, (o) => (d(), f("a", {
                  key: o.id,
                  href: o.url,
                  class: "flex w-full items-center gap-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                  onClick: s
                }, [
                  l[4] || (l[4] = a(
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
                      a("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                      })
                    ],
                    -1
                    /* CACHED */
                  )),
                  a(
                    "span",
                    $t,
                    h(o.name),
                    1
                    /* TEXT */
                  )
                ], 8, Mt))),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : u("v-if", !0),
            u(" Custom menu items "),
            r.value.length > 0 ? (d(), f(
              M,
              { key: 1 },
              [
                l[6] || (l[6] = a(
                  "div",
                  { class: "border-t border-gray-100 dark:border-gray-700" },
                  null,
                  -1
                  /* CACHED */
                )),
                a("div", St, [
                  (d(!0), f(
                    M,
                    null,
                    j(r.value, (o, c) => (d(), f("a", I({
                      key: "item-" + c,
                      href: o.url
                    }, { ref_for: !0 }, e.spa ? { "data-livue-navigate": "true" } : {}, {
                      class: "flex w-full items-center gap-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                      onClick: s
                    }), h(o.label), 17, Bt))),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            )) : u("v-if", !0)
          ])
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
}, It = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, l] of t)
    r[n] = l;
  return r;
}, At = $e({
  name: "SearchResults",
  props: {
    groups: { type: Array, default: () => [] },
    loading: { type: Boolean, default: !1 },
    query: { type: String, default: "" },
    selectedIndex: { type: Number, default: -1 },
    spa: { type: Boolean, default: !1 }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    let r = -1;
    return () => (r = -1, !e.loading && e.query.length >= 2 && e.groups.length === 0 ? b("div", { class: "px-6 py-14 text-center text-sm text-gray-500 dark:text-gray-400" }, [
      b("svg", {
        class: "mx-auto h-6 w-6 text-gray-400 mb-2",
        fill: "none",
        viewBox: "0 0 24 24",
        "stroke-width": "1.5",
        stroke: "currentColor"
      }, [
        b("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        })
      ]),
      b("p", "No results found.")
    ]) : e.query.length < 2 && e.groups.length === 0 ? null : b("div", { class: "py-2" }, e.groups.map((n) => b("div", { key: n.label }, [
      // Group header
      b("div", { class: "px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-x-2" }, [
        n.label,
        n.panelLabel ? b("span", {
          class: "inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300 normal-case tracking-normal"
        }, n.panelLabel) : null
      ]),
      // Results
      ...n.results.map((l) => {
        r++;
        const s = r === e.selectedIndex;
        return b("a", {
          key: l.url,
          href: l.url,
          class: [
            "flex items-center gap-x-3 px-4 py-2.5 cursor-pointer transition-colors",
            s ? "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
          ],
          ...e.spa ? { "data-livue-navigate": "true" } : {},
          onClick(o) {
            o.preventDefault(), t("select", l.url);
          }
        }, [
          b("div", { class: "flex-1 min-w-0" }, [
            b("div", { class: "text-sm font-medium truncate" }, l.title),
            Object.keys(l.details || {}).length > 0 ? b(
              "div",
              { class: "flex items-center gap-x-3 mt-0.5" },
              Object.entries(l.details).map(
                ([o, c]) => b("span", { key: o, class: "text-xs text-gray-500 dark:text-gray-400" }, [
                  b("span", { class: "font-medium" }, o + ": "),
                  String(c)
                ])
              )
            ) : null
          ]),
          s ? b("svg", {
            class: "h-4 w-4 flex-shrink-0 text-gray-400",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            stroke: "currentColor"
          }, [
            b("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            })
          ]) : null
        ]);
      })
    ]))));
  }
}), Et = {
  name: "PrimixGlobalSearch",
  components: { SearchResults: At },
  props: {
    mode: {
      type: String,
      default: "spotlight",
      validator: (e) => ["spotlight", "dropdown"].includes(e)
    },
    spa: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = Q("livue"), r = w(!1), n = w(""), l = w([]), i = w(!1), s = w(-1), o = w(null), c = w(null), m = w(null), p = w(null), g = E(() => typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent)), v = E(() => l.value.reduce((x, y) => x + y.results.length, 0));
    let k = null;
    function $() {
      r.value = !0, n.value = "", l.value = [], s.value = -1, Se(() => {
        e.mode === "spotlight" && o.value ? o.value.focus() : e.mode === "dropdown" && c.value && c.value.focus();
      });
    }
    function S() {
      r.value = !1, n.value = "", l.value = [], s.value = -1;
    }
    function P(x) {
      const y = v.value;
      if (y === 0) return;
      let C = s.value + x;
      C < 0 && (C = y - 1), C >= y && (C = 0), s.value = C;
    }
    function Z() {
      if (s.value < 0 || v.value === 0) return;
      let x = 0;
      for (const y of l.value)
        for (const C of y.results) {
          if (x === s.value) {
            q(C.url);
            return;
          }
          x++;
        }
    }
    function q(x) {
      if (S(), e.spa) {
        const y = document.createElement("a");
        y.href = x, y.setAttribute("data-livue-navigate", "true"), document.body.appendChild(y), y.click(), document.body.removeChild(y);
      } else
        window.location.href = x;
    }
    ae(n, (x) => {
      if (clearTimeout(k), s.value = -1, x.length < 2) {
        l.value = [], i.value = !1;
        return;
      }
      i.value = !0, k = setTimeout(async () => {
        try {
          const y = await t.search(x);
          l.value = y || [];
        } catch {
          l.value = [];
        } finally {
          i.value = !1;
        }
      }, 300);
    });
    function _(x) {
      (x.metaKey || x.ctrlKey) && x.key === "k" && (x.preventDefault(), r.value ? S() : $());
    }
    function U(x) {
      e.mode !== "dropdown" || !r.value || p.value && !p.value.contains(x.target) && S();
    }
    return O(() => {
      document.addEventListener("keydown", _), document.addEventListener("mousedown", U);
    }), G(() => {
      document.removeEventListener("keydown", _), document.removeEventListener("mousedown", U), clearTimeout(k);
    }), {
      isOpen: r,
      query: n,
      results: l,
      loading: i,
      selectedIndex: s,
      spotlightInputRef: o,
      dropdownInputRef: c,
      spotlightRef: m,
      dropdownRef: p,
      isMac: g,
      open: $,
      close: S,
      moveSelection: P,
      selectCurrent: Z,
      navigateTo: q
    };
  }
}, Pt = { class: "relative flex flex-1 items-center" }, Dt = {
  key: 0,
  class: "hidden sm:inline-flex ml-auto items-center gap-x-0.5 rounded border border-gray-300 dark:border-gray-600 px-1.5 py-0.5 text-xs text-gray-400 font-sans"
}, Rt = {
  title: "Command",
  class: "no-underline"
}, jt = {
  key: 0,
  ref: "dropdownRef",
  class: "absolute left-0 right-0 top-full mt-1 z-50 max-h-96 overflow-y-auto rounded-lg bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black/5 dark:ring-white/10"
}, zt = { class: "p-3" }, Nt = { class: "relative" }, Ot = {
  ref: "spotlightRef",
  class: "relative w-full max-w-xl rounded-xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
}, Ut = { class: "flex items-center border-b border-gray-200 dark:border-gray-700 px-4" }, Kt = {
  key: 0,
  class: "flex-shrink-0"
}, Vt = { class: "max-h-80 overflow-y-auto" }, Ht = {
  key: 0,
  class: "flex items-center justify-end gap-x-4 border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-xs text-gray-400"
};
function Zt(e, t, r, n, l, i) {
  const s = H("search-results");
  return d(), f(
    M,
    null,
    [
      u(" Trigger button (always visible in topbar) "),
      a("div", Pt, [
        a("button", {
          type: "button",
          class: "flex flex-1 items-center gap-x-2 rounded-md px-3 py-2 text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors",
          onClick: t[0] || (t[0] = (...o) => n.open && n.open(...o))
        }, [
          t[14] || (t[14] = a(
            "svg",
            {
              class: "h-5 w-5 flex-shrink-0",
              viewBox: "0 0 20 20",
              fill: "currentColor"
            },
            [
              a("path", {
                "fill-rule": "evenodd",
                d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
                "clip-rule": "evenodd"
              })
            ],
            -1
            /* CACHED */
          )),
          t[15] || (t[15] = a(
            "span",
            { class: "hidden sm:inline" },
            "Search...",
            -1
            /* CACHED */
          )),
          r.mode === "spotlight" ? (d(), f("kbd", Dt, [
            a(
              "abbr",
              Rt,
              h(n.isMac ? "⌘" : "Ctrl"),
              1
              /* TEXT */
            ),
            t[13] || (t[13] = K(
              "K ",
              -1
              /* CACHED */
            ))
          ])) : u("v-if", !0)
        ]),
        u(" Dropdown mode: results panel "),
        r.mode === "dropdown" && n.isOpen ? (d(), f(
          "div",
          jt,
          [
            a("div", zt, [
              a("div", Nt, [
                t[16] || (t[16] = a(
                  "svg",
                  {
                    class: "pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 ml-3",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  },
                  [
                    a("path", {
                      "fill-rule": "evenodd",
                      d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
                      "clip-rule": "evenodd"
                    })
                  ],
                  -1
                  /* CACHED */
                )),
                F(a(
                  "input",
                  {
                    ref: "dropdownInputRef",
                    "onUpdate:modelValue": t[1] || (t[1] = (o) => n.query = o),
                    type: "search",
                    class: "block w-full border-0 bg-transparent py-2 pl-10 pr-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm",
                    placeholder: "Search...",
                    onKeydown: [
                      t[2] || (t[2] = z((...o) => n.close && n.close(...o), ["escape"])),
                      t[3] || (t[3] = z(D((o) => n.moveSelection(1), ["prevent"]), ["down"])),
                      t[4] || (t[4] = z(D((o) => n.moveSelection(-1), ["prevent"]), ["up"])),
                      t[5] || (t[5] = z(D((...o) => n.selectCurrent && n.selectCurrent(...o), ["prevent"]), ["enter"]))
                    ]
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [X, n.query]
                ])
              ])
            ]),
            R(s, {
              groups: n.results,
              loading: n.loading,
              query: n.query,
              "selected-index": n.selectedIndex,
              spa: r.spa,
              onSelect: n.navigateTo
            }, null, 8, ["groups", "loading", "query", "selected-index", "spa", "onSelect"])
          ],
          512
          /* NEED_PATCH */
        )) : u("v-if", !0)
      ]),
      u(" Spotlight mode: modal overlay "),
      (d(), T(oe, { to: "body" }, [
        R(N, {
          "enter-active-class": "transition-opacity duration-200 ease-out",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition-opacity duration-150 ease-in",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: L(() => [
            r.mode === "spotlight" && n.isOpen ? (d(), f("div", {
              key: 0,
              class: "fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4",
              onClick: t[12] || (t[12] = D((...o) => n.close && n.close(...o), ["self"]))
            }, [
              u(" Backdrop "),
              a("div", {
                class: "fixed inset-0 bg-gray-900/50 dark:bg-gray-900/75",
                onClick: t[6] || (t[6] = (...o) => n.close && n.close(...o))
              }),
              u(" Modal "),
              a(
                "div",
                Ot,
                [
                  u(" Search input "),
                  a("div", Ut, [
                    t[18] || (t[18] = a(
                      "svg",
                      {
                        class: "h-5 w-5 text-gray-400 flex-shrink-0",
                        viewBox: "0 0 20 20",
                        fill: "currentColor"
                      },
                      [
                        a("path", {
                          "fill-rule": "evenodd",
                          d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
                          "clip-rule": "evenodd"
                        })
                      ],
                      -1
                      /* CACHED */
                    )),
                    F(a(
                      "input",
                      {
                        ref: "spotlightInputRef",
                        "onUpdate:modelValue": t[7] || (t[7] = (o) => n.query = o),
                        type: "search",
                        class: "block w-full border-0 bg-transparent py-4 pl-3 pr-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm",
                        placeholder: "Search...",
                        onKeydown: [
                          t[8] || (t[8] = z((...o) => n.close && n.close(...o), ["escape"])),
                          t[9] || (t[9] = z(D((o) => n.moveSelection(1), ["prevent"]), ["down"])),
                          t[10] || (t[10] = z(D((o) => n.moveSelection(-1), ["prevent"]), ["up"])),
                          t[11] || (t[11] = z(D((...o) => n.selectCurrent && n.selectCurrent(...o), ["prevent"]), ["enter"]))
                        ]
                      },
                      null,
                      544
                      /* NEED_HYDRATION, NEED_PATCH */
                    ), [
                      [X, n.query]
                    ]),
                    n.loading ? (d(), f("div", Kt, [...t[17] || (t[17] = [
                      a(
                        "svg",
                        {
                          class: "h-5 w-5 animate-spin text-gray-400",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24"
                        },
                        [
                          a("circle", {
                            class: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            "stroke-width": "4"
                          }),
                          a("path", {
                            class: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          })
                        ],
                        -1
                        /* CACHED */
                      )
                    ])])) : u("v-if", !0)
                  ]),
                  u(" Results "),
                  a("div", Vt, [
                    R(s, {
                      groups: n.results,
                      loading: n.loading,
                      query: n.query,
                      "selected-index": n.selectedIndex,
                      spa: r.spa,
                      onSelect: n.navigateTo
                    }, null, 8, ["groups", "loading", "query", "selected-index", "spa", "onSelect"])
                  ]),
                  u(" Footer "),
                  n.results.length > 0 ? (d(), f("div", Ht, [...t[19] || (t[19] = [
                    a(
                      "span",
                      { class: "flex items-center gap-x-1" },
                      [
                        a("kbd", { class: "rounded border border-gray-300 dark:border-gray-600 px-1 py-0.5 font-sans" }, "↑↓"),
                        K(" Navigate ")
                      ],
                      -1
                      /* CACHED */
                    ),
                    a(
                      "span",
                      { class: "flex items-center gap-x-1" },
                      [
                        a("kbd", { class: "rounded border border-gray-300 dark:border-gray-600 px-1 py-0.5 font-sans" }, "↵"),
                        K(" Open ")
                      ],
                      -1
                      /* CACHED */
                    ),
                    a(
                      "span",
                      { class: "flex items-center gap-x-1" },
                      [
                        a("kbd", { class: "rounded border border-gray-300 dark:border-gray-600 px-1 py-0.5 font-sans" }, "Esc"),
                        K(" Close ")
                      ],
                      -1
                      /* CACHED */
                    )
                  ])])) : u("v-if", !0)
                ],
                512
                /* NEED_PATCH */
              )
            ])) : u("v-if", !0)
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
const qt = /* @__PURE__ */ It(Et, [["render", Zt]]), Wt = { class: "flex-shrink-0 mt-2 w-2" }, _t = {
  key: 0,
  class: "w-2 h-2 rounded-full bg-blue-500"
}, Ft = {
  key: 0,
  class: "flex-shrink-0 mt-0.5"
}, Gt = { class: "flex-1 min-w-0" }, Jt = { class: "flex items-start justify-between gap-2" }, Yt = {
  key: 0,
  class: "text-sm font-medium text-gray-900 dark:text-white"
}, Qt = {
  key: 1,
  class: "text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap flex-shrink-0"
}, Xt = {
  key: 0,
  class: "text-sm text-gray-500 dark:text-gray-400 mt-0.5"
}, en = {
  key: 1,
  class: "mt-2 flex flex-wrap gap-3"
}, tn = ["href"], se = {
  __name: "NotificationItem",
  props: {
    notification: {
      type: Object,
      required: !0
    }
  },
  emits: ["mark-read", "navigate"],
  setup(e, { emit: t }) {
    const r = e, n = t, l = {
      success: "text-green-500",
      danger: "text-red-500",
      warning: "text-yellow-500",
      info: "text-blue-500",
      primary: "text-blue-500",
      gray: "text-gray-400"
    };
    function i(c) {
      return l[c] || "text-gray-400";
    }
    const s = E(() => {
      if (!r.notification.created_at) return "";
      const c = new Date(r.notification.created_at), p = Math.floor(((/* @__PURE__ */ new Date()).getTime() - c.getTime()) / 1e3);
      if (p < 60) return "adesso";
      const g = Math.floor(p / 60);
      if (g < 60)
        return g === 1 ? "1 min fa" : `${g} min fa`;
      const v = Math.floor(g / 60);
      if (v < 24)
        return v === 1 ? "1 ora fa" : `${v} ore fa`;
      const k = Math.floor(v / 24);
      if (k < 7)
        return k === 1 ? "1 giorno fa" : `${k} giorni fa`;
      const $ = Math.floor(k / 7);
      return $ === 1 ? "1 settimana fa" : `${$} settimane fa`;
    });
    function o() {
      r.notification.read_at || n("mark-read", r.notification.id), r.notification.url && n("navigate", r.notification.url);
    }
    return (c, m) => (d(), f(
      "div",
      {
        class: B([
          "flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
          e.notification.read_at ? "" : "bg-primary-50/50 dark:bg-primary-900/10"
        ]),
        onClick: o
      },
      [
        u(" Unread dot "),
        a("div", Wt, [
          e.notification.read_at ? u("v-if", !0) : (d(), f("div", _t))
        ]),
        u(" Icon "),
        e.notification.icon ? (d(), f("div", Ft, [
          e.notification.icon === "heroicon-o-check-circle" ? (d(), f(
            "svg",
            {
              key: 0,
              class: B(["h-5 w-5", i(e.notification.color)]),
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              "stroke-width": "1.5",
              stroke: "currentColor"
            },
            [...m[1] || (m[1] = [
              a(
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
          )) : e.notification.icon === "heroicon-o-exclamation-triangle" ? (d(), f(
            "svg",
            {
              key: 1,
              class: B(["h-5 w-5", i(e.notification.color)]),
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              "stroke-width": "1.5",
              stroke: "currentColor"
            },
            [...m[2] || (m[2] = [
              a(
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
          )) : e.notification.icon === "heroicon-o-x-circle" ? (d(), f(
            "svg",
            {
              key: 2,
              class: B(["h-5 w-5", i(e.notification.color)]),
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              "stroke-width": "1.5",
              stroke: "currentColor"
            },
            [...m[3] || (m[3] = [
              a(
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
          )) : e.notification.icon === "heroicon-o-information-circle" ? (d(), f(
            "svg",
            {
              key: 3,
              class: B(["h-5 w-5", i(e.notification.color)]),
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              "stroke-width": "1.5",
              stroke: "currentColor"
            },
            [...m[4] || (m[4] = [
              a(
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
          )) : u("v-if", !0)
        ])) : u("v-if", !0),
        u(" Content "),
        a("div", Gt, [
          a("div", Jt, [
            e.notification.title ? (d(), f(
              "p",
              Yt,
              h(e.notification.title),
              1
              /* TEXT */
            )) : u("v-if", !0),
            s.value ? (d(), f(
              "span",
              Qt,
              h(s.value),
              1
              /* TEXT */
            )) : u("v-if", !0)
          ]),
          e.notification.body ? (d(), f(
            "p",
            Xt,
            h(e.notification.body),
            1
            /* TEXT */
          )) : u("v-if", !0),
          e.notification.actions && e.notification.actions.length > 0 ? (d(), f("div", en, [
            (d(!0), f(
              M,
              null,
              j(e.notification.actions, (p) => (d(), f("a", {
                key: p.label,
                href: p.url,
                class: "text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400",
                onClick: m[0] || (m[0] = D(() => {
                }, ["stop"]))
              }, h(p.label), 9, tn))),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : u("v-if", !0)
        ])
      ],
      2
      /* CLASS */
    ));
  }
}, nn = { class: "absolute right-0 z-50 mt-2 w-96 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10" }, rn = { class: "flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700" }, on = { class: "text-sm font-semibold text-gray-900 dark:text-white" }, an = {
  key: 0,
  class: "ml-1 text-xs font-normal text-gray-500 dark:text-gray-400"
}, sn = { class: "px-4 py-8 text-center" }, ln = { class: "mt-2 text-sm text-gray-500 dark:text-gray-400" }, dn = {
  key: 2,
  class: "px-4 py-3 text-center text-xs text-gray-400 dark:text-gray-500"
}, cn = {
  key: 0,
  class: "border-t border-gray-100 dark:border-gray-700"
}, un = ["disabled"], fn = {
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
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    translations: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["load-more", "mark-read", "mark-all-read", "navigate"],
  setup(e, { emit: t }) {
    const r = e, n = t;
    function l(i) {
      if (!r.hasMore || r.loading)
        return;
      const s = i.target;
      s.scrollHeight - s.scrollTop - s.clientHeight < 80 && n("load-more");
    }
    return (i, s) => (d(), f("div", nn, [
      u(" Header "),
      a("div", rn, [
        a("h3", on, [
          K(
            h(e.translations.title || "Notifications") + " ",
            1
            /* TEXT */
          ),
          e.unreadCount > 0 ? (d(), f(
            "span",
            an,
            " (" + h(e.unreadCount) + ") ",
            1
            /* TEXT */
          )) : u("v-if", !0)
        ]),
        e.unreadCount > 0 ? (d(), f(
          "button",
          {
            key: 0,
            type: "button",
            class: "text-xs text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium",
            onClick: s[0] || (s[0] = (o) => i.$emit("mark-all-read"))
          },
          h(e.translations.mark_all_read || "Mark all as read"),
          1
          /* TEXT */
        )) : u("v-if", !0)
      ]),
      u(" Notification list "),
      a(
        "div",
        {
          class: "max-h-[32rem] overflow-y-auto",
          onScrollPassive: l
        },
        [
          e.notifications.length > 0 ? (d(!0), f(
            M,
            { key: 0 },
            j(e.notifications, (o) => (d(), T(se, {
              key: o.id,
              notification: o,
              onMarkRead: s[1] || (s[1] = (c) => i.$emit("mark-read", c)),
              onNavigate: s[2] || (s[2] = (c) => i.$emit("navigate", c))
            }, null, 8, ["notification"]))),
            128
            /* KEYED_FRAGMENT */
          )) : (d(), f(
            M,
            { key: 1 },
            [
              u(" Empty state "),
              a("div", sn, [
                s[4] || (s[4] = a(
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
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M9.143 17.082a24.248 24.248 0 0 0 5.714 0m-5.714 0a2.25 2.25 0 0 1-2.244-2.077L6.394 5.694a6.001 6.001 0 0 1 11.212 0l-.505 9.311a2.25 2.25 0 0 1-2.244 2.077m-5.714 0a3 3 0 0 0 5.714 0"
                    })
                  ],
                  -1
                  /* CACHED */
                )),
                a(
                  "p",
                  ln,
                  h(e.translations.no_notifications || "No notifications"),
                  1
                  /* TEXT */
                )
              ])
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          )),
          u(" Loader infinite scroll "),
          e.loading && e.notifications.length > 0 ? (d(), f(
            "div",
            dn,
            h(e.translations.loading || "Loading..."),
            1
            /* TEXT */
          )) : u("v-if", !0)
        ],
        32
        /* NEED_HYDRATION */
      ),
      u(" Load more (fallback quando la lista non ha scrollbar) "),
      e.hasMore ? (d(), f("div", cn, [
        a("button", {
          type: "button",
          class: "w-full px-4 py-2 text-xs text-center text-primary-600 hover:bg-gray-50 dark:text-primary-400 dark:hover:bg-gray-700/50 font-medium",
          disabled: e.loading,
          onClick: s[3] || (s[3] = (o) => i.$emit("load-more"))
        }, h(e.loading ? e.translations.loading || "Loading..." : e.translations.load_more || "Load more"), 9, un)
      ])) : u("v-if", !0)
    ]));
  }
}, mn = {
  key: 0,
  class: "fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-gray-800 shadow-xl flex flex-col"
}, pn = { class: "flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700" }, vn = { class: "text-base font-semibold text-gray-900 dark:text-white" }, gn = {
  key: 0,
  class: "ml-1 text-sm font-normal text-gray-500 dark:text-gray-400"
}, yn = { class: "flex items-center gap-3" }, hn = { class: "sr-only" }, kn = { class: "px-4 py-12 text-center" }, wn = { class: "mt-3 text-sm text-gray-500 dark:text-gray-400" }, xn = {
  key: 0,
  class: "border-t border-gray-200 dark:border-gray-700"
}, bn = ["disabled"], Cn = {
  __name: "NotificationDrawer",
  props: {
    open: {
      type: Boolean,
      default: !1
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
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    translations: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["close", "load-more", "mark-read", "mark-all-read", "navigate"],
  setup(e, { emit: t }) {
    const r = e, n = t;
    function l(s) {
      if (!r.hasMore || r.loading)
        return;
      const o = s.target;
      o.scrollHeight - o.scrollTop - o.clientHeight < 80 && n("load-more");
    }
    function i(s) {
      s.key === "Escape" && n("close");
    }
    return O(() => {
      document.addEventListener("keydown", i);
    }), G(() => {
      document.removeEventListener("keydown", i);
    }), (s, o) => (d(), T(oe, { to: "body" }, [
      u(" Backdrop "),
      R(N, {
        "enter-active-class": "transition-opacity ease-linear duration-300",
        "enter-from-class": "opacity-0",
        "enter-to-class": "opacity-100",
        "leave-active-class": "transition-opacity ease-linear duration-300",
        "leave-from-class": "opacity-100",
        "leave-to-class": "opacity-0"
      }, {
        default: L(() => [
          e.open ? (d(), f("div", {
            key: 0,
            class: "fixed inset-0 z-50 bg-gray-900/50",
            onClick: o[0] || (o[0] = (c) => s.$emit("close"))
          })) : u("v-if", !0)
        ]),
        _: 1
        /* STABLE */
      }),
      u(" Panel "),
      R(N, {
        "enter-active-class": "transform transition ease-in-out duration-300",
        "enter-from-class": "translate-x-full",
        "enter-to-class": "translate-x-0",
        "leave-active-class": "transform transition ease-in-out duration-300",
        "leave-from-class": "translate-x-0",
        "leave-to-class": "translate-x-full"
      }, {
        default: L(() => [
          e.open ? (d(), f("div", mn, [
            u(" Header "),
            a("div", pn, [
              a("h2", vn, [
                K(
                  h(e.translations.title || "Notifications") + " ",
                  1
                  /* TEXT */
                ),
                e.unreadCount > 0 ? (d(), f(
                  "span",
                  gn,
                  " (" + h(e.unreadCount) + ") ",
                  1
                  /* TEXT */
                )) : u("v-if", !0)
              ]),
              a("div", yn, [
                e.unreadCount > 0 ? (d(), f(
                  "button",
                  {
                    key: 0,
                    type: "button",
                    class: "text-xs text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium",
                    onClick: o[1] || (o[1] = (c) => s.$emit("mark-all-read"))
                  },
                  h(e.translations.mark_all_read || "Mark all as read"),
                  1
                  /* TEXT */
                )) : u("v-if", !0),
                a("button", {
                  type: "button",
                  class: "rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300",
                  onClick: o[2] || (o[2] = (c) => s.$emit("close"))
                }, [
                  a(
                    "span",
                    hn,
                    h(e.translations.close || "Close"),
                    1
                    /* TEXT */
                  ),
                  o[6] || (o[6] = a(
                    "svg",
                    {
                      class: "h-5 w-5",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
                    },
                    [
                      a("path", {
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
            u(" Notification list "),
            a(
              "div",
              {
                class: "flex-1 overflow-y-auto",
                onScrollPassive: l
              },
              [
                e.notifications.length > 0 ? (d(!0), f(
                  M,
                  { key: 0 },
                  j(e.notifications, (c) => (d(), T(se, {
                    key: c.id,
                    notification: c,
                    onMarkRead: o[3] || (o[3] = (m) => s.$emit("mark-read", m)),
                    onNavigate: o[4] || (o[4] = (m) => s.$emit("navigate", m))
                  }, null, 8, ["notification"]))),
                  128
                  /* KEYED_FRAGMENT */
                )) : (d(), f(
                  M,
                  { key: 1 },
                  [
                    u(" Empty state "),
                    a("div", kn, [
                      o[7] || (o[7] = a(
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
                          a("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M9.143 17.082a24.248 24.248 0 0 0 5.714 0m-5.714 0a2.25 2.25 0 0 1-2.244-2.077L6.394 5.694a6.001 6.001 0 0 1 11.212 0l-.505 9.311a2.25 2.25 0 0 1-2.244 2.077m-5.714 0a3 3 0 0 0 5.714 0"
                          })
                        ],
                        -1
                        /* CACHED */
                      )),
                      a(
                        "p",
                        wn,
                        h(e.translations.no_notifications || "No notifications"),
                        1
                        /* TEXT */
                      )
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                ))
              ],
              32
              /* NEED_HYDRATION */
            ),
            u(" Load more footer "),
            e.hasMore ? (d(), f("div", xn, [
              a("button", {
                type: "button",
                class: "w-full px-4 py-3 text-sm text-center text-primary-600 hover:bg-gray-50 dark:text-primary-400 dark:hover:bg-gray-700/50 font-medium",
                disabled: e.loading,
                onClick: o[5] || (o[5] = (c) => s.$emit("load-more"))
              }, h(e.loading ? e.translations.loading || "Loading..." : e.translations.load_more || "Load more"), 9, bn)
            ])) : u("v-if", !0)
          ])) : u("v-if", !0)
        ]),
        _: 1
        /* STABLE */
      })
    ]));
  }
}, Ln = { class: "sr-only" }, Mn = {
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
  setup(e) {
    const t = e, r = Q("livue"), n = w(null), l = w(!1), i = w([]), s = w(0), o = w(!1), c = w(!1), m = w(1), p = w(0), g = w(!1);
    let v = null;
    async function k() {
      try {
        const C = (await r.getUnreadNotificationsCount()).count ?? 0;
        C > p.value && (g.value = !0, setTimeout(() => {
          g.value = !1;
        }, 2e3)), p.value = C, s.value = C;
      } catch {
      }
    }
    async function $() {
      c.value = !0, m.value = 1;
      try {
        const y = await r.getNotifications({ page: 1, perPage: 10 });
        i.value = y.data ?? [], o.value = y.hasMore ?? !1, s.value = y.unreadCount ?? 0, p.value = s.value;
      } catch {
      } finally {
        c.value = !1;
      }
    }
    async function S() {
      if (!c.value) {
        c.value = !0, m.value += 1;
        try {
          const y = await r.getNotifications({ page: m.value, perPage: 10 });
          i.value = [...i.value, ...y.data ?? []], o.value = y.hasMore ?? !1;
        } catch {
        } finally {
          c.value = !1;
        }
      }
    }
    async function P(y) {
      try {
        await r.markNotificationAsRead({ id: y });
        const C = i.value.find((ce) => ce.id === y);
        C && !C.read_at && (C.read_at = (/* @__PURE__ */ new Date()).toISOString(), s.value = Math.max(0, s.value - 1));
      } catch {
      }
    }
    async function Z() {
      try {
        await r.markAllNotificationsAsRead(), i.value.forEach((y) => {
          y.read_at = y.read_at || (/* @__PURE__ */ new Date()).toISOString();
        }), s.value = 0;
      } catch {
      }
    }
    function q(y) {
      U(), window.location.href = y;
    }
    function _() {
      l.value ? U() : (l.value = !0, $());
    }
    function U() {
      l.value = !1;
    }
    function x(y) {
      l.value && t.mode === "popup" && n.value && !n.value.contains(y.target) && U();
    }
    return O(() => {
      k(), v = setInterval(k, t.pollingInterval * 1e3), document.addEventListener("mousedown", x);
    }), G(() => {
      v && clearInterval(v), document.removeEventListener("mousedown", x);
    }), (y, C) => (d(), f(
      "div",
      {
        ref_key: "containerRef",
        ref: n,
        class: "relative"
      },
      [
        u(" Bell button "),
        a("button", {
          type: "button",
          class: "relative rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none",
          onClick: _
        }, [
          a(
            "span",
            Ln,
            h(e.translations.bell_label || "Notifications"),
            1
            /* TEXT */
          ),
          C[0] || (C[0] = a(
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
              a("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              })
            ],
            -1
            /* CACHED */
          )),
          u(" Badge "),
          s.value > 0 ? (d(), f(
            "span",
            {
              key: 0,
              class: B([
                "absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold min-w-[1.25rem] h-5 px-1",
                g.value ? "animate-pulse" : ""
              ])
            },
            h(s.value > 99 ? "99+" : s.value),
            3
            /* TEXT, CLASS */
          )) : u("v-if", !0)
        ]),
        u(" Popup mode "),
        R(N, {
          "enter-active-class": "transition ease-out duration-100",
          "enter-from-class": "transform opacity-0 scale-95",
          "enter-to-class": "transform opacity-100 scale-100",
          "leave-active-class": "transition ease-in duration-75",
          "leave-from-class": "transform opacity-100 scale-100",
          "leave-to-class": "transform opacity-0 scale-95"
        }, {
          default: L(() => [
            e.mode === "popup" && l.value ? (d(), T(fn, {
              key: 0,
              notifications: i.value,
              "unread-count": s.value,
              "has-more": o.value,
              loading: c.value,
              translations: e.translations,
              onLoadMore: S,
              onMarkRead: P,
              onMarkAllRead: Z,
              onNavigate: q
            }, null, 8, ["notifications", "unread-count", "has-more", "loading", "translations"])) : u("v-if", !0)
          ]),
          _: 1
          /* STABLE */
        }),
        u(" Drawer mode "),
        e.mode === "drawer" ? (d(), T(Cn, {
          key: 0,
          open: l.value,
          notifications: i.value,
          "unread-count": s.value,
          "has-more": o.value,
          loading: c.value,
          translations: e.translations,
          onClose: U,
          onLoadMore: S,
          onMarkRead: P,
          onMarkAllRead: Z,
          onNavigate: q
        }, null, 8, ["open", "notifications", "unread-count", "has-more", "loading", "translations"])) : u("v-if", !0)
      ],
      512
      /* NEED_PATCH */
    ));
  }
}, te = "primix-resource-workspaces:v1";
function $n(e) {
  if (typeof e != "string" || e === "")
    return "/";
  const t = e.replace(/\/{2,}/g, "/");
  return t.length > 1 && t.endsWith("/") ? t.slice(0, -1) : t;
}
function Sn(e) {
  if (typeof e != "string" || e === "")
    return "";
  const t = Array.from(new URLSearchParams(e).entries()).sort(([r, n], [l, i]) => r === l ? n.localeCompare(i) : r.localeCompare(l));
  return t.length === 0 ? "" : `?${new URLSearchParams(t).toString()}`;
}
function le(e, t = null) {
  if (typeof e == "string") {
    const r = e.trim();
    if (r.startsWith("key:") && r.length > 4)
      return r;
    const n = V(r);
    if (n !== null)
      return n;
  }
  return t;
}
function Bn(e, t) {
  return typeof e?.currentKey == "string" && e.currentKey.trim() !== "" ? `key:${e.currentKey.trim()}` : t;
}
function de(e) {
  if (!Array.isArray(e) || e.length === 0)
    return [];
  const t = [], r = {};
  for (const n of e) {
    if (!n || typeof n != "object")
      continue;
    const l = V(n.url);
    if (l === null)
      continue;
    const i = {
      id: le(n.id, l),
      url: l,
      title: typeof n.title == "string" ? n.title : "",
      updatedAt: typeof n.updatedAt == "number" ? n.updatedAt : Date.now()
    }, s = r[i.id];
    if (s === void 0) {
      r[i.id] = t.length, t.push(i);
      continue;
    }
    const o = t[s], c = o.updatedAt;
    o.title.trim() === "" && i.title.trim() !== "" && (o.title = i.title), o.updatedAt = Math.max(c, i.updatedAt), i.updatedAt >= c && (o.url = i.url);
  }
  return t;
}
function V(e) {
  if (typeof e != "string" || e.trim() === "")
    return null;
  try {
    const t = new URL(e, window.location.origin), r = $n(t.pathname), n = Sn(t.search);
    return `${r}${n}`;
  } catch {
    return null;
  }
}
function Tn(e) {
  if (!e || typeof e != "object")
    return {};
  const t = {};
  for (const [r, n] of Object.entries(e)) {
    if (!n || typeof n != "object")
      continue;
    const l = Array.isArray(n.tabs) ? n.tabs : [], i = de(l), s = le(n.activeTabId, null);
    t[r] = {
      tabs: i,
      activeTabId: s && i.some((o) => o.id === s) ? s : null
    };
  }
  return t;
}
const In = {
  state: () => ({
    hydrated: !1,
    workspaces: {}
  }),
  actions: {
    workspaceKey(e) {
      const t = e?.panelId || "default", r = e?.resourceSlug || "resource";
      return `${t}::${r}`;
    },
    hydrate() {
      if (!(this.hydrated || typeof window > "u")) {
        try {
          const e = window.localStorage.getItem(te);
          this.workspaces = Tn(e ? JSON.parse(e) : {});
        } catch {
          this.workspaces = {};
        }
        this.hydrated = !0, this.persist();
      }
    },
    persist() {
      typeof window > "u" || window.localStorage.setItem(te, JSON.stringify(this.workspaces));
    },
    ensureWorkspace(e) {
      return this.workspaces[e] || (this.workspaces[e] = {
        tabs: [],
        activeTabId: null
      }), this.workspaces[e];
    },
    registerCurrent(e) {
      this.hydrate();
      const t = this.workspaceKey(e), r = V(e?.currentUrl);
      if (r === null)
        return t;
      const n = Bn(e, r), l = `${e?.currentTitle || e?.resourceLabel || "Untitled"}`.trim(), i = this.ensureWorkspace(t);
      i.tabs = de(i.tabs), i.tabs.some((o) => o.id === i.activeTabId) || (i.activeTabId = null);
      const s = i.tabs.find((o) => o.id === n || o.url === r);
      if (s)
        s.id = n, s.url = r, s.title = l || s.title, s.updatedAt = Date.now(), i.activeTabId = s.id;
      else {
        const o = {
          id: n,
          url: r,
          title: l,
          updatedAt: Date.now()
        };
        i.tabs.push(o), i.activeTabId = o.id;
      }
      return this.persist(), t;
    },
    setActiveTab(e, t) {
      this.hydrate();
      const r = this.ensureWorkspace(e), n = r.tabs.find((l) => l.id === t);
      n && (r.activeTabId = n.id, n.updatedAt = Date.now(), this.persist());
    },
    closeTab(e, t) {
      this.hydrate();
      const r = this.ensureWorkspace(e), n = r.tabs.findIndex((o) => o.id === t);
      if (n === -1)
        return {
          closedActive: !1,
          nextUrl: null
        };
      const l = r.activeTabId === t;
      if (r.tabs.splice(n, 1), !l)
        return this.persist(), {
          closedActive: !1,
          nextUrl: null
        };
      if (r.tabs.length === 0)
        return r.activeTabId = null, this.persist(), {
          closedActive: !0,
          nextUrl: null
        };
      const i = n < r.tabs.length ? n : r.tabs.length - 1, s = r.tabs[i];
      return r.activeTabId = s.id, s.updatedAt = Date.now(), this.persist(), {
        closedActive: !0,
        nextUrl: s.url
      };
    }
  }
};
function An(e) {
  if (!e || typeof e.store != "function")
    throw new Error("[Primix] Unable to resolve LiVue store helper for resource workspace tabs.");
  return e.store("primix-resource-workspace", In, { scope: "global" });
}
const En = {
  key: 0,
  class: "mt-4 mb-6"
}, Pn = { class: "overflow-x-auto pb-1" }, Dn = { class: "flex min-w-max items-center gap-2" }, Rn = ["href", "onClick"], jn = ["aria-label", "onClick"], zn = {
  __name: "ResourceWorkspaceTabs",
  props: {
    workspace: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const t = e, r = Q("livue"), n = An(r), l = E(() => n.workspaceKey(t.workspace)), i = E(() => n.workspaces[l.value]?.tabs ?? []), s = E(() => n.workspaces[l.value]?.activeTabId ?? null);
    function o(g) {
      if (g) {
        if (t.workspace.spa) {
          const v = document.createElement("a");
          v.href = g, v.setAttribute("data-livue-navigate", "true"), document.body.appendChild(v), v.click(), document.body.removeChild(v);
          return;
        }
        window.location.href = g;
      }
    }
    function c() {
      t.workspace.enabled && n.registerCurrent({
        ...t.workspace,
        currentUrl: typeof window < "u" ? window.location.href : t.workspace.currentUrl
      });
    }
    function m(g) {
      n.setActiveTab(l.value, g.id), V(
        typeof window < "u" ? window.location.href : t.workspace.currentUrl
      ) !== g.url && o(g.url);
    }
    function p(g) {
      const v = V(
        typeof window < "u" ? window.location.href : t.workspace.currentUrl
      ), { closedActive: k, nextUrl: $ } = n.closeTab(l.value, g.id);
      if (!k)
        return;
      if ($) {
        o($);
        return;
      }
      const S = V(t.workspace.indexUrl);
      S && S !== v && o(t.workspace.indexUrl);
    }
    return O(c), ae(
      () => [t.workspace.currentUrl, t.workspace.currentTitle, t.workspace.enabled],
      c
    ), (g, v) => i.value.length > 0 ? (d(), f("div", En, [
      a("div", Pn, [
        a("div", Dn, [
          (d(!0), f(
            M,
            null,
            j(i.value, (k) => (d(), f(
              "div",
              {
                key: k.id,
                class: B(["group inline-flex max-w-[18rem] items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors", k.id === s.value ? "border-primary-300 bg-primary-50 text-primary-700 dark:border-primary-600/60 dark:bg-primary-900/20 dark:text-primary-300" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600"])
              },
              [
                a("a", I({
                  href: k.url,
                  class: "min-w-0 flex-1 truncate"
                }, { ref_for: !0 }, e.workspace.spa ? { "data-livue-navigate": "true" } : {}, {
                  onClick: D(($) => m(k), ["prevent"])
                }), h(k.title || e.workspace.resourceLabel), 17, Rn),
                a("button", {
                  type: "button",
                  class: "inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded text-gray-400 transition-colors hover:bg-black/5 hover:text-gray-600 dark:hover:bg-white/10 dark:hover:text-gray-200",
                  "aria-label": e.workspace.closeTabLabel,
                  onClick: D(($) => p(k), ["stop", "prevent"])
                }, [...v[0] || (v[0] = [
                  a(
                    "svg",
                    {
                      class: "h-3 w-3",
                      viewBox: "0 0 20 20",
                      fill: "currentColor",
                      "aria-hidden": "true"
                    },
                    [
                      a("path", {
                        "fill-rule": "evenodd",
                        d: "M4.22 4.22a.75.75 0 011.06 0L10 8.94l4.72-4.72a.75.75 0 111.06 1.06L11.06 10l4.72 4.72a.75.75 0 11-1.06 1.06L10 11.06l-4.72 4.72a.75.75 0 11-1.06-1.06L8.94 10 4.22 5.28a.75.75 0 010-1.06z",
                        "clip-rule": "evenodd"
                      })
                    ],
                    -1
                    /* CACHED */
                  )
                ])], 8, jn)
              ],
              2
              /* CLASS */
            ))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])
    ])) : u("v-if", !0);
  }
}, Nn = (e) => {
  e?.config?.globalProperties?.__primixPanelsReady || (e.config.globalProperties.__primixPanelsReady = !0, e.component("PDrawer", ie), e.component("PrimixDropdown", Oe), e.component("PrimixCollapsible", Ue), e.component("PrimixToast", Ve), e.component("PrimixNotificationToasts", Ye), e.component("PrimixThemeToggle", rt), e.component("PrimixUserMenu", yt), e.component("PrimixTenantMenu", Tt), e.component("PrimixGlobalSearch", qt), e.component("PrimixNotificationBell", Mn), e.component("PrimixResourceWorkspaceTabs", zn));
};
ue.setup(Nn);
//# sourceMappingURL=primix-panels.js.map
