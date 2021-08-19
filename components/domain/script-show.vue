<template>
  <base-modal v-model="isShow">
    <div class="absolute top-0 right-0" @click="isShow = false">
      <base-icon
        icon="x"
        width="20"
        height="20"
        class="text-gray-400 bg-white mr-3 mt-3 cursor-pointer"
      />
    </div>

    <script-view v-if="app.id" :id="app.id" />
  </base-modal>
</template>

<script>
import ScriptView from '@/components/domain/script-view'

export default {
  data() {
    return {
      isShow: false,

      app: {},
    }
  },
  components: { ScriptView },
  mounted() {},
  methods: {
    async show(app = {}) {
      const self = this

      self.app = app

      self.isShow = true
    },
  },
}
</script>

<style></style>
