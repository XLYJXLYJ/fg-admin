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
      component: resolve => require(['@/components/Page/Order'], resolve),
      children: [
        {
          path: '/Order/PaymentOrder',
          component: resolve => require(['@/components/Page/Order/PaymentOrder'], resolve)
        },
        {
          path: '/Order/ComfirmOrder',
          component: resolve => require(['@/components/Page/Order/ComfirmOrder'], resolve)
        },
        {
          path: '/Order/LostOrder',
          component: resolve => require(['@/components/Page/Order/LostOrder'], resolve)
        }
      ]
    },
    {
      path: '/Me',
      component: resolve => require(['@/components/Page/Me'], resolve)
    },
    {
      path: '/Editpassage',
      component: resolve => require(['@/components/Page/Editpassage'], resolve)
    },
    {
      path: '/Login',
      component: resolve => require(['@/components/Page/Login'], resolve)
    },
    {
      path: '/Forgetpassword',
      component: resolve => require(['@/components/Page/Forgetpassword'], resolve)
    }
  ]
})
