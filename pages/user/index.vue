<template>
  <div>
    <div class="flex p-2 items-center">
      <div class="flex-1 text-lg mr-6">{{$t('user.title')}}</div>
      <div v-if="check_user && (role_user == 1000 || role_user == 10)">
        <base-button color="primary" @click="addClick">
          <base-icon icon="add" width="12" height="12" class="mr-2" /> {{$t('user.addUserBtn')}}
        </base-button>
      </div>
    </div>

    <div class="bg-white rounded-md p-4 mt-4">
      <div class="flex mb-6">
        <div class="w-56 pr-4">
          <base-input v-model="q" :placeholder="$t('search')"></base-input>
        </div>
        <!-- <div>
          <base-dropdown
            :text="`Status: ${$model.userStatus(status).label}`"
            :dropdownWidthFull="true"
          >
            <base-dropdown-item
              v-for="(s, i) in $model.user_status"
              :key="`status-${i}`"
              @click="status = s.value"
            >
              {{ s.label }}
            </base-dropdown-item>
          </base-dropdown>
        </div> -->
      </div>

      <div class="table-custom">
        <table>
          <thead>
            <th id="index">#</th>
            <!-- <th>{{$t('user.name')}}</th> -->
            <th id="email">{{$t('user.email')}}</th>
            <!-- <th>{{$t('user.phone')}}</th> -->
            <th id="access">{{$t('user.access')}}</th>
            <th id="role">Role</th>
            <!-- <th>Status</th> -->
            <th id="manage"></th>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="(u, i) in users" :key="`app-${i}`" class="">
              <td>
                {{ i + 1 }}
              </td>
              <!-- <td>{{ u.name }}</td> -->
              <td>{{ u.user.email ? u.user.email : `${u.user.first_name} ${u.user.last_name}` }}</td>
              <!-- <td>-</td> -->
              <td>
                {{ $model.getDateTime(u.user.updatedAt) }}
              </td>
              <td>
                <div class="text-green-500" v-if="u.role == 1000">
                  Admin
                </div>
                <div class="text-blue-400" v-else-if="u.role == 10">
                  Member
                </div>
                <div class="text-orange-400" v-else-if="u.role == 1">
                  Viewer
                </div>
                <!-- <div class="text-green-400" v-else-if="u.role == 'member'">
                  Member
                </div> -->
              </td>
              <!-- <td>
                <div
                  v-if="u.isActive"
                  class="px-2 py-1 text-xs bg-green-200 text-green-500 rounded text-center"
                >
                  Active
                </div>
                <div
                  v-else
                  class="px-2 py-1 text-xs bg-red-200 text-red-500 rounded text-center"
                >
                  Inactive
                </div>
              </td> -->
              <td class="w-20 text-center" v-if="role_user == 1000 || role_user == 10">
                <base-dropdown
                  dropdownClass="w-32 text-gray-700"
                  :dropdownMaxWidthAuto="true"
                >
                  <div
                    slot="toggle"
                    class="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm"
                  >
                    <base-icon
                      icon="menu"
                      width="10"
                      height="10"
                      color="gray"
                    />
                  </div>
                  <base-dropdown-item class="bg-red-50 text-red-500 hover:bg-red-200" @click="deleteUserClick(u)">
                    Delete
                  </base-dropdown-item>
                  <!-- <base-dropdown-item @click="editClick(u)" class="z-50">
                    Edit
                  </base-dropdown-item> -->
                  <!-- <base-dropdown-item @click="statusToggleClick(u)">
                    {{ u.status == 'complete' ? 'Disable' : 'Enable' }}
                  </base-dropdown-item> -->
                </base-dropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <manage-user ref="manageUser" @added="fetch" @updated="fetch" />
    <manage-user-organization ref="manageUserOrganization" @added="fetch" @updated="fetch"></manage-user-organization>

    <base-dialog ref="removeUserDialog" type="remove" />
  </div>
</template>

<script>
import ManageUser from '@/components/user/manage-user'
import ManageUserOrganization from '@/components/user/manage-user-organization.vue'

export default {
  middleware: 'auth',
  components: { ManageUser, ManageUserOrganization },
  computed: {
    users() {
      const self = this
      var list = this.$store.getters['user/getList']
      if (self.q) {
        list = list.filter((e) => {
          if (e.user.email && e.user.email.toLowerCase().search(self.q.toLowerCase()) > -1)
            return true
          else return false
        })
      }

      if (self.status) {
        list = list.filter((e) => {
          if (e.isActive == self.status) return true
          else return false
        })
      }
      return list
    },
    organization_id() {
      return this.$store.getters['organizations/getOrganizationId']
    },
    check_user() {
      let user = this.$store.getters['me/getUser']
      if (user.ldap_username) return false
      else return true
    },
    role_user() {
      let role = this.$store.getters['me/getRole']
      return role
    }
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
      await this.$store.dispatch('user/fetch', this.organization_id)
      this.$store.dispatch('loading/setLoading', false)
    },
    addClick() {
      this.$refs.manageUserOrganization.show()
    },
    editClick(user) {
      this.$refs.manageUserOrganization.show(user)
    },
    async statusToggleClick(user) {
      const self = this
      if (user.isActive) {
        // disable
        await self.$api.disableUser(user.userId)
      } else {
        // enable
        await self.$api.enableUser(user.userId)
      }
      self.fetch()
    },
    deleteUserClick(item) {
      let self = this
      if (self.$t('lang') == 'en') {
        self.$refs.removeUserDialog.show(
          `Are you sure to delete "${item.user.email}" ?`,
          `If you delete, you can't restore back.`,
          async function () {
            // self.$store.dispatch('loading/setLoading', true)
            await self.$api.deleteUserFromOrganization(self.organization_id, item.id)
              .then(() => {})
              .catch(() => {})
            
            self.fetch()
          }
        )
      }
      else if (self.$t('lang') == 'th') {
        self.$refs.removeUserDialog.show(
          `คุณแน่ใจว่าจะลบผู้ใช้"${item.user.email}" ?`,
          `ถ้าคุณลบ คุณจะไม่สามารถย้อนกลับผู้ใช้นี้ได้`,
          async function () {
            self.$store.dispatch('loading/setLoading', true)
            await self.$api.deleteUserFromOrganization(self.organization_id, item.user.id)
              .then(() => {})
              .catch(() => {})
              
            self.fetch()
          }
        )
      }
    }
  },
}
</script>

<style></style>
