<template>
  <base-modal v-model="isShow">
    <div class="text-xl mb-4">
      {{$t('lang') == 'en' ? 'Add Cookie' : 'เพิ่มคุกกี้'}}
    </div>

    <div class="mt-2 flex text-sm" v-if="isUpdate">
      <div class="w-24 text-gray-500">Cookie name</div>
      <div class="flex-1 text-blue-500">{{ cookie.name }}</div>
    </div>

    <div v-if="!isUpdate" class="mt-4">
      <div>{{$t('lang') == 'en' ? 'Cookie name' : 'ชื่อคุกกี้'}}</div>
      <base-input v-model="name" d placeholder="e.g. Name"></base-input>
    </div>

    <!-- <div class="mt-2 flex text-sm">
      <div class="w-24 text-gray-500">Provider</div>
      <div class="flex-1 text-blue-500">
        {{ cookie.provider ? cookie.provider : 'No data' }}
      </div>
    </div> -->

    <div class="mt-2">
      <div>Provider</div>
      <base-input v-model="provider" placeholder="e.g. google.com"></base-input>
    </div>

    <div class="mt-4">
      <div>Purpose</div>
      <base-input
        v-model="purpose"
        placeholder="e.g. Used by Google AdWords to re-engage visitors that are likely to convert to customers based on the visitor's online behaviour across websites."
        type="textarea"
        rows="4"
      ></base-input>
    </div>

    <div class="mt-6 flex space-x-4 items-end">
      <div class="w-1/3">
        <div>{{$t('lang') == 'en' ? 'Durations' : 'ระยะเวลา'}}</div>
        <div class="flex w-full">
          <div class="">
            <base-input v-model="expiry" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="3"></base-input>
          </div>
          <div class="ml-1">
            <base-dropdown
              :text="$model.typeXepiry(type_expiry).label"
              position="top"
              :disabled="isUpdate"
              toggleClass="w-full"
              :dropdownWidthFull="true"
            >
              <base-dropdown-item
                v-for="(e, i) in $model.type_expiry"
                :key="`expiry-${i}`"
                @click="type_expiry = e.value"
                :class="{ 'bg-blue-100': e.value == type_expiry }"
              >
                <div class="text-sm truncate">{{ e.label }}</div>
              </base-dropdown-item>
            </base-dropdown>
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <!-- <div>{{$t('lang') == 'en' ? 'Cookie type' : 'ประเภทคุกกี้'}}</div> -->
        <div class="flex w-full">
          <base-dropdown
            :text="$model.cookieType(scheme_type).label"
            position="top"
            :disabled="isUpdate"
            toggleClass="w-full"
            :dropdownWidthFull="true"
          >
            <base-dropdown-item
              v-for="(e, i) in $model.cookie_type"
              :key="`type-${i}`"
              @click="scheme_type = e.value"
              :class="{ 'bg-blue-100': e.value == scheme_type }"
            >
              <div class="text-sm truncate">{{ e.label }}</div>
            </base-dropdown-item>
          </base-dropdown>
        </div>
      </div>
      <div class="w-1/3">
        <div class="flex w-full">
          <base-dropdown
            :text="getCategoryName(categoryId)"
            theme="primary"
            position="top"
            toggleClass="w-full"
            :dropdownWidthFull="true"
          >
            <base-dropdown-item
              v-for="(cat, i) in categories"
              :key="`application-${i}`"
              @click="categoryId = cat.id"
              :class="{ 'bg-blue-100': categoryId == cat.id }"
            >
              <div class="text-sm truncate">{{ cat.title.en }}</div>
            </base-dropdown-item>
          </base-dropdown>
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
      <base-button class="uppercase" color="gray" @click="isShow = false">Cancel</base-button>
      <base-button class="uppercase" @click="addClick">{{
        isUpdate ? 'Update' : 'Add'
      }}</base-button>
    </div>
  </base-modal>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: [],
    },
    application_id: {
      type: String,
      defualt: ''
    }
  },
  data() {
    return {
      isShow: false,
      name: '',
      provider: '',
      purpose: '',
      expiry: 1,
      type_expiry: 'minute',
      scheme_type: 2,
      categoryId: '',

      error: '',
      cookie: {},
    }
  },
  computed: {
    roles() {
      return [
        { name: 'Admin', value: 'admin' },
        { name: 'Editor', value: 'editor' },
        { name: 'Member', value: 'member' },
      ]
    },
    isUpdate() {
      return this.cookie.cookieId ? true : false
    },
  },
  methods: {
    show(cookie = {}) {
      // this.cookie = cookie
      this.name = ''
      this.provider = ''
      this.purpose = ''
      this.expiry = 1
      this.categoryId = ''
      this.scheme_type = 2
      this.isShow = true
      this.error = '',
      this.type_expiry = 'hour'
    },
    async addClick() {
      const self = this

      var error = ''

      if (!self.name) error = self.$t('lang') == 'en' ? 'Please enter cookie name.' : 'กรุณากรอกชื่อคุกกี้'

      self.error = error
      if (error) return

      let ex = 0
      console.log(self.type_expiry)
      if (self.type_expiry == 'minute') ex = parseInt(self.expiry) * 60
      else if (self.type_expiry == 'hour') ex = parseInt(self.expiry) * 3600
      else if (self.type_expiry == 'day') ex = parseInt(self.expiry) * 86400
      else if (self.type_expiry == 'week') ex = parseInt(self.expiry) * 604800
      else if (self.type_expiry == 'month') ex = parseInt(self.expiry) * 2628000
      else if (self.type_expiry == 'year') ex = parseInt(self.expiry) * 31556952

        await self.$api
          .createCookie(
            {
              application_id: self.application_id,
              name: self.name,
              category_id: self.categoryId,
              provider: self.provider,
              purpose: {
                en: self.$t('lang') == 'en' ? self.purpose : '',
                th: self.$t('lang') == 'th' ? self.purpose : ''
              },
              expiry_in_seconds: ex,
              scheme_type: self.scheme_type,
            }
          )
          .then((response) => {
            // self.name
            self.isShow = false
            self.$emit('updated', true)
          })
          .catch((error) => {
            var code = error.response.data.message
            self.error = code
          })

      self.$store.dispatch('loading/setLoading', false)
    },
    getCategoryName(cid) {
      const cat = this.categories.find((c) => c.id == cid)
      if (cat) return cat.title.en
      else return this.$t('lang') == 'en' ? 'Categorization' : 'ประเภทคุกกี้'
    },
  },
}
</script>

<style></style>
