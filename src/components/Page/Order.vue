<template>
  <div>
    <VHead></VHead>
    <div class="order">
      <p>订单</p>
      <div class="order_search">
        <span class="search_icon">
          <img src="../../assets/user_icon_search@2x.png">
          <input type="text" placeholder="请输入订单号搜索" v-model="orderText" @focus="SearchInput()">
          <button @click="SearchOrder()">搜索</button>
        </span>
      </div>
      <div class="tab_class">
        <!-- <ul v-show = '$store.state.have_order'> -->
        <ul>
          <li><router-link to="/Order/PaymentOrder" class="tab_class_order">已支付订单</router-link></li>
          <li><router-link to="/Order/ComfirmOrder" class="tab_class_order">确认结算订单</router-link></li>
          <li><router-link to="/Order/LostOrder" class="tab_class_order">已失效订单</router-link></li>
        </ul> 
        <router-view></router-view>
      </div>
      <!-- <div class="search_order">
        <ul v-show="searchOrder">
          <li>
              <p class="order_number">订单号：{{tradeId}}</p>
              <div class="order_contain">
                  <img :src="itemPic" alt="">
                  <p class="order_title">{{itemTitle}}</p>
                  <span class="order_time">创建日：{{createTime}}</span>
                  <span class="operation_enter">运营中心收益:￥{{agentUserCommission}}</span>
                  <span class="carrieroperator">运营商收益:￥{{superUserCommission}}</span>
                  <span class="one_income">一级收益:￥{{userCommission}}</span>
                  <span class="up_income">上级收益:￥{{upUserCommission}}</span>
                  <span class="one_belong">一级归属:{{userMobile}}</span>
                  <span class="two_belong">上级归属:{{upUserMobile}}</span>
                  <span class="three_belong">运营商:{{agentUserMobile}}</span>
              </div>
          </li>
        </ul>
      </div> -->
    </div>
    <foot></foot>
  </div>
</template>

<script>
import foot from '@/components/foot'
import VHead from '@/components/header'
import func from '@/common/func'
export default {
  name: 'Statistics',
  data () {
    return {
      orderText: '',
      searchOrder: true
    }
  },
  mounted () {
    this.$router.push({name: 'PaymentOrder'})
  },
  methods: {
    onItemClick (index) {
      console.log('on item click:', index)
    },
    SearchInput () {
      this.$router.push({name: 'Order'})
    },
    SearchOrder () {
      if (String.trim(this.orderText)) {
        func.ajaxGet('/account/auth/itoc/listOrderInfo?osType=0&tradeId=' + String.trim(this.orderText),
        response => {
          let tkStatus = response.data.data.records[0].tkStatus
          let data = response.data.data.records
          if (tkStatus === 13) {
            this.$router.push({name: 'LostOrder', params: {data: data}})
          } else if (tkStatus === 12) {
            this.$router.push({name: 'PaymentOrder', params: data})
          } else if (tkStatus === 3) {
            this.$router.push({name: 'ComfirmOrder', params: data})
          } else {
            this.error_type = '该订单号不存在'
            this.alert_show = true
          }
        })
        // this.$router.push(`/Order/ComfirmOrder/?osType=0&orderText=` + this.orderText)
      } else {
        this.error_type = '请输入订单号'
        this.alert_show = true
      }
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
.order{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #F5F5F5;
  width: 100%;
  p{
    position: fixed;
    top: 64px;
    padding-left: 292px;
    width:100%;
    height:98px;
    font-size:29px;
    font-family:PingFang-SC-Medium;
    font-weight:bold;
    color:#333333;
    padding-top: 24px;
    background: #fff;
    z-index: 1000;
  }
  .order_search{
    position: fixed;
    top: 148px;
    left: 0px;
    width: 100%;
    height: 75px;
    background: #fff;
    z-index: 1000;
    .search_icon{
      width: 439px;
      height: 55px;
      position: absolute;
      left: 20px;
      top: 0px;
      img{
        width:24px;
        height: 25px;
        position: absolute;
        left: 20px;
        top: 14px;
        z-index: 1000;
      }
      input{
        width:426px;
        height: 54px;
        position: absolute;
        left: 0px;
        top: 0px;
        background: #F5F5F5;
        border-radius: 27px 0px 0px 27px;
        border: 1px solid red;
        padding-left: 57px;
      }
      button{
        width:116px;
        height: 55px;
        position: absolute;
        left: 483px;
        top: 0px;
        background: #FF5100;
        border-radius: 0px 27px 27px 0px;
        font-size: 24px;
        color: #fff;
        font-family:PingFang-SC-Regular;
        font-weight:Regular;
      }
    }
  }
  .tab_class{
    margin-top: 205px;
    margin-bottom: 67px;
    flex: 1;
    width: 100%;
    ul{
      width:640px;
      height: 87px;
      margin: 0 auto;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      background: #fff; 
      position: fixed;
      z-index: 1000;
      li{
        float: left;
        width:200px;
        height: 62px;
        font-size:24px;
        font-family:PingFang-SC-Regular;
        font-weight:bold;
        color:#333;
        line-height:31px;
        padding-top:34px;
        a{
          color:#333;
        }
        .router-link-active{
          color:#FF5100!important;
        }
        .router-link-active:after{
          content:' ';
          display:block;
          width:68px;
          padding-bottom: 20px;
          border-bottom: 5px solid #FF5100;
          margin: 0 auto;
          z-index: 1000;
        }
      }
    }
  }
  .search_order{
    border: 1px solid red;
    height: 100px;
    width:100%;
    z-index: 1000;
  }
}
</style>
