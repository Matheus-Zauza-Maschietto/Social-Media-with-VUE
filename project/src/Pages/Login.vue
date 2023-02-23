<template>
    <div id="login">
        <div class="loginArea" v-if="login">
            <h1>entrar</h1>
            <form action="" @submit.prevent="handleLogin">
                <input type="text" placeholder="email@email.com" v-model="email">
                <input type="password" placeholder="Sua senha" v-model="password">
                <button type="submit">Acessar</button>
            </form>
            <a @click="toggleBtn">Criar sua conta</a>
        </div>

        <div class="loginArea" v-else>
            <h1>entrar</h1>
            <form action="" @submit.prevent="handleRegister">
                <input type="text" placeholder="Nome" v-model="nome">
                <input type="text" placeholder="email@email.com" v-model="email">
                <input type="password" placeholder="Sua senha" v-model="password">
                <button type="submit">Cadastrar</button>
            </form>
            <a @click="toggleBtn">Já possuo uma conta</a>
        </div>
    </div>
</template>

<script>
import {db, app} from '../Services/firebaseConnection.js'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {setDoc, doc, collection, getDoc} from '@firebase/firestore'

export default {
    name: 'loginView',
    data(){
        return{
            nome: '',
            email: '',
            password: '',
            login: true
        }
    },
    methods: {
        toggleBtn(){
            this.login = !this.login
            this.email = ''
            this.password = ''
            this.nome = ''
        },
        async handleRegister(){
            const {user} = await createUserWithEmailAndPassword(getAuth(), this.email, this.password)
            await setDoc(doc(db, "users", user.uid), 
            {
                nome: this.nome
            })
            .then(async () => 
                {
                    const usuarioLogado = {
                        nome: this.nome
                    }
                    localStorage.setItem('devpost', JSON.stringify(usuarioLogado))
                })
            .catch((e) => 
                {
                    console.log("ERRO AO CADASTRAR: "+e)
                })
            this.$router.push('/')
        },
        async handleLogin(){
            const {user} = await signInWithEmailAndPassword(getAuth(app), this.email, this.password);
            const userProfile = await getDoc(doc(collection(db, 'users'), user.uid))
            user.reload()
            localStorage.setItem('devpost', JSON.stringify({uid: userProfile.id, nome: userProfile.data().nome}))
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
    h1{
        text-align:  center;
        color: white;
    }
    .loginArea{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        margin-top: 65px;
        max-width: 600px;
        background-color: #4c5059;
        border-radius: 5px;
    }
    form{
        display: flex;
        flex-direction: column;
        margin:  0px 25px;
    }
    input{
        margin-bottom: 10px;
        height: 30px;
        widows: 300px;
        font-size: 18px;
        padding: 10px;
        outline: none;
        border: 0;
        background: rgb(241, 421, 421);
    }

    button{
        height: 35px;
        border: 0;
        background-color: #7289DA;
        color: #FFF;
        font-size: 16px;
        font-weight: 600;
        outline: none;
        cursor: pointer;
    }

    .loginArea a{
        margin-top: 20px;
        text-decoration: none;
        color: #FFF;
        cursor: pointer;
    }
</style>