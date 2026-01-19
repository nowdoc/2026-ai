<template>
  <div class="p-8">
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold">Hello World</h1>
      <p>Welcome to AI SPA</p>
      <p class="text-sm text-gray-500">Backend URL: {{ config.public.backendUrl }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
</script>
