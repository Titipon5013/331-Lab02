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
</template>