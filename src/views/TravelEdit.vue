<!-- src/views/TravelEdit.vue -->
<template>
  <div class="edit-container">
    <!-- App.vue 에서 Header 렌더링 -->
    <h1>여행 계획 편집 (ID: {{ planId }})</h1>
    <!-- 여기에 편집 폼을 구현하세요 -->
    <p>폼 구현 중…</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const planId = route.params.planId;
</script>

<style scoped>
.edit-container {
  max-width: 800px;
  margin: 70px auto 40px;
  padding: 0 20px;
  font-family: sans-serif;
}
</style>
