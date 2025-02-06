<template>
  <v-app>
    <template v-if="isMobile">
      <v-bottom-navigation>
        <v-btn icon @click="toggleTheme">
          <v-icon class="mdi mdi-brightness-4"></v-icon>
        </v-btn>
        <v-btn to="/contact">Contact</v-btn>
        <v-btn to="/projects">Explore</v-btn>
      </v-bottom-navigation>
    </template>

    <template v-else>
      <v-app-bar flat rounded density="compact">
        <v-app-bar-title>🧙‍♂️</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon @click="toggleTheme">
            <v-icon class="mdi mdi-brightness-4"></v-icon>
          </v-btn>
          <v-btn to="/projects">Explore</v-btn>
          <v-btn to="/contact">Contact</v-btn>

          <v-btn icon="mdi-magnify"></v-btn>

          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>
    </template>
    <router-view />
    <v-footer>
      <v-row justify="center" no-gutters>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>raphaelbottura.com</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    toggleTheme() {
      console.log(this.$vuetify.theme.global.name)
      this.$vuetify.theme.global.name = this.$vuetify.theme.global.current.dark ? 'myCustomLightTheme' : 'myCustomDarkTheme'
      // theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  },
  computed: {
    isMobile() {
      console.log(this.$vuetify.display.mobile)
      // Check if the screen size is xs or sm using Vuetify's breakpoints
      return this.$vuetify.display.mobile;
    },
  },
}
</script>

<style>
#app {
  padding: 0;
}

.bottom-toolbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #333;
  color: white;
}
</style>
