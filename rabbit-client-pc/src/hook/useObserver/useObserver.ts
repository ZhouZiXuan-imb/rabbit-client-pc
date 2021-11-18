import {useIntersectionObserver} from "@vueuse/core";
import {ref} from "vue";
import {HotRecommendType} from "./type"

export function useObserver(apiFunction: Function) {

    let dataList = ref<HotRecommendType>();

    const target = ref(null);

    const {stop} = useIntersectionObserver(target, ([{isIntersecting}]: any) => {
        if (isIntersecting) {
            stop();
            apiFunction().then(({data: {result}}: { data: { result: HotRecommendType } }) => {
                dataList.value = result;
            });

        }
        // threshold选项是让这个组件刚进去页面可视区就去获取数据,如果不设置的话,组件已经露出很多了还是没有去获取数据;
    },{ threshold: 0 })

    return {
        target,
        dataList,
    }
}