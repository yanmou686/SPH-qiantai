// import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";
import Detail from "../pages/Detail";
import AddCartSuccess from "../pages/AddCartSuccess";
import ShopCart from "../pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder";

export default [
  {
    path: "/home",
    component: () => import("../pages/Home"),
    meta: { showFooter: true },
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    name: "search",
    path: "/search/:keyword?",
    component: Search,
    meta: { showFooter: true },
  },
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/detail/:skuid",
    component: Detail,
    meta: { showFooter: true },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: AddCartSuccess,
    meta: { showFooter: true },
  },
  {
    path: "/shopcart",
    component: ShopCart,
    meta: { showFooter: true },
  },
  {
    path: "/trade",
    component: Trade,
    meta: { showFooter: true },
    beforeEnter: (to, from, next) => {
      //如果要去交易页面，必须要从购物车去（点击结算）
      if (from.path == "/shopcart") {
        next();
      } else {
        //从哪儿来回哪儿去
        next(false);
      }
    },
  },
  {
    path: "/pay",
    component: Pay,
    meta: { showFooter: true },
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: { showFooter: true },
  },
  {
    path: "/center",
    component: Center,
    meta: { showFooter: true },
    children: [
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        component: GroupOrder,
      },
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
];
