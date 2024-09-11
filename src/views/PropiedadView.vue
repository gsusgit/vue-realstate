<script setup>
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFirestore, useDocument } from 'vuefire'
import { doc } from 'firebase/firestore'
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LMarker
} from "@vue-leaflet/vue-leaflet";
import useLocationMap from '@/composables/useLocationMap'
import { useProperties } from '@/composables/useProperties.js'

const {
  formatPrice
} = useProperties()

const {
  zoom,
  center
} = useLocationMap()


const route = useRoute()

const db = useFirestore()
const docRef = doc(db, 'propiedades', route.params.id)
const propiedad = useDocument(docRef)

</script>

<template>
  <v-container class='container-3 property-listing mt-10 mb-15'>
    <v-card-title class='text-h4 font-weight-bold mb-4'>{{propiedad?.titulo}}</v-card-title>
    <v-card-item>
      <img
          class="w-100"
          :src="propiedad?.imagen"
          alt="Imagen propiedad"
      />
    </v-card-item>
    <v-card-text class="text-h6 font-weight-light">{{propiedad?.descripcion}}</v-card-text>
    <v-card-item>
      <v-container class='container-3'>
        <v-row>
          <v-col
              cols='6'
              sm='6'
          >
            <div class="my-5 w-100" style="height:300px; width:100%">
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
          </v-col>
          <v-col
              cols='6'
              sm='6'
              class="mt-5"
          >
            <v-card-text><v-icon class="me-2">mdi-bed-outline</v-icon><strong>{{propiedad?.habitaciones}}</strong> habitaciones</v-card-text>
            <v-card-text><v-icon class="me-2">mdi-toilet</v-icon> <strong>{{propiedad?.aseos}}</strong> aseos</v-card-text>
            <v-card-text><v-icon class="me-2">mdi-car-outline</v-icon><strong>{{propiedad?.aparcamientos}}</strong> plazas de garaje</v-card-text>
            <v-card-text v-if="propiedad.piscina"><v-icon class="me-2">mdi-pool</v-icon> Con piscina</v-card-text>
            <v-card-text class="text-h5 mt-5"><span class="font-weight-black">{{ formatPrice(propiedad?.precio) }}</span></v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card-item>
  </v-container>
</template>
