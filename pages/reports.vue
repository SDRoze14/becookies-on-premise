<template>
  <div>
    <div class="flex item-center p-2">
      <div class="text-xl mr-6">Reports</div>

      <div class="flex w-64">
        <select-domain
          :selectId="application.applicationId"
          @change="selectApplication"
        />
      </div>

      <base-button color="border-green" class="ml-auto">
        Export
        <base-icon width="22" height="20" class="ml-4" icon="excel"></base-icon>
      </base-button>
    </div>

    <div class="rounded-lg bg-white p-4">
      <div class="table-custom">
        <table>
          <thead>
            <tr>
              <th id="ref no" class="th-left">Ref. No</th>
              <th id="ip address">IP Address</th>
              <th id="timestamp">Timestamp</th>
              <th id="type">Type</th>
              <th id="action">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in consent_logs" :key="i">
              <td>{{ item.clientId }}</td>
              <td class="text-center">{{ item.src.ipAddress }}</td>
              <td class="text-center">
                {{ $model.getDateTime(item.createdAt) }}
              </td>
              <td class="text-center">{{ item.actionDetail.consentType }}</td>
              <td class="text-center">{{ item.action }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      application: {},
      consent_logs: [],
      months: [
        { text: 'January', value: 1 },
        { text: 'February', value: 2 },
        { text: 'March', value: 3 },
        { text: 'April', value: 4 },
        { text: 'May', value: 5 },
        { text: 'June', value: 6 },
        { text: 'July', value: 7 },
        { text: 'August', value: 8 },
        { text: 'September', value: 9 },
        { text: 'October', value: 10 },
        { text: 'November', value: 11 },
        { text: 'December', value: 12 },
      ],
      month: {},
      today: new Date(),
    }
  },
  computed: {
    applications() {
      return this.$store.getters['application/getList']
    },
  },
  async mounted() {
    this.$store.dispatch('loading/setLoading', true)
    await this.$store.dispatch('application/fetch')
    if (this.applications) {
      this.application = this.applications[0]
    }
    this.$store.dispatch('loading/setLoading', false)

    this.month = this.months[this.today.getMonth()]

    this.fetch()
  },
  methods: {
    async fetch() {
      await this.$api
        .getListConsentByApplicationsID(this.application.applicationId)
        .then((response) => {
          // this.consent_logs = response.data
          response.data.forEach((e) => {
            this.consent_logs.push({
              CDNFingerprint: JSON.parse(e.CDNFingerprint),
              actionDetail: JSON.parse(e.actionDetail),
              consentId: e.consentId,
              logId: e.logId,
              createdAt: e.createdAt,
              fingerprint: JSON.parse(e.fingerprint),
              clientId: e.clientId,
              applicationId: e.applicationId,
              src: JSON.parse(e.src),
              action: e.action,
            })
          })
        })
    },
    selectApplication(a) {
      this.application = a
      this.fetch()
    },
    selectMonthClick(a) {
      this.month = a
    },
  },
}
</script>