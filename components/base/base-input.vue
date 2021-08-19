<template>
  <div>
    <label class="block text-sm">
      <span class="text-gray-600">{{ label }}</span>
      <textarea
        v-if="type == 'textarea'"
        class="block w-full text-sm form-textarea focus:border-primary focus:outline-none focus:shadow-outline-primary disabled:bg-gray-100"
        :class="innerClass"
        v-bind="$attrs"
        :placeholder="placeholder"
        v-on="inputListeners"
        :name="name"
        :disabled="disabled"
      ></textarea>
      <input
        v-else
        class="block w-full text-sm focus:border-primary focus:outline-none focus:shadow-outline-primary form-input disabled:bg-gray-50"
        :class="innerClass"
        v-bind="$attrs"
        :type="type"
        :placeholder="placeholder"
        v-on="inputListeners"
        :name="name"
        :disabled="disabled"
      />
    </label>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    event: 'update',
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    innerClass: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return [
          'email',
          'number',
          'password',
          'text',
          'textarea',
          'search',
        ].includes(value)
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    iconPosition: {
      type: String,
      default: 'left',
    },
  },
  data() {
    return {}
  },
  computed: {
    inputListeners() {
      const self = this
      return Object.assign({}, this.$listeners, {
        input: function (event) {
          self.$emit('update', event.target.value)
        },
        change: function (event) {
          self.$emit('change', event.target.value)
        },
      })
    },
  },
  methods: {},
}
</script>
