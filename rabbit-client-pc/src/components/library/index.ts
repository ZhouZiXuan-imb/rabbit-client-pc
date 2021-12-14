import lazy from "@/components/directive/lazy.ts"
import {Message} from "@/components/library/Message";

// require.context是nodejs的一个方法,这个方法只有在vue中支持
const importFn = require.context('./', true, /\.vue/);

const keys = importFn.keys();

export default {
    install(app: any) {
        // 动态导入组件
        keys.forEach((item) => {
            const component = importFn(item).default
            app.component(component.name, component);
        })

        app.directive('lazy', lazy)
        app.config.globalProperties.$message = Message;
    }
}