import defaultImage from "@/assets/images/200.png";
import {RefValue} from "vue/ref-macros";

const lazy = {
    /**
     *
     * @param target  要监听的DOM元素  Type:ElementImageElement
     * @param binding   v-lazy执行的值
     */
    mounted(target: HTMLImageElement, binding:RefValue<any>) {
        /**
         * isIntersecting: 是否进入可视区  Type:boolean
         */
        const observer = new IntersectionObserver(([{isIntersecting}]) => {
            if (isIntersecting) {
                observer.unobserve(target)

                target.src = binding.value;

                // 如果有错误给image赋值一个默认图片
                target.onerror = () => {
                    target.src = defaultImage
                }
            }
        })

        observer.observe(target);
    }
}

export default lazy