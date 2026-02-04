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
const { mode, difficulty, textContent, minAcc, minAccValue, status } = storeToRefs(store)
const isOpen = ref(false)

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
          <span class="text-tp5 relative">Min accuracy:
            <span class="absolute -top-1 -right-5">
              <svg width="16" height="16" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="stroke-neutral-0 hover:stroke-blue-500">
                <path
                  d="M12 21.5C17.1086 21.5 21.25 17.3586 21.25 12.25C21.25 7.14137 17.1086 3 12 3C6.89137 3 2.75 7.14137 2.75 12.25C2.75 17.3586 6.89137 21.5 12 21.5Z"
                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M12.9309 8.15005C12.9256 8.39231 12.825 8.62272 12.6509 8.79123C12.4767 8.95974 12.2431 9.05271 12.0008 9.05002C11.8242 9.04413 11.6533 8.98641 11.5093 8.884C11.3652 8.7816 11.2546 8.63903 11.1911 8.47415C11.1275 8.30927 11.1139 8.12932 11.152 7.95675C11.19 7.78419 11.278 7.6267 11.405 7.50381C11.532 7.38093 11.6923 7.29814 11.866 7.26578C12.0397 7.23341 12.2192 7.25289 12.3819 7.32181C12.5446 7.39072 12.6834 7.506 12.781 7.65329C12.8787 7.80057 12.9308 7.97335 12.9309 8.15005ZM11.2909 16.5301V11.1501C11.2882 11.0556 11.3046 10.9615 11.3392 10.8736C11.3738 10.7857 11.4258 10.7057 11.4922 10.6385C11.5585 10.5712 11.6378 10.518 11.7252 10.4822C11.8126 10.4464 11.9064 10.4286 12.0008 10.43C12.094 10.4299 12.1863 10.4487 12.272 10.4853C12.3577 10.5218 12.4352 10.5753 12.4997 10.6426C12.5642 10.7099 12.6143 10.7895 12.6472 10.8767C12.6801 10.9639 12.6949 11.0569 12.6908 11.1501V16.5301C12.6908 16.622 12.6727 16.713 12.6376 16.7979C12.6024 16.8828 12.5508 16.96 12.4858 17.025C12.4208 17.09 12.3437 17.1415 12.2588 17.1767C12.1738 17.2119 12.0828 17.23 11.9909 17.23C11.899 17.23 11.8079 17.2119 11.723 17.1767C11.6381 17.1415 11.5609 17.09 11.4959 17.025C11.4309 16.96 11.3793 16.8828 11.3442 16.7979C11.309 16.713 11.2909 16.622 11.2909 16.5301Z"
                  class="fill-neutral-0 hover:fill-blue-500" />
              </svg>
            </span>
          </span>
          <div class="flex gap-2 mt-2 items-center">
            <ButtonSelection @on-click="() => (minAcc = false)" :is-selected="!minAcc">
              Off
            </ButtonSelection>
            <ButtonSelection @on-click="() => (minAcc = true)" :is-selected="minAcc">
              Set min value
            </ButtonSelection>
            <Divider v-if="minAcc" />
            <input
              class="w-16 border border-neutral-500 rounded-lg px-2.5 py-1 hover:border-blue-500! hover:text-blue-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
              v-if="minAcc" type="text" v-model="minAccValue" />
          </div>
        </div>
      </div>
    </template>
  </Drawer>
</template>

<style scoped></style>
