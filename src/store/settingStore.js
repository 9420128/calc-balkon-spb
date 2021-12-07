/* eslint-disable */
import { getDatabase, ref, onValue } from 'firebase/database'
import { getAuth } from 'firebase/auth'

export const settingStore = {
    state: () => ({
        // setting: {},
        // status_item: '',
        material_f: [
            '(h*w)/1000000',
            'h/1000+w/1000',
            '(h/1000+w/1000)*2',
            'h',
            'w',
            '(h/1000)*2',
            '(w/1000)*2',
        ],
        material_i: ['м/кв', 'м/п', 'заказ', 'этаж', 'точка', 'слой', 'шт.'],
    }),

    getters: {
        BD_MATERIAL_F(state) {
            return state.material_f
        },

        BD_MATERIAL_I(state) {
            return state.material_i
        },

        // BD_SETTING(state) {
        //     return state.setting
        // },
        // BD_SKLAD(state) {
        //     // return state.setting
        //     if (state.setting.sklad)
        //         return Object.keys(state.setting.sklad).map((key) => ({
        //             ...state.setting.sklad[key],
        //             id: key,
        //         }))
        // },
        // BD_SITE(state) {
        //     // return state.setting
        //     if (state.setting.site)
        //         return Object.keys(state.setting.site).map((key) => ({
        //             ...state.setting.site[key],
        //             id: key,
        //         }))
        // },
        // BD_SITE_KEY(state) {
        //     return state.setting.site ?? ''
        // },
        // BD_STATUS_USER(state) {
        //     // return state.setting
        //     if (state.setting.status)
        //         return Object.keys(state.setting.status.user).map((key) => ({
        //             ...state.setting.status.user[key],
        //             id: key,
        //         }))
        // },
        // BD_STATUS_ZAVOD(state) {
        //     // return state.setting
        //     if (state.setting.status)
        //         return Object.keys(state.setting.status.zavod).map((key) => ({
        //             ...state.setting.status.zavod[key],
        //             id: key,
        //         }))
        // },
        // STATUS_ITEM(state) {
        //     return state.status_item
        // },
    },
    mutations: {
        // SETTING_CHANGE(state, val) {
        //     state.setting = val
        // },
        // SKLAD_CHANGE(state, val) {
        //     state.sklad = val
        // },
        // STATUS_ITEM_CHANGE(state, val) {
        //     state.status_item = val
        // },
    },
    actions: {
        // async SETTING_BUILD({ commit }) {
        //     // commit('SETTING_CHANGE', value)
        //     const uid = await getAuth().currentUser.uid
        //     const db = getDatabase()
        //     await onValue(ref(db, `/users/${uid}/setting`), (snapshot) => {
        //         const data = snapshot.val()
        //         commit('SETTING_CHANGE', data)
        //         // this.SETTING_BUILD(data)
        //     })
        // },
        //
        // SETTING_MAIL({ dispatch }, mail) {
        //     var value = ''
        //     for (var key in mail) {
        //         value += mail[key]
        //     }
        //     return value
        // },
        //
        // STATUS_ITEM_BUILD({ commit }, val) {
        //     commit('STATUS_ITEM_CHANGE', val)
        // },
        //
        // DATE_BUILD({ commit }, date) {
        //     date = new Date(date)
        //     if (date == 'Invalid Date' || !date) return 'Дата отсутствует'
        //     var dd = date.getDate()
        //     if (dd < 10) dd = '0' + dd
        //
        //     var mm = date.getMonth() + 1
        //     if (mm < 10) mm = '0' + mm
        //
        //     var yy = date.getFullYear() % 100
        //     if (yy < 10) yy = '0' + yy
        //
        //     //
        //     // var days = [
        //     //     'Воскресенье',
        //     //     'Понедельник',
        //     //     'Вторник',
        //     //     'Среда',
        //     //     'Четверг',
        //     //     'Пятница',
        //     //     'Суббота',
        //     // ]
        //     // var n = date.getDay()
        //
        //     return dd + '.' + mm + '.20' + yy
        // },
    },

    // async setting_render() {
    //     const uid = await getAuth().currentUser.uid
    //     const db = getDatabase()
    //     await onValue(ref(db, `/users/${uid}/setting`), (snapshot) => {
    //         const data = snapshot.val()
    //         this.SETTING_BUILD(data)
    //     })
    // },
}
