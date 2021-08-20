const MAX_REQUESTS_COUNT = 1
const INTERVAL_MS = 20
var PENDING_REQUESTS = 0

const MAX_RENEW_TOKEN_FIAL_COUNT = 3
var RENEW_TOKEN_FIAL_COUNT = 0

export default function ({ $axios, store, redirect, req, res }) {
  if (process.server) {
    return
  }

  $axios.onRequest(
    (config) =>
      new Promise(async (resolve, reject) => {
        let interval = setInterval(() => {
          if (
            PENDING_REQUESTS < MAX_REQUESTS_COUNT ||
            config.url.endsWith('/api/v1/token')
          ) {
            PENDING_REQUESTS++
            clearInterval(interval)

            // add Authorization header
            if (config.headers.Authorization) {
              let token = localStorage.getItem('token')
              config.headers.Authorization = `Bearer ${token}`
              resolve(config)
            } else {
              resolve(config)
            }
          }
        }, INTERVAL_MS)
      })
  )

  $axios.onRequestError(
    (err) =>
      new Promise(async (resolve, reject) => {
        resolve(err.config)
      })
  )

  $axios.onResponse(
    (response) =>
      new Promise(async (resolve, reject) => {
        PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
        return resolve(response)
      })
  )

  $axios.onResponseError(
    (err) =>
      new Promise(async (resolve, reject) => {
        if (err.response.status == 401) {
          RENEW_TOKEN_FIAL_COUNT += 1
          if (RENEW_TOKEN_FIAL_COUNT > MAX_RENEW_TOKEN_FIAL_COUNT) {
            return reject(err)
          }

          // is expire && renew token
          let refresh_token = localStorage.getItem('refresh_token')
          let token = localStorage.getItem('token')
          return await $axios
            .post(
              '/api/v1/token',
              {
                refresh_token: refresh_token,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then(({ data }) => {
              store.commit('me/SET_TOKEN', data.access_token)
              localStorage.setItem('token', data.access_token)
              store.commit('me/SET_REFRESH_TOKEN', data.refresh_token)
              localStorage.setItem('refresh_token', data.refresh_token)
              console.log('renew token success')

              PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)

              RENEW_TOKEN_FIAL_COUNT = 0

              err.config.headers.Authorization = `Bearer ${token}`
              return resolve($axios(err.config))
            })
            .catch((error) => {
              console.log('renew token error:', error)

              PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)

              store.commit('me/CLEAR_USER')
              // await redirect('/login')
              redirect('login')
              return reject(err)
            })
        } else {
          PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)

          return reject(err)
        }
      })
  )
}
