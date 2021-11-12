import {homePageAPI} from "@/utils/api";
import {ActionContext} from "vuex";

type stateType = {
    categoryList: Array<categoryItemType>
}

type categoryItemType = {
    children?: Array<{}>;
    goods?: Array<{}>;
    id?: string;
    name?: string;
    open?: boolean;
    picture?: string;
}

export default {
    // 开启命名空间
    namespaced: true,
    state() {
        return {
            // 商品列表
            categoryList: [] as categoryItemType
        }
    },
    mutations: {
        /**
         * 设置categoryList数据列表
         * @param state
         * @param payload 对象数组
         */
        setCategoryList(state: stateType, payload: Array<categoryItemType>) {
            state.categoryList = payload;
        },
        // 设置open为true，显示二级分类列表
        open(state: stateType, id: string) {
            const target: categoryItemType | undefined = state.categoryList.find((item: categoryItemType) => item.id === id);
            target!.open = true;
        },
        // 设置open为false，隐藏二级分类列表
        close(state: stateType, id: string) {
            const target: categoryItemType | undefined = state.categoryList!.find((item: categoryItemType) => item.id === id);
            target!.open = false;
        }
    },
    actions: {
        async useSetCategoryList(context: ActionContext<any, any>) {
            const {data: {result}} = await homePageAPI.getCategoryList();
            const categoryList = result.map((item: any) => ({...item, ...{open: false}}))
            console.log(categoryList)
            context.commit('setCategoryList', categoryList);
        }
    },
    getters: {},
}