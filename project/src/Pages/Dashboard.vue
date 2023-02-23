<template>
    <div id="dashboard">
        <h1>dashboard</h1>
        <button @click="logOut">Sair</button>
    </div>
</template>

<script>
import {app} from '../Services/firebaseConnection.js'
import { getAuth, signOut} from 'firebase/auth'
export default {
name: 'dashboardView',
data(){
    return{

    }
},
methods: {
    async logOut(){
        const confirm = window.confirm("Realmente deseja sair ?")
        const auth = getAuth(app)
        if(confirm){
            await signOut(auth)
            .then(() =>
                {
                    localStorage.removeItem("devpost");
                    this.$router.push('/login')
                })
        }
        else{
            return;
        }
    }
}
}
</script>

<style>

</style>