// src/stores/userPlans.js
import { defineStore } from "pinia";
import axios from "axios";

export const useUserPlans = defineStore("userPlans", {
  state: () => ({
    plans: [],
  }),
  actions: {
    async loadPlans() {
      // 서버에서 전체 플랜 목록 불러오기
      const res = await axios.get("/api/v1/user/diaries");
      this.plans = res.data;
    },
    async fetchDraft(id) {
      // 단일 draft 불러올 때
      const res = await axios.get(`/api/v1/user/diaries/draft/${id}`);
      return res.data;
    },
    // ... 필요하다면 다른 액션들도 추가
  },
});

// **named export** 로도 쓸 수 있게 (선택)
export const loadPlans = async () => {
  const store = useUserPlans();
  await store.loadPlans();
};
