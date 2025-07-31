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
<RouterLink class="event-link" :to="{ name: 'event-detail-view', params: { id: event.id } }">
    <div class="cursor-pointer border border-gray-600 p-4 w-64 mb-6 hover:scale-101 hover:shadow-sp">
        <h2>{{ event.title }}</h2>
        <span>@{{ event.time }} on {{ event.date }} </span>
    </div>
</RouterLink>
</template>

<style scoped>
.event-card {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
}

.event-card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
    text-decoration: none;
    color: #2c3;
}
</style>

