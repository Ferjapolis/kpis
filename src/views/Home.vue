<template>
  <div class="d-flex" v-bind:style="{ height: '100%', background: 'linear-gradient(56deg, rgb(159 247 156 / 80%) 0%, rgb(132 206 249 / 89%) 35%, rgb(138 237 164 / 75%) 100%)' }">
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
          <v-card v-for="n in [3,4]" :key="n" class="style-card d-flex flex-column justify-center align-center ma-1" :disabled="lista[n].disabled" v-bind:style="lista[n].style">
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
          backgroundColor: '#b59cc9'
        }
      }, {
        name: 'BFT',
        disabled: false,
        style: {
          height: '70%',
          backgroundColor: '#eb537d'
        }
      }, {
        name: 'DRY',
        disabled: false,
        style: {
          height: '30%',
          backgroundColor: '#aff5b5'
        }
      }, {
        name: 'PACK',
        disabled: false,
        style: {
          height: '30%',
          backgroundColor: '#1fc3f7'
        }
      }, {
        name: 'HSE',
        disabled: false,
        style: {
          height: '70%',
          backgroundColor: '#6abc66'
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
