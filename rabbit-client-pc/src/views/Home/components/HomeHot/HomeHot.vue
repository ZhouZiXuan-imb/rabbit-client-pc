<template>
  <HomePanel :title="'人气推荐'" :sub-title="'新鲜出炉，品质靠谱'" ref="target">
    <!--   人气推荐   -->
    <!--    商品内容    -->
    <template #default>
      <Transition name="fade">
        <ul class="goods-list" v-if="hotGoodsList">
          <li v-for="item in hotGoodsList" :key="item.id">
            <RouterLink to="/">
              <img src="" v-lazy="item.picture" :alt="item.title" />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </Transition>
    </template>
  </HomePanel>
</template>

<script lang="ts">
import { getHotRecommend } from "@/api/homeAPI.ts";
import { defineComponent } from "vue";
import { useObserver } from "@/hook/useObserver/useObserver.ts";

import HomePanel from "@/views/Home/components/HomePanel/HomePanel.vue";
import HomeSkeleton from "@/views/Home/components/HomeSkeleton/HomeSkeleton.vue";

export default defineComponent({
  name: "HomeHot",
  components: {
    HomePanel,
    HomeSkeleton,
  },
  setup() {
    const { target, dataList } = useObserver(getHotRecommend);

    return {
      target,
      hotGoodsList: dataList,
    };
  },
});
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
