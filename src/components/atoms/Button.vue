<script setup lang="ts">
type Props = {
  handleClick?: () => void
  class?: string
}
const props = defineProps<Props>()
</script>

<template>
  <button @click="props.handleClick" :class="[
    `cursor-pointer bg-neutral-0 text-neutral-900 text-tp3-semibold px-4 py-2.5 has-[>svg]:px-3 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl transition-all disabled:pointer-events-none disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none`,
    props.class,
  ]">
    <slot />
  </button>
</template>
