import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  dpr: '', // 设备像素比
  userType: '', // 用户类型
  have_order: true // 是否有订单
}

const actions = {
  PostDpr (context) { // 输出设备像素比
    context.commit('GetDpr')
  }
}

const mutations = {
  GetDpr () { // 得到设备像素比
    state.dpr = window.devicePixelRatio
  }
}
export default new Vuex.Store({
  state,
  actions,
  mutations
})
