<template>
  <footer>
    <div class="container mx-auto mt-8 px-8">
      <div class="border-b border-white"></div>
      <div class="w-full flex flex-col md:flex-row pt-4 pb-8">
        <div class="flex-1 text-sm text-white">
          &copy; {{ year }} Cookie PDPA | RST
        </div>
        <div class="flex-1 text-sm text-white md:text-right">
          <span class="hover:text-blue-300"><a href="/terms">Terms &amp; Conditions</a></span> &#9733; <span class="hover:text-blue-300"><a href="/policy">Privacy Policy</a></span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
}
</script>