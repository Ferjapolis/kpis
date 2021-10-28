<template>
  <div>
    <div  class="pt-4">
      <v-row>
          <v-col cols="5"><h5 class="text-center" >Mes</h5></v-col>
          <v-col cols="3"><h5 class="text-center" >Valor</h5></v-col>
          <v-col cols="3"><h5 class="text-center" >Target</h5></v-col>
      </v-row>
      <v-row v-for="(mes, k) in desserts" :key="k" justify="right">
        <v-col cols="5" justify="right"><h4 class="pl-4 text-right pr-4">{{mes.name}}</h4></v-col>
          <v-divider vertical></v-divider>
        <v-col cols="3"><v-text-field class="text-center" dense v-model="desserts[k].valor" label=""></v-text-field></v-col>
          <v-divider vertical></v-divider>
        <v-col cols="3"><v-text-field class="text-center" dense v-model="desserts[k].target" label=""></v-text-field></v-col>
          <v-divider vertical></v-divider>
        <v-col><v-icon :color="colorT(estado(desserts[k].valor,desserts[k].target))">{{estado(desserts[k].valor,desserts[k].target)}}</v-icon></v-col>
      </v-row>
    </div>
    <v-row class="pt-8" justify="center">
      <v-col cols="8">
       <v-btn color="success" block @click="save">Guardar</v-btn>
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
  </div>
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
const axios = require('axios')
export default {
  data () {
    return {
      stat: false,
      mes: 'Septiembre',
      dialog: false,
      snack: false,
      snackColor: '',
      snackText: '',
      max25chars: v => v.length <= 25 || 'Input too long!',
      pagination: {},
      editedIndex: -1,
      headers: [{
        text: 'Meses',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      {
        text: 'Valor',
        value: 'valor'
      },
      {
        text: 'target',
        value: 'target'
      },
      {
        text: 'Actions',
        value: 'actions'
      }
      ],
      desserts: [],
      editedItem: {
        name: '',
        valor: 0,
        target: 0,
        stats: 0,
        predict: 0
      },
      defaultItem: {
        name: '',
        valor: 0,
        target: 0,
        stats: 0,
        predict: 0
      }
    }
  },
  watch: {
    '$store.state.kpi': function () {
      this.kpi = this.$store.state.kpi
      if (this.kpi === '') {
        this.desserts = []
        this.stat = false
      } else {
        this.datos()
      }
    },
    desserts: function (val) {
      this.$store.commit('selectKpidatos', val)
      console.log(this.$store.state.datos)
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  methods: {
    colorT (stat) {
      if (stat === 'mdi-check') {
        return 'success'
      } else {
        return 'warning'
      }
    },
    estado (valor, target) {
      if (valor != null) {
        if (this.kpi.rule === '<') {
          if (valor < target) {
            return 'mdi-check'
          } else {
            return 'mdi-alert'
          }
        }
        if (this.kpi.rule === '<=') {
          if (valor <= target) {
            return 'mdi-check'
          } else {
            return 'mdi-alert'
          }
        }
        if (this.kpi.rule === '>') {
          if (valor > target) {
            return 'mdi-check'
          } else {
            return 'mdi-alert'
          }
        }
        if (this.kpi.rule === '>=') {
          if (valor >= target) {
            return 'mdi-check'
          } else {
            return 'mdi-alert'
          }
        }
        if (this.kpi.rule === '==') {
          if (valor === target) {
            return 'mdi-check'
          } else {
            return 'mdi-alert'
          }
        }
        if (this.kpi.rule === '!=') {
          if (valor !== target) {
            return 'mdi-check'
          } else {
            return 'mdi-alert'
          }
        }
      }
    },
    save () {
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Data saved'
      this.guardar()
    },
    cancel () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    open () {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    close () {
      console.log('Dialog closed')
    },
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.open()
    },
    editar () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.dialog = false
      this.save()
    },
    guardar () {
      const formData = { lista: this.desserts, kpi: this.kpi.kpi }
      axios.post('http://192.168.0.127:5000/registro', formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        }
      })
        .then(response => {
          this.$store.commit('estado', true)
        }).catch(response => {
          this.cancel()
        })
    },
    datos () {
      axios.get('http://192.168.0.127:5000/registro', {
        params: {
          kpi: this.kpi.kpi
        }
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        }
      })
        .then(response => {
          this.desserts = response.data.datos[0].datos
          this.$store.commit('selectKpidatos', response.data.datos[0].datos)
          this.stat = true
        }).catch(function (error) {
          console.log(error)
        })
    }
  }
}

</script>
