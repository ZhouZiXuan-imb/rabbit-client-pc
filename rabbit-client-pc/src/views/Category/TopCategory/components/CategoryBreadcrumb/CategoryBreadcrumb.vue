<template>
  <XtxBread>
    <XtxBreadItem path="/">首页</XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem :key="category.TopCategory?.name">{{ category.TopCategory?.name }}</XtxBreadItem>
    </Transition>
  </XtxBread>
</template>

<script>
import useBread from "@/hook/useBread/useBread";

export default {
  name: "CategoryBreadcrumb",
  setup() {
    return {category: useBread()}
  }
}
</script>

<style scoped>

</style>