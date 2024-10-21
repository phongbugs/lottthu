<template>
  <fieldset class="border rounded-2 p-5">
    <legend class="float-none w-auto">
      <span class="fw-bold fs-5">{{ legend }}</span>
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
import { defineComponent } from "vue";
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
    balls: {
      type: Array,
      required: true,
    },
    chips: {
      type: Array,
      required: true,
    },
  },
});
</script>
