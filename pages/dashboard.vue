<template>
  <div>
    <div class="text-gray-500">Home</div>

    <div class="flex items-center py-3 border-b border-gray-100">
      <div class="flex-1 flex items-center">
        <div class="text-lg mr-6">
          {{ $t('lang') == 'en' ? 'Dashboard' : 'แดชบอร์ด' }}
        </div>
        <div class="flex w-64 items-center">
          <select-domain
            :selectId="application.id"
            @change="selectApplication"
          />
        </div>
      </div>
      <div class="ml-auto">
        <input class="px-2 py-1 text-primary bg-blue-200 rounded-md" @change="fetchDailyReport" type="month" :min="start_month" v-model="month" :max="month_now"> 
      </div>
    </div>

    <div class="" id="content" ref="content">
      <div class="flex flex-wrap mt-6">
        <div
          v-for="(b, i) in boxs"
          :key="`box-${i}`"
          class="w-full md:w-1/3 lg:w-1/4 p-2"
        >
          <div :class="`rounded-md overview-box-${i}`">
            <div class="p-4 flex items-center">
              <div
                class="w-10 h-10 bg-gray-200 text-center rounded-full bg-opacity-50"
              >
                <base-icon
                  :icon="b.icon"
                  color="white"
                  class="my-2"
                ></base-icon>
              </div>
              <div class="text-white text-sm ml-3">{{ b.title }}</div>
            </div>
            <div class="border-b border-gray-200 opacity-50"></div>
            <div class="px-4 py-2">
              <div class="text-4xl text-white">{{ b.count }}</div>
              <div class="text-sm text-white">{{ b.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- {{series_of_month}} -->

      <div class="py-10">
        <apexchart
          width="100%"
          height="400"
          type="bar"
          :options="options"
          :series="series"
        ></apexchart>
      </div>
    </div>

    <div class="mt-6 border border-gray-100 shadow-md rounded p-4">
      <div class="flex text-lg mb-4 items-center w-full">
        <div class="flex py-1">Report</div>
        <div class="flex px-4 items-center">
          <div class="px-2 text-sm">Size:</div>
          <base-dropdown :dropdownWidthFull="true">
            <div
              slot="toggle"
              class="flex items-center px-4 py-2 rounded-md border border-gray-500"
            >
              <div class="text-sm">{{ pageSize }}</div>
              <base-icon
                class="ml-5"
                icon="dropdown"
                width="10"
                height="10"
              ></base-icon>
            </div>
            <base-dropdown-item
              class="px-8"
              :class="
                pageSize == 50
                  ? 'bg-blue-200 text-blue-800'
                  : 'bg-gray-100 text-gray-500'
              "
              @click="changeSizeClick(50)"
              >50</base-dropdown-item
            >
            <base-dropdown-item
              class="px-8"
              :class="
                pageSize == 100
                  ? 'bg-blue-200 text-blue-800'
                  : 'bg-gray-100 text-gray-500'
              "
              @click="changeSizeClick(100)"
              >100</base-dropdown-item
            >
            <base-dropdown-item
              class="px-8"
              :class="
                pageSize == 200
                  ? 'bg-blue-200 text-blue-800'
                  : 'bg-gray-100 text-gray-500'
              "
              @click="changeSizeClick(200)"
              >200</base-dropdown-item
            >
          </base-dropdown>
        </div>
        <div class="flex px-4">
          <div class="text-sm py-2 pr-2">From:</div>
          <input
            type="date"
            v-model="fromDate"
            class="text-sm border border-gray-500 rounded-md px-2"
            @change="fetchReport"
            :min="min_date"
          />
        </div>
        <div class="flex px-4">
          <div class="text-sm py-2 pr-2">to:</div>
          <input
            type="date"
            v-model="toDate"
            class="text-sm border border-gray-500 rounded-md px-2"
            @change="fetchReport"
            :max="max_date"
          />
        </div>
        <div class="ml-auto items-center">
          <div class="flex justify-end">
            <base-dropdown :dropdownWidthFull="true">
              <div
                slot="toggle"
                class="flex items-center px-4 py-1 rounded-full border border-primary"
              >
                <div class="text-sm text-primary">Export</div>
              </div>
              <base-dropdown-item
                class="text-center text-green-500"
                @click="exportCSVClick()"
                >CSV</base-dropdown-item
              >
              <base-dropdown-item
                class="text-center text-red-600"
                @click="exportPDFClick()"
                >PDF</base-dropdown-item
              >
            </base-dropdown>
          </div>
          <!-- <div
            class="w-20 ml-auto cursor-pointer items-center text-center border rounded-full border-primary hover:bg-blue-200 hover:font-normal"
            @click="exportClick()"
          >
            <p class="font-light text-primary text-sm">Export</p>
          </div> -->
        </div>
      </div>
      <div class="table-custom text-sm">
        <table>
          <thead>
            <th id="index">#</th>
            <th id="time stamp" class="text-center">Timestamp</th>
            <th id="consent id">Consent ID</th>
            <th id="client id">Client ID</th>
            <th id="ip">IP</th>
            <th id="user agent">User Agent</th>
            <th id="consent type">Consent Type</th>
            <th id="ref">Ref. URL</th>
            <!-- <th>Action</th> -->
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="(item, i) in consent_logs" :key="i">
              <td>{{ i + 1 }}</td>
              <td class="text-center">
                {{ $model.getDateTime(item.updated_at) }}
              </td>
              <td class="break-all">{{ item.id }}</td>
              <td class="break-words">{{ item.client_id }}</td>
              <td>{{ item.ip_address }}</td>
              <td>
                <div class="break-words">{{ item.user_agent }}</div>
              </td>

              <td class="text-left break-words">
                <div v-if="item.type == 1">Accept All</div>
                <div v-else-if="item.type == 2">
                  Accept ({{ item.categories }})
                </div>
                <div v-else-if="item.type == 3">
                  Reconsent ({{ item.categories }})
                </div>
                <div v-else-if="item.type == 0">Decline All</div>
              </td>
              <td>
                <base-tooltip :label="item.url">
                  <div class="max-w-12-rem truncate">
                    {{ item.url }}
                  </div>
                </base-tooltip>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="more" class="text-center mt-5">
          <div
            class="px-2 py-2 border border-blue-200 w-20 rounded-md mx-auto cursor-pointer"
            @click="moreClick()"
          >
            more...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import PDF from '@/pdf/export_pdf.js'
import jsPDF from 'jspdf'
import domtoimage from "dom-to-image";
// import logo  from '@/assets/img/logo-becookies.png'
export default {
  middleware: 'auth',
  computed: {
    organization_id() {
      return this.$store.getters['organizations/getOrganizationId']
    },
    user() {
      return this.$store.getters['me/getUser']
    },
    // click_rate() {
    //   return this.application.pageViews != 0
    //     ? (this.application.acceptedCount / this.application.pageViews) * 100
    //     : '0%'
    // },
    response_rate() {
      let sum_res =
        this.application.acceptedCount +
        this.application.rejectedCount +
        this.application.partialAcceptedCount
      return this.application.pageViews != 0
        ? (sum_res / this.application.pageViews) * 100
        : '0%'
    },
    fecth_xaxis_categories() {
      return this.xaxis_categories.slice()
      // return
    },
    categories() {
      let list = this.$store.getters['category/getList']
      return list
    },
    boxs() {
      return [
        // {
        //   title: 'Page views',
        //   count: this.application.pageViews,
        //   label: 'Page Views Today',
        //   icon: 'eye',
        // },
        {
          title: 'Cookies',
          count: this.summary.cookie_counts,
          label: 'cookies',
          icon: 'cookie',
        },
        {
          title: 'Accepted',
          count: this.summary.accepted_count,
          label: 'accepted',
          icon: 'verified',
        },
        {
          title: 'Rejected',
          count: this.summary.rejected_count,
          label: 'rejected',
          icon: 'unsecure',
        },
      ]
    },
    min_date() {
      let now = new Date(this.toDate)
      let date = new Date().setDate(now.getDate() - 31)
      return this.$model.getDateInput(date)
    },
    max_date() {
      let now = new Date()
      let todate = new Date(this.toDate)

      if (now > todate) return this.$model.getDateInput(todate)
      else return this.$model.getDateInput(now)
    },
    month_now() {
      let now = new Date()
      return this.$model.getMonthInput(now)
    },
    xaxis_of_month() {
      console.log(this.month)
      let m = new Date(this.month).getUTCMonth() + 1
      let y = new Date(this.month).getFullYear()
      let num =  this.daysInMonth(m, y)
      let xaxis = []

      for (let i=0; i<num; i++) {
        xaxis.push(`${y}-${m < 10 ? `0${m}` : m}-${i < 9 ? `0${i+1}` : i+1 }`)
      }
      //  console.log(num)
      return xaxis
    }
  },
  data() {
    return {
      application: {},
      summary: {},
      pursose: [],

      consent_logs: [],
      pageSize: 50,
      more: null,
      fromDate: null,
      toDate: null,
      organization: {},
      max_date_filter: '',
      data_daily: [],
      options: {
        chart: {
          type: 'bar',
          height: 200,
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
          },
        },
        xaxis: {
          categories: [],
        },
        colors: ['#ff8886', '#f7c598', '#44dec5'],
      },
      series: [],
      xaxis_categories: [],
      start_month: '2021-05',
      month: ''
    }
  },
  async mounted() {
    this.$store.dispatch('loading/setLoading', true)
    let now = new Date()
    let from = new Date().setDate(now.getDate() - 31)

    this.fromDate = this.$model.getDateInput(from)
    this.toDate = this.$model.getDateInput(now)
    this.max_date_filter = this.$model.getDateInput(now)
    this.month = this.month_now
    this.options.xaxis.categories = this.xaxis_of_month
    // console.log(this.options.xaxis.categories)
    // .forEach(e => {
    //   this.options.xaxis.categories.push(e)
    // })

    // let m = new Date(this.month).getMonth()
    // let y = new Date(this.month).getFullYear()

    // let date = this.daysInMonth(m, y)
    // console.log(this.series_of_month)
    this.fetch()
    this.$store.dispatch('loading/setLoading', false)
  },
  methods: {
    async selectApplication(a) {
      this.application = a
      // localStorage.setItem('application', JSON.stringify(a))
      // let app = localStorage.getItem('application')
      // this.application = JSON.parse(app)
      await this.fetch()
      await this.fetchReport()
      await this.fetchDailyReport()
    },
    async fetch() {
      this.$store.dispatch('loading/setLoading', true)


      let params = {
        organization_id: this.organization_id,
        sortBy: 'updated_at',
      }

      await this.$store.dispatch('application/fetch', params)

      // let app = JSON.stringify(self.application)
      // localStorage.setItem('application', app)
      // let app = localStorage.getItem('application')
      // this.application = JSON.parse(app)

      if (this.applications) {
        this.application = this.applications[0]
        // let app = JSON.stringify(self.application)
        // localStorage.setItem('application', app)
      }

      this.pursose = []
      await this.$api.getSummary(this.application.id).then((response) => {
        this.summary = response.data
      })

      this.$store.dispatch('loading/setLoading', false)
    },

    async fetchReport() {
      this.$store.dispatch('loading/setLoading', true)

      let params = {
        size: this.pageSize,
        application_id: this.application.id,
      }
      await this.$store.dispatch('category/fetch', this.application.id)
      await this.$api.getConsentLogs(params).then((response) => {
        this.more =
          response.data.entities.length > 0
            ? response.data.page_information.next_page_id
            : ''
        var consent_logs = []
        if (Array.isArray(response.data.entities)) {
          response.data.entities.forEach((e) => {
            consent_logs.push({
              ...e,
            })
          })

          consent_logs.forEach((e, i) => {
            consent_logs[i].categories = ''
            if (e.allowed_category_ids != null) {
              e.allowed_category_ids.forEach((id, n) => {
                this.categories.forEach((c) => {
                  if (id == c.id) {
                    consent_logs[i].categories += `${c.title.en}${
                      e.allowed_category_ids.length > 1 &&
                      e.allowed_category_ids.length != n + 1
                        ? ', '
                        : ''
                    }`
                  }
                })
              })
            }
          })
        }
        this.consent_logs = consent_logs
      })

      this.$store.dispatch('loading/setLoading', false)
    },
    async fetchDailyReport() {
      let self = this
      this.$store.dispatch('loading/setLoading', true)
      let data = []
      if (self.series.length > 0) {
        self.series = []
        // for (let i=0; i<3; i++) {
        //   self.series[i].data = []
        // }
      }

      let params = {
        application_id: self.application.id,
        end_date: self.toDate,
        start_date: self.fromDate,
      }

      await self.$api
        .getConsentLogsDailyReport(params)
        .then((response) => {
          data = response.data
        })
        .catch((error) => {})
      if (data.length == 0) {
        this.$store.dispatch('loading/setLoading', false)
        return
      }

      let categories = []
      let data_accept = []
      let data_reject = []
      let data_reconsent = []

      let res = []

      await self.xaxis_of_month.forEach(async(x, i) => {
        // categories.push(self.$model.getDateAndMonth(x))
        res.push({
          id: x,
          data_reject: 0,
          data_reconsent: 0,
          data_accept: 0
        })
      })

      await res.forEach(async e => {
        await data.forEach(d => {
          if (d.id == e.id) {
            e.data_reject = d.none_count
            e.data_reconsent = d.change_to_partial_count + d.change_to_all_count
            e.data_accept = d.partial_count + d.full_count
          }
        })
      })

      // console.log(res)

      await res.forEach((e, i) => {
        data_accept.push(e.data_accept)
        data_reconsent.push(e.data_reconsent)
        data_reject.push(e.data_reject)
      })

      self.series.push({
        name: 'reject',
        data: data_reject,
      })
      self.series.push({
        name: 'reconsent',
        data: data_reconsent,
      })
      self.series.push({
        name: 'accept',
        data: data_accept,
      })

      // console.log(self.series)

      this.$store.dispatch('loading/setLoading', false)
    },
    exportCSVClick() {
      let self = this
      const rows = []
      const header = [
        'create_at',
        'client_id',
        'consent_id',
        'ip_address',
        'user_agent',
        'consent_type',
        'URL',
      ]
      rows.push(header)

      self.consent_logs.forEach((e) => {
        let type = ''
        if (e.type == 0) type = 'Reject'
        else if (e.type == 1) type = 'Accept All'
        else if (e.type == 2) type = 'Partial'
        else if (e.type == 3) type = 'Recosent'
        const row = [
          e.created_at,
          e.client_id,
          e.consent_id,
          e.ip_address,
          e.user_agent.replaceAll(',', ';'),
          type,
          // e.allowed_category_ids.replaceAll(',', '/'),
          e.url,
        ]
        rows.push(row)
      })

      var csvContent = rows.map((e) => e.join(',')).join('\n')

      let blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csvContent], {
        type: 'text/plain;charset=utf-8',
      })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `becookeis-report-${self.application.domain_name}-export.csv`
      )
      document.body.appendChild(link)
      link.click()
    },
    exportPDFClick() {
      // const doc = new jsPDF('l', 'pt', 'a4')
      let domain_name = this.application.domain_name
      const date = new Date();
      let now = this.$model.getDateInput(date)
      let fromDate = this.$model.getDate(this.fromDate)
      let toDate = this.$model.getDate(this.toDate)
      var logo = 'data:image/jpeg;base64,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';
      // console.log(imgData)

      // return

      domtoimage.toPng(this.$refs.content)
        .then(function(dataUrl) {
          var img = new Image()
          img.src = dataUrl
          // var logo = new Image()
          // logo.src = './assets/img/logo-becookies.png'
          const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: 'a4'
          })

          doc.addImage(logo, 'png', 45, 35, 139, 20)

          doc.setFontSize(16)
          doc.text(`Report Consent Log`, 370, 40)

          doc.setFontSize(12)
          doc.text(`Domain name: ${domain_name}`, 50, 80)
          doc.text(`From date: ${fromDate}`, 50, 100)
          doc.text(`To date: ${toDate}`, 50, 120)

          doc.addImage(img, "JPEG", 20, 110, 802, 490)
          const filename =
            domain_name +
            '-report-' +
            now +
            ".pdf";
          doc.save(filename);
          // doc.output('dataurlnewwindow')
        })
        .catch(function(error) {
          console.error("oops, something went wrong!", error);
        });
      // let data = {
      //   title: `report_consent_logs`,
      //   title_text: `Report Consent Logs`
      // }

      // PDF.exportPDFReport(data)
    },
    changeSizeClick(size) {
      this.pageSize = size
      this.fetchReport()
    },
    async moreClick() {
      let params = {
        size: 2,
        nextPageID: this.more,
        application_id: this.application.id,
        // toDate: this.toDate ? new Date(this.toDate).setUTCHours(24) : null,
        // fromDate: this.fromDate
        //   ? new Date(this.fromDate).setUTCHours(24)
        //   : null,
      }
      await this.$api.getConsents(params).then((response) => {
        if (response.data.nextToken) this.more = response.data.nextToken
        else this.more = null
        //  this.more = response.data.nextToken
        var consent_logs = []
        if (Array.isArray(response.data.entities)) {
          response.data.entities.forEach((e) => {
            this.consent_logs.push({
              ...e,
              // CDNFingerprint: JSON.parse(e.CDNFingerprint),
              // fingerprint: JSON.parse(e.fingerprint),
            })
          })
        }
        // this.consent_logs.push(consent_logs)
      })
    },
    selectToDate() {
      // this.toDate = this.$model.getFormatISO(this.toDate)
      this.fetchReport()
    },
    daysInMonth(m, y) {
      let date = new Date(y, m, 0).getDate()

      return date
    }
  },
}
</script>

<style>
.overview-box-0 {
  box-shadow: 0px 5px 20px 2px rgba(100, 83, 255, 0.2);
  background-image: linear-gradient(303deg, #0e64c6, #3794fc);
}
.overview-box-1 {
  box-shadow: 0px 5px 20px 2px rgba(255, 94, 83, 0.2);
  background-image: linear-gradient(122deg, #44dec5, #4ebcfa);
}
.overview-box-2 {
  box-shadow: 0px 5px 20px 2px rgba(83, 215, 255, 0.2);
  background-image: linear-gradient(299deg, #f7c598, #ff8886);
}
.overview-box-3 {
  box-shadow: 0px 12px 20px 2px rgba(230, 43, 255, 0.2);
  background-image: linear-gradient(125deg, #f9b4bd, #9573db);
}
.box-shadow {
  box-shadow: 2px 5px 20px 2px rgba(110, 110, 110, 0.1);
}
.user-agent {
  width: 300px;
  word-break: break-all;
}
.widthUser {
  width: 500px;
  word-break: break-all;
}
</style>
