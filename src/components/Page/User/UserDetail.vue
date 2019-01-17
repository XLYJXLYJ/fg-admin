<template>
<div>
    <loading :show="show_loading" :text="text_loading" style="z-index:1000"></loading>
    <alert v-model="alert_show">{{error_type}}</alert>
    <div class="user_search">
      <span class="search_icon">
        <img src="../../../assets/user_icon_search@2x.png" @click.stop.prevent="GetUsertext()">
        <input type="text" placeholder="请输入手机号查找会员" v-model="userText">
        <button @click.stop.prevent="GetUsertext()">搜索</button>
      </span>
    </div>
    <div class="user_detail">
      <div class="img_time" v-show="user_icon_screen1" @click="SwitchUserIcon1()"><p style="opacity: 0;z-index:1000">注册时间</p><img src="../../../assets/user_icon_screen1@3x.png"></div>
      <div class="img_time" v-show="user_icon_screen2" @click="SwitchUserIcon2()"><p style="opacity: 0;z-index:1000">注册时间</p><img src="../../../assets/user_icon_screen2@2x.png"></div>
      <div class="no_user" v-show="noUser">
        <img src="../../../assets/user_icon_emptystate@2x.png">
        <p>您还没有会员，继续加油哦~</p>
      </div>
      <ul v-show="!noUser">
          <li v-for="item in getGetUserDetailList" :key='item.userId'>
              <router-link :to="{name: 'UserDetailOne',params: { userid: item.userId}}">
                  <div class="user_contain">
                      <div v-if="item.headImg == null">
                        <img class="user_contain_headimg" src="../../../assets/community_picture@2x.png">
                      </div>
                      <div v-else>
                        <img class="user_contain_headimg" :src="item.headImg">
                      </div>
                      <p class="user_title">{{item.mobile}}</p>
                      <div v-if="item.userType == 0">
                        <p class="grade_level_img p_img">普通会员</p>
                      </div>
                      <div v-if="item.userType == 1">
                        <img class="grade_level_img" src="../../../assets/user_icon_screen@2x.png">
                      </div>
                      <div v-if="item.userType == 2">
                        <img class="grade_level_img" src="../../../assets/user_icon_diamondmembers@2x.png">
                      </div>
                      <div v-if="item.userType == 3">
                        <img class="grade_level_img" src="../../../assets/myteam_icon_operationcenter@2x.png">
                      </div>
                      <span class="user_name">{{item.nickname}}</span>
                      <span class="user_time">{{item.creatTime}}</span>
                      <span class="user_up">上级：{{item.upMobile}}</span>
                      <span class="user_recommend">推荐：<span>{{item.referCount}}</span></span>
                      <span class="user_direc">直属：<span>{{item.underCount}}</span></span>
                      <span class="user_carrieroperator">运营商：<span>{{item.agentCount}}</span></span>
                  </div>
              </router-link>
          </li>
      </ul>
    </div>
</div>
</template>
<script>
import func from '@/common/func'
import foot from '@/components/foot'
import VHead from '@/components/header'
// import store from '@/vuex/store'
export default {
  data () {
    return {
      getGetUserDetailList: [], // 循环数组
      userText: '', // 搜索的内容
      sort: 'registAsc', // 时间排序
      noUser: '',
      pageDetail: 1, // 注册时间页数
      pageDetailNumber: 1, // 团队总数页数
      pageDetailDirectly: 1, // 直属总数页数
      pageuserType: 1, // 会员类型页数
      user_icon_screen1: true, // 图片1
      user_icon_screen2: false, // 图片2
      alert_show: false, // 是否显示弹出框
      error_type: '', // 弹出框的弹出说明
      show_loading: false, // 是否显示加载框
      text_loading: '正在加载...', // 加载框显示文字
      stopPageDetail: 1000000, // 停止注册时间加载页数
      stopPageDetailNumber: 1000000, // 停止团队总数加载页数
      stopPageDetailDirectly: 1000000 // 停止直属加载页数
    }
  },
  computed: {
    listenUserType () {
      return this.$store.state.userType
    }
  },
  watch: {
    // 检测跳转了哪一个路由，就初始加载哪一个函数
    $route (to, from) {
      if (to.path === '/User/UserTime') {
        this.pageDetail = 1
        this.getGetUserDetailList = []
        this.GetUserDetail()
      } else if (to.path === '/User/UserNumber') {
        this.pageDetailNumber = 1
        this.getGetUserDetailList = []
        this.GetUserDetailNumber()
      } else {
        this.pageDetailDirectly = 1
        this.getGetUserDetailList = []
        this.GetUserDetailDirectly()
      }
    },
    // 检测选择选择的会员类型，对list进行重新加载
    listenUserType: function () {
      if (this.$route.path === '/User/UserTime') {
        this.pageDetail = 1
        this.getGetUserDetailList = []
        this.GetUserDetail()
      } else if (this.$route.path === '/User/UserNumber') {
        this.pageDetailNumber = 1
        this.getGetUserDetailList = []
        this.GetUserDetailNumber()
      } else if (this.$route.path === '/User/UserDirectly') {
        this.pageDetailDirectly = 1
        this.getGetUserDetailList = []
        this.GetUserDetailDirectly()
      }
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
      if (scrollTop + windowHeight === scrollHeight && scrollTop !== 0) {
      // 写后台加载数据的函数
        if (_this.$route.path === '/User/UserTime') {
          _this.pageDetail = _this.pageDetail + 1
          if (_this.pageDetail > _this.stopPageDetail) {
            _this.error_type = '已显示全部数据'
            _this.alert_show = true
          } else {
            _this.GetUserDetail()
          }
        } else if (_this.$route.path === '/User/UserNumber') {
          _this.pageDetailNumber = _this.pageDetailNumber + 1
          if (_this.pageDetailNumber > _this.stopPageDetailNumber) {
            _this.error_type = '已显示全部数据'
            _this.alert_show = true
          } else {
            _this.GetUserDetailNumber()
          }
        } else if (_this.$route.path === '/User/UserDirectly') {
          _this.pageDetailDirectly = _this.pageDetailDirectly + 1
          if (_this.pageDetailDirectly > _this.stopPageDetailDirectly) {
            _this.error_type = '已显示全部数据'
            _this.alert_show = true
          } else {
            _this.GetUserDetailDirectly()
          }
        }
      }
    }
  },
  mounted () {
    // console.log(this.$route.params)
    // this.userText = this.$route.params.data
    // if (this.userText) {
    //   console.log(22222222222)
    //   this.getGetUserDetailList = []
    //   this.GetUsertext()
    // } else {
    //   this.GetUserDetail()
    // }
    this.getGetUserDetailList = []
    this.GetUserDetail()
  },
  methods: {
    // 注册时间
    GetUserDetail () {
      this.show_loading = true
      let uid = localStorage.getItem('uid')
      var uType = localStorage.getItem('uType')
      func.ajaxGet(this.$store.state.baseUrl + '/user/relation/auth/itocList?osType=0&uid=' + uid + '&sort=' + this.sort + '&page=' + this.pageDetail + '&userType=' + this.$store.state.userType + '&uType=' + uType,
        response => {
          if (response.data.code === 200 & response.data.data.records.length !== 0) {
            this.noOrder = false
            if (this.pageDetail === 1) {
              this.getGetUserDetailList = response.data.data.records
              this.show_loading = false
            } else {
              this.getGetUserDetailList = this.getGetUserDetailList.concat(response.data.data.records)
              this.show_loading = false
            }
          } else if (response.data.code === 401) {
              this.error_type = '登录超时，请重新登录'
              this.alert_show = true
              setTimeout(() => {this.$router.push('Login')}, 1500);
            } else {
            if (this.pageDetail === 1) {
              this.noOrder = true
              this.show_loading = false
              this.getGetUserDetailList = []
            } else {
              this.stopPageDetail = this.pageDetail
              this.error_type = '已显示全部数据'
              this.alert_show = true
              this.show_loading = false
            }
          }
        })
    },
    // 团队总数
    GetUserDetailNumber () {
      this.show_loading = true
      let uid = localStorage.getItem('uid')
      var uType = localStorage.getItem('uType')
      func.ajaxGet(this.$store.state.baseUrl + '/user/relation/auth/itocList?osType=0&sort=teamDesc&uid=' + uid + '&page=' + this.pageDetailNumber + '&userType=' + this.$store.state.userType + '&uType=' + uType,
        response => {
          if (response.data.code === 200 & response.data.data.records.length !== 0) {
            this.noOrder = false
            if (this.pageDetailNumber === 1) {
              this.getGetUserDetailList = response.data.data.records
              this.show_loading = false
            } else {
              this.getGetUserDetailList = this.getGetUserDetailList.concat(response.data.data.records)
              this.show_loading = false
            }
          } else {
            if (this.pageDetailNumber === 1) {
              this.noOrder = true
              this.show_loading = false
              this.getGetUserDetailList = []
            } else {
              this.stopPageDetailNumber = this.pageDetailNumber
              this.error_type = '已显示全部数据'
              this.alert_show = true
              this.show_loading = false
            }
          }
        })
    },
    // 直属
    GetUserDetailDirectly () {
      this.show_loading = true
      let uid = localStorage.getItem('uid')
      let uType = localStorage.getItem('uType')
      func.ajaxGet(this.$store.state.baseUrl + '/user/relation/auth/itocList?osType=0&sort=underDesc&uid=' + uid + '&page=' + this.pageDetailDirectly + '&userType=' + this.$store.state.userType + '&uType=' + uType,
        response => {
          if (response.data.code === 200 & response.data.data.records.length !== 0) {
            this.noOrder = false
            if (this.pageDetailDirectly === 1) {
              this.getGetUserDetailList = response.data.data.records
              this.show_loading = false
            } else {
              this.getGetUserDetailList = this.getGetUserDetailList.concat(response.data.data.records)
              this.show_loading = false
            }
          } else {
            if (this.pageDetailDirectly === 1) {
              this.noOrder = true
              this.show_loading = false
              this.getGetUserDetailList = []
            } else {
              this.stopPageDetailDirectly = this.pageDetailDirectly
              this.error_type = '已显示全部数据'
              this.alert_show = true
              this.show_loading = false
            }
          }
        })
    },
    // 手机号查询
    GetUsertext () {
      this.show_loading = true
      let uid = localStorage.getItem('uid')
      let uType = localStorage.getItem('userType')
      this.userText = this.userText
      func.ajaxGet(this.$store.state.baseUrl + '/user/relation/auth/itocList?osType=0&mobile=' + this.userText + '&uid=' + uid + '&uType=' + uType,
        response => {
          if (response.data.data.records.length) {
            this.getGetUserDetailList = response.data.data.records
            this.show_loading = false
          } else {
            // this.noUser = true
            this.show_loading = false
            this.error_type = '找不到该会员信息'
            this.alert_show = true
          }
        })
    },
    // 时间顺序
    SwitchUserIcon1 () {
      this.user_icon_screen1 = false
      this.user_icon_screen2 = true
      this.sort = 'registAsc'
      this.getGetUserDetailList = []
      this.pageDetail = 1
      this.$router.push({name: 'UserTime'})
      this.GetUserDetail()
    },
    // 时间倒叙
    SwitchUserIcon2 () {
      this.user_icon_screen1 = true
      this.user_icon_screen2 = false
      this.sort = 'registDesc'
      this.getGetUserDetailList = []
      this.pageDetail = 1
      this.$router.push({name: 'UserTime'})
      this.GetUserDetail()
    }
  },
  components: {
    foot,
    VHead
  }
}
</script>
<style lang="less" scoped>
  .user_search{
    position: fixed;
    top: 58px;
    width:480px;
    height: 95px;
    margin: 0 auto;
    display: table-cell;
    vertical-align: middle;
    z-index: 800;
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
        z-index: 500;
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
        left: 478px;
        top: 16px;
        font-size: 24px;
        color: #333;
        font-family:PingFang-SC-Regular;
        font-weight:Regular;
        letter-spacing:2px;
        padding-top: 4px;
      }
      .search_tri{
        width: 12px;
        height: 6px;
        position: absolute;
        left: 585px;
        top: 30px;
      }
    }
  }
.user_detail{
  width: 640px;
  height: auto;
  position: relative;
  .img_time{
    width:120px;
    height: 15px;
    position: fixed;
    top: 184px;
    z-index: 500;
    font-size:24px;
    font-family:PingFang-SC-Regular;
    font-weight:bold;
    margin-left: 55px;
    img{
      position: absolute;
      top: 4px;
      left: 104px;
      width:12px;
      height:15px;
      z-index: 1000;
    }
  }
  .no_user{
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
      left: 170px;
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
    margin-bottom: 30px;
    margin-top: 75px;
    li{
        width: 599px;
        height: 170px;
        background: #fff;
        position: relative;
        margin: 0 auto;
        margin-top: 17px;
        .user_contain{
            width:599px;
            height:170px;
            position: absolute;
            top: 0px;
            left: 0px;
            .user_contain_headimg{
                width:68px;
                height:68px;
                border-radius:37px;
                position: absolute;
                top: 27px;
                left: 27px;
            }
            .user_title{
                width:186px;
                height:26px;
                font-size:27px;
                font-family:PingFang-SC-Regular;
                font-weight:Regular;
                color:#333;
                position: absolute;
                top: 32px;
                left: 115px;
            }
            .p_img{
              font-size:25px;
              margin-top:6px;
              padding-bottom:2px;
              color:#999;
            }
            .grade_level_img{
                min-width:102px;
                height:30px;
                position: absolute;
                top: 28px;
                left: 307px;
            }
            .user_name{
                width:100px;
                height:22px;
                font-size:20px;
                font-family:PingFang-SC-Regular;
                font-weight:Regular;
                color:#999;
                position: absolute;
                top: 74px;
                left: 111px;
            } 
            .user_time{
                width:160px;
                height:22px;
                font-size:20px;
                font-family:PingFang-SC-Regular;
                font-weight:Regular;
                color:#999;
                position: absolute;
                top: 74px;
                left: 211px;
            } 
            .user_up{
                width:300px;
                height:22px;
                font-size:20px;
                font-family:PingFang-SC-Regular;
                font-weight:Regular;
                color:#999;
                position: absolute;
                top: 99px;
                left: 111px;
            }
            .user_recommend{
                width:100px;
                height:22px;
                font-size:20px;
                font-family:PingFang-SC-Regular;
                font-weight:Regular;
                color:#999;
                position: absolute;
                top: 124px;
                left: 111px;
            }
            .user_direc{
                width:100px;
                height:22px;
                font-size:20px;
                font-family:PingFang-SC-Regular;
                font-weight:Regular;
                color:#999;
                position: absolute;
                top: 124px;
                left: 226px;
            }
            .user_carrieroperator{
                width:120px;
                height:22px;
                font-size:20px;
                font-family:PingFang-SC-Regular;
                font-weight:Regular;
                color:#999;
                position: absolute;
                top: 124px;
                left: 354px;
            }
        }
    }
  }
}
</style>


