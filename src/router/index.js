import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '@/views/layout'


/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [{
  path: '/login',
  name: 'Login',
  hidden: true,
  component: () => import( /* webpackChunkName: "main" */ '@/views/login')
},
{
  path: '/',
  name: 'Home',
  redirect: '/home',
  component: Layout,
  children: [{
    path: 'home',
    component: () => import( /* webpackChunkName: "main" */ '@/views/home'),
    meta: { title: 'Home', icon: 'form' }
  }]
},
{
  path: '/form',
  component: Layout,
  children: [{
    path: '/index',
    name: 'Form',
    component: () => import( /* webpackChunkName: "form" */ '@/views/form'),
    meta: { title: 'Form', icon: 'form' }
  }]
}, {
  path: '/404',
  name: 'Page404',
  hidden: true,
  component: () => import( /* webpackChunkName: "error-page" */ '@/views/error-page/404')
},
{
  path: '/401',
  name: 'Page401',
  hidden: true,
  component: () => import( /* webpackChunkName: "error-page" */ '@/views/error-page/401')
}]

import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

export const asyncRouterMap = [
  tableRouter,
  nestedRouter,
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new VueRouter({
  //mode: 'history',
  routes: constantRouterMap,
  scrollBehavior: () => ({
    y: 0
  })
})