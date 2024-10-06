<template>
    <main>
        <h2 class="inter-bold font-size-24">Create your account</h2>
        <form @submit.prevent="submit">
            <input type="text" v-model="username" name="username" id="inputUsername" placeholder="Username"
                class="font-size-14 inter-light input">
            <input type="text" v-model="email" name="email" id="inputEmail" placeholder="Email"
                class="font-size-14 inter-light input">
            <div id="password">
                <input type="password" v-model="password" name="password" id="inputPassword" placeholder="Password"
                    class="font-size-14 inter-light input">
                <span class="material-symbols-outlined" @click="togglePassword" v-if="!visibility1">visibility</span>
                <span class="material-symbols-outlined" @click="togglePassword" v-else>visibility_off</span>
            </div>
            <div id="confirmPassword">
                <input type="password" v-model="confirmPassword" name="confirmPassword" id="inputConfirmPassword"
                    placeholder="Confirm Password" class="font-size-14 inter-light input">
                <span class="material-symbols-outlined" @click="toggleConfirmPassword" v-if="!visibility2">visibility</span>
                <span class="material-symbols-outlined" @click="toggleConfirmPassword" v-else>visibility_off</span>
            </div>
            <div class="error-message">
                <p v-if="showError" class="font-size-13 inter-medium">{{ errorMessage }}</p>
            </div>
            <div class="confirmation-message">
                <p v-if="showConfirmation" class="font-size-13 inter-medium">{{ confirmationMessage }}</p>
            </div>
            <button type="submit" class="button-yellow font-size-20">Sign in</button>
        </form>
        <p class="inter-light font-size-14 login">
            Already have an account? <b><router-link :to="{ name: 'login' }">Log in!</router-link></b>
        </p>
    </main>
</template>

<script>
import { useUsersStore } from "@/stores/users";

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            usersStore: useUsersStore(),
            showError: false,
            errorMessage: '',
            showConfirmation: false,
            confirmationMessage: '',
            visibility1: false,
            visibility2: false
        }
    },
    methods: {
        togglePassword() {
            let x = document.getElementById("inputPassword")
            if (x.type === "password") {
                x.type = "text"
                this.visibility1 = true
            } else {
                x.type = "password"
                this.visibility1 = false
            }
        },

        toggleConfirmPassword() {
            let x = document.getElementById("inputConfirmPassword")
            if (x.type === "password") {
                x.type = "text"
                this.visibility2 = true
            } else {
                x.type = "password"
                this.visibility2 = false
            }
        },

        async submit() {
            if (!this.username || !this.email || !this.password || !this.confirmPassword) {
                this.showError = true
                this.errorMessage = 'Missing information';
                throw new Error("Missing information");
            }
            else if (this.password != this.confirmPassword) {
                this.showError = true
                this.errorMessage = 'Passwords do not match';
            }
            else {
                this.register();
            }

        },
        async register() {
            try {
                let newUser = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                }
                await this.usersStore.register(newUser)
                this.showConfirmation = true

                this.confirmationMessage = 'A confirmation email was sent please confirm your email.'
                this.showError = false
            } catch (error) {
                this.showConfirmation = false
                this.showError = true
                if (error === 'API request failed with status 409: {"success":false,"msg":"The username is already taken. Please choose another one."}') {
                    this.errorMessage = 'The username is already taken.';
                }
                if (error === 'API request failed with status 409: {"success":false,"msg":"The email is already in use. Please choose another one."}') {
                    this.errorMessage = 'The email is already in use.';
                }
            }
        }
    }
}
</script>

<style scoped>
main {
    background-color: #FFA987;
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

#password, #confirmPassword{
    background-color: #FAF0CA80;
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding: 0 0.2rem 0 0;
}

#password:focus-within, #confirmPassword:focus-within {
    background-color: #FAF0CA;
}

#inputUsername, #inputEmail {
    background-color: #FAF0CA80;
    padding: 1rem 0.8rem;
    width: 18em;
    border-radius: 6px;
    border: none;
    outline: none;
}

#inputPassword, #inputConfirmPassword {
    padding: 1rem 0.8rem;
    width: 16em;
    border-radius: 6px;
    border: none;
    outline: none;
}

#inputUsername:focus, #inputEmail:focus {
    background-color: #FAF0CA;
}

::placeholder {
    color: #000000;
}

p {
    margin-bottom: -1em;
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

.login{
    margin-top: 0.5rem;
}

a{
    text-decoration: none;
    color: #000000;
}
</style>