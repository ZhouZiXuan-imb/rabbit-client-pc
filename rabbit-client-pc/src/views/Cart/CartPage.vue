<template>
  <AppLayout>
    <div class="cart-page">
      <div class="container">
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem>购物车</XtxBreadItem>
        </XtxBread>
        <div class="cart">
          <table>
            <thead>
              <tr>
                <th><XtxCheckbox :modelValue="selectedAllButtonStatus" @update:modelValue="selectAllGoods($event)" >全选</XtxCheckbox></th>
                <th>商品信息</th>
                <th>单价</th>
                <th>数量</th>
                <th>小计</th>
                <th>操作</th>
              </tr>
            </thead>
            <!-- 有效商品 -->
            <tbody>
              <tr v-for="goods in $store.state['cart'].goodsList" :key="goods">
                <td><XtxCheckbox :modelValue="goods.selected" @update:modelValue="selectGoods(goods.skuId, $event)" /></td>
                <td>
                  <div class="goods">
                    <RouterLink :to="`/goods/detail/${goods.id}`"
                      ><img :src="goods.picture" alt=""
                    /></RouterLink>
                    <div>
                      <p class="name ellipsis">{{ goods.name }}</p>
                      <!-- 选择规格组件 -->
                    </div>
                  </div>
                </td>
                <td class="tc">
                  <p>&yen;{{ goods.nowPrice }}</p>
                </td>
                <td class="tc">
                  <XtxNumberBox></XtxNumberBox>
                </td>
                <td class="tc"><p class="f16 red">&yen;200.00</p></td>
                <td class="tc">
                  <p><a href="javascript:">移入收藏夹</a></p>
                  <p><a class="green" href="javascript:">删除</a></p>
                  <p><a href="javascript:">找相似</a></p>
                </td>
              </tr>
            </tbody>
            <!-- 无效商品 -->
            <tbody>
              <tr>
                <td colspan="6"><h3 class="tit">失效商品</h3></td>
              </tr>
              <tr
                v-for="invalidGoods in effectiveInvalidGoodsList"
                :key="invalidGoods.id"
              >
                <td></td>
                <td>
                  <div class="goods">
                    <RouterLink :to="`/goods/detail/${invalidGoods.id}`"
                      ><img :src="invalidGoods.picture" alt=""
                    /></RouterLink>
                    <div>
                      <p class="name ellipsis">
                        {{ invalidGoods.name }}
                      </p>
                      <!--                      <p class="attr">{{ invalidGoods.attrs }}</p>-->
                    </div>
                  </div>
                </td>
                <td class="tc"><p>&yen;{{ invalidGoods.nowPrice }}</p></td>
                <td class="tc">1</td>
                <td class="tc"><p>&yen;{{Number(invalidGoods.nowPrice) * invalidGoods.count}}</p></td>
                <td class="tc">
                  <p><a class="green" href="javascript:">删除</a></p>
                  <p><a href="javascript:">找相似</a></p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 操作栏 -->
        <div class="action">
          <div class="batch">
            <XtxCheckbox>全选</XtxCheckbox>
            <a href="javascript:">删除商品</a>
            <a href="javascript:">移入收藏夹</a>
            <a href="javascript:">清空失效商品</a>
          </div>
          <div class="total">
            共 7 件商品，已选择 2 件，商品合计：
            <span class="red">¥400</span>
            <XtxButton type="primary">下单结算</XtxButton>
          </div>
        </div>
        <!-- 猜你喜欢 -->
        <GoodsRelevant />
      </div>
    </div>
  </AppLayout>
</template>
<script lang="ts">
import GoodsRelevant from "@/views/goods/components/GoodsRelevant/GoodsRelevant.vue";
import AppLayout from "@/components/AppLayout/AppLayout.vue";

import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import {Message} from "@/components/library/Message";

export default defineComponent({
  name: "CartPage",
  components: { GoodsRelevant, AppLayout },
  setup() {
    const store = useStore();

    // 无效商品列表
    let effectiveInvalidGoodsList = computed(
      () => store.getters["cart/effectiveInvalidGoodsList"]
    );

    store.dispatch('cart/useUpdateGoodsList').then(() => {
      Message({type: "success", text: "购物车商品更新成功"})
    })

    // 点击商品复选框按钮的方法
    function selectGoods(skuId:string, isSelected: boolean) {
      // 调用根据skuId更新单个商品数据的方法
      store.dispatch('cart/useUpdateGoodsBySkuId', {skuId, selected: isSelected});
    }

    // 全选按钮的选中状态
    const selectedAllButtonStatus = computed(() => store.getters["cart/selectedAllButtonStatus"])

    // 点击全选按钮的方法
    function selectAllGoods(isSelected: boolean) {
      // 点击全选按钮后，把所有商品的选中状态更新为全选按钮的状态
      console.log(isSelected)
    }

    return {
      effectiveInvalidGoodsList,
      selectedAllButtonStatus,
      selectGoods,
      selectAllGoods,
    };
  },
});
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-number-box {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      width: 100%;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>