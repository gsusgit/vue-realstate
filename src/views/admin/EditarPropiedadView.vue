<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFirestore, useDocument } from 'vuefire'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
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

// Obtener la Propiedad a editar
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

const submit = handleSubmit(async values => {
  loading.value = true
  const {
    imagen,
    ...propiedad
  } = values
  if (image.value) {
    const data = {
      ...propiedad,
      imagen: url.value,
      marker: center.value
    }
    try {
      await updateDoc(docRef, data)
      alert.value = {
        show: true,
        title: 'Propiedad editada con éxito.',
        type: 'success'
      }
      setTimeout(() => {
        alert.value.show = false
        loading.value = false
        if (docRef.id) {
          router.push({ name: 'propiedades' })  // Usa router aquí
        }
      }, 1500)
    } catch (error) {
      alert.value = {
        show: true,
        title: 'Ocurrió un error al intentar añadir propiedad.',
        type: 'error'
      }
      setTimeout(() => {
        loading.value = false
        alert.value.show = false
      }, 1500)
    }
  } else {
    const data = {
      ...propiedad,
      marker: center.value
    }
    try {
      await updateDoc(docRef, data)
      alert.value = {
        show: true,
        title: 'Propiedad editada con éxito.',
        type: 'success'
      }
      setTimeout(() => {
        alert.value.show = false
        loading.value = false
        if (docRef.id) {
          router.push({ name: 'propiedades' })  // Usa router aquí
        }
      }, 1500)
    } catch (error) {
      alert.value = {
        show: true,
        title: 'Ocurrió un error al intentar añadir propiedad.',
        type: 'error'
      }
      setTimeout(() => {
        loading.value = false
        alert.value.show = false
      }, 1500)
    }
  }
})

</script>

<template>
  <div class='px-4 pt-3'>
    <v-card-title class='text-h5 font-weight-bold px-0'>Editar propiedad</v-card-title>
    <v-card class='mt-3 mb-10 pb-10 px-10'>
      <v-form
          @submit.prevent
          class='mt-10'
      >
        <v-text-field
            label='Título'
            class='mb-3'
            v-model='titulo.value.value'
            :error-messages='titulo.errorMessage.value'
        />
        <v-file-input
            v-model="imagen.value.value"
            :error-messages="imagen.errorMessage.value"
            accept="image/jpeg"
            prepend-icon="mdi-camera"
            label="Fotografía"
            class="mb-5"
            @change="uploadImage"
        ></v-file-input>

        <div class="my-5">
          <p class="font-weight-bold mb-2">Imagen de propìedad: </p>
          <img
              v-if="image"
              class="w-50"
              :src="image"
              alt="Imagen propiedad"
          />
          <img
              v-else
              class="w-50"
              :src="propiedad?.imagen"
              alt="Imagen propiedad"
          />
        </div>
        <v-text-field
            label='Precio'
            class='mb-3'
            v-model='precio.value.value'
            :error-messages='precio.errorMessage.value'
        />
        <v-container class='container-3'>
          <v-row>
            <v-col cols='12' sm='4'>
              <v-select
                  label='Habitaciones'
                  class='mb-3'
                  :items='items'
                  v-model='habitaciones.value.value'
                  :error-messages='habitaciones.errorMessage.value'
              />
            </v-col>
            <v-col cols='12' sm='4'>
              <v-select
                  label='Aseos'
                  class='mb-3'
                  :items='items'
                  v-model='aseos.value.value'
                  :error-messages='aseos.errorMessage.value'
              />
            </v-col>
            <v-col cols='12' sm='4'>
              <v-select
                  label='Plazas garaje'
                  class='mb-3'
                  :items='items'
                  v-model='aparcamientos.value.value'
                  :error-messages='aparcamientos.errorMessage.value'
              />
            </v-col>
          </v-row>
        </v-container>
        <v-textarea
            label='Descripción'
            v-model='descripcion.value.value'
            :error-messages='descripcion.errorMessage.value'
        />
        <v-checkbox
            label='Piscina'
            v-model='piscina.value.value'
        />
        <p class="font-weight-bold mb-5">Ubicación: </p>
        <div class="mb-10 w-50" style="height:400px; width:100%">
          <LMap
              v-model:zoom="zoom"
              :center="center"
              :use-global-leaflet="false"
          >
            <LMarker
                :lat-lng="center"
                draggable
                @moveend="pin"
            />
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
          </LMap>
        </div>
        <v-alert
            v-if="alert.show"
            class="my-5"
            :title="alert.title"
            :type="alert.type"
        ></v-alert>
        <v-btn
            :disabled="loading"
            color='teal-lighten-1'
            class='text-uppercase'
            @click='submit'
        >
          <span>{{ loading ? 'Guardando...' : 'Guardar cambios' }}</span>
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>
