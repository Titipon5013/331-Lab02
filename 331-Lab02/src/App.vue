<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { SpeedInsights } from '@vercel/speed-insights/vue'

const store = useMessageStore()
const { messages } = storeToRefs(store)
</script>

<template>
  <SpeedInsights />
<div class="text-center font-sans text-gray-700 antialiased min-h-screen bg-gray-50">
  <header class="shadow-md mb-6">
    <div v-if="messages" class="animate-fade bg-yellow-300 text-black py-2 px-4 rounded mb-2 mx-auto w-fit">
      <h4 class="font-semibold">{{ messages }}</h4>
    </div>
    <h1>Deploy with Vercel</h1>
    <div class="wrapper">
      <nav class="flex justify-center gap-8 py-6">
<RouterLink

           class="font-bold text-gray-700"

           exact-active-class="text-green-500"

           :to="{ name: 'event-list-view' }"

           >Event</RouterLink

         >

         |

         <RouterLink

           class="font-bold text-gray-700"

           exact-active-class="text-green-500"

           :to="{ name: 'about' }"

           >About</RouterLink

         >

         |

         <RouterLink

           class="font-bold text-gray-700"

           exact-active-class="text-green-500"

           :to="{ name: 'add-event' }"

           >New Event</RouterLink

         >

         |

         <RouterLink

           class="font-bold text-gray-700"

           exact-active-class="text-green-500"

           :to="{ name: 'students' }"

           >Student</RouterLink

         >

         |

         <RouterLink

           class="font-bold text-gray-700"

           exact-active-class="text-green-500"

           :to="{ name: 'organizer-list' }"

           >Organizer</RouterLink

         >

       </nav>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</div>
</template>

<style>

@keyframes fade {
  from {
    background-color: #fde047;
  }
  to {
    background-color: transparent;
  }
}
.animate-fade {
  animation: fade 3s ease-in-out;
}

</style>
