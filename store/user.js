export const state = () => ({
  cookieId: '',
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
    let userInStorage = JSON.parse(localStorage.getItem(state.user.login))
    userInStorage.ads.push(payload)
    localStorage.setItem(state.user.login, JSON.stringify(userInStorage))
  },
  UPGRADE_ADS (state, payload) {
    let newList = state.ads.concat(payload)
    state.ads = newList
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
    let indexToDeleteFromStorage
    state.ads.forEach((element, index) => {
      if (Number(element.id) === Number(payload)) {
        indexToDelete = index
      }
    })
    state.ads.splice(indexToDelete, 1)

    let deleteFromStorage = JSON.parse(localStorage.getItem(state.cookieId))
    deleteFromStorage.ads.forEach((element, index) => {
      if (Number(element.id) === Number(payload)) {
        indexToDeleteFromStorage = index
      }
    })
    deleteFromStorage.ads.splice(indexToDeleteFromStorage, 1)

    localStorage.setItem(state.cookieId, JSON.stringify(deleteFromStorage))
  },
  SET_COOKIE (state, payload) {
    payload.path = payload.path || '/' // заполняем путь если не заполнен
    payload.days = payload.days || 10 // заполняем время жизни если не получен параметр
    let lastDate = new Date()
    lastDate.setDate(lastDate.getDate() + payload.days)
    let value = escape(payload.value) + ((payload.days == null) ? '' : '; expires=' + lastDate.toUTCString())
    document.cookie = payload.name + '=' + value + '; path=' + payload.path // вешаем куки
  },
  FILTER_COOKIE (state, payload) {
    let coockieArray = payload.split(';')
    coockieArray.forEach((element) => {
      let newElement = element.split('=')
      if (newElement[0] === 'userId' || newElement[0] === ' userId') {
        state.cookieId = newElement[1]
      }
    })
  }
}

export const actions = {
  SIGNIN ({ commit }, payload) {
    let isCreated = JSON.parse(localStorage.getItem(payload.login))
    if (!isCreated) {
      let userObj = {
        password: payload.password,
        ads: []
      }
      localStorage.setItem(payload.login, JSON.stringify(userObj))
      commit('SHOW_SIGNIN', false)
      commit('SET_USER', payload)
      commit('PROCESSING', false, { root: true })
      commit('SET_COOKIE', {
        name: 'userId',
        value: payload.login
      })
    } else if (isCreated && isCreated.password === payload.password) {
      commit('SHOW_SIGNIN', false)
      commit('SET_USER', payload)
      commit('UPGRADE_ADS', isCreated.ads)
      commit('PROCESSING', false, { root: true })
      commit('SET_COOKIE', {
        name: 'userId',
        value: payload.login
      })
    } else {
      commit('PASS_INVALID', 'Пароль неверный')
    }
  },
  SIGN_OUT ({ commit }) {
    commit('SIGN_OUT', false)
    commit('SET_COOKIE', {
      name: 'userId',
      value: ''
    })
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
