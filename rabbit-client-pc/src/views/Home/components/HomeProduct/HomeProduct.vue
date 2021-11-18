<template>
  <div class="home-product" ref="target">
    <HomePanel :title="item.name" v-for="item in homeGoodsList" :key="item">
      <template v-slot:right>
        <div class="sub">
          <RouterLink to="/" v-for="children in item.children" :key="item.id">{{ children.name }}</RouterLink>
        </div>
        <XtxMore/>
      </template>
      <template v-slot:default>
        <div class="box">
          <RouterLink class="cover" to="/">
            <img
                src=""
                v-lazy="item.picture"
                alt=""
            />
            <strong class="label">
              <span>{{ item.name }}馆</span>
              <span>{{ item.saleInfo }}</span>
            </strong>
          </RouterLink>
          <ul class="goods-list">
            <li v-for="goods in item.goods" :key="goods.id">
              <HomeGoods :item="goods"/>
            </li>
          </ul>
        </div>
      </template>
    </HomePanel>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {getHomeGoodsList} from "@/api/api";
import {useObserver} from "@/hook/useObserver/useObserver.ts";

import HomeGoods from "@/views/Home/components/HomeGoods/HomeGoods.vue";
import HomePanel from "@/views/Home/components/HomePanel/HomePanel.vue";
// import XtxMore from "@/components/library/XtxMore.vue";
export default defineComponent({
  name: "HomeProduct",
  components: {HomePanel, HomeGoods},
  setup() {

    const {target, dataList} = useObserver(getHomeGoodsList)

    return {
      target,
      homeGoodsList: dataList,
    }
  }
});
</script>

<style scoped lang="less">
.home-product {
  background: #fff;

  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: @xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>