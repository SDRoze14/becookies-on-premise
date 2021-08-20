<template>
  <div class="">
    <div class="text-center text-2xl py-5 border-gray-100 border-b-2">{{$t('pass.change.title')}}</div>

    <div v-if="!success">
      <div class="py-4 w-full md:w-1/2 mx-auto">
        <div class="py-3">
          <base-input
            :label="$t('pass.change.new')"
            placeholder="********"
            type="password"
            v-model="password"
          ></base-input>
        </div>

        <div class="py-3">
          <base-input
            :label="$t('pass.change.confirm')"
            placeholder="********"
            type="password"
            v-model="confirm"
          ></base-input>
        </div>
      </div>

      <div v-if="error" class="py-2">
        <div class="text-sm text-red-600 bg-red-200 px-3 py-2">{{ error }}</div>
      </div>

      <div class="text-center py-2 mx-auto">
        <base-button color="primary" @click="submitClick">{{$t('pass.change.btn_submit')}}</base-button>
      </div>
    </div>

    <div v-if="success" class="py-10">
      <img class="mx-auto my-3" src="../../assets/img/signup-confirmation.png" width="300" alt="">
      <div class="text-center text-sm text-gray-500">
        {{$t('pass.change.text_success')}}
      </div>
      <div class="text-center text-sm text-gray-500">
        {{$t('pass.change.goto')}} <span class="text-primary"><a href="/login">{{$t('pass.change.text_login')}}</a></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  asyncData({ query }) {
    return { id: query.id, resetToken: query.token }
  },
  data() {
    return {
      password: '',
      confirm: '',
      error: '',
      success: false,
    }
  },
  methods: {
    async submitClick() {
      let self = this
      let error = ''

      if (!self.password) error = self.$t('pass.change.err_empty_new')
      else if (!self.confirm) error = self.$t('pass.change.err_empty_confirm')
      else if (self.password != self.confirm)
        error = self.$t("pass.change.err_not_match")

      if (error) {
        self.error = error
        return
      }
      self.$store.dispatch('loading/setLoading', true)

      await self.$api
        .resetPassword({
          userId: self.id,
          resetToken: self.resetToken,
          newPassword: self.password,
        })
        .then(async (response) => {
          if (response.data.success) {
            self.$toast.open({
              message: self.$t("pass.change.success"),
              type: 'success',
              duration: 6000,
            })
            await self.$store.dispatch('me/logout')
            self.success = true
          } else {
            self.$toast.open({
              message: self.$t("pass.change.not_success"),
              type: 'error',
              duration: 6000,
            })
            self.error =  self.$t("pass.change.not_success")
          }
        })
        .catch((err) => {
          self.$toast.open({
            message: err.response.data.info
              ? err.response.data.info
              : self.$t("pass.change.somthing_wrong"),
            type: 'error',
            duration: 6000,
          })
          self.error = err.response.data.info
            ? err.response.data.info
            : self.$t("pass.change.somthing_wrong")
        })

      self.$store.dispatch('loading/setLoading', false)
    },
  },
}
</script>
