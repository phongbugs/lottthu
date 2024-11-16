// src/config/api.ts

import type Power655 from "@/components/lottery/Power655.vue";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.example.com";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    LOGOUT: `${BASE_URL}/auth/logout`,
  },
  USER: {
    GET_PROFILE: `${BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${BASE_URL}/user/update`,
  },
  POWER655: {
    GET_LAST_RESULT: (quantity: number) =>
      `${BASE_URL}/power655/results/last/${quantity}`,
    GET_RANGE_RESULT: (from: String, to: String) =>
      `${BASE_URL}/power655/results/last${from}/${to}`,
    CREATE: `${BASE_URL}/posts/create`,
    DELETE: (id: number) => `${BASE_URL}/posts/${id}`,
  },
};

export default API_ENDPOINTS;
