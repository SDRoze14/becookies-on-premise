<template>
  <div>
    <div class="flex flex-wrap mt-6 mb-4">
      <div class="w-full md:w-1/2 self-center hidden md:block">
        <img
          src="/images/img-cookie-secue.png"
          class="translate-x--20"
          alt="cookie-secure"
        />
      </div>
      <div class="w-full md:w-1/2 md:pl-8 p-6">
        <div class="text-3xl">{{ $t("signup.title") }}</div>
        <div
          class="text-sm text-gray-500 font-light pb-2"
          style="white-space: pre-line"
        >
          *{{ $t("signup.subtitle") }}
        </div>

        <form @submit="loginSubmit">
          <div class="">
            <base-input
              :label="$t('signup.labelEmail')"
              :placeholder="$t('signup.placeholderrEmail')"
              v-model="email"
              innerClass="lowercase"
            ></base-input>
          </div>
          <div class="mb-4">
            <div
              v-if="errorEmail"
              class="mb-4 bg-red-100 text-red-500 text-sm px-4 py-2 rounded-md"
            >
              {{ errorEmailMessage }}
            </div>
          </div>
          <div class="mb-1">
            <base-input
              :label="$t('signup.labelDomain')"
              :placeholder="$t('signup.placeholderrDomain')"
              v-model="domainName"
              innerClass="lowercase"
            ></base-input>
          </div>
          <div
            class="text-sm text-gray-500 font-light mb-4"
            style="white-space: pre-line"
          >
            {{ $t("signup.subtitle2") }}
          </div>
          <div class="mb-4">
            <base-input
              :label="$t('signup.labelOrganization')"
              :placeholder="$t('signup.placeholderOrganization')"
              v-model="organization_name"
            ></base-input>
          </div>
          <div class="flex">
            <base-check :label="$t('signup.accept')" v-model="check" />
            <div class="text-blue-500">
              <span
                class="cursor-pointer hover:text-blue-700"
                @click="termClick()"
                >&nbsp;{{ $t("termCondition") }}</span
              >
            </div>
          </div>
          <div class="mb-8"></div>

          <div
            v-if="error"
            class="mb-4 bg-red-100 text-red-500 text-sm px-4 py-2 rounded-md"
          >
            {{ error }}
          </div>
          <div
            v-if="success"
            class="mb-4 bg-green-100 text-green-500 text-sm px-4 py-2 rounded-md"
          >
            {{ success }}
          </div>

          <div class="text-right">
            <base-button
              type="submit"
              :disabled="!check"
              :class="!check ? 'bg-gray-400 border-gray-400' : ''"
              >{{ $t("signup.btn_submit") }}</base-button
            >
          </div>
        </form>
      </div>
    </div>

    <message-register ref="messageRegisterRef"></message-register>
  </div>
</template>

<script>
import MessageRegister from "@/components/user/message-register";
import sampleData from "@/pages/signed/test.json";
export default {
  layout: "auth",
  components: { MessageRegister },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      applicationName: "",
      domainName: "",
      organization_name: "",

      error: "",
      success: "",
      check: false,
      errorEmailMessage: "",
      sample: sampleData.sample,
    };
  },
  computed: {
    errorEmail() {
      if (
        this.email.includes(".co.th") ||
        this.email.includes(".ac.th") ||
        this.email.includes(".or.th") ||
        this.email.includes(".go.th") ||
        this.email.includes("thai-g.com") ||
        this.email == ""
      ) {
        this.errorEmailMessage = "";
        return false;
      } else {
        this.errorEmailMessage = this.$t("signup.err_email");
        return true;
      }
    },
  },
  mounted() {
    // this.$router.push('/')
  },
  methods: {
    async loginSubmit(e) {
      e.preventDefault();
      const self = this;

      var error = "";

      if (!self.$model.validateEmail(self.email))
        error = self.$t("signup.err_invalid_email");
      else if (self.errorEmail) error = self.$t("signup.err_invalid_email");
      else if (!self.email) error = self.$t("signup.err_empty_email");
      else if (!self.$model.validDomain(self.domainName))
        error = self.$t("signup.err_invalid_domain");
      else if (!self.domainName) error = self.$t("signup.err_empty_domain");
      else if (!self.organization_name) error = self.$t("signup.err_empty_org");

      self.error = error;
      self.success = "";
      if (error) return;

      self.$store.dispatch("loading/setLoading", true);

      await self.$api
        .signup({
          // name: self.email,
          email: self.email,
          // application_name: self.domainName,
          domain_name: self.domainName.toLowerCase(),
          organization_name: self.organization_name,
          // scanFrequency: '30 days',
        })
        .then((response) => {
          this.$refs.messageRegisterRef.show(response.data);
          // self.success = self.$t('lang') == 'en' ? 'Please check your email to confirm your registration' : 'กรุณาตรวจสอบอีเมล์ของท่านเพื่อยืนยันการสมัคร'
          self.name = "";
          self.email = "";
          self.password = "";
          self.confirmPassword = "";
          self.applicationName = "";
          self.domainName = "";
          self.$store.dispatch("loading/setLoading", false);
        })
        .catch((err) => {
          if (err.response.data.message == "This Email has been registered") {
            self.error = self.$t("signup.err_email_already");
          } else {
            self.error = err.response.data.message;
          }
          self.$store.dispatch("loading/setLoading", false);
        });
      self.$store.dispatch("loading/setLoading", false);
    },
    termClick() {
      // this.$router.push('/terms')
      window.open("/terms", "_blank");
    },
    policyClick() {
      window.open("/policy", "_blank");
      // this.$router.push('/policy')
    },
    openMessageClick() {
      this.$refs.messageRegisterRef.show(this.sample);
    },
  },
};
</script>
