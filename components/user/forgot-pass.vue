<template>
  <base-modal v-model="isShow">
    <div class="py-3 border-b-2 border-gray-100 text-center">{{$t('forget_pass.title')}}</div>
    <div class="text-sm text-gray-500 py-2">
      {{$t('forget_pass.subtitle')}}
    </div>

    <base-input type="email" v-model="email" :placeholder="$t('forget_pass.placeholder')"></base-input>

    <div v-if="error" class="py-2 bg-red-50 text-red-600 text-sm mt-3 px-3 rounded-sm">
      {{error}}
    </div>

    <div class="flex mt-10 justify-center">
      <div class="mx-2">
        <base-button color="gray" @click="isShow = false">{{$t('cancleBtn')}}</base-button>
      </div>
      <div class="mx-2">
        <base-button color="primary" @click="confirmClick">{{ $t('forget_pass.btn_forgot') }}</base-button>
      </div>
    </div>
  </base-modal>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      user: {},
      error: '',
      email: ''
    }
  },
  methods: {
    show(user) {
      this.isShow = true
      this.user = user
      this.email = ''
    },
    async confirmClick() {
      let self = this;

      let error = ''

      
      if (!self.email) error = self.$t('forget_pass.err_empty_email')
      else if (!self.$model.validateEmail(self.email)) error = self.$t('forget_pass.err_invalif_email')

      self.error = error

      if (self.error) return

      await self.$store.dispatch('loading/setLoading', true)

      await self.$api.forgotPassword({
        email: self.email
      })
        .then(response => {
          self.$toast.open({
            message: self.$t('forget_pass.send_success'),
            type: 'success',
            duration: 6000,
          })
          self.isShow = false
        })
        .catch(err => {
          self.$toast.open({
            message: err.response.data.message == 'Not found' ? self.$t('forget_pass.err_not_find_email') : error.response.data.message,
            type: 'error',
            duration: 6000,
          })
          self.isShow = false
        })
      await self.$store.dispatch('loading/setLoading', false)
    }
  }
}
</script>