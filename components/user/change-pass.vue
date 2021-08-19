<template>
  <base-modal v-model="isShow">
    <div class="py-3 border-b-2 border-gray-100 text-center">{{$t('lang') == 'en' ? 'Change Password' : 'เปลี่ยนรหัสผ่าน'}}</div>
    <!-- <div class="text-sm text-gray-500 py-2" style="white-space: pre-line;">
      {{ $t('lang') == 'en' ? 'Would you like to change password? \nIf yes, please fill current your password, new password and confirm new password' : 'คุณต้องการเปลี่ยนรหัสผ่านใช่หรือไม่? \nหากต้องการเปลี่ยน กรุณากรอกรหัสผ่านปัจจุบันของคุณ รหัสผ่านใหม่ และยืนยันรหัสผ่านใหม่'}}
      Do you want to change your password? If you want to change, click "confirm", the system will send URL for change password to email "<span class="font-medium">{{user.email}}</span>".
    </div> -->

    <div class="w-full py-3">
      <base-input class="pb-3" type="password" :label="$t('lang') == 'en' ? 'Current Password' : 'รหัสผ่านปัจจุบัน'" v-model="old_password"></base-input>
      <base-input class="pb-3" type="password" :label="$t('lang') == 'en' ? 'New Password' : 'รหัสผ่านใหม่'" v-model="new_password"></base-input>
      <base-input type="password" :label="$t('lang') == 'en' ? 'Confirm New Password' : 'ยืนยันรหัสผ่านใหม่'" v-model="confirm_password"></base-input>
    </div>

    <div v-if="error" class="py-2 px-3 bg-red-50 text-red-600 text-sm mt-3">
      {{error}}
    </div>

    <div class="flex mt-3 justify-center">
      <div class="mx-2">
        <base-button color="gray" @click="isShow = false">{{$t('cancleBtn')}}</base-button>
      </div>
      <div class="mx-2">
        <base-button color="primary" @click="confirmClick">{{$t('lang') == 'en' ? 'Save' : 'บันทึก'}}</base-button>
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
      old_password: '',
      new_password: '',
      confirm_password: '',
      error: ''
    }
  },
  methods: {
    show(user) {
      this.isShow = true
      this.user = user
    },
    async confirmClick() {
      let self = this;
      let error = ''

      if (!self.old_password) error = self.$t('lang') == 'en' ? 'Please enter current password' : 'กรุณากรอกรหัสผ่านปัจจุบัน'
      else if (!self.new_password) error = self.$t('lang') == 'en' ? 'Please enter new password' : 'กรุณากรอกรหัสผ่านใหม่'
      else if (!self.confirm_password) error = self.$t('lang') == 'en' ? 'Please enter confirm new password' : 'กรุณากรอกยืนยันรหัสผ่านใหม่'
      else if (self.confirm_password != self.new_password) error = self.$t('lang') == 'en' ? 'Password do not match' : 'รหัสผ่านไม่ตรงกัน'

      self.error = error
      if(error) return

      await self.$store.dispatch('loading/setLoading', true)

      await self.$api.changePassword({
        old_password: self.old_password,
        new_password: self.new_password
      })
        .then(response => {
          self.$toast.open({
            message: self.$t('lang') == 'en' ? 'Change Password Successfully.' : 'เปลี่ยนรหัสผ่านแล้ว',
            type: 'success',
            duration: 6000,
          })
          self.old_password = ''
          self.new_password = ''
          self.confirm_password = ''
          self.isShow = false
        })
        .catch(error => {
          self.$toast.open({
            message: error.response.data.message ? error.response.data.message : self.$t('lang') == 'en' ? 'Something wrong. Please try again' : 'มีบางอย่างผิดพลาด โปรดลองอีกครั้ง',
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