<template>
    <v-container>
    <v-row  class="pt-10">
        <h3>Actualización de Valores</h3>
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
</template>

<script>
import Form from '../components/form.vue'
import selectorkpi from '../components/filtro.vue'

export default {
  name: 'App',
  components: {
    Form,
    selectorkpi
  },
  data: () => ({
    dialog: false
  })
}

</script>
