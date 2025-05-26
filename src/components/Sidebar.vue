<!-- src/components/Sidebar.vue -->
<template>
  <nav class="sidebar">
    <div class="sidebar__logo">Konnect</div>
    <ul class="sidebar__menu">
      <li>
        <!-- Home -->
        <router-link to="/" class="sidebar__link" exact-active-class="active">
          <i class="fas fa-home"></i>
          <span>Home</span>
        </router-link>
      </li>
      <li>
        <!-- 전체 리스트 -->
        <router-link to="/list" class="sidebar__link" active-class="active">
          <i class="fas fa-list"></i>
          <span>List</span>
        </router-link>
      </li>
      <li>
        <!-- 서울 여행 계획 (regionId에 맞춰서 param 전달) -->
        <router-link
          :to="{ name: 'DestinationPlans', params: { regionId: '1' } }"
          class="sidebar__link"
          active-class="active"
        >
          <i class="fas fa-city"></i>
          <span>Seoul</span>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'DestinationPlans', params: { regionId: '2' } }"
          class="sidebar__link"
          active-class="active"
        >
          <i class="fas fa-utensils"></i>
          <span>Jeonju</span>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'DestinationPlans', params: { regionId: '3' } }"
          class="sidebar__link"
          active-class="active"
        >
          <i class="fas fa-ship"></i>
          <span>Busan</span>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'DestinationPlans', params: { regionId: '4' } }"
          class="sidebar__link"
          active-class="active"
        >
          <i class="fas fa-umbrella-beach"></i>
          <span>Jeju</span>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'DestinationPlans', params: { regionId: '5' } }"
          class="sidebar__link"
          active-class="active"
        >
          <i class="fas fa-anchor"></i>
          <span>Yeosu</span>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'DestinationPlans', params: { regionId: '6' } }"
          class="sidebar__link"
          active-class="active"
        >
          <i class="fas fa-utensils"></i>
          <span>Others</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
// fontawesome 아이콘을 사용하고 싶으시면,
// main.js 에서 import '@fortawesome/fontawesome-free/css/all.css'
</script>

<style scoped>
.sidebar {
  width: 180px;
  height: 100vh;
  padding: 24px 16px;
  box-sizing: border-box;
}
.sidebar__logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #c2372f;
  margin-bottom: 1rem;
  margin-left: 30px;
}
.sidebar__menu {
  list-style: none;
  padding: 0;
}
.sidebar__menu li {
  margin-bottom: 8px;
}
.sidebar__link {
  display: flex;
  align-items: center;
  padding: 12px 8px;
  color: #555;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s, color 0.2s;
}
.sidebar__link i {
  margin-right: 12px;
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
}
.sidebar__link:hover,
.sidebar__link.active {
  background: #f0f0f0;
  color: #c2372f;
}
</style>
