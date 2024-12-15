import { defineStore } from "pinia";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";

export const useDrawPeriodStore = defineStore("drawPeriodStore", {
  state: () => ({
    selectedQuantity: 5, // Giá trị mặc định
    results: [] as any[], // Kết quả trả về từ API
    isLoading: false,
  }),
  actions: {
    async fetchResults() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.POWER655.GET_LAST_RESULT(this.selectedQuantity)}`
        );
        this.results = response.data;
      } catch (error) {
        console.error("Error fetching results:", error);
        this.results = [];
      } finally {
        this.isLoading = false;
      }
    },
    setSelectedQuantity(quantity: number) {
      this.selectedQuantity = quantity;
    },
  },
});
