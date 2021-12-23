import { createStore } from 'vuex'
import firebase from './firebase'
import auth from './auth'
import notic from '../function/notic'
import sum_str from '../function/sum_str'
import { zakazStore } from './zakazStore'

export default createStore({
    state: {
        error: null,
        query: null,
        // paginationsPage: 1,
        // modalMap: null,
        // valSearch: null,
        // sidenav: false,
    },
    mutations: {
        setError(state, error) {
            state.error = error
        },
        clearError(state) {
            state.error = null
        },
        BD_CHANGE: (state, val) => {
            state.query = val
        },
        // PAGINATIONS_CHANGE: (state, val) => {
        //     state.paginationsPage = val
        // },
        // MODAL_MAP_CHANGE: (state, val) => {
        //     state.modalMap = val
        // },
        // SEARCH_CHANGE: (state, val) => {
        //     state.valSearch = val
        // },
        // SIDENAV_CHANGE: (state, val) => {
        //     state.sidenav = val
        // },
    },
    actions: {
        BD_BUILD({ commit }, value) {
            commit('BD_CHANGE', value)
        },
        // PAGINATIONS_BUILD({ commit }, value) {
        //     commit('PAGINATIONS_CHANGE', value)
        // },
        // MODAL_MAP_BUILD({ commit }, value) {
        //     commit('MODAL_MAP_CHANGE', value)
        // },
        // SEARCH_BUILD({ commit }, value) {
        //     commit('SEARCH_CHANGE', value)
        // },
        // SIDENAV_BUILD({ commit }, value) {
        //     commit('SIDENAV_CHANGE', value)
        // },
    },
    getters: {
        error: (s) => s.error,
        BD_LINC(state) {
            return state.query
        },
        // PAGINATIONS_PAGE(state) {
        //     return state.paginationsPage
        // },
        // MODAL_MAP(state) {
        //     return state.modalMap
        // },
        // SEARCH_MAP(state) {
        //     return state.valSearch
        // },
        // SIDENAV(state) {
        //     return state.sidenav
        // },
    },

    modules: {
        auth,
        firebase,
        notic,
        zakazStore,
        sum_str,
    },
})
