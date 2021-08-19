<template>
  <base-modal v-model="isShow">
    <div class="text-xl mb-4">{{$t('lang') == 'en' ? 'Categorization setting' : 'ตั้งค่าประเภทของคุกกี้'}}​</div>
    <div class="text-sm text-gray-500 mb-4 font-light">
      {{$t('lang') == 'en' ? 'Select cookie categories used on your website​' : 'เลือกประเภทของคุกกี้ที่ต้องการนำไปแสดงบนเว็บไซต์'}}
    </div>

    <div v-if="categoriesSelectUse.length" class="mt-6">
      <div
        class="flex items-center py-3 px-6 rounded mb-1"
        :class="{
          'bg-blue-100': isSelectAll,
          'bg-gray-100': !isSelectAll,
        }"
      >
        <div class="mr-2">
          <base-check :value="isSelectAll" @update="selectAllClick" label="" />
        </div>
        <div class="flex-1">{{$t('lang') == 'en' ? 'Select all' : 'เลือกทั้งหมด'}}</div>
      </div>
      <div
        v-for="(c, i) in consentRules"
        :key="`category-${i}`"
        class="flex flex-col"
        :class="{
          'bg-blue-100': categoriesSelectUse[i].active && !c.necessary,
          'bg-gray-100': !categoriesSelectUse[i].active || c.necessary,
        }"
      >
        <div class="flex items-center py-3 px-6 rounded mb-1 w-full">
          <div v-if="!c.necessary" class="mr-2">
            <base-check v-model="categoriesSelectUse[i].active" label="" />
          </div>
          <div class="flex-1">{{ c.title }}</div>
          <div v-if="c.necessary" class="mr-4 text-primary text-sm">
            Always Active
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="error"
      class="mt-6 bg-red-100 text-red-500 text-sm px-4 py-2 rounded-md"
    >
      {{ error }}
    </div>

    <div class="mt-10 flex justify-end space-x-2">
      <base-button color="gray" @click="isShow = false">{{ $t('lang') == 'en' ? 'Cancel' : 'ยกเลิก'}}</base-button>
      <base-button @click="addClick">{{$t('lang') == 'en' ? 'Confirm' : 'ตกลง'}}</base-button>
    </div>
  </base-modal>
</template>

<script>
export default {
  props: {
    consentRules: {
      type: Array,
      detault: [],
    },
  },
  data() {
    return {
      isShow: false,
      categoriesSelectUse: [],
      error: '',
    }
  },
  computed: {
    isSelectAll() {
      var isSelectAll = true
      this.categoriesSelectUse.forEach((e) => {
        if (!e.active && !e.necessary) isSelectAll = false
      })
      return isSelectAll
    },
  },
  methods: {
    show(categoriesSelect) {
      this.isShow = true

      var categoriesSelectUse = []
      categoriesSelect.forEach((c) => {
        categoriesSelectUse.push({
          id: c.id,
          active: c.active,
          default: c.default,
          key: c.key,
          necessary: c.necessary,
          open: c.open
        })
      })
      categoriesSelectUse.forEach(e => {
        // e.open = false
      })
      this.categoriesSelectUse = categoriesSelectUse
    },
    selectAllClick(e) {
      var categoriesSelectUse = this.categoriesSelectUse
      if (e) {
        categoriesSelectUse.forEach((element) => {
          element.active = true
        })
      } else {
        categoriesSelectUse.forEach((element) => {
          element.active = element.necessary ? true : false
        })
      }
      this.categoriesSelectUse = categoriesSelectUse
    },
    addClick() {
      const self = this

      var error = ''

      self.error = error
      if (error) return

      // self.categoriesSelectUse.forEach(async(e) => {
      //   await self.$api.updateApplicationCategories
      // })

      self.$emit('update', self.categoriesSelectUse)
      self.isShow = false
    },
  },
}
</script>
