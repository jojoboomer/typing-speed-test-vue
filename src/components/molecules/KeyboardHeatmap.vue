<script setup lang="ts">
import { cn } from "@/lib/utils";
import { useTypingStore } from "@/store/typing.store";

const store = useTypingStore();

// Layout físico del teclado (simplificado)
const rows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

// Función para determinar el estilo basado en las estadísticas
const getKeyClass = (key: string) => {
  const stats = store.keyStats[key];

  // 1. Si la tecla no se usó, estilo base neutro
  if (!stats || stats.total === 0) {
    return 'bg-neutral-800 text-neutral-500 border-neutral-700';
  }

  // 2. Calcular tasa de error (0.0 a 1.0)
  const errorRate = stats.errors / stats.total;

  // 3. Devolver clases según severidad
  // > 40% de error = Rojo Intenso
  if (errorRate > 0.4) return 'bg-red-500 text-white border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.5)]';
  // > 0% de error (algún error) = Amarillo
  if (stats.errors > 0) return 'bg-yellow-500 text-black border-yellow-400';

  // 0 errores = Verde (Perfecto)
  return 'bg-green-500 text-black border-green-400';
};

const getTooltip = (key: string) => {
  const stats = store.keyStats[key];
  if (!stats) return 'Not used';
  return `Key: ${key.toUpperCase()} | Errors: ${stats.errors}/${stats.total}`;
}
</script>

<template>
  <div class="flex flex-col gap-2 items-center select-none">
    <h3 class="text-tp3-regular text-neutral-400 mb-2">Error Heatmap:</h3>
    <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="flex gap-1.5 md:gap-2 justify-center">
      <div v-for="key in row" :key="key" :title="getTooltip(key)" :class="cn(
        'w-6 h-8 md:w-10 md:h-12 flex items-center justify-center rounded-md border font-mono text-sm md:text-base transition-all duration-300',
        getKeyClass(key)
      )">
        {{ key.toUpperCase() }}
      </div>
    </div>
  </div>
</template>
