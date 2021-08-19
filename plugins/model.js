let domain_sorts = [
  { value: 'updated_at', label: 'Latest update' },
  // { value: 'latest_scan_at', label: 'Scan date' },
  { value: 'created_at', label: 'Created date' },
]

let user_status = [
  { value: undefined, label: 'All' },
  { value: true, label: 'Active' },
]

let layouts = [
  {
    img: '/images/web-layout-bottom.svg',
    value: 0,
  },
  {
    img: '/images/web-layout-top.svg',
    value: 1,
  },
  {
    img: '/images/web-layout-overlay.svg',
    value: 5,
  },
]

let themes = [
  {
    img: '/images/theme-white.png',
    title: 'White',
    des: 'Backgroud color is white',
    value: 'white',
  },
  {
    img: '/images/theme-black.png',
    title: 'Dark',
    des: 'Backgroud color is dark',
    value: 'dark',
  },
  {
    img: '/images/theme-gsb.png',
    title: 'GSB',
    des: 'Backgroud color is GSB',
    value: 'gsb',
  },
]

let languages = [
  { key: 'en', label: 'English' },
  { key: 'th', label: 'Thai' },
  // { key: 'jp', label: 'JP - Japan' },
  // { key: 'cn', label: 'CN - China' },
]

let cookie_expiry = [
  // { value: 'SESSION', label: 'Session' },
  { value: 43200, label: '0 Day(s)' },
  { value: 86400, label: '1 Day(s)' },
  { value: 2419200, label: '1 Month(s)' },
  { value: 31536000, label: '1 Year(s)' },
  { value: 63072000, label: '2 Year(s)' },
]

let type_expiry = [
  { value: 'minute', label: 'Minute(s)'},
  { value: 'hour', label: 'Hour(s)'},
  { value: 'day', label: 'Day(s)'},
  { value: 'week', label: 'Weeks(s)'},
  { value: 'month', label: 'Month(s)'},
  { value: 'year', label: 'Year(s)'},
]

let cookie_type = [
  { value: 1, label: 'HTTP' },
  { value: 2, label: 'HTML' },
  // { value: 'Secure', label: 'Secure' },
]

import dayjs from 'dayjs'
import th from 'dayjs/locale/th'
// require()

export default ({ app }, inject) => {
  inject('model', {
    domain_sorts: domain_sorts,
    domainSorts: (value) => {
      let o = domain_sorts.find((e) => e.value === value)
      return o ? o : {}
    },
    user_status: user_status,
    userStatus: (value) => {
      let o = user_status.find((e) => e.value === value)
      return o ? o : {}
    },
    cookie_expiry: cookie_expiry,
    cookieExpiry: (value) => {
      let o = cookie_expiry.find((e) => e.value === value)
      return o ? o : {}
    },
    type_expiry: type_expiry,
    typeXepiry: (value) => {
      let o = type_expiry.find((e) => e.value === value)
      return o ? o : {}
    },
    cookie_type: cookie_type,
    cookieType: (value) => {
      let o = cookie_type.find((e) => e.value === value)
      return o ? o : {}
    },
    validDomain: (domain) => {
      var re = new RegExp(
        /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})(\/[a-z0-9-+\/]+)?/
      )
      return domain.match(re)
    },
    validateEmail: (email) => {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      )
        return true
      return false
    },
    layouts: layouts,
    layout: (value) => {
      let o = layouts.find((e) => e.value === value)
      return o ? o : {}
    },
    themes: themes,
    languages: languages,
    language: (key) => {
      let o = languages.find((e) => e.key === key)
      return o ? o : {}
    },
    digit: (num, size) => {
      var s = String(num)
      while (s.length < (size || 2)) {
        s = '0' + s
      }
      return s
    },
    getDate: (date) => {
      return dayjs(date).format('DD/MM/YYYY')
    },
    getDateTime: (date) => {
      return dayjs(date).format('DD/MM/YYYY | HH:mm')
    },
    getFormatISO: (date) => {
      return dayjs(date).format('YYYY-MM-DDTHH:mm:ss[Z]')
    },
    getDateInput: (date) => {
      return dayjs(date).format('YYYY-MM-DD')
    },
    getMonthInput: (date) => {
      return dayjs(date).format('YYYY-MM')
    },
    getDateAndMonth: (date) => {
      return dayjs(date).format('DD-MM')
    },
    url: () => {
      return `https://core.staging.becookies.tech/onprem/script.js`
    },
    calcudateExpiry: (sec) => {
      let time
      if (sec%31556952 == 0) {
        time = `${sec/31556952} Year(s)`
      } else if (sec%262800 == 0) {
        if ((sec/262800)%12) {
          time = `${(sec/262800)/12} Year(s)`
        } else {
          time = `${sec/262800} Month(s)`
        }
      } else if (sec%604800 == 0) {
        time = `${sec/604800} Week(s)`
      } else if (sec%86400 == 0) {
        if ((sec%86400)%30 == 0) {
          if (((sec/86400)/30)%12 == 0) {
            time = `${((sec/86400)/30)/12} Year(s)`
          } else if ((sec/86400)%30 == 0) {
            time = `${(sec/86400)/30} Month(s)`
          } else {
            time = `${sec/86400} Day(s)`
          }
        } else {
          time = `${sec/86400} Day(s)`
        }
      } else if (sec%3600 == 0) {
        if ((sec/3600)%24 == 0) {
          time = `${(sec/3600)/24} Day(s)`
        } else if (((sec/3600)/24)%30 == 0) {
          time = `${((sec/3600)/24)/30} Month(s)`
        } else if (((sec/3600)/24)%4 == 0) {
          time = `${((sec/3600)/24)/4} Week(s)`
        } else if ((((sec/3600)/24)/30)%12 == 0) {
          time = `${(((sec/3600)/24)/30)/12} Year(s)`
        } else {
          time = `${sec/3600} Hour(s)`
        }
      } else if (sec%60 == 0) {
        time = `${sec/60} Minute(s)`
      }
      return time
    }
  })
}
