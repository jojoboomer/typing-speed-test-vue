<script setup lang="ts">
import GameConfig from '../molecules/GameConfig.vue';
import GameStats from '../molecules/GameStats.vue';
</script>

<template>
  <section
    class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-4 pb-4 border-b border-neutral-700">
    <GameStats />
    <GameConfig />
  </section>
</template>

<style scoped></style>
