<template>
  <div class="dropdown relative w-full">
    <div @click="show = !show">
      <button
        class="w-full cursor-pointer bg-transparent flex items-center justify-center gap-2 border border-neutral-500 rounded-lg p-1.5">
        <slot name="title">Open</slot>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" fill="none" viewBox="0 0 11 6"
          :class="[show ? 'rotate-180' : '', 'transition-all duration-150 ease-in-out']">
          <path fill="#fff"
            d="M4.742 5.836.117 1.242c-.156-.125-.156-.375 0-.531L.742.117a.36.36 0 0 1 .531 0l3.75 3.688L8.743.117c.155-.156.405-.156.53 0l.625.594c.157.156.157.406 0 .531L5.273 5.836a.36.36 0 0 1-.53 0" />
        </svg>
      </button>
    </div>

    <div
      class="dropdown-content absolute rounded-lg shadow bg-neutral-800 overflow-hidden peer-checked:flex flex-col w-full mt-1 z-100"
      v-if="show" @click="show = !show">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
const show = ref(false)

provide('dropdown', {
  show,
  close: () => (show.value = false),
})
</script>
