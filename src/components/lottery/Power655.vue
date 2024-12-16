<template>
  <div class="w-100">
    <h1>Power655</h1>
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
                :checked="lotteryStore.isPeriodSelected"
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
                :checked="!lotteryStore.isPeriodSelected"
                class="form-check-input"
                @click="toggleSelection(false)"
              /><label class="fs-7" :style="{ color: textColor }" for="btnIntNo"
                >&nbsp;&nbsp;{{ t("historyDrawByDate") }}</label
              >
            </div>
          </div>
        </div>
        <div
          v-if="!lotteryStore.isPeriodSelected"
          class="col-10 col-sm-11 col-md-5 col-lg-4 col-xl-4 col-xxl-3 my-1 d-flex align-items-center"
        >
          <DateRangePicker v-model:parentValue="selectedDate" />
        </div>
        <div
          v-else
          class="col-10 col-sm-11 col-md-5 col-lg-4 col-xl-4 col-xxl-3 my-1 d-flex align-items-center"
        >
          <DrawPeriodSelect
            :v-model="lotteryStore.drawPeriodValue"
            @change="lotteryStore.setDrawPeriodValue"
          ></DrawPeriodSelect>
        </div>
        <div class="col-2 col-sm-1 col-md-1 col-lg-1 col-xl-1 my-1">
          <SearchButton
            id="search-button"
            :isLoading="lotteryStore.isLoading"
            @click="lotteryStore.fetchPower655Results"
          />
        </div>
        <div class="col-12 m-1">
          <div class="row">
            <div class="col-3">
              <el-button
                class="btn btn-sm btn-primary fw-bold d-flex align-items-center"
                @click="openModal('TrendChart', 'POWER655 - THỐNG KÊ SỐ TRÚNG')"
              >
                <el-icon
                  size="20"
                  color="#000"
                  class="el-icon--left d-flex align-items-center"
                  ><TrendCharts /></el-icon
                >Thống kê số trúng</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Loading Mask -->
    <div v-if="lotteryStore.isLoading" class="loading-mask">
      <div class="spinner"></div>
    </div>
    <FullScreenModal
      :modalId="'myModal'"
      :title="modalTitle"
      :initialComponent="selectedComponent"
    />
    <div
      class="div-result row m-1 d-flex"
      :style="{ marginTop: `${controlHeight}px !important` }"
    >
      <div class="col-12 col-md-6 col-lg-4 my-1">
        <ListBallNumber
          v-for="(result, index) in lotteryStore.getPower655StatHistories"
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
import { defineComponent, ref, onMounted, computed } from "vue";
import { useLotteryStore } from "@/stores/lottery";
import DateRangePicker from "./DateRangePicker.vue";
import DrawPeriodSelect from "./DrawPeriodSelect.vue";
import ListBallNumber from "./ListBallNumber.vue";
import SearchButton from "./SearchButton.vue";
import { t } from "@/core/helpers/i18n";
import { TrendCharts } from "@element-plus/icons-vue";
const selectedComponent = ref("");
const modalTitle = ref("Dynamic Modal");
import FullScreenModal from "./FullScreenModal.vue";
import * as bootstrap from "bootstrap";

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
  setup() {
    const lotteryStore = useLotteryStore();
    const selectedDate = ref([new Date(), new Date()]);
    const controlRef = ref<HTMLElement | null>(null);
    const controlHeight = ref(0);

    function toggleSelection(isPeriod: boolean) {
      lotteryStore.setIsPeriodSelected(isPeriod);
    }

    const openModal = (componentName: string, title: string) => {
      selectedComponent.value = componentName;
      modalTitle.value = title;
      // Trigger modal manually with Bootstrap's Modal API
      const modalElement = document.getElementById("myModal");
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    };

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
      lotteryStore,
      selectedDate,
      toggleSelection,
      openModal,
      controlRef,
      controlHeight,
      bgColor,
      textColor,
      modalTitle,
      selectedComponent,
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
