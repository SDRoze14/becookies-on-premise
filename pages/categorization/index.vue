<template>
  <div>
    <div class="text-gray-500">Home</div>

    <div class="flex items-center py-3 border-b border-gray-100">
      <div class="flex-1 text-lg mr-6">Categorization​</div>
    </div>

    <div class="my-4">
      <base-tabs
        :tabs="tabs"
        v-model="tab"
        contentClass="justify-center"
      ></base-tabs>
    </div>

    <!-- Categories -->
    <div v-if="tab == 0">
      <div class="flex justify-between mb-6">
        <div class="w-56 relative">
          <base-input v-model="q" placeholder="Search"></base-input>
          <base-icon
            class="absolute top-0 right-0 mt-2 mr-1 cursor-pointer"
            icon="search"
          />
        </div>
        <div>
          <base-button color="primary" @click="addClick">
            <base-icon icon="add" width="12" height="12" class="mr-2" /> Add
            Category
          </base-button>
        </div>
      </div>

      <div class="table-custom text-sm py-4">
        <table>
          <thead>
            <th id="category name">Category name</th>
            <th id="object">Objective</th>
            <th id="status">Status</th>
            <th id="manage"></th>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="(cat, i) in categories" :key="`cat-${i}`">
              <td class="w-1/3">{{ cat.categoryName }}</td>
              <td class="w-2/3">
                {{ cat.categoryIntroduction }}
              </td>

              <td>
                <div
                  v-if="cat.categoryName == 'Necessary'"
                  class="text-primary"
                >
                  Always Active
                </div>
                <div v-else class="flex w-40">
                  <base-dropdown
                    toggleClass="w-full"
                    :dropdownWidthFull="true"
                    :text="cat.isActive ? 'Active' : 'Inactive'"
                    :theme="cat.isActive ? 'primary' : ''"
                  >
                    <base-dropdown-item
                      @click="selectStatusClick(cat, true)"
                      :class="{ 'bg-blue-100': cat.isActive }"
                    >
                      <div class="text-sm">Active</div>
                    </base-dropdown-item>
                    <base-dropdown-item
                      @click="selectStatusClick(cat, false)"
                      :class="{ 'bg-blue-100': !cat.isActive }"
                    >
                      <div class="text-sm">Inactive</div>
                    </base-dropdown-item>
                  </base-dropdown>
                </div>
              </td>
              <td>
                <div class="flex justify-end items-center space-x-2">
                  <div
                    v-if="cat.categoryName != 'Necessary'"
                    class="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer"
                    @click="removeClick(cat)"
                  >
                    <base-icon icon="bin" width="14" height="14" color="gray" />
                  </div>

                  <div
                    class="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer"
                    @click="editClick(cat)"
                  >
                    <base-icon
                      icon="pencil"
                      width="12"
                      height="12"
                      color="gray"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Cookies -->
    <div v-else>
      <div class="flex justify-between mb-6">
        <div class="w-56 relative">
          <base-input v-model="cookieQ" placeholder="Search"></base-input>
          <base-icon
            class="absolute top-0 right-0 mt-2 mr-1 cursor-pointer"
            icon="search"
          />
        </div>
        <div class="flex items-center space-x-3">
          <div class="text-gray-500">Filter</div>
          <div class="w-40">
            <base-dropdown
              toggleClass="w-full"
              :dropdownWidthFull="true"
              :text="cookieDomain.name"
              theme=""
            >
              <base-dropdown-item :class="{ 'bg-blue-100': false }">
                <div class="text-sm">Domain</div>
              </base-dropdown-item>
            </base-dropdown>
          </div>
          <div class="w-40">
            <base-dropdown
              toggleClass="w-full"
              :dropdownWidthFull="true"
              :text="cookieCategory.name"
              theme=""
            >
              <base-dropdown-item :class="{ 'bg-blue-100': false }">
                <div class="text-sm">Category</div>
              </base-dropdown-item>
            </base-dropdown>
          </div>
        </div>
        <div>
          <base-button color="primary" @click="addCookieClick">
            <base-icon icon="add" width="12" height="12" class="mr-2" /> Add
            cookie
          </base-button>
        </div>
      </div>

      <div class="table-custom text-sm py-4">
        <table>
          <thead>
            <th id="cookie name">Cookie name</th>
            <th id="domain">Domains</th>
            <th id="povider">Provider</th>
            <th id="purpose">Purpose</th>
            <th id="expiry">Expiry</th>
            <th id="type">Type</th>
            <th id="category">Category</th>
            <th id="manage"></th>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="(cookie, i) in cookies" :key="`cat-${i}`">
              <td>
                {{ cookie.name }}
              </td>
              <td></td>
              <td>
                {{ cookie.provider }}
              </td>
              <td class="text-xs truncate max-w-xs">
                {{ cookie.purpose.th }}
              </td>
              <td class="text-center">
                {{ cookie.expiry }}
              </td>
              <td class="text-center">
                {{ cookie.type }}
              </td>
              <td>
                {{ getCategoryName(cookie.categoryId) }}
              </td>

              <td class="flex items-center">
                <div
                  class="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer"
                >
                  <base-icon
                    icon="pencil"
                    width="12"
                    height="12"
                    color="gray"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <manage-category ref="manageCategory" @added="fetch" @updated="fetch" />

    <base-dialog ref="removeCatDialog" type="remove" />
  </div>
</template>

<script>
import ManageCategory from '@/components/category/manage-category'

export default {
  middleware: 'auth',
  components: { ManageCategory },
  computed: {
    tabs() {
      return ['Categories'] //'Cookies']
    },
    categories() {
      const self = this
      var list = this.$store.getters['category/getList']
      if (self.q) {
        list = list.filter((e) => {
          return (
            e.categoryName.toLowerCase().search(self.q.toLowerCase()) > -1 ||
            e.categoryIntroduction.toLowerCase().search(self.q.toLowerCase()) >
              -1
          )
            ? true : false
        })
      }
      return list
    },
    cookies() {
      const self = this
      var list = this.$store.getters['reassign/getList']
      if (self.cookieQ) {
        list = list.filter((e) => {
          return (e.name.toLowerCase().search(self.cookieQ.toLowerCase()) > -1)
            ? true : false
        })
      }
      return list
    },
  },
  data() {
    return {
      tab: 0,
      q: '',

      cookieQ: '',
      cookieDomain: { name: 'Domain' },
      cookieCategory: { name: 'Category' },
    }
  },
  async mounted() {
    await this.fetch()
    await this.fetchCookies()
  },
  watch: {},
  methods: {
    async fetch() {
      this.$store.dispatch('loading/setLoading', true)
      await this.$store.dispatch('category/fetch')
      this.$store.dispatch('loading/setLoading', false)
    },
    async selectStatusClick(cat, status) {
      if (status) {
        // enable
        await this.$api.enableCategory(cat.categoryId)
      } else {
        // disable
        await this.$api.disableCategory(cat.categoryId)
      }
      this.fetch()
    },

    addClick() {
      this.$refs.manageCategory.show()
    },
    editClick(cat) {
      this.$refs.manageCategory.show(cat)
    },
    removeClick(cat) {
      const self = this
      self.$refs.removeCatDialog.show(
        `Are you sure remove "${cat.categoryName}" ?`,
        `if you remove, you can't restore back.`,
        async function () {
          await self.$api.removeCategory(cat.categoryId)
          self.fetch()
        }
      )
    },

    async fetchCookies() {
      this.$store.dispatch('loading/setLoading', true)
      await this.$store.dispatch('reassign/fetchAll')
      await this.$store.dispatch('category/fetch')
      this.$store.dispatch('loading/setLoading', false)
    },
    getCategoryName(cid) {
      const cat = this.categories.find((c) => c.categoryId == cid)
      if (cat) return cat.categoryName
      else return 'Unknown'
    },

    addCookieClick() {
      // this.$refs.manageCategory.show()
    },
    editCookieClick(cat) {
      // this.$refs.manageCategory.show(cat)
    },
  },
}
</script>

<style></style>
