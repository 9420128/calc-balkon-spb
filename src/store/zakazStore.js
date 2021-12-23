/* eslint-disable */
import { getDatabase, ref, onValue } from 'firebase/database'
import { getAuth } from 'firebase/auth'

export const zakazStore = {
    state: () => ({
        // zakaz: {},
        user: {},
        data: {},
        uid: '',
        firma: [
            {
                name: 'ООО «Фенстер СПб»',
                id: '0',
                director: [
                    'Котковой Анастасии Владимировны',
                    'Коткова А.В.',
                    'Котковой А.В.',
                ],
                firma: `
            ООО «Фенстер СПб»
ИНН7810887697
БИК 044 030 790
Р/с 40702810790250000018
к/с 30101810900000000790
ОАО «Банк Санкт-Петербург»`,
            },
            {
                name: 'ООО «Монтаж-Строй»',
                id: '1',
                director: [
                    'Каруличева Николая Николаевича',
                    'Каруличев Н.Н.',
                    'Куруличева Н.Н.',
                ],
                firma: `
            ООО «Монтаж-Строй»
ИНН4720028871
БИК 044 030 790
Р/с 40702810790250000018
к/с 30101810900000000790
ОАО «Банк Санкт-Петербург»`,
            },
        ],
        usluga: [
            { id: 'Отделка балкона', name: 'Отделка балкона' },
            { id: 'Остекление балкона', name: 'Остекление балкона' },
            {
                id: 'Остекление и отделка балкона',
                name: 'Остекление и отделка балкона',
            },
            { id: 'Установка крыши балкона', name: 'Установка крыши балкона' },
        ],
        // zakaz_item: {},
        // page: 0,
        // page_caunt: 10,
        // zakaz_pagination: [],
        // filter_site: '',
        // filter_sklad: '',
        // filter_oplata: false,
    }),

    getters: {
        BD_UID(state) {
            return state.uid
        },

        BD_FIRMA(state) {
            return state.firma
        },

        BD_USLUGA(state) {
            return state.usluga
        },

        BD_USER_ALL(state) {
            const user_all = Object.keys(state.user).map((key) => ({
                ...state.user[key],
                id: key,
            }))

            if (user_all.length) return user_all
            else return false
        },

        BD_USER(state) {
            return state.user[state.uid]
        },

        BD_USER_PRISE(state) {
            return state.user[state.uid]?.prise
        },

        BD_PRISE_TABS(state, getters) {
            return getters.BD_USER?.prise?.tabs
        },

        BD_PRISE_CATALOG(state, getters) {
            return getters.BD_USER?.prise?.catalog
        },

        BD_PRISE_MATERIAL(state, getters) {
            return getters.BD_USER?.prise?.material
        },

        BD_PRISE_FORMULA(state, getters) {
            return getters.BD_USER?.prise?.formula
        },

        BD_PRISE_IZM(state, getters) {
            return getters.BD_USER?.prise?.izm
        },

        BD_DATA_ALL(state) {
            return state.data
        },

        // BD_ZAKAZ(state) {
        //     // return state.zakaz
        //     if (state.zakaz) {
        //         return Object.keys(state.zakaz).map((key) => ({
        //             ...state.zakaz[key],
        //             id: key,
        //         }))
        //     }
        // },
        // BD_ZAKAZ_SORT(state) {
        //     let aray = Object.keys(state.zakaz).map((key) => ({
        //         ...state.zakaz[key],
        //         id: key,
        //     }))
        //
        //     // ------ filter_site
        //     if (state.filter_site)
        //         aray = aray.filter((el) =>
        //             el.zakaz.site.includes(state.filter_site)
        //         )
        //     // ------
        //     if (state.filter_sklad)
        //         aray = aray.filter((el) =>
        //             el.zakaz.sklad.includes(state.filter_sklad)
        //         )
        //     // ------
        //     if (state.filter_oplata)
        //         aray = aray.filter((el) => !el.zakaz.oplata)
        //     // ------
        //
        //     const date_sort = aray.reduce((result, item) => {
        //         return result.includes(item.date)
        //             ? result
        //             : [...result, item.date]
        //     }, [])
        //
        //     date_sort.sort((a, b) => b - a)
        //
        //     let arr = []
        //
        //     date_sort.forEach((el) => {
        //         for (let i in aray) {
        //             if (el === aray[i].date) arr.push(aray[i])
        //         }
        //     })
        //
        //     return arr
        // },
        //
        // BD_ZAKAZ_PAGINATION(state, getters) {
        //     const arr = [...getters.BD_ZAKAZ_SORT]
        //
        //     if (state.page < 0) state.page = 1
        //
        //     if (
        //         arr &&
        //         arr.length > state.zakaz_pagination.length
        //         // state.page * flag + (arr.length - state.page * flag)
        //     ) {
        //         for (
        //             let i = (state.page - 1) * state.page_caunt;
        //             i < state.page * state.page_caunt;
        //             i++
        //         ) {
        //             if (!arr[i]) break
        //             state.zakaz_pagination.push(arr[i])
        //         }
        //     }
        //
        //     return state.zakaz_pagination
        // },
        //
        // BD_ZAKAZ_ITEM(state) {
        //     return state.zakaz_item
        // },
        //
        // BD_PAGE(state) {
        //     return state.page
        // },
        //
        // BD_PAGE_CAUNT(state) {
        //     return state.page_caunt
        // },
        //
        // BD_FILTER_SITE(state) {
        //     return state.filter_site
        // },
        //
        // BD_FILTER_SKLAD(state) {
        //     return state.filter_sklad
        // },
        // BD_FILTER_OPLATA(state) {
        //     return state.filter_oplata
        // },
    },
    mutations: {
        UID_CHANGE(state, val) {
            state.uid = val
        },

        USER_ALL_CHANGE(state, val) {
            state.user = val
        },

        // ZAKAZ_ALL_CHANGE(state, val) {
        //     state.zakaz = val
        // },

        DATA_ALL_CHANGE(state, val) {
            state.data = val
        },

        // dddd

        // ZAKAZ_ITEM_CHANGE(state, val) {
        //     state.zakaz_item = val
        // },
        // PAGE_CHANGE: (state, val) => {
        //     state.page = val
        // },
        // ZAKAZ_SORT_CHANGE: (state, val) => {
        //     state.zakaz_pagination = val
        // },
        // FILTER_SITE_CHANGE: (state, val) => {
        //     state.filter_site = val
        // },
        // FILTER_SKLAD_CHANGE: (state, val) => {
        //     state.filter_sklad = val
        // },
        // FILTER_OPLATA_CHANGE: (state, val) => {
        //     state.filter_oplata = val
        // },
    },
    actions: {
        // ID_MAP({ dispatch }, arr) {
        //     return Object.keys(arr).map((key) => ({
        //         ...arr[key],
        //         id: key,
        //     }))
        // },

        async USER_ALL_BUILD({ commit }) {
            const uid = await getAuth().currentUser.uid
            commit('UID_CHANGE', uid)
            const db = getDatabase()
            await onValue(ref(db, `/users`), (snapshot) => {
                const data = snapshot.val()
                commit('USER_ALL_CHANGE', data)
            })
        },

        async DATA_ALL_BUILD({ commit }) {
            // const uid = await getAuth().currentUser.uid
            const db = getDatabase()
            await onValue(ref(db, `/data`), (snapshot) => {
                const data = snapshot.val()
                commit('DATA_ALL_CHANGE', data)
                // commit('ZAKAZ_SORT_CHANGE', [])
                // commit('PAGE_CHANGE', 1)
            })
        },

        // CATALOG_ITEM({ state, commit }, { user, id }) {
        //     // commit('ZAKAZ_ITEM_CHANGE', state.data[user]?.catalog[id])
        //     return state.data[user]?.catalog[id]
        // },

        //
        // PAGE_BUILD({ state, commit }) {
        //     commit('PAGE_CHANGE', state.page + 1)
        // },

        // async ZAKAZ_ALL_BUILD({ commit }) {
        //     // const uid = await getAuth().currentUser.uid
        //     const db = getDatabase()
        //     await onValue(ref(db, `/data`), (snapshot) => {
        //         const data = snapshot.val()
        //         commit('ZAKAZ_ALL_CHANGE', data)
        //         commit('ZAKAZ_SORT_CHANGE', [])
        //         commit('PAGE_CHANGE', 1)
        //     })
        // },

        // async ZAKAZ_ITEM_BUILD({ commit }, id) {
        //     // commit('zakaz_CHANGE', value)
        //     const uid = await getAuth().currentUser.uid
        //     const db = getDatabase()
        //     await onValue(
        //         ref(db, `/users/${uid}/zakazAll/${id}`),
        //         (snapshot) => {
        //             const data = snapshot.val()
        //             commit('ZAKAZ_ITEM_CHANGE', data)
        //             // this.zakaz_BUILD(data)
        //         }
        //     )
        // },

        // PAGINATION_NULL_BUILD({ commit }, val) {
        //     commit('ZAKAZ_SORT_CHANGE', val)
        // },
        //
        // PAGE_NULL_BUILD({ commit }, val) {
        //     commit('PAGE_CHANGE', val)
        // },
        //
        // FILTER_SITE_BUILD({ commit }, val) {
        //     commit('FILTER_SITE_CHANGE', val)
        // },
        //
        // FILTER_SKLAD_BUILD({ commit }, val) {
        //     commit('FILTER_SKLAD_CHANGE', val)
        // },
        //
        // FILTER_OPLATA_BUILD({ commit }, val) {
        //     commit('FILTER_OPLATA_CHANGE', val)
        // },
    },
}
