<script lang="ts" setup>
import { Product } from '@/types/data-types'
import { useRouter } from 'vue-router'
import ProductInfo from './ProductInfo.vue'
defineProps<{ data: Product }>()
const router = useRouter()
function openDetail(id: number | string) {
  router.push({ name: 'product-detail', params: { productId: id } })
}
</script>

<template>
  <div class="w-full h-full cursor-pointer" @click="openDetail(data.id)">
    <div
      class="w-full h-full flex flex-col rounded-2xl bg-white shadow-md overflow-hidden border border-neutral-200 transition hover:shadow-lg"
    >
      <div class="bg-neutral-100 flex items-center justify-center">
        <img
          v-if="data.images && data.images.length"
          :src="data.images[0]"
          :alt="data.name.dk || data.name.en || 'missing product name'"
          class="object-contain max-h-80 w-auto"
        />
      </div>
      <div class="flex flex-col gap-2 p-4 flex-1">
        <ProductInfo :product="data" />
        <button
          class="mt-3 w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          type="button"
        >
          Læg i kurv
        </button>
      </div>
    </div>
  </div>
</template>
