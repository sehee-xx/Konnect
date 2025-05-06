<template>
  <Header ref="headerRef"></Header>
  <div class="listing-page">
    <!-- Chatbot widget always present -->
    <div class="chatbot-widget">
      <Chatbot />
    </div>
    <div class="content">
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
          <div v-for="cat in categories" :key="cat.id" class="category-card">
            <h3 class="category-name">{{ cat.name }}</h3>
          </div>
        </div>
      </section>

      <!-- Section 3: Plans by Destination -->
      <section class="section">
        <h2 class="section-title">Recommended Plans by Destination</h2>
        <div class="destination-list">
          <div
            v-for="dest in destinations"
            :key="dest.id"
            class="destination-block"
          >
            <h3 class="destination-title">{{ dest.name }}</h3>
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
import { ref } from "vue";
import Chatbot from "../components/Chatbot.vue";
import TravelCard from "../components/TravelCard.vue";
import Header from "../components/Header.vue";

// 이미지
import plan1Img from "../assets/plan1.png";
import plan2Img from "../assets/plan2.png";
import plan3Img from "../assets/plan3.png";
import plan4Img from "../assets/plan4.png";

import seoul1 from "../assets/seoul1.png";
import seoul2 from "../assets/seoul2.png";
import seoul3 from "../assets/seoul3.png";
import seoul4 from "../assets/seoul4.png";

import busan1 from "../assets/busan1.png";
import busan2 from "../assets/busan2.png";
import busan3 from "../assets/busan3.png";
import busan4 from "../assets/busan4.png";

import yeosu1 from "../assets/yeosu1.png";
import yeosu2 from "../assets/yeosu2.png";
import yeosu3 from "../assets/yeosu3.png";
import yeosu4 from "../assets/yeosu4.png";

import jeju1 from "../assets/jeju1.png";
import jeju2 from "../assets/jeju2.png";
import jeju3 from "../assets/jeju3.png";
import jeju4 from "../assets/jeju4.png";

import jeonju1 from "../assets/jeonju1.png";
import jeonju2 from "../assets/jeonju2.png";
import jeonju3 from "../assets/jeonju3.png";
import jeonju4 from "../assets/jeonju4.png";

// Placeholder data without backend
const topLovedPlans = ref([
  {
    id: 1,
    image: plan1Img,
    title: "Seoul Mood Tour",
    location: "Seoul",
    likes: 120,
    rating: 4.9,
    price: "₩150,000",
  },
  {
    id: 2,
    image: plan2Img,
    title: "Jeju Nature Healing",
    location: "Jeju",
    likes: 98,
    rating: 4.8,
    price: "₩180,000",
  },
  {
    id: 3,
    image: plan3Img,
    title: "Busan Beach Activities",
    location: "Busan",
    likes: 85,
    rating: 4.7,
    price: "₩130,000",
  },
  {
    id: 4,
    image: plan4Img,
    title: "Jeonju Hanok Experience",
    location: "Jeonju",
    likes: 76,
    rating: 4.6,
    price: "₩110,000",
  },
]);

const categories = ref([
  { id: "attractions", name: "Attractions" },
  { id: "stays", name: "Stays" },
  { id: "restaurants", name: "Restaurants" },
  { id: "shopping", name: "Shopping" },
]);

const destinations = ref([
  {
    id: "seoul",
    name: "Seoul",
    plans: [
      {
        id: "s1",
        image: seoul1,
        location: "Seoul",
        rating: 4.9,
        distance: 10,
        dateRange: "Jun 1–5",
        description: "City highlights tour",
      },
      {
        id: "s2",
        image: seoul2,
        location: "Seoul",
        rating: 4.8,
        distance: 12,
        dateRange: "Jun 6–10",
        description: "Historic palaces visit",
      },
      {
        id: "s3",
        image: seoul3,
        location: "Seoul",
        rating: 4.7,
        distance: 8,
        dateRange: "Jun 11–15",
        description: "Foodie street walk",
      },
      {
        id: "s4",
        image: seoul4,
        location: "Seoul",
        rating: 4.6,
        distance: 15,
        dateRange: "Jun 16–20",
        description: "Night markets experience",
      },
    ],
  },
  {
    id: "busan",
    name: "Busan",
    plans: [
      {
        id: "b1",
        image: busan1,
        location: "Busan",
        rating: 4.9,
        distance: 10,
        dateRange: "Jun 1–5",
        description: "City highlights tour",
      },
      {
        id: "b2",
        image: busan2,
        location: "Busan",
        rating: 4.8,
        distance: 12,
        dateRange: "Jun 6–10",
        description: "Historic palaces visit",
      },
      {
        id: "b3",
        image: busan3,
        location: "Busan",
        rating: 4.7,
        distance: 8,
        dateRange: "Jun 11–15",
        description: "Foodie street walk",
      },
      {
        id: "b4",
        image: busan4,
        location: "Busan",
        rating: 4.6,
        distance: 15,
        dateRange: "Jun 16–20",
        description: "Night markets experience",
      },
    ],
  },
  {
    id: "yeosu",
    name: "Yeosu",
    plans: [
      {
        id: "y1",
        image: yeosu1,
        location: "Yeosu",
        rating: 4.9,
        distance: 10,
        dateRange: "Jun 1–5",
        description: "City highlights tour",
      },
      {
        id: "y2",
        image: yeosu2,
        location: "Yeosu",
        rating: 4.8,
        distance: 12,
        dateRange: "Jun 6–10",
        description: "Historic palaces visit",
      },
      {
        id: "y3",
        image: yeosu3,
        location: "Yeosu",
        rating: 4.7,
        distance: 8,
        dateRange: "Jun 11–15",
        description: "Foodie street walk",
      },
      {
        id: "y4",
        image: yeosu4,
        location: "Yeosu",
        rating: 4.6,
        distance: 15,
        dateRange: "Jun 16–20",
        description: "Night markets experience",
      },
    ],
  },
  {
    id: "jeju",
    name: "Jeju",
    plans: [
      {
        id: "j1",
        image: jeju1,
        location: "Jeju",
        rating: 4.9,
        distance: 10,
        dateRange: "Jun 1–5",
        description: "City highlights tour",
      },
      {
        id: "j2",
        image: jeju2,
        location: "Jeju",
        rating: 4.8,
        distance: 12,
        dateRange: "Jun 6–10",
        description: "Historic palaces visit",
      },
      {
        id: "j3",
        image: jeju3,
        location: "Jeju",
        rating: 4.7,
        distance: 8,
        dateRange: "Jun 11–15",
        description: "Foodie street walk",
      },
      {
        id: "j4",
        image: jeju4,
        location: "Jeju",
        rating: 4.6,
        distance: 15,
        dateRange: "Jun 16–20",
        description: "Night markets experience",
      },
    ],
  },
  {
    id: "jeonju",
    name: "Jeonju",
    plans: [
      {
        id: "jeon1",
        image: jeonju1,
        location: "Jeonju",
        rating: 4.9,
        distance: 10,
        dateRange: "Jun 1–5",
        description: "City highlights tour",
      },
      {
        id: "jeon2",
        image: jeonju2,
        location: "Jeonju",
        rating: 4.8,
        distance: 12,
        dateRange: "Jun 6–10",
        description: "Historic palaces visit",
      },
      {
        id: "jeon3",
        image: jeonju3,
        location: "Jeonju",
        rating: 4.7,
        distance: 8,
        dateRange: "Jun 11–15",
        description: "Foodie street walk",
      },
      {
        id: "jeon4",
        image: jeonju4,
        location: "Jeonju",
        rating: 4.6,
        distance: 15,
        dateRange: "Jun 16–20",
        description: "Night markets experience",
      },
    ],
  },
]);
</script>

<style scoped>
.listing-page {
  position: relative;
  min-height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-top: 65px;
}

.content {
  width: 100%;
  margin: 0 auto;
  padding: 32px;
  box-sizing: border-box;
}

.section {
  margin-bottom: 48px;
}

.section-title {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 16px;
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

.destination-block {
  margin-bottom: 32px;
}

.destination-title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 12px;
}

.chatbot-widget {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
}
</style>
