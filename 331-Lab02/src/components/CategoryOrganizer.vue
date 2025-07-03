<script setup lang="ts">
import type { Event } from '@/type'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="category-organizer">
    <p class="text">Category: {{ event.category }}</p>
    <p class="text">Organizer: {{ event.organizer }}</p>
  </div>
</template>

<style scoped>
.category-organizer {
  padding: 10px;
  margin: 5px;
}

.text {
  font-size: 16px;
  text-align: right;
  margin: 5px 0;
}
</style>
