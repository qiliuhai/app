<template>
  <div class="order-content">
    <div class="title">
      <h3>我的订单</h3>
    </div>
    <div class="chosetype">
      <table>
        <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="orders">
      <table
        class="order-item"
        v-for="(m, index) in centerInfo.records"
        :key="m.id"
      >
        <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle"
                >{{ m.createTime }}　订单编号：{{ m.outTradeNo }}
                <span class="pull-right delete"
                  ><img src="../images/delete.png" /></span
              ></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, index) in m.orderDetailList" :key="i.id">
            <td width="60%">
              <div class="typographic">
                <img :src="i.imgUrl" style="width: 100px; height: 100px" />
                <a href="#" class="block-text">{{ i.skuName }}</a>
                <span>x{{ i.skuNum }}</span>
                <a href="#" class="service">售后申请</a>
              </div>
            </td>
            <td rowspan="2" width="8%" class="center" v-show="index == 0">
              小丽
            </td>
            <td rowspan="2" width="13%" class="center" v-show="index == 0">
              <ul class="unstyled">
                <li>总金额¥{{ m.totalAmount }}.00</li>
                <li>在线支付</li>
              </ul>
            </td>
            <td rowspan="2" width="8%" class="center" v-show="index == 0">
              <a href="#" class="btn">{{ m.orderStatusName }} </a>
            </td>
            <td rowspan="2" width="13%" class="center" v-show="index == 0">
              <ul class="unstyled">
                <li>
                  <a href="mycomment.html" target="_blank">评价|晒单</a>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="choose-order">
      <!-- 分页器 -->
      <Pagination
        :continue="3"
        :pageNo="page"
        :total="centerInfo.total"
        :pageSize="limit"
        @getPage="getPage"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      centerInfo: {},
      page: 1,
      limit: 3,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        let result = await this.$API.reqCenter(this.page, this.limit);
        if (result.code === 200) {
          this.centerInfo = result.data;
          console.log(result.data);
        }
      } catch (error) {
        alert(error.message);
      }
    },
    getPage(page) {
      // 修改组件响应式数据page
      this.page = page;
      this.getData();
    },
  },
};
</script>

<style></style>
