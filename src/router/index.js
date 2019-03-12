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
const routes = [{
  path: '/login',
  name: 'Login',
  hidden: true,
  component: () => import( /* webpackChunkName: "login" */ '@/views/login')
},
{
  path: '/',
  name: 'Home',
  redirect: '/home',
  component: Layout,
  hidden: true,
  children: [{
    path: 'home',
    component: () => import( /* webpackChunkName: "home" */ '@/views/home'),
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
  path: '/nested',
  name: 'Nested',
  redirect: '/nested/menu1',
  component: Layout,
  alwaysShow: true,
  meta: {
    title: 'Nested',
    icon: 'nested'
  },
  children: [
  {
    path: 'menu1',
    name: 'Menu1',
    component: () => import( /* webpackChunkName: "nested" */ '@/views/nested/menu1/index'),
    meta: { title: 'Menu1' },
    children: [
    {
      path: 'menu1-1',
      name: 'Menu1-1',
      component: () => import( /* webpackChunkName: "nested" */ '@/views/nested/menu1/menu1-1'),
      meta: { title: 'Menu1-1' }
    },
    {
      path: 'menu1-2',
      name: 'Menu1-2',
      component: () => import( /* webpackChunkName: "nested" */ '@/views/nested/menu1/menu1-2'),
      meta: { title: 'Menu1-2' },
      children: [
      {
        path: 'menu1-2-1',
        name: 'Menu1-2-1',
        component: () => import( /* webpackChunkName: "nested" */ '@/views/nested/menu1/menu1-2/menu1-2-1'),
        meta: { title: 'Menu1-2-1' }
      },
      {
        path: 'menu1-2-2',
        name: 'Menu1-2-2',
        component: () => import( /* webpackChunkName: "nested" */ '@/views/nested/menu1/menu1-2/menu1-2-2'),
        meta: { title: 'Menu1-2-2' }
      }]
    },
    {
      path: 'menu1-3',
      name: 'Menu1-3',
      component: () => import( /* webpackChunkName: "nested" */ '@/views/nested/menu1/menu1-3'),
      meta: { title: 'Menu1-3' }
    }]
  },
  {
    path: 'menu2',
    name: 'Menu2',
    component: () => import( /* webpackChunkName: "nested" */ '@/views/nested/menu2/index'),
    meta: { title: 'menu2' }
  }]
},
{
  path: '*',
  name: 'Page404',
  hidden: true,
  component: () => import( /* webpackChunkName: "404" */ '@/views/404')
}]

export default new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({
    y: 0
  })
})