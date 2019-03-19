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
  nuxtClientInit ({ commit, state }) {
    let savedAds = []
    for (let index = 0; index < localStorage.length; index++) {
      let key = localStorage.key(index)
      let value = JSON.parse(localStorage.getItem(key))
      if (value.ads !== undefined) {
        let storageAds = savedAds.concat(value.ads)
        savedAds = storageAds
      }
    }
    commit('user/FILTER_COOKIE', document.cookie, { root: true })
    commit('user/UPGRADE_ADS', savedAds, { root: true })
    if (state.user.cookieId !== '') {
      commit('user/SET_USER', { login: state.user.cookieId }, { root: true })
    } else {
      commit('user/SIGN_OUT', false, { root: true })
    }
  }
}
