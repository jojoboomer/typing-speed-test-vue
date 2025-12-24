<script setup lang="ts">
import Completed from '@/assets/images/icon-completed.svg?url'
import Record from '@/assets/images/icon-new-pb.svg?url'
import Confetti from '@/assets/images/pattern-confetti.svg?url'
import Star1 from '@/assets/images/pattern-star-1.svg?url'
import Star2 from '@/assets/images/pattern-star-2.svg?url'
import { useGameStore } from '@/store/game.store'
import { useTestStore } from '@/store/test.store'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'
import Button from '../atoms/Button.vue'
import RestartIcon from '../atoms/RestartIcon.vue'

const testState = useTestStore()
const gameState = useGameStore()

const { accuracy, wpm, incorrectChars, correctChars } = storeToRefs(testState)

type PageContent = {
  title: string
  subtitle: string
  label: string
  icon: string
}

const pageContent: PageContent = reactive({
  title: 'Test Complete!',
  subtitle: 'Solid run. Keep pushing to beat your high score.',
  label: "Go again",
  icon: Completed
})
if (gameState.endType === 'first') {
  pageContent.title = "Baseline Established!"
  pageContent.subtitle = "You've set the bar. Now the real challange begins-time to beat it."
  pageContent.label = "Beat This Score"
} else if (gameState.endType === 'recod') {
  pageContent.title = "High Score Smashed!"
  pageContent.subtitle = "You're getting faster. That was incredible typing."
  pageContent.label = "Beat This Score"
  pageContent.icon = Record
}

</script>

<template>
  <!-- Absolute icons -->
  <img v-if="gameState.endType == 'recod'" :src="Confetti" alt="Confetti" class="absolute bottom-0 left-0 w-full" />
  <img v-if="gameState.endType != 'recod'" :src="Star2" alt="Icon Star"
    class="size-5 md:size-8 absolute top-31 md:top-48 lg:top-64 left-4 md:left-12 lg:left-28 " />
  <img v-if="gameState.visibleConfetti" :src="Star1" alt="Icon Star"
    class="size-10 md:size-20 absolute bottom-10 md:bottom-80 lg:bottom-40 right-5 md:right-15 lg:right-25" />
  <!-- Section -->
  <section class="relative text-center w-full flex flex-col items-center gap-6 md:gap-8 pt-8">
    <!-- Icon -->
    <div class="flex flex-col items-center justify-center">
      <img :src="pageContent.icon" alt="Icon completed" class='drop-shadow-2xl drop-shadow-amber-50' />
    </div>
    <!-- Message -->
    <div class="py-4 md:py-6 space-y-2.5">
      <h2 class="text-tp1-bold">{{ pageContent.title }}</h2>
      <p class="text-tp3-regular text-neutral-400"> {{ pageContent.subtitle }} </p>
    </div>
    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 pb-6 md:pt-5 md:pb-8 w-full lg:w-fit">
      <div class="px-6 py-4 space-y-3 border border-neutral-700 rounded-lg w-full lg:w-40 lg:aspect-video text-start">
        <h5 class="text-tp3-regular text-neutral-400">WPM:</h5>
        <p class="text-tp2">{{ wpm }}</p>
      </div>
      <div class="px-6 py-4 space-y-3 border border-neutral-700 rounded-lg w-full lg:w-40 lg:aspect-video text-start">
        <h5 class="text-tp3-regular text-neutral-400">Accuracy:</h5>
        <p :class="['text-tp2 text-red-500', { 'text-green-500': accuracy == 100 }]">{{ accuracy }}</p>
      </div>
      <div class="px-6 py-4 space-y-3 border border-neutral-700 rounded-lg w-full lg:w-40 lg:aspect-video text-start">
        <h5 class="text-tp3-regular text-neutral-400">Characters:</h5>
        <p class="text-tp2"><span class="text-green-500">{{ correctChars }}</span>/<span class="text-red-500">{{
          incorrectChars
            }}</span></p>
      </div>
    </div>
    <!-- Button -->
    <div>
      <Button>
        {{ pageContent.label }}
        <RestartIcon width="10" height="10" :color="'fill-neutral-900'" />
      </Button>
    </div>
  </section>

</template>
