<script setup lang="ts">
import CategoryTree from './CategoryTree.vue'
defineProps<{ category: any; selected: any }>()
</script>

<template>
  <aside class="w-60 p-4 bg-gray-100 overflow-y-auto">
    <ul>
      <CategoryTree
        v-for="child in category.categories || []"
        :key="child.id"
        :node="child"
        :selected="selected"
      />
    </ul>
  </aside>
</template>
