<template>
<div>
    <div class="order_detail">
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
      <infinite-loading @infinite="infiniteHandler"  :distance="200" ref="infiniteLoading">
        <span slot="no-more">
            我们是有底线的
        </span>
      </infinite-loading>
    </div>
</div>
</template>
<script>
import func from '@/common/func'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  data () {
    return {
      tkStatus: '',
      getComfirmOrderList: '',
      upUserCommission: '', // 上级收益
      adzoneName: '', // 订单名称
      createTime: '', // 创建时间
      noOrder: false,
      getGetUserDetailList: '',
      offset: 1
    }
  },
  mounted () {
    this.GetPayOrder()
  },
  methods: {
    GetPayOrder () {
      let uid = localStorage.getItem('uid')
      func.ajaxGet('http://47.107.48.61:8820/account/auth/itoc/listOrderInfo?osType=0&userId=' + uid + '&tkStatus=3' + '&page=' + this.offset,
      response => {
        if (response.data.data.records.length) {
          this.noOrder = false
          this.getGetUserDetailList = response.data.data.records
          if (this.offset === 1) {
            this.getGetUserDetailList = response.data.data.records
            //  this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          } else {
            this.getGetUserDetailList = this.getGetUserDetailList.concat(this.getGetUserDetailList) // 否则就把数据拼接
            //  this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          }
        } else {
          this.noOrder = true
        }
      })
    },
    // 下拉
    infiniteHandler () {
      console.log('加载了哦')
      this.offset = 1
      this.GetPayOrder()
    }
  },
  components: {
    InfiniteLoading
  }
}
</script>
<style lang="less" scoped>
.order_detail{
  width: 640px;
  height: auto;
  position: relative;
  border: 1px solid red;
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
      width:320px;
      height:172px;
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

