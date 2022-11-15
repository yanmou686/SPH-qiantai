import { reqGetGoodsInfo, reqAddorUpdateShowCart } from "@/api/index";
import { getUUID } from "../../utils/uuid_token";
const state = {
  goodsInfo: {},
  //游客临时身份
  uuid_token: getUUID(),
};

const mutations = {
  GOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo;
  },
};

const actions = {
  //获取商品信息action
  async getGoodsInfo(context, skuid) {
    let result = await reqGetGoodsInfo(skuid);
    if (result.code == 200) {
      context.commit("GOODSINFO", result.data);
    }
  },

  //将产品添加到购物车,因为服务器中没有再返回其他的信息,所以我们不需要再进行三连环
  async addOrUpdateShopCart(context, { skuId, skuNum }) {
    let result = await reqAddorUpdateShowCart(skuId, skuNum);
    if (result.code == 200) {
      //代表服务器加入购物车成功
      return "ok";
    } else {
      //代表加入购物车失败
      return Promise.reject(new Error("error"));
    }
  },
};

//简化数据
const getters = {
  categoryView(state) {
    //服务器数据还没回来的话，就是categoryView.undefind 就会出现假报错
    return state.goodsInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
