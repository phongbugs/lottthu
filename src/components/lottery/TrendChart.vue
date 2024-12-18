<template>
  <div class="trend-chart">
    <!-- <h3 class="text-center">
      Tầng xuất các số đã trúng trong lịch sử đang chọn, được sắp xếp giảm dần
    </h3> -->
    <div class="row d-flex justify-content-center">
      <div class="col-12 col-xxl-3 col-sm-12">
        <BallNumber
          class="m-4 d-flex"
          style="float: left"
          v-for="(number, index) in wnStat.wns"
          :key="index"
          :ball-number="number"
          :chip-number="wnStat.counts[index]"
          color="yellow"
          :is-stat-title="true"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BallNumber from "./BallNumber.vue";
import { useLotteryStore } from "@/stores/lottery";
export default defineComponent({
  name: "TrendChart",
  components: {
    BallNumber,
  },
  setup() {
    const lotteryStore = useLotteryStore();
    const wnStat = lotteryStore.getWinNumberStat;
    return {
      wnStat,
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
