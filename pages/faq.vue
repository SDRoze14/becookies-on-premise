<template>
  <div class="h-full">
    <div class="flex mx-0 sm:mx-5">
      <div class="px-2 py-10 w-full bg-white mb-8 rounded-lg">
        <!-- <div class="pb-5">
          <button
            class="border hover:border-black rounded-full px-2 text-gray-400 hover:text-black"
            @click="backHomeClick()"
          >
            Home
          </button>
        </div> -->
        <p class="pb-8">{{$t('lang') == 'en' ? 'Frequently Asked Questions' : 'คำถามที่พบบ่อย' }}</p>

        <div class="py-2">
          <div v-for="(item, i) in faq" :key="i">
            <div class="py-2 px-5 border border-gray-600 m-1 rounded-md" :class="currentQuestion == i ? 'bg-white' : 'bg-gray-100'">
              <div class="flex text-sm cursor-pointer" @click="currentQuestion = i">
                <div>Question: </div>
                <div class="mr-auto px-2">{{ item.question }}</div>
                <div>
                  <base-icon icon="dropdown" size="15" class="mt-2"></base-icon>
                </div>
              </div>
              <div class="flex text-sm text-primary pr-5" :class="currentQuestion == i ? 'relative' : 'hidden'">
                <div class="text-black">Answer: </div>
                <div class="px-3" style="white-space: pre-wrap;">{{item.answers}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      faq: [],
      currentQuestion: null,
    }
  },
  mounted() {
    this.faq = []
    this.$store.dispatch('loading/setLoading', true)

    this.faq.push({
      question: this.$t('faq.question1'),
      answers: this.$t('faq.answers1'),
    })

    this.faq.push({
      question: this.$t('faq.question2'),
      answers: this.$t('faq.answers2'),
    })

    this.faq.push({
      question: this.$t('faq.question3'),
      answers: this.$t('faq.answers3'),
    })

    this.faq.push({
      question: this.$t('faq.question4'),
      answers: this.$t('faq.answers4'),
    })

    this.faq.push({
      question: this.$t('faq.question5'),
      answers: this.$t('faq.answers5'),
    })

    this.faq.push({
      question: this.$t('faq.question6'),
      answers: this.$t('faq.answers6'),
    })

    this.faq.push({
      question: this.$t('faq.question7'),
      answers: this.$t('faq.answers7'),
    })

    this.faq.push({
      question: this.$t('faq.question8'),
      answers: this.$t('faq.answers8'),
    })

    this.faq.push({
      question: this.$t('faq.question9'),
      answers: this.$t('faq.answers9'),
    })

    this.faq.push({
      question: this.$t('faq.question10'),
      answers: this.$t('faq.answers10'),
    })

    this.faq.push({
      question: this.$t('faq.question11'),
      answers: this.$t('faq.answers11'),
    })

    this.faq.push({
      question: this.$t('faq.question12'),
      answers: this.$t('faq.answers12'),
    })

    this.$store.dispatch('loading/setLoading', false)
  },
  methods: {
    termClick() {
      this.$router.push('/terms')
    },
    backHomeClick() {
      this.$router.push('/')
    },
  },
}
</script>
