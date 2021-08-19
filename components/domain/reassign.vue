<template>
  <base-modal v-model="isShow" :width="1160" height="95%">
    <div>
      <div class="absolute top-0 right-0" @click="isShow = false">
      <base-icon
        icon="x"
        width="24"
        height="24"
        class="text-gray-500 hover:text-red-500 bg-gray-200 rounded-full mr-5 mt-3 cursor-pointer"
      />
    </div>
    <div class="text-lg">{{$t('cookieSetting.title')}}</div>
    <div class="my-3 text-sm text-gray-500 font-light">
      {{$t('cookieSetting.subtitle')}}
    </div>

    <!-- status -->
    <div
      class="flex items-center text-sm text-gray-400 font-light space-x-6 py-2"
    >
      <!-- <div class="text-white">
        Discover:
        <span
          v-if="app.status == 'complete'"
          class="bg-green-100 text-white text-xs px-3 py-1 rounded"
          >Completed</span
        >
      </div> -->
      <div>
        Found:
        <span class="text-gray-800">{{ app.cookie_counts }}</span> {{$t('cookieSetting.cookie')}}
        <!-- <span class="text-gray-800">{{ app.cookieChanges }}</span>
        Cookies change -->
      </div>
      <!-- <div
        class="bg-gray-200 text-gray-500 py-1 px-4 rounded-full cursor-pointer flex items-center"
        @click="rescanClick"
        :disabled="isLoadingScan"
      >
        <base-icon
          icon="refresh"
          width="20"
          height="20"
          class="text-primary"
          :class="{ 'animate-spin': isLoadingScan }"
        />
        <div>{{$t('cookieSetting.scan')}}</div>
      </div> -->
      <div class="flex-1"></div>
      <div v-if="role == 1000 || role == 10">
        <base-button color="primary" @click="addCookieClick">
          <base-icon icon="add" width="12" height="12" class="mr-2" /> {{$t('cookieSetting.addCookieBtn')}}
        </base-button>
      </div>
    </div>
    <!-- end status -->

    <!-- Unassigned -->
    <div
      v-if="cookiesUnassignCount"
      class="my-2 bg-blue-100 border border-blue-500 rounded flex items-center font-light"
    >
      <div class="bg-blue-500">
        <base-icon
          icon="cookie"
          width="20"
          height="20"
          class="text-white m-3"
        />
      </div>
      <div class="pl-3"></div>
      {{$t('cookieSetting.unAssign')}} {{ cookiesUnassignCount }} {{$t('cookieSetting.cookie')}}
    </div>
    <!-- End Unassigned -->

    <div class="table-custom text-sm py-4">
      <table>
        <thead>
          <th id="name">{{$t('cookieSetting.name')}}</th>
          <th id="provider">{{$t('cookieSetting.provider')}}</th>
          <th id="purpose">{{$t('cookieSetting.purpose')}}</th>
          <th id="expiry">{{$t('cookieSetting.expiry')}}</th>
          <th id="type">{{$t('cookieSetting.type')}}</th>
          <th id="category">{{$t('cookieSetting.category')}}</th>
          <th id="manage"></th>
        </thead>
        <tbody class="divide-y divide-white">
          <tr
            v-for="(c, i) in cookies"
            :key="`cookie-${i}`"
            :class="{ 'bg-blue-50': c.categoryId == 'unknown' }"
          >
            <td>{{ c.name }}</td>
            <td>
              <div v-if="editRow == i">
                <base-input
                  v-model="editProvider"
                  placeholder=""
                  type="textarea"
                  rows="2"
                ></base-input>
              </div>
              <div v-else class="text-blue-500 underline">
                {{ c.provider }}
              </div>
            </td>
            <td>
              <div v-if="editRow == i">
                <base-input
                  v-model="editPurpose"
                  placeholder=""
                  type="textarea"
                  rows="2"
                  class="text-xs"
                ></base-input>
              </div>
              <div v-else class="text-xs truncate max-w-xs">
                {{ $t('lang') == 'en' ? c.purpose.en : c.purpose.th }}
              </div>
            </td>
            <td>
              {{ $model.calcudateExpiry(c.expiry_in_seconds) }}
            </td>
            <td>
              {{ c.scheme_type == 0 ? 'Unknown' : c.scheme_type == 1 ? 'HTTP' : 'HTML' }}
            </td>
            <td>
              <div class="flex w-40">
                <!-- <base-dropdown
                  toggleClass="w-full"
                  :dropdownWidthFull="true"
                  :text="getCategoryName(c.category_id)"
                  :theme="
                    c.id == 'unknown' ? 'primary' : 'primary-border'
                  "
                  :disabled="!c.editable"
                > -->
                <base-dropdown
                  toggleClass="w-full"
                  :dropdownWidthFull="true"
                  :text="getCategoryName(c.category_id)"
                  :disabled="role == 1 || c.provider == 'BeCookies'"
                  :theme="
                    c.id == 'unknown' ? 'primary' : 'primary-border'
                  "
                >
                  <base-dropdown-item
                    v-for="(cat, i) in categories"
                    :key="`application-${i}`"
                    @click="selectCategoryClick(c, cat)"
                    :class="{ 'bg-blue-100': c.category_id == cat.id }"
                  >
                    <div class="text-sm truncate">{{ cat.title.en }}</div>
                  </base-dropdown-item>
                </base-dropdown>
              </div>
            </td>
            <td class="">
              <div v-if="role == 1000 || role == 10">
                <div
                  v-show="editRow != i"
                  class="flex justify-center items-center space-x-1 pt-2"
                  v-if="c.provider != 'BeCookies'"
                >
                  <div
                    class="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer"
                    @click="editCookieClick(i, c)"
                  >
                    <base-icon
                      icon="pencil"
                      width="12"
                      height="12"
                      color="gray"
                    />
                  </div>
                  <div
                    class="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer"
                    @click="removeCookieClick(i, c)"
                  >
                    <base-icon
                      icon="delete"
                      width="12"
                      height="12"
                      color="red"
                    />
                  </div>
                </div>

                <div
                  v-show="editRow == i"
                  class="flex justify-center items-center space-x-1 pt-2"
                >
                  <div
                    class="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer"
                    @click="saveCookieClick(i, c)"
                  >
                    <base-icon
                      icon="check"
                      width="11"
                      height="11"
                      color="green"
                    />
                  </div>

                  <div
                    class="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer"
                    @click="cancelCookieClick(i, c)"
                  >
                    <base-icon icon="x" width="18" height="18" color="gray" />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <manage-reassign
      ref="manageReassign"
      :categories="categories"
      :application_id="app.application_id"
      @added="fetch"
      @updated="fetch"
    />

    <base-dialog ref="removeReassignDialog" type="remove" />
    </div>
  </base-modal>
</template>

<script>
import ManageReassign from '@/components/domain/manage-reassign'

export default {
  data() {
    return {
      isShow: false,
      isLoadingScan: false,
      editRow: -1,
      editProvider: '',
      editPurpose: '',
      app: {},
    }
  },
  components: { ManageReassign },
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
    role() {
      return this.$store.getters['me/getRole']
    }
  },
  mounted() {},
  methods: {
    async show(app = {}) {
      const self = this

      self.app = app

      await self.fetch()

      self.editRow = -1
      self.isShow = true
    },
    async fetch() {
      this.$store.dispatch('loading/setLoading', true)
      await this.$store.dispatch('category/fetch', this.app.application_id)

      let params = {
        size: 100,
        application_id: this.app.application_id
      }
      await this.$store.dispatch('reassign/fetch', params)
      
      this.$store.dispatch('loading/setLoading', false)
    },
    getCategoryName(cid) {
      const cat = this.categories.find((c) => c.id == cid)
      if (cat) return cat.title.en
      else return 'Unknown'
    },

    async rescanClick() {
      const self = this
      self.isLoadingScan = true
      await self.$api
        .manualyScanApplication(this.app.applicationId)
        .then(async (response) => {
          await self.fetch()
          self.$toast.open({
            message: 'Manualy Scan Success.',
            type: 'success',
            duration: 6000,
          })
        })
        .catch((error) => {
          self.$toast.open({
            message: 'Error: ' + error.response.data.stack,
            type: 'error',
            duration: 6000,
          })
        })
      self.isLoadingScan = false
    },

    editCookieClick(i, c) {
      this.editRow = i
      this.editProvider = c.provider
      this.editPurpose = this.$t('lang') == 'en' ? c.purpose.en : c.purpose.th
    },
    async saveCookieClick(i, c) {
      const self = this
      self.$store.dispatch('loading/setLoading', true)

      await self.$api.updateCookie(c.id, 
        {
          provider: self.editProvider,
          purpose: {
            en: self.$t('lang') == 'en' ? this.editPurpose : c.purpose.en,
            th: self.$t('lang') == 'th' ? this.editPurpose : c.purpose.th
          }
        }
      )
        .then(async (response) => {
          await self.fetch()
          self.$toast.open({
            message: self.$t('lang') == 'en' ? 'Saved Successfully' : 'บันทึกสำเร็จ',
            type: 'success',
            duration: 6000,
          })
          self.editRow = -1
        })
        .catch((error => {}))
      self.$store.dispatch('loading/setLoading', false)
    },
    cancelCookieClick(i, c) {
      this.editRow = -1
    },

    async selectCategoryClick(c, cat) {
      this.$store.dispatch('loading/setLoading', true)


      await this.$api.updateCookie(c.id,
        {
          category_id: cat.id
        }
      ).then(response => {})
      .catch(error => {})

      let params = {
        size: 100,
        application_id: this.app.application_id
      }
      await this.$store.dispatch('reassign/fetch', params)
      this.$store.dispatch('loading/setLoading', false)
    },

    removeCookieClick(i, c) {
      const self = this
      self.$refs.removeReassignDialog.show(
        self.$t('lang') == 'en' ? `Are you sure delete "${c.name}" ?` : `คุณแน่ใจหรือไม่ที่จะลบ "${c.name}"`,
        self.$t('lang') == 'en' ? `If you delete, you can't restore it back.` : 'ถ้าคุณลบ คุณจะไม่สามารถกู้คืนได้',
        async function () {
          await self.$api.deleteCookie(c.id)
          await self.fetch()
        }
      )
    },

    addCookieClick() {
      this.$refs.manageReassign.show({
        applicationId: this.app.applicationId,
      })
    },
  },
}
</script>

<style></style>
