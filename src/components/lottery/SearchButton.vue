<template>
  <el-button
    @click="store.fetchResults"
    class="btn btn-sm btn-primary w-100 justify-content-end fw-bold"
  >
    <i
      :class="
        store.isLoading ? 'bi bi-arrow-clockwise spinner' : 'bi bi-search'
      "
    ></i>
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useDrawPeriodStore } from "@/stores/drawPeriodStore";

export default defineComponent({
  name: "SearchButton",
  setup() {
    const store = useDrawPeriodStore();

    return {
      store,
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
