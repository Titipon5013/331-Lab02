<script setup lang="ts">
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'

const store = useEventStore()
const { event } = storeToRefs(store)

</script>

<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <nav class="flex justify-center gap-8 py-4">
            <RouterLink
              class="px-4 py-2 rounded font-bold text-blue-700 bg-blue-100 hover:bg-blue-200 hover:text-green-600 transition-colors shadow"
              :to="{ name: 'event-detail-view' }"
            >Details</RouterLink>
            <RouterLink
              class="px-4 py-2 rounded font-bold text-green-700 bg-green-100 hover:bg-green-200 hover:text-blue-600 transition-colors shadow"
              :to="{ name: 'event-register-view' }"
            >Register</RouterLink>
            <RouterLink
              class="px-4 py-2 rounded font-bold text-yellow-700 bg-yellow-100 hover:bg-yellow-200 hover:text-blue-600 transition-colors shadow"
              :to="{ name: 'event-edit-view' }"
            >Edit</RouterLink>
        </nav>
        <RouterView :event="event" />
    </div>
</template>