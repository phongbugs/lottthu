<template>
  <div :class="['ball', ballColor]">
    <span class="number fs-4">{{ formattedNumber }}</span>
    <div v-if="isVisibleChip" v-tooltip :title="titleChip" class="chip pointer">
      {{ chipNumber }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject, ref } from "vue";
import { useLotteryStore } from "@/stores/lottery";

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
    isStatTitle: {
      type: Boolean,
      default: false,
    },
    isVisibleChip: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const drawId = inject("drawId", ref(""));
    const lotteryStore = useLotteryStore();
    const totalCurrentPeriods = computed(
      () => lotteryStore.totalCurrentPeriods
    );
    const indexPeriod = inject("indexPeriod", ref(0));
    const ballColor = computed(() => props.color);
    const titleChip = computed(() => {
      return !props.isStatTitle
        ? `Đã xuất hiện ${props.chipNumber} lần trong ${
            totalCurrentPeriods.value - (indexPeriod.value - 1)
          } kỳ quay gần nhất (#0${drawId.value} -> #0${
            +drawId.value - (totalCurrentPeriods.value - indexPeriod.value)
          })`
        : `Đã xuất hiện ${props.chipNumber} lần`;
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
