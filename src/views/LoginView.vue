<template>
    <main>
        <h2 class="inter-bold font-size-24">Login to your account</h2>
        <form @submit.prevent="submit">
            <input type="text" v-model="username" name="username" id="inputUsername" placeholder="Username"
                class="font-size-14 inter-light input">
            <div id="password">
                <input type="password" v-model="password" name="password" id="inputPassword" placeholder="Password"
                    class="font-size-14 inter-light input">
                <span class="material-symbols-outlined" @click="togglePassword" v-if="!visibility">visibility</span>
                <span class="material-symbols-outlined" @click="togglePassword" v-else>visibility_off</span>
            </div>
            <div class="error-message">
                <p v-if="showError" class="font-size-12 inter-medium">{{ errorMessage }}</p>
            </div>
            <button type="submit" class="button-pink font-size-20">Get in</button>
        </form>
        <p class="inter-light font-size-14 register">
            Don't have an account? <b><router-link :to="{ name: 'register' }">Register!</router-link></b>
        </p>
    </main>
</template>

<script>
import { useUsersStore } from "@/stores/users";

export default {
    data() {
        return {
            username: '',
            password: '',
            usersStore: useUsersStore(),
            showError: false,
            errorMessage: '',
            visibility: false
        }
    },
    methods: {
        togglePassword() {
            let x = document.getElementById("inputPassword")
            if (x.type === "password") {
                x.type = "text"
                this.visibility = true
            } else {
                x.type = "password"
                this.visibility = false
            }
        },

        async submit() {
            if (!this.username || !this.password) {
                this.showError = true;
                this.errorMessage = 'Username and password are required';
                return;
            }
            this.login();
        },
        
        async login() {
            try {
                await this.usersStore.login(this.username, this.password)
                if (this.usersStore.getToken != null) {
                    this.$router.push({ name: "home" })
                }
                this.showError = false
            } catch (error) {
                this.showError = true
                if (error === 'API request failed with status 401: {"success":false,"accessToken":null,"msg":"Invalid credentials!"}') {
                    this.errorMessage = 'Wrong password';
                } else if (error === 'API request failed with status 404: {"success":false,"msg":"User not found."}') {
                    this.errorMessage = 'User not found';
                } else if (error === 'API request failed with status 400: {"success":false,"msg":"Must provide username and password."}') {
                    this.errorMessage = 'Username and password are required';
                } else if (error === 'API request failed with status 403: {"success":false,"accessToken":null,"msg":"User blocked"}') {
                    this.errorMessage = 'User is blocked. Contact us for more information.';
                } else {
                    this.errorMessage = 'Something went wrong. Try again!';
                }
            }
        }
    }
}
</script>

<style scoped>
main {
    background-color: #FAF0CA;
    width: 100vw;
    height: 100vh;
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
    row-gap: 1.5em;
}

#password{
    background-color: #FFA98730;
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding: 0 0.2rem 0 0;
}

#password:focus-within {
    background-color: #FFA987;
}

#inputUsername {
    background-color: #FFA98730;
    padding: 1rem 0.8rem;
    width: 18em;
    border-radius: 6px;
    border: none;
    outline: none;
}

#inputPassword {
    padding: 1rem 0.8rem;
    width: 16em;
    border-radius: 6px;
    border: none;
    outline: none;
}

#inputUsername:focus {
    background-color: #FFA987;
}

::placeholder {
    color: #000000;
}

p {
    margin-bottom: -1em;
}

.error-message {
    color: rgb(168, 6, 6);
    margin-top: -1em;
    margin-bottom: 1em;
    text-align: center;
}

.register{
    margin-top: 0.5rem;
}

a{
    text-decoration: none;
}
</style>