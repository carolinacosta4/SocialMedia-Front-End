<template>
    <div id="post" v-if="$route.name != 'post'" style="background-color: #EE964B; width: 20rem; height: 25rem;">
        <div id="poster" style="margin: 0.8em 0 0.8em 1em;">
            <router-link :to="{ name: 'profile', params: { username: id } }">
                <img :src="pfp" alt="user profile picture" id="pfp" style="width: 1.5rem; height: 1.5rem;">
                <p id="username" class="inter-semiBold font-size-16">{{ user }}</p>
            </router-link>
        </div>
        <div id="postCover">
            <img :src="image" id="cover" style="width: 18rem; height: 15em;" />
        </div>
        <div id="postStats" style="margin: 0.4em 0 0 1em;">
            <span class="material-symbols-outlined" v-if="!isLiked" @click="likePost">favorite</span>
            <img src="@/assets/favorite.svg" alt="" v-else @click="unlikePost()">
            <p class="inter-semiBold font-size-16">{{ likeCount }}</p>
            <router-link :to="{ name: 'post', params: { id: postId } }"
                class="material-symbols-outlined">comment</router-link>
            <p class="inter-semiBold font-size-16">{{ comments.length }}</p>
            <span class="material-symbols-outlined">share</span>
        </div>
        <router-link :to="{ name: 'post', params: { id: postId } }" v-if="comments.length > 0" id="viewComments"
            class="inter-semiBold font-size-13">View comments</router-link>
        <div id="postDescription" style="margin: 0 0 0.2em 1.1em;">
            <p id="username" class="inter-semiBold font-size-14">{{ user }}</p>
            <h3 class="inter-light font-size-14" id="description">{{ content }}</h3>
        </div>
        <p id="date" class="inter-light font-size-10" style="margin: 0.1em 0 0 1.8em;">{{ postDate }} ● {{ postTime }}
        </p>
    </div>

    <div id="post" v-else style="width: 24rem; height: 100%; margin-top: 1.5em;">
        <div id="poster" style="margin: 0 0 0.8em 0.1em;">
            <router-link :to="{ name: 'profile', params: { username: id } }">
                <img :src="pfp" alt="user profile picture" id="pfp" style="width: 2.5rem; height: 2.5rem;">
                <p id="username" class="inter-semiBold font-size-18">{{ user }}</p>
            </router-link>
        </div>
        <div id="postCover">
            <img :src="image" id="cover" style="width: 24rem; height: 20em;" />
        </div>
        <div id="postStats" style="margin: 0.5em 0 0 0.1em;">
            <span class="material-symbols-outlined" v-if="!isLiked" @click="likePost"
                style="font-size: 30px;">favorite</span>
            <img src="@/assets/favorite.svg" style="width: 1.8em;" v-else @click="unlikePost()">
            <p class="inter-semiBold font-size-18">{{ likeCount }}</p>
            <router-link :to="{ name: 'post', params: { id: postId } }" class="material-symbols-outlined"
                style="font-size: 30px;">comment</router-link>
            <p class="inter-semiBold font-size-18">{{ comments.length }}</p>
            <span class="material-symbols-outlined" style="font-size: 30px;">share</span>
        </div>
        <div id="postDescription" style="margin: 0.4em 0 0.2em 0.1em;">
            <p id="username" class="inter-semiBold font-size-18">{{ user }}</p>
            <h3 class="inter-light font-size-18" id="description">{{ content }}</h3>
        </div>
        <p id="date" class="inter-light font-size-12" style="margin: 0 0 0.8em 0.1em;">{{ postDate }} ● {{ postTime }}
        </p>
        <div id="commentSection" v-if="$route.name == 'post'">
            <hr>
            <div id="newComment">
                <input type="text" placeholder="Write a comment..." class="inter-light" v-model="newComment">
                <button class="inter-regular" @click="commentPost">Post</button>
            </div>
            <div v-for="comment in comments" id="comment">
                <img :src="comment.user.profile_image" id="pfp" style="width: 2.5rem; height: 2.5rem;">
                <div>
                    <p class="inter-semiBold font-size-14">{{ comment.user.username }}</p>
                    <p class="inter-light font-size-12">{{ comment.content }}</p>
                </div>
                <p class="inter-light font-size-10" id="dateComments">{{ new
                    Date(comment.createdAt).toLocaleDateString() }} ● {{ new
                        Date(comment.createdAt).toLocaleTimeString() }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { useUsersStore } from "@/stores/users";
import { usePostsStore } from "@/stores/posts";

export default {
    props: {
        content: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            required: true,
        },

        user: {
            type: String,
            required: true,
        },

        id: {
            type: Number,
            required: true,
        },

        pfp: {
            type: String,
            required: true,
        },

        published: {
            type: String,
            required: true
        },

        likes: {
            type: Number,
            required: true,
        },

        comments: {
            type: Array,
            required: true,
        },

        liked: {
            type: Boolean,
            required: true,
        },

        postId: {
            type: Number,
            required: true,
        },

        likeId: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            usersStore: useUsersStore(),
            postsStore: usePostsStore(),
            isLiked: this.liked,
            likeCount: this.likes,
            IDLike: this.likeId,
            newComment: "",
        };
    },

    computed: {
        loggedUser() {
            return localStorage.getItem("loginInfo").loggedUser
        },

        postDate() {
            return new Date(this.published).toLocaleDateString()
        },

        postTime() {
            return new Date(this.published).toLocaleTimeString()
        },
    },

    methods: {
        async likePost() {
            if (!this.isLiked) {
                const response = await this.postsStore.like(this.postId)
                this.isLiked = true
                this.likeCount += 1
                this.IDLike = response.data.id
            }
        },

        async unlikePost() {
            if (this.isLiked) {
                await this.postsStore.unlike(this.postId, this.IDLike)
                this.IDLike = 0
                this.isLiked = false
                this.likeCount -= 1
            }
        },

        async commentPost() {
            await this.postsStore.comment(this.postId, this.newComment)
            location.reload()
        },
    },
};
</script>

<style scoped>
#post {
    border-radius: 20px;
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;
}

#postCover {
    display: flex;
    justify-content: center;
}

#cover {
    object-fit: cover;
    border-radius: 5px;
}

#postDescription {
    display: flex;
    column-gap: 0.6rem;
    align-items: center;
    text-align: left;
}

#pfp {
    border-radius: 100%;
    object-fit: cover;
}

#poster a {
    display: flex;
    align-items: center;
}

a {
    text-decoration: none;
    color: #000000;
    display: flex;
    column-gap: 0.6rem;
}

#postStats {
    display: flex;
    align-items: center;
    column-gap: 0.5em;
    color: #F4D35E;
}

#postStats p {
    margin-right: 1em;
}

#viewComments {
    margin: 0.4em 0 0 1.3em;
}

.material-symbols-outlined {
    color: #F4D35E;
}

hr {
    border-color: #F4D35E;
    border-radius: 10px;
}

#newComment {
    margin: 1.5em 0;
    display: flex;
    column-gap: 1em;
}

#newComment input {
    background-color: #F4D35E80;
    padding: 1rem 0.8rem;
    width: 20em;
    border-radius: 6px;
    border: none;
    outline: none;
}

#newComment input:focus {
    background-color: #F4D35E;
}

#newComment input::placeholder {
    color: #000000;
}

#newComment button {
    background-color: #F4D35E80;
    padding: 1rem 0.8rem;
    width: 4em;
    border-radius: 20px;
}

#newComment button:hover {
    background-color: #F4D35E;
}

#comment {
    display: flex;
    column-gap: 1em;
    width: 24rem;
    margin-bottom: 1em;
}

#dateComments {
    text-align: right;
    flex-grow: 2;
}
</style>