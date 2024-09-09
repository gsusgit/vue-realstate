import { computed, ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()
    const authUser = ref(null)
    const router = useRouter()
    const errorMsg = ref('')
    const errorCodes = {
        'Firebase: Error (auth/invalid-credential).': 'Credenciales incorrectas',
        'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).': 'Usuario bloqueado.'
    }

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                authUser.value = user
            }
        })
    })

    const logIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                authUser.value = userCredential.user
                router.push({name: 'admin-propiedades'})
            })
            .catch((error) => {
                errorMsg.value = errorCodes[error.message]
                setTimeout(() => {
                    errorMsg.value = ''
                }, 2000)
            })
    }

    const logOut = () => {
        signOut(auth).then(() => {
            authUser.value = null
            router.push({name: 'login'})
        }).catch((error) => {
            console.log(error)
        })
    }

    const isAuthenticated = computed(() => {
        return authUser.value
    })

    const hasError = computed(() => {
        return errorMsg.value !== ''
    })

    return {
        logIn,
        logOut,
        hasError,
        errorMsg,
        isAuthenticated
    }

})
