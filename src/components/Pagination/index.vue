<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button
      @click="$emit('getPageNo', page)"
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      @click="$emit('getPageNo', pageNo + 1)"
      :disabled="pageNo == totalPage"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总共的页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续的页码的起始数字与结束数字
    startNumAndEndNum() {
      //先定义两个变量存储起始数字和结束数字
      let start = 0;
      let end = 0;
      //连续的页码数字是5【至少要5页】
      if (parseInt(this.continues) > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        start = this.pageNo - Math.floor(this.continues / 2);
        end = this.pageNo + Math.floor(this.continues / 2);
        //纠正如果页码出现负数或者页码等于0
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        //纠正如果页码大于总页数
        if (end > this.totalPage) {
          start = this.totalPage - this.continues + 1;
          end = this.totalPage;
        }
      }
      return { start, end };
    },
  },
  methods: {},
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