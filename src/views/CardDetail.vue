<template>
  <div>
    <LandingLoader v-if="loading" />
    <div class="travel-detail-container" v-show="!loading">
      <!-- 1) 뒤로 가기 버튼 -->
      <div class="back-button">
        <router-link to="/list">
          <i class="fas fa-arrow-left"></i>
        </router-link>
      </div>

      <!-- 3) 사진 그리드 -->
      <div v-if="travelData" class="image-gallery">
        <div class="photos-grid">
          <div
            v-for="(img, i) in travelData.allImages.slice(0, 5)"
            :key="i"
            :class="['photo', i === 0 ? 'main' : 'sub']"
            @click="openGallery(i)"
          >
            <img :src="img" />
            <div v-if="i === 4" class="show-all" @click.stop="openGallery(0)">
              <i class="fas fa-th"></i> View all
            </div>
          </div>
        </div>
      </div>

      <!-- 4) 사진 모달 -->
      <div v-if="galleryOpened" class="gallery-modal">
        <div class="modal-header">
          <i class="fas fa-arrow-left back-icon" @click="closeGallery"></i>
          <span>Photo Gallery</span>
          <img
            class="close-icon"
            :src="CloseIcon"
            alt="Close gallery"
            @click="closeGallery"
          />
        </div>
        <div class="gallery-body">
          <div class="thumb-list">
            <div
              v-for="(img, i) in travelData.allImages"
              :key="i"
              class="thumb"
              :class="{ active: i === currentSlide }"
              @click="goToSlide(i)"
            >
              <img :src="img" />
            </div>
          </div>
          <div class="full-image">
            <img :src="travelData.allImages[currentSlide]" />
          </div>
        </div>
      </div>

      <!-- 5) 여행 제목·메타 -->
      <div class="travel-header" v-if="travelData">
        <div>
          <h1>{{ travelData.title }}</h1>
          <div class="travel-meta">
            <span class="travel-date">{{ travelData.dateRange }}</span>
            <span class="travel-author">by {{ travelData.author }}</span>
          </div>
        </div>
        <img
          class="like-btn"
          :src="liked ? likeImage : emptyLikeImage"
          @click.stop="toggleLike"
          alt="Like toggle"
        />
      </div>

      <!-- 6) 태그 -->
      <div class="tags-container" v-if="travelData">
        <span v-for="(tag, idx) in travelData.tags" :key="idx" class="tag">
          #{{ tag }}
        </span>
      </div>

      <!-- 7) Day 탭 -->
      <div v-if="travelData" class="day-tabs">
        <button
          v-for="(day, idx) in travelData.days"
          :key="idx"
          :class="{ active: selectedDay === idx }"
          @click="selectDay(idx)"
        >
          Day {{ idx + 1 }}
        </button>
      </div>

      <!-- 8~9) 일정 & 지도 -->
      <div v-if="travelData" class="plan-map-wrapper">
        <div class="routes-container">
          <h2>My Plan - Day {{ selectedDay + 1 }}</h2>
          <div class="day-container">
            <h3 class="day-title">
              {{ formatDate(travelData.days[selectedDay].date) }}
            </h3>
            <div class="routes">
              <div
                v-for="(loc, lIdx) in travelData.days[selectedDay].locations"
                :key="lIdx"
                class="route-item"
              >
                <div class="route-number">{{ lIdx + 1 }}</div>
                <div class="route-time">{{ loc.time }}</div>
                <div class="route-content">
                  <div class="location-name">{{ loc.name }}</div>
                  <div class="location-description">
                    {{ loc.description }}
                  </div>
                  <div
                    v-if="
                      lIdx < travelData.days[selectedDay].locations.length - 1
                    "
                    class="distance"
                  >
                    <i class="fas fa-arrow-down"></i>
                    {{ travelData.days[selectedDay].distances[lIdx] }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="map-container">
          <h2>Map - Day {{ selectedDay + 1 }}</h2>
          <div id="kakao-map" class="kakao-map"></div>
        </div>
      </div>

      <!-- 10) 댓글 섹션 -->
      <div v-if="travelData" class="comments-list">
        <div class="comments-section-header">
          <h2>Comments</h2>
          <span class="comments-count"
            >{{
              // 댓글 개수 + 모든 대댓글 개수
              travelData.comments.reduce(
                (sum, c) => sum + 1 + c.replies.length,
                0
              )
            }}
          </span>
        </div>

        <!-- 댓글 작성 폼 -->
        <div class="comment-form">
          <div class="comment-form-header">
            <div>Leave your thoughts about this travel plan</div>
          </div>
          <textarea
            v-model="newComment"
            placeholder="Share your thoughts or ask a question..."
          ></textarea>
          <div class="comment-form-actions">
            <button class="comment-submit-btn" @click="addComment">
              Post Comment
            </button>
          </div>
        </div>

        <!-- 댓글 + 답글 리스트 -->
        <div v-for="c in travelData.comments" :key="c.id" class="comment">
          <!-- 댓글 헤더 -->
          <div class="comment-header">
            <div class="comment-info">
              <div class="column-box">
                <div class="comment-username">
                  {{ c.username }}
                  <span v-if="c.isAuthor" class="author-badge">Author</span>
                </div>
                <div class="comment-date">{{ formatCommentDate(c.date) }}</div>
              </div>
            </div>
          </div>

          <!-- 댓글 내용 읽기/편집 분기 -->
          <div
            v-if="editingCommentId !== c.id || editingIsReply"
            class="comment-content"
          >
            {{ c.content }}
          </div>
          <div v-else class="comment-editing">
            <textarea
              v-model="editingContent"
              class="comment-edit-textarea"
              rows="3"
            ></textarea>
            <div class="comment-form-actions">
              <button class="comment-submit-btn" @click="saveEdit(false)">
                Save
              </button>
              <button class="comment-cancel-btn" @click="cancelEdit">
                Cancel
              </button>
            </div>
          </div>

          <!-- 댓글 액션 -->
          <div class="comment-actions">
            <div class="comment-action" @click="showReplyForm(c.id)">
              <i class="far fa-comment"></i>
              <span>Reply</span>
            </div>
            <div
              v-if="c.isAuthor"
              class="comment-action"
              @click="startEdit(c.id, c.content, false)"
            >
              Edit
            </div>
            <div
              v-if="c.isAuthor"
              class="comment-action"
              @click="deleteComment(c.id)"
            >
              Delete
            </div>
          </div>

          <!-- 답글 입력폼 -->
          <div v-if="replyingTo === c.id" class="comment-form reply-form">
            <textarea
              v-model="newReply"
              placeholder="Write a reply…"
              rows="2"
            ></textarea>
            <div class="comment-form-actions">
              <button class="comment-submit-btn" @click="addReply(c.id)">
                Post Reply
              </button>
            </div>
          </div>

          <!-- 대댓글 리스트 -->
          <div v-for="r in c.replies" :key="r.id" class="replies">
            <!-- 대댓글 헤더 -->
            <div class="reply-header">
              <div class="reply-username">{{ r.username }}</div>
              <div class="reply-date">{{ formatCommentDate(r.date) }}</div>
            </div>

            <!-- 대댓글 내용 읽기/편집 분기 -->
            <div
              v-if="editingCommentId !== r.id || !editingIsReply"
              class="reply-content"
            >
              {{ r.content }}
            </div>
            <div v-else class="reply-editing">
              <textarea
                v-model="editingContent"
                class="reply-edit-textarea"
                rows="2"
              ></textarea>
              <div class="comment-form-actions">
                <button class="comment-submit-btn" @click="saveEdit(true)">
                  Save
                </button>
                <button class="comment-cancel-btn" @click="cancelEdit">
                  Cancel
                </button>
              </div>
            </div>

            <!-- 대댓글 액션 -->
            <div class="comment-actions">
              <div
                v-if="r.isAuthor"
                class="comment-action"
                @click="startEdit(r.id, r.content, true, c.id)"
              >
                Edit
              </div>
              <div
                v-if="r.isAuthor"
                class="comment-action"
                @click="deleteComment(r.id, true, c.id)"
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import LandingLoader from "../components/LandingLoader.vue";
import client from "../api/client";
import myPin from "../assets/map-pin.png";
import emptyLikeImage from "../assets/empty-like.png";
import likeImage from "../assets/like.png";
import CloseIcon from "../assets/cancel.png";
import { emitter } from "../plugins/emitter";

export default {
  name: "TravelDetail",
  components: { Header, LandingLoader },
  data() {
    return {
      loading: false,
      travelData: null,
      newComment: "",
      newReply: "",
      replyingTo: null,
      galleryOpened: false,
      currentSlide: 0,
      selectedDay: 0,
      map: null,
      markers: [],
      polyline: null,
      distanceOverlays: [],
      numberOverlays: [],
      liked: false,
      emptyLikeImage,
      likeImage,
      CloseIcon,
      // 편집용 상태
      editingCommentId: null,
      editingContent: "",
      editingIsReply: false,
      editingParentId: null,
    };
  },
  async mounted() {
    const planId = this.$route.params.planId;
    emitter.emit("start-loading");
    this.loading = true;

    try {
      // ── 1) localStorage 에서 auth 꺼내오기 & token 파싱
      const saved = localStorage.getItem("auth");
      let bearer = "";
      if (saved) {
        const { token } = JSON.parse(saved);
        bearer = token; // 이미 "Bearer xxx" 형태로 저장해 두셨다면 그대로 사용
      }

      // ── 2) axios 인스턴스 기본 헤더에도 설정해 두면 이후 매번 안 붙여줘도 됩니다
      if (bearer) {
        client.defaults.headers.common["Authorization"] = bearer;
      }

      // ── 3) detail API 호출 (헤더는 client.defaults 에 들어있으므로 따로 안 넣어도 OK)
      const { data: d } = await client.get(`/api/v1/user/diaries/${planId}`);

      // ── 4) 받은 데이터 매핑
      this.travelData = {
        id: d.id,
        title: d.title,
        author: d.userInfo.name,
        dateRange:
          d.startDate.slice(0, 10).replace(/-/g, ".") +
          " – " +
          d.endDate.slice(0, 10).replace(/-/g, "."),
        thumbnail: d.thumbnail,
        allImages: [d.thumbnail, ...d.images],
        tags: d.tags.map((t) => t.nameEng),
        liked: d.userLiked,
        days: d.routes.map((r) => ({
          date: r.date,
          locations: r.items.map((it) => ({
            time: it.visitedTime,
            name: it.title,
            description: "",
            coordinates: { lat: it.latitude, lng: it.longitude },
          })),
          distances: r.items.slice(0, -1).map((it) => `${it.distance}m`),
        })),
        comments: (d.comments || []).map((c) => ({
          id: c.commentId,
          username: c.userName,
          content: c.content,
          date: c.createdAt,
          isAuthor: c.userId === d.userInfo.userId,
          // children 이 배열이라면 map, 아니면 빈 배열
          replies: Array.isArray(c.children)
            ? c.children.map((r) => ({
                id: r.commentId,
                username: r.userName,
                content: r.content,
                date: r.createdAt,
                isAuthor: r.userId === d.userInfo.userId,
              }))
            : [],
        })),
      };
      this.liked = this.travelData.liked;
    } catch (err) {
      console.error("Failed to fetch diary detail:", err);
    } finally {
      emitter.emit("end-loading");
      this.loading = false;
    }

    // 지도 초기화
    await this.loadKakaoSdk();
    this.initMap();
    this.renderDayMap();
  },
  methods: {
    // ── Kakao Map Helpers ─────────────────────────────────────────────────
    loadKakaoSdk() {
      return new Promise((res, rej) => {
        if (window.kakao && window.kakao.maps)
          return window.kakao.maps.load(res);
        const s = document.createElement("script");
        s.src =
          "https://dapi.kakao.com/v2/maps/sdk.js?appkey=73816551dd3f5b0dccade36971e6f556&libraries=services&autoload=false";
        s.onload = () => window.kakao.maps.load(res);
        s.onerror = rej;
        document.head.appendChild(s);
      });
    },
    initMap() {
      if (!this.travelData.days.length) return;
      const first = this.travelData.days[0].locations[0].coordinates;
      this.map = new kakao.maps.Map(document.getElementById("kakao-map"), {
        center: new kakao.maps.LatLng(first.lat, first.lng),
        level: 8,
      });
    },
    renderDayMap() {
      if (!this.map) return;
      this.markers.forEach((m) => m.setMap(null));
      this.polyline && this.polyline.setMap(null);
      this.distanceOverlays.forEach((o) => o.setMap(null));
      this.numberOverlays.forEach((o) => o.setMap(null));
      this.markers = [];
      this.distanceOverlays = [];
      this.numberOverlays = [];

      const day = this.travelData.days[this.selectedDay];
      const bounds = new kakao.maps.LatLngBounds();
      const path = [];
      const markerImage = new kakao.maps.MarkerImage(
        myPin,
        new kakao.maps.Size(40, 40),
        { offset: new kakao.maps.Point(15, 35) }
      );

      day.locations.forEach((loc, i) => {
        const pos = new kakao.maps.LatLng(
          loc.coordinates.lat,
          loc.coordinates.lng
        );
        const marker = new kakao.maps.Marker({
          position: pos,
          image: markerImage,
          map: this.map,
        });
        this.markers.push(marker);
        bounds.extend(pos);
        path.push(pos);

        const numOv = new kakao.maps.CustomOverlay({
          position: pos,
          content: `<div class="map-marker-label">${i + 1}</div>`,
          xAnchor: 0.5,
          yAnchor: -0.2,
          zIndex: 5,
          map: this.map,
        });
        this.numberOverlays.push(numOv);

        kakao.maps.event.addListener(marker, "click", () => {
          const items = document.querySelectorAll(".route-item");
          items[i] &&
            items[i].scrollIntoView({ behavior: "smooth", block: "center" });
        });
      });

      this.polyline = new kakao.maps.Polyline({
        path,
        strokeWeight: 4,
        strokeColor: "#c2372f",
        strokeOpacity: 0.7,
        map: this.map,
      });

      day.locations.slice(0, -1).forEach((_, i) => {
        const next = day.locations[i + 1];
        const mid = new kakao.maps.LatLng(
          (day.locations[i].coordinates.lat + next.coordinates.lat) / 2,
          (day.locations[i].coordinates.lng + next.coordinates.lng) / 2
        );
        const distOv = new kakao.maps.CustomOverlay({
          position: mid,
          content: `<div class="distance-label">${day.distances[i]}</div>`,
          xAnchor: 0.5,
          yAnchor: 0.5,
          map: this.map,
        });
        this.distanceOverlays.push(distOv);
      });

      if (path.length === 1) {
        this.map.setCenter(path[0]);
        this.map.setLevel(4);
      } else {
        this.map.setBounds(bounds);
        const ne = bounds.getNorthEast(),
          sw = bounds.getSouthWest();
        this.map.setCenter(
          new kakao.maps.LatLng(
            (ne.getLat() + sw.getLat()) / 2,
            (ne.getLng() + sw.getLng()) / 2
          )
        );
      }
      this.map.relayout();
    },

    // ── Gallery ─────────────────────────────────────────────────────────────
    openGallery(i) {
      this.currentSlide = i;
      this.galleryOpened = true;
      document.body.style.overflow = "hidden";
    },
    closeGallery() {
      this.galleryOpened = false;
      document.body.style.overflow = "";
    },
    goToSlide(i) {
      this.currentSlide = i;
    },

    // ── Day Tab ─────────────────────────────────────────────────────────────
    selectDay(i) {
      this.selectedDay = i;
      this.renderDayMap();
    },

    // ── Like ─────────────────────────────────────────────────────────────────
    async toggleLike() {
      const planId = this.travelData.id;
      this.liked = !this.liked;
      try {
        const action = this.liked ? "like" : "unlike";
        await client.post(`/api/v1/user/diaries/${planId}/${action}`);
      } catch (err) {
        this.liked = !this.liked;
        console.error("좋아요 처리 실패:", err);
      }
    },

    // ── 댓글 Edit ───────────────────────────────────────────────────────────
    startEdit(id, content, isReply = false, parentId = null) {
      this.editingCommentId = id;
      this.editingContent = content;
      this.editingIsReply = isReply;
      this.editingParentId = parentId;
    },
    cancelEdit() {
      this.editingCommentId = null;
      this.editingContent = "";
      this.editingIsReply = false;
      this.editingParentId = null;
    },
    async saveEdit(isReply) {
      if (!this.editingContent.trim()) return;

      try {
        const { data: updated } = await client.patch(
          `/api/v1/user/comments/${this.editingCommentId}`,
          { content: this.editingContent }
        );

        if (isReply) {
          const parent = this.travelData.comments.find(
            (c) => c.id === this.editingParentId
          );
          const reply = parent.replies.find(
            (r) => r.id === this.editingCommentId
          );
          reply.content = updated.content;
          reply.date = updated.createdAt;
        } else {
          const comment = this.travelData.comments.find(
            (c) => c.id === this.editingCommentId
          );
          comment.content = updated.content;
          comment.date = updated.createdAt;
        }
      } catch (err) {
        console.error("댓글 수정 실패:", err);
      } finally {
        this.cancelEdit();
      }
    },

    // ── 댓글 생성 ───────────────────────────────────────────────────────────
    async addComment() {
      const content = this.newComment.trim();
      if (!content) return;
      try {
        const { data: created } = await client.post("/api/v1/user/comments", {
          diaryId: this.travelData.id,
          content,
          createdAt: new Date().toISOString(),
        });
        this.travelData.comments.push({
          id: created.commentId,
          username: created.userName,
          content: created.content,
          date: created.createdAt,
          isAuthor: true,
          replies: [],
        });
        this.newComment = "";
      } catch (err) {
        console.error("댓글 작성 실패:", err);
      }
    },

    // ── 대댓글 입력폼 토글 ─────────────────────────────────────────────────
    showReplyForm(commentId) {
      this.replyingTo = this.replyingTo === commentId ? null : commentId;
      this.newReply = "";
    },

    // ── 대댓글 생성 ─────────────────────────────────────────────────────────
    async addReply(parentId) {
      const content = this.newReply.trim();
      if (!content) return;

      try {
        // 1) API 호출
        const { data } = await client.post("/api/v1/user/comments/reply", {
          diaryId: this.travelData.id,
          parentId,
          content,
          createdAt: new Date().toISOString(),
        });

        // 2) 실제 댓글 데이터: children 속성이 있으면 그걸, 없으면 data 자체를 사용
        const child = data;

        // 3) 올바른 필드로 새 reply 객체 생성
        const newReply = {
          id: child.commentId, // ← 여기를 child.commentId 로
          username: child.userName, // ← 여기를 child.userName 로
          content: child.content, // ← content 도 마찬가지
          date: child.createdAt, // ← createdAt 도 읽어오기
          isAuthor: true,
        };

        // 4) push
        const parent = this.travelData.comments.find((c) => c.id === parentId);
        parent.replies.push(newReply);

        // 5) 폼 리셋
        this.replyingTo = null;
        this.newReply = "";
      } catch (err) {
        console.error("대댓글 작성 실패:", err);
      }
    },

    // ── 댓글/대댓글 삭제 ────────────────────────────────────────────────────
    async deleteComment(id, isReply = false, parentId = null) {
      try {
        await client.delete(`/api/v1/user/comments/${id}`);
        if (isReply) {
          const parent = this.travelData.comments.find(
            (c) => c.id === parentId
          );
          parent.replies = parent.replies.filter((r) => r.id !== id);
        } else {
          this.travelData.comments = this.travelData.comments.filter(
            (c) => c.id !== id
          );
        }
      } catch (err) {
        console.error("댓글 삭제 실패:", err);
      }
    },

    // ── UTIL ──────────────────────────────────────────────────────────────────
    formatDate(d) {
      return new Date(d).toLocaleDateString("ko-KR", {
        month: "short",
        day: "numeric",
        weekday: "short",
      });
    },
    formatCommentDate(d) {
      const diff = Date.now() - new Date(d);
      const m = Math.floor(diff / 60000),
        h = Math.floor(m / 60),
        D = Math.floor(h / 24);
      if (m < 60) return `${m} minutes ago`;
      if (h < 24) return `${h} hours ago`;
      if (D < 7) return `${D} days ago`;
      return new Date(d).toLocaleDateString("ko-KR");
    },
  },
};
</script>

<style scoped>
/* ────────────────────────────────────────────────────────────────────────────
   1. 기본 레이아웃 & 타이포
──────────────────────────────────────────────────────────────────────────── */
.travel-detail-container {
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 20px;
  color: #333;
}
.back-button {
  margin-bottom: 20px;
}
.back-button a {
  color: #666;
  font-size: 16px;
  text-decoration: none;
}
.back-button i {
  margin-right: 8px;
}

/* ────────────────────────────────────────────────────────────────────────────
   2. 사진 그리드 (Airbnb 스타일)
──────────────────────────────────────────────────────────────────────────── */
.photos-grid {
  display: grid;
  gap: 4px;
  height: 400px;
  margin-bottom: 30px;
  grid-template:
    "main sub1 sub2"
    "main sub3 sub4"
    / 2fr 1fr 1fr;
}
.photos-grid .main {
  grid-area: main;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}
.photos-grid .sub:nth-child(2) {
  grid-area: sub1;
}
.photos-grid .sub:nth-child(3) {
  grid-area: sub2;
  border-top-right-radius: 16px;
}
.photos-grid .sub:nth-child(4) {
  grid-area: sub3;
}
.photos-grid .sub:nth-child(5) {
  grid-area: sub4;
  border-bottom-right-radius: 16px;
}
.photo {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.photo:hover img {
  transform: scale(1.05);
}
.show-all {
  position: absolute;
  bottom: 10px;
  right: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
}

/* ────────────────────────────────────────────────────────────────────────────
   3. 사진 투어 모달
──────────────────────────────────────────────────────────────────────────── */
.gallery-modal {
  position: fixed;
  inset: 0;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  z-index: 1000;
}
.modal-header {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px;
  color: #fff;
  font-size: 18px;
}
.back-icon {
  margin-right: 12px;
  cursor: pointer;
}
.gallery-body {
  flex: 1;
  display: flex;
}
.thumb-list {
  width: 100px;
  padding: 10px 30px;
  overflow-y: auto;
}
.thumb-list::-webkit-scrollbar {
  display: none;
}
.thumb {
  margin-bottom: 8px;
  cursor: pointer;
  border: 2px solid transparent;
}
.thumb.active {
  border-color: #c2372f !important;
}
.thumb img {
  width: 100%;
  height: 80px;
  object-fit: cover;
}
.full-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin-bottom: 60px;
  overflow: hidden;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.full-image img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
}

.close-icon {
  position: absolute;
  top: 26px;
  left: 140px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: opacity 0.2s;
  z-index: 1000;
}
.close-icon:hover {
  opacity: 0.7;
}

/* ────────────────────────────────────────────────────────────────────────────
   4. 제목·메타·좋아요 버튼
──────────────────────────────────────────────────────────────────────────── */
.travel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.travel-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #222;
  margin: 0;
}
.travel-meta {
  display: flex;
  gap: 20px;
  color: #666;
  font-size: 14px;
}
.like-btn {
  width: 72px;
  height: 72px;
  cursor: pointer;
}

/* ────────────────────────────────────────────────────────────────────────────
   5. 태그
──────────────────────────────────────────────────────────────────────────── */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}
.tag {
  /* background: #ddd; */
  background: #333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 16px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 12px;
}

/* ────────────────────────────────────────────────────────────────────────────
   6. Day 탭
──────────────────────────────────────────────────────────────────────────── */
.day-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}
.day-tabs button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #eee;
  cursor: pointer;
  transition: background 0.2s;
}
.day-tabs button.active {
  background: #c2372f;
  color: #fff;
}

/* ────────────────────────────────────────────────────────────────────────────
   7. 일정 & 지도 (flex 컨테이너)
──────────────────────────────────────────────────────────────────────────── */
.plan-map-wrapper {
  display: flex;
  gap: 20px;
  align-items: stretch;
  margin-bottom: 40px;
}
.routes-container,
.map-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.routes-container {
  /* 일정 내용만 세로 스크롤 */
  overflow-y: auto;
  overflow: visible;
}
.routes-container h2,
.map-container h2 {
  font-size: 22px;
  font-weight: 600;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.day-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

/* 경로 아이템 스타일 수정 */
.route-item {
  display: flex;
  position: relative;
  margin-bottom: 24px;
  align-items: flex-start;
}

/* 1) 기존 border-left 제거 */
.routes {
  position: relative;
  padding-left: 13px; /* 숫자지시자(24px) + 여유공간(8px) */
  margin-left: 0;
}

/* 2) ::before 로 세로선 그리기 */
.routes::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 12px; /* 숫자 원 반지름(24px/2) */
  width: 2px;
  background: #ddd;
}

/* 3) .route-number 위치 조정 */
.route-number {
  width: 24px;
  height: 24px;
  margin-left: -12px;
  margin-right: 8px;
  background: #c2372f;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* 이전 원형 마커 스타일 제거 후 번호로 대체 */
.route-item::before {
  content: none;
}

/* 경로 시간 스타일 조정 */
.route-time {
  min-width: 60px;
  padding-right: 12px;
  font-weight: 500;
  color: #555;
}

.location-name {
  font-weight: 600;
  margin-bottom: 4px;
}

/* 거리 표시 스타일 개선 */
.distance {
  display: flex;
  align-items: center;
  color: #666;
  margin-top: 12px;
  background: #f5f5f5;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 14px;
  width: fit-content;
}

/* 거리 아이콘 개선 */
.distance i {
  margin-right: 8px;
  color: #c2372f;
}

.map-container .kakao-map {
  flex: 1;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* 지도 핀 번호 스타일 개선 */
::v-deep .map-marker-label {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 12px;
  border-radius: 50%;
  background: #c2372f;
  color: #fff;
  font-size: 8px;
  font-weight: 700;
  transform: translate(0%, 0%);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 100;
}

/* 거리 레이블 스타일 개선 */
::v-deep .distance-label {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #c2372f;
  font-weight: 600;
  white-space: nowrap;
  transform: translate(-50%, -60%);
}

/* ────────────────────────────────────────────────────────────────────────────
   댓글 전체 섹션
──────────────────────────────────────────────────────────────────────────── */
.comments-list {
  margin-top: 50px;
  border-radius: 12px;
}

.comments-section-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.comments-section-header h2 {
  color: #333;
  margin: 0;
}

.comments-count {
  margin-left: 12px;
  background: #c2372f;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
}

/* ────────────────────────────────────────────────────────────────────────────
   댓글 작성 폼
──────────────────────────────────────────────────────────────────────────── */
.comment-form {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e5e5;
}

.comment-form-header {
  margin-bottom: 16px;
}

.comment-form-header div {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.comment-form textarea {
  width: 100%;
  min-height: 100px;
  padding: 16px;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  box-sizing: border-box;
  font-family: inherit;
  transition: border-color 0.2s;
}

.comment-form textarea:focus {
  outline: none;
  border-color: #c2372f;
}

.comment-form textarea::placeholder {
  color: #999;
}

.comment-form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.comment-submit-btn {
  background: #c2372f;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.comment-submit-btn:hover {
  background: #a02d26;
  transform: translateY(-1px);
}

/* ────────────────────────────────────────────────────────────────────────────
   개별 댓글 스타일
──────────────────────────────────────────────────────────────────────────── */
.comment {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e8e8e8;
  transition: all 0.2s ease;
}

.comment:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.comment:last-child {
  margin-bottom: 0;
}

/* 댓글 정보 영역 개선 */
.comment-info {
  margin-bottom: 16px;
}

.column-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.comment-username {
  font-weight: 700;
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;
}

.author-badge {
  font-size: 10px;
  background: linear-gradient(135deg, #c2372f, #e74c3c);
  color: #fff;
  padding: 3px 8px;
  border-radius: 12px;
  margin-left: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(194, 55, 47, 0.3);
}

.comment-date {
  font-size: 13px;
  color: #777;
  font-weight: 400;
}

.comment-content {
  font-size: 15px;
  line-height: 1.7;
  color: #444;
  margin-bottom: 16px;
  padding: 0;
}

/* 댓글 액션 */
.comment-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.comment-action {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  text-align: center;
  border-radius: 6px;
  transition: all 0.2s;
  background: #f8f8f8;
}

.comment-action:hover {
  color: #c2372f;
  background: #fff2f1;
  transform: translateY(-1px);
}

.comment-action i {
  font-size: 14px;
}

/* ────────────────────────────────────────────────────────────────────────────
   답글 입력 폼
──────────────────────────────────────────────────────────────────────────── */
.reply-form {
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.reply-textarea {
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border: 2px solid #e5e5e5;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.4;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;
}

.reply-textarea:focus {
  outline: none;
  border-color: #c2372f;
}

/* ────────────────────────────────────────────────────────────────────────────
   대댓글 영역
──────────────────────────────────────────────────────────────────────────── */
.replies {
  margin-top: 20px;
  padding-left: 24px;
  border-left: 3px solid #c2372f;
  background: linear-gradient(
    90deg,
    rgba(194, 55, 47, 0.05) 0%,
    transparent 100%
  );
  border-radius: 0 8px 8px 0;
  padding-top: 16px;
  padding-bottom: 16px;
}

.reply {
  background: #fff;
  border-radius: 8px;
  padding: 18px;
  margin-bottom: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;
}

.reply:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.reply:last-child {
  margin-bottom: 0;
}

.reply-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f5f5f5;
}

.reply-username {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.reply-date {
  font-size: 12px;
  color: #888;
  background: #f8f8f8;
  padding: 2px 8px;
  border-radius: 12px;
}

.reply-content {
  color: #555;
  font-size: 14px;
  line-height: 1.6;
  padding: 0;
}

.comment-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
.comment-action {
  background: none;
  border: none;
  color: #c2372f;
  cursor: pointer;
  font-size: 14px;
}
.comment-edit-textarea,
.reply-edit-textarea {
  width: 100%;
  min-height: 60px;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  resize: none;
}
.comment-cancel-btn {
  background: #aaa;
  color: #fff;
  border: none;
  padding: 8px 12px;
  margin-left: 8px;
  cursor: pointer;
}
</style>
