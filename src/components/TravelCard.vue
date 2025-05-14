<template>
  <div class="travel-card">
    <div class="image-wrapper">
      <img :src="plan.image" :alt="plan.title" class="card-image" />
      <div class="overlay">
        <div class="tags-overlay">
          <span
            v-for="(tag, idx) in plan.tags.slice(0, 3)"
            :key="idx"
            class="tag"
          >
            #{{ tag }}
          </span>
        </div>
      </div>
    </div>
    <div class="card-details">
      <div class="info-row">
        <h3 class="plan-title">{{ plan.title }}</h3>
        <div class="like-section">
          <img src="../assets/like.png" class="likes" alt="like icon" />
          <span class="likes-count">{{ plan.likes }}</span>
        </div>
      </div>
      <div class="info-row small">
        <div class="date-range">{{ plan.dateRange }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ plan: { type: Object, required: true } });
</script>

<style scoped>
.travel-card {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  height: 240px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.overlay {
  border-radius: 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tags-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 8px;
  max-width: 70%;
}

.image-wrapper:hover .card-image {
  transform: scale(1.08);
}
.image-wrapper:hover .overlay {
  opacity: 1;
}

.tag {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9),
    rgba(240, 240, 240, 0.9)
  );
  color: #333;
  padding: 6px 16px;
  border-radius: 24px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-details {
  padding: 10px 4px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.plan-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.like-section {
  display: flex;
  align-items: center;
  gap: 3px;
}

.likes {
  width: 20px;
  height: 20px;
}

.likes-count {
  font-size: 14px;
  color: #333;
}

.info-row.small {
  font-size: 12px;
  color: #777;
}

.date-range {
  font-size: 14px;
  color: #555;
}
</style>
