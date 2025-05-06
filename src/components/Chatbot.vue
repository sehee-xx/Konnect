<template>
  <div class="chatbot-container">
    <header class="chatbot-header">
      <img :src="chatbotImage" alt="Chatbot" class="chatbot-avatar" />
      <h3 class="chatbot-title">KONNECT AI</h3>
    </header>
    <div class="chatbot-body">
      <div
        v-for="(msg, idx) in messages"
        :key="idx"
        :class="['message', msg.from]"
      >
        <p>{{ msg.text }}</p>
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
</template>

<script setup>
import { ref } from "vue";
import chatbotImage from "../assets/chatbot.png";

const userInput = ref("");
const messages = ref([
  {
    from: "bot",
    text: "Hello! How can I help you plan your trip?",
    time: new Date().toLocaleTimeString(),
  },
]);

function sendMessage() {
  if (!userInput.value.trim()) return;
  messages.value.push({
    from: "user",
    text: userInput.value,
    time: new Date().toLocaleTimeString(),
  });
  const input = userInput.value;
  userInput.value = "";
  setTimeout(() => {
    messages.value.push({
      from: "bot",
      text: `You said: "${input}". Here are some tips...`,
      time: new Date().toLocaleTimeString(),
    });
  }, 600);
}
</script>

<style scoped>
.chatbot-container {
  width: 320px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  font-family: "Freesentation-9Black", sans-serif;
}
.chatbot-header {
  display: flex;
  align-items: center;
  background: #c2372f;
  padding: 12px;
}
.chatbot-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: #fff;
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
.message time {
  position: absolute;
  bottom: -20px;
  font-size: 10px;
  color: #999;
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
  font-family: "Freesentation-9Black", sans-serif;
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
</style>
