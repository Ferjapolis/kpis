<template>
  <v-container>
    <v-row>
      <template v-for="(item, k) in lista">
        <v-card :key="k" width="200" height="160" class="ma-3" @click="ir(item.href)">
          <v-card-title>
            <span class="text-h5">{{ item.name }}</span>
          </v-card-title>
        </v-card>
      </template>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    lista: [
      {
        name: 'Zalt Ext',
        disabled: false,
        href: 'zaltext'
      }, {
        name: 'BFT',
        disabled: false,
        href: 'bft'
      }
    ]
  }),
  methods: {
    ir (area) {
      this.$router.push({ path: '/editkpi' })
      this.$store.commit('area', area)
    }
  }
}
</script>
