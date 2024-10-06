<template>
    <div id="navigation" v-if="$route.name != 'login' && $route.name != 'register' && loggedUser">
        <router-link :to="{ name: 'home' }">
            <span class="material-symbols-outlined full" v-if="$route.name == 'home'"><img src="@/assets/home.svg"
                    class="icon"></span>
            <span class="material-symbols-outlined" v-else>home</span>
        </router-link>
        <router-link :to="{ name: 'search' }">
            <span class="material-symbols-outlined full" v-if="$route.name == 'search'"><img src="@/assets/search.svg"
                    class="icon"></span>
            <span class="material-symbols-outlined" v-else>search</span>
        </router-link>
        <router-link :to="{ name: 'create-post' }">
            <span class="material-symbols-outlined full" v-if="$route.name == 'create-post'"><img
                    src="@/assets/add_circle.svg" class="icon"></span>
            <span class="material-symbols-outlined" v-else>add_circle</span>
        </router-link>
        <router-link :to="{ name: 'profile', params: { username: loggedUser } }">
            <span class="material-symbols-outlined full" v-if="$route.name == 'profile' && $route.params.username == loggedUser"><img src="@/assets/person.svg"
                    class="icon"></span>
            <span class="material-symbols-outlined" v-else>person</span>
        </router-link>
    </div>
</template>

<script>
import { useUsersStore } from "@/stores/users";
import { usePostsStore } from "@/stores/posts";

export default {
    data() {
        return {
            usersStore: useUsersStore(),
            postsStore: usePostsStore(),
        };
    },

    computed: {
        loggedUser() {
            return this.usersStore.getUserLogged
        },
    },
};
</script>

<style scoped>
#navigation {
    background-color: #FAF0CA;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5rem;
    position: fixed;
    bottom: 0;
    width: 100%;
}

a {
    text-decoration: none;
    color: black;
}

.material-symbols-outlined {
    font-size: 30px;
    margin: 0;
    color: #F4D35E;
}

.icon {
    height: 30px;
}
</style>