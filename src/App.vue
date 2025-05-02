<!-- src/App.vue -->
<template>
  <router-view />
  <button class="btn-translate" @click="toggleLocale">
    {{ currentLocale === "en" ? "KR" : "EN" }}
  </button>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
function toggleLocale() {
  locale.value = locale.value === "en" ? "ko" : "en";
}
</script>

<style>
.btn-translate {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: background 0.2s ease, transform 0.1s ease;
  z-index: 1000;
}
.btn-translate:hover {
  background: #bf3b38;
  transform: translateY(-1px);
}
.btn-translate:active {
  background: #a73332;
  transform: translateY(0);
}
</style>
