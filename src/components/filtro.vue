<template>
  <v-autocomplete v-model="model" :items="items" :loading="isLoading" :search-input.sync="search" color="white"
    hide-no-data hide-selected item-text="kpi" item-value="kpi" label="Public KPIs"
    placeholder="Buscar KPI activos" prepend-icon="mdi-database-search" return-object></v-autocomplete>
</template>

<script>
const axios = require('axios')
export default {
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null
  }),

  computed: {
    fields () {
      if (!this.model) return []

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || 'n/a'
        }
      })
    },
    items () {
      return this.entries.map(entry => {
        const Description = entry.pilar.length > this.descriptionLimit
          ? entry.pilar.slice(0, this.descriptionLimit) + '...'
          : entry.pilar

        return Object.assign({}, entry, {
          Description
        })
      })
    }
  },

  watch: {
    search () {
      // Items have already been loaded
      if (this.items.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true
      axios.get('http://192.168.0.127:5000/kpis', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        }
      })
        .then(response => {
          this.count = response.data.lista.count
          this.entries = response.data.lista.entries
          this.isLoading = false
        }).catch(function (error) {
          console.log(error)
        })
    },
    model (val) {
      this.$store.commit('selectKpi', val)
    }
  }
}

</script>
