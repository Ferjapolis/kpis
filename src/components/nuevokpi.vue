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

          <v-select v-model="select" :items="items" :rules="[v => !!v || 'Pilar is required']" label="Pilar" required>
          </v-select>

          <v-text-field v-model="name" :counter="10" :rules="nameRules" label="KPI" required></v-text-field>

        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>

        <v-btn color="error" class="mr-4" @click="reset" text>
          Reset Form
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-show="show" :disabled="!valid" color="success" class="mr-4" @click="validate">
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
      'Pilar 1',
      'Pilar 2',
      'Pilar 3',
      'Pilar 4',
      'Pilar 5'
    ],
    checkbox: false
  }),

  watch: {
    name (val) {
      if (val === '') {
        this.show = false
      } else {
        this.show = true
      }
    }
  },
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
      var formData = {
        pilar: this.select,
        kpi: this.name
      }
      if (this.valid) {
        if (this.select != null & this.name !== '') {
          axios.post('http://192.168.0.127:5000/kpis', formData, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            }
          })
            .then(response => {
              this.dialog = false
              this.save(response.data.stat)
            }).catch(function (error) {
              console.log(error)
            })
        }
      }
    }
  }
}

</script>
