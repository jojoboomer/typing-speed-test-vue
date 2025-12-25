<script setup lang="ts">
import { cn } from "@/lib/utils";
import { useGameStore } from '@/store/game.store';
import { useTestStore } from "@/store/test.store";
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';
import Button from "../atoms/Button.vue";
import GameConfig from '../molecules/GameConfig.vue';
import GameStats from '../molecules/GameStats.vue';

const inputRef = useTemplateRef('user-area')

const gameState = useGameStore();
const testState = useTestStore();

let interval: ReturnType<typeof setInterval> | null = null;
const userInput = ref('')
const indexCursor = ref(0)
const passageArray = computed(() => testState.passageSelected.split(''));

// computed class for every char
const charClasses = computed(() => {
  return passageArray.value.map((char, index) => {
    let className = 'text-neutral-400'

    if (index < userInput.value.length) {
      if (userInput.value[index] === char) {
        className = 'text-green-500'
      } else {
        className = 'text-red-500 underline'
      }
    }

    if (index === userInput.value.length) {
      className = `${className} bg-neutral-0/20 rounded`
    }

    return className
  })
})

// watch for user text inserted
watch(userInput, (newInput, oldInput) => {
  if (newInput.length > (oldInput?.length || 0)) {
    const newIndex = newInput.length - 1
    const newChar = newInput[newIndex]
    const expectedChar = passageArray.value[newIndex]

    if (newIndex >= indexCursor.value) {
      indexCursor.value++
      if (newChar === expectedChar) {
        testState.addCorrectChar()
      } else {
        testState.addWrongChar()
      }
    }
  }
}, { immediate: true })

//watch for text completation
watch(() => testState.shouldEnd, (isTrue) => isTrue && handleEndGame())

// get new text every time component is mounted
onMounted(() => {
  testState.getRandomPassage()
  testState.restartTestState()
  gameState.status = 'initial'
})
onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
})

// auxiliar functions
const handleStart = () => {
  if (interval) {
    clearInterval(interval);
    interval = null
  }
  gameState.startGame();
  interval = setInterval(() => {
    testState.elapsedTime++
  }, 1000)
  if (inputRef.value) {
    inputRef.value.focus();
  }
}

const handleEndGame = async () => {
  clearInterval(interval);
  interval = null
  gameState.endGame()
}

const handleClick = () => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
}
</script>

<template>
  <section
    class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 md:gap-4 pb-4 border-b border-neutral-700">
    <GameStats />
    <GameConfig />
  </section>
  <section class="relative">
    <!-- Bluur -->
    <div v-if="gameState.status == 'initial'" @click="handleStart"
      class="absolute w-full h-full z-50 flex items-center justify-center cursor-pointer">
      <div class=" text-center space-y-5">
        <Button :handle-click="handleStart" class="bg-blue-500! text-neutral-0!">Start Typing Test</Button>
        <p class="text-tp3-semibold">Or click the text and start typing</p>
      </div>
    </div>
    <!-- Tipyng board -->
    <div @click="handleClick" :class="cn(
      'relative text-tp1-regular cursor-text min-h-50',
      gameState.status == 'initial' && 'blur-xs'
    )">
      <div class="whitespace-pre-wrap wrap-break-word ">
        <span v-for="(char, index) in passageArray" :key="index" :class="charClasses[index]">
          {{ char }}
        </span>
      </div>
    </div>
    <textarea ref="user-area" v-model="userInput" class="sr-only" aria-label="Type the passage here" />
  </section>
</template>
