<script lang="ts" setup>
import type { Promotion } from '@/types/data-types'
defineProps<{ data: Promotion; type?: string }>()
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <img
      v-if="data.image?.imageUrl"
      :src="data.image.imageUrl"
      :alt="data.image.alt || 'Promotion'"
      class="object-contain rounded-2xl w-full h-full"
    />
    <span v-else class="text-gray-500">Promotion</span>
  </div>
</template>
