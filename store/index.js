export const state = () => ({
  processing: false,
  darkMode: true
})

export const getters = {
  DARK_MODE (state) {
    return state.darkMode
  },
  PROCESSING (state) {
    return state.processing
  }
}

export const mutations = {
  SET_APP_MODE (state) {
    state.darkMode = !state.darkMode
  },
  PROCESSING (state, payload) {
    state.processing = payload
  }
}

export const actions = {
  nuxtClientInit ({ commit, state, dispatch }, { req }) {
    if (state.user.user.login === false) {
      this.$router.push('index')
      console.log(this.$router)
    }
  }
}
