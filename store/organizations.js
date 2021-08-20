export const state = () => {
  return {
    list: [],
    organization_id: ''
  }
}

export const getters = {
  getList: (state) => {
    return state.list
  },
  getOrganizationId: (state) => {
    return localStorage.getItem('organization_id') || state.refresh_token
  }
}

export const mutations = {
  SET_LIST(state, list) {
    state.list = list
  },
  SET_ORGANIZATION_ID(state, organization_id) {
    localStorage.setItem('organization_id', organization_id)
    state.organization_id = organization_id
  }
}

export const actions = {
  async fetch({ commit }, params) {
    const self = this
    return await self.$api
      .getMeOrganizations(params)
      .then(async (response) => {
        await commit('SET_LIST', response.data)
        // await commit('SET_ORGANIZATION_ID', response.data[0].id)
      })
      .catch((error) => {
        return error
      })
  },
}
