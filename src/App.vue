<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark/>
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>
