export type HotRecommendItemType = {
    desc?: string;
    discount?: any;
    id: string;
    name: string;
    orderNum?: string;
    picture?: string;
    price?: string;
    alt?: string;
    title?: string;
}
// 首页产品区块类型
type HomeGoodsItemType = {
    children: Array<{
        id: string;
        layer: number;
        name: string;
        parent: any;
    }>;
    goods: Array<{
        desc: string;
        discount: any;
        id: string;
        name: string;
        orderNum: string;
        picture: string;
        price: string;
    }>;
    id: string;
    name: string;
    picture: string;
    saleInfo: string;
}

type specialItemType = {
    classifcationId: string;
    collectNum: number;
    cover: string;
    createTime: string;
    creator: string;
    detailsUrl: string;
    id: string;
    isDelete: number;
    lowestPrice: number;
    replayNum: number;
    summary: string;
    title: string;
    updateTime: string;
    viewNum: number;
}

export type HotRecommendType = Array<HotRecommendItemType | HomeGoodsItemType | specialItemType>

