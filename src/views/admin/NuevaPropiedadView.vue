<script setup>
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { validationSchema, imageSchema } from '@/validation/propiedadSchema.js'
import useImage from '@/composables/useImage.js'
import useMap from '@/composables/useMap.js'
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet"
import { onMounted, ref } from 'vue'
import Preloader from '@/components/Preloader.vue'

const preloader = ref(true)

onMounted(() => {
  setTimeout(() => {
    preloader.value = false
  }, 1000)
})

const items = [1, 2, 3, 4, 5]
const loading = ref(false)
const alert = ref({
  show: false,
  title: '',
  type: '',
})

const {
    uploadImage,
    imageUploaded,
    url
} = useImage()

const {
    center,
    setMarker
} = useMap()

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema
  }
})

const titulo = useField('titulo')
const imagen = useField('imagen')
const precio = useField('precio')
const habitaciones = useField('habitaciones')
const aseos = useField('aseos')
const aparcamientos = useField('aparcamientos')
const descripcion = useField('descripcion')
const piscina = useField('piscina', null, {
  initialValue: false
})

const db = useFirestore()
const router = useRouter()

const submit = handleSubmit(async (values) => {
  loading.value = true
  const { imagen, ...propiedad } = values
  try {
    const docRef = await addDoc(collection(db, 'propiedades'), {
      ...propiedad,
      imagen: url.value,
      marker: center.value
    })
    alert.value = {
      show: true,
      title: 'Propiedad añadida con éxito.',
      type: 'success'
    }
    setTimeout(() => {
      alert.value.show = false
      loading.value = false
      if (docRef.id) {
        router.push({ name: 'propiedades' })
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
})

</script>

<template>
  <Preloader v-if="preloader"/>
  <div v-else class='px-4 pt-3'>
    <v-card-title class='text-h5 font-weight-bold px-0'>Nueva propiedad</v-card-title>
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
            label='Imagen'
            prepend-icon='mdi-camera'
            accept='image/png, image/jpeg'
            class='mb-3'
            v-model='imagen.value.value'
            :error-messages='imagen.errorMessage.value'
            @change="uploadImage($event)"
        />
        <div
            v-if="imageUploaded"
            class="mb-5"
        >
          <p class="font-weight-bold mb-2">Imagen de propìedad: </p>
          <v-img
              :src="imageUploaded"
              class="w-50"
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
          <l-map
              :zoom="16"
              :center="[center[0], center[1]]"
              :use-global-leaflet="false"
          >
            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LMarker
                :lat-lng="center"
                draggable="draggable"
                @moveend="setMarker($event)"
            />
          </l-map>
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
          <span>{{ loading ? 'Añadiendo...' : 'Añadir propiedad' }}</span>
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

