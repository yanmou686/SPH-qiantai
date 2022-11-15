import { reqGetCode } from "@/api";
import { reqUserRegister } from "@/api";
import { reqUserLogin } from "@/api";
import { reqUserInfo } from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";
import { loginOut } from "@/api";

const state = {
  code: "",
  token: getToken(),
  userInfo: {},
};

const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  LOGINOUT(state) {
    state.userInfo = {};
    state.token = "";
    removeToken();
  },
};

const actions = {
  //获取验证码
  async getcode(context, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      context.commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },

  //用户注册
  async userRegister(context, userInfo) {
    let result = await reqUserRegister(userInfo);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("注册失败"));
    }
  },

  //用户登录
  async userLogin(context, userInfo) {
    let result = await reqUserLogin(userInfo);
    if (result.code == 200) {
      //用户已经获取到token，我们需要进行持久化存储token
      context.commit("USERLOGIN", result.data.token);
      //进行本地存储
      /*  localStorage.setItem("TOKEN", result.data.token); */
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },

  //获取用户信息
  async getUserInfo(context) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      context.commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },

  //用户退出登录
  async loginOut(context) {
    let result = await loginOut();
    if (result.code == 200) {
      context.commit("LOGINOUT");
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
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
