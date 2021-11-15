// 声明bannerList中每一项数据的类型
import {ref} from "vue";


export function useBannerToggle(options:{carousels:any, autoPlay:boolean, duration:number}) {
    const {carousels, autoPlay, duration} = options
    // 声明变量记录索引
    const activeIndex = ref<number>(0);

    // 给左右按钮添加点击事件
    function toggle(indexNum: number) {  // 如果indexNum是-1  就相当于2 + -1 = 1
        // 声明变量接收轮播图最大索引，轮播图最大索引=轮播图数据数组的length - 1
        const carouselsLength = carousels.value.length - 1;
        // 每次点击修改activeIndex的值
        activeIndex.value += indexNum
        if (activeIndex.value < 0) {  // 判断如果轮播图播放索引小于0 就给他赋值为轮播图数据数组最大索引
            activeIndex.value = carouselsLength;
        } else if (activeIndex.value > carouselsLength) { // 判断如果轮播图播放索引大于轮播图数据列表的索引，就给他赋值为0
            activeIndex.value = 0;
        }
    }

// 点击轮播图下面的小点切换轮播图
    function onClickIndicator(index: number) {
        // 直接给activeIndex赋值当前点击的小点的索引
        activeIndex.value = index;
    }

    // 轮播图自动播放开启
    function startAutoPlay() {

    }

    // 轮播图自动播放关闭
    function stopAutoPlay() {

    }

    return {
        carousels,
        activeIndex,
        toggle,
        onClickIndicator,
    }
}