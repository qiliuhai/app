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
          v-for="(item, index) in cartInfoList"
          :key="item.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @click="changeCheck(item)"
            />
            <!--     -->
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="changeSkuNmu('mins', item, -1)">-</a>
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="item.skuNum"
              @change="changeSkuNmu('input', item, $event.target.value)"
            />
            <a class="plus" @click="changeSkuNmu('plus', item, +1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.cartPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(item.skuId)">删除</a>
            <!--   -->
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
          type="checkbox"
          :checked="isAllCheck"
          @change="changeAllCheck($event.target.checked)"
        />
        <!--  -->
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChangecart">删除选中的商品</a>
        <!-- -->
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle.js";
export default {
  name: "ShopCart",
  mounted() {
    // 向服务器发请求要购物车的数据
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("getCartList");
    },
    // 这个函数用于告诉服务器修改的数量
    // /api/cart/addToCart/{ skuId }/{ skuNum }正数代表添加负数代表减少
    // 加节流 throttle()调用这个方法返回一个函数，返回的值就是事情的回调函数
    changeSkuNmu: throttle(async function (type, item, value) {
      switch (type) {
        case "mins":
          if (item.skuNum > 1) {
            value = -1;
          } else {
            value = 0;
          }
          break;
        case "plus":
          value = 1;
          break;
        case "input":
          if (isNaN(value * 1) || value * 1 < 0) {
            value = 0;
          } else if (value * 1 > 0) {
            value = parseInt(value) - item.skuNum;
          }
      }
      console.log(this);
      await this.$store.dispatch("getShopCart", {
        skuId: item.skuId,
        skuNum: value,
      });
      this.getData();
    }, 1000),

    // 切换选中状态
    async changeCheck(item) {
      item.isChecked == 1 ? (item.isChecked = 0) : (item.isChecked = 1);

      await this.$store.dispatch("ChangeCheck", {
        skuId: item.skuId,
        isChecked: item.isChecked,
      });
      this.getData();
    },
    // 全选还是不全选
    async changeAllCheck(checked) {
      try {
        checked ? (checked = 1) : (checked = 0);
        console.log(checked);
        await this.$store.dispatch("changeAllCheck", checked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除选择的商品
    async deleteCart(skuId) {
      await this.$store.dispatch("deleteCart", skuId);
      this.getData();
    },
    // 删除所有选中的商品
    async deleteAllChangecart() {
      await this.$store.dispatch("deleteChange");
      this.getData();
    },
    // 结算
    async pay() {
      try {
        await this.$store.dispatch("pay");
        this.$router.push("/trade");
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 产品总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((cart) => {
        sum += cart.cartPrice * cart.skuNum;
      });
      return sum;
    },
    // 全选勾与不勾的状态
    isAllCheck() {
      // let flag = true;
      // // if (this.cartInfoList.length < 0) return (flag = false);
      // this.cartInfoList.forEach((item) => {
      //   if (item.isChecked == 0) flag = false;
      // });
      // return this.cartInfoList.length && flag;

      return (
        this.cartInfoList.every((item) => {
          return item.isChecked == 1;
        }) && this.cartInfoList.length
      );
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
