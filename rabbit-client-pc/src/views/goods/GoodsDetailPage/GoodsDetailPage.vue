<template>
  <AppLayout>
    <div class="container">
      <!--   面包屑导航   -->
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem :path="`/category/${goodsList?.categories[1].id}`">{{goodsList?.categories[1].name}}</XtxBreadItem>
        <XtxBreadItem :path="`/category/sub/${goodsList?.categories[0].id}`">{{goodsList?.categories[0].name}}</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="goodsList?.id">{{goodsList?.name}}</XtxBreadItem>
        </transition>
      </XtxBread>

      <!--   图片预览组件   -->
      <GoodsImages :images="goodsList?.mainPictures"></GoodsImages>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from "@/components/AppLayout/AppLayout.vue";
import XtxBread from "@/components/library/XtxBread/XtxBread.vue";
import XtxBreadItem from "@/components/library/XtxBreadItem/XtxBreadItem.vue";
import GoodsImages from "@/views/goods/components/GoodsImages/GoodsImages.vue";

import {defineComponent, ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {getGoodsDetail} from "@/api/goodsAPI";
import {goodsDetailType} from "@/type/goodsDetailType";

export default defineComponent({
  name: "GoodsDetailPage",
  components: {
    AppLayout,
    XtxBread,
    XtxBreadItem,
    GoodsImages,
  },
  setup() {
    const {goodsList} = useGoods();

    return {
      goodsList,
    };
  },
});

function useGoods() {
  // 获取路由数据
  const router = useRoute();
  // 存储商品列表的变量
  let goodsList = ref<goodsDetailType>();
  // 获取商品数据
  function getGoods(router: string) {
    // 发起请求
    getGoodsDetail(router).then(({data: {result}}: { data: { result: goodsDetailType } }) => {
      // 赋值
      goodsList.value = result;
    });
  }
  // 当路由发生改变时重新调用getGoods方法
  onBeforeRouteUpdate((to) => {
    getGoods(to.params.id as string)
  })
  // 初始化页面调用getGoods方法
  getGoods(router.params.id as string);

  // ======================================


  return {
    goodsList,
  };
}
</script>

<style scoped></style>
