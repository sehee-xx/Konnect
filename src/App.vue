<template>
  <!-- loading true일 때만 로더가 보입니다 -->
  <LandingLoader v-if="loading" />

  <Header
    v-if="!route.meta.noHeader"
    :is-logged-in="auth.isLoggedIn"
    @logout="auth.logout"
  />
  <router-view @login="(user) => auth.login(user)" />
  <button class="btn-translate" @click="toggleLocale">
    {{ currentLocale === "en" ? "KR" : "EN" }}
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import Header from "./components/Header.vue";
import LandingLoader from "./components/LandingLoader.vue";
import { auth } from "./stores/auth";
import { emitter } from "../src/plugins/emitter";

const route = useRoute();
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
function toggleLocale() {
  locale.value = locale.value === "en" ? "ko" : "en";
}

const loading = ref(false);

onMounted(() => {
  emitter.on("start-loading", () => {
    loading.value = true;
  });
  emitter.on("end-loading", () => {
    loading.value = false;
  });
});
onUnmounted(() => {
  emitter.off("start-loading");
  emitter.off("end-loading");
});
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
  z-index: 1000;
}
.btn-translate:hover {
  background: #bf3b38;
}
.btn-translate:active {
  background: #a73332;
}
</style>
