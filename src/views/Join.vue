<template>
  <div class="main">
    <!-- Sign-Up Form -->
    <div
      id="a-container"
      class="container a-container"
      :class="{ 'is-txl': toggled }"
    >
      <form @submit.prevent class="form" id="a-form">
        <h2 class="title">{{ $t("join.createAccount") }}</h2>
        <div class="form__icons">
          <img
            class="form__icon"
            src="../assets/login-google.png"
            alt="Google"
          />
          <img class="form__icon" src="../assets/login-kakao.png" alt="Kakao" />
          <img class="form__icon" src="../assets/login-naver.png" alt="Naver" />
        </div>
        <span class="form__span">{{ $t("join.orUseEmail") }}</span>
        <input class="form__input" type="text" :placeholder="$t('join.name')" />
        <input
          class="form__input"
          type="text"
          :placeholder="$t('join.email')"
        />
        <input
          class="form__input"
          type="password"
          :placeholder="$t('join.password')"
        />
        <button type="submit" class="form__button button">
          {{ $t("join.signUp") }}
        </button>
      </form>
    </div>

    <!-- Sign-In Form -->
    <div
      id="b-container"
      class="container b-container"
      :class="[{ 'is-txl': toggled }, { 'is-z200': toggled }]"
    >
      <form @submit.prevent class="form" id="b-form">
        <h2 class="title">{{ $t("join.signInTitle") }}</h2>
        <div class="form__icons">
          <img
            class="form__icon"
            src="../assets/login-google.png"
            alt="Google"
          />
          <img class="form__icon" src="../assets/login-kakao.png" alt="Kakao" />
          <img class="form__icon" src="../assets/login-naver.png" alt="Naver" />
        </div>
        <span class="form__span">{{ $t("join.orUseEmailAccount") }}</span>
        <input
          class="form__input"
          type="text"
          :placeholder="$t('join.email')"
        />
        <input
          class="form__input"
          type="password"
          :placeholder="$t('join.password')"
        />
        <a href="#" class="form__link">{{ $t("join.forgotPassword") }}</a>
        <button type="submit" class="form__button button">
          {{ $t("join.signIn") }}
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
        <h2 class="switch__title title">{{ $t("join.welcomeBack") }}</h2>
        <p class="switch__description description">
          {{ $t("join.keepConnected") }}
        </p>
        <button @click="handleSwitch" class="switch__button button">
          {{ $t("join.signIn") }}
        </button>
      </div>

      <div
        id="switch-c2"
        class="switch__container"
        :class="{ 'is-hidden': !toggled }"
      >
        <h2 class="switch__title title">{{ $t("join.helloFriend") }}</h2>
        <p class="switch__description description">
          {{ $t("join.enterDetails") }}
        </p>
        <button @click="handleSwitch" class="switch__button button">
          {{ $t("join.signUp") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      toggled: false,
      animating: false,
    };
  },
  methods: {
    handleSwitch() {
      // Toggle animation class
      this.animating = true;
      setTimeout(() => (this.animating = false), 1500);
      // Toggle form
      this.toggled = !this.toggled;
    },
  },
};
</script>

<style scoped>
/* reset */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}

/* body */
body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans‑serif;
  font-size: 12px;
  background-color: #edf2f0;
  color: #a0a5a8;
}

/* main container */
.main {
  position: relative;
  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 20px #d1d9e6, -10px -10px 20px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
}

/* form panels */
.container {
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
  font-family: "Tenada", sans‑serif;
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
  font-family: "Tenada", sans‑serif;
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
  transition: 0.25s;
}
.switch__button:active,
.switch__button:focus {
  box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
  transform: scale(0.97);
  transition: 0.25s;
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
