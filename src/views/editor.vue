<template>
  <v-container id="edit-kpi-container">
    <v-row class="edit-kpi-title">
      <v-col cols="4">
        <v-btn @click="volver" icon><v-icon>mdi-arrow-left</v-icon></v-btn>
      </v-col>
      <v-col cols="8"><h2>{{$store.state.area}}</h2></v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="3">
        <selectorkpi />
      </v-col>
      <v-col cols="3">
        <h4 class="pt-6">Owner: {{kpi.owner}}</h4>
      </v-col>
      <v-spacer></v-spacer>
      <v-btn>Edit</v-btn>
    </v-row>
    <v-row justify="center" id="edit-kpi-section">
      <v-col cols="4" id="edit-kpi-tabla-kpi-container" style="border-color: #939cff">
        <Form />
      </v-col>
      <v-col cols="3" id="edit-kpi-kpis-container">
        <div class="pb-3 kpi">
          <v-card class="my-auto ma-3" width="150" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-1">
                  YTD <b>({{this.kpi.calc_ytd}})</b>
                </div>
                <v-list-item-title class="text-h3 mb-1">
                   {{ytd}}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </div>
        <div class="pb-3 kpi">
        <v-card class="my-auto ma-3" width="150" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-1">
                FSCT <b>({{this.kpi.calc_ytd}})</b>
              </div>
              <v-list-item-title class="text-h3 mb-1">
                {{fsct}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        </div>
        <div class="pb-2 kpi">
        <v-card class="my-auto ma-3" width="150" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-1">
                Regla
              </div>
              <v-list-item-title class="text-h3 mb-1">
                {{this.kpi.rule}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        </div>
      </v-col>
      <v-col cols="5" id="edit-kpi-chart-container">
        <Chart/>
         <h5 class="pt-6">last update: {{kpi.update}}</h5>
      </v-col>
    </v-row>
     <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import Form from '../components/tablaKPI.vue'
import selectorkpi from '../components/buscadorKPI.vue'
import Chart from '../components/barras.vue'

export default {
  name: 'editor',
  components: {
    Form,
    selectorkpi,
    Chart
  },
  data: () => ({
    dialog: false,
    snack: false,
    snackColor: '',
    snackText: '',
    kpi: {},
    datos: [],
    fsct: 0,
    ytd: 0
  }),
  watch: {
    '$store.state.kpi': function () {
      this.kpi = this.$store.state.kpi
      this.datos = this.$store.state.datos
    },
    '$store.state.guardado': function () {
      this.save()
      this.$store.commit('estado', false)
    },
    '$store.state.datos': function (val) {
      this.calculo2(val)
    }
  },
  methods: {
    volver () {
      this.$router.push({ path: '/' })
    },
    save () {
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Data saved'
    },
    calculo2 (val) {
      var valor = 0
      var target = 0
      if (this.kpi.calc_ytd === 'Max') {
        for (var max of val) {
          if (parseInt(max.valor) > valor) {
            valor = parseInt(max.valor)
          }
        }
      }
      if (this.kpi.calc_ytd === 'Min') {
        for (var min of val) {
          if (min === val[0]) {
            valor = val[0].valor
          }
          if (parseInt(min.valor) < valor) {
            valor = parseInt(min.valor)
          }
        }
      }
      if (this.kpi.calc_ytd === 'Avg') {
        var total = 0
        var limit = 1
        for (var avg of val) {
          if (parseInt(avg.valor) > 0) {
            total = total + parseInt(avg.valor)
            limit = limit + 1
          }
        }
        valor = total / limit
      }
      if (this.kpi.calc_ytd === 'Acum') {
        for (var acum of val) {
          if (parseInt(acum.valor) > 0) {
            valor = valor + parseInt(acum.valor)
          }
        }
      }
      this.fsct = target
      this.ytd = valor
    }
  }
}

</script>
