import { E as l, P as h, c as f } from "./index-DCgEjc3y.js";
const C = l.create({
  name: "characterCount",
  addOptions() {
    return {
      limit: null,
      mode: "textSize",
      textCounter: (e) => e.length,
      wordCounter: (e) => e.split(" ").filter((t) => t !== "").length
    };
  },
  addStorage() {
    return {
      characters: () => 0,
      words: () => 0
    };
  },
  onBeforeCreate() {
    this.storage.characters = (e) => {
      const t = e?.node || this.editor.state.doc;
      if ((e?.mode || this.options.mode) === "textSize") {
        const n = t.textBetween(0, t.content.size, void 0, " ");
        return this.options.textCounter(n);
      }
      return t.nodeSize;
    }, this.storage.words = (e) => {
      const t = e?.node || this.editor.state.doc, i = t.textBetween(0, t.content.size, " ", " ");
      return this.options.wordCounter(i);
    };
  },
  addProseMirrorPlugins() {
    let e = !1;
    return [
      new h({
        key: new f("characterCount"),
        appendTransaction: (t, i, n) => {
          if (e)
            return;
          const r = this.options.limit;
          if (r == null || r === 0) {
            e = !0;
            return;
          }
          const o = this.storage.characters({ node: n.doc });
          if (o > r) {
            const c = o - r, s = 0, a = c;
            console.warn(`[CharacterCount] Initial content exceeded limit of ${r} characters. Content was automatically trimmed.`);
            const d = n.tr.deleteRange(s, a);
            return e = !0, d;
          }
          e = !0;
        },
        filterTransaction: (t, i) => {
          const n = this.options.limit;
          if (!t.docChanged || n === 0 || n === null || n === void 0)
            return !0;
          const r = this.storage.characters({ node: i.doc }), o = this.storage.characters({ node: t.doc });
          if (o <= n || r > n && o > n && o <= r)
            return !0;
          if (r > n && o > n && o > r || !t.getMeta("paste"))
            return !1;
          const s = t.selection.$head.pos, a = o - n, d = s - a, u = s;
          return t.deleteRange(d, u), !(this.storage.characters({ node: t.doc }) > n);
        }
      })
    ];
  }
});
export {
  C as CharacterCount,
  C as default
};
//# sourceMappingURL=index-B9WxIiXE.js.map
