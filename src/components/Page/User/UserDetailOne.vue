<template>
  <div>
    <VHead></VHead>
    <div class="user_detail_one">
        <alert v-model="alert_show">{{error_type}}</alert>
        <div class="me">
            <img src="../../../assets/statistics_icon_back2@2x.png" @click="BackFunction()">
            <p>用户详情</p>
        </div>
        <div class="user_contain_head">
            <img class="user_contain_headimg" :src="headImg" alt="">
            <p class="user_title">{{mobile}}</p>
            <div v-if="userType == 0">
                <img class="grade_level_img" src="../../../assets/user_icon_screen@2x.png">
            </div>
            <div v-if="userType == 1">
                <img class="grade_level_img" src="../../../assets/user_icon_screen@2x.png">
            </div>
            <div v-else-if="userType == 2">
                <img class="grade_level_img" src="../../../assets/user_icon_diamondmembers@2x.png">
            </div>
            <div v-else-if="userType == 3">
                <img class="grade_level_img" src="../../../assets/user_icon_screen@2x.png">
            </div>
            <img class="grade_level_img" src="../../../assets/user_icon_screen@2x.png">
            <span class="user_name">{{nickName}}</span>
            <span class="user_time">{{createTime}}</span>
            <span class="user_up">上级：{{upMobile}}</span>
            <span class="user_recommend">团队总数：<span style="color:#FF5100">{{teamCount}}</span></span>
        </div>
        <div class="user_team_list_border"></div>
        <p class="user_team_list">团队列表</p>
        <ul>
            <li v-for="(item, index) in getGetUserDetailList" :key="'time' + index"
             @click="selectTimer(index)"
             :class="timeIndex === index ? 'active_class' : 'unactive_class' ">
                <div class="user_contain">
                    <img class="user_contain_headimg" :src="item.mobile" alt="">
                    <p class="user_title">{{item.mobile}}</p>
                    <div v-if="item.userType == 1">
                        <img class="grade_level_img" src="../../../assets/user_icon_screen@2x.png">
                    </div>
                    <div v-else>
                        <img class="grade_level_img" src="../../../assets/user_icon_diamondmembers@2x.png">
                    </div>
                    <span class="user_name">{{item.nickName}}</span>
                    <span class="user_time">{{item.createTime}}</span>
                </div>
            </li>
        </ul>
        <button>升级</button>
    </div>
  </div>
</template>

<script>
import func from '@/common/func'
import VHead from '@/components/header'
// import Qs from 'qs'
export default {
  name: 'UserDetailOne',
  data () {
    return {
      error_type: '', // 错误类型
      alert_show: false, // 是否弹出错误
      nickName: '', // 名称
      headImg: '', // 头像图片
      mobile: '', // 用户名
      userType: '', // 会员类型
      createTime: '', // 创建时间
      upMobile: '', // 上级代理
      teamCount: '', // 团队总人数
      getGetUserDetailList: '', // 循环数组
      active: '', // 是否选中li样式
      timeIndex: '' // 选中li
    }
  },
  mounted () {
    this.GetUserDetailOne()
    this.GetUserDetailList()
  },
  methods: {
    GetUserDetailOne () {
      let uid = localStorage.getItem('uid')
      func.ajaxGet('http://47.107.48.61:8830/relation/auth/itocInfo?uid=' + uid,
        response => {
          this.headImg = response.data.data.headImg
          this.nickName = response.data.data.nickName
          this.mobile = response.data.data.mobile
          this.userType = response.data.data.userType
          this.createTime = response.data.data.createTime
          this.upMobile = response.data.data.upMobile
          this.teamCount = response.data.data.teamCount
        })
    },
    GetUserDetailList () {
      let uid = localStorage.getItem('uid')
      func.ajaxGet('http://47.107.48.61:8830/relation/auth/query?uid=' + uid + '&page=1&size=10',
        response => {
          this.getGetUserDetailList = response.data.data.records
        })
    },
    selectTimer (index) {
      this.timeIndex = index
    }
  },
  components: {
    VHead
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
    position: absolute;
    top: 65px;
    width: 100%;
    height: 75px;
    background-color: #fff;
    text-align: center;
    border-top:1px solid #E8E8EA;
    img{
        width: 17px;
        height: 24px;
        position: absolute;
        left: 26px;
        top: 26px;
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
    width: 100%;
    height:172px;
    position: absolute;
    top: 138px;
    background: #fff;
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
    .grade_level_img{
        min-width:102px;
        height:30px;
        position: absolute;
        top: 10px;
        left: 404px;
    }
    .user_name{
        width:100px;
        height:22px;
        font-size:20px;
        font-family:PingFang-SC-Regular;
        font-weight:Regular;
        color:#999;
        position: absolute;
        top: 54px;
        left: 164px;
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
        width:300px;
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
  .user_team_list{
    width:136px;
    height:27px;
    font-size:29px;
    font-family:PingFang-SC-Bold;
    font-weight:Bold;
    color:#333;
    position: absolute;
    padding-left: 17px;
    top: 356px;
    left: 20px;
  }
  .user_team_list_border{
    width:9px;
    height:27px;
    background: #FF5100;
    position: absolute;
    top: 356px;
    left: 20px;
    border-radius: 9px;
  }
    ul{
    width: 100%;
    min-height:400px;
    position: relative;
    top: 409px;
    margin-bottom: 230px;
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
                left: 115px;
            } 
            .user_time{
                width:200px;
                height:22px;
                font-size:20px;
                font-family:PingFang-SC-Regular;
                font-weight:Regular;
                color:#999;
                position: absolute;
                top: 74px;
                left: 311px;
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
        }
    }
  }
  button{
      position: fixed;
      bottom: 0px;
      width: 100%;
      height: 84px;
      color: #fff;
      background: #FF5100;
      font-family: PingFang-SC-Medium;
      font-weight: Medium;
      font-size: 29px;
  }
}
</style>
