<script setup lang="ts">
import { Transition } from 'vue';

const props = defineProps({
  show: Boolean,
})
</script>

<template>
  <Transition name="modal">
    <div v-if="show"
      class="modal-mask fixed z-9998 top-0 left-0 w-full h-full bg-black/50 flex transition-opacity duration-300 ease-out overflow-hidden">
      <div
        class="modal-container space-y-4 bg-neutral-900 text-neutral-0 border border-neutral-700 max-w-md m-auto p-6 rounded-lg transition-all duration-300 ease-in-out">
        <div class="modal-header text-tp3-regular">
          <slot name="header">Confirm</slot>
        </div>

        <div class="modal-body text-tp5">
          <slot name="body" />
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button
              class="modal-default-button cursor-pointer bg-neutral-0 text-neutral-900 text-tp5 px-4 py-2.5 has-[>svg]:px-3 inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xl transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none"
              @click="$emit('close')">
              OK
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
