<template>
  <div>
    <tabbar class="foot">
      <tabbar-item link="/Statistics" :selected="$route.path == '/Statistics'">
        <img class="foot_icon" slot="icon" src="../assets/statistics_icon@3x.png">
        <img class="foot_icon" slot="icon-active" src="../assets/statistics_icon_choose@3x.png">
        <span class="foot_text" slot="label">统计</span>
      </tabbar-item>
      <tabbar-item link="/User" :selected="$route.path == '/User'">
        <img class="foot_icon" slot="icon" src="../assets/user_icon@3x.png">
        <img class="foot_icon" slot="icon-active" src="../assets/user_icon_choose@3x.png">
        <span class="foot_text" slot="label">用户</span>
      </tabbar-item>
      <tabbar-item link="/Order" :selected="$route.path == '/Order'">
        <img class="foot_icon" slot="icon" src="../assets/order_icon@3x.png">
        <img class="foot_icon" slot="icon-active" src="../assets/order_icon_choose@3x.png">
        <span class="foot_text" slot="label">订单</span>
      </tabbar-item>
      <tabbar-item link="/Me" :selected="$route.path == '/Me'">
        <img class="foot_icon" slot="icon" src="../assets/me_icon@3x.png">
        <img class="foot_icon" slot="icon-active" src="../assets/me_icon_choose@3x.png">
        <span class="foot_text" slot="label">我的</span>
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
  width: 640px;
  height: 84px;
  position: fixed;
  bottom: 0px;
  margin: 0px;
  padding: 0px;
  .foot_icon{
    width: 43px;
    height: 43px;
    position: relative;
    top: 0px;
    left: 0px;
  }
  .foot_text{
    width: 36px;
    height: 20px;
    font-size: 17px;
    position:relative;
    top: 0px;
    left: 0px;
    margin-bottom:20px;
    z-index: 2000;
  }
}
</style>
