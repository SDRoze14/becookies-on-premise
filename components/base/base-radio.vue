<template>
  <div class="flex items-center" @click="click">
    <input
      type="radio"
      :name="name"
      class="hidden"
      :value="inputValue"
      :checked="value == inputValue"
    />
    <label class="flex items-center cursor-pointer">
      <span
        class="w-5 h-5 inline-block mr-2 rounded-full border border-grey-600"
      ></span>
      {{ label }}</label
    >
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
      type: [String, Number, Boolean, Array],
      default: '',
    },
    inputValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    click() {
      this.$emit('update', this.inputValue)
    },
  },
}
</script>

<style>
input[type='radio'] + label span {
  transition: background 0.2s, transform 0.2s;
}
input[type='radio'] + label span:hover,
input[type='radio'] + label:hover span {
  transform: scale(1.1);
}
input[type='radio']:checked + label span {
  background-color: #0e64c6;
  box-shadow: 0px 0px 0px 4px white inset;
  /* border-color: #0e64c6; */
}
</style>
