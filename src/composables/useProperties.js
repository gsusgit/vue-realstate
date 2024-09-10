import { computed } from 'vue'
import { collection } from 'firebase/firestore'
import { useCollection, useFirestore } from 'vuefire'

export const useProperties = () => {

    const db = useFirestore()
    const properties = useCollection(collection(db, "propiedades"))
    
    const formatPrice = computed(() => {
        return (price) =>
            Number(price).toLocaleString('es-ES', {
                style: 'currency',
                currency: 'EUR'
            })
    })

    return {
        properties,
        formatPrice
    }
}
