import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// 使用懒加载方式引入Home页组件
const HomePage = () => import('@/views/Home.vue');
// 使用懒加载方式引入Category页组件
const CategoryPage = () => import('@/views/Category.vue')
// 使用懒加载方式引入Category页组件
const CategoryTwo = () => import('@/views/CategoryTwo.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: CategoryPage,
  },
  {
    path: '/category/sub/:id',
    name: 'CategorySub',
    component: CategoryTwo,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
