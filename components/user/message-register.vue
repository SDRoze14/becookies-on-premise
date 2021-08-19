<template>
  <div>
    <base-modal v-model="isShow" :width="900">
      <div class="text-xl">{{ $t('stepUse.title')}}</div>
      <div>
        <!-- <div class="flex pt-5 items-center">
          <div
            class="w-10 bg-primary py-1 text-center text-white rounded-full text-xl"
          >
            1
          </div>
          <div class="pl-3 text-lg">สมัครเข้าใช้งาน</div>
        </div>
        <div class="pl-12 text-gray-400">
          โดยโดเมนของอีเมลที่ใช้ลงทะเบียนจะต้องเป็นโดเมนเดียวกับเว็บไซต์ที่ต้องการจะนำ​
          script​ ไปวาง​
        </div> -->
        <div class="flex py-5 items-center">
          <div
            class="w-10 bg-primary py-1 text-center text-white rounded-full text-xl"
          >
            1
          </div>
          <div class="pl-3 text-lg">
            {{ $t('stepUse.text1') }}
          </div>
        </div>
        <div class="border border-gray-100 bg-gray-100 rounded-md px-4 py-3">
          <div class="flex justify-between">
            <div class="uppercase">Script</div>
            <div @click="copyClick">
              <base-icon
                icon="copy"
                width="20"
                height="20"
                class="text-gray-400 cursor-pointer"
              />
            </div>
          </div>
          <div class="text-sm my-3">
            {{ user.script }}
          </div>
        </div>
      </div>
      <!-- <div class="text-sm text-gray-400 py-2">*ขั้นตอนนี้แนะนำให้ทางทีม หรือผู้พัฒนาเว็บไซต์เป็นผู้ดำเนินการ</div> -->

      <div class="flex py-5 items-center">
        <div
          class="w-10 bg-primary py-1 text-center text-white rounded-full text-xl"
        >
          2
        </div>
        <div class="pl-3 text-lg">{{ $t('stepUse.text2') }}</div>
      </div>

      <div class="text-gray-500 py-3">
        {{ $t('stepUse.note') }}
      </div>

      <div
        class="text bg-green-200 text-green-700 text-center rounded py-2 px-3"
      >
        <div>
          {{
            $t('lang') == 'en'
              ? 'You have registered already.'
              : 'ท่านได้สมัครใช้งานเรียนร้อย'
          }}
        </div>
        <div>
          {{
            $t('lang') == 'en'
              ? 'Please check your email for verifying your account.'
              : 'กรุณาตรวจสอบอีเมลของท่านเพื่อยืนยันการสมัคร'
          }}
        </div>
      </div>

      <!-- <div class="text bg-green-200 text-green-700 text-center rounded py-2">
      {{
        $t('lang') == 'en'
          ? 'Please check your email to confirm your registration'
          : 'ท่านได้สมัครเข้าใช้เรียนร้อย กรุณาตรวจสอบอีเมล์ของท่านเพื่อยืนยันการสมัคร'
      }}
    </div> -->

      <!-- <div class="py-3">
      <img src="../../assets/img/mail-sent.png" width="250" alt="" class="mx-auto">
    </div> -->

      <div class="flex mt-5">
        <div class="mx-auto">
          <base-button color="primary" @click="message2Click">{{
            $t('confirmBtn')
          }}</base-button>
        </div>
      </div>
    </base-modal>

    <message-comfirm ref="MessageConfirmRef" />
  </div>
</template>

<script>
import MessageComfirm from '@/components/user/message-comfirm'
export default {
  components: { MessageComfirm },
  data() {
    return {
      isShow: false,
      user: {},
    }
  },
  methods: {
    show(user = {}) {
      this.isShow = true
      this.user = user
    },
    copyClick() {
      const self = this
      navigator.clipboard.writeText(self.user.script).then(
        function () {
          self.$toast.open({
            message:
              this.$t('lang') == 'en'
                ? 'Copy to clipboard.'
                : 'คัดลอกไปยัง clipboard',
            type: 'success',
            duration: 4000,
          })
        },
        function (err) {}
      )
    },
    message2Click() {
      // this.$refs.MessageConfirmRef.show()
      this.isShow = false
      // this.$emit('added' ,true)
    },
  },
}
</script>
