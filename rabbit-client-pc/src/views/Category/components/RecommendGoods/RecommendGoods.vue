<template>
  <div class="ref-goods" v-for="item in subGoods?.children" :key="item.id">
    <div class="head">
      <h3>- {{ item.name }} -</h3>
      <p class="tag">温暖柔软，品质之选</p>
      <XtxMore/>
    </div>
    <div class="body">
      <GoodsItem v-for="goods in item.goods" :key="goods.id" :goods="goods"/>
    </div>
  </div>
</template>

<script lang="ts">
import GoodsItem from "@/views/Category/components/GoodsItem/GoodsItem.vue";

import {defineComponent} from "vue";
import {onBeforeRouteUpdate, useRouter} from "vue-router";
import {useGetSubGoods} from "@/hook/useGetSubGoods/useGetSubGoods";

export default defineComponent({
  name: "RecommendGoods",
  components: {
    GoodsItem
  },
  setup() {
    const {subGoods, getSubGoods} = useGetSubGoods()
    const router = useRouter();
    getSubGoods(router.currentRoute.value.params.id)
    onBeforeRouteUpdate((to) => {
      getSubGoods(router.currentRoute.value.params.id)
    })
    return {
      subGoods
    }
  }
})
</script>

<style lang="less" scoped>
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;

  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }

    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }

  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>