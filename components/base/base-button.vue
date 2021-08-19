<template>
  <button
    class="text-sm px-8 py-2 rounded-full border outline-none focus:outline-none"
    :class="style"
    :type="type"
    style="transition: all 0.15s ease 0s"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  inheritAttrs: true,
  props: {
    type: {
      type: String,
      default: 'button',
      validator(value) {
        return ['button', 'submit'].includes(value)
      },
    },
    color: {
      type: String,
      default: 'primary',
      validator(value) {
        return [
          'dark',
          'gray',
          'primary',
          'border-primary',
          'transparent',
          'border-green',
          'border-red',
        ].includes(value)
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    style() {
      if (this.color == 'transparent') {
        return 'bg-transparent text-primary border-transparent'
      } else if (this.color == 'primary') {
        return 'bg-primary text-white border-primary'
      } else if (this.color == 'border-primary') {
        return 'bg-transparent text-primary border-primary'
      } else if (this.color == 'gray') {
        return 'bg-gray-200 text-gray-500 border-gray-200'
      } else if (this.color == 'dark') {
        return 'bg-gray-900 text-white border-gray-900'
      } else if (this.color == 'border-green') {
        return 'bg-transparent text-green-600 border-green-600'
      } else if (this.color == 'border-red') {
        return 'bg-transparent text-red-600 border-red-600'
      } else return
    },
  },
  mounted() {},
  methods: {},
}
</script>
