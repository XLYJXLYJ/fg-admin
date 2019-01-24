<template>
  <div>
    <VHead></VHead>
    <div class="change_password">
      <alert v-model="alert_show">{{error_type}}</alert>
      <div class="me">
        <div @click.stop.prevent="BackFunction()" class="img_border"><img src="../../assets/statistics_icon_back2@2x.png"></div>
        <p>忘记密码</p>
      </div>
      <form>
      <!-- 第一个表单 -->
      <img class="one_close" src="../../assets/delete@2x.png" v-show="forget_password_phone" @click.stop.prevent="ClearPhone()">
      <div class="get_identifying_code">
        <input type="text" v-model="phone" placeholder="请输入您的手机号" autocomplete="off" @focus.stop.prevent="ForgetPasswordPhoneFocus()" @blur.stop.prevent="ForgetPasswordPhoneBlur()">
      </div>
      <!-- 第二个表单 -->
      <img class="two_close" src="../../assets/delete@2x.png" v-show="forget_password_picture_code" @click.stop.prevent="ClearForgetPasswordPictureCode()">
      <div class="get_picture_identifying_code">
        <input type="text" v-model="picture_code" placeholder="请输入您的图形验证码" autocomplete="off" @focus.stop.prevent="ForgetPasswordPictureCodeFocus()" @blur.stop.prevent="ForgetPasswordPictureCodeBlur()">
        <img :src="get_picture_identifying_code" @click.stop.prevent="ReloadImgCode()">
      </div>
      <!-- 第三个表单 -->
      <img class="three_close" src="../../assets/delete@2x.png" v-show="forget_password_phone_code" @click.stop.prevent="ClearForgetPasswordPhoneCode()">
      <div class="get_phone_identifying_code">
        <input type="text" v-model="phone_code" placeholder="请输入您的手机验证码" autocomplete="off" @focus.stop.prevent="ForgetPasswordPhoneCodeFocus()" @blur.stop.prevent="ForgetPasswordPhoneCodeBlur()">
        <button @click.stop.prevent="GetCodeNumber" :class="{getCodeNumber:btnTxtColor01 , getCodeNumberDisabled:btnTxtColor02}" :disabled="disabled">{{btnTxt}}</button>
      </div>
      <!-- 第四个表单 -->
      <img class="four_close" src="../../assets/delete@2x.png" v-show="forget_password_password" @click.stop.prevent="ClearForgetPasswordPassword()">
      <img src="../../assets/password_icon_eye1@2x.png" v-show="icon_eye_one" class="register_show_passage" @click.stop.prevent="SwitchPassword()">
      <img src="../../assets/password_icon_eye@2x.png" v-show="!icon_eye_one" class="register_show_passage" @click.stop.prevent="SwitchPassword()">
      <div class="set_password">
        <input :type="text_or_password" v-model="password" placeholder="请输入6-16位字母和数字组合新密码" autocomplete="off" @focus.stop.prevent="ForgetPasswordPasswordFocus()" @blur.stop.prevent="ForgetPasswordPasswordBlur()">
      </div>
      <!-- 第五个表单 -->
      <img class="five_close" src="../../assets/delete@2x.png" v-show="forget_password_comfirm_password" @click.stop.prevent="ClearForgetPasswordComfirmPassword()">
      <img src="../../assets/password_icon_eye1@2x.png" v-show="icon_eye_two" class="confirm_register_show_passage" alt="" @click.stop.prevent="SwitchConfirmPassword()">
      <img src="../../assets/password_icon_eye@2x.png" v-show="!icon_eye_two" class="confirm_register_show_passage" @click.stop.prevent="SwitchConfirmPassword()">
      <div class="confirm_set_password">
        <input :type="confirm_text_or_password" v-model="confirm_password" placeholder="请确认密码" autocomplete="off" @focus.stop.prevent="ForgetPasswordComfirmPasswordFocus()" @blur.stop.prevent="ForgetPasswordComfirmPasswordBlur()">
      </div>
      <div class="setpassword_confirm">
      <button @click.stop.prevent="ConfirmChangePassword()" :class="{forget_password_button:is_forget_password_button,ok_forget_password_button:!is_forget_password_button}">确定</button>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
// import store from '@/vuex/store'
import VHead from '@/components/header'
import Qs from 'qs'
import func from '@/common/func'
export default {
  name: 'Editpassage',
  data () {
    return {
      get_picture_identifying_code: '', // 图形验证码
      phone: '', // 手机号
      codeTime: '', // 时间戳
      picture_code: '', // 图片验证码
      phone_code: '', // 手机验证码
      password: '', // 输入密码
      confirm_password: '', // 确认密码
      error_type: '', // 错误类型
      alert_show: false, // 是否弹出错误
      is_forget_password_button: true, // 默认确认提交按钮不可点击
      text_or_password: 'password', // 默认密码不可见
      confirm_text_or_password: 'password', // 默认确认密码不可见
      forget_password_phone: false, // 默认输入手机号小图标不可见
      forget_password_picture_code: false, // 默认输入图形验证码小图标不可见
      forget_password_phone_code: false, // 默认输入手机号验证码小图标不可见
      forget_password_password: false, // 默认输入密码小图标不可见
      forget_password_comfirm_password: false, // 默认输入确认密码小图标不可见
      icon_eye_one: false, // 切换眼睛小图标
      icon_eye_two: false, // 切换眼睛小图标
      time: 0, // 验证码时间初始化
      btnTxt: '获取验证码', // 验证码按钮文字
      btnTxtColor01: true, // 验证码按钮的颜色
      btnTxtColor02: false, // 验证码按钮的颜色
      disabled: false // 按钮是否可点击
    }
  },
  watch: {
    'phone': function () {
      this.IsShowLoginButtonColor()
    },
    'picture_code': function () {
      this.IsShowLoginButtonColor()
    },
    'phone_code': function () {
      this.IsShowLoginButtonColor()
    },
    'password': function () {
      this.IsShowLoginButtonColor()
    },
    'confirm_password': function () {
      this.IsShowLoginButtonColor()
    }
  },
  created () {
    this.GetImgCode()
    this.phone = localStorage.getItem('mobile')
  },
  methods: {
    // 第一个表单函数
    ForgetPasswordPhoneBlur () {
      this.forget_password_phone = false
    },
    ForgetPasswordPhoneFocus () {
      this.forget_password_phone = true
    },
    ClearPhone () {
      this.phone = ''
    },
    // 第二个表单函数
    ForgetPasswordPictureCodeBlur () {
      this.forget_password_picture_code = false
    },
    ForgetPasswordPictureCodeFocus () {
      this.forget_password_picture_code = true
    },
    ClearForgetPasswordPictureCode () {
      this.picture_code = ''
    },
    // 第三个表单函数
    ForgetPasswordPhoneCodeBlur () {
      this.forget_password_phone_code = false
    },
    ForgetPasswordPhoneCodeFocus () {
      this.forget_password_phone_code = true
    },
    ClearForgetPasswordPhoneCode () {
      this.phone_code = ''
    },
    // 第四个表单函数
    ForgetPasswordPasswordBlur () {
      this.forget_password_password = false
    },
    ForgetPasswordPasswordFocus () {
      this.forget_password_password = true
    },
    ClearForgetPasswordPassword () {
      this.password = ''
    },
    // 第五个表单函数
    ForgetPasswordComfirmPasswordBlur () {
      this.forget_password_comfirm_password = false
    },
    ForgetPasswordComfirmPasswordFocus () {
      this.forget_password_comfirm_password = true
    },
    ClearForgetPasswordComfirmPassword () {
      this.confirm_password = ''
    },
    // 密码是否可见
    SwitchPassword () {
      if (this.text_or_password === 'text') {
        this.text_or_password = 'password'
        this.icon_eye_one = false
      } else {
        this.text_or_password = 'text'
        this.icon_eye_one = true
      }
    },
    // 密码是否可见
    SwitchConfirmPassword () {
      if (this.confirm_text_or_password === 'text') {
        this.confirm_text_or_password = 'password'
        this.icon_eye_two = false
      } else {
        this.confirm_text_or_password = 'text'
        this.icon_eye_two = true
      }
    },
    // 图片验证码
    GetImgCode () {
      this.codeTime = Date.parse(new Date())
      this.axios.get(this.$store.state.baseUrl + '/media/imgCode?osType=0&codeTime=' + this.codeTime)
      .then(response => {
        if (response.data.code === 200) {
          this.get_picture_identifying_code = response.data.data
        } 
        else if (response.data.code === 401) {
          this.error_type = '登录超时，请重新登录'
          this.alert_show = true
          setTimeout(() => {this.$router.push({name: 'Login'})}, 1500);
        }
        else if (response.data.code === 500) {
          this.error_type = response.data.message
          this.alert_show = true
        } 
        else {
          this.error_type = response.data.message
          this.alert_show = true
        }
      })
    },
    // 刷新验证码
    ReloadImgCode () {
      this.GetImgCode()
    },
    // 手机验证码
    GetCodeNumber () {
      if (!this.phone) {
        this.error_type = '请先填写手机号'
        this.alert_show = true
      } else if (!this.picture_code) {
        this.error_type = '请先填写图形验证码'
        this.alert_show = true
      } else {
        let concertcodeTime = this.codeTime + this.picture_code
        concertcodeTime = concertcodeTime.toString()
        let data = {
          mobile: this.phone.toString(),
          codeTime: concertcodeTime,
          imgCode: this.picture_code,
          osType: 0
        }
        data = Qs.stringify(data)
        this.axios.post(this.$store.state.baseUrl + '/media/ssm/send/imgCode?' + data)
        .then(response => {
          if (response.data.code === 200) {
            this.GetImgCode()
            this.time = 60
            this.disabled = true
            this.Timer()
          } else {
            this.error_type = '图形验证码错误'
            this.alert_show = true
          }
        })
      }
    },
    IsShowLoginButtonColor () {
      if (this.phone && this.password && this.phone_code && this.password && this.confirm_password) {
        this.is_forget_password_button = false
      } else {
        this.is_forget_password_button = true
      }
    },
    // 验证60s
    Timer () {
      if (this.time > 0) {
        this.time --
        this.btnTxt = this.time + 's后重新发送'
        setTimeout(this.Timer, 1000)
        this.btnTxtColor01 = false
        this.btnTxtColor02 = true
        this.disabled = true
      } else {
        this.time = 0
        this.btnTxt = '获取验证码'
        this.disabled = false
        this.btnTxtColor01 = true
        this.btnTxtColor02 = false
      }
    },
    // 确认修改密码
    ConfirmChangePassword () {
      let regpassword = /^[a-zA-Z0-9]\w{5,16}$/
      let data = {
        mobile: this.phone.toString(),
        password: this.$md5(this.confirm_password),
        verifiCode: this.phone_code.toString(),
        osType: 0
      }
      if (!this.phone) {
        this.error_type = '手机号不能为空'
        this.alert_show = true
      } else if (!this.picture_code) {
        this.error_type = '图形验证码不能为空'
        this.alert_show = true
      } else if (!this.phone_code) {
        this.error_type = '手机验证码不能为空'
        this.alert_show = true
      } else if (!regpassword.test(this.password)) {
        this.error_type = '密码长度（6~20 英文+数字）'
        this.alert_show = true
      } else if (this.password !== this.confirm_password) {
        this.error_type = '密码输入不一致'
        this.alert_show = true
      } else {
        data = Qs.stringify(data)
        func.ajaxGet(this.$store.state.baseUrl + '/user/info/modifyPassword?' + data,
        response => {
          if (response.data.code === 200) {
            this.error_type = '修改密码成功'
            this.alert_show = true
            this.get_picture_identifying_code = response.data.data
            setTimeout(() => {this.$router.push({name: 'Login'})}, 1500);
          } else {
            this.error_type = response.data.message
            this.alert_show = true
          }
        })
      }
    }
  },
  components: {
    VHead
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.change_password{
  width: 640px;
  min-height: 1010px;
  position: absolute;
  background-color: #fff;
  .me{
    position: absolute;
    top: 65px;
    width: 100%;
    height: 75px;
    background-color: #fff;
    text-align: center;
    border-top:1px solid #E8E8EA;
    .img_border{
      width: 47px;
      height: 34px;
      position: absolute;
      left: 26px;
      top: 26px;
    }
    img{
      width: 17px;
      height: 24px;
      position: absolute;
      left: 0px;
      top: 0px;
    }
    p{
      color: #333;
      font-size:29px;
      margin-top: 24px;
      font-family: PingFang-SC-Regular;
      font-weight: Regular;
    }
  }
  .get_identifying_code{
    position: absolute;
    top: 260px;
    left: 34px;
    width: 572px;
    height: 94px;
    background-color: #fff;
    border-bottom: 1px solid #E8E8EA;
    input{
      width: 366px;
      height: 36px;
      position: absolute;
      top: 33px;
      left: 26px;
      font-size: 29px;
    }
    img{
      width: 136px;
      height: 51px;
      position: absolute;
      top: 21px;
      right: 26px; 
    }
  }
  .get_picture_identifying_code{
    position: absolute;
    top: 355px;
    left: 34px;
    width: 572px;
    height: 93px;
    background-color: #fff;
    border-bottom: 1px solid #E8E8EA;
    input{
      width: 336px;
      height: 36px;
      position: absolute;
      top: 33px;
      left: 26px;
      font-size: 29px;
    }
    img{
      width: 137px;
      height: 51px;
      position: absolute;
      top: 21px;
      right: 26px; 
      color: #fff;
      font-size:24px;
      font-family:PingFang-SC-Regular;
      font-weight:Regular;
      border-radius: 9px;
    }
  }
  .get_phone_identifying_code{
    position: absolute;
    top: 449px;
    left: 34px;
    width: 572px;
    height: 94px;
    background-color: #fff;
    border-bottom: 1px solid #E8E8EA;
    input{
      width: 336px;
      height: 36px;
      position: absolute;
      top: 33px;
      left: 26px;
      font-size: 29px;
    }
    .getCodeNumberDisabled{
      width: 171px;
      height: 51px;
      position: absolute;
      top: 21px;
      right: 26px; 
      color: #666;
      background-color: #fff;
      font-size:20px;
      font-family:PingFang-SC-Regular;
      font-weight:Regular;
      border-radius: 9px;
      border: 1px solid #999;
    }
    .getCodeNumber{
      width: 137px;
      height: 51px;
      position: absolute;
      top: 21px;
      right: 26px; 
      color: #fff;
      background-color: #FF5100;
      font-size:24px;
      font-family:PingFang-SC-Regular;
      font-weight:Regular;
      border-radius: 9px;
    }
  }
  .set_password{
    position: absolute;
    top: 544px;
    left: 34px;
    width: 572px;
    height: 94px;
    background-color: #fff;
    border-bottom: 1px solid #E8E8EA;
    input{
      width: 496px;
      height: 36px;
      position: absolute;
      top: 33px;
      left: 26px;
      font-size: 29px;
    }
    .change_password_line{
      position: absolute;
      top: 1px;
      left: 26px;
      width:580px;
      height:1px;
      background:#E8E8EA;
      z-index: 1000;
    }
  }
  .confirm_set_password{
    position: absolute;
    top: 640px;
    left: 34px;
    width: 572px;
    height: 94px;
    background-color: #fff;
    border-bottom: 1px solid #E8E8EA;
    input{
      width: 496px;
      height: 36px;
      position: absolute;
      top: 33px;
      left: 26px;
      font-size: 29px;
    }
    .change_password_line{
      position: absolute;
      top: 1px;
      left: 26px;
      width:580px;
      height:1px;
      background:#E8E8EA;
      z-index: 1000;
    }
  }
  .register_show_passage{
    width:38px;
    height: 22px;
    position: absolute;
    top: 584px;
    left: 550px;
    z-index: 1000;
  }
  .confirm_register_show_passage{
    width:38px;
    height: 22px;
    position: absolute;
    top: 678px;
    left: 550px;
    z-index: 1000;
  }
  .setpassword_confirm{
    position: absolute;
    top: 796px;
    width: 100%;
    height: 94px;
    text-align: center;
    button{
      width:589px;
      height:94px;
      font-size:27px;
      font-family:PingFang-SC-Regular;
      font-weight:Regular;
      margin: 0 auto;
      margin-top:33px;
      border-radius: 9px;
      cursor: pointer;
    }
    .forget_password_button{
      background: #E8E8EA;
      color: #333;
      cursor: pointer;
    }
    .ok_forget_password_button{
      background: #FF5100;
      color: #fff;
      cursor: pointer;
    }
  }
  .one_close{
    width:24px;
    height: 24px;
    position: absolute;
    top: 298px;
    left: 559px;
    z-index: 1000;
  }
  .two_close{
    width:24px;
    height: 24px;
    position: absolute;
    top: 392px;
    left: 407px;
    z-index: 1000;
  }
  .three_close{
    width:24px;
    height: 24px;
    position: absolute;
    top: 486px;
    left: 367px;
    z-index: 1000;
  }
  .four_close{
    width:24px;
    height: 24px;
    position: absolute;
    top: 580px;
    left: 499px;
    z-index: 1000;
  }
  .five_close{
    width:24px;
    height: 24px;
    position: absolute;
    top: 674px;
    left: 499px;
    z-index: 1000;
  }
}
</style>
