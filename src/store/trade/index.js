import { reqAddressInfo, reqOrderInfo } from "@/api/index";

const state = {
  address: [],
  orderInfo: {},
};

const mutations = {
  GETUSERADDRESS(state, address) {
    state.address = address;
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  },
};

const actions = {
  //获取用户地址信息
  async getUserAddress(context) {
    let result = await reqAddressInfo();
    if (result.code == 200) {
      context.commit("GETUSERADDRESS", result.data);
    }
  },

  //获取商品清单
  async getOrderInfo(context) {
    let result = await reqOrderInfo();
    if (result.code == 200) {
      context.commit("GETORDERINFO", result.data);
    }
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
