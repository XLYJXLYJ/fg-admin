<template>
<div>
    <div class="user_detail">
      <div class="no_user" v-show="noUser">
        <img src="../../../assets/user_icon_emptystate@2x.png">
        <p>您还没有会员，继续加油哦~</p>
      </div>
      <ul v-show="!noUser">
          <li v-for="item in getGetUserDetailList" :key='item.id'>
              <router-link :to="{path:'/UserDetailOne?uid='+item.userId}">
                  <div class="user_contain">
                      <img class="user_contain_headimg" :src="item.headImg">
                      <p class="user_title">{{item.mobile}}</p>
                      <div v-if="item.userType == 1">
                          <img class="grade_level_img" src="../../../assets/user_icon_screen@2x.png">
                      </div>
                      <div v-else>
                          <img class="grade_level_img" src="../../../assets/user_icon_diamondmembers@2x.png">
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
export default {
  data () {
    return {
      getGetUserDetailList: '', // 循环数组
      userText: '', // 搜索的内容
      sort: '', // 时间排序
      noUser: ''
    }
  },
  computed: {
    listenUserType () {
      return this.$store.state.userType
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/User/UserTime') {
        this.GetUserDetail()
      } else if (to.path === '/User/UserNumber') {
        this.GetUserDetailNumber()
      } else {
        this.GetUserDetailDirectly()
      }
    },
    listenUserType: function () {
      let uid = localStorage.getItem('uid')
      func.ajaxGet('http://47.107.48.61:8820/user/relation/auth/itocList?osType=0&uid=' + uid + '&userType=' + this.$store.state.userType,
        response => {
          this.getGetUserDetailList = response.data.data.records
        })
    },
    '$route.path': function () {
      this.userText = this.$route.params.userText
      this.sort = this.$route.params.sort
      let uid = localStorage.getItem('uid')
      if (this.userText) {
        func.ajaxGet('http://47.107.48.61:8820/user/relation/auth/itocList?osType=0&uid=' + uid + '&mobile=' + this.userText,
        response => {
          this.getGetUserDetailList = response.data.data.records
        })
      } else {
        func.ajaxGet('http://47.107.48.61:8820/user/relation/auth/itocList?osType=0&uid=' + uid + '&sort=' + this.userText,
        response => {
          this.getGetUserDetailList = response.data.data.records
        })
      }
    }
  },
  mounted () {
    this.GetUserDetail()
    this.userText = this.$route.params
  },
  methods: {
    GetUserDetail () {
      let uid = localStorage.getItem('uid')
      func.ajaxGet('http://47.107.48.61:8820/user/relation/auth/itocList?osType=0&uid=' + uid + '&userType=0',
        response => {
          if (response.data.data.records.length) {
            this.getGetUserDetailList = response.data.data.records
          } else {
            this.noUser = true
          }
        })
    },
    GetUserDetailNumber () {
      let uid = localStorage.getItem('uid')
      func.ajaxGet('http://47.107.48.61:8820/user/relation/auth/itocList?osType=0&uid=' + uid + '&userType=0&sort=teamDesc',
        response => {
          if (response.data.data.records.length) {
            this.getGetUserDetailList = response.data.data.records
          } else {
            this.noUser = true
          }
        })
    },
    GetUserDetailDirectly () {
      let uid = localStorage.getItem('uid')
      func.ajaxGet('http://47.107.48.61:8820/user/relation/auth/itocList?osType=0&uid=' + uid + '&userType=0&sort=underDesc',
        response => {
          if (response.data.data.records.length) {
            this.getGetUserDetailList = response.data.data.records
          } else {
            this.noUser = true
          }
        })
    }
  },
  components: {
    foot,
    VHead
  }
}
</script>
<style lang="less" scoped>
.user_detail{
  width: 640px;
  height: auto;
  position: relative;
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
                width:100px;
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


