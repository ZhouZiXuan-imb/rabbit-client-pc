import {onMounted, onUnmounted, ref} from "vue"

export function useScrollTop() {

    // 声明变量接收浏览器scrollTop的值
    let scrollTop = ref(0);

    // 声明一个浏览器滚动事件触发的方法
    function onScrollHandler() {
        scrollTop.value = document.documentElement.scrollTop
    }

    // 给浏览器添加滚动事件
    onMounted(() => {
        window.addEventListener('scroll', onScrollHandler)
    })
    // 当组件卸载时清楚浏览器事件
    onUnmounted(() => {
        window.removeEventListener('scroll', onScrollHandler)
    })

    return {
        scrollTop
    }
}