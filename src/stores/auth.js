import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()
    const authUser = ref({})
    const errorMsg = ref('')
    const errorCodes = {
        'Firebase: Error (auth/invalid-credential).': 'Credenciales incorrectas',
        'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).': 'Usuario bloqueado.'
    }

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                authUser.value = userCredential.user
            })
            .catch((error) => {
                errorMsg.value = errorCodes[error.message]
                setTimeout(() => {
                    errorMsg.value = ''
                }, 2000)
            })
    }

    const hasError = computed(() => {
        return errorMsg.value !== ''
    })

    return {
        login,
        hasError,
        errorMsg,
        authUser
    }

})
