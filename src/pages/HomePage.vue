<script setup lang="ts">
import Complete from '@/components/organisms/Complete.vue'
import GameBar from '@/components/organisms/GameBar.vue'
import GameBoard from '@/components/organisms/GameBoard.vue'
import GameHeader from '@/components/organisms/Header.vue'
import { useTypingStore } from '@/store/typing.store'

const store = useTypingStore()
</script>

<template>
  <main
    class="relative px-4 lg:px-12 xl:px-28 py-4 md:py-8 flex flex-col gap-8 md:gap-20 lg:gap-16 bg-neutral-900 text-neutral-0 min-h-screen text-base font-sora">
    <GameHeader />
    <GameBar v-if="store.status !== 'finished'" />
    <GameBoard v-if="store.status !== 'finished'" />
    <Complete v-else />
  </main>
</template>
<style scoped></style>
