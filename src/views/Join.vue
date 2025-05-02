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

<style lang="scss" scoped>
$bg: #edf2f0;
$neu-1: #ecf0f3;
$neu-2: #d1d9e6;
$white: #f9f9f9;
$gray: #a0a5a8;
$dark-gray: #333;
$red: #c2372f;
$transition: 1.25s;

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}

/* Generic styles */
body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Arial", sans-serif;
  font-size: 12px;
  background-color: $bg;
  color: $gray;
}

/* Main container */
.main {
  position: relative;
  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color: $neu-1;
  box-shadow: 10px 10px 20px $neu-2, -10px -10px 20px $white;
  border-radius: 12px;
  overflow: hidden;
}

/* Form containers */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 600px;
  height: 100%;
  padding: 25px;
  background-color: $neu-1;
  transition: $transition;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &__icons {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }

  &__icon {
    width: 40px;
    height: 40px;
    margin: 0 10px;
    opacity: 0.5;
    transition: 0.15s;

    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  }

  &__span {
    margin: 15px 0;
    font-size: 12px;
    color: $gray;
  }

  &__input {
    width: 350px;
    height: 40px;
    margin: 8px 0;
    padding-left: 25px;
    font-size: 13px;
    letter-spacing: 0.15px;
    border: none;
    outline: none;
    background-color: $neu-1;
    transition: 0.25s ease;
    border-radius: 8px;
    box-shadow: inset 2px 2px 4px $neu-2, inset -2px -2px 4px $white;
    font-family: "Tenada", sans-serif;
    color: #333;
    ::placeholder {
      color: #a0a5a8;
    }

    &:focus {
      box-shadow: inset 4px 4px 4px $neu-2, inset -4px -4px 4px $white;
    }
  }

  &__link {
    margin-top: 15px;
    margin-bottom: 20px;
    color: $dark-gray;
    font-size: 12px;
    text-decoration: none;
    line-height: 2;
  }
}

.title {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: $dark-gray;
  margin-bottom: 10px;
}

.description {
  font-size: 14px;
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 20px;
  color: $dark-gray;
}

.button {
  width: 180px;
  height: 50px;
  border-radius: 10px;
  margin-top: 30px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: $red;
  color: $white;
  box-shadow: 8px 8px 16px $neu-2, -8px -8px 16px $white;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.25s;
  font-family: "Tenada", sans-serif;

  &:hover {
    transform: scale(0.97);
    box-shadow: 6px 6px 10px $neu-2, -6px -6px 10px $white;
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 4px 4px 8px $neu-2, -4px -4px 8px $white;
  }
}

/* Position containers */
.a-container {
  z-index: 100;
  left: calc(100% - 600px);
}

.b-container {
  left: calc(100% - 600px);
  z-index: 0;
}

/* Switch section styling */
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
  transition: $transition;
  background-color: $neu-1;
  overflow: hidden;
  box-shadow: 4px 4px 10px $neu-2, -4px -4px 10px $white;

  &__circle {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background-color: $neu-1;
    box-shadow: inset 8px 8px 12px $neu-2, inset -8px -8px 12px $white;
    bottom: -60%;
    left: -60%;
    transition: $transition;

    &--t {
      top: -30%;
      left: 60%;
      width: 300px;
      height: 300px;
    }
  }

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    width: 400px;
    padding: 50px 55px;
    transition: $transition;
  }

  &__button {
    cursor: pointer;

    &:hover {
      box-shadow: 6px 6px 10px $neu-2, -6px -6px 10px $white;
      transform: scale(0.985);
      transition: 0.25s;
    }

    &:active,
    &:focus {
      box-shadow: 2px 2px 6px $neu-2, -2px -2px 6px $white;
      transform: scale(0.97);
      transition: 0.25s;
    }
  }
}

/* Animation classes */
.is-txr {
  left: calc(100% - 400px);
  transition: $transition;
}

.is-txl {
  left: 0;
  transition: $transition;
}

.is-z200 {
  z-index: 200;
  transition: $transition;
}

.is-hidden {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  transition: $transition;
}

.is-gx {
  animation: is-gx $transition;
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
