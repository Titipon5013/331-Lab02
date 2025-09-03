<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue';
import OrganizerService from '@/services/OrganizerService';
import { type Organizer } from '@/types';
import { useRoute, useRouter } from 'vue-router';

const organizers = ref<Organizer[] | null>(null);
const totalOrganizers = ref(0);
const route = useRoute();
const router = useRouter();

const page = computed(() => parseInt(route.query.page?.toString() || '1'));
const size = computed(() => parseInt(route.query.size?.toString() || '5'));
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalOrganizers.value / size.value);
  return page.value < totalPages;
});

function updateSize(event: any) {
  const target = event.target as HTMLSelectElement;
  const newSize = parseInt(target.value);
  router.push({
    name: 'organizer-list',
    query: { ...route.query, size: newSize, page: 1 },
  });
}

onMounted(() => {
  watchEffect(() => {
    OrganizerService.getOrganizers(size.value, page.value)
      .then((response) => {
        organizers.value = response.data;
        const total = response.headers['x-total-count'];
        if (total) {
          totalOrganizers.value = parseInt(total);
        } else if (Array.isArray(response.data)) {
          totalOrganizers.value = response.data.length;
        } else {
          totalOrganizers.value = 0;
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      })
  });
});
</script>

<template>
  <h1 class="text-2xl font-bold mb-4">Organizer List</h1>
  <div class="mb-4 flex items-center justify-center gap-2">
    <label for="page-size" class="font-medium">Organizers per page:</label>
    <select id="page-size" :value="size" @change="updateSize" class="border rounded px-2 py-1">
      <option v-for="n in [2, 5, 10, 20]" :key="n" :value="n">{{ n }}</option>
    </select>
  </div>
  <div class="flex flex-col items-center">
    <div v-for="organizer in organizers" :key="organizer.id" class="w-full max-w-xl mb-5 p-4 border rounded bg-white shadow">
      <router-link :to="{ name: 'organizer-detail', params: { id: organizer.id } }" class="text-lg font-bold text-blue-700 hover:underline">
        {{ organizer.organizationName }}
      </router-link>
      <div class="text-gray-600">{{ organizer.address }}</div>
    </div>
    <div class="flex w-72 justify-between mt-4">
      <RouterLink
        id="page-prev"
        :to="{ name: 'organizer-list', query: { page: page - 1, size: size } }"
        rel="prev"
        v-if="page != 1"
        class="text-left text-blue-600 hover:underline"
      >&#60; Previous Page</RouterLink>
      <RouterLink
        id="page-next"
        :to="{ name: 'organizer-list', query: { page: page + 1, size: size } }"
        rel="next"
        v-if="hasNextPage"
        class="text-right text-blue-600 hover:underline"
      >Next Page &#62;</RouterLink>
    </div>
  </div>
</template>
