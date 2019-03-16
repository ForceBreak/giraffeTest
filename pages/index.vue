<template>
  <v-layout column justify-center align-center>
    <v-flex xs12>
      <v-data-table
        :headers="ADS_HEADERS"
        :items="ADS"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td class="text-xs-right">
            <nuxt-link :to="`/${props.item.id}`">{{props.item.title}}</nuxt-link>
          </td>
          <td class="text-xs-right">{{ props.item.description }}</td>
          <td class="text-xs-right">{{ props.item.author }}</td>
          <td class="text-xs-right">{{ props.item.created_at_datetime }}</td>
          <td class="text-xs-right">
            <v-btn
              @click="deleteAd(props.item.id)"
              :to="`/delete/${props.item.id}`"
              v-if="props.item.author == USER_LOGIN"
              small>
              Delete
            </v-btn>
            <v-btn
              :to="`/edit/${props.item.id}`"
              v-if="props.item.author == USER_LOGIN"
              small>
              Edit
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    methods: {
      deleteAd (index) {
        this.$store.dispatch('user/DELETE_AD', index)
      }
    },
    computed: {
      ...mapGetters({
        USER_LOGIN: 'user/USER_LOGIN',
        ADS: 'user/ADS',
        ADS_HEADERS: 'user/ADS_HEADERS'
      }),
      ...mapActions({
        DELETE_AD: 'user/DELETE_AD'
      })
    }
  }
</script>