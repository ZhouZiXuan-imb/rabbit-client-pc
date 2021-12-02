<template>
  <div class="goods-comment-image">
    <div class="list">
      <a href="javascript:" v-for="picture in pictures" :key="picture" @click="onImageChange(picture)">
        <img :src="picture" alt="" />
      </a>
    </div>
    <div class="preview" v-if="img">
      <img :src="img" alt="" />
      <i class="iconfont icon-close-new" @click="onImageChange('')"></i>
    </div>
  </div>
</template>
<script lang="ts">
import {ref, defineComponent} from "vue";

export default defineComponent({
  name: "GoodsCommentImage",
  props: {
    pictures: {
      type: Array,
      default: () => [],
    },
  },
  setup() {

    const img = ref<string>('')

    function onImageChange(imgUrl: string) {
      img.value = imgUrl
    }

    return {
      img,
      onImageChange,
    }
  }
});
</script>
<style scoped lang="less">
.goods-comment-image {
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    a {
      width: 120px;
      height: 120px;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &.active {
        border-color: @xtxColor;
      }
    }
  }
  .preview {
    width: 480px;
    height: 480px;
    border: 1px solid #e4e4e4;
    background: #f8f8f8;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    i {
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 30px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>