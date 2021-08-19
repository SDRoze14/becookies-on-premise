<template>
  <div>

    <div class="border border-gray-100 bg-gray-50 rounded-md px-4 py-3">
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
        {{script}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      script: '',
    }
  },
  computed: {
  },
  async mounted() {
    const self = this
    self.$store.dispatch('loading/setLoading', true)
    let url = 'https://core.staging.becookies.tech/onprem'
    self.script = `<script id="becookies.tech-scripts" async="" src="${url}/script.js" data-id="${self.id}" charset="utf-8"><\/script>`
    // await self.$api
    //   .getScript(self.applicationId)
    //   .then((response) => {
    //     self.script = response.data
    //   })
    //   .catch((eror) => {
    //   })
    self.$store.dispatch('loading/setLoading', false)
  },
  methods: {
    copyClick() {
      const self = this
      navigator.clipboard.writeText(self.script).then(
        function () {
          self.$toast.open({
            message: self.$t('lang') == 'en' ? 'Copy to clipboard.' : 'คัดลอกไปยัง clipboard',
            type: 'success',
            duration: 4000,
          })
        },
        function (err) {
        console.log(err)
        }
      )
    },
  },
}
</script>
