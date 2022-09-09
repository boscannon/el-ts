import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/post',
    name: 'Post',
    // route level code-splitting
    // this generates a separate chunk (post.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {
        path: '',
        name: 'PostList',
        meta: { title: 'Post' },
        component: () => import(/* webpackChunkName: "post" */ '../views/post/index.vue'),
      },
      {
        path: 'create',
        name: 'PostCreate',
        meta: { title: 'Create' },
        component: () => import(/* webpackChunkName: "post" */ '../views/post/form.vue'),
      },
      {
        path: ':id/edit',
        name: 'PostEdit',
        meta: { title: 'Edit' },
        component: () => import(/* webpackChunkName: "post" */ '../views/post/form.vue'),
      },
    ],
  },
  {
    path: '/category',
    name: 'Category',
    // route level code-splitting
    // this generates a separate chunk (category.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {
        path: '',
        name: 'CategoryList',
        meta: { title: 'Category' },
        component: () => import(/* webpackChunkName: "category" */ '../views/category/index.vue'),
      },
      {
        path: 'create',
        name: 'CategoryCreate',
        meta: { title: 'Create' },
        component: () => import(/* webpackChunkName: "category" */ '../views/category/form.vue'),
      },
      {
        path: ':id/edit',
        name: 'CategoryEdit',
        meta: { title: 'Edit' },
        component: () => import(/* webpackChunkName: "category" */ '../views/category/form.vue'),
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
