<template>
  <AppLayout>
    <div class="container">
      <HomeCategory/>
      <!--   强制让setup同步的组件   -->
      <Suspense>
        <HomeBanner/>
      </Suspense>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppLayout from "@/components/AppLayout/AppLayout.vue";
import HomeCategory from "./components/HomeCategory/HomeCategory.vue"
import HomeBanner from "./components/HomeBanner/HomeBanner.vue"

export default defineComponent({
  name: 'Home',
  components: {
    AppLayout,
    HomeCategory,
    HomeBanner,
  },
});
</script>
