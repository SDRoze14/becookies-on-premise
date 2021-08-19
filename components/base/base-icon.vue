<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size || width"
    :height="size || height"
    :viewBox="viewBox"
    :aria-labelledby="name"
    class="base-icon"
    role="presentation"
  >
    <title :id="name" lang="en">{{ name }}</title>
    <g v-if="icon" :fill="color == 'primary' ? '#0e64c6' : color">
      <component v-bind:is="dynamicIcon" />
    </g>
    <g v-else :fill="color">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
    size: {
      type: [Number, String],
      default: undefined,
    },
    color: {
      type: String,
      default: 'currentColor',
    },
    viewBox: {
      type: String,
      default: '', // 0 0 24 24
    },
    icon: {
      type: String,
      detault: '',
    },
  },
  computed: {
    dynamicIcon() {
      return () => import(`@/components/icon/${this.icon}.vue`)
    },
  },
}
</script>

<style>
.base-icon {
  @apply inline-block;
}
.base-icon + * {
  @apply ml-2;
}
</style>
