<template>
  <div>
    <highcharts :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'

exportingInit(Highcharts)
export default {
  name: 'grafico',
  data: () => ({
    chartOptions: {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Monthly'
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
        data: []

      }, {
        name: 'Target',
        data: []
      }]
    }
  }),
  watch: {
    '$store.state.datos': function () {
      var valor = []
      var target = []
      for (var item in this.$store.state.datos) {
        valor.push(parseFloat(this.$store.state.datos[item].valor))
        target.push(parseFloat(this.$store.state.datos[item].target))
      }
      this.chartOptions.series[0].data = valor
      this.chartOptions.series[1].data = target
    }
  }
}
</script>
