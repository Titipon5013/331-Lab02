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
const keyword = ref('')
function updateKeyword (value?: string) {
  let queryFunction;
  if (keyword.value === '') {
    queryFunction = EventService.getEvents(size.value, page.value)
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, size.value, page.value)
  }
  queryFunction.then((response) => {
    events.value = response.data
    totalEvents.value = response.headers['x-total-count']
  }).catch(() => {
    router.push({ name: 'NetworkError' })
  })
}

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
    updateKeyword();
  });
});
</script>

<template>
  <h1 class="text-3xl font-bold mb-4">Events For Good</h1>
  <div class="mb-4 flex items-center justify-center gap-2">
    <div class="w-64">
    <input
      v-model="keyword"
      type="text"
      placeholder="Search..."
      @input="(e) => updateKeyword((e.target as HTMLInputElement).value)"
      class="border rounded px-2 py-1 w-full"
    />
   </div>

    <label for="page-size" class="font-medium ml-4">Events per page:</label>
    <select id="page-size" :value="size" @change="updateSize" class="border rounded px-2 py-1 w-24 ml-2">
      <option v-for="n in [1, 2, 3, 4, 6, 8, 10]" :key="n" :value="n">{{ n }}</option>
    </select>
  </div>
  <div class="flex flex-col items-center">
    <div v-for="event in events" :key="event.id" class="w-full max-w-xl mb-5">
      <EventCard :event="event" />
      <CategoryOrganizer :event="event" />
    </div>
    <div class="flex w-72 justify-between mt-4">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1, size: size } }"
        rel="prev"
        v-if="page != 1"
        class="text-left text-blue-600 hover:underline"
      >&#60; Previous Page</RouterLink>

      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1, size: size } }"
        rel="next"
        v-if="hasNextPage"
        class="text-right text-blue-600 hover:underline"
      >Next Page &#62;</RouterLink>
    </div>
  </div>
</template>

<style scoped>

</style>
