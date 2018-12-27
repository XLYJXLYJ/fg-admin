import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/Statistics'},
    {
      path: '/Statistics',
      component: resolve => require(['@/components/Page/Statistics'], resolve)
    },
    {
      path: '/User',
      component: resolve => require(['@/components/Page/User'], resolve)
    },
    {
      path: '/Order',
      component: resolve => require(['@/components/Page/Order'], resolve)
    },
    {
      path: '/Me',
      component: resolve => require(['@/components/Page/Me'], resolve)
    },
    {
      path: '/Editpassage',
      component: resolve => require(['@/components/Page/Editpassage'], resolve)
    }
  ]
})
