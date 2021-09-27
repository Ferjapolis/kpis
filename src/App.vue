<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h1>KPI <span>v1</span> </h1>
      <v-spacer></v-spacer>
      <nuevokpi />
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <h1>Actualización de Valores</h1>
        </v-row>
        <v-row>
          <v-col cols="3">
          </v-col>
          <v-col cols="3">
            <selectorkpi />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
          </v-col>
          <v-col cols="4">
            <Form />
          </v-col>
          <v-col cols="3">
            <h2> kpi: {{ this.$store.state.kpi }}</h2>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Form from './components/form.vue'
import selectorkpi from './components/filtro.vue'
import nuevokpi from './components/nuevokpi.vue'

export default {
  name: 'App',
  components: {
    Form,
    selectorkpi,
    nuevokpi
  },
  data: () => ({
    dialog: false
  })
}

</script>
