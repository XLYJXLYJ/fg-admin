<template>
  <div>
    <VHead></VHead>
    <alert v-model="alert_show">{{error_type}}</alert>
    <div class="user" :class="{mask:ismask}">
      <div class="user_search">
        <span class="search_icon">
          <img src="../../assets/user_icon_search@2x.png" @click="SearchUser()">
          <input type="text" placeholder="请输入手机号查找会员" v-model="userText">
          <button @click="SearchUser()">搜索</button>
          <p @click="AlertUserSelect">{{whichPerson}}</p>
        </span>
      </div>
      <img src="../../assets/user_icon_tri.png" v-show="canvas_user_show">
      <div class="tab_class">
        <ul>
          <li><router-link to="/User/UserTime" class="tab_class_user">注册时间</router-link></li>
          <img src="../../assets/user_icon_screen1@2x.png" v-show="user_icon_screen1" @click="SwitchUserIcon1()">
          <img src="../../assets/user_icon_screen2@2x.png" v-show="user_icon_screen2" @click="SwitchUserIcon2()">
          <li @click="CloseSwitchUserIcon()"><router-link to="/User/UserNumber" class="tab_class_user mg40">团队总数</router-link></li>
          <li @click="CloseSwitchUserIcon()"><router-link to="/User/UserDirectly" class="tab_class_user mg80">直属</router-link></li>
        </ul> 
        <router-view></router-view>
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
      user_icon_screen1: true, // 图片1
      user_icon_screen2: false, // 图片2
      ismask: false // 遮罩层
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
      if (this.userText) {
        this.$router.push(`/User/UserTime/?osType=0&userText=` + this.userText)
      } else {
        this.error_type = '请输入手机号'
        this.alert_show = true
      }
    },
    // 时间顺序
    SwitchUserIcon1 () {
      this.user_icon_screen1 = false
      this.user_icon_screen2 = true
      this.$router.push(`/User/UserTime/?osType=0&sort=registAsc`)
    },
    // 时间倒叙
    SwitchUserIcon2 () {
      this.user_icon_screen1 = true
      this.user_icon_screen2 = false
      this.$router.push(`/User/UserTime/?osType=0&sort=registDesc`)
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
  opacity: 0.4;
  background: #999;
  z-index: 1000;
  pointer-events:none;
}
.canvas_user{
  width: 319px;
  height: 247px;
  background: #fff;
  position: absolute;
  top: 168px;
  left: 282px;
  z-index: 1000;
  ul{
    width: 100%;
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
  .user_search{
    position: fixed;
    top: 58px;
    left: 0px;
    width: 100%;
    height: 95px;
    z-index: 1000;
    background: #F5F5F5;
    z-index: 1000;
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
  img{
    width: 36px;
    height: 17px;
    position: absolute;
    top: 151px;
    left: 555px;
    z-index: 100;
  }
  .tab_class{
    margin-top: 167px;
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
      img{
        width:12px;
        height: 15px;
        position: absolute;
        left: 159px;
        top: 191px;
      }
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

