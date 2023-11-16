<template>
  <div class="pagination">
    <button :disabled="pageNo <= 1" @click="$emit('handle', pageNo - 1)">
      上一页
    </button>
    <button
      v-show="startAndEnd.start > 1"
      :class="{ active: pageNo == 1 }"
      @click="$emit('handle', 1)"
    >
      1
    </button>

    <button v-show="startAndEnd.start > 2">···</button>

    <button
      v-for="(n, index) in startAndEnd.end"
      :key="index"
      v-show="n >= startAndEnd.start"
      :class="{ active: pageNo == n }"
      @click="$emit('handle', n)"
    >
      {{ n }}
    </button>

    <button v-show="startAndEnd.end + 2 < totalPage">···</button>
    <button
      v-show="startAndEnd.end < totalPage"
      :class="{ active: pageNo == totalPage }"
      @click="$emit('handle', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="startAndEnd.end >= totalPage"
      @click="$emit('handle', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }}条</button>
    {{ startAndEnd }}--{{ pageNo }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: 1,
    };
  },
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continue"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startAndEnd() {
      let start = this.pageNo - parseInt(this.continue / 2);
      let end = this.pageNo + parseInt(this.continue / 2);
      if (this.totalPage < this.continue) {
        end = this.totalPage;
      } else if (end > this.totalPage) {
        end = this.totalPage;
        start = end - this.continue + 1;
      }

      if (start <= 0) {
        start = 1;
      }
      return { start, end };
    },
    // methods: {},
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
