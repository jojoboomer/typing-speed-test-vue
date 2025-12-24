<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div :class="['h-6 w-px bg-neutral-700', props.class]"></div>
</template>
