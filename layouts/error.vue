<template>
  <div class="py-24">
    <main class="h-full pb-16 overflow-y-auto">
      <div class="container flex flex-col items-center px-6 mx-auto">
        <h1 class="text-6xl font-semibold text-white">
          {{ error.statusCode }}
        </h1>
        <p class="text-white text-lg">
          {{ error.message }}
        </p>
        <br />
        <br />
        <nuxt-link :to="{ path: localePath('index') }" class="text-white"> ไปหน้าแรก </nuxt-link>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  layout: 'landing',
  props: ['error'],
  methods: {},
  components: {},
}
</script>