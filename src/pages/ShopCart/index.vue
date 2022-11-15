<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="carListValue in carInfoList"
          :key="carListValue.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              @change="CheckCart(carListValue, $event)"
              :checked="carListValue.isChecked == 1"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="carListValue.imgUrl" />
            <div class="item-msg">
              {{ carListValue.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ carListValue.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handle('sub', -1, carListValue)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="carListValue.skuNum"
              @change="handle('change', $event.target.value * 1, carListValue)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handle('add', 1, carListValue)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum"
              >{{ carListValue.cartPrice * carListValue.skuNum }}.00</span
            >
          </li>
          <li class="cart-list-con7">
            <a
              href="#none"
              class="sindelet"
              @click="deleteCart(carListValue.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          :checked="ifAllChecked && carInfoList.length > 0"
          type="checkbox"
          @change="selectAllCart($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ this.totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { throttle } from "lodash";
export default {
  name: "ShopCart",

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      this.$store.dispatch("getCarList");
    },

    /* 删除商品的数据 */
    async deleteCart(skuId) {
      try {
        await this.$store.dispatch("deleteCart", skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
      /* console.log(index); */
    },

    /* 修改商品的购买数量 */
    handle: throttle(async function (type, disNum, carListValue) {
      //  console.log("派发action", type, updata, carListValue);
      //type:sub change add,
      switch (type) {
        case "add":
          disNum = 1; //变化的量
          break;
        case "sub":
          //判断产品个数是否大于1
          /*  if (carListValue.skuNum > 1) {
            disNum = -1;
          } else {
            disNum = 0;
          } */
          disNum = carListValue.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - carListValue.skuNum;
          }
          break;
      }
      /* 派发action，我们需要用到addOrUpdateShopCart(context, { skuId, skuNum })函数 */
      // this.$store.dispatch("addOrUpdateShopCart", {
      //   skuId: carListValue.skuId,
      //   skuNum: disNum,
      // });
      try {
        //代表修改成功
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: carListValue.skuId,
          skuNum: disNum,
        });
        //再次获取服务器最新的数据进行展示
        this.getData();
      } catch (error) {}
    }, 1000),

    /* 修改产品的单个选中状态 */
    async CheckCart(cart, event) {
      //event.target.checked,我们获取到的状态是布尔值，而我们需要的是0|1，所以我们需要进行转换
      let checked = event.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch("checkCart", {
          skuId: cart.skuId,
          isChecked: checked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },

    /* 删除选中的全部产品 */
    async deleteAllChecked() {
      try {
        await this.$store.dispatch("deleteAllChecked");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },

    /* 全选商品 */
    async selectAllCart(event) {
      let checked = event.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch("selectAllCart", checked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },

  computed: {
    ...mapGetters(["carList"]),
    carInfoList() {
      return this.carList.cartInfoList || [];
    },
    /* 计算出购买商品总价 */
    totalPrice() {
      let sum = 0;
      this.carInfoList.forEach((item) => {
        sum = sum + item.cartPrice * item.skuNum;
      });
      return sum;
    },
    /*  判断商品单选框是否全部选中 */
    ifAllChecked() {
      //如果全都为1则返回true，如果有一个不为1则为false
      return this.carInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>