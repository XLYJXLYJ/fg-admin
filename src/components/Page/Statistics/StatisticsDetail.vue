<template>
  <div>
    <VHead></VHead>
    <loading :show="show_loading" :text="text_loading" style="z-index:1000"></loading>
    <alert v-model="alert_show">{{error_type}}</alert>
    <div class="statistics_detail" v-show="show_stastics">
        <div class="me">
            <div @click="BackFunction()" class="statistics_detail_back"><img src="../../../assets/statistics_icon_back2@2x.png"></div>
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
          <ul :class="{white_color: isList}">
          <li v-for="(item, index) in getStatisticsDetailList " :key="index">
              <span class="statistics_detail_phone">{{item.mobile}}</span>
              <span class="statistics_detail_income">累计收益：￥{{item.totalIncome}}</span>
              <p class="statistics_detail_name">{{item.nickName}}</p>
              <p class="statistics_detail_time">结算日期:{{item.lastIncomeDate}}</p>
          </li>
          <!-- <li v-show="show_user_phone">
              <span class="statistics_detail_phone">{{mobile}}</span>
              <span class="statistics_detail_income">累计收益：￥{{totalIncome}}</span>
              <p class="statistics_detail_name">{{nickName}}</p>
              <p class="statistics_detail_time">结算日期:{{lastIncomeDate}}</p>
          </li> -->
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
      getStatisticsDetailList: [], // 循环数组
      mobile: '', // 手机号
      lastIncomeDate: '', // 循环数组
      nickName: '', // 名字
      userId: '', // 用户id
      totalIncome: '', // 累计收益
      user_phone: '', // 查找手机号
      sortid: 'totalIncomeAsc', // 收益分类
      sortid_img: true, // 收益分类
      page: 1,
      alert_show: false, // 是否显示弹出框
      error_type: '', // 弹出框的弹出说明
      show_loading: false, // 是否显示加载框
      text_loading: '正在加载...', // 加载框显示文字
      show_stastics: true,
      stopPage: 1000000, // 停止的页数
      isList: false, // 是否有数据
      noOrder: ''
    }
  },
  mounted () {
    this.GetStatisticsDetail()
  },
  created () {
    let _this = this
    window.onscroll = function () {
      // 变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 变量windowHeight是可视区的高度
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 变量scrollHeight是滚动条的总高度
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      // 滚动条到底部的条件
      if (scrollTop + windowHeight === scrollHeight && scrollTop !== 0) {
      // 写后台加载数据的函数
        _this.page = _this.page + 1
        if (_this.page > _this.stopPage) {
          _this.error_type = '已显示全部数据'
          _this.alert_show = true
        } else {
          _this.GetStatisticsDetail()
        }
      }
    }
  },
  methods: {
    GetStatisticsDetail () {
      this.show_loading = true
      let uid = localStorage.getItem('uid')
      func.ajaxGet(this.$store.state.baseUrl + '/account/auth/itoc/teamIncomes?osType=0&userId=' + uid + '&page=' + this.page + '&sort=' + this.sortid,
      response => {
        if (response.data.code === 200) {
          if (response.data.data.records.length>0) {
            this.isList = false
            this.noOrder = false
            if (this.page === 1) {
              this.getStatisticsDetailList = response.data.data.records
              this.show_loading = false
            } else {
              this.getStatisticsDetailList = this.getStatisticsDetailList.concat(response.data.data.records)
              this.show_loading = false
            }
          } else {
            if (this.page===1) {
              this.isList = true
              this.error_type = '暂时没有团队会员收益'
              this.alert_show = true
            } else {
              this.isList = false
            }
            this.stopPage = this.page
            this.noOrder = true
            this.show_loading = false
          }
        } 
        else if (response.data.code === 401) {
          this.isList = false
          this.show_loading = false
          this.error_type = '登录超时，请重新登录'
          this.alert_show = true
          setTimeout(() => {this.$router.push({name: 'Login'})}, 1500);
        } 
        else if (response.data.code === 500) {
          this.isList = false
          this.show_loading = false
          this.error_type = response.data.message
          this.alert_show = true
        } 
        else {
          if (this.page === 1) {
            this.stopPage = this.page
            this.noOrder = true
            this.show_loading = false
            this.show_stastics = false
          } else {
            this.stopPage = this.page
            this.error_type = '已显示全部数据'
            this.alert_show = true
            this.show_loading = false
          }
        }
      })
    },
    GetStatisticsPhoneDetail () {
      this.show_loading = true
      let phone = this.user_phone
      func.ajaxGet(this.$store.state.baseUrl + '/account/auth/itoc/teamIncomes?osType=0&mobile=' + phone,
      response => {
        if (response.data.code === 200) {
          // this.show_user_phone = true
          // this.show_user_list = false
          this.getStatisticsDetailList = response.data.data.records
          this.show_loading = false
        } else if (response.data.code === 401) {
            this.$router.push('Login')
        } else {
        this.show_loading = false
        this.error_type = response.data.message
        this.alert_show = true
        }
      })
    },
    IncomeAsc () {
      if (this.sortid === 'totalIncomeAsc') {
        this.sortid = 'totalIncomeDesc'
        this.sortid_img = false
      } else {
        this.sortid = 'totalIncomeAsc'
        this.sortid_img = true
      }
      this.page = 1
      this.GetStatisticsDetail()
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
  width: 640px;
  height: 100%;
  position: relative;
  background-color: #F5F5F5;
  margin-bottom: 144px;
  .white_color{
    background: #fff;
  }
  .me{
    position: fixed;
    top: 65px;
    width: 640px;
    height: 76px;
    background-color: #fff;
    text-align: center;
    border-top:1px solid #E8E8EA;
    z-index: 500;
    .statistics_detail_back{
      width: 37px;
      height: 24px;
      position: absolute;
      left: 26px;
      top: 26px;
      img{
        width: 17px;
        height: 24px;
        position: absolute;
        left: 0px;
        top: 0px;
      }
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
    position: fixed;
    top: 142px;
    width: 100%;
    height: 95px;
    background: #fff;
    z-index: 500;
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
  .statistics_detail_number{
  width: 640px;
  height: auto;
  position: relative;
  top: 232px;
  margin-bottom: 200px;
   ul{
    width: 100%;
    min-height:204px;
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

