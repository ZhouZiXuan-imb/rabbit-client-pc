<template>
  <div class="home-category" @mouseleave="current = null">
    <ul class="menu">
      <li v-for="item in list" :key="item" @mouseenter="current = item"
          :class="{active: current?.id && current?.id === item.id}">
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <template v-if="item.children?.length">
          <RouterLink to="/" v-for="children in item.children">{{ children.name }}</RouterLink>
        </template>
        <template  v-else>
          <XtxSkeleton bg="rgba(0,0,0,0.2)" width="60px" height="18px" animated="fade" style="margin-right: 5px"></XtxSkeleton>
          <XtxSkeleton bg="rgba(0,0,0,0.2)" width="60px" height="18px" animated="fade" ></XtxSkeleton>
        </template>
      </li>
    </ul>

    <div class="layer" v-if="current?.id">
      <h4>{{ current?.goods ? "商品" : "品牌" }}推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul v-if="current?.goods">
        <li v-for="item in current?.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt=""/>
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <ul v-if="current?.brands">
        <li class="brand" v-for="item in current?.brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{ item.place }}</p>
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="desc ellipsis-2">{{ item.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>

  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {useStore} from "vuex";
import {getHotBrandsList} from "@/api/homeApi.ts"

// 引入item的类型
import {categoryItemType} from "@/type/categoryType.ts";

export default defineComponent({
  name: "HomeCategory",
  setup() {
    // 引入store
    const store = useStore();

    // 声明一个接收二级分类商品的变量
    let current = ref<categoryItemType>();
    // 定义一个变量接收推荐品牌
    const brand = ref({
      id: "brand",
      name: "品牌",
      children: [{name: "推荐品牌", id: "child-brand"}],
      brands: []
    });
    // 修改store中categoryList的children属性的数据
    const list = computed(() => {
      // 遍历categoryList，并返回一个修改后的新的数组
      const result = store.state.category.categoryList.map((item: categoryItemType) => ({
        ...item,
        children: item.children ? item.children.slice(0, 2) : null
      }))
      // 把推荐品牌push到categoryList的children属性的数据中
      result.push(brand.value)
      return result
    });
    // 获取推荐品牌数据
    getHotBrandsList(6).then(({data}) => {
      brand.value.brands = data.result;
    })
    return {
      list,
      current
    }
  }
})
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      text-align: left;

      &:hover, &.active {
        background-color: @xtxColor;
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }
    }
  }

  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;

    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;

      small {
        font-size: 16px;
        color: #666;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li.brand {
        height: 180px;

        a {
          align-items: flex-start;

          img {
            width: 120px;
            height: 160px;
          }

          .info {
            p {
              margin-top: 8px;
            }

            .place {
              color: #999;
            }
          }
        }
      }

      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;

        &:nth-child(3n) {
          margin-right: 0;
        }

        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;

          &:hover {
            background: #e3f9f4;
          }

          img {
            width: 95px;
            height: 95px;
          }

          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;

            .name {
              font-size: 16px;
              color: #666;
            }

            .desc {
              color: #999;
            }

            .price {
              font-size: 22px;
              color: @priceColor;

              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }

  &:hover {
    .layer {
      display: block;
    }
  }

}
</style>