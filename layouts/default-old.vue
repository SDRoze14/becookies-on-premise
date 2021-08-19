<template>
  <div class="flex h-screen bg-content">
    <leftbar />

    <div
      id="left-menu-hide"
      class="ml-64 w-screen h-screen fixed top-0 left-0 z-20 hidden"
      style="background: #0007"
      @click="hideLeftMenu"
    ></div>

    <div class="flex-1 overflow-y-auto">
      <div class="bg-white px-4 py-3 topbar flex justify-between">
        <div class="">
          <button
            @click="showLeftMenu"
            class="flex md:hidden items-center px-3 py-2 text-white border-white hover:text-gray-200 appearance-none focus:outline-none"
          >
            <base-icon icon="menu" color="gray" />
          </button>
        </div>
        <div>
          <base-dropdown>
            <div slot="toggle" class="flex items-center">
              <div class="flex-1 pr-4 text-right">
                <div class="text-sm text-gray-600">Welcom {{ user.name }}</div>
                <div class="text-xs text-gray-500">{{ user.email }}</div>
              </div>
              <div>
                <div
                  src=""
                  class="bg-gray-300 rounded-full w-10 h-10 object-cover"
                />
              </div>
            </div>

            <base-dropdown-item @click="logoutClick">
              Logout
            </base-dropdown-item>
          </base-dropdown>
        </div>
      </div>

      <div class="container mx-auto p-6 my-4">
        <nuxt />
      </div>
    </div>

    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    ></loading>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: { Loading },
  computed: {
    isLoading() {
      return this.$store.getters['loading/getLoading']
    },
    user() {
      return this.$store.getters['me/getUser']
    },
  },
  data() {
    return {}
  },
  methods: {
    showLeftMenu() {
      var leftMenu = document.getElementById('left-menu')
      var leftMenuHide = document.getElementById('left-menu-hide')
      leftMenu.classList.remove('hidden')
      leftMenu.classList.add('flex')
      leftMenu.classList.add('absolute')
      leftMenuHide.classList.remove('hidden')
    },
    hideLeftMenu() {
      var leftMenu = document.getElementById('left-menu')
      var leftMenuHide = document.getElementById('left-menu-hide')
      leftMenu.classList.add('hidden')
      leftMenuHide.classList.add('hidden')
    },
    async logoutClick() {
      const self = this
      await self.$store.dispatch('me/logout')

      setTimeout(async () => {
        window.location = self.$router.options.base + 'login'
      }, 500)
    },
  },
}
</script>

<style>
.topbar {
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.15);
}
</style>
