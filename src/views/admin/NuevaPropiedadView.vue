<script setup>
  const items = [1, 2, 3, 4, 5]
</script>

<template>
  <div class="px-4 pt-3">
    <v-card-title class="text-h5 font-weight-bold px-0">Nueva propiedad</v-card-title>
    <v-card class="mt-3 mb-10 pb-10 px-10">
      <v-form
          @submit.prevent
          class="mt-10"
      >
        <v-text-field
            label="Título"
            class="mb-3"
        />
        <v-file-input
            label="Imagen"
            prepend-icon="mdi-camera"
            accept="image/png, image/jpeg"
            class="mb-3"
        />
        <v-text-field
            label="Precio"
            class="mb-3"
        />
        <v-container class="container-3">
          <v-row>
            <v-col cols="12" sm="4">
              <v-select
                  label="Habitaciones"
                  class="mb-3"
                  :items="items"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                  label="Aseos"
                  class="mb-3"
                  :items="items"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                  label="Plazas garaje"
                  class="mb-3"
                  :items="items"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-textarea
            label="Descripción"
        />
        <v-checkbox
            label="Piscina"
            class="mb-3"
        />
        <v-btn
            color="teal-lighten-1"
            class="text-uppercase"
        >
          Añadir propiedad
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>
