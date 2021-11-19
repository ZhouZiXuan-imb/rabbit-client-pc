import {ref} from "vue";
import {categoryItemType} from "@/store/categoryType.ts";
import {getTopCategorySubGoods} from "@/api/categoryApi";
import {useRouter} from "vue-router";


export function useGetSubGoods(id: any) {
    let subGoods = ref<categoryItemType>();


    function getSubGoods(id: string) {
        getTopCategorySubGoods(id).then(({data: {result}}: { data: { result: categoryItemType } }) => {
            subGoods.value = result;
        })
    }

    return {
        subGoods,
        getSubGoods
    }
}

