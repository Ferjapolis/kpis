<template>
  <v-container>
    <v-row align="center" justify="center">
      <template v-for="(item, k) in lista">
        <v-card :key="k" width="200" height="120" class="ma-3" :disabled="item.disabled" @click="ir(item.name)">
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
        disabled: false
      }, {
        name: 'BFT',
        disabled: false
      }, {
        name: 'DRY',
        disabled: false
      }, {
        name: 'PACK',
        disabled: false
      }
    ]
  }),
  created () {
    this.$store.commit('selectArea', '')
  },
  methods: {
    ir (area) {
      this.$router.push({ path: '/editkpi' })
      this.$store.commit('selectArea', area)
    }
  }
}
</script>
