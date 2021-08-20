<template>
  <div>
    <div class="container mx-auto">
      <div class="flex flex-wrap items-center mt-24 mb-24">
        <div class="px-6 w-full sm:w-1/2">
          <img src="../assets/img/section-banner.png" alt="" class="ml-auto" />
        </div>
        <div class="px-6 w-full sm:w-1/2">
          <h1 class="my-4 text-white leading-tight uppercase text-section1">
            {{ $t("landing.sec1TitleBold") }}
            <span class="font-normal"> {{ $t("landing.sec1TitleLigth") }}</span>
          </h1>
        </div>
      </div>
    </div>

    <section class="bg-gray-200 border-b py-10">
      <div class="container mx-auto text-section2">
        <p
          class="font-medium text-center text-xl pb-2"
          v-if="$t('lang') == 'en'"
        >
          {{ $t("section2.title") }}
        </p>
        <p class="font-normal text-center text-lg px-3">
          {{ $t("section2.text1") }}
        </p>
        <p class="font-normal text-center text-lg px-3">
          {{ $t("section2.text2") }}
        </p>
      </div>
    </section>

    <section class="bg-white w-full py-10">
      <div class="container mx-auto">
        <div class="flex w-full">
          <div class="w-full mx-5">
            <div class="w-full card-policy py-5 px-5 md:px-48">
              <img
                src="../assets/img/ico-cookie-consent.png"
                alt=""
                width="83"
                class="mx-auto py-5"
              />
              <div class="text-center text-xl font-medium pb-5">
                {{ $t("section3.card1.title") }}
              </div>
              <div
                class="text-center text-lg font-normal px-0 md:px-16 text-gray-400"
              >
                {{ $t("section3.card1.subtitle") }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap mx-0 sm:mx-5 mt-10">
          <div class="w-full sm:w-1/2 sm:pr-5 mx-5 sm:mx-0 mb-10 sm:mb-0">
            <div class="w-full h-full card-policy py-5 px-5 sm:px-10">
              <img
                src="../assets/img/ico-cookie-control.png"
                alt=""
                width="83"
                class="mx-auto py-5"
                height=""
              />
              <div class="text-center text-xl font-medium pb-5">
                {{ $t("section3.card2.title") }}
              </div>
              <div class="text-center text-lg font-normal text-gray-400">
                {{ $t("section3.card2.subtitle") }}
              </div>
            </div>
          </div>

          <div class="w-full sm:w-1/2 sm:pl-5 mx-5 sm:mx-0 mb-10 sm:mb-0">
            <div class="w-full h-full card-policy py-5 px-5 sm:px-10">
              <img
                src="../assets/img/ico-cookie-friendly.png"
                alt=""
                width="83"
                class="mx-auto py-5"
              />
              <div class="text-center text-xl font-medium pb-5">
                {{ $t("section3.card3.title") }}
              </div>
              <div class="text-center text-lg font-normal text-gray-400">
                {{ $t("section3.card3.subtitle") }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex w-full mt-10">
          <div class="w-full mx-5">
            <div class="w-full card-policy py-5 px-5 md:px-48">
              <img
                src="../assets/img/ico-cookie-monitoring.png"
                alt=""
                class="mx-auto py-5"
                width="83"
              />
              <div class="text-center text-xl font-medium pb-5">
                {{ $t("section3.card4.title") }}
              </div>
              <div
                class="text-center text-lg font-normal px-0 md:px-16 text-gray-400"
              >
                {{ $t("section3.card4.subtitle") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="gradient py-12">
      <div class="container mx-auto">
        <div class="flex flex-wrap items-center">
          <div class="w-full lg:w-1/2 px-20">
            <div class="text-3xl text-white font-medium uppercase">
              {{
                $t("lang") == "en" ? "Customize your banner" : "ปรับแต่ง BANNER"
              }}
            </div>
            <div
              class="text-2xl text-white font-light"
              :class="
                $t('lang') == 'th' ? 'text-5xl text-white font-medium' : ''
              "
            >
              {{
                $t("lang") == "en"
                  ? "Control are at your fingertips."
                  : '"ง่าย" แค่ปลายนิ้ว'
              }}
            </div>
          </div>

          <div class="w-full lg:w-1/2 px-5 lg:px-0 relative">
            <img src="../assets/img/laptop.png" alt="" class="mx-auto py-5" />

            <div class="">
              <div class="absolute right-0 top-0 px-10">
                <img
                  src="../assets/img/dialog.jpg"
                  alt=""
                  class="rounded-sm shadow-md img-dialog w-20 md:w-40"
                />
              </div>
              <div class="absolute right-0 px-10 mt-16 md:mt-0">
                <img
                  src="../assets/img/black-buttom.jpg"
                  alt=""
                  class="rounded-sm shadow-md img-black-bottom"
                />
              </div>
              <div class="absolute top-0 mt-16 md:mt-32">
                <img
                  src="../assets/img/black-dialog.jpg"
                  alt=""
                  width="150"
                  class="rounded-sm shadow-md img-black-dialog"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-3">
      <div class="container mx-auto text-center">
        <div class="text-3xl font bold">
          {{ $t("lang") == "en" ? "WHY beCOOIKES?" : "ทำไมต้อง beCOOKIES?" }}
        </div>
      </div>
    </section>

    <section>
      <div class="flex flex-wrap">
        <div class="w-full">
          <div class="flex flex-wrap">
            <div
              class="text-center py-10 bg-gray-600 h-auto w-full lg:w-1/2 mx-auto text-white pb-10 px-12 xl:px-5 lg:px-20"
            >
              <span class="text-xl border border-white text1-border-section5"
                >1</span
              >
              <div class="text-xl pt-8 font-normal">
                {{ $t("sectionGray.box1.title") }}
              </div>
              <div class="font-light">
                {{ $t("sectionGray.box1.subtitle") }}
              </div>
            </div>
            <div
              class="text-center py-10 bg-gray-500 h-auto w-full lg:w-1/2 mx-auto text-white pb-10 px-12 xl:px-5 lg:px-20"
            >
              <span class="text-xl border border-white text-border-section5"
                >2</span
              >
              <div class="text-xl pt-8 font-normal">
                {{ $t("sectionGray.box2.title") }}​
              </div>
              <div class="font-light">
                {{ $t("sectionGray.box2.subtitle") }}​​​
              </div>
            </div>
          </div>
        </div>
        <div class="section5-right w-full">
          <div class="flex flex-wrap">
            <div
              class="text-center py-10 bg-gray-600 h-auto w-full lg:w-1/2 mx-auto text-white px-12 xl:px-5 lg:px-20"
            >
              <span class="text-xl border border-white text-border-section5"
                >3</span
              >
              <div class="text-xl pt-8 font-normal">
                {{ $t("sectionGray.box3.title") }}​
              </div>
              <div class="font-light">
                {{ $t("sectionGray.box3.subtitle") }}​​​​​​
              </div>
            </div>
            <div
              class="text-center py-10 bg-gray-500 h-auto w-full lg:w-1/2 mx-auto text-white pb-10 px-12 xl:px-5 lg:px-20"
            >
              <span class="text-xl border border-white text4-border-section5"
                >4</span
              >
              <div class="text-xl pt-8 font-normal">
                {{ $t("sectionGray.box4.title") }}​
              </div>
              <div class="font-light">
                ​{{ $t("sectionGray.box4.subtitle") }}​​​​​​
              </div>
            </div>
          </div>
        </div>
        <div class="section5-right w-full">
          <div class="flex flex-wrap">
            <div
              class="text-center py-10 bg-gray-600 h-auto w-full lg:w-1/2 mx-auto text-white pb-10 px-12 xl:px-5 lg:px-20"
            >
              <span class="text-xl border border-white text-border-section5"
                >5</span
              >
              <div class="text-xl pt-8 font-normal">
                {{ $t("sectionGray.box5.title") }}​​​
              </div>
              <div class="font-light">
                ​{{ $t("sectionGray.box5.subtitle") }}​​​​​​
              </div>
            </div>
            <div
              class="text-center py-10 bg-gray-500 h-auto w-full lg:w-1/2 mx-auto text-white px-12 xl:px-5 lg:px-20"
            >
              <span class="text-xl border border-white text-border-section5"
                >6</span
              >
              <div class="text-xl pt-8 font-normal">
                {{ $t("sectionGray.box6.title") }}​​
              </div>
              <div class="font-light">
                ​{{ $t("sectionGray.box6.subtitle") }}​​​
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container mx-auto pt-5 pb-10 px-0 lg:px-16">
        <div class="">
          <div class="text-center">
            <div class="text-2xl text-white font-medium">
              <div v-if="$t('lang') == 'en'">
                Design Popup in <span class="text-5xl underline">3</span> steps
              </div>
              <div v-if="$t('lang') == 'th'">
                สร้าง Popup ใน
                <span class="text-5xl underline">3</span> ขั้นตอนง่ายๆ
              </div>
            </div>
          </div>
          <div
            class="flex justify-between md:items-center pl-5 md:px-0 flex-col md:flex-row"
          >
            <div class="flex px-2 ld:px-20 py-3">
              <div>
                <div
                  class="w-12 text-center text-3xl bg-white rounded-full my-2"
                >
                  1
                </div>
                <base-icon icon="landing-register" size="50"></base-icon>
              </div>
              <div class="mt-auto px-3 text-white">
                <div class="text-lg">{{ $t("sectionStep.step1.title") }}</div>
                <div class="text-lg font-light">
                  {{ $t("sectionStep.step1.subtitle") }}
                  <a href="https://becookies.tech/signup">becookies.tech</a>
                </div>
              </div>
            </div>

            <div class="xl:block hidden my-auto">
              <base-icon icon="next" size="40"></base-icon>
            </div>

            <div class="flex px-2 ld:px-20 py-3">
              <div>
                <div
                  class="w-12 text-center text-3xl bg-white rounded-full my-2"
                >
                  2
                </div>
                <base-icon icon="landing-customize" size="50"></base-icon>
              </div>
              <div class="mt-auto px-3 text-white">
                <div class="text-lg">{{ $t("sectionStep.step2.title") }}</div>
                <div class="text-lg font-light">
                  {{ $t("sectionStep.step2.subtitle") }}
                </div>
              </div>
            </div>

            <div class="xl:block hidden my-auto">
              <base-icon icon="next" size="40"></base-icon>
            </div>

            <div class="flex px-2 ld:px-20 py-3">
              <div>
                <div
                  class="w-12 text-center text-3xl bg-white rounded-full my-2"
                >
                  3
                </div>
                <base-icon icon="landing-copy" size="50"></base-icon>
              </div>
              <div class="mt-auto px-3 text-white">
                <div class="text-lg">{{ $t("sectionStep.step3.title") }}</div>
                <div class="text-lg font-light">
                  {{ $t("sectionStep.step3.subtitle") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-blue-50 w-full items-center py-10">
      <div class="container mx-auto px-12">
        <div class="flex items-center">
          <div class="w-full md:w-1/2">
            <div class="text-sm sm:text-lg">
              {{ $t("sectionPartner.text") }}
            </div>
            <div class="text-xl sm:text-3xl">
              {{ $t("sectionPartner.highlight") }}
            </div>
          </div>
          <div
            class="flex flex-wrap w-full md:w-1/2 pl-0 md:pl-12 justify-center lg:justify-between items-center center"
          >
            <img
              src="../assets/img/2-logo-tcas.png"
              height="50"
              alt=""
              class="py-5"
            />
            <img
              src="../assets/img/7-logo-bigfm.png"
              height="50"
              alt=""
              class="py-5"
            />
            <img
              src="../assets/img/4-logo-betime.png"
              height="50"
              alt=""
              class="py-5"
            />
            <img
              src="../assets/img/6-logo-looktung.png"
              height="50"
              alt=""
              class="py-5"
            />
            <img
              src="../assets/img/3-logo-ioaday.png"
              height="50"
              width="170"
              alt=""
              class="py-5"
            />
            <img
              src="../assets/img/5-logo-rst.png"
              height="50"
              alt=""
              class="py-5"
            />
            <img
              src="../assets/img/8-logo-insecure.png"
              height="50"
              alt=""
              class="py-5"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: "landing",
  computed: {
    logined() {
      let token = localStorage.getItem("token");
      return (token) ? true : false
    },
  },
};
</script>

<style>
.text-section1 {
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
}
.text-cookies {
  font-size: 18px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
}
.text-solution {
  font-size: 30px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.9;
  letter-spacing: normal;
}
.text-section2 {
  color: #4a4a4a;
}
.card-policy {
  box-shadow: 0 0 16px 0 rgba(2, 2, 2, 0.15);
}
.section5-left {
  background-color: #5d5d5d;
}
.section5-right {
  background-color: #747474;
}
.text1-border-section5 {
  border-radius: 100%;
  padding: 15px 26px;
}
.text-border-section5 {
  border-radius: 100%;
  padding: 15px 23px;
}
.text4-border-section5 {
  border-radius: 100%;
  padding: 15px 24px;
}
.img-dialog {
  position: relative;
  animation-name: imgdailog;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  transition: transform 0.2s ease-in-out;
}
.img-dialog:hover {
  transform: scale(1.2);
}
@keyframes imgdailog {
  0% {
    left: 0px;
    right: 0px;
  }
  50% {
    left: 30px;
    right: 0px;
  }
  100% {
    left: 0px;
    right: 0px;
  }
}

.img-black-dialog {
  position: relative;
  animation-name: imgblackdailog;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  transition: transform 0.2s ease-in-out;
}
.img-black-dialog:hover {
  transform: scale(1.2);
}
@keyframes imgblackdailog {
  0% {
    left: 0px;
    right: 0px;
  }
  50% {
    left: 30px;
    right: 0px;
  }
  100% {
    left: 0px;
    right: 0px;
  }
}

.img-black-bottom {
  width: 80%;
  /* margin-top: 75px; */
  bottom: 150px;
  margin-left: auto;
  position: relative;
  animation-name: imgblackbottom;
  animation-duration: 12s;
  animation-iteration-count: infinite;
  transition: transform 0.2s ease-in-out;
}
.img-black-bottom:hover {
  transform: scale(1.2);
}
@keyframes imgblackbottom {
  0% {
    left: 0px;
    right: 25px;
  }
  25% {
    left: 30px;
    right: 0px;
  }
  50% {
    left: 0px;
    right: 25px;
  }
  75% {
    left: 30px;
    right: 0px;
  }
  100% {
    left: 0px;
    right: 25px;
  }
}
</style>
