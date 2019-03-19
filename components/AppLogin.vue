<template>
    <div class="loginShadow">
        <v-content class="loginPosition">
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                    <v-toolbar-title>{{title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-icon @click='closeLogin'>close</v-icon>
                    </v-toolbar>
                    <v-card-text>
                    <v-alert
                      :value="true"
                      color="warning"
                      icon="priority_high"
                      v-if='$store.state.error'
                      >
                      {{$store.state.error}}
                    </v-alert>
                    <v-form v-model="valid" ref="form">
                        <v-text-field 
                          prepend-icon="person" 
                          name="login" 
                          label="Логин" 
                          type="text"
                          v-model="login" @keyup.enter="logIn"
                          required
                          :rules='textRule'
                          autofocus
                          />
                        <v-text-field 
                          prepend-icon="lock" 
                          name="password" 
                          label="Пароль" 
                          type="password"
                          v-model="password"
                          @keyup.enter="logIn"
                          required
                          :rules='textRule'
                          :error-messages='PASS_INVALID'
                          />
                    </v-form>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                      color="primary"
                      @click.prevent="logIn">
                      {{btnText}}
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-flex>
            </v-layout>
        </v-content>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['closeLogin'],
  data () {
    return {
      drawer: null,
      title: 'Форма входа',
      btnText: 'Войти',
      login: '',
      password: '',
      valid: true,
      textRule: [
        v => !!v || 'Поле обязательно'
      ]
    }
  },
  methods: {
    logIn () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('user/SIGNIN', {
          login: this.login,
          password: this.password
        })
      }
    }
  },
  computed: {
    ...mapActions({
      signin: 'user/SIGNIN'
    }),
    ...mapGetters({
      PASS_INVALID: 'user/PASS_INVALID',
      PROCESSING: 'PROCESSING'
    })
  }
}
</script>

<style>
.loginShadow{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(000, 000, 000, 0.8);
    z-index: 2;
}
.loginPosition{
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    z-index: 1;
}
</style>


