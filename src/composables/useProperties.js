import { ref, computed } from 'vue'
import { collection } from 'firebase/firestore'
import { useCollection, useFirestore } from 'vuefire'

export const useProperties = () => {

    const db = useFirestore()
    const properties = useCollection(collection(db, 'propiedades'))
    const pool = ref(false)
    
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

    return {
        properties,
        formatPrice,
        propertiesCollection,
        pool
    }
}
