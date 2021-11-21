<template>
  <div class="xtx-checkbox" @click="toggle">
    <i class="iconfont icon-checked" v-if="isChecked"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <span><slot></slot></span>
  </div>
</template>
<script lang="ts">
// import {ref, watchEffect} from "vue";
import {useVModel} from "@vueuse/core";

export default {
  name: "XtxCheckbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, {emit}) {


    // 声明是否选中变量
    // const isChecked = ref<boolean>(false)
    // 切换选中状态方法
    // function toggle () {
    //   isChecked.value = !isChecked.value
    //
    //   emit('update:modelValue', isChecked);
    // }
    //
    // watchEffect(() => {
    //   isChecked.value = props.modelValue
    // })


    // 使用useVModel代替上面的方法
    // useVModel 实现双向数据绑定
    // 将 props 中的 modelValue 实现双向数据绑定
    // useModel 的返回值是一个新的响应式数据, 可以在当前模板中直接使用
    const isChecked = useVModel(props, 'modelValue', emit);

    function toggle() {
      isChecked.value = !isChecked.value;
    }


    return {
      toggle,
      isChecked,
    };
  }
};
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;

  .icon-checked {
    color: @xtxColor;

    ~ span {
      color: @xtxColor;
    }
  }

  i {
    position: relative;
    top: 1px;
  }

  span {
    margin-left: 2px;
  }

  i, span {
    cursor: pointer;
  }
}
</style>