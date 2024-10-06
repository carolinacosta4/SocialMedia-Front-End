<template>
    <main v-if="post && post.user">
        <Post :content="post.content" :id="post.user.id" :image="post.image" :user="post.user.username"
            :pfp="post.user.profile_image" :published="post.createdAt" :likes="post.likes.length"
            :comments="post.comments" :liked="isLiked(post.likes)" :postId="post.id" :likeId="likeId" />
    </main>
</template>

<script>
import { useUsersStore } from "@/stores/users";
import { usePostsStore } from "@/stores/posts";
import Post from '@/components/Post.vue'

export default {
    data() {
        return {
            usersStore: useUsersStore(),
            postsStore: usePostsStore(),
            likeId: 0,
        }
    },

    methods: {
        isLiked(likes) {
            const like = likes.find(like => like.user.id == this.loggedUser)
            if (like != undefined) {
                this.likeId = like.id
                return true
            }
            this.likeId = 0
            return false
        },

        checkLoginExpiration() {
            const loginTime = localStorage.getItem('loginTime');
            if (loginTime) {
                const currentTime = Date.now();
                const oneMinuteInMs = 1 * 60 * 1000;
                if (currentTime - loginTime > oneMinuteInMs) {
                    localStorage.removeItem('loginInfo');
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('loginTime');
                    this.$router.push({ name: 'login' })
                }
            }
        },
    },

    components: {
        Post,
    },

    computed: {
        post() {
            return this.postsStore.getPost
        },

        loggedUser() {
            return this.usersStore.getUserLogged
        },
    },

    created() {
        this.postsStore.fetchPost(this.$route.params.id);
        this.checkLoginExpiration()
    },

    mounted() {
        this.checkLoginExpiration();
    },
}
</script>

<style scoped>
main {
    background-color: #FAF0CA;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    margin: 0 0 4em 0 !important;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>