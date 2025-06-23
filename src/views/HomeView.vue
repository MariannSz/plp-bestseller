<script setup lang="ts">
import mockData from '@/data/mockData.json'
import ProductCard from '@/components/ProductCard.vue'
import PromoSpot from '@/components/PromoSpot.vue'
import type { Product, Promotion, MergedItem } from '@/types/data-types'
import { computed } from 'vue'

const props = defineProps<{ categoryId: string }>()

const products = computed<Product[]>(() =>
  mockData.products.filter(
    (p: any) => Array.isArray(p.categories) && p.categories.includes(props.categoryId),
  ),
)

const promotions = computed<Promotion[]>(() => mockData.promotionalSpots)

const mergedItems = computed<MergedItem[]>(() => {
  const items = [...products.value]
  promotions.value.forEach((promo) => {
    const clone = { ...promo, __isPromo: true }
    items.splice(promo.position, 0, clone)
  })
  return items
})

function promoGridClass(type?: string) {
  switch (type) {
    case '2x2':
      return 'col-span-2 row-span-2'
    case '1x2':
      return 'col-span-1 row-span-2'
    case '2x1':
      return 'col-span-2 row-span-1'
    case '1x1':
    default:
      return 'col-span-1 row-span-1'
  }
}
</script>
<template>
  <section
    v-if="mergedItems.length"
    class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7 w-full"
  >
    <template v-for="(item, i) in mergedItems" :key="i">
      <div :class="item.__isPromo ? promoGridClass(item.type) : 'col-span-1 row-span-1'">
        <PromoSpot v-if="item.__isPromo" :data="item" />
        <ProductCard v-else :data="item" />
      </div>
    </template>
  </section>
  <div v-else class="text-center text-gray-400 py-10">Ingen produkter fundet.</div>
</template>
