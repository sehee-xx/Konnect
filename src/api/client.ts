// src/api/client.ts
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // 필요시 켜두세요
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
export { API_BASE };
