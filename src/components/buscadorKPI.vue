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
      axios.get('http://192.168.0.127:5000/kpis', {
        params: {
          area: this.$store.state.area
        }
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
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
