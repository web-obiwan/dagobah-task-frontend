<template>
  <p
      v-if="storyPoint"
      :style="{
      color: getColorByValue(Number(storyPoint))
    }"
      class="font-black opacity-65 text-[0.7rem]"
  >
    {{ storyPoint }}
  </p>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  storyPoint: number | string
}>();

const getColorByValue = (value: number) => {
  if (value <= 3) {
    return '#ca8a04'; // Bleu
  } else if (value <= 8) {
    return '#d97706'; // Jaune foncé
  } else if (value <= 13) {
    return '#ea580c'; // Ambre
  } else if (value <= 21) {
    return '#dc2626'; // Orange
  } else if (value <= 34) {
    return '#e11d48'; // Rouge
  } else {
    return '#e11d48'; // Rouge
  }
};
</script>
