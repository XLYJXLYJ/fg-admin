<template>
  <div>
    <VHead></VHead>
    <div class="user_detail_one">
      <!-- <alert v-model="alert_show">{{error_type}}</alert> -->
      <div class="me">
        <img src="../../assets/statistics_icon_back2@2x.png" @click="BackFunction()">
        <p>运营中心协议合同</p>
      </div>
    </div>
  </div>
</template>

<script>
import VHead from '@/components/header'
export default {
  created () {
    let uid = localStorage.getItem('uid')
    if (!uid) {
      this.$router.push('Login')
    }
  },
  components: {
    VHead
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.user_detail_one{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #F5F5F5;
  width: 100%;
  .unactive_class{
    background: #fff;
    }
  .active_class{
    background: #FF5100;
  }
  .me{
    position: absolute;
    top: 65px;
    width: 100%;
    height: 75px;
    background-color: #fff;
    text-align: center;
    border-top:1px solid #E8E8EA;
    img{
      width: 17px;
      height: 24px;
      position: absolute;
      left: 26px;
      top: 26px;
    }
    p{
      color: #333;
      font-size:29px;
      margin-top: 24px;
      font-family: PingFang-SC-Regular;
      font-weight: Regular;
    }
  }
}
</style>
