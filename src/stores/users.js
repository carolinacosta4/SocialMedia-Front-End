import { defineStore } from "pinia";
import * as api from "../api/api";

const API_BASE_URL = "http://127.0.0.1:3000";

export const useUsersStore = defineStore("user", {
  state: () => ({
    users: [],
    user: "",
    token: localStorage.getItem("authToken") || null,
    loggedUser: localStorage.getItem("user") || null,
    loggedUserInfo: [],
    userPosts: []
  }),
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getUserLogged: (state) => state.loggedUser,
    getUserLoggedInfo: (state) => state.loggedUserInfo,
    getUserPosts: (state) => state.userPosts,
  },
  actions: {
    async fetchUsers() {
      try {
        const response = await api.get(API_BASE_URL, `users`, this.token)
        this.users = response.data
      } catch (error) {
        console.error(error);
      }
    },

    async fetchUser(username) {
      try {
        const response = await api.get(API_BASE_URL, `users/${username}`, this.token)
        this.user = response.data
      } catch (error) {
        console.error(error);
      }
    },

    async fetchUserLogged(id) {
      try {
        const response = await api.get(API_BASE_URL, `users/${id}`, this.token)
        this.loggedUserInfo = response.data
      } catch (error) {
        console.error(error);
      }
    },

    async delete(username) {
      try {
        const response = await api.remove(API_BASE_URL, `users/${username}`, this.token);
      } catch (error) {
        console.error(error);
      }
    },

    async block(username) {
      try {
        const response = await api.patch(API_BASE_URL, `users/${username}/block`)
      } catch (error) {
        console.error(error);
      }
    },

    async login(username, password) {
      try {
        const response = await api.post(API_BASE_URL, "users/login", {
          username: username,
          password: password,
        });

        if (response.success) {
          this.token = response.accessToken;
          this.loggedUser = response.id;
          localStorage.setItem("authToken", this.token);
          localStorage.setItem("user", this.loggedUser);
          localStorage.setItem("loginTime", Date.now());
        }
      } catch (error) {
        throw error.message;
      }
    },

    async logout() {
      this.token = null;
      this.loggedUser = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },

    async editProfile(data, username) {
      try {
        await api.patch(API_BASE_URL, `users/${username}`, data, this.token);
      } catch (error) {
        throw error.message;
      }
    },

    async register(newUser) {
      try {
        const response = await api.post(API_BASE_URL, "users", {
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
        });

        if (!response.success) {
          throw new Error("Registration failed");
        }
      } catch (error) {
        throw error.message;
      }
    },

    async updateProfilePicture(formData, username) {
      try {
        const response = await api.patchForm(API_BASE_URL, `users/${username}/change-profile-picture`, formData, this.token);
        return response;
      } catch (error) {
        console.error('Error updating profile picture:', error);
        throw error;
      }
    },

    async findUserPosts(username) {
      try {
        const response = await api.get(API_BASE_URL, `users/${username}/posts`, this.token);
        this.userPosts = response.data
      } catch (error) {
        throw error;
      }
    },

    async follow(username) {
      try {
        const response = await api.post(API_BASE_URL, `users/${username}/follow`, {}, this.token)
        return response
      } catch (error) {
        throw error.message;
      }
    },

    async unfollow(username) {
      try {
        const response = await api.remove(API_BASE_URL, `users/${username}/unfollow`, this.token)
        return response
      } catch (error) {
        throw error.message;
      }
    },
  },
});
