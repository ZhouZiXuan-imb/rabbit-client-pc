<template>
    <div class="xtx-bread-item" :key="path">  <!--面包屑导航-->
      <RouterLink v-if="path" :to="path">
        <slot></slot>
      </RouterLink>
      <span v-else><slot></slot></span>
    </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "XtxBreadItem",
  props: {
    path: {
      type: String
    }
  }
});
</script>

<style scoped lang="less">
.xtx-bread-item {
  a {
    color: #666;
    transition: all 0.4s;

    &:hover {
      color: @xtxColor;
    }
  }
}
</style>