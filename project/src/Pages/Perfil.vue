<template>
    <div id="perfil">
        <div class="postarea loading" v-if="loading">
            <h2>Buscando posts...</h2>
        </div>
        <div v-else>
            <div class="headerPerfil">
                <h2>Olá {{nome}}</h2>
                <span>Já fez <strong>{{this.posts.length}}</strong> posts</span>
            </div>
            <div class="postarea">
                <article class="post" v-for="post in posts" :key='post.id'>
                    <h2>{{post.autor}}</h2>
                    <p>{{Max200Length(post.content)}}</p>
                    <div class="action-post">
                        <button @click="togglePostModal(post)">Veja post completo</button>
                    </div>
                </article>
            </div>
        </div>
        <ModalComponent v-if="showPostModal" :post="fullPost" @close="showPostModal = false" />
    </div>
</template>

<script>
import {db} from '../Services/firebaseConnection.js'
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import ModalComponent from '../components/Modal.vue';

export default {
    name: 'perfilView',
    data(){
        return{
            loading: true,
            showPostModal: false,
            fullPost: {},
            posts: [],
            nome: ''
        }
    },
    components: {
        ModalComponent
    },
    props: ['userId'],
    async created(){
        console.log(this.userId)
        const userLocal = localStorage.getItem('devpost')
        this.user = JSON.parse(userLocal)
        const q = query(collection(db, 'posts'), where('userId', '==', this.userId))

        onSnapshot(q, orderBy('created', 'desc'), snapshot => {
            this.posts = []
            snapshot.forEach(item =>
            {
                this.posts.push({
                    id: item.id,
                    autor: item.data().autor,
                    content: item.data().content,
                    likes: item.data().likes,
                    created: item.data().created,
                    userId: item.data().userId
                })
            })
            this.nome = this.posts[0].autor
            this.loading = false
        })
    },
    methods: {
        togglePostModal(post){
            this.showPostModal = !this.showPostModal

            if(this.showPostModal){
                this.fullPost = post;
            }
            else{
                this.post = {};
            }
        },
        Max200Length(string){
            if(string.length > 200)
            {
                return string.substring(0, 200)+"..."
            }
            return string
        }
    }


}
</script>

<style>

</style>