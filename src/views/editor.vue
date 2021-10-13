<template>
  <v-container>
    <v-row>
      <v-col cols="1">
        <v-btn @click="volver" icon><v-icon>mdi-arrow-left</v-icon></v-btn>
      </v-col>
      <v-col cols="2"><h2>{{$store.state.area}}</h2></v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="3">
        <selectorkpi />
      </v-col>
      <v-col cols="3">
        <h4 class="pt-6">Owner: {{kpi.owner}}</h4>
      </v-col>
      <v-col cols="3">
         <h5 class="pt-6">last update: {{kpi.update}}</h5>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <Form />
      </v-col>
      <v-col cols="3">
        <div class="pb-3">
          <v-card class="my-auto ma-3" width="150" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-1">
                  YTD <b>({{this.kpi.calc_ytd}})</b>
                </div>
                <v-list-item-title class="text-h3 mb-1">
                   0
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </div>
        <div class="pb-3">
        <v-card class="my-auto ma-3" width="150" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-1">
                FSCT <b>({{this.kpi.calc_fsct}})</b>
              </div>
              <v-list-item-title class="text-h3 mb-1">
                0
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        </div>
        <div class="pb-3">
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
      <v-col cols="5">
        <Chart :options="chartOptions"></Chart>
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
    chartOptions: {
      series: [{
        data: [1, 2, 3] // sample data
      }]
    }
  }),
  watch: {
    '$store.state.kpi': function () {
      this.kpi = this.$store.state.kpi
      this.datos = this.$store.state.datos
    },
    '$store.state.guardado': function () {
      this.save()
      this.$store.commit('estado', false)
    }
  },
  computed: {
    regularComputed () {
      return this.calculo2()
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
    calculo2 () {
      var valor = 0
      if (this.kpi.calc_ytd === 'Max') {
        var findTop = []
        this.datos.forEach(obj => findTop.push(obj.valor))
        console.log(findTop)
        return Math.max(...findTop)
      }
      if (this.kpi.calc_ytd === 'Min') {
        return valor
      }
      if (this.kpi.calc_ytd === 'Avg') {
        return valor
      }
      if (this.kpi.calc_ytd === 'Acum') {
        return valor
      } else {
        return valor
      }
    }
  }
}

</script>
