<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Product } from '@/types/data-types'
import { useRouter } from 'vue-router'
import ProductInfo from './ProductInfo.vue'
import ImageFallback from './ImageFallback.vue'

const props = defineProps<{ data: Product }>()
const { data } = props
const router = useRouter()

const errorImg = ref(false)

const imgSrc = computed(() =>
  !errorImg.value && data.images && data.images.length ? data.images[0] : '',
)

function onImgError() {
  errorImg.value = true
}

function openDetail(id: number | string) {
  router.push({ name: 'product-detail', params: { productId: id } })
}
</script>

<template>
  <div class="w-full h-full cursor-pointer" @click="openDetail(data.id)">
    <div
      class="w-full h-full flex flex-col rounded-2xl bg-white shadow-md overflow-hidden border border-neutral-200 transition hover:shadow-lg"
    >
      <div class="bg-neutral-100 flex items-center justify-center min-h-40 h-80">
        <img
          v-if="imgSrc !== ''"
          :src="imgSrc"
          :alt="data.name.dk || data.name.en || 'missing product name'"
          class="object-contain max-h-80 w-auto"
          @error="onImgError"
        />
        <ImageFallback v-if="errorImg" />
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
