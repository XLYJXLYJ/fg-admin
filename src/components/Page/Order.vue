<template>
  <div>
    <VHead></VHead>
    <div class="order">
      <p>订单</p>
      <div class="order_search">
        <span class="search_icon">
          <img src="../../assets/user_icon_search@2x.png">
          <input type="text" placeholder="请输入订单号搜索" v-model="orderText">
          <button @click="SearchOrder()">搜索</button>
        </span>
      </div>
      <div class="tab_class">
        <ul>
          <li><router-link to="/Order/PaymentOrder" class="tab_class_order">已支付订单</router-link></li>
          <li><router-link to="/Order/ComfirmOrder" class="tab_class_order">确认结算订单</router-link></li>
          <li><router-link to="/Order/LostOrder" class="tab_class_order">已失效订单</router-link></li>
        </ul> 
        <router-view></router-view>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import foot from '@/components/foot'
import VHead from '@/components/header'
export default {
  name: 'Statistics',
  data () {
    return {
      orderText:''
    }
  },
  methods: {
    onItemClick (index) {
      console.log('on item click:', index)
    },
    SearchUser () {
      if (this.orderText) {
        this.$router.push(`/Order/ComfirmOrder/?orderText=` + this.orderText)
      } else {
        this.error_type = '请输入手机号'
        this.alert_show = true
      }
    },
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
    position: absolute;
    top: 98px;
    left: 292px;
    width:60px;
    height:28px;
    font-size:29px;
    font-family:PingFang-SC-Medium;
    font-weight:bold;
    color:#333333;
  }
  .order_search{
    position: absolute;
    top: 150px;
    left: 0px;
    width: 100%;
    height: 55px;
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
    margin-top: 225px;
    margin-bottom: 67px;
    flex: 1;
    width: 640px;
    ul{
      width:600px;
      height: 57px;
      margin: 0 auto;
      display: table-cell;
      vertical-align: middle;
      text-align: center; 
      li{
        float: left;
        width:200px;
        height: 42px;
        font-size:24px;
        font-family:PingFang-SC-Regular;
        font-weight:bold;
        color:#333;
        line-height:31px;
        padding-top:14px;
      }
    }
  }
}
</style>
