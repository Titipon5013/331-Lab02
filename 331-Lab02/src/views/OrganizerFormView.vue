<script setup lang="ts">
import { ref } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

// Custom type for organizer data
interface OrganizerData {
  organizationName: string;
  address: string;
}

const organizer = ref<OrganizerData>({
  organizationName: '',
  address: ''
})

const router = useRouter()
const store = useMessageStore()

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
  <div>
    <h1 class="text-2xl font-bold mb-4">Add Organizer</h1>
    <form @submit.prevent="saveOrganizer">
      <label>Organization Name</label>
      <input v-model="organizer.organizationName" type="text" placeholder="Organization Name" class="field" />
      <label>Address</label>
      <input v-model="organizer.address" type="text" placeholder="Address" class="field" />
      <button class="button" type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 24px;
  width: 100%;
  padding: 0 10px;
  font-size: 20px;
  height: 52px;
  box-sizing: border-box;
  border: solid 1px rgba(0, 0, 0, 0.4);
}
.button {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 40px;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s linear;
}
.button:hover {
  transform: scale(1.02);
  box-shadow: 0 7px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
