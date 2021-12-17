import {ActionContext} from "vuex";

type cartGoodsItemType = {
  // 商品id
  id: string;
  // 商品 skuId
  skuId: string;
  // 商品名称
  name: string;
  // 商品规格属性文字
  attrsText: string;
  // 商品图片
  picture: string;
  // 商品原价
  price: string;
  // 商品现价
  nowPrice: string;
  // 是否选中
  selected: boolean;
  // 商品库存
  stock: number;
  // 用户选择的商品数量
  count: number;
  // 是否为有效商品
  isEffective: boolean;
};
type cartGoodsType = Array<cartGoodsItemType>;
type GoodsType = {
  // 商品id
  id: string;
  // 商品 skuId
  skuId: string;
  // 商品名称
  name: string;
  // 商品规格属性文字
  attrsText: string;
  // 商品图片
  picture: string;
  // 商品原价
  price: string;
  // 商品现价
  nowPrice: string;
  // 是否选中
  selected: boolean;
  // 商品库存
  stock: number;
  // 用户选择的商品数量
  count: number;
  // 如果用户选择了规格, 该商品就一定是有效商品, 因为能够选择的规格都是有库存的
  isEffective: boolean;
};

type StateType = {goodsList: cartGoodsType}

type GettersType = {
  effectiveGoodsList:cartGoodsType;
  effectiveGoodsPrice: number;
  effectiveGoodsCount: number;
}
export default {
  // 开启命名空间
  namespaced: true,
  state() {
    return {
      // 商品列表
      goodsList: [] as cartGoodsType,
    };
  },
  mutations: {
    // 给购物车列表中添加一个商品
    addCartGoods(state: {goodsList: cartGoodsType}, goods: GoodsType) {
      // 添加商品之前先判断当前要添加的商品是否已经存在购物车列表中了
      const index = state.goodsList.findIndex(
        (item:cartGoodsItemType) => item.skuId === goods.skuId
      );
      // 找到相同规格的商品了
      if (index > -1) {
        console.log(111)
        // 给当前商品数量+1
        state.goodsList[index].count += 1;
        // 并且让这个商品移动到购物车列表的第一个，可以使用splice方法把这个商品剪切掉，splice直接修改原数组，所以就不用自己手动删除了，然后再使用unshift方法添加到数组的第一个
        state.goodsList.unshift(state.goodsList.splice(index, 1)[0]);
      } else {
        console.log(222)
        state.goodsList.unshift(goods);
      }
    },
    removeCartGoods(state: StateType, goodsSkuId:string) {
      state.goodsList = state.goodsList.filter(item => item.skuId !== goodsSkuId);
    }
  },
  actions: {
    useAddCartGoods(
      context: ActionContext<any, any>,
      goods: GoodsType
    ) {
      // 判断用户是否登录
      if(context.rootState['user'].profile.token){
        // 登陆了
      } else {
        // 未登录
        // 如果用户没有登录就操作本地数据
        context.commit("addCartGoods", goods);
      }
    },
    useRemoveCartGoods(context:ActionContext<any,any>, goodsSkuId: string) {
      // 判断用户是否登录了
      if(context.rootState['user'].profile.token) {
        // 已登录
      } else {
        // 未登录
        context.commit('removeCartGoods', goodsSkuId);
      }
    }
  },
  getters: {
    // 可购买商品列表 (有效商品，并且库存数量大于0)
    effectiveGoodsList(state:StateType) {
      return state.goodsList.filter(item => item.isEffective && item.stock > 0);
    },
    // 可购买商品总价
    effectiveGoodsPrice(state:StateType, getters: GettersType) {
      return getters.effectiveGoodsList.reduce((count: number, item: cartGoodsItemType) => count + item.count * parseInt(item.nowPrice), 0)
    },
    // 可购买商品总数
    effectiveGoodsCount(state: StateType, getters: GettersType) {
      return getters.effectiveGoodsList.reduce((count: number, item: cartGoodsItemType) => count + item.count, 0)
    }
  },
};
