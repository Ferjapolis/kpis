<template>
  <div class="d-flex" v-bind:style="{ height: '100%', background: 'linear-gradient(56deg, rgb(2 0 36 / 80%) 0%, rgba(16,56,79,0.8911939775910365) 35%, rgb(0 188 255 / 75%) 100%)' }">
    <v-container class="align-self-center container-fluid" style="height:60%">
      <v-row align="center" justify="center" class="d-flex flex-row flex-wrap justify-content-center" style="height:100%">
        <v-column class="d-flex flex-column col-4 pa-0" style="height: 100%">
          <v-card v-for="n in [0]" :key="n" class="style-card d-flex flex-column justify-center align-center ma-1" :disabled="lista[n].disabled" v-bind:style="lista[n].style">
            <v-card-title>
                <span class="text-h5 card-text-style">{{ lista[n].name }}</span>
            </v-card-title>
            <v-card-actions>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon @click="ver(lista[n].name)" v-bind="attrs" v-on="on"><v-icon>mdi-table</v-icon></v-btn>
                </template>
                <span>Listado de KPIs</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon @click="editar(lista[n].name)" v-bind="attrs" v-on="on"><v-icon>mdi-pencil</v-icon></v-btn>
                </template>
                <span>Editar KPI</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-column>
        <v-column class="d-flex flex-column col-4 pa-0" style="height: 100%">
          <v-card v-for="n in [1,2]" :key="n" class="style-card d-flex flex-column justify-center align-center ma-1" :disabled="lista[n].disabled" v-bind:style="lista[n].style">
            <v-card-title>
                <span class="text-h5 card-text-style">{{ lista[n].name }}</span>
            </v-card-title>
            <v-card-actions>
              <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="ver(lista[n].name)" v-bind="attrs" v-on="on"><v-icon>mdi-table</v-icon></v-btn>
                  </template>
                  <span>Listado de KPIs</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="editar(lista[n].name)" v-bind="attrs" v-on="on"><v-icon>mdi-pencil</v-icon></v-btn>
                  </template>
                  <span>Editar KPI</span>
                </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-column>
        <v-column class="d-flex flex-column col-4 pa-0" style="height: 100%">
          <v-card v-for="n in [3,4]" :key="n" class="style-card d-flex flex-column justify-center align-center ma-1 kpi-home-card" :disabled="lista[n].disabled" v-bind:style="lista[n].style">
            <v-card-title>
                <span class="text-h5 card-text-style">{{ lista[n].name }}</span>
            </v-card-title>
            <v-card-actions>
              <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="ver(lista[n].name)" v-bind="attrs" v-on="on"><v-icon>mdi-table</v-icon></v-btn>
                  </template>
                  <span>Listado de KPIs</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="editar(lista[n].name);" v-bind="attrs" v-on="on"><v-icon>mdi-pencil</v-icon></v-btn>
                  </template>
                  <span>Editar KPI</span>
                </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-column>
      </v-row>
    </v-container>
  </div>
</template>
<script>

export default {
  name: 'Home',
  data: () => ({
    lista: [
      {
        name: 'Zalt Ext',
        disabled: false,
        style: {
          height: '100%',
          borderColor: '#FFCC01'
        }
      }, {
        name: 'BFT',
        disabled: false,
        style: {
          height: '70%',
          borderColor: '#FF3062'
        }
      }, {
        name: 'DRY',
        disabled: false,
        style: {
          height: '30%',
          borderColor: '#99D3F2'
        }
      }, {
        name: 'PACK',
        disabled: false,
        style: {
          height: '30%',
          borderColor: '#00BCFF'
        }
      }, {
        name: 'HSE',
        disabled: false,
        style: {
          height: '70%',
          borderColor: '#5EB346'
        }
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
