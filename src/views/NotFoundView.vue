<template>
  <v-container class="d-flex flex-column align-center justify-center fill-height mt-3">
    <v-icon class="mb-4" size="64">mdi-alert-octagon-outline</v-icon>
    <h1 class="text-h4">Página no encontrada</h1>
    <p class="text-body-1 mb-5">Lo sentimos, la página que estás buscando no existe...</p>
    <v-btn :to="{name: 'propiedades'}" color="teal" class="mt-4">Volver a inicio</v-btn>
  </v-container>
</template>
