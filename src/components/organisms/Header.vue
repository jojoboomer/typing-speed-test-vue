<script setup>
import Trophy from '@/assets/images/icon-personal-best.svg?url';
import { useGameStore } from '@/store/game.store';
import { useTestStore } from '@/store/test.store';
import Logo from '../atoms/Logo.vue';
const store = useGameStore()
const store2 = useTestStore()
</script>

<template>
  <header class="flex items-center justify-between">
    <Logo />
    {{ store2.elapsedTime }}
    <div class="text-tp4 gap-2.5 flex items-center">
      <img :src="Trophy" alt="">
      <p><span class="text-neutral-400 ">
          Personal best:</span> {{ store.personalRecord }} WPM</p>

    </div>
  </header>
</template>
