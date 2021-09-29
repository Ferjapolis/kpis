<template>
    <v-container>
    <v-row  class="pt-10">
        <h3>Actualización de Valores</h3>
        <v-spacer></v-spacer>
        <Nuevokpi />
    </v-row>
    <v-row justify="center">
        <v-col cols="3">
        <selectorkpi />
        </v-col>
        <v-col cols="3">
        <h4 class="pt-6">Owner: <b>{{kpi.owner}}</b></h4>
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-col cols="4">
        <Form />
        </v-col>
        <v-col cols="3">
            <v-card
              class="my-auto"
              max-width="150"
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-1">
                    YTD
                  </div>
                  <v-list-item-title class="text-h3 mb-1">
                    {{calculo(kpi.calc_ytd)}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-card
              class="my-auto"
              max-width="150"
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-1">
                    FSCT
                  </div>
                  <v-list-item-title class="text-h3 mb-1">
                    {{calculo(kpi.calc_fsct)}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
        </v-col>
    </v-row>
    </v-container>
</template>

<script>
import Form from '../components/form.vue'
import selectorkpi from '../components/filtro.vue'
import Nuevokpi from '../components/nuevokpi.vue'

export default {
  name: 'App',
  components: {
    Form,
    selectorkpi,
    Nuevokpi
  },
  data: () => ({
    dialog: false,
    kpi: {}
  }),
  watch: {
    '$store.state.kpi': function () {
      this.kpi = this.$store.state.kpi
    }
  },
  methods: {
    calculo (tipo) {
      const valor = 0
      if (tipo === 'Max') {
        return data.reduce ((min, b) => Math.min (min, by), data [0] .y)
      }
      if (tipo === 'Min') {
        return valor
      }
      if (tipo === 'Avg') {
        return valor
      }
      if (tipo === 'Acum') {
        return valor
      }
    }
  }
}

</script>
