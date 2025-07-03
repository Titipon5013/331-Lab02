<script setup lang="ts">
import EventCard from '@/components/EventCard.vue';
import CategoryOrganizer from '@/components/CategoryOrganizer.vue';
import type { Event } from '@/type';
import { ref, onMounted } from 'vue';
import EventService from '@/services/EventService';


const events = ref<Event[]>(null);

onMounted( () => {
  EventService.getEvent()
    .then((response) => {
      events.value = response.data;
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
});
</script>

<template>
  <h1>Events For Good</h1>
  <!-- new element-->
<div class="events">
  <div v-for="event in events" :key="event.id" class="event-container">
    <EventCard :event="event" />
    <CategoryOrganizer :event="event" />
  </div>
</div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.event-container {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}
</style>
