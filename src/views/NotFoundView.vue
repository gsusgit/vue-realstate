<script setup>
  import { useAuthStore } from '@/stores/auth.js'
  import { onMounted, ref } from 'vue'
  import Preloader from '@/components/Preloader.vue'

  const preloader = ref(true)

  onMounted(() => {
    setTimeout(() => {
      preloader.value = false
    }, 1000)
  })

  const auth = useAuthStore()
</script>

<template>
  <Preloader v-if="preloader"/>
  <v-container v-else class="d-flex flex-column align-center justify-center fill-height mt-15">
    <v-icon class="mb-4" size="64">mdi-alert-octagon-outline</v-icon>
    <h1 class="text-h4">Página no encontrada</h1>
    <p class="text-body-1 mb-5">Lo sentimos, la página que estás buscando no existe...</p>
    <v-btn v-if="auth.isAuthenticated" :to="{name: 'propiedades'}" color="teal" class="mt-4">Volver a inicio</v-btn>
    <v-btn v-else :to="{name: 'home'}" color="teal" class="mt-4">Volver a inicio</v-btn>
  </v-container>
</template>
