import { createI18n } from "vue-i18n";

const messages = {
  en: {
    landing1: {
      Title: "KONNECT:\nKorea and Travelers Meet",
      Button: "Join & Discover",
      SubTitle:
        "Discover Korea’s hidden gems, cozy retreats,\nand authentic local life",
      Card1Title: "Top\nAttractions",
      Card1Content1: "Discover Korea’s must-see landmarks",
      Card2Title: "Cozy\nStays",
      Card2Content1: "Find charming hotels & guesthouses",
      Card3Title: "Local\nEvents",
      Card3Content1: "Explore festivals, markets & more",
    },
    landing2: {
      Seoul: "Seoul",
      Busan: "Busan",
      Jeju: "Jeju",
      Yeosu: "Yeosu",
      Jeonju: "Jeonju",
      Title: "Top Picks for Destinations",
      SubTitle:
        "Explore Seoul’s skyline, Jeju’s shores, Busan’s coast, Yeosu’s islands,\nand Jeonju’s heritage—all at a glance",
      Button: "Start Your Journey",
    },
    landing3: {
      Title: "KONNECT:\nYour Gateway to Korea",
      SubTitle:
        "From coastal escapes to city adventures—plan, connect, explore",
      TravelersNum: "986K+",
      Travelers: "Travelers",
      TripsPlansNum: "256B+",
      TripsPlans: "Trips Planned",
      Button: "Start Konnecting",
    },
    join: {
      createAccount: "Create Account",
      orUseEmail: "or use email for registration",
      name: "Name",
      email: "Email",
      password: "Password",
      signUp: "SIGN UP",
      signInTitle: "Sign in to Website",
      orUseEmailAccount: "or use your email account",
      forgotPassword: "Forgot your password?",
      signIn: "SIGN IN",
      welcomeBack: "Welcome Back !",
      keepConnected:
        "To keep connected with us\nplease login with your personal info",
      helloFriend: "Hello Friend!",
      enterDetails: "Enter your personal details\nand start journey with us",
    },
  },
  ko: {
    landing1: {
      Title: "코넥트:\n한국과 여행자를\n잇는 다리",
      SubTitle: "숨겨진 명소, 아늑한 숙소, 그리고 진짜 현지 문화를 만나세요",
      Button: "지금 둘러보기",
      Card1Title: "핵심\n명소",
      Card1Content1: "놓치지 말아야 할 한국 대표\n관광지",
      Card2Title: "아늑한\n숙소",
      Card2Content1: "감성 가득 호텔·게스트하우스 추천",
      Card3Title: "지역별\n행사",
      Card3Content1: "축제·마켓 등\n다채로운\n현장 체험",
    },
    landing2: {
      Seoul: "서울",
      Busan: "부산",
      Jeju: "제주",
      Yeosu: "여수",
      Jeonju: "전주",
      Title: "코넥트가 추천하는 여행지",
      SubTitle:
        "서울의 스카이라인, 제주 바다, 부산 해안, 여수 섬, 전주 한옥까지 모두 한 번에 만나보세요",
      Button: "가입하고 둘러보기",
    },
    landing3: {
      Title: "코넥트:\n한국을 여는 당신의 관문",
      SubTitle:
        "해안의 여유부터 도심의 활기까지—계획하고, 연결하고, 탐험하세요",
      TravelersNum: "986K+",
      Travelers: "여행자 수",
      TripsPlansNum: "256B+",
      TripsPlans: "계획된 여행",
      Button: "코넥트 시작하기",
    },
    join: {
      createAccount: "계정 생성",
      orUseEmail: "이메일로 가입하기",
      name: "이름",
      email: "이메일",
      password: "비밀번호",
      signUp: "가입하기",
      signInTitle: "로그인",
      orUseEmailAccount: "이메일로 로그인",
      forgotPassword: "비밀번호를 잊으셨나요?",
      signIn: "로그인",
      welcomeBack: "다시 만나 반가워요!",
      keepConnected: "계속 이용하려면 개인 정보를 입력해 로그인하세요",
      helloFriend: "환영합니다!",
      enterDetails: "회원 정보를 입력하고 시작하세요",
    },
  },
};

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
});
