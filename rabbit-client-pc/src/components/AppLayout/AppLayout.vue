<template>
  <!-- 顶部导航 -->
  <AppTopNav/>
  <!-- 头部 -->
  <AppHeader/>

  <!-- 吸顶组件 -->
  <AppHeaderSticky />

  <!-- 插槽，主体部分 -->
  <slot></slot>

  <!-- 底部 -->
  <AppFooter/>
</template>

<script>
import AppTopNav from "@/components/AppTopNav/AppTopNav.vue";
import AppHeader from "@/components/AppHeader/AppHeader";
import AppFooter from "@/components/AppFooter/AppFooter";
import AppHeaderSticky from "@/components/AppHeaderSticky/AppHeaderSticky.vue";

import {useStore} from "vuex"

export default {
  name: "AppLayout",
  components: {
    AppTopNav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup() {
    const store = useStore();
    store.dispatch('category/useSetCategoryList');

  }
}
</script>

<style scoped>

</style>