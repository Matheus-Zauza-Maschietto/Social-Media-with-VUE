import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import {getAuth} from 'firebase/auth'
import {app} from './Services/firebaseConnection.js'


getAuth(app).onAuthStateChanged(() => {
    createApp(App).use(router).mount('#app')
})
