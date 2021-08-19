<template>
  <div class="">
    <div
      v-if="!success"
      class="text-center text-2xl py-5 border-gray-100 border-b-2"
    >
      {{ $t('lang') == 'en' ? 'Create New Password' : 'ตั้งค่ารหัสผ่านใหม่' }}
    </div>
    <div
      v-if="success"
      class="text-center text-2xl py-5 border-gray-100 border-b-2"
    >
      {{ $t('lang') == 'en' ? 'New Password Created' : 'ตั้งค่ารหัสผ่านใหม่สำเร็จ' }}
    </div>

    <div v-if="!success">
      <div class="py-4 w-full md:w-1/2 mx-auto">
        <div class="py-3">
          <base-input
            :label="$t('lang') == 'en' ? 'New Password*' : 'รหัสผ่านใหม่'"
            placeholder="********"
            type="password"
            v-model="password"
          ></base-input>
        </div>

        <div class="py-3">
          <base-input
            :label="
              $t('lang') == 'en'
                ? 'Confirm New Password*'
                : 'ยืนยันรหัสผ่านใหม่'
            "
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
        <base-button color="primary" @click="submitClick()">{{
              $t('lang') == 'en' ? 'Submit' : 'ตกลง'
            }}</base-button>
      </div>
    </div>

    <div v-if="success" class="py-10">
      <img
        class="mx-auto my-3"
        src="../../assets/img/signup-confirmation.png"
        width="300"
        alt=""
      />
      <!-- <div class="text-center text-sm text-gray-500">
        {{$t('lang') == 'en' ? 'Please login agian.' : 'เปลี่ยนรหัสผ่านสำเร็จ กรุณาเข้าสู่ระบบอีกครั้ง'}}
      </div> -->
      <div class="text-center py-3 text-gray-500">
        <base-button color="primary">
          <span class="text-white"
            ><a href="/login">{{
              $t('lang') == 'en' ? 'Login' : 'เข้าสู่ระบบ'
            }}</a></span
          ></base-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  asyncData({ query }) {
    return { resetToken: query.token }
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

      if (!self.password) error = 'Please enter new password'
      else if (!self.confirm) error = 'Please enter confirm new password'
      else if (self.password != self.confirm)
        error = 'New password and confirm new password do not match'

      if (error) {
        self.error = error
        return
      }
      self.$store.dispatch('loading/setLoading', true)

      await self.$api.resetPassword({
          reset_token: self.resetToken,
          password: self.password,
        })
        .then((response) => {
          self.$toast.open({
            message: self.$t('lang') == 'en' ? 'Reset password successfully' : 'เปลี่ยนรหัสผ่านเรียบร้อย',
            type: 'success',
            duration: 6000,
          })
          self.$store.dispatch('me/logout')
          self.success = true
          self.$store.dispatch('loading/setLoading', false)
        })
        .catch((error) => {
          self.$toast.open({
            message: error.response.data.message
              ? error.response.data.message
              : self.$t('lang') == 'en' ? 'Something wrong. Please try again' : 'มีบางอย่างผิดพลาด โปรดลองอีกครั้ง',
            type: 'error',
            duration: 6000,
          })
          error = error.response.data.message
            ? error.response.data.message
            : self.$t('lang') == 'en' ? 'Something wrong. Please try again' : 'มีบางอย่างผิดพลาด โปรดลองอีกครั้ง',
          self.eror = error
          self.$store.dispatch('loading/setLoading', false)
        })


    },
  },
}
</script>
