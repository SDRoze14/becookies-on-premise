<template>
  <div>
    <div class="text-gray-500">{{ $t('website.home') }}</div>
    <div
      class="flex items-center justify-between py-3 border-b border-gray-100"
    >
    <div class="flex-1 text-lg mr-6">{{ $t('website.title') }}</div>
      <div v-if="role == 1000 || role == 10">
        <base-button color="primary" @click="addClick">
          <base-icon icon="add" width="12" height="12" class="mr-2" />
          {{ $t('website.addBtn') }}
        </base-button>
      </div>
    </div>

    <div class="">
      <div class="flex justify-between py-8">
        <div class="flex items-center">
          <div class="w-64 relative">
            <base-input
              v-model="q"
              innerClass="pr-8"
              :placeholder="$t('search')"
              @keydown.enter="searchClick"
            ></base-input>
            <base-icon
              class="absolute top-0 right-0 mt-2 mr-1 cursor-pointer"
              icon="search"
              @click="searchClick"
            />
          </div>
          <!-- <div class="flex items-center">
            
            <div class="flex items-center w-64">
              <div class="text-sm ml-4 pr-4 text-gray-400">Organizations</div>
              <select-organizations :select_id="organization.id" @change="selectOrganization"></select-organizations>
            </div>
          </div> -->
        </div>
        <div class="flex items-center space-x-4">
          <div class="text-sm font-light text-gray-500">Sort by</div>
          <div>
            <base-dropdown
              :text="`${$model.domainSorts(sort).label}`"
              :dropdownWidthFull="true"
            >
              <base-dropdown-item
                v-for="(s, i) in $model.domain_sorts"
                :key="`status-${i}`"
                @click="sortClick(s.value)"
              >
                {{ s.label }}
              </base-dropdown-item>
            </base-dropdown>
          </div>
          <div
            class="border border-gray-200 rounded flex items-center text-gray-500"
          >
            <div
              class="py-1 px-3 border-r border-gray-200 cursor-pointer"
              :class="{ 'bg-gray-200': asc }"
              @click="ascClick(true)"
            >
              <base-icon
                icon="sort"
                height="14"
                class="transform -rotate-180"
              />
            </div>
            <div
              class="py-1 px-3 cursor-pointer"
              :class="{ 'bg-gray-200': !asc }"
              @click="ascClick(false)"
            >
              <base-icon icon="sort" height="14" class="" />
            </div>
          </div>
        </div>
      </div>

      <!-- empty -->
      <div
        v-if="!applications"
        class="text-center px-6 py-16 text-gray-400 font-light border-b border-gray-100"
      >
        No added website, you can add your website by its domain name at
        <span @click="addClick" class="text-primary cursor-pointer ml-4"
          ><base-icon icon="add" width="12" height="12" class="mr-2" /> Add
          Domain</span
        >
      </div>
      <div v-else class="flex flex-wrap -mx-2">
        <!-- {{applications}} -->
        <div
          v-for="(app, i) in applications"
          :key="`application-${i}`"
          class="w-full md:w-1/2 lg:w-1/3 p-2"
        >
          <div class="border border-gray-100 shadow-sm p-2 rounded px-4 py-4">
            <!-- <div class="text-gray-400 font-light text-sm mb-2 truncate">
              {{ app.name ? app.name : 'unnamed' }}
            </div> -->
            <div class="text-lg text-primary mb-4 truncate">
              <router-link class="" :to="localePath(`/websites/${app.id}`)"
                >{{ app.domain_name }}
              </router-link>
            </div>
            <!-- <div class="font-light mb-1">
              Discovery:
              <span
                v-if="app.status == 1"
                class="bg-green-100 rounded px-3 py-1 text-xs text-green-400 ml-2"
                >Scanning</span
              >
              <span
                v-if="app.status == 2"
                class="bg-green-100 rounded px-3 py-1 text-xs text-green-400 ml-2"
                >Completed</span
              >
              <span
                v-if="app.status == 3"
                class="bg-green-100 rounded px-3 py-1 text-xs text-green-400 ml-2"
                >Disable</span
              >
            </div> -->
            <div class="font-light mb-1">
              Found:
              <span class="text-sm text-gray-400 ml-2">
                <!-- {{ app.pageCounts }} Pages , -->
                {{ cookie_counts[i] }} Cookies</span
              >
            </div>
            <div class="font-light mb-1 flex">
              <div>
                Created:
                <span class="text-sm text-gray-400 ml-2">
                  {{ $model.getDate(app.created_at) }}
                </span>
              </div>
              <!-- <div class="ml-6">
                Next:
                <span class="text-sm text-gray-400 ml-2">{{
                  $model.getDate(app.nextScan)
                }}</span>
              </div> -->
            </div>
            <div class="font-light mb-4 flex">
              <div>
                Updated:
                <span class="text-sm text-gray-400 ml-2">
                  {{ $model.getDate(app.updated_at) }}
                </span>
              </div>
              <!-- <div class="ml-6">
                Next:
                <span class="text-sm text-gray-400 ml-2">{{
                  $model.getDate(app.nextScan)
                }}</span>
              </div> -->
            </div>

            <!-- footer -->
            <div
              class="border-t border-gray-100 pt-3 flex items-center justify-between"
            >
              <div
                class="text-sm py-2 px-4 hover:bg-gray-100 rounded-full cursor-pointer"
                @click="scriptClick(app)"
              >
                <span class="mr-2">&#60;/&#62;</span>
                <span class="text-primary">Script</span>
              </div>
              <div
                class="text-sm py-2 px-8 hover:bg-gray-200 bg-gray-100 text-gray-500 rounded-full cursor-pointer"
              >
                <router-link :to="localePath(`/websites/${app.id}`)">
                  Manage
                </router-link>
              </div>
              <div
                v-if="role == 1000 || role == 10"
                class="p-2 flex items-center justify-center hover:bg-gray-200 bg-gray-100 text-gray-500 rounded-full cursor-pointer"
                @click="removeClick(app)"
              >
                <base-icon icon="bin" width="20" height="20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <manage-domain ref="manageDomain" @added="fetch" @updated="fetch" />
    <script-show ref="scriptShow" />

    <base-dialog ref="removeAppDialog" type="remove" />
  </div>
</template>

<script>
import ManageDomain from '@/components/domain/manage-domain'
import ScriptShow from '@/components/domain/script-show'
// import SelectOrganizations from '@/components/organizations/select-organizations'

export default {
  middleware: 'auth',
  components: {
    ManageDomain,
    ScriptShow,
    // SelectOrganizations,
  },
  computed: {
    organizations_id() {
      return this.$store.getters['organizations/getOrganizationId']
    },
    applications() {
      const self = this
      var list = this.$store.getters['application/getList']
      if (self.q) {
        list = list.filter((e) => {
          if (e.domain_name.toLowerCase().search(self.q.toLowerCase()) > -1)
            return true
          else return false
        })
      }

      // list.forEach(async e => {
      //   // await self.$api.getSummary(e.id)
      //   // .then(response => {
      //   //   e.cookie_counts = response.data.cookie_counts
      //   // })
      //   e.cookie_counts = e.cookie_counts
      // })

      return list
    },
    user() {
      return this.$store.getters['me/getUser']
    }, 
    role() {
      return this.$store.getters['me/getRole']
    }
  },
  data() {
    return {
      q: '',
      // qed: '',
      sort: 'updated_at',
      asc: true,

      status: undefined,
      organization: {},
      summary: {},
      cookie_counts: []
    }
  },
  async mounted() {
    this.fetch()
  },
  methods: {
    // async selectOrganization(o) {
    //   this.organization = o
    //   this.$store.commit('organizations/SET_ORGANIZATION_ID', o.id)
    //   await this.fetch()
    // },
    async fetch() {
      this.$store.dispatch('loading/setLoading', true)
      await this.$store.dispatch('organizations/fetch')

      let params = {
        organization_id: this.organizations_id,
        sort_by: this.sort,
        size: 100,
        reverse: this.asc ? true : false
      }
      await (this.$store.dispatch('application/fetch', params))

      await this.applications.forEach(async(a) => {
        await this.$api.getSummary(a.id)
          .then(response => {
            this.cookie_counts.push(response.data.cookie_counts)
          })
      });
      this.$store.dispatch('loading/setLoading', false)
    },
    async searchClick() {
      // this.qed = this.q
    },
    async fetchSummary() {
      this.$store.dispatch('loading/setLoading', true)
      await this.applications.forEach(async(a) => {
        await this.$api.getSummary(a.id)
          .then(response => {
            a.cookie_counts = response.data.cookie_counts
          })
      });
      this.$store.dispatch('loading/setLoading', false)
    },
    addClick() {
      this.$refs.manageDomain.show()
    },
    scriptClick(app) {
      this.$refs.scriptShow.show(app)
    },
    removeClick(app) {
      const self = this
      self.$refs.removeAppDialog.show(
        self.$t('lang') == 'en' ? `Are you sure to delete "${app.domain_name}" ?` : `คุณแน่ใจหรือไม่ที่จะลบ "${app.domain_name}"`,
        self.$t('lang') == 'en' ? `If you delete, you can't restore back.` : 'ถ้าคุณลบ คุณจะไม่สามารถกู้คืนได้',
        async function () {
          self.$store.dispatch('loading/setLoading', true)
          await self.$api.deleteApplication(app.id)
            .then(() => {})
            .catch(() => {})
          self.fetch()
        }
      )
    },
    ascClick(asc) {
      this.asc = asc

      this.fetch()
    },
    sortClick(sort) {
      this.sort = sort

      this.fetch()
    }
  },
}
</script>

<style></style>
