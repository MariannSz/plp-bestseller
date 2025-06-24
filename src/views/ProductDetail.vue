<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import mockData from '@/data/mockData.json'
import ProductInfo from '@/components/ProductInfo.vue'
import ImageFallback from '@/components/ImageFallback.vue'

const props = defineProps<{ productId: string }>()
const router = useRouter()

const product = computed(() =>
  mockData.products.find((p: any) => String(p.id) === String(props.productId)),
)

function goBack() {
  router.back()
}

const selectedVariantIdx = ref(-1)
const selectedImageIdx = ref(0)

// Get images for current selection
const displayedImages = computed(() => {
  if (
    selectedVariantIdx.value >= 0 &&
    product.value?.variant?.[selectedVariantIdx.value]?.images?.length
  ) {
    return product.value.variant[selectedVariantIdx.value].images
  }
  return product.value?.images || []
})

// Track valid images for the current selection
const validImages = ref<string[]>([])

// When displayedImages changes, reset validImages and selectedImageIdx
watch(
  () => displayedImages.value,
  (newImages) => {
    validImages.value = [...newImages]
    selectedImageIdx.value = 0
  },
  { immediate: true },
)

// Remove image from validImages on error
function removeImage(idx: number) {
  validImages.value.splice(idx, 1)
  if (selectedImageIdx.value >= validImages.value.length) {
    selectedImageIdx.value = 0
  }
}
</script>

<template>
  <div v-if="product" class="max-w-5xl mx-auto p-8 bg-white rounded shadow">
    <button class="mb-4 text-blue-600 hover:underline" @click="goBack">← Tilbage</button>
    <div class="md:grid md:grid-cols-2 gap-8 flex flex-col">
      <!-- Images -->
      <div class="w-full max-w-md mx-auto">
        <template v-if="validImages.length">
          <img
            :src="validImages[selectedImageIdx] || validImages[0]"
            :alt="product.name.dk || product.name.en"
            class="w-full max-h-96 object-contain rounded"
          />
          <div class="flex flex-wrap gap-2 mt-2 justify-center">
            <img
              v-for="(img, idx) in validImages"
              :key="img"
              :src="img"
              :alt="product.name.dk || product.name.en"
              class="w-16 h-16 object-cover rounded border cursor-pointer"
              :class="{ 'ring-2 ring-blue-500': selectedImageIdx === idx }"
              @click="selectedImageIdx = idx"
              @error="removeImage(idx)"
            />
          </div>
        </template>
        <template v-else>
          <ImageFallback />
        </template>
      </div>
      <!-- Details-->
      <div class="w-full flex flex-col gap-4">
        <ProductInfo :product="product" />
        <!-- Variants -->
        <div v-if="product.variant && product.variant.length">
          <div class="font-semibold mb-1 text-gray-700">Varianter:</div>
          <ul class="flex flex-wrap gap-2 mb-2">
            <li
              v-for="(variant, idx) in product.variant"
              :key="idx"
              class="p-3 border rounded cursor-pointer inline-flex flex-col items-center justify-center min-w-[8rem] min-h-[5rem] bg-gray-50 text-gray-800"
              :class="{
                'border-blue-500 ring-2 ring-blue-200 bg-blue-50': selectedVariantIdx === idx,
              }"
              @click="
                () => {
                  selectedVariantIdx = idx
                  selectedImageIdx = 0
                }
              "
            >
              <div v-if="variant.color" class="font-semibold">
                Farve: <span class="font-normal">{{ variant.color }}</span>
              </div>
              <div v-if="variant.size" class="font-semibold">
                Størrelser: <span class="font-normal">{{ variant.size.join(', ') }}</span>
              </div>
              <div v-if="variant.stock !== undefined" class="font-semibold">
                Lager: <span class="font-normal">{{ variant.stock }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center text-gray-400 py-10">Produkt ikke fundet.</div>
</template>
