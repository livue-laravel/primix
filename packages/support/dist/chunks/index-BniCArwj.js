import { N as b, w as x, m as g, M as E, a as C, b as L, P as O, c as $, T as w, t as D, S as H, d as te, E as B, F as z, e as Y, k as ne, f as V, D as re, g as se, h as ie, i as oe, j as ae, n as le, l as ue, o as pe } from "./index-DCgEjc3y.js";
const de = /^\s*>\s$/, ce = b.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: !0,
  parseHTML() {
    return [
      { tag: "blockquote" }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["blockquote", g(this.options.HTMLAttributes, t), 0];
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands: t }) => t.wrapIn(this.name),
      toggleBlockquote: () => ({ commands: t }) => t.toggleWrap(this.name),
      unsetBlockquote: () => ({ commands: t }) => t.lift(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      x({
        find: de,
        type: this.type
      })
    ];
  }
}), he = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, fe = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, me = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, ge = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, ye = E.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (t) => t.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight=400",
        clearMark: (t) => t.type.name === this.name
      },
      {
        style: "font-weight",
        getAttrs: (t) => /^(bold(er)?|[5-9]\d{2,})$/.test(t) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["strong", g(this.options.HTMLAttributes, t), 0];
  },
  addCommands() {
    return {
      setBold: () => ({ commands: t }) => t.setMark(this.name),
      toggleBold: () => ({ commands: t }) => t.toggleMark(this.name),
      unsetBold: () => ({ commands: t }) => t.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      L({
        find: he,
        type: this.type
      }),
      L({
        find: me,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      C({
        find: fe,
        type: this.type
      }),
      C({
        find: ge,
        type: this.type
      })
    ];
  }
}), Me = "listItem", F = "textStyle", W = /^\s*([-+*])\s$/, be = b.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      { tag: "ul" }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["ul", g(this.options.HTMLAttributes, t), 0];
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: t, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(Me, this.editor.getAttributes(F)).run() : t.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let t = x({
      find: W,
      type: this.type
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (t = x({
      find: W,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: () => this.editor.getAttributes(F),
      editor: this.editor
    })), [
      t
    ];
  }
}), ve = /(^|[^`])`([^`]+)`(?!`)/, ke = /(^|[^`])`([^`]+)`(?!`)/g, Te = E.create({
  name: "code",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  excludes: "_",
  code: !0,
  exitable: !0,
  parseHTML() {
    return [
      { tag: "code" }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["code", g(this.options.HTMLAttributes, t), 0];
  },
  addCommands() {
    return {
      setCode: () => ({ commands: t }) => t.setMark(this.name),
      toggleCode: () => ({ commands: t }) => t.toggleMark(this.name),
      unsetCode: () => ({ commands: t }) => t.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-e": () => this.editor.commands.toggleCode()
    };
  },
  addInputRules() {
    return [
      L({
        find: ve,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      C({
        find: ke,
        type: this.type
      })
    ];
  }
}), Ae = /^```([a-z]+)?[\s\n]$/, we = /^~~~([a-z]+)?[\s\n]$/, Ce = b.create({
  name: "codeBlock",
  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: !0,
      exitOnArrowDown: !0,
      defaultLanguage: null,
      HTMLAttributes: {}
    };
  },
  content: "text*",
  marks: "",
  group: "block",
  code: !0,
  defining: !0,
  addAttributes() {
    return {
      language: {
        default: this.options.defaultLanguage,
        parseHTML: (t) => {
          var e;
          const { languageClassPrefix: n } = this.options, i = [...((e = t.firstElementChild) === null || e === void 0 ? void 0 : e.classList) || []].filter((o) => o.startsWith(n)).map((o) => o.replace(n, ""))[0];
          return i || null;
        },
        rendered: !1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full"
      }
    ];
  },
  renderHTML({ node: t, HTMLAttributes: e }) {
    return [
      "pre",
      g(this.options.HTMLAttributes, e),
      [
        "code",
        {
          class: t.attrs.language ? this.options.languageClassPrefix + t.attrs.language : null
        },
        0
      ]
    ];
  },
  addCommands() {
    return {
      setCodeBlock: (t) => ({ commands: e }) => e.setNode(this.name, t),
      toggleCodeBlock: (t) => ({ commands: e }) => e.toggleNode(this.name, "paragraph", t)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
      // remove code block when at start of document or code block is empty
      Backspace: () => {
        const { empty: t, $anchor: e } = this.editor.state.selection, n = e.pos === 1;
        return !t || e.parent.type.name !== this.name ? !1 : n || !e.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
      },
      // exit node on triple enter
      Enter: ({ editor: t }) => {
        if (!this.options.exitOnTripleEnter)
          return !1;
        const { state: e } = t, { selection: n } = e, { $from: r, empty: s } = n;
        if (!s || r.parent.type !== this.type)
          return !1;
        const i = r.parentOffset === r.parent.nodeSize - 2, o = r.parent.textContent.endsWith(`

`);
        return !i || !o ? !1 : t.chain().command(({ tr: a }) => (a.delete(r.pos - 2, r.pos), !0)).exitCode().run();
      },
      // exit node on arrow down
      ArrowDown: ({ editor: t }) => {
        if (!this.options.exitOnArrowDown)
          return !1;
        const { state: e } = t, { selection: n, doc: r } = e, { $from: s, empty: i } = n;
        if (!i || s.parent.type !== this.type || !(s.parentOffset === s.parent.nodeSize - 2))
          return !1;
        const a = s.after();
        return a === void 0 ? !1 : r.nodeAt(a) ? t.commands.command(({ tr: p }) => (p.setSelection(H.near(r.resolve(a))), !0)) : t.commands.exitCode();
      }
    };
  },
  addInputRules() {
    return [
      D({
        find: Ae,
        type: this.type,
        getAttributes: (t) => ({
          language: t[1]
        })
      }),
      D({
        find: we,
        type: this.type,
        getAttributes: (t) => ({
          language: t[1]
        })
      })
    ];
  },
  addProseMirrorPlugins() {
    return [
      // this plugin creates a code block for pasted content from VS Code
      // we can also detect the copied code language
      new O({
        key: new $("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (t, e) => {
            if (!e.clipboardData || this.editor.isActive(this.type.name))
              return !1;
            const n = e.clipboardData.getData("text/plain"), r = e.clipboardData.getData("vscode-editor-data"), s = r ? JSON.parse(r) : void 0, i = s?.mode;
            if (!n || !i)
              return !1;
            const { tr: o, schema: a } = t.state, l = a.text(n.replace(/\r\n?/g, `
`));
            return o.replaceSelectionWith(this.type.create({ language: i }, l)), o.selection.$from.parent.type !== this.type && o.setSelection(w.near(o.doc.resolve(Math.max(0, o.selection.from - 2)))), o.setMeta("paste", !0), t.dispatch(o), !0;
          }
        }
      })
    ];
  }
}), Le = b.create({
  name: "doc",
  topNode: !0,
  content: "block+"
});
function Ie(t = {}) {
  return new O({
    view(e) {
      return new xe(e, t);
    }
  });
}
class xe {
  constructor(e, n) {
    var r;
    this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.width = (r = n.width) !== null && r !== void 0 ? r : 1, this.color = n.color === !1 ? void 0 : n.color || "black", this.class = n.class, this.handlers = ["dragover", "dragend", "drop", "dragleave"].map((s) => {
      let i = (o) => {
        this[s](o);
      };
      return e.dom.addEventListener(s, i), { name: s, handler: i };
    });
  }
  destroy() {
    this.handlers.forEach(({ name: e, handler: n }) => this.editorView.dom.removeEventListener(e, n));
  }
  update(e, n) {
    this.cursorPos != null && n.doc != e.state.doc && (this.cursorPos > e.state.doc.content.size ? this.setCursor(null) : this.updateOverlay());
  }
  setCursor(e) {
    e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
  }
  updateOverlay() {
    let e = this.editorView.state.doc.resolve(this.cursorPos), n = !e.parent.inlineContent, r, s = this.editorView.dom, i = s.getBoundingClientRect(), o = i.width / s.offsetWidth, a = i.height / s.offsetHeight;
    if (n) {
      let u = e.nodeBefore, d = e.nodeAfter;
      if (u || d) {
        let f = this.editorView.nodeDOM(this.cursorPos - (u ? u.nodeSize : 0));
        if (f) {
          let y = f.getBoundingClientRect(), A = u ? y.bottom : y.top;
          u && d && (A = (A + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2);
          let I = this.width / 2 * a;
          r = { left: y.left, right: y.right, top: A - I, bottom: A + I };
        }
      }
    }
    if (!r) {
      let u = this.editorView.coordsAtPos(this.cursorPos), d = this.width / 2 * o;
      r = { left: u.left - d, right: u.left + d, top: u.top, bottom: u.bottom };
    }
    let l = this.editorView.dom.offsetParent;
    this.element || (this.element = l.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", n), this.element.classList.toggle("prosemirror-dropcursor-inline", !n);
    let p, c;
    if (!l || l == document.body && getComputedStyle(l).position == "static")
      p = -pageXOffset, c = -pageYOffset;
    else {
      let u = l.getBoundingClientRect(), d = u.width / l.offsetWidth, f = u.height / l.offsetHeight;
      p = u.left - l.scrollLeft * d, c = u.top - l.scrollTop * f;
    }
    this.element.style.left = (r.left - p) / o + "px", this.element.style.top = (r.top - c) / a + "px", this.element.style.width = (r.right - r.left) / o + "px", this.element.style.height = (r.bottom - r.top) / a + "px";
  }
  scheduleRemoval(e) {
    clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
  }
  dragover(e) {
    if (!this.editorView.editable)
      return;
    let n = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY }), r = n && n.inside >= 0 && this.editorView.state.doc.nodeAt(n.inside), s = r && r.type.spec.disableDropCursor, i = typeof s == "function" ? s(this.editorView, n, e) : s;
    if (n && !i) {
      let o = n.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        let a = te(this.editorView.state.doc, o, this.editorView.dragging.slice);
        a != null && (o = a);
      }
      this.setCursor(o), this.scheduleRemoval(5e3);
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(e) {
    this.editorView.dom.contains(e.relatedTarget) || this.setCursor(null);
  }
}
const He = B.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      Ie(this.options)
    ];
  }
});
class h extends H {
  /**
  Create a gap cursor.
  */
  constructor(e) {
    super(e, e);
  }
  map(e, n) {
    let r = e.resolve(n.map(this.head));
    return h.valid(r) ? new h(r) : H.near(r);
  }
  content() {
    return Y.empty;
  }
  eq(e) {
    return e instanceof h && e.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, n) {
    if (typeof n.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new h(e.resolve(n.pos));
  }
  /**
  @internal
  */
  getBookmark() {
    return new K(this.anchor);
  }
  /**
  @internal
  */
  static valid(e) {
    let n = e.parent;
    if (n.isTextblock || !Se(e) || !Re(e))
      return !1;
    let r = n.type.spec.allowGapCursor;
    if (r != null)
      return r;
    let s = n.contentMatchAt(e.index()).defaultType;
    return s && s.isTextblock;
  }
  /**
  @internal
  */
  static findGapCursorFrom(e, n, r = !1) {
    e: for (; ; ) {
      if (!r && h.valid(e))
        return e;
      let s = e.pos, i = null;
      for (let o = e.depth; ; o--) {
        let a = e.node(o);
        if (n > 0 ? e.indexAfter(o) < a.childCount : e.index(o) > 0) {
          i = a.child(n > 0 ? e.indexAfter(o) : e.index(o) - 1);
          break;
        } else if (o == 0)
          return null;
        s += n;
        let l = e.doc.resolve(s);
        if (h.valid(l))
          return l;
      }
      for (; ; ) {
        let o = n > 0 ? i.firstChild : i.lastChild;
        if (!o) {
          if (i.isAtom && !i.isText && !V.isSelectable(i)) {
            e = e.doc.resolve(s + i.nodeSize * n), r = !1;
            continue e;
          }
          break;
        }
        i = o, s += n;
        let a = e.doc.resolve(s);
        if (h.valid(a))
          return a;
      }
      return null;
    }
  }
}
h.prototype.visible = !1;
h.findFrom = h.findGapCursorFrom;
H.jsonID("gapcursor", h);
class K {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new K(e.map(this.pos));
  }
  resolve(e) {
    let n = e.resolve(this.pos);
    return h.valid(n) ? new h(n) : H.near(n);
  }
}
function J(t) {
  return t.isAtom || t.spec.isolating || t.spec.createGapCursor;
}
function Se(t) {
  for (let e = t.depth; e >= 0; e--) {
    let n = t.index(e), r = t.node(e);
    if (n == 0) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let s = r.child(n - 1); ; s = s.lastChild) {
      if (s.childCount == 0 && !s.inlineContent || J(s.type))
        return !0;
      if (s.inlineContent)
        return !1;
    }
  }
  return !0;
}
function Re(t) {
  for (let e = t.depth; e >= 0; e--) {
    let n = t.indexAfter(e), r = t.node(e);
    if (n == r.childCount) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let s = r.child(n); ; s = s.firstChild) {
      if (s.childCount == 0 && !s.inlineContent || J(s.type))
        return !0;
      if (s.inlineContent)
        return !1;
    }
  }
  return !0;
}
function Pe() {
  return new O({
    props: {
      decorations: Ne,
      createSelectionBetween(t, e, n) {
        return e.pos == n.pos && h.valid(n) ? new h(n) : null;
      },
      handleClick: Oe,
      handleKeyDown: Ee,
      handleDOMEvents: { beforeinput: Be }
    }
  });
}
const Ee = ne({
  ArrowLeft: S("horiz", -1),
  ArrowRight: S("horiz", 1),
  ArrowUp: S("vert", -1),
  ArrowDown: S("vert", 1)
});
function S(t, e) {
  const n = t == "vert" ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
  return function(r, s, i) {
    let o = r.selection, a = e > 0 ? o.$to : o.$from, l = o.empty;
    if (o instanceof w) {
      if (!i.endOfTextblock(n) || a.depth == 0)
        return !1;
      l = !1, a = r.doc.resolve(e > 0 ? a.after() : a.before());
    }
    let p = h.findGapCursorFrom(a, e, l);
    return p ? (s && s(r.tr.setSelection(new h(p))), !0) : !1;
  };
}
function Oe(t, e, n) {
  if (!t || !t.editable)
    return !1;
  let r = t.state.doc.resolve(e);
  if (!h.valid(r))
    return !1;
  let s = t.posAtCoords({ left: n.clientX, top: n.clientY });
  return s && s.inside > -1 && V.isSelectable(t.state.doc.nodeAt(s.inside)) ? !1 : (t.dispatch(t.state.tr.setSelection(new h(r))), !0);
}
function Be(t, e) {
  if (e.inputType != "insertCompositionText" || !(t.state.selection instanceof h))
    return !1;
  let { $from: n } = t.state.selection, r = n.parent.contentMatchAt(n.index()).findWrapping(t.state.schema.nodes.text);
  if (!r)
    return !1;
  let s = z.empty;
  for (let o = r.length - 1; o >= 0; o--)
    s = z.from(r[o].createAndFill(null, s));
  let i = t.state.tr.replace(n.pos, n.pos, new Y(s, 0, 0));
  return i.setSelection(w.near(i.doc.resolve(n.pos + 1))), t.dispatch(i), !1;
}
function Ne(t) {
  if (!(t.selection instanceof h))
    return null;
  let e = document.createElement("div");
  return e.className = "ProseMirror-gapcursor", re.create(t.doc, [se.widget(t.selection.head, e, { key: "gapcursor" })]);
}
const _e = B.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [
      Pe()
    ];
  },
  extendNodeSchema(t) {
    var e;
    const n = {
      name: t.name,
      options: t.options,
      storage: t.storage
    };
    return {
      allowGapCursor: (e = ie(oe(t, "allowGapCursor", n))) !== null && e !== void 0 ? e : null
    };
  }
}), De = b.create({
  name: "hardBreak",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  linebreakReplacement: !0,
  parseHTML() {
    return [
      { tag: "br" }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["br", g(this.options.HTMLAttributes, t)];
  },
  renderText() {
    return `
`;
  },
  addCommands() {
    return {
      setHardBreak: () => ({ commands: t, chain: e, state: n, editor: r }) => t.first([
        () => t.exitCode(),
        () => t.command(() => {
          const { selection: s, storedMarks: i } = n;
          if (s.$from.parent.type.spec.isolating)
            return !1;
          const { keepMarks: o } = this.options, { splittableMarks: a } = r.extensionManager, l = i || s.$to.parentOffset && s.$from.marks();
          return e().insertContent({ type: this.name }).command(({ tr: p, dispatch: c }) => {
            if (c && l && o) {
              const u = l.filter((d) => a.includes(d.type.name));
              p.ensureMarks(u);
            }
            return !0;
          }).run();
        })
      ])
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
}), $e = b.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: !0,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: !1
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((t) => ({
      tag: `h${t}`,
      attrs: { level: t }
    }));
  },
  renderHTML({ node: t, HTMLAttributes: e }) {
    return [`h${this.options.levels.includes(t.attrs.level) ? t.attrs.level : this.options.levels[0]}`, g(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setHeading: (t) => ({ commands: e }) => this.options.levels.includes(t.level) ? e.setNode(this.name, t) : !1,
      toggleHeading: (t) => ({ commands: e }) => this.options.levels.includes(t.level) ? e.toggleNode(this.name, "paragraph", t) : !1
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce((t, e) => ({
      ...t,
      [`Mod-Alt-${e}`]: () => this.editor.commands.toggleHeading({ level: e })
    }), {});
  },
  addInputRules() {
    return this.options.levels.map((t) => D({
      find: new RegExp(`^(#{${Math.min(...this.options.levels)},${t}})\\s$`),
      type: this.type,
      getAttributes: {
        level: t
      }
    }));
  }
});
var P = 200, m = function() {
};
m.prototype.append = function(e) {
  return e.length ? (e = m.from(e), !this.length && e || e.length < P && this.leafAppend(e) || this.length < P && e.leafPrepend(this) || this.appendInner(e)) : this;
};
m.prototype.prepend = function(e) {
  return e.length ? m.from(e).append(this) : this;
};
m.prototype.appendInner = function(e) {
  return new Ve(this, e);
};
m.prototype.slice = function(e, n) {
  return e === void 0 && (e = 0), n === void 0 && (n = this.length), e >= n ? m.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, n));
};
m.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
m.prototype.forEach = function(e, n, r) {
  n === void 0 && (n = 0), r === void 0 && (r = this.length), n <= r ? this.forEachInner(e, n, r, 0) : this.forEachInvertedInner(e, n, r, 0);
};
m.prototype.map = function(e, n, r) {
  n === void 0 && (n = 0), r === void 0 && (r = this.length);
  var s = [];
  return this.forEach(function(i, o) {
    return s.push(e(i, o));
  }, n, r), s;
};
m.from = function(e) {
  return e instanceof m ? e : e && e.length ? new U(e) : m.empty;
};
var U = /* @__PURE__ */ (function(t) {
  function e(r) {
    t.call(this), this.values = r;
  }
  t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
  var n = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(s, i) {
    return s == 0 && i == this.length ? this : new e(this.values.slice(s, i));
  }, e.prototype.getInner = function(s) {
    return this.values[s];
  }, e.prototype.forEachInner = function(s, i, o, a) {
    for (var l = i; l < o; l++)
      if (s(this.values[l], a + l) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(s, i, o, a) {
    for (var l = i - 1; l >= o; l--)
      if (s(this.values[l], a + l) === !1)
        return !1;
  }, e.prototype.leafAppend = function(s) {
    if (this.length + s.length <= P)
      return new e(this.values.concat(s.flatten()));
  }, e.prototype.leafPrepend = function(s) {
    if (this.length + s.length <= P)
      return new e(s.flatten().concat(this.values));
  }, n.length.get = function() {
    return this.values.length;
  }, n.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, n), e;
})(m);
m.empty = new U([]);
var Ve = /* @__PURE__ */ (function(t) {
  function e(n, r) {
    t.call(this), this.left = n, this.right = r, this.length = n.length + r.length, this.depth = Math.max(n.depth, r.depth) + 1;
  }
  return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(r) {
    return r < this.left.length ? this.left.get(r) : this.right.get(r - this.left.length);
  }, e.prototype.forEachInner = function(r, s, i, o) {
    var a = this.left.length;
    if (s < a && this.left.forEachInner(r, s, Math.min(i, a), o) === !1 || i > a && this.right.forEachInner(r, Math.max(s - a, 0), Math.min(this.length, i) - a, o + a) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(r, s, i, o) {
    var a = this.left.length;
    if (s > a && this.right.forEachInvertedInner(r, s - a, Math.max(i, a) - a, o + a) === !1 || i < a && this.left.forEachInvertedInner(r, Math.min(s, a), i, o) === !1)
      return !1;
  }, e.prototype.sliceInner = function(r, s) {
    if (r == 0 && s == this.length)
      return this;
    var i = this.left.length;
    return s <= i ? this.left.slice(r, s) : r >= i ? this.right.slice(r - i, s - i) : this.left.slice(r, i).append(this.right.slice(0, s - i));
  }, e.prototype.leafAppend = function(r) {
    var s = this.right.leafAppend(r);
    if (s)
      return new e(this.left, s);
  }, e.prototype.leafPrepend = function(r) {
    var s = this.left.leafPrepend(r);
    if (s)
      return new e(s, this.right);
  }, e.prototype.appendInner = function(r) {
    return this.left.depth >= Math.max(this.right.depth, r.depth) + 1 ? new e(this.left, new e(this.right, r)) : new e(this, r);
  }, e;
})(m);
const Ke = 500;
class M {
  constructor(e, n) {
    this.items = e, this.eventCount = n;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, n) {
    if (this.eventCount == 0)
      return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let s, i;
    n && (s = this.remapping(r, this.items.length), i = s.maps.length);
    let o = e.tr, a, l, p = [], c = [];
    return this.items.forEach((u, d) => {
      if (!u.step) {
        s || (s = this.remapping(r, d + 1), i = s.maps.length), i--, c.push(u);
        return;
      }
      if (s) {
        c.push(new v(u.map));
        let f = u.step.map(s.slice(i)), y;
        f && o.maybeStep(f).doc && (y = o.mapping.maps[o.mapping.maps.length - 1], p.push(new v(y, void 0, void 0, p.length + c.length))), i--, y && s.appendMap(y, i);
      } else
        o.maybeStep(u.step);
      if (u.selection)
        return a = s ? u.selection.map(s.slice(i)) : u.selection, l = new M(this.items.slice(0, r).append(c.reverse().concat(p)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: l, transform: o, selection: a };
  }
  // Create a new branch with the given transform added.
  addTransform(e, n, r, s) {
    let i = [], o = this.eventCount, a = this.items, l = !s && a.length ? a.get(a.length - 1) : null;
    for (let c = 0; c < e.steps.length; c++) {
      let u = e.steps[c].invert(e.docs[c]), d = new v(e.mapping.maps[c], u, n), f;
      (f = l && l.merge(d)) && (d = f, c ? i.pop() : a = a.slice(0, a.length - 1)), i.push(d), n && (o++, n = void 0), s || (l = d);
    }
    let p = o - r.depth;
    return p > Fe && (a = ze(a, p), o -= p), new M(a.append(i), o);
  }
  remapping(e, n) {
    let r = new ae();
    return this.items.forEach((s, i) => {
      let o = s.mirrorOffset != null && i - s.mirrorOffset >= e ? r.maps.length - s.mirrorOffset : void 0;
      r.appendMap(s.map, o);
    }, e, n), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new M(this.items.append(e.map((n) => new v(n))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, n) {
    if (!this.eventCount)
      return this;
    let r = [], s = Math.max(0, this.items.length - n), i = e.mapping, o = e.steps.length, a = this.eventCount;
    this.items.forEach((d) => {
      d.selection && a--;
    }, s);
    let l = n;
    this.items.forEach((d) => {
      let f = i.getMirror(--l);
      if (f == null)
        return;
      o = Math.min(o, f);
      let y = i.maps[f];
      if (d.step) {
        let A = e.steps[f].invert(e.docs[f]), I = d.selection && d.selection.map(i.slice(l + 1, f));
        I && a++, r.push(new v(y, A, I));
      } else
        r.push(new v(y));
    }, s);
    let p = [];
    for (let d = n; d < o; d++)
      p.push(new v(i.maps[d]));
    let c = this.items.slice(0, s).append(p).append(r), u = new M(c, a);
    return u.emptyItemCount() > Ke && (u = u.compress(this.items.length - r.length)), u;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((n) => {
      n.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let n = this.remapping(0, e), r = n.maps.length, s = [], i = 0;
    return this.items.forEach((o, a) => {
      if (a >= e)
        s.push(o), o.selection && i++;
      else if (o.step) {
        let l = o.step.map(n.slice(r)), p = l && l.getMap();
        if (r--, p && n.appendMap(p, r), l) {
          let c = o.selection && o.selection.map(n.slice(r));
          c && i++;
          let u = new v(p.invert(), l, c), d, f = s.length - 1;
          (d = s.length && s[f].merge(u)) ? s[f] = d : s.push(u);
        }
      } else o.map && r--;
    }, this.items.length, 0), new M(m.from(s.reverse()), i);
  }
}
M.empty = new M(m.empty, 0);
function ze(t, e) {
  let n;
  return t.forEach((r, s) => {
    if (r.selection && e-- == 0)
      return n = s, !1;
  }), t.slice(n);
}
class v {
  constructor(e, n, r, s) {
    this.map = e, this.step = n, this.selection = r, this.mirrorOffset = s;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let n = e.step.merge(this.step);
      if (n)
        return new v(n.getMap().invert(), n, this.selection);
    }
  }
}
class k {
  constructor(e, n, r, s, i) {
    this.done = e, this.undone = n, this.prevRanges = r, this.prevTime = s, this.prevComposition = i;
  }
}
const Fe = 20;
function We(t, e, n, r) {
  let s = n.getMeta(T), i;
  if (s)
    return s.historyState;
  n.getMeta(qe) && (t = new k(t.done, t.undone, null, 0, -1));
  let o = n.getMeta("appendedTransaction");
  if (n.steps.length == 0)
    return t;
  if (o && o.getMeta(T))
    return o.getMeta(T).redo ? new k(t.done.addTransform(n, void 0, r, R(e)), t.undone, G(n.mapping.maps), t.prevTime, t.prevComposition) : new k(t.done, t.undone.addTransform(n, void 0, r, R(e)), null, t.prevTime, t.prevComposition);
  if (n.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
    let a = n.getMeta("composition"), l = t.prevTime == 0 || !o && t.prevComposition != a && (t.prevTime < (n.time || 0) - r.newGroupDelay || !Ge(n, t.prevRanges)), p = o ? N(t.prevRanges, n.mapping) : G(n.mapping.maps);
    return new k(t.done.addTransform(n, l ? e.selection.getBookmark() : void 0, r, R(e)), M.empty, p, n.time, a ?? t.prevComposition);
  } else return (i = n.getMeta("rebased")) ? new k(t.done.rebased(n, i), t.undone.rebased(n, i), N(t.prevRanges, n.mapping), t.prevTime, t.prevComposition) : new k(t.done.addMaps(n.mapping.maps), t.undone.addMaps(n.mapping.maps), N(t.prevRanges, n.mapping), t.prevTime, t.prevComposition);
}
function Ge(t, e) {
  if (!e)
    return !1;
  if (!t.docChanged)
    return !0;
  let n = !1;
  return t.mapping.maps[0].forEach((r, s) => {
    for (let i = 0; i < e.length; i += 2)
      r <= e[i + 1] && s >= e[i] && (n = !0);
  }), n;
}
function G(t) {
  let e = [];
  for (let n = t.length - 1; n >= 0 && e.length == 0; n--)
    t[n].forEach((r, s, i, o) => e.push(i, o));
  return e;
}
function N(t, e) {
  if (!t)
    return null;
  let n = [];
  for (let r = 0; r < t.length; r += 2) {
    let s = e.map(t[r], 1), i = e.map(t[r + 1], -1);
    s <= i && n.push(s, i);
  }
  return n;
}
function je(t, e, n) {
  let r = R(e), s = T.get(e).spec.config, i = (n ? t.undone : t.done).popEvent(e, r);
  if (!i)
    return null;
  let o = i.selection.resolve(i.transform.doc), a = (n ? t.done : t.undone).addTransform(i.transform, e.selection.getBookmark(), s, r), l = new k(n ? a : i.remaining, n ? i.remaining : a, null, 0, -1);
  return i.transform.setSelection(o).setMeta(T, { redo: n, historyState: l });
}
let _ = !1, j = null;
function R(t) {
  let e = t.plugins;
  if (j != e) {
    _ = !1, j = e;
    for (let n = 0; n < e.length; n++)
      if (e[n].spec.historyPreserveItems) {
        _ = !0;
        break;
      }
  }
  return _;
}
const T = new $("history"), qe = new $("closeHistory");
function Xe(t = {}) {
  return t = {
    depth: t.depth || 100,
    newGroupDelay: t.newGroupDelay || 500
  }, new O({
    key: T,
    state: {
      init() {
        return new k(M.empty, M.empty, null, 0, -1);
      },
      apply(e, n, r) {
        return We(n, r, e, t);
      }
    },
    config: t,
    props: {
      handleDOMEvents: {
        beforeinput(e, n) {
          let r = n.inputType, s = r == "historyUndo" ? Q : r == "historyRedo" ? ee : null;
          return !s || !e.editable ? !1 : (n.preventDefault(), s(e.state, e.dispatch));
        }
      }
    }
  });
}
function Z(t, e) {
  return (n, r) => {
    let s = T.getState(n);
    if (!s || (t ? s.undone : s.done).eventCount == 0)
      return !1;
    if (r) {
      let i = je(s, n, t);
      i && r(e ? i.scrollIntoView() : i);
    }
    return !0;
  };
}
const Q = Z(!1, !0), ee = Z(!0, !0), Ye = B.create({
  name: "history",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: t, dispatch: e }) => Q(t, e),
      redo: () => ({ state: t, dispatch: e }) => ee(t, e)
    };
  },
  addProseMirrorPlugins() {
    return [
      Xe(this.options)
    ];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-я": () => this.editor.commands.undo(),
      "Shift-Mod-я": () => this.editor.commands.redo()
    };
  }
}), Je = b.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["hr", g(this.options.HTMLAttributes, t)];
  },
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain: t, state: e }) => {
        if (!ue(e, e.schema.nodes[this.name]))
          return !1;
        const { selection: n } = e, { $from: r, $to: s } = n, i = t();
        return r.parentOffset === 0 ? i.insertContentAt({
          from: Math.max(r.pos - 1, 0),
          to: s.pos
        }, {
          type: this.name
        }) : pe(n) ? i.insertContentAt(s.pos, {
          type: this.name
        }) : i.insertContent({ type: this.name }), i.command(({ tr: o, dispatch: a }) => {
          var l;
          if (a) {
            const { $to: p } = o.selection, c = p.end();
            if (p.nodeAfter)
              p.nodeAfter.isTextblock ? o.setSelection(w.create(o.doc, p.pos + 1)) : p.nodeAfter.isBlock ? o.setSelection(V.create(o.doc, p.pos)) : o.setSelection(w.create(o.doc, p.pos));
            else {
              const u = (l = p.parent.type.contentMatch.defaultType) === null || l === void 0 ? void 0 : l.create();
              u && (o.insert(c, u), o.setSelection(w.create(o.doc, c + 1)));
            }
            o.scrollIntoView();
          }
          return !0;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      le({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
}), Ue = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, Ze = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, Qe = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, et = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, tt = E.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (t) => t.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=normal",
        clearMark: (t) => t.type.name === this.name
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["em", g(this.options.HTMLAttributes, t), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands: t }) => t.setMark(this.name),
      toggleItalic: () => ({ commands: t }) => t.toggleMark(this.name),
      unsetItalic: () => ({ commands: t }) => t.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      L({
        find: Ue,
        type: this.type
      }),
      L({
        find: Qe,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      C({
        find: Ze,
        type: this.type
      }),
      C({
        find: et,
        type: this.type
      })
    ];
  }
}), nt = b.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["li", g(this.options.HTMLAttributes, t), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), rt = "listItem", q = "textStyle", X = /^(\d+)\.\s$/, st = b.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (t) => t.hasAttribute("start") ? parseInt(t.getAttribute("start") || "", 10) : 1
      },
      type: {
        default: null,
        parseHTML: (t) => t.getAttribute("type")
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    const { start: e, ...n } = t;
    return e === 1 ? ["ol", g(this.options.HTMLAttributes, n), 0] : ["ol", g(this.options.HTMLAttributes, t), 0];
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: t, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(rt, this.editor.getAttributes(q)).run() : t.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let t = x({
      find: X,
      type: this.type,
      getAttributes: (e) => ({ start: +e[1] }),
      joinPredicate: (e, n) => n.childCount + n.attrs.start === +e[1]
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (t = x({
      find: X,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: (e) => ({ start: +e[1], ...this.editor.getAttributes(q) }),
      joinPredicate: (e, n) => n.childCount + n.attrs.start === +e[1],
      editor: this.editor
    })), [
      t
    ];
  }
}), it = b.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      { tag: "p" }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["p", g(this.options.HTMLAttributes, t), 0];
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands: t }) => t.setNode(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
}), ot = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, at = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, lt = E.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (t) => t.includes("line-through") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: t }) {
    return ["s", g(this.options.HTMLAttributes, t), 0];
  },
  addCommands() {
    return {
      setStrike: () => ({ commands: t }) => t.setMark(this.name),
      toggleStrike: () => ({ commands: t }) => t.toggleMark(this.name),
      unsetStrike: () => ({ commands: t }) => t.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-s": () => this.editor.commands.toggleStrike()
    };
  },
  addInputRules() {
    return [
      L({
        find: ot,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      C({
        find: at,
        type: this.type
      })
    ];
  }
}), ut = b.create({
  name: "text",
  group: "inline"
}), dt = B.create({
  name: "starterKit",
  addExtensions() {
    const t = [];
    return this.options.bold !== !1 && t.push(ye.configure(this.options.bold)), this.options.blockquote !== !1 && t.push(ce.configure(this.options.blockquote)), this.options.bulletList !== !1 && t.push(be.configure(this.options.bulletList)), this.options.code !== !1 && t.push(Te.configure(this.options.code)), this.options.codeBlock !== !1 && t.push(Ce.configure(this.options.codeBlock)), this.options.document !== !1 && t.push(Le.configure(this.options.document)), this.options.dropcursor !== !1 && t.push(He.configure(this.options.dropcursor)), this.options.gapcursor !== !1 && t.push(_e.configure(this.options.gapcursor)), this.options.hardBreak !== !1 && t.push(De.configure(this.options.hardBreak)), this.options.heading !== !1 && t.push($e.configure(this.options.heading)), this.options.history !== !1 && t.push(Ye.configure(this.options.history)), this.options.horizontalRule !== !1 && t.push(Je.configure(this.options.horizontalRule)), this.options.italic !== !1 && t.push(tt.configure(this.options.italic)), this.options.listItem !== !1 && t.push(nt.configure(this.options.listItem)), this.options.orderedList !== !1 && t.push(st.configure(this.options.orderedList)), this.options.paragraph !== !1 && t.push(it.configure(this.options.paragraph)), this.options.strike !== !1 && t.push(lt.configure(this.options.strike)), this.options.text !== !1 && t.push(ut.configure(this.options.text)), t;
  }
});
export {
  dt as StarterKit,
  dt as default
};
//# sourceMappingURL=index-BniCArwj.js.map
