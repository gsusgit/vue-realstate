<script setup>
  import { useProperties } from '@/composables/useProperties.js'
  import Preloader from '@/components/Preloader.vue'
  import { onMounted, ref } from 'vue'

  const preloader = ref(true)

  onMounted(() => {
    setTimeout(() => {
      preloader.value = false
    }, 1000)
  })

  const {
      properties,
      formatPrice,
      removeProperty
  } = useProperties()

  const alert = ref({
    show: false,
    title: 'Propiedad eliminada con éxito.',
    type: 'success'
  })

  const showDialog = ref(false)
  const propertyToDelete = ref(null)
  const imageToDelete = ref('')

  const confirmDelete = (id, imageUrl) => {
    propertyToDelete.value = id
    imageToDelete.value = imageUrl
    showDialog.value = true
  }

  const acceptDelete = () => {
    if (propertyToDelete.value) {
      removeProperty(propertyToDelete.value, imageToDelete.value)
    }
    showDialog.value = false
    alert.value.show = true
    setTimeout(() => {
      alert.value.show = false
    }, 1500)
  }
</script>

<template>
  <Preloader v-if="preloader"/>
  <div v-else>
    <v-dialog v-model="showDialog" max-width="500">
      <template v-slot:default="{ isActive }">
        <v-card title="Borrar propiedad">
          <v-card-text>
            La propiedad será eliminada, ¿Estás seguro?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                variant="tonal"
                text="Cancelar"
                @click="showDialog = false"
            ></v-btn>
            <v-btn
                color="red"
                variant="flat"
                text="Aceptar"
                @click="acceptDelete"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <div class="d-flex w-100 align-center px-4 py-3">
      <v-card-title class="text-h5 font-weight-bold px-0">Listado de propiedades</v-card-title>
      <v-spacer></v-spacer>
      <v-btn :to="{name: 'nueva-propiedad'}" color="teal" class="mt-4">Nueva propiedad</v-btn>
    </div>
    <div class="w-100 px-4 py-5">
      <div class="mx-auto">
        <v-alert
            v-if="alert.show"
            class="my-5"
            :title="alert.title"
            :type="alert.type"
        ></v-alert>
        <v-list
            v-if="properties.length > 0"
            class="custom-list"
        >
          <v-list-item
              v-for="property in properties"
              :key="property.id"
              class="custom-list-item"
              border
          >
            <template v-slot:prepend>
              <v-list-item-media :start="true">
                <img
                    :src="property.imagen"
                    alt="'Imagen ' + {{property.titulo}}"
                    width="180"
                />
              </v-list-item-media>
            </template>
            <v-list-item-title class="text-h6 font-weight-bold">{{property.titulo}}</v-list-item-title>
            <v-list-item-title class="text-h6 text-teal font-weight-medium">{{formatPrice(property.precio)}}</v-list-item-title>
            <v-container class='container-3'>
              <v-row>
                <v-col cols='12' sm='8'>
                  <v-row>
                    <v-col class="items-number">
                      <div class="custom-border">
                        <v-icon class="me-2">mdi-bed-outline</v-icon>  {{property.habitaciones}}
                      </div>
                    </v-col>
                    <v-col class="items-number">
                      <div class="custom-border">
                        <v-icon class="me-2">mdi-toilet</v-icon> {{property.aseos}}
                      </div>
                    </v-col>
                    <v-col class="items-number">
                      <div class="custom-border">
                        <v-icon class="me-2">mdi-car-outline</v-icon> {{property.aparcamientos}}
                      </div>
                    </v-col>
                    <v-col v-if="property.piscina" class="items-number">
                      <div class="custom-border pool">
                        <v-icon class="me-2">mdi-pool</v-icon> Piscina
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            <template v-slot:append>
              <v-btn
                  color="teal"
                  variant="outlined"
                  class="custom-btn edit mr-2"
                  :to="{name: 'editar-propiedad', params: {id: property.id}}"
              >Editar</v-btn>
              <v-btn
                  color="red"
                  variant="outlined"
                  class="custom-btn remove"
                  @click="confirmDelete(property.id, property.imagen)"
              >Eliminar</v-btn>
            </template>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </div>

</template>

<style scoped>
  .custom-list {
    background: transparent !important;
  }
  .custom-list-item {
    background: white;
    margin-bottom: 1rem;
    padding: 1rem !important;
  }
  .custom-btn:hover {
    color: white !important;
  }
  .custom-btn.edit:hover {
    background-color: teal !important;
  }
  .custom-btn.remove:hover {
    background-color: red !important;
  }
  .custom-border {
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    padding: 4px 8px;
    margin-top: .5rem;
    background-color: #f8f8f8;
    max-width: 80px;
  }
  .custom-border.pool {
    max-width: 110px;
  }
  .items-number {
    flex: 0 0 24.333333%;
    max-width: 24.333333%;
  }
</style>
