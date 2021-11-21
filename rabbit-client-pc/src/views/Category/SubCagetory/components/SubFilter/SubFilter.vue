<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterList && !filtersLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a href="javascript:" v-for="item in filterList?.brands" :key="item.id"
           :class="{active: filterList?.selectedBrandId === item.id}"
           @click="filterList.selectedBrandId = item.id; updateSelectedFilters()">{{ item.name }}</a>
      </div>
    </div>
    <div class="item" v-for="item in filterList?.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a href="javascript:" v-for="properties in item.properties" :key="item.id"
           :class="{active: item.selectedFilterName === properties.name }"
           @click="item.selectedFilterName = properties.name; updateSelectedFilters()">{{ properties.name }}</a>
      </div>
    </div>
  </div>
  <!-- 骨架屏 -->
  <div class="sub-filter" v-else>
    <XtxSkeleton class="item" width="800px" height="40px"/>
    <XtxSkeleton class="item" width="800px" height="40px"/>
    <XtxSkeleton class="item" width="600px" height="40px"/>
    <XtxSkeleton class="item" width="600px" height="40px"/>
    <XtxSkeleton class="item" width="600px" height="40px"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useRouter, onBeforeRouteUpdate} from "vue-router";
import {getSubCategoryFilter} from "@/api/categoryApi";
import {SubCategoryFilterItemType} from "@/type/categoryType.ts";

export default defineComponent({
  name: "SubFilter",
  setup() {
    // 使用router获取地址栏二级分类的id
    const router = useRouter();
    const {getData, filterList, updateSelectedFilters, selectedFilters, filtersLoading} = useSubCategoryFilter();
    // 调用获取数据的方法
    getData(router.currentRoute.value.params.id)
    // 监听路由是否改变，路由改变重新调用获取数据方法，为了解决页面数据不更新问题
    onBeforeRouteUpdate((to) => {
      getData(to.params.id)
    })

    return {
      filterList,
      updateSelectedFilters,
      selectedFilters,
      filtersLoading
    }
  }
})

function useSubCategoryFilter() {

  let filterList = ref<SubCategoryFilterItemType>()

  // 用于存储筛选数据的加载状态
  const filtersLoading = ref(false);

  function getData(id: any) {
    // 当获取数据的时候开启加载状态
    filtersLoading.value = true;

    // 调用获取二级分类筛选条件的api接口函数
    getSubCategoryFilter(id).then(({data: {result}}: { data: { result: SubCategoryFilterItemType } }) => {
      // 给品牌前面加上全部
      result.brands.unshift({id: null, name: "全部"});
      result.saleProperties.forEach(item => {
        // 给其他前面加上全部
        item.properties.unshift({id: null, name: "全部"})
        // 用于存储用户选择的筛选条件
        item.selectedFilterName = "全部";
      })
      // 用于存储用户选择的品牌id
      result.selectedBrandId = null;

      filterList.value = result;

      // 当获取数据获取完成关闭加载状态
      filtersLoading.value = false;
    })
  }

  // 用于存储用户选择的筛选条件
  const selectedFilters = {
    brandId: null,
    attrs: [],
  };

  // 用于更新用户选择的筛选条件
  const updateSelectedFilters = () => {
    // 更新用户选择的品牌id
    selectedFilters.brandId = filterList.value.selectedBrandId;
    // 重置用户选择的筛选条件
    selectedFilters.attrs = [];
    // 更新用户选择的筛选条件
    filterList.value.saleProperties.forEach((item) => {
      // 如果用户选择了当前筛选类别的筛选条件
      if (item.selectedFilterName && item.selectedFilterName !== "全部") {
        // 收集用户选择的筛选条件类别名称和具体的筛选条件名称
        selectedFilters.attrs.push({
          groupName: item.name,
          propertyName: item.selectedFilterName,
        });
      }
    });
  };

  return {
    filterList,
    getData,
    updateSelectedFilters,
    selectedFilters,
    filtersLoading,
  }
}
</script>

<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;

  .item {
    display: flex;
    line-height: 40px;

    .head {
      width: 80px;
      color: #999;
    }

    .body {
      flex: 1;

      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;

        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }

  // 骨架屏样式
  .xtx-skeleton {
    padding: 10px 0;
  }
}

</style>