//当前这个模块，对API进行统一的管理
import requests from "./request";

//引入mock
import mockRequests from "./mockAjax";
//三级联动的接口
//http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList

export const reqCategoryList = () => {
  //发送请求  axios发送的数据 返回是一个promise对象
  return requests({
    url: "/product/getBaseCategoryList",
    method: "get",
  });
};

//获取banner（Home首页轮播图）
export const reqGetBannerList = () => {
  return mockRequests({
    url: "/banner",
    method: "get",
  });
};

//获取floor数据
export const reqGetFloorList = () => {
  return mockRequests({
    url: "/floor",
    method: "get",
  });
};

//获取搜索模块   POST请求，需要带参数  至少需要传一个空对象，不然会请求失败
export const reqGetSearchInfo = (params) => {
  return requests({
    url: "/list",
    method: "post",
    data: params,
  });
};

//获取商品详情信息
export const reqGetGoodsInfo = (skuid) => {
  return requests({
    url: `/item/${skuid}`,
    method: "get",
  });
};

//将产品添加到购物车中或更新某个产品的个数
export const reqAddorUpdateShowCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
};

//获取商品购物车列表数据
export const reqCartList = () => {
  return requests({
    url: "/cart/cartList",
    method: "get",
  });
};

//删除购物车指定id数据
export const reqDeleteCart = (skuId) => {
  return requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
  });
};

//修改产品的选中状态
export const reqCheckCart = (skuId, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });
};

//获取验证码
export const reqGetCode = (phone) => {
  return requests({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  });
};

//用户注册
export const reqUserRegister = (data) => {
  return requests({
    url: "/user/passport/register",
    method: "post",
    data,
  });
};

//用户登录
export const reqUserLogin = (data) => {
  return requests({
    url: `/user/passport/login`,
    method: "post",
    data,
  });
};

//获取用户信息【需要携带token】
export const reqUserInfo = () => {
  return requests({
    url: `/user/passport/auth/getUserInfo`,
    method: "get",
  });
};

//退出登录
export const loginOut = () => {
  return requests({
    url: "/user/passport/logout",
    method: "get",
  });
};

//获取用户地址信息
export const reqAddressInfo = () => {
  return requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });
};

//获取商品清单
export const reqOrderInfo = () => {
  return requests({
    url: "/order/auth/trade",
    method: "get",
  });
};

//提交订单
export const reqSubmitOrder = (tradeNo, data) => {
  return requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data,
  });
};

//获取订单支付信息
export const reqPayMent = (orderId) => {
  return requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });
};

//获取订单的交易状态
export const reqPayStatus = (orderId) => {
  return requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });
};

//获取我的订单列表
export const reqMyOrderList = (page, limit) => {
  return requests({
    url: `/order/auth/${page}/${limit}`,
    method: "get",
  });
};
