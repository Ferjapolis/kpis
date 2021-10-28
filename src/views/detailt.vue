<template>
  <v-container>
    <v-row class="pb-4">
      <v-col cols="1">
        <v-btn @click="volver" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="2">
        <h2>{{$store.state.area}}</h2>
      </v-col>
    </v-row>
    <v-row v-for="(pilar, k) in pilares" :key="k">
        <v-col>
            <v-row class="mb-5">
          <v-app-bar dense dark :color="pilar.color">
            <v-avatar size="90">
                <v-icon x-large>mdi-alarm-light-outline</v-icon>
            </v-avatar>
            <v-toolbar-title>{{pilar.pilar}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <p>{{pilar.kpis.length}} KPI</p>
            <v-btn icon @click="mostrar(k)">
                <v-icon v-if="pilar.show">mdi-arrow-collapse</v-icon>
                <v-icon v-else>mdi-arrow-expand</v-icon>
            </v-btn>
          </v-app-bar>
            </v-row>
        <v-row class="pb-4" v-if="pilar.show" transition="scroll-y-transition">
            <v-col cols="12">
                <v-data-table
                    dense
                    disable-pagination
                    hide-default-footer
                    :headers="headers"
                    :items="pilar.kpis"
                ></v-data-table>
            </v-col>
        </v-row>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
const axios = require('axios')

export default {
  name: 'Home',
  data: () => ({
    pilares: [{
      pilar: 'People',
      color: '#694664',
      kpis: [],
      icon: '../img/001.png',
      show: false
    },
    {
      pilar: 'Sustainability',
      color: '#8ad32a',
      kpis: [],
      icon: '../img/002.png',
      show: false
    },
    {
      pilar: 'Value & Efficient',
      color: '#ff3162',
      kpis: [],
      icon: '../img/003.png',
      show: false
    },
    {
      pilar: 'Digital & Innovation',
      color: '#00617e',
      kpis: [],
      icon: '../img/004.png',
      show: false
    },
    {
      pilar: 'Customer Experient',
      color: '#01bafd',
      kpis: [],
      icon: '../img/005.png',
      show: false
    }
    ],
    headers: [
      { text: 'KPI', value: 'kpi' },
      { text: 'Calculo', value: 'calc_ytd' },
      { text: 'Owner', value: 'owner' },
      { text: 'Valores', value: 'valor' },
      { text: 'Update', value: 'update' }
    ]
  }),
  created () {
    this.actualizar()
  },
  methods: {
    volver () {
      this.$router.push({
        path: '/'
      })
    },
    mostrar (index) {
      if (this.pilares[index].show) {
        this.pilares[index].show = false
      } else {
        this.pilares[index].show = true
      }
    },
    actualizar () {
      axios.get('http://192.168.0.127:5000/ppt', {
        params: {
          area: this.$store.state.area
        }
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        }
      })
        .then(response => {
          for (var item of response.data.lista) {
            if (item.pilar === this.pilares[0].pilar) {
              this.pilares[0].kpis.push(item)
            }
            if (item.pilar === this.pilares[1].pilar) {
              this.pilares[1].kpis.push(item)
            }
            if (item.pilar === this.pilares[2].pilar) {
              this.pilares[2].kpis.push(item)
            }
            if (item.pilar === this.pilares[3].pilar) {
              this.pilares[3].kpis.push(item)
            }
            if (item.pilar === this.pilares[4].pilar) {
              this.pilares[4].kpis.push(item)
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
    }
  }
}

</script>
