<template>
  <v-app v-bind:style="{ background: 'linear-gradient(56deg, rgb(2 0 36 / 80%) 0%, rgba(16,56,79,0.8911939775910365) 35%, rgb(0 188 255 / 75%) 100%)' }">
    <v-app-bar app id="app-header">
      <h1>Manager KPI <span>v1</span> </h1>
      <v-spacer></v-spacer>
      <nuevokpi  v-if="show"/>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import nuevokpi from './components/nuevokpi.vue'

export default {
  name: 'App',
  components: {
    nuevokpi
  },
  data: () => ({
    dialog: false,
    show: false
  }),
  watch: {
    '$store.state.area': function (val) {
      if (val === '') {
        this.show = false
      } else {
        this.show = true
      }
    }
  }
}

</script>
