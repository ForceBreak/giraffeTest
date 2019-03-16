<template>
  <v-layout column justify-center align-center>
    <v-flex xs12>
      <v-card v-if="currentAd">
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ currentAd.title }}</div>
            <span class="grey--text">{{ currentAd.author }}</span>
            <div class=" grey--text">{{ currentAd.created_at_datetime }}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn
            @click="deleteAd(currentAd.id)"
            v-if="currentAd.author == USER_LOGIN"
            small>
            Delete
          </v-btn>
          <v-btn
            :to="`/edit/${currentAd.id}`"
            v-if="currentAd.author == USER_LOGIN"
            small>
            Edit
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="show">
            {{ currentAd.description }}
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        show: false
      }
    },
    methods: {
      deleteAd (index) {
        this.$store.dispatch('user/DELETE_AD', index)
        this.$router.push(`/delete/${index}`)
      }
    },
    computed: {
      currentAd () {
        let current
        this.ADS.forEach((element, index) => {
          if (Number(element.id) === Number(this.$route.params.id)) {
            current = index
          }
        })
        return this.ADS[current]
      },
      ...mapGetters({
        ADS: 'user/ADS',
        ADS_HEADERS: 'user/ADS_HEADERS',
        USER_LOGIN: 'user/USER_LOGIN'
      }),
      ...mapActions({
        DELETE_AD: 'user/DELETE_AD'
      })
    }
  }
</script>

<style scoped>

</style>