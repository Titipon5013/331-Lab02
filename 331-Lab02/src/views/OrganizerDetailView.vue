<script setup lang="ts">
import { ref, onMounted } from 'vue';
import OrganizerService from '@/services/OrganizerService';
import { type Organizer } from '@/types';
import { useRoute } from 'vue-router';

const route = useRoute();
const organizer = ref<Organizer | null>(null);
const error = ref('');

onMounted(() => {
  OrganizerService.getOrganizer(Number(route.params.id))
    .then((response) => {
      organizer.value = response.data;
    })
    .catch(() => {
      error.value = 'Organizer not found.';
    });
});
</script>

<template>
  <div v-if="error" class="text-red-600 font-semibold">{{ error }}</div>
  <div v-else-if="organizer" class="max-w-3xl mx-auto p-6 bg-white shadow-sm ring-1 ring-gray-200 rounded-lg">
    <div class="flex flex-col md:flex-row gap-6">
      <div class="md:w-1/3">
        <div class="flex flex-row flex-wrap justify-center">
          <img
            v-for="img in organizer.images"
            :key="img"
            :src="img"
            alt="Organizer image"
            class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg"
          />
        </div>
      </div>
      <div class="md:flex-1">
        <h1 class="text-2xl font-bold mb-2">{{ organizer.organizationName }}</h1>
        <div class="mb-2"><span class="font-semibold">Address:</span> {{ organizer.address }}</div>
        <div class="text-sm text-gray-500"><span class="font-semibold">ID:</span> {{ organizer.id }}</div>
      </div>
    </div>
  </div>
</template>
