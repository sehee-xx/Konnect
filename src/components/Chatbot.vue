<template>
  <div class="chatbot-container">
    <!-- Illustration banner for better visibility -->
    <div class="illustration-container">
      <img
        :src="chatbotImage"
        alt="Chat Illustration"
        class="illustration-img"
      />
    </div>
    <div class="chatbot-body">
      <div
        v-for="(msg, idx) in messages"
        :key="idx"
        :class="['message', msg.from]"
      >
        <span>{{ msg.text }}</span>
      </div>
    </div>
    <div class="chatbot-input-wrapper">
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        placeholder="Type your message..."
      />
      <button @click="sendMessage">➤</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import chatbotImage from "../assets/chatbot.png";

const userInput = ref("");
const messages = ref([
  { from: "bot", text: "Hello! How can I help you plan your trip?" },
]);

function sendMessage() {
  if (!userInput.value) return;
  messages.value.push({ from: "user", text: userInput.value });
  setTimeout(() => {
    messages.value.push({
      from: "bot",
      text: "Sure! Here are some recommendations.",
    });
  }, 500);
  userInput.value = "";
}
</script>

<style scoped>
.chatbot-container {
  width: 340px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
.illustration-img {
  width: 300px;
  height: 300px;
  object-fit: contain;
  display: block;
}
.chatbot-header {
  background: #c2372f;
  color: #fff;
  padding: 10px 16px;
  font-size: 18px;
  font-weight: bold;
}
.chatbot-body {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}
.message {
  max-width: 75%;
  margin-bottom: 10px;
  padding: 10px 14px;
  border-radius: 16px;
  line-height: 1.4;
}
.message.bot {
  background: #f0f0f0;
  align-self: flex-start;
}
.message.user {
  background: #c2372f;
  color: #fff;
  align-self: flex-end;
}
.chatbot-input-wrapper {
  display: flex;
  border-top: 1px solid #eee;
}
.chatbot-input-wrapper input {
  flex: 1;
  border: none;
  padding: 14px;
  outline: none;
  font-size: 14px;
}
.chatbot-input-wrapper button {
  border: none;
  background: #c2372f;
  color: #fff;
  padding: 0 18px;
  cursor: pointer;
  font-size: 20px;
}
</style>
