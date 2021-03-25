// API request functions
import {
  getJobs,
  getSkills,
} from '../../../api/jobscan'

const jobscan = {
  namespaced: true,

  state: {
    isLoading: false,
    skills: [],
    jobs: [],
  },

  actions: {
    setLoading({ commit }, data = true) {
      // Commit loading state in mutation
      return (async () => {
        // Commit orders state in mutation
        commit('SET_LOADING', data)
      })()
    },

    getJobs({ commit }, data) {
      return (async () => {
        const res = await getJobs(data)

        // Commit orders state in mutation
        commit('SET_JOBS', res.data)
      })()
    },

    getSkills({ commit }) {
      return (async () => {
        const res = await getSkills()

        commit('SET_SKILLS', res.data)
      })()
    },
  },

  mutations: {
    SET_LOADING: (state, data) => {
      state.isLoading = data
    },

    SET_JOBS: (state, data) => {
      state.jobs = data.jobs
    },

    SET_SKILLS: (state, data) => {
      state.skills = data.skills
    },
  },
}

export default jobscan
