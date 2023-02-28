<template>
    <div id="dashboard">
        <h2>Minha conta</h2>
        <span>atualize seu perfil</span>
        <form @submit.prevent="updateProfile">
            <label for="">Nome:</label>
            <input type="text" v-model="nome" id="name" :placeholder="user.nome">

            <button class="button" type="submit">Atualizar Perfil</button>
            <button class="button logout" @click="logOut()">Sair</button>
        </form>
    </div>
</template>

<script>
import { app, db } from '../Services/firebaseConnection.js'
import { getAuth, signOut} from 'firebase/auth'
import { doc, setDoc, where, query, collection, getDocs, updateDoc } from 'firebase/firestore'

export default {
name: 'dashboardView',
data(){
    return{
        nome: '',
        user: {}
    }
},
async created(){
    const userLocal = localStorage.getItem('devpost')
    this.user = JSON.parse(userLocal)
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
    },
    async updateProfile(){
        if(this.nome === ''){
            return
        }

        await setDoc(doc(db, 'users', this.user.uid), {
            nome: this.nome
        })

        const q = query(collection(db, 'posts'), where('userId', '==', this.user.uid))
        const postDocs = await getDocs(q)
        
        postDocs.forEach(async item => {
            await updateDoc(doc(db, 'posts', item.id), {
                autor: this.nome
            })
        })

        localStorage.setItem('devpost', JSON.stringify({uid: this.user.uid, nome: this.nome}))
        
        alert('Perfil atualizado com sucesso')
    }
}
}
</script>

<style>
    #dashboard{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 60px;
        padding: 15px 20px;
        width: 600px;
        max-width: 600px;
        background: #4c5059;
        box-shadow: 0 0 10px #00000021;
    }
    h2{
        color: #fff;
    }
    span{
        color: #fff;
        margin-bottom: 25px;
    }
    form{
        width: 500px;
        display: flex;
        flex-direction: column;
    }

    form label{
        font-size: 18px;
        color: #fff;
        padding-bottom: 5px;
    }

    form input{
        height: 30px;
        padding: 5px;
        font-size: 17px;
        border: 0;
        outline: none;
        margin-bottom: 5px;
        background: #fafafa;
    }

    button{
        cursor: pointer;
        margin-top: 10px;
        height: 35px;
        border: 0;
        background: #7289DA;
        color: #fff;
        font-size: 17px;
    }

    button.logout{
        widows: 500px;
        background: #e36d6d;
        color: #fff;
    }
</style>