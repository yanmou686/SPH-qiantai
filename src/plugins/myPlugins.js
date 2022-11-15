import Vue from "vue";

let myPlugins = {};

myPlugins.install = function (vue, options) {
  //全局指令
  Vue.directive(options.name, (element, params) => {
    console.log(element, params);
  });
};

export default myPlugins;
