  <script setup lang="ts">
  import { capitalize } from '@/lib/utils';
  import { GAME_DIFFICULTY, useGameStore } from '@/store/game.store';
  import { storeToRefs } from 'pinia';
  import ButtonSelection from '../atoms/ButtonSelection.vue';
  import Divider from '../atoms/Divider.vue';

  const store = useGameStore();
  const { mode, difficulty } = storeToRefs(store)

</script>

<template>
  <div class="hidden md:flex items-center gap-4 text-tp5 ">
    <div class="flex items-center gap-2">
      <span class="text-neutral-400 ">Difficulty:</span>
      <ButtonSelection v-for="label in GAME_DIFFICULTY" :handle-click="() => store.changeDifficulty(label)"
        :is-selected="difficulty === label">{{ capitalize(label) }}</ButtonSelection>
    </div>
    <Divider />
    <div class="flex items-center gap-2">
      <span class="text-neutral-400 ">Mode:</span>
      <ButtonSelection :handle-click="() => store.changeMode('timed')" :is-selected="mode === 'timed'">Timed (60s)
      </ButtonSelection>
      <ButtonSelection :handle-click="() => store.changeMode('passage')" :is-selected="mode === 'passage'">Passage
      </ButtonSelection>
    </div>
  </div>
</template>
