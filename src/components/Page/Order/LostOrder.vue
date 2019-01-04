<template>
<div>
    <div class="order_detail">
      <loading :show="show_loading" :text="text_loading" style="z-index:1000"></loading>
      <alert v-model="alert_show">{{error_type}}</alert>
      <div class="no_order" v-show="noOrder">
        <img src="../../../assets/order_icon_emptystate@2x.png">
        <p>很抱歉，没找到相关订单</p>
      </div>
        <ul v-show="!noOrder">
          <li v-for="(item, index) in getGetUserDetailList" :key="index.id">
              <p class="order_number">订单号：{{item.tradeId}}</p>
              <div class="order_contain">
                  <img :src="item.itemPic" alt="">
                  <p class="order_title">{{item.itemTitle}}</p>
                  <span class="order_time">创建日：{{item.createTime}}</span>
                  <span class="operation_enter">运营中心收益:￥{{item.agentUserCommission}}</span>
                  <span class="carrieroperator">运营商收益:￥{{item.superUserCommission}}</span>
                  <span class="one_income">一级收益:￥{{item.userCommission}}</span>
                  <span class="up_income">上级收益:￥{{item.upUserCommission}}</span>
                  <span class="one_belong">一级归属:{{item.userMobile}}</span>
                  <span class="two_belong">上级归属:{{item.upUserMobile}}</span>
                  <span class="three_belong">运营商:{{item.agentUserMobile}}</span>
              </div>
          </li>
        </ul>
    </div>
</div>
</template>
<script>
import func from '@/common/func'
// import store from '@/vuex/store'
export default {
  data () {
    return {
      tkStatus: '',
      GetLostOrderList: '',
      upUserCommission: '', // 上级收益
      adzoneName: '', // 订单名称
      createTime: '', // 创建时间
      noOrder: false,
      getGetUserDetailList: [],
      page: 0,
      alert_show: false, // 是否显示弹出框
      error_type: '', // 弹出框的弹出说明
      show_loading: false, // 是否显示加载框
      text_loading: '正在加载...' // 加载框显示文字
    }
  },
  watch: {
    $route (to, from) {
      // let oldValue = from.params.value
      // let newValue = to.params.value
      console.log(to)
      console.log(from)
      // if(oldValue !== newValue) {
      // }else{
      // }
    }
  },
  created () {
    var _this = this
    window.onscroll = function () {
      // 变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 变量windowHeight是可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 变量scrollHeight是滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      // 滚动条到底部的条件
      if (scrollTop + windowHeight === scrollHeight) {
      // 写后台加载数据的函数
        _this.GetLostOrder()
      }
    }
  },
  mounted () {
    if (this.$route.params.data) {
      this.getGetUserDetailList = this.$route.params.data
    } else {
      this.GetLostOrder()
    }
  },
  methods: {
    GetLostOrder () {
      this.show_loading = true
      this.page = this.page + 1
      let uid = localStorage.getItem('uid')
      func.ajaxGet(this.$store.state.baseUrl + '/account/auth/itoc/listOrderInfo?osType=0&userId=' + uid + '&tkStatus=13' + '&page=' + this.page,
      response => {
        if (response.data.data.records.length) {
          this.noOrder = false
          if (this.page === 1) {
            this.getGetUserDetailList = response.data.data.records
            this.show_loading = false
          } else {
            this.getGetUserDetailList = this.getGetUserDetailList.concat(response.data.data.records)
            this.show_loading = false
          }
        } else {
          if (this.page === 1) {
            this.noOrder = true
            this.show_loading = false
          } else {
            this.error_type = '已显示全部订单'
            this.alert_show = true
            this.show_loading = false
          }
        }
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
  .no_order{
    width: 100%;
    min-height:400px;
    position: relative;
    img{
      position: absolute;
      top: 142px;
      left: 214px;
      width:212px;
      height:172px;
    }
    p{
      position: absolute;
      top: 350px;
      left: 190px;
      padding-top:3px;
      width:320px;
      height:32px;
      font-size: 22px;
      color: #666;
      font-family:PingFang-SC-Regular;
      font-weight:Regular;
    }
  }
  ul{
    width: 100%;
    min-height:400px;
    position: relative;
    margin-top: 90px;
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
                color:#999999;
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
                color:#999999;
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
                color:#999999;
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
                color:#999999;
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
                color:#999999;
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
                color:#999999;
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
                color:#999999;
                position: absolute;
                bottom: 20px;
                left: 400px;
            }
        }
    }
  }
}
</style>

