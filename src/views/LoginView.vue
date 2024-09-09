<script setup>
    import { useForm, useField } from 'vee-validate'
    import { loginSchema as validationSchema } from '@/validation/loginSchema.js'
    import { useAuthStore } from '@/stores/auth.js'

    const authStore = useAuthStore()
    const { handleSubmit } = useForm({ validationSchema })

    const email = useField('email')
    const password = useField('password')

    const submit = handleSubmit(({email, password}) => {
      authStore.logIn(email, password)
    })

</script>

<template>
  <v-card
      max-width="450"
      class="mx-auto pt-10 pb-15 px-12 my-10"
  >
    <v-card-title
        class="text-h5 font-weight-bold px-0 text-center"
        tag="h5"
    >
      Iniciar sesión
    </v-card-title>
    <v-card-subtitle
        class="text-h6 px-0 text-center"
        tag="h6"
    >
      Introduce tus credenciales de acceso
    </v-card-subtitle>
    <v-form
        @submit.prevent
        class="mt-5"
    >
      <v-alert
          v-if="authStore.hasError"
          class="my-5"
          :title="authStore.errorMsg"
          type="error"
      ></v-alert>
      <v-text-field
          label="Email"
          type="email"
          class="mb-3"
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
      />
      <v-text-field
          label="Password"
          type="password"
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
      />
      <v-btn
          block
          color="teal-lighten-1"
          class="mt-3 py-6 text-uppercase"
          @click="submit"
      >
        Iniciar sesión
      </v-btn>
    </v-form>
  </v-card>
</template>
