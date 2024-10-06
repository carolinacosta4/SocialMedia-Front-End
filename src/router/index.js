import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CreatePostView from '../views/CreatePostView.vue'
import SearchView from '../views/SearchView.vue'
import ProfileView from '../views/ProfileView.vue'
import PostView from '../views/PostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: CreatePostView,
      meta: { requiresAuth: true },
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostView,
      meta: { requiresAuth: true },
    },
  ]
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !localStorage.getItem("authToken")) {
    return {
      path: "/login",
      query: { redirect: to.fullPath },
    };
  }
});

export default router
