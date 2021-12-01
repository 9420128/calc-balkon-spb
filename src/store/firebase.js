/* eslint-disable */

import { getDatabase, ref, set, onValue, push, remove } from 'firebase/database'
export default {
    actions: {
        // получить все закзы
        async fetchzakazAll({ commit, dispatch }, array = []) {
            try {
                const uid = await dispatch('getUid')
                const db = getDatabase()

                await onValue(ref(db, `/users/${uid}/zakazAll`), (snapshot) => {
                    const data = snapshot.val()
                    let arr = Object.keys(data).map((key) => ({
                        ...data[key],
                        id: key,
                    }))

                    array.push(arr)
                })

                return array
            } catch (e) {
                console.log(e)
            }
        },

        // отправить замер на сервер
        // push - добавляет Id
        // set - без Id
        async createZakaz({ commit, dispatch }, { zakaz, user, date }) {
            try {
                const uid = await dispatch('getUid')
                const db = getDatabase()
                const zakazAll = await push(ref(db, `users/${uid}/zakazAll`), {
                    zakaz,
                    user,
                    date,
                })

                return {
                    zakaz,
                    user,
                    date,
                    id: zakazAll.key,
                }
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        //////////////////////////////
        /// отправить данные на сервер
        /// val.folder - папака,  val.text - значение

        async createValueSet({ commit }, val) {
            try {
                // const uid = await dispatch('getUid')
                const db = getDatabase()
                await set(ref(db, `${val.folder}`), val.text)

                return {
                    val,
                }
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async createValuePush({ commit, dispatch }, val) {
            try {
                const uid = await dispatch('getUid')
                const db = getDatabase()
                await push(ref(db, `users/${uid}/${val.folder}`), val.text)

                return true
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        // sklad

        async createSkladPush(
            { commit, dispatch },
            { folder, adres, info, name, email, menedger }
        ) {
            try {
                const uid = await dispatch('getUid')
                const db = getDatabase()
                await push(ref(db, `users/${uid}/${folder}`), {
                    adres,
                    info,
                    name,
                    email,
                    menedger,
                })

                return true
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async createSkladSet(
            { commit, dispatch },
            { folder, adres, info, name, email, menedger }
        ) {
            try {
                const uid = await dispatch('getUid')
                const db = getDatabase()
                await set(ref(db, `users/${uid}/${folder}`), {
                    adres,
                    info,
                    name,
                    email,
                    menedger,
                })

                return true
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        // Site
        async createSitePush(
            { commit, dispatch },
            { folder, adres, info, name, email_user, email_zavod, btn }
        ) {
            try {
                const uid = await dispatch('getUid')
                const db = getDatabase()
                await push(ref(db, `users/${uid}/${folder}`), {
                    adres,
                    info,
                    name,
                    email_user,
                    email_zavod,
                    btn,
                })

                return true
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async createSiteSet(
            { commit, dispatch },
            { folder, adres, info, name, email_user, email_zavod, btn }
        ) {
            try {
                const uid = await dispatch('getUid')
                const db = getDatabase()
                await set(ref(db, `users/${uid}/${folder}`), {
                    adres,
                    info,
                    name,
                    email_user,
                    email_zavod,
                    btn,
                })

                return true
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        // Status
        // sklad

        async createStatusPush({ commit, dispatch }, { folder, name, mail }) {
            try {
                const uid = await dispatch('getUid')
                const db = getDatabase()
                await push(ref(db, `users/${uid}/${folder}`), {
                    name,
                    mail,
                })

                return true
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        // Получить данные с сеhвера

        async fetchValue({ commit, dispatch }, folder) {
            try {
                const uid = await dispatch('getUid')
                const db = getDatabase()
                let array = []

                await onValue(
                    ref(db, `/users/${uid}/${folder}`),
                    (snapshot) => {
                        const data = snapshot.val()

                        array.push(data)
                    }
                )

                return array

                // return Object.keys(arr[0]).map((key) => ({
                //     ...arr[0][key],
                //     id: key,
                // }))
            } catch (e) {
                console.log(e)
            }
        },
        ////////////////////////////////////

        // удаление  из базы данных
        async removeBd({ commit, dispatch }, folder) {
            let isAdmin = confirm('Данные будут удалены?')

            if (isAdmin)
                try {
                    const uid = await dispatch('getUid')
                    const db = getDatabase()
                    await remove(ref(db, `/users/${uid}/${folder}`))
                    return true
                } catch (e) {
                    commit('setError', e)
                    throw e
                }
            else return false
        },

        // удаление  из базы данных
        async removeFolder({ commit }, folder) {
            let isAdmin = confirm('Данные будут удалены?')

            if (isAdmin)
                try {
                    const db = getDatabase()
                    await remove(ref(db, folder))
                    return true
                } catch (e) {
                    commit('setError', e)
                    throw e
                }
            else return false
        },
    },
}

//  try {
//      // отправляем измененные данные на сервер - статус заказа Id
//      await this.$store.dispatch('createValueSet', status)

//      this.$store.dispatch('notic', 'Изменения статуса сохранены')
//  } catch (e) {
//      console.log(e)
//  }
