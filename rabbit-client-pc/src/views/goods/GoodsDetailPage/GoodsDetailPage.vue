<template>
  <AppLayout>
    <div class="container" v-if="goodsList">
      <!--   面包屑导航   -->
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem :path="`/category/${goodsList?.categories[1].id}`"
          >{{ goodsList?.categories[1].name }}
        </XtxBreadItem>
        <XtxBreadItem :path="`/category/sub/${goodsList?.categories[0].id}`"
          >{{ goodsList?.categories[0].name }}
        </XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="goodsList?.id"
            >{{ goodsList?.name }}
          </XtxBreadItem>
        </transition>
      </XtxBread>

      <!--   商品信息   -->
      <div class="goods-info">
        <!-- 左侧 -->
        <div class="media">
          <!--   图片预览组件   -->
          <GoodsImages :images="goodsList?.mainPictures"></GoodsImages>
          <!--  商品销售信息组件  -->
          <GoodsSales></GoodsSales>
        </div>
        <!-- 右侧 -->
        <div class="spec">
          <!--商品基本信息组件-->
          <GoodsInfo :goods="goodsList"></GoodsInfo>
          <!--skuId="1369155862131642369"-->
          <GoodsSku
            :specs="goodsList?.specs"
            :skus="goodsList?.skus"
            @onSpecChanged="onSpecChanged"
          />

          <XtxNumberBox
            :inventory="goodsList?.inventory"
            label="数量"
            v-model="goodsNumCount"
          ></XtxNumberBox>

          <XtxButton type="primary" style="margin-top: 15px"
            >加入购物车
          </XtxButton>
        </div>
      </div>

      <!--   同类商品组件   -->
      <GoodsRelevant :goodsId="goodsList?.id" />

      <div class="goods-footer">
        <div class="goods-article">
          <!--   标签页组件   -->
          <GoodsTab />

          <GoodsWarn />
        </div>

        <div class="goods-aside">
          <!--   热榜组件   -->
          <GoodsHot :type="1" />
          <GoodsHot :type="2" />
          <GoodsHot :type="3" />
        </div>

      </div>

    </div>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from "@/components/AppLayout/AppLayout.vue";
import GoodsImages from "@/views/goods/components/GoodsImages/GoodsImages.vue";
import GoodsSales from "@/views/goods/components/GoodsSales/GoodsSales.vue";
import GoodsInfo from "@/views/goods/components/GoodsInfo/GoodsInfo.vue";
import GoodsSku from "@/views/goods/components/GoodsSku/GoodsSku.vue";
import GoodsRelevant from "@/views/goods/components/GoodsRelevant/GoodsRelevant.vue";
import GoodsTab from "@/views/goods/components/GoodsTab/GoodsTab.vue";
import GoodsHot from "@/views/goods/components/GoodsHot/GoodsHot.vue";
import GoodsWarn from "@/views/goods/components/GoodsWarn/GoodsWarn.vue";

import { defineComponent, provide, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { getGoodsDetail } from "@/api/goodsAPI";
import { goodsDetailType } from "@/type/goodsDetailType";

export default defineComponent({
  name: "GoodsDetailPage",
  components: {
    AppLayout,
    GoodsImages,
    GoodsSales,
    GoodsInfo,
    GoodsSku,
    GoodsRelevant,
    GoodsTab,
    GoodsHot,
    GoodsWarn,
  },
  setup() {
    const { goodsList } = useGoods();
    let goodsNumCount = ref<number>(1);

    // 子组件中用户选择了规格调用方法获取到更新后的值
    function onSpecChanged(skus: any) {
      // console.log(skus)
    }

    provide("goodsList", goodsList);

    return {
      goodsList,
      onSpecChanged,
      goodsNumCount,
    };
  },
});

function useGoods() {
  // 获取路由数据
  const router = useRoute();
  // 存储商品列表的变量
  let goodsList = ref<goodsDetailType>();

  // 获取商品数据
  function getGoods(router: string) {
    // 发起请求
    getGoodsDetail(router).then(
      ({ data: { result } }: { data: { result: goodsDetailType } }) => {
        // 赋值
        goodsList.value = result;
      }
    );
  }

  // 当路由发生改变时重新调用getGoods方法
  onBeforeRouteUpdate((to) => {
    getGoods(to.params.id as string);
  });
  // 初始化页面调用getGoods方法
  getGoods(router.params.id as string);

  // ======================================

  return {
    goodsList,
  };
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>