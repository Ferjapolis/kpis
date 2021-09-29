<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h1>Manager KPI <span>v1</span> </h1>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    dialog: false
  })
}

</script>
