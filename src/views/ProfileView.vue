<template>
    <main>
        <img :src="user.profile_image" alt="user profile picture" id="pfp" />
        <div id="photoBtn">
            <button id="editPfp" class="inter-light" @click="triggerFileInput" name="inputProfilePicture"
                v-if="user.id == loggedUser">Change picture</button>
            <input type="file" ref="fileInput" name="inputProfilePicture" style="display: none"
                @change="updateProfilePicture" />
        </div>
        <h2 class="inter-semiBold">{{ user.username }}</h2>
        <div id="follows">
            <h3 class="inter-regular">{{ user.Followers?.length }} Followers</h3>
            <h3 class="inter-regular">{{ user.Following?.length }} Following</h3>
        </div>
        <div id="editInfoProfile" v-if="editing && user.id == loggedUser">
            <h3 class="inter-medium font-size-20">Username</h3>
            <input type="text" :placeholder="user.username" class="inter-light font-size-20" v-model="newUsername">

            <h3 class="inter-medium font-size-20">Password</h3>
            <input type="password" placeholder="●●●●●●●" class="inter-light font-size-20" v-model="newPassword">

            <h3 class="inter-medium font-size-20">Email</h3>
            <input type="text" :placeholder="user.email" class="inter-light font-size-20" v-model="newEmail">
            <div class="error-message">
                <p v-if="showError" class="font-size-12 inter-medium">{{ errorMessage }}</p>
            </div>
            <div class="confirmation-message">
                <p v-if="showConfirmation" class="font-size-13 inter-medium">{{ confirmationMessage }}</p>
            </div>
        </div>
        <div id="btns" v-if="user.id == loggedUser">
            <button id="editInfo" class="inter-light" name="inputInfo" v-if="!editing" @click="toggleEdit">Edit
                details</button>
            <button id="editInfo" class="inter-bold" name="inputInfo" v-if="editing" @click="editProfile">Save</button>
            <button id="editInfo" class="inter-light" name="inputInfo" v-if="editing"
                @click="editing = false">Cancel</button>
            <router-link :to="{ name: 'login' }" @click="usersStore.logout"><button class="inter-semiBold"
                    id="logout">Logout</button></router-link>
        </div>
        <div v-else>
            <button id="follow" class="inter-light" @click="followUser" v-if="!userFollows">Follow</button>
            <button id="unfollow" class="inter-light" v-else @click="unfollowUser">Unfollow</button>
        </div>
        <div id="userPosts">
            <div v-for="post in posts" :key="post.id">
                <UserPost :image="post.image" :published="post.createdAt" />
            </div>
        </div>
    </main>
</template>

<script>
import { useUsersStore } from "@/stores/users";
import UserPost from '@/components/UserPost.vue'

export default {
    data() {
        return {
            usersStore: useUsersStore(),
            editing: false,
            newUsername: '',
            newPassword: '',
            newEmail: '',
            errorMessage: '',
            confirmationMessage: '',
            showError: false,
            showConfirmation: false,
        }
    },

    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },

        async updateProfilePicture(event) {
            try {
                const file = event.target.files[0];
                if (!file) {
                    console.error('Nenhuma imagem selecionada.');
                    return;
                }

                let formData = new FormData()
                formData.append("inputProfilePicture", file)
                const result = await this.usersStore.updateProfilePicture(formData, this.loggedUser);
                if (result.success) {
                    this.user.profile_image = result.profile_image;
                } else {
                    console.error(result);
                }
            } catch (err) {
                console.error('Erro:', err);
            }
        },

        editProfile() {
            this.showError = false
            this.showConfirmation = false
            let fields = {};
            if (this.newUsername != "") fields.username = this.newUsername
            if (this.newEmail != "") fields.email = this.newEmail
            if (this.newPassword != "") fields.password = this.newPassword

            this.usersStore.editProfile(fields, this.loggedUser)
                .then(() => {
                    this.fetchUserData()
                    this.showConfirmation = true
                    this.confirmationMessage = 'Changes successful'
                    setTimeout(() => { this.toggleEdit() }, 1000)
                })
                .catch((error) => {
                    if (error == 'Error: API request failed with status 400: {"success":false,"msg":["username must be unique"]}') {
                        this.showError = true
                        this.errorMessage = 'Username unavailable'
                    } else {
                        console.error('Error:', error);
                        this.showError = true
                        this.errorMessage = 'An error occurred. Please try again later.';
                    }
                });

            this.newUsername = ""
            this.newEmail = ""
            this.newPassword = ""
        },

        fetchUserData() {
            this.usersStore.fetchUser(this.$route.params.username)
        },

        toggleEdit() {
            return this.editing = !this.editing
        },

        followUser() {
            this.usersStore.follow(this.$route.params.username)
            location.reload()
        },

        unfollowUser() {
            this.usersStore.unfollow(this.$route.params.username)
            location.reload()
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
        user() {
            return this.usersStore.getUser
        },

        loggedUser() {
            return this.usersStore.getUserLogged
        },

        posts() {
            return this.usersStore.getUserPosts
        },

        userFollows() {
            return this.user.Followers?.some(follower => follower.id == this.loggedUser)
        },
    },

    async created() {
        await this.usersStore.fetchUser(this.$route.params.username)
        await this.usersStore.findUserPosts(this.$route.params.username)
        this.checkLoginExpiration();
    },

    components: {
        UserPost,
    },

    watch: {
        '$route.params.username': {
            immediate: true,
            async handler() {
                await this.usersStore.fetchUser(this.$route.params.username)
                await this.usersStore.findUserPosts(this.$route.params.username)
            }
        },
    },

    mounted() {
        this.checkLoginExpiration();
    },
}
</script>

<style scoped>
main {
    background-color: #FFA987;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    margin: 0 0 4em 0 !important;
    padding: 4em 4em;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#pfp {
    border-radius: 100%;
    width: 10em;
    height: 10em;
    object-fit: cover;
}

#editPfp,
#logout,
#editInfo,
#follow,
#unfollow {
    border-radius: 50px;
    background-color: #FAF0CA90;
    padding: 0.8em;
    margin-top: 1em;
    width: 9rem;
}

#editPfp:hover,
#editInfo:hover,
#logout:hover,
#follow:hover,
#unfollow:hover {
    background-color: #FAF0CA;
}

#infoProfile,
#editInfoProfile {
    margin-top: 2em;
}

#infoProfile p {
    margin-bottom: 1em;
}

a {
    color: #000000;
}

#btns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1em;
    justify-items: center;
    align-items: center;
}

#editInfoProfile input {
    margin-bottom: 1em;
}

#editInfoProfile input::placeholder {
    color: #000000;
}

input {
    background-color: #FAF0CA90;
    padding: 1rem 0.8rem;
    width: 14em;
    border-radius: 6px;
    border: none;
    outline: none;
}

input:focus {
    background-color: #FAF0CA;
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

#follows {
    display: flex;
    column-gap: 3.5em;
    margin-top: 1em;
}

h2 {
    margin-top: 0.5em;
    color: #FAF0CA;
}

#userPosts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.8em;
    row-gap: 0.8em;
    margin-top: 2em;
}
</style>