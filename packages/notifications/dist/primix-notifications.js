import s from "livue";
import { e as n } from "../support/chunks/primix-D3w9RuwV.js";
import { g as a } from "../support/chunks/index-uMyjrk0Z.js";
import "vue";
var r = a(), u = /* @__PURE__ */ Symbol(), l = {
  install: function(t) {
    var m = {
      add: function(o) {
        r.emit("add", o);
      },
      remove: function(o) {
        r.emit("remove", o);
      },
      removeGroup: function(o) {
        r.emit("remove-group", o);
      },
      removeAllGroups: function() {
        r.emit("remove-all-groups");
      }
    };
    t.config.globalProperties.$toast = m, t.provide(u, m);
  }
};
const v = (e) => {
  e?.config?.globalProperties?.__primixNotificationsReady || (e.config.globalProperties.__primixNotificationsReady = !0, n(e), e.use(l));
};
s.setup(v);
//# sourceMappingURL=primix-notifications.js.map
