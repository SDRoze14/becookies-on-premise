<template>
  <div class="h-full">
    <div class="flex mx-5">
      <div class="px-2 sm:px-5 py-10 w-full bg-white mb-8 rounded-lg">
        <div class="text-2xl text-center font-medium mb-5 whitespace-pre-wrap">{{$t('policy_data.title')}}</div>

        <div class="my-3 font-thin" v-if="$t('lang') == 'en'">{{$t('policy_data.description.welcome')}}</div>
        <div class="my-3 font-thin">&emsp;&emsp;&emsp;{{$t('policy_data.description.text')}}</div>

        <div class="mt-5 mb-3 text-lg">{{$t('policy_data.definitions.title')}}</div>
        <div class="my-3 font-thin">{{$t('policy_data.definitions.text1')}}</div>
        <div class="my-3 font-thin">{{$t('policy_data.definitions.text2')}}</div>
        <div class="my-3 font-thin">{{$t('policy_data.definitions.text3')}}</div>
        <div class="my-3 font-thin">{{$t('policy_data.definitions.text4')}}</div>

        <div class="mt-5 text-lg">{{$t('policy_data.how_to_collect.title')}}</div>
        <div class="my-3 font-thin">&emsp;&emsp;&emsp;{{$t('policy_data.how_to_collect.description.top')}}</div>
        
        <div class="my-3 font-thin ml-10">{{$t('policy_data.how_to_collect.description.text1')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.how_to_collect.description.text2')}}</div>
        <div class="my-3 font-thin">{{$t('policy_data.how_to_collect.description.mid')}}</div>

        <div class="my-3 font-thin ml-10"><span class="font-normal">{{$t('policy_data.how_to_collect.description.sub1.head')}}</span> {{$t('policy_data.how_to_collect.description.sub1.content')}}</div>
        <div class="my-3 font-thin ml-10"><span class="font-normal">{{$t('policy_data.how_to_collect.description.sub2.head')}}</span> {{$t('policy_data.how_to_collect.description.sub2.content')}}</div>
        <div class="my-3 font-thin ml-10"><span class="font-normal">{{$t('policy_data.how_to_collect.description.sub3.head')}}</span> {{$t('policy_data.how_to_collect.description.sub3.content')}}</div>
        <div class="my-3 font-thin ml-10"><span class="font-normal">{{$t('policy_data.how_to_collect.description.sub4.head')}}</span> {{$t('policy_data.how_to_collect.description.sub4.content')}}</div>
        <div class="my-3 font-thin ml-10"><span class="font-normal">{{$t('policy_data.how_to_collect.description.sub5.head')}}</span> {{$t('policy_data.how_to_collect.description.sub5.content')}}</div>

        <div class="py-3 font-thin">&emsp;&emsp;&emsp;{{$t('policy_data.how_to_collect.description.buttom')}}</div>
      
        <div class="mt-5 text-lg">{{$t('policy_data.purposes.title')}}</div>
        <div class="py-3 font-thin">&emsp;&emsp;&emsp;{{$t('policy_data.purposes.description')}}</div>
      
        <div class="table-border">
          <table class="w-full">
            <thead>
              <th class="font-medium w-1/3">{{$t('policy_data.purposes.table.head1')}}</th>
              <th class="font-medium w-1/3">{{$t('policy_data.purposes.table.head2')}}</th>
              <th class="font-medium w-1/3">{{$t('policy_data.purposes.table.head3')}}</th>
            </thead>
            <tbody>
              <tr>
                <td class="font-thin px-2 whitespace-pre-wrap">{{$t('policy_data.purposes.table.body_row1.col1')}}</td>
                <td class="font-thin px-2 whitespace-pre-wrap">{{$t('policy_data.purposes.table.body_row1.col2')}}</td>
                <td class="font-thin px-2 whitespace-pre-wrap">{{$t('policy_data.purposes.table.body_row1.col3')}}</td>
              </tr>
              <tr>
                <td class="font-thin px-2 whitespace-pre-wrap">{{$t('policy_data.purposes.table.body_row2.col1')}}</td>
                <td class="font-thin px-2 whitespace-pre-wrap">{{$t('policy_data.purposes.table.body_row2.col2')}}</td>
                <td class="font-thin px-2 whitespace-pre-wrap">{{$t('policy_data.purposes.table.body_row2.col3')}}</td>
              </tr>
              <tr>
                <td class="font-thin px-2 whitespace-pre-wrap">{{$t('policy_data.purposes.table.body_row3.col1')}}</td>
                <td class="font-thin px-2 whitespace-pre-wrap">{{$t('policy_data.purposes.table.body_row3.col2')}}</td>
                <td class="font-thin px-2 whitespace-pre-wrap">{{$t('policy_data.purposes.table.body_row3.col3')}}</td>
              </tr>
              <tr>
                <td class="font-thin px-2 whitespace-pre-wrap">{{$t('policy_data.purposes.table.body_row4.col1')}}</td>
                <td colspan="2" class="font-thin px-2 whitespace-pre-wrap">{{$t('policy_data.purposes.table.body_row4.col2')}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-5 text-lg">{{$t('policy_data.disclosure.title')}}</div>
        <div class="py-3 font-thin">&emsp;&emsp;&emsp;{{$t('policy_data.disclosure.desc1')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.disclosure.text1')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.disclosure.text2')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.disclosure.text3')}}</div>
        <div class="py-3 font-thin">&emsp;&emsp;&emsp;{{$t('policy_data.disclosure.desc2')}}</div>
      
        <div class="mt-5 text-lg">{{$t('policy_data.data_retentions.title')}}</div>
        <div class="py-3 font-thin">&emsp;&emsp;&emsp;{{$t('policy_data.data_retentions.desc1')}}</div>
        <div class="py-3 font-thin">&emsp;&emsp;&emsp;{{$t('policy_data.data_retentions.desc2')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.data_retentions.text1')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.data_retentions.text2')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.data_retentions.text3')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.data_retentions.text4')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.data_retentions.text5')}}</div>

        <div class="mt-5 text-lg">{{$t('policy_data.exercise.title')}}</div>
        <div class="py-3 font-thin">&emsp;&emsp;&emsp;{{$t('policy_data.exercise.desc1')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.exercise.text1')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.exercise.text2')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.exercise.text3')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.exercise.text4')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.exercise.text5')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.exercise.text6')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.exercise.text7')}}</div>
        <div class="my-3 font-thin ml-10">{{$t('policy_data.exercise.text8')}}</div>
        <div class="py-3 font-thin">&emsp;&emsp;&emsp;{{$t('policy_data.exercise.desc2')}}</div>

        <div class="mt-5 text-lg">{{$t('policy_data.security.title')}}</div>
        <div class="py-3 font-thin">&emsp;&emsp;&emsp;{{$t('policy_data.security.dexc')}}</div>

        <div class="mt-5 text-lg">{{$t('policy_data.changes.title')}}</div>
        <div class="py-3 font-thin">&emsp;&emsp;&emsp;{{$t('policy_data.changes.desc')}}</div>

        <div class="mt-5 text-lg">{{$t('policy_data.contact.title')}}</div>
        <div class="py-3 font-thin">&emsp;&emsp;&emsp;{{$t('policy_data.contact.desc')}}</div>

        <div class="">{{$t('policy_data.email')}}</div>
        <div class="">{{$t('policy_data.phone')}}</div>
        <div class="">{{$t('policy_data.att')}}</div>
        <div class="">{{$t('policy_data.address')}}</div>
        <div class="pt-8">{{$t('policy_data.end')}}</div>


      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  methods: {
    termClick() {
      this.$router.push('/terms')
    },
    backHomeClick() {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.table-border table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
  vertical-align: top;
}
</style>