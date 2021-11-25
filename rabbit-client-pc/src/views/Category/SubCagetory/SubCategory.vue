<template>
  <AppLayout>
    <div class="container">
      <!--   面包屑导航   -->
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem :path="`/category/${category.TopCategory?.id}`">{{ category.TopCategory?.name }}</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="category.SubCategory?.name">{{ category.SubCategory?.name }}</XtxBreadItem>
        </Transition>
      </XtxBread>

      <!--   筛选组件   -->
      <SubFilter @onFilterParamsChanged="updateReqParams"></SubFilter>

      <div class="goods-list">
        <!--排序组件-->
        <SubSort @onSortParamsChanged="updateReqParams"></SubSort>

        <GoodsList :goods="goodsList?.items"></GoodsList>

        <XtxInfiniteLoading @infinite="loadMore" :isLoading="isLoading" :isFinished="isFinished"/>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from "../../../components/AppLayout/AppLayout.vue";
import SubFilter from "@/views/Category/SubCagetory/components/SubFilter/SubFilter.vue";
import SubSort from "@/views/Category/SubCagetory/components/SubSort/SubSort.vue";
import GoodsList from "@/views/Category/SubCagetory/components/GoodsList/GoodsList.vue";

import useBread from "@/hook/useBread/useBread";
import {ref, watch} from "vue";
import {SubCategorySortParamsType} from "@/type/categoryType";
import {getSubCategoryGoods} from "@/api/categoryApi";
import {onBeforeRouteUpdate, useRoute} from "vue-router";

export default {
  name: "SubCategory",
  components: {
    AppLayout,
    SubFilter,
    SubSort,
    GoodsList,
  },
  setup() {

    const {resultList, updateReqParams, loadMore, isLoading, isFinished} = useGetFilterOrSortGoods();


    return {
      category: useBread(),
      goodsList: resultList,
      updateReqParams,
      loadMore,
      isLoading,
      isFinished,
    }

  }
}

function useGetFilterOrSortGoods() {

  const isLoading = ref<boolean>(false);

  const isFinished = ref<boolean>(false);

  const route = useRoute()

  // 用于存储请求时需要的参数
  const reqParams = ref<SubCategorySortParamsType>({
    categoryId: route.params.id,
    page: 0
  })

  // 筛选组件触发的方法，传来用户选择的筛选条件
  function updateReqParams(sortParams: SubCategorySortParamsType) {
    reqParams.value = {...reqParams.value, ...sortParams, page: 1}
  }

  // 当reqParams改变时，相当于用户新增了筛选条件，所以重新获取数据
  watch(() => reqParams.value, () => {
    getData(reqParams.value);
  })

  type ResultType = {
    counts: number;
    items: Array<{
      desc: string;
      discount: any;
      id: string;
      name: string;
      orderNum: number;
      picture: string;
      price: string;
    }>;
    page: number;
    pageSize: number;
    pages: number;
  }

  // 存储获取到的数据
  let resultList = ref<ResultType>()

  // 声明获取数据的方法
  function getData(reqParams: SubCategorySortParamsType) {
    isLoading.value = true;
    // 获取数据
    getSubCategoryGoods(reqParams).then(({data: {result}}: { data: { result: ResultType } }) => {
      isLoading.value = false;
      // 判断是不是第一页，如果是第一页，就直接赋值
      if (reqParams.page === 1) {
        resultList.value = result
      } else {
        // 如果不是第一页就把items数据累加起来
        resultList.value = {
          ...resultList.value,
          items: [...resultList.value!.items, ...result.items],
        } as ResultType
      }

      if (reqParams.page === result.pages) {
        isFinished.value = true;
      }
    })
  }

  // 加载更多方法
  function loadMore() {
    reqParams.value = {
      ...reqParams.value,
      page: reqParams.value.page! + 1,
    }
  }

  // 监听路由变化，路由变化了就重新调用获取数据的方法
  onBeforeRouteUpdate((to) => {
    reqParams.value = {...reqParams.value, categoryId: to.params.id as string, page: 1};
  })

  return {
    resultList,
    getData,
    updateReqParams,
    loadMore,
    isLoading,
    isFinished,
  }

}
</script>

<style scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>