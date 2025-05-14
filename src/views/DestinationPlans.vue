<template>
  <Header></Header>
  <div class="destination-page">
    <!-- <div class="chatbot-widget">
        <Chatbot />
      </div> -->
    <div class="container">
      <div class="destination-header">
        <h2 class="page-title">{{ destination.name }} Plans</h2>
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
      <div class="plans-grid">
        <TravelCard v-for="plan in sortedPlans" :key="plan.id" :plan="plan" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Header from "../components/Header.vue";
import TravelCard from "../components/TravelCard.vue";
import { destinations } from "../data";

const route = useRoute();
const router = useRouter();
const regionId = route.params.regionId;

const currentSort = ref(route.query.sort || "popular");

const destination = computed(
  () => destinations.find((d) => d.id === regionId) || { name: "", plans: [] }
);

const sortedPlans = computed(() => {
  const arr = [...destination.value.plans];
  return currentSort.value === "popular"
    ? arr.sort((a, b) => b.rating - a.rating)
    : arr.reverse();
});

function setFilter(type) {
  currentSort.value = type;
  router.replace({
    name: "DestinationPlans",
    params: { regionId },
    query: { sort: type },
  });
}

watch(
  () => route.query.sort,
  (val) => {
    currentSort.value = val || "popular";
  }
);
</script>

<style scoped>
.destination-page {
  position: relative;
  min-height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-top: 65px;
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
