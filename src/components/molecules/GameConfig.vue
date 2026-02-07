<script setup lang="ts">
import { capitalize } from '@/lib/utils'
import { GAME_DIFFICULTY, useTypingStore } from '@/store/typing.store'
import { type GameDifficulty, type GameMode } from '@/types'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import Button from '../atoms/Button.vue'
import ButtonSelection from '../atoms/ButtonSelection.vue'
import Divider from '../atoms/Divider.vue'
import DropdownItem from '../atoms/Dropdown/DropdownItem.vue'
import Dropdown from '../atoms/Dropdown/DropdownMenu.vue'
import Modal from '../atoms/Modal.vue'
import ConfigDrawer from './ConfigDrawer.vue'

const store = useTypingStore()
const { mode, difficulty, status } = storeToRefs(store)

const valueToChange = ref({
  id: '',
  newValue: '',
  oldValue: '',
})

const onChangeDifficulty = (value: GameDifficulty) => {
  if (status.value !== 'initial') {
    valueToChange.value = {
      id: 'difficulty',
      oldValue: difficulty.value,
      newValue: value,
    }
    openModal()
    return
  }
  store.setDifficulty(value)
  store.initGame()
}

const onChangeMode = (value: GameMode) => {
  if (status.value !== 'initial') {
    valueToChange.value = {
      id: 'mode',
      oldValue: mode.value,
      newValue: value,
    }
    openModal()
    return
  }
  store.setMode(value)
}

const showModal = ref(false)
const openModal = () => (showModal.value = true)
const closeModal = () => {
  showModal.value = false
  valueToChange.value = { id: '', newValue: '', oldValue: '' }
}

const handleConfirm = () => {
  if (valueToChange.value.id === 'difficulty') {
    store.setDifficulty(valueToChange.value.newValue as GameDifficulty)
  } else if (valueToChange.value.id === 'mode') {
    store.setMode(valueToChange.value.newValue as GameMode)
  }

  store.initGame()
  closeModal()
}
</script>

<template>
  <!-- Desktop -->
  <div class="hidden lg:flex items-center gap-4 text-tp5">
    <div class="flex items-center gap-2">
      <span class="text-neutral-400">Difficulty:</span>
      <ButtonSelection v-for="label in GAME_DIFFICULTY" :key="label" @on-click="onChangeDifficulty(label)"
        :is-selected="difficulty === label">
        {{ capitalize(label) }}
      </ButtonSelection>
    </div>

    <Divider />

    <div class="flex items-center gap-2">
      <span class="text-neutral-400">Mode:</span>
      <ButtonSelection @on-click="onChangeMode('timed')" :is-selected="mode === 'timed'">
        Timed
      </ButtonSelection>

      <ButtonSelection @on-click="onChangeMode('relaxed')" :is-selected="mode === 'relaxed'">
        Relaxed
      </ButtonSelection>

      <ButtonSelection @on-click="onChangeMode('passage')" :is-selected="mode === 'passage'">
        Passage
      </ButtonSelection>
    </div>

    <Divider />
    <div class="flex items-center gap-2">
      <ConfigDrawer />
    </div>
  </div>
  <!-- Mobile  -->
  <div class="lg:hidden flex items-center justify-between gap-4 text-tp5 w-full">
    <Dropdown>
      <template #title>{{ capitalize(difficulty) }}</template>
      <div>
        <DropdownItem v-for="label in GAME_DIFFICULTY" :key="label" :checked="difficulty == label"
          @on-click="onChangeDifficulty(label)">{{ capitalize(label) }}</DropdownItem>
      </div>
    </Dropdown>
    <Dropdown>
      <template #title>{{ capitalize(mode) }}</template>
      <div>
        <DropdownItem :checked="mode == 'timed'" @on-click="onChangeMode('timed')">Timed (60s)</DropdownItem>
        <DropdownItem :checked="mode == 'relaxed'" @on-click="onChangeMode('relaxed')">Relaxed</DropdownItem>
        <DropdownItem :checked="mode == 'passage'" @on-click="onChangeMode('passage')">Passage</DropdownItem>
      </div>
    </Dropdown>
    <ConfigDrawer />
  </div>

  <!-- Confirm Modal -->
  <Teleport to="body">
    <Modal :show="showModal">
      <template #header>
        <h3>Confirm Change</h3>
      </template>
      <template #body>
        <div class="text-tp5 text-neutral-0 space-y-2">
          <p>
            Changing the
            <span class="font-semibold text-blue-600">{{ valueToChange.id }}</span> will restart
            your current game session. Your progress will be lost.
          </p>
          <p>
            You're about to change from
            <span class="font-mono font-semibold text-red-600">{{
              capitalize(valueToChange.oldValue)
              }}</span>
            to
            <span class="font-mono font-semibold text-green-600">{{
              capitalize(valueToChange.newValue)
              }}</span>.
          </p>
        </div>
      </template>
      <template #footer>
        <div class="flex gap-2 items-center justify-end">
          <Button class="text-tp-5 bg-transparent border border-neutral-500 text-neutral-0!" @click="closeModal">
            Cancel
          </Button>
          <Button class="text-tp-5" @click="handleConfirm"> Apply </Button>
        </div>
      </template>
    </Modal>
  </Teleport>
</template>

<style>
.dd-trigger {
  width: 100%;
}

.dd-trigger button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent !important;
  border-color: var(--color-neutral-500) !important;
}
</style>
