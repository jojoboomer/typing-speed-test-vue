<script setup lang="ts">
import Completed from '@/assets/images/icon-completed.svg?url'
import Record from '@/assets/images/icon-new-pb.svg?url'
import Confetti from '@/assets/images/pattern-confetti.svg?url'
import Star1 from '@/assets/images/pattern-star-1.svg?url'
import Star2 from '@/assets/images/pattern-star-2.svg?url'
import { useTypingStore } from '@/store/typing.store'
import { storeToRefs } from 'pinia'
import Button from '../atoms/Button.vue'
import RestartIcon from '../atoms/RestartIcon.vue'
import KeyboardHeatmap from '../molecules/KeyboardHeatmap.vue'

type PageContent = {
  title: string
  subtitle: string
  label: string
  icon: string
}

const store = useTypingStore()

const { accuracy, wpm, isNewRecord, personalRecord, totalErrors, totalCorrect } = storeToRefs(store)

const lose = accuracy.value < store.minAccValue

const pageContent: PageContent = {
  title: 'Test Complete!',
  subtitle: 'Solid run. Keep pushing to beat your high score.',
  label: 'Go again',
  icon: Completed,
}

if (lose) {
  pageContent.title = 'Keep Trying!'
  pageContent.subtitle =
    "Don't be discouraged. Practice makes perfect. Give it another shot to improve your skills."
  pageContent.label = 'Retry Test'
}

if (!personalRecord.value) {
  pageContent.title = 'Baseline Established!'
  pageContent.subtitle = "You've set the bar. Now the real challange begins-time to beat it."
  pageContent.label = 'Beat This Score'
} else if (isNewRecord.value) {
  pageContent.title = 'High Score Smashed!'
  pageContent.subtitle = "You're getting faster. That was incredible typing."
  pageContent.label = 'Beat This Score'
  pageContent.icon = Record
}
</script>

<template>
  <!-- Absolute icons -->
  <img v-if="isNewRecord" :src="Confetti" alt="Confetti" class="absolute bottom-0 left-0 w-full" />
  <img v-if="!isNewRecord" :src="Star2" alt="Icon Star"
    class="size-5 md:size-8 absolute top-31 md:top-48 lg:top-64 left-4 md:left-12 lg:left-28 animate-pulse" />
  <img v-if="!isNewRecord" :src="Star1" alt="Icon Star"
    class="size-10 md:size-20 absolute bottom-10 md:bottom-80 lg:bottom-40 right-5 md:right-15 lg:right-25 animate-pulse" />
  <!-- Section -->
  <section class="relative text-center w-full flex flex-col items-center gap-6 md:gap-8 pt-8">
    <!-- Icon -->
    <div class="relative flex flex-col items-center justify-center">
      <div class="absolute w-30 h-30 rounded-full bg-green-500/10"></div>
      <div class="absolute w-22 h-22 rounded-full bg-green-500/20"></div>
      <img class="relative z-10 size-16" :src="pageContent.icon" alt="Icon completed" />
    </div>
    <!-- Message -->
    <div class="py-4 md:py-6 space-y-2.5">
      <h2 class="text-tp1-bold">{{ pageContent.title }}</h2>
      <p class="text-tp3-regular text-neutral-400">{{ pageContent.subtitle }}</p>
    </div>
    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 pb-6 md:pt-5 md:pb-8 w-full lg:w-fit">
      <div class="px-6 py-4 space-y-3 border border-neutral-700 rounded-lg w-full lg:w-40 lg:aspect-video text-start">
        <h5 class="text-tp3-regular text-neutral-400">WPM:</h5>
        <p class="text-tp2">{{ wpm }}</p>
      </div>
      <div class="px-6 py-4 space-y-3 border border-neutral-700 rounded-lg w-full lg:w-40 lg:aspect-video text-start">
        <h5 class="text-tp3-regular text-neutral-400">Accuracy:</h5>
        <p :class="['text-tp2 text-red-500', { 'text-green-500': accuracy == 100 }]">
          {{ accuracy }}
        </p>
      </div>
      <div class="px-6 py-4 space-y-3 border border-neutral-700 rounded-lg w-full lg:w-40 lg:aspect-video text-start">
        <h5 class="text-tp3-regular text-neutral-400">Characters:</h5>
        <p class="text-tp2">
          {{ totalCorrect }}<span class="text-neutral-400 mx-1">/</span><span class="text-red-500">{{ totalErrors
            }}</span>
        </p>
      </div>
    </div>
    <!-- Button -->
    <!-- px-6 py-4 space-y-3 border border-neutral-700 rounded-lg w-full lg:w-40 lg:aspect-video text-start -->

    <details class="w-full md:w-fit min-w-md p-6 rounded-lg border border-neutral-700">
      <summary class="text-tp3-regular text-neutral-400 cursor-pointer">Error Heatmap:</summary>
      <KeyboardHeatmap />
    </details>

    <div>
      <Button @click="store.initGame()">
        {{ pageContent.label }}
        <RestartIcon width="10" height="10" :color="'var(--color-neutral-900)'" />
      </Button>
    </div>
  </section>
</template>
