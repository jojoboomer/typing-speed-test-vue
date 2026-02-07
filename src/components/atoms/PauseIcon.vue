<script setup lang="ts">
type Props = {
  color?: string
  width?: string
  height?: string
}
defineProps<Props>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    :width="width ? width : 20"
    :height="height ? height : 20"
    viewBox="0 0 24 24"
    stroke-width="2"
    :stroke="color"
    class="size-6"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
  </svg>
</template>
