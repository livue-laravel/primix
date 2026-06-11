import we from "livue";
import { e as Le } from "./chunks/primix-D3w9RuwV.js";
import { s as v, f as V } from "./chunks/index-CoIgDweF.js";
import { B as k, R as U, T as Pe, z as x, C as Ce, K as A, v as Te, V as q, k as ee, b as P, Q as j, s as B, M as Y, Y as te, l as N, J as $e, m as ne, _ as Se, t as Ke, D as Be, r as Ae, W as xe, S as Oe } from "./chunks/index-uMyjrk0Z.js";
import { openBlock as l, createElementBlock as u, mergeProps as a, renderSlot as b, createCommentVNode as p, createElementVNode as h, resolveComponent as S, normalizeClass as C, toDisplayString as E, createVNode as T, withCtx as K, createBlock as g, resolveDynamicComponent as I, Transition as G, withDirectives as L, vShow as Z, resolveDirective as R, Fragment as $, renderList as ie, normalizeStyle as Ee, normalizeProps as Me, guardReactiveProps as ze } from "vue";
import { s as re } from "./chunks/index-B2Wxlp19.js";
import { s as oe, T as De } from "./chunks/index-CGQIuEMq.js";
import { s as Fe, a as Ve } from "./chunks/index-CaXeSIux.js";
import { R as M, s as Re, x as O, a as je } from "./chunks/index-BjgkEHwo.js";
import { s as Ne } from "./chunks/index-CCbH8b6k.js";
import { s as ae } from "./chunks/index-HHJV160Q.js";
import { s as He } from "./chunks/index-C3WK5X9S.js";
import { s as Ue } from "./chunks/index-f9w5Xowx.js";
import { O as H, C as We } from "./chunks/index-Cb10foaC.js";
import { F as Ge } from "./chunks/index-T4OHDugx.js";
var Ze = `
    .p-card {
        background: dt('card.background');
        color: dt('card.color');
        box-shadow: dt('card.shadow');
        border-radius: dt('card.border.radius');
        display: flex;
        flex-direction: column;
    }

    .p-card-caption {
        display: flex;
        flex-direction: column;
        gap: dt('card.caption.gap');
    }

    .p-card-body {
        padding: dt('card.body.padding');
        display: flex;
        flex-direction: column;
        gap: dt('card.body.gap');
    }

    .p-card-title {
        font-size: dt('card.title.font.size');
        font-weight: dt('card.title.font.weight');
    }

    .p-card-subtitle {
        color: dt('card.subtitle.color');
    }
`, qe = {
  root: "p-card p-component",
  header: "p-card-header",
  body: "p-card-body",
  caption: "p-card-caption",
  title: "p-card-title",
  subtitle: "p-card-subtitle",
  content: "p-card-content",
  footer: "p-card-footer"
}, Ye = k.extend({
  name: "card",
  style: Ze,
  classes: qe
}), Je = {
  name: "BaseCard",
  extends: v,
  style: Ye,
  provide: function() {
    return {
      $pcCard: this,
      $parentInstance: this
    };
  }
}, se = {
  name: "Card",
  extends: Je,
  inheritAttrs: !1
};
function Qe(e, t, n, r, o, i) {
  return l(), u("div", a({
    class: e.cx("root")
  }, e.ptmi("root")), [e.$slots.header ? (l(), u("div", a({
    key: 0,
    class: e.cx("header")
  }, e.ptm("header")), [b(e.$slots, "header")], 16)) : p("", !0), h("div", a({
    class: e.cx("body")
  }, e.ptm("body")), [e.$slots.title || e.$slots.subtitle ? (l(), u("div", a({
    key: 0,
    class: e.cx("caption")
  }, e.ptm("caption")), [e.$slots.title ? (l(), u("div", a({
    key: 0,
    class: e.cx("title")
  }, e.ptm("title")), [b(e.$slots, "title")], 16)) : p("", !0), e.$slots.subtitle ? (l(), u("div", a({
    key: 1,
    class: e.cx("subtitle")
  }, e.ptm("subtitle")), [b(e.$slots, "subtitle")], 16)) : p("", !0)], 16)) : p("", !0), h("div", a({
    class: e.cx("content")
  }, e.ptm("content")), [b(e.$slots, "content")], 16), e.$slots.footer ? (l(), u("div", a({
    key: 1,
    class: e.cx("footer")
  }, e.ptm("footer")), [b(e.$slots, "footer")], 16)) : p("", !0)], 16)], 16);
}
se.render = Qe;
var Xe = `
    .p-panel {
        display: block;
        border: 1px solid dt('panel.border.color');
        border-radius: dt('panel.border.radius');
        background: dt('panel.background');
        color: dt('panel.color');
    }

    .p-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: dt('panel.header.padding');
        background: dt('panel.header.background');
        color: dt('panel.header.color');
        border-style: solid;
        border-width: dt('panel.header.border.width');
        border-color: dt('panel.header.border.color');
        border-radius: dt('panel.header.border.radius');
    }

    .p-panel-toggleable .p-panel-header {
        padding: dt('panel.toggleable.header.padding');
    }

    .p-panel-title {
        line-height: 1;
        font-weight: dt('panel.title.font.weight');
    }

    .p-panel-content-container {
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-panel-content-wrapper {
        min-height: 0;
    }

    .p-panel-content {
        padding: dt('panel.content.padding');
    }

    .p-panel-footer {
        padding: dt('panel.footer.padding');
    }
`, _e = {
  root: function(t) {
    var n = t.props;
    return ["p-panel p-component", {
      "p-panel-toggleable": n.toggleable
    }];
  },
  header: "p-panel-header",
  title: "p-panel-title",
  headerActions: "p-panel-header-actions",
  pcToggleButton: "p-panel-toggle-button",
  contentContainer: "p-panel-content-container",
  contentWrapper: "p-panel-content-wrapper",
  content: "p-panel-content",
  footer: "p-panel-footer"
}, et = k.extend({
  name: "panel",
  style: Xe,
  classes: _e
}), tt = {
  name: "BasePanel",
  extends: v,
  props: {
    header: String,
    toggleable: Boolean,
    collapsed: Boolean,
    toggleButtonProps: {
      type: Object,
      default: function() {
        return {
          severity: "secondary",
          text: !0,
          rounded: !0
        };
      }
    }
  },
  style: et,
  provide: function() {
    return {
      $pcPanel: this,
      $parentInstance: this
    };
  }
}, le = {
  name: "Panel",
  extends: tt,
  inheritAttrs: !1,
  emits: ["update:collapsed", "toggle"],
  data: function() {
    return {
      d_collapsed: this.collapsed
    };
  },
  watch: {
    collapsed: function(t) {
      this.d_collapsed = t;
    }
  },
  methods: {
    toggle: function(t) {
      this.d_collapsed = !this.d_collapsed, this.$emit("update:collapsed", this.d_collapsed), this.$emit("toggle", {
        originalEvent: t,
        value: this.d_collapsed
      });
    },
    onKeyDown: function(t) {
      (t.code === "Enter" || t.code === "NumpadEnter" || t.code === "Space") && (this.toggle(t), t.preventDefault());
    }
  },
  computed: {
    buttonAriaLabel: function() {
      return this.toggleButtonProps && this.toggleButtonProps.ariaLabel ? this.toggleButtonProps.ariaLabel : this.header;
    },
    dataP: function() {
      return V({
        toggleable: this.toggleable
      });
    }
  },
  components: {
    PlusIcon: oe,
    MinusIcon: re,
    Button: Fe
  },
  directives: {
    ripple: M
  }
}, nt = ["data-p"], it = ["data-p"], rt = ["id"], ot = ["id", "aria-labelledby"];
function at(e, t, n, r, o, i) {
  var d = S("Button");
  return l(), u("div", a({
    class: e.cx("root"),
    "data-p": i.dataP
  }, e.ptmi("root")), [h("div", a({
    class: e.cx("header"),
    "data-p": i.dataP
  }, e.ptm("header")), [b(e.$slots, "header", {
    id: e.$id + "_header",
    class: C(e.cx("title")),
    collapsed: o.d_collapsed
  }, function() {
    return [e.header ? (l(), u("span", a({
      key: 0,
      id: e.$id + "_header",
      class: e.cx("title")
    }, e.ptm("title")), E(e.header), 17, rt)) : p("", !0)];
  }), h("div", a({
    class: e.cx("headerActions")
  }, e.ptm("headerActions")), [b(e.$slots, "icons"), e.toggleable ? b(e.$slots, "togglebutton", {
    key: 0,
    collapsed: o.d_collapsed,
    toggleCallback: function(s) {
      return i.toggle(s);
    },
    keydownCallback: function(s) {
      return i.onKeyDown(s);
    }
  }, function() {
    return [T(d, a({
      id: e.$id + "_header",
      class: e.cx("pcToggleButton"),
      "aria-label": i.buttonAriaLabel,
      "aria-controls": e.$id + "_content",
      "aria-expanded": !o.d_collapsed,
      unstyled: e.unstyled,
      onClick: t[0] || (t[0] = function(c) {
        return i.toggle(c);
      }),
      onKeydown: t[1] || (t[1] = function(c) {
        return i.onKeyDown(c);
      })
    }, e.toggleButtonProps, {
      pt: e.ptm("pcToggleButton")
    }), {
      icon: K(function(c) {
        return [b(e.$slots, e.$slots.toggleicon ? "toggleicon" : "togglericon", {
          collapsed: o.d_collapsed
        }, function() {
          return [(l(), g(I(o.d_collapsed ? "PlusIcon" : "MinusIcon"), a({
            class: c.class
          }, e.ptm("pcToggleButton").icon), null, 16, ["class"]))];
        })];
      }),
      _: 3
    }, 16, ["id", "class", "aria-label", "aria-controls", "aria-expanded", "unstyled", "pt"])];
  }) : p("", !0)], 16)], 16, it), T(G, a({
    name: "p-collapsible"
  }, e.ptm("transition")), {
    default: K(function() {
      return [L(h("div", a({
        id: e.$id + "_content",
        class: e.cx("contentContainer"),
        role: "region",
        "aria-labelledby": e.$id + "_header"
      }, e.ptm("contentContainer")), [h("div", a({
        class: e.cx("contentWrapper")
      }, e.ptm("contentWrapper")), [h("div", a({
        class: e.cx("content")
      }, e.ptm("content")), [b(e.$slots, "default")], 16), e.$slots.footer ? (l(), u("div", a({
        key: 0,
        class: e.cx("footer")
      }, e.ptm("footer")), [b(e.$slots, "footer")], 16)) : p("", !0)], 16)], 16, ot), [[Z, !o.d_collapsed]])];
    }),
    _: 3
  }, 16)], 16, nt);
}
le.render = at;
var st = `
    .p-tabs {
        display: flex;
        flex-direction: column;
    }

    .p-tablist {
        display: flex;
        position: relative;
        overflow: hidden;
        background: dt('tabs.tablist.background');
    }

    .p-tablist-viewport {
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        scrollbar-width: none;
        overscroll-behavior: contain auto;
    }

    .p-tablist-viewport::-webkit-scrollbar {
        display: none;
    }

    .p-tablist-tab-list {
        position: relative;
        display: flex;
        border-style: solid;
        border-color: dt('tabs.tablist.border.color');
        border-width: dt('tabs.tablist.border.width');
    }

    .p-tablist-content {
        flex-grow: 1;
    }

    .p-tablist-nav-button {
        all: unset;
        position: absolute !important;
        flex-shrink: 0;
        inset-block-start: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('tabs.nav.button.background');
        color: dt('tabs.nav.button.color');
        width: dt('tabs.nav.button.width');
        transition:
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        box-shadow: dt('tabs.nav.button.shadow');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-tablist-nav-button:focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.nav.button.focus.ring.shadow');
        outline: dt('tabs.nav.button.focus.ring.width') dt('tabs.nav.button.focus.ring.style') dt('tabs.nav.button.focus.ring.color');
        outline-offset: dt('tabs.nav.button.focus.ring.offset');
    }

    .p-tablist-nav-button:hover {
        color: dt('tabs.nav.button.hover.color');
    }

    .p-tablist-prev-button {
        inset-inline-start: 0;
    }

    .p-tablist-next-button {
        inset-inline-end: 0;
    }

    .p-tablist-prev-button:dir(rtl),
    .p-tablist-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-tab {
        flex-shrink: 0;
        cursor: pointer;
        user-select: none;
        position: relative;
        border-style: solid;
        white-space: nowrap;
        gap: dt('tabs.tab.gap');
        background: dt('tabs.tab.background');
        border-width: dt('tabs.tab.border.width');
        border-color: dt('tabs.tab.border.color');
        color: dt('tabs.tab.color');
        padding: dt('tabs.tab.padding');
        font-weight: dt('tabs.tab.font.weight');
        transition:
            background dt('tabs.transition.duration'),
            border-color dt('tabs.transition.duration'),
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        margin: dt('tabs.tab.margin');
        outline-color: transparent;
    }

    .p-tab:not(.p-disabled):focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.tab.focus.ring.shadow');
        outline: dt('tabs.tab.focus.ring.width') dt('tabs.tab.focus.ring.style') dt('tabs.tab.focus.ring.color');
        outline-offset: dt('tabs.tab.focus.ring.offset');
    }

    .p-tab:not(.p-tab-active):not(.p-disabled):hover {
        background: dt('tabs.tab.hover.background');
        border-color: dt('tabs.tab.hover.border.color');
        color: dt('tabs.tab.hover.color');
    }

    .p-tab-active {
        background: dt('tabs.tab.active.background');
        border-color: dt('tabs.tab.active.border.color');
        color: dt('tabs.tab.active.color');
    }

    .p-tabpanels {
        background: dt('tabs.tabpanel.background');
        color: dt('tabs.tabpanel.color');
        padding: dt('tabs.tabpanel.padding');
        outline: 0 none;
    }

    .p-tabpanel:focus-visible {
        box-shadow: dt('tabs.tabpanel.focus.ring.shadow');
        outline: dt('tabs.tabpanel.focus.ring.width') dt('tabs.tabpanel.focus.ring.style') dt('tabs.tabpanel.focus.ring.color');
        outline-offset: dt('tabs.tabpanel.focus.ring.offset');
    }

    .p-tablist-active-bar {
        z-index: 1;
        display: block;
        position: absolute;
        inset-block-end: dt('tabs.active.bar.bottom');
        height: dt('tabs.active.bar.height');
        background: dt('tabs.active.bar.background');
        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }
`, lt = {
  root: function(t) {
    var n = t.props;
    return ["p-tabs p-component", {
      "p-tabs-scrollable": n.scrollable
    }];
  }
}, dt = k.extend({
  name: "tabs",
  style: st,
  classes: lt
}), ut = {
  name: "BaseTabs",
  extends: v,
  props: {
    value: {
      type: [String, Number],
      default: void 0
    },
    lazy: {
      type: Boolean,
      default: !1
    },
    scrollable: {
      type: Boolean,
      default: !1
    },
    showNavigators: {
      type: Boolean,
      default: !0
    },
    tabindex: {
      type: Number,
      default: 0
    },
    selectOnFocus: {
      type: Boolean,
      default: !1
    }
  },
  style: dt,
  provide: function() {
    return {
      $pcTabs: this,
      $parentInstance: this
    };
  }
}, de = {
  name: "Tabs",
  extends: ut,
  inheritAttrs: !1,
  emits: ["update:value"],
  data: function() {
    return {
      d_value: this.value
    };
  },
  watch: {
    value: function(t) {
      this.d_value = t;
    }
  },
  methods: {
    updateValue: function(t) {
      this.d_value !== t && (this.d_value = t, this.$emit("update:value", t));
    },
    isVertical: function() {
      return this.orientation === "vertical";
    }
  }
};
function ct(e, t, n, r, o, i) {
  return l(), u("div", a({
    class: e.cx("root")
  }, e.ptmi("root")), [b(e.$slots, "default")], 16);
}
de.render = ct;
var mt = {
  root: "p-tablist",
  content: "p-tablist-content p-tablist-viewport",
  tabList: "p-tablist-tab-list",
  activeBar: "p-tablist-active-bar",
  prevButton: "p-tablist-prev-button p-tablist-nav-button",
  nextButton: "p-tablist-next-button p-tablist-nav-button"
}, bt = k.extend({
  name: "tablist",
  classes: mt
}), pt = {
  name: "BaseTabList",
  extends: v,
  props: {},
  style: bt,
  provide: function() {
    return {
      $pcTabList: this,
      $parentInstance: this
    };
  }
}, ue = {
  name: "TabList",
  extends: pt,
  inheritAttrs: !1,
  inject: ["$pcTabs"],
  data: function() {
    return {
      isPrevButtonEnabled: !1,
      isNextButtonEnabled: !0
    };
  },
  resizeObserver: void 0,
  watch: {
    showNavigators: function(t) {
      t ? this.bindResizeObserver() : this.unbindResizeObserver();
    },
    activeValue: {
      flush: "post",
      handler: function() {
        this.updateInkBar();
      }
    }
  },
  mounted: function() {
    var t = this;
    setTimeout(function() {
      t.updateInkBar();
    }, 150), this.showNavigators && (this.updateButtonState(), this.bindResizeObserver());
  },
  updated: function() {
    this.showNavigators && this.updateButtonState();
  },
  beforeUnmount: function() {
    this.unbindResizeObserver();
  },
  methods: {
    onScroll: function(t) {
      this.showNavigators && this.updateButtonState(), t.preventDefault();
    },
    onPrevButtonClick: function() {
      var t = this.$refs.content, n = this.getVisibleButtonWidths(), r = U(t) - n, o = Math.abs(t.scrollLeft), i = r * 0.8, d = o - i, c = Math.max(d, 0);
      t.scrollLeft = q(t) ? -1 * c : c;
    },
    onNextButtonClick: function() {
      var t = this.$refs.content, n = this.getVisibleButtonWidths(), r = U(t) - n, o = Math.abs(t.scrollLeft), i = r * 0.8, d = o + i, c = t.scrollWidth - r, s = Math.min(d, c);
      t.scrollLeft = q(t) ? -1 * s : s;
    },
    bindResizeObserver: function() {
      var t = this;
      this.resizeObserver = new ResizeObserver(function() {
        return t.updateButtonState();
      }), this.resizeObserver.observe(this.$refs.list);
    },
    unbindResizeObserver: function() {
      var t;
      (t = this.resizeObserver) === null || t === void 0 || t.unobserve(this.$refs.list), this.resizeObserver = void 0;
    },
    updateInkBar: function() {
      var t = this.$refs, n = t.content, r = t.inkbar, o = t.tabs;
      if (r) {
        var i = x(n, '[data-pc-name="tab"][data-p-active="true"]');
        this.$pcTabs.isVertical() ? (r.style.height = Ce(i) + "px", r.style.top = A(i).top - A(o).top + "px") : (r.style.width = Te(i) + "px", r.style.left = A(i).left - A(o).left + "px");
      }
    },
    updateButtonState: function() {
      var t = this.$refs, n = t.list, r = t.content, o = r.scrollTop, i = r.scrollWidth, d = r.scrollHeight, c = r.offsetWidth, s = r.offsetHeight, m = Math.abs(r.scrollLeft), f = [U(r), Pe(r)], y = f[0], w = f[1];
      this.$pcTabs.isVertical() ? (this.isPrevButtonEnabled = o !== 0, this.isNextButtonEnabled = n.offsetHeight >= s && parseInt(o) !== d - w) : (this.isPrevButtonEnabled = m !== 0, this.isNextButtonEnabled = n.offsetWidth >= c && parseInt(m) !== i - y);
    },
    getVisibleButtonWidths: function() {
      var t = this.$refs, n = t.prevButton, r = t.nextButton, o = 0;
      return this.showNavigators && (o = (n?.offsetWidth || 0) + (r?.offsetWidth || 0)), o;
    }
  },
  computed: {
    templates: function() {
      return this.$pcTabs.$slots;
    },
    activeValue: function() {
      return this.$pcTabs.d_value;
    },
    showNavigators: function() {
      return this.$pcTabs.showNavigators;
    },
    prevButtonAriaLabel: function() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.previous : void 0;
    },
    nextButtonAriaLabel: function() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.next : void 0;
    },
    dataP: function() {
      return V({
        scrollable: this.$pcTabs.scrollable
      });
    }
  },
  components: {
    ChevronLeftIcon: Ne,
    ChevronRightIcon: ae
  },
  directives: {
    ripple: M
  }
}, ft = ["data-p"], ht = ["aria-label", "tabindex"], gt = ["data-p"], vt = ["aria-orientation"], yt = ["aria-label", "tabindex"];
function It(e, t, n, r, o, i) {
  var d = R("ripple");
  return l(), u("div", a({
    ref: "list",
    class: e.cx("root"),
    "data-p": i.dataP
  }, e.ptmi("root")), [i.showNavigators && o.isPrevButtonEnabled ? L((l(), u("button", a({
    key: 0,
    ref: "prevButton",
    type: "button",
    class: e.cx("prevButton"),
    "aria-label": i.prevButtonAriaLabel,
    tabindex: i.$pcTabs.tabindex,
    onClick: t[0] || (t[0] = function() {
      return i.onPrevButtonClick && i.onPrevButtonClick.apply(i, arguments);
    })
  }, e.ptm("prevButton"), {
    "data-pc-group-section": "navigator"
  }), [(l(), g(I(i.templates.previcon || "ChevronLeftIcon"), a({
    "aria-hidden": "true"
  }, e.ptm("prevIcon")), null, 16))], 16, ht)), [[d]]) : p("", !0), h("div", a({
    ref: "content",
    class: e.cx("content"),
    onScroll: t[1] || (t[1] = function() {
      return i.onScroll && i.onScroll.apply(i, arguments);
    }),
    "data-p": i.dataP
  }, e.ptm("content")), [h("div", a({
    ref: "tabs",
    class: e.cx("tabList"),
    role: "tablist",
    "aria-orientation": i.$pcTabs.orientation || "horizontal"
  }, e.ptm("tabList")), [b(e.$slots, "default"), h("span", a({
    ref: "inkbar",
    class: e.cx("activeBar"),
    role: "presentation",
    "aria-hidden": "true"
  }, e.ptm("activeBar")), null, 16)], 16, vt)], 16, gt), i.showNavigators && o.isNextButtonEnabled ? L((l(), u("button", a({
    key: 1,
    ref: "nextButton",
    type: "button",
    class: e.cx("nextButton"),
    "aria-label": i.nextButtonAriaLabel,
    tabindex: i.$pcTabs.tabindex,
    onClick: t[2] || (t[2] = function() {
      return i.onNextButtonClick && i.onNextButtonClick.apply(i, arguments);
    })
  }, e.ptm("nextButton"), {
    "data-pc-group-section": "navigator"
  }), [(l(), g(I(i.templates.nexticon || "ChevronRightIcon"), a({
    "aria-hidden": "true"
  }, e.ptm("nextIcon")), null, 16))], 16, yt)), [[d]]) : p("", !0)], 16, ft);
}
ue.render = It;
var kt = {
  root: function(t) {
    var n = t.instance, r = t.props;
    return ["p-tab", {
      "p-tab-active": n.active,
      "p-disabled": r.disabled
    }];
  }
}, wt = k.extend({
  name: "tab",
  classes: kt
}), Lt = {
  name: "BaseTab",
  extends: v,
  props: {
    value: {
      type: [String, Number],
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    as: {
      type: [String, Object],
      default: "BUTTON"
    },
    asChild: {
      type: Boolean,
      default: !1
    }
  },
  style: wt,
  provide: function() {
    return {
      $pcTab: this,
      $parentInstance: this
    };
  }
}, ce = {
  name: "Tab",
  extends: Lt,
  inheritAttrs: !1,
  inject: ["$pcTabs", "$pcTabList"],
  methods: {
    onFocus: function() {
      this.$pcTabs.selectOnFocus && this.changeActiveValue();
    },
    onClick: function() {
      this.changeActiveValue();
    },
    onKeydown: function(t) {
      switch (t.code) {
        case "ArrowRight":
          this.onArrowRightKey(t);
          break;
        case "ArrowLeft":
          this.onArrowLeftKey(t);
          break;
        case "Home":
          this.onHomeKey(t);
          break;
        case "End":
          this.onEndKey(t);
          break;
        case "PageDown":
          this.onPageDownKey(t);
          break;
        case "PageUp":
          this.onPageUpKey(t);
          break;
        case "Enter":
        case "NumpadEnter":
        case "Space":
          this.onEnterKey(t);
          break;
      }
    },
    onArrowRightKey: function(t) {
      var n = this.findNextTab(t.currentTarget);
      n ? this.changeFocusedTab(t, n) : this.onHomeKey(t), t.preventDefault();
    },
    onArrowLeftKey: function(t) {
      var n = this.findPrevTab(t.currentTarget);
      n ? this.changeFocusedTab(t, n) : this.onEndKey(t), t.preventDefault();
    },
    onHomeKey: function(t) {
      var n = this.findFirstTab();
      this.changeFocusedTab(t, n), t.preventDefault();
    },
    onEndKey: function(t) {
      var n = this.findLastTab();
      this.changeFocusedTab(t, n), t.preventDefault();
    },
    onPageDownKey: function(t) {
      this.scrollInView(this.findLastTab()), t.preventDefault();
    },
    onPageUpKey: function(t) {
      this.scrollInView(this.findFirstTab()), t.preventDefault();
    },
    onEnterKey: function(t) {
      this.changeActiveValue();
    },
    findNextTab: function(t) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = n ? t : t.nextElementSibling;
      return r ? j(r, "data-p-disabled") || j(r, "data-pc-section") === "activebar" ? this.findNextTab(r) : x(r, '[data-pc-name="tab"]') : null;
    },
    findPrevTab: function(t) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = n ? t : t.previousElementSibling;
      return r ? j(r, "data-p-disabled") || j(r, "data-pc-section") === "activebar" ? this.findPrevTab(r) : x(r, '[data-pc-name="tab"]') : null;
    },
    findFirstTab: function() {
      return this.findNextTab(this.$pcTabList.$refs.tabs.firstElementChild, !0);
    },
    findLastTab: function() {
      return this.findPrevTab(this.$pcTabList.$refs.tabs.lastElementChild, !0);
    },
    changeActiveValue: function() {
      this.$pcTabs.updateValue(this.value);
    },
    changeFocusedTab: function(t, n) {
      P(n), this.scrollInView(n);
    },
    scrollInView: function(t) {
      var n;
      t == null || (n = t.scrollIntoView) === null || n === void 0 || n.call(t, {
        block: "nearest"
      });
    }
  },
  computed: {
    active: function() {
      var t;
      return ee((t = this.$pcTabs) === null || t === void 0 ? void 0 : t.d_value, this.value);
    },
    id: function() {
      var t;
      return "".concat((t = this.$pcTabs) === null || t === void 0 ? void 0 : t.$id, "_tab_").concat(this.value);
    },
    ariaControls: function() {
      var t;
      return "".concat((t = this.$pcTabs) === null || t === void 0 ? void 0 : t.$id, "_tabpanel_").concat(this.value);
    },
    attrs: function() {
      return a(this.asAttrs, this.a11yAttrs, this.ptmi("root", this.ptParams));
    },
    asAttrs: function() {
      return this.as === "BUTTON" ? {
        type: "button",
        disabled: this.disabled
      } : void 0;
    },
    a11yAttrs: function() {
      return {
        id: this.id,
        tabindex: this.active ? this.$pcTabs.tabindex : -1,
        role: "tab",
        "aria-selected": this.active,
        "aria-controls": this.ariaControls,
        "data-pc-name": "tab",
        "data-p-disabled": this.disabled,
        "data-p-active": this.active,
        onFocus: this.onFocus,
        onKeydown: this.onKeydown
      };
    },
    ptParams: function() {
      return {
        context: {
          active: this.active
        }
      };
    },
    dataP: function() {
      return V({
        active: this.active
      });
    }
  },
  directives: {
    ripple: M
  }
};
function Pt(e, t, n, r, o, i) {
  var d = R("ripple");
  return e.asChild ? b(e.$slots, "default", {
    key: 1,
    dataP: i.dataP,
    class: C(e.cx("root")),
    active: i.active,
    a11yAttrs: i.a11yAttrs,
    onClick: i.onClick
  }) : L((l(), g(I(e.as), a({
    key: 0,
    class: e.cx("root"),
    "data-p": i.dataP,
    onClick: i.onClick
  }, i.attrs), {
    default: K(function() {
      return [b(e.$slots, "default")];
    }),
    _: 3
  }, 16, ["class", "data-p", "onClick"])), [[d]]);
}
ce.render = Pt;
var Ct = {
  root: "p-tabpanels"
}, Tt = k.extend({
  name: "tabpanels",
  classes: Ct
}), $t = {
  name: "BaseTabPanels",
  extends: v,
  props: {},
  style: Tt,
  provide: function() {
    return {
      $pcTabPanels: this,
      $parentInstance: this
    };
  }
}, me = {
  name: "TabPanels",
  extends: $t,
  inheritAttrs: !1
};
function St(e, t, n, r, o, i) {
  return l(), u("div", a({
    class: e.cx("root"),
    role: "presentation"
  }, e.ptmi("root")), [b(e.$slots, "default")], 16);
}
me.render = St;
var Kt = {
  root: function(t) {
    var n = t.instance;
    return ["p-tabpanel", {
      "p-tabpanel-active": n.active
    }];
  }
}, Bt = k.extend({
  name: "tabpanel",
  classes: Kt
}), At = {
  name: "BaseTabPanel",
  extends: v,
  props: {
    // in Tabs
    value: {
      type: [String, Number],
      default: void 0
    },
    as: {
      type: [String, Object],
      default: "DIV"
    },
    asChild: {
      type: Boolean,
      default: !1
    },
    // in TabView
    header: null,
    headerStyle: null,
    headerClass: null,
    headerProps: null,
    headerActionProps: null,
    contentStyle: null,
    contentClass: null,
    contentProps: null,
    disabled: Boolean
  },
  style: Bt,
  provide: function() {
    return {
      $pcTabPanel: this,
      $parentInstance: this
    };
  }
}, be = {
  name: "TabPanel",
  extends: At,
  inheritAttrs: !1,
  inject: ["$pcTabs"],
  computed: {
    active: function() {
      var t;
      return ee((t = this.$pcTabs) === null || t === void 0 ? void 0 : t.d_value, this.value);
    },
    id: function() {
      var t;
      return "".concat((t = this.$pcTabs) === null || t === void 0 ? void 0 : t.$id, "_tabpanel_").concat(this.value);
    },
    ariaLabelledby: function() {
      var t;
      return "".concat((t = this.$pcTabs) === null || t === void 0 ? void 0 : t.$id, "_tab_").concat(this.value);
    },
    attrs: function() {
      return a(this.a11yAttrs, this.ptmi("root", this.ptParams));
    },
    a11yAttrs: function() {
      var t;
      return {
        id: this.id,
        tabindex: (t = this.$pcTabs) === null || t === void 0 ? void 0 : t.tabindex,
        role: "tabpanel",
        "aria-labelledby": this.ariaLabelledby,
        "data-pc-name": "tabpanel",
        "data-p-active": this.active
      };
    },
    ptParams: function() {
      return {
        context: {
          active: this.active
        }
      };
    }
  }
};
function xt(e, t, n, r, o, i) {
  var d, c;
  return i.$pcTabs ? (l(), u($, {
    key: 1
  }, [e.asChild ? b(e.$slots, "default", {
    key: 1,
    class: C(e.cx("root")),
    active: i.active,
    a11yAttrs: i.a11yAttrs
  }) : (l(), u($, {
    key: 0
  }, [!((d = i.$pcTabs) !== null && d !== void 0 && d.lazy) || i.active ? L((l(), g(I(e.as), a({
    key: 0,
    class: e.cx("root")
  }, i.attrs), {
    default: K(function() {
      return [b(e.$slots, "default")];
    }),
    _: 3
  }, 16, ["class"])), [[Z, (c = i.$pcTabs) !== null && c !== void 0 && c.lazy ? !0 : i.active]]) : p("", !0)], 64))], 64)) : b(e.$slots, "default", {
    key: 0
  });
}
be.render = xt;
var Ot = `
    .p-fieldset {
        background: dt('fieldset.background');
        border: 1px solid dt('fieldset.border.color');
        border-radius: dt('fieldset.border.radius');
        color: dt('fieldset.color');
        padding: dt('fieldset.padding');
        margin: 0;
    }

    .p-fieldset-legend {
        background: dt('fieldset.legend.background');
        border-radius: dt('fieldset.legend.border.radius');
        border-width: dt('fieldset.legend.border.width');
        border-style: solid;
        border-color: dt('fieldset.legend.border.color');
        color: dt('fieldset.legend.color');
        padding: dt('fieldset.legend.padding');
        transition:
            background dt('fieldset.transition.duration'),
            color dt('fieldset.transition.duration'),
            outline-color dt('fieldset.transition.duration'),
            box-shadow dt('fieldset.transition.duration');
    }

    .p-fieldset-toggleable > .p-fieldset-legend {
        padding: 0;
    }

    .p-fieldset-toggle-button {
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        text-decoration: none;
        display: flex;
        gap: dt('fieldset.legend.gap');
        align-items: center;
        justify-content: center;
        padding: dt('fieldset.legend.padding');
        background: transparent;
        border: 0 none;
        border-radius: dt('fieldset.legend.border.radius');
        transition:
            background dt('fieldset.transition.duration'),
            color dt('fieldset.transition.duration'),
            outline-color dt('fieldset.transition.duration'),
            box-shadow dt('fieldset.transition.duration');
        outline-color: transparent;
    }

    .p-fieldset-legend-label {
        font-weight: dt('fieldset.legend.font.weight');
    }

    .p-fieldset-toggle-button:focus-visible {
        box-shadow: dt('fieldset.legend.focus.ring.shadow');
        outline: dt('fieldset.legend.focus.ring.width') dt('fieldset.legend.focus.ring.style') dt('fieldset.legend.focus.ring.color');
        outline-offset: dt('fieldset.legend.focus.ring.offset');
    }

    .p-fieldset-toggleable > .p-fieldset-legend:hover {
        color: dt('fieldset.legend.hover.color');
        background: dt('fieldset.legend.hover.background');
    }

    .p-fieldset-toggle-icon {
        color: dt('fieldset.toggle.icon.color');
        transition: color dt('fieldset.transition.duration');
    }

    .p-fieldset-toggleable > .p-fieldset-legend:hover .p-fieldset-toggle-icon {
        color: dt('fieldset.toggle.icon.hover.color');
    }

    .p-fieldset-content-container {
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-fieldset-content-wrapper {
        min-height: 0;
    }

    .p-fieldset-content {
        padding: dt('fieldset.content.padding');
    }
`, Et = {
  root: function(t) {
    var n = t.props;
    return ["p-fieldset p-component", {
      "p-fieldset-toggleable": n.toggleable
    }];
  },
  legend: "p-fieldset-legend",
  legendLabel: "p-fieldset-legend-label",
  toggleButton: "p-fieldset-toggle-button",
  toggleIcon: "p-fieldset-toggle-icon",
  contentContainer: "p-fieldset-content-container",
  contentWrapper: "p-fieldset-content-wrapper",
  content: "p-fieldset-content"
}, Mt = k.extend({
  name: "fieldset",
  style: Ot,
  classes: Et
}), zt = {
  name: "BaseFieldset",
  extends: v,
  props: {
    legend: String,
    toggleable: Boolean,
    collapsed: Boolean,
    toggleButtonProps: {
      type: null,
      default: null
    }
  },
  style: Mt,
  provide: function() {
    return {
      $pcFieldset: this,
      $parentInstance: this
    };
  }
}, pe = {
  name: "Fieldset",
  extends: zt,
  inheritAttrs: !1,
  emits: ["update:collapsed", "toggle"],
  data: function() {
    return {
      d_collapsed: this.collapsed
    };
  },
  watch: {
    collapsed: function(t) {
      this.d_collapsed = t;
    }
  },
  methods: {
    toggle: function(t) {
      this.d_collapsed = !this.d_collapsed, this.$emit("update:collapsed", this.d_collapsed), this.$emit("toggle", {
        originalEvent: t,
        value: this.d_collapsed
      });
    },
    onKeyDown: function(t) {
      (t.code === "Enter" || t.code === "NumpadEnter" || t.code === "Space") && (this.toggle(t), t.preventDefault());
    }
  },
  computed: {
    buttonAriaLabel: function() {
      return this.toggleButtonProps && this.toggleButtonProps.ariaLabel ? this.toggleButtonProps.ariaLabel : this.legend;
    },
    dataP: function() {
      return V({
        toggleable: this.toggleable
      });
    }
  },
  directives: {
    ripple: M
  },
  components: {
    PlusIcon: oe,
    MinusIcon: re
  }
};
function z(e) {
  "@babel/helpers - typeof";
  return z = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, z(e);
}
function J(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Q(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? J(Object(n), !0).forEach(function(r) {
      Dt(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : J(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Dt(e, t, n) {
  return (t = Ft(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function Ft(e) {
  var t = Vt(e, "string");
  return z(t) == "symbol" ? t : t + "";
}
function Vt(e, t) {
  if (z(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (z(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Rt = ["data-p"], jt = ["data-p"], Nt = ["id"], Ht = ["id", "aria-controls", "aria-expanded", "aria-label"], Ut = ["id", "aria-labelledby"];
function Wt(e, t, n, r, o, i) {
  var d = R("ripple");
  return l(), u("fieldset", a({
    class: e.cx("root"),
    "data-p": i.dataP
  }, e.ptmi("root")), [h("legend", a({
    class: e.cx("legend"),
    "data-p": i.dataP
  }, e.ptm("legend")), [b(e.$slots, "legend", {
    toggleCallback: i.toggle
  }, function() {
    return [e.toggleable ? p("", !0) : (l(), u("span", a({
      key: 0,
      id: e.$id + "_header",
      class: e.cx("legendLabel")
    }, e.ptm("legendLabel")), E(e.legend), 17, Nt)), e.toggleable ? L((l(), u("button", a({
      key: 1,
      id: e.$id + "_header",
      type: "button",
      "aria-controls": e.$id + "_content",
      "aria-expanded": !o.d_collapsed,
      "aria-label": i.buttonAriaLabel,
      class: e.cx("toggleButton"),
      onClick: t[0] || (t[0] = function() {
        return i.toggle && i.toggle.apply(i, arguments);
      }),
      onKeydown: t[1] || (t[1] = function() {
        return i.onKeyDown && i.onKeyDown.apply(i, arguments);
      })
    }, Q(Q({}, e.toggleButtonProps), e.ptm("toggleButton"))), [b(e.$slots, e.$slots.toggleicon ? "toggleicon" : "togglericon", {
      collapsed: o.d_collapsed,
      class: C(e.cx("toggleIcon"))
    }, function() {
      return [(l(), g(I(o.d_collapsed ? "PlusIcon" : "MinusIcon"), a({
        class: e.cx("toggleIcon")
      }, e.ptm("toggleIcon")), null, 16, ["class"]))];
    }), h("span", a({
      class: e.cx("legendLabel")
    }, e.ptm("legendLabel")), E(e.legend), 17)], 16, Ht)), [[d]]) : p("", !0)];
  })], 16, jt), T(G, a({
    name: "p-collapsible"
  }, e.ptm("transition")), {
    default: K(function() {
      return [L(h("div", a({
        id: e.$id + "_content",
        class: e.cx("contentContainer"),
        role: "region",
        "aria-labelledby": e.$id + "_header"
      }, e.ptm("contentContainer")), [h("div", a({
        class: e.cx("contentWrapper")
      }, e.ptm("contentWrapper")), [h("div", a({
        class: e.cx("content")
      }, e.ptm("content")), [b(e.$slots, "default")], 16)], 16)], 16, Ut), [[Z, !o.d_collapsed]])];
    }),
    _: 3
  }, 16)], 16, Rt);
}
pe.render = Wt;
var fe = {
  name: "BarsIcon",
  extends: Re
};
function Gt(e) {
  return Jt(e) || Yt(e) || qt(e) || Zt();
}
function Zt() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function qt(e, t) {
  if (e) {
    if (typeof e == "string") return W(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? W(e, t) : void 0;
  }
}
function Yt(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Jt(e) {
  if (Array.isArray(e)) return W(e);
}
function W(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Qt(e, t, n, r, o, i) {
  return l(), u("svg", a({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, e.pti()), Gt(t[0] || (t[0] = [h("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M13.3226 3.6129H0.677419C0.497757 3.6129 0.325452 3.54152 0.198411 3.41448C0.0713707 3.28744 0 3.11514 0 2.93548C0 2.75581 0.0713707 2.58351 0.198411 2.45647C0.325452 2.32943 0.497757 2.25806 0.677419 2.25806H13.3226C13.5022 2.25806 13.6745 2.32943 13.8016 2.45647C13.9286 2.58351 14 2.75581 14 2.93548C14 3.11514 13.9286 3.28744 13.8016 3.41448C13.6745 3.54152 13.5022 3.6129 13.3226 3.6129ZM13.3226 7.67741H0.677419C0.497757 7.67741 0.325452 7.60604 0.198411 7.479C0.0713707 7.35196 0 7.17965 0 6.99999C0 6.82033 0.0713707 6.64802 0.198411 6.52098C0.325452 6.39394 0.497757 6.32257 0.677419 6.32257H13.3226C13.5022 6.32257 13.6745 6.39394 13.8016 6.52098C13.9286 6.64802 14 6.82033 14 6.99999C14 7.17965 13.9286 7.35196 13.8016 7.479C13.6745 7.60604 13.5022 7.67741 13.3226 7.67741ZM0.677419 11.7419H13.3226C13.5022 11.7419 13.6745 11.6706 13.8016 11.5435C13.9286 11.4165 14 11.2442 14 11.0645C14 10.8848 13.9286 10.7125 13.8016 10.5855C13.6745 10.4585 13.5022 10.3871 13.3226 10.3871H0.677419C0.497757 10.3871 0.325452 10.4585 0.198411 10.5855C0.0713707 10.7125 0 10.8848 0 11.0645C0 11.2442 0.0713707 11.4165 0.198411 11.5435C0.325452 11.6706 0.497757 11.7419 0.677419 11.7419Z",
    fill: "currentColor"
  }, null, -1)])), 16);
}
fe.render = Qt;
var Xt = `
    .p-menubar {
        display: flex;
        align-items: center;
        background: dt('menubar.background');
        border: 1px solid dt('menubar.border.color');
        border-radius: dt('menubar.border.radius');
        color: dt('menubar.color');
        padding: dt('menubar.padding');
        gap: dt('menubar.gap');
    }

    .p-menubar-start,
    .p-megamenu-end {
        display: flex;
        align-items: center;
    }

    .p-menubar-root-list,
    .p-menubar-submenu {
        display: flex;
        margin: 0;
        padding: 0;
        list-style: none;
        outline: 0 none;
    }

    .p-menubar-root-list {
        align-items: center;
        flex-wrap: wrap;
        gap: dt('menubar.gap');
    }

    .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content {
        border-radius: dt('menubar.base.item.border.radius');
    }

    .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content > .p-menubar-item-link {
        padding: dt('menubar.base.item.padding');
    }

    .p-menubar-item-content {
        transition:
            background dt('menubar.transition.duration'),
            color dt('menubar.transition.duration');
        border-radius: dt('menubar.item.border.radius');
        color: dt('menubar.item.color');
    }

    .p-menubar-item-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        color: inherit;
        padding: dt('menubar.item.padding');
        gap: dt('menubar.item.gap');
        user-select: none;
        outline: 0 none;
    }

    .p-menubar-item-label {
        line-height: 1;
    }

    .p-menubar-item-icon {
        color: dt('menubar.item.icon.color');
    }

    .p-menubar-submenu-icon {
        color: dt('menubar.submenu.icon.color');
        margin-left: auto;
        font-size: dt('menubar.submenu.icon.size');
        width: dt('menubar.submenu.icon.size');
        height: dt('menubar.submenu.icon.size');
    }

    .p-menubar-submenu .p-menubar-submenu-icon:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-menubar-item.p-focus > .p-menubar-item-content {
        color: dt('menubar.item.focus.color');
        background: dt('menubar.item.focus.background');
    }

    .p-menubar-item.p-focus > .p-menubar-item-content .p-menubar-item-icon {
        color: dt('menubar.item.icon.focus.color');
    }

    .p-menubar-item.p-focus > .p-menubar-item-content .p-menubar-submenu-icon {
        color: dt('menubar.submenu.icon.focus.color');
    }

    .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover {
        color: dt('menubar.item.focus.color');
        background: dt('menubar.item.focus.background');
    }

    .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover .p-menubar-item-icon {
        color: dt('menubar.item.icon.focus.color');
    }

    .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover .p-menubar-submenu-icon {
        color: dt('menubar.submenu.icon.focus.color');
    }

    .p-menubar-item-active > .p-menubar-item-content {
        color: dt('menubar.item.active.color');
        background: dt('menubar.item.active.background');
    }

    .p-menubar-item-active > .p-menubar-item-content .p-menubar-item-icon {
        color: dt('menubar.item.icon.active.color');
    }

    .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {
        color: dt('menubar.submenu.icon.active.color');
    }

    .p-menubar-submenu {
        display: none;
        position: absolute;
        min-width: 12.5rem;
        z-index: 1;
        background: dt('menubar.submenu.background');
        border: 1px solid dt('menubar.submenu.border.color');
        border-radius: dt('menubar.submenu.border.radius');
        box-shadow: dt('menubar.submenu.shadow');
        color: dt('menubar.submenu.color');
        flex-direction: column;
        padding: dt('menubar.submenu.padding');
        gap: dt('menubar.submenu.gap');
    }

    .p-menubar-submenu .p-menubar-separator {
        border-block-start: 1px solid dt('menubar.separator.border.color');
    }

    .p-menubar-submenu .p-menubar-item {
        position: relative;
    }

    .p-menubar-submenu > .p-menubar-item-active > .p-menubar-submenu {
        display: block;
        left: 100%;
        top: 0;
    }

    .p-menubar-end {
        margin-left: auto;
        align-self: center;
    }

    .p-menubar-end:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-menubar-button {
        display: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: dt('menubar.mobile.button.size');
        height: dt('menubar.mobile.button.size');
        position: relative;
        color: dt('menubar.mobile.button.color');
        border: 0 none;
        background: transparent;
        border-radius: dt('menubar.mobile.button.border.radius');
        transition:
            background dt('menubar.transition.duration'),
            color dt('menubar.transition.duration'),
            outline-color dt('menubar.transition.duration');
        outline-color: transparent;
    }

    .p-menubar-button:hover {
        color: dt('menubar.mobile.button.hover.color');
        background: dt('menubar.mobile.button.hover.background');
    }

    .p-menubar-button:focus-visible {
        box-shadow: dt('menubar.mobile.button.focus.ring.shadow');
        outline: dt('menubar.mobile.button.focus.ring.width') dt('menubar.mobile.button.focus.ring.style') dt('menubar.mobile.button.focus.ring.color');
        outline-offset: dt('menubar.mobile.button.focus.ring.offset');
    }

    .p-menubar-mobile {
        position: relative;
    }

    .p-menubar-mobile .p-menubar-button {
        display: flex;
    }

    .p-menubar-mobile .p-menubar-root-list {
        position: absolute;
        display: none;
        width: 100%;
        flex-direction: column;
        top: 100%;
        left: 0;
        z-index: 1;
        padding: dt('menubar.submenu.padding');
        background: dt('menubar.submenu.background');
        border: 1px solid dt('menubar.submenu.border.color');
        box-shadow: dt('menubar.submenu.shadow');
        border-radius: dt('menubar.submenu.border.radius');
        gap: dt('menubar.submenu.gap');
    }

    .p-menubar-mobile .p-menubar-root-list:dir(rtl) {
        left: auto;
        right: 0;
    }

    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content > .p-menubar-item-link {
        padding: dt('menubar.item.padding');
    }

    .p-menubar-mobile-active .p-menubar-root-list {
        display: flex;
    }

    .p-menubar-mobile .p-menubar-root-list .p-menubar-item {
        width: 100%;
        position: static;
    }

    .p-menubar-mobile .p-menubar-root-list .p-menubar-separator {
        border-block-start: 1px solid dt('menubar.separator.border.color');
    }

    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content .p-menubar-submenu-icon {
        margin-left: auto;
        transition: transform 0.2s;
    }

    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content .p-menubar-submenu-icon:dir(rtl),
    .p-menubar-mobile .p-menubar-submenu-icon:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {
        transform: rotate(-180deg);
    }

    .p-menubar-mobile .p-menubar-submenu .p-menubar-submenu-icon {
        transition: transform 0.2s;
        transform: rotate(90deg);
    }

    .p-menubar-mobile .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {
        transform: rotate(-90deg);
    }

    .p-menubar-mobile .p-menubar-submenu {
        width: 100%;
        position: static;
        box-shadow: none;
        border: 0 none;
        padding-inline-start: dt('menubar.submenu.mobile.indent');
        padding-inline-end: 0;
    }
`, _t = {
  submenu: function(t) {
    var n = t.instance, r = t.processedItem;
    return {
      display: n.isItemActive(r) ? "flex" : "none"
    };
  }
}, en = {
  root: function(t) {
    var n = t.instance;
    return ["p-menubar p-component", {
      "p-menubar-mobile": n.queryMatches,
      "p-menubar-mobile-active": n.mobileActive
    }];
  },
  start: "p-menubar-start",
  button: "p-menubar-button",
  rootList: "p-menubar-root-list",
  item: function(t) {
    var n = t.instance, r = t.processedItem;
    return ["p-menubar-item", {
      "p-menubar-item-active": n.isItemActive(r),
      "p-focus": n.isItemFocused(r),
      "p-disabled": n.isItemDisabled(r)
    }];
  },
  itemContent: "p-menubar-item-content",
  itemLink: "p-menubar-item-link",
  itemIcon: "p-menubar-item-icon",
  itemLabel: "p-menubar-item-label",
  submenuIcon: "p-menubar-submenu-icon",
  submenu: "p-menubar-submenu",
  separator: "p-menubar-separator",
  end: "p-menubar-end"
}, tn = k.extend({
  name: "menubar",
  style: Xt,
  classes: en,
  inlineStyles: _t
}), nn = {
  name: "BaseMenubar",
  extends: v,
  props: {
    model: {
      type: Array,
      default: null
    },
    buttonProps: {
      type: null,
      default: null
    },
    breakpoint: {
      type: String,
      default: "960px"
    },
    ariaLabelledby: {
      type: String,
      default: null
    },
    ariaLabel: {
      type: String,
      default: null
    }
  },
  style: tn,
  provide: function() {
    return {
      $pcMenubar: this,
      $parentInstance: this
    };
  }
}, he = {
  name: "MenubarSub",
  hostName: "Menubar",
  extends: v,
  emits: ["item-mouseenter", "item-click", "item-mousemove"],
  props: {
    items: {
      type: Array,
      default: null
    },
    root: {
      type: Boolean,
      default: !1
    },
    popup: {
      type: Boolean,
      default: !1
    },
    mobileActive: {
      type: Boolean,
      default: !1
    },
    templates: {
      type: Object,
      default: null
    },
    level: {
      type: Number,
      default: 0
    },
    menuId: {
      type: String,
      default: null
    },
    focusedItemId: {
      type: String,
      default: null
    },
    activeItemPath: {
      type: Object,
      default: null
    }
  },
  list: null,
  methods: {
    getItemId: function(t) {
      return "".concat(this.menuId, "_").concat(t.key);
    },
    getItemKey: function(t) {
      return this.getItemId(t);
    },
    getItemProp: function(t, n, r) {
      return t && t.item ? ne(t.item[n], r) : void 0;
    },
    getItemLabel: function(t) {
      return this.getItemProp(t, "label");
    },
    getItemLabelId: function(t) {
      return "".concat(this.menuId, "_").concat(t.key, "_label");
    },
    getPTOptions: function(t, n, r) {
      return this.ptm(r, {
        context: {
          item: t.item,
          index: n,
          active: this.isItemActive(t),
          focused: this.isItemFocused(t),
          disabled: this.isItemDisabled(t),
          level: this.level
        }
      });
    },
    isItemActive: function(t) {
      return this.activeItemPath.some(function(n) {
        return n.key === t.key;
      });
    },
    isItemVisible: function(t) {
      return this.getItemProp(t, "visible") !== !1;
    },
    isItemDisabled: function(t) {
      return this.getItemProp(t, "disabled");
    },
    isItemFocused: function(t) {
      return this.focusedItemId === this.getItemId(t);
    },
    isItemGroup: function(t) {
      return B(t.items);
    },
    onItemClick: function(t, n) {
      this.getItemProp(n, "command", {
        originalEvent: t,
        item: n.item
      }), this.$emit("item-click", {
        originalEvent: t,
        processedItem: n,
        isFocus: !0
      });
    },
    onItemMouseEnter: function(t, n) {
      this.$emit("item-mouseenter", {
        originalEvent: t,
        processedItem: n
      });
    },
    onItemMouseMove: function(t, n) {
      this.$emit("item-mousemove", {
        originalEvent: t,
        processedItem: n
      });
    },
    getAriaPosInset: function(t) {
      return t - this.calculateAriaSetSize.slice(0, t).length + 1;
    },
    getMenuItemProps: function(t, n) {
      return {
        action: a({
          class: this.cx("itemLink"),
          tabindex: -1
        }, this.getPTOptions(t, n, "itemLink")),
        icon: a({
          class: [this.cx("itemIcon"), this.getItemProp(t, "icon")]
        }, this.getPTOptions(t, n, "itemIcon")),
        label: a({
          class: this.cx("itemLabel")
        }, this.getPTOptions(t, n, "itemLabel")),
        submenuicon: a({
          class: this.cx("submenuIcon")
        }, this.getPTOptions(t, n, "submenuIcon"))
      };
    }
  },
  computed: {
    calculateAriaSetSize: function() {
      var t = this;
      return this.items.filter(function(n) {
        return t.isItemVisible(n) && t.getItemProp(n, "separator");
      });
    },
    getAriaSetSize: function() {
      var t = this;
      return this.items.filter(function(n) {
        return t.isItemVisible(n) && !t.getItemProp(n, "separator");
      }).length;
    }
  },
  components: {
    AngleRightIcon: Ue,
    AngleDownIcon: He
  },
  directives: {
    ripple: M
  }
}, rn = ["id", "aria-label", "aria-disabled", "aria-expanded", "aria-haspopup", "aria-setsize", "aria-posinset", "data-p-active", "data-p-focused", "data-p-disabled"], on = ["onClick", "onMouseenter", "onMousemove"], an = ["href", "target"], sn = ["id"], ln = ["id"];
function dn(e, t, n, r, o, i) {
  var d = S("MenubarSub", !0), c = R("ripple");
  return l(), u("ul", a({
    class: n.level === 0 ? e.cx("rootList") : e.cx("submenu")
  }, n.level === 0 ? e.ptm("rootList") : e.ptm("submenu")), [(l(!0), u($, null, ie(n.items, function(s, m) {
    return l(), u($, {
      key: i.getItemKey(s)
    }, [i.isItemVisible(s) && !i.getItemProp(s, "separator") ? (l(), u("li", a({
      key: 0,
      id: i.getItemId(s),
      style: i.getItemProp(s, "style"),
      class: [e.cx("item", {
        processedItem: s
      }), i.getItemProp(s, "class")],
      role: "menuitem",
      "aria-label": i.getItemLabel(s),
      "aria-disabled": i.isItemDisabled(s) || void 0,
      "aria-expanded": i.isItemGroup(s) ? i.isItemActive(s) : void 0,
      "aria-haspopup": i.isItemGroup(s) && !i.getItemProp(s, "to") ? "menu" : void 0,
      "aria-setsize": i.getAriaSetSize,
      "aria-posinset": i.getAriaPosInset(m)
    }, {
      ref_for: !0
    }, i.getPTOptions(s, m, "item"), {
      "data-p-active": i.isItemActive(s),
      "data-p-focused": i.isItemFocused(s),
      "data-p-disabled": i.isItemDisabled(s)
    }), [h("div", a({
      class: e.cx("itemContent"),
      onClick: function(y) {
        return i.onItemClick(y, s);
      },
      onMouseenter: function(y) {
        return i.onItemMouseEnter(y, s);
      },
      onMousemove: function(y) {
        return i.onItemMouseMove(y, s);
      }
    }, {
      ref_for: !0
    }, i.getPTOptions(s, m, "itemContent")), [n.templates.item ? (l(), g(I(n.templates.item), {
      key: 1,
      item: s.item,
      root: n.root,
      hasSubmenu: i.getItemProp(s, "items"),
      label: i.getItemLabel(s),
      props: i.getMenuItemProps(s, m)
    }, null, 8, ["item", "root", "hasSubmenu", "label", "props"])) : L((l(), u("a", a({
      key: 0,
      href: i.getItemProp(s, "url"),
      class: e.cx("itemLink"),
      target: i.getItemProp(s, "target"),
      tabindex: "-1"
    }, {
      ref_for: !0
    }, i.getPTOptions(s, m, "itemLink")), [n.templates.itemicon ? (l(), g(I(n.templates.itemicon), {
      key: 0,
      item: s.item,
      class: C(e.cx("itemIcon"))
    }, null, 8, ["item", "class"])) : i.getItemProp(s, "icon") ? (l(), u("span", a({
      key: 1,
      class: [e.cx("itemIcon"), i.getItemProp(s, "icon")]
    }, {
      ref_for: !0
    }, i.getPTOptions(s, m, "itemIcon")), null, 16)) : p("", !0), h("span", a({
      id: i.getItemLabelId(s),
      class: e.cx("itemLabel")
    }, {
      ref_for: !0
    }, i.getPTOptions(s, m, "itemLabel")), E(i.getItemLabel(s)), 17, sn), i.getItemProp(s, "items") ? (l(), u($, {
      key: 2
    }, [n.templates.submenuicon ? (l(), g(I(n.templates.submenuicon), {
      key: 0,
      root: n.root,
      active: i.isItemActive(s),
      class: C(e.cx("submenuIcon"))
    }, null, 8, ["root", "active", "class"])) : (l(), g(I(n.root ? "AngleDownIcon" : "AngleRightIcon"), a({
      key: 1,
      class: e.cx("submenuIcon")
    }, {
      ref_for: !0
    }, i.getPTOptions(s, m, "submenuIcon")), null, 16, ["class"]))], 64)) : p("", !0)], 16, an)), [[c]])], 16, on), i.isItemVisible(s) && i.isItemGroup(s) ? (l(), g(d, {
      key: 0,
      id: i.getItemId(s) + "_list",
      menuId: n.menuId,
      role: "menu",
      style: Ee(e.sx("submenu", !0, {
        processedItem: s
      })),
      focusedItemId: n.focusedItemId,
      items: s.items,
      mobileActive: n.mobileActive,
      activeItemPath: n.activeItemPath,
      templates: n.templates,
      level: n.level + 1,
      "aria-labelledby": i.getItemLabelId(s),
      pt: e.pt,
      unstyled: e.unstyled,
      onItemClick: t[0] || (t[0] = function(f) {
        return e.$emit("item-click", f);
      }),
      onItemMouseenter: t[1] || (t[1] = function(f) {
        return e.$emit("item-mouseenter", f);
      }),
      onItemMousemove: t[2] || (t[2] = function(f) {
        return e.$emit("item-mousemove", f);
      })
    }, null, 8, ["id", "menuId", "style", "focusedItemId", "items", "mobileActive", "activeItemPath", "templates", "level", "aria-labelledby", "pt", "unstyled"])) : p("", !0)], 16, rn)) : p("", !0), i.isItemVisible(s) && i.getItemProp(s, "separator") ? (l(), u("li", a({
      key: 1,
      id: i.getItemId(s),
      class: [e.cx("separator"), i.getItemProp(s, "class")],
      style: i.getItemProp(s, "style"),
      role: "separator"
    }, {
      ref_for: !0
    }, e.ptm("separator")), null, 16, ln)) : p("", !0)], 64);
  }), 128))], 16);
}
he.render = dn;
var ge = {
  name: "Menubar",
  extends: nn,
  inheritAttrs: !1,
  emits: ["focus", "blur"],
  matchMediaListener: null,
  data: function() {
    return {
      mobileActive: !1,
      focused: !1,
      focusedItemInfo: {
        index: -1,
        level: 0,
        parentKey: ""
      },
      activeItemPath: [],
      dirty: !1,
      query: null,
      queryMatches: !1
    };
  },
  watch: {
    activeItemPath: function(t) {
      B(t) ? (this.bindOutsideClickListener(), this.bindResizeListener()) : (this.unbindOutsideClickListener(), this.unbindResizeListener());
    }
  },
  outsideClickListener: null,
  container: null,
  menubar: null,
  mounted: function() {
    this.bindMatchMediaListener();
  },
  beforeUnmount: function() {
    this.mobileActive = !1, this.unbindOutsideClickListener(), this.unbindResizeListener(), this.unbindMatchMediaListener(), this.container && O.clear(this.container), this.container = null;
  },
  methods: {
    getItemProp: function(t, n) {
      return t ? ne(t[n]) : void 0;
    },
    getItemLabel: function(t) {
      return this.getItemProp(t, "label");
    },
    isItemDisabled: function(t) {
      return this.getItemProp(t, "disabled");
    },
    isItemVisible: function(t) {
      return this.getItemProp(t, "visible") !== !1;
    },
    isItemGroup: function(t) {
      return B(this.getItemProp(t, "items"));
    },
    isItemSeparator: function(t) {
      return this.getItemProp(t, "separator");
    },
    getProccessedItemLabel: function(t) {
      return t ? this.getItemLabel(t.item) : void 0;
    },
    isProccessedItemGroup: function(t) {
      return t && B(t.items);
    },
    toggle: function(t) {
      var n = this;
      this.mobileActive ? (this.mobileActive = !1, O.clear(this.menubar), this.hide()) : (this.mobileActive = !0, O.set("menu", this.menubar, this.$primevue.config.zIndex.menu), setTimeout(function() {
        n.show();
      }, 1)), this.bindOutsideClickListener(), t.preventDefault();
    },
    show: function() {
      P(this.menubar);
    },
    hide: function(t, n) {
      var r = this;
      this.mobileActive && (this.mobileActive = !1, setTimeout(function() {
        P(r.$refs.menubutton);
      }, 0)), this.activeItemPath = [], this.focusedItemInfo = {
        index: -1,
        level: 0,
        parentKey: ""
      }, n && P(this.menubar), this.dirty = !1;
    },
    onFocus: function(t) {
      this.focused = !0, this.focusedItemInfo = this.focusedItemInfo.index !== -1 ? this.focusedItemInfo : {
        index: this.findFirstFocusedItemIndex(),
        level: 0,
        parentKey: ""
      }, this.$emit("focus", t);
    },
    onBlur: function(t) {
      this.focused = !1, this.focusedItemInfo = {
        index: -1,
        level: 0,
        parentKey: ""
      }, this.searchValue = "", this.dirty = !1, this.$emit("blur", t);
    },
    onKeyDown: function(t) {
      var n = t.metaKey || t.ctrlKey;
      switch (t.code) {
        case "ArrowDown":
          this.onArrowDownKey(t);
          break;
        case "ArrowUp":
          this.onArrowUpKey(t);
          break;
        case "ArrowLeft":
          this.onArrowLeftKey(t);
          break;
        case "ArrowRight":
          this.onArrowRightKey(t);
          break;
        case "Home":
          this.onHomeKey(t);
          break;
        case "End":
          this.onEndKey(t);
          break;
        case "Space":
          this.onSpaceKey(t);
          break;
        case "Enter":
        case "NumpadEnter":
          this.onEnterKey(t);
          break;
        case "Escape":
          this.onEscapeKey(t);
          break;
        case "Tab":
          this.onTabKey(t);
          break;
        case "PageDown":
        case "PageUp":
        case "Backspace":
        case "ShiftLeft":
        case "ShiftRight":
          break;
        default:
          !n && $e(t.key) && this.searchItems(t, t.key);
          break;
      }
    },
    onItemChange: function(t, n) {
      var r = t.processedItem, o = t.isFocus;
      if (!N(r)) {
        var i = r.index, d = r.key, c = r.level, s = r.parentKey, m = r.items, f = B(m), y = this.activeItemPath.filter(function(w) {
          return w.parentKey !== s && w.parentKey !== d;
        });
        f && y.push(r), this.focusedItemInfo = {
          index: i,
          level: c,
          parentKey: s
        }, f && (this.dirty = !0), o && P(this.menubar), !(n === "hover" && this.queryMatches) && (this.activeItemPath = y);
      }
    },
    onItemClick: function(t) {
      var n = t.originalEvent, r = t.processedItem, o = this.isProccessedItemGroup(r), i = N(r.parent), d = this.isSelected(r);
      if (d) {
        var c = r.index, s = r.key, m = r.level, f = r.parentKey;
        this.activeItemPath = this.activeItemPath.filter(function(w) {
          return s !== w.key && s.startsWith(w.key);
        }), this.focusedItemInfo = {
          index: c,
          level: m,
          parentKey: f
        }, this.dirty = !i, P(this.menubar);
      } else if (o)
        this.onItemChange(t);
      else {
        var y = i ? r : this.activeItemPath.find(function(w) {
          return w.parentKey === "";
        });
        this.hide(n), this.changeFocusedItemIndex(n, y ? y.index : -1), this.mobileActive = !1, P(this.menubar);
      }
    },
    onItemMouseEnter: function(t) {
      this.dirty && this.onItemChange(t, "hover");
    },
    onItemMouseMove: function(t) {
      this.focused && this.changeFocusedItemIndex(t, t.processedItem.index);
    },
    menuButtonClick: function(t) {
      this.toggle(t);
    },
    menuButtonKeydown: function(t) {
      (t.code === "Enter" || t.code === "NumpadEnter" || t.code === "Space") && this.menuButtonClick(t);
    },
    onArrowDownKey: function(t) {
      var n = this.visibleItems[this.focusedItemInfo.index], r = n ? N(n.parent) : null;
      if (r) {
        var o = this.isProccessedItemGroup(n);
        o && (this.onItemChange({
          originalEvent: t,
          processedItem: n
        }), this.focusedItemInfo = {
          index: -1,
          parentKey: n.key
        }, this.onArrowRightKey(t));
      } else {
        var i = this.focusedItemInfo.index !== -1 ? this.findNextItemIndex(this.focusedItemInfo.index) : this.findFirstFocusedItemIndex();
        this.changeFocusedItemIndex(t, i);
      }
      t.preventDefault();
    },
    onArrowUpKey: function(t) {
      var n = this, r = this.visibleItems[this.focusedItemInfo.index], o = N(r.parent);
      if (o) {
        var i = this.isProccessedItemGroup(r);
        if (i) {
          this.onItemChange({
            originalEvent: t,
            processedItem: r
          }), this.focusedItemInfo = {
            index: -1,
            parentKey: r.key
          };
          var d = this.findLastItemIndex();
          this.changeFocusedItemIndex(t, d);
        }
      } else {
        var c = this.activeItemPath.find(function(m) {
          return m.key === r.parentKey;
        });
        if (this.focusedItemInfo.index === 0)
          this.focusedItemInfo = {
            index: -1,
            parentKey: c ? c.parentKey : ""
          }, this.searchValue = "", this.onArrowLeftKey(t), this.activeItemPath = this.activeItemPath.filter(function(m) {
            return m.parentKey !== n.focusedItemInfo.parentKey;
          });
        else {
          var s = this.focusedItemInfo.index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo.index) : this.findLastFocusedItemIndex();
          this.changeFocusedItemIndex(t, s);
        }
      }
      t.preventDefault();
    },
    onArrowLeftKey: function(t) {
      var n = this, r = this.visibleItems[this.focusedItemInfo.index], o = r ? this.activeItemPath.find(function(d) {
        return d.key === r.parentKey;
      }) : null;
      if (o)
        this.onItemChange({
          originalEvent: t,
          processedItem: o
        }), this.activeItemPath = this.activeItemPath.filter(function(d) {
          return d.parentKey !== n.focusedItemInfo.parentKey;
        }), t.preventDefault();
      else {
        var i = this.focusedItemInfo.index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo.index) : this.findLastFocusedItemIndex();
        this.changeFocusedItemIndex(t, i), t.preventDefault();
      }
    },
    onArrowRightKey: function(t) {
      var n = this.visibleItems[this.focusedItemInfo.index], r = n ? this.activeItemPath.find(function(d) {
        return d.key === n.parentKey;
      }) : null;
      if (r) {
        var o = this.isProccessedItemGroup(n);
        o && (this.onItemChange({
          originalEvent: t,
          processedItem: n
        }), this.focusedItemInfo = {
          index: -1,
          parentKey: n.key
        }, this.onArrowDownKey(t));
      } else {
        var i = this.focusedItemInfo.index !== -1 ? this.findNextItemIndex(this.focusedItemInfo.index) : this.findFirstFocusedItemIndex();
        this.changeFocusedItemIndex(t, i), t.preventDefault();
      }
    },
    onHomeKey: function(t) {
      this.changeFocusedItemIndex(t, this.findFirstItemIndex()), t.preventDefault();
    },
    onEndKey: function(t) {
      this.changeFocusedItemIndex(t, this.findLastItemIndex()), t.preventDefault();
    },
    onEnterKey: function(t) {
      if (this.focusedItemInfo.index !== -1) {
        var n = x(this.menubar, 'li[id="'.concat("".concat(this.focusedItemId), '"]')), r = n && x(n, 'a[data-pc-section="itemlink"]');
        r ? r.click() : n && n.click();
        var o = this.visibleItems[this.focusedItemInfo.index], i = this.isProccessedItemGroup(o);
        !i && (this.focusedItemInfo.index = this.findFirstFocusedItemIndex());
      }
      t.preventDefault();
    },
    onSpaceKey: function(t) {
      this.onEnterKey(t);
    },
    onEscapeKey: function(t) {
      if (this.focusedItemInfo.level !== 0) {
        var n = this.focusedItemInfo;
        this.hide(t, !1), this.focusedItemInfo = {
          index: Number(n.parentKey.split("_")[0]),
          level: 0,
          parentKey: ""
        };
      }
      t.preventDefault();
    },
    onTabKey: function(t) {
      if (this.focusedItemInfo.index !== -1) {
        var n = this.visibleItems[this.focusedItemInfo.index], r = this.isProccessedItemGroup(n);
        !r && this.onItemChange({
          originalEvent: t,
          processedItem: n
        });
      }
      this.hide();
    },
    bindOutsideClickListener: function() {
      var t = this;
      this.outsideClickListener || (this.outsideClickListener = function(n) {
        var r = t.container && !t.container.contains(n.target), o = !(t.target && (t.target === n.target || t.target.contains(n.target)));
        r && o && t.hide();
      }, document.addEventListener("click", this.outsideClickListener, !0));
    },
    unbindOutsideClickListener: function() {
      this.outsideClickListener && (document.removeEventListener("click", this.outsideClickListener, !0), this.outsideClickListener = null);
    },
    bindResizeListener: function() {
      var t = this;
      this.resizeListener || (this.resizeListener = function(n) {
        te() || t.hide(n, !0), t.mobileActive = !1;
      }, window.addEventListener("resize", this.resizeListener));
    },
    unbindResizeListener: function() {
      this.resizeListener && (window.removeEventListener("resize", this.resizeListener), this.resizeListener = null);
    },
    bindMatchMediaListener: function() {
      var t = this;
      if (!this.matchMediaListener) {
        var n = matchMedia("(max-width: ".concat(this.breakpoint, ")"));
        this.query = n, this.queryMatches = n.matches, this.matchMediaListener = function() {
          t.queryMatches = n.matches, t.mobileActive = !1;
        }, this.query.addEventListener("change", this.matchMediaListener);
      }
    },
    unbindMatchMediaListener: function() {
      this.matchMediaListener && (this.query.removeEventListener("change", this.matchMediaListener), this.matchMediaListener = null);
    },
    isItemMatched: function(t) {
      var n;
      return this.isValidItem(t) && ((n = this.getProccessedItemLabel(t)) === null || n === void 0 ? void 0 : n.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase()));
    },
    isValidItem: function(t) {
      return !!t && !this.isItemDisabled(t.item) && !this.isItemSeparator(t.item) && this.isItemVisible(t.item);
    },
    isValidSelectedItem: function(t) {
      return this.isValidItem(t) && this.isSelected(t);
    },
    isSelected: function(t) {
      return this.activeItemPath.some(function(n) {
        return n.key === t.key;
      });
    },
    findFirstItemIndex: function() {
      var t = this;
      return this.visibleItems.findIndex(function(n) {
        return t.isValidItem(n);
      });
    },
    findLastItemIndex: function() {
      var t = this;
      return Y(this.visibleItems, function(n) {
        return t.isValidItem(n);
      });
    },
    findNextItemIndex: function(t) {
      var n = this, r = t < this.visibleItems.length - 1 ? this.visibleItems.slice(t + 1).findIndex(function(o) {
        return n.isValidItem(o);
      }) : -1;
      return r > -1 ? r + t + 1 : t;
    },
    findPrevItemIndex: function(t) {
      var n = this, r = t > 0 ? Y(this.visibleItems.slice(0, t), function(o) {
        return n.isValidItem(o);
      }) : -1;
      return r > -1 ? r : t;
    },
    findSelectedItemIndex: function() {
      var t = this;
      return this.visibleItems.findIndex(function(n) {
        return t.isValidSelectedItem(n);
      });
    },
    findFirstFocusedItemIndex: function() {
      var t = this.findSelectedItemIndex();
      return t < 0 ? this.findFirstItemIndex() : t;
    },
    findLastFocusedItemIndex: function() {
      var t = this.findSelectedItemIndex();
      return t < 0 ? this.findLastItemIndex() : t;
    },
    searchItems: function(t, n) {
      var r = this;
      this.searchValue = (this.searchValue || "") + n;
      var o = -1, i = !1;
      return this.focusedItemInfo.index !== -1 ? (o = this.visibleItems.slice(this.focusedItemInfo.index).findIndex(function(d) {
        return r.isItemMatched(d);
      }), o = o === -1 ? this.visibleItems.slice(0, this.focusedItemInfo.index).findIndex(function(d) {
        return r.isItemMatched(d);
      }) : o + this.focusedItemInfo.index) : o = this.visibleItems.findIndex(function(d) {
        return r.isItemMatched(d);
      }), o !== -1 && (i = !0), o === -1 && this.focusedItemInfo.index === -1 && (o = this.findFirstFocusedItemIndex()), o !== -1 && this.changeFocusedItemIndex(t, o), this.searchTimeout && clearTimeout(this.searchTimeout), this.searchTimeout = setTimeout(function() {
        r.searchValue = "", r.searchTimeout = null;
      }, 500), i;
    },
    changeFocusedItemIndex: function(t, n) {
      this.focusedItemInfo.index !== n && (this.focusedItemInfo.index = n, this.scrollInView());
    },
    scrollInView: function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1, n = t !== -1 ? "".concat(this.$id, "_").concat(t) : this.focusedItemId, r = x(this.menubar, 'li[id="'.concat(n, '"]'));
      r && r.scrollIntoView && r.scrollIntoView({
        block: "nearest",
        inline: "start"
      });
    },
    createProcessedItems: function(t) {
      var n = this, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "", d = [];
      return t && t.forEach(function(c, s) {
        var m = (i !== "" ? i + "_" : "") + s, f = {
          item: c,
          index: s,
          level: r,
          key: m,
          parent: o,
          parentKey: i
        };
        f.items = n.createProcessedItems(c.items, r + 1, f, m), d.push(f);
      }), d;
    },
    containerRef: function(t) {
      this.container = t;
    },
    menubarRef: function(t) {
      this.menubar = t ? t.$el : void 0;
    }
  },
  computed: {
    processedItems: function() {
      return this.createProcessedItems(this.model || []);
    },
    visibleItems: function() {
      var t = this, n = this.activeItemPath.find(function(r) {
        return r.key === t.focusedItemInfo.parentKey;
      });
      return n ? n.items : this.processedItems;
    },
    focusedItemId: function() {
      return this.focusedItemInfo.index !== -1 ? "".concat(this.$id).concat(B(this.focusedItemInfo.parentKey) ? "_" + this.focusedItemInfo.parentKey : "", "_").concat(this.focusedItemInfo.index) : null;
    }
  },
  components: {
    MenubarSub: he,
    BarsIcon: fe
  }
};
function D(e) {
  "@babel/helpers - typeof";
  return D = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, D(e);
}
function X(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function _(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? X(Object(n), !0).forEach(function(r) {
      un(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : X(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function un(e, t, n) {
  return (t = cn(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function cn(e) {
  var t = mn(e, "string");
  return D(t) == "symbol" ? t : t + "";
}
function mn(e, t) {
  if (D(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (D(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var bn = ["aria-haspopup", "aria-expanded", "aria-controls", "aria-label"];
function pn(e, t, n, r, o, i) {
  var d = S("BarsIcon"), c = S("MenubarSub");
  return l(), u("div", a({
    ref: i.containerRef,
    class: e.cx("root")
  }, e.ptmi("root")), [e.$slots.start ? (l(), u("div", a({
    key: 0,
    class: e.cx("start")
  }, e.ptm("start")), [b(e.$slots, "start")], 16)) : p("", !0), b(e.$slots, e.$slots.button ? "button" : "menubutton", {
    id: e.$id,
    class: C(e.cx("button")),
    toggleCallback: function(m) {
      return i.menuButtonClick(m);
    }
  }, function() {
    var s;
    return [e.model && e.model.length > 0 ? (l(), u("a", a({
      key: 0,
      ref: "menubutton",
      role: "button",
      tabindex: "0",
      class: e.cx("button"),
      "aria-haspopup": !!(e.model.length && e.model.length > 0),
      "aria-expanded": o.mobileActive,
      "aria-controls": e.$id,
      "aria-label": (s = e.$primevue.config.locale.aria) === null || s === void 0 ? void 0 : s.navigation,
      onClick: t[0] || (t[0] = function(m) {
        return i.menuButtonClick(m);
      }),
      onKeydown: t[1] || (t[1] = function(m) {
        return i.menuButtonKeydown(m);
      })
    }, _(_({}, e.buttonProps), e.ptm("button"))), [b(e.$slots, e.$slots.buttonicon ? "buttonicon" : "menubuttonicon", {}, function() {
      return [T(d, Me(ze(e.ptm("buttonicon"))), null, 16)];
    })], 16, bn)) : p("", !0)];
  }), T(c, {
    ref: i.menubarRef,
    id: e.$id + "_list",
    role: "menubar",
    items: i.processedItems,
    templates: e.$slots,
    root: !0,
    mobileActive: o.mobileActive,
    tabindex: "0",
    "aria-activedescendant": o.focused ? i.focusedItemId : void 0,
    menuId: e.$id,
    focusedItemId: o.focused ? i.focusedItemId : void 0,
    activeItemPath: o.activeItemPath,
    level: 0,
    "aria-labelledby": e.ariaLabelledby,
    "aria-label": e.ariaLabel,
    pt: e.pt,
    unstyled: e.unstyled,
    onFocus: i.onFocus,
    onBlur: i.onBlur,
    onKeydown: i.onKeyDown,
    onItemClick: i.onItemClick,
    onItemMouseenter: i.onItemMouseEnter,
    onItemMousemove: i.onItemMouseMove
  }, null, 8, ["id", "items", "templates", "mobileActive", "aria-activedescendant", "menuId", "focusedItemId", "activeItemPath", "aria-labelledby", "aria-label", "pt", "unstyled", "onFocus", "onBlur", "onKeydown", "onItemClick", "onItemMouseenter", "onItemMousemove"]), e.$slots.end ? (l(), u("div", a({
    key: 1,
    class: e.cx("end")
  }, e.ptm("end")), [b(e.$slots, "end")], 16)) : p("", !0)], 16);
}
ge.render = pn;
var fn = `
    .p-breadcrumb {
        background: dt('breadcrumb.background');
        padding: dt('breadcrumb.padding');
        overflow-x: auto;
    }

    .p-breadcrumb-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        gap: dt('breadcrumb.gap');
    }

    .p-breadcrumb-separator {
        display: flex;
        align-items: center;
        color: dt('breadcrumb.separator.color');
    }

    .p-breadcrumb-separator-icon:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-breadcrumb::-webkit-scrollbar {
        display: none;
    }

    .p-breadcrumb-item-link {
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: dt('breadcrumb.item.gap');
        transition:
            background dt('breadcrumb.transition.duration'),
            color dt('breadcrumb.transition.duration'),
            outline-color dt('breadcrumb.transition.duration'),
            box-shadow dt('breadcrumb.transition.duration');
        border-radius: dt('breadcrumb.item.border.radius');
        outline-color: transparent;
        color: dt('breadcrumb.item.color');
    }

    .p-breadcrumb-item-link:focus-visible {
        box-shadow: dt('breadcrumb.item.focus.ring.shadow');
        outline: dt('breadcrumb.item.focus.ring.width') dt('breadcrumb.item.focus.ring.style') dt('breadcrumb.item.focus.ring.color');
        outline-offset: dt('breadcrumb.item.focus.ring.offset');
    }

    .p-breadcrumb-item-link:hover .p-breadcrumb-item-label {
        color: dt('breadcrumb.item.hover.color');
    }

    .p-breadcrumb-item-label {
        transition: inherit;
    }

    .p-breadcrumb-item-icon {
        color: dt('breadcrumb.item.icon.color');
        transition: inherit;
    }

    .p-breadcrumb-item-link:hover .p-breadcrumb-item-icon {
        color: dt('breadcrumb.item.icon.hover.color');
    }
`, hn = {
  root: "p-breadcrumb p-component",
  list: "p-breadcrumb-list",
  homeItem: "p-breadcrumb-home-item",
  separator: "p-breadcrumb-separator",
  separatorIcon: "p-breadcrumb-separator-icon",
  item: function(t) {
    var n = t.instance;
    return ["p-breadcrumb-item", {
      "p-disabled": n.disabled()
    }];
  },
  itemLink: "p-breadcrumb-item-link",
  itemIcon: "p-breadcrumb-item-icon",
  itemLabel: "p-breadcrumb-item-label"
}, gn = k.extend({
  name: "breadcrumb",
  style: fn,
  classes: hn
}), vn = {
  name: "BaseBreadcrumb",
  extends: v,
  props: {
    model: {
      type: Array,
      default: null
    },
    home: {
      type: null,
      default: null
    }
  },
  style: gn,
  provide: function() {
    return {
      $pcBreadcrumb: this,
      $parentInstance: this
    };
  }
}, ve = {
  name: "BreadcrumbItem",
  hostName: "Breadcrumb",
  extends: v,
  props: {
    item: null,
    templates: null,
    index: null
  },
  methods: {
    onClick: function(t) {
      this.item.command && this.item.command({
        originalEvent: t,
        item: this.item
      });
    },
    visible: function() {
      return typeof this.item.visible == "function" ? this.item.visible() : this.item.visible !== !1;
    },
    disabled: function() {
      return typeof this.item.disabled == "function" ? this.item.disabled() : this.item.disabled;
    },
    label: function() {
      return typeof this.item.label == "function" ? this.item.label() : this.item.label;
    },
    isCurrentUrl: function() {
      var t = this.item, n = t.to, r = t.url, o = typeof window < "u" ? window.location.pathname : "";
      return n === o || r === o ? "page" : void 0;
    }
  },
  computed: {
    ptmOptions: function() {
      return {
        context: {
          item: this.item,
          index: this.index
        }
      };
    },
    getMenuItemProps: function() {
      var t = this;
      return {
        action: a({
          class: this.cx("itemLink"),
          "aria-current": this.isCurrentUrl(),
          onClick: function(r) {
            return t.onClick(r);
          }
        }, this.ptm("itemLink", this.ptmOptions)),
        icon: a({
          class: [this.cx("icon"), this.item.icon]
        }, this.ptm("icon", this.ptmOptions)),
        label: a({
          class: this.cx("label")
        }, this.ptm("label", this.ptmOptions))
      };
    }
  }
}, yn = ["href", "target", "aria-current"];
function In(e, t, n, r, o, i) {
  return i.visible() ? (l(), u("li", a({
    key: 0,
    class: [e.cx("item"), n.item.class]
  }, e.ptm("item", i.ptmOptions)), [n.templates.item ? (l(), g(I(n.templates.item), {
    key: 1,
    item: n.item,
    label: i.label(),
    props: i.getMenuItemProps
  }, null, 8, ["item", "label", "props"])) : (l(), u("a", a({
    key: 0,
    href: n.item.url || "#",
    class: e.cx("itemLink"),
    target: n.item.target,
    "aria-current": i.isCurrentUrl(),
    onClick: t[0] || (t[0] = function() {
      return i.onClick && i.onClick.apply(i, arguments);
    })
  }, e.ptm("itemLink", i.ptmOptions)), [n.templates && n.templates.itemicon ? (l(), g(I(n.templates.itemicon), {
    key: 0,
    item: n.item,
    class: C(e.cx("itemIcon", i.ptmOptions))
  }, null, 8, ["item", "class"])) : n.item.icon ? (l(), u("span", a({
    key: 1,
    class: [e.cx("itemIcon"), n.item.icon]
  }, e.ptm("itemIcon", i.ptmOptions)), null, 16)) : p("", !0), n.item.label ? (l(), u("span", a({
    key: 2,
    class: e.cx("itemLabel")
  }, e.ptm("itemLabel", i.ptmOptions)), E(i.label()), 17)) : p("", !0)], 16, yn))], 16)) : p("", !0);
}
ve.render = In;
var ye = {
  name: "Breadcrumb",
  extends: vn,
  inheritAttrs: !1,
  components: {
    BreadcrumbItem: ve,
    ChevronRightIcon: ae
  }
};
function kn(e, t, n, r, o, i) {
  var d = S("BreadcrumbItem"), c = S("ChevronRightIcon");
  return l(), u("nav", a({
    class: e.cx("root")
  }, e.ptmi("root")), [h("ol", a({
    class: e.cx("list")
  }, e.ptm("list")), [e.home ? (l(), g(d, a({
    key: 0,
    item: e.home,
    class: e.cx("homeItem"),
    templates: e.$slots,
    pt: e.pt,
    unstyled: e.unstyled
  }, e.ptm("homeItem")), null, 16, ["item", "class", "templates", "pt", "unstyled"])) : p("", !0), (l(!0), u($, null, ie(e.model, function(s, m) {
    return l(), u($, {
      key: s.label + "_" + m
    }, [e.home || m !== 0 ? (l(), u("li", a({
      key: 0,
      class: e.cx("separator")
    }, {
      ref_for: !0
    }, e.ptm("separator")), [b(e.$slots, "separator", {}, function() {
      return [T(c, a({
        "aria-hidden": "true",
        class: e.cx("separatorIcon")
      }, {
        ref_for: !0
      }, e.ptm("separatorIcon")), null, 16, ["class"])];
    })], 16)) : p("", !0), T(d, {
      item: s,
      index: m,
      templates: e.$slots,
      pt: e.pt,
      unstyled: e.unstyled
    }, null, 8, ["item", "index", "templates", "pt", "unstyled"])], 64);
  }), 128))], 16)], 16);
}
ye.render = kn;
var wn = `
    .p-popover {
        margin-block-start: dt('popover.gutter');
        background: dt('popover.background');
        color: dt('popover.color');
        border: 1px solid dt('popover.border.color');
        border-radius: dt('popover.border.radius');
        box-shadow: dt('popover.shadow');
        will-change: transform;
    }

    .p-popover-content {
        padding: dt('popover.content.padding');
    }

    .p-popover-flipped {
        margin-block-start: calc(dt('popover.gutter') * -1);
        margin-block-end: dt('popover.gutter');
    }

    .p-popover:after,
    .p-popover:before {
        bottom: 100%;
        left: calc(dt('popover.arrow.offset') + dt('popover.arrow.left'));
        content: ' ';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }

    .p-popover:after {
        border-width: calc(dt('popover.gutter') - 2px);
        margin-left: calc(-1 * (dt('popover.gutter') - 2px));
        border-style: solid;
        border-color: transparent;
        border-bottom-color: dt('popover.background');
    }

    .p-popover:before {
        border-width: dt('popover.gutter');
        margin-left: calc(-1 * dt('popover.gutter'));
        border-style: solid;
        border-color: transparent;
        border-bottom-color: dt('popover.border.color');
    }

    .p-popover-flipped:after,
    .p-popover-flipped:before {
        bottom: auto;
        top: 100%;
    }

    .p-popover.p-popover-flipped:after {
        border-bottom-color: transparent;
        border-top-color: dt('popover.background');
    }

    .p-popover.p-popover-flipped:before {
        border-bottom-color: transparent;
        border-top-color: dt('popover.border.color');
    }
`, Ln = {
  root: "p-popover p-component",
  content: "p-popover-content"
}, Pn = k.extend({
  name: "popover",
  style: wn,
  classes: Ln
}), Cn = {
  name: "BasePopover",
  extends: v,
  props: {
    dismissable: {
      type: Boolean,
      default: !0
    },
    appendTo: {
      type: [String, Object],
      default: "body"
    },
    baseZIndex: {
      type: Number,
      default: 0
    },
    autoZIndex: {
      type: Boolean,
      default: !0
    },
    breakpoints: {
      type: Object,
      default: null
    },
    closeOnEscape: {
      type: Boolean,
      default: !0
    }
  },
  style: Pn,
  provide: function() {
    return {
      $pcPopover: this,
      $parentInstance: this
    };
  }
}, Ie = {
  name: "Popover",
  extends: Cn,
  inheritAttrs: !1,
  emits: ["show", "hide"],
  data: function() {
    return {
      visible: !1
    };
  },
  watch: {
    dismissable: {
      immediate: !0,
      handler: function(t) {
        t ? this.bindOutsideClickListener() : this.unbindOutsideClickListener();
      }
    }
  },
  selfClick: !1,
  target: null,
  eventTarget: null,
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  container: null,
  styleElement: null,
  overlayEventListener: null,
  documentKeydownListener: null,
  beforeUnmount: function() {
    this.dismissable && this.unbindOutsideClickListener(), this.scrollHandler && (this.scrollHandler.destroy(), this.scrollHandler = null), this.destroyStyle(), this.unbindResizeListener(), this.target = null, this.container && this.autoZIndex && O.clear(this.container), this.overlayEventListener && (H.off("overlay-click", this.overlayEventListener), this.overlayEventListener = null), this.container = null;
  },
  mounted: function() {
    this.breakpoints && this.createStyle();
  },
  methods: {
    toggle: function(t, n) {
      this.visible ? this.hide() : this.show(t, n);
    },
    show: function(t, n) {
      this.visible = !0, this.eventTarget = t.currentTarget, this.target = n || t.currentTarget;
    },
    hide: function() {
      this.visible = !1;
    },
    onContentClick: function() {
      this.selfClick = !0;
    },
    onEnter: function(t) {
      var n = this;
      Oe(t, {
        position: "absolute",
        top: "0"
      }), this.alignOverlay(), this.dismissable && this.bindOutsideClickListener(), this.bindScrollListener(), this.bindResizeListener(), this.autoZIndex && O.set("overlay", t, this.baseZIndex + this.$primevue.config.zIndex.overlay), this.overlayEventListener = function(r) {
        n.container.contains(r.target) && (n.selfClick = !0);
      }, this.focus(), H.on("overlay-click", this.overlayEventListener), this.$emit("show"), this.closeOnEscape && this.bindDocumentKeyDownListener();
    },
    onLeave: function() {
      this.unbindOutsideClickListener(), this.unbindScrollListener(), this.unbindResizeListener(), this.unbindDocumentKeyDownListener(), H.off("overlay-click", this.overlayEventListener), this.overlayEventListener = null, this.$emit("hide");
    },
    onAfterLeave: function(t) {
      this.autoZIndex && O.clear(t);
    },
    alignOverlay: function() {
      Be(this.container, this.target, !1);
      var t = A(this.container), n = A(this.target), r = 0;
      t.left < n.left && (r = n.left - t.left), this.container.style.setProperty(Ae("popover.arrow.left").name, "".concat(r, "px")), t.top < n.top && (this.container.setAttribute("data-p-popover-flipped", "true"), !this.isUnstyled && xe(this.container, "p-popover-flipped"));
    },
    onContentKeydown: function(t) {
      t.code === "Escape" && this.closeOnEscape && (this.hide(), P(this.target));
    },
    onButtonKeydown: function(t) {
      switch (t.code) {
        case "ArrowDown":
        case "ArrowUp":
        case "ArrowLeft":
        case "ArrowRight":
          t.preventDefault();
      }
    },
    focus: function() {
      var t = this.container.querySelector("[autofocus]");
      t && t.focus();
    },
    onKeyDown: function(t) {
      t.code === "Escape" && this.closeOnEscape && (this.visible = !1);
    },
    bindDocumentKeyDownListener: function() {
      this.documentKeydownListener || (this.documentKeydownListener = this.onKeyDown.bind(this), window.document.addEventListener("keydown", this.documentKeydownListener));
    },
    unbindDocumentKeyDownListener: function() {
      this.documentKeydownListener && (window.document.removeEventListener("keydown", this.documentKeydownListener), this.documentKeydownListener = null);
    },
    bindOutsideClickListener: function() {
      var t = this;
      !this.outsideClickListener && Ke() && (this.outsideClickListener = function(n) {
        t.visible && !t.selfClick && !t.isTargetClicked(n) && (t.visible = !1), t.selfClick = !1;
      }, document.addEventListener("click", this.outsideClickListener));
    },
    unbindOutsideClickListener: function() {
      this.outsideClickListener && (document.removeEventListener("click", this.outsideClickListener), this.outsideClickListener = null, this.selfClick = !1);
    },
    bindScrollListener: function() {
      var t = this;
      this.scrollHandler || (this.scrollHandler = new We(this.target, function() {
        t.visible && (t.visible = !1);
      })), this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener: function() {
      this.scrollHandler && this.scrollHandler.unbindScrollListener();
    },
    bindResizeListener: function() {
      var t = this;
      this.resizeListener || (this.resizeListener = function() {
        t.visible && !te() && (t.visible = !1);
      }, window.addEventListener("resize", this.resizeListener));
    },
    unbindResizeListener: function() {
      this.resizeListener && (window.removeEventListener("resize", this.resizeListener), this.resizeListener = null);
    },
    isTargetClicked: function(t) {
      return this.eventTarget && (this.eventTarget === t.target || this.eventTarget.contains(t.target));
    },
    containerRef: function(t) {
      this.container = t;
    },
    createStyle: function() {
      if (!this.styleElement && !this.isUnstyled) {
        var t;
        this.styleElement = document.createElement("style"), this.styleElement.type = "text/css", Se(this.styleElement, "nonce", (t = this.$primevue) === null || t === void 0 || (t = t.config) === null || t === void 0 || (t = t.csp) === null || t === void 0 ? void 0 : t.nonce), document.head.appendChild(this.styleElement);
        var n = "";
        for (var r in this.breakpoints)
          n += `
                        @media screen and (max-width: `.concat(r, `) {
                            .p-popover[`).concat(this.$attrSelector, `] {
                                width: `).concat(this.breakpoints[r], ` !important;
                            }
                        }
                    `);
        this.styleElement.innerHTML = n;
      }
    },
    destroyStyle: function() {
      this.styleElement && (document.head.removeChild(this.styleElement), this.styleElement = null);
    },
    onOverlayClick: function(t) {
      H.emit("overlay-click", {
        originalEvent: t,
        target: this.target
      });
    }
  },
  directives: {
    focustrap: Ge,
    ripple: M
  },
  components: {
    Portal: je
  }
}, Tn = ["aria-modal"];
function $n(e, t, n, r, o, i) {
  var d = S("Portal"), c = R("focustrap");
  return l(), g(d, {
    appendTo: e.appendTo
  }, {
    default: K(function() {
      return [T(G, a({
        name: "p-anchored-overlay",
        onEnter: i.onEnter,
        onLeave: i.onLeave,
        onAfterLeave: i.onAfterLeave
      }, e.ptm("transition")), {
        default: K(function() {
          return [o.visible ? L((l(), u("div", a({
            key: 0,
            ref: i.containerRef,
            role: "dialog",
            "aria-modal": o.visible,
            onClick: t[3] || (t[3] = function() {
              return i.onOverlayClick && i.onOverlayClick.apply(i, arguments);
            }),
            class: e.cx("root")
          }, e.ptmi("root")), [e.$slots.container ? b(e.$slots, "container", {
            key: 0,
            closeCallback: i.hide,
            keydownCallback: function(m) {
              return i.onButtonKeydown(m);
            }
          }) : (l(), u("div", a({
            key: 1,
            class: e.cx("content"),
            onClick: t[0] || (t[0] = function() {
              return i.onContentClick && i.onContentClick.apply(i, arguments);
            }),
            onMousedown: t[1] || (t[1] = function() {
              return i.onContentClick && i.onContentClick.apply(i, arguments);
            }),
            onKeydown: t[2] || (t[2] = function() {
              return i.onContentKeydown && i.onContentKeydown.apply(i, arguments);
            })
          }, e.ptm("content")), [b(e.$slots, "default")], 16))], 16, Tn)), [[c]]) : p("", !0)];
        }),
        _: 3
      }, 16, ["onEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo"]);
}
Ie.render = $n;
var Sn = `
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: dt('tag.primary.background');
        color: dt('tag.primary.color');
        font-size: dt('tag.font.size');
        font-weight: dt('tag.font.weight');
        padding: dt('tag.padding');
        border-radius: dt('tag.border.radius');
        gap: dt('tag.gap');
    }

    .p-tag-icon {
        font-size: dt('tag.icon.size');
        width: dt('tag.icon.size');
        height: dt('tag.icon.size');
    }

    .p-tag-rounded {
        border-radius: dt('tag.rounded.border.radius');
    }

    .p-tag-success {
        background: dt('tag.success.background');
        color: dt('tag.success.color');
    }

    .p-tag-info {
        background: dt('tag.info.background');
        color: dt('tag.info.color');
    }

    .p-tag-warn {
        background: dt('tag.warn.background');
        color: dt('tag.warn.color');
    }

    .p-tag-danger {
        background: dt('tag.danger.background');
        color: dt('tag.danger.color');
    }

    .p-tag-secondary {
        background: dt('tag.secondary.background');
        color: dt('tag.secondary.color');
    }

    .p-tag-contrast {
        background: dt('tag.contrast.background');
        color: dt('tag.contrast.color');
    }
`, Kn = {
  root: function(t) {
    var n = t.props;
    return ["p-tag p-component", {
      "p-tag-info": n.severity === "info",
      "p-tag-success": n.severity === "success",
      "p-tag-warn": n.severity === "warn",
      "p-tag-danger": n.severity === "danger",
      "p-tag-secondary": n.severity === "secondary",
      "p-tag-contrast": n.severity === "contrast",
      "p-tag-rounded": n.rounded
    }];
  },
  icon: "p-tag-icon",
  label: "p-tag-label"
}, Bn = k.extend({
  name: "tag",
  style: Sn,
  classes: Kn
}), An = {
  name: "BaseTag",
  extends: v,
  props: {
    value: null,
    severity: null,
    rounded: Boolean,
    icon: String
  },
  style: Bn,
  provide: function() {
    return {
      $pcTag: this,
      $parentInstance: this
    };
  }
};
function F(e) {
  "@babel/helpers - typeof";
  return F = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, F(e);
}
function xn(e, t, n) {
  return (t = On(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function On(e) {
  var t = En(e, "string");
  return F(t) == "symbol" ? t : t + "";
}
function En(e, t) {
  if (F(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (F(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ke = {
  name: "Tag",
  extends: An,
  inheritAttrs: !1,
  computed: {
    dataP: function() {
      return V(xn({
        rounded: this.rounded
      }, this.severity, this.severity));
    }
  }
}, Mn = ["data-p"];
function zn(e, t, n, r, o, i) {
  return l(), u("span", a({
    class: e.cx("root"),
    "data-p": i.dataP
  }, e.ptmi("root")), [e.$slots.icon ? (l(), g(I(e.$slots.icon), a({
    key: 0,
    class: e.cx("icon")
  }, e.ptm("icon")), null, 16, ["class"])) : e.icon ? (l(), u("span", a({
    key: 1,
    class: [e.cx("icon"), e.icon]
  }, e.ptm("icon")), null, 16)) : p("", !0), e.value != null || e.$slots.default ? b(e.$slots, "default", {
    key: 2
  }, function() {
    return [h("span", a({
      class: e.cx("label")
    }, e.ptm("label")), E(e.value), 17)];
  }) : p("", !0)], 16, Mn);
}
ke.render = zn;
const Dn = (e) => {
  e?.config?.globalProperties?.__primixSupportReady || (e.config.globalProperties.__primixSupportReady = !0, Le(e), e.component("PCard", se), e.component("PPanel", le), e.component("PTabs", de), e.component("PTabList", ue), e.component("PTab", ce), e.component("PTabPanels", me), e.component("PTabPanel", be), e.component("PFieldset", pe), e.component("PMenubar", ge), e.component("PBreadcrumb", ye), e.component("PPopover", Ie), e.directive("tooltip", De), e.component("PBadge", Ve), e.component("PTag", ke));
};
we.setup(Dn);
//# sourceMappingURL=primix-support.js.map
