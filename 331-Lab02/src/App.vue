<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<div id="layout">
  <header>
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
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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

</style>
