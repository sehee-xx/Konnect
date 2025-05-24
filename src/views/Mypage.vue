<!-- src/views/Mypage.vue -->
<template>
  <div class="container">
    <div class="dashboard">
      <Sidebar />

      <div class="dashboard__main">
        <!-- 1) 헤더 -->
        <header class="dashboard__header">
          <div class="welcome">
            <img :src="avatarUrl" alt="Avatar" class="avatar" />
            <div class="user-info">
              <h2>{{ user.name }}님, 반갑습니다!</h2>
              <span class="user-role">여행자</span>
            </div>
          </div>
          <div class="header-actions">
            <button class="btn-create" @click="goCreate">
              ✚ 여행 계획 작성하기
            </button>
          </div>
        </header>

        <!-- 2) 메인 콘텐츠 그리드 -->
        <div class="dashboard__content">
          <!-- A) 진행 중인 여행 -->
          <section class="widget widget--ongoing">
            <div class="widget-header">
              <h3 class="widget-title">In Progress</h3>
            </div>
            <div class="carousel-wrapper">
              <button class="arrow left" @click="scroll(-1, 'ongoing')">
                ‹
              </button>
              <div class="carousel" ref="ongoingCarousel">
                <p v-if="!ongoingTrips.length" class="empty">
                  No in-progress trips.
                </p>
                <div
                  v-for="plan in ongoingTrips"
                  :key="plan.id"
                  class="trip-card"
                  @click="goDetail(plan.id)"
                >
                  <img :src="plan.thumbnailUrl" alt="thumbnail" />
                  <div class="info">
                    <h4>{{ plan.title }}</h4>
                    <p>{{ plan.dateRange }}</p>
                  </div>
                </div>
              </div>
              <button class="arrow right" @click="scroll(1, 'ongoing')">
                ›
              </button>
            </div>
          </section>

          <!-- B) 완료된 여행 -->
          <section class="widget widget--completed">
            <div class="widget-header">
              <h3 class="widget-title">Completed</h3>
            </div>
            <div class="carousel-wrapper">
              <button class="arrow left" @click="scroll(-1, 'completed')">
                ‹
              </button>
              <div class="carousel" ref="completedCarousel">
                <p v-if="!completedTrips.length" class="empty">
                  No completed trips.
                </p>
                <div
                  v-for="plan in completedTrips"
                  :key="plan.id"
                  class="trip-card"
                  @click="goDetail(plan.id)"
                >
                  <img :src="plan.thumbnailUrl" alt="thumbnail" />
                  <div class="info">
                    <h4>{{ plan.title }}</h4>
                    <p>{{ plan.dateRange }}</p>
                  </div>
                </div>
              </div>
              <button class="arrow right" @click="scroll(1, 'completed')">
                ›
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Sidebar from "../components/Sidebar.vue";
import defaultAvatar from "../assets/avatar.png";
import { auth } from "../stores/auth";
import { useUserPlans, loadPlans } from "../stores/userPlans";

// 사용자 정보
const user = computed(() => ({
  name: auth.user.name || "홍길동",
  email: auth.user.email,
}));
const avatarUrl = computed(() => auth.user.avatarUrl || defaultAvatar);

const userPlans = useUserPlans();

// 여행 계획: draft/ongoing → 진행 중, completed → 완료
const ongoingTrips = computed(() =>
  userPlans.plans.filter((p) => p.status === "draft" || p.status === "ongoing")
);
const completedTrips = computed(() =>
  userPlans.plans.filter((p) => p.status === "completed")
);

// 라우터
const router = useRouter();
function goDetail(id) {
  // 상세(TripCreate) 페이지로 이동, planId 전달
  router.push({ name: "TripCreate", query: { planId: id } });
}
function goCreate() {
  router.push({ name: "TripCreate" });
}

// 진입 시 서버(스토어)에서 플랜 불러오기
onMounted(async () => {
  await loadPlans();
});

// 캐러셀 스크롤
const ongoingCarousel = ref(null);
const completedCarousel = ref(null);
function scroll(dir, which) {
  const el =
    which === "ongoing" ? ongoingCarousel.value : completedCarousel.value;
  if (!el) return;
  el.scrollBy({ left: dir * 200, behavior: "smooth" });
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 14px;
  padding-top: 60px;
}
/* 레이아웃 */
.dashboard {
  display: flex;
  min-height: 100vh;
  background: #f7f8f9;
}
.dashboard__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
}
/* 헤더 */
.dashboard__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
}
.welcome {
  display: flex;
  align-items: center;
  gap: 16px;
}
.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2cb67d;
}
.user-info h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}
.user-role {
  font-size: 0.9rem;
  color: #666;
}
.header-actions .btn-create {
  background: #2cb67d;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
.header-actions .btn-create:hover {
  background: #27ae60;
}
/* 메인 그리드 */
.dashboard__content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding-bottom: 40px;
}
/* 위젯 공통 */
.widget {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
.widget-header {
  margin-bottom: 16px;
}
.widget-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}
/* 캐러셀 */
.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.carousel {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  scroll-behavior: smooth;
  padding: 8px 0;
}
.carousel::-webkit-scrollbar {
  height: 6px;
}
.carousel::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
.arrow {
  background: rgba(0, 0, 0, 0.05);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
}
.arrow.left {
  position: absolute;
  left: -16px;
}
.arrow.right {
  position: absolute;
  right: -16px;
}
/* 카드 */
.trip-card {
  min-width: 160px;
  background: #fafafa;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}
.trip-card:hover {
  transform: translateY(-2px);
}
.trip-card img {
  width: 100%;
  height: 110px;
  object-fit: cover;
}
.info {
  padding: 12px;
}
.info h4 {
  margin: 0 0 4px;
  font-size: 1rem;
  font-weight: 600;
}
.info p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}
.empty {
  color: #999;
  padding: 16px;
}
</style>
