<template>
  <!-- 一级分类 -->
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li v-for="(item) in category.categoryList" @mouseleave="close(item.id)" @mouseenter="open(item.id)" @click="close(item.id)">
      <RouterLink @click="close(item.id)" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
      <!--   二级分类   -->
      <AppTwoCategory :openVar="item.open" :item="item" @close="close"/>
    </li>
  </ul>
</template>

<script>
import {defineComponent} from "vue";
import {useStore} from "vuex";
// 引入二级分类组件
import AppTwoCategory from "@/components/AppTwoCategory/AppTwoCategory.vue";

export default defineComponent({
  name: "AppHeaderNav",
  components: {
    AppTwoCategory,
  },
  setup() {
    const store = useStore();

    // store的整个获取到默认是响应式的，不需要computed监听
    const category = store.state.category;

    // 鼠标移入一级分类时修改categoryList中的open
    function open(id) {
      store.commit('category/open', id)
    }

    // 鼠标移出一级分类时修改categoryList中的open
    function close(id) {
      store.commit('category/close', id)
    }

    return {
      category,
      open,
      close
    }
  }
})
</script>

<style scoped lang="less">
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;


  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }

    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }

      > .layer {
        height: 132px;
        opacity: 1;
      }
    }
  }
}
</style>