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
  async fetch({ commit }, id) {
    const self = this
    return await self.$api
      .getUsersOrganization(id)
      .then(async (response) => {
        await commit('SET_LIST', response.data.entities)
      })
      .catch((error) => {
        return error
      })
  },
}
