<template>
  <el-button class="btn btn-sm btn-primary w-100 justify-content-end fw-bold">
    <i
      :class="isLoading ? 'bi bi-arrow-clockwise spinner' : 'bi bi-search'"
    ></i>
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchButton",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
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
