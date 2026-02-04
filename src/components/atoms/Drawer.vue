<script setup lang="ts">
import Menu from '@/assets/images/icon-menu.svg?url';
import { onMounted, onUnmounted, ref, watch } from 'vue';

interface Props {
  modelValue?: boolean;
  position?: 'right' | 'left' | 'bottom';
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  position: 'right',
});

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'open'): void;
  (e: 'close'): void;
}
const emit = defineEmits<Emits>();

const isOpen = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal;
});

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal);
  emit(newVal ? 'open' : 'close');
  // Reset any drag transform state when toggling the panel so it opens fully
  dragY.value = 0
  dragging.value = false
});

const open = () => { isOpen.value = true; };
const close = () => {
  isOpen.value = false;
};
const toggle = () => { isOpen.value = !isOpen.value; };

// Expose methods for template ref access
defineExpose({
  open,
  close,
  toggle,
  isOpen,
});

onMounted(() => {
  // Cleanup body style on unmount
  const body = document.querySelector('body')
  body.style.overflow = 'hidden'
})

onUnmounted(() => {
  // Cleanup body style on unmount
  const body = document.querySelector('body')
  body.style.overflow = null
})

// Drag to close (bottom sheet)
const panelRef = ref<HTMLElement | null>(null)
const dragging = ref(false)
const dragY = ref(0)
let startY = 0
let sheetHeight = 0

const onPointerDown = (e: PointerEvent) => {
  if (props.position !== 'bottom') return
  const panel = panelRef.value
  if (!panel) return
  startY = e.clientY
  sheetHeight = panel.getBoundingClientRect().height
  dragging.value = true
  dragY.value = 0
    (e.target as Element).setPointerCapture(e.pointerId)
}

const onPointerMove = (e: PointerEvent) => {
  if (!dragging.value) return
  const delta = Math.max(0, e.clientY - startY)
  dragY.value = delta
}

const onPointerUp = (e: PointerEvent) => {
  if (!dragging.value) return
  dragging.value = false
  const threshold = Math.min(120, sheetHeight * 0.25)
  if (dragY.value >= threshold) {
    // close the sheet
    isOpen.value = false
  } else {
    // animate back
    dragY.value = 0
  }
  try { (e.target as Element).releasePointerCapture(e.pointerId) } catch (err) { }
}

onMounted(() => {
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
})

onUnmounted(() => {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
})

</script>

<template>
  <!-- trigger -->
  <slot name="trigger" :open="open" :close="close" :toggle="toggle" :isOpen="isOpen">
    <button v-on:click="() => (isOpen = true)"
      class="border border-neutral-500 rounded-lg p-1 hover:border-blue-500! hover:text-blue-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900">
      <img :src="Menu" alt="Menu" class="size-6" />
    </button>
  </slot>
  <!-- content -->
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="isOpen" @click="isOpen = false" aria-hidden="true"
        class="absolute z-99 w-full h-screen overflow-hidden top-0 left-0 bg-black/60"></div>
    </Transition>
    <!-- Drawer Panel -->
    <Transition enter-active-class="transform transition duration-300 ease-out"
      :enter-from-class="position === 'bottom' ? 'translate-y-full' : (position === 'right' ? 'translate-x-full' : '-translate-x-full')"
      enter-to-class="translate-x-0 translate-y-0" leave-active-class="transform transition duration-200 ease-in"
      leave-from-class="translate-x-0 translate-y-0"
      :leave-to-class="position === 'bottom' ? 'translate-y-full' : (position === 'right' ? 'translate-x-full' : '-translate-x-full')">
      <div v-if="isOpen" ref="panelRef" role="dialog" aria-modal="true" @keydown.esc="close()"
        @pointerdown="onPointerDown" :class="[
          position === 'right' ? 'right-0 top-0 h-full' : position === 'left' ? 'left-0 top-0 h-full' : 'left-0 right-0 bottom-0',
          position === 'bottom' ? 'fixed bg-neutral-900 text-neutral-0 z-100 px-6 py-6 max-h-[60vh] rounded-t-xl flex flex-col gap-4' : 'fixed bg-neutral-900 text-neutral-0 z-100 px-6 py-8 max-w-sm flex flex-col gap-4'
        ]" :style="position === 'bottom' && (dragging || dragY) ? { transform: `translateY(${dragY}px)` } : undefined">
        <!-- Header Slot -->
        <div v-if="position == 'bottom'" class="w-full">
          <div class="w-12 h-1.5 bg-neutral-700 rounded-full mx-auto "></div>
        </div>
        <slot v-else name="header" :close="close" />
        <!-- Default Slot -->
        <slot :close="close" />
        <!-- Footer Slot -->
        <slot name="footer" :close="close" />
      </div>
    </Transition>
  </Teleport>
</template>
