<script lang="ts" setup>
defineProps<{ data: any }>() // Replace with Promotion type later
</script>

<template>
  <div class="border p-2 bg-gray-100 rounded">
    <img :src="data.image.imageUrl" :alt="data.image.alt" class="w-full h-48 object-cover" />
  </div>
</template>
