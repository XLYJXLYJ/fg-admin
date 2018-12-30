<template>
<div>
    <div class="order_detail">
        <ul>
            <li v-for="(item, index) in getComfirmOrderList" :key="index">
                <p class="order_number">订单号：305769570069360624</p>
                <div class="order_contain">
                    <img src="../../../assets/user_icon_search@2x.png" alt="">
                    <p class="order_title">{{adzoneName}}</p>
                    <span class="order_time">创建日：{{createTime}}</span>
                    <span class="operation_enter">运营中心收益:￥0.00</span>
                    <span class="carrieroperator">运营商收益:￥0.00</span>
                    <span class="one_income">一级收益:￥0.00</span>
                    <span class="up_income">上级收益:￥{{upUserCommission}}</span>
                    <span class="one_belong">一级归属:13189630598</span>
                    <span class="two_belong">二级归属:13189630598</span>
                    <span class="three_belong">三级归属:13189630598</span>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import func from '@/common/func'
export default {
  data () {
    return  {
      tkStatus: '',
      getComfirmOrderList:'',
      upUserCommission: '', // 上级收益
      adzoneName: '', // 订单名称
      createTime: '' // 创建时间
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/Order/PaymentOrder') {
        this.GetPayOrder()
      } else if (to.path === '/Order/ComfirmOrder') {
        this.GetComfirmOrder()
      } else {
        this.GetLostOrder()
      }
    },
    listenUserType: function () {
      let uid = localStorage.getItem('uid')
      func.ajaxGet('http://47.107.48.61:8830/relation/auth/itocList?uid=' + uid + '&userType=' + this.$store.state.userType,
        response => {
          this.getGetUserDetailList = response.data.data.records
        })
    },
    '$route.path': function () {
      this.orderText = this.$route.params.orderText
      if (this.orderText) {
        func.ajaxGet('http://47.107.48.61:8830/relation/auth/itocList?&tradeId=' + this.orderText,
        response => {
          this.getGetUserDetailList = response.data.data.records
        })
      }
    }
  },
  computed: {
    listenUserType () {
      return this.$store.state.userType
    }
  },
  mounted () {
    this.GetComfirmOrder()
  },
  methods: {
     GetPayOrder () {
      let uid = localStorage.getItem('uid')
      func.ajaxGet('http://47.107.48.61:8870/auth/itoc/listOrderInfo?userId=' + uid + '&tkStatus=12',
      response => {
        this.getComfirmOrderList = response.data.data.records
      })
    },
    GetComfirmOrder () {
      let uid = localStorage.getItem('uid')
      func.ajaxGet('http://47.107.48.61:8870/auth/itoc/listOrderInfo?userId=' + uid + '&tkStatus=14',
      response => {
        this.getComfirmOrderList = response.data.data.records
      })
    },
    GetLostOrder () {
      let uid = localStorage.getItem('uid')
      func.ajaxGet('http://47.107.48.61:8870/auth/itoc/listOrderInfo?userId=' + uid + '&tkStatus=13',
      response => {
        this.getComfirmOrderList = response.data.data.records
      })
    }
  }
}
</script>
<style lang="less" scoped>
.order_detail{
  width: 640px;
  height: auto;
  position: relative;
  ul{
    width: 100%;
    min-height:400px;
    position: relative;
    li{
        width: 100%;
        height: 231px;
        background: #fff;
        margin-top: 17px;
        position: relative;
        .order_number{
            width:348px;
            height:26px;
            font-size:20px;
            font-family:PingFang-SC-Regular;
            font-weight:bold;
            color:#666;
            line-height:31px;
            position: absolute;
            top: 20px;
            left: 20px;
        }
        .order_detail_line{
            width:599px;
            height:1px;
            position: absolute;
            top: 50px;
            left: 20px;
            background-color: #E8E8EA;
        }
        .order_contain{
            width:599px;
            height:170px;
            position: absolute;
            top: 60px;
            left: 20px;
            border-top: 1px solid #E8E8EA;
            img{
                width:77px;
                height:77px;
                border-radius:9px;
                position: absolute;
                top: 20px;
                left: 0px;
            }
            .order_title{
                width:471px;
                height:54px;
                font-size:24px;
                font-family:PingFang-SC-Regular;
                font-weight:bold;
                color:#333;
                position: absolute;
                top: 20px;
                left: 88px;
                line-height:28px;
            }
            .order_time{
                width:296px;
                height:15px;
                font-size:15px;
                font-family:PingFang-SC-Regular;
                font-weight:bold;
                color:#999;
                position: absolute;
                top: 82px;
                left: 88px;
            } 
            .operation_enter{
                width:200px;
                height:16px;
                font-size:15px;
                font-family:PingFang-SC-Regular;
                font-weight:Regular;
                color:#333;
                position: absolute;
                top: 109px;
                left: 0px;
            }
            .carrieroperator{
                width:200px;
                height:16px;
                font-size:15px;
                font-family:PingFang-SC-Regular;
                font-weight:Regular;
                color:#333;
                position: absolute;
                top: 109px;
                left: 164px;
            }
            .one_income{
                width:180px;
                height:16px;
                font-size:15px;
                font-family:PingFang-SC-Regular;
                font-weight:Regular;
                color:#333;
                position: absolute;
                top: 109px;
                left: 312px;
            }
            .up_income{
                width:140px;
                height:16px;
                font-size:15px;
                font-family:PingFang-SC-Regular;
                font-weight:Regular;
                color:#333;
                position: absolute;
                top: 109px;
                left: 440px;
            }
            .one_belong{
                width:210px;
                height:16px;
                font-size:15px;
                font-family:PingFang-SC-Regular;
                font-weight:Regular;
                color:#333;
                position: absolute;
                bottom: 20px;
                left: 0px;
            }
            .two_belong{
                width:210px;
                height:16px;
                font-size:15px;
                font-family:PingFang-SC-Regular;
                font-weight:Regular;
                color:#333;
                position: absolute;
                bottom: 20px;
                left: 200px;
            }
            .three_belong{
                width:210px;
                height:16px;
                font-size:15px;
                font-family:PingFang-SC-Regular;
                font-weight:Regular;
                color:#333;
                position: absolute;
                bottom: 20px;
                left: 400px;
            }
        }
    }
  }
}
</style>

