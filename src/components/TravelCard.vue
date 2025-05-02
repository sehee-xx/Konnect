<template>
  <div class="travel-card">
    <!-- Single representative image -->
    <img :src="plan.image" :alt="plan.title" class="card-image" />

    <!-- Details block below image -->
    <div class="card-details">
      <div class="info-row">
        <div class="location-text">{{ plan.location }}</div>
        <div class="rating">★ {{ plan.rating }}</div>
      </div>
      <div class="info-row small">
        <div class="distance">{{ plan.distance }}km away</div>
      </div>
      <div class="info-row small">
        <div class="date-range">{{ plan.dateRange }}</div>
      </div>
      <div class="info-row description">{{ plan.description }}</div>
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
}

.card-image {
  width: 100%;
  height: 240px; /* uniform image height */
  object-fit: cover;
  display: block;
  border-radius: 10px;
}

.card-details {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-row.small {
  font-size: 12px;
  color: #777;
}

.description {
  font-size: 14px;
  color: #444;
  line-height: 1.4;
}

.location-text {
  font-size: 16px;
  font-weight: 600;
}

.rating {
  font-size: 14px;
}

.distance,
.date-range {
  display: block;
}
</style>
