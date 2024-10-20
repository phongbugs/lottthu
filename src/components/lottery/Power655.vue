<template>
  <div class="w-100 h-100 overflow-hidden">
    <h1>{{ msg }}</h1>
    <div class="row m-1">
      <div class="col-12 col-sm-12 col-md-6 col-lg-4 my-1">
        <div class="input-group input-group-sm" style="min-width: 338px">
          <span class="input-group-text fw-bold fs-7">Tùy chọn lịch sử</span>
          <div
            class="form-check form-check-custom form-check-solid fw-semibold fs-6 flex-grow-1 boxrd"
          >
            <input
              id="btnIntYes"
              type="radio"
              name="Int"
              value="btnIntYes"
              :checked="status === 'checked'"
              class="form-check-input"
            /><label class="fs-7" for="btnIntYes">&nbsp;&nbsp;Kỳ Quay</label>
            &nbsp;&nbsp;&nbsp;
            <input
              id="btnIntNo"
              type="radio"
              name="Int"
              value="btnIntNo"
              class="form-check-input"
            /><label class="fs-7" for="btnIntNo">&nbsp;&nbsp;Ngày tháng</label>
          </div>
        </div>
      </div>
      <div
        class="col-10 col-sm-11 col-md-5 col-lg-3 my-1 d-flex align-items-center"
      >
        <!-- <el-date-picker
          class="w-100"
          v-model="selectedDate"
          placeholder="Từ ngày"
          format="DD-MM-YYYY"
          size=""
        /> -->
        <DateRangePicker
          class="w-100"
          v-model:parentValue="selectedDate"
          type="daterange"
          range-separator="Đến"
          start-placeholder="Từ ngày"
          end-placeholder="Đến ngày"
          format="DD-MM-YYYY"
        />
      </div>
      <div class="col-2 col-sm-1 col-md-1 col-lg-1 my-1">
        <!-- <el-button class="w-100" type="primary"
          ><i class="bi bi-search"></i
        ></el-button> -->
        <button
          type="button"
          class="btn btn-sm btn-primary w-100 justify-content-end fw-bold"
        >
          <i class="bi bi-search"></i>
          <!-- <i class="ki-outline ki-profile-circle fs-3"></i> -->
        </button>
      </div>
    </div>
    <div class="row m-1 d-none">
      <div class="col-12 col-md-6 col-lg-4 my-1">
        <fieldset class="border rounded-2 p-5">
          <legend class="float-none reset">
            <span class="fw-bold fs-5">Kết quả sổ gần nhất</span>
          </legend>
          <div class="d-flex justify-content-between">
            <BallItem
              v-for="(ball, index) in balls"
              :key="ball"
              :ball-number="ball"
              :chip-number="chips[index]"
              :color="index === balls.length - 1 ? 'red' : 'yellow'"
            />
          </div>
        </fieldset>
      </div>
    </div>
    <div class="row m-1 d-none">
      <div class="col-12 col-md-6 col-lg-4 my-1">
        <fieldset class="border rounded-3 p-3">
          <legend class="float-none reset">
            <span class="fw-bold fs-5">Chiến lược chọn số</span>
          </legend>
          <div class="d-flex justify-content-between">
            <BallItem
              v-for="(ball, index) in balls"
              :key="ball"
              :ball-number="ball"
              :chip-number="chips[index]"
              :color="index === balls.length - 1 ? 'red' : 'yellow'"
            />
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BallItem from "./BallItem.vue";
import DateRangePicker from "./DateRangePicker.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Power-655",
  components: {
    BallItem,
    DateRangePicker,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      balls: [12, 23, 34, 45, 50, 13, 1],
      chips: [12, 23, 34, 45, 56, 67, 177],
      selectedDate: [new Date(), new Date()],
      status: "checked",
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
