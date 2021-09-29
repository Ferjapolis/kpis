<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="green darknes-2" dark v-bind="attrs" v-on="on">
        Nuevo KPI
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 blue darknes-2">
        Registrar Nuevo KPI
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>

          <v-select v-model="edit.pilar" :items="items" :rules="[v => !!v || 'Pilar is required']" label="Pilar"
            required>
          </v-select>

          <v-text-field v-model="edit.kpi" :counter="10" :rules="nameRules" label="KPI" required></v-text-field>

          <v-select v-model="edit.calc_ytd" :items="calc" :rules="[v => !!v || 'Calc is required']" label="Calc. YTD"
            required>
          </v-select>

          <v-select v-model="edit.calc_fsct" :items="calc" :rules="[v => !!v || 'Calc is required']" label="Calc. FSCT"
            required>
          </v-select>
          <v-text-field v-model="edit.owner" :counter="10" :rules="nameRules" label="Owner" required></v-text-field>

        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>

        <v-btn color="error" class="mr-4" @click="reset" text>
          Reset Form
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
          Validate
        </v-btn>

      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-dialog>
</template>

<script>
const axios = require('axios')
export default {
  data: () => ({
    snack: false,
    snackColor: '',
    snackText: '',
    valid: true,
    dialog: false,
    show: false,
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
    checkbox: false,
    edit: {
      area: '',
      pilar: '',
      kpi: '',
      calc_ytd: '',
      calc_fsct: '',
      stat: 'enabled',
      owner: '',
      update: ''
    },
    editBak: {
      area: '',
      pilar: '',
      kpi: '',
      calc_ytd: '',
      calc_fsct: '',
      stat: '',
      owner: '',
      update: ''
    },
    desserts: [{
      name: 'Enero',
      valor: 0,
      target: 0,
      stats: 0,
      predict: 0
    },
    {
      name: 'Febrero',
      valor: 0,
      target: 0,
      stats: 0,
      predict: 0
    },
    {
      name: 'Marzo',
      valor: 0,
      target: 0,
      stats: 0,
      predict: 0
    },
    {
      name: 'Abril',
      valor: 0,
      target: 0,
      stats: 0,
      predict: 0
    },
    {
      name: 'Mayo',
      valor: 0,
      target: 0,
      stats: 0,
      predict: 0
    },
    {
      name: 'Junio',
      valor: 0,
      target: 0,
      stats: 0,
      predict: 0
    },
    {
      name: 'Julio',
      valor: 0,
      target: 0,
      stats: 0,
      predict: 0
    },
    {
      name: 'Agosto',
      valor: 0,
      target: 0,
      stats: 0,
      predict: 0
    },
    {
      name: 'Septiembre',
      valor: 0,
      target: 0,
      stats: 0,
      predict: 0
    },
    {
      name: 'Octubre',
      valor: 0,
      target: 0,
      stats: 0,
      predict: 0
    },
    {
      name: 'Noviembre',
      valor: 0,
      target: 0,
      stats: 0,
      predict: 0
    },
    {
      name: 'Diciembre',
      valor: 0,
      target: 0,
      stats: 0,
      predict: 0
    }
    ]
  }),

  methods: {
    validate () {
      this.$refs.form.validate()
      this.close()
    },
    reset () {
      this.$refs.form.reset()
    },
    save (texto) {
      this.snack = true
      this.snackColor = 'success'
      this.snackText = texto
    },
    cancel (texto) {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = texto
    },
    close () {
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
              this.dialog = false
              this.save(response.data.stat)
              this.kpidatos(this.edit.kpi)
              this.edit = Object.assign({}, this.editBak)
            }).catch(function (error) {
              console.log(error)
            })
        }
      }
    },
    kpidatos (kpiname) {
      axios.post('http://192.168.0.127:5000/registro', {
        kpi: kpiname,
        datos: this.desserts
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        }
      })
        .then(response => {
          console.log('registrado')
        }).catch(function (error) {
          console.log(error)
        })
    }
  }
}

</script>
