import { reqGetSearchInfo } from "@/api/index";

//search模块
const state = {
  searchList: {},
};

const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};

const actions = {
  // await如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。
  // await如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。
  //通过api里面的接口函数调用，向服务器发送请求，获取服务器的数据
  async getSearchList(context, params = {}) {
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      context.commit("GETSEARCHLIST", result.data);
    }
  },
};

const getters = {
  //这个形参中的state是当前仓库中的state，并非大仓库
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
