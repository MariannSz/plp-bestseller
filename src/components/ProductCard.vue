<script lang="ts" setup>
defineProps<{ data: any }>() // Replace with proper Product type later
</script>

<template>
  <div class="border p-2">
    <img :src="data.images[0]" alt="" class="max-w-full max-h-48 object-contain w-full" />
    <p class="text-sm mt-2">{{ data.name.en }}</p>
  </div>
</template>
