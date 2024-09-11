import { computed } from 'vue'
import { collection, doc } from 'firebase/firestore'
import { useCollection, useDocument, useFirestore } from 'vuefire'

export const useProperties = () => {

    const db = useFirestore()
    const properties = useCollection(collection(db, 'propiedades'))
    
    const formatPrice = computed(() => {
        return (price) =>
            Number(price).toLocaleString('es-ES', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            })
    })

    return {
        properties,
        formatPrice
    }
}
