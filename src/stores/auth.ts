// stores/auth.ts
import { reactive } from "vue";

export const auth = reactive({
  isLoggedIn: false,
  // user 객체엔 nickname, email만 담습니다
  user: {
    name: "",
    email: "",
  },
  login(userInfo: { name: string; email: string }) {
    this.isLoggedIn = true;
    this.user = userInfo;
  },
  logout() {
    this.isLoggedIn = false;
    this.user = { name: "", email: "" };
  },
});
