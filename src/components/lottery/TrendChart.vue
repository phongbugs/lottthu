<template>
  <div class="trend-chart">
    <h3 class="text-center">
      Tầng xuất các số đã trúng trong lịch sử đang chọn, được sắp xếp giảm dần
    </h3>
    <div class="row d-flex justify-content-center">
      <div class="col-12 col-xxl-3 col-sm-12">
        <BallNumber
          class="m-3 d-flex"
          style="float: left"
          v-for="(ball, index) in ballNumberWins"
          :key="ball"
          :ball-number="ball"
          :chip-number="chips[index]"
          :color="index === ballNumberWins.length - 1 ? 'red' : 'yellow'"
          :is-stat-title="true"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BallNumber from "./BallNumber.vue";
export default defineComponent({
  name: "TrendChart",
  components: {
    BallNumber,
  },
  data() {
    return {
      ballNumberWins: [
        10, 15, 8, 23, 5, 12, 18, 7, 14, 9, 11, 6, 20, 13, 17, 4, 19, 3, 16, 2,
        21, 1, 22, 0, 25, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
        38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
      ] as number[],
      chips: [
        10, 15, 8, 23, 5, 12, 18, 7, 14, 9, 11, 6, 20, 13, 17, 4, 19, 3, 16, 2,
        21, 1, 22, 0, 25, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
        38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
      ],
    };
  },
});
</script>

<style scoped>
.trend-chart {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100vh;
}
</style>
