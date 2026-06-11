import { ref as v, shallowRef as E, computed as U, onMounted as z, onBeforeUnmount as R, watch as y, openBlock as o, createElementBlock as r, normalizeStyle as m, normalizeClass as b, createCommentVNode as d, Fragment as x, renderList as H, toDisplayString as h, createElementVNode as B } from "vue";
const T = {
  key: 0,
  class: "primix-tiptap-divider"
}, M = ["onClick", "disabled", "aria-label", "title"], q = {
  key: 1,
  class: "primix-tiptap-footer"
}, P = { class: "text-xs text-surface-400" }, O = {
  __name: "RichEditor",
  props: {
    id: String,
    modelValue: {
      type: String,
      default: ""
    },
    toolbarButtons: {
      type: Array,
      default: () => []
    },
    disabledToolbarButtons: {
      type: Array,
      default: () => []
    },
    disabled: Boolean,
    invalid: Boolean,
    markdown: Boolean,
    maxLength: Number,
    editorHeight: String,
    stylePt: Object
  },
  emits: ["update:modelValue"],
  setup(a, { emit: w }) {
    const n = a, L = w, g = v(null), l = E(null), k = v(!1), u = {
      bold: { label: "B", labelStyle: "font-weight:700", title: "Bold" },
      italic: { label: "I", labelStyle: "font-style:italic", title: "Italic" },
      underline: { label: "U", labelStyle: "text-decoration:underline", title: "Underline" },
      strike: { label: "S", labelStyle: "text-decoration:line-through", title: "Strikethrough" },
      heading: { label: "H", labelStyle: "font-weight:700;font-size:0.85rem", title: "Heading" },
      bulletList: { icon: "pi pi-list", title: "Bullet List" },
      orderedList: { label: "1.", labelStyle: "font-weight:600;font-size:0.7rem", title: "Ordered List" },
      link: { icon: "pi pi-link", title: "Link" },
      blockquote: { label: "“", labelStyle: "font-weight:700;font-size:1.2rem;line-height:1;font-family:serif", title: "Blockquote" },
      codeBlock: { icon: "pi pi-code", title: "Code Block" },
      undo: { icon: "pi pi-undo", title: "Undo" },
      redo: { label: "↷", labelStyle: "font-size:1.1rem;line-height:1", title: "Redo" },
      horizontalRule: { label: "—", labelStyle: "font-weight:700", title: "Horizontal Rule" }
    }, S = U(() => {
      const t = new Set(n.disabledToolbarButtons);
      return n.toolbarButtons.filter((e) => e === "|" || !t.has(e));
    });
    function A(t) {
      if (!l.value) return !1;
      const e = l.value;
      switch (t) {
        case "bold":
          return e.isActive("bold");
        case "italic":
          return e.isActive("italic");
        case "underline":
          return e.isActive("underline");
        case "strike":
          return e.isActive("strike");
        case "heading":
          return e.isActive("heading");
        case "bulletList":
          return e.isActive("bulletList");
        case "orderedList":
          return e.isActive("orderedList");
        case "link":
          return e.isActive("link");
        case "blockquote":
          return e.isActive("blockquote");
        case "codeBlock":
          return e.isActive("codeBlock");
        default:
          return !1;
      }
    }
    function C(t) {
      if (!l.value) return;
      const e = l.value;
      switch (t) {
        case "bold":
          e.chain().focus().toggleBold().run();
          break;
        case "italic":
          e.chain().focus().toggleItalic().run();
          break;
        case "underline":
          e.chain().focus().toggleUnderline().run();
          break;
        case "strike":
          e.chain().focus().toggleStrike().run();
          break;
        case "heading":
          e.chain().focus().toggleHeading({ level: 2 }).run();
          break;
        case "bulletList":
          e.chain().focus().toggleBulletList().run();
          break;
        case "orderedList":
          e.chain().focus().toggleOrderedList().run();
          break;
        case "blockquote":
          e.chain().focus().toggleBlockquote().run();
          break;
        case "codeBlock":
          e.chain().focus().toggleCodeBlock().run();
          break;
        case "horizontalRule":
          e.chain().focus().setHorizontalRule().run();
          break;
        case "undo":
          e.chain().focus().undo().run();
          break;
        case "redo":
          e.chain().focus().redo().run();
          break;
        case "link": {
          const i = e.getAttributes("link").href, s = window.prompt("URL", i);
          if (s === null) return;
          s === "" ? e.chain().focus().extendMarkRange("link").unsetLink().run() : e.chain().focus().extendMarkRange("link").setLink({ href: s }).run();
          break;
        }
      }
    }
    function p(t) {
      return n.markdown ? t.storage.markdown.getMarkdown() : t.getHTML();
    }
    return z(async () => {
      const { Editor: t } = await import("./index-DCgEjc3y.js").then((c) => c.B), { default: e } = await import("./index-BniCArwj.js"), { default: i } = await import("./index-BlBq0Cg2.js"), { default: s } = await import("./index-DTPopPTz.js"), f = [
        e,
        i,
        s.configure({ openOnClick: !1 })
      ];
      if (n.maxLength) {
        const { default: c } = await import("./index-B9WxIiXE.js");
        f.push(c.configure({ limit: n.maxLength }));
      }
      if (n.markdown) {
        const { Markdown: c } = await import("./tiptap-markdown.es-D6h87Cdv.js");
        f.push(c.configure({
          html: !1,
          transformPastedText: !0
        }));
      }
      l.value = new t({
        element: g.value,
        extensions: f,
        content: n.modelValue || "",
        editable: !n.disabled,
        onUpdate: ({ editor: c }) => {
          k.value = !0, L("update:modelValue", p(c)), Promise.resolve().then(() => {
            k.value = !1;
          });
        }
      });
    }), R(() => {
      l.value?.destroy();
    }), y(() => n.modelValue, (t) => {
      k.value || l.value && p(l.value) !== t && l.value.commands.setContent(t || "", !1);
    }), y(() => n.disabled, (t) => {
      l.value?.setEditable(!t);
    }), (t, e) => (o(), r(
      "div",
      {
        class: b(["primix-tiptap-editor", {
          "primix-tiptap-invalid": a.invalid,
          "primix-tiptap-disabled": a.disabled
        }]),
        style: m(a.stylePt?.container)
      },
      [
        d(" Toolbar "),
        l.value ? (o(), r(
          "div",
          {
            key: 0,
            class: "primix-tiptap-toolbar",
            style: m(a.stylePt?.toolbar)
          },
          [
            (o(!0), r(
              x,
              null,
              H(S.value, (i, s) => (o(), r(
                x,
                { key: s },
                [
                  i === "|" ? (o(), r("span", T)) : (o(), r("button", {
                    key: 1,
                    type: "button",
                    class: b(["primix-tiptap-btn", { "primix-tiptap-btn-active": A(i) }]),
                    onClick: (f) => C(i),
                    disabled: a.disabled,
                    "aria-label": u[i]?.title || i,
                    title: u[i]?.title || i
                  }, [
                    u[i]?.icon ? (o(), r(
                      "i",
                      {
                        key: 0,
                        class: b(u[i].icon)
                      },
                      null,
                      2
                      /* CLASS */
                    )) : (o(), r(
                      "span",
                      {
                        key: 1,
                        style: m(u[i]?.labelStyle)
                      },
                      h(u[i]?.label || "?"),
                      5
                      /* TEXT, STYLE */
                    ))
                  ], 10, M))
                ],
                64
                /* STABLE_FRAGMENT */
              ))),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          4
          /* STYLE */
        )) : d("v-if", !0),
        d(" Editor content "),
        B(
          "div",
          {
            ref_key: "editorElement",
            ref: g,
            class: "primix-tiptap-content",
            style: m({
              minHeight: a.editorHeight || "200px",
              ...a.stylePt?.content || {}
            })
          },
          null,
          4
          /* STYLE */
        ),
        d(" Character count "),
        a.maxLength && l.value ? (o(), r("div", q, [
          B(
            "span",
            P,
            h(l.value.storage.characterCount?.characters() ?? 0) + " / " + h(a.maxLength),
            1
            /* TEXT */
          )
        ])) : d("v-if", !0)
      ],
      6
      /* CLASS, STYLE */
    ));
  }
};
export {
  O as default
};
//# sourceMappingURL=RichEditor-pWO2DIzQ.js.map
