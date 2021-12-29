<template>
  <div class="xtx-pagination">
    <a href="javascript:" @click="currentPage -= 1" v-if="currentPage > 1">上一页</a>
    <span v-if="pageButtonChanged.start > 1">...</span>
    <a
      href="javascript:"
      :class="{ active: currentPage === item }"
      @click="currentPage = item"
      v-for="item in pageButtonChanged.pageButtonArray"
      >{{ item }}</a
    >

    <span v-if="pageButtonChanged.end < pageButtonChanged.totalPage">...</span>
    <a href="javascript:" @click="currentPage += 1" v-if="currentPage < pageButtonChanged.totalPage">下一页</a>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent} from "vue";
import { useVModel } from "@vueuse/core";

export default defineComponent({
  name: "XtxPagination",
  props: {
    page: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    totalCount:{
      type:Number,
      default: 100
    }
  },
  setup(props, { emit }) {

    // 声明变量存储当前是第几页
    const currentPage = useVModel(props, "page", emit);

    // 声明变量存储要显示多少个分页
    const pageButtonNumber = 5;

    // 计算分页的偏移量，每页显示多少个分页
    const pageOffset = Math.floor(pageButtonNumber / 2);

    let pageButtonChanged = computed(() => {
      // 开始分页页码
      let start = currentPage.value - pageOffset;

      // 结束分页页码
      let end = start + pageButtonNumber - 1;

      // 计算总页数
      let totalPage = Math.ceil(props.totalCount / props.pageSize);

      // 判断如果开始分页页码小于1，就让开始分页等于1
      // 并且重新计算结束页码
      if (start < 1) {
        start = 1;
        let temp = start + pageButtonNumber - 1;
        end = temp > totalPage ? totalPage : temp;
      }

      // 判断如果结束分页页码到了最大页数，就让结束分页页码等于最大页数
      // 并且重新计算开始页码
      if (end > totalPage) {
        end = totalPage;
        let temp = end - pageButtonNumber + 1;
        start = start < 1 ? 1 : temp;
      }

      // 限制当前页码不能小于1
      if (currentPage.value < 1) {
        currentPage.value = 1;
      }

      // 限制当前页码不能大于最大页码
      if (currentPage.value > totalPage) {
        currentPage.value = totalPage;
      }

      const pageButtonArray = [];

      for (let i = start; i <= end; i++) {
        pageButtonArray.push(i);
      }

      return {
        pageButtonArray,
        totalPage,
        start,
        end,
      };
    });

    return {
      currentPage,
      pageButtonChanged,
    };
  },
});
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;

  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;

    &:hover {
      color: @xtxColor;
    }

    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;

      &:hover {
        color: #333;
      }
    }
  }

  > span {
    margin-right: 10px;
  }
}
</style>