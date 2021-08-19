export const state = () => {
  return {
    list: [],
  }
}

export const getters = {
  getList: (state) => {
    return state.list
  },
}

export const mutations = {
  SET_LIST(state, list) {
    state.list = list
  },
}

export const actions = {
  async fetch({ commit }, params) {
    const self = this
    return await self.$api
      .getCookies(params)
      .then(async (response) => {
        // var list = response.data.entities
        // list.forEach((c) => {
        //   if (
        //     c.cookieId == 'becookies-submitted' ||
        //     c.cookieId == 'becookies.clientId' ||
        //     c.cookieId == 'becookies.consentId'
        //   )
        //     c.editable = false
        //   else c.editable = true
        // })
        await commit('SET_LIST', response.data.entities)
      })
      .catch((error) => {})
  },
  async fetchAll({ commit }, params) {
    const self = this
    return await self.$api
      .reassignsAll(params)
      .then(async (response) => {
        await commit('SET_LIST', response.data)
      })
      .catch((error) => {})
  },
}
