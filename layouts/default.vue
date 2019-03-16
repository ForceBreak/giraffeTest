<template>
  <v-app :dark='DARK_MODE'>
    <app-header/>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import { mapGetters } from 'vuex'
export default {
  components: {
    AppHeader
  },
  computed: {
    ...mapGetters({
      DARK_MODE: 'DARK_MODE'
    })
  }
}
</script>
