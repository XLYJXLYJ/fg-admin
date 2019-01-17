<template>
<div>
    <!-- <div class="head">
      <a href="fangou://close"><img src="../../assets/statistics_icon_back@2x.png" class="close_icon" @click="Back"></a>
      <span class="close"><a href="fangou://close">关闭</a></span>
      <span class='fg-center'>凡购运营中心后台</span>
      <img class="reload" src="../../assets/statistics_icon_refresh@2x.png" @click="Reload">
    </div> -->
    <VHead></VHead>
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
            <router-link to="/Forgetpassword"><span class="forget_password_button">忘记密码？</span></router-link>
            <button :class="{login_button:is_login_button,ok_login_button:!is_login_button}" @click.stop.prevent="Loginbtn()">登录</button>    
        </form> 
    </div>
</div>
</template>
<script>
// import store from '@/vuex/store'
import func from '@/common/func'
import VHead from '@/components/header'
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
  mounted () {
    // this.clientHeight = document.documentElement.clientHeight
    // const that = this
    // // 安卓手机键盘吊起挡住输入框
    // window.onresize = function () {
    //   if (document.documentElement.clientHeight < that.clientHeight) {
    //   // scrollVal为负值
    //     let scrollVal = document.documentElement.clientHeight - that.clientHeight
    //     var div01 = document.getElementByClassName('login')
    //     div01.setAttribute('marginTop', scrollVal)
    //   } else {
    //     var div02 = document.getElementByClassName('login')
    //     div02.setAttribute('marginTop', 0)
    //   }
    // }
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
        this.axios.post(this.$store.state.baseUrl + '/user/login/password?osType=0&mobile=' + this.username + '&password=' + this.$md5(this.password))
        .then(response => {
          if (response.data.code === 200) {
            this.getToken = response.data.data.loginToken
            let token = response.data.data.loginToken
            localStorage.setItem('loginToken', token)
            // window.location.href = '/#/Statistics'
            this.Initialization()
          } else {
            this.error_type = response.data.message
            this.alert_show = true
          }
        })
      }
    },
    Initialization () {
      this.getToken = localStorage.getItem('loginToken')
      this.axios.get(this.$store.state.baseUrl + '/user/auth/query?osType=0', {
        headers: {'token': this.getToken}
      })
      .then(response => {
        if (response.data.code === 200) {
          var uid = response.data.data.userId
          var headImg = response.data.data.headImg
          var mobile = response.data.data.mobile
          var nickname = response.data.data.nickname
          var userType = response.data.data.userType
          localStorage.setItem('uType', userType)
          localStorage.setItem('uid', uid)
          localStorage.setItem('headImg', headImg)
          localStorage.setItem('mobile', mobile)
          localStorage.setItem('nickname', nickname)
          this.$router.push({name: 'Statistics'})
        } else if (response.data.code === 401) {
            this.$router.push('Login')
        } else {
        this.error_type = response.data.message
        this.alert_show = true
        }
      })
    },
    GetTeamSituation () {
      let uid = localStorage.getItem('uid')
      func.ajaxGet(this.$store.state.baseUrl + '/user/relation/auth/itocInfo?uid=' + uid,
      response => {
        if (response.data.code === 200) {
          this.underCount = response.data.data.underCount
          this.referCount = response.data.data.referCount
          this.agentCount = response.data.data.agentCount
          let sum = this.underCount + this.referCount + this.agentCount
          localStorage.setItem('underCount', this.underCount / sum * 100)
          localStorage.setItem('referCount', this.referCount / sum * 100)
          localStorage.setItem('agentCount', this.agentCount / sum * 100)
          // this.underCountPercent = this.underCount / sum * 100
        } else {
          this.error_type = response.data.message
          this.alert_show = true
        }
      })
    }
  },
  components: {
    VHead
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
  width: 640px;
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
    cursor: pointer;
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
    cursor: pointer;
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
    cursor: pointer;
  }
}
</style>

