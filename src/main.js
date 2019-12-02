import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import { Message, Button, Container, NavMenu } from "element-ui";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// Vue.use(Button);
// Vue.use(Container);
// Vue.use(NavMenu);
// Vue.component(Message);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
}).$mount("#app");
