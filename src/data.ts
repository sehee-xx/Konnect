// Top‑loved plans images
import plan1Img from "./assets/cardImg/plan1.png";
import plan2Img from "./assets/cardImg/plan2.png";
import plan3Img from "./assets/cardImg/plan3.png";
import plan4Img from "./assets/cardImg/plan4.png";

// Destination plan images
import seoul1 from "./assets/cardImg/seoul1.png";
import seoul2 from "./assets/cardImg/seoul2.png";
import seoul3 from "./assets/cardImg/seoul3.png";
import seoul4 from "./assets/cardImg/seoul4.png";

import busan1 from "./assets/cardImg/busan1.png";
import busan2 from "./assets/cardImg/busan2.png";
import busan3 from "./assets/cardImg/busan3.png";
import busan4 from "./assets/cardImg/busan4.png";

import yeosu1 from "./assets/cardImg/yeosu1.png";
import yeosu2 from "./assets/cardImg/yeosu2.png";
import yeosu3 from "./assets/cardImg/yeosu3.png";
import yeosu4 from "./assets/cardImg/yeosu4.png";

import jeju1 from "./assets/cardImg/jeju1.png";
import jeju2 from "./assets/cardImg/jeju2.png";
import jeju3 from "./assets/cardImg/jeju3.png";
import jeju4 from "./assets/cardImg/jeju4.png";

import jeonju1 from "./assets/cardImg/jeonju1.png";
import jeonju2 from "./assets/cardImg/jeonju2.png";
import jeonju3 from "./assets/cardImg/jeonju3.png";
import jeonju4 from "./assets/cardImg/jeonju4.png";

// “가장 사랑받는” 상위 4개 플랜
export const topLovedPlans = [
  {
    id: 1,
    image: plan1Img,
    title: "Seoul Mood Tour",
    location: "Seoul",
    likes: 120,
    rating: 4.9,
    price: "₩150,000",
  },
  {
    id: 2,
    image: plan2Img,
    title: "Jeju Nature Healing",
    location: "Jeju",
    likes: 98,
    rating: 4.8,
    price: "₩180,000",
  },
  {
    id: 3,
    image: plan3Img,
    title: "Busan Beach Activities",
    location: "Busan",
    likes: 85,
    rating: 4.7,
    price: "₩130,000",
  },
  {
    id: 4,
    image: plan4Img,
    title: "Jeonju Hanok Experience",
    location: "Jeonju",
    likes: 76,
    rating: 4.6,
    price: "₩110,000",
  },
];

// 카테고리 목록
export const categories = [
  { id: "attractions", name: "Attractions" },
  { id: "stays", name: "Stays" },
  { id: "restaurants", name: "Restaurants" },
  { id: "shopping", name: "Shopping" },
];

// 지역별 모든 플랜
export const destinations = [
  {
    id: "seoul",
    name: "Seoul",
    plans: [
      {
        id: "s1",
        image: seoul1,
        location: "Seoul",
        rating: 4.9,
        distance: 10,
        dateRange: "Jun 1–5",
        description: "City highlights tour",
      },
      {
        id: "s2",
        image: seoul2,
        location: "Seoul",
        rating: 4.8,
        distance: 12,
        dateRange: "Jun 6–10",
        description: "Historic palaces visit",
      },
      {
        id: "s3",
        image: seoul3,
        location: "Seoul",
        rating: 4.7,
        distance: 8,
        dateRange: "Jun 11–15",
        description: "Foodie street walk",
      },
      {
        id: "s4",
        image: seoul4,
        location: "Seoul",
        rating: 4.6,
        distance: 15,
        dateRange: "Jun 16–20",
        description: "Night markets experience",
      },
    ],
  },
  {
    id: "busan",
    name: "Busan",
    plans: [
      {
        id: "b1",
        image: busan1,
        location: "Busan",
        rating: 4.9,
        distance: 10,
        dateRange: "Jun 1–5",
        description: "City highlights tour",
      },
      {
        id: "b2",
        image: busan2,
        location: "Busan",
        rating: 4.8,
        distance: 12,
        dateRange: "Jun 6–10",
        description: "Historic palaces visit",
      },
      {
        id: "b3",
        image: busan3,
        location: "Busan",
        rating: 4.7,
        distance: 8,
        dateRange: "Jun 11–15",
        description: "Foodie street walk",
      },
      {
        id: "b4",
        image: busan4,
        location: "Busan",
        rating: 4.6,
        distance: 15,
        dateRange: "Jun 16–20",
        description: "Night markets experience",
      },
    ],
  },
  {
    id: "yeosu",
    name: "Yeosu",
    plans: [
      {
        id: "y1",
        image: yeosu1,
        location: "Yeosu",
        rating: 4.9,
        distance: 10,
        dateRange: "Jun 1–5",
        description: "City highlights tour",
      },
      {
        id: "y2",
        image: yeosu2,
        location: "Yeosu",
        rating: 4.8,
        distance: 12,
        dateRange: "Jun 6–10",
        description: "Historic palaces visit",
      },
      {
        id: "y3",
        image: yeosu3,
        location: "Yeosu",
        rating: 4.7,
        distance: 8,
        dateRange: "Jun 11–15",
        description: "Foodie street walk",
      },
      {
        id: "y4",
        image: yeosu4,
        location: "Yeosu",
        rating: 4.6,
        distance: 15,
        dateRange: "Jun 16–20",
        description: "Night markets experience",
      },
    ],
  },
  {
    id: "jeju",
    name: "Jeju",
    plans: [
      {
        id: "j1",
        image: jeju1,
        location: "Jeju",
        rating: 4.9,
        distance: 10,
        dateRange: "Jun 1–5",
        description: "City highlights tour",
      },
      {
        id: "j2",
        image: jeju2,
        location: "Jeju",
        rating: 4.8,
        distance: 12,
        dateRange: "Jun 6–10",
        description: "Historic palaces visit",
      },
      {
        id: "j3",
        image: jeju3,
        location: "Jeju",
        rating: 4.7,
        distance: 8,
        dateRange: "Jun 11–15",
        description: "Foodie street walk",
      },
      {
        id: "j4",
        image: jeju4,
        location: "Jeju",
        rating: 4.6,
        distance: 15,
        dateRange: "Jun 16–20",
        description: "Night markets experience",
      },
    ],
  },
  {
    id: "jeonju",
    name: "Jeonju",
    plans: [
      {
        id: "jeon1",
        image: jeonju1,
        location: "Jeonju",
        rating: 4.9,
        distance: 10,
        dateRange: "Jun 1–5",
        description: "City highlights tour",
      },
      {
        id: "jeon2",
        image: jeonju2,
        location: "Jeonju",
        rating: 4.8,
        distance: 12,
        dateRange: "Jun 6–10",
        description: "Historic palaces visit",
      },
      {
        id: "jeon3",
        image: jeonju3,
        location: "Jeonju",
        rating: 4.7,
        distance: 8,
        dateRange: "Jun 11–15",
        description: "Foodie street walk",
      },
      {
        id: "jeon4",
        image: jeonju4,
        location: "Jeonju",
        rating: 4.6,
        distance: 15,
        dateRange: "Jun 16–20",
        description: "Night markets experience",
      },
    ],
  },
];
