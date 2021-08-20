export const state = () => {
  return {
    user: {},
    token: '',
    refresh_token: '',
    isShowMenuToggle: true,
    role: 1
  }
}

export const getters = {
  getToken: (state) => {
    return localStorage.getItem('token') || state.token
  },
  getRefreshToken: (state) => {
    return localStorage.getItem('refresh_token') || state.refresh_token
  },

  getUser: (state) => {
    const user = localStorage.getItem('user')
    const u = user ? JSON.parse(user) : {}
    return u
  },
  getIsShowMenuToggle: (state) => {
    return state.isShowMenuToggle
  },
  getRole: (state) => {
    return localStorage.getItem('role') || state.role
  }
}

export const mutations = {
  async SET_TOKEN(state, token) {
    localStorage.setItem('token', token)
    state.token = token
  },
  SET_REFRESH_TOKEN(state, refresh_token) {
    localStorage.setItem('refresh_token', refresh_token)
    state.refresh_token = refresh_token
  },
  SET_USER(state, user) {
    const u = JSON.stringify(user)
    localStorage.setItem('user', u)
    state.user = user
  },
  CLEAR_USER(state) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('organization_id')
    localStorage.removeItem('application')
    localStorage.removeItem('role')
    state.user = {}
    state.token = ''
    state.refresh_token = ''
  },
  SET_ISSHOWMENUTOGGLE(state, is) {
    state.isShowMenuToggle = is
  },
  SET_ROLE(state, role) {
    localStorage.setItem('role', role)
    state.role = role
  }
}

export const actions = {
  async signup({ commit, dispatch }, form) {
    const self = this
    return await self.$api
      .signup(form)
      .then(async (response) => {
        return undefined
      })
      .catch((error) => {
        return error
      })
  },
  async signupTest({ commit, dispatch }, form) {
    const self = this
    return await self.$api
      .signupTest(form)
      .then(async (response) => {
        return response
      })
      .catch((error) => {
        return error
      })
  },
  async login({ commit, dispatch }, { email, password, type }) {
    const self = this
    return await self.$api
      .login({
        email,
        password,
        type,
      })
      .then(async (response) => {
        await commit('SET_TOKEN', response.data.access_token)
        await commit('SET_REFRESH_TOKEN', response.data.refresh_token)

        await dispatch('me')
        return undefined
      })
      .catch((error) => {
        return error
      })
  },
  async me({ commit }) {
    const self = this
    return await self.$api
      .getMe()
      .then(async (response) => {
        await commit('SET_USER', response.data)
      })
      .catch((error) => {
        return error
      })
  },

  async logout({ commit }) {
    await commit('CLEAR_USER')
  },
}
