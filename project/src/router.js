import { createWebHistory, createRouter} from "vue-router";

import firebase from './Services/firebaseConnection.js'
import Home from './Pages/Home.vue'
import Dashboard from './Pages/Dashboard.vue'
import Login from './Pages/Login.vue'
import Perfil from './Pages/Perfil.vue'

const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            requireAuth: true
        }
    },
    
    {
        path: '/dashboard',
        component: Dashboard,
        meta: {
            requireAuth: true
        }
    },
    
    {
        path: '/perfil/:userid',
        component: Perfil,
        props: true,
        meta: {
            requireAuth: true
        }
    },
    
    {
        path: '/login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some( x => x.meta.requireAuth)
    if(requiresAuth && !firebase.auth().currenctUser){
        next('/login')
    }
    else{
        next()
    }
})

export default router