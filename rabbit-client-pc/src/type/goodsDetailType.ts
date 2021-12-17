// 商品详情页商品数据类型
export type goodsDetailType = {
    brand: {
        desc?: string;
        id: string | null;
        logo?: string;
        name: string;
        nameEn?: string;
        picture?: string;
        place?: string;
        type?: any;
    };
    categories: Array<{
        id: string;
        layer: string;
        name: string;
    }>;
    collectCount: number;
    commentCount: number;
    desc: string;
    details: {
        pictures: Array<string>;
        properties: Array<{ name: string; value: string; }>;
    };
    discount: number;
    evaluationInfo: any;
    hotByDay: Array<{
        desc: string;
        discount: any;
        id: string;
        name: string;
        orderNum: number;
        picture: string;
        price: string;
    }>;
    id: string;
    inventory: number;
    isCollect: any;
    isPerSale: boolean;
    mainPictures: Array<string>;
    mainVideos: Array<string>;
    name: string;
    oldPrice: string;
    price: string;
    recommends: any;
    salesCount: number;
    similarProducts: Array<{
        desc: string;
        discount: any;
        id: string;
        name: string;
        orderNum: number;
        picture: string;
        price: string;
    }>;
    skus: Array<{
        id: string;
        inventory: number;
        oldPrice: string;
        price: string;
        skuCode: string;
        specs: Array<{
            name: string;
            valueName: string;
        }>;
    }>;
    specs: Array<{
        name: string;
        valueName: string;
    }>;
    spuCode: string;
    userAddresses: any
    videoScale: number;
    currentSelectSkuId: string;
    currentSelectSpecsText: string;
};
