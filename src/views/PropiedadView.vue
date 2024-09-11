<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFirestore, useDocument } from 'vuefire'
import { doc, updateDoc } from 'firebase/firestore'
import { useField, useForm } from 'vee-validate'
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LMarker
} from "@vue-leaflet/vue-leaflet";
import useImage from '@/composables/useImage'
import useLocationMap from '@/composables/useLocationMap'
import { validationSchema } from '@/validation/propiedadSchema'
import { useProperties } from '@/composables/useProperties.js'

const {
  formatPrice
} = useProperties()

const alert = ref({
  show: false,
  title: '',
  type: '',
})
const loading = ref(false)

const items = [1, 2, 3, 4, 5]

const {
  url,
  uploadImage,
  image
} = useImage()
const {
  zoom,
  center,
  pin
} = useLocationMap()
const {handleSubmit} = useForm({validationSchema});

const titulo = useField('titulo')
const imagen = useField('imagen')
const precio = useField('precio')
const habitaciones = useField('habitaciones')
const aseos = useField('aseos')
const aparcamientos = useField('aparcamientos')
const descripcion = useField('descripcion')
const piscina = useField('piscina')

const route = useRoute()
const router = useRouter()

const db = useFirestore()
const docRef = doc(db, 'propiedades', route.params.id)
const propiedad = useDocument(docRef)

watch(propiedad, (propiedad) => {
  titulo.value.value = propiedad.titulo
  precio.value.value = propiedad.precio
  habitaciones.value.value = propiedad.habitaciones
  aseos.value.value = propiedad.aseos
  aparcamientos.value.value = propiedad.aparcamientos
  descripcion.value.value = propiedad.descripcion
  piscina.value.value = propiedad.piscina
  center.value = propiedad.marker
})

</script>

<template>
  <v-container class='container-3 property-listing mt-10 mb-15'>
    <v-card-title class='text-h4 font-weight-bold mb-4'>{{propiedad?.titulo}}</v-card-title>
    <v-card-item>
      <img
          class="w-50"
          :src="propiedad?.imagen"
          alt="Imagen propiedad"
      />
    </v-card-item>
    <v-card-text class="text-h6 font-weight-light">{{propiedad?.descripcion}}</v-card-text>
    <v-card-item>
      <v-divider></v-divider>
    </v-card-item>
    <v-card-item>
      <v-container class='container-3'>
        <v-row>
          <v-col
              cols='12'
              sm='3'
          >
            <v-card-subtitle class="text-h5 font-weight-bold text-teal"> {{ formatPrice(propiedad?.precio) }}</v-card-subtitle>
          </v-col>
          <v-col
              cols='6'
              sm='4'
          >
            <v-row>
              <v-col
                  cols='12'
                  sm='3'
                  class="items-number"
              >
                <div class="custom-border">
                  <v-icon class="me-2">mdi-bed-outline</v-icon>  {{propiedad?.habitaciones}}
                </div>
              </v-col>
              <v-col
                  cols='12'
                  sm='3'
                  class="items-number"
              >
                <div class="custom-border">
                  <v-icon class="me-2">mdi-toilet</v-icon> {{propiedad?.aseos}}
                </div>
              </v-col>
              <v-col
                  cols='12'
                  sm='3'
                  class="items-number"
              >
                <div class="custom-border">
                  <v-icon class="me-2">mdi-car-outline</v-icon> {{propiedad?.aparcamientos}}
                </div>
              </v-col>
              <v-col
                  v-if="propiedad?.piscina"
                  cols='12'
                  sm='3'
                  class="items-number"
              >
                <div class="custom-border">
                  <v-icon class="me-2">mdi-pool</v-icon> {{propiedad?.piscina ? 'Si' : 'No'}}
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card-item>
    <v-card-item>
      <div class="my-5 w-100" style="height:400px; width:100%">
        <LMap
            v-model:zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
        >
          <LMarker
              :lat-lng="center"
          />
          <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></LTileLayer>
        </LMap>
      </div>
    </v-card-item>
  </v-container>
</template>

<style scoped>
  .custom-border {
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    padding: 4px 8px;
    background-color: #f8f8f8;
    max-width: 80px;
  }
  .items-number {
    flex: 0 0 24.333333%;
    max-width: 24.333333%;
  }
</style>
