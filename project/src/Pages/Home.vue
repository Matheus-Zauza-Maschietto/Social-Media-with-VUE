<template>
    <div id="home">
        <div class="newpost">
            <h2>Bem vindo de volta</h2>
            <span>Compartilhe seu dia</span>
            <textarea 
            placeholder="Oque está fazendo hoje ?"
            cols="30" rows="15"
            v-model="input">
            </textarea>
            <button @click="createPost">Compartilhar</button>
        </div>

        <div class="postarea loading" v-if="loading">
            <h2>Buscando posts ...</h2>
        </div>
        
        <div class="postarea loading" v-else>
            <article class="post" v-for="post in posts" :key="post.id">
                <h1>{{ post.autor }}</h1>
                <p>
                    {{ Max200Length(post.content) }}
                </p>

                <div class="action-post">
                    <button @click="likePost(post.id, post.likes)"> {{ post.likes == 0 ? 'curtir' : post.likes + " curtidas"}}</button>
                    <button>Veja post completo</button>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
import {db} from '../Services/firebaseConnection.js'
import {collection, addDoc, setDoc, doc, onSnapshot, orderBy, getDoc } from 'firebase/firestore'

export default {
    name: 'homeView',
    data(){
        return{
            input: "",
            user: {},
            loading: true,
            posts: []
        }
    },
    async created(){
        const user = localStorage.getItem('devpost');
        this.user = JSON.parse(user);

        onSnapshot(collection(db, "posts"), orderBy("created", "asc"),
            (snapshot) => {
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
                this.loading = false
            })
    },
    methods: {
        async createPost(){
            if(this.input === '')
            {
                return
            }

            await addDoc(collection(db, "posts"),
                {
                    created: new Date(),
                    content: this.input,
                    autor: this.user.nome,
                    userId: this.user.uid,
                    likes: 0
                })
                .then(() => 
                {
                    this.input = ''
                    console.log("Post criado")
                })
                .catch((e) => 
                {
                    console.log("erro ao criar o post: "+e)
                })
        },
        Max200Length(string){
            if(string.length > 200)
            {
                return string.substring(0, 200)+"..."
            }
            return string
        },
        async likePost(id, likes){
            const userId = this.user.uid
            const likeId = userId+"_"+id

            const document = await getDoc(doc(collection(db, 'likes'), likeId))
            if(document.data() !== undefined)
            {
                setDoc(doc(db, "posts", id), 
                {
                    likes: likes+1
                })
            }
        }
    },
    computed: {

    }
}
</script>

<style scoped>
#home{
    display: flex;
    flex-direction: row;
    margin: 25px;
}

@import "./home.css"
</style>