import { reqCartList } from "@/api";
import { reqDeleteCart } from "@/api";
import { reqCheckCart } from "@/api";
const state = {
  carList: [],
};

const mutations = {
  GETCARLIST(state, carList) {
    state.carList = carList;
  },
};

const actions = {
  //获取购物车列表数据
  async getCarList(context) {
    let result = await reqCartList();
    if ((result.code = 200)) {
      context.commit("GETCARLIST", result.data);
    }
  },
  //删除购物车列表数据
  async deleteCart(context, skuId) {
    let result = await reqDeleteCart(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //修改商品的选中状态
  async checkCart(context, { skuId, isChecked }) {
    let result = await reqCheckCart(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //删除选中的全部商品
  deleteAllChecked(context) {
    let PromiseAll = [];
    context.getters.carList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? context.dispatch("deleteCart", item.skuId) : "";
      //将每一次返回的promise添加到数组中
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll).then(
      (res) => {
        return "ok";
      },
      (err) => {
        return err.message;
      }
    );
  },
  //商品全选
  selectAllCart(context, checked) {
    let PromiseAll = [];
    context.state.carList[0].cartInfoList.forEach((item) => {
      let promise = context.dispatch("checkCart", {
        skuId: item.skuId,
        isChecked: checked,
      });
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  },
};

const getters = {
  carList(state) {
    return state.carList[0] || {};
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
