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
      <span class="fs-5 p-2">{{ legendPrefix }}</span>
      <span
        class="fs-5 px-2 py-0 rounded"
        :style="{
          background:
            'linear-gradient(to right, rgb(111 157 211), rgb(62 151 255))',
          color: '#fff',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        }"
      >
        #0{{ legendDrawId }}
      </span>
      <span class="fs-5 p-2">{{ legendDate }}</span>
    </legend>

    <div class="d-flex justify-content-between">
      <BallNumber
        v-for="(ball, index) in balls"
        :key="ball"
        :ball-number="ball"
        :chip-number="chips[index]"
        :is-visible-chip="index < balls.length - 1"
        :color="index === balls.length - 1 ? 'red' : 'yellow'"
      />
    </div>
  </fieldset>
</template>

<script>
import { defineComponent, computed, provide, ref } from "vue";
import BallNumber from "./BallNumber.vue";

export default defineComponent({
  name: "ListBallNumber",
  components: {
    BallNumber,
  },
  props: {
    legendPrefix: {
      type: String,
      required: true,
    },
    legendDate: {
      type: String,
      required: true,
    },
    legendDrawId: {
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
  setup(props) {
    // Reactive text color based on the user's color scheme preference
    const textColor = computed(() => {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#fff"
        : "#000";
    });

    // Reactive draw ID, provided to child components
    const drawId = ref(props.legendDrawId);
    provide("drawId", drawId);
    const indexPeriod = ref(props.index);
    provide("indexPeriod", indexPeriod);
    return {
      textColor,
      drawId,
      indexPeriod,
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
  font-size: x-small;
}
</style>
