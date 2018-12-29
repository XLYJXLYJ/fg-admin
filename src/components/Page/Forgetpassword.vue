<template>
  <div>
    <VHead></VHead>
    <div class="change_password">
      <div class="me">
          <img src="../../assets/statistics_icon_back2@2x.png">
          <p>忘记密码</p>
      </div>
      <div class="get_identifying_code">
        <input type="text" placeholder="请输入您的手机号">
      </div>
      <div class="get_phone_identifying_code">
        <input type="text" placeholder="请输入您的验证码">
        <button>获取验证码</button>
      </div>
      <div class="set_password">
        <input type="text" placeholder="请输入6-16位字母和数字组合新密码">
      </div>
      <img src="../../assets/password_icon_eye@2x.png" class="register_show_passage">
      <div class="setpassword_confirm">
        <button>确定</button>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import foot from '@/components/foot'
import VHead from '@/components/header'
export default {
  name: 'Editpassage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    foot,
    VHead
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.change_password{
  width: 100%;
  height: 100%;
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
  .get_identifying_code{
    position: absolute;
    top: 260px;
    left: 34px;
    width: 572px;
    height: 94px;
    background-color: #fff;
    border-bottom: 1px solid #E8E8EA;
    input{
        width: 336px;
        height: 29px;
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
  .get_phone_identifying_code{
    position: absolute;
    top: 355px;
    left: 34px;
    width: 572px;
    height: 94px;
    background-color: #fff;
    border-bottom: 1px solid #E8E8EA;
    input{
        width: 336px;
        height: 29px;
        position: absolute;
        top: 33px;
        left: 26px;
        font-size: 29px;
    }
    button{
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
    top: 450px;
    left: 34px;
    width: 572px;
    height: 94px;
    background-color: #fff;
    border-bottom: 1px solid #E8E8EA;
    input{
        width: 496px;
        height: 29px;
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
    top: 492px;
    left: 550px;
  }
  .setpassword_confirm{
    position: absolute;
    top: 608px;
    width: 100%;
    height: 94px;
    text-align: center;
    button{
      width:589px;
      height:94px;
      font-size:27px;
      font-family:PingFang-SC-Regular;
      font-weight:Regular;
      color:#FF5100;
      margin: 0 auto;
      margin-top:33px;
      border-radius: 9px;
    }
  }
}
</style>
