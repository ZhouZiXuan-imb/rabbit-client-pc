<template>
  <AppLayout>
    <div class="container">
      <!--   面包屑导航   -->
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem :path="`/category/${category.TopCategory?.id}`">{{ category.TopCategory?.name }}</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="category.SubCategory?.name">{{ category.SubCategory?.name }}</XtxBreadItem>
        </Transition>
      </XtxBread>

      <!--   筛选组件   -->
      <SubFilter></SubFilter>

      <XtxCheckbox v-model="test">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox v-model="test1">仅显示特惠商品</XtxCheckbox>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from "../../../components/AppLayout/AppLayout.vue";
import SubFilter from "@/views/Category/SubCagetory/components/SubFilter/SubFilter.vue";

import useBread from "@/hook/useBread/useBread";
import {ref} from "vue";

export default {
  name: "SubCategory",
  components: {
    AppLayout,
    SubFilter
  },
  setup() {

    const test = ref(false);
    const test1 = ref(false);
    return {
      category: useBread(),
      test,
      test1,
    }

  }
}
</script>

<style scoped>

</style>