<template>
  <div class="statistics_contain">
      <VHead></VHead>
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
            <li>
              <div class="circle" style="background:#FF5100"> </div><span>直属：</span><span class="number">{{underCount}}</span>
            </li>
            <li>
              <div class="circle" style="background:#0057FF"> </div><span>推荐：</span><span class="number">{{referCount}}</span>
            </li>
            <li>
              <div class="circle" style="background:#FF8F00"> </div><span>运营商：</span><span class="number">{{agentCount}}</span>
            </li>
          </ul>
        </div>
        <div class="zhishunum">{{underCountPercent}}%</div>
        <div class="zhishu">直属</div>
        <div class="team_situation_right">
          <v-chart id="canvas"
            :data="data"
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
              <span class="data_statistics_foot_money_icon">￥</span>
              <span class="data_statistics_foot_money_number">{{commission}}</span>
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
              <span class="revenue_statistics_foot_money_icon">￥</span>
              <span class="revenue_statistics_foot_money_number">{{lastMonthCommission}}</span>
              <p>上月结算</p>
            </li>
            <li>
              <span class="revenue_statistics_foot_money_icon">￥</span>
              <span class="revenue_statistics_foot_money_number">{{currentMonthTkMoney}}</span>
              <p>本月预估</p>
            </li>
            <li>
              <span class="revenue_statistics_foot_money_icon">￥</span>
              <span class="revenue_statistics_foot_money_number">{{lastMonthTkMoney}}</span>
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
// import asyncfunc from '@/common/asyncfunc'
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, VPie, VGuide, VScale } from 'vux'
import foot from '@/components/foot'
import VHead from '@/components/header'
import ProgressCircle from '@/components/Page/Statistics/ProgressCircle'
var data = [
  { name: '直属', percent: localStorage.getItem('underCount'), a: '1' },
  { name: '运营商', percent: localStorage.getItem('referCount'), a: '1' },
  { name: '团队人数', percent: localStorage.getItem('agentCount'), a: '1' }
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
    VHead,
    ProgressCircle
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
      referCount: '', // 推荐
      agentCount: '', // 代理商
      underCountPercent: '', // 直属占比
      referCountPercent: '', // 推荐占比
      agentCountPercent: '', // 代理商占比
      map,
      htmlOptions: {
        position: [ '50%', '50%' ],
        html:
        `<div style="width: 250px;height: 40px;text-align: center;">
          <div style="font-size: 24px" ref='sum_percent'></div>
          <div style="font-size: 16px;margin-top:10px;color:#999"></div>
        </div>`
      },
      legendOptions: {
        position: 'left',
        itemFormatter (val) {
          return val + '  ' + map[val]
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
    this.GetTeamSituation()
    this.IsSelectButton1()
    this.GetrevenueStatistics()
  },
  // watch: {
  //   '$route': {
  //     handler (route) {
  //       const that = this
  //       if (route.name === 'Statistics') {
  //         that.GetTeamSituation()
  //         that.IsSelectButton1()
  //         that.GetrevenueStatistics()
  //       }
  //     }
  //   }
  // },
  methods: {
    // GetTeamSituation () {
    //   console.log(2222)
    //   let uid = localStorage.getItem('uid')
    //   let loginToken = localStorage.getItem('loginToken')
    //   this.axios.get('/user/relation/auth/itocInfo?uid=' + uid, {
    //     headers: {'token': loginToken}
    //   })
    //   .then(response => {
    //     console.log(response)
    //   })
    // }

    // 收益统计
    GetrevenueStatistics () {
      let uid = localStorage.getItem('uid')
      func.ajaxGet('http://47.107.48.61:8820/account/auth/findCommission?osType=0&userId=' + uid,
      response => {
        this.lastMonthCommission = response.data.data.lastMonthCommission
        this.currentMonthTkMoney = response.data.data.currentMonthTkMoney
        this.lastMonthTkMoney = response.data.data.lastMonthTkMoney
        this.totalIncome = response.data.data.totalIncome
      })
    },
    // 今日数据统计
    IsSelectButton1 () {
      this.is_select_buttn = true
      let uid = localStorage.getItem('uid')
      func.ajaxGet('http://47.107.48.61:8820/account/auth/findCommission?osType=0&userId=' + uid,
      response => {
        this.payCount = response.data.data.payCount
        this.commission = response.data.data.commission
        this.GetDataStatistics()
      })
    },
    // 昨日数据统计
    IsSelectButton2 () {
      this.is_select_buttn = false
      let uid = localStorage.getItem('uid')
      func.ajaxGet('http://47.107.48.61:8820/account/auth/findCommission?osType=0&userId=' + uid,
      response => {
        this.payCount = response.data.data.yesterdayPayCount
        this.commission = response.data.data.yesterdayCommission
        this.GetDataStatistics()
      })
    },
    GetDataStatistics () {
      let uid = localStorage.getItem('uid')
      if (this.is_select_buttn === false) {
        this.beforeTime = 1
      } else {
        this.beforeTime = 0
      }
      func.ajaxGet('http://47.107.48.61:8820/user/relation/auth/itocTeamSum?osType=0&uid=' + uid + '&beforeTime=' + this.beforeTime,
        response => {
          this.newTeam = response.data.data
        })
    },
    GetTeamSituation () {
      let uid = localStorage.getItem('uid')
      // asyncfunc.myGet('http://47.107.48.61:8820/user/relation/auth/itocInfo?osType=0&uid=' + uid).then((response) => {
      //   this.underCount = response.data.underCount
      //   this.referCount = response.data.referCount
      //   this.agentCount = response.data.agentCount
      //   let sum = this.underCount + this.referCount + this.agentCount
      //   this.data[0]['percent'] = this.underCount / sum
      //   this.data[1]['percent'] = this.referCount / sum
      //   this.data[2]['percent'] = this.agentCount / sum
      //   this.underCountPercent = this.underCount / sum * 100
      // })
      func.ajaxGet('http://47.107.48.61:8830/relation/auth/itocInfo?uid=' + uid,
      response => {
        this.underCount = response.data.data.underCount
        this.referCount = response.data.data.referCount
        this.agentCount = response.data.data.agentCount
        let sum = this.underCount + this.referCount + this.agentCount
        this.data[0]['percent'] = this.underCount / sum
        this.data[1]['percent'] = this.referCount / sum
        this.data[2]['percent'] = this.agentCount / sum
        this.underCountPercent = this.underCount / sum * 100
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#canvas{
  position:absolute;
  top: 30px;
  left: -24px;
}
.statistics_contain{
  width: 100%;
  min-height: 1390px;
  position: flex;
  margin: 0px;
  padding: 0px;
  background-color: #F5F5F5;
  padding-bottom: 85px;
  .left{
  width: 20px;
  height: 480px;
  position: fixed;
  background: #F5F5F5;
  left: 0px;
  top: 64px;
  z-index: 1000;
  }
  .right{
  width: 20px;
  height: 480px;
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
      left: 344px;
      width: 60px;
      height: 60px;
      z-index: 1000;
      font-size: 29px;
    }
    .zhishu{
      position:absolute;
      top: 270px;
      left: 344px;
      width: 60px;
      height: 60px;
      z-index: 1000;
      font-size: 29px;
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
          width:186px;
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
            position: absolute;
            left: 21px;
            top: 64px;
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
            width:26px;
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
            top: 98px;
            width:150px;
            height:23px;
            color: #999;
            font-size:24px;
            font-family: PingFang-SC-Bold;
            font-weight: Regular;
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
            position: absolute;
            left: 41px;
            top: 60px;
            width:26px;
            height:16px;
            color: #333;
            font-family: PingFang-SC-Bold;
            font-weight: Bold;
            font-size: 20px;
          }
          .revenue_statistics_foot_money_number{
            position: absolute;
            left: 46px;
            top: 57px;
            width:96px;
            height:23px;
            color: #333;
            font-family: PingFang-SC-Bold;
            font-weight: Bold;
            font-size: 29px;
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
