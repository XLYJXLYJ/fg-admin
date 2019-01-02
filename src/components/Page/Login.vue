<template>
<div>
    <div class="head">
      <a href="fangou://close"><img src="../../assets/statistics_icon_back@2x.png" class="close_icon" @click="Back"></a>
      <span class="close"><a href="fangou://close">关闭</a></span>
      <span class='fg-center'>凡购运营中心后台</span>
      <img class="reload" src="../../assets/statistics_icon_refresh@2x.png" @click="Reload">
    </div>
    <div class="login">
        <img class="fg-logo" src="../../assets/login_picture@2x.png">
        <alert v-model="alert_show">{{error_type}}</alert>
        <form>
            <input type="number" class="login_phone" v-model="username" placeholder="请输入您的手机号" @focus.stop.prevent="PhoneFocus()" @blur.stop.prevent="PhoneBlur()" autocomplete="off">
            <img class="login_phone_close" v-show="phone_show" src="../../assets/delete@2x.png" @click="ClosePhoneShow()">
            <input :type="is_show_password" class="login_pass" v-model="password" placeholder="请输入您的密码" @focus.stop.prevent="PasswordFocus()" @blur.stop.prevent="PasswordBlur()" autocomplete="off">
            <img class="password_close" src="../../assets/delete@2x.png" v-show="password_show" @click="ClosePasswordShow()">
            <img src="../../assets/password_icon_eye1@2x.png" v-show="icon_eye" class="show_password" @click="SwitchPassword()">
            <img src="../../assets/password_icon_eye@2x.png" v-show="!icon_eye" class="show_password" @click="SwitchPassword()">
            <router-link to="/Forgetpassword"><span class="forget_password_button">忘记密码 ？</span></router-link>
            <button :class="{login_button:is_login_button,ok_login_button:!is_login_button}" @click.stop.prevent="Loginbtn()">登录</button>    
        </form> 
    </div>
</div>
</template>
<script>
// import func from '@/common/func'
// import VHead from '@/components/header'
// import Qs from 'qs'
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
      icon_eye: '', // 密码是否可见小图标
      getToken: '' // 设置token
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
    Reload () {
      this.$router.go(0)
    },
    Back () {
      window.location.href('fangou://close')
    },
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
      console.log('点击登录按钮')
      // var data = {
      //   mobile: this.username,
      //   password: this.$md5(this.password),
      //   osType: 0
      // }
      // data = Qs.stringify(data)
      // let regpassword = /^[a-zA-Z0-9]\w{6,16}$/
      if (!this.username) {
        this.error_type = '用户名不能为空'
        this.alert_show = true
      } else if (!this.password) {
        this.error_type = '密码不能为空'
        this.alert_show = true
      } else {
        console.log('开始登录请求')
        this.axios.post('http://47.107.48.61:8820/user/login/password?osType=0&mobile=' + this.username + '&password=' + this.$md5(this.password))
        .then(response => {
          if (response.data.data.loginToken) {
            console.log('登录成功')
            this.getToken = response.data.data.loginToken
            localStorage.setItem('loginToken', this.getToken)
            this.axios.get('http://47.107.48.61:8820/user/auth/query?osType=0', {
              headers: {'token': this.getToken}
            })
            .then(response => {
              console.log('请求个人数据成功')
              var uid = response.data.data.userId
              var headImg = response.data.data.headImg
              var mobile = response.data.data.mobile
              var nickname = response.data.data.nickname
              localStorage.setItem('uid', uid)
              localStorage.setItem('headImg', headImg)
              localStorage.setItem('mobile', mobile)
              localStorage.setItem('nickname', nickname)
              // func.ajaxGet('http://47.107.48.61:8820/user/relation/auth/itocInfo?osType=0&uid=' + uid,
              // response => {
              //   let underCount = response.data.data.underCount
              //   let referCount = response.data.data.referCount
              //   let agentCount = response.data.data.agentCount
              //   let sum = underCount + referCount + agentCount
              //   localStorage.setItem('underCount', underCount / sum)
              //   localStorage.setItem('referCount', referCount / sum)
              //   localStorage.setItem('agentCount', agentCount / sum)
              //   console.log(underCount / sum)
              //   console.log(localStorage.getItem('underCount'))
              //   this.$router.push({name: 'Statistics'})
              // })
              this.axios.get('http://47.107.48.61:8820/user/relation/auth/itocInfo?osType=0&uid=' + uid, {
                headers: {'token': this.getToken}
              })
              .then(response => {
                console.log('请求第一页是数据')
                var underCount = response.data.data.underCount
                var referCount = response.data.data.referCount
                var agentCount = response.data.data.agentCount
                var sum = underCount + referCount + agentCount
                localStorage.setItem('underCount', underCount / sum)
                localStorage.setItem('referCount', referCount / sum)
                localStorage.setItem('agentCount', agentCount / sum)
                this.$router.push({name: 'Statistics'})
              })
            })
          } else {
            this.error_type = '服务端错误，请稍后登录'
            this.alert_show = true
          }
        })
      }
    }
  },
  components: {
    // VHead
  }
}
</script>
<style lang="less" scoped>
.head{
  height: 64px;
  width: 100%;
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
    top: 17px;
    left: 72px;
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
    color: #333;
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
    color: #333;
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
    z-index: 1000;
  }
}
</style>

