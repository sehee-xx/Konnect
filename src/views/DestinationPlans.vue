<!-- src/views/DestinationPlans.vue -->
<template>
  <Header />

  <div class="destination-page">
    <div class="container">
      <div class="destination-header">
        <h2 class="page-title">{{ regionName }} plans</h2>

        <!-- 필터 -->
        <div class="filters">
          <button
            class="filter-btn"
            :class="{ active: currentSort === 'popular' }"
            @click="setFilter('popular')"
          >
            Popular
          </button>
          <button
            class="filter-btn"
            :class="{ active: currentSort === 'latest' }"
            @click="setFilter('latest')"
          >
            Newest
          </button>
        </div>
      </div>

      <!-- 플랜 카드 그리드 -->
      <div class="plans-grid">
        <router-link
          v-for="plan in plans"
          :key="plan.id"
          :to="{ name: 'TravelDetail', params: { planId: plan.id } }"
          class="card-link"
        >
          <TravelCard :plan="plan" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Header from "../components/Header.vue";
import TravelCard from "../components/TravelCard.vue";
import { destinations as allDestinations } from "../data";
import { emitter } from "../plugins/emitter";

// 1) 라우터에서 regionId 받아오기
const route = useRoute();
const router = useRouter();
const regionId = route.params.regionId;

// 2) 필터 상태 (query.sort 에서 초기값)
const currentSort = ref(route.query.sort || "popular");

// 3) 다 불러온 플랜을 담을 배열
const plans = ref([]);

const regionName = computed(() => {
  if (plans.value.length === 0) return "";
  return plans.value[0].area.nameEng;
});

// 4) 지역 이름만 가져오기
const destination = computed(() => {
  return (
    allDestinations.find((d) => d.id === regionId) || { name: "", plans: [] }
  );
});

// 5) API 호출 함수
async function fetchPlans() {
  emitter.emit("start-loading");
  const sortedBy = currentSort.value === "popular" ? "MOST_LIKED" : "RECENT";
  try {
    const res = await axios.get(
      `/api/v1/all/diaries?areaId=${regionId}&topOnly=false&sortedBy=${sortedBy}`
    );
    console.log(res.data);
    // mapDiary 는 이전에 작성하신 함수 그대로 재사용하세요
    plans.value = res.data.map(mapDiary);

    console.log(plans.value);
  } catch (err) {
    console.error("DestinationPlans 로드 실패:", err);
  } finally {
    emitter.emit("end-loading"); // (3) 요청 완료 후 로딩 종료 알림
  }
}

// 6) mounted 시, 그리고 필터(query) 변경 시 재호출
onMounted(fetchPlans);
watch(
  () => route.query.sort,
  (newSort) => {
    currentSort.value = newSort || "popular";
    fetchPlans();
  }
);

// 7) 버튼 클릭 시 query 갱신
function setFilter(type) {
  router.replace({
    name: "DestinationPlans",
    params: { regionId },
    query: { sort: type },
  });
}

// ─── mapDiary 함수 (이전 코드와 완전히 동일) ──────────────────────
function mapDiary(diary) {
  const id = diary.diaryId;
  const image =
    diary.thumbnail ||
    (Array.isArray(diary.images) && diary.images.length
      ? diary.images[0]
      : "/assets/default-thumb.png");
  const likes = diary.likeCount;
  const tags = diary.tags?.map((t) => t.nameEng || t.name) || [];
  const fmt = (s) => s.slice(5, 10).replace("-", ".");
  const dateRange = `${fmt(diary.startDate)} – ${fmt(diary.endDate)}`;

  return {
    id,
    title: diary.title,
    image,
    likes,
    tags,
    dateRange,
    status: diary.status,
    area: diary.area,
  };
}
</script>

<style scoped>
.destination-page {
  position: relative;
  min-height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-top: 70px;
}

.destination-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.page-title {
  font-size: 26px;
  font-weight: 600;
}

.filters select {
  margin-left: 8px;
  padding: 4px 8px;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.filters {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 6px 16px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #ddd;
  color: #333;
  transition: background-color 0.2s, color 0.2s;
}

.filter-btn.active {
  background-color: #c2372f;
  color: #fff;
}

.filter-btn:not(.active):hover {
  background-color: #bbb;
}
</style>
