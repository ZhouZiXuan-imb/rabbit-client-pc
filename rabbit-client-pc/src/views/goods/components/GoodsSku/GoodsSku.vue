<template>
  <div class="goods-sku">
    <dl v-for="(spec,index) in specs" :key="index">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="value in spec.values">
          <img v-if="value.picture" :src="value.picture" :alt="spec.name" :class="{disabled: value.disabled}"/>
          <span v-else :class="{disabled: value.disabled}">{{ value.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import powerSet from "@/vendor/power-set.ts";

export default defineComponent({
  name: "GoodsSku",
  props: {
    specs: {
      type: Array,
      default: () => [],
    },
    skus: {
      type: Array,
      default: () => [],
    }
  },
  setup(props) {
    const {pathMap} = createPathMap(props.skus as any)

    updateSpecDisabled(props.specs as any, pathMap as any)

    // 用户点击按钮时调用updateSpecDisabled更新数据

    return {
      pathMap
    }
  }
});

type PathMapType = {
  id: string;
  inventory: number
  oldPrice: string
  price: string
  skuCode: string
  specs: Array<{
    name: string;
    valueName: string;
  }>
}

function createPathMap(skus: Array<PathMapType>) {
  type PathMapType = {
    [key: string]: string | null;
  }
  const pathMap: PathMapType = {};

  skus.forEach(sku => {
    // 找到有库存数量大于0的数据
    if (sku.inventory > 0) {
      // 找到所有商品规格的名称的集合
      const valueNames = sku.specs.map(item => item.valueName);
      // 找到商品规格数量
      const max = sku.specs.length;
      // 找到所有商品规格的名称的集合的子集
      const sets = powerSet(valueNames);
      sets.forEach(set => {
        // 判断当前规格是否完成
        const isCompleteSku = set.length === max
        // 把二位数据拼接成字符串
        const key = set.join('_');
        // 判断pathMap中是否已经有了当前数据
        if (key && !pathMap[key]) {
          // pathMap中没有当前规格会进入此判断
          // 判断规格是否完整
          if (isCompleteSku) {
            // 如果规格是完整的，规格的值为sku的id
            pathMap[key] = sku.id
          } else {
            // 如果规格不是完整的，规格的值为null
            pathMap[key] = null;
          }
        }
      })
    }
  })

  return {
    pathMap
  }
}

function updateSpecDisabled(specs: Array<any>, pathMap: PathMapType) {
  specs.forEach(spec => {

    spec.values.forEach((value: any) => {
      value['disabled'] = !(value.name in pathMap);
    })

  })
}

</script>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 5px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>