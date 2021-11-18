<template>
  <HomePanel title="热门品牌" subTitle="国际经典 品质保证" ref="target">
    <template v-slot:right>
      <a href="javascript:" class="iconfont icon-angle-left prev" @click="toggle(-1)" :class="{disabled:currentIndex === 0}"></a>
      <a href="javascript:" class="iconfont icon-angle-right next" @click="toggle(1)" :class="{disabled:currentIndex === pageNum}"></a>
    </template>
    <template v-slot:default>
      <div class="box">
        <Transition name="fade">
          <ul class="list" v-if="hotBrandsList" :style="{transform:`translateX(${-currentIndex * 1240}px)`}">
            <li v-for="item in hotBrandsList" :key="item">
              <RouterLink to="/">
                <img
                    src=""
                    v-lazy="item.picture"
                    alt=""
                />
              </RouterLink>
            </li>
          </ul>
          <div v-else class="skeleton">
            <xtx-skeleton class="item" v-for="item in 5" :key="item" animated="scroll" bg="#e4e4e4" width="240px"
                          height="305px"/>
          </div>
        </Transition>
      </div>
    </template>
  </HomePanel>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useObserver} from "@/hook/useObserver/useObserver";
import {getHotBrandsList} from "@/api/api.ts";

import HomePanel from "@/views/Home/components/HomePanel/HomePanel.vue";

export default defineComponent({
  name: "HomeBrand",
  components: {
    HomePanel,
  },
  setup() {

    const {target, dataList} = useObserver(getHotBrandsList)

    // 当前页的索引
    let currentIndex = ref<number>(0);

    // 最大页码
    const pageNum = ref<number>(1);

    function toggle(indexNum: number) {
      // 最大页码 = 所有数据 / 每页数据条数，向下取整; 因为length是从1开始的,我们要的是下标,所以这里-1
      pageNum.value = Math.floor(dataList.value!.length / 5)
      // 每次点击让currentIndex + indexNum
      currentIndex.value += indexNum;
      if (currentIndex.value < 0) {
        // 如果currentIndex小于0,就说明是没有上一页,就让currentIndex重新赋值为0
        currentIndex.value = 0;
      } else if (currentIndex.value >= pageNum.value) {
        // 如果currentIndex >= 最大页码,就让currentIndex=最大页码
        currentIndex.value = pageNum.value;
      }
    }

    return {
      target,
      hotBrandsList: dataList,
      toggle,
      currentIndex,
      pageNum
    }

  }
});
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}

.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;

  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }

  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}

.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;

  .skeleton {
    width: 100%;
    display: flex;

    .item {
      margin-right: 10px;

      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }

  .list {
    width: 200%;
    display: flex;
    transition: all 1s;

    li {
      margin-right: 10px;
      width: 240px;

      &:nth-child(5n) {
        margin-right: 0;
      }

      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>