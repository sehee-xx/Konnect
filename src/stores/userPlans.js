// src/stores/userPlans.js

import { reactive } from "vue";
import jeju1 from "../assets/cardImg/jeju1.png";
import jeju2 from "../assets/cardImg/jeju2.png";
import jeju3 from "../assets/cardImg/jeju3.png";

export const userPlans = reactive({
  plans: [
    {
      id: 1,
      title: "제주도 일주",
      dateRange: "2025-05-01 ~ 2025-05-05",
      status: "ongoing", // 진행 중
      thumbnailUrl: jeju1, // require() 대신 import
    },
    {
      id: 2,
      title: "서울 맛집 탐방",
      dateRange: "2025-05-10 ~ 2025-05-12",
      status: "ongoing",
      thumbnailUrl: jeju2,
    },
    {
      id: 3,
      title: "부산 해운대 여행",
      dateRange: "2025-04-20 ~ 2025-04-22",
      status: "completed", // 완료
      thumbnailUrl: jeju3,
    },
  ],

  // 실제 API 연동 시 onMounted()에서 호출하세요.
  async fetch() {
    // const { data } = await axios.get('/api/user/plans')
    // this.plans = data
  },
});
