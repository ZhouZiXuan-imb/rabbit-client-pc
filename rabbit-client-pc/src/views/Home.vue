<template>
  <AppLayout>
    <h2>Home页</h2>
  </AppLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppLayout from "@/components/AppLayout/AppLayout.vue";

export default defineComponent({
  name: 'Home',
  components: {
    AppLayout,
  },
});
</script>
