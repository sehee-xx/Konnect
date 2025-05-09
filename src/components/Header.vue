<template>
  <header class="site-header">
    <div class="header-inner">
      <!-- 좌측 로고 -->
      <div class="logo" @click="goHome">
        <img src="../assets/logo.png" alt="Logo" />
      </div>

      <!-- 검색 바 -->
      <div class="search-bar">
        <input
          type="text"
          placeholder="Search destination"
          v-model="search.location"
        />
        <input ref="checkinRef" type="text" placeholder="Start Date" readonly />
        <input ref="checkoutRef" type="text" placeholder="End Date" readonly />
        <button class="btn-search" @click="onSearch">Search</button>
      </div>

      <!-- 우측 프로필 -->
      <div class="controls">
        <button class="btn-avatar" @click="toggleProfileMenu">
          <img src="../assets/avatar.png" alt="Profile" />
        </button>
        <ul v-if="showProfileMenu" class="profile-menu">
          <li @click="goJoin">Sign In</li>
          <li @click="goHome">Home</li>
          <li v-if="isLoggedIn" @click="goProfile">My Profile</li>
          <li v-if="isLoggedIn" @click="logout">Logout</li>
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
import "../assets/flatpickr-overrides.css";

const router = useRouter();

// 로그인 상태 (실제 앱에선 Vuex/Pinia나 props 로 바인딩)
const isLoggedIn = ref(false);
const showProfileMenu = ref(false);

const search = ref({
  location: "",
  checkin: "",
  checkout: "",
});

// refs for flatpickr
const checkinRef = ref(null);
const checkoutRef = ref(null);

onMounted(() => {
  const opts = {
    disableMobile: true,
    altInput: true,
    altFormat: "m/d/Y",
    dateFormat: "Y-m-d",
    onReady: (_selectedDates, _dateStr, instance) => {
      instance.calendarContainer
        .querySelectorAll(".flatpickr-weekday")
        .forEach((el) => {
          el.textContent = el.textContent.trim();
        });
    },
    onChange: (dates, dateStr, inst) => {
      if (inst.input === checkinRef.value) {
        search.value.checkin = dateStr;
      } else {
        search.value.checkout = dateStr;
      }
    },
  };

  flatpickr(checkinRef.value, opts);
  flatpickr(checkoutRef.value, opts);
});

function goHome() {
  router.push("/");
}
function goJoin() {
  router.push("/Join");
}
function goProfile() {
  router.push("/profile");
}
function logout() {
  isLoggedIn.value = false;
}
function toggleProfileMenu() {
  showProfileMenu.value = !showProfileMenu.value;
}

function onSearch() {
  console.log("Searching for", search.value);
  // router.push({ name: 'List', query: { ...search.value } })
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
  height: 32px;
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
  height: 32px;
  border-radius: 50%;
}
.profile-menu {
  position: absolute;
  top: 48px;
  right: 0;
  background: #f7f8f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  list-style: none;
  padding: 8px 0;
  width: 140px;
}
.profile-menu li {
  padding: 8px 16px;
  cursor: pointer;
}
.profile-menu li:hover {
  background: #f5f5f5;
}
</style>
