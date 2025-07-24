<script setup lang="ts">

import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { type Event } from '@/types'
const props = defineProps<{
    event: Event
    id: string
}>()
const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()
const editEvent = () => {
  store.updateMessages('The event data has been updated.')
  setTimeout(() => {
    store.resetMessages()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.id } })
}

</script>

<template>
    <p>Edit event here</p>
    <button @click="editEvent">Edit</button>
</template>