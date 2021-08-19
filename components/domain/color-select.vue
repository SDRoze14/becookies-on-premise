<template>
  <div class="flex items-center">
    <div
      class="w-8 h-8 rounded border border-gray-300"
      :style="`background: ${value};`"
    ></div>
    <div class="text-gray-500 font-light p-2">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  data() {
    return {}
  },
  components: {},
  methods: {},
}
</script>

<style></style>
