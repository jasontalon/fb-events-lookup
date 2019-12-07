<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center">
        <v-card raised width="480px">
          <v-card-title>Overview</v-card-title>
          <div class="ma-3">Searches for events in facebook</div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center">
        <v-card raised color="green lighten-2" width="480px">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Framework</div>
              <v-list-item-title class="headline mb-1"
                >NuxtJS</v-list-item-title
              >
              <v-list-item-subtitle>A Vue.js framework</v-list-item-subtitle>
            </v-list-item-content>

            <a href="https://www.nuxtjs.org/" target="_blank">
              <v-list-item-avatar tile size="64" color="grey">
                <v-img src="images/nuxt.png"/></v-list-item-avatar
            ></a>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center"
        ><v-card raised color="blue lighten-3" width="480px">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">UI Library</div>
              <v-list-item-title class="headline mb-1"
                >VuetifyJS</v-list-item-title
              >
              <v-list-item-subtitle>
                Library with beautifully handcrafted Material
                Components.</v-list-item-subtitle
              >
            </v-list-item-content>

            <a href="https://vuetifyjs.com/en/" target="_blank">
              <v-list-item-avatar tile size="64">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"/></v-list-item-avatar
            ></a>
          </v-list-item> </v-card
      ></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center"
        ><v-card raised color="deep-purple lighten-3" width="480px">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Hosting</div>
              <v-list-item-title class="headline mb-1"
                >Heroku</v-list-item-title
              >
              <v-list-item-subtitle>
                container-based cloud Platform as a Service
                (PaaS).</v-list-item-subtitle
              >
            </v-list-item-content>

            <a href="https://www.heroku.com/" target="_blank">
              <v-list-item-avatar tile size="64">
                <v-img
                  src="images/heroku.svg"
                  width="64px"
                  height="64px"/></v-list-item-avatar
            ></a>
          </v-list-item> </v-card
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from '../components/Logo'
export default {
  components: {
    Logo
  }
}
</script>

<style></style>
