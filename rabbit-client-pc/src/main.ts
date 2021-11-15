import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 注册骨架屏组件
import UI from "@/components/library/index.ts"

// 引入normalize重置css样式
import 'normalize.css';
// 引入公共样式
import "@/assets/styles/common.less"

createApp(App).use(store).use(router).use(UI).mount('#app')