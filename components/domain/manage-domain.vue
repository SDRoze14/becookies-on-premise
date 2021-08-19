<template>
  <base-modal v-model="isShow">
    <div class="text-xl mb-1">
      {{ isUpdate ? $t('addDomain.update') : $t('addDomain.new') }}
    </div>
    <div class="text-sm text-gray-500 mb-4 whitespace-pre-line">{{ $t('addDomain.description') }}
    </div>

    <div class="mt-2">
      <div>{{ $t('addDomain.labelName') }}</div>
      <base-input
        v-model="domainName"
        :placeholder="$t('addDomain.placeName')"
        :disabled="isUpdate"
        innerClass="lowercase"
      ></base-input>
    </div>

    <div class="flex flex-col mt-4">
      <div>{{ $t('addDomain.labelOrganization') }}</div>
      <div class="w-full">
        <base-dropdown :dropdownWidthFull="true" toggleClass="w-full">
          <div
            slot="toggle"
            class="flex items-center justify-between px-4 py-2 rounded border"
            :class="{
              'border-primary text-primary': organization.id,
              'border-gray-200 text-gray-400': !organization.id,
            }"
          >
            <div class="text-sm">
              {{
                organization.id
                  ? organization.name
                  : $t('addDomain.placOrganization')
              }}
            </div>
            <base-icon
              class="ml-5"
              icon="dropdown"
              width="10"
              height="10"
            ></base-icon>
          </div>
          <div v-for="(item, i) in organizations" :key="i">
            <base-dropdown-item
              class="px-8"
              :class="{ 'bg-gray-200': item.id == organization.id }"
              @click="seclectOrganizationClick(item)"
              >{{ item.name }}</base-dropdown-item
            >
          </div>
        </base-dropdown>
      </div>
    </div>

    <div class="mt-4">
      <div>{{ $t('addDomain.labelDefaultLanguage') }}</div>
      <div class="w-40">
        <base-dropdown :dropdownWidthFull="true">
          <div
            slot="toggle"
            class="flex items-center justify-between px-4 py-2 rounded-md border border-primary text-primary"
          >
            <div class="text-sm">
              {{ defaultLanguage == 'th' ? 'Thai' : 'English' }}
            </div>
            <base-icon
              class="ml-5"
              icon="dropdown"
              width="10"
              height="10"
            ></base-icon>
          </div>
          <base-dropdown-item
            class="px-8"
            :class="{ 'bg-gray-200': defaultLanguage == 'th' }"
            @click="defaultLanguage = 'th'"
          >
            Thai
          </base-dropdown-item>
          <base-dropdown-item
            class="px-8"
            :class="{ 'bg-gray-200': defaultLanguage == 'en' }"
            @click="defaultLanguage = 'en'"
          >
            English
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
      <base-button color="gray" @click="isShow = false">{{
        $t('cancleBtn')
      }}</base-button>
      <base-button @click="addClick">{{
        isUpdate ? $t('addDomain.updateBtn') : $t('addDomain.addBtn')
      }}</base-button>
    </div>
  </base-modal>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      applicationName: '',
      domainName: '',
      defaultLanguage: 'th',
      organizationName: '',
      scanFrequency: '30 days',

      error: '',
      organization: {},
      organizations_id: '',
      app: {},
    }
  },
  computed: {
    frequencies() {
      return ['30 days', '90 days', '365 days']
    },
    isUpdate() {
      return this.app.applicationId ? true : false
    },
    organizations() {
      return this.$store.getters['organizations/getList']
    },
  },
  methods: {
    show(app = {}) {
      this.app = app
      this.domainName = app.domainName
      this.scanFrequency = app.scanFrequency ? app.scanFrequency : '30 days'
      this.isShow = true
    },
    seclectOrganizationClick(item) {
      this.organization = item
    },
    async addClick() {
      const self = this

      var error = ''

      // if (!self.applicationName) error = 'Please enter your Name.'
      // else
      if (!self.domainName) error = self.$t('addDomain.error_empty_domain')
      else if (!self.$model.validDomain(self.domainName))
        error  = self.$t('addDomain.error_invalid_domain')
      else if (!this.organization.id) error = self.$t('addDomain.error_empty_org')

      self.error = error
      if (error) return

      let availableLanguage = []
      availableLanguage.push(self.defaultLanguage)

      self.$store.dispatch('loading/setLoading', true)
      if (self.isUpdate) {
        await self.$api
          .updateApplication(self.app.applicationId, {
            scanFrequency: self.scanFrequency,
            defaultLanguage: self.defaultLanguage,
            availableLanguage: availableLanguage,
          })
          .then((response) => {
            self.isShow = false
            self.$emit('updated', true)
          })
          .catch((err) => {
           self.error = err.response.data.message
          })
      } else {
        await self.$api
          .createApplication({
            // applicationName: self.applicationName,
            domain_name: self.domainName.toLowerCase(),
            organization_id: self.organization.id,
            name: self.domainName,
            default_language: self.defaultLanguage
            // scanFrequency: self.scanFrequency,
          })
          .then((response) => {
            self.isShow = false
            self.$emit('added', true)
          })
          .catch((err) => {
              self.error = err.response.data.message
          })
      }

      self.$store.dispatch('loading/setLoading', false)
    },
  },
}
</script>

