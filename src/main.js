import { createApp } from 'vue'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCf2FlwO4FSnk7z6hsWjwyg_meJ_i2s2CM',
    authDomain: 'balkon-a7d2c.firebaseapp.com',
    projectId: 'balkon-a7d2c',
    storageBucket: 'balkon-a7d2c.appspot.com',
    messagingSenderId: '262217519920',
    appId: '1:262217519920:web:b9309b5378e305ecf8eef5',
    measurementId: 'G-DV4QP0P63B',
}

// Initialize Firebase
initializeApp(firebaseConfig)

const auth = getAuth()

let appStart

onAuthStateChanged(auth, () => {
    if (!appStart) {
        appStart = createApp(App)

        // components.forEach((component) => {
        //     appStart.component(component.name, component)
        // })

        appStart.use(store).use(router).use(VueAxios, axios).mount('#app')
    }
})
