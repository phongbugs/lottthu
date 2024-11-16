<template>
  <el-button
    @click="handleFetchResults"
    class="btn btn-sm btn-primary w-100 justify-content-end fw-bold"
  >
    <i
      :class="isLoading ? 'bi bi-arrow-clockwise spinner' : 'bi bi-search'"
    ></i>
  </el-button>
</template>

<script lang="ts">
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SearchButton",
  emits: ["search-results"], // Declare the custom event
  setup(_, { emit }) {
    const isLoading = ref(false);

    async function fetchResults(quantity: number) {
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.POWER655.GET_LAST_RESULT(quantity)}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching results:", error);
        return [];
      }
    }

    const handleFetchResults = async () => {
      isLoading.value = true;
      try {
        const results = await fetchResults(10); // Pass the quantity as needed
        emit("search-results", results);
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      handleFetchResults,
    };
  },
});
</script>

<style scoped>
.spinner {
  animation: spin 1s linear infinite; /* Xoay liên tục */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
