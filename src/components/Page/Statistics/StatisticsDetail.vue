<template>
    <div>
        <VHead></VHead>
        <div class="statistics_detail">
            <div class="me">
                <img class="statistics_detail_back" src="../../../assets/statistics_icon_back@2x.png" @click="BackFunction()">
                <p>团队会员收益</p>
                <span @click="IncomeAsc()">累计收益</span>
                <img class="statistics_detail_select" src="../../../assets/user_icon_screen1@2x.png" v-show="sortid_img">
                <img class="statistics_detail_select" src="../../../assets/user_icon_screen2@2x.png" v-show="!sortid_img">
            </div>
            <div class="statistics_detail_search">
                <span class="search_icon">
                <img src="../../../assets/user_icon_search@2x.png" @click.stop="GetStatisticsPhoneDetail()">
                <input type="text" placeholder="请输入手机号码查找会员" v-model="user_phone">
                <button @click.stop="GetStatisticsPhoneDetail()">搜索</button>
                </span>
            </div>
            <div class="statistics_detail_number">
            <ul>
            <li v-show="show_user_list" v-for="(item, index) in getStatisticsDetailList " :key="index">
                <span class="statistics_detail_phone">{{item.mobile}}</span>
                <span class="statistics_detail_income">累计收益：￥{{item.totalIncome}}</span>
                <p class="statistics_detail_name">{{item.nickName}}</p>
                <p class="statistics_detail_time">结算日期:{{item.lastIncomeDate}}</p>
            </li>
            <li v-show="show_user_phone">
                <span class="statistics_detail_phone">{{mobile}}</span>
                <span class="statistics_detail_income">累计收益：￥{{totalIncome}}</span>
                <p class="statistics_detail_name">{{nickName}}</p>
                <p class="statistics_detail_time">结算日期:{{lastIncomeDate}}</p>
            </li>
        </ul>
            </div>
        </div>
        <foot></foot>
    </div>
</template>
<script>
import func from '@/common/func'
import foot from '@/components/foot'
import VHead from '@/components/header'
export default {
  name: 'StatisticsDetail',
  data () {
    return {
      getStatisticsDetailList: '', // 循环数组
      mobile: '', // 手机号
      lastIncomeDate: '', // 循环数组
      nickName: '', // 名字
      userId: '', // 用户id
      totalIncome: '', // 累计收益
      user_phone: '', // 查找手机号
      show_user_list: true, // 默认显示循环数组
      show_user_phone: false, // 显示手机号查找的内容
      sortid: 'totalIncomeAsc', // 收益分类
      sortid_img: true // 收益分类
    }
  },
  mounted () {
    this.GetStatisticsDetail()
  },
  methods: {
    GetStatisticsDetail () {
      let uid = localStorage.getItem('uid')
      func.ajaxGet('/account/auth/itoc/teamIncomes?osType=0&userId=' + uid,
      response => {
        if (response.data.code === 200) {
          this.getStatisticsDetailList = response.data.data.records
          this.show_user_phone = false
          this.show_user_list = true
        } else {
          this.error_type = response.data.message
          this.alert_show = true
        }
      })
    },
    GetStatisticsPhoneDetail () {
      let phone = this.user_phone
      func.ajaxGet('/account/auth/itoc/teamIncomes?osType=0&mobile=' + phone,
      response => {
        if (response.data.code === 200) {
          this.show_user_phone = true
          this.show_user_list = false
          this.mobile = response.data.data.mobile
          this.nickName = response.data.data.nickName
          this.lastIncomeDate = response.data.data.lastIncomeDate
          this.totalIncome = response.data.data.totalIncome
        } else {
          this.error_type = response.data.message
          this.alert_show = true
        }
      })
    },
    IncomeAsc () {
      if (this.sortid === 'totalIncomeAsc') {
        this.sortid = 'totalIncomeDesc'
      } else {
        this.sortid = 'totalIncomeAsc'
      }
      let uid = localStorage.getItem('uid')
      let sortid = this.sortid
      func.ajaxGet('/account/auth/itoc/teamIncomes?osType=0&userId=' + uid + '&sort=' + sortid,
      response => {
        if (response.data.code === 200) {
          this.getStatisticsDetailList = response.data.data.records
          this.show_user_phone = false
          this.show_user_list = true
          this.sortid_img = !this.sortid_img
        } else {
          this.error_type = response.data.message
          this.alert_show = true
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
.statistics_detail{
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #F5F5F5;
  margin-bottom: 144px;
  .me{
    position: absolute;
    top: 65px;
    width: 100%;
    height: 75px;
    background-color: #fff;
    text-align: center;
    border-top:1px solid #E8E8EA;
    .statistics_detail_back{
        width: 17px;
        height: 24px;
        position: absolute;
        left: 26px;
        top: 26px;
    }
    span{
        width: 100px;
        height: 23px;
        position: absolute;
        top: 29px;
        left: 503px;
        font-size: 24px;
        color: #333;
        font-family: PingFang-SC-Regular;
        font-weight: Regular;
    }
    .statistics_detail_select{
        width: 12px;
        height: 15px;
        position: absolute;
        top: 34px;
        left: 608px;
    }
    p{
      color: #333;
      font-size:29px;
      margin-top: 24px;
      font-family: PingFang-SC-Regular;
      font-weight: Regular;
    }
  }
  .statistics_detail_search{
    position: absolute;
    top: 140px;
    left: 0px;
    width: 100%;
    height: 95px;
    background: #fff;
    .search_icon{
      width: 439px;
      height: 55px;
      position: absolute;
      left: 20px;
      top: 20px;
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
  .statistics_detail_number{
  width: 640px;
  height: auto;
  position: relative;
  top: 232px;
   ul{
    width: 100%;
    min-height:400px;
    position: relative;
    li{
        width: 100%;
        height: 140px;
        background: #fff;
        margin-top: 17px;
        position: relative;
        .statistics_detail_phone{
            width:183px;
            height:23px;
            font-size:29px;
            font-family:PingFang-SC-Regular;
            font-weight:Regular;
            color:#333;
            position: absolute;
            left: 20px;
            top: 20px;
        }
        .statistics_detail_income{
            width:237px;
            height:23px;
            font-size:24px;
            font-family:PingFang-SC-Regular;
            font-weight:Regular;
            color:#333;
            position: absolute;
            left: 272px;
            top: 22px;
        }
        .statistics_detail_name{
            width:207px;
            height:23px;
            font-size:24px;
            font-family:PingFang-SC-Regular;
            font-weight:Regular;
            color:#999;
            position: absolute;
            left: 20px;
            bottom: 56px;
        }
        .statistics_detail_time{
            width:260px;
            height:30px;
            font-size:24px;
            font-family:PingFang-SC-Regular;
            font-weight:Regular;
            color:#999;
            position: absolute;
            left: 20px;
            bottom: 20px;
        }
    }
  }

  }
}
</style>

