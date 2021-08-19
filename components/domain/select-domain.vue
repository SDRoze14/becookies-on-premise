<template>
  <base-dropdown
    :text="application.domain_name"
    theme="primary"
    :dropdownWidthFull="true"
  >
    <base-dropdown-item
      v-for="(a, i) in applications"
      :key="`application-${i}`"
      @click="selectApplicationClick(a)"
      :class="{ 'bg-blue-100': selectId == a.id }"
    >
      <div class="text-sm truncate">{{ a.domain_name }}</div>
    </base-dropdown-item>
  </base-dropdown>
</template>

<script>
export default {
  props: {
    selectId: {
      type: String,
      default: '',
    },
  },
  computed: {
    applications() {
      return this.$store.getters['application/getList']
    },
  },
  data() {
    return {
      application: {},
    }
  },
  watch: {
    selectId() {
      this.refreshApplication()
    },
    applications() {
      this.refreshApplication()
    },
  },
  mounted() {
    this.refreshApplication()
  },
  methods: {
    refreshApplication() {
      const self = this
      if (!self.applications.length) return

      if (self.selectId) {
        const app = self.applications.find(
          (e) => e.id == self.selectId
        )

        if (app) self.application = app
        else self.application = self.applications[0]
      } else {
        self.application = self.applications[0]
        self.$emit('change', self.application)
      }
    },
    selectApplicationClick(a) {
      this.$emit('change', a)
    },
  },
}
</script>
