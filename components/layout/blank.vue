<template>
  <nav id="header" class="w-full z-30 top-0 text-white py-1 lg:py-2">
    <div
      class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-4 lg:py-6"
    >
      <div class="pl-4 flex items-center">
        <nuxt-link
          :to="{ path: localePath('index') }"
          class="text-white no-underline hover:no-underline text-xl lg:text-2xl"
        >
          <!-- Cookie PDPA -->
          <base-icon icon="logo-h-white" width="140" height="32" />
        </nuxt-link>
      </div>

      <div class="block lg:hidden pr-4">
        <button
          id="nav-toggle"
          class="flex items-center px-3 py-2 text-white border-white hover:text-gray-200 appearance-none focus:outline-none"
        >
          <base-icon icon="menu" />
        </button>
      </div>

      <div
        class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 text-white p-4 lg:p-0 z-20"
        id="nav-content"
      >
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <li class="mr-4">
            <div
              class="inline-block uppercase text-white text-sm no-underline hover:text-gray-200 py-2 px-4 cursor-pointer"
              @mouseover="menuLang = true"
              @mouseout="menuLang = false"
            >
              {{ lang }}
            </div>
            <div
              :class="menuLang ? 'absolute' : 'hidden'"
              class="text-black"
              @mouseover="menuLang = true"
              @mouseout="menuLang = false"
            >
              <div
                class="uppercase px-4 bg-blue-500 hover:bg-blue-400 rounded-t-md cursor-pointer"
                :class="lang == 'th' ? 'bg-blue-700 text-white' : 'text-gray-400'"
                @click="changeLangClick('th')"
              >
                th
              </div>
              <div
                class="uppercase px-4 bg-blue-500 hover:bg-blue-400 rounded-b-md cursor-pointer"
                :class="lang == 'en' ? 'bg-blue-700 text-white' : 'text-gray-400'"
                @click="changeLangClick('en')"
              >
                en
              </div>
            </div>
          </li>
          <li class="mr-4 border-r h-5 border-white hidden lg:block"></li>
          <li class="mr-4">
            <nuxt-link
              class="inline-block text-white text-sm no-underline hover:text-gray-200 py-2 px-4"
              :to="{ path: localePath('login') }"
              >Login</nuxt-link
            >
          </li>
          <!-- <li class="mr-4 mt-4 lg:mt-0">
            <nuxt-link
              class="inline-block text-white text-sm no-underline hover:text-gray-200 py-2 px-6 border border-white rounded-full"
              to="/"
              >Try for free</nuxt-link
            >
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menuLang: false,
      lang: 'en'
    }
  },
  mounted() {
    const self = this
    var navMenuDiv = document.getElementById('nav-content')
    var navMenu = document.getElementById('nav-toggle')
    document.onclick = function (e) {
      var target = (e && e.target) || (event && event.srcElement)

      //Nav Menu
      if (!self.checkParent(target, navMenuDiv)) {
        // click NOT on the menu
        if (self.checkParent(target, navMenu)) {
          // click on the link
          if (navMenuDiv.classList.contains('hidden')) {
            navMenuDiv.classList.remove('hidden')
          } else {
            navMenuDiv.classList.add('hidden')
          }
        } else {
          // click both outside link and outside menu, hide menu
          navMenuDiv.classList.add('hidden')
        }
      }
    }
  },
  methods: {
    checkParent(t, elm) {
      while (t.parentNode) {
        if (t == elm) {
          return true
        }
        t = t.parentNode
      }
      return false
    },
    changeLangClick(lang) {
      this.lang = lang
      this.$router.push(this.switchLocalePath(lang))
    }
  },
}
</script>

<style></style>
