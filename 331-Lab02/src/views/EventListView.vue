<script setup lang="ts">
import EventCard from '@/components/EventCard.vue';
import CategoryOrganizer from '@/components/CategoryOrganizer.vue';
import { type Event as EventType } from '@/types';
import { ref, onMounted, computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EventService from '@/services/EventService';

const events = ref<EventType[] | null>(null);
const totalEvents = ref(0);
const route = useRoute();
const router = useRouter();

const page = computed(() => parseInt(route.query.page?.toString() || '1'));
const size = computed(() => parseInt(route.query.size?.toString() || '2'));
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / size.value);
  return page.value < totalPages;
});

function updateSize(event: any) {
  const target = event.target as HTMLSelectElement;
  const newSize = parseInt(target.value);
  router.push({
    name: 'event-list-view',
    query: { ...route.query, size: newSize, page: 1 },
  });
}

onMounted(() => {
  watchEffect(() => {
    events.value = null;
    EventService.getEvents(size.value, page.value)
      .then((response) => {
        events.value = response.data;
        totalEvents.value = response.headers['x-total-count'];
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  });
});
</script>

<template>
  <h1>Events For Good</h1>
  <div style="margin-bottom: 16px;">
    <label for="page-size">Events per page: </label>
    <select id="page-size" :value="size" @change="updateSize">
      <option v-for="n in [2, 4, 6, 8, 10]" :key="n" :value="n">{{ n }}</option>
    </select>
  </div>
  <div class="events">
    <div v-for="event in events" :key="event.id" class="event-container">
      <EventCard :event="event" />
      <CategoryOrganizer :event="event" />
    </div>
    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1, size: size } }"
        rel="prev"
        v-if="page != 1"
      >&#60; Previous Page</RouterLink>

      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1, size: size } }"
        rel="next"
        v-if="hasNextPage"
      >Next Page &#62;</RouterLink>
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

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
