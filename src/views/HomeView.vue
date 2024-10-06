<template>
  <main>
    <div v-for="post in sortedPosts" v-if="loggedUser">
      <Post :content="post.content" :id="post.user.id" :image="post.image" :user="post.user.username"
        :pfp="post.user.profile_image" :published="post.createdAt" :likes="post.likes.length" :comments="post.comments"
        :liked="isLiked(post.likes)" :postId="post.id" :likeId="likeId" />
    </div>
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

  async created() {
    await this.usersStore.fetchUser(this.loggedUser)
    await this.postsStore.fetchPosts()
    this.checkLoginExpiration();
  },

  components: {
    Post,
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

  computed: {
    loggedUser() {
      return this.usersStore.getUserLogged
    },

    loggedUserInfo() {
      return this.usersStore.getUser
    },

    sortedPosts() {
      let posts = []
      this.loggedUserInfo.posts?.forEach(post => { posts.push({ ...post, user: this.loggedUserInfo }) })
      this.loggedUserInfo.Following?.forEach(user => { user.posts.forEach(post => { posts.push({ ...post, user }) }) })

      return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },
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

div {
  margin-top: 1em;
}
</style>