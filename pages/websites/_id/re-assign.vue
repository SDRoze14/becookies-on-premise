<template>
  <div>
    <!-- Header -->
    <div class="flex p-2 items-center">
      <div class="flex-1 text-lg mr-6">
        <div>
          <nuxt-link to="/domains-setting">
            <base-icon
              icon="back"
              width="18"
              height="18"
              class="mr-2 align-top mt-1"
            />
          </nuxt-link>
          Re-assign
        </div>
        <div class="pt-2">
          <div class="flex w-64">
            <select-domain :selectId="id" @change="selectApplication" />
          </div>
        </div>
      </div>
      <div>
        <base-button color="primary" @click="addClick">
          <base-icon icon="add" width="12" height="12" class="mr-2" /> Add Add
          Cookie
        </base-button>
      </div>
    </div>
    <!-- end Header -->

    <div class="bg-white rounded-md p-4 mt-4">
      <div v-if="cookies.length" class="mb-4 text-sm">
        {{ cookies.length }} Cookies discovered on
        {{ $model.getDate(cookies[0].updatedAt) }}
      </div>

      <div
        v-if="cookiesUnassignCount"
        class="bg-blue-100 text-blue-500 text-sm rounded py-2 px-3 mb-4"
      >
        Unassigned {{ cookiesUnassignCount }} cookie
      </div>

      <div class="table-custom">
        <table>
          <thead>
            <th id="index">#</th>
            <th id="name">Name</th>
            <th id="provider">Provider</th>
            <th id="purpose">Purpose</th>
            <th id="expiry">Expiry</th>
            <th id="type">Type</th>
            <th id="category">Category</th>
            <th></th>
          </thead>
          <tbody class="divide-y divide-white">
            <tr
              v-for="(c, i) in cookies"
              :key="`cookie-${i}`"
              :class="{ 'bg-blue-50': c.categoryId == 'unknown' }"
            >
              <td>
                {{ i + 1 }}
              </td>
              <td>{{ c.cookieId }}</td>
              <td>
                <div class="text-blue-500 underline">
                  {{ c.provider ? c.provider : 'No data' }}
                </div>
              </td>
              <td>
                <div class="text-xs">
                  {{ c.purpose.th ? c.purpose.th : 'No data' }}
                </div>
              </td>
              <td>
                {{ c.expiry }}
              </td>
              <td>
                {{ c.type }}
              </td>
              <td>
                <div class="flex w-40">
                  <base-dropdown
                    :text="getCategoryName(c.categoryId)"
                    theme="primary"
                  >
                    <base-dropdown-item
                      v-for="(cat, i) in categories"
                      :key="`application-${i}`"
                      @click="selectCategoryClick(c, cat)"
                      :class="{ 'bg-blue-100': c.categoryId == cat.categoryId }"
                    >
                      <div class="text-sm truncate">{{ cat.categoryName }}</div>
                    </base-dropdown-item>
                  </base-dropdown>
                </div>
              </td>
              <td class="flex justify-center items-center space-x-2">
                <div
                  class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer"
                  @click="editCookieClick(c)"
                >
                  <base-icon
                    icon="pencil"
                    width="12"
                    height="12"
                    color="gray"
                  />
                </div>
                <div
                  class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer"
                  @click="removeClick(c)"
                >
                  <base-icon icon="delete" width="12" height="12" color="red" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <manage-reassign
      ref="manageReassign"
      :categories="categories"
      @added="fetch"
      @updated="fetch"
    />

    <base-dialog ref="removeReassignDialog" type="remove" />
  </div>
</template>

<script>
import ManageReassign from '@/components/domain/manage-reassign'

export default {
  middleware: 'auth',
  components: { ManageReassign },
  asyncData({ params }) {
    return { id: params.id }
  },
  computed: {
    cookies() {
      return this.$store.getters['reassign/getList']
    },
    cookiesUnassignCount() {
      const list = this.cookies.filter((c) => c.categoryId == 'unknown')
      return list.length
    },
    categories() {
      return this.$store.getters['category/getList']
    },
  },
  data() {
    return {
      q: '',
      status: undefined,
    }
  },
  async mounted() {
    const self = this
    self.fetch()
  },
  methods: {
    async fetch() {
      this.$store.dispatch('loading/setLoading', true)
      await this.$store.dispatch('application/fetch')
      await this.$store.dispatch('category/fetch')
      await this.$store.dispatch('reassign/fetch', this.id, {})
      this.$store.dispatch('loading/setLoading', false)
    },
    getCategoryName(cid) {
      const cat = this.categories.find((c) => c.categoryId == cid)
      if (cat) return cat.categoryName
      else return 'Unknown'
    },
    async selectCategoryClick(c, cat) {
      this.$store.dispatch('loading/setLoading', true)
      await this.$api.updateReassign(
        c.applicationId,
        encodeURIComponent(c.cookieId),
        {
          ...cat,
          categoryId: cat.categoryId,
        }
      )
      await this.$store.dispatch('reassign/fetch', this.id, {})
      this.$store.dispatch('loading/setLoading', false)
    },
    editCookieClick(c) {
      this.$refs.manageReassign.show(c)
    },
    addClick() {
      this.$refs.manageReassign.show({ applicationId: this.id })
    },
    removeClick(c) {
      const self = this
      self.$refs.removeReassignDialog.show(
        `Are you sure remove "${c.name}" ?`,
        `if you remove, you can't restore back.`,
        async function () {
          await self.$api.removeReassign(c.applicationId, c.cookieId)
          self.fetch()
        }
      )
    },

    selectApplication(a) {
      this.$router.push(`/domains-setting/${a.applicationId}/re-assign`)
    },
  },
}
</script>