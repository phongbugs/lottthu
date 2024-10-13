<template>
  <div class="">
    <h1>{{ msg }}</h1>
    <div class="row m-1">
      <div class="col-12 col-sm-12 col-md-6 col-lg-3 my-1">
        <div class="input-group input-group-sm w-250" style="min-width: 234px">
          <span class="input-group-text"
            ><strong>Internet Betting</strong></span
          >
          <div
            class="form-check form-check-custom form-check-solid fw-semibold fs-6 boxrd"
          >
            <input
              id="btnIntYes"
              type="radio"
              name="Int"
              value="btnIntYes"
              :checked="status === 'checked'"
              class="form-check-input"
            /><label for="btnIntYes">&nbsp;Yes</label>
            &nbsp;&nbsp;&nbsp;
            <input
              id="btnIntNo"
              type="radio"
              name="Int"
              value="btnIntNo"
              class="form-check-input"
            /><label for="btnIntNo">&nbsp;No</label>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-11 col-md-6 col-lg-3 my-1">
        <el-date-picker
          class="w-100"
          v-model="selectedDate"
          type="daterange"
          range-separator="Đến"
          start-placeholder="Từ ngày"
          end-placeholder="Đến ngày"
          format="DD-MM-YYYY"
        />
      </div>
      <div class="col-12 col-sm-1 col-md-1 col-lg-1 my-1">
        <el-button class="w-100" type="primary"
          ><i class="bi bi-search"></i
        ></el-button>
      </div>
    </div>
    <div class="row m-1">
      <div class="col-12 col-md-6 col-lg-6 my-1">
        <fieldset class="border dotted rounded-3 p-3">
          <legend class="float-none dotted reset">
            <span class="fw-100">Kết quả sổ gần nhất</span>
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
    <div class="row m-1">
      <div class="col-12 col-md-6 col-lg-6 my-1">
        <fieldset class="border dotted rounded-3 p-3">
          <legend class="float-none dotted">Chiến lược chọn số</legend>
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
import { defineComponent } from "vue";
export default defineComponent({
  name: "HelloWorld",
  components: {
    BallItem,
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
</style>
