<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { type Event } from '@/types'
const props = defineProps<{
    event: Event
    id: string
}>()
const { event } = toRefs(props)
const store = useMessageStore()
const { messages } = storeToRefs(store)
</script>
<template>
    <p>{{ event.title }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
     <div class="flex flex-row flex-wrap justify-center">

     <img v-for="image in event.images" :key="image" :src="image" alt="events image"

       class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40         hover:shadow-lg" />

   </div>

</template>