<template>
  <div class="goods-sku">
    <dl v-for="(spec, index) in specs" :key="index">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="value in spec.values">
          <img
            v-if="value.picture"
            :src="value.picture"
            :alt="spec.name"
            :class="{ disabled: value.disabled, selected: value.selected }"
            @click="updateSpecSelected(spec, value)"
          />
          <span
            v-else
            :class="{ disabled: value.disabled, selected: value.selected }"
            @click="updateSpecSelected(spec, value)"
            >{{ value.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
    },
    skuId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const { pathMap } = createPathMap(props.skus as any);

    sendDataToParent(props.skus, props.specs, emit, pathMap);
    // 初始化时调用选中默认规格方法
    setDefaultSelected(props.skuId, props.skus, props.specs);
    // 初始化时执行一次禁用按钮方法，禁用没有库存的规格按钮
    updateDisabled(props.specs as any, pathMap as any);

    // 用户点击按钮时调用updateSpecDisabled更新数据
    function updateSpecSelected(spec: any, value: any) {
      // 如果用户点击了没有库存的规格，就直接return
      if (value.disabled) return;
      // 判断当前点击的规格是否已经选中，如果已经选中就让他不选中
      if (value.selected) {
        value.selected = false;
      } else {
        // 如果点击的规格选中了，当前规格数组中的所有规格都改为不选中
        spec.values.forEach((item: any) => {
          item.selected = false;
        });
        // 再给当前点击的规格选中
        value.selected = true;
      }

      updateDisabled(props.specs as any, pathMap as any);
      setDefaultSelected(props.skuId, props.skus, props.specs);
      sendDataToParent(props.skus, props.specs, emit, pathMap);
    }

    return {
      pathMap,
      updateSpecSelected,
    };
  },
});

type SkusType = {
  id: string;
  inventory: number;
  oldPrice: string;
  price: string;
  skuCode: string;
  specs: Array<{
    name: string;
    valueName: string;
  }>;
};

// 创建规格对象
function createPathMap(skus: Array<SkusType>) {
  type PathMapType = {
    [key: string]: string | null;
  };
  const pathMap: PathMapType = {};

  skus.forEach((sku) => {
    // 找到有库存数量大于0的数据
    if (sku.inventory > 0) {
      // 找到所有商品规格的名称的集合
      const valueNames = sku.specs.map((item) => item.valueName);
      // 找到商品规格数量
      const max = sku.specs.length;
      // 找到所有商品规格的名称的集合的子集
      const sets = powerSet(valueNames);
      sets.forEach((set) => {
        // 判断当前规格是否完成
        const isCompleteSku = set.length === max;
        // 把二位数据拼接成字符串
        const key = set.join("_");
        // 判断pathMap中是否已经有了当前数据
        if (key && !pathMap[key]) {
          // pathMap中没有当前规格会进入此判断
          // 判断规格是否完整
          if (isCompleteSku) {
            // 如果规格是完整的，规格的值为sku的id
            pathMap[key] = sku.id;
          } else {
            // 如果规格不是完整的，规格的值为null
            pathMap[key] = null;
          }
        }
      });
    }
  });

  return {
    pathMap,
  };
}

// 获取用户选中的规格数据
function getUserSelected(specs: Array<any>) {
  // 声明变量存储用户选中的数据
  const userSelected: string | undefined[] = [];

  // 遍历specs找到selected为true的规格名称
  specs.forEach((spec) => {
    const selected = spec.values.find((item: any) => item.selected);

    // 如果找到了
    if (selected) {
      // 就把找到的这个规格的名字添加到数组中
      userSelected.push(selected.name);
    } else {
      userSelected.push(undefined);
    }
  });

  return userSelected;
}

function updateDisabled(specs: any, pathMap: any) {
  // 遍历规格集合
  specs.forEach((spec: any, index: number) => {
    // 获取用户点击的规格
    const selected = getUserSelected(specs);
    // 遍历每一个规格
    spec.values.forEach((value: any) => {
      // 判断当前遍历到的规格是否已经选中了，如果已经选中了，就不用进行匹配
      if (value.selected) return;
      selected[index] = value.name;

      // 拼接规格名称,过滤掉undefined值
      const key = selected.filter((item) => item).join("_");

      value["disabled"] = !(key in pathMap);
    });
  });
}

// 默认选中方法
function setDefaultSelected(
  skuId: string,
  skus: Array<any>,
  specs: Array<any>
) {
  if (!skuId) return;
  // 根据skuId找到默认选中规格的对象，然后遍历其中==对象中的specs，返回规格名称数组
  const target: [string] = skus
    .find((item) => item.id === skuId)
    .specs.map((spec: any) => spec.valueName);

  specs.forEach((spec) => {
    spec.values.forEach(
      (value: {
        name: string;
        picture: string | null;
        desc: string;
        disabled: boolean;
        selected: boolean;
      }) => {
        if (target.includes(value.name)) {
          value.selected = true;
        }
      }
    );
  });
}

// 把用户选中的规格数据传给父组件，购物车中要使用
function sendDataToParent(
  skus: Array<any>,
  specs: Array<any>,
  emit: any,
  pathMap: { [key: string]: string | null }
) {
  // 获取到用户选择的规格数组，找到值不为undefined的集合
  const selected = getUserSelected(specs).filter((item: any) => item);

  // 获取有多少个规格
  const max = specs.length;
  // 判断用户是否选择了所有规格
  if (selected.length === max) {
    // 直接找到pathMap中包含的当前选中的skuId
    const skuId = pathMap[selected.join("_")];
    // 根据skuId找到skus对象
    const target = skus.find((item: any) => item.id === skuId);

    emit("onSpecChanged", {
      // 商品的规格ID, 将商品加入购物车时使用
      skuId,
      // 商品的现价 (更新视图)
      price: target.price,
      // 商品原价 (更新视图)
      oldPrice: target.oldPrice,
      // 商品的库存, 在用户选择商品数量的时候使用
      inventory: target.inventory,
      // 用户选择的规格名称字符串
      attrsText: target.specs
        .map(
          (spec: { name: string; valueName: string }) =>
            `${spec.name}: ${spec.valueName}`
        )
        .join(" "),
    });
  } else {
    // 当用户选择的不是一个完整规格的时候, 告诉父组件清除 skuId
    emit("onSpecHalfChanged");
  }
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