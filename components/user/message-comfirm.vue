<template>
  <div>
    <base-modal v-model="isShow" :width="800">
      <div>
        <div
          class="text bg-green-200 text-green-700 text-center rounded py-2 px-3"
        >
          <div>
            {{ $t("manage_confirm.title1") }}
          </div>
          <div>
            {{ $t("manage_confirm.titl2") }}
          </div>
        </div>

        <div class="py-3">
          <img
            src="../../assets/img/mail-sent.png"
            width="250"
            alt=""
            class="mx-auto"
          />
        </div>
      </div>
      <div class="flex mt-5">
        <div class="mx-auto">
          <base-button color="primary" @click="submitClick">{{
            $t("confirmBtn")
          }}</base-button>
        </div>
      </div>
    </base-modal>

    <message-register ref="messageRegisterRef"></message-register>
  </div>
</template>

<script>
import MessageRegister from "@/components/user/message-register";
export default {
  components: {
    MessageRegister,
  },
  data() {
    return {
      isShow: false,
      user: {},
    };
  },
  methods: {
    show(app = {}) {
      this.isShow = true;
      this.user = app;
    },
    submitClick() {
      this.$refs.messageRegisterRef.show(this.user);
      this.isShow = false;
    },
  },
};
</script>
