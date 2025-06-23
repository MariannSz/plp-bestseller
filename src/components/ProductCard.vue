<script lang="ts" setup>
import { Product } from '@/types/data-types'
defineProps<{ data: Product }>()
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div
      class="w-full h-full flex flex-col rounded-2xl bg-white shadow-md overflow-hidden border border-neutral-200 transition hover:shadow-lg"
    >
      <div class="bg-neutral-100 h-full max-h-96 flex items-center justify-center">
        <img
          :src="data.images[0]"
          :alt="data.name.dk || data.name.en || 'missing product name'"
          class="object-contain h-full max-h-80 w-auto"
        />
      </div>
      <div class="flex flex-col gap-2 p-4 flex-1">
        <h2 class="text-lg font-semibold text-gray-900 truncate">
          {{ data.name.dk || data.name.en || 'Produktnavn mangler' }}
        </h2>
        <div class="text-primary-600 text-xl font-bold">{{ data.price }} kr</div>
        <div class="flex flex-wrap gap-1 items-center text-sm text-gray-700">
          <span class="font-medium">Størrelser:</span>
          <span v-if="data.size && data.size.length">
            <span
              v-for="(size, idx) in data.size"
              :key="idx"
              class="inline-block px-2 py-0.5 bg-neutral-200 rounded text-xs font-semibold mr-1"
            >
              {{ size }}
            </span>
          </span>
          <span v-else class="text-gray-400">Ikke angivet</span>
        </div>
        <div class="text-sm text-gray-500">
          På lager: <span class="font-medium">{{ data.stock }}</span>
        </div>
        <button
          class="mt-3 w-full py-2 px-4 bg-blue-600 text-gray-900 rounded-lg font-semibold hover:bg-blue-700 transition"
          type="button"
        >
          Læg i kurv
        </button>
      </div>
    </div>
  </div>
</template>
