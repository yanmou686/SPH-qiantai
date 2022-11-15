import Vue from "vue";
import App from "./App.vue";
//引入路由
import router from "@/router";
Vue.config.productionTip = false;
//引入仓库
import store from "@/store";
//注册全局组件
import TypeNav from "./components/TypeNav";
import Carousel from "./components/Carousel";
import Pagination from "./components/Pagination";
//引入MockServe.js
import "@/mock/mockServe";
//引入swiper样式
import "swiper/css/swiper.css";
//引入elementui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//引入懒加载
import VueLazyload from "vue-lazyload";
import sl from "./assets/sl.jpg";
//统一暴露所有的API
import * as API from "@/api";
/* console.log(API); */
//引入表单校验插件
import "@/plugins/validata";
//第一个参数是全局组件的名字，第二个参数是哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
Vue.use(ElementUI);
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: sl,
});
import myPlugins from "./plugins/myPlugins.js";
Vue.use(myPlugins, {
  name: "upper",
});
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    //配置全局事件总线
    Vue.prototype.$bus = this;
    //原理与$bus相似，引入所有的请求api
    Vue.prototype.$API = API;
  },
  //注册路由信息
  router,
  //注册仓库
  store,
}).$mount("#app");
