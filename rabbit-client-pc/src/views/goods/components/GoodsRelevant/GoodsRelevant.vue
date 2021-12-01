<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon"></i>
      <span class="title">同类商品推荐</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel :carousels="goodsRelevantList" :autoPlay="false"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {getGoodsRelevant} from "@/api/goodsAPI";

export default defineComponent({
  name: "GoodsRelevant",
  props: {
    goodsId: {
      type: String,
    },
  },
  setup(props) {
    const {goodsRelevantList} = useRelevantGoods(props.goodsId!, 16);

    return {
      goodsRelevantList,
    };
  },
});

function useRelevantGoods(id: string, limit: number) {
  // GoodsRelevant的类型
  type GoodsItemType = {
    desc: string | null;
    discount: any;
    id: string;
    name: string;
    orderNum: number;
    picture: string;
    price: string;
  };

  const goodsRelevantList = ref<Array<Array<GoodsItemType>>>([]);

  getGoodsRelevant(id, limit).then(
      ({data: {result}}: { data: { result: Array<GoodsItemType> } }) => {
        // 修改获取到的数据结构
        // 每页显示多少条数据
        const size = 4;
        // 算出一共有多少页数据, 页数等于数据的数量除以每页显示多少条数据,向上取整
        // console.log(result)
        const total = Math.ceil(result.length / size);

        // 循环向goodsRelevantList中添加修改后的数据结构
        for (let i = 0; i < total; i++) {
          // console.log();
          goodsRelevantList.value.push(result.slice(i * size, i * size + size));
        }
      }
  );
  return {
    goodsRelevantList,
  };
}
</script>

<style scoped lang="less">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;

  ::v-deep(.xtx-carousel) {
    height: 380px;

    .carousel {
      &-indicator {
        bottom: 30px;

        span {
          &.active {
            background: @xtxColor;
          }
        }
      }

      &-btn {
        top: 110px;
        opacity: 1;
        background: rgba(0, 0, 0, 0);
        color: #ddd;

        i {
          font-size: 30px;
        }
      }
    }
  }

  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;

    .title {
      font-size: 20px;
      padding-left: 10px;
    }

    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);

      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
}
</style>