<template>
  <div class="xtx-carousel" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
    <ul class="carousel-body">
      <li :class="['carousel-item', activeIndex === index?'fade':'']" v-for="(item,index) in carousels">
        <RouterLink to="/">
          <img
              :src="item.imgUrl"
              alt=""
          />
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:" class="carousel-btn prev" @click="toggle(-1)"
    ><i class="iconfont icon-angle-left"></i
    ></a>
    <a href="javascript:" class="carousel-btn next" @click="toggle(1)"
    ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator">
      <span v-for="(item,index) in carousels" :key="item" :class="{active: index === activeIndex}"
            @click="onClickIndicator(index)"></span>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {useBannerToggle} from "./useBannerToggle"

export default defineComponent({
  name: "XtxCarousel",
  props: {
    autoPlay: {
      type: Boolean,
      default: true
    },
    carousels: {
      type: Array
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup(props) {
    // 使用computed监听carousels，因为carousels是异步传来的，不使用computed监听拿不到值
    const carouselsList = computed(() => props.carousels);

    const {activeIndex, onClickIndicator, toggle, startAutoPlay, stopAutoPlay} = useBannerToggle({carousels: carouselsList, autoPlay:props.autoPlay, duration: props.duration});



    return {
      activeIndex,
      onClickIndicator,
      toggle,
      startAutoPlay,
      stopAutoPlay
    }
  }
});
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;

  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }

    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;

      &.fade {
        opacity: 1;
        z-index: 1;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;

      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;

        ~ span {
          margin-left: 12px;
        }

        &.active {
          background: #fff;
        }
      }
    }

    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;

      &.prev {
        left: 20px;
      }

      &.next {
        right: 20px;
      }
    }
  }

  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>