<template>
  <!--   新鲜好物   -->
  <HomePanel :title="'新鲜好物'" :sub-title="'新鲜出炉，品质靠谱'" ref="target">
    <!--    右侧的查看全部    -->
    <template #right>
      <XtxMore></XtxMore>
    </template>
    <!--    商品内容    -->
    <template #default>
      <Transition name="fade">
        <ul class="goods-list" v-if="newGoodsList">
          <li v-for="item in newGoodsList" :key="item.id">
            <RouterLink to="/">
              <img
                  src=""
                  v-lazy="item.picture"
                  alt=""
              />
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton bg="#f0f9f4" v-else/>
      </Transition>
    </template>
  </HomePanel>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useObserver} from "@/hook/useObserver/useObserver";
import {getNewGoodsList} from "@/api/api";

import HomePanel from "@/views/Home/components/HomePanel/HomePanel.vue";
import HomeSkeleton from "@/views/Home/components/HomeSkeleton/HomeSkeleton.vue"

export default defineComponent({
  name: "HomeNew",
  components: {
    HomePanel,
    HomeSkeleton,
  },
  setup() {

    // const newGoodsList = ref([])

    const {target, dataList} = useObserver(getNewGoodsList)

    return {
      target,
      newGoodsList: dataList,

    }
  }
})
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>