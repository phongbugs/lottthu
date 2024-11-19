<template>
  <fieldset
    class="border rounded-1 p-5 m-1"
    style="background-color: rgb(145 140 124)"
  >
    <legend
      class="float-none w-auto rounded-1"
      style="background-color: #959595"
    >
      <span class="fs-5 p-2" style="color: white">{{ legend }}</span>
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
