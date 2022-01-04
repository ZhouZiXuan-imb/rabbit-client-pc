<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="isShow">
      <div class="loading" v-if="isLoading"></div>
      <GoodsSku v-if="!isLoading && specsAndSkus" :skuId="skuId" :specs="specsAndSkus?.specs" :skus="specsAndSkus?.skus" @onSpecChanged="onSpecChanged"></GoodsSku>
      <XtxButton @click="submitSku" v-if="specsAndSkus" type="primary" size="mini" style="margin-left: 60px">
        确定
      </XtxButton>
    </div>
  </div>
</template>
<script lang="ts">
import GoodsSku from "@/views/goods/components/GoodsSku/GoodsSku.vue";

import { defineComponent, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { getCartGoodsSku } from "@/api/cartAPI";
import {goodsDetailType} from "@/type/goodsDetailType";

export default defineComponent({
  name: "CartSku",
  props: {
    attrsText: {
      type: String,
      default: "",
    },
    skuId: {
      type: String,
    },
  },
  components:{
    GoodsSku
  },
  setup(props) {
    // 声明显示/隐藏下拉框变量
    let isShow = ref(false);
    // 获取组件DOM
    let target = ref(null);

    type skusAndSpecsType = {
      skus: goodsDetailType['skus'];
      specs: goodsDetailType['specs']
    }

    // 供用户选择的规格选择数据 所有可组合的规格组合
    let specsAndSkus = ref<skusAndSpecsType>();
    let isLoading = ref(false);

    // 显示下拉框的方法
    function show() {
      // 显示下拉框
      isShow.value = true;
      // 发起请求前显示加载动画
      isLoading.value = true;
      getData().then(({ data: { result } }: { data: { result: skusAndSpecsType } }) => {
        // 数据获取完成后关闭加载动画显示数据
        isLoading.value = false;

        specsAndSkus.value = result;
        console.log(specsAndSkus.value)
      });
    }

    // 隐藏下拉框的方法
    function hide() {
      isShow.value = false;
    }

    function toggle() {
      isShow.value ? hide() : show();
    }

    // 点击了DOM组件之外的地方就会调用hide方法，前提是isShow为true的情况下
    onClickOutside(target, () => {
      isShow.value && hide();
    });

    // 获取sku数据的方法
    function getData() {
      return getCartGoodsSku(props.skuId!);
    }

    function submitSku() {

    }

    function onSpecChanged(sku: any) {
      console.log(sku,'aaaSku')
    }

    return {
      isShow,
      target,
      specsAndSkus,
      isLoading,
      toggle,
      onSpecChanged,
      submitSku,
    };
  },
});
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;

  .attrs {
    line-height: 24px;
    display: flex;

    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }

    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }

  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;

    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }

    .loading {
      height: 224px;
      background: url(../../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>