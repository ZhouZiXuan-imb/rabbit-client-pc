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

      <!--排序组件-->
      <SubSort @onSortParamsChanged="updateReqParams"></SubSort>

      <GoodsList :goods="goodsList?.items"></GoodsList>

      <XtxInfiniteLoading @infinite="loadMore" />
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

    const {resultList, updateReqParams} = useGetFilterOrSortGoods();



    return {
      category: useBread(),
      goodsList: resultList,
      updateReqParams,
      loadMore,
    }

  }
}

function useGetFilterOrSortGoods() {


  const route = useRoute()

  // 用于存储请求时需要的参数
  const reqParams = ref<SubCategorySortParamsType>({
    categoryId: route.params.id,
    page: 1
  })

  // 筛选组件触发的方法，传来用户选择的筛选条件
  function updateReqParams(sortParams: SubCategorySortParamsType) {
    reqParams.value = {...reqParams.value, ...sortParams}
  }

  // 当reqParams改变时，相当于用户新增了筛选条件，所以重新获取数据
  watch(() => reqParams.value, () => {
    getData(reqParams.value);
  }, {immediate: true})

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
    // 获取数据
    getSubCategoryGoods(reqParams).then(({data: {result}}: any) => {
          // console.log(data)
          // 赋值
          resultList.value = result;
        }
    )
  }

  // 加载更多方法
  function loadMore() {

  }

  // 监听路由变化，路由变化了就重新调用获取数据的方法
  onBeforeRouteUpdate((to) => {
    reqParams.value = {...reqParams.value, categoryId: to.params.id as string};
  })

  return {
    resultList,
    getData,
    updateReqParams,
    loadMore,
  }

}
</script>

<style scoped>

</style>