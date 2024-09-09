import { ref } from 'vue'


export default function useMap() {

    const center = ref([40.450797, -3.687062])

    function setMarker(e) {
        const marker = e.target.getLatLng()
        center.value = [marker.lat, marker.lng]
    }

    return {
        center,
        setMarker
    }
}
