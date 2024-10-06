<script>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar,
  },
}
</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap" rel="stylesheet" />
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  <RouterView />
  <NavBar />
</template>

<style>
.inter-semiBold {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  font-variation-settings: "slnt" 0;
}

.inter-medium {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings: "slnt" 0;
}

.inter-light {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  font-variation-settings: "slnt" 0;
}

.inter-bold {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  font-variation-settings: "slnt" 0;
}

.font-size-10 {
  font-size: 10px;
}

.font-size-12 {
  font-size: 12px;
}

.font-size-13 {
  font-size: 13px;
}

.font-size-14 {
  font-size: 14px;
}

.font-size-16 {
  font-size: 16px;
}

.font-size-18 {
  font-size: 18px;
}

.font-size-20 {
  font-size: 20px;
}

.font-size-24 {
  font-size: 24px;
}

.font-size-32 {
  font-size: 32px;
}

.button-pink {
  background-color: #FFA98730;
  color: #000000;
  border-radius: 20px;
  width: 17em;
  height: 2.5em;
  font-size: 15px;
}

.button-pink:hover {
  background-color: #FFA987;
}

.button-yellow {
  background-color: #FAF0CA80;
  color: #000000;
  border-radius: 20px;
  width: 17em;
  height: 2.5em;
  font-size: 15px;
}

.button-yellow:hover {
  background-color: #FAF0CA;
}

.button-orange {
  background-color: #EE964B80;
  color: #000000;
  border-radius: 20px;
  width: 17em;
  height: 2.5em;
  font-size: 15px;
}

.button-orange:hover {
  background-color: #EE964B;
}
</style>
