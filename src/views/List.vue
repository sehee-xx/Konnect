<template>
  <div class="listing-page">
    <div class="container">
      <!-- Section 1: Top 4 Most Loved Plans -->
      <section class="section">
        <h2 class="section-title">Top Loved Travel Plans</h2>
        <div class="cards-grid">
          <TravelCard
            v-for="plan in topLovedPlans"
            :key="plan.id"
            :plan="plan"
          />
        </div>
      </section>

      <!-- Section 2: Curation by Category -->
      <section class="section">
        <h2 class="section-title">Curated Recommendations</h2>
        <div class="cards-grid">
          <div
            v-for="cat in categoryList"
            :key="cat.id"
            class="category-card"
            @click="goToCategory(cat.id)"
          >
            <div class="category-name">{{ cat.name }}</div>
          </div>
        </div>
      </section>

      <!-- Section 3: Plans by Destination -->
      <section class="section">
        <h2 class="section-title-no-padding-bottom">
          Recommended Plans by Destination
        </h2>
        <div class="destination-list">
          <div v-for="dest in destinations" :key="dest.id">
            <div class="destination-header">
              <h3 class="destination-title">{{ dest.name }}</h3>
              <img
                class="btn-view-all"
                @click="goToDestination(dest.id)"
                src="../assets/viewall.png"
              />
            </div>
            <div class="cards-grid">
              <TravelCard
                v-for="plan in dest.plans"
                :key="plan.id"
                :plan="plan"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import TravelCard from "../components/TravelCard.vue";
import Header from "../components/Header.vue";
import {
  topLovedPlans as allTopLoved,
  categories as allCategories,
  destinations as allDestinations,
} from "../data";

const router = useRouter();

const topLovedPlans = computed(() =>
  [...allTopLoved].sort((a, b) => b.likes - a.likes).slice(0, 4)
);

const categoryList = computed(() => allCategories.slice(0, 4));

const destinations = computed(() =>
  allDestinations.map((dest) => ({
    ...dest,
    plans: dest.plans
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 4),
  }))
);

function goToDestination(id) {
  router.push({
    name: "DestinationPlans",
    params: { regionId: id },
    query: { sort: "popular" },
  });
}

function goToCategory(id) {
  router.push({
    name: "CategoryPlans",
    params: { categoryId: id },
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
</style>
