<script setup lang="ts">
interface Student {
  id: string;
  name: string;
  surname: string;
  gpa: number;
}

defineProps<{ student: Student }>()
</script>

<template>
  <div class="border border-gray-400 rounded-lg p-4 w-56 bg-white text-center m-2 shadow hover:scale-105 transition-transform">
    <h2 class="text-lg font-bold mb-1">{{ student.name }} {{ student.surname }}</h2>
    <p class="text-base">GPA: {{ student.gpa }}</p>
  </div>
</template>

<style scoped>

</style>
