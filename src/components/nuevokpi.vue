<template>
<v-dialog v-model="dialog"
        transition="dialog-bottom-transition"
        fullscreen
        hide-overlay>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="blue darknes-1" dark v-bind="attrs" v-on="on">
            Nuevo KPI
          </v-btn>
        </template>
    <v-card>
      <v-card-title>
         <v-toolbar
            dense
            dark
            color="primary"
          >
            <v-btn
              icon
              dark
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Registrar Nuevo KPI</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>

        <v-btn @click="reset" icon>
          <v-icon>mdi-reload</v-icon>
        </v-btn>
        <v-btn :disabled="!valid" @click="validate" icon>
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
            </v-toolbar-items>
          </v-toolbar>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="3">

          <v-select v-model="edit.pilar" :items="items" :rules="[v => !!v || 'Pilar is required']" label="Pilar"
            required>
          </v-select>

          <v-text-field v-model="edit.kpi" :rules="nameRules" label="KPI" required></v-text-field>
          <v-text-field v-model="edit.owner" :rules="nameRules" label="Owner" required></v-text-field>

          <v-select v-model="edit.calc_ytd" :items="calc" :rules="[v => !!v || 'Calc is required']" label="Tipo de calculo"
            required>
          </v-select>

          <v-select v-model="edit.rule" :items="rule" :rules="[v => !!v || 'Type is required']" label="Tipo de Regla"
            required>
          </v-select>
          <v-select v-model="edit.datatype" :items="datatype" :rules="[v => !!v || 'Type is required']" label="Tipo de dato"
            required>
          </v-select>
          <v-select v-model="edit.chart" :items="charts" :rules="[v => !!v || 'Type is required']" label="Tipo de gráfico"
            required>
          </v-select>
            </v-col>
            <v-col cols="3">
               <div  class="pt-14">
                <v-row>
                    <v-col cols="5"><h5 class="text-center" >Mes</h5></v-col>
                    <v-col cols="3"><h5 class="text-center" >Valor</h5></v-col>
                    <v-col cols="3"><h5 class="text-center" >Target</h5></v-col>
                </v-row>
                <v-row v-for="(mes, k) in desserts" :key="k">
                  <v-col cols="5" justify="right"><h4 class="pl-4 text-right pr-4">{{mes.name}}</h4></v-col>
                    <v-divider vertical></v-divider>
                  <v-col cols="3"><v-text-field class="text-center" dense v-model="desserts[k].valor" label=""></v-text-field></v-col>
                    <v-divider vertical></v-divider>
                  <v-col cols="3"> <v-text-field class="text-center" @change="targets(k)" @keyup.down="forcetargets(k)" dense v-model="desserts[k].target" label=""></v-text-field></v-col>
                    <v-divider vertical></v-divider>
                </v-row>
              </div>
            </v-col>
            <v-col cols="5">
               <div>
                <highcharts class="pt-15" :options="chartOptions" ref="chart"></highcharts>
              </div>
            </v-col>
          </v-row>

        </v-form>
      </v-card-text>
    </v-card>

      </v-dialog>
</template>

<style scoped>
.row {
  height: 30px;
}
.row .col {
  margin: 0px;
  padding: 0px;
}
</style>

<script>
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
const axios = require('axios')
exportingInit(Highcharts)

export default {
  name: 'nuevo',
  data: () => ({
    valid: true,
    dialog: false,
    name: '',
    nameRules: [
      v => !!v || 'Name is required'
    ],
    select: null,
    items: [
      'People',
      'Sustainability',
      'Value & Efficient',
      'Digital & Innovation',
      'Customer Experient'
    ],
    calc: [
      'Max',
      'Min',
      'Avg',
      'Acum'
    ],
    meses: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    rule: [
      '<',
      '<=',
      '>',
      '>=',
      '==',
      '!=',
      'None'
    ],
    datatype: [
      '$',
      '%',
      '#',
      '#.#',
      'None'
    ],
    charts: [
      'line',
      'circle',
      'bar'
    ],
    checkbox: false,
    edit: {
      area: '',
      pilar: '',
      kpi: '',
      calc: '',
      calc_ytd: '',
      rule: '',
      datatype: '',
      chart: '',
      stat: 'enabled',
      owner: '',
      update: ''
    },
    editBak: {
      area: '',
      pilar: '',
      kpi: '',
      calc: '',
      calc_ytd: '',
      rule: '',
      datatype: '',
      chart: '',
      stat: '',
      owner: '',
      update: ''
    },
    desserts: [],
    chartOptions: {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Year'
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      series: [{
        name: 'Mes',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

      }, {
        name: 'Target',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }]
    }
  }),
  created () {
    this.crearYear()
  },
  updated () {
    this.valor()
  },
  methods: {
    valor () {
      var valor = []
      var target = []
      for (var item in this.desserts) {
        valor.push(parseFloat(this.desserts[item].valor))
        target.push(parseFloat(this.desserts[item].target))
      }
      this.chartOptions.series[0].data = valor
      this.chartOptions.series[1].data = target
    },
    targets (index) {
      for (var item in this.desserts) {
        if (item > index) {
          if (this.desserts[item].target == null) {
            this.desserts[item].target = this.desserts[index].target
          }
        }
      }
    },
    forcetargets (index) {
      for (var item in this.desserts) {
        if (item > index) {
          this.desserts[item].target = this.desserts[index].target
        }
      }
    },
    validate () {
      this.save()
      console.log(this.desserts)
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    save () {
      if (this.valid) {
        if (this.edit.pilar != null & this.edit.kpi !== '') {
          this.edit.area = this.$store.state.area
          axios.post('http://192.168.0.127:5000/kpis', this.edit, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            }
          })
            .then(response => {
              this.kpidatos(this.edit.kpi)
              this.dialog = false
              this.edit = Object.assign({}, this.editBak)
              this.crearYear()
            }).catch(function (error) {
              console.log(error)
            })
        }
      }
    },
    kpidatos (kpiname) {
      axios.post('http://192.168.0.127:5000/registro', {
        kpi: kpiname,
        lista: this.desserts
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        }
      })
        .then(response => {
          this.$store.commit('estado', true)
        }).catch(function (error) {
          console.log(error)
        })
    },
    crearYear () {
      const dic = []
      for (var mes in this.meses) {
        dic.push({ name: this.meses[mes], valor: null, target: null })
      }
      this.desserts = dic
    }
  }
}

</script>
