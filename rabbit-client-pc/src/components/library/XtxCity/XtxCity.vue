<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="isShowCity">
      <span class="ellipsis" v-for="item in cityData" :key="item.code">{{ item.name }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref} from "vue";
import {onClickOutside} from "@vueuse/core";
import axios from "axios";

export default defineComponent({
  name: "XtxCity",
  setup() {

    // 配送地址显示隐藏
    const isShowCity = ref<boolean>(false);
    // 获取DOM元素
    const target = ref<HTMLElement>();

    type cityDataItemType = {
      areaList: Array<{}>;
      code: string;
      level: number
      name: string;
    }
    type cityDataType = Array<cityDataItemType>;
    // 城市列表数据
    const cityData = ref<cityDataType>();

    // 显示城市列表
    function show() {
      // 获取城市列表数据
      getCityData().then((result) => {
        cityData.value = result;
      })
      isShowCity.value = true;
    }

    // 隐藏城市列表
    function hide() {
      isShowCity.value = false;
    }

    // 切换城市列表显示隐藏
    function toggle() {
      isShowCity.value ? hide() : show();
    }

    // 点击元素外隐藏城市列表
    onClickOutside(target, () => {
      hide();
    })

    return {
      target,
      isShowCity,
      toggle,
      cityData,
    }
  }
});

window.cityData = null;

// 获取城市数据
async function getCityData() {
  // 如果window对象中已经缓存了城市数据, 从 window 对象中获取城市数据
  if (window.cityData) return window.cityData;
  // window 对象中没有城市数据, 向服务器端发送请求获取城市数据
  let response = await axios.get(
      "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
  );
  // 将城市数据缓存到 window 对象中, 并作为当前方法的返回值
  return (window.cityData = response.data);
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      color: #666;
      font-size: 12px;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>