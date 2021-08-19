<template>
  <div class="relative">
    <div class="tooltip-slot">
      <slot />
    </div>
    <div
      class="tooltip-over absolute bg-black text-white text-xs rounded py-1 px-4 right-0 top-0"
    >
      {{ label }}
      <svg
        class="absolute text-black h-2 w-full left-0 top-full"
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
        xml:space="preserve"
      >
        <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    event: 'update',
  },
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>

<style>
.tooltip-slot {
  @apply py-1;
}
.tooltip-slot ~ .tooltip-over {
  opacity: 0;
  transform: translateY(-100%);
}
.tooltip-slot:hover ~ .tooltip-over {
  opacity: 1;
}
</style>
