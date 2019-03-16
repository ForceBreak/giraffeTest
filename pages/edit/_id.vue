<template>
  <app-create-ad :id="this.$route.params.id"/>
</template>

<script>
import AppCreateAd from '~/components/AppCreateAd'
export default {
  components: {
    AppCreateAd
  }
}
</script>