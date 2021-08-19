<template>
  <footer class="bg-white">
    <!-- mt-8 -->
    <div class="container mx-auto px-8">
      <div class="w-full flex flex-col md:flex-row py-6">
        <div class="flex-1 mb-6 mt-1 md:mt-20">
          <base-icon icon="logo-h" width="300" height="70" />
        </div>

        <div class="flex-1 pl-0 md:pl-64">
          <div>
            <div class="text-lg font-medium">
              {{$t('footer.about')}}
            </div>
            <a href="https://rst.technology/" class="text-primary">https://rst.technology/</a>
          </div>

          <div class="mt-3">
            <div class="text-lg font-medium">
              {{$t('footer.contact')}}
            </div>
            <p class="font-light pb-2">+66(0)2 004 0604 &nbsp;&nbsp; +66(0)87 197 0248</p>
            <p class="font-light pb-2">{{$t('footer.address')}}</p>
            <p class="font-light pb-2">support@rst.technology</p>
          </div>
        </div>
        
      </div>
      <div class="border-b border-cool-gray-200"></div>
      <div class="w-full flex flex-col md:flex-row pt-4 pb-8">
        <div class="flex-1 text-sm text-gray-400">
          &copy; {{ year }} beCOOKIES | RST
        </div>
        <div class="flex-1 text-sm text-gray-400 md:text-right">
          <span class="cursor-pointer hover:text-blue-700" @click="termClick()">TERMS &amp; Conditions</span>
          <span class="px-2 text-xs " >&#9733;</span>
          <span class="cursor-pointer hover:text-blue-700" @click="policyClick()">Privacy Policy</span>
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
  methods: {
    termClick() {
      this.$router.push({ path: this.localePath('terms')})
    },
    policyClick() {
      this.$router.push({ path: this.localePath('policy')})
    }
  }
}
</script>