<script setup lang="ts">
import Menu from '@/assets/images/icon-menu.svg?url';
import { onMounted, onUnmounted, ref, watch } from 'vue';

interface Props {
  modelValue?: boolean;
  position?: 'right' | 'left';
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
      :enter-from-class="position === 'right' ? 'translate-x-full' : '-translate-x-full'" enter-to-class="translate-x-0"
      leave-active-class="transform transition duration-200 ease-in" leave-from-class="translate-x-0"
      :leave-to-class="position === 'right' ? 'translate-x-full' : '-translate-x-full'">
      <div v-if="isOpen" role="dialog" aria-modal="true" @keydown.esc="close()" :class="[
        position === 'right' ? 'right-0' : 'left-0',
        'fixed top-0 h-full bg-neutral-900 text-neutral-0 z-100 px-6 py-8 max-w-sm flex flex-col gap-4'
      ]">
        <!-- Header Slot -->
        <slot name="header" :close="close" />
        <!-- Default Slot -->
        <slot :close="close" />
        <!-- Footer Slot -->
        <slot name="footer" :close="close" />
      </div>
    </Transition>
  </Teleport>
</template>
