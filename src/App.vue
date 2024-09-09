<script setup>
  import AppBar from '@/components/AppBar.vue'
  import Footer from '@/components/Footer.vue'
  import Main from '@/components/Main.vue'
</script>

<template>
  <v-container max-width="1200" class="mx-auto main-content">
    <v-layout>
      <AppBar />
      <Main />
      <Footer />
    </v-layout>
  </v-container>
</template>
