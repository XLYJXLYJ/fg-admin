<template>
    <div class="head">
        <!-- <img src="../assets/statistics_icon_back@2x.png" class="close_icon" @click="Back"> -->
        <span class="close"><a href="fangou://close">关闭</a></span>
        <span class='fg-center'>凡购运营中心后台</span>
        <span class="reload" @click="Reload">刷新</span>
        <!-- <img class="reload" src="../assets/statistics_icon_refresh@2x.png" @click="Reload"> -->
    </div>
</template>
<script>
export default {
  methods: {
    Reload () {
      // this.$router.go(0)
      window.location.reload()
    },
    Back () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.head{
    height: 64px;
    width: 640px;
    position: fixed;
    top: 0px;
    z-index: 1000;
    background-color: #fff;
    .close_icon{
      width: 17px;
      height: 30px;
      position: absolute;
      top: 17px;
      left: 20px;
    }
    .close{
      width: 60px;
      height: 27px;
      position: absolute;
      top: 18px;
      left: 40px;
      font-size: 29px;
      color: #333333;
      font-weight: Regular;
      font-family: PingFang-SC-Regular;
      a{
        color: #333333;
      }
    }
    .fg-center{
      width: 236px;
      height: 27px;
      position: relative;
      top: 18px;
      left: 202px;
      color: #333333;
      font-size: 29px;
      font-weight: Regular;
      font-family: PingFang-SC-Regular;
    }
    .reload{
      width: 60px;
      height: 27px;
      position: absolute;
      top: 18px;
      right: 40px;
      font-size: 29px;
      color: #333333;
      font-weight: Regular;
      font-family: PingFang-SC-Regular;
      cursor: pointer;
      z-index: 1000;
    }
}
</style>
