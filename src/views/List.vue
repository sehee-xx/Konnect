<!-- src/views/ListingPage.vue -->
<template>
  <div class="listing-page">
    <div class="container">
      <!-- Section 1: Top 4 Most Loved Plans -->
      <section class="section">
        <h2 class="section-title">Top Loved Travel Plans</h2>
        <div class="cards-grid">
          <router-link
            v-for="plan in topLovedPlans"
            :key="plan.id"
            :to="{ name: 'TravelDetail', params: { planId: plan.id } }"
            class="card-link"
          >
            <TravelCard :plan="plan" />
          </router-link>
        </div>
      </section>

      <!-- Section 2: Curation by Category -->
      <section class="section">
        <h2 class="section-title">Curated Recommendations</h2>
        <div class="cards-grid">
          <router-link
            v-for="cat in categoryList"
            :key="cat.id"
            :to="{ name: 'CategoryPlans', params: { categoryId: cat.id } }"
            class="category-card"
          >
            {{ cat.name }}
          </router-link>
        </div>
      </section>

      <!-- Section 3: Plans by Destination -->
      <section class="section">
        <h2 class="section-title-no-padding-bottom">
          Recommended Plans by Destination
        </h2>
        <div class="destination-list">
          <div
            v-for="dest in destinations"
            :key="dest.id"
            class="destination-block"
          >
            <div class="destination-header">
              <h3 class="destination-title">{{ dest.name }}</h3>
              <img
                class="btn-view-all"
                @click="goToDestination(dest.id)"
                src="../assets/viewall.png"
                alt="view all"
              />
            </div>
            <div class="cards-grid">
              <router-link
                v-for="plan in dest.plans"
                :key="plan.id"
                :to="{ name: 'TravelDetail', params: { planId: plan.id } }"
                class="card-link"
              >
                <TravelCard :plan="plan" />
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import TravelCard from "../components/TravelCard.vue";
import { categories as allCategories } from "../data";
import { emitter } from "../plugins/emitter";

// ── 1. API 응답(diary) → 컴포넌트가 기대하는 plan 포맷으로 매핑 ─────────────────
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
  };
}
// ────────────────────────────────────────────────────────────────────────────────

const router = useRouter();

// 상위 4개 좋아요 많은 플랜
const topLovedPlans = ref([]);

// 상위 4개 카테고리
const categoryList = computed(() => allCategories.slice(0, 4));

// API 호출할 지역 목록 (예시 ID/이름)
const regionList = [
  { id: "1", name: "Seoul" },
  { id: "2", name: "Jeonju" },
  { id: "3", name: "Busan" },
  { id: "4", name: "Jeju" },
  { id: "5", name: "Yeosu" },
  { id: "6", name: "Other" },
];

// 각 지역별 상위 4개 플랜
const destinations = ref([]);

// ── 2. onMounted 에서 실제 API를 호출하고 mapDiary 로 변환 ────────────────────────
onMounted(async () => {
  emitter.emit("start-loading");
  try {
    // 1) Top Loved 4개
    const lovedRes = await axios.get(`/api/v1/all/diaries/mostLiked`);
    topLovedPlans.value = lovedRes.data.map(mapDiary);

    // 2) 지역별 요청 (이전처럼 잘 작동)
    destinations.value = await Promise.all(
      regionList.map(async (reg) => {
        const res = await axios.get(
          `/api/v1/all/diaries?areaId=${reg.id}&topOnly=true&sortedBy=MOST_LIKED`
        );
        return { ...reg, plans: res.data.map(mapDiary) };
      })
    );
  } catch (e) {
    console.error("데이터 로드 실패:", e);
  } finally {
    // 호출 성공/실패 상관없이 반드시 end-loading
    emitter.emit("end-loading");
  }
});
// ────────────────────────────────────────────────────────────────────────────────

function goToDestination(id) {
  router.push({
    name: "DestinationPlans",
    params: { regionId: id },
    query: { sort: "popular" },
  });
}
</script>

<style scoped>
.listing-page {
  position: relative;
  min-height: 100vh;
  overflow-y: auto;
  padding-top: 70px;
}

.section-title {
  font-size: 26px;
  margin-bottom: 16px;
}

.section-title-no-padding-bottom {
  margin-bottom: 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

.category-card {
  cursor: pointer;
  padding: 20px;
  border-radius: 10px;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65px;
  transition: background-color 0.3s;
  margin-bottom: 40px;
}

.category-card:hover {
  background-color: #c2372f;
  color: #fff;
}

.category-name {
  font-size: 18px;
  font-weight: 500;
}

.destination-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.btn-view-all {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.destination-title {
  font-size: 20px;
  font-weight: 500;
}

/* a 태그 기본 스타일 제거 */
.category-card,
.category-card:link,
.category-card:visited {
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 부모 요소 색상 상속 */
  font-size: 18px;
}

/* hover 시 색상은 기존대로 유지 */
.category-card:hover {
  text-decoration: none;
  color: #fff;
  /* background-color, color 등 기존 hover 스타일만 유지 */
}
</style>
