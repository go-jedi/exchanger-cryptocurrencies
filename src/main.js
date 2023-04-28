import Vue from "vue";
import Vuelidate from "vuelidate";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/zeroing.css";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
