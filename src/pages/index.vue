<script setup lang="ts">
import Button from '@/components/atoms/Button.vue';
import RestartIcon from '@/components/atoms/RestartIcon.vue';
import Complete from '@/components/organisms/Complete.vue';
import GameBoard from '@/components/organisms/GameBoard.vue';
import Header from '@/components/organisms/Header.vue';
import { useGameStore } from '@/store/game.store';

const store = useGameStore();
const handleStopGame = () => {
  store.restartGame();
};
</script>

<template>
  <main
    class="relative px-4 md:px-8 lg:px-28 py-4 md:py-8 flex flex-col gap-8 md:gap-20 lg:gap-16 bg-neutral-900 text-neutral-0 min-h-screen text-base font-sora">
    <Header />
    <Complete v-if="store.status === 'finished'" />
    <GameBoard v-if="store.status !== 'finished'" />
    <section v-if="store.status == 'started'"
      class="border-t border-neutral-700 pt-6 md:pt-8 flex items-center justify-center">
      <Button :handle-click="handleStopGame" class="bg-neutral-800 ">
        <span class="text-neutral-0">Restart Test </span>
        <RestartIcon width="10" height="10" :color="'fill-neutral-0'" />
      </Button>
    </section>
  </main>
</template>
<style scoped></style>
