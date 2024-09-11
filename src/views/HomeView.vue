<script setup>
  import { useProperties } from '@/composables/useProperties.js'

  const {
      properties,
      formatPrice
  } = useProperties()
</script>

<template>
  <v-container class="pa-0 hero-container" fluid>
    <v-sheet
        height="450"
        class="d-flex align-center justify-center hero"
    >
      <v-row>
        <v-col>
          <h1 class="text-h2 font-weight-bold text-center text-white mb-4">Vue Real State</h1>
          <p class="text-h4 font-weight-light text-center text-white">Transformando el futuro del Hogar Inteligente</p>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
  <v-container class='container-3 property-listing mb-15'>
    <v-card-title class="text-h4 font-weight-bold px-0 text-center mt-10 mb-5">Últimas propiedades</v-card-title>
    <v-row>
      <v-col v-for="property in properties" :key="property.id" cols='12' sm='4'>
        <v-card class="mx-auto card-height" color="transparent">
          <v-img
              :src="property.imagen"
              height="300px"
              class="overlay-container"
          >
            <div class="overlay"></div>
            <v-card-title class="text-h5 font-weight-bold">{{ property.titulo }}</v-card-title>
            <v-card-subtitle class="text-h5 font-weight-medium text-white">{{ formatPrice(property.precio) }}</v-card-subtitle>
          </v-img>
          <template v-slot:actions>
            <v-btn
                append-icon="mdi-chevron-right"
                class="property-info"
                color="teal-lighten-2"
                text="Ver propiedad"
                variant="outlined"
                block
                :to="{name: 'propiedad', params: {id: property.id}}"
            ></v-btn>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .hero {
    background-image: url(src/assets/hero.jpg);
    background-size: cover;
    background-position: center;
    width: 100.7%;
  }
  .card-height {
    height: 275px;
  }
  .overlay-container {
    position: relative;
  }
  .overlay-container .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  .overlay-container .v-card-title,
  .overlay-container .v-card-subtitle {
    position: relative;
    z-index: 2;
    color: white;
  }
  .property-info:hover {
    background: teal;
    color: white !important;
    border-color: teal;
  }
</style>
