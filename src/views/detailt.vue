<template>
  <v-container id="detail-kpi">
    <v-row class="pb-4 detail-kpi-title">
      <v-col cols="1">
        <v-btn @click="volver" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="2">
        <h2>{{$store.state.area}}</h2>
      </v-col>
    </v-row>
    <v-row v-for="(pilar, k) in pilares" :key="k" class="kpi-pilar-list-item">
        <v-col>
            <v-row >
          <v-app-bar dense dark :color="pilar.color">
            <v-avatar size="80">
              <v-icon>mdi-alert</v-icon>
            </v-avatar>
            <v-toolbar-title><strong>{{pilar.pilar}}</strong></v-toolbar-title>
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
      icon: '../img/Encabezado-06.jpg',
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
      axios.get('https://xu7cyyauhe.execute-api.us-aest1.amazonaws.com/web/ppt/', {
        Headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'mrxZckPp6Z6Pjtu2vv9ni3u5rLKZ2lIN5SSmXw43'
        },
        params: {
          file: this.$store.state.area
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
