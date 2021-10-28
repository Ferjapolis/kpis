<template>
  <v-container>
    <v-row align="center" justify="center">
      <template v-for="(item, k) in lista">
        <v-card :key="k" width="200" height="120" class="ma-3" :disabled="item.disabled" >
          <v-card-title>
            <span class="text-h5">{{ item.name }}</span>
          </v-card-title>
          <v-card-actions>
             <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon @click="ver(item.name)" v-bind="attrs" v-on="on"><v-icon>mdi-table</v-icon></v-btn>
                </template>
                <span>Listado de KPIs</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon @click="editar(item.name)" v-bind="attrs" v-on="on"><v-icon>mdi-pencil</v-icon></v-btn>
                </template>
                <span>Editar KPI</span>
              </v-tooltip>
          </v-card-actions>
        </v-card>
      </template>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    lista: [
      {
        name: 'Zalt Ext',
        disabled: false
      }, {
        name: 'BFT',
        disabled: false
      }, {
        name: 'DRY',
        disabled: false
      }, {
        name: 'PACK',
        disabled: false
      }, {
        name: 'HSE',
        disabled: false
      }
    ]
  }),
  created () {
    this.$store.commit('selectArea', '')
  },
  methods: {
    editar (area) {
      this.$router.push({ path: '/editkpi' })
      this.$store.commit('selectArea', area)
    },
    ver (area) {
      this.$router.push({ path: '/detalle' })
      this.$store.commit('selectArea', area)
    }
  }
}
</script>
