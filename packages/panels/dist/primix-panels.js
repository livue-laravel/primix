import ue from "livue";
import { B as fe, b as me, W as pe } from "../support/chunks/index-uMyjrk0Z.js";
import { a as ve, x as J } from "../support/chunks/index-BjgkEHwo.js";
import { s as ge } from "../support/chunks/index-D-cypkd-.js";
import { s as ye } from "../support/chunks/index-CaXeSIux.js";
import { F as he } from "../support/chunks/index-T4OHDugx.js";
import { u as ke, b as we } from "../support/chunks/index-D4gLhgZh.js";
import { s as xe, f as be } from "../support/chunks/index-CoIgDweF.js";
import { resolveComponent as _, resolveDirective as Ce, openBlock as l, createBlock as I, withCtx as L, createElementBlock as u, mergeProps as T, createVNode as R, Transition as N, withDirectives as F, renderSlot as A, Fragment as M, createElementVNode as o, normalizeClass as B, toDisplayString as h, createCommentVNode as c, resolveDynamicComponent as ne, ref as w, onMounted as O, onBeforeUnmount as re, vShow as Le, onUnmounted as G, TransitionGroup as Me, renderList as j, computed as E, createTextVNode as K, h as b, defineComponent as $e, withKeys as z, withModifiers as D, vModelText as X, Teleport as oe, inject as Q, watch as ae, nextTick as Se } from "vue";
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
`, Ie = {
  mask: function(t) {
    var n = t.position, r = t.modal;
    return {
      position: "fixed",
      height: "100%",
      width: "100%",
      left: 0,
      top: 0,
      display: "flex",
      justifyContent: n === "left" ? "flex-start" : n === "right" ? "flex-end" : "center",
      alignItems: n === "top" ? "flex-start" : n === "bottom" ? "flex-end" : "center",
      pointerEvents: r ? "auto" : "none"
    };
  },
  root: {
    pointerEvents: "auto"
  }
}, Te = {
  mask: function(t) {
    var n = t.instance, r = t.props, i = ["left", "right", "top", "bottom"], a = i.find(function(d) {
      return d === r.position;
    });
    return ["p-drawer-mask", {
      "p-overlay-mask p-overlay-mask-enter-active": r.modal,
      "p-drawer-open": n.containerVisible,
      "p-drawer-full": n.fullScreen
    }, a ? "p-drawer-".concat(a) : ""];
  },
  root: function(t) {
    var n = t.instance;
    return ["p-drawer p-component", {
      "p-drawer-full": n.fullScreen
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
  classes: Te,
  inlineStyles: Ie
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
function H(e) {
  "@babel/helpers - typeof";
  return H = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, H(e);
}
function Y(e, t, n) {
  return (t = Pe(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function Pe(e) {
  var t = De(e, "string");
  return H(t) == "symbol" ? t : t + "";
}
function De(e, t) {
  if (H(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (H(r) != "object") return r;
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
      var t = function(i) {
        return i && i.querySelector("[autofocus]");
      }, n = this.$slots.header && t(this.headerContainer);
      n || (n = this.$slots.default && t(this.container), n || (n = this.$slots.footer && t(this.footerContainer), n || (n = this.closeButton))), n && me(n);
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
      this.outsideClickListener || (this.outsideClickListener = function(n) {
        t.isOutsideClicked(n) && t.hide();
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
function ze(e, t, n, r, i, a) {
  var d = _("Button"), s = _("Portal"), f = Ce("focustrap");
  return l(), I(s, null, {
    default: L(function() {
      return [i.containerVisible ? (l(), u("div", T({
        key: 0,
        ref: a.maskRef,
        onMousedown: t[0] || (t[0] = function() {
          return a.onMaskClick && a.onMaskClick.apply(a, arguments);
        }),
        class: e.cx("mask"),
        style: e.sx("mask", !0, {
          position: e.position,
          modal: e.modal
        }),
        "data-p": a.dataP
      }, e.ptm("mask")), [R(N, T({
        name: "p-drawer",
        onEnter: a.onEnter,
        onAfterEnter: a.onAfterEnter,
        onBeforeLeave: a.onBeforeLeave,
        onLeave: a.onLeave,
        onAfterLeave: a.onAfterLeave,
        appear: ""
      }, e.ptm("transition")), {
        default: L(function() {
          return [e.visible ? F((l(), u("div", T({
            key: 0,
            ref: a.containerRef,
            class: e.cx("root"),
            style: e.sx("root"),
            role: e.modal ? "dialog" : "complementary",
            "aria-modal": e.modal ? !0 : void 0,
            "data-p": a.dataP
          }, e.ptmi("root")), [e.$slots.container ? A(e.$slots, "container", {
            key: 0,
            closeCallback: a.hide
          }) : (l(), u(M, {
            key: 1
          }, [o("div", T({
            ref: a.headerContainerRef,
            class: e.cx("header")
          }, e.ptm("header")), [A(e.$slots, "header", {
            class: B(e.cx("title"))
          }, function() {
            return [e.header ? (l(), u("div", T({
              key: 0,
              class: e.cx("title")
            }, e.ptm("title")), h(e.header), 17)) : c("", !0)];
          }), e.showCloseIcon ? A(e.$slots, "closebutton", {
            key: 0,
            closeCallback: a.hide
          }, function() {
            return [R(d, T({
              ref: a.closeButtonRef,
              type: "button",
              class: e.cx("pcCloseButton"),
              "aria-label": a.closeAriaLabel,
              unstyled: e.unstyled,
              onClick: a.hide
            }, e.closeButtonProps, {
              pt: e.ptm("pcCloseButton"),
              "data-pc-group-section": "iconcontainer"
            }), {
              icon: L(function(m) {
                return [A(e.$slots, "closeicon", {}, function() {
                  return [(l(), I(ne(e.closeIcon ? "span" : "TimesIcon"), T({
                    class: [e.closeIcon, m.class]
                  }, e.ptm("pcCloseButton").icon), null, 16, ["class"]))];
                })];
              }),
              _: 3
            }, 16, ["class", "aria-label", "unstyled", "onClick", "pt"])];
          }) : c("", !0)], 16), o("div", T({
            ref: a.contentRef,
            class: e.cx("content")
          }, e.ptm("content")), [A(e.$slots, "default")], 16), e.$slots.footer ? (l(), u("div", T({
            key: 0,
            ref: a.footerContainerRef,
            class: e.cx("footer")
          }, e.ptm("footer")), [A(e.$slots, "footer")], 16)) : c("", !0)], 64))], 16, je)), [[f]]) : c("", !0)];
        }),
        _: 3
      }, 16, ["onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])], 16, Re)) : c("", !0)];
    }),
    _: 3
  });
}
ie.render = ze;
const Ne = { key: 0 }, Oe = {
  __name: "Dropdown",
  setup(e) {
    const t = w(null), n = w(!1);
    function r() {
      n.value = !n.value;
    }
    function i() {
      n.value = !1;
    }
    function a(d) {
      n.value && t.value && !t.value.contains(d.target) && i();
    }
    return O(() => {
      document.addEventListener("click", a);
    }), re(() => {
      document.removeEventListener("click", a);
    }), (d, s) => (l(), u(
      "div",
      {
        ref_key: "container",
        ref: t,
        class: "relative"
      },
      [
        A(d.$slots, "trigger", {
          open: n.value,
          toggle: r
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
            n.value ? (l(), u("div", Ne, [
              A(d.$slots, "default", { close: i })
            ])) : c("v-if", !0)
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
    const n = w(e.defaultOpen);
    function r() {
      n.value = !n.value;
    }
    function i(p) {
      p.style.height = "0", p.style.overflow = "hidden";
    }
    function a(p) {
      p.style.height = p.scrollHeight + "px", p.style.transition = "height 0.2s ease";
    }
    function d(p) {
      p.style.height = "", p.style.overflow = "", p.style.transition = "";
    }
    function s(p) {
      p.style.height = p.scrollHeight + "px", p.style.overflow = "hidden";
    }
    function f(p) {
      p.offsetHeight, p.style.height = "0", p.style.transition = "height 0.2s ease";
    }
    function m(p) {
      p.style.height = "", p.style.overflow = "", p.style.transition = "";
    }
    return (p, g) => (l(), u("div", null, [
      A(p.$slots, "trigger", {
        open: n.value,
        toggle: r
      }),
      R(N, {
        onBeforeEnter: i,
        onEnter: a,
        onAfterEnter: d,
        onBeforeLeave: s,
        onLeave: f,
        onAfterLeave: m,
        persisted: ""
      }, {
        default: L(() => [
          F(o(
            "div",
            null,
            [
              A(p.$slots, "default")
            ],
            512
            /* NEED_PATCH */
          ), [
            [Le, n.value]
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
    const t = e, n = w(!0);
    function r() {
      n.value = !1;
    }
    return O(() => {
      t.duration > 0 && setTimeout(r, t.duration);
    }), (i, a) => (l(), I(N, {
      "enter-active-class": "transform ease-out duration-300 transition",
      "enter-from-class": "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",
      "enter-to-class": "translate-y-0 opacity-100 sm:translate-x-0",
      "leave-active-class": "transition ease-in duration-100",
      "leave-from-class": "opacity-100",
      "leave-to-class": "opacity-0"
    }, {
      default: L(() => [
        n.value ? (l(), u("div", Ke, [
          A(i.$slots, "default", { close: r })
        ])) : c("v-if", !0)
      ]),
      _: 3
      /* FORWARDED */
    }));
  }
}, _e = { class: "p-4" }, Ze = { class: "flex items-start" }, qe = {
  key: 0,
  class: "flex-shrink-0"
}, He = { class: "ml-3 w-0 flex-1 pt-0.5" }, We = {
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
    let n = 0;
    const r = {
      success: "text-green-400",
      danger: "text-red-400",
      warning: "text-yellow-400",
      info: "text-blue-400",
      primary: "text-blue-400",
      gray: "text-gray-400"
    };
    function i(s) {
      return r[s] || "text-gray-400";
    }
    function a(s) {
      t.value = t.value.filter((f) => f.id !== s);
    }
    function d(s) {
      const f = s.detail, m = ++n, p = { ...f, id: m };
      t.value.push(p);
      const g = f.duration ?? 5e3;
      g > 0 && setTimeout(() => a(m), g);
    }
    return O(() => {
      window.addEventListener("primix:notification", d);
    }), G(() => {
      window.removeEventListener("primix:notification", d);
    }), (s, f) => (l(), I(Me, {
      "enter-active-class": "transform ease-out duration-300 transition",
      "enter-from-class": "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",
      "enter-to-class": "translate-y-0 opacity-100 sm:translate-x-0",
      "leave-active-class": "transition ease-in duration-100",
      "leave-from-class": "opacity-100",
      "leave-to-class": "opacity-0"
    }, {
      default: L(() => [
        (l(!0), u(
          M,
          null,
          j(t.value, (m) => (l(), u("div", {
            key: m.id,
            class: "pointer-events-auto mb-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
          }, [
            o("div", _e, [
              o("div", Ze, [
                m.icon ? (l(), u("div", qe, [
                  m.icon === "heroicon-o-check-circle" ? (l(), u(
                    "svg",
                    {
                      key: 0,
                      class: B(["h-6 w-6", i(m.color)]),
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor"
                    },
                    [...f[0] || (f[0] = [
                      o(
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
                  )) : m.icon === "heroicon-o-exclamation-triangle" ? (l(), u(
                    "svg",
                    {
                      key: 1,
                      class: B(["h-6 w-6", i(m.color)]),
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor"
                    },
                    [...f[1] || (f[1] = [
                      o(
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
                  )) : m.icon === "heroicon-o-x-circle" ? (l(), u(
                    "svg",
                    {
                      key: 2,
                      class: B(["h-6 w-6", i(m.color)]),
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor"
                    },
                    [...f[2] || (f[2] = [
                      o(
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
                  )) : m.icon === "heroicon-o-information-circle" ? (l(), u(
                    "svg",
                    {
                      key: 3,
                      class: B(["h-6 w-6", i(m.color)]),
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor"
                    },
                    [...f[3] || (f[3] = [
                      o(
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
                  )) : c("v-if", !0)
                ])) : c("v-if", !0),
                o("div", He, [
                  m.title ? (l(), u(
                    "p",
                    We,
                    h(m.title),
                    1
                    /* TEXT */
                  )) : c("v-if", !0),
                  m.body ? (l(), u(
                    "p",
                    Fe,
                    h(m.body),
                    1
                    /* TEXT */
                  )) : c("v-if", !0)
                ]),
                m.closeable !== !1 ? (l(), u("div", Ge, [
                  o("button", {
                    onClick: (p) => a(m.id),
                    type: "button",
                    class: "inline-flex rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  }, [...f[4] || (f[4] = [
                    o(
                      "span",
                      { class: "sr-only" },
                      "Close",
                      -1
                      /* CACHED */
                    ),
                    o(
                      "svg",
                      {
                        class: "h-5 w-5",
                        viewBox: "0 0 20 20",
                        fill: "currentColor"
                      },
                      [
                        o("path", {
                          "fill-rule": "evenodd",
                          d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                          "clip-rule": "evenodd"
                        })
                      ],
                      -1
                      /* CACHED */
                    )
                  ])], 8, Je)
                ])) : c("v-if", !0)
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
    const i = [
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
    ], a = w("system"), d = w(!1), s = E(() => a.value === "system" ? d.value ? "dark" : "light" : a.value);
    let f = null;
    function m() {
      s.value === "dark" ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
    }
    function p(v) {
      a.value = v, localStorage.setItem(ee, v), m();
    }
    function g(v) {
      d.value = v.matches, a.value === "system" && m();
    }
    return O(() => {
      const v = localStorage.getItem(ee);
      v && ["light", "dark", "system"].includes(v) && (a.value = v), f = window.matchMedia("(prefers-color-scheme: dark)"), d.value = f.matches, f.addEventListener("change", g), m();
    }), re(() => {
      f && f.removeEventListener("change", g);
    }), (v, k) => {
      const $ = _("PrimixDropdown");
      return l(), I($, null, {
        trigger: L(({ toggle: S }) => [
          o("button", {
            type: "button",
            class: "-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300",
            onClick: S
          }, [
            k[2] || (k[2] = o(
              "span",
              { class: "sr-only" },
              "Toggle theme",
              -1
              /* CACHED */
            )),
            c(" Sun icon (light mode) "),
            s.value === "light" ? (l(), u("svg", Xe, [...k[0] || (k[0] = [
              o(
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
            ])])) : (l(), u(
              M,
              { key: 1 },
              [
                c(" Moon icon (dark mode) "),
                k[1] || (k[1] = o(
                  "svg",
                  {
                    class: "h-6 w-6",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor"
                  },
                  [
                    o("path", {
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
          o("div", et, [
            o("div", tt, [
              (l(), u(
                M,
                null,
                j(i, (P) => o("button", {
                  key: P.value,
                  type: "button",
                  class: B(["flex w-full items-center gap-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700", { "bg-gray-50 dark:bg-gray-700/50 font-medium": a.value === P.value }]),
                  onClick: (Z) => {
                    p(P.value), S();
                  }
                }, [
                  (l(), I(ne(P.icon), { class: "h-4 w-4" })),
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
    const t = e, n = E(() => {
      const s = t.userMenu.userName ?? "";
      return s ? s.split(" ").map((f) => f.charAt(0)).slice(0, 2).join("").toUpperCase() : "?";
    }), r = E(() => (t.userMenu.items ?? []).filter((s) => !s.isPostAction)), i = E(() => (t.userMenu.items ?? []).filter((s) => s.isPostAction));
    function a(s) {
      return s === "danger" ? "text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-300";
    }
    function d(s) {
      const f = document.createElement("form");
      f.method = "POST", f.action = s;
      const m = document.createElement("input");
      m.type = "hidden", m.name = "_token", m.value = t.csrfToken, f.appendChild(m), document.body.appendChild(f), f.submit();
    }
    return (s, f) => {
      const m = _("PrimixDropdown");
      return l(), I(m, null, {
        trigger: L(({ toggle: p }) => [
          o("button", {
            type: "button",
            class: "-m-1.5 flex items-center p-1.5",
            onClick: p
          }, [
            f[1] || (f[1] = o(
              "span",
              { class: "sr-only" },
              "Open user menu",
              -1
              /* CACHED */
            )),
            c(" Avatar "),
            e.userMenu.avatarUrl ? (l(), u("img", {
              key: 0,
              src: e.userMenu.avatarUrl,
              alt: e.userMenu.userName,
              class: "h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 object-cover"
            }, null, 8, at)) : (l(), u(
              "span",
              it,
              h(n.value),
              1
              /* TEXT */
            )),
            o("span", st, [
              o(
                "span",
                lt,
                h(e.userMenu.userName ?? "User"),
                1
                /* TEXT */
              ),
              f[0] || (f[0] = o(
                "svg",
                {
                  class: "ml-2 h-5 w-5 text-gray-400",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                },
                [
                  o("path", {
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
          o("div", dt, [
            c(" User info header "),
            o("div", ct, [
              o(
                "p",
                ut,
                h(e.userMenu.userName),
                1
                /* TEXT */
              ),
              e.userMenu.userEmail ? (l(), u(
                "p",
                ft,
                h(e.userMenu.userEmail),
                1
                /* TEXT */
              )) : c("v-if", !0)
            ]),
            c(" Menu items "),
            o("div", mt, [
              (l(!0), u(
                M,
                null,
                j(r.value, (g, v) => (l(), u("a", T({
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
            c(" Logout (post actions) "),
            i.value.length > 0 ? (l(), u(
              M,
              { key: 0 },
              [
                f[2] || (f[2] = o(
                  "div",
                  { class: "border-t border-gray-100 dark:border-gray-700" },
                  null,
                  -1
                  /* CACHED */
                )),
                o("div", vt, [
                  (l(!0), u(
                    M,
                    null,
                    j(i.value, (g, v) => (l(), u("button", {
                      key: "post-" + v,
                      type: "button",
                      class: B(["flex w-full items-center gap-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700", a(g.color)]),
                      onClick: (k) => {
                        d(g.url), p();
                      }
                    }, h(g.label), 11, gt))),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            )) : c("v-if", !0)
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
}, Mt = ["href", "onClick"], $t = { class: "truncate" }, St = { class: "py-1" }, Bt = ["href", "onClick"], It = {
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
    const t = e, n = E(() => t.tenantMenu.items ?? []);
    return (r, i) => {
      const a = _("PrimixDropdown");
      return l(), I(a, null, {
        trigger: L(({ toggle: d }) => [
          o("button", {
            type: "button",
            class: "-m-1.5 flex items-center p-1.5",
            onClick: d
          }, [
            i[1] || (i[1] = o(
              "span",
              { class: "sr-only" },
              "Open tenant menu",
              -1
              /* CACHED */
            )),
            c(" Building icon "),
            i[2] || (i[2] = o(
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
                o("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                })
              ],
              -1
              /* CACHED */
            )),
            o("span", kt, [
              o(
                "span",
                wt,
                h(e.tenantMenu.currentTenantName ?? "Tenant"),
                1
                /* TEXT */
              ),
              i[0] || (i[0] = o(
                "svg",
                {
                  class: "ml-2 h-5 w-5 text-gray-400",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                },
                [
                  o("path", {
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
        default: L(({ close: d }) => [
          o("div", xt, [
            c(" Current tenant header "),
            o("div", bt, [
              i[3] || (i[3] = o(
                "p",
                { class: "text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" },
                " Current tenant ",
                -1
                /* CACHED */
              )),
              o(
                "p",
                Ct,
                h(e.tenantMenu.currentTenantName),
                1
                /* TEXT */
              )
            ]),
            c(" Switch to other tenants "),
            e.tenantMenu.tenants && e.tenantMenu.tenants.length > 0 ? (l(), u("div", Lt, [
              i[5] || (i[5] = o(
                "p",
                { class: "px-4 py-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" },
                " Switch to ",
                -1
                /* CACHED */
              )),
              (l(!0), u(
                M,
                null,
                j(e.tenantMenu.tenants, (s) => (l(), u("a", {
                  key: s.id,
                  href: s.url,
                  class: "flex w-full items-center gap-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                  onClick: d
                }, [
                  i[4] || (i[4] = o(
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
                      o("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                      })
                    ],
                    -1
                    /* CACHED */
                  )),
                  o(
                    "span",
                    $t,
                    h(s.name),
                    1
                    /* TEXT */
                  )
                ], 8, Mt))),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : c("v-if", !0),
            c(" Custom menu items "),
            n.value.length > 0 ? (l(), u(
              M,
              { key: 1 },
              [
                i[6] || (i[6] = o(
                  "div",
                  { class: "border-t border-gray-100 dark:border-gray-700" },
                  null,
                  -1
                  /* CACHED */
                )),
                o("div", St, [
                  (l(!0), u(
                    M,
                    null,
                    j(n.value, (s, f) => (l(), u("a", T({
                      key: "item-" + f,
                      href: s.url
                    }, { ref_for: !0 }, e.spa ? { "data-livue-navigate": "true" } : {}, {
                      class: "flex w-full items-center gap-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                      onClick: d
                    }), h(s.label), 17, Bt))),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            )) : c("v-if", !0)
          ])
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
}, Tt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, i] of t)
    n[r] = i;
  return n;
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
    let n = -1;
    return () => (n = -1, !e.loading && e.query.length >= 2 && e.groups.length === 0 ? b("div", { class: "px-6 py-14 text-center text-sm text-gray-500 dark:text-gray-400" }, [
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
    ]) : e.query.length < 2 && e.groups.length === 0 ? null : b("div", { class: "py-2" }, e.groups.map((r) => b("div", { key: r.label }, [
      // Group header
      b("div", { class: "px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-x-2" }, [
        r.label,
        r.panelLabel ? b("span", {
          class: "inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300 normal-case tracking-normal"
        }, r.panelLabel) : null
      ]),
      // Results
      ...r.results.map((i) => {
        n++;
        const d = n === e.selectedIndex;
        return b("a", {
          key: i.url,
          href: i.url,
          class: [
            "flex items-center gap-x-3 px-4 py-2.5 cursor-pointer transition-colors",
            d ? "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
          ],
          ...e.spa ? { "data-livue-navigate": "true" } : {},
          onClick(s) {
            s.preventDefault(), t("select", i.url);
          }
        }, [
          b("div", { class: "flex-1 min-w-0" }, [
            b("div", { class: "text-sm font-medium truncate" }, i.title),
            Object.keys(i.details || {}).length > 0 ? b(
              "div",
              { class: "flex items-center gap-x-3 mt-0.5" },
              Object.entries(i.details).map(
                ([s, f]) => b("span", { key: s, class: "text-xs text-gray-500 dark:text-gray-400" }, [
                  b("span", { class: "font-medium" }, s + ": "),
                  String(f)
                ])
              )
            ) : null
          ]),
          d ? b("svg", {
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
    const t = Q("livue"), n = w(!1), r = w(""), i = w([]), a = w(!1), d = w(-1), s = w(null), f = w(null), m = w(null), p = w(null), g = E(() => typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent)), v = E(() => i.value.reduce((x, y) => x + y.results.length, 0));
    let k = null;
    function $() {
      n.value = !0, r.value = "", i.value = [], d.value = -1, Se(() => {
        e.mode === "spotlight" && s.value ? s.value.focus() : e.mode === "dropdown" && f.value && f.value.focus();
      });
    }
    function S() {
      n.value = !1, r.value = "", i.value = [], d.value = -1;
    }
    function P(x) {
      const y = v.value;
      if (y === 0) return;
      let C = d.value + x;
      C < 0 && (C = y - 1), C >= y && (C = 0), d.value = C;
    }
    function Z() {
      if (d.value < 0 || v.value === 0) return;
      let x = 0;
      for (const y of i.value)
        for (const C of y.results) {
          if (x === d.value) {
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
    ae(r, (x) => {
      if (clearTimeout(k), d.value = -1, x.length < 2) {
        i.value = [], a.value = !1;
        return;
      }
      a.value = !0, k = setTimeout(async () => {
        try {
          const y = await t.search(x);
          i.value = y || [];
        } catch {
          i.value = [];
        } finally {
          a.value = !1;
        }
      }, 300);
    });
    function W(x) {
      (x.metaKey || x.ctrlKey) && x.key === "k" && (x.preventDefault(), n.value ? S() : $());
    }
    function U(x) {
      e.mode !== "dropdown" || !n.value || p.value && !p.value.contains(x.target) && S();
    }
    return O(() => {
      document.addEventListener("keydown", W), document.addEventListener("mousedown", U);
    }), G(() => {
      document.removeEventListener("keydown", W), document.removeEventListener("mousedown", U), clearTimeout(k);
    }), {
      isOpen: n,
      query: r,
      results: i,
      loading: a,
      selectedIndex: d,
      spotlightInputRef: s,
      dropdownInputRef: f,
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
}, Vt = { class: "max-h-80 overflow-y-auto" }, _t = {
  key: 0,
  class: "flex items-center justify-end gap-x-4 border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-xs text-gray-400"
};
function Zt(e, t, n, r, i, a) {
  const d = _("search-results");
  return l(), u(
    M,
    null,
    [
      c(" Trigger button (always visible in topbar) "),
      o("div", Pt, [
        o("button", {
          type: "button",
          class: "flex flex-1 items-center gap-x-2 rounded-md px-3 py-2 text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors",
          onClick: t[0] || (t[0] = (...s) => r.open && r.open(...s))
        }, [
          t[14] || (t[14] = o(
            "svg",
            {
              class: "h-5 w-5 flex-shrink-0",
              viewBox: "0 0 20 20",
              fill: "currentColor"
            },
            [
              o("path", {
                "fill-rule": "evenodd",
                d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
                "clip-rule": "evenodd"
              })
            ],
            -1
            /* CACHED */
          )),
          t[15] || (t[15] = o(
            "span",
            { class: "hidden sm:inline" },
            "Search...",
            -1
            /* CACHED */
          )),
          n.mode === "spotlight" ? (l(), u("kbd", Dt, [
            o(
              "abbr",
              Rt,
              h(r.isMac ? "⌘" : "Ctrl"),
              1
              /* TEXT */
            ),
            t[13] || (t[13] = K(
              "K ",
              -1
              /* CACHED */
            ))
          ])) : c("v-if", !0)
        ]),
        c(" Dropdown mode: results panel "),
        n.mode === "dropdown" && r.isOpen ? (l(), u(
          "div",
          jt,
          [
            o("div", zt, [
              o("div", Nt, [
                t[16] || (t[16] = o(
                  "svg",
                  {
                    class: "pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 ml-3",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  },
                  [
                    o("path", {
                      "fill-rule": "evenodd",
                      d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
                      "clip-rule": "evenodd"
                    })
                  ],
                  -1
                  /* CACHED */
                )),
                F(o(
                  "input",
                  {
                    ref: "dropdownInputRef",
                    "onUpdate:modelValue": t[1] || (t[1] = (s) => r.query = s),
                    type: "search",
                    class: "block w-full border-0 bg-transparent py-2 pl-10 pr-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm",
                    placeholder: "Search...",
                    onKeydown: [
                      t[2] || (t[2] = z((...s) => r.close && r.close(...s), ["escape"])),
                      t[3] || (t[3] = z(D((s) => r.moveSelection(1), ["prevent"]), ["down"])),
                      t[4] || (t[4] = z(D((s) => r.moveSelection(-1), ["prevent"]), ["up"])),
                      t[5] || (t[5] = z(D((...s) => r.selectCurrent && r.selectCurrent(...s), ["prevent"]), ["enter"]))
                    ]
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [X, r.query]
                ])
              ])
            ]),
            R(d, {
              groups: r.results,
              loading: r.loading,
              query: r.query,
              "selected-index": r.selectedIndex,
              spa: n.spa,
              onSelect: r.navigateTo
            }, null, 8, ["groups", "loading", "query", "selected-index", "spa", "onSelect"])
          ],
          512
          /* NEED_PATCH */
        )) : c("v-if", !0)
      ]),
      c(" Spotlight mode: modal overlay "),
      (l(), I(oe, { to: "body" }, [
        R(N, {
          "enter-active-class": "transition-opacity duration-200 ease-out",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition-opacity duration-150 ease-in",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: L(() => [
            n.mode === "spotlight" && r.isOpen ? (l(), u("div", {
              key: 0,
              class: "fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4",
              onClick: t[12] || (t[12] = D((...s) => r.close && r.close(...s), ["self"]))
            }, [
              c(" Backdrop "),
              o("div", {
                class: "fixed inset-0 bg-gray-900/50 dark:bg-gray-900/75",
                onClick: t[6] || (t[6] = (...s) => r.close && r.close(...s))
              }),
              c(" Modal "),
              o(
                "div",
                Ot,
                [
                  c(" Search input "),
                  o("div", Ut, [
                    t[18] || (t[18] = o(
                      "svg",
                      {
                        class: "h-5 w-5 text-gray-400 flex-shrink-0",
                        viewBox: "0 0 20 20",
                        fill: "currentColor"
                      },
                      [
                        o("path", {
                          "fill-rule": "evenodd",
                          d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
                          "clip-rule": "evenodd"
                        })
                      ],
                      -1
                      /* CACHED */
                    )),
                    F(o(
                      "input",
                      {
                        ref: "spotlightInputRef",
                        "onUpdate:modelValue": t[7] || (t[7] = (s) => r.query = s),
                        type: "search",
                        class: "block w-full border-0 bg-transparent py-4 pl-3 pr-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm",
                        placeholder: "Search...",
                        onKeydown: [
                          t[8] || (t[8] = z((...s) => r.close && r.close(...s), ["escape"])),
                          t[9] || (t[9] = z(D((s) => r.moveSelection(1), ["prevent"]), ["down"])),
                          t[10] || (t[10] = z(D((s) => r.moveSelection(-1), ["prevent"]), ["up"])),
                          t[11] || (t[11] = z(D((...s) => r.selectCurrent && r.selectCurrent(...s), ["prevent"]), ["enter"]))
                        ]
                      },
                      null,
                      544
                      /* NEED_HYDRATION, NEED_PATCH */
                    ), [
                      [X, r.query]
                    ]),
                    r.loading ? (l(), u("div", Kt, [...t[17] || (t[17] = [
                      o(
                        "svg",
                        {
                          class: "h-5 w-5 animate-spin text-gray-400",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24"
                        },
                        [
                          o("circle", {
                            class: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            "stroke-width": "4"
                          }),
                          o("path", {
                            class: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          })
                        ],
                        -1
                        /* CACHED */
                      )
                    ])])) : c("v-if", !0)
                  ]),
                  c(" Results "),
                  o("div", Vt, [
                    R(d, {
                      groups: r.results,
                      loading: r.loading,
                      query: r.query,
                      "selected-index": r.selectedIndex,
                      spa: n.spa,
                      onSelect: r.navigateTo
                    }, null, 8, ["groups", "loading", "query", "selected-index", "spa", "onSelect"])
                  ]),
                  c(" Footer "),
                  r.results.length > 0 ? (l(), u("div", _t, [...t[19] || (t[19] = [
                    o(
                      "span",
                      { class: "flex items-center gap-x-1" },
                      [
                        o("kbd", { class: "rounded border border-gray-300 dark:border-gray-600 px-1 py-0.5 font-sans" }, "↑↓"),
                        K(" Navigate ")
                      ],
                      -1
                      /* CACHED */
                    ),
                    o(
                      "span",
                      { class: "flex items-center gap-x-1" },
                      [
                        o("kbd", { class: "rounded border border-gray-300 dark:border-gray-600 px-1 py-0.5 font-sans" }, "↵"),
                        K(" Open ")
                      ],
                      -1
                      /* CACHED */
                    ),
                    o(
                      "span",
                      { class: "flex items-center gap-x-1" },
                      [
                        o("kbd", { class: "rounded border border-gray-300 dark:border-gray-600 px-1 py-0.5 font-sans" }, "Esc"),
                        K(" Close ")
                      ],
                      -1
                      /* CACHED */
                    )
                  ])])) : c("v-if", !0)
                ],
                512
                /* NEED_PATCH */
              )
            ])) : c("v-if", !0)
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
const qt = /* @__PURE__ */ Tt(Et, [["render", Zt]]), Ht = { class: "flex-shrink-0 mt-2 w-2" }, Wt = {
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
    const n = e, r = t, i = {
      success: "text-green-500",
      danger: "text-red-500",
      warning: "text-yellow-500",
      info: "text-blue-500",
      primary: "text-blue-500",
      gray: "text-gray-400"
    };
    function a(f) {
      return i[f] || "text-gray-400";
    }
    const d = E(() => {
      if (!n.notification.created_at) return "";
      const f = new Date(n.notification.created_at), p = Math.floor(((/* @__PURE__ */ new Date()).getTime() - f.getTime()) / 1e3);
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
    function s() {
      n.notification.read_at || r("mark-read", n.notification.id), n.notification.url && r("navigate", n.notification.url);
    }
    return (f, m) => (l(), u(
      "div",
      {
        class: B([
          "flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
          e.notification.read_at ? "" : "bg-primary-50/50 dark:bg-primary-900/10"
        ]),
        onClick: s
      },
      [
        c(" Unread dot "),
        o("div", Ht, [
          e.notification.read_at ? c("v-if", !0) : (l(), u("div", Wt))
        ]),
        c(" Icon "),
        e.notification.icon ? (l(), u("div", Ft, [
          e.notification.icon === "heroicon-o-check-circle" ? (l(), u(
            "svg",
            {
              key: 0,
              class: B(["h-5 w-5", a(e.notification.color)]),
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              "stroke-width": "1.5",
              stroke: "currentColor"
            },
            [...m[1] || (m[1] = [
              o(
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
          )) : e.notification.icon === "heroicon-o-exclamation-triangle" ? (l(), u(
            "svg",
            {
              key: 1,
              class: B(["h-5 w-5", a(e.notification.color)]),
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              "stroke-width": "1.5",
              stroke: "currentColor"
            },
            [...m[2] || (m[2] = [
              o(
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
          )) : e.notification.icon === "heroicon-o-x-circle" ? (l(), u(
            "svg",
            {
              key: 2,
              class: B(["h-5 w-5", a(e.notification.color)]),
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              "stroke-width": "1.5",
              stroke: "currentColor"
            },
            [...m[3] || (m[3] = [
              o(
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
          )) : e.notification.icon === "heroicon-o-information-circle" ? (l(), u(
            "svg",
            {
              key: 3,
              class: B(["h-5 w-5", a(e.notification.color)]),
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              "stroke-width": "1.5",
              stroke: "currentColor"
            },
            [...m[4] || (m[4] = [
              o(
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
          )) : c("v-if", !0)
        ])) : c("v-if", !0),
        c(" Content "),
        o("div", Gt, [
          o("div", Jt, [
            e.notification.title ? (l(), u(
              "p",
              Yt,
              h(e.notification.title),
              1
              /* TEXT */
            )) : c("v-if", !0),
            d.value ? (l(), u(
              "span",
              Qt,
              h(d.value),
              1
              /* TEXT */
            )) : c("v-if", !0)
          ]),
          e.notification.body ? (l(), u(
            "p",
            Xt,
            h(e.notification.body),
            1
            /* TEXT */
          )) : c("v-if", !0),
          e.notification.actions && e.notification.actions.length > 0 ? (l(), u("div", en, [
            (l(!0), u(
              M,
              null,
              j(e.notification.actions, (p) => (l(), u("a", {
                key: p.label,
                href: p.url,
                class: "text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400",
                onClick: m[0] || (m[0] = D(() => {
                }, ["stop"]))
              }, h(p.label), 9, tn))),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : c("v-if", !0)
        ])
      ],
      2
      /* CLASS */
    ));
  }
}, nn = { class: "absolute right-0 z-50 mt-2 w-96 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10" }, rn = { class: "flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700" }, on = { class: "text-sm font-semibold text-gray-900 dark:text-white" }, an = {
  key: 0,
  class: "ml-1 text-xs font-normal text-gray-500 dark:text-gray-400"
}, sn = { class: "max-h-[32rem] overflow-y-auto" }, ln = { class: "px-4 py-8 text-center" }, dn = { class: "mt-2 text-sm text-gray-500 dark:text-gray-400" }, cn = {
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
  setup(e) {
    return (t, n) => (l(), u("div", nn, [
      c(" Header "),
      o("div", rn, [
        o("h3", on, [
          K(
            h(e.translations.title || "Notifications") + " ",
            1
            /* TEXT */
          ),
          e.unreadCount > 0 ? (l(), u(
            "span",
            an,
            " (" + h(e.unreadCount) + ") ",
            1
            /* TEXT */
          )) : c("v-if", !0)
        ]),
        e.unreadCount > 0 ? (l(), u(
          "button",
          {
            key: 0,
            type: "button",
            class: "text-xs text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium",
            onClick: n[0] || (n[0] = (r) => t.$emit("mark-all-read"))
          },
          h(e.translations.mark_all_read || "Mark all as read"),
          1
          /* TEXT */
        )) : c("v-if", !0)
      ]),
      c(" Notification list "),
      o("div", sn, [
        e.notifications.length > 0 ? (l(!0), u(
          M,
          { key: 0 },
          j(e.notifications, (r) => (l(), I(se, {
            key: r.id,
            notification: r,
            onMarkRead: n[1] || (n[1] = (i) => t.$emit("mark-read", i)),
            onNavigate: n[2] || (n[2] = (i) => t.$emit("navigate", i))
          }, null, 8, ["notification"]))),
          128
          /* KEYED_FRAGMENT */
        )) : (l(), u(
          M,
          { key: 1 },
          [
            c(" Empty state "),
            o("div", ln, [
              n[4] || (n[4] = o(
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
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M9.143 17.082a24.248 24.248 0 0 0 5.714 0m-5.714 0a2.25 2.25 0 0 1-2.244-2.077L6.394 5.694a6.001 6.001 0 0 1 11.212 0l-.505 9.311a2.25 2.25 0 0 1-2.244 2.077m-5.714 0a3 3 0 0 0 5.714 0"
                  })
                ],
                -1
                /* CACHED */
              )),
              o(
                "p",
                dn,
                h(e.translations.no_notifications || "No notifications"),
                1
                /* TEXT */
              )
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        ))
      ]),
      c(" Load more "),
      e.hasMore ? (l(), u("div", cn, [
        o("button", {
          type: "button",
          class: "w-full px-4 py-2 text-xs text-center text-primary-600 hover:bg-gray-50 dark:text-primary-400 dark:hover:bg-gray-700/50 font-medium",
          disabled: e.loading,
          onClick: n[3] || (n[3] = (r) => t.$emit("load-more"))
        }, h(e.loading ? e.translations.loading || "Loading..." : e.translations.load_more || "Load more"), 9, un)
      ])) : c("v-if", !0)
    ]));
  }
}, mn = {
  key: 0,
  class: "fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-gray-800 shadow-xl flex flex-col"
}, pn = { class: "flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700" }, vn = { class: "text-base font-semibold text-gray-900 dark:text-white" }, gn = {
  key: 0,
  class: "ml-1 text-sm font-normal text-gray-500 dark:text-gray-400"
}, yn = { class: "flex items-center gap-3" }, hn = { class: "sr-only" }, kn = { class: "flex-1 overflow-y-auto" }, wn = { class: "px-4 py-12 text-center" }, xn = { class: "mt-3 text-sm text-gray-500 dark:text-gray-400" }, bn = {
  key: 0,
  class: "border-t border-gray-200 dark:border-gray-700"
}, Cn = ["disabled"], Ln = {
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
    const n = t;
    function r(i) {
      i.key === "Escape" && n("close");
    }
    return O(() => {
      document.addEventListener("keydown", r);
    }), G(() => {
      document.removeEventListener("keydown", r);
    }), (i, a) => (l(), I(oe, { to: "body" }, [
      c(" Backdrop "),
      R(N, {
        "enter-active-class": "transition-opacity ease-linear duration-300",
        "enter-from-class": "opacity-0",
        "enter-to-class": "opacity-100",
        "leave-active-class": "transition-opacity ease-linear duration-300",
        "leave-from-class": "opacity-100",
        "leave-to-class": "opacity-0"
      }, {
        default: L(() => [
          e.open ? (l(), u("div", {
            key: 0,
            class: "fixed inset-0 z-50 bg-gray-900/50",
            onClick: a[0] || (a[0] = (d) => i.$emit("close"))
          })) : c("v-if", !0)
        ]),
        _: 1
        /* STABLE */
      }),
      c(" Panel "),
      R(N, {
        "enter-active-class": "transform transition ease-in-out duration-300",
        "enter-from-class": "translate-x-full",
        "enter-to-class": "translate-x-0",
        "leave-active-class": "transform transition ease-in-out duration-300",
        "leave-from-class": "translate-x-0",
        "leave-to-class": "translate-x-full"
      }, {
        default: L(() => [
          e.open ? (l(), u("div", mn, [
            c(" Header "),
            o("div", pn, [
              o("h2", vn, [
                K(
                  h(e.translations.title || "Notifications") + " ",
                  1
                  /* TEXT */
                ),
                e.unreadCount > 0 ? (l(), u(
                  "span",
                  gn,
                  " (" + h(e.unreadCount) + ") ",
                  1
                  /* TEXT */
                )) : c("v-if", !0)
              ]),
              o("div", yn, [
                e.unreadCount > 0 ? (l(), u(
                  "button",
                  {
                    key: 0,
                    type: "button",
                    class: "text-xs text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium",
                    onClick: a[1] || (a[1] = (d) => i.$emit("mark-all-read"))
                  },
                  h(e.translations.mark_all_read || "Mark all as read"),
                  1
                  /* TEXT */
                )) : c("v-if", !0),
                o("button", {
                  type: "button",
                  class: "rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300",
                  onClick: a[2] || (a[2] = (d) => i.$emit("close"))
                }, [
                  o(
                    "span",
                    hn,
                    h(e.translations.close || "Close"),
                    1
                    /* TEXT */
                  ),
                  a[6] || (a[6] = o(
                    "svg",
                    {
                      class: "h-5 w-5",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
                    },
                    [
                      o("path", {
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
            c(" Notification list "),
            o("div", kn, [
              e.notifications.length > 0 ? (l(!0), u(
                M,
                { key: 0 },
                j(e.notifications, (d) => (l(), I(se, {
                  key: d.id,
                  notification: d,
                  onMarkRead: a[3] || (a[3] = (s) => i.$emit("mark-read", s)),
                  onNavigate: a[4] || (a[4] = (s) => i.$emit("navigate", s))
                }, null, 8, ["notification"]))),
                128
                /* KEYED_FRAGMENT */
              )) : (l(), u(
                M,
                { key: 1 },
                [
                  c(" Empty state "),
                  o("div", wn, [
                    a[7] || (a[7] = o(
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
                        o("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M9.143 17.082a24.248 24.248 0 0 0 5.714 0m-5.714 0a2.25 2.25 0 0 1-2.244-2.077L6.394 5.694a6.001 6.001 0 0 1 11.212 0l-.505 9.311a2.25 2.25 0 0 1-2.244 2.077m-5.714 0a3 3 0 0 0 5.714 0"
                        })
                      ],
                      -1
                      /* CACHED */
                    )),
                    o(
                      "p",
                      xn,
                      h(e.translations.no_notifications || "No notifications"),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              ))
            ]),
            c(" Load more footer "),
            e.hasMore ? (l(), u("div", bn, [
              o("button", {
                type: "button",
                class: "w-full px-4 py-3 text-sm text-center text-primary-600 hover:bg-gray-50 dark:text-primary-400 dark:hover:bg-gray-700/50 font-medium",
                disabled: e.loading,
                onClick: a[5] || (a[5] = (d) => i.$emit("load-more"))
              }, h(e.loading ? e.translations.loading || "Loading..." : e.translations.load_more || "Load more"), 9, Cn)
            ])) : c("v-if", !0)
          ])) : c("v-if", !0)
        ]),
        _: 1
        /* STABLE */
      })
    ]));
  }
}, Mn = { class: "sr-only" }, $n = {
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
    const t = e, n = Q("livue"), r = w(null), i = w(!1), a = w([]), d = w(0), s = w(!1), f = w(!1), m = w(1), p = w(0), g = w(!1);
    let v = null;
    async function k() {
      try {
        const C = (await n.getUnreadNotificationsCount()).count ?? 0;
        C > p.value && (g.value = !0, setTimeout(() => {
          g.value = !1;
        }, 2e3)), p.value = C, d.value = C;
      } catch {
      }
    }
    async function $() {
      f.value = !0, m.value = 1;
      try {
        const y = await n.getNotifications({ page: 1, perPage: 15 });
        a.value = y.data ?? [], s.value = y.hasMore ?? !1, d.value = y.unreadCount ?? 0, p.value = d.value;
      } catch {
      } finally {
        f.value = !1;
      }
    }
    async function S() {
      if (!f.value) {
        f.value = !0, m.value += 1;
        try {
          const y = await n.getNotifications({ page: m.value, perPage: 15 });
          a.value = [...a.value, ...y.data ?? []], s.value = y.hasMore ?? !1;
        } catch {
        } finally {
          f.value = !1;
        }
      }
    }
    async function P(y) {
      try {
        await n.markNotificationAsRead({ id: y });
        const C = a.value.find((ce) => ce.id === y);
        C && !C.read_at && (C.read_at = (/* @__PURE__ */ new Date()).toISOString(), d.value = Math.max(0, d.value - 1));
      } catch {
      }
    }
    async function Z() {
      try {
        await n.markAllNotificationsAsRead(), a.value.forEach((y) => {
          y.read_at = y.read_at || (/* @__PURE__ */ new Date()).toISOString();
        }), d.value = 0;
      } catch {
      }
    }
    function q(y) {
      U(), window.location.href = y;
    }
    function W() {
      i.value ? U() : (i.value = !0, $());
    }
    function U() {
      i.value = !1;
    }
    function x(y) {
      i.value && t.mode === "popup" && r.value && !r.value.contains(y.target) && U();
    }
    return O(() => {
      k(), v = setInterval(k, t.pollingInterval * 1e3), document.addEventListener("mousedown", x);
    }), G(() => {
      v && clearInterval(v), document.removeEventListener("mousedown", x);
    }), (y, C) => (l(), u(
      "div",
      {
        ref_key: "containerRef",
        ref: r,
        class: "relative"
      },
      [
        c(" Bell button "),
        o("button", {
          type: "button",
          class: "relative rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none",
          onClick: W
        }, [
          o(
            "span",
            Mn,
            h(e.translations.bell_label || "Notifications"),
            1
            /* TEXT */
          ),
          C[0] || (C[0] = o(
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
              o("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              })
            ],
            -1
            /* CACHED */
          )),
          c(" Badge "),
          d.value > 0 ? (l(), u(
            "span",
            {
              key: 0,
              class: B([
                "absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold min-w-[1.25rem] h-5 px-1",
                g.value ? "animate-pulse" : ""
              ])
            },
            h(d.value > 99 ? "99+" : d.value),
            3
            /* TEXT, CLASS */
          )) : c("v-if", !0)
        ]),
        c(" Popup mode "),
        R(N, {
          "enter-active-class": "transition ease-out duration-100",
          "enter-from-class": "transform opacity-0 scale-95",
          "enter-to-class": "transform opacity-100 scale-100",
          "leave-active-class": "transition ease-in duration-75",
          "leave-from-class": "transform opacity-100 scale-100",
          "leave-to-class": "transform opacity-0 scale-95"
        }, {
          default: L(() => [
            e.mode === "popup" && i.value ? (l(), I(fn, {
              key: 0,
              notifications: a.value,
              "unread-count": d.value,
              "has-more": s.value,
              loading: f.value,
              translations: e.translations,
              onLoadMore: S,
              onMarkRead: P,
              onMarkAllRead: Z,
              onNavigate: q
            }, null, 8, ["notifications", "unread-count", "has-more", "loading", "translations"])) : c("v-if", !0)
          ]),
          _: 1
          /* STABLE */
        }),
        c(" Drawer mode "),
        e.mode === "drawer" ? (l(), I(Ln, {
          key: 0,
          open: i.value,
          notifications: a.value,
          "unread-count": d.value,
          "has-more": s.value,
          loading: f.value,
          translations: e.translations,
          onClose: U,
          onLoadMore: S,
          onMarkRead: P,
          onMarkAllRead: Z,
          onNavigate: q
        }, null, 8, ["open", "notifications", "unread-count", "has-more", "loading", "translations"])) : c("v-if", !0)
      ],
      512
      /* NEED_PATCH */
    ));
  }
}, te = "primix-resource-workspaces:v1";
function Sn(e) {
  if (typeof e != "string" || e === "")
    return "/";
  const t = e.replace(/\/{2,}/g, "/");
  return t.length > 1 && t.endsWith("/") ? t.slice(0, -1) : t;
}
function Bn(e) {
  if (typeof e != "string" || e === "")
    return "";
  const t = Array.from(new URLSearchParams(e).entries()).sort(([n, r], [i, a]) => n === i ? r.localeCompare(a) : n.localeCompare(i));
  return t.length === 0 ? "" : `?${new URLSearchParams(t).toString()}`;
}
function le(e, t = null) {
  if (typeof e == "string") {
    const n = e.trim();
    if (n.startsWith("key:") && n.length > 4)
      return n;
    const r = V(n);
    if (r !== null)
      return r;
  }
  return t;
}
function In(e, t) {
  return typeof e?.currentKey == "string" && e.currentKey.trim() !== "" ? `key:${e.currentKey.trim()}` : t;
}
function de(e) {
  if (!Array.isArray(e) || e.length === 0)
    return [];
  const t = [], n = {};
  for (const r of e) {
    if (!r || typeof r != "object")
      continue;
    const i = V(r.url);
    if (i === null)
      continue;
    const a = {
      id: le(r.id, i),
      url: i,
      title: typeof r.title == "string" ? r.title : "",
      updatedAt: typeof r.updatedAt == "number" ? r.updatedAt : Date.now()
    }, d = n[a.id];
    if (d === void 0) {
      n[a.id] = t.length, t.push(a);
      continue;
    }
    const s = t[d], f = s.updatedAt;
    s.title.trim() === "" && a.title.trim() !== "" && (s.title = a.title), s.updatedAt = Math.max(f, a.updatedAt), a.updatedAt >= f && (s.url = a.url);
  }
  return t;
}
function V(e) {
  if (typeof e != "string" || e.trim() === "")
    return null;
  try {
    const t = new URL(e, window.location.origin), n = Sn(t.pathname), r = Bn(t.search);
    return `${n}${r}`;
  } catch {
    return null;
  }
}
function Tn(e) {
  if (!e || typeof e != "object")
    return {};
  const t = {};
  for (const [n, r] of Object.entries(e)) {
    if (!r || typeof r != "object")
      continue;
    const i = Array.isArray(r.tabs) ? r.tabs : [], a = de(i), d = le(r.activeTabId, null);
    t[n] = {
      tabs: a,
      activeTabId: d && a.some((s) => s.id === d) ? d : null
    };
  }
  return t;
}
const An = {
  state: () => ({
    hydrated: !1,
    workspaces: {}
  }),
  actions: {
    workspaceKey(e) {
      const t = e?.panelId || "default", n = e?.resourceSlug || "resource";
      return `${t}::${n}`;
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
      const t = this.workspaceKey(e), n = V(e?.currentUrl);
      if (n === null)
        return t;
      const r = In(e, n), i = `${e?.currentTitle || e?.resourceLabel || "Untitled"}`.trim(), a = this.ensureWorkspace(t);
      a.tabs = de(a.tabs), a.tabs.some((s) => s.id === a.activeTabId) || (a.activeTabId = null);
      const d = a.tabs.find((s) => s.id === r || s.url === n);
      if (d)
        d.id = r, d.url = n, d.title = i || d.title, d.updatedAt = Date.now(), a.activeTabId = d.id;
      else {
        const s = {
          id: r,
          url: n,
          title: i,
          updatedAt: Date.now()
        };
        a.tabs.push(s), a.activeTabId = s.id;
      }
      return this.persist(), t;
    },
    setActiveTab(e, t) {
      this.hydrate();
      const n = this.ensureWorkspace(e), r = n.tabs.find((i) => i.id === t);
      r && (n.activeTabId = r.id, r.updatedAt = Date.now(), this.persist());
    },
    closeTab(e, t) {
      this.hydrate();
      const n = this.ensureWorkspace(e), r = n.tabs.findIndex((s) => s.id === t);
      if (r === -1)
        return {
          closedActive: !1,
          nextUrl: null
        };
      const i = n.activeTabId === t;
      if (n.tabs.splice(r, 1), !i)
        return this.persist(), {
          closedActive: !1,
          nextUrl: null
        };
      if (n.tabs.length === 0)
        return n.activeTabId = null, this.persist(), {
          closedActive: !0,
          nextUrl: null
        };
      const a = r < n.tabs.length ? r : n.tabs.length - 1, d = n.tabs[a];
      return n.activeTabId = d.id, d.updatedAt = Date.now(), this.persist(), {
        closedActive: !0,
        nextUrl: d.url
      };
    }
  }
};
function En(e) {
  if (!e || typeof e.store != "function")
    throw new Error("[Primix] Unable to resolve LiVue store helper for resource workspace tabs.");
  return e.store("primix-resource-workspace", An, { scope: "global" });
}
const Pn = {
  key: 0,
  class: "mt-4 mb-6"
}, Dn = { class: "overflow-x-auto pb-1" }, Rn = { class: "flex min-w-max items-center gap-2" }, jn = ["href", "onClick"], zn = ["aria-label", "onClick"], Nn = {
  __name: "ResourceWorkspaceTabs",
  props: {
    workspace: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const t = e, n = Q("livue"), r = En(n), i = E(() => r.workspaceKey(t.workspace)), a = E(() => r.workspaces[i.value]?.tabs ?? []), d = E(() => r.workspaces[i.value]?.activeTabId ?? null);
    function s(g) {
      if (g) {
        if (t.workspace.spa) {
          const v = document.createElement("a");
          v.href = g, v.setAttribute("data-livue-navigate", "true"), document.body.appendChild(v), v.click(), document.body.removeChild(v);
          return;
        }
        window.location.href = g;
      }
    }
    function f() {
      t.workspace.enabled && r.registerCurrent({
        ...t.workspace,
        currentUrl: typeof window < "u" ? window.location.href : t.workspace.currentUrl
      });
    }
    function m(g) {
      r.setActiveTab(i.value, g.id), V(
        typeof window < "u" ? window.location.href : t.workspace.currentUrl
      ) !== g.url && s(g.url);
    }
    function p(g) {
      const v = V(
        typeof window < "u" ? window.location.href : t.workspace.currentUrl
      ), { closedActive: k, nextUrl: $ } = r.closeTab(i.value, g.id);
      if (!k)
        return;
      if ($) {
        s($);
        return;
      }
      const S = V(t.workspace.indexUrl);
      S && S !== v && s(t.workspace.indexUrl);
    }
    return O(f), ae(
      () => [t.workspace.currentUrl, t.workspace.currentTitle, t.workspace.enabled],
      f
    ), (g, v) => a.value.length > 0 ? (l(), u("div", Pn, [
      o("div", Dn, [
        o("div", Rn, [
          (l(!0), u(
            M,
            null,
            j(a.value, (k) => (l(), u(
              "div",
              {
                key: k.id,
                class: B(["group inline-flex max-w-[18rem] items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors", k.id === d.value ? "border-primary-300 bg-primary-50 text-primary-700 dark:border-primary-600/60 dark:bg-primary-900/20 dark:text-primary-300" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600"])
              },
              [
                o("a", T({
                  href: k.url,
                  class: "min-w-0 flex-1 truncate"
                }, { ref_for: !0 }, e.workspace.spa ? { "data-livue-navigate": "true" } : {}, {
                  onClick: D(($) => m(k), ["prevent"])
                }), h(k.title || e.workspace.resourceLabel), 17, jn),
                o("button", {
                  type: "button",
                  class: "inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded text-gray-400 transition-colors hover:bg-black/5 hover:text-gray-600 dark:hover:bg-white/10 dark:hover:text-gray-200",
                  "aria-label": e.workspace.closeTabLabel,
                  onClick: D(($) => p(k), ["stop", "prevent"])
                }, [...v[0] || (v[0] = [
                  o(
                    "svg",
                    {
                      class: "h-3 w-3",
                      viewBox: "0 0 20 20",
                      fill: "currentColor",
                      "aria-hidden": "true"
                    },
                    [
                      o("path", {
                        "fill-rule": "evenodd",
                        d: "M4.22 4.22a.75.75 0 011.06 0L10 8.94l4.72-4.72a.75.75 0 111.06 1.06L11.06 10l4.72 4.72a.75.75 0 11-1.06 1.06L10 11.06l-4.72 4.72a.75.75 0 11-1.06-1.06L8.94 10 4.22 5.28a.75.75 0 010-1.06z",
                        "clip-rule": "evenodd"
                      })
                    ],
                    -1
                    /* CACHED */
                  )
                ])], 8, zn)
              ],
              2
              /* CLASS */
            ))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])
    ])) : c("v-if", !0);
  }
}, On = (e) => {
  e?.config?.globalProperties?.__primixPanelsReady || (e.config.globalProperties.__primixPanelsReady = !0, e.component("PDrawer", ie), e.component("PrimixDropdown", Oe), e.component("PrimixCollapsible", Ue), e.component("PrimixToast", Ve), e.component("PrimixNotificationToasts", Ye), e.component("PrimixThemeToggle", rt), e.component("PrimixUserMenu", yt), e.component("PrimixTenantMenu", It), e.component("PrimixGlobalSearch", qt), e.component("PrimixNotificationBell", $n), e.component("PrimixResourceWorkspaceTabs", Nn));
};
ue.setup(On);
//# sourceMappingURL=primix-panels.js.map
