<template>
  <base-dropdown
    :dropdownWidthFull="true"
  >
    <div slot="toggle" class="flex items-center px-4 py-2 rounded-md bg-gray-300 text-gray-500 hover:text-gray-600">
      <base-icon icon="organization" width="20" color="gray"></base-icon>
      <div class="text-sm">{{organization.name}}</div>
      <base-icon icon="dropdown" class="ml-5" size="10"></base-icon>
    </div>
    <base-dropdown-item
      v-for="(item, i) in organizations"
      :key="`organization-${i}`"
      @click="selectOrganizationClick(item)"
      :class="{'bg-gray-200' : select_id == item.id}"
    >
      <div class="text-sm truncate">{{item.name}}</div>
    </base-dropdown-item>
  </base-dropdown>
</template>

<script>
export default {
  props: {
    // select_id: {
    //   type: String,
    //   default: ''
    // }
  },
  computed: {
    organizations() {
      return this.$store.getters['organizations/getList']
    }
  },
  data() {
    return {
      organization: {},
      select_id: ''
    }
  },
  watch: {
    select_id() {
      this.refreshOrganization()
    },
    organizations() {
      this.refreshOrganization()
    }
  },
  methods: {
    refreshOrganization() {
      const self = this
      if (!self.organizations.length) return

      self.select_id = localStorage.getItem('organization_id')
      this.$api.getOrganization(self.select_id)
      .then( (response) => {
         this.$store.commit('me/SET_ROLE', response.data.organization_user.role)
      })
      .catch(error => {
        console.log(error.response.data)
      })
      if (self.select_id) {
        const org = self.organizations.find(e => 
          e.id == self.select_id
        )


        if (org) self.organization = org
        else self.organization = self.organizations[0]
      } else {
        self.organization = self.organizations[0]
        self.$emit('change', self.organization)
      }
    },
    async selectOrganizationClick(o) {
      this.$store.dispatch('loading/setLoading', true)
      let router_check = ['websites-id___th', 'websites-id___en']
      setTimeout(async () => {
        if (router_check.includes(this.$route.name)) {
          this.$router.push({ path: this.localePath('user') })
        }
        location.reload()
      }, 1000)
      this.$emit('change', o)
    }
  }
}
</script>
