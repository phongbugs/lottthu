<template>
  <fieldset
    class="border border-1 border-secondary rounded-1 p-5 m-1"
    style="background-color: transparent"
  >
    <legend
      class="float-none w-auto rounded-1 border border-1 border-secondary p-1 d-flex justify-content-between align-items-center"
      :style="{ 'background-color': 'transparent', color: textColor }"
    >
      <span class="circle p-1">{{ index.toString() }}</span>
      <span class="fs-5 p-2">{{ legend }}</span>
    </legend>

    <div class="d-flex justify-content-between">
      <BallNumber
        v-for="(ball, index) in balls"
        :key="ball"
        :ball-number="ball"
        :chip-number="chips[index]"
        :color="index === balls.length - 1 ? 'red' : 'yellow'"
      />
    </div>
  </fieldset>
</template>
<script>
import { defineComponent, computed } from "vue";
import BallNumber from "./BallNumber.vue";
export default defineComponent({
  name: "ListBallNumber",
  components: {
    BallNumber,
  },
  props: {
    legend: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    balls: {
      type: Array,
      required: true,
    },
    chips: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const textColor = computed(() => {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#fff"
        : "#000";
    });
    return {
      textColor,
    };
  },
});
</script>
<style scoped>
.circle {
  width: 1.8125rem;
  height: 1.8125rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  position: relative;
  background-color: rgb(62 151 255);
  float: left;
  font-size: small;
}
</style>
