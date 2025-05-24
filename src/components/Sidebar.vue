<template>
  <nav class="sidebar">
    <div class="sidebar__logo">fingleC</div>
    <ul class="sidebar__menu">
      <li>
        <i class="fas fa-user-circle"></i>
        <span>내정보관리</span>
      </li>
      <li>
        <i class="fas fa-users"></i>
        <span>고객관리</span>
      </li>
      <li>
        <i class="fas fa-comments"></i>
        <span>상담관리</span>
      </li>
      <li>
        <i class="fas fa-calendar-alt"></i>
        <span>일정관리</span>
      </li>
      <li>
        <i class="fas fa-chart-line"></i>
        <span>영업지원</span>
      </li>
      <li>
        <i class="fas fa-question-circle"></i>
        <span>고객센터</span>
      </li>
    </ul>
  </nav>
</template>

<script setup>
// icons: fontawesome 등 필요
</script>

<style scoped>
.sidebar {
  width: 240px;
  background: #fff;
  border-right: 1px solid #eee;
  height: 100vh;
  padding: 24px 16px;
  box-sizing: border-box;
}
.sidebar__logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #c2372f;
  margin-bottom: 2rem;
}
.sidebar__menu {
  list-style: none;
  padding: 0;
}
.sidebar__menu li {
  display: flex;
  align-items: center;
  padding: 12px 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
}
.sidebar__menu li i {
  margin-right: 12px;
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
}
.sidebar__menu li span {
  font-size: 1rem;
  color: #555;
}
.sidebar__menu li:hover {
  background: #f0f0f0;
}
</style>
