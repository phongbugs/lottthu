<template>
  <div :class="['ball', ballColor]">
    <span class="number fs-4">{{ formattedNumber }}</span>
    <div v-tooltip :title="titleChip" class="chip pointer">
      {{ chipNumber }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject, ref } from "vue";

export default defineComponent({
  name: "BallNumber",
  props: {
    ballNumber: {
      type: Number,
      required: true,
    },
    chipNumber: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
      validator: (value: string) => ["red", "yellow"].includes(value),
    },
  },
  setup(props) {
    const drawId = inject("drawId", ref(""));
    const totalCurrentPeriods = inject("totalCurrentPeriods", ref(0));
    const indexPeriod = inject("indexPeriod", ref(0));
    const ballColor = computed(() => props.color);
    const titleChip = computed(() => {
      // return `Tại kì quay ${drawId.value} số này đã xuất hiện ${
      //   props.chipNumber
      // } lần trong ${
      //   totalCurrentPeriods.value - (indexPeriod.value - 1)
      // } kỳ quay`;
      return `Số này đã xuất hiện ${props.chipNumber} lần trong tổng ${
        totalCurrentPeriods.value - (indexPeriod.value - 1)
      } kỳ quay đang chọn kể từ kì quay ${drawId.value}`;
    });
    const formattedNumber = computed(() =>
      props.ballNumber.toString().padStart(2, "0")
    );

    return {
      drawId,
      totalCurrentPeriods,
      indexPeriod,
      ballColor,
      titleChip,
      formattedNumber,
    };
  },
});
</script>

<style scoped>
.ball {
  width: 2.8125rem;
  height: 2.8125rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  position: relative;
}

@keyframes flagWave {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.chip {
  position: absolute;
  top: -10px;
  right: -3px;
  background: red;
  color: #fff;
  padding: 0.1075rem 0.375rem;
  border-radius: 25%;
  font-size: 9px;
  animation: flagWave 1s infinite;
}

.red {
  background: radial-gradient(circle, #ff6b6b, #c0392b);
}

.yellow {
  background: radial-gradient(circle, #fdde9b, #cd8f20);
}

.pointer {
  cursor: pointer;
}

.tooltip {
  background-color: #fff !important;
}
</style>
