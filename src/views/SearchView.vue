<template>
    <main>
        <input type="text" id="search" v-model="search" placeholder="Search..." class="inter-light">
        <div id="users">
            <div v-for="user in filters" id="user">
                <router-link :to="{ name: 'profile', params: { username: user.id } }">
                    <img :src="user.profile_image" id="pfp">
                    <p class="inter-semiBold font-size-20">{{ user.username }}</p>
                </router-link>
            </div>
        </div>
    </main>
</template>

<script>
import { useUsersStore } from "@/stores/users";

export default {
    data() {
        return {
            usersStore: useUsersStore(),
            search: "",
        }
    },

    methods: {

    },

    computed: {
        users() {
            return this.usersStore.getUsers
        },

        filters() {
            if (this.search != "") {
                return this.users.filter((user) => user.username.toLowerCase().includes(this.search.toLowerCase()))
            } else {
                return ""
            }
        }
    },

    created() {
        this.usersStore.fetchUsers();
        this.checkLoginExpiration();
    },

    methods: {
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

    mounted() {
        this.checkLoginExpiration();
    },
}
</script>

<style scoped>
main {
    background-color: #FABE73;
    width: 100%;
    min-height: 100vh;
    margin: 0 0 4em 0 !important;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#search {
    background-color: #FAF0CA80;
    border-radius: 6px;
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    padding: 0.8rem 0.8rem;
    width: 24em;
    margin: 2em 0;
}

#search:focus {
    background-color: #FAF0CA;
}

#search::placeholder {
    color: #000000;
}

#users {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2em;
    row-gap: 2em;
}

#user {
    text-align: center
}

#pfp {
    border-radius: 100%;
    width: 10rem;
    height: 10rem;
    object-fit: cover;
}

a {
    text-decoration: none;
    color: #000000;
}
</style>