import {computed, onMounted, onUnmounted, ref} from "vue";
import {ComputedRefValue} from "vue/ref-macros";

export function useBannerToggle(options: { carousels: ComputedRefValue<any>, autoPlay: boolean, duration: number }) {
    const {carousels, autoPlay, duration} = options
    // 因为carousels是异步传来的  所以需要监听
    const carouselsList = computed(() => carousels.value)

    // 声明变量记录索引
    const activeIndex = ref<number>(0);

    // 给左右按钮添加点击事件
    function toggle(indexNum: number) {  // 如果indexNum是-1  就相当于2 + -1 = 1
        // 声明变量接收轮播图最大索引，轮播图最大索引=轮播图数据数组的length - 1
        const carouselsLength = carouselsList.value?.length - 1;
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

    let timer: any = null;

    // 轮播图自动播放开启
    function startAutoPlay() {
        // 判断是否开启自动轮播，并且轮播图数据数组长度大于1(两天图片及以上才可以轮播)
        if (autoPlay && carouselsList.value?.length > 1) {
            // 开启定时器
            timer = setInterval(() => {
                // 调用切换轮播图方法
                toggle(1);
            }, duration)
        }
    }

    // 轮播图自动播放关闭
    function stopAutoPlay() {
        clearInterval(timer);
    }

    // DOM渲染完成开启轮播
    onMounted(() => {
        startAutoPlay();
    })

    // 组件卸载清楚轮播
    onUnmounted(() => {
        stopAutoPlay();
    })


    return {
        carouselsList,
        activeIndex,
        toggle,
        onClickIndicator,
        startAutoPlay,
        stopAutoPlay
    }
}