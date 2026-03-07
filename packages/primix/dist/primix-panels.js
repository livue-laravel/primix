import LiVue from "livue";
import { ref, onMounted, onBeforeUnmount, openBlock, createElementBlock, renderSlot, createVNode, Transition, withCtx, createCommentVNode, withDirectives, createElementVNode, vShow, createBlock, onUnmounted, TransitionGroup, Fragment, renderList, normalizeClass, toDisplayString, computed, resolveComponent, resolveDynamicComponent, createTextVNode, h, mergeProps, defineComponent, withKeys, withModifiers, vModelText, Teleport, inject, watch, nextTick } from "vue";
const _hoisted_1$9 = { key: 0 };
const _sfc_main$b = {
  __name: "Dropdown",
  setup(__props) {
    const container = ref(null);
    const open = ref(false);
    function toggle() {
      open.value = !open.value;
    }
    function close() {
      open.value = false;
    }
    function onClickOutside(event) {
      if (open.value && container.value && !container.value.contains(event.target)) {
        close();
      }
    }
    onMounted(() => {
      document.addEventListener("click", onClickOutside);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("click", onClickOutside);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          ref_key: "container",
          ref: container,
          class: "relative"
        },
        [
          renderSlot(_ctx.$slots, "trigger", {
            open: open.value,
            toggle
          }),
          createVNode(Transition, {
            "enter-active-class": "transition ease-out duration-100",
            "enter-from-class": "transform opacity-0 scale-95",
            "enter-to-class": "transform opacity-100 scale-100",
            "leave-active-class": "transition ease-in duration-75",
            "leave-from-class": "transform opacity-100 scale-100",
            "leave-to-class": "transform opacity-0 scale-95"
          }, {
            default: withCtx(() => [
              open.value ? (openBlock(), createElementBlock("div", _hoisted_1$9, [
                renderSlot(_ctx.$slots, "default", { close })
              ])) : createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          })
        ],
        512
        /* NEED_PATCH */
      );
    };
  }
};
const _sfc_main$a = {
  __name: "Collapsible",
  props: {
    defaultOpen: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const open = ref(props.defaultOpen);
    function toggle() {
      open.value = !open.value;
    }
    function onBeforeEnter(el) {
      el.style.height = "0";
      el.style.overflow = "hidden";
    }
    function onEnter(el) {
      el.style.height = el.scrollHeight + "px";
      el.style.transition = "height 0.2s ease";
    }
    function onAfterEnter(el) {
      el.style.height = "";
      el.style.overflow = "";
      el.style.transition = "";
    }
    function onBeforeLeave(el) {
      el.style.height = el.scrollHeight + "px";
      el.style.overflow = "hidden";
    }
    function onLeave(el) {
      el.offsetHeight;
      el.style.height = "0";
      el.style.transition = "height 0.2s ease";
    }
    function onAfterLeave(el) {
      el.style.height = "";
      el.style.overflow = "";
      el.style.transition = "";
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        renderSlot(_ctx.$slots, "trigger", {
          open: open.value,
          toggle
        }),
        createVNode(Transition, {
          onBeforeEnter,
          onEnter,
          onAfterEnter,
          onBeforeLeave,
          onLeave,
          onAfterLeave,
          persisted: ""
        }, {
          default: withCtx(() => [
            withDirectives(createElementVNode(
              "div",
              null,
              [
                renderSlot(_ctx.$slots, "default")
              ],
              512
              /* NEED_PATCH */
            ), [
              [vShow, open.value]
            ])
          ]),
          _: 3
          /* FORWARDED */
        })
      ]);
    };
  }
};
const _hoisted_1$8 = { key: 0 };
const _sfc_main$9 = {
  __name: "Toast",
  props: {
    duration: {
      type: Number,
      default: 5e3
    }
  },
  setup(__props) {
    const props = __props;
    const visible = ref(true);
    function close() {
      visible.value = false;
    }
    onMounted(() => {
      if (props.duration > 0) {
        setTimeout(close, props.duration);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        "enter-active-class": "transform ease-out duration-300 transition",
        "enter-from-class": "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",
        "enter-to-class": "translate-y-0 opacity-100 sm:translate-x-0",
        "leave-active-class": "transition ease-in duration-100",
        "leave-from-class": "opacity-100",
        "leave-to-class": "opacity-0"
      }, {
        default: withCtx(() => [
          visible.value ? (openBlock(), createElementBlock("div", _hoisted_1$8, [
            renderSlot(_ctx.$slots, "default", { close })
          ])) : createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      });
    };
  }
};
const _hoisted_1$7 = { class: "p-4" };
const _hoisted_2$7 = { class: "flex items-start" };
const _hoisted_3$7 = {
  key: 0,
  class: "flex-shrink-0"
};
const _hoisted_4$7 = { class: "ml-3 w-0 flex-1 pt-0.5" };
const _hoisted_5$7 = {
  key: 0,
  class: "text-sm font-medium text-gray-900 dark:text-white"
};
const _hoisted_6$6 = {
  key: 1,
  class: "mt-1 text-sm text-gray-500 dark:text-gray-400"
};
const _hoisted_7$6 = {
  key: 1,
  class: "ml-4 flex flex-shrink-0"
};
const _hoisted_8$5 = ["onClick"];
const _sfc_main$8 = {
  __name: "NotificationToasts",
  setup(__props) {
    const notifications = ref([]);
    let nextId = 0;
    const colorMap = {
      success: "text-green-400",
      danger: "text-red-400",
      warning: "text-yellow-400",
      info: "text-blue-400",
      primary: "text-blue-400",
      gray: "text-gray-400"
    };
    function colorClass(color) {
      return colorMap[color] || "text-gray-400";
    }
    function dismiss(id) {
      notifications.value = notifications.value.filter((n) => n.id !== id);
    }
    function handleNotification(event) {
      const data = event.detail;
      const id = ++nextId;
      const notification = { ...data, id };
      notifications.value.push(notification);
      const duration = data.duration ?? 5e3;
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
    }
    onMounted(() => {
      window.addEventListener("primix:notification", handleNotification);
    });
    onUnmounted(() => {
      window.removeEventListener("primix:notification", handleNotification);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(TransitionGroup, {
        "enter-active-class": "transform ease-out duration-300 transition",
        "enter-from-class": "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",
        "enter-to-class": "translate-y-0 opacity-100 sm:translate-x-0",
        "leave-active-class": "transition ease-in duration-100",
        "leave-from-class": "opacity-100",
        "leave-to-class": "opacity-0"
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(notifications.value, (notification) => {
              return openBlock(), createElementBlock("div", {
                key: notification.id,
                class: "pointer-events-auto mb-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
              }, [
                createElementVNode("div", _hoisted_1$7, [
                  createElementVNode("div", _hoisted_2$7, [
                    notification.icon ? (openBlock(), createElementBlock("div", _hoisted_3$7, [
                      notification.icon === "heroicon-o-check-circle" ? (openBlock(), createElementBlock(
                        "svg",
                        {
                          key: 0,
                          class: normalizeClass(["h-6 w-6", colorClass(notification.color)]),
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor"
                        },
                        [..._cache[0] || (_cache[0] = [
                          createElementVNode(
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
                      )) : notification.icon === "heroicon-o-exclamation-triangle" ? (openBlock(), createElementBlock(
                        "svg",
                        {
                          key: 1,
                          class: normalizeClass(["h-6 w-6", colorClass(notification.color)]),
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor"
                        },
                        [..._cache[1] || (_cache[1] = [
                          createElementVNode(
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
                      )) : notification.icon === "heroicon-o-x-circle" ? (openBlock(), createElementBlock(
                        "svg",
                        {
                          key: 2,
                          class: normalizeClass(["h-6 w-6", colorClass(notification.color)]),
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor"
                        },
                        [..._cache[2] || (_cache[2] = [
                          createElementVNode(
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
                      )) : notification.icon === "heroicon-o-information-circle" ? (openBlock(), createElementBlock(
                        "svg",
                        {
                          key: 3,
                          class: normalizeClass(["h-6 w-6", colorClass(notification.color)]),
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor"
                        },
                        [..._cache[3] || (_cache[3] = [
                          createElementVNode(
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
                      )) : createCommentVNode("v-if", true)
                    ])) : createCommentVNode("v-if", true),
                    createElementVNode("div", _hoisted_4$7, [
                      notification.title ? (openBlock(), createElementBlock(
                        "p",
                        _hoisted_5$7,
                        toDisplayString(notification.title),
                        1
                        /* TEXT */
                      )) : createCommentVNode("v-if", true),
                      notification.body ? (openBlock(), createElementBlock(
                        "p",
                        _hoisted_6$6,
                        toDisplayString(notification.body),
                        1
                        /* TEXT */
                      )) : createCommentVNode("v-if", true)
                    ]),
                    notification.closeable !== false ? (openBlock(), createElementBlock("div", _hoisted_7$6, [
                      createElementVNode("button", {
                        onClick: ($event) => dismiss(notification.id),
                        type: "button",
                        class: "inline-flex rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      }, [..._cache[4] || (_cache[4] = [
                        createElementVNode(
                          "span",
                          { class: "sr-only" },
                          "Close",
                          -1
                          /* CACHED */
                        ),
                        createElementVNode(
                          "svg",
                          {
                            class: "h-5 w-5",
                            viewBox: "0 0 20 20",
                            fill: "currentColor"
                          },
                          [
                            createElementVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                              "clip-rule": "evenodd"
                            })
                          ],
                          -1
                          /* CACHED */
                        )
                      ])], 8, _hoisted_8$5)
                    ])) : createCommentVNode("v-if", true)
                  ])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
};
const _hoisted_1$6 = ["onClick"];
const _hoisted_2$6 = {
  key: 0,
  class: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor"
};
const _hoisted_3$6 = { class: "absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none" };
const _hoisted_4$6 = { class: "py-1" };
const _hoisted_5$6 = ["onClick"];
const STORAGE_KEY = "primix-color-mode";
const _sfc_main$7 = {
  __name: "ThemeToggle",
  setup(__props) {
    const SunIcon = {
      render() {
        return h("svg", { fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" })
        ]);
      }
    };
    const MoonIcon = {
      render() {
        return h("svg", { fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" })
        ]);
      }
    };
    const MonitorIcon = {
      render() {
        return h("svg", { fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" })
        ]);
      }
    };
    const options = [
      { value: "light", label: "Light", icon: SunIcon },
      { value: "dark", label: "Dark", icon: MoonIcon },
      { value: "system", label: "System", icon: MonitorIcon }
    ];
    const mode = ref("system");
    const systemPrefersDark = ref(false);
    const effectiveMode = computed(() => {
      if (mode.value === "system") {
        return systemPrefersDark.value ? "dark" : "light";
      }
      return mode.value;
    });
    let mediaQuery = null;
    function applyTheme() {
      if (effectiveMode.value === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    function setMode(newMode) {
      mode.value = newMode;
      localStorage.setItem(STORAGE_KEY, newMode);
      applyTheme();
    }
    function onSystemChange(e) {
      systemPrefersDark.value = e.matches;
      if (mode.value === "system") {
        applyTheme();
      }
    }
    onMounted(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && ["light", "dark", "system"].includes(stored)) {
        mode.value = stored;
      }
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      systemPrefersDark.value = mediaQuery.matches;
      mediaQuery.addEventListener("change", onSystemChange);
      applyTheme();
    });
    onBeforeUnmount(() => {
      if (mediaQuery) {
        mediaQuery.removeEventListener("change", onSystemChange);
      }
    });
    return (_ctx, _cache) => {
      const _component_PrimixDropdown = resolveComponent("PrimixDropdown");
      return openBlock(), createBlock(_component_PrimixDropdown, null, {
        trigger: withCtx(({ toggle }) => [
          createElementVNode("button", {
            type: "button",
            class: "-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300",
            onClick: toggle
          }, [
            _cache[2] || (_cache[2] = createElementVNode(
              "span",
              { class: "sr-only" },
              "Toggle theme",
              -1
              /* CACHED */
            )),
            createCommentVNode(" Sun icon (light mode) "),
            effectiveMode.value === "light" ? (openBlock(), createElementBlock("svg", _hoisted_2$6, [..._cache[0] || (_cache[0] = [
              createElementVNode(
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
            ])])) : (openBlock(), createElementBlock(
              Fragment,
              { key: 1 },
              [
                createCommentVNode(" Moon icon (dark mode) "),
                _cache[1] || (_cache[1] = createElementVNode(
                  "svg",
                  {
                    class: "h-6 w-6",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor"
                  },
                  [
                    createElementVNode("path", {
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
          ], 8, _hoisted_1$6)
        ]),
        default: withCtx(({ close }) => [
          createElementVNode("div", _hoisted_3$6, [
            createElementVNode("div", _hoisted_4$6, [
              (openBlock(), createElementBlock(
                Fragment,
                null,
                renderList(options, (option) => {
                  return createElementVNode("button", {
                    key: option.value,
                    type: "button",
                    class: normalizeClass(["flex w-full items-center gap-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700", { "bg-gray-50 dark:bg-gray-700/50 font-medium": mode.value === option.value }]),
                    onClick: ($event) => {
                      setMode(option.value);
                      close();
                    }
                  }, [
                    (openBlock(), createBlock(resolveDynamicComponent(option.icon), { class: "h-4 w-4" })),
                    createTextVNode(
                      " " + toDisplayString(option.label),
                      1
                      /* TEXT */
                    )
                  ], 10, _hoisted_5$6);
                }),
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
};
const _hoisted_1$5 = ["onClick"];
const _hoisted_2$5 = ["src", "alt"];
const _hoisted_3$5 = {
  key: 1,
  class: "flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300"
};
const _hoisted_4$5 = { class: "hidden lg:flex lg:items-center" };
const _hoisted_5$5 = { class: "ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-white" };
const _hoisted_6$5 = { class: "absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none" };
const _hoisted_7$5 = { class: "px-4 py-3 border-b border-gray-100 dark:border-gray-700" };
const _hoisted_8$4 = { class: "text-sm font-medium text-gray-900 dark:text-white truncate" };
const _hoisted_9$3 = {
  key: 0,
  class: "text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5"
};
const _hoisted_10$3 = { class: "py-1" };
const _hoisted_11$2 = ["href", "onClick"];
const _hoisted_12 = { class: "py-1" };
const _hoisted_13 = ["onClick"];
const _sfc_main$6 = {
  __name: "UserMenu",
  props: {
    userMenu: {
      type: Object,
      default: () => ({})
    },
    spa: {
      type: Boolean,
      default: false
    },
    csrfToken: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const initials = computed(() => {
      const name = props.userMenu.userName ?? "";
      if (!name) return "?";
      return name.split(" ").map((part) => part.charAt(0)).slice(0, 2).join("").toUpperCase();
    });
    const regularItems = computed(() => {
      return (props.userMenu.items ?? []).filter((item) => !item.isPostAction);
    });
    const postItems = computed(() => {
      return (props.userMenu.items ?? []).filter((item) => item.isPostAction);
    });
    function colorClass(color) {
      if (color === "danger") {
        return "text-red-600 dark:text-red-400";
      }
      return "text-gray-700 dark:text-gray-300";
    }
    function submitPost(url) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = url;
      const csrfInput = document.createElement("input");
      csrfInput.type = "hidden";
      csrfInput.name = "_token";
      csrfInput.value = props.csrfToken;
      form.appendChild(csrfInput);
      document.body.appendChild(form);
      form.submit();
    }
    return (_ctx, _cache) => {
      const _component_PrimixDropdown = resolveComponent("PrimixDropdown");
      return openBlock(), createBlock(_component_PrimixDropdown, null, {
        trigger: withCtx(({ toggle }) => [
          createElementVNode("button", {
            type: "button",
            class: "-m-1.5 flex items-center p-1.5",
            onClick: toggle
          }, [
            _cache[1] || (_cache[1] = createElementVNode(
              "span",
              { class: "sr-only" },
              "Open user menu",
              -1
              /* CACHED */
            )),
            createCommentVNode(" Avatar "),
            __props.userMenu.avatarUrl ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: __props.userMenu.avatarUrl,
              alt: __props.userMenu.userName,
              class: "h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 object-cover"
            }, null, 8, _hoisted_2$5)) : (openBlock(), createElementBlock(
              "span",
              _hoisted_3$5,
              toDisplayString(initials.value),
              1
              /* TEXT */
            )),
            createElementVNode("span", _hoisted_4$5, [
              createElementVNode(
                "span",
                _hoisted_5$5,
                toDisplayString(__props.userMenu.userName ?? "User"),
                1
                /* TEXT */
              ),
              _cache[0] || (_cache[0] = createElementVNode(
                "svg",
                {
                  class: "ml-2 h-5 w-5 text-gray-400",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                },
                [
                  createElementVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
                    "clip-rule": "evenodd"
                  })
                ],
                -1
                /* CACHED */
              ))
            ])
          ], 8, _hoisted_1$5)
        ]),
        default: withCtx(({ close }) => [
          createElementVNode("div", _hoisted_6$5, [
            createCommentVNode(" User info header "),
            createElementVNode("div", _hoisted_7$5, [
              createElementVNode(
                "p",
                _hoisted_8$4,
                toDisplayString(__props.userMenu.userName),
                1
                /* TEXT */
              ),
              __props.userMenu.userEmail ? (openBlock(), createElementBlock(
                "p",
                _hoisted_9$3,
                toDisplayString(__props.userMenu.userEmail),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true)
            ]),
            createCommentVNode(" Menu items "),
            createElementVNode("div", _hoisted_10$3, [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(regularItems.value, (item, index) => {
                  return openBlock(), createElementBlock("a", mergeProps({
                    key: index,
                    href: item.url
                  }, { ref_for: true }, __props.spa ? { "data-livue-navigate": "true" } : {}, {
                    class: "flex w-full items-center gap-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                    onClick: close
                  }), toDisplayString(item.label), 17, _hoisted_11$2);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            createCommentVNode(" Logout (post actions) "),
            postItems.value.length > 0 ? (openBlock(), createElementBlock(
              Fragment,
              { key: 0 },
              [
                _cache[2] || (_cache[2] = createElementVNode(
                  "div",
                  { class: "border-t border-gray-100 dark:border-gray-700" },
                  null,
                  -1
                  /* CACHED */
                )),
                createElementVNode("div", _hoisted_12, [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(postItems.value, (item, index) => {
                      return openBlock(), createElementBlock("button", {
                        key: "post-" + index,
                        type: "button",
                        class: normalizeClass(["flex w-full items-center gap-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700", colorClass(item.color)]),
                        onClick: ($event) => {
                          submitPost(item.url);
                          close();
                        }
                      }, toDisplayString(item.label), 11, _hoisted_13);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            )) : createCommentVNode("v-if", true)
          ])
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
};
const _hoisted_1$4 = ["onClick"];
const _hoisted_2$4 = { class: "hidden lg:flex lg:items-center" };
const _hoisted_3$4 = { class: "ml-2 text-sm font-semibold leading-6 text-gray-900 dark:text-white" };
const _hoisted_4$4 = { class: "absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none" };
const _hoisted_5$4 = { class: "px-4 py-3 border-b border-gray-100 dark:border-gray-700" };
const _hoisted_6$4 = { class: "text-sm font-semibold text-gray-900 dark:text-white truncate mt-1" };
const _hoisted_7$4 = {
  key: 0,
  class: "py-1"
};
const _hoisted_8$3 = ["href", "onClick"];
const _hoisted_9$2 = { class: "truncate" };
const _hoisted_10$2 = { class: "py-1" };
const _hoisted_11$1 = ["href", "onClick"];
const _sfc_main$5 = {
  __name: "TenantMenu",
  props: {
    tenantMenu: {
      type: Object,
      default: () => ({})
    },
    spa: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const menuItems = computed(() => {
      return props.tenantMenu.items ?? [];
    });
    return (_ctx, _cache) => {
      const _component_PrimixDropdown = resolveComponent("PrimixDropdown");
      return openBlock(), createBlock(_component_PrimixDropdown, null, {
        trigger: withCtx(({ toggle }) => [
          createElementVNode("button", {
            type: "button",
            class: "-m-1.5 flex items-center p-1.5",
            onClick: toggle
          }, [
            _cache[1] || (_cache[1] = createElementVNode(
              "span",
              { class: "sr-only" },
              "Open tenant menu",
              -1
              /* CACHED */
            )),
            createCommentVNode(" Building icon "),
            _cache[2] || (_cache[2] = createElementVNode(
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
                createElementVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                })
              ],
              -1
              /* CACHED */
            )),
            createElementVNode("span", _hoisted_2$4, [
              createElementVNode(
                "span",
                _hoisted_3$4,
                toDisplayString(__props.tenantMenu.currentTenantName ?? "Tenant"),
                1
                /* TEXT */
              ),
              _cache[0] || (_cache[0] = createElementVNode(
                "svg",
                {
                  class: "ml-2 h-5 w-5 text-gray-400",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                },
                [
                  createElementVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
                    "clip-rule": "evenodd"
                  })
                ],
                -1
                /* CACHED */
              ))
            ])
          ], 8, _hoisted_1$4)
        ]),
        default: withCtx(({ close }) => [
          createElementVNode("div", _hoisted_4$4, [
            createCommentVNode(" Current tenant header "),
            createElementVNode("div", _hoisted_5$4, [
              _cache[3] || (_cache[3] = createElementVNode(
                "p",
                { class: "text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" },
                " Current tenant ",
                -1
                /* CACHED */
              )),
              createElementVNode(
                "p",
                _hoisted_6$4,
                toDisplayString(__props.tenantMenu.currentTenantName),
                1
                /* TEXT */
              )
            ]),
            createCommentVNode(" Switch to other tenants "),
            __props.tenantMenu.tenants && __props.tenantMenu.tenants.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_7$4, [
              _cache[5] || (_cache[5] = createElementVNode(
                "p",
                { class: "px-4 py-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" },
                " Switch to ",
                -1
                /* CACHED */
              )),
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(__props.tenantMenu.tenants, (tenant) => {
                  return openBlock(), createElementBlock("a", {
                    key: tenant.id,
                    href: tenant.url,
                    class: "flex w-full items-center gap-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                    onClick: close
                  }, [
                    _cache[4] || (_cache[4] = createElementVNode(
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
                        createElementVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                        })
                      ],
                      -1
                      /* CACHED */
                    )),
                    createElementVNode(
                      "span",
                      _hoisted_9$2,
                      toDisplayString(tenant.name),
                      1
                      /* TEXT */
                    )
                  ], 8, _hoisted_8$3);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : createCommentVNode("v-if", true),
            createCommentVNode(" Custom menu items "),
            menuItems.value.length > 0 ? (openBlock(), createElementBlock(
              Fragment,
              { key: 1 },
              [
                _cache[6] || (_cache[6] = createElementVNode(
                  "div",
                  { class: "border-t border-gray-100 dark:border-gray-700" },
                  null,
                  -1
                  /* CACHED */
                )),
                createElementVNode("div", _hoisted_10$2, [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(menuItems.value, (item, index) => {
                      return openBlock(), createElementBlock("a", mergeProps({
                        key: "item-" + index,
                        href: item.url
                      }, { ref_for: true }, __props.spa ? { "data-livue-navigate": "true" } : {}, {
                        class: "flex w-full items-center gap-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                        onClick: close
                      }), toDisplayString(item.label), 17, _hoisted_11$1);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            )) : createCommentVNode("v-if", true)
          ])
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const SearchResults = defineComponent({
  name: "SearchResults",
  props: {
    groups: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    query: { type: String, default: "" },
    selectedIndex: { type: Number, default: -1 },
    spa: { type: Boolean, default: false }
  },
  emits: ["select"],
  setup(props, { emit }) {
    let flatIndex = -1;
    return () => {
      flatIndex = -1;
      if (!props.loading && props.query.length >= 2 && props.groups.length === 0) {
        return h("div", { class: "px-6 py-14 text-center text-sm text-gray-500 dark:text-gray-400" }, [
          h("svg", {
            class: "mx-auto h-6 w-6 text-gray-400 mb-2",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor"
          }, [
            h("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            })
          ]),
          h("p", "No results found.")
        ]);
      }
      if (props.query.length < 2 && props.groups.length === 0) {
        return null;
      }
      return h("div", { class: "py-2" }, props.groups.map((group) => {
        return h("div", { key: group.label }, [
          // Group header
          h("div", { class: "px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-x-2" }, [
            group.label,
            group.panelLabel ? h("span", {
              class: "inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300 normal-case tracking-normal"
            }, group.panelLabel) : null
          ]),
          // Results
          ...group.results.map((result) => {
            flatIndex++;
            const currentIndex = flatIndex;
            const isSelected = currentIndex === props.selectedIndex;
            return h("a", {
              key: result.url,
              href: result.url,
              class: [
                "flex items-center gap-x-3 px-4 py-2.5 cursor-pointer transition-colors",
                isSelected ? "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              ],
              ...props.spa ? { "data-livue-navigate": "true" } : {},
              onClick(e) {
                e.preventDefault();
                emit("select", result.url);
              }
            }, [
              h("div", { class: "flex-1 min-w-0" }, [
                h("div", { class: "text-sm font-medium truncate" }, result.title),
                Object.keys(result.details || {}).length > 0 ? h(
                  "div",
                  { class: "flex items-center gap-x-3 mt-0.5" },
                  Object.entries(result.details).map(
                    ([key, value]) => h("span", { key, class: "text-xs text-gray-500 dark:text-gray-400" }, [
                      h("span", { class: "font-medium" }, key + ": "),
                      String(value)
                    ])
                  )
                ) : null
              ]),
              isSelected ? h("svg", {
                class: "h-4 w-4 flex-shrink-0 text-gray-400",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "2",
                stroke: "currentColor"
              }, [
                h("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                })
              ]) : null
            ]);
          })
        ]);
      }));
    };
  }
});
const _sfc_main$4 = {
  name: "PrimixGlobalSearch",
  components: { SearchResults },
  props: {
    mode: {
      type: String,
      default: "spotlight",
      validator: (v) => ["spotlight", "dropdown"].includes(v)
    },
    spa: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const livue = inject("livue");
    const isOpen = ref(false);
    const query = ref("");
    const results = ref([]);
    const loading = ref(false);
    const selectedIndex = ref(-1);
    const spotlightInputRef = ref(null);
    const dropdownInputRef = ref(null);
    const spotlightRef = ref(null);
    const dropdownRef = ref(null);
    const isMac = computed(() => {
      return typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    });
    const totalResults = computed(() => {
      return results.value.reduce((sum, group) => sum + group.results.length, 0);
    });
    let debounceTimer = null;
    function open() {
      isOpen.value = true;
      query.value = "";
      results.value = [];
      selectedIndex.value = -1;
      nextTick(() => {
        if (props.mode === "spotlight" && spotlightInputRef.value) {
          spotlightInputRef.value.focus();
        } else if (props.mode === "dropdown" && dropdownInputRef.value) {
          dropdownInputRef.value.focus();
        }
      });
    }
    function close() {
      isOpen.value = false;
      query.value = "";
      results.value = [];
      selectedIndex.value = -1;
    }
    function moveSelection(delta) {
      const total = totalResults.value;
      if (total === 0) return;
      let next = selectedIndex.value + delta;
      if (next < 0) next = total - 1;
      if (next >= total) next = 0;
      selectedIndex.value = next;
    }
    function selectCurrent() {
      if (selectedIndex.value < 0 || totalResults.value === 0) return;
      let idx = 0;
      for (const group of results.value) {
        for (const result of group.results) {
          if (idx === selectedIndex.value) {
            navigateTo(result.url);
            return;
          }
          idx++;
        }
      }
    }
    function navigateTo(url) {
      close();
      if (props.spa) {
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("data-livue-navigate", "true");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.location.href = url;
      }
    }
    watch(query, (newQuery) => {
      clearTimeout(debounceTimer);
      selectedIndex.value = -1;
      if (newQuery.length < 2) {
        results.value = [];
        loading.value = false;
        return;
      }
      loading.value = true;
      debounceTimer = setTimeout(async () => {
        try {
          const response = await livue.search(newQuery);
          results.value = response || [];
        } catch {
          results.value = [];
        } finally {
          loading.value = false;
        }
      }, 300);
    });
    function handleKeydown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen.value) {
          close();
        } else {
          open();
        }
      }
    }
    function handleClickOutside(e) {
      if (props.mode !== "dropdown" || !isOpen.value) return;
      if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
        close();
      }
    }
    onMounted(() => {
      document.addEventListener("keydown", handleKeydown);
      document.addEventListener("mousedown", handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(debounceTimer);
    });
    return {
      isOpen,
      query,
      results,
      loading,
      selectedIndex,
      spotlightInputRef,
      dropdownInputRef,
      spotlightRef,
      dropdownRef,
      isMac,
      open,
      close,
      moveSelection,
      selectCurrent,
      navigateTo
    };
  }
};
const _hoisted_1$3 = { class: "relative flex flex-1 items-center" };
const _hoisted_2$3 = {
  key: 0,
  class: "hidden sm:inline-flex ml-auto items-center gap-x-0.5 rounded border border-gray-300 dark:border-gray-600 px-1.5 py-0.5 text-xs text-gray-400 font-sans"
};
const _hoisted_3$3 = {
  title: "Command",
  class: "no-underline"
};
const _hoisted_4$3 = {
  key: 0,
  ref: "dropdownRef",
  class: "absolute left-0 right-0 top-full mt-1 z-50 max-h-96 overflow-y-auto rounded-lg bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black/5 dark:ring-white/10"
};
const _hoisted_5$3 = { class: "p-3" };
const _hoisted_6$3 = { class: "relative" };
const _hoisted_7$3 = {
  ref: "spotlightRef",
  class: "relative w-full max-w-xl rounded-xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
};
const _hoisted_8$2 = { class: "flex items-center border-b border-gray-200 dark:border-gray-700 px-4" };
const _hoisted_9$1 = {
  key: 0,
  class: "flex-shrink-0"
};
const _hoisted_10$1 = { class: "max-h-80 overflow-y-auto" };
const _hoisted_11 = {
  key: 0,
  class: "flex items-center justify-end gap-x-4 border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-xs text-gray-400"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_search_results = resolveComponent("search-results");
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      createCommentVNode(" Trigger button (always visible in topbar) "),
      createElementVNode("div", _hoisted_1$3, [
        createElementVNode("button", {
          type: "button",
          class: "flex flex-1 items-center gap-x-2 rounded-md px-3 py-2 text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors",
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.open && $setup.open(...args))
        }, [
          _cache[14] || (_cache[14] = createElementVNode(
            "svg",
            {
              class: "h-5 w-5 flex-shrink-0",
              viewBox: "0 0 20 20",
              fill: "currentColor"
            },
            [
              createElementVNode("path", {
                "fill-rule": "evenodd",
                d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
                "clip-rule": "evenodd"
              })
            ],
            -1
            /* CACHED */
          )),
          _cache[15] || (_cache[15] = createElementVNode(
            "span",
            { class: "hidden sm:inline" },
            "Search...",
            -1
            /* CACHED */
          )),
          $props.mode === "spotlight" ? (openBlock(), createElementBlock("kbd", _hoisted_2$3, [
            createElementVNode(
              "abbr",
              _hoisted_3$3,
              toDisplayString($setup.isMac ? "⌘" : "Ctrl"),
              1
              /* TEXT */
            ),
            _cache[13] || (_cache[13] = createTextVNode(
              "K ",
              -1
              /* CACHED */
            ))
          ])) : createCommentVNode("v-if", true)
        ]),
        createCommentVNode(" Dropdown mode: results panel "),
        $props.mode === "dropdown" && $setup.isOpen ? (openBlock(), createElementBlock(
          "div",
          _hoisted_4$3,
          [
            createElementVNode("div", _hoisted_5$3, [
              createElementVNode("div", _hoisted_6$3, [
                _cache[16] || (_cache[16] = createElementVNode(
                  "svg",
                  {
                    class: "pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 ml-3",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  },
                  [
                    createElementVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
                      "clip-rule": "evenodd"
                    })
                  ],
                  -1
                  /* CACHED */
                )),
                withDirectives(createElementVNode(
                  "input",
                  {
                    ref: "dropdownInputRef",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.query = $event),
                    type: "search",
                    class: "block w-full border-0 bg-transparent py-2 pl-10 pr-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm",
                    placeholder: "Search...",
                    onKeydown: [
                      _cache[2] || (_cache[2] = withKeys((...args) => $setup.close && $setup.close(...args), ["escape"])),
                      _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => $setup.moveSelection(1), ["prevent"]), ["down"])),
                      _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => $setup.moveSelection(-1), ["prevent"]), ["up"])),
                      _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => $setup.selectCurrent && $setup.selectCurrent(...args), ["prevent"]), ["enter"]))
                    ]
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [vModelText, $setup.query]
                ])
              ])
            ]),
            createVNode(_component_search_results, {
              groups: $setup.results,
              loading: $setup.loading,
              query: $setup.query,
              "selected-index": $setup.selectedIndex,
              spa: $props.spa,
              onSelect: $setup.navigateTo
            }, null, 8, ["groups", "loading", "query", "selected-index", "spa", "onSelect"])
          ],
          512
          /* NEED_PATCH */
        )) : createCommentVNode("v-if", true)
      ]),
      createCommentVNode(" Spotlight mode: modal overlay "),
      (openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Transition, {
          "enter-active-class": "transition-opacity duration-200 ease-out",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition-opacity duration-150 ease-in",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            $props.mode === "spotlight" && $setup.isOpen ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4",
              onClick: _cache[12] || (_cache[12] = withModifiers((...args) => $setup.close && $setup.close(...args), ["self"]))
            }, [
              createCommentVNode(" Backdrop "),
              createElementVNode("div", {
                class: "fixed inset-0 bg-gray-900/50 dark:bg-gray-900/75",
                onClick: _cache[6] || (_cache[6] = (...args) => $setup.close && $setup.close(...args))
              }),
              createCommentVNode(" Modal "),
              createElementVNode(
                "div",
                _hoisted_7$3,
                [
                  createCommentVNode(" Search input "),
                  createElementVNode("div", _hoisted_8$2, [
                    _cache[18] || (_cache[18] = createElementVNode(
                      "svg",
                      {
                        class: "h-5 w-5 text-gray-400 flex-shrink-0",
                        viewBox: "0 0 20 20",
                        fill: "currentColor"
                      },
                      [
                        createElementVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
                          "clip-rule": "evenodd"
                        })
                      ],
                      -1
                      /* CACHED */
                    )),
                    withDirectives(createElementVNode(
                      "input",
                      {
                        ref: "spotlightInputRef",
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.query = $event),
                        type: "search",
                        class: "block w-full border-0 bg-transparent py-4 pl-3 pr-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm",
                        placeholder: "Search...",
                        onKeydown: [
                          _cache[8] || (_cache[8] = withKeys((...args) => $setup.close && $setup.close(...args), ["escape"])),
                          _cache[9] || (_cache[9] = withKeys(withModifiers(($event) => $setup.moveSelection(1), ["prevent"]), ["down"])),
                          _cache[10] || (_cache[10] = withKeys(withModifiers(($event) => $setup.moveSelection(-1), ["prevent"]), ["up"])),
                          _cache[11] || (_cache[11] = withKeys(withModifiers((...args) => $setup.selectCurrent && $setup.selectCurrent(...args), ["prevent"]), ["enter"]))
                        ]
                      },
                      null,
                      544
                      /* NEED_HYDRATION, NEED_PATCH */
                    ), [
                      [vModelText, $setup.query]
                    ]),
                    $setup.loading ? (openBlock(), createElementBlock("div", _hoisted_9$1, [..._cache[17] || (_cache[17] = [
                      createElementVNode(
                        "svg",
                        {
                          class: "h-5 w-5 animate-spin text-gray-400",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24"
                        },
                        [
                          createElementVNode("circle", {
                            class: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            "stroke-width": "4"
                          }),
                          createElementVNode("path", {
                            class: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          })
                        ],
                        -1
                        /* CACHED */
                      )
                    ])])) : createCommentVNode("v-if", true)
                  ]),
                  createCommentVNode(" Results "),
                  createElementVNode("div", _hoisted_10$1, [
                    createVNode(_component_search_results, {
                      groups: $setup.results,
                      loading: $setup.loading,
                      query: $setup.query,
                      "selected-index": $setup.selectedIndex,
                      spa: $props.spa,
                      onSelect: $setup.navigateTo
                    }, null, 8, ["groups", "loading", "query", "selected-index", "spa", "onSelect"])
                  ]),
                  createCommentVNode(" Footer "),
                  $setup.results.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_11, [..._cache[19] || (_cache[19] = [
                    createElementVNode(
                      "span",
                      { class: "flex items-center gap-x-1" },
                      [
                        createElementVNode("kbd", { class: "rounded border border-gray-300 dark:border-gray-600 px-1 py-0.5 font-sans" }, "↑↓"),
                        createTextVNode(" Navigate ")
                      ],
                      -1
                      /* CACHED */
                    ),
                    createElementVNode(
                      "span",
                      { class: "flex items-center gap-x-1" },
                      [
                        createElementVNode("kbd", { class: "rounded border border-gray-300 dark:border-gray-600 px-1 py-0.5 font-sans" }, "↵"),
                        createTextVNode(" Open ")
                      ],
                      -1
                      /* CACHED */
                    ),
                    createElementVNode(
                      "span",
                      { class: "flex items-center gap-x-1" },
                      [
                        createElementVNode("kbd", { class: "rounded border border-gray-300 dark:border-gray-600 px-1 py-0.5 font-sans" }, "Esc"),
                        createTextVNode(" Close ")
                      ],
                      -1
                      /* CACHED */
                    )
                  ])])) : createCommentVNode("v-if", true)
                ],
                512
                /* NEED_PATCH */
              )
            ])) : createCommentVNode("v-if", true)
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
const GlobalSearch = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render]]);
const _hoisted_1$2 = { class: "flex-shrink-0 mt-2 w-2" };
const _hoisted_2$2 = {
  key: 0,
  class: "w-2 h-2 rounded-full bg-blue-500"
};
const _hoisted_3$2 = {
  key: 0,
  class: "flex-shrink-0 mt-0.5"
};
const _hoisted_4$2 = { class: "flex-1 min-w-0" };
const _hoisted_5$2 = { class: "flex items-start justify-between gap-2" };
const _hoisted_6$2 = {
  key: 0,
  class: "text-sm font-medium text-gray-900 dark:text-white"
};
const _hoisted_7$2 = {
  key: 1,
  class: "text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap flex-shrink-0"
};
const _hoisted_8$1 = {
  key: 0,
  class: "text-sm text-gray-500 dark:text-gray-400 mt-0.5"
};
const _hoisted_9 = {
  key: 1,
  class: "mt-2 flex flex-wrap gap-3"
};
const _hoisted_10 = ["href"];
const _sfc_main$3 = {
  __name: "NotificationItem",
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  emits: ["mark-read", "navigate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const colorMap = {
      success: "text-green-500",
      danger: "text-red-500",
      warning: "text-yellow-500",
      info: "text-blue-500",
      primary: "text-blue-500",
      gray: "text-gray-400"
    };
    function colorClass(color) {
      return colorMap[color] || "text-gray-400";
    }
    const timeAgoString = computed(() => {
      if (!props.notification.created_at) return "";
      const date = new Date(props.notification.created_at);
      const now = /* @__PURE__ */ new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1e3);
      if (diffInSeconds < 60) return "adesso";
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) {
        return diffInMinutes === 1 ? "1 min fa" : `${diffInMinutes} min fa`;
      }
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return diffInHours === 1 ? "1 ora fa" : `${diffInHours} ore fa`;
      }
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) {
        return diffInDays === 1 ? "1 giorno fa" : `${diffInDays} giorni fa`;
      }
      const diffInWeeks = Math.floor(diffInDays / 7);
      return diffInWeeks === 1 ? "1 settimana fa" : `${diffInWeeks} settimane fa`;
    });
    function handleClick() {
      if (!props.notification.read_at) {
        emit("mark-read", props.notification.id);
      }
      if (props.notification.url) {
        emit("navigate", props.notification.url);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([
            "flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
            !__props.notification.read_at ? "bg-primary-50/50 dark:bg-primary-900/10" : ""
          ]),
          onClick: handleClick
        },
        [
          createCommentVNode(" Unread dot "),
          createElementVNode("div", _hoisted_1$2, [
            !__props.notification.read_at ? (openBlock(), createElementBlock("div", _hoisted_2$2)) : createCommentVNode("v-if", true)
          ]),
          createCommentVNode(" Icon "),
          __props.notification.icon ? (openBlock(), createElementBlock("div", _hoisted_3$2, [
            __props.notification.icon === "heroicon-o-check-circle" ? (openBlock(), createElementBlock(
              "svg",
              {
                key: 0,
                class: normalizeClass(["h-5 w-5", colorClass(__props.notification.color)]),
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              },
              [..._cache[1] || (_cache[1] = [
                createElementVNode(
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
            )) : __props.notification.icon === "heroicon-o-exclamation-triangle" ? (openBlock(), createElementBlock(
              "svg",
              {
                key: 1,
                class: normalizeClass(["h-5 w-5", colorClass(__props.notification.color)]),
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              },
              [..._cache[2] || (_cache[2] = [
                createElementVNode(
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
            )) : __props.notification.icon === "heroicon-o-x-circle" ? (openBlock(), createElementBlock(
              "svg",
              {
                key: 2,
                class: normalizeClass(["h-5 w-5", colorClass(__props.notification.color)]),
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              },
              [..._cache[3] || (_cache[3] = [
                createElementVNode(
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
            )) : __props.notification.icon === "heroicon-o-information-circle" ? (openBlock(), createElementBlock(
              "svg",
              {
                key: 3,
                class: normalizeClass(["h-5 w-5", colorClass(__props.notification.color)]),
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor"
              },
              [..._cache[4] || (_cache[4] = [
                createElementVNode(
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
            )) : createCommentVNode("v-if", true)
          ])) : createCommentVNode("v-if", true),
          createCommentVNode(" Content "),
          createElementVNode("div", _hoisted_4$2, [
            createElementVNode("div", _hoisted_5$2, [
              __props.notification.title ? (openBlock(), createElementBlock(
                "p",
                _hoisted_6$2,
                toDisplayString(__props.notification.title),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true),
              timeAgoString.value ? (openBlock(), createElementBlock(
                "span",
                _hoisted_7$2,
                toDisplayString(timeAgoString.value),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true)
            ]),
            __props.notification.body ? (openBlock(), createElementBlock(
              "p",
              _hoisted_8$1,
              toDisplayString(__props.notification.body),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            __props.notification.actions && __props.notification.actions.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_9, [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(__props.notification.actions, (action) => {
                  return openBlock(), createElementBlock("a", {
                    key: action.label,
                    href: action.url,
                    class: "text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400",
                    onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                    }, ["stop"]))
                  }, toDisplayString(action.label), 9, _hoisted_10);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : createCommentVNode("v-if", true)
          ])
        ],
        2
        /* CLASS */
      );
    };
  }
};
const _hoisted_1$1 = { class: "absolute right-0 z-50 mt-2 w-96 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10" };
const _hoisted_2$1 = { class: "flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700" };
const _hoisted_3$1 = { class: "text-sm font-semibold text-gray-900 dark:text-white" };
const _hoisted_4$1 = {
  key: 0,
  class: "ml-1 text-xs font-normal text-gray-500 dark:text-gray-400"
};
const _hoisted_5$1 = { class: "max-h-[32rem] overflow-y-auto" };
const _hoisted_6$1 = {
  key: 0,
  class: "border-t border-gray-100 dark:border-gray-700"
};
const _hoisted_7$1 = ["disabled"];
const _sfc_main$2 = {
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
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["load-more", "mark-read", "mark-all-read", "navigate"],
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createCommentVNode(" Header "),
        createElementVNode("div", _hoisted_2$1, [
          createElementVNode("h3", _hoisted_3$1, [
            _cache[4] || (_cache[4] = createTextVNode(
              " Notifiche ",
              -1
              /* CACHED */
            )),
            __props.unreadCount > 0 ? (openBlock(), createElementBlock(
              "span",
              _hoisted_4$1,
              " (" + toDisplayString(__props.unreadCount) + ") ",
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true)
          ]),
          __props.unreadCount > 0 ? (openBlock(), createElementBlock("button", {
            key: 0,
            type: "button",
            class: "text-xs text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("mark-all-read"))
          }, " Segna tutte come lette ")) : createCommentVNode("v-if", true)
        ]),
        createCommentVNode(" Notification list "),
        createElementVNode("div", _hoisted_5$1, [
          __props.notifications.length > 0 ? (openBlock(true), createElementBlock(
            Fragment,
            { key: 0 },
            renderList(__props.notifications, (notification) => {
              return openBlock(), createBlock(_sfc_main$3, {
                key: notification.id,
                notification,
                onMarkRead: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("mark-read", $event)),
                onNavigate: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("navigate", $event))
              }, null, 8, ["notification"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )) : (openBlock(), createElementBlock(
            Fragment,
            { key: 1 },
            [
              createCommentVNode(" Empty state "),
              _cache[5] || (_cache[5] = createElementVNode(
                "div",
                { class: "px-4 py-8 text-center" },
                [
                  createElementVNode("svg", {
                    class: "mx-auto h-8 w-8 text-gray-300 dark:text-gray-600",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor"
                  }, [
                    createElementVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M9.143 17.082a24.248 24.248 0 0 0 5.714 0m-5.714 0a2.25 2.25 0 0 1-2.244-2.077L6.394 5.694a6.001 6.001 0 0 1 11.212 0l-.505 9.311a2.25 2.25 0 0 1-2.244 2.077m-5.714 0a3 3 0 0 0 5.714 0"
                    })
                  ]),
                  createElementVNode("p", { class: "mt-2 text-sm text-gray-500 dark:text-gray-400" }, "Nessuna notifica")
                ],
                -1
                /* CACHED */
              ))
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          ))
        ]),
        createCommentVNode(" Load more "),
        __props.hasMore ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
          createElementVNode("button", {
            type: "button",
            class: "w-full px-4 py-2 text-xs text-center text-primary-600 hover:bg-gray-50 dark:text-primary-400 dark:hover:bg-gray-700/50 font-medium",
            disabled: __props.loading,
            onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("load-more"))
          }, toDisplayString(__props.loading ? "Caricamento..." : "Carica altre"), 9, _hoisted_7$1)
        ])) : createCommentVNode("v-if", true)
      ]);
    };
  }
};
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-gray-800 shadow-xl flex flex-col"
};
const _hoisted_2 = { class: "flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700" };
const _hoisted_3 = { class: "text-base font-semibold text-gray-900 dark:text-white" };
const _hoisted_4 = {
  key: 0,
  class: "ml-1 text-sm font-normal text-gray-500 dark:text-gray-400"
};
const _hoisted_5 = { class: "flex items-center gap-3" };
const _hoisted_6 = { class: "flex-1 overflow-y-auto" };
const _hoisted_7 = {
  key: 0,
  class: "border-t border-gray-200 dark:border-gray-700"
};
const _hoisted_8 = ["disabled"];
const _sfc_main$1 = {
  __name: "NotificationDrawer",
  props: {
    open: {
      type: Boolean,
      default: false
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
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "load-more", "mark-read", "mark-all-read", "navigate"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        emit("close");
      }
    }
    onMounted(() => {
      document.addEventListener("keydown", handleEscapeKey);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", handleEscapeKey);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createCommentVNode(" Backdrop "),
        createVNode(Transition, {
          "enter-active-class": "transition-opacity ease-linear duration-300",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition-opacity ease-linear duration-300",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            __props.open ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "fixed inset-0 z-50 bg-gray-900/50",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
            })) : createCommentVNode("v-if", true)
          ]),
          _: 1
          /* STABLE */
        }),
        createCommentVNode(" Panel "),
        createVNode(Transition, {
          "enter-active-class": "transform transition ease-in-out duration-300",
          "enter-from-class": "translate-x-full",
          "enter-to-class": "translate-x-0",
          "leave-active-class": "transform transition ease-in-out duration-300",
          "leave-from-class": "translate-x-0",
          "leave-to-class": "translate-x-full"
        }, {
          default: withCtx(() => [
            __props.open ? (openBlock(), createElementBlock("div", _hoisted_1, [
              createCommentVNode(" Header "),
              createElementVNode("div", _hoisted_2, [
                createElementVNode("h2", _hoisted_3, [
                  _cache[6] || (_cache[6] = createTextVNode(
                    " Notifiche ",
                    -1
                    /* CACHED */
                  )),
                  __props.unreadCount > 0 ? (openBlock(), createElementBlock(
                    "span",
                    _hoisted_4,
                    " (" + toDisplayString(__props.unreadCount) + ") ",
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true)
                ]),
                createElementVNode("div", _hoisted_5, [
                  __props.unreadCount > 0 ? (openBlock(), createElementBlock("button", {
                    key: 0,
                    type: "button",
                    class: "text-xs text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium",
                    onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("mark-all-read"))
                  }, " Segna tutte come lette ")) : createCommentVNode("v-if", true),
                  createElementVNode("button", {
                    type: "button",
                    class: "rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300",
                    onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("close"))
                  }, [..._cache[7] || (_cache[7] = [
                    createElementVNode(
                      "span",
                      { class: "sr-only" },
                      "Chiudi",
                      -1
                      /* CACHED */
                    ),
                    createElementVNode(
                      "svg",
                      {
                        class: "h-5 w-5",
                        viewBox: "0 0 20 20",
                        fill: "currentColor"
                      },
                      [
                        createElementVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                          "clip-rule": "evenodd"
                        })
                      ],
                      -1
                      /* CACHED */
                    )
                  ])])
                ])
              ]),
              createCommentVNode(" Notification list "),
              createElementVNode("div", _hoisted_6, [
                __props.notifications.length > 0 ? (openBlock(true), createElementBlock(
                  Fragment,
                  { key: 0 },
                  renderList(__props.notifications, (notification) => {
                    return openBlock(), createBlock(_sfc_main$3, {
                      key: notification.id,
                      notification,
                      onMarkRead: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("mark-read", $event)),
                      onNavigate: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("navigate", $event))
                    }, null, 8, ["notification"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )) : (openBlock(), createElementBlock(
                  Fragment,
                  { key: 1 },
                  [
                    createCommentVNode(" Empty state "),
                    _cache[8] || (_cache[8] = createElementVNode(
                      "div",
                      { class: "px-4 py-12 text-center" },
                      [
                        createElementVNode("svg", {
                          class: "mx-auto h-10 w-10 text-gray-300 dark:text-gray-600",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor"
                        }, [
                          createElementVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M9.143 17.082a24.248 24.248 0 0 0 5.714 0m-5.714 0a2.25 2.25 0 0 1-2.244-2.077L6.394 5.694a6.001 6.001 0 0 1 11.212 0l-.505 9.311a2.25 2.25 0 0 1-2.244 2.077m-5.714 0a3 3 0 0 0 5.714 0"
                          })
                        ]),
                        createElementVNode("p", { class: "mt-3 text-sm text-gray-500 dark:text-gray-400" }, "Nessuna notifica")
                      ],
                      -1
                      /* CACHED */
                    ))
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                ))
              ]),
              createCommentVNode(" Load more footer "),
              __props.hasMore ? (openBlock(), createElementBlock("div", _hoisted_7, [
                createElementVNode("button", {
                  type: "button",
                  class: "w-full px-4 py-3 text-sm text-center text-primary-600 hover:bg-gray-50 dark:text-primary-400 dark:hover:bg-gray-700/50 font-medium",
                  disabled: __props.loading,
                  onClick: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("load-more"))
                }, toDisplayString(__props.loading ? "Caricamento..." : "Carica altre"), 9, _hoisted_8)
              ])) : createCommentVNode("v-if", true)
            ])) : createCommentVNode("v-if", true)
          ]),
          _: 1
          /* STABLE */
        })
      ]);
    };
  }
};
const _sfc_main = {
  __name: "NotificationBell",
  props: {
    mode: {
      type: String,
      default: "popup"
    },
    pollingInterval: {
      type: Number,
      default: 30
    }
  },
  setup(__props) {
    const props = __props;
    const livue = inject("livue");
    const containerRef = ref(null);
    const isOpen = ref(false);
    const notifications = ref([]);
    const unreadCount = ref(0);
    const hasMore = ref(false);
    const loading = ref(false);
    const currentPage = ref(1);
    const previousUnreadCount = ref(0);
    const hasPulse = ref(false);
    let pollingTimer = null;
    async function fetchUnreadCount() {
      try {
        const response = await livue.getUnreadNotificationsCount();
        const count = response.count ?? 0;
        if (count > previousUnreadCount.value) {
          hasPulse.value = true;
          setTimeout(() => {
            hasPulse.value = false;
          }, 2e3);
        }
        previousUnreadCount.value = count;
        unreadCount.value = count;
      } catch {
      }
    }
    async function fetchNotifications() {
      loading.value = true;
      currentPage.value = 1;
      try {
        const response = await livue.getNotifications({ page: 1, perPage: 15 });
        notifications.value = response.data ?? [];
        hasMore.value = response.hasMore ?? false;
        unreadCount.value = response.unreadCount ?? 0;
        previousUnreadCount.value = unreadCount.value;
      } catch {
      } finally {
        loading.value = false;
      }
    }
    async function loadMore() {
      if (loading.value) return;
      loading.value = true;
      currentPage.value += 1;
      try {
        const response = await livue.getNotifications({ page: currentPage.value, perPage: 15 });
        notifications.value = [...notifications.value, ...response.data ?? []];
        hasMore.value = response.hasMore ?? false;
      } catch {
      } finally {
        loading.value = false;
      }
    }
    async function markAsRead(id) {
      try {
        await livue.markNotificationAsRead({ id });
        const notification = notifications.value.find((n) => n.id === id);
        if (notification && !notification.read_at) {
          notification.read_at = (/* @__PURE__ */ new Date()).toISOString();
          unreadCount.value = Math.max(0, unreadCount.value - 1);
        }
      } catch {
      }
    }
    async function markAllAsRead() {
      try {
        await livue.markAllNotificationsAsRead();
        notifications.value.forEach((n) => {
          n.read_at = n.read_at || (/* @__PURE__ */ new Date()).toISOString();
        });
        unreadCount.value = 0;
      } catch {
      }
    }
    function handleNavigate(url) {
      closePanel();
      window.location.href = url;
    }
    function togglePanel() {
      if (!isOpen.value) {
        isOpen.value = true;
        fetchNotifications();
      } else {
        closePanel();
      }
    }
    function closePanel() {
      isOpen.value = false;
    }
    function handleClickOutside(event) {
      if (isOpen.value && props.mode === "popup" && containerRef.value && !containerRef.value.contains(event.target)) {
        closePanel();
      }
    }
    onMounted(() => {
      fetchUnreadCount();
      pollingTimer = setInterval(fetchUnreadCount, props.pollingInterval * 1e3);
      document.addEventListener("mousedown", handleClickOutside);
    });
    onUnmounted(() => {
      if (pollingTimer) clearInterval(pollingTimer);
      document.removeEventListener("mousedown", handleClickOutside);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          ref_key: "containerRef",
          ref: containerRef,
          class: "relative"
        },
        [
          createCommentVNode(" Bell button "),
          createElementVNode("button", {
            type: "button",
            class: "relative rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none",
            onClick: togglePanel
          }, [
            _cache[0] || (_cache[0] = createElementVNode(
              "span",
              { class: "sr-only" },
              "Notifiche",
              -1
              /* CACHED */
            )),
            _cache[1] || (_cache[1] = createElementVNode(
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
                createElementVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                })
              ],
              -1
              /* CACHED */
            )),
            createCommentVNode(" Badge "),
            unreadCount.value > 0 ? (openBlock(), createElementBlock(
              "span",
              {
                key: 0,
                class: normalizeClass([
                  "absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold min-w-[1.25rem] h-5 px-1",
                  hasPulse.value ? "animate-pulse" : ""
                ])
              },
              toDisplayString(unreadCount.value > 99 ? "99+" : unreadCount.value),
              3
              /* TEXT, CLASS */
            )) : createCommentVNode("v-if", true)
          ]),
          createCommentVNode(" Popup mode "),
          createVNode(Transition, {
            "enter-active-class": "transition ease-out duration-100",
            "enter-from-class": "transform opacity-0 scale-95",
            "enter-to-class": "transform opacity-100 scale-100",
            "leave-active-class": "transition ease-in duration-75",
            "leave-from-class": "transform opacity-100 scale-100",
            "leave-to-class": "transform opacity-0 scale-95"
          }, {
            default: withCtx(() => [
              __props.mode === "popup" && isOpen.value ? (openBlock(), createBlock(_sfc_main$2, {
                key: 0,
                notifications: notifications.value,
                "unread-count": unreadCount.value,
                "has-more": hasMore.value,
                loading: loading.value,
                onLoadMore: loadMore,
                onMarkRead: markAsRead,
                onMarkAllRead: markAllAsRead,
                onNavigate: handleNavigate
              }, null, 8, ["notifications", "unread-count", "has-more", "loading"])) : createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }),
          createCommentVNode(" Drawer mode "),
          __props.mode === "drawer" ? (openBlock(), createBlock(_sfc_main$1, {
            key: 0,
            open: isOpen.value,
            notifications: notifications.value,
            "unread-count": unreadCount.value,
            "has-more": hasMore.value,
            loading: loading.value,
            onClose: closePanel,
            onLoadMore: loadMore,
            onMarkRead: markAsRead,
            onMarkAllRead: markAllAsRead,
            onNavigate: handleNavigate
          }, null, 8, ["open", "notifications", "unread-count", "has-more", "loading"])) : createCommentVNode("v-if", true)
        ],
        512
        /* NEED_PATCH */
      );
    };
  }
};
const registerPanelComponents = (app) => {
  if (app?.config?.globalProperties?.__primixPanelsReady) {
    return;
  }
  app.config.globalProperties.__primixPanelsReady = true;
  app.component("PrimixDropdown", _sfc_main$b);
  app.component("PrimixCollapsible", _sfc_main$a);
  app.component("PrimixToast", _sfc_main$9);
  app.component("PrimixNotificationToasts", _sfc_main$8);
  app.component("PrimixThemeToggle", _sfc_main$7);
  app.component("PrimixUserMenu", _sfc_main$6);
  app.component("PrimixTenantMenu", _sfc_main$5);
  app.component("PrimixGlobalSearch", GlobalSearch);
  app.component("PrimixNotificationBell", _sfc_main);
};
LiVue.setup(registerPanelComponents);
//# sourceMappingURL=primix-panels.js.map
