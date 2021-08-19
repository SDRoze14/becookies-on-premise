<template>
  <div v-click-outside="hideEvent" class="relative w-full">
    <button
      @click="openClick"
      class="outline-none focus:outline-none"
      :class="toggleClass"
    >
      <div v-if="text">
        <div
          class="rounded border text-sm py-2 px-4 flex justify-between items-center"
          :class="{
            'border-gray-200  text-gray-500':
              !disabled && theme != 'primary' && theme != 'primary-border',
            'bg-blue-100 border-blue-100  text-primary': theme == 'primary',
            'border-primary  text-primary': theme == 'primary-border',
            'bg-gray-100 cursor-not-allowed': disabled,
          }"
        >
          <div class="truncate">
            {{ text }}
          </div>
          <base-icon
            class="ml-4"
            icon="dropdown"
            width="10"
            height="10"
          ></base-icon>
        </div>
      </div>
      <slot v-else name="toggle" />
    </button>
    <div
      v-show="open"
      class="absolute right-0 origin-top-right rounded-md shadow-md z-10"
      :class="dropdownClassComp"
      :style="{ width: dropdownWidthFull ? 'inherit' : '' }"
    >
      <div class="bg-white rounded-md shadow-lg overflow-hidden">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  inheritAttrs: false,
  directives: {
    ClickOutside,
  },
  provide() {
    return {
      parent: this,
    }
  },
  props: {
    theme: {
      type: String,
      default: 'default',
    },
    position: {
      type: String,
      default: 'bottom',
    },
    positionH: {
      type: String,
      default: 'right',
    },
    text: {
      type: String,
      default: '',
    },
    toggleClass: {
      type: String,
      default: '',
    },
    dropdownClass: {
      type: String,
      default: '',
    },
    dropdownMaxWidthAuto: {
      type: Boolean,
      default: false,
    },
    dropdownWidthFull: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { open: false }
  },
  computed: {
    dropdownClassComp() {
      return `${this.dropdownClass} ${
        !this.dropdownMaxWidthAuto ? 'max-w-full' : ''
      }
      ${this.position == 'bottom' ? 'top-0 mt-10' : 'bottom-0 mb-10'} ${
        this.positionH == 'left' ? 'left-0' : 'right-0'
      }`
    },
  },
  methods: {
    openClick() {
      if (this.disabled) return
      this.open = !this.open
    },
    hideEvent() {
      this.open = false
    },
    hide() {
      this.open = false
    },
  },
}
</script>
