import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {computed} from "vue";
import {categoryItemType} from "@/type/categoryType.ts";

export default function useBread() {

    const store = useStore();

    const router = useRouter();
    // console.log(router.currentRoute.value.params.id)

    return computed(() => {
        let TopCategory = null;

        let SubCategory = null;

        store.state.category.categoryList.forEach((top:categoryItemType) => {
            if(top.id === router.currentRoute.value.params.id) {
                TopCategory = top;
            }
            top.children?.forEach((sub) => {
                if(sub.id === router.currentRoute.value.params.id) {
                    TopCategory = top;
                    SubCategory = sub;
                }
            })

        })


        return {
            TopCategory,
            SubCategory,
        }
    })
}