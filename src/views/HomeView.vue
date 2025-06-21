<script lang="ts" setup>
import mockData from '@/data/mockData.json'
import ProductCard from '@/components/ProductCard.vue'
import PromoSpot from '@/components/PromoSpot.vue'
import type { Product, Promotion, MergedItem } from '@/types/data-types'
import { ref, computed } from 'vue'

const products = ref<Product[]>(mockData.products)
console.log('PRODUCTS:', products.value)
const promotions = ref<Promotion[]>(mockData.promotionalSpots)

// Merge products and promo spots based on position
const mergedItems = computed<MergedItem[]>(() => {
  const items = [...products.value]
  promotions.value.forEach((promo) => {
    const clone = { ...promo, __isPromo: true }
    items.splice(promo.position, 0, clone)
  })
  return items
})

console.log('MERGED ITEMS:', mergedItems.value)
</script>

<template>
  <section
    class="min-h-screen w-full max-w-[1600px] mx-auto grid sm:grid-cols-3 xl:grid-cols-6 gap-4 p-4"
  >
    <template v-for="(item, i) in mergedItems" :key="i">
      <PromoSpot v-if="item.__isPromo" :data="item" />
      <ProductCard v-else-if="'images' in item" :data="item" />
    </template>
  </section>
</template>
