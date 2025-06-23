<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import mockData from '@/data/mockData.json'
import ProductInfo from '@/components/ProductInfo.vue'

const props = defineProps<{ productId: string }>()
const router = useRouter()

const product = computed(() =>
  mockData.products.find((p: any) => String(p.id) === String(props.productId)),
)

function goBack() {
  router.back()
}

// Track selected image index
const selectedImageIdx = ref(0)

// Reset selected image when product changes
watch(product, () => {
  selectedImageIdx.value = 0
})
</script>

<template>
  <div v-if="product" class="max-w-3xl mx-auto p-8 bg-white rounded shadow">
    <button class="mb-4 text-blue-600 hover:underline" @click="goBack">← Tilbage</button>
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Images -->
      <div class="flex-1">
        <img
          v-if="product.images && product.images.length"
          :src="product.images[selectedImageIdx] || product.images[0]"
          :alt="product.name.dk || product.name.en"
          class="w-full max-h-96 object-contain rounded"
        />
        <div class="flex gap-2 mt-2">
          <img
            v-for="(img, idx) in product.images"
            :key="idx"
            :src="img"
            :alt="product.name.dk || product.name.en"
            class="w-16 h-16 object-cover rounded border cursor-pointer"
            :class="{ 'ring-2 ring-blue-500': selectedImageIdx === idx }"
            @click="selectedImageIdx = idx"
          />
        </div>
      </div>
      <!-- Details-->
      <div class="flex-1 flex flex-col gap-4">
        <ProductInfo :product="product" />
        <!-- Variants -->
        <div v-if="product.variant && product.variant.length">
          <div class="font-semibold mb-1 text-gray-700">Varianter:</div>
          <ul>
            <li
              v-for="(variant, idx) in product.variant"
              :key="idx"
              class="mb-2 p-2 border rounded text-gray-700"
            >
              <div v-if="variant.color">Farve: {{ variant.color }}</div>
              <div v-if="variant.size">Størrelser: {{ variant.size.join(', ') }}</div>
              <div v-if="variant.stock !== undefined">Lager: {{ variant.stock }}</div>
              <div class="flex gap-2 mt-1">
                <img
                  v-for="(img, i) in variant.images || []"
                  :key="i"
                  :src="img"
                  class="w-12 h-12 object-cover rounded"
                  :alt="product.name.dk || product.name.en"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center text-gray-400 py-10">Produkt ikke fundet.</div>
</template>
