<template>
  <div class="goods-image">
    <div class="middle" ref="target">
      <img
          :src="images[currentIndex]"
          alt=""
      />
      <div class="layer" :style="{left: layerPosition.left + 'px', top:layerPosition.top + 'px'}"></div>
    </div>
    <ul class="small">
      <li :class="{active: currentIndex === index}" v-for="(item,index) in images" @click="changeCurrentIndex(index)">
        <img
            :src="item"
            alt=""
        />
      </li>
    </ul>

    <!--  放大镜  -->
    <div class="large"
         :style="{backgroundImage: `url(${images[currentIndex]})`, backgroundPositionX: -bgPosition.left+'px',
         backgroundPositionY: -bgPosition.top+'px'}"></div>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref, watch} from "vue";
import {useMouseInElement} from "@vueuse/core";

export default defineComponent({
  name: "GoodsImages",
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    // 当前大图要显示的图片的索引
    const currentIndex = ref<number>(0);

    // 修改当前显示图片的索引
    function changeCurrentIndex(index) {
      currentIndex.value = index;
    }

    // 用于存储元素的DOM元素
    const target = ref(null);

    // 使用useMouseInElement方法获取鼠标是否移入当前元素，x轴和y轴的数据
    const {isOutside, elementX, elementY} = useMouseInElement(target)
    // 用于存储当前放大背景图的xy轴数据
    const bgPosition = ref({left: 0, top: 0});
    // 用于存储镜片的xy轴数据
    const layerPosition = ref({left: 0, top: 0});
    // 监听数据是否改变
    watch([isOutside, elementX, elementY], () => {
      // 用户鼠标是否进入元素
      if (!isOutside.value) {
        bgPosition.value = {
          left: elementX.value,
          top: elementY.value,
        }
        layerPosition.value = {
          left: elementX.value - 100,
          top: elementY.value - 100,
        }

        if (layerPosition.value.left < 0) {
          layerPosition.value.left = 0;
        } else if(layerPosition.value.left > 200) {
          layerPosition.value.left = 200;
        }

        if (layerPosition.value.top < 0) {
          layerPosition.value.top = 0;
        } else if(layerPosition.value.top > 200) {
          layerPosition.value.top = 200;
        }
      }
    }, {immediate: true})

    return {
      currentIndex,
      target,
      changeCurrentIndex,
      layerPosition,
      bgPosition,
    }
  }
});
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;

    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }

  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>