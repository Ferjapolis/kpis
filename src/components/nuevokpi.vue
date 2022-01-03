<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen hide-overlay>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="blue darknes-1" dark v-bind="attrs" v-on="on">
        Nuevo KPI
      </v-btn>
    </template>
    <v-card id="new-kpi-card">
      <v-card-title class="pa-0">
        <v-toolbar dense dark color="primary">
          <v-btn icon dark @click="dialog = false">
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
          <v-row class="pt-4" id="new-kpi-container">
            <v-col cols="3" offset="1" style="height:100%" class="d-flex flex-column align-center justify-center">
              <v-col cols="12" class="pa-4" id="new-kpi-data-box">
                <v-select v-model="edit.pilar" :items="items" :rules="[v => !!v || 'Pilar is required']" label="Pilar"
                  required class="ma-0 pa-0">
                </v-select>

                <v-text-field v-model="edit.kpi" :rules="nameRules" label="KPI" required class="ma-0 pa-0"></v-text-field>
                <v-text-field v-model="edit.owner" :rules="nameRules" label="Owner" required class="ma-0 pa-0"></v-text-field>
                <v-row class="mb-7">
                  <v-col class="px-2">
                    <v-text-field class="text-center" v-model="edit.fcst" label="FCST"></v-text-field>
                  </v-col>
                  <v-col class="px-2">
                    <v-select v-model="edit.datatype" :items="datatype" :rules="[v => !!v || 'Type is required']"
                      label="Tipo de dato" required>
                    </v-select>
                  </v-col>
                </v-row>
                <v-row class="mb-7">
                  <v-col class="px-2">
                    <v-select v-model="edit.calc_ytd" :items="calc" :rules="[v => !!v || 'Calc is required']"
                      label="Tipo de Calc." required>
                    </v-select>
                  </v-col>
                  <v-col class="px-2">
                    <v-select v-model="edit.rule" :items="rule" :rules="[v => !!v || 'Type is required']"
                      label="Tipo de Regla" required>
                    </v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="pa-4 mt-1" id="new-kpi-table-box">
                <div>
                  <v-row>
                    <v-col cols="5">
                      <h5 class="text-center">Mes</h5>
                    </v-col>
                    <v-col cols="3">
                      <h5 class="text-center">Valor</h5>
                    </v-col>
                    <v-col cols="3">
                      <h5 class="text-center">Target</h5>
                    </v-col>
                  </v-row>
                  <v-row v-for="(mes, k) in desserts" :key="k" class="new-kpi-table-row">
                    <v-col cols="5" justify="right">
                      <h4 class="text-center">{{mes.name}}</h4>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col cols="3">
                      <v-text-field class="text-center" dense v-model="desserts[k].valor"
                        :placeholder="desserts[k].textv"></v-text-field>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col cols="3">
                      <v-text-field class="text-center" @change.capture="test" @keyup.down="forcetargets(k)" dense
                        v-model="desserts[k].target" :placeholder="desserts[k].textt"></v-text-field>
                    </v-col>
                    <v-divider vertical></v-divider>
                  </v-row>
                </div>
                <div justify="center">
                  <v-switch v-model="autotarget" label="Target inteligente" center></v-switch>
                </div>
              </v-col>
            </v-col>
            <v-col cols="7" class="align-center">
              <div v-bind:style="{ height: '100%'}" class="col-12 pa-4">
                <v-col cols="12" id="new-kpi-graphic-buttons" class="mt-5">
                  <v-row class="justify-center">
                    <h4>Tipo de Gráfico</h4>
                  </v-row>
                  <v-row class="d-flex flex-row justify-center row">
                    <template v-for="(chart,k) in charts">
                    <v-hover :key="k">
                      <v-tooltip  bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn class="mx-2 mb-2" :color="chart.color" @click="selecchart(k)" v-bind="attrs"
                            v-on="on">
                            <v-icon large>{{chart.icon}}</v-icon>
                          </v-btn>
                        </template>
                        <span>Gráfico {{chart.text}}</span>
                      </v-tooltip>
                      </v-hover>
                    </template>
                  </v-row>
                </v-col>
                <v-col cols="12" id="new-kpi-chart">
                  <highcharts :options="chartOptions" ref="chart"></highcharts>
                </v-col>
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
    autotarget: true,
    typetarget: 0,
    listtarget: ['Equal', 'Asc', 'Desc'],
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
      'Acum',
      'Equal'
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
    charts: [{
      icon: 'mdi-chart-areaspline',
      select: false,
      recomend: false,
      text: 'Lineal de Area',
      color: '',
      type: 'area'
    },
    {
      icon: 'mdi-chart-bell-curve-cumulative',
      select: false,
      recomend: false,
      text: 'Lineal Acumulativo',
      color: '',
      type: 'line'
    },
    {
      icon: 'mdi-chart-line',
      select: false,
      recomend: false,
      text: 'Lineal',
      color: '',
      type: 'line'
    },
    {
      icon: 'mdi-chart-bar mdi-rotate-90',
      select: false,
      recomend: false,
      text: 'Barras',
      color: '',
      type: 'bar'
    },
    {
      icon: 'mdi-chart-bar',
      select: false,
      recomend: false,
      text: 'Columnas',
      color: '',
      type: 'column'
    },
    {
      icon: 'mdi-chart-donut',
      select: false,
      recomend: false,
      text: 'Dona',
      color: '',
      type: 'donut'
    },
    {
      icon: 'mdi-chart-pie',
      select: false,
      recomend: false,
      text: 'Torta',
      color: '',
      type: 'pie'
    }
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
      update: '',
      fsct: null
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
      update: '',
      fsct: null
    },
    desserts: [],
    chartOptions: {
      chart: {
        type: 'line'
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
  watch: {
    typetarget: function (val) {
      if (val === 0) {
        for (var item in this.desserts) {
          this.desserts[item].textt = this.desserts[0].target.toString()
        }
      }
      if (val === 2) {
        var valor2 = this.desserts[11].target / 12
        for (var item2 in this.desserts) {
          this.desserts[item2].textt = (valor2 * item).toString()
        }
      }
      if (val === 1) {
        var valor = this.desserts[0].target
        for (var item1 of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
          this.desserts[item1 - 1].textt = (valor * item1).toString()
        }
      }
    }
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
      this.chartOptions.series[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      this.chartOptions.series[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    save () {
      if (this.valid) {
        if (this.edit.pilar != null & this.edit.kpi !== '') {
          this.edit.area = this.$store.state.area
          axios.post('https://xu7cyyauhe.execute-api.us-east-1.amazonaws.com/web/perfiles', this.edit, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-key,X-Amz-Security-Token',
              'x-api-key': 'mrxZckPp6Z6Pjtu2vv9ni3u5rLKZ2lIN5SSmXw43'
            }
          })
            .then(response => {
              this.kpidatos(this.edit.area, this.edit.kpi)
              this.dialog = false
              this.edit = Object.assign({}, this.editBak)
              this.crearYear()
            }).catch(function (error) {
              console.log(error)
            })
        }
      }
    },
    kpidatos (area, kpiname) {
      axios.post('https://xu7cyyauhe.execute-api.us-east-1.amazonaws.com/web/registros', {
        folder: area,
        file: kpiname,
        lista: this.desserts
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-key,X-Amz-Security-Token',
          'x-api-key': 'mrxZckPp6Z6Pjtu2vv9ni3u5rLKZ2lIN5SSmXw43'
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
        dic.push({
          name: this.meses[mes],
          valor: null,
          textv: '0',
          target: null,
          textt: '0'
        })
      }
      this.desserts = dic
    },
    anterior () {
      if (this.typetarget === this.listtarget.length - 1) {
        this.typetarget = 0
      } else {
        this.typetarget = this.typetarget + 1
      }
    },
    siguiente () {
      if (this.typetarget === 0) {
        this.typetarget = this.listtarget.length - 1
      } else {
        this.typetarget = this.typetarget - 1
      }
    },
    fijar () {
      for (var item in this.desserts) {
        this.desserts[item].target = parseInt(this.desserts[item].textt)
      }
    },
    test () {
      var val = this.typetarget
      if (val === 0) {
        for (var item in this.desserts) {
          this.desserts[item].textt = this.desserts[0].target.toString()
        }
      }
      if (val === 2) {
        var valor2 = this.desserts[11].target / 12
        for (var item2 in this.desserts) {
          this.desserts[item2].textt = (valor2 * item).toString()
        }
      }
      if (val === 1) {
        var valor = this.desserts[0].target
        for (var item1 of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
          this.desserts[item1 - 1].textt = (valor * item1).toString()
        }
      }
    },
    selecchart (index) {
      for (var item in this.charts) {
        this.charts[item].select = false
        this.charts[item].color = ''
      }
      this.charts[index].select = true
      this.charts[index].color = 'success'
      this.edit.chart = this.charts[index].text
      this.chartOptions.chart.type = this.charts[index].type
    }
  }
}

</script>
