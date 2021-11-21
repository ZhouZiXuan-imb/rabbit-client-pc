import {ref} from "vue";
import {categoryItemType} from "@/type/categoryType.ts";
import {getTopCategorySubGoods} from "@/api/categoryApi";


export function useGetSubGoods() {
    let subGoods = ref<categoryItemType>();


    function getSubGoods(id: any) {
        getTopCategorySubGoods(id).then(({data: {result}}: { data: { result: categoryItemType } }) => {
            subGoods.value = result;
        })
    }

    return {
        subGoods,
        getSubGoods
    }
}

