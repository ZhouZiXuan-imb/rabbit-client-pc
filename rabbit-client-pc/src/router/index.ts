import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
// 使用懒加载方式引入Home页组件
const HomePage = () => import('@/views/Home/Home.vue');
// 使用懒加载方式引入Category页组件
const TopCategoryPage = () => import('@/views/Category/TopCategory/TopCategory.vue')
// 使用懒加载方式引入SubCategory页组件
const SubCategoryPage = () => import('@/views/Category/SubCagetory/SubCategory.vue')
const GoodsDetailPage = () => import("@/views/goods/GoodsDetailPage/GoodsDetailPage.vue")
const Login = () => import("@/views/Login/Login.vue")
// QQ登录授权之后绑定账号的页面
const LoginCallbackPage = () => import("@/views/Login/components/LoginCallbackPage/LoginCallbackPage.vue")

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/category/:id',
        name: 'TopCategoryPage',
        component: TopCategoryPage,
    },
    {
        path: '/category/sub/:id',
        name: 'SubCategoryPage',
        component: SubCategoryPage,
    },
    {
        path: '/goods/detail/:id',
        name: 'GoodsDetailPage',
        component: GoodsDetailPage,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/login/callback',
        name: 'LoginCallbackPage',
        component: LoginCallbackPage,
    }
]

const router = createRouter({
    // 通过路由配置，在切换路由的时候，让页面回到顶部
    scrollBehavior: () => ({top: 0}),
    history: createWebHashHistory(),
    routes
})

export default router
