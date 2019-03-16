<template>
  <v-form v-model="valid">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            label="Title"
            v-model="title"
            required
            :rules='textRule'
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-textarea
            label="Description"
            :value="description"
            v-model="description"
            required
            :rules='textRule'
          ></v-textarea>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs2>
          <v-btn @click="saveAd" :disabled="!valid" v-if="id">Save</v-btn>
          <v-btn @click="createAd" :disabled="!valid" v-else>Create</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    props: ['id'],
    data () {
      return {
        title: '',
        description: '',
        valid: false,
        textRule: [
          v => !!v || 'Поле обязательно'
        ],
        indexToSave: null
      }
    },
    methods: {
      createAd () {
        let newAd = {
          id: this.ADS[this.ADS.length - 1].id + 1,
          title: this.title,
          description: this.description,
          created_at_datetime: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`,
          author: this.USER_LOGIN
        }
        this.$store.dispatch('user/CREATE_AD', newAd)
        this.$router.push(`/${this.ADS[this.ADS.length - 1].id}`)
      },
      saveAd () {
        let saveAd = {
          id: this.ADS[this.indexToSave].id,
          title: this.title,
          description: this.description,
          created_at_datetime: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`,
          author: this.ADS[this.indexToSave].author
        }
        this.$store.dispatch('user/SAVE_AD', saveAd)
        this.$router.push(`/${this.ADS[this.indexToSave].id}`)
      }
    },
    computed: {
      ...mapGetters({
        USER_LOGIN: 'user/USER_LOGIN',
        ADS: 'user/ADS'
      }),
      ...mapActions({
        CREATE_AD: 'user/CREATE_AD',
        SAVE_AD: 'user/SAVE_AD'
      })
    },
    created () {
      if (this.id) {
        this.ADS.forEach((element, index) => {
          if (Number(element.id) === Number(this.id)) {
            this.indexToSave = index
            this.title = this.ADS[index].title
            this.description = this.ADS[index].description
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>