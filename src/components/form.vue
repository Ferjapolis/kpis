<template>
  <div>
    <v-data-table dense :headers="headers" :items="desserts" :items-per-page="12" hide-default-footer item-key="namer"
      :loading="snack" loading-text="Actualizando...">
      <template v-slot:item.valor="props">
        <v-edit-dialog :return-value.sync="props.item.valor" large persistent @save="save" @cancel="cancel" @open="open"
          @close="close">
          <div>{{ props.item.valor }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">
              Update valor
            </div>
            <v-text-field v-model="props.item.valor" :rules="[max25chars]" label="Edit" single-line counter autofocus>
            </v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.target="props">
        <v-edit-dialog :return-value.sync="props.item.target" large persistent @save="save" @cancel="cancel"
          @open="open" @close="close">
          <div>{{ props.item.target }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">
              Update target
            </div>
            <v-text-field v-model="props.item.target" :rules="[max25chars]" label="Edit" single-line counter autofocus>
            </v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
      <v-icon
        color="success"
        class="mr-2"
        @click="editItem(item)"
        v-show="item.name == mes"
      >
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
    </v-data-table>
    <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.valor"
                      label="Valor"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.target"
                      label="Target"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="editar"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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

<script>
const axios = require('axios')
export default {
  data () {
    return {
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
      desserts: [{
        name: 'Enero',
        valor: 159,
        target: 6.0,
        stats: 24,
        predict: 4.0
      },
      {
        name: 'Febrero',
        valor: 237,
        target: 9.0,
        stats: 37,
        predict: 4.3
      },
      {
        name: 'Marzo',
        valor: 262,
        target: 16.0,
        stats: 23,
        predict: 6.0
      },
      {
        name: 'Abril',
        valor: 305,
        target: 3.7,
        stats: 67,
        predict: 4.3
      },
      {
        name: 'Mayo',
        valor: 356,
        target: 16.0,
        stats: 49,
        predict: 3.9
      },
      {
        name: 'Junio',
        valor: 375,
        target: 0.0,
        stats: 94,
        predict: 0.0
      },
      {
        name: 'Julio',
        valor: 392,
        target: 0.2,
        stats: 98,
        predict: 0
      },
      {
        name: 'Agosto',
        valor: 408,
        target: 3.2,
        stats: 87,
        predict: 6.5
      },
      {
        name: 'Septiembre',
        valor: 452,
        target: 25.0,
        stats: 51,
        predict: 4.9
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
      ],
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
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  methods: {
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
      const formData = { lista: this.desserts, kpi: 'MRT' }
      axios.post('http://192.168.0.127:5000/registro', formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        }
      })
        .then(response => {
          this.save()
        }).catch(response => {
          this.cancel()
        })
    }
  }
}

</script>
