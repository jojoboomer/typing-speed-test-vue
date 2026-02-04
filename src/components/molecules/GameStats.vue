<script setup lang="ts">
import { useTypingStore } from '@/store/typing.store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import Divider from '../atoms/Divider.vue'

const store = useTypingStore()

const { wpm, accuracy, elapsedTime, targetDuration, minAccValue, minAcc } = storeToRefs(store)

const remainingTime = computed(() => {
  // passage
  if (targetDuration.value === 0) return elapsedTime.value.toFixed(0)

  // timed
  const left = Math.max(0, targetDuration.value - elapsedTime.value)
  return left.toFixed(0)
})

const accuracyColor = computed(() => {
  const minValue = minAcc.value ? minAccValue.value : 0
  return accuracy.value - minValue < 40 ? 'text-red-500' : 'text-neutral-0'
})
const timeColor = computed(() => {
  return parseInt(remainingTime.value) < targetDuration.value * 0.4
    ? 'text-red-500'
    : 'text-neutral-0'
})
</script>

<template>
  <div class="w-full text-tp3-regular flex items-center gap-5 lg:w-fit">
    <div class="md:flex md:items-center w-full lg:w-fit">
      <p class="text-neutral-400">WPM:</p>
      <p>{{ wpm }}</p>
    </div>
    <Divider class="h-12 md:h-6" />
    <div class="md:flex md:items-center w-full lg:w-fit">
      <p class="text-neutral-400">Accuracy:</p>
      <p :class="accuracyColor">{{ accuracy }}%</p>
    </div>
    <Divider class="h-12 md:h-6" />
    <div class="md:flex md:items-center w-full lg:w-fit">
      <p class="text-neutral-400">{{ targetDuration === 0 ? 'Time' : 'Time Left' }}:</p>
      <p :class="timeColor">{{ remainingTime }}</p>
      <!-- TODO: mostrar como 00:00 -->
    </div>
  </div>
</template>
