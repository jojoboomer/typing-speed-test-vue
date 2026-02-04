<script setup lang="ts">
import Trophy from '@/assets/images/icon-personal-best.svg?url'
import BigLogo from '@/assets/images/logo-large.svg?url'
import SmallLogo from '@/assets/images/logo-small.svg?url'
import { useTypingStore } from '@/store/typing.store'

const store = useTypingStore()
</script>

<template>
  <header class="flex items-center justify-between">
    <div>
      <!-- big icon -->
      <img :src="BigLogo" alt="Logo" class="hidden md:block" />
      <!-- small icon -->
      <img :src="SmallLogo" alt="Logo" class="md:hidden block" />
    </div>
    <div class="text-tp4 gap-2.5 flex items-center">
      <img :src="Trophy" alt="Personal best" />
      <p class="hidden md:block">
        <span class="text-neutral-400"> Personal best:</span> {{ store.personalRecord }} WPM
      </p>
      <p class="md:hidden block">
        <span class="text-neutral-400"> Best:</span> {{ store.personalRecord }} WPM
      </p>
    </div>
  </header>
</template>
