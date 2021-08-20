<template>
  <div class="text-center">
    <div>
    </div>
    <div v-if="!confirm" class="text-3xl mb-2">{{$t('lang') == 'en' ? 'Confirm Registration' : 'ยืนยันการสมัคร'}}</div>
    <div v-if="confirm" class="text-3xl mb-2">{{$t('lang') == 'en' ? 'You are all set!' : 'ท่านได้ทำการสมัครเรียบร้อยแล้ว'}}</div>
    <div class="mx-10 rounded-sm" :class="message ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">{{message}}</div>

    <div class="text-left w-full md:w-1/2 mx-auto" v-if="!confirm">
      <div>{{ $t('lang') == 'en' ? 'Please create your password' : 'กรุณาสร้างรหัสผ่านของท่าน' }}</div>

      <base-input :label="$t('signup.labelPassword')" placeholder="********" type="password" v-model="password" class="py-3"></base-input>
      <base-input :label="$t('signup.labelConfirmPassword')" placeholder="********" type="password" v-model="confirmPassword" class="py-3"></base-input>
    </div>

    <div class="mx-auto p-5" v-if="confirm">
      <img class="mx-auto" src="../../assets/img/signup-confirmation.png" width="300" alt="">
    </div>

    <div v-if="error" class="w-full md:w-1/2 py-2 mx-auto text-red-500 bg-red-200 rounded-sm">
      <div>{{error}}</div>
    </div>

    <div class="py-5">
      <base-button v-if="!confirm" color="primary" @click="confirmClick()">{{$t('lang')== 'en' ? 'Confirm': 'ยืนยัน'}}</base-button>
      <base-button v-if="confirm" color="primary" @click="gotoLoginClick()">{{$t('lang') == 'en' ? 'Login':'เข้าสู่ระบบ'}}</base-button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  asyncData({query}) {
    return {
      id: query.id,
      token: query.token
    }
  },
  data() {
    return {
      confirm: false,
      error: '',
      password: '',
      confirmPassword: '',
      message: ''
    }
  },
  methods: {
    async confirmClick() {
      let self = this;
      let error = ''
      self.$store.dispatch('loading/setLoading', true)

      if (!self.password) error = self.$t('lang') == 'en' ? 'Please Enter password' : 'กรุณากรอกรหัสผ่าน'
      if (!self.confirmPassword) error = self.$t('lang') == 'en' ? 'Please Enter confirm password' : 'กรุณากรอกยืนยันรหัสผ่าน'
      if (self.password != self.confirmPassword) error = self.$t('lang') == 'en' ? 'Password does not match' : 'กรุณาใส่รหัสผ่านให้เหมือนกันทั้งสองครั้ง'
      if (self.password.lenght < 6) error = self.$t('lang') == 'en' ? "Password must have length greater than 6" : 'รหัสผ่านต้องมากกว่า 6 ตัวอักษร'

      if (error) {
        self.error = error
        self.$store.dispatch('loading/setLoading', false)
        return
      }

      await self.$api.createPassword({
        user_id: self.id,
        verify_token: self.token,
        password: self.password
      })
        .then(response => {
          self.message = self.$t('signup.comfirmation')
          self.confirm = true
          self.$store.dispatch('loading/setLoading', false)
        })
        .catch(err => {
          self.message = ''
          
          self.error = err.response.data.message
          self.confirm = false
          
          self.$store.dispatch('loading/setLoading', false)
        })

    },
    gotoLoginClick() {
      this.$router.push({ path: this.localePath('login')})
    }
  }
}
</script>