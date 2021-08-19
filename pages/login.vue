<template>
  <div class="p-6">
    <div class="flex flex-wrap mt-10 mb-6 md:divide-x-2 divide-gray-200 items-center">
      <div class="w-full md:w-1/2 md:pr-8">
        <div class="flex items-center">
          <div class="text-3xl mr-2">
            {{ $t('lang') == 'en' ? 'Login' : 'เข้าสู่ระบบ' }}
          </div>
          <!-- <div class="text-2xl mt-1">beCOOKIES</div> -->
        </div>
        <form @submit="loginSubmit">
          <div class="mb-4">
            <base-input
              :label="
                $t('lang') == 'en' ? 'Email address' : 'อีเมล'
              "
              :placeholder="
                $t('lang') == 'en' ? 'Enter email address' : 'กรอกอีเมล'
              "
              v-model="email"
              innerClass="lowercase"
            ></base-input>
          </div>
          <div class="mb-4">
            <base-input
              :label="$t('lang') == 'en' ? 'Password' : 'รหัสผ่าน'"
              :placeholder="
                $t('lang') == 'en' ? 'Enter password' : 'กรอกรหัสผ่าน'
              "
              type="password"
              v-model="password"
            ></base-input>
          </div>
          <!-- <div class="mb-4 text-right">
            <nuxt-link to="/forgot" class="text-primary text-sm">
              Forgot password ?
            </nuxt-link>
          </div> -->

          <div
            v-if="error"
            class="mb-4 bg-red-100 text-red-500 text-sm px-4 py-2 rounded-md"
          >
            {{ error }}
          </div>

          <div class="flex items-center">
            <!-- <div
              class="mr-auto cursor-pointer text-primary text-sm"
              @click="forgotPassClick"
            >
              {{ $t('lang') == 'en' ? 'Forgot password?' : 'ลืมรหัสผ่าน?' }}
            </div> -->
            <base-button class="ml-auto" type="submit">{{
              $t('lang') == 'en' ? 'LOGIN' : 'เข้าสู่ระบบ'
            }}</base-button>
          </div>
        </form>
      </div>
      <div class="w-full md:w-1/2 md:pl-8 text-center">
        <div class="py-6">
          <p class="my-4" style="white-space: pre-line">
            {{
              $t('lang') == 'en'
                ? 'Simplify cookie compliance for GDPR \n and ePrivacy direction'
                : 'เข้ากับ GDPR ของยุโรป  และทำให้ ePrivacy ง่ายขึ้น'
            }}
          </p>
          <div class="flex items-center justify-center">
            <!-- <nuxt-link to="/signup" class="text-primary text-sm mr-6">
              New user ?
            </nuxt-link>
            <nuxt-link to="/signup">
              <base-button color="border-primary">Sign up here!</base-button>
            </nuxt-link> -->
          </div>
        </div>
      </div>
    </div>

    <forgot-pass ref="forgotPass"></forgot-pass>
  </div>
</template>

<script>
import ForgotPass from '@/components/user/forgot-pass'
export default {
  layout: 'auth',
  components: { ForgotPass },
  data() {
    return {
      email: '',
      password: '',

      error: '',
    }
  },
  computed: {
    token() {
      return this.$store.getters['me/getToken']
    },
  },
  mounted() {
    if (this.token) {
      this.$router.push('/websites')
    }
  },
  methods: {
    async loginSubmit(e) {
      e.preventDefault()
      const self = this

      self.error = ''
      let type = 0

      if (self.$model.validateEmail(self.email)) type = 0
      else type = 1 

      self.$store.dispatch('loading/setLoading', true)
      const res = await self.$store.dispatch('me/login', {
        email: self.email.toLowerCase(),
        password: self.password,
        type: type
      })
      if (res instanceof Error) {
        self.error =
          self.$t('lang') == 'en'
            ? 'Email or Password invalid.'
            : 'อีเมล หรือ รหัสผ่าน ไม่ถูกต้อง'
      } else {
        setTimeout(() => {
          window.location.replace(self.$router.options.base + 'websites')
        }, 400)
      }
      self.$store.dispatch('loading/setLoading', false)
    },
    forgotPassClick() {
      this.$refs.forgotPass.show()
    },
  },
}
</script>