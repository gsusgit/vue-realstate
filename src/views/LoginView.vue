<script setup>

</script>

<template>
  <v-card
      flat
      max-width="600"
      class="mx-auto my-10"
  >
    <v-card-title
        class="text-h5 font-weight-bold"
        tag="h5"
    >
      Iniciar sesión
    </v-card-title>
    <v-card-subtitle
        class="text-h6"
        tag="h6"
    >
      Introduce tus credenciales de acceso
    </v-card-subtitle>
    <v-form
        class="mt-5"
    >
      <v-text-field
          label="Email"
          type="email"
          bg-color="blue-grey-lighten-5"
      />
      <v-text-field
          label="Password"
          type="password"
          bg-color="blue-grey-lighten-5"
      />
      <v-btn
          block
          color="pink-accent-3"
      >
        Iniciar sesión
      </v-btn>
    </v-form>
  </v-card>
</template>
