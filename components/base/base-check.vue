<template>
  <div class="flex items-center" @click="click">
    <input
      type="checkbox"
      :name="name"
      class="hidden"
      :value="inputValue ? inputValue : true"
      :checked="isChecked"
    />
    <label class="flex items-center cursor-pointer">
      <span
        class="bg-white w-5 h-5 mr-2 rounded border border-grey-600 flex items-center justify-center"
      >
        <base-icon
          v-if="isChecked"
          width="10"
          height="10"
          color="#0e64c6"
          icon="check"
        >
        </base-icon>
      </span>
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
      type: Boolean,
      default: false,
    },
    inputValue: {
      type: String,
      default: '',
    },
    multi: {
      type: Boolean,
      default: false,
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
  computed: {
    isChecked() {
      if (this.multi) {
        return this.value.includes(this.inputValue)
      } else {
        return this.value === this.inputValue || this.value == true
          ? true
          : false
      }
    },
  },
  mounted() {},
  methods: {
    click() {
      const self = this
      if (self.multi) {
        var value = this.value.slice()
        if (self.value.includes(self.inputValue)) {
          value = value.filter((e) => e != self.inputValue)
        } else {
          value.push(self.inputValue)
        }
        self.$emit('update', value)
      } else {
        self.$emit(
          'update',
          typeof self.value == 'string' ? self.inputValue : !self.value
        )
      }
    },
  },
}
</script>

<style>
input[type='checkbox'] + label span {
  transition: background 0.2s, transform 0.2s;
}
input[type='checkbox'] + label span:hover,
input[type='checkbox'] + label:hover span {
  transform: scale(1.1);
}
input[type='checkbox']:checked + label span {
  /* background-color: #0e64c6; */
  /* box-shadow: 0px 0px 0px 4px white inset; */
  /* border-color: #0e64c6; */
}
</style>
