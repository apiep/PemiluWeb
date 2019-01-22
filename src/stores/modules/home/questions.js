import ApiHomeQuestions from '@/services/api/home/questions'
// initial state
const state = {
  paginations: {
    page: 1,
    perPage: 5,
    total: 0,
    isLast: false
  },
  feedsQuestions: []
}

// actions
const actions = {
  homeQuestions({
    commit,
    state
  }, payload) {
    commit('loadingLottie/playLoading', {}, {
      root: true
    })
    ApiHomeQuestions.homeQuestions(state.paginations.page, state.paginations.perPage, result => {
      commit('loadingLottie/stopLoading', {}, {
        root: true
      })
      commit('getHomeQuestions', result.data.data)
    })
  },

  nextPage({
    commit
  }) {
    commit('nextPage')
  },

  updateHomeQuestions({
    commit,
    state
  }, id) {
    commit('loadingLottie/playLoading', {}, {
      root: true
    })
    ApiHomeQuestions.homeQuestions(state.paginations.page, state.paginations.perPage, result => {
      commit('loadingLottie/stopLoading', {}, {
        root: true
      })
      commit('updateHomeQuestions', result.data.data)
    })
  }
}

// mutations
const mutations = {
  getHomeQuestions(state, data) {
    state.feedsQuestions = data.questions
    state.paginations.total = data.meta.pages.total
  },

  nextPage(state) {
    state.paginations.page++
  },
  updateHomeQuestions(state, data) {
    if (data.meta.pages.total == state.paginations.page) {
      state.paginations.isLast = true
    }
    state.feedsQuestions.push.apply(state.feedsQuestions, data.questions)
  }
}

// getters
const getters = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}