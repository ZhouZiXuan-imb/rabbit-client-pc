export type cartNewSku = {
    // 商品的规格ID, 将商品加入购物车时使用
    skuId: string,
    // 商品的现价 (更新视图)
    price: string,
    // 商品原价 (更新视图)
    oldPrice: string,
    // 商品的库存, 在用户选择商品数量的时候使用
    inventory: number,
    // 用户选择的规格名称字符串
    attrsText: string;
}