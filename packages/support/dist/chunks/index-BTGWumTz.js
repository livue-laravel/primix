import { B as se, Z as De, p as we, Q as B, z as Y, c as q, v as ce, C as Ce, s as z, l as Te, Y as Oe, I as Ie, D as xe, d as X, S as Ke, b as P, L as Pe, a as Ee } from "./index-uMyjrk0Z.js";
import { b as ue, R as pe, a as Le, x as R } from "./index-BjgkEHwo.js";
import { O as Ae, C as Me } from "./index-Cb10foaC.js";
import { i as je, k as Fe, j as Ve, c as He, a as Be, d as fe, s as ze } from "./index-DtI3zZ-b.js";
import { s as Re } from "./index-D-cypkd-.js";
import { s as $e } from "./index-Bbeg0KN4.js";
import { s as he, f as _ } from "./index-CoIgDweF.js";
import { reactive as Ue, resolveComponent as m, resolveDirective as We, openBlock as c, createElementBlock as p, mergeProps as u, normalizeClass as h, createCommentVNode as b, createElementVNode as k, withDirectives as Ye, Fragment as D, createBlock as f, resolveDynamicComponent as w, withCtx as N, withModifiers as ge, createTextVNode as E, toDisplayString as x, renderList as J, createVNode as O, Transition as ye, renderSlot as y, createSlots as qe } from "vue";
import { s as Qe } from "./index-HHJV160Q.js";
import { s as Ze } from "./index-B2Wxlp19.js";
import { s as Ge } from "./index-DqllS7rH.js";
var Je = `
    .p-tree {
        display: block;
        background: dt('tree.background');
        color: dt('tree.color');
        padding: dt('tree.padding');
        position: relative;
    }

    .p-tree-root-children,
    .p-tree-node-children {
        display: flex;
        list-style-type: none;
        flex-direction: column;
        margin: 0;
        gap: dt('tree.gap');
    }

    .p-tree-root-children {
        padding: 0;
        padding-block-start: dt('tree.gap');
    }

    .p-tree-node-children {
        padding: 0;
        padding-block-start: dt('tree.gap');
        padding-inline-start: dt('tree.indent');
    }

    .p-tree-node {
        padding: 0;
        outline: 0 none;
    }

    .p-tree-node-content {
        border-radius: dt('tree.node.border.radius');
        padding: dt('tree.node.padding');
        display: flex;
        align-items: center;
        outline-color: transparent;
        color: dt('tree.node.color');
        gap: dt('tree.node.gap');
        transition:
            background dt('tree.transition.duration'),
            color dt('tree.transition.duration'),
            outline-color dt('tree.transition.duration'),
            box-shadow dt('tree.transition.duration');
    }

    .p-tree-node-content[data-p-dragging] {
        outline: 1px dashed dt('primary.color');
        outline-offset: -1px;
    }

    .p-tree-node-content[data-pc-section="drag-image"] {
        background: dt('tree.background');
    }

    .p-tree-node:focus-visible > .p-tree-node-content {
        box-shadow: dt('tree.node.focus.ring.shadow');
        outline: dt('tree.node.focus.ring.width') dt('tree.node.focus.ring.style') dt('tree.node.focus.ring.color');
        outline-offset: dt('tree.node.focus.ring.offset');
    }

    .p-tree-node-content.p-tree-node-selectable:not(.p-tree-node-selected):hover {
        background: dt('tree.node.hover.background');
        color: dt('tree.node.hover.color');
    }

    .p-tree-node-content.p-tree-node-selectable:not(.p-tree-node-selected):hover .p-tree-node-icon {
        color: dt('tree.node.icon.hover.color');
    }

    .p-tree-node-content.p-tree-node-selected {
        background: dt('tree.node.selected.background');
        color: dt('tree.node.selected.color');
    }

    .p-tree-node-content.p-tree-node-selected .p-tree-node-toggle-button {
        color: inherit;
    }

    .p-tree-node-content.p-tree-node-dragover {
        background: dt('tree.node.hover.background');
        color: dt('tree.node.hover.color');
    }

    .p-tree-node-content:focus-visible,
    .p-tree-node-content.p-tree-node-contextmenu-selected {
        box-shadow: dt('tree.node.focus.ring.shadow');
        outline: dt('tree.node.focus.ring.width') dt('tree.node.focus.ring.style') dt('tree.node.focus.ring.color');
        outline-offset: dt('tree.node.focus.ring.offset');
    }

    .p-tree-node-drop-point {
		outline: 1px solid dt('primary.color');
	}

    .p-tree-node-toggle-button {
        cursor: pointer;
        user-select: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        flex-shrink: 0;
        width: dt('tree.node.toggle.button.size');
        height: dt('tree.node.toggle.button.size');
        color: dt('tree.node.toggle.button.color');
        border: 0 none;
        background: transparent;
        border-radius: dt('tree.node.toggle.button.border.radius');
        transition:
            background dt('tree.transition.duration'),
            color dt('tree.transition.duration'),
            border-color dt('tree.transition.duration'),
            outline-color dt('tree.transition.duration'),
            box-shadow dt('tree.transition.duration');
        outline-color: transparent;
        padding: 0;
    }

    .p-tree-node-toggle-button:enabled:hover {
        background: dt('tree.node.toggle.button.hover.background');
        color: dt('tree.node.toggle.button.hover.color');
    }

    .p-tree-node-content.p-tree-node-selected .p-tree-node-toggle-button:hover {
        background: dt('tree.node.toggle.button.selected.hover.background');
        color: dt('tree.node.toggle.button.selected.hover.color');
    }

    .p-tree-root {
        overflow: auto;
    }

    .p-tree-node-selectable {
        cursor: pointer;
        user-select: none;
    }

    .p-tree-node-leaf > .p-tree-node-content .p-tree-node-toggle-button {
        visibility: hidden;
    }

    .p-tree-node-icon {
        color: dt('tree.node.icon.color');
        transition: color dt('tree.transition.duration');
    }

    .p-tree-node-content.p-tree-node-selected .p-tree-node-icon {
        color: dt('tree.node.icon.selected.color');
    }

    .p-tree-filter {
        margin: dt('tree.filter.margin');
    }

    .p-tree-filter-input {
        width: 100%;
    }

    .p-tree-loading-icon {
        font-size: dt('tree.loading.icon.size');
        width: dt('tree.loading.icon.size');
        height: dt('tree.loading.icon.size');
    }

    .p-tree .p-tree-mask {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .p-tree-flex-scrollable {
        display: flex;
        flex: 1;
        height: 100%;
        flex-direction: column;
    }

    .p-tree-flex-scrollable .p-tree-root {
        flex: 1;
    }
`, Xe = {
  root: function(e) {
    var n = e.props, o = e.state;
    return ["p-tree p-component", {
      "p-tree-selectable": n.selectionMode != null,
      "p-tree-loading": n.loading,
      "p-tree-flex-scrollable": n.scrollHeight === "flex",
      "p-tree-node-dragover": o.dragHover
    }];
  },
  mask: "p-tree-mask p-overlay-mask",
  loadingIcon: "p-tree-loading-icon",
  pcFilterContainer: "p-tree-filter",
  pcFilterInput: "p-tree-filter-input",
  wrapper: "p-tree-root",
  //TODO: discuss
  rootChildren: "p-tree-root-children",
  node: function(e) {
    var n = e.instance;
    return ["p-tree-node", {
      "p-tree-node-leaf": n.leaf
    }];
  },
  nodeContent: function(e) {
    var n = e.instance;
    return ["p-tree-node-content", n.node.styleClass, {
      "p-tree-node-selectable": n.selectable,
      "p-tree-node-selected": n.checkboxMode && n.$parentInstance.highlightOnSelect ? n.checked : n.selected,
      "p-tree-node-dragover": n.isNodeDropActive
    }];
  },
  nodeToggleButton: "p-tree-node-toggle-button",
  nodeToggleIcon: "p-tree-node-toggle-icon",
  nodeCheckbox: "p-tree-node-checkbox",
  nodeIcon: "p-tree-node-icon",
  nodeLabel: "p-tree-node-label",
  nodeChildren: "p-tree-node-children",
  emptyMessage: "p-tree-empty-message",
  dropPoint: "p-tree-node-drop-point"
}, _e = se.extend({
  name: "tree",
  style: Je,
  classes: Xe
}), et = {
  name: "BaseTree",
  extends: he,
  props: {
    value: {
      type: null,
      default: null
    },
    expandedKeys: {
      type: null,
      default: null
    },
    selectionKeys: {
      type: null,
      default: null
    },
    selectionMode: {
      type: String,
      default: null
    },
    metaKeySelection: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    loadingIcon: {
      type: String,
      default: void 0
    },
    loadingMode: {
      type: String,
      default: "mask"
    },
    filter: {
      type: Boolean,
      default: !1
    },
    filterBy: {
      type: [String, Function],
      default: "label"
    },
    filterMode: {
      type: String,
      default: "lenient"
    },
    filterPlaceholder: {
      type: String,
      default: null
    },
    filterLocale: {
      type: String,
      default: void 0
    },
    highlightOnSelect: {
      type: Boolean,
      default: !1
    },
    scrollHeight: {
      type: String,
      default: null
    },
    level: {
      type: Number,
      default: 0
    },
    draggableNodes: {
      type: Boolean,
      default: null
    },
    droppableNodes: {
      type: Boolean,
      default: null
    },
    draggableScope: {
      type: [String, Array],
      default: null
    },
    droppableScope: {
      type: [String, Array],
      default: null
    },
    validateDrop: {
      type: Boolean,
      default: !1
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
  style: _e,
  provide: function() {
    return {
      $pcTree: this,
      $parentInstance: this
    };
  }
}, C = Ue({
  isDragging: !1,
  dragNode: null,
  dragScope: null
}), $ = /* @__PURE__ */ new Set(), U = /* @__PURE__ */ new Set();
function tt() {
  var t = function(r) {
    C.isDragging = !0, C.dragNode = r.node, C.dragScope = r.scope, $.forEach(function(a) {
      return a(r);
    });
  }, e = function(r) {
    C.isDragging = !1, C.dragNode = null, C.dragScope = null, U.forEach(function(a) {
      return a(r);
    });
  }, n = function(r) {
    return $.add(r), function() {
      return $.delete(r);
    };
  }, o = function(r) {
    return U.add(r), function() {
      return U.delete(r);
    };
  };
  return {
    dragState: C,
    startDrag: t,
    stopDrag: e,
    onDragStart: n,
    onDragStop: o
  };
}
function L(t) {
  "@babel/helpers - typeof";
  return L = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, L(t);
}
function ee(t, e) {
  var n = typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (!n) {
    if (Array.isArray(t) || (n = be(t)) || e) {
      n && (t = n);
      var o = 0, i = function() {
      };
      return { s: i, n: function() {
        return o >= t.length ? { done: !0 } : { done: !1, value: t[o++] };
      }, e: function(l) {
        throw l;
      }, f: i };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var r, a = !0, d = !1;
  return { s: function() {
    n = n.call(t);
  }, n: function() {
    var l = n.next();
    return a = l.done, l;
  }, e: function(l) {
    d = !0, r = l;
  }, f: function() {
    try {
      a || n.return == null || n.return();
    } finally {
      if (d) throw r;
    }
  } };
}
function I(t) {
  return ot(t) || rt(t) || be(t) || nt();
}
function nt() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function be(t, e) {
  if (t) {
    if (typeof t == "string") return Q(t, e);
    var n = {}.toString.call(t).slice(8, -1);
    return n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set" ? Array.from(t) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Q(t, e) : void 0;
  }
}
function rt(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function ot(t) {
  if (Array.isArray(t)) return Q(t);
}
function Q(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, o = Array(e); n < e; n++) o[n] = t[n];
  return o;
}
function te(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    e && (o = o.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function S(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? te(Object(n), !0).forEach(function(o) {
      it(t, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : te(Object(n)).forEach(function(o) {
      Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return t;
}
function it(t, e, n) {
  return (e = lt(e)) in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function lt(t) {
  var e = at(t, "string");
  return L(e) == "symbol" ? e : e + "";
}
function at(t, e) {
  if (L(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var o = n.call(t, e);
    if (L(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var ve = {
  name: "TreeNode",
  hostName: "Tree",
  extends: he,
  emits: ["node-toggle", "node-click", "checkbox-change", "node-drop", "value-change", "node-dragenter", "node-dragleave"],
  props: {
    node: {
      type: null,
      default: null
    },
    parentNode: {
      type: null,
      default: null
    },
    rootNodes: {
      type: Object,
      default: null
    },
    expandedKeys: {
      type: null,
      default: null
    },
    loadingMode: {
      type: String,
      default: "mask"
    },
    selectionKeys: {
      type: null,
      default: null
    },
    selectionMode: {
      type: String,
      default: null
    },
    templates: {
      type: null,
      default: null
    },
    level: {
      type: Number,
      default: null
    },
    draggableScope: {
      type: [String, Array],
      default: null
    },
    draggableNodes: {
      type: Boolean,
      default: null
    },
    droppableNodes: {
      type: Boolean,
      default: null
    },
    validateDrop: {
      type: Boolean,
      default: !1
    },
    index: null
  },
  nodeTouched: !1,
  toggleClicked: !1,
  inject: {
    $pcTree: {
      default: void 0
    }
  },
  data: function() {
    return {
      isPrevDropPointHovered: !1,
      isNextDropPointHovered: !1,
      isNodeDropHovered: !1
    };
  },
  mounted: function() {
    this.setAllNodesTabIndexes();
  },
  methods: {
    toggle: function() {
      this.$emit("node-toggle", this.node), this.toggleClicked = !0;
    },
    label: function(e) {
      return typeof e.label == "function" ? e.label() : e.label;
    },
    onChildNodeToggle: function(e) {
      this.$emit("node-toggle", e);
    },
    getPTOptions: function(e) {
      return this.ptm(e, {
        context: {
          node: this.node,
          index: this.index,
          expanded: this.expanded,
          selected: this.selected,
          checked: this.checked,
          partialChecked: this.partialChecked,
          leaf: this.leaf
        }
      });
    },
    onClick: function(e) {
      if (this.toggleClicked || B(e.target, '[data-pc-section="nodetogglebutton"]') || B(e.target.parentElement, '[data-pc-section="nodetogglebutton"]')) {
        this.toggleClicked = !1;
        return;
      }
      this.isCheckboxSelectionMode() ? this.node.selectable != !1 && this.toggleCheckbox() : this.$emit("node-click", {
        originalEvent: e,
        nodeTouched: this.nodeTouched,
        node: this.node
      }), this.nodeTouched = !1;
    },
    onChildNodeClick: function(e) {
      this.$emit("node-click", e);
    },
    onTouchEnd: function() {
      this.nodeTouched = !0;
    },
    onKeyDown: function(e) {
      if (this.isSameNode(e))
        switch (e.code) {
          case "Tab":
            this.onTabKey(e);
            break;
          case "ArrowDown":
            this.onArrowDown(e);
            break;
          case "ArrowUp":
            this.onArrowUp(e);
            break;
          case "ArrowRight":
            this.onArrowRight(e);
            break;
          case "ArrowLeft":
            this.onArrowLeft(e);
            break;
          case "Enter":
          case "NumpadEnter":
          case "Space":
            this.onEnterKey(e);
            break;
        }
    },
    onArrowDown: function(e) {
      var n = e.target.getAttribute("data-pc-section") === "nodetogglebutton" ? e.target.closest('[role="treeitem"]') : e.target, o = n.children[1];
      if (o)
        this.focusRowChange(n, o.children[0]);
      else if (n.nextElementSibling)
        this.focusRowChange(n, n.nextElementSibling);
      else {
        var i = this.findNextSiblingOfAncestor(n);
        i && this.focusRowChange(n, i);
      }
      e.preventDefault();
    },
    onArrowUp: function(e) {
      var n = e.target;
      if (n.previousElementSibling)
        this.focusRowChange(n, n.previousElementSibling, this.findLastVisibleDescendant(n.previousElementSibling));
      else {
        var o = this.getParentNodeElement(n);
        o && this.focusRowChange(n, o);
      }
      e.preventDefault();
    },
    onArrowRight: function(e) {
      var n = this;
      this.leaf || this.expanded || (e.currentTarget.tabIndex = -1, this.$emit("node-toggle", this.node), this.$nextTick(function() {
        n.onArrowDown(e);
      }));
    },
    onArrowLeft: function(e) {
      var n = Y(e.currentTarget, '[data-pc-section="nodetogglebutton"]');
      if (this.level === 0 && !this.expanded)
        return !1;
      if (this.expanded && !this.leaf)
        return n.click(), !1;
      var o = this.findBeforeClickableNode(e.currentTarget);
      o && this.focusRowChange(e.currentTarget, o);
    },
    onEnterKey: function(e) {
      this.setTabIndexForSelectionMode(e, this.nodeTouched), this.onClick(e), e.preventDefault();
    },
    onTabKey: function() {
      this.setAllNodesTabIndexes();
    },
    removeNodeFromTree: function(e, n) {
      var o = this;
      return e.reduce(function(i, r) {
        if (r.key === n.key)
          return i;
        if (r.children && r.children.length > 0) {
          var a = o.removeNodeFromTree(r.children, n);
          i.push(S(S({}, r), {}, {
            children: a
          }));
        } else
          i.push(r);
        return i;
      }, []);
    },
    insertNodeInSiblings: function(e, n, o, i) {
      var r = this, a = e.findIndex(function(d) {
        return d.key === n;
      });
      return a !== -1 ? e.toSpliced(a + i, 0, o) : e.map(function(d) {
        return d.children && d.children.length > 0 ? S(S({}, d), {}, {
          children: r.insertNodeInSiblings(d.children, n, o, i)
        }) : d;
      });
    },
    addNodeAsChild: function(e, n, o) {
      var i = this;
      return e.map(function(r) {
        return r.key === n ? S(S({}, r), {}, {
          children: [].concat(I(r.children || []), [o])
        }) : r.children && r.children.length > 0 ? S(S({}, r), {}, {
          children: i.addNodeAsChild(r.children, n, o)
        }) : r;
      });
    },
    insertNodeOnDrop: function() {
      var e = this.$pcTree, n = e.dragNode, o = e.dragNodeIndex, i = e.dragNodeSubNodes, r = e.dragDropService;
      if (!this.node || o == null || !n || !i)
        return null;
      var a = this.dropPosition, d = this.removeNodeFromTree(this.rootNodes, n);
      return a < 0 ? d = this.insertNodeInSiblings(d, this.node.key, n, 0) : a > 0 ? d = this.insertNodeInSiblings(d, this.node.key, n, 1) : d = this.addNodeAsChild(d, this.node.key, n), this.$emit("value-change", {
        nodes: d
      }), r.stopDrag({
        node: n,
        subNodes: d,
        index: o
      }), d;
    },
    onNodeDrop: function(e) {
      var n = this;
      if (this.isDroppable) {
        e.preventDefault(), e.stopPropagation();
        var o = this.$pcTree.dragNode, i = this.dropPosition, r = i !== 0 || i === 0 && this.isNodeDroppable;
        if (r)
          if (this.validateDrop)
            this.$emit("node-drop", {
              originalEvent: e,
              value: this.rootNodes,
              dragNode: o,
              dropNode: this.node,
              index: this.index,
              accept: function() {
                var s = n.insertNodeOnDrop();
                n.$emit("node-drop", {
                  originalEvent: e,
                  value: s,
                  dragNode: o,
                  dropNode: n.node,
                  index: n.index
                });
              }
            });
          else {
            var a = this.insertNodeOnDrop();
            this.$emit("node-drop", {
              originalEvent: e,
              value: a,
              dragNode: o,
              dropNode: this.node,
              index: this.index
            });
          }
        this.isPrevDropPointHovered = !1, this.isNextDropPointHovered = !1, this.isNodeDropHovered = !1;
      }
    },
    onNodeDragStart: function(e) {
      if (this.isNodeDraggable) {
        e.dataTransfer.effectAllowed = "all", e.dataTransfer.setData("text", "data");
        var n = e.currentTarget, o = n.cloneNode(!0), i = o.querySelector('[data-pc-section="nodetogglebutton"]'), r = o.querySelector('[data-pc-name="pcnodecheckbox"]');
        n.setAttribute("data-p-dragging", "true"), o.style.width = ce(n) + "px", o.style.height = Ce(n) + "px", o.setAttribute("data-pc-section", "drag-image"), i.style.visibility = "hidden", r?.remove(), document.body.appendChild(o), e.dataTransfer.setDragImage(o, 0, 0), setTimeout(function() {
          return document.body.removeChild(o);
        }, 0), this.$pcTree.dragDropService.startDrag({
          node: this.node,
          subNodes: this.subNodes,
          index: this.index,
          scope: this.draggableScope
        });
      } else
        e.preventDefault();
    },
    onNodeDragOver: function(e) {
      if (this.isDroppable) {
        e.dataTransfer.dropEffect = "copy";
        var n = e.currentTarget, o = n.getBoundingClientRect(), i = e.clientY - o.top;
        this.isPrevDropPointHovered = !1, this.isNextDropPointHovered = !1, this.isNodeDropHovered = !1, i < o.height * 0.25 ? this.isPrevDropPointHovered = !0 : i > o.height * 0.75 ? this.isNextDropPointHovered = !0 : this.isNodeDroppable && (this.isNodeDropHovered = !0);
      } else
        e.dataTransfer.dropEffect = "none";
      this.droppableNodes && (e.preventDefault(), e.stopPropagation());
    },
    onNodeDragEnter: function() {
      this.$emit("node-dragenter", {
        node: this.node
      });
    },
    onNodeDragLeave: function() {
      this.$emit("node-dragleave", {
        node: this.node
      }), this.isPrevDropPointHovered = !1, this.isNextDropPointHovered = !1, this.isNodeDropHovered = !1;
    },
    onNodeDragEnd: function(e) {
      var n;
      (n = e.currentTarget) === null || n === void 0 || n.removeAttribute("data-p-dragging"), this.$pcTree.dragDropService.stopDrag({
        node: this.node,
        subNodes: this.subNodes,
        index: this.index
      });
    },
    setAllNodesTabIndexes: function() {
      var e = q(this.$refs.currentNode.closest('[data-pc-section="rootchildren"]'), '[role="treeitem"]'), n = I(e).some(function(i) {
        return i.getAttribute("aria-selected") === "true" || i.getAttribute("aria-checked") === "true";
      });
      if (I(e).forEach(function(i) {
        i.tabIndex = -1;
      }), n) {
        var o = I(e).filter(function(i) {
          return i.getAttribute("aria-selected") === "true" || i.getAttribute("aria-checked") === "true";
        });
        o[0].tabIndex = 0;
        return;
      }
      I(e)[0].tabIndex = 0;
    },
    setTabIndexForSelectionMode: function(e, n) {
      if (this.selectionMode !== null) {
        var o = I(q(this.$refs.currentNode.parentElement, '[role="treeitem"]'));
        e.currentTarget.tabIndex = n === !1 ? -1 : 0, o.every(function(i) {
          return i.tabIndex === -1;
        }) && (o[0].tabIndex = 0);
      }
    },
    focusRowChange: function(e, n, o) {
      e.tabIndex = "-1", n.tabIndex = "0", this.focusNode(o || n);
    },
    findBeforeClickableNode: function(e) {
      var n = e.closest("ul").closest("li");
      if (n) {
        var o = Y(n, "button");
        return o && o.style.visibility !== "hidden" ? n : this.findBeforeClickableNode(e.previousElementSibling);
      }
      return null;
    },
    toggleCheckbox: function() {
      var e = this.selectionKeys ? S({}, this.selectionKeys) : {}, n = !this.checked;
      this.propagateDown(this.node, n, e), this.$emit("checkbox-change", {
        node: this.node,
        check: n,
        selectionKeys: e
      });
    },
    propagateDown: function(e, n, o) {
      if (n && e.selectable != !1 ? o[e.key] = {
        checked: !0,
        partialChecked: !1
      } : delete o[e.key], e.children && e.children.length) {
        var i = ee(e.children), r;
        try {
          for (i.s(); !(r = i.n()).done; ) {
            var a = r.value;
            this.propagateDown(a, n, o);
          }
        } catch (d) {
          i.e(d);
        } finally {
          i.f();
        }
      }
    },
    propagateUp: function(e) {
      var n = e.check, o = S({}, e.selectionKeys), i = 0, r = !1, a = ee(this.node.children), d;
      try {
        for (a.s(); !(d = a.n()).done; ) {
          var s = d.value;
          o[s.key] && o[s.key].checked ? i++ : o[s.key] && o[s.key].partialChecked && (r = !0);
        }
      } catch (l) {
        a.e(l);
      } finally {
        a.f();
      }
      n && i === this.node.children.length ? o[this.node.key] = {
        checked: !0,
        partialChecked: !1
      } : (n || delete o[this.node.key], r || i > 0 && i !== this.node.children.length ? o[this.node.key] = {
        checked: !1,
        partialChecked: !0
      } : delete o[this.node.key]), this.$emit("checkbox-change", {
        node: e.node,
        check: e.check,
        selectionKeys: o
      });
    },
    onChildCheckboxChange: function(e) {
      this.$emit("checkbox-change", e);
    },
    findNextSiblingOfAncestor: function(e) {
      var n = this.getParentNodeElement(e);
      return n ? n.nextElementSibling ? n.nextElementSibling : this.findNextSiblingOfAncestor(n) : null;
    },
    findLastVisibleDescendant: function(e) {
      var n = e.children[1];
      if (n) {
        var o = n.children[n.children.length - 1];
        return this.findLastVisibleDescendant(o);
      } else
        return e;
    },
    getParentNodeElement: function(e) {
      var n = e.parentElement.parentElement;
      return B(n, "role") === "treeitem" ? n : null;
    },
    focusNode: function(e) {
      e.focus();
    },
    isCheckboxSelectionMode: function() {
      return this.selectionMode === "checkbox";
    },
    isSameNode: function(e) {
      return e.currentTarget && (e.currentTarget.isSameNode(e.target) || e.currentTarget.isSameNode(e.target.closest('[role="treeitem"]')));
    }
  },
  computed: {
    hasChildren: function() {
      return this.node.children && this.node.children.length > 0;
    },
    expanded: function() {
      return this.expandedKeys && this.expandedKeys[this.node.key] === !0;
    },
    leaf: function() {
      return this.node.leaf === !1 ? !1 : !(this.node.children && this.node.children.length);
    },
    selectable: function() {
      return this.node.selectable === !1 ? !1 : this.selectionMode != null;
    },
    selected: function() {
      return this.selectionMode && this.selectionKeys ? this.selectionKeys[this.node.key] === !0 : !1;
    },
    checkboxMode: function() {
      return this.selectionMode === "checkbox" && this.node.selectable !== !1;
    },
    checked: function() {
      return this.selectionKeys ? this.selectionKeys[this.node.key] && this.selectionKeys[this.node.key].checked : !1;
    },
    partialChecked: function() {
      return this.selectionKeys ? this.selectionKeys[this.node.key] && this.selectionKeys[this.node.key].partialChecked : !1;
    },
    ariaChecked: function() {
      return this.selectionMode === "single" || this.selectionMode === "multiple" ? this.selected : void 0;
    },
    ariaSelected: function() {
      return this.checkboxMode ? this.checked : void 0;
    },
    isPrevDropPointActive: function() {
      return this.isPrevDropPointHovered && this.isDroppable;
    },
    isNextDropPointActive: function() {
      return this.isNextDropPointHovered && this.isDroppable;
    },
    dropPosition: function() {
      return this.isPrevDropPointActive ? -1 : this.isNextDropPointActive ? 1 : 0;
    },
    subNodes: function() {
      return this.parentNode ? this.parentNode.children : this.rootNodes;
    },
    isDraggable: function() {
      return this.draggableNodes;
    },
    isDroppable: function() {
      return this.droppableNodes && this.$pcTree.allowNodeDrop(this.node);
    },
    isNodeDraggable: function() {
      var e;
      return ((e = this.node) === null || e === void 0 ? void 0 : e.draggable) !== !1 && this.isDraggable;
    },
    isNodeDroppable: function() {
      var e;
      return ((e = this.node) === null || e === void 0 ? void 0 : e.droppable) !== !1 && this.isDroppable;
    },
    isNodeDropActive: function() {
      return this.isNodeDropHovered && this.isNodeDroppable;
    }
  },
  components: {
    Checkbox: Ge,
    ChevronDownIcon: fe,
    ChevronRightIcon: Qe,
    CheckIcon: Be,
    MinusIcon: Ze,
    SpinnerIcon: ue
  },
  directives: {
    ripple: pe
  }
}, dt = ["aria-label", "aria-selected", "aria-expanded", "aria-setsize", "aria-posinset", "aria-level", "aria-checked", "tabindex"], st = ["draggable", "data-p-selected", "data-p-selectable"], ct = ["data-p-leaf"];
function ut(t, e, n, o, i, r) {
  var a = m("SpinnerIcon"), d = m("Checkbox"), s = m("TreeNode", !0), l = We("ripple");
  return c(), p("li", u({
    ref: "currentNode",
    class: t.cx("node"),
    role: "treeitem",
    "aria-label": r.label(n.node),
    "aria-selected": r.ariaSelected,
    "aria-expanded": r.expanded,
    "aria-setsize": n.node.children ? n.node.children.length : 0,
    "aria-posinset": n.index + 1,
    "aria-level": n.level,
    "aria-checked": r.ariaChecked,
    tabindex: n.index === 0 ? 0 : -1,
    onKeydown: e[14] || (e[14] = function() {
      return r.onKeyDown && r.onKeyDown.apply(r, arguments);
    })
  }, r.getPTOptions("node")), [r.isPrevDropPointActive ? (c(), p("div", {
    key: 0,
    class: h(t.cx("dropPoint")),
    "aria-hidden": "true"
  }, null, 2)) : b("", !0), k("div", u({
    class: t.cx("nodeContent"),
    style: n.node.style,
    draggable: r.isDraggable,
    onClick: e[2] || (e[2] = function() {
      return r.onClick && r.onClick.apply(r, arguments);
    }),
    onTouchend: e[3] || (e[3] = function() {
      return r.onTouchEnd && r.onTouchEnd.apply(r, arguments);
    }),
    onDragstart: e[4] || (e[4] = function() {
      return r.onNodeDragStart && r.onNodeDragStart.apply(r, arguments);
    }),
    onDragover: e[5] || (e[5] = function() {
      return r.onNodeDragOver && r.onNodeDragOver.apply(r, arguments);
    }),
    onDragenter: e[6] || (e[6] = function() {
      return r.onNodeDragEnter && r.onNodeDragEnter.apply(r, arguments);
    }),
    onDragleave: e[7] || (e[7] = function() {
      return r.onNodeDragLeave && r.onNodeDragLeave.apply(r, arguments);
    }),
    onDragend: e[8] || (e[8] = function() {
      return r.onNodeDragEnd && r.onNodeDragEnd.apply(r, arguments);
    }),
    onDrop: e[9] || (e[9] = function() {
      return r.onNodeDrop && r.onNodeDrop.apply(r, arguments);
    })
  }, r.getPTOptions("nodeContent"), {
    "data-p-selected": r.checkboxMode ? r.checked : r.selected,
    "data-p-selectable": r.selectable
  }), [Ye((c(), p("button", u({
    type: "button",
    class: t.cx("nodeToggleButton"),
    onClick: e[0] || (e[0] = function() {
      return r.toggle && r.toggle.apply(r, arguments);
    }),
    tabindex: "-1",
    "data-p-leaf": r.leaf
  }, r.getPTOptions("nodeToggleButton")), [n.node.loading && n.loadingMode === "icon" ? (c(), p(D, {
    key: 0
  }, [n.templates.nodetoggleicon || n.templates.nodetogglericon ? (c(), f(w(n.templates.nodetoggleicon || n.templates.nodetogglericon), {
    key: 0,
    node: n.node,
    expanded: r.expanded,
    class: h(t.cx("nodeToggleIcon"))
  }, null, 8, ["node", "expanded", "class"])) : (c(), f(a, u({
    key: 1,
    spin: "",
    class: t.cx("nodeToggleIcon")
  }, r.getPTOptions("nodeToggleIcon")), null, 16, ["class"]))], 64)) : (c(), p(D, {
    key: 1
  }, [n.templates.nodetoggleicon || n.templates.togglericon ? (c(), f(w(n.templates.nodetoggleicon || n.templates.togglericon), {
    key: 0,
    node: n.node,
    expanded: r.expanded,
    class: h(t.cx("nodeToggleIcon"))
  }, null, 8, ["node", "expanded", "class"])) : r.expanded ? (c(), f(w(n.node.expandedIcon ? "span" : "ChevronDownIcon"), u({
    key: 1,
    class: t.cx("nodeToggleIcon")
  }, r.getPTOptions("nodeToggleIcon")), null, 16, ["class"])) : (c(), f(w(n.node.collapsedIcon ? "span" : "ChevronRightIcon"), u({
    key: 2,
    class: t.cx("nodeToggleIcon")
  }, r.getPTOptions("nodeToggleIcon")), null, 16, ["class"]))], 64))], 16, ct)), [[l]]), r.checkboxMode ? (c(), f(d, {
    key: 0,
    defaultValue: r.checked,
    binary: !0,
    indeterminate: r.partialChecked,
    class: h(t.cx("nodeCheckbox")),
    tabindex: -1,
    unstyled: t.unstyled,
    pt: r.getPTOptions("pcNodeCheckbox"),
    "data-p-partialchecked": r.partialChecked
  }, {
    icon: N(function(g) {
      return [n.templates.checkboxicon ? (c(), f(w(n.templates.checkboxicon), {
        key: 0,
        checked: g.checked,
        partialChecked: r.partialChecked,
        class: h(g.class)
      }, null, 8, ["checked", "partialChecked", "class"])) : b("", !0)];
    }),
    _: 1
  }, 8, ["defaultValue", "indeterminate", "class", "unstyled", "pt", "data-p-partialchecked"])) : b("", !0), n.templates.nodeicon ? (c(), f(w(n.templates.nodeicon), u({
    key: 1,
    node: n.node,
    class: [t.cx("nodeIcon")]
  }, r.getPTOptions("nodeIcon")), null, 16, ["node", "class"])) : (c(), p("span", u({
    key: 2,
    class: [t.cx("nodeIcon"), n.node.icon]
  }, r.getPTOptions("nodeIcon")), null, 16)), k("span", u({
    class: t.cx("nodeLabel")
  }, r.getPTOptions("nodeLabel"), {
    onKeydown: e[1] || (e[1] = ge(function() {
    }, ["stop"]))
  }), [n.templates[n.node.type] || n.templates.default ? (c(), f(w(n.templates[n.node.type] || n.templates.default), {
    key: 0,
    node: n.node,
    expanded: r.expanded,
    selected: r.checkboxMode ? r.checked : r.selected
  }, null, 8, ["node", "expanded", "selected"])) : (c(), p(D, {
    key: 1
  }, [E(x(r.label(n.node)), 1)], 64))], 16)], 16, st), r.isNextDropPointActive ? (c(), p("div", {
    key: 1,
    class: h(t.cx("dropPoint")),
    "aria-hidden": "true"
  }, null, 2)) : b("", !0), r.hasChildren && r.expanded ? (c(), p("ul", u({
    key: 2,
    class: t.cx("nodeChildren"),
    role: "group"
  }, t.ptm("nodeChildren")), [(c(!0), p(D, null, J(n.node.children, function(g, K) {
    return c(), f(s, {
      key: g.key,
      node: g,
      parentNode: n.node,
      rootNodes: n.rootNodes,
      templates: n.templates,
      level: n.level + 1,
      index: K,
      loadingMode: n.loadingMode,
      expandedKeys: n.expandedKeys,
      onNodeToggle: r.onChildNodeToggle,
      onNodeClick: r.onChildNodeClick,
      selectionMode: n.selectionMode,
      selectionKeys: n.selectionKeys,
      onCheckboxChange: r.propagateUp,
      draggableScope: n.draggableScope,
      draggableNodes: n.draggableNodes,
      droppableNodes: n.droppableNodes,
      validateDrop: n.validateDrop,
      onNodeDrop: e[10] || (e[10] = function(v) {
        return t.$emit("node-drop", v);
      }),
      onNodeDragenter: e[11] || (e[11] = function(v) {
        return t.$emit("node-dragenter", v);
      }),
      onNodeDragleave: e[12] || (e[12] = function(v) {
        return t.$emit("node-dragleave", v);
      }),
      onValueChange: e[13] || (e[13] = function(v) {
        return t.$emit("value-change", v);
      }),
      unstyled: t.unstyled,
      pt: t.pt
    }, null, 8, ["node", "parentNode", "rootNodes", "templates", "level", "index", "loadingMode", "expandedKeys", "onNodeToggle", "onNodeClick", "selectionMode", "selectionKeys", "onCheckboxChange", "draggableScope", "draggableNodes", "droppableNodes", "validateDrop", "unstyled", "pt"]);
  }), 128))], 16)) : b("", !0)], 16, dt);
}
ve.render = ut;
function A(t) {
  "@babel/helpers - typeof";
  return A = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, A(t);
}
function V(t, e) {
  var n = typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (!n) {
    if (Array.isArray(t) || (n = me(t)) || e) {
      n && (t = n);
      var o = 0, i = function() {
      };
      return { s: i, n: function() {
        return o >= t.length ? { done: !0 } : { done: !1, value: t[o++] };
      }, e: function(l) {
        throw l;
      }, f: i };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var r, a = !0, d = !1;
  return { s: function() {
    n = n.call(t);
  }, n: function() {
    var l = n.next();
    return a = l.done, l;
  }, e: function(l) {
    d = !0, r = l;
  }, f: function() {
    try {
      a || n.return == null || n.return();
    } finally {
      if (d) throw r;
    }
  } };
}
function ne(t) {
  return ht(t) || ft(t) || me(t) || pt();
}
function pt() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function me(t, e) {
  if (t) {
    if (typeof t == "string") return Z(t, e);
    var n = {}.toString.call(t).slice(8, -1);
    return n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set" ? Array.from(t) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Z(t, e) : void 0;
  }
}
function ft(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function ht(t) {
  if (Array.isArray(t)) return Z(t);
}
function Z(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, o = Array(e); n < e; n++) o[n] = t[n];
  return o;
}
function re(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    e && (o = o.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function T(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? re(Object(n), !0).forEach(function(o) {
      gt(t, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : re(Object(n)).forEach(function(o) {
      Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return t;
}
function gt(t, e, n) {
  return (e = yt(e)) in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function yt(t) {
  var e = bt(t, "string");
  return A(e) == "symbol" ? e : e + "";
}
function bt(t, e) {
  if (A(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var o = n.call(t, e);
    if (A(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var ke = {
  name: "Tree",
  extends: et,
  inheritAttrs: !1,
  emits: ["node-expand", "node-collapse", "update:expandedKeys", "update:selectionKeys", "node-select", "node-unselect", "filter", "node-drop", "node-dragenter", "node-dragleave", "update:value", "drag-enter", "drag-leave"],
  data: function() {
    return {
      d_expandedKeys: this.expandedKeys || {},
      filterValue: null,
      dragNode: null,
      dragNodeSubNodes: null,
      dragNodeIndex: null,
      dragNodeScope: null,
      dragHover: null
    };
  },
  inject: {
    $pcTreeSelect: {
      default: null
    }
  },
  dragDropService: null,
  dragStartCleanup: null,
  dragStopCleanup: null,
  watch: {
    expandedKeys: function(e) {
      this.d_expandedKeys = e;
    }
  },
  mounted: function() {
    var e = this;
    this.droppableNodes && (this.dragDropService = tt(), this.dragStartCleanup = this.dragDropService.onDragStart(function(n) {
      e.dragNode = n.node, e.dragNodeSubNodes = n.subNodes, e.dragNodeIndex = n.index, e.dragNodeScope = n.scope;
    }), this.dragStopCleanup = this.dragDropService.onDragStop(function() {
      e.dragNode = null, e.dragNodeSubNodes = null, e.dragNodeIndex = null, e.dragNodeScope = null, e.dragHover = !1;
    }));
  },
  beforeUnmount: function() {
    this.dragStartCleanup && this.dragStartCleanup(), this.dragStopCleanup && this.dragStopCleanup();
  },
  methods: {
    onNodeToggle: function(e) {
      var n = e.key;
      this.d_expandedKeys[n] ? (delete this.d_expandedKeys[n], this.$emit("node-collapse", e)) : (this.d_expandedKeys[n] = !0, this.$emit("node-expand", e)), this.d_expandedKeys = T({}, this.d_expandedKeys), this.$emit("update:expandedKeys", this.d_expandedKeys);
    },
    onNodeClick: function(e) {
      if (this.selectionMode != null && e.node.selectable !== !1) {
        var n = e.nodeTouched ? !1 : this.metaKeySelection, o = n ? this.handleSelectionWithMetaKey(e) : this.handleSelectionWithoutMetaKey(e);
        this.$emit("update:selectionKeys", o);
      }
    },
    onCheckboxChange: function(e) {
      this.$emit("update:selectionKeys", e.selectionKeys), e.check ? this.$emit("node-select", e.node) : this.$emit("node-unselect", e.node);
    },
    handleSelectionWithMetaKey: function(e) {
      var n = e.originalEvent, o = e.node, i = n.metaKey || n.ctrlKey, r = this.isNodeSelected(o), a;
      return r && i ? (this.isSingleSelectionMode() ? a = {} : (a = T({}, this.selectionKeys), delete a[o.key]), this.$emit("node-unselect", o)) : (this.isSingleSelectionMode() ? a = {} : this.isMultipleSelectionMode() && (a = i ? this.selectionKeys ? T({}, this.selectionKeys) : {} : {}), a[o.key] = !0, this.$emit("node-select", o)), a;
    },
    handleSelectionWithoutMetaKey: function(e) {
      var n = e.node, o = this.isNodeSelected(n), i;
      return this.isSingleSelectionMode() ? o ? (i = {}, this.$emit("node-unselect", n)) : (i = {}, i[n.key] = !0, this.$emit("node-select", n)) : o ? (i = T({}, this.selectionKeys), delete i[n.key], this.$emit("node-unselect", n)) : (i = this.selectionKeys ? T({}, this.selectionKeys) : {}, i[n.key] = !0, this.$emit("node-select", n)), i;
    },
    isSingleSelectionMode: function() {
      return this.selectionMode === "single";
    },
    isMultipleSelectionMode: function() {
      return this.selectionMode === "multiple";
    },
    isNodeSelected: function(e) {
      return this.selectionMode && this.selectionKeys ? this.selectionKeys[e.key] === !0 : !1;
    },
    isChecked: function(e) {
      return this.selectionKeys ? this.selectionKeys[e.key] && this.selectionKeys[e.key].checked : !1;
    },
    isNodeLeaf: function(e) {
      return e.leaf === !1 ? !1 : !(e.children && e.children.length);
    },
    onFilterKeyup: function(e) {
      (e.code === "Enter" || e.code === "NumpadEnter") && e.preventDefault(), this.$emit("filter", {
        originalEvent: e,
        value: e.target.value
      });
    },
    findFilteredNodes: function(e, n) {
      if (e) {
        var o = !1;
        if (e.children) {
          var i = ne(e.children);
          e.children = [];
          var r = V(i), a;
          try {
            for (r.s(); !(a = r.n()).done; ) {
              var d = a.value, s = T({}, d);
              this.isFilterMatched(s, n) && (o = !0, e.children.push(s));
            }
          } catch (l) {
            r.e(l);
          } finally {
            r.f();
          }
        }
        if (o)
          return !0;
      }
    },
    isFilterMatched: function(e, n) {
      var o = n.searchFields, i = n.filterText, r = n.strict, a = !1, d = V(o), s;
      try {
        for (d.s(); !(s = d.n()).done; ) {
          var l = s.value, g = String(we(e, l)).toLocaleLowerCase(this.filterLocale);
          g.indexOf(i) > -1 && (a = !0);
        }
      } catch (K) {
        d.e(K);
      } finally {
        d.f();
      }
      return (!a || r && !this.isNodeLeaf(e)) && (a = this.findFilteredNodes(e, {
        searchFields: o,
        filterText: i,
        strict: r
      }) || a), a;
    },
    onNodeDrop: function(e) {
      this.$emit("node-drop", e);
    },
    onNodeDragEnter: function(e) {
      this.$emit("node-dragenter", e);
    },
    onNodeDragLeave: function(e) {
      this.$emit("node-dragleave", e);
    },
    onValueChanged: function(e) {
      this.dragNodeSubNodes.splice(this.dragNodeIndex, 1), this.$emit("update:value", e.nodes);
    },
    allowDrop: function(e, n, o) {
      if (e)
        if (this.isValidDragScope(o)) {
          var i = !0;
          if (n)
            if (e === n)
              i = !1;
            else
              for (var r = n.parent; r != null; ) {
                if (r === e) {
                  i = !1;
                  break;
                }
                r = r.parent;
              }
          return i;
        } else
          return !1;
      else return !1;
    },
    allowNodeDrop: function(e) {
      return this.allowDrop(this.dragNode, e, this.dragNodeScope);
    },
    hasCommonScope: function(e, n) {
      if (e === null && n === null)
        return !0;
      if (e === null || n === null)
        return !1;
      if (typeof n == "string") {
        if (typeof e == "string")
          return e === n;
        if (Array.isArray(e))
          return e.indexOf(n) !== -1;
      } else if (Array.isArray(n)) {
        if (typeof e == "string")
          return n.indexOf(e) !== -1;
        if (Array.isArray(e)) {
          var o = V(e), i;
          try {
            for (o.s(); !(i = o.n()).done; ) {
              var r = i.value;
              if (n.indexOf(r) !== -1)
                return !0;
            }
          } catch (a) {
            o.e(a);
          } finally {
            o.f();
          }
          return !1;
        }
      }
      return !1;
    },
    isValidDragScope: function(e) {
      return this.droppableScope === null ? !0 : this.hasCommonScope(e, this.droppableScope);
    },
    isSameTreeScope: function(e) {
      return this.hasCommonScope(e, this.draggableScope);
    },
    onDragOver: function(e) {
      this.droppableNodes && this.allowDrop(this.dragNode, null, this.dragNodeScope) ? e.dataTransfer.dropEffect = "copy" : e.dataTransfer.dropEffect = "none", e.preventDefault();
    },
    onDragEnter: function(e) {
      this.droppableNodes && this.allowDrop(this.dragNode, null, this.dragNodeScope) && (this.dragHover = !0, this.$emit("drag-enter", {
        originalEvent: e,
        value: this.value,
        dragNode: this.dragNode,
        dragNodeScope: this.dragNodeScope
      }));
    },
    onDragLeave: function(e) {
      if (this.droppableNodes) {
        var n = e.currentTarget.getBoundingClientRect();
        (e.x >= parseInt(n.right) || e.x <= parseInt(n.left) || e.y >= parseInt(n.bottom) || e.y <= parseInt(n.top)) && (this.dragHover = !1), this.$emit("drag-leave", {
          originalEvent: e,
          value: this.value,
          dragNode: this.dragNode,
          dragNodeScope: this.dragNodeScope
        });
      }
    },
    processTreeDrop: function(e, n) {
      this.dragNodeSubNodes.splice(n, 1);
      var o = [].concat(ne(this.value || []), [e]);
      this.$emit("update:value", o), this.dragDropService.stopDrag({
        node: e
      });
    },
    onDrop: function(e) {
      var n = this;
      if (this.droppableNodes) {
        e.preventDefault();
        var o = this.dragNode;
        if (this.allowDrop(o, null, this.dragNodeScope)) {
          var i = this.dragNodeIndex;
          if (this.isSameTreeScope(this.dragNodeScope)) {
            this.dragDropService.stopDrag({
              node: o
            });
            return;
          }
          this.validateDrop ? this.$emit("node-drop", {
            originalEvent: e,
            value: this.value,
            dragNode: o,
            dropNode: null,
            index: i,
            accept: function() {
              n.processTreeDrop(o, i);
            }
          }) : (this.$emit("node-drop", {
            originalEvent: e,
            value: this.value,
            dragNode: o,
            dropNode: null,
            index: i
          }), this.processTreeDrop(o, i));
        }
      }
    }
  },
  computed: {
    filteredValue: function() {
      var e = [], n = De(this.filterBy) ? [this.filterBy] : this.filterBy.split(","), o = this.filterValue.trim().toLocaleLowerCase(this.filterLocale), i = this.filterMode === "strict", r = V(this.value), a;
      try {
        for (r.s(); !(a = r.n()).done; ) {
          var d = a.value, s = T({}, d), l = {
            searchFields: n,
            filterText: o,
            strict: i
          };
          (i && (this.findFilteredNodes(s, l) || this.isFilterMatched(s, l)) || !i && (this.isFilterMatched(s, l) || this.findFilteredNodes(s, l))) && e.push(s);
        }
      } catch (g) {
        r.e(g);
      } finally {
        r.f();
      }
      return e;
    },
    valueToRender: function() {
      return this.filterValue && this.filterValue.trim().length > 0 ? this.filteredValue : this.value;
    },
    empty: function() {
      return !this.valueToRender || this.valueToRender.length === 0;
    },
    emptyMessageText: function() {
      var e;
      return ((e = this.$primevue.config) === null || e === void 0 || (e = e.locale) === null || e === void 0 ? void 0 : e.emptyMessage) || "";
    },
    containerDataP: function() {
      return _({
        loading: this.loading,
        scrollable: this.scrollHeight === "flex"
      });
    },
    wrapperDataP: function() {
      return _({
        scrollable: this.scrollHeight === "flex"
      });
    }
  },
  components: {
    TreeNode: ve,
    InputText: He,
    InputIcon: Ve,
    IconField: Fe,
    SearchIcon: je,
    SpinnerIcon: ue
  }
};
function M(t) {
  "@babel/helpers - typeof";
  return M = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, M(t);
}
function oe(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    e && (o = o.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function ie(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? oe(Object(n), !0).forEach(function(o) {
      vt(t, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : oe(Object(n)).forEach(function(o) {
      Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return t;
}
function vt(t, e, n) {
  return (e = mt(e)) in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function mt(t) {
  var e = kt(t, "string");
  return M(e) == "symbol" ? e : e + "";
}
function kt(t, e) {
  if (M(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var o = n.call(t, e);
    if (M(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var St = ["data-p"], Nt = ["data-p"], Dt = ["aria-labelledby", "aria-label"];
function wt(t, e, n, o, i, r) {
  var a = m("SpinnerIcon"), d = m("InputText"), s = m("SearchIcon"), l = m("InputIcon"), g = m("IconField"), K = m("TreeNode");
  return c(), p("div", u({
    class: t.cx("root"),
    onDragover: e[1] || (e[1] = function() {
      return r.onDragOver && r.onDragOver.apply(r, arguments);
    }),
    onDragenter: e[2] || (e[2] = function() {
      return r.onDragEnter && r.onDragEnter.apply(r, arguments);
    }),
    onDragleave: e[3] || (e[3] = function() {
      return r.onDragLeave && r.onDragLeave.apply(r, arguments);
    }),
    onDrop: e[4] || (e[4] = function() {
      return r.onDrop && r.onDrop.apply(r, arguments);
    }),
    "data-p": r.containerDataP
  }, t.ptmi("root")), [O(ye, {
    name: "p-overlay-mask"
  }, {
    default: N(function() {
      return [t.loading && t.loadingMode === "mask" ? (c(), p("div", u({
        key: 0,
        class: t.cx("mask")
      }, t.ptm("mask")), [y(t.$slots, "loadingicon", {
        class: h(t.cx("loadingIcon"))
      }, function() {
        return [t.loadingIcon ? (c(), p("i", u({
          key: 0,
          class: [t.cx("loadingIcon"), "pi-spin", t.loadingIcon]
        }, t.ptm("loadingIcon")), null, 16)) : (c(), f(a, u({
          key: 1,
          spin: "",
          class: t.cx("loadingIcon")
        }, t.ptm("loadingIcon")), null, 16, ["class"]))];
      })], 16)) : b("", !0)];
    }),
    _: 3
  }), t.filter ? (c(), f(g, {
    key: 0,
    unstyled: t.unstyled,
    pt: ie(ie({}, t.ptm("pcFilter")), t.ptm("pcFilterContainer")),
    class: h(t.cx("pcFilterContainer"))
  }, {
    default: N(function() {
      return [O(d, {
        modelValue: i.filterValue,
        "onUpdate:modelValue": e[0] || (e[0] = function(v) {
          return i.filterValue = v;
        }),
        autocomplete: "off",
        class: h(t.cx("pcFilterInput")),
        placeholder: t.filterPlaceholder,
        unstyled: t.unstyled,
        onKeyup: r.onFilterKeyup,
        pt: t.ptm("pcFilterInput")
      }, null, 8, ["modelValue", "class", "placeholder", "unstyled", "onKeyup", "pt"]), O(l, {
        unstyled: t.unstyled,
        pt: t.ptm("pcFilterIconContainer")
      }, {
        default: N(function() {
          return [y(t.$slots, t.$slots.filtericon ? "filtericon" : "searchicon", {
            class: h(t.cx("filterIcon"))
          }, function() {
            return [O(s, u({
              class: t.cx("filterIcon")
            }, t.ptm("filterIcon")), null, 16, ["class"])];
          })];
        }),
        _: 3
      }, 8, ["unstyled", "pt"])];
    }),
    _: 3
  }, 8, ["unstyled", "pt", "class"])) : b("", !0), k("div", u({
    class: t.cx("wrapper"),
    style: {
      maxHeight: t.scrollHeight
    },
    "data-p": r.wrapperDataP
  }, t.ptm("wrapper")), [y(t.$slots, "header", {
    value: t.value,
    expandedKeys: t.expandedKeys,
    selectionKeys: t.selectionKeys
  }), r.empty ? r.empty && !r.$pcTreeSelect ? (c(), p("div", u({
    key: 1,
    class: t.cx("emptyMessage")
  }, t.ptm("emptyMessage")), [y(t.$slots, "empty", {}, function() {
    return [E(x(r.emptyMessageText), 1)];
  })], 16)) : b("", !0) : (c(), p("ul", u({
    key: 0,
    class: t.cx("rootChildren"),
    role: "tree",
    "aria-labelledby": t.ariaLabelledby,
    "aria-label": t.ariaLabel
  }, t.ptm("rootChildren")), [(c(!0), p(D, null, J(r.valueToRender, function(v, Ne) {
    return c(), f(K, {
      key: v.key,
      node: v,
      rootNodes: r.valueToRender,
      templates: t.$slots,
      level: t.level + 1,
      index: Ne,
      expandedKeys: i.d_expandedKeys,
      onNodeToggle: r.onNodeToggle,
      onNodeClick: r.onNodeClick,
      selectionMode: t.selectionMode,
      selectionKeys: t.selectionKeys,
      onCheckboxChange: r.onCheckboxChange,
      loadingMode: t.loadingMode,
      draggableNodes: t.draggableNodes,
      droppableNodes: t.droppableNodes,
      draggableScope: t.draggableScope,
      validateDrop: t.validateDrop,
      onNodeDrop: r.onNodeDrop,
      onNodeDragenter: r.onNodeDragEnter,
      onNodeDragleave: r.onNodeDragLeave,
      onValueChange: r.onValueChanged,
      unstyled: t.unstyled,
      pt: t.pt
    }, null, 8, ["node", "rootNodes", "templates", "level", "index", "expandedKeys", "onNodeToggle", "onNodeClick", "selectionMode", "selectionKeys", "onCheckboxChange", "loadingMode", "draggableNodes", "droppableNodes", "draggableScope", "validateDrop", "onNodeDrop", "onNodeDragenter", "onNodeDragleave", "onValueChange", "unstyled", "pt"]);
  }), 128))], 16, Dt)), y(t.$slots, "footer", {
    value: t.value,
    expandedKeys: t.expandedKeys,
    selectionKeys: t.selectionKeys
  })], 16, Nt)], 16, St);
}
ke.render = wt;
var Ct = `
    .p-treeselect {
        display: inline-flex;
        cursor: pointer;
        position: relative;
        user-select: none;
        background: dt('treeselect.background');
        border: 1px solid dt('treeselect.border.color');
        transition:
            background dt('treeselect.transition.duration'),
            color dt('treeselect.transition.duration'),
            border-color dt('treeselect.transition.duration'),
            outline-color dt('treeselect.transition.duration'),
            box-shadow dt('treeselect.transition.duration');
        border-radius: dt('treeselect.border.radius');
        outline-color: transparent;
        box-shadow: dt('treeselect.shadow');
    }

    .p-treeselect:not(.p-disabled):hover {
        border-color: dt('treeselect.hover.border.color');
    }

    .p-treeselect:not(.p-disabled).p-focus {
        border-color: dt('treeselect.focus.border.color');
        box-shadow: dt('treeselect.focus.ring.shadow');
        outline: dt('treeselect.focus.ring.width') dt('treeselect.focus.ring.style') dt('treeselect.focus.ring.color');
        outline-offset: dt('treeselect.focus.ring.offset');
    }

    .p-treeselect.p-variant-filled {
        background: dt('treeselect.filled.background');
    }

    .p-treeselect.p-variant-filled:not(.p-disabled):hover {
        background: dt('treeselect.filled.hover.background');
    }

    .p-treeselect.p-variant-filled.p-focus {
        background: dt('treeselect.filled.focus.background');
    }

    .p-treeselect.p-invalid {
        border-color: dt('treeselect.invalid.border.color');
    }

    .p-treeselect.p-disabled {
        opacity: 1;
        background: dt('treeselect.disabled.background');
    }

    .p-treeselect-clear-icon {
        align-self: center;
        color: dt('treeselect.clear.icon.color');
        inset-inline-end: dt('treeselect.dropdown.width');
    }

    .p-treeselect-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: transparent;
        color: dt('treeselect.dropdown.color');
        width: dt('treeselect.dropdown.width');
        border-start-end-radius: dt('border.radius.md');
        border-end-end-radius: dt('border.radius.md');
    }

    .p-treeselect-label-container {
        overflow: hidden;
        flex: 1 1 auto;
        cursor: pointer;
    }

    .p-treeselect-label {
        display: flex;
        align-items: center;
        gap: calc(dt('treeselect.padding.y') / 2);
        white-space: nowrap;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: dt('treeselect.padding.y') dt('treeselect.padding.x');
        color: dt('treeselect.color');
    }

    .p-treeselect-label.p-placeholder {
        color: dt('treeselect.placeholder.color');
    }

    .p-treeselect.p-invalid .p-treeselect-label.p-placeholder {
        color: dt('treeselect.invalid.placeholder.color');
    }

    .p-treeselect:has(.p-select-clear-icon) .p-treeselect-label {
        padding-inline-end: dt('treeselect.padding.x');
    }

    .p-treeselect.p-disabled .p-treeselect-label {
        color: dt('treeselect.disabled.color');
    }

    .p-treeselect-label-empty {
        overflow: hidden;
        visibility: hidden;
    }

    .p-treeselect-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('treeselect.overlay.background');
        color: dt('treeselect.overlay.color');
        border: 1px solid dt('treeselect.overlay.border.color');
        border-radius: dt('treeselect.overlay.border.radius');
        box-shadow: dt('treeselect.overlay.shadow');
        overflow: hidden;
        min-width: 100%;
        will-change: transform;
    }

    .p-treeselect-tree-container {
        overflow: auto;
    }

    .p-treeselect-empty-message {
        padding: dt('treeselect.empty.message.padding');
        background: transparent;
    }

    .p-treeselect-fluid {
        display: flex;
    }

    .p-treeselect-overlay .p-tree {
        padding: dt('treeselect.tree.padding');
    }

    .p-treeselect-overlay .p-tree-loading {
        min-height: 3rem;
    }

    .p-treeselect-label .p-chip {
        padding-block-start: calc(dt('treeselect.padding.y') / 2);
        padding-block-end: calc(dt('treeselect.padding.y') / 2);
        border-radius: dt('treeselect.chip.border.radius');
    }

    .p-treeselect-label:has(.p-chip) {
        padding: calc(dt('treeselect.padding.y') / 2) calc(dt('treeselect.padding.x') / 2);
    }

    .p-treeselect-sm .p-treeselect-label {
        font-size: dt('treeselect.sm.font.size');
        padding-block: dt('treeselect.sm.padding.y');
        padding-inline: dt('treeselect.sm.padding.x');
    }

    .p-treeselect-sm .p-treeselect-dropdown .p-icon {
        font-size: dt('treeselect.sm.font.size');
        width: dt('treeselect.sm.font.size');
        height: dt('treeselect.sm.font.size');
    }

    .p-treeselect-lg .p-treeselect-label {
        font-size: dt('treeselect.lg.font.size');
        padding-block: dt('treeselect.lg.padding.y');
        padding-inline: dt('treeselect.lg.padding.x');
    }

    .p-treeselect-lg .p-treeselect-dropdown .p-icon {
        font-size: dt('treeselect.lg.font.size');
        width: dt('treeselect.lg.font.size');
        height: dt('treeselect.lg.font.size');
    }
`, Tt = {
  root: function(e) {
    var n = e.props;
    return {
      position: n.appendTo === "self" ? "relative" : void 0
    };
  }
}, Ot = {
  root: function(e) {
    var n = e.instance, o = e.props;
    return ["p-treeselect p-component p-inputwrapper", {
      "p-treeselect-display-chip": o.display === "chip",
      "p-disabled": o.disabled,
      "p-invalid": n.$invalid,
      "p-focus": n.focused,
      "p-variant-filled": n.$variant === "filled",
      "p-inputwrapper-filled": n.$filled,
      "p-inputwrapper-focus": n.focused || n.overlayVisible,
      "p-treeselect-open": n.overlayVisible,
      "p-treeselect-fluid": n.$fluid,
      "p-treeselect-sm p-inputfield-sm": o.size === "small",
      "p-treeselect-lg p-inputfield-lg": o.size === "large"
    }];
  },
  labelContainer: "p-treeselect-label-container",
  label: function(e) {
    var n = e.instance, o = e.props;
    return ["p-treeselect-label", {
      "p-placeholder": n.label === o.placeholder,
      "p-treeselect-label-empty": !o.placeholder && n.emptyValue
    }];
  },
  clearIcon: "p-treeselect-clear-icon",
  chip: "p-treeselect-chip-item",
  pcChip: "p-treeselect-chip",
  dropdown: "p-treeselect-dropdown",
  dropdownIcon: "p-treeselect-dropdown-icon",
  panel: "p-treeselect-overlay p-component",
  treeContainer: "p-treeselect-tree-container",
  emptyMessage: "p-treeselect-empty-message"
}, It = se.extend({
  name: "treeselect",
  style: Ct,
  classes: Ot,
  inlineStyles: Tt
}), xt = {
  name: "BaseTreeSelect",
  extends: ze,
  props: {
    options: Array,
    scrollHeight: {
      type: String,
      default: "20rem"
    },
    placeholder: {
      type: String,
      default: null
    },
    tabindex: {
      type: Number,
      default: null
    },
    selectionMode: {
      type: String,
      default: "single"
    },
    selectedItemsLabel: {
      type: String,
      default: null
    },
    maxSelectedLabels: {
      type: Number,
      default: null
    },
    appendTo: {
      type: [String, Object],
      default: "body"
    },
    emptyMessage: {
      type: String,
      default: null
    },
    display: {
      type: String,
      default: "comma"
    },
    metaKeySelection: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    loadingIcon: {
      type: String,
      default: void 0
    },
    loadingMode: {
      type: String,
      default: "mask"
    },
    showClear: {
      type: Boolean,
      default: !1
    },
    clearIcon: {
      type: String,
      default: void 0
    },
    filter: {
      type: Boolean,
      default: !1
    },
    filterBy: {
      type: [String, Function],
      default: "label"
    },
    filterMode: {
      type: String,
      default: "lenient"
    },
    filterPlaceholder: {
      type: String,
      default: null
    },
    filterLocale: {
      type: String,
      default: void 0
    },
    inputId: {
      type: String,
      default: null
    },
    inputClass: {
      type: [String, Object],
      default: null
    },
    inputStyle: {
      type: Object,
      default: null
    },
    inputProps: {
      type: null,
      default: null
    },
    panelClass: {
      type: [String, Object],
      default: null
    },
    panelProps: {
      type: null,
      default: null
    },
    ariaLabelledby: {
      type: String,
      default: null
    },
    ariaLabel: {
      type: String,
      default: null
    },
    expandedKeys: {
      type: null,
      default: null
    }
  },
  style: It,
  provide: function() {
    return {
      $pcTreeSelect: this,
      $parentInstance: this
    };
  }
};
function j(t) {
  "@babel/helpers - typeof";
  return j = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, j(t);
}
function W(t, e) {
  var n = typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (!n) {
    if (Array.isArray(t) || (n = Se(t)) || e) {
      n && (t = n);
      var o = 0, i = function() {
      };
      return { s: i, n: function() {
        return o >= t.length ? { done: !0 } : { done: !1, value: t[o++] };
      }, e: function(l) {
        throw l;
      }, f: i };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var r, a = !0, d = !1;
  return { s: function() {
    n = n.call(t);
  }, n: function() {
    var l = n.next();
    return a = l.done, l;
  }, e: function(l) {
    d = !0, r = l;
  }, f: function() {
    try {
      a || n.return == null || n.return();
    } finally {
      if (d) throw r;
    }
  } };
}
function le(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    e && (o = o.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function ae(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? le(Object(n), !0).forEach(function(o) {
      Kt(t, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : le(Object(n)).forEach(function(o) {
      Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return t;
}
function Kt(t, e, n) {
  return (e = Pt(e)) in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function Pt(t) {
  var e = Et(t, "string");
  return j(e) == "symbol" ? e : e + "";
}
function Et(t, e) {
  if (j(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var o = n.call(t, e);
    if (j(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function Lt(t) {
  return jt(t) || Mt(t) || Se(t) || At();
}
function At() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Se(t, e) {
  if (t) {
    if (typeof t == "string") return G(t, e);
    var n = {}.toString.call(t).slice(8, -1);
    return n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set" ? Array.from(t) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? G(t, e) : void 0;
  }
}
function Mt(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function jt(t) {
  if (Array.isArray(t)) return G(t);
}
function G(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, o = Array(e); n < e; n++) o[n] = t[n];
  return o;
}
var Ft = {
  name: "TreeSelect",
  extends: xt,
  inheritAttrs: !1,
  emits: ["before-show", "before-hide", "change", "show", "hide", "node-select", "node-unselect", "node-expand", "node-collapse", "focus", "blur", "update:expandedKeys"],
  inject: {
    $pcFluid: {
      default: null
    }
  },
  data: function() {
    return {
      focused: !1,
      overlayVisible: !1,
      d_expandedKeys: this.expandedKeys || {}
    };
  },
  watch: {
    modelValue: {
      handler: function() {
        this.selfChange || this.updateTreeState(), this.selfChange = !1;
      },
      immediate: !0
    },
    options: function() {
      this.updateTreeState();
    },
    expandedKeys: function(e) {
      this.d_expandedKeys = e;
    }
  },
  outsideClickListener: null,
  resizeListener: null,
  scrollHandler: null,
  overlay: null,
  selfChange: !1,
  selfClick: !1,
  beforeUnmount: function() {
    this.unbindOutsideClickListener(), this.unbindResizeListener(), this.scrollHandler && (this.scrollHandler.destroy(), this.scrollHandler = null), this.overlay && (R.clear(this.overlay), this.overlay = null);
  },
  mounted: function() {
    this.updateTreeState();
  },
  methods: {
    show: function() {
      this.$emit("before-show"), this.overlayVisible = !0;
    },
    hide: function() {
      this.$emit("before-hide"), this.overlayVisible = !1, this.$refs.focusInput.focus();
    },
    onFocus: function(e) {
      this.focused = !0, this.$emit("focus", e);
    },
    onBlur: function(e) {
      var n, o;
      this.focused = !1, this.$emit("blur", e), (n = (o = this.formField).onBlur) === null || n === void 0 || n.call(o);
    },
    onClick: function(e) {
      this.disabled || e.target.tagName === "INPUT" || e.target.getAttribute("data-pc-section") === "clearicon" || e.target.closest('[data-pc-section="clearicon"]') || (!this.overlay || !this.overlay.contains(e.target)) && (this.overlayVisible ? this.hide() : this.show(), P(this.$refs.focusInput));
    },
    onClearClick: function() {
      this.onSelectionChange(null);
    },
    onSelectionChange: function(e) {
      this.selfChange = !0, this.writeValue(e), this.$emit("change", e);
    },
    onNodeSelect: function(e) {
      this.$emit("node-select", e), this.selectionMode === "single" && this.hide();
    },
    onNodeUnselect: function(e) {
      this.$emit("node-unselect", e);
    },
    onNodeToggle: function(e) {
      this.d_expandedKeys = e, this.$emit("update:expandedKeys", this.d_expandedKeys);
    },
    getSelectedItemsLabel: function() {
      var e = /{(.*?)}/, n = this.selectedItemsLabel || this.$primevue.config.locale.selectionMessage;
      return e.test(n) ? n.replace(n.match(e)[0], Object.keys(this.d_value).length + "") : n;
    },
    onFirstHiddenFocus: function(e) {
      var n = e.relatedTarget === this.$refs.focusInput ? Ee(this.overlay, ':not([data-p-hidden-focusable="true"])') : this.$refs.focusInput;
      P(n);
    },
    onLastHiddenFocus: function(e) {
      var n = e.relatedTarget === this.$refs.focusInput ? Pe(this.overlay, ':not([data-p-hidden-focusable="true"])') : this.$refs.focusInput;
      P(n);
    },
    onKeyDown: function(e) {
      switch (e.code) {
        case "ArrowDown":
          this.onArrowDownKey(e);
          break;
        case "Space":
        case "Enter":
        case "NumpadEnter":
          this.onEnterKey(e);
          break;
        case "Escape":
          this.onEscapeKey(e);
          break;
        case "Tab":
          this.onTabKey(e);
          break;
      }
    },
    onArrowDownKey: function(e) {
      var n = this;
      this.overlayVisible || (this.show(), this.$nextTick(function() {
        var o = q(n.$refs.tree.$el, '[data-pc-section="treeitem"]'), i = Lt(o).find(function(r) {
          return r.getAttribute("tabindex") === "0";
        });
        P(i);
      }), e.preventDefault());
    },
    onEnterKey: function(e) {
      this.overlayVisible ? this.hide() : this.onArrowDownKey(e), e.preventDefault();
    },
    onEscapeKey: function(e) {
      this.overlayVisible && (this.hide(), e.preventDefault());
    },
    onTabKey: function(e) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      n || this.overlayVisible && this.hasFocusableElements() && (P(this.$refs.firstHiddenFocusableElementOnOverlay), e.preventDefault());
    },
    hasFocusableElements: function() {
      return X(this.overlay, ':not([data-p-hidden-focusable="true"])').length > 0;
    },
    onOverlayEnter: function(e) {
      R.set("overlay", e, this.$primevue.config.zIndex.overlay), Ke(e, {
        position: "absolute",
        top: "0"
      }), this.alignOverlay(), this.focus(), this.$attrSelector && e.setAttribute(this.$attrSelector, "");
    },
    onOverlayAfterEnter: function() {
      this.bindOutsideClickListener(), this.bindScrollListener(), this.bindResizeListener(), this.scrollValueInView(), this.$emit("show");
    },
    onOverlayLeave: function() {
      this.unbindOutsideClickListener(), this.unbindScrollListener(), this.unbindResizeListener(), this.$emit("hide"), this.overlay = null;
    },
    onOverlayAfterLeave: function(e) {
      R.clear(e);
    },
    focus: function() {
      var e = X(this.overlay);
      e && e.length > 0 && e[0].focus();
    },
    alignOverlay: function() {
      this.appendTo === "self" ? Ie(this.overlay, this.$el) : (this.overlay.style.minWidth = ce(this.$el) + "px", xe(this.overlay, this.$el));
    },
    bindOutsideClickListener: function() {
      var e = this;
      this.outsideClickListener || (this.outsideClickListener = function(n) {
        e.overlayVisible && !e.selfClick && e.isOutsideClicked(n) && e.hide(), e.selfClick = !1;
      }, document.addEventListener("click", this.outsideClickListener, !0));
    },
    unbindOutsideClickListener: function() {
      this.outsideClickListener && (document.removeEventListener("click", this.outsideClickListener, !0), this.outsideClickListener = null);
    },
    bindScrollListener: function() {
      var e = this;
      this.scrollHandler || (this.scrollHandler = new Me(this.$refs.container, function() {
        e.overlayVisible && e.hide();
      })), this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener: function() {
      this.scrollHandler && this.scrollHandler.unbindScrollListener();
    },
    bindResizeListener: function() {
      var e = this;
      this.resizeListener || (this.resizeListener = function() {
        e.overlayVisible && !Oe() && e.hide();
      }, window.addEventListener("resize", this.resizeListener));
    },
    unbindResizeListener: function() {
      this.resizeListener && (window.removeEventListener("resize", this.resizeListener), this.resizeListener = null);
    },
    isOutsideClicked: function(e) {
      return !(this.$el.isSameNode(e.target) || this.$el.contains(e.target) || this.overlay && this.overlay.contains(e.target));
    },
    overlayRef: function(e) {
      this.overlay = e;
    },
    onOverlayClick: function(e) {
      Ae.emit("overlay-click", {
        originalEvent: e,
        target: this.$el
      }), this.selfClick = !0;
    },
    onOverlayKeydown: function(e) {
      e.code === "Escape" && this.hide();
    },
    fillNodeMap: function(e, n) {
      var o = this;
      n[e.key] = e, e.children && e.children.length > 0 && e.children.forEach(function(i) {
        return o.fillNodeMap(i, n);
      });
    },
    isSelected: function(e, n) {
      return this.selectionMode === "checkbox" ? n[e?.key] && n[e?.key].checked : n[e?.key];
    },
    updateTreeState: function() {
      var e = ae({}, this.d_value);
      e && this.options && this.options.length > 0 && this.updateTreeBranchState(null, null, e);
    },
    updateTreeBranchState: function(e, n, o) {
      if (e) {
        if (this.isSelected(e, o) && (this.expandPath(n), delete o[e.key]), Object.keys(o).length && e.children) {
          var i = W(e.children), r;
          try {
            for (i.s(); !(r = i.n()).done; ) {
              var a = r.value;
              n.push(e.key), this.updateTreeBranchState(a, n, o);
            }
          } catch (g) {
            i.e(g);
          } finally {
            i.f();
          }
        }
      } else {
        var d = W(this.options), s;
        try {
          for (d.s(); !(s = d.n()).done; ) {
            var l = s.value;
            this.updateTreeBranchState(l, [], o);
          }
        } catch (g) {
          d.e(g);
        } finally {
          d.f();
        }
      }
    },
    expandPath: function(e) {
      if (e.length > 0) {
        var n = W(e), o;
        try {
          for (n.s(); !(o = n.n()).done; ) {
            var i = o.value;
            this.d_expandedKeys[i] = !0;
          }
        } catch (r) {
          n.e(r);
        } finally {
          n.f();
        }
        this.d_expandedKeys = ae({}, this.d_expandedKeys), this.$emit("update:expandedKeys", this.d_expandedKeys);
      }
    },
    scrollValueInView: function() {
      if (this.overlay) {
        var e = Y(this.overlay, '[data-p-selected="true"]');
        e && e.scrollIntoView({
          block: "nearest",
          inline: "start"
        });
      }
    }
  },
  computed: {
    nodeMap: function() {
      var e, n = this, o = {};
      return (e = this.options) === null || e === void 0 || e.forEach(function(i) {
        return n.fillNodeMap(i, o);
      }), o;
    },
    selectedNodes: function() {
      var e = this, n = [];
      return this.d_value && this.options && this.options.length > 0 && Object.keys(this.d_value).forEach(function(o) {
        var i = e.nodeMap[o];
        e.isSelected(i, e.d_value) && n.push(i);
      }), n;
    },
    label: function() {
      var e = this.selectedNodes, n;
      return e.length ? z(this.maxSelectedLabels) && e.length > this.maxSelectedLabels ? n = this.getSelectedItemsLabel() : n = e.map(function(o) {
        return o.label;
      }).join(", ") : n = this.placeholder, n;
    },
    chipSelectedItems: function() {
      return z(this.maxSelectedLabels) && this.d_value && Object.keys(this.d_value).length > this.maxSelectedLabels;
    },
    emptyMessageText: function() {
      return this.emptyMessage || this.$primevue.config.locale.emptyMessage;
    },
    emptyValue: function() {
      return !this.$filled;
    },
    emptyOptions: function() {
      return !this.options || this.options.length === 0;
    },
    listId: function() {
      return this.$id + "_list";
    },
    hasFluid: function() {
      return Te(this.fluid) ? !!this.$pcFluid : this.fluid;
    },
    isClearIconVisible: function() {
      return this.showClear && this.d_value != null && z(this.options) && !this.disabled && !this.loading;
    }
  },
  components: {
    TSTree: ke,
    Chip: $e,
    Portal: Le,
    ChevronDownIcon: fe,
    TimesIcon: Re
  },
  directives: {
    ripple: pe
  }
};
function F(t) {
  "@babel/helpers - typeof";
  return F = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, F(t);
}
function de(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    e && (o = o.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function H(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? de(Object(n), !0).forEach(function(o) {
      Vt(t, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : de(Object(n)).forEach(function(o) {
      Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return t;
}
function Vt(t, e, n) {
  return (e = Ht(e)) in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function Ht(t) {
  var e = Bt(t, "string");
  return F(e) == "symbol" ? e : e + "";
}
function Bt(t, e) {
  if (F(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var o = n.call(t, e);
    if (F(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var zt = ["id", "disabled", "tabindex", "aria-labelledby", "aria-label", "aria-expanded", "aria-controls"], Rt = {
  key: 0
}, $t = ["aria-expanded"];
function Ut(t, e, n, o, i, r) {
  var a = m("Chip"), d = m("TSTree"), s = m("Portal");
  return c(), p("div", u({
    ref: "container",
    class: t.cx("root"),
    style: t.sx("root"),
    onClick: e[10] || (e[10] = function() {
      return r.onClick && r.onClick.apply(r, arguments);
    })
  }, t.ptmi("root")), [k("div", u({
    class: "p-hidden-accessible"
  }, t.ptm("hiddenInputContainer"), {
    "data-p-hidden-accessible": !0
  }), [k("input", u({
    ref: "focusInput",
    id: t.inputId,
    type: "text",
    role: "combobox",
    class: t.inputClass,
    style: t.inputStyle,
    readonly: "",
    disabled: t.disabled,
    tabindex: t.disabled ? -1 : t.tabindex,
    "aria-labelledby": t.ariaLabelledby,
    "aria-label": t.ariaLabel,
    "aria-haspopup": "tree",
    "aria-expanded": i.overlayVisible,
    "aria-controls": i.overlayVisible ? r.listId : void 0,
    onFocus: e[0] || (e[0] = function(l) {
      return r.onFocus(l);
    }),
    onBlur: e[1] || (e[1] = function(l) {
      return r.onBlur(l);
    }),
    onKeydown: e[2] || (e[2] = function(l) {
      return r.onKeyDown(l);
    })
  }, H(H({}, t.inputProps), t.ptm("hiddenInput"))), null, 16, zt)], 16), k("div", u({
    class: t.cx("labelContainer")
  }, t.ptm("labelContainer")), [k("div", u({
    class: t.cx("label")
  }, t.ptm("label")), [y(t.$slots, "value", {
    value: r.selectedNodes,
    placeholder: t.placeholder
  }, function() {
    return [t.display === "comma" ? (c(), p(D, {
      key: 0
    }, [E(x(r.label || "empty"), 1)], 64)) : t.display === "chip" ? (c(), p(D, {
      key: 1
    }, [r.chipSelectedItems ? (c(), p("span", Rt, x(r.label), 1)) : (c(), p(D, {
      key: 1
    }, [(c(!0), p(D, null, J(r.selectedNodes, function(l) {
      return c(), p("div", u({
        key: l.key,
        class: t.cx("chipItem")
      }, {
        ref_for: !0
      }, t.ptm("chipItem")), [O(a, {
        class: h(t.cx("pcChip")),
        label: l.label,
        unstyled: t.unstyled,
        pt: t.ptm("pcChip")
      }, null, 8, ["class", "label", "unstyled", "pt"])], 16);
    }), 128)), r.emptyValue ? (c(), p(D, {
      key: 0
    }, [E(x(t.placeholder || "empty"), 1)], 64)) : b("", !0)], 64))], 64)) : b("", !0)];
  })], 16)], 16), r.isClearIconVisible ? y(t.$slots, "clearicon", {
    key: 0,
    class: h(t.cx("clearIcon")),
    clearCallback: r.onClearClick
  }, function() {
    return [(c(), f(w(t.clearIcon ? "i" : "TimesIcon"), u({
      ref: "clearIcon",
      class: [t.cx("clearIcon"), t.clearIcon],
      onClick: r.onClearClick
    }, t.ptm("clearIcon"), {
      "data-pc-section": "clearicon"
    }), null, 16, ["class", "onClick"]))];
  }) : b("", !0), k("div", u({
    class: t.cx("dropdown"),
    role: "button",
    "aria-haspopup": "tree",
    "aria-expanded": i.overlayVisible
  }, t.ptm("dropdown")), [y(t.$slots, t.$slots.dropdownicon ? "dropdownicon" : "triggericon", {
    class: h(t.cx("dropdownIcon"))
  }, function() {
    return [(c(), f(w("ChevronDownIcon"), u({
      class: t.cx("dropdownIcon")
    }, t.ptm("dropdownIcon")), null, 16, ["class"]))];
  })], 16, $t), O(s, {
    appendTo: t.appendTo
  }, {
    default: N(function() {
      return [O(ye, u({
        name: "p-anchored-overlay",
        onEnter: r.onOverlayEnter,
        onAfterEnter: r.onOverlayAfterEnter,
        onLeave: r.onOverlayLeave,
        onAfterLeave: r.onOverlayAfterLeave
      }, t.ptm("transition")), {
        default: N(function() {
          return [i.overlayVisible ? (c(), p("div", u({
            key: 0,
            ref: r.overlayRef,
            onClick: e[8] || (e[8] = function() {
              return r.onOverlayClick && r.onOverlayClick.apply(r, arguments);
            }),
            class: [t.cx("panel"), t.panelClass],
            onKeydown: e[9] || (e[9] = function() {
              return r.onOverlayKeydown && r.onOverlayKeydown.apply(r, arguments);
            })
          }, H(H({}, t.panelProps), t.ptm("panel"))), [k("span", u({
            ref: "firstHiddenFocusableElementOnOverlay",
            role: "presentation",
            class: "p-hidden-accessible p-hidden-focusable",
            tabindex: 0,
            onFocus: e[3] || (e[3] = function() {
              return r.onFirstHiddenFocus && r.onFirstHiddenFocus.apply(r, arguments);
            })
          }, t.ptm("hiddenFirstFocusableEl"), {
            "data-p-hidden-accessible": !0,
            "data-p-hidden-focusable": !0
          }), null, 16), y(t.$slots, "header", {
            value: t.d_value,
            options: t.options
          }), k("div", u({
            class: t.cx("treeContainer"),
            style: {
              "max-height": t.scrollHeight
            }
          }, t.ptm("treeContainer")), [t.options && t.options.length > 0 ? (c(), f(d, {
            key: 0,
            ref: "tree",
            id: r.listId,
            value: t.options,
            selectionMode: t.selectionMode,
            loading: t.loading,
            loadingIcon: t.loadingIcon,
            loadingMode: t.loadingMode,
            filter: t.filter,
            filterBy: t.filterBy,
            filterMode: t.filterMode,
            filterPlaceholder: t.filterPlaceholder,
            filterLocale: t.filterLocale,
            "onUpdate:selectionKeys": r.onSelectionChange,
            selectionKeys: t.d_value,
            expandedKeys: i.d_expandedKeys,
            "onUpdate:expandedKeys": r.onNodeToggle,
            metaKeySelection: t.metaKeySelection,
            onNodeExpand: e[4] || (e[4] = function(l) {
              return t.$emit("node-expand", l);
            }),
            onNodeCollapse: e[5] || (e[5] = function(l) {
              return t.$emit("node-collapse", l);
            }),
            onNodeSelect: r.onNodeSelect,
            onNodeUnselect: r.onNodeUnselect,
            onClick: e[6] || (e[6] = ge(function() {
            }, ["stop"])),
            level: 0,
            unstyled: t.unstyled,
            pt: t.ptm("pcTree")
          }, qe({
            _: 2
          }, [t.$slots.option ? {
            name: "default",
            fn: N(function(l) {
              return [y(t.$slots, "option", {
                node: l.node,
                expanded: l.expanded,
                selected: l.selected
              })];
            }),
            key: "0"
          } : void 0, t.$slots.itemtoggleicon ? {
            name: "toggleicon",
            fn: N(function(l) {
              return [y(t.$slots, "itemtoggleicon", {
                node: l.node,
                expanded: l.expanded,
                class: h(l.class)
              })];
            }),
            key: "1"
          } : t.$slots.itemtogglericon ? {
            name: "togglericon",
            fn: N(function(l) {
              return [y(t.$slots, "itemtogglericon", {
                node: l.node,
                expanded: l.expanded,
                class: h(l.class)
              })];
            }),
            key: "2"
          } : void 0, t.$slots.itemcheckboxicon ? {
            name: "checkboxicon",
            fn: N(function(l) {
              return [y(t.$slots, "itemcheckboxicon", {
                checked: l.checked,
                partialChecked: l.partialChecked,
                class: h(l.class)
              })];
            }),
            key: "3"
          } : void 0]), 1032, ["id", "value", "selectionMode", "loading", "loadingIcon", "loadingMode", "filter", "filterBy", "filterMode", "filterPlaceholder", "filterLocale", "onUpdate:selectionKeys", "selectionKeys", "expandedKeys", "onUpdate:expandedKeys", "metaKeySelection", "onNodeSelect", "onNodeUnselect", "unstyled", "pt"])) : b("", !0), r.emptyOptions && !t.loading ? (c(), p("div", u({
            key: 1,
            class: t.cx("emptyMessage")
          }, t.ptm("emptyMessage")), [y(t.$slots, "empty", {}, function() {
            return [E(x(r.emptyMessageText), 1)];
          })], 16)) : b("", !0)], 16), y(t.$slots, "footer", {
            value: t.d_value,
            options: t.options
          }), k("span", u({
            ref: "lastHiddenFocusableElementOnOverlay",
            role: "presentation",
            class: "p-hidden-accessible p-hidden-focusable",
            tabindex: 0,
            onFocus: e[7] || (e[7] = function() {
              return r.onLastHiddenFocus && r.onLastHiddenFocus.apply(r, arguments);
            })
          }, t.ptm("hiddenLastFocusableEl"), {
            "data-p-hidden-accessible": !0,
            "data-p-hidden-focusable": !0
          }), null, 16)], 16)) : b("", !0)];
        }),
        _: 3
      }, 16, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo"])], 16);
}
Ft.render = Ut;
export {
  Ft as default
};
//# sourceMappingURL=index-BTGWumTz.js.map
