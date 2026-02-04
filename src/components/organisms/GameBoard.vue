<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useTypingStore } from '@/store/typing.store'
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted, useTemplateRef, watch } from 'vue'
import Button from '../atoms/Button.vue'
import PauseIcon from '../atoms/PauseIcon.vue'
import RestartIcon from '../atoms/RestartIcon.vue'

const inputRef = useTemplateRef('user-area')

const store = useTypingStore()
const { currentPassage, status, userInput } = storeToRefs(store)

// Convert passage text into an array of characters
const passageArray = computed(() => {
  return currentPassage.value?.text.split('') || []
})

const showButtons = () => status.value == 'started' || status.value == 'paused'

const showBlur = () => currentPassage && (status.value == 'initial' || status.value == 'paused')

// Compute CSS classes for each character based on user input accuracy
const charClasses = computed(() => {
  if (!currentPassage.value) return []

  return currentPassage.value.text.split('').map((char, index) => {
    const userChar = userInput.value[index]

    if (userChar == null) {
      const isCursor = index === userInput.value.length
      return isCursor && status.value !== 'finished'
        ? 'bg-neutral-0/20 rounded text-neutral-400'
        : 'text-neutral-400'
    }

    return userChar === char ? 'text-green-500' : 'text-red-500 underline'
  })
})

// Start the game and focus the input field
const handleStart = () => {
  store.startGame()
  focusInput()
}

// Reset the game to initial state
const handleStopGame = () => {
  store.initGame()
  focusInput()
}

// pause the game
const handlePauseToggle = () => {
  if (status.value === 'paused') {
    store.resumeGame()
  } else {
    store.pauseGame()
  }
}

// Handle textarea input and update store with user input
const handleInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement
  store.handleInput(target.value)
}

// Focus the hidden textarea input field
const focusInput = () => {
  if (status.value !== 'finished' && inputRef.value) {
    inputRef.value.focus()
  }
}

// Auto-focus input when game status changes to 'started'
watch(status, (newVal) => {
  if (newVal === 'started') focusInput()
})

// Initialize the game on component mount (loads passage asynchronously)
onMounted(() => {
  store.initGame()
})

// Cleanup when component unmounts (stops the timer composable)
onUnmounted(() => {
  store.stopGame()
})
</script>

<template>
  <section class="relative">
    <!-- Bluur -->
    <div v-if="status == 'initial'" @click="handleStart"
      class="absolute w-full h-full z-50 flex items-center justify-center cursor-pointer">
      <div class="text-center space-y-5">
        <Button :handle-click="handleStart" class="bg-blue-500! text-neutral-0!">Start Typing Test</Button>
        <p class="text-tp3-semibold">Or click the text and start typing</p>
      </div>
    </div>
    <!-- Tipyng board -->
    <div @click="focusInput" :class="cn('relative text-tp1-regular cursor-text min-h-50', showBlur() && 'blur-sm')">
      <div class="whitespace-pre-wrap wrap-break-word">
        <span v-for="(char, index) in passageArray" :key="index" :class="charClasses[index]">
          {{ char }}
        </span>
      </div>
    </div>
    <textarea ref="user-area" :value="userInput" class="sr-only" aria-label="Type the passage here" autocomplete="off"
      autocorrect="off" autocapitalize="off" spellcheck="false" @input="handleInput" @blur="focusInput" />
  </section>
  <section class="border-t border-neutral-700 pt-6 md:pt-8 flex items-center justify-center gap-4">
    <Button v-if="showButtons()" :handle-click="handleStopGame" class="bg-neutral-800">
      <span class="text-neutral-0">Restart Test </span>
      <RestartIcon width="10" height="10" :color="'var(--color-neutral-0)'" />
    </Button>
    <Button v-if="showButtons()" class="bg-neutral-800" :handle-click="handlePauseToggle"
      :disabled="status === 'initial' || status === 'finished'">
      <span class="text-neutral-0">{{ status === 'paused' ? 'Resume' : 'Pause' }}</span>
      <PauseIcon width="10" height="10" :color="'var(--color-neutral-0)'" />
    </Button>
  </section>
</template>
