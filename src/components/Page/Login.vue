<template>
<div>
    <VHead></VHead>
    <div class="login">
        <img class="fg-logo" src="../../assets/login_picture@2x.png">
        <form>
            <input type="text" class="login_phone" v-model="userName" placeholder="请输入您的手机号">
            <img class="login_phone_close" src="../../assets/delete@2x.png">
            <input type="password" class="login_pass" v-model="password" placeholder="请输入您的密码">
            <img class="password_close" src="../../assets/delete@2x.png">
            <img src="../../assets/password_icon_eye@2x.png" class="show_passage">
            <router-link to="/Forgetpassword"><span class="forget_password_button">忘记密码 ？</span></router-link>
            <button class="login_button" @click.prevent="Loginbtn">登录</button>    
        </form> 
    </div>
</div>
</template>
<script>
import VHead from '@/components/header'
export default {
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    Loginbtn () {

    }
  },
  components: {
    VHead
  }
}
</script>
<style lang="less" scoped>
.login{
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #fff;
  text-align: center;
  .fg-logo{
    width: 295px;
    height: 222px;
    margin-top: 154px;
  }
  .login_phone{
    width: 555px;
    height: 64px;
    font-family:PingFang-SC-Regular;
    font-weight:Regular;
    font-size: 29px;
    color: #D0D0D0;
    border-bottom: 1px solid #E8E8EA;
    background: #fff;
    margin-top: 123px;
    padding-left: 17px;
  }
  .login_phone_close{
      width:24px;
      height: 24px;
      position: absolute;
      top: 520px;
      left: 559px;
  }
  .login_pass{
    width: 555px;
    height: 64px;
    font-family:PingFang-SC-Regular;
    font-weight:Regular;
    font-size: 29px;
    color: #D0D0D0;
    border-bottom: 1px solid #E8E8EA;
    background: #fff;
    margin-top: 32px;
    padding-left: 17px;
  }
  .password_close{
    width:24px;
    height: 24px;
    position: absolute;
    top: 614px;
    left: 485px;
  }
  .show_passage{
    width:38px;
    height: 22px;
    position: absolute;
    top: 614px;
    left: 551px;
  }
  .forget_password_button{
    width:111px;
    height:20px;
    color: #FF5100;
    font-size: 20px;
    font-family:PingFang-SC-Regular;
    font-weight:Regular;
    position: absolute;
    top: 686px;
    left: 490px;
  }
  .login_button{
    width:572px;
    height:94px;
    background:#E8E8EA;
    border-radius:9px;
    font-size: 29px;
    font-family:PingFang-SC-Regular;
    font-weight:Regular;
    text-align: center;
    margin-top: 84px;
  }
}
</style>

