<script setup lang="ts">
import { useRouter } from 'vue-router'
defineProps<{ categories: any[]; selected: any }>()
const router = useRouter()
</script>

<template>
  <nav class="flex justify-center gap-2 p-4 bg-white shadow">
    <a
      v-for="cat in categories"
      :key="cat.id"
      href="#"
      :class="[
        'font-semibold py-2 px-2 rounded text-gray-700 hover:bg-blue-100',
        selected && selected.id === cat.id ? 'bg-blue-100 text-blue-700' : '',
      ]"
      @click.prevent="router.push({ path: `/${cat.id}` })"
    >
      {{ cat.name.dk || cat.name.en }}
    </a>
  </nav>
</template>
