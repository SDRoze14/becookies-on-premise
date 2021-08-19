import Vue from 'vue'

import BaseIcon from '@/components/base/base-icon'
import BaseInput from '@/components/base/base-input'
import BaseButton from '@/components/base/base-button'
import BaseDropdown from '@/components/base/base-dropdown'
import BaseDropdownItem from '@/components/base/base-dropdown-item'
import BaseModal from '@/components/base/base-modal'
import BaseTabs from '@/components/base/base-tabs'
import BaseToggle from '@/components/base/base-toggle'
import BaseRadio from '@/components/base/base-radio'
import BaseCheck from '@/components/base/base-check'
import BaseDialog from '@/components/base/base-dialog'
import BaseTooltip from '@/components/base/base-tooltip'
import BaseDoughnutChart from '@/components/base/base-doughnut-chart'
import BaseColorPicker from '@/components/base/base-color-picker'

Vue.component('base-icon', BaseIcon)
Vue.component('base-input', BaseInput)
Vue.component('base-button', BaseButton)
Vue.component('base-dropdown', BaseDropdown)
Vue.component('base-dropdown-item', BaseDropdownItem)
Vue.component('base-modal', BaseModal)
Vue.component('base-tabs', BaseTabs)
Vue.component('base-toggle', BaseToggle)
Vue.component('base-radio', BaseRadio)
Vue.component('base-check', BaseCheck)
Vue.component('base-dialog', BaseDialog)
Vue.component('base-tooltip', BaseTooltip)
Vue.component('base-doughnut-chart', BaseDoughnutChart)
Vue.component('base-color-picker', BaseColorPicker)

import Navbar from '@/components/layout/navbar'
import Footerbar from '@/components/layout/footerbar'
import AuthNavbar from '@/components/layout/auth-navbar'
import AuthFooterbar from '@/components/layout/auth-footerbar'
import Leftbar from '@/components/layout/leftbar'
import Blank from '@/components/layout/blank'

Vue.component('navbar', Navbar)
Vue.component('footerbar', Footerbar)
Vue.component('auth-navbar', AuthNavbar)
Vue.component('auth-footerbar', AuthFooterbar)
Vue.component('leftbar', Leftbar)
Vue.component('blank', Blank)

import SelectDomain from '@/components/domain/select-domain'
import SelectOrganizations from '@/components/organizations/select-organizations'

Vue.component('select-domain', SelectDomain)
Vue.component('select-organizations', SelectOrganizations)
