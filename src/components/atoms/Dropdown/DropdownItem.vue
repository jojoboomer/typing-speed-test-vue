<template>
  <div role="button" @click="handleClick"
    class="p-2 not-last:border-b border-neutral-500/50 flex items-center gap-2 flex-wrap">
    <div class="w-4 aspect-square bg-transparent border border-neutral-500 rounded-full"
      :class="checked && 'border-5 border-blue-600!'"></div>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { inject } from 'vue';

type Props = {
  checked?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['onClick'])

const state = inject('dropdown') as { show: string; close: () => void }
const handleClick = () => {
  state.close
  emit('onClick')
}
</script>
