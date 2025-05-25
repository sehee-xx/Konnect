// src/stores/userPlans.js
import { defineStore } from "pinia";
import axios from "axios";

export const useUserPlans = defineStore("userPlans", {
  state: () => ({
    plans: [],
    loading: false,
    error: null,
  }),

  getters: {
    // 진행 중: editing
    editingPlans: (state) => state.plans.filter((p) => p.status === "editing"),
    // 완료: published
    publishedPlans: (state) =>
      state.plans.filter((p) => p.status === "published"),
  },

  actions: {
    // 1) 백엔드 기본 다이어리 조회 (기본 필터는 백엔드가 결정)
    async loadAllPlans() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get("/api/v1/user/diaries");
        this.plans = res.data;
      } catch (err) {
        this.error = err.message;
        console.error("Failed to load all plans:", err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // 2) 특정 상태의 다이어리만 조회 (여기서는 editing + published)
    async loadPlans(statusList = ["editing", "published"]) {
      this.loading = true;
      this.error = null;
      try {
        const params = statusList.map((s) => `status=${s}`).join("&");
        const res = await axios.get(`/api/v1/user/diaries?${params}`);
        this.plans = res.data;
      } catch (err) {
        this.error = err.message;
        console.error("Failed to load plans by status:", err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // 3) 다이어리 상태를 published로 변경
    async publishDiary(diaryId) {
      this.loading = true;
      this.error = null;
      try {
        // 1) 상세 플랜 가져오기
        const { data: plan } = await axios.get(
          `/api/v1/user/diaries/${diaryId}`
        );

        // 2) 공통 payload 준비
        const base = {
          diaryId,
          title: plan.title,
          content: plan.content,
          areaId: plan.area?.id,
          startDate: plan.startDate,
          endDate: plan.endDate,
          status: "published",
          routes: plan.routes,
          tags: Array.isArray(plan.tags)
            ? plan.tags
                .map((t) => t.tagId ?? t.id)
                .filter((id) => Number.isInteger(id))
            : [],
          thumbnail: plan.thumbnail || null,
          images: Array.isArray(plan.images) ? plan.images : [],
        };

        // 3) FormData 생성
        const fd = new FormData();
        fd.append(
          "data",
          new Blob([JSON.stringify(base)], { type: "application/json" })
        );

        // 4) 썸네일 처리 — 오직 plan.thumbnail 만 사용
        if (plan.thumbnail instanceof File) {
          // 새로 File 이면 multipart 파일 파트로
          fd.append("thumbnail", plan.thumbnail);
        } else if (typeof plan.thumbnail === "string") {
          // 기존 URL 이면 JSON에 thumbnailUrl 추가
          const withUrl = { ...base, thumbnail: plan.thumbnail };
          fd.set(
            "data",
            new Blob([JSON.stringify(withUrl)], { type: "application/json" })
          );
        }

        // 5) 요청 전송 (헤더 지정 없이)
        await axios.post(`/api/v1/user/diaries/${diaryId}`, fd);

        // 6) 목록 갱신
        await this.loadPlans();
      } catch (err) {
        console.error("publishDiary failed:", err);
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // 4) 단일 다이어리 조회
    async loadPlan(diaryId) {
      try {
        const res = await axios.get(`/api/v1/user/diaries/${diaryId}`);
        return res.data;
      } catch (err) {
        this.error = err.message;
        console.error("Failed to load plan:", err);
        throw err;
      }
    },

    // 5) 다이어리 생성
    async createPlan(formData) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.post("/api/v1/user/diaries", formData);
        // 생성 후에도 editing+published 로 갱신
        await this.loadPlans();
        return res.data;
      } catch (err) {
        this.error = err.message;
        console.error("Failed to create plan:", err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // 6) 다이어리 업데이트
    async updatePlan(diaryId, planData) {
      try {
        const fd = new FormData();
        fd.append(
          "data",
          new Blob([JSON.stringify(planData)], { type: "application/json" })
        );
        // 2) 파일(썸네일 / 이미지)이 있으면 append
        if (planData.thumbnail instanceof File) {
          fd.append("thumbnail", planData.thumbnail);
        }
        if (Array.isArray(planData.images)) {
          planData.images.forEach((f) => {
            if (f instanceof File) fd.append("images", f);
          });
        }
        // 3) multipart/form-data 로 전송
        const res = await axios.post(`/api/v1/user/diaries/${diaryId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        await this.loadAllPlans();
        return res.data;
      } catch (error) {
        this.error = error.message;
        console.error("Failed to update plan:", error);
        throw error;
      }
    },

    // 7) 다이어리 삭제
    async deletePlan(diaryId) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`/api/v1/user/diaries/${diaryId}`);
        await this.loadPlans();
      } catch (err) {
        this.error = err.message;
        console.error("Failed to delete plan:", err);
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});

// 편의용 래퍼
export const loadPlans = async (statusList) => {
  const store = useUserPlans();
  await store.loadPlans(statusList);
};
