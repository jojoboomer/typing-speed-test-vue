<script setup lang="ts">
type Props = {
  handleClick: () => void,
  isSelected: boolean,
}
const props = defineProps<Props>()
</script>

<template>
  <button @click="props.handleClick" :class="[
    'border border-neutral-500 rounded-lg px-2.5 py-1.5 hover:border-blue-500! hover:text-blue-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900',
    { 'border-blue-500! text-blue-500': props.isSelected }
  ]">
    <slot></slot>
  </button>
</template>
