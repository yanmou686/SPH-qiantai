<template>
  <div>
    <h1 v-upper="msg"></h1>
    <!-- 引用三级联动的组件 -->
    <TypeNav />
    <!-- 引用轮播图以及快报 -->
    <ListContainer />
    <!-- 引用今日推荐 -->
    <TodayRecommend />
    <!-- 引用商品排行 -->
    <ShopRank />
    <!-- 引用猜你喜欢 -->
    <ShopLike />
    <!-- 引用商品集合 -->
    <ShopFloor v-for="floor in floorList" :key="floor.id" :floor="floor" />
    <!-- 引用商品商标 -->
    <ShopBrand />
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入其余的组件
import ListContainer from "./ListContainer/index.vue";
import TodayRecommend from "./TodayRecommend/index.vue";
import ShopRank from "./Rank/index.vue";
import ShopLike from "./Like/index.vue";
import ShopFloor from "./Floor/index.vue";
import ShopBrand from "./Brand/index.vue";
export default {
  name: "Home",
  data() {
    return {
      msg: "插件测试数据",
    };
  },
  components: {
    ListContainer,
    TodayRecommend,
    ShopRank,
    ShopLike,
    ShopFloor,
    ShopBrand,
  },
  mounted() {
    this.$store.dispatch("getFloorList");
    // this.$store.dispatch("getUserInfo");
    /* console.log(this.$store); */
  },
  computed: {
    ...mapState({
      floorList: (state) => {
        return state.home.floorList;
      },
    }),
  },
};
</script>

<style></style>
