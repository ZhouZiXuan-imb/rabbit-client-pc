import {getCategoryList} from "@/api/homeApi";
import {ActionContext} from "vuex";
import {categoryItemType, stateType} from "@/type/categoryType.ts";
import {categoryList} from "@/api/homeCategoryList.ts"

export default {
    // 开启命名空间
    namespaced: true,
    state() {
        return {
            // 商品列表; 数据还没来时，先渲染假数据占位，提升用户体验
            categoryList: categoryList.map(item => item)
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
            const {data: {result}} = await getCategoryList();
            const categoryList = result.map((item: any) => ({...item, ...{open: false}}))
            context.commit('setCategoryList', categoryList);
        }
    },
    getters: {},
}