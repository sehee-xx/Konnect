<!-- src/views/CurationByCategory.vue -->
<template>
  <div class="curation-page">
    <Header />

    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Recommended {{ categoryName }}</h1>
        <p class="hero-subtitle">Discover amazing places for your journey</p>
        <div class="stats">
          <span class="stat-item">
            <i class="icon-location"></i>
            {{ plans.length }} places
          </span>
          <span class="stat-item">
            <i class="icon-heart-filled"></i>
            {{ favorites.size }} favorites
          </span>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- Enhanced Filter Bar -->
      <div class="filter-section">
        <div class="search-container">
          <div class="search-input-wrapper">
            <i class="icon-search"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search places by name or location..."
              @input="applyFilters"
              class="search-input"
            />
            <button v-if="searchQuery" @click="clearSearch" class="clear-btn">
              <i class="icon-x"></i>
            </button>
          </div>
        </div>

        <div class="filter-controls">
          <div class="view-toggle">
            <button
              @click="viewMode = 'grid'"
              :class="{ active: viewMode === 'grid' }"
              class="toggle-btn"
            >
              <i class="icon-grid"></i>
              Grid
            </button>
            <button
              @click="viewMode = 'list'"
              :class="{ active: viewMode === 'list' }"
              class="toggle-btn"
            >
              <i class="icon-list"></i>
              List
            </button>
          </div>

          <select v-model="sortBy" @change="applySorting" class="sort-select">
            <option value="recent">Latest</option>
            <option value="name">Name</option>
            <option value="area">Area</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Looking for amazing places...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <i class="icon-alert-circle"></i>
        <h3>Something went wrong</h3>
        <p>{{ error }}</p>
        <button @click="fetchPage(0)" class="retry-btn">Try Again</button>
      </div>

      <!-- Content Grid/List -->
      <div v-else class="content-section">
        <div class="results-header">
          <h2>{{ filteredPlans.length }} places</h2>
          <div class="filter-tags" v-if="searchQuery">
            <span class="filter-tag">
              "{{ searchQuery }}" search results
              <button @click="clearSearch" class="tag-close">×</button>
            </span>
          </div>
        </div>

        <transition-group
          name="card-list"
          tag="div"
          class="cards-wrap"
          :class="viewMode"
        >
          <div
            v-for="item in plans"
            :key="item.contentId"
            class="curation-card"
            @click="handleAddToTrip(item)"
          >
            <div class="card-image-container">
              <img
                :src="item.firstImage1 || defaultImg"
                :alt="item.title"
                class="card-thumb"
                @error="handleImageError"
              />
              <div class="image-overlay">
                <div class="overlay-content">
                  <button
                    @click.stop="toggleFavorite(item)"
                    class="favorite-btn"
                    :class="{ active: isFav(item) }"
                  >
                    <i class="icon-heart" :class="{ filled: isFav(item) }"></i>
                  </button>
                  <div class="quick-actions">
                    <button class="action-btn" title="View Location">
                      <i class="icon-map-pin"></i>
                    </button>
                    <button class="action-btn" title="Share">
                      <i class="icon-share"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-badge" v-if="item.tel">
                <i class="icon-phone"></i>
                Contact Available
              </div>
            </div>

            <div class="card-body">
              <div class="card-header">
                <h3 class="card-title">{{ item.title }}</h3>
                <div class="rating" v-if="Math.random() > 0.3">
                  <div class="stars">
                    <i
                      v-for="n in 5"
                      :key="n"
                      class="star"
                      :class="{
                        filled: n <= Math.floor(Math.random() * 2) + 4,
                      }"
                    >
                      ★
                    </i>
                  </div>
                  <span class="rating-text">{{
                    (Math.random() * 1.5 + 3.5).toFixed(1)
                  }}</span>
                </div>
              </div>

              <div class="location-info">
                <i class="icon-map-pin"></i>
                <span class="location-text">
                  {{ item.sidoName
                  }}{{ item.gugunName ? ", " + item.gugunName : "" }}
                </span>
                <span class="map-level">Level {{ item.mapLevel }}</span>
              </div>

              <div class="card-meta">
                <div class="tags">
                  <span class="tag category-tag">{{
                    item.contentTypeName
                  }}</span>
                  <span v-if="item.tel" class="tag contact-tag">
                    <i class="icon-phone"></i>
                    Contact
                  </span>
                </div>

                <div class="card-actions">
                  <button
                    @click.stop="toggleFavorite(item)"
                    class="action-heart"
                    :class="{ active: isFav(item) }"
                  >
                    <i class="icon-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition-group>

        <!-- Empty State -->
        <div v-if="!filteredPlans.length && !loading" class="empty-state">
          <div class="empty-icon">
            <i class="icon-search"></i>
          </div>
          <h3>No places found</h3>
          <p>Try adjusting your search terms or explore different categories</p>
          <button @click="clearSearch" class="clear-filters-btn">
            Clear Search
          </button>
        </div>

        <!-- Load More Button -->
        <div v-if="hasNext && filteredPlans.length" class="load-more-section">
          <button
            @click="loadNextPage"
            :disabled="loadingNext"
            class="load-more-btn"
          >
            <span v-if="!loadingNext">
              <i class="icon-plus"></i>
              Load More Places
            </span>
            <span v-else>
              <div class="loading-spinner small"></div>
              Loading...
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Header from "../components/Header.vue";
import defaultImg from "../assets/defaultImg.png";
import Swal from "sweetalert2";
import { useUserPlans } from "../stores/userPlans";

const route = useRoute();
const router = useRouter();
const categoryKey = route.params.categoryId;

const userPlans = useUserPlans();
const editingTrips = computed(() => userPlans.editingPlans);

// State
const plans = ref([]);
const loading = ref(false);
const error = ref(null);
const page = ref(0);
const size = 9;
const hasNext = ref(false);
const loadingNext = ref(false);

// UI State
const searchQuery = ref("");
const viewMode = ref("grid");
const sortBy = ref("recent");
const favorites = ref(new Set());

// Category name mapping
const allCategories = [
  { slug: "attractions", name: "Attractions" },
  { slug: "stays", name: "Stays" },
  { slug: "restaurants", name: "Restaurants" },
  { slug: "shopping", name: "Shopping" },
];

const categoryName = computed(() => {
  const c = allCategories.find((c) => c.slug === categoryKey);
  return c ? c.name : "";
});

// Filtering and sorting
const filteredPlans = computed(() => {
  let filtered = plans.value;

  // Apply search filter
  const q = searchQuery.value.trim().toLowerCase();
  if (q) {
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.sidoName.toLowerCase().includes(q) ||
        item.gugunName.toLowerCase().includes(q)
    );
  }

  // Apply sorting
  if (sortBy.value === "name") {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy.value === "area") {
    filtered = [...filtered].sort((a, b) =>
      (a.sidoName + a.gugunName).localeCompare(b.sidoName + b.gugunName)
    );
  }

  return filtered;
});

// API Methods
async function fetchPage(p) {
  if (p === 0) loading.value = true;
  else loadingNext.value = true;
  error.value = null;

  try {
    const res = await axios.get("/api/v1/all/attractions", {
      params: {
        page: p,
        size,
        curationTypeName: categoryName.value,
      },
    });
    const data = res.data;
    if (p === 0) plans.value = data.content;
    else plans.value.push(...data.content);
    hasNext.value = data.hasNext;
    page.value = p;
  } catch (e) {
    error.value = e.response?.data?.message || e.message;
  } finally {
    loading.value = false;
    loadingNext.value = false;
  }
}

// Event Handlers
function loadNextPage() {
  if (!hasNext.value) return;
  fetchPage(page.value + 1);
}

function applyFilters() {
  // Filtering is handled by computed property
}

function applySorting() {
  // Sorting is handled by computed property
}

function clearSearch() {
  searchQuery.value = "";
}

function toggleFavorite(item) {
  const id = item.contentId;
  if (favorites.value.has(id)) {
    favorites.value.delete(id);
  } else {
    favorites.value.add(id);
  }
}

function isFav(item) {
  return favorites.value.has(item.contentId);
}

function handleCardClick(item) {
  // Handle card click - could navigate to detail page
  console.log("Card clicked:", item);
}

function handleImageError(event) {
  event.target.src = defaultImg;
}

// 1) 카드 클릭 시 호출
async function handleAddToTrip(place) {
  // 1) 편집 중 트립이 없으면 안내
  if (!editingTrips.value.length) {
    return Swal.fire({
      icon: "info",
      title: "No Draft Trips",
      text: "Please create a trip first.",
    });
  }

  // 2) 어떤 트립에 추가할지 선택
  const { value: tripId } = await Swal.fire({
    title: "Select a Trip to Add",
    input: "select",
    inputOptions: editingTrips.value.reduce((opts, t) => {
      opts[t.diaryId] = t.title;
      return opts;
    }, {}),
    inputPlaceholder: "Choose a trip",
    showCancelButton: true,
  });
  if (!tripId) return;

  try {
    // 3) 선택한 트립 불러오기
    const trip = await userPlans.loadPlan(Number(tripId));

    // 4) 사용자가 추가할 "날짜(day)" 선택
    const dayOptions = trip.routes.reduce((opts, r, idx) => {
      opts[idx] = r.date; // 예: "0": "2025-05-26"
      return opts;
    }, {});
    const { value: dayIndex } = await Swal.fire({
      title: "Select a Date",
      input: "select",
      inputOptions: dayOptions,
      inputPlaceholder: "Choose a date",
      showCancelButton: true,
    });
    if (dayIndex === undefined) return; // 취소

    // 5) 선택된 날짜(dayIndex)의 마지막 일정에 place 추가
    trip.routes[dayIndex].items.push({
      visitedDate: trip.routes[dayIndex].date, // 선택한 날짜
      visitedTime: "09:00:00",
      distance: 0,
      title: place.title,
      latitude: place.latitude,
      longitude: place.longitude,
    });

    // 6) 수정된 trip 전체를 서버에 저장
    await userPlans.updatePlan(Number(tripId), {
      diaryId: Number(tripId),
      title: trip.title,
      content: trip.content,
      areaId: trip.area.id,
      tags: trip.tags.map((t) => t.id),
      startDate: trip.startDate,
      endDate: trip.endDate,
      status: trip.status ?? "editing",
      routes: trip.routes,
      thumbnail: trip.thumbnail,
      images: trip.images,
    });

    // 7) 성공 알림
    await Swal.fire({
      icon: "success",
      title: "Added!",
      text: `"${place.title}" has been added to "${trip.title}" on ${trip.routes[dayIndex].date}.`,
    });

    router.push("/mypage");
  } catch (e) {
    console.error(e);
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to add place. Please try again.",
    });
  }
}

// Lifecycle
onMounted(() => fetchPage(0));
</script>

<style scoped>
/* Reset and Base Styles */
* {
  box-sizing: border-box;
}

.curation-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.9),
    rgba(118, 75, 162, 0.9)
  );
  color: white;
  padding: 80px 0 60px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.05"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.05"/><circle cx="25" cy="75" r="1" fill="white" opacity="0.05"/><circle cx="75" cy="25" r="1" fill="white" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 0.8s ease-out;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 32px;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 32px;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 600;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  background: white;
  border-radius: 24px 24px 0 0;
  margin-top: -24px;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.1);
}

/* Filter Section */
.filter-section {
  padding: 32px 0;
  border-bottom: 1px solid #f1f5f9;
  position: sticky;
  top: 80px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 10;
  border-radius: 16px;
  margin: -8px;
  padding: 24px;
}

.search-container {
  margin-bottom: 20px;
}

.search-input-wrapper {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 16px 48px 16px 48px;
  border: 2px solid #e2e8f0;
  border-radius: 50px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.icon-search {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 18px;
}

.clear-btn {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #f1f5f9;
  color: #334155;
}

.filter-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.view-toggle {
  display: flex;
  background: #f8fafc;
  border-radius: 50px;
  padding: 4px;
  gap: 4px;
}

.toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  background: transparent;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: #64748b;
}

.toggle-btn.active {
  background: white;
  color: #667eea;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sort-select {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sort-select:focus {
  outline: none;
  border-color: #667eea;
}

/* Loading State */
.loading-container {
  text-align: center;
  padding: 80px 20px;
  color: #64748b;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f1f5f9;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

.loading-spinner.small {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

/* Error State */
.error-container {
  text-align: center;
  padding: 80px 20px;
  color: #dc2626;
}

.error-container i {
  font-size: 48px;
  margin-bottom: 16px;
  display: block;
}

.retry-btn {
  margin-top: 16px;
  padding: 12px 24px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.retry-btn:hover {
  background: #b91c1c;
}

/* Content Section */
.content-section {
  padding: 32px 0 80px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.results-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.filter-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #e0e7ff;
  color: #3730a3;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.tag-close {
  background: none;
  border: none;
  color: #3730a3;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  line-height: 1;
}

/* Cards Layout */
.cards-wrap {
  margin-bottom: 40px;
}

.cards-wrap.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.cards-wrap.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cards-wrap.list .curation-card {
  display: flex;
  flex-direction: row;
  height: 160px;
}

.cards-wrap.list .card-image-container {
  width: 240px;
  flex-shrink: 0;
}

.cards-wrap.list .card-thumb {
  height: 100%;
}

.cards-wrap.list .card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Card Styles */
.curation-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.curation-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.card-image-container {
  position: relative;
  overflow: hidden;
}

.card-thumb {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.curation-card:hover .card-thumb {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.3), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.curation-card:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.favorite-btn,
.action-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-btn:hover,
.action-btn:hover {
  background: white;
  transform: scale(1.1);
}

.favorite-btn.active {
  background: #fecaca;
  color: #dc2626;
}

.card-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #059669;
}

/* Card Body */
.card-body {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.4;
  margin: 0;
  flex: 1;
}

.rating {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 14px;
  color: #e2e8f0;
  transition: color 0.2s;
}

.star.filled {
  color: #fbbf24;
}

.rating-text {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #64748b;
  font-size: 14px;
}

.location-text {
  flex: 1;
}

.map-level {
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: #475569;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  flex: 1;
}

.tag {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

.category-tag {
  background: #ddd6fe;
  color: #5b21b6;
}

.contact-tag {
  background: #dcfce7;
  color: #166534;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.action-heart {
  width: 36px;
  height: 36px;
  border: 2px solid #e2e8f0;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
}

.action-heart:hover {
  border-color: #dc2626;
  color: #dc2626;
  transform: scale(1.1);
}

.action-heart.active {
  background: #dc2626;
  border-color: #dc2626;
  color: white;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #64748b;
}

.empty-icon {
  width: 80px;
  height: 80px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.empty-icon i {
  font-size: 32px;
  color: #94a3b8;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #334155;
}

.empty-state p {
  margin-bottom: 24px;
  font-size: 1rem;
}

.clear-filters-btn {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.clear-filters-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
}

/* Load More Section */
.load-more-section {
  text-align: center;
  padding: 40px 20px;
}

.load-more-btn {
  padding: 16px 32px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 200px;
  justify-content: center;
}

.load-more-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.load-more-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Card List Transitions */
.card-list-enter-active,
.card-list-leave-active {
  transition: all 0.5s ease;
}

.card-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.card-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.card-list-move {
  transition: transform 0.5s ease;
}
</style>
