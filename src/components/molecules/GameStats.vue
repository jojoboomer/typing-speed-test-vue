<script setup lang="ts">
import { useGameStore } from '@/store/game.store';
import { useTestStore } from '@/store/test.store';
import { computed } from 'vue';
import Divider from '../atoms/Divider.vue';

const testState = useTestStore()
const gameState = useGameStore()
const remainingTime = computed(() => {
  if (gameState.mode == 'passage') return testState.elapsedTime
  return testState.countdownTime - testState.elapsedTime
})
</script>

<template>
  <div class="flex items-center gap-5 md:gap-6 text-tp3-regular w-full md:w-fit">
    <div class="flex flex-col lg:flex-row lg:items-center w-full md:w-fit">
      <p class="text-neutral-400 ">WPM:</p>
      <p>{{ testState.wpm }}</p>
    </div>
    <Divider class="h-12 md:h-6" />
    <div class="lg:flex lg:items-center w-full md:w-fit">
      <p class="text-neutral-400 ">Accuracy:</p>
      <p>{{ testState.accuracy }}%</p>
    </div>
    <Divider class="h-12 md:h-6" />
    <div class="lg:flex lg:items-center w-full md:w-fit">
      <p class="text-neutral-400 ">Time:</p>
      <p>{{ remainingTime }}</p>
    </div>
    <Divider class="h-12 md:h-6" />
    <div class="lg:flex lg:items-center w-full md:w-fit">
      <p>{{ testState.correctChars }}</p> /
      <p>{{ testState.incorrectChars }}</p>
    </div>
  </div>
</template>
