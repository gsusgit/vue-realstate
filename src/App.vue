<script setup>
  import AppBar from '@/components/AppBar.vue'
  import Footer from '@/components/Footer.vue'
  import Main from '@/components/Main.vue'
</script>

<template>
  <div class="layout">
    <v-layout column class="main-layout">
      <AppBar />
      <div class="main-content">
        <Main />
      </div>
    </v-layout>
    <Footer />
  </div>
</template>

<style scoped>
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .main-layout {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .main-content {
    flex-grow: 1;
  }
</style>
