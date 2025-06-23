<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import mockData from '@/data/mockData.json'
import MainMenu from '@/components/MainMenu.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'

const rootCategory = computed(() => mockData.categories)
const mainCategories = computed(() => rootCategory.value.categories)
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
  const id = route.params.categoryId || 'adults'
  return findCategoryById(rootCategory.value, id)
})

const selectedMainCategory = computed(() => {
  const id = route.params.categoryId || 'adults'
  return findLevel1Ancestor(rootCategory.value, id)
})
const showSidebar = computed(() => route.name === 'home')
</script>

<template>
  <MainMenu :categories="mainCategories" :selected="selectedMainCategory" />
  <div class="flex w-full min-h-screen">
    <SidebarMenu v-if="showSidebar" :category="rootCategory" :selected="currentCategory" />
    <main :class="[showSidebar ? 'flex-1' : 'w-full', 'bg-gray-50 p-4']">
      <RouterView />
    </main>
  </div>
</template>
