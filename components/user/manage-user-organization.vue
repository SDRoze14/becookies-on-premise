<template>
  <base-modal v-model="isShow">
    <div class="text-xl mb-4">
      {{ $t('addUser.title') }}
    </div>
    <div class="text-sm text-gray-500 mb-4">
      {{$t('addUser.subtitle')}}
    </div>

    <!-- <div class="mt-2">
      <div>{{$t('addUser.labelName')}}</div>
      <base-input
        v-model="name"
        placeholder="e.g. name"
      ></base-input>
    </div> -->

    <div class="mt-2">
      <div>{{$t('addUser.labelEmail')}}</div>
      <base-input
        v-model="email"
        placeholder="e.g. name@domain.com"
      ></base-input>
    </div>

    <!-- <div class="mt-2">
      <div>{{$t('addUser.labelPassword')}}</div>
      <base-input
        v-model="password"
        type="password"
      ></base-input>
    </div> -->

    <!-- <div class="mt-2">
      <div>Organization ID</div>
      <base-input
        v-model="organizationId"
        disabled
      ></base-input>
    </div> -->

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
  mounted() {
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
        error = self.$t('lang') == 'en' ? 'Invalid email.' : 'อีเมลไม่ถูกต้อง'
      else if (!self.email) error = self.$t('lang') == 'en' ? 'Please enter your Email.' : 'กรุณากรอกอีเมล'

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
          .catch((error) => {
            self.$toast.open({
              message: error.response.data.message == 'Not found' ? self.$t('lang') == 'en' ? 'User not found' : 'ไม่พบผู้ใช้' : error.response.data.message,
              type: 'error',
              duration: 6000,
            })
            // var code = error.response.data.code
            // if (code == 'ValidationException')
            //   self.error = "Error can't find your email."
            // else if (code == 'UsernameExistsException') self.error = self.$t('lang') == 'en' ? 'This email has been used already' : 'อีเมลนี้ถูกใช้งานแล้ว'
            // else self.error = 'Unknow error.'
          })

      self.$store.dispatch('loading/setLoading', false)
    },
  },
}
</script>