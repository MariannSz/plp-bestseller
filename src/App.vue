<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import mockData from '@/data/mockData.json'
import MainMenu from '@/components/MainMenu.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'

const sidebarOpen = ref(false)
const rootCategory = computed(() => mockData.categories)
const allProductsCategory = {
  id: 'all',
  name: { dk: 'Alle produkter', en: 'All Products' },
  level: 0,
}

const mainCategories = computed(() => [allProductsCategory, ...rootCategory.value.categories])
const route = useRoute()

function findCategoryById(category, id) {
  if (category.id === id) return category
  if (category.categories) {
    for (const cat of category.categories) {
      const found = findCategoryById(cat, id)
      if (found) return found
    }
  }
  return null
}

function findLevel1Ancestor(category, id) {
  if (!category.categories) return null
  for (const cat of category.categories) {
    if (cat.id === id) return cat
    if (cat.categories) {
      const found = findLevel1Ancestor(cat, id)
      if (found) return cat.level === 1 ? cat : found
    }
  }
  return null
}

const currentCategory = computed(() => {
  const id = route.params.categoryId || 'all'
  if (id === 'all') return allProductsCategory
  return findCategoryById(rootCategory.value, id)
})

const selectedMainCategory = computed(() => {
  const id = route.params.categoryId || 'all'
  if (id === 'all') return allProductsCategory
  return findLevel1Ancestor(rootCategory.value, id)
})

const showSidebar = computed(() => route.name === 'home')
const isProductDetail = computed(() => route.name === 'product-detail')
</script>

<template>
  <MainMenu v-if="!isProductDetail" :categories="mainCategories" :selected="selectedMainCategory" />
  <div class="flex w-full min-h-screen">
    <!-- Mobile sidebar toggle button -->
    <button
      class="md:hidden fixed top-4 left-4 z-30 bg-blue-600 text-white px-4 py-2 rounded shadow"
      @click="sidebarOpen = true"
      v-if="showSidebar"
    >
      Kategorier
    </button>
    <!-- Sidebar: hidden on mobile, visible on md+ -->
    <SidebarMenu
      v-if="showSidebar"
      :category="rootCategory"
      :selected="currentCategory"
      class="hidden md:block"
    />
    <!-- Mobile Sidebar Drawer -->
    <transition name="fade">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-40 bg-black bg-opacity-40 flex"
        @click.self="sidebarOpen = false"
      >
        <aside class="w-64 max-w-full bg-white h-full shadow-lg p-4 overflow-y-auto">
          <button class="mb-4 text-blue-600 font-bold" @click="sidebarOpen = false">Luk</button>
          <SidebarMenu :category="rootCategory" :selected="currentCategory" />
        </aside>
      </div>
    </transition>
    <main :class="[showSidebar ? 'flex-1' : 'w-full', 'bg-gray-50 p-4']">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
