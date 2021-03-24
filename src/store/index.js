import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import jobscan from './modules/jobscan'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    jobscan,
  }
})
