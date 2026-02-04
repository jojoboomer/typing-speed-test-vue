<script setup lang="ts">
import Menu from '@/assets/images/icon-menu.svg?url'
import { capitalize } from '@/lib/utils'
import { GAME_DIFFICULTY, GAME_TEXT, useTypingStore } from '@/store/typing.store'
import type { GameDifficulty, GameMode, GameText } from '@/types'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import ButtonSelection from '../atoms/ButtonSelection.vue'
import Divider from '../atoms/Divider.vue'
import Drawer from '../atoms/Drawer.vue'

const store = useTypingStore()
const { mode, difficulty, textContent, minAccValue, status } = storeToRefs(store)
const isOpen = ref(false)
const customAcc = ref(false)

const handleOpen = () => {
  if (status.value != 'paused') {
    store.pauseGame()
  }
};
const handleClose = () => {
  if (status.value == 'paused') {
    store.resumeGame()
  }
};

const onChangeMode = (value: GameMode) => {
  store.setMode(value)
  store.initGame()
}

const onChangeDifficulty = (value: GameDifficulty) => {
  store.setDifficulty(value)
  store.initGame()
}

const onChangeTextContent = (value: GameText) => {
  store.setTextContet(value)
  store.initGame()
}
</script>

<template>
  <Drawer v-model="isOpen" @open="handleOpen" @close="handleClose">
    <template #trigger="{ toggle, isOpen: drawerOpen }">
      <button @click="toggle" :aria-expanded="drawerOpen"
        class="md:hidden block border p-1 w-12 border-neutral-500 rounded-lg hover:border-blue-500! hover:text-blue-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900">
        <img :src="Menu" alt="Menu" class="size-6" />
      </button>
      <button @click="toggle" :aria-expanded="drawerOpen"
        class="hidden md:flex min-w-32 lg:w-fit gap-2 justify-center items-center border border-neutral-500 rounded-lg px-2.5 py-1.5 hover:border-blue-500! hover:text-blue-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900">
        <span>More</span>
      </button>
    </template>
    <template #header="{ close }">
      <div class="flex items-center gap-6">
        <button @click="close" class="cursor-pointer">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            class="group fill-none size-6 stroke-neutral-500 hover:stroke-neutral-400 stroke-2">
            <path
              d="M2 11C2 7.22876 2 5.34315 3.17157 4.17157C4.34315 3 6.22876 3 10 3H14C17.7712 3 19.6569 3 20.8284 4.17157C22 5.34315 22 7.22876 22 11V13C22 16.7712 22 18.6569 20.8284 19.8284C19.6569 21 17.7712 21 14 21H10C6.22876 21 4.34315 21 3.17157 19.8284C2 18.6569 2 16.7712 2 13V11Z" />
            <path d="M15 21L15 3" />
          </svg>
        </button>
        <h3 class="text-tp3-semibold">Configuration</h3>
      </div>
    </template>
    <template #default>
      <div class="space-y-2.5 mt-10 flex-1">
        <div>
          <span class="text-tp5">Difficulty:</span>
          <div class="flex flex-wrap gap-2 mt-2">
            <ButtonSelection v-for="label in GAME_DIFFICULTY" :key="label" @on-click="onChangeDifficulty(label)"
              :is-selected="difficulty === label">
              {{ capitalize(label) }}
            </ButtonSelection>
          </div>
        </div>
        <div>
          <span class="text-tp5">Mode:</span>
          <div class="flex flex-wrap gap-2 mt-2">
            <ButtonSelection @on-click="onChangeMode('timed')" :is-selected="mode === 'timed'">
              Timed (60s)
            </ButtonSelection>

            <ButtonSelection @on-click="onChangeMode('relaxed')" :is-selected="mode === 'relaxed'">
              Relaxed
            </ButtonSelection>

            <ButtonSelection @on-click="onChangeMode('passage')" :is-selected="mode === 'passage'">
              Passage
            </ButtonSelection>
          </div>
        </div>
        <div>
          <span class="text-tp5">Text content:</span>
          <div class="flex flex-wrap gap-2 mt-2">
            <ButtonSelection v-for="label in GAME_TEXT" :key="label" @on-click="onChangeTextContent(label)"
              :is-selected="textContent === label">
              {{ capitalize(label) }}
            </ButtonSelection>
          </div>
        </div>
        <div>
          <span class="text-tp5 relative">Min accuracy:</span>
          <div class="flex gap-2 mt-2 items-center">
            <ButtonSelection @on-click="() => (customAcc = false)" :is-selected="!customAcc">
              Default (15%)
            </ButtonSelection>
            <ButtonSelection @on-click="() => (customAcc = true)" :is-selected="customAcc">
              Custom
            </ButtonSelection>
            <div v-if="customAcc" class="flex items-center gap-1">
              <Divider class="mr-1" />
              <input type="number"
                class="w-16 border border-neutral-500 rounded-lg px-2.5 py-1 hover:border-blue-500! hover:text-blue-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                v-model.number="minAccValue" inputmode="numeric" pattern="[0-9]*" min="0" max="100" step="5" />
              <p>%</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Drawer>
</template>

<style scoped></style>
