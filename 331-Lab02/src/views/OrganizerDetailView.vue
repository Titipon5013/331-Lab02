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
  <div v-else-if="organizer" class="max-w-xl mx-auto p-6 border rounded bg-white shadow">
    <h1 class="text-2xl font-bold mb-2">{{ organizer.organizationName }}</h1>
    <div class="mb-2"><span class="font-semibold">Address:</span> {{ organizer.address }}</div>
    <div><span class="font-semibold">Organizer ID:</span> {{ organizer.id }}</div>
  </div>
</template>
