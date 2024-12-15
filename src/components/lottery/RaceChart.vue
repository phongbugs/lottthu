<template>
  <div class="race-chart">
    <h2>Race Chart Demo</h2>
    <svg width="500" height="300">
      <line
        v-for="(line, index) in lines"
        :key="index"
        :x1="line.x1"
        :y1="line.y1"
        :x2="line.x2"
        :y2="line.y2"
        stroke="black"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "RaceChart",
  data() {
    return {
      lines: [
        { x1: 50, y1: 50, x2: 450, y2: 50 },
        { x1: 50, y1: 100, x2: 450, y2: 100 },
        { x1: 50, y1: 150, x2: 450, y2: 150 },
        { x1: 50, y1: 200, x2: 450, y2: 200 },
        { x1: 50, y1: 250, x2: 450, y2: 250 },
      ],
    };
  },
};
</script>

<style scoped>
.race-chart {
  text-align: center;
}
</style>
