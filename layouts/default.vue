<template>
  <div>
    <!-- header -->
    <div class="bg-gray-200">
      <div class="mx-auto container px-4 py-2">
        <div class="flex items-center justify-between">
          <!-- language -->
          <div class="flex items-center">
            <div>
              <base-dropdown :dropdownWidthFull="true">
                <div
                  slot="toggle"
                  class="flex items-center px-4 py-2 rounded-md bg-gray-300 text-gray-500 hover:text-gray-600"
                >
                  <base-icon icon="world" width="16" color="gray" />
                  <div class="text-sm">{{ $t('language') }}</div>
                  <base-icon
                    class="ml-5"
                    icon="dropdown"
                    width="10"
                    height="10"
                  ></base-icon>
                </div>
                <base-dropdown-item
                  class="px-8"
                  :class="{ 'bg-gray-200': $i18n.locale == 'th' }"
                  @click="changeLanguage('th')"
                >
                  ภาษาไทย
                </base-dropdown-item>
                <base-dropdown-item
                  class="px-8"
                  :class="{ 'bg-gray-200': $i18n.locale == 'en' }"
                  @click="changeLanguage('en')"
                >
                  English
                </base-dropdown-item>
              </base-dropdown>
            </div>

            <div class="mx-3">
              <select-organizations
                @change="selectOrganization"
              ></select-organizations>
            </div>
          </div>
          <!-- account -->
          <div>
            <base-dropdown>
              <div
                slot="toggle"
                class="flex items-start text-gray-500 hover:text-gray-600"
              >
                <div v-if="user.ldap_username" class="text-sm">
                  {{ `${user.first_name} ${user.last_name}` }}
                </div>
                <div v-else class="text-sm">{{ user.email }}</div>
                <base-icon
                  class="ml-5"
                  icon="dropdown"
                  width="10"
                  height="20"
                ></base-icon>
              </div>

              <base-dropdown-item @click="logoutClick" class="">
                {{ $t('navbar.logoutButton') }}
              </base-dropdown-item>
              <base-dropdown-item
                @click="userClick"
                v-if="role == 1000 || role == 10"
              >
                {{ $t('nav.user') }}
              </base-dropdown-item>
              <base-dropdown-item
                v-if="!user.ldap_username"
                @click="modelChangePasswordClick"
              >
                {{ $t('nav.changePassword') }}
              </base-dropdown-item>
            </base-dropdown>
          </div>
        </div>
      </div>
    </div>

    <!-- header-bar -->
    <div class="border-b border-gray-100">
      <div class="mx-auto container px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- logo -->
          <div class="">
            <router-link :to="{ path: localePath('index') }">
              <base-icon icon="logo-h" width="140" height="32" />
            </router-link>
          </div>
          <!-- menu -->
          <div class="flex space-x-2">
            <div
              v-for="(menu, i) in menus"
              :key="`menu-${i}`"
              class="rounded-full px-8 py-2 text-gray-500 hover:bg-gray-100"
              :class="{
                'bg-gray-200': menu.routeNames.includes(currentRouteName),
              }"
            >
              <router-link :to="{ path: localePath(menu.routerName) }">
                {{ menu.name }}
              </router-link>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>

    <div class="" style="min-height: calc(100vh - 56px - 73px - 57px)">
      <div class="mx-auto container px-4 py-8">
        <nuxt />
      </div>
    </div>

    <!-- footer -->
    <div class="">
      <div class="border-t border-gray-100 mx-auto container px-4 py-4">
        <div
          class="flex items-center justify-between text-gray-500 font-thin text-sm"
        >
          <div>© {{ year }} beCOOKIES.TECH | RST​</div>
          <div class="flex space-x-3">
            <nuxt-link :to="localePath('terms')"
              >TERMS &amp; Conditions</nuxt-link
            >
            <div>✦</div>
            <nuxt-link :to="localePath('policy')">Privacy Policy</nuxt-link>
            <!-- <div>{{$t('privacyPolicy')}}</div> -->
          </div>
        </div>
      </div>
    </div>

    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    ></loading>

    <change-pass ref="changePass"></change-pass>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import ChangePass from '@/components/user/change-pass'

export default {
  components: { Loading, ChangePass },
  computed: {
    isLoading() {
      return this.$store.getters['loading/getLoading']
    },
    // user() {
    //   return this.$store.getters['me/getUser']
    // },
    organizations() {
      return this.$store.getters['organizations/getList']
    },
    currentRouteName() {
      return this.$route.name
    },
    menus() {
      return [
        {
          name: this.$t('navbar.websites'),
          routerName: '/websites',
          routeNames: [
            'websites___th',
            'websites___en',
            'websites-id___th',
            'websites-id___en',
          ],
        },
        // {
        //   name: this.$t('navbar.categorization'),
        //   routerName: '/categorization',
        //   routeNames: ['categorization___th', 'categorization___en'],
        // },
        {
          name: this.$t('navbar.dashboard'),
          routerName: '/dashboard',
          routeNames: ['dashboard___th', 'dashboard___en'],
        },
      ]
    },
    year() {
      return new Date().getFullYear()
    },
    role() {
      return this.$store.getters['me/getRole']
    }
  },
  data() {
    return {
      user: {},
      organization: {},
    }
  },
  async mounted() {
    this.$store.dispatch('loading/setLoading', true)
    await this.$store.dispatch('organizations/fetch')

    await this.$store.dispatch('me/me')
    this.user = this.$store.getters['me/getUser']
    // await this.fetch()
    this.$store.dispatch('loading/setLoading', false)
  },
  methods: {
    async fetch() {
      await this.$store.dispatch('loading/setLoading', true)
      

      await this.$store.dispatch('loading/setLoading', false)
    },
    changeLanguage(lang) {
      this.$router.push(this.switchLocalePath(lang))
    },
    async selectOrganization(o) {
      // this.organization = o
      this.$store.commit('organizations/SET_ORGANIZATION_ID', o.id)
      
      // await this.fetch()
    },
    async logoutClick() {
      const self = this
      await self.$store.dispatch('me/logout')

      setTimeout(async () => {
        window.location = self.$router.options.base + 'login'
      }, 500)
    },
    modelChangePasswordClick() {
      this.$refs.changePass.show(this.user)
    },
    userClick() {
      this.$router.push({ path: this.localePath('user') })
    },
  },
}
</script>

<style>
.topbar {
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.15);
}
</style>
