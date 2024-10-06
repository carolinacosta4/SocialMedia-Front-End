import { defineStore } from "pinia";
import * as api from "../api/api";

const API_BASE_URL = "http://127.0.0.1:3000";

export const usePostsStore = defineStore("post", {
  state: () => ({
    posts: [],
    post: "",
    token: localStorage.getItem("authToken") || null,
    loggedUser: localStorage.getItem("user") || null,
  }),
  getters: {
    getPosts: (state) => state.posts,
    getPost: (state) => state.post,
    getToken: (state) => state.token,
    getUserLogged: (state) => state.loggedUser,
  },
  actions: {
    async fetchPosts() {
      try {
        const response = await api.get(API_BASE_URL, `posts`)
        this.posts = response.data
      } catch (error) {
        console.error(error);
      }
    },

    async fetchPost(id) {
      try {
        const response = await api.get(API_BASE_URL, `posts/${id}`, this.token)
        this.post = response.data
      } catch (error) {
        console.error(error);
      }
    },

    async createPost(data){
      try {
        const response = await api.postForm(API_BASE_URL, `posts`, data, this.token)
        if (!response.success) {
          throw new Error("Registration failed");
        }
      } catch (error) {
        console.error(error);
      }
    },

    async like(id) {
      try {
        const response = await api.post(API_BASE_URL, `posts/${id}/likes`, {}, this.token)
        return response
      } catch (error) {
        console.error(error);
      }
    },

    async unlike(id, likeId) {
      try {
        await api.remove(API_BASE_URL, `posts/${id}/likes/${likeId}`, this.token)
      } catch (error) {
        console.error(error);
      }
    },

    async comment(id, content) {
      try {
        const response = await api.post(API_BASE_URL, `posts/${id}/comments`, { content: content }, this.token)
        return response
      } catch (error) {
        console.error(error);
      }
    },
  },
});
