<template>
  <div class="container">
    <div class="dashboard">
      <Sidebar />

      <div class="dashboard__main">
        <!-- Modern Header with Gradient Background -->
        <header class="dashboard__header">
          <div class="welcome">
            <div class="avatar-container">
              <img
                :src="avatarUrl"
                alt="Avatar"
                class="avatar"
                loading="lazy"
              />
              <div class="status-indicator"></div>
            </div>
            <div class="user-info">
              <h3>Hello, {{ user.name }}!</h3>
              <div class="user-role">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                </svg>
                Premium Traveller
              </div>
            </div>
          </div>
          <div class="header-actions">
            <button class="btn-create" @click="goCreate">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              Create Trip Itinerary
            </button>
          </div>
        </header>

        <!-- Stats Overview -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon ongoing">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M12 6V12L16 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div class="stat-content">
              <h3>{{ ongoingTrips.length }}</h3>
              <p>In Progress</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon completed">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div class="stat-content">
              <h3>{{ completedTrips.length }}</h3>
              <p>Completed</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon total">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M8 3V7M16 3V7"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div class="stat-content">
              <h3>{{ userPlans.plans.length }}</h3>
              <p>Total Trips</p>
            </div>
          </div>
        </div>
        <div class="dashboard__content">
          <!-- 진행 중 여행 -->
          <section class="widget widget--ongoing">
            <div class="widget-header">
              <div class="widget-title-container">
                <div class="widget-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h3 class="widget-title">
                  In Progress
                  <span class="count-badge">{{ ongoingTrips.length }}</span>
                </h3>
              </div>
              <div class="widget-subtitle">Your ongoing adventures</div>
            </div>
            <div class="carousel-wrapper">
              <button
                v-if="ongoingTrips.length > 0"
                class="arrow left"
                @click="scroll(-1, 'ongoing')"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <div class="carousel" ref="ongoingCarousel">
                <div v-if="!ongoingTrips.length" class="empty-state">
                  <div class="empty-icon">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 7L12 3L14.5 7M3 12H21M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                  <h4>No trips in progress</h4>
                  <p>Ready to start your next adventure?</p>
                </div>
                <div
                  v-for="plan in ongoingTrips"
                  :key="plan.diaryId"
                  class="trip-card ongoing-card"
                  @click="goDetail(plan.diaryId)"
                >
                  <div class="card-image">
                    <img
                      :src="plan.thumbnail || defaultAvatar"
                      alt="thumbnail"
                      loading="lazy"
                    />
                    <div class="card-overlay">
                      <div class="status-chip editing">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                          <path
                            d="M12 6V12L16 14"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                        </svg>
                        {{ plan.status }}
                      </div>
                    </div>
                  </div>
                  <div class="card-content">
                    <h4>{{ plan.title }}</h4>
                    <p class="date-range">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                          stroke="currentColor"
                          stroke-width="2"
                        />
                        <line
                          x1="16"
                          y1="2"
                          x2="16"
                          y2="6"
                          stroke="currentColor"
                          stroke-width="2"
                        />
                        <line
                          x1="8"
                          y1="2"
                          x2="8"
                          y2="6"
                          stroke="currentColor"
                          stroke-width="2"
                        />
                        <line
                          x1="3"
                          y1="10"
                          x2="21"
                          y2="10"
                          stroke="currentColor"
                          stroke-width="2"
                        />
                      </svg>
                      {{ formatDate(plan.startDate) }} ~
                      {{ formatDate(plan.endDate) }}
                    </p>
                    <button
                      class="btn-complete"
                      @click.stop="completePlan(plan.diaryId)"
                      :disabled="publishing"
                    >
                      <svg
                        v-if="!publishing"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="currentColor"
                          stroke-width="2"
                        />
                      </svg>
                      <div v-else class="spinner"></div>
                      {{ publishing ? "Publishing..." : "Complete Trip" }}
                    </button>
                  </div>
                </div>
              </div>
              <button
                v-if="ongoingTrips.length > 0"
                class="arrow right"
                @click="scroll(1, 'ongoing')"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </section>

          <!-- 완료된 여행 -->
          <section class="widget widget--completed">
            <div class="widget-header">
              <div class="widget-title-container">
                <div class="widget-icon completed">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                </div>
                <h3 class="widget-title">
                  Completed
                  <span class="count-badge completed">{{
                    completedTrips.length
                  }}</span>
                </h3>
              </div>
              <div class="widget-subtitle">Your travel memories</div>
            </div>
            <div class="carousel-wrapper">
              <button
                v-if="completedTrips.length > 0"
                class="arrow left"
                @click="scroll(-1, 'completed')"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <div class="carousel" ref="completedCarousel">
                <div v-if="!completedTrips.length" class="empty-state">
                  <div class="empty-icon completed">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                  <h4>No completed trips yet</h4>
                  <p>Complete some trips from the "In Progress" section!</p>
                </div>
                <div
                  v-for="plan in completedTrips"
                  :key="plan.diaryId"
                  class="trip-card completed-card"
                  @click="goDetail(plan.diaryId)"
                >
                  <div class="card-image">
                    <img
                      :src="plan.thumbnail || defaultAvatar"
                      alt="thumbnail"
                      loading="lazy"
                    />
                    <div class="card-overlay">
                      <div class="status-chip completed">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 12L11 14L15 10"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                        </svg>
                        {{ plan.status }}
                      </div>
                    </div>
                  </div>
                  <div class="card-content">
                    <h4>{{ plan.title }}</h4>
                    <p class="date-range">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                          stroke="currentColor"
                          stroke-width="2"
                        />
                        <line
                          x1="16"
                          y1="2"
                          x2="16"
                          y2="6"
                          stroke="currentColor"
                          stroke-width="2"
                        />
                        <line
                          x1="8"
                          y1="2"
                          x2="8"
                          y2="6"
                          stroke="currentColor"
                          stroke-width="2"
                        />
                        <line
                          x1="3"
                          y1="10"
                          x2="21"
                          y2="10"
                          stroke="currentColor"
                          stroke-width="2"
                        />
                      </svg>
                      {{ formatDate(plan.startDate) }} ~
                      {{ formatDate(plan.endDate) }}
                    </p>
                    <div class="trip-summary">
                      <div class="summary-item">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                          <circle
                            cx="12"
                            cy="10"
                            r="3"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                        </svg>
                        <span>{{ plan.locations?.length || 0 }} places</span>
                      </div>
                      <div class="summary-item">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span>{{ plan.rating || "Unrated" }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                v-if="completedTrips.length > 0"
                class="arrow right"
                @click="scroll(1, 'completed')"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
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
import defaultAvatar from "../assets/defaultAvatar.png";
import { auth } from "../stores/auth";
import { useUserPlans } from "../stores/userPlans";

// 디버깅용 상태
const showDebug = ref(false);
const publishing = ref(false);

// 사용자 정보
const user = computed(() => ({
  name: auth.user?.name || "홍길동",
  email: auth.user?.email || "",
}));
const avatarUrl = computed(() => auth.user?.avatarUrl || defaultAvatar);

const userPlans = useUserPlans();

// 상태별 여행 계획 필터링 (더 관대한 필터링)
const ongoingTrips = computed(() =>
  userPlans.plans.filter((p) => {
    const status = p.status?.toLowerCase?.() || "";
    return (
      status === "editing" ||
      status === "ongoing" ||
      status === "draft" ||
      status === "in_progress"
    );
  })
);

const completedTrips = computed(() =>
  userPlans.plans.filter((p) => {
    const status = p.status?.toLowerCase?.() || "";
    return (
      status === "published" ||
      status === "completed" ||
      status === "done" ||
      status === "finished"
    );
  })
);

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2); // 마지막 2자리만
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 라우터
const router = useRouter();
function goDetail(id) {
  router.push({ name: "PlanById", params: { planId: id } });
}

function goCreate() {
  router.push({ name: "TripCreate" });
}

// 디버깅 토글
function toggleDebug() {
  showDebug.value = !showDebug.value;
}

async function completePlan(diaryId) {
  if (publishing.value) return;
  publishing.value = true;

  // 1) 화면에 즉시 반영 (Optimistic UI)
  const idx = userPlans.plans.findIndex((p) => p.diaryId === diaryId);
  if (idx !== -1) {
    userPlans.plans[idx].status = "published";
  }

  // 2) 실제 API 호출은 백그라운드에서 수행
  userPlans
    .publishDiary(diaryId)
    .catch(() => {
      // 실패 시 원복
      if (idx !== -1) userPlans.plans[idx].status = "editing";
    })
    .finally(() => {
      publishing.value = false;
    });
}

// 진입 시 서버에서 플랜 불러오기
onMounted(async () => {
  try {
    await userPlans.loadAllPlans();
    // 디버깅용 콘솔 로그
    console.log("=== Dashboard Debug Info ===");
    console.log("All plans:", userPlans.plans);
    console.log("Total plans count:", userPlans.plans.length);
    console.log("Ongoing trips:", ongoingTrips.value);
    console.log("Completed trips:", completedTrips.value);

    // 각 플랜의 상태 상세 확인
    console.log("=== Plan Status Details ===");
    userPlans.plans.forEach((plan, index) => {
      console.log(`Plan ${index + 1}:`, {
        id: plan.diaryId,
        title: plan.title,
        status: plan.status,
        statusType: typeof plan.status,
        statusLower: plan.status?.toLowerCase?.(),
      });
    });

    // 상태별 그룹핑 확인
    const statusGroups = userPlans.plans.reduce((acc, plan) => {
      const status = plan.status || "null";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    console.log("Status groups:", statusGroups);
  } catch (error) {
    console.error("Failed to load plans:", error);
  }
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
/* 기본 리셋 및 전역 설정 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  line-height: 1.6;
  color: #333;
  overflow-x: hidden;
}

/* 컨테이너 및 레이아웃 */
.container {
  width: 100%;
  min-height: 100vh;
  max-width: 1260px;
  margin: 0 auto;
  padding: 80px 24px 20px 24px;
}

.dashboard {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.dashboard__main {
  flex: 1;
  width: 100%;
  max-width: calc(100vw - 280px); /* 사이드바 너비 고려 */
  padding: 20px 32px;
  overflow-x: visible;
}

/* 헤더 */
.dashboard__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 20px 0;
  background: white;
  border-radius: 16px;
  padding: 18px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
}

.welcome {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
  min-width: 0; /* flex 아이템 축소 허용 */
}

.avatar-container {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e2e8f0;
  transition: all 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
  border-color: #c2372e;
}

.status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  background: #10b981;
  border-radius: 50%;
  border: 3px solid white;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 5px;
}

.user-info h2 {
  margin: 0 0 8px 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 0.8rem;
  color: #64748b;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-weight: 500;
}

.user-role svg {
  color: #f59e0b;
  flex-shrink: 0;
}

.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-shrink: 0;
}

.btn-create {
  background: #c2372e;
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  white-space: nowrap;
}

.btn-create:hover {
  background: #c2372e;
  transform: translateY(-2px);
}

.btn-debug {
  background: #f1f5f9;
  color: #64748b;
  padding: 12px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.btn-debug:hover {
  background: #e2e8f0;
  color: #475569;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin-bottom: 20px;
  width: 100%;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  min-width: 0;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-icon.ongoing {
  background: #f59e0b;
}

.stat-icon.completed {
  background: #10b981;
}

.stat-icon.total {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.stat-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  min-width: 0;
}

.stat-content h3 {
  margin: 0;
  font-weight: 700;
  color: #1f2937;
}

.stat-content p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.plan-number {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
}

.plan-details {
  flex: 1;
  font-size: 0.85rem;
  line-height: 1.4;
  min-width: 0;
  word-break: break-word;
}

.plan-details div {
  margin-bottom: 4px;
}

.debug-summary {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
}

.trip-summary {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 12px 0;
  flex: 1;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

.summary-item svg {
  color: #94a3b8;
  flex-shrink: 0;
}

.summary-item:first-child svg {
  color: #ef4444;
}

.summary-item:last-child svg {
  color: #f59e0b;
}

.badge {
  background: linear-gradient(135deg, #10b981, #34d399);
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* 메인 콘텐츠 */
.dashboard__content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  width: 100%;
}

/* 위젯 공통 */
.widget {
  max-width: 100%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  width: 100%;
  padding: 20px;
}

.widget:hover {
  transform: translateY(-5px);
}

.widget-header {
  margin-bottom: 20px;
}

.widget-title-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.widget-icon {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  flex-shrink: 0;
}

.widget-icon.completed {
  background: linear-gradient(135deg, #10b981, #34d399);
}

.widget-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.count-badge {
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  flex-shrink: 0;
}

.count-badge.completed {
  background: linear-gradient(135deg, #10b981, #34d399);
}

.widget-subtitle {
  color: #6b7280;
  font-size: 1rem;
  font-weight: 500;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: visible;
  padding: 20px 0px;
  margin: 0;
}

.carousel {
  display: flex;
  overflow-x: auto;
  gap: 24px;
  scroll-behavior: smooth;
  flex: 1;
  scrollbar-width: none;
  -ms-overflow-style: none;
  min-height: fit-content;
  padding: 0;
  margin: 0;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.arrow {
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  backdrop-filter: blur(16px);
  border: 2px solid rgba(0, 0, 0, 0.05);
  width: 36px;
  height: 36px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 100 !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1f2937;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04);
  flex-shrink: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.arrow:hover {
  background: linear-gradient(135deg, #ffffff, #ffffff);
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08);
}

.arrow:active {
  transform: translateY(-50%) scale(0.95);
}

.arrow svg {
  transition: transform 0.3s ease;
}

.arrow:hover svg {
  transform: scale(1.1);
}

.arrow.left {
  left: -28px; /* 기존 left: 0에서 변경 */
}

.arrow.right {
  right: -28px; /* 기존 right: 0에서 변경 */
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  text-align: center;
  flex: 1;
  min-height: 300px;
  width: 100%;
}

.empty-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: white;
}

.empty-icon.completed {
  background: linear-gradient(135deg, #10b981, #34d399);
}

.empty-state h4 {
  margin: 0 0 12px 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
}

.empty-state p {
  margin: 0;
  color: #6b7280;
  font-size: 1rem;
}

/* 카드 */
.trip-card {
  width: 200px;
  height: 310px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px; /* 기존 20px에서 약간 줄여서 더 깔끔하게 */
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 12px rgba(0, 0, 0, 0.12);
  margin-bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  flex-shrink: 0;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  transform-origin: bottom center;
}

.trip-card:hover {
  z-index: 10;
}

.card-image {
  position: relative;
  height: 140px; /* 기존 100px에서 10px 증가 */
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.trip-card:hover .card-image img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 12px;
}

.status-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.status-chip.editing {
  background: rgba(245, 158, 11, 0.95);
  color: white;
}

.status-chip.completed {
  background: rgba(16, 185, 129, 0.95);
  color: white;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px; /* 기존 16px에서 14px로 조정 */
  height: calc(310px - 140px);
  overflow: hidden;
  background-color: #f7f8f9;
}

.card-content h4 {
  font-size: 1.05rem; /* 기존 1.1rem에서 약간 줄임 */
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 8px 0;
  color: #1f2937;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  min-height: 2.6em; /* 2줄 고정 높이 확보 */
}

.date-range {
  margin: 0 0 12px 0;
  font-size: 0.8rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  line-height: 1.4;
  white-space: nowrap; /* 추가: 한줄 유지 */
  overflow: hidden; /* 추가: 넘치는 부분 숨김 */
  text-overflow: ellipsis; /* 추가: ... 표시 */
}

.date-range svg {
  flex-shrink: 0; /* 아이콘 크기 고정 */
  color: #94a3b8;
}

.btn-complete {
  width: 100%;
  padding: 10px 12px;
  background: linear-gradient(135deg, #10b981, #34d399);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.85rem; /* 기존 0.9rem에서 약간 줄임 */
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: 0 2px 10px rgba(16, 185, 129, 0.25);
  flex-shrink: 0;
  min-height: 34px;
}

.btn-complete:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.35);
  background: linear-gradient(135deg, #059669, #10b981);
}

.btn-complete:disabled {
  background: linear-gradient(135deg, #9ca3af, #d1d5db);
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.spinner {
  width: 14px; /* 기존 16px에서 줄임 */
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 반응형 디자인 */
@media (max-width: 1200px) {
  .dashboard__main {
    max-width: calc(100vw - 240px);
    padding: 20px 24px;
  }

  .dashboard__header {
    padding: 20px 24px;
    margin-bottom: 20px;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 20px;
  }

  .trip-card {
    min-width: 260px;
    max-width: 300px;
  }
}

@media (max-width: 968px) {
  .dashboard__main {
    max-width: 100vw;
    padding: 20px 16px;
  }

  .dashboard__header {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
    padding: 20px;
  }

  .welcome {
    justify-content: center;
    text-align: center;
  }

  .header-actions {
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-create,
  .btn-debug {
    padding: 12px 20px;
    font-size: 0.9rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .widget {
    padding: 24px 20px;
  }

  .carousel {
    gap: 16px;
  }

  .trip-card {
    min-width: 240px;
    max-width: 280px;
  }

  .arrow {
    display: none;
  }
}

@media (max-width: 480px) {
  .dashboard__main {
    padding: 15px 12px;
  }

  .dashboard__header {
    padding: 16px;
    margin-bottom: 20px;
  }

  .user-info h2 {
    font-size: 1.5rem;
  }

  .welcome {
    gap: 12px;
  }

  .avatar {
    width: 48px;
    height: 48px;
  }

  .widget {
    padding: 20px 16px;
  }

  .widget-title {
    font-size: 1.25rem;
  }

  .trip-card {
    min-width: 220px;
    max-width: 260px;
  }

  .card-content {
    padding: 16px;
  }
}
</style>
