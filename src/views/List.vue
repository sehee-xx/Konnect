<template>
  <Header ref="headerRef" />
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Chatbot from "../components/Chatbot.vue";
import TravelCard from "../components/TravelCard.vue";
import Header from "../components/Header.vue";

import {
  topLovedPlans as allTopLoved,
  categories,
  destinations as allDestinations,
} from "../data";

const router = useRouter();

const topLovedPlans = computed(() =>
  [...allTopLoved].sort((a, b) => b.likes - a.likes).slice(0, 4)
);

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
</script>

<style scoped>
.listing-page {
  position: relative;
  min-height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-top: 70px;
}

.section-title {
  font-size: 26px;
  font-weight: 600;
}

.section-title-no-padding-bottom {
  margin-bottom: 0px;
}

.destination-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.btn-view-all {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.category-card {
  padding: 12px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
  background-color: #ccc;
  color: #333;
  margin-bottom: 30px;
}

.category-card:hover {
  background-color: #c2372f;
  color: #fff;
}

.category-icon {
  width: 48px;
  height: 48px;
}

.category-name {
  font-size: 18px;
  font-weight: 500;
}

.destination-title {
  font-size: 20px;
  font-weight: 500;
}

.chatbot-widget {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
}
</style>
