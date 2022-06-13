import { createRouter, createWebHashHistory } from 'vue-router';
// 使用懒加载方式引入Home页组件
const HomePage = () => import('@/views/Home.vue');
const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;
//# sourceMappingURL=index.js.map