import Vue from 'vue'
import Vuetify, {
  VApp, // required
  VFooter,
  VToolbar
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VApp,
    VFooter,
    VToolbar
  },
  directives: {
    Ripple
  }
})
