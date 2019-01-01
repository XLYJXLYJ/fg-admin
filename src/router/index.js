import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/Login'},
    {path: '/Order', redirect: '/Order/PaymentOrder'},
    {
      path: '/Statistics',
      name: 'Statistics',
      component: resolve => require(['@/components/Page/Statistics'], resolve)
    },
    {
      path: '/StatisticsDetail',
      component: resolve => require(['@/components/Page/Statistics/StatisticsDetail'], resolve)
    },
    {
      path: '/ProgressCircle',
      component: resolve => require(['@/components/Page/Statistics/ProgressCircle'], resolve)
    },
    {
      path: '/User',
      name: 'User',
      component: resolve => require(['@/components/Page/User'], resolve),
      children: [
        {
          path: '/User/UserTime',
          name: 'UserTime',
          component: resolve => require(['@/components/Page/User/UserDetail'], resolve)
        },
        {
          path: '/User/UserNumber',
          component: resolve => require(['@/components/Page/User/UserDetail'], resolve)
        },
        {
          path: '/User/UserDirectly',
          component: resolve => require(['@/components/Page/User/UserDetail'], resolve)
        }
      ]
    },
    {
      path: '/UserDetailOne',
      component: resolve => require(['@/components/Page/User/UserDetailOne'], resolve)
    },
    {
      path: '/Order',
      component: resolve => require(['@/components/Page/Order'], resolve),
      children: [
        {
          path: '/Order/PaymentOrder',
          component: resolve => require(['@/components/Page/Order/ComfirmOrder'], resolve)
        },
        {
          path: '/Order/ComfirmOrder',
          component: resolve => require(['@/components/Page/Order/ComfirmOrder'], resolve)
        },
        {
          path: '/Order/LostOrder',
          component: resolve => require(['@/components/Page/Order/ComfirmOrder'], resolve)
        }
      ]
    },
    {
      path: '/Me',
      name: 'Me',
      component: resolve => require(['@/components/Page/Me'], resolve)
    },
    {
      path: '/Contract',
      component: resolve => require(['@/components/Page/Contract'], resolve)
    },
    {
      path: '/Editpassage',
      component: resolve => require(['@/components/Page/Editpassage'], resolve)
    },
    {
      path: '/Login',
      name: 'Login',
      component: resolve => require(['@/components/Page/Login'], resolve)
    },
    {
      path: '/Forgetpassword',
      component: resolve => require(['@/components/Page/Forgetpassword'], resolve)
    }
  ]
})
