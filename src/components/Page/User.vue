<template>
  <div>
    <VHead></VHead>
    <div class="user">
      <p>用户</p>
      <div class="user_search">
        <span class="search_icon">
          <img src="../../assets/user_icon_search@2x.png" alt="">
          <input type="text" placeholder="请输入手机号查找会员">
          <button>搜索</button>
          <p>全部会员</p>
        </span>
      </div>
      <div class="tab_class">
        <ul>
          <li><router-link to="/user/Paymentuser" class="tab_class_user">注册时间</router-link></li>
          <li><router-link to="/user/Comfirmuser" class="tab_class_user mg40">团队总数</router-link></li>
          <li><router-link to="/user/Lostuser" class="tab_class_user mg80">直属</router-link></li>
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
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onItemClick (index) {
      console.log('on item click:', index)
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
.mg40{
  margin-left: 40px;
}
.mg80{
  margin-left: 80px;
}
.user{
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
  .user_search{
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
        width:279px;
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
        height: 58px;
        position: absolute;
        left: 337px;
        top: -1px;
        background: #FF5100;
        border-radius: 0px 27px 27px 0px;
        font-size: 24px;
        color: #fff;
        font-family:PingFang-SC-Regular;
        font-weight:Regular;
      }
      p{
        width:116px;
        height: 55px;
        position: absolute;
        left: 488px;
        top: 18px;
        font-size: 24px;
        color: #333;
        font-family:PingFang-SC-Regular;
        font-weight:Regular;
        letter-spacing:2px;
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
        a{
          color:#333;
        }
      }
    }
  }
}
</style>

