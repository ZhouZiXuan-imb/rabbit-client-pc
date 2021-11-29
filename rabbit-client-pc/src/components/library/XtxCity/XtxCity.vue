<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle">
      <span class="placeholder" v-if="!location">请选择配送地址</span>
      <span class="placeholder" v-else>{{ location }}</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="isShowCity">
      <template v-if="cityData">
        <span class="ellipsis" v-for="item in list" :key="item.code" @click="selectCityData(item)">{{
            item.name
          }}</span>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, reactive, ref} from "vue";
import {onClickOutside} from "@vueuse/core";
import axios from "axios";

export default defineComponent({
  name: "XtxCity",
  props: {
    location: {
      type: String,
      default: "",
    }
  },
  setup(props, {emit}) {

    // 配送地址显示隐藏
    const isShowCity = ref<boolean>(false);
    // 获取DOM元素
    const target = ref<HTMLElement>();

    type cityDataItemType = {
      areaList: Array<cityDataItemType>;
      code: string;
      level: number
      name: string;
    }
    type cityDataType = Array<cityDataItemType>;

    // 城市列表数据
    const cityData = ref<cityDataType>();

    // 用户选择后的数据的类型
    type selectedCityDataType = {
      provinceCode: string
      cityCode: string
      countyCode: string
      provinceName: string
      cityName: string
      countyName: string
      location: string
      [key:string]: string
    }
    // 用户选择完城市后的数据
    const selectedCityData = reactive<selectedCityDataType>({
      provinceCode: "",
      cityCode: "",
      countyCode: "",
      provinceName: "",
      cityName: "",
      countyName: "",
      location: "",
    })

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

      // 重置用户选择好的城市数据
      for (const key in selectedCityData) {
        selectedCityData[key]  = "";
      }
    }

    // 切换城市列表显示隐藏
    function toggle() {
      isShowCity.value ? hide() : show();
    }

    // 点击元素外隐藏城市列表
    onClickOutside(target, () => {
      hide();
    })

    // 用户选择省市的方法
    function selectCityData(data: cityDataItemType) {
      if (data.level === 0) {
        selectedCityData.provinceCode = data.code;
        selectedCityData.provinceName = data.name;
      } else if (data.level === 1) {
        selectedCityData.cityCode = data.code;
        selectedCityData.cityName = data.name;
      } else {
        selectedCityData.countyCode = data.code;
        selectedCityData.countyName = data.name;

        // 当区也选择完成后，把所有数据全部添加到selectedCityData.location中
        selectedCityData.location = `${selectedCityData.provinceName} ${selectedCityData.cityName} ${selectedCityData.countyName}`;
      }
    }

    // 使用计算属性监听用户是否选择了城市列表数据
    let list = computed(() => {
      // 定义变量默认返回省级数据
      let list: cityDataType = cityData.value!;
      // 如果选择了省级数据
      if (selectedCityData.provinceCode) {
        list = list.find(city => selectedCityData.provinceCode === city.code)!.areaList;
      }
      // 如果选择了市级数据
      if (selectedCityData.cityCode) {
        list = list.find(city => selectedCityData.cityCode === city.code)!.areaList;
      }
      // 如果选择了区级数据
      if (selectedCityData.countyCode) {
        list = list.find(city => selectedCityData.countyCode === city.code)!.areaList;
        // 选择了区级数据后直接把数据传给父组件
        emit('onCityChanged', {...selectedCityData})
        // 隐藏城市列表并清空XtxCity组件中的selectedCityData数据
        hide();
        // 重置城市列表数据
        list = cityData.value!;
      }

      return list;

    })


    return {
      target,
      isShowCity,
      toggle,
      cityData,
      selectCityData,
      list,
    }
  }
});

(window as any).cityData = null;

// 获取城市数据
async function getCityData() {
  // 如果window对象中已经缓存了城市数据, 从 window 对象中获取城市数据
  if (window['cityData' as any]) return window['cityData' as any];
  // window 对象中没有城市数据, 向服务器端发送请求获取城市数据
  let response = await axios.get(
      "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
  );
  // 将城市数据缓存到 window 对象中, 并作为当前方法的返回值
  return (window['cityData' as any] = response.data);
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

    .loading {
      height: 290px;
      width: 100%;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }

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