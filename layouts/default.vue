<template>
  <v-app dark>
    <v-main>
      <v-container>
        <v-app-bar
          v-if="email"
          app
          clipped-left
          dark
          fixed
          hide-on-scroll
        >
        <v-spacer></v-spacer>
        <v-app-bar-title>{{email}}</v-app-bar-title>
        <v-btn icon @click="logoutUser">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import vuex 
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
export default {
  name: 'DefaultLayout',

  computed: {
    // map vuex getters to computed properties
    ...mapFields(['email']),
  },

  methods: {
    // map vuex actions to methods
    ...mapActions(['logout']),

    // logout method
    logoutUser() {
      this.$cookies.remove('email')
      this.logout()
    },
  },

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
