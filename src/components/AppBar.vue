<script setup>
  import { useAuthStore } from '@/stores/auth.js'
  import { useRoute } from 'vue-router'

  const auth = useAuthStore()
</script>

<template>
  <v-app-bar color="grey-darken-4">
    <template v-slot:prepend>
    <a
        class="logo-link"
        :href="$router.resolve({ name: 'home' }).href"
    >
      <img src="../assets/logo.svg" height="24" alt="Vue Logo" class="mr-2" />
      <span>REAL STATE</span>
    </a>
  </template>
    <template v-slot:append>
      <div v-if="auth.isAuthenticated">
        <v-btn :to="{name: 'propiedades'}">Propiedades</v-btn>
        <v-btn :to="{name: 'login'}" @click="auth.logOut()">Cerrar sesión</v-btn>
      </div>
      <div v-else>
        <v-btn :to="{name: 'home'}">Propiedades</v-btn>
        <v-btn :to="{name: 'login'}">Iniciar sesión</v-btn>
      </div>
    </template>
  </v-app-bar>
</template>

<style scoped>
  .logo-link {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    background: transparent;
    border: none;
    padding: 0;
  }

  .logo-link:hover,
  .logo-link:focus {
    color: inherit;
    background: transparent;
  }
  .logo-link img {
    margin-right: 8px;
  }
  .logo-link span {
    font-weight: 900;
    font-size: larger;
  }
</style>
