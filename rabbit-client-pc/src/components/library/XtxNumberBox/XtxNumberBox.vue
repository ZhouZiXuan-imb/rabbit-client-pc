<template>
  <div class="xtx-number-box">
    <div class="label"><slot></slot></div>
    <div class="number-box">
      <a href="javascript:" @click="onChangeNum(-1)">-</a>
      <input type="text" readonly v-model="goodsNumCount"/>
      <a href="javascript:" @click="onChangeNum(1)">+</a>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {useVModel} from "@vueuse/core";

export default defineComponent({
  name: "XtxNumberBox",
  props: {
    inventory: {
      type: Number,
      default: 1
    },
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Number,
      default: 1,
    },
  },
  setup(props, {emit}) {
    // 双向绑定modelValue
    let goodsNumCount = useVModel(props, "modelValue", emit);

    function onChangeNum(number: number) {
      const nextNumber = goodsNumCount.value + number;
      if(nextNumber < 1) {
        goodsNumCount.value = 1
      } else if(nextNumber > props.inventory!) {
        goodsNumCount.value = props.inventory!
      } else {
        goodsNumCount.value = nextNumber;
      }
    }

    return {
      goodsNumCount,
      onChangeNum,
    };
  },
});
</script>
<style scoped lang="less">
.xtx-number-box {
  display: flex;
  align-items: center;

  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }

  .number-box {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;

    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;

      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }

      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }

    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>