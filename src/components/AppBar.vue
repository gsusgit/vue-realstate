<script setup>
import { useAuthStore } from '@/stores/auth.js'

const auth = useAuthStore()
</script>

<template>
  <v-app-bar color="grey-darken-4">
    <template v-slot:prepend>
      <v-btn :to="{name: 'home'}">
        <img src="../assets/logo.svg" height="24" alt="Vue Logo" class="mr-2" />
        <span>REAL STATE</span>
      </v-btn>
    </template>
    <template v-slot:append>
      <div v-if="auth.isAuthenticated">
        <v-btn :to="{name: 'admin-propiedades'}">Admin Panel</v-btn>
        <v-btn :to="{name: 'login'}" @click="auth.logOut()">Cerrar sesión</v-btn>
      </div>
      <div v-else>
        <v-btn :to="{name: 'login'}">Iniciar sesión</v-btn>
      </div>
    </template>
  </v-app-bar>
</template>
