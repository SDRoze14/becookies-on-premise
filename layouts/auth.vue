<template>
  <div class="gradient leading-relaxed tracking-wide flex flex-col">
    <navbar />

    <div class="auth-content mt-20">
      <div
        class="max-w-screen-lg w-full mx-auto bg-white md:rounded-lg shadow-lg p-4"
      >
        <nuxt />
      </div>
    </div>

    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    ></loading>

    <footerbar />
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: { Loading },
  computed: {
    isLoading() {
      return this.$store.getters['loading/getLoading']
    },
  },
}
</script>

<style>
.auth-content {
  @apply py-12;
}
</style>
