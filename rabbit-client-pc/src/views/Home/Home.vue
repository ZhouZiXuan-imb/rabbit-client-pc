<template>
  <AppLayout>
    <div class="container">
      <HomeCategory/>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppLayout from "@/components/AppLayout/AppLayout.vue";
import HomeCategory from "./components/HomeCategory.vue"

export default defineComponent({
  name: 'Home',
  components: {
    AppLayout,
    HomeCategory,
  },
});
</script>
