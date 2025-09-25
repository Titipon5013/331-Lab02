<script setup lang="ts">
import { ref, watch } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import ImageUpload from '@/components/ImageUpload.vue'

// Custom type for organizer data
interface OrganizerData {
  organizationName: string;
  address: string;
  images: string[];
}

const organizer = ref<OrganizerData>({
  organizationName: '',
  address: '',
  images: []
})

const router = useRouter()
const store = useMessageStore()

// Enforce only one image in the organizer payload
watch(
  () => organizer.value.images,
  (newVal) => {
    if (newVal && newVal.length > 1) {
      organizer.value.images = [newVal[0]]
    }
  },
  { deep: true }
)

function saveOrganizer() {
  OrganizerService.createOrganizer(organizer.value)
    .then((response) => {
      store.updateMessages('Successfully added organizer: ' + response.data.organizationName)
      setTimeout(() => {
        store.resetMessages()
      }, 3000)
      router.push({ name: 'organizer-list' })
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Add Organizer</h1>
    <form @submit.prevent="saveOrganizer" class="bg-white shadow-sm ring-1 ring-gray-200 rounded-lg p-6 space-y-6">
      <div>
        <label for="organizationName" class="block text-sm font-medium text-gray-700">Organization Name</label>
        <input
          id="organizationName"
          v-model="organizer.organizationName"
          type="text"
          placeholder="Organization Name"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
        <input
          id="address"
          v-model="organizer.address"
          type="text"
          placeholder="Address"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Upload Image (one only)</label>
        <div class="rounded-lg border border-dashed border-gray-300 p-4">
          <ImageUpload v-model="organizer.images" />
        </div>
        <p class="mt-1 text-xs text-gray-500">Upload one image. If multiple are uploaded, only the first will be saved.</p>
      </div>

      <div class="pt-2">
        <button
          type="submit"
          class="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Create organizer
        </button>
      </div>
    </form>
  </div>
  
  <!-- Preview -->
  <div v-if="organizer.images && organizer.images.length" class="max-w-3xl mx-auto p-6">
    <h2 class="text-sm font-semibold text-gray-700 mb-2">Image preview</h2>
    <img :src="organizer.images[0]" alt="Organizer image preview" class="w-full max-h-64 object-cover rounded border" />
  </div>
</template>
