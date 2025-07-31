<script setup lang="ts">
import { ref } from 'vue'
// defineProps<{
//   msg: string
// }>()
import { type Event } from '@/types'
defineProps<{
    event: Event
}>()

//  const event = ref({
// id: 5928101,
// category: 'animal walfare',
// titile: 'Cat Adoption Day',
// description: 'Find your new feline friend at this event.',
// location: 'Meow Town',
// date:'January 28, 2022',
// time: '12:00',
// petsAllowed: true,
//  organizer: 'Kat Laydee'
// })

// Shows pointer cursor on hover (clickable)
// Adds a 1px border
// Border color: dark gray
// Padding: 1rem (16px)
// Width: 16rem (256px)
// Margin-bottom: 1.5rem (24px)
// Not standard Tailwind — likely custom, means scale 1.01 on hover
// Also custom — adds shadow on hover

</script>

<template>
<RouterLink class="block no-underline text-green-700" :to="{ name: 'event-detail-view', params: { id: event.id } }">
    <div class="event-card cursor-pointer border border-gray-700 p-5 w-64 mb-4 rounded-lg bg-white hover:scale-105 hover:shadow-lg transition-transform">
        <h2 class="text-xl font-bold mb-1">{{ event.title }}</h2>
        <span class="text-sm text-gray-500">@{{ event.time }} on {{ event.date }} </span>
    </div>
</RouterLink>
</template>

<style scoped>

</style>

