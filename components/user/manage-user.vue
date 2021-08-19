<template>
  <base-modal v-model="isShow">
    <div class="text-xl mb-4">
      {{ isUpdate ? 'Update User (Role)' : 'New User (Role)' }}
    </div>
    <div class="text-sm text-gray-500 mb-4">
      Add new user which provide you a cookie content management
    </div>

    <div class="mt-2">
      <div>Email</div>
      <base-input
        v-model="email"
        placeholder="e.g. name@domain.com"
        :disabled="isUpdate"
      ></base-input>
    </div>
    <!-- v-if="isUpdate" -->
    <div class="mt-6">
      <div>User Role</div>
      <div class="flex">
        <div
          v-for="(r, i) in roles"
          :key="`frequency-${i}`"
          class="py-1 px-6 mr-4 mt-2 border rounded-md text-sm cursor-pointer"
          :class="{
            'bg-blue-100 border-primary text-primary': r.value == role,
            ' bg-gray-200 border-gray-200 text-gray-500': r.value != role,
          }"
          @click="role = r.value"
        >
          {{ r.name }}
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
      <base-button color="gray" @click="isShow = false">Cancel</base-button>
      <base-button @click="addClick">{{
        isUpdate ? 'Update User' : 'Add User'
      }}</base-button>
    </div>
  </base-modal>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      email: '',
      role: 'member',

      error: '',
      user: {},
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
      return this.user.userId ? true : false
    },
  },
  methods: {
    show(user = {}) {
      this.user = user
      this.email = user.email
      this.role = user.role
      this.isShow = true
    },
    async addClick() {
      const self = this

      var error = ''

      if (!self.email) error = 'Please enter your Email.'
      else if (!self.$model.validateEmail(self.email))
        error = 'Invalid your Email.'

      self.error = error
      if (error) return

      self.$store.dispatch('loading/setLoading', true)
      if (self.isUpdate) {
        await self.$api
          .updateUserRole(self.user.userId, self.role)
          .then((response) => {
            self.isShow = false
            self.$emit('updated', true)
          })
          .catch((error) => {
            var code = error.response.data.code
            if (code == 'InvalidParameterException')
              self.error = 'Password must have length greater than 6'
            else self.error = 'Unknow error.'
          })
      } else {
        await self.$api
          .addUser({
            email: self.email,
            role: self.role,
          })
          .then(async (response) => {
            self.isShow = false
            self.$emit('added', true)
          })
          .catch((error) => {
            var code = error.response.data.message
            self.error = code
          })
      }

      self.$store.dispatch('loading/setLoading', false)
    },
  },
}
</script>

<style></style>
