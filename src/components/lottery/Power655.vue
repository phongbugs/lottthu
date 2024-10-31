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
        <DrawPeriodSelect></DrawPeriodSelect>
      </div>
      <div class="col-2 col-sm-1 col-md-1 col-lg-1 col-xl-1 my-1">
        <el-button
          class="btn btn-sm btn-primary w-100 justify-content-end fw-bold"
          type="primary"
          ><i class="bi bi-search"></i
        ></el-button>
      </div>
    </div>
    <div class="row m-1 d-none">
      <div class="col-12 col-md-6 col-lg-4 my-1">
        <ListBallNumber
          legend="Kết quả quay 10-10-2024"
          :balls="balls"
          :chips="chips"
        ></ListBallNumber>
        <div class="m-1 p-1" style="overflow-y: scroll; background-color: #eee">
          <ListBallNumber
            v-for="(result, index) in listBalls"
            :key="index"
            class="my-1 overflow-scroll"
            :legend="`Kết quả quay ${result.date}`"
            :balls="result.balls"
            :chips="result.chips"
          ></ListBallNumber>
        </div>
      </div>
    </div>
    <div class="row m-1 d-none">
      <div class="col-12 col-md-6 col-lg-4 my-1">
        <ListBallNumber
          legend="Chiến lược chọn số"
          :balls="balls"
          :chips="chips"
        ></ListBallNumber>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DateRangePicker from "./DateRangePicker.vue";
import DrawPeriodSelect from "./DrawPeriodSelect.vue";
import ListBallNumber from "./ListBallNumber.vue";
import { defineComponent, ref } from "vue";
import { t } from "@/core/helpers/i18n";
export default defineComponent({
  name: "Power-655",
  components: {
    DateRangePicker,
    ListBallNumber,
    DrawPeriodSelect,
  },
  props: {
    msg: String,
  },
  setup() {
    const isPeriodSelected = ref(true);

    function toggleSelection(isPeriod) {
      isPeriodSelected.value = isPeriod;
    }
    return {
      t,
      balls: [12, 23, 34, 45, 50, 13, 1],
      listBalls: [
        {
          date: "10-10-2023",
          balls: [5, 12, 23, 34, 45, 56, 11],
          chips: [1, 2, 3, 4, 5, 6, 7, 111],
        },
        {
          date: "11-10-2023",
          balls: [6, 13, 24, 35, 46, 57, 7],
          chips: [8, 9, 10, 11, 12, 13, 14, 65],
        },
        ...Array.from({ length: 50 }, (_, i) => ({
          date: "12-10-2023",
          balls: Array.from(
            { length: 7 },
            () => Math.floor(Math.random() * 59) + 1
          ),
          chips: Array.from(
            { length: 7 },
            () => Math.floor(Math.random() * 200) + 1
          ),
        })),
      ],
      chips: [12, 23, 34, 45, 56, 67, 177],
      selectedDate: [new Date(), new Date()],
      isPeriodSelected,
      toggleSelection,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.dotted {
  border: 1px dotted orange;
}

.reset {
  all: revert;
}
.boxrd {
  border-radius: 0 0.475rem 0.475rem 0 !important;
  padding: 3px 15px;
  border: 1px solid var(--bs-gray-300);
}
</style>
