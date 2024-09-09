<script setup>
  const openGithub = () => {
    window.open('https://github.com/gsusgit/vue-realstate', '_blank');
  }
</script>

<template>
  <v-footer class="bg-teal d-flex flex-column fixed-footer">
    <div class="bg-teal d-flex w-100 align-center px-4 py-3">
      <strong>Vue + Firebase + Vuetify</strong>
      <v-spacer></v-spacer>
      <v-btn
          class="me-2 text-none"
          prepend-icon="mdi-github"
          variant="flat"
          @click="openGithub"
      >
        Check on Github
      </v-btn>
    </div>
  </v-footer>
</template>

<style scoped>
  .fixed-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
</style>
