<template>
  <div class="statistics_contain">
    <VHead></VHead>
    <alert v-model="alert_show">{{error_type}}</alert>
    <div class="left"></div>
    <div class="right"></div>
    <div class="team_situation">
      <div class="team_situation_head">
        <img src="../../assets/statistics_icon_team@2x.png">
        <span>团队状况</span>
      </div>
      <div class="team_situation_line"></div>
      <div class="team_situation_data_number">
        <ul>
          <li @click="SelectUnder()">
            <div class="circle" style="background:#FF5100"> </div><span>直属：</span><span class="number">{{underCount}}</span>
          </li>
          <li @click="SelectRefer()">
            <div class="circle" style="background:#0057FF"> </div><span>运营商：</span><span class="number">{{agentCount}}</span>
          </li>
          <li>
            <div class="circle" style="background:#FF8F00"> </div><span>团队人数：</span><span class="number">{{teamCount}}</span>
          </li>
        </ul>
      </div>
      <div class="zhishunum">{{derCountPercent}}%</div>
      <div class="zhishu">{{countPercentName}}</div>
      <div class="team_situation_right">
        <v-chart id="canvas" ref='chart'
          :data="data"
          :height='height'
          :width='width'
          :padding="[30, 'auto']">
          <v-tooltip disabled />
          <v-scale y :options="yOptions" />
          <v-pie :radius="0.6" :inner-radius="0.8" series-field="name" :colors="['#FF5100','#0057FF','#FF8F00']" />
          <v-legend :options="legendOptions" />
          <v-guide type="html" :options="htmlOptions" />
        </v-chart>
      </div>
      <div class="team_situation_right_line"></div>
    </div>
    <div class="data_statistics">
      <div class="data_statistics_head">
        <img src="../../assets/statistics_icon_data@2x.png">
        <span>数据统计</span>
      </div>
      <div class="data_statistics_line"></div>
      <div class="data_statistics_middle">
        <div class="data_statistics_middle_center_box">
          <button class="data_statistics_middle_button1" :class="{select_button:is_select_buttn,no_select_button:!is_select_buttn}" @click.stop.prevent="IsSelectButton1()">今日</button>
          <button class="data_statistics_middle_button2" :class="{select_button:!is_select_buttn,no_select_button:is_select_buttn}" @click.stop.prevent="IsSelectButton2()">昨日</button>
        </div>
      </div>
      <div class="data_statistics_foot">
        <ul>
          <li>
            <span class="data_statistics_foot_money_number">{{newTeam}}</span>
            <p>新增团队人数</p>
          </li>
          <li>
            <span class="data_statistics_foot_money_number">{{payCount}}</span>
            <p>付款笔数</p>
          </li>
          <li>
            <span class="data_statistics_foot_money_number"><span class="data_statistics_foot_money_icon">￥</span>{{commission}}</span>
            <p>消费收益预估</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="revenue_statistics">
      <div class="revenue_statistics_head">
        <img src="../../assets/statistics_icon_profit@2x.png">
        <span>收益统计</span>
      </div>
      <div class="revenue_statistics_line"></div>
      <div class="revenue_statistics_middle">
        <div class="revenue_statistics_middle_center_box">
          <span class="revenue_statistics_money_icon">￥</span>
          <span class="revenue_statistics_money_number">{{totalIncome}}</span>
          <p>累计收益</p>
        </div>
      </div>
      <div class="revenue_statistics_foot">
        <ul>
          <li>
            <span class="revenue_statistics_foot_money_number"><span class="revenue_statistics_foot_money_icon">￥</span>{{lastMonthCommission}}</span>
            <p>上月结算</p>
          </li>
          <li>
            <span class="revenue_statistics_foot_money_number"><span class="revenue_statistics_foot_money_icon">￥</span>{{currentMonthTkMoney}}</span>
            <p>本月预估</p>
          </li>
          <li>
            <span class="revenue_statistics_foot_money_number"><span class="revenue_statistics_foot_money_icon">￥</span>{{lastMonthTkMoney}}</span>
            <p>上月预估</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="team_statistics_box">
      <router-link to='/StatisticsDetail'><div class="team_statistics"><span>团队统计</span><img src="../../assets/statistics_icon_enter@2x.png"></div></router-link>
      <!-- <div class="team_statistics_line"></div>
      <div class="team_member_statement"><span>团队会员对账单</span><img src="../../assets/statistics_icon_enter@2x.png"></div> -->
    </div>
    <p class="foot_text">已经到底咯~</p>
    <foot></foot>
  </div>
</template>

<script>
import func from '@/common/func'
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, VPie, VGuide, VScale } from 'vux'
import foot from '@/components/foot'
import VHead from '@/components/header'

var data = [
  { name: '直属', percent: '', a: '1' },
  { name: '运营商', percent: '', a: '1' },
  { name: '团队人数', percent: '', a: '1' }
]
const map = {}
data.map(obj => {
  map[obj.name] = obj.percent + '%'
})

export default {
  components: {
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    VPie,
    VGuide,
    VScale,
    foot,
    VHead
  },
  data () {
    return {
      is_select_buttn: true,
      newTeam: '', // 新增团队人数
      payCount: '', // 付款笔数
      commission: '', // 今天的预估收益
      yesterdayPayCount: '', // 昨天的付款笔数
      yesterdayCommission: '', // 昨天的预估收益
      lastMonthCommission: '', // 上月结算
      currentMonthTkMoney: '', // 本月预估佣金
      lastMonthTkMoney: '', // 上月预估
      totalIncome: '', // 累计收益
      beforeTime: '', // 今日与昨日
      underCount: '', // 直属
      teamCount: '', // 推荐
      agentCount: '', // 代理商
      derCountPercent: '', // 显示占比
      underCountPercent: '', // 直属占比
      teamCountPercent: '', // 推荐占比
      agentCountPercent: '', // 代理商占比
      getToken: '', // token
      alert_show: false, // 是否显示弹出框
      error_type: '', // 弹出框的弹出说明
      countPercentName: '直属', // 百分比显示
      map,
      htmlOptions: {
        position: [ '50%', '50%' ],
        html:
        `<div style="width: 50px;height: 40px;text-align: center;">
          <div style="font-size: 24px" ref='sum_percent'></div>
          <div style="font-size: 16px;margin-top:10px;color:#999"></div>
        </div>`
      },
      height: 310,
      width: 380,
      legendOptions: {
        position: 'left',
        itemFormatter (val) {
          return 40 + '  ' + map[40]
        }
      },
      yOptions: {
        formatter (val) {
          return val * 100 + '%'
        }
      },
      data
    }
  },
  created () {
    if (document.body.clientWidth > 640) {
      this.width = 380 * (600 / 412)
      this.height = 440
    } else {
      this.IsIPhoneX()
    }
    let uid = localStorage.getItem('uid')
    if (!uid) {
      this.$router.push('Login')
    } else {
      this.GetAsyncDate()
      this.GetTeamSituation()
      this.IsSelectButton1()
      this.GetrevenueStatistics()
    }
  },
  methods: {
    IsIPhoneX (fn) {
      var u = navigator.userAgent
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // 是否是ios终端
      if (isIOS) {
        this.width = 387 * (document.body.clientWidth / 400)
        if (screen.height === 812 && screen.width === 375) {
          // 是iphoneX
          this.is_padding = true
          this.height = 300
        } else {
          // 不是iphoneX
          this.height = 330
        }
      } else {
        this.height = 290
        this.width = 380 * (document.body.clientWidth / 400)
      }
    },
    SelectUnder () {
      this.derCountPercent = this.underCountPercent
      this.countPercentName = '直属'
    },
    SelectRefer () {
      this.derCountPercent = this.agentCountPercent
      this.countPercentName = '运营商'
    },
    renderVChart ({ chart }) {
      this.GetTeamSituation()
    },
    GetAsyncDate () {
      this.getToken = localStorage.getItem('loginToken')
      return new Promise((resolve, reject) => {
        this.axios.get(this.$store.state.baseUrl + '/user/auth/query?osType=0', {
          headers: {'token': this.getToken}
        })
        .then((response) => {
          if (response.data.code === 200) {
            var uid = response.data.data.userId
            var headImg = response.data.data.headImg
            var mobile = response.data.data.mobile
            var nickname = response.data.data.nickname
            localStorage.setItem('uid', uid)
            localStorage.setItem('headImg', headImg)
            localStorage.setItem('mobile', mobile)
            localStorage.setItem('nickname', nickname)
          } else if (response.data.code === 401) {
            this.$router.push('Login')
          } else {
            this.error_type = response.data.message
            this.alert_show = true
          }
        })
        .catch(function (error) {
          reject(error)
        })
      })
    },

    // 初始化
    Initialization () {
      this.getToken = localStorage.getItem('loginToken')
      this.axios.get(this.$store.state.baseUrl + '/user/auth/query?osType=0', {
        headers: {'token': this.getToken}
      })
      .then(response => {
        if (response.data.code === 200) {
          var uid = response.data.data.userId
          var headImg = response.data.data.headImg
          var mobile = response.data.data.mobile
          var nickname = response.data.data.nickname
          localStorage.setItem('uid', uid)
          localStorage.setItem('headImg', headImg)
          localStorage.setItem('mobile', mobile)
          localStorage.setItem('nickname', nickname)
        } else if (response.data.code === 401) {
            this.error_type = '登录超时，请重新登录'
            this.alert_show = true
            setTimeout(() => {this.$router.push('Login')}, 1500);
        } else {
        this.error_type = response.data.message
        this.alert_show = true
        }
      })
    },
    // 收益统计
    GetrevenueStatistics () {
      let uid = localStorage.getItem('uid')
      return new Promise((resolve, reject) => {
        this.axios.get(this.$store.state.baseUrl + '/account/auth/findCommission?osType=0&userId=' + uid, {
          headers: {'token': this.getToken}
        })
        .then((response) => {
          if (response.data.code === 200) {
            this.lastMonthCommission = response.data.data.lastMonthCommission
            this.currentMonthTkMoney = response.data.data.currentMonthTkMoney
            this.lastMonthTkMoney = response.data.data.lastMonthTkMoney
            this.totalIncome = response.data.data.totalIncome
          } else if (response.data.code === 401) {
            this.$router.push('Login')
          } else {
            this.error_type = response.data.message
            this.alert_show = true
          }
        })
        .catch(function (error) {
          reject(error)
        })
      })
    },
    // 今日数据统计
    IsSelectButton1 () {
      this.newTeam = ''
      this.is_select_buttn = true
      let uid = localStorage.getItem('uid')
      func.ajaxGet(this.$store.state.baseUrl + '/account/auth/findCommission?osType=0&userId=' + uid,
      response => {
        if (response.data.code === 200) {
          this.payCount = response.data.data.payCount
          this.commission = response.data.data.commission
          this.GetDataStatistics()
        } else if (response.data.code === 401) {
            this.$router.push('Login')
        } else {
        this.error_type = response.data.message
        this.alert_show = true
        }
      })
    },
    // 昨日数据统计
    IsSelectButton2 () {
      this.newTeam = ''
      this.is_select_buttn = false
      let uid = localStorage.getItem('uid')
      func.ajaxGet(this.$store.state.baseUrl + '/account/auth/findCommission?osType=0&userId=' + uid,
      response => {
        if (response.data.code === 200) {
          this.payCount = response.data.data.yesterdayPayCount
          this.commission = response.data.data.yesterdayCommission
          this.GetDataStatistics()
        } else if (response.data.code === 401) {
            this.$router.push('Login')
        } else {
        this.error_type = response.data.message
        this.alert_show = true
        }
      })
    },
    GetDataStatistics () {
      this.newTeam = ''
      let uid = localStorage.getItem('uid')
      if (this.is_select_buttn === false) {
        this.beforeTime = 1
      } else {
        this.beforeTime = 0
      }
      func.ajaxGet(this.$store.state.baseUrl + '/user/relation/auth/itocTeamSum?osType=0&uid=' + uid + '&beforeTime=' + this.beforeTime,
        response => {
          if (response.data.code === 200) {
            this.newTeam = response.data.data
          } else if (response.data.code === 401) {
            this.$router.push('Login')
          } else {
            this.error_type = response.data.message
            this.alert_show = true
          }
        })
    },
    GetTeamSituation () {
      let uid = localStorage.getItem('uid')
      func.ajaxGet(this.$store.state.baseUrl + '/user/relation/auth/itocInfo?osType=0&uid=' + uid,
      response => {
        if (response.data.code === 200) {
          this.underCount = response.data.data.underCount
          this.teamCount = response.data.data.teamCount
          this.agentCount = response.data.data.agentCount
          this.data[0]['percent'] = this.underCount / this.teamCount
          this.data[2]['percent'] = this.teamCount / this.teamCount
          this.data[1]['percent'] = this.agentCount / this.teamCount
          this.underCountPercent = this.underCount / this.teamCount * 100
          this.underCountPercent = this.underCountPercent.toFixed(2)
          this.derCountPercent = this.underCountPercent
          this.teamCountPercent = this.teamCount / this.teamCount * 100
          this.teamCountPercent = this.teamCountPercent.toFixed(2)
          this.agentCountPercent = this.agentCount / this.teamCount * 100
          this.agentCountPercent = this.agentCountPercent.toFixed(2)
          this.$refs.chart.rerender()
        } else if (response.data.code === 401) {
            this.$router.push('Login')
        } else {
        this.error_type = response.data.message
        this.alert_show = true
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.statistics_contain{
  width: 640px;
  min-height: 1390px;
  position: flex;
  margin: 0px;
  padding: 0px;
  background-color: #F5F5F5;
  padding-bottom: 85px;
  .left{
  width: 20px;
  height: 580px;
  position: fixed;
  background: #F5F5F5;
  top: 64px;
  z-index: 1000;
  }
  .right{
  width: 20px;
  height: 580px;
  position: fixed;
  background: #F5F5F5;
  right: 0px;
  top: 64px;
  z-index: 1000;
  }
  .team_situation{
    height: 428px;
    width: 599px;
    position: relative;
    left: 20px;
    top: 84px;
    z-index: 100;
    background-color: #fff;
    .zhishunum{
      position:absolute;
      top: 230px;
      left: 358px;
      width: 60px;
      height: 60px;
      z-index: 1000;
      font-size: 29px;
    }
    .zhishu{
      position:absolute;
      top: 270px;
      left: 343px;
      width: 100px;
      height: 60px;
      z-index: 1000;
      font-size: 29px;
      text-align: center;
      color: #999;
    }
    .team_situation_data_number{
      width: 250px;
      height: 340px;
      background: #fff;
      ul{
        width: 250px;
        height: 340px;
        position: relative;
        li{
          width:206px;
          height:23px;
          font-size:24px;
          font-family:PingFang-SC-Regular;
          font-weight:PingFang-SC-Regular;
          margin-bottom: 33px;
          position: relative;
          top: 112px;
          left: 58px;
          .circle{
            display: inline-block;
            width: 17px;
            height: 17px;
            position: relative;
            left: -20px;
          }
        }
      }
    }
      .team_situation_head{
      height: 67px;
      width: 599px;
      position: relative;
      left: 0px;
      top: 0px;
      z-index: 1000;
      img{
        height: 34px;
        width: 34px;
        position: absolute;
        left: 20px;
        top: 16px;
      }
      span{
        height: 28px;
        width: 118px;
        position: absolute;
        left: 63px;
        top: 19px;
        font-family: PingFang-SC-Bold;
        font-weight: Bold;
        color: #333333;
        font-size: 29px;
      }
    }
    .team_situation_line{
      height: 1px;
      width: 579px;
      position: absolute;
      left: 20px;
      top: 68px;
      background-color: #E8E8EA;
      z-index: 1000;
    }
    .team_situation_right_line{
      height: 20px;
      width: 599px;
      position: absolute;
      left: 0px;
      top: 428px;
      background-color: #F5F5F5;
      z-index: 1000;
    }
    .team_situation_right{
      width:549px;
      height: 200px!important;
      position: absolute;
      top: 0px;
      z-index: -100;
    }
  }
  .data_statistics{
    height: 294px;
    width: 599px;
    position: relative;
    left: 20px;
    top: 104px;
    z-index: 100;
    background-color: #fff;
    .data_statistics_head{
      height: 67px;
      width: 599px;
      position: relative;
      left: 0px;
      top: 0px;
      img{
        height: 34px;
        width: 34px;
        position: absolute;
        left: 20px;
        top: 16px;
      }
      span{
        height: 28px;
        width: 118px;
        position: absolute;
        left: 63px;
        top: 19px;
        font-family: PingFang-SC-Bold;
        font-weight: Bold;
        color: #333333;
        font-size: 29px;
      }
    }
    .data_statistics_line{
      height: 1px;
      width: 579px;
      position: absolute;
      left: 20px;
      top: 67px;
      background-color: #E8E8EA;
      z-index: 1000;
    }
    .data_statistics_middle{
      position: absolute;
      left: 20px;
      top: 88px;
      width:558px;
      height:140px;
      .data_statistics_middle_button1{
        position: absolute;
        left: 150px;
        top: 0px;
        width:130px;
        height:49px;
        font-size: 24px;
        color: #FF5100;
        border: 1px solid #FF5100;
        font-weight: Regular;
        font-family: PingFang-SC-Regular;
        border-radius:9px 0px 0px 9px;
      }
      .data_statistics_middle_button2{
        position: absolute;
        left: 280px;
        top: 0px;
        width:130px;
        height:49px;
        font-size: 24px;
        color: #FF5100;
        border: 1px solid #FF5100;
        font-weight: Regular;
        font-family: PingFang-SC-Regular;
        border-radius:0px 9px 9px 0px;
      }
    }
    .data_statistics_foot{
      position: absolute;
      left: 20px;
      top: 139px;
      width:558px;
      height:155px;
      ul{
        width: 100%;
        height: 100%;
        li{
          float: left;
          width: 186px;
          height: 100%;
          position: relative;
          text-align: center;
          .data_statistics_foot_money_icon{
            width:26px;
            height:16px;
            color: #333;
            font-family: PingFang-SC-Bold;
            font-weight: Bold;
            font-size: 20px;
          }
          .data_statistics_foot_money_number{
            position: relative;
            top: 58px;
            width:28px;
            height:23px;
            color: #333;
            font-family: PingFang-SC-Bold;
            font-weight: Bold;
            margin: 0 auto;
            font-size:29px;
          }
          p{
            position: absolute;
            left: 22px;
            top: 96px;
            width:150px;
            height:28px;
            color: #999;
            font-size:24px;
            font-family: PingFang-SC-Bold;
            font-weight: Regular;
            padding-top: 2px;
          }
        }
      }
    }
  }
  .revenue_statistics{
    height: 383px;
    width: 599px;
    position: relative;
    left: 20px;
    top: 124px;
    z-index: 100;
    background-color: #fff;
    .revenue_statistics_head{
      height: 67px;
      width: 599px;
      position: relative;
      left: 0px;
      top: 0px;
      img{
        height: 34px;
        width: 34px;
        position: absolute;
        left: 20px;
        top: 16px;
      }
      span{
        height: 28px;
        width: 118px;
        position: absolute;
        left: 63px;
        top: 19px;
        font-family: PingFang-SC-Bold;
        font-weight: Bold;
        color: #333333;
        font-size: 29px;
      }
    }
    .revenue_statistics_line{
      height: 1px;
      width: 579px;
      position: absolute;
      left: 20px;
      top: 67px;
      background-color: #E8E8EA;
    }
    .revenue_statistics_middle{
      position: absolute;
      left: 20px;
      top: 88px;
      width:558px;
      height:140px;
      background:linear-gradient(-90deg,rgba(255,81,0,1),rgba(255,143,0,1));
      border-radius:9px;
      .revenue_statistics_middle_center_box{
        text-align: center;
        position: relative;
        top: 38px;
        width: 100%;
        min-height: 40px;
        .revenue_statistics_money_icon{
        top: 38px;
        width:28px;
        height:40px;
        color: #fff;
        font-family: PingFang-SC-Bold;
        font-weight: Bold;
        font-size: 22px;
        }
        .revenue_statistics_money_number{
          width:558px;
          height:140px;
          color: #fff;
          font-family: PingFang-SC-Bold;
          font-weight: Bold;
          font-size: 29px;
        }
        p{
          margin: 0 auto;
          width:84px;
          height:20px;
          color: #fff;
          font-family: PingFang-SC-Bold;
          font-weight: Regular;
          font-size: 20px;
          margin-top: 19px;
        }
      }
    }
    .revenue_statistics_foot{
      position: absolute;
      left: 20px;
      top: 228px;
      width:558px;
      height:155px;
      ul{
        width: 100%;
        height: 100%;
        li{
          float: left;
          width: 186px;
          height: 100%;
          position: relative;
          text-align: center;
          .revenue_statistics_foot_money_icon{
            color: #333;
            font-family: PingFang-SC-Bold;
            font-weight: Bold;
            font-size: 20px;
          }
          .revenue_statistics_foot_money_number{
            position: absolute;
            left: 36px;
            top: 57px;
            width:96px;
            height:23px;
            color: #333;
            font-family: PingFang-SC-Bold;
            font-weight: Bold;
            font-size: 29px;
            margin-left: 10px;
            text-align: center;
          }
          p{
            position: absolute;
            left: 41px;
            top: 98px;
            width:100px;
            height:23px;
            color: #999;
            font-size:24px;
            font-family: PingFang-SC-Bold;
            font-weight: Regular;
            padding-top: 2px;
          }
        }
      }
    }
  }
  .team_statistics_box{
    height: 75px;
    width: 599px;
    position: relative;
    left: 20px;
    top: 144px;
    z-index: 100;
    background-color: #fff;
    .team_statistics{
      height: 75px;
      width: 599px;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 100;
      font-size: 29px;
      span{
        position: absolute;
        top: 24px;
        left: 20px;
        height: 27px;
        width:118px;
        color: #333;
        font-weight: Regular;
        font-family: PingFang-SC-Regular;
      }
      img{
        position: absolute;
        top: 25px;
        right: 20px;
        height: 23px;
        width:13px;
      }
    }
    .team_statistics_line{
      height: 1px;
      width: 579px;
      position: absolute;
      left: 20px;
      top: 75px;
      z-index: 100;
      background-color: #E8E8EA;
    }
    .team_member_statement{
      height: 75px;
      width: 599px;
      position: absolute;
      left: 0px;
      top: 75px;
      z-index: 100;
      font-size: 29px;
      color: #333333;
      span{
        position: absolute;
        top: 24px;
        left: 20px;
        height: 27px;
        width:208px;
        color: #333333;
        font-weight: Regular;
        font-family: PingFang-SC-Regular;
      }
      img{
        position: absolute;
        top: 25px;
        right: 20px;
        height: 23px;
        width:13px;
      }
    }
  }
  .foot_text{
    position: relative;
    top: 170px;
    left: 263px;
    height: 23px;
    width:130px;
    font-size: 20px;
    color: #999;
    font-weight: Regular;
    font-family: PingFang-SC-Regular;
  }
}
.select_button{
  background-color: #FF5100;
  color: #fff!important;
}
.no_select_button{
  background-color: #fff!important;
  color: #FF5100;
}
</style>
