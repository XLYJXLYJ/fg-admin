<template>
  <div>
    <VHead></VHead>
    <alert v-model="alert_show">{{error_type}}</alert>
    <div class="order">
      <p>订单</p>
      <div class="order_search">
        <span class="search_icon">
          <img src="../../assets/user_icon_search@2x.png">
          <input type="text" placeholder="请输入订单号搜索" v-model="orderText" @focus="SearchInput()" @blur="BlurSearch()">
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
import func from '@/common/func'
export default {
  name: 'Statistics',
  data () {
    return {
      orderText: '',
      searchOrder: true,
      alert_show: false, // 是否显示弹出框
      error_type: '', // 弹出框的弹出说明
    }
  },
  created () {
    let uid = localStorage.getItem('uid')
    if (!uid) {
      this.$router.push('Login')
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/Order') {
        // this.$router.push({name: 'PaymentOrder'})
      }
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
    BlurSearch () {
      if(!this.orderText){
        this.$router.push({name: 'PaymentOrder'})
      }
    },
    SearchOrder () {
      if (String.trim(this.orderText)) {
        let uType = localStorage.getItem('uType')
        func.ajaxGet(this.$store.state.baseUrl + '/account/auth/itoc/listOrderInfo?osType=0&tradeId=' + String.trim(this.orderText) + '&uType=' + uType,
        response => {
          if(response.data.code == 200){
            if(response.data.data.records.length !== 0){
              if (response.data.data.records[0].tkStatus === 13) {
                this.$router.push({name: 'LostOrder', params: {data: response.data.data.records}})
              } else if (response.data.data.records[0].tkStatus === 12) {
                this.$router.push({name: 'PaymentOrder', params: {data: response.data.data.records}})
              } else if (response.data.data.records[0].tkStatus === 3) {
                this.$router.push({name: 'ComfirmOrder', params: {data: response.data.data.records}})
              }
            }else{
              this.error_type = '该订单号不存在'
              this.alert_show = true
            }
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
  width: 640px;
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
    z-index: 500;
  }
  .order_search{
    position: fixed;
    top: 148px;
    width: 100%;
    height: 76px;
    background: #fff;
    z-index: 500;
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
        z-index: 500;
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
        -webkit-appearance: none;
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
    margin-top: 206px;
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
      z-index: 500;
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
          z-index: 500;
        }
      }
    }
  }
  .search_order{
    border: 1px solid red;
    height: 100px;
    width:100%;
    z-index: 500;
  }
}
</style>
