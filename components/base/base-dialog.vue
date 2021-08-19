<template>
  <base-modal v-model="isShow">
    <div class="text-xl mb-4" :class="{'text-center' : type == 'remove'}">{{ title }}</div>
    <div class="font-light text-gray-500 mb-4" :class="{'text-center' : type == 'remove'}">
      {{ description }}
    </div>
    <div class="mt-10 flex justify-end space-x-2" :class="{'justify-center' : type == 'remove'}">
      <base-button class="uppercase" color="gray" @click="isShow = false">{{ $t('lang') == 'en' ? 'Cancel' : 'ยกเลิก'}}</base-button>
      <base-button class="uppercase" :color="confirmButtonColor" @click="onClick">{{
        confirmButton
      }}</base-button>
    </div>
  </base-modal>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'confirm',
      validate: function (t) {
        return ['confirm', 'remove'].includes(t)
      },
    },
  },
  data() {
    return {
      isShow: false,
      title: '',
      description: '',
      callback: undefined,
    }
  },
  computed: {
    confirmButton() {
      if (this.type == 'remove') return this.$t('lang') == 'en' ? 'Delete' : 'ลบ'
      else return 'Confirm'
    },
    confirmButtonColor() {
      if (this.type == 'remove') return 'border-red'
      else return 'primary'
    },
  },
  methods: {
    show(title, description, callback) {
      this.title = title
      this.description = description
      this.callback = callback
      this.isShow = true
    },
    onClick() {
      this.isShow = false
      this.callback()
    },
  },
}
</script>
