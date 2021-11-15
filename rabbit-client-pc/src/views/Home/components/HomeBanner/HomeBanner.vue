<template>
  <div class="home-banner">
    <XtxCarousel :autoPlay="true" :carousels="[]" :duration="3000"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {getBannerList} from "@/api/api";

export default defineComponent({
  name: "HomeBanner",
  setup() {
    // 声明bannerList中每个对象中属性的类型
    type bannerListItemType = {
      hrefUrl: string;
      id: string;
      imgUrl: string;
      type: string;
    }
    // 声明bannerList的类型
    type bannerListType = Array<bannerListItemType>;
    // 声明变量接收轮播图数据
    const bannerList = ref<bannerListType>([]);
    // 获取轮播图数据
    getBannerList(1).then(({data}) => {
      bannerList.value = data.result;
    })
  }
});
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  .xtx-carousel {
    // :deep：穿透样式,这样会报错,在vue中使用::v-deep和:deep是等价的
    ::v-deep(.carousel-btn.prev) {
      left: 270px;
    }

    ::v-deep(.carousel-indicator) {
      padding-left: 250px;
    }
  }
}
</style>