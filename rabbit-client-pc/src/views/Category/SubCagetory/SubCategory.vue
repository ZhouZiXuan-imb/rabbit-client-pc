<template>
  <AppLayout>
    <div class="container">
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem :path="`/category/${category.TopCategory?.id}`">{{ category.TopCategory?.name }}</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="category.SubCategory?.name">{{ category.SubCategory?.name }}</XtxBreadItem>
        </Transition>
      </XtxBread>q
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "../../../components/AppLayout/AppLayout.vue";
import useBread from "@/hook/useBread/useBread";

export default {
  name: "SubCategory",
  components: {
    AppLayout
  },
  setup() {
    return {
      category: useBread(),
    }

  }
}
</script>

<style scoped>

</style>