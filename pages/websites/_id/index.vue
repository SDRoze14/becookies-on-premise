<template>
  <div>
    <div class="text-gray-500">{{ $t('website.path') }}</div>

    <!-- Header -->
    <div class="flex py-2 items-center border-b border-gray-100">
      <div class="flex-1 text-lg mr-6">
        {{ application.domain_name }}
      </div>
      <div class="space-x-2" v-if="role == 1000 || role == 10">
        <base-button color="primary" @click="saveClick">
          {{ $t('website.saveBtn') }}
        </base-button>
      </div>
    </div>
    <div
      class="flex items-center text-sm text-gray-400 font-light space-x-6 py-2"
    >
      <div>
        Found:
        <span class="text-gray-800">{{ application.cookie_counts }}</span>
        {{ $t('website.cookie') }}
      </div>
      <div
        class="bg-gray-200 text-gray-500 py-1 px-4 rounded-full cursor-pointer"
        @click="cookieSettingClick"
      >
        {{ $t('website.cookieSetting') }}
      </div>
    </div>
    <!-- end Header -->

    <div
      class="bg-white rounded-md shadow-lg border border-gray-100 mt-4 flex flex-wrap"
    >
      <!-- left -->
      <div class="w-full lg:w-1/2 border-r border-gray-100 p-6">
        <div class="flex mb-4">
          <base-tabs :tabs="tabs" v-model="tab"></base-tabs>
        </div>

        <!-- Banner -->
        <div v-show="tab == 0" class="p-4">
          <div class="text-xl mb-2">
            {{ $t('website.banner') }}
          </div>
          <div class="text-sm text-gray-500 mb-8">
            {{ $t('website.bannerDescription') }}​
          </div>

          <!-- Layout -->
          <div class="text-lg mb-2">{{ $t('website.layout') }}​</div>
          <div class="mb-6 flex flex-wrap">

            <div>
              <base-dropdown
                dropdownClass="mt-0 border border-gray-100 w-72"
                :dropdownMaxWidthAuto="true"
                positionH="left"
              >
                <div
                  slot="toggle"
                  class="p-2 border border-gray-200 rounded-md flex items-center"
                >
                  <img :src="$model.layout(application.present_type).img" alt="layout"/>
                  <div>
                    <base-icon
                      class="ml-5 mr-4"
                      icon="dropdown"
                      width="10"
                      height="10"
                    ></base-icon>
                  </div>
                </div>
                <base-dropdown-item class="p-3">
                  <div class="flex flex-wrap">
                    <div
                      v-for="(l, i) in $model.layouts"
                      :key="`layout-${i}`"
                      class="w-1/2 p-2 rounded"
                      :class="{
                        'border border-primary bg-blue-100':
                          application.present_type == l.value,
                      }"
                      @click="layout = l.value"
                    >
                      <img
                        :src="l.img"
                        class="cursor-pointer"
                        @click="application.present_type = l.value"
                        alt="dropdown layout"
                      />
                    </div>
                  </div>
                </base-dropdown-item>
              </base-dropdown>
            </div>
          </div>
          <!-- end Layout -->

          <!-- Theme -->
          <div class="text-lg mb-2">{{ $t('website.theme') }}​</div>
          <div class="mb-6 flex space-x-6 text-gray-500 text-sm">
            <div>
              <base-radio
                v-model="application.theme"
                inputValue="2"
                label="Light"
              ></base-radio>
            </div>
            <div>
              <base-radio
                v-model="application.theme"
                inputValue="1"
                label="Dark"
              ></base-radio>
            </div>
            <div>
              <base-radio
                v-model="application.theme"
                inputValue="3"
                label="Custom colors"
              ></base-radio>
            </div>
          </div>

          <div v-if="application.theme == 3">
            <!-- Color Banner -->
            <div>{{ $t('website.banner') }}</div>
            <div class="text-sm pt-3">
              {{ $t('website.background') }}
            </div>
            <div class="flex py-3">
              <base-color-picker
                :colors="banner.bg_color_1"
                v-model="banner.bg_color_1"
                label="Background color 1"
              ></base-color-picker>
              <base-color-picker
                :colors="banner.text_color"
                v-model="banner.text_color"
                label="Text color"
              ></base-color-picker>
            </div>
            <div class="pb-3">
              <base-color-picker
                :colors="banner.bg_color_2"
                v-model="banner.bg_color_2"
                label="Background color 2"
              ></base-color-picker>
            </div>
            <!-- End color banner -->

            <!-- Color Button -->
            <div class="text-sm pt-3">
              {{ $t('website.btn') }}
            </div>
            <div class="flex py-3">
              <base-color-picker
                :colors="banner.accept_button_backgound_color"
                v-model="banner.accept_button_backgound_color"
                label="Accept All button"
              ></base-color-picker>
              <base-color-picker
                :colors="banner.accept_button_text_color"
                v-model="banner.accept_button_text_color"
                label="Accept All text caption"
              ></base-color-picker>
            </div>
            <div class="flex pb-3">
              <base-color-picker
                :colors="banner.reject_button_backgound_color"
                v-model="banner.reject_button_backgound_color"
                label="Reject button"
              ></base-color-picker>
              <base-color-picker
                :colors="banner.reject_button_text_color"
                v-model="banner.reject_button_text_color"
                label="Reject text caption"
              ></base-color-picker>
            </div>

            <!-- Popup -->
            <div class="pt-3">
              {{ $t('lang') == 'en' ? 'Popup' : 'ป๊อปอัพ' }}
            </div>
            <!-- Logo -->
            <div class="py-3">
              <div class="text-sm">
                Logo
                <span class="font-thin"
                  >(file PNG on transparent background for best result)</span
                >
              </div>
              <div>
                <input
                  type="file"
                  ref="logoFile"
                  style="display: none"
                  @change="browsAttachFile($event.target.files)"
                />

                <div class="flex w-full my-1 items-center">
                  <div
                    class="py-1 w-8/12 px-2 border border-blue-500 rounded border-dashed cursor-pointer"
                    v-cloak
                    @drop.prevent="addFile"
                    @dragover.prevent="overFile"
                    @dragleave.prevent="leaveFile"
                    @click="$refs.logoFile.click()"
                  >
                    <div v-if="logo == undefined" class="flex items-center">
                      <base-icon icon="upload"></base-icon>
                      <div v-if="!isOverFile">
                        <div
                          class="text-sm font-thin text-gray-400"
                          v-if="$t('lang') == 'en'"
                        >
                          Drag a file here or
                          <span class="text-primary">Browse</span> to add file
                        </div>
                        <div
                          class="text-sm font-thin text-gray-400"
                          v-if="$t('lang') == 'th'"
                        >
                          ลากไฟล์หรือ
                          <span class="text-primary">เลือกไฟล์</span>
                          เพื่อเพิ่มไฟล์
                        </div>
                      </div>
                      <div v-else-if="isOverFile">
                        <div
                          class="text-sm font-thin text-gray-400"
                          v-if="$t('lang') == 'en'"
                        >
                          Release the files to add file
                        </div>
                        <div
                          class="text-sm font-thin text-gray-400"
                          v-if="$t('lang') == 'th'"
                        >
                          ปล่อยเพื่อเพิ่มไฟล์
                        </div>
                      </div>
                    </div>
                    <div
                      v-else
                      class="text-sm text-primary font-light truncate"
                    >
                      {{ logo.name }}
                    </div>
                  </div>
                  <div
                    v-if="logo != undefined"
                    class="cursor-pointer"
                    @click="logo = undefined"
                  >
                    <base-icon icon="x"></base-icon>
                  </div>
                </div>
              </div>
            </div>
            <!-- End logo -->

            <!-- Select color -->
            <div class="pb-3">
              <div class="text-sm">
                {{ $t('lang') == 'en' ? 'Background' : 'พื้นหลัง' }}
              </div>
              <div class="flex py-3">
                <base-color-picker
                  :colors="popup.background_color"
                  v-model="popup.background_color"
                  label="Background color"
                ></base-color-picker>
                <base-color-picker
                  :colors="popup.text_color"
                  v-model="popup.text_color"
                  label="Text color"
                ></base-color-picker>
              </div>
              <div class="pt-3 text-sm">
                {{ $t('lang') == 'en' ? 'Button' : 'ปุ่ม' }}
              </div>
              <div class="flex py-3">
                <base-color-picker
                  :colors="popup.accept_button_backgound_color"
                  v-model="popup.accept_button_backgound_color"
                  label="Accept All button"
                ></base-color-picker>
                <base-color-picker
                  :colors="popup.accept_button_text_color"
                  v-model="popup.accept_button_text_color"
                  label="Accept All text caption"
                ></base-color-picker>
              </div>
              <div class="flex pb-3">
                <base-color-picker
                  :colors="popup.reject_button_backgound_color"
                  v-model="popup.reject_button_backgound_color"
                  label="Decline Additions button"
                ></base-color-picker>
                <base-color-picker
                  :colors="popup.reject_button_text_color"
                  v-model="popup.reject_button_text_color"
                  label="Decline Additions text caption"
                ></base-color-picker>
              </div>
            </div>
          </div>
          <!-- End popup -->

          <div class="text-lg mb-2 flex">
            <div class="mr-4">{{ $t('website.cookiePrivacy.title') }}</div>
            <div>
              <base-toggle v-model="privacy_notice_link.active"></base-toggle>
            </div>
          </div>
          <div class="bg-gray-100 p-6 rounded">
            <div class="">
              <div>{{ $t('website.cookiePrivacy.linkName') }}</div>
              <base-input
                :placeholder="$t('website.cookiePrivacy.placeLinkName')"
                v-model="privacy_notice_link.link_name"
              ></base-input>
            </div>
            <div class="mt-4">
              <div>{{ $t('website.cookiePrivacy.url') }}</div>
              <base-input
                :placeholder="$t('website.cookiePrivacy.placeUrl')"
                v-model="privacy_notice_link.link_url"
              ></base-input>
            </div>
          </div>
        </div>
        <!-- end Theme -->
        <!-- end Banner -->

        <!-- Preference -->
        <div v-show="tab == 1" class="p-4">
          <div class="text-xl mb-2">{{ $t('website.cookieNotice.title') }}</div>
          <div class="text-sm text-gray-500 font-light mb-2">
            {{ $t('website.cookieNotice.subtitle') }}
          </div>

          <div class="text-lg mt-2">
            {{
              $t('lang') == 'en' ? 'Banner Display' : 'การแสดงคุกกี้แบนเนอร์'
            }}
          </div>

          <div class="">
            <div class="flex items-end">
              <div class="w-40 mr-4">
                <span class="text-gray-600 text-sm">{{
                  $t('website.defualtLanguage.title')
                }}</span>
                <base-dropdown toggleClass="w-full" :dropdownWidthFull="true">
                  <div
                    slot="toggle"
                    class="py-2 px-3 border border-primary rounded text-sm text-primary flex justify-between items-center"
                  >
                    <div v-if="availableLanguage.length > 1">
                      {{ $model.language(application.defaultLanguage).label }}
                    </div>
                    <div v-else>
                      {{ $model.language(availableLanguage[0]).label }}
                    </div>
                    <base-icon
                      class="ml-2"
                      icon="dropdown"
                      width="10"
                      height="10"
                    ></base-icon>
                  </div>
                  <base-dropdown-item
                    v-for="(l, i) in availableLanguage"
                    :key="`language-${i}`"
                    :class="{
                      'active-language': l == application.defaultLanguage,
                    }"
                    @click="application.defaultLanguage = l"
                  >
                    <div class="text-sm" v-if="l == 'th'">Thai</div>
                    <div class="text-sm" v-if="l == 'en'">English</div>
                  </base-dropdown-item>
                </base-dropdown>
              </div>

              <div class="flex-1">
                <base-check
                  v-model="application.autoLanguageDetection"
                  :label="$t('website.defualtLanguage.checkbox')"
                  class="text-sm text-gray-500 font-light mb-2"
                />
              </div>
            </div>
          </div>

          <div class="mt-2">
            <div class="text-sm text-gray-500 font-light">
              {{ $t('website.defualtLanguage.description') }}
            </div>
          </div>

          <div class="flex items-center">
            <div class="text-lg pr-4">
              {{ $t('website.cookieNotice.language') }}
            </div>
            <div>
              <div v-if="availableLanguages.length">
                <base-dropdown :dropdownWidthFull="true">
                  <div slot="toggle" class="">
                    <base-button color="primary">
                      {{ $t('website.cookieNotice.addBtn') }}
                    </base-button>
                  </div>
                  <base-dropdown-item
                    v-for="(lang, i) in availableLanguages"
                    :key="`lang-${i}`"
                    class="px-3"
                    @click="addLanguageClick(lang)"
                  >
                    {{ $model.language(lang).label }}
                  </base-dropdown-item>
                </base-dropdown>
              </div>
            </div>
          </div>

          <!-- Languages -->
          <div class="flex w-full">
            <div
              v-for="(l, i) in availableLanguage"
              :key="`language-${i}`"
              class="py-1 mx-2 my-4 border rounded-full text-sm cursor-pointer flex items-center"
              :class="{
                'bg-blue-100 border-primary text-primary':
                  selectLanguageIndex == i,
                ' bg-gray-100 border-transparent text-gray-500':
                  selectLanguageIndex != i,
              }"
              @click="selectLanguageClick(i)"
            >
              <div class="px-4">
                {{ $model.language(l).label }}
              </div>
              <!--  -->
              <div
                class="mr-2"
                @click="removeLanguageClick(i)"
                v-if="selectLanguageIndex != i && languages.length > 1"
              >
                <base-icon
                  width="18"
                  height="18"
                  icon="x"
                  class="bg-white rounded-full align-sub"
                ></base-icon>
              </div>
            </div>
          </div>

          <div v-if="languages.length" class="max-w-screen-sm">
            <div class="py-2">
              <div class="flex items-end">
                <div class="flex-1">
                  <base-input
                    :label="$t('website.cookieNotice.bannerTitle')"
                    v-model="languages[selectLanguageIndex].title"
                  ></base-input>
                </div>
              </div>

              <div class="mt-4">
                <base-input
                  :label="$t('website.cookieNotice.description')"
                  type="textarea"
                  rows="3"
                  v-model="languages[selectLanguageIndex].description"
                ></base-input>
              </div>

              <div class="text-lg mt-6">
                {{ $t('lang') == 'en' ? 'Button setting' : 'การตั้งค่าปุ่ม' }}
              </div>

              <div class="mt-4">
                <base-input
                  :label="$t('website.cookieNotice.cookieSettingBtn')"
                  v-model="languages[selectLanguageIndex].cookieSetting"
                ></base-input>
              </div>

              <div class="flex space-x-4">
                <div class="flex-1 mt-4">
                  <base-input
                    :label="$t('website.cookieNotice.rejectBtn')"
                    v-model="languages[selectLanguageIndex].rejectButton"
                  ></base-input>
                </div>

                <div class="flex-1 mt-4">
                  <base-input
                    :label="$t('website.cookieNotice.acceptBtn')"
                    v-model="languages[selectLanguageIndex].acceptButton"
                  ></base-input>
                </div>
              </div>
            </div>

            <div class="text-lg mt-8 mb-2">
              {{ $t('website.cookies.title') }}
            </div>
            <div class="py-2">
              <div>
                <base-input
                  :label="$t('website.cookies.labelTitle')"
                  v-model="languages[selectLanguageIndex].detailTitle"
                ></base-input>
              </div>
              <div class="mt-4">
                <base-input
                  :label="$t('website.cookies.definition')"
                  type="textarea"
                  rows="3"
                  v-model="languages[selectLanguageIndex].detailDescription"
                ></base-input>
              </div>
            </div>

            <!-- Consent settings -->
            <div class="mt-8 mb-2 flex items-center">
              <div class="text-lg mr-4">
                {{ $t('website.consentSetting.title') }}
              </div>
              <div>
                <base-button
                  color="primary"
                  class="cursor-pointer"
                  @click="manageCategoriesClick"
                >
                  {{ $t('website.consentSetting.addBtn') }}
                </base-button>
              </div>
            </div>

            <div
              v-for="(c, i) in languages[selectLanguageIndex].consentRules"
              :key="`category-${i}`"
            >
              <div class="mb-1" v-if="categoriesSelect[i].active">
                <div
                  class="flex py-3 px-6 rounded"
                  :class="{
                    'bg-blue-100': categoriesSelect[i].default,
                    'bg-gray-100 ': !categoriesSelect[i].default,
                  }"
                >
                  <div class="flex-1">{{ c.title }}</div>
                  <div v-if="c.necessary" class="mr-4 text-primary text-sm">
                    Always Active
                  </div>
                  <div v-else class="mr-4">
                    <base-toggle v-model="categoriesSelect[i].default" />
                  </div>
                  <div
                    class="cursor-pointer"
                    @click="c.show = !c.show"
                    :class="{ '': c.show, 'transform -rotate-90': !c.show }"
                  >
                    <base-icon
                      icon="dropdown"
                      width="14"
                      height="14"
                      color="primary"
                    ></base-icon>
                  </div>
                </div>
                <div
                  v-if="c.show"
                  class="p-4 border-l border-b border-r border-gray-200 rounded-bl-md rounded-br-md"
                >
                  <div class="">
                    <base-input
                      label="Preferences cookies category title"
                      v-model="c.title"
                    ></base-input>
                  </div>
                  <div class="mt-4">
                    <base-input
                      label="Preferences cookies description"
                      type="textarea"
                      rows="3"
                      v-model="c.description"
                    ></base-input>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Consent settings -->
          </div>
          <!-- end Languages -->
        </div>
        <!-- end Preference -->
      </div>
      <!-- right -->
      <div class="w-full lg:w-1/2">
        <div class="sticky top-0 left-0 w-full">
          <div class="bg-gray-100 border-b border-gray-100 w-full">
            <div class="flex items-center justify-between">
              <div class="text-lg pl-6 py-3 pr-6">
                {{ $t('website.preview') }}
              </div>
              <div class="flex bg-gray-200 mx-3 p-1 rounded">
                <div
                  class="py-1 px-2 text-sm font-light cursor-pointer rounded"
                  :class="{ 'bg-white': tab_preview == 'banner' }"
                  @click="tab_preview = 'banner'"
                >
                  {{ $t('lang') == 'en' ? 'Banner' : 'แบนเนอร์' }}
                </div>
                <div
                  class="py-1 px-2 text-sm font-light cursor-pointer rounded"
                  :class="{ 'bg-white': tab_preview == 'popup' }"
                  @click="tab_preview = 'popup'"
                >
                  {{ $t('lang') == 'en' ? 'Popup' : 'ป๊อปอัพ' }}
                </div>
              </div>
            </div>

            <!-- Preview -->
            <div v-if="tab_preview == 'banner'" class="w-full px-5">
              <div
                v-if="application.theme == 2 || application.theme == 1"
                class="w-full"
              >
                <div class="w-full shadow-md rounded-lg border border-gray-300">
                  <div class="w-full bg-cool-gray-200 rounded-t-lg flex py-2">
                    <div class="h-3 w-3 bg-gray-300 rounded-full ml-2"></div>
                    <div class="h-3 w-3 bg-gray-300 rounded-full ml-2"></div>
                    <div class="h-3 w-3 bg-gray-300 rounded-full ml-2"></div>
                  </div>
                  <div class="w-full h-64 bg-white rounded-b-lg">
                    <div
                      class="w-full h-full relative"
                      v-if="layout == 0 || layout == 1"
                    >
                      <div
                        class="w-full px-10 py-5 absolute"
                        :class="{
                          'bottom-0': layout == 0,
                          'top-0': layout == 1,
                        }"
                      >
                        <div class="rounded-lg shadow-md">
                          <div
                            class="px-3 py-3 text-white rounded-lg"
                            :class="{
                              'bg-primary': application.theme == 2,
                              'bg-black': application.theme == 1,
                            }"
                          >
                            <div class="flex justify-start items-center">
                              <div class="title-preview">
                                {{
                                  languages[selectLanguageIndex]
                                    ? languages[selectLanguageIndex].title
                                    : 'title'
                                }}
                              </div>
                            </div>
                            <div class="flex w-full items-end">
                              <div class="w-4/6">
                                <div class="description-preview font-thin">
                                  {{
                                    languages[selectLanguageIndex]
                                      ? languages[selectLanguageIndex]
                                          .description
                                      : 'description'
                                  }}
                                </div>
                              </div>
                              <div class="w-2/6 flex justify-end">
                                <div
                                  class="btn-preview font-thin px-2 border border-white rounded-full mx-1"
                                >
                                  {{ $t('lang') == 'en' ? 'Cancel' : 'ยกเลิก' }}
                                </div>
                                <div
                                  class="btn-preview font-thin text-primary px-2 border border-white rounded-full"
                                  :class="{
                                    'bg-white': application.theme == 2,
                                    'bg-primary text-white':
                                      application.theme == 1,
                                  }"
                                >
                                  {{
                                    $t('lang') == 'en'
                                      ? 'Accept All Cookies'
                                      : 'ยอมรับทั้งหมด'
                                  }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="w-full h-full flex items-center justify-center"
                      v-else-if="layout == 5"
                    >
                      <div
                        class="w-3/5 rounded-lg shadow-md px-3 py-3"
                        :class="{
                          'bg-primary': application.theme == 2,
                          'bg-black': application.theme == 1,
                        }"
                      >
                        <div
                          class="flex justify-start items-center text-white"
                        >
                          <div class="title-preview">
                            {{
                              languages[selectLanguageIndex]
                                ? languages[selectLanguageIndex].title
                                : 'title'
                            }}
                          </div>
                        </div>
                        <div class="flex w-full items-end text-white">
                          <div class="w-3/6">
                            <div class="description-preview font-thin">
                              {{
                                languages[selectLanguageIndex]
                                  ? languages[selectLanguageIndex].description
                                  : 'description'
                              }}
                            </div>
                          </div>
                          <div class="w-3/6 flex justify-end">
                            <div
                              class="btn-preview font-thin px-2 border border-white rounded-full mx-1"
                            >
                              {{ $t('lang') == 'en' ? 'Cancel' : 'ยกเลิก' }}
                            </div>
                            <div
                              class="btn-preview font-thin text-primary px-2 border border-white rounded-full"
                              :class="{
                                'bg-white': application.theme == 2,
                                'bg-primary text-white': application.theme == 1,
                              }"
                            >
                              {{
                                $t('lang') == 'en'
                                  ? 'Accept All Cookies'
                                  : 'ยอมรับทั้งหมด'
                              }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="" v-else-if="application.theme == 3">
                <div class="w-full shadow-md rounded-lg border border-gray-300">
                  <div class="w-full bg-cool-gray-200 rounded-t-lg flex py-2">
                    <div class="h-3 w-3 bg-gray-300 rounded-full ml-2"></div>
                    <div class="h-3 w-3 bg-gray-300 rounded-full ml-2"></div>
                    <div class="h-3 w-3 bg-gray-300 rounded-full ml-2"></div>
                  </div>
                  <div class="w-full h-64 bg-white rounded-b-lg">
                    <div
                      class="w-full h-full relative"
                      v-if="layout == 0 || layout == 1"
                    >
                      <div 
                        class="px-10 py-5 absolute"
                        :class="{
                          'bottom-0': layout == 0,
                          'top-0': layout == 1,
                        }">
                        <div class="rounded-lg shadow-md">
                          <div
                            class="px-3 py-3 rounded-lg"
                            :style="`background-color: ${banner.bg_color_1.hex8}; background-image: linear-gradient(to right, ${banner.bg_color_1.hex8} , ${banner.bg_color_2.hex8}); `"
                          >
                            <div class="flex justify-start items-center">
                              <div
                                class="title-preview"
                                :style="`color: ${banner.text_color.hex8};`"
                              >
                                {{
                                  languages[selectLanguageIndex]
                                    ? languages[selectLanguageIndex].title
                                    : 'title'
                                }}
                              </div>
                            </div>
                            <div class="flex w-full items-end">
                              <div class="w-4/6">
                                <div
                                  class="description-preview font-thin"
                                  :style="`color: ${banner.text_color.hex8};`"
                                >
                                  {{
                                    languages[selectLanguageIndex]
                                      ? languages[selectLanguageIndex]
                                          .description
                                      : 'description'
                                  }}
                                </div>
                              </div>
                              <div class="w-2/6 flex justify-end items-center">
                                <div
                                  class="btn-preview font-thin px-2 rounded-full mx-1"
                                  :style="`background-color: ${banner.reject_button_backgound_color.hex8}; color: ${banner.reject_button_text_color.hex8}`"
                                >
                                  {{ $t('lang') == 'en' ? 'Cancel' : 'ยกเลิก' }}
                                </div>
                                <div
                                  class="btn-preview font-thin px-2 rounded-full"
                                  :style="`background-color: ${banner.accept_button_backgound_color.hex8}; color: ${banner.accept_button_text_color.hex8}`"
                                >
                                  {{
                                    $t('lang') == 'en'
                                      ? 'Accept All Cookies'
                                      : 'ยอมรับทั้งหมด'
                                  }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="w-full h-full flex items-center justify-center"
                      v-else-if="layout == 5"
                    >
                      <div
                        class="w-3/5 rounded-lg shadow-md px-3 py-3"
                        :style="`background-color: ${banner.bg_color_1.hex8}; background-image: linear-gradient(to right, ${banner.bg_color_1.hex8} , ${banner.bg_color_2.hex8}); `"
                      >
                        <div class="flex justify-start items-center">
                          <div
                            class="title-preview"
                            :style="`color: ${banner.text_color.hex8};`"
                          >
                            {{
                              languages[selectLanguageIndex]
                                ? languages[selectLanguageIndex].title
                                : 'title'
                            }}
                          </div>
                        </div>
                        <div class="flex w-full items-end">
                          <div class="w-3/6">
                            <div
                              class="description-preview font-thin"
                              :style="`color: ${banner.text_color.hex8};`"
                            >
                              {{
                                languages[selectLanguageIndex]
                                  ? languages[selectLanguageIndex].description
                                  : 'description'
                              }}
                            </div>
                          </div>
                          <div class="w-3/6 flex justify-end items-center">
                            <div
                              class="btn-preview font-thin px-2 rounded-full mx-1"
                              :style="`background-color: ${banner.reject_button_backgound_color.hex8}; color: ${banner.reject_button_text_color.hex8}`"
                            >
                              {{ $t('lang') == 'en' ? 'Cancel' : 'ยกเลิก' }}
                            </div>
                            <div
                              class="btn-preview font-thin px-2 rounded-full"
                              :style="`background-color: ${banner.accept_button_backgound_color.hex8}; color: ${banner.accept_button_text_color.hex8}`"
                            >
                              {{
                                $t('lang') == 'en'
                                  ? 'Accept All Cookies'
                                  : 'ยอมรับทั้งหมด'
                              }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full px-5" v-else-if="tab_preview == 'popup'">
              <div class="w-full shadow-md rounded-lg border border-gray-300">
                <div class="w-full bg-cool-gray-200 rounded-t-lg flex py-2">
                  <div class="h-3 w-3 bg-gray-300 rounded-full ml-2"></div>
                  <div class="h-3 w-3 bg-gray-300 rounded-full ml-2"></div>
                  <div class="h-3 w-3 bg-gray-300 rounded-full ml-2"></div>
                </div>
                <div class="w-full bg-white rounded-b-lg">
                  <div
                    class="py-5 mx-auto w-full flex justify-center flex-col place-items-center"
                    v-if="application.theme == 3"
                  >
                    <div
                      class="w-3/5 px-3 pb-2 rounded-t-md"
                      :style="`background-color: ${popup.background_color.hex8}`"
                    >
                      <div
                        class="flex w-full py-1 justify-between items-center"
                      >
                        <img
                          style="height: 20px"
                          v-bind:src="`${logoBase64}`"
                          alt=""
                        />
                        <div
                          class="w-3 h-3 bg-white rounded-full flex justify-center items-center"
                        >
                          <base-icon icon="x" size="12"></base-icon>
                        </div>
                      </div>
                      <div
                        class="pt-1 w-full border-t border-gray-100 opacity-25"
                      ></div>

                      <div
                        class="py-1"
                        :style="`color: ${popup.text_color.hex8}`"
                      >
                        <div style="font-size: 9px">
                          {{
                            languages[selectLanguageIndex]
                              ? languages[selectLanguageIndex].detailTitle
                              : 'Detail Cookies'
                          }}
                        </div>
                        <div style="font-size: 7px; font-weight: 200">
                          {{
                            languages[selectLanguageIndex]
                              ? languages[selectLanguageIndex].detailDescription
                              : 'Detail Cookies'
                          }}
                        </div>
                      </div>
                    </div>
                    <div class="w-3/5 px-3 py-2 rounded-b-md shadow-md">
                      <div class="flex justify-between items-center">
                        <div
                          class="text-gray-400 underline font-light"
                          style="font-size: 7px"
                        >
                          Cookie Privacy Notice
                        </div>
                        <div
                          class="flex space-x-1 font-light"
                          style="font-size: 7px"
                        >
                          <div
                            class="px-2 py-1 rounded-full"
                            :style="`background-color: ${popup.reject_button_backgound_color.hex8}; color: ${popup.reject_button_text_color.hex8}`"
                          >
                            Decline Additions
                          </div>
                          <div
                            class="px-2 py-1 rounded-full"
                            :style="`background-color: ${popup.accept_button_backgound_color.hex8}; color: ${popup.accept_button_text_color.hex8}`"
                          >
                            Accept All
                          </div>
                        </div>
                      </div>

                      <div class="py-2">
                        <div
                          class="flex items-center justify-between py-1 border-b border-gray-300"
                        >
                          <div style="font-size: 7px">Necessary cookies</div>
                          <div class="flex space-x-2 items-center">
                            <div
                              style="font-size: 5px"
                              class="font-light text-gray-400"
                            >
                              See Detail
                            </div>
                            <toggle-button
                              :value="true"
                              color="#0e64c6"
                              :height="14"
                              :width="27"
                              disabled
                            />
                          </div>
                        </div>
                        <div
                          class="flex items-center justify-between py-1 border-b border-gray-300"
                        >
                          <div style="font-size: 7px">Preferences cookies</div>
                          <div class="flex space-x-2 items-center">
                            <div
                              style="font-size: 5px"
                              class="font-light text-gray-400"
                            >
                              See Detail
                            </div>
                            <toggle-button
                              :value="true"
                              color="#0e64c6"
                              :height="14"
                              :width="27"
                            />
                          </div>
                        </div>
                        <div
                          class="flex justify-between items-center py-1 border-b border-gray-300"
                        >
                          <div style="font-size: 7px">Statistcics cookies</div>
                          <div class="flex space-x-2 items-center">
                            <div
                              style="font-size: 5px"
                              class="font-light text-gray-400"
                            >
                              See Detail
                            </div>
                            <toggle-button
                              :value="false"
                              color="#0e64c6"
                              :height="14"
                              :width="27"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="py-10 mx-auto w-full flex justify-center flex-col place-items-center"
                    v-if="application.theme == 2"
                  >
                    <div
                      class="w-3/5 px-3 pb-2 rounded-t-md bg-primary"
                    >
                      <div
                        class="flex w-full py-1 justify-between items-center"
                      >
                        <div
                          class="w-3 h-3 bg-white rounded-full flex justify-center items-center"
                        >
                          <base-icon icon="x" size="12"></base-icon>
                        </div>
                      </div>
                      <div
                        class="pt-1 w-full h-px border-t border-blue-500"
                      ></div>

                      <div
                        class="py-1 text-white"
                      >
                        <div style="font-size: 9px">
                          {{
                            languages[selectLanguageIndex]
                              ? languages[selectLanguageIndex].detailTitle
                              : 'Detail Cookies'
                          }}
                        </div>
                        <div style="font-size: 7px; font-weight: 200">
                          {{
                            languages[selectLanguageIndex]
                              ? languages[selectLanguageIndex].detailDescription
                              : 'Detail Cookies'
                          }}
                        </div>
                      </div>
                    </div>
                    <div class="w-3/5 px-3 py-2 rounded-b-md shadow-md">
                      <div class="flex justify-between items-center">
                        <div
                          class="text-gray-400 underline font-light"
                          style="font-size: 7px"
                        >
                          Cookie Privacy Notice
                        </div>
                        <div
                          class="flex space-x-1 font-light"
                          style="font-size: 7px"
                        >
                          <div
                            class="px-2 py-1 rounded-full bg-gray-200 text-gray-500"
                          >
                            Decline Additions
                          </div>
                          <div
                            class="px-2 py-1 rounded-full bg-primary text-white"
                          >
                            Accept All
                          </div>
                        </div>
                      </div>

                      <div class="py-2">
                        <div
                          class="flex items-center justify-between py-1 border-b border-gray-300"
                        >
                          <div style="font-size: 7px">Necessary cookies</div>
                          <div class="flex space-x-2 items-center">
                            <div
                              style="font-size: 5px"
                              class="font-light text-gray-400"
                            >
                              See Detail
                            </div>
                            <toggle-button
                              :value="true"
                              color="#0e64c6"
                              :height="14"
                              :width="27"
                              disabled
                            />
                          </div>
                        </div>
                        <div
                          class="flex items-center justify-between py-1 border-b border-gray-300"
                        >
                          <div style="font-size: 7px">Preferences cookies</div>
                          <div class="flex space-x-2 items-center">
                            <div
                              style="font-size: 5px"
                              class="font-light text-gray-400"
                            >
                              See Detail
                            </div>
                            <toggle-button
                              :value="true"
                              color="#0e64c6"
                              :height="14"
                              :width="27"
                            />
                          </div>
                        </div>
                        <div
                          class="flex justify-between items-center py-1 border-b border-gray-300"
                        >
                          <div style="font-size: 7px">Statistcics cookies</div>
                          <div class="flex space-x-2 items-center">
                            <div
                              style="font-size: 5px"
                              class="font-light text-gray-400"
                            >
                              See Detail
                            </div>
                            <toggle-button
                              :value="false"
                              color="#0e64c6"
                              :height="14"
                              :width="27"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="py-10 mx-auto w-full flex justify-center flex-col place-items-center"
                    v-if="application.theme == 1"
                  >
                    <div
                      class="w-3/5 px-3 pb-2 rounded-t-md bg-black"
                    >
                      <div
                        class="flex w-full py-1 justify-between items-center"
                      >
                        <div
                          class="w-3 h-3 bg-white rounded-full flex justify-center items-center"
                        >
                          <base-icon icon="x" size="12"></base-icon>
                        </div>
                      </div>
                      <div
                        class="pt-1 w-full h-px border-t border-gray-700"
                      ></div>

                      <div
                        class="py-1 text-white"
                      >
                        <div style="font-size: 9px">
                          {{
                            languages[selectLanguageIndex]
                              ? languages[selectLanguageIndex].detailTitle
                              : 'Detail Cookies'
                          }}
                        </div>
                        <div style="font-size: 7px; font-weight: 200">
                          {{
                            languages[selectLanguageIndex]
                              ? languages[selectLanguageIndex].detailDescription
                              : 'Detail Cookies'
                          }}
                        </div>
                      </div>
                    </div>
                    <div class="w-3/5 px-3 py-2 rounded-b-md shadow-md bg-black">
                      <div class="flex justify-between items-center">
                        <div
                          class="text-gray-400 underline font-light"
                          style="font-size: 7px"
                        >
                          Cookie Privacy Notice
                        </div>
                        <div
                          class="flex space-x-1 font-light"
                          style="font-size: 7px"
                        >
                          <div
                            class="px-2 py-1 rounded-full bg-black border border-white text-white"
                          >
                            Decline Additions
                          </div>
                          <div
                            class="px-2 py-1 rounded-full bg-primary border border-primary text-white"
                          >
                            Accept All
                          </div>
                        </div>
                      </div>

                      <div class="py-2 text-white">
                        <div
                          class="flex items-center justify-between py-1 border-b border-gray-300"
                        >
                          <div style="font-size: 7px">Necessary cookies</div>
                          <div class="flex space-x-2 items-center">
                            <div
                              style="font-size: 5px"
                              class="font-light text-gray-400"
                            >
                              See Detail
                            </div>
                            <toggle-button
                              :value="true"
                              color="#0e64c6"
                              :height="14"
                              :width="27"
                              disabled
                            />
                          </div>
                        </div>
                        <div
                          class="flex items-center justify-between py-1 border-b border-gray-300"
                        >
                          <div style="font-size: 7px">Preferences cookies</div>
                          <div class="flex space-x-2 items-center">
                            <div
                              style="font-size: 5px"
                              class="font-light text-gray-400"
                            >
                              See Detail
                            </div>
                            <toggle-button
                              :value="true"
                              color="#0e64c6"
                              :height="14"
                              :width="27"
                            />
                          </div>
                        </div>
                        <div
                          class="flex justify-between items-center py-1 border-b border-gray-300"
                        >
                          <div style="font-size: 7px">Statistcics cookies</div>
                          <div class="flex space-x-2 items-center">
                            <div
                              style="font-size: 5px"
                              class="font-light text-gray-400"
                            >
                              See Detail
                            </div>
                            <toggle-button
                              :value="false"
                              color="#0e64c6"
                              :height="14"
                              :width="27"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-5 py-3">
              <div class="flex items-center">
                <base-check v-model="application.show_powered_by"></base-check>
                <div class="text-gray-500 font-light text-sm">{{ $t('lang') == 'en' ? 'Show Powered by beCOOKIES' : 'แสดง Powered by beCOOKIES'}}</div>
              </div>
            </div>
            <!-- End Preview  -->
          </div>
          <div class="p-6">
            <div class="text-lg mb-2">{{$t('website.scriptTitle')}}</div>
            <div class="text-sm text-gray-500 mb-4">
              {{$t('website.scriptDescription')}}
            </div>
            <div class="text-lg mb-2">Consent script mode</div>
            <div class="flex space-x-3 items-center text-sm text-gray-400 pb-3">
              <base-radio
                v-model="application.scan_mode"
                :inputValue="1"
                label="Consent Banner"
              ></base-radio>
              <base-radio
                v-model="application.scan_mode"
                :inputValue="2"
                label="Discovery"
              ></base-radio>
            </div>
            <script-view
              v-if="application.id"
              :id="application.id"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="languages.length">
      <manage-categories
        ref="manageCategories"
        :consentRules="languages[selectLanguageIndex].consentRules"
        @update="selectCategories"
      />
    </div>

    <reassign ref="reassign" />
  </div>
</template>

<script>
import ManageCategories from '@/components/domain/manage-categories'
import ScriptView from '@/components/domain/script-view'
import ColorSelect from '@/components/domain/color-select'
import Reassign from '@/components/domain/reassign'

export default {
  middleware: 'auth',
  components: {
    ManageCategories,
    ScriptView,
    ColorSelect,
    Reassign,
  },
  asyncData({ params }) {
    return { id: params.id }
  },
  computed: {
    applications() {
      return this.$store.getters['application/getList']
    },
    tabs() {
      // 'Geolocation'
      if (this.$t('lang') == 'en') return ['Banner', 'Preference']
      else if (this.$t('lang') == 'th') return ['แบนเนอร์', 'จัดการคุกกี้']
    },
    useLanguages() {
      return this.availableLanguage.map((e) => e)
    },
    availableLanguages() {
      const self = this
      const langs = []
      for (let lang of self.$model.languages) {
        const l = lang
        if (!self.useLanguages.includes(l.key)) {
          langs.push(l.key)
        }
      }
      return langs
    },
    organization_id() {
      return this.$store.getters['organizations/getOrganizationId']
    },
    user() {
      return this.$store.getters['me/getUser']
    },
    role() {
      return this.$store.getters['me/getRole']
    }
  },
  data() {
    return {
      tab: 0,
      application: {
        styles: {},
        data: {
          privacyNoticeLink: {},
        },
      },

      isOverlay: false,

      selectLanguageIndex: 0,
      languages: [],
      categoriesSelect: [],
      availableLanguage: [],

      consentRules: undefined,
      initialLanguages: undefined,

      script: {
        header: '',
        revoke: '<a href="#" id="cc-js-revoke">Revoke consent</a>',
      },
      layout: '',
      privacy_notice_link: {},

      tab_preview: 'banner',
      banner: {
        bg_color_1: {
          hex8: '',
        },
        bg_color_2: {
          hex8: '',
        },
        text_color: {
          hex8: '',
        },
        accept_button_backgound_color: {
          hex8: '',
        },
        accept_button_text_color: {
          hex8: '',
        },
        reject_button_backgound_color: {
          hex8: '',
        },
        reject_button_text_color: {
          hex8: '',
        },
      },
      popup: {
        accept_button_backgound_color: {
          hex8: '',
        },
        accept_button_text_color: {
          hex8: '',
        },
        background_color: {
          hex8: '',
        },
        reject_button_backgound_color: {
          hex8: '',
        },
        reject_button_text_color: {
          hex8: '',
        },
        text_color: {
          hex8: '',
        },
      },

      logo: undefined,
      logoBase64: '',
      isOverFile: false,
    }
  },
  async mounted() {
    await this.fetch()
    // await this.fetchScript()
  },
  methods: {
    async fetch() {
      const self = this
      self.$store.dispatch('loading/setLoading', true)

      // fetch application
      await self.$api
        .getApplication(self.id)
        .then((response) => {
          self.application = {
            ...self.application,
            ...response.data,
          }
        })
        .catch((error) => {
          console.log(error.response.data)
        })
      await self.$api.getSummary(self.id).then((response) => {
        self.application.cookie_counts = response.data.cookie_counts
      })
      .catch((err) => {
        console.log(err.response.data)
      })

      // fetch template
      await self.$api
        .getApplicationTemplate(self.id)
        .then(async (response) => {
          self.application = {
            ...self.application,
            ...response.data,
            defaultLanguage: response.data.default_language,
            autoLanguageDetection: response.data.auto_language_detection,
          }
          // Banner color
          let color_banner = self.application.theme_color.banner
          self.banner.bg_color_1.hex8 = color_banner.background_color_1 || '#3794fc' 
          self.banner.bg_color_2.hex8 = color_banner.background_color_2 || '#1269cb'
          self.banner.text_color.hex8 = color_banner.text_color || '#ffffff'
          self.banner.accept_button_backgound_color.hex8 = color_banner.accept_button_backgound_color || '#ffffff'
          self.banner.accept_button_text_color.hex8 = color_banner.accept_button_text_color || '#1269cb'
          self.banner.reject_button_backgound_color.hex8 = color_banner.reject_button_backgound_color || '#ffffff'
          self.banner.reject_button_text_color.hex8 = color_banner.reject_button_text_color || '#1269cb'

          // Popup color
          let color_popup = self.application.theme_color.popup
          self.popup.background_color.hex8 = color_popup.background_color || '#1269cb'
          self.popup.text_color.hex8 = color_popup.text_color || '#ffffff'
          self.popup.accept_button_backgound_color.hex8 = color_popup.accept_button_backgound_color || '#1269cb'
          self.popup.accept_button_text_color.hex8 = color_popup.accept_button_text_color || '#ffffff'
          self.popup.reject_button_backgound_color.hex8 = color_popup.reject_button_backgound_color || '#e6e6e6'
          self.popup.reject_button_text_color.hex8 = color_popup.reject_button_text_color || '#57697b'

          self.privacy_notice_link = self.application.privacy_notice_link
          const data = response.data
          const availableLanguage = self.application.available_languages
          const langs = availableLanguage

          await self.$api.getApplicationCategories(self.id).then((response_app_cate) => {
            data.categories = response_app_cate.data.entities
          })

          await self.$api.getTemplateLogo(self.id).then((response_template_logo) => {
            self.logoBase64 = `data:image/png;base64,${response_template_logo.data.image_base64}`
          }).catch((err) => {
            console.log(err.response.data)
          })

          const consentRules = data.categories
          const cats = Object.keys(consentRules)

          self.availableLanguage = availableLanguage

          self.consentRules = consentRules

          // theme
          let list_layouts = [0, 1, 5]
          self.layout = list_layouts.includes(self.application.present_type) ? self.application.present_type : 0

          var languages = []
          langs.forEach((l) => {
            languages.push(self.fetchLanguageObject(data, l))
          })

          self.languages = languages.sort((x, y) =>
            x.key == 'en' ? -1 : y.key == 'en' ? 1 : 0
          )

          var categoriesSelect = []
          cats.forEach((c) => {
            categoriesSelect.push({
              key: c,
              id: consentRules[c].id,
              active: consentRules[c].active,
              default: consentRules[c].default,
              necessary: consentRules[c].necessary,
            })
          })
          self.categoriesSelect = categoriesSelect
        })
        .catch((error) => {
          console.log(error.response.data)
        })

      self.$store.dispatch('loading/setLoading', false)
    },
    fetchLanguageObject(data, lang) {
      const self = this
      var consentRules = {}
      if (data.categories) consentRules = data.categories
      else if (self.consentRules) consentRules = self.consentRules

      const cats = consentRules ? Object.keys(consentRules) : []
      const contents = data.content

      var categories = []
      cats.forEach((c) => {
        categories.push({
          key: c,
          title: consentRules[c].title
            ? consentRules[c].title[lang]
              ? consentRules[c].title[lang]
              : consentRules[c].title
            : '',
          description: consentRules[c].description
            ? consentRules[c].description[lang]
              ? consentRules[c].description[lang]
              : consentRules[c].description
            : '',
          show: false,
          open: false,
          necessary: consentRules[c].necessary,
          id: consentRules[c].id,
        })
      })
      
      const language = {}
      language = {
        key: lang,
        title: contents.banner.title[lang],
        description: contents.banner.description[lang],
        cookieSetting: contents.banner.cookie_setting[lang],
        acceptButton: contents.banner.accept_button[lang],
        rejectButton: contents.banner.reject_button[lang],

        detailTitle: contents.categories_modal.title[lang],
        detailDescription: contents.categories_modal.description[lang],
        allowAllButton: contents.categories_modal.accept_button[lang],
        managePreferencesTitle:
          contents.categories_modal.more_preference_detail[lang],
        preferenceAlwayActive:
          contents.categories_modal.preference_alway_active[lang],
        morePreferenceDetail:
          contents.categories_modal.more_preference_detail[lang],
        confirmChoseButton:
          contents.categories_modal.confirm_chose_button[lang],

        consentRules: categories,
      }

      // console.log(language)

      return language
    },
    async fetchScript() {
      const self = this
      self.$store.dispatch('loading/setLoading', true)
      self.$api
        .getScript(self.id)
        .then((response) => {
          self.script.header = response.data
        })
        .catch((error) => {
          console.log(error.response.data)
        })
      self.$store.dispatch('loading/setLoading', false)
    },
    cookieSettingClick() {
      this.$refs.reassign.show(this.application)
    },
    selectCategories(categoriesSelect) {
      this.categoriesSelect = categoriesSelect
    },
    selectApplication(a) {
      this.$router.push(`/domains-setting/${a.applicationId}`)
    },
    manageCategoriesClick() {
      this.categoriesSelect.forEach((e) => {
        e.open = false
      })
      this.$refs.manageCategories.show(this.categoriesSelect)
    },
    async fetchInitialLanguages() {
    },
    async addLanguageClick(lang) {
      const self = this
      var languages = self.languages

      self.availableLanguage.push(lang)

      let data = self.application

      const language = self.fetchLanguageObject(data, lang)

      languages.push({
        ...language,
        key: lang,
      })
      self.languages = languages

      // category
      var categoriesSelect = self.categoriesSelect
      categoriesSelect.push({
        ...categoriesSelect[self.selectLanguageIndex],
        key: lang,
      })
      self.categoriesSelect = categoriesSelect
    },
    async changeLanguageDropdown(lang) {
      const self = this

      // load initial language
      await self.fetchInitialLanguages()

      self.$store.dispatch('loading/setLoading', true)

      const language = self.fetchLanguageObject(
        self.initialLanguages[lang],
        lang
      )

      var languages = self.languages
      languages = languages.filter((l, i) => self.selectLanguageIndex != i)
      self.languages = languages

      languages.splice(self.selectLanguageIndex, 0, {
        ...language,
        key: lang,
      })
      self.languages = languages

      self.$store.dispatch('loading/setLoading', false)
    },
    selectLanguageClick(index) {
      if (index >= this.languages.length) return
      this.selectLanguageIndex = index
    },
    removeLanguageClick(index) {
      const self = this
      if (index >= self.languages.length - 2) {
        self.selectLanguageIndex = self.languages.length - 2
      }

      var languages = self.languages
      languages = languages.filter((l, i) => index != i)
      self.availableLanguage = self.availableLanguage.filter(
        (l, i) => index != i
      )
      self.languages = languages

    },
    mixLanguage() {
      const self = this

      if (self.availableLanguage.length == 1) {
        self.application.defaultLanguage = self.availableLanguage[0]
      }

      const data = {
        // styles: {
        //   templateType: self.application.styles.templateType,
        //   colorTheme: self.application.styles.colorTheme,
        // },
        theme: parseInt(self.application.theme),
        present_type: self.application.present_type,
        available_languages: self.application.available_languages,
        default_language: self.application.defaultLanguage,
        auto_language_detection: self.application.autoLanguageDetection,
        scan_mode: self.application.scan_mode,
        show_powered_by: self.application.show_powered_by,
        // data: {
        //   defaultLanguage: self.application.defaultLanguage,
        //   autoLanguageDetection: self.application.autoLanguageDetection,
        //   availableLanguage: self.availableLanguage,
        privacy_notice_link: {
          active: self.privacy_notice_link.active,
          link_name: self.privacy_notice_link.link_name,
          link_url: self.privacy_notice_link.link_url,
        },
        theme_color: {
          banner: {
            background_color_1: self.banner.bg_color_1.hex8,
            background_color_2: self.banner.bg_color_2.hex8,
            accept_button_backgound_color:
              self.banner.accept_button_backgound_color.hex8,
            accept_button_text_color: self.banner.accept_button_text_color.hex8,
            reject_button_backgound_color:
              self.banner.reject_button_backgound_color.hex8,
            reject_button_text_color: self.banner.reject_button_text_color.hex8,
            text_color: self.banner.text_color.hex8,
          },
          popup: {
            accept_button_backgound_color:
              self.popup.accept_button_backgound_color.hex8,
            accept_button_text_color: self.popup.accept_button_text_color.hex8,
            background_color: self.popup.background_color.hex8,
            reject_button_backgound_color:
              self.popup.reject_button_backgound_color.hex8,
            reject_button_text_color: self.popup.reject_button_text_color.hex8,
            text_color: self.popup.text_color.hex8,
          },
        },
        // },
        content: {
          banner: {
            title: {},
            description: {},
            cookie_setting: {},
            accept_button: {},
            reject_button: {},
          },
          categories_modal: {
            title: {},
            description: {},
            accept_button: {},
            manage_preferences_title: {},
            preference_alway_active: {},
            more_preference_detail: {},
            confirm_chose_button: {},
          },
          cookies_modal: {
            title: {
              th: 'ตั้งค่าคุกกี้',
              en: '',
            },
            column_title: {
              name: {
                th: 'ชื่อ',
                en: '',
              },
              provider: {
                th: 'ผู้ให้บริการ',
                en: '',
              },
              purpose: {
                th: 'รูปแบบการใช้งาน',
                en: '',
              },
              expiry: {
                th: 'อายุ',
                en: '',
              },
              type: {
                th: 'ประเภท',
                en: '',
              },
            },
          },
        },

        categories: {},
      }

      // language
      self.languages.forEach((l) => {
        data.content.banner.title[l.key] = l.title
        data.content.banner.description[l.key] = l.description
        data.content.banner.cookie_setting[l.key] = l.cookieSetting
        data.content.banner.accept_button[l.key] = l.acceptButton
        data.content.banner.reject_button[l.key] = l.rejectButton

        data.content.categories_modal.title[l.key] = l.detailTitle
        data.content.categories_modal.description[l.key] = l.detailDescription
        data.content.categories_modal.accept_button[l.key] = l.allowAllButton
        data.content.categories_modal.manage_preferences_title[l.key] =
          l.managePreferencesTitle
        data.content.categories_modal.preference_alway_active[l.key] =
          l.preferenceAlwayActive
        data.content.categories_modal.more_preference_detail[l.key] =
          l.morePreferenceDetail
        data.content.categories_modal.confirm_chose_button[l.key] =
          l.confirmChoseButton
      })

      // category
      var consentRules = []
      self.languages.forEach((l) => {
        l.consentRules.forEach((c, i) => {
          if (!consentRules[c.key])
            consentRules[c.key] = {
              title: {},
              description: {},
              active:
                self.categoriesSelect[i].key == 'Necessary'
                  ? true
                  : self.categoriesSelect[i].active,

              default:
                self.categoriesSelect[i].key == 'Necessary'
                  ? true
                  : self.categoriesSelect[i].default,
            }
          consentRules[c.key].title[l.key] = c.title
          consentRules[c.key].description[l.key] = c.description
          consentRules[c.key].id = c.id
        })
      })
      data.categories = consentRules

      return data
    },
    async saveClick() {
      const self = this

      let error = ''

      const data = self.mixLanguage()
      let categories = data.categories

      if (self.availableLanguage.includes('en')) {
        if (!data.content.banner.title.en) error = self.$t('website.err_empty_en.banner_title')
        else if (!data.content.banner.description.en) error = self.$t('website.err_empty_en.banner_des')
        else if (!data.content.banner.cookie_setting.en) error = self.$t('website.err_empty_en.banner_cookie_setting')
        else if (!data.content.banner.accept_button.en) error = self.$t('website.err_empty_en.banner_btn_accept')
        else if (!data.content.banner.reject_button.en) error = self.$t('website.err_empty_en.banner_btn_reject')
        

      }
      if (self.availableLanguage.includes('th')) {
        if (!data.content.banner.title.th) error = self.$t('website.err_empty_th.banner_title')
        else if (!data.content.banner.description.th) error = self.$t('website.err_empty_th.banner_des')
        else if (!data.content.banner.cookie_setting.th) error = self.$t('website.err_empty_th.banner_cookie_setting')
        else if (!data.content.banner.accept_button.th) error = self.$t('website.err_empty_th.banner_title')
        else if (!data.content.banner.reject_button.th) error = self.$t('website.err_empty_th.banner_btn_reject')
      }

      if (error) {
        self.$toast.open({
          message: error,
          type: 'error',
          duration: 6000
        })
        return
      }

      // console.log(data)

      // return

      self.$store.dispatch('loading/setLoading', true)

      await categories.forEach(async (e) => {
        await self.$api.updateApplicationCategories(self.id, e.id, {
          active: e.active,
          default: e.default,
        })
      })

      if (self.logo != undefined) {
        let data_img = new FormData()

        data_img.append('image', self.logo)

        await self.$api
          .updateTemplateLogo(self.id, data_img)
          .catch((err) => {
            self.$toast.open({
              message: err.response.data.message,
              type: 'error',
              duration: 6000,
            })
          })
      }

      await self.$api.updateApplication(self.id, {
          domian_name: self.application.domian_name,
          name: self.application.domian_name,
        })

      await self.$api
        .updateApplicationTemplate(self.id, data)
        .then((response) => {
          self.$toast.open({
            message:
              self.$t('website.success'),
            type: 'success',
            duration: 6000,
          })
        })
        .catch((err) => {
          self.$toast.open({
            message: err.response.data.message,
            type: 'error',
            duration: 6000,
          })
        })
      self.$store.dispatch('loading/setLoading', false)
    },
    previewClick() {
      const self = this

      const data = self.mixLanguage()
      const newTemplate = {
        mode: 'preview',
        applicationId: self.application.applicationId,
        ...data,
      }
      window.ccTemplate = newTemplate

      const script = document.createElement('script')
      script.src = self.$config.previewUrl
      script.id = 'becookies.tech-scripts'
      script.async = true
      script.dataset.preview = 'true'
      document.body.appendChild(script)

      self.$store.dispatch('loading/setLoading', true)
      setTimeout(function () {
        try {
          window.ccjs.destroy()
          window.ccjs.paint()

          const preview = document.getElementById('cc-js-container')
          if (preview) preview.style.display = 'block'
        } catch (e) {
        }
        self.$store.dispatch('loading/setLoading', false)
      }, 1000)
    },
    browsAttachFile(files) {
      let self = this

      let re = /(\.png)$/i
      if (!re.test(files[0].name)) {
        self.$toast.open({
          message:
            self.$t('lang') == 'en'
              ? 'The file must be of type png.'
              : 'ไฟล์ต้องเป็นประเภท png',
          type: 'error',
          duration: 6000,
        })
        return
      }
       else if (files[0].size > 20480) {
         self.$toast.open({
          message:
            self.$t('lang') == 'en'
              ? 'The file size must not exceed 20 KB.'
              : 'ขนาดของไฟล์ต้องไม่เกิน 20 KB',
          type: 'error',
          duration: 6000,
        })
        return
       }
      self.logo = files[0]

      self.$refs.logoFile.type = 'text'
      self.$refs.logoFile.type = 'file'
    },
    addFile(e) {
      let self = this
      let droppedFiles = e.dataTransfer.files
      if (!droppedFiles) return

      let file = droppedFiles[0]
      let re = /(\.png)$/i
      if (!re.test(file.name)) {
        self.$toast.open({
          message:
            self.$t('lang') == 'en'
              ? 'The file must be of type png.'
              : 'ไฟล์ต้องเป็นประเภท png',
          type: 'error',
          duration: 6000,
        })
        self.isOverFile = false
        return
      }
      else if (files[0].size > 20480) {
         self.$toast.open({
          message:
            self.$t('lang') == 'en'
              ? 'The file size must not exceed 20 KB.'
              : 'ขนาดของไฟล์ต้องไม่เกิน 20 KB',
          type: 'error',
          duration: 6000,
        })
        return
       }

      self.logo = droppedFiles[0]
      var reader = new FileReader()
      reader.onload = function (el) {
        self.logoBase64 = el.target.result
      }

      reader.readAsDataURL(self.logo)
    },
    leaveFile(e) {
      this.isOverFile = false
    },
    overFile(e) {
      let self = this
      self.isOverFile = true
    },
  },
}
</script>

<style>
.title-preview {
  font-size: 8px;
  font-weight: 500;
}
.description-preview {
  font-size: 7px;
}
.btn-preview {
  font-size: 7px;
}
</style>
