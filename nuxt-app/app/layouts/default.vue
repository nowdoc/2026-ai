<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// Single page menu
const menuGroups: NavigationMenuItem[][] = [
  [{
    label: 'Home',
    icon: 'i-lucide-house',
    to: '/'
  }]
]
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- Top Navigation Bar -->
    <header class="border-b border-default bg-elevated/25">
      <div class="flex items-center justify-between px-4 py-3">
        <div class="flex items-center gap-6">
          <h1 class="text-lg font-semibold">AI SPA</h1>

          <nav class="flex items-center gap-0">
            <template v-for="(group, groupIndex) in menuGroups" :key="groupIndex">
              <UNavigationMenu
                :items="group"
                orientation="horizontal"
                class="flex items-center"
              />
              <UDivider
                v-if="groupIndex < menuGroups.length - 1"
                orientation="vertical"
                class="h-6 mx-2"
              />
            </template>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 overflow-auto">
      <slot />
    </main>
  </div>
</template>
