<template>
  <!-- Desktop sidebar -->
  <aside
    id="left-menu"
    class="z-20 w-64 gradient-to-bottom overflow-y-auto h-screen hidden md:flex flex-col jusity-center"
  >
    <div class="py-8 mt-8 text-center">
      <nuxt-link :to="{ path: localePath('index') }" class="text-xl font-medium text-white mr-1">
        Cookie PDPA
      </nuxt-link>
    </div>

    <div class="flex-1 flex-grow">
      <div v-for="(group, i) in menus" :key="`group-${i}`" class="py-4">
        <div class="text-lg text-white uppercase px-6 py-4">
          {{ group.title }}
        </div>
        <ul>
          <li
            v-for="(menu, j) in group.items"
            :key="`menu-${j}`"
            class="relative"
          >
            <span
              class="absolute inset-y-0 left-0 w-2 bg-white-300"
              aria-hidden="true"
              v-if="isCurrentPath(menu.link)"
            />
            <nuxt-link
            :to="{ path: localePath(menu.link) }"
              class="py-3 px-4 inline-flex items-center w-full text-sm text-white left-menu-item"
              :class="{
                'left-menu-item-select': isCurrentPath(menu.link),
              }"
            >
              <base-icon :icon="menu.icon" />
              <span class="ml-4">{{ menu.title }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="p-4 left-footer">
      <div class="border-b border-white mb-4"></div>

      <div class="text-sm text-white">&copy; {{ year }} Cookie PDPA | RST</div>
    </div>
  </aside>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getFullYear()
    },
    currentPath() {
      return this.$route.path
    },
    menus() {
      return [
        {
          title: 'dashboard',
          items: [
            {
              title: 'Overview',
              icon: 'menu-graph',
              link: '/overview',
            },
            {
              title: 'Reports',
              icon: 'menu-report',
              link: '/reports',
            },
          ],
        },
        {
          title: 'setup & integration',
          items: [
            {
              title: 'Domains Setting',
              icon: 'menu-domain',
              link: '/domains-setting',
            },
            {
              title: 'Categorizations',
              icon: 'menu-category',
              link: '/categorizations',
            },
          ],
        },
        {
          title: 'settings',
          items: [
            {
              title: 'User',
              icon: 'menu-user',
              link: '/user',
            },
          ],
        },
      ]
    },
  },
  methods: {
    isCurrentPath(p) {
      if (p == '/') {
        return this.currentPath == '/'
      } else {
        return this.currentPath.startsWith(p)
      }
    },
  },
}
</script>

<style>
.left-menu-item {
  position: relative;
}
.left-menu-item:hover {
  background: #fff1;
}
.left-menu-item-select {
  background: #fff3 !important;
}
.left-menu-item-select::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #fff;
}
.left-footer {
  opacity: 0.5;
}
</style>
