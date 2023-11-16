<template>
  <!-- 商品分类导航 -->

  <div class="type-nav">
    <div class="container">
      <div @mouseleave="changeIndex()" @mouseenter="changeshow">
        <h2 class="all">全部商品分类</h2>
        <!-- 一级分类的显示与隐藏  动画过渡-->
        <transition name="sort">
          <div class="sort" v-show="isshow">
            <div class="all-sort-list2" @click="gosearch">
              <div class="item" v-for="(v, index) in category" :key="v.id">
                <h3
                  :class="{ bgc: current == index }"
                  @mouseenter="changebgc(index)"
                >
                  <a
                    :data-categoryName="v.categoryName"
                    :data-category1Id="v.categoryId"
                    >{{ v.categoryName }}</a
                  >
                </h3>
                <!-- 二级分类  显示与隐藏，根据当前的current是不是被选中的-->
                <div
                  class="item-list clearfix"
                  :style="{ display: current == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(m, index) in v.categoryChild"
                    :key="m.id"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-category2Id="m.categoryId"
                          :data-categoryName="m.categoryName"
                          >{{ m.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="(n, index) in m.categoryChild" :key="n.id">
                          <a
                            :data-categoryName="n.categoryName"
                            :data-category3Id="n.categoryId"
                            >{{ n.categoryName }}</a
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
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNave",
  data() {
    return {
      current: -1,
      isshow: true,
    };
  },

  methods: {
    gosearch(event) {
      // 根据自动以data-categoryName 属性来判断是不是a标签，以及跟着categoryid传递参数
      let elment = event.target;
      let { categoryname, category1id, category2id, category3id } =
        elment.dataset;
      let location = { name: "search" };
      let query = { categoryName: categoryname };
      if (categoryname) {
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
      }
      location.query = query;
      if (this.$route.params) {
        location.params = this.$route.params;
      }
      this.$router.push(location);
    },
    // 鼠标移入h3添加背景颜色类
    // changebgc(index) {
    //   this.current = index;
    //   console.log(index);
    // },
    // 节流,调用throttle方法返回值是，事件的回调函数
    changebgc: throttle(function (index) {
      this.current = index;
    }, 50),
    // 鼠标移出
    changeIndex() {
      if (this.$route.path !== "/home") {
        this.isshow = false;
      }
      this.current = -1;
    },
    // 鼠标移入
    changeshow() {
      this.isshow = true;
    },
  },
  computed: {
    ...mapState({
      category: (state) => {
        return state.home.TypeList;
      },
    }),
  },
  mounted() {
    if (this.$route.path !== "/home") {
      this.isshow = false;
    }
    console.log("三级联动挂了第一次");
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
    .bgc {
      background-color: pink;
    }
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

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
    // 进入的过渡动画的进入状态
    .sort-enter {
      height: 0px;
    }
    // 进入的过渡动画的结束状态
    .sort-enter-to {
      height: 461px;
    }
    // 动画的时间。速率(可以是过渡效果，也可以是动画关键帧)
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
