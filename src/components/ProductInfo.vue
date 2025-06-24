<script setup lang="ts">
import type { Product } from '@/types/data-types'
defineProps<{ product: Product }>()
</script>

<template>
  <div>
    <div class="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">
      {{ product.brand }}
    </div>
    <h2 class="text-lg font-semibold text-gray-900 truncate">
      {{ product.name.dk || product.name.en || 'Produktnavn mangler' }}
    </h2>
    <div class="text-blue-600 text-xl font-bold">{{ product.price }} kr</div>
    <div class="flex flex-wrap gap-1 items-center text-sm text-gray-700">
      <span class="font-medium">Størrelser:</span>
      <span v-if="product.size && product.size.length">
        <span
          v-for="(size, idx) in product.size"
          :key="idx"
          class="inline-block px-2 py-0.5 bg-neutral-200 rounded text-xs font-semibold mr-1"
        >
          {{ size }}
        </span>
      </span>
      <span v-else class="text-gray-400">Ikke angivet</span>
    </div>
    <div class="text-sm text-gray-500">
      På lager: <span class="font-medium">{{ product.stock }}</span>
    </div>
  </div>
</template>
