<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @click="goSearch">
        <h2 class="all" @mouseenter="enterShow">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryid"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >

                  <!-- 因为是组件，所以我们不能用routerlink来写，不然会导致加载几千个组件 -->
                  <!--  <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryid"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryid">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
//这是将lodash中的所有函数都引入进来了
/* import _ from "lodash"; */
import { throttle } from "lodash"; //但是我们最好还是用按需引入比较好
/* console.dir(_); */
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  //组件挂载完毕我们就可以向服务器发起请求获取服务器数据并展示数据
  mounted() {
    /* 通知Vuex将接收到的数据存放在仓库中，因为每一次跳转路由都会重新请求数据，跳转路由后原来的组件会销毁，
    然后进行一次新的请求，这样会导致有多个请求执行，所以我们将他放在了APP组件中的mounted中
    this.$store.dispatch("categoryList"); */

    //当组件挂载完毕，让show的属性变为false
    //单写一个show=false会导致刚进来也是不可见，所以我们要判断路由路径
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    //通过mapState来获取到home模块中的state数据，这里用的是对象的写法
    ...mapState({
      categoryList: (state) => {
        //console.dir(state);    // 这里的state收到的是store大仓库中的数据，并不是home这个小仓库
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    /*  changeIndex(index) {
      //index是鼠标移上后每个一级标签的索引值
      this.currentIndex = index;
    }, */
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
      /* console.log(index); */
    }, 50),
    leaveIndex() {
      this.currentIndex = -1;
      //我们需要写条件，不然我们在home组件或者其他组件中都会产生这样的效果
      if (this.$route.path != "/home") {
        this.show = false; //鼠标离开时，我们就让三级标签隐藏
        /* console.log(this.$route.path); */
      }
    },
    goSearch(event) {
      //我们用的事件委派的话，会把所有子节点都委派给父亲节点
      //我们不能够确定点击的一定就是a标签
      //点击了a标签，我们还要区分他是一级，二级，还是三级标签
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset; //利用对象的结构赋值来判断在这个对象中是否有categoryname这个属性
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //进入了这里，那么就一定会是a标签，然后我们要判断这是几级的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        location.query = query;
        location.params = this.$route.params;
        this.$router.push(location);
        /*   this.$router.push({
          path: location.name,
          query: { categoryname, category1id, category2id, category3id },
        }); */
      }
    },
    //当鼠标移入全部商品分类时，我们就会展示出三级列表
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /*   &:hover {
            .item-list {
              display: block;
            }
          } */
        }
        .cur {
          background-color: skyblue;
        }
      }
    }

    //过渡动画的样式
    //过渡动画开始的样式(进入)
    .sort-enter {
      height: 0px;
    }
    //过渡动画结束状态(进入)
    .sort-enter-to {
      height: 461px;
    }
    //定义动画的事件和速率
    .sort-enter-active {
      overflow: hidden;
      transition: all 0.3s linear;
    }
  }
}
</style>