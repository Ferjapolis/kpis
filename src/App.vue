<template>
  <v-app>
    <v-app-bar app color="primary" dark>
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
      console.log(val)
      if (val === '') {
        this.show = false
      } else {
        this.show = true
      }
    }
  }
}

</script>
