<template>
<div>
    <VHead></VHead>
    <div class="login">
        <img class="fg-logo" src="../../assets/login_picture@2x.png">
        <alert v-model="alert_show">{{error_type}}</alert>
        <form>
            <input type="text" class="login_phone" v-model="username" placeholder="请输入您的手机号" @focus.stop.prevent="PhoneFocus()" @blur.stop.prevent="PhoneBlur()" autocomplete="off">
            <img class="login_phone_close" v-show="phone_show" src="../../assets/delete@2x.png" @click="ClosePhoneShow()">
            <input :type="is_show_password" class="login_pass" v-model="password" placeholder="请输入您的密码" @focus.stop.prevent="PasswordFocus()" @blur.stop.prevent="PasswordBlur()" autocomplete="off">
            <img class="password_close" src="../../assets/delete@2x.png" v-show="password_show" @click="ClosePasswordShow()">
            <img src="../../assets/password_icon_eye1@2x.png" v-show="icon_eye" class="show_password" @click="SwitchPassword()">
            <img src="../../assets/password_icon_eye@2x.png" v-show="!icon_eye" class="show_password" @click="SwitchPassword()">
            <router-link to="/Forgetpassword"><span class="forget_password_button">忘记密码 ？</span></router-link>
            <button :class="{login_button:is_login_button,ok_login_button:!is_login_button}" @click.prevent="Loginbtn()">登录</button>    
        </form> 
    </div>
</div>
</template>
<script>
import VHead from '@/components/header'
import Qs from 'qs'
export default {
  data () {
    return {
      username: '', // 账号
      password: '', // 密码
      alert_show: false, // 是否显示弹出框
      error_type: '', // 弹出框的弹出说明
      phone_show: false, // 账号的小图标是否显示
      password_show: false, // 密码清空的小图标是否显示
      is_show_password: 'password', // 是否显示密码
      is_login_button: true, // 默认登录按钮不可点击
      icon_eye: '' // 密码是否可见小图标
    }
  },
  watch: {
    'username': function () {
      this.IsShowLoginButtonColor()
    },
    'password': function () {
      this.IsShowLoginButtonColor()
    }
  },
  methods: {
    PhoneBlur () {
      this.phone_show = false
    },
    PhoneFocus () {
      this.phone_show = true
    },
    PasswordBlur () {
      this.password_show = false
    },
    PasswordFocus () {
      this.password_show = true
    },
    IsShowLoginButtonColor () {
      if (this.username && this.password) {
        this.is_login_button = false
      } else {
        this.is_login_button = true
      }
    },
    ClosePhoneShow () {
      this.phone_show = false
      this.username = ''
    },
    ClosePasswordShow () {
      this.password_show = false
      this.password = ''
    },
    SwitchPassword () {
      if (this.is_show_password === 'text') {
        this.is_show_password = 'password'
        this.icon_eye = true
      } else {
        this.is_show_password = 'text'
        this.icon_eye = false
      }
    },
    Loginbtn () {
      // 登陆
      let data = {
        mobile: this.username,
        password: this.$md5(this.password),
        osType: 0
      }
      data = Qs.stringify(data)
      let regpassword = /^[a-zA-Z0-9]\w{6,16}$/
      if (!this.username) {
        this.error_type = '用户名不能为空'
        this.alert_show = true
      } else if (!this.password) {
        this.error_type = '密码不能为空'
        this.alert_show = true
      } else if (!regpassword.test(this.password)) {
        this.error_type = '密码格式不正确'
        this.alert_show = true
      } else {
        this.axios.post('user/login/password?' + data)
        .then(response => {
          if (response.data.data.loginToken) {
            let getToken = response.data.data.loginToken
            localStorage.setItem('loginToken', getToken)
            this.axios.get('/user/auth/query?osType=0', {
              headers: {'token': getToken}
            })
            .then(response => {
              let uid = response.data.data.userId
              let headImg = response.data.data.headImg
              let mobile = response.data.data.mobile
              let nickname = response.data.data.nickname
              localStorage.setItem('uid', uid)
              localStorage.setItem('headImg', headImg)
              localStorage.setItem('mobile', mobile)
              localStorage.setItem('nickname', nickname)
            })
            this.$router.push({name: 'Statistics'})
          } else {
            this.error_type = '服务端错误，请稍后登录'
            this.alert_show = true
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
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
  .show_password{
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
  .ok_login_button{
    width:572px;
    height:94px;
    background:#FF5100;
    border-radius:9px;
    font-size: 29px;
    font-family:PingFang-SC-Regular;
    font-weight:Regular;
    text-align: center;
    margin-top: 84px;
    color: #fff;
  }
}
</style>

