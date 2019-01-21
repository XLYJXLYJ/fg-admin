<template>
  <div>
    <VHead></VHead>
    <loading :show="show_loading" :text="text_loading" style="z-index:1000"></loading>
    <alert v-model="alert_show">{{error_type}}</alert>
    <confirm v-model="show"
      title="温馨提示"
      @on-cancel="onCancel"
      @on-confirm="onConfirm">
      <p style="text-align:center;">确定要升级他为运营商吗？</p>
    </confirm>
    <div class="user_detail_one">
        <alert v-model="alert_show">{{error_type}}</alert>
        <div class="me">
          <div @click.stop.prevent="BackFunction()" class="img_border"><img src="../../../assets/statistics_icon_back2@2x.png"></div>
          <p>用户详情</p>
        </div>
        <div class="user_contain_head">
            <div v-if="headImg == null">
              <img class="user_contain_headimg" src="../../../assets/community_picture@2x.png">
            </div>
            <div v-else>
              <img class="user_contain_headimg" :src="headImg">
            </div>
            <p class="user_title">{{mobile}}</p>
            <div v-if="userType == 0">
                <p class="grade_level_img p_img">普通会员</p>
            </div>
            <div v-if="userType == 1">
                <img class="grade_level_img" src="../../../assets/user_icon_screen@2x.png">
            </div>
            <div v-else-if="userType == 2">
                <img class="grade_level_img" src="../../../assets/user_icon_diamondmembers@2x.png">
            </div>
            <div v-else-if="userType == 3">
                <img class="grade_level_img" src="../../../assets/myteam_icon_operationcenter@2x.png">
            </div>
            <span class="user_name">{{nickName}}</span>
            <span class="user_time">{{createTime}}</span>
            <span class="user_up">上级：{{upMobile}}</span>
            <span class="user_recommend">团队总数：<span style="color:#FF5100">{{teamCount}}</span></span>
        </div>
        <div class="user_team_list_box">
          <div class="user_team_list_border"></div>
          <p class="user_team_list">团队列表</p>
        </div>
        <ul>
          <li v-for="(item, index) in getGetUserDetailList" :key="'time' + index"
            @click="selectTimer(item.userId)"
            :class="timeIndex === index ? 'active_class' : 'unactive_class' ">
              <div class="user_contain">
                  <div v-if="item.headImg == null">
                    <img class="user_contain_headimg" src="../../../assets/community_picture@2x.png">
                  </div>
                  <div v-else>
                    <img class="user_contain_headimg" :src="item.headImg">
                  </div>
                  <p class="user_title">{{item.mobile}}</p>
                  <div v-if="item.userType == 0">
                    <p class="grade_level_img  p_img">普通会员</p>
                  </div>
                  <div v-else-if="item.userType == 1">
                    <img class="grade_level_img" src="../../../assets/user_icon_screen@2x.png">
                  </div>
                  <div v-else-if="item.userType == 2">
                    <img class="grade_level_img" src="../../../assets/user_icon_diamondmembers@2x.png">
                  </div>
                  <div v-else-if="item.userType == 3">
                    <img class="grade_level_img" src="../../../assets/myteam_icon_operationcenter@2x.png">
                  </div>
                  <span class="user_name">{{item.nickName}}</span>
                  <span class="user_time">{{item.createTime}}</span>
              </div>
          </li>
        </ul>
        <div v-if="userType !== 2">
          <button @click.stop.prevent="DoShowToast()">升级</button>
        </div>
        <p class="foot_text" v-show="isBottom">已经到底咯~</p>
    </div>
  </div>
</template>

<script>
import { Confirm } from 'vux'
import func from '@/common/func'
import VHead from '@/components/header'
import Qs from 'qs'
export default {
  name: 'UserDetailOne',
  data () {
    return {
      error_type: '', // 错误类型
      alert_show: false, // 是否弹出错误
      nickName: '', // 名称
      headImg: '', // 头像图片
      mobile: '', // 用户名
      userType: 2, // 会员类型
      createTime: '', // 创建时间
      upMobile: '', // 上级代理
      teamCount: '', // 团队总人数
      getGetUserDetailList: [], // 循环数组
      active: '', // 是否选中li样式
      timeIndex: '', // 选中li
      show: false, // 是否弹出确定框
      page: 1, // 加载页数
      stopPage: 100000, // 停止加载页数
      show_loading: false, // 是否显示加载框
      text_loading: '正在加载...', // 加载框显示文字
      isBottom: false,
    }
  },
  created () {
    var _this = this
    window.onscroll = function () {
      // 变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop = parseInt(document.documentElement.scrollTop || document.body.scrollTop) 
      // 变量windowHeight是可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 变量scrollHeight是滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      // 滚动条到底部的条件
      if (scrollTop + windowHeight === scrollHeight-1 && scrollTop !== 0) {
      // 写后台加载数据的函数
        _this.page = _this.page + 1
        if (_this.page > _this.stopPage) {
          _this.error_type = '已显示全部数据'
          _this.alert_show = true
        } else {
          _this.GetUserDetailList()
        }
      }
    }
  },
  mounted () {
    this.userid = this.$route.params.userid
    this.GetUserDetailOne()
    this.GetUserDetailList()
  },
  methods: {
    GetUserDetailOne () {
      func.ajaxGet(this.$store.state.baseUrl + '/user/relation/auth/itocInfo?osType=0&uid=' + this.userid,
        response => {
          if (response.data.code === 200) {
            this.headImg = response.data.data.headImg
            this.nickName = response.data.data.nickName
            this.mobile = response.data.data.mobile
            this.userType = response.data.data.userType
            this.createTime = response.data.data.createTime
            this.upMobile = response.data.data.upMobile
            this.teamCount = response.data.data.teamCount
          } else {
            this.error_type = response.data.message
            this.alert_show = true
          }
        })
    },
    GetUserDetailList () {
      this.show_loading = true
      func.ajaxGet(this.$store.state.baseUrl + '/user/relation/auth/query?osType=0&uid=' + this.userid + '&size=10' + '&page=' + this.page,
        response => {
          if (response.data.code === 200) {
            if (response.data.data.records.length>0) {
              this.noOrder = false
              if (this.page === 1) {
                this.getGetUserDetailList = response.data.data.records
                this.show_loading = false
              } else {
                this.getGetUserDetailList = this.getGetUserDetailList.concat(response.data.data.records)
                this.show_loading = false
              }
            } else {
               if (this.page===1) {
                this.getGetUserDetailList = []
               }
                this.stopPage = this.page
                this.noOrder = true
                this.show_loading = false
            }
          }
          else if (response.data.code === 401) {
            this.show_loading = false
            this.error_type = '登录超时，请重新登录'
            this.alert_show = true
            setTimeout(() => {this.$router.push('Login')}, 1500);
          }
          else if (response.data.code === 500) {
            this.show_loading = false
            this.error_type = response.data.message
            this.alert_show = true
          }
          else {
            if (this.page === 1) {
              this.stopPage = this.page
              this.noOrder = true
              this.show_loading = false
              this.getGetUserDetailList = []
            } else {
              this.stopPage = this.page
              this.error_type = '已显示全部数据'
              this.isBottom = true
              this.alert_show = true
              this.show_loading = false
            }
          }
        }
      )
    },
    selectTimer (index) {
      this.page = 1
      this.userid = index
      this.isBottom = false
      this.GetUserDetailOne()
      this.GetUserDetailList()
    },
    onCancel () {
      this.show = false
    },
    onConfirm () {
      // let loginToken = localStorage.getItem('loginToken') 
      let loginToken = localStorage.getItem('loginToken',1000)    
      let uid = localStorage.getItem('uid')
      let data = Qs.stringify({       
        osType: 0,
        uid: this.userid,
        userId: uid
      })
      this.axios({
        method:'post',
        url: this.$store.state.baseUrl + '/user/auth/itoc/upgradeAgent?' + data,
        headers:{'token':loginToken},
      })
      .then(function (response) {
        if (response.data.code === 200) {
          this.userType = 2
          this.error_type = '升级成功，你还有'+ response.data.data +'次机会'
          this.alert_show = true
        } else {
          this.error_type = response.data.message
          this.alert_show = true
        }
      })
    },
    DoShowToast () {
      this.show = true
    }
  },
  components: {
    VHead,
    Confirm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.user_detail_one{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #F5F5F5;
  width: 100%;
  .unactive_class{
    background: #fff;
    }
  .active_class{
    background: #FF5100;
  }
  .me{
    position: fixed;
    top: 65px;
    width: 640px;
    height: 75px;
    background-color: #fff;
    text-align: center;
    border-top:1px solid #E8E8EA;
    z-index: 500;
    .img_border{
      width: 47px;
      height: 34px;
      position: absolute;
      left: 26px;
      top: 26px;
    }
    img{
      width: 17px;
      height: 24px;
      position: absolute;
      left: 0px;
      top: 0px;
    }
    p{
      color: #333;
      font-size:29px;
      margin-top: 24px;
      font-family: PingFang-SC-Regular;
      font-weight: Regular;
    }
  }
  .user_contain_head{
    width: 640px;
    height:172px;
    position: fixed;
    top: 138px;
    background: #fff;
    z-index: 500;
    .user_contain_headimg{
      width:110px;
      height:109px;
      border-radius:57px;
      position: absolute;
      top: 10px;
      left: 38px;
    }
    .user_title{
      width:230px;
      height:30px;
      font-size:34px;
      font-family:PingFang-SC-Medium;
      font-weight:Medium;
      color:#333;
      position: absolute;
      top: 10px;
      left: 164px;
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
      top: 10px;
      left: 404px;
    }
    .user_name{
      width:440px;
      height:22px;
      font-size:20px;
      font-family:PingFang-SC-Regular;
      font-weight:Regular;
      color:#999;
      position: absolute;
      top: 54px;
      left: 164px;
      overflow: hidden;
    } 
    .user_time{
      width:210px;
      height:22px;
      font-size:20px;
      font-family:PingFang-SC-Regular;
      font-weight:Regular;
      color:#999;
      position: absolute;
      top: 79px;
      left: 164px;
    } 
    .user_up{
      width:230px;
      height:22px;
      font-size:20px;
      font-family:PingFang-SC-Regular;
      font-weight:Regular;
      color:#999;
      position: absolute;
      top: 79px;
      left: 400px;
    }
    .user_recommend{
      width:160px;
      height:22px;
      font-size:20px;
      font-family:PingFang-SC-Regular;
      font-weight:Regular;
      color:#666;
      position: absolute;
      top: 114px;
      left: 164px;
      span{
        color: #FF5100;
        font-size:29px;
      }
    }
  }
  .user_team_list_box{
    width: 640px;
    height:92px;
    position: fixed;
    top: 309px;
    background: #F5F5F5;
    z-index: 500;
  }
  .user_team_list{
    width:136px;
    height:27px;
    font-size:29px;
    font-family:PingFang-SC-Bold;
    font-weight:Bold;
    color:#333;
    position: fixed;
    padding-left: 17px;
    top: 356px;
    margin-left: 20px;
  }
  .user_team_list_border{
    width:9px;
    height:27px;
    background: #FF5100;
    position: fixed;
    top: 356px;
    margin-left: 20px;
    border-radius: 9px;
  }
  ul{
    width: 100%;
    min-height:400px;
    position: relative;
    top: 409px;
    margin-bottom: 460px;
    li{
      width: 599px;
      height: 123px;
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
          width:140px;
          height:22px;
          font-size:20px;
          font-family:PingFang-SC-Regular;
          font-weight:Regular;
          color:#999;
          position: absolute;
          top: 74px;
          left: 115px;
          overflow: hidden;
        } 
        .user_time{
          width:220px;
          height:22px;
          font-size:20px;
          font-family:PingFang-SC-Regular;
          font-weight:Regular;
          color:#999;
          position: absolute;
          top: 74px;
          left: 311px;
        } 
      }
    }
  }
  button{
    position: fixed;
    bottom: 0px;
    width: 640px;
    height: 84px;
    color: #fff;
    background: #FF5100;
    font-family: PingFang-SC-Medium;
    font-weight: Medium;
    font-size: 29px;
  }
  .foot_text{
    position: relative;
    bottom: 20px;
    left: 263px;
    height: 23px;
    width:130px;
    font-size: 20px;
    color: #999;
    font-weight: Regular;
    font-family: PingFang-SC-Regular;
  }
}
</style>
