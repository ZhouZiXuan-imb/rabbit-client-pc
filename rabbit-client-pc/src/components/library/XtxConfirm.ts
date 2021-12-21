// 引入创建虚拟DOM的方法
import {createElementVNode, createVNode, render} from "vue";
// 引入确认组件
import XtxConfirm from "@/components/library/XtxConfirm/XtxConfirm.vue";
// 创建一个div容器
const container = document.createElement('div');
// 将容器添加到body中
document.body.appendChild(container);

export default function Confirm({title, content}: { title: string; content: string }) {
    // 创建一个虚拟DOM
    const VNode = createVNode(XtxConfirm, {title, content});
    render(VNode, container);
}