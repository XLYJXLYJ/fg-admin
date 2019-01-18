<template>
  <div>
    <tabbar :class="{foot01:is_padding,foot:!is_padding}">
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
export default {
  data () {
    return {
      is_padding: false
    }
  },
  created () {
    this.IsIPhoneX()
  },
  methods: {
    IsIPhoneX (fn) {
      var u = navigator.userAgent
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (isIOS) {
        if (screen.height === 812 && screen.width === 375) {
          // 是iphoneX
          this.is_padding = true
        } else {
          // 不是iphoneX
        }
      }
    }
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
  .padding10{
    margin-bottom: 20px;
    border: 1px solid red;
  }
}
.foot01{
  width: 640px;
  height: 84px;
  position: fixed;
  bottom: 0px;
  margin: 0px;
  padding-bottom: 20px;
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
  .padding10{
    margin-bottom: 20px;
    border: 1px solid red;
  }
}
</style>
