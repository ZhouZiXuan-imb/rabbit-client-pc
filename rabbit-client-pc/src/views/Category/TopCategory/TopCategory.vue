<template>
  <AppLayout>
    <div class="container">
      <!--   面包屑导航   -->
      <CategoryBreadcrumb></CategoryBreadcrumb>

      <!--    轮播图   -->
      <Suspense>
        <CateGoryBanner></CateGoryBanner>
      </Suspense>

    </div>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from "@/components/AppLayout/AppLayout.vue";
import CateGoryBanner from "@/views/Category/TopCategory/components/CategoryBanner/CategoryBanner.vue"
import CategoryBreadcrumb from "@/views/Category/TopCategory/components/CategoryBreadcrumb/CategoryBreadcrumb.vue"
import {defineComponent} from "vue";

export default defineComponent({
  name: "TopCategory",
  components: {
    AppLayout,
    CateGoryBanner,
    CategoryBreadcrumb,
  },
  setup() {
  }
})
</script>