//vee-validate插件：表单验证
import Vue from "vue";
import VeeValidate from "vee-validate";
//引入中文的提示信息
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeValidate);

/* 第二步：提示信息 */
VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
  },
  attributes: {
    // 给校验的 field 属性名映射中文名称
    phone: "手机号", //出现的错误提示信息,不写就是phone格式无效等
    code: "验证码",
    password: "密码",
    password1: "确认密码",
    agree: "协议",
  },
});

// const success = await this.$validator.validateAll(); //全部表单验证
//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend("agree", {
  validate: (value) => {
    return value;
  },
  getMessage: (field) => field + "必须同意",
});
