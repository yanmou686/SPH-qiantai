import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//引入小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";

//对外暴露store类的实例
export default new Vuex.Store({
  //实现模块化开发存储数据
  modules: {
    user,
    home,
    search,
    detail,
    shopcart,
    trade,
  },
});
