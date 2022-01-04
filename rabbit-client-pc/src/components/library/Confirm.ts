import XtxConfirm from "@/components/library/XtxConfirm/XtxConfirm.vue";
import { createVNode, render } from "vue";
// 创建容器
const container = document.createElement("div");
document.body.appendChild(container);

export default function Confirm({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return new Promise<void>((resolve, reject) => {
    // 点击确定按钮的逻辑代码
    function onSureButtonClickHandler() {
      resolve();
      render(null, container);
    }

    // 点击取消按钮的逻辑代码
    function onCancelButtonClickHandler() {
      reject();
      VNode.el?.classList.remove("fade");
      VNode.el?.children[0].classList.remove("fade");
      setTimeout(() => {
        render(null, container);
      }, 400);
    }

    // 将 XtxConfirm 单文件组件对象转换成虚拟 DOM 对象
    const VNode = createVNode(XtxConfirm, { title, content, onSureButtonClickHandler, onCancelButtonClickHandler });
    // 渲染到容器中
    render(VNode, container);
    // 执行入场动画
    setTimeout(() => {
      VNode.el?.classList.add("fade");
      VNode.el?.children[0].classList.add("fade");
    });
  });
}
