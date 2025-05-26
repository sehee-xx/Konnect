<!-- src/views/Landing.vue -->
<template>
  <div class="snap-container">
    <!-- ─── Page 1 ─── -->
    <section class="snap-page page1">
      <div class="page1-left">
        <h1>{{ $t("landing1.Title") }}</h1>
        <p>
          {{ $t("landing1.SubTitle") }}
        </p>
        <button class="btn btn-primary" @click="goJoin">
          {{ $t("landing1.Button") }}
        </button>
        <div class="info-cards">
          <div class="info-card">
            <h4>{{ $t("landing1.Card1Title") }}</h4>
            <p>{{ $t("landing1.Card1Content1") }}</p>
          </div>
          <div class="info-card">
            <h4>
              {{ $t("landing1.Card2Title") }}
            </h4>
            <p>{{ $t("landing1.Card2Content1") }}</p>
          </div>
          <div class="info-card">
            <h4>{{ $t("landing1.Card3Title") }}</h4>
            <p>{{ $t("landing1.Card3Content1") }}</p>
          </div>
        </div>
      </div>
      <div class="page1-right">
        <img :src="landing1Person" alt="Character" />
      </div>
    </section>

    <!-- ─── Page 2 ─── -->
    <section class="snap-page page2">
      <div class="cards-container">
        <div
          class="card"
          v-for="(item, i) in page2Items"
          :key="i"
          :ref="(el) => el && cardRefs[i] === undefined && (cardRefs[i] = el)"
        >
          <div class="card-inner">
            <div class="card-front">
              <img :src="item.img" alt="" />
            </div>
            <div class="card-back" :style="{ backgroundColor: item.color }">
              <p class="back-label">{{ $t("landing2." + item.labelKey) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="page2-right deco-text">
        <div class="deco-shapes">
          <div class="shape circle"></div>
          <div class="shape star"></div>
        </div>
        <h2>{{ $t("landing2.Title") }}</h2>
        <p>
          {{ $t("landing2.SubTitle") }}
        </p>
        <button class="btn btn-outline" @click="goList">
          {{ $t("landing2.Button") }}
        </button>
      </div>
    </section>

    <!-- ─── Page 3 ─── -->
    <section class="snap-page page3">
      <div class="graphic-layer"></div>
      <div class="page3-content">
        <h2>{{ $t("landing3.Title") }}</h2>
        <p>{{ $t("landing3.SubTitle") }}</p>
        <div class="stats">
          <div class="stat">
            <strong>{{ $t("landing3.TravelersNum") }}</strong
            ><span>{{ $t("landing3.Travelers") }}</span>
          </div>
          <div class="stat">
            <strong>{{ $t("landing3.TripsPlansNum") }}</strong
            ><span>{{ $t("landing3.TripsPlans") }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import landing1Person from "../assets/person1.png";
import card1 from "../assets/cardmotion/seoul.png";
import card2 from "../assets/cardmotion/busan.png";
import card3 from "../assets/cardmotion/jeju.png";
import card4 from "../assets/cardmotion/yeosu.png";
import card5 from "../assets/cardmotion/jeonju.png";
import "../style.css";

const page2Items = [
  { img: card1, labelKey: "Seoul", color: "#46337F" },
  { img: card2, labelKey: "Busan", color: "#3EC5FD" },
  { img: card3, labelKey: "Jeju", color: "#004A59" },
  { img: card4, labelKey: "Yeosu", color: "#FF8B46" },
  { img: card5, labelKey: "Jeonju", color: "#E9C168" },
];
const cardRefs = ref([]);
let animationFrame,
  rotationSpeed = 0.5,
  currentRotation = 0;

onMounted(() => {
  setTimeout(() => {
    arrangeCards();
    startCardAnimation();
    cardRefs.value.forEach((c) => c.classList.add("card-initialized"));
  }, 500);
});
onUnmounted(() => {
  cancelAnimationFrame(animationFrame);
});

function arrangeCards() {
  const r = 170,
    total = cardRefs.value.length;
  cardRefs.value.forEach((c, i) => {
    const a = (i / total) * 2 * Math.PI;
    const x = Math.cos(a) * r,
      y = Math.sin(a) * r - 50;
    c.style.transform = `translate(-50%,-50%) translate(${x}px,${y}px)`;
  });
}

function startCardAnimation() {
  const animate = (t) => {
    currentRotation += rotationSpeed;
    const r = 170,
      total = cardRefs.value.length;

    cardRefs.value.forEach((c, i) => {
      const a = (i / total) * 2 * Math.PI + currentRotation * 0.01;
      const x = Math.cos(a) * r,
        y = Math.sin(a) * r - 50;

      const sinValue = Math.sin(a);
      const scale = sinValue > 0.7 ? 1.8 : 1.0;
      const zIndex = Math.round(sinValue * 100);

      c.style.transform = `translate(-50%,-50%) translate(${x}px,${y}px) scale(${scale})`;
      c.style.zIndex = zIndex;

      c.style.transition = "transform 0.7s ease-out, opacity 0.7s ease-out";
    });

    animationFrame = requestAnimationFrame(animate);
  };
  animate();
}

const router = useRouter();

function goJoin() {
  router.push("/Join");
}

function goList() {
  router.push("/List");
}
</script>

<style scoped>
@font-face {
  font-family: "Tenada";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Tenada.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}

.snap-container {
  flex: 1;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  font-family: "Tenada";
}

.snap-page {
  scroll-snap-align: start;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  padding: 0;
  box-sizing: border-box;
}

/* Page1 */
.page1 {
  background: url("../assets/landing1-bg.png");
  background-position: center center;
  background-size: cover;
  width: 100%;
}
.page1-left {
  width: 50%;
  padding: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.page1-left h1 {
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #c2372f;
  white-space: pre-line;
}
.page1-left p {
  margin-bottom: 2rem;
  line-height: 1.2;
  color: #333;
  opacity: 0.9;
  white-space: pre-line;
}
.info-cards {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
.info-card {
  width: 100px;
  background: #f7f8f9;
  color: #333;
  padding: 1rem;
  border-radius: 8px;
  flex: 1;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.info-card span {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 0.5rem;
  white-space: pre-line;
}
.info-card h4 {
  color: #c2372f;
  white-space: pre-line;
}
.page1-right {
  width: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.page1-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Page2 */
.page2 {
  background: url("../assets/landing2-bg.jpg");
  background-position: center center;
  background-size: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.cards-container {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  width: 1200px;
  height: 1200px;
  perspective: 1500px;
  perspective-origin: 50% 50%;
}
.card {
  position: absolute;
  width: 160px;
  height: 220px;
  top: 50%;
  left: 50%;
  opacity: 0;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
  will-change: transform;
  transform: translate3d(0, 0, 0); /* GPU 가속 강제 */
}
.card.card-initialized {
  opacity: 1;
}
.card:hover .card-inner {
  transform: rotateY(180deg);
}
.card-front img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari 대응 */
  backface-visibility: hidden;
  border-radius: 8px;
  overflow: hidden;
}

.card-back {
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateY(180deg);
}

.back-label {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  text-align: center;
  padding: 10px;
}

/* Page2 */
.page2-right {
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
}
.page2-right h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #482675;
  white-space: pre-line;
}
.page2-right p {
  margin-bottom: 1.5rem;
  line-height: 1.5;
  color: #555;
  white-space: pre-line;
}

/* Page3 */
.page3 {
  background-color: #111;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.graphic-layer {
  position: absolute;
  inset: 0;
  background: url("../assets/landing3-tripIcon.png") center/80% no-repeat;
  opacity: 0.3;
}
.page3-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
  white-space: pre-line;
}
.page3-content h2 {
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
  white-space: pre-line;
}
.page3-content p {
  margin-bottom: 2rem;
  opacity: 0.8;
  white-space: pre-line;
}
.stats {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
}
.stat {
  text-align: center;
}
.stat strong {
  display: block;
  font-size: 2rem;
  color: #fca311;
  padding-bottom: 10px;
  white-space: pre-line;
}
.stat span {
  opacity: 0.8;
  white-space: pre-line;
}

/* buttons */
.btn {
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-family: "Freesentation-9Black", sans-serif;
  font-size: 0.8rem;
}
.btn-primary {
  background: #c2372f;
  color: #fff;
}
.btn-outline {
  padding: 0.8rem 1rem;
  border: 2px solid #764b9d;
  color: #fff;
  background: #764b9d;
}

.btn-outline2 {
  padding: 0.8rem 1rem;
  border: 2px solid #1f7cdb;
  color: #fff;
  background: #1f7cdb;
}

/* Page2 텍스트 영역 장식 */
.deco-text {
  position: relative;
  margin-left: 50%;
  max-width: 40%;
  padding: 2.5rem;
  background: linear-gradient(135deg, #ffffffee, #cbcde6);
  border-radius: 40px 10px 40px 10px; /* 부드러운 곡선 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 5;
}
.deco-text h2 {
  font-size: 2.7rem;
  margin-bottom: 1rem;
}
.deco-text p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #555;
}

/* 장식 도형들 */
.deco-shapes {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.deco-shapes .shape {
  position: absolute;
  opacity: 0.2;
}
.deco-shapes .circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle at center, #da76bd, transparent);
  top: -40px;
  right: -60px;
}
.deco-shapes .star {
  width: 80px;
  height: 80px;
  opacity: 0.2;
  position: absolute;
  bottom: -30px;
  left: -30px;
  transform: rotate(25deg);
}
</style>
