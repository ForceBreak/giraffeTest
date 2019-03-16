export const state = () => ({
  showLogin: false,
  user: {
    login: false
  },
  passInvalid: '',
  headers: [
    {
      text: 'Title',
      align: 'left',
      sortable: false,
      value: 'title'
    },
    { text: 'Description', value: 'description', sortable: false },
    { text: 'Author', value: 'author', sortable: false },
    { text: 'Date', value: 'created_at_datetime', sortable: false },
    { text: 'Actions', value: 'delete', sortable: false }
  ],
  ads: [
    {
      id: 1,
      title: 'Объявление 1',
      description: 'Описание объявления 1',
      author: 'Автор 1',
      created_at_datetime: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
    },
    {
      id: 2,
      title: 'Объявление 2',
      description: 'Описание объявления 2',
      author: 'Автор 2',
      created_at_datetime: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
    },
    {
      id: 3,
      title: 'Объявление 3',
      description: 'Описание объявления 3',
      author: 'Автор 3',
      created_at_datetime: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
    },
    {
      id: 4,
      title: 'Объявление 4',
      description: 'Описание объявления 4',
      author: 'Автор 4',
      created_at_datetime: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
    },
    {
      id: 5,
      title: 'Объявление 5',
      description: 'Описание объявления 5',
      author: 'Автор 5',
      created_at_datetime: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
    },
    {
      id: 6,
      title: 'Объявление 6',
      description: 'Описание объявления 6',
      author: 'Автор 6',
      created_at_datetime: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
    },
    {
      id: 7,
      title: 'Объявление 7',
      description: 'Описание объявления 7',
      author: 'Автор 7',
      created_at_datetime: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
    },
    {
      id: 8,
      title: 'Объявление 8',
      description: 'Описание объявления 8',
      author: 'Автор 8',
      created_at_datetime: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
    }
  ]
})

export const getters = {
  SHOW_LOGIN (state) {
    return state.showLogin
  },
  PASS_INVALID (state) {
    return state.passInvalid
  },
  USER_LOGIN (state) {
    return state.user.login
  },
  ADS (state) {
    return state.ads
  },
  ADS_HEADERS (state) {
    return state.headers
  }
}

export const mutations = {
  SHOW_SIGNIN (state, payload) {
    state.showLogin = payload
  },
  SET_USER (state, payload) {
    state.user.login = payload.login
  },
  PASS_INVALID (state, payload) {
    state.passInvalid = payload
  },
  SIGN_OUT (state, payload) {
    state.user.login = payload
  },
  CREATE_AD (state, payload) {
    state.ads.push(payload)
  },
  SAVE_AD (state, payload) {
    state.ads.forEach((element, index) => {
      if (Number(element.id) === Number(payload.id)) {
        state.ads[index].title = payload.title
        state.ads[index].description = payload.description
        state.ads[index].created_at_datetime = payload.created_at_datetime
      }
    })
  },
  DELETE_AD (state, payload) {
    let indexToDelete
    state.ads.forEach((element, index) => {
      if (Number(element.id) === Number(payload)) {
        indexToDelete = index
      }
    })
    state.ads.splice(indexToDelete, 1)
  }
}

export const actions = {
  SIGNIN ({ commit }, payload) {
    commit('PROCESSING', true, { root: true })
    let isCreated = localStorage.getItem(payload.login)
    if (!isCreated) {
      localStorage.setItem(payload.login, payload.password)
      commit('SHOW_SIGNIN', false)
      commit('SET_USER', payload)
      commit('PROCESSING', false, { root: true })
    } else if (isCreated && isCreated === payload.password) {
      commit('SHOW_SIGNIN', false)
      commit('SET_USER', payload)
      commit('PROCESSING', false, { root: true })
    } else {
      commit('PASS_INVALID', 'Пароль неверный')
      commit('PROCESSING', false, { root: true })
    }
  },
  SIGN_OUT ({ commit }) {
    commit('SIGN_OUT', false)
  },
  CREATE_AD ({ commit }, payload) {
    commit('CREATE_AD', payload)
  },
  DELETE_AD ({ commit }, payload) {
    commit('DELETE_AD', payload)
  },
  SAVE_AD ({ commit }, payload) {
    commit('SAVE_AD', payload)
  }
}
