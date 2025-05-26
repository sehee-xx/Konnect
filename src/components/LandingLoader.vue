<!-- src/components/LandingLoader.vue -->
<template>
  <div class="loader-overlay">
    <lottie-player
      :src="loadingUrl"
      background="transparent"
      speed="1"
      loop
      autoplay
      style="width: 200px; height: 200px"
    ></lottie-player>
  </div>
</template>

<script setup>
import "@lottiefiles/lottie-player";

// Vite 전용 기능: ?url 을 붙이면 JSON이 URL 문자열로 반환됩니다.
import loadingUrl from "../assets/loading.json?url";
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}
</style>
