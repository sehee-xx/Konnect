<template>
  <div class="container">
    <Header />

    <div class="trip-create">
      <!-- 1) 뒤로가기 + 저장 버튼 -->
      <div class="header-bar">
        <router-link to="/mypage" class="btn-back">
          <svg
            class="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to My Trips
        </router-link>

        <div v-if="!isReadonly" class="header-actions">
          <button class="btn-save" @click="saveDraft" :disabled="isReadonly">
            Save Draft
          </button>

          <div v-if="planId">
            <!-- planId가 있을 때만 End Travel 보이도록 -->
            <button class="btn-delete" @click="deleteTravel">
              Delete Travel
            </button>
          </div>

          <div v-if="planId">
            <!-- planId가 있을 때만 End Travel 보이도록 -->
            <button class="btn-end" @click="endTravel">End Travel</button>
          </div>
        </div>
      </div>

      <!-- 2) 여행 기본 정보 입력 -->
      <div class="card plan-meta">
        <h2 class="section-title">Trip Information</h2>
        <div class="form-flex">
          <div class="field">
            <label>Trip Title</label>
            <div class="input-wrapper">
              <input
                v-model="plan.title"
                type="text"
                placeholder="e.g., Jeju Healing Trip"
                class="input-primary"
                :disabled="isReadonly"
              />
            </div>
          </div>
          <div class="field date-range">
            <label>Trip Dates</label>
            <div class="date-inputs">
              <div class="input-wrapper">
                <input
                  ref="startInput"
                  v-model="plan.startDate"
                  class="input-primary date-picker"
                  placeholder="YYYY-MM-DD"
                  :disabled="isReadonly"
                />
              </div>
              <span class="date-separator">~</span>
              <div class="input-wrapper">
                <input
                  ref="endInput"
                  v-model="plan.endDate"
                  class="input-primary date-picker"
                  placeholder="YYYY-MM-DD"
                  :disabled="isReadonly"
                />
              </div>
            </div>
          </div>
          <div class="field">
            <label>Select Region</label>
            <div class="input-wrapper">
              <select
                v-model="plan.areaId"
                class="select-primary"
                :disabled="isReadonly"
              >
                <option disabled value="">select a region</option>
                <option value="1">Seoul</option>
                <option value="2">Jeonju</option>
                <option value="3">Busan</option>
                <option value="4">Jeju</option>
                <option value="5">Yeosu</option>
                <option value="6">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- 2.5) 상세 정보 -->
      <div class="card plan-details">
        <h2 class="section-title">Details</h2>
        <div class="details-grid">
          <div class="field full">
            <label>Trip Journal</label>
            <div class="input-wrapper">
              <textarea
                v-model="plan.content"
                rows="4"
                placeholder="Write about your memorable moments from this trip..."
                class="textarea-primary"
                :disabled="isReadonly"
              ></textarea>
            </div>
          </div>
          <div class="field upload full">
            <label>Thumbnail (1 image)</label>
            <div class="upload-area" @click="$refs.thumbnailInput.click()">
              <input
                ref="thumbnailInput"
                type="file"
                accept="image/*"
                @change="onThumbnailChange"
                style="display: none"
              />
              <div class="upload-content">
                <svg
                  class="upload-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Click to upload thumbnail</span>
              </div>
            </div>
            <div class="preview" v-if="thumbnailPreview">
              <img :src="thumbnailPreview" />
              <div class="preview-overlay">
                <button
                  @click="removeThumbnail"
                  class="remove-btn"
                  v-if="!isReadonly"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="field upload full">
            <label>Trip Photos (up to 9 images)</label>
            <div
              v-if="!isReadonly"
              class="upload-area"
              @click="$refs.imagesInput.click()"
            >
              <input
                ref="imagesInput"
                type="file"
                accept="image/*"
                multiple
                @change="onImagesChange"
                style="display: none"
              />
              <div v-if="!isReadonly" class="upload-content">
                <svg
                  class="upload-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21,15 16,10 5,21" />
                </svg>
                <span>Click to upload photos</span>
              </div>
            </div>
            <div class="preview-grid" v-if="imagePreviews.length">
              <div
                v-if="!isReadonly"
                v-for="(src, i) in imagePreviews"
                :key="i"
                class="preview-item"
              >
                <img :src="src" />
                <div class="preview-overlay">
                  <button
                    v-if="!isReadonly"
                    @click="removeImage(i)"
                    class="remove-btn"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3) Day 탭 -->
      <div class="card">
        <h2 class="section-title">Itinerary</h2>
        <div class="day-tabs">
          <button
            v-for="(day, i) in plan.days"
            :key="i"
            :class="{ active: selectedDay === i }"
            @click="selectDay(i)"
            class="day-tab"
          >
            <div class="day-number">Day {{ i + 1 }}</div>
            <small class="day-date">{{ formatDate(day.date) }}</small>
          </button>
        </div>
      </div>

      <!-- 4) 일정 + 지도 -->
      <div class="plan-map-container" v-if="plan.days.length">
        <!-- ① Itinerary 카드 -->
        <div class="card routes-card" ref="routesRef">
          <div class="routes-header">
            <h3>Day {{ selectedDay + 1 }} Itinerary</h3>

            <!-- 여기가 검색 입력 폼이 있어야 합니다! -->
            <div class="search-container">
              <div class="search-input-wrapper">
                <svg
                  class="search-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  v-model="placeQuery"
                  @keyup.enter="searchPlace"
                  placeholder="Search restaurants & attractions"
                  class="search-input"
                  :disabled="isReadonly"
                />
              </div>

              <!-- 검색 결과 드롭다운도 routes-header 안에 -->
              <div v-if="searchResults.length" class="search-results">
                <div
                  v-for="(r, i) in searchResults"
                  :key="i"
                  @click="selectPlace(r)"
                  class="search-result-item"
                >
                  {{ r.place_name }}
                </div>
              </div>
            </div>
          </div>

          <!-- ② 위치 리스트(Draggable) 또는 Empty State -->
          <div class="routes-list-wrapper">
            <draggable
              v-if="plan.days[selectedDay].locations.length"
              v-model="plan.days[selectedDay].locations"
              :handle="'.handle'"
              item-key="name"
              @update="onRoutesUpdated"
              class="routes-list"
              :animation="200"
              ghost-class="ghost"
              chosen-class="chosen"
            >
              <template #item="{ element, index }">
                <div class="route-item">
                  <div class="route-handle handle">
                    <!-- 여기에 Grab 아이콘 SVG 삽입 -->
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 9h16M4 15h16"
                        stroke="#94a3b8"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                  <div class="route-number">{{ index + 1 }}</div>
                  <div class="route-info">
                    <div class="route-name">{{ element.name }}</div>
                    <div class="route-time">
                      <input
                        type="text"
                        class="time-input time-picker"
                        v-model="element.visitedTime"
                      />
                    </div>
                  </div>
                  <button class="remove-route" @click="removeLocation(index)">
                    <!-- 삭제 아이콘 SVG -->
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="#c2372f"
                        stroke-width="2"
                      />
                    </svg>
                  </button>
                </div>
              </template>
            </draggable>

            <div v-else class="empty-state">
              <img
                src="../assets/map-pin.png"
                alt="map pin"
                class="empty-icon-pin"
              />
              <p>No locations added yet</p>
              <small>Search and add places above</small>
            </div>
          </div>
        </div>

        <!-- ③ Map 카드 -->
        <div class="map-card-parent map-card" ref="mapRef">
          <div class="map-header">
            <h3>Map</h3>
            <button class="map-control-btn" @click="resetMapView"></button>
          </div>
          <div id="kakao-map"></div>
        </div>

        <!-- AI 태그 -->
        <div class="ai-tags-card glass">
          <div class="ai-tags-header">
            <img src="../assets/chatbot.png" alt="AI Bot" class="bot-icon" />
            <h2>AI Generated Tags</h2>
            <button
              v-if="!isReadonly"
              class="btn-generate"
              @click="generateTags"
              :class="{ loading: isGeneratingTags }"
            >
              {{ isGeneratingTags ? "" : "Generate Tags" }}
              <span class="spinner" v-if="isGeneratingTags"></span>
            </button>
          </div>
          <ul class="tag-list">
            <li
              v-for="tag in plan.tags"
              :key="tag.id != null ? tag.id : tag.nameEng"
              class="tag-item"
            >
              {{ tag.nameEng }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, nextTick } from "vue";
import Swal from "sweetalert2";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/material_red.css";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Header from "../components/Header.vue";
import draggable from "vuedraggable";
import api from "../api/client";
import { useUserPlans } from "../stores/userPlans";
import { emitter } from "../plugins/emitter";

const userPlans = useUserPlans();

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
  });

// state refs
const placeQuery = ref("");
const searchResults = ref([]);
const thumbnailPreview = ref(null);
const imagePreviews = ref([]);
const existingImageUrls = ref([]); // 서버에서 불러온 URL들
const newImageFiles = ref([]); // 사용자가 새로 고른 File 객체들
const isGeneratingTags = ref(false);
const isReadonly = ref(false);
const isHydrated = ref(false);

let placesSvc = null;
let map,
  markers = [],
  overlays = [],
  polyline;

// route and router
const route = useRoute();
const router = useRouter();
const planId = route.params.planId;

const regenerateDays = () => {
  const s = new Date(plan.startDate);
  const e = new Date(plan.endDate);
  const days = [];
  for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    days.push({ date: new Date(d), locations: [] });
  }
  plan.days = days;
};

const routesRef = ref(null);
const mapRef = ref(null);

// plan reactive data
const plan = reactive({
  title: "",
  content: "",
  areaId: "",
  tags: [],
  thumbnail: null,
  images: [],
  startDate: new Date().toISOString().substr(0, 10),
  endDate: new Date().toISOString().substr(0, 10),
  days: [{ date: new Date(), locations: [] }],
});
const selectedDay = ref(0);

// refs for date inputs and map sizing
const startInput = ref(null);
const endInput = ref(null);

// 초기화
onMounted(async () => {
  // ─────────────────────────────────────────────────────────────
  emitter.emit("start-loading");
  // 1) 수정 모드: planId 가 있으면 기존 계획 불러오기
  if (planId) {
    try {
      const { data } = await axios.get(`/api/v1/user/diaries/${planId}`);
      // 메타 정보 세팅
      plan.title = data.title;
      plan.content = data.content;
      plan.areaId = String(data.area.id);
      plan.tags = data.tags;
      plan.startDate = data.startDate.slice(0, 10);
      plan.endDate = data.endDate.slice(0, 10);

      // 썸네일, 이미지 프리뷰 세팅
      thumbnailPreview.value = data.thumbnail; // 단일 썸네일 URL
      existingImageUrls.value = data.images; // 배열 형태
      imagePreviews.value = [...data.images]; // 프리뷰로 렌더링

      // 2) plan 배열은 새로 File 추가용으로 빈 채워두기
      plan.thumbnail = data.thumbnail;
      plan.images = [];

      // routes → plan.days 로 매핑
      plan.days = data.routes.map((r) => ({
        date: new Date(r.date),
        locations: r.items.map((it) => ({
          name: it.title,
          coordinates: { lat: it.latitude, lng: it.longitude },
          visitedDate: it.visitedDate,
          visitedTime: it.visitedTime.slice(0, 5),
          distance: it.distance,
        })),
      }));
      selectedDay.value = 0;
      isReadonly.value = data.status === "published";
    } catch (e) {
      console.error(e);
      await Swal.fire("Error", "Failed to load trip plan.", "error");
    }
  }

  await nextTick();
  emitter.emit("end-loading");

  flatpickr(startInput.value, {
    dateFormat: "Y-m-d",
    defaultDate: plan.startDate,
    onChange: ([d]) => {
      // 초기 로딩 때는 무시
      if (!isHydrated.value) return;
      plan.startDate = d.toISOString().substr(0, 10);
    },
  });

  flatpickr(endInput.value, {
    dateFormat: "Y-m-d",
    defaultDate: plan.endDate,
    onChange: ([d]) => {
      // 초기 로딩 때는 무시
      if (!isHydrated.value) return;
      plan.startDate = d.toISOString().substr(0, 10);
    },
  });

  isHydrated.value = true;

  await loadKakao();
  initMap();
  renderDayMap();
  syncMapHeight();
  initTimePickers();
});

// 선택된 Day의 마커가 전부 보이도록 지도를 재배치
const resetMapView = () => {
  const day = plan.days[selectedDay.value];
  if (!day.locations.length) return;

  // 1) Bounds 생성
  const bounds = new kakao.maps.LatLngBounds();
  day.locations.forEach((loc) => {
    bounds.extend(
      new kakao.maps.LatLng(loc.coordinates.lat, loc.coordinates.lng)
    );
  });

  // 2) 단일 마커이면 직접 center, 복수 마커면 bounds
  if (day.locations.length === 1) {
    const { lat, lng } = day.locations[0].coordinates;
    map.setCenter(new kakao.maps.LatLng(lat, lng));
  } else {
    map.setBounds(bounds);
  }
};

// 맵 초기화
const initMap = () => {
  const el = document.getElementById("kakao-map");
  map = new kakao.maps.Map(el, {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 5,
    draggable: true, // 마우스 “끌기” 로 pan 허용
    scrollwheel: true, // 휠로 줌 인/아웃 허용
    disableDoubleClickZoom: false, // 더블클릭 줌 허용 (선택)
  });
  placesSvc = new kakao.maps.services.Places();
};

// 카카오맵 SDK 로드
const loadKakao = () =>
  new Promise((res, rej) => {
    if (window.kakao && window.kakao.maps) return window.kakao.maps.load(res);
    const s = document.createElement("script");
    s.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=a7d3be3a0aa9c466cfb5bb894d9e7795&libraries=services&autoload=false";
    s.onload = () => window.kakao.maps.load(res);
    s.onerror = rej;
    document.head.appendChild(s);
  });

// 날짜-시간 Picker 초기화
const initTimePickers = () => {
  document.querySelectorAll("input.time-picker").forEach((inputEl) => {
    flatpickr(inputEl, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      time_24hr: true,
      theme: "material_red",
    });
  });
};

// 날짜 범위 변경 감지 → days 재생성
watch(
  () => [plan.startDate, plan.endDate],
  (newVal, oldVal) => {
    // date 값이 정말 바뀌었을 때만
    if (!isHydrated.value) return;
    if (newVal[0] === oldVal[0] && newVal[1] === oldVal[1]) return;
    regenerateDays();
  }
);

// Day 선택
const selectDay = (i) => {
  selectedDay.value = i;
  renderDayMap();
  syncMapHeight();
};

// 장소 검색
const searchPlace = () => {
  if (!placeQuery.value.trim()) {
    searchResults.value = [];
    return;
  }
  placesSvc.keywordSearch(placeQuery.value, (data, status) => {
    if (status === kakao.maps.services.Status.OK) searchResults.value = data;
    else searchResults.value = [];
  });
};

// 장소 선택
const selectPlace = (place) => {
  plan.days[selectedDay.value].locations.push({
    name: place.place_name,
    coordinates: { lat: +place.y, lng: +place.x },
    visitedDate: plan.days[selectedDay.value].date.toISOString().substr(0, 10),
    visitedTime: "09:00",
    distance: 0,
  });
  placeQuery.value = "";
  searchResults.value = [];
  renderDayMap();
  syncMapHeight();
  initTimePickers();
};

// 일정 리스트 Drag & Drop 후
const onRoutesUpdated = () => {
  renderDayMap();
  syncMapHeight();
};

// 일정 항목 삭제
const removeLocation = (idx) => {
  plan.days[selectedDay.value].locations.splice(idx, 1);
  renderDayMap();
  syncMapHeight();
  initTimePickers();
};

// 썸네일 변경
const onThumbnailChange = (e) => {
  const f = e.target.files[0];
  if (!f) return;
  plan.thumbnail = f;
  thumbnailPreview.value = URL.createObjectURL(f);
};

// 이미지들 변경
const onImagesChange = async (e) => {
  const files = Array.from(e.target.files);
  files.forEach((f) => {
    newImageFiles.value.push(f);
    imagePreviews.value.push(URL.createObjectURL(f));
  });
};

// **이미지 삭제 함수**
const removeImage = (idx) => {
  // 1) 미리보기(src) 배열에서 URL을 꺼냅니다
  const removed = imagePreviews.value.splice(idx, 1)[0];

  // 2) 만약 existingImageUrls 안에 있던 URL이었다면 그것도 삭제
  const existingIdx = existingImageUrls.value.indexOf(removed);
  if (existingIdx !== -1) {
    existingImageUrls.value.splice(existingIdx, 1);
  } else {
    // 3) 그렇지 않다면 newImageFiles 쪽에서 대응하는 File을 삭제
    //    (imagePreviews.value와 newImageFiles.value 배열이 같은 순서라고 가정)
    newImageFiles.value.splice(idx - existingImageUrls.value.length, 1);
  }
};

// 썸네일 삭제
const removeThumbnail = () => {
  plan.thumbnail = null;
  thumbnailPreview.value = null;
};

// 맵 마커 & 폴리라인 그리기
const renderDayMap = () => {
  if (!map) return;
  markers.forEach((m) => m.setMap(null));
  overlays.forEach((o) => o.setMap(null));
  if (polyline) polyline.setMap(null);
  markers = [];
  overlays = [];
  polyline = null;

  const day = plan.days[selectedDay.value];
  const path = [];
  const bounds = new kakao.maps.LatLngBounds();

  day.locations.forEach((loc, i) => {
    const pos = new kakao.maps.LatLng(loc.coordinates.lat, loc.coordinates.lng);
    const marker = new kakao.maps.Marker({ position: pos, map });
    markers.push(marker);
    bounds.extend(pos);
    path.push(pos);
    const overlay = new kakao.maps.CustomOverlay({
      position: pos,
      content: `<div class="map-marker-label">${i + 1}</div>`,
      xAnchor: 0.5,
      yAnchor: 1.2,
      map,
    });
    overlays.push(overlay);
  });

  if (path.length > 1) {
    polyline = new kakao.maps.Polyline({
      path,
      strokeWeight: 3,
      strokeColor: "#e11d48",
      strokeOpacity: 0.8,
      map,
    });
    map.setBounds(bounds);
  } else if (path.length === 1) {
    map.setCenter(path[0]);
  }
};

// 맵 크기 동기화
const syncMapHeight = async () => {
  await nextTick();
  const h = routesRef.value?.clientHeight || 400;
  if (mapRef.value) {
    mapRef.value.style.height = `${h}px`;
    map?.relayout();
  }
  initTimePickers();
};

// 유효성 검사
const validate = () => {
  if (!plan.title.trim()) throw new Error("제목을 입력하세요");
  if (!plan.content.trim()) throw new Error("내용을 입력하세요");
  if (!plan.areaId) throw new Error("지역을 선택해주세요");
};

// AI 태그 생성
const generateTags = async () => {
  if (isGeneratingTags.value) return;

  if (!plan.content.trim()) {
    await Swal.fire({
      icon: "warning",
      title: "Please Enter Content",
      text: "You must write your trip journal before generating tags.",
    });
    return;
  }

  isGeneratingTags.value = true;
  try {
    const dataString = createTripDataString();
    const response = await api.post("/api/v1/user/ai-tags/generate", {
      content: dataString,
    });

    if (Array.isArray(response.data) && response.data[0]?.id != null) {
      plan.tags = response.data;
    } else if (
      Array.isArray(response.data) &&
      typeof response.data[0] === "string"
    ) {
      plan.tags = response.data.map((name) => ({ id: null, nameEng: name }));
    }

    if (plan.tags.length === 0) {
      await Swal.fire({
        icon: "info",
        title: "No Tags Generated",
        text: "No tags were generated. Try writing more details about your trip.",
      });
    }
  } catch {
    await Swal.fire({
      icon: "error",
      title: "태그 생성 실패",
      text: "AI 태그 생성 중 오류가 발생했습니다. 다시 시도해주세요.",
    });
  } finally {
    isGeneratingTags.value = false;
  }
};

// 태그 삭제
const removeTag = (index) => {
  plan.tags.splice(index, 1);
};

// 문자열로 변환
const createTripDataString = () => {
  const parts = [];
  if (plan.title.trim()) parts.push(`제목: ${plan.title}`);
  if (plan.content.trim()) parts.push(`여행 기록: ${plan.content}`);

  const areaNames = {
    1: "Seoul",
    2: "Jeonju",
    3: "Busan",
    4: "Jeju",
    5: "Yeosu",
    6: "Other",
  };
  if (plan.areaId && areaNames[plan.areaId]) {
    parts.push(`지역: ${areaNames[plan.areaId]}`);
  }

  if (plan.days.length) {
    const itinerary = plan.days
      .map((day, idx) => {
        const locs = day.locations.map((l) => l.name).join(", ");
        return locs ? `Day ${idx + 1}: ${locs}` : "";
      })
      .filter(Boolean);
    if (itinerary.length) {
      parts.push(`여행 일정: ${itinerary.join(" | ")}`);
    }
  }

  return parts.join(" / ");
};

// 저장 (POST/PUT)
const saveDraft = async () => {
  try {
    validate();

    // 1) Itinerary → routes
    const routes = plan.days.map((day) => ({
      date: day.date.toISOString().slice(0, 10),
      items: day.locations.map((loc) => ({
        visitedDate: loc.visitedDate,
        visitedTime: loc.visitedTime + ":00",
        distance: loc.distance,
        title: loc.name,
        latitude: loc.coordinates.lat,
        longitude: loc.coordinates.lng,
      })),
    }));

    // 2) JSON payload: 기존 이미지 URL 만
    const payload = {
      ...(planId && { diaryId: Number(planId) }),
      title: plan.title,
      content: plan.content,
      areaId: Number(plan.areaId),
      tags: plan.tags.map((t) => t.id),
      startDate: plan.startDate,
      endDate: plan.endDate,
      status: "editing",
      routes,
      // 기존에 서버에 있던 썸네일/이미지 URL
      thumbnail: plan.thumbnail || null,
      images: existingImageUrls.value,
    };

    // 3) FormData에 JSON blob 추가
    const fd = new FormData();
    fd.append(
      "data",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

    // 4) 새로 골라둔 이미지 파일만 append
    newImageFiles.value.forEach((file) => {
      fd.append("images", file);
    });

    // 5) 새로 골라둔 썸네일 파일도 있을 경우 append
    if (plan.thumbnail instanceof File) {
      fd.append("thumbnail", plan.thumbnail);
    }

    // 6) URL 결정
    const draftUrl = planId
      ? `/api/v1/user/diaries/${planId}`
      : `/api/v1/user/diaries`;

    // 7) 전송
    await axios.post(draftUrl, fd);

    router.push("/mypage");
  } catch (err) {
    await Swal.fire({
      icon: "error",
      title: "Save Failed",
      text:
        err.response?.data?.message ||
        "An error occurred while saving your draft.",
    });
  }
};

// 여행 삭제
const deleteTravel = async () => {
  const result = await Swal.fire({
    icon: "warning",
    title: "Delete Travel",
    text: "Are you sure you want to delete this trip? This action cannot be undone.",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await userPlans.deletePlan(planId);
    await Swal.fire("Deleted!", "Your trip has been deleted.", "success");
    router.push("/mypage");
  } catch (e) {
    console.error(e);
    await Swal.fire("Error", "Failed to delete. Please try again.", "error");
  }
};

// 여행 완료 (Publish)
const endTravel = async () => {
  const result = await Swal.fire({
    icon: "question",
    title: "End Travel",
    text: "Would you like to publish your trip diary and end this travel?",
    showCancelButton: true,
    confirmButtonText: "Publish & End",
    cancelButtonText: "Cancel",
  });
  if (!result.isConfirmed) return;

  try {
    // 1) 유효성 검사
    validate();

    // 2) routes 계산
    const routes = plan.days.map((day) => ({
      date: day.date.toISOString().slice(0, 10),
      items: day.locations.map((loc) => ({
        visitedDate: loc.visitedDate,
        visitedTime: loc.visitedTime + ":00",
        distance: loc.distance,
        title: loc.name,
        latitude: loc.coordinates.lat,
        longitude: loc.coordinates.lng,
      })),
    }));

    // 3) 메타 객체 생성
    const meta = {
      diaryId: Number(planId),
      title: plan.title,
      content: plan.content,
      areaId: Number(plan.areaId),
      tags: plan.tags.map((t) => t.id),
      startDate: plan.startDate,
      endDate: plan.endDate,
      status: "published",
      routes,
      thumbnail: plan.thumbnail || null,
      images: existingImageUrls.value,
    };

    // 4) 파일 없는 경우 기존 URL 유지
    if (!(plan.thumbnail instanceof File) && plan.thumbnail) {
      meta.thumbnail = plan.thumbnail;
    }

    // 5) FormData에 담기
    const fd = new FormData();
    fd.append(
      "data",
      new Blob([JSON.stringify(meta)], { type: "application/json" })
    );
    // 6) file인 경우만 append
    if (plan.thumbnail instanceof File) {
      fd.append("thumbnail", plan.thumbnail);
    }

    // 7) multipart 요청 전송 (헤더 지정 없이)
    await axios.post(`/api/v1/user/diaries/${planId}`, fd);

    await Swal.fire("Published!", "Your trip has been published.", "success");
    router.push("/mypage");
  } catch (e) {
    console.error(e);
    await Swal.fire("Error", "Publish failed.", "error");
  }
};
</script>

<style scoped>
/* 기본 레이아웃 */
.container {
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  padding-top: 90px;
  padding-bottom: 30px;
  box-sizing: border-box;
}

/* 헤더 */
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  /* …기존 */
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-delete {
  background: #5880b7;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-delete:hover {
  transform: translateY(-2px);
}

/* Save(빨강) 옆에 Publish(파랑) 버튼 */
.btn-end {
  background: #2cb67d;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-end:hover {
  transform: translateY(-2px);
}

.btn-back,
.btn-save {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.btn-back {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  color: #64748b;
  border: 2px solid #e2e8f0;
}

.btn-back:hover {
  background: rgba(255, 255, 255, 1);
  color: #475569;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-save {
  background: #c2372f;
  color: white;
}

.btn-save:hover {
  transform: translateY(-2px);
}

.icon {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}

/* 카드 스타일 */
.card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  border: 2px solid #e2e8f0;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.map-card-parent {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 20px;
  border: 2px solid #e2e8f0;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.section-title {
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 20px 0;
  background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 폼 요소 */
.form-flex {
  display: flex;
  gap: 24px;
}

.form-flex .field {
  flex: 0 0 auto;
}

/* Trip Title 칸만 남은 공간을 전부 차지 */
.form-flex .field:first-child {
  flex: 1 1 auto;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.details-grid .field.full {
  grid-column: 1 / -1;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field.full {
  grid-column: 1 / -1;
}

.field label {
  font-weight: 600;
  color: #374151;
  font-size: 14px;
}

.input-wrapper {
  position: relative;
}

.input-primary,
.textarea-primary,
.select-primary {
  width: 100%;
  padding: 12px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
  color: #1e293b;
  box-sizing: border-box;
}

.input-primary:focus,
.textarea-primary:focus,
.select-primary:focus {
  outline: none;
  border-color: #c2372f;
  box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.1);
  background: rgba(255, 255, 255, 1);
}

.textarea-primary {
  resize: none;
  min-height: 100px;
}

.date-inputs {
  display: flex;
  align-items: center;
  gap: 12px;
}

.date-separator {
  color: #64748b;
  font-weight: 500;
}

/* 업로드 영역 */
.upload-area {
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgba(248, 250, 252, 0.8);
}

.upload-area:hover {
  border-color: #c2372f;
  background: rgba(225, 29, 72, 0.05);
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.upload-icon {
  width: 32px;
  height: 32px;
  color: #64748b;
}

.upload-content span {
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
}

/* 미리보기 스타일 수정 */
.preview {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 16px;
  border: 2px solid #e2e8f0;
}

.preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.preview:hover .preview-overlay {
  opacity: 1;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.preview-item {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e2e8f0;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.preview-item .preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.preview-item:hover .preview-overlay {
  opacity: 1;
}

.remove-btn {
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.remove-btn:hover {
  background: #dc2626;
  transform: scale(1.1);
}

.remove-btn svg {
  width: 16px;
  height: 16px;
  stroke-width: 2.5;
}

/* Day 탭 */
.day-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.day-tab {
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  min-width: 120px;
  text-align: center;
}

.day-tab:hover {
  border-color: #c2372f;
  background: rgba(225, 29, 72, 0.05);
  transform: translateY(-2px);
}

.day-tab.active {
  background: linear-gradient(135deg, #c2372f 0%, #c2372f 100%);
  border-color: #c2372f;
  color: white;
  box-shadow: 0 4px 14px rgba(225, 29, 72, 0.3);
}

.day-number {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
}

.day-date {
  font-size: 12px;
  opacity: 0.8;
}

/* 플랜 맵 컨테이너 */
.plan-map-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 500px auto; /* itinerary/map and then tags */
  gap: 20px;
}

/* 루트 카드 */
.routes-card {
  grid-column: 1;
  grid-row: 1 / span 2;
  overflow: auto;
  margin-bottom: 0px;
}

.routes-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.routes-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

/* 검색 */
.search-container {
  position: relative;
  width: 100%;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 14px;
  width: 18px;
  height: 18px;
  color: #64748b;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 44px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #c2372f;
  box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.1);
  background: rgba(255, 255, 255, 1);
}

.search-results {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  box-sizing: border-box;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f1f5f9;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover {
  background: rgba(225, 29, 72, 0.05);
}

.location-icon {
  width: 16px;
  height: 16px;
  color: #c2372f;
  flex-shrink: 0;
}

/* 루트 리스트 */
.routes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
}

.route-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: rgba(248, 250, 252, 0.8);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.route-item:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.route-handle {
  cursor: grab;
  color: #94a3b8;
  padding: 4px;
}

.route-handle:active {
  cursor: grabbing;
}

.route-handle svg {
  width: 16px;
  height: 16px;
}

.route-number {
  background: linear-gradient(135deg, #c2372f 0%, #c2372f 100%);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}

.route-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.route-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
}

.route-time {
  display: flex;
  gap: 8px;
}

.time-input {
  padding: 6px 8px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 12px;
  background: white;
  transition: border-color 0.2s ease;
}

.time-input:focus {
  outline: none;
  border-color: #c2372f;
}

.remove-route {
  background: none;
  border: none;
  color: #c2372f;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-route:hover {
  background: #c2372f;
}

.remove-route svg {
  width: 16px;
  height: 16px;
}

/* 빈 상태 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 160px 20px;
  text-align: center;
  color: #64748b;
}

.empty-icon-pin {
  width: 62px;
  height: 62px;
  color: #cbd5e1;
  margin-bottom: 16px;
}

.empty-state p {
  font-weight: 600;
  margin: 0 0 4px 0;
  font-size: 18px;
}

.empty-state small {
  font-size: 12px;
  opacity: 0.8;
}

/* 지도 카드 */
.map-card {
  min-height: 500px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  grid-column: 2;
  grid-row: 1;
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.map-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.map-controls {
  display: flex;
  gap: 8px;
}

.map-control-btn {
  background: #ddd;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-control-btn:hover {
  background: #c2372f;
  border-color: #c2372f;
}

#kakao-map {
  width: 100%;
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  cursor: grab;
}

#kakao-map:active {
  cursor: grabbing;
}

/* 지도 마커 라벨 */
:global(.map-marker-label) {
  background: linear-gradient(135deg, #c2372f 0%, #c2372f 100%);
  color: white;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(225, 29, 72, 0.3);
  border: 2px solid white;
}

/* 로봇 아이콘 래퍼 */
.bot-icon-wrapper {
  position: relative;
  width: 48px;
  height: 48px;
  margin-right: 12px;
  flex-shrink: 0;
}
.bot-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* 살짝 위로 띄워서 헤더와 겹치게 */
  margin-top: -8px;
}

/* AI 태그 생성 버튼 기본 스타일 */
.ai-tags-card {
  grid-column: 2; /* 오른쪽 컬럼 */
  grid-row: 2;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(15px);
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 15px;
}

.ai-tags-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.bot-icon {
  width: 62px;
  height: 62px;
}

.ai-tags-header h2 {
  flex: 1;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.btn-generate {
  background: #c2372f;
  color: white;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
}

.btn-generate.loading {
  opacity: 0.6;
  cursor: wait;
}

.tag-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.tag-item {
  background: #333;
  color: #eee;
  border-radius: 12px;
  padding: 12px 0;
  font-size: 14px;
  text-align: center;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.tag-item.empty {
  background: transparent;
  box-shadow: none;
}

/* 스피너 애니메이션 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.route-handle {
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}
.route-handle:active {
  cursor: grabbing;
}

/* 카드가 이동할 때 transform 과 box-shadow 에 트랜지션을 준다 */
.route-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* 드래그 중 ghost 엘리먼트는 반투명 처리 */
.ghost {
  opacity: 0.4;
}

/* 드래그 중인 실제 아이템은 살짝 강조 */
.chosen {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transform: scale(1.02);
}

/* 반응형 디자인 */
@media (max-width: 1024px) {
  .plan-map-container {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 16px;
  }

  .header-bar {
    flex-direction: column;
    gap: 12px;
  }

  .btn-back,
  .btn-save {
    width: 100%;
    justify-content: center;
  }

  .day-tabs {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .date-inputs {
    flex-direction: column;
    align-items: stretch;
  }

  .date-separator {
    text-align: center;
    padding: 8px 0;
  }

  .route-item {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .time-input {
    box-sizing: border-box;
    padding: 4px 8px; /* 위아래 여백을 줄여도 되고 늘려도 됩니다 */
    height: 32px; /* 원하는 높이로 조정 */
    line-height: 1.2; /* 텍스트가 안 잘리도록 */
  }

  .route-info {
    min-width: 200px;
  }

  .route-time {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 16px;
  }

  .section-title {
    font-size: 18px;
  }

  .route-item {
    padding: 12px;
  }

  .preview-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
