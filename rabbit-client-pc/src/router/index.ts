import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// 使用懒加载方式引入Home页组件
const HomePage = () => import('@/views/Home/Home.vue');
// 使用懒加载方式引入Category页组件
const TopCategoryPage = () => import('@/views/Category/TopCategory.vue')
// 使用懒加载方式引入Category页组件
const SubCategoryPage = () => import('@/views/Category/SubCategory.vue')

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
