import Vue from 'vue'
import VueRouter from 'vue-router'
import Choose from '../views/Choose.vue'

// import ResourcesMap from '@/components/Resourcesmap.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Choose',
    component: Choose
  },
  {
    path: '/SaveMe',
    name: 'SaveMe',
    component: () => import(/* webpackChunkName: "SaveMe" */ '../views/SaveMe/SaveMe.vue')
  },
  {
    path: '/AskResources',
    name: 'AskResources',
    component: () => import(/* webpackChunkName: "SaveMe" */ '../views/AskResources/AskResources.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "SaveMe" */ '../views/ResourcesAdmin/Login.vue')
  },
  {
    path: '/Resources',
    name: 'Resources',
    component: () => import(/* webpackChunkName: "SaveMe" */ '../views/ResourcesAdmin/AfterLogin/ResourcesSkeleton.vue'),
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "SaveMe" */ '../views/ResourcesAdmin/AfterLogin/AdminSkeleton.vue'),
  },
  // {
  //   path: './../compon',
  //   name: 'ResourcesMap',
  // }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
