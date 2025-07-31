<script setup lang="ts">
import { ref, onMounted } from 'vue';
import StudentService from '@/services/StudentService';
import StudentCard from '@/components/StudentCard.vue';

interface Student {
  id: string;
  name: string;
  surname: string;
  gpa: number;
}

const students = ref<Student[]>([]);
const error = ref('');

onMounted(() => {
  StudentService.getStudents()
    .then((response) => {
      students.value = response.data;
    })
    .catch((err) => {
      error.value = 'Failed to fetch students.';
    });
});
</script>

<template>
  <h1 class="text-2xl font-bold mb-4">Student List</h1>
  <div v-if="error" class="text-red-600 font-semibold">{{ error }}</div>
  <div v-else class="flex flex-wrap gap-4 justify-center">
    <StudentCard v-for="student in students" :key="student.id" :student="student" />
  </div>
</template>

<style scoped>

</style>
