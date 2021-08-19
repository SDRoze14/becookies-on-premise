<template>
  <base-modal v-model="isShow">
    <div class="text-xl mb-4">
      {{ isUpdate ? 'Edit Category' : 'New Category' }}
    </div>
    <div v-if="!isUpdate" class="text-sm font-light text-gray-500 mb-4">
      Add new category which provide you a new cookie-consent script. You can
      use this new scripts in your new website. We will scan each domain for
      cookies.
    </div>

    <div class="mt-8">
      <div>Category Name</div>
      <base-input
        v-model="categoryName"
        placeholder="Fill in the category name, e.g., Social cookies"
      ></base-input>
    </div>

    <div class="mt-4">
      <div>Objective</div>
      <base-input
        v-model="categoryIntroduction"
        placeholder="Fill in your description cookie e.g. Cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies."
        type="textarea"
        rows="5"
      ></base-input>
    </div>

    <div class="mt-4">
      <div>Status</div>
      <div class="flex w-40">
        <base-dropdown
          toggleClass="w-full"
          :dropdownWidthFull="true"
          :text="isActive ? 'Active' : 'Inactive'"
          :theme="isActive ? 'primary' : ''"
        >
          <base-dropdown-item
            @click="isActive = true"
            :class="{ 'bg-blue-100': isActive }"
          >
            <div class="text-sm">Active</div>
          </base-dropdown-item>
          <base-dropdown-item
            @click="isActive = false"
            :class="{ 'bg-blue-100': !isActive }"
          >
            <div class="text-sm">Inactive</div>
          </base-dropdown-item>
        </base-dropdown>
      </div>
    </div>

    <div
      v-if="error"
      class="mt-6 bg-red-100 text-red-500 text-sm px-4 py-2 rounded-md"
    >
      {{ error }}
    </div>

    <div class="mt-10 flex justify-end space-x-2">
      <base-button color="gray" @click="isShow = false">Cancel</base-button>
      <base-button @click="addClick">{{
        isUpdate ? 'Update' : 'Add Category'
      }}</base-button>
    </div>
  </base-modal>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      categoryName: '',
      categoryIntroduction: '',
      isActive: true,

      error: '',
      cat: {},
    }
  },
  computed: {
    isUpdate() {
      return this.cat.categoryId ? true : false
    },
  },
  methods: {
    show(cat = {}) {
      this.cat = cat
      this.categoryName = cat.categoryName
      this.categoryIntroduction = cat.categoryIntroduction
      if (cat.categoryId) {
        this.isActive = cat.isActive
      }
      this.isShow = true
    },
    async addClick() {
      const self = this

      var error = ''

      if (!self.categoryName) error = 'Please enter your Category Name.'

      self.error = error
      if (error) return

      self.$store.dispatch('loading/setLoading', true)
      if (self.isUpdate) {
        await self.$api
          .updateCategory(self.cat.categoryId, {
            categoryName: self.categoryName,
            categoryIntroduction: self.categoryIntroduction,
            isActive: self.isActive,
          })
          .then((response) => {
            self.isShow = false
            self.$emit('updated', true)
          })
          .catch((error) => {
            var code = res.response.data.code
            if (code == 'InvalidParameterException')
              self.error = 'Password must have length greater than 6'
            else self.error = 'Unknow error.'
          })
      } else {
        await self.$api
          .addCategory({
            categoryName: self.categoryName,
            categoryIntroduction: self.categoryIntroduction,
            isActive: self.isActive,
          })
          .then((response) => {
            self.isShow = false
            self.$emit('added', true)
          })
          .catch((error) => {
            var code = res.response.data.code
            if (code == 'InvalidParameterException')
              self.error = 'Password must have length greater than 6'
            else self.error = 'Unknow error.'
          })
      }

      self.$store.dispatch('loading/setLoading', false)
    },
  },
}
</script>

<style></style>
