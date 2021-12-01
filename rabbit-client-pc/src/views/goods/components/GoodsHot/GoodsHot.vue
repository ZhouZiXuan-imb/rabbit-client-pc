<template>
  <div class="goods-hot">
    <h3>{{ typeName }}</h3>
    <GoodsItem
      v-for="goods in goodsHotList"
      :key="goods.id"
      :goods="goods"
    ></GoodsItem>
  </div>
</template>

<script lang="ts">
import GoodsItem from "@/views/Category/components/GoodsItem/GoodsItem.vue";

import { defineComponent, ref } from "vue";
import { getGoodsHot } from "@/api/goodsAPI";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export default defineComponent({
  name: "GoodsHot",
  props: {
    type: {
      type: Number,
      default: 1,
    },
  },
  components: { GoodsItem },
  setup(props) {
    const router = useRoute();
    const { goodsHotList, typeName } = useGetGoods(
      router.params.id as string,
      16,
      props.type
    );

    return {
      goodsHotList,
      typeName,
    };
  },
});

function useGetGoods(id: string, limit: number, type: number) {
  // goodsHotList的类型
  type GoodsHotList = {
    desc: string | null;
    discount: any;
    id: string;
    name: string;
    orderNum: number;
    picture: string;
    price: string;
  };

  // 榜单名称
  const names: { [key: number]: string } = {
    1: "24小时热销榜",
    2: "周热销榜",
    3: "总热销榜",
  };

  const goodsHotList = ref<Array<GoodsHotList>>([]);

  getGoodsHot(id, limit, type).then(
    ({ data: { result } }: { data: { result: Array<GoodsHotList> } }) => {
      goodsHotList.value = result;
    }
  );

  onBeforeRouteUpdate((to) => {
    useGetGoods(to.params.id as string, 16, type);
  });

  return {
    goodsHotList,
    typeName: names[type],
  };
}
</script>

<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  ::v-deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;

    img {
      width: 200px;
      height: 200px;
    }

    p {
      margin: 0 10px;
    }

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>