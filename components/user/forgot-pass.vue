<template>
  <base-modal v-model="isShow">
    <div class="py-3 border-b-2 border-gray-100 text-center">{{$t('lang') == 'en' ? 'Forgot Password' : 'ลืมรหัสผ่าน'}}</div>
    <div class="text-sm text-gray-500 py-2">
      {{$t('lang') == 'en' ? 'Please enter your email and check your inbox' : 'กรุณากรอกอีเมล และตรวจสอบกล่องข้อความขาเข้าของท่าน'}}
    </div>

    <base-input type="email" v-model="email" :placeholder="$t('lang') == 'en' ? 'Enter email address' : 'กรอกอีเมล'"></base-input>

    <div v-if="error" class="py-2 bg-red-50 text-red-600 text-sm mt-3 px-3 rounded-sm">
      {{error}}
    </div>

    <div class="flex mt-10 justify-center">
      <div class="mx-2">
        <base-button color="gray" @click="isShow = false">{{$t('cancleBtn')}}</base-button>
      </div>
      <div class="mx-2">
        <base-button color="primary" @click="confirmClick">{{ $t('lang') == 'en' ? 'Forgot' : 'ลืมรหัสผ่าน' }}</base-button>
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

      
      if (!self.email) error = self.$t('lang') == 'en' ? 'Please enter your email.' : 'กรุณากรอกอีเมล'
      else if (!self.$model.validateEmail(self.email)) error = self.$t('lang') == 'en' ? 'Invalid email' : 'อีเมลไม่ถูกต้อง'

      self.error = error

      if (self.error) return

      await self.$store.dispatch('loading/setLoading', true)

      await self.$api.forgotPassword({
        email: self.email
      })
        .then(response => {
          self.$toast.open({
            message: self.$t('lang') == 'en' ? 'Send Email Success.' : 'อีเมลถูกส่งแล้ว',
            type: 'success',
            duration: 6000,
          })
          self.isShow = false
        })
        .catch(error => {
          self.$toast.open({
            message: error.response.data.message == 'Not found' ? self.$t('lang') == 'en' ? 'Could not find an email address' : 'ไม่พบอีเมลนี้ในระบบ' : error.response.data.message,
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