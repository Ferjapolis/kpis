import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    kpi: null,
    datos: [],
    area: null,
    guardado: false
  },
  mutations: {
    selectKpi (state, item) {
      state.kpi = item
    },
    selectArea (state, item) {
      state.area = item
    },
    selectKpidatos (state, item) {
      state.datos = item
    },
    estado (state, item) {
      state.guardado = item
    }
  },
  actions: {
  },
  modules: {
  }
})
