import Vue from 'vue'
import Router from 'vue-router'
// import Statistics from '@/components/Page/Statistics'
// import StatisticsDetail from '@/components/Page/Statistics/StatisticsDetail'
// import User from '@/components/Page/User'
// import UserTime from '@/components/Page/User/UserDetail'
// import UserNumber from '@/components/Page/User/UserDetail'
// import UserDirectly from '@/components/Page/User/UserDetail'
// import UserDetailOne from '@/components/Page/User/UserDetailOne'
// import Order from '@/components/Page/Order'
// import PaymentOrder from '@/components/Page/Order/ComfirmOrder'
// import ComfirmOrder from '@/components/Page/Order/ComfirmOrder'
// import LostOrder from '@/components/Page/Order/ComfirmOrder'
// import Me from '@/components/Page/Me'
// import Contract from '@/components/Page/Contract'
// import Editpassage from '@/components/Page/Editpassage'
// import Login from '@/components/Page/Login'
// import Forgetpassword from '@/components/Page/Forgetpassword'

Vue.use(Router)
// export default new Router({
//   mode: 'history',
//   routes: [
//     {path: '/', redirect: '/Login'},
//     {
//       path: '/Statistics',
//       name: 'Statistics',
//       component: Statistics
//     },
//     {
//       path: '/StatisticsDetail',
//       name: 'StatisticsDetail',
//       component: StatisticsDetail
//     },
//     {
//       path: '/User',
//       name: 'User',
//       component: User,
//       children: [
//         {path: '/User/UserTime', name: 'UserTime', component: UserTime},
//         {path: '/User/UserNumber', component: UserNumber},
//         {path: '/User/UserDirectly', component: UserDirectly}
//       ]
//     },
//     {
//       path: '/UserDetailOne',
//       name: 'UserDetailOne',
//       component: UserDetailOne
//     },
//     {
//       path: '/Order',
//       name: 'Order',
//       component: Order,
//       children: [
//         {path: '/Order/PaymentOrder', name: 'PaymentOrder', component: PaymentOrder},
//         {path: '/Order/ComfirmOrder', name: 'ComfirmOrder', component: ComfirmOrder},
//         {path: '/Order/LostOrder', name: 'LostOrder', component: LostOrder}
//       ]
//     },
//     {
//       path: '/Me',
//       name: 'Me',
//       component: Me
//     },
//     {
//       path: '/Contract',
//       name: 'Contract',
//       component: Contract
//     },
//     {
//       path: '/Editpassage',
//       name: 'Editpassage',
//       component: Editpassage
//     },
//     {
//       path: '/Login',
//       name: 'Login',
//       component: Login
//     },
//     {
//       path: '/Forgetpassword',
//       name: 'Forgetpassword',
//       component: Forgetpassword
//     }
//   ]
// })
export default new Router({
  routes: [
    {path: '/', redirect: '/Login'},
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
          name: 'UserNumber',
          component: resolve => require(['@/components/Page/User/UserDetail'], resolve)
        },
        {
          path: '/User/UserDirectly',
          name: 'UserDirectly',
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
      name: 'Order',
      component: resolve => require(['@/components/Page/Order'], resolve),
      children: [
        {
          path: '/Order/PaymentOrder',
          name: 'PaymentOrder',
          component: resolve => require(['@/components/Page/Order/PaymentOrder'], resolve)
        },
        {
          path: '/Order/ComfirmOrder',
          name: 'ComfirmOrder',
          component: resolve => require(['@/components/Page/Order/ComfirmOrder'], resolve)
        },
        {
          path: '/Order/LostOrder',
          name: 'LostOrder',
          component: resolve => require(['@/components/Page/Order/LostOrder'], resolve)
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
