<template>
  <div>
    <VHead></VHead>
      <alert v-model="alert_show">{{error_type}}</alert>
      <confirm v-model="show"
      title="温馨提示"
      @on-cancel="onCancel"
      @on-confirm="onConfirm">
      <p style="text-align:center;">是否退出登录</p>
      </confirm>
    <div class="me_center">
      <div class="me"><p>我的</p></div>
      <div class="edit_password">
        <p>修改密码</p>
        <button><router-link to="/Forgetpassword">修改</router-link></button>
        <div class="me_center_line"></div>
      </div>
      <!-- <router-link to="/Contract">
        <div class="me_center_contract">
          <p>运营中心协议合同</p>
          <span>已生效</span>
          <img class="me_center_contract_img" src="../../assets/statistics_icon_enter@2x.png">
        </div>
      </router-link> -->
      <div class="logout">
        <button @click.stop="DoShowToast()">退出登录</button>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import func from '@/common/func'
import { Confirm } from 'vux'
import foot from '@/components/foot'
import VHead from '@/components/header'
export default {
  name: 'Statistics',
  data () {
    return {
      show: false, // 是否弹出确定框
      alert_show: false, // 是否显示弹出框
      error_type: '' // 弹出框的弹出说明
    }
  },
  methods: {
    onCancel () {
      this.show = false
    },
    onConfirm () {
      func.ajaxGet('http://47.107.48.61:8820/user/logout?osType=0',
      response => {
        if (response.data.code === 200) {
          localStorage.setItem('uid', '')
          this.$router.push({name: 'Login'})
        } else {
          this.error_type = response.data.message
          this.alert_show = true
        }
      })
    },
    DoShowToast () {
      this.show = true
    }
  },
  components: {
    foot,
    VHead,
    Confirm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.me_center{
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #F5F5F5;
  .me{
    position: absolute;
    top: 65px;
    width: 100%;
    height: 75px;
    background-color: #fff;
    text-align: center;
    border-top:1px solid #E8E8EA;
    p{
      color: #333;
      font-size:29px;
      margin-top: 24px;
      font-family: PingFang-SC-Regular;
      font-weight: Regular;
    }
  }
  .edit_password{
    position: absolute;
    top: 166px;
    width: 100%;
    height: 94px;
    background-color: #fff;
    p{
      width: 118px;
      height: 29px;
      position: absolute;
      top: 33px;
      left: 26px;
      color: #333;
      font-size: 29px;
      font-family: PingFang-SC-Regular;
      font-weight: Regular;
    }
    button{
      width: 102px;
      height: 51px;
      position: absolute;
      top: 21px;
      left: 512px;
      color: #fff;
      background:#FF5100;
      border-radius:9px;
      font-size: 24px;
      a{
        color: #fff;
      }
    }
    .me_center_line{
      position: relative;
      bottom: -94px;
      left: 26px;
      width:614px;
      height:1px;
      background:#E8E8EA;
      z-index: 100;
    }
  }
  .me_center_contract{
    position: absolute;
    top: 260px;
    width: 100%;
    height: 94px;
    background-color: #fff;
    p{
      width: 236px;
      height: 31px;
      position: absolute;
      top: 33px;
      left: 26px;
      color: #333;
      font-size: 29px;
      font-family: PingFang-SC-Regular;
      font-weight: Regular;
    }
    span{
      width: 76px;
      height: 23px;
      position: absolute;
      top: 36px;
      left: 468px;
      color: #999;
      font-size: 24px;
      font-family: PingFang-SC-Medium;
      font-weight: Regular;
    }
    .me_center_contract_img{
      position: absolute;
      top: 35px;
      right: 26px;
      height: 23px;
      width:13px;
      z-index: 1000;
    }
  }
  .logout{
    position: absolute;
    top: 250px;
    width: 100%;
    height: 94px;
    button{
      background-color: #fff;
      width:100%;
      height:94px;
      font-size:27px;
      font-family:PingFang-SC-Regular;
      font-weight:bold;
      color:#FF5100;
      margin: 0 auto;
      margin-top:34px;
    }
  }
}
</style>
