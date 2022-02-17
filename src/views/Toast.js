import Vue from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

Vue.use(VueToast);

export default {
  showToast(msg, type) {
    Vue.$toast.clear();
    if (type === "S") {
      Vue.$toast.success(msg, {
        duration: 5000,
        dismissible: true,
        position: "top-right"
      });
    }
    if (type === "E") {
      Vue.$toast.error(msg, {
        duration: 5000,
        dismissible: true,
        position: "top-right"
      });
    }
    if (type === "I") {
      Vue.$toast.info(msg, {
        duration: 5000,
        dismissible: true,
        position: "top-right"
      });
    }
    if (type === "W") {
      Vue.$toast.warning(msg, {
        duration: 5000,
        dismissible: true,
        position: "top-right"
      });
    }
  }
};
