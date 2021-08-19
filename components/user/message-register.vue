<template>
  <div>
    <base-modal v-model="isShow" :width="900">
      <div class="text-xl">{{ $t("stepUse.title") }}</div>
      <div>
        <div class="flex py-5 items-center">
          <div
            class="w-10 bg-primary py-1 text-center text-white rounded-full text-xl"
          >
            1
          </div>
          <div class="pl-3 text-lg">
            {{ $t("stepUse.text1") }}
          </div>
        </div>
        <div class="border border-gray-100 bg-gray-100 rounded-md px-4 py-3">
          <div class="flex justify-between">
            <div class="uppercase">Script</div>
            <div @click="copyClick">
              <base-icon
                icon="copy"
                width="20"
                height="20"
                class="text-gray-400 cursor-pointer"
              />
            </div>
          </div>
          <div class="text-sm my-3">
            {{ user.script }}
          </div>
        </div>
      </div>

      <div class="flex py-5 items-center">
        <div
          class="w-10 bg-primary py-1 text-center text-white rounded-full text-xl"
        >
          2
        </div>
        <div class="pl-3 text-lg">{{ $t("stepUse.text2") }}</div>
      </div>

      <div class="text-gray-500 py-3">
        {{ $t("stepUse.note") }}
      </div>

      <div
        class="text bg-green-200 text-green-700 text-center rounded py-2 px-3"
      >
        <div>
          {{ $t("manage_register.text1") }}
        </div>
        <div>
          {{ $t("manage_register.text2") }}
        </div>
      </div>

      <div class="flex mt-5">
        <div class="mx-auto">
          <base-button color="primary" @click="message2Click">{{
            $t("confirmBtn")
          }}</base-button>
        </div>
      </div>
    </base-modal>

    <message-comfirm ref="MessageConfirmRef" />
  </div>
</template>

<script>
import MessageComfirm from "@/components/user/message-comfirm";
export default {
  components: { MessageComfirm },
  data() {
    return {
      isShow: false,
      user: {},
    };
  },
  methods: {
    show(user = {}) {
      this.isShow = true;
      this.user = user;
    },
    copyClick() {
      const self = this;
      navigator.clipboard.writeText(self.user.script).then(
        function () {
          self.$toast.open({
            message: this.$t("manage_register.copy"),
            type: "success",
            duration: 4000,
          });
        },
        function (err) {
          console.log(err);
        }
      );
    },
    message2Click() {
      // this.$refs.MessageConfirmRef.show()
      this.isShow = false;
      // this.$emit('added' ,true)
    },
  },
};
</script>
