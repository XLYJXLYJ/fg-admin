<template>
  <div>
    <VHead></VHead>
    <alert v-model="alert_show">{{error_type}}</alert>
    <div :class="{mask:ismask}">
      <div class="user">
        <div class="user_search">
          <span class="search_icon">
            <img src="../../assets/user_icon_search@2x.png" @click.stop.prevent="SearchUser()">
            <input type="text" placeholder="请输入手机号查找会员" v-model="userText" @focus="SearchUserInput()">
            <button @click.stop.prevent="SearchUser()">搜索</button>
            <p @click="AlertUserSelect">{{whichPerson}}</p>
          </span>
        </div>
        <img src="../../assets/user_icon_tri.png" v-show="canvas_user_show" class="img_tri">
        <div class="tab_class">
          <ul>
            <li><router-link to="/User/UserTime" class="tab_class_user">注册时间</router-link></li>
            <li @click="CloseSwitchUserIcon()"><router-link to="/User/UserNumber" class="tab_class_user mg40">团队总数</router-link></li>
            <li @click="CloseSwitchUserIcon()"><router-link to="/User/UserDirectly" class="tab_class_user mg80">直属</router-link></li>
          </ul> 
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div class="canvas_user" v-show="canvas_user_show">
      <ul>
        <li @click="GetAllPerson()">全部会员</li>
        <li @click="GetSecondPerson()" style="border-top: 1px solid #E8E8EA;border-bottom: 1px solid #E8E8EA;">钻石会员</li>
        <li @click="GetThreePerson()">运营商</li>
      </ul>
    </div>
    <foot></foot>
  </div>
</template>

<script>
// import store from '@/vuex/store'
import foot from '@/components/foot'
import VHead from '@/components/header'
export default {
  name: 'Statistics',
  data () {
    return {
      alert_show: false, // 是否显示弹出框
      error_type: '', // 弹出框的弹出说明
      canvas_user_show: false, // 默认关闭选择框
      whichPerson: '全部会员', // 全部会员
      userText: '', // 搜索的内容
      ismask: false // 遮罩层
    }
  },
  created () {
    let uid = localStorage.getItem('uid')
    if (uid) {
      this.$router.push('Login')
    }
  },
  mounted () {
    this.$router.push({name: 'UserTime'})
  },
  methods: {
    // 弹出提示框
    AlertUserSelect () {
      this.canvas_user_show = !this.canvas_user_show
      this.ismask = !this.ismask
    },
    SearchUserInput () {
      this.$router.push({name: 'User'})
    },
    // 查找全部用户
    GetAllPerson () {
      this.$store.state.userType = 0
      this.whichPerson = '全部会员'
      this.canvas_user_show = false
      this.ismask = false // 关闭遮罩层
    },
    // 查找钻石用户
    GetSecondPerson () {
      this.$store.state.userType = 1
      this.whichPerson = '钻石会员'
      this.canvas_user_show = false
      this.ismask = false // 关闭遮罩层
    },
    // 查找运营商用户
    GetThreePerson () {
      this.$store.state.userType = 2
      this.whichPerson = '运营商'
      this.canvas_user_show = false
      this.ismask = false // 关闭遮罩层
    },
    // 查找用户
    SearchUser () {
      console.log('搜索')
      if (this.userText) {
        var data = this.userText
        console.log('搜索1')
        this.$router.push({name: 'UserTime', params: {data: data}})
      } else {
        this.error_type = '请输入手机号'
        this.alert_show = true
      }
    },
    // 关闭时间小图标选中状态
    CloseSwitchUserIcon () {
      this.user_icon_screen1 = true
      this.user_icon_screen2 = false
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
.mask{
  width: 640px;
  min-height: 640px;
  opacity: 0.6;
  background: rgba(0, 0, 0, 0.6)!important;
  z-index: 1000!important;

}
.canvas_user{
  width: 319px;
  height: 247px;
  background: #fff;
  position: fixed;
  top: 168px;
  z-index: 1000;
  margin-left: 282px;
  ul{
    width: 319px;
    height: 100%;
    text-align: center;
    li{
      height: 54px;
      width: 100%;
      font-size: 29px;
      color:#000;
      font-family:PingFang-SC-Regular;
      font-weight:Regular;
      padding-top:28px;
    }
  }
}
.user{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #F5F5F5;
  width: 100%;
  .img_tri{
    width: 36px;
    height: 17px;
    position: fixed;
    top: 151px;
    margin-left: 525px;
    z-index: 2000;
  }
  .user_search{
    position: fixed;
    top: 58px;
    width:640px;
    height: 95px;
    margin: 0 auto;
    display: table-cell;
    vertical-align: middle;
    z-index: 1000;
    padding-top: 20px;
    background: #F5F5F5;
    margin-bottom: 6px;
    .search_icon{
      width: 439px;
      height: 55px;
      position: absolute;
      left: 20px;
      top: 34px;
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
        -webkit-appearance: none;
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
        height: 56px;
        position: absolute;
        left: 488px;
        top: 16px;
        font-size: 24px;
        color: #333;
        font-family:PingFang-SC-Regular;
        font-weight:Regular;
        letter-spacing:2px;
        padding-top: 4px;
      }
    }
  }
  .tab_class{
    margin-top: 148px;
    margin-bottom: 67px;
    flex: 1;
    width: 640px;
    ul{
      width:640px;
      height: 77px;
      margin: 0 auto;
      display: table-cell;
      vertical-align: middle;
      text-align: center; 
      position: fixed;
      z-index: 1000;
      padding-top: 20px;
      background: #F5F5F5;
      li{
        float: left;
        width:200px;
        height: 42px;
        font-size:24px;
        font-family:PingFang-SC-Regular;
        font-weight:bold;
        line-height:31px;
        padding-top:14px;
        a{
          color:#333;
        }
        .router-link-active{
          color:#FF5100!important;
        }
      }
    }
  }
}
</style>

