<template>
  <div>
    <v-toolbar app>
      <v-toolbar-title class='headline text-uppercase'>
        <v-btn 
          @click="chandeAppMode" 
          class='hidden-sm-and-down'>
          <span v-if="DARK_MODE">Light mode</span>
          <span v-else>Dark mode</span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class='hidden-sm-and-down' v-if="USER_LOGIN" >
          <v-btn flat primary :to="'/'">
            Главная
          </v-btn>
          <v-btn flat primary>
            {{USER_LOGIN}}
          </v-btn>
          <v-btn flat primary :to="'/edit'">
            Create Ad
          </v-btn>
          <v-btn flat primary @click='signOut' :to="'/logout'">
            Logout
          </v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <v-btn flat primary @click='showLogin'>
          Log in
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <app-login v-if='SHOW_LOGIN' :closeLogin='closeLogin'></app-login>
  </div>
</template>

<script>
  import AppLogin from './AppLogin'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    components: {
      AppLogin
    },
    computed: {
      ...mapGetters({
        DARK_MODE: 'DARK_MODE',
        SHOW_LOGIN: 'user/SHOW_LOGIN',
        USER_LOGIN: 'user/USER_LOGIN'
      }),
      ...mapMutations({
        openSignIn: 'user/SHOW_SIGNIN'
      })
    },
    methods: {
      closeLogin () {
        this.$store.commit('user/SHOW_SIGNIN', false)
      },
      showLogin () {
        this.$store.commit('user/SHOW_SIGNIN', true)
      },
      signOut () {
        this.$store.dispatch('user/SIGN_OUT')
      },
      chandeAppMode (mode) {
        this.$store.commit('SET_APP_MODE', mode)
      }
    }
  }
</script>

<style>

</style>

