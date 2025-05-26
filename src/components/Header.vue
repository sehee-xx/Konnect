<!-- src/components/Header.vue -->
<template>
  <header class="site-header">
    <div class="header-inner">
      <div class="logo" @click="goHome">
        <img src="../assets/logo.png" alt="Logo" />
      </div>
      <div class="search-bar">
        <input v-model="search.location" placeholder="Search destination" />
        <input ref="checkinRef" placeholder="Start Date" readonly />
        <input ref="checkoutRef" placeholder="End Date" readonly />
        <button class="btn-search" @click="onSearch">Search</button>
      </div>
      <div class="controls">
        <button class="btn-avatar" @click="toggleProfileMenu">
          <img src="../assets/avatar.png" alt="Profile" />
        </button>
        <ul v-if="showProfileMenu" class="profile-menu">
          <li v-if="!isLoggedIn" @click="goJoin">Sign In</li>
          <li @click="goHome">Home</li>
          <li @click="goList">List</li>
          <li v-if="isLoggedIn" @click="goMypage">Mypage</li>
          <li v-if="isLoggedIn" @click="onLogout">Logout</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";

// 아래 두 줄을 추가하세요
import { auth } from "../stores/auth";
import client from "../api/client";

const props = defineProps({
  isLoggedIn: { type: Boolean, required: true },
});
const emit = defineEmits(["logout"]);

const router = useRouter();
const showProfileMenu = ref(false);
const search = ref({ location: "", checkin: "", checkout: "" });
const checkinRef = ref(null);
const checkoutRef = ref(null);

onMounted(() => {
  flatpickr(checkinRef.value, datePickerOpts);
  flatpickr(checkoutRef.value, datePickerOpts);
});

const datePickerOpts = {
  disableMobile: true,
  altInput: true,
  altFormat: "m/d/Y",
  dateFormat: "Y-m-d",
  onChange(dates, dateStr, inst) {
    if (inst.input === checkinRef.value) search.value.checkin = dateStr;
    else search.value.checkout = dateStr;
  },
};

function toggleProfileMenu() {
  showProfileMenu.value = !showProfileMenu.value;
}
function goHome() {
  router.push("/");
}
function goJoin() {
  router.push("/Join");
}
function goList() {
  router.push("/List");
}
function goMypage() {
  router.push("/mypage");
}
function onSearch() {
  router.push({ name: "List", query: { ...search.value } });
}

// --------------- 수정된 onLogout ---------------
function onLogout() {
  // 1) auth 상태 초기화
  auth.logout();
  // 2) 저장된 토큰/유저 정보 제거
  localStorage.removeItem("auth");
  // 3) axios 기본 헤더에서 Authorization 삭제
  delete client.defaults.headers.common["Authorization"];
  // 4) 메뉴 닫고, 상위 컴포넌트에도 logout 이벤트 전달
  showProfileMenu.value = false;
  router.push("/Join");
  emit("logout");
  // 5) 회원가입/로그인 페이지로 이동
}
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #f7f8f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}
.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 24px;
}
.logo img {
  height: 38px;
  cursor: pointer;
}
.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 4px;
}
.search-bar input:first-child {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.search-bar input {
  background: #f7f8f9;
  border: none;
  padding: 8px 12px;
  outline: none;
  font-size: 14px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.search-bar input[readonly] {
  cursor: pointer;
  border: none;
}
:deep(.form-control.input) {
  background: #f7f8f9;
  border: none;
  padding: 8px 12px;
  outline: none;
  font-size: 14px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.btn-search {
  background: #c2372f;
  color: #fff;
  border: 1px solid #c2372f;
  padding: 8px 16px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  cursor: pointer;
  font-size: 14px;
}
.controls {
  position: relative;
  display: flex;
  align-items: center;
}
.btn-avatar {
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
}
.btn-avatar img {
  height: 38px;
  border-radius: 50%;
}
.profile-menu {
  position: absolute;
  top: 48px;
  right: 0;
  background: #f7f8f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  list-style: none;
  padding: 0px 0px;
  width: 100px;
}
.profile-menu li {
  font-size: 14px;
  padding: 8px 16px;
  cursor: pointer;
}

.profile-menu li:first-child {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.profile-menu li:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.profile-menu li:hover {
  background: #ddd;
}
</style>
