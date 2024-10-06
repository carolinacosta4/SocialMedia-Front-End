<template>
    <main>
        <h2 class="inter-bold font-size-24">Create a post</h2>
        <form @submit.prevent="createPost">
            <input type="text" v-model="content" name="content" id="inputContent" placeholder="Description"
                class="font-size-14 inter-light">
            <v-file-input name="image" class="inter-light" v-model="image" variant="solo-inverted" color="#ffffff"
                bg-color="#EE964B80" label="Select an image" prepend-icon=""
                :style="{ width: '15.7em', 'border-radius': '6px', height: '3.3125em' }" :flat="true"></v-file-input>
            <div class="error-message">
                <p v-if="showError" class="font-size-13 inter-medium">{{ errorMessage }}</p>
            </div>
            <div class="confirmation-message">
                <p v-if="showConfirmation" class="font-size-13 inter-medium">{{ confirmationMessage }}</p>
            </div>
            <button type="submit" class="button-orange font-size-20">Create</button>
        </form>
    </main>
</template>


<script>
import { useUsersStore } from "@/stores/users";
import { usePostsStore } from "@/stores/posts";

export default {
    data() {
        return {
            usersStore: useUsersStore(),
            postsStore: usePostsStore(),
            showError: false,
            errorMessage: '',
            showConfirmation: false,
            confirmationMessage: '',
            image: null,
            content: ''
        }
    },

    methods: {
        async createPost() {
            if (this.content != '' && this.image != null) {
                let formData = new FormData()
                formData.append("content", this.content)
                formData.append("inputPostImage", this.image)

                await this.postsStore.createPost(formData)
                this.showConfirmation = true
                this.confirmationMessage = 'Post created successfully!'
                this.showError = false

                setTimeout(() => { this.$router.push({ name: 'home' }) }, 3000);
            } else {
                this.showError = true
                this.errorMessage = 'Missing information';
            }
        },

        checkLoginExpiration() {
            const loginTime = localStorage.getItem('loginTime');
            if (loginTime) {
                const currentTime = Date.now();
                const oneMinuteInMs = 1 * 60 * 1000;
                if (currentTime - loginTime > oneMinuteInMs) {
                    localStorage.removeItem('loginInfo');
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    this.$router.push({ name: 'login' })
                }
            }
        }
    },

    created() {
        this.checkLoginExpiration();
    },

    mounted() {
        this.checkLoginExpiration();
    },
}
</script>

<style scoped>
main {
    background-color: #F7E294;
    width: 100%;
    min-height: 100vh;
    margin: 0 0 4em 0 !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h2 {
    margin-bottom: 2em;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.5em;
}

input {
    background-color: #EE964B80;
    padding: 1rem 0.8rem;
    width: 18em;
    border-radius: 6px;
    border: none;
    outline: none;
}

input:focus {
    background-color: #EE964B;
}

::placeholder {
    color: #000000;
}

p {
    margin-bottom: -1em;
}

#divPrivacy {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.error-message {
    color: red;
    margin-top: -0.5em;
    margin-bottom: 1em;
    text-align: center;
}

.confirmation-message {
    color: green;
    margin-top: -1em;
    margin-bottom: 1em;
    text-align: center;
}

.login {
    margin-top: 0.5rem;
}

a {
    text-decoration: none;
    color: #000000;
}
</style>