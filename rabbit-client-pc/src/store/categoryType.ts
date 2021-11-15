type brandType = {
    desc: string;
    logo: string;
    id: string;
    name: string;
    nameEn: string;
    picture: string;
    place: string;
    type: any
}

type goodsType = {
    desc: string;
    discount: any;
    id: string;
    name: string;
    orderNum: any;
    picture: string;
    price: any
}

type childrenType = {
    children: any;
    goods: any;
    id: string;
    name: string;
    picture: string;
}

export type categoryItemType = {
    children?: Array<childrenType>;
    goods?: Array<goodsType>;
    id?: string;
    name?: string;
    open?: boolean;
    picture?: string;
    brands: Array<brandType>
}

export type stateType = {
    categoryList: Array<categoryItemType>
}