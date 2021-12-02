<!-- 静态布局 -->
<template>
  <div class="goods-detail">
    <!-- 属性 -->
    <ul class="attrs">
      <li v-for="goods in goodsList.details.properties" :key="goods.name">
        <span class="dt">{{ goods.name }}</span>
        <span class="dd">{{ goods.value }}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img :src="imgUrl" alt="" v-for="imgUrl in goodsList.details.pictures" />
  </div>
</template>

<script>
import { defineComponent, inject } from "vue";

export default defineComponent({
  setup() {
    const goodsList = inject("goodsList");

    return {
      goodsList,
    };
  },
});
</script>

<style scoped lang="less">
.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  > img {
    width: 100%;
  }
}
</style>