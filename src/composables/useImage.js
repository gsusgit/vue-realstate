import { ref as storageRef } from 'firebase/storage'
import { useStorage, useStorageFile } from 'vuefire'
import { uid } from 'uid'
import { watch, computed } from 'vue'

export default function useImage() {
    const storage = useStorage()
    const storagePath = storageRef(storage, `/propiedades/${uid()}`)

    const {
        url,
        upload
    } = useStorageFile(storagePath)

    function uploadImage(e) {
        const file = e.target.files[0]
        if (file) {
            upload(file)
                .then(() => {
                    watch(url, (newUrl) => {
                        if (newUrl) {
                            console.log('URL:', newUrl)
                        }
                    })
                })
                .catch((error) => {
                    console.error('Error al subir la imagen:', error)
                })
        }
    }

    const imageUploaded = computed(() => {
        return url.value ? url.value : null
    })

    const image = computed(() => {
        return url.value ? url.value : null
    })

    return {
        uploadImage,
        imageUploaded,
        url,
        image
    }
}
