<template>
  <div>
    <tabbar class="foot">
      <tabbar-item link="/Statistics" :selected="$route.path == '/Statistics'">
        <img slot="icon" src="../assets/statistics_icon@3x.png">
        <img slot="icon-active" src="../assets/statistics_icon_choose@3x.png">
        <span slot="label">统计</span>
      </tabbar-item>
      <tabbar-item link="/User" :selected="$route.path == '/User'">
        <img slot="icon" src="../assets/user_icon@3x.png">
        <img slot="icon-active" src="../assets/user_icon_choose@3x.png">
        <span slot="label">用户</span>
      </tabbar-item>
      <tabbar-item link="/Order" :selected="$route.path == '/Order'">
        <img slot="icon" src="../assets/order_icon@3x.png">
        <img slot="icon-active" src="../assets/order_icon_choose@3x.png">
        <span slot="label">订单</span>
      </tabbar-item>
      <tabbar-item link="/Me" :selected="$route.path == '/Me'">
        <img slot="icon" src="../assets/me_icon@3x.png">
        <img slot="icon-active" src="../assets/me_icon_choose@3x.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'
// import store from '@/vuex/store'
// import { mapActions, mapMutations } from 'vuex'
export default {
  mounted () {
  },
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>
<style lang="less" scoped>
.foot{
  width: 100%;
  position: fixed;
  bottom: 0px;
}
</style>
