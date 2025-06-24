<script setup lang="ts">
import { useRouter } from 'vue-router'
defineProps<{ node: any; selected: any }>()
const router = useRouter()
</script>

<template>
  <li>
    <a
      href="#"
      :class="[
        'block py-1 px-2 rounded hover:bg-blue-100',
        selected && selected.id === node.id
          ? 'bg-blue-200 text-blue-700 font-semibold'
          : 'text-gray-700',
      ]"
      @click.prevent="router.push({ path: `/${node.id}` })"
    >
      {{ node.name.dk || node.name.en }}
    </a>
    <ul class="pl-4 border-l border-blue-100 ml-2">
      <CategoryTree
        v-for="child in node.categories || []"
        :key="child.id"
        :node="child"
        :selected="selected"
      />
    </ul>
  </li>
</template>
