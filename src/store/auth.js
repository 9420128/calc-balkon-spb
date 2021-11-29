import {
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'
/* eslint-disable */
export default {
    actions: {
        // Войти

        async login({ dispatch, commit }, { email, password }) {
            const auth = getAuth()

            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        // Регистрация

        async registr({ dispatch, commit }, { email, password, name }) {
            const auth = getAuth()
            const db = getDatabase()

            try {
                await createUserWithEmailAndPassword(auth, email, password)

                const uid = await dispatch('getUid')
                await set(ref(db, 'users/' + uid), {
                    name,
                    email,
                    password,
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        getUid() {
            const user = getAuth().currentUser
            return user ? user.uid : null
        },

        // getUser() {
        //     const user = getAuth().currentUser
        //     return user ? user : null
        // },

        async logout() {
            const auth = getAuth()
            await signOut(auth)
        },
    },
}
