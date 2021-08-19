<template>
  <div class="">
    <div class="text-center text-2xl py-5 border-gray-100 border-b-2">{{$t('lang') == 'en' ? 'Change Password' : 'เปลี่ยนรหัสผ่าน'}}</div>

    <div v-if="!success">
      <div class="py-4 w-full md:w-1/2 mx-auto">
        <div class="py-3">
          <base-input
            :label="$t('lang') == 'en' ?'New Password*' : 'รหัสผ่านใหม่'"
            placeholder="********"
            type="password"
            v-model="password"
          ></base-input>
        </div>

        <div class="py-3">
          <base-input
            :label="$t('lang') == 'en' ?'Confirm New Password*' : 'ยืนยันรหัสผ่านใหม่'"
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
        <base-button color="primary" @click="submitClick">{{$t('lang') == 'en' ? 'Submit' : 'ตกลง'}}</base-button>
      </div>
    </div>

    <div v-if="success" class="py-10">
      <img class="mx-auto my-3" src="../../assets/img/signup-confirmation.png" width="300" alt="">
      <div class="text-center text-sm text-gray-500">
        {{$t('lang') == 'en' ? 'Change password successfully, please login agian.' : 'เปลี่ยนรหัสผ่านสำเร็จ กรุณาเข้าสู่ระบบอีกครั้ง'}}
      </div>
      <div class="text-center text-sm text-gray-500">
        {{$t('lang') == 'en' ? 'Go to' : 'ไปหน้า'}} <span class="text-primary"><a href="/login">{{$t('lang') == 'en' ? 'Login' : 'เข้าสู่ระบบ'}}</a></span>
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
  mounted() {},
  methods: {
    async submitClick() {
      let self = this
      let error = ''

      if (!self.password) error = self.$t('lang') == 'en' ? 'Please enter new password' : 'กรุณากรอกรหัสผ่านใหม่'
      else if (!self.confirm) error = self.$t('lang') == 'en' ? 'Please enter confirm new password' : 'กรุณากรอกยืนยันรหัสผ่านใหม่'
      else if (self.password != self.confirm)
        error = self.$t('lang') == 'en' ? 'New password and confirm new password do not match' : 'รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน'

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
              message: self.$t('lang') == 'en' ? 'Change password successfully' : 'เปลี่ยนรหัสผ่านเรียบร้อย',
              type: 'success',
              duration: 6000,
            })
            await self.$store.dispatch('me/logout')
            self.success = true
          } else {
            self.$toast.open({
              message: self.$t('lang') == 'en' ? 'Change password is not success' : 'เปลี่ยนรหัสผ่นาไม่สำเร็จ',
              type: 'error',
              duration: 6000,
            })
            error =  self.$t('lang') == 'en' ? 'Change password is not success' : 'เปลี่ยนรหัสผ่นาไม่สำเร็จ'
            self.eror = error
          }
        })
        .catch((error) => {
          self.$toast.open({
            message: error.response.data.info
              ? error.response.data.info
              : self.$t('lang') == 'en' ? 'Something wrong. Please try again' : 'มีบางอย่างผิดพลาด โปรดลองอีกครั้ง',
            type: 'error',
            duration: 6000,
          })
          error = error.response.data.info
            ? error.response.data.info
            : self.$t('lang') == 'en' ? 'Something wrong. Please try again' : 'มีบางอย่างผิดพลาด โปรดลองอีกครั้ง',
          self.eror = error
        })

      self.$store.dispatch('loading/setLoading', false)
    },
  },
}
</script>
