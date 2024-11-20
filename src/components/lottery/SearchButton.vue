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
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "SearchButton",
  emits: ["search-results"],
  props: {
    quantity: {
      type: Number,
      default: 5,
    },
  },
  setup(props, { emit }) {
    const isLoading = ref(false);

    // Function to fetch results
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

    // Trigger search when quantity changes
    watch(
      () => props.quantity,
      async (newQuantity) => {
        console.log("Quantity changed to:", newQuantity);
        await handleFetchResults();
      }
    );

    // Handle fetch results and emit
    const handleFetchResults = async () => {
      isLoading.value = true;
      //emit("click", isLoading);
      try {
        const results = await fetchResults(props.quantity);
        emit("search-results", results); // Emit results to parent
      } catch (error) {
        console.error("Error in handleFetchResults:", error);
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
  animation: spin 1s linear infinite;
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
