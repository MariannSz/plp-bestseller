<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
defineProps<{ categories: any[]; selected: any }>()
const router = useRouter()
const dropdownOpen = ref(false)

function selectCategory(id: string) {
  dropdownOpen.value = false
  router.push({ path: `/${id}` })
}
</script>

<template>
  <!-- Desktop menu -->
  <nav
    class="hidden md:flex flex-wrap md:flex-nowrap md:justify-center gap-2 p-4 bg-white shadow overflow-x-auto"
    style="scrollbar-width: none"
  >
    <a
      v-for="cat in categories"
      :key="cat.id"
      href="#"
      :class="[
        'font-semibold py-2 px-3 rounded text-gray-700 whitespace-nowrap hover:bg-blue-100 transition',
        selected && selected.id === cat.id ? 'bg-blue-100 text-blue-700' : '',
      ]"
      @click.prevent="router.push({ path: `/${cat.id}` })"
    >
      {{ cat.name.dk || cat.name.en }}
    </a>
  </nav>

  <!-- Mobile dropdown menu -->
  <div class="relative flex md:hidden justify-end p-4 bg-white shadow">
    <button
      class="py-2 px-4 bg-blue-600 text-white rounded font-semibold"
      @click="dropdownOpen = !dropdownOpen"
      aria-label="Åbn menu"
    >
      Menu
    </button>
    <div
      v-if="dropdownOpen"
      class="absolute right-4 top-14 z-50 bg-white border rounded shadow-lg min-w-[10rem] flex flex-col"
    >
      <a
        v-for="cat in categories"
        :key="cat.id"
        href="#"
        :class="[
          'py-2 px-4 text-right font-semibold text-gray-700 hover:bg-blue-100 whitespace-nowrap transition',
          selected && selected.id === cat.id ? 'bg-blue-100 text-blue-700' : '',
        ]"
        @click.prevent="selectCategory(cat.id)"
      >
        {{ cat.name.dk || cat.name.en }}
      </a>
    </div>
  </div>
</template>

<style scoped>
nav::-webkit-scrollbar {
  display: none;
}
</style>
