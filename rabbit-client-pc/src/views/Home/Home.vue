<template>
  <AppLayout>
    <div class="container">
      <HomeCategory/>
      <!--   强制让setup同步的组件   -->
      <Suspense>
        <HomeBanner/>
      </Suspense>
    </div>

    <!--  新鲜好物  -->
    <HomeNew></HomeNew>

    <!--  人气推荐  -->
    <HomeHot></HomeHot>

    <!-- 热门品牌 -->
    <HomeBrand></HomeBrand>

    <!--  产品区块组件  -->
    <HomeProduct></HomeProduct>

    <HomeSpecial />
  </AppLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppLayout from "@/components/AppLayout/AppLayout.vue";
import HomeCategory from "./components/HomeCategory/HomeCategory.vue"
import HomeBanner from "./components/HomeBanner/HomeBanner.vue"
import HomeNew from "@/views/Home/components/HomeNew/HomeNew.vue";
import HomeHot from "@/views/Home/components/HomeHot/HomeHot.vue";
import HomeBrand from "@/views/Home/components/HomeBrand/HomeBrand.vue"
import HomeProduct from "@/views/Home/components/HomeProduct/HomeProduct.vue"
import HomeSpecial from "@/views/Home/components/HomeSpecial/HomeSpecial.vue"

export default defineComponent({
  name: 'Home',
  components: {
    AppLayout,
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial,
  },
});
</script>
