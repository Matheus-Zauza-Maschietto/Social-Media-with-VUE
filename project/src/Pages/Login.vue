<template>
    <div id="login">
        <div class="loginArea" v-if="login">
            <h1>entrar</h1>
            <form action="" @submit.prevent="">
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
import db from '../Services/firebaseConnection.js'
//import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { collection, addDoc } from '@firebase/firestore'

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
            // const {user} = await createUserWithEmailAndPassword(getAuth(), this.email, this.password)
            // console.log(db)
            // addDoc(collection("users"), {
            //     nome: this.nome
            // })
            // .then(async () => {
            //     const usuarioLogado = {
            //         uid: user.uid,
            //         nome: this.nome
            //     }
            //     console.log(usuarioLogado)
            //     localStorage.setItem('devpost', JSON.stringify(usuarioLogado))
            // })
            // .catch(()=>{
            //     console.log("Deu erro no cadastro")
            // })

            // this.$router.push('/')
            await addDoc(collection(db, "users"), {
                first: "Alan",
                middle: "Mathison",
                last: "Turing",
                born: 1912
            });
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