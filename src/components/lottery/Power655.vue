<template>
  <div class="w-100">
    <h1>{{ msg }}</h1>
    <div class="row m-1">
      <div class="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-4 col-xxl-3 my-1">
        <div class="input-group input-group-sm" style="min-width: 313px">
          <span class="input-group-text fw-bold fs-7">
            {{ t("historyDrawOption") }}</span
          >
          <div
            class="form-check form-check-custom form-check-solid fw-semibold fs-6 flex-grow-1 boxrd"
          >
            <input
              id="btnIntYes"
              type="radio"
              name="Int"
              value="btnIntYes"
              :checked="isPeriodSelected"
              class="form-check-input"
              @click="toggleSelection(true)"
            /><label class="fs-7" for="btnIntYes"
              >&nbsp;&nbsp;{{ t("historyDrawByPeriod") }}</label
            >
            &nbsp;&nbsp;&nbsp;
            <input
              id="btnIntNo"
              type="radio"
              name="Int"
              value="btnIntNo"
              :checked="!isPeriodSelected"
              class="form-check-input"
              @click="toggleSelection(false)"
            /><label class="fs-7" for="btnIntNo"
              >&nbsp;&nbsp;{{ t("historyDrawByDate") }}</label
            >
          </div>
        </div>
      </div>
      <div
        v-if="!isPeriodSelected"
        class="col-10 col-sm-11 col-md-5 col-lg-4 col-xl-3 col-xxl-2 my-1 d-flex align-items-center"
      >
        <DateRangePicker v-model:parentValue="selectedDate" />
      </div>
      <div
        v-else
        class="col-10 col-sm-11 col-md-5 col-lg-4 col-xl-3 col-xxl-2 my-1 d-flex align-items-center"
      >
        <DrawPeriodSelect
          @update:drawPeriodValue="updateDrawPeriodValue"
        ></DrawPeriodSelect>
      </div>
      <div class="col-2 col-sm-1 col-md-1 col-lg-1 col-xl-1 my-1">
        <SearchButton
          id="search-button"
          @search-results="updateListBalls"
          :quantity="drawPeriodValue"
          :isLoading="isLoading"
          @click="isLoading = true"
        />
      </div>
    </div>
    <!-- Loading Mask -->
    <div v-if="isLoading" class="loading-mask">
      <div class="spinner"></div>
    </div>
    <div class="row m-1 d-flex">
      <div class="col-12 col-md-6 col-lg-4 my-1">
        <ListBallNumber
          v-for="(result, index) in listBalls"
          :key="index"
          class="my-1"
          :legend="`[${(index + 1).toString().padStart(2, '0')}] ${t(
            'legendDrawId'
          )} #${result.drawId} ${t('legendDrawDate')} ${result.date}`"
          :balls="result.balls"
          :chips="result.chips"
        ></ListBallNumber>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface Ball {
  drawId: number;
  date: string;
  balls: number[];
  chips: number[];
}
import { defineComponent, ref } from "vue";
import DateRangePicker from "./DateRangePicker.vue";
import DrawPeriodSelect from "./DrawPeriodSelect.vue";
import ListBallNumber from "./ListBallNumber.vue";
import SearchButton from "./SearchButton.vue";
import { t } from "@/core/helpers/i18n";

export default defineComponent({
  name: "Power-655",
  components: {
    DateRangePicker,
    ListBallNumber,
    DrawPeriodSelect,
    SearchButton,
  },
  props: {
    msg: String,
  },
  setup() {
    const isLoading = ref(false);
    const isPeriodSelected = ref(true);
    const drawPeriodValue = ref(5);
    const listBalls = ref<Ball[]>([]);
    const selectedDate = ref([new Date(), new Date()]);

    function toggleSelection(isPeriod: boolean) {
      isPeriodSelected.value = isPeriod;
    }

    function updateListBalls(results: any[]) {
      listBalls.value = results.map((result) => ({
        drawId: result.drawId,
        date: new Date(result.date).toLocaleDateString("vi-VN"),
        balls: result.wns.split(",").map((item: string) => parseInt(item)),
        chips: result.wns.split(",").map((item: string) => parseInt(item)),
      }));
      isLoading.value = false;
    }

    function updateDrawPeriodValue(value: number) {
      drawPeriodValue.value = value;
      isLoading.value = true;
    }

    return {
      t,
      isLoading,
      listBalls,
      isPeriodSelected,
      selectedDate,
      drawPeriodValue,
      toggleSelection,
      updateListBalls,
      updateDrawPeriodValue,
    };
  },
});
</script>

<style scoped>
.loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
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

.boxrd {
  border-radius: 0 0.475rem 0.475rem 0 !important;
  padding: 3px 15px;
  border: 1px solid var(--bs-gray-300);
}
</style>
