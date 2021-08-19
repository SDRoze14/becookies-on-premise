<template>
  <div
    class="px-4 py-2 text-sm bg-transparent hover:bg-gray-100 cursor-pointer"
    @click="clickEvent"
  >
    <slot />
  </div>
</template>

<script>
export default {
  inject: ['parent'],
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    clickEvent(e) {
      this.parent.hide()
      this.$emit('click', e)
    },
  },
}
</script>
