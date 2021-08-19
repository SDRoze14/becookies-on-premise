<template>
  <nav
    id="header"
    class="w-full z-30 top-0 text-white py-1 lg:py-2 fixed gradient shadow-md"
  >
    <div
      class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-4 lg:py-3"
    >
      <div class="pl-4 flex items-center pr-20">
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
        class="w-full flex-grow lg:flex lg:items-start lg:w-auto hidden lg:block mt-2 lg:mt-0 text-white p-4 lg:p-0 z-20"
        id="nav-content"
      >
        <ul
          class="list-reset lg:flex flex-1 text-lg items-center justify-center font-light"
        >
          <li
            class="pr-10 cursor-pointer pt-2 xl:px-10"
            @click="scroll('home')"
          >
            <p :class="tab == 'home' ? 'border-b border-white' : ''">
              {{ $t("nav.home") }}
            </p>
          </li>
          <li class="pr-10 cursor-pointer pt-2 xl:px-10">
            <div
              @mouseover="menuCompany = true"
              @mouseout="menuCompany = false"
              @click="menuCompany = !menuCompany"
            >
              <span :class="tab == 'contact' ? 'border-b border-white' : ''">{{
                $t("nav.about")
              }}</span>
              <base-icon icon="dropdown" size="13" class="mb-1"></base-icon>
            </div>
            <div
              class="text-base z-50 bg-blue-600 rounded-md"
              :class="menuCompany ? 'absolute' : 'hidden'"
              @mouseover="menuCompany = true"
              @mouseout="menuCompany = false"
            >
              <div
                class="cursor-pointer hover:bg-blue-500 px-5 w-32 py-2 rounded-t-md"
              >
                <a href="https://rst.technology/" target="_blank">{{
                  $t("nav.company")
                }}</a>
              </div>
              <div
                class="cursor-pointer hover:bg-blue-500 px-5 w-32 py-2 rounded-b-md"
                @click="scroll('contact')"
              >
                <span
                  :class="tab == 'contact' ? 'border-b border-white' : ''"
                  >{{ $t("nav.contact") }}</span
                >
              </div>
            </div>
          </li>
          <li class="pr-10 cursor-pointer pt-2 xl:px-10">
            <nuxt-link :to="{ path: localePath('faq') }">{{
              $t("nav.faq")
            }}</nuxt-link>
          </li>
        </ul>
        <ul class="list-reset lg:flex justify-end items-start pt-1">
          <li class="mr-4">
            <div
              class="inline-block uppercase text-white text-sm no-underline hover:text-gray-200 py-2 px-4 cursor-pointer"
              @mouseover="menuLang = true"
              @mouseout="menuLang = false"
            >
              {{ $t("lang") }}
            </div>
            <div
              :class="menuLang ? 'absolute' : 'hidden'"
              class="text-black"
              @mouseover="menuLang = true"
              @mouseout="menuLang = false"
            >
              <div
                class="uppercase px-4 bg-blue-500 hover:bg-blue-400 rounded-t-md cursor-pointer"
                :class="
                  $t('lang') == 'th'
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-400'
                "
                @click="changeLangClick('th')"
              >
                th
              </div>
              <div
                class="uppercase px-4 bg-blue-500 hover:bg-blue-400 rounded-b-md cursor-pointer"
                :class="
                  $t('lang') == 'en'
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-400'
                "
                @click="changeLangClick('en')"
              >
                en
              </div>
            </div>
          </li>
          <li class="mr-4 border-r h-10 border-white hidden lg:block"></li>
          <li class="mr-4" v-if="!logined">
            <nuxt-link
              class="inline-block text-white text-sm no-underline hover:text-gray-200 py-2 px-4"
              :to="{ path: localePath('login') }"
              >{{ $t("nav.login") }}</nuxt-link
            >
          </li>

          <li class="mr-4" v-if="logined">
            <nuxt-link
              class="inline-block text-white text-sm no-underline hover:text-gray-200 py-2 px-4"
              :to="{ path: localePath('websites') }"
              >{{
                user.email ? user.email : `${user.first_name} ${user.last_name}`
              }}</nuxt-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menuCompany: false,
      tab: "home",
      menuLang: false,
      // homeCheck: true,
      // checkLogin: false
    };
  },
  computed: {
    homeCheck() {
      if (this.$route.path == "/" || this.$route.path == "/th") return true;
      else return false;
    },
    logined() {
      let token = localStorage.getItem("token");
      return token ? true : false
    },
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
  mounted() {
    const self = this;

    var navMenuDiv = document.getElementById("nav-content");
    var navMenu = document.getElementById("nav-toggle");
    document.onclick = function (e) {
      var target = (e && e.target) || (event && event.srcElement);

      //Nav Menu
      if (!self.checkParent(target, navMenuDiv)) {
        // click NOT on the menu
        if (self.checkParent(target, navMenu)) {
          // click on the link
          if (navMenuDiv.classList.contains("hidden")) {
            navMenuDiv.classList.remove("hidden");
          } else {
            navMenuDiv.classList.add("hidden");
          }
        } else {
          // click both outside link and outside menu, hide menu
          navMenuDiv.classList.add("hidden");
        }
      }
    };
  },
  methods: {
    checkParent(t, elm) {
      while (t.parentNode) {
        if (t == elm) {
          return true;
        }
        t = t.parentNode;
      }
      return false;
    },
    scroll(id) {
      if (id == "home") {
        if (this.homeCheck) {
          this.tab = "home";
          window.scroll({ top: 0, behavior: "smooth" });
        } else {
          this.$router.push({ path: this.localePath("index") });
        }
      } else if (id == "pricing") {
        this.tab = "pricing";
        window.scroll({ top: 520, behavior: "smooth" });
      } else if (id == "contact") {
        this.tab = "contact";
        window.scroll({ top: 5000, behavior: "smooth" });
      }
    },
    changeLangClick(lang) {
      this.lang = lang;
      this.$router.push(this.switchLocalePath(lang));
    },
  },
};
</script>
