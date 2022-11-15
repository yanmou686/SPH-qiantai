//配置路由
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

//引入大仓库来判断是否有token，以此来确定用户是否登录
import store from "../store";

//使用插件
Vue.use(VueRouter);

//把VueRouter原型对象的push先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push、replace方法
//第一个参数：你往哪里跳转(传递的参数),第二个参数成功的回调，第三个参数失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

//配置路由
let router = new VueRouter({
  namespaced: true,
  //配置路由
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }; //vue3写成top：0
  },
});
export default router;
//配置全局路由守卫
router.beforeEach(async (to, from, next) => {
  // next();
  //获取到用户登录的token
  let token = store.state.user.token;
  //需要获取到用户的信息userInfo,这样在跳转页面时不会丢失数据
  let name = store.state.user.userInfo.name;
  // console.log(token, name);
  // console.log(store);
  if (token) {
    //用户已经登录,但是要去login页面
    if (to.path == "/login") {
      next("/home");
    } else {
      //用户已经登录，但是去的不是login页面
      //如果用户名已有
      if (name) {
        next();
      } else {
        //没有用户名(用户信息),那我们派发acion让存库存储用户信息
        try {
          //如果获取成功，则放行
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          //失败的原因:1.token过期 2.请求失败
          //（退出登录）清除token,跳转至登录页重新登录
          await store.dispatch("loginOut");
          next("/login");
        }
      }
    }
  } else {
    //用户未登录:不能去交易、支付、支付成功、个人中心
    if (
      to.path == "/trade" ||
      to.path == "/pay" ||
      to.path == "/paysuccess" ||
      to.path == "/center/myorder" ||
      to.path == "/center/grouporder"
    ) {
      //传递query参数
      next("/login?redirect=" + to.path);
    }
    next();
  }
});
