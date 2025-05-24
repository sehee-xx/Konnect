<!-- src/App.vue -->
<template>
  <!-- 1) 전역 헤더 -->
  <Header
    v-if="!route.meta.noHeader"
    :is-logged-in="auth.isLoggedIn"
    @logout="auth.logout"
  ></Header>
  <!-- 2) 라우터 뷰: 각 페이지(Login.vue 등)에서 로그인 성공 시 'login' 이벤트를 emit -->
  <router-view @login="(userInfo) => auth.login(userInfo)" />

  <!-- 3) 다국어 토글 버튼 (기존) -->
  <button class="btn-translate" @click="toggleLocale">
    {{ currentLocale === "en" ? "KR" : "EN" }}
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import Header from "./components/Header.vue";
import { auth } from "../src/stores/auth";

const { locale } = useI18n();
const route = useRoute();
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
  z-index: 1000;
}
.btn-translate:hover {
  background: #bf3b38;
}
.btn-translate:active {
  background: #a73332;
}
</style>
