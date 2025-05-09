<template>
  <div>
    <button class="chatbot-toggle" @click="toggleOpen">
      <img :src="chatbotImage" alt="Chatbot" />
    </button>

    <transition name="fade">
      <div v-if="isOpen" class="chatbot-container">
        <header class="chatbot-header">
          <h3 class="chatbot-title">KONNECT AI</h3>
        </header>
        <div class="chatbot-body" ref="body">
          <div
            v-for="(msg, idx) in messages"
            :key="idx"
            :class="['message', msg.from]"
          >
            <p>{{ msg.text }}</p>
            <!-- <time>{{ msg.time }}</time> -->
          </div>
        </div>
        <footer class="chatbot-input">
          <input
            v-model="userInput"
            @keyup.enter="sendMessage"
            placeholder="Type a message..."
          />
          <button @click="sendMessage">
            <svg viewBox="0 0 24 24">
              <path fill="#fff" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
            </svg>
          </button>
        </footer>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import chatbotImage from "../assets/chatbot.png";

const isOpen = ref(false);
const userInput = ref("");
const messages = ref([
  {
    from: "bot",
    text: "Hello! How can I help you plan your trip?",
    time: new Date().toLocaleTimeString(),
  },
]);

function toggleOpen() {
  isOpen.value = !isOpen.value;
  // 열릴 때 스크롤을 맨 아래로
  if (isOpen.value) {
    nextTick(() => {
      const body = document.querySelector(".chatbot-body");
      if (body) body.scrollTop = body.scrollHeight;
    });
  }
}

function sendMessage() {
  if (!userInput.value.trim()) return;
  messages.value.push({
    from: "user",
    text: userInput.value,
    time: new Date().toLocaleTimeString(),
  });
  const input = userInput.value;
  userInput.value = "";
  nextTick(() => {
    const body = document.querySelector(".chatbot-body");
    if (body) body.scrollTop = body.scrollHeight;
  });
  setTimeout(() => {
    messages.value.push({
      from: "bot",
      text: `You said: "${input}". Here are some tips...`,
      time: new Date().toLocaleTimeString(),
    });
    nextTick(() => {
      const body = document.querySelector(".chatbot-body");
      if (body) body.scrollTop = body.scrollHeight;
    });
  }, 600);
}
</script>

<style scoped>
.chatbot-toggle {
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  z-index: 1000;
  background-color: #f7f8f9;
}
.chatbot-toggle img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.chatbot-container {
  position: fixed;
  bottom: 100px;
  right: 16px;
  width: 320px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  font-family: "Freesentation-9Black", sans-serif;
  z-index: 1000;
}

.chatbot-header {
  display: flex;
  align-items: center;
  background: #c2372f;
  padding: 12px;
}
.chatbot-title {
  color: #fff;
  font-size: 16px;
  margin: 0;
}
.chatbot-body {
  flex: 1;
  padding: 12px;
  background: #f5f5f5;
  overflow-y: auto;
}
.message {
  position: relative;
  max-width: 75%;
  margin-bottom: 12px;
  padding: 10px 14px;
  border-radius: 12px;
  line-height: 1.4;
}
.message p {
  margin: 0;
}
.message.bot {
  background: #fff;
  align-self: flex-start;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.message.user {
  background: #c2372f;
  color: #fff;
  align-self: flex-end;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.chatbot-input {
  display: flex;
  padding: 8px;
  background: #f5f5f5;
}
.chatbot-input input {
  flex: 1;
  border: none;
  border-radius: 8px;
  padding: 8px;
  font-size: 14px;
  margin-right: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.chatbot-input input:focus {
  outline: 1px solid #c2372f;
}
.chatbot-input button {
  background: #c2372f;
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.chatbot-input button svg {
  width: 20px;
  height: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
