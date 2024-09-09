<script setup>
  const openGithub = () => {
    window.open('https://github.com/gsusgit/vue-realstate', '_blank');
  }
</script>

<template>
  <v-footer class="footer" color="teal-lighten-1">
    <div class="footer-content">
      <strong class="text-white">Vue + Pinia + Firebase + Vuetify + Vee Validate</strong>
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
  .footer {
    width: 100vw;
    max-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  .footer-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    width: 100%;
  }
</style>
