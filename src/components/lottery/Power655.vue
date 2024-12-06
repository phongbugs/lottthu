<template>
  <div class="w-100">
    <h1>{{ msg }}</h1>
    <div
      ref="controlRef"
      class="sticky-control"
      :style="{ 'background-color': bgColor }"
    >
      <div class="div-control row m-1">
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
              /><label
                class="fs-7"
                :style="{ color: textColor }"
                for="btnIntYes"
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
              /><label class="fs-7" :style="{ color: textColor }" for="btnIntNo"
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
        <div class="col-12 m-1">
          <div class="row">
            <div class="col-3">
              <el-button
                class="btn btn-sm btn-primary justify-content-center align-items-center fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                <el-icon
                  v-tooltip
                  title="Xem số ra nhiều"
                  size="20"
                  color="#000"
                  class="el-icon--center"
                  ><TrendCharts /></el-icon
              ></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Loading Mask -->
    <div v-if="isLoading" class="loading-mask">
      <div class="spinner"></div>
    </div>
    <!-- FullScreenModal component -->
    <full-screen-modal modal-id="myModal" title="My Fullscreen Modal">
      <template #body>
        <p>This is the content of the fullscreen modal.</p>
      </template>
      <template #footer>
        <button class="btn btn-primary">Save Changes</button>
      </template>
    </full-screen-modal>
    <div
      class="div-result row m-1 d-flex"
      :style="{ marginTop: `${controlHeight}px !important` }"
    >
      <div class="col-12 col-md-6 col-lg-4 my-1">
        <ListBallNumber
          v-for="(result, index) in listBalls"
          class="my-1"
          :key="index"
          :index="index + 1"
          :legend-prefix="t('legendDrawId')"
          :legend-draw-id="result.drawId.toString()"
          :legend-date="`${t('legendDrawDate')} ${result.date}`"
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
import { defineComponent, ref, onMounted, computed, provide } from "vue";
import DateRangePicker from "./DateRangePicker.vue";
import DrawPeriodSelect from "./DrawPeriodSelect.vue";
import ListBallNumber from "./ListBallNumber.vue";
import SearchButton from "./SearchButton.vue";
import { t } from "@/core/helpers/i18n";
import { TrendCharts } from "@element-plus/icons-vue";
import FullScreenModal from "./FullScreenModal.vue";
export default defineComponent({
  name: "Power-655",
  components: {
    DateRangePicker,
    ListBallNumber,
    DrawPeriodSelect,
    SearchButton,
    TrendCharts,
    FullScreenModal,
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
    const controlRef = ref<HTMLElement | null>(null);
    const controlHeight = ref(0);
    const totalCurrentPeriods = ref(0);
    function toggleSelection(isPeriod: boolean) {
      isPeriodSelected.value = isPeriod;
    }
    provide("totalCurrentPeriods", totalCurrentPeriods);
    function updateListBalls(results: any[]) {
      listBalls.value = results.map((result, index) => {
        const balls = result.wns
          .split(",")
          .map((item: string) => parseInt(item))
          .slice(0, -1);

        // Thống kê tần suất từ các kỳ sau (index lớn hơn hiện tại)
        const frequencyMap: Record<number, number> = {};
        results.slice(index).forEach((nextResult) => {
          const nextBalls = nextResult.wns
            .split(",")
            .map((item: string) => parseInt(item))
            .slice(0, -1);
          nextBalls.forEach((num) => {
            frequencyMap[num] = (frequencyMap[num] || 0) + 1;
          });
        });

        return {
          drawId: result.drawId,
          date: new Intl.DateTimeFormat("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(new Date(result.date)),
          balls: balls,
          chips: balls.map((num) => frequencyMap[num] || 0), // Số lần xuất hiện sau kỳ hiện tại
        };
      });
      isLoading.value = false;
      totalCurrentPeriods.value = listBalls.value.length;
    }

    function updateDrawPeriodValue(value: number) {
      drawPeriodValue.value = value;
      isLoading.value = true;
    }
    const updateControlHeight = () => {
      if (controlRef.value) {
        controlHeight.value = controlRef.value.offsetHeight;
      }
    };
    onMounted(() => {
      updateControlHeight();
      window.addEventListener("resize", updateControlHeight);
    });

    const bgColor = computed(() => {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#000"
        : "#fff";
    });
    const textColor = computed(() => {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#fff"
        : "#000";
    });
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
      controlRef,
      controlHeight,
      bgColor,
      textColor,
      totalCurrentPeriods,
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

.sticky-control {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
