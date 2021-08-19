let basePath = '/api/v1'

let headerJson = {
  'Content-Type': 'application/json',
}
let headerAuth = {
  Authorization: true,
}
let headerAuthJson = {
  Authorization: true,
  'Content-Type': 'application/json',
}
let headerAuthForm = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: true,
}

let headerXAPI = {
  Authorization: true,
  'x-api-key': 'v6ZHCVxbek',
  'Content-Type': 'application/json',
}

export default ({ app }, inject) => {
  inject('api', {

    // GUEST
    login: (form) => {
      return app.$axios.post(`${basePath}/guest/login`, form, {
        headers: headerJson
      })
    },
    signup: (form) => {
      return app.$axios.post(`${basePath}/guest/signup`, form, {
        headers: headerJson
      })
    },
    createPassword: (form) => {
      return app.$axios.post(`${basePath}/guest/password`, form, {
        headers: headerJson
      })
    },
    forgotPassword: (form) => {
      return app.$axios.post(`${basePath}/guest/forgotPassword`, form, {
        headers: headerJson
      })
    },
    resetPassword: (form) => {
      return app.$axios.post(`${basePath}/guest/resetPassword`, form, {
        headers: headerJson
      })
    },

    // TOKEN
    refreshToken: (form) => {
      return app.$axios.post(`${basePath}/token`, form, {
        headers: headerJson
      })
    },

    // ME
    getMe: () => {
      return app.$axios.get(`${basePath}/me`, {
        headers: headerAuthJson
      })
    },
    changePassword: (form) => {
      return app.$axios.put(`'${basePath}/me/password`, form, {
        headers: headerAuthJson
      })
    },

    // ORGANIZATIONS
    getOrganization: (id) => {
      return app.$axios.get(`${basePath}/organizations/${id}`, {
        headers: headerAuthJson
      })
    },
    getMeOrganizations: () => {
      return app.$axios.get(`${basePath}/me/organizations`, {
        headers: headerAuthJson
      })
    },
    getUsersOrganization: (id) => {
      return app.$axios.get(`${basePath}/organizations/${id}/users`, {
        headers: headerAuthJson
      })
    },
    addUserToOrganization: (id, form) => {
      return app.$axios.post(`${basePath}/organizations/${id}/users`, form, {
        headers: headerAuthJson
      })
    },
    deleteUserFromOrganization: (id, uid) => {
      return app.$axios.delete(`${basePath}/organizations/${id}/users/${uid}`, {
        headers: headerAuthJson
      })
    },

    // APPLICATIONS
    createApplication: (form) => {
      return app.$axios.post(`${basePath}/applications`, form, {
        headers: headerAuthJson
      })
    },
    getMeApplications: (params) => {
      return app.$axios.get(`${basePath}/me/applications`, {
        headers: headerAuthJson,
        params: params
      })
    },
    getApplication: (id) => {
      return app.$axios.get(`${basePath}/applications/${id}`, {
        headers: headerAuthJson
      })
    },
    updateApplication: (id, form) => {
      return app.$axios.put(`${basePath}/applications/${id}`, form, {
        headers: headerAuthJson
      })
    },
    deleteApplication: (id) => {
      return app.$axios.delete(`${basePath}/applications/${id}`, {
        headers: headerAuthJson
      })
    },
    disableApplication: (id) => {
      return app.$axios.put(`${basePath}/applications/${id}/disable`, {}, {
        headers: headerAuthJson
      })
    },
    enableApplication: (id) => {
      return app.$axios.put(`${basePath}/applications/${id}`, {}, {
        headers: headerAuthJson
      })
    },
    getApplicationTemplate: (id) => {
      return app.$axios.get(`${basePath}/applications/${id}/template`, {
        headers: headerAuthJson
      })
    },
    updateApplicationTemplate: (id, form) => {
      return app.$axios.put(`${basePath}/applications/${id}/template`, form, {
        headers: headerAuthJson
      })
    },
    getApplicationCategories: (id) => {
      return app.$axios.get(`${basePath}/applications/${id}/categories`, {
        headers: headerAuthJson
      })
    },
    updateApplicationCategories: (id, cid, form) => {
      return app.$axios.put(`${basePath}/applications/${id}/categories/${cid}`, form, {
        headers: headerAuthJson
      })
    },
    getSummary: (id) => {
      return app.$axios.get(`${basePath}/applications/${id}/summary`, {
        headers: headerAuthJson
      })
    },
    getTemplateLogo: (id) => {
      return app.$axios.get(`${basePath}/applications/${id}/templateLogo`, {
        headers: headerAuthJson
      })
    },
    updateTemplateLogo: (id, form) => {
      return app.$axios.put(`${basePath}/applications/${id}/templateLogo`, form, {
        headers: headerAuthForm
      })
    },

    // CATEGORIES
    createCategory: (form) => {
      return app.$axios.post(`${basePath}/categories`, form, {
        headers: headerAuthJson
      })
    },
    getCategory: (id) => {
      return app.$axios.get(`${basePath}/categories/${id}`, {
        headers: headerAuthJson
      })
    },
    updateCategory: (id, form) => {
      return app.$axios.put(`${basePath}/categories/${id}`, form, {
        headers: headerAuthJson
      })
    },
    deleteCategory: (id) => {
      return app.$axios.delete(`${basePath}/categories/${id}`, {
        headers: headerAuthJson
      })
    },
    disableCategory: (id) => {
      return app.$axios.put(`${basePath}/categories/${id}`, {}, {
        headers: headerAuthJson
      })
    },
    enableCategory: (id) => {
      return app.$axios.post(`${basePath}/categories/${id}`, {}, {
        headers: headerAuthJson
      })
    },

    // COOKIES
    createCookie: (form) => {
      return app.$axios.post(`${basePath}/cookies`, form, {
        headers: headerAuthJson
      })
    },
    getCookies: (params) => {
      return app.$axios.get(`${basePath}/cookies`, {
        headers: headerAuthJson,
        params: params
      })
    },
    getCookie: (id) => {
      return app.$axios.get(`${basePath}/cookies/${id}`, {
        headers: headerAuthJson
      })
    },
    updateCookie: (id, form) => {
      return app.$axios.put(`${basePath}/cookies/${id}`, form, {
        headers: headerAuthJson
      })
    },
    deleteCookie: (id) => {
      return app.$axios.delete(`${basePath}/cookies/${id}`, {
        headers: headerAuthJson
      })
    },

    // CONSENTS
    getConsents: (params) => {
      return app.$axios.get(`${basePath}/consents`, {
        headers: headerAuthJson,
        params: params
      })
    },
    getConsentDailyReport: (params) => {
      return app.$axios.get(`${basePath}/consents/dailyReport`, {
        headers: headerAuthJson,
        params: params
      })
    },

    // CONSENT LOG
    getConsentLogs: (params) => {
       return app.$axios.get(`${basePath}/consentLogs`, {
         headers: headerAuthJson,
         params: params
       })
    },
    getConsentLogsDailyReport: (params) => {
      return app.$axios.get(`${basePath}/consentLogs/dailyReport`, {
        headers: headerAuthJson,
        params: params
      })
    },
  })
}
