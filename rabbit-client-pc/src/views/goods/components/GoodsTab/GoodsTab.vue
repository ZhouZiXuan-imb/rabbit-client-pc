<template>
  <div class="goods-tabs">
    <nav>
      <a href="javascript:" :class="{active: activeComponentName === 'GoodsDetail'}" @click="activeComponentName = 'GoodsDetail'">商品详情</a>
      <a href="javascript:" :class="{active: activeComponentName === 'GoodsComment'}" @click="activeComponentName = 'GoodsComment'">商品评价<span>(500+)</span></a>
    </nav>
    <!-- 切换内容的地方 -->
    <GoodsDetail v-if="activeComponentName==='GoodsDetail'"></GoodsDetail>
    <GoodsComment v-if="activeComponentName==='GoodsComment'"></GoodsComment>
  </div>
</template>
<script lang="ts">
import GoodsDetail from "@/views/goods/components/GoodsDetail/GoodsDetail.vue";
import GoodsComment from "@/views/goods/components/GoodsComment/GoodsComment.vue";

import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "GoodsTab",
  components:{
    GoodsDetail,
    GoodsComment,
  },
  setup() {
    const activeComponentName = ref("GoodsDetail")

    return {
      activeComponentName
    }
  }
});
</script>
<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>