<template>
  <div>
    <Header />
    <router-view></router-view>
    <!-- 在Home或者Search中显示Footer组件 -->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //通知Vuex将接收到的数据存放在仓库中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
