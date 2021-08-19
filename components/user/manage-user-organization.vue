<template>
  <base-modal v-model="isShow">
    <div class="text-xl mb-4">
      {{ $t('addUser.title') }}
    </div>
    <div class="text-sm text-gray-500 mb-4">
      {{$t('addUser.subtitle')}}
    </div>

    <div class="mt-2">
      <div>{{$t('addUser.labelEmail')}}</div>
      <base-input
        v-model="email"
        placeholder="e.g. name@domain.com"
      ></base-input>
    </div>

    <div
      v-if="error"
      class="mt-6 bg-red-100 text-red-500 text-sm px-4 py-2 rounded-md"
    >
      {{ error }}
    </div>

    <div class="mt-10 flex justify-end space-x-2">
      <base-button color="gray" @click="isShow = false">{{$t('cancleBtn')}}</base-button>
      <base-button @click="addClick">{{ $t('addUser.title') }}</base-button>
    </div>
  </base-modal>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      email: '',
      name: '',
      password: '',
      organizationId: '',
      role: 'member',

      error: '',
      user: {},
    }
  },
  computed: {
    roles() {
      return [
        { name: 'Admin', value: 'admin' },
        { name: 'Editor', value: 'editor' },
        { name: 'Member', value: 'member' },
      ]
    },
    isUpdate() {
      return this.user.userId ? true : false
    },
    // applications() {
    //   return this.$store.getters['application/getList']
    // },
    organization_id() {
      return this.$store.getters['organizations/getOrganizationId']
    }
  },
  methods: {
    show() {
      // this.organizationId = this.applications[0].organizationId
      this.email = ''
      this.isShow = true
    },
    async addClick() {
      const self = this

      var error = ''

      if (!self.$model.validateEmail(self.email))
        error = self.$t('user_org.err_invalid_email')
      else if (!self.email) error = self.$t('user_org.err_empty_email')

      self.error = error
      if (error) return

      let data = {
        email: self.email
      }

      self.$store.dispatch('loading/setLoading', true)
        await self.$api
          .addUserToOrganization(self.organization_id, data)
          .then(async (response) => {
            self.isShow = false
            self.$emit('added', true)
          })
          .catch((err) => {
            self.$toast.open({
              message: err.response.data.message == 'Not found' ? self.$t('user_org.err_not_found') : error.response.data.message,
              type: 'error',
              duration: 6000,
            })
          })

      self.$store.dispatch('loading/setLoading', false)
    },
  },
}
</script>