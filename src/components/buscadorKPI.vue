<template>
   <v-select
      v-model="select"
      :items="entries"
      :item-text="'kpi'"
      menu-props="kpi"
      label="KPI"
      hide-details
      prepend-icon="mdi-cloud-search"
      single-line
      return-object
    ></v-select>
</template>

<script>
const axios = require('axios')
export default {
  data: () => ({
    entries: [],
    select: null
  }),

  watch: {
    select (val) {
      this.$store.commit('selectKpi', val)
    }
  },
  created () {
    this.search()
  },
  methods: {
    remove () {
      this.model = ''
      this.$store.commit('selectKpi', '')
    },
    search () {
      axios.get('https://xu7cyyauhe.execute-api.us-east-1.amazonaws.com/web/perfiles', {
        params: {
          file: this.$store.state.area
        }
      },
      {
        header: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-key,X-Amz-Security-Token',
          'x-api-key': 'mrxZckPp6Z6Pjtu2vv9ni3u5rLKZ2lIN5SSmXw43'
        }
      })
        .then(response => {
          this.count = response.data.lista.count
          this.entries = response.data.lista.entries
        }).catch(function (error) {
          console.log(error)
        })
    }
  }
}

</script>
