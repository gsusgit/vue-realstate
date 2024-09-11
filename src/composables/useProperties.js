import { ref, computed } from 'vue'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { useCollection, useFirestore, useFirebaseStorage } from 'vuefire'

export const useProperties = () => {

    const db = useFirestore()
    const properties = useCollection(collection(db, 'propiedades'))
    const pool = ref(false)
    const storage = useFirebaseStorage()
    
    const formatPrice = computed(() => {
        return (price) =>
            Number(price).toLocaleString('es-ES', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            })
    })

    const propertiesCollection = computed(() => {
        return pool.value ? properties.value.filter(property => property.piscina) : properties.value
    })

    const removeProperty = async (id, imageUrl) => {
        const imageRef = storageRef(storage, imageUrl)
        const docRef = doc(db, 'propiedades', id)
        await deleteDoc(docRef)
        await deleteObject(imageRef)
    }

    return {
        properties,
        formatPrice,
        propertiesCollection,
        pool,
        removeProperty
    }
}
