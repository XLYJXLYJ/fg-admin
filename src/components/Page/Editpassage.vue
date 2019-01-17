<template>
  <div>
    <VHead></VHead>
    <div class="setpassword_center">
      <div class="me">
          <img src="../../assets/statistics_icon_back2@2x.png">
          <p>修改密码</p>
      </div>
      <div class="account">
        <p>账号：135****0365</p>
        <div class="setpassword_center_line"></div>
      </div>
      <div class="get_identifying_code">
        <input type="text" placeholder="请输入图形验证码">
        <img src="">
        <div class="setpassword_center_line"></div>
      </div>
      <div class="get_phone_identifying_code">
        <input type="text" placeholder="请输入验证码">
        <button>获取验证码</button>
        <div class="setpassword_center_line"></div>
      </div>
      <div class="set_password">
        <input type="text" placeholder="请输入6-16位字母和数字组合新密码">
        <div class="setpassword_center_line"></div>
      </div>
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
.setpassword_center{
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
  .account{
    position: absolute;
    top: 166px;
    width: 100%;
    height: 94px;
    background-color: #fff;
    p{
      width: 290px;
      height: 27px;
      position: absolute;
      top: 33px;
      left: 26px;
      color: #333;
      font-size: 29px;
      font-family: PingFang-SC-Regular;
      font-weight: Regular;
    }
    .setpassword_center_line{
      position: relative;
      top: 94px;
      left: 26px;
      width:614px;
      height:1px;
      background:#E8E8EA;
      z-index: 1000;
    }
  }
  .get_identifying_code{
    position: absolute;
    top: 260px;
    width: 100%;
    height: 94px;
    background-color: #fff;
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
    .setpassword_center_line{
      position: relative;
      top: 94px;
      left: 26px;
      width:614px;
      height:1px;
      background:#E8E8EA;
      z-index: 1000;
    }
  }
  .get_phone_identifying_code{
    position: absolute;
    top: 354px;
    width: 100%;
    height: 94px;
    background-color: #fff;
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
    .setpassword_center_line{
      position: relative;
      top: 94px;
      left: 26px;
      width:614px;
      height:1px;
      background:#E8E8EA;
      z-index: 1000;
    }
  }
  .set_password{
    position: absolute;
    top: 448px;
    width: 100%;
    height: 94px;
    background-color: #fff;
    input{
        width: 496px;
        height: 29px;
        position: absolute;
        top: 33px;
        left: 26px;
        font-size: 29px;
    }
    .setpassword_center_line{
      position: absolute;
      top: 1px;
      left: 26px;
      width:614px;
      height:1px;
      background:#E8E8EA;
      z-index: 1000;
    }
  }
  .setpassword_confirm{
    position: absolute;
    top: 613px;
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
