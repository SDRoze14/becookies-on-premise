import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5009ab4d = () => interopDefault(import('../pages/categorization/index.vue' /* webpackChunkName: "pages/categorization/index" */))
const _68d1ac83 = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _50c4df41 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _27a06d76 = () => interopDefault(import('../pages/faq.vue' /* webpackChunkName: "pages/faq" */))
const _1a6c8258 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _062b665a = () => interopDefault(import('../pages/policy.vue' /* webpackChunkName: "pages/policy" */))
const _1443efee = () => interopDefault(import('../pages/reports.vue' /* webpackChunkName: "pages/reports" */))
const _43cf4d7c = () => interopDefault(import('../pages/signup/index.vue' /* webpackChunkName: "pages/signup/index" */))
const _1fe94382 = () => interopDefault(import('../pages/signup25032021/index.vue' /* webpackChunkName: "pages/signup25032021/index" */))
const _0a7ac514 = () => interopDefault(import('../pages/terms.vue' /* webpackChunkName: "pages/terms" */))
const _1ecf82af = () => interopDefault(import('../pages/user/index.vue' /* webpackChunkName: "pages/user/index" */))
const _174f8d48 = () => interopDefault(import('../pages/websites/index.vue' /* webpackChunkName: "pages/websites/index" */))
const _7e157b5a = () => interopDefault(import('../pages/password/change.vue' /* webpackChunkName: "pages/password/change" */))
const _51568efc = () => interopDefault(import('../pages/password/reset.vue' /* webpackChunkName: "pages/password/reset" */))
const _07d28e0a = () => interopDefault(import('../pages/signup/confirmation.vue' /* webpackChunkName: "pages/signup/confirmation" */))
const _b1057372 = () => interopDefault(import('../pages/websites/_id/index.vue' /* webpackChunkName: "pages/websites/_id/index" */))
const _21c2a13e = () => interopDefault(import('../pages/websites/_id/re-assign.vue' /* webpackChunkName: "pages/websites/_id/re-assign" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/categorization",
    component: _5009ab4d,
    name: "categorization___th"
  }, {
    path: "/dashboard",
    component: _68d1ac83,
    name: "dashboard___th"
  }, {
    path: "/en",
    component: _50c4df41,
    name: "index___en"
  }, {
    path: "/faq",
    component: _27a06d76,
    name: "faq___th"
  }, {
    path: "/login",
    component: _1a6c8258,
    name: "login___th"
  }, {
    path: "/policy",
    component: _062b665a,
    name: "policy___th"
  }, {
    path: "/reports",
    component: _1443efee,
    name: "reports___th"
  }, {
    path: "/signup",
    component: _43cf4d7c,
    name: "signup___th"
  }, {
    path: "/signup25032021",
    component: _1fe94382,
    name: "signup25032021___th"
  }, {
    path: "/terms",
    component: _0a7ac514,
    name: "terms___th"
  }, {
    path: "/user",
    component: _1ecf82af,
    name: "user___th"
  }, {
    path: "/websites",
    component: _174f8d48,
    name: "websites___th"
  }, {
    path: "/en/categorization",
    component: _5009ab4d,
    name: "categorization___en"
  }, {
    path: "/en/dashboard",
    component: _68d1ac83,
    name: "dashboard___en"
  }, {
    path: "/en/faq",
    component: _27a06d76,
    name: "faq___en"
  }, {
    path: "/en/login",
    component: _1a6c8258,
    name: "login___en"
  }, {
    path: "/en/policy",
    component: _062b665a,
    name: "policy___en"
  }, {
    path: "/en/reports",
    component: _1443efee,
    name: "reports___en"
  }, {
    path: "/en/signup",
    component: _43cf4d7c,
    name: "signup___en"
  }, {
    path: "/en/signup25032021",
    component: _1fe94382,
    name: "signup25032021___en"
  }, {
    path: "/en/terms",
    component: _0a7ac514,
    name: "terms___en"
  }, {
    path: "/en/user",
    component: _1ecf82af,
    name: "user___en"
  }, {
    path: "/en/websites",
    component: _174f8d48,
    name: "websites___en"
  }, {
    path: "/password/change",
    component: _7e157b5a,
    name: "password-change___th"
  }, {
    path: "/password/reset",
    component: _51568efc,
    name: "password-reset___th"
  }, {
    path: "/signup/confirmation",
    component: _07d28e0a,
    name: "signup-confirmation___th"
  }, {
    path: "/en/password/change",
    component: _7e157b5a,
    name: "password-change___en"
  }, {
    path: "/en/password/reset",
    component: _51568efc,
    name: "password-reset___en"
  }, {
    path: "/en/signup/confirmation",
    component: _07d28e0a,
    name: "signup-confirmation___en"
  }, {
    path: "/en/websites/:id",
    component: _b1057372,
    name: "websites-id___en"
  }, {
    path: "/en/websites/:id/re-assign",
    component: _21c2a13e,
    name: "websites-id-re-assign___en"
  }, {
    path: "/websites/:id",
    component: _b1057372,
    name: "websites-id___th"
  }, {
    path: "/websites/:id/re-assign",
    component: _21c2a13e,
    name: "websites-id-re-assign___th"
  }, {
    path: "/",
    component: _50c4df41,
    name: "index___th"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
