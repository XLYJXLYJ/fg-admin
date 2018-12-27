<template>
  <div class="statistics_contain">
      <div class="head">
        <img src="../../assets/statistics_icon_back@2x.png" class="close_icon">
        <span class="close">关闭</span>
        <span class='fg-center'>凡购运营中心后台</span>
        <img class="reload" src="../../assets/statistics_icon_refresh@2x.png">
      </div>
      <div class="team_situation"></div>
      <div class="data_statistics"></div>
      <div class="revenue_statistics"></div>
      <div class="team_statistics_box">
        <div class="team_statistics"><span>团队统计</span><img src="../../assets/statistics_icon_enter@2x.png"></div>
        <div class="team_member_statement"><span>团队会员对账单</span><img src="../../assets/statistics_icon_enter@2x.png"></div>
      </div>
      <foot></foot>
  </div>
</template>

<script>
import foot from '@/components/foot'
export default {
  name: 'Statistics',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    foot
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.statistics_contain{
  width: 100%;
  min-height: 1390px;
  position: flex;
  margin: 0px;
  padding: 0px;
  background-color: #F5F5F5;
  padding-bottom: 105px;
  .head{
    height: 64px;
    width: 100%;
    position: fixed;
    top: 0px;
    z-index: 1000;
    .close_icon{
      width: 17px;
      height: 30px;
      position: absolute;
      top: 17px;
      left: 20px;
    }
    .close{
      width: 58px;
      height: 27px;
      position: absolute;
      top: 17px;
      left: 72px;
      font-size: 29px;
      color: #333333;
      font-weight: Regular;
      font-family: PingFang-SC-Regular;
    }
    .fg-center{
      width: 236px;
      height: 27px;
      position: absolute;
      top: 17px;
      left: 202px;
      color: #333333;
      font-size: 29px;
      font-weight: Regular;
      font-family: PingFang-SC-Regular;
    }
    .reload{
      width: 30px;
      height: 30px;
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }
  .team_situation{
    height: 428px;
    width: 599px;
    border: 1px solid red;
    position: relative;
    left: 20px;
    top: 84px;
    z-index: 100;
  }
  .data_statistics{
    height: 294px;
    width: 599px;
    border: 1px solid red;
    position: relative;
    left: 20px;
    top: 104px;
    z-index: 100;
  }
  .revenue_statistics{
    height: 383px;
    width: 599px;
    border: 1px solid red;
    position: relative;
    left: 20px;
    top: 124px;
    z-index: 100;
  }
  .team_statistics_box{
    height: 150px;
    width: 599px;
    border: 1px solid red;
    position: relative;
    left: 20px;
    top: 144px;
    z-index: 100;
    .team_statistics{
      height: 75px;
      width: 599px;
      border: 1px solid red;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 100;
      img{
        height: 23px;
        width:13px;
      }
    }
    .team_member_statement{
      height: 75px;
      width: 599px;
      border: 1px solid red;
      position: absolute;
      left: 0px;
      top: 75px;
      z-index: 100;
      img{
        height: 23px;
        width:13px;
      }
    }
  }
}
</style>
