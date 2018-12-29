<template>
  <div>
    <VHead></VHead>
    <div class="me_center">
      <div class="me"><p>我的</p></div>
      <div class="edit_password">
        <p>修改密码</p>
        <button>修改</button>
        <div class="me_center_line"></div>
      </div>
      <div class="me_center_contract">
        <p>运营中心协议合同</p>
        <span>已生效</span>
        <img src="../../assets/statistics_icon_enter@2x.png">
      </div>
      <div class="logout">
        <p @click.native="doShowToast">退出登录</p>
      </div>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="showToast" class="dialog-demo">
        <div @click="showToast=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import foot from '@/components/foot'
import VHead from '@/components/header'
import { XDialog, TransferDomDirective as TransferDom } from 'vux'
export default {
  name: 'Statistics',
  data () {
    return {
      showToast: false
    }
  },
  directives: {
    TransferDom
  },
  methods: {
    doShowToast () {
      this.$vux.toast.show({
        text: 'toast'
      })
    }
  },
  components: {
    foot,
    VHead,
    XDialog
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
    }
    .me_center_line{
      position: relative;
      bottom: -94px;
      left: 26px;
      width:614px;
      height:1px;
      background:#E8E8EA;
      z-index: 1000;
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
    img{
      position: absolute;
      top: 35px;
      right: 26px;
      height: 23px;
      width:13px;
    }
  }
  .logout{
    position: absolute;
    top: 425px;
    width: 100%;
    height: 94px;
    background-color: #fff;
    p{
      width:112px;
      height:26px;
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
