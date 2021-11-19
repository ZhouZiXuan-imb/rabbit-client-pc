<template>
  <AppLayout>
    <div class="container">
      <!--   面包屑导航   -->
      <CategoryBreadcrumb></CategoryBreadcrumb>

      <!--    轮播图   -->
      <Suspense>
        <CateGoryBanner></CateGoryBanner>
      </Suspense>

      <!--   二级分类   -->
      <ShowSubCategoryList :category="category"/>

      <RecommendGoods/>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import useBread from "@/hook/useBread/useBread";

import AppLayout from "@/components/AppLayout/AppLayout.vue";
import CateGoryBanner from "@/views/Category/TopCategory/components/CategoryBanner/CategoryBanner.vue"
import CategoryBreadcrumb from "@/views/Category/TopCategory/components/CategoryBreadcrumb/CategoryBreadcrumb.vue"
import ShowSubCategoryList from "@/views/Category/TopCategory/components/ShowSubCategoryList/ShowSubCategoryList.vue"
import RecommendGoods from "@/views/Category/TopCategory/components/RecommendGoods/RecommendGoods.vue"

export default defineComponent({
  name: "TopCategory",
  components: {
    AppLayout,
    CateGoryBanner,
    CategoryBreadcrumb,
    ShowSubCategoryList,
    RecommendGoods,
  },
  setup() {
    return {
      category: useBread()
    }
  }
})
</script>