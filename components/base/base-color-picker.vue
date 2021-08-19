<template>
  <div v-click-outside="hideEvent" class="relative w-full">
    <div class="flex items-center">
      <div class="w-8">
        <div
          class="w-8 h-8 rounded border border-gray-300 cursor-pointer"
          v-bind:style="`background-color: ${colors.hex8}`"
          @click="openClick"
        ></div>
      </div>
      <div class=" px-2 text-sm font-light text-gray-400 break-normal leading-none">{{label}}</div>
    </div>

    <div class="absolute origin-top-right rounded-md shadow-md z-10" v-show="open">
      <sketch-picker :value="colors" v-on="inputListeners" v-bind="$attrs"></sketch-picker>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  directives: {
    ClickOutside,
  },
  inheritAttrs: false,
  model: {
    event: 'update',
  },
  props: {
    colors: {
      type: Object,
      default: {},
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    inputListeners() {
      const self = this
      return Object.assign({}, this.$listeners, {
        input: function (event) {
          self.$emit('update', event)
        },
      })
    },
  },
  methods: {
    hideEvent() {
      this.open = false
    },
    openClick() {
      this.open = !this.open
    },
  },
}
</script>
