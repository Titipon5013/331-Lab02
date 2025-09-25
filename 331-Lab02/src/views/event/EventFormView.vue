<script setup lang="ts">
type EventData = {
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  petAllowed: boolean;
  organizer: string;
  images: string[];
};
import { ref } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import ImageUpload from '@/components/ImageUpload.vue';

const event = ref<EventData>({
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petAllowed: false,
  organizer: '',
  images: []
});

const router = useRouter()
const store = useMessageStore()

function saveEvent() {

 EventService.saveEvent(event.value)

   .then((response) => {

     router.push({ name: 'event-detail-view', params: { id: response.data.id } })
  store.updateMessages('You are successfully add a new event for ' + response.data.title)

     setTimeout(() => {

  store.resetMessages()

     }, 3000)
   })

   .catch(() => {

     router.push({ name: 'network-error-view' })

   })

}

</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Create an event</h1>

    <form @submit.prevent="saveEvent" class="bg-white shadow-sm ring-1 ring-gray-200 rounded-lg p-6 space-y-6">
      <!-- Category -->
      <div>
        <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
        <input
          id="category"
          v-model="event.category"
          type="text"
          placeholder="e.g. Tech, Music"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>

      <!-- Name & describe -->
      <div class="pt-2">
        <h3 class="text-base font-semibold text-gray-900 mb-2">Name & describe your event</h3>
        <div class="space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="title"
              v-model="event.title"
              type="text"
              placeholder="Event title"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              v-model="event.description"
              rows="4"
              placeholder="Tell people what your event is about..."
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      <!-- Where is your event? -->
      <div class="pt-2">
        <h3 class="text-base font-semibold text-gray-900 mb-2">Where is your event?</h3>
        <div class="space-y-4">
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <input
              id="location"
              v-model="event.location"
              type="text"
              placeholder="City, venue, or address"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
              <input
                id="date"
                v-model="event.date"
                type="date"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label for="time" class="block text-sm font-medium text-gray-700">Time</label>
              <input
                id="time"
                v-model="event.time"
                type="time"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Options -->
      <div class="flex items-center gap-3">
        <input
          id="petAllowed"
          v-model="event.petAllowed"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        />
        <label for="petAllowed" class="text-sm text-gray-700">Pet allowed</label>
      </div>

      <!-- Organizer -->
      <div>
        <label for="organizer" class="block text-sm font-medium text-gray-700">Organizer</label>
        <input
          id="organizer"
          v-model="event.organizer"
          type="text"
          placeholder="Organizer name"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>

      <!-- Images -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Upload images</label>
        <div class="rounded-lg border border-dashed border-gray-300 p-4">
          <ImageUpload v-model="event.images" />
        </div>
        <p class="mt-1 text-xs text-gray-500">PNG/JPG recommended. Upload a few clear photos.</p>
      </div>

      <!-- Actions -->
      <div class="pt-2">
        <button
          type="submit"
          class="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Create event
        </button>
      </div>
    </form>
  </div>
</template>
