<script setup>
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useProperties } from '@/composables/useProperties.js'

  const { getPropertyData } = useProperties()

  const property = ref(null)
  const route = useRoute()

  const propertyData = getPropertyData(route.params.id)

  watch(propertyData, (newVal) => {
    if (newVal) {
      property.value = newVal
    }
  })
</script>

<template>
  <div class="px-4 pt-3">
    <v-card-title class="text-h5 font-weight-bold px-0">Editar propiedad</v-card-title>
    <v-card class="mt-3 mb-10 pb-10 px-10">

    </v-card>
  </div>
</template>
