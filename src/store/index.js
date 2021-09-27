import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    kpi: null,
    datos: []
  },
  mutations: {
    addKpi (state, item) {
      state.kpi = item
    }
  },
  actions: {
  },
  modules: {
  }
})
