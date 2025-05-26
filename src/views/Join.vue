<template>
  <div class="join-wrapper">
    <div class="main">
      <!-- Sign-In Form -->
      <div
        id="b-container"
        class="panel-container b-container"
        :class="[{ 'is-txl': toggled }, { 'is-z200': toggled }]"
      >
        <form @submit.prevent="handleLogin" class="form" id="b-form">
          <h2 class="title">{{ t("join.signInTitle") }}</h2>
          <div class="form__icons">
            <img
              class="form__icon"
              src="../assets/login-kakao.png"
              alt="Kakao"
              @click="socialLogin('kakao')"
            />
             <img
              class="form__icon"
              src="../assets/login-google.png"
              alt="Google"
              @click="socialLogin('google')"
            />
            <img
              class="form__icon"
              src="../assets/login-naver.png"
              alt="Naver"
              @click="socialLogin('naver')"
            />
          </div>
          <span class="form__span">{{ t("join.orUseEmailAccount") }}</span>
          <input
            v-model="loginEmail"
            class="form__input"
            type="text"
            :placeholder="t('join.email')"
          />
          <input
            v-model="loginPassword"
            class="form__input"
            type="password"
            :placeholder="t('join.password')"
          />
          <a href="#" class="form__link">{{ t("join.forgotPassword") }}</a>
          <button type="submit" class="form__button button">
            {{ t("join.signIn") }}
          </button>
        </form>
      </div>

      <!-- Sign-Up Form -->
      <div
        id="a-container"
        class="panel-container a-container"
        :class="{ 'is-txl': toggled }"
      >
        <form @submit.prevent="handleSignUp" class="form" id="a-form">
          <h2 class="title">{{ t("join.createAccount") }}</h2>
          <span class="form__span">{{ t("join.orUseEmail") }}</span>
          <input
            v-model="signUpName"
            class="form__input"
            type="text"
            :placeholder="t('join.name')"
          />
          <input
            v-model="signUpEmail"
            class="form__input"
            type="text"
            :placeholder="t('join.email')"
          />
          <input
            v-model="signUpPassword"
            class="form__input"
            type="password"
            :placeholder="t('join.password')"
          />
          <button type="submit" class="form__button button">
            {{ t("join.signUp") }}
          </button>
        </form>
      </div>

      <!-- Switch Panel -->
      <div
        id="switch-cnt"
        class="switch"
        :class="{ 'is-gx': animating, 'is-txr': toggled }"
      >
        <div class="switch__circle"></div>
        <div class="switch__circle switch__circle--t"></div>
        <div
          id="switch-c1"
          class="switch__container"
          :class="{ 'is-hidden': toggled }"
        >
          <h2 class="switch__title title">{{ t("join.welcomeBack") }}</h2>
          <p class="switch__description description">
            {{ t("join.keepConnected") }}
          </p>
          <button @click="handleSwitch" class="switch__button button">
            {{ t("join.signIn") }}
          </button>
        </div>
        <div
          id="switch-c2"
          class="switch__container"
          :class="{ 'is-hidden': !toggled }"
        >
          <h2 class="switch__title title">{{ t("join.helloFriend") }}</h2>
          <p class="switch__description description">
            {{ t("join.enterDetails") }}
          </p>
          <button @click="handleSwitch" class="switch__button button">
            {{ t("join.signUp") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import client from "../api/client";
import { useRouter } from "vue-router";
import { auth } from "../stores/auth";

const { t } = useI18n();
const toggled = ref(true);
const animating = ref(false);
const router = useRouter();
const emit = defineEmits(["login"]);

// Sign-in form data
const loginEmail = ref("");
const loginPassword = ref("");

// Sign-up form data
const signUpName = ref("");
const signUpEmail = ref("");
const signUpPassword = ref("");

function handleSwitch() {
  animating.value = true;
  setTimeout(() => (animating.value = false), 1500);
  toggled.value = !toggled.value;
}

// 1) Social Login
function socialLogin(provider) {
  window.location.href = `http://20.200.137.41:8080/oauth2/authorization/${provider}`;
}

// 2) Email/Password Login
async function handleLogin() {
  try {
    // 1) 서버에 로그인 요청
    const res = await client.post("/api/v1/all/auth/login", {
      email: loginEmail.value,
      password: loginPassword.value,
    });

    // 2) 응답 헤더에서 Authorization 꺼내기
    let headerToken =
      res.headers.authorization || res.headers["Authorization"] || "";

    if (!headerToken) {
      throw new Error("서버가 Authorization 헤더를 보내지 않았습니다.");
    }

    // // 만약 'Bearer ' 접두사가 없다면 붙여 주기
    // if (!/^Bearer /i.test(headerToken)) {
    //   headerToken = `Bearer ${headerToken}`;
    // }

    // 3) body 에서 user 정보 꺼내기
    const payload = res.data.data ?? res.data;
    const userInfo = {
      name: payload.user?.username ?? payload.username,
      email: payload.user?.email ?? payload.email,
    };

    // (디버깅) 실제로 끌어온 토큰 & user 정보
    console.log("🚀 headerToken:", headerToken);
    console.log("🚀 userInfo:", userInfo);

    // 4) 스토어에 로그인 처리 (token + user 저장, localStorage.setItem, axios 기본 헤더 세팅까지)
    auth.login(userInfo, headerToken);

    // 5) client 인스턴스에도 헤더 붙여 두기 (auth.ts 에서는 글로벌 axios 에만 붙이므로)
    client.defaults.headers.common["Authorization"] = headerToken;

    // 6) 로그인 성공 후 페이지 이동
    router.push("/List");
  } catch (err) {
    console.error("Login failed:", err);
    await Swal.fire({
      icon: "error",
      title: "로그인 실패",
      text: "아이디/비밀번호를 확인하고 다시 시도해주세요.",
    });
  }
}

// 3) Email/Password Sign-Up
async function handleSignUp() {
  try {
    await client.post("/api/v1/all/auth/signup", {
      username: signUpName.value,
      email: signUpEmail.value,
      password: signUpPassword.value,
    });
    await Swal.fire({
      icon: "success",
      title: "Signup Successful",
      text: "Your account has been created. Please sign in.",
    });
    toggled.value = true;
  } catch (err) {
    console.error("Signup failed:", err);
    await Swal.fire({
      icon: "error",
      title: "Signup Failed",
      text: "Unable to create account. Please try again later.",
    });
  }
}
</script>

<style scoped>
@font-face {
  font-family: "Tenada";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Tenada.woff2")
    format("woff2");
}

*,
*::before,
*::after {
  padding: 0;
  box-sizing: border-box;
  user-select: none;
  font-family: "Tenada", sans-serif;
  white-space: pre-line;
}

body {
  margin: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #edf2f0;
  color: #a0a5a8;
  font-size: 12px;
}

/* main container */
.main {
  position: relative;
  width: 1000px;
  height: 600px;
  padding: 25px;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 20px #d1d9e6, -10px -10px 20px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
}

/* form panels */
.panel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 600px;
  height: 100%;
  padding: 25px;
  background-color: #ecf0f3;
  transition: 1.25s;
}

.a-container {
  z-index: 100;
  left: calc(100% - 600px);
}

.b-container {
  left: calc(100% - 600px);
  z-index: 0;
}

/* form elements */
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.form__icons {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.form__icon {
  width: 40px;
  height: 40px;
  margin: 0 10px;
  opacity: 0.5;
  transition: 0.15s;
}
.form__icon:hover {
  opacity: 1;
  cursor: pointer;
}

.form__span {
  margin: 15px 0;
  font-size: 12px;
  color: #a0a5a8;
}

.form__input {
  width: 350px;
  height: 40px;
  margin: 8px 0;
  padding-left: 25px;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
  color: #333;
}
.form__input::placeholder {
  color: #a0a5a8;
}
.form__input:focus {
  box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}

.form__link {
  margin: 15px 0 20px;
  color: #333;
  font-size: 12px;
  text-decoration: none;
  line-height: 2;
}

/* titles & descriptions */
.title {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: #333;
  margin-bottom: 10px;
}

.description {
  font-size: 14px;
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #333;
}

/* buttons */
.button {
  width: 180px;
  height: 50px;
  border-radius: 10px;
  margin-top: 30px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: #c2372f;
  color: #f9f9f9;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.25s;
}
.button:hover {
  transform: scale(0.97);
  box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
}
.button:active {
  transform: scale(0.95);
  box-shadow: 4px 4px 8px #d1d9e6, -4px -4px 8px #f9f9f9;
}

/* switch panel */
.switch {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 400px;
  padding: 50px;
  z-index: 200;
  transition: 1.25s;
  background-color: #ecf0f3;
  overflow: hidden;
  box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9;
}

.switch__circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: #ecf0f3;
  box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
  bottom: -60%;
  left: -60%;
  transition: 1.25s;
}
.switch__circle--t {
  top: -30%;
  left: 60%;
  width: 300px;
  height: 300px;
}

.switch__container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 400px;
  padding: 50px 55px;
  transition: 1.25s;
}

.switch__button:hover {
  box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
  transform: scale(0.985);
}
.switch__button:active,
.switch__button:focus {
  box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
  transform: scale(0.97);
}

/* state classes */
.is-txr {
  left: calc(100% - 400px);
  transition: 1.25s;
}
.is-txl {
  left: 0;
  transition: 1.25s;
}
.is-z200 {
  z-index: 200;
  transition: 1.25s;
}
.is-hidden {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  transition: 1.25s;
}
.is-gx {
  animation: is-gx 1.25s;
}

@keyframes is-gx {
  0%,
  10%,
  100% {
    width: 400px;
  }
  30%,
  50% {
    width: 500px;
  }
}
</style>
