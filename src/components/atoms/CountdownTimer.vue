<template>
  <div class="countdown">
    {{ formattedTime }}
  </div>
</template>

<script setup>
import { useGameStore } from '@/store/game.store';
import { computed, ref, watch } from 'vue';

const TIME_DURATION = 60

const store = useGameStore();

let interval = null;
const timeLeft = ref(TIME_DURATION);

// Formatear tiempo a MM:SS o HH:MM:SS si hay más de una hora
const formattedTime = computed(() => {
  if (timeLeft.value < 0) return '00:00';

  const hours = Math.floor(timeLeft.value / 3600);
  const minutes = Math.floor((timeLeft.value % 3600) / 60);
  const seconds = timeLeft.value % 60;

  const h = hours.toString().padStart(2, '0');
  const m = minutes.toString().padStart(2, '0');
  const s = seconds.toString().padStart(2, '0');

  return hours > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
});

const clearLocalState = () => {
  clearInterval(interval);
  timeLeft.value = TIME_DURATION
}

// Watch sobre el estado del juego
watch(
  () => store.status,
  (newStatus) => {
    if (newStatus === 'started') {
      clearInterval(interval);
      interval = setInterval(() => {
        timeLeft.value--;
        if (timeLeft.value <= 0) {
          clearInterval(interval);
          store.status = 'finished';
        }
      }, 1000);
    } else if (newStatus !== 'started') {
      clearLocalState();
    }
  },
  { immediate: true }
);
</script>
