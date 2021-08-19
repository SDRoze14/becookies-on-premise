<template>
  <div class="flex bg-gray-50 rounded-md px-2 w-full" :class="contentClass">
    <div
      v-for="(t, i) in tabs"
      :key="`tab-${i}`"
      class="py-2 px-8 mx-2 my-4 border rounded-md text-sm cursor-pointer"
      :class="{
        'bg-blue-100 border-primary text-primary': i == value,
        ' bg-transparent border-transparent text-gray-500': i != value,
      }"
      @click="$emit('update', i)"
    >
      {{ t }}
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
    value: {
      type: Number,
      detault: 0,
    },
    tabs: {
      type: Array,
      detault: [],
    },
    contentClass: {
      type: String,
      default: '',
    },
  },
  watch: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
