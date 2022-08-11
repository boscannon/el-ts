import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {
        path: '',
        name: 'AboutList',
        meta: { title: 'About' },
        component: () => import(/* webpackChunkName: "about" */ '../views/about/index.vue'),
      },
      {
        path: 'create',
        name: 'AboutCreate',
        meta: { title: 'Create' },
        component: () => import(/* webpackChunkName: "about" */ '../views/about/form.vue'),
      },
      {
        path: ':id/edit',
        name: 'AboutEdit',
        meta: { title: 'Edit' },
        component: () => import(/* webpackChunkName: "about" */ '../views/about/form.vue'),
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
