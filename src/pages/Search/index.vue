<template>
  <div>
    <TypeNave />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="params.categoryName">
              {{ params.categoryName }}
              <!-- 点击这个X删掉这个面包屑而且重新发请求 -->
              <i @click="removeBread">×</i>
            </li>

            <li class="with-x" v-show="params.keyword">
              {{ params.keyword }}
              <i @click="removeKeyword">×</i>
            </li>

            <li class="with-x" v-show="trademarkBread">
              {{ trademarkBread.split(":")[1] }}
              <i @click="removetrademark">×</i>
            </li>

            <!-- 品牌面包屑 -->
            <li class="with-x" v-for="(p, index) in params.props" :key="index">
              {{ p.split(":")[1] }}<i @click="removeAttr(p)">×</i>
            </li>
          </ul>
        </div>

        <!--selector 平台售卖属性-->
        <SearchSelector @addTrademark="addTrademark" @addAttr="addAttr" />

        <!--details 商品详情-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder(1)">
                  <a href="#"
                    >综合
                    <i
                      class="iconfont"
                      :class="{ 'icon-down': isdown, 'icon-up': isup }"
                      v-show="isOne"
                    >
                    </i
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder(2)">
                  <a href="#"
                    >价格<i
                      class="iconfont"
                      v-show="isTwo"
                      :class="{ 'icon-down': isdown, 'icon-up': isup }"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(m, index) in goodsList"
                :key="m.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${m.id}`">
                      ><img :src="m.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ m.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ m.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="11"
            :pageSize="params.pageSize"
            :total="31"
            :continue="5"
            @handle="handlePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  data() {
    return {
      params: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 3,
        props: [],
        trademark: "",
      },
    };
  },

  // 整理参数将来发请求
  beforeMount() {
    Object.assign(this.params, this.$route.query, this.$route.params);
  },
  computed: {
    ...mapState({
      searchList: (state) => {
        return state.search.searchList;
      },
    }),

    ...mapGetters(["attrsList", "goodsList", "trademarkList"]),
    trademarkBread() {
      return this.params.trademark || "";
    },
    // 用来控制 综合：价格 排序的时候加不加类，以及箭头
    isOne() {
      return this.params.order.indexOf("1") !== -1;
    },
    isTwo() {
      return this.params.order[0] == 2;
    },
    isup() {
      return this.params.order.split(":")[1].indexOf("asc") !== -1;
    },
    isdown() {
      return this.params.order.split(":")[1] == "desc";
    },
  },
  name: "Search",

  components: {
    SearchSelector,
  },
  mounted() {
    console.log(this);

    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("getSearch", this.params);
    },
    removeBread() {
      this.params.categoryName = "";
      this.params.category1Id = undefined;
      this.params.category2Id = undefined;
      this.params.category3Id = undefined;
      this.params.props = [];

      this.getData();
      this.$router.push({
        name: "search",
        params: { keyword: this.params.keyword },
      });
    },
    removeKeyword() {
      this.params.keyword = undefined;
      this.getData();
      this.$router.push({
        name: "search",
        query: this.$route.query,
      });
      // 关键字删除了也要通知兄弟组件，header把输入框的内容清除
      this.$bus.$emit("clear");
    },
    // 自定义事件回调函数
    addTrademark(trademark) {
      this.params.trademark = trademark;
      // 还要重新发请求刷新数据
      this.getData();
    },
    removetrademark() {
      this.params.trademark = undefined;
      this.getData();
    },
    // 添加品牌面包屑
    addAttr(props) {
      // 数组去重，相同的属性就不要追加进去
      if (this.params.props.indexOf(props) !== -1) return;
      this.params.props.push(props);
      this.getData();
    },
    removeAttr(p) {
      // 从数组中去掉这个P然后重新发请求
      console.log(this.params.props, p);
      this.params.props = this.params.props.filter((item) => {
        return item !== p;
      });
      console.log(this.params.props);
      this.getData();
    },
    // 排序 "1:desc"
    changeOrder(flag) {
      let originFlag = this.params.order.split(":")[0];
      let originSort = this.params.order.split(":")[1];
      console.log(originSort);
      let newOrder = "";
      if (originFlag == flag) {
        // originFlag=flag
        // oringinSort='desc'
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:"desc"`;
      }
      console.log(newOrder);
      this.params.order = newOrder;
      this.getData();
    },
    handlePage(num) {
      this.params.pageNo = num;

      this.getData();
    },
  },
  watch: {
    $route: {
      handler(newValue, oldValue) {
        Object.assign(this.params, newValue.query, newValue.params);
        this.getData();
        //  请求完之后把相应的1id,2id,3id清空，因为有可能你这次是1id，下次请求的是2id
        // 但是响应式数据params里保存了之前的1id。并且一起发送请求过去了
        console.log(this.params);
        this.params.category1Id = "";
        this.params.category2Id = "";
        this.params.category3Id = "";
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
