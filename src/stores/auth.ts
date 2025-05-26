// src/stores/auth.ts
import { reactive } from "vue";
import axios from "axios";

interface UserInfo {
  name: string;
  email: string;
}

export const auth = reactive({
  token: "" as string,
  isLoggedIn: false as boolean,
  user: {
    name: "",
    email: "",
  } as UserInfo,

  /**
   * Initialize auth state from localStorage (called on import).
   * If a token exists, sets axios default header.
   */
  init() {
    const saved = localStorage.getItem("auth");
    if (saved) {
      try {
        const { token, user } = JSON.parse(saved);
        this.token = token;
        this.user = user;
        this.isLoggedIn = true;
        axios.defaults.headers.common["Authorization"] = `${token}`;
      } catch {
        // invalid JSON, clear it
        localStorage.removeItem("auth");
      }
    }
  },

  /**
   * Log in: save token + user info in memory, axios header, and localStorage.
   * @param userInfo	name + email from server
   * @param token		JWT string
   */
  login(userInfo: UserInfo, token: string) {
    this.token = token;
    this.user = userInfo;
    this.isLoggedIn = true;

    // set default header for future axios calls
    axios.defaults.headers.common["Authorization"] = `${token}`;

    // persist to localStorage
    localStorage.setItem(
      "auth",
      JSON.stringify({
        token,
        user: userInfo,
      })
    );
  },

  /**
   * Log out: clear memory, axios header, and localStorage.
   */
  logout() {
    this.token = "";
    this.user = { name: "", email: "" };
    this.isLoggedIn = false;

    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("auth");
  },
});

// call init right away to restore any existing session
auth.init();
