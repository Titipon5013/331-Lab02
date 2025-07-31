<script setup lang="ts">
import type { Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="p-2 m-1 text-right">
    <p class="text-base">Category: {{ event.category }}</p>
    <p class="text-base">Organizer: {{ event.organizer }}</p>
  </div>
</template>

<style scoped>

</style>
