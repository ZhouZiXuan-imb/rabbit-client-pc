//封装定时器方法
import {onUnmounted, ref} from "vue";
import {useIntervalFn} from "@vueuse/core";

export function useCountDown() {
    // 定时器事件
    const count = ref(0);

    // 创建定时器对象
    /**
     * @pause 暂停定时器的方法（关闭当前定时器）
     * @isActive 定时器是否正在执行
     * @resume 开启定时器的方法（开启一个新的定时器）
     */
    const {pause, isActive, resume} = useIntervalFn(
        () => {
            // 如果count=0，就停止定时器
            if (count.value === 0) {
                pause();
            } else {
                // 否则就让count--
                count.value--;
            }
        },
        1000,
        {immediate: true}
    );

    // 声明开启定时器的方法
    function start(value: number) {
        // 判断是否有定时器正在执行
        if (!isActive.value) {
            // 如果有定时器正在执行，关闭当前定时器，重置定时器事件，开启一个新的定时器
            count.value = value;
            resume();
        }
    }

    // 组件卸载时清除定时器
    onUnmounted(pause);

    return {
        count,
        isActive,
        start,
    }
}