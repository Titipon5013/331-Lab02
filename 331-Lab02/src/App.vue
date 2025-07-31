<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const store = useMessageStore()
const { messages } = storeToRefs(store)
</script>

<template>
<div class="text-center font-sans text-gray-700 antialiased">
  <header>
    <div id ="flashMessage" v-if="messages">
      <h4>{{ messages }}</h4>
    </div>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{ name: 'event-list-view' }">Event</RouterLink>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
        <RouterLink :to="{ name: 'students' }">Student</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</div>
</template>

<style>

nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  gap: 32px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-active {
  color: #42b983;
}

h2 {
  font-size: 20px
}

@keyframes yelloFade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}
#flashMessage {
  animation: yelloFade 3s ease-in-out;
}

</style>
