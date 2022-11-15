import { reqCategoryList } from "@/api/index";
import { reqGetBannerList } from "@/api/index";
import { reqGetFloorList } from "@/api/index";

//home模块
const state = {
  categoryList: [],
  //轮播图的数据
  bannerList: [],
  floorList: [],
};

const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  BANNERLIST(state, bannerList) {
    console.log("正在修改仓库的bannerlist数据");
    state.bannerList = bannerList;
  },
  FLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};

const actions = {
  //通过api里面的接口函数调用，向服务器发送请求，获取服务器的数据
  async categoryList(context, value) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      context.commit("CATEGORYLIST", result.data);
    }
  },
  //获取首页轮播图的数据,mock请求会被ajax拦截，不会出现在network中，是模拟的
  async getBannerList(context) {
    // console.log("向服务器发送ajax请求，获取轮播图数据");
    let result = await reqGetBannerList();
    if (result.code == 200) {
      context.commit("BANNERLIST", result.data);
    }
  },
  //获取首页楼层的数据,mock请求会被ajax拦截，不会出现在network中，是模拟的
  async getFloorList(context) {
    let result = await reqGetFloorList();
    if (result.code == 200) {
      context.commit("FLOORLIST", result.data);
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
