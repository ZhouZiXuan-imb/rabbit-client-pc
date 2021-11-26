<template>
  <div class="category-banner">
    <XtxCarousel :autoPlay="true" :carousels="carousels" :duration="3000"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useGetBannerList} from "@/hook/useGetBannerList/useGetBannerList";

export default defineComponent({
  name: "CategoryBanner",
  async setup() {
    // 声明bannerList中每个对象中属性的类型
    type bannerListItemType = {
      hrefUrl: string;
      id: string;
      imgUrl: string;
      type: string;
    }
    // 声明bannerList的类型
    type carouselsListType = Array<bannerListItemType>;
    // 声明变量接收轮播图数据
    let carousels = ref<carouselsListType>();
    // 获取轮播图数据
    const result = await useGetBannerList(1)
    carousels.value = result;

    return {
      carousels
    }
  }
});
</script>
<style scoped lang="less">
.category-banner {
  width: 1240px;
  height: 500px;
  //position: absolute;
  //left: 0;
  //top: 0;
  //z-index: 98;

  .xtx-carousel {
    // :deep：穿透样式,这样会报错,在vue中使用::v-deep和:deep是等价的
    ::v-deep(.carousel-btn.prev) {
      //left: 270px;
    }

    ::v-deep(.carousel-indicator) {
      //padding-left: 250px;
    }
  }
}
</style>