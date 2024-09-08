import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()

    const errorCodes = {
        'auth/invalid-credential': 'Contraseña incorrecta',
        'auth/user-not-found': 'Usuario no encontrado',
        'auth/wrong-password': 'Contraseña incorrecta'
    }

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user)
            })
            .catch((error) => {
                console.log(errorCodes[error.code])
            })
    }

    return {
        login
    }

})
